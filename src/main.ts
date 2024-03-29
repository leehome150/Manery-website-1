import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(MuseUI);
Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// if (document.documentElement.clientWidth > 500) {
//   window.alert('请使用手机手机打开本页面，以保证浏览效果');
//   const img = document.createElement('img');
//   img.src = './qrCode.png';
//   img.style.position = 'fixed';
//   img.style.top = '50%';
//   img.style.left = '50%';
//   img.style.transform = 'translate(-50%,-50%)';
//   img.style.boxShadow = '0,0,10px,rgba(0,0,0,0.25)';
//   document.body.appendChild(img);
//
// }
