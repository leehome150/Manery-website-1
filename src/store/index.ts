import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/idCreator";
import router from "@/router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    setCurrentTag: function(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const recode2 = clone(record);
      recode2.createAt = new Date().toISOString();
      state.recordList.push(recode2);
      store.commit("saveRecords");
    },

    saveRecords(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      if (!state.tagList || state.tagList.length === 0) {
        store.commit("createTag", "衣服");
        store.commit("createTag", "餐饮");
        store.commit("createTag", "住房");
        store.commit("createTag", "交通");
      }
    },
    createTag(state, name: string) {
      const id = createId().toString();
      state.tagList.push({ id, name: name });
      store.commit("saveTags");
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload;
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert("标签名重复了");
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (id === state.tagList[i].id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        router.back();
      } else {
        window.alert("删除失败");
      }
    },
  },
});

export default store;
