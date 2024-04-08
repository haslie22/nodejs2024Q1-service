type User = {
  id: string;
  login: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
};

export function prismaModifyUser(user: User) {
  return {
    ...user,
    createdAt: user.createdAt.getTime(),
    updatedAt: user.updatedAt.getTime(),
  };
}
