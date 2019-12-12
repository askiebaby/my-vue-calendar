<template>
  <section>
    <input
      type="text"
      class="datapicker__input"
      placeholder="請選擇日期"
      readonly
      :value="selectedDateFormat ? selectedDateFormat : ''"
      @click="$emit('update:toggleCalendar')"
    />
    <slot name="popup"></slot>
  </section>
</template>

<script>
export default {
  name: 'DatePickerInput',
  props: {
    selectedDateFormat: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
};
</script>

<style lang="scss" scoped>
  .datapicker {
    &__input {
      padding: 10px 18px;
      width: 280px;
      margin-bottom: 10px;
      border-radius: 2px;
      border: 1px solid #cccccc;
      font-size: 1rem;
    }
  }
</style>
