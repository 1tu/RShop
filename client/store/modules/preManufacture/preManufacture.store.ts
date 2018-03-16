import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { PreManufactureStoreState } from './preManufacture.storeState';
import { preManufactureApi } from '../../../api';
import { PreManufactureEntity } from '../../../../server/modules/preManufacture/preManufacture.entity';
import { EntityType } from '../../../../shared/Entity.shared';

const storeName: EntityType = 'PreManufacture';
const state: PreManufactureStoreState = {
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
  item(state, item: PreManufactureEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(preManufacture => preManufacture.id !== id);
  },
  list(state, list: PreManufactureEntity[]) {
    state.list = list;
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await preManufactureApi.getList().catch(e => { console.error(e); });
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await preManufactureApi.get(id).catch(e => { console.error(e); });
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<PreManufactureEntity>) {
    await preManufactureApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<PreManufactureEntity>) {
    await preManufactureApi.put(model);
    commit(types.mutation.item, extend({}, state.item, model));
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? extend({}, item, model) : item));
      return;
    }
  },
  async delete({ commit }, id: number): Promise<void> {
    await preManufactureApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const PreManufacture = {
  namespaced: true, state, getters, mutations, actions
};

export const PreManufactureTypes = types;
export const PreManufactureState = decorator(namespace(storeName, vState), types.state);
export const PreManufactureGetter = decorator(namespace(storeName, vGetter), types.getter);
export const PreManufactureMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const PreManufactureAction = decorator(namespace(storeName, vAction), types.action);
