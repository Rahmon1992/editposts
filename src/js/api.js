/**
 * This is an API client.
 */

 import _ from 'lodash';

const POST_KEY_PREFIX = 'chairnerd.post';
const MAX_POST_KEY = 'chairnerd.maxPostId';

if (!window.localStorage) {
  throw new Error('You must use a browser that supports local storage.');
}

const API = {
  get(id) {
    const result = {
      status: 200
    };

    if (id) {
      const post = localStorage.getItem(`chairnerd.post${id}`);
      if (post === undefined) {
        result.status = 404;
      }
      result.body = post;
    } else {
      const postKeys = Object.keys(localStorage).filter(key => key.match(POST_KEY_PREFIX));

      result.body = postKeys.map(v => localStorage.getItem(v));
    }

    return result;
  },

  post(data) {
    const result = {
      status: 200
    };

    if (!data.title || !data.body || !_.isPlainObject(data)) {
      result.status = 400;
    } else {
      const maxId = localStorage.getItem(MAX_POST_KEY);
      const lastPostId = !maxId ? 1 : parseInt(maxId, 10) + 1;
      data.id = data.id || lastPostId;

      const stringData = JSON.stringify(data);
      localStorage.setItem(POST_KEY_PREFIX + data.id, stringData);
      data.id || localStorage.setItem(MAX_POST_KEY, lastPostId.toString());

      result.body = stringData;
    }

    return result;
  },

  delete(id) {
    localStorage.removeItem(POST_KEY_PREFIX + id);
  }
}

export default API;
