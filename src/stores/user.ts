import { defineStore } from 'pinia'
import { API_BASE_URL } from '../utils/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: 'Invité',
    isLoggedIn: false
  }),
  actions: {
    async login(username: string, password: string) {
      this.username = username
      const reponse = await fetch(`${API_BASE_URL}/user/connect/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        }),
        credentials: 'include'
      })
        const data = await reponse.json()
        console.log(data)
        if(data.error) {
          alert(data.error)
          return false
        }else{
            this.isLoggedIn = true
            return true
        }
    },
    async signUp(username: string, password: string) {
        this.username = username
        const reponse = await fetch(`${API_BASE_URL}/user/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            }),
            credentials: 'include'
        })
        console.log(reponse)
        const data = await reponse.json()
        console.log(data)
        if(data.error) {
            alert(data.error)
            return false
        }else{
            this.isLoggedIn = true
            return true
        }
    },
    logout() {
        this.username = 'invité'
        this.isLoggedIn = false
        // todo : sauvegarder le jeux
    }
  }
})