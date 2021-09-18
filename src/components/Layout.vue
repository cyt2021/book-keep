<template>
  <div class="nav-">
    <div class="content">
      <slot/>
    </div>

    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
name: "Layout"
}
</script>

<style lang="scss" scoped>
.nav-{
  border:1px solid green;
  display:flex;
  flex-direction:column;
  height:100vh
}
.content{
  flex-grow:1;
  overflow: auto;
  border:1px solid yellowgreen;
}
</style>