<template>
  <div class="login-container">
    <h2 class="text-center title">Iniciar sesión</h2>
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
    </form>

    <h4 class="text-center enter-with forgot-password" @click="showForgotPasswordPopup">¿Olvidó su contraseña?</h4>
    <div v-if="showErrorMessage" class="error-popup">
      <p>{{ errorMessage }}</p>
      <button @click="closeErrorPopup">Cerrar</button>
    </div>

    <PasswordResetPopup
      :show="showForgotPassword"
      @submit="sendResetEmail"
      @cancel="hideForgotPasswordPopup"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import viewIcon from './icons/view.png';
import hideIcon from './icons/hide.png';
import PasswordResetPopup from './PasswordResetPopup.vue';

const email = ref('');
const password = ref('');
const showErrorMessage = ref(false);
const errorMessage = ref('');
const router = useRouter();
const userStore = useUserStore();
const showPassword = ref(false);
const showForgotPassword = ref(false);

const handleLogin = async () => {
  await userStore.loadUsers(); // Asegura que loadUsers se complete antes del login
  const result = userStore.loginUser(email.value, password.value);
  if (result) {
    handleLoginSuccess();
  } else {
    errorMessage.value = 'Error al iniciar sesión: credenciales inválidas.';
    showErrorMessage.value = true;
  }
};

const handleLoginSuccess = () => {
  router.push('/user/panel');
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

const showForgotPasswordPopup = () => {
  showForgotPassword.value = true;
};

const hideForgotPasswordPopup = () => {
  showForgotPassword.value = false;
};

const sendResetEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMessage.value = 'Por favor, ingrese una dirección de correo electrónico válida.';
    showErrorMessage.value = true;
    hideForgotPasswordPopup();
    return;
  }
  errorMessage.value = `Se ha enviado un correo de recuperación a ${email}`;
  showErrorMessage.value = true;
  hideForgotPasswordPopup();
};
</script>

<style scoped>
.login-container {
  width: 90%;
  max-width: 400px;
  background-color: rgba(108, 210, 130, 0.18);
  margin: auto;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  box-sizing: border-box;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.form-group {
  font-size: 12px;
  width: 100%;
  max-width: 320px;
  margin-bottom: 20px;
  background-color: #ebebeb;
  border-radius: 30px;
  border: 1px solid black;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}

input {
  width: 100%;
  padding: 14px;
  border-radius: 30px;
  background-color: #ebebeb;
  outline: none;
  border: none;
  box-sizing: border-box;
}

button {
  font-size: 12px;
  width: 100%;
  max-width: 320px;
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
  transform: scale(1.05);
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
  font-size: 14px;
  width: 90%;
  max-width: 300px;
}

.error-popup p {
  margin: 0 0 10px 0;
}

.error-popup button {
  background-color: #4caf50;
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
  width: 100%;
}

.password-toggle {
  position: absolute;
  right: 14px;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.forgot-password {
  cursor: pointer;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-container {
    width: 95%;
    padding: 15px;
  }

  .title {
    font-size: 20px;
  }

  .subtitle {
    font-size: 12px;
  }

  .form-group, button {
    max-width: 100%;
  }

  input {
    padding: 12px;
  }
}
</style>