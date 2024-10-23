<template>
  <div class="flex flex-col items-center font-sans">
    <CreditCardDisplay
      :card-number="cardNumber"
      :card-name="cardName"
      :card-expiry="cardExpiry"
      :card-cvv="cardCvv"
      :is-card-flipped="isCardFlipped"
    />

    <form @submit.prevent="handleSubmit" class="w-[380px] space-y-4">
      <div>
        <label for="cardNumber" class="block text-xs uppercase tracking-wider text-primary">Card Number</label>
        <input
          id="cardNumber"
          v-model="cardNumber"
          @focus="handleFocus"
          @blur="handleBlur"
          maxlength="19"
          placeholder="0000 0000 0000 0000"
          class="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md text-sm shadow-sm placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label for="cardName" class="block text-xs uppercase tracking-wider text-primary">Cardholder Name</label>
        <input
          id="cardName"
          v-model="cardName"
          @focus="handleFocus"
          @blur="handleBlur"
          placeholder="e.g. Jane Appleseed"
          class="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md text-sm shadow-sm placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <div class="flex gap-4">
        <div class="flex-1">
          <label for="cardExpiry" class="block text-xs uppercase tracking-wider text-primary">Expiry Date (MM/YY)</label>
          <input
            id="cardExpiry"
            v-model="cardExpiry"
            @focus="handleFocus"
            @blur="handleBlur"
            maxlength="5"
            placeholder="MM/YY"
            class="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md text-sm shadow-sm placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div class="flex-1">
          <label for="cardCvv" class="block text-xs uppercase tracking-wider text-primary">CVV</label>
          <input
            id="cardCvv"
            v-model="cardCvv"
            @focus="handleFocus"
            @blur="handleBlur"
            maxlength="3"
            placeholder="e.g. 123"
            class="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md text-sm shadow-sm placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <button type="submit" class="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        Confirm
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CreditCardDisplay from './CreditCardDisplay.vue'

const cardNumber = ref('')
const cardName = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')
const isCardFlipped = ref(false)

const handleFocus = (e) => {
  if (e.target.id === 'cardCvv') {
    isCardFlipped.value = true
  }
}

const handleBlur = () => {
  isCardFlipped.value = false
}

const handleSubmit = () => {
  console.log('Form submitted', {
    cardNumber: cardNumber.value,
    cardName: cardName.value,
    cardExpiry: cardExpiry.value,
    cardCvv: cardCvv.value
  })
}
</script>

<style scoped>
@media (max-width: 768px) {
  .w-\[380px\] {
    width: 300px;
  }
}
</style>