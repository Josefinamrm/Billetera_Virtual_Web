<template>
  <div class="credit-card" :class="{ 'data-hidden': isHidden }">
    <div class="card-content">
      <div class="card-front">
        <div class="card-header">
          <img
            v-if="cardLogoImage"
            :src="cardLogoImage"
            :alt="cardType"
            class="card-logo"
            :class="{ 'visa-logo': isVisa }"
          />
        </div>
        <div class="card-number">{{ formattedCardNumber }}</div>
        <div class="card-details">
          <div class="card-name">{{ cardName }}</div>
          <div class="card-expiry">{{ cardExpiry }}</div>
        </div>
      </div>
      <div class="card-back">
        <div class="black-bar"></div>
        <div class="cvv-container">
          <div class="cvv" v-if="!isHidden">{{ cvv }}</div>
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
  const number = props.cardNumber.replace(/\s/g, '')
  return number.replace(/(\d{4})/g, '$1 ').trim()
})

const cardLogoImage = computed(() => {
  const cardNum = props.cardNumber.replace(/\s/g, '')
  if (cardNum.startsWith('4')) return visaLogo
  if (/^(51|52|53|54|55)/.test(cardNum)) return mastercardLogo
  if (/^(34|37)/.test(cardNum)) return amexLogo
  return ''
})

const isVisa = computed(() => props.cardNumber.startsWith('4'))

const cardType = computed(() => {
  if (isVisa.value) return 'Visa'
  if (cardLogoImage.value === mastercardLogo) return 'Mastercard'
  if (cardLogoImage.value === amexLogo) return 'American Express'
  return 'Credit Card'
})
</script>

<style scoped>
.credit-card {
  width: 350px;
  height: 200px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  color: black;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  perspective: 1000px;
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.credit-card:hover .card-content {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.card-back {
  transform: rotateY(180deg);
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
}

.black-bar {
  width: 100%;
  height: 40px;
  background-color: black;
  margin-bottom: 10px;
}

.cvv-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 20px;
}

.cvv {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.card-logo {
  height: 30px;
  object-fit: contain;
}

.visa-logo {
  height: 20px;
}

.card-number {
  font-size: 1.5rem;
  letter-spacing: 2px;
  font-weight: bold;
  text-align: center;
  word-spacing: 0.5rem;
  line-height: 1.2;
  margin: 20px 0;
}

.card-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.card-name {
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
}

.card-expiry {
  font-size: 0.9rem;
  font-weight: bold;
}

/* Blur effect for hidden data */
.data-hidden .card-number,
.data-hidden .card-name,
.data-hidden .card-expiry,
.data-hidden .cvv {
  filter: blur(4px);
  pointer-events: none; /* Prevent interaction */
}
</style>
