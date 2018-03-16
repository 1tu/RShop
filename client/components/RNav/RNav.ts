import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { routes } from '../../router';
import { Mutation, State } from '../../store';
import { AuthGetter, OrderState } from '../../store/modules';

interface NavItem {
  path: string;
  title: string;
  // notifyCount: number;
}

@Component({
  template: require('./RNav.pug')
})
export class RNav extends Vue {
  public list: NavItem[] = [];
  @OrderState notifyCount;

  @State navShow;
  @Mutation toggleNav;

  @AuthGetter permissionList: string[];

  public toggle(state) {
    if (!state) this.toggleNav();
  }

  async mounted() {
    const filteredRoutes = routes.filter(route => this.permissionList.indexOf(route.path.slice(1) + 'Get') !== -1);
    this.list = filteredRoutes.map(r => ({ path: r.path, title: r.title }));
  }
}

