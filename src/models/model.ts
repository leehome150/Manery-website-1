import clone from '@/lib/clone';

const model = {
  data:[] as RecordItem[],
  fetch() {
    this.data=JSON.parse(window.localStorage.getItem('recodeList') || '[]') as RecordItem[];
    return this.data;
  },
  create(recode: RecordItem){
    const recode2: RecordItem =clone(recode);
    recode2.createAt = new Date();
    this.data.push(recode2);
  },
  save() {
    window.localStorage.setItem('recodeList', JSON.stringify(this.data));
  },
};

export default model;