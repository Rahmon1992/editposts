import API from './api';
import _ from 'lodash';

export default class Post {
  constructor(attrs) {
    this.attributes = {
      id: attrs.id,
      title: attrs.title,
      body: attrs.body
    };
  }

  update(updateObject) {
    this.attributes = _.extend(this.attributes, updateObject);
  }

  save() {
    return API.post(this.attributes);
  }

  delete() {
    API.delete(this.attributes.id);
  }

}
