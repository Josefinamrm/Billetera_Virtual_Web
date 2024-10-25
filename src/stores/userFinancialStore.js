// src/stores/financialStore.js
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useUserStore } from './userStore';

export const useFinancialStore = defineStore('financialStore', () => {
  const userStore = useUserStore();

  const balanceTotal = ref(1000);
  const inversionTotal = ref(2000);
  const gananciasTotales = ref(300);
  const historialInversiones = ref([
    { fecha: '2023-01-01', valor: 2000 },
    { fecha: '2023-07-01', valor: 2300 },
  ]);

  const loadFinancialsFromLocalStorage = () => {
    if (userStore.currentUser) {
      const data = JSON.parse(
        localStorage.getItem(`financials_${userStore.currentUser.email}`)
      );
      if (data) {
        balanceTotal.value = data.balanceTotal;
        inversionTotal.value = data.inversionTotal;
        gananciasTotales.value = data.gananciasTotales;
        historialInversiones.value = data.historialInversiones;
      }
    }
  };

  const saveFinancialsToLocalStorage = () => {
    if (userStore.currentUser) {
      const data = {
        balanceTotal: balanceTotal.value,
        inversionTotal: inversionTotal.value,
        gananciasTotales: gananciasTotales.value,
        historialInversiones: historialInversiones.value,
      };
      localStorage.setItem(
        `financials_${userStore.currentUser.email}`,
        JSON.stringify(data)
      );
    }
  };

  const updateBalance = (amount) => {
    balanceTotal.value += amount;
    saveFinancialsToLocalStorage();
  };

  const updateInversionTotal = (amount) => {
    inversionTotal.value += amount;
    const fecha = new Date().toISOString().split('T')[0];
    historialInversiones.value.push({ fecha, valor: inversionTotal.value });
    if (historialInversiones.value.length > 6) {
      historialInversiones.value.shift();
    }
    saveFinancialsToLocalStorage();
  };

  const updateGananciasTotales = (amount) => {
    gananciasTotales.value += amount;
    saveFinancialsToLocalStorage();
  };

  const resetFinancials = () => {
    balanceTotal.value = 1000;
    inversionTotal.value = 2000;
    gananciasTotales.value = 300;
    historialInversiones.value = [
      { fecha: '2023-01-01', valor: 2000 },
      { fecha: '2023-07-01', valor: 2300 },
    ];
    saveFinancialsToLocalStorage();
  };

  watch(
    () => userStore.currentUser,
    (newUser) => {
      if (newUser) {
        loadFinancialsFromLocalStorage();
      } else {
        balanceTotal.value = 1000;
        inversionTotal.value = 2000;
        gananciasTotales.value = 300;
        historialInversiones.value = [];
      }
    }
  );

  const ultimosSeisRegistros = computed(() => historialInversiones.value.slice(-6));

  return {
    balanceTotal,
    inversionTotal,
    gananciasTotales,
    historialInversiones,
    updateBalance,
    updateInversionTotal,
    updateGananciasTotales,
    resetFinancials,
    ultimosSeisRegistros,
    loadFinancialsFromLocalStorage,
    saveFinancialsToLocalStorage,
  };
});
