export namespace Effect {
    export class EffectManager {
        /**
         * 创建一个特效(特效创建时能被周围玩家看见)
         * @param effectTypeID  特效类型id，关联配置表相关项。
         * @param controlPoints 特效相关控制点数据
         * @param controlEntities 特效相关单位控制数据
         * @param bRetain EffectManager是否持有特效
         * @returns effectHandle 特效句柄 创建特效后返回有效句柄，数值大于0（如果是客户端创建就是小于0），供游戏逻辑使用控制特效行为 
         */
        static createEffect(effectTypeID, controlPoints, controlEntities, bRetain): number {
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
        static createEffectForPlayer(effectTypeID, controlPoints, controlEntities, bRetain, player): number {
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
        static releaseEffect(effectHandle: number) {

        }

        /**
         * 销毁句柄（无视计数，直接删除特效）
         * @param effectHandle 句柄
         */
        static destroyEffect(effectHandle: number) {

        }
    }

    /**
     * struct ControlPoint {
     *     Vector3 cpData;
     * }
     * 
     * struct ControlEntity {
     *     int entityId;
     *     EAttachment attachType; //参数描述如下
     *     string attachName;
     *     Vector3 offset;
     *     bool lockOrientation; //与附着点朝向是否保持一致
     * }
     * 
     * class FlameScript : MonoBehavior {
     *     public ControlPoint[] cps; // 默认点驱动
     *     public ControlEntity[] cents; // 如果entity有ID改成实体驱动
     *     ...
     * }
     */

    /**挂载类型 */
    export enum AttachType {
        /**特效基于目标坐标创建 */
        ATTACH_ABS_ORIGIN,
        /**特效基于目标坐标创建并跟随目标位置移动 */
        ATTACH_ABS_ORIGIN_FOLLOW,
        /**特效基于目标挂点(attachName)位置创建，但不跟随目标 */
        ATTACH_POINT,
        /**特效基于目标挂点(attachName)位置创建，跟随目标 */
        ATTACH_POINT_FOLLOW,
    }

    export class BaseEffect {
        /**引用计数 */
        private _refCnt: number;
        /**唯一id */
        private _id: number = -1;

        constructor() {
            this.addRef();
        }

        update() {
            if (this._refCnt === 0) {
                // 销毁
            }
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
}