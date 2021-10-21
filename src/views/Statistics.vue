<template>
<Layout>
  <Tabs class-prefix="type" :data-source="typelList" :value.sync="type"/>
  <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
</Layout>
</template>

<style scoped lang ="scss">
::v-deep .type-tabs-item{
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after{
      display: none;
    }
  }
}



</style>

<script lang="ts">

import Layout from "@/components/Layout.vue";
import Types from "@/components/Money/Types.vue";
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
@Component({
  components: {Tabs, Types, Layout}
})
export default class statistics extends Vue{
  type='-'
  interval='day'
  intervalList=[{text:'按天',value:'day'},
    {text:'按周',value:'week'},
    {text:'按月',value:'month'}
  ]
  typelList=[{text:'收入',value:'+'},
 {text:'支出',value:'-'}
]
}
</script>

