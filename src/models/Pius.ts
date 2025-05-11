import { randomUUID } from "crypto";

interface RequestPiu {
    message: string;       
    numLike: number;      
    numComment: number;
}

class Pius {
    piuId: string;         //id do usuário 
    message: string;       // texto
    numLike: number;       //número de likes
    numComment: number;    //número de comentários
    publishData: Date;
    updatedData: Date;

    constructor(data: RequestPiu) {
        this.message = data.message;
        this.numLike = data.numLike;
        this.numComment = data.numComment;
        this.publishData = new Date();
        this.updatedData = new Date();
        this.piuId = randomUUID();
    }
}

export default Pius;
