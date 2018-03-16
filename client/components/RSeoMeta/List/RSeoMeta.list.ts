import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { SeoMetaAction, SeoMetaState, AuthGetter } from '../../../store/modules/index';
import { SeoMetaEntity } from '../../../../server/modules/seoMeta/seoMeta.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RSeoMeta.list.pug') })
export class RSeoMetaList extends Vue {
  @AuthGetter hasPermission;
  @SeoMetaState list: SeoMetaEntity[];
  headers: TableHeader<SeoMetaEntity>[];

  @SeoMetaAction delete;
  @SeoMetaAction getList;

  created() {
    this.headers = [
      { text: 'Keys', transformer: (e: SeoMetaEntity) => e.keys.join(', '), sortable: false },
      { value: 'keywords', text: 'Keywords' },
      { value: 'description', text: 'Description' },
      { value: 'title', text: 'Title' },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: (id: number) => this.$router.push(`/SeoMeta/${id}`) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/SeoMeta/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  async mounted() {
    await this.getList();
  }
}

