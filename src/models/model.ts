const model = {
  fetch() {
    return JSON.parse(window.localStorage.getItem('recodeList') || '[]') as RecordItem[];
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem('recodeList', JSON.stringify(data));
  },
  clone(data: RecordItem[]|RecordItem){
    return JSON.parse(JSON.stringify(data))
  }
};

export default model;