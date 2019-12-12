<template>
  <div id="app" v-cloak>
    <div id="nav">
      <router-link :to="{ name: 'calendar' }">Task 1: Calendar</router-link>
      <router-link :to="{ name: 'datePicker' }">Task 2: Date Picker</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
  [v-cloak] {
    display: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #db3d44;
      }
    }

    a + a {
      border-left: 2px solid #cccccc;
      margin-left: 15px;
      padding-left: 15px;
    }
  }
</style>
