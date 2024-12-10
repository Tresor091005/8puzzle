<script setup>
import { ref } from 'vue';

const level = ref(3);

</script>

<template>
    <div class="welcome-board">
        <div class="state-container center">
            <span>Level</span>
            <div>
                <div>
                    <input type="radio" name="level" id="easy" :value="3" v-model="level" checked />
                    <label for="easy" class="me-4">Easy</label>
                </div>

                <div>
                    <input type="radio" name="level" id="medium" :value="4" v-model="level" />
                    <label for="medium" class="me-4">Medium</label>
                </div>

                <div>
                    <input type="radio" name="level" id="hard" :value="5" v-model="level" />
                    <label for="hard">Difficult</label>
                </div>
            </div>
        </div>

        <button @click="$emit('start-game', level)" class="new-game">Start</button>
    </div>
</template>