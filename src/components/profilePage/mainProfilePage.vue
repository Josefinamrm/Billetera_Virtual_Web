<template>
  <div class="background-wrapper">
    <div class="viewport">
      <div class="profile-container">
        <h1>Tu Perfil</h1>
        <div class="profile-sections">
          <button
            v-for="(section, index) in sections"
            :key="index"
            class="profile-section"
            @click="handleSectionClick(index)"
          >
            <div class="section-content">
              <h2>{{ section.title }}</h2>
              <p>{{ section.description }}</p>
            </div>
            <span class="arrow">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
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
  methods: {
    handleSectionClick(index) {
      console.log(`Clicked on section: ${this.sections[index].title}`)
      // Add your navigation or action logic here
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.background-wrapper {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

}

.viewport {
  flex: 1;
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Inter', sans-serif;
}

.profile-container {
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 1350px;
  padding: 20px;
  box-sizing: border-box;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.profile-section:hover {
  background-color: #C0C0C0;
}

.section-content {
  flex-grow: 1;
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

.arrow {
  font-size: 24px;
  margin-left: 10px;
}

.background-shape {
  position: absolute;
  bottom: -100px;
  right: -100px;
  width: 300px;
  height: 400px;
  background-color: #7cebb3;
  border-radius: 50%;
  z-index: -1;
}

@media (max-width: 768px) {
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

@media (max-width: 480px) {
  .profile-container {
    padding: 10px;
  }

  h1 {
    font-size: 18px;
  }

  .profile-section {
    padding: 10px;
  }

  h2 {
    font-size: 14px;
  }

  p {
    font-size: 11px;
  }

  .arrow {
    font-size: 18px;
  }

  .background-shape {
    width: 150px;
    height: 150px;
    bottom: -30px;
    right: -30px;
  }
}
</style>