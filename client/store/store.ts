import Vue from 'vue';
import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { RootState, Alert } from './';
import { keymirror, mutation, decorator, getter, action } from './vuexTypes';
import {
  auth,
  User,
  Customer,
  City,
  Contact,
  DeliveryService,
  Delivery,
  Order,
  Payment,
  PaymentService,
  Product,
  Rejection,
  Remind,
  Shop,
  Manufacture,
  Category,
  FilteredPage,
  PreManufacture,
  SeoMeta,
  SeoTemplate
} from './modules';

Vue.use(Vuex);

const state: RootState = {
  navShow: true,
  alertList: []
};

const getters = getter(state, {});

const mutations = mutation(state, {
  toggleNav(state) {
    state.navShow = !state.navShow;
  },
  alertAdd(state, item: Alert) {
    state.alertList = state.alertList.concat(item);
  },
  alertRemove(state, index: number) {
    if (!state.alertList[index]) return;
    state.alertList = state.alertList.slice(0, index).concat(state.alertList.slice(index + 1));
  }
});

const actions = action(state, {});

export const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    auth,
    Category,
    City,
    Contact,
    Customer,
    DeliveryService,
    Delivery,
    FilteredPage,
    Order,
    Manufacture,
    Payment,
    PaymentService,
    PreManufacture,
    Product,
    Rejection,
    Remind,
    SeoMeta,
    SeoTemplate,
    Shop,
    User
  },
  strict: process.env.NODE_ENV !== 'production'
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const Types = types;
export const State = decorator(namespace(null, vState), types.state);
export const Getter = decorator(namespace(null, vGetter), types.getter);
export const Mutation = decorator(namespace(null, vMutation), types.mutation);
export const Action = decorator(namespace(null, vAction), types.action);
