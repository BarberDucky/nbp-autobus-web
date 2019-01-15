<template>
  <div>
    <v-toolbar
        color="#e91e63"
    >
    <v-icon color="white">directions_bus</v-icon>
    <v-toolbar-title class="white--text">PlanIT Rides</v-toolbar-title> 
    
    <v-spacer></v-spacer>

    <v-btn icon @click="logout()">
      <v-icon color="white">input</v-icon>
    </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import router from '../../routes/routes'
export default {
    methods: {
        logout() {
            router.push('/login')
        }
    }

}
</script>
