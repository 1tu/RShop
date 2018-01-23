import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UserAction, UserState, AuthGetter } from '../../../store/modules/index';
import { UserEntity } from '../../../../server/modules/user/user.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RUser.list.pug') })
export class RUserList extends Vue {
  @AuthGetter hasPermission;
  @UserState list: UserEntity[];
  headers: TableHeader<UserEntity>[];

  @UserAction delete;
  @UserAction getList;

  created() {
    this.headers = [
      { value: 'id', text: 'Id', align: 'left', sortable: false },
      { value: 'email', text: 'Email' },
      { value: 'username', text: 'Username' },
      { text: 'Role', transformer: (e: UserEntity) => e.role.name, sortable: false },
      {
        text: 'Actions', sortable: false, actionList: [
          { type: 'Get', name: 'info', icon: 'info', onClick: ((id: number) => this.$router.push(`/user/${id}`)) },
          { type: 'Put', name: 'edit', icon: 'edit', onClick: (id: number) => this.$router.push(`/user/${id}/edit`) },
          { type: 'Delete', name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
        ].filter(item => this.hasPermission(this.constructor.name.replace(/(^R|List$)/g, '') + item.type))
      },
    ];
  }

  public async mounted() {
    await this.getList();
  }
}

