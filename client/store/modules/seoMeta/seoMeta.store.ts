import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { SeoMetaStoreState } from './seoMeta.storeState';
import { seoMetaApi } from '../../../api';
import { SeoMetaEntity } from '../../../../server/modules/seoMeta/seoMeta.entity';
import { EntityType } from '../../../../shared/Entity.shared';

const storeName: EntityType = 'SeoMeta';
const state: SeoMetaStoreState = {
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
  item(state, item: SeoMetaEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(seoMeta => seoMeta.id !== id);
  },
  list(state, list: SeoMetaEntity[]) {
    state.list = list;
  },
  listAdd(state, seoMeta: SeoMetaEntity) {
    state.list = state.list.concat(seoMeta);
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await seoMetaApi.getList().catch(e => { console.error(e); });
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await seoMetaApi.get(id).catch(e => { console.error(e); });
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<SeoMetaEntity>) {
    return seoMetaApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<SeoMetaEntity>) {
    model = await seoMetaApi.put(model);
    commit(types.mutation.item, model);
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? model : item));
    }
    return model;
  },
  async delete({ commit }, id: number): Promise<void> {
    await seoMetaApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const SeoMeta = {
  namespaced: true, state, getters, mutations, actions
};

export const SeoMetaTypes = types;
export const SeoMetaState = decorator(namespace(storeName, vState), types.state);
export const SeoMetaGetter = decorator(namespace(storeName, vGetter), types.getter);
export const SeoMetaMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const SeoMetaAction = decorator(namespace(storeName, vAction), types.action);
