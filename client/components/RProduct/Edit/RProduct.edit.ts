import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ProductAction, ProductGetter } from '../../../store/modules/index';
import { ProductEntity } from '../../../../server/modules/product/product.entity';
import { cloneDeep } from 'lodash';

@Component({
  template: require('./RProduct.edit.pug'),
})
export class RProductEdit extends Vue {
  public model: Partial<ProductEntity> = {};

  @ProductAction get;
  @ProductAction put;
  @ProductAction post;
  async mounted() {
    const id = parseInt(this.$route.params.id);
    if (id) {
      const item = await this.get(id);
      item && (this.model = cloneDeep(item));
    }
  }

  public async submit() {
    if (!await this.$validator.validateAll()) return;
    try {
      await this[this.model.id ? 'put' : 'post'](this.model);
      this.$router.push('/product');
    } catch (e) {
      console.log('product edit error', e.response.data);
    }
  }

  public clear() {
    this.model = { id: this.model.id };
    this.$validator.reset();
  }
}

