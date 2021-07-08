<template>
  <!-- An Whole month -->
  <section class="calendar__body">
    <section v-if="calendar.mode === 'day'">
      <!-- weekdays -->
      <div class="calendar__weekdays">
        <div
          class="calendar__weekday"
          v-for="(weekday, weekdayIndex) in weekdays.en"
          :key="weekdayIndex"
        >
          {{ weekday.slice(0, 2) }}
        </div>
      </div>

      <!-- days -->

      <button
        v-for="(day, dayIndex) in 42"
        :key="dayIndex"
        :data-date="getEachDate(dayIndex)"
        :class="[
          'calendar__day',
          {
            calendar__today: checkIsToday(getEachDate(dayIndex)),
            'calendar__this-month': checkDayIsInMonth(getEachDate(dayIndex)),
            'calendar__day--selected': checkIsSelected(getEachDate(dayIndex)),
          },
        ]"
        @click="onSelect(dayIndex)"
      >
        {{ getEachDate(dayIndex).getDate() }}
      </button>
    </section>

    <!-- 月份檢視 -->
    <section class="calendar__months" v-if="calendar.mode === 'month'">
      <span
        v-for="(month, monthIndex) in months.en"
        :key="monthIndex"
        :class="[
          'calendar__month',
          {
            'calendar__month--selected': checkIsThisMonth(monthIndex),
          },
        ]"
      >
        <button @click="$emit('update:setCalendarMonth', monthIndex)">
          {{ month.slice(0, 3) }}
        </button>
      </span>
    </section>

    <!-- 年份檢視 -->
    <section class="calendar__years" v-if="calendar.mode === 'year'">
      <span
        v-for="(year, yearIndex) in 12"
        :key="yearIndex"
        :class="[
          'calendar__year',
          {
            'calendar__year--selected': checkIsThisYear(yearIndex),
          },
        ]"
      >
        <button @click="$emit('update:setCalendarYear', calendarFirstYear + yearIndex)">
          {{ calendarFirstYear + yearIndex }}
        </button>
      </span>
    </section>
  </section>
</template>

<script>
import { calendar } from '@/config/calendar';

export default {
  name: 'CalendarBody',
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
    selectedDate: {
      type: Object,
      default: () => ({}),
      required: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    // 一週七天
    weekdays() {
      return calendar.weekdays;
    },
    // 十二個月
    months() {
      return calendar.months;
    },
    // 一個月的第一天是星期幾，day 起始是 0 星期日
    monthFirstDay() {
      return new Date(this.calendar.year, this.calendar.month, 1).getDay();
    },

    // 推算日曆第一格
    calendarFirstDay() {
      const date = new Date(this.calendar.year, this.calendar.month, 1 - this.monthFirstDay);
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay(),
      };
    },

    // 計算應該是幾天
    calendarDays() {
      const monthDays = [];

      for (let date = 0; date < 42; date++) {
        const everyday = new Date(
          this.calendarFirstDay.year,
          this.calendarFirstDay.month,
          this.calendarFirstDay.date + date
        );
        monthDays.push(everyday);
      }

      return monthDays;
    },

    calendarFirstYear() {
      return Math.floor(this.calendar.year / 10) * 10 - 1;
    },
  },
  methods: {
    // 取得該日期的 date 物件
    getEachDate(dateIndex) {
      return this.calendarDays[dateIndex];
    },
    // 確認是否為當日的日期
    checkIsToday(date) {
      return (
        date.getFullYear() === this.today.year &&
        date.getMonth() === this.today.month &&
        date.getDate() === this.today.date
      );
    },
    // 確認是否為當月的日期
    checkDayIsInMonth(date) {
      return date.getMonth() === this.calendar.month && date.getFullYear() === this.calendar.year;
    },
    // 確認月份相同
    checkIsThisMonth(monthIndex) {
      return (
        monthIndex === this.selectedDate.month && this.calendar.year === this.selectedDate.year
      );
    },
    // 確認年份相同
    checkIsThisYear(yearIndex) {
      return this.calendarFirstYear + yearIndex === this.selectedDate.year;
    },
    // 確認已選的日期
    checkIsSelected(date) {
      return (
        date.getFullYear() === this.selectedDate.year &&
        date.getMonth() === this.selectedDate.month &&
        date.getDate() === this.selectedDate.date
      );
    },
    /**
     * 選擇日期
     * @param week 是週的順序，起始值是 1，最大是 6
     * @param day 是日的順序，起始值是 1，最大是 7
     */
    onSelect(dayIndex) {
      this.$emit('update:onSelect', {
        date: this.getEachDate(dayIndex),
        isInMonth: this.checkDayIsInMonth(this.getEachDate(dayIndex)),
      });
    },
  },
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
    margin-bottom: 10px;
  }

  &__day {
    display: inline-block;
    font-size: 0.875rem;
    width: calc(100% / 7);
    height: 35px;
    border: 0;
    border-radius: 50%;
    padding: 0;
    border: 0;

    // 非當月日期顏色
    color: #cccccc;
  }

  &__this-month {
    // 當月日期基底顏色
    color: #000000;
  }

  &__today {
    // 日期當日顏色
    color: #db3d44;
  }

  // 月份、年份模式
  &__months,
  &__years {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
  }

  &__month,
  &__year {
    width: 25%;
    margin-bottom: 10px;

    > button {
      width: 50px;
      height: 50px;
      border: 0;
      border-radius: 50%;
      font-weight: 600;
      font-size: 0.875rem;
    }
  }

  &__year {
    &:first-child,
    &:last-child {
      button {
        color: #cccccc;
      }
    }
  }

  .calendar__day--selected,
  .calendar__month--selected > button,
  .calendar__year--selected > button {
    // 選中日期後覆蓋的樣式
    background-color: #db3d44;
    color: #ffffff;

    &:hover {
      background-color: #db3d44;
      color: #ffffff;
    }
  }
}
</style>
