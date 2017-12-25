import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { RejectionStoreState } from './rejection.storeState';
import { rejectionApi } from '../../../api';
import { RejectionEntity } from '../../../../server/modules/rejection/rejection.entity';

const storeName = 'rejection';
const state: RejectionStoreState = {
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
  item(state, item: RejectionEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(rejection => rejection.id !== id);
  },
  list(state, list: RejectionEntity[]) {
    state.list = list;
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await rejectionApi.getList();
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await rejectionApi.get(id);
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<RejectionEntity>) {
    await rejectionApi.post(model);
    await dispatch('getList');
  },
  async put({ getters, commit, dispatch, state }, model: Partial<RejectionEntity>) {
    await rejectionApi.put(model);
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? extend({}, item, model) : item));
      return;
    }
    await dispatch('getList');
  },
  async delete({ commit }, id: number): Promise<void> {
    await rejectionApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const rejection = {
  namespaced: true, state, getters, mutations, actions
};

export const RejectionTypes = types;
export const RejectionState = decorator(namespace(storeName, vState), types.state);
export const RejectionGetter = decorator(namespace(storeName, vGetter), types.getter);
export const RejectionMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const RejectionAction = decorator(namespace(storeName, vAction), types.action);
