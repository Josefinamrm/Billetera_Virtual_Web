<template>
  <div class="personal-info">
    <div class="personal-info-container">
      <div class="title">
        <button class="back-button" @click="goBack"><-</button>
        <h1>Información Personal</h1>
      </div>
      <div class="personal-info-content">
        <div class="section" v-for="(data, index) in userInfo" :key="index">
          <div class="info">
            <p>{{ data.title }}</p>
            <p>{{ data.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
console.log("Hola", userStore.userData);
export default {
  name: 'UserInfo',
  data() {
    return {
      userInfo: [
        {
          title: 'Nombre: ',
          value: userStore.userData.nombre
        },
        {
          title: 'Apellido: ',
          value: userStore.userData.apellido
        },
        {
          title: 'DNI: ',
          value: userStore.userData.documento
        },
        {
          title: 'Fecha de Nacimiento: ',
          value: '02/01/2003'
        },
        {
          title: 'Actividad Fiscal: ',
          value: '???'
        }
      ]
    }
  },
  methods: {
    editData(index) {
      this.userData[index].editable = !this.userData[index].editable
    },
    goBack() {
      router.go(-1)
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.personal-info {
  flex: 1;
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Inter', sans-serif;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 15px;
}

button {
  font-weight: bolder;
  font-size: 20px;
}
.personal-info-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.section {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  box-sizing: border-box;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  gap: 15px;
}

.personal-info-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 20px;
}
</style>
