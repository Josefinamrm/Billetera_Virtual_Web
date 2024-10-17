<!-- <script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import Card from './Card.vue'

const router = useRouter()

const number = ref('')
const name = ref('')
const identification = ref('')
const expiration = ref('')
const security = ref('')

function goToMainCardPage() {
  router.push('./tarjetas')
}
</script>

<template>
  <div class="app-container">
    <div class="title">
      <button class="back" @click="goToMainCardPage"><h2><-</h2></button>
      <h2>Nueva Tarjeta</h2>
    </div>

    <div class="newCard">
      <div class="attributes">
        <div class="number">
          <label for="number">Número de Tarjeta</label>
          <div class="text-box"><input type="text" id="number" name="number" /></div>
        </div>
        <div class="name">
          <label for="name">Nombre del titular de la tarjeta</label>
          <div class="text-box"><input type="text" id="name" name="name" /></div>
        </div>
        <div class="identification">
          <label for="identification">Documento del titular</label>
          <div class="text-box">
            <input type="text" id="identification" name="identidication" />
          </div>
        </div>
        <div class="expiration">
          <label for="expiration">Vencimiento</label>
          <div class="text-box"><input type="text" id="expiration" name="expiration" /></div>
        </div>
        <div class="security">
          <label for="security">Código de seguridad</label>
          <div class="text-box"><input type="text" id="security" name="security" /></div>
        </div>
      </div>
      <Card class="card"></Card>
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

.title {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
}

.app-container {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.text-box {
  width: min-content;
  border-style: solid;
  border-width: 1px;
  border-color: #e0e0e0;
  border-radius: 5px;
  margin-bottom: 25px;
}

label {
  font-size: 15px;
  font-weight: 600;
  color: #000000;
  margin-top: 15px;
  margin-bottom: 25px;
}

.newCard {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 150px;
  padding-left: 50px;
}

.card {
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background-color: #e0e0e0;
  margin-left: 20px;
}
</style> -->

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from './Card.vue'

// Definimos los datos usando ref, ya que setup ya actúa como el contexto del componente
const router = useRouter()

const number = ref('')
const name = ref('')
const identification = ref('')
const expiration = ref('')
const security = ref('')

// Definimos la función para navegar a la página de tarjetas
function goToMainCardPage() {
  router.push('./tarjetas')
}
</script>

<template>
  <div class="app-container">
    <div class="title">
      <button class="back" @click="goToMainCardPage"><h2><-</h2></button>
      <h2>Nueva Tarjeta</h2>
    </div>

    <div class="newCard">
      <div class="attributes">
        <div class="number">
          <label for="number">Número de Tarjeta</label>
          <div class="text-box">
            <input type="text" id="number" name="number" v-model="number" />
          </div>
        </div>
        <div class="name">
          <label for="name">Nombre del titular de la tarjeta</label>
          <div class="text-box">
            <input type="text" id="name" name="name" v-model="name" />
          </div>
        </div>
        <div class="identification">
          <label for="identification">Documento del titular</label>
          <div class="text-box">
            <input type="text" id="identification" name="identification" v-model="identification" />
          </div>
        </div>
        <div class="expiration">
          <label for="expiration">Vencimiento</label>
          <div class="text-box">
            <input type="text" id="expiration" name="expiration" v-model="expiration" />
          </div>
        </div>
        <div class="security">
          <label for="security">Código de seguridad</label>
          <div class="text-box">
            <input type="text" id="security" name="security" v-model="security" />
          </div>
        </div>
      </div>

      <!-- Pasamos las propiedades al componente Card -->
      <Card
        class="card"
        :number="number"
        :name="name"
        :identification="identification"
        :expiration="expiration"
        :security="security"
      />
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

.title {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
}

.app-container {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.text-box {
  width: min-content;
  border-style: solid;
  border-width: 1px;
  border-color: #e0e0e0;
  border-radius: 5px;
  margin-bottom: 25px;
}

label {
  font-size: 15px;
  font-weight: 600;
  color: #000000;
  margin-top: 15px;
  margin-bottom: 25px;
}

.newCard {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 150px;
  padding-left: 50px;
}

/* .card {
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background-color: #e0e0e0;
  margin-left: 20px;
} */
</style>
