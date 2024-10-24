<template>
  <div class="layout-container">
    <!-- Logo -->
    <div class="logo-container">
      <RouterLink to="/" class="inline-block"> <!-- Use RouterLink to navigate to the landing page -->
        <img src="../components/icons/vecteezy_green-lettuce-illustration_.jpg" alt="Company Logo" class="logo" />
      </RouterLink>
    </div>

    <!-- Main content area that will render child routes -->
    <RouterView />

    <!-- Wave background -->
    <div class="wave-container">
      <svg class="wave wave-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#5dce76"
          fill-opacity="1"
          d="M0,224L30,202.7C60,181,120,139,180,144C240,149,300,203,360,213.3C420,224,480,192,540,181.3C600,171,660,181,720,176C780,171,840,149,900,133.3C960,117,1020,107,1080,117.3C1140,128,1200,160,1260,160C1320,160,1380,128,1410,112L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
      <svg class="wave wave-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#4eb964"
          fill-opacity="1"
          d="M0,192L40,181.3C80,171,160,149,240,170.7C320,192,400,256,480,272C560,288,640,256,720,218.7C800,181,880,139,960,133.3C1040,128,1120,160,1200,186.7C1280,213,1360,235,1400,240L1440,245.3L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
// No additional script setup needed for this component
</script>

<style scoped>
.layout-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.logo-container {
  position: absolute;
  top: 15px;
  left: 70px; /* Increase the left value to move the logo towards the center */
  z-index: 10;
}

.logo {
  width: 60px;
  height: auto;
}

.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 40%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.wave {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
}

.wave-1 {
  bottom: 10%;
}

.wave-2 {
  bottom: 0;
}

@media (max-width: 480px), (max-height: 600px) {
  .wave-container {
    height: 30%;
  }

  .logo-container {
    top: 10px;
    left: 10px;
  }

  .logo {
    width: 40px;
  }
}
</style>
