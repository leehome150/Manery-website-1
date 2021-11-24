<template>
  <layout>
    <div class="navBar">
      <icon class="leftIcon" name="left" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon" />
    </div>
    <div class="form-wrapper">
      <p>标签名：</p>
      <el-input v-model="tagValue" @blur="update"> </el-input>
    </div>
    <Button @click="remove">删除标签</Button>
    <mu-snackbar position="top" :open.sync="open" :color="color">
      {{ message }}
      <mu-button flat slot="action" color="secondary" @click="open = false"
        >✖</mu-button
      >
    </mu-snackbar>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";

@Component({
  components: { Button, FormItem },
})
export default class EditLabel extends Vue {
  open = false;
  message = "";
  tagValue = "";
  color = "";
  get currentTag() {
    return this.$store.state.currentTag;
  }
  get tags() {
    return this.$store.state.tagList;
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit("fetchTags");
    this.$store.commit("setCurrentTag", id);
    this.tagValue = this.$store.state.currentTag.name;
    if (!this.currentTag) {
      this.$router.replace("/404");
    }
  }

  update() {
    if (this.currentTag) {
      if (this.tags.some((item: any) => item.name === this.tagValue)) {
        this.open = true;
        this.message = "标签名重复";
        this.tagValue = this.currentTag.name;
      } else {
        console.log(this.tagValue);

        this.$store.commit("updateTag", {
          id: this.currentTag.id,
          name: this.tagValue,
        });
        this.open = true;
        this.color = "info";
        this.message = "修改标签成功";
      }
    }
    setTimeout(() => (this.open = false), 3000);
  }

  remove() {
    if (this.currentTag) {
      this.$store.commit("removeTag", this.currentTag.id);
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  p {
    line-height: 40px;
    font-size: 16px;
    min-width: 80px;
  }
  margin-top: 16px;
  display: flex;
  padding: 0 12px;
  background: white;
}
</style>
