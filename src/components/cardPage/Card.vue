<script setup>
import { ref } from 'vue'

const { number, name, identification, expiration, security } = defineProps({
  number: String,
  name: String,
  expiration: String,
  security: String
})
</script>

<template>
  <div class="card">
    <div class="info">
      <div class="top-info">
        <p><div class="card-type">VISA</div></p>
        <!-- Falta hacer el cálculo para que te diga que tarjeta es -->
        <div class="relevant-info">
          <h2>
            <div class="card-number">{{ number }}</div>
          </h2>
          <div class="card-name">{{ name }}</div>
        </div>
      </div>
      <div class="bottom-info">
        <div class="card-expiration">{{ expiration }}</div>
        <div class="card-security">{{ security }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  background-color: #444444;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  width: 300px;
  height: 170px;
  margin-right: 20px;
}

.info {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
}

.bottom-info {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
}
.top-info {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
}
div {
  color: white;
  font-weight: 600;
}

.card-type {
  margin: 0;
  padding: 0;
  color:#333333;
  font-weight: bold;
}
</style>
