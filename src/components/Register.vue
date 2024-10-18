<template>
    <div class="register-container">
      <h2 class="text-center title">Registrarse</h2>
      <h3 class="text-center subtitle">Bienvenido</h3>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <input type="text" id="nombre" v-model="nombre" placeholder="Ingrese su nombre" required>
        </div>
        <div class="form-group">
          <input type="text" id="apellido" v-model="apellido" placeholder="Ingrese su apellido" required>
        </div>
        <div class="form-group">
          <input type="number" id="documento" v-model="documento" placeholder="Ingrese su documento" required>
        </div>
        <div class="form-group">
          <input type="email" id="email" v-model="email" placeholder="Ingrese su email" required>
        </div>
        <div class="form-group">
          <input type="password" id="password" v-model="password" placeholder="Ingrese su contraseña" required>
        </div>
        <div class="form-group">
          <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Vuelva a ingresar su contraseña" required>
        </div>
        <button type="submit">Registrarse</button>
        <h5 class="text-center enter-with">
          <router-link to="/" class="login-link">¿Ya tienes una cuenta?</router-link>
        </h5>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  
  const nombre = ref('');
  const apellido = ref('');
  const documento = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const router = useRouter();

  const handleRegister = () => {
    if (password.value !== confirmPassword.value) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Aquí iría la lógica para registrar al usuario
    console.log('Registro de usuario:', {
      nombre: nombre.value,
      apellido: apellido.value,
      documento: documento.value,
      email: email.value,
      password: password.value
    });
    // Redirigimos al usuario después del registro
    router.push('/user');
  };

  const goToLogin = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  
  .register-container {
    width: 400px;
    background-color: rgba(108, 210, 130, 0.18);
    margin: auto;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    background-color: #4CAF50;
    color: black;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    font-size: 12px;
  }
  
  button:hover {
    background-color: black;
    color: white;
  }
  
  .subtitle {
    color: #BFBFBF;
    font-size: 14px;
    margin-top: 3px;
    margin-bottom: 8px;
  }
  
  .enter-with {
  color: black;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
}
  </style>
  