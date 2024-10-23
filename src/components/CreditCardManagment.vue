<template>
  <div class="credit-card-management">
    <header class="header">
      <h1 class="title">Mis Tarjetas</h1>
      <button class="add-button">
        <PlusIcon class="icon" />
        Agregar Tarjetas
      </button>
    </header>

    <div class="card-display">
      <CreditCard
        v-for="card in cards"
        :key="card.number"
        :card-number="card.number"
        :card-name="card.name"
        :expiry-date="card.validUntil"
        :cvv="card.cvv"
        :theme="card.theme"
      />
    </div>

    <section class="information">
      <h2 class="section-title">
        Informacion
        <InfoIcon class="icon" />
      </h2>
      <div class="card-info-grid">
        <div v-for="card in cards" :key="card.number" class="card-info">
          <div class="info-row">
            <span class="info-label">Tarjeta</span>
            <span class="info-value">{{ card.type }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Nombre</span>
            <span class="info-value">{{ card.name }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Numero</span>
            <span class="info-value">{{ maskCardNumber(card.number) }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">CVV</span>
            <span class="info-value">***</span>
          </div>
          <div class="info-row">
            <span class="info-label">Emitida</span>
            <span class="info-value">{{ card.issuedDate }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Valido Hasta</span>
            <span class="info-value">{{ card.validUntil }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon, InfoIcon } from 'lucide-vue-next'
import CreditCard from './creditcard/CreditCard.vue'

const cards = ref([
  {
    type: 'Visa Black',
    name: 'Junior Rambau',
    number: '4593 1111 1111 1111',
    cvv: '123',
    issuedDate: '10/21',
    validUntil: '10/25',
    theme: 'visa',
  },
  {
    type: 'American Express',
    name: 'Junior Rambau',
    number: '3782 8224 6310 005',
    cvv: '1234',
    issuedDate: '11/22',
    validUntil: '11/26',
    theme: 'amex',
  },
  {
    type: 'Visa Silver',
    name: 'Junior Rambau',
    number: '4111 1111 1111 1111',
    cvv: '321',
    issuedDate: '12/23',
    validUntil: '12/27',
    theme: 'visa',
  },
])

const maskCardNumber = (number) => {
  return number.replace(/\d(?=\d{4})/g, '*')
}
</script>

<style scoped>
.credit-card-management {
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1.5rem;
  font-family: sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
}

.add-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: white;
  border-radius: 9999px;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #059669;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

.card-display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.information {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
}

.card-info-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2rem;
}

@media (min-width: 768px) {
  .card-info-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.info-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
}
</style>
