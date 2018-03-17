import Vuex from 'vuex';
import { State as vState, Getter as vGetter, Mutation as vMutation, Action as vAction, namespace } from 'vuex-class';
import { getter, mutation, action, decorator, keymirror } from '../../vuexTypes';
import extend from 'lodash/extend';

import { SeoTemplateStoreState } from './seoTemplate.storeState';
import { seoTemplateApi } from '../../../api';
import { SeoTemplateEntity } from '../../../../server/modules/seoTemplate/seoTemplate.entity';
import { EntityType } from '../../../../shared/Entity.shared';

const storeName: EntityType = 'SeoTemplate';
const state: SeoTemplateStoreState = {
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
  item(state, item: SeoTemplateEntity) {
    state.item = item;
  },
  delete(state, id: number) {
    state.list = state.list.filter(seoTemplate => seoTemplate.id !== id);
  },
  list(state, list: SeoTemplateEntity[]) {
    state.list = list;
  },
  listAdd(state, e: SeoTemplateEntity) {
    state.list = state.list.concat(e);
  }
});

const actions = action(state, {
  async getList({ commit, state }) {
    const list = await seoTemplateApi.getList().catch(e => { console.error(e); });
    commit(types.mutation.list, list);
    return state.list;
  },
  async get({ commit, state }, id: number) {
    if (state.item && state.item.id === id) return state.item;
    const item = await seoTemplateApi.get(id).catch(e => { console.error(e); });
    commit(types.mutation.item, item);
    return state.item;
  },
  async post({ dispatch }, model: Partial<SeoTemplateEntity>) {
    return seoTemplateApi.post(model);
  },
  async put({ getters, commit, dispatch, state }, model: Partial<SeoTemplateEntity>) {
    model = await seoTemplateApi.put(model);
    commit(types.mutation.item, model);
    if (getters.itemById(model.id)) {
      commit(types.mutation.list, state.list.map(item => item.id === model.id ? model : item));
    }
    return model;
  },
  async delete({ commit }, id: number): Promise<void> {
    await seoTemplateApi.delete(id);
    commit(types.mutation.delete, id);
  }
});

const types = {
  state: keymirror(state),
  getter: keymirror(getters),
  mutation: keymirror(mutations),
  action: keymirror(actions)
};

export const SeoTemplate = {
  namespaced: true, state, getters, mutations, actions
};

export const SeoTemplateTypes = types;
export const SeoTemplateState = decorator(namespace(storeName, vState), types.state);
export const SeoTemplateGetter = decorator(namespace(storeName, vGetter), types.getter);
export const SeoTemplateMutation = decorator(namespace(storeName, vMutation), types.mutation);
export const SeoTemplateAction = decorator(namespace(storeName, vAction), types.action);
