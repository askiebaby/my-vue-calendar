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
  props: {
    today: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
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
