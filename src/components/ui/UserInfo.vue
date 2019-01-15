<template>
    <div class="user-info">
        <Paper class="user-info-paper">
            <div class="user-info-header">
                <v-icon color="#e91e63">person</v-icon>
                <h3>User info</h3>
            </div>
            <v-divider color="#e91e63"></v-divider>

            <form class="user-info-form" @submit.prevent="updateUser($event)">
                <v-text-field color="#e91e63"
                    label="First Name"
                    v-model="user.Name"
                    name="name"
                    required
                />

                <v-text-field color="#e91e63"
                    label="Last Name"
                    v-model="user.LastName"
                    name="lastName"
                    required
                />

                <v-text-field color="#e91e63"
                    label="Passport Number"
                    v-model="user.PassportNumber"
                    name="passport"
                    required
                />

                <v-btn type="button" @click="restoreUser()">Restore User Data</v-btn>
                <v-btn type="submit" color="#e91e63" dark>Update User</v-btn>
            </form>
        </Paper>
    </div>
</template>

<script>
import Paper from './Paper'
import {updateUser} from '../../services/user.service'

export default {
    components: {
        Paper
    },
    props: ['user'],
    methods: {
        async updateUser(event) {
            const userData = {
                PassportNumber: event.target.passport.value,
                Name: event.target.name.value,
                LastName: event.target.lastName.value
            }
            const response = await updateUser(userData, this.user.Id)
            if (response) {
                alert('Successful update')
            } else {
                alert('Upadate not successful')
            }
            this.$emit('userUpdated', this.user.Id)
        },
        async restoreUser() {
            this.$emit('userUpdated', this.user.Id)
        }
    }
}
</script>

<style>
    .user-info {
        height: 100%;
        width: 100%;
        margin-top: 12vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .user-info-paper {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 30em;
        height: 34em;
        padding: 2em;
        box-sizing: border-box;
    }
    .user-info-header {
        display: flex;
        align-items: center;
        margin-bottom: 0.5em;
    }
    .user-info-header > * {
        margin-right: 0.5em;
    }
    .user-info-form {
        height: 100%;
        margin-top: 3em;
        justify-content:flex-end;
        display: flex;
        flex-direction: column;
    }
</style>
