import { PropType, defineComponent, h } from "vue";
import flatpickr from 'ns-flatpickr';
import {excludedEvents, includedEvents} from './events'

const emitMappings = {
    'onChange': "change",
    'onClose': "close",
    'onDestroy': "destroy",
    'onMonthChange': "monthChange",
    'onOpen': "open",
    'onYearChange': "yearChange",
}

export default defineComponent({
    name: "Flatpickr",
    render(){
        return h("slot")
    },
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
        const xx = this.$slots['default']
    }
})