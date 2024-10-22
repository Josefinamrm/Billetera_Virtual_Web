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
        <RouterLink to="/register" class="btn btn-primary btn-large">Abrir Cuenta</RouterLink>
      </div>

      <div class="phone-container">
        <img
          src="../assets/Group 162500-2.png"
          alt="iPhone con Billetera Virtual"
          class="phone-image"
        />
      </div>
    </main>

    <!-- Background Waves -->
    <div class="background-waves">
      <svg class="wave wave-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#5dce76" fill-opacity="1" d="M0,224L30,202.7C60,181,120,139,180,144C240,149,300,203,360,213.3C420,224,480,192,540,181.3C600,171,660,181,720,176C780,171,840,149,900,133.3C960,117,1020,107,1080,117.3C1140,128,1200,160,1260,160C1320,160,1380,128,1410,112L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
      </svg>
      <svg class="wave wave-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#4eb964" fill-opacity="1" d="M0,192L40,181.3C80,171,160,149,240,170.7C320,192,400,256,480,272C560,288,640,256,720,218.7C800,181,880,139,960,133.3C1040,128,1120,160,1200,186.7C1280,213,1360,235,1400,240L1440,245.3L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
      </svg>
    </div>

    <RouterView />
  </div>
</template>


<script>
export default {
  name: 'LandingPage'
}
</script><style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow-x: hidden;
}

:root {
  overflow-y: hidden; /* Prevent vertical scrolling */
}

.landing-page {
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
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
  align-items: center;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 70px);
  position: relative;
  z-index: 1;
}

.text-content {
  flex: 1;
  max-width: 500px;
  padding-right: 2rem;
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
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone-image {
  width: auto;
  height: 70vh;
  max-height: 600px;
  object-fit: contain;
}

/* Background Waves */
.background-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 40%;
  z-index: 0;
  overflow: hidden;
}

.wave {
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.wave-1 {
  bottom: 20%; /* Adjusted positioning */
}

.wave-2 {
  bottom: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }

  .text-content {
    padding-right: 0;
  }

  .phone-container {
    width: 100%;
    height: auto;
  }

  .phone-image {
    height: 50vh;
    width: auto;
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

  .wave {
    height: 30%;
  }
}
</style>
