export interface IUser {
  id: number;
  name: string;
  fullName: string;
  email: string;
  password?: string;
  creationDate?: Date;
}

export interface IUserResponse {
  statusCode: number;
  error: string;
  message: string;
  token: string;
  refreshToken: string;
  expirationTime: string;

  username: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  firstLogin: boolean;
  emailVerified: boolean;
  emailNotifications: boolean;
  creationDate: Date;

  ourUser: IUser;
  ourUsersList: IUser[];
}

export class User implements IUser {
  id: number;
  name: string;
  fullName: string;
  email: string;
  password: string;
  creationDate: Date;

  constructor(id: number, name: string, fullName: string, email: string, password: string, creationDate: Date) {
    this.id = id;
    this.name = name;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.creationDate = creationDate;
  }
}
