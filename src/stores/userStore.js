import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {
      nombre: '',
      apellido: '',
      documento: '',
      email: '',
      password: '',
    },
  }),
  actions: {
    setUser(data) {
      this.userData = data;
      localStorage.setItem('userData', JSON.stringify(data)); // Save to localStorage as well
    },
    loadUser() {
      const data = localStorage.getItem('userData');
      if (data) {
        this.userData = JSON.parse(data);
      }
    },
  },
});
