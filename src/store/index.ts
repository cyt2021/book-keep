import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";
import created from "@/lib/created";

Vue.use(Vuex)

const store= new Vuex.Store({
  state: {recordList:[] as RecordItem[],
    tagList: [] as Tag[],
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
    },
    createRecord(state, record) {
      const record2 = clone(record);
      record2.createdAt = new Date();
      state.recordList.push(record2);
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    fetchTag(state) {
      return state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
    },
    createTag(state,name: string){
      const names = state.tagList.map(item => item.name);
      const id = created().toString()
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了')
        return 'duplicated'
      }
      state.tagList.push({id: id, name: name})
      store.commit('saveTags')
      window.alert('添加成功')
      return 'success'
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
  }
})
export default store
