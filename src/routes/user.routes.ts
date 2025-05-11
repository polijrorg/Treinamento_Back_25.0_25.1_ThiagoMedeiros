import { Router, Request, Response } from "express";

import UserRepository from "../repositories/UserRepository";
import UserService from "../services/UserService";

const userRouter = Router();
export const userRepository = new UserRepository();

// =============================================================================================================================
userRouter.post('/create', (request: Request, response: Response) => {
    const { userName, userEmail, userCPF, userPhone, userPassword } = request.body;
        
    if (!userName || !userEmail || !userCPF || !userPhone || !userPassword) {
        return response.status(400).json({
            message: 'Todos os campos são obrigatórios',
        });
    }

    const createService = new UserService(userRepository);

    const usuario = createService.createUser({userName, userEmail, userCPF, userPhone, userPassword});
    return response.status(200).json(usuario);
});

// =============================================================================================================================
userRouter.get('/getAllUsers', (request: Request, response: Response) => {
    const getAllUsersService = new UserService(userRepository);
    const users = getAllUsersService.getAllUsers();
    return response.json(users);
});

// =============================================================================================================================
userRouter.get('/id:', (request: Request, response: Response) => {
    // try {
        const getService = new UserService(userRepository); 
        const usuario = getService.getUserById(request.params.userId);
        return response.status(200).json(usuario); 

    // } catch (e: any) { 
    //     return response.status(400).json({error: e.message});
    // }
});

// =============================================================================================================================
userRouter.put('/:id', (request: Request, response: Response) => {
    const {userName, userEmail, userCPF, userPhone, userPassword} = request.body;

    if (!userName || !userEmail || !userCPF || !userPhone || !userPassword) {
        return response.status(400).json({
        message: 'Todos os campos são obrigatórios',
        });
    }

    const updateService = new UserService(userRepository);
    const updatedUser = updateService.update(request.params.userId, userName, userEmail, userCPF, userPhone, userPassword);

    if (!updatedUser) {
        return response.status(400).json({ message: 'usuário não encontrado' });
    }

    return response.json(updatedUser)
});

// ==========================================================================================================================
userRouter.delete('/:id', (request: Request, response: Response) => {
    const { userId } = request.params;

    const deleteService = new UserService(userRepository);
    const deleted = deleteService.deleteUser(userId); // request.params.userId

    if (!deleted) {
        return response.status(400).json({ message: 'usuário não encontrado' });
     }

    return response.status(200).send();
});
// ===========================================================================================================================


export default userRouter;