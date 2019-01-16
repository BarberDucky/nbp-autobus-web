<template>
    <Paper class="add-ride">
        <span class="add-ride-title">Add Ride for {{parent.Name}}</span>
        <v-divider color="#e91e63"></v-divider>
        <form @submit.prevent="submitNewRide($event)">
            <v-text-field color='#e91e63'
                label="Number of Seats"
                name="numberOfSeats"
                required
            />
            <v-text-field color='#e91e63'
                label="Ride Price"
                name="ridePrice"
                required
            />
            <v-text-field color='#e91e63'
                label="Take off Time"
                name="takeOffTime"
                type="time"
                required
            />
            <v-text-field color='#e91e63'
                label="Arrival Time"
                name="arrivalTime"
                type="time"
                required
            />
            <label>
                <span class="select-label">Day of Week</span>
                <select id="carrier-select"
                    name="dayOfWeek"
                    required
                >
                    <option
                        v-for="(weekDay,i) in weekDays"
                        :key="i"
                        :value="i"
                        >{{weekDay}}</option>
                </select>
             </label>
            <label>
                <span class="select-label">Take off Station</span>
            <select id="carrier-select"
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
                <span class="select-label">Arrival Station</span>
            <select id="carrier-select"
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
             <label>
                <span class="select-label">Ride Type</span>
                <select id="carrier-select"
                    name="rideType"
                    :value="parent.RideType"
                    required
                >
                    <option
                        value="0"
                        >Bus</option>
                    <option
                        value="1"
                        >Minibus</option>
                    <option
                        value="2"
                        >Car</option>
                </select>
             </label>
            <v-btn type="submit" color='#e91e63' dark class="add-ride-button">Add Ride</v-btn>
        </form>
        <v-divider color="#e91e63"></v-divider>
        <span class="add-ride-title">Add Station</span>
        <form @submit.prevent="submitNewStation($event)">
            <v-text-field color='#e91e63'
                label="Name"
                name="name"
                required
            />
            <v-text-field color='#e91e63'
                label="City"
                name="city"
                required
            />
            <v-text-field color='#e91e63'
                label="Country"
                name="country"
                required
            />
            <v-btn type="submit" color='#e91e63' dark class="add-ride-button">Add Station</v-btn>
        </form>
    </Paper>
</template>

<script>
import Paper from '../Paper'
import {postRide} from '../../../services/ride.service'
import {postStation} from '../../../services/stations.service'
import WeekDays from '../../../model/weekDays'

export default {
    components: {
        Paper
    },
    data() {
        return {
            weekDays: WeekDays
        }
    },
    props: ['parent', 'stations'],
    methods: {
        async submitNewRide(event) {
            const rideData = {
                NumberOfSeats: event.target.numberOfSeats.value,
                RidePrice: event.target.ridePrice.value,
                DayOfWeek: event.target.dayOfWeek.value,
                TakeOfTime: event.target.takeOffTime.value,
                ArrivalTime: event.target.arrivalTime.value,
                TakeOfStationId: event.target.takeOffStation.value,
                ArrivalStationId: event.target.arrivalStation.value,
                RideType: event.target.rideType.value,
                CarrierId: this.parent.Id
            }
            if (rideData.TakeOfStationId == rideData.ArrivalStationId) {
                alert('Please enter different stations')
                return
            }
            const response = await postRide(rideData)
            this.$emit('ridePosted', response)
        },
        async submitNewStation(event) {
            const stationData = {
                Name: event.target.name.value,
                City: event.target.city.value,
                Country: event.target.country.value
            }
            const response = await postStation(stationData)
            this.$emit('stationPosted', response)
        }
    }
}
</script>

<style>
    #carrier-select {
        height: 2em;
        width: 10em;
        border: 0.5px solid grey;
        margin-bottom: 0.5em;
    }
    .add-ride-title {
        margin: 1em;
        font-size: 1.2em;
        padding-left: 10px;
        text-align: center;
    }
    .add-ride {
        padding: 1em;
        flex-direction: column;
        align-items: stretch;
        overflow-y: scroll;
    }
    .add-ride > * {
        margin-bottom: 1em;
    }
    .add-ride > form {
        display: flex;
        flex-direction: column;
    }
    .add-ride-button {
        align-self: center;
    }
    .add-ride::-webkit-scrollbar-track
    {
        margin: 17px;
        border-radius: 15px;
        background-color:rgba(0, 0, 0, 0.2);
    }

    .add-ride::-webkit-scrollbar
    {
        width: 5px;
        background-color:transparent;
    }

    .add-ride::-webkit-scrollbar-thumb
    {
        border-radius: 15px;
        background-color: grey;
    }
    .select-label {
        margin-right: 1em;
    }
</style>


