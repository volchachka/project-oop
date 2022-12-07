import { ObjectStorage } from "./ObjectStorage";
import { Unit } from "../objects/Unit";
import { Handle } from "../objects/Handle";

const objectStorage = ObjectStorage.getInstance();

export const init = () => {
  objectStorage.registerWrapper("unit", (handle) => {
    return new Unit(handle);
  });

  objectStorage.registerWrapper("handle", (handle) => {
    return new Handle(handle);
  });
};
