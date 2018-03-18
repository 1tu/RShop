import { filter } from 'lodash';
import Vue from 'vue';

Vue.filter('filter', (arr: any[], predicate: any) => {
  return filter(arr, predicate);
});
