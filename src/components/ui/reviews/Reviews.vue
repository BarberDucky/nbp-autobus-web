<template>
    <div class="reviews">
        <div class="reviews-company-grade">
            <Paper class="reviews-company">
                <span class="reviews-company-label">Company</span>
                <select id="carrier-select"
                @click="openSelect()"
                @change="selected($event)"
                >
                    <option disabled selected value> -- select a carrier -- </option>
                    <option
                        v-for="(carrier,i) in carriers"
                    :key="i"
                    :value="carrier.Id"
                    >{{carrier.Name}}</option>
                </select>
            </Paper>

            <Paper class="reviews-grade">
                <span class="reviews-grade-label">Grade</span>
                <Grade :grade="selectedCarrier.AvgGrade" class="reviews-grade-number"/>
            </Paper>
        </div>
        <Paper class="reviews-list">
            <div class="reviews-label-add">
            <span class="reviews-list-label"> <v-icon style="margin-right: 0.5em;" color="#e91e63">chat</v-icon>Reviews</span>
                <v-card v-if="selectedCarrier.Id">
                <v-card-title>Add a review</v-card-title>
                <form @submit.prevent="submitNewReview($event)">
                    <input
                        name="grade"
                        placeholder="Grade"
                        type="number"
                        max="5"
                        min="1"
                        value="3"
                        />
                    <input
                        name="text"
                        placeholder="Text"/>
                    <button>Submit review</button>
                </form>
                </v-card>
            </div>
                <v-divider color="#e91e63"></v-divider>
                <div class="reviews-list-content">
                    <v-card class="review-item"
                    v-for="(review,i) in carrierReviews"
                    :key="i"
                    >
                        <v-card-title>Grade: <Grade :grade="review.Grade"/>
                        </v-card-title>
                        <v-card-text>{{review.Text}}</v-card-text>
                        <span>{{review.Timestamp}}</span>
                    </v-card>
                </div>
        </Paper>

    </div>
</template>

<script>
import Paper from '../Paper'
import Grade from '../Grade'
import {getAllCarriers, getCarrier} from '../../../services/carrier.service'
import {getCarrierReviews, postReview} from '../../../services/review.service'

export default {
    components: {
        Paper,
        Grade
    },
    props: ['userId'],
    data() {
        return {
            carriers: [],
            selectedCarrier: {},
            carrierReviews: []
        }
    },
    methods: {
        async openSelect() {
            this.carriers = await getAllCarriers()
        },
        async selected(event) {
            this.selectedCarrier = this.carriers.find((element) => element.Id == event.target.value)
            this.carrierReviews = await getCarrierReviews(this.selectedCarrier.Id)
        },
        async submitNewReview(event) {
            const reviewData = {
                CarrierId: this.selectedCarrier.Id,
                UserId: this.userId,
                Text: event.target.text.value,
                Grade: event.target.grade.value
            }
            const response = await postReview(reviewData)
            if (response) {
                this.carrierReviews = await getCarrierReviews(this.selectedCarrier.Id)
                this.selectedCarrier = await getCarrier(this.selectedCarrier.Id)
            } else {
                alert('Post review not successful')
            }
        }
    }
}
</script>

<style>
    .reviews {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .reviews-company-grade {
        display: flex;
        flex-direction: row;
        height: 8em;
    }
    .reviews-company,
    .reviews-grade,
    .reviews-list {
        padding: 1em;
        margin: 1em;
        box-sizing: border-box;
    }
    .reviews-company,
    .reviews {
        flex-grow: 1;
    }

    .reviews-grade {
        width: 6.5em;
        display: flex;
        flex-direction: column;
    }

    .reviews-list {
        height: 32em;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
    }

    .reviews-list > * {
        margin-bottom: 1em;
    }

    .reviews-company {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .reviews-company > * {
        margin-right: 2em;
        font-size: 1.5em;
        padding-left: 10px;
    }

    .reviews-list::-webkit-scrollbar-track
    {
        margin: 17px;
        border-radius: 15px;
        background-color:rgba(0, 0, 0, 0.2);
    }

    .reviews-list::-webkit-scrollbar
    {
        width: 5px;
        background-color:transparent;
    }

    .reviews-list::-webkit-scrollbar-thumb
    {
        border-radius: 15px;
        background-color: grey;
    }
    #carrier-select {
        height:2em;
        width:10em;
        border: 0.5px solid grey;
    }
    .reviews-grade-number {
        font-size: 3em;
        align-self: flex-end;
        margin-right: 0.1em;
        font-weight: bold;
    }

    .reviews-list-label {
        margin: 1em;
        font-size: 1.5em;
        padding-left: 10px;
    }

    .review-item {
        margin: 1em;
        width: fit-content;
        float: left;
    }
    .reviews-label-add {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>

