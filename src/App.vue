<script setup>
import { ref } from "vue";
import Game from "./components/GameBoard.vue";
import Start from "./views/Start.vue";

const games = ref(0);
const status = ref('beginning');
const level = ref(0);

const startGame = (lv) => {
  status.value = 'gaming';
  level.value = lv;
  games.value++;
}

const stopGame = () => { 
  status.value = 'beginning'
  level.value = 0;
}

// const playAgain = () => { status.value = 'gaming' }

</script>

<template>
  <div class="game-container">
    <h1 class="title">8-Puzzle Game</h1>

    <Start @start-game="startGame" v-if="status == 'beginning'" />

    <!-- a simple trick to reload the component -->
    <Game :level="level" v-if="status == 'gaming'" :key="games" @new-game="games++" @quit-game="stopGame" />
  </div>
</template>