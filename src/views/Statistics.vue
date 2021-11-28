<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div class="chart-wrapper" ref="chartWrapper">
      <e-charts class="chart" :option="echartsOption"/>
    </div>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}
          <span>￥{{ group.total }}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>


<script lang="ts">
import Layout from "@/components/Layout.vue";
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import _ from "lodash";

import ECharts from 'vue-echarts'
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {GridComponent} from 'echarts/components';
import {LineChart} from 'echarts/charts';
import {TooltipComponent} from 'echarts/components';


use([
  CanvasRenderer,
  LineChart,
  TooltipComponent,
  GridComponent
]);


@Component({
  components: {ECharts, Tabs, Layout}
})
export default class statistics extends Vue {


  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join(',')
  }

  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement)
    div.scrollLeft = div.scrollWidth
  }

  beautify(string: string) {
    const now = dayjs();
    const day = dayjs(string)
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天'
    } else if (day.isSame(now, 'year')) {
      return day.format('MM月DD日')
    } else {
      return day.format('YYYY年MM月DD日')
    }

  }
get y(){
  const today = new Date();
  const array = [];
  for (let i = 0; i <= 29; i++) {
    const dateString = dayjs(today)
        .subtract(i, 'day').format('YYYY-MM-DD');
    const found = _.find(this.groupedList, {title: dateString});
    array.push({
      date: dateString, value: found ? found.total : 0
    })
  }
  array.sort((a,b)=>{
    if(a.date>b.date){
      return 1
    }else if(a.date<b.date){
      return -1}
    else {
      return 0}
  })
  return array
}

  get echartsOption() {


    const keys = this.y.map(r => r.date);
    const values = this.y.map(r => r.value);

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{c}',
        triggerOn: 'click',
        position: 'top',
        axisPointer: {type: 'shadow'}
      },
      grid: {
        left: '0',
        right: '0'
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#666'}},
        axisLabel:{formatter: function (value:string, index:number) {
            return value.substr(5);
          }}
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [
        {
          symbolSize: 10,
          symbol: 'circle',
          data: values,
          type: 'line',
          lineStyle: {color: '#666'},
          itemStyle: {color: '#666'},

        }

      ]
    }
  }


  get recordList() {
    return (this.$store.state as RootState).recordList
  }

  get groupedList() {
    const {recordList} = this;
    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current)
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group =>
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0)
    )


    return result
  }

  beforeCreate() {
    this.$store.commit('fetchRecords')
  }

  type = '-'
  recordTypeList = recordTypeList
}
</script>

<style scoped lang="scss">

.chart {
  height: 400px;
  width: 430%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

::v-deep .type-tabs-item {
  background: #c4c4c4;

  &.selected {
    background: white;

    &::after {
      display: none;
    }
  }
}

//::v-deep .interval-tabs-item{
//  height: 48px;
//}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item
}

.record {
  background: white;
  @extend %item
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

.noResult {
  padding: 16px;
  text-align: center;
}
</style>
