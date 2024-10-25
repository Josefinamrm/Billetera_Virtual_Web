// src/stores/cardStore.js
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useUserStore } from './userStore'
export const useCardStore = defineStore('cardStore', () => {
  const cards = ref([])
  const userStore = useUserStore()


  const loadCardsFromLocalStorage = () => {
    if (userStore.currentUser) {
      cards.value =
        JSON.parse(localStorage.getItem(`creditCards_${userStore.currentUser.email}`)) || []
    }
  }


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
        cards.value = []
      }
    }
  )

  return { cards, addCard, removeCard, loadCardsFromLocalStorage, saveCardsToLocalStorage }
})
