'use strict';

var MWResource;
(function (MWResource) {
    /**触发器 */
    MWResource.TRIGGER = "Trigger";
    /**锚点 */
    MWResource.ANCHOR = "Anchor";
    /**玩家角色 */
    MWResource.CHARACTER = "Character";
    /**方块 */
    MWResource.CUBE = "197386";
    /**球体 */
    MWResource.SPHERE = "197388";
    /**世界UI */
    MWResource.UI_WIDGET = "UIWidget";
})(MWResource || (MWResource = {}));

/**
* 是事件处理器类
* 推荐使用 THandler.create() 方法从对象池创建，减少对象创建消耗。创建的 _THandler 对象不再使用后，可以使用 _THandler.recover() 将其回收到对象池，回收后不要再使用此对象，否则会导致不可预料的错误。
* 注意：由于鼠标事件也用本对象池，不正确的回收及调用，可能会影响鼠标事件的执行。
*/
// eslint-disable-next-line @typescript-eslint/naming-convention
class THandler {
    /**
     * 根据指定的属性值，创建一个 <code>_THandler</code> 类的实例。
     * @param	caller 执行域。
     * @param	method 处理函数。
     * @param	args 函数参数。
     * @param	once 是否只执行一次。
     */
    constructor(caller = null, method, args = null, once = false) {
        /** 表示是否只执行一次。如果为true，回调后执行recover()进行回收，回收后会被再利用，默认为false 。*/
        this.once = false;
        /**@private */
        this._id = 0;
        this.ref = 0;
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
    setTo(caller, method, args, once = false) {
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
    run() {
        if (this.method === null)
            return null;
        const id = this._id;
        const result = this.method.apply(this.caller, this.args);
        this._id === id && this.once && this.recover();
        return result;
    }
    /**
     * 执行处理器，并携带额外数据。
     * @param	data 附加的回调数据，可以是单数据或者Array(作为多参)。
     */
    runWith(...args) {
        if (this.method === null)
            return null;
        const id = this._id;
        let result;
        if (args === null)
            result = this.method.apply(this.caller, this.args);
        else if (this.args) {
            result = this.method.apply(this.caller, [...args, ...this.args]);
        }
        else {
            result = this.method.apply(this.caller, args);
        }
        this._id === id && this.once && this.recover();
        return result;
    }
    /**
     * 清理对象引用。
     */
    clear() {
        this.caller = null;
        this.method = null;
        this.args = null;
        return this;
    }
    /**
     * 清理并回收到 _THandler 对象池内。
     */
    recover() {
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
    static create(caller, method, args = null, once = false) {
        let ret;
        if (THandler._pool.length)
            ret = THandler._pool.pop().setTo(caller, method, args, once);
        else
            ret = new THandler(caller, method, args, once);
        ret.ref += 1;
        if (ret.ref > 1) {
            throw new Error("handler ref error");
        }
        return ret;
    }
    static is(obj) {
        return obj['run'] && obj['runWith'];
    }
}
/**@private handler对象池*/
THandler._pool = [];
/**@private */
THandler._gid = 1;
class Handler extends THandler {
}

var foreign3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Handler: Handler,
    THandler: THandler
});

/**
 * EventDispatcher类是可调度事件的所有类的基类。
 */
class EventDispatcher {
    /**
     * 检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器。
     * @param	type 事件的类型。
     * @return 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
     */
    hasListener(type) {
        const listener = this._events && this._events[type];
        return !!listener;
    }
    /**
     * 派发事件。
     * @param type	事件类型。
     * @param data	（可选）回调数据。
     * @return 此事件类型是否有侦听者，如果有侦听者则值为 true，否则值为 false。
     */
    event(type, ...data) {
        if (!this._events || !this._events[type])
            return false;
        const listeners = this._events[type];
        if (EventHandler.is(listeners)) {
            if (listeners.once)
                delete this._events[type];
            data !== null ? listeners.runWith(...data) : listeners.run();
        }
        else {
            for (let i = 0, n = listeners.length; i < n; i++) {
                const listener = listeners[i];
                if (listener) {
                    (data !== null) ? listener.runWith(...data) : listener.run();
                }
                if (!listener || listener.once) {
                    listeners.splice(i, 1);
                    i--;
                    n--;
                }
            }
            if (listeners.length === 0 && this._events)
                delete this._events[type];
        }
        return true;
    }
    /**
     * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
     * @param type		事件的类型。
     * @param caller	事件侦听函数的执行域。
     * @param listener	事件侦听函数。
     * @param args		（可选）事件侦听函数的回调参数。
     * @return 此 EventDispatcher 对象。
     */
    on(type, caller, listener, ...args) {
        return this.createListener(type, caller, listener, args, false);
    }
    /**
     * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
     * @param type		事件的类型。
     * @param caller	事件侦听函数的执行域。
     * @param listener	事件侦听函数。
     * @param args		（可选）事件侦听函数的回调参数。
     * @return 此 EventDispatcher 对象。
     */
    once(type, caller, listener, ...args) {
        return this.createListener(type, caller, listener, args, true);
    }
    createListener(type, caller, listener, args, once, offBefore = true) {
        //移除之前相同的监听
        offBefore && this.off(type, caller, listener, once);
        //使用对象池进行创建回收
        const handler = EventHandler.create(caller || this, listener, args, once);
        this._events || (this._events = {});
        const events = this._events;
        //默认单个，每个对象只有多个监听才用数组，节省一个数组的消耗
        if (!events[type])
            events[type] = handler;
        else {
            if (!events[type].run)
                events[type].push(handler);
            else
                events[type] = [events[type], handler];
        }
        return this;
    }
    /**
     * 从 EventDispatcher 对象中删除侦听器。
     * @param type		事件的类型。
     * @param caller	事件侦听函数的执行域。
     * @param listener	事件侦听函数。
     * @param onceOnly	（可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
     * @return 此 EventDispatcher 对象。
     */
    off(type, caller, listener, onceOnly = false) {
        if (!this._events || !this._events[type])
            return this;
        const listeners = this._events[type];
        if (listeners !== null) {
            if (EventHandler.is(listeners)) {
                if ((!caller || listeners.caller === caller) && (listener === null || listeners.method === listener) && (!onceOnly || listeners.once)) {
                    delete this._events[type];
                    listeners.recover();
                }
            }
            else {
                let count = 0;
                const n = listeners.length;
                for (let i = 0; i < n; i++) {
                    const item = listeners[i];
                    if (!item) {
                        count++;
                        continue;
                    }
                    if (item && (!caller || item.caller === caller) && (listener === null || item.method === listener) && (!onceOnly || item.once)) {
                        count++;
                        listeners[i] = null;
                        item.recover();
                    }
                }
                //如果全部移除，则删除索引
                if (count === n)
                    delete this._events[type];
            }
        }
        return this;
    }
    /**
     * 从 EventDispatcher 对象中删除指定事件类型的所有侦听器。
     * @param type	（可选）事件类型，如果值为 null，则移除本对象所有类型的侦听器。
     * @return 此 EventDispatcher 对象。
     */
    offAll(type = null) {
        const events = this._events;
        if (!events)
            return this;
        if (type) {
            this.recoverHandlers(events[type]);
            delete events[type];
        }
        else {
            for (const name in events) {
                this.recoverHandlers(events[name]);
            }
            this._events = null;
        }
        return this;
    }
    /**
     * 移除caller为target的所有事件监听
     * @param	caller caller对象
     */
    offAllCaller(caller) {
        if (caller && this._events) {
            for (const name in this._events) {
                this.off(name, caller, null);
            }
        }
        return this;
    }
    recoverHandlers(arr) {
        if (!arr)
            return;
        if (arr.run) {
            arr.recover();
        }
        else {
            for (let i = arr.length - 1; i > -1; i--) {
                if (arr[i]) {
                    arr[i].recover();
                    arr[i] = null;
                }
            }
        }
    }
}
/**@private */
class EventHandler extends Handler {
    constructor(caller, method, args, once) {
        super(caller, method, args, once);
    }
    /**
     * @override
     */
    recover() {
        if (this._id > 0) {
            this._id = 0;
            EventHandler._pool.push(this.clear());
        }
    }
    /**
     * 从对象池内创建一个Handler，默认会执行一次回收，如果不需要自动回收，设置once参数为false。
     * @param caller	执行域(this)。
     * @param method	回调方法。
     * @param args		（可选）携带的参数。
     * @param once		（可选）是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
     * @return 返回创建的handler实例。
     */
    static create(caller, method, args = null, once = true) {
        if (EventHandler._pool.length)
            return EventHandler._pool.pop().setTo(caller, method, args, once);
        return new EventHandler(caller, method, args, once);
    }
}
/**@private handler对象池*/
EventHandler._pool = [];

var foreign2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    EventDispatcher: EventDispatcher
});

var RandomUtils;
(function (RandomUtils) {
    // =================================================normal=======================================================
    /**
     * 获取GUID
     */
    function getUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    RandomUtils.getUUID = getUUID;
    /**
     * 范围取值 [min,max)
     * @param min 最小值
     * @param max 最大值
     * @returns int
     */
    function range(min, max) {
        let offset = Math.random() * (max - min);
        return Math.floor(offset + min);
    }
    RandomUtils.range = range;
    /**
     * 种子随机，保证各端随机结果的一致性
     */
    class SeedRandom {
        /** 随机数*/
        static random() {
            this.seed = (this.seed * this.randomParams[2] + this.randomParams[1]) % this.randomParams[0];
            let randomNumber = this.seed / this.randomParams[0];
            return randomNumber;
        }
        /**权重随机*/
        static weight(weight) {
            if (!weight || weight.length === 0) {
                return -1;
            }
            let sum = 0;
            for (let i = 0; i < weight.length; i++) {
                sum += weight[i];
            }
            let chance = this.random() * sum;
            for (let j = 0; j < weight.length; j++) {
                if (chance < weight[j]) {
                    return j;
                }
                chance -= weight[j];
            }
        }
        /**高斯随机数*/
        static randG() {
            let rand = 0;
            for (let i = 0; i < 6; i += 1) {
                rand += this.random();
            }
            return rand / 6;
        }
        /**范围随机（左闭右开）*/
        static range(min, max) {
            let offset = this.random() * (max - min);
            return Math.floor(offset + min);
        }
    }
    SeedRandom.randomParams = [233, 255, 100];
    SeedRandom.seed = 8;
    RandomUtils.SeedRandom = SeedRandom;
})(RandomUtils || (RandomUtils = {}));

var foreign75 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get RandomUtils () { return RandomUtils; }
});

/**
 * 泊松随机采样
 */
class PoissonDiskSampling {
    /**
     * 生成点集
     * @param radius 格子半径
     * @param samplingRegionSize 采样区域大小
     * @param numSamplingBeforeReject 拒绝前采样次数
     * @returns 点集
     */
    static generatePoints(radius, samplingRegionSize, numSamplingBeforeReject = 30) {
        let cellSize = radius / Math.sqrt(2);
        let width = Math.floor(samplingRegionSize.x / cellSize);
        let hight = Math.floor(samplingRegionSize.y / cellSize);
        let gird = new Array(width);
        gird.forEach((item, idx) => {
            gird[idx] = new Array(hight);
            gird[idx].fill(0);
        });
        let points = [];
        let spawnPoints = [];
        spawnPoints.push(samplingRegionSize.clone().divide(2)); // 默认中点
        do {
            let spawnIndex = RandomUtils.range(0, spawnPoints.length);
            let spawnCenter = spawnPoints[spawnIndex];
            let tempVec = spawnCenter.clone();
            let candidateAccepted = false;
            for (let i = 0; i < numSamplingBeforeReject; i++) {
                let angle = Math.random() * Math.PI * 2;
                let dir = new Vector2(Math.sin(angle), Math.cos(angle));
                let candidate = tempVec.set(spawnCenter.x, spawnCenter.y).add(dir);
                if (this.isValid(candidate, samplingRegionSize, cellSize, radius, points, gird)) {
                    points.push(candidate);
                    spawnCenter.add(candidate);
                    gird[Math.floor(candidate.x / cellSize)][Math.floor(candidate.y / cellSize)] = points.length;
                    candidateAccepted = true;
                    break;
                }
            }
            if (candidateAccepted) {
                spawnPoints.splice(spawnIndex);
            }
        } while (spawnPoints.length > 0);
        return points;
    }
    static isValid(candidate, sampleRegionSize, cellSize, radius, points, grid) {
        if (0 <= candidate.x && candidate.x < sampleRegionSize.x
            && 0 <= candidate.y && candidate.y < sampleRegionSize.y) {
            let cellX = Math.floor(candidate.x / cellSize);
            let cellY = Math.floor(candidate.y / cellSize);
            let searchStartX = Math.max(0, cellX - 2);
            let searchEndX = Math.min(cellX + 2, grid.length);
            let searchStartY = Math.max(0, cellY - 2);
            let searchEndY = Math.min(cellY + 2, grid[0].length);
            let tempVec = Vector2.zero;
            for (let i = searchStartX; i < searchEndX; i++) {
                for (let j = searchStartY; j < searchEndY; j++) {
                    let pointIndex = grid[i][j] - 1;
                    if (pointIndex !== -1) {
                        let dst = tempVec.set(candidate).subtract(points[pointIndex]).sqrLength;
                        if (dst < Math.pow(radius, 2)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        return false;
    }
}

var foreign4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PoissonDiskSampling
});

var RedDotDefined;
(function (RedDotDefined) {
    RedDotDefined["MAIN_BAG_EQUIP_NODE"] = "MAIN_BAG_EQUIP_NODE";
})(RedDotDefined || (RedDotDefined = {}));

/**
 * @returns 单例类
 */
function Singleton() {
    var _a;
    return _a = class Singleton {
            static get instance() {
                if (!this._instance) {
                    this._instance = new this();
                }
                return this._instance;
            }
        },
        _a._instance = null,
        _a;
}

var foreign8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Singleton: Singleton
});

/**
 * key (hashing,key,collision,loading factor)
 * key-func (find,insert,delete)
 *
 * 散列函数2个重要因素
 * 1.计算简单
 * 2.地址空间均匀分布
 *
 * 数字关键词
 * h(key) = a * key + b;直接定址法
 * h(key) = key mod p ;除余法
 * h(key) = key[n] * (10 ** n);把随机变化大的位取出来
 * h(key);折叠法
 * h(key);平方取中法
 *
 * 字符关键词
 * h(key) = (ASCLL码相加) mod TableSize;// 直接累加ASCLL
 * h(key) = (key[0] * (27 ** 2) + key[1] * (27 ** 1) + key[0]) mod TableSize;// 前移3位（26个字符 + 空格1 = 27）
 *
 */

var foreign9 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

class Blackboard {
    constructor() {
        this._data = new Map();
    }
    write(k) {
        this._data.set(k, null);
    }
    set(k, v) {
        if (this._data.has(k)) {
            this._data.set(k, v);
        }
    }
    get(k) {
        return this._data.get(k);
    }
}

var foreign11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Blackboard
});

/**
 * PPA行为树（Postcondition-Precondition-Action Behavior Tree）
 - Link https://luyuhuang.tech/2019/11/18/behavior-tree.html
 - sequence 一个条件一个动作,那么这个条件就是动作的前置---就是说条件先行，动作后行
 - fallback 一个条件一个动作,那么这个条件就是动作的后置---就是说动作先行，条件后行
 *
 */
var BTTree;
(function (BTTree) {
    class Service {
        static createBT() {
            let blackboard = new Blackboard();
            blackboard.write('A');
            blackboard.write('B');
            blackboard.write('C');
            blackboard.write('Time');
            let root = new FallbackNode(null, blackboard);
            root.blackboard = blackboard;
            let sequence = new SequenceNode(root, blackboard);
            sequence.activateCache();
            new MoveA(sequence, blackboard);
            new MoveB(sequence, blackboard);
            new MoveC(sequence, blackboard);
            setInterval(() => {
                root.execute();
            }, 100);
        }
    }
    BTTree.Service = Service;
    let RunState;
    (function (RunState) {
        RunState[RunState["READY"] = 0] = "READY";
        RunState[RunState["FAILURE"] = 1] = "FAILURE";
        RunState[RunState["SUCCESS"] = 2] = "SUCCESS";
        RunState[RunState["RUNNING"] = 3] = "RUNNING";
    })(RunState || (RunState = {}));
    /**
     * 行为结点基类
     */
    class BTNode {
        /**
         * @param parent 父节点
         */
        constructor(parent, blackboard) {
            /**黑板数据 */
            this.blackboard = null;
            /**父亲节点 */
            this.parent = null;
            /**子节点 */
            this.children = [];
            this.parent = parent;
            this.blackboard = blackboard;
            if (this.parent) {
                parent.children.push(this);
            }
        }
    }
    /**
     * 装饰节点(自定义处理节点) 【顺序、选择、平行都是特殊的装饰节点】
     */
    class DecoratorNode extends BTNode {
        /**激活缓存 */
        activateCache() {
            this.cache = [];
        }
    }
    /**
     * 动作节点
     */
    class ActionNode extends BTNode {
        constructor() {
            super(...arguments);
            this.cha = GameObject.findGameObjectById('09EBA62E');
            this._state = RunState.READY;
        }
        set state(v) {
            if (this._state === v) {
                return;
            }
            if (v === RunState.RUNNING)
                this.enter();
            else if (v === RunState.FAILURE || v === RunState.SUCCESS)
                this.exit();
            this._state = v;
        }
        get state() {
            return this._state;
        }
    }
    //#region extension SelectorNode
    /**
     * 顺序节点
     * 只有当第一个子节点返回 Success 的时候, 才会执行第二个子节点.
     */
    class SequenceNode extends DecoratorNode {
        execute() {
            for (let i = 0; i < this.children.length; i++) {
                let res;
                if (this.cache) {
                    res = this.cache[i];
                    if (!res) {
                        res = this.children[i].execute();
                        if (res !== RunState.RUNNING) {
                            this.cache[i] = res;
                        }
                    }
                    if (res !== RunState.SUCCESS) {
                        if (res === RunState.FAILURE) {
                            this.cache = [];
                        }
                        return res;
                    }
                }
                else {
                    res = this.children[i].execute();
                    if (res !== RunState.SUCCESS) {
                        return res;
                    }
                }
            }
            if (this.cache) {
                this.cache = [];
            }
            return RunState.SUCCESS;
        }
    }
    /**
     * 选择节点
     * 只有当第一个节点返回 Failure 的时候, 才会执行第二个节点
     */
    class FallbackNode extends DecoratorNode {
        execute() {
            for (let i = 0; i < this.children.length; i++) {
                let res;
                if (this.cache) {
                    res = this.cache[i];
                    if (!res) {
                        res = this.children[i].execute();
                        if (res !== RunState.RUNNING) {
                            this.cache[i] = res;
                        }
                    }
                    if (res !== RunState.FAILURE) {
                        if (res === RunState.SUCCESS) {
                            this.cache = [];
                        }
                        return res;
                    }
                }
                else {
                    res = this.children[i].execute();
                    if (res !== RunState.FAILURE) {
                        return res;
                    }
                }
            }
            if (this.cache) {
                this.cache = [];
            }
            return RunState.FAILURE;
        }
    }
    //#endregion
    //#region extension LeafNode
    class MoveA extends ActionNode {
        constructor() {
            super(...arguments);
            this.aPoint = GameObject.findGameObjectById('215C93EB').worldTransform.position;
        }
        enter() {
            this.blackboard.set('Time', TimeUtil.time());
            this.blackboard.set('A', false);
            Navigation.navigateTo(this.cha, this.aPoint, undefined, () => { this.blackboard.set('A', true); }, () => { });
        }
        exit() {
            Navigation.stopNavigateTo(this.cha);
            this.blackboard.set('A', false);
            // console.log('ExitA --- ' + (TimeUtil.time() - this.blackboard.get<number>('Time')));
        }
        execute() {
            this.state = this.blackboard.get('A')
                ? RunState.SUCCESS : RunState.RUNNING;
            return this.state;
        }
    }
    class MoveB extends ActionNode {
        constructor() {
            super(...arguments);
            this.aPoint = GameObject.findGameObjectById('258D5F2B').worldTransform.position;
        }
        enter() {
            this.blackboard.set('Time', TimeUtil.time());
            this.blackboard.set('B', false);
            Navigation.navigateTo(this.cha, this.aPoint, undefined, () => { this.blackboard.set('B', true); }, () => { });
        }
        exit() {
            Navigation.stopNavigateTo(this.cha);
            this.blackboard.set('B', false);
            // console.log('ExitB --- ' + (TimeUtil.time() - this.blackboard.get<number>('Time')));
        }
        execute() {
            this.state = this.blackboard.get('B')
                ? RunState.SUCCESS : RunState.RUNNING;
            return this.state;
        }
    }
    class MoveC extends ActionNode {
        constructor() {
            super(...arguments);
            this.aPoint = GameObject.findGameObjectById('31BE7B1C').worldTransform.position;
        }
        enter() {
            this.blackboard.set('Time', TimeUtil.time());
            this.blackboard.set('C', false);
            Navigation.navigateTo(this.cha, this.aPoint, undefined, () => { this.blackboard.set('C', true); }, () => { });
        }
        exit() {
            Navigation.stopNavigateTo(this.cha);
            this.blackboard.set('C', false);
            // console.log('ExitC --- ' + (TimeUtil.time() - this.blackboard.get<number>('Time')));
        }
        execute() {
            this.state = this.blackboard.get('C')
                ? RunState.SUCCESS : RunState.RUNNING;
            return this.state;
        }
    }
    //#endregion
})(BTTree || (BTTree = {}));

var foreign12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get BTTree () { return BTTree; }
});

/**
 * 有限状态机(Finite State Machine)
 */
var FSM;
(function (FSM) {
    class Service {
        static createFsm() {
            // init 
            let blackboard = new Blackboard();
            blackboard.write('GameStart');
            blackboard.write('HasEnemy');
            let machine = new StateMachine(blackboard);
            let idle = new IdleState(machine);
            new PatrolState(machine);
            new InvestigateState(machine);
            new AttackState(machine);
            new FleeState(machine);
            machine.initialState = idle;
            setInterval(() => {
                machine.update();
            }, 0);
            InputUtil.onKeyDown(Keys.One, () => {
                blackboard.set('GameStart', true);
            });
            InputUtil.onKeyDown(Keys.Two, () => {
                blackboard.set('HasEnemy', true);
            });
            InputUtil.onKeyDown(Keys.Three, () => {
                blackboard.set('HasEnemy', false);
            });
        }
    }
    FSM.Service = Service;
    class BaseState {
        constructor(machine) {
            this.machine = machine;
            this.translations = [];
            machine.stateList.push(this);
            this.translations.sort((a, b) => b.weight - a.weight);
        }
    }
    class Translation {
        constructor(fromState, weight = 1) {
            this.fromState = fromState;
            this.weight = weight;
        }
        getStateInstance(cls) {
            let list = this.fromState.machine.stateList;
            for (let i = 0; i < list.length; i++) {
                if (list[i] instanceof cls)
                    return list[i];
            }
        }
    }
    class StateMachine {
        // ====
        constructor(blackboard) {
            this.blackboard = blackboard;
            this.stateList = [];
            this.initialState = null;
            this.activeState = null;
            // ====
            this.cha = GameObject.findGameObjectById('09EBA62E');
        }
        update() {
            if (!this.activeState) {
                this.activeState = this.initialState;
                this.activeState.onEnter();
            }
            if (this.activeState) {
                let translations = this.activeState.translations;
                for (let i = 0; i < translations.length; i++) {
                    if (translations[i].isValid()) {
                        this.activeState.onExit();
                        this.activeState = translations[i].getNextState();
                        this.activeState.machine = this;
                        this.activeState.onEnter();
                        break;
                    }
                }
                this.activeState.onUpdate();
            }
        }
    }
    // 状态=========================================================================================================================================================
    class IdleState extends BaseState {
        constructor(machine) {
            super(machine);
            this.translations.push(new Idle2Patrol(this));
        }
        onEnter() {
            console.log('enter IdleState');
        }
        onUpdate() {
        }
        onExit() {
            console.log('exit IdleState');
        }
    }
    class PatrolState extends BaseState {
        constructor(machine) {
            super(machine);
            this.points = [new Vector(1200, 0, 0), new Vector(1200, 1700, 0), new Vector(-126, 1000, 0)];
            this.index = 0;
            this.translations.push(new Any2Idle(this));
            this.translations.push(new Patrol2Investigate(this));
        }
        onEnter() {
            console.log('enter PatrolState');
            this.move();
        }
        onUpdate() {
        }
        onExit() {
            console.log('exit PatrolState');
            Navigation.stopNavigateTo(this.machine.cha);
        }
        move() {
            Navigation.navigateTo(this.machine.cha, this.points[this.index], undefined, () => {
                this.index = (this.index + 1) % this.points.length;
                this.move();
            }, () => {
                console.log('寻路失败');
            });
        }
    }
    class InvestigateState extends BaseState {
        constructor(machine) {
            super(machine);
            this.translations.push(new Any2Idle(this));
            this.translations.push(new Investigate2Patrol(this));
        }
        onEnter() {
            console.log('enter InvestigateState');
            let enemy = Player.localPlayer.character;
            enemy.collisionWithOtherCharacterEnabled = false;
            Navigation.follow(this.machine.cha, enemy, undefined);
        }
        onUpdate() {
        }
        onExit() {
            console.log('exit InvestigateState');
            Navigation.stopFollow(this.machine.cha);
        }
    }
    class AttackState extends BaseState {
        constructor(machine) {
            super(machine);
            this.translations.push(new Any2Idle(this));
        }
        onEnter() {
            console.log('enter AttackState');
        }
        onUpdate() {
        }
        onExit() {
            console.log('exit AttackState');
        }
    }
    class FleeState extends BaseState {
        constructor(machine) {
            super(machine);
            this.translations.push(new Any2Idle(this));
        }
        onEnter() {
            console.log('enter FleeState');
        }
        onUpdate() {
        }
        onExit() {
            console.log('exit FleeState');
        }
    }
    // 边=========================================================================================================================================================
    class Idle2Patrol extends Translation {
        constructor() {
            super(...arguments);
            this.GameStart = true;
        }
        isValid() {
            let bool = this.fromState.machine.blackboard.get('GameStart');
            return bool === this.GameStart;
        }
        getNextState() {
            return this.getStateInstance(PatrolState);
        }
    }
    class Any2Idle extends Translation {
        constructor() {
            super(...arguments);
            this.GameStart = false;
        }
        isValid() {
            let bool = this.fromState.machine.blackboard.get('GameStart');
            return bool === this.GameStart;
        }
        getNextState() {
            return this.getStateInstance(IdleState);
        }
    }
    class Patrol2Investigate extends Translation {
        constructor() {
            super(...arguments);
            this.HasEnemy = true;
        }
        isValid() {
            let bool = this.fromState.machine.blackboard.get('HasEnemy');
            return bool === this.HasEnemy;
        }
        getNextState() {
            return this.getStateInstance(InvestigateState);
        }
    }
    class Investigate2Patrol extends Translation {
        constructor() {
            super(...arguments);
            this.HasEnemy = false;
        }
        isValid() {
            let bool = this.fromState.machine.blackboard.get('HasEnemy');
            return bool === this.HasEnemy;
        }
        getNextState() {
            return this.getStateInstance(PatrolState);
        }
    }
})(FSM || (FSM = {}));

var foreign13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get FSM () { return FSM; }
});

/**
 * AStar Detail http://theory.stanford.edu/~amitp/GameProgramming/ImplementationNotes.html
 * 目标导向型行动计划（Goal Oriented Action Planner）
 */
var GOAP;
(function (GOAP) {
    class Service {
        static createGoap() {
            let planner = new Planner();
            planner.setPre("scout", "armedwithgun", true);
            planner.setEffect("scout", "enemyvisible", true);
            planner.setPre("approach", "enemyvisible", true);
            planner.setEffect("approach", "nearenemy", true);
            planner.setPre("aim", "enemyvisible", true);
            planner.setPre("aim", "weaponloaded", true);
            planner.setEffect("aim", "enemylinedup", true);
            planner.setPre("shoot", "enemylinedup", true);
            planner.setEffect("shoot", "enemyalive", false);
            planner.setPre("load", "armedwithgun", true);
            planner.setEffect("load", "weaponloaded", true);
            planner.setPre("detonatebomb", "armedwithbomb", true);
            planner.setPre("detonatebomb", "nearenemy", true);
            planner.setEffect("detonatebomb", "alive", false);
            planner.setEffect("detonatebomb", "enemyalive", false);
            planner.setPre("flee", "enemyvisible", true);
            planner.setEffect("flee", "nearenemy", false);
            let fr = new WorldState();
            this.setWorldState(planner, fr, "enemyvisible", false);
            this.setWorldState(planner, fr, "armedwithgun", true);
            this.setWorldState(planner, fr, "weaponloaded", false);
            this.setWorldState(planner, fr, "enemylinedup", false);
            this.setWorldState(planner, fr, "enemyalive", true);
            this.setWorldState(planner, fr, "armedwithbomb", true);
            this.setWorldState(planner, fr, "nearenemy", false);
            this.setWorldState(planner, fr, "alive", true);
            planner.setCost('detonatebomb', 5);
            let goal = new WorldState();
            this.setWorldState(planner, goal, 'enemyalive', false);
            let path = planner.startSearch(fr, goal);
            console.log(JSON.stringify(path));
        }
        static setWorldState(planner, ws, atom, value) {
            const idx = planner.indexForAtomName(atom);
            if (idx === -1) {
                return false;
            }
            let v = 1 << idx;
            ws.value = value ? (ws.value | v) : (ws.value & (~v));
            ws.unCare &= ~v;
            return true;
        }
    }
    GOAP.Service = Service;
    const MAX_OFFSET = 31;
    const MAX_CAPACITY = 1024;
    class WorldState {
        constructor() {
            this.value = 0;
            this.unCare = -1;
        }
        clone() {
            let ws = new WorldState();
            ws.value = this.value;
            ws.unCare = this.unCare;
            return ws;
        }
    }
    class AStarNode {
        constructor() {
            this.ws = null;
            this.g = 0;
            this.h = 0;
            this.f = 0;
            this.actionName = '';
            this.parentWs = null;
        }
    }
    class AStar {
        constructor() {
            this.planner = null;
            this.openList = [];
            this.closeList = [];
            this.goal = null;
            this.path = [];
        }
        plan(start, goal) {
            this.openList.length = 0;
            this.closeList.length = 0;
            this.goal = goal;
            this.path = [];
            let node = new AStarNode();
            node.ws = start;
            node.parentWs = start;
            node.g = 0;
            node.h = this.calcH(start, goal);
            node.f = node.g + node.h;
            node.actionName = '';
            this.openList.push(node);
            this.startSearch();
            return this.path;
        }
        startSearch() {
            do {
                if (this.openList.length === 0) {
                    console.log('Did not find a path');
                    return;
                }
                let node = this.getLowestNode();
                if (this.checkIsFind(node)) {
                    console.log('找到了');
                    this.fillPath(node);
                    return;
                }
                this.closeList.push(node);
                if (this.closeList.length > MAX_CAPACITY) {
                    console.log('已经是最大容量了，还是没找到1');
                    return;
                }
                // core code
                let names = [];
                let costs = [];
                let worldStates = [];
                let cnt = this.getPossibleStateTranslations(node.ws, names, costs, worldStates);
                for (let i = 0; i < cnt; i++) {
                    let aNode = new AStarNode();
                    let cost = node.g + costs[i];
                    let idx_o = this.idxForOpened(worldStates[i]);
                    let idx_c = this.idxForClosed(worldStates[i]);
                    if (idx_o >= 0 && cost < this.openList[idx_o].g) {
                        if (this.openList.length > 0) {
                            this.openList[idx_o] = this.openList[this.openList.length - 1];
                        }
                        this.openList.length -= 1;
                        idx_o = -1;
                    }
                    if (idx_c >= 0 && cost < this.closeList[idx_c].g) {
                        if (this.closeList.length > 0) {
                            this.closeList[idx_c] = this.closeList[this.closeList.length - 1];
                        }
                        this.closeList.length -= 1;
                        idx_c = -1;
                    }
                    if (idx_o === -1 && idx_c === -1) {
                        aNode.ws = worldStates[i];
                        aNode.g = cost;
                        aNode.h = this.calcH(node.ws, worldStates[i]);
                        aNode.f = aNode.g + aNode.h;
                        aNode.actionName = names[i];
                        aNode.parentWs = node.ws;
                        this.openList.push(aNode);
                    }
                    if (this.openList.length > MAX_CAPACITY) {
                        console.log('已经是最大容量了，还是没找到2');
                        return;
                    }
                }
            } while (1);
        }
        calcH(fr, to) {
            let care = (to.unCare ^ -1);
            let diff = (fr.value & care) ^ (to.value & care);
            let h = 0;
            for (let i = 0; i < MAX_OFFSET; i++) {
                if (diff & (1 << i)) {
                    h++;
                }
            }
            return h;
        }
        getLowestNode() {
            // 这里可以使用最小堆优化
            let lowestIdx = -1;
            let lowestVal = Number.MAX_SAFE_INTEGER;
            for (let i = 0; i < this.openList.length; i++) {
                if (this.openList[i].f < lowestVal) {
                    lowestVal = this.openList[i].f;
                    lowestIdx = i;
                }
            }
            let node = this.openList[lowestIdx];
            this.openList[lowestIdx] = this.openList[this.openList.length - 1];
            this.openList.length -= 1;
            return node;
        }
        checkIsFind(node) {
            let care = (this.goal.unCare ^ -1);
            return (node.ws.value & care) === (this.goal.value & care);
        }
        getPossibleStateTranslations(fr, names, costs, worldStates) {
            let writer = 0;
            // 遍历整个action
            for (let i = 0; i < this.planner.actionName.length; i++) {
                let pre = this.planner.actPre[i];
                let care = (pre.unCare ^ -1);
                let met = (care & pre.value) === (care & fr.value);
                if (met) { // 找到了满足前置条件的action
                    names[writer] = this.planner.actionName[i];
                    costs[writer] = this.planner.actCost[i];
                    worldStates[writer] = this.doAction(i, fr);
                    writer++;
                }
            }
            return writer;
        }
        doAction(idx, fr) {
            let ws = new WorldState();
            let effect = this.planner.actEffect[idx];
            let unCare = effect.unCare;
            let care = (effect.unCare ^ -1);
            ws.value = (fr.value & unCare) | (effect.value & care);
            ws.unCare &= effect.unCare;
            return ws;
        }
        idxForOpened(ws) {
            for (let i = 0; i < this.openList.length; i++) {
                if (this.openList[i].ws.value === ws.value) {
                    return i;
                }
            }
            return -1;
        }
        idxForClosed(ws) {
            for (let i = 0; i < this.closeList.length; i++) {
                if (this.closeList[i].ws.value === ws.value) {
                    return i;
                }
            }
            return -1;
        }
        fillPath(node) {
            let idx = -1;
            do {
                if (node.actionName === '') {
                    break;
                }
                else {
                    this.path.push(node.actionName);
                    idx = this.idxForClosed(node.parentWs);
                    if (idx === -1) {
                        break;
                    }
                    else {
                        node = this.closeList[idx];
                    }
                }
            } while (1);
        }
    }
    class Planner {
        constructor() {
            this.actionName = [];
            this.atomName = [];
            this.actPre = [];
            this.actEffect = [];
            this.actCost = [];
            this.searcher = null;
            this.searcher = new AStar();
            this.searcher.planner = this;
        }
        startSearch(fr, to) {
            return this.searcher.plan(fr.clone(), to.clone());
        }
        setPre(action, atom, value) {
            let actionIdx = this.indexForActionName(action);
            let atomIdx = this.indexForAtomName(atom);
            if (actionIdx !== -1 && atomIdx !== -1) {
                Service.setWorldState(this, this.actPre[actionIdx], atom, value);
            }
            return false;
        }
        setEffect(action, atom, value) {
            let actionIdx = this.indexForActionName(action);
            let atomIdx = this.indexForAtomName(atom);
            if (actionIdx !== -1 && atomIdx !== -1) {
                Service.setWorldState(this, this.actEffect[actionIdx], atom, value);
            }
            return false;
        }
        setCost(action, cost) {
            let idx = this.indexForActionName(action);
            if (idx !== -1) {
                this.actCost[idx] = cost;
            }
        }
        indexForActionName(action) {
            let i = 0;
            for (; i < this.actionName.length; i++) {
                if (this.actionName[i] === action) {
                    return i;
                }
            }
            if (i < MAX_OFFSET) {
                this.actionName[i] = action;
                this.actPre[i] = new WorldState();
                this.actCost[i] = 1;
                return i;
            }
            return -1;
        }
        indexForAtomName(atom) {
            let i = 0;
            for (; i < this.atomName.length; i++) {
                if (this.atomName[i] === atom) {
                    return i;
                }
            }
            if (i < MAX_OFFSET) {
                this.atomName[i] = atom;
                this.actEffect[i] = new WorldState();
                return i;
            }
            return -1;
        }
    }
})(GOAP || (GOAP = {}));

var foreign14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get GOAP () { return GOAP; }
});

/**
 * 分层状态机(Hierarchial Finite State Machine)
 */
var HFSM;
(function (HFSM) {
    class Service {
        static createHsm() {
            // init 
            let blackboard = new Blackboard();
            blackboard.write('PhoneRing');
            blackboard.write('Reached');
            let root = new StateMachine(null, blackboard); // 主状态机
            let conversion = new ConversionState(root, blackboard); // 子状态机（也是一个状态）
            let watchBuilding = new WatchBuildState(root, blackboard);
            root.initialState = watchBuilding;
            root.stateList.push(conversion, watchBuilding);
            setInterval(() => {
                root.update();
            }, 0);
            InputUtil.onKeyDown(Keys.One, () => {
                blackboard.set('Reached', true);
            });
            InputUtil.onKeyDown(Keys.Two, () => {
                blackboard.set('Reached', false);
            });
            InputUtil.onKeyDown(Keys.Three, () => {
                blackboard.set('PhoneRing', true);
            });
            InputUtil.onKeyDown(Keys.Four, () => {
                blackboard.set('PhoneRing', false);
            });
        }
    }
    HFSM.Service = Service;
    class BaseState {
        constructor(machine) {
            this.machine = machine;
            this.translations = [];
            machine.stateList.push(this);
        }
    }
    class Translation {
        constructor(fromState) {
            this.fromState = fromState;
        }
        getStateInstance(cls) {
            let list = this.fromState.machine.stateList;
            for (let i = 0; i < list.length; i++) {
                if (list[i] instanceof cls)
                    return list[i];
            }
            return null;
        }
    }
    // different(fsm 与 hsm)
    class StateMachine {
        // ====
        constructor(machine, blackboard) {
            this.machine = machine;
            this.blackboard = blackboard;
            this.stateList = [];
            this.initialState = null;
            this.historyState = null;
            this.translations = [];
            // ====
            this.cha = GameObject.findGameObjectById('09EBA62E');
        }
        onEnter() {
            if (!this.historyState) {
                this.historyState = this.initialState;
            }
            this.historyState.onEnter();
        }
        onExit() {
            if (this.historyState) {
                this.historyState.onExit();
            }
        }
        onUpdate() {
            this.update();
        }
        update() {
            if (!this.historyState) {
                this.historyState = this.initialState;
                this.historyState.onEnter();
            }
            if (this.historyState) {
                let translations = this.historyState.translations;
                for (let i = 0; i < translations.length; i++) {
                    if (translations[i].isValid()) {
                        this.historyState.onExit();
                        this.historyState = translations[i].getNextState();
                        this.historyState.machine = this;
                        this.historyState.onEnter();
                        break;
                    }
                }
                this.historyState.onUpdate();
            }
        }
    }
    // 状态=========================================================================================================
    class PatrolToSafeState extends BaseState {
        constructor(machine) {
            super(machine);
            this.safePoint = new Vector(2384, -808, 7);
            this.translations.push(new Safe2Door(this));
        }
        onEnter() {
            console.log('进入巡逻到安全地方');
            this.move();
        }
        onExit() {
            console.log('退出巡逻到安全地方');
            Navigation.stopNavigateTo(this.machine.cha);
        }
        onUpdate() {
        }
        move() {
            Navigation.navigateTo(this.machine.cha, this.safePoint, undefined, () => {
                console.log('已经到达安全位置');
            }, () => {
                console.log('寻路失败');
            });
        }
    }
    class PatrolToDoorState extends BaseState {
        constructor(machine) {
            super(machine);
            this.doorPoint = new Vector(-1000, -949, 0);
            this.translations.push(new Door2Safe(this));
        }
        onEnter() {
            console.log('进入巡逻到门口');
            this.move();
        }
        onExit() {
            console.log('退出巡逻到门口');
            Navigation.stopNavigateTo(this.machine.cha);
        }
        onUpdate() {
        }
        move() {
            Navigation.navigateTo(this.machine.cha, this.doorPoint, undefined, () => {
                console.log('已经到达安全位置');
            }, () => {
                console.log('寻路失败');
            });
        }
    }
    class TalkState extends BaseState {
        onEnter() {
            console.log('进入对话');
        }
        onExit() {
            console.log('退出对话');
        }
        onUpdate() {
        }
    }
    class WatchBuildState extends StateMachine {
        constructor(machine, blackboard) {
            super(machine, blackboard);
            let toSafe = new PatrolToSafeState(this);
            let toDoor = new PatrolToDoorState(this);
            this.initialState = toSafe;
            this.stateList.push(toSafe, toDoor);
            this.translations.push(new WatchBuild2Conversion(this));
        }
        onEnter() {
            console.log('进入查看建筑');
            super.onEnter();
        }
        onExit() {
            console.log('退出查看建筑');
            super.onExit();
        }
    }
    class ConversionState extends StateMachine {
        constructor(machine, blackboard) {
            super(machine, blackboard);
            let talk = new TalkState(this);
            this.initialState = talk;
            this.stateList.push(talk);
            this.translations.push(new Conversion2WatchBuild(this));
        }
        onEnter() {
            console.log('进入交流');
            super.onEnter();
        }
        onExit() {
            console.log('退出交流');
            super.onExit();
        }
    }
    // 边==========================================================================================================
    class Safe2Door extends Translation {
        constructor() {
            super(...arguments);
            this.Reached = true;
        }
        isValid() {
            return this.fromState.machine.blackboard.get('Reached') === this.Reached;
        }
        getNextState() {
            return this.getStateInstance(PatrolToDoorState);
        }
    }
    class Door2Safe extends Translation {
        constructor() {
            super(...arguments);
            this.Reached = false;
        }
        isValid() {
            return this.fromState.machine.blackboard.get('Reached') === this.Reached;
        }
        getNextState() {
            return this.getStateInstance(PatrolToSafeState);
        }
    }
    class WatchBuild2Conversion extends Translation {
        constructor() {
            super(...arguments);
            this.PhoneRing = true;
        }
        isValid() {
            return this.fromState.machine.blackboard.get('PhoneRing') === this.PhoneRing;
        }
        getNextState() {
            return this.getStateInstance(ConversionState);
        }
    }
    class Conversion2WatchBuild extends Translation {
        constructor() {
            super(...arguments);
            this.PhoneRing = false;
        }
        isValid() {
            return this.fromState.machine.blackboard.get('PhoneRing') === this.PhoneRing;
        }
        getNextState() {
            return this.getStateInstance(WatchBuildState);
        }
    }
})(HFSM || (HFSM = {}));

var foreign15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get HFSM () { return HFSM; }
});

/**
 * 效用系统（Utility System）
 * Utility Theory https://www.gameaipro.com/GameAIPro/GameAIPro_Chapter09_An_Introduction_to_Utility_Theory.pdf
 */
var US;
(function (US) {
    class Service {
        static begin() {
            let maker = new DecisionMaker();
            let statistic = {
                hp: 100,
                maxHp: 100,
            };
            let cAttack = new AttackCalculator();
            let cTreat = new ThreatCalculator();
            let cHealth = new HealthCalculator();
            // let cRunaway = new RunAwayCalculator();
            let actIdle = new IdleAction(maker, statistic);
            let actFire = new FireAction(maker, statistic);
            let actHeal = new HealAction(maker, statistic);
            actIdle.pushCalculator(cHealth, cTreat);
            actFire.pushCalculator(cAttack, cTreat);
            actHeal.pushCalculator(cHealth);
            maker.actionList.push(actIdle, actFire, actHeal);
            maker.chooseNextAction();
            TimeUtil.onEnterFrame.add((dt) => {
                maker.update(dt);
            });
        }
    }
    US.Service = Service;
    //#region math
    const max = Math.max;
    const min = Math.min;
    const pow = Math.pow;
    const e = Math.E;
    class ScoringCalculator {
        constructor() {
            /**因素权重 默认1(可以控制这个影响因素的大小) */
            this.weight = 1;
        }
    }
    class AttackCalculator extends ScoringCalculator {
        constructor() {
            super(...arguments);
            this.type = 0 /* FactorType.ATTACK */;
            this.minDmg = 10;
            this.maxDmg = 30;
            this.a = 0.6;
        }
        desire(hp) {
            let v = (hp - this.minDmg) / ((max(this.maxDmg, hp)) - this.minDmg);
            let u = max(min((1 - v) * (1 - this.a) + this.a, 1), 0);
            console.log('攻击效用---' + u);
            return u * this.weight;
        }
    }
    class ThreatCalculator extends ScoringCalculator {
        constructor() {
            super(...arguments);
            this.type = 1 /* FactorType.THREAT */;
            this.maxDmg = 30;
        }
        desire(hp) {
            let u = min(min(this.maxDmg, hp) / hp, 1);
            console.log('危险效用---' + u);
            return u * this.weight;
        }
    }
    class HealthCalculator extends ScoringCalculator {
        constructor() {
            super(...arguments);
            this.type = 2 /* FactorType.HEALTH */;
            this.a = 0.68;
            this.b = 12;
            this.c = 6;
        }
        desire(hp, maxHp) {
            let exp = (-(hp / maxHp * this.b) + this.c);
            let u = 1 - (1 / (1 + pow((e * 0.68), exp)));
            console.log('健康效用---' + u);
            return u * this.weight;
        }
    }
    //#endregion
    //#region BaseAction
    class BaseAction {
        constructor(maker, gameStatistic) {
            this.isEnd = false;
            this.maker = null;
            this.gameStatistic = null;
            this.calculator = new Map();
            this.maker = maker;
            this.gameStatistic = gameStatistic;
        }
        pushCalculator(...calculators) {
            for (let i = 0; i < calculators.length; i++) {
                this.calculator.set(calculators[i].type, calculators[i]);
            }
        }
        getCalculator(type) {
            return this.calculator.get(type);
        }
        onEnter() {
        }
        onUpdate() {
        }
        onExit() {
        }
    }
    class IdleAction extends BaseAction {
        get score() {
            let healthScore = this.getCalculator(2 /* FactorType.HEALTH */)
                .desire(this.gameStatistic.hp, this.gameStatistic.maxHp);
            let threatScore = this.getCalculator(1 /* FactorType.THREAT */)
                .desire(this.gameStatistic.hp);
            let u = (1 - healthScore * threatScore);
            return u;
        }
        onEnter() {
            this.isEnd = false;
            console.log('进入闲置');
            // 测试
            setTimeout(() => {
                this.isEnd = true;
            }, 3000);
        }
    }
    class FireAction extends BaseAction {
        get score() {
            let attackScore = this.getCalculator(0 /* FactorType.ATTACK */)
                .desire(this.gameStatistic.hp, this.gameStatistic.maxHp);
            let threatScore = this.getCalculator(1 /* FactorType.THREAT */)
                .desire(this.gameStatistic.hp);
            return attackScore * threatScore;
        }
        onEnter() {
            this.isEnd = false;
            console.log('进入开火');
            // 测试
            setTimeout(() => {
                this.isEnd = true;
            }, 1000);
        }
    }
    class HealAction extends BaseAction {
        get score() {
            let healthScore = this.getCalculator(2 /* FactorType.HEALTH */)
                .desire(this.gameStatistic.hp, this.gameStatistic.maxHp);
            return healthScore;
        }
        onEnter() {
            this.isEnd = false;
            console.log('进入治疗');
            // 测试
            setTimeout(() => {
                this.isEnd = true;
            }, 5000);
        }
    }
    //#endregion
    //#region 决策者
    class DecisionMaker {
        constructor() {
            this.time = 0;
            this.actionList = [];
            this.activeActionIndex = -1;
        }
        update(dt) {
            this.time += dt;
            // 刷新时间1s 并且动作没有结束久不进入下一个动作（具体策略根据游戏设定，这里只是测试）
            if (this.time > 1 && this.actionList[this.activeActionIndex].isEnd) {
                this.chooseNextAction();
            }
        }
        chooseNextAction() {
            // 有3个策略获取动作（目前使用的是1，需要根据不同的游戏选择策略）
            // 1.random weight
            // 2.the most scoring
            // 3.bucket priority + random weight
            let weights = [];
            for (let i = 0; i < this.actionList.length; i++) {
                weights.push(this.actionList[i].score);
            }
            let randomIdx = RandomUtils.SeedRandom.weight(weights);
            this.activeActionIndex = randomIdx;
            this.actionList[randomIdx].onEnter();
        }
    }
    //#endregion
})(US || (US = {}));

var foreign16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get US () { return US; }
});

var Ability;
(function (Ability) {
    (function (AbilityFlag) {
        /**被动技能 */
        AbilityFlag[AbilityFlag["PASSIVE"] = 1] = "PASSIVE";
        /**主动施法技能 */
        AbilityFlag[AbilityFlag["GENERAL"] = 2] = "GENERAL";
        /**引导技能 */
        AbilityFlag[AbilityFlag["CHANNEL"] = 4] = "CHANNEL";
        /**开关技能 */
        AbilityFlag[AbilityFlag["TOGGLE"] = 8] = "TOGGLE";
        /**激活技能 */
        AbilityFlag[AbilityFlag["ACTIVATED"] = 16] = "ACTIVATED";
    })(Ability.AbilityFlag || (Ability.AbilityFlag = {}));
    (function (SelectType) {
        /**不需要目标，立即释放 */
        SelectType[SelectType["IMMEDIATELY"] = 1] = "IMMEDIATELY";
        /**需要选定目标（小兵，野怪，玩家） */
        SelectType[SelectType["TARGET"] = 2] = "TARGET";
        /**需要一个位置目标点（一个坐标） */
        SelectType[SelectType["AOE"] = 4] = "AOE";
    })(Ability.SelectType || (Ability.SelectType = {}));
    class BaseAbility {
        onProjectileHit(projHandle, hitTarget, hitPoint) { }
    }
    Ability.BaseAbility = BaseAbility;
})(Ability || (Ability = {}));

var foreign17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Ability () { return Ability; }
});

var Buff;
(function (Buff) {
    class BuffContainer {
        constructor() {
            /**正在运行的buff */
            this._buffs = new Map();
            /**buff缓存池 */
            this._buffPool = new Map();
            // 初始化buff-prototype
        }
        /**
         * 是否 存在同类型 Buff.
         * @param type buff类型
         */
        hasBuff(type) {
            return this._buffs.has(type);
        }
        /**
         * 获取 指定类型 Buff.
         * @param type buff类型
         */
        getBuff(type) {
            return this._buffs.get(type);
        }
        /**
         * 添加Buff到容器
         * @param buff Buff实列
         */
        addBuff(buff) {
            if (this.hasBuff(buff.buffType)) {
                let existBuff = this.getBuff(buff.buffType);
                if (existBuff.caster === buff.caster) {
                    existBuff.onBuffRefresh(buff);
                    this.recoverBuff(buff);
                    return;
                }
                this.removeBuff(buff.buffType);
            }
            this._buffs.set(buff.buffType, buff);
            buff.onBuffStart();
        }
        /**
         * 移除一个buff
         * @param type Buff类型
         */
        removeBuff(type) {
            if (this.hasBuff(type)) {
                let buff = this.getBuff(type);
                buff.onBuffRemove();
                this._buffs.delete(type);
                this.recoverBuff(buff);
            }
        }
        /**
         * 销毁buff容器
         */
        destroy() {
            for (const type of this._buffs.keys()) {
                this.removeBuff(type);
            }
        }
        /**
         * 更新buff
         * @param dt 时间间隔
         */
        update(dt) {
            let currentTime = Date.now();
            for (const buff of this._buffs.values()) {
                if (buff.buffDuration > 0) {
                    if (currentTime > buff.startTime + buff.buffDuration) {
                        this.removeBuff(buff.buffType);
                        continue;
                    }
                }
                if (buff.buffIntervalTime > 0) {
                    let passTime = currentTime - buff.startTime;
                    let totalCnt = Math.floor(passTime / buff.buffIntervalTime);
                    let cnt = totalCnt - buff.buffIntervalCount;
                    for (let i = 0; i < cnt; i++) {
                        buff.onIntervalThink();
                    }
                }
            }
        }
        /**
         * 创建buff实体
         * @param cls buff类
         * @returns buff实体
         */
        createBuff(cls) {
            let buff;
            let buffs = this._buffPool.get(cls.prototype.buffType);
            if (!buffs) {
                buffs = [];
                this._buffPool.set(cls.prototype.buffType, buffs);
            }
            if (buffs.length > 0)
                buff = buffs.pop();
            else
                buff = new cls();
            buff.onBuffAwake();
            return buff;
        }
        /**
         * 回收buff实体
         * @param buff Buff实体
         */
        recoverBuff(buff) {
            if (this._buffPool.has(buff.buffType)) {
                let buffs = this._buffPool.get(buff.buffType);
                buffs.push(buff);
                buff.onBuffDestroy();
            }
        }
    }
    Buff.BuffContainer = BuffContainer;
    (function (BuffType) {
        BuffType[BuffType["BUFF_10001"] = 0] = "BUFF_10001";
    })(Buff.BuffType || (Buff.BuffType = {}));
    (function (BuffTag) {
        BuffTag[BuffTag["METAL"] = 2] = "METAL";
        BuffTag[BuffTag["WOOD"] = 4] = "WOOD";
        BuffTag[BuffTag["WATER"] = 8] = "WATER";
        BuffTag[BuffTag["FIRE"] = 16] = "FIRE";
        BuffTag[BuffTag["EARTH"] = 32] = "EARTH";
    })(Buff.BuffTag || (Buff.BuffTag = {}));
    (function (BuffImmuneTag) {
    })(Buff.BuffImmuneTag || (Buff.BuffImmuneTag = {}));
    (function (ActorState) {
        /**眩晕 */
        ActorState[ActorState["STUN"] = 0] = "STUN";
        /**定身 */
        ActorState[ActorState["ROOT"] = 1] = "ROOT";
        /**沉默 */
        ActorState[ActorState["SILENCE"] = 2] = "SILENCE";
        /**无敌 */
        ActorState[ActorState["INVINCIBLE"] = 3] = "INVINCIBLE";
        /**隐身 */
        ActorState[ActorState["INVISIBLE"] = 4] = "INVISIBLE";
    })(Buff.ActorState || (Buff.ActorState = {}));
    class BaseBuff {
        constructor() {
            /**buff的施加者 */
            this.caster = null;
            /**buff的挂载者 */
            this.parent = null;
            /**buff的由那个技能创建 */
            this.ability = null;
            /**buff创建的上下文 */
            this.context = null;
            /**buff类型ID */
            this.buffType = 0;
            /**buff开始的时间 */
            this.startTime = 0;
            /**buff的层级 */
            this.buffLayer = 1;
            /**buff的等级 */
            this.buffLevel = 1;
            /**buff的持续时间 */
            this.buffDuration = 1000;
            /**buff自带的tag */
            this.buffTag = 0;
            /**buff的免疫tag */
            this.buffImmuneTag = 0;
            /**buff间隔刷新时间 */
            this.buffIntervalTime = 0;
            /**buff刷新次数 */
            this.buffIntervalCount = 0;
        }
        /**
         * 生效之前（还未加入到Buff容器中）时调用
         */
        onBuffAwake() {
        }
        /**
         * 当Buff生效时（加入到Buff容器后）
         */
        onBuffStart() {
            /**
             * 常用事件（buff主要是靠监听和发送事件）
             * OnAbilityExecuted，监听某个主动技能执行成功
             * OnBeforeGiveDamage，OnAfterGiveDamage监听我方给目标造成伤害时触发
             * OnBeforeTakeDamage，OnAfterTakeDamage监听我方受到伤害时触发
             * OnBeforeDead，OnAfterDead监听我方死亡时触发
             * OnKill事件，监听我方击杀目标时触发
             */
        }
        /**
         * 当Buff添加时存在相同类型且caster相等的时候，Buff执行刷新流程
         - 更新Buff层数，等级，持续时间等数据
         */
        onBuffRefresh(newBuff) {
        }
        /**
         * 当Buff销毁前（还未从Buff容器中移除）
         */
        onBuffRemove() {
        }
        /**
         * 当Buff销毁后（已从Buff容器中移除）
         */
        onBuffDestroy() {
        }
        /**
         * 触发间隔持续效果
         */
        onIntervalThink() {
        }
        /**
         * 开始间隔刷新
         * @param interval 刷新间隔时间
         */
        startIntervalThink(interval) {
            this.buffIntervalTime = interval;
        }
    }
    Buff.BaseBuff = BaseBuff;
    /**
     * 用来修改目标属性和状态
     */
    class Modifier extends BaseBuff {
        modifyAttribute() {
        }
        modifyState() {
        }
    }
    Buff.Modifier = Modifier;
    /**
     * 提供修改玩家运动效果的功能
     */
    class MotionModifier extends Modifier {
        applyMotion(motionTypeId, priority, forceInterrupt) {
        }
        updateBeforeMovement() {
        }
        updateAfterMovement() {
        }
        onMotionUpdate() {
        }
        onMotionInterrupt() {
        }
    }
    Buff.MotionModifier = MotionModifier;
})(Buff || (Buff = {}));

var foreign18 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Buff () { return Buff; }
});

var Effect;
(function (Effect) {
    class EffectManager {
        /**
         * 创建一个特效(特效创建时能被周围玩家看见)
         * @param effectTypeID  特效类型id，关联配置表相关项。
         * @param controlPoints 特效相关控制点数据
         * @param controlEntities 特效相关单位控制数据
         * @param bRetain EffectManager是否持有特效
         * @returns effectHandle 特效句柄 创建特效后返回有效句柄，数值大于0（如果是客户端创建就是小于0），供游戏逻辑使用控制特效行为
         */
        static createEffect(effectTypeID, controlPoints, controlEntities, bRetain) {
            return 0;
        }
        /**创建一个特性(特效创建时只能被自己看见)
         * @param effectTypeID 特性类型id，关联配置表相关项。
         * @param controlPoints 特效相关控制点数据
         * @param controlEntities 特效相关单位控制数据
         * @param bRetain EffectManager是否持有特效
         * @param player 玩家
         * @returns effectHandle 特效句柄 创建特效后返回有效句柄，数值大于0，供游戏逻辑使用控制特效行为
         */
        static createEffectForPlayer(effectTypeID, controlPoints, controlEntities, bRetain, player) {
            return 0;
        }
        /**
         * 设置特效控制点
         * @param effectHandle 特效句柄
         * @param cpIndex 控制点索引
         * @param cpData 控制点位置
         */
        static setEffectControlPoint(effectHandle, cpIndex, cpData) {
        }
        /**
         * 设置特效实体
         * @param effectHandle 特效句柄
         * @param ceIndex 控制实体
         * @param entityId 实体ID
         * @param attachType 挂载类型
         * @param attachName 挂载点名称
         * @param offset 挂载位置偏移
         * @param lockOrientation 是否与挂载点朝向一致
         */
        static setEffectControlEntity(effectHandle, ceIndex, entityId, attachType, attachName, offset, lockOrientation) {
        }
        /**
         * 释放句柄（释放manager中的关于特效的数据，并unRef）
         * @param effectHandle 句柄
         */
        static releaseEffect(effectHandle) {
        }
        /**
         * 销毁句柄（无视计数，直接删除特效）
         * @param effectHandle 句柄
         */
        static destroyEffect(effectHandle) {
        }
    }
    Effect.EffectManager = EffectManager;
    (function (AttachType) {
        /**特效基于目标坐标创建 */
        AttachType[AttachType["ATTACH_ABS_ORIGIN"] = 0] = "ATTACH_ABS_ORIGIN";
        /**特效基于目标坐标创建并跟随目标位置移动 */
        AttachType[AttachType["ATTACH_ABS_ORIGIN_FOLLOW"] = 1] = "ATTACH_ABS_ORIGIN_FOLLOW";
        /**特效基于目标挂点(attachName)位置创建，但不跟随目标 */
        AttachType[AttachType["ATTACH_POINT"] = 2] = "ATTACH_POINT";
        /**特效基于目标挂点(attachName)位置创建，跟随目标 */
        AttachType[AttachType["ATTACH_POINT_FOLLOW"] = 3] = "ATTACH_POINT_FOLLOW";
    })(Effect.AttachType || (Effect.AttachType = {}));
    class BaseEffect {
        constructor() {
            /**唯一id */
            this._id = -1;
            this.addRef();
        }
        update() {
            if (this._refCnt === 0) ;
        }
        /**特效唯一ID */
        set id(v) {
            if (this._id < 0) {
                this._id = v;
            }
        }
        get id() {
            return this._id;
        }
        /**添加引用 */
        addRef() {
            this._refCnt++;
        }
        /**解除引用 */
        unRef() {
            this._refCnt--;
            if (this._refCnt === 0) {
                console.log('特效销毁', this._refCnt);
            }
        }
    }
    Effect.BaseEffect = BaseEffect;
})(Effect || (Effect = {}));

var foreign19 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Effect () { return Effect; }
});

var Movement;
(function (Movement) {
    // 属性同步脚本
    class MotionClip extends mw.Script {
        get character() {
            return this.gameObject;
        }
    }
    Movement.MotionClip = MotionClip;
    class MotionClip_HitBack {
        constructor() {
            this.oOverride = false;
            this.elapseMode = 0;
            this.duration = 0;
            this.goalPosition = null;
        }
        tickMotion() {
        }
    }
    Movement.MotionClip_HitBack = MotionClip_HitBack;
    class CharacterMovementComponent {
        constructor() {
            this.inputVector = Vector.zero;
            this.motion = null;
        }
        playMotionID(motionID) {
        }
        update() {
        }
    }
    Movement.CharacterMovementComponent = CharacterMovementComponent;
})(Movement || (Movement = {}));

var foreign20 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Movement () { return Movement; }
});

var Projectile;
(function (Projectile) {
    class ProjectileManager {
        static createTrackingProjectile(owner, ability, fromPosition, target, speed) {
            let projectile = new TrackingProjectile();
            return projectile;
        }
        static createLinearProjectile(owner, ability, fromPosition, velocity, distance, collisionBox, filterTargetInfo) {
            let projectile = new LinearProjectile();
            return projectile;
        }
    }
    Projectile.ProjectileManager = ProjectileManager;
    /**
     * 这是个梯形碰撞盒
     */
    class CollisionBox {
        constructor() {
            /**开始宽度 */
            this.startWidth = 0;
            /**结束宽度 */
            this.endWidth = 0;
        }
    }
    Projectile.CollisionBox = CollisionBox;
    class BaseProjectile {
        constructor() {
            this.owner = null;
            this.ability = null;
            this.fromPosition = null;
        }
        execute(dt) {
        }
    }
    Projectile.BaseProjectile = BaseProjectile;
    class TrackingProjectile extends BaseProjectile {
        constructor() {
            super(...arguments);
            this.target = null;
            this.speed = 0;
        }
    }
    Projectile.TrackingProjectile = TrackingProjectile;
    class LinearProjectile extends BaseProjectile {
        constructor() {
            super(...arguments);
            this.velocity = 0;
            this.distance = 0;
            this.collisionBox = null;
            this.filterTargetInfo = null;
        }
    }
    Projectile.LinearProjectile = LinearProjectile;
})(Projectile || (Projectile = {}));

var foreign21 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Projectile () { return Projectile; }
});

const ZN = {
    // lmp 1 - 50
    [1]: { key: 'mainUI_task_1', zn: '找到<color=#008000ff>{0}</color>个' },
    [2]: { key: 'mainUI_time_2', zn: '距离白天结束还有{0}' },
};
var LanguageTypes;
(function (LanguageTypes) {
    /**英语.*/
    LanguageTypes[LanguageTypes["ENGLISH"] = 0] = "ENGLISH";
    /**中文.*/
    LanguageTypes[LanguageTypes["CHINESE"] = 1] = "CHINESE";
})(LanguageTypes || (LanguageTypes = {}));
/**
 * 初始化多语言
 * @param languageIndex 索引位置（表中的偏移offset）
 */
function initLanguage(languageIndex) {
    // todo
    // GameConfig.initLanguage(languageIndex, i18n);
    mw.UIScript.addBehavior("lan", (ui) => {
        let key = ui.text;
        if (ui)
            ui.text = i18n(key);
    });
}
function i18n(seq, ...args) {
    // todo
    // let lanConfig = GameConfig.Language;
    let lanConfig = {};
    let obj = ZN[seq];
    try {
        if (obj)
            return StringUtil.format(lanConfig[obj.key] ?
                lanConfig[obj.key].Value.replace(/\\n/g, "\n") : obj.zn, ...args);
        else
            return StringUtil.format(lanConfig[seq] ?
                lanConfig[seq].Value.replace(/\\n/g, "\n") : seq.toString(), ...args);
    }
    catch (error) {
        console.log("多语言问题 + ", error);
        return "undefined";
    }
}

var foreign22 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get LanguageTypes () { return LanguageTypes; },
    i18n: i18n,
    initLanguage: initLanguage
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var UIType;
(function (UIType) {
    UIType["MAIN_UI"] = "MAIN_UI";
    UIType["SETTING_UI"] = "SETTING_UI";
    UIType["COMMON_TIPS"] = "COMMON_TIPS";
    UIType["ABILITY_RELEASE_UI"] = "ABILITY_RELEASE_UI";
})(UIType || (UIType = {}));

var foreign59 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get UIType () { return UIType; }
});

var UILayer;
(function (UILayer) {
    UILayer[UILayer["UILayerScene"] = 0] = "UILayerScene";
    UILayer[UILayer["UILayerBottom"] = 1] = "UILayerBottom";
    UILayer[UILayer["UILayerMiddle"] = 2] = "UILayerMiddle";
    UILayer[UILayer["UILayerOwn"] = 3] = "UILayerOwn";
    UILayer[UILayer["UILayerTop"] = 4] = "UILayerTop";
    UILayer[UILayer["UILayerDialog"] = 5] = "UILayerDialog";
    UILayer[UILayer["UILayerSystem"] = 6] = "UILayerSystem";
})(UILayer || (UILayer = {}));
class UIManager {
    constructor() {
        this._uiLayer = new Map();
        this._uiPool = new Map();
        this._uiStack = new Map();
    }
    static get instance() {
        if (!UIManager._instance) {
            UIManager._instance = new UIManager();
        }
        return UIManager._instance;
    }
    /**
     * 展示一个UI
     * @param type UI的名称
     * @param params 打开需要传递的参数
     */
    show(type, ...params) {
        console.log('准备打开界面---' + type);
        let ui;
        if (this._uiPool.has(type)) {
            ui = this._uiPool.get(type);
            console.log('界面处于显示中---' + type);
            if (ui.visible)
                return;
            mw.UIService.showUI(ui, ui.layer, ...params);
        }
        else {
            if (UI_CLASS[type]) {
                ui = mw.UIService.show(UI_CLASS[type], ...params);
                this._uiLayer.set(type, ui.layer);
                this._uiPool.set(type, ui);
            }
            else {
                throw new Error("UI_CLASS[" + type + "] is not defined");
            }
        }
        let stack = this._uiStack.get(ui.layer);
        if (!stack) {
            stack = [];
            this._uiStack.set(ui.layer, stack);
        }
        stack.push(ui);
    }
    /**
     * 隐藏一个UI（以堆栈的形式隐藏）
     * @param type UI的名称
     */
    hide(type) {
        let layer = this._uiLayer.get(type);
        if (!layer) {
            console.error(`ui ${type} undefined`);
            return;
        }
        let uis = this._uiStack.get(layer);
        if (!uis || uis.length === 0) { // 空判断
            console.error(`ui stack is empty`);
            return;
        }
        if (uis[uis.length - 1].type !== type) {
            console.error(`top ui type === ${uis[uis.length - 1].type}`);
            return;
        }
        mw.UIService.hideUI(uis.pop());
    }
    /**
     * 获取UI对象
     * @param type
     */
    getUI(type) {
        let ui = this._uiPool.get(type);
        if (!ui.visible) {
            throw new Error("UI is not visible");
        }
        return ui;
    }
    /**
     * 隐藏所有UI
     */
    hideAll() {
        for (const [layer, uis] of this._uiStack) {
            for (let i = uis.length - 1; i >= 0; i--) {
                mw.UIService.hideUI(uis[i]);
            }
        }
        this._uiStack.clear();
    }
}
const UI_CLASS = {};
const UI = UIManager.instance;

var foreign60 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UI: UI,
    UI_CLASS: UI_CLASS
});

let Main = class Main extends Script {
    constructor() {
        super(...arguments);
        this.language = LanguageTypes.CHINESE;
        this.online = false;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        this.useUpdate = true;
        // initLanguage(this.Lang);
        if (SystemUtil.isClient()) {
            // let af = this.a(10);// 固定x = 10
            // console.log(JSON.stringify(af.next()));
            // console.log(JSON.stringify(af.next(1000)));
            // console.log(JSON.stringify(af.next(50)));
            // console.log(JSON.stringify(af.next(20)));
            // clampText('<u><size=80><color=#red>富文本</color></size>标签</u>');
            // RoomCreator.createRoom();
            // RoomSettings.getMaxPlayers;
            // RouteService;
            // RoomService.kick();
            // QueryUtil.lineTrace();
            // let phy: mw.Impulse;
            // phy
            this.test();
            // UI.show(UIType.MAIN_UI);
            // UI.show(UIType.ABILITY_RELEASE_UI);
            setTimeout(() => { UI.show(UIType.MAIN_UI); }, 0);
        }
        if (SystemUtil.isServer()) {
            Event.addClientListener('aaa', (player) => {
            });
            Event.addClientListener('bbb', (player) => {
                player.character.complexMovementEnabled = true;
                player.character.worldTransform.scale = new Vector(1.8);
            });
            // DataStorage.asyncSetData("789", { bag: {}, });
        }
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
        mw.TweenUtil.TWEEN.update();
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
    test() {
        GameObject.findGameObjectById("3F2C70A3");
        InputUtil.onKeyDown(Keys.One, () => {
            GameObject.findGameObjectById("0DD2DB84");
            let anchor = GameObject.spawn(MWResource.ANCHOR);
            let cha = Player.localPlayer.character;
            cha.attachToSlot(anchor, HumanoidSlotType.Root);
            anchor.localTransform.position = new Vector(0, 0, 200);
            // let follower = new PetFlyBehavior(pik, anchor, cha);
            // TimeUtil.onEnterFrame.add(() => {
            //     follower.fly();
            // });
        });
        InputUtil.onKeyDown(Keys.Two, () => {
            let cha = Player.localPlayer.character;
            cha.worldTransform.scale = cha.worldTransform.scale.add(new Vector(1));
        });
        InputUtil.onKeyDown(Keys.Three, () => {
            // Event.dispatchToLocal("TIPS", "你好");
            // UIService.show(MainUI);
            // let a = GameObjPool.spawn("0504D97F", mwext.GameObjPoolSourceType.Scene);
            let a = GameObject.spawn("13596");
            // let e = a.getChildByName("爆炸") as Effect;
            a.worldTransform.position = Player.localPlayer.character.worldTransform.position.add(new Vector(0, 0, 200));
            a.loopCount = 0;
            a.play();
            setTimeout(() => {
                a.stop();
            }, 3000);
        });
    }
    *bb() {
        return 999;
    }
    *a(x) {
        console.log("x：" + x);
        let a = yield x; // 这里的a是next传入的值
        console.log("x：" + x);
        console.log("a: " + a);
        let b = yield (x + 1) + a;
        yield a + b;
        console.log("a + b = ", a + b);
        // yield this.bb();
        // 【yield* this.bb()】 这是一个表达式 是一个值
        return yield* this.bb();
    }
};
__decorate([
    Property({ tooltip: "多语言", enumType: LanguageTypes })
], Main.prototype, "language", void 0);
__decorate([
    Property({ tooltip: "线上存储" })
], Main.prototype, "online", void 0);
Main = __decorate([
    Component
], Main);
var Main$1 = Main;
// protected onUpdate(deltaTime: number): void {
//     if (this.currentShopData && this.currentShopData.shopCanBuyCount > 0) {
//         let time = this.currentShopData.lastRefreshTime + this.currentShopData.cycle * 60 * 60 * 1000 - Date.now();
//         if (time > 0) {
//             this.text_time.text = FormatUtils.getRemindTime(time, "{h}:{mm}:{s}");
//             this.img_time.visibility = SlateVisibility.Visible;
//             return;
//         }
//     }
//     this.text_time.text = "";
//     this.img_time.visibility = SlateVisibility.Collapsed;
//     this.canUpdate = false;
// }

var foreign23 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Main$1
});

class GlobalRankData {
    /**
     * 排行数据
     * @param uid 用户唯一id
     * @param content 存储内容（伤害值、时间...）
     */
    constructor(uid, content) {
        this.uid = "";
        this.content = 0;
        if (!uid || !Player.getPlayer(uid)) {
            throw new Error("error uid ---> " + uid);
        }
        if (!content || content <= 0) {
            throw new Error("content must > zero");
        }
        this.uid = uid;
        this.content = content;
    }
}

var foreign24 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GlobalRankData
});

var foreign25 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

class GlobalRankModuleC extends mwext.ModuleC {
    constructor() {
        super(...arguments);
        this.DamageAction = new Action1();
    }
    net_updateDamageRankC(data) {
        this.DamageAction.call(data);
    }
}

var foreign26 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GlobalRankModuleC
});

class GlobalRankModuleS extends mwext.ModuleS {
    constructor() {
        super(...arguments);
        this.GameDamage = "MonsterVerse_Damage";
        this.time = 0;
        this.dataList = [];
        this.handlerRun = false;
        this.setCnt = 1;
    }
    onUpdate(dt) {
        this.time += dt;
        if (this.time >= 3) { // 3秒做一次更新
            this.updateDamageRank();
            this.time = 0;
        }
    }
    pushDamageData(data) {
        this.dataList.push(...data);
        if (this.handlerRun)
            return;
        this.handlerRun = true;
        this.trySaveData(this.GameDamage, (a, b) => b.content - a.content);
    }
    updateDamageRank() {
        DataStorage.asyncGetData(this.GameDamage).then((value) => {
            if (value.code === mw.DataStorageResultCode.Success) {
                if (value.data) {
                    this.getAllClient().net_updateDamageRankC(value.data);
                }
            }
            else {
                console.log("更新排行失败--->code:" + value.code);
            }
        });
    }
    trySaveData(dataTag, sort) {
        DataStorage.asyncGetData(dataTag).then((value) => {
            if (value.code === mw.DataStorageResultCode.Success) {
                let successData = value.data ?? [];
                let totalData = successData.concat(this.dataList);
                let sortData = totalData.sort(sort);
                let saveData = sortData.reduce((pre, cur) => {
                    if (pre.length === 8) // 到达最大数量
                        return pre;
                    if (pre.findIndex((item) => { return item.uid === cur.uid; }) === -1) // 没有这个玩家
                        pre.push(cur);
                    return pre;
                }, []);
                DataStorage.asyncSetData(dataTag, saveData).then(() => {
                    if (value.code === mw.DataStorageResultCode.Success) {
                        console.log("rank data save success");
                        this.dataList.length = 0;
                        this.handlerRun = false;
                        this.setCnt = 1;
                    }
                    else {
                        console.warn("set custom-data failed--->code:" + value.code);
                        if (this.setCnt > 0) {
                            setTimeout(() => {
                                this.trySaveData(dataTag, sort);
                                this.setCnt--;
                            }, 3000);
                        }
                        else {
                            this.dataList.length = 0;
                            this.handlerRun = false;
                            this.setCnt = 1;
                        }
                    }
                });
            }
            else {
                console.warn("get custom-data failed--->code:" + value.code);
                this.handlerRun = false;
            }
        });
    }
}

var foreign27 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GlobalRankModuleS
});

class PlayerData extends Subdata {
}
class PlayerModuleC extends ModuleC {
}
class PlayerModuleS extends ModuleS {
}

class Modules {
    /**初始化所有模块 */
    static initModules() {
        // add moduel
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerData);
    }
    static get cPlayer() {
        return ModuleService.getModule(PlayerModuleC);
    }
    static get sPlayer() {
        return ModuleService.getModule(PlayerModuleS);
    }
}

var foreign28 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Modules
});

/**数据体的一个标识 */
let flag = 0;
/**循环的最大值 */
let maxVal = 2 ** 16 - 1;
/**
 * 获取Body标识
 */
function getBodyFlag() {
    flag = (flag + 1) % maxVal;
    return flag;
}
class ReplicateBody {
    constructor() {
        this.flag = getBodyFlag();
    }
}
class AnimationBody extends ReplicateBody {
    /**
     * @param guid 动画资源guid
     * @param loop 循环(0是循环，1是播放一次) 默认 1
     * @param rate 播放速率 默认 1
     */
    constructor(guid, loop = 1, rate = 1) {
        super();
        this.guid = guid;
        this.loop = loop;
        this.rate = rate;
    }
}

var foreign30 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AnimationBody: AnimationBody,
    ReplicateBody: ReplicateBody
});

let CharacterBaseComp = class CharacterBaseComp extends Script {
    /**控制的人型对象 */
    get character() {
        return this.gameObject;
    }
    onStart() {
        this.useUpdate = SystemUtil.isClient();
    }
};
CharacterBaseComp = __decorate([
    mw.Component
], CharacterBaseComp);
var CharacterBaseComp$1 = CharacterBaseComp;

var foreign34 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CharacterBaseComp$1
});

var AnimationComp_1;
let AnimationComp = AnimationComp_1 = class AnimationComp extends CharacterBaseComp$1 {
    constructor() {
        super(...arguments);
        /**当前动画信息 */
        this._animationBody = null;
        /**动画 */
        this.animator = null;
        /**动画播放时间 */
        this._time = 0;
    }
    //#region getter/setter
    /**是否完成 */
    get isFinish() {
        return this.animator == null;
    }
    /**动画信息体 */
    set animationBody(body) {
        if (SystemUtil.isClient()) {
            this.onAnimationBody();
        }
        this._animationBody = body;
    }
    /**当前动画时间 */
    get time() {
        return this._time;
    }
    //#endregion
    //#region 生命周期函数
    onUpdate(dt) {
        if (!this.character)
            return;
        if (!this.character.isReady)
            return;
        if (!this._animationBody)
            return;
        if (!this.animator) {
            this.animator = this.character.loadAnimation(this._animationBody.guid);
            this.animator.speed = this._animationBody.rate;
            this.animator.loop = this._animationBody.loop ? 1 : 9999;
            this.animator.play();
            this._time = 0;
        }
        if (this._animationBody.loop === 0) {
            return;
        }
        this._time += dt;
        if (this._time >= this.animator.length) {
            this.stop();
            this._animationBody = null;
        }
    }
    /**
     * 动画状态机销毁，结束动画
     */
    onDestroy() {
        this.stop();
    }
    //#endregion
    stop() {
        if (this.animator) {
            this.animator.stop();
            this.animator = null;
        }
    }
    onAnimationBody() {
        this.stop();
    }
};
__decorate([
    mw.Property({ replicated: true, onChanged: AnimationComp_1.prototype.onAnimationBody })
], AnimationComp.prototype, "_animationBody", void 0);
AnimationComp = AnimationComp_1 = __decorate([
    mw.Component
], AnimationComp);
var AnimationComp$1 = AnimationComp;

var foreign31 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: AnimationComp$1
});

let AOIComp = class AOIComp extends CharacterBaseComp$1 {
    constructor() {
        super(...arguments);
        this.viewEntity = [];
    }
    addViewEntity(entity) {
    }
    removeViewEntity(entity) {
    }
};
AOIComp = __decorate([
    mw.Component
], AOIComp);

var AppearanceComp_1;
let AppearanceComp = AppearanceComp_1 = class AppearanceComp extends CharacterBaseComp$1 {
    constructor() {
        super(...arguments);
        /**换装数据 */
        this.appearanceData = [];
        /**临时的装备数据 */
        this.tempAppearanceData = new Set();
        this._dirtyMark = false;
    }
    /**标记是否有服装变动 */
    get dirtyMark() {
        return this._dirtyMark;
    }
    set dirtyMark(v) {
        this._dirtyMark = v;
        this.useUpdate = v;
    }
    /**
     * 设置一套服装(一般是当玩家确认保存装扮之后调用)
     * @param datas 换装数据
     */
    setSuit(datas) {
        this.appearanceData = datas;
        if (SystemUtil.isClient()) {
            this.onAppearanceData();
        }
    }
    /**
     * 设置一件服装（尽量不要在服务端频繁调用）
     * @param data 服装\插件数据
     */
    setOnePart(data) {
        if (SystemUtil.isServer()) {
            if (!this.appearanceData.includes(data)) {
                this.appearanceData.push(data);
            }
        }
        else {
            if (!this.tempAppearanceData.has(data)) {
                this.tempAppearanceData.add(data);
                this.dirtyMark = true;
            }
        }
    }
    /**
     * 清除一件服装（尽量不要在服务端频繁调用）
     * @param data 服装\插件数据
     */
    clearOnePart(data) {
        if (SystemUtil.isServer()) {
            let idx = this.appearanceData.indexOf(data);
            if (idx !== -1) {
                this.appearanceData.splice(idx, 1);
            }
        }
        else {
            if (this.tempAppearanceData.has(data)) {
                this.tempAppearanceData.delete(data);
                this.dirtyMark = true;
            }
        }
    }
    onUpdate(dt) {
        if (!this.character)
            return;
        if (!this.character.isReady)
            return;
        if (this.dirtyMark) {
            this.character.setDescription([...this.tempAppearanceData]);
            this.dirtyMark = false;
        }
    }
    onAppearanceData() {
        this.dirtyMark = true;
        this.tempAppearanceData.clear();
        this.appearanceData.forEach(elem => {
            this.tempAppearanceData.add(elem);
        });
    }
};
__decorate([
    Property({ replicated: true, onChanged: AppearanceComp_1.prototype.onAppearanceData })
], AppearanceComp.prototype, "appearanceData", void 0);
AppearanceComp = AppearanceComp_1 = __decorate([
    mw.Component
], AppearanceComp);
var AppearanceComp$1 = AppearanceComp;

var foreign33 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: AppearanceComp$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/BigItem1_BasicUI.ui
*/
let BigItem1_BasicUI_Generate = class BigItem1_BasicUI_Generate extends UIScript {
    get mCanvas_Item_Shop() {
        if (!this.mCanvas_Item_Shop_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop');
        }
        return this.mCanvas_Item_Shop_Internal;
    }
    get mImg_Item_ShopBG() {
        if (!this.mImg_Item_ShopBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mImg_Item_ShopBG');
        }
        return this.mImg_Item_ShopBG_Internal;
    }
    get mImg_Item_ShopTxt() {
        if (!this.mImg_Item_ShopTxt_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mImg_Item_ShopTxt');
        }
        return this.mImg_Item_ShopTxt_Internal;
    }
    get mTxt_Item_ShoPrice() {
        if (!this.mTxt_Item_ShoPrice_Internal && this.uiWidgetBase) {
            this.mTxt_Item_ShoPrice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mTxt_Item_ShoPrice');
        }
        return this.mTxt_Item_ShoPrice_Internal;
    }
    get mImg_Item_ShopPic() {
        if (!this.mImg_Item_ShopPic_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mImg_Item_ShopPic');
        }
        return this.mImg_Item_ShopPic_Internal;
    }
    get mTxt_Item_ShopName() {
        if (!this.mTxt_Item_ShopName_Internal && this.uiWidgetBase) {
            this.mTxt_Item_ShopName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mTxt_Item_ShopName');
        }
        return this.mTxt_Item_ShopName_Internal;
    }
    get mImg_Item_ShopCash() {
        if (!this.mImg_Item_ShopCash_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopCash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mImg_Item_ShopCash');
        }
        return this.mImg_Item_ShopCash_Internal;
    }
    get mBtn_Item_Shop() {
        if (!this.mBtn_Item_Shop_Internal && this.uiWidgetBase) {
            this.mBtn_Item_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mBtn_Item_Shop');
        }
        return this.mBtn_Item_Shop_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
BigItem1_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/BigItem1_BasicUI.ui')
], BigItem1_BasicUI_Generate);
var BigItem1_BasicUI_Generate$1 = BigItem1_BasicUI_Generate;

var foreign35 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BigItem1_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/BigItem2_BasicUI.ui
*/
let BigItem2_BasicUI_Generate = class BigItem2_BasicUI_Generate extends UIScript {
    get mCanvas_Item_Illustrated() {
        if (!this.mCanvas_Item_Illustrated_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_Illustrated_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Illustrated');
        }
        return this.mCanvas_Item_Illustrated_Internal;
    }
    get mImg_Item_BG() {
        if (!this.mImg_Item_BG_Internal && this.uiWidgetBase) {
            this.mImg_Item_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Illustrated/mImg_Item_BG');
        }
        return this.mImg_Item_BG_Internal;
    }
    get mImg_Item_NameBG() {
        if (!this.mImg_Item_NameBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_NameBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Illustrated/mImg_Item_NameBG');
        }
        return this.mImg_Item_NameBG_Internal;
    }
    get mTxt_Item_Name() {
        if (!this.mTxt_Item_Name_Internal && this.uiWidgetBase) {
            this.mTxt_Item_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Illustrated/mTxt_Item_Name');
        }
        return this.mTxt_Item_Name_Internal;
    }
    get mImg_Item_Pic() {
        if (!this.mImg_Item_Pic_Internal && this.uiWidgetBase) {
            this.mImg_Item_Pic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Illustrated/mImg_Item_Pic');
        }
        return this.mImg_Item_Pic_Internal;
    }
    get mBtn_Item_Illustrated() {
        if (!this.mBtn_Item_Illustrated_Internal && this.uiWidgetBase) {
            this.mBtn_Item_Illustrated_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Illustrated/mBtn_Item_Illustrated');
        }
        return this.mBtn_Item_Illustrated_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
BigItem2_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/BigItem2_BasicUI.ui')
], BigItem2_BasicUI_Generate);
var BigItem2_BasicUI_Generate$1 = BigItem2_BasicUI_Generate;

var foreign36 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BigItem2_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/BigItem3_BasicUI.ui
*/
let BigItem3_BasicUI_Generate = class BigItem3_BasicUI_Generate extends UIScript {
    get mCanvas_Item_Bag() {
        if (!this.mCanvas_Item_Bag_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_Bag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag');
        }
        return this.mCanvas_Item_Bag_Internal;
    }
    get mImg_Item_BagBG() {
        if (!this.mImg_Item_BagBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_BagBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag/mImg_Item_BagBG');
        }
        return this.mImg_Item_BagBG_Internal;
    }
    get mImg_Item_BagTxt() {
        if (!this.mImg_Item_BagTxt_Internal && this.uiWidgetBase) {
            this.mImg_Item_BagTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag/mImg_Item_BagTxt');
        }
        return this.mImg_Item_BagTxt_Internal;
    }
    get mTxt_Item_Name() {
        if (!this.mTxt_Item_Name_Internal && this.uiWidgetBase) {
            this.mTxt_Item_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag/mTxt_Item_Name');
        }
        return this.mTxt_Item_Name_Internal;
    }
    get mImg_Item_BagPoc() {
        if (!this.mImg_Item_BagPoc_Internal && this.uiWidgetBase) {
            this.mImg_Item_BagPoc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag/mImg_Item_BagPoc');
        }
        return this.mImg_Item_BagPoc_Internal;
    }
    get mTxt_Item_Count() {
        if (!this.mTxt_Item_Count_Internal && this.uiWidgetBase) {
            this.mTxt_Item_Count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag/mTxt_Item_Count');
        }
        return this.mTxt_Item_Count_Internal;
    }
    get mBtn_Item_Bag() {
        if (!this.mBtn_Item_Bag_Internal && this.uiWidgetBase) {
            this.mBtn_Item_Bag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag/mBtn_Item_Bag');
        }
        return this.mBtn_Item_Bag_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
BigItem3_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/BigItem3_BasicUI.ui')
], BigItem3_BasicUI_Generate);
var BigItem3_BasicUI_Generate$1 = BigItem3_BasicUI_Generate;

var foreign37 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BigItem3_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/CreateRole_BasicUI.ui
*/
let CreateRole_BasicUI_Generate = class CreateRole_BasicUI_Generate extends UIScript {
    get mCanvas_UI_Create() {
        if (!this.mCanvas_UI_Create_Internal && this.uiWidgetBase) {
            this.mCanvas_UI_Create_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create');
        }
        return this.mCanvas_UI_Create_Internal;
    }
    get mBtn_Define() {
        if (!this.mBtn_Define_Internal && this.uiWidgetBase) {
            this.mBtn_Define_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mBtn_Define');
        }
        return this.mBtn_Define_Internal;
    }
    get mCanvas_ItemChose() {
        if (!this.mCanvas_ItemChose_Internal && this.uiWidgetBase) {
            this.mCanvas_ItemChose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose');
        }
        return this.mCanvas_ItemChose_Internal;
    }
    get mImg_ItemChose_BG() {
        if (!this.mImg_ItemChose_BG_Internal && this.uiWidgetBase) {
            this.mImg_ItemChose_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mImg_ItemChose_BG');
        }
        return this.mImg_ItemChose_BG_Internal;
    }
    get mScrollBox_TabIcon() {
        if (!this.mScrollBox_TabIcon_Internal && this.uiWidgetBase) {
            this.mScrollBox_TabIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon');
        }
        return this.mScrollBox_TabIcon_Internal;
    }
    get mCanvas_TabIcon_AutoSet() {
        if (!this.mCanvas_TabIcon_AutoSet_Internal && this.uiWidgetBase) {
            this.mCanvas_TabIcon_AutoSet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet');
        }
        return this.mCanvas_TabIcon_AutoSet_Internal;
    }
    get mCanvas_TabIcon_Item() {
        if (!this.mCanvas_TabIcon_Item_Internal && this.uiWidgetBase) {
            this.mCanvas_TabIcon_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item');
        }
        return this.mCanvas_TabIcon_Item_Internal;
    }
    get mImg_TabIcon_Pic1() {
        if (!this.mImg_TabIcon_Pic1_Internal && this.uiWidgetBase) {
            this.mImg_TabIcon_Pic1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item/mImg_TabIcon_Pic1');
        }
        return this.mImg_TabIcon_Pic1_Internal;
    }
    get mBtn_TabIcon_Item1() {
        if (!this.mBtn_TabIcon_Item1_Internal && this.uiWidgetBase) {
            this.mBtn_TabIcon_Item1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item/mBtn_TabIcon_Item1');
        }
        return this.mBtn_TabIcon_Item1_Internal;
    }
    get mCanvas_TabIcon_Item2() {
        if (!this.mCanvas_TabIcon_Item2_Internal && this.uiWidgetBase) {
            this.mCanvas_TabIcon_Item2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item2');
        }
        return this.mCanvas_TabIcon_Item2_Internal;
    }
    get mImg_TabIcon_Pic2() {
        if (!this.mImg_TabIcon_Pic2_Internal && this.uiWidgetBase) {
            this.mImg_TabIcon_Pic2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item2/mImg_TabIcon_Pic2');
        }
        return this.mImg_TabIcon_Pic2_Internal;
    }
    get mBtn_TabIcon_Item2() {
        if (!this.mBtn_TabIcon_Item2_Internal && this.uiWidgetBase) {
            this.mBtn_TabIcon_Item2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item2/mBtn_TabIcon_Item2');
        }
        return this.mBtn_TabIcon_Item2_Internal;
    }
    get mCanvas_TabIcon_Item3() {
        if (!this.mCanvas_TabIcon_Item3_Internal && this.uiWidgetBase) {
            this.mCanvas_TabIcon_Item3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item3');
        }
        return this.mCanvas_TabIcon_Item3_Internal;
    }
    get mImg_TabIcon_BG3() {
        if (!this.mImg_TabIcon_BG3_Internal && this.uiWidgetBase) {
            this.mImg_TabIcon_BG3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item3/mImg_TabIcon_BG3');
        }
        return this.mImg_TabIcon_BG3_Internal;
    }
    get mImg_TabIcon_Pic3a() {
        if (!this.mImg_TabIcon_Pic3a_Internal && this.uiWidgetBase) {
            this.mImg_TabIcon_Pic3a_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item3/mImg_TabIcon_Pic3a');
        }
        return this.mImg_TabIcon_Pic3a_Internal;
    }
    get mBtn_TabIcon_Item3() {
        if (!this.mBtn_TabIcon_Item3_Internal && this.uiWidgetBase) {
            this.mBtn_TabIcon_Item3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item3/mBtn_TabIcon_Item3');
        }
        return this.mBtn_TabIcon_Item3_Internal;
    }
    get mCanvas_TabIcon_Item4() {
        if (!this.mCanvas_TabIcon_Item4_Internal && this.uiWidgetBase) {
            this.mCanvas_TabIcon_Item4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item4');
        }
        return this.mCanvas_TabIcon_Item4_Internal;
    }
    get mImg_TabIcon_Pic3b() {
        if (!this.mImg_TabIcon_Pic3b_Internal && this.uiWidgetBase) {
            this.mImg_TabIcon_Pic3b_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item4/mImg_TabIcon_Pic3b');
        }
        return this.mImg_TabIcon_Pic3b_Internal;
    }
    get mBtn_TabIcon_Item4() {
        if (!this.mBtn_TabIcon_Item4_Internal && this.uiWidgetBase) {
            this.mBtn_TabIcon_Item4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item4/mBtn_TabIcon_Item4');
        }
        return this.mBtn_TabIcon_Item4_Internal;
    }
    get mCanvas_TabIcon_Item5() {
        if (!this.mCanvas_TabIcon_Item5_Internal && this.uiWidgetBase) {
            this.mCanvas_TabIcon_Item5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item5');
        }
        return this.mCanvas_TabIcon_Item5_Internal;
    }
    get mImg_TabIcon_Pic3c() {
        if (!this.mImg_TabIcon_Pic3c_Internal && this.uiWidgetBase) {
            this.mImg_TabIcon_Pic3c_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item5/mImg_TabIcon_Pic3c');
        }
        return this.mImg_TabIcon_Pic3c_Internal;
    }
    get mBtn_TabIcon_Item5() {
        if (!this.mBtn_TabIcon_Item5_Internal && this.uiWidgetBase) {
            this.mBtn_TabIcon_Item5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item5/mBtn_TabIcon_Item5');
        }
        return this.mBtn_TabIcon_Item5_Internal;
    }
    get mScrollBox_ItemChose() {
        if (!this.mScrollBox_ItemChose_Internal && this.uiWidgetBase) {
            this.mScrollBox_ItemChose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose');
        }
        return this.mScrollBox_ItemChose_Internal;
    }
    get mCanvas_ItemContent() {
        if (!this.mCanvas_ItemContent_Internal && this.uiWidgetBase) {
            this.mCanvas_ItemContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose/mCanvas_ItemContent');
        }
        return this.mCanvas_ItemContent_Internal;
    }
    get mCanvas_Item() {
        if (!this.mCanvas_Item_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose/mCanvas_ItemContent/mCanvas_Item');
        }
        return this.mCanvas_Item_Internal;
    }
    get mBtn_Item() {
        if (!this.mBtn_Item_Internal && this.uiWidgetBase) {
            this.mBtn_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose/mCanvas_ItemContent/mCanvas_Item/mBtn_Item');
        }
        return this.mBtn_Item_Internal;
    }
    get mImg_Item_BG() {
        if (!this.mImg_Item_BG_Internal && this.uiWidgetBase) {
            this.mImg_Item_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose/mCanvas_ItemContent/mCanvas_Item/mImg_Item_BG');
        }
        return this.mImg_Item_BG_Internal;
    }
    get mImg_Item_Pic() {
        if (!this.mImg_Item_Pic_Internal && this.uiWidgetBase) {
            this.mImg_Item_Pic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose/mCanvas_ItemContent/mCanvas_Item/mImg_Item_Pic');
        }
        return this.mImg_Item_Pic_Internal;
    }
    get mImg_Item_Frame() {
        if (!this.mImg_Item_Frame_Internal && this.uiWidgetBase) {
            this.mImg_Item_Frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose/mCanvas_ItemContent/mCanvas_Item/mImg_Item_Frame');
        }
        return this.mImg_Item_Frame_Internal;
    }
    get mCanvas_Tab() {
        if (!this.mCanvas_Tab_Internal && this.uiWidgetBase) {
            this.mCanvas_Tab_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab');
        }
        return this.mCanvas_Tab_Internal;
    }
    get mCanvas_TabChosen() {
        if (!this.mCanvas_TabChosen_Internal && this.uiWidgetBase) {
            this.mCanvas_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabChosen');
        }
        return this.mCanvas_TabChosen_Internal;
    }
    get mBtn_TabChosen() {
        if (!this.mBtn_TabChosen_Internal && this.uiWidgetBase) {
            this.mBtn_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabChosen/mBtn_TabChosen');
        }
        return this.mBtn_TabChosen_Internal;
    }
    get mTxt_TabChosen() {
        if (!this.mTxt_TabChosen_Internal && this.uiWidgetBase) {
            this.mTxt_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabChosen/mTxt_TabChosen');
        }
        return this.mTxt_TabChosen_Internal;
    }
    get mCanvas_TabNormal() {
        if (!this.mCanvas_TabNormal_Internal && this.uiWidgetBase) {
            this.mCanvas_TabNormal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal');
        }
        return this.mCanvas_TabNormal_Internal;
    }
    get mBtn_TabNormal1() {
        if (!this.mBtn_TabNormal1_Internal && this.uiWidgetBase) {
            this.mBtn_TabNormal1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal/mBtn_TabNormal1');
        }
        return this.mBtn_TabNormal1_Internal;
    }
    get mTxt_TabNormal1() {
        if (!this.mTxt_TabNormal1_Internal && this.uiWidgetBase) {
            this.mTxt_TabNormal1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal/mTxt_TabNormal1');
        }
        return this.mTxt_TabNormal1_Internal;
    }
    get mCanvas_TabNormal_1() {
        if (!this.mCanvas_TabNormal_1_Internal && this.uiWidgetBase) {
            this.mCanvas_TabNormal_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_1');
        }
        return this.mCanvas_TabNormal_1_Internal;
    }
    get mBtn_TabNormal2() {
        if (!this.mBtn_TabNormal2_Internal && this.uiWidgetBase) {
            this.mBtn_TabNormal2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_1/mBtn_TabNormal2');
        }
        return this.mBtn_TabNormal2_Internal;
    }
    get mTxt_TabNormal2() {
        if (!this.mTxt_TabNormal2_Internal && this.uiWidgetBase) {
            this.mTxt_TabNormal2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_1/mTxt_TabNormal2');
        }
        return this.mTxt_TabNormal2_Internal;
    }
    get mCanvas_TabNormal_2() {
        if (!this.mCanvas_TabNormal_2_Internal && this.uiWidgetBase) {
            this.mCanvas_TabNormal_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_2');
        }
        return this.mCanvas_TabNormal_2_Internal;
    }
    get mBtn_TabNormal3() {
        if (!this.mBtn_TabNormal3_Internal && this.uiWidgetBase) {
            this.mBtn_TabNormal3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_2/mBtn_TabNormal3');
        }
        return this.mBtn_TabNormal3_Internal;
    }
    get mTxt_TabNormal3() {
        if (!this.mTxt_TabNormal3_Internal && this.uiWidgetBase) {
            this.mTxt_TabNormal3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_2/mTxt_TabNormal3');
        }
        return this.mTxt_TabNormal3_Internal;
    }
    get mCanvas_TabNormal_3() {
        if (!this.mCanvas_TabNormal_3_Internal && this.uiWidgetBase) {
            this.mCanvas_TabNormal_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_3');
        }
        return this.mCanvas_TabNormal_3_Internal;
    }
    get mBtn_TabNormal4() {
        if (!this.mBtn_TabNormal4_Internal && this.uiWidgetBase) {
            this.mBtn_TabNormal4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_3/mBtn_TabNormal4');
        }
        return this.mBtn_TabNormal4_Internal;
    }
    get mTxt_TabNormal4() {
        if (!this.mTxt_TabNormal4_Internal && this.uiWidgetBase) {
            this.mTxt_TabNormal4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_3/mTxt_TabNormal4');
        }
        return this.mTxt_TabNormal4_Internal;
    }
    get mCanvas_Gender_Men() {
        if (!this.mCanvas_Gender_Men_Internal && this.uiWidgetBase) {
            this.mCanvas_Gender_Men_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Gender_Men');
        }
        return this.mCanvas_Gender_Men_Internal;
    }
    get mBtn_Gender_Men() {
        if (!this.mBtn_Gender_Men_Internal && this.uiWidgetBase) {
            this.mBtn_Gender_Men_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Gender_Men/mBtn_Gender_Men');
        }
        return this.mBtn_Gender_Men_Internal;
    }
    get mCanvas_GendeMen_ICon() {
        if (!this.mCanvas_GendeMen_ICon_Internal && this.uiWidgetBase) {
            this.mCanvas_GendeMen_ICon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Gender_Men/mCanvas_GendeMen_ICon');
        }
        return this.mCanvas_GendeMen_ICon_Internal;
    }
    get mCanvas_Gender_Women() {
        if (!this.mCanvas_Gender_Women_Internal && this.uiWidgetBase) {
            this.mCanvas_Gender_Women_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Gender_Women');
        }
        return this.mCanvas_Gender_Women_Internal;
    }
    get mBtn_Gender_Women() {
        if (!this.mBtn_Gender_Women_Internal && this.uiWidgetBase) {
            this.mBtn_Gender_Women_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Gender_Women/mBtn_Gender_Women');
        }
        return this.mBtn_Gender_Women_Internal;
    }
    get mCanvas_GendeWomen_Icon() {
        if (!this.mCanvas_GendeWomen_Icon_Internal && this.uiWidgetBase) {
            this.mCanvas_GendeWomen_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Gender_Women/mCanvas_GendeWomen_Icon');
        }
        return this.mCanvas_GendeWomen_Icon_Internal;
    }
    get mTxt_ItemDetails() {
        if (!this.mTxt_ItemDetails_Internal && this.uiWidgetBase) {
            this.mTxt_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mTxt_ItemDetails');
        }
        return this.mTxt_ItemDetails_Internal;
    }
    get mTxt_ItemName() {
        if (!this.mTxt_ItemName_Internal && this.uiWidgetBase) {
            this.mTxt_ItemName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mTxt_ItemName');
        }
        return this.mTxt_ItemName_Internal;
    }
    get mCanvas_Clean() {
        if (!this.mCanvas_Clean_Internal && this.uiWidgetBase) {
            this.mCanvas_Clean_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Clean');
        }
        return this.mCanvas_Clean_Internal;
    }
    get mBtn_Clean() {
        if (!this.mBtn_Clean_Internal && this.uiWidgetBase) {
            this.mBtn_Clean_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Clean/mBtn_Clean');
        }
        return this.mBtn_Clean_Internal;
    }
    get mImg_Clean_Icon() {
        if (!this.mImg_Clean_Icon_Internal && this.uiWidgetBase) {
            this.mImg_Clean_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Clean/mImg_Clean_Icon');
        }
        return this.mImg_Clean_Icon_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
CreateRole_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/CreateRole_BasicUI.ui')
], CreateRole_BasicUI_Generate);
var CreateRole_BasicUI_Generate$1 = CreateRole_BasicUI_Generate;

var foreign38 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CreateRole_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Purchase1_BasicUI.ui
*/
let Purchase1_BasicUI_Generate = class Purchase1_BasicUI_Generate extends UIScript {
    get mBtn_Mask() {
        if (!this.mBtn_Mask_Internal && this.uiWidgetBase) {
            this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask');
        }
        return this.mBtn_Mask_Internal;
    }
    get mCanvas_UI_Purchase() {
        if (!this.mCanvas_UI_Purchase_Internal && this.uiWidgetBase) {
            this.mCanvas_UI_Purchase_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase');
        }
        return this.mCanvas_UI_Purchase_Internal;
    }
    get mImg_Purchase_BG() {
        if (!this.mImg_Purchase_BG_Internal && this.uiWidgetBase) {
            this.mImg_Purchase_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mImg_Purchase_BG');
        }
        return this.mImg_Purchase_BG_Internal;
    }
    get mTxt_Purchase() {
        if (!this.mTxt_Purchase_Internal && this.uiWidgetBase) {
            this.mTxt_Purchase_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mTxt_Purchase');
        }
        return this.mTxt_Purchase_Internal;
    }
    get mCanvas_Btn_Close() {
        if (!this.mCanvas_Btn_Close_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_Btn_Close');
        }
        return this.mCanvas_Btn_Close_Internal;
    }
    get mBtn_Close() {
        if (!this.mBtn_Close_Internal && this.uiWidgetBase) {
            this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_Btn_Close/mBtn_Close');
        }
        return this.mBtn_Close_Internal;
    }
    get mCanvas_ItemDetails() {
        if (!this.mCanvas_ItemDetails_Internal && this.uiWidgetBase) {
            this.mCanvas_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails');
        }
        return this.mCanvas_ItemDetails_Internal;
    }
    get mCanvas_ItemImg() {
        if (!this.mCanvas_ItemImg_Internal && this.uiWidgetBase) {
            this.mCanvas_ItemImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_ItemImg');
        }
        return this.mCanvas_ItemImg_Internal;
    }
    get mImg_ItemImg_BG() {
        if (!this.mImg_ItemImg_BG_Internal && this.uiWidgetBase) {
            this.mImg_ItemImg_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_ItemImg/mImg_ItemImg_BG');
        }
        return this.mImg_ItemImg_BG_Internal;
    }
    get mImg_ItemImg_Img() {
        if (!this.mImg_ItemImg_Img_Internal && this.uiWidgetBase) {
            this.mImg_ItemImg_Img_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_ItemImg/mImg_ItemImg_Img');
        }
        return this.mImg_ItemImg_Img_Internal;
    }
    get mTxt_ItemName() {
        if (!this.mTxt_ItemName_Internal && this.uiWidgetBase) {
            this.mTxt_ItemName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mTxt_ItemName');
        }
        return this.mTxt_ItemName_Internal;
    }
    get mTxt_ItemDetails() {
        if (!this.mTxt_ItemDetails_Internal && this.uiWidgetBase) {
            this.mTxt_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mTxt_ItemDetails');
        }
        return this.mTxt_ItemDetails_Internal;
    }
    get mCanvas_BtnBottom() {
        if (!this.mCanvas_BtnBottom_Internal && this.uiWidgetBase) {
            this.mCanvas_BtnBottom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom');
        }
        return this.mCanvas_BtnBottom_Internal;
    }
    get mCanvas_Btn_Grey() {
        if (!this.mCanvas_Btn_Grey_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Grey_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Grey');
        }
        return this.mCanvas_Btn_Grey_Internal;
    }
    get mBtn_Grey() {
        if (!this.mBtn_Grey_Internal && this.uiWidgetBase) {
            this.mBtn_Grey_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Grey/mBtn_Grey');
        }
        return this.mBtn_Grey_Internal;
    }
    get mTxt_Btn_Grey() {
        if (!this.mTxt_Btn_Grey_Internal && this.uiWidgetBase) {
            this.mTxt_Btn_Grey_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Grey/mBtn_Grey/mTxt_Btn_Grey');
        }
        return this.mTxt_Btn_Grey_Internal;
    }
    get mCanvas_Btn_Mint() {
        if (!this.mCanvas_Btn_Mint_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint');
        }
        return this.mCanvas_Btn_Mint_Internal;
    }
    get mCanvas_Price() {
        if (!this.mCanvas_Price_Internal && this.uiWidgetBase) {
            this.mCanvas_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mCanvas_Price');
        }
        return this.mCanvas_Price_Internal;
    }
    get mImg_Price_BG() {
        if (!this.mImg_Price_BG_Internal && this.uiWidgetBase) {
            this.mImg_Price_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mCanvas_Price/mImg_Price_BG');
        }
        return this.mImg_Price_BG_Internal;
    }
    get mImg_Price_Icon() {
        if (!this.mImg_Price_Icon_Internal && this.uiWidgetBase) {
            this.mImg_Price_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mCanvas_Price/mImg_Price_Icon');
        }
        return this.mImg_Price_Icon_Internal;
    }
    get mTxt_Price() {
        if (!this.mTxt_Price_Internal && this.uiWidgetBase) {
            this.mTxt_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mCanvas_Price/mTxt_Price');
        }
        return this.mTxt_Price_Internal;
    }
    get mBtn_Mint() {
        if (!this.mBtn_Mint_Internal && this.uiWidgetBase) {
            this.mBtn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mBtn_Mint');
        }
        return this.mBtn_Mint_Internal;
    }
    get mTxt_Btn_Mint() {
        if (!this.mTxt_Btn_Mint_Internal && this.uiWidgetBase) {
            this.mTxt_Btn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mBtn_Mint/mTxt_Btn_Mint');
        }
        return this.mTxt_Btn_Mint_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
Purchase1_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/Purchase1_BasicUI.ui')
], Purchase1_BasicUI_Generate);
var Purchase1_BasicUI_Generate$1 = Purchase1_BasicUI_Generate;

var foreign39 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Purchase1_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Purchase2_BasicUI.ui
*/
let Purchase2_BasicUI_Generate = class Purchase2_BasicUI_Generate extends UIScript {
    get mBtn_Mask() {
        if (!this.mBtn_Mask_Internal && this.uiWidgetBase) {
            this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask');
        }
        return this.mBtn_Mask_Internal;
    }
    get mCanvas_UI_Purchase() {
        if (!this.mCanvas_UI_Purchase_Internal && this.uiWidgetBase) {
            this.mCanvas_UI_Purchase_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase');
        }
        return this.mCanvas_UI_Purchase_Internal;
    }
    get mImg_Purchase_BG() {
        if (!this.mImg_Purchase_BG_Internal && this.uiWidgetBase) {
            this.mImg_Purchase_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mImg_Purchase_BG');
        }
        return this.mImg_Purchase_BG_Internal;
    }
    get mTxt_Purchase() {
        if (!this.mTxt_Purchase_Internal && this.uiWidgetBase) {
            this.mTxt_Purchase_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mTxt_Purchase');
        }
        return this.mTxt_Purchase_Internal;
    }
    get mCanvas_Btn_Close() {
        if (!this.mCanvas_Btn_Close_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_Btn_Close');
        }
        return this.mCanvas_Btn_Close_Internal;
    }
    get mBtn_Close() {
        if (!this.mBtn_Close_Internal && this.uiWidgetBase) {
            this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_Btn_Close/mBtn_Close');
        }
        return this.mBtn_Close_Internal;
    }
    get mCanvas_ItemDetails() {
        if (!this.mCanvas_ItemDetails_Internal && this.uiWidgetBase) {
            this.mCanvas_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails');
        }
        return this.mCanvas_ItemDetails_Internal;
    }
    get mCanvas_ItemImg() {
        if (!this.mCanvas_ItemImg_Internal && this.uiWidgetBase) {
            this.mCanvas_ItemImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_ItemImg');
        }
        return this.mCanvas_ItemImg_Internal;
    }
    get mImg_ItemImg_BG() {
        if (!this.mImg_ItemImg_BG_Internal && this.uiWidgetBase) {
            this.mImg_ItemImg_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_ItemImg/mImg_ItemImg_BG');
        }
        return this.mImg_ItemImg_BG_Internal;
    }
    get mImg_ItemImg_Img() {
        if (!this.mImg_ItemImg_Img_Internal && this.uiWidgetBase) {
            this.mImg_ItemImg_Img_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_ItemImg/mImg_ItemImg_Img');
        }
        return this.mImg_ItemImg_Img_Internal;
    }
    get mTxt_ItemName() {
        if (!this.mTxt_ItemName_Internal && this.uiWidgetBase) {
            this.mTxt_ItemName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mTxt_ItemName');
        }
        return this.mTxt_ItemName_Internal;
    }
    get mTxt_ItemDetails() {
        if (!this.mTxt_ItemDetails_Internal && this.uiWidgetBase) {
            this.mTxt_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mTxt_ItemDetails');
        }
        return this.mTxt_ItemDetails_Internal;
    }
    get mCanvas_Bar_Value() {
        if (!this.mCanvas_Bar_Value_Internal && this.uiWidgetBase) {
            this.mCanvas_Bar_Value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_Bar_Value');
        }
        return this.mCanvas_Bar_Value_Internal;
    }
    get mBar_Value() {
        if (!this.mBar_Value_Internal && this.uiWidgetBase) {
            this.mBar_Value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_Bar_Value/mBar_Value');
        }
        return this.mBar_Value_Internal;
    }
    get mTxt_Value() {
        if (!this.mTxt_Value_Internal && this.uiWidgetBase) {
            this.mTxt_Value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_Bar_Value/mTxt_Value');
        }
        return this.mTxt_Value_Internal;
    }
    get mBtn_Reduce() {
        if (!this.mBtn_Reduce_Internal && this.uiWidgetBase) {
            this.mBtn_Reduce_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_Bar_Value/mBtn_Reduce');
        }
        return this.mBtn_Reduce_Internal;
    }
    get mBtn_Add() {
        if (!this.mBtn_Add_Internal && this.uiWidgetBase) {
            this.mBtn_Add_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_Bar_Value/mBtn_Add');
        }
        return this.mBtn_Add_Internal;
    }
    get mCanvas_BtnBottom() {
        if (!this.mCanvas_BtnBottom_Internal && this.uiWidgetBase) {
            this.mCanvas_BtnBottom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom');
        }
        return this.mCanvas_BtnBottom_Internal;
    }
    get mCanvas_Btn_Grey() {
        if (!this.mCanvas_Btn_Grey_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Grey_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Grey');
        }
        return this.mCanvas_Btn_Grey_Internal;
    }
    get mBtn_Grey() {
        if (!this.mBtn_Grey_Internal && this.uiWidgetBase) {
            this.mBtn_Grey_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Grey/mBtn_Grey');
        }
        return this.mBtn_Grey_Internal;
    }
    get mTxt_Btn_Grey() {
        if (!this.mTxt_Btn_Grey_Internal && this.uiWidgetBase) {
            this.mTxt_Btn_Grey_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Grey/mBtn_Grey/mTxt_Btn_Grey');
        }
        return this.mTxt_Btn_Grey_Internal;
    }
    get mCanvas_Btn_Mint() {
        if (!this.mCanvas_Btn_Mint_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint');
        }
        return this.mCanvas_Btn_Mint_Internal;
    }
    get mCanvas_Price() {
        if (!this.mCanvas_Price_Internal && this.uiWidgetBase) {
            this.mCanvas_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mCanvas_Price');
        }
        return this.mCanvas_Price_Internal;
    }
    get mImg_Price_BG() {
        if (!this.mImg_Price_BG_Internal && this.uiWidgetBase) {
            this.mImg_Price_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mCanvas_Price/mImg_Price_BG');
        }
        return this.mImg_Price_BG_Internal;
    }
    get mImg_Price_Icon() {
        if (!this.mImg_Price_Icon_Internal && this.uiWidgetBase) {
            this.mImg_Price_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mCanvas_Price/mImg_Price_Icon');
        }
        return this.mImg_Price_Icon_Internal;
    }
    get mTxt_Price() {
        if (!this.mTxt_Price_Internal && this.uiWidgetBase) {
            this.mTxt_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mCanvas_Price/mTxt_Price');
        }
        return this.mTxt_Price_Internal;
    }
    get mBtn_Mint() {
        if (!this.mBtn_Mint_Internal && this.uiWidgetBase) {
            this.mBtn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mBtn_Mint');
        }
        return this.mBtn_Mint_Internal;
    }
    get mTxt_Btn_Mint() {
        if (!this.mTxt_Btn_Mint_Internal && this.uiWidgetBase) {
            this.mTxt_Btn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mBtn_Mint/mTxt_Btn_Mint');
        }
        return this.mTxt_Btn_Mint_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
Purchase2_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/Purchase2_BasicUI.ui')
], Purchase2_BasicUI_Generate);
var Purchase2_BasicUI_Generate$1 = Purchase2_BasicUI_Generate;

var foreign40 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Purchase2_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Purchase3_BasicUI.ui
*/
let Purchase3_BasicUI_Generate = class Purchase3_BasicUI_Generate extends UIScript {
    get mBtn_Mask() {
        if (!this.mBtn_Mask_Internal && this.uiWidgetBase) {
            this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask');
        }
        return this.mBtn_Mask_Internal;
    }
    get mCanvas_UI_Purchase() {
        if (!this.mCanvas_UI_Purchase_Internal && this.uiWidgetBase) {
            this.mCanvas_UI_Purchase_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase');
        }
        return this.mCanvas_UI_Purchase_Internal;
    }
    get mImg_Purchase_BG() {
        if (!this.mImg_Purchase_BG_Internal && this.uiWidgetBase) {
            this.mImg_Purchase_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mImg_Purchase_BG');
        }
        return this.mImg_Purchase_BG_Internal;
    }
    get mTxt_Purchase() {
        if (!this.mTxt_Purchase_Internal && this.uiWidgetBase) {
            this.mTxt_Purchase_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mTxt_Purchase');
        }
        return this.mTxt_Purchase_Internal;
    }
    get mCanvas_Btn_Close() {
        if (!this.mCanvas_Btn_Close_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_Btn_Close');
        }
        return this.mCanvas_Btn_Close_Internal;
    }
    get mBtn_Close() {
        if (!this.mBtn_Close_Internal && this.uiWidgetBase) {
            this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_Btn_Close/mBtn_Close');
        }
        return this.mBtn_Close_Internal;
    }
    get mCanvas_ItemDetails() {
        if (!this.mCanvas_ItemDetails_Internal && this.uiWidgetBase) {
            this.mCanvas_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails');
        }
        return this.mCanvas_ItemDetails_Internal;
    }
    get mCanvas_ItemImg() {
        if (!this.mCanvas_ItemImg_Internal && this.uiWidgetBase) {
            this.mCanvas_ItemImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_ItemImg');
        }
        return this.mCanvas_ItemImg_Internal;
    }
    get mImg_ItemImg_BG() {
        if (!this.mImg_ItemImg_BG_Internal && this.uiWidgetBase) {
            this.mImg_ItemImg_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_ItemImg/mImg_ItemImg_BG');
        }
        return this.mImg_ItemImg_BG_Internal;
    }
    get mImg_ItemImg_Img() {
        if (!this.mImg_ItemImg_Img_Internal && this.uiWidgetBase) {
            this.mImg_ItemImg_Img_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_ItemImg/mImg_ItemImg_Img');
        }
        return this.mImg_ItemImg_Img_Internal;
    }
    get mTxt_ItemName() {
        if (!this.mTxt_ItemName_Internal && this.uiWidgetBase) {
            this.mTxt_ItemName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mTxt_ItemName');
        }
        return this.mTxt_ItemName_Internal;
    }
    get mTxt_ItemDetails() {
        if (!this.mTxt_ItemDetails_Internal && this.uiWidgetBase) {
            this.mTxt_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mTxt_ItemDetails');
        }
        return this.mTxt_ItemDetails_Internal;
    }
    get mCanvas_BtnBottom() {
        if (!this.mCanvas_BtnBottom_Internal && this.uiWidgetBase) {
            this.mCanvas_BtnBottom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom');
        }
        return this.mCanvas_BtnBottom_Internal;
    }
    get mCanvas_Btn_Grey() {
        if (!this.mCanvas_Btn_Grey_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Grey_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Grey');
        }
        return this.mCanvas_Btn_Grey_Internal;
    }
    get mBtn_Grey() {
        if (!this.mBtn_Grey_Internal && this.uiWidgetBase) {
            this.mBtn_Grey_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Grey/mBtn_Grey');
        }
        return this.mBtn_Grey_Internal;
    }
    get mTxt_Btn_Grey() {
        if (!this.mTxt_Btn_Grey_Internal && this.uiWidgetBase) {
            this.mTxt_Btn_Grey_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Grey/mBtn_Grey/mTxt_Btn_Grey');
        }
        return this.mTxt_Btn_Grey_Internal;
    }
    get mCanvas_Btn_Mint() {
        if (!this.mCanvas_Btn_Mint_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint');
        }
        return this.mCanvas_Btn_Mint_Internal;
    }
    get mBtn_Mint() {
        if (!this.mBtn_Mint_Internal && this.uiWidgetBase) {
            this.mBtn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mBtn_Mint');
        }
        return this.mBtn_Mint_Internal;
    }
    get mTxt_Btn_Mint() {
        if (!this.mTxt_Btn_Mint_Internal && this.uiWidgetBase) {
            this.mTxt_Btn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mBtn_Mint/mTxt_Btn_Mint');
        }
        return this.mTxt_Btn_Mint_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
Purchase3_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/Purchase3_BasicUI.ui')
], Purchase3_BasicUI_Generate);
var Purchase3_BasicUI_Generate$1 = Purchase3_BasicUI_Generate;

var foreign41 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Purchase3_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Rankings_BasicUI.ui
*/
let Rankings_BasicUI_Generate = class Rankings_BasicUI_Generate extends UIScript {
    get mBtn_Mask() {
        if (!this.mBtn_Mask_Internal && this.uiWidgetBase) {
            this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask');
        }
        return this.mBtn_Mask_Internal;
    }
    get mCanvas_UI_Rank() {
        if (!this.mCanvas_UI_Rank_Internal && this.uiWidgetBase) {
            this.mCanvas_UI_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank');
        }
        return this.mCanvas_UI_Rank_Internal;
    }
    get mImg_Rank_BG() {
        if (!this.mImg_Rank_BG_Internal && this.uiWidgetBase) {
            this.mImg_Rank_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mImg_Rank_BG');
        }
        return this.mImg_Rank_BG_Internal;
    }
    get mTxt_Rank() {
        if (!this.mTxt_Rank_Internal && this.uiWidgetBase) {
            this.mTxt_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mTxt_Rank');
        }
        return this.mTxt_Rank_Internal;
    }
    get mCanvas_Btn_Close() {
        if (!this.mCanvas_Btn_Close_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Btn_Close');
        }
        return this.mCanvas_Btn_Close_Internal;
    }
    get mBtn_Close() {
        if (!this.mBtn_Close_Internal && this.uiWidgetBase) {
            this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Btn_Close/mBtn_Close');
        }
        return this.mBtn_Close_Internal;
    }
    get mScrollBox_Rank() {
        if (!this.mScrollBox_Rank_Internal && this.uiWidgetBase) {
            this.mScrollBox_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank');
        }
        return this.mScrollBox_Rank_Internal;
    }
    get mCanvas_AutoSet() {
        if (!this.mCanvas_AutoSet_Internal && this.uiWidgetBase) {
            this.mCanvas_AutoSet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet');
        }
        return this.mCanvas_AutoSet_Internal;
    }
    get mCanvas_Item_Rank() {
        if (!this.mCanvas_Item_Rank_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank');
        }
        return this.mCanvas_Item_Rank_Internal;
    }
    get mImg_Item_RankBG() {
        if (!this.mImg_Item_RankBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_RankBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mImg_Item_RankBG');
        }
        return this.mImg_Item_RankBG_Internal;
    }
    get mCanvas_Rank() {
        if (!this.mCanvas_Rank_Internal && this.uiWidgetBase) {
            this.mCanvas_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mCanvas_Rank');
        }
        return this.mCanvas_Rank_Internal;
    }
    get mImg_Rank_BG1() {
        if (!this.mImg_Rank_BG1_Internal && this.uiWidgetBase) {
            this.mImg_Rank_BG1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mCanvas_Rank/mImg_Rank_BG1');
        }
        return this.mImg_Rank_BG1_Internal;
    }
    get mTxt_Rank1() {
        if (!this.mTxt_Rank1_Internal && this.uiWidgetBase) {
            this.mTxt_Rank1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mCanvas_Rank/mTxt_Rank1');
        }
        return this.mTxt_Rank1_Internal;
    }
    get mImg_Rank_Mark() {
        if (!this.mImg_Rank_Mark_Internal && this.uiWidgetBase) {
            this.mImg_Rank_Mark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mImg_Rank_Mark');
        }
        return this.mImg_Rank_Mark_Internal;
    }
    get mTxt_Rank_PlayerName() {
        if (!this.mTxt_Rank_PlayerName_Internal && this.uiWidgetBase) {
            this.mTxt_Rank_PlayerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mTxt_Rank_PlayerName');
        }
        return this.mTxt_Rank_PlayerName_Internal;
    }
    get mCanvas_Rank_Value() {
        if (!this.mCanvas_Rank_Value_Internal && this.uiWidgetBase) {
            this.mCanvas_Rank_Value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mCanvas_Rank_Value');
        }
        return this.mCanvas_Rank_Value_Internal;
    }
    get mImg_Rank_ValueBG() {
        if (!this.mImg_Rank_ValueBG_Internal && this.uiWidgetBase) {
            this.mImg_Rank_ValueBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mCanvas_Rank_Value/mImg_Rank_ValueBG');
        }
        return this.mImg_Rank_ValueBG_Internal;
    }
    get mTxt_Rank_Value() {
        if (!this.mTxt_Rank_Value_Internal && this.uiWidgetBase) {
            this.mTxt_Rank_Value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mCanvas_Rank_Value/mTxt_Rank_Value');
        }
        return this.mTxt_Rank_Value_Internal;
    }
    get mCanvas_Rank_Myself() {
        if (!this.mCanvas_Rank_Myself_Internal && this.uiWidgetBase) {
            this.mCanvas_Rank_Myself_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself');
        }
        return this.mCanvas_Rank_Myself_Internal;
    }
    get mCanvas_Rank_MyselfBG() {
        if (!this.mCanvas_Rank_MyselfBG_Internal && this.uiWidgetBase) {
            this.mCanvas_Rank_MyselfBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfBG');
        }
        return this.mCanvas_Rank_MyselfBG_Internal;
    }
    get mCanvas_Rank_MyselfItem() {
        if (!this.mCanvas_Rank_MyselfItem_Internal && this.uiWidgetBase) {
            this.mCanvas_Rank_MyselfItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfItem');
        }
        return this.mCanvas_Rank_MyselfItem_Internal;
    }
    get mImg_Rank_MyselfItemBG() {
        if (!this.mImg_Rank_MyselfItemBG_Internal && this.uiWidgetBase) {
            this.mImg_Rank_MyselfItemBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfItem/mImg_Rank_MyselfItemBG');
        }
        return this.mImg_Rank_MyselfItemBG_Internal;
    }
    get mTxt_Rank_MyselfItem() {
        if (!this.mTxt_Rank_MyselfItem_Internal && this.uiWidgetBase) {
            this.mTxt_Rank_MyselfItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfItem/mTxt_Rank_MyselfItem');
        }
        return this.mTxt_Rank_MyselfItem_Internal;
    }
    get mCanvas_Rank_MyselfValue() {
        if (!this.mCanvas_Rank_MyselfValue_Internal && this.uiWidgetBase) {
            this.mCanvas_Rank_MyselfValue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfValue');
        }
        return this.mCanvas_Rank_MyselfValue_Internal;
    }
    get mImg_Rank_MyselfValueBG() {
        if (!this.mImg_Rank_MyselfValueBG_Internal && this.uiWidgetBase) {
            this.mImg_Rank_MyselfValueBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfValue/mImg_Rank_MyselfValueBG');
        }
        return this.mImg_Rank_MyselfValueBG_Internal;
    }
    get mTxt_Rank_MyselfValue() {
        if (!this.mTxt_Rank_MyselfValue_Internal && this.uiWidgetBase) {
            this.mTxt_Rank_MyselfValue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfValue/mTxt_Rank_MyselfValue');
        }
        return this.mTxt_Rank_MyselfValue_Internal;
    }
    get mImg_Rank_MyselfMark() {
        if (!this.mImg_Rank_MyselfMark_Internal && this.uiWidgetBase) {
            this.mImg_Rank_MyselfMark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mImg_Rank_MyselfMark');
        }
        return this.mImg_Rank_MyselfMark_Internal;
    }
    get mCanvas_Rank_MyselfPlayerName() {
        if (!this.mCanvas_Rank_MyselfPlayerName_Internal && this.uiWidgetBase) {
            this.mCanvas_Rank_MyselfPlayerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfPlayerName');
        }
        return this.mCanvas_Rank_MyselfPlayerName_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
Rankings_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/Rankings_BasicUI.ui')
], Rankings_BasicUI_Generate);
var Rankings_BasicUI_Generate$1 = Rankings_BasicUI_Generate;

var foreign42 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Rankings_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Resource_BasicUI.ui
*/
let Resource_BasicUI_Generate = class Resource_BasicUI_Generate extends UIScript {
    get mCanvasResources() {
        if (!this.mCanvasResources_Internal && this.uiWidgetBase) {
            this.mCanvasResources_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasResources');
        }
        return this.mCanvasResources_Internal;
    }
    get mImg_BG() {
        if (!this.mImg_BG_Internal && this.uiWidgetBase) {
            this.mImg_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasResources/mImg_BG');
        }
        return this.mImg_BG_Internal;
    }
    get mImg_Icon() {
        if (!this.mImg_Icon_Internal && this.uiWidgetBase) {
            this.mImg_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasResources/mImg_Icon');
        }
        return this.mImg_Icon_Internal;
    }
    get mTxt_Count() {
        if (!this.mTxt_Count_Internal && this.uiWidgetBase) {
            this.mTxt_Count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasResources/mTxt_Count');
        }
        return this.mTxt_Count_Internal;
    }
    get mBtn_Add() {
        if (!this.mBtn_Add_Internal && this.uiWidgetBase) {
            this.mBtn_Add_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasResources/mBtn_Add');
        }
        return this.mBtn_Add_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
Resource_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/Resource_BasicUI.ui')
], Resource_BasicUI_Generate);
var Resource_BasicUI_Generate$1 = Resource_BasicUI_Generate;

var foreign43 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Resource_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Settings_BasicUI.ui
*/
let Settings_BasicUI_Generate = class Settings_BasicUI_Generate extends UIScript {
    get mBtn_Mask() {
        if (!this.mBtn_Mask_Internal && this.uiWidgetBase) {
            this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask');
        }
        return this.mBtn_Mask_Internal;
    }
    get mCanvas_UI_Setting() {
        if (!this.mCanvas_UI_Setting_Internal && this.uiWidgetBase) {
            this.mCanvas_UI_Setting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting');
        }
        return this.mCanvas_UI_Setting_Internal;
    }
    get mImg_Setting_BG() {
        if (!this.mImg_Setting_BG_Internal && this.uiWidgetBase) {
            this.mImg_Setting_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mImg_Setting_BG');
        }
        return this.mImg_Setting_BG_Internal;
    }
    get mTxt_Setting() {
        if (!this.mTxt_Setting_Internal && this.uiWidgetBase) {
            this.mTxt_Setting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mTxt_Setting');
        }
        return this.mTxt_Setting_Internal;
    }
    get mCanvas_Btn_Close() {
        if (!this.mCanvas_Btn_Close_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_Btn_Close');
        }
        return this.mCanvas_Btn_Close_Internal;
    }
    get mBtn_Close() {
        if (!this.mBtn_Close_Internal && this.uiWidgetBase) {
            this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_Btn_Close/mBtn_Close');
        }
        return this.mBtn_Close_Internal;
    }
    get mCanvas_AutoSet() {
        if (!this.mCanvas_AutoSet_Internal && this.uiWidgetBase) {
            this.mCanvas_AutoSet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet');
        }
        return this.mCanvas_AutoSet_Internal;
    }
    get mCanvas_Bar_MusicVolume() {
        if (!this.mCanvas_Bar_MusicVolume_Internal && this.uiWidgetBase) {
            this.mCanvas_Bar_MusicVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_MusicVolume');
        }
        return this.mCanvas_Bar_MusicVolume_Internal;
    }
    get mTxt_MusicVolume() {
        if (!this.mTxt_MusicVolume_Internal && this.uiWidgetBase) {
            this.mTxt_MusicVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_MusicVolume/mTxt_MusicVolume');
        }
        return this.mTxt_MusicVolume_Internal;
    }
    get mBar_MusicVolume() {
        if (!this.mBar_MusicVolume_Internal && this.uiWidgetBase) {
            this.mBar_MusicVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_MusicVolume/mBar_MusicVolume');
        }
        return this.mBar_MusicVolume_Internal;
    }
    get mTxt_MusicVolume_Value() {
        if (!this.mTxt_MusicVolume_Value_Internal && this.uiWidgetBase) {
            this.mTxt_MusicVolume_Value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_MusicVolume/mTxt_MusicVolume_Value');
        }
        return this.mTxt_MusicVolume_Value_Internal;
    }
    get mCanvas_Bar_SFXVolume() {
        if (!this.mCanvas_Bar_SFXVolume_Internal && this.uiWidgetBase) {
            this.mCanvas_Bar_SFXVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_SFXVolume');
        }
        return this.mCanvas_Bar_SFXVolume_Internal;
    }
    get mTxt_SFXVolume() {
        if (!this.mTxt_SFXVolume_Internal && this.uiWidgetBase) {
            this.mTxt_SFXVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_SFXVolume/mTxt_SFXVolume');
        }
        return this.mTxt_SFXVolume_Internal;
    }
    get mBar_SFXVolume() {
        if (!this.mBar_SFXVolume_Internal && this.uiWidgetBase) {
            this.mBar_SFXVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_SFXVolume/mBar_SFXVolume');
        }
        return this.mBar_SFXVolume_Internal;
    }
    get mTxt_SFXVolume_Value() {
        if (!this.mTxt_SFXVolume_Value_Internal && this.uiWidgetBase) {
            this.mTxt_SFXVolume_Value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_SFXVolume/mTxt_SFXVolume_Value');
        }
        return this.mTxt_SFXVolume_Value_Internal;
    }
    get mCanvas_Switch_Vibration() {
        if (!this.mCanvas_Switch_Vibration_Internal && this.uiWidgetBase) {
            this.mCanvas_Switch_Vibration_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Switch_Vibration');
        }
        return this.mCanvas_Switch_Vibration_Internal;
    }
    get mTxt_Vibration() {
        if (!this.mTxt_Vibration_Internal && this.uiWidgetBase) {
            this.mTxt_Vibration_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Switch_Vibration/mTxt_Vibration');
        }
        return this.mTxt_Vibration_Internal;
    }
    get mBar_Vibration() {
        if (!this.mBar_Vibration_Internal && this.uiWidgetBase) {
            this.mBar_Vibration_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Switch_Vibration/mBar_Vibration');
        }
        return this.mBar_Vibration_Internal;
    }
    get mTxt_Vibration_State() {
        if (!this.mTxt_Vibration_State_Internal && this.uiWidgetBase) {
            this.mTxt_Vibration_State_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Switch_Vibration/mTxt_Vibration_State');
        }
        return this.mTxt_Vibration_State_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
Settings_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/Settings_BasicUI.ui')
], Settings_BasicUI_Generate);
var Settings_BasicUI_Generate$1 = Settings_BasicUI_Generate;

var foreign44 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Settings_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Shop1_BasicUI.ui
*/
let Shop1_BasicUI_Generate = class Shop1_BasicUI_Generate extends UIScript {
    get mBtn_Mask() {
        if (!this.mBtn_Mask_Internal && this.uiWidgetBase) {
            this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask');
        }
        return this.mBtn_Mask_Internal;
    }
    get mCanvas_UI_PopUp() {
        if (!this.mCanvas_UI_PopUp_Internal && this.uiWidgetBase) {
            this.mCanvas_UI_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp');
        }
        return this.mCanvas_UI_PopUp_Internal;
    }
    get mCanvas_PopUp() {
        if (!this.mCanvas_PopUp_Internal && this.uiWidgetBase) {
            this.mCanvas_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp');
        }
        return this.mCanvas_PopUp_Internal;
    }
    get mImg_PopUp_BG() {
        if (!this.mImg_PopUp_BG_Internal && this.uiWidgetBase) {
            this.mImg_PopUp_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mImg_PopUp_BG');
        }
        return this.mImg_PopUp_BG_Internal;
    }
    get mScrollBox_PopUp() {
        if (!this.mScrollBox_PopUp_Internal && this.uiWidgetBase) {
            this.mScrollBox_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp');
        }
        return this.mScrollBox_PopUp_Internal;
    }
    get mCanvas_AutoSet_PopUp() {
        if (!this.mCanvas_AutoSet_PopUp_Internal && this.uiWidgetBase) {
            this.mCanvas_AutoSet_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp');
        }
        return this.mCanvas_AutoSet_PopUp_Internal;
    }
    get mCanvas_Item_IllstratedSmall() {
        if (!this.mCanvas_Item_IllstratedSmall_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_IllstratedSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_IllstratedSmall');
        }
        return this.mCanvas_Item_IllstratedSmall_Internal;
    }
    get mImg_Item_IllSmallBG() {
        if (!this.mImg_Item_IllSmallBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_IllSmallBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_IllstratedSmall/mImg_Item_IllSmallBG');
        }
        return this.mImg_Item_IllSmallBG_Internal;
    }
    get mImg_Item_IllSmallIcon() {
        if (!this.mImg_Item_IllSmallIcon_Internal && this.uiWidgetBase) {
            this.mImg_Item_IllSmallIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_IllstratedSmall/mImg_Item_IllSmallIcon');
        }
        return this.mImg_Item_IllSmallIcon_Internal;
    }
    get mImg_Item_IllSmallFrame() {
        if (!this.mImg_Item_IllSmallFrame_Internal && this.uiWidgetBase) {
            this.mImg_Item_IllSmallFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_IllstratedSmall/mImg_Item_IllSmallFrame');
        }
        return this.mImg_Item_IllSmallFrame_Internal;
    }
    get mBtn_Item_IllSmall() {
        if (!this.mBtn_Item_IllSmall_Internal && this.uiWidgetBase) {
            this.mBtn_Item_IllSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_IllstratedSmall/mBtn_Item_IllSmall');
        }
        return this.mBtn_Item_IllSmall_Internal;
    }
    get mCanvas_Item_ShopSmall() {
        if (!this.mCanvas_Item_ShopSmall_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_ShopSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall');
        }
        return this.mCanvas_Item_ShopSmall_Internal;
    }
    get mImg_Item_ShopSmallBG() {
        if (!this.mImg_Item_ShopSmallBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopSmallBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mImg_Item_ShopSmallBG');
        }
        return this.mImg_Item_ShopSmallBG_Internal;
    }
    get mImg_Item_ShopSmallPic() {
        if (!this.mImg_Item_ShopSmallPic_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopSmallPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mImg_Item_ShopSmallPic');
        }
        return this.mImg_Item_ShopSmallPic_Internal;
    }
    get mTxt_Item_ShopSCount() {
        if (!this.mTxt_Item_ShopSCount_Internal && this.uiWidgetBase) {
            this.mTxt_Item_ShopSCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mTxt_Item_ShopSCount');
        }
        return this.mTxt_Item_ShopSCount_Internal;
    }
    get mImg_Item_ShopSTxt() {
        if (!this.mImg_Item_ShopSTxt_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopSTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mImg_Item_ShopSTxt');
        }
        return this.mImg_Item_ShopSTxt_Internal;
    }
    get mTxt_Item_ShopSCash() {
        if (!this.mTxt_Item_ShopSCash_Internal && this.uiWidgetBase) {
            this.mTxt_Item_ShopSCash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mTxt_Item_ShopSCash');
        }
        return this.mTxt_Item_ShopSCash_Internal;
    }
    get mImg_Item_ShopSCash() {
        if (!this.mImg_Item_ShopSCash_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopSCash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mImg_Item_ShopSCash');
        }
        return this.mImg_Item_ShopSCash_Internal;
    }
    get mImg_Item_ShopSmallFrame() {
        if (!this.mImg_Item_ShopSmallFrame_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopSmallFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mImg_Item_ShopSmallFrame');
        }
        return this.mImg_Item_ShopSmallFrame_Internal;
    }
    get mBtn_Item_ShopSmall() {
        if (!this.mBtn_Item_ShopSmall_Internal && this.uiWidgetBase) {
            this.mBtn_Item_ShopSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mBtn_Item_ShopSmall');
        }
        return this.mBtn_Item_ShopSmall_Internal;
    }
    get mCanvas_Item_BagSmall() {
        if (!this.mCanvas_Item_BagSmall_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_BagSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_BagSmall');
        }
        return this.mCanvas_Item_BagSmall_Internal;
    }
    get mImg_Item_BagSmallBG() {
        if (!this.mImg_Item_BagSmallBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_BagSmallBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_BagSmall/mImg_Item_BagSmallBG');
        }
        return this.mImg_Item_BagSmallBG_Internal;
    }
    get mImg_Item_BagSmallPic() {
        if (!this.mImg_Item_BagSmallPic_Internal && this.uiWidgetBase) {
            this.mImg_Item_BagSmallPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_BagSmall/mImg_Item_BagSmallPic');
        }
        return this.mImg_Item_BagSmallPic_Internal;
    }
    get mBag_Item_ShopSCount() {
        if (!this.mBag_Item_ShopSCount_Internal && this.uiWidgetBase) {
            this.mBag_Item_ShopSCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_BagSmall/mBag_Item_ShopSCount');
        }
        return this.mBag_Item_ShopSCount_Internal;
    }
    get mImg_Item_BagSmallFrame() {
        if (!this.mImg_Item_BagSmallFrame_Internal && this.uiWidgetBase) {
            this.mImg_Item_BagSmallFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_BagSmall/mImg_Item_BagSmallFrame');
        }
        return this.mImg_Item_BagSmallFrame_Internal;
    }
    get mBtn_Item_BagSmall() {
        if (!this.mBtn_Item_BagSmall_Internal && this.uiWidgetBase) {
            this.mBtn_Item_BagSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_BagSmall/mBtn_Item_BagSmall');
        }
        return this.mBtn_Item_BagSmall_Internal;
    }
    get mCanvas_Btn_Close() {
        if (!this.mCanvas_Btn_Close_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mCanvas_Btn_Close');
        }
        return this.mCanvas_Btn_Close_Internal;
    }
    get mBtn_Close() {
        if (!this.mBtn_Close_Internal && this.uiWidgetBase) {
            this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mCanvas_Btn_Close/mBtn_Close');
        }
        return this.mBtn_Close_Internal;
    }
    get mTxt_Title() {
        if (!this.mTxt_Title_Internal && this.uiWidgetBase) {
            this.mTxt_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mTxt_Title');
        }
        return this.mTxt_Title_Internal;
    }
    get mCanvas_Tab() {
        if (!this.mCanvas_Tab_Internal && this.uiWidgetBase) {
            this.mCanvas_Tab_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab');
        }
        return this.mCanvas_Tab_Internal;
    }
    get mCanvas_TabChosen() {
        if (!this.mCanvas_TabChosen_Internal && this.uiWidgetBase) {
            this.mCanvas_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabChosen');
        }
        return this.mCanvas_TabChosen_Internal;
    }
    get mBtn_TabChosen() {
        if (!this.mBtn_TabChosen_Internal && this.uiWidgetBase) {
            this.mBtn_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabChosen/mBtn_TabChosen');
        }
        return this.mBtn_TabChosen_Internal;
    }
    get mTxt_TabChosen() {
        if (!this.mTxt_TabChosen_Internal && this.uiWidgetBase) {
            this.mTxt_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabChosen/mTxt_TabChosen');
        }
        return this.mTxt_TabChosen_Internal;
    }
    get mCanvas_TabNormal() {
        if (!this.mCanvas_TabNormal_Internal && this.uiWidgetBase) {
            this.mCanvas_TabNormal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal');
        }
        return this.mCanvas_TabNormal_Internal;
    }
    get mBtn_TabNormal1() {
        if (!this.mBtn_TabNormal1_Internal && this.uiWidgetBase) {
            this.mBtn_TabNormal1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal/mBtn_TabNormal1');
        }
        return this.mBtn_TabNormal1_Internal;
    }
    get mTxt_TabNormal1() {
        if (!this.mTxt_TabNormal1_Internal && this.uiWidgetBase) {
            this.mTxt_TabNormal1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal/mTxt_TabNormal1');
        }
        return this.mTxt_TabNormal1_Internal;
    }
    get mCanvas_TabNormal_1() {
        if (!this.mCanvas_TabNormal_1_Internal && this.uiWidgetBase) {
            this.mCanvas_TabNormal_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_1');
        }
        return this.mCanvas_TabNormal_1_Internal;
    }
    get mBtn_TabNormal2() {
        if (!this.mBtn_TabNormal2_Internal && this.uiWidgetBase) {
            this.mBtn_TabNormal2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_1/mBtn_TabNormal2');
        }
        return this.mBtn_TabNormal2_Internal;
    }
    get mTxt_TabNormal2() {
        if (!this.mTxt_TabNormal2_Internal && this.uiWidgetBase) {
            this.mTxt_TabNormal2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_1/mTxt_TabNormal2');
        }
        return this.mTxt_TabNormal2_Internal;
    }
    get mCanvas_TabNormal_2() {
        if (!this.mCanvas_TabNormal_2_Internal && this.uiWidgetBase) {
            this.mCanvas_TabNormal_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_2');
        }
        return this.mCanvas_TabNormal_2_Internal;
    }
    get mBtn_TabNormal3() {
        if (!this.mBtn_TabNormal3_Internal && this.uiWidgetBase) {
            this.mBtn_TabNormal3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_2/mBtn_TabNormal3');
        }
        return this.mBtn_TabNormal3_Internal;
    }
    get mTxt_TabNormal3() {
        if (!this.mTxt_TabNormal3_Internal && this.uiWidgetBase) {
            this.mTxt_TabNormal3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_2/mTxt_TabNormal3');
        }
        return this.mTxt_TabNormal3_Internal;
    }
    get mCanvas_TabNormal_3() {
        if (!this.mCanvas_TabNormal_3_Internal && this.uiWidgetBase) {
            this.mCanvas_TabNormal_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_3');
        }
        return this.mCanvas_TabNormal_3_Internal;
    }
    get mBtn_TabNormal4() {
        if (!this.mBtn_TabNormal4_Internal && this.uiWidgetBase) {
            this.mBtn_TabNormal4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_3/mBtn_TabNormal4');
        }
        return this.mBtn_TabNormal4_Internal;
    }
    get mTxt_TabNormal4() {
        if (!this.mTxt_TabNormal4_Internal && this.uiWidgetBase) {
            this.mTxt_TabNormal4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_3/mTxt_TabNormal4');
        }
        return this.mTxt_TabNormal4_Internal;
    }
    get mCanvas_Item_Details() {
        if (!this.mCanvas_Item_Details_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_Details_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details');
        }
        return this.mCanvas_Item_Details_Internal;
    }
    get mBtn_ItemDetails() {
        if (!this.mBtn_ItemDetails_Internal && this.uiWidgetBase) {
            this.mBtn_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mBtn_ItemDetails');
        }
        return this.mBtn_ItemDetails_Internal;
    }
    get mImg_ItemDetailsBG() {
        if (!this.mImg_ItemDetailsBG_Internal && this.uiWidgetBase) {
            this.mImg_ItemDetailsBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mImg_ItemDetailsBG');
        }
        return this.mImg_ItemDetailsBG_Internal;
    }
    get mCanvas_ItemDetails() {
        if (!this.mCanvas_ItemDetails_Internal && this.uiWidgetBase) {
            this.mCanvas_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mCanvas_ItemDetails');
        }
        return this.mCanvas_ItemDetails_Internal;
    }
    get mImg_ItemDetails_BG() {
        if (!this.mImg_ItemDetails_BG_Internal && this.uiWidgetBase) {
            this.mImg_ItemDetails_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mCanvas_ItemDetails/mImg_ItemDetails_BG');
        }
        return this.mImg_ItemDetails_BG_Internal;
    }
    get mImg_ItemDetails_Pic() {
        if (!this.mImg_ItemDetails_Pic_Internal && this.uiWidgetBase) {
            this.mImg_ItemDetails_Pic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mCanvas_ItemDetails/mImg_ItemDetails_Pic');
        }
        return this.mImg_ItemDetails_Pic_Internal;
    }
    get mTxt_ItemDetails_Count() {
        if (!this.mTxt_ItemDetails_Count_Internal && this.uiWidgetBase) {
            this.mTxt_ItemDetails_Count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mCanvas_ItemDetails/mTxt_ItemDetails_Count');
        }
        return this.mTxt_ItemDetails_Count_Internal;
    }
    get mTxt_ItemDetails_Name() {
        if (!this.mTxt_ItemDetails_Name_Internal && this.uiWidgetBase) {
            this.mTxt_ItemDetails_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mTxt_ItemDetails_Name');
        }
        return this.mTxt_ItemDetails_Name_Internal;
    }
    get mTxt_ItemDetails_Details() {
        if (!this.mTxt_ItemDetails_Details_Internal && this.uiWidgetBase) {
            this.mTxt_ItemDetails_Details_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mTxt_ItemDetails_Details');
        }
        return this.mTxt_ItemDetails_Details_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
Shop1_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/Shop1_BasicUI.ui')
], Shop1_BasicUI_Generate);
var Shop1_BasicUI_Generate$1 = Shop1_BasicUI_Generate;

var foreign45 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Shop1_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Shop2_BasicUI.ui
*/
let Shop2_BasicUI_Generate = class Shop2_BasicUI_Generate extends UIScript {
    get mBtn_Mask() {
        if (!this.mBtn_Mask_Internal && this.uiWidgetBase) {
            this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask');
        }
        return this.mBtn_Mask_Internal;
    }
    get mCanvas_UI_PopUp() {
        if (!this.mCanvas_UI_PopUp_Internal && this.uiWidgetBase) {
            this.mCanvas_UI_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp');
        }
        return this.mCanvas_UI_PopUp_Internal;
    }
    get mCanvas_PopUp() {
        if (!this.mCanvas_PopUp_Internal && this.uiWidgetBase) {
            this.mCanvas_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp');
        }
        return this.mCanvas_PopUp_Internal;
    }
    get mImg_PopUp_BG() {
        if (!this.mImg_PopUp_BG_Internal && this.uiWidgetBase) {
            this.mImg_PopUp_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mImg_PopUp_BG');
        }
        return this.mImg_PopUp_BG_Internal;
    }
    get mScrollBox_PopUp() {
        if (!this.mScrollBox_PopUp_Internal && this.uiWidgetBase) {
            this.mScrollBox_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp');
        }
        return this.mScrollBox_PopUp_Internal;
    }
    get mCanvas_AutoSet_PopUp() {
        if (!this.mCanvas_AutoSet_PopUp_Internal && this.uiWidgetBase) {
            this.mCanvas_AutoSet_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp');
        }
        return this.mCanvas_AutoSet_PopUp_Internal;
    }
    get mCanvas_Item_Illustrated() {
        if (!this.mCanvas_Item_Illustrated_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_Illustrated_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Illustrated');
        }
        return this.mCanvas_Item_Illustrated_Internal;
    }
    get mImg_Item_BG() {
        if (!this.mImg_Item_BG_Internal && this.uiWidgetBase) {
            this.mImg_Item_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Illustrated/mImg_Item_BG');
        }
        return this.mImg_Item_BG_Internal;
    }
    get mImg_Item_NameBG() {
        if (!this.mImg_Item_NameBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_NameBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Illustrated/mImg_Item_NameBG');
        }
        return this.mImg_Item_NameBG_Internal;
    }
    get mTxt_Item_Name() {
        if (!this.mTxt_Item_Name_Internal && this.uiWidgetBase) {
            this.mTxt_Item_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Illustrated/mTxt_Item_Name');
        }
        return this.mTxt_Item_Name_Internal;
    }
    get mImg_Item_Pic() {
        if (!this.mImg_Item_Pic_Internal && this.uiWidgetBase) {
            this.mImg_Item_Pic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Illustrated/mImg_Item_Pic');
        }
        return this.mImg_Item_Pic_Internal;
    }
    get mBtn_Item_Illustrated() {
        if (!this.mBtn_Item_Illustrated_Internal && this.uiWidgetBase) {
            this.mBtn_Item_Illustrated_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Illustrated/mBtn_Item_Illustrated');
        }
        return this.mBtn_Item_Illustrated_Internal;
    }
    get mCanvas_Item_Shop() {
        if (!this.mCanvas_Item_Shop_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop');
        }
        return this.mCanvas_Item_Shop_Internal;
    }
    get mImg_Item_ShopBG() {
        if (!this.mImg_Item_ShopBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mImg_Item_ShopBG');
        }
        return this.mImg_Item_ShopBG_Internal;
    }
    get mImg_Item_ShopTxt() {
        if (!this.mImg_Item_ShopTxt_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mImg_Item_ShopTxt');
        }
        return this.mImg_Item_ShopTxt_Internal;
    }
    get mTxt_Item_ShoPrice() {
        if (!this.mTxt_Item_ShoPrice_Internal && this.uiWidgetBase) {
            this.mTxt_Item_ShoPrice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mTxt_Item_ShoPrice');
        }
        return this.mTxt_Item_ShoPrice_Internal;
    }
    get mImg_Item_ShopPic() {
        if (!this.mImg_Item_ShopPic_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mImg_Item_ShopPic');
        }
        return this.mImg_Item_ShopPic_Internal;
    }
    get mTxt_Item_ShopName() {
        if (!this.mTxt_Item_ShopName_Internal && this.uiWidgetBase) {
            this.mTxt_Item_ShopName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mTxt_Item_ShopName');
        }
        return this.mTxt_Item_ShopName_Internal;
    }
    get mImg_Item_ShopCash() {
        if (!this.mImg_Item_ShopCash_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopCash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mImg_Item_ShopCash');
        }
        return this.mImg_Item_ShopCash_Internal;
    }
    get mBtn_Item_Shop() {
        if (!this.mBtn_Item_Shop_Internal && this.uiWidgetBase) {
            this.mBtn_Item_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mBtn_Item_Shop');
        }
        return this.mBtn_Item_Shop_Internal;
    }
    get mCanvas_Item_Bag() {
        if (!this.mCanvas_Item_Bag_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_Bag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag');
        }
        return this.mCanvas_Item_Bag_Internal;
    }
    get mImg_Item_BagBG() {
        if (!this.mImg_Item_BagBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_BagBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag/mImg_Item_BagBG');
        }
        return this.mImg_Item_BagBG_Internal;
    }
    get mImg_Item_BagTxt() {
        if (!this.mImg_Item_BagTxt_Internal && this.uiWidgetBase) {
            this.mImg_Item_BagTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag/mImg_Item_BagTxt');
        }
        return this.mImg_Item_BagTxt_Internal;
    }
    get mTxt_Item_Name1() {
        if (!this.mTxt_Item_Name1_Internal && this.uiWidgetBase) {
            this.mTxt_Item_Name1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag/mTxt_Item_Name1');
        }
        return this.mTxt_Item_Name1_Internal;
    }
    get mImg_Item_BagPoc() {
        if (!this.mImg_Item_BagPoc_Internal && this.uiWidgetBase) {
            this.mImg_Item_BagPoc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag/mImg_Item_BagPoc');
        }
        return this.mImg_Item_BagPoc_Internal;
    }
    get mTxt_Item_Count() {
        if (!this.mTxt_Item_Count_Internal && this.uiWidgetBase) {
            this.mTxt_Item_Count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag/mTxt_Item_Count');
        }
        return this.mTxt_Item_Count_Internal;
    }
    get mBtn_Item_Bag() {
        if (!this.mBtn_Item_Bag_Internal && this.uiWidgetBase) {
            this.mBtn_Item_Bag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag/mBtn_Item_Bag');
        }
        return this.mBtn_Item_Bag_Internal;
    }
    get mCanvas_Btn_Close() {
        if (!this.mCanvas_Btn_Close_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mCanvas_Btn_Close');
        }
        return this.mCanvas_Btn_Close_Internal;
    }
    get mBtn_Close() {
        if (!this.mBtn_Close_Internal && this.uiWidgetBase) {
            this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mCanvas_Btn_Close/mBtn_Close');
        }
        return this.mBtn_Close_Internal;
    }
    get mTxt_Title() {
        if (!this.mTxt_Title_Internal && this.uiWidgetBase) {
            this.mTxt_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mTxt_Title');
        }
        return this.mTxt_Title_Internal;
    }
    get mCanvas_Tab() {
        if (!this.mCanvas_Tab_Internal && this.uiWidgetBase) {
            this.mCanvas_Tab_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab');
        }
        return this.mCanvas_Tab_Internal;
    }
    get mCanvas_TabChosen() {
        if (!this.mCanvas_TabChosen_Internal && this.uiWidgetBase) {
            this.mCanvas_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabChosen');
        }
        return this.mCanvas_TabChosen_Internal;
    }
    get mBtn_TabChosen() {
        if (!this.mBtn_TabChosen_Internal && this.uiWidgetBase) {
            this.mBtn_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabChosen/mBtn_TabChosen');
        }
        return this.mBtn_TabChosen_Internal;
    }
    get mTxt_TabChosen() {
        if (!this.mTxt_TabChosen_Internal && this.uiWidgetBase) {
            this.mTxt_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabChosen/mTxt_TabChosen');
        }
        return this.mTxt_TabChosen_Internal;
    }
    get mCanvas_TabNormal() {
        if (!this.mCanvas_TabNormal_Internal && this.uiWidgetBase) {
            this.mCanvas_TabNormal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal');
        }
        return this.mCanvas_TabNormal_Internal;
    }
    get mBtn_TabNormal1() {
        if (!this.mBtn_TabNormal1_Internal && this.uiWidgetBase) {
            this.mBtn_TabNormal1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal/mBtn_TabNormal1');
        }
        return this.mBtn_TabNormal1_Internal;
    }
    get mTxt_TabNormal1() {
        if (!this.mTxt_TabNormal1_Internal && this.uiWidgetBase) {
            this.mTxt_TabNormal1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal/mTxt_TabNormal1');
        }
        return this.mTxt_TabNormal1_Internal;
    }
    get mCanvas_TabNormal_1() {
        if (!this.mCanvas_TabNormal_1_Internal && this.uiWidgetBase) {
            this.mCanvas_TabNormal_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_1');
        }
        return this.mCanvas_TabNormal_1_Internal;
    }
    get mBtn_TabNormal2() {
        if (!this.mBtn_TabNormal2_Internal && this.uiWidgetBase) {
            this.mBtn_TabNormal2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_1/mBtn_TabNormal2');
        }
        return this.mBtn_TabNormal2_Internal;
    }
    get mTxt_TabNormal2() {
        if (!this.mTxt_TabNormal2_Internal && this.uiWidgetBase) {
            this.mTxt_TabNormal2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_1/mTxt_TabNormal2');
        }
        return this.mTxt_TabNormal2_Internal;
    }
    get mCanvas_TabNormal_2() {
        if (!this.mCanvas_TabNormal_2_Internal && this.uiWidgetBase) {
            this.mCanvas_TabNormal_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_2');
        }
        return this.mCanvas_TabNormal_2_Internal;
    }
    get mBtn_TabNormal3() {
        if (!this.mBtn_TabNormal3_Internal && this.uiWidgetBase) {
            this.mBtn_TabNormal3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_2/mBtn_TabNormal3');
        }
        return this.mBtn_TabNormal3_Internal;
    }
    get mTxt_TabNormal3() {
        if (!this.mTxt_TabNormal3_Internal && this.uiWidgetBase) {
            this.mTxt_TabNormal3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_2/mTxt_TabNormal3');
        }
        return this.mTxt_TabNormal3_Internal;
    }
    get mCanvas_TabNormal_3() {
        if (!this.mCanvas_TabNormal_3_Internal && this.uiWidgetBase) {
            this.mCanvas_TabNormal_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_3');
        }
        return this.mCanvas_TabNormal_3_Internal;
    }
    get mBtn_TabNormal4() {
        if (!this.mBtn_TabNormal4_Internal && this.uiWidgetBase) {
            this.mBtn_TabNormal4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_3/mBtn_TabNormal4');
        }
        return this.mBtn_TabNormal4_Internal;
    }
    get mTxt_TabNormal4() {
        if (!this.mTxt_TabNormal4_Internal && this.uiWidgetBase) {
            this.mTxt_TabNormal4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_3/mTxt_TabNormal4');
        }
        return this.mTxt_TabNormal4_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
Shop2_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/Shop2_BasicUI.ui')
], Shop2_BasicUI_Generate);
var Shop2_BasicUI_Generate$1 = Shop2_BasicUI_Generate;

var foreign46 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Shop2_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/SmallItem1_BasicUI.ui
*/
let SmallItem1_BasicUI_Generate = class SmallItem1_BasicUI_Generate extends UIScript {
    get mCanvas_Item_ShopSmall() {
        if (!this.mCanvas_Item_ShopSmall_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_ShopSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall');
        }
        return this.mCanvas_Item_ShopSmall_Internal;
    }
    get mImg_Item_ShopSmallBG() {
        if (!this.mImg_Item_ShopSmallBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopSmallBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mImg_Item_ShopSmallBG');
        }
        return this.mImg_Item_ShopSmallBG_Internal;
    }
    get mImg_Item_ShopSmallPic() {
        if (!this.mImg_Item_ShopSmallPic_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopSmallPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mImg_Item_ShopSmallPic');
        }
        return this.mImg_Item_ShopSmallPic_Internal;
    }
    get mTxt_Item_ShopSCount() {
        if (!this.mTxt_Item_ShopSCount_Internal && this.uiWidgetBase) {
            this.mTxt_Item_ShopSCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mTxt_Item_ShopSCount');
        }
        return this.mTxt_Item_ShopSCount_Internal;
    }
    get mImg_Item_ShopSTxt() {
        if (!this.mImg_Item_ShopSTxt_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopSTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mImg_Item_ShopSTxt');
        }
        return this.mImg_Item_ShopSTxt_Internal;
    }
    get mTxt_Item_ShopSCash() {
        if (!this.mTxt_Item_ShopSCash_Internal && this.uiWidgetBase) {
            this.mTxt_Item_ShopSCash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mTxt_Item_ShopSCash');
        }
        return this.mTxt_Item_ShopSCash_Internal;
    }
    get mImg_Item_ShopSCash() {
        if (!this.mImg_Item_ShopSCash_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopSCash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mImg_Item_ShopSCash');
        }
        return this.mImg_Item_ShopSCash_Internal;
    }
    get mImg_Item_ShopSmallFrame() {
        if (!this.mImg_Item_ShopSmallFrame_Internal && this.uiWidgetBase) {
            this.mImg_Item_ShopSmallFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mImg_Item_ShopSmallFrame');
        }
        return this.mImg_Item_ShopSmallFrame_Internal;
    }
    get mBtn_Item_ShopSmall() {
        if (!this.mBtn_Item_ShopSmall_Internal && this.uiWidgetBase) {
            this.mBtn_Item_ShopSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mBtn_Item_ShopSmall');
        }
        return this.mBtn_Item_ShopSmall_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
SmallItem1_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/SmallItem1_BasicUI.ui')
], SmallItem1_BasicUI_Generate);
var SmallItem1_BasicUI_Generate$1 = SmallItem1_BasicUI_Generate;

var foreign47 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SmallItem1_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/SmallItem2_BasicUI.ui
*/
let SmallItem2_BasicUI_Generate = class SmallItem2_BasicUI_Generate extends UIScript {
    get mCanvas_Item_IllstratedSmall() {
        if (!this.mCanvas_Item_IllstratedSmall_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_IllstratedSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_IllstratedSmall');
        }
        return this.mCanvas_Item_IllstratedSmall_Internal;
    }
    get mImg_Item_IllSmallBG() {
        if (!this.mImg_Item_IllSmallBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_IllSmallBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_IllstratedSmall/mImg_Item_IllSmallBG');
        }
        return this.mImg_Item_IllSmallBG_Internal;
    }
    get mImg_Item_IllSmallIcon() {
        if (!this.mImg_Item_IllSmallIcon_Internal && this.uiWidgetBase) {
            this.mImg_Item_IllSmallIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_IllstratedSmall/mImg_Item_IllSmallIcon');
        }
        return this.mImg_Item_IllSmallIcon_Internal;
    }
    get mImg_Item_IllSmallFrame() {
        if (!this.mImg_Item_IllSmallFrame_Internal && this.uiWidgetBase) {
            this.mImg_Item_IllSmallFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_IllstratedSmall/mImg_Item_IllSmallFrame');
        }
        return this.mImg_Item_IllSmallFrame_Internal;
    }
    get mBtn_Item_IllSmall() {
        if (!this.mBtn_Item_IllSmall_Internal && this.uiWidgetBase) {
            this.mBtn_Item_IllSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_IllstratedSmall/mBtn_Item_IllSmall');
        }
        return this.mBtn_Item_IllSmall_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
SmallItem2_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/SmallItem2_BasicUI.ui')
], SmallItem2_BasicUI_Generate);
var SmallItem2_BasicUI_Generate$1 = SmallItem2_BasicUI_Generate;

var foreign48 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SmallItem2_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/SmallItem3_BasicUI.ui
*/
let SmallItem3_BasicUI_Generate = class SmallItem3_BasicUI_Generate extends UIScript {
    get mCanvas_Item_BagSmall() {
        if (!this.mCanvas_Item_BagSmall_Internal && this.uiWidgetBase) {
            this.mCanvas_Item_BagSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_BagSmall');
        }
        return this.mCanvas_Item_BagSmall_Internal;
    }
    get mImg_Item_BagSmallBG() {
        if (!this.mImg_Item_BagSmallBG_Internal && this.uiWidgetBase) {
            this.mImg_Item_BagSmallBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_BagSmall/mImg_Item_BagSmallBG');
        }
        return this.mImg_Item_BagSmallBG_Internal;
    }
    get mImg_Item_BagSmallPic() {
        if (!this.mImg_Item_BagSmallPic_Internal && this.uiWidgetBase) {
            this.mImg_Item_BagSmallPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_BagSmall/mImg_Item_BagSmallPic');
        }
        return this.mImg_Item_BagSmallPic_Internal;
    }
    get mBag_Item_ShopSCount() {
        if (!this.mBag_Item_ShopSCount_Internal && this.uiWidgetBase) {
            this.mBag_Item_ShopSCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_BagSmall/mBag_Item_ShopSCount');
        }
        return this.mBag_Item_ShopSCount_Internal;
    }
    get mImg_Item_BagSmallFrame() {
        if (!this.mImg_Item_BagSmallFrame_Internal && this.uiWidgetBase) {
            this.mImg_Item_BagSmallFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_BagSmall/mImg_Item_BagSmallFrame');
        }
        return this.mImg_Item_BagSmallFrame_Internal;
    }
    get mBtn_Item_BagSmall() {
        if (!this.mBtn_Item_BagSmall_Internal && this.uiWidgetBase) {
            this.mBtn_Item_BagSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_BagSmall/mBtn_Item_BagSmall');
        }
        return this.mBtn_Item_BagSmall_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
SmallItem3_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/SmallItem3_BasicUI.ui')
], SmallItem3_BasicUI_Generate);
var SmallItem3_BasicUI_Generate$1 = SmallItem3_BasicUI_Generate;

var foreign49 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SmallItem3_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Window_BasicUI.ui
*/
let Window_BasicUI_Generate = class Window_BasicUI_Generate extends UIScript {
    get mBtn_Mask() {
        if (!this.mBtn_Mask_Internal && this.uiWidgetBase) {
            this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask');
        }
        return this.mBtn_Mask_Internal;
    }
    get mCanvas_UI_PopUp() {
        if (!this.mCanvas_UI_PopUp_Internal && this.uiWidgetBase) {
            this.mCanvas_UI_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp');
        }
        return this.mCanvas_UI_PopUp_Internal;
    }
    get mImg_PopUp_BG() {
        if (!this.mImg_PopUp_BG_Internal && this.uiWidgetBase) {
            this.mImg_PopUp_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mImg_PopUp_BG');
        }
        return this.mImg_PopUp_BG_Internal;
    }
    get mTxt_PopUp() {
        if (!this.mTxt_PopUp_Internal && this.uiWidgetBase) {
            this.mTxt_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mTxt_PopUp');
        }
        return this.mTxt_PopUp_Internal;
    }
    get mCanvas_Btn_Close() {
        if (!this.mCanvas_Btn_Close_Internal && this.uiWidgetBase) {
            this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Btn_Close');
        }
        return this.mCanvas_Btn_Close_Internal;
    }
    get mBtn_Close() {
        if (!this.mBtn_Close_Internal && this.uiWidgetBase) {
            this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Btn_Close/mBtn_Close');
        }
        return this.mBtn_Close_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
Window_BasicUI_Generate = __decorate([
    UIBind('UI/BasicUI/Window_BasicUI.ui')
], Window_BasicUI_Generate);
var Window_BasicUI_Generate$1 = Window_BasicUI_Generate;

var foreign50 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Window_BasicUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/common/CommonTips.ui
*/
let CommonTips_Generate = class CommonTips_Generate extends UIScript {
    get canvas() {
        if (!this.canvas_Internal && this.uiWidgetBase) {
            this.canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas');
        }
        return this.canvas_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
CommonTips_Generate = __decorate([
    UIBind('UI/common/CommonTips.ui')
], CommonTips_Generate);
var CommonTips_Generate$1 = CommonTips_Generate;

var foreign51 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CommonTips_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/common/MainUI.ui
*/
let MainUI_Generate = class MainUI_Generate extends UIScript {
    get btnC() {
        if (!this.btnC_Internal && this.uiWidgetBase) {
            this.btnC_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnC');
        }
        return this.btnC_Internal;
    }
    get btnB() {
        if (!this.btnB_Internal && this.uiWidgetBase) {
            this.btnB_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnB');
        }
        return this.btnB_Internal;
    }
    get textDes() {
        if (!this.textDes_Internal && this.uiWidgetBase) {
            this.textDes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textDes');
        }
        return this.textDes_Internal;
    }
    get imggg() {
        if (!this.imggg_Internal && this.uiWidgetBase) {
            this.imggg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/imggg');
        }
        return this.imggg_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
MainUI_Generate = __decorate([
    UIBind('UI/common/MainUI.ui')
], MainUI_Generate);
var MainUI_Generate$1 = MainUI_Generate;

var foreign52 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: MainUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/common/ScalerText.ui
*/
let ScalerText_Generate = class ScalerText_Generate extends UIScript {
    get canvas1() {
        if (!this.canvas1_Internal && this.uiWidgetBase) {
            this.canvas1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas1');
        }
        return this.canvas1_Internal;
    }
    get img() {
        if (!this.img_Internal && this.uiWidgetBase) {
            this.img_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas1/img');
        }
        return this.img_Internal;
    }
    get text() {
        if (!this.text_Internal && this.uiWidgetBase) {
            this.text_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas1/text');
        }
        return this.text_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
ScalerText_Generate = __decorate([
    UIBind('UI/common/ScalerText.ui')
], ScalerText_Generate);
var ScalerText_Generate$1 = ScalerText_Generate;

var foreign53 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ScalerText_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/common/SettingUI.ui
*/
let SettingUI_Generate = class SettingUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
SettingUI_Generate = __decorate([
    UIBind('UI/common/SettingUI.ui')
], SettingUI_Generate);
var SettingUI_Generate$1 = SettingUI_Generate;

var foreign54 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SettingUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DefaultUI.ui
*/
let DefaultUI_Generate = class DefaultUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
DefaultUI_Generate = __decorate([
    UIBind('UI/DefaultUI.ui')
], DefaultUI_Generate);
var DefaultUI_Generate$1 = DefaultUI_Generate;

var foreign55 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DefaultUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/skill/AbilityRelease.ui
*/
let AbilityRelease_Generate = class AbilityRelease_Generate extends UIScript {
    get controller() {
        if (!this.controller_Internal && this.uiWidgetBase) {
            this.controller_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/controller');
        }
        return this.controller_Internal;
    }
    get bg() {
        if (!this.bg_Internal && this.uiWidgetBase) {
            this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/controller/bg');
        }
        return this.bg_Internal;
    }
    get point() {
        if (!this.point_Internal && this.uiWidgetBase) {
            this.point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/controller/point');
        }
        return this.point_Internal;
    }
    get tt() {
        if (!this.tt_Internal && this.uiWidgetBase) {
            this.tt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tt');
        }
        return this.tt_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
AbilityRelease_Generate = __decorate([
    UIBind('UI/skill/AbilityRelease.ui')
], AbilityRelease_Generate);
var AbilityRelease_Generate$1 = AbilityRelease_Generate;

var foreign56 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: AbilityRelease_Generate$1
});

function UIClass(type) {
    return (target) => {
        console.log('注册UI---', target.name);
        if (!UI_CLASS[type]) {
            UI_CLASS[type] = target;
        }
        target.prototype.hide = () => {
            UI.hide(type);
        };
        target.prototype.type = type;
        registerCommonFunc(target);
    };
}
function ItemClass(target) {
    registerCommonFunc(target);
}
function registerCommonFunc(target) {
    target.prototype.setText = function (text, str) {
        text.text = str;
    };
}

var foreign58 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ItemClass: ItemClass,
    UIClass: UIClass,
    registerCommonFunc: registerCommonFunc
});

let BagItem = class BagItem {
    refreshItem(data) {
        throw new Error("Method not implemented.");
    }
    setSelect(isSelect) {
        throw new Error("Method not implemented.");
    }
};
BagItem = __decorate([
    ItemClass
], BagItem);

var foreign57 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get BagItem () { return BagItem; }
});

class DefaultUI extends UIScript {
    constructor() {
        super(...arguments);
        this.v = Vector.zero;
        // /** 仅在游戏时间对非模板实例调用一次 */
        // protected onStart() {
        // 	let up = this.uiWidgetBase.findChildByPath('RootCanvas/Button3') as Button;
        // 	let down = this.uiWidgetBase.findChildByPath('RootCanvas/Button4') as Button;
        // 	up.onPressed.add(() => {
        // 		this.v.z = 1;
        // 	});
        // 	up.onReleased.add(() => {
        // 		this.v.z = 0;
        // 	});
        // 	down.onPressed.add(() => {
        // 		this.v.z = -1;
        // 	})
        // 	down.onReleased.add(() => {
        // 		this.v.z = 0;
        // 	});
        // 	let joystick = this.uiWidgetBase.findChildByPath('RootCanvas/VirtualJoystickPanel') as VirtualJoystickPanel;
        // 	joystick.onInputDir.add((v2) => {
        // 		if (Math.abs(v2.x) <= 0.01 && Math.abs(v2.y) <= 0.001) {
        // 			this.v.x = 0;
        // 			this.v.y = 0;
        // 			return;
        // 		}
        // 		let camera = Camera.currentCamera;
        // 		let angle1 = camera.worldTransform.rotation.z;
        // 		let angle2 = -Vector2.signAngle(Vector2.unitY, v2);
        // 		let angle = Math.PI * (angle1 + angle2) / 180;
        // 		this.v.x = Math.cos(angle);
        // 		this.v.y = Math.sin(angle);
        // 	});
        // 	const jumpBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Attack') as Button;
        // 	jumpBtn.onPressed.add(() => {
        // 		Player.localPlayer.character.changeState(CharacterStateType.Flying);
        // 		Player.localPlayer.character.movementDirection = mw.MovementDirection.AxisDirection;
        // 	});
        // }
    }
}

/**list组件(滑动列表) */
class List {
    /**清空当前所有选项 */
    clearSelected() {
        if (this._allowMultipleSelection) {
            this._selectIndexes = [];
        }
        else {
            this._selectIdx = -1;
        }
        this._dirtyMark = true;
    }
    /**多选索引数组 */
    get selectIndexes() {
        return this._selectIndexes.map(Number);
    }
    set selectIndexes(arr) {
        this._selectIndexes = arr;
    }
    /**设置多选开启与关闭 */
    set allowMultipleSelection(v) {
        if (this._allowMultipleSelection === v)
            return;
        this._allowMultipleSelection = v;
        if (this._allowMultipleSelection) {
            this._selectIdx = -1;
            this._selectIndexes = [];
            this._dirtyMark = true;
        }
    }
    //==================================================//
    /**
     * @param _cls item构造类
     * @param itemSize item大小（选填，不填则以实际item大小写入）
     */
    constructor(_cls, _itemSize = null) {
        this._cls = _cls;
        this._itemSize = _itemSize;
        /**脏标记 */
        this._dirtyMark = false;
        /**item池 */
        this._pool = [];
        /**数据的长度 */
        this._dataLength = 0;
        /**上间距 */
        this._topDis = 0;
        /**下间距 */
        this._bottomDis = 0;
        /**左间距 */
        this._leftDis = 0;
        /**右间距 */
        this._rightDis = 0;
        /**item间隔 */
        this._itemDis = 0;
        /**当前偏移 */
        this._curOffset = -1;
        /**垂直或者水平的大小 */
        this._fixItemSize = 0;
        /**与_fixItemSize相反（如果上面是垂直这个就是水平） */
        this._fixRowOrColSize = 0;
        /**当前行或者列的item数目 */
        this._fixItemCount = 0;
        /**同屏最大的列或者行 */
        this._maxShowRowOrColCount = 0;
        /**当前选择的索引 */
        this._selectIdx = -1;
        /**滑动框大小 */
        this._scrollSize = null;
        //================================================//
        /**当前多选的索引 */
        this._selectIndexes = [];
        this._allowMultipleSelection = false;
        /**主UI注册可以监听item点击事件 */
        this.onSelected = new Action2();
        /**主UI注册可以监听刷新事件 */
        this.onRefresh = new Action2();
        this._tempVec2 = new mw.Vector2();
        TimeUtil.onEnterFrame.add(this.update, this);
    }
    /**
     * 设置滚动框（滚动框变化时，需要重新设置一次）
     * @param scroll 滚动框（滚动框下面需要一个content）
     */
    initScroll(scroll) {
        if (this._scroll === scroll) {
            return;
        }
        if (this._scroll) {
            this._scroll.onUserScrolled.clear();
            this._scroll.onScrollEnd.clear();
        }
        if (this._content) {
            this._pool.forEach(element => {
                element.uiObject.removeObject();
            });
        }
        this._scroll = scroll;
        this._content = scroll.getChildAt(0);
        this._scrollSize = scroll.size.clone();
        scroll.onUserScrolled.add((currentOffset) => {
            let oldOffset = this._curOffset;
            this._curOffset = currentOffset;
            if (Math.abs(this._curOffset - oldOffset) < this._fixItemSize * this._maxShowRowOrColCount) {
                this._dirtyMark = true;
            }
        });
        scroll.onScrollEnd.add(() => {
            this._dirtyMark = true;
        });
        this._topDis = this._content.autoLayoutPadding.top;
        this._leftDis = this._content.autoLayoutPadding.left;
        this._bottomDis = this._content.autoLayoutPadding.bottom;
        this._rightDis = this._content.autoLayoutPadding.right;
        this._itemDis = this._content.autoLayoutSpacing;
        this._content.autoLayoutEnable = false;
    }
    /**
     - 设置数量（会刷新列表）--- *调用之前请确认设置过scroll*
     */
    setLength(len) {
        this._dataLength = len;
        this._curOffset = 0;
        this._scroll.scrollOffset = 0;
        this._content.position = mw.Vector.zero;
        this.clearSelected();
        this.resetView();
    }
    /**跳转到指定item索引位置的行或者列 */
    scrollToIndex(index) {
        // 索引要小于数量才能跳转
        if (index >= 0 && index <= this._dataLength - 1) {
            this.jumpToIndex(index);
        }
    }
    /**
     * 点击Item,会刷新item的选中态
     * @param idx item索引位置
     */
    clickItem(idx) {
        if (this._dataLength === 0) {
            return;
        }
        let item = this._pool.filter(val => val.index === idx)[0];
        if (item) {
            if (this._allowMultipleSelection) {
                const index = this._selectIndexes.indexOf(idx);
                if (index === -1) {
                    item.setSelect(true);
                    this._selectIndexes.push(idx);
                }
                else {
                    item.setSelect(false);
                    this._selectIndexes.splice(index, 1);
                }
            }
            else {
                const lastItem = this._pool.filter(val => val.index === this._selectIdx)[0];
                if (lastItem) {
                    lastItem.setSelect(false);
                }
                item.setSelect(true);
                this._selectIdx = idx;
            }
            this.onSelected.call(idx, item);
        }
    }
    /**
     * 刷新当前视口显示的所有item
     - 注意：这个接口刷新时,数据层不能有变化
     */
    refreshCurrentView() {
        this._dirtyMark = true;
    }
    /**销毁组件 */
    destroyList() {
        for (let i = 0; i < this._pool.length; i++) {
            if (this._pool[i].getBtn()) {
                this._pool[i].getBtn().onClicked.clear();
            }
        }
        this._pool.length = 0;
        this._content.removeAllChildren();
        TimeUtil.onEnterFrame.remove(this.update, this);
        this.onSelected.clear();
        this.onRefresh.clear();
        this._scroll = null;
        this._content = null;
        this.onRefresh = null;
        this.onSelected = null;
    }
    /**
     * 休眠List
     * @param destroyItem 是否销毁item(销毁会清空item池)
     */
    asleep(destroyItem = false) {
        this._pool.forEach(element => {
            element.uiObject.visibility = mw.SlateVisibility.Collapsed;
        });
        if (destroyItem) {
            for (let i = 0; i < this._pool.length; i++) {
                if (this._pool[i].getBtn()) {
                    this._pool[i].getBtn().onClicked.clear();
                }
                this._pool[i].destroy();
            }
            this._pool.length = 0;
        }
    }
    update(dt) {
        if (!this._scroll) {
            return;
        }
        if (!this.adapt()) { // 滑动窗口发生大小改变
            this.resetView();
            this._scrollSize.set(this._scroll.size);
        }
        if (this._dirtyMark) {
            this.refresh();
            this._dirtyMark = false;
        }
    }
    setContent() {
        const size = this._content.size;
        if (this._scroll.orientation === mw.Orientation.OrientVertical) { // 垂直
            // 垂直数量
            const cntV = Math.ceil(this._dataLength / this._fixItemCount);
            const h = this._fixItemSize * cntV + this._topDis + this._bottomDis;
            this._content.size = new mw.Vector2(size.x, h);
        }
        else if (this._scroll.orientation === mw.Orientation.OrientHorizontal) { // 水平
            // 水平数量
            const cntV = Math.ceil(this._dataLength / this._fixItemCount);
            const h = this._fixItemSize * cntV + this._leftDis + this._rightDis;
            this._content.size = new mw.Vector2(h, size.y);
        }
    }
    initItems() {
        // 获取item大小
        if (this._itemSize === null) {
            const ui = this.createItem();
            this._itemSize = ui.uiObject.size;
        }
        const size = this._scroll.size;
        if (this._scroll.orientation === mw.Orientation.OrientVertical) { // 垂直
            this._fixRowOrColSize = this._itemSize.x + this._itemDis;
            // 水平数量
            this._fixItemCount = Math.floor((size.x - this._rightDis - this._leftDis + this._itemDis) / this._fixRowOrColSize);
            this._fixItemSize = this._itemSize.y + this._itemDis;
            // 垂直数量
            this._maxShowRowOrColCount = Math.ceil((size.y - this._topDis) / this._fixItemSize);
        }
        else if (this._scroll.orientation === mw.Orientation.OrientHorizontal) { // 水平
            this._fixRowOrColSize = this._itemSize.y + this._itemDis;
            // 竖直数量
            this._fixItemCount = Math.floor((size.y - this._topDis - this._bottomDis + this._itemDis) / this._fixRowOrColSize);
            this._fixItemSize = this._itemSize.x + this._itemDis;
            // 水平数量
            this._maxShowRowOrColCount = Math.ceil((size.x - this._leftDis) / this._fixItemSize);
        }
        let count = (this._maxShowRowOrColCount + 1) * this._fixItemCount;
        count = (this._dataLength >= count ? count : this._dataLength) - this._pool.length;
        while (count-- > 0) {
            this.createItem();
        }
    }
    refresh() {
        let idx = 0;
        const rowOrColIndex = Math.floor(this._curOffset / this._fixItemSize);
        let dataIndex = rowOrColIndex * this._fixItemCount;
        // 多加一行跟丝滑
        for (let i = rowOrColIndex; i < (rowOrColIndex + this._maxShowRowOrColCount + 1); i++) {
            for (let j = 0; j < this._fixItemCount; j++) {
                if (dataIndex >= this._dataLength) { // 溢出控制   
                    break;
                }
                const item = this._pool[idx++];
                if (item) {
                    if (!item.uiObject.parent) {
                        this._content.addChild(item.uiObject);
                    }
                    const y = this._fixItemSize * i;
                    const x = this._fixRowOrColSize * j;
                    if (this._scroll.orientation === mw.Orientation.OrientVertical) { // 垂直
                        item.uiObject.position = this._tempVec2.set(x + this._leftDis, y + this._topDis);
                    }
                    else if (this._scroll.orientation === mw.Orientation.OrientHorizontal) { // 水平
                        item.uiObject.position = this._tempVec2.set(y + this._leftDis, x + this._topDis);
                    }
                    item.uiObject.visibility = mw.SlateVisibility.Visible;
                    this.updateItem(dataIndex++, item);
                }
            }
        }
        this.hideItem(idx);
    }
    hideItem(idx) {
        for (let i = idx; i < this._pool.length; i++) {
            this._pool[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
        }
    }
    createItem() {
        const uiScript = mw.UIService.create(this._cls);
        if (uiScript.getBtn()) {
            uiScript.getBtn().touchMethod = mw.ButtonTouchMethod.PreciseTap;
            uiScript.getBtn().onClicked.add(() => {
                if (uiScript.onClickItem()) {
                    this.clickItem(uiScript.index);
                }
            });
        }
        this._pool.push(uiScript);
        return uiScript;
    }
    updateItem(idx, item) {
        item.index = idx;
        this.onRefresh.call(idx, item);
        if (item.setSelect) {
            if (this._allowMultipleSelection) {
                item.setSelect(this._selectIndexes.includes(idx));
            }
            else {
                item.setSelect(idx === this._selectIdx);
            }
        }
    }
    jumpToIndex(index) {
        const rowOrCol = Math.floor(index / this._fixItemCount);
        const offset = rowOrCol * this._fixItemSize;
        let val = 0;
        if (this._scroll.orientation === mw.Orientation.OrientVertical) {
            val = this._content.size.y - (this._scroll.size.y - this._fixItemSize);
        }
        else if (this._scroll.orientation === mw.Orientation.OrientHorizontal) {
            val = this._content.size.x - (this._scroll.size.x - this._fixItemSize);
        }
        val = val < 0 ? 0 : val;
        val = offset > val ? val : offset;
        this._curOffset = val;
        this._scroll.scrollOffset = val;
    }
    resetView() {
        this.initItems();
        this.setContent();
        this._dirtyMark = true;
    }
    adapt() {
        return Vector2.equals(this._scrollSize, this._scroll.size, 0.1);
    }
}

var foreign62 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    List: List
});

var TempUtils;
(function (TempUtils) {
    TempUtils.V3 = new Vector();
    TempUtils.V2 = new Vector2();
    TempUtils.R3 = new Rotation();
})(TempUtils || (TempUtils = {}));

var foreign76 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get TempUtils () { return TempUtils; }
});

class ScalerText extends ScalerText_Generate$1 {
    set textContent(text) {
        this.text.text = text;
        setTimeout(() => {
            this.setTextPos();
            this.setImgSize();
        }, 0);
    }
    setTextPos() {
        TempUtils.V2.set((this.rootCanvas.size.x - this.text.size.x) / 2, this.text.position.y);
        this.text.position = TempUtils.V2;
    }
    setImgSize() {
        TempUtils.V2.set(this.text.size.x / this.rootCanvas.size.x + 0.2, 1);
        this.img.renderScale = TempUtils.V2;
    }
}

var foreign65 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ScalerText
});

let CommonTips = class CommonTips extends CommonTips_Generate$1 {
    constructor() {
        super(...arguments);
        this.scalerTexts = [];
        this.broadcastTexts = [];
        this.scalerAndTween = new Map();
    }
    static openTips(text) {
        let ui = UI.getUI(UIType.COMMON_TIPS);
        if (!ui)
            UI.show(UIType.COMMON_TIPS);
        Event.dispatchToLocal("TIPS", text);
    }
    onAwake() {
        super.onAwake();
        this.layer = mw.UILayerTop;
        this.onEvent();
    }
    onStart() {
        for (let i = 0; i < 3; i++) {
            this.scalerTexts.push(UIService.create(ScalerText));
        }
    }
    onEvent() {
        Event.addLocalListener("TIPS", (text) => {
            this.broadcastTexts.push(text);
            this.startBroadcast();
        });
    }
    onDestroy() {
        this.scalerTexts.length = 0;
        this.broadcastTexts.length = 0;
    }
    startBroadcast() {
        if (this.scalerTexts.length === 0) {
            let widget = this.canvas.getChildAt(0);
            widget.removeObject();
            let scalerText = mw.findUIScript(widget);
            this.scalerTexts.push(scalerText);
            if (this.scalerAndTween.has(widget)) {
                this.scalerAndTween.get(widget).stop();
                this.scalerAndTween.delete(widget);
            }
        }
        let item = this.scalerTexts.pop();
        this.canvas.addChild(item.uiObject);
        item.textContent = this.broadcastTexts.shift();
        let anim = this.getAnim(item.uiObject);
        anim.start();
        this.scalerAndTween.set(item.uiObject, anim);
    }
    getAnim(widget) {
        let anim1 = this.appearAnim(widget);
        let anim2 = this.disappearAnim(widget);
        anim1.chain(anim2.delay(3000));
        return anim1;
    }
    appearAnim(widget) {
        return new Tween({ renderScale: mw.Vector2.zero })
            .to({ renderScale: new mw.Vector2(1.2, 1.2) }, 200)
            .to({ renderScale: mw.Vector2.one }, 200)
            .onUpdate((obj) => {
            widget.renderScale = obj.renderScale;
        });
    }
    disappearAnim(widget) {
        return new Tween({ renderOpacity: 1 })
            .to({ renderScale: 0 }, 1000)
            .onUpdate((obj) => {
            widget.renderOpacity = obj.renderOpacity;
        })
            .onComplete(() => {
            let scalerText = mw.findUIScript(widget);
            this.scalerTexts.push(scalerText);
            this.scalerAndTween.delete(widget);
            widget.removeObject();
        });
    }
};
CommonTips = __decorate([
    UIClass(UIType.COMMON_TIPS)
], CommonTips);
var CommonTips$1 = CommonTips;

var foreign64 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CommonTips$1
});

let MainUI = class MainUI extends MainUI_Generate$1 {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            console.log("click");
        };
    }
    onAwake() {
        super.onAwake();
        // this.layer = mw.UILayerBottom;
        this.btnC.onClicked.add(this.onClick);
        this.btnB.onClicked.add(() => {
            console.log("移除");
            this.btnC.onClicked.remove(this.onClick);
        });
    }
    onShow(...param) {
        setTimeout(() => {
            console.log("aaaaa" + localToAbsolute(this.imggg.parent.cachedGeometry, this.imggg.position));
        }, 100);
    }
    onHide() {
        console.log("22222");
    }
};
MainUI = __decorate([
    UIClass(UIType.MAIN_UI)
], MainUI);

let SettingUI = class SettingUI extends SettingUI_Generate$1 {
    onAwake() {
        super.onAwake();
        // this.layer = mw.UILayerMiddle;
    }
};
SettingUI = __decorate([
    UIClass(UIType.SETTING_UI)
], SettingUI);

var UIUtils;
(function (UIUtils) {
    /**
     * 转换UI坐标
     * @param target 目标UI组件
     * @param origin 当前UI组件
     * @returns
     */
    function convertLoc(target, origin) {
        let tParentGeometry = target.parent.cachedGeometry;
        let oParentGeometry = origin.parent.cachedGeometry;
        let absPos = localToAbsolute(tParentGeometry, target.position);
        let targetPos = absoluteToLocal(oParentGeometry, absPos);
        return targetPos;
    }
    UIUtils.convertLoc = convertLoc;
    /**
     * 设置UI组件的可见性
     * @param ui UI组件
     * @param isShow 是否显示
     */
    function setVisible(ui, isShow) {
        let isBlock = (ui instanceof Button)
            || (ui instanceof StaleButton)
            || (ui instanceof ScrollBox)
            || (ui instanceof VirtualJoystickPanel);
        ui.visibility = isShow ?
            isBlock ? mw.SlateVisibility.Visible : mw.SlateVisibility.SelfHitTestInvisible
            : mw.SlateVisibility.Collapsed;
    }
    UIUtils.setVisible = setVisible;
    /**
     * 查找ui对象的上级rootcanvas
     * @param ui 控件对象
     * @param level 查找层级
     * @returns rootcanvas
     */
    function findRootCanvas(ui, level = 1) {
        if (!ui || !ui.parent) {
            return null;
        }
        if (ui.parent instanceof mw.UserWidget) { // uiObject
            level--;
            if (level === 0) {
                return ui;
            }
        }
        return findRootCanvas(ui.parent, level);
    }
    UIUtils.findRootCanvas = findRootCanvas;
    /**
     * 关闭容器子节点显影
     * @param canvas 容器
     */
    function closeChildrenWidget(canvas) {
        let len = canvas.getChildrenCount();
        for (let i = 0; i < len; i++) {
            setVisible(canvas.getChildAt(i), false);
        }
    }
    UIUtils.closeChildrenWidget = closeChildrenWidget;
})(UIUtils || (UIUtils = {}));

var foreign77 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get UIUtils () { return UIUtils; }
});

let AbilityReleaseUI = class AbilityReleaseUI extends AbilityRelease_Generate$1 {
    constructor() {
        super(...arguments);
        this._bgSize = new mw.Vector2(0, 0);
        this._pointSize = new mw.Vector2(0, 0);
        this._touch = null;
        this.onTouchBegin = (index, location, touchType) => {
            let loc = screenToViewport(location);
            loc.subtract(this._bgSize);
            this.controller.position = loc;
            UIUtils.setVisible(this.controller, true);
            UIUtils.setVisible(this.point, false);
        };
        this.onTouchMove = (index, location, touchType) => {
            if (this.controller.visible) {
                let loc = screenToWidgetAbsolute(location);
                let pos = absoluteToLocal(this.controller.tickSpaceGeometry, loc).subtract(this._bgSize);
                const ratio = pos.length / this._bgSize.x;
                if (ratio > 1) {
                    pos.multiply(1 / ratio);
                }
                const radians = MathUtil.degreesToRadians(Vector2.signAngle(Vector2.unitX, pos));
                const x = pos.length * Math.cos(radians) + this._bgSize.x - this._pointSize.x;
                const y = pos.length * Math.sin(radians) + this._bgSize.y - this._pointSize.y;
                this.point.position = TempUtils.V2.set(x, y);
                !this.point.visible && UIUtils.setVisible(this.point, true);
            }
        };
        this.onTouchEnd = (index, location, touchType) => {
            UIUtils.setVisible(this.controller, false);
        };
    }
    onStart() {
        this._touch = new mw.TouchInputUtil();
        // this._touch.setPlayerController
        this._bgSize = this.bg.size.multiply(0.5);
        this._pointSize = this.point.size.multiply(0.5);
        UIUtils.setVisible(this.controller, false);
    }
    onShow(...param) {
        this._touch.onTouchBegin.add(this.onTouchBegin);
        this._touch.onTouchMove.add(this.onTouchMove);
        this._touch.onTouchEnd.add(this.onTouchEnd);
    }
    onHide() {
        this._touch.onTouchBegin.remove(this.onTouchBegin);
        this._touch.onTouchMove.remove(this.onTouchMove);
        this._touch.onTouchEnd.remove(this.onTouchEnd);
    }
};
AbilityReleaseUI = __decorate([
    UIClass(UIType.ABILITY_RELEASE_UI)
], AbilityReleaseUI);

var foreign68 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get AbilityReleaseUI () { return AbilityReleaseUI; }
});

var CharacterUtils;
(function (CharacterUtils) {
    async function setShape(cha, target, sync = false) {
        await target.asyncReady();
        let body = target.description.advance.bodyFeatures;
        let head = target.description.advance.headFeatures;
        let advance = cha.description.advance;
        cloneProprety(advance.bodyFeatures, body);
        cloneProprety(advance.headFeatures, head);
        sync && cha.syncDescription();
    }
    CharacterUtils.setShape = setShape;
    function resetRoleDescription(cha, advance, sync = false) {
        cha.setDescription(advance);
        sync && cha.syncDescription();
    }
    CharacterUtils.resetRoleDescription = resetRoleDescription;
    CharacterUtils.slefAdvance = null;
    function cloneAdvance(cha) {
        return cha.getDescription();
    }
    CharacterUtils.cloneAdvance = cloneAdvance;
    function setDescription(cha, guid) {
        cha.setDescription([guid]);
    }
    CharacterUtils.setDescription = setDescription;
    /**
     * 克隆属性
     * @param obj1 被赋值的对象
     * @param obj2 赋值对象
     */
    function cloneProprety(obj1, obj2) {
        for (const key in obj2) {
            let v = obj2[key];
            if (typeof v === 'object') {
                cloneProprety(obj1[key], v);
            }
            else {
                if (typeof v !== 'function') {
                    try {
                        obj1[key] = v;
                    }
                    catch (error) {
                        console.log(key + '\t' + error);
                    }
                }
            }
        }
    }
})(CharacterUtils || (CharacterUtils = {}));

var foreign69 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get CharacterUtils () { return CharacterUtils; }
});

var FormatUtils;
(function (FormatUtils) {
    /**
     * 获取剩余时间 (毫秒)
     * @param time 时间差(毫秒)
     * @param type 显示类型
     * @param isMile 是否为毫秒
     * */
    function getRemindTime(time, format = '{d}:{h}:{mm}:{s}:{ms}') {
        if (time < 0 || !time) {
            time = 0;
        }
        const milliSecond = Number((time / 1000).toString().split('.')[1]);
        time = Math.round(time / 1000);
        const day = Math.floor(time / 86400); // 天
        time = time - (day * 86400);
        const hour = Math.floor(time / 3600); // 时
        time = time - (hour * 3600);
        const minute = Math.floor(time / 60); // 分
        const second = Math.floor(time - (minute * 60)); // 秒
        const dayStr = toFitZero(day, 2);
        const hourStr = toFitZero(hour, 2);
        const minuteStr = toFitZero(minute, 2);
        const secondStr = toFitZero(second, 2);
        let milliSecondStr = milliSecond.toString();
        while (milliSecondStr.length < 3) {
            milliSecondStr += '0';
        }
        const longHourStr = toFitZero(hour + day * 24, 2); //把天数合并进小时内显示
        const args = { d: dayStr, h: hourStr, mm: minuteStr, s: secondStr, ms: milliSecondStr, lh: longHourStr };
        return factionLog(format, args);
    }
    FormatUtils.getRemindTime = getRemindTime;
    function toFitZero(number, num) {
        let s = number.toString();
        const sLength = num - s.length;
        if (s.length < num) {
            let plusZero = '';
            for (let i = 0; i < sLength; i++) {
                plusZero = '0' + plusZero;
            }
            s = plusZero + s;
        }
        return s;
    }
    function factionLog(str, args) {
        const keys = Object.keys(args);
        if (keys.length === 0) {
            return str;
        }
        for (const key of keys) {
            const re = new RegExp('\\{' + (key) + '\\}', 'gm');
            str = str.replace(re, String(args[key]));
        }
        return str;
    }
})(FormatUtils || (FormatUtils = {}));

var foreign70 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get FormatUtils () { return FormatUtils; }
});

class IAP {
    get arkNum() {
        return this._arkNum;
    }
    constructor() {
        /**乐币数量 */
        this._arkNum = 0;
        /**乐币数量监听回调 */
        this.onArkCoinChange = new Action1();
        PurchaseService.onArkBalanceUpdated.add((amount) => {
            this._arkNum = amount;
            this.onArkCoinChange.call(amount);
        });
        this.reqRefreshCoin();
    }
    /**
     * 发起购买
     * @param commodityId 商品Code
     * @returns
     */
    reqBuyGoods(commodityId) {
        return new Promise((result) => {
            console.log("发起购买的code", commodityId);
            PurchaseService.placeOrder(commodityId, 1, (status, msg) => {
                console.log(`IAP_BuyCallback__,status:${status},msg:${msg},id:${commodityId}`);
                if (status == 200) {
                    result(true);
                    console.log("订单支付成功!," + commodityId);
                    this.reqRefreshCoin();
                }
                else {
                    result(false);
                    console.log(`订单支付失败, id:${commodityId},msg:${msg}`);
                }
            });
        });
    }
    /**
     * 乐币是否足够
     * @param cost 花费金额
     * @returns
     */
    isArkCoinEnough(cost) {
        return this.arkNum >= cost;
    }
    /**
     * 发起刷新乐币
     */
    reqRefreshCoin() {
        PurchaseService.getArkBalance();
    }
}
/**iap 客户端服务类 */
const IAPClientService = function getIAPServive() {
    if (SystemUtil.isServer())
        return null;
    return new IAP();
}();
/**iap 服务器订单购买成功的代理 */
const IAPServerAction = SystemUtil.isServer() ? mw.PurchaseService.onOrderDelivered : null;

var foreign71 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IAPClientService: IAPClientService,
    IAPServerAction: IAPServerAction
});

/**
 * GToolkit.
 * General Toolkit deep binding MW Ts.
 * @desc ---
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author G.S.C. Gtk Standards Committee. Gtk 标准委员会.
 * @author LviatYi
 * @author minjia.zhang
 * @author zewei.zhang
 * @author yuanming.hu
 * @see https://github.com/LviatYi/MetaWorldNPT/tree/main/MetaWorldNPT/JavaScripts/util
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 * @version 31.15.7
 * @beta
 */
class GToolkit {
    constructor() {
        /**
         * 默认 随机函数.
         * @type {() => number}
         */
        this.defaultRandomFunc = Math.random;
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
        //#region Member
        this._characterDescriptionLockers = new Set();
        this._patchHandlerPool = new Map();
        this._waitHandlerPool = new Map();
        this._globalOnlyOnBlurDelegate = undefined;
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
        //#region MW
        //#region Constant
        /**
         * Guid of Root GameObject.
         */
        this.ROOT_GAME_OBJECT_GUID = "SceneRoot";
        /**
         * Guid of Root GameObject (old).
         */
        this.ROOT_GAME_OBJECT_GUID_BACKUP = "ComponentRoot";
        /**
         * Tag of Root GameObject.
         * @type {string}
         */
        this.ROOT_GAME_OBJECT_TAG_CUSTOM = "SceneRootTagByGtk";
        /**
         * 全透明图片 GUID.
         * @type {string}
         */
        this.IMAGE_FULLY_TRANSPARENT_GUID = "168495";
        /**
         * 纯黑圆形遮罩 GUID.
         */
        this.IMAGE_CIRCLE_MASK_GUID = "212681";
        /**
         * 白色方块 GUID.
         * @type {string}
         */
        this.IMAGE_WHITE_SQUARE_GUID = "114028";
        /**
         * mw 导出颜色字符串正则.
         * @type {RegExp}
         * @private
         */
        this.REGEX_MW_EXPORT_COLOR_STR = /(?=.*R)(?=.*G)(?=.*B)\(([RGBA]=\d*(\.\d*)?,?)+\)/g;
        /**
         * mw 导出颜色值正则.
         * @type {RegExp}
         * @private
         */
        this.REGEX_MW_EXPORT_COLOR_VALUE_STR = /([RGBA])=(\d*(\.\d*)?)/g;
        /**
         * 十六进制颜色字符串正则.
         * @type {RegExp}
         * @private
         */
        this.REGEX_HEX_COLOR_STR = /^#?[\dA-Fa-f]+$/g;
        /**
         * mw 配置颜色字符串正则.
         * @type {RegExp}
         * @private
         */
        this.REGEX_MW_ARRAY_COLOR_STR = /^[.|\d]+$/g;
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    /**
     * Is Primitive.
     * @param value
     */
    isPrimitiveType(value) {
        return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "symbol";
    }
    /**
     * Is number.
     * @param value
     */
    isNumber(value) {
        return typeof value === "number";
    }
    /**
     * Is string.
     * @param value
     */
    isString(value) {
        return typeof value === "string";
    }
    /**
     * Is boolean.
     * @param value
     */
    isBoolean(value) {
        return typeof value === "boolean";
    }
    /**
     * Is object.
     * @param value
     */
    isObject(value) {
        return typeof value === "object";
    }
    /**
     * 对 instance 进行强制类型推断.
     * @param instance 对象
     * @param method 对象方法名
     * @returns boolean
     */
    is(instance, method) {
        if (!instance)
            return false;
        if (typeof method === "string") {
            return method in instance;
        }
        return method(instance);
    }
    /**
     * Ts 枚举值.
     * traverse values in enum.
     * @param {T} enumType
     * @return {ValueTypeInEnum<T>[]}
     */
    enumVals(enumType) {
        return Object
            .entries(enumType)
            .filter(([key, value]) => isNaN(Number(key)))
            .map(([key, value]) => value);
    }
    /**
     * is the array or string empty.
     * define empty is undefined or null or [""].
     * @param textOrArray str or array.
     */
    isNullOrEmpty(textOrArray) {
        return this.isNullOrUndefined(textOrArray) ||
            (typeof textOrArray === "string" ? (textOrArray === "") : (textOrArray.length === 0));
    }
    /**
     * is the value null or undefined.
     * @param value
     */
    isNullOrUndefined(value) {
        return value == undefined;
    }
    /**
     * return the safe index.
     * @param index
     * @param arr
     * @param safeStrategy 索引越界时的安全策略.
     *      - "cut" default. 截断至合法索引.
     *      - "cycle" 循环. 非法时对值取余.
     * @return 当数组为空时返回 -1. 否则按策略返回合法索引.
     */
    safeIndex(index, arr, safeStrategy = "cut") {
        if (this.isNullOrEmpty(arr))
            return -1;
        if (index < 0)
            switch (safeStrategy) {
                case "cycle":
                    return (arr.length + index % arr.length) % arr.length;
                case "cut":
                default:
                    return 0;
            }
        if (index >= arr.length)
            switch (safeStrategy) {
                case "cycle":
                    return index % arr.length;
                case "cut":
                default:
                    return arr.length - 1;
            }
        return index;
    }
    /**
     * return item by index who maybe unsafe.
     * @param index
     * @param arr
     * @param safeStrategy 索引越界时的安全策略.
     *      - "cut" default. 截断至合法索引.
     *      - "cycle" 循环. 非法时对值取余.
     * @return 当数组为空时返回 null. 否则按策略返回合法元素.
     */
    safeIndexItem(index, arr, safeStrategy = "cut") {
        let safeIndex = this.safeIndex(index, arr, safeStrategy);
        return safeIndex === -1 ? null : arr[safeIndex];
    }
    /**
     * remove item from array.
     * @param array
     * @param item
     * @param {boolean} holdOrder hold order after remove.
     */
    remove(array, item, holdOrder = true) {
        if (!array)
            return;
        const index = array.indexOf(item);
        if (index > -1) {
            if (holdOrder) {
                array.splice(index, 1);
            }
            else {
                array[index] = array[array.length - 1];
                array.pop();
            }
            return true;
        }
        return false;
    }
    /**
     * remove item from array by index.
     * @desc sequence not maintained.
     * @param {T[]} array
     * @param {number} index
     */
    removeByIndex(array, index) {
        if (index < 0 || index > array.length) {
            return false;
        }
        array[index] = array[array.length - 1];
        --array.length;
        return true;
    }
    /**
     * build an advanced switch.
     */
    switch() {
        return new Switcher();
    }
    ;
    /**
     * fold data.
     * @param data
     * @param foldCount
     * @param func
     */
    fold(data, foldCount, func) {
        const result = [];
        for (let i = 0; i < data.length; i += foldCount) {
            result.push(func(data.slice(i, i + foldCount)));
        }
        return result;
    }
    /**
     * unfold data.
     * @param data
     * @param foldCount
     * @param func
     */
    unfold(data, foldCount, func) {
        const result = [];
        for (const element of data) {
            result.push(...func(element));
        }
        return result;
    }
    /**
     * confirm get value from map with key.
     * @param {Map<K, V>} map
     * @param {K} key
     * @param {()=>V} generate
     * @return {V}
     */
    tryGet(map, key, generate) {
        let result = map.get(key);
        if (result === undefined) {
            result = typeof generate === "function" ?
                generate() :
                generate;
            map.set(key, result);
        }
        return result;
    }
    /**
     * do callback once when predicate return true.
     * @param predicate
     * @param callback
     * @param interval test predicate interval. ms.
     *      - 100 default.
     * @param instant test predicate at once.
     * @param timeout timeout. stop predicate test after timeout. ms.
     *      - 0 default. no timeout.
     * @param onError on error callback.
     * @param onTimeout on timeout callback.
     * @return interval hold id.
     */
    doWhenTrue(predicate, callback, interval = 100, instant = true, timeout = 0, onError = undefined, onTimeout = undefined) {
        const startTime = Date.now();
        let holdId = null;
        const callbackWithCatch = () => {
            try {
                callback();
            }
            catch (e) {
                try {
                    onError && onError();
                }
                catch (e) {
                    console.error("GToolkit: error occurs in onError callback.");
                    console.error(e);
                    console.error(e.stack);
                }
            }
            finally {
                holdId && clearInterval(holdId);
            }
        };
        if (instant && predicate()) {
            callbackWithCatch();
            return null;
        }
        holdId = mw.setInterval(() => {
            if (timeout > 0 && Date.now() - startTime > timeout) {
                clearInterval(holdId);
                onTimeout && onTimeout();
                return;
            }
            if (!predicate())
                return;
            callbackWithCatch();
        }, interval);
        return holdId;
    }
    /**
     * do callback persistently until predicate return true.
     * @param predicate
     * @param callback
     * @param interval ms. test predicate interval.
     *      100 default.
     * @param instant test predicate at once.
     * @param timeout timeout. stop predicate test after timeout. ms.
     *      - 0 default. no timeout.
     * @param onError on error callback.
     * @param onTimeout on timeout callback.
     * @return interval hold id.
     */
    doUntilTrue(predicate, callback, interval = 100, instant = true, timeout = 0, onError = undefined, onTimeout = undefined) {
        const startTime = Date.now();
        let holdId = null;
        const callbackWithCatch = () => {
            try {
                callback();
            }
            catch (e) {
                try {
                    onError && onError();
                }
                catch (e) {
                    console.error("GToolkit: error occurs in onError callback.");
                    console.error(e);
                    console.error(e.stack);
                }
            }
            finally {
                holdId && clearInterval(holdId);
            }
        };
        if (instant) {
            if (predicate())
                return null;
            else
                callbackWithCatch();
        }
        holdId = mw.setInterval(() => {
            if (timeout > 0 && Date.now() - startTime > timeout) {
                clearInterval(holdId);
                onTimeout && onTimeout();
                return;
            }
            if (predicate()) {
                clearInterval(holdId);
                return;
            }
            callbackWithCatch();
        }, interval);
        return holdId;
    }
    /**
     * do a delayed batch operation who wait for data.
     * @param {TArg} data
     * @param {(data: TArg[]) => void} patchCallback
     *      - do not use an anonymous function here.
     * @param {number} waitTime=undefined 󰅐wait time. ms.
     *      if first register the patchCallback, the waitTime will be 100 ms.
     *      else the waitTime will use last waitTime.
     * @param {boolean} reTouch=false reclock when data added.
     *      it allows a single instance to store and manage multiple data batch queues based on different tags.
     * @param {boolean} instantly=false do patch when instantly.
     * @return {number} timer id.
     */
    patchDo(data, patchCallback, waitTime = undefined, reTouch = false, instantly = false) {
        let existPatch = this.tryGet(this._patchHandlerPool, patchCallback, () => ({
            timerId: undefined,
            data: [],
            delayDo: () => {
                if (existPatch.timerId !== undefined) {
                    mw.clearTimeout(existPatch.timerId);
                }
                this._patchHandlerPool.delete(patchCallback);
                patchCallback(existPatch.data);
            },
            lastWaitDuration: waitTime,
        }));
        existPatch.data.push(data);
        if (instantly) {
            existPatch.delayDo();
        }
        else if (existPatch.timerId === undefined || reTouch) {
            if (existPatch.timerId !== undefined)
                mw.clearTimeout(existPatch.timerId);
            if (waitTime !== undefined)
                existPatch.lastWaitDuration = waitTime;
            existPatch.timerId = mw.setTimeout(existPatch.delayDo, existPatch.lastWaitDuration ?? 0.1e3);
        }
        return existPatch.timerId;
    }
    /**
     * do a delayed batch operation who wait for data.
     * @param {TArg} data
     * @param {(data: TArg) => void} waitCallback
     *      - do not use an anonymous function here.
     * @param {number} waitTime=undefined 󰅐wait time. ms.
     *      if first register the patchCallback, the waitTime will be 100 ms.
     *      else the waitTime will use last waitTime.
     * @param {boolean} reTouch=true reclock when data added.
     *      it allows a single instance to store and manage multiple data batch queues based on different tags.
     * @param {boolean} instantly=false do patch when instantly.
     * @return {number} timer id.
     */
    waitDo(data, waitCallback, waitTime = undefined, reTouch = true, instantly = false) {
        let existPatch = this.tryGet(this._waitHandlerPool, waitCallback, () => ({
            timerId: undefined,
            data: undefined,
            delayDo: () => {
                if (existPatch.timerId !== undefined) {
                    mw.clearTimeout(existPatch.timerId);
                }
                this._waitHandlerPool.delete(waitCallback);
                waitCallback(existPatch.data);
            },
            lastWaitDuration: waitTime,
        }));
        existPatch.data = data;
        if (instantly) {
            existPatch.delayDo();
        }
        else if (existPatch.timerId === undefined || reTouch) {
            if (existPatch.timerId !== undefined)
                mw.clearTimeout(existPatch.timerId);
            if (waitTime !== undefined)
                existPatch.lastWaitDuration = waitTime;
            existPatch.timerId = mw.setTimeout(existPatch.delayDo, existPatch.lastWaitDuration ?? 1e3);
        }
        return existPatch.timerId;
    }
    /**
     * whether the two times are equal.
     * @param {number} lhs
     * @param {number} rhs
     * @param {GtkTypes.TimeFormatDimensionFlagsLike} precision
     * @return {boolean}
     */
    isSameTime(lhs, rhs, precision = GtkTypes.Tf.D) {
        if (precision === GtkTypes.Tf.Ms)
            return lhs === rhs;
        let lhsDate = new Date(lhs);
        let rhsDate = new Date(rhs);
        switch (precision) {
            case GtkTypes.Tf.Y:
                return lhsDate.getFullYear() === rhsDate.getFullYear();
            case GtkTypes.Tf.Mon:
                return lhsDate.getFullYear() === rhsDate.getFullYear() &&
                    lhsDate.getMonth() === rhsDate.getMonth();
            case GtkTypes.Tf.D:
                return lhsDate.getFullYear() === rhsDate.getFullYear() &&
                    lhsDate.getMonth() === rhsDate.getMonth() &&
                    lhsDate.getDate() === rhsDate.getDate();
            case GtkTypes.Tf.H:
                return lhsDate.getFullYear() === rhsDate.getFullYear() &&
                    lhsDate.getMonth() === rhsDate.getMonth() &&
                    lhsDate.getDate() === rhsDate.getDate() &&
                    lhsDate.getHours() === rhsDate.getHours();
            case GtkTypes.Tf.M:
                return lhsDate.getFullYear() === rhsDate.getFullYear() &&
                    lhsDate.getMonth() === rhsDate.getMonth() &&
                    lhsDate.getDate() === rhsDate.getDate() &&
                    lhsDate.getHours() === rhsDate.getHours() &&
                    lhsDate.getMinutes() === rhsDate.getMinutes();
            case GtkTypes.Tf.S:
                return lhsDate.getFullYear() === rhsDate.getFullYear() &&
                    lhsDate.getMonth() === rhsDate.getMonth() &&
                    lhsDate.getDate() === rhsDate.getDate() &&
                    lhsDate.getHours() === rhsDate.getHours() &&
                    lhsDate.getMinutes() === rhsDate.getMinutes() &&
                    lhsDate.getSeconds() === rhsDate.getSeconds();
            default:
                return false;
        }
    }
    /**
     * 获取所有成员 key.
     * @param obj 指定实例.
     * @param exceptConstructor 是否 排除构造函数.
     * @param exceptObject 是否 排除 Js Object.
     */
    getAllMember(obj, exceptConstructor = true, exceptObject = true) {
        const props = [];
        let focus = obj;
        do {
            if (exceptObject && focus === Object.prototype) {
                break;
            }
            props.push(...Object.getOwnPropertyNames(focus).filter(item => !(exceptConstructor && item === "constructor")));
        } while (focus = Object.getPrototypeOf(focus));
        return props;
    }
    /**
     * angle to radius.
     * @param angle
     */
    radius(angle) {
        return angle / 180 * Math.PI;
    }
    /**
     * radius to angle.
     * @param radius
     */
    angle(radius) {
        return radius / Math.PI * 180;
    }
    /**
     * random in range [min,max).
     * @param min default 0.
     * @param max default min + 1.
     * @param integer return a integer.
     */
    random(min = undefined, max = undefined, integer = false) {
        if (min === undefined) {
            min = 0;
        }
        if (max === undefined) {
            max = min + 1;
        }
        let result = Math.random() * (max - min) + min;
        return integer ? result | 0 : result;
    }
    /**
     * random with weight.
     * @param weight
     * @param total total weight. add last weight as total-sum(weight)
     * @return number [0,weight.length) .
     */
    randomWeight(weight, total = undefined) {
        const stepWeight = new Array(weight.length);
        for (let i = 0; i < weight.length; i++) {
            stepWeight[i] = (i === 0 ? 0 : stepWeight[i - 1]) + weight[i];
        }
        if (total !== undefined && total > stepWeight[stepWeight.length - 1]) {
            stepWeight.push(total);
        }
        const r = this.random(0, stepWeight[stepWeight.length - 1]);
        let start = 0;
        let end = stepWeight.length;
        while (start < end) {
            let mid = ((start + end) / 2) | 0;
            if (r < stepWeight[mid]) {
                end = mid;
            }
            else {
                start = mid + 1;
            }
        }
        return start;
    }
    /**
     * random in array.
     * return null when array invalid or length is zero.
     * @param array
     */
    randomArrayItem(array) {
        if (!array || array.length === 0)
            return null;
        return array[this.random(0, array.length, true)];
    }
    /**
     * random shuffle the order from 0 to count.
     * Fisher–Yates.
     * @param count
     */
    randomShuffleOrder(count) {
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            result[i] = i;
        }
        for (let i = count - 1; i > 0; i--) {
            const j = this.random(0, i, true);
            result[i] = result[i] ^ result[j];
            result[j] = result[i] ^ result[j];
            result[i] = result[i] ^ result[j];
        }
        return result;
    }
    /**
     * random shuffle the array.
     * Fisher–Yates.
     * @param items
     */
    randomShuffleArray(items) {
        if (this.isNullOrEmpty(items))
            return [];
        const count = items.length;
        const result = [...items];
        for (let i = count - 1; i > 0; i--) {
            const j = this.random(0, i, true);
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
    /**
     * Get a random generator.
     * @param {number | number[]} length length or scale.
     * @return {RandomGenerator}
     */
    randomGenerator(length = 3) {
        return new RandomGenerator().random(length, this.defaultRandomFunc);
    }
    /**
     * Generate a random point located on the surface of a unit sphere in an arbitrary number of dimensions,
     * by Box-Muller transform and normalization.
     * @param dimension
     * @param randomFunc
     */
    randomDimensionSphere(dimension = 2, randomFunc = undefined) {
        if (dimension < 0 || dimension != (dimension | 0))
            return [];
        if (randomFunc === undefined) {
            randomFunc = this.defaultRandomFunc;
        }
        if (dimension === 1) {
            return randomFunc() >= 0.5 ? [1] : [-1];
        }
        if (dimension === 2) {
            const angle = Math.random() * 2 * Math.PI;
            return [Math.cos(angle), Math.sin(angle)];
        }
        const ans = new Array(dimension);
        let d2 = Math.floor(dimension >> 1) << 1;
        let r2 = 0;
        for (let i = 0; i < d2; i += 2) {
            const rr = -2.0 * Math.log(randomFunc());
            const r = Math.sqrt(rr);
            const theta = 2.0 * Math.PI * randomFunc();
            r2 += rr;
            ans[i] = r * Math.cos(theta);
            ans[i + 1] = r * Math.sin(theta);
        }
        if (dimension % 2) {
            const x = Math.sqrt(-2.0 * Math.log(randomFunc())) * Math.cos(2.0 * Math.PI * randomFunc());
            ans[dimension - 1] = x;
            r2 += Math.pow(x, 2);
        }
        const h = 1.0 / Math.sqrt(r2);
        for (let i = 0; i < dimension; ++i) {
            ans[i] *= h;
        }
        return ans;
    }
    /**
     * 格式化 Timestamp 至 00:00.
     *
     * @param timestamp
     * @param option 选择需显示的时间维度.
     */
    formatTimeFromTimestamp(timestamp, option = GtkTypes.TimeFormatDimensionFlags.Second |
        GtkTypes.TimeFormatDimensionFlags.Minute) {
        const date = new Date(timestamp);
        let result = "";
        if ((option & GtkTypes.TimeFormatDimensionFlags.Hour) > 0) {
            const hour = date.getHours().toString().padStart(2, "0");
            if (result.length > 0) {
                result += ":";
            }
            result += hour;
        }
        if ((option & GtkTypes.TimeFormatDimensionFlags.Minute) > 0) {
            const minutes = date.getMinutes().toString().padStart(2, "0");
            if (result.length > 0) {
                result += ":";
            }
            result += minutes;
        }
        if ((option & GtkTypes.TimeFormatDimensionFlags.Second) > 0) {
            const seconds = date.getSeconds().toString().padStart(2, "0");
            if (result.length > 0) {
                result += ":";
            }
            result += seconds;
        }
        return result;
    }
    ;
    /**
     * 时间转换.
     * 支持的时间单位范围：[毫秒,天]
     * @param val 原值.
     * @param from 原值时间维度.
     * @param to 目标时间维度.
     * @return {null} 入参在不支持的范围内时.
     */
    timeConvert(val, from, to) {
        if (from === to)
            return val;
        if (this.hammingWeight(from) !== 1 || this.hammingWeight(to) !== 1)
            return null;
        if ((0x1 << this.bitFirstOne(from)) > GtkTypes.TimeFormatDimensionFlags.Day ||
            (0x1 << this.bitFirstOne(to)) > GtkTypes.TimeFormatDimensionFlags.Day) {
            return null;
        }
        while (from !== to) {
            if (from > to) {
                switch (from) {
                    case GtkTypes.TimeFormatDimensionFlags.Second:
                        val *= GToolkit.MillisecondInSecond;
                        break;
                    case GtkTypes.TimeFormatDimensionFlags.Minute:
                        val *= GToolkit.SecondInMinute;
                        break;
                    case GtkTypes.TimeFormatDimensionFlags.Hour:
                        val *= GToolkit.MinuteInHour;
                        break;
                    case GtkTypes.TimeFormatDimensionFlags.Day:
                        val *= GToolkit.HourInDay;
                        break;
                }
                from >>= 0x1;
            }
            else {
                switch (from) {
                    case GtkTypes.TimeFormatDimensionFlags.Millisecond:
                        val /= GToolkit.MillisecondInSecond;
                        break;
                    case GtkTypes.TimeFormatDimensionFlags.Second:
                        val /= GToolkit.SecondInMinute;
                        break;
                    case GtkTypes.TimeFormatDimensionFlags.Minute:
                        val /= GToolkit.MinuteInHour;
                        break;
                    case GtkTypes.TimeFormatDimensionFlags.Hour:
                        val /= GToolkit.HourInDay;
                        break;
                }
                from <<= 0x1;
            }
        }
        return val;
    }
    /**
     * Clamp.
     * @param {number} val
     * @param {number} min=0
     * @param {number} max=1
     * @return {number}
     */
    clamp(val, min = 0, max = 1) {
        return Math.min(max, Math.max(min, val));
    }
    /**
     * 汉明重量.
     * num 作为二进制时 1 的个数.
     * @param num
     */
    hammingWeight(num) {
        let result = 0;
        let handle = 0;
        while ((0x1 << handle) <= num) {
            if ((num & 0x1 << handle) > 0) {
                ++result;
            }
            ++handle;
        }
        return result;
    }
    /**
     * num 的二进制形式中第一个 1 的位置.
     * @param num
     * @return {number} 位置.
     *      {-1} 时入参不合法.
     */
    bitFirstOne(num) {
        if ((num | 0) !== num)
            return -1;
        let handle = 0;
        while ((0x1 << handle) <= num)
            ++handle;
        return handle - 1;
    }
    /**
     * num 的二进制形式中指定数位是否为 1.
     * @param num
     * @param bit 从右向左数第 bit 位.
     */
    bitIn(num, bit) {
        return (num & (0x1 << bit)) > 0;
    }
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    /**
     * 导出颜色字符串统一化.
     * @param {string} str
     * @param {boolean} fallback=false 是否 值不合法时 回退至透明.
     * @returns {mw.LinearColor | undefined}
     */
    catchMwExportColor(str, fallback = false) {
        if (this.isNullOrEmpty(str))
            return fallback ? new mw.LinearColor(0, 0, 0, 0) : undefined;
        str = str.replace(/\s/g, "");
        if (this.isNullOrEmpty(str))
            return fallback ? new mw.LinearColor(0, 0, 0, 0) : undefined;
        let result = this.tryCatchHex(str);
        if (result)
            return this.colorLikeToMwColor(result);
        result = this.tryCatchMwArray(str);
        if (result)
            return this.colorLikeToMwColor(result);
        result = this.tryCatchMwExport(str);
        if (result)
            return this.colorLikeToMwColor(result);
        return fallback ? new mw.LinearColor(0, 0, 0, 0) : undefined;
    }
    /**
     * 尝试捕获 mw 导出颜色字符串.
     * @param {string} str
     * @returns {IColor | undefined}
     */
    tryCatchMwExport(str) {
        this.REGEX_MW_EXPORT_COLOR_STR.lastIndex = 0;
        if (this.REGEX_MW_EXPORT_COLOR_STR.test(str)) {
            let ret = { r: 0, g: 0, b: 0, a: 0 };
            for (let regArray of this.REGEX_MW_EXPORT_COLOR_VALUE_STR[Symbol.matchAll](str)) {
                let v = Number(regArray[2]);
                if (Number.isNaN(v))
                    continue;
                switch (regArray[1].toUpperCase()) {
                    case "R":
                        ret.r = v;
                        break;
                    case "G":
                        ret.g = v;
                        break;
                    case "B":
                        ret.b = v;
                        break;
                    case "A":
                        ret.a = v;
                        break;
                }
            }
            if (ret.r === undefined)
                ret.r = 0;
            if (ret.g === undefined)
                ret.g = 0;
            if (ret.b === undefined)
                ret.b = 0;
            return ret;
        }
        else {
            return undefined;
        }
    }
    /**
     * 尝试捕获十六进制颜色字符串.
     * @param {string} str
     * @returns {IColor | undefined}
     */
    tryCatchHex(str) {
        this.REGEX_HEX_COLOR_STR.lastIndex = 0;
        if (this.REGEX_HEX_COLOR_STR.test(str)) {
            let ret = { r: 0, g: 0, b: 0, a: 0 };
            let strPure = str.replace("#", "");
            if (strPure.length === 3) {
                // to 6
                strPure = strPure.split("").map(item => `${item}${item}`).join();
            }
            else if (strPure.length === 4) {
                // to 8
                strPure = strPure.split("").map(item => `${item}${item}`).join();
            }
            else if (strPure.length !== 6 && strPure.length !== 8) {
                if (strPure.length <= 6) {
                    strPure = strPure + new Array(6 - strPure.length).fill("0").join("");
                }
                else {
                    // 这**绝对是来捣乱的
                    return undefined;
                }
            }
            ret.r = parseInt(strPure.slice(0, 2), 16);
            ret.g = parseInt(strPure.slice(2, 4), 16);
            ret.b = parseInt(strPure.slice(4, 6), 16);
            ret.a = parseInt(strPure.slice(6, 8), 16);
            if (Number.isNaN(ret.a))
                ret.a = undefined;
            return ret;
        }
        else {
            return undefined;
        }
    }
    /**
     * 尝试捕获 mw 配置颜色字符串.
     * @param {string} str
     * @returns {IColor | undefined}
     */
    tryCatchMwArray(str) {
        this.REGEX_MW_ARRAY_COLOR_STR.lastIndex = 0;
        if (this.REGEX_MW_ARRAY_COLOR_STR.test(str)) {
            let elements = str.split("|").map(item => Number(item)).filter(item => !isNaN(item));
            if (elements.length < 3) {
                return undefined;
            }
            return { r: elements[0], g: elements[1], b: elements[2], a: elements[3] };
        }
        else {
            return undefined;
        }
    }
    colorLikeToMwColor(colorLike) {
        if (colorLike.r > 1 || colorLike.g > 1 || colorLike.b > 1 || (colorLike.a ?? 0) > 1) {
            return new mw.LinearColor(colorLike.r / 255, colorLike.g / 255, colorLike.b / 255, colorLike?.a / 255 ?? 1);
        }
        return new mw.LinearColor(colorLike.r, colorLike.g, colorLike.b, colorLike?.a ?? 1);
    }
    /**
     * return a vector whose value is vec + v.
     * @param {V} vec
     * @param {number | V} v
     * @param {V} outer return new vector when undefined.
     * @return {V}
     */
    vectorAdd(vec, v, outer = undefined) {
        if (!outer) {
            outer = vec.clone();
        }
        if (this.isNumber(v)) {
            outer.x += v;
            outer.y += v;
            if ("z" in outer)
                outer.z += v;
            if ("w" in outer)
                outer.w += v;
        }
        else
            outer.add(v);
        return outer;
    }
    /**
     * return a vector whose value is vec - v.
     * @param {V} vec
     * @param {number | V} v
     * @param {V} outer return new vector when undefined.
     * @return {V}
     */
    vectorSub(vec, v, outer = undefined) {
        if (!outer) {
            outer = vec.clone();
        }
        if (this.isNumber(v)) {
            outer.x -= v;
            outer.y -= v;
            if ("z" in outer)
                outer.z -= v;
            if ("w" in outer)
                outer.w -= v;
        }
        else
            outer.subtract(v);
        return outer;
    }
    /**
     *
     * return a vector whose value is vec * v.
     * @param {V} vec
     * @param {number | V} v
     * @param {V} outer return new vector when undefined.
     * @return {V}
     */
    vectorMul(vec, v, outer = undefined) {
        if (!outer) {
            outer = vec.clone();
        }
        if (this.isNumber(v)) {
            outer.x *= v;
            outer.y *= v;
            if ("z" in outer)
                outer.z *= v;
            if ("w" in outer)
                outer.w *= v;
        }
        else
            outer.multiply(v);
        return outer;
    }
    /**
     *
     * return a vector whose value is vec / v.
     * @param {V} vec
     * @param {number | V} v
     * @param {V} outer return new vector when undefined.
     * @return {V}
     */
    vectorDiv(vec, v, outer = undefined) {
        if (!outer) {
            outer = vec.clone();
        }
        if (this.isNumber(v)) {
            outer.x /= v;
            outer.y /= v;
            if ("z" in outer)
                outer.z /= v;
            if ("w" in outer)
                outer.w /= v;
        }
        else
            outer.divide(v);
        return outer;
    }
    /**
     * clone a new vector with a new x.
     * @param vec origin vector.
     * @param val new value.
     */
    newWithX(vec, val) {
        if (vec instanceof mw.Vector) {
            return new mw.Vector(val, vec.y, vec.z);
        }
        else if (vec instanceof mw.Rotation) {
            return new mw.Rotation(val, vec.y, vec.z);
        }
        else if (vec instanceof mw.Vector2) {
            return new mw.Vector2(val, vec.y);
        }
    }
    /**
     * clone a new vector with a new y.
     * @param vec origin vector.
     * @param val new value.
     */
    newWithY(vec, val) {
        if (vec instanceof mw.Vector) {
            return new mw.Vector(vec.x, val, vec.z);
        }
        else if (vec instanceof mw.Rotation) {
            return new mw.Rotation(vec.x, val, vec.z);
        }
        else if (vec instanceof mw.Vector2) {
            return new mw.Vector2(vec.x, val);
        }
    }
    /**
     * clone a new vector with a new z.
     * @param vec origin vector.
     * @param val new value.
     */
    newWithZ(vec, val) {
        if (vec instanceof mw.Vector) {
            return new mw.Vector(vec.x, vec.y, val);
        }
        else if (vec instanceof mw.Rotation) {
            return new mw.Rotation(vec.x, vec.y, val);
        }
    }
    /**
     * 计算向量 a 至 b 之间的四元数.
     * @param lhs
     * @param rhs
     * @param fallbackAxis 回退轴. 当 lhs 与 rhs 共线时使用.
     */
    quaternionBetweenVector(lhs, rhs, fallbackAxis = undefined) {
        if (this.equal(lhs, rhs, GToolkit.SIMPLE_EPSILON)) {
            return mw.Quaternion.identity;
        }
        let axis = mw.Vector.cross(lhs, rhs);
        if (Math.abs(axis.length) < GToolkit.SIMPLE_EPSILON) {
            if (fallbackAxis !== undefined) {
                if (mw.Vector.dot(fallbackAxis, lhs) !== 0) {
                    axis = fallbackAxis;
                }
                else {
                    console.warn("fallback Axis is not valid.");
                }
            }
            if (axis.length === 0) {
                axis = mw.Vector.cross(lhs, mw.Vector.right);
            }
            if (axis.length === 0) {
                axis = mw.Vector.cross(lhs, mw.Vector.up);
            }
        }
        const angle = mw.Vector.angle3D(lhs, rhs);
        return mw.Quaternion.fromAxisAngle(axis.normalized, this.radius(angle));
    }
    /**
     * //TODO_LviatYi [待补完]
     * 等值判断.
     * @param lhs
     * @param rhs
     * @param epsilon 精度误差.
     * @alpha
     */
    equal(lhs, rhs, epsilon = GtkTypes.Epsilon.Normal) {
        if (this.isNumber(lhs)) {
            return Math.abs(lhs - rhs) < epsilon;
        }
        if (lhs instanceof mw.Vector && rhs instanceof mw.Vector) {
            if (typeof epsilon === "number") {
                return this.equal(lhs.x, rhs.x, epsilon) &&
                    this.equal(lhs.y, rhs.y, epsilon) &&
                    this.equal(lhs.z, rhs.z, epsilon);
            }
            else if (epsilon instanceof mw.Vector) {
                return this.equal(lhs.x, rhs.x, epsilon.x) &&
                    this.equal(lhs.y, rhs.y, epsilon.y) &&
                    this.equal(lhs.z, rhs.z, epsilon.z);
            }
        }
        return false;
    }
    /**
     * Manhattan Distance.
     * 曼哈顿距离.
     * 当 b 为 null 时 将 a 视为向量. 并计算其长度平方.
     */
    manhattanDistance(a, b = null) {
        let result = 0;
        if (a instanceof Array) {
            if (b && a.length !== b.length)
                return result;
            for (let i = 0; i < a.length; i++) {
                result += Math.abs(a[i] - (b ? b[i] : 0));
            }
            return result;
        }
        else {
            result = Math.abs(a.x - (b ? b.x : 0)) +
                Math.abs(a.y - (b ? b.y : 0));
            if ("z" in a) {
                result += Math.abs(a.z - (b ? b.z : 0));
            }
            return result;
        }
    }
    /**
     * Squared Euclid Distance.
     * 两点欧几里得距离的平方.
     * 当 b 为 null 时 将 a 视为向量. 并计算其长度平方.
     * @param a
     * @param b
     */
    squaredEuclideanDistance(a, b = null) {
        let result = 0;
        if (a instanceof Array) {
            if (b && a.length !== b.length)
                return result;
            for (let i = 0; i < a.length; i++) {
                result += Math.pow(a[i] - (b ? b[i] : 0), 2);
            }
            return result;
        }
        else {
            result = Math.pow(a.x - (b ? b.x : 0), 2) +
                Math.pow(a.y - (b ? b.y : 0), 2);
            if ("z" in a) {
                result += Math.pow(a.z - (b ? b.z : 0), 2);
            }
            return result;
        }
    }
    /**
     * Euclid Distance.
     * 欧几里得距离.
     * 当 b 为 null 时 将 a 视为向量. 并计算其长度.
     * @param a
     * @param b
     */
    euclideanDistance(a, b = null) {
        return Math.sqrt(this.squaredEuclideanDistance(a, b));
    }
    /**
     * 将 origin 向量围绕 axis 轴旋转 angle 角度.
     * @param origin 初始向量.
     * @param axis
     * @param angle
     */
    rotateVector(origin, axis, angle) {
        const quaternion = mw.Quaternion.fromAxisAngle(axis.normalized, this.radius(angle));
        return quaternion.toRotation().rotateVector(origin);
    }
    /**
     * 屏幕坐标系 转 UI 坐标系.
     * @param location
     * @param parent=undefined 指定的父级 Widget.
     *      - undefined 使用 UIService.canvas 作为父级.
     *      - 全无效时使用 zero.
     */
    screenToUI(location, parent) {
        return location
            .clone()
            .subtract(parent
            ?.cachedGeometry
            ?.getAbsolutePosition() ??
            UIService?.canvas
                ?.cachedGeometry
                ?.getAbsolutePosition() ??
            mw.Vector2.zero)
            .divide(mw.getViewportScale());
    }
    /**
     * 泛型获取 GameObject.
     * @param guid
     */
    getGameObjectByGuid(guid) {
        return (mw.GameObject.findGameObjectById(guid) ?? null);
    }
    /**
     * 获取 GameObject 及其子 GameObject 下的所有指定脚本.
     * @param object
     * @param scriptCls
     * @param traverse 遍历深度. 从 1 计数.
     *      0 default. 无限遍历.
     */
    getComponent(object, scriptCls, traverse = 0) {
        if (!object)
            return [];
        const result = [];
        let traversed = 0;
        let stack = [object];
        let cache = [];
        do {
            for (const go of stack) {
                cache.push(...go.getChildren());
                result.push(...go.getComponents(scriptCls));
            }
            stack = cache;
            cache = [];
            ++traversed;
        } while (stack.length > 0 && (traverse === 0 || (traversed < traverse)));
        return result;
    }
    /**
     * 获取 GameObject 及其子 GameObject 下的首个指定脚本.
     * @param object
     * @param scriptCls
     * @param traverse 遍历深度. 从 1 计数.
     *      0 default. 无限遍历.
     */
    getFirstComponent(object, scriptCls, traverse = 0) {
        if (!object)
            return null;
        let traversed = 0;
        let stack = [object];
        let cache = [];
        do {
            for (const go of stack) {
                cache.push(...go.getChildren());
                const script = go.getComponent(scriptCls);
                if (script)
                    return script;
            }
            stack = cache;
            cache = [];
            ++traversed;
        } while (stack.length > 0 && (traverse === 0 || (traversed < traverse)));
        return null;
    }
    /**
     * 获取 GameObject 及其子 GameObject 下的所有指定脚本.
     * @param object
     * @param method
     * @param traverse 遍历深度. 从 1 计数.
     *      0 default. 无限遍历.
     */
    getComponentIs(object, method, traverse = 0) {
        if (!object)
            return [];
        const result = [];
        let traversed = 0;
        let stack = [object];
        let cache = [];
        do {
            for (const go of stack) {
                cache.push(...go.getChildren());
                result.push(...go.getComponents()
                    .filter(script => this.is(script, method))
                    .map((value) => value));
            }
            stack = cache;
            cache = [];
            ++traversed;
        } while (stack.length > 0 && (traverse === 0 || (traversed < traverse)));
        return result;
    }
    /**
     * 获取 GameObject 及其子 GameObject 下的首个指定脚本.
     * @param object
     * @param method
     * @param traverse 遍历深度. 从 1 计数.
     *      0 default. 无限遍历.
     */
    getFirstComponentIs(object, method, traverse = 0) {
        if (!object)
            return null;
        let traversed = 0;
        let stack = [object];
        let cache = [];
        do {
            for (const go of stack) {
                cache.push(...go.getChildren());
                const script = go.getComponents().find((s) => {
                    return this.is(s, method);
                });
                if (script)
                    return script;
            }
            stack = cache;
            cache = [];
            ++traversed;
        } while (stack.length > 0 && (traverse === 0 || (traversed < traverse)));
        return null;
    }
    /**
     * 获取 GameObject 及其子 GameObject 下的所有同名 GameObject.
     * @param object
     * @param name
     */
    getGameObject(object, name) {
        if (!object)
            return [];
        const result = [];
        let p = object;
        let stack = [p];
        while (stack.length > 0) {
            p = stack.shift();
            stack.push(...p.getChildren());
            result.push(...p.getChildren()
                .filter(g => g.name === name));
        }
        return result;
    }
    /**
     * 获取 GameObject 及其子 GameObject 下的首个同名 GameObject.
     * @param object
     * @param name
     */
    getFirstGameObject(object, name) {
        if (!object)
            return null;
        let p = object;
        let stack = [p];
        while (stack.length > 0) {
            p = stack.shift();
            stack.push(...p.getChildren());
            const result = p.getChildren().find((g) => {
                return g.name === name;
            });
            if (result)
                return result;
        }
        return null;
    }
    /**
     * 获取 GameObject 指定层数的所有子 GameObject.
     * @param object
     * @param traverse 遍历深度. 从 1 计数.
     *      - default undefined.
     *      - null 或 undefined 无限遍历.
     */
    getChildren(object, traverse = undefined) {
        if (!object)
            return [];
        let result = [...object.getChildren()];
        let p = 0;
        let traversed = 1;
        while (p < result.length && (this.isNullOrUndefined(traverse) || traversed < traverse)) {
            const currLength = result.length;
            for (; p < currLength; ++p) {
                result.push(...result[p].getChildren());
            }
            ++traversed;
        }
        return result;
    }
    /**
     * 获取场景中的根 GameObject.
     */
    getRootGameObject() {
        if (this._rootObj)
            return this._rootObj;
        this._rootObj = mw.GameObject.findGameObjectById(this.ROOT_GAME_OBJECT_GUID);
        if (!this._rootObj)
            this._rootObj = mw.GameObject.findGameObjectById(this.ROOT_GAME_OBJECT_GUID_BACKUP);
        if (!this._rootObj)
            this._rootObj = mw.GameObject.findGameObjectsByTag(this.ROOT_GAME_OBJECT_TAG_CUSTOM)[0];
        return this._rootObj;
    }
    /**
     * 在场景中的根 GameObject 上挂载脚本.
     */
    addRootScript(scriptCls) {
        let root = this.getRootGameObject();
        if (!root)
            root = mw.GameObject.spawn("Anchor", {
                replicates: false,
            });
        return root?.addComponent(scriptCls) ?? undefined;
    }
    /**
     * 在场景中的根 GameObject 上获取脚本.
     * @param {Constructor<T>} scriptCls
     * @return {T | null}
     */
    getRootScript(scriptCls) {
        return this.getRootGameObject()?.getComponent(scriptCls) ?? null;
    }
    /**
     * 在场景中的根 GameObject 上获取所有脚本.
     * @param {Constructor<T>} scriptCls
     * @return {T[] | null}
     */
    getRootScripts(scriptCls) {
        return this.getRootGameObject()?.getComponents(scriptCls) ?? null;
    }
    /**
     * 角色 性别.
     */
    gender(character) {
        let type = character.getDescription()
            .advance
            .base
            .characterSetting.somatotype;
        if (type === mw.SomatotypeV2.AnimeMale ||
            type === mw.SomatotypeV2.LowpolyAdultMale ||
            type === mw.SomatotypeV2.RealisticAdultMale ||
            type === mw.SomatotypeV2.CartoonyMale) {
            return GtkTypes.GenderTypes.Male;
        }
        else if (type === mw.SomatotypeV2.AnimeFemale ||
            type === mw.SomatotypeV2.LowpolyAdultFemale ||
            type === mw.SomatotypeV2.RealisticAdultFemale ||
            type === mw.SomatotypeV2.CartoonyFemale) {
            return GtkTypes.GenderTypes.Female;
        }
        else {
            return GtkTypes.GenderTypes.Helicopter;
        }
    }
    /**
     * GameObject 是否为 Character.
     * @param obj
     */
    isCharacter(obj) {
        return (obj instanceof mw.Character) && obj.player !== null;
    }
    /**
     * 是否 playerId gameObjectId 或 obj 指向自己.
     * @scope 仅客户端.
     * @param idOrObj
     */
    isSelfCharacter(idOrObj) {
        if (!SystemUtil.isClient()) {
            return false;
        }
        const self = Player.localPlayer;
        if (typeof idOrObj === "number") {
            return self.playerId === idOrObj;
        }
        else if (typeof idOrObj === "string") {
            return self.character.gameObjectId === idOrObj;
        }
        else {
            return this.isCharacter(idOrObj) && idOrObj.player === self;
        }
    }
    /**
     * playerId userId 与 player 归一化 player.
     * @param player
     */
    queryPlayer(player) {
        if (typeof player === "number" || typeof player === "string") {
            return Player.getPlayer(player);
        }
        return player;
    }
    /**
     * 获取角色胶囊体 下圆心坐标.
     * @param character
     */
    getCharacterCapsuleLowerCenter(character) {
        return character.worldTransform.position.add(this.getCharacterCapsuleLowerCenterRelative(character));
    }
    /**
     * 获取角色胶囊体 下圆心相对坐标.
     * @param character
     */
    getCharacterCapsuleLowerCenterRelative(character) {
        let pVec = this.getCharacterCapsuleLowerCenterVector(character).multiply(character.worldTransform.scale.z);
        pVec = character.localTransform.rotation.rotateVector(pVec);
        return pVec;
    }
    /**
     * 获取角色胶囊体 下圆心 相对于角色位置 向量.
     * 主管的 不受角色属性影响.
     * @param character
     */
    getCharacterCapsuleLowerCenterVector(character) {
        const rectHalfHeight = character.collisionExtent.z - character.collisionExtent.x;
        return mw.Vector.down.multiply(rectHalfHeight);
    }
    /**
     * 获取角色胶囊体 底部点.
     * @param character
     */
    getCharacterCapsuleBottomPoint(character) {
        let pVec = mw.Vector.down.multiply(character.collisionExtent.z * character.worldTransform.scale.z);
        pVec = character.localTransform.rotation.rotateVector(pVec);
        return character.worldTransform.position.add(pVec);
    }
    /**
     * 获取角色胶囊体 底部点.
     * @param character
     */
    getCharacterCapsuleBottomPointRelative(character) {
        let pVec = mw.Vector.down.multiply(character.collisionExtent.z * character.worldTransform.scale.z);
        pVec = character.localTransform.rotation.rotateVector(pVec);
        return pVec;
    }
    /**
     * 安全设置 Character Description.
     * @param character
     * @param description
     * @return set interval character state.
     */
    safeSetDescription(character, description) {
        if (!character || this.isNullOrEmpty(character?.gameObjectId))
            return false;
        if (this._characterDescriptionLockers.has(character.gameObjectId))
            return false;
        this._characterDescriptionLockers.add(character.gameObjectId);
        character
            .asyncReady()
            .then(() => {
            this.doWhenTrue(() => character.isDescriptionReady, () => {
                character.setDescription([description]);
                this._characterDescriptionLockers.delete(character.gameObjectId);
            });
        });
        return true;
    }
    /**
     * 设置 Button Guid.
     * 默认将 normalImageGuid 传播至:
     *   normalImageGuid
     *   pressedImageGuid
     *   disableImageGuid
     * @param button
     * @param normalGuid
     * @param pressedGuid
     * @param disableGuid
     */
    setButtonGuid(button, normalGuid, pressedGuid = undefined, disableGuid = undefined) {
        if (!pressedGuid) {
            pressedGuid = normalGuid;
        }
        if (!disableGuid) {
            disableGuid = normalGuid;
        }
        button.normalImageGuid = normalGuid;
        button.pressedImageGuid = pressedGuid;
        button.disableImageGuid = disableGuid;
    }
    /**
     * 尝试设置 UI 可见性.
     * 当不需改变时不设置.
     *
     * @param ui
     * @param visibility
     *  当为 boolean 时 将按照常用策略将 true 映射为 {@link mw.SlateVisibility.Visible} 或 {@link mw.SlateVisibility.SelfHitTestInvisible}.
     * @param syncEnable 是否同步设置 enable.
     *      true default. 当 ui 为 {@link mw.Button} 或 {@link mw.StaleButton} 时 将根据 visibility 同步设置 enable.
     * @return 返回是否发生实际更改.
     */
    trySetVisibility(ui, visibility, syncEnable = true) {
        ui = ui instanceof mw.Widget ? ui : ui.uiObject;
        if (typeof visibility === "boolean") {
            if (ui instanceof mw.Button || ui instanceof mw.StaleButton) {
                visibility = visibility ? mw.SlateVisibility.Visible : mw.SlateVisibility.Hidden;
            }
            else {
                visibility = visibility ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Hidden;
            }
        }
        if (syncEnable && (ui instanceof mw.Button || ui instanceof mw.StaleButton)) {
            ui.enable = visibility === mw.SlateVisibility.Visible;
        }
        if (ui.visibility === visibility) {
            return false;
        }
        ui.visibility = visibility;
        return true;
    }
    /**
     * 尝试设置 UI 文本性.
     * @desc 使用 LviatYi 等提供的 UIScriptHeader_Template. 将提供自动比较.
     * @param {mw.Text} ui
     * @param {string} text
     * @return {boolean}
     */
    trySetText(ui, text) {
        if (ui.text === text)
            return false;
        ui.text = text;
        return true;
    }
    /**
     * 是否 给定平台绝对坐标 在 UI 控件内.
     * @param ui
     * @param position
     */
    isPlatformAbsoluteInWidget(position, ui) {
        const absPos = ui.cachedGeometry.getAbsolutePosition();
        const absSize = ui.cachedGeometry.getAbsoluteSize();
        return position.x >= absPos.x &&
            position.x <= absPos.x + absSize.x &&
            position.y >= absPos.y &&
            position.y <= absPos.y + absSize.y;
    }
    /**
     * 获取 UI 空间下 控件的 计算后坐标.
     * @desc 计算后大小将考虑父子关系的坐标.
     * @param {Widget} ui
     * @return {mw.Vector2}
     */
    getUiResolvedPosition(ui) {
        return absoluteToLocal(UIService.canvas.cachedGeometry, ui.cachedGeometry.getAbsolutePosition());
    }
    /**
     * 获取 UI 空间下 控件的 计算后大小.
     * @desc 计算后大小将考虑父子关系的缩放.
     * @param {Widget} ui
     */
    getUiResolvedSize(ui) {
        return ui
            .cachedGeometry
            .getAbsoluteSize()
            .divide(getViewportScale());
    }
    /**
     * 获取 uiScript 构成的列表中 最上层 uiScript.
     * @desc 仅当
     * @param uis
     */
    getTopUi(uis) {
        if (this.isNullOrEmpty(uis))
            return null;
        let topUi = uis[0];
        if (!(topUi?.uiObject ?? null))
            return null;
        for (let i = 1; i < uis.length; ++i) {
            const ui = uis[i];
            if (!(ui?.uiObject ?? null))
                continue;
            if (ui.layer > topUi.layer ||
                (ui.uiObject["slot"]?.zOrder ?? -1) > (topUi.uiObject["slot"]?.zOrder ?? -1))
                topUi = ui;
        }
        return topUi ?? null;
    }
    compareWidgetStack(lhs, rhs) {
        const root = UIService.canvas;
        let rootLhs;
        let rootRhs;
        let pl = lhs;
        let pr = rhs;
        let lastPl;
        let lastPr;
        while (pl && pr) {
            if (pl === pr) {
                return this.compareSameParentWidgetStack(lastPl, lastPr) *
                    (!rootLhs && !rootRhs ? 1 : -1);
            }
            lastPl = pl;
            lastPr = pr;
            if (pl.parent && pl.parent !== root)
                pl = pl.parent;
            else if (!rootLhs) {
                if (pl.parent !== root)
                    return this.isWidgetAttachOnRoot(pr) ? -1 : 0;
                rootLhs = pl;
                pl = rhs;
            }
            if (pr.parent && pr.parent !== root)
                pr = pr.parent;
            else if (!rootRhs) {
                if (pr.parent !== root)
                    return this.isWidgetAttachOnRoot(pl) ? -1 : 0;
                rootRhs = pr;
                pr = lhs;
            }
            if (rootLhs && rootRhs) {
                // UIService layer manager needed.
                return rootLhs.zOrder - rootRhs.zOrder;
            }
        }
        return 0;
    }
    /**
     * Compare widget stack who has same parent.
     * @param {mw.Widget} lhs
     * @param {mw.Widget} rhs
     * @return {number}
     */
    compareSameParentWidgetStack(lhs, rhs) {
        if (lhs.zOrder !== rhs.zOrder)
            return lhs.zOrder - rhs.zOrder;
        return this.getWidgetIndexInParent(lhs) - this.getWidgetIndexInParent(rhs);
    }
    /**
     * Check if widget is attached on root.
     * 检查是否 Widget 挂在在指定的 root 上
     * @param {mw.Widget} widget
     * @param {mw.Widget} root=undefined
     *      - undefined: 默认指向 {@link UIService.canvas}
     * @return {boolean}
     */
    isWidgetAttachOnRoot(widget, root = undefined) {
        if (!widget)
            return false;
        if (!root)
            root = UIService.canvas;
        let p = widget;
        while (p) {
            if (p === root)
                return true;
            p = p.parent;
        }
        return false;
    }
    /**
     * Get widget index in parent.
     * @param {mw.Widget} widget
     * @return {number}
     *     - -1: widget is not attached on parent.
     */
    getWidgetIndexInParent(widget) {
        if (!widget.parent) {
            return -1;
        }
        return widget.parent["get"]()?.GetChildIndex(widget["get"]()) ?? -1;
    }
    /**
     * 获取 Ui 指定层数的所有子 Ui.
     * @param object
     * @param traverse 遍历深度. 从 1 计数.
     *      - default 1.
     *      - null 或 undefined 无限遍历.
     */
    getUiChildren(object, traverse = 1) {
        if (!object)
            return [];
        let result = [];
        for (let i = 0; i < object.getChildrenCount(); ++i)
            result.push(object.getChildAt(i));
        let p = 0;
        let traversed = 1;
        while (p < result.length && (this.isNullOrUndefined(traverse) || traversed < traverse)) {
            const currLength = result.length;
            for (; p < currLength; ++p) {
                for (let i = 0; i < result[p].getChildrenCount(); ++i)
                    result.push(result[p].getChildAt(i));
            }
            ++traversed;
        }
        return result;
    }
    /**
     * 使用 x,y 而非 Vector2 直接设定 UI 位置.
     * @param {Widget} ui
     * @param {number} x
     * @param {number} y
     */
    setUiPosition(ui, x, y) {
        try {
            ui["get"]()["SetPosition"](x, y);
        }
        catch (e) {
            ui.position = new mw.Vector2(x, y);
        }
    }
    setUiPositionX(ui, x) {
        this.setUiPosition(ui, x, ui.position.y);
    }
    setUiPositionY(ui, y) {
        this.setUiPosition(ui, ui.position.x, y);
    }
    /**
     * 使用 x,y 而非 Vector2 直接设定 UI 大小.
     * @param {Widget} ui
     * @param {number} x
     * @param {number} y
     */
    setUiSize(ui, x, y) {
        try {
            ui["get"]()["SetSize"](x, y);
        }
        catch (_) {
            ui.size = new mw.Vector2(x, y);
        }
    }
    setUiSizeX(ui, x) {
        this.setUiSize(ui, x, ui.size.y);
    }
    setUiSizeY(ui, y) {
        this.setUiSize(ui, ui.size.x, y);
    }
    /**
     * 使用 x,y 而非 Vector2 直接设定 UI 缩放.
     * @param {Widget} ui
     * @param {number} x
     * @param {number} y
     */
    setUiScale(ui, x, y) {
        try {
            if (!ui["_setRenderScale"]) {
                ui["_setRenderScale"] = new mw.Vector2(x, y)["toUEVector2D"]();
            }
            else {
                ui["_setRenderScale"].X = x;
                ui["_setRenderScale"].Y = y;
            }
            ui["w"]["SetRenderScale"](ui["_setRenderScale"]);
        }
        catch (_) {
            ui.renderScale = new mw.Vector2(x, y);
        }
    }
    setUiScaleX(ui, x) {
        this.setUiScale(ui, x, ui.renderScale.y);
    }
    setUiScaleY(ui, y) {
        this.setUiScale(ui, ui.renderScale.x, y);
    }
    /**
     * UI 坐标系下 Viewport 全尺寸.
     * @return {mw.Vector2}
     */
    getUiVirtualFullSize() {
        return getViewportWidgetGeometry()
            ?.getAbsoluteSize()
            ?.divide(getViewportScale());
    }
    /**
     * Viewport 纵横比. x/y.
     * @return {number}
     */
    getViewportRatio() {
        const s = getViewportSize();
        return s.x / s.y;
    }
    /**
     * 获取 窗口失焦回调.
     * @desc WindowUtil.onDefocus 的多次调用将生成多次回调.
     * @return {Delegate.SimpleDelegate<void>}
     */
    getOnWindowsBlurDelegate() {
        if (!this._globalOnlyOnBlurDelegate) {
            this._globalOnlyOnBlurDelegate = new Delegate.SimpleDelegate();
            WindowUtil.onDefocus.add(() => this._globalOnlyOnBlurDelegate.invoke());
        }
        return this._globalOnlyOnBlurDelegate;
    }
    /**
     * 垂直地形侦测.
     * 从起始点创建一条垂直向下的射线 返回命中到任何其他物体的命中点信息.
     * @param startPoint 起始点.
     * @param length 侦测距离.
     * @param self 自身 不参与检测.
     * @param ignoreObjectGuids 忽略物体 Guid.
     * @param debug 是否 绘制调试线.
     * @return hitPoint 命中首个点的命中信息 当未命中时返回 null.
     */
    detectVerticalTerrain(startPoint, length = 1000, self = undefined, ignoreObjectGuids = [], debug = false) {
        return QueryUtil.lineTrace(startPoint, this.newWithZ(startPoint, startPoint.z - length), false, debug, self ? [self.gameObjectId, ...ignoreObjectGuids] : [...ignoreObjectGuids], false, false)[0] ?? undefined;
    }
    /**
     * 垂直地形采样.
     * 从起始平台创建一条垂直向下的射线 返回命中到任何其他物体的命中点位置.
     * @param {IPoint2} startPoint
     * @param {number} platform
     * @param {number} length
     * @param {string[]} ignores
     * @param {boolean} ignoreByType
     * @param {boolean} traceSkeletonOnly
     * @param {mw.GameObject} self
     * @param {boolean} down
     * @param {boolean} debug
     * @return {mw.HitResult[] | undefined}
     */
    sampleVerticalTerrain(startPoint, platform, length, down = true, ignores = undefined, ignoreByType = false, traceSkeletonOnly = false, self = undefined, debug = false) {
        return QueryUtil.lineTrace(new Vector(startPoint.x, startPoint.y, platform), new Vector(startPoint.x, startPoint.y, platform + (down ? (-length) : length)), true, debug, ignores, ignoreByType, traceSkeletonOnly, self) ?? undefined;
    }
    /**
     * 忽略自身的 GameObject 垂直地形侦测.
     * @param self
     * @param length
     * @param ignoreObjectGuids
     * @param debug
     */
    detectGameObjectVerticalTerrain(self, length = 1000, ignoreObjectGuids = [], debug = false) {
        if (!self)
            return null;
        return this.detectVerticalTerrain(self.worldTransform.position, length, self, ignoreObjectGuids, debug);
    }
    /**
     * 角色正下方地形侦测.
     * 从 角色角色胶囊体 下圆心 创建一条垂直向下的射线 返回命中到任何其他物体的命中点信息.
     * @param length 最大探测距离.
     * @param ignoreObjectGuids 忽略物体 Guid.
     * @param debug 是否 绘制调试线.
     * @return hitPoint 命中首个点的命中信息 当未命中时返回 null.
     */
    detectCurrentCharacterTerrain(length = 1000, ignoreObjectGuids = [], debug = false) {
        if (!SystemUtil.isClient()) {
            return null;
        }
        const character = Player.localPlayer.character;
        const result = this.detectVerticalTerrain(this.getCharacterCapsuleLowerCenter(character), length, character, ignoreObjectGuids);
        if (debug && result) {
            this.drawRay(result.position, result.impactNormal, 100);
        }
        return result;
    }
    /**
     * 计算角色在地形上运动时的倾倒角.
     * 返回值为以正交系轴为参考.
     * @param character
     * @param ignoreObjectGuids 忽略物体 Guid.
     * @return [pitch, roll] 旋转角度.
     */
    calCentripetalAngle(character, ignoreObjectGuids = []) {
        const hitInfo = this.detectCurrentCharacterTerrain(undefined, ignoreObjectGuids, false);
        if (hitInfo) {
            const terrainNormal = hitInfo.impactNormal;
            const transform = character.worldTransform;
            const currUnitRight = mw.Vector.projectOnPlane(transform.getRightVector(), mw.Vector.up);
            const currUnitForward = mw.Vector.projectOnPlane(transform.getForwardVector(), mw.Vector.up);
            const currUnitUp = mw.Vector.cross(currUnitForward, currUnitRight);
            const sidePlaneNormal = currUnitRight;
            const frontPlaneNormal = currUnitForward;
            const projSide = mw.Vector.projectOnPlane(terrainNormal, sidePlaneNormal);
            const projFront = mw.Vector.projectOnPlane(terrainNormal, frontPlaneNormal);
            let pitch = mw.Vector.angle3D(currUnitUp, projSide);
            let roll = mw.Vector.angle3D(currUnitUp, projFront);
            pitch *= mw.Vector.angle3D(currUnitForward, projSide) > 90 ? -1 : 1;
            roll *= mw.Vector.angle3D(currUnitRight, projFront) > 90 ? -1 : 1;
            return [pitch, roll];
        }
        else
            return null;
    }
    /**
     * 绘制 Debug 用射线.
     * @param startPoint
     * @param direction
     * @param distance
     */
    drawRay(startPoint, direction, distance = 3000) {
        QueryUtil.lineTrace(startPoint, startPoint.clone().add(direction.clone().normalize().multiply(distance)), true, true);
    }
    /**
     * 是否 两点之间存在合法路径.
     * @param origin
     * @param dest
     */
    hasValidPath(origin, dest) {
        return Navigation.findPath(origin, dest).length > 0;
    }
    /**
     * 查询其他游戏 ModuleData.
     * @param {string} moduleDataName
     * @param {string} userId
     * @param {string} defaultValue
     * @return {Promise<string>}
     */
    async queryModuleData(moduleDataName, userId, defaultValue = {}) {
        const data = await DataStorage.asyncGetData(this.getModuleDataKey(userId, moduleDataName));
        if (data.code !== mw.DataStorageResultCode.Success)
            return Promise.reject(`Query failed. error code: ${data.code}.`);
        if (this.isNullOrUndefined(data.data))
            return defaultValue;
        else
            return data.data;
    }
    /**
     * 更新其他游戏 ModuleData.
     * @param {string} moduleDataName
     * @param {string} userId
     * @param {string} value
     * @return {Promise<boolean>}
     */
    async updateModuleData(moduleDataName, userId, value) {
        const data = await DataStorage.asyncSetData(this.getModuleDataKey(userId, moduleDataName), value);
        if (data !== mw.DataStorageResultCode.Success) {
            console.warn(`update other game module data failed. error code: ${data}`);
            return false;
        }
        return true;
    }
    /**
     * 获取 ModuleData Key.
     * @param {string} userId
     * @param {string} moduleDataName
     * @return {string}
     */
    getModuleDataKey(userId, moduleDataName) {
        return `${userId}_SubData_${moduleDataName}`;
    }
}
//#region Pure Js
//#region Constant
/**
 * 角度限制常数.
 * @private
 */
GToolkit.DEFAULT_ANGLE_CLAMP = [-180, 180];
/**
 * 圆周角.
 * @private
 */
GToolkit.CIRCLE_ANGLE = 360;
/**
 * 简略精度.
 * @private
 */
GToolkit.SIMPLE_EPSILON = 1e-6;
/**
 * 全高清分辨率.
 * @private
 */
GToolkit.FULL_HD = { x: 1920, y: 1080 };
/**
 * 全高清分辨率比例.
 * @private
 */
GToolkit.FULL_HD_RATIO = GToolkit.FULL_HD.x / GToolkit.FULL_HD.y;
/**
 * 1 天 24 小时.
 * @private
 */
GToolkit.HourInDay = 24;
/**
 * 1 小时 60 分钟.
 * @private
 */
GToolkit.MinuteInHour = 60;
/**
 * 1 分钟 60 秒.
 * @private
 */
GToolkit.SecondInMinute = 60;
/**
 * 1 秒 1000 毫秒.
 * @private
 */
GToolkit.MillisecondInSecond = 1e3;
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//#region Types
var GtkTypes;
(function (GtkTypes) {
    (function (TimeFormatDimensionFlags) {
        /**
         * 毫秒.
         */
        TimeFormatDimensionFlags[TimeFormatDimensionFlags["Millisecond"] = 2] = "Millisecond";
        /**
         * 秒.
         */
        TimeFormatDimensionFlags[TimeFormatDimensionFlags["Second"] = 4] = "Second";
        /**
         * 分.
         */
        TimeFormatDimensionFlags[TimeFormatDimensionFlags["Minute"] = 8] = "Minute";
        /**
         * 时.
         */
        TimeFormatDimensionFlags[TimeFormatDimensionFlags["Hour"] = 16] = "Hour";
        /**
         * 日.
         */
        TimeFormatDimensionFlags[TimeFormatDimensionFlags["Day"] = 32] = "Day";
        /**
         * 月.
         */
        TimeFormatDimensionFlags[TimeFormatDimensionFlags["Month"] = 64] = "Month";
        /**
         * 年.
         */
        TimeFormatDimensionFlags[TimeFormatDimensionFlags["Year"] = 128] = "Year";
    })(GtkTypes.TimeFormatDimensionFlags || (GtkTypes.TimeFormatDimensionFlags = {}));
    (function (Tf) {
        /**
         * 毫秒.
         */
        Tf[Tf["Ms"] = 2] = "Ms";
        /**
         * 秒.
         */
        Tf[Tf["S"] = 4] = "S";
        /**
         * 分.
         */
        Tf[Tf["M"] = 8] = "M";
        /**
         * 时.
         */
        Tf[Tf["H"] = 16] = "H";
        /**
         * 日.
         */
        Tf[Tf["D"] = 32] = "D";
        /**
         * 月.
         */
        Tf[Tf["Mon"] = 64] = "Mon";
        /**
         * 年.
         */
        Tf[Tf["Y"] = 128] = "Y";
    })(GtkTypes.Tf || (GtkTypes.Tf = {}));
    (function (GenderTypes) {
        /**
         * 武装直升机.
         */
        GenderTypes[GenderTypes["Helicopter"] = 0] = "Helicopter";
        /**
         * 女性.
         */
        GenderTypes[GenderTypes["Female"] = 1] = "Female";
        /**
         * 男性.
         */
        GenderTypes[GenderTypes["Male"] = 2] = "Male";
    })(GtkTypes.GenderTypes || (GtkTypes.GenderTypes = {}));
    (function (Epsilon) {
        /**
         * 正常.
         * @type {Epsilon.Normal}
         */
        Epsilon[Epsilon["Normal"] = 0.000001] = "Normal";
        /**
         * 低精度.
         * @type {Epsilon.Low}
         */
        Epsilon[Epsilon["Low"] = 0.0001] = "Low";
        /**
         * 高精度.
         * @type {Epsilon.High}
         */
        Epsilon[Epsilon["High"] = 1e-8] = "High";
        /**
         * 超高精度.
         * @type {Epsilon.ExtraHigh}
         */
        Epsilon[Epsilon["ExtraHigh"] = 1e-12] = "ExtraHigh";
        /**
         *
         * @type {Epsilon.Scientific}
         */
        Epsilon[Epsilon["Scientific"] = 1e-16] = "Scientific";
    })(GtkTypes.Epsilon || (GtkTypes.Epsilon = {}));
    (function (Interval) {
        Interval[Interval["None"] = 0] = "None";
        Interval[Interval["Hz144"] = 6.944444444444445] = "Hz144";
        Interval[Interval["Hz120"] = 8.333333333333334] = "Hz120";
        Interval[Interval["Hz90"] = 11.11111111111111] = "Hz90";
        Interval[Interval["Hz60"] = 16.666666666666668] = "Hz60";
        Interval[Interval["Hz30"] = 33.333333333333336] = "Hz30";
        Interval[Interval["Sensitive"] = 100] = "Sensitive";
        Interval[Interval["Fast"] = 500] = "Fast";
        Interval[Interval["PerSec"] = 1000] = "PerSec";
        Interval[Interval["Slow"] = 3000] = "Slow";
        Interval[Interval["Logy"] = 5000] = "Logy";
        Interval[Interval["PerMin"] = 60000] = "PerMin";
        Interval[Interval["PerHour"] = 3600000] = "PerHour";
    })(GtkTypes.Interval || (GtkTypes.Interval = {}));
})(GtkTypes || (GtkTypes = {}));
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//#region Delegate
/**
 * Delegate. 委托.
 * @desc provide some useful delegate.
 * @desc ---
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
var Delegate;
(function (Delegate_1) {
    class DelegateInfo {
        constructor(callback, hitPoint, thisArg) {
            this.callback = callback;
            this.hitPoint = hitPoint;
            this.thisArg = thisArg;
        }
        equal(callback, thisArg) {
            return this.callback === callback &&
                this.thisArg === thisArg;
        }
    }
    class SimpleDelegateInfo extends DelegateInfo {
        constructor(callback, hitPoint, thisArg) {
            super(callback, hitPoint, thisArg);
        }
    }
    class ConditionDelegateInfo extends DelegateInfo {
        constructor(callback, hitPoint, thisArg) {
            super(callback, hitPoint, thisArg);
        }
    }
    class Delegate {
        constructor() {
            this._callbackInfo = [];
        }
        /**
         * try to get the index of an existing delegate.
         * @param func
         * @param thisArg
         * @return index func index. -1 not exist.
         * @protected
         */
        getIndex(func, thisArg) {
            return this._callbackInfo.findIndex(item => {
                return item.equal(func, thisArg);
            });
        }
        /**
         * remove Func by index.
         * @param index
         * @protected
         */
        removeByIndex(index) {
            Gtk.removeByIndex(this._callbackInfo, index);
        }
    }
    /**
     * Simple Delegate.
     * 简单委托.
     *
     * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
     * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
     * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
     * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
     * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
     * @author LviatYi
     * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
     * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
     */
    class SimpleDelegate extends Delegate {
        add(func, alive = -1, repeatable = false, thisArg) {
            if (!repeatable && this.getIndex(func) !== -1) {
                return false;
            }
            this._callbackInfo.push(new SimpleDelegateInfo(func, alive, thisArg));
        }
        once(func, thisArg) {
            return this.add(func, 1, false, thisArg);
        }
        only(func, thisArg) {
            this.clear();
            return this.add(func, undefined, false, thisArg);
        }
        invoke(...param) {
            for (let i = this._callbackInfo.length - 1; i >= 0; --i) {
                const callbackInfo = this._callbackInfo[i];
                try {
                    if (callbackInfo.hitPoint !== 0) {
                        callbackInfo.callback.call(callbackInfo.thisArg, ...param);
                    }
                    if (callbackInfo.hitPoint > 0)
                        --callbackInfo.hitPoint;
                    if (callbackInfo.hitPoint === 0)
                        this.removeByIndex(i);
                }
                catch (e) {
                    console.error(e);
                    console.error(e.stack);
                }
            }
        }
        remove(func, thisArg) {
            const index = this.getIndex(func, thisArg);
            if (index !== -1) {
                this.removeByIndex(index);
                return true;
            }
            return false;
        }
        clear() {
            this._callbackInfo.length = 0;
        }
    }
    Delegate_1.SimpleDelegate = SimpleDelegate;
    /**
     * Condition Delegate
     * 条件委托.
     *
     * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
     * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
     * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
     * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
     * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
     * @author LviatYi
     * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
     * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
     */
    class ConditionDelegate extends Delegate {
        add(func, alive = -1, repeatable = false, thisArg) {
            if (!repeatable && this.getIndex(func, thisArg) !== -1) {
                return false;
            }
            this._callbackInfo.push(new ConditionDelegateInfo(func, alive, thisArg));
        }
        once(func, thisArg) {
            return this.add(func, 1, false, thisArg);
        }
        only(func, thisArg) {
            this.clear();
            return this.add(func, 1, false, thisArg);
        }
        invoke(...param) {
            for (let i = this._callbackInfo.length - 1; i >= 0; --i) {
                const callbackInfo = this._callbackInfo[i];
                let ret;
                if (callbackInfo.hitPoint !== 0) {
                    try {
                        ret = callbackInfo.callback.call(callbackInfo.thisArg, ...param);
                    }
                    catch (e) {
                        ret = false;
                        console.error(e.stack);
                    }
                }
                if (callbackInfo.hitPoint > 0 && ret) {
                    --callbackInfo.hitPoint;
                }
                if (callbackInfo.hitPoint === 0) {
                    this.removeByIndex(i);
                }
            }
        }
        remove(func, thisArg) {
            const index = this.getIndex(func, thisArg);
            if (index !== -1) {
                this.removeByIndex(index);
                return true;
            }
            return false;
        }
        clear() {
            this._callbackInfo.length = 0;
        }
    }
    Delegate_1.ConditionDelegate = ConditionDelegate;
})(Delegate || (Delegate = {}));
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//#region RandomGenerator
/**
 * Random Generator.
 * generate a number array and convert to supported types.
 */
class RandomGenerator {
    constructor() {
        this._result = [];
    }
    toVector3(fill = 0) {
        return new mw.Vector(this._result[0] ?? fill, this._result[1] ?? fill, this._result[2] ?? fill);
    }
    toVector2(fill = 0) {
        return new mw.Vector2(this._result[0] ?? fill, this._result[1] ?? fill);
    }
    toRotation(fill = 0) {
        return new mw.Rotation(this._result[0] ?? fill, this._result[1] ?? fill, this._result[2] ?? fill);
    }
    from(value) {
        this._result = value;
        return this;
    }
    /**
     * generate random array.
     * @param {number | number[]} length length or scale.
     * @param {() => number} randomFunc random function.
     *      - default Math.random
     * @return {this}
     */
    random(length, randomFunc = Math.random) {
        const isLength = typeof length === "number";
        this._result = new Array(isLength ? length : length.length);
        for (let i = 0; i < this._result.length; i++) {
            this._result[i] = randomFunc() * (isLength ? 1 : length[i]);
        }
        return this;
    }
    /**
     * generate random point on unit circle.
     * @return {this}
     */
    randomCircle() {
        let r = Math.random() * Math.PI * 2;
        this._result = [Math.cos(r), Math.sin(r)];
        return this;
    }
    /**
     * handle result by index.
     * @param {(value: number, index: number) => number} handler
     * @return {this}
     */
    handle(handler) {
        for (let i = 0; i < this._result.length; i++) {
            this._result[i] = handler(this._result[i], i);
        }
        return this;
    }
}
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//#region Switcher
/**
 * advance switch.
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
class Switcher {
    constructor() {
        this._cases = [];
        this._callbacks = [];
        this._default = null;
    }
    /**
     * build judge case.
     * @param callback
     * @param values
     *  when value is null or undefined, it will be ignored.
     */
    case(callback, ...values) {
        this._cases.push(values);
        this._callbacks.push(callback);
        return this;
    }
    /**
     * build judge default case.
     * @param callback
     */
    default(callback) {
        this._default = callback;
    }
    /**
     * judge values.
     * @param values
     */
    judge(...values) {
        for (let i = 0; i < this._cases.length; i++) {
            let result = true;
            for (let j = 0; j < values.length; j++) {
                const pole = this._cases[i][j];
                if (pole === null || pole === undefined) {
                    continue;
                }
                result = values[j] === pole;
                if (!result)
                    break;
            }
            if (result) {
                this?._callbacks[i]?.();
                return;
            }
        }
        this?._default();
    }
}
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
//#region Export
const Gtk = new GToolkit();
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

var MathUtils;
(function (MathUtils) {
    /**
     * 贝塞尔曲线
     * @param points 点集合
     * @param t [0,1]
     */
    function bezierCurve(points, t) {
        if (points.length < 2)
            return null;
        if (points.length === 2)
            return mw.Vector.lerp(points[0], points[1], t);
        const newPoints = [];
        for (let i = 0; i < points.length - 1; i++) {
            const point0 = points[i];
            const point1 = points[i + 1];
            newPoints.push(mw.Vector.lerp(point0, point1, t));
        }
        return bezierCurve(newPoints, t);
    }
    MathUtils.bezierCurve = bezierCurve;
    /**
    * 罗德里格旋转 - 罗德里格旋转公式是计算三维空间中，一个向量绕旋转轴旋转给定角度以后得到的新向量的计算公式
    * @param v 一个空间向量
    * @param axis 旋转轴的单位向量
    * @param angle 绕旋转轴旋转角度
    */
    function rodriguesRotation(v, axis, angle) {
        let cos_theta = Math.cos(angle * (Math.PI / 180));
        let sin_theta = Math.sin(angle * (Math.PI / 180));
        let first = v.clone().multiply(cos_theta);
        let second = Vector.cross(v, axis).multiply(sin_theta);
        let thirdly = v.multiply(Vector.dot(v, axis) * (1 - cos_theta));
        return first.add(second).add(thirdly);
    }
    MathUtils.rodriguesRotation = rodriguesRotation;
})(MathUtils || (MathUtils = {}));

var foreign73 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get MathUtils () { return MathUtils; }
});

var ObjectUtils;
(function (ObjectUtils) {
    function isEmpty(obj) {
        if (obj === null || obj === undefined) { // null和undefined
            return true;
        }
        if (typeof obj === 'object' && Object.keys(obj).length === 0) { // 数组和空对象
            return true;
        }
        return false;
    }
    ObjectUtils.isEmpty = isEmpty;
    function deepClone(obj) {
        if (typeof obj !== 'object') {
            return obj;
        }
        let returnObj;
        if (Object.prototype.toString.call(obj) === '[object Array]') { // 数组
            returnObj = [];
            for (const k in obj) {
                returnObj.push(deepClone(obj[k]));
            }
        }
        else if (Object.prototype.toString.call(obj) === '[object Object]') { // 对象
            returnObj = {};
            for (const key in obj) {
                const v = obj[key];
                if (typeof v === 'object') {
                    returnObj[key] = deepClone(v);
                }
                else {
                    returnObj[key] = v;
                }
            }
        }
        return returnObj;
    }
    ObjectUtils.deepClone = deepClone;
})(ObjectUtils || (ObjectUtils = {}));

var foreign74 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get ObjectUtils () { return ObjectUtils; }
});

const MWModuleMap = { 
     'E9CADEFE451EB4AF6D597B890C615A87': foreign2,
     '5104D5F34D1660B1AD79E28B46D5BE0D': foreign3,
     '0AA83AED4674220E97FF7F9607EF65AE': foreign4,
     '2EF0B38A4BB58AA96C648399CC9B7E6E': foreign8,
     '0976AD324D31865C57D818817FFFBBD1': foreign9,
     'FEB907CC49F2AF1FA97E3CBB6B6262E0': foreign11,
     '63E6D612461087D7C6AEE790DBD1DA64': foreign12,
     '48B02BAD40598B70918700A1C3134577': foreign13,
     '34711C8349F8FDF084BFB8BD8D2C19BE': foreign14,
     '81C6DB5641AFB520FE0C52969A8FF4AA': foreign15,
     'FA5B9B38445AB3481FEA3E9985A82106': foreign16,
     'AD0552654B17832C55004A8A561D4669': foreign17,
     '4E2745A64BE75DF9922D17B9E8FA17BB': foreign18,
     '67F6796F416D2D9BDD7E4A824DBAFAB8': foreign19,
     'C5925AE44BA81630402594B59540F7AB': foreign20,
     '25AF6EA14261B111C8DEF090F0EC69AE': foreign21,
     'DC96986C444B9886BD12DD915251AF97': foreign22,
     '6E8BE64F4D977B96C4760684AFBF112C': foreign23,
     '0CD02B7C416F11827D24259B55E8DB55': foreign24,
     'CBF73C5C486FDBCFE2AC8BA81BA429F5': foreign25,
     'B71EC430413F9D29E633AD86790737CB': foreign26,
     '3BBAFC6743AF65B4E23B2F88407F0839': foreign27,
     '9A67D5B949AFDB24AFDDD9A8F4FD3548': foreign28,
     '84644D3B4E4259B76E6ED787FECD35D5': foreign30,
     'ABFCF7B84598FB47AC338CB8DD32BA6F': foreign31,
     'B64A4B44404D0BBBABDF22A4E42701A4': foreign33,
     '281CFCB04C88B6C2DA5BE1B531C2A645': foreign34,
     'E6BBBED547F3EFC6970425BE0DE892C4': foreign35,
     '839F98184FFF5EAC3BB1B2B849282AE2': foreign36,
     '4FB33EE34D691313243F0CBD0A380072': foreign37,
     '2D52579A49D2F4A516444F8B8A7487CC': foreign38,
     '96E891A944B8B5908A3F85A9818BDFBE': foreign39,
     'E87767ED4E231E76E22EE9ADBEDC9FCF': foreign40,
     'C8768228421691520F228BB88AAB47B0': foreign41,
     'F7989606405446EB442718B69379FE32': foreign42,
     'A1BA4C604897BB06EFD2DC9816C8F0AA': foreign43,
     'E566CF6D4F01FA95D5D25DBDA1997D21': foreign44,
     'AE6A030A406B4767A1B10F84062D00DC': foreign45,
     '47D8BA6D45EBBD7C943FD5AA3F899808': foreign46,
     'AD4EA7074928B4DE9D14DFBD7806B139': foreign47,
     '59AE929746BC9BED2A0DA6B324B440B6': foreign48,
     '201DA8744078BBA3698D49965A113D34': foreign49,
     '037C3DDC49CF4884EBEEE1BD8B6EDF59': foreign50,
     '95F92AAF412DE59F405E3AB23B2B0E26': foreign51,
     '527BEC0849ACA43F2602B08BD5634B16': foreign52,
     '318753C04E7A9FCB8EF632940F084EBF': foreign53,
     'E8DC69784569F21AECF2C38FE1378707': foreign54,
     'A4ECB5E24F2466662F8E7D98C05498E9': foreign55,
     'F8259D06412648FB29ACFB9858938830': foreign56,
     '05205C62451ACEB416932B88BD25D5EE': foreign57,
     'A3E9BD3D4946101EA4EEA69D5119ECCA': foreign58,
     'B742EB97455EBAAFF517799487C2FA54': foreign59,
     '66A3CE0C488E62854EF61F9732CA7E5A': foreign60,
     'A0FF722143DF80991FD2D3A87F202B36': foreign62,
     '0B8133D94F7C6E54E0E6979017747C12': foreign64,
     '239D6A7942158398D1B3AD9E04D3460B': foreign65,
     'C02FAB9A48345040FD4255A5B712320A': foreign68,
     '7622A09C412720A04A9D4DAACFAC562D': foreign69,
     'CA6A60D9441116F6464435A942927C51': foreign70,
     'B069F00545F0897604FF3E9CCB7E910A': foreign71,
     '057D04144159761E8B9503A14A329678': foreign73,
     '7E030AB04463652F1E563DAE0C42D8A1': foreign74,
     'F7E0F21440A07E1D5069C8A5DAF3FD24': foreign75,
     '2E73635545C41EC408AD8DB473377711': foreign76,
     '6EF336B44B3C9C742D2B2DA13C1DF6BC': foreign77,
};
const MWFileMapping = new WeakMap([[foreign2 || {}, "JavaScripts/depends/event/EventDispatcher"],
[foreign3 || {}, "JavaScripts/depends/event/Handler"],
[foreign4 || {}, "JavaScripts/depends/generator/PoissonDiskSampling"],
[foreign8 || {}, "JavaScripts/depends/singleton/Singleton"],
[foreign9 || {}, "JavaScripts/depends/struct/Hash"],
[foreign11 || {}, "JavaScripts/gameplay/ai/Blackboard"],
[foreign12 || {}, "JavaScripts/gameplay/ai/framework/bt"],
[foreign13 || {}, "JavaScripts/gameplay/ai/framework/fsm"],
[foreign14 || {}, "JavaScripts/gameplay/ai/framework/goap"],
[foreign15 || {}, "JavaScripts/gameplay/ai/framework/hfsm"],
[foreign16 || {}, "JavaScripts/gameplay/ai/framework/us"],
[foreign17 || {}, "JavaScripts/gameplay/fighting/Ability"],
[foreign18 || {}, "JavaScripts/gameplay/fighting/Buff"],
[foreign19 || {}, "JavaScripts/gameplay/fighting/Effect"],
[foreign20 || {}, "JavaScripts/gameplay/fighting/Movement"],
[foreign21 || {}, "JavaScripts/gameplay/fighting/Projectile"],
[foreign22 || {}, "JavaScripts/language/i18n"],
[foreign23 || {}, "JavaScripts/Main"],
[foreign24 || {}, "JavaScripts/modules/global-rank/GlobalRankData"],
[foreign25 || {}, "JavaScripts/modules/global-rank/GlobalRankModule"],
[foreign26 || {}, "JavaScripts/modules/global-rank/GlobalRankModuleC"],
[foreign27 || {}, "JavaScripts/modules/global-rank/GlobalRankModuleS"],
[foreign28 || {}, "JavaScripts/modules/ModuleService"],
[foreign30 || {}, "JavaScripts/replicated/BodyClasses"],
[foreign31 || {}, "JavaScripts/replicated/comp/character/AnimationComp"],
[foreign33 || {}, "JavaScripts/replicated/comp/character/ApperanceComp"],
[foreign34 || {}, "JavaScripts/replicated/comp/character/CharacterBaseComp"],
[foreign35 || {}, "JavaScripts/ui-generate/BasicUI/BigItem1_BasicUI_generate"],
[foreign36 || {}, "JavaScripts/ui-generate/BasicUI/BigItem2_BasicUI_generate"],
[foreign37 || {}, "JavaScripts/ui-generate/BasicUI/BigItem3_BasicUI_generate"],
[foreign38 || {}, "JavaScripts/ui-generate/BasicUI/CreateRole_BasicUI_generate"],
[foreign39 || {}, "JavaScripts/ui-generate/BasicUI/Purchase1_BasicUI_generate"],
[foreign40 || {}, "JavaScripts/ui-generate/BasicUI/Purchase2_BasicUI_generate"],
[foreign41 || {}, "JavaScripts/ui-generate/BasicUI/Purchase3_BasicUI_generate"],
[foreign42 || {}, "JavaScripts/ui-generate/BasicUI/Rankings_BasicUI_generate"],
[foreign43 || {}, "JavaScripts/ui-generate/BasicUI/Resource_BasicUI_generate"],
[foreign44 || {}, "JavaScripts/ui-generate/BasicUI/Settings_BasicUI_generate"],
[foreign45 || {}, "JavaScripts/ui-generate/BasicUI/Shop1_BasicUI_generate"],
[foreign46 || {}, "JavaScripts/ui-generate/BasicUI/Shop2_BasicUI_generate"],
[foreign47 || {}, "JavaScripts/ui-generate/BasicUI/SmallItem1_BasicUI_generate"],
[foreign48 || {}, "JavaScripts/ui-generate/BasicUI/SmallItem2_BasicUI_generate"],
[foreign49 || {}, "JavaScripts/ui-generate/BasicUI/SmallItem3_BasicUI_generate"],
[foreign50 || {}, "JavaScripts/ui-generate/BasicUI/Window_BasicUI_generate"],
[foreign51 || {}, "JavaScripts/ui-generate/common/CommonTips_generate"],
[foreign52 || {}, "JavaScripts/ui-generate/common/MainUI_generate"],
[foreign53 || {}, "JavaScripts/ui-generate/common/ScalerText_generate"],
[foreign54 || {}, "JavaScripts/ui-generate/common/SettingUI_generate"],
[foreign55 || {}, "JavaScripts/ui-generate/DefaultUI_generate"],
[foreign56 || {}, "JavaScripts/ui-generate/skill/AbilityRelease_generate"],
[foreign57 || {}, "JavaScripts/ui/bag/BagItem"],
[foreign58 || {}, "JavaScripts/ui/base/UIBase"],
[foreign59 || {}, "JavaScripts/ui/base/UIConfig"],
[foreign60 || {}, "JavaScripts/ui/base/UIManager"],
[foreign62 || {}, "JavaScripts/ui/common/list/ScrollerView"],
[foreign64 || {}, "JavaScripts/ui/common/tips/CommonTips"],
[foreign65 || {}, "JavaScripts/ui/common/tips/ScalerText"],
[foreign68 || {}, "JavaScripts/ui/skill/AbilityReleaseUI"],
[foreign69 || {}, "JavaScripts/utils/CharacterUtils"],
[foreign70 || {}, "JavaScripts/utils/FormatUtils"],
[foreign71 || {}, "JavaScripts/utils/IAPUtils"],
[foreign73 || {}, "JavaScripts/utils/MathUtils"],
[foreign74 || {}, "JavaScripts/utils/ObjectUtils"],
[foreign75 || {}, "JavaScripts/utils/RandomUtils"],
[foreign76 || {}, "JavaScripts/utils/TempUtils"],
[foreign77 || {}, "JavaScripts/utils/UIUtils"]]);

exports.MWFileMapping = MWFileMapping;
exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=game.js.map
