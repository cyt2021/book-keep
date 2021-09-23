<template>
  <div id="app">
    <router-view/>
  <hr/>

  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body{
line-height: 1.5;
  font-family:$font-hei;
  font-size:16px;
}

#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #333;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
