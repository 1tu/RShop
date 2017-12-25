import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UserAction, UserState } from '../../../store/modules/index';
import { UserEntity } from '../../../../server/modules/user/user.entity';
import { TableHeader } from '../../../helpers/index';

@Component({ template: require('./RUser.list.pug') })
export class RUserList extends Vue {
  @UserState list: UserEntity[];
  headers: TableHeader<UserEntity>[] = [
    { value: 'id', text: 'Id', align: 'left', sortable: false },
    { value: 'email', text: 'Email' },
    { value: 'username', text: 'Username' },
    { value: 'role', text: 'Role' },
    {
      text: 'Actions', sortable: false, actionList: [
        { name: 'info', icon: 'info', onClick: ((id: number) => this._routeTo(`/user/${id}`)) },
        { name: 'edit', icon: 'edit', onClick: (id: number) => this._routeTo(`/user/${id}/edit`) },
        { name: 'delete', icon: 'delete', onClick: (id: number) => this.delete(id) },
      ]
    },
  ];

  @UserAction delete;
  @UserAction getList;
  public async mounted() {
    await this.getList();
  }

  private _routeTo(path) {
    this.$router.push(path);
  }
}

