import { PropType, defineComponent, h, nextTick } from "vue";
import flatpickr from 'ns-flatpickr';
import { excludedEvents, includedEvents, eventMappings } from './events'
import { arrayify, nullify } from "./util";


// Keep a copy of all events for later use
const allEvents = [...includedEvents, ...excludedEvents];

// Passing these properties in `fp.set()` method will cause flatpickr to trigger some callbacks
const configCallbacks = ['locale', 'showMonths'] as (keyof flatpickr.Options.Options)[];

export default defineComponent({
    name: "Flatpickr",
    render() {
        if (this.options.wrap || this.wrap) {
            if (this.$slots.default && this.$slots.default?.().length == 1) {
                return this.$slots.default?.()[0]
            }

            if (!this.$slots.default || this.$slots.default?.().length == 0) {
                return h("div", {}, h('input', {
                    type: 'text',
                    'data-input': true,
                    disabled: this.disabled,
                    onInput: this.onInput,
                }))
            }

            return h("div", {}, this.$slots.default?.())
        } else {
            return h('input', {
                type: 'text',
                'data-input': true,
                disabled: this.disabled,
                onInput: this.onInput,
            });
        }
    },
    emits: [
        'blur',
        'update:modelValue',
        ...Object.values(eventMappings)
    ],
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
        wrap: {
            type: Boolean,
            default: false
        },
        mode: {
            type: String as PropType<"single" | "multiple" | "range" | "time">,
            default: "single"
        },
        events: {
            type: Array as PropType<flatpickr.Options.HookKey[]>,
            default: () => includedEvents
        },
    },
    data() {
        return {
            fp: null as flatpickr.Instance | null, //todo make it non-reactive
        }
    },
    methods: {
        prepareConfig(): flatpickr.Options.Options {
            // Don't mutate original object on parent component
            let safeConfig = { ...this.options };

            this.events.forEach((hook) => {
                // Respect global callbacks registered via setDefault() method
                let globalCallbacks = flatpickr.defaultConfig[hook] || [];

                // Inject our own method along with user's callbacks
                let localCallback: flatpickr.Options.Hook = (...args) => {
                    this.$emit(eventMappings[hook], ...args);
                };

                // Overwrite with merged array
                safeConfig[hook] = arrayify(safeConfig[hook] || []).concat(
                    globalCallbacks,
                    localCallback
                );
            });

            const onCloseCb = this.onClose.bind(this) as flatpickr.Options.Hook;
            const onChangeCb = this.onChange.bind(this) as flatpickr.Options.Hook;
            safeConfig['onClose'] = arrayify(safeConfig['onClose'] || []).concat(onCloseCb) as flatpickr.Options.Hook[]
            safeConfig['onChange'] = arrayify(safeConfig['onChange'] || []).concat(onChangeCb) as flatpickr.Options.Hook[]

            // Set initial date without emitting any event
            safeConfig.defaultDate = this.modelValue || safeConfig.defaultDate;
            if (this.wrap) safeConfig.wrap = this.wrap

            safeConfig.mode = this.mode

            return safeConfig;
        },
        /**
         * Get the HTML node where flatpickr to be attached
         * Bind on parent element if wrap is true
         */
        getElem(): HTMLInputElement {
            return this.$el;
            //return this.options.wrap ? (this.$el || this.$el.parentNode) : this.$el;
        },

        /**
         * Watch for value changed by date-picker itself and notify parent component
         */
        onInput(_event: InputEvent) {
            //const input = event.target as HTMLInputElement;
            // Let's wait for DOM to be updated
            nextTick().then(() => {
                //this.$emit('update:modelValue', nullify(input.value));
            });
        },

        onChange(selectedDates: Date[], _dateStr: string, _instance: flatpickr.Instance) {
            if (this.mode == "single" || this.mode == "time") {
                this.$emit('update:modelValue', selectedDates[0] || null);
            } else {
                this.$emit('update:modelValue', selectedDates);
            }

        },
        fpInput(): HTMLInputElement {
            return this.fp!.altInput || this.fp!.input;
        },

        /**
         * Blur event is required by many validation libraries
         */
        onBlur(event: Event): void {
            this.$emit('blur', nullify((event.target as HTMLInputElement).value));
        },

        /**
         * Flatpickr does not emit input event in some cases
         */
        onClose(_selectedDates: Date[], _dateStr: string) {
            //this.$emit('update:modelValue', selectedDates);
        },

        /**
         * Watch for the disabled property and sets the value to the real input.
         */
        watchDisabled(newState: boolean) {
            if (newState) {
                this.fpInput().setAttribute('disabled', '');
            } else {
                this.fpInput().removeAttribute('disabled');
            }
        }
    },
    watch: {
        /**
         * Watch for any config changes and redraw date-picker
         */
        options: {
            deep: true,
            handler(newConfig) {
                if (!this.fp) return;

                let safeConfig: flatpickr.Options.Options = { ...newConfig };
                // Workaround: Don't pass hooks to configs again otherwise
                // previously registered hooks will stop working
                // Notice: we are looping through all events
                // This also means that new callbacks can not be passed once component has been initialized
                allEvents.forEach((hook) => {
                    delete safeConfig[hook];
                });
                this.fp!.set(safeConfig);

                // Workaround: Allow to change locale dynamically
                configCallbacks.forEach((name) => {
                    if (typeof safeConfig[name] !== 'undefined') {
                        this.fp!.set(name as any, safeConfig[name]);
                    }
                });
            }
        },

        /**
         * Watch for changes from parent component and update DOM
         */
        modelValue(newValue: any) {
            // Prevent updates if v-model value is same as input's current value
            if (!this.$el || newValue === nullify(this.$el.value)) return;

            // Notify flatpickr instance that there is a change in value
            this.fp?.setDate(newValue, false);
        }
    },
    beforeUnmount() {
        /* istanbul ignore else */
        if (!this.fp) return;

        this.fpInput().removeEventListener('blur', this.onBlur);
        this.fp.destroy();
        this.fp = null;
    },
    mounted() {
        // Return early if flatpickr is already loaded
        /* istanbul ignore if */
        if (this.fp) return;

        console.log(this.$el)

        // Init flatpickr
        this.fp = flatpickr(this.getElem(), this.prepareConfig());

        // Attach blur event
        this.fpInput().addEventListener('blur', this.onBlur);


        // Immediate watch will fail before fp is set,
        // so we need to start watching after mount
        this.$watch('disabled', this.watchDisabled, {
            immediate: true
        });
    }
})