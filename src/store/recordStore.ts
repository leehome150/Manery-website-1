import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList;
  },

  saveRecords() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  },


  createRecord(record: RecordItem) {
    const recode2: RecordItem = clone(record);
    recode2.createAt = new Date().toISOString();
    this.recordList?.push(recode2);
    recordStore.saveRecords();
  },
};

recordStore.fetchRecords();
export default recordStore;
