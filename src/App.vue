<script setup>
import { RouterView } from 'vue-router'
import BarraSuperior from './components/BarraSuperior.vue'
import Menu from './components/Menu.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const vuetify = createVuetify()
</script>

<template>
  <v-app>
    <BarraSuperior />
    <div class="hola">
      <Menu />
      <RouterView />
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