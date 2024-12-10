<script setup>
import { ref, reactive, computed, watch } from "vue";
import Tile from "./BoardTile.vue";
import {
  getBoard,
  mixBoard,
  findBlank,
  isBoardSolved,
  isSwappable,
  getSwappableIndexes,
  swap
} from "../assets/board";

const props = defineProps({
  level: {
    type: Number,
    default: 3,
    required: true,
  }
})

// Define emits
defineEmits(['new-game', 'quit-game']);

// Initial board state and correct board for validation
const correctBoard = getBoard(props.level);
const board = reactive(mixBoard(correctBoard, 300));

// Reactive properties
const blank = reactive(findBlank(board));
const gameStarts = ref(false);
const moves = ref(0);
const timer = ref(0);

// Computed property to determine the correctness of each tile's position
const tileStatuses = computed(() =>
  board.map((row, rowIndex) =>
    row.map((tile, columnIndex) => tile === correctBoard[rowIndex][columnIndex])
  )
);

// Computed property to check if the board is solved
const isSolved = computed(() => isBoardSolved(board, correctBoard));

// Watchers for game start and timer
watch(gameStarts, () => {
  if (gameStarts.value) timer.value++;
});

watch(timer, () => {
  setTimeout(() => {
    if (!isSolved.value && moves.value) timer.value++;
  }, 1000);
});

// Method for handling tile clicks
function onTileClicked(clickedIndex) {
  if (isSolved.value) return;

  if (isSwappable(board, clickedIndex)) {
    const swappableIndexes = getSwappableIndexes(board, clickedIndex);

    if (swappableIndexes.length > 0) {
      const [source, target] = swappableIndexes;
      const newBoard = swap(board, source, target);

      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          board[i][j] = newBoard[i][j];
        }
      }

      // Mise à jour de la position de l'espace vide
      blank.x = target.x;
      blank.y = target.y;

      moves.value++;
      gameStarts.value = true;
    }
  }
}

</script>

<template>
  <div class="state-container">
    <span>{{ timer }} Second{{ timer !== 1 ? "s" : "" }}</span>
    <span>{{ moves }} Move{{ moves !== 1 ? "s" : "" }}</span>
  </div>

  <table class="board-table" :class="{ solved: isSolved }">
    <tbody>
      <tr v-for="(row, rowIndex) in board" :key="rowIndex">
        <Tile v-for="(tile, index) in row" 
          :BLANK_NUMBER = "board.length ** 2"
          :tileNumber="tile" 
          :key="tile" 
          :rowNumber="rowIndex" 
          :columnNumber="index"
          :isCorrect="tileStatuses[rowIndex][index]" 
          @tile-clicked="onTileClicked" 
        />
      </tr>
    </tbody>
  </table>

  <div class="btn-group">
    <button v-if="!isSolved" @click="$emit('new-game')" class="new-game">Restart</button>
    <button @click="$emit('quit-game')" class="new-game">Quit</button>
  </div>

  <a href="https://github.com/gameric/8-puzzle" v-if="timer > 30 && !isSolved">
    Don't know how to solve?
  </a>

</template>
