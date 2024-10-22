<template>
  <div class="content-wrapper">
    <main>
      <div class="text-content">
        <h1>Una Nueva Billetera Virtual</h1>
        <p>Maneja tu plata de de la mejor y mas segura manera.</p>
        <RouterLink to="/register" class="btn btn-primary btn-large">Registrarse</RouterLink>
      </div>
      <div class="image-container">
        <img src="../assets/Group 162500-2.png" alt="App Preview" class="app-preview" />
      </div>
    </main>
    <div class="background-shape"></div>
  </div>
</template>

<script>
export default {
  name: 'LandingPageContent'
}
</script>

<style scoped>
.content-wrapper {
  flex-grow: 1;
  position: relative;
}

main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  min-height: calc(100vh - 80px);
}

.text-content {
  max-width: 600px;
}

.image-container {
  position: relative;
  margin-left: 2rem;
}

.app-preview {
  width: 375px;
  height: 650px;
  object-fit: contain;
  position: relative;
  z-index: 10;
}

h1 {
  font-size: 3.5rem;
  color: #5dce76;
  margin-bottom: 1rem;
}

p {
  font-size: 1.25rem;
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
}

.btn-primary {
  background-color: #5dce76;
  color: white;
}

.btn-primary:hover {
  background-color: #4eb964;
}

.btn-large {
  font-size: 1.25rem;
  padding: 0.75rem 2rem;
}

.background-shape {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: #5dce76;
  opacity: 0.2;
  clip-path: polygon(
    0% 100%,
    0% 60%,
    5% 65%,
    10% 70%,
    15% 72%,
    20% 71%,
    25% 69%,
    30% 68%,
    35% 69%,
    40% 71%,
    45% 74%,
    50% 76%,
    55% 77%,
    60% 76%,
    65% 74%,
    70% 71%,
    75% 69%,
    80% 68%,
    85% 69%,
    90% 71%,
    95% 72%,
    100% 70%,
    100% 100%
  );
}

@media (max-width: 1024px) {
  main {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
  }

  .text-content {
    margin-bottom: 2rem;
  }

  .image-container {
    margin-left: 0;
  }

  .app-preview {
    width: 300px;
    height: 520px;
  }

  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1rem;
  }

  .btn-large {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
  }

  .background-shape {
    height: 40%;
  }
}
</style>