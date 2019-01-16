<template>
    <Paper class="display-paths">
        <span class="display-paths-title">Available Rides</span>
        <v-divider color="#e91e63"></v-divider>
        <button class="display-paths-button" @click="showRoundabout = !showRoundabout">{{!showRoundabout ? "Show Roundabout" : "Show One Way"}}</button>
        <v-expansion-panel v-if="paths && !showRoundabout">
            <v-expansion-panel-content
                v-for="(path,i) in paths.OneWayTrip"
                :key="i"
            >
            <div slot="header" class="display-paths-item-title">
                <span>{{path.CardsInTrip[0].TakeOfStation.City}} - {{path.CardsInTrip[path.CardsInTrip.length - 1].ArrivalStation.City}}</span>
                <span>Number of Cards: {{path.OverlayNumber}}</span>
                <span>Total Cost: {{path.TotalCost}}</span>
                <v-btn type="submit" color='#e91e63' dark class="add-ride-button" @click="buyCard(path)">Buy</v-btn>
            </div>
            <v-card class="display-paths-card-list">
                <div class="display-paths-card-item" v-for="(card, i) in path.CardsInTrip" :key="i"> 
                    <span>{{i+1}}. {{card.TakeOfStation.City}} - {{card.ArrivalStation.City}}</span>
                    <span>Carrier: {{card.Card.CarrierName}}</span>
                    <span>Takeoff Date: {{new Date(card.Card.TakeOfDate).toLocaleString()}}</span>
                    <span>Cost: {{card.Card.Price}}</span>
                </div>
            </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="paths && showRoundabout">
            <v-expansion-panel-content
                v-for="(path,i) in paths.RoundAboutTrip"
                :key="i"
            >
            <div slot="header" class="display-paths-item-title">
                <span>{{path.CardsInTrip[0].TakeOfStation.City}} - {{path.CardsInTrip[path.CardsInTrip.length - 1].ArrivalStation.City}}</span>
                <span>Number of Cards: {{path.OverlayNumber}}</span>
                <span>Total Cost: {{path.TotalCost}}</span>
                <v-btn type="submit" color='#e91e63' dark class="add-ride-button" @click="buyCard(path)">Buy</v-btn>
            </div>
            <v-card class="display-paths-card-list">
                <div class="display-paths-card-item" v-for="(card, i) in path.CardsInTrip" :key="i"> 
                    <span>{{i+1}}. {{card.TakeOfStation.City}} - {{card.ArrivalStation.City}}</span>
                    <span>Carrier: {{card.Card.CarrierName}}</span>
                    <span>Takeoff Date: {{new Date(card.Card.TakeOfDate).toLocaleString()}}</span>
                    <span>Cost: {{card.Card.Price}}</span>
                </div>
            </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </Paper>
</template>

<script>
import {postCard} from '../../../services/card.service'
import Paper from '../Paper'

export default {
    components: {
        Paper
    },
    data() {
        return {
            showRoundabout: false
        }
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
.display-paths-item-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.display-paths-card-list {
    padding-left: 3em;
    display: flex;
    flex-direction: column;
}
.display-paths-card-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5em;
}
.display-paths-card-item > * {
    width: 33%;
}
.display-paths-button {
    outline: none;
    text-decoration: underline;
    color: #e91e63;
}
</style>

