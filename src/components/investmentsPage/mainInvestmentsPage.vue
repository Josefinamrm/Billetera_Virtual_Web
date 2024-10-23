<template>
  <div class="investment-dashboard">
    <header>
      <h1>Inversiones</h1>
      <p>Gestiona y consulta tus productos de inversión</p>
    </header>

    <main>
      <div class="dashboard-layout">
        <section class="summary-section">
          <div class="summary-card">
            <h2>Inversion Actual</h2>
            <p class="balance-amount">{{ currentInvestment }}</p>
            <p class="balance-change" :class="{ 'positive': isPositiveChange, 'negative': !isPositiveChange }">
              {{ balanceChange }}
            </p>
          </div>
          <div class="summary-card">
            <h2>Ganancias Totales</h2>
            <p class="profit-amount">{{ totalProfit }}</p>
            <p class="profit-period">{{ profitPeriod }}</p>
          </div>
          <div class="summary-card">
            <h2>Balance Actual</h2>
            <p class="profit-amount">{{ currentBalance }}</p>
          </div>
        </section>

        <div class="right-section">
          <section class="chart-section">
            <div class="chart-header">
              <h2>Historial de Ganancias</h2>
            </div>
            <div class="chart-container">
              <canvas ref="chartCanvas"></canvas>
            </div>
          </section>

          <section class="action-section summary-card">
            <h2>Invertir o Rescatar</h2>
            <div class="input-group">
              <div class="amount-input">
                <input v-model="amount" type="number" placeholder="Ingrese el monto" />
                <span class="currency-symbol">$</span>
              </div>
              <div class="button-group">
                <button @click="invest" :disabled="!amount" class="invest-btn">Invertir</button>
                <button @click="withdraw" :disabled="!amount" class="withdraw-btn">Rescatar</button>
              </div>
            </div>
            <transition name="fade">
              <p v-if="message" :class="['message', { 'success': isSuccess, 'error': !isSuccess }]">
                {{ message }}
              </p>
            </transition>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'

const chartCanvas = ref(null)
const amount = ref('')
const message = ref('')
const isSuccess = ref(true)

const currentBalance = ref('$75.000')
const balanceChange = ref('+$5.000 (7.14%)')
const isPositiveChange = computed(() => balanceChange.value.startsWith('+'))
const currentInvestment = ref('$50.000')
const totalProfit = ref('$25.000')
const profitPeriod = ref('Últimos 6 meses')

const chartData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
  datasets: [{
    label: 'Ganancias',
    data: [50000, 55000, 52000, 60000, 58000, 65000, 75000],
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    tension: 0.4,
    fill: true
  }]
}

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d')
  new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false
          },
          ticks: {
            callback: (value) => `$${value / 1000}k`
          }
        }
      }
    }
  })
})

const invest = () => {
  message.value = `Inversión de $${amount.value} realizada con éxito.`
  isSuccess.value = true
  amount.value = ''
}

const withdraw = () => {
  message.value = `Rescate de $${amount.value} realizado con éxito.`
  isSuccess.value = true
  amount.value = ''
}
</script>

<style scoped>
.investment-dashboard {
  font-family: 'Roboto', sans-serif;
  max-width: 1500px;
  height: auto;
  margin: 0 auto;
  width: 1500px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

}

header {
  margin-bottom: 2rem;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #111827;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

h2 {
  font-size: 1.25rem;
  color: #374151;
  margin-bottom: 1rem;
  font-weight: 600;
}

p {
  color: #6B7280;
  font-size: 1rem;
}

main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  overflow: visible;
}

.dashboard-layout {
  display: flex;
  gap: 1rem;
}

.summary-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  padding-left: 0;
}

.right-section {
  flex: 2;
  display: flex;
  flex-direction: column;
}

.chart-section {
  flex: 1;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 0.18rem;
  margin-bottom: 1rem;
}

.summary-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 180px;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.balance-amount, .profit-amount {
  font-size: 1.75rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
}

.balance-change, .profit-period {
  font-size: 1rem;
}

.positive {
  color: #10B981;
}

.negative {
  color: #EF4444;
}

.chart-container {
  height: 300px;
}

.action-section {
  flex: 0 0 auto;
}

.input-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.amount-input {
  position: relative;
  flex-grow: 1;
}

input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 1.5rem;
  border: 2px solid #D1D5DB;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #10B981;
}

.currency-symbol {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7280;
}

.button-group {
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.invest-btn {
  background-color: #10B981;
  color: white;
}

.invest-btn:hover:not(:disabled) {
  background-color: #059669;
  transform: translateY(-2px);
}

.withdraw-btn {
  background-color: #4B5563;
  color: white;
}

.withdraw-btn:hover:not(:disabled) {
  background-color: #374151;
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.message {
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
}

.success {
  background-color: #D1FAE5;
  color: #065F46;
}

.error {
  background-color: #FEE2E2;
  color: #991B1B;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .summary-section {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .summary-card {
    flex: 1 1 calc(50% - 0.5rem);
  }

  .right-section {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .investment-dashboard {
    padding: 1rem;
  }

  .summary-section {
    flex-direction: column;
  }

  .summary-card {
    width: 100%;
  }

  .input-group, .button-group {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>