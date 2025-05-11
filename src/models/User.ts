import { randomUUID } from "crypto";

interface UserRequest {
    userName: string;
    userEmail: string;
    userCPF: string;
    userPhone: string;
    userPassword: string;
}

class User {
    userName: string;
    userEmail: string;
    userCPF: string;
    userPhone: string;
    userPassword: string;
    userId: string;

    constructor(data: UserRequest) {
        this.userName = data.userName;
        this.userEmail = data.userEmail;
        this.userCPF = data.userCPF;
        this.userPhone = data.userPhone;
        this.userPassword = data.userPassword;
        this.userId = randomUUID();
    }
}

export default User;

