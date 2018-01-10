import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UserAction, UserState } from '../../../store/modules/index';
import { UserEntity } from '../../../../server/modules/user/user.entity';
import { TableHeader } from '../../../helpers/index';
import { app } from '../../../main';

@Component({ template: require('./RUser.list.pug') })
export class RUserList extends Vue {
  @UserState list: UserEntity[];
  headers: TableHeader<UserEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    { value: 'email', text: 'Email' },
    { value: 'username', text: 'Username' },
    { text: 'Role', transformer: (e: UserEntity) => e.role.name, sortable: false },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: ((id: number) => app.$router.push(`/user/${id}`)) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => app.$router.push(`/user/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @UserAction delete;
  @UserAction getList;
  public async mounted() {
    await this.getList();
  }
}

