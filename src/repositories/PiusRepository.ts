import Pius from '../models/Pius';

interface CreatePiu {
  message: string;
  numLike: number;
  numComment: number;
}

class PiusRepository {
  private PiusList: Pius[];

  constructor() {
    this.PiusList = [];
  }

  // ================================================================================
  public createPiuR(data: CreatePiu): Pius {
    const piu = new Pius(data);
    this.PiusList.push(piu);
    return piu;
  }

  // ================================================================================
  public getAllPiusR(): Pius[] {
    return this.PiusList;
  }

  // ================================================================================
  public findIndexById(piuId: string): number {
    return this.PiusList.findIndex((piu: Pius) => piu.piuId === piuId);
  }

  // ================================================================================
  public deletePiu(index: number): void {
    this.PiusList.splice(index, 1);
  }

  // ================================================================================
  public getPiuByIdR(piuId: string): Pius | undefined {
    return this.PiusList.find((piu: Pius) => piu.piuId === piuId);
  }

  // ================================================================================
}

export default PiusRepository;
