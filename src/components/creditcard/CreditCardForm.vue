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
            <input
              type="text"
              id="cardHolder"
              v-model="cardHolder"
              @input="formatCardHolder"
              placeholder="Ingresar el nombre como figura en la tarjeta..."
            />
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
            <input
              type="text"
              id="cvv"
              v-model="cvv"
              maxlength="3"
              placeholder="Ingresar..."
            />
          </div>

          <button type="submit" class="submit-button">Guardar</button>
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

    <!-- Error Popup -->
    <div v-if="showErrorMessage" class="error-popup">
      <div class="error-popup-content">
        <p>{{ errorMessage }}</p>
        <button @click="closeErrorPopup" class="close-button">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CreditCard from './CreditCardDisplay.vue';
import { useCardStore } from '@/stores/cardStore';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const cardStore = useCardStore();
const userStore = useUserStore();

// Form fields
const cardNumber = ref('');
const cardHolder = ref('');
const expiry = ref('');
const cvv = ref('');
const showErrorMessage = ref(false);
const errorMessage = ref('');

onMounted(() => {
  // Load user data on component mount
  userStore.loadUser();

  // Pre-fill the cardholder name with user's full name
  const fullName = `${userStore.userData.nombre} ${userStore.userData.apellido}`.trim().toUpperCase();
  cardHolder.value = fullName;
});

// Form formatting functions
const formatCardNumber = () => {
  cardNumber.value = cardNumber.value
    .replace(/\s+/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim();
};

const formatCardHolder = () => {
  cardHolder.value = cardHolder.value.toUpperCase();
};

const formatExpiry = () => {
  expiry.value = expiry.value
    .replace(/^([1-9]\/|[2-9])$/g, '0$1')
    .replace(/^(0[1-9]|1[0-2])$/g, '$1/')
    .replace(/^([0-1])([3-9])$/g, '0$1/$2')
    .replace(/^(\d{2})(\d{2})$/g, '$1/$2')
    .replace(/\/\//g, '/');
};

// Navigation
const goBack = () => {
  router.back();
};

// Form submission
const submitForm = () => {
  // Get the registered user's name from the store
  const registeredName = `${userStore.userData.nombre} ${userStore.userData.apellido}`.trim().toUpperCase();
  const submittedName = cardHolder.value.trim().toUpperCase();

  // Check if the submitted name matches the registered name
  if (submittedName !== registeredName) {
    errorMessage.value = 'El nombre del titular debe coincidir con el nombre registrado.';
    showErrorMessage.value = true;
    return;
  }

  try {
    // Create new card object
    const newCard = {
      number: cardNumber.value.replace(/\s/g, ''),
      name: cardHolder.value,
      validUntil: expiry.value,
      cvv: cvv.value
    };

    // Add card to store
    cardStore.addCard(newCard);

    // Save to localStorage
    cardStore.saveCardsToLocalStorage();

    // Reset form and navigate back
    router.push('/user/tarjetas');
  } catch (error) {
    console.error('Error saving card:', error);
    errorMessage.value = 'Error al guardar la tarjeta. Por favor intenta nuevamente.';
    showErrorMessage.value = true;
  }
};

const closeErrorPopup = () => {
  showErrorMessage.value = false;
};
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.error-popup-content {
  text-align: center;
}

.error-popup p {
  margin: 0 0 15px 0;
  color: #333;
}

.close-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.close-button:hover {
  background-color: #d32f2f;
}
</style>