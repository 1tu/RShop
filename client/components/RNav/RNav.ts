import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { State } from '../../store/index';
import { routes } from '../../router';

@Component({
  template: require('./RNav.pug')
})
export class RNav extends Vue {
  routes = routes;
  @State navShow;
}

