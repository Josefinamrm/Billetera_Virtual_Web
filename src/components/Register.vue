<template>
    <div class="login-container">
      <h2 class="text-center title">Registrarse</h2>
      <h3 class="text-center subtitle">Bienvenido</h3>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input type="email" id="email" v-model="email" placeholder="Ingrese su email" required>
        </div>
        <div class="form-group">
          <input type="password" id="password" v-model="password" placeholder="Ingrese su contraseña" required>
        </div>
        <h4 class="text-center forgot-password">¿Olvido su contraseña?</h4>
        <button type="submit">Ingresar</button>
        <button type="button" class="register-button">Registrarse</button>
        <h4 class="text-center enter-with">O ingresa con</h4>
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
    // Aquí puedes implementar la lógica de autenticación
    console.log('Login attempt:', { email: email.value, password: password.value });
    // Si la autenticación es exitosa, navega a la página de usuario
    router.push('/user');
  };
  
  </script>
  
  <style scoped>
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  
  .login-container {
    background-color: rgba(108, 210, 130, 0.18);
    margin: auto;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .form-group {
    margin-bottom: 15px;
    background-color: #EBEBEB;
    border-radius: 30px;
    border: 1px solid black;
    padding: 8px;
  }
  
  input {
    padding: 8px;
    border-radius: 30px;
    background-color: #EBEBEB;
    outline: none;
    border: none;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: black;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  button:hover {
    background-color: black;
    color: white;
  }
  
  .subtitle {
    color: #BFBFBF;
    font-size: 14px;
    margin-top: 3px;
    margin-bottom: 10px;
  }
  
  .forgot-password {
    color:black;
    font-size: 14px;
    margin-bottom: 10px;
  }  
  
  .register-button {
    background-color: black;
    color: white;
  }
  
  .register-button:hover {
    background-color: #4CAF50;
    color: black;
  }
  
  .enter-with {
    color: black;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  </style>
  