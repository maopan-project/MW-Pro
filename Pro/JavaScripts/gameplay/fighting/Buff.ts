
export namespace Buff {
    export class BuffContainer {
        /**正在运行的buff */
        private _buffs: Map<BuffType, BaseBuff> = new Map();

        constructor() {
            // 初始化buff-prototype
        }

        /**
         * 是否 存在同类型 Buff.
         * @param type buff类型
         */
        public hasBuff(type: BuffType) {
            return this._buffs.has(type);
        }

        /**
         * 获取 指定类型 Buff.
         * @param type buff类型
         */
        public getBuff(type: BuffType) {
            return this._buffs.get(type);
        }

        /**
         * 添加Buff到容器
         * @param buff Buff实列
         */
        public addBuff(buff: BaseBuff) {
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
        public removeBuff(type: BuffType) {
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
        public destroy() {
            for (const type of this._buffs.keys()) {
                this.removeBuff(type);
            }
        }

        /**
         * 更新buff
         * @param dt 时间间隔 
         */
        public update(dt: number) {
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

        /**buff缓存池 */
        private _buffPool: Map<BuffType, BaseBuff[]> = new Map();

        /**
         * 创建buff实体
         * @param cls buff类 
         * @returns buff实体
         */
        public createBuff<T extends BaseBuff>(cls: { prototype: T, new(): T }): T {
            let buff: BaseBuff;
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
            return buff as T;
        }

        /**
         * 回收buff实体
         * @param buff Buff实体
         */
        private recoverBuff(buff: BaseBuff) {
            if (this._buffPool.has(buff.buffType)) {
                let buffs = this._buffPool.get(buff.buffType);
                buffs.push(buff);
                buff.onBuffDestroy();
            }
        }

    }

    export enum BuffType {
        BUFF_10001,
    }

    export enum BuffTag {// 二进制
        METAL = 1 << 1, //（金系）
        WOOD = 1 << 2, //（木系）
        WATER = 1 << 3, //（水系）
        FIRE = 1 << 4, //（火系）
        EARTH = 1 << 5, //（土系）
    }

    export enum BuffImmuneTag {

    }

    export enum ActorState {
        /**眩晕 */
        STUN,
        /**定身 */
        ROOT,
        /**沉默 */
        SILENCE,
        /**无敌 */
        INVINCIBLE,
        /**隐身 */
        INVISIBLE,
    }

    export class BaseBuff {
        /**buff的施加者 */
        caster: any = null;
        /**buff的挂载者 */
        parent: any = null;
        /**buff的由那个技能创建 */
        ability: any = null;
        /**buff创建的上下文 */
        context: any = null;
        /**buff类型ID */
        buffType: BuffType = 0;
        /**buff开始的时间 */
        startTime: number = 0;
        /**buff的层级 */
        buffLayer: number = 1;
        /**buff的等级 */
        buffLevel: number = 1;
        /**buff的持续时间 */
        buffDuration: number = 1000;
        /**buff自带的tag */
        buffTag: number = 0;
        /**buff的免疫tag */
        buffImmuneTag: number = 0;
        /**buff间隔刷新时间 */
        buffIntervalTime: number = 0;
        /**buff刷新次数 */
        buffIntervalCount: number = 0;

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
        onBuffRefresh(newBuff: this) {

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
        startIntervalThink(interval: number) {
            this.buffIntervalTime = interval;
        }
    }

    /**
     * 用来修改目标属性和状态
     */
    export class Modifier extends BaseBuff {
        modifyAttribute() {

        }

        modifyState() {

        }
    }

    /**
     * 提供修改玩家运动效果的功能
     */
    export class MotionModifier extends Modifier {

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
}