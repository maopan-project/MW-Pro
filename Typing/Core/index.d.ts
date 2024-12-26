declare namespace mw {
    /**
     * @groups 基类
     * @author si.wu
     * @description GameObject和Script的基类，定义基础能力
     * @networkStatus usage:双端
     */
    class Base {
        /**
         * @description 监听系统属性同步事件
         * @example 使用示例:监听属性变化
         * ```ts
         * this.onPropertyChange.add((path, value, oldValue) => {
         *     console.log(`属性 ${path} 改变了，新值为 ${value}，旧值为 ${oldValue}`);
         * });
         * ```
         */
        onPropertyChange: Readonly<mw.MulticastDelegate<(path: string, value: unknown, oldValue: unknown) => void>>;
        /**
         * @description 获取给定对象属性修改时触发的事件代理。
         * @effect 只在客户端调用生效
         * @param property usage:对象属性名字 例如：'x' 'rotation.x' range:不为空
         * @returns 代理对象
         */
        getPropertyChangeDelegate(property: string): Readonly<mw.MulticastDelegate<(path: string, value: unknown, oldValue: unknown) => void>>;
    }
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author si.wu
     * @groups 基础类型
     * @description 自定义属性类型
     */
    type CustomPropertyType = number | boolean | string | mw.Vector2 | mw.Vector | mw.Vector4 | mw.Rotation | mw.LinearColor;
}

declare namespace mw {
    /**
     * @hidden
     * @groups 基础类型
     */
    type ConstructorType = {
        new (...args: any[]): {};
    };
    /**
     * @ignore
     * @hidden
     */
    class FunctionOption {
    }
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 多播
     * @effect 调用端生效
     */
    const Multicast: FunctionOption;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 客户端
     * @effect 调用端生效
     */
    const Client: FunctionOption;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 服务端
     * @effect 调用端生效
     */
    const Server: FunctionOption;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 与Client Server配合实现RPC函数返回值
     * @effect 调用端生效
     */
    const Result: FunctionOption;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 不可靠rpc
     * @effect 调用端生效
     */
    const Unreliable: FunctionOption;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 将类声明为mwclass
     * @effect 调用端生效
     * @param component usage:自定义类
     * @returns 自定义类
     */
    function Component<T extends typeof mw.Script>(component: T): T;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 类型支持属性同步
     * @effect 调用端生效
     * @param type usage:自定义类
     * @returns 自定义类
     */
    function Serializable<T extends ConstructorType>(type: T): T;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 函数支持Rpc调用
     * @effect 调用端生效
     * @param options usage:Rpc调用方式
     * @returns 自定义函数
     */
    function RemoteFunction(...options: FunctionOption[]): (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => void;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 属性支持同步
     * @effect 调用端生效
     * @param option usage:配置 default:配置
     * @returns 自定义属性
     */
    function Property(option?: mw.IPropertyOptions): (target: object, key: string) => void;
}

declare namespace mw {
    /**
     * @author xiangkun.sun
     * @groups 基类/场景所有物体基类
     * @description 场景中所有实体的基类
     * @description Model、Pawn、Camera、AdvancedVehicle、BlockingVolume等逻辑对象均继承自GameObject。
     * @description 提供复制删除物体，查找获取物体、子物体、脚本等功能。
     * @networkStatus usage:双端
     * @example
     * 使用示例:创建一个名为"GameObjectExample"的脚本，在场景中放置模型正方体、圆柱、圆台，父子关系树为：正方体/圆柱/圆台,并把GameObjectExample脚本挂载给正方体。代码如下：
     * ```
     * @Component
     * export default class GameObjectExample extends Script {
     *     protected onStart(): void {
     *         let obj: GameObject = this.gameObject;
     *         console.log(`obj.name = ${obj.name}`);
     *         console.log(`obj.tag = ${obj.tag}`);
     *         console.log(`obj.worldTransform = ${obj.worldTransform}`);
     *         console.log(`obj.localTransform = ${obj.localTransform}`);
     *         let children = obj.getChildren();
     *         children.forEach(child => {
     *             console.log(`obj child = ${child.name}`);
     *         });
     *         let path = "正方体/圆柱"
     *         let cylinderObj = GameObject.getGameObjectByPath(path);
     *         console.log(`getGameObjectByPath = ${cylinderObj ? cylinderObj.name : "undefined"}`);
     *         path = "圆柱/圆台"
     *         cylinderObj = obj.getChildByPath(path);
     *         console.log(`getChildByPath = ${cylinderObj ? cylinderObj.name : "undefined"}`);
     *         cylinderObj.onDestroyDelegate.add(()=>{
     *             console.log(`destroyDelegate 1 = ${cylinderObj ? cylinderObj.name : "undefined"}`);
     *         });
     *         cylinderObj.onDestroyDelegate.add(()=>{
     *             console.log(`destroyDelegate 2 = ${cylinderObj ? cylinderObj.name : "undefined"}`);
     *         });
     *         cylinderObj.destroy();
     *     }
     * }
     * ```
     */
    class GameObject extends mw.Base {
        /**
         * @description 删除对象
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         */
        destroy(): void;
        /**
         * @description 获取物体的唯一标识（唯一标识一个对象的字符串）。
         * @effect 调用端生效
         */
        get gameObjectId(): string;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 026 reason: 删除接口 replacement: 物体碰撞属性已移除，请在Model里调用
         * @description 设置碰撞状态
         * @effect 调用端生效
         * @precautions 建议双端物体设置碰撞，单端物体设置碰撞可能会导致拉扯的情况
         * @param status usage: 碰撞状态（Type.CollisionStatus 或者 mw.PropertyStatus）
         * @param propagateToChildren usage: 是否传递给子节点 <br>  default: false
         */
        setCollision(status: mw.PropertyStatus | mw.CollisionStatus, propagateToChildren?: boolean): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 026 reason: 删除接口 replacement: 物体碰撞属性已移除，请在Model里调用
         * @description 返回碰撞状态
         * @effect 调用端生效
         * @returns 碰撞状态
         */
        getCollision(): mw.PropertyStatus | mw.CollisionStatus;
        /**
         * @description 获取物体是否被显示
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @returns bool
         */
        getVisibility(): boolean;
        /**
         * @description 设置物体是否被显示
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @param status usage:状态
         * @param propagateToChildren usage: 是否设置子物体 <br>  default:false
         */
        setVisibility(status: mw.PropertyStatus | boolean, propagateToChildren?: boolean): void;
        /**
         * @description 构造一个物体
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @param assetId usage: 资源 id   <br>  range: 根据资源 ID 长度而定
         * @param gameObjectInfo usage: 构建物体的信息 <br>  default: 选填 <br> range: 字符串最大长度根据不同类型的资源 ID 长度决定。
         * @returns 构造的物体
         * @example
         * 使用示例: 调用方式
         * ```ts
         * let obj = GameObject.spawn<Model>("197386", {
         *    replicates: true,
         *    transform: new Transform()
         * });
         * ```
         */
        static spawn<T extends GameObject>(assetId: string, gameObjectInfo?: mw.GameObjectInfo): T;
        /**
         * @description 异步构造一个物体
         * @groups 基类/场景所有物体基类
         * @description 资源不存在会先去下载资源再去创建
         * @effect 调用端生效
         * @param assetId usage: 资源 id   <br> range: 字符串最大长度根据不同类型的资源 ID 长度决定。
         * @param gameObjectInfo usage: 构建物体的信息 <br>  default: 选填
         * @returns 构造的物体
         * @example
         * 使用示例:调用方法
         * ```
         * let obj = await GameObject.asyncSpawn<Model>("197386", {
         *     replicates: true,
         *     transform: new Transform()
         * });
         * ```
         */
        static asyncSpawn<T extends GameObject>(assetId: string, gameObjectInfo?: mw.GameObjectInfo): Promise<T>;
        /**
         * @description 通过 gameObjectId 查找物体
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @param gameObjectId usage:物体的 gameObjectId <br> range: 字符串最大长度根据不同类型的资源 ID 长度决定。
         * @returns gameObjectId对应的物体
         */
        static findGameObjectById(gameObjectId: string): GameObject;
        /**
         * @description 通过 gameObjectId 异步查找 GameObject
         * @description 默认是10秒，可以通过 ScriptingSettings.setGlobalAsyncOverTime(1000 * 10) 方式来设置。
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @param gameObjectId usage:物体的 gameObjectId <br> range: 字符串最大长度根据不同类型的资源 ID 长度决定。
         * @returns gameObjectId对应的物体
         */
        static asyncFindGameObjectById(gameObjectId: string): Promise<GameObject>;
        /**
         * @description 通过自定义标签获取物体
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @param tag usage:自定义 tag  <br> range: 字符串最大长度不超过 200 个字
         * @returns Array<GameObject>
         */
        static findGameObjectsByTag(tag: string): Array<GameObject>;
        /**
         * @description 通过名字查找物体
         * @groups 基类/场景所有物体基类
         * @precautions 全局查询接口会耗费一定的查询时间，可能会降低游戏的性能。
         * @effect 调用端生效
         * @param name usage:物体名字 <br> range: 字符串最大长度根据不同类型的资源 ID 长度决定。
         * @returns 返回所有查找到的对象
         */
        static findGameObjectsByName(name: string): Array<GameObject>;
        /**
         * @description 通过名字查找物体
         * @groups 基类/场景所有物体基类
         * @precautions 全局查询接口会耗费一定的查询时间，可能会降低游戏的性能。
         * @effect 调用端生效
         * @param name usage:物体名字  <br> range: 字符串最大长度根据不同类型的名字 ID 长度决定。
         * @returns 返回第一个查找到的对象，如有多个同名对象，随机返回一个
         */
        static findGameObjectByName(name: string): GameObject;
        /**
         * @description 通过路径查找物体
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @param path usage:物体路径  <br> range: 字符串最大长度根据路径 ID 长度决定。不做限制。
         * @returns 返回第一个查找到的对象，如有多个同名对象，返回找到的第一个
         * @example
         * 使用示例:创建一个名为"GameObjectExample"的脚本，在场景中放置模型正方体、圆柱、圆台，父子关系树为：正方体/圆柱/圆台,并把GameObjectExample脚本挂载给正方体。代码如下：
         * ```
         * @Component
         * export default class GameObjectExample extends Script {
         *     protected onStart(): void {
         *         const path = "正方体/圆柱";
         *         const cylinderObj = GameObject.getGameObjectByPath(path);
         *         console.log(`getGameObjectByPath = ${cylinderObj ? cylinderObj.name : "undefined"}`);
         *     }
         * }
         * ```
         */
        static getGameObjectByPath(path: string): GameObject;
        /**
         * @description 通过路径异步查找物体
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @param path usage:物体路径  <br> range: 字符串最大长度根据路径 ID 长度决定。不做限制。
         * @returns 路径对应的物体
         * @example
         * 使用示例:创建一个名为"GameObjectExample"的脚本，在场景中放置模型正方体、圆柱、圆台，父子关系树为：正方体/圆柱/圆台,并把GameObjectExample脚本挂载给正方体。代码如下：
         * ```
         * @Component
         * export default class GameObjectExample extends Script {
         *     protected async onStart(): Promise<void> {
         *         const path = "正方体/圆柱";
         *         const cylinderObj = await GameObject.asyncGetGameObjectByPath(path);
         *         console.log(`getGameObjectByPath = ${cylinderObj ? cylinderObj.name : "undefined"}`);
         *     }
         * }
         * ```
         */
        static asyncGetGameObjectByPath(path: string): Promise<GameObject>;
        /**
         * @description 当前物体世界变换
         * @effect 调用端生效
         */
        get worldTransform(): mw.Transform;
        /**
         * @description 当前物体世界变换
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         */
        set worldTransform(transform: mw.Transform);
        /**
         * @description 当前物体本地变换
         * @effect 调用端生效
         */
        get localTransform(): mw.Transform;
        /**
         * @description 当前物体本地变换
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         */
        set localTransform(transform: mw.Transform);
        /**
         * @description 在指定时间内从当前位置平滑移动至目标位置
         * @effect 双端物体服务端调用生效，单端物体调用端生效
         * @param targetPosition usage:目标位置
         * @param time usage:缓动时间 range: > 0 type: 浮点数
         * @param isLocal usage:是否本地空间生效 default:true
         * @param onComplete usage:完成回调方法 default:undefined
         * @example
         * 使用示例: 调用方式
         * ```ts
         * let cube = GameObject.spawn<Model>("197386", {
         *    replicates: true,
         *    transform: new Transform()
         * });
         * cube.moveTo(new Vector(1000, 0, 0), 10, true, () => {
         *    console.log("moveTo complete");
         * });
         * ```
         */
        moveTo(targetPosition: mw.Vector, time: number, isLocal?: boolean, onComplete?: () => void): void;
        /**
         * @description 按给定的速度矢量随时间平滑地移动对象
         * @effect 双端物体服务端调用生效，单端物体调用端生效
         * @param velocity usage:速度
         * @param isLocal usage:是否本地空间生效 default:true
         * @example
         * 使用示例: 调用方式
         * ```ts
         * let cube = GameObject.spawn<Model>("197386", {
         *    replicates: true,
         *    transform: new Transform()
         * });
         * cube.moveBy(new Vector(10, 10, 0), true);
         * ```
         */
        moveBy(velocity: mw.Vector, isLocal?: boolean): void;
        /**
         * @description 中断moveTo()、moveBy()的进一步移动
         * @effect 双端物体服务端调用生效，单端物体调用端生效
         */
        stopMove(): void;
        /**
         * @description 在指定时间内从当前缩放平滑变化至目标缩放
         * @effect 双端物体服务端调用生效，单端物体调用端生效
         * @param targetScale usage:目标缩放
         * @param time usage:缓动时间 range: > 0 type: 浮点数
         * @param isLocal usage:是否本地空间生效 default:true
         * @param onComplete usage:完成回调方法 default:undefined
         * @example
         * 使用示例: 调用方式
         * ```ts
         * let cube = GameObject.spawn<Model>("197386", {
         *    replicates: true,
         *    transform: new Transform()
         * });
         * cube.scaleTo(new Vector(2, 2, 0), 10, true, () => {
         *    console.log("scaleTo complete");
         * });
         * ```
         */
        scaleTo(targetScale: mw.Vector, time: number, isLocal?: boolean, onComplete?: () => void): void;
        /**
         * @description 按每秒给定的缩放矢量随时间平滑缩放对象
         * @effect 双端物体服务端调用生效，单端物体调用端生效
         * @param scale usage:缩放速度
         * @param isLocal usage:是否本地空间生效 default:true
         * @example
         * 使用示例: 调用方式
         * ```ts
         * let cube = GameObject.spawn<Model>("197386", {
         *    replicates: true,
         *    transform: new Transform()
         * });
         * cube.scaleBy(new Vector(1, 1, 0), true);
         * ```
         */
        scaleBy(scale: mw.Vector, isLocal?: boolean): void;
        /**
         * @description 中断从ScaleTo()或ScaleBy()的进一步缩放
         * @effect 双端物体服务端调用生效，单端物体调用端生效
         */
        stopScale(): void;
        /**
         * @description 在指定时间内从当前旋转平滑变化至目标旋转
         * @effect 双端物体服务端调用生效，单端物体调用端生效
         * @param targetRotation usage:目标朝向
         * @param time usage:缓动时间 range: > 0 type: 浮点数
         * @param isLocal usage:是否本地空间生效 default:true
         * @param onComplete usage:完成回调方法 default:undefined
         * @example
         * 使用示例: 调用方式
         * ```ts
         * let cube = GameObject.spawn<Model>("197386", {
         *    replicates: true,
         *    transform: new Transform()
         * });
         * cube.rotateTo(new Rotation(45, 0, 0), 10, true, () => {
         *    console.log("rotateTo complete");
         * });
         * ```
         */
        rotateTo(targetRotation: mw.Rotation | mw.Quaternion, time: number, isLocal?: boolean, onComplete?: () => void): void;
        /**
         * @description 按给定的旋转量随时间平滑地旋转对象
         * @effect 双端物体服务端调用生效，单端物体调用端生效
         * @param rotation usage:旋转速度
         * @param multiplier usage:旋转乘数 range: > 0 type: 浮点数
         * @param isLocal usage:是否本地空间生效 default:true
         * @example
         * 使用示例: 调用方式
         * ```ts
         * let cube = GameObject.spawn<Model>("197386", {
         *    replicates: true,
         *    transform: new Transform()
         * });
         * cube.rotateBy(new Rotation(1, 0, 1), 5, true);
         * ```
         */
        rotateBy(rotation: mw.Rotation | mw.Quaternion, multiplier: number, isLocal?: boolean): void;
        /**
         * @description 中断从rotateTo()或rotateBy()的进一步旋转
         * @effect 双端物体服务端调用生效，单端物体调用端生效
         */
        stopRotate(): void;
        /**
         * @description 批量设置位置
         * @effect 调用端生效
         * @param gameObjects usage:准备更新Transform的GameObject列表
         * @param transforms usage:位置提供目标值的Transform列表
         */
        static bulkPivotTo(gameObjects: Array<GameObject>, transforms: Array<mw.Transform>): void;
        /**
         * @Editor
         * @description 返回当前物体是否为预制体
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @returns 名称
         */
        isPrefabActor(): boolean;
        /**
         * @Editor
         * @description 返回当前物体名称
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @returns 名称
         */
        get name(): string;
        /**
         * @Editor
         * @description 设置物体名称
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @param name usage:需要设置的名称
        */
        set name(name: string);
        /**
         * @description 设置当前物体的标签
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @param tag usage:Tag
         */
        set tag(tag: string);
        /**
         * @description 获取当前物体的标签
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @returns Tag
         */
        get tag(): string;
        /**
         * @description 设置当前物体的场景捕捉标签
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @param tag usage:Tag range: 无
         */
        set sceneCaptureTag(tag: string);
        /**
         * @description 获取当前物体的捕捉标签
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @returns Tag
         */
        get sceneCaptureTag(): string;
        /**
         * @description 获取Actor等级
         * @effect 编辑器端生效
         */
        get actorLevel(): number;
        /**
         * @description 获取当前物体同步状态
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @returns mw.NetStatus
         */
        get netStatus(): mw.NetStatus;
        /**
         * @description 获取当前父物体
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @returns 父物体
         */
        get parent(): GameObject;
        /**
         * @description 设置父物体
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         */
        set parent(newParent: GameObject);
        /**
         * @description 获取当前物体使用资源的GUID
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         */
        get assetId(): string;
        /**
         * @description 当前物体状态
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         */
        get isReady(): boolean;
        /**
         * @description 当前物体是否被销毁
         * @effect 调用端生效
         */
        get isDestroyed(): boolean;
        /**
         * @description 物体销毁后事件回调
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         */
        onDestroyDelegate: mw.MulticastDelegate<() => void>;
        /**
         * @description 物体销毁前事件回调
         * @effect 调用端生效
         */
        onBeforeDestroyDelegate: mw.MulticastDelegate<() => void>;
        /**
         * @description 物体准备好后返回
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @returns 准备好的对象
         */
        asyncReady(): Promise<this>;
        /**
         * @description 获取物体边界
         * @effect 调用端生效
         * @param onlyCollidingComponents usage:是否只包含有碰撞的组件。
         * @param originOuter usage:传出参数，设置为物体的中心点坐标。
         * @param boxExtentOuter usage:传出参数，设置为物体尺寸的一半。
         * @param includeFromChild usage:是否递归包含子物体  <br> default:undefined
         */
        getBounds(onlyCollidingComponents: boolean, originOuter: mw.Vector, boxExtentOuter: mw.Vector, includeFromChild?: boolean): void;
        /**
         * @description 获取子物体
         * @effect 调用端生效
         * @returns Array<GameObject>
         */
        getChildren(): Array<GameObject>;
        /**
         * @Editor
         * @description 根据名称查找子物体
         * @effect 调用端生效
         * @param name usage:名称 <br> range: 字符串最大长度根据不同物体的名称长度决定。
         * @returns 查找的物体
         */
        getChildByName(name: string): GameObject;
        /**
         * @description 通过名字查找所有的子物体
         * @effect 调用端生效
         * @param name usage:子物体名称  <br> range: 字符串最大长度根据不同类型的名字 ID 长度决定。
         * @returns 符合的子物体数组
         */
        getChildrenByName(name: string): Array<GameObject>;
        /**
         * @description 根据路径查找子物体
         * @effect 调用端生效
         * @param path  usage:路径  <br> range: 字符串最大长度根据不同路径长度决定。
         * @returns 查找的物体
         * @example
         * 使用示例:创建一个名为"GameObjectExample"的脚本，在场景中放置模型正方体、圆柱、圆台，父子关系树为：正方体/圆柱/圆台,并把GameObjectExample脚本挂载给正方体。代码如下：
         * ```
         * @Component
         * export default class GameObjectExample extends Script {
         *     protected onStart(): void {
         *         const obj: GameObject = this.gameObject;
         *         const path = "圆柱/圆台";
         *         const cylinderObj = obj.getChildByPath(path);
         *         console.log(`getChildByPath = ${cylinderObj ? cylinderObj.name : "undefined"}`);
         *     }
         * }
         * ```
         */
        getChildByPath(path: string): GameObject;
        /**
         * @description 根据 gameObjectId 查找子物体
         * @effect 调用端生效
         * @param gameObjectId usage:gameObjectId  <br> range: 字符串最大长度根据不同类型的 ID 长度决定。
         * @returns 查找的物体
         */
        getChildByGameObjectId(gameObjectId: string): GameObject;
        /**
         * @Editor
         * @description 复制对象
         * @effect 调用端生效
         * @param gameObjectInfo usage:克隆物体的信息  <br> default: null
         * @returns 克隆的对象
         */
        clone(gameObjectInfo?: mw.GameObjectInfo): this;
        /**
         * @description 获得当前物体下的指定脚本
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:脚本API优化 replacement:getComponent
         * @effect 调用端生效
         * @param name usage:名字
         * @returns Script
         */
        getScripts(): Array<mw.Script> | undefined;
        /**
         * @description 获得当前物体下的指定脚本
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:脚本API优化 replacement:getComponent
         * @effect 调用端生效
         * @param name usage:名字  range: 字符串长度依据脚本名字而定。
         * @returns Script
         */
        getScriptByName(name: string): mw.Script | undefined;
        /**
         * @description 获得当前物体下的指定脚本
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:脚本API优化 replacement:getComponent
         * @effect 调用端生效
         * @param id usage:脚本唯一标识 range: 字符串长度依据 ID 长度而定。
         * @returns Script
         */
        getScript(id: string): mw.Script;
        /**
         * @description 获取物体包围盒大小
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:032 reason:接口废弃 replacement:getBoundingBox
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Vector 对象,建议传入 outer 来减少 new 对象
         * @param nonColliding usage:表示要在边界框中包含非碰撞组件  <br> default:false
         * @param includeFromChild usage:如果为 true，则递归子物体  <br> default:false
         * @param outer usage:接收转换数据的 Vector 对象  <br> default:null
         * @returns mw.Vector
         */
        getBoundingBoxExtent(nonColliding?: boolean, includeFromChild?: boolean, outer?: mw.Vector): mw.Vector;
        /**
         * @description 获取物体包围盒大小
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Vector 对象,建议传入 outer 来减少 new 对象
         * @param nonColliding usage:表示要在边界框中包含非碰撞组件  <br> default:false
         * @param includeFromChild usage:如果为 true，则递归子物体  <br> default:false
         * @param outer usage:接收转换数据的 Vector 对象  <br> default:null
         * @returns mw.Vector
         */
        getBoundingBox(nonColliding?: boolean, includeFromChild?: boolean, outer?: mw.Vector): mw.Vector;
        /**
         * @description 获取所有子对象包围盒中心点(不包含父对象,父对象不可用返回[0,0,0])
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:041 reason:接口废弃 replacement:
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Vector 对象,建议传入 outer 来减少 new 对象
         * @param outer usage:接收转换数据的 Vector 对象  <br> default:null
         * @returns mw.Vector
         */
        getChildrenBoundingBoxCenter(outer?: mw.Vector): mw.Vector;
        /**
         * @description 添加一个脚本组件
         * @groups 基类/场景所有物体基类
         * @param constructor usage: ScriptComponentClass 添加脚本的类型 <br> default: null
         * @param bInReplicates usage: 是否开启同步 <br> default: 在服务端调用，默认会同步；在客户端调用，默认不同步。
         * @return T 新添加的脚本组件
         * @effect 调用端生效
         */
        addComponent<T extends mw.Script>(constructor: {
            new (...args: unknown[]): T;
        }, bInReplicates?: boolean): T;
        /**
         * @description 获取指定类型的组件
         * @groups 基类/场景所有物体基类
         * @param constructor usage: 脚本类型  <br> default:null
         * @returns 脚本组件
         * @effect 调用端生效
         * @example
         * 使用示例:创建一个名为"NewScript1"的脚本，通过 getComponent 获取 NewScript 脚本。代码如下：
         * ```ts
         * import NewScript from "./NewScript";
         * @Component
         * export default class NewScript1 extends Script {
         *     protected onStart(): void {
         *         const script = this.gameObject.getComponent(NewScript);
         *     }
         * }
         * ```
         */
        getComponent<T extends mw.Script>(constructor?: {
            new (...args: unknown[]): T;
        }): T;
        /**
         * @description 获取指定类型的所有组件
         * @groups 基类/场景所有物体基类
         * @param constructor usage: 脚本类型 <br> default:null
         * @returns 脚本组件列表
         * @effect 调用端生效
         */
        getComponents<T extends mw.Script>(constructor?: {
            new (...args: unknown[]): T;
        }): Array<T>;
        /**
         * @description 获取脚本组件属性
         * @groups 基类/场景所有物体基类
         * @param constructor usage: 脚本类型  <br> default:null
         * @return 组件所有属性 Map<key: IPropertyOptions>
         * @effect 调用端生效
         */
        getComponentPropertys<T extends mw.Script>(constructor: {
            new (...args: unknown[]): T;
        }): Map<string, mw.IPropertyOptions>;
        /**
         * @Editor
         * @description 设置物体localTransform是相对于父物体或者世界
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @param absolutePosition usage: 位置是否为相对于世界 default: false
         * @param absoluteRotation usage: 旋转是否为相对于世界 default: false
         * @param absoluteScale usage: 缩放是否为相对于世界 default: false
         */
        setAbsolute(absolutePosition?: boolean, absoluteRotation?: boolean, absoluteScale?: boolean): void;
        /**
         * @Editor
         * @description 异步根据名称查找子物体
         * @groups 基类/场景所有物体基类
         * @effect 调用端生效
         * @param name usage:名称 <br> range: 字符串最大长度根据不同物体的名称长度决定。
         * @returns 查找的物体
         */
        asyncGetChildByName(name: string): Promise<GameObject>;
        /**
         * @description 设置自定义属性的值，双端对象需在服务器调用。当设置的属性不存在时会新增自定义属性。
         * @effect 只在服务端调用生效
         * @param propertyName usage:属性名 range: 无
         * @param value usage:属性值 range: 无
         */
        setCustomProperty(propertyName: string, value: mw.CustomPropertyType | undefined): void;
        /**
         * @description 获取给定自定义属性修改时触发的事件代理。双端对象在服务器修改自定义属性后，双端均会触发事件并执行绑定函数。
         * @effect 只在客户端调用生效
         * @param property usage:对象属性名字 range: 不能为空
         * @returns 代理对象
         */
        getCustomPropertyChangeDelegate(property: string): Readonly<mw.MulticastDelegate<(path: string, value: unknown, oldValue: unknown) => void>>;
        /**
         * @description 获取自定义属性的值，服务器客户端均可调用，客户端调用需注意属性同步的延迟。
         * @effect 调用端生效
         * @param propertyName usage:属性名 range: 无
         * @returns 属性值
         */
        getCustomProperty<T extends mw.CustomPropertyType>(propertyName: string): T;
        /**
         * @description 获取自定义属性名字数组，返回对象所有自定义属性。
         * @effect 调用端生效
         * @returns 属性名列表
         * @example 使用示例:获取所有自定义属性
         * ```ts
         * const attributes = this.getAttributes();
         * console.log(attributes);
 // ["name", "age"]
         * ```
         */
        getCustomProperties(): string[];
        /**
         * @description 监听自定义属性同步事件
         * @effect 仅客户端
         * @example 使用示例:监听自定义属性变化
         * ```ts
         * this.onCustomPropertyChange.add((path, value, oldValue) => {
         *     console.log(`属性 ${path} 改变了，新值为 ${value}，旧值为 ${oldValue}`);
         * });
         * ```
         */
        onCustomPropertyChange: Readonly<mw.MulticastDelegate<(path: string, value: unknown, oldValue: unknown) => void>>;
    }
}

declare namespace mw {
}

declare namespace mw {
}

declare namespace mw {
}

declare namespace mw {
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @hidden
     * @author zhaoyang.hou
     * @groups 基类
     * @description 脚本管理类
     * @networkStatus usage:双端
     */
    class ScriptManager {
        /**
         * 根据GUID获得脚本实例
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:028 reason:接口废弃 replacement:gameObject.getComponent(ScriptClass);
         * @param GUID GUID
         */
        static findScript(guid: string): Script;
        /**
         * 根据GUID异步获得脚本实例
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:028 reason:接口废弃 replacement:gameObject.getComponent(ScriptClass);
         * @param GUID GUID
         */
        static asyncFindScript(guid: string): Promise<Script>;
    }
    /**
     * @author zhaoyang.hou
     * @groups 基类
     * @description 脚本的基类
     * @description -----------------------------
     * @description 1. 脚本是什么？
     * @description 挂载的脚本就像是给游戏对象赋予了特殊能力或行为。正如灵魂赋予人类生命和个性一样，脚本赋予游戏对象生命和行为。它们定义了游戏对象的特殊能力、动作模式、智能决策和与玩家的互动方式。
     * @description 你可以编写脚本来实现角色的控制逻辑，敌人的行为模式，道具的效果，关卡的触发条件等等。通过挂载不同的脚本，你可以赋予对象不同的行为和能力，创造出各种有趣和多样化的游戏。
     * @description 2. 脚本的分类
     * @description 可以大致分为两类：
     * @description - :mushroom: 继承自 Script 的脚本类，享受编辑器赋予的默认生命周期。
     * @description 当在编辑器中点击新建脚本时，会默认生成一个继承自 Script 的脚本类：
     * @example
     * 使用示例: 默认脚本格式
     * ```ts
     * @Component
     * export default class GameStart extends Script {
     *
     *     // 当脚本被实例后，会在第一帧更新前调用此函数
     *     protected onStart(): void {
     *
     *     }
     *
     *     // 周期函数 每帧执行
     *     // 此函数执行需要将this.useUpdate赋值为true
     *     // @param dt 当前帧与上一帧的延迟 / 秒
     *     protected onUpdate(dt: number): void {
     *
     *     }
     *
     *     // 脚本被销毁时最后一帧执行完调用此函数
     *     protected onDestroy(): void {
     *
     *     }
     * }
     * ```
     * @description - :mushroom: 不继承 Script 的其他类。
     * @description 例如
     * @example
     * 使用示例: 普通类脚本格式
     * ```ts
     * export default class PlayerModS extends ModuleS<PlayerModC,null> {
     *
     *     public net_appleChange(player:Player){
     *
     *     }
     * }
     * export class Person {
     *
     * }
     *
     * class Student extends Person {
     *
     * }
     * ```
     * @description 3. 脚本是如何工作的？
     * @description - :mushroom: 继承自 Script 的脚本类。
     * @description 继承自 Script 的脚本类可以复写 onStart(), onUpdate(), 和 onDestroy() 方法。当你的脚本放在对象管理器中之后，编辑器会自动帮你调用这些函数。
     * @description 脚本的生命周期中的 onStart、onUpdate 和 onDestroy 方法可以比喻为一个植物的生长过程：
     * @description onStart 为植物的种子开始发芽的过程。当继承自 Script 的脚本放置在游戏对象中，脚本被创建并启动时，onStart 方法会在脚本加载后立即执行。
     * @description onUpdate 植物的生长和成熟阶段。在游戏运行期间，onUpdate 方法会在每一帧都被调用，在这个阶段，可以编写逻辑代码来控制游戏对象的行为、状态和与其他对象的交互。
     * @description onDestroy 植物的凋谢和结束阶段。当游戏对象被销毁或从场景中移除时，onDestroy 方法会被调用，这个阶段可以用来进行清理工作、释放资源和保存数据，以确保游戏对象的退出过程是正确和完整的。
     * @description 注：onUpdate函数是在每一帧中调用的，而不是以固定的时间间隔调用。每一帧代表游戏编辑器更新一次的时间单位，其频率取决于游戏的帧率（FPS）。
     * @description 帧率是指每秒钟渲染的帧数，通常以FPS（Frames Per Second）为单位表示。常见的帧率为60 FPS或30 FPS。如果游戏以60 FPS运行，那么 onUpdate 函数会每帧调用一次，即每秒钟调用60次。同理，如果游戏以30 FPS运行，onUpdate 函数会每秒钟调用30次。
     * @description 需要注意的是，帧率可能受到游戏的复杂度、场景中的物体数量、图形效果和计算负荷等因素的影响。如果游戏性能下降，帧率可能会下降，从而导致 onUpdate 函数的调用频率减少。因此，不能假设 onUpdate 函数在固定时间间隔内调用，而应该将其视为每帧都会被调用的函数。
     * @description - :mushroom: 不继承 Script 的其他类。
     * @networkStatus usage:双端
     */
    abstract class Script extends mw.Base {
        /**
         * @description 设置脚本挂载的 gameobject 对象
         * @effect 调用端生效
         * @param value usage:传入挂载对象
         */
        set gameObject(value: mw.GameObject);
        /**
         * @description 获取脚本挂载的 gameobject
         * @effect 调用端生效
         * @returns 挂载游戏对象
         */
        get gameObject(): mw.GameObject;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:028 reason:脚本组件 replacement: 通过自定义属性识别每个脚本
         * @description GUID
         */
        get guid(): string;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:028 reason:脚本组件 replacement:通过自定义属性识别每个脚本
         * @description 获取名字内容
         */
        get name(): string;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:028 reason:脚本组件 replacement:通过自定义属性识别每个脚本
         * @description 设置名字内容
         */
        set name(name: string);
        /**
         * @hidden
         */
        constructor(...params: any[]);
        /**
         * @description 设置脚本是否启用 onUpdate 生命周期函数
         * @effect 调用端生效
         * @param v usage: true 开启 false 关闭
         */
        set useUpdate(v: boolean);
        /**
         * @description 获取脚本是否启用 onUpdate 生命周期函数
         * @effect 调用端生效
         * @returns 默认为关闭状态，需要手动开启
         */
        get useUpdate(): boolean;
        /**
         * @description 生命周期函数 - 脚本开始执行时调用
         * @effect 调用端生效
         */
        protected onStart(): void;
        /**
         * @description 生命周期函数 - 每帧执行函数
         * @description setUpdate 设置为 true 后，每帧被执行，设置为false，不会执行
         * @param dt usage:与上一帧的延迟 单位:秒 <br> range: dt 的大小会根据游戏性能发生变化，游戏性能下降，帧率可能会下降，从而导致 onUpdate 函数的调用频率减少。（详情请看类开头描述） type:浮点类型数值
         * @effect 调用端生效
         */
        protected onUpdate(dt: number): void;
        /**
         * @description 生命周期函数 - 被销毁时调用
         * @effect 调用端生效
         */
        protected onDestroy(): void;
        /**
         * @description 属性被同步事件 ClientOnly
         * @param path usage:属性路径  range: 依据路径长度而定
         * @param value usage:属性值
         * @param oldVal usage:同步前的值
         * @effect 调用端生效
         * @returns 同步结果
         */
        protected onReplicated(path: string, value: unknown, oldVal: unknown): void | boolean;
        /**
         * @description 生命周期函数 - target 禁用时调用
         * @effect 调用端生效
         */
        protected onDeactivate(): void;
        /**
         * @description 生命周期函数 - target 激活时调用
         * @effect 调用端生效
         */
        protected onActivate(): void;
        /**
         * @description 销毁组件对象
         * @effect 只在服务端调用生效
         */
        destroy(): void;
        /**
         * @description 动态生成一个组件
         * @param scriptClass usage: 组件类型 <br> default:bull
         * @param bInReplicates usage: 是否同步 <br> default:bull
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:脚本API优化 replacement:GameObject:addComponent
         * @effect 调用端生效
         * @returns 继承 Script 的脚本类
         */
        static spawnScript<T extends Script>(scriptClass: new (...args: unknown[]) => T, bInReplicates?: boolean): Promise<T>;
        /**
         * @description 动态生成一个组件
         * @param scriptAssetId usage: 组件类型 id <br> default:bull    range: 字符串长度依据 ID 长度而定。
         * @param bInReplicates usage: 是否同步 <br> default:bull
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:脚本API优化 replacement:GameObject:addComponent
         * @effect 调用端生效
         * @returns 继承 Script 的脚本类
         */
        static spawnScript<T extends Script>(scriptAssetId: string, bInReplicates?: boolean): Promise<T>;
        /**
         * @description 动态生成一个组件
         * @param scriptClass usage: 组件类型 <br> default:bull
         * @param bInReplicates usage: 是否同步 <br> default:bull
         * @param target usage: 目标物体 <br> default:bull
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:脚本API优化 replacement:GameObject:addComponent
         * @effect 调用端生效
         * @returns 继承 Script 的脚本类
         */
        static spawnScript<T extends Script>(scriptClass: new (...args: unknown[]) => T, bInReplicates?: boolean, target?: mw.GameObject): Promise<T>;
        /**
         * @description 动态生成一个组件
         * @param scriptAssetId usage: 组件类型 <br> default:bull  range: 字符串长度依据 ID 长度而定。
         * @param bInReplicates usage: 是否同步 <br> default:bull
         * @param target usage: 目标物体 <br> default:bull
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:脚本API优化 replacement:GameObject:addComponent
         * @effect 调用端生效
         * @returns 继承 Script 的脚本类
         */
        static spawnScript<T extends Script>(scriptAssetId: string, bInReplicates?: boolean, target?: mw.GameObject): Promise<T>;
        /**
         * @description 是否为客户端
         * @effect 调用端生效
         * @returns true为客户端
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:接口废弃 replacement:SystemUtil.isClient
         */
        isRunningClient(): boolean;
    }
    /**
     * @author zhaoyang.hou
     * @groups 基类
     * @networkStatus usage:双端
     * @description main脚本的基类
     */
    class GameApplication {
        /**
         * @description 生命周期函数 - 在所有脚本onStart前执行
         * @effect 调用端生效
         */
        protected onEnter(): void;
    }
}

declare namespace mw {
    /**
     * @hidden
     * @groups 基础类型
     * @author xiangkun.sun
     * @description 游戏窗口被激活事件
     * @effect 只在客户端调用生效
     * @param callback usage:回调事件
     */
    function onWindowActivated(callback: () => void): void;
    /**
     * @hidden
     * @groups 基础类型
     * @author xiangkun.sun
     * @description 游戏窗口被挂起事件
     * @effect 只在客户端调用生效
     * @param callback usage:回调事件
     */
    function onWindowDeactivated(callback: () => void): void;
    /**
     * @hidden
     * @groups 基础类型
     * @author xiangkun.sun
     * @description 获取游戏窗口激活状态
     * @effect 只在客户端调用生效
     * @returns 是否激活
     */
    function getWindowIsActive(): boolean;
}

declare namespace mw {
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @hidden
     * @groups 基础类型
     * @author xiangkun.sun
     * @description 用户属性范围和是否显示滑块
     */
    interface IRangeOptions {
        /** @description 最小值 */
        min: number;
        /** @description 最大值 */
        max: number;
        /** @description 是否显示进度条 */
        showSlider?: boolean;
    }
    /**
     * @hidden
     * @description 属性同步信息
     */
    interface IRepEventOptions {
        path: string;
        value: unknown;
        oldVal: unknown;
        stopBubble(): void;
    }
    /**
     * @hidden
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 用户属性标记的参数选项
     */
    interface IPropertyOptions {
        /** @description 该属性在编辑器中的显示名称，如果不设置则默认为变量名 */
        displayName?: string;
        /** @description 该属性在编辑器中的提示内容 */
        tooltip?: string;
        /** @description 是否覆盖父类的属性 */
        override?: boolean;
        /** @description 是否同步 */
        replicated?: boolean;
        numberType?: NumberType;
        /** @description 属性同步修改后的回调函数 */
        onChanged?: string | ((path: string, value: unknown, oldVal: unknown) => void | boolean);
        /** @description 是否广播 */
        multicast?: boolean;
        /** @description 组名 */
        group?: string;
        /** @description 是否在编辑器里隐藏 */
        hideInEditor?: boolean | HideInEditorState;
        /** @description 是否为只读属性 */
        readonly?: boolean;
        /** @description 范围（只有number生效）*/
        range?: IRangeOptions;
        /** @description 是否为资源类型，目前仅支持字符串 */
        asset?: mw.AssetType | Array<mw.AssetType>;
        /** @description 数组的默认值 */
        arrayDefault?: unknown;
        /** @description 捕获其他属性 */
        capture?: boolean;
        /** @description 枚举的类型 */
        enumType?: {
            [key: string | number]: string | number;
        };
        /** @description Select Options */
        selectOptions?: {
            [key: string]: string;
        };
        /** @description Editor监听属性变更 */
        onChangedInEditor?: string | (() => void);
        /** @description 是否为资源 */
        isAsset?: boolean;
        /** @description 属性排序 */
        levelID?: number;
        /** @description 属性默认值 */
        defaultValue?: unknown;
    }
    /** @ignore */
    enum FlagType {
        /** @ignore */
        Property = 0,
        /** @ignore */
        Rpc = 1
    }
    /** @ignore */
    enum RpcType {
        None = 0,
        Server = 1,
        Client = 2,
        Multicast = 4,
        Result = 8,
        Unreliable = 16
    }
    /**
     * @ignore
     * @hidden
     */
    enum NumberType {
        Int8 = 0,
        Int16 = 1,
        Int32 = 2,
        Int64 = 3,
        Float = 4,
        Double = 5
    }
    /**
     * @ignore
     * @hidden
     */
    class FuncInfo {
        path: Array<number>;
        debugPath: string;
        params: unknown[];
    }
    /**
     * @ignore
     * @hidden
     */
    class PropInfo {
        key: string;
        value: unknown;
    }
    /**
     * @author xiangkun.sun
     * @description 是否在编辑器里隐藏
     * @groups 基础类型
     */
    enum HideInEditorState {
        /** 显示 */
        Display = 0,
        /** 隐藏 */
        HideSelf = 1,
        /** 隐藏所有下级属性 */
        HideAll = 2
    }
}

declare namespace mw {
}
