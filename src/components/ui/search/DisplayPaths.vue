<template>
    <Paper class="display-paths">
        <span class="display-paths-title">Available Rides</span>
        <v-divider color="#e91e63"></v-divider>
        <v-card v-for="(path, i) in paths" :key="i">
            {{path}}
            <v-btn @click="buyCard(path)">Buy</v-btn>
        </v-card>
    </Paper>
</template>

<script>
import {postCard} from '../../../services/card.service'
import Paper from '../Paper'

export default {
    components: {
        Paper
    },
    props: ['paths', 'userId', 'numberOfSeats'],
    methods: {
        async buyCard(path) {
            const response = await postCard(path, this.userId, this.numberOfSeats)
            this.$emit('cardBought', response)
        }
    }
}
</script>

<style>
.display-paths {
    margin: 2em;
    padding: 2em;
    height: 76vh;
    overflow-y: scroll;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
.display-paths-title {
    margin: 1em;
    font-size: 1.2em;
    padding-left: 10px;
    text-align: center;
}
.display-paths > * {
    margin-bottom: 1em;
}
</style>

