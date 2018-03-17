import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { PaymentStoreState } from './payment.storeState';
import { paymentApi } from '../../../api';
import { PaymentEntity } from '../../../../server/modules/payment/payment.entity';
import { EntityType } from '../../../../shared/Entity.shared';

const storeName: EntityType = 'Payment';
const state: PaymentStoreState = {
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
  item(state, item: PaymentEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(payment => payment.id !== id);
  },
  list(state, list: PaymentEntity[]) {
    state.list = list;
  },
  listAdd(state, e: PaymentEntity) {
    state.list = state.list.concat(e);
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await paymentApi.getList().catch(e => { console.error(e); });
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await paymentApi.get(id).catch(e => { console.error(e); });
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<PaymentEntity>) {
    return paymentApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<PaymentEntity>) {
    model = await paymentApi.put(model);
    commit(types.mutation.item, model);
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? model : item));
    }
    return model;
  },
  async delete({ commit }, id: number): Promise<void> {
    await paymentApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const Payment = {
  namespaced: true, state, getters, mutations, actions
};

export const PaymentTypes = types;
export const PaymentState = decorator(namespace(storeName, vState), types.state);
export const PaymentGetter = decorator(namespace(storeName, vGetter), types.getter);
export const PaymentMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const PaymentAction = decorator(namespace(storeName, vAction), types.action);
