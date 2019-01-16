<template>
    <Paper class="update-ride">
        <span class="update-ride-title">Update Ride {{parent.Name}}</span>
        <v-divider color="#e91e63"></v-divider>
        <form @submit.prevent="submitUpdatedRide($event)">
            <v-text-field color='#e91e63'
                label="Number of Seats"
                name="numberOfSeats"
                :value="parent.NumberOfSeats"
                required
            />
            <v-text-field color='#e91e63'
                label="Ride Price"
                name="ridePrice"
                :value="parent.RidePrice"
                required
            />
            <v-text-field color='#e91e63'
                label="Take off Time"
                name="takeOffTime"
                :value="new Date(parent.TakeOfTime).toLocaleTimeString('en',{hour12:false})"
                type="time"
                required
            />
            <v-text-field color='#e91e63'
                label="Arrival Time"
                name="arrivalTime"
                :value="new Date(parent.ArrivalTime).toLocaleTimeString('en',{hour12:false})"
                type="time"
                required
            />
            <label>
                <span class="select-label">Day of Week</span>
                <select id="carrier-select"
                    name="dayOfWeek"
                    :value="parent.DayOfWeek"
                    required
                >
                    <option
                        v-for="(weekDay,i) in weekDays"
                        :key="i"
                        :value="i"
                        >{{weekDay}}</option>
                </select>
             </label>
            <v-btn type="submit" color='#e91e63' dark class="update-ride-button">Update Ride</v-btn>
        </form>
    </Paper>
</template>

<script>
import Paper from '../Paper'
import {putRide} from '../../../services/ride.service'
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
    props: ['parent'],
    methods: {
        async submitUpdatedRide(event) {
            const rideData = {
                NumberOfSeats: event.target.numberOfSeats.value,
                RidePrice: event.target.ridePrice.value,
                DayOfWeek: event.target.dayOfWeek.value,
                TakeOfTime: event.target.takeOffTime.value,
                ArrivalTime: event.target.arrivalTime.value
            }
            const response = await putRide(rideData, this.parent.Id)
            this.$emit('rideUpdated', response)
        },

    }
}
</script>

<style>
    .update-ride-title {
        margin: 1em;
        font-size: 1.2em;
        padding-left: 10px;
        text-align: center;
    }
    .update-ride {
        padding: 1em;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .update-ride > * {
        margin-bottom: 1em;
    }
    .update-ride > form {
        display: flex;
        flex-direction: column;
    }
    .update-ride-button {
        align-self: center;
    }
</style>