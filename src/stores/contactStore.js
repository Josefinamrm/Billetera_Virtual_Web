// src/stores/contactStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

export const useContactStore = defineStore('contactStore', () => {
  const contacts = ref([]);

  const loadContacts = () => {
    // Load initial contacts (optional, can be empty initially)
    contacts.value = [];
  };

  const addContact = (newContact) => {
    // Add new contact to the contacts array with a unique UUID
    contacts.value.push({
      id: uuidv4(), // Generate a unique ID using uuid
      ...newContact,
    });
  };

  const deleteContact = (contactId) => {
    // Remove the contact by filtering out the contact with the given ID
    contacts.value = contacts.value.filter(contact => contact.id !== contactId);
  };

  return {
    contacts,
    loadContacts,
    addContact,
    deleteContact,
  };
});
