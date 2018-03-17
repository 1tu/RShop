import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { ManufactureStoreState } from './manufacture.storeState';
import { manufactureApi } from '../../../api';
import { ManufactureEntity } from '../../../../server/modules/manufacture/manufacture.entity';
import { EntityType } from '../../../../shared/Entity.shared';

const storeName: EntityType = 'Manufacture';
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
  },
  listAdd(state, e: ManufactureEntity) {
    state.list = state.list.concat(e);
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await manufactureApi.getList().catch(e => { console.error(e); });
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await manufactureApi.get(id).catch(e => { console.error(e); });
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<ManufactureEntity>) {
    return manufactureApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<ManufactureEntity>) {
    model = await manufactureApi.put(model);
    commit(types.mutation.item, model);
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? model : item));
    }
    return model;
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

export const Manufacture = {
  namespaced: true, state, getters, mutations, actions
};

export const ManufactureTypes = types;
export const ManufactureState = decorator(namespace(storeName, vState), types.state);
export const ManufactureGetter = decorator(namespace(storeName, vGetter), types.getter);
export const ManufactureMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const ManufactureAction = decorator(namespace(storeName, vAction), types.action);
