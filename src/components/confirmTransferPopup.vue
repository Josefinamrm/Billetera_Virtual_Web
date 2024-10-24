<template>
  <div v-if="isVisible" class="popup-overlay">
    <div class="popup-content">
      <p>¿Seguro que quiere realizar la transferencia?</p>
      <div class="popup-actions">
        <button @click="confirm">Confirmar</button>
        <button @click="cancel">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

const isVisible = ref(false)

const confirm = () => {
  isVisible.value = false
  // Add logic to handle confirmation
}

const cancel = () => {
  isVisible.value = false
}

const showPopup = () => {
  isVisible.value = true
}

defineExpose({ showPopup })
</script>

<style scoped>
.popup-overlay {
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

.popup-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}

.popup-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:first-of-type {
  background-color: #5DCE76;
  color: white;
}

button:last-of-type {
  background-color: #f44336;
  color: white;
}
</style>