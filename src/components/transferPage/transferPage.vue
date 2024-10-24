<template>
  <div class="dashboard">
    <div class="left-column">
      <div class="contacts">
        <h2>Contactos</h2>
        <ul>
          <li v-for="contact in contacts" :key="contact.id">
            <img :src="contact.avatar" :alt="contact.name" class="avatar" />
            <div class="contact-info">
              <strong>{{ contact.name }}</strong>
              <span>{{ contact.phone }}</span>
            </div>
            <button type="button" class="btn btn-primary">Enviar</button>
            <button type="button" class="btn btn-outline">Solicitar</button>
          </li>
        </ul>
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
          <button type="submit" class="btn  submit-btn">Pagar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TransferComponent from '@/components/transferComponent.vue'


const contacts = [
  { id: 1, name: 'John Doe', phone: '+54 911 6721 9021', avatar: '../../Public/img.png' },
  { id: 2, name: 'Jim Doe', phone: '+54 911 6721 9021', avatar: '../../Public/img.png' },
  { id: 3, name: 'Jane Doe', phone: '+54 911 6721 9021', avatar: '../../Public/img.png' },
]




// New code for payments
const selectedService = ref('')
const paymentAmount = ref('')
const paymentMethod = ref('card')

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
</script>

<style scoped>
.dashboard {
  display: flex;
  gap: 2rem;
  padding: 0.5rem;
  max-width: 1800px;
  font-family: Arial, sans-serif;
  cursor: default;
}

.left-column, .right-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.transfers{
  height: 390px;
}
.payments{
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
  font-size: 0.9rem;
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
  color:white;
  background-color: #333;;
  border-radius: 20px;

}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .left-column, .right-column {
    width: 100%;
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