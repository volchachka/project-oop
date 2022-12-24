import { Unit } from "./objects/Unit";
import { setTimeout } from "./utils/timer";
import { CustomTestUnit } from "./CustomTestUnit";
import { UnitEvent } from "./objects/events/unit/UnitEvent";
import { GamePlayer } from "./objects/GamePlayer";
import { Handle } from "./objects/Handle";
import { Widget } from "./objects/Widget";

const dumpType = (e: UnitEvent) => {
  e.detail.triggerUnit.setBonusDamageByIndex(0, e.detail.triggerUnit.getBonusDamageByIndex(0) + 50);
};

const resp = (e: UnitEvent) => {
  e.detail.triggerUnit.reviveHero(0, 0, true);
};

FourCC("Hpal");

const customUnit = new CustomTestUnit(Player(2), FourCC("Hpal"), 0, 0, 0);
const unit = new Unit(Player(0), FourCC("Hpal"), 0, 0, 0);

unit.kill().reviveHero(0, 0, true);

unit.life(10).lifeRegen(20);

const widget = {} as Widget;
const hwidget = {} as HWidget;

SetWidgetLife(hwidget, 500);

widget
  .life(10)
  .pitch(20)
  .x((x) => x + 20)
  .y((y) => y / 10);

unit.addEventListener("selected", dumpType);
customUnit.addEventListener("selected", dumpType);

unit.addEventListener("death", resp);
customUnit.addEventListener("death", resp);

unit.addEventListener("damaged", (e) => {
  e.detail;
});

[1, 2, 3, 4].find(() => {});
