<template>
    <Paper class="search">
        <span class="search-title">Find a Ride</span>
        <v-divider color="#e91e63"></v-divider>
        <form class="search-form" @submit.prevent="submitRidePath($event)">
            <v-text-field color="#e91e63"
                label="Number of Cards"
                name="numberOfCards"
                type="number"
                min="1"
                value="1"
                required
            />
            <v-text-field color="#e91e63"
                label="Take off Date"
                name="takeOffDate"
                type="date"
                required
            />
            <v-text-field color="#e91e63"
                label="Arrival Date"
                name="arrivalDate"
                type="date"
                required
            />
            <v-text-field color="#e91e63"
                label="Max Price"
                name="maxPrice"
                type="number"
                min="1"
            />
            <label>
                <span class="search-label">Take Off Station</span>
                <select id="search-select"
                    name="takeOffStation"
                    required
                >
                    <option
                        v-for="(station,i) in stations"
                        :key="i"
                        :value="station.Id"
                        >{{station.Name}}</option>
                </select>
            </label>
            <label>
                <span class="search-label">Arrival Station</span>
                <select id="search-select"
                    name="arrivalStation"
                    required
                >
                    <option
                        v-for="(station,i) in stations"
                        :key="i"
                        :value="station.Id"
                        >{{station.Name}}</option>
                </select>
            </label>
            <div class="search-ride-type">
            <v-checkbox color="#e91e63"
                label="Bus"
                name="bus"
            ></v-checkbox>
            <v-checkbox color="#e91e63"
                label="Minibus"
                name="minibus"
            ></v-checkbox>
            <v-checkbox color="#e91e63"
                label="Car"
                name="car"
            ></v-checkbox>
            </div>
            <v-checkbox color="#e91e63"
                label="Roundabout"
                name="roundabout"
                v-model="isRoundabout"
            ></v-checkbox>
            <v-text-field color="#e91e63"
                label="Roundabout Take off Date"
                name="takeOffDateRound"
                type="date"
                required
                v-if="isRoundabout"
            />
            <v-text-field color="#e91e63"
                label="Roundabout Arrival Date"
                name="arrivalDateRound"
                type="date"
                required
                v-if="isRoundabout"
            />
            <v-btn type="submit" color="#e91e63" dark>Find a Ride</v-btn>
        </form>
    </Paper>
</template>

<script>
import {findPaths} from '../../../services/ride.service'
import Paper from '../Paper'

export default {
    components: {
        Paper
    },
    data() {
        return {
            isRoundabout: false
        }
    },
    props: ['stations'],
    methods: {
        async submitRidePath(event) {
            let rideTypes = []
            if (event.target.bus.checked)
                rideTypes.push(0)
            if (event.target.minibus.checked)
                rideTypes.push(1)
            if (event.target.car.checked)
                rideTypes.push(2) 

            const pathData = {
                TakeOfStationId: event.target.takeOffStation.value,
                ArrivalStationId: event.target.arrivalStation.value,
                TakeOfDate: event.target.takeOffDate.value,
                ArrivalDate: event.target.arrivalDate.value,
                NumberOfCards: event.target.numberOfCards.value,
                MaxCardPrice: event.target.maxPrice.value,
                IsRoundabout: event.target.roundabout.checked,
                TakeOfDateRoundAbout: event.target.roundabout.checked ? event.target.takeOffDateRound.value : null,
                ArrivalDateRoundAbout: event.target.roundabout.checked ? event.target.arrivalDateRound.value : null,
                RideTypes: rideTypes
            }
            if (pathData.TakeOfStationId == pathData.ArrivalStationId) {
                alert('Please enter different stations')
                return
            }
            if (pathData.TakeOfDate >= pathData.ArrivalDate) {
                alert('Arrival date must be after take off date')
                return
            }
            const responsePaths = await findPaths(pathData)
            const response = {
                responsePaths,
                numberOfSeats: pathData.NumberOfCards
            }
            this.$emit('foundPath', response)
        }
    },

}
</script>

<style>
.search {
    margin: 2em;
    padding: 2em;
    min-width: 25em;
    display: flex;
    flex-direction: column;
}
.search-title {
    margin: 1em;
    font-size: 1.2em;
    padding-left: 10px;
    text-align: center;
}
.search-form {
    display: flex;
    flex-direction: column;
}
#search-select {
    height:2em;
    width:10em;
    border: 0.5px solid grey;
    margin-bottom: 0.5em;
}
.search-label {
    margin-right: 1em;
}
.search-ride-type {
    display: flex;
    flex-direction: row;
}
</style>
