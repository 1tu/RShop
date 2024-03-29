import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { OrderStoreState } from './order.storeState';
import { orderApi } from '../../../api';
import { OrderEntity } from '../../../../server/modules/order/order.entity';

const storeName = 'Order';
const state: OrderStoreState = {
  item: undefined,
  list: [],
  notifyCount: 0
};

const getters = getter(state, {
  indexById(state) {
    return (id: number) => {
      let index: number;
      state.list.some((item, i) => {
        if (item.id === id) { index = i; return true; }
      });
      return index;
    };
  },
  itemById(state, getters) {
    return (id: number) => state.list[getters.indexById(id)];
  }
});

const mutations = mutation(state, {
  item(state, item: OrderEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(order => order.id !== id);
  },
  list(state, list: OrderEntity[]) {
    state.list = list;
  },
  listAdd(state, e: OrderEntity) {
    state.list = state.list.concat(e);
  },
  notify(state, count: number) {
    state.notifyCount = count;
  }
});

const actions = action(state, {
  async addNotify({ commit, state, dispatch }) {
    commit(types.mutation.notify, state.notifyCount + 1);
    await dispatch(types.action.getList);
  },
  async getList({ commit, state }) {
    const list = await orderApi.getList().catch(e => { console.error(e); });
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await orderApi.get(id).catch(e => { console.error(e); });
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<OrderEntity>) {
    return orderApi.post(model);
  },
  async put({ getters, commit, state }, model: Partial<OrderEntity>) {
    model = await orderApi.put(model);
    commit(types.mutation.item, model);
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? model : item));
    }
    return model;
  },
  async delete({ commit }, id: number): Promise<void> {
    await orderApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const Order = {
  namespaced: true, state, getters, mutations, actions
};

export const OrderTypes = types;
export const OrderState = decorator(namespace(storeName, vState), types.state);
export const OrderGetter = decorator(namespace(storeName, vGetter), types.getter);
export const OrderMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const OrderAction = decorator(namespace(storeName, vAction), types.action);
