import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { FilteredPageAction, FilteredPageState } from '../../store/modules/index';
import { FilteredPageEntity } from '../../../server/modules/filteredPage/filteredPage.entity';

@Component({
  template: require('./RFilteredPage.pug')
})
export class RFilteredPage extends Vue {
  @FilteredPageState item: Partial<FilteredPageEntity>;

  @FilteredPageAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

