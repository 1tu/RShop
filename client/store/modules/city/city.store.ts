import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { CityStoreState } from './city.storeState';
import { cityApi } from '../../../api';
import { CityEntity } from '../../../../server/modules/city/city.entity';

const storeName = 'city';
const state: CityStoreState = {
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
  item(state, item: CityEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(city => city.id !== id);
  },
  list(state, list: CityEntity[]) {
    state.list = list;
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await cityApi.getList().catch(e => { console.error(e); });
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await cityApi.get(id).catch(e => { console.error(e); });
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<CityEntity>) {
    await cityApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<CityEntity>) {
    await cityApi.put(model);
    commit(types.mutation.item, extend({}, state.item, model));
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? extend({}, item, model) : item));
      return;
    }
  },
  async delete({ commit }, id: number): Promise<void> {
    await cityApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const city = {
  namespaced: true, state, getters, mutations, actions
};

export const CityTypes = types;
export const CityState = decorator(namespace(storeName, vState), types.state);
export const CityGetter = decorator(namespace(storeName, vGetter), types.getter);
export const CityMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const CityAction = decorator(namespace(storeName, vAction), types.action);
