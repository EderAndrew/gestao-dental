export interface IUser{
  id?: number;
  name: string;
  email: string;
  password?: string;
  tel?: string;
  status: boolean;
  role: string;
  officeId?: string;
  firstAccess?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
