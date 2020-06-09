<template>

    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
        <div class="notes">
            <FormItem :value.sync="record.notes"
                      field-name="备注" placeholder="在这里输入备注"/>

        </div>
        <Tags :value.sync="record.tags"/>
        <tabs :data-source="recordTypeList" :value.sync="record.type"/>
     <MyIcon/>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';
  import Tabs from '@/components/Tabs.vue';
  import MyIcon from '@/views/MyIcon.vue';


  @Component({
    components: {MyIcon, Tabs, Tags, FormItem, NumberPad},
  })
  export default class Money extends Vue {

    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };

    recordTypeList = recordTypeList;

    get recordList() {
      return this.$store.state.recordList;
    }

    created() {
      this.$store.commit('fetchRecords');
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      if (!this.record.tags || this.record.tags.length === 0) {
        return window.alert('请选择至少一个标签');
      }
      this.$store.commit('createRecord', this.record);
      if (this.$store.state.createRecordError === null) {
        window.alert('已保存');
        this.record.notes = '';
        this.record.tags = [];

      }
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