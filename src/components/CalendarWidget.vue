<template>
  <section class="calendar">
    <CalendarNav :today="today" />
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
    setToday() {
      const todayDate = new Date();
      this.today.year = todayDate.getFullYear();
      this.today.month = todayDate.getMonth();
      this.today.date = todayDate.getDate();
      this.today.day = todayDate.getDay();
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
