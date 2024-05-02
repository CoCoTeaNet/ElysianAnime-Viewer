<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  setup() {
    document.getElementById('loadingPage').remove()
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

body {
  height: 100%;
}
</style>
