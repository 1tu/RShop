import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { UserStoreState } from './user.storeState';
import { userApi } from '../../../api';
import { UserEntity } from '../../../../server/modules/user/user.entity';
import { EntityType } from '../../../../shared/Entity.shared';

const storeName: EntityType = 'User';
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
  },
  listAdd(state, e: UserEntity) {
    state.list = state.list.concat(e);
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await userApi.getList().catch(e => { console.error(e); });
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await userApi.get(id).catch(e => { console.error(e); });
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<UserEntity>) {
    return userApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<UserEntity>) {
    model = await userApi.put(model);
    commit(types.mutation.item, model);
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? model : item));
    }
    return model;
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

export const User = {
  namespaced: true, state, getters, mutations, actions
};

export const UserTypes = types;
export const UserState = decorator(namespace(storeName, vState), types.state);
export const UserGetter = decorator(namespace(storeName, vGetter), types.getter);
export const UserMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const UserAction = decorator(namespace(storeName, vAction), types.action);
