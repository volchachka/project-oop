import { Unit } from "./objects/Unit";
import { setTimeout } from "./utils/timer";
import { CustomTestUnit } from "./CustomTestUnit";
import { UnitEvent } from "./objects/events/unit/UnitEvent";


const dumpType = (e: UnitEvent) => {
  e.detail.triggerUnit.setBonusDamageByIndex(0, e.detail.triggerUnit.getBonusDamageByIndex(0) + 50);
};

const resp = (e: UnitEvent) => {
  e.detail.triggerUnit.reviveHero(0, 0, true);
};

const customUnit = new CustomTestUnit(Player(1), FourCC("Hpal"), 0, 0, 0);
const unit = new Unit(Player(0), FourCC("Hpal"), 0, 0, 0);

unit.lifeRegen += 10;

unit.addEventListener("selected", dumpType);
customUnit.addEventListener("selected", dumpType);

unit.addEventListener("death", resp);
customUnit.addEventListener("death", resp);
