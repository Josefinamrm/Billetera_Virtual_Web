<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore.js';
import viewIcon from './icons/view.png';
import hideIcon from './icons/hide.png';

const nombre = ref('');
const apellido = ref('');
const documento = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const telefono = ref('');

const router = useRouter();
const userStore = useUserStore();

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const handleRegister = () => {
  nombre.value = capitalizeFirstLetter(nombre.value);
  apellido.value = capitalizeFirstLetter(apellido.value);

  if (password.value.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres');
    return;
  }
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden');
    return;
  }
  const userData = {
    nombre: nombre.value,
    apellido: apellido.value,
    documento: documento.value,
    email: email.value,
    password: password.value,
    alias: nombre.value.toLowerCase() + "." + apellido.value.toLowerCase(),
    cvu: createCvu(),
    telefono: telefono.value
  };

  userStore.loadUsers();
  const result = userStore.registerUser(userData);
  if (!result) {
    alert('El usuario ya existe');
    return;
  }
  router.push('/user/panel');
};

const preventNumbers = (event) => {
  const key = event.key;
  if (!isNaN(key)) {
    event.preventDefault();
  }
};

const createCvu = () => {
  const randomDigits = Math.floor(Math.random() * 10000000000000000000).toString().padStart(19, '0');
  return '000' + randomDigits;
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>

<template>
  <div class="register-wrapper">
    <div class="register-container">
      <h2 class="text-center title">Registrarse</h2>
      <h3 class="text-center subtitle">Bienvenido</h3>
      <form @submit.prevent="handleRegister">
        <div class="form-row">
          <div class="form-group">
            <input type="text" id="nombre" v-model="nombre" @keypress="preventNumbers" placeholder="Nombre *" required>
          </div>
          <div class="form-group">
            <input type="text" id="apellido" v-model="apellido" @keypress="preventNumbers" placeholder="Apellido *" required>
          </div>
        </div>
        <div class="form-group">
          <input type="number" id="documento" v-model="documento" placeholder="Documento *" required>
        </div>
        <div class="form-group">
          <input type="email" id="email" v-model="email" placeholder="Email *" required>
        </div>
        <div class="form-group">
          <div class="password-input-container">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="Contraseña" required />
            <img
              :src="showPassword ? viewIcon : hideIcon"
              alt="Toggle password visibility"
              class="password-toggle"
              @click="togglePasswordVisibility"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="password-input-container">
            <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword" placeholder="Confirmar contraseña" required />
            <img
              :src="showConfirmPassword ? viewIcon : hideIcon"
              alt="Toggle password visibility"
              class="password-toggle"
              @click="toggleConfirmPasswordVisibility"
            />
          </div>
        </div>
        <button type="submit">Registrarse</button>
        <h5 class="text-center enter-with">
          <router-link to="/login" class="login-link">¿Ya tienes una cuenta?</router-link>
        </h5>
      </form>
    </div>
  </div>
</template>

<style scoped>
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.register-container {
  width: 100%;
  max-width: 400px;
  background-color: rgba(108, 210, 130, 0.18);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  gap: 10px;
}

.form-group {
  font-size: 12px;
  width: 100%;
  margin-bottom: 10px;
  background-color: #EBEBEB;
  border-radius: 30px;
  border: 1px solid black;
  padding: 0;
  overflow: hidden;
}

input {
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  background-color: #EBEBEB;
  outline: none;
  border: none;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: block;
  margin: 15px auto;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: black;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.subtitle {
  color: black;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 20px;
}

.login-link {
  color: black;
  text-decoration: none;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #333;
}

.enter-with {
  color: black;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 0;
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

@media (max-width: 480px) {
  .register-container {
    padding: 15px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .title {
    font-size: 20px;
  }

  .subtitle {
    font-size: 16px;
  }

  input {
    padding: 10px;
    font-size: 14px;
  }

  button {
    padding: 10px;
    font-size: 14px;
  }
}

@media (max-height: 600px) {
  .register-wrapper {
    align-items: flex-start;
  }

  .register-container {
    margin-top: 10px;
  }

  .title {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .subtitle {
    font-size: 14px;
    margin-bottom: 10px;
  }

  input {
    padding: 8px;
    font-size: 12px;
  }

  button {
    padding: 8px;
    font-size: 12px;
    margin: 10px auto;
  }

  .enter-with {
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>