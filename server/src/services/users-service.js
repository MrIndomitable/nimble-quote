const Users = () => {
  const _users = {};

  const findById = (id, cb) => {
    cb(null, _users[id]);
  };

  return {
    findById: (id, cb) => {
      cb(null, _users[id]);
    },
    findOne: (query, cb) => {
      const id = query['google.id'];
      findById(id, cb);
    },
    save: (user, cb) => {
      _users[user.google.id] = user;
      cb();
    }
  }
};

module.exports = {Users};