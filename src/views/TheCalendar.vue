<template>
  <section>
    <CalendarWidget :today="today" />
  </section>
</template>

<script>
import CalendarWidget from '@/components/CalendarWidget';

export default {
  name: 'TheCalendar',
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
  created() {},
  mounted() {
    const todayDate = new Date();
    this.today.year = todayDate.getFullYear();
    this.today.month = todayDate.getMonth();
    this.today.date = todayDate.getDate();
    this.today.day = todayDate.getDay();
  },
  methods: {},
  components: {
    CalendarWidget,
  },
};
</script>

<style lang="scss" scoped>
</style>
