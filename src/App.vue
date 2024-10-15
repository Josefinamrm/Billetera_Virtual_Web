<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Menu from './components/Menu.vue'
import BarraSuperior from './components/BarraSuperior.vue'
import { createVuetify } from 'vuetify' // Importa Vuetify
import 'vuetify/styles' // Importa los estilos de Vuetify

const vuetify = createVuetify() // Crea una instancia de Vuetify
</script>

<template>
  <v-app> 
    <BarraSuperior></BarraSuperior>
    <Menu></Menu>
  </v-app>
</template>

<style scoped>
div.fijo {
  display: flex;
}
</style>
