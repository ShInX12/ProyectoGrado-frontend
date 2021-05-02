import { Process } from '../models/process';
import { ProcessDTO } from '../DTO/processDTO';

export function toProcess(processDTO: ProcessDTO): Process {
  return new Process(
    processDTO.uid,
    processDTO.name,
    processDTO.code,
    processDTO.description,
    processDTO.state.uid,
    processDTO.process_type.uid,
    processDTO.enable_chat
  );
}
