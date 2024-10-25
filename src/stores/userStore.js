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
    loadUsers() {
      const usersData = localStorage.getItem('users');
      const currentUserData = localStorage.getItem('currentUser');
      if (usersData) {
        this.users = JSON.parse(usersData);
      }
      if (currentUserData) {
        this.currentUser = JSON.parse(currentUserData);
      }
    },
    resetUser() {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
    },
    isLoggedIn() {
      return !!this.currentUser;
    },
    getUserFullName() {
      return this.currentUser ? `${this.currentUser.nombre} ${this.currentUser.apellido}`.trim() : '';
    },
    getUserData() {
      return this.currentUser;
    }
    ,
    changeUserPassword(newPassword) {
      if (!this.currentUser) {
        console.error('No user is currently logged in');
        return;
      }

      // Update password in the users array
      const userIndex = this.users.findIndex(user => user.email === this.currentUser.email);
      if (userIndex !== -1) {
        this.users[userIndex].password = newPassword;
      } else {
        console.error('Current user not found in users array');
      }

      // Update password for the current user
      this.currentUser.password = newPassword;

      // Update localStorage
      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  },
});
