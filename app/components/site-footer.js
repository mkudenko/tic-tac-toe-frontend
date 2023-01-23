import Component from '@glimmer/component';

export default class SiteFooterComponent extends Component {
  currentYear = new Date().getFullYear();
}
