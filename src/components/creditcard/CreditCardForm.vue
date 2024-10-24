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
          </div>

          <div class="form-group">
            <label for="cvv">Código de seguridad</label>
            <input type="text" id="cvv" v-model="cvv" maxlength="3" placeholder="Ingresar..." />
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

    <!-- Popup Message -->
    <div v-if="showErrorMessage" class="error-popup">
      <div class="error-popup-content">
        <p>{{ errorMessage }}</p>
        <button @click="closeErrorPopup" class="close-button">Cerrar</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import CreditCard from './CreditCardDisplay.vue';
import { useCardStore } from '@/stores/cardStore';
import { useUserStore } from '@/stores/userStore'; // Import userStore

const cardNumber = ref('');
const cardHolder = ref('');
const expiry = ref('');
const cvv = ref('');
const document = ref('');
const showErrorMessage = ref(false);
const errorMessage = ref('');
import { ref, computed } from 'vue'
import CreditCard from './CreditCardDisplay.vue'
import router from '@/router/index.js'

// Pinia stores
const cardStore = useCardStore();
const userStore = useUserStore(); // Initialize userStore

// Load existing cards from local storage on mount
onMounted(() => {
  cardStore.loadCardsFromLocalStorage();
});

const isCardNumberValid = computed(() => {
  const regex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/;
  return regex.test(cardNumber.value.replace(/\s/g, ''));
});

const isExpiryValid = computed(() => {
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  if (!regex.test(expiry.value)) return false;
  const [month, year] = expiry.value.split('/').map(Number);
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  return year > currentYear || (year === currentYear && month >= currentMonth);
});

const isCVVValid = computed(() => {
  const regex = /^[0-9]{3}$/;
  return regex.test(cvv.value);
});

function formatCardNumber() {
  cardNumber.value = cardNumber.value
    .replace(/\s+/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim();
}

function formatExpiry() {
  expiry.value = expiry.value
    .replace(/^([1-9]\/|[2-9])$/g, '0$1') // 3 -> 03
    .replace(/^(0[1-9]|1[0-2])$/g, '$1/') // 11 -> 11/
    .replace(/^([0-1])([3-9])$/g, '0$1/$2') // 13 -> 01/3
    .replace(/^(\d{2})(\d{2})$/g, '$1/$2') // 1125 -> 11/25
    .replace(/\/\//g, '/');
}

function goBack() {
  router.back()
}

function submitForm() {
  if (isCardNumberValid.value && isExpiryValid.value && isCVVValid.value) {
    // Check if the document matches the user's document
    if (document.value !== userStore.userData.documento) {
      errorMessage.value = 'El documento no coincide con el registrado.';
      showErrorMessage.value = true;
      return;
    }

    const newCard = {
      number: cardNumber.value,
      name: cardHolder.value,
      validUntil: expiry.value,
      cvv: cvv.value,
      emissionDate: document.value,
    };

    // Add new card to the Pinia store
    cardStore.addCard(newCard);

    // Save to local storage
    cardStore.saveCardsToLocalStorage();

    console.log('Formulario enviado', newCard);
    resetForm();
  } else {
    errorMessage.value = 'El formulario contiene datos no válidos.';
    showErrorMessage.value = true;
  }
}

function closeErrorPopup() {
  showErrorMessage.value = false;
}

function resetForm() {
  cardNumber.value = '';
  cardHolder.value = '';
  expiry.value = '';
  cvv.value = '';
  document.value = '';
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

.error-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  z-index: 1000;
}

.error-popup p {
  margin: 0 0 10px 0;
}

.error-popup button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
