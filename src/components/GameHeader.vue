<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useGameStore } from '../stores/game'

const props = defineProps<{
  username: string
}>()

const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()

const handleLogout = () => {
  userStore.logout()
  // Reset game state when logging out
  gameStore.$reset()
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <h2>Bienvenue, {{ username }} !</h2>
      <div class="header-actions">
        <button class="logout-btn" @click="handleLogout">
          <span class="logout-icon">🚪</span>
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #cc0000;
}

.logout-icon {
  font-size: 1.2rem;
}
</style>