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

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

    if (!cpfRegex.test(userCPF)) {
        return response.status(400).json({message: 'CPF inválido. Formato esperado: XXX.XXX.XXX-XX',});
    }

    if (!phoneRegex.test(userPhone)) {
        return response.status(400).json({message: 'Telefone inválido. Formato esperado: (XX) XXXXX-XXXX',});
    }

    const createService = new UserService(userRepository);

    const usuario = createService.createUser({userName, userEmail, userCPF, userPhone, userPassword});
    return response.status(200).json(usuario);
});

// =============================================================================================================================
userRouter.get('/getAll', (request: Request, response: Response) => {
    const getAllUsersService = new UserService(userRepository);
    const users = getAllUsersService.getAllUsers();
    return response.json(users);
});

// =============================================================================================================================
userRouter.get('/getById/:id', (request: Request, response: Response) => {
        const getService = new UserService(userRepository); 
        const usuario = getService.getUserById(request.params.id);
        return response.status(200).json(usuario); 
});

// =============================================================================================================================
userRouter.put('/update/:id', (request: Request, response: Response) => {
    const {userName, userEmail, userCPF, userPhone, userPassword} = request.body;

    if (!userName || !userEmail || !userCPF || !userPhone || !userPassword) {
        return response.status(400).json({
        message: 'Todos os campos são obrigatórios',
        });
    }

    const updateService = new UserService(userRepository);
    const updatedUser = updateService.update(request.params.id, userName, userEmail, userCPF, userPhone, userPassword);

    if (!updatedUser) {
        return response.status(400).json({ message: 'usuário não encontrado' });
    }

    return response.status(200).json(updatedUser);
});

// ==========================================================================================================================
userRouter.delete('/delete/:id', (request: Request, response: Response) => {
    const { id } = request.params;

    const deleteService = new UserService(userRepository);
    const deleted = deleteService.deleteUser(id); // request.params.userId

    if (!deleted) {
        return response.status(400).json({ message: 'usuário não encontrado' });
     }

    return response.status(200).json({message: 'usuário excluido com sucesso'});
});

// ===========================================================================================================================


export default userRouter;