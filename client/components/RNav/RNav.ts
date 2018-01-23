import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { State } from '../../store/index';
import { routes, RouterItem } from '../../router';
import { AuthGetter, AuthAction } from '../../store/modules/index';

@Component({
  template: require('./RNav.pug')
})
export class RNav extends Vue {
  public routes: RouterItem[] = [];

  @State navShow;
  @AuthGetter permissionList: string[];
  @AuthAction getUser;

  async mounted() {
    await this.getUser();
    this.routes = routes.filter(route => this.permissionList.indexOf(route.path.slice(1) + 'Get') !== -1);
  }
}

