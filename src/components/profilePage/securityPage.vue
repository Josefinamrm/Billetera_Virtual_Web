<template>
  <div class="background-wrapper">
    <div class="viewport">
      <div class="security-container">
        <div class="title">
          <button class="back-button" @click="goBack"><-</button>
          <h1>Seguridad</h1>
        </div>
        <div class="page">
          <div class="section" @click="showForm">Cambiar Contraseña</div>
          <div class="change-password-container" v-if="visible">
            <form class="change-password-form">
              <div class="form-group">
                <label for="current-password">Contraseña actual</label>
                <input type="password" id="current-password" placeholder="Ingresar..." required />
                <h4 class="text-center enter-with">¿Olvido su contraseña?</h4>
              </div>
              <div class="form-group">
                <label for="new-password">Nueva contraseña</label>
                <input type="password" id="new-password" placeholder="Ingresar..." required />
              </div>
              <div class="form-group">
                <label for="confirm-password">Confirmar nueva contraseña</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Ingresar..."
                  @input="passwordsMatchError"
                  required
                />
                <span v-if="passError" class="error">Las contraseñas deben coincidir</span>
              </div>
              <button class="submit-button" @click="submitForm">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'

const visible = ref(false)
const passError = ref(false)

const goBack = () => {
  router.go(-1)
}

const showForm = () => {
  visible.value = !visible.value
}

const passwordsMatchError = () => {
  const newPassword = document.getElementById('new-password').value
  const confirmPassword = document.getElementById('confirm-password').value
  if (newPassword !== confirmPassword) {
    passError.value = true
  } else {
    passError.value = false
  }
}

const submitForm = () => {
  if (!passError.value) {
    console.log('Password changed')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.background-wrapper {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 15px;
}

button {
  font-weight: bolder;
  font-size: 20px;
}
.viewport {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Inter', sans-serif;
}

.security-container {
  width: 100%;
  max-width: 1350px;
  padding: 20px;
  box-sizing: border-box;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.section {
  font-weight: bold;
  gap: 15px;
  background-color: #d9d9d9;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
  width: 100%;
  border: none;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.section:hover {
  background-color: #c0c0c0;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f0f0f0;
}

.change-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.security-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

h4 {
  font-size: 14px;
  color: #2c3e50;
  margin-top: 5px;
}

.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}
</style>
