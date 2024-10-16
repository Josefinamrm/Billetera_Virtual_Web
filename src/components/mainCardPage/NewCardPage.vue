<template>
  <div class="app-container">
    <div class="title">
      <h2><-</h2>
      <h2>Nueva Tarjeta</h2>
    </div>

    <div class="attributes">
      <div class="number">
        <label for="number">Número de Tarjeta</label>
        <div class="text-box"><input type="text" id="number" name="number" /></div>
      </div>
      <div class="name">
        <label for="name">Nombre del titular de la tarjeta</label>
        <div class="text-box"><input type="text" id="name" name="name" /></div>
      </div>
      <div class="identification">
        <label for="identification">Documento del titular</label>
        <div class="text-box"><input type="text" id="identification" name="identidication" /></div>
      </div>
      <div class="expiration">
        <label for="expiration">Vencimiento</label>
        <div class="text-box"><input type="text" id="expiration" name="expiration" /></div>
      </div>
      <div class="security">
        <label for="security">Código de seguridad</label>
        <div class="text-box"><input type="text" id="security" name="security" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: black;
  font-size: 20px;
  margin: 2px;
  padding: 0;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.title {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.app-container {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.text-box {
  width: min-content;
  border-style: solid;
  border-width: 1px;
  border-color: #e0e0e0;
  border-radius: 5px;
  margin-bottom: 25px;
}

label {
  font-size: 15px;
  font-weight: 600;
  color: #000000;
  margin-top: 15px;
  margin-bottom: 25px;
}
</style>
