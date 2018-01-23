import Vue from 'vue';
import './api/_interceptor';
import './charts';

import './stylus/main.styl';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import { i18n } from './i18n';
import { store } from './store';
import { router } from './router';
import filters from './filters';
import { RApp } from './components/RApp';

store.dispatch('auth/getUser').then(_ => {
  new Vue({
    i18n,
    router,
    store,
    filters,
    el: '#app',
    render: h => h(RApp)
  });
});


