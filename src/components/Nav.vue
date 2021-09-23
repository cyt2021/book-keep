<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
       <Icons class="icon" name="money"/>
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icons class="icon" name="labels"/>
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icons class="icon" name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
import Icons from "@/components/Icons.vue";


export default {
name: "Nav",
  components: {Icons}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav{
  @extend %outerShadow;
  display:flex;
  flex-direction: row;
  font-size: 11px;
  > .item{
    padding: 2px 0;
    width: 33.33333%;
    display:flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    .icon{
      width: 32px;
      height:32px
    }
  }
  > .item.selected{
    color:$color-highlight;
  }
}
</style>
