<script setup lang="ts">
import { useGameStore } from '../stores/game'

const gameStore = useGameStore()

let plusOnes = []

const handleClick = (event: MouseEvent) => {
  gameStore.addCookie(event)
  // Get click position for +1 animation using viewport coordinates
  const { clientX, clientY } = event;

  // Push coordinates with a slight offset for the +1 animation
  plusOnes.push({ top: clientY -30, left: clientX - 20 });

  // Remove "+1" after animation duration (e.g., 1.5s)
  setTimeout(() => {
    plusOnes.shift();
  }, 1500);

}


</script>

<template>
  <div class="cookie-display">
    <div class="stats">
      <h2>🍪 {{ Math.floor(gameStore.cookies) }} cookies</h2>
      <p>Cookies par seconde: {{ gameStore.cookiesPerSecond.toFixed(1) }}</p>
    </div>
    
    <button class="cookie-btn" @click="(event)=>handleClick(event)">
      <img src="../assets/perfectCookie.png">
    </button>
    <div v-for="(plusOne, index) in gameStore.plusOnes" 
           :key="index" 
           class="plus-one"
           :style="{ top: plusOne.top + 'px', left: plusOne.left + 'px' }">
        +1
      </div>
  </div>
</template>

<style scoped>
.cookie-display {
  text-align: center;
  margin-bottom: 2rem;
}

.stats {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.cookie-btn {
  font-size: 8rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.1s;
}

.cookie-btn:active {
  transform: scale(0.95);
}

.plus-one {
    position: absolute;
    color: #ff4500;
    font-weight: bold;
    font-size: 24px;
    animation: riseAndFade 1.5s forwards ease-in-out;
    opacity: 0;
    pointer-events: none;
  }
  
  @keyframes riseAndFade {
    0% { opacity: 1; transform: translateY(0); }
    50% { opacity: 0.8; transform: translateY(-30px); }
    100% { opacity: 0; transform: translateY(-60px); }
  }
</style>
