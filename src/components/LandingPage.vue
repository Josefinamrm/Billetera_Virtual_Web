<template>
  <div class="landing-page">
    <header>
      <nav>
        <RouterLink to="/register" class="btn btn-secondary">Registrarse</RouterLink>
        <RouterLink to="/login" class="btn btn-primary">Ingresa</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
.landing-page {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
}

header {
  padding: 1rem;
  position: relative;
  z-index: 10;
}

nav {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
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

.btn-secondary {
  background-color: transparent;
  color: #4b5563;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}
</style>