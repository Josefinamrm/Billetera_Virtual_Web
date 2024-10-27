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
            <div v-if="data.editable">
              <input
                v-if="data.title === 'Fecha de Nacimiento:'"
                type="text"
                v-model="data.value"
                @input="formatDate(index)"
                @blur="saveData(index)"
                maxlength="10"
                placeholder="DD/MM/YYYY"
              />
              <input
                v-else
                type="text"
                v-model="data.value"
                @blur="saveData(index)"
              />
            </div>
            <p v-else>{{ data.value || 'No especificado' }}</p>
          </div>
          <button v-if="data.canEdit" @click="editData(index)">
            <svg
              v-if="!data.editable"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path
                d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores/userStore'

export default {
  name: 'UserInfo',
  setup() {
    const userStore = useUserStore()

    const loadUserInfo = () => {
      const currentUser = userStore.getUserData() || {}
      userInfo.value = [
        { title: 'Nombre:', value: currentUser.nombre || '', editable: false, canEdit: false },
        { title: 'Apellido:', value: currentUser.apellido || '', editable: false, canEdit: false },
        { title: 'DNI:', value: currentUser.documento || '', editable: false, canEdit: false },
        { title: 'Fecha de Nacimiento:', value: currentUser.fechaNacimiento || '', editable: false, canEdit: true },
        { title: 'Actividad Fiscal:', value: currentUser.actividadFiscal || '', editable: false, canEdit: true }
      ]
    }

    const userInfo = ref([])

    onMounted(() => {
      userStore.loadUsers()
      loadUserInfo()
    })

    watch(
      () => userStore.currentUser,
      () => {
        loadUserInfo()
      }
    )

    const fieldMap = {
      'Fecha de Nacimiento:': 'fechaNacimiento',
      'Actividad Fiscal:': 'actividadFiscal'
    }

    const editData = (index) => {
      userInfo.value[index].editable = !userInfo.value[index].editable
    }

    const saveData = (index) => {
      const field = fieldMap[userInfo.value[index].title]
      if (field) {
        userStore.updateUserField(field, userInfo.value[index].value)
        userInfo.value[index].editable = false
      }
    }

    const formatDate = (index) => {
      let value = userInfo.value[index].value.replace(/\D/g, '')
      if (value.length > 4) {
        value = value.slice(0, 4) + '/' + value.slice(4)
      }
      if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2)
      }
      userInfo.value[index].value = value
    }

    const goBack = () => {
      router.go(-1)
    }

    return {
      userInfo,
      editData,
      saveData,
      goBack,
      formatDate
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

input {
  width: 100%;
  padding: 7px;
  border-radius: 10px;
  background-color: #f8f7f7;
  outline: none;
  border: none;
  color: rgb(66, 66, 66);
}
</style>
