import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { DeliveryServiceStoreState } from './deliveryService.storeState';
import { deliveryServiceApi } from '../../../api';
import { DeliveryServiceEntity } from '../../../../server/modules/deliveryService/deliveryService.entity';
import { EntityType } from '../../../../shared/Entity.shared';

const storeName: EntityType = 'DeliveryService';
const state: DeliveryServiceStoreState = {
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
  item(state, item: DeliveryServiceEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(deliveryService => deliveryService.id !== id);
  },
  list(state, list: DeliveryServiceEntity[]) {
    state.list = list;
  },
  listAdd(state, e: DeliveryServiceEntity) {
    state.list = state.list.concat(e);
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await deliveryServiceApi.getList().catch(e => { console.error(e); });
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await deliveryServiceApi.get(id).catch(e => { console.error(e); });
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<DeliveryServiceEntity>) {
    return deliveryServiceApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<DeliveryServiceEntity>) {
    model = await deliveryServiceApi.put(model);
    commit(types.mutation.item, model);
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? model : item));
    }
    return model;
  },
  async delete({ commit }, id: number): Promise<void> {
    await deliveryServiceApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const DeliveryService = {
  namespaced: true, state, getters, mutations, actions
};

export const DeliveryServiceTypes = types;
export const DeliveryServiceState = decorator(namespace(storeName, vState), types.state);
export const DeliveryServiceGetter = decorator(namespace(storeName, vGetter), types.getter);
export const DeliveryServiceMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const DeliveryServiceAction = decorator(namespace(storeName, vAction), types.action);
