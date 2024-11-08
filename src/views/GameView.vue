<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useGameStore } from '../stores/game'

import GameHeader from '../components/GameHeader.vue'
import Cookie from '../components/Cookie.vue'
import Stats from '../components/Stats.vue'
import UpgradeShop from '../components/UpgradeShop.vue'

const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()
let cookieInterval: number
let saveveInterval: number

onMounted( async () => {
    gameStore.fetchUpgrades()
    if (userStore.isLoggedIn) {
        await gameStore.fetchUserData()
        saveveInterval = setInterval(() => {
            gameStore.savecookies()
        }, 60000)
    }

    cookieInterval = setInterval(() => {
        gameStore.cookies += gameStore.cookiesPerSecond
    }, 1000)
})

onUnmounted(() => {
  clearInterval(cookieInterval)
  clearInterval(saveveInterval)
})
</script>

<template>
  <div class="game-container">
    <GameHeader :username="userStore.username" />

    <div v-if="gameStore.isLoaddingUserData || gameStore.isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner">🍪</div>
        <p>Loading your cookie empire...</p>
      </div>
    </div>
    
    <div v-else class="game-content">
      <div class="game-layout">
        <div class="main-section">
          <Cookie />
          <Stats />
        </div>
        <div class="shop-section">
          <UpgradeShop />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-content {
  text-align: center;
}

.loading-spinner {
  font-size: 4rem;
  animation: spin 2s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.game-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.game-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

@media (max-width: 768px) {
  .game-layout {
    grid-template-columns: 1fr;
  }
}

.main-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.shop-section {
  position: sticky;
  top: 2rem;
}
</style>
