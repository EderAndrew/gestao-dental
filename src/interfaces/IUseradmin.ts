export interface IUseradmin {
  id?: number
  name: string
  email: string
  password: string
  status?: boolean
  role?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IUser{
  id: number;
  name: string;
  email: string;
  password?: string;
  tel?: string;
  status: boolean;
  role: string;
  officeId: number;
  firstAccess?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
