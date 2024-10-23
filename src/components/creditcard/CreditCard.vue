<template>
  <div class="card-container">
    <div class="card" :class="{ 'is-flipped': isCardFlipped }">
      <div class="card-front">
        <img :src="cardFrontImage" alt="Card Front" class="card-background" />
        <img :src="cardLogoImage" alt="Card Logo" class="card-logo" />
        <div class="card-number">{{ formattedCardNumber }}</div>
        <div class="card-name">{{ cardName || 'FULL NAME' }}</div>
        <div class="card-expiry">{{ formattedExpiry }}</div>
      </div>
      <div class="card-back">
        <img :src="cardBackImage" alt="Card Back" class="card-background" />
        <div class="card-cvv">{{ cardCvv }}</div>
      </div>
    </div>
    <div class="card-form">
      <div class="form-group">
        <label for="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          v-model="cardNumber"
          @focus="focusInput"
          @blur="blurInput"
          maxlength="19"
          placeholder="0000 0000 0000 0000"
        />
      </div>
      <div class="form-group">
        <label for="cardName">Cardholder Name</label>
        <input
          id="cardName"
          v-model="cardName"
          @focus="focusInput"
          @blur="blurInput"
          placeholder="e.g. Jane Appleseed"
        />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="cardExpiry">Expiry Date (MM/YY)</label>
          <input
            id="cardExpiry"
            v-model="cardExpiry"
            @focus="focusInput"
            @blur="blurInput"
            maxlength="5"
            placeholder="MM/YY"
          />
        </div>
        <div class="form-group">
          <label for="cardCvv">CVV</label>
          <input
            id="cardCvv"
            v-model="cardCvv"
            @focus="focusInput"
            @blur="blurInput"
            maxlength="3"
            placeholder="e.g. 123"
          />
        </div>
      </div>
      <button class="submit-button" @click="submitForm">Confirm</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Import images
import cardFrontImage from './12-1.png'
import cardBackImage from './12-1.png'
import visaLogo from './Visa.png'
import mastercardLogo from './Mastercard.png'
import amexLogo from './AMEX (Black).png'

// Reactive state
const cardNumber = ref('')
const cardName = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')
const isCardFlipped = ref(false)

// Define card logos
const cardLogos = {
  visa: visaLogo,
  mastercard: mastercardLogo,
  amex: amexLogo,
}

const cardLogoImage = computed(() => {
  const number = cardNumber.value.replace(/\s/g, '')

  if (number.startsWith('4')) {
    return cardLogos.visa
  } else if (number.startsWith('5')) {
    return cardLogos.mastercard
  } else if (number.startsWith('34') || number.startsWith('37')) {
    return cardLogos.amex
  }

  return ''
})

// Computed property for formatted card number
const formattedCardNumber = computed(() => {
  const number = cardNumber.value.replace(/\s/g, '')
  return number.replace(/(.{4})/g, '$1 ').trim() || '0000 0000 0000 0000'
})

// Computed property for formatted expiry
const formattedExpiry = computed(() => {
  return cardExpiry.value || 'MM/YY'
})

// Focus and blur handlers
const focusInput = (e) => {
  if (e.target.id === 'cardCvv') {
    isCardFlipped.value = true
  }
}

const blurInput = () => {
  isCardFlipped.value = false
}

// Form submission handler
const submitForm = () => {
  // Implement form submission logic here
  console.log('Form submitted')
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Space Grotesk', sans-serif;
}

.card {
  width: 447px;
  height: 245px;
  perspective: 1000px;
  margin-bottom: 2rem;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.6s;
  border-radius: 10px;
  overflow: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

.card.is-flipped .card-front {
  transform: rotateY(180deg);
}

.card.is-flipped .card-back {
  transform: rotateY(0);
}

.card-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-logo {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 80px;
}

.card-number {
  position: absolute;
  bottom: 80px;
  left: 20px;
  font-size: 28px;
  color: white;
  letter-spacing: 2px;
}

.card-name {
  position: absolute;
  bottom: 40px;
  left: 20px;
  font-size: 14px;
  color: white;
  text-transform: uppercase;
}

.card-expiry {
  position: absolute;
  bottom: 40px;
  right: 20px;
  font-size: 14px;
  color: white;
}

.card-cvv {
  position: absolute;
  top: 110px;
  right: 40px;
  font-size: 14px;
  color: black;
}

.card-form {
  width: 380px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #21092f;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #dedddf;
  border-radius: 8px;
  font-size: 18px;
}

input:focus {
  outline: none;
  border-color: #6448fe;
}

.submit-button {
  width: 100%;
  padding: 15px;
  background-color: #21092f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #4b4d62;
}

@media (max-width: 768px) {
  .card {
    width: 300px;
    height: 165px;
  }

  .card-number {
    font-size: 18px;
    bottom: 60px;
  }

  .card-name,
  .card-expiry {
    font-size: 12px;
    bottom: 30px;
  }

  .card-form {
    width: 300px;
  }
}
</style>
