<template>
    <div class="min-h-screen flex items-center justify-center bg-green-50 relative overflow-hidden">
      <div class="absolute left-0 top-0 h-1/2 w-1/3 bg-green-300 rounded-br-full"></div>
      <div class="absolute right-0 bottom-0 h-1/2 w-1/3 bg-green-300 rounded-tl-full"></div>
      
      <div class="w-full max-w-md z-10 bg-white rounded-lg shadow-xl p-8">
        <h2 class="text-2xl font-bold text-center mb-6">Iniciar sesion</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <input 
              v-model="email" 
              type="email" 
              placeholder="Ingrese su mail"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div class="relative">
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="Ingrese su contraseña"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button 
              @click="togglePassword" 
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
            >
            </button>
          </div>
          
          <div class="text-sm text-right">
            <a href="#" class="text-green-600 hover:underline">¿Olvido su contraseña?</a>
          </div>
          
          
          <button
            type="button"
            class="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Ingresar
          </button>
          
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">O ingreso con</span>
            </div>
          </div>
          
          <div class="flex justify-center space-x-4">
            <button type="button" class="p-2 border rounded-full hover:bg-gray-100">
              <GoogleIcon class="h-5 w-5 text-green-500" />
            </button>
            <button type="button" class="p-2 border rounded-full hover:bg-gray-100">
              <FacebookIcon class="h-5 w-5 text-blue-600" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const password = ref('')
  const showPassword = ref(false)
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  
  const handleSubmit = () => {
    // Aquí iría la lógica para manejar el envío del formulario
    console.log('Email:', email.value)
    console.log('Password:', password.value)
  }
  
  // Componentes para los iconos de Google y Facebook
  const GoogleIcon = {
    template: `
      <svg viewBox="0 0 24 24" class="h-5 w-5">
        <path
          fill="currentColor"
          d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
        />
      </svg>
    `
  }
  
  const FacebookIcon = {
    template: `
      <svg viewBox="0 0 24 24" class="h-5 w-5">
        <path
          fill="currentColor"
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        />
      </svg>
    `
  }
  </script>