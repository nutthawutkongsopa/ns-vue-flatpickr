// Events to emit, copied from flatpickr source
import flatpickr from 'ns-flatpickr';

const includedEvents = [
    'onChange',
    'onClose',
    'onDestroy',
    'onMonthChange',
    'onOpen',
    'onYearChange',
] as flatpickr.Options.HookKey[];

// Let's not emit these events by default
const excludedEvents = [
    'onValueUpdate',
    'onDayCreate',
    'onParseConfig',
    'onReady',
    'onPreCalendarPosition',
    'onKeyDown',
] as flatpickr.Options.HookKey[];

const eventMappings = {
    'onChange': "change",
    'onClose': "close",
    'onDestroy': "destroy",
    'onMonthChange': "monthChange",
    'onOpen': "open",
    'onYearChange': "yearChange",
    'onValueUpdate': "valueUpdate",
    'onDayCreate': "dayCreate",
    'onParseConfig': "parseConfig",
    'onReady': "ready",
    'onPreCalendarPosition': "preCalendarPosition",
    'onKeyDown': "keyDown"
}

export { includedEvents, excludedEvents, eventMappings }