<template>
  <!-- <p>
        <h3>Información de la tarjeta</h3>
        <p>Nombre: {{ cardName }}</p>
        <p>Numero de tarjeta: {{ cardNumber }}</p>
        <p>Fecha de expiración: {{ expirationDate }}</p>
        <p>Código de seguridad: {{ securityCode }}</p>
    </p> -->

  <div class="app-container">
    <div class="info">
      <div class="left-column">
        <h3>Tarjeta</h3>
        <p>Visa</p>
        <h3>Numero</h3>
        <p>**** **** **** ****</p>
        <h3>Emitida</h3>
        <p>**/**</p>
      </div>
      <div class="right-column">
        <h3>Nombre</h3>
        <p>JUNIOR RAMBAU</p>
        <h3>CVV</h3>
        <p>***</p>
        <h3>Valido hasta</h3>
        <p>**/**</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 10px;
}

.info {
  display: flex;
  gap: 2rem;
}

h3 {
  color: black;
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
}

p {
  color: rgb(71, 71, 71);
  font-size: 12px;
  margin-bottom: 10px;
}

h2 {
  margin-bottom: 10px;
  color: #000000;
  font-size: 20px;
}
</style>
