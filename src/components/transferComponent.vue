<script setup>
import { ref } from 'vue';
import Transferpopup from './confirmTransferPopup.vue';
const confirmPopup = ref(null);

const initiateTransfer = () => {
  confirmPopup.value.showPopup()
}
</script>

<template>
  <div class="transfers-section">
    <h2>Transferencias</h2>
    <div class="balance">
      <div>Balance Actual</div>
      <div class="balance-amount">$20.000</div>
    </div>
    <input type="text" placeholder="Ingrese Alias" class="transfer-input">
    <input type="text" placeholder="Ingrese Monto" class="transfer-input">
    <div class="transfer-buttons">
      <button @click="initiateTransfer" class="send-btn">Enviar</button>
      <button @click="initiateTransfer" class="request-btn">Solicitar</button>
    </div>
    <Transferpopup ref="confirmPopup" />
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.balance {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.balance-amount {
  font-size: 1.5rem;
  font-weight: bold;
}
.transfer-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ECECEC;
}
.transfer-buttons {
  display: flex;
  gap: 1rem;
}
.send-btn, .request-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-btn {
  background-color: #4CAF50;
  color: white;
}

.request-btn {
  background-color: #333;
  color: white;
}
</style>