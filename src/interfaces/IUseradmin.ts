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