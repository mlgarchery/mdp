import Vue from 'vue';
import App from '/src/app.vue';

new Vue({ render: createElement => createElement(App) }).$mount('#app');