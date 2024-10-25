<template>
  <div class="home-page">
    <div class="financial-dashboard">
      <div class="left-column">
        <div class="transfer-section">
          <transfer-component />
        </div>
        <div class="expenses">
          <h2>Gastos</h2>
          <p class="label">Gastos Totales (últimos 6 meses)</p>
          <h3 class="amount">${{ totalExpenses }}</h3>
          <p class="period">{{ currentPeriod }}</p>
          <div class="chart">
            <div
              v-for="(expense, month) in last6MonthsExpenses"
              :key="month"
              class="bar"
              :style="{ height: `${(expense / maxExpense) * 150}px` }"
              @mouseover="showTooltip(month, expense, $event)"
              @mouseout="hideTooltip"
            ></div>
          </div>
          <div class="months">
            <span v-for="month in Object.keys(last6MonthsExpenses)" :key="month">{{ month }}</span>
          </div>
          <div v-if="tooltipVisible" class="tooltip" :style="tooltipStyle">
            {{ tooltipContent }}
          </div>
        </div>
      </div>
      <div class="transactions-section">
        <h2>Actividad</h2>
        <div class="filters">
          <div class="search-bar">
            <input
              v-model="searchQuery"
              @input="updateSearchQuery"
              type="text"
              placeholder="Buscar..."
            />
          </div>
          <div class="date-filter">
            <input
              type="date"
              v-model="startDate"
              @change="updateDateRange"
              placeholder="Fecha inicio"
            />
            <input
              type="date"
              v-model="endDate"
              @change="updateDateRange"
              placeholder="Fecha fin"
            />
          </div>
        </div>
        <div class="transaction-list">
          <div v-if="hasTransactions">
            <div
              v-for="transaction in activityStore.filteredTransactions"
              :key="transaction.id"
              class="transaction-item"
            >
              <div class="transaction-info">
                <img :src="getTransactionIcon(transaction)" :alt="transaction.name" class="avatar" />
                <div>
                  <div class="transaction-name">{{ transaction.name }}</div>
                  <div class="transaction-date">{{ formatDate(transaction.date) }}</div>
                </div>
              </div>
              <div
                :class="['transaction-amount', transaction.amount > 0 ? 'positive' : 'negative']"
              >
                {{ transaction.amount > 0 ? '+' : '' }}${{ Math.abs(transaction.amount).toFixed(2) }}
              </div>
            </div>
          </div>
          <div v-else>
            <p>No hay actividad para mostrar</p>
          </div>
        </div>
      </div>
    </div>
    <ConfirmTransferPopup ref="confirmPopup" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useActivityStore } from '@/stores/userActivityStore.js'
import { useFinancialStore } from '@/stores/userFinancialStore.js'
import TransferComponent from '@/components/transferComponent.vue'
import ConfirmTransferPopup from '@/components/confirmTransferPopup.vue'

const confirmPopup = ref(null)
const activityStore = useActivityStore()
const financialStore = useFinancialStore()

const searchQuery = ref('')
const startDate = ref('')
const endDate = ref('')

const updateSearchQuery = (event) => {
  activityStore.setSearchQuery(event.target.value)
}

const updateDateRange = () => {
  activityStore.setDateRange(startDate.value, endDate.value)
}

const currentDate = new Date()
const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const last6MonthsExpenses = reactive({})

const calculateLast6MonthsExpenses = () => {
  const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1)
  const expenses = {}

  for (let i = 0; i < 6; i++) {
    const month = new Date(sixMonthsAgo.getFullYear(), sixMonthsAgo.getMonth() + i, 1)
    const monthName = monthNames[month.getMonth()]
    expenses[monthName] = 0
  }

  activityStore.transactions.forEach(transaction => {
    const transactionDate = new Date(transaction.date)
    if (transactionDate >= sixMonthsAgo && transaction.amount < 0) {
      const monthName = monthNames[transactionDate.getMonth()]
      if (Object.prototype.hasOwnProperty.call(expenses, monthName)) {
        expenses[monthName] += Math.abs(transaction.amount)
      }
    }
  })

  Object.assign(last6MonthsExpenses, expenses)
}

const maxExpense = computed(() => Math.max(...Object.values(last6MonthsExpenses), 1))

const tooltipVisible = ref(false)
const tooltipContent = ref('')
const tooltipStyle = ref({})

const showTooltip = (month, expense, event) => {
  tooltipContent.value = `${month}: $${expense.toFixed(2)}`
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
  return Object.values(last6MonthsExpenses).reduce((acc, expense) => acc + expense, 0).toFixed(2)
})

const currentPeriod = computed(() => {
  const months = Object.keys(last6MonthsExpenses)
  return `${months[0]} - ${months[months.length - 1]}`
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

const getTransactionIcon = (transaction) => {
  if (transaction.amount > 0) {
    return '/deposit-icon.png'
  } else if (transaction.name.toLowerCase().includes('transferencia')) {
    return '/transfer-icon.png'
  } else {
    return '/expense-icon.png'
  }
}

const hasTransactions = computed(() => activityStore.filteredTransactions.length > 0)

const totalBalance = computed(() => {
  return financialStore.balanceTotal + financialStore.inversionTotal
})

watch(() => activityStore.transactions, () => {
  calculateLast6MonthsExpenses()
}, { deep: true })

onMounted(() => {
  calculateLast6MonthsExpenses()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.home-page {
  font-family: 'Inter', sans-serif;
  height: auto;
  overflow: auto;
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
  gap: 0.5rem;
  overflow: hidden;
}

.transaction-list p {
  text-align: center;
  color: gray;
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
  max-height: 750px;
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
  color: #4caf50;
}

.transaction-amount.negative {
  color: #f44336;
}

.expenses, .balance-section {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.balance-section {
  margin-bottom: 1rem;
}

.amount {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.25rem 0;
  color: #333;
}

.period, .label {
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
  background-color: #4caf50;
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

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-bar {
  flex: 1;
  margin-right: 1rem;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f0f0f0;
}

.date-filter {
  display: flex;
  gap: 0.5rem;
}

.date-filter input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
</style>