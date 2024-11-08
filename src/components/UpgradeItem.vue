<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import { useUserStore } from '../stores/user';
import type { Upgrade } from '../types/upgrades'

const props = defineProps<{
  upgrade: Upgrade
}>()

const gameStore = useGameStore()
const userStore = useUserStore()

const userUpgrade = computed(() => {
  return gameStore.userUpgrades.find(uu => uu.upgrade_id === props.upgrade.upgrade_id)
})

const price = computed(() => {
  const quantity = userUpgrade.value?.quantity || 0
  return Math.floor(props.upgrade.base_cost * Math.pow(1.15, quantity))
})

const canAfford = computed(() => {
  return gameStore.cookies >= price.value
})
</script>

<template>
  <div class="upgrade-item" :class="{ 'can-afford': canAfford }">
    <div class="upgrade-info">
      <h3>{{ upgrade.name }}</h3>
      <p class="description">{{ upgrade.description }}</p>
      <p class="stats">
        Owned: {{ userUpgrade?.quantity || 0 }}
        <br>
        CPS: +{{ upgrade.cookie_increase_per_second }}
      </p>
      <button 
        @click="gameStore.buyUpgrade(upgrade.upgrade_id, userStore.isLoggedIn)"
        :disabled="!canAfford"
      >
        Buy: {{ price }} cookies
      </button>
    </div>
  </div>
</template>

<style scoped>
.upgrade-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.2s;
}

.upgrade-item.can-afford:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.upgrade-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.description {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.stats {
  font-size: 0.9rem;
  color: #444;
  margin: 0.5rem 0;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>