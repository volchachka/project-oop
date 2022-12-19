import { RemoveHandleEvent } from "../objects/events/RemoveHandleEvent";
import { Handle } from "../objects/Handle";
import { Unit } from "../objects/Unit";

interface ObjectOptions {
  object: Handle;
  onRemove: (e: RemoveHandleEvent<Handle>) => void;
}

declare function type(handle: HHandle): "handle";
declare function type(handle: HUnit): "unit";

export type AvialableHandleTypes = "unit" | "handle";

export class ObjectStorage {
  private static readonly dataStorage: ObjectStorage = new ObjectStorage();

  public static getInstance() {
    return this.dataStorage;
  }

  private storedHandles: Map<HHandle, ObjectOptions> = new Map();

  private handleWrappers: Map<AvialableHandleTypes, (Handle: HHandle) => Handle> = new Map();

  private constructor() {}

  public set(handle: HHandle, object: Handle): void {
    this.delete(handle);
    this.insert(handle, object);
  }

  public setIfAbsent(handle: HHandle | null, object: Handle): void {
    if (!handle) return;

    const storedObject = this.storedHandles.get(handle);
    if (storedObject) return;

    this.insert(handle, object);
  }

  public delete(handle: HHandle | null): void {
    if (!handle) return;

    const storedObject = this.storedHandles.get(handle);

    if (storedObject) {
      storedObject.object.removeEventListener("remove", storedObject.onRemove);
      this.storedHandles.delete(handle);
    }
  }

  public get(handle: HHandle | null): Handle | undefined {
    if (!handle) return;
    return this.storedHandles.get(handle)?.object;
  }

  public getOrWrap<T extends Handle>(handle: HHandle) : T
  public getOrWrap<T extends Handle>(handle: null) : null
  public getOrWrap<T extends Handle>(handle: HHandle | null): T | null {

    if(handle == null)
      return null;

    const storedObject = this.storedHandles.get(handle);

    if (storedObject) return storedObject?.object as T;

    const wrapper = this.handleWrappers.get(type(handle));

    if (!wrapper) {
      throw new TypeError(`Wrapper for ${type(handle)} not registerd`);
    }

    const newObject = wrapper(handle);
    this.set(handle, newObject);

    return newObject as T;
  }

  private insert(handle: HHandle | null, object: Handle) {
    if (!handle) return;

    const objectOptions: ObjectOptions = {
      object,
      onRemove: (e: RemoveHandleEvent<Handle>) => {
        const handle = e.detail.toHandle();
        if (handle) this.delete(handle);
      },
    };

    object.addEventListener("remove", objectOptions.onRemove);

    this.storedHandles.set(handle, objectOptions);
  }

  public registerWrapper(type: "unit", callback: (unit: HUnit) => Unit): void;
  public registerWrapper(type: "handle", callback: (unit: HHandle) => Handle): void;
  public registerWrapper(type: AvialableHandleTypes, callback: (handle: any) => Handle): void {
    this.handleWrappers.set(type, callback);
  }
}
