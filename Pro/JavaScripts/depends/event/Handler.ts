/**
* 是事件处理器类
* 推荐使用 THandler.create() 方法从对象池创建，减少对象创建消耗。创建的 _THandler 对象不再使用后，可以使用 _THandler.recover() 将其回收到对象池，回收后不要再使用此对象，否则会导致不可预料的错误。
* 注意：由于鼠标事件也用本对象池，不正确的回收及调用，可能会影响鼠标事件的执行。
*/

type Fn<T extends any[]> = (...args: T) => any

type InferFnArgs<T> = T extends Fn<infer A> ? A : any

type AnyFunction = (...args: unknown[]) => unknown;
// eslint-disable-next-line @typescript-eslint/naming-convention
export class THandler<T extends AnyFunction> {
	/**@private handler对象池*/
	protected static _pool: THandler<any>[] = [];

	/**@private */
	private static _gid = 1;

	/** 执行域(this)。*/
	caller: unknown | null;

	/** 处理方法。*/
	method: T;

	/** 参数。*/
	args: any[] | null;

	/** 表示是否只执行一次。如果为true，回调后执行recover()进行回收，回收后会被再利用，默认为false 。*/
	once = false;

	/**@private */
	protected _id = 0;

	public ref: number = 0;

	/**
	 * 根据指定的属性值，创建一个 <code>_THandler</code> 类的实例。
	 * @param	caller 执行域。
	 * @param	method 处理函数。
	 * @param	args 函数参数。
	 * @param	once 是否只执行一次。
	 */
	constructor(caller: unknown | null = null, method: T, args: unknown[] | null = null, once = false) {
		this.setTo(caller, method, args, once);
	}

	/**
	 * 设置此对象的指定属性值。
	 * @param	caller 执行域(this)。
	 * @param	method 回调方法。
	 * @param	args 携带的参数。
	 * @param	once 是否只执行一次，如果为true，执行后执行recover()进行回收。
	 * @return  返回 handler 本身。
	 */
	setTo(caller: any, method: T, args?: unknown[] | null, once = false): THandler<T> {
		this._id = THandler._gid++;
		this.caller = caller;
		this.method = method;
		this.args = args;
		this.once = once;
		return this;
	}

	/**
	 * 执行处理器。
	 */
	run(): any {
		if (this.method === null) return null;
		const id: number = this._id;
		const result: any = this.method.apply(this.caller, this.args);
		this._id === id && this.once && this.recover();
		return result;
	}

	/**
	 * 执行处理器，并携带额外数据。
	 * @param	data 附加的回调数据，可以是单数据或者Array(作为多参)。
	 */
	runWith(...args: InferFnArgs<T>): any {
		if (this.method === null) return null;
		const id: number = this._id;
		let result: unknown;
		if (args === null)
			result = this.method.apply(this.caller, this.args);
		else if (this.args) {
			result = this.method.apply(this.caller, [...args, ...this.args]);
		} else {
			result = this.method.apply(this.caller, args);
		}
		this._id === id && this.once && this.recover();
		return result;
	}

	/**
	 * 清理对象引用。
	 */
	clear(): THandler<T> {
		this.caller = null;
		this.method = null;
		this.args = null;
		return this;
	}

	/**
	 * 清理并回收到 _THandler 对象池内。
	 */
	recover(): void {
		if (this._id > 0) {
			this._id = 0;
			this.ref -= 1;
			THandler._pool.push(this.clear());
		}
	}

	/**
	 * 从对象池内创建一个Handler，默认会执行一次并立即回收，如果不需要自动回收，设置once参数为false。
	 * @param	caller 执行域(this)。
	 * @param	method 回调方法。
	 * @param	args 携带的参数。
	 * @param	once 是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
	 * @return  返回创建的handler实例。
	 */
	static create<T extends AnyFunction>(caller: any, method: T, args: any[] | null = null, once = false): THandler<T> {
		let ret: THandler<T>;
		if (THandler._pool.length)
			ret = (THandler._pool.pop() as THandler<any>).setTo(caller, method, args, once);
		else
			ret = new THandler<T>(caller, method, args, once);
		ret.ref += 1
		if (ret.ref > 1) {
			throw new Error("handler ref error");
		}
		return ret;

	}

	static is(obj: unknown): obj is Handler {
		return obj['run'] && obj['runWith'];
	}
}

export class Handler extends THandler<any> {


}
