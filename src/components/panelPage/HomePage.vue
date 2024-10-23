<template>
  <div class="home-page">
    <div class="financial-dashboard">
      <div class="transactions-section">
        <h2>Transacciones</h2>
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
      <div class="right-column">
        <div class="cards-section">
          <h2>Tarjetas</h2>
          <add-card-btn/>
          <div class="card">
            <div class="card-type">VISA</div>
            <div class="card-number">**** **** **** 1121</div>
            <div class="card-name">JUNIOR RAMBAU</div>
          </div>
        </div>
        <transfer-component/>
      </div>
    </div>
    <ConfirmTransferPopup ref="confirmPopup" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ConfirmTransferPopup from '../confirmTransferPopup.vue'
import AddCardBtn from '@/components/addCardBtn.vue'
import TransferComponent from '@/components/transferComponent.vue'
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
      { id: 7, name: 'John Doe', date: 'Agosto 20, 6:22 PM', amount: 90, avatar: '../../Public/img.png' }
    ]
  }
])
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

.transactions-section {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.transaction-list {
  overflow-y: auto;
  flex: 1;
}

.right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
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



.card {
  background-color: #333;
  color: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.card-type {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.card-number {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.card-name {
  font-size: 0.9rem;
}

@media (max-width: 1024px) {
  .financial-dashboard {
    flex-direction: column;
  }

  .right-column {
    order: -1;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 0.5rem;
  }
}
</style>