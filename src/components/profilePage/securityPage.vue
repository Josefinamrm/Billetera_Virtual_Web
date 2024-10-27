<template>
  <div class="background-wrapper">
    <div class="viewport">
      <div class="security-container">
        <div class="title">
          <button class="back-button" @click="goBack"><-</button>
          <h1>Seguridad</h1>
        </div>
        <div class="page">
          <div class="section" @click="showForm">Cambiar contraseña</div>
          <div class="change-password-container" v-if="visible">
            <form class="change-password-form" @submit.prevent="submitForm">
              <div class="form-group">
                <label for="current-password">Contraseña actual</label>
                <div class="password-input-container">
                  <input :type="showCurrentPassword ? 'text' : 'password'" id="current-password" placeholder="Ingrese su contraseña actual" required />
                  <img
                    :src="showCurrentPassword ? viewIcon : hideIcon"
                    alt="Toggle password visibility"
                    class="password-toggle"
                    @click="toggleCurrentPasswordVisibility"
                  />
                </div>
                <h4 class="enter-with forgot-password" @click="showForgotPasswordPopup">¿Olvidó su contraseña?</h4>
              </div>
              <div class="form-group">
                <label for="new-password">Nueva contraseña</label>
                <div class="password-input-container">
                  <input :type="showNewPassword ? 'text' : 'password'" id="new-password" placeholder="Ingrese su nueva contraseña" required />
                  <img
                    :src="showNewPassword ? viewIcon : hideIcon"
                    alt="Toggle password visibility"
                    class="password-toggle"
                    @click="toggleNewPasswordVisibility"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="confirm-password">Confirmar nueva contraseña</label>
                <div class="password-input-container">
                  <input :type="showConfirmPassword ? 'text' : 'password'" id="confirm-password" placeholder="Confirme su nueva contraseña" required />
                  <img
                    :src="showConfirmPassword ? viewIcon : hideIcon"
                    alt="Toggle password visibility"
                    class="password-toggle"
                    @click="toggleConfirmPasswordVisibility"
                  />
                </div>
                <span v-if="passError" class="error">Las contraseñas deben coincidir</span>
              </div>
              <button type="submit" class="submit-button">Guardar</button>
              <div v-if="successMessage" class="success-message">
                <span class="green-tick">✔️</span> Contraseña cambiada con éxito
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showErrorMessage" class="error-popup">
      <p>{{ errorMessage }}</p>
      <button @click="closeErrorPopup">Cerrar</button>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import viewIcon from '@/components/icons/view.png'
import hideIcon from '@/components/icons/hide.png'

const userStore = useUserStore();
const currentUser = userStore.getUserData()
const visible = ref(false)
const passError = ref(false)
const successMessage = ref(false)
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const showErrorMessage = ref(false)
const errorMessage = ref('');


const goBack = () => {
  router.go(-1)
}

const showForm = () => {
  visible.value = !visible.value
}

const showForgotPasswordPopup = () => {
  errorMessage.value = `Se ha enviado un correo de recuperación a ${currentUser.email}`;
  showErrorMessage.value = true;
}

const closeErrorPopup = () => {
  showErrorMessage.value = false;
};


const verifyCurrentPassword = () => {
  const currentPassword = document.getElementById('current-password').value;
  if (currentPassword !== currentUser.password) {
    alert('La contraseña actual ingresada es incorrecta');
    return false;
  }
  return true;
}

const submitForm = (event) => {
  event.preventDefault();
  if (!verifyCurrentPassword()) {
    return;
  }
  if (!passError.value) {
    userStore.changeUserPassword(document.getElementById('new-password').value);
    successMessage.value = true;
    setTimeout(() => {
      successMessage.value = false;
    }, 3000);
  }
}

const toggleCurrentPasswordVisibility = () => {
  showCurrentPassword.value = !showCurrentPassword.value;
}

const toggleNewPasswordVisibility = () => {
  showNewPassword.value = !showNewPassword.value;
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.background-wrapper {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.viewport {
  flex: 1;
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
  padding: 0.7rem;
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

.title {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 6px;
}
.back-button{
  font-size: 1.4rem;
  color: black;
}
h1 {
  font-size: 24px;
  margin-bottom: 5px;
}



.page {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.section {
  background-color: #d9d9d9;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  width: 100%;
  border: none;
  font-weight: 400;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.section:hover {
  background-color: #c0c0c0;
}

.change-password-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.change-password-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 13px;
  background-color: #f0f0f0;
}

.password-toggle {
  position: absolute;
  right: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
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

.error, .success-message, .error-message {
  font-size: 0.9rem;
  margin-top: 5px;
  text-align: center;
}

.error {
  color: red;
}

.success-message, .error-message {
  color: #4caf50;
}

.error-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  z-index: 1000;
}

.error-popup p {
  margin: 0 0 10px 0;
}

.error-popup button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  width: fit-content;
  font-size: 14px;
}

.forgot-password {
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .security-container {
    padding: 15px;
  }

  h1 {
    font-size: 20px;
  }

  .section {
    padding: 12px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .security-container {
    padding: 10px;
  }

  h1 {
    font-size: 18px;
  }

  .section {
    padding: 10px;
    font-size: 14px;
  }

  .back-button {
    font-size: 1.5rem;
  }
}
</style>
