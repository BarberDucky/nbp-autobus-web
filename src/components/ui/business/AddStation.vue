<template>
    <Paper>
        <span>Add Station</span>

        <v-btn flat icon color="pink" 
            @click="closeStationForm()">
            <v-icon>back</v-icon>
        </v-btn>

        <v-form>
            <v-text-field
                label="Name"
            ></v-text-field>
            <v-text-field
                label="Website"
            ></v-text-field>
            <v-text-field
                label="Phone Number"
            ></v-text-field>

            <v-btn>Add Station</v-btn>
        </v-form>
    </Paper>
</template>

<script>
import Paper from '../Paper'

export default {
    components: {
        Paper
    },
    methods: {
        closeStationForm() {
            this.$emit('closeStationForm')
        }
    }
}
</script>

