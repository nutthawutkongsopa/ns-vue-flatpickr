<template>
    <div>
        <div>
            <h3>Default</h3>
            <Flatpickr v-model="selectedDate" />
        </div>
        <div>
            <h3>Allow Input</h3>
            <Flatpickr v-model="selectedDate" :options="{ allowInput: true }" />
        </div>
        <div>
            <h3>Allow Input Time</h3>
            <Flatpickr mode="time" v-model="selectedDate" :options="{ allowInput: true, dateFormat: 'H:i:S', enableSeconds: true, time_24hr: true }" />
        </div>
        <div>
            <h3>Locale</h3>
            <Flatpickr v-model="selectedDate" :options="{ locale: 'th', useLocaleYear: true }" />
        </div>
        <div>
            <h3>Warp</h3>
            <Flatpickr v-model="selectedDate" wrap :options="{ clickOpens: false }">
                <input type="text" data-input />
                <button class="input-button" title="toggle" data-toggle>
                    Open
                </button>

                <button class="input-button" title="clear" data-clear>
                    Clear
                </button>
            </Flatpickr>
        </div>
        <div>
            <h3>Disabled</h3>
            <Flatpickr v-model="selectedDate" disabled />
        </div>
        <div>
            <h3>Time</h3>
            <Flatpickr mode="time" v-model="selectedDate" />
        </div>
        <div style="margin-top: 10px;">
            {{ selectedDate }}
        </div>

        <div>
            <h3>Range</h3>
            <Flatpickr mode="range" v-model="selectedRange" />
        </div>
        <div style="margin-top: 10px;">
            {{ selectedRange }}
        </div>
        <div>
            <h3>Multiple</h3>
            <Flatpickr mode="multiple" v-model="selectedMultiple" />
        </div>
        <div style="margin-top: 10px;">
            {{ selectedMultiple }}
        </div>
    </div>
</template>
<script lang="ts">
import { Flatpickr } from './index'
export default {
    components: {
        Flatpickr
    },
    data() {
        return {
            selectedDate: new Date(),
            selectedRange: [],
            selectedMultiple: []
        }
    }
}
</script>