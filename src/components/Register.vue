<template>
  <div class="register-container">
    <h2 class="text-center title">Registrarse</h2>
    <h3 class="text-center subtitle">Bienvenido</h3>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <input type="text" id="nombre" v-model="nombre" placeholder="Ingrese su nombre *" required>
      </div>
      <div class="form-group">
        <input type="text" id="apellido" v-model="apellido" placeholder="Ingrese su apellido *" required>
      </div>
      <div class="form-group">
        <input type="number" id="documento" v-model="documento" placeholder="Ingrese su documento *" required>
      </div>
      <div class="form-group">
        <input type="email" id="email" v-model="email" placeholder="Ingrese su email *" required>
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
      <div class="form-group">
        <div class="password-input-container">
          <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword" placeholder="Vuelva a ingresar su contraseña" required />
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
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore.js'; // Adjust the path as necessary
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

const router = useRouter();
const userStore = useUserStore();

const handleRegister = () => {
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
  };

  userStore.setUser(userData);
  console.log('Registro de usuario:', userData);
  router.push('/user/panel');
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>
<style scoped>
.register-container {
  width: 400px;
  background-color: rgba(108, 210, 130, 0.18);
  padding: 20px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.form-group {
  font-size: 12px;
  width: 80%;
  margin-bottom: 10px;
  background-color: #EBEBEB;
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
  background-color: #EBEBEB;
  outline: none;
  border: none;
}

button {
  width: 80%;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: block;
  margin: 10px auto;
  font-size: 12px;
}

button:hover {
  background-color: black;
  color: white;
}

.subtitle {
  color: black;
  font-size: 14px;
  margin-top: 3px;
  margin-bottom: 8px;
}

.login-link {
  color: black;
}
.enter-with {
  color: black;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
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
  width: 20px;
  height: 20px;
}
</style>
