<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const username = ref('')
const password = ref('')

const handleLogin = async () => {
  username.value = username.value.trim()
  password.value = password.value.trim()
  if (username.value && password.value) {
    const responseLogin = await userStore.login(username.value.trim(), password.value.trim());
    if (responseLogin){
        router.push('/game')
    }
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Cookie Clicker</h1>
      <input 
        v-model="username" 
        type="text" 
        placeholder="Entrer votre nom d'utilisateur"
      >
      <input 
        v-model="password" 
        type="password" 
        placeholder="Entrer votre mot de passe"
        @keyup.enter="handleLogin"
      >
      <button @click="handleLogin">Se connecter</button>
      <router-link to="/signup" class="signup-link">Pas encore de compte ? S'inscrire</router-link>
      <router-link to="/game" class="login-link">Jouer sans compte</router-link>

    </div>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}

button:hover {
  background-color: #45a049;
}

.signup-link {
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
}

.signup-link:hover {
  color: #333;
}
</style>