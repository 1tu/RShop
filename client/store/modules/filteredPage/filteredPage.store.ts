import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { FilteredPageStoreState } from './filteredPage.storeState';
import { filteredPageApi } from '../../../api';
import { FilteredPageEntity } from '../../../../server/modules/filteredPage/filteredPage.entity';
import { EntityType } from '../../../../shared/Entity.shared';

const storeName: EntityType = 'FilteredPage';
const state: FilteredPageStoreState = {
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
  item(state, item: FilteredPageEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(filteredPage => filteredPage.id !== id);
  },
  list(state, list: FilteredPageEntity[]) {
    state.list = list;
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await filteredPageApi.getList().catch(e => { console.error(e); });
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await filteredPageApi.get(id).catch(e => { console.error(e); });
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<FilteredPageEntity>) {
    await filteredPageApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<FilteredPageEntity>) {
    await filteredPageApi.put(model);
    commit(types.mutation.item, extend({}, state.item, model));
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? extend({}, item, model) : item));
      return;
    }
  },
  async delete({ commit }, id: number): Promise<void> {
    await filteredPageApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const FilteredPage = {
  namespaced: true, state, getters, mutations, actions
};

export const FilteredPageTypes = types;
export const FilteredPageState = decorator(namespace(storeName, vState), types.state);
export const FilteredPageGetter = decorator(namespace(storeName, vGetter), types.getter);
export const FilteredPageMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const FilteredPageAction = decorator(namespace(storeName, vAction), types.action);
