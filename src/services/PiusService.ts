import Pius from '../models/Pius';
import PiusRepository from '../repositories/PiusRepository';

interface CreatePiu {
  message: string;
  numLike: number;
  numComment: number;
}

class PiusService {
  private piuRepository: PiusRepository;

  constructor(PiusRepository: PiusRepository) {
    this.piuRepository = PiusRepository;
  }

  // ================================================================================
  public createPiu({ message, numLike, numComment }: CreatePiu): Pius {
    const Piu = this.piuRepository.createPiuR({ message, numLike, numComment });
    return Piu;
  }

  // ================================================================================
  public getAllPius(): Pius[] {
    return this.piuRepository.getAllPiusR();
  }

  // ================================================================================
  public deletePiu(piuId: string): boolean {
    const index = this.piuRepository.findIndexById(piuId);

    if (index === -1) return false;

    this.piuRepository.deletePiu(index);
    return true;
  }

  // =================================Extra==========================================
  public getPiuById(piuId: string): Pius | undefined {
    return this.piuRepository.getPiuByIdR(piuId);
  }
}

export default PiusService;
