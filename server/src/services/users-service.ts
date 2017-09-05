export const Users = () => {
  const _users: { [id: string]: string; } = {};

  const findById = (id: string, cb: any) => {
    cb(null, _users[id]);
  };

  return {
    findById: (id: string, cb: any) => {
      cb(null, _users[id]);
    },
    findOne: (query: any, cb: any) => {
      const id = query['google.id'];
      findById(id, cb);
    },
    save: (user: any, cb: any) => {
      _users[user.google.id] = user;
      cb();
    }
  }
};