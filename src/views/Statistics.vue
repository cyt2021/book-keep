<template>
<Layout>
  <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
  <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" height="48"/>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3 >{{group.title}}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id">
              {{item.amount}}{{item.createdAt}}
            </li>
          </ol>
        </li>
      </ol>
</Layout>
</template>



<script lang="ts">
import Layout from "@/components/Layout.vue";
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import intervalList from "@/constants/intervalList";
@Component({
  components: {Tabs, Layout}
})
export default class statistics extends Vue{
  get recordList(){
    return (this.$store.state as RootState).recordList
  }
  get result(){
    const {recordList} =this;
    type HashTableValue ={title:string,items:RecordList[]}
    const hashTable:{[key:string]:HashTableValue}={};
    for (let i=0;i<recordList.length;i++){
      const [date,time] =recordList[i].createdAt!.split('T');
      hashTable[date] =hashTable[date]||{title:date,items:[]};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable
  }
  beforeCreate(){
    this.$store.commit('fetchRecords')
  }
  type='-'
  interval='day'
  intervalList=intervalList
  recordTypeList=recordTypeList
}
</script>

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
//::v-deep .interval-tabs-item{
//  height: 48px;
//}



</style>
