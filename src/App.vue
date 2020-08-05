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

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  height: calc(100vh - 80px);
}

nav {
  height: 80px;
  background: #091c28;
}
</style>
