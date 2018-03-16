import './api/_interceptor';
import './charts';
import './gateway';
import './stylus/main.styl';

import VeeValidate from 'vee-validate';
import Vue from 'vue';
import Vuetify from 'vuetify';

import { RApp } from './components/RApp';
import filters from './filters';
import { i18n } from './i18n';
import { router } from './router';
import { store } from './store';

Vue.use(Vuetify);

Vue.use(VeeValidate);

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


