const model = {
  data:[] as RecordItem[],
  fetch() {
    this.data=JSON.parse(window.localStorage.getItem('recodeList') || '[]') as RecordItem[];
    return this.data;
  },
  save() {
    window.localStorage.setItem('recodeList', JSON.stringify(this.data));
  },
  clone(data: RecordItem[]|RecordItem){
    return JSON.parse(JSON.stringify(data))
  }
};

export default model;