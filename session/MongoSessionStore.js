import { resolveScoped } from '../database/resolve';

export default class MongoSessionStore {
  constructor({ id }) {
    this._id = id;
  }

  async init() {
    this._db = await resolveScoped(this._id);
    return this;
  }

  async get(key) {
    const [platform, id] = key.split(':');
    const filter = {
      'user.platform': platform,
      'user.id': id,
    };
    return this._sessions.findOne(filter);
  }

  async set(key, sess /* , maxAge */) {
    const [platform, id] = key.split(':');
    let filter;
    if (sess._id) {
      filter = {
        _id: sess._id,
      };
    } else {
      filter = {
        'user.platform': platform,
        'user.id': id,
      };
    }

    const result = this._sessions.replaceOne(filter, sess, { upsert: true });
    if (result && result.upsertedId && result.upsertedId._id) {
      sess._id = result.upsertedId._id;
    }
  }

  async destroy(key) {
    const [platform, id] = key.split(':');
    const filter = {
      'user.platform': platform,
      'user.id': id,
    };
    return this._sessions.remove(filter);
  }

  async save(key, sess /* , maxAge */) {
    const filter = {
      _id: sess._id,
    };
    return this._sessions.replaceOne(filter, sess);
  }

  get _sessions() {
    return this._db.collection('sessions');
  }
}
