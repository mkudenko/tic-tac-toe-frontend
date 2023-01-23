import ENV from 'tic-tac-toe-frontend/config/environment';
import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = ENV.APP.apiHost;
  namespace = 'api';
}
