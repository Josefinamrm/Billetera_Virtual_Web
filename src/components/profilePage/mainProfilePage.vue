<template>
  <div class="background-shape"></div>
  <div class="viewport" :style="{ height: windowHeight + 'px' }">

    <div class="profile-container">
      <h1>Tu perfil</h1>
      <div class="profile-sections">
        <section v-for="(section, index) in sections" :key="index" class="profile-section">
          <h2>{{ section.title }}</h2>
          <p>{{ section.description }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      windowHeight: 0,
      sections: [
        {
          title: 'Información personal',
          description: 'Información de tu documento de identidad y tu actividad fiscal.'
        },
        {
          title: 'Datos de tu cuenta',
          description: 'Email, teléfono, nombre de usuario, CVU y Alias.'
        },
        {
          title: 'Seguridad',
          description: 'Configura la seguridad de tu cuenta.'
        },
        {
          title: 'Direcciones',
          description: 'Direcciones guardadas en tu cuenta.'
        },
        {
          title: 'Privacidad',
          description: 'Preferencia y control sobre el uso de tus datos.'
        }
      ]
    }
  },
  mounted() {
    this.updateWindowHeight()
    window.addEventListener('resize', this.updateWindowHeight)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowHeight)
  },
  methods: {
    updateWindowHeight() {
      this.windowHeight = window.innerHeight
    }
  }
}
</script>

<style scoped>
.viewport {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  cursor: default;
  max-width: 2000px;
  width: auto;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.profile-container {
  font-family: Arial, sans-serif;
  max-width: 1500px;
  padding: 10px;
  height: 100%;
  width: 1350px;
  overflow-y: auto;
  margin-top: 250px;
  -webkit-overflow-scrolling: touch;
}


h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-sections {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.profile-section {
  background-color: #D9D9D9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

h2 {
  font-size: 18px;
  margin-bottom: 5px;
}

p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.background-shape {
  position: fixed;
  bottom: -100px;
  right: -100px;
  width: 300px;
  height: 400px;
  background-color: #7cebb3;
  border-radius: 50%;
  z-index: -1;
}

@media (max-width: 600px) {
  .profile-container {
    padding: 15px;
  }

  h1 {
    font-size: 20px;
  }

  .profile-section {
    padding: 12px;
  }

  h2 {
    font-size: 16px;
  }

  p {
    font-size: 12px;
  }

  .background-shape {
    width: 200px;
    height: 200px;
    bottom: -50px;
    right: -50px;
  }
}
</style>