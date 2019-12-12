<template>
  <section class="calendar">
    <button class="show-today-button" @click="setToday">顯示今日</button>
    <CalendarNav
      :today="newDate"
      :calendar="calendar"
      :mode="mode"
      @update:adjustMonth="adjustMonth($event)"
      @update:adjustYear="adjustYear($event)"
      @update:onChangeMode="onChangeMode($event)"
    />
    <CalendarBody
      :today="newDate"
      :calendar="calendar"
      :mode="mode"
      :selectedDate="selectedDate"
      @update:onSelect="onSelect($event)"
      @update:setCalendarMonth="setCalendarMonth($event)"
      @update:setCalendarYear="setCalendarYear($event)"
    />
  </section>
</template>

<script>
import CalendarNav from '@/components/calendar/CalendarNav';
import CalendarBody from '@/components/calendar/CalendarBody';

export default {
  name: 'CalendarWidget',
  props: {
    date: {
      Type: [Object, String],
      default: () => {
        return {
          year: 2019,
          month: 11,
          date: 25,
          day: 3,
        };
      },
      required: true,
    },
  },
  data() {
    return {
      calendar: {
        year: 2019,
        month: 11,
        date: 25,
        day: 3,
      },
      selectedDate: {},
      mode: 'day',
    };
  },
  computed: {
    newDate() {
      return typeof this.date === Object
        ? this.date
        : {
          year: this.date.split('-')[0],
          month: this.date.split('-')[1],
          date: this.date.split('-')[2],
          day: new Date(this.date),
        };
    },
  },
  mounted() {
    this.setToday();
  },
  methods: {
    /**
     * 設置當前年月日
     */
    setToday() {
      const todayDate = new Date();
      this.newDate.year = this.calendar.year = todayDate.getFullYear();
      this.newDate.month = this.calendar.month = todayDate.getMonth();
      this.newDate.date = this.calendar.date = todayDate.getDate();
      this.newDate.day = this.calendar.day = todayDate.getDay();
      this.selectedDate = this.newDate;
      this.mode = 'day';
    },

    /**
     * 切換西元年
     * @param yearNum 上一年、下一年
     */
    adjustYear({ yearNum }) {
      this.calendar.year += yearNum;
    },

    /**
     * 切換月份
     * @param monthNum 上個月、下個月
     */
    adjustMonth({ monthNum }) {
      const monthResult = (this.calendar.month += monthNum);

      if (monthResult > 11) {
        // 大於 12 月時
        this.calendar.month = 0;
        this.adjustYear({ yearNum: 1 });
      } else if (monthResult < 0) {
        // 小於 1 月時
        this.calendar.month = 11;
        this.adjustYear({ yearNum: -1 });
      } else {
        // 合理範圍內
        this.calendar.month = monthResult;
      }
    },

    /**
     * 選擇日期
     * @param date 由子層傳上來的日期物件
     */
    onSelect({ date, isInMonth }) {
      const selectedDate = {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay(),
      };

      if (!isInMonth) {
        this.calendar = selectedDate;
      }

      this.selectedDate = selectedDate;
    },

    /**
     * 切換檢視模式
     * @param mode 日 day、月 month、年 year 三種模式
     */
    onChangeMode(mode) {
      switch (this.mode) {
      case 'day':
        this.mode = 'month';
        break;

      case 'month':
        this.mode = 'year';
        break;

      default:
        break;
      }
    },

    /**
     * 設定月份
     * @param monthIndex 第幾個月
     */
    setCalendarMonth(monthIndex) {
      this.calendar.month = monthIndex;
      this.mode = 'day';
    },
    /**
     * 設定年份
     * @param year 經子層傳上來的年份
     */
    setCalendarYear(year) {
      this.calendar.year = year;
      this.mode = 'month';
    },
  },
  components: {
    CalendarNav,
    CalendarBody,
  },
};
</script>

<style lang="scss" scoped>
  .calendar {
    position: relative;
    width: 300px;
    margin: auto;
    border: 1px solid #cccccc;
    padding: 35px 10px;
    border-radius: 3px;
    text-align: center;
    background-color: #ffffff;

    /deep/ button {
      cursor: pointer;
      background-color: transparent;

      &:hover {
        background-color: #eeeeee;
      }

      &:active {
        &::before,
        &::after {
          background-color: #000000;
        }
      }

      &:focus {
        border: 1px dashed #db3d4450;
        outline: 0;
      }
    }

    .show-today-button {
      position: absolute;
      right: 20px;
      top: 10px;
    }
  }
</style>
