<template>
  <section class="calendar">
    <button class="show-today-button" @click="setToday">顯示今日</button>
    <CalendarNav
      :today="today"
      :calendar="calendar"
      :mode="calendar.mode"
      @update:adjustMonth="adjustMonth($event)"
      @update:adjustYear="adjustYear($event)"
      @update:onChangeMode="onChangeMode($event)"
    />
    <CalendarBody
      :today="today"
      :calendar="calendar"
      :mode="calendar.mode"
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
      Type: String,
      default: '',
    },
  },
  data() {
    return {
      today: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
      },
      calendar: {
        mode: 'day',
        year: 2019,
        month: 11,
      },
      selectedDate: {},
    };
  },
  computed: {},
  mounted() {
    if (typeof this.date === 'string' && this.date) {
      this.setDay(this.date);
    } else {
      // 初始化
      this.setToday();
    }
  },
  methods: {
    setDay(selectedDate) {
      const [yyyy, mm, dd] = selectedDate.split('-');
      const year = Number(yyyy);
      const month = Number(mm - 1);
      const date = Number(dd);

      this.selectedDate = {
        year,
        month,
        date,
      };

      this.calendar = {
        ...this.calendar,
        year,
        month,
      };
    },
    /**
     * 設置當前年月日
     */
    setToday() {
      const date = new Date();
      const todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      this.calendar.mode = 'day';
      this.setDay(todayDate);
      this.$emit('onSelect', {
        selectedDate: this.selectedDate,
      });
    },

    /**
     * 切換西元年
     * @param yearNum 上一年、下一年
     */
    adjustYear(yearNum) {
      const date = new Date(`${this.calendar.year}-${this.calendar.month + 1}`);

      date.setFullYear(date.getFullYear() + yearNum);
      this.calendar.year = date.getFullYear();
    },

    /**
     * 切換月份
     * @param monthNum 上個月、下個月
     */
    adjustMonth(monthNum) {
      const date = new Date(`${this.calendar.year}-${this.calendar.month + 1}`);

      date.setMonth(date.getMonth() + monthNum);
      this.calendar.month = date.getMonth();
      this.calendar.year = date.getFullYear();
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
      };

      if (!isInMonth) {
        this.calendar = selectedDate;
      }

      this.selectedDate = selectedDate;

      this.$emit('onSelect', {
        selectedDate: this.selectedDate,
      });
    },

    /**
     * 切換檢視模式
     * @param mode 日 day、月 month、年 year 三種模式
     */
    onChangeMode(mode) {
      switch (mode) {
        case 'day':
          this.calendar.mode = 'month';
          break;

        case 'month':
          this.calendar.mode = 'year';
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
      this.calendar.mode = 'day';
    },
    /**
     * 設定年份
     * @param year 經子層傳上來的年份
     */
    setCalendarYear(year) {
      this.calendar.year = year;
      this.calendar.mode = 'month';
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
    width: 280px;
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
