<template>
  <div class="landing-page">
    <header>
      <nav>
        <RouterLink to="/register" class="btn btn-secondary">Registrarse</RouterLink>
        <RouterLink to="/login" class="btn btn-primary">Ingresa</RouterLink>
      </nav>
    </header>

    <main class="content">
      <div class="text-content">
        <h1 class="title">Una Nueva Billetera Virtual</h1>
        <p class="subtitle">Maneja tu plata de de la mejor y más segura manera.</p>
        <RouterLink to="/register" class="btn btn-primary btn-large">Registrarse</RouterLink>
      </div>

      <div class="phone-container">
        <img
          src="../assets/Group 162500-2.png"
          alt="iPhone con Billetera Virtual"
          class="phone-image"
        />
      </div>
    </main>

    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100vh;
  overflow: hidden;
  position: fixed;
  width: 100%;
}

.landing-page {
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative; /* Changed from fixed to relative */
  width: 100%;
  background-color: #ffffff;
  overflow: hidden;
}

header {
  padding: 1rem 2rem;
  height: 70px;
  position: relative;
  z-index: 10;
}

nav {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;
  max-width: 1400px;
  margin: 0 auto;
  height: calc(100vh - 70px);
  position: relative;
  z-index: 1;
  padding-top: 8vh;
}

.text-content {
  flex: 0 1 500px;
  margin-left: -5%; /* Moved text more to the left */
  margin-top: 2vh; /* Moved text higher */
}

.title {
  font-size: min(3.5rem, 5vw);
  color: #111827;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.subtitle {
  font-size: min(1.25rem, 3vw);
  color: #4b5563;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-large {
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
}

.btn-primary {
  background-color: #5dce76;
  color: white;
}

.btn-primary:hover {
  background-color: #4eb964;
}

.btn-secondary {
  background-color: transparent;
  color: #4b5563;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.phone-container {
  flex: 1;
  max-width: 450px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 3%; /* Adjusted margin */
  z-index: 2; /* Ensure image is on top */
}

.phone-image {
  width: auto;
  height: 75vh;
  max-height: 650px;
  object-fit: contain;
  z-index: 2; /* Ensure image stays above other elements */
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
    align-items: center;
    padding-top: 2vh;
  }

  .text-content {
    margin-left: 0;
    margin-top: 0;
  }

  .phone-container {
    width: 100%;
    height: auto;
    justify-content: center;
    margin-right: 0;
  }

  .phone-image {
    height: 50vh;
  }
}

@media (max-width: 480px), (max-height: 600px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .phone-image {
    height: 45vh;
  }
}
</style>
