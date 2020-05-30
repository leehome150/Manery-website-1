<template>

    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecode"/>
        <Types :value.sync="recode.type"/>
        <div class="notes">
            <FormItem @update:value="onUpdateNotes" field-name="备注" placeholder="在这里输入备注"/>

        </div>
        <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import model from '@/models/model';

  const recodeList = model.fetch();


  @Component({components: {Tags, FormItem, Types, NumberPad}})
  export default class Money extends Vue {

    tags = window.tagList;
    recodeList = recodeList;
    recode: RecordItem = {
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
      model.create(this.recode);
    }

    @Watch('recodeList')
    onRecodeListChanged() {
      model.save();
    }
  }
</script>
<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }

    .notes {
        padding: 12px 0;
    }
</style>
<style lang="scss" scoped>
    @import '~@/assets/style/helper.scss';
</style>