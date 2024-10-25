import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useFinancialStore = defineStore('financial', () => {
  const balanceTotal = ref(1000);
  const inversionTotal = ref(2000);
  const gananciasTotales = ref(300);
  const historialInversiones = ref([
    { fecha: '2023-01-01', valor: 2000 },
    { fecha: '2023-02-01', valor: 2050 },
    { fecha: '2023-03-01', valor: 2100 },
    { fecha: '2023-04-01', valor: 2150 },
    { fecha: '2023-05-01', valor: 2200 },
    { fecha: '2023-06-01', valor: 2250 },
    { fecha: '2023-07-01', valor: 2300 },
  ]);

  const updateBalance = (amount) => {
    balanceTotal.value += amount;
  };

  const updateInversionTotal = (amount) => {
    inversionTotal.value += amount;
    const fecha = new Date().toISOString().split('T')[0];
    historialInversiones.value.push({ fecha, valor: inversionTotal.value });
    // Mantener solo los últimos 6 meses de datos
    if (historialInversiones.value.length > 6) {
      historialInversiones.value.shift();
    }
  };

  const updateGananciasTotales = (amount) => {
    gananciasTotales.value += amount;
  };

  const resetFinancials = () => {
    balanceTotal.value = 1000;
    inversionTotal.value = 2000;
    gananciasTotales.value = 300;
    historialInversiones.value = [
      { fecha: '2023-01-01', valor: 2000 },
      { fecha: '2023-07-01', valor: 2300 },
    ];
  };

  const ultimosSeisRegistros = computed(() => {
    return historialInversiones.value.slice(-6);
  });

  return {
    balanceTotal,
    inversionTotal,
    gananciasTotales,
    historialInversiones,
    updateBalance,
    updateInversionTotal,
    updateGananciasTotales,
    resetFinancials,
    ultimosSeisRegistros
  };
});