// stores/useFinancialStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFinancialStore = defineStore('financial', () => {
  const balanceTotal = ref(1000);  // Initial balance
  const inversionTotal = ref(2000); // Initial investment
  const gananciasTotales = ref(300); // Initial total earnings

  const updateBalance = (amount) => {
    balanceTotal.value += amount; // Add or subtract balance
  };

  const updateInversionTotal = (amount) => {
    inversionTotal.value += amount; // Add or subtract investment total
  };

  const updateGananciasTotales = (amount) => {
    gananciasTotales.value += amount; // Add or subtract total earnings
  };

  return {
    balanceTotal,
    inversionTotal,
    gananciasTotales,
    updateBalance,
    updateInversionTotal,
    updateGananciasTotales
  };
});
