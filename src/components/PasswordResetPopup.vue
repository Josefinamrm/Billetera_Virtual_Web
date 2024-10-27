<template>
  <div v-if="show" class="password-reset-popup">
    <div class="popup-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <input type="email" v-model="email" placeholder="Ingrese su email" required />
      <div class="popup-buttons">
        <button @click="handleSubmit">{{ submitButtonText }}</button>
        <button @click="handleCancel">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  show: Boolean,
  title: {
    type: String,
    default: 'Recuperar Contraseña'
  },
  message: {
    type: String,
    default: 'Ingrese su correo electrónico para recibir instrucciones de recuperación.'
  },
  submitButtonText: {
    type: String,
    default: 'Enviar'
  }
});

const emit = defineEmits(['submit', 'cancel']);

const email = ref('');

const handleSubmit = () => {
  emit('submit', email.value);
  email.value = ''; // Clear the input after submission
};

const handleCancel = () => {
  emit('cancel');
  email.value = ''; // Clear the input after cancellation
};
</script>

<style scoped>
.password-reset-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.popup-content h3 {
  margin-top: 0;
}

.popup-content input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.popup-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.popup-buttons button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup-buttons button:first-child {
  background-color: #5dce76;
  color: white;
}
</style>
