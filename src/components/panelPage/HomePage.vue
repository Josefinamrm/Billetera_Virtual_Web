<template>
  <div class="home-page">
    <div class="financial-dashboard">
      <div class="left-column">
        <div class="transfer-section">
          <transfer-component/>
        </div>
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
      </div>
      <div class="transactions-section">
        <h2>Actividad Reciente</h2>
        <div class="transaction-list">
          <div v-for="(group, index) in transactionGroups" :key="index" class="transaction-group">
            <h3>{{ group.title }}</h3>
            <div v-for="transaction in group.transactions" :key="transaction.id" class="transaction-item">
              <div class="transaction-info">
                <img :src="transaction.avatar" :alt="transaction.name" class="avatar">
                <div>
                  <div class="transaction-name">{{ transaction.name }}</div>
                  <div class="transaction-date">{{ transaction.date }}</div>
                </div>
              </div>
              <div :class="['transaction-amount', transaction.amount > 0 ? 'positive' : 'negative']">
                {{ transaction.amount > 0 ? '+' : '' }}${{ Math.abs(transaction.amount) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ConfirmTransferPopup ref="confirmPopup" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import TransferComponent from '@/components/transferComponent.vue'
import ConfirmTransferPopup from '../confirmTransferPopup.vue'

const confirmPopup = ref(null)

const transactionGroups = ref([
  {
    title: 'Hoy',
    transactions: [
      { id: 1, name: 'John Doe', date: 'Agosto 20, 6:22 PM', amount: 90, avatar: '../../Public/img.png' },
      { id: 2, name: 'Jim Doe', date: 'Agosto 20, 5:25 PM', amount: -88, avatar: '../../Public/img.png' }
    ]
  },
  {
    title: 'Ayer',
    transactions: [
      { id: 3, name: 'Supermercado', date: 'Agosto 19, 6:22 PM', amount: 900, avatar: '../../Public/img.png' },
      { id: 4, name: 'John Doe', date: 'Agosto 19, 3:12 PM', amount: -88, avatar: '../../Public/img.png' },
      { id: 5, name: 'Supermercado', date: 'Agosto 19, 2:03 PM', amount: 80, avatar: '../../Public/img.png' }
    ]
  },
  {
    title: 'Ultima Semana',
    transactions: [
      { id: 6, name: 'Cine', date: 'Agosto 20, 6:22 PM', amount: 200, avatar: '../../Public/img.png' },
      { id: 7, name: 'John Doe', date: 'Agosto 20, 6:22 PM', amount: 90, avatar: '../../Public/img.png' },
      { id: 7, name: 'John Doe', date: 'Agosto 20, 6:22 PM', amount: 90, avatar: '../../Public/img.png' },
      { id: 7, name: 'John Doe', date: 'Agosto 20, 6:22 PM', amount: 90, avatar: '../../Public/img.png' }
    ]
  }
])

const expenses = reactive({
  Ene: 85000,
  Feb: 18000,
  Mar: 50000,
  Abr: 19000,
  May: 36000,
  Jun: 26000,
})
const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']

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

const totalExpenses = computed(() => {
  return Object.values(expenses).reduce((acc, expense) => acc + expense, 0)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.home-page {
  font-family: 'Inter', sans-serif;
  height: 100%;
  overflow: hidden;
  padding: 1rem;
  cursor: default;
}

.financial-dashboard {
  display: flex;
  gap: 2rem;
  height: 100%;
}

.left-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.transfer-section {
  flex: 0 0 auto;
}

.transactions-section {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 55px;
}

.transaction-list {
  overflow-y: auto;
  flex: 1;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.transaction-list::-webkit-scrollbar {
  display: none;
}

h2 {
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
}

.transaction-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.transaction-name {
  font-weight: bold;
}

.transaction-date {
  font-size: 0.8rem;
  color: #666;
}

.transaction-amount {
  font-weight: bold;
}

.transaction-amount.positive {
  color: #4CAF50;
}

.transaction-amount.negative {
  color: #F44336;
}

.expenses {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
</style>