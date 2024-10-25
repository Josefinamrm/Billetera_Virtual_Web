<template>
  <div class="login-container">
    <h2 class="text-center title">Iniciar Sesión</h2>
    <h3 class="text-center subtitle">Bienvenido</h3>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input type="email" id="email" v-model="email" placeholder="Ingrese su email" required />
      </div>
      <div class="form-group">
        <div class="password-input-container">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="Ingrese su contraseña" required />
          <img
            :src="showPassword ? viewIcon : hideIcon"
            alt="Toggle password visibility"
            class="password-toggle"
            @click="togglePasswordVisibility"
          />
        </div>
      </div>
      <button type="submit">Ingresar</button>
      <button type="button" class="register-button" @click="handleRegister">Registrarse</button>
      <h4 class="text-center enter-with">¿Olvido su contraseña?</h4>
    </form>

    <!-- Error Message Popup -->
    <div v-if="showErrorMessage" class="error-popup">
      <p>{{ errorMessage }}</p>
      <button @click="closeErrorPopup">Cerrar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore'; // Import userStore
import viewIcon from './icons/view.png';
import hideIcon from './icons/hide.png';

const email = ref('');
const password = ref('');
const showErrorMessage = ref(false);
const errorMessage = ref('');
const router = useRouter();
const userStore = useUserStore(); // Initialize userStore
const showPassword = ref(false);

const handleLogin = () => {
  const user = userStore.userData; // Get user data from the store
  if (user && user.email === email.value && user.password === password.value) {
    console.log('Login successful');
    router.push('/user/panel');
  } else {
    errorMessage.value = 'Error al iniciar sesión: credenciales inválidas.';
    showErrorMessage.value = true;
  }
};

const handleRegister = () => {
  router.push('/register');
};

const closeErrorPopup = () => {
  showErrorMessage.value = false;
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
}

.login-container {
  width: 400px;
  background-color: rgba(108, 210, 130, 0.18);
  margin: auto;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto; /* Adjust height for flexibility */
}

.form-group {
  font-size: 12px;
  width: 80%;
  margin-bottom: 20px;
  background-color: #ebebeb;
  border-radius: 30px;
  border: 1px solid black;
  padding: 7px;
  margin-left: auto;
  margin-right: auto;
}

input {
  width: 100%;
  padding: 7px;
  border-radius: 30px;
  background-color: #ebebeb;
  outline: none;
  border: none;
}

button {
  font-size: 12px;
  width: 80%;
  padding: 10px;
  background-color: #5dce76;
  color: black;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.subtitle {
  color: black;
  font-size: 14px;
  margin-top: 3px;
  margin-bottom: 30px;
}

.register-button {
  background-color: #333;
  color: white;
}

button:hover {
  transform: scale(1.1);
  transition: transform 0.2s;
}

.enter-with {
  color: black;
  font-size: 14px;
  margin-top: 20px;
}

.error-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  z-index: 1000;
}

.error-popup p {
  margin: 0 0 10px 0;
}

.error-popup button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.password-toggle {
  position: absolute;
  right: 10px;
  cursor: pointer;
  width: 20px; /* Ajusta según el tamaño de tu imagen */
  height: 20px; /* Ajusta según el tamaño de tu imagen */
}
</style>
