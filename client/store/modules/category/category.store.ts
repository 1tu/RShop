import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { CategoryStoreState } from './category.storeState';
import { categoryApi } from '../../../api';
import { CategoryEntity } from '../../../../server/modules/category/category.entity';
import { EntityType } from '../../../../shared/Entity.shared';

const storeName: EntityType = 'Category';
const state: CategoryStoreState = {
  item: undefined,
  list: [],
  listByBase: []
};

const getters = getter(state, {
  indexById(state) {
    return (id: number) => {
      let index: number;
      state.list.some((item, i) => {
        if (item.id === id) {
          index = i;
          return true;
        }
      });
      return index;
    };
  },
  itemById(state, getters) {
    return (id: number) => state.list.find(c => c.id === id);
  },
  listBase(state) {
    return state.list.filter(c => c.isBase === true);
  }
});

const mutations = mutation(state, {
  item(state, item: CategoryEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(category => category.id !== id);
  },
  list(state, list: CategoryEntity[]) {
    state.list = list;
  },
  listByBase(state, list: CategoryEntity[]) {
    state.listByBase = list;
  },
  listAdd(state, e: CategoryEntity) {
    state.list = state.list.concat(e);
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await categoryApi.getList().catch(e => {
      console.error(e);
    });
    commit(types.mutation.list, list);
    return state.list;
  },
  async getListByBase({ commit, state }, { id, shopId }) {
    const listByBase = await categoryApi.getListByBase(id, shopId).catch(e => {
      console.error(e);
    });
    commit(types.mutation.listByBase, listByBase);
    return listByBase;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await categoryApi.get(id).catch(e => {
      console.error(e);
    });
    commit(types.mutation.item, item);
    return item;
  },
  async post({ dispatch }, model: Partial<CategoryEntity>) {
    return categoryApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<CategoryEntity>) {
    model = await categoryApi.put(model);
    commit(types.mutation.item, model);
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => (item.id === model.id ? model : item)));
    }
    return model;
  },
  async delete({ commit }, id: number): Promise<void> {
    await categoryApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const Category = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export const CategoryTypes = types;
export const CategoryState = decorator(namespace(storeName, vState), types.state);
export const CategoryGetter = decorator(namespace(storeName, vGetter), types.getter);
export const CategoryMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const CategoryAction = decorator(namespace(storeName, vAction), types.action);
