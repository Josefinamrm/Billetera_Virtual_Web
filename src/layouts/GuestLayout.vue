<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <div class="guest-container">
        <div class="router-view-container">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <style scoped>
  .guest-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  </style>