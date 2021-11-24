<template>
  <Layout>
    <MyIcon />
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <mu-button type="primary" @click="createTag">新建标签</mu-button>
    </div>
    <mu-dialog title="创建标签" :open.sync="show" @close="colse">
      <mu-text-field v-model="tagName" placeholder="请输入标签"></mu-text-field>
      <span slot="footer" class="dialog-footer"> </span>
      <mu-button slot="actions" flat color="primary" @click="show = false"
        >取消</mu-button
      >
      <mu-button
        slot="actions"
        type="primary"
        color="info"
        @click="addTagNameComfirm"
        >确 定</mu-button
      >
    </mu-dialog>
    <mu-snackbar position="top" :open.sync="open" :color="color">
      {{ message }}
      <mu-button flat slot="action" color="secondary" @click="open = false"
        >✖</mu-button
      >
    </mu-snackbar>
  </Layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";
import MyIcon from "@/views/MyIcon.vue";

@Component({
  components: { MyIcon, Button },
})
export default class Labels extends mixins(TagHelper) {
  show = false;
  open = false;
  tagName = "";
  message = "";
  color = "";
  createTag() {
    this.show = true;
  }
  colse() {
    this.show = false;
  }
  addTagNameComfirm() {
    if (this.tagName === "") {
      this.open = true;
      this.color = "";
      this.message = "标签名不能为空";
    } else if (this.tags.some((item: any) => item.name === this.tagName)) {
      this.open = true;
      this.message = "标签名重复";
      this.color = "";
    } else {
      this.$store.commit("createTag", this.tagName);
      this.show = false;
      this.open = true;
      this.message = "添加成功";
      this.color = "info";
    }
    setTimeout(() => (this.open = false), 3000);
  }
  get tags() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
.mu-input {
  max-width: 240px;
}
.createTag-wrapper {
  margin-top: 20px;
  text-align: center;
}
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      color: #666;
      width: 18px;
      height: 18px;
      margin-right: 16px;
    }
  }
}
</style>
