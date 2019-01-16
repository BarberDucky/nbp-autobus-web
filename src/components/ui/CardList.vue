<template>
    <Paper class="cardlist">
        <span class="cardlist-title"><v-icon color="#e91e63">list_alt</v-icon>Bought Cards</span>
        <v-divider color="#e91e63"></v-divider>
            <v-card
                v-for="(card,i) in cards"
                :key="i"
            >
            <div class="cardlist-item-title">
                <span>{{card.TakeOfStation.City}} - {{card.ArrivalStation.City}}</span>
                <span>Takeoff Date: {{new Date(card.TakeOfDate).toLocaleString()}}</span>
                <span>Carrier: {{card.CarrierName}}</span>
                <span>Price: {{card.Price}}</span>
            </div>
            </v-card>
    </Paper>
</template>

<script>
import Paper from './Paper'

export default {
    components: {
        Paper
    },
    props: ['cards']
}
</script>

<style>
    .cardlist {
        margin: 2em;
        height: 76vh;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        padding: 2em;
    }
    .cardlist > * {
        margin-bottom: 1em; 
    }

    .cardlist-title {
        font-size: 1.2em;
        display: flex;
        flex-direction: row;
        align-items: center;
    } 
    .cardlist-title > * {
        margin-right: 0.5em;
    }
    .cardlist-item-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5em;
        width: 100%;
        height: 4em;
    }
    .cardlist-item-title > * {
        width: 33%;
        text-align: center;
    }
</style>


