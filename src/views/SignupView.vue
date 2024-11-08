<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const username = ref('')
const password = ref('')

const handleSignUp = async () => {
  if (username.value.trim() && password.value.trim()) {
    const responseSignup = await userStore.signUp(username.value.trim(), password.value.trim());
    if (responseSignup){
        router.push('/game')
    }
  }
}
</script>

<template>
  <div class="signup-container">
    <div class="signup-box">
      <h1>Sign Up</h1>
      <input 
        v-model="username" 
        type="text" 
        placeholder="Entrer son nom d'utilisateur"
      >
      <input 
        v-model="password" 
        type="password" 
        placeholder="Entrer mot de passe"
        @keyup.enter="handleSignUp"
      >
      <button @click="handleSignUp">S'inscrire</button>
      <router-link to="/login" class="login-link">Vous avez déjà un compte ? Login</router-link>
      <router-link to="/game" class="login-link">Jouer sans compte</router-link>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.signup-box {
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

.login-link {
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
}

.login-link:hover {
  color: #333;
}
</style>