import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

interface createUser {
  userName: string;
  userEmail: string;
  userCPF: string;
  userPhone: string;
  userPassword: string;
}

class UserService {
  private repository: UserRepository; // atributo privado

  constructor(UserRepository: UserRepository) {
    this.repository = UserRepository;
  }

  // ================================================================================
  public createUser({
    userName,
    userEmail,
    userCPF,
    userPhone,
    userPassword,
  }: createUser): User {
    const User = this.repository.createUserR({
      userName,
      userEmail,
      userCPF,
      userPhone,
      userPassword,
    });
    return User;
  }

  // ================================================================================
  public getAllUsers(): User[] {
    return this.repository.getAllUsersR();
  }

  // ===========================→=====================================================
  public getUserById(userId: string): User | undefined {
    return this.repository.getUserByIdR(userId);
  }

  // ================================================================================
  public update(
    userId: string,
    userName: string,
    userEmail: string,
    userCPF: string,
    userPhone: string,
    userPassword: string
  ): User | null {
    const userWithThisId = this.repository.getUserByIdR(userId);

    if (!userWithThisId) return null;

    return this.repository.updateR({
      userId,
      data: { userName, userEmail, userCPF, userPhone, userPassword },
    });
  }

  // ================================================================================
  public deleteUser(userId: string): boolean {
    const index = this.repository.findIndexById(userId);

    if (index === -1) return false;

    this.repository.deleteUser(index);
    return true;
  }

  // ================================================================================
}

export default UserService;
