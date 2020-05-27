<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecode"/>
        <Types :value.sync="recode.type"/>
        <Notes @update:value="onUpdateNotes"/>
        <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';

  type Record = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createAt?: Date;//类
  }

  @Component({components: {Tags, Notes, Types, NumberPad}})
  export default class Money extends Vue {

    tags = ['衣', '食', '住', '行', '娱乐'];
    recodeList: Record[] = JSON.parse(window.localStorage.getItem('recodeList') || '[]');
    recode: Record = {
      tags: [], notes: '', type: '-', amount: 0
    };

    onUpdateTags(value: string[]) {
      this.recode.tags = value;
    }

    onUpdateNotes(value: string) {
      this.recode.notes = value;
    }

    onUpdateAmount(value: string) {
      this.recode.amount = parseFloat(value);
    }

    saveRecode() {
      const recode2: Record = JSON.parse(JSON.stringify(this.recode));
      recode2.createAt = new Date();
      this.recodeList.push(recode2);
    }

    @Watch('recodeList')
    onRecodeListChanged() {
      window.localStorage.setItem('recodeList', JSON.stringify(this.recodeList));
    }
  }
</script>
<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>
<style lang="scss" scoped>
    @import '~@/assets/style/helper.scss';
</style>