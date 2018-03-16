import { Action as vAction, Getter as vGetter, Mutation as vMutation, namespace, State as vState } from 'vuex-class';

import { UserEntity } from '../../../../server/modules/user/user.entity';
import { userApi } from '../../../api';
import { action, decorator, getter, keymirror, mutation } from '../../vuexTypes';
import { AuthStoreState } from './auth.storeState';

const storeName = 'auth';
const state: AuthStoreState = {
  isAuthenticated: true,
  user: null,
};

const getters = getter(state, {
  role(state) {
    return state.user ? state.user.role.name : null;
  },
  permissionList(state) {
    return state.user ? state.user.role.permissionList.map(p => p.name) : [];
  },
  permissionListLowerCase(state, getters) {
    return getters.permissionList.map(p => p.toLowerCase());
  },
  hasPermission(state, getters) {
    return (permission: string) => getters.permissionListLowerCase.indexOf(permission.toLowerCase()) !== -1;
  }
});

const mutations = mutation(state, {
  user(state, user: UserEntity) {
    state.user = user;
  },
});

const actions = action(state, {
  async getUser({ commit, state }, id: number) {
    const user = await userApi.getOwn();
    commit(types.mutation.user, user);
    return state.user;
  },
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const auth = {
  namespaced: true, state, getters, mutations, actions
};

export const AuthTypes = types;
export const AuthState = decorator(namespace(storeName, vState), types.state);
export const AuthGetter = decorator(namespace(storeName, vGetter), types.getter);
export const AuthMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const AuthAction = decorator(namespace(storeName, vAction), types.action);
