<template>
  <div class="credit-card" :class="{ 'data-hidden': isHidden }">
    <div class="card-content" :class="{ 'visa-card-content': isVisa, 'mastercard-card-content': isMastercard }">
      <div class="card-front">
        <div class="card-header">
          <img
            v-if="cardLogoImage"
            :src="cardLogoImage"
            :alt="cardType"
            class="card-logo"
            :class="{ 'visa-logo': isVisa, 'mastercard-logo': isMastercard }"
          />
        </div>
        <div class="card-number">{{ formattedCardNumber }}</div>
        <div class="card-name">{{ cardName }}</div>
        <div class="card-details">
          <div class="detail-group">
            <div class="detail-label">VENCIMIENTO</div>
            <div class="detail-value">{{ formattedExpiry }}</div>
          </div>
          <div class="detail-group">
            <div class="detail-label">CVV</div>
            <div class="detail-value">{{ formattedCVV }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import visaLogo from './Visa_Brandmark_Blue_RGB_2021.png'
import mastercardLogo from './ma_symbol_opt_45_3x.png'
import amexLogo from './AXP_BlueBoxLogo_Alternate_REGULARscale_RGB_DIGITAL_700x700.svg'

const props = defineProps({
  cardNumber: {
    type: String,
    required: true
  },
  cardName: {
    type: String,
    required: true
  },
  cardExpiry: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },
  isHidden: {
    type: Boolean,
    default: false
  }
})
const formattedCardNumber = computed(() => {
  const cardNumber = props.cardNumber.replace(/\s/g, '') // Remove any existing spaces

  // Ensure it's a valid card number (numeric and up to 16 digits)
  if (!/^\d{0,16}$/.test(cardNumber)) {
    return 'Número de tarjeta no válido'
  }

  // Return masked or formatted number based on visibility
  return props.isHidden
    ? '•••• •••• •••• ••••'
    : cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ').trim() // Add spaces every 4 digits
})

const formattedExpiry = computed(() => {
  const expiry = props.cardExpiry

  // Validate expiry format MM/YY or MM/YYYY
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    return'Fecha de vencimiento no válida'
  }

  // Return masked or formatted expiry based on visibility
  return props.isHidden ? '••/••' : expiry
})

const formattedCVV = computed(() => {
  const cvv = props.cvv

  // Ensure it's a valid CVV (numeric and exactly 3 digits)
  if (!/^\d{3}$/.test(cvv)) {
    return 'CVV no válido'
  }

  // Return masked or formatted CVV based on visibility
  return props.isHidden ? '•••' : cvv
})


const cardLogoImage = computed(() => {
  const cardNum = props.cardNumber.replace(/\s/g, '')
  if (cardNum.startsWith('4')) return visaLogo
  if (/^(51|52|53|54|55)/.test(cardNum)) return mastercardLogo
  if (/^(34|37)/.test(cardNum)) return amexLogo
  return ''
})

const isVisa = computed(() => props.cardNumber.startsWith('4'))
const isMastercard = computed(() => /^(51|52|53|54|55)/.test(props.cardNumber.replace(/\s/g, '')))

const cardType = computed(() => {
  if (isVisa.value) return 'Visa'
  if (isMastercard.value) return 'Mastercard'
  if (/^(34|37)/.test(props.cardNumber.replace(/\s/g, ''))) return 'American Express'
  return 'Credit Card'
})
</script><style scoped>
.credit-card {
  width: 350px;
  height: 200px;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  color: #2c3e50;
  position: relative;
  overflow: hidden;
  font-family: Arial, sans-serif;
  border: 1px solid black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.visa-card-content {
  margin-top: 5px;
}

.mastercard-card-content {
  margin-top: -15px; /* Add specific margin for Mastercard if needed */
}

.card-header {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-bottom: 10px;
}

.card-logo {
  height: 40px;
  object-fit: contain;
}

.visa-logo {
  height: 20px;
  margin-top: 5px;
}

.mastercard-logo {
  height: 50px;
  margin-top: -5px; /* Adjust this to lower the image further */
}

.card-number {
  font-size: 1.5rem;
  letter-spacing: 2px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 5px; /* Adjust margin for Mastercard alignment */
  color: #2c3e50;
}

.card-name {
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 15px; /* Adjust margin for Mastercard alignment */
  color: #2c3e50;
  font-weight: bold;
}

.card-details {
  display: flex;
  justify-content: space-between;
}

.detail-group {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  margin-bottom: 2px;
  color: #7f8c8d;
}

.detail-value {
  font-size: 0.9rem;
  font-weight: bold;
  color: #2c3e50;
}

.card-number,
.card-name,
.card-details {
  padding-left: 10px;
}

.data-hidden .card-number,
.data-hidden .card-name,
.data-hidden .detail-value {
  filter: blur(4px);
}
</style>