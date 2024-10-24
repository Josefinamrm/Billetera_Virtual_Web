<template>
  <div class="top-bar">
    <div class="right-content">
      <a @click="navigateTo('notifications')" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
          <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/>
        </svg>
      </a>
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
