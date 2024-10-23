<template>
  <div class="app-container">
    <div class="header">
      <button class="back-button" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <h1>Nueva tarjeta</h1>
    </div>

    <div class="content">
      <div class="form-container">
        <form @submit.prevent="submitForm" class="card-form">
          <div class="form-group">
            <label for="cardNumber">Número de tarjeta</label>
            <input type="text" id="cardNumber" v-model="cardNumber" placeholder="Ingresar..." />
          </div>

          <div class="form-group">
            <label for="cardHolder">Nombre del titular de la tarjeta</label>
            <input type="text" id="cardHolder" v-model="cardHolder" placeholder="Ingresar..." />
          </div>

          <div class="form-group">
            <label for="expiry">Vencimiento</label>
            <input type="text" id="expiry" v-model="expiry" placeholder="MM/AA" />
          </div>

          <div class="form-group">
            <label for="cvv">Código de seguridad</label>
            <input type="text" id="cvv" v-model="cvv" placeholder="Ingresar..." />
          </div>

          <div class="form-group">
            <label for="document">Documento del titular</label>
            <input type="text" id="document" v-model="document" placeholder="Ingresar..." />
          </div>

          <button class="submit-button" @click="submitForm">Guardar</button>
        </form>
      </div>

      <div class="card-preview">
        <CreditCard
          :card-number="cardNumber"
          :card-name="cardHolder"
          :card-expiry="expiry"
          :cvv="cvv"
          :is-hidden="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CreditCard from './CreditCardDisplay.vue'

const cardNumber = ref('')
const cardHolder = ref('')
const expiry = ref('')
const cvv = ref('')
const document = ref('')

function goBack() {
  // Implement your navigation logic here
  console.log('Go back')
}

function submitForm() {
  // Implement your form submission logic here
  console.log('Form submitted', {
    cardNumber: cardNumber.value,
    cardHolder: cardHolder.value,
    expiry: expiry.value,
    cvv: cvv.value,
    document: document.value
  })
}
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  max-width: 1000px; /* Increased max-width for more space */
  width: auto;
  justify-items: left;
  padding: 40px; /* Increased padding */
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 15px;
}

h1 {
  font-size: 24px;
  margin: 0;
}

.content {
  display: flex;
  justify-content: flex-start; /* Align items to the left */
  overflow: hidden; /* Prevent overflow */
}

.form-container {
  flex: 1; /* Take available space */
  margin-right: 20px; /* Space between form and card preview */
  display: flex;
  flex-direction: column;
}

.card-preview {
  width: 320px; /* Slightly increase width for card preview */
  margin-left: 20px; /* Space between form and card preview */
}

.card-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%; /* Ensures inputs take full width */
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

.submit-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  width: 100%; /* Submit button takes full width */
}
</style>
