// src/stores/activityStore.js
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useUserStore } from './userStore';

export const useActivityStore = defineStore('activity', () => {
  const userStore = useUserStore();

  const transactions = ref([]);
  const searchQuery = ref('');
  const startDate = ref('');
  const endDate = ref('');

  const loadTransactionsFromLocalStorage = () => {
    if (userStore.currentUser) {
      const data = JSON.parse(
        localStorage.getItem(`transactions_${userStore.currentUser.email}`)
      );
      transactions.value = data || [];
    }
  };

  const saveTransactionsToLocalStorage = () => {
    if (userStore.currentUser) {
      localStorage.setItem(
        `transactions_${userStore.currentUser.email}`,
        JSON.stringify(transactions.value)
      );
    }
  };

  const addTransaction = (transaction) => {
    transactions.value.unshift(transaction);
    saveTransactionsToLocalStorage();
  };

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const setDateRange = (start, end) => {
    startDate.value = start;
    endDate.value = end;
  };

  const filteredTransactions = computed(() => {
    return transactions.value
      .filter(transaction => {
        const matchesSearch = transaction.name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
        const transactionDate = new Date(transaction.date);
        const isInDateRange =
          (!startDate.value || transactionDate >= new Date(startDate.value)) &&
          (!endDate.value || transactionDate <= new Date(endDate.value));
        return matchesSearch && isInDateRange;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  watch(
    () => userStore.currentUser,
    (newUser) => {
      if (newUser) {
        loadTransactionsFromLocalStorage();
      } else {
        transactions.value = [];
      }
    }
  );

  return {
    transactions,
    searchQuery,
    startDate,
    endDate,
    addTransaction,
    setSearchQuery,
    setDateRange,
    filteredTransactions,
    loadTransactionsFromLocalStorage,
    saveTransactionsToLocalStorage
  };
});
