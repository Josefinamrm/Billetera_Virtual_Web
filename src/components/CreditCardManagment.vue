<template>
  <div class="credit-card-management">
    <header class="header">
      <h1 class="title">Mis Tarjetas</h1>
      <button class="add-button">
        <PlusIcon class="icon" />
        Agregar Tarjetas
      </button>
    </header>

    <div class="visibility-toggle">
      <button @click="toggleVisibility" class="toggle-button">
        <EyeIcon v-if="!isHidden" />
        <EyeOffIcon v-else />
        {{ isHidden ? 'Show' : 'Hide' }} Card Details
      </button>
    </div>

    <div class="card-scroll-container">
      <div class="card-scroll">
        <div v-for="card in cards" :key="card.number" class="card-item">
          <CreditCardDisplay
            :card-number="card.number"
            :card-name="card.name"
            :card-expiry="card.validUntil"
            :is-hidden="isHidden"
          />
          <div class="card-info" :class="{ 'data-hidden': isHidden }">
            <p><strong>Card Number:</strong> {{ card.number }}</p>
            <p><strong>Card Name:</strong> {{ card.name }}</p>
            <p><strong>Expiry Date:</strong> {{ card.validUntil }}</p>
            <p><strong>CVV:</strong> {{ card.cvv }}</p>
            <p><strong>Emission Date:</strong> {{ card.emissionDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon, EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import CreditCardDisplay from './creditcard/CreditCardDisplay.vue'

const isHidden = ref(false)

const toggleVisibility = () => {
  isHidden.value = !isHidden.value
}

const cards = ref([
  {
    number: '4593 1111 1111 1111',
    name: 'Junior Rambau',
    validUntil: '10/25',
    cvv: '123',
    emissionDate: '01/22',
  },
  {
    number: '5182 8224 6310 005',
    name: 'Junior Rambau',
    validUntil: '11/26',
    cvv: '456',
    emissionDate: '02/23',
  },
  {
    number: '4111 1111 1111 1111',
    name: 'Junior Rambau',
    validUntil: '12/27',
    cvv: '789',
    emissionDate: '03/24',
  },
])
</script>

<style scoped>
.credit-card-management {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

.add-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #45a049;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

.visibility-toggle {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.toggle-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-button:hover {
  background-color: #e0e0e0;
}

.card-scroll-container {
  overflow-x: auto;
  padding-bottom: 1rem;
}

.card-scroll {
  display: flex;
  gap: 2rem;
  padding: 1rem;
}

.card-item {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-info {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  width: 100%;
}

.card-info p {
  margin: 0.5rem 0;
}

.data-hidden p {
  filter: blur(4px);
}
</style>