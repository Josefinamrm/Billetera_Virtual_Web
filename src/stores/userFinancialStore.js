import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFinancialStore = defineStore('financial', () => {
  // State variables with initial values
  const balanceTotal = ref(1000);       // Initial balance
  const inversionTotal = ref(2000);      // Initial investment
  const gananciasTotales = ref(300);      // Initial total earnings

  // Method to update the balance
  const updateBalance = (amount) => {
    balanceTotal.value += amount; // Adjust balance
  };

  // Method to update the investment total
  const updateInversionTotal = (amount) => {
    inversionTotal.value += amount; // Adjust investment total
  };

  // Method to update the total earnings
  const updateGananciasTotales = (amount) => {
    gananciasTotales.value += amount; // Adjust total earnings
  };

  // Method to reset all values (optional)
  const resetFinancials = () => {
    balanceTotal.value = 1000; // Reset to initial balance
    inversionTotal.value = 2000; // Reset to initial investment
    gananciasTotales.value = 300; // Reset to initial earnings
  };

  // Return the state and methods for usage in components
  return {
    balanceTotal,
    inversionTotal,
    gananciasTotales,
    updateBalance,
    updateInversionTotal,
    updateGananciasTotales,
    resetFinancials // Optional: expose reset method
  };
});
