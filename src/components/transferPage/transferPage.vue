<template>
  <div class="dashboard">
    <div class="left-column">
      <div class="contacts">
        <div class="header">
          <h2>Contactos</h2>
          <AddContactBtn @add-contact="addContact" />
        </div>
        <div class="search-bar">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar contacto "
            class="search-input"
          />
        </div>
        <div class="contacts-list">
          <ul v-if="filteredContacts.length">
            <li v-for="contact in filteredContacts" :key="contact.id">
              <div class="contact-info">
                <strong>{{ contact.name }}</strong>
                <span>{{ contact.phone }}</span>
                <span class="contact-details">Alias: {{ contact.alias }}</span>
                <span class="contact-details">CVU: {{ contact.cvu }}</span>
              </div>
              <div class="contact-actions">
                <button type="button" class="btn btn-primary" @click="selectContact(contact)">Enviar</button>
                <button type="button" class="btn btn-delete" @click="confirmDelete(contact)">
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button type="button" class="btn btn-edit" @click="editContact(contact)">
                  <i class="fas fa-pencil-alt"></i>
                </button>
              </div>
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
        <transfer-component ref="transferComponent" :selected-contact="selectedContact" />
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

    <Teleport to="body">
      <div v-if="showPaymentConfirmation" class="confirmation-popup">
        <div class="confirmation-content">
          <p>¿Estás seguro de que quieres realizar este pago?</p>
          <p>Servicio: {{ getServiceName(selectedService) }}</p>
          <p>Monto: ${{ paymentAmount }}</p>
          <p>Método: {{ paymentMethod === 'card' ? 'Tarjeta' : 'Crédito en Cuenta' }}</p>
          <div v-if="paymentMethod === 'card'">
            <p>Seleccione una tarjeta:</p>
            <select v-model="selectedCard" class="select-input">
              <option v-for="card in userCards" :key="card.id" :value="card">
                {{ card.number }}
              </option>
            </select>
            <input
              v-model="cvv"
              type="text"
              placeholder="CVV"
              class="cvv-input"
              maxlength="3"
              required
            />
            <p v-if="cvvError" class="error-message">{{ cvvError }}</p>
          </div>
          <div class="confirmation-buttons">
            <button @click="confirmPayment" class="btn confirm-button">Confirmar</button>
            <button @click="cancelPayment" class="btn cancel-button">Cancelar</button>
          </div>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div v-if="showEditForm" class="confirmation-popup">
        <div class="confirmation-content">
          <h2>Editar Contacto</h2>
          <form @submit.prevent="updateContact">
            <input v-model="editingContact.name" type="text" placeholder="Nombre" required>
            <input v-model="editingContact.phone" type="tel" placeholder="Teléfono" required>
            <input v-model="editingContact.cvu" type="text" placeholder="CVU" required>
            <input v-model="editingContact.alias" type="text" placeholder="Alias" required>
            <div class="confirmation-buttons">
              <button type="submit" class="btn confirm-button">Guardar</button>
              <button @click="cancelEdit" class="btn cancel-button">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/contactStore';
import { useCardStore } from '@/stores/cardStore';
import { useUserStore } from '@/stores/userStore';
import { useFinancialStore } from '@/stores/userFinancialStore';
import { useActivityStore } from '@/stores/userActivityStore';
import TransferComponent from '../transferComponent.vue';
import AddContactBtn from '../addContactBtn.vue';

const contactStore = useContactStore();
const cardStore = useCardStore();
const userStore = useUserStore();
const financialStore = useFinancialStore();
const activityStore = useActivityStore();
const transferComponent = ref(null);
const selectedService = ref('');
const paymentAmount = ref('');
const paymentMethod = ref('card');
const showConfirmation = ref(false);
const showPaymentConfirmation = ref(false);
const showEditForm = ref(false);
const contactToDelete = ref(null);
const searchQuery = ref('');
const selectedContact = ref(null);
const selectedCard = ref(null);
const editingContact = ref({});
const cvv = ref('');
const cvvError = ref('');

const services = [
  { id: 1, name: 'Electricidad' },
  { id: 2, name: 'Agua' },
  { id: 3, name: 'Gas' },
  { id: 4, name: 'Internet' },
  { id: 5, name: 'Teléfono' },
];

const contacts = computed(() => contactStore.contacts);

const filteredContacts = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return contacts.value.filter(contact =>
    contact.name.toLowerCase().includes(query) ||
    contact.phone.toLowerCase().includes(query) ||
    contact.alias.toLowerCase().includes(query) ||
    contact.cvu.toLowerCase().includes(query)
  );
});

const isPaymentFormValid = computed(() => {
  return selectedService.value &&
    paymentAmount.value &&
    paymentAmount.value > 0 &&
    paymentMethod.value;
});

const userCards = computed(() => {
  return cardStore.cards.filter(card => card.userId === userStore.userData.id);
});

onMounted(async () => {
  try {
    await contactStore.loadContacts();
    console.log('Contacts loaded successfully:', contactStore.contacts);
    cardStore.loadCardsFromLocalStorage();
    userStore.loadUser();
    console.log('User data loaded successfully');
  } catch (error) {
    console.error('Error loading data:', error);
  }
});

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

const selectContact = (contact) => {
  selectedContact.value = contact;
};

const editContact = (contact) => {
  editingContact.value = { ...contact };
  showEditForm.value = true;
};

const updateContact = async () => {
  try {
    await contactStore.updateContact(editingContact.value);
    console.log('Contact updated successfully');
    showEditForm.value = false;
  } catch (error) {
    console.error('Error updating contact:', error);
  }
};

const cancelEdit = () => {
  showEditForm.value = false;
  editingContact.value = {};
};

const submitPayment = () => {
  if (!isPaymentFormValid.value) return;

  if (paymentMethod.value === 'card' && userCards.value.length === 0) {
    alert('No tiene tarjetas registradas en tu cuenta. Por favor registra una tarjeta y vuelve a intentar.');
    return;
  }

  showPaymentConfirmation.value = true;
};

const confirmPayment = async () => {
  try {
    if (paymentMethod.value === 'account') {
      if (financialStore.balanceTotal < paymentAmount.value) {
        alert('Fondos insuficientes para realizar la transferencia.');
        return;
      }
      financialStore.updateBalance(-paymentAmount.value);
    } else if (paymentMethod.value === 'card') {
      if (!selectedCard.value) {
        alert('Por favor seleccione una tarjeta para realizar el pago.');
        return;
      }
      if (!cvv.value || cvv.value.length !== 3 || !/^\d+$/.test(cvv.value)) {
        cvvError.value = 'CVV inválido. Debe ser un número de 3 dígitos.';
        return;
      }
      if (cvv.value !== selectedCard.value.cvv) {
        cvvError.value = 'CVV incorrecto. Por favor verifique e intente nuevamente.';
        return;
      }
      console.log(`Procesando pago con tarjeta: ${selectedCard.value.number}`);
    }

    const serviceName = getServiceName(selectedService.value);
    const paymentDetails = {
      type: 'Pago de Servicio',
      name: serviceName,
      amount: -paymentAmount.value,
      date: new Date().toISOString(),
      method: paymentMethod.value === 'card' ? 'Tarjeta' : 'Saldo en Cuenta'
    };


    activityStore.addTransaction(paymentDetails);

    console.log('Pago confirmado:', paymentDetails);

    selectedService.value = '';
    paymentAmount.value = '';
    paymentMethod.value = 'card';
    selectedCard.value = null;
    cvv.value = '';
    cvvError.value = '';
    showPaymentConfirmation.value = false;

    alert('Pago exitoso');
  } catch (error) {
    console.error('Error confirmando el pago:', error);
    alert('Hubo un error al procesar el pago. Intente de nuevo.');
  }
};

const cancelPayment = () => {
  showPaymentConfirmation.value = false;
  selectedCard.value = null;
  cvv.value = '';
  cvvError.value = '';
};

const getServiceName = (serviceId) => {
  const service = services.find(s => s.id === serviceId);
  return service ? service.name : 'Desconocido';
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
  border:  1px solid #ccc;
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
  display: flex;
  flex-direction: column;
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

.contact-details {
  font-size: 0.8rem;
  color: #666;
}

.contact-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
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

.btn-edit {
  background-color: transparent;
  color: black;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.8rem;
}

.btn-edit:hover {
  background-color: #f0f0f0;
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

.no-contacts {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading {
  opacity: 0.7;
  pointer-events: none;
}

.search-bar {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f0f0f0;
}

.cvv-input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f0f0f0;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>