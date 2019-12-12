<template>
  <section class="datapicker">
    <DatePickerInput
      :selectedDateFormat="selectedDateFormat"
      @update:toggleCalendar="toggleCalendar"
    >
      <template #popup>
        <div class="datapicker__close-layer" @click="toggleCalendar" v-show="isShowCalendar"></div>
        <CalendarWidget date="2019-12-01" @onSelect="onSelect($event)" v-show="isShowCalendar" />
      </template>
    </DatePickerInput>
  </section>
</template>

<script>
import DatePickerInput from '@/components/DatePickerInput';
import CalendarWidget from '@/components/CalendarWidget';
export default {
  name: 'TheDatePicker',
  data() {
    return {
      selectedDate: {},
      isShowCalendar: false,
    };
  },
  computed: {
    selectedDateFormat() {
      return Object.keys(this.selectedDate).length
        ? `${this.selectedDate.year}-${this.selectedDate.month + 1}-${
          this.selectedDate.date
        }`
        : '';
    },
  },
  created() {},
  mounted() {},
  methods: {
    toggleCalendar() {
      this.isShowCalendar = !this.isShowCalendar;
    },
    onSelect({ selectedDate, isShowCalendar }) {
      this.selectedDate = selectedDate;
      this.isShowCalendar = isShowCalendar;
    },
  },
  components: {
    DatePickerInput,
    CalendarWidget,
  },
};
</script>

<style lang="scss" scoped>
  .datapicker {
    position: relative;

    &__close-layer {
      width: 100%;
      height: 100vh;
      background-color: transparent;
      position: fixed;
      top: 0;
      left: 0;
    }
  }
</style>
