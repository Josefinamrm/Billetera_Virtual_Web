<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToNewCardPage() {
  router.push('/user/nueva-tarjeta')
}
</script>

<template>

  <button @click="goToNewCardPage" class="add-card-btn">+ Agregar Tarjetas</button>
</template>

<style scoped>
.add-card-btn {
  background-color: #5DCE76;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 1rem;
}
</style>