import { defineStore } from 'pinia'
import type { Upgrade, UserUpgrade } from '../types/upgrades'
import { API_BASE_URL } from '../utils/api.js'

export const useGameStore = defineStore('game', {
  state: () => ({
    cookies: 0,
    cookiesPerSecond: 0,
    upgrades: [] as Upgrade[],
    userUpgrades: [] as UserUpgrade[],
    isLoading: true,
    isLoaddingUserData: true,
    plusOnes: [] as Array<{ top: number; left: number }>
  }),
  actions: {
    async fetchUpgrades() {
        this.isLoading = true
        try {
            const responseUpgrades = await fetch(`${API_BASE_URL}/get-upgrades/`, {
                    method: "POST",
                    body: JSON.stringify({}),
                    headers: {
                    "Content-type": "application/json; charset=UTF-8"
                    },
                    credentials: 'include'
                });
            responseUpgrades.json().then((data) => {
                if (data.sucess) {
                    this.upgrades = data.upgrades
                }
            });
            console.log(this.upgrades)
          } catch (error) {
            // For demo, we'll use mock data
            this.upgrades = [
              {
                upgrade_id: 1,
                name: 'Cursor',
                description: 'Automatically clicks once per second',
                base_cost: 15,
                cookie_increase_per_second: 0.1,
              },
              {
                upgrade_id: 2,
                name: 'Grandma',
                description: 'A nice grandma to bake cookies',
                base_cost: 100,
                cookie_increase_per_second: 1,
              }
            ]
          } finally {
            this.isLoading = false
          }
    },
    async fetchUserData() {
        this.isLoaddingUserData = true
        try {
            const response = await fetch(`${API_BASE_URL}/user/get-cookies/`, {
                method: "POST",
                body: JSON.stringify({}),
                headers: {
                "Content-type": "application/json; charset=UTF-8"
                },
                credentials: 'include'
            });
            await response.json().then((data) => {
                if (data.success) {
                    this.cookies = data.total_cookies
                }
            });
            const responseUpgrades = await fetch(`${API_BASE_URL}/user/get-upgrades/`, {
                    method: "POST",
                    body: JSON.stringify({}),
                    headers: {
                    "Content-type": "application/json; charset=UTF-8"
                    },
                    credentials: 'include'
                });
            await responseUpgrades.json().then((data) => {
                if (data.sucess) {
                    this.userUpgrades = data.upgrades
                    this.recalculateCookiesPerSecond()
                }
            });
            console.log(this.userUpgrades)
          } catch (error) {
            // For demo, we'll use mock data
            this.userUpgrades = [
              {
                upgrade_id: 1,
                quantity: 0
              },
              {
                upgrade_id: 2,
                quantity: 0
              }
            ]
          } finally {
            this.isLoaddingUserData = false
          }
    },
    async buyUpgrade(upgradeId: number, isLogged: boolean) {
        const upgrade = this.upgrades.find(u => u.upgrade_id === upgradeId)
        if (!upgrade) return
        const userUpgrade = this.userUpgrades.find(uu => uu.upgrade_id === upgradeId)
        const quantity = userUpgrade?.quantity || 0
        const price = upgrade.base_cost * Math.pow(1.15, quantity)

        if (this.cookies < price) return

        this.cookies -= price

        let newUserUpgrade = []
        if ( upgradeId in this.userUpgrades){
            newUserUpgrade = this.userUpgrades.map((userUpgrade) => {
                if (userUpgrade.upgrade_id === upgradeId) {
                    return {
                        upgrade_id: upgradeId,
                        quantity: userUpgrade.quantity + 1
                    }
                }
                return userUpgrade
            })
        }else{
            newUserUpgrade = [...this.userUpgrades, {
                upgrade_id: upgradeId,
                quantity: 1
            }]
        }
        console.log(newUserUpgrade)

        if(isLogged){
            // Call the API to update the upgrade
            try {
                console.log(newUserUpgrade)
                const reponse = await fetch(`${API_BASE_URL}/user/update-upgrades/`, {
                    method: "POST",
                    body: JSON.stringify({
                        upgrades: newUserUpgrade
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    credentials: 'include'
                });
                await reponse.json().then((data) => {
                    if (data.sucess) {
                        this.userUpgrades = newUserUpgrade
                        this.recalculateCookiesPerSecond()
                    }
                });
                await this.savecookies()

            } catch (error) {
                this.cookies += price
                console.error('Error buying upgrade', error)
            }
        }else{
            this.userUpgrades = newUserUpgrade
            this.recalculateCookiesPerSecond()
        }

    },
    recalculateCookiesPerSecond() {
        this.cookiesPerSecond = this.userUpgrades.reduce((total, userUpgrade) => {
          const upgrade = this.upgrades.find(u => u.upgrade_id === userUpgrade.upgrade_id)
          if (upgrade) {
            return total + (upgrade.cookie_increase_per_second * userUpgrade.quantity)
          }
          return total
        }, 0)
    },
    addCookie(event: MouseEvent) {
      // Increment cookie count
      this.cookies++;
    },
    async savecookies() {
        // Call the API to save the cookies
        await fetch(`${API_BASE_URL}/user/update-cookies/`, {
            method: "POST",
            body: JSON.stringify({
                total_cookies: Math.floor(this.cookies),
                cookies_per_second: this.cookiesPerSecond
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            credentials: 'include'
        });
    },
    $reset() {
        this.cookies = 0
        this.cookiesPerSecond = 0
        this.upgrades = []
        this.userUpgrades = []
        this.isLoading = false
        this.isLoaddingUserData = false
        this.plusOnes = []
    }
  }
})