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
      <button type="submit">Ingresar</button>
      <button type="button" class="register-button" @click="handleRegister">Registrarse</button>
      <h4 class="text-center enter-with">¿Olvido su contraseña?</h4>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
  console.log('Login attempt:', { email: email.value, password: password.value });
  router.push('/user/panel');
};

const handleRegister = () => {
  router.push('/register');
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
  height: 400px;
}
.h3 {
margin-bottom: 10px;
}

.form-group {
  font-size: 12px;
  width: 80%;
  margin-bottom: 20px;
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
  font-size: 12px;
  width: 80%;
  padding: 10px;
  background-color: #5DCE76;
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

.forgot-password {
  color: black;
  font-size: 14px;
  margin-bottom: 10px;
}

.register-button {
  background-color: #333;
  color: white;
}

button:hover,register-button:hover {
  transform: scale(1.1);
  transition: transform 0.2s;
}


.enter-with {
  color: black;
  font-size: 14px;
  margin-top: 20px;

}
</style>