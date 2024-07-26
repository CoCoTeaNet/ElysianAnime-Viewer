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

html, body {
  height: 100%;
}

::-webkit-scrollbar {
  width: 8px; /* 纵向滚动条*/
  height: 5px; /* 横向滚动条 */
  background-color: #fff;
}

/*定义滚动条轨道 内阴影*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: #FAFCFF;
}

/*定义滑块 内阴影*/
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: #CDD0D6;
  border-radius: 16px;
}
</style>
