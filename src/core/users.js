import User from './User';

const users = new Map();

export const createNewUser = (name) => {
  const timestamp = Date.now();
  const userId = `User_${timestamp}`;
  const user = new User(userId, name, { timestamp });
  users.set(userId, user);

  return user;
};

export const getUserById = (userId) => {
  if (!users.has(userId)) return null;

  return users.get(userId);
};
