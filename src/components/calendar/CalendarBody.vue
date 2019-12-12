<template>
  <!-- An Whole month -->
  <section class="calendar__body">
    <!-- weekdays -->
    <div class="calendar__weekdays">
      <div
        class="calendar__weekday"
        v-for="(weekday, weekdayIndex) in weekdays.en"
        :key="weekdayIndex"
        v-html="weekday.slice(0, 2)"
      />
    </div>

    <!-- days -->
    <div></div>
  </section>
</template>

<script>
export default {
  name: 'CalendarBody',
  props: {},
  data() {
    return {
      weekdays: {
        en: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
      },
    };
  },
  computed: {},
  methods: {},
  components: {},
};
</script>

<style lang="scss" scoped>
  .calendar {
    &__body {
    }

    &__weekdays {
      display: flex;
      justify-content: space-around;
      align-content: center;
    }

    &__weekday {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 25px;
      font-weight: 600;
    }
  }
</style>
