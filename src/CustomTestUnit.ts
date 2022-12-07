import { Unit } from "./objects/Unit";

export class CustomTestUnit extends Unit {
  constructor(handle: HUnit);
  constructor(handle: HPlayer, unit: number, x: number, y: number, face: number);
  constructor(handle: HPlayer, unit: number, x: number, y: number, face: number, corpse: boolean);
  constructor(handle: HPlayer, unitName: string, x: number, y: number, face: number);
  constructor(handleOrPlayer: any, unit?: number | string, x?: number, y?: number, face?: number, corpse?: boolean) {
    super(handleOrPlayer, unit as number, x as number, y as number, face as number, corpse as boolean);
  }
}
