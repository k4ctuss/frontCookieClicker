<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/game'

const gameStore = useGameStore()

const userUpgradesWithDetails = computed(() => {
  return gameStore.userUpgrades.map(userUpgrade => {
    const upgrade = gameStore.upgrades.find(u => u.upgrade_id === userUpgrade.upgrade_id)
    return {
      ...upgrade,
      quantity: userUpgrade.quantity
    }
  })
})
</script>

<template>
  <div class="upgrades-list">
    <h2>Vos Améliorations</h2>
    <div v-if="gameStore.isLoading || gameStore.isLoaddingUserData" class="loading">
      chargement...
    </div>
    <div v-else class="upgrades-grid">
      <div v-for="upgrade in userUpgradesWithDetails" :key="upgrade?.upgrade_id" class="upgrade-item">
        <div class="upgrade-info">
          <h3>{{ upgrade?.name }}</h3>
          <p>Possédé: {{ upgrade?.quantity }}</p>
          <p>CPS: {{ ((upgrade?.cookie_increase_per_second || 0) * (upgrade?.quantity || 0)).toFixed(1) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upgrades-list {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.upgrades-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.upgrade-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border: 1px solid #eee;
  border-radius: 4px;
}

.upgrade-icon {
  font-size: 2rem;
}

.upgrade-info h3 {
  margin: 0;
  font-size: 1rem;
}

.upgrade-info p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  color: #666;
}
</style>