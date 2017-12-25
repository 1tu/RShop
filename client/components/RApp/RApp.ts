import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { RHeader, RNav } from '../';

@Component({
  template: require('./RApp.pug'),
  components: { RHeader, RNav }
})
export class RApp extends Vue { }
