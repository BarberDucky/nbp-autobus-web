<template>
    <Paper class="add-carrier">
        <span class="add-carrier-title">Add Carrier</span>
        <v-divider color="#e91e63"></v-divider>
        <form @submit.prevent="submitNewCarrier($event)">
            <v-text-field  color='#e91e63'
                label="Name"
                name="name"
                required
            />
            <v-text-field  color='#e91e63'
                label="Website"
                name="website"
                required
            />
            <v-text-field  color='#e91e63'
                label="Phone Number"
                name="phoneNumber"
                required
            />

            <v-btn type="submit" color='#e91e63' dark class="add-carrier-button">Add Carrier</v-btn>
        </form>

    </Paper>
</template>

<script>
import Paper from '../Paper'
import {postCarrier} from '../../../services/carrier.service'

export default {
    components: {
        Paper
    },
    props: ['userId'],
    methods: {
        async submitNewCarrier(event) {
            const carrierData = {
                Name: event.target.name.value,
                Website: event.target.website.value,
                PhoneNumber: event.target.phoneNumber.value,
                UserId: this.userId
            }
            const response = await postCarrier(carrierData)
            this.$emit('carrierPosted', response)
        }
    }
}
</script>

<style>
    .add-carrier-title {
        margin: 1em;
        font-size: 1.2em;
        padding-left: 10px;
        text-align: center;
    }
    .add-carrier {
        padding: 1em;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .add-carrier > * {
        margin-bottom: 1em;
    }
    .add-carrier > form {
        display: flex;
        flex-direction: column;
    }
    .add-carrier-button {
        align-self: center;
    }
</style>