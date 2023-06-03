<template>
    <div>
        <div>
            <h3>Default</h3>
            <FlatPickr v-model="datex" />
        </div>
        <div>
            <h3>Allow Input</h3>
            <FlatPickr v-model="datex" :options="{ allowInput: true }" />
        </div>
        <div>
            <h3>Locale</h3>
            <FlatPickr v-model="datex" :options="{ locale: 'th', useLocaleYear: true }" />
        </div>
        <div>
            <h3>Warp</h3>
            <FlatPickr v-model="datex" wrap :options="{ clickOpens: false }">
                <input type="text" data-input />
                <button class="input-button" title="toggle" data-toggle>
                    Open
                </button>

                <button class="input-button" title="clear" data-clear>
                    Clear
                </button>
            </FlatPickr>
        </div>
        <div>
            <h3>Disabled</h3>
            <FlatPickr v-model="datex" disabled />
        </div>
        <div style="margin-top: 10px;">
            {{ datex }}
        </div>
    </div>
</template>
<script lang="ts">
import FlatPickr from './component'
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