<template>
  <div class="dashboard">
    <div class="left-column">
      <div class="expenses">
        <h2>Gastos</h2>
        <p class="label">Gastos Totales</p>
        <h3 class="amount">${{ totalExpenses }}</h3>
        <p class="period">6 meses</p>
        <div class="chart">
          <div
            v-for="(expense, month) in expenses"
            :key="month"
            class="bar"
            :style="{ height: `${expense / 1000}px` }"
            @mouseover="showTooltip(month, expense, $event)"
            @mouseout="hideTooltip"
          ></div>
        </div>
        <div class="months">
          <span v-for="month in months" :key="month">{{ month }}</span>
        </div>
        <div v-if="tooltipVisible" class="tooltip" :style="tooltipStyle">
          {{ tooltipContent }}
        </div>
      </div>
      <div class="contacts">
        <h2>Contactos</h2>
        <ul>
          <li v-for="contact in contacts" :key="contact.id">
            <img :src="contact.avatar" :alt="contact.name" class="avatar" />
            <div class="contact-info">
              <strong>{{ contact.name }}</strong>
              <span>{{ contact.phone }}</span>
            </div>
            <button type="button" class="btn btn-primary">Enviar</button>
            <button type="button" class="btn btn-outline">Solicitar</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="right-column">
      <div class="transfers">
        <h2>Transferencias</h2>
        <div class="balance-section">
          <p class="label">Balance Actual</p>
          <p class="amount">${{ currentBalance }}</p>
        </div>
        <form @submit.prevent="submitTransfer">
          <input v-model="transferAlias" type="text" placeholder="Ingrese Alias" />
          <input v-model="transferAmount" type="number" placeholder="Ingrese Monto" />
          <div class="form-buttons">
            <button type="submit" class="btn btn-primary">Enviar</button>
            <button type="button" class="btn btn-secondary">Solicitar</button>
          </div>
        </form>
      </div>
      <div class="payments">
        <h2>Pagos de Servicios</h2>
        <form @submit.prevent="submitPayment">
          <select v-model="selectedService" class="select-input">
            <option value="" disabled selected>Seleccione un servicio</option>
            <option v-for="service in services" :key="service.id" :value="service.id">
              {{ service.name }}
            </option>
          </select>
          <input v-model="paymentAmount" type="number" placeholder="Ingrese Monto" class="number-input" />
          <div class="payment-methods">
            <button type="button" @click="paymentMethod = 'card'" :class="['btn', paymentMethod === 'card' ? 'btn-primary' : 'btn-outline']">
              Tarjeta
            </button>
            <button type="button" @click="paymentMethod = 'account'" :class="['btn', paymentMethod === 'account' ? 'btn-primary' : 'btn-outline']">
              Crédito en Cuenta
            </button>
          </div>
          <button type="submit" class="btn  submit-btn">Pagar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const expenses = reactive({
  Ene: 85000,
  Feb: 18000,
  Mar: 50000,
  Abr: 19000,
  May: 36000,
  Jun: 26000,
})
const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
const transferAlias = ref('')
const transferAmount = ref('')
const contacts = [
  { id: 1, name: 'John Doe', phone: '+54 911 6721 9021', avatar: '../../Public/img.png' },
  { id: 2, name: 'Jim Doe', phone: '+54 911 6721 9021', avatar: '../../Public/img.png' },
  { id: 3, name: 'Jane Doe', phone: '+54 911 6721 9021', avatar: '../../Public/img.png' },
]

const tooltipVisible = ref(false)
const tooltipContent = ref('')
const tooltipStyle = ref({})

const showTooltip = (month, expense, event) => {
  tooltipContent.value = `${month}: $${expense}`
  tooltipVisible.value = true
  tooltipStyle.value = {
    left: `${event.clientX + 10}px`,
    top: `${event.clientY + 10}px`
  }
}

const hideTooltip = () => {
  tooltipVisible.value = false
}

const submitTransfer = () => {
  console.log('Transfer submitted:', transferAlias.value, transferAmount.value)
  transferAlias.value = ''
  transferAmount.value = ''
}

const totalExpenses = computed(() => {
  return Object.values(expenses).reduce((acc, expense) => acc + expense, 0)
})

const currentBalance = computed(() => {
  return 20000
})

// New code for payments
const selectedService = ref('')
const paymentAmount = ref('')
const paymentMethod = ref('card')

const services = [
  { id: 1, name: 'Electricidad' },
  { id: 2, name: 'Agua' },
  { id: 3, name: 'Gas' },
  { id: 4, name: 'Internet' },
  { id: 5, name: 'Teléfono' },
]

const submitPayment = () => {
  console.log('Payment submitted:', {
    service: selectedService.value,
    amount: paymentAmount.value,
    method: paymentMethod.value
  })
  selectedService.value = ''
  paymentAmount.value = ''
  paymentMethod.value = 'card'
}
</script>

<style scoped>
.dashboard {
  display: flex;
  gap: 2rem;
  padding: 0.5rem;
  max-width: 1800px;
  font-family: Arial, sans-serif;
  cursor: default;
}

.left-column, .right-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.left-column {
  flex: 1;
}

.right-column {
  flex: 1;
}

.expenses, .contacts, .transfers, .payments {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.transfers{
  height: 390px;
}
.payments{
  height: 316px;

}
h2 {
  font-size: 1.7rem;
  margin-bottom: 1rem;
  color: #333;
}

h3 {
  font-size: 5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.label {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.amount {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.25rem 0;
  color: #333;
}

.period {
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 150px;
  margin-top: 1rem;
  position: relative;
}

.bar {
  width: 12%;
  background-color: #4CAF50;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.bar:hover {
  opacity: 0.8;
}

.months {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.8rem;
}

.tooltip {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  pointer-events: none;
  z-index: 1000;
  white-space: pre-wrap;
}

.balance-section {
  margin-bottom: 1rem;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input, .select-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
}

.form-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.contacts ul {
  list-style: none;
  padding: 0;
}

.contacts li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.contacts li:last-child {
  border-bottom: none;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.contact-info {
  flex-grow: 1;
}

.contact-info strong {
  display: block;
  font-size: 0.9rem;
  color: #333;
}

.contact-info span {
  color: #666;
  font-size: 0.9rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s, color 0.3s;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #4CAF50;
  color: #4CAF50;
}

.btn-outline:hover {
  background-color: #4CAF50;
  color: white;
}

.btn-primary {
  background-color: #4CAF50;
  border: none;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-secondary {
  background-color: #D9D9D9;
  border: none;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.payment-methods {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.payment-methods .btn {
  flex: 1;
}

.submit-btn {
  width: 100%;
  color:white;
  background-color: black;

}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .left-column, .right-column {
    width: 100%;
  }

  .chart {
    height: 100px;
  }

  .contacts li {
    flex-direction: column;
    align-items: flex-start;
  }

  .contacts button {
    margin-top: 0.5rem;
  }
}
</style>