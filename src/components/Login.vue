<template>
  <div class="login-container">
    <h2 class="text-center title">Iniciar Sesión</h2>
    <h3 class="text-center subtitle">Bienvenido</h3>
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
.title {
  font-size: 24px;
  font-weight: bold;
}

.login-container {
  max-width: 300px;
  background-color: rgba(108, 210, 130, 0.18);
  margin: auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form-group {
  margin-bottom: 15px;
  background-color: #EBEBEB;
  border-radius: 30px;
  padding: 8px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border: none;
  border-radius: 30px;
  background-color: #EBEBEB;
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

.subtitle {
  color: #BFBFBF;
  font-size: 14px;
}
</style>
