import User from '../models/User';

interface createUser {
  userName: string;
  userEmail: string;
  userCPF: string;
  userPhone: string;
  userPassword: string;
}

interface updateUser {
  userId: string;
  data: {
    userName: string;
    userEmail: string;
    userCPF: string;
    userPhone: string;
    userPassword: string;
  };
}

class UserRepository {
  private UserList: User[];

  constructor() {
    this.UserList = [];
  }
  // ================================================================================
  public createUserR({
    userName,
    userEmail,
    userCPF,
    userPhone,
    userPassword,
  }: createUser): User {
    const usuario = new User({
      userName,
      userEmail,
      userCPF,
      userPhone,
      userPassword,
    });
    this.UserList.push(usuario);
    return usuario;
  }

  // ================================================================================
  public getAllUsersR(): User[] {
    return this.UserList;
  }

  // ================================================================================
  public getUserByIdR(userId: string): User | undefined {
    return this.UserList.find((user: User) => user.userId === userId);
  }

  // ================================================================================
  public findIndexById(userId: string): number {
    return this.UserList.findIndex((user: User) => user.userId === userId);
  }

  // ================================================================================
  public updateR(data: updateUser): User {
    const index = this.findIndexById(data.userId);

    this.UserList[index] = {
      ...this.UserList[index],
      ...data.data,
    };
    return this.UserList[index];
  }

  // ================================================================================
  public deleteUser(index: number): void {
    this.UserList.splice(index, 1);
  }

  // ================================================================================
}

export default UserRepository;
