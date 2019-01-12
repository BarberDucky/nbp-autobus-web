<template>
    <div class="register-page">
        <Paper class="register-page-paper">
            <h1>NBP Voznje</h1>
            <h2>Login</h2>
            <form @submit.prevent="registerUserData($event)" class="input-container">
                <label>
                    <span> Name  </span>
                    <input placeholder="John" name="name"/>
                </label>

                <label>
                    <span> Last Name  </span>
                    <input placeholder="Doe" name="lastName"/>
                </label>

                <label>
                    <span> Email </span>
                    <input placeholder="user@example.com" name="email"/>
                </label>

                <label>
                    <span> Password </span>
                    <input placeholder="password123" name="password" type="password"/>
                </label>

                <label>
                    <span> Passport Number</span>
                    <input placeholder="918371920393" name="passport"/>
                </label>

            <button>register</button>
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

    export default {
        components: {
            Paper
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
        height: 34em;
        padding: 2em;
        box-sizing: border-box;
        justify-content: space-evenly;
    }
    .input-container {
        margin: 0 auto;
        /*border: 1px solid green;*/
    }
    h1, h2 {
        margin:0 auto;
        color: seagreen;
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
    input {
        font: inherit;
        padding: 0.5em;
        width: 17em;
        font: inherit;
    }
    .doctor-check {
        margin: auto;
        padding-top: 0.8em;
        display: flex;
        align-items: center;
        align-content: flex-start;
        /*border: 1px solid blue;*/
        width: 10em;
    }
    .doctor-check > input {
        width: 1em;
    }
    .login-span {
        margin-top: 1em;
        align-self: center;
    }
    .doctor {
        pointer-events: none;
        border: 1px solid black;
    }
    a {
        color: lightseagreen;
        text-decoration: none;
    }
</style>