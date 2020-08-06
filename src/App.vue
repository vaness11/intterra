<template>
  <div id="app">
    <nav />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="less">
@import url("./assets/styles.less");
@import url("./assets/reset.css");

@header-height: 80px;

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  height: calc(100vh - @header-height);
}

nav {
  height: @header-height;
  background: #091c28;
}
</style>
