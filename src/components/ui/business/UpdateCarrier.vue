<template>
    <Paper class="update-carrier">
        <span class="update-carrier-title">Update Carrier {{parent.Name}}</span>
        <v-divider color="#e91e63"></v-divider>
        <form @submit.prevent="submitUpdatedCarrier($event)">
            <v-text-field  color='#e91e63'
                label="Website"
                name="website"
                :value="parent.Website"
                required
            />
            <v-text-field  color='#e91e63'
                label="Phone Number"
                name="phoneNumber"
                :value="parent.PhoneNumber"
                required
            />
            <v-btn type="submit" color='#e91e63' dark class="update-carrier-button">Update Carrier</v-btn>
        </form>

    </Paper>
</template>

<script>
import Paper from '../Paper'
import {putCarrier} from '../../../services/carrier.service'

export default {
    components: {
        Paper
    },
    props: ['parent'],
    methods: {
        async submitUpdatedCarrier(event) {
            const carrierData = {
                Name: this.parent.Name,
                Website: event.target.website.value,
                PhoneNumber: event.target.phoneNumber.value,
                UserId: this.parent.UserId
            }
            const response = await putCarrier(carrierData, this.parent.Id)
            this.$emit('carrierUpdated', response)
        }
    }
}
</script>

<style>
    .update-carrier-title {
        margin: 1em;
        font-size: 1.2em;
        padding-left: 10px;
        text-align: center;
    }
    .update-carrier {
        padding: 1em;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .update-carrier > * {
        margin-bottom: 1em;
    }
    .update-carrier > form {
        display: flex;
        flex-direction: column;
    }
    .update-carrier-button {
        align-self: center;
    }
</style>
