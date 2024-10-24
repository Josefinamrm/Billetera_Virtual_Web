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
            <p class="balance-amount">{{ inversionTotal }}</p>
            <p class="balance-change" :class="{ 'positive': isPositiveChange, 'negative': !isPositiveChange }">
              {{ balanceChange }}
            </p>
          </div>
          <div class="summary-card">
            <h2>Ganancias Totales</h2>
            <p class="profit-amount">{{ gananciasTotales }}</p>
            <p class="profit-period">{{ profitPeriod }}</p>
          </div>
          <div class="summary-card">
            <h2>Balance Actual</h2>
            <p class="profit-amount">{{ balanceTotal }}</p>
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
import { ref, onMounted, computed } from 'vue';
import { useFinancialStore } from '../../stores/userFinancialStore.js'; // Import the Pinia store
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);
const amount = ref('');
const message = ref('');
const isSuccess = ref(true);

const financialStore = useFinancialStore(); // Use the Pinia store

// Map Pinia store values
const currentBalance = computed(() => `$${financialStore.balanceTotal}`);
const balanceChange = ref('0');  // Placeholder for balance change
const isPositiveChange = computed(() => balanceChange.value.startsWith('+'));
const currentInvestment = computed(() => `$${financialStore.inversionTotal}`);
const totalProfit = computed(() => `$${financialStore.gananciasTotales}`);
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
  flex: 1;
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
  transition: border-color 0.3s ease;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #f0f0f0;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
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
  flex-wrap: wrap;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  flex: 1 1 auto;
}

.invest-btn {
  background-color: #4CAF50;
  color: white;
}

.invest-btn:hover:not(:disabled) {
  background-color: #4CAF50;
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
    min-width: 250px;
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

@media (min-width: 1800px) {
  .investment-dashboard {
    max-width: 2000px;
  }

  .dashboard-layout {
    gap: 2rem;
  }

  .summary-card {
    padding: 2rem;
  }

  .chart-section {
    padding: 0.5rem;
  }

  .chart-container {
    height: 400px;
  }
}
</style>