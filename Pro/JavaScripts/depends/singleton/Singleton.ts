/**
 * @returns 单例类
 */
export function Singleton<T>() {

    return class Singleton {
        private static _instance: T = null!;

        public static get instance(): T {
            if (!this._instance) {
                this._instance = new this() as T;
            }
            return this._instance;

        }
    };

}
