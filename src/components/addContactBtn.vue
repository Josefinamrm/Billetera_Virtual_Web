<template>
  <div class="agregar-contacto">
    <button @click="showPopup = true" class="btn btn-primary">+ Agregar Contacto</button>

    <div v-if="showPopup" class="popup-overlay">
      <div class="popup">
        <h2>Agregar Nuevo Contacto</h2>
        <form @submit.prevent="agregarContacto">
          <input v-model="nuevoContacto.nombre" type="text" placeholder="Nombre" required>
          <input v-model="nuevoContacto.telefono" type="tel" placeholder="Teléfono" required>
          <input v-model="nuevoContacto.cbu" type="text" placeholder="CBU" required>
          <input v-model="nuevoContacto.alias" type="text" placeholder="Alias" required>
          <div class="popup-buttons">
            <button type="button" @click="showPopup = false" class="btn btn-outline">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const showPopup = ref(false);
const nuevoContacto = reactive({
  nombre: '',
  telefono: '',
  cbu: '',
  alias: ''
});

const agregarContacto = () => {
  // Aquí iría la lógica para agregar el contacto
  console.log('Nuevo contacto:', nuevoContacto);
  // Resetear el formulario
  Object.keys(nuevoContacto).forEach(key => nuevoContacto[key] = '');
  showPopup.value = false;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.agregar-contacto {
  font-family: Inter, sans-serif;
}

.btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #4CAF50;
  color: #4CAF50;
}

.btn-outline:hover {
  background-color: #4CAF50;
  color: white;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.popup h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.popup form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.popup input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f0f0f0;
}

.popup-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>