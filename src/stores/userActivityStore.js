import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    transactionGroups: [],
    searchQuery: ''
  }),
  getters: {
    filteredTransactionGroups() {
      const query = this.searchQuery.toLowerCase()
      return this.transactionGroups.map(group => ({
        ...group,
        transactions: group.transactions.filter(transaction =>
          transaction.name.toLowerCase().includes(query)
        )
      })).filter(group => group.transactions.length > 0)
    }
  },
  actions: {
    setTransactionGroups(groups) {
      this.transactionGroups = groups
    },
    setSearchQuery(query) {
      this.searchQuery = query
    }
  }
})
