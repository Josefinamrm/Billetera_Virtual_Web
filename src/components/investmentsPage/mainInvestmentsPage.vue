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
            <h2>Inversión Actual</h2>
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
            <p class="profit-amount">{{ currentBalance }}</p> <!-- Use computed property here -->
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
import { ref, onMounted, computed, watch } from 'vue';
import { useFinancialStore } from '@/stores/userFinancialStore.js'; // Import the Pinia store
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);
const amount = ref('');
const message = ref('');
const isSuccess = ref(true);

const financialStore = useFinancialStore(); // Use the Pinia store

// Map Pinia store values
const currentBalance = computed(() => {
  return `$${financialStore.balanceTotal}`; // Will display the total balance
});

const balanceChange = computed(() => {
  const investment = financialStore.inversionTotal; // Current investment ($2000)
  const profit = financialStore.gananciasTotales; // Total profit ($300)

  // Calculate the percentage of profit relative to the investment
  const percentageChange = (profit / investment) * 100;

  // Return formatted result with percentage symbol
  return `${percentageChange.toFixed(2)}%`;
});


const isPositiveChange = computed(() => {
  return balanceChange.value.startsWith('+');
});

const currentInvestment = computed(() => {
  return `$${financialStore.inversionTotal}`; // Will display current investment
});

const totalProfit = computed(() => {
  return `$${financialStore.gananciasTotales}`; // Will display total profit
});

const profitPeriod = ref('Últimos 6 meses');

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
};

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d');
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
  });
});

// Watch for changes to financial store values and log them
watch(() => financialStore.balanceTotal, (newValue) => {
  console.log('Updated Balance Total:', `$${newValue}`);
});

watch(() => financialStore.inversionTotal, (newValue) => {
  console.log('Updated Inversion Total:', `$${newValue}`);
});

watch(() => financialStore.gananciasTotales, (newValue) => {
  console.log('Updated Ganancias Totales:', `$${newValue}`);
});

const invest = () => {
  financialStore.updateInversionTotal(Number(amount.value)); // Update store
  message.value = `Inversión de $${amount.value} realizada con éxito.`;
  isSuccess.value = true;
  amount.value = '';
};

const withdraw = () => {
  financialStore.updateInversionTotal(-Number(amount.value)); // Update store
  message.value = `Rescate de $${amount.value} realizado con éxito.`;
  isSuccess.value = true;
  amount.value = '';
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.investment-dashboard {
  font-family: 'Inter', sans-serif;
  max-width: 1800px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: auto;
}

header {
  margin-bottom: 0.5rem;
  text-align: left;
}

h1 {
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

h2 {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #374151;
  margin-bottom: 1rem;
  font-weight: 600;
}

p {
  color: #6B7280;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
}

main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dashboard-layout {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.summary-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 1 300px;
}

.right-section {
  flex: 2 1 400px;
  display: flex;
  flex-direction: column;
}

.chart-section {
  flex: 1;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
}

.summary-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  height: auto;
  min-height: 180px;
}

.balance-amount, .profit-amount {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
}

.balance-change, .profit-period {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
}

.positive {
  color: #4CAF50;
}

.negative {
  color: #EF4444;
}

.chart-container {
  height: 200px;
}

.action-section {
  flex: 0 0 auto;
  height: 10px;
}

.input-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.amount-input {
  position: relative;
  flex-grow: 1;
  min-width: 200px;
}

input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 1.5rem;
  font-size: 1rem;
  transition: border-color 0.3s;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;
}

.currency-symbol {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7280;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.invest-btn, .withdraw-btn {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.invest-btn {
  background-color: #10B981;
}

.withdraw-btn {
  background-color: #EF4444;
}

.invest-btn:disabled, .withdraw-btn:disabled {
  background-color: #D1D5DB;
  cursor: not-allowed;
}

.message {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: opacity 0.3s;
}

.success {
  background-color: #D1FAE5;
  color: #059669;
}

.error {
  background-color: #FECACA;
  color: #B91C1C;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
