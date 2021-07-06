<template>
  <nav class="calendar__nav">
    <!-- 控制區塊：上一月 -->
    <div class="calendar__nav__month-controller">
      <button class="calendar__nav__prev" @click="prevTime"></button>
    </div>

    <!-- 顯示目前年月，或是選擇後的年月 -->
    <button
      class="calendar__nav__month-year"
      v-html="thisYearAndMonthDisplay"
      @click="$emit('update:onChangeMode', mode)"
    />

    <!-- 控制區塊：下一月 -->
    <div class="calendar__nav__month-controller">
      <button class="calendar__nav__next" @click="nextTime"></button>
    </div>
  </nav>
</template>

<script>
import { calendar } from '@/config/calendar';

export default {
  name: 'CalendarNav',
  props: {
    today: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    calendar: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    mode: {
      type: String,
      default: 'day',
    },
  },
  data() {
    return {};
  },
  computed: {
    weekdays() {
      return calendar.weekdays;
    },
    months() {
      return calendar.months;
    },
    thisYearAndMonthDisplay() {
      let display;
      switch (this.mode) {
      case 'day':
        display = `${this.months.en[this.calendar.month].slice(0, 3)} ${
          this.calendar.year
        }`;
        break;

      case 'month':
        display = this.calendar.year;
        break;

      case 'year':
        display = `${this.calendar.year - 9} - ${this.calendar.year}`;
        break;
      }

      return display;
    },
  },
  methods: {
    prevTime() {
      switch (this.mode) {
        case 'day':
          this.$emit('update:adjustMonth', -1);
          break;

        case 'month':
          this.$emit('update:adjustYear', -1);
          break;

        case 'year':
          this.$emit('update:adjustYear', -10);
          break;
      }
    },

    nextTime() {
      switch (this.mode) {
        case 'day':
          this.$emit('update:adjustMonth', 1);
          break;

        case 'month':
          this.$emit('update:adjustYear', 1);
          break;

        case 'year':
          this.$emit('update:adjustYear', 10);
          break;
      }
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
  // arrow settings
  $arrow-top: 16px;
  $arrow-bottom: 22px;
  $arrow-margin-with-content: 16px;

  .calendar__nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5px;

    &__month-year {
      flex-basis: 70%;
      font-size: 1rem;
      font-weight: 600;
      padding: 8px 0px;
      border: 0;
      border-radius: 3px;
    }

    &__month-controller {
      > button {
        display: block;
        position: relative;
        border: 1px solid #ffffff;
        border-radius: 50%;
        padding: 0;
        width: 40px;
        height: 40px;
      }
    }

    &__prev,
    &__next {
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 2px;
        background-color: #666666;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }

    &__prev {
      &::before,
      &::after {
        right: $arrow-margin-with-content;
      }

      &::before {
        top: $arrow-bottom;
      }

      &::after {
        top: $arrow-top;
      }
    }
    &__next {
      &::before,
      &::after {
        left: $arrow-margin-with-content;
      }

      &::before {
        top: $arrow-top;
      }
      &::after {
        top: $arrow-bottom;
      }
    }
  }
</style>
