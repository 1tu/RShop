import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { ManufactureStoreState } from './manufacture.storeState';
import { manufactureApi } from '../../../api';
import { ManufactureEntity } from '../../../../server/modules/manufacture/manufacture.entity';

const storeName = 'manufacture';
const state: ManufactureStoreState = {
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
  item(state, item: ManufactureEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(manufacture => manufacture.id !== id);
  },
  list(state, list: ManufactureEntity[]) {
    state.list = list;
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await manufactureApi.getList();
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await manufactureApi.get(id);
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<ManufactureEntity>) {
    await manufactureApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<ManufactureEntity>) {
    await manufactureApi.put(model);
    commit(types.mutation.item, extend({}, state.item, model));
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? extend({}, item, model) : item));
      return;
    }
  },
  async delete({ commit }, id: number): Promise<void> {
    await manufactureApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const manufacture = {
  namespaced: true, state, getters, mutations, actions
};

export const ManufactureTypes = types;
export const ManufactureState = decorator(namespace(storeName, vState), types.state);
export const ManufactureGetter = decorator(namespace(storeName, vGetter), types.getter);
export const ManufactureMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const ManufactureAction = decorator(namespace(storeName, vAction), types.action);
