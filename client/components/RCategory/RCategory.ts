import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CategoryAction, CategoryState } from '../../store/modules/index';
import { CategoryEntity } from '../../../server/modules/category/category.entity';

@Component({
  template: require('./RCategory.pug')
})
export class RCategory extends Vue {
  @CategoryState item: Partial<CategoryEntity>;

  @CategoryAction get;
  async mounted() {
    await this.get(parseInt(this.$route.params.id));
  }
}

