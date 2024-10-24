<template>
  <div class="app-container">
    <div class="header">
      <button class="back-button" @click="goBack">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <h1>Nueva tarjeta</h1>
    </div>

    <div class="content">
      <div class="form-container">
        <form @submit.prevent="submitForm" class="card-form">
          <div class="form-group">
            <label for="cardNumber">Número de tarjeta</label>
            <input
              type="text"
              id="cardNumber"
              v-model="cardNumber"
              @input="formatCardNumber"
              maxlength="19"
              placeholder="Ingresar..."
            />
            <span v-if="cardNumber && !isCardNumberValid" class="error"
              >Número de tarjeta no válido</span
            >
          </div>

          <div class="form-group">
            <label for="cardHolder">Nombre del titular de la tarjeta</label>
            <input type="text" id="cardHolder" v-model="cardHolder" placeholder="Ingresar..." />
          </div>

          <div class="form-group">
            <label for="expiry">Vencimiento</label>
            <input
              type="text"
              id="expiry"
              v-model="expiry"
              @input="formatExpiry"
              maxlength="5"
              placeholder="MM/AA"
            />
            <span v-if="expiry && !isExpiryValid" class="error"
              >Fecha de vencimiento no válida</span
            >
          </div>

          <div class="form-group">
            <label for="cvv">Código de seguridad</label>
            <input type="text" id="cvv" v-model="cvv" maxlength="3" placeholder="Ingresar..." />
            <span v-if="cvv && !isCVVValid" class="error">CVV no válido</span>
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
import { ref, computed } from 'vue'
import CreditCard from './CreditCardDisplay.vue'

const cardNumber = ref('')
const cardHolder = ref('')
const expiry = ref('')
const cvv = ref('')
const document = ref('')

const isCardNumberValid = computed(() => {
  const regex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/
  return regex.test(cardNumber.value.replace(/\s/g, ''))
})

const isExpiryValid = computed(() => {
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
  if (!regex.test(expiry.value)) return false
  const [month, year] = expiry.value.split('/').map(Number)
  const currentYear = new Date().getFullYear() % 100
  const currentMonth = new Date().getMonth() + 1
  return year > currentYear || (year === currentYear && month >= currentMonth)
})

const isCVVValid = computed(() => {
  const regex = /^[0-9]{3}$/
  return regex.test(cvv.value)
})

function formatCardNumber() {
  cardNumber.value = cardNumber.value
    .replace(/\s+/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim()
}

function formatExpiry() {
  expiry.value = expiry.value
    .replace(/^([1-9]\/|[2-9])$/g, '0$1') // 3 -> 03
    .replace(/^(0[1-9]|1[0-2])$/g, '$1/') // 11 -> 11/
    .replace(/^([0-1])([3-9])$/g, '0$1/$2') // 13 -> 01/3
    .replace(/^(\d{2})(\d{2})$/g, '$1/$2') // 1125 -> 11/25
    .replace(/\/\//g, '/')
}

function goBack() {
  console.log('Regresar')
}

function submitForm() {
  if (isCardNumberValid.value && isExpiryValid.value && isCVVValid.value) {
    console.log('Formulario enviado', {
      cardNumber: cardNumber.value,
      cardHolder: cardHolder.value,
      expiry: expiry.value,
      cvv: cvv.value,
      document: document.value
    })
  } else {
    console.log('El formulario contiene datos no válidos')
  }
}
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  max-width: 1000px;
  width: auto;
  height: auto;
  justify-items: left;
  padding: 40px;
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
  justify-content: flex-start;
  overflow: hidden;
}

.form-container {
  flex: 1;
  margin-right: 200px;
  display: flex;
  flex-direction: column;
}

.card-preview {
  width: 400px;
  margin-left: 20px;
}

.card-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
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

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f0f0f0;
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

.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
}
</style>
