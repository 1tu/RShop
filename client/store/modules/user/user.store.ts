import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { UserStoreState } from './user.storeState';
import { userApi } from '../../../api';
import { UserEntity } from '../../../../server/modules/user/user.entity';

const storeName = 'user';
const state: UserStoreState = {
  item: undefined,
  list: []
};

const getters = getter(state, {
  listByRole(state) {
    return (roleId: number) => state.list.filter((item) => item.role.id === roleId);
  },
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
  item(state, item: UserEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(user => user.id !== id);
  },
  list(state, list: UserEntity[]) {
    state.list = list;
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await userApi.getList();
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await userApi.get(id);
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<UserEntity>) {
    await userApi.post(model);
    await dispatch('getList');
  },
  async put({ getters, commit, dispatch, state }, model: Partial<UserEntity>) {
    await userApi.put(model);
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? extend({}, item, model) : item));
      return;
    }
    await dispatch('getList');
  },
  async delete({ commit }, id: number): Promise<void> {
    await userApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const user = {
  namespaced: true, state, getters, mutations, actions
};

export const UserTypes = types;
export const UserState = decorator(namespace(storeName, vState), types.state);
export const UserGetter = decorator(namespace(storeName, vGetter), types.getter);
export const UserMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const UserAction = decorator(namespace(storeName, vAction), types.action);
