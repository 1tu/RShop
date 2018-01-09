import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { DeliveryStoreState } from './delivery.storeState';
import { deliveryApi } from '../../../api';
import { DeliveryEntity } from '../../../../server/modules/delivery/delivery.entity';

const storeName = 'delivery';
const state: DeliveryStoreState = {
  item: undefined,
  list: []
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
  item(state, item: DeliveryEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(delivery => delivery.id !== id);
  },
  list(state, list: DeliveryEntity[]) {
    state.list = list;
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await deliveryApi.getList();
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await deliveryApi.get(id);
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<DeliveryEntity>) {
    await deliveryApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<DeliveryEntity>) {
    await deliveryApi.put(model);
    commit(types.mutation.item, extend({}, state.item, model));
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? extend({}, item, model) : item));
      return;
    }
  },
  async delete({ commit }, id: number): Promise<void> {
    await deliveryApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const delivery = {
  namespaced: true, state, getters, mutations, actions
};

export const DeliveryTypes = types;
export const DeliveryState = decorator(namespace(storeName, vState), types.state);
export const DeliveryGetter = decorator(namespace(storeName, vGetter), types.getter);
export const DeliveryMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const DeliveryAction = decorator(namespace(storeName, vAction), types.action);
