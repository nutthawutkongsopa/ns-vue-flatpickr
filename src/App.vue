<template>
    <div>
        <h1>Test</h1>
        <FlatPickr v-model="datex"><h1>sfs</h1></FlatPickr>
    </div>
</template>
<script lang="ts">
import FlatPickr from './Flatpickr.vue'
export default {
    components: {
        FlatPickr
    },
    data() {
        return {
            datex: new Date()
        }
    }
}
</script>