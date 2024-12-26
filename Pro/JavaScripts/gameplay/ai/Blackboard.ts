export default class Blackboard {
    private _data: Map<string, ValueType> = new Map();

    write(k: string) {
        this._data.set(k, null);
    }

    set(k: string, v: ValueType) {
        if (this._data.has(k)) {
            this._data.set(k, v);
        }
    }

    get<T extends ValueType>(k: string) {
        return this._data.get(k) as T;
    }
}


type ValueType = string | number | boolean; 
