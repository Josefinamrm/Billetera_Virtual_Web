<template>
  <div class="user-data">
    <div class="user-data-container">
      <div class="title">
        <button class="back-button" @click="goBack"><-</button>
        <h1>Cuenta</h1>
      </div>
      <div class="user-data-content">
        <div class="section" v-for="(data, index) in userData" :key="index">
          <div class="info">
            <p>{{ data.title }}</p>
            <p v-if="!data.editable">{{ data.value }}</p>
            <input v-else type="text" v-model="data.value" />
          </div>
          <button @click="() => editData(index)">
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
import router from '@/router'
export default {
  name: 'UserData',
  data() {
    return {
      userData: [
        {
          title: 'Usuario: ',
          value: 'nombre',
          editable: false
        },
        {
          title: 'Email: ',
          value: 'nombre@mail.com',
          editable: false
        },
        {
          title: 'Teléfono: ',
          value: '1234567890',
          editable: false
        },
        {
          title: 'CVU: ',
          value: '1234567890123456789012',
          editable: false
        },
        {
          title: 'Alias: ',
          value: 'alias',
          editable: false
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

.user-data {
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
.user-data-content {
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

.user-data-container {
  display: flex;
  flex-direction: column;
  /* font-family: Arial, sans-serif; */
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
