<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '../stores/game'
import UpgradeItem from './UpgradeItem.vue'

const gameStore = useGameStore()

</script>

<template>
  <div class="section">
    <h2>Boutique</h2>
    <div v-if="gameStore.isLoading || gameStore.isLoaddingUserData" class="loading">
      chargement...
    </div>
    <div v-else class="upgrades-grid">
      <UpgradeItem 
        v-for="upgrade in gameStore.upgrades"
        :key="upgrade.upgrade_id"
        :upgrade="upgrade"
      />
    </div>
  </div>
</template>
  
  <style scoped>
  .section {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 5px;
  }
  </style>
  