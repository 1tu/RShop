import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { SeoTemplateAction, SeoTemplateState, AuthGetter } from '../../../store/modules/index';
import { SeoTemplateEntity } from '../../../../server/modules/seoTemplate/seoTemplate.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RSeoTemplate.list.pug') })
export class RSeoTemplateList extends Vue {
  @AuthGetter hasPermission;
  @SeoTemplateState list: SeoTemplateEntity[];
  headers: TableHeader<SeoTemplateEntity>[];

  @SeoTemplateAction delete;
  @SeoTemplateAction getList;

  created() {
    this.headers = [
      { value: 'h1', text: 'H1' },
      { value: 'content', text: 'Content' },
      { value: 'video', text: 'Video' },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/SeoTemplate/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/SeoTemplate/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

