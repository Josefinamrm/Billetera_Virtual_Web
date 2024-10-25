import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useActivityStore = defineStore('activity', () => {
  const transactions = ref([
    {
      id: 1,
      name: 'Depósito inicial',
      amount: 1000,
      date: '2023-07-01T10:00:00Z'
    },
    {
      id: 2,
      name: 'Inversión inicial',
      amount: -2000,
      date: '2023-07-01T11:00:00Z'
    }
  ])
  const searchQuery = ref('')
  const startDate = ref('')
  const endDate = ref('')

  const addTransaction = (transaction) => {
    transactions.value.unshift(transaction)
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const setDateRange = (start, end) => {
    startDate.value = start
    endDate.value = end
  }

  const filteredTransactions = computed(() => {
    return transactions.value.filter(transaction => {
      const matchesSearch = transaction.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const transactionDate = new Date(transaction.date)
      const isInDateRange = (!startDate.value || transactionDate >= new Date(startDate.value)) &&
        (!endDate.value || transactionDate <= new Date(endDate.value))
      return matchesSearch && isInDateRange
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  return {
    transactions,
    searchQuery,
    startDate,
    endDate,
    addTransaction,
    setSearchQuery,
    setDateRange,
    filteredTransactions
  }
})