// src/stores/cardStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCardStore = defineStore('cardStore', () => {
  const cards = ref([]); // Initialize with an empty array

  const addCard = (card) => {
    cards.value.push(card);
  };

  const removeCard = (index) => {
    cards.value.splice(index, 1);
  };

  const loadCardsFromLocalStorage = () => {
    const storedCards = JSON.parse(localStorage.getItem('creditCards')) || [];
    cards.value = storedCards;
  };

  const saveCardsToLocalStorage = () => {
    localStorage.setItem('creditCards', JSON.stringify(cards.value));
  };

  return { cards, addCard, removeCard, loadCardsFromLocalStorage, saveCardsToLocalStorage };
});
