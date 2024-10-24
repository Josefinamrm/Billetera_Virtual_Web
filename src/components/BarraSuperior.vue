<template>
  <div class="top-bar">
    <div class="right-content">
      <div @click="navigateTo('perfil')" class="user-profile">
        <span>{{ userStore.userData.nombre }} {{ userStore.userData.apellido }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore'; // Adjust the path as necessary

const router = useRouter();
const userStore = useUserStore();

const navigateTo = (route) => {
  router.push({ name: route });
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  position: fixed;
  width: calc(100% - 250px); /* Adjust for sidebar width */
  top: 0;
  right: 0;
  z-index: 1000;
}

.right-content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.icon {
  color: #5f6368;
  cursor: pointer;
}

.user-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-profile span {
  font-size: 14px;
  font-weight: 500;
}
</style>
