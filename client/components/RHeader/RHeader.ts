import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { store, Mutation } from '../../store/';

@Component({
  template: require('./RHeader.pug'),
})
export class RHeader extends Vue {
  @Mutation toggleNav;

  switchLang() {
    localStorage.language = this.$i18n.locale === 'en' ? 'ru' : 'en';
    location.reload();
  }
}

