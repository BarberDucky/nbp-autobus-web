<template>
    <div class="user-page">
        <Header/>
        <v-tabs light slider-color="#e91e63"  class="user-page-tabs" v-model="active">
            <v-tab ripple> 
               Search fare
            </v-tab>
            <v-tab-item>
                <div class="search-fare">
                    <Search :stations="stations" @foundPath="displayPaths($event)"/>
                    <DisplayPaths :paths="paths" :userId="user.Id" :numberOfSeats="numberOfSeats" @cardBought="cardBought($event)"/>
                </div>
            </v-tab-item>

            <v-tab ripple> 
                Bought Cards
            </v-tab>
            <v-tab-item>
                <CardList :cards="cards"/>
            </v-tab-item>

            <v-tab ripple> 
                Reviews
            </v-tab>
            <v-tab-item>
                <Reviews :userId="user.Id" :carriers="reviewCarriers" @requestedCarriers="fetchCarriers()"/>
            </v-tab-item>

            <v-tab ripple> 
                Business
            </v-tab>
            <v-tab-item>
                <Business :userId="user.Id"/>
            </v-tab-item>

            <v-tab ripple> 
                User Info
            </v-tab>
            <v-tab-item>
                <UserInfo :user="user" @userUpdated="updateUserInfo($event)"/>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import Header from '../ui/Header'
import UserInfo from '../ui/UserInfo'
import Reviews from '../ui/reviews/Reviews'
import Business from '../ui/business/Business'
import Search from '../ui/search/Search'
import DisplayPaths from '../ui/search/DisplayPaths'
import CardList from '../ui/CardList'
import router from '../../routes/routes'
import {getUser} from '../../services/user.service'
import {getAllStations} from '../../services/stations.service'
import {getCards} from '../../services/card.service'
import {getAllCarriers} from '../../services/carrier.service'

export default {
    components: {
        Header,
        UserInfo,
        Reviews,
        Business,
        Search,
        DisplayPaths,
        CardList
    },
    data() {
        return {
            user: {},
            stations: [],
            paths: [],
            cards: [],
            numberOfSeats: 0,
            reviewCarriers: [],
            active: 0
        }
    },
    methods: {
        async updateUserInfo(event) {
            this.user = await getUser(event)
        },
        displayPaths(event) {
            this.paths = event.responsePaths
            this.numberOfSeats = event.numberOfSeats
        },
        async cardBought() {
            this.cards = await getCards(this.user.Id)
            this.active = 1
        },
        async fetchCarriers() {
            this.reviewCarriers = await getAllCarriers()
        }
    },
    watch: {
        active: async function tabsChange(newTab) {
            if (newTab == 1) {
                this.cards = await getCards(this.user.Id)
            } else if (newTab == 2) {
                this.reviewCarriers = await getAllCarriers()
            }
        }
    },
    created() {
        if (!this.$route.params.user) {
            router.push('/login')
        } else {
            this.user = this.$route.params.user
            getAllStations()
            .then(response => this.stations = response)
            .then(() => getCards(this.user.Id))
            .then((cards) => this.cards = cards)
        }
    }
}
</script>

<style>
    .user-page,
    .user-page-tabs{
        height: 100%;
        width: 100%;
    }
    .user-page {
        display: flex;
        flex-direction: column;
    }
    .search-fare {
        display: flex;
        flex-direction: row;
    }
</style>
