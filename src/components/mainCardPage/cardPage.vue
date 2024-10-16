<script setup>
import Card from './Card.vue'
import CardInfo from './cardInfo.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

function goToNewCardPage() {
  router.push('/nueva-tarjeta')
}
</script>

<template>
  <div class="app-container">
    <div class="title">
      <h2>Mis Tarjetas</h2>
      <button class="add-btn" @click="goToNewCardPage">+ Agregar Tarjetas</button>
    </div>
    <div class="cards-display">
      <!-- PONER EL FOR (V-FOR) Y ESO -->
      <div class="card">
        <Card />
        <CardInfo />
      </div>
      <div class="card">
        <Card />
        <CardInfo />
      </div>
      <div class="card">
        <Card />
        <CardInfo />
      </div>
      <div class="card">
        <Card />
        <CardInfo />
      </div>
      <div class="card">
        <Card />
        <CardInfo />
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: black;
  font-size: 20px;
  margin: 2px;
  padding: 0;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.add-btn {
  background-color: #5dce76;
  border-radius: 25px;
  margin-left: 15px;
  width: 167px;
  height: 40px;
  font-size: 10px;
  font-weight: bold;
}

.app-container {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  margin-left: 10px;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  margin: 10px;
}

.cards-display {
  width: max-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.card {
  gap: 10px;
}

@media (max-width: 768px) {
  .cards-display {
    flex-direction: column;
  }
}
</style>
