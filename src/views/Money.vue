<template>
    <Layout class-prefix="layout">
        {{recode}}
        <NumberPad @update:value="onUpdateAmount"/>
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
  import {Component} from 'vue-property-decorator';

  type Record ={
    tags: string[];
    notes: string;
    type: string;
    amount: number;
  }

  @Component({components: {Tags, Notes, Types, NumberPad}})
  export default class Money extends Vue {

    tags = ['衣', '食', '住', '行', '娱乐'];
    recode: Record= {
      tags: [],notes: '',type: '-',amount:0
    }

    onUpdateTags(value: string[]) {
      this.recode.tags =value;
    }
    onUpdateNotes(value: string){
      this.recode.notes=value;
    }
    onUpdateAmount(value: string){
      this.recode.amount=parseFloat(value);
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