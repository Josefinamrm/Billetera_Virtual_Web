// src/stores/contactStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

export const useContactStore = defineStore('contactStore', () => {
  const contacts = ref([]);

  const loadContacts = () => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.value = storedContacts;
  };

  const saveContactsToLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts.value));
  };

  const addContact = (newContact) => {
    contacts.value.push({
      id: uuidv4(), // Generate a unique ID using uuid
      ...newContact,
    });
    saveContactsToLocalStorage(); // Save contacts to local storage after adding
  };

  const deleteContact = (contactId) => {
    contacts.value = contacts.value.filter(contact => contact.id !== contactId);
    saveContactsToLocalStorage(); // Update local storage after deletion
  };

  const updateContact = (updatedContact) => {
    const index = contacts.value.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
      contacts.value[index] = updatedContact;
      saveContactsToLocalStorage(); // Save contacts to local storage after updating
    }
  };

  return {
    contacts,
    loadContacts,
    addContact,
    deleteContact,
    updateContact,
  };
});
