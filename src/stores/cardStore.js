// src/stores/cardStore.js
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useUserStore } from './userStore' // Ensure you import the user store

export const useCardStore = defineStore('cardStore', () => {
  const cards = ref([]) // Initialize with an empty array
  const userStore = useUserStore()

  // Load cards for the current user from localStorage
  const loadCardsFromLocalStorage = () => {
    if (userStore.currentUser) {
      cards.value =
        JSON.parse(localStorage.getItem(`creditCards_${userStore.currentUser.email}`)) || []
    }
  }

  // Save cards for the current user to localStorage
  const saveCardsToLocalStorage = () => {
    if (userStore.currentUser) {
      localStorage.setItem(
        `creditCards_${userStore.currentUser.email}`,
        JSON.stringify(cards.value)
      )
    }
  }

  const addCard = (card) => {
    cards.value.push(card)
    saveCardsToLocalStorage()
  }

  const removeCard = (index) => {
    cards.value.splice(index, 1)
    saveCardsToLocalStorage()
  }

  watch(
    () => userStore.currentUser,
    (newUser) => {
      if (newUser) {
        loadCardsFromLocalStorage()
      } else {
        cards.value = [] // Clear cards if no user is logged in
      }
    }
  )

  return { cards, addCard, removeCard, loadCardsFromLocalStorage, saveCardsToLocalStorage }
})
