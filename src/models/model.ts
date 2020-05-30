import clone from '@/lib/clone';

const model = {
  data:[] as RecordItem[],
  fetch() {
    this.data=JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    return this.data;
  },
  create(recode: RecordItem){
    const recode2: RecordItem =clone(recode);
    recode2.createAt = new Date();
    this.data.push(recode2);
    this.save();
  },
  save() {
    window.localStorage.setItem('recordList', JSON.stringify(this.data));
  },
};

export default model;