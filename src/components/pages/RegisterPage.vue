<template>
    <div class="register-page">
        <Paper class="register-page-paper">
            <h1>PlanIT Rides</h1>
            <h2>Register</h2>
            <form @submit.prevent="registerUserData($event)" class="v-text-field-container">
                    <v-text-field label="Name" name="name" required color="#e91e63"/>
                    <v-text-field label="Last Name" name="lastName" required color="#e91e63"/>
                    <v-text-field label="Email" name="email" required color="#e91e63"/>
                    <v-text-field label="Password" name="password" type="password" required color="#e91e63"/>
                    <v-text-field label="Passport Number" name="passport" required/>

            <v-btn type="submit" color="#e91e63" dark>register</v-btn>
            </form>


            <span class="login-span">
                Already have an account?
                <router-link to="/login"> Log in </router-link>
            </span>
        </Paper>
    </div>
</template>

<script>
    import Paper from '../ui/Paper'
    import {registerUser} from '../../services/user.service'
    import router from '../../routes/routes'

    export default {
        components: {
            Paper
        },
        methods: {
            async registerUserData(event) {
                const userData = {
                    Name: event.target.name.value,
                    LastName: event.target.lastName.value,
                    Email: event.target.email.value,
                    Password: event.target.password.value,
                    PassportNumber: event.target.passport.value,
                }
                const response = await registerUser(userData)
                if (response) {
                    alert('Successful registration') 
                    router.push('/login')
                } else {
                    alert('Registration not successful')
                }
            }
        }
    }
</script>

<style scoped>
    .register-page {
        height: 100%;
        width: 100%;
        margin-top: 12vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: lightseagreen;

    }
    .register-page-paper {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 30em;
        height: 40em;
        padding: 2em;
        box-sizing: border-box;
        justify-content: space-evenly;
    }
    .v-text-field-container {
        margin: 0 auto;
        /*border: 1px solid green;*/
    }
    h1, h2 {
        margin:0 auto;
        color: #e91e63;
        /*border: 1px solid red;*/
    }
    label {
        display: flex;
        /*border: 1px solid red;*/
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin-top: 0.5em;
    }
    label > span {
        margin-bottom: 0.5em;
        margin-right: 0.5em;
        margin-top: 0.5em;
        width: 4em;
        font: inherit;
    }
    button {
        margin-top: 1em;
        font: inherit;
        color: #fff;
        background-color: lightseagreen;
        height: 2.5em;
        border: none;
        border-radius: 4px;
        width: 100%;
        text-transform: uppercase;
    }
    v-text-field {
        font: inherit;
        padding: 0.5em;
        width: 17em;
        font: inherit;
    }
    .login-span {
        margin-top: 1em;
        align-self: center;
    }
    a {
        color: #e91e63;
        text-decoration: none;
    }
</style>