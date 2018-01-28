import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { State } from '../../store/index';
import { routes, RouterItem } from '../../router';
import { AuthGetter, AuthAction, OrderState } from '../../store/modules/index';

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
  @AuthGetter permissionList: string[];

  async mounted() {
    const filteredRoutes = routes.filter(route => this.permissionList.indexOf(route.path.slice(1).toLowerCase() + 'Get') !== -1);
    this.list = filteredRoutes.map(r => ({ path: r.path, title: r.title }));
  }
}

