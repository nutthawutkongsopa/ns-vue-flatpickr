<template>
    <!-- <input v-if="!hasSlot" type="text" data-input> -->
    <slot></slot>
</template>
<script lang="ts">
import { PropType } from "vue";
import flatpickr from 'ns-flatpickr';
import { excludedEvents, includedEvents } from './events'

const emitMappings = {
    'onChange': "change",
    'onClose': "close",
    'onDestroy': "destroy",
    'onMonthChange': "monthChange",
    'onOpen': "open",
    'onYearChange': "yearChange",
}
export default {
    name: "Flatpickr",
    emits: [],
    props: {
        options: {
            type: Object as PropType<flatpickr.Options.Options>,
            default: () => ({
                defaultDate: null,
                wrap: false,
            })
        },
        modelValue: {
            type: [String, Number, Date, Array, null] as PropType<flatpickr.Options.DateOption | flatpickr.Options.DateOption[] | null>,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        hasSlot(): boolean {
            return !!this.$slots['default'] && this.$slots['default'].length > 0
        }
    },
    methods: {
        onInput() {

        }
    },
    mounted() {
        console.log(this.$slots.default?.())
        const slotContent = this.$slots.default?.()[0];
        if (slotContent) {
            const slotElement = slotContent.el as HTMLElement;
            console.log('Slot element:', slotElement);
        }
    }

}
</script>
