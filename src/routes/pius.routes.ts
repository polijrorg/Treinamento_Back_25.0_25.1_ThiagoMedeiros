import { Router, Request, Response } from "express";

import PiusRepository from "../repositories/PiusRepository";
import PiusService from "../services/PiusService";

const piusRouter = Router();
export const repository = new PiusRepository();

// ================================================================================
piusRouter.post('/createPiu', (request: Request, response: Response) => {
    const { message, numLike, numComment } = request.body;

    if(!message || !numLike || !numComment) {
        return response.status(400).json({message: "piu inválido"})
    }

    const addPiuService = new PiusService(repository);

    const piu = addPiuService.createPiu({message, numLike, numComment});
    return response.status(200).json(piu); 
});

// ================================================================================
piusRouter.get('/getAllPius', (request: Request, response: Response) => {
    const getAllPiusService = new PiusService(repository);
    const pius = getAllPiusService.getAllPius();
    return response.json(pius);
});

// ================================================================================
piusRouter.delete('/:id', (request: Request, response: Response) => {
    const deletePiuService = new PiusService(repository);
    const deletedPiu = deletePiuService.deletePiu(request.params.piuId)
    
    if(!deletedPiu) {
        return response.status(400).json({ message: 'piu não encontrado'});
    }

    return response.status(200).send();
});

// ================================================================================

piusRouter.get('/piuId:', (request: Request, response: Response) => {
    const getPiuService = new PiusService(repository);
    const determinedPiu = getPiuService.getPiuById(request.params.piuId);
    return response.status(200).json(determinedPiu);
});


export default piusRouter;