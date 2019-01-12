<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
html,
body,
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 100%;
  width: 100%;
  margin: 0;
}
#app > * {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>
