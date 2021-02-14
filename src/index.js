import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events'
import App from '/src/app.vue';

Vue.use(Vue2TouchEvents);
new Vue({ render: createElement => createElement(App) }).$mount('#app');