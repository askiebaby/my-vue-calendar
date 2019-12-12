<template>
  <section class="calendar">
    <CalendarNav :today="today" @update:adjustMonth="adjustMonth($event)" />
    <CalendarBody />
  </section>
</template>

<script>
import CalendarNav from '@/components/calendar/CalendarNav';
import CalendarBody from '@/components/calendar/CalendarBody';

export default {
  name: 'CalendarWidget',
  props: {},
  data() {
    return {
      today: {
        year: 2019,
        month: 11,
        date: 25,
        day: 3,
      },
    };
  },
  computed: {},
  mounted() {
    this.setToday();
  },
  methods: {
    /**
     * 設置當前年月日
     */
    setToday() {
      const todayDate = new Date();
      this.today.year = todayDate.getFullYear();
      this.today.month = todayDate.getMonth();
      this.today.date = todayDate.getDate();
      this.today.day = todayDate.getDay();
    },

    /**
     * 切換西元年
     * @param yearNum 上一年、下一年
     */
    adjustYear(yearNum) {
      this.today.year += yearNum;
    },

    /**
     * 切換月份
     * @param monthNum 上個月、下個月
     */
    adjustMonth({ monthNum }) {
      const monthResult = (this.today.month += monthNum);

      if (monthResult > 11) {
        // 大於 12 月時
        this.today.month = 0;
        this.adjustYear(1);
      } else if (monthResult < 0) {
        // 小於 1 月時
        this.today.month = 11;
        this.adjustYear(-1);
      } else {
        // 合理範圍內
        this.today.month = monthResult;
      }
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
    border: 1px solid #efefef;
    padding: 10px;
    border-radius: 5px;
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
  }
</style>
