<template>
  <!-- <p>
        <h3>Información de la tarjeta</h3>
        <p>Nombre: {{ cardName }}</p>
        <p>Numero de tarjeta: {{ cardNumber }}</p>
        <p>Fecha de expiración: {{ expirationDate }}</p>
        <p>Código de seguridad: {{ securityCode }}</p>
    </p> -->

  <div class="cardInfo">
    <h2>Información</h2>
    <div class="izquierda">
      <h3>Tarjeta</h3>
      <h3>Nombre</h3>
      <h3>Numero</h3>
      <h3>CVV</h3>
      <h3>Emitida</h3>
      <h3>Valido hasta</h3>
    </div>
  </div>
</template>

<style scoped>
div.cardInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 30px;
  width: 300px;
}

h3 {
  color: black;
  font-size: 15px;
  font-weight: bold;
  margin: 2px;
}

h2 {
  color: #000000;
  font-size: 20px;
}
</style>
