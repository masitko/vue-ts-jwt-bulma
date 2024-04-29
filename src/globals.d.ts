

export enum RoleNames {
  User = 'ROLE_USER',
  Admin = 'ROLE_ADMIN',
  Moderator = 'ROLE_MODERATOR',
}

declare global {
  interface IRole {
    _id?: number;
    name: RoleNames;
  }

  interface IUser {
    _id?: number;
    id?: number;
    username: string;
    password?: string;
    email: string;
    roles?: IRole[];
    roleNames?: RoleNames[];
    accessToken: string;
  }

  interface IAUthState {
    status: {
      loggedIn: boolean;
    };
    user: IUser | null;
  }

}

export default {};