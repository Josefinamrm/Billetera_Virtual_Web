<template>
  <div class="dashboard">
    <div class="left-column">
      <div class="contacts">
        <div class="header">
          <h2>Contactos</h2>
          <AddContactBtn />
        </div>
        <div class="contacts-list">
          <ul>
            <li v-for="contact in contacts" :key="contact.id">
              <img :src="contact.avatar" :alt="contact.name" class="avatar" />
              <div class="contact-info">
                <strong>{{ contact.name }}</strong>
                <span>{{ contact.phone }}</span>
              </div>
              <button type="button" class="btn btn-primary">Enviar</button>
              <button type="button" class="btn btn-outline">Solicitar</button>
              <button type="button" class="btn btn-delete" @click="confirmDelete(contact)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right-column">
      <div>
        <transfer-component/>
      </div>
      <div class="payments">
        <h2>Pagos de Servicios</h2>
        <form @submit.prevent="submitPayment">
          <select v-model="selectedService" class="select-input">
            <option value="" disabled selected>Seleccione un servicio</option>
            <option v-for="service in services" :key="service.id" :value="service.id">
              {{ service.name }}
            </option>
          </select>
          <input v-model="paymentAmount" type="number" placeholder="Ingrese Monto" class="number-input" />
          <div class="payment-methods">
            <button type="button" @click="paymentMethod = 'card'" :class="['btn', paymentMethod === 'card' ? 'btn-primary' : 'btn-outline']">
              Tarjeta
            </button>
            <button type="button" @click="paymentMethod = 'account'" :class="['btn', paymentMethod === 'account' ? 'btn-primary' : 'btn-outline']">
              Crédito en Cuenta
            </button>
          </div>
          <button type="submit" class="btn submit-btn">Pagar</button>
        </form>
      </div>
    </div>

    <div v-if="showConfirmation" class="confirmation-popup">
      <div class="confirmation-content">
        <p>¿Estás seguro de que quieres eliminar este contacto?</p>
        <div class="confirmation-buttons">
          <button @click="deleteContact" class="btn confirm-button">Eliminar</button>
          <button @click="cancelDelete" class="btn cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TransferComponent from '@/components/transferComponent.vue'
import AddContactBtn from '@/components/addContactBtn.vue'

const contacts = ref([
  { id: 1, name: 'John Doe', phone: '+54 911 6721 9021', avatar: '../../Public/img.png' },
  { id: 2, name: 'Jim Doe', phone: '+54 911 6721 9021', avatar: '../../Public/img.png' },
  { id: 3, name: 'Jane Doe', phone: '+54 911 6721 9021', avatar: '../../Public/img.png' },
  { id: 4, name: 'Janet Doe', phone: '+54 911 6721 9021', avatar: '../../Public/img.png' },
])

const selectedService = ref('')
const paymentAmount = ref('')
const paymentMethod = ref('card')
const showConfirmation = ref(false)
const contactToDelete = ref(null)

const services = [
  { id: 1, name: 'Electricidad' },
  { id: 2, name: 'Agua' },
  { id: 3, name: 'Gas' },
  { id: 4, name: 'Internet' },
  { id: 5, name: 'Teléfono' },
]

const submitPayment = () => {
  console.log('Payment submitted:', {
    service: selectedService.value,
    amount: paymentAmount.value,
    method: paymentMethod.value
  })
  selectedService.value = ''
  paymentAmount.value = ''
  paymentMethod.value = 'card'
}

const confirmDelete = (contact) => {
  contactToDelete.value = contact
  showConfirmation.value = true
}

const deleteContact = () => {
  contacts.value = contacts.value.filter(c => c.id !== contactToDelete.value.id)
  showConfirmation.value = false
  contactToDelete.value = null
}

const cancelDelete = () => {
  showConfirmation.value = false
  contactToDelete.value = null
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.dashboard {
  display: flex;
  gap: 2rem;
  padding: 0.5rem;
  max-width: 1800px;
  font-family: Inter, sans-serif;
  cursor: default;
  height: auto;
  overflow: hidden;
}

.left-column {
  flex: 1;
}

.right-column {
  flex: 1;
}

.contacts, .payments {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.payments {
  margin-top: 1rem;
}

.contacts {
  display: flex;
  flex-direction: column;
}

.contacts-list {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 70vh;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.contacts-list::-webkit-scrollbar {
  display: none;
}

.payments {
  height: 340px;
}

h2 {
  font-size: 1.7rem;
  margin-bottom: 1rem;
  color: #333;
}

h3 {
  font-size: 5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input, .select-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f0f0f0;
}

.contacts ul {
  list-style: none;
  padding: 0;
}

.contacts li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.contacts li:last-child {
  border-bottom: none;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.contact-info {
  flex-grow: 1;
}

.contact-info strong {
  display: block;
  font-size: 0.9rem;
  color: #333;
}

.contact-info span {
  color: #666;
  font-size: 0.9rem;
}

.btn {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 20px;
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

.btn-primary {
  background-color: #5DCE76;
  border: none;
  color: white;
  border-radius: 20px;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-delete {
  background-color: transparent;
  border: none;
  color: #ff4d4d;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
}

.btn-delete:hover {
  color: #ff0000;
}

.payment-methods {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.payment-methods .btn {
  flex: 1;
}

.submit-btn {
  width: 100%;
  color: white;
  background-color: #333;
  border-radius: 20px;
}

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

.confirm-button,
.cancel-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirmation-buttons {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
}

.confirm-button {
  background-color: #f44336;
  color: white;
}

.confirm-button:hover {
  background-color: #d32f2f;
}

.cancel-button {
  background-color: #f0f0f0;
  color: #333;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}
@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
    height: auto;
    overflow: auto;
  }

  .contacts-list {
    max-height: 50vh;
  }

  .contacts li {
    flex-direction: column;
    align-items: flex-start;
  }

  .contacts button {
    margin-top: 0.5rem;
  }
}
</style>