<template>
    <div :class="findColor(grade)" v-if="grade">
        {{grade != 'NaN' ? grade.toFixed(1) : 0}}
    </div>
</template>

<script>
export default {
    props: ['grade'],
    data() {
        return {
            gradeColors: ['black-grade', 'red-grade', 'orange-grade', 'amber-grade', 'lightgreen-grade', 'green-grade']
        }
    },
    methods: {
        findColor(grade) {
            if (grade) {
                return this.gradeColors[Math.floor(grade)]
            } else {
                return this.gradeColors[0]
            }
        }
    }
}
</script>

<style>
.black-grade {
    color: black;
}
.red-grade {
    color: red;
}
.orange-grade {
    color: orange;
}
.amber-grade {
    color: yellowgreen;
}
.lightgreen-grade {
    color: darkgreen;
}
.green-grade {
    color: green;
}
</style>

