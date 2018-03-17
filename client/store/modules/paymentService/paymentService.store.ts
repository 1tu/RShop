import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { PaymentServiceStoreState } from './paymentService.storeState';
import { paymentServiceApi } from '../../../api';
import { PaymentServiceEntity } from '../../../../server/modules/paymentService/paymentService.entity';
import { EntityType } from '../../../../shared/Entity.shared';

const storeName: EntityType = 'PaymentService';
const state: PaymentServiceStoreState = {
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
  item(state, item: PaymentServiceEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(paymentService => paymentService.id !== id);
  },
  list(state, list: PaymentServiceEntity[]) {
    state.list = list;
  },
  listAdd(state, e: PaymentServiceEntity) {
    state.list = state.list.concat(e);
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await paymentServiceApi.getList().catch(e => { console.error(e); });
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await paymentServiceApi.get(id).catch(e => { console.error(e); });
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<PaymentServiceEntity>) {
    return paymentServiceApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<PaymentServiceEntity>) {
    model = await paymentServiceApi.put(model);
    commit(types.mutation.item, model);
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? model : item));
    }
    return model;
  },
  async delete({ commit }, id: number): Promise<void> {
    await paymentServiceApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const PaymentService = {
  namespaced: true, state, getters, mutations, actions
};

export const PaymentServiceTypes = types;
export const PaymentServiceState = decorator(namespace(storeName, vState), types.state);
export const PaymentServiceGetter = decorator(namespace(storeName, vGetter), types.getter);
export const PaymentServiceMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const PaymentServiceAction = decorator(namespace(storeName, vAction), types.action);
