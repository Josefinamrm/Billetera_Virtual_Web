<template>
  <div class="confirmation-popup" v-if="show">
    <div class="confirmation-content">
      <h3>Confirmar Transferencia</h3>
      <p>¿Está seguro de que desea transferir ${{ amount }} a {{ alias }}?</p>
      <div class="confirmation-buttons">
        <button @click="confirm" class="confirm-button">Confirmar</button>
        <button @click="cancel" class="cancel-button">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    amount: Number,
    alias: String
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
.confirmation-popup {
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

.confirmation-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}

.confirmation-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.confirm-button {
  background-color: #5DCE76;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.cancel-button {
  background-color: #ccc;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>