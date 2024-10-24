<template>
  <div class="dashboard">
    <div class="left-column">
      <div class="contacts">
        <div class="header">
          <h2>Contactos</h2>
          <AddContactBtn @add-contact="addContact" />
        </div>
        <div class="contacts-list">
          <ul v-if="contacts && contacts.length">
            <li v-for="contact in contacts" :key="contact.id">
              <div class="contact-info">
                <strong>{{ contact.name }}</strong>
                <span>{{ contact.phone }}</span>
              </div>
              <button type="button" class="btn btn-primary" @click="sendContact(contact)">Enviar</button>
              <button type="button" class="btn btn-outline" @click="requestContact(contact)">Solicitar</button>
              <button type="button" class="btn btn-delete" @click="confirmDelete(contact)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </li>
          </ul>
          <div v-else class="no-contacts">
            No hay contactos disponibles
          </div>
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
          <select v-model="selectedService" class="select-input" required>
            <option value="" disabled selected>Seleccione un servicio</option>
            <option v-for="service in services" :key="service.id" :value="service.id">
              {{ service.name }}
            </option>
          </select>
          <input 
            v-model.number="paymentAmount" 
            type="number" 
            placeholder="Ingrese Monto" 
            class="number-input"
            required
            min="0"
          />
          <div class="payment-methods">
            <button 
              type="button" 
              @click="paymentMethod = 'card'" 
              :class="['btn', paymentMethod === 'card' ? 'btn-primary' : 'btn-outline']"
            >
              Tarjeta
            </button>
            <button 
              type="button" 
              @click="paymentMethod = 'account'" 
              :class="['btn', paymentMethod === 'account' ? 'btn-primary' : 'btn-outline']"
            >
              Crédito en Cuenta
            </button>
          </div>
          <button type="submit" class="btn submit-btn" :disabled="!isPaymentFormValid">
            Pagar
          </button>
        </form>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showConfirmation" class="confirmation-popup">
        <div class="confirmation-content">
          <p>¿Estás seguro de que quieres eliminar este contacto?</p>
          <div class="confirmation-buttons">
            <button @click="deleteContact" class="btn confirm-button">Eliminar</button>
            <button @click="cancelDelete" class="btn cancel-button">Cancelar</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useContactStore } from '@/stores/contactStore';
import TransferComponent from '@/components/transferComponent.vue';
import AddContactBtn from '@/components/addContactBtn.vue';

const contactStore = useContactStore();

// Reactive states
const selectedService = ref('');
const paymentAmount = ref('');
const paymentMethod = ref('card');
const showConfirmation = ref(false);
const contactToDelete = ref(null);

// Services data
const services = [
  { id: 1, name: 'Electricidad' },
  { id: 2, name: 'Agua' },
  { id: 3, name: 'Gas' },
  { id: 4, name: 'Internet' },
  { id: 5, name: 'Teléfono' },
];

// Computed properties
const contacts = computed(() => {
  const storeContacts = contactStore.contacts;
  console.log('Current contacts:', storeContacts);
  return storeContacts;
});

const isPaymentFormValid = computed(() => {
  return selectedService.value && 
         paymentAmount.value && 
         paymentAmount.value > 0 && 
         paymentMethod.value;
});

// Lifecycle hooks
onMounted(async () => {
  try {
    await contactStore.loadContacts();
    console.log('Contacts loaded successfully');
  } catch (error) {
    console.error('Error loading contacts:', error);
  }
});

// Watch for store changes
watch(() => contactStore.contacts, (newContacts) => {
  console.log('Contacts updated:', newContacts);
}, { deep: true });

// Methods
const addContact = async (newContact) => {
  try {
    await contactStore.addContact(newContact);
    console.log('Contact added successfully');
  } catch (error) {
    console.error('Error adding contact:', error);
  }
};

const confirmDelete = (contact) => {
  contactToDelete.value = contact;
  showConfirmation.value = true;
};

const deleteContact = async () => {
  if (contactToDelete.value) {
    try {
      await contactStore.deleteContact(contactToDelete.value.id);
      console.log('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      showConfirmation.value = false;
      contactToDelete.value = null;
    }
  }
};

const cancelDelete = () => {
  showConfirmation.value = false;
  contactToDelete.value = null;
};

const sendContact = (contact) => {
  console.log('Sending contact:', contact);
  // Implement send logic here
};

const requestContact = (contact) => {
  console.log('Requesting contact:', contact);
  // Implement request logic here
};

const submitPayment = async () => {
  if (!isPaymentFormValid.value) return;

  try {
    // Implement payment submission logic here
    console.log('Payment submitted:', {
      service: selectedService.value,
      amount: paymentAmount.value,
      method: paymentMethod.value,
    });
    
    // Reset form
    selectedService.value = '';
    paymentAmount.value = '';
    paymentMethod.value = 'card';
  } catch (error) {
    console.error('Error submitting payment:', error);
  }
};
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
  justify-content: center;
  align-items: center;
}

.confirmation-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.confirmation-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.confirm-button {
  background-color: #ff4d4d;
  color: white;
}

.cancel-button {
  background-color: #ccc;
}

.no-contacts {
  text-align: center;
  padding: 2rem;
  color: #666;
}

/* Add disabled button styles */
.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Add loading state styles if needed */
.loading {
  opacity: 0.7;
  pointer-events: none;
}
</style>
