<template>
    <div class="business">
        <Paper class="business-list">
            <v-treeview
                :items="items"
                :active.sync="active"
                item-children="Rides"
                item-text="Name"
                activatable
            >
            <template slot="prepend" slot-scope="{ item }">
                <v-icon v-if="item.type == 'ride'">
                    directions_bus
                </v-icon>
            </template>

            <template slot="append" slot-scope="{ item }">
                <v-btn flat icon color="pink" 
                    v-if="item.type != 'ride'"
                    @click="addItem($event, item)">
                    <v-icon>add</v-icon>
                </v-btn>
                <v-btn flat icon color="pink" 
                    v-if="item.type == 'ride'"
                    @click="removeRide($event, item)">
                    <v-icon>delete</v-icon>
                </v-btn>
            </template>
            </v-treeview>

        </Paper>

        <AddCarrier v-if="addForm && addForm.type == 'top'" :userId="userId" @carrierPosted="refresh()"/>
        <UpdateCarrier v-if="activeElement && activeElement.type == 'carrier'" :parent="activeElement" @carrierUpdated="refresh()"/>
        <AddRide v-if="addForm && addForm.type != 'top'" :parent="addForm" :stations="stations" @ridePosted="refresh()" @stationPosted="refreshStations()"/>
        <UpdateRide v-if="activeElement && activeElement.type == 'ride'" :parent="activeElement" @rideUpdated="refresh()"/>
       
    </div>
</template>

<script>
import Paper from '../Paper'
import AddCarrier from './AddCarrier'
import AddRide from './AddRide'
import UpdateCarrier from './UpdateCarrier'
import UpdateRide from './UpdateRide'
import {getCarriersWithRides} from '../../../services/carrier.service'
import {getAllStations} from '../../../services/stations.service'
import {deleteRide} from '../../../services/ride.service'

export default {
    components: {
        Paper,
        AddCarrier,
        AddRide,
        UpdateCarrier,
        UpdateRide
    },
    data: () => ({
      active: [],
      open: [],
      carriers: [],
      addForm: null,
      stationsForm: false,
      stations: []
    }),
    props: ['userId'],
    watch: {
        active: function (newList, oldList) {
            if (oldList.length == 0 && newList.length > 0) {
                this.addForm = null
            }
        }
    },
    computed: {
      activeElement () {
          const ae = this.findActiveElement()
          return ae
          
      },
      items () {
        return [
          {
            id: 0,
            Name: 'Carriers',
            type: 'top',
            Rides: this.treeData
          }
        ]
      },
      treeData() {
            return this.carriers
                .map(carrier => {
                    return {
                        id: carrier.Id,
                        Name: carrier.Name,
                        type: 'carrier',
                        Rides: carrier.Rides
                            .map(ride => {
                                return {
                                    id: ride.Id,
                                    Name: `${ride.TakeOfStation.City} - ${ride.ArrivalStation.City}`,
                                    type: 'ride'
                                }
                            })
                    }
                })
        }
    },
    methods: {
        async removeRide(event, parent) {
            event.stopPropagation()
            this.active = []
            this.addForm = null
            await deleteRide(parent.id)
            this.refresh()

        },
        async addItem(event, parent) {
            event.stopPropagation()
            this.active = []
            const activeIndex = parent.id
            let element = parent
            this.carriers
                .forEach(carrier => {
                    if (carrier.Id == activeIndex) {
                        element = carrier
                        element.type = 'carrier'
                    } else {
                        carrier.Rides
                            .forEach(ride => {
                                if (ride.Id == activeIndex) {
                                    element = ride
                                    element.type = 'ride'
                                }
                            })
                    }
                })
            this.addForm = element

            if (parent.type == 'carrier') {
                this.stations = await getAllStations()
            }
        },
        findActiveElement() {
            const activeIndex = this.active[0]
            if (activeIndex == 0) {
                return null
            }
            let response = null
            this.carriers
                .forEach(carrier => {
                    if (carrier.Id == activeIndex) {
                        response = carrier
                        response.type = 'carrier'
                    } else {
                        carrier.Rides
                            .forEach(ride => {
                                if (ride.Id == activeIndex) {
                                    response = ride
                                    response.type = 'ride'
                                }
                            })
                    }
                })
            return response
        },
        refresh() {
            getCarriersWithRides(this.userId)
                .then(response => {
                    this.carriers = response
                })
        },
        async refreshStations() {
            this.stations = await getAllStations()
        }
    },
    created() {
        getCarriersWithRides(this.userId)
            .then(response => {
                this.carriers = response
            })
    }
}
</script>

<style>
    .business {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    }

    .business > * {
        width: calc(50% - 3em);
        height: 77vh;
        margin: 2em;
        margin-right: 0;
    }
    .business > *:last-child {
        margin-right: 2em;
    }
    .business-list {
        padding: 1em;
    }
</style>

