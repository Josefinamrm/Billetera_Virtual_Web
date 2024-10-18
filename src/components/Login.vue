<template>
  <div class="login-container">
    <h2 class="text-center">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input type="email" id="email" v-model="email" placeholder="Ingrese su email" required>
      </div>
      <div class="form-group">
        <input type="password" id="password" v-model="password" placeholder="Ingrese su contraseña" required>
      </div>
      <button type="submit" @click="$router.push('/user')">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  // Aquí puedes implementar la lógica de autenticación
  console.log('Login attempt:', { email: email.value, password: password.value });
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
