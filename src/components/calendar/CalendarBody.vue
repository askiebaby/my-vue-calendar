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
    <div class="calendar__week" v-for="(week, weekIndex) in 6" :key="weekIndex">
      <button
        v-for="(day, dayIndex) in 7"
        :key="dayIndex"
        :data-date="getEachDate(week, day)"
        :class="[
          'calendar__day',
        {
          'calendar__today': checkIsToday(getEachDate(week, day)),
          'calendar__this-month': checkDayIsInMonth(getEachDate(week, day)),
          'calendar__day--selected': checkIsSelected(getEachDate(week, day)),
        }]"
        @click="onSelect(week, day)"
        v-html="getEachDate(week, day).getDate()"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'CalendarBody',
  props: {
    today: {
      type: Object,
      default: () => {},
      required: true,
    },
    calendar: {
      type: Object,
      default: () => {},
      required: true,
    },
    selectedDate: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
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
  computed: {
    // 一個月的第一天是星期幾，day 起始是 0 星期日
    monthFirstDay() {
      return new Date(this.calendar.year, this.calendar.month, 1).getDay();
    },

    // 推算日曆第一格
    calendarFirstDay() {
      const date = new Date(
        this.calendar.year,
        this.calendar.month,
        1 - this.monthFirstDay
      );
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
      let calendar;

      for (let date = 0; date < 42; date++) {
        calendar = new Date(
          this.calendarFirstDay.year,
          this.calendarFirstDay.month,
          this.calendarFirstDay.date + date
        );
        monthDays.push(calendar);
      }

      return monthDays;
    },
  },
  methods: {
    // 取得該日期的 date 物件
    getEachDate(week, day) {
      return this.calendarDays[this.getDayIndex(week, day)];
    },
    // 取得每個日期在日曆中排第幾個
    getDayIndex(week, day) {
      return (week - 1) * 7 + (day - 1);
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
      return this.checkIsThisYear(date) && this.checkIsThisMonth(date);
    },
    // 確認月份相同
    checkIsThisMonth(date) {
      return date.getMonth() === this.calendar.month;
    },
    // 確認年份相同
    checkIsThisYear(date) {
      return date.getFullYear() === this.calendar.year;
    },
    // 確認已選的日期
    checkIsSelected(date) {
      return (
        date.getFullYear() === this.selectedDate.year &&
        date.getMonth() === this.selectedDate.month &&
        date.getDate() === this.selectedDate.date
      );
    },
    /*
     * 選擇日期
     */
    onSelect(week, day) {
      this.$emit('update:onSelect', {
        date: this.getEachDate(week, day),
        isInMonth: this.checkDayIsInMonth(this.getEachDate(week, day)),
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

    &__week {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    &__week + &__week {
      margin-top: 6px;
    }

    &__day {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.875rem;
      width: 35px;
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

    .calendar__day--selected {
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
