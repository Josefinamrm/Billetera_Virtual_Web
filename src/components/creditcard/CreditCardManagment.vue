<template>
  <div class="credit-card-management">
    <header class="header">
      <h1 class="title">Tarjetas</h1>
      <button class="add-button" @click="$router.push('/user/nueva-tarjeta')">
        <PlusIcon class="icon" />
        Agregar Tarjetas
      </button>
    </header>

    <div class="visibility-toggle">
      <button @click="toggleVisibility" class="toggle-button">
        <EyeIcon v-if="!isHidden" />
        <EyeOffIcon v-else />
        {{ isHidden ? ' Mostrar' : ' Ocultar' }} Detalles de las Tarjetas
      </button>
    </div>

    <div class="card-scroll-container">
      <div class="card-scroll">
        <div v-for="(card, index) in cards" :key="card.number" class="card-item">
          <CreditCardDisplay
            :card-number="card.number"
            :card-name="card.name"
            :card-expiry="card.validUntil"
            :is-hidden="isHidden"
          />
          <button @click="confirmRemoveCard(index)" class="remove-button">
            <TrashIcon class="icon" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="showConfirmDialog" class="confirm-dialog">
      <div class="confirm-dialog-content">
        <p>¿Estás seguro de que quieres eliminar esta tarjeta?</p>
        <div class="confirm-dialog-buttons">
          <button @click="removeCard" class="confirm-button">Eliminar</button>
          <button @click="cancelRemoveCard" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon, EyeIcon, EyeOffIcon, TrashIcon } from 'lucide-vue-next'
import CreditCardDisplay from './CreditCardDisplay.vue'

const isHidden = ref(false)
const showConfirmDialog = ref(false)
const cardIndexToRemove = ref(null)

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
  {
    number: '4111 1111 1111 1111',
    name: 'Junior Rambau',
    validUntil: '12/27',
    cvv: '789',
    emissionDate: '03/24',
  },
])

const confirmRemoveCard = (index) => {
  cardIndexToRemove.value = index
  showConfirmDialog.value = true
}

const removeCard = () => {
  if (cardIndexToRemove.value !== null) {
    cards.value.splice(cardIndexToRemove.value, 1)
    cardIndexToRemove.value = null
  }
  showConfirmDialog.value = false
}

const cancelRemoveCard = () => {
  cardIndexToRemove.value = null
  showConfirmDialog.value = false
}
</script>

<style scoped>
.credit-card-management {
  max-width: 1600px;
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

.remove-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.remove-button:hover {
  background-color: #d32f2f;
}

.remove-button .icon {
  margin-right: 0;
}

.confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.confirm-dialog-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}

.confirm-dialog-buttons {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
}

.confirm-button,
.cancel-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button {
  background-color: #f44336;
  color: white;
}

.confirm-button:hover {
  background-color: #d32f2f;
}

.cancel-button {
  background-color: #f0f0f0;
  color: #333;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}
</style>