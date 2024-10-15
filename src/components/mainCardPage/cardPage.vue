<script setup>
import Card from './Card.vue'
import CardInfo from './cardInfo.vue'
</script>

<template>
  <div class="todo">
    <div class="principal">
      <h2>Mis Tarjetas</h2>
      <button>+ Agregar Tarjetas</button>
    </div>
    <div class="tarjetas">
      <div class="conInfo">
        <Card />
        <CardInfo />
      </div>
      <div class="conInfo">
        <Card />
        <CardInfo />
      </div>
      <div class="conInfo">
        <Card />
        <CardInfo />
      </div>
      <div class="conInfo">
        <Card />
        <CardInfo />
      </div>
      <div class="conInfo">
        <Card />
        <CardInfo />
      </div>
    </div>
  </div>
</template>

<style scoped>
div.todo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 30px;
}
div.principal {
  width: max-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  margin-bottom: 30px;
}
h2 {
  color: black;
  font-size: 20px;
  margin: 2px;
  padding: 0;
}

button {
  background-color: #5dce76;
  border-radius: 25px;
  margin-left: 15px;
  width: 167px;
  height: 40px;
  font-size: 10px;
  font-weight: bold;
}

div.tarjetas {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  align-items: flex-start;
  align-content: flex-start;
}
</style>
