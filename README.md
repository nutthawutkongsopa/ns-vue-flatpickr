# ns-vue-flatpickr

A Vue component wrapper for the [NS Flatpickr](https://www.npmjs.com/package/ns-flatpickr) date picker library. NS Flatpickr is a modified version of Flatpickr that allows for the usage of localized year values, such as the Buddhist year.

## Installation

```bash
npm install ns-vue-flatpickr
```

## Usage

```vue
<template>
  <div>
    <Flatpickr v-model="selectedDate" :options="flatpickrOptions"></Flatpickr>
  </div>
</template>

<script>
   import { defineComponent } from 'vue';
   import { Flatpickr } from 'ns-vue-flatpickr';

   export default defineComponent({
   components: {
      Flatpickr,
   },
   data() {
      return {
         selectedDate: null,
         flatpickrOptions: {
         // Configure Flatpickr options here
         },
      };
   },
   });
</script>
```
#### Wrap custom input
```vue
<Flatpickr v-model="selectedDate" wrap :options="{ clickOpens: false }">
   <input type="text" data-input />
   <button class="input-button" title="toggle" data-toggle>
      Open
   </button>
   <button class="input-button" title="clear" data-clear>
      Clear
   </button>
</Flatpickr>
```

## Props

| Prop           | Type     | Description                                         |
| -------------- | -------- | --------------------------------------------------- |
| `options`      | Object   | Configuration options for Flatpickr.                |
| `modelValue`   | Any      | The selected date(s) value.                         |
| `disabled`     | Boolean  | Determines if the date picker is disabled.           |
| `wrap`         | Boolean  | Specifies whether to wrap the date picker.           |
| `events`       | Array    | List of Flatpickr event hooks to bind to.           |

## Events

| Event          | Description                                         |
| -------------- | --------------------------------------------------- |
| `input`        | Triggered when the selected date(s) change.         |
| `change`       | Triggered when the selected date(s) change.         |
| `blur`         | Triggered when the date picker loses focus.         |
| `close`        | Triggered when the date picker closes.              |

For more details on the available options and events, please refer to the [Flatpickr documentation](https://flatpickr.js.org/).

## License

This library is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
