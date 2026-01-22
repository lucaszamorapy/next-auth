export interface IUser {
  id?: string;
  name?: string;
  email: string;
  password: string;
}

const users: IUser[] = [
  {
    id: "1",
    email: "lucas@email.com",
    password: "123456"
  },
  {
    id: "2",
    email: "gustavo@email.com",
    password: "123456"
  },
  {
    id: "3",
    email: "wesley@email.com",
    password: "123456"
  }
]

export const getUserByEmail = (email: string) => {
  const found = users.find((u) => u.email === email)
  return found;
}