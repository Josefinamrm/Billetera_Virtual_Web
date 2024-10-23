<template>
  <div class="app-container">
    <!-- Back Button and Title -->
    <div class="title">
      <button class="back" @click="goToLastVisitedPage"><h2><-</h2></button>
      <h2>Nueva Tarjeta</h2>
    </div>

    <!-- Form and Card Display -->
    <div class="newCard">
      <!-- Card Input Form -->
      <div class="attributes">
        <div class="number">
          <label for="number">Número de Tarjeta</label>
          <div class="text-box">
            <input type="text" id="number" v-model="cardNumber" @focus="handleFocus" @blur="handleBlur" maxlength="19" placeholder="0000 0000 0000 0000" />
          </div>
        </div>

        <div class="name">
          <label for="name">Nombre del titular de la tarjeta</label>
          <div class="text-box">
            <input type="text" id="name" v-model="cardName" placeholder="e.g. Jane Appleseed" />
          </div>
        </div>

        <div class="identification">
          <label for="identification">Documento del titular</label>
          <div class="text-box">
            <input type="text" id="identification" v-model="identification" placeholder="123456789" />
          </div>
        </div>

        <div class="expiration">
          <label for="expiration">Vencimiento</label>
          <div class="text-box">
            <input type="text" id="expiration" v-model="cardExpiry" maxlength="5" placeholder="MM/YY" />
          </div>
        </div>

        <div class="security">
          <label for="security">Código de seguridad</label>
          <div class="text-box">
            <input type="text" id="security" v-model="cardCvv" @focus="handleFocus" @blur="handleBlur" maxlength="3" placeholder="123" />
          </div>
        </div>
      </div>

      <!-- Credit Card Display -->
      <CreditCardDisplay
        class="card"
        :card-number="cardNumber"
        :card-name="cardName"
        :card-expiry="cardExpiry"
        :card-cvv="cardCvv"
        :is-card-flipped="isCardFlipped"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CreditCardDisplay from './CreditCardDisplay.vue'

// Ref variables for card inputs
const cardNumber = ref('')
const cardName = ref('')
const identification = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')
const isCardFlipped = ref(false)

// Router for navigating back
const router = useRouter()

function goToLastVisitedPage() {
  router.back()
}

// Flip card when focusing on CVV input
const handleFocus = (e) => {
  if (e.target.id === 'security') {
    isCardFlipped.value = true
  }
}

const handleBlur = () => {
  isCardFlipped.value = false
}
</script>

<style scoped>
h2 {
  color: black;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.title {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
}

.app-container {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.text-box {
  width: min-content;
  border-style: solid;
  border-width: 1px;
  border-color: #e0e0e0;
  border-radius: 5px;
  margin-bottom: 25px;
  padding: 5px;
}

label {
  font-size: 15px;
  font-weight: 600;
  color: #000000;
}

.newCard {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 150px;
  padding-left: 50px;
}

.card {
  width: 300px;
  height: 200px;
  margin-left: 20px;
}
</style>
