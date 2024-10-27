import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
  }),
  actions: {

    registerUser(data) {
      const existingUser = this.users.find(user => user.email === data.email);
      if (existingUser) {
        return false;
      } else {
        this.currentUser = data;
        this.users.push(data);
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('currentUser', JSON.stringify(data));
        return true;
      }
    },
    loginUser(email, password) {
      const user = this.users.find(u => u.email === email && u.password === password);
      if (user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
      return false;
    },
    async loadUsers() {
      console.log("Cargando usuarios desde localStorage...");
      const usersData = localStorage.getItem('users');
      const currentUserData = localStorage.getItem('currentUser');
      if (usersData) {
        this.users = JSON.parse(usersData);
        console.log("Usuarios cargados:", this.users);
      }
      if (currentUserData) {
        this.currentUser = JSON.parse(currentUserData);
        console.log("Usuario actual cargado:", this.currentUser);
      }
    },

    resetUser() {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
    },
    isLoggedIn() {
      return this.currentUser !== null && this.currentUser !== undefined;
    },
    getUserFullName() {
      return this.currentUser ? `${this.currentUser.nombre} ${this.currentUser.apellido}`.trim() : '';
    },
    getUserData() {
      return this.currentUser;
    },
    changeUserPassword(newPassword) {
      if (!this.currentUser) {
        return;
      }

      const userIndex = this.users.findIndex(user => user.email === this.currentUser.email);
      if (userIndex !== -1) {
        this.users[userIndex].password = newPassword;
      } else {
        return;
      }

      this.currentUser.password = newPassword;

      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    },
    updateUserField(field, value) {
      if (!this.currentUser) return;


      if (!['nombre', 'apellido', 'documento', 'fechaNacimiento', 'actividadFiscal'].includes(field)) {
        console.error(`El campo ${field} no es válido`);
        return;
      }

      this.currentUser[field] = value;


      const userIndex = this.users.findIndex(user => user.email === this.currentUser.email);
      if (userIndex !== -1) {
        this.users[userIndex][field] = value;
      }
      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    },
  },
});
