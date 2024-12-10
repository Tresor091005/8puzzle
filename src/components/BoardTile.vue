<template>
  <td
    class="tile"
    :style="`width: ${cardSize}px; height: ${cardSize}px;`"
    @click="$emit('tile-clicked', { x: rowNumber, y: columnNumber })"
    :class="{ 'blank-tile': tileNumber === BLANK_NUMBER, 'success' : isCorrect, 'error' : !isCorrect }"
  >
    {{ tileNumber === BLANK_NUMBER ? "" : tileNumber }}
  </td>
</template>

<script setup>
// Props
const props = defineProps({
  BLANK_NUMBER: {
    type: Number,
    required: true,
  },
  tileNumber: {
    type: Number,
    required: true,
  },
  rowNumber: {
    type: Number,
    required: true,
  },
  columnNumber: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  }
});

const cardSize = Math.floor(325/Math.pow(props.BLANK_NUMBER, 0.5));
// Emitting events handled automatically with $emit
</script>