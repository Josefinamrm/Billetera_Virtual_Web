<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  overflow-y: auto;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
}

.main-content {
  margin-top: 70px;
  margin-left: 250px;
  width: calc(100% - 250px);
  height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.router-view-container {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }

  .router-view-container {
    padding: 1rem;
  }
}
</style>