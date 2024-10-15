<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Menu from './components/Menu.vue'
import BarraSuperior from './components/BarraSuperior.vue'
import { createVuetify } from 'vuetify' // Importa Vuetify
import 'vuetify/styles' // Importa los estilos de Vuetify
import Card from './components/mainCardPage/Card.vue'
import CardPage from './components/mainCardPage/CardPage.vue'

const vuetify = createVuetify() // Crea una instancia de Vuetify
</script>

<template>
  <v-app>
    <BarraSuperior />
    <div class="hola">
      <Menu />
      <CardPage />
    </div>
  </v-app>
</template>

<style scoped>
BarraSuperior {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
}

div.hola {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}
</style>
