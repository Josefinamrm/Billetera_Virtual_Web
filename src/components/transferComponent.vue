<template>
  <div class="transfer-component transfers-section">
    <h2>Transferencia Rápida</h2>
    <div class="balance">
      <div>Balance Actual</div>
      <div class="balance-amount">${{ financialStore.balanceTotal }}</div>
    </div>
    <input type="text" v-model="alias" placeholder="Ingrese Alias" class="transfer-input" />
    <input type="number" v-model="amount" placeholder="Ingrese Monto" class="transfer-input" />
    <div class="transfer-buttons">
      <button @click="showConfirmPopup" class="send-btn">Enviar</button>
      <button @click="showOptions" class="options-btn">Más opciones</button>
    </div>
    <ConfirmTransferPopup
      :show="showConfirm"
      :amount="amount"
      :alias="alias"
      @confirm="initiateTransfer"
      @cancel="hideConfirmPopup"
    />
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <button @click="closePopup" class="close-btn-x">&times;</button>
        <h3>Opciones adicionales</h3>
        <div class="popup-options">
          <div class="popup-option">
            <h4>Generar link de pago</h4>
            <input
              v-model="paymentLinkAmount"
              type="number"
              placeholder="Monto a pagar"
              class="popup-input"
            />
            <button @click="generatePaymentLink" class="popup-btn">Generar link</button>
            <div v-if="generatedLink" class="generated-link">
              Link generado: <a :href="generatedLink" target="_blank">{{ generatedLink }}</a>
            </div>
          </div>
          <div class="popup-option">
            <h4>Ingresar dinero</h4>
            <input
              v-model="depositAmount"
              type="number"
              placeholder="Cantidad a ingresar"
              class="popup-input"
            />
            <button @click="depositMoney" class="popup-btn">Ingresar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useFinancialStore } from '@/stores/userFinancialStore'
import ConfirmTransferPopup from '@/components/confirmTransferPopup.vue'

export default {
  components: {
    ConfirmTransferPopup
  },
  props: {
    selectedContact: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const financialStore = useFinancialStore()
    const alias = ref('')
    const amount = ref('')
    const showPopup = ref(false)
    const showConfirm = ref(false)
    const paymentLinkAmount = ref('')
    const depositAmount = ref('')
    const generatedLink = ref('')

    // Watch for changes in the selectedContact prop
    watch(
      () => props.selectedContact,
      (newContact) => {
        if (newContact) {
          alias.value = newContact.alias || newContact.name
        }
      }
    )

    const showOptions = () => {
      showPopup.value = true
    }

    const closePopup = () => {
      showPopup.value = false
      paymentLinkAmount.value = ''
      depositAmount.value = ''
      generatedLink.value = ''
    }

    const generatePaymentLink = () => {
      if (paymentLinkAmount.value) {
        const randomString = Math.random().toString(36).substring(7)
        generatedLink.value = `https://pagoejemplo.com/${randomString}?amount=${paymentLinkAmount.value}`
        console.log(`Link de pago generado: ${generatedLink.value}`)
      } else {
        alert('Por favor, ingrese un monto válido para el link de pago.')
      }
    }

    const depositMoney = () => {
      if (depositAmount.value && !isNaN(depositAmount.value)) {
        const amount = Number(depositAmount.value)
        financialStore.updateBalance(amount)
        console.log(`Ingresando $${amount} a la cuenta`)
        alert(`Se han ingresado $${amount} a su cuenta.`)
        closePopup()
      } else {
        alert('Por favor, ingrese una cantidad válida para ingresar.')
      }
    }

    const showConfirmPopup = () => {
      if (!alias.value.trim()) {
        alert('Por favor, ingrese un alias válido.')
        return
      }

      const transferAmount = parseFloat(amount.value)
      if (isNaN(transferAmount) || transferAmount <= 0) {
        alert('Por favor, ingrese un monto válido para la transferencia.')
        return
      }

      if (transferAmount > financialStore.balanceTotal) {
        alert('Fondos insuficientes para realizar la transferencia.')
        return
      }

      showConfirm.value = true
    }

    const hideConfirmPopup = () => {
      showConfirm.value = false
    }

    const initiateTransfer = () => {
      financialStore.updateBalance(-parseFloat(amount.value))
      alert(`Transferencia de $${amount.value} a ${alias.value} realizada con éxito.`)
      amount.value = ''
      alias.value = ''
      hideConfirmPopup()
    }

    return {
      financialStore,
      alias,
      amount,
      showPopup,
      showConfirm,
      paymentLinkAmount,
      depositAmount,
      generatedLink,
      initiateTransfer,
      showOptions,
      closePopup,
      generatePaymentLink,
      depositMoney,
      showConfirmPopup,
      hideConfirmPopup
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.transfer-component {
  max-width: 50vw;
  min-width: 30vw;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: auto;
  overflow: hidden;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.balance {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.balance-amount {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.25rem 0;
  color: #333;
}

.transfer-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f0f0f0;
}

.transfer-buttons {
  display: flex;
  gap: 1rem;
}

.send-btn,
.options-btn {
  flex: 1;
  padding: 0.4rem 2rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.send-btn {
  background-color: #5dce76;
  color: white;
}

.send-btn:hover {
  background-color: #4eb368;
}

.options-btn {
  background-color: #333;
  color: white;
}

.options-btn:hover {
  background-color: #444;
}

.popup {
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
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.popup-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.popup-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.popup-option h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #444;
}

.popup-input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f0f0f0;
}

.popup-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 20px;
  background-color: #5dce76;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.popup-btn:hover {
  background-color: #4eb368;
}

.close-btn-x {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
}

.generated-link {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  word-break: break-all;
}

.generated-link a {
  color: #5dce76;
  text-decoration: none;
}

.generated-link a:hover {
  text-decoration: underline;
}
</style>
