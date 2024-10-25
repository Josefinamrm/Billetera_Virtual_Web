// src/stores/contactStore.js
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useUserStore } from './userStore';

export const useContactStore = defineStore('contactStore', () => {
  const userStore = useUserStore();
  const contacts = ref([]);

  const loadContactsFromLocalStorage = () => {
    if (userStore.currentUser) {
      const data = JSON.parse(
        localStorage.getItem(`contacts_${userStore.currentUser.email}`)
      );
      contacts.value = data || [];
    }
  };

  const saveContactsToLocalStorage = () => {
    if (userStore.currentUser) {
      localStorage.setItem(
        `contacts_${userStore.currentUser.email}`,
        JSON.stringify(contacts.value)
      );
    }
  };

  const addContact = (newContact) => {
    contacts.value.push({
      id: uuidv4(),
      ...newContact,
    });
    saveContactsToLocalStorage();
  };

  const deleteContact = (contactId) => {
    contacts.value = contacts.value.filter(contact => contact.id !== contactId);
    saveContactsToLocalStorage();
  };

  const updateContact = (updatedContact) => {
    const index = contacts.value.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
      contacts.value[index] = updatedContact;
      saveContactsToLocalStorage();
    }
  };

  watch(
    () => userStore.currentUser,
    (newUser) => {
      if (newUser) {
        loadContactsFromLocalStorage();
      } else {
        contacts.value = [];
      }
    }
  );

  return {
    contacts,
    loadContactsFromLocalStorage,
    addContact,
    deleteContact,
    updateContact,
    saveContactsToLocalStorage
  };
});
