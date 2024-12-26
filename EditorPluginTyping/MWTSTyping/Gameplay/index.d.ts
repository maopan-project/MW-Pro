/// <reference path="../Type/index.d.ts" />
/// <reference path="../Core/index.d.ts" />

declare namespace mw {
    /**
     * @author qiming.jiang
     * @groups 玩法/材质
     * @description Model插槽，执行材质相关操作
     * @description -------------------------
     * @description - model 材质插槽引用的Model
     * @description - index 材质插槽的索引
     * @description - materialAssetID 材质插槽使用的资源
     * @description - color 材质插槽的颜色
     * @description - resetColor 方法重置材质插槽颜色
     * @description - resetMaterial 方法重置材质资源
     * @description - getCustomMaterial 方法获取自定义材质
     * @networkStatus usage:双端
     * @example
     * 使用示例:创建一个名为"ModelExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你可以通过F1键，在场景中动态生成模型并模拟物理。代码如下：
     * ```
     * @Component
     * export default class ModelExample extends Script {
     *     //当脚本被实例后，会在第一帧更新前调用此函数
     *     protected async onStart(): Promise<void> {
     *         if(SystemUtil.isClient())
     *             {
     *                 InputUtil.onKeyDown(Keys.F1,()=>{
     *                     // F1键 通知服务器执行事件
     *                     mw.Event.dispatchToServer("Model");
     *                 });
     *             }
     *         if(SystemUtil.isServer()){
     *             mw.Event.addClientListener("Model",()=>{
     *                 let box = GameObject.spawn("197386",{
     *                     transform:new Transform(new Vector(500,0,100),new Rotation(0,0,0),new Vector(1,1,1)),
     *                     replicates:true
     *                 }) as Model;
     *                 // 设置透明度
     *                 box.opacity = 0.8;
     *                 // 设置颜色
     *                 box.color = new mw.LinearColor(1.0,0.0,0.0,0.0);
     *
     *                 // 获取第0个插槽
     *                 let matSlot0 = box.getMaterialSlot(0);
     *                 // 设置材质插槽颜色
     *                 matSlot0.color = new mw.LinearColor(1.0,0.0,0.0,0.0);
     *                 // 重置颜色
     *                 matSlot0.resetColor();
     *                 // 设置材质插槽材质资源
     *                 matSlot0.materialAssetID = "128569";
     *                 // 重置插槽材质资源
     *                 matSlot0.resetMaterial();
     *                 // 获取插槽自定义材质
     *                 let customMat = matSlot0.getCustomMaterial();
     *             });
     *         }
     *     }
     * }
     * ```
     */
    class MaterialSlot {
        /**
         * @description 构造函数
         * @param index usage:材质插槽的索引 default: 无 range: 无 type: 整形
         * @param model usage:材质插槽引用的Model default: 无 range: 无
         */
        constructor(index: number, model: Model);
        /**
         * @description 插槽的Model，只读
         * @effect 调用端生效
         * @returns 获取插槽的Model
         */
        get model(): Model;
        /**
         * @description 插槽的索引，只读
         * @effect 调用端生效
         * @returns 获取插槽的索引
         */
        get index(): number;
        /**
         * @description 插槽的资源ID
         * @effect 调用端生效
         * @returns 获取插槽资源ID
         */
        get materialAssetID(): string;
        /**
         * @description 设置插槽的资源
         * @effect 调用端生效
         * @param value 插槽资源ID
         */
        set materialAssetID(value: string);
        /**
         * @description 插槽的颜色
         * @effect 调用端生效
         * @returns 获取插槽颜色
         */
        get color(): mw.LinearColor;
        /**
         * @description 设置插槽的颜色
         * @effect 调用端生效
         * @param value 插槽颜色
         */
        set color(value: mw.LinearColor);
        /**
         * @description 重置插槽颜色
         * @effect 调用端生效
         * @param value  重置插槽颜色
         */
        resetColor(): void;
        /**
         * @description 重置当前插槽材质为初始材质
         * @effect 调用端生效
         */
        resetMaterial(): void;
        /**
         * @description 获取自定义材质
         * @description 网络材质将返回空
         * @effect 调用端生效，本地调用
         * @returns 返回自定义材质实例
         */
        getCustomMaterial(): mw.MaterialInstance;
    }
    /**
     * @author baoqiang.han
     * @groups 玩法/物理
     * @description 物理模拟与材质设置
     * @description -------------------------
     * @description 在游戏中添加物理效果有助于提升场景的沉浸感，因为这能促使玩家相信他们的确在与模拟内容进行交互，并且能以某种方式得到反馈。
     * @description 物理模拟 如何工作呢？
     * @description Model的属性定义了静态模型具有物理特性，其中较为重要的是：
     * @description - 静态模型实例 physicsEnabled 属性为 True 可开启物理模拟。
     * @description - mass 属性表示重力的大小。
     * @description - friction 属性表示摩擦力的大小。
     * @description - restitution 属性表示弹力。
     * @description - lockPosition 属性表示约束，约束哪个轴指在这个轴向不会发生变动。
     * @description 材质如何自定义设置呢？
     * @description 材质 是可以应用到网格物体静态模型上的资源，用它可控制场景的可视外观。
     * @description - setMaterial 方法更换静态模型材质，传入左侧材质资源ID。
     * @description - setStaticMeshAsset 方法更换静态模型，传入左侧静态模型资源ID。
     * @networkStatus usage:双端
     * @precautions 物理相关接口目前版本不支持证多端同步
     * @example
     * 使用示例:创建一个名为"ModelExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你可以通过F1键，在场景中动态生成模型并模拟物理。代码如下：
     * ```
     * @Component
     * export default class ModelExample extends Script {
     *     //当脚本被实例后，会在第一帧更新前调用此函数
     *     protected async onStart(): Promise<void> {
     *         if(SystemUtil.isClient())
     *             {
     *                 InputUtil.onKeyDown(Keys.F1,()=>{
     *                     // F1键 通知服务器执行事件
     *                     mw.Event.dispatchToServer("Model");
     *                 });
     *             }
     *         if(SystemUtil.isServer()){
     *             mw.Event.addClientListener("Model",()=>{
     *                 let box = GameObject.spawn("197386",{
     *                     transform:new Transform(new Vector(500,0,100),new Rotation(0,0,0),new Vector(1,1,1)),
     *                     replicates:true
     *                 }) as Model;
     *                 // 控制质量
     *                 box.massEnabled = true;
     *                 // 设置质量
     *                 box.mass = 200;
     *                 // 使用质量
     *                 box.gravityEnabled = true;
     *                 // 设置摩擦力
     *                 box.friction = 0.1;
     *                 // 设置弹力
     *                 box.restitution = 1;
     *                 // 开启物理模拟
     *                 box.physicsEnabled = true;
     *                 // 开关闭阴影投射
     *                 box.castShadow = false;
     *             });
     *         }
     *     }
     * }
     * ```
     */
    class Model extends mw.GameObject {
        /**
         * @description 进入Model事件
         */
        get onTouch(): mw.MulticastGameObjectDelegate;
        /**
         * @description 离开Model事件
         */
        get onTouchEnd(): mw.MulticastGameObjectDelegate;
        /**
         * @description 返回当前拥有的材质实例
         * @description 该材质资源若未加载过，返回的材质实例无法立即取到材质属性，材质资源加载完成后即可通过材质实例获取正确的材质属性
         * @effect 调用端生效
         * @returns 材质实例数组
         */
        getMaterialInstance(): Array<mw.MaterialInstance>;
        /**
         * @description 给开启物理模拟的模型添加一个冲量力
         * @author hao.huang
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param impulse usage:设置冲量力大小和方向
         * @param velChange usage:是否忽视模型自身质量的影响 default:false
         * @example
         * 使用示例: 如下示例展示添加冲量力方法
         * ```ts
         * if (model.physicsEnabled) {
         *      // 确保开启物理模拟
         *      model.addImpulse(new Vector(200,0,0), true);
         * }
         * ```
         */
        addImpulse(impulse: mw.Vector, velChange?: boolean): void;
        /**
         * @description 给开启物理模拟的模型添加一个力
         * @author hao.huang
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param force usage:设置力大小和方向   <br> default: null
         * @param velChange usage:是否忽视模型自身质量的影响  <br> default:false
         * 使用示例: 如下示例展示添加力方法
         * ```ts
         * if (model.physicsEnabled)
         * {
         *      // 确保开启物理模拟
         *      model.addForce(new Vector(200,0,0), true);
         * }
         * ```
         */
        addForce(force: mw.Vector, velChange?: boolean): void;
        /**
         * @description 给开启物理模拟的模型添加一个扭力
         * @author hao.huang
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param torque usage:设置扭力大小和方向  <br> default: null
         * @param velChange usage:是否忽视模型自身质量的影响  <br> default:false
         * 使用示例: 如下示例展示添加扭力方法
         * ```ts
         * if (model.physicsEnabled) { // 确保开启物理模拟
         *      model.addTorque(new Vector(200,0,0), true);
         * }
         * ```
         */
        addTorque(torque: mw.Vector, velChange?: boolean): void;
        /**
         * @description 给开启物理模拟的模型添加一个角冲量
         * @author hao.huang
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param impulse usage:设置角冲量大小和方向
         * @param velChange usage:是否忽视模型自身质量的影响 default:false
         * 使用示例: 如下示例展示添加角冲量方法
         * ```ts
         * if (model.physicsEnabled) { // 确保开启物理模拟
         *      model.addAngularImpulse(new Vector(200,0,0), true);
         * }
         * ```
         */
        addAngularImpulse(impulse: mw.Vector, velChange?: boolean): void;
        /**
         * @description 获取线性速度(仅开启模拟时生效)
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 物理线速度
         */
        get physicsLinearVelocity(): mw.Vector;
        /**
         * @description 设置需要叠加的线性速度(仅开启模拟时生效)
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:物理线速度大小
         */
        set physicsLinearVelocity(value: mw.Vector);
        /**
         * @description 获取角速度(仅开启模拟时生效)
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 物理角速度
         */
        get physicsAngularVelocity(): mw.Vector;
        /**
         * @description 设置需要叠加的角速度(仅开启模拟时生效)
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:物理角速度大小
         */
        set physicsAngularVelocity(value: mw.Vector);
        /**
         * @description 获取质心偏移
         * @description 质心是物体质量的中心，对质心进行偏移时，会影响物体在运动时的形态，但不会影响物体自身的变换
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 质心偏移
         */
        get centerOfMass(): mw.Vector;
        /**
         * @description 设置质心偏移
         * @description 质心是物体质量的中心，对质心进行偏移时，会影响物体在运动时的形态，但不会影响物体自身的变换
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:质心偏移
         */
        set centerOfMass(value: mw.Vector);
        /**
         * @description 获取是否模拟物理
         * @effect 调用端生效
         * @returns 物理模拟启用状态
         */
        get physicsEnabled(): boolean;
        /**
         * @description 设置模拟物理状态
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:物理模拟状态
         */
        set physicsEnabled(value: boolean);
        /**
         * @description 获取物理材质启用状态
         * @effect 调用端生效
         * @returns 物理材质启用状态
         */
        get physicsMaterial(): boolean;
        /**
         * @description 设置物理材质启用状态
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:物理材质启用状态
         */
        set physicsMaterial(value: boolean);
        /**
         * @description 获取对应的碰撞组
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 对应碰撞组
         */
        get collisionGroup(): string;
        /**
         * @description 设置碰撞组
         * @author hao.huang
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:碰撞组
         */
        set collisionGroup(value: string);
        /**
         * @description 获取是否开启阴影
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 阴影开启状态
         */
        get castShadow(): boolean;
        /**
         * @description 设置阴影开启状态
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:阴影开启状态
         */
        set castShadow(value: boolean);
        /**
         * @description 获取是否使用质量
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 是否使用质量
         */
        get massEnabled(): boolean;
        /**
         * @description 设置是否启用质量
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:是否启用质量
         */
        set massEnabled(value: boolean);
        /**
         * @description 获取是否启用重力
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 重力是否启用
         */
        get gravityEnabled(): boolean;
        /**
         * @description 设置是否启用重力
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:重力是否启用
         */
        set gravityEnabled(value: boolean);
        /**
         * @description 获取质量大小
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 质量大小
         */
        get mass(): number;
        /**
         * @description 设置质量大小
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:质量大小
         */
        set mass(value: number);
        /**
         * @description 获取密度大小
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 密度大小
         */
        get density(): number;
        /**
         * @description 设置密度大小
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:密度大小
         */
        set density(value: number);
        /**
         * @description 获取摩擦力大小
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 摩擦力大小
         */
        get friction(): number;
        /**
         * @description 设置摩擦力大小
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:摩擦力大小
         */
        set friction(value: number);
        /**
         * @description 获取弹力大小
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 弹力大小
         */
        get restitution(): number;
        /**
         * @description 设置弹力大小
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:弹力大小
         */
        set restitution(value: number);
        /**
         * @description 获取线性阻尼
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 线性阻尼大小
         */
        get linerDamping(): number;
        /**
         * @description 设置线性阻尼
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:线性阻尼大小
         */
        set linerDamping(value: number);
        /**
         * @description 角阻尼
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 角阻尼大小
         */
        get angularDamping(): number;
        /**
         * @description 设置角阻尼
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:角阻尼大小
         */
        set angularDamping(value: number);
        /**
         * @description 获取是否约束位置X
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 是否约束位置X
         */
        get lockPositionX(): boolean;
        /**
        * @description 设置是否约束位置X
         * @groups 玩法/物理
         * @effect 调用端生效
        * @param value usage:是否约束位置X
        */
        set lockPositionX(value: boolean);
        /**
         * @description 获取是否约束位置Y
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 是否约束位置Y
         */
        get lockPositionY(): boolean;
        /**
         * @description 设置是否约束位置Y
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:是否约束位置Y
         */
        set lockPositionY(value: boolean);
        /**
         * @description 获取是否约束位置Z
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 是否约束位置Z
         */
        get lockPositionZ(): boolean;
        /**
         * @description 设置是否约束位置Z
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:是否约束位置Z
         */
        set lockPositionZ(value: boolean);
        /**
         * @description 获取是否约束旋转X
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 是否约束旋转X
         */
        get lockRotationX(): boolean;
        /**
         * @description 设置是否约束旋转X
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:是否约束旋转X
         */
        set lockRotationX(value: boolean);
        /**
         * @description 获取是否约束旋转Y
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 是否约束旋转Y
         */
        get lockRotationY(): boolean;
        /**
         * @description 设置是否约束旋转Y
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:是否约束旋转Y
         */
        set lockRotationY(value: boolean);
        /**
         * @description 获取是否约束旋转Z
         * @groups 玩法/物理
         * @effect 调用端生效
         * @returns 是否约束旋转Z
         */
        get lockRotationZ(): boolean;
        /**
         * @description 设置是否约束旋转Z
         * @groups 玩法/物理
         * @effect 调用端生效
         * @param value usage:是否约束旋转Z
         */
        set lockRotationZ(value: boolean);
        /**
         * @description 获取模型单层透明度
         * @effect 调用端生效
         * @returns 获取透明度
         */
        get opacity(): number;
        /**
         * @description 设置模型单层透明度
         * @effect 调用端生效
         * @param value usage:透明度[0,1]
         */
        set opacity(value: number);
        /**
         * @description Model颜色
         * @effect 调用端生效
         * @returns Model颜色
         */
        get color(): mw.LinearColor;
        /**
         * @description 设置Model的颜色
         * @effect 调用端生效
         * @param value Model颜色
         */
        set color(value: mw.LinearColor);
        /**
         * @description 设置对象描边及描边颜色。
         * @effect 调用端生效
         * @param enabled usage: 是否开启描边
         * @param color usage: 设置描边颜色，与后处理中颜色Index对应，-1为无颜色 default:mw.LinearColor.black
         * @param width usage: 设置描边宽度 default:2  range: [0, 4]  type: 浮点数
         */
        setPostProcessOutline(enabled: boolean, color?: mw.LinearColor, width?: number): void;
        /**
         * @description 设置对象描边及描边颜色
         * @description 需要场景中存在后处理对象。
         * @effect 调用端生效
         * @param enabled usage: 是否开启描边
         * @param color usage: 设置描边颜色，与后处理中颜色 Index 对应，-1为无颜色。  default: mw.LinearColor.black
         * @param width usage: 设置描边宽度 default:2  range:[0, 100]  type: 浮点数
         */
        setOutline(enabled: boolean, color?: mw.LinearColor, width?: number): void;
        /**
         * @description 设置静态网格资源
         * @effect 调用端生效
         * @param InAssetGuid usage: 资源GUID range: 字符串长度依据资源 ID 长度而定
         */
        setStaticMeshAsset(InAssetGuid: string): void;
        /**
         * @description 还原物体材质
         * @effect 调用端生效
         * @param index usage: 材质索引序号 type: Integer default: undefined range: 无
         */
        resetMaterial(index?: number): void;
        /**
         * @description 设置物体材质
         * @effect 调用端生效
         * @param MaterialGUID usage: 材质 ID default: null range:  字符串长度依据材质资源 ID 长度而定
         */
        setMaterial(MaterialGUID: string): void;
        /**
         * @description 设置物体材质
         * @effect 调用端生效
         * @param MaterialGUID usage: 材质 ID  range:  字符串长度依据材质资源 ID 长度而定
         * @param index usage: 材质下标  range: 依据材质 ID 长度而定  type:整数
         */
        setMaterial(MaterialGUID: string, index: number): void;
        /**
         * @description 创建材质实例
         * @effect 调用端生效
         * @param Index usage:第几个材质 <br> range: 不超过材质数 type: 整形
         */
        createMaterialInstance(Index: number): void;
        /**
         * @description 与玩家之间超出此距离的对象将被剪裁
         * @description 最终的裁剪距离会和画质等级有关；修改此属性 ≤0 时，裁剪距离会根据对象尺寸自动调整 (自动启用 CullDistanceVolume 功能)
         * @effect 只在客户端调用生效
         * @precautions 最终的裁剪距离会和画质等级有关
         * @param inCullDistance usage:裁剪距离 range: 建议 (2000, 4000)  type: 浮点数
         */
        setCullDistance(inCullDistance: number): void;
        /** @description 模型是否与其它对象进行碰撞交互。当值为false时，其它对象可以穿过模型而不被其阻挡。
         * @effect 调用端生效
         * @precautions 建议双端物体设置碰撞，单端物体设置碰撞可能会导致拉扯的情况
         * @param status usage: 是否与其它对象进行碰撞交互
         * @example
         * 使用示例:
         * 在场景中拖入一个方块，并创建一个名为Collision的脚本挂载在该方块下，并复制以下代码进入脚本。
         * 预期效果：进入游戏按1键，角色可以穿过方块，再按1键，角色无法穿过方块。
         * ```ts
         * @Component
         * export default class Collision extends Script {
         *     protected onStart(): void {
         *
         *         if ( SystemUtil.isClient() ) {
         *
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 this.serverSetCollisionEnabled();
         *             })
         *
         *         }
         *     }
         *
         *     @RemoteFunction(Server)
         *     serverSetCollisionEnabled() {
         *         let model = this.gameObject as Model;
         *         model.collisionEnabled = !model.collisionEnabled;
         *     }
         * }
         * ```
         */
        set collisionEnabled(status: boolean);
        /**
         * @description 是否开启碰撞
         * @effect 调用端生效
         * @returns 是否开启碰撞
         */
        get collisionEnabled(): boolean;
        /** @description 在空间查询模型是否纳入检测范围。当值为false时，不会被空间查询检测到。
         * @effect 调用端生效
         * @param status usage: 在空间查询模型是否纳入检测范围。
         * @example
         * 使用示例:
         * 在场景中拖入一个方块，并创建一个名为Query的脚本挂载在该方块下，并复制以下代码进入脚本。
         * 预期效果：按下1生成特效，被空间查询检测到，再按下1，特效被删除，没有被空间查询检测到。
         * ```ts
         * @Component
         * export default class Query extends Script {
         *     effect : Effect
         *
         *     protected onStart(): void {
         *         if ( SystemUtil.isClient() ) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 this.serverSetQueryEnabled();
         *             })
         *         }
         *     }
         *
         *     @RemoteFunction(Server)
         *     async serverSetQueryEnabled() {
         *         let model = this.gameObject as Model;
         *
         *         let hitGameObjects = PhysicsService.sphereOverlap(this.gameObject.worldTransform.position, 30, {}, {});
         *         if (hitGameObjects.length > 0) {
         *             const success = await AssetUtil.asyncDownloadAsset("4391");
         *             if (success) {
         *                 const transform = model.worldTransform.clone();
         *                 transform.position.add(new Vector(0, 0, 150));
         *
         *                 GameObject.asyncSpawn("4391", {
         *                     replicates: true,
         *                     transform: transform
         *                 }).then((effect : Effect) => {
         *                     this.effect = effect
         *                     // 播放特效
         *                     effect.play();
         *                 });
         *             }
         *         }
         *         else {
         *             this.effect.destroy();
         *             this.effect = undefined;
         *         }
         *
         *         model.queryEnabled = !model.queryEnabled;
         *     }
         * }
         * ```
         */
        set queryEnabled(status: boolean);
        /**
         * @description 是否开启空间查询
         * @effect 调用端生效
         * @returns 是否开启空间查询
         */
        get queryEnabled(): boolean;
        /** @description Touched和TouchEnded事件是否在模型上触发。当值为false时，对象在进行交互时不会抛出touch事件。
         * @effect 调用端生效
         * @param status usage: Touched和TouchEnded事件是否在模型上触发。
         * @example
         * 使用示例:
         * 在场景中拖入一个方块，并创建一个名为Touch的脚本挂载在该方块下，并复制以下代码进入脚本。
         * 预期效果：角色走入方块，生成特效，走出方块，特效消失。按下1，角色走入走出方块无任何变化。
         * ```ts
         * @Component
         * export default class Touch extends Script {
         *     effect : Effect
         *
         *     protected onStart(): void {
         *         if ( SystemUtil.isClient() ) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 this.serverSetTouchEnabled();
         *             })
         *         }
         *
         *         if ( SystemUtil.isServer() ) {
         *             let model = this.gameObject as Model;
         *             model.collisionEnabled = false;
         *             model.onTouch.add(async () => {
         *                 const success = await AssetUtil.asyncDownloadAsset("4391");
         *                 if (success) {
         *                     const transform = model.worldTransform.clone();
         *                     transform.position.add(new Vector(0, 0, 150));
         *
         *                     GameObject.asyncSpawn("4391", {
         *                         replicates: true,
         *                         transform: transform
         *                     }).then((effect : Effect) => {
         *                         this.effect = effect
         *                         // 播放特效
         *                         effect.play();
         *                     });
         *                 }
         *             });
         *             model.onTouchEnd.add(() => {
         *                 if (this.effect != undefined) {
         *                     this.effect.destroy();
         *                     this.effect = undefined;
         *                 }
         *             });
         *         }
         *     }
         *
         *     @RemoteFunction(Server)
         *     async serverSetTouchEnabled() {
         *         let model = this.gameObject as Model;
         *         model.touchEnabled = !model.touchEnabled;
         *     }
         * }
         * ```
         */
        set touchEnabled(status: boolean);
        /**
         * @description Touched和TouchEnded事件是否在模型上触发。
         * @effect 调用端生效
         * @returns Touched和TouchEnded事件是否在模型上触发。
         */
        get touchEnabled(): boolean;
        /** @description 设置碰撞状态
         * @effect 调用端生效
         * @precautions 建议双端物体设置碰撞，单端物体设置碰撞可能会导致拉扯的情况
         * @param status usage: 碰撞状态（Type.CollisionStatus 或者 mw.PropertyStatus）
         * @param propagateToChildren usage: 是否传递给子节点 default: false
         */
        setCollision(status: mw.PropertyStatus | mw.CollisionStatus, propagateToChildren?: boolean): void;
        /**
         * @description 返回碰撞状态
         * @effect 调用端生效
         * @returns 碰撞状态
         */
        getCollision(): mw.PropertyStatus | mw.CollisionStatus;
        /**
         * @author qiming.jiang
         * @description 获取所有材质插槽
         * @effect 调用端生效
         * @returns 返回材质插槽数组
         */
        getAllMaterialSlots(): Array<MaterialSlot>;
        /**
         * @author qiming.jiang
         * @description 获取指定索引的材质插槽
         * @effect 调用端生效
         * @param index 材质插槽索引 type: Integer usage: 索引 range: 无
         * @returns 返回指定索引的材质插槽
         */
        getMaterialSlot(index: number): MaterialSlot;
        /**
         * @author xinlei.nie
         * @description 设置模型碰撞是否影响动态寻路的导航数据
         * @effect 调用端生效，服务端自动同步
         * @param bInStatus usage:是否影响导航数据
         */
        set canAffectNavigation(bInStatus: boolean);
        /**
         * @author xinlei.nie
         * @description 获取模型碰撞是否影响动态寻路的导航数据
         * @returns 是否影响导航数据
         */
        get canAffectNavigation(): boolean;
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
    // @ts-ignore
    import * as UE from "ue";
    /**
     * @author guang.dong
     * @groups 角色系统
     * @networkStatus usage:双端
     * @description PlayerState基类
     * @example
     * 使用示例: 创建一个名为"PlayerStateExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存。把启动参数的玩家数量改为2，运行游戏按下R键将看到其中一个客户端收到test同步。按下P键将打印客户端的test值.
     * ```ts
     *   // 服务端每个玩家进入游戏时会自动创建一个实例
     *   export class GamePlayerState extends mw.PlayerState {
     *
     *       @Property({replicated: true, onChanged: "onRepTest"})
     *       test = "";
     *
     *       onRepTest(path: string[], value: string, oldVal: string) {
     *           console.log(`onRepTest path: ${path} value: ${value} oldVal: ${oldVal}`);
     *       }
     *   }
     *
     *   @Component
     *   export default class PlayerStateExample extends mw.Script {
     *
     *       protected onStart(): void {
     *
     *           // 按下R建在服务端随机一个玩家修改GamePlayerState的test属性
     *           InputUtil.onKeyDown(Keys.R, () => this.random());
     *
     *           // 按下P建打印主控端玩家GamePlayState的test属性
     *           InputUtil.onKeyDown(Keys.P, () => {
     *               const playerState = Player.localPlayer.getPlayerState(GamePlayerState);
     *               console.log(`test: ${playerState.test}`);
     *           });
     *
     *       }
     *
     *       @RemoteFunction(Server)
     *       random() {
     *           const players = Player.getAllPlayers();
     *           // 随机一个玩家
     *           const luckPlayer = players[Math.floor(Math.random() * players.length)];
     *           // 获取到GamePlayerState实例
     *           const playerState = luckPlayer.getPlayerState(GamePlayerState);
     *           playerState.test = `random: ${ Math.floor(Math.random() * 100)}`;
     *       }
     *   }
     * ```
     */
    class PlayerState extends mw.Script {
        /**
         * @hidden
         */
        constructor(info: UE.MWActorScriptComponent);
        get gameObject(): mw.GameObject;
        set gameObject(gameObject: mw.GameObject);
        destroy(): void;
    }
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @description 碰撞检测通道
     * @groups 玩法/物理
     */
    enum ObjectTypeQuery {
        /** 检测通道1 */
        ObjectTypeQuery1 = 0,
        /** 检测通道2 */
        ObjectTypeQuery2 = 1,
        /** 检测通道3 */
        ObjectTypeQuery3 = 2,
        /** 检测通道4 */
        ObjectTypeQuery4 = 3,
        /** 检测通道5 */
        ObjectTypeQuery5 = 4,
        /** 检测通道6 */
        ObjectTypeQuery6 = 5,
        /** 检测通道7 */
        ObjectTypeQuery7 = 6,
        /** 检测通道8 */
        ObjectTypeQuery8 = 7,
        /** 检测通道9 */
        ObjectTypeQuery9 = 8,
        /** 检测通道10 */
        ObjectTypeQuery10 = 9,
        /** 检测通道11 */
        ObjectTypeQuery11 = 10,
        /** 检测通道12 */
        ObjectTypeQuery12 = 11,
        /** 检测通道13 */
        ObjectTypeQuery13 = 12,
        /** 检测通道14 */
        ObjectTypeQuery14 = 13,
        /** 检测通道15 */
        ObjectTypeQuery15 = 14,
        /** 检测通道16 */
        ObjectTypeQuery16 = 15,
        /** 检测通道17 */
        ObjectTypeQuery17 = 16,
        /** 检测通道18 */
        ObjectTypeQuery18 = 17,
        /** 检测通道19 */
        ObjectTypeQuery19 = 18,
        /** 检测通道20 */
        ObjectTypeQuery20 = 19,
        /** 检测通道21 */
        ObjectTypeQuery21 = 20,
        /** 检测通道22 */
        ObjectTypeQuery22 = 21,
        /** 检测通道23 */
        ObjectTypeQuery23 = 22,
        /** 检测通道24 */
        ObjectTypeQuery24 = 23,
        /** 检测通道25 */
        ObjectTypeQuery25 = 24,
        /** 检测通道26 */
        ObjectTypeQuery26 = 25,
        /** 检测通道27 */
        ObjectTypeQuery27 = 26,
        /** 检测通道28 */
        ObjectTypeQuery28 = 27,
        /** 检测通道29 */
        ObjectTypeQuery29 = 28,
        /** 检测通道30 */
        ObjectTypeQuery30 = 29,
        /** 检测通道31 */
        ObjectTypeQuery31 = 30,
        /** 检测通道32 */
        ObjectTypeQuery32 = 31
    }
    /**
     * @author xiangkun.sun
     * @groups 工具/射线检测
     * @description 命中结果，包含关于轨迹的一次命中的信息，例如撞击点和该点的表面法线。
     * @networkStatus usage:双端
     * @example
     * 使用示例:创建一个名为"HitResultExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，并在场景中创建一个模型放置在200, 10, 0的位置，运行游戏，你将在日志中看到射线检测到的HitResult信息数组。代码如下：
     * ```
     * const result = QueryUtil.lineTrace(new Vector(100), new Vector(1000), true, true);
     * @Component
     * export default class HitResultExample extends Script {
     *
     *     protected onStart(): void {
     *         if (this.isRunningClient()) {
     *             // 开始位置
     *             let startLocation = new Vector(100, 10, 100);
     *             // 结束位置
     *             let endLocation = new Vector(1000, 10, 100);
     *             // 返回的HitResult数组
     *             const result = QueryUtil.lineTrace(startLocation, endLocation, true, true);
     *             result.forEach(element => {
     *                 // 通过HitResult访问返回值gameObject的名字
     *                 console.log(`命中GameObject的名字: ${element.gameObject.name}`);
     *             });
     *         }
     *     }
     * }
     * ```
     */
    class HitResult {
        /**
         * @description 是否击中了物体，如果发生了碰撞则为 true, 否则为 false
         */
        blockingHit: boolean;
        /**
         * @description 这是沿追踪方向的命中时间，范围介于[0.0到1.0]之间。如未命中，将返回1.0。
         */
        time: number;
        /**
         * @description 距离，traceStart到location的距离
         */
        distance: number;
        /**
         * @description 世界空间中的位置，如果发生碰撞，移动的形状将最终抵靠受影响的对象。等于线路测试的冲击点。示例：对于球体跟踪测试，这是当球体接触其他对象时，球体中心所在的点。对于扫掠移动（但不是查询），这可能不等于形状的最终位置，因为命中会稍微向后拉，以防止精度问题与另一个曲面重叠。
         */
        position: mw.Vector;
        /**
         * @description 轨迹形状（长方体、球体、光线等）与受影响对象的实际接触在世界空间中的位置。示例：对于球体跟踪测试，这是球体表面接触其他对象的点。
         */
        impactPoint: mw.Vector;
        /**
         * @description 世界空间中被扫过的物体的法线。等于线路测试的ImpactNormal。这是为胶囊和球体计算的，否则将与ImpactNormal相同。示例：对于球体轨迹测试，这是指向撞击点处球体中心的归一化矢量。
         */
        normal: mw.Vector;
        /**
         * @description 世界空间中被扫掠击中的对象（如果有）的法线。例如，如果球体撞击平面，这是一个从平面指向的规范化向量。在与曲面的角或边碰撞的情况下，通常选择“最相反”的法线（与查询方向相反）。
         */
        impactNormal: mw.Vector;
        /**
         * @description 碰撞检测的起点位置
         */
        traceStart: mw.Vector;
        /**
         * @description 碰撞检测的终点位置
         */
        traceEnd: mw.Vector;
        /**
         * @description 碰撞的骨骼名称
         */
        boneName: string;
        /**
         * @description 命中的GameObject
         */
        gameObject: mw.GameObject;
    }
    /**
     * @author baoqiang.han
     * @groups 玩法
     * @description 振动开关
     * @param enable usage:-true:开启震动，-false:关闭震动
     * @effect 只在客户端调用生效
     */
    function vibrate(enable: boolean): void;
    /**
     * @author hongbing.deng
     * @description 录屏
     * @groups 工具
     * @effect 只在客户端调用生效
     * @param screenX usage: 屏幕左上角 X 值  <br> default: null 必填参数   <br> range: 不限制   <br> type: 浮点数
     * @param screenY usage: 屏幕左上角 Y 值  <br> default: null 必填参数   <br> range: 不限制   <br> type: 浮点数
     * @param screenW usage: 录制图像宽度  <br> default: null 必填参数   <br> range: 不限制   <br> type: 浮点数
     * @param screenH usage: 录制图像高度  <br> default: null 必填参数   <br> range: 不限制   <br> type: 浮点数
     * @returns mp4 文件路径。文件路径固定，不同平台路径会有些许差别。
     */
    function startRecord(screenX: number, screenY: number, screenW: number, screenH: number): string;
    /**
     * @author hongbing.deng
     * @description 停止录屏
     * @groups 工具
     * @effect 只在客户端调用生效
     */
    function stopRecord(): void;
    /**
     * @author xinlei.nie
     * @groups 角色系统/角色
     * @description 获取强制更新移动时检测到的碰撞结果
     * @effect 调用端生效
     * @param character usage: 需要获取碰撞结果的角色 <br> default: null 必填参数   <br> type: Character
     * @returns 强制移动检测到的碰撞数据
     */
    function getForcedMovementHits(character: mw.Character): Array<HitResult>;
}

declare namespace mw {
    /**
     * @author jiamin.guo
     * @groups 动画
     * @description 动画
     * @description -------------------------
     * @description 动画是指通过一系列连续的图像或模型变化来模拟物体或角色的运动和行为。当你在玩一个角色扮演游戏，你控制的角色需要行走、跳跃、攻击等。这些动作都是通过动画来实现的。
     * @description 如何使用 Animation ？
     * @description - 想要播放一个动画资源， 需要执行 Character 中 loadAnimation 方法, 下载并加载一个动画资源。
     * @description - loop 、length、speed 属性修改动画姿态对象；调用 play 方法, 播放这个动画资源。
     * @description - 停止一个动画对象, 可以直接对动画对象调用 stop 。
     * @description - 在播放步骤中, 你可以在调用 play 函数前给动画对象使用 onFinished 委托添加一个回调函数。因为动画的播放仅在客户端进行, 所以播放完成回调只会在客户端触发. 播放完成回调只会在动画自然播放完成后触发, 在动画播放途中调用stop(), 或者播放其他动画打断当前正在播放的动画均不会触发播放完成回调。
     * @description 我应该在客户端还是服务器上加载动画 ？
     * @description - 在调用 play 时, 会自动根据当前角色的网络状态及所处的端判断是否进行网络同步。
     * @description - 如果角色在服务端, 则在所有客户端执行动画播放（动画首先在服务器上创建并复制到客户端）;
 如果角色在客户端, 则直接在本地播放动画。
     * @precautions 请不要直接使用new创建，loadAnimation 可以返回动画， 以进行更加精细的动画控制。
     * @networkStatus usage:客户端
     */
    class Animation {
        /**
         * @groups 动画
         * @description 获取动画资源ID。目前是动画资源在编辑器左侧栏中，由美术创作者上传，鼠标指向可看到动画的GUID。
         * @description 之后会开启开发者上传其制作的动画资源通道，将其上传到MW编辑器后，可以使用自己上传的动画资源。
         * @effect 调用端生效
         * @networkStatus usage:双端
         */
        get assetId(): string;
        /**
         * @groups 动画
         * @description 获取动画时长。当前动画对象中关联的动画的时长以秒为单位。
         * @example
         * 使用示例:将使用到的资源:"14700,20380"拖入优先加载栏。创建一个名为"Example_Animation_Length"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载舞蹈动画，并修改循环次数为10，播放速度为2倍。给【动画完成】委托添加函数，播放一个升级特效。按下键盘“1”， 开始播放动画。按下键盘“2”， 暂停播放动画。按下键盘“3”， 继续播放动画。按下键盘“4”， 停止播放动画。代码如下：
         * ```
         * @Component
         * export default class Example_Animation_Length extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个舞蹈动画
         *             let danceAnimation = myCharacter.loadAnimation("14700");
         *             // 动画的属性
         *             console.log("动画时长 " + danceAnimation.length);
         *             // 循环播放10次
         *             danceAnimation.loop = 10;
         *             // 2倍播放速度
         *             danceAnimation.speed = 2;
         *             // 给【动画完成】委托添加函数，播放一个升级特效
         *             danceAnimation.onFinish.add(() => {
         *                 EffectService.playOnGameObject("20380", myCharacter, {slotType: HumanoidSlotType.Root});
         *             });
         *             // 添加一个按键方法:按下键盘“1”，开始播放
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 danceAnimation.play();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，暂停播放
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 danceAnimation.pause();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“3”，继续播放
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 danceAnimation.resume();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，停止播放
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 danceAnimation.stop();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get length(): number;
        /**
         * @groups 动画
         * @description 获取动画播放循环次数。
         * @description 当 loop 设置为 0 时，可无限循环播放。
         * @description 设置完成时，调用 Play() 函数即可看到角色播放动画。
         * @effect 调用端生效
         * @example
         * 使用示例:将使用到的资源:"14700,20380"拖入优先加载栏。创建一个名为"Example_Animation_Loop"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载舞蹈动画，并修改循环次数为10，播放速度为2倍。给【动画完成】委托添加函数，播放一个升级特效。按下键盘“1”， 开始播放动画。按下键盘“2”， 暂停播放动画。按下键盘“3”， 继续播放动画。按下键盘“4”， 停止播放动画。代码如下：
         * ```
         * @Component
         * export default class Example_Animation_Loop extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个舞蹈动画
         *             let danceAnimation = myCharacter.loadAnimation("14700");
         *             // 动画的属性
         *             console.log("动画时长 " + danceAnimation.length);
         *             // 循环播放10次
         *             danceAnimation.loop = 10;
         *             // 2倍播放速度
         *             danceAnimation.speed = 2;
         *             // 给【动画完成】委托添加函数，播放一个升级特效
         *             danceAnimation.onFinish.add(() => {
         *                 EffectService.playOnGameObject("20380", myCharacter, {slotType: HumanoidSlotType.Root});
         *             });
         *             // 添加一个按键方法:按下键盘“1”，开始播放
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 danceAnimation.play();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，暂停播放
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 danceAnimation.pause();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“3”，继续播放
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 danceAnimation.resume();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，停止播放
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 danceAnimation.stop();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get loop(): number;
        /**
         * @groups 动画
         * @description 设置动画的播放循环次数.
         * @effect 调用端生效
         * @networkStatus usage:双端
         */
        set loop(loopCount: number);
        /**
         * @groups 动画
         * @description 设置动画的播放速率
         * @effect 调用端生效
         * @precautions 设置播放速率(动画切换时有融合时间,动画太短，当speed=1时 动画可能不明显) ,数值无范围限制，速率的符号表示播放方向，正表示正向播放，
         * 负表示逆向播放, speed为1表示原始速率,默认值为1。设置该值不会改变播放的起点.
         * @networkStatus usage:双端
         */
        set speed(speed: number);
        /**
         * @groups 动画
         * @description 获取动画的播放速率
         * @effect 调用端生效
         * @precautions 设置播放速率(动画切换时有融合时间,动画太短，当speed=1时 动画可能不明显) ,数值无范围限制，速率的符号表示播放方向，正表示正向播放，
         * 负表示逆向播放, speed为1表示原始速率,默认值为2。设置该值不会改变播放的起点.
         * @example
         * 使用示例:将使用到的资源:"14700,20380"拖入优先加载栏。创建一个名为"Example_Animation_Speed"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载舞蹈动画，并修改循环次数为10，播放速度为2倍。给【动画完成】委托添加函数，播放一个升级特效。按下键盘“1”， 开始播放动画。按下键盘“2”， 暂停播放动画。按下键盘“3”， 继续播放动画。按下键盘“4”， 停止播放动画。代码如下：
         * ```
         * @Component
         * export default class Example_Animation_Speed extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个舞蹈动画
         *             let danceAnimation = myCharacter.loadAnimation("14700");
         *             // 动画的属性
         *             console.log("动画时长 " + danceAnimation.length);
         *             // 循环播放10次
         *             danceAnimation.loop = 10;
         *             // 2倍播放速度
         *             danceAnimation.speed = 2;
         *             // 给【动画完成】委托添加函数，播放一个升级特效
         *             danceAnimation.onFinish.add(() => {
         *                 EffectService.playOnGameObject("20380", myCharacter, {slotType: HumanoidSlotType.Root});
         *             });
         *             // 添加一个按键方法:按下键盘“1”，开始播放
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 danceAnimation.play();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，暂停播放
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 danceAnimation.pause();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“3”，继续播放
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 danceAnimation.resume();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，停止播放
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 danceAnimation.stop();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get speed(): number;
        /**
         * @groups 动画
         * @description 是否播放
         * @description 在服务端调用不生效。
         * @effect 调用端生效
         * @description true表示动画对象的正在播放，false表示动画对象未播放。
         * @example
         * 使用示例:将使用到的资源:"14700,20380"拖入优先加载栏。创建一个名为"Example_Animation_IsPlaying"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载舞蹈动画，并修改循环次数为10，播放速度为2倍。给【动画完成】委托添加函数，播放一个升级特效。按下键盘“1”， 开始播放动画。按下键盘“2”， 暂停播放动画。按下键盘“3”， 继续播放动画。按下键盘“4”， 停止播放动画。代码如下：
         * ```
         * @Component
         * export default class Example_Animation_IsPlaying extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个舞蹈动画
         *             let danceAnimation = myCharacter.loadAnimation("14700");
         *             // 动画的属性
         *             console.log("动画时长 " + danceAnimation.length);
         *             // 循环播放10次
         *             danceAnimation.loop = 10;
         *             // 2倍播放速度
         *             danceAnimation.speed = 2;
         *             // 给【动画完成】委托添加函数，播放一个升级特效
         *             danceAnimation.onFinish.add(() => {
         *                 EffectService.playOnGameObject("20380", myCharacter, {slotType: HumanoidSlotType.Root});
         *             });
         *             // 添加一个按键方法:按下键盘“1”，开始播放
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 danceAnimation.play();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，暂停播放
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 danceAnimation.pause();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“3”，继续播放
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 danceAnimation.resume();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，停止播放
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 danceAnimation.stop();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get isPlaying(): boolean;
        /**
         * @groups 动画
         * @description 获取动画播放插槽
         */
        get slot(): mw.AnimSlot;
        /**
         * @groups 动画
         * @description 设置动画播放插槽
         */
        set slot(animslot: mw.AnimSlot);
        /**
         * @groups 动画
         * @description 获取动画混出时间
         */
        get blendOutMode(): mw.AnimationBlendMode;
        /**
         * @groups 动画
         * @description 设置动画混出时间
         */
        set blendOutMode(mode: mw.AnimationBlendMode);
        /**
         * @groups 动画
         * @description 获取动画混出时间
         */
        get blendInMode(): mw.AnimationBlendMode;
        /**
         * @groups 动画
         * @description 设置动画混出时间 AlphaBlendOption
         */
        set blendInMode(mode: mw.AnimationBlendMode);
        /**
        * @groups 动画
        * @description 获取动画混出时间
        */
        get blendOutTime(): number;
        /**
         * @groups 动画
         * @description 设置动画混出时间
         */
        set blendOutTime(time: number);
        /**
         * @groups 动画
         * @description 获取动画混出时间
         */
        get blendInTime(): number;
        /**
         * @groups 动画
         * @description 设置动画混出时间
         */
        set blendInTime(time: number);
        /**
         * @groups 动画
         * @description 获取动画开始时间
         * @effect 调用端生效
         * @example
         * 使用示例:将使用到的资源:"14700,20380"拖入优先加载栏。创建一个名为"Example_Animation_Loop"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载舞蹈动画，并修改循环次数为10，播放速度为2倍。给【动画完成】委托添加函数，播放一个升级特效。按下键盘“1”， 开始播放动画。按下键盘“2”， 暂停播放动画。按下键盘“3”， 继续播放动画。按下键盘“4”， 停止播放动画。代码如下：
         * ```
         * @Component
         * export default class Example_Animation_Loop extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个舞蹈动画
         *             let danceAnimation = myCharacter.loadAnimation("14700");
         *             // 动画的属性
         *             console.log("动画时长 " + danceAnimation.length);
         *             // 循环播放10次
         *             danceAnimation.loop = 10;
         *             // 2倍播放速度
         *             danceAnimation.speed = 2;
         *              //从动画一半开始播放
         *              danceAnimation.startTime = danceAnimation.length * 0.5
         *             // 给【动画完成】委托添加函数，播放一个升级特效
         *             danceAnimation.onFinish.add(() => {
         *                 EffectService.playOnGameObject("20380", myCharacter, {slotType: HumanoidSlotType.Root});
         *                 console.log("动画开始点 = " + danceAnimation.startTime);
         *             });
         *             // 添加一个按键方法:按下键盘“1”，开始播放
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 danceAnimation.play();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，暂停播放
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 danceAnimation.pause();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“3”，继续播放
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 danceAnimation.resume();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，停止播放
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 danceAnimation.stop();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get startTime(): number;
        /**
         * @groups 动画
         * @description 设置动画的开始点时间
         * @effect 调用端生效
         * @precautions 最终生效范围[0,动画长度]
         * @networkStatus usage:双端
         */
        set startTime(time: number);
        /**
         * @groups 动画
         * @description 播放结束委托。
         * @description 动画播放结束时(在动画不被中断且正常播放完成情况下)执行绑定函数。
         * @effect 只在客户端调用生效
         * @precautions 性能限制，服务器不播放动画，仅客户端触发，请在客户端使用该委托。有几种情况下不会触发该委托 1 调用pause方法 2 调用stop方法 3 该动画正在播放，调用play接口。
         * @example
         * 使用示例:将使用到的资源:"14700,20380"拖入优先加载栏。创建一个名为"Example_Animation_OnFinish"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载舞蹈动画，并修改循环次数为10，播放速度为2倍。给【动画完成】委托添加函数，播放一个升级特效。按下键盘“1”， 开始播放动画。按下键盘“2”， 暂停播放动画。按下键盘“3”， 继续播放动画。按下键盘“4”， 停止播放动画。代码如下：
         * ```
         * @Component
         * export default class Example_Animation_OnFinish extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个舞蹈动画
         *             let danceAnimation = myCharacter.loadAnimation("14700");
         *             // 动画的属性
         *             console.log("动画时长 " + danceAnimation.length);
         *             // 循环播放10次
         *             danceAnimation.loop = 10;
         *             // 2倍播放速度
         *             danceAnimation.speed = 2;
         *             // 给【动画完成】委托添加函数，播放一个升级特效
         *             danceAnimation.onFinish.add(() => {
         *                 EffectService.playOnGameObject("20380", myCharacter, {slotType: HumanoidSlotType.Root});
         *             });
         *             // 添加一个按键方法:按下键盘“1”，开始播放
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 danceAnimation.play();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，暂停播放
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 danceAnimation.pause();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“3”，继续播放
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 danceAnimation.resume();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，停止播放
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 danceAnimation.stop();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get onFinish(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 动画
         * @description 播放动画。从动画资源的起点播放动画。生效范围与角色创建方式绑定。
         * @effect 调用端生效
         * @returns 播放结果
         * @example
         * 使用示例:将使用到的资源:"14700,20380"拖入优先加载栏。创建一个名为"Example_Animation_Play"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载舞蹈动画，并修改循环次数为10，播放速度为2倍。给【动画完成】委托添加函数，播放一个升级特效。按下键盘“1”， 开始播放动画。按下键盘“2”， 暂停播放动画。按下键盘“3”， 继续播放动画。按下键盘“4”， 停止播放动画。代码如下：
         * ```
         * @Component
         * export default class Example_Animation_Play extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个舞蹈动画
         *             let danceAnimation = myCharacter.loadAnimation("14700");
         *             // 动画的属性
         *             console.log("动画时长 " + danceAnimation.length);
         *             // 循环播放10次
         *             danceAnimation.loop = 10;
         *             // 2倍播放速度
         *             danceAnimation.speed = 2;
         *             // 给【动画完成】委托添加函数，播放一个升级特效
         *             danceAnimation.onFinish.add(() => {
         *                 EffectService.playOnGameObject("20380", myCharacter, {slotType: HumanoidSlotType.Root});
         *             });
         *             // 添加一个按键方法:按下键盘“1”，开始播放
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 danceAnimation.play();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，暂停播放
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 danceAnimation.pause();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“3”，继续播放
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 danceAnimation.resume();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，停止播放
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 danceAnimation.stop();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        play(): boolean;
        /**
         * @groups 动画
         * @description 暂停动画
         * @effect 调用端生效
         * @precautions 不会触发onFinish委托。生效范围与角色创建方式绑定。
         * @returns 暂停结果
         * @example
         * 使用示例:将使用到的资源:"14700,20380"拖入优先加载栏。创建一个名为"Example_Animation_Pause"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载舞蹈动画，并修改循环次数为10，播放速度为2倍。给【动画完成】委托添加函数，播放一个升级特效。按下键盘“1”， 开始播放动画。按下键盘“2”， 暂停播放动画。按下键盘“3”， 继续播放动画。按下键盘“4”， 停止播放动画。代码如下：
         * ```
         * @Component
         * export default class Example_Animation_Pause extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个舞蹈动画
         *             let danceAnimation = myCharacter.loadAnimation("14700");
         *             // 动画的属性
         *             console.log("动画时长 " + danceAnimation.length);
         *             // 循环播放10次
         *             danceAnimation.loop = 10;
         *             // 2倍播放速度
         *             danceAnimation.speed = 2;
         *             // 给【动画完成】委托添加函数，播放一个升级特效
         *             danceAnimation.onFinish.add(() => {
         *                 EffectService.playOnGameObject("20380", myCharacter, {slotType: HumanoidSlotType.Root});
         *             });
         *             // 添加一个按键方法:按下键盘“1”，开始播放
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 danceAnimation.play();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，暂停播放
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 danceAnimation.pause();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“3”，继续播放
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 danceAnimation.resume();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，停止播放
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 danceAnimation.stop();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        pause(): boolean;
        /**
         * @groups 动画
         * @description 恢复播放动画
         * @effect 调用端生效
         * @precautions 从当前位置继续动画播放。生效范围与角色创建方式绑定。
         * @returns 继续结果
         * @example
         * 使用示例:将使用到的资源:"14700,20380"拖入优先加载栏。创建一个名为"Example_Animation_Resume"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载舞蹈动画，并修改循环次数为10，播放速度为2倍。给【动画完成】委托添加函数，播放一个升级特效。按下键盘“1”， 开始播放动画。按下键盘“2”， 暂停播放动画。按下键盘“3”， 继续播放动画。按下键盘“4”， 停止播放动画。代码如下：
         * ```
         * @Component
         * export default class Example_Animation_Resume extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个舞蹈动画
         *             let danceAnimation = myCharacter.loadAnimation("14700");
         *             // 动画的属性
         *             console.log("动画时长 " + danceAnimation.length);
         *             // 循环播放10次
         *             danceAnimation.loop = 10;
         *             // 2倍播放速度
         *             danceAnimation.speed = 2;
         *             // 给【动画完成】委托添加函数，播放一个升级特效
         *             danceAnimation.onFinish.add(() => {
         *                 EffectService.playOnGameObject("20380", myCharacter, {slotType: HumanoidSlotType.Root});
         *             });
         *             // 添加一个按键方法:按下键盘“1”，开始播放
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 danceAnimation.play();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，暂停播放
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 danceAnimation.pause();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“3”，继续播放
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 danceAnimation.resume();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，停止播放
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 danceAnimation.stop();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        resume(): boolean;
        /**
         * @groups 动画
         * @description 停止播放动画
         * @effect 调用端生效
         * @precautions 不触发动画结束回调。生效范围与角色创建方式绑定。
         * @returns 停止结果
         * @example
         * 使用示例:将使用到的资源:"14700,20380"拖入优先加载栏。创建一个名为"Example_Animation_Stop"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载舞蹈动画，并修改循环次数为10，播放速度为2倍。给【动画完成】委托添加函数，播放一个升级特效。按下键盘“1”， 开始播放动画。按下键盘“2”， 暂停播放动画。按下键盘“3”， 继续播放动画。按下键盘“4”， 停止播放动画。代码如下：
         * ```
         * @Component
         * export default class Example_Animation_Stop extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个舞蹈动画
         *             let danceAnimation = myCharacter.loadAnimation("14700");
         *             // 动画的属性
         *             console.log("动画时长 " + danceAnimation.length);
         *             // 循环播放10次
         *             danceAnimation.loop = 10;
         *             // 2倍播放速度
         *             danceAnimation.speed = 2;
         *             // 给【动画完成】委托添加函数，播放一个升级特效
         *             danceAnimation.onFinish.add(() => {
         *                 EffectService.playOnGameObject("20380", myCharacter, {slotType: HumanoidSlotType.Root});
         *             });
         *             // 添加一个按键方法:按下键盘“1”，开始播放
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 danceAnimation.play();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，暂停播放
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 danceAnimation.pause();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“3”，继续播放
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 danceAnimation.resume();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，停止播放
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 danceAnimation.stop();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        stop(): boolean;
    }
}

declare namespace mw {
    /**
     * @hidden
     * @author yuchen.ren
     * @groups 动画
     * @description 姿态
     * @networkStatus usage:双端
     */
    abstract class StanceBase {
    }
    /**
     * @author yuchen.ren
     * @groups 动画
     * @description 基础姿态
     * @description -------------------------
     * @description 基础姿态包含了地面, 飞行和游泳的动画状态机。当你不进行任何修改直接进入游戏时, 角色的走跑跳等各种动作都是由它表现的。
     * @description 基础姿态资源是一个外部资源，你可以在本地资源库中的基础姿态分类下查找并下载它们。
     * @description Stance 如何工作的呢？
     * @description - 想要播放基础姿态， 首先需要执行Character类中的 loadStance 方法。加载一个基础姿态对象。
     * @description - 可以修改这个基础姿态对象的一些属性, 调用 play 方法。基础姿态资源会在调用 play 时进行异步的下载加载。
     * @description - 想要停止一个基础姿态对象, 可以直接对基础姿态对象调用 stop。
     * @networkStatus usage:双端
     */
    class Stance extends StanceBase {
        /**
         * @groups 动画
         * @description 姿态资源GUID
         * @example
         * 使用示例:将使用到的资源:"234423,216081"拖入优先加载栏。创建一个名为"Example_Stance_AssetId"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载一个二次元男性基础姿态和二次元女性基础姿态，按下键盘“1”， 切换播放二次元男性基础姿态和二次元女性基础姿态。你将在场景中看到角色不同姿态的效果。按下键盘“2”， 停止播放基础姿态。代码如下：
         * ```
         * @Component
         * export default class Example_Stance_AssetId extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个二次元男性基础姿态
         *             let animeManStance = myCharacter.loadStance("234423");
         *             console.log("animeManStance assetId " + animeManStance.assetId);
         *             // 给角色加载一个二次元女性基础姿态（默认）,关闭瞄准偏移
         *             let animeWomanStance = myCharacter.loadStance("216081");
         *             animeWomanStance.aimOffsetEnabled = false;
         *             console.log("animeWomanStance assetId " + animeWomanStance.assetId);
         *             // 添加一个按键方法：按下键盘“1”，切换播放二次元男性基础姿态和二次元女性基础姿态
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.currentStance == animeWomanStance) {
         *                     animeManStance.play();
         *                     // 开启瞄准偏移
         *                     animeManStance.aimOffsetEnabled = true;
         *                 } else {
         *                     animeWomanStance.play();
         *                     // 关闭瞄准偏移
         *                     animeWomanStance.aimOffsetEnabled = false;
         *                 }
         *             });
         *             // 添加一个按键方法：按下键盘“2”，停止播放基础姿态
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.currentStance) {
         *                     myCharacter.currentStance.stop();
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         */
        get assetId(): string;
        /**
         * @groups 动画
         * @description 启用瞄准偏移
         * @effect 调用端生效
         * @precautions 角色是否启用瞄准偏移。true表示启用，false表示禁用。瞄准偏移用于创建多方向武器瞄准混合结构，然后叠加应用到默认的瞄准姿势。
         * @networkStatus usage:双端
         */
        get aimOffsetEnabled(): boolean;
        /**
         * @groups 动画
         * @description 启用瞄准偏移
         * @precautions 角色是否启用瞄准偏移。true表示启用，false表示禁用。瞄准偏移用于创建多方向武器瞄准混合结构，然后叠加应用到默认的瞄准姿势。
         * @example
         * 使用示例:将使用到的资源:"234423,216081"拖入优先加载栏。创建一个名为"Example_Stance_AimOffsetEnabled"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载一个二次元男性基础姿态和二次元女性基础姿态，按下键盘“1”， 切换播放二次元男性基础姿态和二次元女性基础姿态。你将在场景中看到角色不同姿态的效果。按下键盘“2”， 停止播放基础姿态。代码如下：
         * ```
         * @Component
         * export default class Example_Stance_AimOffsetEnabled extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个二次元男性基础姿态
         *             let animeManStance = myCharacter.loadStance("234423");
         *             console.log("animeManStance assetId " + animeManStance.assetId);
         *             // 给角色加载一个二次元女性基础姿态（默认）,关闭瞄准偏移
         *             let animeWomanStance = myCharacter.loadStance("216081");
         *             animeWomanStance.aimOffsetEnabled = false;
         *             console.log("animeWomanStance assetId " + animeWomanStance.assetId);
         *             // 添加一个按键方法：按下键盘“1”，切换播放二次元男性基础姿态和二次元女性基础姿态
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.currentStance == animeWomanStance) {
         *                     animeManStance.play();
         *                     // 开启瞄准偏移
         *                     animeManStance.aimOffsetEnabled = true;
         *                 } else {
         *                     animeWomanStance.play();
         *                     // 关闭瞄准偏移
         *                     animeWomanStance.aimOffsetEnabled = false;
         *                 }
         *             });
         *             // 添加一个按键方法：按下键盘“2”，停止播放基础姿态
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.currentStance) {
         *                     myCharacter.currentStance.stop();
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        set aimOffsetEnabled(value: boolean);
        /**
         * @groups 动画
         * @description 播放姿态
         * @effect 调用端生效
         * @precautions 播放这个姿态对象, 并返回执行结果. 这个操作是否会自动同步多端, 取决于调用端，服务端广播生效，客户端本地生效。
         * @returns 播放结果，当未进行资源加载时，会返回false，但内部会进行资源异步加载，并在完成后播放。
         * @example
         * 使用示例:将使用到的资源:"234423,216081"拖入优先加载栏。创建一个名为"Example_Stance_Play"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载一个二次元男性基础姿态和二次元女性基础姿态，按下键盘“1”， 切换播放二次元男性基础姿态和二次元女性基础姿态。你将在场景中看到角色不同姿态的效果。按下键盘“2”， 停止播放基础姿态。代码如下：
         * ```
         * @Component
         * export default class Example_Stance_Play extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个二次元男性基础姿态
         *             let animeManStance = myCharacter.loadStance("234423");
         *             console.log("animeManStance assetId " + animeManStance.assetId);
         *             // 给角色加载一个二次元女性基础姿态（默认）,关闭瞄准偏移
         *             let animeWomanStance = myCharacter.loadStance("216081");
         *             animeWomanStance.aimOffsetEnabled = false;
         *             console.log("animeWomanStance assetId " + animeWomanStance.assetId);
         *             // 添加一个按键方法：按下键盘“1”，切换播放二次元男性基础姿态和二次元女性基础姿态
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.currentStance == animeWomanStance) {
         *                     animeManStance.play();
         *                     // 开启瞄准偏移
         *                     animeManStance.aimOffsetEnabled = true;
         *                 } else {
         *                     animeWomanStance.play();
         *                     // 关闭瞄准偏移
         *                     animeWomanStance.aimOffsetEnabled = false;
         *                 }
         *             });
         *             // 添加一个按键方法：按下键盘“2”，停止播放基础姿态
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.currentStance) {
         *                     myCharacter.currentStance.stop();
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        play(): boolean;
        /**
         * @groups 动画
         * @description 停止姿态
         * @effect 调用端生效
         * @precautions 停止这个姿态对象, 并返回执行结果. 这个操作是否会自动同步多端, 取决于调用端，服务端广播生效，客户端本地生效。
         * @returns 停止结果
         * @example
         * 使用示例:将使用到的资源:"234423,216081"拖入优先加载栏。创建一个名为"Example_Stance_Stop"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载一个二次元男性基础姿态和二次元女性基础姿态，按下键盘“1”， 切换播放二次元男性基础姿态和二次元女性基础姿态。你将在场景中看到角色不同姿态的效果。按下键盘“2”， 停止播放基础姿态。代码如下：
         * ```
         * @Component
         * export default class Example_Stance_Stop extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个二次元男性基础姿态
         *             let animeManStance = myCharacter.loadStance("234423");
         *             console.log("animeManStance assetId " + animeManStance.assetId);
         *             // 给角色加载一个二次元女性基础姿态（默认）,关闭瞄准偏移
         *             let animeWomanStance = myCharacter.loadStance("216081");
         *             animeWomanStance.aimOffsetEnabled = false;
         *             console.log("animeWomanStance assetId " + animeWomanStance.assetId);
         *             // 添加一个按键方法：按下键盘“1”，切换播放二次元男性基础姿态和二次元女性基础姿态
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.currentStance == animeWomanStance) {
         *                     animeManStance.play();
         *                     // 开启瞄准偏移
         *                     animeManStance.aimOffsetEnabled = true;
         *                 } else {
         *                     animeWomanStance.play();
         *                     // 关闭瞄准偏移
         *                     animeWomanStance.aimOffsetEnabled = false;
         *                 }
         *             });
         *             // 添加一个按键方法：按下键盘“2”，停止播放基础姿态
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.currentStance) {
         *                     myCharacter.currentStance.stop();
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        stop(): boolean;
    }
    /**
    * @author yuchen.ren
    * @groups 动画
    * @description 二级姿态
    * @description -------------------------
    * @description 二级姿态是动画系统的拓展, 用于实现独立于基础姿态外的复杂动画逻辑(如持枪, 攀爬等)。
    * @description 基二级姿态资源同基础姿态（Stance）也是一个外部的资源，打包后生成的文件被上传到资源服务器, 你可以在本地资源库中的基础姿态分类下查找并下载它们。
    * @description - 同样拥有 loadSubStance 、play、stop等功能
    * @description - 还有额外出色的混合模式，详见 StanceBlendMode 。
    * @networkStatus usage:双端
    */
    class SubStance extends StanceBase {
        /**
         * @description 资源GUID
         * @example
         * 使用示例:将使用到的资源:"94261,14520"拖入优先加载栏。创建一个名为"Example_SubStance_AssetId"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载一个仅上半身的瞄准姿态和一个仅下半身的踢腿姿态，按下键盘“1”， 切换播放瞄准姿态和踢腿姿态。你将在场景中看到角色不同姿态的效果。按下键盘“2”， 停止播放姿态。代码如下：
         * ```
         * @Component
         * export default class Example_SubStance_AssetId extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载仅上半身瞄准姿态
         *             let aimStance = myCharacter.loadSubStance("94261");
         *             aimStance.blendMode = StanceBlendMode.BlendUpper;
         *             console.log("aimStance assetId " + aimStance.assetId);
         *             // 给角色加载仅下半身踢腿姿态
         *             let kickStance = myCharacter.loadSubStance("14520");
         *             kickStance.blendMode = StanceBlendMode.BlendLower;
         *             console.log("kickStance assetId " + kickStance.assetId);
         *             // 添加一个按键方法:按下键盘“1”，切换播放瞄准姿态和踢腿姿态
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.currentSubStance == aimStance) {
         *                     kickStance.play();
         *                 } else {
         *                     aimStance.play();
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“2”，停止播放姿态
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.currentSubStance) {
         *                     myCharacter.currentSubStance.stop();
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         */
        get assetId(): string;
        /**
         * @groups 动画
         * @description 姿态的混合模式
         * @effect 调用端生效
         * @precautions 姿态的播放位置(上半身, 下半身, 全身), 对正在播放的姿态修改时无效.
         * 如果这个姿态是通过预制姿态资源GUID创建的, 那么它的默认值会自动从资源上获取;
 如果是通过动画资源GUID创建的, 那么它的默认值为StanceBlendMode.WholeBody.
         * @networkStatus usage:双端
         */
        get blendMode(): mw.StanceBlendMode;
        /**
         * @groups 动画
         * @description 姿态的混合模式
         * @effect 调用端生效
         * @precautions 姿态的播放位置(上半身, 下半身, 全身), 对正在播放的姿态修改时无效.
         * 如果这个姿态是通过预制姿态资源GUID创建的, 那么它的默认值会自动从资源上获取;
 如果是通过动画资源GUID创建的, 那么它的默认值为StanceBlendMode.WholeBody.
         * @example
         * 使用示例:将使用到的资源:"94261,14520"拖入优先加载栏。创建一个名为"Example_SubStance_BlendMode"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载一个仅上半身的瞄准姿态和一个仅下半身的踢腿姿态，按下键盘“1”， 切换播放瞄准姿态和踢腿姿态。你将在场景中看到角色不同姿态的效果。按下键盘“2”， 停止播放姿态。代码如下：
         * ```
         * @Component
         * export default class Example_SubStance_BlendMode extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载仅上半身瞄准姿态
         *             let aimStance = myCharacter.loadSubStance("94261");
         *             aimStance.blendMode = StanceBlendMode.BlendUpper;
         *             console.log("aimStance assetId " + aimStance.assetId);
         *             // 给角色加载仅下半身踢腿姿态
         *             let kickStance = myCharacter.loadSubStance("14520");
         *             kickStance.blendMode = StanceBlendMode.BlendLower;
         *             console.log("kickStance assetId " + kickStance.assetId);
         *             // 添加一个按键方法:按下键盘“1”，切换播放瞄准姿态和踢腿姿态
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.currentSubStance == aimStance) {
         *                     kickStance.play();
         *                 } else {
         *                     aimStance.play();
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“2”，停止播放姿态
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.currentSubStance) {
         *                     myCharacter.currentSubStance.stop();
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        set blendMode(newBlendMode: mw.StanceBlendMode);
        /**
         * @groups 动画
         * @description 播放姿态
         * @effect 调用端生效
         * @precautions 播放这个姿态对象, 并返回执行结果. 这个操作是否会自动同步多端, 取决于调用端，服务端广播生效，客户端本地生效。
         * @returns 播放结果，当未进行资源加载时，会返回false，但内部会进行资源异步加载，并在完成后播放。
         * @example
         * 使用示例:将使用到的资源:"94261,14520"拖入优先加载栏。创建一个名为"Example_SubStance_Play"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载一个仅上半身的瞄准姿态和一个仅下半身的踢腿姿态，按下键盘“1”， 切换播放瞄准姿态和踢腿姿态。你将在场景中看到角色不同姿态的效果。按下键盘“2”， 停止播放姿态。代码如下：
         * ```
         * @Component
         * export default class Example_SubStance_Play extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载仅上半身瞄准姿态
         *             let aimStance = myCharacter.loadSubStance("94261");
         *             aimStance.blendMode = StanceBlendMode.BlendUpper;
         *             console.log("aimStance assetId " + aimStance.assetId);
         *             // 给角色加载仅下半身踢腿姿态
         *             let kickStance = myCharacter.loadSubStance("14520");
         *             kickStance.blendMode = StanceBlendMode.BlendLower;
         *             console.log("kickStance assetId " + kickStance.assetId);
         *             // 添加一个按键方法:按下键盘“1”，切换播放瞄准姿态和踢腿姿态
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.currentSubStance == aimStance) {
         *                     kickStance.play();
         *                 } else {
         *                     aimStance.play();
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“2”，停止播放姿态
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.currentSubStance) {
         *                     myCharacter.currentSubStance.stop();
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        play(): boolean;
        /**
         * @groups 动画
         * @description 停止这个姿态对象, 并返回执行结果
         * @effect 调用端生效
         * @precautions 停止这个姿态对象, 并返回执行结果. 这个操作是否会自动同步多端, 取决于调用端，服务端广播生效，客户端本地生效。
         * @returns 停止结果
         * @example
         * 使用示例:将使用到的资源:"94261,14520"拖入优先加载栏。创建一个名为"Example_SubStance_Stop"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载一个仅上半身的瞄准姿态和一个仅下半身的踢腿姿态，按下键盘“1”， 切换播放瞄准姿态和踢腿姿态。你将在场景中看到角色不同姿态的效果。按下键盘“2”， 停止播放姿态。代码如下：
         * ```
         * @Component
         * export default class Example_SubStance_Stop extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载仅上半身瞄准姿态
         *             let aimStance = myCharacter.loadSubStance("94261");
         *             aimStance.blendMode = StanceBlendMode.BlendUpper;
         *             console.log("aimStance assetId " + aimStance.assetId);
         *             // 给角色加载仅下半身踢腿姿态
         *             let kickStance = myCharacter.loadSubStance("14520");
         *             kickStance.blendMode = StanceBlendMode.BlendLower;
         *             console.log("kickStance assetId " + kickStance.assetId);
         *             // 添加一个按键方法:按下键盘“1”，切换播放瞄准姿态和踢腿姿态
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.currentSubStance == aimStance) {
         *                     kickStance.play();
         *                 } else {
         *                     aimStance.play();
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“2”，停止播放姿态
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.currentSubStance) {
         *                     myCharacter.currentSubStance.stop();
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        stop(): boolean;
    }
}

declare namespace mw {
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 外观加载完成委托
     * @precautions 当角色外观加载完成时执行绑定函数
     */
    type OnDescriptionComplete = (character: Character) => void;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 外观主体（前发，后发，头，上衣，下衣，手套，鞋）加载失败委托
     * @precautions 当角色外观加载失败时执行绑定函数
     */
    type OnLoadDescriptionFailed = (Character: Character) => void;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 外观加载细节变化委托
     */
    type OnDescriptionChange = (operationCode: number, index: number, value: unknown) => void;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 设置编辑数据完成的回调
     */
    type SetAppearanceDataCallback = (APIName: string) => void;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 返回String的回调
     */
    type StringCallback = (str: string) => void;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 返回Bool的回调
     */
    type BoolCallback = (value: boolean) => void;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 角色编辑器数据加载完成后的回调
     */
    type LoadAppearanceDataAllCompletedCallback = () => void;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 空的回调函数类型
     */
    type EmptyCallback = () => void;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 角色身上GUID切换成功回调
     */
    type onAppearanceDataChanged = (GUID: string) => void;
    /**
     * @author chenghao.song, guang.deng
     * @groups 角色系统/角色
     * @description 角色
     * @description --------------------------------------
     * @description 什么是角色？
     * @description 角色是指代表玩家游戏实体。它是游戏中能够在虚拟世界中移动、与环境和其他角色进行交互的主要对象。可以将 Character 看作是游戏中的角色扮演者，它可以是玩家控制的角色或由游戏系统控制的角色。
     * @description 角色具备哪些功能？
     * @description 移动和交互。Character 具备在游戏世界中移动和与环境进行交互的能力。它可以行走、跑动、跳跃或飞行等，根据游戏规则和角色设计的不同， Character 可以执行各种动作。
     * @description 功能和行为。Character 可以具备各种功能和行为。例如，一个角色可以是战士，具有攻击和防御技能；另一个角色可以是商人，负责交易和提供物品。 Character 的功能和行为由游戏开发者根据游戏需求进行定义和实现。
     * @description 总的来说：
     * @description 1. 控制角色移动：你可以使用它来指定角色的移动速度、方向和加速度等参数。它允许你以编程的方式控制角色的运动，例如让角色向前移动、旋转或跳跃等。并支持多种移动方式：例如，它可以实现直线运动、旋转、跳跃、游泳、蹲伏和飞行等。根据你的游戏需求，你可以选择合适的移动方式，并使用对应接口来实现。
     * @description 2. 处理物理模拟与碰撞：它可以使用物理引擎来模拟角色的重力、碰撞和惯性等效果。通过物理模拟，角色可以与游戏世界中的其他对象进行交互，并受到合理的物理影响。执行碰撞检测：它可以检测角色与墙壁、地面或其他角色的碰撞，并采取相应的行动。这有助于实现更真实和可靠的角色移动和交互。
     * @description 3. 处理角色外观：可以给角色赋予各种各样的外貌。为角色选择合适的服装、装备和特征。无论是超级英雄的紧身服、中世纪骑士的盔甲还是未来战士的高科技装备，感受到角色的独特风格和个性。
     * @description 4. 实现生动的动画：还能赋予角色生动的动画效果。能够让角色在游戏中跳跃、奔跑、战斗，甚至是展现出各种特殊技能和动作。
     * @description 其中比较重要的：
     * @description - addMovement 函数控制角色沿着给定方向移动。
     * @description - loadAnimation 函数将左侧动画资源加载在角色身上，使角色自如的使用多种动作。
     * @description - description 属性更改角色外观，左侧栏中提供角色大量的衣服、饰品等资源，传入资源ID字符串进行随意更换外观。
     * @example
     * 使用示例: 生成一个角色
     * ```ts
     * @Component
     *  export default class NewExample extends Script {
     *      protected onStart(): void {
     *          GameObject.asyncSpawn<Model>("183107",{transform: new Transform(new Vector(100,0,0),new Rotation(0,0,0),new Vector(1,1,1))}).then(()=>{
     *              console.log("character spawn success！");
     *          });
     *      }
     * }
     * ```
     * @networkStatus usage:双端
     */
    class Character extends mw.Pawn {
        /**
         * @description 角色开启强制位移后，移动中碰撞检测结果的代理
         * @groups 角色系统/角色
         */
        onSweepCollision: mw.MulticastDelegate<(velocities: Array<mw.Vector>, hitActors: Array<mw.GameObject>, impactPoints: Array<mw.Vector>, impactNormals: Array<mw.Vector>) => void>;
        /**
         * @groups 角色系统/角色
         * @description 角色外观配置。返回值为 CharacterDescription 类。调用 description 变量可以修改角色的外观，可更改角色的外观参数详见 CharacterDescription 类。
         * @effect 调用端生效
         * @returns 返回值为 CharacterDescription 类型对象。
         * @example
         * 使用示例:将使用到的资源:"14521,35391,161245,75674,57731,63910,58694,58700,60384,58696,136183"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到玩家控制角色玩家外观准备未完成播放摊手的效果。【角色外观描述完成】委托添加函数来播放换装完成特效，并保存角色初始默认外观数据。【角色外观描述变化】委托添加函数在控制台打印当前角色外观描述变化的具体子项和索引。按下键盘“1”，重置为默认角色外观。按下键盘“2”，修改角色外观。按下键盘“3”，同步角色外观。按下键盘“4”，清空角色外观。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 如果玩家外观准备完成挥手，反之摊手
         *             if(myCharacter.isDescriptionReady) {
         *                 let animation = myCharacter.loadAnimation("35391");
         *                 animation.play();
         *             } else {
         *                 let animation = myCharacter.loadAnimation("14521");
         *                 animation.play();
         *             }
         *             let defaultStyle = null;
         *             // 给【角色外观描述完成】委托添加函数
         *             myCharacter.onDescriptionComplete.add(() => {
         *                 // 播放换装完成特效
         *                 EffectService.playOnGameObject("161245", myCharacter, {slotType: HumanoidSlotType.Root});
         *                 // 获取角色默认外观风格
         *                 if(defaultStyle == null) {
         *                     defaultStyle = myCharacter.getDescription();
         *                 }
         *             });
         *             // 给【角色外观描述变化】委托添加函数
         *             myCharacter.onDescriptionChange.add((operationCode: number, index: number, value: unknown) => {
         *                 console.log("Appearance Changed");
         *                 console.log("OperationCode " + operationCode + " Index " + index);
         *             });
         *             // 添加一个按键方法:按下键盘“1”，重置为默认角色外观
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.setDescription(defaultStyle);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，修改角色外观
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     // 头部:头大小为1.5倍
         *                     myCharacter.description.advance.headFeatures.head.headOverallScale = 1.5;
         *                     // 体型:身高为1.2倍
         *                     myCharacter.description.advance.bodyFeatures.body.height = 1.2;
         *                     // 化妆:腮红为75674
         *                     myCharacter.description.advance.makeup.blush.blushStyle = "75674";
         *                     // 头发:前发为57731，后发为63910
         *                     myCharacter.description.advance.hair.frontHair.style = "57731";
         *                     myCharacter.description.advance.hair.backHair.style = "63910";
         *                     // 上衣为58694，下衣为58700，手套为60384，鞋子为58696
         *                     myCharacter.description.advance.clothing.upperCloth.style = "58694";
         *                     myCharacter.description.advance.clothing.lowerCloth.style = "58700";
         *                     myCharacter.description.advance.clothing.gloves.style = "60384";
         *                     myCharacter.description.advance.clothing.shoes.style = "58696";
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，同步角色外观
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.syncDescription();
         *             });
         *             // 添加一个按键方法:按下键盘“4”，清空角色外观
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 myCharacter.clearDescription();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get description(): mw.CharacterDescription;
        /**
         * @groups 角色系统/角色
         * @description 获取当前角色外观是否准备完毕。刚进入场景中或角色还未加载出外观衣服等时，isDescriptionReady为false，完全加载完成后变为true。
         * @effect 只在客户端调用生效
         * @returns true表示准备完毕，false表示未准备好。
         * @example
         * 使用示例:将使用到的资源:"14521,35391,161245,75674,57731,63910,58694,58700,60384,58696,136183"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到玩家控制角色玩家外观准备未完成播放摊手的效果。【角色外观描述完成】委托添加函数来播放换装完成特效，并保存角色初始默认外观数据。【角色外观描述变化】委托添加函数在控制台打印当前角色外观描述变化的具体子项和索引。按下键盘“1”，重置为默认角色外观。按下键盘“2”，修改角色外观。按下键盘“3”，同步角色外观。按下键盘“4”，清空角色外观。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 如果玩家外观准备完成挥手，反之摊手
         *             if(myCharacter.isDescriptionReady) {
         *                 let animation = myCharacter.loadAnimation("35391");
         *                 animation.play();
         *             } else {
         *                 let animation = myCharacter.loadAnimation("14521");
         *                 animation.play();
         *             }
         *             let defaultStyle = null;
         *             // 给【角色外观描述完成】委托添加函数
         *             myCharacter.onDescriptionComplete.add(() => {
         *                 // 播放换装完成特效
         *                 EffectService.playOnGameObject("161245", myCharacter, {slotType: HumanoidSlotType.Root});
         *                 // 获取角色默认外观风格
         *                 if(defaultStyle == null) {
         *                     defaultStyle = myCharacter.getDescription();
         *                 }
         *             });
         *             // 给【角色外观描述变化】委托添加函数
         *             myCharacter.onDescriptionChange.add((operationCode: number, index: number, value: unknown) => {
         *                 console.log("Appearance Changed");
         *                 console.log("OperationCode " + operationCode + " Index " + index);
         *             });
         *             // 添加一个按键方法:按下键盘“1”，重置为默认角色外观
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.setDescription(defaultStyle);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，修改角色外观
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     // 修改角色style头部:头大小为1.5倍
         *                     myCharacter.description.advance.headFeatures.head.headOverallScale = 1.5;
         *                     // 修改角色style体型:身高为1.2倍
         *                     myCharacter.description.advance.bodyFeatures.body.height = 1.2;
         *                     // 修改角色style化妆:腮红为75674
         *                     myCharacter.description.advance.makeup.blush.blushStyle = "75674";
         *                     // 修改角色style头发:前发为57731，后发为63910
         *                     myCharacter.description.advance.hair.frontHair.style = "57731";
         *                     myCharacter.description.advance.hair.backHair.style = "63910";
         *                     // 修改角色style:上衣为58694，下衣为58700，手套为60384，鞋子为58696
         *                     myCharacter.description.advance.clothing.upperCloth.style = "58694";
         *                     myCharacter.description.advance.clothing.lowerCloth.style = "58700";
         *                     myCharacter.description.advance.clothing.gloves.style = "60384";
         *                     myCharacter.description.advance.clothing.shoes.style = "58696";
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，同步角色外观
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.syncDescription();
         *             });
         *             // 添加一个按键方法:按下键盘“4”，清空角色外观
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 myCharacter.clearDescription();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get isDescriptionReady(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 强制更新移动
         * @effect 调用端生效
         * @precautions 角色当前是否启用强制更新移动，true表示角色会因碰撞被动位移，false表示角色不会因碰撞被动位移。
         * @param value usage: true为开启，false为关闭强制更新移动。<br> 默认为true
         * @example
         * 使用示例:将使用到的资源:"197386"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏你将在场景中生成一个立方体，并在 onUpdate 里左右移动，按下键盘“1”，启用/禁用角色【强制更新移动】，看到立方体对角色的推动效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character extends Script {
         *     // 声明变量
         *     cube: GameObject;
         *     stride: Vector;
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             this.useUpdate = true;
         *             // 移动步长：Y轴单位距离
         *             this.stride = new Vector(-2, 0, 0);
         *             // 在前方生成一个立方体，并在onUpdate里左右移动
         *             let spawnTransform = new Transform(new Vector(300, 0, 0), Rotation.zero, Vector.one);
         *             this.cube = GameObject.spawn("197386",{transform: spawnTransform});
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 添加一个按键方法：按下键盘“1”，启用/禁用【强制更新移动】
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.forceUpdateMovement = !myCharacter.forceUpdateMovement;
         *                 console.log("当前角色是否强制更新移动: "+ myCharacter.forceUpdateMovement);
         *             });
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 当立方体不为空时按步长每帧更新立方体世界坐标（左右移动）
         *             if(this.cube) {
         *                 this.cube.worldTransform.position = this.cube.worldTransform.position.add(this.stride);
         *                 // 当立方体y轴世界坐标绝对值超过1000时，步长取反
         *                 if(Math.abs(this.cube.worldTransform.position.x) > 500) {
         *                     this.stride.multiply(-1);
         *                 }
         *             }
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        set forceUpdateMovement(value: boolean);
        /**
         * @groups 角色系统/角色
         * @description 获取角色是否正在移动
         * @effect 调用端生效
         * @returns 是否正在移动布尔值。true表示正在移动，角色速度不为0。false表示未移动，角色速度为0。
         * @example
         * 使用示例:创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，如果角色正在移动，你将在控制台中看到打印的角色移动速度。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             this.useUpdate = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.maxAcceleration = 0.1 * myCharacter.maxAcceleration;
         *             // 最大转向速度为原来的0.5倍
         *             myCharacter.rotateRate = 0.5 * myCharacter.rotateRate;
         *             // 最大行走速度为原来的2倍
         *             myCharacter.maxWalkSpeed = 2 * myCharacter.maxWalkSpeed;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.brakingDecelerationWalking = 0.1 * myCharacter.brakingDecelerationWalking;
         *             myCharacter.groundFriction = 1;
         *             // 添加一个按键方法：按下键盘“1”，切换角色摩擦力的来源
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.groundFrictionEnabled = !myCharacter.groundFriction;
         *             });
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 如果角色正在移动，打印角色的移动速度
         *             if(myCharacter.isMoving) {
         *                 console.log("当前角色速度：" + myCharacter.velocity);
         *             }
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get isMoving(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 获取角色当前移动速度
         * @effect 调用端生效
         * @precautions 角色当前移动的速度
         * @returns 移动速度大小和方向的三维向量。
         * @example
         * 使用示例:创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，如果角色正在移动，你将在控制台中看到打印的角色移动速度。代码如下：
         * ```
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             this.useUpdate = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.maxAcceleration = 0.1 * myCharacter.maxAcceleration;
         *             // 最大转向速度为原来的0.5倍
         *             myCharacter.rotateRate = 0.5 * myCharacter.rotateRate;
         *             // 最大行走速度为原来的2倍
         *             myCharacter.maxWalkSpeed = 2 * myCharacter.maxWalkSpeed;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.brakingDecelerationWalking = 0.1 * myCharacter.brakingDecelerationWalking;
         *             myCharacter.groundFriction = 1;
         *             // 添加一个按键方法：按下键盘“1”，切换角色摩擦力的来源
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.groundFrictionEnabled = !myCharacter.groundFriction;
         *             });
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 如果角色正在移动，打印角色的移动速度
         *             if(myCharacter.isMoving) {
         *                 console.log("当前角色速度：" + myCharacter.velocity);
         *             }
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get velocity(): mw.Vector;
        /**
         * @groups 角色系统/角色
         * @description 获取角色的最大行走速度。角色移动时，并不是直接变为最大速度，而是随着输入或其他控制，速度逐渐增加，最大行走速度为角色可以达到的最大速度。同时也是跌倒时的最大横向速度。
         * @effect 调用端生效
         * @returns 角色最大行走速度浮点数。<br> 默认值为450
         * @example
         * 使用示例:创建一个名为"Example_MaxWalkSpeed"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将设置角色最大行走速度为原来的2倍，并在场景中看到角色移动最高速度变快的效果。代码如下：
         * ```
         * @Component
         * export default class Example_MaxWalkSpeed extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             this.useUpdate = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.maxAcceleration = 0.1 * myCharacter.maxAcceleration;
         *             // 最大转向速度为原来的0.5倍
         *             myCharacter.rotateRate = 0.5 * myCharacter.rotateRate;
         *             // 最大行走速度为原来的2倍
         *             myCharacter.maxWalkSpeed = 2 * myCharacter.maxWalkSpeed;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.brakingDecelerationWalking = 0.1 * myCharacter.brakingDecelerationWalking;
         *             myCharacter.groundFriction = 1;
         *             // 添加一个按键方法：按下键盘“1”，切换角色摩擦力的来源
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.groundFrictionEnabled = !myCharacter.groundFriction;
         *             });
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 如果角色正在移动，打印角色的移动速度
         *             if(myCharacter.isMoving) {
         *                 console.log("当前角色速度：" + myCharacter.velocity);
         *             }
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get maxWalkSpeed(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色的最大行走速度
         * @effect 调用端生效
         * @param InMaxWalkSpeed usage: 最大行走速度 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set maxWalkSpeed(InMaxWalkSpeed: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色最大蹲伏行走速度
         * @effect 调用端生效
         * @precautions 角色在下蹲状态下移动时，角色可达到的最大移动速度
         * @returns 最大蹲伏行走速度。 <br> 默认值为：100
         * @example
         * 使用示例:将使用到的资源:"54834,36851"拖入优先加载栏。创建一个名为"Example_MaxWalkSpeedCrouched"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成草丛和拱门并添加触发器，添加委托函数实现角色进入草丛蹲下，离开站起的效果。设置地面蹲伏行走时的最大移动速度100。你可以看到角色蹲下后行走速度减慢的效果。代码如下：
         * ```
         * @Component
         * export default class Example_MaxWalkSpeedCrouched extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 生成草丛和拱门
         *             GameObject.spawn("54834",{transform: new Transform(new Vector(300, 0, 0), Rotation.zero, new Vector(2, 2, 2))});
         *             let arch = GameObject.spawn("36851",{transform: new Transform(new Vector(300, 210, 0), new Rotation(0, 0, 90), new Vector(2, 1, 2))}) as Model;
         *             arch.setCollision(CollisionStatus.On);
         *             // 生成触发器并添加委托函数：进入触发器的角色蹲下，离开触发器站起
         *             let tri = GameObject.spawn("Trigger",{transform: new Transform(new Vector(300, 0, 50), Rotation.zero, new Vector(2, 2, 1))}) as Trigger;
         *             tri.onEnter.add((character: Character) => {
         *                 character.crouch(true);
         *                 setTimeout(() => {
         *                     console.log("当前角色下蹲 " + character.isCrouching);
         *                 }, 500);
         *             });
         *             tri.onLeave.add((character: Character) => {
         *                 character.crouch(false);
         *                 console.log("当前角色下蹲 " + character.isCrouching);
         *             });
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 地面蹲伏行走时的最大移动速度100
         *             myCharacter.maxWalkSpeedCrouched = 100;
         *             // 下蹲后高度为100
         *             myCharacter.crouchedHeight = 100;
         *             // 添加一个按键方法：按下键盘“1”，启用/禁用下蹲能力
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.crouchEnabled = !myCharacter.crouchEnabled;
         *                 console.log("当前角色是否能下蹲 " + myCharacter.crouchEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get maxWalkSpeedCrouched(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色最大蹲伏行走速度
         * @effect 调用端生效
         * @precautions 角色在下蹲状态下移动时，角色可达到的最大移动速度
         * @param maxSpeed usage: 最大蹲伏行走速度 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set maxWalkSpeedCrouched(maxSpeed: number);
        /**
         * @groups 角色系统/角色
         * @description 设置角色行走制动速率。行走制动速率是指角色在行走状态下的刹车减速度。当角色在行走状态下停止移动或改变方向时，刹车减速度会影响角色减速的速率。较高的值将导致角色更快地减速，而较低的值将导致角色减速得更慢。
         * @effect 调用端生效
         * @returns 行走制动速率。 <br> 默认值为：2048
         * @example
         * 使用示例:创建一个名为"Example_Braking"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将设置角色行走制动速率为原来的0.1，并在场景中看到角色移动加速变快的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Braking extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             this.useUpdate = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.maxAcceleration = 0.1 * myCharacter.maxAcceleration;
         *             // 最大转向速度为原来的0.5倍
         *             myCharacter.rotateRate = 0.5 * myCharacter.rotateRate;
         *             // 最大行走速度为原来的2倍
         *             myCharacter.maxWalkSpeed = 2 * myCharacter.maxWalkSpeed;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.brakingDecelerationWalking = 0.1 * myCharacter.brakingDecelerationWalking;
         *             myCharacter.groundFriction = 1;
         *             // 添加一个按键方法：按下键盘“1”，切换角色摩擦力的来源
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.groundFrictionEnabled = !myCharacter.groundFriction;
         *             });
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 如果角色正在移动，打印角色的移动速度
         *             if(myCharacter.isMoving) {
         *                 console.log("当前角色速度：" + myCharacter.velocity);
         *             }
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get brakingDecelerationWalking(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色行走制动速率
         * @effect 调用端生效
         * @precautions 仅在启用单独制动摩擦 groundFriction 时生效。
         * @param InBrakingDecelerationWalking usage: 行走制动速率 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set brakingDecelerationWalking(InBrakingDecelerationWalking: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色最大飞行速度。角色在飞行状态下进行移动时，角色可达到的最大移动速度
         * @effect 调用端生效
         * @returns 最大飞行速度。 <br> 默认值为：800
         * @example
         * 使用示例:将使用到的资源:"53011,20307"拖入优先加载栏。创建一个名为"Example_MaxFlySpeed"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，角色切换为飞行，按下键盘“2”，角色进行喷射加速。你将在场景中看到角色在加速过程中最大飞行速度变化的效果。代码如下：
         * ```
         * @Component
         * export default class Example_MaxFlySpeed extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 加载喷射加速动画
         *             let boostAnimation = myCharacter.loadAnimation("53011");
         *             boostAnimation.loop = 0;
         *             let isBoost = false
         *             // 加载上升姿态
         *             let boostStance = myCharacter.loadSubStance("20307");
         *             // 添加一个按键方法:按下键盘“1”，角色切换为飞行
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.switchToFlying();
         *             });
         *             // 添加一个按键方法:按下键盘“2”，角色进行喷射加速
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(isBoost) return;
         *                 let boost_interval = 0;
         *                 if(myCharacter.isMoving) {
         *                     // 播放飞行动画，修改飞行速度和制动速度
         *                     boostAnimation.play();
         *                     myCharacter.maxFlySpeed = 2000;
         *                     myCharacter.brakingDecelerationFlying = 5000;
         *                     // 设置加速周期，每帧检查角色是否移动，当角色停止移动时,执行停止加速操作:停止动画清除姿态，还原飞行速度，清除加速周期
         *                     boost_interval = setInterval(() => {
         *                         if(!myCharacter.isMoving) {
         *                             isBoost = false;
         *                             clearInterval(boost_interval);
         *                             myCharacter.maxFlySpeed = 500;
         *                             boostAnimation.stop();
         *                             boostStance.stop();
         *                         }
         *                     }, 1);
         *                 // 如果当前角色静止，修改角色为上升姿态，设置加速周期，每帧上升5个单位
         *                 } else {
         *                     boostStance.play();
         *                     boost_interval = setInterval(() => {
         *                         myCharacter.addMovement(new Vector(0, 0, 5));
         *                     }, 1);
         *                 }
         *                 // 2秒后执行停止加速操作
         *                     setTimeout(() => {
         *                         isBoost = false;
         *                         clearInterval(boost_interval);
         *                         myCharacter.maxFlySpeed = 500;
         *                         boostAnimation.stop();
         *                         boostStance.stop();
         *                     }, 2000);
         *                     // 2.2秒后还原角色飞行制动速度
         *                     setTimeout(() => {
         *                         myCharacter.brakingDecelerationFlying = 300;
         *                     }, 2200);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get maxFlySpeed(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色最大飞行速度
         * @effect 调用端生效
         * @param InMaxFlySpeed usage: 最大飞行速度。 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set maxFlySpeed(InMaxFlySpeed: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色最大可跨越高度。角色跨越台阶时，台阶的最大高度，大于等于该高度角色均无法跨越。
         * @effect 调用端生效
         * @returns 最大可跨越高度。 <br> 默认值为45。
         * @example
         * 使用示例:将使用到的资源:"7667,197386"拖入优先加载栏。创建一个名为"Example_MaxStepHeight"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中创建5个不同高度的立方体:10，20，40，80，160。按下键盘“1”，角色最大可跨越高度增加10。按下键盘“2”，角色最大可跨越高度减小10。你将看到角色最大可跨越高度变化带来的效果。代码如下：
         * ```
         * @Component
         * export default class Example_MaxStepHeight extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *          // 下列代码仅在服务端执行
         *          if(SystemUtil.isServer()) {
         *             // 创建5个不同高度的立方体：10，20，40，80，160
         *             let cubeHeight = [10, 20, 40, 80, 160];
         *             for (let i = 0;
 i < cubeHeight.length;
 i++) {
         *                 GameObject.spawn("197386",{transform: new Transform(new Vector(250 * i, -500, 0), Rotation.zero, new Vector(2, 2, cubeHeight[i] / 100))});
         *             }
         *             // 创建5个不同坡度的锥体:1，30，45，60，89
         *             let coneAngle = [1, 30, 45, 60, 89];
         *             for (let i = 0;
 i < coneAngle.length;
 i++) {
         *                 console.log("1111");
         *                 GameObject.spawn("7667",{transform: new Transform(new Vector(250 * i, 500, 0), Rotation.zero, new Vector(2, 2, Math.tan(coneAngle[i] * Math.PI / 180)))});
         *             }
         *          }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 添加一个按键方法：按下键盘“1”，角色最大可跨越高度增加10
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.maxStepHeight += 10;
         *                 console.log("角色最大可跨越高度：" + myCharacter.maxStepHeight);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，角色最大可跨越高度减小10
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.maxStepHeight -= 10;
         *                 console.log("角色最大可跨越高度：" + myCharacter.maxStepHeight);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，角色可行走的最大角度增加5
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.walkableFloorAngle += 5;
         *                 console.log("可行走的最大角度：" + myCharacter.walkableFloorAngle);
         *             });
         *             // 添加一个按键方法：按下键盘“4”，角色可行走的最大角度减小5
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 myCharacter.walkableFloorAngle -= 5;
         *                 console.log("可行走的最大角度：" + myCharacter.walkableFloorAngle);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get maxStepHeight(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色最大可跨越高度
         * @effect 调用端生效
         * @param InMaxStepHeight usage: 最大可跨越高度。 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set maxStepHeight(InMaxStepHeight: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色可行走的最大角度。角色站立在斜坡上时，斜坡的最大角度，超过该角度，角色将无法站立在这个斜坡上，角色会存在坠落的表现。使用范围在0-90之间。
         * @effect 调用端生效
         * @returns 最大角度。<br> 默认值为45（角度值）
         * @example
         * 使用示例:将使用到的资源:"7667,197386"拖入优先加载栏。创建一个名为"Example_WalkableFloorAngle"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中创建5个不同坡度的锥体:1，30，45，60，89。按下键盘“3”，角色可行走的最大角度增加5。按下键盘“4”，角色可行走的最大角度减小5。你将看到角色可行走的最大角度变化带来的效。代码如下：
         * ```
         * @Component
         * export default class Example_WalkableFloorAngle extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *          // 下列代码仅在服务端执行
         *          if(SystemUtil.isServer()) {
         *             // 创建5个不同高度的立方体：10，20，40，80，160
         *             let cubeHeight = [10, 20, 40, 80, 160];
         *             for (let i = 0;
 i < cubeHeight.length;
 i++) {
         *                 GameObject.spawn("197386",{transform: new Transform(new Vector(250 * i, -500, 0), Rotation.zero, new Vector(2, 2, cubeHeight[i] / 100))});
         *             }
         *             // 创建5个不同坡度的锥体:1，30，45，60，89
         *             let coneAngle = [1, 30, 45, 60, 89];
         *             for (let i = 0;
 i < coneAngle.length;
 i++) {
         *                 console.log("1111");
         *                 GameObject.spawn("7667",{transform: new Transform(new Vector(250 * i, 500, 0), Rotation.zero, new Vector(2, 2, Math.tan(coneAngle[i] * Math.PI / 180)))});
         *             }
         *          }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 添加一个按键方法：按下键盘“1”，角色最大可跨越高度增加10
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.maxStepHeight += 10;
         *                 console.log("角色最大可跨越高度：" + myCharacter.maxStepHeight);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，角色最大可跨越高度减小10
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.maxStepHeight -= 10;
         *                 console.log("角色最大可跨越高度：" + myCharacter.maxStepHeight);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，角色可行走的最大角度增加5
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.walkableFloorAngle += 5;
         *                 console.log("可行走的最大角度：" + myCharacter.walkableFloorAngle);
         *             });
         *             // 添加一个按键方法：按下键盘“4”，角色可行走的最大角度减小5
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 myCharacter.walkableFloorAngle -= 5;
         *                 console.log("可行走的最大角度：" + myCharacter.walkableFloorAngle);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get walkableFloorAngle(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色可行走的最大角度
         * @effect 调用端生效
         * @param InWalkableFloorAngle usage: 可行走的最大角度。<br> range: [0,)
         * @networkStatus usage:双端
         */
        set walkableFloorAngle(InWalkableFloorAngle: number);
        /**
         * @groups 角色系统/角色
         * @description 获取地面摩檫力
         * @effect 调用端生效
         * @returns 摩擦力。<br> 默认值为 8。
         * @example
         * 使用示例:创建一个名为"Example_GroundFriction"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将设置角色地面摩擦力为1，按下键盘“1”，切换角色摩擦力的来源。并在场景中看到角色移动加速变快的效果。代码如下：
         * ```
         * @Component
         * export default class Example_GroundFriction extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             this.useUpdate = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.maxAcceleration = 0.1 * myCharacter.maxAcceleration;
         *             // 最大转向速度为原来的0.5倍
         *             myCharacter.rotateRate = 0.5 * myCharacter.rotateRate;
         *             // 最大行走速度为原来的2倍
         *             myCharacter.maxWalkSpeed = 2 * myCharacter.maxWalkSpeed;
         *             // 行走制动速率为原来的0.1倍
         *             myCharacter.brakingDecelerationWalking = 0.1 * myCharacter.brakingDecelerationWalking;
         *             myCharacter.groundFriction = 1;
         *             // 添加一个按键方法:按下键盘“1”，启用/禁用地面摩擦力
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.groundFrictionEnabled = !myCharacter.groundFriction;
         *             });
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 如果角色正在移动，打印角色的移动速度
         *             if(myCharacter.isMoving) {
         *                 console.log("当前角色速度:" + myCharacter.velocity);
         *             }
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get groundFriction(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置地面摩檫力
         * @effect 调用端生效
         * @precautions 角色在地面上受到的摩擦力大小。在开启单独制动摩擦 groundFriction 时该值不生效。
         * @networkStatus usage:双端
         */
        set groundFriction(inGroundFriction: number);
        /**
         * @groups 角色系统/角色
         * @description 获取单独制动摩擦状态。开启后使用行走制动速率进行计算摩擦效果，不开启则使用的是地面摩擦力进行计算摩擦效果。
         * @effect 调用端生效
         * @returns 是否开启制动摩擦，true 为开启，false 为关闭。<br> 默认值为 false。
         * @example
         * 使用示例:创建一个名为"Example_GroundFriction"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，切换角色摩擦力的来源。并在场景中看到角色移动加速变化的效果。代码如下：
         * ```
         * @Component
         * export default class Example_GroundFriction extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             this.useUpdate = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.maxAcceleration = 0.1 * myCharacter.maxAcceleration;
         *             // 最大转向速度为原来的0.5倍
         *             myCharacter.rotateRate = 0.5 * myCharacter.rotateRate;
         *             // 最大行走速度为原来的2倍
         *             myCharacter.maxWalkSpeed = 2 * myCharacter.maxWalkSpeed;
         *             // 行走制动速率为原来的0.1倍
         *             myCharacter.brakingDecelerationWalking = 0.1 * myCharacter.brakingDecelerationWalking;
         *             myCharacter.groundFriction = 1;
         *             // 添加一个按键方法:按下键盘“1”，启用/禁用地面摩擦力
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.groundFrictionEnabled = !myCharacter.groundFriction;
         *             });
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 如果角色正在移动，打印角色的移动速度
         *             if(myCharacter.isMoving) {
         *                 console.log("当前角色速度:" + myCharacter.velocity);
         *             }
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get groundFrictionEnabled(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 设置单独制动摩擦状态。当角色处于运动状态，制动摩擦用于让角色去停止移动（当没有加速时）。
         * @effect 调用端生效
         * @param used usage: 制动摩擦。
         * @networkStatus usage:双端
         */
        set groundFrictionEnabled(used: boolean);
        /**
         * @groups 角色系统/角色
         * @description 获取角色的飞行制动速率
         * @effect 调用端生效
         * @returns 制动速率。<br> 默认值为2048。
         * @example
         * 使用示例:将使用到的资源:"53011,20307"拖入优先加载栏。创建一个名为"Example_BrakingDecelerationFlying"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，角色切换为飞行，按下键盘“2”，角色进行喷射加速，修改飞行制动速度。你将在场景中看到角色在加速飞行过程中飞行制动速度变化的效果。代码如下：
         * ```
         * @Component
         * export default class Example_BrakingDecelerationFlying extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 加载喷射加速动画
         *             let boostAnimation = myCharacter.loadAnimation("53011");
         *             boostAnimation.loop = 0;
         *             let isBoost = false
         *             // 加载上升姿态
         *             let boostStance = myCharacter.loadSubStance("20307");
         *             // 添加一个按键方法:键盘“1”，角色切换为飞行
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.switchToFlying();
         *             });
         *             // 添加一个按键方法:按下键盘“2”，角色进行喷射加速
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(isBoost) return;
         *                 let boost_interval = 0;
         *                 if(myCharacter.isMoving) {
         *                     // 播放飞行动画，修改飞行速度和制动速度
         *                     boostAnimation.play();
         *                     myCharacter.maxFlySpeed = 2000;
         *                     myCharacter.brakingDecelerationFlying = 5000;
         *                     // 设置加速周期，每帧检查角色是否移动，当角色停止移动时,执行停止加速操作:停止动画清除姿态，还原飞行速度，清除加速周期
         *                     boost_interval = setInterval(() => {
         *                         if(!myCharacter.isMoving) {
         *                             isBoost = false;
         *                             clearInterval(boost_interval);
         *                             myCharacter.maxFlySpeed = 500;
         *                             boostAnimation.stop();
         *                             boostStance.stop();
         *                         }
         *                     }, 1);
         *                 // 如果当前角色静止，修改角色为上升姿态，设置加速周期，每帧上升5个单位
         *                 } else {
         *                     boostStance.play();
         *                     boost_interval = setInterval(() => {
         *                         myCharacter.addMovement(new Vector(0, 0, 5));
         *                     }, 1);
         *                 }
         *                 // 2秒后执行停止加速操作
         *                     setTimeout(() => {
         *                         isBoost = false;
         *                         clearInterval(boost_interval);
         *                         myCharacter.maxFlySpeed = 500;
         *                         boostAnimation.stop();
         *                         boostStance.stop();
         *                     }, 2000);
         *                     // 2.2秒后还原角色飞行制动速度
         *                     setTimeout(() => {
         *                         myCharacter.brakingDecelerationFlying = 300;
         *                     }, 2200);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get brakingDecelerationFlying(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色飞行制动速率。角色在空中飞行时减速且不施加加速度。
         * @effect 调用端生效
         * @param InBrakingDecelerationFlying usage:制动速率。 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set brakingDecelerationFlying(InBrakingDecelerationFlying: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色最大游泳速度。角色在游泳状态下，可达到的最大移动速度。
         * @effect 调用端生效
         * @returns 最大游泳速度。<br> 默认值为300
         * @example
         * 使用示例:将使用到的资源:"53011,20307"拖入优先加载栏。创建一个名为"Example_MaxSwimSpeed"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成拱形容器并适配游泳区域。按下键盘“1”，角色切换游泳。按下键盘“4”，角色修改最大游泳速度进行喷射加速。你可以看到的角色最大游泳速度变化的效果。代码如下：
         * ```
         * @Component
         * export default class Example_MaxSwimSpeed extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 生成拱形容器并适配游泳区域
         *             GameObject.spawn("WaterVolume",{transform: new Transform(new Vector(0, 0, 500), new Rotation(0, 0, 90), new Vector(20, 20, 10))});
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             let flag = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置游泳属性
         *             myCharacter.canJumpOutOfWater = true;
         *             myCharacter.outOfWaterVerticalSpeed = 100;
         *             // 加载加速动画
         *             let boostAnimation = myCharacter.loadAnimation("53011");
         *             boostAnimation.loop = 10;
         *             let isBoost = false
         *             // 加载上升姿态
         *             let boostStance = myCharacter.loadSubStance("20307");
         *             // 添加一个按键方法:按下键盘“1”，角色切换游泳 / 行走
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(flag) {
         *                     myCharacter.switchToWalking();
         *                 } else {
         *                     myCharacter.switchToSwimming();
         *                 }
         *                 flag = !flag;
         *             });
         *             // 添加一个按键方法:按住键盘“2”，角色上浮
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCharacter.swimUp(10);
         *             });
         *             // 添加一个按键方法:按住键盘“3”，角色下潜
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCharacter.swimDown(10);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，角色进行喷射加速
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 if(isBoost) return;
         *                 let boost_interval = 0;
         *                 if(myCharacter.isMoving) {
         *                     // 播放游泳动画，修改游泳速度和制动速度
         *                     boostAnimation.play();
         *                     myCharacter.maxSwimSpeed = 600;
         *                     myCharacter.brakingDecelerationSwimming = 4096;
         *                     // 设置加速周期，每帧检查角色是否移动，当角色停止移动时,执行停止加速操作:停止动画清除姿态，还原游泳速度，清除加速周期
         *                     boost_interval = setInterval(() => {
         *                         if(!myCharacter.isMoving) {
         *                             isBoost = false;
         *                             clearInterval(boost_interval);
         *                             myCharacter.maxSwimSpeed = 300;
         *                             boostAnimation.stop();
         *                             boostStance.stop();
         *                         }
         *                     }, 1);
         *                 // 如果当前角色静止，修改角色为上升姿态，设置加速周期，每帧上升5个单位
         *                 } else {
         *                     boostStance.play();
         *                     boost_interval = setInterval(() => {
         *                         myCharacter.swimUp(1)
         *                     }, 1);
         *                 }
         *                 // 1秒后执行停止加速操作
         *                     setTimeout(() => {
         *                         isBoost = false;
         *                         clearInterval(boost_interval);
         *                         myCharacter.maxSwimSpeed = 300;
         *                         boostAnimation.stop();
         *                         boostStance.stop();
         *                     }, 1000);
         *                     // 1.2秒后还原角色游泳制动速度
         *                     setTimeout(() => {
         *                         myCharacter.brakingDecelerationSwimming = 4096
         *                     }, 1200);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get maxSwimSpeed(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色最大游泳速度
         * @effect 调用端生效
         * @param InMaxSwimSpeed usage: 最大游泳速度。<br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set maxSwimSpeed(InMaxSwimSpeed: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色游泳制动速率。角色在游泳状态下移动时受到的减速度。
         * @effect 调用端生效
         * @returns 制动速率。<br> 默认值为2048。
         * @example
         * 使用示例:将使用到的资源:"53011,20307"拖入优先加载栏。创建一个名为"Example_BrakingDecelerationSwimming"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成拱形容器并适配游泳区域。按下键盘“1”，角色切换游泳。按下键盘“4”，角色修改游泳制动速度后进行喷射加速。你可以看到的角色游泳制动速度变化的效果。代码如下：
         * ```
         * @Component
         * export default class Example_BrakingDecelerationSwimming extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 生成拱形容器并适配游泳区域
         *             GameObject.spawn("WaterVolume",{transform: new Transform(new Vector(0, 0, 500), new Rotation(0, 0, 90), new Vector(20, 20, 10))});
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             let flag = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置游泳属性
         *             myCharacter.canJumpOutOfWater = true;
         *             myCharacter.outOfWaterVerticalSpeed = 100;
         *             // 加载加速动画
         *             let boostAnimation = myCharacter.loadAnimation("53011");
         *             boostAnimation.loop = 10;
         *             let isBoost = false
         *             // 加载上升姿态
         *             let boostStance = myCharacter.loadSubStance("20307");
         *             // 添加一个按键方法:按下键盘“1”，角色切换游泳 / 行走
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(flag) {
         *                     myCharacter.switchToWalking();
         *                 } else {
         *                     myCharacter.switchToSwimming();
         *                 }
         *                 flag = !flag;
         *             });
         *             // 添加一个按键方法:按住键盘“2”，角色上浮
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCharacter.swimUp(10);
         *             });
         *             // 添加一个按键方法:按住键盘“3”，角色下潜
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCharacter.swimDown(10);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，角色进行喷射加速
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 if(isBoost) return;
         *                 let boost_interval = 0;
         *                 if(myCharacter.isMoving) {
         *                     // 播放游泳动画，修改游泳速度和制动速度
         *                     boostAnimation.play();
         *                     myCharacter.maxSwimSpeed = 600;
         *                     myCharacter.brakingDecelerationSwimming = 4096;
         *                     // 设置加速周期，每帧检查角色是否移动，当角色停止移动时,执行停止加速操作:停止动画清除姿态，还原游泳速度，清除加速周期
         *                     boost_interval = setInterval(() => {
         *                         if(!myCharacter.isMoving) {
         *                             isBoost = false;
         *                             clearInterval(boost_interval);
         *                             myCharacter.maxSwimSpeed = 300;
         *                             boostAnimation.stop();
         *                             boostStance.stop();
         *                         }
         *                     }, 1);
         *                 // 如果当前角色静止，修改角色为上升姿态，设置加速周期，每帧上升5个单位
         *                 } else {
         *                     boostStance.play();
         *                     boost_interval = setInterval(() => {
         *                         myCharacter.swimUp(1)
         *                     }, 1);
         *                 }
         *                 // 1秒后执行停止加速操作
         *                     setTimeout(() => {
         *                         isBoost = false;
         *                         clearInterval(boost_interval);
         *                         myCharacter.maxSwimSpeed = 300;
         *                         boostAnimation.stop();
         *                         boostStance.stop();
         *                     }, 1000);
         *                     // 1.2秒后还原角色游泳制动速度
         *                     setTimeout(() => {
         *                         myCharacter.brakingDecelerationSwimming = 4096
         *                     }, 1200);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get brakingDecelerationSwimming(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色游泳制动速率
         * @effect 调用端生效
         * @param InBrakingDecelerationSwimming usage: 制动速率。 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set brakingDecelerationSwimming(InBrakingDecelerationSwimming: number);
        /**
         * @groups 角色系统/角色
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:039 reason:多余接口 replacement:
         * @description 获取角色是否可以跳出水面到陆地上
         * @effect 调用端生效
         * @returns true表示可以跳出水面，false表示不可以跳出水面，只会浮在水中。<br> 默认是false
         * @example
         * 使用示例:将使用到的资源:"53011,20307"拖入优先加载栏。创建一个名为"CanJumpOutOfWater"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，设置角色可以跳出水面，在场景中生成拱形容器并适配游泳区域。按住键盘“2”，角色上浮。你可以看到的角色到达水面并跃出的效果。代码如下：
         * ```ts
         * @Component
         * export default class CanJumpOutOfWater extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 生成拱形容器并适配游泳区域
         *             GameObject.spawn("WaterVolume",{transform: new Transform(new Vector(0, 0, 500), new Rotation(0, 0, 90), new Vector(20, 20, 10))});
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             let flag = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置游泳属性
         *             myCharacter.canJumpOutOfWater = true;
         *             myCharacter.outOfWaterVerticalSpeed = 100;
         *             // 加载加速动画
         *             let boostAnimation = myCharacter.loadAnimation("53011");
         *             boostAnimation.loop = 10;
         *             let isBoost = false
         *             // 加载上升姿态
         *             let boostStance = myCharacter.loadSubStance("20307");
         *             // 添加一个按键方法:按下键盘“1”，角色切换游泳 / 行走
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(flag) {
         *                     myCharacter.switchToWalking();
         *                 } else {
         *                     myCharacter.switchToSwimming();
         *                 }
         *                 flag = !flag;
         *             });
         *             // 添加一个按键方法:按住键盘“2”，角色上浮
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCharacter.swimUp(10);
         *             });
         *             // 添加一个按键方法:按住键盘“3”，角色下潜
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCharacter.swimDown(10);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，角色进行喷射加速
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 if(isBoost) return;
         *                 let boost_interval = 0;
         *                 if(myCharacter.isMoving) {
         *                     // 播放游泳动画，修改游泳速度和制动速度
         *                     boostAnimation.play();
         *                     myCharacter.maxSwimSpeed = 600;
         *                     myCharacter.brakingDecelerationSwimming = 4096;
         *                     // 设置加速周期，每帧检查角色是否移动，当角色停止移动时,执行停止加速操作:停止动画清除姿态，还原游泳速度，清除加速周期
         *                     boost_interval = setInterval(() => {
         *                         if(!myCharacter.isMoving) {
         *                             isBoost = false;
         *                             clearInterval(boost_interval);
         *                             myCharacter.maxSwimSpeed = 300;
         *                             boostAnimation.stop();
         *                             boostStance.stop();
         *                         }
         *                     }, 1);
         *                 // 如果当前角色静止，修改角色为上升姿态，设置加速周期，每帧上升5个单位
         *                 } else {
         *                     boostStance.play();
         *                     boost_interval = setInterval(() => {
         *                         myCharacter.swimUp(1)
         *                     }, 1);
         *                 }
         *                 // 1秒后执行停止加速操作
         *                     setTimeout(() => {
         *                         isBoost = false;
         *                         clearInterval(boost_interval);
         *                         myCharacter.maxSwimSpeed = 300;
         *                         boostAnimation.stop();
         *                         boostStance.stop();
         *                     }, 1000);
         *                     // 1.2秒后还原角色游泳制动速度
         *                     setTimeout(() => {
         *                         myCharacter.brakingDecelerationSwimming = 4096
         *                     }, 1200);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get canJumpOutOfWater(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 设置角色是否可以跳出水面到陆地上。角色通过 swimUp 接口上浮到水面时，可打开此属性跳出水面。
         * @effect 调用端生效
         * @param value usage: true表示可以跳出水面，false表示不可以跳出水面，只会浮在水中。
         * @networkStatus usage:双端
         */
        set canJumpOutOfWater(value: boolean);
        /**
         * @description 当前播放的动画对象
         */
        get currentAnimation(): mw.Animation;
        /**
         * @groups 角色系统/角色
         * @description 出水时垂直方向速度
         * @effect 调用端生效
         * @example
         * 使用示例:将使用到的资源:"53011,20307"拖入优先加载栏。创建一个名为"Example_OutOfWaterVerticalSpeed "的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，设置角色可以跳出水面且出水垂直速度为100。在场景中生成拱形容器并适配游泳区域。按住键盘“2”，角色上浮。你可以看到的角色到达水面并跃出的效果。代码如下：
         * ```
         * @Component
         * export default class Example_OutOfWaterVerticalSpeed  extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 生成拱形容器并适配游泳区域
         *             GameObject.spawn("WaterVolume",{transform: new Transform(new Vector(0, 0, 500), new Rotation(0, 0, 90), new Vector(20, 20, 10))});
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             let flag = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置游泳属性
         *             myCharacter.canJumpOutOfWater = true;
         *             myCharacter.outOfWaterVerticalSpeed = 100;
         *             // 加载加速动画
         *             let boostAnimation = myCharacter.loadAnimation("53011");
         *             boostAnimation.loop = 10;
         *             let isBoost = false
         *             // 加载上升姿态
         *             let boostStance = myCharacter.loadSubStance("20307");
         *             // 添加一个按键方法:按下键盘“1”，角色切换游泳 / 行走
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(flag) {
         *                     myCharacter.switchToWalking();
         *                 } else {
         *                     myCharacter.switchToSwimming();
         *                 }
         *                 flag = !flag;
         *             });
         *             // 添加一个按键方法:按住键盘“2”，角色上浮
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCharacter.swimUp(10);
         *             });
         *             // 添加一个按键方法:按住键盘“3”，角色下潜
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCharacter.swimDown(10);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，角色进行喷射加速
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 if(isBoost) return;
         *                 let boost_interval = 0;
         *                 if(myCharacter.isMoving) {
         *                     // 播放游泳动画，修改游泳速度和制动速度
         *                     boostAnimation.play();
         *                     myCharacter.maxSwimSpeed = 600;
         *                     myCharacter.brakingDecelerationSwimming = 4096;
         *                     // 设置加速周期，每帧检查角色是否移动，当角色停止移动时,执行停止加速操作:停止动画清除姿态，还原游泳速度，清除加速周期
         *                     boost_interval = setInterval(() => {
         *                         if(!myCharacter.isMoving) {
         *                             isBoost = false;
         *                             clearInterval(boost_interval);
         *                             myCharacter.maxSwimSpeed = 300;
         *                             boostAnimation.stop();
         *                             boostStance.stop();
         *                         }
         *                     }, 1);
         *                 // 如果当前角色静止，修改角色为上升姿态，设置加速周期，每帧上升5个单位
         *                 } else {
         *                     boostStance.play();
         *                     boost_interval = setInterval(() => {
         *                         myCharacter.swimUp(1)
         *                     }, 1);
         *                 }
         *                 // 1秒后执行停止加速操作
         *                     setTimeout(() => {
         *                         isBoost = false;
         *                         clearInterval(boost_interval);
         *                         myCharacter.maxSwimSpeed = 300;
         *                         boostAnimation.stop();
         *                         boostStance.stop();
         *                     }, 1000);
         *                     // 1.2秒后还原角色游泳制动速度
         *                     setTimeout(() => {
         *                         myCharacter.brakingDecelerationSwimming = 4096
         *                     }, 1200);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get outOfWaterVerticalSpeed(): number;
        /**
         * @groups 角色系统/角色
         * @description 出水时垂直方向速度
         * @effect 调用端生效
         * @param value usage: 出水速度。 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set outOfWaterVerticalSpeed(value: number);
        /**
         * @groups 角色系统/角色
         * @description 设置角色最大下落速度。角色在下落状态下移动时，角色可达到的最大移动速度
         * @effect 调用端生效
         * @returns 下落速度。<br> 默认值为2048。
         * @example
         * 使用示例:创建一个名为"Example_MaxFallingSpeed"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将设置角色最大下落速度为1024。按下键盘“1”，角色设置跳跃高度为1000后跳跃，你可以在场景中看到比正常更快的下落速度的效果。代码如下：
         * ```
         * @Component
         * export default class Example_MaxFallingSpeed extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大下落速度为1024
         *             myCharacter.maxFallingSpeed = 1024;
         *             // 下落制动速率为10
         *             myCharacter.horizontalBrakingDecelerationFalling = 10;
         *             // 按地面移动速率的0.1倍控制下落过程
         *             myCharacter.driftControl = 0.1;
         *             // 10倍重力
         *             myCharacter.gravityScale = 10;
         *             // 添加一个按键方法：按下键盘“1”，角色设置跳跃高度为1000后跳跃。
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.maxJumpHeight = 1000;
         *                 myCharacter.jump();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get maxFallingSpeed(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色最大下落速度
         * @effect 调用端生效
         * @param speed usage: 下落速度。 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set maxFallingSpeed(speed: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色下落制动速率。角色在下落状态下移动时受到的减速度。
         * @effect 调用端生效
         * @returns 制动速率。<br> 默认值为500。
         * @example
         * 使用示例:创建一个名为"Example_HorizontalBrakingDecelerationFalling"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将设置角色下落制动速度为10。按下键盘“1”，角色设置跳跃高度为1000后跳跃，你可以在场景中看到比正常更慢的下落加速的效果。代码如下：
         * ```
         * @Component
         * export default class Example_HorizontalBrakingDecelerationFalling extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大下落速度为1024
         *             myCharacter.maxFallingSpeed = 1024;
         *             // 下落制动速率为10
         *             myCharacter.horizontalBrakingDecelerationFalling = 10;
         *             // 按地面移动速率的0.1倍控制下落过程
         *             myCharacter.driftControl = 0.1;
         *             // 10倍重力
         *             myCharacter.gravityScale = 10;
         *             // 添加一个按键方法：按下键盘“1”，角色设置跳跃高度为1000后跳跃。
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.maxJumpHeight = 1000;
         *                 myCharacter.jump();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get horizontalBrakingDecelerationFalling(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色下落制动速率
         * @effect 调用端生效
         * @param InBrakingDecelerationFalling usage: 制动速率。 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set horizontalBrakingDecelerationFalling(InBrakingDecelerationFalling: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色在空中的灵活度。角色在空中时, 控制水平方向移动的灵活度；范围:0~1, 0表示不能控制, 1表示能按地面最大移动速率完全控制
         * @effect 调用端生效
         * @returns 空中灵活度。<br> 默认值为0.2。
         * @example
         * 使用示例:创建一个名为"Example_DriftControl"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将设置角色空中控制系数为0.1。按下键盘“1”，角色设置跳跃高度为1000后跳跃，你可以在场景中看到超过下落速度阈值后空中角色难以控制的效果。代码如下：
         * ```
         * @Component
         * export default class Example_DriftControl extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大下落速度为1024
         *             myCharacter.maxFallingSpeed = 1024;
         *             // 下落制动速率为10
         *             myCharacter.horizontalBrakingDecelerationFalling = 10;
         *             // 按地面移动速率的0.1倍控制下落过程
         *             myCharacter.driftControl = 0.1;
         *             // 10倍重力
         *             myCharacter.gravityScale = 10;
         *             // 添加一个按键方法：按下键盘“1”，角色设置跳跃高度为1000后跳跃。
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.maxJumpHeight = 1000;
         *                 myCharacter.jump();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get driftControl(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色在空中的灵活度
         * @effect 调用端生效
         * @param InAirControl usage: 制动速率。 <br> range: [0,1]
         * @networkStatus usage:双端
         */
        set driftControl(InAirControl: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色最大加速度。角色移动时，角色可以达到的最大加速度
         * @effect 调用端生效
         * @returns 最大加速度。<br> 默认值为2048。
         * @example
         * 使用示例:创建一个名为"Example_Character_MaxAcceleration"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将设置角色最大加速度为原来的0.1倍，并在场景中看到角色加速变慢的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_MaxAcceleration extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             this.useUpdate = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.maxAcceleration = 0.1 * myCharacter.maxAcceleration;
         *             // 最大转向速度为原来的0.5倍
         *             myCharacter.rotateRate = 0.5 * myCharacter.rotateRate;
         *             // 最大行走速度为原来的2倍
         *             myCharacter.maxWalkSpeed = 2 * myCharacter.maxWalkSpeed;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.brakingDecelerationWalking = 0.1 * myCharacter.brakingDecelerationWalking;
         *             myCharacter.groundFriction = 1;
         *             // 添加一个按键方法：按下键盘“1”，切换角色摩擦力的来源
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.groundFrictionEnabled = !myCharacter.groundFriction;
         *             });
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 如果角色正在移动，打印角色的移动速度
         *             if(myCharacter.isMoving) {
         *                 console.log("当前角色速度：" + myCharacter.velocity);
         *             }
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get maxAcceleration(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色最大加速度
         * @effect 调用端生效
         * @param InMaxAcceleration usage: 最大加速度。 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set maxAcceleration(InMaxAcceleration: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色最大转向速度。角色每秒旋转的最大速度。设置为负值时，转向速度被视为无限大，可以瞬间转向。
         * @effect 调用端生效
         * @returns 最大转向速度。<br> 默认值为180度/秒。
         * @example
         * 使用示例:创建一个名为"Example_Character_RotateRate"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将设置角色转向速度为原来的0.5倍，并在场景中看到角色转向变慢的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_RotateRate extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             this.useUpdate = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.maxAcceleration = 0.1 * myCharacter.maxAcceleration;
         *             // 最大转向速度为原来的0.5倍
         *             myCharacter.rotateRate = 0.5 * myCharacter.rotateRate;
         *             // 最大行走速度为原来的2倍
         *             myCharacter.maxWalkSpeed = 2 * myCharacter.maxWalkSpeed;
         *             // 最大加速度为原来的0.1倍
         *             myCharacter.brakingDecelerationWalking = 0.1 * myCharacter.brakingDecelerationWalking;
         *             myCharacter.groundFriction = 1;
         *             // 添加一个按键方法：按下键盘“1”，切换角色摩擦力的来源
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.groundFrictionEnabled = !myCharacter.groundFriction;
         *             });
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 如果角色正在移动，打印角色的移动速度
         *             if(myCharacter.isMoving) {
         *                 console.log("当前角色速度：" + myCharacter.velocity);
         *             }
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get rotateRate(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色最大转向速度
         * @effect 调用端生效
         * @param InBrakingDecelerationSwimming usage: 最大转向速度。 <br> range: (0,360]
         * @networkStatus usage:双端
         */
        set rotateRate(InRotateRate: number);
        /**
         * @groups 角色系统/角色
         * @description 获取重力的倍率。对于角色来说，重力会乘以该值。范围0~10, 过大和过小的值都会被限制。
         * @effect 调用端生效
         * @returns 倍率。<br> 默认值为1.0。
         * @example
         * 使用示例:创建一个名为"Example_Character_GravityScale"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将设置角色重力倍率为10。按下键盘“1”，角色设置跳跃高度为1000后跳跃，你可以在场景中看到十倍重力下角色下落的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_GravityScale extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大下落速度为1024
         *             myCharacter.maxFallingSpeed = 1024;
         *             // 下落制动速率为10
         *             myCharacter.horizontalBrakingDecelerationFalling = 10;
         *             // 按地面移动速率的0.1倍控制下落过程
         *             myCharacter.driftControl = 0.1;
         *             // 10倍重力
         *             myCharacter.gravityScale = 10;
         *             // 添加一个按键方法：按下键盘“1”，角色设置跳跃高度为1000后跳跃。
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.maxJumpHeight = 1000;
         *                 myCharacter.jump();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get gravityScale(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置重力的倍率
         * @effect 调用端生效
         * @param newGravityScale usage: 制动速率。 <br> range: (0,10]
         * @networkStatus usage:双端
         */
        set gravityScale(newGravityScale: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色是否正在跳跃
         * @effect 调用端生效
         * @returns 跳跃状态。true表示正在跳跃，false表示不在跳跃。
         * @example
         * 使用示例:创建一个名为"Example_Character_IsJumping"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，设置角色最大跳跃高度为300，最高三连跳。按下键盘“1”，角色跳跃。按下键盘“2”，启用/禁用跳跃能力。你将在场景中看到角色禁用跳跃能力的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_IsJumping extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大跳跃高度为300
         *             myCharacter.maxJumpHeight = 300;
         *             // 最高三连跳
         *             myCharacter.jumpMaxCount = 3;
         *             // 添加一个按键方法:按下键盘“1”，角色跳跃。
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.jump();
         *                 console.log("当前角色是否在跳跃 " + myCharacter.isJumping);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，启用/禁用跳跃能力。
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.jumpEnabled = !myCharacter.jumpEnabled;
         *                 console.log("当前角色跳跃能力 " + myCharacter.jumpEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get isJumping(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 获取角色最大跳跃高度。角色跳跃时，从起跳位置到最高位置的距离。该值受重力影响。
         * @effect 调用端生效
         * @returns 跳跃高度。<br> 默认值为50.0。
         * @example
         * 使用示例:创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，设置角色最大跳跃高度为300，最高三连跳。按下键盘“1”，角色跳跃。按下键盘“2”，启用/禁用跳跃能力。你将在场景中看到角色禁用跳跃能力的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大跳跃高度为300
         *             myCharacter.maxJumpHeight = 300;
         *             // 最高三连跳
         *             myCharacter.jumpMaxCount = 3;
         *             // 添加一个按键方法:按下键盘“1”，角色跳跃。
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.jump();
         *                 console.log("当前角色是否在跳跃 " + myCharacter.isJumping);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，启用/禁用跳跃能力。
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.jumpEnabled = !myCharacter.jumpEnabled;
         *                 console.log("当前角色跳跃能力 " + myCharacter.jumpEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get maxJumpHeight(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色最大跳跃高度
         * @effect 调用端生效
         * @param InMaxJumpHeight usage: 制动速率。 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set maxJumpHeight(InMaxJumpHeight: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色最大可跳跃次数。角色能够执行跳跃的最大次数。
         * @effect 调用端生效
         * @returns 跳跃次数。
         * @example
         * 使用示例:创建一个名为"Example_Character_jumpMaxCount"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏设置角色最大跳跃高度为300，最高三连跳。按下键盘“1”，角色跳跃。按下键盘“2”，启用/禁用跳跃能力。你将在场景中看到角色禁用跳跃能力的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_jumpMaxCount extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大跳跃高度为300
         *             myCharacter.maxJumpHeight = 300;
         *             // 最高三连跳
         *             myCharacter.jumpMaxCount = 3;
         *             // 添加一个按键方法:按下键盘“1”，角色跳跃。
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.jump();
         *                 console.log("当前角色是否在跳跃 " + myCharacter.isJumping);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，启用/禁用跳跃能力。
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.jumpEnabled = !myCharacter.jumpEnabled;
         *                 console.log("当前角色跳跃能力 " + myCharacter.jumpEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get jumpMaxCount(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色最大可跳跃次数
         * @effect 调用端生效
         * @param InJumpMaxCount usage: 跳跃次数。 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set jumpMaxCount(InJumpMaxCount: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色是否正在蹲下
         * @effect 调用端生效
         * @returns 下蹲状态。
         * @example
         * 使用示例:将使用到的资源:"54834,36851"拖入优先加载栏。创建一个名为"Example_Character_IsCrouching"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成草丛和拱门并添加触发器。看到角色进入草丛蹲下，离开站起的效果，并在控制台看到打印的角色当前的蹲起状态。代码如下：
         * ```
         * @Component
         * export default class Example_Character_IsCrouching extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 生成草丛和拱门
         *             GameObject.spawn("54834",{transform: new Transform(new Vector(300, 0, 0), Rotation.zero, new Vector(2, 2, 2))});
         *             let arch = GameObject.spawn("36851",{transform: new Transform(new Vector(300, 210, 0), new Rotation(0, 0, 90), new Vector(2, 1, 2))}) as Model;
         *             arch.setCollision(CollisionStatus.On);
         *             // 生成触发器并添加委托函数：进入触发器的角色蹲下，离开触发器站起
         *             let tri = GameObject.spawn("Trigger",{transform: new Transform(new Vector(300, 0, 50), Rotation.zero, new Vector(2, 2, 1))}) as Trigger;
         *             tri.onEnter.add((character: Character) => {
         *                 character.crouch(true);
         *                 setTimeout(() => {
         *                     console.log("当前角色下蹲 " + character.isCrouching);
         *                 }, 500);
         *             });
         *             tri.onLeave.add((character: Character) => {
         *                 character.crouch(false);
         *                 console.log("当前角色下蹲 " + character.isCrouching);
         *             });
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 地面蹲伏行走时的最大移动速度100
         *             myCharacter.maxWalkSpeedCrouched = 100;
         *             // 下蹲后高度为100
         *             myCharacter.crouchedHeight = 100;
         *             // 添加一个按键方法：按下键盘“1”，启用/禁用下蹲能力
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.crouchEnabled = !myCharacter.crouchEnabled;
         *                 console.log("当前角色是否能下蹲 " + myCharacter.crouchEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get isCrouching(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 获取角色运动面朝方向。角色模型运动时朝向的方向：
         * 1. 始终朝向移动方向:主角模型面朝方向始终朝向移动方向。
         * 2. 始终朝向固定方向:主角模型面朝方向始终朝向固定方向。
         * 3. 始终朝向控制器方向:主角模型面朝方向始终朝向控制器
         * @effect 调用端生效
         * @returns 面朝方向枚举值。
         * @example
         * 使用示例:创建一个名为"Example_Character_MoveFacingDirection"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，切换角色的运动面朝方向。你将在场景中看到角色不同运动面朝方向的效果并在控制台看到打印的当前角色的运动轴和面朝方向。代码如下：
         * ```
         * @Component
         * export default class Example_Character_MoveFacingDirection extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置定轴方向
         *             myCharacter.movementAxisDirection = new Vector(1, 0, 0);
         *             // 打印当前角色的运动轴和面朝方向
         *             console.log("当前角色的运动面朝方向 " + MoveFacingDirection[myCharacter.moveFacingDirection]);
         *             console.log("当前角色的运动时依据的正方向 " + MovementDirection[myCharacter.movementDirection]);
         *             // 添加一个按键方法:按下键盘“1”，切换角色的运动面朝方向
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.moveFacingDirection = (myCharacter.moveFacingDirection + 1) % 3;
         *                 console.log("当前角色的运动 " + MoveFacingDirection[myCharacter.moveFacingDirection] + " + " + MovementDirection[myCharacter.movementDirection]);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，切换角色的运动时依据的正方向
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.movementDirection = (myCharacter.movementDirection + 1) % 3;
         *                 console.log("当前角色的运动 " + MoveFacingDirection[myCharacter.moveFacingDirection] + " + " + MovementDirection[myCharacter.movementDirection]);
         *                 if(myCharacter.movementDirection == 0) {
         *                     console.log("当前角色的运动 " + MoveFacingDirection[myCharacter.moveFacingDirection] + " + " + MovementDirection[myCharacter.movementDirection] + " 定轴方向 " + myCharacter.movementAxisDirection);
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get moveFacingDirection(): mw.MoveFacingDirection;
        /**
         * @groups 角色系统/角色
         * @description 设置角色运动时面朝方向。
         * @effect 调用端生效
         * @param InMoveFacingDirection usage: 面朝方向。
         * @networkStatus usage:双端
         */
        set moveFacingDirection(InMoveFacingDirection: mw.MoveFacingDirection);
        /**
         * @groups 角色系统/角色
         * @description 获取角色运动正方向。角色运动时依据的正方向。
         * 1. 控制器方向，就以控制器坐标系为轴;
         * 2. 如果是定轴方向，就以世界坐标系中movementAxisDirection为轴;
         * 3. 如果是视线方向，就以相机坐标系的为轴。在玩家相机不存在Z轴旋转时，控制器方向和视线方向效果一致，人形对象的控制器方向和视线方向效果永远一致。
         * @effect 调用端生效
         * @returns 运动正方向。
         * @example
         * 使用示例:创建一个名为"Example_Character_MovementDirection"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“2”，切换角色的运动时依据的正方向。你将在场景中看到角色不同运动时依据正方向的效果并在控制台看到打印的当前角色的运动轴和依据的正方向。代码如下：
         * ```
         * @Component
         * export default class Example_Character_MovementDirection extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置定轴方向
         *             myCharacter.movementAxisDirection = new Vector(1, 0, 0);
         *             // 打印当前角色的运动轴和面朝方向
         *             console.log("当前角色的运动面朝方向 " + MoveFacingDirection[myCharacter.moveFacingDirection]);
         *             console.log("当前角色的运动时依据的正方向 " + MovementDirection[myCharacter.movementDirection]);
         *             // 添加一个按键方法:按下键盘“1”，切换角色的运动面朝方向
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.moveFacingDirection = (myCharacter.moveFacingDirection + 1) % 3;
         *                 console.log("当前角色的运动 " + MoveFacingDirection[myCharacter.moveFacingDirection] + " + " + MovementDirection[myCharacter.movementDirection]);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，切换角色的运动时依据的正方向
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.movementDirection = (myCharacter.movementDirection + 1) % 3;
         *                 console.log("当前角色的运动 " + MoveFacingDirection[myCharacter.moveFacingDirection] + " + " + MovementDirection[myCharacter.movementDirection]);
         *                 if(myCharacter.movementDirection == 0) {
         *                     console.log("当前角色的运动 " + MoveFacingDirection[myCharacter.moveFacingDirection] + " + " + MovementDirection[myCharacter.movementDirection] + " 定轴方向 " + myCharacter.movementAxisDirection);
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get movementDirection(): mw.MovementDirection;
        /**
         * @groups 角色系统/角色
         * @description 设置角色运动正方向
         * @effect 调用端生效
         * @param InMovementDirection usage: 运动正方向。
         * @networkStatus usage:双端
         */
        set movementDirection(InMovementDirection: mw.MovementDirection);
        /**
         * @groups 角色系统/角色
         * @description 获取角色碰撞形状（胶囊体型、球型、盒型）。角色碰撞盒形状的大小，决定角色与场景对象交互时检测碰撞范围的大小。球体取xyz最小值，胶囊体半径取xy最小值，z为半长，盒体xyz为半长宽高。
         * @effect 调用端生效
         * @returns 碰撞形状。
         * @example
         * 使用示例:将使用到的资源:"36851"拖入优先加载栏。创建一个名为"Example_Character_CollisionShape"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“3”，修改角色碰撞并打印结果。你将在控制台中看到打印的当前角色碰撞形状。代码如下：
         * ```
         * @Component
         * export default class Example_Character_CollisionShape extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 生成拱门带碰撞的拱门
         *             let arch = GameObject.spawn("36851",{transform: new Transform(new Vector(300, 210, 0), new Rotation(0, 0, 90), new Vector(2, 1, 2))}) as Model;
         *             arch.setCollision(CollisionStatus.On);
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置角色碰撞属性和跳跃属性
         *             myCharacter.capsuleCorrectionEnabled = true;
         *             myCharacter.maxJumpHeight = 250;
         *             let NPC = Player.spawnDefaultCharacter();
         *             NPC.worldTransform.position = new Vector(0, 100, 100);
         *             // 添加一个按键方法：按下键盘“1”，开启/关闭NPC与其他角色的碰撞
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 NPC.collisionWithOtherCharacterEnabled = !NPC.collisionWithOtherCharacterEnabled;
         *                 console.log("NPC与角色的碰撞 " + NPC.collisionWithOtherCharacterEnabled);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，开启/关闭角色是否可被站立
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 NPC.canStandOn = !NPC.canStandOn;
         *                 console.log("NPC角色可被站立 " + NPC.canStandOn);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，修改角色碰撞并打印结果
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 // 碰撞范围collisionExtent内部值全是半值，半径半高半长
         *                 myCharacter.setCollisionShapeAndExtent(CustomShapeType.Box, new Vector(50, 50, 200));
         *                 console.log("当前角色碰撞 " + myCharacter.collisionShape + " " + myCharacter.collisionExtent);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get collisionShape(): mw.CustomShapeType;
        /**
         * @groups 角色系统/角色
         * @description 设置角色碰撞形状（胶囊体型、球型、盒型）
         * @effect 调用端生效
         * @param CustomShapeType usage: 碰撞形状。
         * @networkStatus usage:双端
         */
        set collisionShape(CustomShapeType: mw.CustomShapeType);
        /**
         * @groups 角色系统/角色
         * @description 获取包裹角色碰撞体的形状大小。角色碰撞盒形状的大小，决定角色与场景对象交互时检测碰撞范围的大小。
         * @effect 调用端生效
         * @returns 形状大小。
         * @example
         * 使用示例:将使用到的资源:"36851"拖入优先加载栏。创建一个名为"Example_Character_CollisionExtent"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“3”，修改角色碰撞并打印结果。你将在控制台中看到打印的当前角色碰撞形状大小。代码如下：
         * ```
         * @Component
         * export default class Example_Character_CollisionExtent extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 生成拱门带碰撞的拱门
         *             let arch = GameObject.spawn("36851",{transform: new Transform(new Vector(300, 210, 0), new Rotation(0, 0, 90), new Vector(2, 1, 2))}) as Model;
         *             arch.setCollision(CollisionStatus.On);
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置角色碰撞属性和跳跃属性
         *             myCharacter.capsuleCorrectionEnabled = true;
         *             myCharacter.maxJumpHeight = 250;
         *             let NPC = Player.spawnDefaultCharacter();
         *             NPC.worldTransform.position = new Vector(0, 100, 100);
         *             // 添加一个按键方法：按下键盘“1”，开启/关闭NPC与其他角色的碰撞
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 NPC.collisionWithOtherCharacterEnabled = !NPC.collisionWithOtherCharacterEnabled;
         *                 console.log("NPC与角色的碰撞 " + NPC.collisionWithOtherCharacterEnabled);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，开启/关闭角色是否可被站立
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 NPC.canStandOn = !NPC.canStandOn;
         *                 console.log("NPC角色可被站立 " + NPC.canStandOn);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，修改角色碰撞并打印结果
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 // 碰撞范围collisionExtent内部值全是半值，半径半高半长
         *                 myCharacter.setCollisionShapeAndExtent(CustomShapeType.Box, new Vector(50, 50, 200));
         *                 console.log("当前角色碰撞 " + myCharacter.collisionShape + " " + myCharacter.collisionExtent);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get collisionExtent(): mw.Vector;
        /**
         * @groups 角色系统/角色
         * @description 设置包裹角色碰撞体的形状大小
         * @effect 调用端生效
         * @param extent usage: 形状大小。
         * @networkStatus usage:双端
         */
        set collisionExtent(extent: mw.Vector);
        /**
         * @groups 角色系统/角色
         * @description 获取角色当前是否使用胶囊体修正。true代表应用角色编辑中的数据自动计算胶囊体大小。false 代表应用"capsuleHalfHeight"和"capsuleRadius"设置胶囊体的大小。
         * @effect 调用端生效
         * @returns 是否使用胶囊体修正。<br> 默认值为true。
         * @example
         * 使用示例:将使用到的资源:"36851"拖入优先加载栏。创建一个名为"Example_Character_CapsuleCorrectionEnabled"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，设置角色碰撞修正为true，代表角色碰撞会和角色外观保持一致。代码如下：
         * ```
         * @Component
         * export default class Example_Character_CapsuleCorrectionEnabled extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 生成拱门带碰撞的拱门
         *             let arch = GameObject.spawn("36851",{transform: new Transform(new Vector(300, 210, 0), new Rotation(0, 0, 90), new Vector(2, 1, 2))}) as Model;
         *             arch.setCollision(CollisionStatus.On);
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置角色碰撞属性和跳跃属性
         *             myCharacter.capsuleCorrectionEnabled = true;
         *             myCharacter.maxJumpHeight = 250;
         *             let NPC = Player.spawnDefaultCharacter();
         *             NPC.worldTransform.position = new Vector(0, 100, 100);
         *             // 添加一个按键方法：按下键盘“1”，开启/关闭NPC与其他角色的碰撞
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 NPC.collisionWithOtherCharacterEnabled = !NPC.collisionWithOtherCharacterEnabled;
         *                 console.log("NPC与角色的碰撞 " + NPC.collisionWithOtherCharacterEnabled);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，开启/关闭角色是否可被站立
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 NPC.canStandOn = !NPC.canStandOn;
         *                 console.log("NPC角色可被站立 " + NPC.canStandOn);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，修改角色碰撞并打印结果
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 // 碰撞范围collisionExtent内部值全是半值，半径半高半长
         *                 myCharacter.setCollisionShapeAndExtent(CustomShapeType.Box, new Vector(50, 50, 200));
         *                 console.log("当前角色碰撞 " + myCharacter.collisionShape + " " + myCharacter.collisionExtent);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get capsuleCorrectionEnabled(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 设置角色当前是否使用胶囊体修正
         * @effect 调用端生效
         * @param usedCapsuleCorrection usage: 是否使用胶囊体修正。
         * @networkStatus usage:双端
         */
        set capsuleCorrectionEnabled(usedCapsuleCorrection: boolean);
        /**
         * @groups 角色系统/角色
         * @description 获取角色下蹲状态下，碰撞盒的高度。
         * @effect 调用端生效
         * @returns 碰撞盒高度。<br> 默认值为60。
         * @example
         * 使用示例:将使用到的资源:"54834,36851"拖入优先加载栏。创建一个名为"Example_Character_CrouchedHeight"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成草丛和拱门并添加触发器，并添加委托函数实现角色进入草丛蹲下，离开站起的效果。设置下蹲后高度为100。你可以看到角色蹲下后可以穿过之前不能穿过的拱门。代码如下：
         * ```
         * @Component
         * export default class Example_Character_CrouchedHeight extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 生成草丛和拱门
         *             GameObject.spawn("54834",{transform: new Transform(new Vector(300, 0, 0), Rotation.zero, new Vector(2, 2, 2))});
         *             let arch = GameObject.spawn("36851",{transform: new Transform(new Vector(300, 210, 0), new Rotation(0, 0, 90), new Vector(2, 1, 2))}) as Model;
         *             arch.setCollision(CollisionStatus.On);
         *             // 生成触发器并添加委托函数：进入触发器的角色蹲下，离开触发器站起
         *             let tri = GameObject.spawn("Trigger",{transform: new Transform(new Vector(300, 0, 50), Rotation.zero, new Vector(2, 2, 1))}) as Trigger;
         *             tri.onEnter.add((character: Character) => {
         *                 character.crouch(true);
         *                 setTimeout(() => {
         *                     console.log("当前角色下蹲 " + character.isCrouching);
         *                 }, 500);
         *             });
         *             tri.onLeave.add((character: Character) => {
         *                 character.crouch(false);
         *                 console.log("当前角色下蹲 " + character.isCrouching);
         *             });
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 地面蹲伏行走时的最大移动速度100
         *             myCharacter.maxWalkSpeedCrouched = 100;
         *             // 下蹲后高度为100
         *             myCharacter.crouchedHeight = 100;
         *             // 添加一个按键方法：按下键盘“1”，启用/禁用下蹲能力
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.crouchEnabled = !myCharacter.crouchEnabled;
         *                 console.log("当前角色是否能下蹲 " + myCharacter.crouchEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get crouchedHeight(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置角色下蹲状态下，碰撞盒的高度。
         * @effect 调用端生效
         * @param InCrouchedHeight usage: 碰撞盒高度。 <br> range: (0,+∞)
         * @networkStatus usage:双端
         */
        set crouchedHeight(InCrouchedHeight: number);
        /**
         * @groups 角色系统/角色
         * @description 获取角色当前是否可以与其他角色产生碰撞。
         * @effect 调用端生效
         * @precautions true表示角色可以与其他角色碰撞，false表示角色不能与其他角色产生碰撞。
         * @returns 可否产生碰撞。 <br> 默认值为true。
         * @example
         * 使用示例:将使用到的资源:"36851"拖入优先加载栏。创建一个名为"Example_Character_CollisionWithOtherCharacterEnabled"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成一个NPC。按下键盘“1”，开启/关闭NPC与其他角色的碰撞.可以看到NPC关闭碰撞后与角色不同的交互效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_CollisionWithOtherCharacterEnabled extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 生成拱门带碰撞的拱门
         *             let arch = GameObject.spawn("36851",{transform: new Transform(new Vector(300, 210, 0), new Rotation(0, 0, 90), new Vector(2, 1, 2))}) as Model;
         *             arch.setCollision(CollisionStatus.On);
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置角色碰撞属性和跳跃属性
         *             myCharacter.capsuleCorrectionEnabled = true;
         *             myCharacter.maxJumpHeight = 250;
         *             let NPC = Player.spawnDefaultCharacter();
         *             NPC.worldTransform.position = new Vector(0, 100, 100);
         *             // 添加一个按键方法：按下键盘“1”，开启/关闭NPC与其他角色的碰撞
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 NPC.collisionWithOtherCharacterEnabled = !NPC.collisionWithOtherCharacterEnabled;
         *                 console.log("NPC与角色的碰撞 " + NPC.collisionWithOtherCharacterEnabled);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，开启/关闭角色是否可被站立
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 NPC.canStandOn = !NPC.canStandOn;
         *                 console.log("NPC角色可被站立 " + NPC.canStandOn);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，修改角色碰撞并打印结果
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 // 碰撞范围collisionExtent内部值全是半值，半径半高半长
         *                 myCharacter.setCollisionShapeAndExtent(CustomShapeType.Box, new Vector(50, 50, 200));
         *                 console.log("当前角色碰撞 " + myCharacter.collisionShape + " " + myCharacter.collisionExtent);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get collisionWithOtherCharacterEnabled(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 设置角色当前是否可以与其他角色产生碰撞。
         * @param value usage: 可否产生碰撞。
         * @networkStatus usage:双端
         */
        set collisionWithOtherCharacterEnabled(value: boolean);
        /**
         * @groups 角色系统/角色
         * @description 获取角色是否可以被其他玩家站立。。true表示其他角色可以站到玩家头上。false表示其他角色不可以站到玩家头上。
         * @effect 调用端生效
         * @returns 可否被站立。<br> 默认值为true。
         * @example
         * 使用示例:将使用到的资源:"36851"拖入优先加载栏。创建一个名为"Example_Character_CanStandOn"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成一个NPC。按下键盘“2”，开启/关闭角色是否可被站立。可以看到NPC切换可被站立后与角色不同的交互效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_CanStandOn extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 生成拱门带碰撞的拱门
         *             let arch = GameObject.spawn("36851",{transform: new Transform(new Vector(300, 210, 0), new Rotation(0, 0, 90), new Vector(2, 1, 2))}) as Model;
         *             arch.setCollision(CollisionStatus.On);
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置角色碰撞属性和跳跃属性
         *             myCharacter.capsuleCorrectionEnabled = true;
         *             myCharacter.maxJumpHeight = 250;
         *             let NPC = Player.spawnDefaultCharacter();
         *             NPC.worldTransform.position = new Vector(0, 100, 100);
         *             // 添加一个按键方法：按下键盘“1”，开启/关闭NPC与其他角色的碰撞
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 NPC.collisionWithOtherCharacterEnabled = !NPC.collisionWithOtherCharacterEnabled;
         *                 console.log("NPC与角色的碰撞 " + NPC.collisionWithOtherCharacterEnabled);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，开启/关闭角色是否可被站立
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 NPC.canStandOn = !NPC.canStandOn;
         *                 console.log("NPC角色可被站立 " + NPC.canStandOn);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，修改角色碰撞并打印结果
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 // 碰撞范围collisionExtent内部值全是半值，半径半高半长
         *                 myCharacter.setCollisionShapeAndExtent(CustomShapeType.Box, new Vector(50, 50, 200));
         *                 console.log("当前角色碰撞 " + myCharacter.collisionShape + " " + myCharacter.collisionExtent);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get canStandOn(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 设置角色是否可以被其他玩家站立。
         * @effect 调用端生效
         * @param CanStepUpOn usage: 是否可被站立。
         * @networkStatus usage:双端
         */
        set canStandOn(CanStepUpOn: boolean);
        /**
         * @groups 角色系统/角色
         * @description 获取角色头顶名字的界面
         * @effect 只在客户端调用生效
         * @returns 头顶UIWidget对象
         * @example
         * 使用示例:创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”会隐藏 / 显示头顶UI。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 添加一个按键方法：按下键盘“1”，隐藏 / 显示头顶UI
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.overheadUI.getVisibility() == true) {
         *                     myCharacter.overheadUI.setVisibility(PropertyStatus.Off);
         *                 } else {
         *                     myCharacter.overheadUI.setVisibility(PropertyStatus.On);
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get overheadUI(): mw.UIWidget;
        /**
         * @groups 角色系统/角色
         * @description 为角色加载一个动画资源。该接口会将给定的动画加载到角色上，返回一个可播放的Animation。
         * @effect 调用端生效
         * @param assetId usage:动画资源 ID（编辑器左侧栏动画，选中某一个动画资源右键可复制资源ID） <br> range:字符串长度根据具体的资源 ID 而定
         * @returns 动画对象
         * @example
         * 使用示例:将使用到的资源:"14700,20380"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载舞蹈动画，并修改循环次数为10，播放速度为2倍。给【动画完成】委托添加函数，当动画播放完成，出现一个升级特效。按下键盘“1”，开始播放动画。按下键盘“2”，暂停播放动画。按下键盘“3”，继续播放动画。按下键盘“4”，停止播放动画。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个舞蹈动画
         *             let danceAnimation = myCharacter.loadAnimation("14700");
         *             // 动画的属性
         *             console.log("动画时长 " + danceAnimation.length);
         *             // 循环播放10次
         *             danceAnimation.loop = 10;
         *             // 2倍播放速度
         *             danceAnimation.speed = 2;
         *             // 给【动画完成】委托添加函数，播放一个升级特效
         *             danceAnimation.onFinish.add(() => {
         *                 EffectService.playOnGameObject("20380", myCharacter, {slotType: HumanoidSlotType.Root});
         *             });
         *             // 添加一个按键方法:按下键盘“1”，开始播放
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 danceAnimation.play();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，暂停播放
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 danceAnimation.pause();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“3”，继续播放
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 danceAnimation.resume();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，停止播放
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 danceAnimation.stop();
         *                 console.log("动画播放 " + danceAnimation.isPlaying);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        loadAnimation(assetId: string): mw.Animation;
        /**
         * @groups 角色系统/角色
         * @description 头部追踪
         * @effect 只在客户端调用生效
         * @param target usage: 追踪点或者追踪对象
         */
        headFollow(target: mw.Vector | mw.GameObject | null): void;
        /**
         * @groups 角色系统/角色
         * @description 取消头部追踪
         * @effect 只在客户端调用生效
         */
        cancelHeadFollow(): void;
        /**
         * @groups 角色系统/角色
         * @description 获取当前正在播放的二级姿态，二级姿态类型为SubStance
         * @returns 返回一个二级姿态类型
         * @example
         * 使用示例:将使用到的资源:"94261,14520"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载一个仅上半身的瞄准姿态和一个仅下半身的踢腿姿态。按下键盘“1”，切换播放瞄准姿态和踢腿姿态。按下键盘“2”，停止播放姿态。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载仅上半身瞄准姿态
         *             let aimStance = myCharacter.loadSubStance("94261");
         *             aimStance.blendMode = StanceBlendMode.BlendUpper;
         *             console.log("aimStance assetId " + aimStance.assetId);
         *             // 给角色加载仅下半身踢腿姿态
         *             let kickStance = myCharacter.loadSubStance("14520");
         *             kickStance.blendMode = StanceBlendMode.BlendLower;
         *             console.log("kickStance assetId " + kickStance.assetId);
         *             // 添加一个按键方法:按下键盘“1”，切换播放瞄准姿态和踢腿姿态
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.currentSubStance == aimStance) {
         *                     kickStance.play();
         *                 } else {
         *                     aimStance.play();
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“2”，停止播放姿态
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.currentSubStance) {
         *                     myCharacter.currentSubStance.stop();
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         */
        get currentSubStance(): mw.SubStance;
        /**
         * @groups 角色系统/角色
         * @description 获取当前正在播放的基础姿态
         * @returns 返回值为当前基础姿态
         * @example
         * 使用示例: 将使用到的资源:"234423,216081"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，切换播放二次元男性基础姿态和二次元女性基础姿态。按下键盘“2”，停止播放基础姿态。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个二次元男性基础姿态
         *             let animeManStance = myCharacter.loadStance("234423");
         *             console.log("animeManStance assetId " + animeManStance.assetId);
         *             // 给角色加载一个二次元女性基础姿态（默认）,关闭瞄准偏移
         *             let animeWomanStance = myCharacter.loadStance("216081");
         *             animeWomanStance.aimOffsetEnabled = false;
         *             console.log("animeWomanStance assetId " + animeWomanStance.assetId);
         *             // 添加一个按键方法：按下键盘“1”，切换播放二次元男性基础姿态和二次元女性基础姿态
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.currentStance == animeWomanStance) {
         *                     animeManStance.play();
         *                     // 开启瞄准偏移
         *                     animeManStance.aimOffsetEnabled = true;
         *                 } else {
         *                     animeWomanStance.play();
         *                     // 关闭瞄准偏移
         *                     animeWomanStance.aimOffsetEnabled = false;
         *                 }
         *             });
         *             // 添加一个按键方法：按下键盘“2”，停止播放基础姿态
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.currentStance) {
         *                     myCharacter.currentStance.stop();
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         */
        get currentStance(): mw.Stance;
        /**
         * @groups 角色系统/角色
         * @description 为角色加载一个基础姿态。loadStance会将给定的基础姿态加载到角色上，返回一个可播放的基础姿态 stance 类型。
         * @effect 调用端生效
         * @param assetId usage: 基础姿态资源ID  <br> range:字符串长度根据具体的资源 ID 而定
         * @returns 基础姿态对象
         * @example
         * 使用示例:将使用到的资源:"234423,216081"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，切换播放二次元男性基础姿态和二次元女性基础姿态。按下键盘“2”，停止播放基础姿态。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载一个二次元男性基础姿态
         *             let animeManStance = myCharacter.loadStance("234423");
         *             console.log("animeManStance assetId " + animeManStance.assetId);
         *             // 给角色加载一个二次元女性基础姿态（默认）,关闭瞄准偏移
         *             let animeWomanStance = myCharacter.loadStance("216081");
         *             animeWomanStance.aimOffsetEnabled = false;
         *             console.log("animeWomanStance assetId " + animeWomanStance.assetId);
         *             // 添加一个按键方法：按下键盘“1”，切换播放二次元男性基础姿态和二次元女性基础姿态
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.currentStance == animeWomanStance) {
         *                     animeManStance.play();
         *                     // 开启瞄准偏移
         *                     animeManStance.aimOffsetEnabled = true;
         *                 } else {
         *                     animeWomanStance.play();
         *                     // 关闭瞄准偏移
         *                     animeWomanStance.aimOffsetEnabled = false;
         *                 }
         *             });
         *             // 添加一个按键方法：按下键盘“2”，停止播放基础姿态
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.currentStance) {
         *                     myCharacter.currentStance.stop();
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        loadStance(assetId: string): mw.Stance;
        /**
         * @groups 角色系统/角色
         * @description 为角色加载一个二级姿态
         * @effect 调用端生效
         * @param assetId usage: 姿态资源 ID 或动画资源 ID  <br> range:字符串长度根据具体的资源 ID 而定
         * @returns 二级姿态对象
         * @example
         * 使用示例:将使用到的资源:"94261,14520"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在玩家角色上加载一个仅上半身的瞄准姿态和一个仅下半身的踢腿姿态。按下键盘“1”，切换播放瞄准姿态和踢腿姿态。按下键盘“2”，停止播放姿态。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色加载仅上半身瞄准姿态
         *             let aimStance = myCharacter.loadSubStance("94261");
         *             aimStance.blendMode = StanceBlendMode.BlendUpper;
         *             console.log("aimStance assetId " + aimStance.assetId);
         *             // 给角色加载仅下半身踢腿姿态
         *             let kickStance = myCharacter.loadSubStance("14520");
         *             kickStance.blendMode = StanceBlendMode.BlendLower;
         *             console.log("kickStance assetId " + kickStance.assetId);
         *             // 添加一个按键方法:按下键盘“1”，切换播放瞄准姿态和踢腿姿态
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.currentSubStance == aimStance) {
         *                     kickStance.play();
         *                 } else {
         *                     aimStance.play();
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“2”，停止播放姿态
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.currentSubStance) {
         *                     myCharacter.currentSubStance.stop();
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        loadSubStance(assetId: string): mw.SubStance;
        /**
         * @groups 角色系统/角色
         * @description 设置角色外观数据。此函数无法更换基础角色。
         * 该接口设置角色的外观，可以传入 CharacterDescription 对象 / 角色外观文件的数组 / 挂件数据文件的 guid。
         * @effect 调用端生效
         * @param data usage:外观数据
         * @example
         * 使用示例:将使用到的资源:"14521,35391,161245,75674,57731,63910,58694,58700,60384,58696,136183"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到玩家控制角色玩家外观准备未完成播放摊手的效果。【角色外观描述完成】委托添加函数来播放换装完成特效，并保存角色初始默认外观数据。【角色外观描述变化】委托添加函数在控制台打印当前角色外观描述变化的具体子项和索引。按下键盘“1”，重置为默认角色外观。按下键盘“2”，修改角色外观。按下键盘“3”，同步角色外观。按下键盘“4”，清空角色外观。代码如下：
         * ```
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 如果玩家外观准备完成挥手，反之摊手
         *             if(myCharacter.isDescriptionReady) {
         *                 let animation = myCharacter.loadAnimation("35391");
         *                 animation.play();
         *             } else {
         *                 let animation = myCharacter.loadAnimation("14521");
         *                 animation.play();
         *             }
         *             let defaultStyle = null;
         *             // 给【角色外观描述完成】委托添加函数
         *             myCharacter.onDescriptionComplete.add(() => {
         *                 // 播放换装完成特效
         *                 EffectService.playOnGameObject("161245", myCharacter, {slotType: HumanoidSlotType.Root});
         *                 // 获取角色默认外观风格
         *                 if(defaultStyle == null) {
         *                     defaultStyle = myCharacter.getDescription();
         *                 }
         *             });
         *             // 给【角色外观描述变化】委托添加函数
         *             myCharacter.onDescriptionChange.add((operationCode: number, index: number, value: unknown) => {
         *                 console.log("Appearance Changed");
         *                 console.log("OperationCode " + operationCode + " Index " + index);
         *             });
         *             // 添加一个按键方法:按下键盘“1”，重置为默认角色外观
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.setDescription(defaultStyle);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，修改角色外观
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     // 修改角色style头部:头大小为1.5倍
         *                     myCharacter.description.advance.headFeatures.head.headOverallScale = 1.5;
         *                     // 修改角色style体型:身高为1.2倍
         *                     myCharacter.description.advance.bodyFeatures.body.height = 1.2;
         *                     // 修改角色style化妆:腮红为75674
         *                     myCharacter.description.advance.makeup.blush.blushStyle = "75674";
         *                     // 修改角色style头发:前发为57731，后发为63910
         *                     myCharacter.description.advance.hair.frontHair.style = "57731";
         *                     myCharacter.description.advance.hair.backHair.style = "63910";
         *                     // 修改角色style:上衣为58694，下衣为58700，手套为60384，鞋子为58696
         *                     myCharacter.description.advance.clothing.upperCloth.style = "58694";
         *                     myCharacter.description.advance.clothing.lowerCloth.style = "58700";
         *                     myCharacter.description.advance.clothing.gloves.style = "60384";
         *                     myCharacter.description.advance.clothing.shoes.style = "58696";
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，同步角色外观
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.syncDescription();
         *             });
         *             // 添加一个按键方法:按下键盘“4”，清空角色外观
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 myCharacter.clearDescription();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        setDescription(data: mw.CharacterDescription | Array<string> | string): void;
        /**
         * @groups 角色系统/角色
         * @description 获取角色外观数据。该接口获取角色当前外观数据的拷贝
         * @effect 调用端生效
         * @returns 角色外观数据的拷贝
         * @example
         * 使用示例:将使用到的资源:"14521,35391,161245,75674,57731,63910,58694,58700,60384,58696,136183"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到玩家控制角色玩家外观准备未完成播放摊手的效果。【角色外观描述完成】委托添加函数来播放换装完成特效，并保存角色初始默认外观数据。【角色外观描述变化】委托添加函数在控制台打印当前角色外观描述变化的具体子项和索引。按下键盘“1”，重置为默认角色外观。按下键盘“2”，修改角色外观。按下键盘“3”，同步角色外观。按下键盘“4”，清空角色外观。代码如下：
         * ```
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 如果玩家外观准备完成挥手，反之摊手
         *             if(myCharacter.isDescriptionReady) {
         *                 let animation = myCharacter.loadAnimation("35391");
         *                 animation.play();
         *             } else {
         *                 let animation = myCharacter.loadAnimation("14521");
         *                 animation.play();
         *             }
         *             let defaultStyle = null;
         *             // 给【角色外观描述完成】委托添加函数
         *             myCharacter.onDescriptionComplete.add(() => {
         *                 // 播放换装完成特效
         *                 EffectService.playOnGameObject("161245", myCharacter, {slotType: HumanoidSlotType.Root});
         *                 // 获取角色默认外观风格
         *                 if(defaultStyle == null) {
         *                     defaultStyle = myCharacter.getDescription();
         *                 }
         *             });
         *             // 给【角色外观描述变化】委托添加函数
         *             myCharacter.onDescriptionChange.add((operationCode: number, index: number, value: unknown) => {
         *                 console.log("Appearance Changed");
         *                 console.log("OperationCode " + operationCode + " Index " + index);
         *             });
         *             // 添加一个按键方法:按下键盘“1”，重置为默认角色外观
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.setDescription(defaultStyle);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，修改角色外观
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     // 修改角色style头部:头大小为1.5倍
         *                     myCharacter.description.advance.headFeatures.head.headOverallScale = 1.5;
         *                     // 修改角色style体型:身高为1.2倍
         *                     myCharacter.description.advance.bodyFeatures.body.height = 1.2;
         *                     // 修改角色style化妆:腮红为75674
         *                     myCharacter.description.advance.makeup.blush.blushStyle = "75674";
         *                     // 修改角色style头发:前发为57731，后发为63910
         *                     myCharacter.description.advance.hair.frontHair.style = "57731";
         *                     myCharacter.description.advance.hair.backHair.style = "63910";
         *                     // 修改角色style:上衣为58694，下衣为58700，手套为60384，鞋子为58696
         *                     myCharacter.description.advance.clothing.upperCloth.style = "58694";
         *                     myCharacter.description.advance.clothing.lowerCloth.style = "58700";
         *                     myCharacter.description.advance.clothing.gloves.style = "60384";
         *                     myCharacter.description.advance.clothing.shoes.style = "58696";
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，同步角色外观
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.syncDescription();
         *             });
         *             // 添加一个按键方法:按下键盘“4”，清空角色外观
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 myCharacter.clearDescription();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        getDescription(): mw.CharacterDescription;
        /**
         * @groups 角色系统/角色
         * @description 清空角色外观数据。清空角色外观数据，此时角色不具备任何视觉表现。
         * @effect 调用端生效
         * @param appearance usage:是否清空形象数据 default:true
         * @param slotAndDecoration usage:是否清空插槽和物品数据 default:true
         * @example
         * 使用示例:将使用到的资源:"14521,35391,161245,75674,57731,63910,58694,58700,60384,58696,136183"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到玩家控制角色玩家外观准备未完成播放摊手的效果。【角色外观描述完成】委托添加函数来播放换装完成特效，并保存角色初始默认外观数据。【角色外观描述变化】委托添加函数在控制台打印当前角色外观描述变化的具体子项和索引。按下键盘“1”，重置为默认角色外观。按下键盘“2”，修改角色外观。按下键盘“3”，同步角色外观。按下键盘“4”，清空角色外观。代码如下：
         * ```
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 如果玩家外观准备完成挥手，反之摊手
         *             if(myCharacter.isDescriptionReady) {
         *                 let animation = myCharacter.loadAnimation("35391");
         *                 animation.play();
         *             } else {
         *                 let animation = myCharacter.loadAnimation("14521");
         *                 animation.play();
         *             }
         *             let defaultStyle = null;
         *             // 给【角色外观描述完成】委托添加函数
         *             myCharacter.onDescriptionComplete.add(() => {
         *                 // 播放换装完成特效
         *                 EffectService.playOnGameObject("161245", myCharacter, {slotType: HumanoidSlotType.Root});
         *                 // 获取角色默认外观风格
         *                 if(defaultStyle == null) {
         *                     defaultStyle = myCharacter.getDescription();
         *                 }
         *             });
         *             // 给【角色外观描述变化】委托添加函数
         *             myCharacter.onDescriptionChange.add((operationCode: number, index: number, value: unknown) => {
         *                 console.log("Appearance Changed");
         *                 console.log("OperationCode " + operationCode + " Index " + index);
         *             });
         *             // 添加一个按键方法:按下键盘“1”，重置为默认角色外观
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.setDescription(defaultStyle);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，修改角色外观
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     // 修改角色style头部:头大小为1.5倍
         *                     myCharacter.description.advance.headFeatures.head.headOverallScale = 1.5;
         *                     // 修改角色style体型:身高为1.2倍
         *                     myCharacter.description.advance.bodyFeatures.body.height = 1.2;
         *                     // 修改角色style化妆:腮红为75674
         *                     myCharacter.description.advance.makeup.blush.blushStyle = "75674";
         *                     // 修改角色style头发:前发为57731，后发为63910
         *                     myCharacter.description.advance.hair.frontHair.style = "57731";
         *                     myCharacter.description.advance.hair.backHair.style = "63910";
         *                     // 修改角色style:上衣为58694，下衣为58700，手套为60384，鞋子为58696
         *                     myCharacter.description.advance.clothing.upperCloth.style = "58694";
         *                     myCharacter.description.advance.clothing.lowerCloth.style = "58700";
         *                     myCharacter.description.advance.clothing.gloves.style = "60384";
         *                     myCharacter.description.advance.clothing.shoes.style = "58696";
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，同步角色外观
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.syncDescription();
         *             });
         *             // 添加一个按键方法:按下键盘“4”，清空角色外观
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 myCharacter.clearDescription();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        clearDescription(appearance?: boolean, slotAndDecoration?: boolean): void;
        /**
         * @groups 角色系统/角色
         * @description 同步角色外观数据。角色在客户端设置外观后只会更换本地角色的外观，其他客户端角色外观未修改。通过该接口可以将本地外观广播至其他客户端。
         * @effect 只在客户端调用生效
         * @param appearance usage:角色同步 default:true
         * @param slotAndDecoration usage:插槽和装饰同步 default:true
         * @example
         * 使用示例:将使用到的资源:"14521,35391,161245,75674,57731,63910,58694,58700,60384,58696,136183"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到玩家控制角色玩家外观准备未完成播放摊手的效果。给【角色外观描述完成】委托添加函数来播放换装完成特效，并保存角色初始默认外观数据。给【角色外观描述变化】委托添加函数在控制台打印当前角色外观描述变化的具体子项和索引。按下键盘“1”，重置为默认角色外观。按下键盘“2”，修改角色外观。按下键盘“3”，同步角色外观。按下键盘“4”，清空角色外观。代码如下：
         * ```
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 如果玩家外观准备完成挥手，反之摊手
         *             if(myCharacter.isDescriptionReady) {
         *                 let animation = myCharacter.loadAnimation("35391");
         *                 animation.play();
         *             } else {
         *                 let animation = myCharacter.loadAnimation("14521");
         *                 animation.play();
         *             }
         *             let defaultStyle = null;
         *             // 给【角色外观描述完成】委托添加函数
         *             myCharacter.onDescriptionComplete.add(() => {
         *                 // 播放换装完成特效
         *                 EffectService.playOnGameObject("161245", myCharacter, {slotType: HumanoidSlotType.Root});
         *                 // 获取角色默认外观风格
         *                 if(defaultStyle == null) {
         *                     defaultStyle = myCharacter.getDescription();
         *                 }
         *             });
         *             // 给【角色外观描述变化】委托添加函数
         *             myCharacter.onDescriptionChange.add((operationCode: number, index: number, value: unknown) => {
         *                 console.log("Appearance Changed");
         *                 console.log("OperationCode " + operationCode + " Index " + index);
         *             });
         *             // 添加一个按键方法:按下键盘“1”，重置为默认角色外观
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.setDescription(defaultStyle);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，修改角色外观
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     // 修改角色style头部:头大小为1.5倍
         *                     myCharacter.description.advance.headFeatures.head.headOverallScale = 1.5;
         *                     // 修改角色style体型:身高为1.2倍
         *                     myCharacter.description.advance.bodyFeatures.body.height = 1.2;
         *                     // 修改角色style化妆:腮红为75674
         *                     myCharacter.description.advance.makeup.blush.blushStyle = "75674";
         *                     // 修改角色style头发:前发为57731，后发为63910
         *                     myCharacter.description.advance.hair.frontHair.style = "57731";
         *                     myCharacter.description.advance.hair.backHair.style = "63910";
         *                     // 修改角色style:上衣为58694，下衣为58700，手套为60384，鞋子为58696
         *                     myCharacter.description.advance.clothing.upperCloth.style = "58694";
         *                     myCharacter.description.advance.clothing.lowerCloth.style = "58700";
         *                     myCharacter.description.advance.clothing.gloves.style = "60384";
         *                     myCharacter.description.advance.clothing.shoes.style = "58696";
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，同步角色外观
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.syncDescription();
         *             });
         *             // 添加一个按键方法:按下键盘“4”，清空角色外观
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 myCharacter.clearDescription();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        syncDescription(appearance?: boolean, slotAndDecoration?: boolean): void;
        /**
         * @groups 角色系统/角色
         * @description 将物体附着到人物角色的指定插槽。只适用于人形角色，附加规则是 KeepRelative，会保留物体之前的 localTransform
         * @effect 调用端生效
         * @param gameObject usage: 被附着的物体
         * @param slotName usage: 插槽名字，被附着到指定的插槽名
         * @example
         * 使用示例:将使用到的资源:"27704,29052,118149,122953,26168"拖入优先加载栏。创建一个名为"Example_Character_AttachToSlot"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，添加 / 移除角色的头顶光环。按下键盘“2”，给角色插槽装备模型。按下键盘“3”，将角色左手，右手，左背的插槽挂载的对象全部移除。按下键盘“4”，在角色头顶顶点0位置和头顶UI位置分别生成一个特效。代码如下：
         * ```
         * @Component
         * export default class Example_Character_AttachToSlot extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             let halo = null;
         *             // 添加一个按键方法：按下键盘“1”，添加 / 移除角色的头顶光环
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(halo) {
         *                     myCharacter.detachFromSlot(halo);
         *                     setTimeout(() => {
         *                         halo.destroy();
         *                         halo = null;
         *                     }, 1000);
         *                 } else {
         *                     // 在角色头顶生成一个光环并附加到头顶插槽
         *                     halo = GameObject.spawn("27704") as Effect;
         *                     myCharacter.attachToSlot(halo, HumanoidSlotType.Rings);
         *                     halo.play();
         *                 }
         *             });
         *             // 生成三件装备
         *             let sword = GameObject.spawn("29052",{transform: new Transform(new Vector(300, -100, 100), Rotation.zero, Vector.one)});
         *             let shield = GameObject.spawn("118149",{transform: new Transform(new Vector(300, 0, 100), Rotation.zero, Vector.one)});
         *             let spike = GameObject.spawn("122953",{transform: new Transform(new Vector(300, 100, 100), Rotation.zero, Vector.one)});
         *             // 添加一个按键方法：按下键盘“2”，给角色插槽增加装备
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.attachToSlot(sword, HumanoidSlotType.RightHand);
         *                 myCharacter.attachToSlot(shield, HumanoidSlotType.LeftHand);
         *                 myCharacter.attachToSlot(spike, HumanoidSlotType.LeftBack);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，将角色左手，右手，左背的插槽挂载的对象全部移除
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.detachAllFromSlot();
         *                 sword.worldTransform = new Transform(new Vector(300, -100, 100), Rotation.zero, Vector.one);
         *                 shield.worldTransform = new Transform(new Vector(300, 0, 100), Rotation.zero, Vector.one);
         *                 spike.worldTransform = new Transform(new Vector(300, 100, 100), Rotation.zero, Vector.one);
         *             });
         *             // 添加一个按键方法：按下键盘“4”，在角色头顶顶点0位置和头顶UI位置分别生成一个特效
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 let pos = myCharacter.getVertexPosition(0);
         *                 if(pos) {
         *                     let zzz = GameObject.spawn("26168") as Effect;
         *                     zzz.worldTransform.position = pos;
         *                     zzz.play(() => {
         *                         zzz.destroy();
         *                     });
         *                 }
         *                 pos = myCharacter.getSlotWorldPosition(HumanoidSlotType.Rings);
         *                 if(pos) {
         *                     let zzz = GameObject.spawn("26168") as Effect;
         *                     zzz.worldTransform.position = pos;
         *                     zzz.play(() => {
         *                         zzz.destroy();
         *                     });
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        attachToSlot(gameObject: mw.GameObject, slotName: mw.HumanoidSlotType | mw.NonHumanoidSlotType): void;
        /**
         * @groups 角色系统/角色
         * @description 获取附着到人物角色指定插槽的所有物体。只适用于人形角色，附加规则是 KeepRelative，会保留物体之前的 localTransform
         * @effect 调用端生效
         * @param slotName usage: 插槽名字，被附着到指定的插槽名
         * @returns 符合条件的物体数组
         * @example
         * 使用示例:将使用到的资源:"27704,29052,118149,122953,26168"拖入优先加载栏。创建一个名为"Example_Character_AttachToSlot"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，添加 / 移除角色的头顶光环。按下键盘“2”，给角色插槽装备模型。按下键盘“3”，将角色左手，右手，左背的插槽挂载的对象全部移除。按下键盘“4”，在角色头顶顶点0位置和头顶UI位置分别生成一个特效。代码如下：
         * ```
         * @Component
         * export default class Example_Character_AttachToSlot extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             let halo = null;
         *             // 添加一个按键方法：按下键盘“1”，添加 / 移除角色的头顶光环
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(halo) {
         *                     myCharacter.detachFromSlot(halo);
         *                     setTimeout(() => {
         *                         halo.destroy();
         *                         halo = null;
         *                     }, 1000);
         *                 } else {
         *                     // 在角色头顶生成一个光环并附加到头顶插槽
         *                     halo = GameObject.spawn("27704") as Effect;
         *                     myCharacter.attachToSlot(halo, HumanoidSlotType.Rings);
         *                     halo.play();
         *                 }
         *             });
         *             // 生成三件装备
         *             let sword = GameObject.spawn("29052",{transform: new Transform(new Vector(300, -100, 100), Rotation.zero, Vector.one)});
         *             let shield = GameObject.spawn("118149",{transform: new Transform(new Vector(300, 0, 100), Rotation.zero, Vector.one)});
         *             let spike = GameObject.spawn("122953",{transform: new Transform(new Vector(300, 100, 100), Rotation.zero, Vector.one)});
         *             // 添加一个按键方法：按下键盘“2”，给角色插槽增加装备
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.attachToSlot(sword, HumanoidSlotType.RightHand);
         *                 myCharacter.attachToSlot(shield, HumanoidSlotType.LeftHand);
         *                 myCharacter.attachToSlot(spike, HumanoidSlotType.LeftBack);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，将角色左手，右手，左背的插槽挂载的对象全部移除
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.detachAllFromSlot();
         *                 sword.worldTransform = new Transform(new Vector(300, -100, 100), Rotation.zero, Vector.one);
         *                 shield.worldTransform = new Transform(new Vector(300, 0, 100), Rotation.zero, Vector.one);
         *                 spike.worldTransform = new Transform(new Vector(300, 100, 100), Rotation.zero, Vector.one);
         *             });
         *             // 添加一个按键方法：按下键盘“4”，在角色头顶顶点0位置和头顶UI位置分别生成一个特效
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 let pos = myCharacter.getVertexPosition(0);
         *                 if(pos) {
         *                     let zzz = GameObject.spawn("26168") as Effect;
         *                     zzz.worldTransform.position = pos;
         *                     zzz.play(() => {
         *                         zzz.destroy();
         *                     });
         *                 }
         *                 pos = myCharacter.getSlotWorldPosition(HumanoidSlotType.Rings);
         *                 if(pos) {
         *                     let zzz = GameObject.spawn("26168") as Effect;
         *                     zzz.worldTransform.position = pos;
         *                     zzz.play(() => {
         *                         zzz.destroy();
         *                     });
         *                 }
         *             });
         *         }get
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        getAttachmentsFromSlot(slotName: mw.HumanoidSlotType | mw.NonHumanoidSlotType): Array<mw.GameObject>;
        /**
         * @groups 角色系统/角色
         * @description 将物体从插槽中分离
         * @effect 调用端生效
         * @param gameObject usage: 物体GameObject
         * @example
         * 使用示例:将使用到的资源:"27704,29052,118149,122953,26168"拖入优先加载栏。创建一个名为"Example_Character_DetachFromSlot"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，添加 / 移除角色的头顶光环。按下键盘“2”，给角色插槽装备模型。按下键盘“3”，将角色左手，右手，左背的插槽挂载的对象全部移除。按下键盘“4”，在角色头顶顶点0位置和头顶UI位置分别生成一个特效。代码如下：
         * ```
         * @Component
         * export default class Example_Character_DetachFromSlot extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             let halo = null;
         *             // 添加一个按键方法：按下键盘“1”，添加 / 移除角色的头顶光环
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(halo) {
         *                     myCharacter.detachFromSlot(halo);
         *                     setTimeout(() => {
         *                         halo.destroy();
         *                         halo = null;
         *                     }, 1000);
         *                 } else {
         *                     // 在角色头顶生成一个光环并附加到头顶插槽
         *                     halo = GameObject.spawn("27704") as Effect;
         *                     myCharacter.attachToSlot(halo, HumanoidSlotType.Rings);
         *                     halo.play();
         *                 }
         *             });
         *             // 生成三件装备
         *             let sword = GameObject.spawn("29052",{transform: new Transform(new Vector(300, -100, 100), Rotation.zero, Vector.one)});
         *             let shield = GameObject.spawn("118149",{transform: new Transform(new Vector(300, 0, 100), Rotation.zero, Vector.one)});
         *             let spike = GameObject.spawn("122953",{transform: new Transform(new Vector(300, 100, 100), Rotation.zero, Vector.one)});
         *             // 添加一个按键方法：按下键盘“2”，给角色插槽增加装备
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.attachToSlot(sword, HumanoidSlotType.RightHand);
         *                 myCharacter.attachToSlot(shield, HumanoidSlotType.LeftHand);
         *                 myCharacter.attachToSlot(spike, HumanoidSlotType.LeftBack);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，将角色左手，右手，左背的插槽挂载的对象全部移除
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.detachAllFromSlot();
         *                 sword.worldTransform = new Transform(new Vector(300, -100, 100), Rotation.zero, Vector.one);
         *                 shield.worldTransform = new Transform(new Vector(300, 0, 100), Rotation.zero, Vector.one);
         *                 spike.worldTransform = new Transform(new Vector(300, 100, 100), Rotation.zero, Vector.one);
         *             });
         *             // 添加一个按键方法：按下键盘“4”，在角色头顶顶点0位置和头顶UI位置分别生成一个特效
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 let pos = myCharacter.getVertexPosition(0);
         *                 if(pos) {
         *                     let zzz = GameObject.spawn("26168") as Effect;
         *                     zzz.worldTransform.position = pos;
         *                     zzz.play(() => {
         *                         zzz.destroy();
         *                     });
         *                 }
         *                 pos = myCharacter.getSlotWorldPosition(HumanoidSlotType.Rings);
         *                 if(pos) {
         *                     let zzz = GameObject.spawn("26168") as Effect;
         *                     zzz.worldTransform.position = pos;
         *                     zzz.play(() => {
         *                         zzz.destroy();
         *                     });
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        detachFromSlot(gameObject: mw.GameObject): void;
        /**
         * @groups 角色系统/角色
         * @description 获取角色插槽的世界坐标。受角色外观中插槽偏移影响，仅对高级人型角色生效。
         * @effect 调用端生效
         * @param slotName usage:插槽名字
         * @returns 坐标位置
         * @example
         * 使用示例:将使用到的资源:"27704,29052,118149,122953,26168"拖入优先加载栏。创建一个名为"Example_Character_GetSlotWorldPosition"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，添加 / 移除角色的头顶光环。按下键盘“2”，给角色插槽装备模型。按下键盘“3”，将角色左手，右手，左背的插槽挂载的对象全部移除。按下键盘“4”，在角色头顶顶点0位置和头顶UI位置分别生成一个特效。代码如下：
         * ```
         * @Component
         * export default class Example_Character_GetSlotWorldPosition extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             let halo = null;
         *             // 添加一个按键方法：按下键盘“1”，添加 / 移除角色的头顶光环
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(halo) {
         *                     myCharacter.detachFromSlot(halo);
         *                     setTimeout(() => {
         *                         halo.destroy();
         *                         halo = null;
         *                     }, 1000);
         *                 } else {
         *                     // 在角色头顶生成一个光环并附加到头顶插槽
         *                     halo = GameObject.spawn("27704") as Effect;
         *                     myCharacter.attachToSlot(halo, HumanoidSlotType.Rings);
         *                     halo.play();
         *                 }
         *             });
         *             // 生成三件装备
         *             let sword = GameObject.spawn("29052",{transform: new Transform(new Vector(300, -100, 100), Rotation.zero, Vector.one)});
         *             let shield = GameObject.spawn("118149",{transform: new Transform(new Vector(300, 0, 100), Rotation.zero, Vector.one)});
         *             let spike = GameObject.spawn("122953",{transform: new Transform(new Vector(300, 100, 100), Rotation.zero, Vector.one)});
         *             // 添加一个按键方法：按下键盘“2”，给角色插槽增加装备
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.attachToSlot(sword, HumanoidSlotType.RightHand);
         *                 myCharacter.attachToSlot(shield, HumanoidSlotType.LeftHand);
         *                 myCharacter.attachToSlot(spike, HumanoidSlotType.LeftBack);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，将角色左手，右手，左背的插槽挂载的对象全部移除
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.detachAllFromSlot();
         *                 sword.worldTransform = new Transform(new Vector(300, -100, 100), Rotation.zero, Vector.one);
         *                 shield.worldTransform = new Transform(new Vector(300, 0, 100), Rotation.zero, Vector.one);
         *                 spike.worldTransform = new Transform(new Vector(300, 100, 100), Rotation.zero, Vector.one);
         *             });
         *             // 添加一个按键方法：按下键盘“4”，在角色头顶顶点0位置和头顶UI位置分别生成一个特效
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 let pos = myCharacter.getVertexPosition(0);
         *                 if(pos) {
         *                     let zzz = GameObject.spawn("26168") as Effect;
         *                     zzz.worldTransform.position = pos;
         *                     zzz.play(() => {
         *                         zzz.destroy();
         *                     });
         *                 }
         *                 pos = myCharacter.getSlotWorldPosition(HumanoidSlotType.Rings);
         *                 if(pos) {
         *                     let zzz = GameObject.spawn("26168") as Effect;
         *                     zzz.worldTransform.position = pos;
         *                     zzz.play(() => {
         *                         zzz.destroy();
         *                     });
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        getSlotWorldPosition(slotName: mw.HumanoidSlotType): mw.Vector;
        /**
         * @groups 角色系统/角色
         * @description 通过头部模型顶点 index 实时获取顶点位置。目前顶点 index 只能从内部工程中查看
         * @effect 调用端生效
         * @param index usage: 模型顶点 index <br> range: 根据骨架网格物体顶点的数据而定。 type:整数
         * @returns 顶点位置
         * @example
         * 使用示例:将使用到的资源:"27704,29052,118149,122953,26168"拖入优先加载栏。创建一个名为"Example_Character_GetVertexPosition"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，添加 / 移除角色的头顶光环。按下键盘“2”，给角色插槽装备模型。按下键盘“3”，将角色左手，右手，左背的插槽挂载的对象全部移除。按下键盘“4”，在角色头顶顶点0位置和头顶UI位置分别生成一个特效。代码如下：
         * ```
         * @Component
         * export default class Example_Character_GetVertexPosition extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     *    private character: Character;
         *    private obj: Model;
         *    protected onStart(): void {
         *        this.useUpdate = true;
         *        Player.asyncGetLocalPlayer().then((player)=>{
         *            this.character = player.character;
         *        })
         *        GameObject.asyncSpawn("84121").then((obj)=>{
         *            this.obj = obj as Model;
         *            this.obj.worldTransform.scale = new Vector(0.1,0.1,0.1);
         *            this.obj.setCollision(CollisionStatus.Off);
         *        })
         *    }
         *    protected onUpdate(dt: number): void {
         *        if (this.character && this.obj) {
         *            this.obj.worldTransform.position = this.character.getVertexPosition(0);
         *        }
         *    }
         * }
         * ```
         * @networkStatus usage:双端
         */
        getVertexPosition(index: number): mw.Vector;
        /**
         * @description 通过头部模型MorphName实时获取所有顶点位置
         * @effect 调用端生效
         * @param morphName usage: MorphName range: morph名字
         * @returns 顶点位置数组
         * @example
         * 使用示例:将使用到的资源:"27704,29052,118149,122953,26168"拖入优先加载栏。创建一个名为"Example_Character_GetVertexPosition"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，添加 / 移除角色的头顶光环。按下键盘“2”，给角色插槽装备模型。按下键盘“3”，将角色左手，右手，左背的插槽挂载的对象全部移除。按下键盘“4”，在角色头顶顶点0位置和头顶UI位置分别生成一个特效。代码如下：
         * ```
         * @Component
         * export default class Example_Character_GetVertexPosition extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     *    private character: Character;
         *    private obj: Model;
         *    protected onStart(): void {
         *        this.useUpdate = true;
         *        Player.asyncGetLocalPlayer().then((player)=>{
         *            this.character = player.character;
         *        })
         *        GameObject.asyncSpawn("84121").then((obj)=>{
         *            this.obj = obj as Model;
         *            this.obj.worldTransform.scale = new Vector(0.1,0.1,0.1);
         *            this.obj.setCollision(CollisionStatus.Off);
         *        })
         *    }
         *    protected onUpdate(dt: number): void {
         *        if (this.character && this.obj) {
         *            this.obj.worldTransform.position = this.character.getVertexArrayByMorphName("EarOverallScale")[0];
         *        }
         *    }
         * }
         * ```
         * @networkStatus usage:双端
         */
        getVertexArrayByMorphName(morphName: string): Array<mw.Vector>;
        /**
         * @description 通过头部模型MorphName实时获取中心顶点位置
         * @effect 调用端生效
         * @param morphName usage: MorphName range: 无
         * @returns 顶点位置
         * @networkStatus usage:双端
         */
        getCenterVertexByMorphName(morphName: string): mw.Vector;
        /**
         * @groups 角色系统/角色
         * @description 将角色插槽附着的对象全部分离。如果不填入插槽则将全部插槽的附着对象分离。仅对高级人型角色生效。
         * @effect 调用端生效
         * @param param usage: (可选参数)插槽数据，以下两个为 param 的数据结构 slotName: mw.HumanoidSlotType;
 isDestroy: boolean <br> default:null
         * @param param.isDestroy usage: 是否销毁这些分离的插槽
         * @param param.slotName usage:分离的插槽名称
         * @example
         * 使用示例:将使用到的资源:"27704,29052,118149,122953,26168"拖入优先加载栏。创建一个名为"Example_Character_DetachAllFromSlot"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，添加 / 移除角色的头顶光环。按下键盘“2”，给角色插槽装备模型。按下键盘“3”，将角色左手，右手，左背的插槽挂载的对象全部移除。按下键盘“4”，在角色头顶顶点0位置和头顶UI位置分别生成一个特效。代码如下：
         * ```
         * @Component
         * export default class Example_Character_DetachAllFromSlot extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             let halo = null;
         *             // 添加一个按键方法：按下键盘“1”，添加 / 移除角色的头顶光环
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(halo) {
         *                     myCharacter.detachFromSlot(halo);
         *                     setTimeout(() => {
         *                         halo.destroy();
         *                         halo = null;
         *                     }, 1000);
         *                 } else {
         *                     // 在角色头顶生成一个光环并附加到头顶插槽
         *                     halo = GameObject.spawn("27704") as Effect;
         *                     myCharacter.attachToSlot(halo, HumanoidSlotType.Rings);
         *                     halo.play();
         *                 }
         *             });
         *             // 生成三件装备
         *             let sword = GameObject.spawn("29052",{transform: new Transform(new Vector(300, -100, 100), Rotation.zero, Vector.one)});
         *             let shield = GameObject.spawn("118149",{transform: new Transform(new Vector(300, 0, 100), Rotation.zero, Vector.one)});
         *             let spike = GameObject.spawn("122953",{transform: new Transform(new Vector(300, 100, 100), Rotation.zero, Vector.one)});
         *             // 添加一个按键方法：按下键盘“2”，给角色插槽增加装备
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.attachToSlot(sword, HumanoidSlotType.RightHand);
         *                 myCharacter.attachToSlot(shield, HumanoidSlotType.LeftHand);
         *                 myCharacter.attachToSlot(spike, HumanoidSlotType.LeftBack);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，将角色左手，右手，左背的插槽挂载的对象全部移除
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.detachAllFromSlot();
         *                 sword.worldTransform = new Transform(new Vector(300, -100, 100), Rotation.zero, Vector.one);
         *                 shield.worldTransform = new Transform(new Vector(300, 0, 100), Rotation.zero, Vector.one);
         *                 spike.worldTransform = new Transform(new Vector(300, 100, 100), Rotation.zero, Vector.one);
         *             });
         *             // 添加一个按键方法：按下键盘“4”，在角色头顶顶点0位置和头顶UI位置分别生成一个特效
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 let pos = myCharacter.getVertexPosition(0);
         *                 if(pos) {
         *                     let zzz = GameObject.spawn("26168") as Effect;
         *                     zzz.worldTransform.position = pos;
         *                     zzz.play(() => {
         *                         zzz.destroy();
         *                     });
         *                 }
         *                 pos = myCharacter.getSlotWorldPosition(HumanoidSlotType.Rings);
         *                 if(pos) {
         *                     let zzz = GameObject.spawn("26168") as Effect;
         *                     zzz.worldTransform.position = pos;
         *                     zzz.play(() => {
         *                         zzz.destroy();
         *                     });
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        detachAllFromSlot(param?: {
            slotName?: mw.HumanoidSlotType;
            isDestroy?: boolean;
        }): void;
        /**
         * @groups 角色系统/角色
         * @description 获取角色碰撞状态
         * @effect 调用端生效
         * @returns 碰撞状态
         */
        getCollision(): mw.PropertyStatus | mw.CollisionStatus;
        /**
         * @groups 角色系统/角色
         * @description 设置角色碰撞状态。如果关闭碰撞, 角色将无法执行移动相关逻辑
         * @effect 调用端生效
         * @param status usage: 碰撞状态（CollisionStatus枚举中选取状态 或者从 PropertyStatus中选取枚举状态）
         * @param propagateToChildren usage: 是否传递给子节点 default: false
         */
        setCollision(status: mw.PropertyStatus | mw.CollisionStatus, propagateToChildren?: boolean): void;
        /**
         * @groups 角色系统/角色
         * @description 获取角色物理模拟状态
         * @returns 角色当前的是否开启物理模拟。<br> 默认值为false。
         */
        get physicsEnabled(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 设置角色物理模拟状态
         * @param value usage:是否开启角色物理模拟。
         */
        set physicsEnabled(value: boolean);
        /**
         * @groups 角色系统/角色
         * @description 是否启用复杂移动策略
         * @returns 返回复杂移动策略是否开启布尔值。
         */
        get complexMovementEnabled(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 是否启用复杂移动策略。当开启复杂移动策略时，会根据当前的移动模式决定应该采取的移动逻辑。它会根据角色的输入、物理属性（如质量、摩擦力等）计算角色在当前帧应该移动的距离和方向。实现了角色的高级移动逻辑和物理模拟，确保角色在游戏世界中按照预期的方式进行移动，并与周围的环境进行交互。
         * @param inValue usage: ture为开启，false为关闭。
         */
        set complexMovementEnabled(inValue: boolean);
        /**
         * @groups 角色系统/角色
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:039 reason:旧版接口 replacement:swimUpDown
         * @description 使角色在水中上浮。不能超过 MaxSwimSpeed (游泳最大速度)
         * @effect 调用端生效
         * @param speed usage:上浮速度 <br> range: 不做限制。 type: 浮点数
         * @example
         * 使用示例:将使用到的资源:"53011,20307"拖入优先加载栏。创建一个名为"Example_Character_SwimUp"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成拱形容器并适配游泳区域。按下键盘“1”，角色切换游泳。按下键盘“4”，角色修改最大游泳速度进行喷射加速。你可以看到的角色最大游泳速度变化的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_SwimUp extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 生成拱形容器并适配游泳区域
         *             GameObject.spawn("WaterVolume",{transform: new Transform(new Vector(0, 0, 500), new Rotation(0, 0, 90), new Vector(20, 20, 10))});
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             let flag = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置游泳属性
         *             myCharacter.canJumpOutOfWater = true;
         *             myCharacter.outOfWaterVerticalSpeed = 100;
         *             // 加载加速动画
         *             let boostAnimation = myCharacter.loadAnimation("53011");
         *             boostAnimation.loop = 10;
         *             let isBoost = false
         *             // 加载上升姿态
         *             let boostStance = myCharacter.loadStance("20307");
         *             // 添加一个按键方法：按下键盘“1”，角色切换游泳 / 行走
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(flag) {
         *                     myCharacter.switchToWalking();
         *                 } else {
         *                     myCharacter.switchToSwimming();
         *                 }
         *                 flag = !flag;
         *             });
         *             // 添加一个按键方法：按住键盘“2”，角色上浮
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCharacter.swimUp(10);
         *             });
         *             // 添加一个按键方法：按住键盘“3”，角色下潜
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCharacter.swimDown(10);
         *             });
         *             // 添加一个按键方法：按下键盘“4”，角色进行喷射加速
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 if(isBoost) return;
         *                 let boost_interval = 0;
         *                 if(myCharacter.isMoving) {
         *                     // 播放游泳动画，修改游泳速度和制动速度
         *                     boostAnimation.play();
         *                     myCharacter.maxSwimSpeed = 600;
         *                     myCharacter.brakingDecelerationSwimming = 4096;
         *                     // 设置加速周期，每帧检查角色是否移动，当角色停止移动时,执行停止加速操作：停止动画清除姿态，还原游泳速度，清除加速周期
         *                     boost_interval = setInterval(() => {
         *                         if(!myCharacter.isMoving) {
         *                             isBoost = false;
         *                             clearInterval(boost_interval);
         *                             myCharacter.maxSwimSpeed = 300;
         *                             boostAnimation.stop();
         *                             boostStance.stop();
         *                         }
         *                     }, 1);
         *                 // 如果当前角色静止，修改角色为上升姿态，设置加速周期，每帧上升5个单位
         *                 } else {
         *                     boostStance.play();
         *                     boost_interval = setInterval(() => {
         *                         myCharacter.swimUp(1)
         *                     }, 1);
         *                 }
         *                 // 1秒后执行停止加速操作
         *                     setTimeout(() => {
         *                         isBoost = false;
         *                         clearInterval(boost_interval);
         *                         myCharacter.maxSwimSpeed = 300;
         *                         boostAnimation.stop();
         *                         boostStance.stop();
         *                     }, 1000);
         *                     // 1.2秒后还原角色游泳制动速度
         *                     setTimeout(() => {
         *                         myCharacter.brakingDecelerationSwimming = 4096
         *                     }, 1200);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        swimUp(speed: number): void;
        /**
         * @groups 角色系统/角色
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:039 reason:旧版接口 replacement:swimUpDown
         * @description 使角色在水中下潜。不能超过MaxSwimSpeed(游泳最大速度)
         * @effect 调用端生效
         * @param speed usage:下潜速度  <br> range: 不做限制。 type: 浮点数
         * @example
         * 使用示例:将使用到的资源:"53011,20307"拖入优先加载栏。创建一个名为"Example_Character_SwimDown"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成拱形容器并适配游泳区域。按下键盘“1”，角色切换游泳。按下键盘“4”，角色修改最大游泳速度进行喷射加速。你可以看到的角色最大游泳速度变化的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_SwimDown extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 生成拱形容器并适配游泳区域
         *             GameObject.spawn("WaterVolume",{transform: new Transform(new Vector(0, 0, 500), new Rotation(0, 0, 90), new Vector(20, 20, 10))});
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             let flag = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置游泳属性
         *             myCharacter.canJumpOutOfWater = true;
         *             myCharacter.outOfWaterVerticalSpeed = 100;
         *             // 加载加速动画
         *             let boostAnimation = myCharacter.loadAnimation("53011");
         *             boostAnimation.loop = 10;
         *             let isBoost = false
         *             // 加载上升姿态
         *             let boostStance = myCharacter.loadStance("20307");
         *             // 添加一个按键方法：按下键盘“1”，角色切换游泳 / 行走
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(flag) {
         *                     myCharacter.switchToWalking();
         *                 } else {
         *                     myCharacter.switchToSwimming();
         *                 }
         *                 flag = !flag;
         *             });
         *             // 添加一个按键方法：按住键盘“2”，角色上浮
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCharacter.swimUp(10);
         *             });
         *             // 添加一个按键方法：按住键盘“3”，角色下潜
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCharacter.swimDown(10);
         *             });
         *             // 添加一个按键方法：按下键盘“4”，角色进行喷射加速
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 if(isBoost) return;
         *                 let boost_interval = 0;
         *                 if(myCharacter.isMoving) {
         *                     // 播放游泳动画，修改游泳速度和制动速度
         *                     boostAnimation.play();
         *                     myCharacter.maxSwimSpeed = 600;
         *                     myCharacter.brakingDecelerationSwimming = 4096;
         *                     // 设置加速周期，每帧检查角色是否移动，当角色停止移动时,执行停止加速操作：停止动画清除姿态，还原游泳速度，清除加速周期
         *                     boost_interval = setInterval(() => {
         *                         if(!myCharacter.isMoving) {
         *                             isBoost = false;
         *                             clearInterval(boost_interval);
         *                             myCharacter.maxSwimSpeed = 300;
         *                             boostAnimation.stop();
         *                             boostStance.stop();
         *                         }
         *                     }, 1);
         *                 // 如果当前角色静止，修改角色为上升姿态，设置加速周期，每帧上升5个单位
         *                 } else {
         *                     boostStance.play();
         *                     boost_interval = setInterval(() => {
         *                         myCharacter.swimUp(1)
         *                     }, 1);
         *                 }
         *                 // 1秒后执行停止加速操作
         *                     setTimeout(() => {
         *                         isBoost = false;
         *                         clearInterval(boost_interval);
         *                         myCharacter.maxSwimSpeed = 300;
         *                         boostAnimation.stop();
         *                         boostStance.stop();
         *                     }, 1000);
         *                     // 1.2秒后还原角色游泳制动速度
         *                     setTimeout(() => {
         *                         myCharacter.brakingDecelerationSwimming = 4096
         *                     }, 1200);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        swimDown(speed: number): void;
        /**
         * @groups 角色系统/角色
         * @description 使角色在水中上浮下潜
         * 不能超过 MaxSwimSpeed (游泳最大速度)
         * @effect 调用端生效
         * @param speed usage:速度,大于0是上浮,小于0是下潜 <br> range: 不做限制。 type: 浮点数
         * @example
         * 使用示例:将使用到的资源:"53011,20307"拖入优先加载栏。创建一个名为"Example_Character_SwimUp"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成拱形容器并适配游泳区域。按下键盘“1”，角色切换游泳。按下键盘“4”，角色修改最大游泳速度进行喷射加速。你可以看到的角色最大游泳速度变化的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_SwimUp extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 生成拱形容器并适配游泳区域
         *             GameObject.spawn("WaterVolume",{transform: new Transform(new Vector(0, 0, 500), new Rotation(0, 0, 90), new Vector(20, 20, 10))});
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             let flag = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 添加一个按键方法：按下键盘“1”，角色切换游泳 / 行走
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(flag) {
         *                     myCharacter.switchToWalking();
         *                 } else {
         *                     myCharacter.switchToSwimming();
         *                 }
         *                 flag = !flag;
         *             });
         *             // 添加一个按键方法：按住键盘“2”，角色上浮
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCharacter.swimUpDown(100);
         *             });
         *             // 添加一个按键方法：按住键盘“3”，角色下潜
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCharacter.swimUpDown(-100);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        swimUpDown(speed: number): void;
        /**
         * @groups 角色系统/角色
         * @description 沿着给定的方向向量添加移动输入。不会自动应用移动，由开发者在 onUpdate 事件中执行此操作。效果受 movementDirection 属性影响。如果此时同时有用户输入效果是叠加而不是覆盖。
         * @effect 调用端生效
         * @param direction usage:输入的方向
         * @example
         * 使用示例:将使用到的资源:"27693"拖入优先加载栏。创建一个名为"Example_Character_AddMovement"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成一个循环黑洞特效。如果角色与黑洞中心距离小于300且角色没有开启布娃娃，则朝中心移动角色。如果角色与黑洞中心距离小于50，则开启布娃娃。你可以看到角色开关布娃娃的不同效果代码如下：
         * ```
         * @Component
         * export default class Example_Character_AddMovement extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             this.useUpdate = true;
         *             // 生成一个黑洞特效循环播放
         *             EffectService.playAtPosition("27693", new Vector(500, 0, 50), {loopCount: 0});
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 如果角色与黑洞中心距离小于300且角色没有开启布娃娃，则朝中心移动角色
         *             if(myCharacter.worldTransform.position.subtract(new Vector(500, 0, 50)).length < 300 && !myCharacter.ragdollEnabled) {
         *                 let dir = new Vector(500, 0, 50).subtract(myCharacter.worldTransform.position).normalize();
         *                 myCharacter.addMovement(new Vector(dir.x, dir.y, 0));
         *             }
         *             // 如果角色与黑洞中心距离小于50，则开启布娃娃
         *             if(myCharacter.worldTransform.position.subtract(new Vector(500, 0, 50)).length < 50) {
         *                 myCharacter.ragdollEnabled = true;
         *                 setTimeout(() => {
         *                     myCharacter.worldTransform.position = new Vector(0, 0, 130);
         *                     myCharacter.ragdollEnabled = false;
         *                 }, 2000);
         *             }
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        addMovement(direction: mw.Vector): void;
        /**
         * @groups 角色系统/角色
         * @description 添加冲量，相同冲量值在布娃娃与正常状态时，力效果会有差异。质量固定为100，受质量影响的算法为: 冲量按位除以质量
         * @effect 只在服务端调用生效
         * @param vector usage:应用的冲量
         * @param ignoreMass usage:是否忽略质量对冲量的影响 default:false
         * @example
         * 使用示例:将使用到的资源:"122180,122182,132631,75354"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成一个生成大炮模型。在大炮附加生成一个触发器并添加进入委托，当角色进入范围后向服务器发送【发射】事件。如果角色进入触发器则，你可以看到角色添加一个冲量被大炮发射出去的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 生成大炮模型
         *             let cannon_base = GameObject.spawn("122180",{transform: new Transform(new Vector(750, 0, 0), new Rotation(0, 0, -90), Vector.one.multiply(2))});
         *             let cannon_tube  = GameObject.spawn("122182",{transform: new Transform(new Vector(750, 0, 250), new Rotation(0, 30, 90), Vector.one.multiply(2))});
         *             // 在服务端添加一个【Launch】事件监听器，给角色添加冲量
         *             mw.Event.addClientListener("Launch", (player) => {
         *                 player.character.addImpulse(new Vector(0, 1, 1).multiply(1000), true);
         *             });
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 生成触发器并添加进入委托，当角色进入范围后向服务器发送【发射】事件
         *             let cannon_trigger  = GameObject.spawn("Trigger",{transform: new Transform(new Vector(750, 0, 0), new Rotation(0, 30, 90), Vector.one.multiply(4))}) as Trigger;
         *             cannon_trigger.onEnter.add((character: Character) => {
         *                 character.worldTransform.position = new Vector(750, 275, 330);
         *                 // 向服务器派发【Launch】事件
         *                 mw.Event.dispatchToServer("Launch");
         *                 // 播放音效特效。
         *                 EffectService.playAtPosition("132631", new Vector(750, 275, 330))
         *                 SoundService.playSound("75354");
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:服务端
         */
        addImpulse(vector: mw.Vector, ignoreMass?: boolean): void;
        /**
         * @groups 角色系统/角色
         * @description 为角色设置不同形状不同大小的碰撞体
         * @effect 调用端生效
         * @param shapeType usage: 碰撞体形状（胶囊体、球型、盒型）
         * @param collisionExtent usage: 碰撞体形状的大小
         * @example
         * 使用示例:将使用到的资源:"36851"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，生成带碰撞的拱门和单端NPC，展示角色碰撞效果。按下键盘“1”，开启/关闭NPC与其他角色的碰撞。按下键盘“2”，开启/关闭NPC是否可被站立。按下键盘“3”，修改角色碰撞形状和大小并打印结果。
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 生成拱门带碰撞的拱门
         *             let arch = GameObject.spawn("36851",{transform: new Transform(new Vector(300, 210, 0), new Rotation(0, 0, 90), new Vector(2, 1, 2))}) as Model;
         *             arch.setCollision(CollisionStatus.On);
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置角色碰撞属性和跳跃属性
         *             myCharacter.capsuleCorrectionEnabled = true;
         *             myCharacter.maxJumpHeight = 250;
         *             // 生成单端NPC展示角色碰撞
         *             let NPC = Player.spawnDefaultCharacter();
         *             NPC.worldTransform.position = new Vector(0, 100, 100);
         *             // 添加一个按键方法：按下键盘“1”，开启/关闭NPC与其他角色的碰撞
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 NPC.collisionWithOtherCharacterEnabled = !NPC.collisionWithOtherCharacterEnabled;
         *                 console.log("NPC与角色的碰撞 " + NPC.collisionWithOtherCharacterEnabled);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，开启/关闭角色是否可被站立
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 NPC.canStandOn = !NPC.canStandOn;
         *                 console.log("NPC角色可被站立 " + NPC.canStandOn);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，修改角色碰撞并打印结果
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 // 碰撞范围collisionExtent内部值全是半值，半径半高半长
         *                 myCharacter.setCollisionShapeAndExtent(CustomShapeType.Box, new Vector(50, 50, 200));
         *                 console.log("当前角色碰撞 " + myCharacter.collisionShape + " " + myCharacter.collisionExtent);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        setCollisionShapeAndExtent(shapeType: mw.CustomShapeType, collisionExtent: mw.Vector): void;
        /**
         * @groups 角色系统/角色
         * @description 设置角色是否被显示
         * @effect 调用端生效
         * @param status usage: 是否显示状态。PropertyStatus.On 为显示；PropertyStatus.Off 为隐藏。
         * @param propagateToChildren usage: 是否设置子物体 default:true
         * @example
         * 使用示例:创建一个脚本挂载在对象管理器中。在脚本中复制下列"Example_Character_SetVisibility"的代码保存，运行游戏，按下按键”1“，控制角色显示/隐藏。代码如下：
         * ```
         * @Component
         * export default class Example_Character_SetVisibility extends Script {
         *      // 当脚本被实例后，会在第一帧更新前调用此函数
         *      protected async onStart(): Promise<void> {
         *        // 下列代码仅在客户端执行
         *        if(SystemUtil.isClient()) {
         *            // 获取当前玩家和玩家角色
         *            let myPlayer = Player.localPlayer;
         *            let myChara = myPlayer.character;
         *            // 生成一个立方体做为角色子对象
         *            let cube = await GameObject.asyncSpawn("197386") as Model;
         *            cube.parent = myChara;
         *            cube.localTransform.position = new Vector(200, -100, 0);
         *            // 在角色外观生成完毕回调中绑定函数，生成一个球体插入角色插槽中
         *            myChara.onDescriptionComplete.add(async () => {
         *                let ball = await GameObject.asyncSpawn("197388") as Model;
         *                myChara.attachToSlot(ball, HumanoidSlotType.Rings);
         *            });
         *            // 添加一个按键方法：按下按键“1”，切换角色可见性,但不影响挂载的对象。
         *            InputUtil.onKeyDown(Keys.One, () => {
         *                let visible = myChara.getVisibility();
         *                myChara.setVisibility(!visible, false);
         *            });
         *        }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        setVisibility(status: mw.PropertyStatus | boolean, propagateToChildren?: boolean): void;
        /**
         * @description 角色对象裁剪距离
         * @description 最终的裁剪距离会和画质等级有关；修改此属性 ≤0 时，裁剪距离会根据对象尺寸自动调整 (自动启用 CullDistanceVolume 功能)
         * @effect 只在客户端调用生效
         * @param inCullDistance usage:裁剪距离 range: 建议 (2000, 4000)  type: 浮点数
         */
        setCullDistance(inCullDistance: number): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:旧版接口 replacement:请查阅接口文档
         * @description 获取mesh相对角色坐标点的偏移
         * @groups 角色系统/角色
         * @effect 调用端生效
         * @returns mesh相对角色坐标点的偏移
         */
        get meshOffset(): mw.Vector;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:旧版接口 replacement:请查阅接口文档
         * @description 设置mesh相对角色坐标点的偏移
         * @groups 角色系统/角色
         * @effect 调用端生效
         * @param value 偏移量 Vector
         */
        set meshOffset(offset: mw.Vector);
        /**
         * @description 设置mesh相对角色坐标点的偏移
         * @effect 调用端生效
         * @param value 偏移量 Vector
         */
        set meshPositionOffset(offset: mw.Vector);
        /**
         * @description 获取mesh相对角色坐标点的偏移
         * @effect 调用端生效
         * @returns mesh相对角色坐标点的偏移
         */
        get meshPositionOffset(): mw.Vector;
        /**
         * @description 设置mesh相对角色旋转的偏移
         * @effect 调用端生效
         * @param value 偏移量 Vector
         */
        set meshRotationOffset(offset: mw.Rotation);
        /**
         * @description 获取mesh相对角色旋转的偏移
         * @effect 调用端生效
         * @returns mesh相对角色坐标点的偏移
         */
        get meshRotationOffset(): mw.Rotation;
        /**
         * @groups 角色系统/角色
         * @description 获取角色是什么类型。角色类型分为基础人形、高级人形和四足类型。
         * @example
         * 使用示例:将使用到的资源:"14521,35391,161245,75674,57731,63910,58694,58700,60384,58696,136183"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到玩家控制角色玩家外观准备未完成播放摊手的效果。【角色外观描述完成】委托添加函数来播放换装完成特效，并保存角色初始默认外观数据。【角色外观描述变化】委托添加函数在控制台打印当前角色外观描述变化的具体子项和索引。按下键盘“1”，重置为默认角色外观。按下键盘“2”，修改角色外观。按下键盘“3”，同步角色外观。按下键盘“4”，清空角色外观。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 如果玩家外观准备完成挥手，反之摊手
         *             if(myCharacter.isDescriptionReady) {
         *                 let animation = myCharacter.loadAnimation("35391");
         *                 animation.play();
         *             } else {
         *                 let animation = myCharacter.loadAnimation("14521");
         *                 animation.play();
         *             }
         *             let defaultStyle = null;
         *             // 给【角色外观描述完成】委托添加函数
         *             myCharacter.onDescriptionComplete.add(() => {
         *                 // 播放换装完成特效
         *                 EffectService.playOnGameObject("161245", myCharacter, {slotType: HumanoidSlotType.Root});
         *                 // 获取角色默认外观风格
         *                 if(defaultStyle == null) {
         *                     defaultStyle = myCharacter.getDescription();
         *                 }
         *             });
         *             // 给【角色外观描述变化】委托添加函数
         *             myCharacter.onDescriptionChange.add((operationCode: number, index: number, value: unknown) => {
         *                 console.log("Appearance Changed");
         *                 console.log("OperationCode " + operationCode + " Index " + index);
         *             });
         *             // 添加一个按键方法:按下键盘“1”，重置为默认角色外观
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.setDescription(defaultStyle);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，修改角色外观
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     // 修改角色style头部:头大小为1.5倍
         *                     myCharacter.description.advance.headFeatures.head.headOverallScale = 1.5;
         *                     // 修改角色style体型:身高为1.2倍
         *                     myCharacter.description.advance.bodyFeatures.body.height = 1.2;
         *                     // 修改角色style化妆:腮红为75674
         *                     myCharacter.description.advance.makeup.blush.blushStyle = "75674";
         *                     // 修改角色style头发:前发为57731，后发为63910
         *                     myCharacter.description.advance.hair.frontHair.style = "57731";
         *                     myCharacter.description.advance.hair.backHair.style = "63910";
         *                     // 修改角色style:上衣为58694，下衣为58700，手套为60384，鞋子为58696
         *                     myCharacter.description.advance.clothing.upperCloth.style = "58694";
         *                     myCharacter.description.advance.clothing.lowerCloth.style = "58700";
         *                     myCharacter.description.advance.clothing.gloves.style = "60384";
         *                     myCharacter.description.advance.clothing.shoes.style = "58696";
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，同步角色外观
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.syncDescription();
         *             });
         *             // 添加一个按键方法:按下键盘“4”，清空角色外观
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 myCharacter.clearDescription();
         *             });
         *         }
         *     }
         * }
         * ```
         */
        get characterType(): mw.CharacterType;
        /**
         * @groups 角色系统/角色
         * @description 获取当前客户端所有角色头顶显示名称是否可见。
         * @effect 只在客户端调用生效
         * @returns 为true时角色头顶显示名称可见，为false时角色头顶显示名称不可见。<br> 默认为可见。
         */
        static get nameVisible(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 设置当前客户端所有角色头顶显示名称是否可见，当角色头顶显示名称可见时会受设置面板控制，不可见时不受设置面板控制。
         * @effect 只在客户端调用生效
         * @param isVisible usage: 为true时角色头顶显示名称可见，为false时角色头顶显示名称不可见。
         */
        static set nameVisible(isVisible: boolean);
        /**
         * @groups 角色系统/角色
         * @description 获取当前客户端所有角色头顶显示名称可见距离。
         * @effect 只在客户端调用生效
         * @precautions 显示名称可见距离
         * @returns 显示名称可见距离 <br> 默认值为2000。
         */
        static get nameDisplayDistance(): number;
        /**
         * @groups 角色系统/角色
         * @description 设置当前客户端所有角色头顶显示名称可见距离，当角色头顶显示名称可见时生效。距离为0时不可见。
         * @effect 只在客户端调用生效
         * @precautions 显示名称可见距离
         * @param range usage: 显示名称可见距离 <br> range: (0,+∞)
         */
        static set nameDisplayDistance(range: number);
        /**
         * @author guang.deng
         * @groups 角色系统/角色
         * @description 外观加载细节变化委托
         * @effect 调用端生效
         * @precautions 当角色对象外观发生变化时执行绑定函数
         * @example
         * 使用示例:将使用到的资源:"14521,35391,161245,75674,57731,63910,58694,58700,60384,58696,136183"拖入优先加载栏。创建一个名为"Example_Character_OnDescriptionChange"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到玩家控制角色玩家外观准备未完成播放摊手的效果。给【角色外观描述完成】委托添加函数来播放换装完成特效，并保存角色初始默认外观数据。给【角色外观描述变化】委托添加函数在控制台打印当前角色外观描述变化的具体子项和索引。按下键盘“1”，重置为默认角色外观。按下键盘“2”，修改角色外观。按下键盘“3”，同步角色外观。按下键盘“4”，清空角色外观。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character_OnDescriptionChange extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 如果玩家外观准备完成挥手，反之摊手
         *             if(myCharacter.isDescriptionReady) {
         *                 let animation = myCharacter.loadAnimation("35391");
         *                 animation.play();
         *             } else {
         *                 let animation = myCharacter.loadAnimation("14521");
         *                 animation.play();
         *             }
         *             let defaultStyle = null;
         *             // 给【角色外观描述完成】委托添加函数
         *             myCharacter.onDescriptionComplete.add(() => {
         *                 // 播放换装完成特效
         *                 EffectService.playOnGameObject("161245", myCharacter, {slotType: HumanoidSlotType.Root});
         *                 // 获取角色默认外观风格
         *                 if(defaultStyle == null) {
         *                     defaultStyle = myCharacter.getDescription();
         *                 }
         *             });
         *             // 给【角色外观描述变化】委托添加函数
         *             myCharacter.onDescriptionChange.add((operationCode: number, index: number, value: unknown) => {
         *                 console.log("Appearance Changed");
         *                 console.log("OperationCode " + operationCode + " Index " + index);
         *             });
         *             // 添加一个按键方法:按下键盘“1”，重置为默认角色外观
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.setDescription(defaultStyle);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，修改角色外观
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     // 修改角色style头部:头大小为1.5倍
         *                     myCharacter.description.advance.headFeatures.head.headOverallScale = 1.5;
         *                     // 修改角色style体型:身高为1.2倍
         *                     myCharacter.description.advance.bodyFeatures.body.height = 1.2;
         *                     // 修改角色style化妆:腮红为75674
         *                     myCharacter.description.advance.makeup.blush.blushStyle = "75674";
         *                     // 修改角色style头发:前发为57731，后发为63910
         *                     myCharacter.description.advance.hair.frontHair.style = "57731";
         *                     myCharacter.description.advance.hair.backHair.style = "63910";
         *                     // 修改角色style:上衣为58694，下衣为58700，手套为60384，鞋子为58696
         *                     myCharacter.description.advance.clothing.upperCloth.style = "58694";
         *                     myCharacter.description.advance.clothing.lowerCloth.style = "58700";
         *                     myCharacter.description.advance.clothing.gloves.style = "60384";
         *                     myCharacter.description.advance.clothing.shoes.style = "58696";
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，同步角色外观
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.syncDescription();
         *             });
         *             // 添加一个按键方法:按下键盘“4”，清空角色外观
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 myCharacter.clearDescription();
         *             });
         *         }
         *     }
         * }
         * ```
         */
        onDescriptionChange: mw.MulticastDelegate<OnDescriptionChange>;
        /**
         * @groups 角色系统/角色
         * @description 角色外观加载完成时，调用委托
         * @effect 调用端生效
         * @precautions 当角色对象外观加载完成时执行绑定函数
         * @example
         * 使用示例:将使用到的资源:"14521,35391,161245,75674,57731,63910,58694,58700,60384,58696,136183"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏。给【角色外观加载完成】委托添加函数来播放换装完成特效。按下键盘“1”，重置为默认角色外观。按下键盘“2”，修改角色外观。按下键盘“3”，同步角色外观。按下键盘“4”，清空角色外观。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 如果玩家外观准备完成挥手，反之摊手
         *             if(myCharacter.isDescriptionReady) {
         *                 let animation = myCharacter.loadAnimation("35391");
         *                 animation.play();
         *             } else {
         *                 let animation = myCharacter.loadAnimation("14521");
         *                 animation.play();
         *             }
         *             let defaultStyle = null;
         *             // 给【角色换装完成】委托添加函数
         *             myCharacter.onDescriptionComplete.add(() => {
         *                 // 播放换装完成特效
         *                 EffectService.playOnGameObject("161245", myCharacter, {slotType:HumanoidSlotType.Hair});
         *                 // 获取角色默认外观风格
         *                 if(defaultStyle == null) {
         *                     defaultStyle = myCharacter.getDescription();
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“1”，重置为默认角色外观
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.setDescription(defaultStyle);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，修改角色外观
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     // 修改角色style头部:头大小为1.5倍
         *                     myCharacter.description.advance.headFeatures.head.headOverallScale = 1.5;
         *                     // 修改角色style体型:身高为1.2倍
         *                     myCharacter.description.advance.bodyFeatures.body.height = 1.2;
         *                     // 修改角色style化妆:腮红为75674
         *                     myCharacter.description.advance.makeup.blush.blushStyle = "75674";
         *                     // 修改角色style头发:前发为57731，后发为63910
         *                     myCharacter.description.advance.hair.frontHair.style = "57731";
         *                     myCharacter.description.advance.hair.backHair.style = "63910";
         *                     // 修改角色style:上衣为58694，下衣为58700，手套为60384，鞋子为58696
         *                     myCharacter.description.advance.clothing.upperCloth.style = "58694";
         *                     myCharacter.description.advance.clothing.lowerCloth.style = "58700";
         *                     myCharacter.description.advance.clothing.gloves.style = "60384";
         *                     myCharacter.description.advance.clothing.shoes.style = "58696";
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，同步角色外观
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.syncDescription();
         *             });
         *             // 添加一个按键方法:按下键盘“4”，清空角色外观
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 myCharacter.clearDescription();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        onDescriptionComplete: mw.MulticastDelegate<OnDescriptionComplete>;
        /**
         * @groups 角色系统/角色
         * @description 外观主体（前发，后发，头，上衣，下衣，手套，鞋）加载失败委托
         * @effect 调用端生效
         * @precautions 当角色外观加载失败时执行绑定函数
         * @networkStatus usage:双端
         */
        onLoadDescriptionFailed: mw.MulticastDelegate<OnLoadDescriptionFailed>;
        /**
         * @groups 角色系统/角色
         * @description 角色向上游泳到达游泳区域水面时，调用委托
         * @effect 调用端生效
         * @precautions 当角色对象向上游泳到达游泳区域水面时执行绑定函数
         * @example 使用示例: 如下代码将实现出水面后自动跳跃的功能
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 给【角色到达游泳区域水面】委托添加函数
         *             myCharacter.onDescriptionComplete.add(() => {
         *                 // 跳跃
         *                 myCharacter.changeState(CharacterStateType.Jumping);
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         */
        onEmergeFromWater: mw.MulticastDelegate<() => void>;
        /**
         * @description 角色状态改变回调
         * 使用示例:按0-9，Z、X、C、V后查看打印
         * ```
         * @Component
         * export default class NewScript1 extends Script {
         *     private character: Character;
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         Player.asyncGetLocalPlayer().then((player) => {
         *             this.character = player.character;
         *             this.character.onStateChanged.add((pre, curr)=>{
         *                 console.log(`pre: ${pre} curr: ${curr}`);
         *
         *             })
         *         });
         *       InputUtil.onKeyDown(Keys.Zero, ()=>{
         *             this.character.changeState(CharacterStateType.None);
         *         })
         *         InputUtil.onKeyDown(Keys.One, ()=>{
         *             this.character.changeState(CharacterStateType.Running);
         *         })
         *         InputUtil.onKeyDown(Keys.Two, ()=>{
         *             this.character.changeState(CharacterStateType.Flying);
         *         })
         *         InputUtil.onKeyDown(Keys.Three, ()=>{
         *             this.character.changeState(CharacterStateType.Swimming);
         *         })
         *         InputUtil.onKeyDown(Keys.Four, ()=>{
         *             this.character.changeState(CharacterStateType.Jumping);
         *         })
         *         InputUtil.onKeyDown(Keys.Five, ()=>{
         *             this.character.changeState(CharacterStateType.Freefall);
         *         })
         *         InputUtil.onKeyDown(Keys.Six, ()=>{
         *             this.character.changeState(CharacterStateType.Ragdoll);
         *         })
         *         InputUtil.onKeyDown(Keys.Seven, ()=>{
         *             this.character.changeState(CharacterStateType.GettingUp);
         *         })
         *         InputUtil.onKeyDown(Keys.Eight, ()=>{
         *             this.character.changeState(CharacterStateType.Climbing);
         *         })
         *         InputUtil.onKeyDown(Keys.Nine, ()=>{
         *             this.character.changeState(CharacterStateType.Crouching);
         *         })
         *         InputUtil.onKeyDown(Keys.Z, ()=>{
         *             this.character.changeState(CharacterStateType.Pushed);
         *         })
         *         InputUtil.onKeyDown(Keys.X, ()=>{
         *             this.character.changeState(CharacterStateType.Landed);
         *         })
         *         InputUtil.onKeyDown(Keys.C, ()=>{
         *             this.character.changeState(CharacterStateType.Hit);
         *         })
         *         InputUtil.onKeyDown(Keys.V, ()=>{
         *             this.character.changeState(CharacterStateType.Dead);
         *         })
         *       InputUtil.onKeyDown(Keys.E, ()=>{
         *           console.log("currentState=="+this.character.getCurrentState());
         *         })
         *       InputUtil.onKeyDown(Keys.R, ()=>{
         *           this.character.setStateEnabled(CharacterStateType.Flying, false);
         *         })
         *     }
         * }
         * ```
         */
        onStateChanged: mw.MulticastDelegate<(prevState: mw.CharacterStateType, currentState: mw.CharacterStateType) => void>;
        /**
         * @description 获取当前角色的状态
         * @effect 调用端生效
         * @returns 当前角色状态
         * @example
         * 使用示例:按E后查看当前状态打印
         * ```
         * @Component
         * export default class NewScript1 extends Script {
         *     private character: Character;
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         Player.asyncGetLocalPlayer().then((player) => {
         *             this.character = player.character;
         *             this.character.onStateChanged.add((pre, curr)=>{
         *                 console.log(`pre: ${pre} curr: ${curr}`);
         *             })
         *         });
         *       InputUtil.onKeyDown(Keys.Zero, ()=>{
         *             this.character.changeState(CharacterStateType.None);
         *         })
         *         InputUtil.onKeyDown(Keys.One, ()=>{
         *             this.character.changeState(CharacterStateType.Running);
         *         })
         *         InputUtil.onKeyDown(Keys.Two, ()=>{
         *             this.character.changeState(CharacterStateType.Flying);
         *         })
         *         InputUtil.onKeyDown(Keys.Three, ()=>{
         *             this.character.changeState(CharacterStateType.Swimming);
         *         })
         *         InputUtil.onKeyDown(Keys.Four, ()=>{
         *             this.character.changeState(CharacterStateType.Jumping);
         *         })
         *         InputUtil.onKeyDown(Keys.Five, ()=>{
         *             this.character.changeState(CharacterStateType.Freefall);
         *         })
         *         InputUtil.onKeyDown(Keys.Six, ()=>{
         *             this.character.changeState(CharacterStateType.Ragdoll);
         *         })
         *         InputUtil.onKeyDown(Keys.Seven, ()=>{
         *             this.character.changeState(CharacterStateType.GettingUp);
         *         })
         *         InputUtil.onKeyDown(Keys.Eight, ()=>{
         *             this.character.changeState(CharacterStateType.Climbing);
         *         })
         *         InputUtil.onKeyDown(Keys.Nine, ()=>{
         *             this.character.changeState(CharacterStateType.Crouching);
         *         })
         *         InputUtil.onKeyDown(Keys.Z, ()=>{
         *             this.character.changeState(CharacterStateType.Pushed);
         *         })
         *         InputUtil.onKeyDown(Keys.X, ()=>{
         *             this.character.changeState(CharacterStateType.Landed);
         *         })
         *         InputUtil.onKeyDown(Keys.C, ()=>{
         *             this.character.changeState(CharacterStateType.Hit);
         *         })
         *         InputUtil.onKeyDown(Keys.V, ()=>{
         *             this.character.changeState(CharacterStateType.Dead);
         *         })
         *         InputUtil.onKeyDown(Keys.E, ()=>{
         *             console.log("currentState=="+this.character.getCurrentState());
         *         })
         *     }
         * }
         * ```
         */
        getCurrentState(): mw.CharacterStateType;
        /**
         * @groups 角色系统/角色
         * @description 改变角色的状态
         * @effect 调用端生效
         * @param stateType usage: 新的状态
         * 使用示例: 按0-9，Z、X、C、V后查看当前角色状态
         * ```
         */
        changeState(stateType: mw.CharacterStateType): void;
        /**
         * @groups 角色系统/角色
         * @description 设置角色状态开关
         * @effect 调用端生效
         * @param characterStateType usage: 角色状态
         * @param enabled usage: 角色状态是否启用
         * 使用示例:按 R 后禁用飞行状态，再按 2 切换飞行
         * ```
         */
        setStateEnabled(characterStateType: mw.CharacterStateType, enabled: boolean): void;
        /**
        * @description 启用布娃娃
        * @precautions 角色当前是否使用布娃娃状态。true表示使用，false表示禁用。
        * @example
        * 使用示例:将使用到的资源:"27693"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏你将在场景中生成一个循环黑洞特效。如果角色与黑洞中心距离小于300且角色没有开启布娃娃，则朝中心移动角色。如果角色与黑洞中心距离小于50，则开启布娃娃。你可以看到角色开关布娃娃时的不同效果。代码如下：
        * ```ts
        * @Component
        * export default class Example_Character extends Script {
        *     // 当脚本被实例后，会在第一帧更新前调用此函数
        *     protected onStart(): void {
        *         // 下列代码仅在客户端执行
        *         if(SystemUtil.isClient()) {
        *             this.useUpdate = true;
        *             // 生成一个黑洞特效循环播放
        *             EffectService.playAtPosition("27693", new Vector(500, 0, 50), {loopCount: 0});
        *         }
        *     }
        *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
        *     protected onUpdate(dt: number): void {
        *         // 下列代码仅在客户端执行
        *         if(SystemUtil.isClient()) {
        *             // 获取当前客户端的玩家(自己)
        *             let myPlayer = Player.localPlayer;
        *             // 获取当前玩家控制的角色
        *             let myCharacter = myPlayer.character;
        *             // 如果角色与黑洞中心距离小于300且角色没有开启布娃娃，则朝中心移动角色
        *             if(myCharacter.worldTransform.position.subtract(new Vector(500, 0, 50)).length < 300 && !myCharacter.ragdollEnabled) {
        *                 let dir = new Vector(500, 0, 50).subtract(myCharacter.worldTransform.position).normalize();
        *                 myCharacter.addMovement(new Vector(dir.x, dir.y, 0));
        *             }
        *             // 如果角色与黑洞中心距离小于50，则开启布娃娃
        *             if(myCharacter.worldTransform.position.subtract(new Vector(500, 0, 50)).length < 50) {
        *                 myCharacter.ragdollEnabled = true;
        *                 setTimeout(() => {
        *                     myCharacter.worldTransform.position = new Vector(0, 0, 130);
        *                     myCharacter.ragdollEnabled = false;
        *                 }, 2000);
        *             }
        *         }
        *     }
        * }
        * ```
        * @networkStatus usage:双端
        */
        get ragdollEnabled(): boolean;
        /**
         * @description 角色的布娃娃效果，与其他物体进行交互时，使角色在发生某些条件时可以像布娃娃一样松弛和摆动，而不是保持刚体的僵硬状态。
         * @effect 调用端生效
         * @precautions 角色当前是否使用布娃娃状态。true表示使用，false表示禁用。
         * @param value usage: true为启用布娃娃效果，false为禁用。
         * @networkStatus usage:双端
         */
        set ragdollEnabled(value: boolean);
        /**
         * @description 移动模式
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason:功能改变 replacement: getCurrentState
         * @description 获取当前角色移动模式（分为行走、游泳和飞行三种模式）
         * @effect 调用端生效
         * @returns 当前角色移动模式
         * @example
         * 使用示例:将使用到的资源:"23060,86749"拖入优先加载栏。创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中创建游泳池以便支持切换游泳状态。给角色【移动模式切换】委托添加一个函数，打印当前移动模式，看到角色根据运动模式切换道具的效果。按下键盘“1”，角色切换为行走。按下键盘“2”，角色切换为游泳(需在游泳区域内)。按下键盘“3”，角色生成喷气背包，切换为飞行。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 创建游泳池
         *             let swimmingPool = GameObject.spawn("WaterVolume",{ transform: new Transform(new Vector(600, 0, 0), Rotation.zero, new Vector(10, 10, 1))});
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             let item: GameObject = null;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色【移动模式切换】委托添加一个函数，打印当前移动模式，根据模式切换道具
         *             myCharacter.onMovementModeChange.add((mode) => {
         *                 console.log("current movementMode " + myCharacter.movementMode);
         *                 switch (mode) {
         *                     case 0:
         *                         if(item) {
         *                             item.destroy();
         *                         }
         *                         item = null;
         *                         break;
         *                     case 1:
         *                         if(item) {
         *                             item.destroy();
         *                         }
         *                         item = GameObject.spawn("23060");
         *                         myCharacter.attachToSlot(item, HumanoidSlotType.Buttocks);
         *                         break;
         *                     case 2:
         *                         if(item) {
         *                             item.destroy();
         *                         }
         *                         item = GameObject.spawn("86749");
         *                         myCharacter.attachToSlot(item, HumanoidSlotType.BackOrnamental);
         *                         item.localTransform.position = new Vector(-5, 0, -125);
         *                         item.localTransform.rotation = new Rotation(0, 0, 90);
         *                         break;
         *                     default:
         *                         break;
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“1”，角色切换为行走
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.switchToWalking();
         *             });
         *             // 添加一个按键方法:按下键盘“2”，角色切换为游泳(需在游泳区域内)
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.switchToSwimming();
         *             });
         *             // 添加一个按键方法:按下键盘“3”，角色生成喷气背包，切换为飞行
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.switchToFlying();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get movementMode(): mw.MovementMode;
        /**
         * @description 获取角色是否启用移动能力
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason:功能改变 replacement: setStateEnabled
         * @effect 调用端生效
         * @returns 角色移动能力布尔值
         * @example
         * 使用示例:创建一个名为"Example_MovementEnabled"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，你将在场景中看到禁用角色的移动能力的效果。代码如下：
         * ```ts
         * @Component
         * export default class Example_MovementEnabled extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 添加一个按键方法：按下键盘“1”，启用/禁用 角色的移动能力
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.movementEnabled = !myCharacter.movementEnabled;
         *                 console.log("当前角色是否可以移动: "+ myCharacter.movementEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get movementEnabled(): boolean;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason:功能改变 replacement: setStateEnabled
         * @description 设置角色是否启用移动能力
         * @param value usage: true为启用，false为不启用 range: [true,false]
         */
        set movementEnabled(value: boolean);
        /**
        * @description 获取角色是否开启了跳跃能力
        * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason:功能改变 replacement: setStateEnabled
        * @returns 跳跃能力。<br> 默认值为true。
        * @effect 调用端生效
        * @example
        * 使用示例:创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，设置角色最大跳跃高度为300，最高三连跳。按下键盘“1”，角色跳跃。按下键盘“2”，启用/禁用跳跃能力。你将在场景中看到角色禁用跳跃能力的效果。代码如下：
        * ```
        * @Component
        * export default class Example_Character extends Script {
        *     // 当脚本被实例后，会在第一帧更新前调用此函数
        *     protected onStart(): void {
        *         // 下列代码仅在客户端执行
        *         if(SystemUtil.isClient()) {
        *             // 获取当前客户端的玩家(自己)
        *             let myPlayer = Player.localPlayer;
        *             // 获取当前玩家控制的角色
        *             let myCharacter = myPlayer.character;
        *             // 最大跳跃高度为300
        *             myCharacter.maxJumpHeight = 300;
        *             // 最高三连跳
        *             myCharacter.jumpMaxCount = 3;
        *             // 添加一个按键方法:按下键盘“1”，角色跳跃。
        *             InputUtil.onKeyDown(Keys.One, () => {
        *                 myCharacter.jump();
        *                 console.log("当前角色是否在跳跃 " + myCharacter.isJumping);
        *             });
        *             // 添加一个按键方法:按下键盘“2”，启用/禁用跳跃能力。
        *             InputUtil.onKeyDown(Keys.Two, () => {
        *                 myCharacter.jumpEnabled = !myCharacter.jumpEnabled;
        *                 console.log("当前角色跳跃能力 " + myCharacter.jumpEnabled);
        *             });
        *         }
        *     }
        * }
        * ```
        * @networkStatus usage:双端
        */
        get jumpEnabled(): boolean;
        /**
        * @groups 角色系统/角色
        * @description 设置角色是否开启了跳跃能力。true表示角色可以跳跃，false表示角色不可跳跃。
        * @effect 调用端生效
        * @param value usage: 跳跃能力。
        * @networkStatus usage:双端
        */
        set jumpEnabled(value: boolean);
        /**
         * @description 获取角色启用下蹲的能力
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason:功能改变 replacement: setStateEnabled
         * @returns 下蹲能力。<br> 默认值为true。
         * @effect 调用端生效
         * @example
         * 使用示例:将使用到的资源:"54834,36851"拖入优先加载栏。创建一个名为"Example_Character_CrouchEnabled"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成草丛和拱门并添加触发器。按下键盘“1”，启用/禁用下蹲能力。你可以看到看到角色禁用下蹲能力后进入草丛无法蹲下的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_CrouchEnabled extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 生成草丛和拱门
         *             GameObject.spawn("54834",{transform: new Transform(new Vector(300, 0, 0), Rotation.zero, new Vector(2, 2, 2))});
         *             let arch = GameObject.spawn("36851",{transform: new Transform(new Vector(300, 210, 0), new Rotation(0, 0, 90), new Vector(2, 1, 2))}) as Model;
         *             arch.setCollision(CollisionStatus.On);
         *             // 生成触发器并添加委托函数：进入触发器的角色蹲下，离开触发器站起
         *             let tri = GameObject.spawn("Trigger",{transform: new Transform(new Vector(300, 0, 50), Rotation.zero, new Vector(2, 2, 1))}) as Trigger;
         *             tri.onEnter.add((character: Character) => {
         *                 character.crouch(true);
         *                 setTimeout(() => {
         *                     console.log("当前角色下蹲 " + character.isCrouching);
         *                 }, 500);
         *             });
         *             tri.onLeave.add((character: Character) => {
         *                 character.crouch(false);
         *                 console.log("当前角色下蹲 " + character.isCrouching);
         *             });
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 地面蹲伏行走时的最大移动速度100
         *             myCharacter.maxWalkSpeedCrouched = 100;
         *             // 下蹲后高度为100
         *             myCharacter.crouchedHeight = 100;
         *             // 添加一个按键方法：按下键盘“1”，启用/禁用下蹲能力
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.crouchEnabled = !myCharacter.crouchEnabled;
         *                 console.log("当前角色是否能下蹲 " + myCharacter.crouchEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get crouchEnabled(): boolean;
        /**
         * @groups 角色系统/角色
         * @description 启用下蹲能力。true表示角色可以下蹲，false表示角色不可下蹲。
         * @effect 调用端生效
         * @param canCrouch usage: 下蹲能力。
         * @networkStatus usage:双端
         */
        set crouchEnabled(canCrouch: boolean);
        /**
         * @description 获取角色运动时依据的轴方向
         * @description 只有当前的 MovementDirection 为 AxisDirection 时有效
         * @returns 轴向量。默认为(0,0,0)
         * @effect 调用端生效
         * @example
         * 使用示例:创建一个名为"Example_Character_MovementAxisDirection"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，设置定轴方向(1, 0, 0)并在控制台看到打印的当前角色的运动轴。按下键盘“2”，切换角色的运动时依据的正方向，你将在场景中看到角色依据正方向修改为定轴方向时运动的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_MovementAxisDirection extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置定轴方向
         *             myCharacter.movementAxisDirection = new Vector(1, 0, 0);
         *             // 打印当前角色的运动轴和面朝方向
         *             console.log("当前角色的运动面朝方向 " + MoveFacingDirection[myCharacter.moveFacingDirection]);
         *             console.log("当前角色的运动时依据的正方向 " + MovementDirection[myCharacter.movementDirection]);
         *             // 添加一个按键方法:按下键盘“1”，切换角色的运动面朝方向
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.moveFacingDirection = (myCharacter.moveFacingDirection + 1) % 3;
         *                 console.log("当前角色的运动 " + MoveFacingDirection[myCharacter.moveFacingDirection] + " + " + MovementDirection[myCharacter.movementDirection]);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，切换角色的运动时依据的正方向
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.movementDirection = (myCharacter.movementDirection + 1) % 3;
         *                 console.log("当前角色的运动 " + MoveFacingDirection[myCharacter.moveFacingDirection] + " + " + MovementDirection[myCharacter.movementDirection]);
         *                 if(myCharacter.movementDirection == 0) {
         *                     console.log("当前角色的运动 " + MoveFacingDirection[myCharacter.moveFacingDirection] + " + " + MovementDirection[myCharacter.movementDirection] + " 定轴方向 " + myCharacter.movementAxisDirection);
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:020 reason:该接口由于类型错误废弃，后续由新接口替换 replacement:
         */
        get movementAxisDirection(): mw.Vector;
        /**
         * @description 设置角色运动时依据的轴方向
         * @param InMovementAxisDirection usage: 轴向量。
         * @effect 调用端生效
         * @networkStatus usage:双端
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:020 reason:该接口由于类型错误废弃，后续由新接口替换 replacement:
         */
        set movementAxisDirection(InMovementAxisDirection: mw.Vector);
        /**
        * @description 移动模式切换时的回调
        * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason:功能改变 replacement: onStateChanged
        * @effect 调用端生效
        * @description 当角色移动状态切换时执行绑定函数
        * @example
        * 使用示例:将使用到的资源:"23060,86749"拖入优先加载栏。创建一个名为"Example_Character_OnMovementModeChange"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中创建游泳池以便支持切换游泳状态。给角色【移动模式切换】委托添加一个函数:打印当前移动模式，看到角色根据运动模式切换道具的效果。按下键盘“1”，角色切换为行走。按下键盘“2”，角色切换为游泳(需在游泳区域内)。按下键盘“3”，角色生成喷气背包，切换为飞行。代码如下：
        * ```
        * @Component
        * export default class Example_Character_movementMode extends Script {
        *     // 当脚本被实例后，会在第一帧更新前调用此函数
        *     protected onStart(): void {
        *         // 下列代码仅在服务端执行
        *         if(SystemUtil.isServer()) {
        *             // 创建游泳池
        *             let swimmingPool = GameObject.spawn("WaterVolume",{ transform: new Transform(new Vector(600, 0, 0), Rotation.zero, new Vector(10, 10, 1))});
        *         }
        *         // 下列代码仅在客户端执行
        *         if(SystemUtil.isClient()) {
        *             let item: GameObject = null;
        *             // 获取当前客户端的玩家(自己)
        *             let myPlayer = Player.localPlayer;
        *             // 获取当前玩家控制的角色
        *             let myCharacter = myPlayer.character;
        *             // 给角色【移动模式切换】委托添加一个函数:打印当前移动模式，根据模式切换道具
        *             myCharacter.onMovementModeChange.add((mode) => {
        *                 console.log("current movementMode " + myCharacter.movementMode);
        *                 switch (mode) {
        *                     case 0:
        *                         if(item) {
        *                             item.destroy();
        *                         }
        *                         item = null;
        *                         break;
        *                     case 1:
        *                         if(item) {
        *                             item.destroy();
        *                         }
        *                         item = GameObject.spawn("23060");
        *                         myCharacter.attachToSlot(item, HumanoidSlotType.Buttocks);
        *                         break;
        *                     case 2:
        *                         if(item) {
        *                             item.destroy();
        *                         }
        *                         item = GameObject.spawn("86749");
        *                         myCharacter.attachToSlot(item, HumanoidSlotType.BackOrnamental);
        *                         item.localTransform.position = new Vector(-5, 0, -125);
        *                         item.localTransform.rotation = new Rotation(0, 0, 90);
        *                         break;
        *                     default:
        *                         break;
        *                 }
        *             });
        *             // 添加一个按键方法:按下键盘“1”，角色切换为行走
        *             InputUtil.onKeyDown(Keys.One, () => {
        *                 myCharacter.switchToWalking();
        *             });
        *             // 添加一个按键方法:按下键盘“2”，角色切换为游泳(需在游泳区域内)
        *             InputUtil.onKeyDown(Keys.Two, () => {
        *                 myCharacter.switchToSwimming();
        *             });
        *             // 添加一个按键方法:按下键盘“3”，角色生成喷气背包，切换为飞行
        *             InputUtil.onKeyDown(Keys.Three, () => {
        *                 myCharacter.switchToFlying();
        *             });
        *         }
        *     }
        * }
        * ```
        * @networkStatus usage:双端
        */
        onMovementModeChange: mw.MulticastDelegate<mw.OnMovementModeChange>;
        /**
        * @description 将角色状态切换为飞行状态
        * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason:功能改变 replacement: changeState
        * @effect 调用端生效
        * @example
        * 使用示例:将使用到的资源:"53011,20307"拖入优先加载栏。创建一个名为"Example_Character_SwitchToFlying"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，角色切换为飞行，按下键盘“2”，角色进行喷射加速。你将在场景中看到角色在加速过程中最大飞行速度变化的效果。代码如下：
        * ```
        * @Component
        * export default class Example_Character_SwitchToFlying extends Script {
        *     // 当脚本被实例后，会在第一帧更新前调用此函数
        *     protected onStart(): void {
        *         // 下列代码仅在客户端执行
        *         if(SystemUtil.isClient()) {
        *             // 获取当前客户端的玩家(自己)
        *             let myPlayer = Player.localPlayer;
        *             // 获取当前玩家控制的角色
        *             let myCharacter = myPlayer.character;
        *             // 加载喷射加速动画
        *             let boostAnimation = myCharacter.loadAnimation("53011");
        *             boostAnimation.loop = 0;
        *             let isBoost = false
        *             // 加载上升姿态
        *             let boostStance = myCharacter.loadStance("20307");
        *             // 添加一个按键方法：键盘“1”，角色切换为飞行
        *             InputUtil.onKeyDown(Keys.One, () => {
        *                 myCharacter.switchToFlying();
        *             });
        *             // 添加一个按键方法：按下键盘“2”，角色进行喷射加速
        *             InputUtil.onKeyDown(Keys.Two, () => {
        *                 if(isBoost) return;
        *                 let boost_interval = 0;
        *                 if(myCharacter.isMoving) {
        *                     // 播放飞行动画，修改飞行速度和制动速度
        *                     boostAnimation.play();
        *                     myCharacter.maxFlySpeed = 2000;
        *                     myCharacter.brakingDecelerationFlying = 5000;
        *                     // 设置加速周期，每帧检查角色是否移动，当角色停止移动时,执行停止加速操作：停止动画清除姿态，还原飞行速度，清除加速周期
        *                     boost_interval = setInterval(() => {
        *                         if(!myCharacter.isMoving) {
        *                             isBoost = false;
        *                             clearInterval(boost_interval);
        *                             myCharacter.maxFlySpeed = 500;
        *                             boostAnimation.stop();
        *                             boostStance.stop();
        *                         }
        *                     }, 1);
        *                 // 如果当前角色静止，修改角色为上升姿态，设置加速周期，每帧上升5个单位
        *                 } else {
        *                     boostStance.play();
        *                     boost_interval = setInterval(() => {
        *                         myCharacter.addMovement(new Vector(0, 0, 5));
        *                     }, 1);
        *                 }
        *                 // 2秒后执行停止加速操作
        *                     setTimeout(() => {
        *                         isBoost = false;
        *                         clearInterval(boost_interval);
        *                         myCharacter.maxFlySpeed = 500;
        *                         boostAnimation.stop();
        *                         boostStance.stop();
        *                     }, 2000);
        *                     // 2.2秒后还原角色飞行制动速度
        *                     setTimeout(() => {
        *                         myCharacter.brakingDecelerationFlying = 300;
        *                     }, 2200);
        *             });
        *         }
        *     }
        * }
        * ```
        * @networkStatus usage:双端
        */
        switchToFlying(): void;
        /**
         * @description 将角色状态切换为行走状态
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason:功能改变 replacement: changeState
         * @effect 调用端生效
         * @example
         * 使用示例:将使用到的资源:"23060,86749"拖入优先加载栏。创建一个名为"Example_Character_movementMode"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中创建游泳池以便支持切换游泳状态。给角色【移动模式切换】委托添加一个函数:打印当前移动模式，看到角色根据运动模式切换道具的效果。按下键盘“1”，角色切换为行走。按下键盘“2”，角色切换为游泳(需在游泳区域内)。按下键盘“3”，角色生成喷气背包，切换为飞行。代码如下：
         * ```
         * @Component
         * export default class Example_Character_movementMode extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 创建游泳池
         *             let swimmingPool = GameObject.spawn("WaterVolume",{ transform: new Transform(new Vector(600, 0, 0), Rotation.zero, new Vector(10, 10, 1))});
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             let item: GameObject = null;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 给角色【移动模式切换】委托添加一个函数:打印当前移动模式，根据模式切换道具
         *             myCharacter.onMovementModeChange.add((mode) => {
         *                 console.log("current movementMode " + myCharacter.movementMode);
         *                 switch (mode) {
         *                     case 0:
         *                         if(item) {
         *                             item.destroy();
         *                         }
         *                         item = null;
         *                         break;
         *                     case 1:
         *                         if(item) {
         *                             item.destroy();
         *                         }
         *                         item = GameObject.spawn("23060");
         *                         myCharacter.attachToSlot(item, HumanoidSlotType.Buttocks);
         *                         break;
         *                     case 2:
         *                         if(item) {
         *                             item.destroy();
         *                         }
         *                         item = GameObject.spawn("86749");
         *                         myCharacter.attachToSlot(item, HumanoidSlotType.BackOrnamental);
         *                         item.localTransform.position = new Vector(-5, 0, -125);
         *                         item.localTransform.rotation = new Rotation(0, 0, 90);
         *                         break;
         *                     default:
         *                         break;
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“1”，角色切换为行走
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.switchToWalking();
         *             });
         *             // 添加一个按键方法:按下键盘“2”，角色切换为游泳(需在游泳区域内)
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.switchToSwimming();
         *             });
         *             // 添加一个按键方法:按下键盘“3”，角色生成喷气背包，切换为飞行
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.switchToFlying();
         *             });
         *         }
         *     }
         * }
         * ```
         */
        switchToWalking(): void;
        /**
         * @description 将角色状态切换为游泳状态
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason:功能改变 replacement: changeState
         * @effect 调用端生效
         * @precautions 仅在游泳区域中生效 !
         * @example
         * 使用示例:将使用到的资源:"53011,20307"拖入优先加载栏。创建一个名为"Example_Character_SwitchToSwimming"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成拱形容器并适配游泳区域。按下键盘“1”，角色切换游泳。按下键盘“4”，角色修改最大游泳速度进行喷射加速。你可以看到的角色最大游泳速度变化的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_SwitchToSwimming extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 生成拱形容器并适配游泳区域
         *             GameObject.spawn("WaterVolume",{transform: new Transform(new Vector(0, 0, 500), new Rotation(0, 0, 90), new Vector(20, 20, 10))});
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             let flag = true;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 设置游泳属性
         *             myCharacter.canJumpOutOfWater = true;
         *             myCharacter.outOfWaterVerticalSpeed = 100;
         *             // 加载加速动画
         *             let boostAnimation = myCharacter.loadAnimation("53011");
         *             boostAnimation.loop = 10;
         *             let isBoost = false
         *             // 加载上升姿态
         *             let boostStance = myCharacter.loadSubStance("20307");
         *             // 添加一个按键方法:按下键盘“1”，角色切换游泳 / 行走
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(flag) {
         *                     myCharacter.switchToWalking();
         *                 } else {
         *                     myCharacter.switchToSwimming();
         *                 }
         *                 flag = !flag;
         *             });
         *             // 添加一个按键方法:按住键盘“2”，角色上浮
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCharacter.swimUp(10);
         *             });
         *             // 添加一个按键方法:按住键盘“3”，角色下潜
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCharacter.swimDown(10);
         *             });
         *             // 添加一个按键方法:按下键盘“4”，角色进行喷射加速
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 if(isBoost) return;
         *                 let boost_interval = 0;
         *                 if(myCharacter.isMoving) {
         *                     // 播放游泳动画，修改游泳速度和制动速度
         *                     boostAnimation.play();
         *                     myCharacter.maxSwimSpeed = 600;
         *                     myCharacter.brakingDecelerationSwimming = 4096;
         *                     // 设置加速周期，每帧检查角色是否移动，当角色停止移动时,执行停止加速操作:停止动画清除姿态，还原游泳速度，清除加速周期
         *                     boost_interval = setInterval(() => {
         *                         if(!myCharacter.isMoving) {
         *                             isBoost = false;
         *                             clearInterval(boost_interval);
         *                             myCharacter.maxSwimSpeed = 300;
         *                             boostAnimation.stop();
         *                             boostStance.stop();
         *                         }
         *                     }, 1);
         *                 // 如果当前角色静止，修改角色为上升姿态，设置加速周期，每帧上升5个单位
         *                 } else {
         *                     boostStance.play();
         *                     boost_interval = setInterval(() => {
         *                         myCharacter.swimUp(1)
         *                     }, 1);
         *                 }
         *                 // 1秒后执行停止加速操作
         *                     setTimeout(() => {
         *                         isBoost = false;
         *                         clearInterval(boost_interval);
         *                         myCharacter.maxSwimSpeed = 300;
         *                         boostAnimation.stop();
         *                         boostStance.stop();
         *                     }, 1000);
         *                     // 1.2秒后还原角色游泳制动速度
         *                     setTimeout(() => {
         *                         myCharacter.brakingDecelerationSwimming = 4096
         *                     }, 1200);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        switchToSwimming(): void;
        /**
         * @description 使角色触发一个跳跃行为
         * @effect 调用端生效
         * @example
         * 使用示例:创建一个名为"Example_Character_Jump"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，设置角色最大跳跃高度为300，最高三连跳。按下键盘“1”，角色跳跃。按下键盘“2”，启用/禁用跳跃能力。你将在场景中看到角色禁用跳跃能力的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_Jump extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 最大跳跃高度为300
         *             myCharacter.maxJumpHeight = 300;
         *             // 最高三连跳
         *             myCharacter.jumpMaxCount = 3;
         *             // 添加一个按键方法：按下键盘“1”，角色跳跃。
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.jump();
         *                 console.log("当前角色是否在跳跃 " + myCharacter.isJumping);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，启用/禁用跳跃能力。
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCharacter.jumpEnabled = !myCharacter.jumpEnabled;
         *                 console.log("当前角色跳跃能力 " + myCharacter.jumpEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        jump(): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason:功能改变 replacement: changeState
         * @description 使角色触发一个下蹲行为
         * @effect 调用端生效
         * @param isCrouch usage:是否下蹲
         * @example
         * 使用示例:将使用到的资源:"54834,36851"拖入优先加载栏。创建一个名为"Example_Character_Crouch"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成草丛和拱门并添加触发器，并添加委托函数实现角色进入草丛蹲下，离开站起的效果。设置地面蹲伏行走时的最大移动速度100。你可以看到角色蹲下后行走速度减慢的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_Crouch extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 生成草丛和拱门
         *             GameObject.spawn("54834",{transform: new Transform(new Vector(300, 0, 0), Rotation.zero, new Vector(2, 2, 2))});
         *             let arch = GameObject.spawn("36851",{transform: new Transform(new Vector(300, 210, 0), new Rotation(0, 0, 90), new Vector(2, 1, 2))});
         *             arch.setCollision(CollisionStatus.On);
         *             // 生成触发器并添加委托函数：进入触发器的角色蹲下，离开触发器站起
         *             let tri = GameObject.spawn("Trigger",{transform: new Transform(new Vector(300, 0, 50), Rotation.zero, new Vector(2, 2, 1))}) as mw.Trigger;
         *             tri.onEnter.add((character: Character) => {
         *                 character.crouch(true);
         *                 setTimeout(() => {
         *                     console.log("当前角色下蹲 " + character.isCrouching);
         *                 }, 500);
         *             });
         *             tri.onLeave.add((character: Character) => {
         *                 character.crouch(false);
         *                 console.log("当前角色下蹲 " + character.isCrouching);
         *             });
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 地面蹲伏行走时的最大移动速度100
         *             myCharacter.maxWalkSpeedCrouched = 100;
         *             // 下蹲后高度为100
         *             myCharacter.crouchedHeight = 100;
         *             // 添加一个按键方法：按下键盘“1”，启用/禁用下蹲能力
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.crouchEnabled = !myCharacter.crouchEnabled;
         *                 console.log("当前角色是否能下蹲 " + myCharacter.crouchEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        crouch(isCrouch: boolean): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:028 reason:多余接口 replacement:worldTransform.lookAt
         * @description 角色面朝目标点
         * @effect 调用端生效
         * @param target usage:目标点
         * @example
         * 使用示例:将使用到的资源:"122180,122182,122174,132631,75354"拖入优先加载栏。创建一个名为"Example_Character_LookAt"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成一个生成大炮模型，5s周期从炮口生成炮弹并发射。在客户端添加一个【Look】事件监听器，当炮弹生成时获取炮弹对象，并播放音效特效。当炮弹发射时，角色会看向炮弹，你可以看到角色一直面朝炮弹的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Character_LookAt extends Script {
         *     // 声明变量
         *     cannon_ball: GameObject;
         *     stride: Vector;
         *     displacement: Vector;
         *     currentTime: number;
         *     currentPos: Vector;
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         this.useUpdate = true;
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 生成大炮模型
         *             let cannon_base = GameObject.spawn("122180",{transform: new Transform(new Vector(750, -750, 0), new Rotation(0, 0, -90), Vector.one.multiply(2))});
         *             let cannon_tube  = GameObject.spawn("122182",{transform: new Transform(new Vector(750, -750, 250), new Rotation(0, 30, 90), Vector.one.multiply(2))});
         *             // 5s周期从炮口生成炮弹
         *             TimeUtil.setInterval(() => {
         *                 this.cannon_ball = GameObject.spawn("122174",{transform: new Transform(new Vector(750, -480, 330), Rotation.zero, Vector.one.multiply(3))});
         *                 this.displacement = Vector.multiply(cannon_tube.worldTransform.getForwardVector(), 1000, this.displacement);
         *                 this.currentTime = 0;
         *                 this.currentPos = this.cannon_ball.worldTransform.position.clone();
         *                 setTimeout(() => {
         *                     this.cannon_ball.destroy();
         *                     this.cannon_ball = null;
         *                 }, 3000);
         *                 mw.Event.dispatchEventToAllClient("LOOK", this.cannon_ball.guid);
         *             }, 5);
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 在客户端添加一个【Look】事件监听器，当炮弹生成时获取炮弹对象，并播放音效特效。
         *             mw.Event.addServerListener("LOOK", (guid: string) => {
         *                 setTimeout(() => {
         *                     this.cannon_ball = GameObject.findGameObjectByGuid(guid);
         *                     EffectService.playAtPosition("132631", this.cannon_ball.worldTransform.position)
         *                     SoundService.playSound("75354");
         *                 }, 100);
         *             });
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             if(this.cannon_ball) {
         *                 // 计算当前帧弹药移动步长
         *                 this.stride = Vector.multiply(this.displacement, dt, this.stride);
         *                 // 添加重力
         *                 this.stride.z -= (50 * 9.8 * (Math.pow(this.currentTime + dt, 2) - Math.pow(this.currentTime, 2)));
         *                 this.cannon_ball.worldTransform.rotation = this.stride.toRotation();
         *                 this.currentTime += dt;
         *                 // 计算出当前更新位置
         *                 this.currentPos.x += this.stride.x;
         *                 this.currentPos.y += this.stride.y;
         *                 this.currentPos.z += this.stride.z;
         *                 // 更新弹药实体位置
         *                 this.cannon_ball.worldTransform.position = this.currentPos;
         *             }
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             if(this.cannon_ball) {
         *                 // 获取当前客户端的玩家(自己)
         *                 let myPlayer = Player.localPlayer;
         *                 // 获取当前玩家控制的角色
         *                 let myCharacter = myPlayer.character;
         *                 // 看向炮弹
         *                 myCharacter.lookAt(this.cannon_ball.worldTransform.position);
         *             }
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        lookAt(target: mw.Vector): void;
        /**
         * @groups 角色系统/角色
         * @description 获取角色名称。角色名称默认会显示在角色头顶上方。
         * @returns 角色名称字符串
         * @example
         * 使用示例: 创建一个名为"Example_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，场景中角色显示的名称发生了变化。代码如下：
         * ```ts
         * @Component
         * export default class Example_Character extends Script {
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             let names = ["Cali", "Lily", "Emmie"];
         *             let index = 0;
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 打印本地玩家控制的character对象的guid和名字
         *             console.log("My character: " + myPlayer.character.gameObjectId + " " + myPlayer.character.displayName);
         *             // 添加一个按键方法：按下键盘“1”，切换角色显示名称
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myPlayer.character.displayName = names[index % 3];
         *                 index++;
         *             });
         *         }
         *     }
         * }
         * ```
         */
        get displayName(): string;
        /**
         * @groups 角色系统/角色
         * @description 设置角色名称。名字为随机初始化的一个英文名，可根据自己的喜好随意更换角色名字。
         * @param inName usage: 想要更改的角色名称   range:设置合理的名称即可
         */
        set displayName(inName: string);
        /**
         * @description 获取角色单层透明度
         * @effect 调用端生效
         * @returns 获取透明度
         */
        get opacity(): number;
        /**
         * @description 设置角色单层透明度
         * @effect 调用端生效
         * @param value usage:透明度[0,1]
         */
        set opacity(value: number);
    }
}

/**
 *
 */
declare namespace mw {
}

declare namespace mw {
    /**
     * @author chenghao.song
     * @groups 角色系统
     * @description 角色状态
     */
    enum MovementMode {
        /** 行走 */
        Walk = 0,
        /** 游泳 */
        Swim = 1,
        /** 飞行 */
        Fly = 2
    }
    /**
     * @author chenghao.song
     * @groups 角色系统
     * @description 移动控制模式
     */
    enum MoveControlMode {
        /** 空 */
        null = 0,
        /** 固定模式 */
        FixedMode = 1,
        /** 面向模式 */
        FaceMode = 2,
        /** 运动模式 */
        FollowMode = 3,
        /** 自由模式 */
        FreeMode = 4
    }
    /**
     * @author chenghao.song
     * @groups 角色系统
     * @description 运动时面朝方向
     */
    enum MoveFacingDirection {
        /** 运动方向 */
        MovementDirection = 0,
        /** 固定方向 */
        FixedDirection = 1,
        /** 控制器方向 */
        ControllerDirection = 2
    }
    /**
     * @author chenghao.song
     * @groups 角色系统
     * @description 运动时依据的正方向
     * @description 不同的模式会决定运动时依据的实际轴向修改方式
     * @description AxisDirection模式下,可以修改character的movementAxisDirection决定移动轴向
     * @description ViewDirection模式下,移动轴向会随着视口的旋转自动变化
     * @description ControllerDirection模式下,移动轴向会随着控制器的旋转自动变化
     * @description 例:
     * @description 1.调用addMoveInput接口,传入参数为Vector.forward
     * @description 当运动时依据的实际轴向为世界前方向(Vector.forward)时,实际运动方向为世界前方向(Vector.forward)
     * @description 当运动时依据的实际轴向为世界右方向(Vector.right)时,实际运动方向为世界正方向(Vector.right)
     * @description 2.调用addMoveInput接口,传入参数为Vector.right
     * @description 当运动时依据的实际轴向为世界前方向(Vector.forward)时,实际运动方向为世界右方向(Vector.right)
     * @description 当运动时依据的实际轴向为世界右方向(Vector.right)时,实际运动方向为世界后方向(Vector.back)
     */
    enum MovementDirection {
        /** 给定轴方向 */
        AxisDirection = 0,
        /** 视口方向 */
        ViewDirection = 1,
        /** 控制器方向 */
        ControllerDirection = 2
    }
    /**
     * @author yuchen.ren
     * @groups 角色系统
     * @description V1角色部位
     */
    enum BodyPartTypeV1 {
        /** 头发 */
        Hair = 0,
        /** 面部 */
        Face = 1,
        /** 身体 */
        Trunk = 2
    }
    /**
     * @author guang.deng
     * @groups 角色系统
     * @description 人形角色插槽类型
     */
    enum HumanoidSlotType {
        /** 头发 */
        Hair = 0,
        /** 脸部 */
        Head = 1,
        /** 头部左侧 */
        LeftHead = 2,
        /** 头部右侧 */
        RightHead = 3,
        /** 眼镜 */
        Glasses = 4,
        /** 眼睛 */
        Eyes = 5,
        /** 面部装饰 */
        FaceOrnamental = 6,
        /** 嘴部 */
        Mouse = 7,
        /** 左肩部 */
        LeftShoulder = 8,
        /** 右肩部 */
        RightShoulder = 9,
        /** 左手手套 */
        LeftGlove = 10,
        /** 右手手套 */
        RightGlove = 11,
        /** 背部装饰 */
        BackOrnamental = 12,
        /** 左背 */
        LeftBack = 13,
        /** 右背 */
        RightBack = 14,
        /** 左手 */
        LeftHand = 15,
        /** 右手 */
        RightHand = 16,
        /** 左脚 */
        LeftFoot = 17,
        /** 右脚 */
        RightFoot = 18,
        /** 臀部 */
        Buttocks = 19,
        /** 头顶光圈 */
        Rings = 20,
        /** 头顶标题 */
        Nameplate = 21,
        /** 聊天框 */
        ChatFrame = 22,
        /** 根节点 */
        Root = 23,
        /** 左手肘 */
        LeftLowerArm = 24,
        /** 右手肘 */
        RightLowerArm = 25,
        /** 左大腿根 */
        LeftThigh = 26,
        /** 右大腿根 */
        RightThigh = 27,
        /** 左膝盖 */
        LeftCalf = 28,
        /** 右膝盖 */
        RightCalf = 29,
        /** 第一人称摄像机 */
        FirstpersonCamera = 30
    }
    /**
     * @author yunhao.liao
     * @groups 角色系统
     * @description 非人形角色插槽类型
     */
    enum NonHumanoidSlotType {
        /** 根节点 */
        Root = 0,
        /** 胸腔 */
        Chest = 1,
        /** 上脊柱 */
        UpperSpine = 2,
        /** 下脊柱 */
        LowerSpine = 3,
        /** 脖子 */
        Neck = 4,
        /** 头部 */
        Head = 5,
        /** 左前脚 */
        FrontalLeftFoot = 6,
        /** 右前脚 */
        FrontalRightFoot = 7,
        /** 左后脚 */
        RearLeftFoot = 8,
        /** 右后脚 */
        RearRightFoot = 9,
        /** 尾巴 */
        Tail = 10,
        /** 类人型手臂右手01 */
        RightHand = 11,
        /** 类人型手臂左手01 */
        LeftHand = 12,
        /** 类人型头部 */
        HumanoidHead = 13,
        /** 类人型多足怪胸腔位置 */
        HumanoidChest = 14,
        /** 上表面鱼鳍01 */
        DorsalFin = 15,
        /** 左边鱼鳍01 */
        LeftFin = 16,
        /** 右边鱼鳍01 */
        RightFin = 17,
        /** 右翼翅膀01 */
        RightWing = 18,
        /** 左翼翅膀01 */
        LeftWing = 19,
        /** 多足右脚01 */
        ExtraRightFoot1 = 20,
        /** 多足右脚02 */
        ExtraRightFoot2 = 21,
        /** 多足右脚03 */
        ExtraRightFoot3 = 22,
        /** 多足右脚04 */
        ExtraRightFoot4 = 23,
        /** 多足左脚01 */
        ExtraLeftFoot1 = 24,
        /** 多足左脚02 */
        ExtraLeftFoot2 = 25,
        /** 多足左脚03 */
        ExtraLeftFoot3 = 26,
        /** 多足左脚04 */
        ExtraLeftFoot4 = 27,
        /** 嘴巴 */
        Mouth = 28,
        /** 右眼 */
        RightEye = 29,
        /** 左眼 */
        LeftEye = 30,
        /** 冠 */
        Crest = 31,
        /** 多尾右边第一条 */
        ExtraRightTail1 = 32,
        /** 多尾右边第二条 */
        ExtraRightTail2 = 33,
        /** 多尾左边第一条 */
        ExtraLeftTail1 = 34,
        /** 多尾左边第二条 */
        ExtraLeftTail2 = 35,
        /** 后部右翼翅膀 */
        RearRightWing = 36,
        /** 后部左翼翅膀 */
        RearLeftWing = 37,
        /** 类人型左眼 */
        HumanoidLeftEye = 38,
        /** 类人型右眼 */
        HumanoidRightEye = 39,
        /** 类人型嘴巴 */
        HumanoidMouth = 40,
        /** 类人型盆骨 */
        HumanoidPelvis = 41,
        /** 类人型脊柱 */
        HumanoidSpine = 42,
        /** 类人型脖子 */
        HumanoidNeck = 43,
        /** 前触手 */
        FrontTentacle = 44,
        /** 后触手 */
        RearTentacle = 45,
        /** 左触手1 */
        LeftTentacle1 = 46,
        /** 左触手2 */
        LeftTentacle2 = 47,
        /** 左触手3 */
        LeftTentacle3 = 48,
        /** 右触手1 */
        RightTentacle1 = 49,
        /** 右触手2 */
        RightTentacle2 = 50,
        /** 右触手3 */
        RightTentacle3 = 51
    }
    /**
     * @author yuchen.ren
     * @groups 角色系统
     * @description 基础姿态风格
     */
    enum BasicStanceType {
        /** 樱校1 */
        SakuraSchool1 = "Default",
        /** 二次元风格 */
        Cartoon = "30274"
    }
    /**
     * @author jun.zhang
     * @groups 角色系统
     * @description 角色基础脸型
     */
    enum FaceStyle {
        /** 默认角色类型 */
        Default = 0,
        /** 萝莉 */
        Lori = 1,
        /** 御姐 */
        Charmer = 2,
        /** 正太 */
        Shota = 3,
        /** 霸总 */
        Chad = 4
    }
    /**
     * @author guang.deng
     * @groups 角色系统
     * @description 表情类型
     */
    enum ExpressionType {
        /** 默认表情*/
        Default = 0,
        /** 微笑*/
        Smile = 1,
        /** 开心*/
        Happy = 2,
        /** 伤心*/
        Sad = 3,
        /** 生气*/
        Anger = 4,
        /** 尴尬*/
        Awkward = 5,
        /** 笑*/
        Laugh = 6,
        /** 调皮*/
        Mischievous = 7,
        /** 可爱*/
        Cute = 8,
        /** 疑惑*/
        Doubt = 9
    }
    /**
    * @author yuchen.ren
    * @groups 角色系统
    * @description 角色体型
    */
    enum CharacterTemplate {
        /** 空 */
        None = 0,
        /** 二次元成年男性 */
        AnimeMale = 1,
        /** 二次元成年女性 */
        AnimeFemale = 2,
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:下架此风格 replacement:用现存风格替换
         * Lowpoly成年男性 */
        LowpolyAdultMale = 3,
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:下架此风格 replacement:用现存风格替换
         * Lowpoly成年女性 */
        LowpolyAdultFemale = 4,
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:下架此风格 replacement:用现存风格替换
         * 写实成年男性 */
        RealisticAdultMale = 5,
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:下架此风格 replacement:用现存风格替换
         * 写实成年女性 */
        RealisticAdultFemale = 6,
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:下架此风格 replacement:用现存风格替换
         * 美卡男性 */
        CartoonyMale = 7,
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:下架此风格 replacement:用现存风格替换
         * 美卡女性 */
        CartoonyFemale = 8
    }
    /**
     * @author yuchen.ren
     * @groups 角色系统
     * @description 角色体型
     */
    enum SomatotypeV2 {
        /** 空骨骼模型，默认二次元女骨架 */
        None = 0,
        /** 二次元成年男性 */
        AnimeMale = 1,
        /** 二次元成年女性 */
        AnimeFemale = 2,
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:下架此风格 replacement:用现存风格替换
         *  Lowpoly成年男性 */
        LowpolyAdultMale = 3,
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:下架此风格 replacement:用现存风格替换
         *  Lowpoly成年女性 */
        LowpolyAdultFemale = 4,
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:下架此风格 replacement:用现存风格替换
         * 写实成年男性 */
        RealisticAdultMale = 5,
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:下架此风格 replacement:用现存风格替换
         * 写实成年女性 */
        RealisticAdultFemale = 6,
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:下架此风格 replacement:用现存风格替换
         * 美卡男性 */
        CartoonyMale = 7,
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:下架此风格 replacement:用现存风格替换
         * 美卡女性 */
        CartoonyFemale = 8
    }
    /**
     * @author guang.deng
     * @groups 角色系统
     * @description V1角色体型
     */
    enum SomatotypeV1 {
        /** 基础人形男 */
        HumanoidV1 = 0,
        /** 基础人形女 */
        HumanoidV1Girl = 1,
        /** 基础人形蛋仔 */
        HumanoidV1Eggy = 2
    }
    /**
     * @author zhiqiang.tan
     * @groups 角色系统
     * @description 碰撞体形状类型
     */
    enum CustomShapeType {
        /** 竖直的胶囊体 */
        VerticalCapsule = 0,
        /** 水平胶囊体 */
        HorizontalCapsule = 1,
        /** 盒形 */
        Box = 2,
        /** 球形 */
        Sphere = 3
    }
    /**
     * @author guang.deng
     * @groups 角色系统
     * @description 形象类型
     * @example
     * 使用示例:
     * ```
     * ```
     */
    enum AppearanceType {
        /** 基础人形 */
        HumanoidV1 = 0,
        /** 高级人形 */
        HumanoidV2 = 1,
        /** 多足类型 */
        FourFootStandard = 2
    }
    /**
     * @author guang.deng
     * @groups 角色系统
     * @description 形象类型
     * @example
     * 使用示例:
     * ```
     * ```
     */
    enum CharacterType {
        /** 基础人形 */
        HumanoidV1 = 0,
        /** 高级人形 */
        HumanoidV2 = 1,
        /** 多足类型 */
        FourFootStandard = 2
    }
    /**
     * @author jiamin.guo
     * @groups 动画
     * @description 姿态混合模式
     */
    enum StanceBlendMode {
        /** 只混合上半身 */
        BlendUpper = 0,
        /** 只混合下半身 */
        BlendLower = 1,
        /** 全身混合 */
        WholeBody = 2
    }
    /**
     * @author jiamin.guo
     * @groups 动画
     * @description 动画插槽
     */
    enum AnimSlot {
        /** 默认插槽 */
        Default = 0,
        /** 上半身插槽 */
        Upper = 1,
        /** 下半身插槽 */
        Lower = 2,
        /** 全身插槽 */
        FullyBody = 3
    }
    /**
     * @author jiamin.guio
     * @groups 动画
     * @description 动画模式
     */
    enum AnimationMode {
        /** 自动，提供基础姿态*/
        Auto = 0,
        /** 自定义模式，不提供姿态，自己控制动画切换*/
        Custom = 1
    }
    /**
     * @author liaoyun.hao
     * @groups 角色系统
     * @description 角色状态
     */
    enum CharacterStateType {
        /** 无状态/未知状态*/
        None = 0,
        /** 地面移动状态 */
        Running = 1,
        /** 飞行状态 */
        Flying = 2,
        /** 游泳状态 */
        Swimming = 3,
        /** 跳跃状态 */
        Jumping = 4,
        /** 自由落体状态 */
        Freefall = 5,
        /** 着陆状态 */
        Landed = 6,
        /** 布娃娃状态 */
        Ragdoll = 7,
        /** 下蹲状态 */
        Crouching = 8,
        /** 起身状态 */
        GettingUp = 9,
        /** 死亡状态 */
        Dead = 10,
        /** 推动状态 */
        Pushed = 11,
        /** 攀爬状态 */
        Climbing = 12
    }
    /**
     * @author guang.deng
     * @groups 角色系统
     * @description 动画曲线
     */
    enum AnimationBlendMode {
        /** Linear interpolation */
        Linear = 0,
        /** Cubic-in interpolation */
        Cubic = 1,
        /** Hermite-Cubic */
        HermiteCubic = 2,
        /** Sinusoidal interpolation */
        Sinusoidal = 3,
        /** Quadratic in-out interpolation */
        QuadraticInOut = 4,
        /** Cubic in-out interpolation */
        CubicInOut = 5,
        /** Quartic in-out interpolation */
        QuarticInOut = 6,
        /** Quintic in-out interpolation */
        QuinticInOut = 7,
        /** Circular-in interpolation */
        CircularIn = 8,
        /** Circular-out interpolation */
        CircularOut = 9,
        /** Circular in-out interpolation */
        CircularInOut = 10,
        /** Exponential-in interpolation */
        ExpIn = 11,
        /** Exponential-Out interpolation */
        ExpOut = 12,
        /** Exponential in-out interpolation */
        ExpInOut = 13
    }
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 移动状态切换委托
     */
    type OnMovementModeChange = (mode: mw.MovementMode) => void;
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author guang.deng
     * @groups 角色系统/角色
     * @description Pawn作为玩家角色和非对象玩家角色的基类，是一个可以通过玩家控制器或者逻辑脚本控制的游戏对象。
     * @networkStatus usage:双端
     */
    class Pawn extends mw.GameObject {
        /**
         * @description 玩家对象
         * @effect 调用端生效
         * @precautions 控制当前Pawn对象的玩家，只读。
         * @example
         * 使用示例:创建一个名为"Example_Pawn_Player"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，通过player获取玩家，你将在控制台中看到打印的userId和instanceId。代码如下：
         * ```
         * @Component
         * export default class Example_Pawn_Player extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *          // 下列代码仅在客户端执行
         *          if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 打印玩家(自己)userId和instanceId并对比
         *             console.log("My userId: " + myPlayer.userId);
         *             // 通过owner获取玩家(自己)并打印userId和instanceId并对比
         *             let myCharacter = myPlayer.character;
         *             let mmyPlayer_2 = myCharacter.player;
         *             console.log("My userId: " + mmyPlayer_2.userId);
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get player(): mw.Player;
        /**
         * @groups 角色系统/角色
         * @description 膨胀时间速度
         * @effect 调用端生效
         * @precautions Pawn对象的膨胀时间速度，修改后自身时间流速是该值乘世界时间流速。默认值是1。单机模式可以将膨胀设置为0达到时间暂停的效果，联机模式最低设置为0.1
         * @example
         * 使用示例:创建一个名为"Example_Pawn_CustomTimeDilation"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中修改玩家的时间膨胀速度为原来的0.5倍后看到跳跃的延迟效果。代码如下：
         * ```
         * @Component
         * export default class Example_Pawn_CustomTimeDilation extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *          // 当前修改时间膨胀后角色动画不会受到影响，关闭角色相关优化后即可
         *          Player.asyncGetLocalPlayer().then((player) => {
         *              console.warn("client close setOptimization")
         *              mw.AvatarSettings.setOptimization(player.character, false, false);
         *          })
         *          // 下列代码仅在客户端执行
         *          if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 添加一个按键方法：按下键盘“1”，将玩家的时间膨胀速度修改为原来的0.5倍，并跳跃
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myPlayer.character.customTimeDilation = 0.5;
         *                 console.log("My pawn customTimeDilation: " + myPlayer.character.customTimeDilation);
         *                 // 使玩家角色进行跳跃
         *                 (myPlayer.character as Character).jump();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get customTimeDilation(): number;
        /**
         * @groups 角色系统/角色
         * @description 膨胀时间速度
         * @effect 调用端生效
         * @precautions Pawn对象的膨胀时间速度，修改后自身时间流速是该值乘世界时间流速。默认值是1。单机模式可以将膨胀设置为0达到时间暂停的效果，联机模式最低设置为0.1
         * @example
         * 使用示例:创建一个名为"Example_Pawn_CustomTimeDilation"的脚本,放置在对象栏中,打开脚本,输入以下代码保存,运行游戏,你将在场景中修改玩家的时间膨胀速度为原来的0.5倍后看到跳跃的延迟效果.代码如下:
         * ```
         * @Component
         * export default class Example_Pawn_CustomTimeDilation extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *          // 当前修改时间膨胀后角色动画不会受到影响，关闭角色相关优化后即可
         *          Player.asyncGetLocalPlayer().then((player) => {
         *              console.warn("client close setOptimization")
         *              mw.AvatarSettings.setOptimization(player.character, false, false);
         *          })
         *          // 下列代码仅在客户端执行
         *          if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 添加一个按键方法：按下键盘“1”，将玩家的时间膨胀速度修改为原来的0.5倍，并跳跃
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myPlayer.character.customTimeDilation = 0.5;
         *                 console.log("My pawn customTimeDilation: " + myPlayer.character.customTimeDilation);
         *                 // 使玩家角色进行跳跃
         *                 (myPlayer.character as Character).jump();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        set customTimeDilation(value: number);
        /**
         * @groups 角色系统/角色
         * @description 添加描边效果
         * @effect 只在客户端调用生效
         * @precautions 为Pawn对象添加描边效果，描边效果会被其他物体遮挡。
         * @param enabled usage:是否开启描边
         * @param color usage:描边颜色 default:LinearColor.black
         * @param width usage:描边宽度 default:2  range: [0, 10]  type: 浮点数
         * @param depthOffset usage:描边深度偏移 default:0
         * @param clampValue usage:描边范围 default:0.93
         * @param cameraPosition usage:是否考虑相机位置 default:false
         * @param silhouetteOnly usage:是否仅轮廓描边 default:true
         * @example
         * 使用示例:将使用到的资源:“197386”拖入优先加载栏。创建一个名为"Example_Pawn_Outline"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，给玩家Pawn添加或移除普通描边（会被遮挡），：按下键盘“2”，给玩家Pawn添加或移除后处理描边（不会被遮挡）。代码如下：
         * ```
         * @Component
         * export default class Example_Pawn_Outline extends Script {
         *     // 声明变量
         *     flag: boolean;
         *     flag_advance: boolean;
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 设置当前描边状态
         *         this.flag = false;
         *         this.flag_advance = false;
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 创建一个立方体
         *             let cube = GameObject.spawn("197386",{ transform: new Transform(new Vector(200, 0, 0), Rotation.zero, new Vector(1, 1, 2))}) as Model;
         *             cube.setCollision(CollisionStatus.Off);
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 添加一个按键方法：按下键盘“1”，给玩家Pawn添加或移除普通描边（会被遮挡）
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(this.flag) {
         *                     myPlayer.character.setOutline(false);
         *                 } else {
         *                     myPlayer.character.setOutline(true, LinearColor.red, 1);
         *                 }
         *                 this.flag = !this.flag;
         *             });
         *             // 添加一个按键方法：按下键盘“2”，给玩家Pawn添加或移除后处理描边（不会被遮挡）
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(this.flag_advance) {
         *                     myPlayer.character.setPostProcessOutline(false);
         *                 } else {
         *                     myPlayer.character.setPostProcessOutline(true, LinearColor.red, 1);
         *                 }
         *                 this.flag_advance = !this.flag_advance;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        setOutline(enabled: boolean, color?: mw.LinearColor, width?: number): void;
        /**
         * @groups 角色系统/角色
         * @description 添加后处理描边
         * @effect 只在客户端调用生效
         * @precautions 为Pawn对象添加高级描边效果，描边效果不会被其他物体遮挡。
         * @param enabled usage:是否开启描边
         * @param color usage:描边颜色 default:LinearColor.red
         * @param width usage:描边宽度 default:1  range: [0, 10] type: 浮点数
         * @example
         * 使用示例:将使用到的资源:“197386”拖入优先加载栏。创建一个名为"Example_Pawn_PostProcessOutline"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中创建一个立方体，按下键盘“2”可以给本地玩家添加或移除不被立方体遮挡的红色描边效果。代码如下：
         * ```
         * @Component
         * export default class Example_Pawn_PostProcessOutline extends Script {
         *     // 声明变量
         *     flag: boolean;
         *     flag_advance: boolean;
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 设置当前描边状态
         *         this.flag = false;
         *         this.flag_advance = false;
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 创建一个立方体
         *             let cube = GameObject.spawn("197386",{ transform: new Transform(new Vector(200, 0, 0), Rotation.zero, new Vector(1, 1, 2))}) as Model;
         *             cube.setCollision(CollisionStatus.Off);
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 添加一个按键方法：按下键盘“1”，给玩家Pawn添加或移除普通描边（会被遮挡）
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(this.flag) {
         *                     myPlayer.character.setOutline(false);
         *                 } else {
         *                     myPlayer.character.setOutline(true, LinearColor.red, 1);
         *                 }
         *                 this.flag = !this.flag;
         *             });
         *             // 添加一个按键方法：按下键盘“2”，给玩家Pawn添加或移除后处理描边（不会被遮挡）
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(this.flag_advance) {
         *                     myPlayer.character.setPostProcessOutline(false);
         *                 } else {
         *                     myPlayer.character.setPostProcessOutline(true, LinearColor.red, 1);
         *                 }
         *                 this.flag_advance = !this.flag_advance;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        setPostProcessOutline(enabled: boolean, color?: mw.LinearColor, width?: number): void;
    }
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author yunhao.liao
     * @groups 角色系统/角色
     * @description 角色挂件插槽
     * @description 除了可以随意的更换人物衣服，脸，身体，还可以在给人物增加更多装饰物。
     * @description CharacterDecoration 如何使用呢？
     * @description CharacterDescription 在 CharacterDescription 高级人形配置有留有 slotAndDecoration 参数：
     * @description - slotOffset：一个可选的只读属性，表示插槽位置和方向的信息。
     * @description - decoration：一个可选的只读属性，表示物品的信息。是一个 CharacterDecoration 自定义类型，包含有关物品的附加装饰信息。
     * @description 可通过索引访问，添加左侧栏中已有资源的装饰物，如武器戒指光环等。使用详情请看下方接口及示例代码。
     * @description 仅客户端存在。
     * @networkStatus usage:双端
     */
    class CharacterDecoration extends Array<{
        readonly attachmentAssetId: string;
        readonly attachmentOffset?: Readonly<mw.Transform>;
        readonly attachmentGameObject?: mw.GameObject;
        readonly bSync?: boolean;
    }> {
        /**
         * @description 向当前外观插槽中添加一个挂件
         * @effect 调用端生效
         * @precautions 挂件只支持模型对象
         * @param decoration usage:挂件
         * @param attachmentOffset usage:挂件transform信息 default:null
         * @returns 插槽的 index
         * @example
         * 使用示例:将使用到的资源:"60858"拖入优先加载栏。创建一个名为"Example_CharacterDecoration_Add"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，给角色插槽【头顶光圈】添加1个挂件。按下键盘“2”，删除角色插槽【头顶光圈】的第一个挂件。按下键盘“3”，删除角色插槽【头顶光圈】的所有挂件。代码如下：
         * ```
         * @Component
         * export default class Example_CharacterDecoration_Add extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 添加一个按键方法:按下键盘“1”，给角色插槽【头顶光圈】添加1个挂件
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     myCharacter.description.advance.slotAndDecoration.slot[HumanoidSlotType.Rings].decoration.add("60858", new Transform(new Vector(0, 0, MathUtil.randomInt(0, 100)), Rotation.zero, Vector.one.multiply(0.1)));
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“2”，删除角色插槽【头顶光圈】的第一个挂件
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     let ring = myCharacter.description.advance.slotAndDecoration.slot[HumanoidSlotType.Rings].decoration[0].attachmentGameObject;
         *                     if(ring) {
         *                         myCharacter.description.advance.slotAndDecoration.slot[HumanoidSlotType.Rings].decoration.delete(ring, true);
         *                     }
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，删除角色插槽【头顶光圈】的所有挂件
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     myCharacter.description.advance.slotAndDecoration.slot[HumanoidSlotType.Rings].decoration.clear(true);
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        add(decoration: string | mw.GameObject, attachmentOffset?: mw.Transform): number;
        /**
         * @description 从当前插槽中删除一个挂件
         * @effect 调用端生效
         * @param attachmentElement usage:挂件
         * @param isDestroy usage:是否销毁 default:false
         * @example
         * 使用示例:将使用到的资源:"60858"拖入优先加载栏。创建一个名为"Example_CharacterDecoration_Delete"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，给角色插槽【头顶光圈】添加1个挂件。按下键盘“2”，删除角色插槽【头顶光圈】的第一个挂件。按下键盘“3”，删除角色插槽【头顶光圈】的所有挂件。代码如下：
         * ```
         * @Component
         * export default class Example_CharacterDecoration_Delete extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 添加一个按键方法:按下键盘“1”，给角色插槽【头顶光圈】添加1个挂件
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     myCharacter.description.advance.slotAndDecoration.slot[HumanoidSlotType.Rings].decoration.add("60858", new Transform(new Vector(0, 0, MathUtil.randomInt(0, 100)), Rotation.zero, Vector.one.multiply(0.1)));
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“2”，删除角色插槽【头顶光圈】的第一个挂件
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     let ring = myCharacter.description.advance.slotAndDecoration.slot[HumanoidSlotType.Rings].decoration[0].attachmentGameObject;
         *                     if(ring) {
         *                         myCharacter.description.advance.slotAndDecoration.slot[HumanoidSlotType.Rings].decoration.delete(ring, true);
         *                     }
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，删除角色插槽【头顶光圈】的所有挂件
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     myCharacter.description.advance.slotAndDecoration.slot[HumanoidSlotType.Rings].decoration.clear(true);
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        delete(attachmentElement: mw.GameObject | number, isDestroy?: boolean): void;
        /**
         * @description 清空当前外观插槽的所有挂件
         * @effect 调用端生效
         * @param isDestroy usage:是否销毁 default:false
         * @example
         * 使用示例:将使用到的资源:"60858"拖入优先加载栏。创建一个名为"Example_CharacterDecoration_Clear"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，给角色插槽【头顶光圈】添加1个挂件。按下键盘“2”，删除角色插槽【头顶光圈】的第一个挂件。按下键盘“3”，删除角色插槽【头顶光圈】的所有挂件。代码如下：
         * ```
         * @Component
         * export default class Example_CharacterDecoration_Clear extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 添加一个按键方法:按下键盘“1”，给角色插槽【头顶光圈】添加1个挂件
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     myCharacter.description.advance.slotAndDecoration.slot[HumanoidSlotType.Rings].decoration.add("60858", new Transform(new Vector(0, 0, MathUtil.randomInt(0, 100)), Rotation.zero, Vector.one.multiply(0.1)));
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“2”，删除角色插槽【头顶光圈】的第一个挂件
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     let ring = myCharacter.description.advance.slotAndDecoration.slot[HumanoidSlotType.Rings].decoration[0].attachmentGameObject;
         *                     if(ring) {
         *                         myCharacter.description.advance.slotAndDecoration.slot[HumanoidSlotType.Rings].decoration.delete(ring, true);
         *                     }
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，删除角色插槽【头顶光圈】的所有挂件
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
         *                     myCharacter.description.advance.slotAndDecoration.slot[HumanoidSlotType.Rings].decoration.clear(true);
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        clear(isDestroy?: boolean): void;
    }
}

declare namespace mw {
    /**
     * @author jun.zhang
     * @groups 角色系统
     * @description 外观属性的 Morph 和 Bone 换装项的枚举
     */
    enum CharacterFeatureType {
        /** 头部左右缩放 */
        HeadHorizontalScale = 1,
        /** 上半脸前后移动 */
        UpperFaceFrontalShift = 2,
        /** 上半脸上下移动 */
        UpperFaceVerticalShift = 3,
        /** 上半脸整体缩放 */
        UpperFaceOverallScale = 4,
        /** 下半脸前后移动 */
        LowerFaceFrontalShift = 5,
        /** 下半脸左右缩放 */
        LowerFaceHorizontalScale = 6,
        /** 耳朵整体缩放 */
        EarOverallScale = 7,
        /** 耳朵左右旋转 */
        EarHorizontalRotation = 8,
        /** 耳朵前后旋转 */
        EarFrontalRotation = 9,
        /** 耳朵上部缩放 */
        EarUpperScale = 10,
        /** 耳朵下部缩放 */
        EarLowerScale = 11,
        /** 下颌圆度 */
        JawlineRoundness = 12,
        /** 下颌前后移动 */
        JawFrontalShift = 13,
        /** 下颌上下移动 */
        JawlineVerticalShift = 14,
        /** 下颌左右缩放 */
        JawHorizontalScale = 15,
        /** 下巴前后移动 */
        ChinFrontalShift = 16,
        /** 下巴尖上下移动 */
        ChinTipVerticalShift = 17,
        /** 下巴尖前后移动 */
        ChinTipFrontalShift = 18,
        /** 下巴尖左右缩放 */
        ChinTipHorizontalScale = 19,
        /** 颧骨左右缩放 */
        CheekboneHorizontalScale = 20,
        /** 颧骨前后移动 */
        CheekboneFrontalShift = 21,
        /** 脸颊左右缩放 */
        CheekHorizontalScale = 22,
        /** 脸颊前后移动 */
        CheekFrontalShift = 23,
        /** 脸颊上下移动 */
        CheekVerticalShift = 24,
        /** 眉毛上下移动 */
        EyebrowVerticalShift = 25,
        /** 眉毛左右移动 */
        EyebrowHorizontalShift = 26,
        /** 眉毛整体旋转 */
        EyebrowOverallRotation = 27,
        /** 眉头上下移动 */
        EyebrowInnerVerticalShift = 28,
        /** 眉尾上下移动 */
        EyebrowOuterVerticalShift = 29,
        /** 眼睛上下移动 */
        EyeVerticalShift = 30,
        /** 眼睛左右移动 */
        EyeHorizontalShift = 31,
        /** 眼睛前后移动 */
        EyeFrontalShift = 32,
        /** 眼睛整体旋转 */
        EyeOverallRotation = 33,
        /** 眼睛上下缩放 */
        EyeVerticalScale = 34,
        /** 眼睛左右缩放 */
        EyeHorizontalScale = 35,
        /** 内眼角左右移动 */
        InnerEyeCornerHorizontalShift = 36,
        /** 外眼角上下移动 */
        OuterEyeCornerVerticalShift = 37,
        /** 瞳孔左右移动 */
        PupilHorizontalShift = 38,
        /** 瞳孔上下移动 */
        PupilVerticalShift = 39,
        /** 瞳孔左右缩放 */
        PupilHorizontalScale = 40,
        /** 瞳孔上下缩放 */
        PupilVerticalScale = 41,
        /** 鼻子整体前后移动 */
        NoseOverallFrontalShift = 42,
        /** 鼻尖上下移动 */
        NoseTipVerticalShift = 43,
        /** 鼻梁前后移动 */
        NoseBridgeFrontalShift = 44,
        /** 嘴巴上下移动 */
        MouthVerticalShift = 45,
        /** 嘴巴前后移动 */
        MouthFrontalShift = 46,
        /** 嘴巴左右缩放 */
        MouthHorizontalScale = 47,
        /** 上嘴唇薄厚 */
        UpperLipThickness = 48,
        /** 下嘴唇薄厚 */
        LowerLipThickness = 49,
        /** 嘴角上下移动 */
        MouthCornerVerticalShift = 50,
        /** 身高 */
        Height = 51,
        /** 头部整体缩放 */
        HeadOverallScale = 52,
        /** 胸部整体缩放 */
        BreastOverallScale = 53,
        /** 胸部上下移动 */
        BreastVerticalShift = 54,
        /** 胸部左右移动 */
        BreastHorizontalShift = 56,
        /** 胸部长度 */
        BreastLength = 58,
        /** 脖子左右缩放 */
        NeckHorizontalScale = 59,
        /** 脖子前后缩放 */
        NeckFrontalScale = 60,
        /** 胸腔左右缩放 */
        ChestHorizontalScale = 61,
        /** 胸腔前后缩放 */
        ChestFrontalScale = 62,
        /** 肋骨左右缩放 */
        RibHorizontalScale = 63,
        /** 肋骨前后缩放 */
        RibFrontalScale = 64,
        /** 腰部左右缩放 */
        WaistHorizontalScale = 65,
        /** 腰部前后缩放 */
        WaistFrontalScale = 66,
        /** 脖子上下缩放 */
        NeckVerticalScale = 67,
        /** 胸腔上下缩放 */
        ChestVerticalScale = 68,
        /** 腰部上下缩放 */
        WaistVerticalScale = 69,
        /** 胯左右缩放 */
        HipHorizontalScale = 70,
        /** 胯前后缩放 */
        HipFrontalScale = 71,
        /** 肩臂左右缩放 */
        ShoulderHorizontalScale = 72,
        /** 肩臂前后缩放 */
        ShoulderFrontalScale = 73,
        /** 大臂左右缩放 */
        UpperArmHorizontalScale = 74,
        /** 大臂前后缩放 */
        UpperArmFrontalScale = 75,
        /** 小臂左右缩放 */
        ForearmHorizontalScale = 76,
        /** 小臂前后缩放 */
        ForearmFrontalScale = 77,
        /** 大臂上下缩放 */
        UpperArmVerticalScale = 78,
        /** 小臂上下缩放 */
        ForearmVerticalScale = 79,
        /** 大腿上下缩放 */
        ThighVerticalScale = 80,
        /** 小腿上下缩放 */
        CalfVerticalScale = 81,
        /** 大腿左右缩放 */
        ThighHorizontalScale = 82,
        /** 大腿前后缩放 */
        ThighFrontalScale = 83,
        /** 小腿前后缩放 */
        CalfFrontalScale = 84,
        /** 小腿左右缩放 */
        CalfHorizontalScale = 85,
        /** 手整体缩放 */
        HandOverallScale = 199,
        /** 脚整体缩放 */
        FeetOverallScale = 200,
        /** 面部左右缩放 */
        FaceHorizontalScale = 210,
        /** 眉毛前后移动 */
        EyebrowFrontalShift = 211,
        /** 眉间前后移动 */
        EyebrowBridgeFrontalShift = 212,
        /** 鼻子整体上下移动 */
        NoseOverallVerticalShift = 213,
        /** 鼻梁左右缩放 */
        NoseBridgeHorizontalScale = 214,
        /** 鼻翼前后移动 */
        NostrilForntalShift = 215,
        /** 鼻翼上下移动 */
        NostrilVerticalShift = 216,
        /** 鼻翼左右缩放 */
        NostrilHorizontalScale = 217,
        /** 嘴角前后移动 */
        MouthCornerFrontalShift = 218
    }
}

declare namespace mw {
    /**
     * @author guang.deng
     * @groups 角色系统/角色
     * @description 人形外观配置
     * @description -------------------------------------------------------------------------
     * @description 什么是 CharacterDescription 呢？
     * @description - 它是一个用于存储 advance 和 base 配置的 Character 描述。
     * @description - 人形外观分为高级人形和基础人形。高级人形可更改人物的服装（衬衫、裤子、裙子...)、头部（脸型、嘴巴、鼻子、头发...）等外观； 基础人形是一个整体的形象，可从左侧角色/NPC中基础人形形象中选择你喜欢的资源。
     * @description CharacterDescription 如何使用呢？
     * @description - 本质是一个嵌套的只读对象类型，用于存储一些角色设置的高级信息。这些信息按照层级结构进行组织，其中每个层级都是一个只读对象类型。
     * @description - 在 Character 类中有一个名为 description 的属性，他的返回值类型为 CharacterDescription ，使用角色类中 description 的属性调用。
     * @description - 编辑器为您提供了大量的美术模型资源，请在左侧栏自助翻找，标有GUID供你使用。
     * @description 详情可参考下面列出的参数，开始对你的人性外观自定义修改吧~
     * @networkStatus usage:双端
     */
    class CharacterDescription {
        /**
        * @groups 角色系统/角色
        * @description 高级人形对象外观配置类
        * @description 高级人形之所以称为高级，原因是有很多可自定义部分。
        * @description 1. 基础(base)部分
        * @description - 可更改角色 characterTemplate ，有八种类型（二次元男性、女性；lowpoly男性、女性；写实男性、女性；美卡男性、女性）
        * @description - 更换体型 somatotype
        * @example
        * 使用示例: 点击 P 键切换角色
        * ```ts
        * protected onStart(): void {
        *     InputUtil.onKeyDown(Keys.P,()=>{
        *         Player.localPlayer.character.description.advance.base.characterSetting.characterTemplate = CharacterTemplate.CartoonyMale;
        *     })
        * }
        * ```
        * @description 2. 头部(headFeatures)部分
        * @description 脸部在游戏中有很多用途。它可以让你个性化你的角色，就像在现实生活中一样定制你的外貌。你可以调整脸型、眼睛、嘴巴和其他特征，使你的角色与众不同，塑造一个与你自己身份和想象相符的角色，展示你独一无二的样貌。
        * @description 注：脸型、眉毛、眼睛等为一级；例如脸型二级还可再细化，分为：颧骨、脸颊、下颌、下巴等。三级调整其上下左右位置等参数。下面一样。
        * @description 3. 身材(bodyFeatures)部分
        * @description 调整角色身材可以影响到角色的能力和特点。在一些角色扮演游戏中，身材的不同可能会影响到角色的速度、力量、耐力等属性。比如，一个高大的角色可能更具有威慑力和力量，而一个敏捷的角色可能更擅长于迅速移动和躲避攻击。通过调整角色的身材，你可以根据自己的游戏策略和喜好来优化角色的能力和特点，使其更符合你的游戏风格。
        * @description 4. 化妆(makeup)部分
        * @description 化妆可以让你的角色更加美丽或者独特。你可以选择不同的化妆风格，如浓妆、淡妆、霓虹风、恶魔风等，根据自己的喜好和创意来设计角色的妆容。这样的个性化定制能够让你的角色在游戏世界中脱颖而出，成为其他玩家眼中的焦点。
        * @description 5. 发型(hair)部分
        * @description 一个毛刺的蓝色发型可以表达出叛逆和冒险的个性，而一个典雅的束发则展现出优雅和自信。
        * @description 6. 装扮(clothing)部分
        * @description 选择不同的服装风格和配饰，你可以塑造出独特的角色形象。无论是时尚潮流、古典优雅还是奇幻冒险，你可以根据自己的喜好和创意来打造角色的时尚造型。
        * @description 7. 插槽(clothing)部分
        * @example
        * 使用示例: 以不同方式设置角色外观，清空外观，同步外观。外观切换完成时播放换装特效。判断外观是否加载完成播放对应动画。
        * ```
        * @Component
        * export default class CharacterStyleExample extends Script {
        *     protected onStart(): void {
        *         // 下列代码仅在客户端执行
        *         if(SystemUtil.isClient()) {
        *             // 获取当前客户端玩家
        *             let myPlayer = Player.localPlayer;
        *             // 获取玩家控制角色
        *             let myCharacter = myPlayer.character;
        *             // 如果玩家外观准备完成挥手，反之摊手
        *             if(myCharacter.isDescriptionReady) {
        *                 let animation = myCharacter.loadAnimation("35391");
        *                 animation.play();
        *             } else {
        *                 let animation = myCharacter.loadAnimation("14521");
        *                 animation.play();
        *             }
        *             let defaultStyle = null;
        *             // 给【角色换装完成】委托添加函数
        *             myCharacter.onDescriptionComplete.add(() => {
        *                 // 播放换装完成特效
        *                 EffectService.playOnGameObject("161245", myCharacter, {slotType: HumanoidSlotType.Root});
        *                 // 获取角色默认外观风格
        *                 defaultStyle = myCharacter.getDescription();
        *             });
        *             // 添加一个按键方法:按下键盘“1”，重置为默认角色外观
        *             InputUtil.onKeyDown(Keys.One, () => {
        *                 myCharacter.setDescription(defaultStyle);
        *             });
        *             // 添加一个按键方法:按下键盘“2”，修改角色外观
        *             InputUtil.onKeyDown(Keys.Two, () => {
        *                 if(myCharacter.characterType == CharacterType.HumanoidV2) {
        *                     // 头部:头大小为1.5倍
        *                     myCharacter.description.advance.headFeatures.head.headOverallScale = 1.5;
        *                     // 体型:身高为1.2倍
        *                     myCharacter.description.advance.bodyFeatures.body.height = 1.2;
        *                     // 腮红为75674
        *                     myCharacter.description.advance.makeup.blush.blushStyle = "75674";
        *                     // 前发为57731，后发为63910
        *                     myCharacter.description.advance.hair.frontHair.style = "57731";
        *                     myCharacter.description.advance.hair.backHair.style = "63910";
        *                     // 上衣为58694，下衣为58700，手套为60384，鞋子为58696
        *                     myCharacter.description.advance.clothing.upperCloth.style = "58694";
        *                     myCharacter.description.advance.clothing.lowerCloth.style = "58700";
        *                     myCharacter.description.advance.clothing.gloves.style = "60384";
        *                     myCharacter.description.advance.clothing.shoes.style = "58696";
        *                 }
        *             });
        *             // 添加一个按键方法:按下键盘“3”，同步角色外观
        *             InputUtil.onKeyDown(Keys.Three, () => {
        *                 myCharacter.syncDescription();
        *             });
        *             // 添加一个按键方法:按下键盘“4”，清空角色外观
        *             InputUtil.onKeyDown(Keys.Four, () => {
        *                 myCharacter.clearDescription();
        *             });
        *         }
        *     }
        * }
        * ```
        */
        readonly advance?: {
            /** @description: 头部相关 */
            readonly headFeatures?: {
                /** @description: 头部 */
                readonly head?: {
                    /** @description: 样式 */
                    style?: string;
                    /** @description: 头部左右缩放 */
                    headHorizontalScale?: number;
                    /** @description: 头部整体缩放 */
                    headOverallScale?: number;
                    /** @description: 主贴图 */
                    readonly baseColorTexture?: ArrayLike<string>;
                };
                /** @description: 脸型 */
                readonly faceShape?: {
                    /** @description: 整体 */
                    readonly overall?: {
                        /** @description: 上半脸前后移动 */
                        upperFaceFrontalShift?: number;
                        /** @description: 上半脸上下移动 */
                        upperFaceVerticalShift?: number;
                        /** @description: 上半脸整体缩放 */
                        upperFaceOverallScale?: number;
                        /** @description: 下半脸前后移动 */
                        lowerFaceFrontalShift?: number;
                        /** @description: 下半脸左右缩放 */
                        lowerFaceHorizontalScale?: number;
                        /** @description: 面部左右缩放 */
                        faceHorizontalScale?: number;
                    };
                    /** @description: 下颌 */
                    readonly jawline?: {
                        /** @description: 下颌圆度 */
                        jawlineRoundness?: number;
                        /** @description: 下颌前后移动 */
                        jawFrontalShift?: number;
                        /** @description: 下颌上下移动 */
                        jawlineVerticalShift?: number;
                        /** @description: 下颌左右缩放 */
                        jawHorizontalScale?: number;
                    };
                    /** @description: 下巴 */
                    readonly chin?: {
                        /** @description: 下巴前后移动 */
                        chinFrontalShift?: number;
                        /** @description: 下巴尖上下移动 */
                        chinTipVerticalShift?: number;
                        /** @description: 下巴尖前后移动 */
                        chinTipFrontalShift?: number;
                        /** @description: 下巴尖左右缩放 */
                        chinTipHorizontalScale?: number;
                    };
                    /** @description: 颧骨 */
                    readonly cheekbone?: {
                        /** @description: 颧骨左右缩放 */
                        cheekboneHorizontalScale?: number;
                        /** @description: 颧骨前后移动 */
                        cheekboneFrontalShift?: number;
                    };
                    /** @description: 脸颊 */
                    readonly cheek?: {
                        /** @description: 脸颊左右缩放 */
                        cheekHorizontalScale?: number;
                        /** @description: 脸颊前后移动 */
                        cheekFrontalShift?: number;
                        /** @description: 脸颊上下移动 */
                        cheekVerticalShift?: number;
                    };
                };
                /** @description: 耳朵 */
                readonly ears?: {
                    /** @description: 耳朵整体缩放 */
                    earOverallScale?: number;
                    /** @description: 耳朵左右旋转 */
                    earHorizontalRotation?: number;
                    /** @description: 耳朵前后旋转 */
                    earFrontalRotation?: number;
                    /** @description: 耳朵上部缩放 */
                    earUpperScale?: number;
                    /** @description: 耳朵下部缩放 */
                    earLowerScale?: number;
                };
                /** @description: 眉毛 */
                readonly eyebrows?: {
                    /** @description: 眉毛上下移动 */
                    eyebrowVerticalShift?: number;
                    /** @description: 眉毛左右移动 */
                    eyebrowHorizontalShift?: number;
                    /** @description: 眉毛整体旋转 */
                    eyebrowOverallRotation?: number;
                    /** @description: 眉头上下移动 */
                    eyebrowInnerVerticalShift?: number;
                    /** @description: 眉尾上下移动 */
                    eyebrowOuterVerticalShift?: number;
                    /** @description: 眉毛前后移动 */
                    eyebrowFrontalShift?: number;
                    /** @description: 眉间前后移动 */
                    eyebrowBridgeFrontalShift?: number;
                };
                /** @description: 眼睛 */
                readonly eyes?: {
                    /** @description: 整体 */
                    readonly overall?: {
                        /** @description: 眼睛上下移动 */
                        eyeVerticalShift?: number;
                        /** @description: 眼睛左右移动 */
                        eyeHorizontalShift?: number;
                        /** @description: 眼睛前后移动 */
                        eyeFrontalShift?: number;
                        /** @description: 眼睛整体旋转 */
                        eyeOverallRotation?: number;
                        /** @description: 眼睛上下缩放 */
                        eyeVerticalScale?: number;
                        /** @description: 眼睛左右缩放 */
                        eyeHorizontalScale?: number;
                    };
                    /** @description: 眼角 */
                    readonly eyeCorners?: {
                        /** @description: 眼角左右移动 */
                        innerEyeCornerHorizontalShift?: number;
                        /** @description: 眼角上下移动 */
                        outerEyeCornerVerticalShift?: number;
                    };
                    /** @description: 瞳孔 */
                    readonly pupils?: {
                        /** @description: 瞳孔左右移动 */
                        pupilHorizontalShift?: number;
                        /** @description: 瞳孔上下移动 */
                        pupilVerticalShift?: number;
                        /** @description: 瞳孔左右缩放 */
                        pupilHorizontalScale?: number;
                        /** @description: 瞳孔上下缩放 */
                        pupilVerticalScale?: number;
                    };
                };
                /** @description: 鼻子 */
                readonly nose?: {
                    /** @description: 整体 */
                    readonly overall?: {
                        /** @description: 鼻子整体前后移动 */
                        noseOverallFrontalShift?: number;
                        /** @description: 鼻子整体上下移动 */
                        noseOverallVerticalShift?: number;
                    };
                    /** @description: 鼻尖 */
                    readonly noseTip?: {
                        /** @description: 鼻尖上下移动 */
                        noseTipVerticalShift?: number;
                    };
                    /** @description: 鼻梁 */
                    readonly noseBridge?: {
                        /** @description: 鼻梁前后移动 */
                        noseBridgeFrontalShift?: number;
                        /** @description: 鼻梁左右缩放 */
                        noseBridgeHorizontalScale?: number;
                    };
                    /** @description: 鼻翼 */
                    readonly nostrils?: {
                        /** @description: 鼻翼前后移动 */
                        nostrilForntalShift?: number;
                        /** @description: 鼻翼上下移动 */
                        nostrilVerticalShift?: number;
                        /** @description: 鼻翼左右缩放 */
                        nostrilHorizontalScale?: number;
                    };
                };
                /** @description: 嘴 */
                readonly mouth?: {
                    /** @description: 整体 */
                    readonly overall?: {
                        /** @description: 嘴巴上下移动 */
                        mouthVerticalShift?: number;
                        /** @description: 嘴巴前后移动 */
                        mouthFrontalShift?: number;
                        /** @description: 嘴巴左右缩放 */
                        mouthHorizontalScale?: number;
                    };
                    /** @description: 嘴唇 */
                    readonly lips?: {
                        /** @description: 上嘴唇薄厚 */
                        upperLipThickness?: number;
                        /** @description: 下嘴唇薄厚 */
                        lowerLipThickness?: number;
                    };
                    /** @description: 嘴角 */
                    readonly mouthCorners?: {
                        /** @description: 嘴角上下移动 */
                        mouthCornerVerticalShift?: number;
                        /** @description: 嘴角前后移动 */
                        mouthCornerFrontalShift?: number;
                    };
                };
                /** @description: 表情 */
                readonly expressions?: {
                    /** @description: 切换表情 */
                    changeExpression?: mw.ExpressionType;
                };
            };
            /** @description: 身体相关 */
            readonly bodyFeatures?: {
                /** @description: 身体 */
                readonly body?: {
                    /** @description: 身高 */
                    height?: number;
                };
                /** @description: 胸部 */
                readonly breast?: {
                    /** @description: 胸部整体缩放 */
                    breastOverallScale?: number;
                    /** @description: 胸部上下移动 */
                    breastVerticalShift?: number;
                    /** @description: 胸部左右移动 */
                    breastHorizontalShift?: number;
                    /** @description: 胸部长度 */
                    breastLength?: number;
                };
                /** @description: 脖子 */
                readonly neck?: {
                    /** @description: 脖子左右缩放 */
                    neckHorizontalScale?: number;
                    /** @description: 脖子前后缩放 */
                    neckFrontalScale?: number;
                    /** @description: 脖子上下缩放 */
                    neckVerticalScale?: number;
                };
                /** @description: 胸腔 */
                readonly chest?: {
                    /** @description: 胸腔左右缩放 */
                    chestHorizontalScale?: number;
                    /** @description: 胸腔前后缩放 */
                    chestFrontalScale?: number;
                    /** @description: 胸腔上下缩放 */
                    chestVerticalScale?: number;
                };
                /** @description: 肋部 */
                readonly ribs?: {
                    /** @description: 肋部左右缩放 */
                    ribHorizontalScale?: number;
                    /** @description: 肋部前后缩放 */
                    ribFrontalScale?: number;
                };
                /** @description: 腰 */
                readonly waist?: {
                    /** @description: 腰部左右缩放 */
                    waistHorizontalScale?: number;
                    /** @description: 腰部前后缩放 */
                    waistFrontalScale?: number;
                    /** @description: 腰部上下缩放 */
                    waistVerticalScale?: number;
                };
                /** @description: 胯 */
                readonly hips?: {
                    /** @description: 胯左右缩放 */
                    hipHorizontalScale?: number;
                    /** @description: 胯前后缩放 */
                    hipFrontalScale?: number;
                };
                /** @description: 手臂 */
                readonly arms?: {
                    /** @description: 肩臂左右缩放 */
                    shoulderHorizontalScale?: number;
                    /** @description: 肩臂前后缩放 */
                    shoulderFrontalScale?: number;
                    /** @description: 大臂左右缩放 */
                    upperArmHorizontalScale?: number;
                    /** @description: 大臂前后缩放 */
                    upperArmFrontalScale?: number;
                    /** @description: 小臂左右缩放 */
                    forearmHorizontalScale?: number;
                    /** @description: 小臂前后缩放 */
                    forearmFrontalScale?: number;
                    /** @description: 大臂上下缩放 */
                    upperArmVerticalScale?: number;
                    /** @description: 小臂上下缩放 */
                    forearmVerticalScale?: number;
                };
                /** @description: 腿 */
                readonly legs?: {
                    /** @description: 大腿上下缩放 */
                    thighVerticalScale?: number;
                    /** @description: 小腿上下缩放 */
                    calfVerticalScale?: number;
                    /** @description: 大腿左右缩放 */
                    thighHorizontalScale?: number;
                    /** @description: 大腿前后缩放 */
                    thighFrontalScale?: number;
                    /** @description: 小腿前后缩放 */
                    calfFrontalScale?: number;
                    /** @description: 小腿左右缩放 */
                    calfHorizontalScale?: number;
                };
                /** @description: 手 */
                readonly hands?: {
                    /** @description: 手整体缩放 */
                    handOverallScale?: number;
                };
                /** @description: 脚 */
                readonly feet?: {
                    /** @description: 脚整体缩放 */
                    feetOverallScale?: number;
                };
            };
            /** @description: 装扮相关 */
            readonly clothing?: {
                /** @description: 上装 */
                readonly upperCloth?: {
                    /** @description: 样式 */
                    style?: string;
                    /** @description: 调整区域 */
                    readonly part?: ArrayLike<{
                        /** @description: 颜色 */
                        readonly color?: {
                            /** @description: 区域颜色 */
                            areaColor?: string | mw.LinearColor;
                        };
                        /** @description: 纹理 */
                        readonly pattern?: {
                            /** @description: 纹理样式 */
                            patternStyle?: string;
                            /** @description: 纹理颜色 */
                            patternColor?: string | mw.LinearColor;
                            /** @description: 纹理左右缩放 */
                            patternHorizontalScale?: number;
                            /** @description: 纹理上下缩放 */
                            patternVerticalScale?: number;
                            /** @description: 纹理整体旋转 */
                            patternRotation?: number;
                            /** @description: 纹理显示程度 */
                            patternVisibility?: number;
                        };
                        /** @description: 图案 */
                        readonly design?: {
                            /** @description: 设计图案样式 */
                            designStyle?: string;
                            /** @description: 设计图案颜色 */
                            designColor?: string | mw.LinearColor;
                            /** @description: 设计图案旋转 */
                            designRotation?: number;
                        };
                    }>;
                    /** @description: 主贴图 */
                    readonly baseColorTexture?: ArrayLike<string>;
                };
                /** @description: 下装 */
                readonly lowerCloth?: {
                    /** @description: 样式 */
                    style?: string;
                    /** @description: 调整区域 */
                    readonly part?: ArrayLike<{
                        /** @description: 颜色 */
                        readonly color?: {
                            /** @description: 区域颜色 */
                            areaColor?: string | mw.LinearColor;
                        };
                        /** @description: 纹理 */
                        readonly pattern?: {
                            /** @description: 纹理样式 */
                            patternStyle?: string;
                            /** @description: 纹理颜色 */
                            patternColor?: string | mw.LinearColor;
                            /** @description: 纹理左右缩放 */
                            patternHorizontalScale?: number;
                            /** @description: 纹理上下缩放 */
                            patternVerticalScale?: number;
                            /** @description: 纹理旋转 */
                            patternRotation?: number;
                            /** @description: 纹理显示程度 */
                            patternVisibility?: number;
                        };
                        /** @description: 图案 */
                        readonly design?: {
                            /** @description: 设计图案样式 */
                            designStyle?: string;
                            /** @description: 设计图案颜色 */
                            designColor?: string | mw.LinearColor;
                            /** @description: 设计图案旋转 */
                            designRotation?: number;
                        };
                    }>;
                    /** @description: 主贴图 */
                    readonly baseColorTexture?: ArrayLike<string>;
                };
                /** @description: 手套 */
                readonly gloves?: {
                    /** @description: 样式 */
                    style?: string;
                    /** @description: 调整区域 */
                    readonly part?: ArrayLike<{
                        /** @description: 颜色 */
                        readonly color?: {
                            /** @description: 区域颜色 */
                            areaColor?: string | mw.LinearColor;
                        };
                        /** @description: 纹理 */
                        readonly pattern?: {
                            /** @description: 纹理样式 */
                            patternStyle?: string;
                            /** @description: 纹理颜色 */
                            patternColor?: string | mw.LinearColor;
                            /** @description: 纹理左右缩放 */
                            patternHorizontalScale?: number;
                            /** @description: 纹理上下缩放 */
                            patternVerticalScale?: number;
                            /** @description: 纹理旋转 */
                            patternRotation?: number;
                            /** @description: 纹理显示程度 */
                            patternVisibility?: number;
                        };
                        /** @description: 图案 */
                        readonly design?: {
                            /** @description: 设计图案样式 */
                            designStyle?: string;
                            /** @description: 设计图案颜色 */
                            designColor?: string | mw.LinearColor;
                            /** @description: 设计图案旋转 */
                            designRotation?: number;
                        };
                    }>;
                    /** @description: 主贴图 */
                    readonly baseColorTexture?: ArrayLike<string>;
                };
                /** @description: 鞋 */
                readonly shoes?: {
                    /** @description: 样式 */
                    style?: string;
                    /** @description: 调整区域 */
                    readonly part?: ArrayLike<{
                        /** @description: 颜色 */
                        readonly color?: {
                            /** @description: 区域颜色 */
                            areaColor?: string | mw.LinearColor;
                        };
                        /** @description: 纹理 */
                        readonly pattern?: {
                            /** @description: 纹理样式 */
                            patternStyle?: string;
                            /** @description: 纹理颜色 */
                            patternColor?: string | mw.LinearColor;
                            /** @description: 纹理左右缩放 */
                            patternHorizontalScale?: number;
                            /** @description: 纹理上下缩放 */
                            patternVerticalScale?: number;
                            /** @description: 纹理旋转 */
                            patternRotation?: number;
                            /** @description: 纹理显示程度 */
                            patternVisibility?: number;
                        };
                        /** @description: 图案 */
                        readonly design?: {
                            /** @description: 设计图案样式 */
                            designStyle?: string;
                            /** @description: 设计图案颜色 */
                            designColor?: string | mw.LinearColor;
                            /** @description: 设计图案旋转 */
                            designRotation?: number;
                        };
                    }>;
                    /** @description: 主贴图 */
                    readonly baseColorTexture?: ArrayLike<string>;
                };
            };
            /** @description: 化妆 */
            readonly makeup?: {
                /** @description: 眉毛 */
                readonly eyebrows?: {
                    /** @description: 眉毛样式 */
                    eyebrowStyle?: string;
                    /** @description: 眉毛颜色 */
                    eyebrowColor?: string | mw.LinearColor;
                };
                /** @description: 美瞳 */
                readonly coloredContacts?: {
                    /** @description: 样式 */
                    readonly style?: {
                        /** @description: 瞳孔样式 */
                        pupilStyle?: string;
                        /** @deprecated @description: 瞳孔颜色 */
                        pupilColor?: string | mw.LinearColor;
                        /** @description: 左瞳孔颜色 */
                        leftPupilColor?: string | mw.LinearColor;
                        /** @description: 右瞳孔颜色 */
                        rightPupilColor?: string | mw.LinearColor;
                    };
                    /** @description: 高光 */
                    readonly highlight?: {
                        /** @description: 上高光样式 */
                        upperHighlightStyle?: string;
                        /** @description: 上高光颜色 */
                        upperHighlightColor?: string | mw.LinearColor;
                        /** @description: 下高光样式 */
                        lowerHighlightStyle?: string;
                        /** @description: 下高光颜色 */
                        lowerHighlightColor?: string | mw.LinearColor;
                    };
                    /** @description: 贴花 */
                    readonly decal?: {
                        /** @description: 瞳孔样式 */
                        pupilStyle?: string;
                        /** @description: 贴花左右移动 */
                        pupilHorizontalPosition?: number;
                        /** @description: 贴花上下移动 */
                        pupilVerticalPosition?: number;
                        /** @description: 贴花大小缩放 */
                        pupilSizeScale?: number;
                        /** @description: 贴花颜色 */
                        pupilColor?: string | mw.LinearColor;
                    };
                };
                /** @description: 睫毛 */
                readonly eyelashes?: {
                    /** @description: 睫毛样式 */
                    eyelashStyle?: string;
                    /** @description: 睫毛颜色 */
                    eyelashColor?: string | mw.LinearColor;
                };
                /** @description: 眼影 */
                readonly eyeShadow?: {
                    /** @description: 眼影样式 */
                    eyeshadowStyle?: string;
                    /** @description: 眼影颜色 */
                    eyeshaowColor?: string | mw.LinearColor;
                };
                /** @description: 腮红 */
                readonly blush?: {
                    /** @description: 腮红样式 */
                    blushStyle?: string;
                    /** @description: 腮红颜色 */
                    blushColor?: string | mw.LinearColor;
                };
                /** @description: 口红 */
                readonly lipstick?: {
                    /** @description: 口红样式 */
                    lipstickStyle?: string;
                    /** @description: 口红颜色 */
                    lipstickColor?: string | mw.LinearColor;
                };
                /** @description: 脸部贴花 */
                readonly faceDecal?: ArrayLike<{
                    /** @description: 贴花样式 */
                    decalStyle?: string;
                    /** @description: 贴花左右移动 */
                    decalHorizontalShift?: number;
                    /** @description: 贴花上下移动 */
                    decalVerticalShift?: number;
                    /** @description: 贴花整体旋转 */
                    decalOverallRotation?: number;
                    /** @description: 贴花整体缩放 */
                    decalOverallScale?: number;
                    /** @description: 贴花颜色 */
                    decalColor?: string | mw.LinearColor;
                }>;
                /** @description: 肤色 */
                readonly skinTone?: {
                    /** @description: 肌肤颜色 */
                    skinColor?: string | mw.LinearColor;
                };
                /** @description: 身体贴花 */
                readonly bodyDecal?: ArrayLike<{
                    /** @description: 贴花左右移动 */
                    decalHorizontalShift?: number;
                    /** @description: 贴花上下移动 */
                    decalVerticalShift?: number;
                    /** @description: 贴花样式 */
                    decalStyle?: string;
                    /** @description: 贴花颜色 */
                    decalColor?: string | mw.LinearColor;
                    /** @description: 贴花整体旋转 */
                    decalOverallRotation?: number;
                    /** @description: 贴花整体缩放 */
                    decalOverallScale?: number;
                }>;
                /** @description: 头部贴花 */
                readonly headDecal?: {
                    /** @description: 贴花颜色 */
                    decalColor?: string | mw.LinearColor;
                    /** @description: 贴花样式 */
                    decalStyle?: string;
                };
            };
            /** @description: 发型相关 */
            readonly hair?: {
                /** @description: 前发 */
                readonly frontHair?: {
                    /** @description: 样式 */
                    style?: string;
                    /** @description: 颜色 */
                    readonly color?: {
                        /** @description: 颜色 */
                        color?: string | mw.LinearColor;
                        /** @description: 渐变颜色 */
                        gradientColor?: string | mw.LinearColor;
                        /** @description: 渐变区域 */
                        gradientArea?: number;
                    };
                    /** @description: 高光 */
                    readonly highlight?: {
                        /** @description: 高光样式 */
                        highlightStyle?: string;
                    };
                    /** @description: 头饰 */
                    readonly accessories?: ArrayLike<{
                        /** @description: 前发颜色 */
                        readonly color?: {
                            /** @description: 前发颜色 */
                            accessoryColor?: string | mw.LinearColor;
                        };
                        /** @description: 纹理 */
                        readonly pattern?: {
                            /** @description: 纹理样式 */
                            patternStyle?: string;
                            /** @description: 纹理颜色 */
                            patternColor?: string | mw.LinearColor;
                            /** @description: 纹理左右缩放 */
                            patternHorizontalScale?: number;
                            /** @description: 纹理上下缩放 */
                            patternVerticalScale?: number;
                            /** @description: 纹理旋转 */
                            patternRotation?: number;
                            /** @description: 纹理显示程度 */
                            patternVisibility?: number;
                        };
                        /** @description: 图案 */
                        readonly design?: {
                            /** @description: 设计图案样式 */
                            designStyle?: string;
                            /** @description: 设计图案颜色 */
                            designColor?: string | mw.LinearColor;
                            /** @description: 设计图案旋转 */
                            designRotation?: number;
                            /** @description: 设计图案缩放 */
                            designScale?: number;
                        };
                    }>;
                    /** @description: 主贴图 */
                    readonly baseColorTexture?: ArrayLike<string>;
                };
                /** @description: 后发 */
                readonly backHair?: {
                    /** @description: 后发样式 */
                    style?: string;
                    /** @description: 颜色 */
                    readonly color?: {
                        /** @description: 后发颜色 */
                        color?: string | mw.LinearColor;
                        /** @description: 渐变颜色 */
                        gradientColor?: string | mw.LinearColor;
                        /** @description: 渐变区域 */
                        gradientArea?: number;
                    };
                    /** @description: 高光 */
                    readonly highlight?: {
                        /** @description: 高光样式 */
                        highlightStyle?: string;
                    };
                    /** @description: 头饰 */
                    readonly accessories?: ArrayLike<{
                        /** @description: 颜色 */
                        readonly color?: {
                            /** @description: 头饰颜色 */
                            accessoryColor?: string | mw.LinearColor;
                        };
                        /** @description: 纹理 */
                        readonly pattern?: {
                            /** @description: 纹理样式 */
                            patternStyle?: string;
                            /** @description: 纹理颜色 */
                            patternColor?: string | mw.LinearColor;
                            /** @description: 纹理左右缩放 */
                            patternHorizontalScale?: number;
                            /** @description: 纹理上下缩放 */
                            patternVerticalScale?: number;
                            /** @description: 纹理旋转 */
                            patternRotation?: number;
                            /** @description: 纹理显示程度 */
                            patternVisibility?: number;
                        };
                        /** @description: 图案 */
                        readonly design?: {
                            /** @description: 设计图案样式 */
                            designStyle?: string;
                            /** @description: 设计图案颜色 */
                            designColor?: string | mw.LinearColor;
                            /** @description: 设计图案旋转 */
                            designRotation?: number;
                            /** @description: 设计图案缩放 */
                            designScale?: number;
                        };
                    }>;
                    /** @description: 主贴图 */
                    readonly baseColorTexture?: ArrayLike<string>;
                };
            };
            /** @description: 基础 */
            readonly base?: {
                /** @description: 角色设定 */
                readonly characterSetting?: {
                    /** @description: 切换体型 */
                    somatotype?: mw.SomatotypeV2;
                    /**
                     * @description: 基础脸型
                     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:033 reason:功能迁移 replacement: 换头功能
                     */
                    faceStyle?: mw.FaceStyle;
                    /** @description: 切换角色,配置中优先执行 */
                    characterTemplate?: mw.CharacterTemplate;
                };
            };
            /**
             * 插槽和物品
             */
            readonly slotAndDecoration?: {
                /**
                 * @description 插槽数据
                 */
                readonly slot: ArrayLike<{
                    /**
                     * 插槽相对信息
                     */
                    readonly slotOffset?: Readonly<mw.Transform>;
                    /**
                     * 物品信息
                     */
                    readonly decoration?: mw.CharacterDecoration;
                }>;
            };
        };
        /**
         * @groups 角色系统/角色
         * @description 基础人形对象外观配置类 与 advance 互斥
         * @example
         * 使用示例:以不同方式设置角色外观，清空外观，同步外观。外观切换完成时播放换装特效。判断外观是否加载完成播放对应动画。
         * ```
         * @Component
         * export default class CharacterStyleExample extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端玩家
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家控制角色
         *             let myCharacter = myPlayer.character;
         *             // 如果玩家外观准备完成挥手，反之摊手
         *             if(myCharacter.isDescriptionReady) {
         *                 let animation = myCharacter.loadAnimation("35391");
         *                 animation.play();
         *             } else {
         *                 let animation = myCharacter.loadAnimation("14521");
         *                 animation.play();
         *             }
         *             let defaultStyle = null;
         *             // 给【角色换装完成】委托添加函数
         *             myCharacter.onDescriptionComplete.add(() => {
         *                 // 播放换装完成特效
         *                 EffectService.playOnGameObject("161245", myCharacter, {slotType: HumanoidSlotType.Root});
         *                 // 获取角色默认外观风格
         *                 defaultStyle = myCharacter.getDescription();
         *             });
         *             // 添加一个按键方法:按下键盘“1”，重置为默认角色外观
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCharacter.setDescription(defaultStyle);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，修改角色外观
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 if(myCharacter.characterType == CharacterType.HumanoidV1) {
         *                     // 加载一个 V1/四足外观
         *                     character.description.base.wholeBody = "147807"
         *                 }
         *             });
         *             // 添加一个按键方法:按下键盘“3”，同步角色外观
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCharacter.syncDescription();
         *             });
         *             // 添加一个按键方法:按下键盘“4”，清空角色外观
         *             InputUtil.onKeyDown(Keys.Four, () => {
         *                 myCharacter.clearDescription();
         *             });
         *         }
         *     }
         * }
         * ```
         */
        readonly base?: {
            /** @description: 全身模型 */
            wholeBody?: string;
        };
    }
}

declare namespace mw {
    /**
     * @author yunhao.liao
     * @groups 玩法/摄像机
     * @description 摄像机
     * @description -------------------------
     * @description Camera 对象定义 3D 游戏世界的视图。
     * @description Camera 的位置在哪里？
     * @description     在游戏的一个实例中，每个客户端都有自己的与其关联的 Camera 对象。 相机对象仅存在于查看者的客户端上，驻留在该用户的本地中，因此不能直接从服务器进行编辑。
     * @description     每个客户端的特定 Camera 对象都可以通过该客户端上 Camera.currentCamera 属性进行访问。
     * @description Camera 对象如何工作？
     * @description     相机的属性定义了 3D 游戏世界的当前视图。 其中最重要的是：
     * @description     - Camera.currentCamera.worldTransform 表示相机的位置和方向。
     * @description     - Camera.currentCamera.rotationMode 属性调整相机的旋转模式，是否跟随人物旋转而旋转、相机固定不旋转、可由鼠标右键控制旋转三种模式。Camera.currentCamera.positionMode 属性调整相机的位置模式。
     * @description     - Camera.currentCamera.fov 表示可见的可观察世界的范围。
     * @networkStatus usage:客户端
     */
    class Camera extends mw.GameObject {
        /**
         * @groups 玩法/摄像机
         * @description 当前摄像机
         * @effect 只在客户端调用生效
         * @precautions 当前正在使用的摄像机
         * @example
         * 使用示例:创建一个名为"CurrentCamera"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在场景中随机创建5个摄像机。按下键盘“1”，切换摄像机。按下键盘“2”，切换回默认摄像机。你将在场景中看到摄像机切换时的效果。代码如下：
         * ```
         * @Component
         * export default class CurrentCamera extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             let curCameraIndex = -1;
         *             // 在场景中随机创建5个摄像机
         *             let cameraArray = new Array<Camera>();
         *             for (let i = 0;
 i < 5;
 i++) {
         *                 let camera = GameObject.spawn<Camera>("Camera") as Camera;
         *                 camera.worldTransform.position = new Vector(MathUtil.randomInt(-1000, 1000), MathUtil.randomInt(-1000, 1000),MathUtil.randomInt(0, 1000));
         *                 camera.worldTransform.rotation = new Rotation(MathUtil.randomInt(-90, 90), MathUtil.randomInt(-30, 30),MathUtil.randomInt(-150, 150));
         *                 cameraArray.push(camera);
         *                 camera.onSwitchComplete.add(() => {
         *                     console.log("当前摄像机序号 " + i);
         *                     curCameraIndex = i;
         *                 });
         *             }
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.log("Switch Camera");
         *                 let newCamera = (curCameraIndex + 1) % 5;
         *                 Camera.switch(cameraArray[newCamera], 5, CameraSwitchBlendFunction.Linear);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，切换回默认摄像机
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 console.log("Switch Default Camera");
         *                 Camera.switch(myCamera);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        static get currentCamera(): Camera;
        /**
         * @groups 玩法/摄像机
         * @description 弹簧臂
         * @effect 只在客户端调用生效
         * @precautions 摄像机系统由弹簧臂和摄像机组成，实际挂点是弹簧臂负责，而摄像机是挂载弹簧臂尾端。
         * @example
         * 使用示例:将使用到的资源:"26950"拖入优先加载栏创建一个名为"Camera_SpringArm"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成10根柱子用作触发摄像机弹簧杆碰撞，按下键盘“1”，启用/禁用摄像机弹簧杆碰撞，按下键盘“2”，启用/禁用摄像机弹簧杆移动碰撞检测。你可以看到禁用这些属性产生的不同的效果。代码如下：
         * ```
         * @Component
         * export default class Camera_SpringArm extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         if(SystemUtil.isServer()) {
         *             // 生成10根柱子用作摄像机弹簧杆碰撞
         *             for (let i = 0;
 i < 10;
 i++) {
         *                 GameObject.spawn<Model>("26950",{transform: new Transform(new Vector(100, i * 100, 0), Rotation.zero, Vector.one)});
         *             }
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 添加一个按键方法：按下键盘“1”，启用/禁用摄像机弹簧杆碰撞
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.springArm.collisionEnabled = !myCamera.springArm.collisionEnabled;
         *                 console.log("摄像机弹簧臂的碰撞 " + myCamera.springArm.collisionEnabled);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，启用/禁用摄像机弹簧杆移动碰撞检测
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.springArm.collisionEnabled = !myCamera.springArm.collisionEnabled;
         *                 console.log("摄像机弹簧臂移动碰撞检测 " + myCamera.springArm.collisionEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        springArm: SpringArm;
        /**
         * @groups 玩法/摄像机
         * @description 切换摄像机完成的回调
         * @effect 只在客户端调用生效
         * @precautions 切换到当前摄像机完成执行绑定函数
         * @example
         * 使用示例:创建一个名为"CameraExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在场景中随机创建5个摄像机。按下键盘“1”，切换摄像机.按下键盘“2”，切换回默认摄像机。你将在场景中看到摄像机切换时的效果。代码如下：
         * ```
         * @Component
         * export default class CameraExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             let curCameraIndex = -1;
         *             // 在场景中随机创建5个摄像机
         *             let cameraArray = new Array<Camera>();
         *             for (let i = 0;
 i < 5;
 i++) {
         *                 let camera = GameObject.spawn<Camera>("Camera") as Camera;
         *                 camera.worldTransform.position = new Vector(MathUtil.randomInt(-1000, 1000), MathUtil.randomInt(-1000, 1000),MathUtil.randomInt(0, 1000));
         *                 camera.worldTransform.rotation = new Rotation(MathUtil.randomInt(-90, 90), MathUtil.randomInt(-30, 30),MathUtil.randomInt(-150, 150));
         *                 cameraArray.push(camera);
         *                 camera.onSwitchComplete.add(() => {
         *                     console.log("当前摄像机序号 " + i);
         *                     curCameraIndex = i;
         *                 });
         *             }
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.log("Switch Camera");
         *                 let newCamera = (curCameraIndex + 1) % 5;
         *                 Camera.switch(cameraArray[newCamera], 5, CameraSwitchBlendFunction.Linear);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，切换回默认摄像机
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 console.log("Switch Default Camera");
         *                 Camera.switch(myCamera);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        onSwitchComplete: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/摄像机
         * @description 获取摄像机相对变换
         */
        get localTransform(): mw.Transform;
        /**
         * @groups 玩法/摄像机
         * @description 设置摄像机相对变换
         * @param value 变换
         */
        set localTransform(value: mw.Transform);
        /**
         * @groups 玩法/摄像机
         * @description 获取摄像机世界变换
         */
        get worldTransform(): mw.Transform;
        /**
         * @groups 玩法/摄像机
         * @description 设置摄像机世界变换
         * @param value 变换
         */
        set worldTransform(value: mw.Transform);
        /**
         * @groups 玩法/摄像机
         * @description 获取摄像机视场
         * @effect 只在客户端调用生效
         * @precautions FOV，也就是透视模式下的水平视野角度，FOV越大，可见的视野角度越大
         * @example
         * 使用示例: 创建一个名为"Example_Camera_FOV"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按住键盘“2”，增大摄像机FOV,按住键盘“3”，减少摄像机FOV。你将在场景中看到摄像机FOV变化的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_FOV extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 开启摄像机位置延迟
         *             myCamera.positionLagEnabled = true;
         *             // 位置延迟恢复速度1
         *             myCamera.positionLagSpeed = 1;
         *             // 最大位置延迟距离200
         *             myCamera.maxLagDistance = 200;
         *             // 开启摄像机旋转延迟
         *             myCamera.rotationLagEnabled = true;
         *             // 旋转延迟恢复速度2
         *             myCamera.rotationLagSpeed = 2;
         *             // 设置摄像机角度限制
         *             myCamera.upAngleLimit = 30
         *             myCamera.downAngleLimit = 10;
         *             // 添加一个按键方法：按下键盘“1”，固定摄像机高度后跳跃
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.fixedElevation = true;
         *                 myCharacter.jump();
         *                 setTimeout(() => {
         *                     myCamera.fixedElevation = false;
         *                 }, 1000);
         *             });
         *             // 添加一个按键方法：按住键盘“2”，增大摄像机FOV
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCamera.fov += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“3”，减少摄像机FOV
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.fov -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get fov(): number;
        /**
         * @groups 玩法/摄像机
         * @description 设置摄像机视场
         * @effect 只在客户端调用生效
         * @precautions FOV，也就是透视模式下的水平视野角度，FOV越大，可见的视野角度越大
         * @param value 视场
         * @networkStatus usage:客户端
         */
        set fov(value: number);
        /**
         * @groups 玩法/摄像机
         * @description 设置摄像机预设
         * @precautions 摄像机提供预设视角模式。第一人称，第三人称，俯视角，默认，TPS过肩视角，FPS射击视角。
         * @param value 预设
         * @example
         * 使用示例: 创建一个名为"Camera_Preset"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，切换摄像机预设。你将在场景中看到摄像机不同预设的效果。代码如下：
         * ```
         * @Component
         * export default class Camera_Preset extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 打印当前角色摄像机的位置模式和旋转模式
         *             console.log("当前角色摄像机的位置模式 " + CameraPositionMode[myCamera.positionMode]);
         *             console.log("当前角色摄像机的旋转模式 " + CameraRotationMode[myCamera.rotationMode]);
         *             let preset = 0;
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机预设
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.preset = (preset + 1) % 6;
         *                 console.log("当前角色相机预设 " + CameraPreset[preset]);
         *                 preset++;
         *             });
         *             // 添加一个按键方法：按下键盘“2”，切换摄像机的位置模式
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.positionMode = (myCamera.positionMode + 1) % 2;
         *                 console.log("当前角色摄像机的位置模式 " + CameraPositionMode[myCamera.positionMode]);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，切换摄像机的旋转模式
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCamera.rotationMode = (myCamera.rotationMode + 1) % 3;
         *                 console.log("当前角色摄像机的旋转模式 " + CameraRotationMode[myCamera.rotationMode]);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        set preset(value: mw.CameraPreset);
        /**
         * @groups 玩法/摄像机
         * @description 位置模式
         * @effect 只在客户端调用生效
         * @precautions 摄像机的位置模式。固定模式:摄像机固定在某一位置，不可移动。跟随模式:摄像机跟随某个物体(默认是人物角色)一直移动。
         * @example
         * 使用示例: 创建一个名为"Example_Camera_PositionMode"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“2”，切换摄像机的位置模式。你将在场景中看到摄像机不同位置模式的效果并在控制台看到打印的摄像机当前位置模式。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_PositionMode extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 打印当前角色摄像机的位置模式和旋转模式
         *             console.log("当前角色摄像机的位置模式 " + CameraPositionMode[myCamera.positionMode]);
         *             console.log("当前角色摄像机的旋转模式 " + CameraRotationMode[myCamera.rotationMode]);
         *             let preset = 0;
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机预设
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.preset = (preset + 1) % 6;
         *                 console.log("当前角色相机预设 " + CameraPreset[preset]);
         *                 preset++;
         *             });
         *             // 添加一个按键方法：按下键盘“2”，切换摄像机的位置模式
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.positionMode = (myCamera.positionMode + 1) % 2;
         *                 console.log("当前角色摄像机的位置模式 " + CameraPositionMode[myCamera.positionMode]);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，切换摄像机的旋转模式
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCamera.rotationMode = (myCamera.rotationMode + 1) % 3;
         *                 console.log("当前角色摄像机的旋转模式 " + CameraRotationMode[myCamera.rotationMode]);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get positionMode(): mw.CameraPositionMode;
        /**
         * @groups 玩法/摄像机
         * @description 位置模式
         * @effect 只在客户端调用生效
         * @precautions 摄像机的位置模式。固定模式:摄像机固定在某一位置，不可移动。跟随模式:摄像机跟随某个物体(默认是人物角色)一直移动。
         * @param value 位置模式
         * @networkStatus usage:客户端
         */
        set positionMode(value: mw.CameraPositionMode);
        /**
         * @groups 玩法/摄像机
         * @description 旋转模式
         * @effect 只在客户端调用生效
         * @precautions 摄像机旋转模式。固定朝向:摄像机固定朝向某一个方向。跟随朝向:摄像机跟随目标面朝方向。控制朝向:摄像机的朝向受到输入控制。
         * @example
         * 使用示例: 创建一个名为"Example_Camera_RotationMode"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“3”，切换摄像机的旋转模式。你将在场景中看到摄像机不同旋转模式的效果并在控制台看到打印的摄像机当前旋转模式。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_RotationMode extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家控制的角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 打印当前角色摄像机的位置模式和旋转模式
         *             console.log("当前角色摄像机的位置模式 " + CameraPositionMode[myCamera.positionMode]);
         *             console.log("当前角色摄像机的旋转模式 " + CameraRotationMode[myCamera.rotationMode]);
         *             let preset = 0;
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机预设
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.preset = (preset + 1) % 6;
         *                 console.log("当前角色相机预设 " + CameraPreset[preset]);
         *                 preset++;
         *             });
         *             // 添加一个按键方法：按下键盘“2”，切换摄像机的位置模式
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.positionMode = (myCamera.positionMode + 1) % 2;
         *                 console.log("当前角色摄像机的位置模式 " + CameraPositionMode[myCamera.positionMode]);
         *             });
         *             // 添加一个按键方法：按下键盘“3”，切换摄像机的旋转模式
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 myCamera.rotationMode = (myCamera.rotationMode + 1) % 3;
         *                 console.log("当前角色摄像机的旋转模式 " + CameraRotationMode[myCamera.rotationMode]);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get rotationMode(): mw.CameraRotationMode;
        /**
         * @groups 玩法/摄像机
         * @description 旋转模式
         * @effect 只在客户端调用生效
         * @precautions 摄像机旋转模式。固定朝向:摄像机固定朝向某一个方向。跟随朝向:摄像机跟随目标面朝方向。控制朝向:摄像机的朝向受到输入控制。
         * @param value 旋转模式
         */
        set rotationMode(value: mw.CameraRotationMode);
        /**
         * @groups 玩法/摄像机
         * @description 启用位置延迟
         * @effect 只在客户端调用生效
         * @precautions 开启后在人物位移时，对摄像机跟随人物的运动进行延迟，关闭则没有延迟效果
         * @example
         * 使用示例: 创建一个名为"Example_Camera_PositionLagEnabled"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到摄像机位置延迟的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_PositionLagEnabled extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 开启摄像机位置延迟
         *             myCamera.positionLagEnabled = true;
         *             // 位置延迟恢复速度1
         *             myCamera.positionLagSpeed = 1;
         *             // 添加一个按键方法：按下键盘“1”，固定摄像机高度后跳跃
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.fixedElevation = true;
         *                 myCharacter.jump();
         *                 setTimeout(() => {
         *                     myCamera.fixedElevation = false;
         *                 }, 1000);
         *             });
         *             // 添加一个按键方法：按住键盘“2”，增大摄像机FOV
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCamera.fov += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“3”，减少摄像机FOV
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.fov -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get positionLagEnabled(): boolean;
        /**
         * @groups 玩法/摄像机
         * @description 启用位置延迟
         * @effect 只在客户端调用生效
         * @precautions 开启后在人物位移时，对摄像机跟随人物的运动进行延迟，关闭则没有延迟效果
         * @param value 是否开启
         * @networkStatus usage:客户端
         */
        set positionLagEnabled(value: boolean);
        /**
         * @groups 玩法/摄像机
         * @description 位置延迟速度
         * @effect 只在客户端调用生效
         * @precautions 控制人物在位移时，摄像机抵达目标位置的速度
         * @example
         * 使用示例: 创建一个名为"Example_Camera_PositionLagSpeed"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，开启位置延迟后设置位置延迟恢复速度为1，你将在场景中看到摄像机位置延迟后摄像机缓慢恢复位置的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_PositionLagSpeed extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 开启摄像机位置延迟
         *             myCamera.positionLagEnabled = true;
         *             // 位置延迟恢复速度1
         *             myCamera.positionLagSpeed = 1;
         *             // 添加一个按键方法：按下键盘“1”，固定摄像机高度后跳跃
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.fixedElevation = true;
         *                 myCharacter.jump();
         *                 setTimeout(() => {
         *                     myCamera.fixedElevation = false;
         *                 }, 1000);
         *             });
         *             // 添加一个按键方法：按住键盘“2”，增大摄像机FOV
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCamera.fov += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“3”，减少摄像机FOV
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.fov -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get positionLagSpeed(): number;
        /**
         * @groups 玩法/摄像机
         * @description 设置摄像机位置延迟速度
         * @effect 只在客户端调用生效
         * @precautions 控制人物在位移时，摄像机抵达目标位置的速度
         * @param value 延迟速度
         * @networkStatus usage:客户端
         */
        set positionLagSpeed(value: number);
        /**
         * @groups 玩法/摄像机
         * @description 位置最大延迟距离
         * @effect 只在客户端调用生效
         * @precautions 控制人物在位移时，摄像机与挂点的最大距离
         * @example
         * 使用示例: 创建一个名为"Example_Camera_MaxLagDistance"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，开启位置延迟后设置最大位置延迟距离为200，你将在场景中看到摄像机位置延迟后摄像机最远只延迟200cm的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_MaxLagDistance extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get maxLagDistance(): number;
        /**
         * @groups 玩法/摄像机
         * @description 位置最大延迟距离
         * @effect 只在客户端调用生效
         * @precautions 控制人物在位移时，摄像机与挂点的最大距离
         * @param value 延迟最大距离
         * @networkStatus usage:客户端
         */
        set maxLagDistance(value: number);
        /**
         * @groups 玩法/摄像机
         * @description 启用旋转延迟
         * @effect 只在客户端调用生效
         * @precautions 开启后在视角旋转时，对摄像机跟随人物的运动进行延迟，关闭则没有延迟效果
         * @example
         * 使用示例: 创建一个名为"Example_Camera_RotationLagEnabled"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，开启摄像机旋转延迟，你将在场景中看到摄像机旋转时延迟的效果。代码如下：
         * ```
         * @Component
         * export default class RotationLagEnabled extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 开启摄像机位置延迟
         *             myCamera.positionLagEnabled = true;
         *             // 位置延迟恢复速度1
         *             myCamera.positionLagSpeed = 1;
         *             // 最大位置延迟距离200
         *             myCamera.maxLagDistance = 200;
         *             // 开启摄像机旋转延迟
         *             myCamera.rotationLagEnabled = true;
         *             // 旋转延迟恢复速度2
         *             myCamera.rotationLagSpeed = 2;
         *             // 设置摄像机角度限制
         *             myCamera.upAngleLimit = 30
         *             myCamera.downAngleLimit = 10;
         *             // 添加一个按键方法：按下键盘“1”，固定摄像机高度后跳跃
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.fixedElevation = true;
         *                 myCharacter.jump();
         *                 setTimeout(() => {
         *                     myCamera.fixedElevation = false;
         *                 }, 1000);
         *             });
         *             // 添加一个按键方法：按住键盘“2”，增大摄像机FOV
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCamera.fov += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“3”，减少摄像机FOV
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.fov -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get rotationLagEnabled(): boolean;
        /**
         * @groups 玩法/摄像机
         * @description 启用旋转延迟
         * @effect 只在客户端调用生效
         * @precautions 开启后在视角旋转时，对摄像机跟随人物的运动进行延迟，关闭则没有延迟效果
         * @param value 是否开启
         * @networkStatus usage:客户端
         */
        set rotationLagEnabled(value: boolean);
        /**
         * @groups 玩法/摄像机
         * @description 旋转延迟速度
         * @effect 只在客户端调用生效
         * @precautions 控制视角在旋转时，摄像机抵达目标位置的角速度
         * @example
         * 使用示例: 创建一个名为"Example_Camera_RotationLagSpeed"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，开启摄像机旋转延迟，你将在场景中看到摄像机旋转时延迟的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_RotationLagSpeed extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 开启摄像机位置延迟
         *             myCamera.positionLagEnabled = true;
         *             // 位置延迟恢复速度1
         *             myCamera.positionLagSpeed = 1;
         *             // 最大位置延迟距离200
         *             myCamera.maxLagDistance = 200;
         *             // 开启摄像机旋转延迟
         *             myCamera.rotationLagEnabled = true;
         *             // 旋转延迟恢复速度2
         *             myCamera.rotationLagSpeed = 2;
         *             // 设置摄像机角度限制
         *             myCamera.upAngleLimit = 30
         *             myCamera.downAngleLimit = 10;
         *             // 添加一个按键方法：按下键盘“1”，固定摄像机高度后跳跃
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.fixedElevation = true;
         *                 myCharacter.jump();
         *                 setTimeout(() => {
         *                     myCamera.fixedElevation = false;
         *                 }, 1000);
         *             });
         *             // 添加一个按键方法：按住键盘“2”，增大摄像机FOV
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCamera.fov += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“3”，减少摄像机FOV
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.fov -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get rotationLagSpeed(): number;
        /**
         * @groups 玩法/摄像机
         * @description 旋转延迟速度
         * @effect 只在客户端调用生效
         * @precautions 控制视角在旋转时，摄像机抵达目标位置的角速度
         * @param value 延迟速度
         * @networkStatus usage:客户端
         */
        set rotationLagSpeed(value: number);
        /**
         * @groups 玩法/摄像机
         * @description 向上角度限制
         * @effect 只在客户端调用生效
         * @precautions 摄像机向上旋转时的最大角度使用范围在0-90之间。
         * @example
         * 使用示例: 创建一个名为"Example_Camera_UpAngleLimit"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，置摄像机角度限制，上抬最大角度为30，下旋最大角度为10。你将在场景中看到摄像机旋转受限的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_UpAngleLimit extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 开启摄像机位置延迟
         *             myCamera.positionLagEnabled = true;
         *             // 位置延迟恢复速度1
         *             myCamera.positionLagSpeed = 1;
         *             // 最大位置延迟距离200
         *             myCamera.maxLagDistance = 200;
         *             // 开启摄像机旋转延迟
         *             myCamera.rotationLagEnabled = true;
         *             // 旋转延迟恢复速度2
         *             myCamera.rotationLagSpeed = 2;
         *             // 设置摄像机角度限制
         *             myCamera.upAngleLimit = 30
         *             myCamera.downAngleLimit = 10;
         *             // 添加一个按键方法：按下键盘“1”，固定摄像机高度后跳跃
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.fixedElevation = true;
         *                 myCharacter.jump();
         *                 setTimeout(() => {
         *                     myCamera.fixedElevation = false;
         *                 }, 1000);
         *             });
         *             // 添加一个按键方法：按住键盘“2”，增大摄像机FOV
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCamera.fov += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“3”，减少摄像机FOV
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.fov -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get upAngleLimit(): number;
        /**
         * @groups 玩法/摄像机
         * @description 向上角度限制
         * @effect 只在客户端调用生效
         * @precautions 摄像机向上旋转时的最大角度使用范围在0-91之间。
         * @param value 角度限制
         * @networkStatus usage:客户端
         */
        set upAngleLimit(value: number);
        /**
         * @groups 玩法/摄像机
         * @description 获取摄像机向下角度限制
         * @effect 只在客户端调用生效
         * @precautions 摄像机向下旋转时的最大角度使用范围在0-90之间。
         * @example
         * 使用示例: 创建一个名为"Example_Camera_DownAngleLimit"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，置摄像机角度限制，上抬最大角度为30，下旋最大角度为10。你将在场景中看到摄像机旋转受限的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_DownAngleLimit extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 开启摄像机位置延迟
         *             myCamera.positionLagEnabled = true;
         *             // 位置延迟恢复速度1
         *             myCamera.positionLagSpeed = 1;
         *             // 最大位置延迟距离200
         *             myCamera.maxLagDistance = 200;
         *             // 开启摄像机旋转延迟
         *             myCamera.rotationLagEnabled = true;
         *             // 旋转延迟恢复速度2
         *             myCamera.rotationLagSpeed = 2;
         *             // 设置摄像机角度限制
         *             myCamera.upAngleLimit = 30
         *             myCamera.downAngleLimit = 10;
         *             // 添加一个按键方法：按下键盘“1”，固定摄像机高度后跳跃
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.fixedElevation = true;
         *                 myCharacter.jump();
         *                 setTimeout(() => {
         *                     myCamera.fixedElevation = false;
         *                 }, 1000);
         *             });
         *             // 添加一个按键方法：按住键盘“2”，增大摄像机FOV
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCamera.fov += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“3”，减少摄像机FOV
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.fov -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get downAngleLimit(): number;
        /**
         * @groups 玩法/摄像机
         * @description 设置摄像机向下角度限制
         * @effect 只在客户端调用生效
         * @precautions 摄像机向下旋转时的最大角度使用范围在0-90之间。
         * @param value 角度限制
         * @networkStatus usage:客户端
         */
        set downAngleLimit(value: number);
        /**
         * @groups 玩法/摄像机
         * @description 固定摄像机高度
         * @effect 只在客户端调用生效
         * @precautions 无论挂点如何移动摄像机位置的z轴值不会被改变。
         * @example
         * 使用示例: 创建一个名为"Example_Camera_FixedElevation"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，固定摄像机高度后跳跃。你将在场景中看到角色跳跃时摄像机跟随角色高度的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_FixedElevation extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 开启摄像机位置延迟
         *             myCamera.positionLagEnabled = true;
         *             // 位置延迟恢复速度1
         *             myCamera.positionLagSpeed = 1;
         *             // 最大位置延迟距离200
         *             myCamera.maxLagDistance = 200;
         *             // 开启摄像机旋转延迟
         *             myCamera.rotationLagEnabled = true;
         *             // 旋转延迟恢复速度2
         *             myCamera.rotationLagSpeed = 2;
         *             // 设置摄像机角度限制
         *             myCamera.upAngleLimit = 30
         *             myCamera.downAngleLimit = 10;
         *             // 添加一个按键方法：按下键盘“1”，固定摄像机高度后跳跃
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.fixedElevation = true;
         *                 myCharacter.jump();
         *                 setTimeout(() => {
         *                     myCamera.fixedElevation = false;
         *                 }, 1000);
         *             });
         *             // 添加一个按键方法：按住键盘“2”，增大摄像机FOV
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCamera.fov += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“3”，减少摄像机FOV
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.fov -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get fixedElevation(): boolean;
        /**
         * @groups 玩法/摄像机
         * @description 固定摄像机高度
         * @effect 只在客户端调用生效
         * @precautions 无论挂点如何移动摄像机位置的z轴值不会被改变。
         * @param value 是否固定
         * @networkStatus usage:客户端
         */
        set fixedElevation(value: boolean);
        /**
         * @groups 玩法/摄像机
         * @description 获取是否启用透明效果
         * @effect 只在客户端调用生效
         * @precautions 在进入弹簧臂范围的物体会透明，离开后恢复
         * @networkStatus usage:客户端
         */
        get fadeObstructionEnabled(): boolean;
        /**
         * @groups 玩法/摄像机
         * @description 设置是否启用透明效果
         * @effect 只在客户端调用生效
         * @precautions 在进入弹簧臂范围的物体会透明，离开后恢复
         * @networkStatus usage:客户端
         */
        set fadeObstructionEnabled(value: boolean);
        /**
         * @groups 玩法/摄像机
         * @description 获取透明度
         * @effect 只在客户端调用生效
         * @precautions 范围0-1，值越大透明度越高，1是完全透明
         * @example
         * 使用示例: 创建一个名为"Example_Camera_FixedElevation"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，固定摄像机高度后跳跃。你将在场景中看到角色跳跃时摄像机跟随角色高度的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_FixedElevation extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 开启透明效果
         *             myCamera.transparencyEnabled = true;
         *             // 添加一个按键方法：按下键盘“1”，增大透明度
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.transparency += 0.1;
         *             });
         *             // 添加一个按键方法：按住键盘“2”，减小透明度
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCamera.transparency -= 0.1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get fadeObstructionOpacity(): number;
        /**
         * @groups 玩法/摄像机
         * @description 设置透明度
         * @effect 只在客户端调用生效
         * @precautions 范围0-1，值越大透明度越高，1是完全透明
         * @networkStatus usage:客户端
         */
        set fadeObstructionOpacity(value: number);
        /**
         * @groups 玩法/摄像机
         * @description 获取横纵比约束
         * @effect 只在客户端调用生效
         * @precautions 设置FOV是约束X轴方向视角角度还是Y轴方向视角角度
         * @example
         * 使用示例: 创建一个名为"Example_Camera_AspectRatioAxisConstraint"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```
         * @Component
         * export default class Example_Camera_AspectRatioAxisConstraint extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 开启透明效果
         *             myCamera.transparencyEnabled = true;
         *             // 添加一个按键方法：按下键盘“1”，设置为保持X轴FOV
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.aspectRatioAxisConstraint = AspectRatioAxisConstraint.maintainXFOV;
         *             });
         *             // 添加一个按键方法：按住键盘“2”，设置为保持Y轴FOV
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCamera.aspectRatioAxisConstraint = AspectRatioAxisConstraint.maintainYFOV;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get aspectRatioAxisConstraint(): mw.AspectRatioAxisConstraint;
        /**
         * @groups 玩法/摄像机
         * @description 设置透明度
         * @effect 只在客户端调用生效
         * @precautions 范围0-1，值越大透明度越高，1是完全透明
         * @networkStatus usage:客户端
         */
        set aspectRatioAxisConstraint(value: mw.AspectRatioAxisConstraint);
        /**
         * @groups 玩法/摄像机
         * @description 获取是否每帧捕获
         * @effect 只在客户端调用生效
         * @precautions false时只会捕获一次，节省性能
         * @example
         * 使用示例: 创建一个名为"Example_Camera_FrameCaptured"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，在UI编辑器中添加图片，运行游戏，代码如下：
         * ```
         * @Component
         * export default class Example_Camera_FrameCaptured extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     private camera: Camera;
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 生成摄像机
         *             GameObject.asyncSpawn("Camera").then((obj)=>{
         *                this.camera = obj as Camera;
         *             })
         *             // 获取UI图片
         *             const image = this.uiWidgetBase.findChildByPath('RootCanvas/Image') as Image
         *             // 设置图片来源为生成的摄像机
         *             image.currentCamera = this.camera;
         *             // 添加一个按键方法：按下键盘“1”，开启每帧捕获
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.isFrameCaptured = true;
         *             });
         *             // 添加一个按键方法：按住键盘“2”，关闭每帧捕获
         *             InputUtil.onKeyPress(Keys.Two, () => {
         *                 myCamera.isFrameCaptured = false;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get isFrameCaptured(): boolean;
        /**
         * @groups 玩法/摄像机
         * @description 设置是否每帧捕获
         * @effect 只在客户端调用生效
         * @precautions false时只会捕获一次，节省性能
         * @networkStatus usage:客户端
         */
        set isFrameCaptured(value: boolean);
        /**
         * @groups 玩法/摄像机
         * @description 切换摄像机
         * @effect 只在客户端调用生效
         * @param newCamera usage: 想要切换的目标摄像机对象，当传入的参数类型为 Transform 时会使用该 Transform 的位置跟旋转生成一个 Camera 再进行切换。
         * @param blendTime usage: 混合时间(秒) default: 0  range: 不做限制 type: 浮点数
         * @param blendFunc usage: 切换时用到的混合函数 default: Linear
         * @param blendExp usage: 混合额外变量，用于控制混合时的快慢程度，具体作用看枚举 SwitchCameraBlendFunction default: 0  range: 不做限制 type: 浮点数
         * @returns 目标camera对象
         * @example
         * 使用示例:创建一个名为"Example_Camera_Switch"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，在场景中随机创建5个摄像机。按下键盘“1”，切换摄像机。按下键盘“2”，切换回默认摄像机。你将在场景中看到摄像机切换时的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_Switch extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             let curCameraIndex = -1;
         *             // 在场景中随机创建5个摄像机
         *             let cameraArray = new Array<Camera>();
         *             for (let i = 0;
 i < 5;
 i++) {
         *                 let camera = GameObject.spawn<Camera>("Camera") as Camera;
         *                 camera.worldTransform.position = new Vector(MathUtil.randomInt(-1000, 1000), MathUtil.randomInt(-1000, 1000),MathUtil.randomInt(0, 1000));
         *                 camera.worldTransform.rotation = new Rotation(MathUtil.randomInt(-90, 90), MathUtil.randomInt(-30, 30),MathUtil.randomInt(-150, 150));
         *                 cameraArray.push(camera);
         *                 camera.onSwitchComplete.add(() => {
         *                     console.log("当前摄像机序号 " + i);
         *                     curCameraIndex = i;
         *                 });
         *             }
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.log("Switch Camera");
         *                 let newCamera = (curCameraIndex + 1) % 5;
         *                 Camera.switch(cameraArray[newCamera], 5, CameraSwitchBlendFunction.Linear);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，切换回默认摄像机
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 console.log("Switch Default Camera");
         *                 Camera.switch(myCamera);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        static switch(newCamera: Camera, blendTime?: number, blendFunc?: mw.CameraSwitchBlendFunction, blendExp?: number): Camera;
        /**
         * @groups 玩法/摄像机
         * @description 开始摄像机抖动
         * @effect 只在客户端调用生效
         * @param shakeInfo usage: 抖动信息
         * @param duration usage: 持续时间(秒) default: 1  range: 不做限制 type: 浮点数
         * @example
         * 使用示例:创建一个名为"Example_Camera_Shake"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，抖动相机5秒。按下键盘“2”，停止相机抖动。你将在场景中看到摄像机镜头抖动时的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_Shake extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 添加一个按键方法:按下键盘“1”，抖动相机5秒
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.log("Start Shake ");
         *                 Camera.shake({positionYAmplitude: 1, positionYFrequency: 0.5, positionZAmplitude: 1, positionZFrequency: 1}, 5);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，停止相机抖动
         *             InputUtil.onKeyUp(Keys.Two, () => {
         *                 console.log("Stop Shake ");
         *                 Camera.stopShake();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        static shake(shakeInfo: mw.CameraShakeInfo, duration?: number): void;
        /**
         * @groups 玩法/摄像机
         * @description 停止摄像机抖动
         * @effect 只在客户端调用生效
         * @example
         * 使用示例:创建一个名为"Example_Camera_StopShake"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，抖动相机5秒。按下键盘“2”，停止相机抖动。你将在场景中看到摄像机镜头抖动时的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_StopShake extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 添加一个按键方法:按下键盘“1”，抖动相机5秒
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.log("Start Shake ");
         *                 Camera.shake({positionYAmplitude: 1, positionYFrequency: 0.5, positionZAmplitude: 1, positionZFrequency: 1}, 5);
         *             });
         *             // 添加一个按键方法:按下键盘“2”，停止相机抖动
         *             InputUtil.onKeyUp(Keys.Two, () => {
         *                 console.log("Stop Shake ");
         *                 Camera.stopShake();
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        static stopShake(): void;
        /**
         * @groups 玩法/摄像机
         * @description 相机锁定目标
         * @effect 只在客户端调用生效
         * @precautions 当前摄像机按照参数设置锁定目标对象。
         * @param target usage:目标物体
         * @param val usage:lockInterval,lockSpeed,lockRange,lockDistance,lockOffset,bPause参数集合  default:null
         * @param lockInterval usage:锁定间隔(间隔多少秒暂停/恢复锁定) default:0
         * @param lockSpeed usage:锁定速度(决定摄像机多久旋转至目标朝向，参数值越大越快,范围0-5，但0是直接旋转至目标朝向) default:1.3
         * @param lockRange usage:锁定范围(以屏幕坐标中心为圆心，这个值表示半径) default:100
         * @param lockDistance usage:锁定距离(目标到摄像机的距离) default:1000
         * @param lockOffset usage:锁定偏移 default:Vector.zero
         * @param bPause usage:决定超出范围/距离后锁定是暂停/取消，为true是暂停 default:true
         * @example
         * 使用示例:创建一个名为"Example_Camera_Lock"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，创建一个敌方角色作为锁定目标。敌方角色会持续追踪玩家角色。按下键盘“1”，锁定敌方角色。按下键盘“2”，手动取消锁定：当bPause参数true时，需要手动取消锁定才能结束锁定流程。按下键盘“3”，角色摄像机朝向目标（无追踪效果）。你将在场景中看到锁定切换时的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_Lock extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 创建一个敌方角色作为锁定目标
         *             let enemy = Player.spawnDefaultCharacter();
         *             enemy.switchToFlying()
         *             enemy.worldTransform.position = new Vector(1000, 500, 130);
         *             // 敌方角色追踪玩家角色
         *             TimeUtil.setInterval(() => {
         *                 let distance = Vector.subtract(myCharacter.worldTransform.position, enemy.worldTransform.position);
         *                 if(distance.length < 200) {
         *                     enemy.addMovement(new Vector(0, 0, 5));
         *                 } else {
         *                     let dir = distance.normalized;
         *                     enemy.addMovement(dir);
         *                     enemy.worldTransform.rotation = distance.toRotation();
         *                 }
         *             }, 0.02)
         *             // 添加一个按键方法：按下键盘“1”，锁定敌方角色
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.error("Start Lock");
         *                 let myCamera = Camera.currentCamera;
         *                 myCamera.lock(enemy, {lockInterval:0, lockSpeed: 0, lockRange: 500, lockDistance: 5000, lockOffset: new Vector(0, 0, 80), bPause: true});
         *             });
         *             // 添加一个按键方法：按下键盘“2”，手动取消锁定：当bPause参数true时，需要手动取消锁定才能结束锁定流程
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 let myCamera = Camera.currentCamera;
         *                 myCamera.unlock();
         *             });
         *             // 添加一个按键方法：按下键盘“3”，角色看向目标（无追踪效果）
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 let myCamera = Camera.currentCamera;
         *                 myCamera.lookAt(enemy);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        lock(target: mw.GameObject, val?: {
            lockInterval?: number;
            lockSpeed?: number;
            lockRange?: number;
            lockDistance?: number;
            lockOffset?: mw.Vector;
            bPause?: boolean;
            lockRotationZ?: boolean;
            lockRotationY?: boolean;
        }): void;
        /**
         * @groups 玩法/摄像机
         * @description 取消锁定目标
         * @effect 只在客户端调用生效
         * @example
         * 使用示例:创建一个名为"Example_Camera_Unlock"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，创建一个敌方角色作为锁定目标。敌方角色会持续追踪玩家角色。按下键盘“1”，锁定敌方角色。按下键盘“2”，手动取消锁定：当bPause参数true时，需要手动取消锁定才能结束锁定流程。按下键盘“3”，角色摄像机朝向目标（无追踪效果）。你将在场景中看到锁定切换时的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_Unlock extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 创建一个敌方角色作为锁定目标
         *             let enemy = Player.spawnDefaultCharacter();
         *             enemy.switchToFlying()
         *             enemy.worldTransform.position = new Vector(1000, 500, 130);
         *             // 敌方角色追踪玩家角色
         *             TimeUtil.setInterval(() => {
         *                 let distance = Vector.subtract(myCharacter.worldTransform.position, enemy.worldTransform.position);
         *                 if(distance.length < 200) {
         *                     enemy.addMovement(new Vector(0, 0, 5));
         *                 } else {
         *                     let dir = distance.normalized;
         *                     enemy.addMovement(dir);
         *                     enemy.worldTransform.rotation = distance.toRotation();
         *                 }
         *             }, 0.02)
         *             // 添加一个按键方法：按下键盘“1”，锁定敌方角色
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.error("Start Lock");
         *                 let myCamera = Camera.currentCamera;
         *                 myCamera.lock(enemy, {lockInterval:0, lockSpeed: 0, lockRange: 500, lockDistance: 5000, lockOffset: new Vector(0, 0, 80), bPause: true});
         *             });
         *             // 添加一个按键方法：按下键盘“2”，手动取消锁定：当bPause参数true时，需要手动取消锁定才能结束锁定流程
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 let myCamera = Camera.currentCamera;
         *                 myCamera.unlock();
         *             });
         *             // 添加一个按键方法：按下键盘“3”，角色看向目标（无追踪效果）
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 let myCamera = Camera.currentCamera;
         *                 myCamera.lookAt(enemy);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        unlock(): void;
        /**
         * @groups 玩法/摄像机
         * @description 摄像机朝向目标
         * @effect 只在客户端调用生效
         * @param target usage:目标
         * @example
         * 使用示例:创建一个名为"Example_Camera_LookAt"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，创建一个敌方角色作为锁定目标。敌方角色会持续追踪玩家角色。按下键盘“1”，锁定敌方角色。按下键盘“2”，手动取消锁定：当bPause参数true时，需要手动取消锁定才能结束锁定流程。按下键盘“3”，角色摄像机朝向目标（无追踪效果）。你将在场景中看到锁定切换时的效果。代码如下：
         * ```
         * @Component
         * export default class Example_Camera_LookAt extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 获取当前玩家角色
         *             let myCharacter = myPlayer.character;
         *             // 创建一个敌方角色作为锁定目标
         *             let enemy = Player.spawnDefaultCharacter();
         *             enemy.switchToFlying()
         *             enemy.worldTransform.position = new Vector(1000, 500, 130);
         *             // 敌方角色追踪玩家角色
         *             TimeUtil.setInterval(() => {
         *                 let distance = Vector.subtract(myCharacter.worldTransform.position, enemy.worldTransform.position);
         *                 if(distance.length < 200) {
         *                     enemy.addMovement(new Vector(0, 0, 5));
         *                 } else {
         *                     let dir = distance.normalized;
         *                     enemy.addMovement(dir);
         *                     enemy.worldTransform.rotation = distance.toRotation();
         *                 }
         *             }, 0.02)
         *             // 添加一个按键方法：按下键盘“1”，锁定敌方角色
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.error("Start Lock");
         *                 let myCamera = Camera.currentCamera;
         *                 myCamera.lock(enemy, {lockInterval:0, lockSpeed: 0, lockRange: 500, lockDistance: 5000, lockOffset: new Vector(0, 0, 80), bPause: true});
         *             });
         *             // 添加一个按键方法：按下键盘“2”，手动取消锁定：当bPause参数true时，需要手动取消锁定才能结束锁定流程
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 let myCamera = Camera.currentCamera;
         *                 myCamera.unlock();
         *             });
         *             // 添加一个按键方法：按下键盘“3”，角色看向目标（无追踪效果）
         *             InputUtil.onKeyDown(Keys.Three, () => {
         *                 let myCamera = Camera.currentCamera;
         *                 myCamera.lookAt(enemy);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        lookAt(target: mw.GameObject | mw.Vector): void;
    }
    /**
     * @author yunhao.liao
     * @groups 玩法/摄像机
     * @description 弹簧臂
     * @networkStatus usage:客户端
     */
    class SpringArm {
        /**
         * @groups 玩法/摄像机
         * @description 是否开启摄像机放缩距离
         * @effect 只在客户端调用生效
         * @precautions 是否开启双指或鼠标滚轮放缩摄像机弹簧臂长度，默认开启,仅在当前摄像机弹簧臂长度处于摄像机放缩距离范围内时生效
         * @example
         * 使用示例:创建一个名为"Example_SpringArm_UseControllerRotation"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“2”，启用/禁用控制器操作摄像机的旋转5秒。你将在场景中看到禁用控制器操作摄像机后的无法控制摄像机旋转的效果。代码如下：
         * ```
         * @Component
         * export default class Example_SpringArm_UseControllerRotation extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机弹簧臂的偏移(0, 100, 100)，2秒后复原
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.log("摄像机弹簧臂的本地变换 " + myCamera.springArm.localTransform);
         *                 console.log("摄像机弹簧臂的世界变换 " + myCamera.springArm.worldTransform);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，启用/禁用控制器操作摄像机的旋转5秒
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.springArm.useControllerRotation = false;
         *                 setTimeout(() => {
         *                     myCamera.springArm.useControllerRotation = true;
         *                 }, 5000);
         *             });
         *             // 添加一个按键方法：按住键盘“3”，增加摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.springArm.length += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“4”，减少摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Four, () => {
         *                 myCamera.springArm.length -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get zoomEnabled(): boolean;
        /**
         * @groups 玩法/摄像机
         * @description 是否开启摄像机放缩距离
         * @effect 只在客户端调用生效
         * @precautions 是否开启双指或鼠标滚轮放缩摄像机弹簧臂长度，默认开启,仅在当前摄像机弹簧臂长度处于摄像机放缩距离范围内时生效
         * @networkStatus usage:客户端
         */
        set zoomEnabled(value: boolean);
        /**
         * @groups 玩法/摄像机
         * @description 摄像机放缩距离范围
         * @effect 只在客户端调用生效
         * @precautions 双指或鼠标滚轮放缩摄像机弹簧臂长度范围，默认值60~500
         * @example
         * 使用示例:创建一个名为"Example_SpringArm_UseControllerRotation"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“2”，启用/禁用控制器操作摄像机的旋转5秒.你将在场景中看到禁用控制器操作摄像机后的无法控制摄像机旋转的效果。代码如下：
         * ```
         * @Component
         * export default class Example_SpringArm_UseControllerRotation extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机弹簧臂的偏移(0, 100, 100)，2秒后复原
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.log("摄像机弹簧臂的本地变换 " + myCamera.springArm.localTransform);
         *                 console.log("摄像机弹簧臂的世界变换 " + myCamera.springArm.worldTransform);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，启用/禁用控制器操作摄像机的旋转5秒
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.springArm.useControllerRotation = false;
         *                 setTimeout(() => {
         *                     myCamera.springArm.useControllerRotation = true;
         *                 }, 5000);
         *             });
         *             // 添加一个按键方法：按住键盘“3”，增加摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.springArm.length += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“4”，减少摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Four, () => {
         *                 myCamera.springArm.length -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get zoomDistanceRange(): mw.Vector2;
        /**
         * @groups 玩法/摄像机
         * @description 摄像机放缩距离范围
         * @effect 只在客户端调用生效
         * @precautions 双指或鼠标滚轮放缩摄像机弹簧臂长度范围，默认值60~500
         * @networkStatus usage:客户端
         */
        set zoomDistanceRange(value: mw.Vector2);
        /**
         * @groups 玩法/摄像机
         * @description 摄像机放缩距离输入比例
         * @effect 只在客户端调用生效
         * @precautions 控制双指距离或鼠标滚轮滚动变化单位距离时，摄像机弹簧臂长度变化大小，默认值1, 范围是0-10
         * @example
         * 使用示例:创建一个名为"Example_SpringArm_UseControllerRotation"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“2”，启用/禁用控制器操作摄像机的旋转5秒。你将在场景中看到禁用控制器操作摄像机后的无法控制摄像机旋转的效果。代码如下：
         * ```
         * @Component
         * export default class Example_SpringArm_UseControllerRotation extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机弹簧臂的偏移(0, 100, 100)，2秒后复原
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.log("摄像机弹簧臂的本地变换 " + myCamera.springArm.localTransform);
         *                 console.log("摄像机弹簧臂的世界变换 " + myCamera.springArm.worldTransform);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，启用/禁用控制器操作摄像机的旋转5秒
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.springArm.useControllerRotation = false;
         *                 setTimeout(() => {
         *                     myCamera.springArm.useControllerRotation = true;
         *                 }, 5000);
         *             });
         *             // 添加一个按键方法：按住键盘“3”，增加摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.springArm.length += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“4”，减少摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Four, () => {
         *                 myCamera.springArm.length -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get zoomScale(): number;
        /**
         * @groups 玩法/摄像机
         * @description 摄像机放缩距离输入比例
         * @effect 只在客户端调用生效
         * @precautions 控制双指距离或鼠标滚轮滚动变化单位距离时，摄像机弹簧臂长度变化大小，默认值1, 范围是0-10
         * @networkStatus usage:客户端
         */
        set zoomScale(value: number);
        /**
         * @groups 玩法/摄像机
         * @description 弹簧臂相对变换
         * @effect 只在客户端调用生效
         * @example
         * 使用示例:创建一个名为"Example_SpringArm_LocalTransform"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，切换摄像机弹簧臂的偏移(0, 100, 100)，2秒后复原。你将在场景中看到摄像机偏移的效果并在控制台看到打印的变化后的摄像机弹簧臂的本地变换。代码如下：
         * ```
         * @Component
         * export default class Example_SpringArm_LocalTransform extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机弹簧臂的偏移(0, 100, 100)，2秒后复原
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.log("摄像机弹簧臂的本地变换 " + myCamera.springArm.localTransform);
         *                 console.log("摄像机弹簧臂的世界变换 " + myCamera.springArm.worldTransform);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，启用/禁用控制器操作摄像机的旋转5秒
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.springArm.useControllerRotation = false;
         *                 setTimeout(() => {
         *                     myCamera.springArm.useControllerRotation = true;
         *                 }, 5000);
         *             });
         *             // 添加一个按键方法：按住键盘“3”，增加摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.springArm.length += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“4”，减少摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Four, () => {
         *                 myCamera.springArm.length -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get localTransform(): mw.Transform;
        /**
         * @groups 玩法/摄像机
         * @description 弹簧臂相对变换
         * @effect 只在客户端调用生效
         * @precautions 弹簧臂的相对变换，用于设置弹簧臂的相对位置、相对旋转以及相对缩放
         * @param value 变换
         * @networkStatus usage:客户端
         */
        set localTransform(value: mw.Transform);
        /**
         * @groups 玩法/摄像机
         * @description 弹簧臂世界变换
         * @effect 只在客户端调用生效
         * @precautions 弹簧臂的世界变换，用于设置弹簧臂的世界位置、世界旋转以及世界缩放
         * @example
         * 使用示例:创建一个名为"Example_SpringArm_WorldTransform"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”，切换摄像机弹簧臂的偏移(0, 100, 100)，2秒后复原。你将在场景中看到摄像机偏移的效果并在控制台看到打印的变化后的摄像机弹簧臂的世界变换。代码如下：
         * ```
         * @Component
         * export default class Example_SpringArm_WorldTransform extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机弹簧臂的偏移(0, 100, 100)，2秒后复原
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.log("摄像机弹簧臂的本地变换 " + myCamera.springArm.localTransform);
         *                 console.log("摄像机弹簧臂的世界变换 " + myCamera.springArm.worldTransform);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，启用/禁用控制器操作摄像机的旋转5秒
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.springArm.useControllerRotation = false;
         *                 setTimeout(() => {
         *                     myCamera.springArm.useControllerRotation = true;
         *                 }, 5000);
         *             });
         *             // 添加一个按键方法：按住键盘“3”，增加摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.springArm.length += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“4”，减少摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Four, () => {
         *                 myCamera.springArm.length -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get worldTransform(): mw.Transform;
        /**
         * @groups 玩法/摄像机
         * @description 弹簧臂世界变换
         * @effect 只在客户端调用生效
         * @precautions 弹簧臂的世界变换，用于设置弹簧臂的世界位置、世界旋转以及世界缩放
         * @param value 变换
         * @networkStatus usage:客户端
         */
        set worldTransform(value: mw.Transform);
        /**
         * @groups 玩法/摄像机
         * @description 弹簧臂长度
         * @effect 只在客户端调用生效
         * @precautions 调整摄像机与挂点之间的距离
         * @example
         * 使用示例:创建一个名为"Example_SpringArm_Length"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按住键盘“3”，增加摄像机弹簧臂的长度，按住键盘“4”，减少摄像机弹簧臂的长度。你将在场景中看到摄像机弹簧杆伸缩的效果。代码如下：
         * ```
         * @Component
         * export default class Example_SpringArm_Length extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机弹簧臂的偏移(0, 100, 100)，2秒后复原
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.log("摄像机弹簧臂的本地变换 " + myCamera.springArm.localTransform);
         *                 console.log("摄像机弹簧臂的世界变换 " + myCamera.springArm.worldTransform);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，启用/禁用控制器操作摄像机的旋转5秒
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.springArm.useControllerRotation = false;
         *                 setTimeout(() => {
         *                     myCamera.springArm.useControllerRotation = true;
         *                 }, 5000);
         *             });
         *             // 添加一个按键方法：按住键盘“3”，增加摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.springArm.length += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“4”，减少摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Four, () => {
         *                 myCamera.springArm.length -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get length(): number;
        /**
         * @groups 玩法/摄像机
         * @description 弹簧臂长度
         * @effect 只在客户端调用生效
         * @precautions 调整摄像机与挂点之间的距离
         * @param value 弹簧臂长度
         * @networkStatus usage:客户端
         */
        set length(value: number);
        /**
         * @groups 玩法/摄像机
         * @description 启用碰撞
         * @effect 只在客户端调用生效
         * @precautions 开启后弹簧臂才会检测碰撞的物体并收缩至离挂载目标最近的碰撞物体处
         * 注意:要修改检测轨迹必须通过修改弹簧臂长度(TargetArmLength)以及targetOffset、slotOffset来实现，诸如直接修改弹簧臂位置的方式会导致偏移处不触发碰撞收缩
         * @example
         * 使用示例:将使用到的资源:"26950"拖入优先加载栏。创建一个名为"Example_SpringArm"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成10根柱子用作触发摄像机弹簧杆碰撞，按下键盘“1”，启用/禁用摄像机弹簧杆碰撞。你可以看到禁用摄像机弹簧杆碰撞摄像机碰撞柱子不同的效果。代码如下：
         * ```
         * @Component
         * export default class Example_SpringArm extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         if(SystemUtil.isServer()) {
         *             // 生成10根柱子用作摄像机弹簧杆碰撞
         *             for (let i = 0;
 i < 10;
 i++) {
         *                 GameObject.spawn<Model>("26950",{transform: new Transform(new Vector(100, i * 100, 0), Rotation.zero, Vector.one)});
         *             }
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 添加一个按键方法：按下键盘“1”，启用/禁用摄像机弹簧杆碰撞
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.springArm.collisionEnabled = !myCamera.springArm.collisionEnabled;
         *                 console.log("摄像机弹簧臂的碰撞 " + myCamera.springArm.collisionEnabled);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，启用/禁用摄像机弹簧杆移动碰撞检测
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.springArm.collisionEnabled = !myCamera.springArm.collisionEnabled;
         *                 console.log("摄像机弹簧臂移动碰撞检测 " + myCamera.springArm.collisionEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get collisionEnabled(): boolean;
        /**
         * @groups 玩法/摄像机
         * @description 启用碰撞
         * @effect 只在客户端调用生效
         * @precautions 开启后弹簧臂才会检测碰撞的物体并收缩至离挂载目标最近的碰撞物体处
         * 注意:要修改检测轨迹必须通过修改弹簧臂长度(TargetArmLength)以及targetOffset、slotOffset来实现，诸如直接修改弹簧臂位置的方式会导致偏移处不触发碰撞收缩
         * @param value 是否启用
         * @networkStatus usage:客户端
         */
        set collisionEnabled(value: boolean);
        /**
         * @groups 玩法/摄像机
         * @description 碰撞插值速度,该值用于调整摄像机从碰撞状态恢复为非碰撞状态的速度,用于使摄像机碰撞效果更加平滑
         * @effect 只在客户端调用生效
         * @precautions 默认值是2,生效范围0-20,值越大速度越快,当等于0时,会关闭摄像机碰撞插值效果;
该速度不是固定的,而是会由快变慢
         * @example
         * 使用示例:将使用到的资源:"26950"拖入优先加载栏。创建一个名为"Example_SpringArm"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中生成10根柱子用作触发摄像机弹簧杆碰撞，按下键盘“1”，启用/禁用摄像机弹簧杆碰撞。你可以看到禁用摄像机弹簧杆碰撞摄像机碰撞柱子不同的效果。代码如下：
         * ```ts
         * @Component
         * export default class Example_SpringArm extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         if(SystemUtil.isServer()) {
         *             // 生成10根柱子用作摄像机弹簧杆碰撞
         *             for (let i = 0;
 i < 10;
 i++) {
         *                 GameObject.spawn<Model>("26950",{transform: new Transform(new Vector(100, i * 100, 0), Rotation.zero, Vector.one)});
         *             }
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 添加一个按键方法：按下键盘“1”，启用/禁用摄像机弹簧杆碰撞
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 myCamera.springArm.collisionEnabled = !myCamera.springArm.collisionEnabled;
         *                 console.log("摄像机弹簧臂的碰撞 " + myCamera.springArm.collisionEnabled);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，启用/禁用摄像机弹簧杆移动碰撞检测
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.springArm.collisionEnabled = !myCamera.springArm.collisionEnabled;
         *                 console.log("摄像机弹簧臂移动碰撞检测 " + myCamera.springArm.collisionEnabled);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get collisionInterpSpeed(): number;
        /**
         * @groups 玩法/摄像机
         * @description 碰撞插值速度,该值用于调整摄像机从碰撞状态恢复为非碰撞状态的速度,用于使摄像机碰撞效果更加平滑
         * @effect 只在客户端调用生效
         * @precautions 默认值是2,生效范围0-20,值越大速度越快,当等于0时,会关闭摄像机碰撞插值效果;
该速度不是固定的,而是会由快变慢
         * @param value 是否启用
         * @networkStatus usage:客户端
         */
        set collisionInterpSpeed(value: number);
        /**
         * @groups 玩法/摄像机
         * @description 使用控制器控制旋转
         * @effect 只在客户端调用生效
         * @precautions 开启后，使用控制器的旋转作为摄像机的旋转
         * @example
         * 使用示例:创建一个名为"Example_SpringArm_UseControllerRotation"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“2”，启用/禁用控制器操作摄像机的旋转5秒。你将在场景中看到禁用控制器操作摄像机后的无法控制摄像机旋转的效果。代码如下：
         * ```
         * @Component
         * export default class Example_SpringArm_UseControllerRotation extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前摄像机
         *             let myCamera = Camera.currentCamera;
         *             // 添加一个按键方法：按下键盘“1”，切换摄像机弹簧臂的偏移(0, 100, 100)，2秒后复原
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 console.log("摄像机弹簧臂的本地变换 " + myCamera.springArm.localTransform);
         *                 console.log("摄像机弹簧臂的世界变换 " + myCamera.springArm.worldTransform);
         *             });
         *             // 添加一个按键方法：按下键盘“2”，启用/禁用控制器操作摄像机的旋转5秒
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 myCamera.springArm.useControllerRotation = false;
         *                 setTimeout(() => {
         *                     myCamera.springArm.useControllerRotation = true;
         *                 }, 5000);
         *             });
         *             // 添加一个按键方法：按住键盘“3”，增加摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Three, () => {
         *                 myCamera.springArm.length += 1;
         *             });
         *             // 添加一个按键方法：按住键盘“4”，减少摄像机弹簧臂的长度
         *             InputUtil.onKeyPress(Keys.Four, () => {
         *                 myCamera.springArm.length -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        get useControllerRotation(): boolean;
        /**
         * @groups 玩法/摄像机
         * @description 使用控制器控制旋转
         * @effect 只在客户端调用生效
         * @precautions 开启后，使用控制器的旋转作为摄像机的旋转
         * @param value 是否使用控制器控制旋转
         * @networkStatus usage:客户端
         */
        set useControllerRotation(value: boolean);
    }
}

declare namespace mw {
}

declare namespace mw {
    /**
    * @author yunhao.liao
    * @groups 玩法
    * @description 摄像机位置模式
    */
    enum CameraPositionMode {
        /** 位置固定 */
        PositionFixed = 0,
        /** 位置跟随目标 */
        PositionFollow = 1
    }
    /**
     * @author yunhao.liao
     * @groups 玩法
     * @description 摄像机旋转模式
     */
    enum CameraRotationMode {
        /** 旋转固定 */
        RotationFixed = 0,
        /** 旋转跟随目标 */
        RotationFollow = 1,
        /** 旋转由输入控制 */
        RotationControl = 2
    }
    /**
     * @author yunhao.liao
     * @groups 玩法
     * @description 摄像机镜头模式
     */
    enum CameraProjectionMode {
        /** 摄像机镜头透视模式 */
        Perspective = 0,
        /** 摄像机镜头正交模式 */
        Orthographic = 1
    }
    /**
     * @author yunhao.liao
     * @groups 玩法
     * @description 摄像机模式
     */
    enum CameraPreset {
        /** 第一人称 */
        FirstPerson = 0,
        /** 第三人称 */
        ThirdPerson = 1,
        /** 俯视角 */
        TopDownAngle = 2,
        /** 默认 */
        Default = 3,
        /** TPS过肩视角 */
        TPSOverShoulderAngle = 4,
        /** FPS射击视角 */
        FPSShootingAngle = 5
    }
    /**
     * @author yunhao.liao
     * @groups 玩法
     * @description 切换摄像机时运用的混合函数
     */
    enum CameraSwitchBlendFunction {
        /** 简单的线性插值 */
        Linear = 0,
        /** 有轻微的缓入和缓出,但缓和程度无法调整 */
        Cubic = 1,
        /** 立即加速,但平稳减速到目标,由blendExp参数控制的缓和程度 */
        EaseIn = 2,
        /** 相机平稳加速,但不会减速到目标,由blendExp参数控制的缓和程度  */
        EaseOut = 3,
        /** 相机平稳地加速和减速,由 BlendExp 控制缓和程度 */
        EaseInOut = 4
    }
    /**
     * @author yunhao.liao
     * @groups 玩法
     * @description 定义如何开始(从零开始，或者从随机值开始)
     */
    enum InitialOscillatorOffset {
        /** 随机值 */
        Random = 0,
        /** 零 */
        Zero = 1
    }
    /**
     * @author yunhao.liao
     * @groups 玩法
     * @description 振荡器波形
     */
    enum OscillatorWaveform {
        /** 正弦波 */
        SineWave = 0,
        /** Perlin噪声 */
        PerlinNoise = 1
    }
    /**
     * @author yunhao.liao
     * @groups 玩法/摄像机
     * @description 横纵比约束
     */
    enum AspectRatioAxisConstraint {
        /** 保持Y轴FOV */
        MaintainYFOV = 0,
        /** 保持X轴FOV */
        MaintainXFOV = 1,
        /** 保持主轴FOV */
        MajorAxisFOV = 2
    }
    /**
     * @author yunhao.liao
     * @groups 玩法/摄像机
     * @description 抖动数据
     */
    interface CameraShakeInfo {
        /** @description x(roll)轴旋转振荡的幅度 */
        rotationXAmplitude?: number;
        /** @description x(roll)轴旋转振荡的频率 */
        rotationXFrequency?: number;
        /** @description y(pitch)轴旋转振荡的幅度 */
        rotationYAmplitude?: number;
        /** @description y(pitch)轴旋转振荡的频率 */
        rotationYFrequency?: number;
        /** @description z(yaw)轴旋转振荡的幅度*/
        rotationZAmplitude?: number;
        /** @description z(yaw)轴旋转振荡的频率 */
        rotationZFrequency?: number;
        /** @description x轴位移振荡的幅度 */
        positionXAmplitude?: number;
        /** @description x轴位移振荡的频率 */
        positionXFrequency?: number;
        /** @description y轴位移振荡的幅度*/
        positionYAmplitude?: number;
        /** @description y轴位移振荡的频率 */
        positionYFrequency?: number;
        /** @description z轴位移振荡的幅度 */
        positionZAmplitude?: number;
        /** @description z轴位移振荡的频率 */
        positionZFrequency?: number;
    }
}

declare namespace mw {
    /**
     * @ignore
     * @hidden
     */
    interface Console {
        error(...data: any[]): void;
        info(...data: any[]): void;
        log(...data: any[]): void;
        warn(...data: any[]): void;
    }
    /**
     * @ignore
     * @hidden
     */
    const console: Console;
    /**
     * @ignore
     * @hidden
     */
    const clearInterval: (id: number | undefined) => void;
    /**
     * @ignore
     * @hidden
     */
    const setInterval: (handler: string | Function, timeout?: number, ...args: any[]) => number;
    /**
     * @ignore
     * @hidden
     */
    const clearTimeout: (id: number | undefined) => void;
    /**
     * @ignore
     * @hidden
     */
    const setTimeout: (handler: string | Function, timeout?: number, ...args: any[]) => number;
}

declare namespace mw {
    /**
     * @author xiangkun.sun
     * @groups 玩法/其他
     * @description 材质实例类
     * @networkStatus usage:双端
     * @example
     * 使用示例:创建一个名为"MaterialExample"的脚本，把脚本挂载到一个模型对象下，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到动态设置材质的效果。代码如下：
     * ```
     * @Component
     * export default class MaterialExample extends Script {
     *     protected onStart(): void {
     *         if (this.gameObject instanceof mw.Model){
     *             // 获取当前Mesh上的材质
     *             const mis = this.gameObject.getMaterialInstance();
     *             mis.forEach(mi => {
     *             // 获取当前材质的浮点参数
     *                 let aspns = mi.getAllScalarParameterName();
     *                 aspns.forEach(aspn => {
     *                     // 设置当前材质的浮点参数
     *                     mi.setScalarParameterValue(aspn, 1);
     *                 });
     *                 // 获取当前材质的颜色参数
     *                 let avpns = mi.getAllVectorParameterName();
     *                 avpns.forEach(avpn => {
     *                     // 设置当前材质的颜色参数
     *                     mi.setVectorParameterValue(avpn, LinearColor.red);
     *                 });
     *                 // 获取当前材质的贴图参数
     *                 let atpns = mi.getAllTextureParameterName();
     *                 atpns.forEach(atpn => {
     *                     // 设置当前材质的贴图参数，确保设置的资源被加载了
     *                     mi.setTextureParameterValue(atpn, "26512");
     *                 });
     *             });
     *         }
     *     }
     * }
     * ```
     */
    class MaterialInstance {
        constructor();
        /**
         * @description 获取浮点参数值
         * @description 标量参数是材质中的一个可调节的数值，可以用于控制材质的各种属性，例如颜色、强度、透明度等。
         * @description 通过获取标量参数的值，可以根据需要在游戏中进行动态调整和使用。
         * @groups 玩法/其他
         * @effect 调用端生效
         * @param parameterName usage: 传入材质标量参数名称  range:参数名称
         * @returns 参数值
         */
        getScalarParameterValue(parameterName: string): number;
        /**
         * @description 设置浮点参数值。
         * @groups 玩法/其他
         * @effect 调用端生效
         * @param parameterName usage: 参数名称 range:
         * @param value usage: 参数值  设置可调节参数的数值为多少。type: 浮点数 range: 不做限制。
         */
        setScalarParameterValue(parameterName: string, value: number): void;
        /**
         * @description 获取颜色参数值
         * @effect 调用端生效
         * @groups 玩法/其他
         * @param parameterName usage: 参数名称  range:
         * @returns 参数值
         */
        getVectorParameterValue(parameterName: string): mw.LinearColor;
        /**
         * @description 设置颜色参数值
         * @groups 玩法/其他
         * @effect 调用端生效
         * @param parameterName usage: 参数名称  range:
         * @param value usage: 参数值  type: 浮点数 range: 不做限制。
         */
        setVectorParameterValue(parameterName: string, value: mw.LinearColor): void;
        /**
         * @description 获取贴图参数值
         * @groups 玩法/其他
         * @effect 调用端生效
         * @param parameterName usage: 参数名称  range:
         * @returns 参数值
         */
        getTextureParameterValue(parameterName: string): string;
        /**
         * @description 设置贴图参数值
         * @groups 玩法/其他
         * @effect 调用端生效
         * @param parameterName usage: 参数名称 range:
         * @param value usage: 参数值  range: 被设置的值，不做限制，合理即可
         */
        setTextureParameterValue(parameterName: string, value: string): void;
        /**
         * @description 返回所有的浮点材质参数
         * @groups 玩法/其他
         * @effect 调用端生效
         * @returns 材质参数数组
         */
        getAllScalarParameterName(): string[];
        /**
         * @description 返回所有的颜色材质参数
         * @groups 玩法/其他
         * @effect 调用端生效
         * @returns 材质参数数组
         */
        getAllVectorParameterName(): string[];
        /**
         * @description 返回所有的贴图材质参数
         * @groups 玩法/其他
         * @effect 调用端生效
         * @returns 材质参数数组
         */
        getAllTextureParameterName(): string[];
        /**
         * @author qiming.jiang
         * @description 获取材质所有属性名称
         * @effect 调用端生效
         * @returns 返回属性名称列表
         */
        getPropertyNames(): Array<string>;
        /**
         * @author qiming.jiang
         * @description 获取材质指定名称属性
         * @effect 调用端生效
         * @param propertyName usage:属性名称 range: 无
         * @returns 属性
         */
        getProperty(propertyName: string): any;
        /**
         * @author qiming.jiang
         * @description 设置材质属性
         * @effect 调用端生效
         * @param propertyName usage:属性名称 range: 无
         * @param value usage:属性值 range: 无
         */
        setProperty(propertyName: string, value: any): void;
    }
}

declare namespace mw {
    /**
     * @author huipeng.jia
     * @description 四轮载具车轮位置
     * @groups 玩法
     */
    enum VehicleWheelPosition4WNew {
        /** 前轮 */
        Front = 0,
        /** 后轮 */
        Rear = 1
    }
    /**
     * @author huipeng.jia
     * @description 四轮载具驱动模式
     * @groups 玩法
     */
    enum VehicleDriveMode4WNew {
        /** 四驱 */
        FourDrive = 0,
        /** 前驱 */
        FrontDrive = 1,
        /** 后驱 */
        RearDrive = 2
    }
    /**
     * @author huipeng.jia
     * @description 四轮载具车轮属性
     * @groups 玩法
     */
    type VehicleWheelDataNew = {
        /** 车轮半径 */
        wheelRadius: number;
        /** 车轮最大转向角度 */
        wheelAngle: number;
        /** 车轮绑定对象ID */
        wheelModel: string;
    };
    /**
     * @author huipeng.jia
     * @description 四轮载具挡位属性
     * @groups 玩法
     */
    type VehicleGearDataNew = {
        /** 挡位级别 */
        gearLevel: number;
        /** 齿比值 */
        gearRatio: number;
        /** 下齿比值 */
        gearDownRatio: number;
        /** 上齿比值 */
        gearUpRatio: number;
    };
    /**
     * @author huipeng.jia
     * @groups 玩法/载具
     * @description 四轮载具
     * @description 四轮载具是指模拟四个车轮的交通工具，例如汽车、卡车等。它们被设计成能够在游戏中自由移动、加速和转向，给玩家带来真实的驾驶体验。
     * @networkStatus usage: 双端
     * @precautions 注意事项
     * 1. 在未设置有效的owner之前，载具不会进行物理模拟，可能会遇到悬空等现象。
     * 2. 载具由set owner时指定的玩家客户端控制。如果想设置载具位置，仅在服务器端设置位置是无效的，需要主控端一起修改。
     * 3. 应注意同一客户端同时控制的载具数量，数量过大会影响载具的同步。建议在5个以内。
     * @example
     * 使用示例: 通过脚本动态创建载具并绑定控制逻辑。创建一个名为"VehicleExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏。按下 Q 键创建载具，走到触发器范围自动上车，WASD 进行驾驶，F 键下车。代码如下：
     * ```
     * enum VehicleEvents {
     *     createVehicle_C2S = "createVehicle_C2S",
     *     createVehicle_S2C = "createVehicle_S2C",
     *     outOfVehicle_local = "outOfVehicle_local",
     * }
     *
     * @Component
     * export default class VehicleSample extends Script {
     *
     *     // 该属性暴露在属性面板中，可以方便的进行调整。
     *     @Property({ displayName: "载具生成位置", hideInEditor: false })
     *     private vehicleSpawnLoc: Vector = new Vector(100, 100, 200);
     *
     *     // 当前控制的载具。
     *     private vehicle: AdvancedVehicle = null;
     *
     *     // 当前载具下面的交互物。
     *     private interactor: Interactor = null;
     *
     *     // 当前载具下面的触发器，用于上下车。
     *     private trigger: Trigger = null;
     *
     *     // 当前绑定的按钮事件handle，用于下车时解除绑定。
     *     private controlEventsHandle: mw.EventListener[] = [];
     *
     *     // 当脚本被实例后，会在第一帧更新前调用此函数。
     *     protected onStart(): void {
     *         AssetUtil.asyncDownloadAsset("14015");
     *
     *         this.bindCreationEvents();
     *     }
     *
     *     // 绑定载具创建的事件
     *     private bindCreationEvents(): void {
     *         if (SystemUtil.isServer()) {
     *             mw.Event.addClientListener(VehicleEvents.createVehicle_C2S, async (player: Player) => {
     *                 // 创建载具。
     *                 this.vehicle = await mw.GameObject.asyncSpawn<mw.AdvancedVehicle> ("Vehicle4W", {
     *                     replicates: true,
     *                     transform: new Transform(this.vehicleSpawnLoc, new Rotation(0, 0, 0), new Vector(1)),
     *                 })
     *
     *                 // 创建触发器。
     *                 this.trigger = await mw.GameObject.asyncSpawn<mw.Trigger> ("Trigger", {
     *                     replicates: true,
     *                 })
     *
     *                 // 创建交互物。
     *                 this.interactor = await mw.GameObject.asyncSpawn<mw.Interactor>("Interactor", {
     *                     replicates: true,
     *                 })
     *
     *                 // 创建一个Box，作为车身。
     *                 const vehicleMesh = await mw.GameObject.asyncSpawn<mw.Model>("197386", {
     *                     replicates: true,
     *                 })
     *
     *                 // 设置父子级关系。
     *                 this.interactor.parent = this.vehicle;
     *                 this.trigger.parent = this.vehicle;
     *                 vehicleMesh.parent = this.vehicle;
     *
     *                 // 调整相对位置，使得玩家上车时刚好坐在Box上，下车时在触发器旁边。
     *                 this.interactor.localTransform.position = new mw.Vector(0, 0, 150);
     *                 this.trigger.localTransform.position = new mw.Vector(0, -100, 0);
     *                 vehicleMesh.localTransform.position= new mw.Vector(0, 0, 50);
     *
     *                 // 通知发起请求的客户端，载具已经创建完成。因为我们只通知了发起请求的客户端，所以每个客户端只能驾驶自己请求创建的载具。
     *                 mw.Event.dispatchToClient(player, VehicleEvents.createVehicle_S2C, [
     *                     this.vehicle.gameObjectId,
     *                     this.trigger.gameObjectId,
     *                     this.interactor.gameObjectId,
     *                 ])
     *             })
     *         } else {
     *             InputUtil.onKeyDown(Keys.Q, () => {
     *                 // 通过RPC调用，在服务器上动态生成载具以及触发器，交互物。
     *                 mw.Event.dispatchToServer(VehicleEvents.createVehicle_C2S);
     *             })
     *
     *             // 客户端监听服务器生成完毕的消息，绑定触发器的事件，实现上下车功能。
     *             mw.Event.addServerListener(VehicleEvents.createVehicle_S2C, async (info: string[]) => {
     *                 const [vehicleGUID, triggerGUID, interactorGUID] = info;
     *                 console.log(`vehicleGUID = [${vehicleGUID}], triggerGUID = [${triggerGUID}], interactorGUID = [${interactorGUID}]`);
     *
     *                 this.vehicle = await GameObject.asyncFindGameObjectById(vehicleGUID) as AdvancedVehicle;
     *                 this.trigger = await GameObject.asyncFindGameObjectById(triggerGUID) as Trigger;
     *                 this.interactor = await GameObject.asyncFindGameObjectById(interactorGUID) as Interactor;
     *
     *                 this.bindInOutVehicleEvents();
     *             })
     *         }
     *     }
     *
     *     // 绑定触发器的事件，实现上下车功能。
     *     private bindInOutVehicleEvents(): void {
     *         // 通过触发器自动上车
     *         this.trigger.onEnter.add(async (chara: Character) => {
     *             // 判断是否是玩家角色触碰的触发器，且是当前玩家。
     *             if (chara && chara.player == await mw.Player.asyncGetLocalPlayer()) {
     *                 // 关闭角色碰撞，避免与载具发生相互作用。
     *                 chara.setCollision(CollisionStatus.Off);
     *                 // 激活交互物，让角色坐在车上。
     *                 this.interactor.enter(chara, mw.HumanoidSlotType.Buttocks, "14015");
     *                 // 设置载具的驾驶员，此时开始模拟物理，可以驾驶。
     *                 this.vehicle.owner = chara.player;
     *                 // 调整一些参数。
     *                 const handle_press_one = InputUtil.onKeyDown(Keys.One, () => {
     *                     // 按下 1 调整载具质量
     *                     this.adjustVehicleMass();
     *                 });
     *                 this.controlEventsHandle.push(handle_press_one);
     *
     *                 const handle_press_two = InputUtil.onKeyDown(Keys.Two, () => {
     *                     // 按下 2 调整载具摩擦力系数
     *                     this.adjustVehicleFriction();
     *                 });
     *                 this.controlEventsHandle.push(handle_press_two);
     *
     *                 const handle_press_three = InputUtil.onKeyDown(Keys.Three, () => {
     *                     // 按下 3 调整载具发动机最大转速
     *                     this.adjustVehicleMaxEngineRPM();
     *                 });
     *                 this.controlEventsHandle.push(handle_press_three);
     *
     *                 const handle_press_four = InputUtil.onKeyDown(Keys.Four, () => {
     *                     // 按下 4 调整载具加速度
     *                     this.adjustVehicleAcceleration();
     *                 });
     *                 this.controlEventsHandle.push(handle_press_four);
     *
     *                 const handle_press_five = InputUtil.onKeyDown(Keys.Five, () => {
     *                     // 按下 5 调整载具制动力矩
     *                     this.adjustVehicleBrakingTorque();
     *                 });
     *                 this.controlEventsHandle.push(handle_press_five);
     *
     *                 this.VehicleKeyEvents();
     *             }
     *         })
     *
     *         // 监听下车事件。
     *         mw.Event.addLocalListener(VehicleEvents.outOfVehicle_local, async () => {
     *             const player = await Player.asyncGetLocalPlayer();
     *             // 设置下车位置在触发器左边。
     *             const outOfVehicleLoc = this.trigger.worldTransform.position.add(new Vector(0, -100, 50));
     *             // 结束交互，角色下车。
     *             this.interactor.leave(outOfVehicleLoc);
     *             // 开启角色碰撞，避免掉下地面和其它碰撞不正确的问题。
     *             player.character.setCollision(CollisionStatus.On);
     *             // 清空载具驾驶员，此时依然会模拟物理，但无法继续控制。
     *             this.vehicle.owner = null;
     *
     *             this.clearControlEvents();
     *         })
     *     }
     *
     *     // 通过按钮控制载具移动。
     *     private VehicleKeyEvents() {
     *         this.clearControlEvents();
     *
     *         //按下UP键，载具加油前进；
     *         const handle_up_1 = InputUtil.onKeyDown(Keys.W, () => {
     *             this.vehicle.throttleInput = 1;
     *         });
     *         const handle_up_0 = InputUtil.onKeyUp(Keys.W, () => {
     *             this.vehicle.throttleInput = 0;
     *         });
     *         this.controlEventsHandle.push(handle_up_1, handle_up_0);
     *
     *         //按下Down键，载具减速后退；
     *         const handle_down_1 = InputUtil.onKeyDown(Keys.S, () => {
     *             this.vehicle.throttleInput = -1;
     *         });
     *         const handle_down_0 = InputUtil.onKeyUp(Keys.S, () => {
     *             this.vehicle.throttleInput = 0;
     *         });
     *         this.controlEventsHandle.push(handle_down_1, handle_down_0);
     *
     *         //按下LEFT键，载具左转；
     *         const handle_left_1 = InputUtil.onKeyDown(Keys.A, () => {
     *             this.vehicle.steeringInput = -1;
     *         });
     *         const handle_left_0 = InputUtil.onKeyUp(Keys.A, () => {
     *             this.vehicle.steeringInput = 0;
     *         });
     *         this.controlEventsHandle.push(handle_left_1, handle_left_0);
     *
     *         //按下RIGHT键，载具右转；
     *         const handle_right_1 = InputUtil.onKeyDown(Keys.D, () => {
     *             this.vehicle.steeringInput = 1;
     *         });
     *         const handle_right_0 = InputUtil.onKeyUp(Keys.D, () => {
     *             this.vehicle.steeringInput = 0;
     *         });
     *         this.controlEventsHandle.push(handle_right_1, handle_right_0);
     *
     *         //按下SpaceBar键，载具刹车；
     *         const handle_spaceBar_1 = InputUtil.onKeyDown(Keys.SpaceBar, () => {
     *             this.vehicle.handbrakeInputEnable = true;
     *         });
     *         const handle_spaceBar_0 = InputUtil.onKeyUp(Keys.SpaceBar, () => {
     *             this.vehicle.handbrakeInputEnable = false;
     *         });
     *         this.controlEventsHandle.push(handle_spaceBar_1, handle_spaceBar_0);
     *
     *         //按下F键，下车。
     *         const handle_f = InputUtil.onKeyDown(Keys.F, () => {
     *             mw.Event.dispatchToLocal(VehicleEvents.outOfVehicle_local);
     *         });
     *         this.controlEventsHandle.push(handle_f);
     *     }
     *
     *     // 解除绑定的按钮事件。
     *     private clearControlEvents(): void {
     *         for (const handle of this.controlEventsHandle) {
     *             handle.isConnected && handle.disconnect();
     *         }
     *
     *         this.controlEventsHandle = [];
     *     }
     *
     *     // 调整载具质量（1500与10000来回切换）。
     *     private adjustVehicleMass(): void {
     *         if (this.vehicle.mass == 1500) {
     *             this.vehicle.mass = 10000;
     *         } else {
     *             this.vehicle.mass = 1500;
     *         }
     *     }
     *
     *     // 调整载具摩擦力系数（0.01与3来回切换）。
     *     private adjustVehicleFriction(): void {
     *         if (this.vehicle.friction == 3) {
     *             this.vehicle.friction = 0.01;
     *         } else {
     *             this.vehicle.friction = 3;
     *         }
     *     }
     *
     *     // 调整载具发动机最大转速（1000与6000来回切换）。
     *     private adjustVehicleMaxEngineRPM(): void {
     *         if (this.vehicle.maxEngineRPM == 6000) {
     *             this.vehicle.maxEngineRPM = 1000;
     *         } else {
     *             this.vehicle.maxEngineRPM = 6000;
     *         }
     *     }
     *
     *     // 调整载具加速度（0.1与1来回切换）。
     *     private adjustVehicleAcceleration(): void {
     *         if (this.vehicle.acceleration == 1) {
     *             this.vehicle.acceleration = 0.1;
     *         } else {
     *             this.vehicle.acceleration = 1;
     *         }
     *     }
     *
     *     // 调整载具制动力矩（0与1500来回切换）。
     *     private adjustVehicleBrakingTorque(): void {
     *         if (this.vehicle.brakingTorque == 1500) {
     *             this.vehicle.brakingTorque = 0;
     *         } else {
     *             this.vehicle.brakingTorque = 1500;
     *         }
     *     }
     * }
     * ```
     */
    class AdvancedVehicle extends mw.GameObject {
        /**
          * @description 与玩家之间超出此距离的对象将被剪裁，最终的裁剪距离会和画质等级有关；修改此属性≤0时，裁剪距离会根据对象尺寸自动调整(自动启用CullDistanceVolume功能)
          * @groups 玩法/载具
          * @effect 调用端生效
          * @precautions 最终的裁剪距离会和画质等级有关
          * @param inCullDistance usage:裁剪距离 range: 建议 (2000, 4000)  type: 浮点数
          */
        setCullDistance(inCullDistance: number): void;
        /** ------------------------------------------ 新增的标准API ------------------------------------------ */
        /**
         * @description 设置载具驾驶员。只有驾驶员才可以操作载具。
         * @groups 玩法/载具
         * @effect 双端生效
         */
        set owner(inOwner: mw.Player);
        /**
         * @description 获取载具驾驶员。
         * @groups 玩法/载具
         * @effect 双端生效
         */
        get owner(): mw.Player;
        /**
         * @description 控制载具前进/后退，设置油门大小，取值范围[-1,1]，大于0时加速，小于0则减速。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @range [-1, 1]，大于0时加速，小于0则减速。
         * @type float
         * @param newInput usage: 设置值 default: 0
         * @precautions
         * 1. 注意输入参数的取值范围。输入100和1没有区别。
         * 2. 输入值发生变化时，调用一次即可。输入值会保持，不需要持续调用。
         * @example
         * 使用示例: 用按钮和摇杆控制载具
         * ```
         *    // 通过按钮控制载具油门
         *    this.btn_forward.onPressed.add(() => {
         *        vehicle.throttleInput = 1;
         *    })
         *
         *    this.btn_forward.onReleased.add(() => {
         *        vehicle.throttleInput = 0;
         *    })
         *
         *    // 通过摇杆控制载具，摇杆会同时提供两个轴向(x, y)的输入
         *    this.joystick.onInputDir.add((vec: mw.Vector2) => {
         *        // 控制油门
         *        vehicle.throttleInput = vec.y;
         *        // 控制转向
         *        vehicle.steeringInput = vec.x;
         *    })
         * ```
         */
        set throttleInput(newInput: number);
        /**
         * @description 控制载具左/右转向，设置转向幅度，取值范围[-1,1]，大于0时右转，小于0则左转。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @range [-1, 1]，大于0时右转，小于0则左转。
         * @type float
         * @param newInput usage: 设置值 default: 0
         * @precautions
         * 1. 注意输入参数的取值范围。输入100和1没有区别。
         * 2. 输入值发生变化时，调用一次即可。输入值会保持，不需要持续调用。
         * @example
         * 使用示例: 用按钮和摇杆控制载具
         * ```
         *    // 通过按钮控制载具油门
         *    this.btn_forward.onPressed.add(() => {
         *        vehicle.setThrottleInput(1);
         *    })
         *
         *    this.btn_forward.onReleased.add(() => {
         *        vehicle.setThrottleInput(0);
         *    })
         *
         *    // 通过摇杆控制载具，摇杆会同时提供两个轴向(x, y)的输入
         *    this.joystick.onInputDir.add((vec: mw.Vector2) => {
         *        // 控制油门
         *        vehicle.setThrottleInput(vec.y);
         *        // 控制转向
         *        vehicle.setSteeringInput(vec.x);
         *    })
         * ```
         */
        set steeringInput(newInput: number);
        /**
         * @description 是否进行手刹，true-进行制动, false-取消制动。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @param useHandbrake usage: 是否进行手刹，true-进行制动, false-取消制动。default: false
         * @precautions 输入值发生变化时，调用一次即可。输入值会保持，不需要持续调用。
         */
        set handbrakeInputEnable(useHandbrake: boolean);
        /**
         * @description 设置四轮载具是否开启物理模拟计算，需要在客户端调用。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @precautions 四轮载具只在set owner成功后才会进行物理模拟。此时关闭物理模拟将无法继续驱动载具移动。
         * @param shouldSimulate usage: 是否启用物理模拟。true-启用，false-不启用 default: true
         */
        set simulatePhysics(shouldSimulate: boolean);
        /**
         * @description 设置当前档位级别。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @range [-1, 设定的最大档位]
         * @type integer
         * @param level usage: 将要切换到的档位 default: 0
         * @precautions
         * 1. 注意输入参数的取值范围。
         * 2. 设置与当前车速不匹配的档位，会自动调整到匹配的档位。如当前车速适应1档，直接设置3档，会逐级（3-2-1）降到1档。
         */
        set currentGearLevel(level: number);
        /**
         * @description 获取当前档位级别。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @returns 当前档位级别
         */
        get currentGearLevel(): number;
        /**
         * @description 设置载具质量，单位：千克（kg）。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @range [0.01, 100000]
         * @type float
         * @param mass usage: 设置值 default: 1500
         * @precautions
         * 1. 注意输入参数的取值范围。设置较小的质量，会出现载具抖动等非预期表现。
         * 2. 运行时设置质量，会重新初始化载具，清除任何运行状态。如载具在行驶，设置质量后会停在原地。
         */
        set mass(mass: number);
        /**
         * @description 获取质量。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @returns 载具质量，单位：千克（kg）
         */
        get mass(): number;
        /**
         * @description 设置载具车轮摩擦力系数
         * @groups 玩法/载具
         * @effect 调用端生效
         * @range [0.01, 8]
         * @type float
         * @param friction usage: 新的摩擦力系数 default: 3
         */
        set friction(friction: number);
        /**
         * @description 获取载具摩擦力系数。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @returns 载具摩擦力系数
         */
        get friction(): number;
        /**
         * @description 获取载具驱动模式。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @returns 载具驱动模式
         */
        get driveMode(): VehicleDriveMode4WNew;
        /**
         * @description 设置最大发动机转速。单位：转/分（r/min）
         * @groups 玩法/载具
         * @effect 调用端生效
         * @range [100, 5000000]
         * @type float
         * @param RPM usage: 新的载具发动机转速 default: 6000
         */
        set maxEngineRPM(RPM: number);
        /**
         * @description 获取最大发动机转速。单位：转/分（r/min）
         * @groups 玩法/载具
         * @effect 调用端生效
         * @returns 载具发动机转速
         */
        get maxEngineRPM(): number;
        /**
         * @description 设置加速度。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @range [0.01, 100]
         * @type float
         * @param acceleration usage: 新的加速系数 default: 1
         */
        set acceleration(acceleration: number);
        /**
         * @description 获取加速度。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @returns 载具加速系数
         */
        get acceleration(): number;
        /**
         * @description 获取最大档位级别。如返回值为4，则表示有[-1, 0, 1, 2, 3, 4]这些档位。
         * @groups 玩法/载具
         * @precautions 最大可切换到的档位。如获取当前档位，请使用getCurrentGearLevel
         * @effect 调用端生效
         * @returns 最大档位级别
         */
        get maxGearLevel(): number;
        /**
         * @description 获取当前行驶速度，单位：米/秒（m/s）。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @returns 当前行驶速度
         */
        get velocity(): number;
        /**
         * @description 设置制动力矩。单位：牛*米（N*m）
         * @groups 玩法/载具
         * @effect 调用端生效
         * @range [0, 1000000]
         * @type float
         * @param Torque usage: 新的制动力矩 default: 1500
         */
        set brakingTorque(Torque: number);
        /**
         * @description 获取制动力矩。单位：牛*米（N*m）
         * @description 车辆制动力矩是指应用于车辆制动系统的力矩，用于减速或停止车辆运动。它是制动系统产生的力矩，通过制动器（如刹车盘和刹车片）施加到车轮上，从而减少车轮的旋转速度。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @returns 当前制动力矩
         */
        get brakingTorque(): number;
        /**
         * @description 获取车轮数量。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @returns 车轮数量
         */
        get wheelNum(): number;
        /**
         * @description 获取指定档位属性
         * @groups 玩法/载具
         * @effect 调用端生效
         * @precautions 注意输入参数的取值范围
         * @param gearLevel usage: 指定档位级别  range: [0, 1]  type: 浮点数
         * @returns 指定档位属性
         */
        getGearData(gearLevel: number): VehicleGearDataNew;
        /**
         * @description 升一档，立即切换。
         * @groups 玩法/载具
         * @effect 调用端生效
         */
        gearUp(): void;
        /**
         * @description 降一档，立即切换。
         * @groups 玩法/载具
         * @effect 调用端生效
         */
        gearDown(): void;
        /**
         * @description 获取车轮最大转向角度，单位：度（°）。
         * @description 注意输入参数的取值范围。当前为四轮载具，[0, 1, 2, 3]分别对应[左前, 右前, 左后, 右后]。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @param wheelId usage: 根据序号指定车轮 <br>  range: 0.1.2.3 四个参数  type:整数
         * @returns 指定车轮最大转向角度
         */
        getWheelMaxSteerAngle(wheelId: number): number;
        /**
         * @description 获取车轮半径，单位：厘米（cm）。
         * @description 注意输入参数的取值范围。当前为四轮载具，[0, 1, 2, 3]分别对应[左前, 右前, 左后, 右后]。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @param wheelId usage: 根据序号指定车轮  <br>  range: 0.1.2.3 四个参数  type:整数
         * @returns 指定车轮半径
         */
        getWheelRadius(wheelId: number): number;
        /**
         * @description 设置车轮半径，单位：厘米（cm）。
         * @description 注意输入参数的取值范围。当前为四轮载具，[0, 1, 2, 3]分别对应[左前, 右前, 左后, 右后]。仅在上车前生效，上车后调用此接口无效果。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @param wheelId usage: 根据序号指定车轮 <br>  range: 0.1.2.3 四个参数  type:整数
         * @param Radius usage: 指定车轮半径  range:不做限制，合理即可  type: 浮点数
         */
        setWheelRadius(wheelId: number, Radius: number): void;
        /**
         * @description 获取轮胎绑定对象。
         * @description 注意输入参数的取值范围。当前为四轮载具，[0, 1, 2, 3]分别对应[左前, 右前, 左后, 右后]。
         * @groups 玩法/载具
         * @effect 调用端生效
         * @param wheelId usage: 根据序号指定车轮  <br>  range: 0.1.2.3 四个参数  type:整数
         * @returns 指定轮胎绑定对象GUID
         */
        getWheelModel(wheelId: number): string;
        /**
         * @description 销毁
         * @groups 玩法/载具
         * @effect 调用端生效
         */
        protected onDestroy(): void;
    }
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @groups 玩法/其他
     * @description 禁行区
     * @description 用于控制角色是否可以进出此区域。
     * @precautions 该对象各端生成，通行许可由服务器同步到客户端
     * @networkStatus usage:双端
     * @example
     * 使用示例:创建一个名为"BlockingVolExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，替换GUID保存，运行游戏，你将可以通过该GUID对应的禁行区。代码如下：
     * ```
     * @Component
     * export default class BlockingVolExample extends Script {
     *     // 当脚本被实例后，会在第一帧更新前调用此函数
     *     protected async onStart(): Promise<void> {
     *         // 获取当前玩家
     *         let player = await mw.Player.asyncGetLocalPlayer();
     *         // GUID根据实际情况填写，可在编辑器对象管理器内右键复制对象ID
     *         let blockingVolume = await GameObject.asyncFindGameObjectById(`GUID`) as BlockingVolume;
     *         if(SystemUtil.isClient())
     *         {
     *             mw.InputUtil.onKeyDown(Keys.F1,()=>{
     *                 // F1键 通知服务器执行事件 参数传入当前玩家
     *                 mw.Event.dispatchToServer(`AddPlayerPassable`,player);
     *             })
     *         }
     *         if(SystemUtil.isServer()){
     *             // 侦听客户端通知
     *             mw.Event.addClientListener(`AddPlayerPassable`,(player : Player)=>{
     *             // 玩家角色添加通行许可
     *             blockingVolume.addPassableTarget(player.character);
     *             })
     *         }
     *     }
     * }
     * ```
     */
    class BlockingVolume extends mw.GameObject {
        /**
         * @author baoqiang.han
         * @description 为目标添加通过该区域的权限
         * @groups 玩法/其他
         * @effect 调用端自动广播
         * @param target usage:GameObject
         * @example
         * 使用示例: 针对此禁行区为其他GameObject添加通行许可
         * ```
         *  // 获取当前玩家
         *  let player =  Player.localPlayer;
         *  // GUID根据实际情况填写，可在编辑器对象管理器内右键复制对象ID
         *  let blockingVolume = await GameObject.asyncFindGameObjectById(`GUID`) as BlockingVolume;
         *  if(SystemUtil.isClient())
         *  {
         *      InputUtil.onKeyDown(Keys.F1,()=>{
         *          // F1键 通知服务器执行事件 参数传入当前玩家
         *          mw.Event.dispatchToServer(`AddPlayerPassable`,player);
         *      })
         *  }
         *  if(SystemUtil.isServer()){
         *      // 侦听客户端通知
         *      mw.Event.addClientListener(`AddPlayerPassable`,(player : Player)=>{
         *      // 玩家角色添加通行许可
         *      blockingVolume.addPassableTarget(player.character);
         *      })
         *  }
         * ```
         */
        addPassableTarget(target: mw.GameObject): void;
        /**
         * @author baoqiang.han
         * @description 移除目标通过该区域的权限
         * @groups 玩法/其他
         * @effect 调用端自动广播
         * @param target usage:GameObject
         * @example
         * 使用示例: 针对此禁行区为其他GameObject移除通行许可
         * ```
         *  // 获取当前玩家
         *  let player =  Player.localPlayer;
         *  // GUID根据实际情况填写，可在编辑器对象管理器内右键复制对象ID
         *  let blockingVolume = await GameObject.asyncFindGameObjectById(`GUID`) as BlockingVolume;
         *  if(SystemUtil.isClient())
         *  {
         *      InputUtil.onKeyDown(Keys.F2,()=>{
         *          // F2键 通知服务器执行事件 参数传入当前玩家
         *          mw.Event.dispatchToServer(`RemovePlayerPassable`,player);
         *      })
         *  }
         *  if(SystemUtil.isServer()){
         *      // 侦听客户端通知
         *      mw.Event.addClientListener(`RemovePlayerPassable`,(player : Player)=>{
         *      // 玩家角色移除通行许可
         *      blockingVolume.removePassableTarget(player.character);
         *      })
         *  }
         * ```
         */
        removePassableTarget(target: mw.GameObject): void;
        /**
         * @author baoqiang.han
         * @description 获得目标通过该区域的权限
         * @groups 玩法/其他
         * @effect 调用端生效
         * @param target usage:GameObject
         * @returns bool
         * @example
         * 使用示例: 获取此禁行区对某GameObject的通行许可
         * ```
         *  // 获取当前玩家
         *  let player = Player.localPlayer;
         *  // GUID根据实际情况填写，可在编辑器对象管理器内右键复制对象ID
         *  let blockingVolume = await GameObject.asyncFindGameObjectById(`GUID`) as BlockingVolume;
         *  InputUtil.onKeyDown(Keys.F3,()=>{
         *      // F3键 获取玩家角色的通行权限
         *      blockingVolume.getTargetPassable(player.character);
         *  })
         * ```
         */
        getTargetPassable(target: mw.GameObject): boolean;
        /**
         * @author baoqiang.han
         * @description 重置禁行区
         * @groups 玩法/其他
         * @effect 调用端自动广播
         * @example
         * 使用示例: 重置该禁行区发布的所有通行许可
         * ```
         *   // GUID根据实际情况填写，可在编辑器对象管理器内右键复制对象ID
         *  let blockingVolume = await GameObject.asyncFindGameObjectById(`GUID`) as BlockingVolume;
         *  if(SystemUtil.isClient())
         *  {
         *      InputUtil.onKeyDown(Keys.F4,()=>{
         *          // F4键 通知服务器执行事件
         *          mw.Event.dispatchToServer(`Clear`);
         *      })
         *  }
         *  if(SystemUtil.isServer()){
         *      // 侦听客户端通知
         *      mw.Event.addClientListener(`Clear`,()=>{
         *      // 重置该禁行区通行许可
         *      blockingVolume.clear();
         *      })
         *  }
         * ```
         */
        clear(): void;
        /**
         * @author baoqiang.han
         * @description 开放禁行区
         * @groups 玩法/其他
         * @effect 调用端自动广播
         * @example
         * 使用示例: 开放该禁行区
         * ```
         *  // GUID根据实际情况填写，可在编辑器对象管理器内右键复制对象ID
         *  let blockingVolume = await GameObject.asyncSpawn<BlockingVolume>(`BlockingVolume`);
         *  if(SystemUtil.isClient())
         *  {
         *      InputUtil.onKeyDown(Keys.F5,()=>{
         *          // F5键 通知服务器执行事件
         *          mw.Event.dispatchToServer(`UnblockAll`);
         *      })
         *  }
         *  if(SystemUtil.isServer()){
         *      // 侦听客户端通知
         *      mw.Event.addClientListener(`UnblockAll`,()=>{
         *      // 该禁行区开放通行
         *      blockingVolume.unblockAll();
         *      })
         *  }
         * ```
         */
        unblockAll(): void;
    }
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @groups 场景/特效
     * @description 特效
     * @description 通常用于游戏场景中的效果表现，如火焰，水流，武器拖尾等，当编辑器细节面板勾选自动启用时，运行游戏会自动播放特效。
     * @description 如需精确控制特效的播放与停止，请使用 play 和 stop 方法。不同特效有不同的生命周期，部分特效可通过细节面板中参数调节。
     * @networkStatus usage:客户端
     * @example
     * 使用示例:创建一个名为"EffectExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到粒子特效炸裂的效果。代码如下：
     * ```
     * @Component
     * export default class EffectExample extends Script {
     *
     *     private readonly effect = {
     *         assetID: "145884",
     *         object: null as mw.Effect,
     *     };
     *
     *     protected onStart(): void {
     *         this.createEffect();
     *     }
     *
     *     @RemoteFunction(Client)
     *     public async createEffect(): Promise<void> {
     *         const success = await mw.AssetUtil.asyncDownloadAsset(this.effect.assetID);
     *             if (success) {
     *                 // 下载完毕创建特效
     *                 this.effect.object = await mw.GameObject.asyncSpawn(this.effect.assetID) as mw.Effect;
     *
     *                 // 设置特效transform
     *                 const transform = new mw.Transform(new mw.Vector(500, 0, 0), new mw.Rotation(0, 0, 0), new mw.Vector(1, 1, 1));
     *                 this.effect.object.localTransform = transform;
     *
     *                 // 播放特效
     *                 this.effect.object.play();
     *                 // 设置特效参数Life标量值
     *                 this.effect.object.setFloat("LifeTime", 10);
     *                 // 设置特效参数Speed向量值
     *                 this.effect.object.setVector("Speed", new mw.Vector(0,0,150));
     *                 // 设置特效参数Color颜色值
     *                 this.effect.object.setColor("Color", new mw.LinearColor(1,0,0,1));
     *             }
     *     }
     * }
     * ```
     */
    class Effect extends mw.GameObject {
        /**
         * @description 特效播放完毕事件
         * @groups 场景/特效
         */
        onFinish: mw.MulticastDelegate<() => void>;
        /**
         * @description 播放特效
         * @groups 场景/特效
         * @param onSuccess usage:特效播放完成后回调 default: null
         * @effect 调用端生效
         */
        play(onSuccess?: () => void | void): void;
        /**
         * @description 停止特效，不影响已经生成的粒子
         * @groups 场景/特效
         * @effect 调用端生效
         */
        stop(): void;
        /**
         * @description 强制停止特效，所有粒子全部销毁
         * @groups 场景/特效
         * @effect 调用端生效
         */
        forceStop(): void;
        /**
         * @description 设置特效标量参数值
         * @groups 场景/特效
         * @param parameterName usage:参数名 range: 想要设置的特效标量参数名字长度
         * @param value usage:标量值  range: 不做限制  type: 浮点数
         * @effect 只在客户端调用生效
         */
        setFloat(parameterName: string, value: number): void;
        /**
         * @description 设置特效标量参数随机
         * @groups 场景/特效
         * @param parameterName usage:参数名 range: 想要设置的特效标量参数名字长度
         * @param maxValue usage:标量最大值  range: 不做限制  type: 浮点数
         * @param minValue usage:标量最小值  range: 不做限制  type: 浮点数
         * @effect 只在客户端调用生效
         */
        setFloatRandom(parameterName: string, maxValue: number, minValue: number): void;
        /**
         * @description 设置特效向量参数值
         * @groups 场景/特效
         * @param parameterName usage:参数名 range: 想要设置的特效标量参数名字长度
         * @param value usage:向量值
         * @effect 只在客户端调用生效
         */
        setVector(parameterName: string, value: mw.Vector): void;
        /**
         * @description 设置特效向量参数范围随机，在一定范围内取向量的随机值
         * @groups 场景/特效
         * @param parameterName usage:参数名  range: 合理即可 range: 想要设置的特效标量参数名字长度
         * @param maxValue usage:向量最大值
         * @param minValue usage:向量最小值
         * @effect 只在客户端调用生效
         */
        setVectorRandom(parameterName: string, maxValue: mw.Vector, minValue: mw.Vector): void;
        /**
         * @description 设置特效颜色参数值
         * @description 特效颜色参数为特效选中之后右侧属性面板“特效参数控制”中的"color"字段。
         * @description 存在一个特效可以设置多个颜色属性的情况，如："color01"、"color02"。
         * @groups 场景/特效
         * @param parameterName usage:参数名  range: 想要设置的颜色参数值对应的字段
         * @param value usage:颜色变量
         * @effect 只在客户端调用生效
         */
        setColor(parameterName: string, value: mw.LinearColor): void;
        /**
         * @description 设置特效颜色参数随机
         * @description 特效颜色参数为特效选中之后右侧属性面板“特效参数控制”中的"color"字段。
         * @groups 场景/特效
         * @param parameterName usage:参数名  range: 想要设置的颜色参数值对应的字段
         * @param maxValue usage:颜色变量最大值
         * @param minValue usage:颜色变量最小值
         * @effect 只在客户端调用生效
         */
        setColorRandom(parameterName: string, maxValue: mw.LinearColor, minValue: mw.LinearColor): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:032 reason:接口废弃 replacement: setColor
         * @description 设置特效遮罩颜色
         * @groups 场景/特效
         * @effect 只在客户端调用生效
         * @param EffectColor usage:特效遮罩颜色
         */
        set maskcolor(effectColor: mw.LinearColor);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:032 reason:接口废弃 replacement: setColor
         * @description 获取特效遮罩颜色
         * @groups 场景/特效
         * @effect 只在客户端调用生效
         * @returns 特效当前遮罩颜色
         */
        get maskcolor(): mw.LinearColor;
        /**
         * @description 获取特效单次播放时长(s)
         * @groups 场景/特效
         * @effect 只在客户端调用生效
         * @returns 特效单次播放时长
         */
        get timeLength(): number;
        /**
          * @description 与玩家之间超出此距离的对象将被剪裁，最终的裁剪距离会和画质等级有关；修改此属性≤0时，裁剪距离会根据对象尺寸自动调整(自动启用CullDistanceVolume功能)
          * @groups 场景/特效
          * @effect 只在客户端调用生效
          * @precautions 最终的裁剪距离会和画质等级有关
          * @param inCullDistance usage:裁剪距离 range: 建议 (2000, 4000)  type: 浮点数
          */
        setCullDistance(inCullDistance: number): void;
        /**
         * @description 设置特效循环，不再生效
         * @groups 场景/特效
         * @param NewLoop usage:是否循环
         * @effect 只在客户端调用生效
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 027 reason: 删除接口 replacement: 非循环特效直接使用LoopCount，循环特效请使用Duration，值为0则表示需要一直播放
         */
        set loop(NewLoop: boolean);
        /**
         * @description 获取是否为循环特效
         * @groups 场景/特效
         * @effect 只在客户端调用生效
         * @returns 是否为循环特效
         */
        get loop(): boolean;
        /**
         * @description 设置特效循环次数，仅对非永久循环特效有效
         * @groups 场景/特效
         * @param NewLoopCount usage:循环的次数
         * @effect 只在客户端调用生效
         */
        set loopCount(NewLoopCount: number);
        /**
         * @description 获取特效循环次数，仅对非永久循环特效有效
         * @groups 场景/特效
         * @returns 循环的次数
         * @effect 只在客户端调用生效
         */
        get loopCount(): number;
        /**
         * @description 设置特效持续时间，仅对循环特效有效
         * @groups 场景/特效
         * @param NewDuration usage:播放的时间
         * @effect 只在客户端调用生效
         */
        set duration(NewDuration: number);
        /**
         * @description 获取特效循环次数，仅对非永久循环特效有效
         * @groups 场景/特效
         * @returns 循环的次数
         * @effect 只在客户端调用生效
         */
        get duration(): number;
    }
}

declare namespace mw {
    /**
     * @author yunhao.liao
     * @description 环境雾预设枚举
     * @groups 场景/灯光
     */
    enum FogPreset {
        /** 默认 */
        Default = 0,
        /** 大气雾(近) */
        NearFog = 1,
        /** 大气雾(远) */
        FarFog = 2,
        /** 地下雾 */
        UndergroundFog = 3,
        /** 沙漠雾 */
        DesertFog = 4
    }
    /**
     * @author yunhao.liao
     * @groups 场景/灯光
     * @description 环境雾
     * @description ----------------------------------
     * @description 环境雾是一种大气效果，可以模拟雾、大气灰尘等渲染真实的大气效果，在场景中制造云雾缭绕的氛围感。
     * @description     环境雾中的属性与方法均为 static ， Fog 直接调用即可设置环境雾。其中比较常用的有：
     * @description     - enabled 静态属性开启设为 TRUE 才可使用环境雾功能。
     * @description     - directionalInscatteringColor 静态属性表示雾的颜色。
     * @description     - density 静态属性表示雾的密度。
     * @description     - startDistance 静态属性表示雾与摄像机的距离。
     * @networkStatus usage:客户端
     */
    class Fog {
        /**
         * @description 获取是否启用环境雾
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 是否启用
         */
        static get enabled(): boolean;
        /**
         * @description 设置是否启用环境雾
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:是否启用
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果
         * 创建一个名为"FogExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过1和2键控制雾开启关闭
         * ```
         * @Component
         * export default class FogExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 开启雾效
         *                 Fog.enabled = true;
         *             });
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 // 关闭雾效
         *                 Fog.enabled = false;
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static set enabled(value: boolean);
        /**
         * @description 获取雾密度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 雾密度
         */
        static get density(): number;
        /**
         * @description 设置雾密度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:雾密度
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果
         * 创建一个名为"FogExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过1和2键控制雾密度
         * ```
         * @Component
         * export default class FogExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 增加雾密度
         *                 Fog.density += 1;
         *             });
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 // 减少雾密度
         *                 Fog.density -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static set density(value: number);
        /**
         * @description 获取雾衰弱高度(控制密度如何随着高度的降低而增加.值越小,可见过渡越大.)
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 雾衰弱高度
         */
        static get heightFalloff(): number;
        /**
         * @description 设置雾衰弱高度(控制密度如何随着高度的降低而增加.值越小,可见过渡越大.)
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:雾衰弱高度
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果
         * 创建一个名为"FogExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过1和2键控制雾衰弱高度
         * ```
         * @Component
         * export default class FogExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 增加雾衰弱高度
         *                 Fog.heightFalloff += 1;
         *             });
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 // 减少雾衰弱高度
         *                 Fog.heightFalloff -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static set heightFalloff(value: number);
        /**
         * @description 获取雾高度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 雾高度
         */
        static get height(): number;
        /**
         * @description 设置雾高度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:雾高度
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果
         * 创建一个名为"FogExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过1和2键控制雾高度
         * ```
         * @Component
         * export default class FogExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 增加雾高度
         *                 Fog.height += 1;
         *             });
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 // 减少雾高度
         *                 Fog.height -= 1;
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static set height(value: number);
        /**
         * @description 获取雾散射颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 雾散射颜色
         */
        static get inscatteringColor(): mw.LinearColor;
        /**
         * @description 设置雾散射颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:雾散射颜色
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果
         * 创建一个名为"FogExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过1键控制雾散射颜色
         * ```
         * @Component
         * export default class FogExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 设置雾散射颜色
         *                 Fog.inscatteringColor = LinearColor.red;
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static set inscatteringColor(value: mw.LinearColor);
        /**
         * @description 获取雾最大透明度(值为1表示雾可以在远处变得完全不透明并完全替换场景颜色,值为0表示根本不会考虑雾颜色.)
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 雾最大透明度
         */
        static get maxOpacity(): number;
        /**
         * @description 设置雾最大透明度(值为1表示雾可以在远处变得完全不透明并完全替换场景颜色,值为0表示根本不会考虑雾颜色.)
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:雾最大透明度
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果
         * 创建一个名为"FogExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过1和2键控制雾最大透明度
         * ```
         * @Component
         * export default class FogExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 增加雾最大透明度
         *                 Fog.maxOpacity += 0.1;
         *             });
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 // 减少雾最大透明度
         *                 Fog.maxOpacity -= 0.1;
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static set maxOpacity(value: number);
        /**
         * @description 获取雾起始距离(到摄像机的距离)
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 雾起始距离
         */
        static get startDistance(): number;
        /**
         * @description 设置雾起始距离(到摄像机的距离)
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:雾起始距离
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果
         * 创建一个名为"FogExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过1和2键控制雾起始距离
         * ```
         * @Component
         * export default class FogExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 增加雾起始距离
         *                 Fog.startDistance += 0.1;
         *             });
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 // 减少雾起始距离
         *                 Fog.startDistance -= 0.1;
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static set startDistance(value: number);
        /**
         * @description 获取太阳光散射指数,控制定向散射锥的大小,该圆锥用于近似来自太阳光的散射.
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 太阳光散射指数
         */
        static get directionalInscatteringExponent(): number;
        /**
         * @description 设置太阳光散射指数,控制定向散射锥的大小,该圆锥用于近似来自太阳光的散射.
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:太阳光散射指数
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果
         * 创建一个名为"FogExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过1和2键控制太阳光散射指数
         * ```
         * @Component
         * export default class FogExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 增加太阳光散射指数
         *                 Fog.directionalInscatteringExponent += 0.1;
         *             });
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 // 减少太阳光散射指数
         *                 Fog.directionalInscatteringExponent -= 0.1;
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static set directionalInscatteringExponent(value: number);
        /**
         * @description 获取太阳光散射初始距离,控制与定向散射查看器的起始距离,定向散射用于近似太阳光的散射.
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 太阳光散射初始距离
         */
        static get directionalInscatteringStartDistance(): number;
        /**
         * @description 设置太阳光散射初始距离,控制与定向散射查看器的起始距离,定向散射用于近似太阳光的散射.
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:太阳光散射初始距离
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果
         * 创建一个名为"FogExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过1和2键控制太阳光散射初始距离
         * ```
         * @Component
         * export default class FogExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 增加太阳光散射初始距离
         *                 Fog.directionalInscatteringStartDistance += 0.1;
         *             });
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 // 减少太阳光散射初始距离
         *                 Fog.directionalInscatteringStartDistance -= 0.1;
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static set directionalInscatteringStartDistance(value: number);
        /**
         * @description 获取太阳光散射颜色,控制定向散射的颜色,该颜色用于近似太阳光的散射.
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 太阳光散射颜色
         */
        static get directionalInscatteringColor(): mw.LinearColor;
        /**
         * @description 设置太阳光散射颜色,控制定向散射的颜色,该颜色用于近似太阳光的散射.
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:太阳光散射颜色
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果
         * 创建一个名为"FogExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过1键控制太阳光散射颜色
         * ```
         * @Component
         * export default class FogExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 太阳光散射颜色
         *                 Fog.directionalInscatteringColor = LinearColor.red;
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static set directionalInscatteringColor(value: mw.LinearColor);
        /**
         * @description 设置雾预设
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param presetIndex usage:雾预设 <br> default:null
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果创建一个名为"FogExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过1键控制雾预设
         * ```ts
         * @Component
         * export default class FogExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 雾预设
         *                 Fog.setPreset(FogPreset.NearFog)
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static setPreset(presetIndex: FogPreset): void;
    }
}

/// <reference types="engine" />
declare namespace mw {
    // @ts-ignore
    import * as UE from "ue";
    /**
     * @hidden
     * @description Gizmo
     * @author  hongbing.deng
     * @groups 基础类型/其他
     * @instance
     * @networkStatus usage:双端
     */
    class Gizmo extends mw.GameObject {
        /**
         * @description 获取当前选中的所有object
         * @effect 调用端生效
         * @returns Array<GameObject>
         */
        getOperatingObjects(): Array<mw.GameObject>;
        /**
         * @description 获取当前选中的所有object
         * @effect 调用端生效
         * @returns Array<GameObject>
         */
        getSelectObjects(): Array<mw.GameObject>;
        /**
         * @description 设置坐标轴和三角面的朝向是否始终面向摄像机
         * @effect 调用端生效
         * @param faceCamera faceCamera：布尔值，表示坐标轴和三角面是否始终面向摄像机。true表示面向，false表示不面向。
         */
        setGizmoVisibility(faceCamera: boolean): void;
        /**
         * @description 发起拖拽事件
         * @effect 只在客户端调用生效
         * @param index usage:当前的touch事件唯一ID,类似手指按下的index
         * @param position usage:当前的touch的位置
         * @returns 返回是否成功发起了拖动坐标轴的行为
         */
        onTouchStart(index: number, position: mw.Vector2): boolean;
        /**
         * @description 移动坐标轴
         * @effect 只在客户端调用生效
         * @param index usage:当前的touch事件唯一ID,类似手指按下的index
         * @param position usage:当前的touch的位置
         * @returns 返回是否成功在这一帧拖动了坐标轴
         */
        onTouchMove(index: number, position: mw.Vector2): boolean;
        /**
         * @description 结束坐标轴的移动
         * @effect 只在客户端调用生效
         * @param index usage:当前的touch事件唯一ID,类似手指按下的index
         */
        onTouchEnd(index: number): void;
        /**
         * @description 添加需要被坐标轴忽略的object
         * @effect 只在客户端调用生效
         * @param actor usage:忽略的object
         */
        addIgnoreActor(actor: mw.GameObject | mw.Base): void;
        /**
        * @description   设置坐标轴可以同时缩放的两个轴
        * @param axisType 要双轴缩放的类型，目前只支持双轴同时缩放 可用参数为 GC_XY，GC_YZ，GC_XZ,代表对应的的双轴缩放模式
        */
        setGizmoAxisScale(axisType: UE.EMWGizmoAxisScaleSelect): void;
        /**
         * @description 获取当前选中的轴
         * @effect 只在客户端调用生效
         */
        get currentCoordinateAxis(): mw.GizmoCoordinateType;
        /**
         * @description 获取X轴旋转面的颜色
         * @effect 只在客户端调用生效 类型 LinearColor 范围 0-1
         */
        get rotatorXSurfaceColor(): mw.LinearColor;
        /**
         * @description 设置X轴旋转面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 类型 LinearColor 范围 0-1
         */
        set rotatorXSurfaceColor(color: mw.LinearColor);
        /**
         * @description 获取y轴旋转面的颜色
         * @effect 只在客户端调用生效
         * @returns 获取y轴旋转面的颜色 类型 LinearColor 范围 0-1
         */
        get rotatorYSurfaceColor(): mw.LinearColor;
        /**
         * @description 设置y轴旋转面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set rotatorYSurfaceColor(color: mw.LinearColor);
        /**
         * @description 获取z轴旋转面的颜色
         * @effect 只在客户端调用生效
         * @returns 获取z轴旋转面的颜色 类型 LinearColor 范围 0-1
         */
        get rotatorZSurfaceColor(): mw.LinearColor;
        /**
         * @description 设置z轴旋转面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set rotatorZSurfaceColor(color: mw.LinearColor);
        /**
         * @description 位置对齐网格
         * @effect 只在客户端调用生效
         */
        get positionSnapToGrid(): boolean;
        /**
         * @description 设置是否开启位移网格
         * @effect 只在客户端调用生效
         * @param enable usage: 是否开启
         */
        set positionSnapToGrid(enable: boolean);
        /**
         * @description 获取是否开启位移网格
         * @effect 只在客户端调用生效
         */
        get isPositionSnapToGridEnabled(): boolean;
        /**
         * @description 设置是否开启位移网格
         * @effect 只在客户端调用生效
         * @param enable usage: 是否开启
         */
        set enablePositionSnapToGrid(enable: boolean);
        /**
         * @description 获取位移网格大小
         * @effect 只在客户端调用生效
         */
        get positionGridSize(): number;
        /**
         * @description 设置位移网格大小
         * @effect 只在客户端调用生效
         * @param size usage: 位移网格大小
         */
        set positionGridSize(size: number);
        /**
         * @description 获取位移网格大小
         * @effect 只在客户端调用生效
         */
        get positionSnapGridSize(): number;
        /**
         * @description 设置位移网格大小
         * @effect 只在客户端调用生效
         * @param size usage: 位移网格大小
         */
        set positionSnapGridSize(size: number);
        /**
         * @description 获取旋转对齐网格
         * @effect 只在客户端调用生效
         */
        get rotatorSnapToGrid(): boolean;
        /**
         * @description 设置旋转对齐网格
         * @effect 只在客户端调用生效
         * @param enable usage: 是否开启
         */
        set rotatorSnapToGrid(enable: boolean);
        /**
         * @description 获取是否开启旋转网格
         * @effect 只在客户端调用生效
         */
        get isRotatorSnapToGridEnabled(): boolean;
        /**
         * @description 设置是否开启旋转网格
         * @effect 只在客户端调用生效
         * @param enable usage: 是否开启
         */
        set enableRotatorSnapToGrid(enable: boolean);
        /**
         * @description 获取旋转网格大小
         * @effect 只在客户端调用生效
         */
        get rotatorGridSize(): number;
        /**
         * @description 设置旋转网格大小
         * @effect 只在客户端调用生效
         * @param size usage: 旋转网格大小
         */
        set rotatorGridSize(size: number);
        /**
         * @description 获取旋转网格大小
         * @effect 只在客户端调用生效
         */
        get rotatorSnapGridSize(): number;
        /**
         * @description 设置旋转网格大小
         * @effect 只在客户端调用生效
         * @param size usage: 旋转网格大小
         */
        set rotatorSnapGridSize(size: number);
        /**
         * @description 获取是否开启缩放网格
         * @effect 只在客户端调用生效
         */
        get isScaleSnapToGridEnabled(): boolean;
        /**
         * @description 设置是否开启缩放网格
         * @effect 只在客户端调用生效
         * @param enable usage: 是否开启
         */
        set enableScaleSnapToGrid(enable: boolean);
        /**
         * @description 获取缩放网格大小
         * @effect 只在客户端调用生效
         */
        get scaleSnapGridSize(): number;
        /**
         * @description 设置缩放网格大小
         * @effect 只在客户端调用生效
         * @param size usage: 缩放网格大小
         */
        set scaleSnapGridSize(size: number);
        /**
         * @description 获取位移吸附
         * @effect 只在客户端调用生效
         */
        get positionAdsorb(): boolean;
        /**
         * @description 设置位移吸附
         * @effect 只在客户端调用生效
         * @param enable usage: 是否开启
         */
        set positionAdsorb(enable: boolean);
        /**
         * @description 获取是否开启位移吸附
         * @effect 只在客户端调用生效
         */
        get enablePositionAdsorb(): boolean;
        /**
         * @description 设置是否开启位移吸附,开启之后会增加性能消耗
         * @effect 只在客户端调用生效
         * @param enable usage: 是否开启
         */
        set enablePositionAdsorb(enable: boolean);
        /**
         * @description 获取位移吸附距离
         * @effect 只在客户端调用生效
         */
        get positionAdsorbDistance(): number;
        /**
         * @description 修改位移吸附距离
         * @effect 只在客户端调用生效
         * @param distance usage: 位移吸附距离
         */
        set positionAdsorbDistance(distance: number);
        /**
         * @description 获取等比缩放
         * @effect 只在客户端调用生效
         */
        get proportionalScale(): boolean;
        /**
         * @description 设置等比缩放
         * @effect 只在客户端调用生效
         * @param enable usage: 是否开启
         */
        set proportionalScale(enable: boolean);
        /**
         * @description 获取是否开启等比缩放
         * @effect 只在客户端调用生效
         */
        get isProportionalScaleEnabled(): boolean;
        /**
         * @description 设置是否开启等比缩放
         * @effect 只在客户端调用生效
         * @param enable usage: 是否开启
         */
        set enableProportionalScale(enable: boolean);
        /**
         * @description 获取X轴的颜色,位移.旋转.缩放三者的X轴保持一致
         * @effect 只在客户端调用生效
         * @returns 获取x轴旋的颜色 ,类型 LinearColor 范围 0-1
         */
        get axisXColor(): mw.LinearColor;
        /**
         * @description 设置X轴的颜色,位移.旋转.缩放三者的X轴保持一致
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set axisXColor(color: mw.LinearColor);
        /**
         * @description 获取y轴的颜色,位移.旋转.缩放三者的X轴保持一致
         * @effect 只在客户端调用生效
         * @returns 获取y轴旋的颜色, 类型 LinearColor 范围 0-1
         */
        get axisYColor(): mw.LinearColor;
        /**
         * @description 设置y轴的颜色,位移.旋转.缩放三者的X轴保持一致
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set axisYColor(color: mw.LinearColor);
        /**
         * @description 获取z轴的颜色,位移.旋转.缩放三者的X轴保持一致
         * @effect 只在客户端调用生效
         * @returns 获取z轴旋的颜色, 类型 LinearColor 范围 0-1
         */
        get axisZColor(): mw.LinearColor;
        /**
         * @description 设置z轴的颜色,位移.旋转.缩放三者的X轴保持一致
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set axisZColor(color: mw.LinearColor);
        /**
         * @description 获取XY平面的颜色
         * @effect 只在客户端调用生效
         * @returns 获取xy轴旋的颜色 类型 LinearColor 范围 0-1
         */
        get axisXYSurfaceColor(): mw.LinearColor;
        /**
         * @description 设置XY平面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set axisXYSurfaceColor(color: mw.LinearColor);
        /**
         * @description 获取XZ平面的颜色
         * @effect 只在客户端调用生效
         * @returns 获取xy轴旋的颜色 类型 LinearColor 范围 0-1
         */
        get axisXZSurfaceColor(): mw.LinearColor;
        /**
         * @description 设置XZ平面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set axisXZSurfaceColor(color: mw.LinearColor);
        /**
         * @description 获取YZ平面的颜色
         * @effect 只在客户端调用生效
         * @returns 获取xy轴旋的颜色 类型 LinearColor 范围 0-1
         */
        get axisYZSurfaceColor(): mw.LinearColor;
        /**
         * @description 设置YZ平面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set axisYZSurfaceColor(color: mw.LinearColor);
        /**
         * @description 获取XZ平面的颜色
         * @effect 只在客户端调用生效
         * @returns 获取xy轴旋的颜色 类型 LinearColor 范围 0-1
         */
        get axisXYColor(): mw.LinearColor;
        /**
         * @description 设置XZ平面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set axisXYColor(color: mw.LinearColor);
        /**
         * @description 获取XZ平面的颜色
         * @effect 只在客户端调用生效
         * @returns 获取xz轴旋的颜色 类型 LinearColor 范围 0-1
         */
        get axisXZColor(): mw.LinearColor;
        /**
         * @description 设置XZ平面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set axisXZColor(color: mw.LinearColor);
        /**
         * @description 获取YZ平面的颜色
         * @effect 只在客户端调用生效
         * @returns 获取yz轴旋的颜色 类型 LinearColor 范围 0-1
         */
        get positionMultiplier(): number;
        /**
         * @description 设置YZ平面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor range:0-1
         */
        set positionMultiplier(val: number);
        /**
         * @description 获取位移乘数
         * @effect 只在客户端调用生效
         * @returns 获取坐标轴的位移乘数
         */
        get rotationMultiplier(): number;
        /**
         * @description 设置YZ平面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor range:0-1
         */
        set rotationMultiplier(val: number);
        /**
         * @description 获取YZ平面的颜色
         * @effect 只在客户端调用生效
         * @returns 获取yz轴旋的颜色 类型 LinearColor 范围 0-1
         */
        get scaleMultiplier(): number;
        /**
         * @description 设置YZ平面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set scaleMultiplier(val: number);
        /**
         * @description 获取YZ平面的颜色
         * @effect 只在客户端调用生效
         * @returns 获取yz轴旋的颜色 类型 LinearColor 范围 0-1
         */
        get lookAtCamera(): boolean;
        /**
         * @description 设置YZ平面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set lookAtCamera(bLookAtCamera: boolean);
        /**
         * @description 获取YZ平面的颜色
         * @effect 只在客户端调用生效
         * @returns 获取yz轴旋的颜色 类型 LinearColor 范围 0-1
         */
        get axisYZColor(): mw.LinearColor;
        /**
         * @description 设置YZ平面的颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set axisYZColor(color: mw.LinearColor);
        /**
         * @description 选中轴高亮颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        get axisHighlightColor(): mw.LinearColor;
        /**
         * @description 选中轴高亮颜色
         * @effect 只在客户端调用生效
         * @param color usage: 设置的颜色 ,类型 LinearColor 范围 0-1
         */
        set axisHighlightColor(color: mw.LinearColor);
        /**
        * @description 设置坐标轴隐藏或者显示
        * @effect 只在客户端调用生效
        * @param showGizmoActor usage:显隐坐标轴
        */
        showGizmoActor(showGizmoActor: boolean): void;
        /**
        * @description 设置变换灵敏度系数
        * @effect 只在客户端调用生效
        * @param moveSensitivity usage:控制对象移动的敏感度系数
        * @param rotateSensitivity usage:控制对象旋转的敏感度系数
        * @param scaleSensitivity usage:控制对象缩放的敏感度系数
        */
        setTransformSensitivity(moveSensitivity: number, rotateSensitivity: number, scaleSensitivity: number): boolean;
        /**
        * @description 添加坐标轴管理的对象
        * @effect 只在客户端调用生效
        * @param Actor usage: 附加到的actor
        * @param IsRecordChange usage: 是否支持撤销 default:false
        */
        addGameObject(Actor: mw.GameObject): void;
        /**
         * @description 附加物体到坐标轴
         * @effect 只在客户端调用生效
         * @param Actor usage: 附加到的actor
         * @param IsRecordChange usage: 是否支持撤销 default:false
         */
        attachActorToGizmo(Actor: mw.GameObject): void;
        /**
         * @description 移除坐标轴管理的对象
         * @effect 只在客户端调用生效
         * @param Actor usage:移除的actor
         */
        removeGameObjects(Actor: mw.GameObject): void;
        /**
         * @description 移除物体到坐标轴
         * @effect 只在客户端调用生效
         * @param Actor usage:移除的actor
         */
        detachActorFormGizmo(Actor: mw.GameObject): void;
        /**
         * @description 切换坐标轴模式
         * @effect 只在客户端调用生效
         * @param GizmoMode usage:模式
         */
        switchGizmoMode(GizmoMode: mw.GizmoModeType): void;
        /**
         * @description 设置坐标轴选中时的高亮颜色
         * @effect 只在客户端调用生效
         * @param InHighlightColor usage: 高亮颜色 ,类型 LinearColor 范围 0-1
         */
        setGizmoHighlightColor(InHighlightColor: mw.LinearColor): void;
        /**
         * @description 设置坐标轴模型整体缩放倍数
         * @effect 只在客户端调用生效
         * @param InOffset usage: 缩放倍数
         */
        setGizmoScaleOffset(InOffset: number): void;
        /**
         * @description 坐标轴隐藏显示代理
         * @effect 只在客户端调用生效
         * @param Delegate usage:gizmo actor隐藏显示的代理
         */
        onGizmoVisibleChanged(Delegate: mw.MulticastDelegate<(IsVisible: boolean) => void>): void;
        /**
         * @description 附加代理
         * @effect 只在客户端调用生效
         * @param Delegate usage:有actor 附加到gizmo的时候触发的代理
         */
        onAttachChanged(Delegate: mw.MulticastDelegate<(Content: mw.GameObject) => void>): void;
        /**
         * @description 添加包围盒计算时忽略的对象
         * @effect 只在客户端调用生效
         * @param object 传入需要忽略的Actor
         */
        addIgnoredObjectForBoundingBox(object: mw.GameObject): void;
        /**
         * @description 移除包围盒计算时忽略的对象
         * @effect 只在客户端调用生效
         * @param object 传入需要忽略的Actor
         */
        removeIgnoredObjectForBoundingBox(object: mw.GameObject): void;
        /**
         * @description 获取gizmo选中对象的包围盒中心点
         * @effect 只在客户端调用生效
         */
        getBoundingBoxCenter(): mw.Vector;
        /**
         * @description 获取gizmo选中对象的包围盒中心点
         * @effect 只在客户端调用生效
         */
        setMoveGuidelines(enabled: boolean): void;
        /**
         * @description 获取gizmo选中对象的包围盒中心点
         * @effect 只在客户端调用生效
         */
        setMovePlanes(enabled: boolean): void;
        /**
         * @description 获取位移轴长度
         * @effect 只在客户端调用生效
         */
        get positionAxisLength(): number;
        /**
         * @description 设置位移轴长度
         * @effect 只在客户端调用生效
         * @param length usage: 长度
         */
        set positionAxisLength(length: number);
        /**
         * @description 获取位移轴长度
         * @effect 只在客户端调用生效
         */
        get positionGizmoAxisLength(): number;
        /**
         * @description 设置位移轴长度
         * @effect 只在客户端调用生效
         * @param length usage: 长度
         */
        set positionGizmoAxisLength(length: number);
        /**
         * @description 获取缩放轴长度
         * @effect 只在客户端调用生效
         */
        get scaleGizmoAxisLength(): number;
        /**
         * @description 设置缩放轴长度
         * @effect 只在客户端调用生效
         * @param length usage: 长度
         */
        set scaleGizmoAxisLength(length: number);
        /**
         * @description 获取缩放轴长度
         * @effect 只在客户端调用生效
         */
        get scaleAxisLength(): number;
        /**
         * @description 设置缩放轴长度
         * @effect 只在客户端调用生效
         * @param length usage: 长度
         */
        set scaleAxisLength(length: number);
        /**
         * @description 设置gizmo缩放时候的边界,在缩放到达这个数值的时候会直接设置到目标数值
         * @effect 只在客户端调用生效
         * @param boundary usage: 边界
         */
        set scaleGizmoBoundary(boundary: number);
        /**
         * @description 获取gizmo缩放时候的边界,在缩放到达这个数值的时候会直接设置到目标数值
         * @effect 只在客户端调用生效
         */
        get scaleGizmoBoundary(): number;
        /**
        * @description 设置gizmo到目标的帧数,具体计算方式为 (1/当前帧delta)/stepNumber
        * @effect 只在客户端调用生效
        * @param stepNumber usage: 设置到目标缩放值的数值
        */
        set scaleGizmoStepNumber(stepNumber: number);
        /**
        * @description 获取gizmo的缩放类型
        * @effect 只在客户端调用生效
        */
        get scaleType(): mw.GizmoScaleType;
        /**
        * @description 设置gizmo的缩放类型
        * @effect 只在客户端调用生效
        * @param v usage: 设置到gizmo的缩放类型
        */
        set scaleType(v: mw.GizmoScaleType);
        /**
        * @description 获取gizmo的选中类型
        * @effect 只在客户端调用生效
        */
        get socketType(): mw.GizmoSocketType;
        /**
        * @description 设置gizmo的选中类型
        * @effect 只在客户端调用生效
        * @param v usage: Center:选中对象的中心点 Pivot:选中对象的枢轴点
        */
        set socketType(v: mw.GizmoSocketType);
        /**
         * @description 获取坐标轴模式
         * @effect 只在客户端调用生效
         * @returns 返回坐标轴模式
         */
        get gizmoMode(): mw.GizmoModeType;
        /**
         * @description 切换坐标轴模式
         * @effect 只在客户端调用生效
         * @param GizmoMode usage:模式
         */
        set gizmoMode(GizmoMode: mw.GizmoModeType);
        /**
         * @description 获取坐标轴模式
         * @effect 只在客户端调用生效
         * @returns 返回坐标轴模式
         */
        getGizmoMode(): mw.GizmoModeType;
        /**
         * @description 获取坐标轴空间
         * @effect 只在客户端调用生效
         * @returns 返回坐标轴空间
         */
        get gizmoSpace(): mw.GizmoSpaceType;
        /**
         * @description 切换坐标轴空间
         * @effect 只在客户端调用生效
         * @param GizmoSpace usage:空间
         */
        set gizmoSpace(GizmoSpace: mw.GizmoSpaceType);
        /**
         * @description 获取坐标轴空间
         * @effect 只在客户端调用生效
         * @returns 返回坐标轴空间
         */
        getGizmoSpace(): mw.GizmoSpaceType;
        /**
         * @description 切换坐标轴空间
         * @effect 只在客户端调用生效
         * @param GizmoSpace usage:空间
         */
        switchGizmoSpace(GizmoSpace: mw.GizmoSpaceType): void;
        /**
         * @description 使用自定义输入的gizmo,gizmo不会再对attach的对象执行transform功能
         * @effect 只在客户端调用生效
         * @param v usage:是否使用自定义输入的gizmo
         */
        set customGizmoEnabled(v: boolean);
        /**
         * @description 使用自定义输入的gizmo,gizmo不会再对attach的对象执行transform功能
         * @effect 只在客户端调用生效
         * @returns 是否使用自定义输入的gizmo
         */
        get customGizmoEnabled(): boolean;
        /**
         * @description 聚焦到坐标轴
         * @effect 只在客户端调用生效
         */
        focusToGizmo(): void;
        /**
        * @description 聚焦到物体
        * @effect 只在客户端调用生效
        * @param InObject usage:需要聚焦的对象
        */
        focusToObjects(InObject: Array<mw.GameObject>): void;
        /**
        * @description 聚焦到物体
        * @effect 只在客户端调用生效
        * @param InObject usage:需要聚焦的对象
        */
        focusToActors(InObject: Array<mw.GameObject>): void;
    }
}

/// <reference types="engine" />
declare namespace mw {
    // @ts-ignore
    import * as UE from "ue";
    /**
     * @author hao.huang
     * @description IK锚点类型
     * @groups 玩法/其他
     */
    enum IKPart {
        /** 左手 */
        LeftHand = 0,
        /** 右手 */
        RightHand = 1,
        /** 左脚 */
        LeftFoot = 2,
        /** 右脚 */
        RightFoot = 3
    }
    /**
     * @author hao.huang
     * @groups 玩法/其他
     * @description IK锚点
     * @networkStatus usage:双端
     */
    class IKAnchor extends mw.GameObject {
        /**
         * @description IK启用完成委托
         */
        onActivate: mw.MulticastDelegate<() => void>;
        /**
         * @description IK关闭完成委托
         */
        onDeactivate: mw.MulticastDelegate<() => void>;
        /**
         * @description 获取IK锚点激活的对象
         * @effect 调用端生效
         * @retuns IK锚点激活的对象
         */
        get target(): UE.MWSysCharacter;
        /**
         * @description 获取IK锚点类型
         * @effect 调用端生效
         * @returns IK锚点类型
         */
        get anchorType(): IKPart;
        /**
         * @description 获取关节朝向
         * @effect 调用端生效
         * @returns 关节朝向
         */
        get jointTarget(): mw.Vector;
        /**
         * @description 设置关节朝向
         * @effect 调用端生效
         * @param value usage:关节朝向
         */
        set jointTarget(value: mw.Vector);
        /**
         * @description 获取权重
         * @effect 调用端生效
         * @returns 权重
         */
        get weight(): number;
        /**
         * @description 设置权重
         * @effect 调用端生效
         * @param value usage:权重 range: [0,1] type:浮点数
         */
        set weight(value: number);
        /**
         * @description 获取混入时间
         * @effect 调用端生效
         * @returns 混入时间
         */
        get blendInTime(): number;
        /**
         * @description 设置混入时间
         * @effect 调用端生效
         * @param value usage:混入时间 range: [0,99999] type:浮点数
         */
        set blendInTime(value: number);
        /**
         * @description 获取混出时间
         * @effect 调用端生效
         * @returns 混出时间
         */
        get blendOutTime(): number;
        /**
         * @description 设置混入时间
         * @effect 调用端生效
         * @param value usage:混入时间 range: [0,99999] type:浮点数
         */
        set blendOutTime(value: number);
        /**
         * @description 关闭IK功能
         * @effect 调用端生效
         */
        deactivate(): void;
        /**
         * @description 给指定用户激活IK功能
         * @effect 调用端生效
         * @param target usage:IK指定角色对象
         */
        active(target: mw.Character): void;
        /**
         * @description 设置指定角色对象自动IK状态
         * @effect 调用端生效
         * @param target usage:指定角色对象
         * @param value usage:自动IK激活状态
         */
        static autoEnableIK(target: mw.Character, value: boolean): void;
    }
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @description 特效发射取向
     * @groups 场景/特效
     */
    enum ParticleEmitterOrientation {
        /** 发射速度平行 */
        VelocityParallel = 3,
        /** 面朝相机*/
        FacingCamera = 4
    }
    /**
     * @author baoqiang.han
     * @description 特效发射类型
     * @groups 场景/特效
     */
    enum ParticleEmitterShapeStyle {
        /** 体积*/
        Volume = 0,
        /** 仅表面 */
        SurfaceOnly = 1
    }
    /**
     * @author baoqiang.han
     * @description 特效形状枚举
     * @groups 场景/特效
     */
    enum ParticleEmitterShape {
        /** 点*/
        /** 球 */
        Sphere = 1,
        /** 圆柱 */
        Cylinder = 2,
        /** 三棱柱 */
        /** 盒体 */
        Box = 4,
        /** 圆盘 */
        Disc = 5
    }
    /**
     * @author baoqiang.han
     * @description 序列帧布局
     * @groups 场景/特效
     */
    enum ParticleFlipbookLayout {
        /** 关闭序列帧*/
        FlipbookUnenabled = 0,
        /** 2x2 */
        X2 = 1,
        /** 4x4 */
        X4 = 2,
        /** 6x6 */
        X6 = 3,
        /** 8x8 */
        X8 = 4
    }
    /**
     * @author baoqiang.han
     * @description 序列帧播放模式
     * @groups 场景/特效
     */
    enum ParticleFlipbookMode {
        /** 顺序播放 */
        Sequence = 0,
        /** 来回播放 */
        Pingpong = 1
    }
    /**
     * @author baoqiang.han
     * @description 发射内外朝向
     * @groups 场景/特效
     */
    enum ParticleEmitterShapeInOut {
        /** 关 */
        Off = 0,
        /** 向外发射 */
        Outward = 1,
        /** 向内发射 */
        Inward = 2,
        /** 内外发射 */
        InAndOut = 3
    }
    /**
     * @author baoqiang.han
     * @description 特效标量值曲线节点
     * @networkStatus usage:客户端
     * @groups 场景/特效
     */
    class numberSequencePoint {
        /**
         * @description 时间点 取值为[0, 1]，代表生命周期的起始和结束
         */
        timeKey: number;
        /**
         * @description 标量值
         */
        value: number;
        /**
         * @description 构造函数
         * @param inTimeKey usage:时间点 type: 浮点型 range:[0, 1]
         * @param inValue usage:时间点 type: 浮点型 range: 无
         * @param inTolerance usage:时间点 type: 浮点型 range: 无 default: 0
         */
        constructor(inTimeKey: number, inValue: number, inTolerance?: number);
    }
    /**
     * @author baoqiang.han
     * @description 特效三维向量值曲线节点
     * @networkStatus usage:客户端
     * @groups 场景/特效
     */
    class vectorSequencePoint {
        /**
         * @description 时间点 取值为[0, 1]，代表生命周期的起始和结束
         */
        timeKey: number;
        /**
         * @description 向量值
         */
        value: mw.Vector;
        /**
         * @description 构造函数
         * @param inTimeKey usage:时间点 type: 浮点型 range:[0, 1]
         * @param inValue usage:时间点 type: 浮点型 range: 无
         * @param inTolerance usage:时间点 type: 浮点型 range: 无 default: mw.Vector(0, 0, 0)
         */
        constructor(inTimeKey: number, inValue: mw.Vector, inTolerance?: mw.Vector);
    }
    /**
     * @author baoqiang.han
     * @description 特效二维向量值曲线节点
     * @networkStatus usage:客户端
     * @groups 场景/特效
     */
    class vector2DSequencePoint {
        /**
         * @description 时间点 取值为[0, 1]，代表生命周期的起始和结束
         */
        timeKey: number;
        /**
         * @description 向量值
         */
        value: mw.Vector2;
        /**
         * @description 构造函数
         * @param inTimeKey usage:时间点 type: 浮点型 range:[0, 1]
         * @param inValue usage:时间点 type: 浮点型 range: 无
         * @param inTolerance usage:时间点 type: 浮点型 range: 无 default: mw.Vector2(0, 0)
         */
        constructor(inTimeKey: number, inValue: mw.Vector2, inTolerance?: mw.Vector2);
    }
    /**
     * @author baoqiang.han
     * @description 特效颜色值曲线节点
     * @networkStatus usage:客户端
     * @groups 场景/特效
     */
    class colorSequencePoint {
        /**
         * @description 时间点 取值为[0, 1]，代表生命周期的起始和结束
         */
        timeKey: number;
        /**
         * @description 颜色值
         */
        value: mw.LinearColor;
        /**
         * @description 构造函数
         * @param inTimeKey usage:时间点 type: 浮点型 range:[0, 1]
         * @param inValue usage:时间点 type: LinearColor range: 无
         */
        constructor(inTimeKey: number, inValue: mw.LinearColor);
    }
    /**
     * @author baoqiang.han
     * @groups 场景/特效
     * @description 粒子特效
     * @description 通常用于游戏场景中的效果表现，目前开放部分粒子效果，当编辑器细节面板勾选自动启用时，运行游戏会自动播放特效。
     * @description 如需精确控制特效的播放与停止，请使用 play 和 stop 方法。该特效需要手动控制生命周期，效果可通过细节面板中参数调节。
     * @networkStatus usage:客户端
     * @example
     * 使用示例:创建一个名为"EffectExample"的脚本，拖拽到对象栏特效下，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到粒子的变化效果。代码如下：
     * ```
     * @Component
     * export default class EffectExample extends Script {
     *
     *     protected onStart(): void {
     *
     *          let Effect = this.gameObject as ParticleEmitter;
     *          // 涉及部分对生命周期内效果的修改
     *          // 创建尺寸生命周期数组 效果为由蓝线性过度至红色
     *          let ColorSequence = Array<mw.colorSequencePoint>();
     *          // 生命周期0%时为蓝色 详见LinearColor
     *          ColorSequence.push(new mw.colorSequencePoint(0, new LinearColor(1,0,0)));
     *          // 生命周期100%时为红色
     *          ColorSequence.push(new mw.colorSequencePoint(0, new LinearColor(0,0,1)));
     *          Effect.color = ColorSequence;
     *          // 创建透明度生命周期数组 效果为逐渐清晰
     *          let TransparencySequence = Array<mw.numberSequencePoint>();
     *          // 刚生成时透明度为0 看不见
     *          TransparencySequence.push(new mw.numberSequencePoint(0, 0));
     *          // 逐渐过渡到生命周期末 全显示
     *          TransparencySequence.push(new mw.numberSequencePoint(1, 1));
     *          Effect.transparency = TransparencySequence;
     *
     *          // 创建尺寸生命周期数组 效果为变大再缩小
     *          let SizeSequence = Array<mw.numberSequencePoint>();
     *          // 生命周期0%时大小为0
     *          Size
     *          // 生命周期50%时大小为4
     *          SizeSequence.push(new mw.numberSequencePoint(0.5, 4));
     *          // 生命周期100%时大小回到0
     *          SizeSequence.push(new mw.numberSequencePoint(1, 0));
     *          Effect.size = SizeSequence;
     *
     *          // 设置特效阻力为1
     *          Effect.drag = 1;
     *          // 增加特效生成的速度
     *          Effect.rate = 100;
     *          // 不进行边缘裁剪,全部保留,方形
     *          Effect.maskRadius = 1;
     *          // 仅在表面生成
     *          Effect.shapeStyle = mw.ParticleEmitterShapeStyle.OnlySurface;
     *          // 生成范围长宽高100
     *          Effect.shapeExtents = new Vector(100, 100, 100);
     *
     *          // 生命周期在1~10范围内随机
     *          Effect.lifetime = new Vector2(1, 10);
     *          // 10秒后停止, 不影响已生成粒子
     *          setTimeout(() => {
     *              Effect.stop();
     *          }, 10000);
     *     }
     * }
     * ```
     */
    class ParticleEmitter extends mw.GameObject {
        /**
         * @description 播放特效
         * @effect 只在客户端调用生效
         */
        play(): void;
        /**
         * @description 停止特效，不影响已经生成的粒子
         * @effect 只在客户端调用生效
         */
        stop(): void;
        /**
         * @description 强制停止特效，所有粒子全部销毁
         * @effect 只在客户端调用生效
         */
        forceStop(): void;
        /**
         * @description 自定义贴图
         * @effect 只在客户端调用生效
         * @param textureId usage:特效自定义贴图ID
         */
        set texture(textureId: number | string);
        /**
         * @description 生命周期
         * @effect 只在客户端调用生效
         * @param lifetime usage:生命周期，粒子的存在时间（x为最小值y为最大值，粒子生成时在x~y范围内随机取值）
         */
        set lifetime(lifetime: mw.Vector2);
        /**
         * @description 生命周期
         * @effect 只在客户端调用生效
         * @returns 特效的生命周期 （x为最小值y为最大值，粒子生成时在x~y范围内随机取值）
         */
        get lifetime(): mw.Vector2;
        /**
         * @description 速率（即单位时间生成粒子的数量）
         * @effect 只在客户端调用生效
         * @param rate usage:速率
         */
        set rate(rate: number);
        /**
         * @description 速率（即单位时间生成粒子的数量）
         * @effect 只在客户端调用生效
         * @returns 特效的速率
         */
        get rate(): number;
        /**
         * @description 是否使用局部空间
         * @effect 只在客户端调用生效
         * @param value usage:是否使用局部空间
         */
        set isLocalSpace(value: boolean);
        /**
         * @description 是否使用局部空间
         * @effect 只在客户端调用生效
         * @returns 特效的空间计算
         */
        get isLocalSpace(): boolean;
        /**
         * @description 亮度
         * @effect 只在客户端调用生效
         * @param sequence usage:生成粒子的亮度
         */
        set brightness(sequence: number | Array<numberSequencePoint>);
        /**
         * @description 亮度
         * @effect 只在客户端调用生效
         * @returns 特效的亮度
         */
        get brightness(): Array<numberSequencePoint>;
        /**
         * @description 光照影响
         * @effect 只在客户端调用生效
         * @param lightInfluence usage:特效的光照影响程度
         */
        set lightInfluence(lightInfluence: number);
        /**
         * @description 光照影响
         * @effect 只在客户端调用生效
         * @returns 特效的光照影响程度
         */
        get lightInfluence(): number;
        /**
         * @description 设置生命周期内大小变化曲线
         * @effect 只在客户端调用生效
         * @param sequence usage:特效标量值曲线节点数组 numberSequencePoint传参已废弃，请改用vector2DSequencePoint
         */
        set size(sequence: mw.Vector2 | Array<vector2DSequencePoint> | Array<numberSequencePoint>);
        /**
         * @description 获取生命周期内大小变化曲线
         * @effect 只在客户端调用生效
         * @returns 大小变化曲线节点数组
         */
        get size(): Array<vector2DSequencePoint>;
        /**
         * @description 初始速度
         * @effect 只在客户端调用生效
         * @param speed usage:生成粒子的初始速度（x为最小值y为最大值，粒子生成时在x~y范围内随机取值）
         */
        set speed(speed: mw.Vector2);
        /**
         * @description 初始速度
         * @effect 只在客户端调用生效
         * @returns 生成粒子的初始速度（x为最小值y为最大值，粒子生成时在x~y范围内随机取值）
         */
        get speed(): mw.Vector2;
        /**
         * @description 设置生命周期内加速度变化曲线
         * @effect 只在客户端调用生效
         * @param sequence usage:特效向量值曲线节点数组
         */
        set acceleration(sequence: mw.Vector | Array<vectorSequencePoint>);
        /**
         * @description 获取生命周期内加速度变化曲线
         * @effect 只在客户端调用生效
         * @returns 特效向量值曲线节点数组
         */
        get acceleration(): Array<vectorSequencePoint>;
        /**
         * @description 设置生命周期内颜色变化曲线
         * @effect 只在客户端调用生效
         * @param sequence usage:特效颜色值曲线节点数组
         */
        set color(sequence: mw.LinearColor | Array<colorSequencePoint>);
        /**
         * @description 获取设置生命周期内颜色变化曲线
         * @effect 只在客户端调用生效
         * @returns 特效颜色值曲线节点数组
         */
        get color(): Array<colorSequencePoint>;
        /**
         * @description 设置生命周期内透明度变化曲线
         * @effect 只在客户端调用生效
         * @param sequence usage:特效标量值曲线节点数组
         */
        set transparency(sequence: number | Array<numberSequencePoint>);
        /**
         * @description 获取生命周期内透明度变化曲线
         * @effect 只在客户端调用生效
         * @returns 特效标量值曲线节点数组
         */
        get transparency(): Array<numberSequencePoint>;
        /**
         * @description 初始旋转
         * @effect 只在客户端调用生效
         * @param initialRotation usage:生成粒子的初始旋转值
         */
        set rotation(initialRotation: number);
        /**
         * @description 初始旋转
         * @effect 只在客户端调用生效
         * @returns 特效的初始旋转
         */
        get rotation(): number;
        /**
         * @description 设置生命周期内旋转速度变化曲线
         * @effect 只在客户端调用生效
         * @param sequence usage:特效标量值曲线节点数组
         */
        set rotSpeed(sequence: number | Array<numberSequencePoint>);
        /**
         * @description 获取生命周期内旋转速度变化曲线
         * @effect 只在客户端调用生效
         * @returns 特效标量值曲线节点数组
         */
        get rotSpeed(): Array<numberSequencePoint>;
        /**
         * @description 扩散角度
         * @effect 只在客户端调用生效
         * @param spreadAngle usage:生成粒子的扩散角度
         */
        set spreadAngle(spreadAngle: number);
        /**
         * @description 扩散角度
         * @effect 只在客户端调用生效
         * @returns 特效的扩散角度
         */
        get spreadAngle(): number;
        /**
         * @description 阻力
         * @effect 只在客户端调用生效
         * @param drag usage:生成粒子所受到的的阻力
         */
        set drag(drag: number);
        /**
         * @description 阻力
         * @effect 只在客户端调用生效
         * @returns 特效的阻力
         */
        get drag(): number;
        /**
         * @description 遮罩半径
         * @effect 只在客户端调用生效
         * @param radius usage:生成粒子的遮罩剔除半径
         */
        set maskRadius(radius: number);
        /**
         * @description 遮罩半径
         * @effect 只在客户端调用生效
         * @returns 生成粒子的遮罩剔除半径
         */
        get maskRadius(): number;
        /**
         * @description 形状
         * @effect 只在客户端调用生效
         * @param shape usage:特效的形状
         */
        set shape(shape: ParticleEmitterShape);
        /**
         * @description 形状
         * @effect 只在客户端调用生效
         * @returns 特效的形状
         */
        get shape(): ParticleEmitterShape;
        /**
         * @description 设置发射内外朝向
         * @effect 只在客户端调用生效
         * @param shape usage:特效的发射朝向
         */
        set shapeInOut(shape: ParticleEmitterShapeInOut);
        /**
         * @description 获取发射内外朝向
         * @effect 只在客户端调用生效
         * @returns 特效的发射朝向
         */
        get shapeInOut(): ParticleEmitterShapeInOut;
        /**
         * @description 发射取向/对齐方式
         * @effect 只在客户端调用生效
         * @param value usage:特效的发射取向
         */
        set orientation(value: ParticleEmitterOrientation);
        /**
         * @description 发射取向/对齐方式
         * @effect 只在客户端调用生效
         * @returns 特效的发射取向
         */
        get orientation(): ParticleEmitterOrientation;
        /**
         * @description 形状样式
         * @effect 只在客户端调用生效
         * @param style usage:特效的形状样式表面生成还是体积内生成，仅非点状类型时生效）
         */
        set shapeStyle(style: ParticleEmitterShapeStyle);
        /**
         * @description 形状样式
         * @effect 只在客户端调用生效
         * @returns 特效的形状样式
         */
        get shapeStyle(): ParticleEmitterShapeStyle;
        /**
         * @description 形状范围
         * @effect 只在客户端调用生效
         * @param extents usage:特效的形状范围 （设置粒子发射器的形状大小, 这决定了粒子会在多大的范围内随机生成）
         * 仅非点状类型时生效
         * X 代表圆/球半径 三角形边长
         * Y 代表等腰三角形内角
         * Z 代表体积高度
         */
        set shapeExtents(extents: mw.Vector);
        /**
         * @description 形状范围
         * @effect 只在客户端调用生效
         * @returns 特效的形状样式
         */
        get shapeExtents(): mw.Vector;
        /**
         * @description 序列帧贴图的布局
         * @effect 只在客户端调用生效
         * @param Layout usage:序列帧贴图的布局
         */
        set flipbookLayout(Layout: ParticleFlipbookLayout);
        /**
         * @description 序列帧贴图的布局
         * @effect 只在客户端调用生效
         * @returns 序列帧贴图的布局
         */
        get flipbookLayout(): ParticleFlipbookLayout;
        /**
         * @description 序列帧布局可用单元数量
         * @effect 只在客户端调用生效
         * @param avalidNum usage:序列帧布局拆分后使用的拆分单元数量
         */
        set flipbookCellCount(avalidNum: number);
        /**
         * @description 序列帧布局可用单元数量
         * @effect 只在客户端调用生效
         * @returns 序列帧布局可用单元数量
         */
        get flipbookCellCount(): number;
        /**
         * @description 序列帧的播放模式
         * @effect 只在客户端调用生效
         * @param Layout usage:序列帧的播放模式
         */
        set flipbookMode(Layout: ParticleFlipbookMode);
        /**
         * @description 序列帧的播放模式
         * @effect 只在客户端调用生效
         * @returns 序列帧的播放模式
         */
        get flipbookMode(): ParticleFlipbookMode;
        /**
         * @description 序列帧动画循环次数
         * @effect 只在客户端调用生效
         * @param value usage:序列帧在生命周期内循环播放的次数
         */
        set flipbookCirculationTime(value: number);
        /**
         * @description 序列帧动画循环次数
         * @effect 只在客户端调用生效
         * @returns 序列帧动画循环次数
         */
        get flipbookCirculationTime(): number;
        /**
         * @description 发射固定数量粒子
         * @effect 只在客户端调用生效
         * @param emitCount usage:需要发射的粒子数量 range: 不做限制 type: 浮点数
         */
        emit(emitCount: number): void;
    }
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @description 后处理预设枚举
     * @groups 场景/灯光
     */
    enum PostProcessPreset {
        /** 默认 */
        Default = 0,
        /** 梦境 */
        Dreamy = 1,
        /** 反差色 */
        Contrast = 2,
        /** 暖阳 */
        WarmSunshine = 3,
        /** 老照片 */
        OldPhoto = 4,
        /** 夜幕 */
        Night = 5,
        /** 鲜暖色 */
        WarmContrast = 6,
        /** 奶油 */
        Cream = 7,
        /** 鲜亮 */
        Bright = 8,
        /** 夏日 */
        SummerDay = 9,
        /** 高级 */
        Senior = 10,
        /** 自然 */
        Natural = 11,
        /** 苏打水 */
        SodaWater = 12,
        /** 日落1 */
        Sunset_1 = 13,
        /** 日落2 */
        Sunset_2 = 14,
        /** 日落3 */
        Sunset_3 = 15,
        /** 灰1 */
        Grey_1 = 16,
        /** 梦幻 */
        Dream = 17,
        /** 电影 */
        Film = 18,
        /** 灰2 */
        Grey_2 = 19,
        /** 多彩1 */
        Colorful_1 = 20,
        /** 黎明 */
        Dawn = 21,
        /** 多彩2 */
        Colorful_2 = 22,
        /** 黄昏 */
        Dusk = 23,
        /** 破晓 */
        BreakingDawn = 24,
        /** 森林 */
        Forest = 25,
        /** 青1 */
        Cyan_1 = 26,
        /** 青2 */
        Cyan_2 = 27,
        /** 老照片1 */
        OldPhoto_1 = 28,
        /** 老照片2 */
        OldPhoto_2 = 29,
        /** 泛黄 */
        Yellowing = 30
    }
    /**
     * @author baoqiang.han
     * @groups 场景/灯光
     * @description 后处理对象属性配置
     * @networkStatus usage:双端
     */
    class PostProcessConfig {
        /**
         * @description 全局泛光
         * @groups 场景/灯光
         */
        bloomIntensity: number;
        /**
         * @description 全局饱和度
         * @groups 场景/灯光
         */
        globalSaturation: number;
        /**
         * @description 全局对比度
         * @groups 场景/灯光
         */
        globalContrast: number;
        /**
         * @description LUT查找表百分比
         * @groups 场景/灯光
         */
        lutBlend: number;
        /**
         * @description LUT查找表百分比
         * @groups 场景/灯光
         */
        lutTextureID: number;
    }
    /**
     * @author baoqiang.han
     * @groups 场景/灯光
     * @description 后处理
     * @description ----------------------------------
     * @description 后处理是指在渲染完成后对图像进行处理的一系列技术和效果。后处理通常用于增强或修改最终渲染图像的对比度、饱和度等特性，以达到特定的视觉效果或风格。
     * @networkStatus usage:客户端
     * @example
     * 使用示例: 可按如下操作控制编辑器后处理实时效果
     * 创建一个名为"PostProcessExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过+和-键控制后处理的伽马值
     * ```
     * @Component
     * export default class PostProcessExample extends mw.Script {
     *     // 当脚本被实例后，会在第一帧更新前调用此函数
     *     protected async onStart(): Promise<void> {
     *         if(SystemUtil.isClient())
     *         {
     *             mw.InputUtil.onKeyDown(Keys.Add,()=>{
     *                 // 小键盘+建，增加后处理饱和度,依次递增1个单位
     *                 PostProcess.saturation = PostProcess.saturation + 1;
     *                 console.log("当前后处理饱和度:" + PostProcess.saturation);
     *             });
     *             InputUtil.onKeyDown(Keys.Subtract,()=>{
     *                 // 小键盘-建，降低后处理饱和度,依次递减1个单位
     *                 PostProcess.saturation = PostProcess.saturation - 1;
     *                 console.log("当前后处理饱和度:" + PostProcess.saturation);
     *             });
     *         }
     *     }
     * }
     * ```
     */
    class PostProcess {
        /**
         * @description 设置预设
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param newPreset usage:预设枚举
         */
        static set preset(newPreset: PostProcessPreset);
        /**
         * @description 获取预设
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 预设枚举
         */
        static get preset(): PostProcessPreset;
        /**
         * @description 设置后处理属性配置
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param newConfig usage:设置值
         */
        static set config(newConfig: PostProcessConfig);
        /**
         * @description 获取后处理属性配置
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get config(): PostProcessConfig;
        /**
         * @description 设置泛光
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set bloom(Value: number);
        /**
         * @description 获取泛光
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get bloom(): number;
        /**
         * @description 设置泛光扩散度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set bloomSpread(Value: number);
        /**
         * @description 获取泛光扩散度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get bloomSpread(): number;
        /**
         * @description 设置泛光曝光系数
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set bloomExposureFactor(Value: number);
        /**
         * @description 获取泛光曝光系数
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get bloomExposureFactor(): number;
        /**
         * @description 设置泛光范围
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set bloomRange(Value: number);
        /**
         * @description 获取泛光范围
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get bloomRange(): number;
        /**
         * @description 设置全局饱和度 （0 ~ 2）
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set saturation(Value: number);
        /**
         * @description 获取全局饱和度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get saturation(): number;
        /**
         * @description 设置全局对比度 （0.2 ~ 5.0）
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set contrast(Value: number);
        /**
         * @description 获取全局对比度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get contrast(): number;
        /**
         * @description 设置环境光遮蔽开关
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set ambientOcclusionEnabled(Value: boolean);
        /**
         * @description 获取环境光遮蔽开关
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get ambientOcclusionEnabled(): boolean;
        /**
         * @description 设置环境光遮蔽强度（0 ~ 1）数值越大,强度越大
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set ambientOcclusionIntensity(Value: number);
        /**
         * @description 获取环境光遮蔽强度
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get ambientOcclusionIntensity(): number;
        /**
         * @description 设置环境光遮蔽半径（0 ~ 300.0）数值越小半径越小
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set ambientOcclusionRadius(Value: number);
        /**
         * @description 获取环境光遮蔽半径
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get ambientOcclusionRadius(): number;
        /**
         * @description 获取环境光遮蔽角度偏移
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get ambientOcclusionAngleBias(): number;
        /**
         * @description 设置环境光遮蔽角度偏移（0 ~ 80）
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set ambientOcclusionAngleBias(Value: number);
        /**
         * @description 开关模糊
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set blurEnabled(Value: boolean);
        /**
         * @description 获取模糊
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get blurEnabled(): boolean;
        /**
         * @description 模糊强度开关
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set blurIntensity(Value: number);
        /**
         * @description 获取模糊强度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get blurIntensity(): number;
        /**
         * @description 开关景深
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set depthOfFieldEnabled(Value: boolean);
        /**
         * @description 获取景深开关
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get depthOfFieldEnabled(): boolean;
        /**
         * @description 设置景深强度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set depthOfFieldIntensity(Value: number);
        /**
         * @description 获取景深强度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get depthOfFieldIntensity(): number;
        /**
         * @description 设置焦距位置
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set focusPosition(Value: number);
        /**
         * @description 获取焦距位置
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get focusPosition(): number;
        /**
         * @description 设置焦距距离
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param Value usage:设置值
         */
        static set focusDistance(Value: number);
        /**
         * @description 获取焦距距离
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 获取值
         */
        static get focusDistance(): number;
    }
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @description 天空盒预设枚举
     * @groups 场景/灯光
     */
    enum SkyPreset {
        /** 清晨（二次元）*/
        Morning2D = 0,
        /** 中午（二次元） */
        Noon2D = 1,
        /** 黄昏（二次元） */
        Dusk2D = 2,
        /** 夜晚（二次元） */
        Night2D = 3,
        /** 清晨（LowPoly） */
        MorningLowPoly = 4,
        /** 中午（LowPoly） */
        NoonLowPoly = 5,
        /** 黄昏（LowPoly） */
        DuskLowPoly = 6,
        /** 夜晚（LowPoly） */
        NightLowPoly = 7
    }
    /**
     * @author baoqiang.han
     * @description 天空盒背景的切换方式枚举
     * @groups 场景/灯光
     */
    enum SkyboxBackgroundSwitchMode {
        /** 无 */
        /** 渐变 */
        Gradient = 0
    }
    /**
     * @author baoqiang.han
     * @groups 场景/灯光
     * @description 天空盒
     * @description ----------------------------------
     * @networkStatus usage:客户端
     * @example
     * 使用示例: 可按如下操作控制编辑器天空盒实时效果
     * 创建一个名为"SkyboxExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过 "+" 和 "-" 键控制天空盒的亮度， "*" 键切换预设。
     * ```
     * @Component
     * export default class SkyboxExample extends mw.Script {
     *     // 当脚本被实例后，会在第一帧更新前调用此函数
     *     protected async onStart(): Promise<void> {
     *         if(Util.SystemUtil.isClient())
     *         {
     *             mw.InputUtil.onKeyDown(Type.Keys.Add,()=>{
     *                 // 小键盘+建，增加天空盒亮度,依次递增1个单位
     *                 Skybox.skyDomeIntensity = Skybox.skyDomeIntensity + 0.2;
     *                 console.log("当前天空盒亮度:" + Skybox.skyDomeIntensity);
     *             });
     *             mw.InputUtil.onKeyDown(Type.Keys.Subtract,()=>{
     *                 // 小键盘-建，降低天空盒亮度,依次递减1个单位
     *                 Skybox.skyDomeIntensity = Skybox.skyDomeIntensity - 0.2;
     *                 console.log("当前天空盒亮度:" + Skybox.skyDomeIntensity);
     *             });
     *             mw.InputUtil.onKeyDown(Type.Keys.Multiply,()=>{
     *                 // 小键盘*建，切换天空盒预设
     *                 Skybox.preset =7 % (Skybox.preset + 1);
     *             });
     *         }
     *     }
     * }
     * ```
     */
    class Skybox {
        /**
         * @description 获取预设
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 返回预设
         */
        static get preset(): SkyPreset;
        /**
         * @description 设置预设
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param NewPreset usage:预设枚举
         */
        static set preset(NewPreset: SkyPreset);
        /**
         * @description 天空盒刷新
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         */
        static refresh(): void;
        /**
         * @description 重置为默认参数
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         */
        static reset(): void;
        /**
         * @description 设置天空盒贴图资源ID
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:贴图资源ID
         */
        static set skyDomeTextureID(value: string);
        /**
         * @description 获取天空盒贴图资源ID
         * @effect 只在客户端调用生效
         * @returns 贴图资源ID
         */
        static get skyDomeTextureID(): string;
        /**
         * @description 获取天空盒贴图yaw旋转（度）
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 天空盒贴图旋转
         */
        static get yawAngle(): number;
        /**
         * @description 设置天空盒贴图yaw旋转（度）
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:天空盒贴图yaw旋转度(0~360)
         */
        static set yawAngle(value: number);
        /**
         * @description 获取天空盒贴图roll旋转（度）
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 天空盒贴图旋转
         */
        static get rollAngle(): number;
        /**
         * @description 设置天空盒贴图roll旋转（度）
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:天空盒贴图旋转度(0~360)
         */
        static set rollAngle(value: number);
        /**
        * @description 获取天空盒贴图pitch旋转（度）
        * @groups 场景/灯光
        * @effect 只在客户端调用生效
        * @returns 天空盒贴图旋转
        */
        static get pitchAngle(): number;
        /**
        * @description 设置天空盒贴图pitch旋转（度）
        * @groups 场景/灯光
        * @effect 只在客户端调用生效
        * @param value usage:天空盒贴图旋转度(0~360)
        */
        static set pitchAngle(value: number);
        /**
         * @description 获取天空盒亮度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 天空盒亮度
         */
        static get skyDomeIntensity(): number;
        /**
         * @description 设置天空盒亮度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:天空盒亮度值(0~100)
         */
        static set skyDomeIntensity(value: number);
        /**
         * @description 获取天空盒颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 天空盒颜色
         */
        static get skyDomeBaseColor(): mw.LinearColor;
        /**
         * @description 设置天空盒颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:天空盒颜色值
         */
        static set skyDomeBaseColor(value: mw.LinearColor);
        /**
         * @description 获取是否开启渐变效果
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 是否开启渐变效果
         */
        static get skyDomeGradientEnabled(): boolean;
        /**
         * @description 设置是否开启渐变效果
         * @effect 只在客户端调用生效
         * @groups 场景/灯光
         * @param value usage:是否开启渐变效果
         */
        static set skyDomeGradientEnabled(value: boolean);
        /**
         * @description 获取天空顶层颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 天空顶层颜色
         */
        static get skyDomeTopColor(): mw.LinearColor;
        /**
         * @description 设置天空顶层颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:天空顶层颜色值
         */
        static set skyDomeTopColor(value: mw.LinearColor);
        /**
         * @description 天空中层颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 天空中层颜色
         */
        static get skyDomeMiddleColor(): mw.LinearColor;
        /**
         * @description 设置天空中层颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:天空中层颜色值
         */
        static set skyDomeMiddleColor(value: mw.LinearColor);
        /**
         * @description 天空下层颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 天空下层颜色
         */
        static get skyDomeBottomColor(): mw.LinearColor;
        /**
         * @description 设置天空下层颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:天空下层颜色值
         */
        static set skyDomeBottomColor(value: mw.LinearColor);
        /**
         * @description 获取地平线渐出值
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 地平线渐出值
         */
        static get skyDomeHorizontalFallOff(): number;
        /**
         * @description 设置地平线渐出值
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:地平线渐出值(1~20)
         */
        static set skyDomeHorizontalFallOff(value: number);
        /**
         * @description 获取是否开启星星
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 是否开启星星
         */
        static get starVisible(): boolean;
        /**
         * @description 设置是否开启星星
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:是否开启星星
         */
        static set starVisible(value: boolean);
        /**
         * @description 设置星星贴图资源ID
         * @effect 只在客户端调用生效
         * @groups 场景/灯光
         * @param value usage:星星贴图资源ID
         */
        static set starTextureID(value: string);
        /**
         * @description 获取星星贴图ID
         * @effect 只在客户端调用生效
         * @returns 星星贴图ID
         */
        static get starTextureID(): string;
        /**
         * @description 获取星星亮度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 星星亮度
         */
        static get starIntensity(): number;
        /**
         * @description 设置星星亮度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:星星亮度(0~1)
         */
        static set starIntensity(value: number);
        /**
         * @description 获取星星密度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 星星密度
         */
        static get starDensity(): number;
        /**
         * @description 设置星星密度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:星星密度(0~100)
         */
        static set starDensity(value: number);
        /**
         * @description 获取是否开启太阳
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 是否开启太阳
         */
        static get sunVisible(): boolean;
        /**
         * @description 设置是否开启太阳
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:是否开启太阳
         */
        static set sunVisible(value: boolean);
        /**
         * @description 设置太阳贴图资源ID
         * @effect 只在客户端调用生效
         * @groups 场景/灯光
         * @param value usage:太阳贴图资源ID
         */
        static set sunTextureID(value: string);
        /**
         * @description 获取太阳贴图ID
         * @effect 只在客户端调用生效
         * @returns 太阳贴图ID
         */
        static get sunTextureID(): string;
        /**
         * @description 获取太阳光亮度
         * @effect 只在客户端调用生效
         * @returns 太阳光亮度
         * @groups 场景/灯光
         */
        static get sunIntensity(): number;
        /**
         * @description 设置太阳光亮度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:太阳光亮度(0~2000)
         */
        static set sunIntensity(value: number);
        /**
         * @description 获取太阳颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 太阳颜色
         */
        static get sunColor(): mw.LinearColor;
        /**
         * @description 设置太阳颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:太阳颜色
         */
        static set sunColor(value: mw.LinearColor);
        /**
         * @description 获取太阳大小
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 太阳大小
         */
        static get sunSize(): number;
        /**
         * @description 设置太阳大小
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:太阳大小(0~100)
         */
        static set sunSize(value: number);
        /**
         * @description 获取是否开启月亮
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 是否开启月亮
         */
        static get moonVisible(): boolean;
        /**
         * @description 设置是否开启月亮
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:是否开启月亮
         */
        static set moonVisible(value: boolean);
        /**
         * @description 设置月亮贴图资源ID
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:月亮贴图资源ID
         */
        static set moonTextureID(value: string);
        /**
         * @description 获取月亮贴图ID
         * @effect 只在客户端调用生效
         * @returns 月亮贴图ID
         */
        static get moonTextureID(): string;
        /**
         * @description 获取月亮亮度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 月亮亮度
         */
        static get moonIntensity(): number;
        /**
         * @description 设置月亮亮度
         * @effect 只在客户端调用生效
         * @groups 场景/灯光
         * @param value usage:月亮亮度(0~2000)
         */
        static set moonIntensity(value: number);
        /**
         * @description 获取月亮颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 月亮颜色
         */
        static get moonColor(): mw.LinearColor;
        /**
         * @description 设置月亮颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:月亮颜色
         */
        static set moonColor(value: mw.LinearColor);
        /**
         * @description 获取月亮大小
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 月亮大小
         */
        static get moonSize(): number;
        /**
         * @description 设置月亮大小
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:月亮大小(0~100)
         */
        static set moonSize(value: number);
        /**
         * @description 获取是否开启云
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 是否开启云
         */
        static get cloudVisible(): boolean;
        /**
         * @description 设置是否开启云
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:是否开启云
         */
        static set cloudVisible(value: boolean);
        /**
         * @description 设置云贴图资源ID
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:云贴图资源ID
         */
        static set cloudTextureID(value: string);
        /**
         * @description 获取云贴图ID
         * @effect 只在客户端调用生效
         * @returns 云贴图ID
         */
        static get cloudTextureID(): string;
        /**
         * @description 获取云的透明度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 云的透明度
         */
        static get cloudOpacity(): number;
        /**
         * @description 设置云的透明度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:云的透明度(0~1)
         */
        static set cloudOpacity(value: number);
        /**
         * @description 获取云颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 云颜色
         */
        static get cloudColor(): mw.LinearColor;
        /**
         * @description 设置云颜色
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:云颜色
         */
        static set cloudColor(value: mw.LinearColor);
        /**
         * @description 获取云密度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 云密度
         */
        static get cloudDensity(): number;
        /**
         * @description 设置云密度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:云密度(0~1)
         */
        static set cloudDensity(value: number);
        /**
         * @description 获取云速度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 云速度
         */
        static get cloudSpeed(): number;
        /**
         * @description 设置云速度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:云速度(0~10)
         */
        static set cloudSpeed(value: number);
        /**
         * @description 获取天空球旋转
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 天空球旋转值
         */
        static get skyboxRotation(): mw.Rotation;
        /**
         * @description 设置天空球旋转
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:天空球旋转值
         */
        static set skyboxRotation(value: mw.Rotation);
        /**
         * @description 获取扰动开关
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 扰动开关
         */
        static get disturbanceEnabled(): boolean;
        /**
         * @description 设置扰动开关
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:扰动开关
         */
        static set disturbanceEnabled(value: boolean);
        /**
         * @description 获取扰动强度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 扰动强度
         */
        static get disturbanceIntensity(): number;
        /**
         * @description 设置扰动强度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:扰动强度
         */
        static set disturbanceIntensity(value: number);
        /**
         * @description 获取扰动密度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @returns 扰动密度
         */
        static get disturbanceDensity(): number;
        /**
         * @description 设置扰动密度
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:扰动密度
         */
        static set disturbanceDensity(value: number);
        /**
        * @description 设置是否开启分层扰动
        * @groups 场景/灯光
        * @effect 只在客户端调用生效
        * @returns 是否开启分层扰动
        */
        static get layerDisturbanceEnabled(): boolean;
        /**
         * @description 设置是否开启分层扰动
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:是否开启分层扰动
         */
        static set layerDisturbanceEnabled(value: boolean);
        /**
        * @description 设置是否受环境雾影响
        * @groups 场景/灯光
        * @effect 只在客户端调用生效
        * @returns 是否受环境雾影响
        */
        static get affectedByFog(): boolean;
        /**
         * @description 设置是否受环境雾影响
         * @groups 场景/灯光
         * @effect 只在客户端调用生效
         * @param value usage:是否受环境雾影响
         */
        static set affectedByFog(value: boolean);
        /**
         * @description 开始切换天空盒背景
         * @effect 只在客户端调用生效
         * @param targetTexture usage:要切换到的天空球贴图 range: 无
         * @param switchMode usage:过渡方式
         * @param switchTime usage:过渡时间,单位：秒 range: 无 type: 浮点型
         * @returns 是否在切换
         */
        static startSwitch(targetTexture: string, switchMode: SkyboxBackgroundSwitchMode, switchTime: number): boolean;
        /**
         * @description 暂停天空盒背景
         * @effect 只在客户端调用生效
         */
        static pausSwitch(): void;
    }
}

declare namespace mw {
    /**
     * @groups 场景/音效
     * @author baoqiang.han
     * @description 音效衰减形状
     * @groups 玩法
     */
    enum AttenuationShape {
        /** 球体 */
        Sphere = 0,
        /** 胶囊体 */
        Capsule = 1,
        /** 盒体 */
        Box = 2,
        /** 锥体 */
        Cone = 3
    }
    /**
     * @groups 场景/音效
     * @author baoqiang.han
     * @description 音效播放状态
     * @groups 玩法
     */
    enum SoundPlayState {
        /** 播放 */
        Playing = 0,
        /** 停止 */
        Stopped = 1,
        /** 暂停 */
        Paused = 2
    }
    /**
     * @groups 场景/音效
     * @author baoqiang.han
     * @description 音效衰减函数模型
     * @groups 玩法
     */
    enum AttenuationDistanceModel {
        /** 线性衰减 */
        Linear = 0,
        /** 指数衰减 */
        Logarithmic = 1,
        /** 倒数衰减 */
        Inverse = 2,
        /** 反指数衰减 */
        LogReverse = 3
    }
    /**
     * @author baoqiang.han
     * @groups 场景/音效
     * @description 音效
     * @networkStatus usage:客户端
     * @example
     * 使用示例:创建一个名为"SoundExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你可以听到音效的声音。代码如下：
     * ```
     * @Component
     * export default class SoundExample extends Script {
     *
     *     private readonly sound = {
     *         assetID: "14929",
     *         object: null as mw.Sound,
     *     };
     *
     *     protected onStart(): void {
     *         this.createSound();
     *     }
     *
     *     @mw.RemoteFunction(mw.Client)
     *     public async createSound(): Promise<void> {
     *         const success = await AssetUtil.asyncDownloadAsset(this.sound.assetID);
     *             if (success) {
     *                 // 下载完毕创建音效
     *                 this.sound.object = await GameObject.asyncSpawn<mw.Sound>(this.sound.assetID);
     *
     *                 // 设置音效transform
     *                 const transform = new Transform(new Vector(0, 0, 0), new Rotation(0, 0, 0), new Vector(1, 1, 1));
     *                 this.sound.object.worldTransform = transform;
     *
     *                 // 设置音效为空间音效
     *                 this.sound.object.isUISound = false;
     *                 this.sound.object.isSpatialization = true;
     *                 // 设置UI音效形状为球形
     *                 this.sound.object.attenuationShape = AttenuationShape.Sphere;
     *                 // 设置音效范围100
     *                 this.sound.object.attenuationShapeExtents = new Vector(100,0,0);
     *                 // 设置音效衰减距离为200
     *                 this.sound.object.falloffDistance = 200;
     *                 // 设置音效音量
     *                 this.sound.object.volume = 1;
     *                 // 开启音效循环
     *                 this.sound.object.isLoop = true;
     *                 // 播放音效
     *                 this.sound.object.play();
     *             }
     *     }
     * }
     * ```
     */
    class Sound extends mw.GameObject {
        /**
         * @groups 场景/音效
         * @description 声音结束事件
         */
        onFinish: mw.MulticastDelegate<() => void>;
        /**
         * @groups 场景/音效
         * @description 声音开始事件
         */
        onPlay: mw.MulticastDelegate<() => void>;
        /**
         * @groups 场景/音效
         * @description 声音暂停事件
         */
        onPause: mw.MulticastDelegate<() => void>;
        /**
         * @description 播放音效
         * @groups 场景/音效
         * @effect 调用端生效
         * @param startTime usage:设置起始播放时间 default:0  range: 不大于音效的时长  type: 浮点数
         * @param onSuccess usage:播放完成后回调 default: null
         */
        play(startTime?: number, onSuccess?: () => void | void): void;
        /**
         * @groups 场景/音效
         * @groups 场景/音效
         * @description 停止播放音效
         * @effect 调用端生效
         */
        stop(): void;
        /**
         * @description 暂停播放音效
         * @effect 调用端生效
         * @groups 场景/音效
         * @param bPause usage:设置暂停状态 default:true
         */
        pause(bPause?: boolean): void;
        /**
         * @description 获取音效时长
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @returns 音效时长(ms)
         */
        get timeLength(): number;
        /**
         * @groups 场景/音效
         * @description 获取音效播放状态
         * @effect 只在客户端调用生效
         * @returns 是否正在播放
         */
        get playState(): SoundPlayState;
        /**
        * @description 设置是否是UI音效，注意：UI音效不依赖游戏逻辑
        * @groups 场景/音效
        * @effect 只在客户端调用生效
        * @param isUISound usage:是否用于UI
        */
        set isUISound(isUISound: boolean);
        /**
         * @description 获取是否是UI音效
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @returns boolean
         */
        get isUISound(): boolean;
        /**
         * @description 获取音效的衰减方式
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @returns 衰减方式
         */
        get attenuationDistanceModel(): AttenuationDistanceModel;
        /**
         * @description 设置音效的衰减方式
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * param model usage:衰减方式
         */
        set attenuationDistanceModel(model: AttenuationDistanceModel);
        /**
         * @description 获取音效的形状
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @returns 形状
         */
        get attenuationShape(): AttenuationShape;
        /**
         * @description 设置音效的形状
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * param model usage:形状
         */
        set attenuationShape(shape: AttenuationShape);
        /**
         * @description 获取当前已播放时长
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @returns 已播放时长
         */
        get timePosition(): number;
        /**
         * @description 设置循环播放
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @param Loop usage:设置是否开启循环
         */
        set isLoop(Loop: boolean);
        /**
         * @description 获取是否循环播放
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @returns 是否循环
         */
        get isLoop(): boolean;
        /**
         * @description 设置音效空间化，若是，则开启空间传播衰减
         * @effect 只在客户端调用生效
         * @groups 场景/音效
         * @param spatialization usage:设置开启音效空间化
         */
        set isSpatialization(spatialization: boolean);
        /**
         * @description 获取音效空间化
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @returns 是否开启音效空间化
         */
        get isSpatialization(): boolean;
        /**
         * @description 设置音效形状范围 用于衰减形状的尺寸，每个形状的值解释不同。
         * @description 球体 X是球体半径，Y和Z未使用
         * @description 胶囊 X是半高，Y是半径，Z未使用
         * @description 长方体 X、Y和Z是长方体的尺寸
         * @description 圆锥体 X是圆锥体半径，Y是圆锥体角度，Z是圆锥体衰减角度
         * @effect 只在客户端调用生效
         * @groups 场景/音效
         * @param ShapeExtents usage:设置形状范围
         */
        set attenuationShapeExtents(ShapeExtents: mw.Vector);
        /**
         * @description 获取音效形状范围
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @returns 音效范围
         */
        get attenuationShapeExtents(): mw.Vector;
        /**
         * @description 设置衰减距离
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @param falloffDistance usage:距离
         */
        set falloffDistance(falloffDistance: number);
        /**
         * @description 获取衰减距离
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @returns 距离
         */
        get falloffDistance(): number;
        /**
         * @description 设置音量 0~1
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @param volume usage:音量比例
         */
        set volume(volume: number);
        /**
         * @description 获取音量比例
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @returns 音量比例
         */
        get volume(): number;
        /**
         * @description 通过 GUID 设置音效
         * @groups 场景/音效
         * @effect 只在客户端调用生效
         * @param assetGUID usage:音效资源 ID  range: 依据 ID 长度而定
         */
        setSoundAsset(assetGUID: string): void;
    }
}

declare namespace mw {
    /**
     * @author yunhao.liao
     * @description 样条线
     * @groups 玩法/其他
     */
    enum PointType {
        /** 线性插值 */
        Linear = 0,
        /** 曲线插值 */
        Curve = 1,
        /** 恒定插值 */
        Constant = 2,
        /** 带有端点约束的曲线插值 */
        CurveClamped = 3,
        /** 带有自定义切线的曲线插值 */
        CurveCustomTangent = 4
    }
    /**
     * @author yunhao.liao
     * @groups 玩法/其他
     * @description 样条线
     * @networkStatus usage:双端
     */
    class Spline extends mw.GameObject {
        /**
         * @description 获取样条线点的数量
         * @effect 调用端生效
         * @returns 样条线点的数量
         */
        get pointCount(): number;
        /**
         * @description 设置样条线点的数量
         * @effect 调用端生效
         * @param value usage:样条线点的数量 type: 整型 range: 无
         */
        set pointCount(value: number);
        /**
         * @description 获取是否自动闭合，起点和终点生成一条连接线
         * @effect 调用端生效
         * @returns 是否自动闭合
         */
        get loop(): boolean;
        /**
         * @description 设置是否自动闭合，起点和终点生成一条连接线
         * @effect 调用端生效
         * @param value usage:是否自动闭合 range:[true,false]
         */
        set loop(value: boolean);
        /**
         * @description 获取样条线颜色
         * @effect 调用端生效
         * @returns 样条线颜色
         */
        get color(): mw.LinearColor;
        /**
         * @description 设置样条线颜色
         * @effect 调用端生效
         * @param value usage:样条线颜色 range: 无
         */
        set color(value: mw.LinearColor);
        /**
         * @description 获取样条线的宽度
         * @effect 调用端生效
         * @returns 样条线宽度
         */
        get width(): number;
        /**
         * @description 设置样样条线的宽度
         * @effect 调用端生效
         * @param value usage:样条线宽度 type: 浮点型 range: 无
         */
        set width(value: number);
        /**
         * @description 获取线条中指定索引处的顶点位置
         * @effect 调用端生效
         * @param index usage:索引 type: 整型 range: 无
         * @returns 顶点位置
         */
        getPointPosition(index: number): mw.Vector;
        /**
         * @description 设置线条中指定索引处的顶点位置
         * @effect 调用端生效
         * @param index usage:索引 type: 整型 range: 无
         * @param position usage:顶点位置
         */
        setPointPosition(index: number, position: mw.Vector): void;
        /**
         * @description 获取线条中指定索引处的顶点旋转
         * @effect 调用端生效
         * @param index usage:索引 type: 整型 range: 无
         * @returns 顶点旋转
         */
        getPointRotation(index: number): mw.Rotation;
        /**
         * @description 设置线条中指定索引处的顶点旋转
         * @effect 调用端生效
         * @param index usage:索引 type: 整型 range: 无
         * @param rotation usage:顶点旋转
         */
        setPointRotation(index: number, rotation: mw.Rotation): void;
        /**
         * @description 获取线条中指定索引处的顶点X轴缩放
         * @effect 调用端生效
         * @param index usage:索引 type: 整型 range: 无
         * @returns 顶点X轴缩放
         */
        getPointXScale(index: number): number;
        /**
         * @description 设置线条中指定索引处的顶点X轴缩放
         * @effect 调用端生效
         * @param index usage:索引 type: 整型 range: 无
         * @param xScale usage:顶点X轴缩放 default:1  range: [0.01, 1000] type: 浮点型
         */
        setPointXScale(index: number, xScale: number): void;
        /**
         * @description 获取线条类型
         * @effect 调用端生效
         * @param index usage:索引 type: 整型 range: 无
         * @returns 顶点线条类型
         */
        getPointType(index: number): PointType;
        /**
         * @description 设置线条类型
         * @effect 调用端生效
         * @param index usage:索引 type: 整型 range: 无
         * @param type usage:顶点线条类型
         */
        setPointType(index: number, type: PointType): void;
        /**
         * @description 获取到达切线
         * @effect 调用端生效
         * @param index usage:索引 type: 整型 range: 无
         * @returns 到达切线
         */
        getArriveTangent(index: number): mw.Vector;
        /**
         * @description 设置到达切线
         * @effect 调用端生效
         * @param index usage:索引 type: 整型 range: 无
         * @param tangent usage:到达切线
         */
        setArriveTangent(index: number, tangent: mw.Vector): void;
        /**
         * @description 获取离开切线
         * @effect 调用端生效
         * @param index usage:索引 type: 整型 range: 无
         * @returns 离开切线
         */
        getLeaveTangent(index: number): mw.Vector;
        /**
         * @description 设置离开切线
         * @effect 调用端生效
         * @param index usage:索引 type: 整型 range: 无
         * @param tangent usage:离开切线
         */
        setLeaveTangent(index: number, tangent: mw.Vector): void;
        /**
         * @description 清空线条点
         * @effect 调用端生效
         */
        clearLinePoints(): void;
        /**
         * @author yunhao.liao
         * @description 绘制点
         * @groups 玩法
         * @effect 只在客户端调用生效
         * @param position usage:位置
         * @param size usage:尺寸 range: 无 type: 浮点型
         * @param color usage:颜色
         * @param duration usage:持续时间 range: 无 type: 浮点型
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果。创建一个名为"SplineExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏
         * ```
         * @Component
         * export default class SplineExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 绘制点
         *                 Spline.drawPoint(Vector.zero, 1, LinearColor.white, 1);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static drawPoint(position: mw.Vector, size: number, color: mw.LinearColor, duration: number): void;
        /**
         * @author yunhao.liao
         * @description 绘制线段
         * @groups 玩法
         * @effect 只在客户端调用生效
         * @param start usage:开始位置
         * @param end usage:结束位置
         * @param color usage:颜色
         * @param duration usage:持续时间 range: 无 type: 浮点型
         * @param thickness usage:厚度 range: 无 type: 浮点型
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果。创建一个名为"SplineExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏
         * ```
         * @Component
         * export default class SplineExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 绘制点
         *                 Spline.drawLine(Vector.zero, Vector.one, LinearColor.white, 1, 1);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static drawLine(start: mw.Vector, end: mw.Vector, color: mw.LinearColor, duration: number, thickness: number): void;
        /**
         * @author yunhao.liao
         * @description 绘制圆圈
         * @groups 玩法
         * @effect 只在客户端调用生效
         * @param center usage:中心位置
         * @param radius usage:半径 range: 无 type: 浮点型
         * @param segments usage:段数 range: 无 type: 整形
         * @param color usage:颜色 default:
         * @param duration usage:持续时间 range: 无 type: 浮点型
         * @param thickness usage:厚度 range: 无 type: 浮点型
         * @param yAxis usage:Y轴方向 default: undefined
         * @param zAxis usage:Z轴方向 default: undefined
         * @param drawAxis usage:是否绘制轴 range:[true,false] default: undefined
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果。创建一个名为"SplineExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏
         * ```
         * @Component
         * export default class SplineExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 绘制点
         *                 Spline.drawCircle(Vector.zero, 1, 4, LinearColor.white, 1, 1);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static drawCircle(center: mw.Vector, radius: number, segments: number, color: mw.LinearColor, duration: number, thickness: number, yAxis?: mw.Vector, zAxis?: mw.Vector, drawAxis?: boolean): void;
        /**
         * @author yunhao.liao
         * @description 绘制球体
         * @groups 玩法
         * @effect 只在客户端调用生效
         * @param center usage:中心位置
         * @param radius usage:半径 range: 无 type: 浮点型
         * @param segments usage:段数 range: 无 type: 整形
         * @param color usage:颜色
         * @param duration usage:持续时间 range: 无 type: 浮点型
         * @param thickness usage:厚度 range: 无 type: 浮点型
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果。创建一个名为"SplineExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏
         * ```
         * @Component
         * export default class SplineExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 绘制点
         *                 Spline.drawSphere(Vector.zero, 1, 4, LinearColor.white, 1, 1);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static drawSphere(center: mw.Vector, radius: number, segments: number, color: mw.LinearColor, duration: number, thickness: number): void;
        /**
         * @author yunhao.liao
         * @description 绘制胶囊体
         * @groups 玩法
         * @effect 只在客户端调用生效
         * @param center usage:中心位置
         * @param halfHeight usage:胶囊体半高 range: 无 type: 浮点型
         * @param radius usage:胶囊体半径 range: 无 type: 浮点型
         * @param rotation usage:胶囊体朝向
         * @param color usage:颜色
         * @param duration usage:持续时间 range: 无 type: 浮点型
         * @param thickness usage:厚度 range: 无 type: 浮点型
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果。创建一个名为"SplineExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏
         * ```
         * @Component
         * export default class SplineExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 绘制点
         *                 Spline.drawCapsule(Vector.zero, 20, 10, Rotation.zero, LinearColor.white, 1, 1);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static drawCapsule(center: mw.Vector, halfHeight: number, radius: number, rotation: mw.Rotation, color: mw.LinearColor, duration: number, thickness: number): void;
        /**
         * @author yunhao.liao
         * @description 绘制盒体
         * @groups 玩法
         * @effect 只在客户端调用生效
         * @param center usage:中心位置
         * @param extent usage:盒体范围
         * @param color usage:颜色
         * @param rotation usage:盒体朝向
         * @param duration usage:持续时间 range: 无 type: 浮点型
         * @param thickness usage:厚度 range: 无 type: 浮点型
         * @example
         * 使用示例: 可按如下操作控制编辑器后处理实时效果。创建一个名为"SplineExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏
         * ```
         * @Component
         * export default class SplineExample extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 // 绘制点
         *                 Spline.drawBox(Vector.zero, Vector.one, LinearColor.white, Rotation.zero, 1, 1);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static drawBox(center: mw.Vector, extent: mw.Vector, color: mw.LinearColor, rotation: mw.Rotation, duration: number, thickness: number): void;
    }
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @groups 玩法/游泳
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:031 reason: API 优化 replacement: WaterVolume
     * @description 游泳区域
     * @description ----------------------------------
     * @description 拖入 SwimmingVolume 调整游泳区域的大小，角色进入游泳区域会切换成游泳状态。
     * @networkStatus usage:双端
     * @example
     * 使用示例:创建一个名为"SwimmingVolExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，替换GUID保存，运行游戏，你将可以通过F1键获取角色是否处于该GUID对应的游泳区。
     * ```
     * @Component
     * export default class SwimmingVolExample extends Script {
     *     // 当脚本被实例后，会在第一帧更新前调用此函数
     *     protected async onStart(): Promise<void> {
     *         // GUID根据实际情况填写，可在编辑器对象管理器内右键复制对象ID
     *         let swimmingVolume = await GameObject.asyncFindGameObjectById(`GUID`) as SwimmingVolume;
     *         if(SystemUtil.isClient())
     *         {
     *             InputUtil.onKeyDown(Keys.F1,()=>{
     *                 // F1键 通知获取流体摩擦力
     *                 console.log("当前游泳区流体摩擦力为：" + swimmingVolume.fluidFriction);
     *             });
     *         }
     *     }
     * }
     * ```
     */
    class SwimmingVolume extends mw.GameObject {
        /**
         * @description 进入游泳区域事件
         * @groups 玩法/游泳
         */
        onEnter: mw.MulticastGameObjectDelegate;
        /**
         * @description 离开游泳区域事件
         * @groups 玩法/游泳
         */
        onLeave: mw.MulticastGameObjectDelegate;
        /**
         * @description 获取流体摩擦力
         * @groups 玩法/游泳
         * @effect 调用端生效
         * @returns 当前游泳区流体摩擦力
         */
        get fluidFriction(): number;
        /**
         * @description 设置流体摩擦力
         * @effect 调用端生效
         * @param value usage:设置游泳区流体摩擦力
         */
        set fluidFriction(value: number);
    }
}

declare namespace mw {
    /**
     * @hidden
     * @author baoqiang.han
     * @groups 输入
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:流程自动化，不再需要 replacement: mw.TouchInputUtil
     * @description 玩家从可触摸设备获取的数据信息，包含触摸手指数量，触摸位置(屏幕像素)和当前触摸状态(点击/滑动/离开)
     * @networkStatus usage:客户端
     */
    class TouchInput {
        /**
         * @description 触摸事件
         * @groups 输入
         */
        onTouch: mw.MulticastDelegate<(index: number, location: mw.Vector2, touchType: mw.TouchInputType) => void>;
        /**
         * @description 触摸开始事件
         * @groups 输入
         */
        onTouchBegin: mw.MulticastDelegate<(index: number, location: mw.Vector2, touchType: mw.TouchInputType) => void>;
        /**
         * @description 触摸移动事件
         * @groups 输入
         */
        onTouchMove: mw.MulticastDelegate<(index: number, location: mw.Vector2, touchType: mw.TouchInputType) => void>;
        /**
         * @description 触摸结束事件
         * @groups 输入
         */
        onTouchEnd: mw.MulticastDelegate<(index: number, location: mw.Vector2, touchType: mw.TouchInputType) => void>;
        /**
         * @author baoqiang.han
         * @groups 输入
         * @description 获取屏幕手指数的数组
         * @effect 只在客户端调用生效
         * @returns 当前Touch数组
         */
        getTouchVectorArray(): Array<mw.Vector>;
    }
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @description 碰撞类型
     * @groups 玩法/物理
     */
    enum CollisionType {
        /** 无碰撞 */
        NoCollision = 0,
        /** 仅检测 */
        QueryOnly = 1,
        /** 仅物理 */
        PhysicsOnly = 2,
        /** 物理和检测 */
        QueryAndPhysics = 3
    }
    /**
     * @author baoqiang.han
     * @description 碰撞形状
     * @groups 玩法/物理
     */
    enum TriggerShapeType {
        /** 盒体 */
        Box = 0,
        /** 球体 */
        Sphere = 1
    }
    /**
     * @author baoqiang.han
     * @groups 玩法/触发器
     * @description 触发器
     * @description 当与触发器交互时，可以触发事件。所有触发器都差不多，区别在于形状不同——有盒体和球体——触发器通过这些形状来判断其他对象是否碰撞并激活了它。
     * @description 触发器是一个很有用的工具。你可以使用触发器实现很多有趣的玩法，比如创建一个脚本放在放在触发器子级，同时在触发器子级放置一个金币模型，使用 onEnter 事件，完成角色进入触发器范围，金币消失的效果。
     * @networkStatus usage:双端
     * @precautions 各端运行，无自动同步
     * @example
     * 使用示例: 将如下脚本挂载至对象管理器触发器下。
     * ```
     * @Component
     * export default class TriggerExample extends Script {
     *     //当脚本被实例后，会在第一帧更新前调用此函数
     *     protected async onStart(): Promise<void> {
     *         // 获取当前脚本所挂载的触发器
     *         let Trigger = this.gameObject as Trigger
     *         // 对进入触发器事件进行绑定
     *         Trigger.onEnter.add((obj) => {
     *             // 输出Log
     *             console.log("OnEnter:" + obj.name);
     *         });
     *         // 对离开触发器事件进行绑定
     *         Trigger.onLeave.add((obj) => {
     *             // 输出Log
     *             console.log("OnLeave:" + obj.name);
     *         });
     *     }
     * }
     * ```
     */
    class Trigger extends mw.GameObject {
        /**
         * @description 进入触发器事件
         * @groups 玩法/触发器
         */
        onEnter: mw.MulticastDelegate<(gameObject: mw.GameObject) => void>;
        /**
         * @description 离开触发器事件
         * @groups 玩法/触发器
         */
        onLeave: mw.MulticastDelegate<(gameObject: mw.GameObject) => void>;
        /**
         * @description 是否已启用
         * @groups 玩法/触发器
         */
        get enabled(): boolean;
        /**
         * @groups 玩法/触发器
         * @description 是否已启用
         */
        set enabled(value: boolean);
        /**
         * @description 触发器形状
         * @groups 玩法/触发器
         */
        get shape(): TriggerShapeType;
        /**
         * @description 触发器形状
         * @groups 玩法/触发器
         */
        set shape(value: TriggerShapeType);
        /**
         * @description 触发器形状大小 Vector
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:031 reason: API 优化 replacement: scale
         */
        get shapeExtent(): mw.Vector;
        /**
         * @description 触发器形状，当形状为 Box 时，大小为 Vector；当形状为 Sphere 时，大小取参数的 Z 轴的值
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:031 reason: API 优化 replacement: scale
         */
        set shapeExtent(value: mw.Vector);
        /**
         * @description 判断指定对象是否在触发器区域
         * @groups 玩法/触发器
         * @effect 调用端生效
         * @param gameObject usage:传入需判断的对象
         * @returns true:为在触发器范围内
         */
        checkInArea(gameObject: mw.GameObject): boolean;
        /**
         * @description 设置立方体触发器大小
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:031 reason: API 优化 replacement: scale
         * @effect 调用端生效
         * @param InBoxExtent usage:盒体长宽高
         * @param updateOverlaps usage:是否刷新 default:true
         */
        setBoxExtent(InBoxExtent: mw.Vector, updateOverlaps?: boolean): void;
        /**
         * @description 设置球形触发器大小
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:031 reason: API 优化 replacement: scale
         * @effect 调用端生效
         * @param InSphereRadius usage:球体半径  range: 不做限制，合理即可  type: 浮点类型
         * @param updateOverlaps usage:是否刷新 default:true
         */
        setSphereRadius(InSphereRadius: number, updateOverlaps?: boolean): void;
    }
}

declare namespace mw {
    /**
     * @description UI空间位置枚举
     * @groups 界面
     * @author baoqiang.han
     */
    enum WidgetSpaceMode {
        /** 世界空间 */
        World = 0,
        /** 屏幕空间 */
        Screen = 1,
        /** 头顶UI */
        OverheadUI = 2
    }
    /**
     * @description UI形状枚举
     * @groups 界面
     * @author baoqiang.han
     */
    enum WidgetGeometryMode {
        /** 平面 */
        Plane = 0,
        /** 圆柱 */
        Cylinder = 1
    }
    /**
     * @author baoqiang.han
     * @groups 界面/基础
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:038 reason:接口废弃 replacement: 请使用WorldUI
     * @description 世界 UI
     * @description ----------------------
     * @description 1. UI 界面分为两种：屏幕 UI 和世界 UI。
     * @description UIWidget 是专门用来制作世界 UI 的。屏幕 UI 的详细制作方式请参考 UIService 或 UserWidget。
     * @description 2. UIWidget 有两种方式制作世界 UI ：
     * @description - :cactus: 动态加载（只使用代码动态创建一个世界 UI）
     * @example
     * 使用示例: 创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在场景中生成一个世界 UI - 滑动条
     * ```ts
     * @Component
     * export default class NewScript extends Script {
     *
     *     user:UserWidget;
     *     widget:UIWidget;
     *     progressBar:ProgressBar;
     *
     *     protected onStart(): void {
     *         if(SystemUtil.isClient()){
     *             this.creatUI();
     *             this.widget = GameObject.spawn<UIWidget>("UIWidget",{replicates:false});
     *             this.widget.worldTransform.position = new Vector(0,0,100);
     *             this.widget.setTargetUIWidget(this.user);
     *         }
     *     }
     *
     *     public creatUI(){
     *         this.user = UserWidget.newObject();
     *
     *         let rootCanvas = Canvas.newObject();
     *         rootCanvas.size = new Vector2(1920, 1080);
     *         rootCanvas.position = Vector2.zero;
     *
     *         this.user.rootContent = rootCanvas;
     *
     *         this.progressBar = ProgressBar.newObject(rootCanvas);
     *     }
     * }
     * ```
     * @description - :cactus: 在对象管理器中提前在物体上挂载世界 UI 逻辑对象，在属性面板中放置对应的 UIPrefab。
     * @networkStatus usage:客户端
     */
    class UIWidget extends mw.GameObject {
        /**
         * @description 设置碰撞状态
         * @groups 界面/基础
         * @effect 调用端生效
         * @precautions 建议双端物体设置碰撞，单端物体设置碰撞可能会导致拉扯的情况
         * @param status usage: 碰撞状态（Type.CollisionStatus 或者 mw.PropertyStatus）
         * @param propagateToChildren usage: 是否传递给子节点 default: false
         */
        setCollision(status: mw.PropertyStatus | mw.CollisionStatus, propagateToChildren?: boolean): void;
        /**
         * @description 返回碰撞状态
         * @groups 界面/基础
         * @effect 调用端生效
         * @returns 碰撞状态
         */
        getCollision(): mw.PropertyStatus | mw.CollisionStatus;
        /**
         * @description 设置世界UI交互状态
         * @groups 界面/基础
         * @precautions 对世界UI，头顶UI生效
         * @effect 只在客户端调用生效
         * @param inInteraction usage:是否可交互
         * @returns 是否设置成功
         */
        set interaction(inInteraction: boolean);
        /**
         * @description 获取世界UI交互状态
         * @groups 界面/基础
         * @precautions 对世界UI，头顶UI生效
         * @effect 只在客户端调用生效
         * @returns 是否可交互
         */
        get interaction(): boolean;
        /**
         * @description 通过 GUID 设置 UI
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @param ID usage:UI 的 ID  range: 依据资源 Id 长度决定
         */
        setUIbyID(ID: string): void;
        /**
         * @description 请求重新绘制
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         */
        refresh(): void;
        /**
         * @description 获取显示方式
         * @groups 界面/基础
         * @returns 显示方式枚举
         */
        get widgetSpace(): WidgetSpaceMode;
        /**
         * @description 设置显示方式
         * @groups 界面/基础
         * @param newSpace usage:显示方式
         */
        set widgetSpace(newSpace: WidgetSpaceMode);
        /**
         * @description 获取实际渲染大小
         * @groups 界面/基础
         * @returns 渲染大小2D
         */
        get drawSize(): mw.Vector2;
        /**
         * @description 设置实际渲染大小
         * @groups 界面/基础
         * @param newSize usage:渲染大小2D
         */
        set drawSize(newSize: mw.Vector2);
        /**
         * @description 获取锚点位置
         * @groups 界面/基础
         * @returns 位置信息
         */
        get pivot(): mw.Vector2;
        /**
         * @description 设置锚点位置
         * @groups 界面/基础
         * @param position usage:位置信息
         */
        set pivot(position: mw.Vector2);
        /**
         * @description 获取最大头顶UI可见距离
         * @groups 界面/基础
         * @returns 可见距离
         */
        get headUIMaxVisibleDistance(): number;
        /**
         * @description 设置最大头顶UI可见距离
         * @groups 界面/基础
         * @param Value usage:可见距离
         */
        set headUIMaxVisibleDistance(Value: number);
        /**
         * @description 获取是否可被遮挡
         * @groups 界面/基础
         * @returns true：可被遮挡
         */
        get occlusionEnable(): boolean;
        /**
         * @description 设置是否可被遮挡
         * @groups 界面/基础
         * @param Value usage:布尔值
         */
        set occlusionEnable(Value: boolean);
        /**
         * @description 获取是否开启近大远小
         * @groups 界面/基础
         * @returns true：开启
         */
        get scaledByDistanceEnable(): boolean;
        /**
         * @description 设置是否开启近大远小
         * @groups 界面/基础
         * @param Value usage:布尔值
         */
        set scaledByDistanceEnable(Value: boolean);
        /**
         * @description 获取是否启用最大可见距离
         * @groups 界面/基础
         * @returns true：开启
         */
        get hideByDistanceEnable(): boolean;
        /**
         * @description 设置是否启用最大可见距离
         * @groups 界面/基础
         * @param Value usage:布尔值
         */
        set hideByDistanceEnable(Value: boolean);
        /**
         * @description 获取是否作为敌方玩家，敌方玩家不显示头顶UI
         * @returns 布尔值
         * @groups 界面/基础
         */
        get isEnemy(): boolean;
        /**
         * @description 设置是否作为敌方玩家，敌方玩家不显示头顶UI
         * @param Value usage:布尔值
         * @groups 界面/基础
         */
        set isEnemy(Value: boolean);
        /**
         * @description 获取是否可被自己遮挡
         * @groups 界面/基础
         * @returns 布尔值
         */
        get selfOcclusion(): boolean;
        /**
         * @description 设置是否可被自己遮挡
         * @groups 界面/基础
         * @param Value usage:布尔值
         */
        set selfOcclusion(Value: boolean);
        /**
         * @description 获取缩放距离系数
         * @groups 界面/基础
         * @returns 距离系数
         */
        get distanceScaleFactor(): number;
        /**
         * @description 设置缩放距离系数
         * @groups 界面/基础
         * @param Value usage:距离系数
         */
        set distanceScaleFactor(Value: number);
        /**
         * @description 获取UI对象资源
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @returns UI对象资源
        */
        getTargetUIWidget(): mw.UserWidget;
        /**
         * @description 设置UI，可以对当前的UI设置UI资源，UI资源可以从路径获取或直接取其他UI组件引用的资源
         * @param uiUserWidget usage:UI资源对象
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         */
        setTargetUIWidget(uiUserWidget: mw.UserWidget): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:命名修改 replacement:请使用setUIbyGUID()
         * @description 通过GUID设置UI
         * @effect 只在客户端调用生效
         * @param GUID usage:UI 的 GUID  range: 依据资源 ID 长度而定
         */
        setUIbuGUID(GUID: string): void;
        /**
         * @description 获取扩展参数
         * @groups 界面/基础
         * @returns 扩展参数
         */
        get extraParam(): string;
        /**
         * @description 设置扩展参数
         * @groups 界面/基础
         * @param Value usage:扩展参数
         */
        set extraParam(Value: string);
        /**
         * @description 设置渲染层级，较高渲染层级的对象会优先显示在离视线较近的地方
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @precautions 请在客户端调用
         * @param value usage: 新的渲染层级，值范围为 [0, 31]
         */
        set translucentSortPriority(value: number);
        /**
         * @description 获取渲染层级，较高渲染层级的对象会优先显示在离视线较近的地方
         * @effect 只在客户端调用生效
         * @precautions 请在客户端调用
         * @groups 界面/基础
         */
        get translucentSortPriority(): number;
    }
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @description 水体预设枚举
     * @groups 玩法/游泳
     */
    enum WaterPreset {
        /** 默认(二次元)*/
        Default_2D = 0,
        /** 海洋(写实) */
        Sea_Realist = 1,
        /** 泳池 */
        Swimming_Pool = 2,
        /** 湖泊 */
        Pool = 3,
        /** 湖泊(写实) */
        Pool_Realist = 4,
        /** 盐湖 */
        Salt_Lake = 5
    }
    /**
     * @author baoqiang.han
     * @groups 玩法/游泳
     * @description 水体区域
     * @description ----------------------------------
     * @description 拖入 WaterVolume 调整水体区域的大小，角色进入水体区域会切换成游泳状态。
     * @networkStatus usage:双端
     * @example
     * 使用示例:创建一个名为"WaterVolumeExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，替换GUID保存，运行游戏，你将可以通过F1键获取角色是否处于该GUID对应的游泳区。
     * ```
     * @Component
     * export default class WaterVolumeExample extends Script {
     *     // 当脚本被实例后，会在第一帧更新前调用此函数
     *     protected async onStart(): Promise<void> {
     *         // GUID根据实际情况填写，可在编辑器对象管理器内右键复制对象ID
     *         let WaterVolume = await GameObject.asyncFindGameObjectById(`GUID`) as WaterVolume;
     *         if(SystemUtil.isClient())
     *         {
     *             InputUtil.onKeyDown(Keys.F1,()=>{
     *                 // F1键 通知获取流体摩擦力
     *                 console.log("当前游泳区流体摩擦力为：" + WaterVolume.fluidFriction);
     *             });
     *             InputUtil.onKeyDown(Keys.F2,()=>{
     *                 // F2键 通知获取当前是否开启浮力
     *                 if (WaterVolume.buoyancyEnabled) {
     *                     console.log("当前游泳区已开启浮力");
     *                 } else {
     *                     console.log("当前游泳区未开启浮力");
     *                 }
     *             });
     *             InputUtil.onKeyDown(Keys.F3,()=>{
     *                 // F3键 通知获取液体密度（用于计算浮力）
     *                 console.log("当前游泳区密度为：" + WaterVolume.density);
     *             });
     *         }
     *     }
     * }
     * ```
     */
    class WaterVolume extends mw.GameObject {
        /**
         * @description 进入水体区域事件
         * @groups 玩法/游泳
         */
        onEnter: mw.MulticastGameObjectDelegate;
        /**
         * @groups 玩法/游泳
         * @description 离开水体区域事件
         */
        onLeave: mw.MulticastGameObjectDelegate;
        /**
         * @description 获取流体摩擦力
         * @groups 玩法/游泳
         * @effect 调用端生效
         * @returns 当前游泳区流体摩擦力
         */
        get fluidFriction(): number;
        /**
         * @description 获取是否启用水体浮力
         * @groups 水体区域属性
         * @effect 调用端生效
         * @returns 当前游泳区是否启用水体浮力
         * @default false
         */
        get buoyancyEnabled(): boolean;
        /**
         * @description 开启/关闭区域的浮力效果，在关闭时区域将不再提供"浮力"的物理模拟计算，以节省性能。
         * @groups 水体区域属性
         * @effect 调用端生效
         * @param newStatus usage:设置游泳区是否启用水体浮力
         */
        set buoyancyEnabled(newStatus: boolean);
        /**
         * @description 获取水体密度（用于计算浮力大小）
         * @groups 水体区域属性
         * @effect 调用端生效
         * @returns 当前水体密度
         * @default 10
         */
        get density(): number;
        /**
         * @description 设置水体密度（用于计算浮力大小），密度越大，浮力越大。
         * @groups 水体区域属性
         * @effect 调用端生效
         * @param newDensity usage:新的水体密度
         * @description 取值范围 [0 - 10000]
         */
        set density(newDensity: number);
        /**
         * @description 获取预设,仅对面板值生效
         * @effect 只在客户端调用生效
         * @returns 返回预设
         */
        get preset(): WaterPreset;
        /**
         * @description 设置预设
         * @effect 只在客户端调用生效
         * @param NewPreset usage:预设枚举
         */
        set preset(NewPreset: WaterPreset);
        /**
         * @description 获取潜水
         * @groups 玩法/游泳
         * @effect 调用端生效
         * @returns 当前游泳区是否启用潜水
         */
        get divingEnabled(): boolean;
        /**
         * @description 设置潜水
         * @groups 玩法/游泳
         * @effect 调用端生效
         * @param value usage:设置游泳区是否启用潜水
         */
        set divingEnabled(value: boolean);
        /**
         * @groups 玩法/游泳
         * @description 获取水体浅层颜色
         * @effect 调用端生效
         * @returns 当前游泳区浅层颜色
         */
        get surfaceColor(): mw.LinearColor;
        /**
         * @groups 玩法/游泳
         * @description 设置水体浅层颜色
         * @effect 调用端生效
         * @param value usage:设置游泳区浅层颜色
         */
        set surfaceColor(value: mw.LinearColor);
        /**
         * @groups 玩法/游泳
         * @description 获取水体深层颜色
         * @effect 客户端端生效
         * @returns 当前游泳区深层颜色
         */
        get deepColor(): mw.LinearColor;
        /**
         * @groups 玩法/游泳
         * @description 设置水体深层颜色
         * @effect 只在客户端调用生效
         * @param value usage:设置游泳区深层颜色
         */
        set deepColor(value: mw.LinearColor);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:032 reason:属性拆分 replacement: surfaceColor
         * @groups 玩法/游泳
         * @description 获取水体颜色
         * @effect 只在客户端调用生效
         * @returns 当前游泳区水体颜色
         */
        get waterColor(): mw.LinearColor;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:032 reason:属性拆分 replacement: surfaceColor
         * @groups 玩法/游泳
         * @description 设置水体颜色
         * @effect 只在客户端调用生效
         * @param value usage:设置游泳区水体颜色
         */
        set waterColor(value: mw.LinearColor);
        /**
         * @groups 玩法/游泳
         * @description 获取水体透明度
         * @effect 只在客户端调用生效
         * @returns 当前游泳区水体透明度
         */
        get transmittance(): number;
        /**
         * @groups 玩法/游泳
         * @description 设置水体透明度
         * @effect 只在客户端调用生效
         * @param value usage:设置游泳区水体透明度
         */
        set transmittance(value: number);
        /**
         * @groups 玩法/游泳
         * @description 获取水波密度
         * @effect 只在客户端调用生效
         * @returns 当前游泳区水波密度
         */
        get flowTile(): number;
        /**
         * @groups 玩法/游泳
         * @description 设置水波密度
         * @effect 只在客户端调用生效
         * @param value usage:设置游泳区水波密度
         */
        set flowTile(value: number);
        /**
         * @groups 玩法/游泳
         * @description 获取水波角度
         * @effect 只在客户端调用生效
         * @returns 当前游泳区水波角度
         */
        get flowAngle(): number;
        /**
         * @groups 玩法/游泳
         * @description 设置水波角度
         * @effect 只在客户端调用生效
         * @param value usage:设置游泳区水波角度
         */
        set flowAngle(value: number);
        /**
         * @groups 玩法/游泳
         * @description 获取水波速度
         * @effect 只在客户端调用生效
         * @returns 当前游泳区水波速度
         */
        get flowSpeed(): number;
        /**
         * @groups 玩法/游泳
         * @description 设置水波速度
         * @effect 只在客户端调用生效
         * @param value usage:设置游泳区水波速度
         */
        set flowSpeed(value: number);
        /**
         * @groups 玩法/游泳
         * @description 获取水波强度
         * @effect 只在客户端调用生效
         * @returns 当前游泳区水波强度
         */
        get normalFlat(): number;
        /**
         * @groups 玩法/游泳
         * @description 设置水波强度
         * @effect 只在客户端调用生效
         * @param value usage:设置游泳区水波强度
         */
        set normalFlat(value: number);
    }
}

declare namespace mw {
    /**
     * @description UI空间位置枚举
     * @groups 界面
     * @author baoqiang.han
     */
    enum SpaceMode {
        /** 世界空间 */
        World = 0,
        /** 屏幕空间 */
        Screen = 1
    }
    /**
     * @description UI形状枚举
     * @groups 界面
     * @author baoqiang.han
     */
    enum GeometryMode {
        /** 平面 */
        Plane = 0,
        /** 圆柱 */
        Cylinder = 1
    }
    /**
     * @author baoqiang.han
     * @groups 界面/基础
     * @description 世界 UI
     * @description ----------------------
     * @description 1. UI 界面分为两种：屏幕 UI 和世界 UI。
     * @description WorldUI 是专门用来制作世界 UI 的。屏幕 UI 的详细制作方式请参考 UIService 或 UserWidget。
     * @description 2. WorldUI 有两种方式制作世界 UI ：
     * @description - :cactus: 动态加载（只使用代码动态创建一个世界 UI）
     * @example
     * 使用示例: 创建一个名为 WorldUI 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在场景中生成一个世界 UI - 滑动条
     * ```ts
     * @Component
     * export default class WorldUI extends Script {
     *
     *     user:UserWidget;
     *     widget:WorldUI;
     *     progressBar:ProgressBar;
     *
     *     protected onStart(): void {
     *         if(SystemUtil.isClient()){
     *             this.creatUI();
     *             this.widget = GameObject.spawn<WorldUI>("WorldUI",{replicates:false});
     *             this.widget.worldTransform.position = new Vector(0,0,100);
     *             this.widget.setTargetUIWidget(this.user);
     *         }
     *     }
     *
     *     public creatUI(){
     *         this.user = UserWidget.newObject();
     *
     *         let rootCanvas = Canvas.newObject();
     *         rootCanvas.position = Vector2.zero;
     *         this.user.rootContent = rootCanvas;
     *
     *         this.progressBar = ProgressBar.newObject(rootCanvas);
     *     }
     * }
     * ```
     * @description - :cactus: 在对象管理器中提前在物体上挂载世界 UI 逻辑对象，在属性面板中放置对应的 UIPrefab。
     * @networkStatus usage:客户端
     */
    class WorldUI extends mw.GameObject {
        /**
         * @description 设置世界UI交互状态
         * @groups 界面/基础
         * @precautions 对世界UI，头顶UI生效
         * @effect 只在客户端调用生效
         * @param touchEnable usage:是否可交互
         * @returns 是否设置成功
         */
        set touchEnable(touchEnable: boolean);
        /**
         * @description 获取世界UI交互状态
         * @groups 界面/基础
         * @precautions 对世界UI，头顶UI生效
         * @effect 只在客户端调用生效
         * @returns 是否可交互
         */
        get touchEnable(): boolean;
        /**
         * @description 通过 GUID 设置 UI
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @param ID usage:UI 的 ID  range: 依据资源 Id 长度决定
         */
        setUIbyID(ID: string): void;
        /**
         * @description 请求重新绘制
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         */
        refresh(): void;
        /**
         * @description 获取显示方式
         * @groups 界面/基础
         * @returns 显示方式枚举
         */
        get spaceMode(): SpaceMode;
        /**
         * @description 设置显示方式
         * @groups 界面/基础
         * @param newSpace usage:显示方式
         */
        set spaceMode(spaceMode: SpaceMode);
        /**
         * @description 获取锚点位置
         * @groups 界面/基础
         * @returns 位置信息
         */
        get pivot(): mw.Vector2;
        /**
         * @description 设置锚点位置
         * @groups 界面/基础
         * @param position usage:位置信息
         */
        set pivot(position: mw.Vector2);
        /**
         * @description 获取最大UI可见距离
         * @groups 界面/基础
         * @returns 可见距离
         */
        get maxVisibleDistance(): number;
        /**
         * @description 设置最大UI可见距离
         * @groups 界面/基础
         * @param Value usage:可见距离
         */
        set maxVisibleDistance(Value: number);
        /**
         * @description 获取是否可被遮挡
         * @groups 界面/基础
         * @precautions 请在客户端调用，屏幕空间类型专用
         * @returns true：可被遮挡
         */
        get occlusionEnable(): boolean;
        /**
         * @description 设置是否可被遮挡
         * @groups 界面/基础
         * @precautions 请在客户端调用，屏幕空间类型专用
         * @param Value usage:布尔值
         */
        set occlusionEnable(Value: boolean);
        /**
         * @description 获取是否开启近大远小
         * @groups 界面/基础
         * @precautions 请在客户端调用，屏幕空间类型专用
         * @returns true：开启
         */
        get distanceScaleEnabled(): boolean;
        /**
         * @description 设置是否开启近大远小
         * @groups 界面/基础
         * @precautions 请在客户端调用，屏幕空间类型专用
         * @param Value usage:布尔值
         */
        set distanceScaleEnabled(Value: boolean);
        /**
         * @description 获取是否启用最大可见距离
         * @groups 界面/基础
         * @returns true：开启
         */
        get maxVisibleDistanceEnabled(): boolean;
        /**
         * @description 设置是否启用最大可见距离
         * @groups 界面/基础
         * @param Value usage:布尔值
         */
        set maxVisibleDistanceEnabled(Value: boolean);
        /**
         * @description 获取是否可被自己遮挡
         * @groups 界面/基础
         * @precautions 请在客户端调用，屏幕空间类型专用
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:命名修改 replacement:无
         * @returns 布尔值
         */
        get selfOcclusionEnabled(): boolean;
        /**
         * @description 设置是否可被自己遮挡
         * @groups 界面/基础
         * @precautions 请在客户端调用，屏幕空间类型专用
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:040 reason:命名修改 replacement:无
         * @param Value usage:布尔值
         */
        set selfOcclusionEnabled(Value: boolean);
        /**
         * @description 获取缩放距离系数
         * @groups 界面/基础
         * @precautions 请在客户端调用，屏幕空间类型专用
         * @returns 距离系数
         */
        get distanceScaleFactor(): number;
        /**
         * @description 设置缩放距离系数
         * @groups 界面/基础
         * @precautions 请在客户端调用，屏幕空间类型专用
         * @param Value usage:距离系数
         */
        set distanceScaleFactor(Value: number);
        /**
         * @description 获取UI对象资源
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @returns UI对象资源
        */
        getTargetUIWidget(): mw.UserWidget;
        /**
         * @description 设置UI，可以对当前的UI设置UI资源，UI资源可以从路径获取或直接取其他UI组件引用的资源
         * @param uiUserWidget usage:UI资源对象
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         */
        setTargetUIWidget(uiUserWidget: mw.UserWidget): void;
        /**
         * @description 设置渲染层级，较高渲染层级的对象会优先显示在离视线较近的地方
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @precautions 请在客户端调用
         * @param value usage: 新的渲染层级，值范围为 [0, 31]
         */
        set zOrder(value: number);
        /**
         * @description 获取渲染层级，较高渲染层级的对象会优先显示在离视线较近的地方
         * @effect 只在客户端调用生效
         * @precautions 请在客户端调用
         * @groups 界面/基础
         */
        get zOrder(): number;
        /**
         * @description 设置亮度
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @precautions 请在客户端调用，世界空间类型专用
         * @param value usage: UI亮度，值范围为 [0, 10]
         */
        set brightness(value: number);
        /**
         * @description 获取亮度值
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @precautions 请在客户端调用，世界空间类型专用
         */
        get brightness(): number;
        /**
         * @description 设置光照影响
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @precautions 请在客户端调用，世界空间类型专用
         * @param value usage: UI光照影响度，值范围为 [0, 1]
         */
        set lightInfluence(value: number);
        /**
         * @description 获取光照影响
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @precautions 请在客户端调用，世界空间类型专用
         */
        get lightInfluence(): number;
        /**
         * @description 设置是否保持最上显示
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @precautions 请在客户端调用，世界空间类型专用
         * @param value usage: UI是否保持最上显示
         */
        set alwaysOnTop(value: boolean);
        /**
         * @description 获取是否保持最上显示
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @precautions 请在客户端调用，世界空间类型专用
         */
        get alwaysOnTop(): boolean;
        /**
         * @description 设置是否保持朝向相机
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @precautions 请在客户端调用，世界空间类型专用
         * @param value usage: UI是否保持朝向相机
         */
        set alwaysFaceCamera(value: boolean);
        /**
         * @description 获取是否保持朝向相机
         * @groups 界面/基础
         * @effect 只在客户端调用生效
         * @precautions 请在客户端调用，世界空间类型专用
         */
        get alwaysFaceCamera(): boolean;
    }
}

/// <reference types="engine" />
declare namespace mw {
    // @ts-ignore
    import * as UE from "ue";
    // @ts-ignore
    import { $Nullable } from "puerts";
    /**
     * @author jun.zhang
     * @groups 玩法
     * @description 热武器状态
     */
    enum HotWeaponState {
        /** 准备好，可以进行射击 非射机姿态 */
        Idle = 0,
        /** 换弹夹，装弹 */
        Reloading = 1,
        /** 上膛 */
        Loading = 2,
        /** 射击中 */
        Firing = 3
    }
    /**
     * @description 热武器
     * @description 热武器功能是指游戏中武器的使用和管理机制，它使得玩家可以在战斗中使用各种类型的武器。
     * @description 1. 射击 - 玩家按下开火键，武器会射出子弹或光线。
     * @description 2. 上膛 - 每次射击后，都需要加载下一发弹药进入膛室。
     * @description 3. 换弹 - 当弹夹为空时，需要更换新的弹夹。
     * @description 4. 后坐力 - 射击时会产生后坐力，让准星会稍稍偏移。
     * @groups 玩法/热武器
     * @networkStatus usage: 双端
     * @author jun.zhang
     * @precautions 当装备上玩家时，此对象的功能才能生效。
     * @example
     * 使用示例: 创建一个名为"HotWeaponSample1"的脚本，放置在对象管理器中热武器对象子级，打开脚本，输入以下代码保存，在本地资源库中搜索80484、4172、4171动画资源，拖入对象管理器中的优先加载目录。运行游戏，按键1、2、3、4你将在场景中看到一个热武器设置参数，添加委托，绑定按键，以及人物换弹的效果，代码如下：
     * ```ts
     *  @Component
     *  export default class HotWeaponSample1 extends Script {
     *      protected onStart(): void {
     *          // 构造
     *          const hotWeapon = this.gameObject as HotWeapon;
     *
     *          if (SystemUtil.isServer()) {
     *              hotWeapon.fireComponent.isFireOnScreenCenter = false
     *              hotWeapon.fireComponent.clipSize = 50
     *              hotWeapon.fireComponent.fireInterval = 0
     *              hotWeapon.fireComponent.multipleShot = 3
     *              hotWeapon.fireComponent.isFireOnScreenCenter = false
     *              hotWeapon.fireComponent.offsetOfFireOnScreenCenter = new Vector(100, 30, 0);
     *              // 设置参数
     *              hotWeapon.fireComponent.animationAssetId = "80484";
     *              hotWeapon.fireComponent.fireMode = HotWeaponFireMode.SingleFire;
     *
     *              hotWeapon.aimEnabled = true;
     *              // 切换瞄准时的 第一/第三 人称
     *              hotWeapon.aimComponent.aimMode = HotWeaponAimMode.ThirdPerson;
     *              // 设置模拟瞄准时的倍镜放大倍数(仅第一人称瞄准时生效，范围1~18)
     *              hotWeapon.aimComponent.aimingZoom = 16;
     *              hotWeapon.aimComponent.cameraOffsetDistanceInThirdPersonMode = 300;
     *
     *              hotWeapon.loadEnabled = true;
     *              hotWeapon.loadComponent.loadDuration = 1
     *              hotWeapon.loadComponent.loadAfterFireEnabled = true;
     *              hotWeapon.loadComponent.animationAssetId = "4172";
     *
     *              hotWeapon.reloadEnabled = true;
     *              hotWeapon.reloadComponent.reloadDuration = 2;
     *              hotWeapon.reloadComponent.animationAssetId = "4171";
     *
     *              hotWeapon.recoilForceEnabled = true;
     *              hotWeapon.recoilForceComponent.minHorizontalOffset = 1;
     *              hotWeapon.recoilForceComponent.maxHorizontalOffset = 1;
     *              hotWeapon.recoilForceComponent.minVerticalOffset = 1;
     *              hotWeapon.recoilForceComponent.maxVerticalOffset = 1;
     *              hotWeapon.recoilForceComponent.minHorizontalJitter = 1;
     *              hotWeapon.recoilForceComponent.maxHorizontalJitter = 1;
     *              hotWeapon.recoilForceComponent.minVerticalJitter = 1;
     *              hotWeapon.recoilForceComponent.maxVerticalJitter = 1;
     *
     *              hotWeapon.accuracyOfFireEnabled = true;
     *              // 影响射击精度的子弹偏移半角的最大值(范围Min~88)
     *              hotWeapon.accuracyOfFireComponent.maxDispersionHalfAngle = 4;
     *              // 影响射击精度的子弹偏移半角的最小值(范围0~Max)
     *              hotWeapon.accuracyOfFireComponent.minDispersionHalfAngle = 0.01;
     *              // 默认影响射击精度的子弹偏移半角(范围Min~Max)
     *              hotWeapon.accuracyOfFireComponent.defaultDispersionHalfAngle = 1;
     *              // 影响射击精度的子弹偏移半角的每秒扩张速度(范围0~88)
     *              hotWeapon.accuracyOfFireComponent.dispersionHalfAngleIncreaseSpeed = 5;
     *              // 影响射击精度的子弹偏移半角的每秒收缩速度(范围0~88)
     *              hotWeapon.accuracyOfFireComponent.dispersionHalfAngleDecreaseSpeed = 10;
     *              // 影响射击精度的子弹偏移半角的每次开火扩张值(范围0~88)
     *              hotWeapon.accuracyOfFireComponent.dispersionHalfAngleIncreasePerShot = 1;
     *
     *              hotWeapon.onEquip.add((owner) => { console.log("热武器装备好了后会在服务器端触发回调") });
     *              hotWeapon.onUnequip.add(() => { console.log("onUnequippedServer") });
     *
     *              hotWeapon.fireComponent.onStartFire.add(() => { console.log("fireComponent.onStartFireClient") });
     *              hotWeapon.fireComponent.onEndFire.add(() => { console.log("fireComponent.onEndFireClient") });
     *              hotWeapon.fireComponent.onEndContinuousFire.add(() => { console.log("fireComponent.onEndFireClient") });
     *
     *              hotWeapon.loadComponent.onStartLoad.add(() => { console.log("loadComponent.onStartLoadClient") });
     *              hotWeapon.loadComponent.onEndLoad.add(() => { console.log("loadComponent.onEndLoadClient") });
     *
     *              hotWeapon.recoilForceComponent.onStartRecoil.add(() => { console.log("recoilForceComponent.onStartRecoilForceClient") });
     *
     *              hotWeapon.reloadComponent.onStartReload.add(() => { console.log("reloadComponent.onStartReloadClient") });
     *              hotWeapon.reloadComponent.onEndReload.add(() => { console.log("reloadComponent.onEndReloadClient") });
     *
     *              hotWeapon.aimComponent.onStartAim.add(() => { console.log("aimComponent.onAimStartClient") });
     *              hotWeapon.aimComponent.onEndAim.add(() => { console.log("aimComponent.onAimEndClient") });
     *
     *              mw.Event.addClientListener("weaponEquipment", (player) => {
     *                  // 目前装备方法只能在服务端调用
     *                  hotWeapon.equip(player.character, HumanoidSlotType.RightHand);
     *              });
     *          } else if (SystemUtil.isClient()) {
     *              hotWeapon.onEquip.add(() => { console.log("onEquippedClient") });
     *              hotWeapon.onUnequip.add(() => { console.log("onUnequippedClient") });
     *
     *              hotWeapon.fireComponent.onStartFire.add(() => { console.log("fireComponent.onStartFireClient") });
     *              hotWeapon.fireComponent.onEndFire.add(() => { console.log("fireComponent.onEndFireClient") });
     *
     *              hotWeapon.loadComponent.onStartLoad.add(() => { console.log("loadComponent.onStartLoadClient") });
     *              hotWeapon.loadComponent.onEndLoad.add(() => { console.log("loadComponent.onEndLoadClient") });
     *
     *              hotWeapon.recoilForceComponent.onStartRecoil.add(() => { console.log("recoilForceComponent.onStartRecoilForceClient") });
     *
     *              hotWeapon.reloadComponent.onStartReload.add(() => { console.log("reloadComponent.onStartReloadClient") });
     *              hotWeapon.reloadComponent.onEndReload.add(() => { console.log("reloadComponent.onEndReloadClient") });
     *
     *              hotWeapon.accuracyOfFireComponent.onCurrentDispersionChange.add(() => { console.log("accuracyOfFireComponent.onCurrentDispersionChangedClient") });
     *
     *              hotWeapon.aimComponent.onStartAim.add(() => { console.log("aimComponent.onAimStartClient") });
     *              hotWeapon.aimComponent.onEndAim.add(() => { console.log("aimComponent.onAimEndClient") });
     *
     *              // 装备
     *              InputUtil.onKeyDown(Keys.One, () => {
     *                  mw.Event.dispatchToServer("weaponEquipment");
     *              });
     *
     *              InputUtil.onKeyDown(Keys.Two, () => {
     *                  // 开始执行操作
     *                  if (hotWeapon.getCurrentState() == HotWeaponState.Firing) {
     *                      hotWeapon.stopFire();
     *                  } else {
     *                      hotWeapon.startFire();
     *                  }
     *              });
     *
     *                InputUtil.onKeyDown(Keys.Three, () => {
     *                  // 开始执行操作
     *                  if (hotWeapon.getCurrentState() == HotWeaponState.Reloading) {
     *                      hotWeapon.breakReload();
     *                  } else {
     *                      hotWeapon.reload(30);
     *                  }
     *              });
     *
     *              InputUtil.onKeyDown(Keys.Four, () => {
     *                  // 开始执行操作
     *                  if (hotWeapon.getCurrentState() == HotWeaponState.Loading) {
     *                      hotWeapon.breakLoad();
     *                  } else {
     *                      hotWeapon.load();
     *                  }
     *              });
     *          }
     *      }
     *  }
     * ```
     */
    class HotWeapon extends mw.GameObject {
        /**
         * @description 装备热武器时执行绑定函数
         * @description 此委托可双端执行。当你在服务端调用时，角色装备上热武器时会在服务端执行自定义绑定函数；在客户端调用时，角色装备上热武器时会在客户端执行自定义绑定函数。
         * @groups 玩法/热武器
         * @example
         * 使用示例: 创建一个名为"HotWeaponSample2"的脚本，放置在对象管理器中热武器对象子级，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```
         * @Component
         * export default class HotWeaponSample2 extends Script {
         *     protected onStart(): void {
         *         // 构造
         *         const hotWeapon = this.gameObject as HotWeapon;
         *
         *         if (SystemUtil.isServer()) {
         *             hotWeapon.onEquip.add((owner) => { console.log("热武器装备好了后会在服务器端触发回调") });
         *             hotWeapon.onUnequip.add(() => { console.log("onUnequipServer") });
         *         } else if (SystemUtil.isClient()) {
         *             hotWeapon.onEquip.add(() => { console.log("onEquip Client") });
         *             hotWeapon.onUnequip.add(() => { console.log("onUnequip Client") });
         *         }
         *     }
         * }
         * ```
         */
        onEquip: mw.MulticastDelegateInterface<(EquipOwner: $Nullable<UE.Actor>) => void>;
        /**
         * @description 服务器卸载时执行绑定函数。使用示例见属性 onEquipped
         * @groups 玩法/热武器
         */
        onUnequip: mw.MulticastDelegateInterface<() => void>;
        /**
         * @description 射击精度功能。
         * @description 此功能可以看做 hotweapon 的功能组件，只限于热武器使用。
         * @groups 玩法/热武器
         * @example
         * 使用示例: 创建一个名为"HotWeaponAofSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```ts
         * @Component
         * export default class HotWeaponAofSample extends Script {
         *     protected onStart(): void {
         *         // 构造
         *         const hotWeapon = this.gameObject as HotWeapon;
         *
         *         if (SystemUtil.isServer()) {
         *             hotWeapon.accuracyOfFireEnabled = true;
         *             // 影响射击精度的子弹偏移半角的最大值(范围Min~88)
         *             hotWeapon.accuracyOfFireComponent.maxDispersionHalfAngle = 4;
         *             // 影响射击精度的子弹偏移半角的最小值(范围0~Max)
         *             hotWeapon.accuracyOfFireComponent.minDispersionHalfAngle = 0.01;
         *             // 默认影响射击精度的子弹偏移半角(范围Min~Max)
         *             hotWeapon.accuracyOfFireComponent.defaultDispersionHalfAngle = 1;
         *             // 影响射击精度的子弹偏移半角的每秒扩张速度(范围0~88)
         *             hotWeapon.accuracyOfFireComponent.dispersionHalfAngleIncreaseSpeed = 5;
         *             // 影响射击精度的子弹偏移半角的每秒收缩速度(范围0~88)
         *             hotWeapon.accuracyOfFireComponent.dispersionHalfAngleDecreaseSpeed = 10;
         *             // 影响射击精度的子弹偏移半角的每次开火扩张值(范围0~88)
         *             hotWeapon.accuracyOfFireComponent.dispersionHalfAngleIncreasePerShot = 1;
         *         } else if (SystemUtil.isClient()) {
         *             hotWeapon.accuracyOfFireComponent.onCurrentDispersionChange.add(() => { console.log("accuracyOfFireComponent.onCurrentDispersionChangedClient") });
         *         }
         *     }
         * }
         * ```
         */
        accuracyOfFireComponent: mw.HotWeaponAccuracyOfFireComponent;
        /**
         * @description 瞄准功能。
         * @groups 玩法/热武器
         * @example
         * 使用示例: 创建一个名为"HotWeaponAimSample1"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```ts
         * @Component
         * export default class HotWeaponAimSample1 extends Script {
         *     protected onStart(): void {
         *         // 构造
         *         const hotWeapon = this.gameObject as HotWeapon;
         *
         *         if (SystemUtil.isServer()) {
         *             hotWeapon.aimEnabled = true;
         *             hotWeapon.aimComponent.aimMode = HotWeaponAimMode.ThirdPerson;
         *             hotWeapon.aimComponent.aimingZoom = 16;
         *             hotWeapon.aimComponent.cameraOffsetDistanceInThirdPersonMode = 300;
         *             hotWeapon.aimComponent.onStartAim.add(() => { console.log("aimComponent.onAimStartClient") });
         *             hotWeapon.aimComponent.onEndAim.add(() => { console.log("aimComponent.onAimEndClient") });
         *         } else if (SystemUtil.isClient()) {
         *             hotWeapon.aimComponent.onStartAim.add(() => { console.log("aimComponent.onAimStartClient") });
         *             hotWeapon.aimComponent.onEndAim.add(() => { console.log("aimComponent.onAimEndClient") });
         *         }
         *     }
         * }
         * ```
         */
        aimComponent: mw.HotWeaponAimComponent;
        /**
         * @description 射击功能。
         * @groups 玩法/热武器
         * @example
         * 使用示例: 创建一个名为"HotWeaponFireSample1"的脚本，放置在对象管理器热武器的子节点中，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```ts
         *  @Component
         *  export default class HotWeaponFireSample1 extends Script {
         *      protected onStart(): void {
         *          // 构造
         *          const hotWeapon = this.gameObject as HotWeapon;
         *
         *          if (SystemUtil.isServer()) {
         *              hotWeapon.fireComponent.isFireOnScreenCenter = false;
         *              hotWeapon.fireComponent.clipSize = 50;
         *              hotWeapon.fireComponent.fireInterval = 0;
         *              hotWeapon.fireComponent.multipleShot = 3;
         *              hotWeapon.fireComponent.isFireOnScreenCenter = false;
         *              hotWeapon.fireComponent.offsetOfFireOnScreenCenter = new Vector(100, 30, 0);
         *              // 设置参数
         *              hotWeapon.fireComponent.animationAssetId = "80484";
         *              hotWeapon.fireComponent.onStartFire.add(() => { console.log("fireComponent.onStartFireClient") });
         *              hotWeapon.fireComponent.onEndFire.add(() => { console.log("fireComponent.onEndFireClient") });
         *              hotWeapon.fireComponent.onEndContinuousFire.add(() => { console.log("fireComponent.onEndFireClient") });
         *          }
         *      }
         *  }
         * ```
         */
        fireComponent: mw.HotWeaponFireComponent;
        /**
         * @description 上膛功能。
         * @groups 玩法/热武器
         * @example
         * 使用示例: 创建一个名为"HotWeaponLoadSample1"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```ts
         * @Component
         * export default class HotWeaponLoadSample1 extends Script {
         *     protected onStart(): void {
         *         // 构造
         *         const hotWeapon = this.gameObject as HotWeapon;
         *
         *         if (SystemUtil.isServer()) {
         *             hotWeapon.loadEnabled = true;
         *             hotWeapon.loadComponent.loadDuration = 1
         *             hotWeapon.loadComponent.loadAfterFireEnabled = true;
         *             hotWeapon.loadComponent.animationAssetId = "4172";
         *
         *             hotWeapon.loadComponent.onStartLoad.add(() => { console.log("loadComponent.onStartLoad Server") });
         *             hotWeapon.loadComponent.onEndLoad.add(() => { console.log("loadComponent.onEndLoad Server") });
         *         } else if (SystemUtil.isClient()) {
         *             hotWeapon.loadComponent.onStartLoad.add(() => { console.log("loadComponent.onStartLoad Client") });
         *             hotWeapon.loadComponent.onEndLoad.add(() => { console.log("loadComponent.onEndLoad Client") });
         *         }
         *     }
         * }
         * ```
         */
        loadComponent: mw.HotWeaponLoadComponent;
        /**
         * @description 换弹功能。
         * @groups 玩法/热武器
         * @example
         * 使用示例: 创建一个名为"HotWeaponReloadSample1"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```ts
         * @Component
         * export default class HotWeaponReloadSample1 extends Script {
         *     protected onStart(): void {
         *         // 构造
         *         const hotWeapon = this.gameObject as HotWeapon;
         *
         *         if (SystemUtil.isServer()) {
         *
         *             hotWeapon.reloadEnabled = true;
         *             hotWeapon.reloadComponent.reloadDuration = 2;
         *             hotWeapon.reloadComponent.animationAssetId = "4171";
         *
         *             hotWeapon.reloadComponent.onStartReload.add(() => { console.log("reloadComponent.onStartReload Server") });
         *             hotWeapon.reloadComponent.onEndReload.add(() => { console.log("reloadComponent.onEndReload Server") });
         *         } else if (SystemUtil.isClient()) {
         *             hotWeapon.reloadComponent.onStartReload.add(() => { console.log("reloadComponent.onStartReload Client") });
         *             hotWeapon.reloadComponent.onEndReload.add(() => { console.log("reloadComponent.onEndReload Client") });
         *         }
         *     }
         * }
         * ```
         */
        reloadComponent: mw.HotWeaponReloadComponent;
        /**
         * @description 后坐力功能。
         * @groups 玩法/热武器
         * @example
         * 使用示例: 创建一个名为"HotWeaponRecoilForceSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```ts
         * @Component
         * export default class HotWeaponRecoilForceSample extends Script {
         *     protected onStart(): void {
         *         // 构造
         *         const hotWeapon = this.gameObject as HotWeapon;
         *
         *         if (SystemUtil.isServer()) {
         *             hotWeapon.recoilForceEnabled = true;
         *             hotWeapon.recoilForceComponent.minHorizontalOffset = 1
         *             hotWeapon.recoilForceComponent.maxHorizontalOffset = 1
         *             hotWeapon.recoilForceComponent.minVerticalOffset = 1
         *             hotWeapon.recoilForceComponent.maxVerticalOffset = 1
         *             hotWeapon.recoilForceComponent.minHorizontalJitter = 1;
         *             hotWeapon.recoilForceComponent.maxHorizontalJitter = 1;
         *             hotWeapon.recoilForceComponent.minVerticalJitter = 1;
         *             hotWeapon.recoilForceComponent.maxVerticalJitter = 1;
         *         }
         *         hotWeapon.recoilForceComponent.onStartRecoil.add(() => { console.log("recoilForceComponent.onStartRecoilForce") });
         *     }
         * }
         * ```
         */
        recoilForceComponent: mw.HotWeaponRecoilForceComponent;
        /**
         * @description 传入最大射程，获取默认准星大小
         * @groups 玩法/热武器
         * @effect 只在客户端调用生效
         * @param maxShootRange usage: 最大射程  <br> default:100  <br> range:[0,100000]  type:浮点数
         * @returns 默认准星大小(射击精度半角值)
         * @example
         * 使用示例: 创建一个名为"HotWeaponSample3"的脚本，放置在对象管理器中热武器对象子级，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```
         * @Component
         * export default class HotWeaponSample3 extends mw.Script {
         *     protected onStart(): void {
         *         // 构造
         *         const hotWeapon = this.gameObject as mw.HotWeapon;
         *         if (SystemUtil.isClient()) {
         *             // 传入射程，得到准心扩散大小
         *             const crossHairSize = hotWeapon.getDefaultCrossHairSize(1000)
         *             // 省略：更新 UI 准心位置
         *         }
         *     }
         * }
         * ```
         */
        getDefaultCrossHairSize(maxShootRange: number): number;
        /**
         * @description 获取是否开启了后坐力组件。
         * @groups 玩法/热武器
         * @effect 调用端生效
         * @returns 是否开启了后坐力组件
         */
        get recoilForceEnabled(): boolean;
        /**
         * @description 设置是否开启后座力组件。
         * @description 默认开启
         * @groups 玩法/热武器
         * @effect 只在服务端调用生效
         * @param isEnabled usage: 后座力组件启用状态
         */
        set recoilForceEnabled(isEnabled: boolean);
        /**
         * @description 是否开启了换弹组件。
         * @groups 玩法/热武器
         * @effect 调用端生效
         * @returns 是否开启了换弹组件
         */
        get reloadEnabled(): boolean;
        /**
         * @description 设置是否开启换弹组件。
         * @description 默认开启
         * @groups 玩法/热武器
         * @effect 只在服务端调用生效
         * @param isEnabled usage: 换弹组件启用状态
         */
        set reloadEnabled(isEnabled: boolean);
        /**
         * @description 是否开启了上膛组件。
         * @groups 玩法/热武器
         * @effect 调用端生效
         * @returns 是否开启了上膛组件
         */
        get loadEnabled(): boolean;
        /**
         * @description 设置是否开启上膛组件。
         * @description 默认开启
         * @groups 玩法/热武器
         * @effect 只在服务端调用生效
         * @param isEnabled usage: 上膛组件启用状态
         */
        set loadEnabled(isEnabled: boolean);
        /**
         * @description 是否开启了射击精度组件。
         * @groups 玩法/热武器
         * @effect 调用端生效
         * @returns 是否开启了射击精度组件
         */
        get accuracyOfFireEnabled(): boolean;
        /**
         * @description 设置是否开启射击精度组件。
         * @description 默认开启
         * @groups 玩法/热武器
         * @effect 只在服务端调用生效
         * @param isEnabled usage: 射击精度组件启用状态
         */
        set accuracyOfFireEnabled(isEnabled: boolean);
        /**
         * @description 是否开启了瞄准组件。
         * @groups 玩法/热武器
         * @effect 调用端生效
         * @returns 是否开启了瞄准组件
         */
        get aimEnabled(): boolean;
        /**
         * @description 设置是否开启瞄准组件。
         * @description 默认开启
         * @groups 玩法/热武器
         * @effect 只在服务端调用生效
         * @param value usage: 瞄准组件启用状态
         */
        set aimEnabled(value: boolean);
        /**
         * @description 使用屏幕中心生成子弹投掷物模式时，获取子弹投掷物生成的location
         * @groups 玩法/热武器
         * @effect 只在客户端调用生效
         * @precautions 服务器没有角色相机组件
         * @returns 子弹投掷物生成的location
         * @example
         * 使用示例: 创建一个名为"HotWeaponSample5"的脚本，放置在对象管理器中热武器对象子级，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```
         * @Component
         * export default class HotWeaponSample5 extends Script {
         *     protected onStart(): void {
         *         // 构造
         *         const hotWeapon = this.gameObject as HotWeapon;
         *         if (SystemUtil.isClient()) {
         *             const bulletLoc = hotWeapon.getBulletLocWhileSpawnOnScreenCenter()
         *             // 省略：生成投掷物
         *         }
         *     }
         * }
         * ```
         */
        getBulletLocWhileSpawnOnScreenCenter(): mw.Vector;
        /**
         * @description 非屏幕中心生成子弹模式下，获取子弹飞行方向
         * @groups 玩法/热武器
         * @precautions 该函数可传入经偏移了的屏幕中心发出的射线方向
         * @effect 只在客户端调用生效
         * @precautions 服务器没有角色相机组件
         * @param StartLoc usage: 子弹生成位置
         * @param ShootRange usage: 最大射程 <br> default:100  <br> range:[0,  100000]  type:浮点数
         * @returns 子弹的实际飞行方向
         */
        getShootDirWithDispersion(StartLoc: mw.Vector, ShootRange: number): mw.Vector;
        /**
         * @description 获取当前热武器的所有者
         * @groups 玩法/热武器
         * @effect 调用端生效
         * @returns 当前热武器的所有者
         * @example
         * 使用示例: 创建一个名为"HotWeaponSample6"的脚本，放置在对象管理器中热武器对象子级，打开脚本，输入以下代码保存，运行游戏，获取当前热武器所有者代码如下：
         * ```
         * @Component
         * export default class HotWeaponSample6 extends Script {
         *     protected onStart(): void {
         *         // 构造
         *         const hotWeapon = this.gameObject as HotWeapon;
         *         const hotWeaponOwner = hotWeapon.getCurrentOwner()
         *     }
         * }
         * ```
         */
        getCurrentOwner(): mw.Character;
        /**
         * @description 装备热武器到角色的指定插槽位置
         * @description 如果想将武器装备在角色身上，需要在服务端调用此函数。客户端调用不会报错，但不生效。
         * @groups 玩法/热武器
         * @effect 调用端自动广播
         * @param character usage: 该武器的装备对象
         * @param slotName usage: 要装备到角色上的插槽名称
         * @example
         * 使用示例: 创建一个名为"HotWeaponSample"的脚本，打开脚本，输入以下代码保存，此示例为动态加载热武器与武器模型资源，不需要在右侧栏配置，运行游戏，一个热武器装备到角色右手上，代码如下：
         * ```ts
         * @Component
         * export default class weapon extends Script {
         *
         *    private hotweapon:HotWeapon;
         *    private gun:Model;
         *
         *    protected async onStart(): Promise<void> {
         *        if(SystemUtil.isServer()) {
         *            this.hotweapon = await GameObject.asyncSpawn<HotWeapon>("HotWeapon",{
         *                replicates:true,
         *                transform: new Transform(new Vector(500,0,0), new Rotation(0, 0, 0), new Vector(1)),
         *            });
         *            this.gun = await GameObject.asyncSpawn<Model>("44980",{
         *                replicates:true,
         *                transform: new Transform(new Vector(500,0,0), new Rotation(0, 0, 0), new Vector(1)),
         *            });
         *            this.gun.parent = this.hotweapon;
         *            this.gun.setCollision(PropertyStatus.Off);
         *            Player.onPlayerJoin.add(()=>{
         *                Player.getAllPlayers().forEach(element => {
         *                    this.player = element.character;
         *                });
         *                this.hotweapon.equip(this.player,HumanoidSlotType.RightHand);
         *           })
         *        }
         *    }
         * }
         * ```
         */
        equip(character: mw.Character, slotName: mw.HumanoidSlotType): void;
        /**
         * @description 卸载热武器。
         * @groups 玩法/热武器
         * @effect 调用端自动广播
         */
        unequip(): void;
        /**
         * @description 开火
         * @groups 玩法/热武器
         * @effect 调用端自动广播
         * @example
         * 使用示例: 创建一个名为"HotWeaponSample8"的脚本，放置在对象管理器中热武器对象子级，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```
         * @Component
         * export default class HotWeaponSample8 extends Script {
         *     protected onStart(): void {
         *        const hotWeapon = this.gameObject as HotWeapon;
         *        if (SystemUtil.isClient()) {
         *            // 热武器需要先装备上，见方法 equipment
         *            InputUtil.onKeyDown(Keys.Two, () => {
         *                // 开始执行操作
         *                if (hotWeapon.getCurrentState() == HotWeaponState.Firing) {
         *                    hotWeapon.stopFire();
         *                } else {
         *                    hotWeapon.startFire();
         *                }
         *            });
         *        }
         *     }
         * }
         * ```
         */
        startFire(): void;
        /**
         * @description 停止开火
         * @groups 玩法/热武器
         * @example
         * 使用示例: 创建一个名为"HotWeaponSample8"的脚本，放置在对象管理器中热武器对象子级，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```
         * @Component
         * export default class HotWeaponSample8 extends Script {
         *     protected onStart(): void {
         *        const hotWeapon = this.gameObject as HotWeapon;
         *        if (SystemUtil.isClient()) {
         *            // 热武器需要先装备上，见方法 equipment
         *            InputUtil.onKeyDown(Keys.Two, () => {
         *                // 开始执行操作
         *                if (hotWeapon.getCurrentState() == HotWeaponState.Firing) {
         *                    hotWeapon.stopFire();
         *                } else {
         *                    hotWeapon.startFire();
         *                }
         *            });
         *        }
         *     }
         * }
         * ```
         * @effect 调用端自动广播
         */
        stopFire(): void;
        /**
         * @description 换弹
         * @groups 玩法/热武器
         * @effect 调用端自动广播
         * @param bulletSize usage: 子弹数 <br> range:[1,  ClipSize]  type: 整形
         * @example
         * 使用示例: 创建一个名为"HotWeaponSample9"的脚本，放置在对象管理器中热武器对象子级，打开脚本，输入以下代码保存，运行游戏，按下"2"键，热武器换弹，中止换弹，代码如下：
         * ```ts
         * @Component
         * export default class HotWeaponSample9 extends Script {
         *     protected onStart(): void {
         *        const hotWeapon = this.gameObject as HotWeapon;
         *        if (SystemUtil.isClient()) {
         *            // 热武器需要先装备上，见方法 equipment
         *            InputUtil.onKeyDown(Keys.Two, () => {
         *                // 开始执行操作
         *                if (hotWeapon.getCurrentState() == HotWeaponState.Reloading) {
         *                    hotWeapon.breakReload();
         *                } else {
         *                    hotWeapon.reload(30);
         *                }
         *            });
         *        }
         *     }
         * }
         * ```
         */
        reload(bulletSize: number): void;
        /**
         * @description 打断换弹
         * @groups 玩法/热武器
         * @example
         * 使用示例: 创建一个名为"HotWeaponSample9"的脚本，放置在对象管理器中热武器对象子级，打开脚本，输入以下代码保存，运行游戏，按下"2"键，热武器换弹，中止换弹，代码如下：
         * ```ts
         * @Component
         * export default class HotWeaponSample9 extends Script {
         *     protected onStart(): void {
         *        const hotWeapon = this.gameObject as HotWeapon;
         *        if (SystemUtil.isClient()) {
         *            // 热武器需要先装备上，见方法 equipment
         *            InputUtil.onKeyDown(Keys.Two, () => {
         *                // 开始执行操作
         *                if (hotWeapon.getCurrentState() == HotWeaponState.Reloading) {
         *                    hotWeapon.breakReload();
         *                } else {
         *                    hotWeapon.reload(30);
         *                }
         *            });
         *        }
         *     }
         * }
         * ```
         * @effect 调用端自动广播
         */
        breakReload(): void;
        /**
         * @description 上膛
         * @groups 玩法/热武器
         * @effect 调用端自动广播
         * @example
         * 使用示例: 创建一个名为"HotWeaponSample10"的脚本，放置在对象管理器中热武器对象子级，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```
         * @Component
         * export default class HotWeaponSample10 extends Script {
         *     protected onStart(): void {
         *        const hotWeapon = this.gameObject as HotWeapon;
         *        if (SystemUtil.isClient()) {
         *            // 热武器需要先装备上，见方法 equipment
         *            InputUtil.onKeyDown(Keys.Two, () => {
         *                // 开始执行操作
         *                if (hotWeapon.getCurrentState() == HotWeaponState.Loading) {
         *                    hotWeapon.breakLoad();
         *                } else {
         *                    hotWeapon.load();
         *                }
         *            });
         *        }
         *     }
         * }
         * ```
         */
        load(): void;
        /**
         * @description 打断上膛。
         * @groups 玩法/热武器
         * @example
         * 使用示例: 创建一个名为"HotWeaponSample10"的脚本，放置在对象管理器中热武器对象子级，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```
         * @Component
         * export default class HotWeaponSample10 extends Script {
         *     protected onStart(): void {
         *        const hotWeapon = this.gameObject as HotWeapon;
         *        if (SystemUtil.isClient()) {
         *            // 热武器需要先装备上，见方法 equipment
         *            InputUtil.onKeyDown(Keys.Two, () => {
         *                // 开始执行操作
         *                if (hotWeapon.getCurrentState() == HotWeaponState.Loading) {
         *                    hotWeapon.breakLoad();
         *                } else {
         *                    hotWeapon.load();
         *                }
         *            });
         *        }
         *     }
         * }
         * ```
         * @effect 调用端自动广播
         */
        breakLoad(): void;
        /**
         * @description 获取当前热武器状态
         * @groups 玩法/热武器
         * @effect 调用端生效
         * @returns 当前热武器状态
         * @example
         * 使用示例: 创建一个名为"HotWeaponSample11"的脚本，放置在对象管理器中热武器对象子级，打开脚本，输入以下代码保存，运行游戏，代码如下：
         * ```
         * @Component
         * export default class HotWeaponSample11 extends Script {
         *     protected onStart(): void {
         *        const hotWeapon = this.gameObject as HotWeapon;
         *        // 热武器需要先装备上，见方法 equipment
         *        const status = hotWeapon.getCurrentState();
         *     }
         * }
         * ```
         */
        getCurrentState(): HotWeaponState;
        /**
         * @description 从传入的热武器逻辑对象中拷贝所有组件数据到当前的热武器中。
         * @groups 玩法/热武器
         * @effect 只在服务端调用生效
         * @precautions 无法拷贝代理委托绑定事件，完成拷贝后，数据同步到客户端有较短延迟。
         * @param otherHotWeapon usage: 数据源。
         */
        cloneComponentsData(otherHotWeapon: HotWeapon): void;
    }
}

declare namespace mw {
    /**
     * @description 热武器射击精度组件
     * @description 武器射击精度是指武器在射击时的命中目标的准确性和精度程度。它描述了武器在使用时弹道路径的稳定性和预测性，以及射击的命中率和精度。控制热武器发射时，子弹的发散程度，默认状态下为最小发散程度.
     * @description 武器射击精度可以用一个简单的比喻来描述：它就像是你打篮球时的投篮准确度。
     * @description 当你投篮时，你希望篮球准确地进入篮筐，而不是偏离目标。这就是投篮的精度。在武器射击中，精度指的是武器发射的子弹能够准确地命中目标，而不是随意地朝着其他方向飞行。
     * @groups 玩法/热武器/辅助类
     * @networkStatus usage: 双端
     * @author jun.zhang
     * @example
     * 使用示例: 创建一个名为"HotWeaponAofSample1"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，代码如下：
     * ```ts
     * @Component
     * export default class HotWeaponAofSample1 extends Script {
     *     protected onStart(): void {
     *         // 构造
     *         const hotWeapon = this.gameObject as HotWeapon;
     *
     *         if (SystemUtil.isServer()) {
     *             hotWeapon.accuracyOfFireEnable = true;
     *             // 影响射击精度的子弹偏移半角的最大值(范围Min~88)
     *             hotWeapon.accuracyOfFireComponent.maxDispersionHalfAngle = 4;
     *             // 影响射击精度的子弹偏移半角的最小值(范围0~Max)
     *             hotWeapon.accuracyOfFireComponent.minDispersionHalfAngle = 0.01;
     *             // 默认影响射击精度的子弹偏移半角(范围Min~Max)
     *             hotWeapon.accuracyOfFireComponent.defaultDispersionHalfAngle = 1;
     *             // 影响射击精度的子弹偏移半角的每秒扩张速度(范围0~88)
     *             hotWeapon.accuracyOfFireComponent.dispersionHalfAngleIncreaseSpeed = 5;
     *             // 影响射击精度的子弹偏移半角的每秒收缩速度(范围0~88)
     *             hotWeapon.accuracyOfFireComponent.dispersionHalfAngleDecreaseSpeed = 10;
     *             // 影响射击精度的子弹偏移半角的每次开火扩张值(范围0~88)
     *             hotWeapon.accuracyOfFireComponent.dispersionHalfAngleIncreasePerShot = 1;
     *         } else if (SystemUtil.isClient()) {
     *             hotWeapon.accuracyOfFireComponent.onCurrentDispersionChangedClient.add(() => { console.log("accuracyOfFireComponent.onCurrentDispersionChangedClient") });
     *         }
     *     }
     * }
     * ```
     */
    class HotWeaponAccuracyOfFireComponent {
        /**
         * @description 客户端实际射击精度值发生变化时执行绑定函数。
         * @groups 玩法/热武器/辅助类
         */
        onCurrentDispersionChange: mw.MulticastDelegateInterface<() => void>;
        /**
         * @description 获取根据射击精度角度范围定义的圆锥空间中的随机射击单位矢量（以屏幕角度）
         * @description 以屏幕中心处生成子弹，可直接套用该矢量
         * @description 以预设位置处生成子弹，需要以 预设位置 + 该矢量 + 最大射击距离 决定着弹点，再计算实际三维空间中子弹的飞行方向
         * @groups 玩法/热武器/辅助类
         * @effect 调用端生效
         * @param shootDir usage: 未发生偏移的最初子弹飞行方向 default:
         * @returns 随机屏幕偏移坐标
         */
        getRandomShootDir(shootDir: mw.Vector): mw.Vector;
        /**
         * @description 设置子弹随机发散范围的默认半径。
         * @groups 玩法/热武器/辅助类
         * @effect 调用端生效
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param NewValue usage: 新设置的圆型范围半径值  <br> default:  <br> range:  type:浮点数
         */
        set defaultDispersionHalfAngle(NewValue: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取子弹随机发散范围的默认半径。
         * @effect 调用端生效
         * @returns 圆型范围半径值
         */
        get defaultDispersionHalfAngle(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置子弹随机发散范围的最大半径。
         * @effect 调用端生效
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param NewValue usage: 新设置的圆型范围半径值 default:
         */
        set maxDispersionHalfAngle(NewValue: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取子弹随机发散范围的最大半径。
         * @effect 调用端生效
         * @returns 圆型范围半径值
         */
        get maxDispersionHalfAngle(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置子弹随机发散范围的最小半径。
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param NewValue usage: 新设置的圆型范围半径值 default:
         */
        set minDispersionHalfAngle(NewValue: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取子弹随机发散范围的最小半径。
         * @effect 调用端生效
         * @returns 圆型范围半径值
         */
        get minDispersionHalfAngle(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置子弹随机发散范围半径的收缩速度。
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param NewValue usage: 新设置的圆型范围半径每秒变化量 default:
         */
        set dispersionHalfAngleDecreaseSpeed(NewValue: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取子弹随机发散范围半径的收缩速度。
         * @effect 调用端生效
         * @returns 圆型范围半径每秒变化量
         */
        get dispersionHalfAngleDecreaseSpeed(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置子弹随机发散范围半径的扩张速度。
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param NewValue usage: 新设置的圆型范围半径每秒变化量 default:
         */
        set dispersionHalfAngleIncreaseSpeed(NewValue: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取子弹随机发散范围半径的扩张速度。
         * @effect 调用端生效
         * @returns 圆型范围半径每秒变化量
         */
        get dispersionHalfAngleIncreaseSpeed(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置子弹随机发散范围半径在每次射击后的扩张值。
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param NewValue usage: 新设置的圆型范围半径增量 default:
         */
        set dispersionHalfAngleIncreasePerShot(NewValue: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取子弹随机发散范围半径在每次射击后的扩张值。
         * @effect 调用端生效
         * @returns 圆型范围半径增量
         */
        get dispersionHalfAngleIncreasePerShot(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取当前子弹随机发散范围半径实际值
         * @effect 调用端生效
         * @returns 当前子弹发散范围半径
         */
        getCurrentDispersionHalfAngle(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置目标子弹随机发散范围半径实际值
         * @effect 调用端生效
         * @returns 目标子弹发散范围半径
         */
        getTargetDispersionHalfAngle(): number;
    }
}

declare namespace mw {
    /**
     * @author jun.zhang
     * @groups 玩法
     * @description 热武器瞄准模式
     */
    enum HotWeaponAimMode {
        /** 第一人称 */
        FirstPerson = 0,
        /** 第三人称 */
        ThirdPerson = 1
    }
    /**
     * @description 热武器瞄准组件，瞄准状态下持枪角色的视角会拉近
     * @groups 玩法/热武器/辅助类
     * @networkStatus usage: 双端
     * @author jun.zhang
     * @example
     * 使用示例: 创建一个名为"HotWeaponAimSample1"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，代码如下：
     * ```ts
     * @Component
     * export default class HotWeaponAimSample1 extends Script {
     *     protected onStart(): void {
     *         // 构造
     *         const hotWeapon = this.gameObject as HotWeapon;
     *
     *         if (SystemUtil.isServer()) {
     *             hotWeapon.aimEnabled = true;
     *             hotWeapon.aimComponent.aimMode = HotWeaponAimMode.ThirdPerson;
     *             hotWeapon.aimComponent.aimingZoom = 16;
     *             hotWeapon.aimComponent.cameraOffsetDistanceInThirdPersonMode = 300;
     *             hotWeapon.aimComponent.onStartAim.add(() => { console.log("aimComponent.onAimStartClient") });
     *             hotWeapon.aimComponent.onEndAim.add(() => { console.log("aimComponent.onAimEndClient") });
     *         } else if (SystemUtil.isClient()) {
     *             hotWeapon.aimComponent.onStartAim.add(() => { console.log("aimComponent.onAimStartClient") });
     *             hotWeapon.aimComponent.onEndAim.add(() => { console.log("aimComponent.onAimEndClient") });
     *         }
     *     }
     * }
     * ```
     */
    class HotWeaponAimComponent {
        /**
         * @groups 玩法/热武器/辅助类
         * @description 服务器端开始瞄准代理
         */
        onStartAim: mw.MulticastDelegateInterface<() => void>;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 服务器端开始瞄准代理。使用示例见类 HotWeaponAimComponent 使用示例
         */
        onEndAim: mw.MulticastDelegateInterface<() => void>;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 打开/关闭瞄准
         * - 切换持枪姿态
         * - 切换相机View
         * - 切换准星UI
         * - 修改子弹发射精度-上升到用户层，开发者自己在瞄准时设置默认精准度
         * @effect 调用端自动广播
         * @param enabled usage: 是否开启瞄准功能 default:
         */
        enableAiming(enabled: boolean): void;
        /**
         * @groups 玩法/热武器/辅助类
         * @description Set瞄准时的第一/第三人称模式。
         * @effect 调用端自动广播
         * @param NewAimMode usage: 新设置的瞄准模式 <br> default: 第三人称 HotWeaponAimMode.ThirdPerson
         */
        set aimMode(NewAimMode: HotWeaponAimMode);
        /**
         * @groups 玩法/热武器/辅助类
         * @description Get瞄准时的第一/第三人称模式。
         * @effect 调用端生效
         * @returns 当前瞄准时的第一/第三人称模式
         */
        get aimMode(): HotWeaponAimMode;
        /**
         * @groups 玩法/热武器/辅助类
         * @description Set模拟瞄准时的瞄准镜放大倍数。使用示例见类 HotWeaponAimComponent 使用示例
         * @precautions 合法范围为[1.0 , 18.0]，对应[0° , 90°]的 FOV 值每增加1.0，对应 FOV 增加5°
         * @effect 调用端自动广播
         * @param newAimingZoom usage: 新设置的瞄准镜放大倍数 <br> default: 1  <br> range:[0,  16]  type:浮点数
         */
        set aimingZoom(newAimingZoom: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description Get第一人称瞄准时的瞄准镜放大倍数。
         * @precautions 合法范围为[1.0 , 18.0]，对应[0° , 90°]的FOV值每增加1.0，对应FOV增加5°
         * @effect 调用端生效
         * @returns 当前第一人称瞄准时的瞄准镜放大倍数
         */
        get aimingZoom(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description Set第三人称瞄准时的连接相机弹簧组件的长度。
         * @precautions 相机弹簧组件长度有一个闭区间范围，目的是为了防止相机离Character太近导致穿模，太远则没有必要
         * @effect 调用端自动广播
         * @param NewCameraOffsetDistance usage: 新设置的连接相机弹簧组件的长度 <br> default: 400 <br> range: [300,  600]  type:浮点数
         */
        set cameraOffsetDistanceInThirdPersonMode(NewCameraOffsetDistance: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description Get第三人称瞄准时的连接相机弹簧组件的长度。
         * @effect 调用端生效
         * @returns 当前连接相机弹簧组件的长度
         */
        get cameraOffsetDistanceInThirdPersonMode(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description Set第三人称常态下相机弹簧组件的默认长度。
         * @precautions 相机弹簧组件长度有一个闭区间范围，目的是为了防止相机离Character太近导致穿模，太远则没有必要
         * @effect 调用端自动广播
         * @param NewCameraArmLength usage: 新设置的连接相机弹簧组件的默认长度 <br> default: 400 <br> range: [300,  600]  type:浮点数
         */
        set defaultCameraSpringArmLength(NewCameraArmLength: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description Get第三人称常态下相机弹簧组件的默认长度。
         * @effect 调用端生效
         * @returns 第三人称常态下相机弹簧组件的默认长度
         */
        get defaultCameraSpringArmLength(): number;
    }
}

declare namespace mw {
    /**
     * @author jun.zhang
     * @groups 玩法
     * @description 热武器开火模式
     */
    enum HotWeaponFireMode {
        /** 单发 */
        SingleFire = 0,
        /** 连发 */
        ContinuousFire = 1,
        /** 全自动 */
        FullAutomationFire = 2
    }
    /**
     * @description 热武器开火组件，负责维护热武器射击的主要参数，及核心逻辑
     * @groups 玩法/热武器/辅助类
     * @networkStatus usage: 双端
     * @author jun.zhang
     * @example
     * 使用示例: 创建一个名为"HotWeaponFireSample1"的脚本，放置在对象管理器热武器的子节点中，打开脚本，输入以下代码保存，运行游戏，代码如下：
     * ```ts
     *  @Component
     *  export default class HotWeaponFireSample1 extends Script {
     *      protected onStart(): void {
     *          // 构造
     *          const hotWeapon = this.gameObject as HotWeapon;
     *
     *          if (SystemUtil.isServer()) {
     *              hotWeapon.fireComponent.isFireOnScreenCenter = false;
     *              hotWeapon.fireComponent.clipSize = 50;
     *              hotWeapon.fireComponent.fireInterval = 0;
     *              hotWeapon.fireComponent.multipleShot = 3;
     *              hotWeapon.fireComponent.isFireOnScreenCenter = false;
     *              hotWeapon.fireComponent.offsetOfFireOnScreenCenter = new Vector(100, 30, 0);
     *              // 设置参数
     *              hotWeapon.fireComponent.animationAssetId = "80484";
     *              hotWeapon.fireComponent.onStartFire.add(() => { console.log("fireComponent.onStartFireClient") });
     *              hotWeapon.fireComponent.onEndFire.add(() => { console.log("fireComponent.onEndFireClient") });
     *              hotWeapon.fireComponent.onEndContinuousFire.add(() => { console.log("fireComponent.onEndFireClient") });
     *          }
     *      }
     *  }
     * ```
     */
    class HotWeaponFireComponent {
        /**
         * @groups 玩法/热武器/辅助类
         * @description 服务器开始开火时执行绑定函数。使用示例见类 HotWeaponFireComponent 使用示例
         */
        onStartFire: mw.MulticastDelegateInterface<() => void>;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 服务器停止开火时执行绑定函数。使用示例见类 HotWeaponFireComponent 使用示例
         */
        onEndFire: mw.MulticastDelegateInterface<() => void>;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 服务器完成一次连发射击周期时执行绑定函数。使用示例见类 HotWeaponFireComponent 使用示例
         */
        onEndContinuousFire: mw.MulticastDelegateInterface<() => void>;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置动画 GUID。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端自动广播
         * @param GUID usage: 需要设置的蒙太奇动画 GUID  range: 依据资源 ID 长度而定
         */
        set animationAssetId(GUID: string);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 绑定的动画GUID。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端生效
         * @returns 绑定的动画 GUID
         */
        get animationAssetId(): string;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取当前的开火模式
         * @effect 调用端生效
         * @returns 当前的开火模式
         */
        get fireMode(): HotWeaponFireMode;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 切换设置当前开火模式
         * @effect 调用端生效
         * @precautions 装备前只能在服务器调用，装备后可在客户端调用
         * @param newFireMode usage: 新的热武器开火模式 <br> default: 默认为单发 HotWeaponFireMode.SingleFire
         */
        set fireMode(newFireMode: HotWeaponFireMode);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取当前状态下bFiring的值，一般用于处理全自动开火模式下的自动换弹
         * @effect 调用端生效
         * @returns 当前弹夹中子弹数量
         */
        isFiring(): boolean;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置是否在屏幕中心开火。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param value usage: 是否在屏幕中心开火
         */
        set isFireOnScreenCenter(value: boolean);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取是否在屏幕中心开火。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端生效
         * @returns 是否在屏幕中心开火
         */
        get isFireOnScreenCenter(): boolean;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置屏幕中心开火时的偏移。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param offset usage: 屏幕中心开火时的偏移
         */
        set offsetOfFireOnScreenCenter(offset: mw.Vector);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取屏幕中心开火时的偏移。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端生效
         * @returns 屏幕中心开火时的偏移
         */
        get offsetOfFireOnScreenCenter(): mw.Vector;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置一次开火发射的子弹数量。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param count usage: 一次开火发射的子弹数量 <br> default: 1 <br> range: [1,  100]  type:整数
         */
        set multipleShot(count: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取一次开火发射的子弹数量。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端生效
         * @returns 一次开火发射的子弹数量
         */
        get multipleShot(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置开火间隙。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param interval usage: 开火间隙 <br> default: 0.1  <br> range: [0.01,  10]  type:浮点数
         */
        set fireInterval(interval: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取开火间隙。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端生效
         * @returns 开火间隙
         */
        get fireInterval(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取当前弹夹容量。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端生效
         * @returns 当前弹夹容量
         */
        get clipSize(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置当前弹夹容量。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param value usage: 当前弹夹容量 <br> default: 30 <br> range: [1,  1000]  type:整数
         */
        set clipSize(value: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置当前弹夹中子弹数量。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端自动广播
         * @param value usage: 新弹夹中子弹数量 <br> default: 0 <br> range: [0,  clipSize]  type:整数
         */
        set currentBullet(value: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取当前弹夹中子弹数量。使用示例见类 HotWeaponFireComponent 使用示例
         * @effect 调用端生效
         * @returns 当前弹夹中子弹数量
         */
        get currentBullet(): number;
    }
}

declare namespace mw {
    /**
     * @description 热武器上膛组件，负责维护热武器播放上膛动作的相关参数，和逻辑
     * @groups 玩法/热武器/辅助类
     * @networkStatus usage: 双端
     * @author jun.zhang
     * @example
     * 使用示例: 创建一个名为"HotWeaponLoadSample1"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，代码如下：
     * ```ts
     * @Component
     * export default class HotWeaponLoadSample1 extends Script {
     *     protected onStart(): void {
     *         // 构造
     *         const hotWeapon = this.gameObject as HotWeapon;
     *
     *         if (SystemUtil.isServer()) {
     *             hotWeapon.loadEnabled = true;
     *             hotWeapon.loadComponent.loadDuration = 1
     *             hotWeapon.loadComponent.loadAfterFireEnabled = true;
     *             hotWeapon.loadComponent.animationAssetId = "4172";
     *
     *             hotWeapon.loadComponent.onStartLoad.add(() => { console.log("loadComponent.onStartLoad Server") });
     *             hotWeapon.loadComponent.onEndLoad.add(() => { console.log("loadComponent.onEndLoad Server") });
     *         } else if (SystemUtil.isClient()) {
     *             hotWeapon.loadComponent.onStartLoad.add(() => { console.log("loadComponent.onStartLoad Client") });
     *             hotWeapon.loadComponent.onEndLoad.add(() => { console.log("loadComponent.onEndLoad Client") });
     *         }
     *     }
     * }
     * ```
     */
    class HotWeaponLoadComponent {
        /**
         * @description 服务器开始上膛时执行绑定函数。
         * @groups 玩法/热武器/辅助类
         */
        onStartLoad: mw.MulticastDelegateInterface<() => void>;
        /**
         * @description 服务器上膛结束时执行绑定函数。
         * @groups 玩法/热武器/辅助类
         */
        onEndLoad: mw.MulticastDelegateInterface<() => void>;
        /**
         * @description 设置动画 GUID。
         * @groups 玩法/热武器/辅助类
         * @effect 调用端自动广播
         * @param GUID usage: 需要设置的蒙太奇动画 GUID  range: 依据资源 ID 长度而定
         */
        set animationAssetId(GUID: string);
        /**
         * @description 获取绑定的动画GUID。
         * @groups 玩法/热武器/辅助类
         * @effect 调用端生效
         * @returns 绑定的动画GUID
         */
        get animationAssetId(): string;
        /**
         * @description 设置是否开启开火后自动上膛的功能。
         * @groups 玩法/热武器/辅助类
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param enable usage: 是否开启开火后自动上膛的功能
         */
        set loadAfterFireEnabled(enable: boolean);
        /**
         * @description 获取是否开启开火后自动上膛的功能。
         * @groups 玩法/热武器/辅助类
         * @effect 调用端生效
         * @returns 是否开启开火后自动上膛的功能
         */
        get loadAfterFireEnabled(): boolean;
        /**
         * @description 设置上膛时间。
         * @groups 玩法/热武器/辅助类
         * @effect 调用端生效
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param time usage: 上膛时间 <br> default: 0.1 <br> range: [0.01,  10]  type:浮点数
         */
        set loadDuration(time: number);
        /**
         * @description 获取上膛时间。
         * @groups 玩法/热武器/辅助类
         * @effect 调用端生效
         * @returns 上膛时间
         */
        get loadDuration(): number;
    }
}

declare namespace mw {
    /**
     * @description 热武器后坐力组件，用于在发射时控制角色的视角的抖动（会自动恢复）和偏移（不会自动恢复）
     * @groups 玩法/热武器/辅助类
     * @networkStatus usage: 双端
     * @author jun.zhang
     * @example
     * 使用示例: 创建一个名为"HotWeaponRecoilForceSample1"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，代码如下：
     * ```ts
     * @Component
     * export default class HotWeaponRecoilForceSample1 extends Script {
     *     protected onStart(): void {
     *         // 构造
     *         const hotWeapon = this.gameObject as HotWeapon;
     *
     *         if (SystemUtil.isServer()) {
     *             hotWeapon.recoilForceEnabled = true;
     *             hotWeapon.recoilForceComponent.minHorizontalOffset = 1
     *             hotWeapon.recoilForceComponent.maxHorizontalOffset = 1
     *             hotWeapon.recoilForceComponent.minVerticalOffset = 1
     *             hotWeapon.recoilForceComponent.maxVerticalOffset = 1
     *             hotWeapon.recoilForceComponent.minHorizontalJitter = 1;
     *             hotWeapon.recoilForceComponent.maxHorizontalJitter = 1;
     *             hotWeapon.recoilForceComponent.minVerticalJitter = 1;
     *             hotWeapon.recoilForceComponent.maxVerticalJitter = 1;
     *         }
     *         hotWeapon.recoilForceComponent.onStartRecoil.add(() => { console.log("recoilForceComponent.onStartRecoilForce") });
     *     }
     * }
     * ```
     */
    class HotWeaponRecoilForceComponent {
        /**
         * @description 后坐力开始广播。
         * @groups 玩法/热武器/辅助类
         */
        onStartRecoil: mw.MulticastDelegateInterface<() => void>;
        /**
         * @description 设置水平偏移最小值。
         * @groups 玩法/热武器/辅助类
         * @effect 调用端生效
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param value usage: 水平偏移最小值 <br> default: 0 <br> range: [-5,  5]  type:浮点数  type:浮点数
         */
        set minHorizontalOffset(value: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取水平偏移最小值。
         * @effect 调用端生效
         * @returns 水平偏移最小值
         */
        get minHorizontalOffset(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置水平偏移最大值。
         * @effect 调用端生效
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param value usage: 水平偏移最大值 <br> default: 0 <br> range: [-5,  5]  type:浮点数
         */
        set maxHorizontalOffset(value: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取水平偏移最大值。
         * @effect 调用端生效
         * @returns 水平偏移最大值
         */
        get maxHorizontalOffset(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置垂直偏移最小值。
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param value usage: 垂直偏移最小值 <br> default: 0 <br> range: [-5,  5]  type:浮点数
         */
        set minVerticalOffset(value: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取垂直偏移最小值。
         * @effect 调用端生效
         * @returns 垂直偏移最小值
         */
        get minVerticalOffset(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置垂直偏移最大值。
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param value usage: 垂直偏移最大值 <br> default: 0 <br> range: [-5,  5]  type:浮点数
         */
        set maxVerticalOffset(value: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取垂直偏移最大值。
         * @effect 调用端生效
         * @returns 垂直偏移最大值
         */
        get maxVerticalOffset(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置相机水平抖动最小值。
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param value usage: 新相机水平抖动最小值  <br> default: 0 <br> range: [-5,  5]  type:浮点数
         */
        set minHorizontalJitter(value: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取相机水平抖动最小值。
         * @effect 调用端生效
         * @returns 相机水平抖动最小值
         */
        get minHorizontalJitter(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置相机水平抖动最大值。
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param value usage: 相机水平抖动最大值  <br> default: 0 <br> range: [-5,  5]  type:浮点数
         */
        set maxHorizontalJitter(value: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取相机水平抖动最大值。
         * @effect 调用端生效
         * @returns 相机水平抖动最大值
         */
        get maxHorizontalJitter(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置相机垂直抖动最小值。
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param value usage: 新相机垂直抖动最小值  <br> default: 0 <br> range: [-5,  5]  type:浮点数
         */
        set minVerticalJitter(value: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取相机垂直抖动最小值。
         * @effect 调用端生效
         * @returns 相机垂直抖动最小值
         */
        get minVerticalJitter(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置相机垂直抖动最大值。
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param value usage: 新相机垂直抖动最大值  <br> default: 0 <br> range: [-5,  5]  type:浮点数
         */
        set maxVerticalJitter(value: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取相机垂直抖动最大值。
         * @effect 调用端生效
         * @returns 相机垂直抖动最大值
         */
        get maxVerticalJitter(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取水平偏移值
         * @effect 调用端生效
         * @returns 水平偏移值
         * @example
         * 使用示例: 创建一个名为"HotWeaponRecoilForceSample2"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到一个热武器后坐力组件获取当前关键状态的效果，代码如下：
         * ```ts
         * @Component
         * export default class HotWeaponRecoilForceSample2 extends mw.Script {
         *     protected onStart(): void {
         *         // 构造
         *         const hotWeapon = this.gameObject as mw.HotWeapon;
         *
         *         const horizontalOffset = hotWeapon.recoilForceComponent.getHorizontalOffset();
         *         const verticalOffset = hotWeapon.recoilForceComponent.getVerticalOffset();
         *         const horizontalJitter = hotWeapon.recoilForceComponent.getHorizontalJitter();
         *         const verticalJitter = hotWeapon.recoilForceComponent.getVerticalJitter();
         *         const deepJitter = hotWeapon.recoilForceComponent.getDeepJitter();
         *     }
         * }
         * ```
         */
        getHorizontalOffset(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取垂直偏移值。
         * @effect 调用端生效
         * @returns 垂直偏移值
         */
        getVerticalOffset(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取水平抖动值。
         * @effect 调用端生效
         * @returns 水平抖动值
         */
        getHorizontalJitter(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取垂直抖动值。
         * @effect 调用端生效
         * @returns 垂直抖动值
         */
        getVerticalJitter(): number;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取深度抖动值。
         * @effect 调用端生效
         * @returns 深度抖动值
         */
        getDeepJitter(): number;
    }
}

declare namespace mw {
    /**
     * @description 热武器换弹组件，负责维护热武器换弹动作的相关参数和逻辑
     * @groups 玩法/热武器/辅助类
     * @networkStatus usage: 双端
     * @author jun.zhang
     * @example
     * 使用示例: 创建一个名为"HotWeaponReloadSample1"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，代码如下：
     * ```ts
     * @Component
     * export default class HotWeaponReloadSample1 extends Script {
     *     protected onStart(): void {
     *         // 构造
     *         const hotWeapon = this.gameObject as HotWeapon;
     *
     *         if (SystemUtil.isServer()) {
     *
     *             hotWeapon.reloadEnabled = true;
     *             hotWeapon.reloadComponent.reloadDuration = 2;
     *             hotWeapon.reloadComponent.animationAssetId = "4171";
     *
     *             hotWeapon.reloadComponent.onStartReload.add(() => { console.log("reloadComponent.onStartReload Server") });
     *             hotWeapon.reloadComponent.onEndReload.add(() => { console.log("reloadComponent.onEndReload Server") });
     *         } else if (SystemUtil.isClient()) {
     *             hotWeapon.reloadComponent.onStartReload.add(() => { console.log("reloadComponent.onStartReload Client") });
     *             hotWeapon.reloadComponent.onEndReload.add(() => { console.log("reloadComponent.onEndReload Client") });
     *         }
     *     }
     * }
     * ```
     */
    class HotWeaponReloadComponent {
        /**
         * @description 开始换弹时执行绑定函数。
         * @groups 玩法/热武器/辅助类
         */
        onStartReload: mw.MulticastDelegateInterface<() => void>;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 结束换弹时执行绑定函数。使用示例见类 HotWeaponReloadComponent 使用示例
         */
        onEndReload: mw.MulticastDelegateInterface<() => void>;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置动画 GUID。
         * @effect 调用端自动广播
         * @param GUID usage: 需要设置的蒙太奇动画 GUID  range: 依据资源 ID 长度而定
         */
        set animationAssetId(GUID: string);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取绑定的动画GUID。
         * @effect 调用端生效
         * @returns 绑定的动画GUID
         */
        get animationAssetId(): string;
        /**
         * @groups 玩法/热武器/辅助类
         * @description 设置换弹时间。
         * @effect 调用端自动广播
         * @precautions 装备热武器前仅服务器调用，装备后双端都可调用
         * @param time usage: 新换弹时间 <br> default: 0.1 <br> range: [0.01,  10]  type:浮点数
         */
        set reloadDuration(time: number);
        /**
         * @groups 玩法/热武器/辅助类
         * @description 获取换弹时间。
         * @effect 调用端生效
         * @returns 是换弹时间
         */
        get reloadDuration(): number;
    }
}

declare namespace mw {
    /**
     * @groups 玩法/其他
     * @description 交互物，请保证交互前动画资源已加载，否则可能导致位置错误或者其他不可预料的表现
     * @networkStatus usage: 双端
     * @author jun.zhang
     * @example
     * 使用示例:创建一个名为"InteractorSample"的脚本，放置在对象管理器某一交互物的子级中，打开脚本，输入以下代码保存，在本地资源库中搜索4175动画资源，拖入对象管理器中的优先加载目录。运行游戏，你将在场景中看到一个交互物的效果，玩家可以和此交互物进行交互，代码如下：
     * ```
     *  @Component
     * export default class InteractorSample extends Script {
     *     protected async onStart(): Promise<void> {
     *         const interObj = this.gameObject as Interactor;
     *         // 开始交互回调
     *         interObj.onEnter.add(() => {
     *             console.log("onEnter")
     *             console.log("onEnter ", interObj.getCurrentCharacter())
     *             console.log("onEnter ", interObj.occupied)
     *         })
     *         interObj.slot = HumanoidSlotType.Buttocks;
     *         interObj.animationId = "4175";
     *
     *         // 结束交互回调
     *         interObj.onLeave.add(() => {
     *             console.log("onLeave")
     *         })
     *         if (SystemUtil.isClient()) {
     *             InputUtil.onKeyDown(Keys.One, () => {
     *                 interObj.enter(Player.localPlayer.character, HumanoidSlotType.Buttocks, "4175");
     *             })
     *             InputUtil.onKeyDown(Keys.Two, () => {
     *                 // 不传退出交互时会自动回到交互前的坐标和旋转
     *                 interObj.leave();
     *             })
     *         }
     *     }
     * }
     * ```
     */
    class Interactor extends mw.GameObject {
        /**
         * @groups 玩法/其他
         * @description 开始交互，请保证交互前动画资源已加载，否则可能导致位置错误或者其他不可预料的表现
         * @effect 调用端自动广播
         * @param character usage: 要交互的角色（可以是玩家，也可以是AI）
         * @param slot usage: 交互插槽，不传默认以属性 slot 为准 default: 属性 slot
         * @param animationId usage: 交互姿态，不传默认以属性 animationId 为准 default: 属性 animationId  range: 依据动画资源 ID 决定字符串长度
         * @returns 是否成功交互，异步逻辑，返回值不代表已经完成交互，如需确保已经完成交互，请使用 onEnter 委托
         * @example
         * 使用示例:创建一个名为"InteractorStartEndSample"的脚本，放置在对象管理器某一交互物的子级中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到一个交互物的效果，玩家可以和此交互物进行交互，代码如下：
         * ```
         * @Component
         * export default class InteractorStartEndSample extends Script {
         *     protected async onStart(): Promise<void> {
         *         const interObj = this.gameObject as Interactor;
         *         // 开始交互回调
         *         interObj.onEnter.add(() => {
         *             console.log("onEnter")
         *         })
         *         // 结束交互回调
         *         interObj.onLeave.add(() => {
         *             console.log("onLeave")
         *         })
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 interObj.enter(Player.localPlayer.character, HumanoidSlotType.Buttocks, "4175");
         *             })
         *             InputUtil.onKeyDown(Keys.Two, () => {
         *                 // 不传退出交互时会自动回到交互前的坐标和旋转
         *                 interObj.leave();
         *             })
         *         }
         *     }
         * }
         * ```
         */
        enter(character: mw.Character, slot?: mw.HumanoidSlotType | mw.NonHumanoidSlotType, animationId?: string): boolean;
        /**
         * @groups 玩法/其他
         * @description 结束交互。通常与 enter 成对使用，使用示例详见方法 enter 中示例代码。
         * @effect 调用端自动广播
         * @param position usage: 结束位置 default: 玩家开始交互前的坐标为准
         * @param rotation usage: 结束旋转量 default: 玩家开始交互前的旋转为准，如果玩家开始前的姿态是倾斜的，内部不会纠正
         * @param animationId usage: 新姿态，default: 玩家开始交互前的姿态（动画会转姿态）  range: 依据动画资源 ID 决定字符串长度
         * @returns true 代表触发了结束交互逻辑，异步操作，返回值不能代表结束交互逻辑已经成功，如需保证结束交互逻辑完成才执行时，请使用 onLeave 委托
         */
        leave(position?: mw.Vector, rotation?: mw.Rotation, animationId?: string): boolean;
        /**
         * @groups 玩法/其他
         * @description 获取正在交互的角色
         * @effect 调用端生效
         * @returns true：为交互中
         * @example
         * 使用示例:创建一个名为"InteractorGetInteractCharacterSample"的脚本，放置在对象管理器某一交互物的子级中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到一个交互物的效果，玩家可以和此交互物进行交互，代码如下：
         * ```
         * @Component
         * export default class InteractorGetInteractCharacterSample extends Script {
         *     protected async onStart(): Promise<void> {
         *         const interObj = this.gameObject as Interactor;
         *         // 开始交互回调
         *         interObj.onEnter.add(() => {
         *             console.log(`onEnter status: ${interObj.getCurrentCharacter()}`)
         *         })
         *         // 省略开始交互代码
         *     }
         * }
         * ```
         */
        getCurrentCharacter(): mw.Character;
        /** @description 该交互物的交互状态 */
        get occupied(): boolean;
        /**
         * @description 交互物插槽
         * @groups 玩法/其他
         */
        set slot(value: mw.HumanoidSlotType);
        /**
         * @groups 玩法/其他
         * @description 交互物插槽
         */
        get slot(): mw.HumanoidSlotType;
        /**
         * @groups 玩法/其他
         * @description 交互动画资源 id
         */
        set animationId(assetGuid: string);
        /**
         * @groups 玩法/其他
         * @description 交互动画资源 id
         */
        get animationId(): string;
        /**
         * @groups 玩法/其他
         * @description 交互物非人形插槽
         */
        set nonHumanoidSlot(value: mw.NonHumanoidSlotType);
        /**
         * @groups 玩法/其他
         * @description 交互物非人形插槽
         */
        get nonHumanoidSlot(): mw.NonHumanoidSlotType;
        /**
         * @groups 玩法/其他
         * @description 交互非人形动画资源 id
         */
        set nonHumanoidAnimationId(assetGuid: string);
        /**
         * @groups 玩法/其他
         * @description 交互非人形动画资源 id
         */
        get nonHumanoidAnimationId(): string;
        /**
         * @description 交互开始时执行绑定函数。通常与 enter 成对使用，使用示例详见方法 enter 中示例代码。
         * @groups 玩法/其他
         * @precautions 会自动广播，若是双端对象，则可以在任意客户端调用
         */
        onEnter: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/其他
         * @description 交互结束时执行绑定函数。通常与 leave 成对使用，使用示例详见方法 leave 中示例代码。
         * @precautions 会自动广播，若是双端对象，则可以在任意客户端调用
         */
        onLeave: mw.MulticastDelegate<() => void>;
    }
}

declare namespace mw {
    /**
   * @author baoqiang.han
   * @groups 场景/灯光
   * @description 光照
   * @description -------------------------
   * @description 光照是指模拟现实世界中的光源对物体的照射和影响。
   * @description 在三维渲染中，光照用于计算物体的明暗、阴影和反射等效果，以增加场景的真实感和立体感。
   * @description 光照模型通常包括光源的类型、颜色、强度以及物体表面的材质属性等因素。常见的光照模型有平行光、点光源等。
   * @description 它包括一系列可调整的属性，您可以使用这些静态属性和方法来更改照明的显示方式以及与其他对象的交互方式，如照明属性中所概述。
   * @networkStatus usage:客户端
   * @example
   * 使用示例: 可按如下操作控制编辑器后处理实时效果。
   * 创建一个名为"LightingExample"的脚本，放置在对象栏中，打开脚本，输入以下代码，运行游戏，你将可以通过+和-键控制光照亮度
   * ```
   * @Component
   * export default class LightingExample extends mw.Script {
   *     // 当脚本被实例后，会在第一帧更新前调用此函数
   *     protected async onStart(): Promise<void> {
   *         if(SystemUtil.isClient())
   *         {
   *             mw.InputUtil.onKeyDown(Keys.Add,()=>{
   *                 // 小键盘+建，增加光照亮度,依次递增1个单位
   *                 Lighting.skyLightIntensity = Lighting.skyLightIntensity + 1;
   *                 Lighting.directionalLightIntensity = Lighting.directionalLightIntensity + 1;
   *                 console.log("当前光源亮度:" + Lighting.brightness);
   *                 // 同时改变平行光角度,依次递增5（角度）
   *                 Lighting.pitchAngle = Lighting.pitchAngle + 5;
   *                 console.log("当前平行光角度:" + Lighting.pitchAngle);
   *             });
   *             mw.InputUtil.onKeyDown(Keys.Subtract,()=>{
   *                 // 小键盘-建，降低光照亮度,依次递减1个单位
   *                 Lighting.skyLightIntensity = Lighting.skyLightIntensity - 1;
   *                 Lighting.directionalLightIntensity = Lighting.directionalLightIntensity - 1;
   *                 // 同时改变平行光角度,依次递减5（角度）
   *                 Lighting.pitchAngle = Lighting.pitchAngle - 5;
   *                 console.log("当前平行光角度:" + Lighting.pitchAngle);
   *             });
   *         }
   *     }
   * }
   * ```
   */
    class Lighting {
        /**
         * @groups 场景/灯光
         * @description 设置朝向角度 （-180 ~ 180）
         * @effect 只在客户端调用生效
         * @param value usage:角度浮点值
         */
        static set yawAngle(value: number);
        /**
         * @groups 场景/灯光
         * @description 获取朝向角度
         * @effect 只在客户端调用生效
         * @returns 朝向角度
         */
        static get yawAngle(): number;
        /**
         * @groups 场景/灯光
         * @description 设置俯仰角度 （-90 ~ 90）
         * @effect 只在客户端调用生效
         * @param value usage:角度浮点值
         */
        static set pitchAngle(value: number);
        /**
         * @groups 场景/灯光
         * @description 获取俯仰角度
         * @effect 只在客户端调用生效
         * @returns 俯仰角度
         */
        static get pitchAngle(): number;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:未使用 replacement:directionalLightIntensity/skyLightIntensity
         * @description 设置光照强度 （0 ~ 1）
         * @effect 只在客户端调用生效
         * @param value usage:强度浮点值
         */
        static set brightness(value: number);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:未使用 replacement:directionalLightIntensity/skyLightIntensity
         * @description 获取光照强度
         * @effect 只在客户端调用生效
         * @returns 光照强度
         */
        static get brightness(): number;
        /**
         * @groups 场景/灯光
         * @description 设置偏色值
         * @effect 调用端生效
         * @param newLightColor usage:新偏色值
         */
        static set lightColor(newLightColor: mw.LinearColor);
        /**
         * @groups 场景/灯光
         * @description 获取偏色值
         * @effect 调用端生效
         * @returns 偏色值
         */
        static get lightColor(): mw.LinearColor;
        /**
         * @groups 场景/灯光
         * @description 设置曝光值
         * @effect 只在客户端调用生效
         * @param value usage:曝光浮点值
         */
        static set ev100(value: number);
        /**
         * @groups 场景/灯光
         * @description 获取曝光值
         * @effect 只在客户端调用生效
         * @returns 曝光浮点值
         */
        static get ev100(): number;
        /**
         * @groups 场景/灯光
         * @description 设置是否开启阴影
         * @effect 只在客户端调用生效
         * @param value usage:布尔值
         */
        static set castShadowsEnabled(value: boolean);
        /**
         * @groups 场景/灯光
         * @description 获取是否开启阴影
         * @effect 只在客户端调用生效
         * @returns true或false
         */
        static get castShadowsEnabled(): boolean;
        /**
         * @groups 场景/灯光
         * @description 设置阴影距离
         * @effect 只在客户端调用生效
         * @param value usage:距离(cm)
         */
        static set shadowsDistance(value: number);
        /**
         * @groups 场景/灯光
         * @description 获取阴影距离
         * @effect 只在客户端调用生效
         * @returns 阴影距离(cm)
         */
        static get shadowsDistance(): number;
        /**
         * @groups 场景/灯光
         * @description 设置是否开启色温
         * @effect 只在客户端调用生效
         * @param value usage:布尔值
         */
        static set temperatureEnabled(value: boolean);
        /**
         * @groups 场景/灯光
         * @description 获取是否开启色温
         * @effect 只在客户端调用生效
         * @returns true或false
         */
        static get temperatureEnabled(): boolean;
        /**
         * @groups 场景/灯光
         * @description 设置色温 （1000 ~ 14000）
         * @effect 只在客户端调用生效
         * @param value usage:色温浮点值
         */
        static set temperature(value: number);
        /**
         * @groups 场景/灯光
         * @description 获取色温
         * @effect 只在客户端调用生效
         * @returns true或false
         */
        static get temperature(): number;
        /**
         * @groups 场景/灯光
         * @description 设置平行光强度
         * @effect 只在客户端调用生效
         * @param value usage:强度值
         */
        static set directionalLightIntensity(value: number);
        /**
         * @groups 场景/灯光
         * @description 获取平行光强度
         * @effect 只在客户端调用生效
         * @returns 强度值
         */
        static get directionalLightIntensity(): number;
        /**
         * @groups 场景/灯光
         * @description 设置平行光颜色
         * @effect 只在客户端调用生效
         * @param value usage:平行光颜色
         */
        static set directionalLightColor(value: mw.LinearColor);
        /**
         * @groups 场景/灯光
         * @description 获取平行光颜色
         * @effect 只在客户端调用生效
         * @returns 平行光颜色
         */
        static get directionalLightColor(): mw.LinearColor;
        /**
         * @groups 场景/灯光
         * @description 设置天光强度
         * @effect 只在客户端调用生效
         * @param value usage:强度值
         */
        static set skyLightIntensity(value: number);
        /**
         * @groups 场景/灯光
         * @description 获取天光强度
         * @effect 只在客户端调用生效
         * @returns 强度值
         */
        static get skyLightIntensity(): number;
        /**
         * @groups 场景/灯光
         * @description 设置天光颜色
         * @effect 只在客户端调用生效
         * @param value usage:天光颜色
         */
        static set skyLightColor(value: mw.LinearColor);
        /**
         * @groups 场景/灯光
         * @description 获取天光颜色
         * @effect 只在客户端调用生效
         * @returns 天光颜色
         */
        static get skyLightColor(): mw.LinearColor;
        /**
         * @description 设置光照贴图
         * @effect 只在客户端调用生效
         * @param value usage:光照贴图ID
         */
        static set skyLightTextureId(value: number | string);
        /**
         * @description 获取天光颜色
         * @effect 只在客户端调用生效
         * @returns 天光颜色
         */
        static get skyLightTextureId(): string;
    }
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @groups 场景/灯光
     * @description 点光源
     * @networkStatus usage:客户端
     */
    class PointLight extends mw.GameObject {
        /**
        * @description 设置点光源开关
        * @effect 客户端生效
        * @param value usage:光照开关
        */
        set enabled(value: boolean);
        /**
         * @description 获取点光源开关
         * @effect 客户端生效
         * @returns 光照开关
         */
        get enabled(): boolean;
        /**
        * @description 设置光照强度
        * @effect 客户端生效
        * @param value usage:光照强度值
        */
        set intensity(value: number);
        /**
         * @description 获取光照强度
         * @effect 客户端生效
         * @returns 光照强度值
         */
        get intensity(): number;
        /**
        * @description 设置光照颜色
        * @effect 客户端生效
        * @param value usage:光照颜色值
        */
        set color(value: mw.LinearColor);
        /**
         * @description 获取光照颜色
         * @effect 客户端生效
         * @returns 光照颜色值
         */
        get color(): mw.LinearColor;
        /**
        * @description 设置光照衰减半径
        * @effect 客户端生效
        * @param value usage:光照衰减半径
        */
        set attenuationRadius(value: number);
        /**
         * @description 获取光照衰减半径
         * @effect 客户端生效
         * @returns 光照衰减半径
         */
        get attenuationRadius(): number;
        /**
        * @description 设置光照衰减指数
        * @effect 客户端生效
        * @param value usage:光照衰减指数
        */
        set attenuationExponent(value: number);
        /**
         * @description 获取光照衰减指数
         * @effect 客户端生效
         * @returns 光照衰减指数
         */
        get attenuationExponent(): number;
    }
}

declare namespace mw {
    /**
     * @author xinlei.nie
     * @description 设置链接线的通行方向
     * @groups 玩法/寻路系统
     */
    enum DirectionType {
        /** 双向：双向都可通行 */
        BothWays = 0,
        /** 左到右：单向通行，只能从左点通往右点 */
        LeftToRight = 1,
        /** 右到左：单向通行，只能从右点通往左点 */
        RightToLeft = 2
    }
    /**
     * @author xinlei.nie
     * @description 设置链接区域的寻路类型
     * @groups 玩法/寻路系统
     */
    enum LinkClassType {
        /** 默认：默认情况下，该区域与寻路区域有同样的效果 */
        Default = 0,
        /** 高度限定：表示匹配遍历条件的区域，其中包含防止人形对象遍历的较低高度。寻路区域不会在此体积内生成寻路数据 */
        LowHeight = 1,
        /** 无效：表示体积内的空白区域，寻路区域不会在此体积内生成寻路数据 */
        Null = 2,
        /** 低优先级：将屏障区域内的寻路计算成本设置高于寻路区域的成本 */
        Obstacle = 3
    }
    /**
     * @author xinlei.nie
     * @groups 玩法/寻路系统
     * @networkStatus usage:双端
     * @description 寻路链接
     * @description -------------------------
     * @description 寻路链接能将导航网格体内没有直接路径的区域链接起来
     * @description 如何使用寻路链接：
     * @description     - 创建一个寻路链接对象。可手动将左侧栏中逻辑对象中的寻路链接拖入场景中，在编辑器属性面板中调整参数；也可以在脚本中动态创建寻路链接。
     * @description     - 设置寻路链接对象属性 左点右点位置分别表示链接在寻路区域中的两个点，链接建立后AI会从一个点沿直线前往另一个点
     * @description     - 需要注意的是，链接并不保证指定线路的“可到达性”，即如果链接线上存在AI无法跨越或者无法行走的区域，寻路有可能失效
     * @author xinlei.nie
     * @example
     * 使用示例:创建一个名为"NavLinkSample"的脚本，复制以下代码后将脚本挂载于地板上，接着在场景中拖入一个寻路区域，相对位置设置为(1200, 0, 0)，相对缩放设置为(20, 20, 10)，再开启世界设置中的 动态构建寻路导航数据
     * 进入游戏后，按 N 控制NPC开始寻路；按 R 重置NPC位置；按 1 切换寻路链接的区域类型；按 2 切换寻路链接的连通方式。可以测试NPC在不同情景下的寻路表现。
     * 代码如下：
     * ```
     * @Component
     * export default class NavLinkSample extends Script {
     *     platform1 = null as Model;
     *     platform2 = null as Model;
     *     bridge = null as Model;
     *     target = null as Model;
     *     npc = null as Character;
     *     navLink = null as NavLink;
     *
     *     // 当脚本被实例后，会在第一帧更新前调用此函数
     *     protected onStart(): void {
     *         if (SystemUtil.isServer()) {
     *             // 创建平台1
     *             this.platform1 = GameObject.spawn("197386", {
     *                 replicates: true,
     *                 transform: new Transform(new Vector(2000, 0, 0), new Rotation(0, 0, 0), new Vector(4, 20, 1))
     *             });
     *
     *             // 创建平台2
     *             this.platform1 = GameObject.spawn("197386", {
     *                 replicates: true,
     *                 transform: new Transform(new Vector(700, 0, 0), new Rotation(0, 0, 0), new Vector(10, 20, 1))
     *             });
     *
     *             // 创建连接桥
     *             this.platform1 = GameObject.spawn("197386", {
     *                 replicates: true,
     *                 transform: new Transform(new Vector(1500, 600, 80), new Rotation(0, 0, 0), new Vector(6, 0.5, 0.2))
     *             });
     *
     *             // 创建目标点
     *             this.target = GameObject.spawn("197388", {
     *                 replicates: true,
     *                 transform: new Transform(new Vector(500, -500, 100), new Rotation(0, 0, 0), new Vector(1, 1, 1))
     *             });
     *             // 关闭目标点碰撞
     *             setTimeout(() => {
     *                 this.target.collisionEnabled = false;
     *             }, 2000);
     *
     *             // 创建寻路链接
     *             this.navLink = GameObject.spawn("NavigationLink", {
     *                 replicates: true,
     *                 transform: new Transform(new Vector(1500, 600, 100), new Rotation(0, 0, 0), new Vector(1, 1, 1))
     *             });
     *             // 设置寻路链接
     *             setTimeout(() => {
     *                 this.navLink.leftPosition = new Vector(400, 0, 0);
     *                 this.navLink.rightPosition = new Vector(-400, 0, 0);
     *                 this.navLink.navLinkArea = LinkClassType.Default;
     *                 this.navLink.direction = DirectionType.BothWays;
     *             }, 2000);
     *
     *             // 创建npc
     *             this.npc = GameObject.spawn("Character", {
     *                 replicates: true,
     *                 transform: new Transform(new Vector(2000, -600, 500), new Rotation(0, 0, 0), new Vector(1, 1, 1))
     *             });
     *
     *             // 接收 npc向target寻路 事件，执行逻辑
     *             Event.addClientListener("NPCNavigateToTarget", ()=>{
     *                 Navigation.navigateTo(this.npc, this.target.worldTransform.position);
     *             });
     *
     *             // 接收 重置npc位置 事件，执行逻辑
     *             Event.addClientListener("ResetNPC", ()=>{
     *                 this.npc.worldTransform.position = new Vector(2000, -600, 500);
     *             });
     *
     *             // 接收 切换寻路链接区域类型 事件（ Default 与 Null 切换）
     *             Event.addClientListener("SwitchLinkClassType", ()=>{
     *                 if (this.navLink.navLinkArea == LinkClassType.Default) {
     *                     this.navLink.navLinkArea = LinkClassType.Null;
     *                 } else {
     *                     this.navLink.navLinkArea = LinkClassType.Default;
     *                 }
     *             });
     *
     *             // 接收 切换寻路链接通行方向 事件（ Bothways 与 RightToLeft 切换）
     *             Event.addClientListener("SwitchDirectionType", ()=>{
     *                 if (this.navLink.direction == DirectionType.BothWays) {
     *                     this.navLink.direction = DirectionType.RightToLeft;
     *                 } else {
     *                     this.navLink.direction = DirectionType.BothWays;
     *                 }
     *             });
     *         }
     *
     *         if (SystemUtil.isClient()) {
     *             // 按 N 发送 npc向target寻路 事件
     *             InputUtil.onKeyDown(Keys.N, ()=>{
     *                 Event.dispatchToServer("NPCNavigateToTarget");
     *             });
     *
     *             // 按 R 发送 重置npc位置 事件
     *             InputUtil.onKeyDown(Keys.R, ()=>{
     *                 Event.dispatchToServer("ResetNPC");
     *             });
     *
     *             // 按 1 发送 切换寻路链接区域类型 事件（ Default 与 Null 切换）
     *             InputUtil.onKeyDown(Keys.One, ()=>{
     *                 Event.dispatchToServer("SwitchLinkClassType");
     *             });
     *
     *             // 按 2 发送 切换寻路链接通行方向 事件（ Bothways 与 RightToLeft 切换）
     *             InputUtil.onKeyDown(Keys.Two, ()=>{
     *                 Event.dispatchToServer("SwitchDirectionType");
     *             });
     *         }
     *     }
     * }
     * ```
     */
    class NavLink extends mw.GameObject {
        /**
         * @groups 玩法/寻路系统
         * @description 设置链接区域的寻路类型
         * @effect 服务端自动广播
         * @param newClassType usage: 新寻路类型
         */
        set navLinkArea(newClassType: LinkClassType);
        /**
         * @groups 玩法/寻路系统
         * @description 获取链接区域的寻路类型
         * @returns 当前寻路类型
         */
        get navLinkArea(): LinkClassType;
        /**
         * @groups 玩法/寻路系统
         * @description 设置链接线的通行方向
         * @effect 服务端自动广播
         * @param newDirectionType usage: 新通行方向
         */
        set direction(newDirectionType: DirectionType);
        /**
         * @groups 玩法/寻路系统
         * @description 获取链接线的通行方向
         * @returns 当前通行方向
         */
        get direction(): DirectionType;
        /**
         * @groups 玩法/寻路系统
         * @description 设置左点位置
         * @effect 服务端自动广播
         * @param newPosition usage: 新左点位置
         */
        set leftPosition(newPosition: mw.Vector);
        /**
         * @groups 玩法/寻路系统
         * @description 获取左点位置
         * @returns 当前左点位置
         */
        get leftPosition(): mw.Vector;
        /**
         * @groups 玩法/寻路系统
         * @description 设置右点位置
         * @effect 服务端自动广播
         * @param newPosition usage: 新右点位置
         */
        set rightPosition(newPosition: mw.Vector);
        /**
         * @groups 玩法/寻路系统
         * @description 获取右点位置
         * @returns 当前右点位置
         */
        get rightPosition(): mw.Vector;
    }
}

declare namespace mw {
    /**
     * @author hao.huang
     * @description 寻路动态修饰区类型，不同类型在寻路计算中成本不同，影响寻路结果
     * @groups 玩法
     */
    enum NavModifierType {
        /** 无效，通常代表一个空区域，任何人都不能穿越 */
        Null = 0,
        /** 默认，常规导航区域，默认应用于整个导航数据 */
        Default = 1,
        /** 高度限定，在上面自由高度不足的空间中可以产生的特殊区域。任何人都不能穿越 */
        LowHeight = 2,
        /** 低优先级，通常代表高成本区域，除非没有其他路径存在，否则任何人都不应该穿越该区域 */
        Obstacle = 3
    }
    /**
     * @author hao.huang
     * @groups 玩法/寻路系统
     * @description 寻路动态修饰区
     * @networkStatus usage:双端
     */
    class NavModifierVolume extends mw.GameObject {
        /**
         * @groups 玩法/寻路系统
         * @description 设置区域类型
         * @effect 调用端生效
         * @param type usage: 新区域类型
         */
        set areaClass(type: NavModifierType);
        /**
         * @groups 玩法/寻路系统
         * @description 获取区域类型
         * @effect 调用端生效
         * @returns 当前区域类型
         */
        get areaClass(): NavModifierType;
    }
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author hao.huang
     * @groups 玩法/物理
     * @description 物理链接组件
     * @networkStatus usage:双端
     * @precautions 服务器设置，双端自动同步
     * @example
     * 使用示例: 创建一个名为"RigidTest"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到一个正方体和一个球体，将设置绳子约束启用，进行绞盘效果。代码如下:
     * ```ts
     * @Component
     * export default class RigidTest extends Script {
     *     box:mw.Model;
     *     ball:mw.Model;
     *     rigid:mw.RigidConstraint;
     *     // 当脚本被实例后，会在第一帧更新前调用此函数
     *     protected onStart(): void {
     *         if(SystemUtil.isServer()) {
     *
     *             GameObject.asyncSpawn("197386",{replicates:true}).then((obj)=>{
     *                 this.box = obj as mw.Model;
     *                 this.box.worldTransform.position = new Vector(200,0,1200);
     *             });
     *             GameObject.asyncSpawn("197388",{replicates:true}).then((obj)=>{
     *                 this.ball = obj as mw.Model;
     *                 this.ball.worldTransform.position = new Vector(100,0,100);
     *                 // 使用链接组件的一方必须开启物理模拟
     *                 this.ball.physicsEnabled = true;
     *             })
     *             // 创建链接组件链接Box与ball
     *             setTimeout(()=>{
     *                 GameObject.asyncSpawn("RigidConstraint",{replicates:true}).then((obj)=>{
     *                     this.rigid = obj as mw.RigidConstraint;
     *                     this.rigid.constraint1 = this.box;
     *                     this.rigid.constraint2 = this.ball;
     *                     this.rigid.softConstraintEnabled = true;
     *                     this.rigid.length = 800;
     *                     this.rigid.autoEnable = true;
     *                     // 开启铰链拉到ball到target位置
     *                     setTimeout(() => {
     *                         this.rigid.winchEnabled = true;
     *                         this.rigid.winchForce = 10000;
     *                         this.rigid.winchSpeed = 150;
     *                         this.rigid.winchTarget = 200;
     *                     }, 5000);
     *                 })
     *             }, 10000);
     *         }
     *     }
     * }
     * ```
     */
    class RigidConstraint extends mw.GameObject {
        /**
         * @groups 玩法/物理
         * @description 两个被约束对象的间隔距离
         * @returns 两约束对象的间隔距离
         */
        get currentDistance(): number;
        /**
         * @groups 玩法/物理
         * @description 被约束对象1，当前可约束类型为模型、角色、NPC、载具，其他对象约束无效
         * @returns 约束对象1
         */
        get constraint1(): mw.GameObject;
        /**
         * @groups 玩法/物理
         * @description 被约束对象1，当前可约束类型为模型、角色、NPC、载具，其他对象约束无效
         * @param constraintObject usage:约束对象1
         */
        set constraint1(constraintObject: mw.GameObject);
        /**
         * @groups 玩法/物理
         * @description 被约束对象2，当前可约束类型为模型、角色、NPC、载具，其他对象约束无效
         * @returns 约束对象2
         */
        get constraint2(): mw.GameObject;
        /**
         * @groups 玩法/物理
         * @description 被约束对象2，当前可约束类型为模型、角色、NPC、载具，其他对象约束无效
         * @param constraintObject usage:约束对象2
         */
        set constraint2(constraintObject: mw.GameObject);
        /**
         * @groups 玩法/物理
         * @description 在运行时自动启用约束效果
         * @returns 启用状态
         */
        get autoEnable(): boolean;
        /**
         * @groups 玩法/物理
         * @description 在运行时自动启用约束效果
         * @param newEnable usage:启用状态
         */
        set autoEnable(newEnable: boolean);
        /**
         * @groups 玩法/物理
         * @description 显示连接线
         * @returns 显示状态
         */
        get isVisible(): boolean;
        /**
         * @groups 玩法/物理
         * @description 显示连接线
         * @param visible
         */
        set isVisible(visible: boolean);
        /**
         * @groups 玩法/物理
         * @description 开启软连接后，两个被约束的对象间隔距离不可超过连接长度的限制，可以短于连接长度并自由旋转。开启软连接后可以使用铰盘功能
         * @returns 软链接启用状态
         */
        get softConstraintEnabled(): boolean;
        /**
         * @groups 玩法/物理
         * @description 开启软连接后，两个被约束的对象间隔距离不可超过连接长度的限制，可以短于连接长度并自由旋转。开启软连接后可以使用铰盘功能
         * @param newEnable usage:软链接启用状态
         */
        set softConstraintEnabled(newEnable: boolean);
        /**
         * @groups 玩法/物理
         * @description 设置两个被约束对象的最大连接距离，当两个被约束对象的当前距离大于连接长度时，会自动收缩物理连接，接两个被约束对象拉进到设定距离
         * @returns 最大连接距离
         */
        get length(): number;
        /**
         * @groups 玩法/物理
         * @description 设置两个被约束对象的最大连接距离，当两个被约束对象的当前距离大于连接长度时，会自动收缩物理连接，接两个被约束对象拉进到设定距离
         * @param maxLength usage:最大连接距离
         */
        set length(maxLength: number);
        /**
         * @groups 玩法/物理
         * @description 开启后，软连接自动执行铰盘效果
         * @returns 绞盘启用状态
         */
        get winchEnabled(): boolean;
        /**
         * @groups 玩法/物理
         * @description 开启后，软连接自动执行铰盘效果
         * @param newEnable usage:绞盘启用状态
         */
        set winchEnabled(newEnable: boolean);
        /**
         * @groups 玩法/物理
         * @description 设置绞盘的拉力，拉动的目标质量越大，所需要的拉力越大
         * @returns 绞盘力大小
         */
        get winchForce(): number;
        /**
         * @groups 玩法/物理
         * @description 设置绞盘的拉力，拉动的目标质量越大，所需要的拉力越大
         * @param force usage:绞盘力大小
         */
        set winchForce(force: number);
        /**
         * @groups 玩法/物理
         * @description 设置绞盘运动速度（cm/s）
         * @returns 绞盘运动速度
         */
        get winchSpeed(): number;
        /**
         * @groups 玩法/物理
         * @description 设置绞盘运动速度（cm/s）
         * @param speed usage:绞盘运动速度
         */
        set winchSpeed(speed: number);
        /**
         * @groups 玩法/物理
         * @description 设置绞盘运动的目标距离，当被约束的两个对象间隔距离达到绞盘目标时，停止运动
         * @returns 绞盘目标距离
         */
        get winchTarget(): number;
        /**
         * @groups 玩法/物理
         * @description 设置绞盘运动的目标距离，当被约束的两个对象间隔距离达到绞盘目标时，停止运动
         * @param targetLength usage:绞盘目标距离
         */
        set winchTarget(targetLength: number);
        /**
         * @groups 玩法/物理
         * @description 绞盘达到目标时触发回调函数
         */
        onWinchComplete: mw.MulticastDelegate<() => void>;
    }
}

declare namespace mw {
    /**
     * @author xinlei.nie
     * @description 力区域的施力类型
     * @groups 玩法/物理
     */
    enum ForceType {
        /**
         * 指向型，向指定方向持续施加一个力
         */
        Directed = 0,
        /**
         * 径向型，从四周向中心持续施加一个力
         */
        Radial = 1
    }
    /**
     * @groups 玩法/物理
     * @description 物理力区域
     * @description -------------------------
     * @description 进入力区域的角色或开启物理模拟的物体，会受到力的作用
     * @description 如何使用力区域：
     * @description     - 创建一个力区域对象。可手动将左侧栏中逻辑对象中的力区域拖入场景中，在编辑器属性面板中调整参数；也可以在脚本中动态创建力区域。
     * @description     - 设置力区域对象属性 自动启用/enabled 为 true ，才可触发力的效果。
     * @description     - 选择一种力区域的类型，指向力会向指定方向施加指定大小的力，而径向力会沿球心方向施加指定大小的力
     * @description     - 对于指向力，需要设置 指向力值/directionalForce 指定大小和方向；对于径向力，需要设置 径向力值/radialForce 指定大小
     * @networkStatus usage: 双端
     * @author xinlei.nie
     * @example
     * 使用示例:创建一个名为"ForceVolumeSample"的脚本，按 Q 使方块进入力区域，接下来使用数字键 1 控制开关，使用数字键 2 切换力的类型，使用数字键 3 切换力的大小，就可以看到方块在力区域中的表现了
     * 注意：默认给的径向力大小不足以使方块运动起来，所以不调整大小的情况下切换为径向力之后方块坠地为正常表现；如果方块在运动过程中离开了区域，再按一次 Q 可以将方块重新置于力区域中；由于力区域仅存在于服务端，对于以主控端表现为主的角色无影响也是正常表现
     * 代码如下：
     * ```
     * @Component
     * export default class ForceVolumeSample extends Script {
     *
     *    public myFV: ForceVolume;
     *    public myCube: Model;
     *    public myFlag: boolean = true;
     *
     *    // 当脚本被实例后，会在第一帧更新前调用此函数
     *    protected async onStart(): Promise<void> {
     *
     *        // 在服务端添加一个开启物理模拟并移动位置的监听回调函数
     *        if (SystemUtil.isServer()) {
     *            Event.addClientListener("EnablePhysicsAndSetPosition", (player: Player)=>{
     *                this.myCube.physicsEnabled = true;
     *                this.myCube.localTransform.position = new Vector(500, 0, 0);
     *            });
     *        }
     *
     *        // 在服务端添加一个开启/关闭力区域的监听回调函数
     *        if (SystemUtil.isServer()) {
     *            Event.addClientListener("SwitchForceVolumeEnabledStatus", (player: Player)=>{
     *                if (this.myFV.enabled) {
     *                    this.myFV.enabled = false;
     *                } else {
     *                    this.myFV.enabled = true;
     *                }
     *            });
     *        }
     *
     *        // 在服务端添加一个切换指向力/径向力区域的监听回调函数
     *        if (SystemUtil.isServer()) {
     *            Event.addClientListener("SwitchForceVolumeType", (player: Player)=>{
     *                if (this.myFV.forceType == ForceType.Directed) {
     *                    this.myFV.forceType = ForceType.Radial;
     *                } else {
     *                    this.myFV.forceType = ForceType.Directed;
     *                }
     *            });
     *        }
     *
     *        // 在服务端添加一个切换切换指向力/径向力大小（正常大小与三倍大小）的监听回调函数
     *        if (SystemUtil.isServer()) {
     *            Event.addClientListener("SwitchForceVolumeIntensity", (player: Player)=>{
     *                if (this.myFlag) {
     *                    this.myFV.directionalForce = new Vector(0, 0, 900000);
     *                    this.myFV.radialForce = 900000;
     *                    this.myFlag = false;
     *                } else {
     *                    this.myFV.directionalForce = new Vector(0, 0, 300000);
     *                    this.myFV.radialForce = 300000;
     *                    this.myFlag = true;
     *                }
     *            });
     *        }
     *
     *        // 在服务端添加一个切换稳定性系数（0与50）的监听回调函数
     *        if (SystemUtil.isServer()) {
     *            Event.addClientListener("SwitchStability", (player: Player)=>{
     *                if (this.myFV.stability == 0) {
     *                    this.myFV.stability = 50;
     *                } else {
     *                    this.myFV.stability = 0;
     *                }
     *            });
     *        }
     *
     *        // 在服务端创建一个力区域对象
     *        if (SystemUtil.isServer()) {
     *            this.myFV = await GameObject.asyncSpawn<ForceVolume>("ForceVolume",
     *            {
     *                replicates: true,
     *                transform: new Transform()
     *            });
     *        }
     *
     *        // 在服务端修改力区域的位置与缩放
     *        if (SystemUtil.isServer()) {
     *            let myFVTrans = this.myFV.localTransform;
     *            let newPosition = new Vector(500, 0, 250);
     *            myFVTrans.position = newPosition;
     *            let newScale = new Vector(5, 5, 5);
     *            myFVTrans.scale = newScale;
     *        }
     *
     *        // 在服务端修改力区域的具体数据，并绑定进出区域事件输出log
     *        if (SystemUtil.isServer()) {
     *            this.myFV.enabled = true;
     *            this.myFV.forceType = ForceType.Directed;
     *            this.myFV.directionalForce = new Vector(0, 0, 300000);
     *            this.myFV.radialForce = 300000;
     *            this.myFV.stability = 0;
     *            this.myFV.onEnter.add(()=>{
     *                console.log("Something entered ForceVolume");
     *            });
     *            this.myFV.onLeave.add(()=>{
     *                console.log("Something left ForceVolume");
     *            });
     *        }
     *
     *        // 在服务端创建一个方块，客户端按下 Q 开启物理模拟，并将方块移动到力区域内
     *        if (SystemUtil.isServer()) {
     *            this.myCube = await GameObject.asyncSpawn<Model>("197386",
     *            {
     *                replicates: true,
     *                transform: new Transform()
     *            });
     *        }
     *        InputUtil.onKeyDown(Keys.Q, ()=>{
     *            // 客户端通知服务器执行相应操作
     *            Event.dispatchToServer("EnablePhysicsAndSetPosition");
     *        });
     *
     *        // 在客户端按数字键 1 来开启/关闭力区域
     *        InputUtil.onKeyDown(Keys.One, ()=>{
     *            // 客户端通知服务器执行相应操作
     *            Event.dispatchToServer("SwitchForceVolumeEnabledStatus");
     *        });
     *
     *        // 在客户端按数字键 2 来切换指向力/径向力区域
     *        InputUtil.onKeyDown(Keys.Two, ()=>{
     *            // 客户端通知服务器执行相应操作
     *            Event.dispatchToServer("SwitchForceVolumeType");
     *        });
     *
     *        // 在客户端按数字键 3 来切换指向力/径向力大小（正常大小与三倍大小）
     *        InputUtil.onKeyDown(Keys.Three, ()=>{
     *            // 客户端通知服务器执行相应操作
     *            Event.dispatchToServer("SwitchForceVolumeIntensity");
     *        });
     *
     *        // 在客户端按数字键 4 来切换稳定性系数（0与50）
     *        InputUtil.onKeyDown(Keys.Four, ()=>{
     *            // 客户端通知服务器执行相应操作
     *            Event.dispatchToServer("SwitchStability");
     *        });
     *    }
     *}
     * ```
     */
    class ForceVolume extends mw.GameObject {
        /**
         * @groups 玩法/物理
         * @description 进入物理力区域回调函数
         * @example
         * 使用示例:（回调使用）创建一个名为"FVOnEnterSample"的脚本，将脚本挂载到对象管理器中的力区域下，控制角色走进区域，你将会看到服务端和客户端的log输出，代码如下：
         * ```
         * @Component
         * export default class FVOnEnterSample extends Script {
         *
         *    // 当脚本被实例后，会在第一帧更新前调用此函数
         *    protected onStart(): void {
         *        let FV = this.gameObject as ForceVolume;
         *        FV.onEnter.add(()=>{
         *            console.log("Something entered ForceVolume");
         *        });
         *    }
         *}
         * ```
         */
        onEnter: mw.MulticastGameObjectDelegate;
        /**
         * @groups 玩法/物理
         * @description 离开物理力区域回调函数
         * @example
         * 使用示例:（回调使用）创建一个名为"FVOnLeaveSample"的脚本，将脚本挂载到对象管理器中的力区域下，控制角色走进再离开区域，你将会看到服务端和客户端的log输出，代码如下：
         * ```
         * @Component
         * export default class FVOnLeaveSample extends Script {
         *
         *    // 当脚本被实例后，会在第一帧更新前调用此函数
         *    protected onStart(): void {
         *        let FV = this.gameObject as ForceVolume;
         *        FV.onLeave.add(()=>{
         *            console.log("Something left ForceVolume");
         *        });
         *    }
         *}
         * ```
         */
        onLeave: mw.MulticastGameObjectDelegate;
        /**
         * @groups 玩法/物理
         * @description 设置是否启用物理力区域，禁用状态下，不会应用力到物体上
         * @effect 调用端自动广播
         * @param newEnabledStatus usage: 是否启用该物理区域，设置为 false 后依然会有碰撞事件，但不会应用力
         */
        set enabled(newEnabledStatus: boolean);
        /**
         * @groups 玩法/物理
         * @description 获取是否启用物理力区域
         * @effect 调用端生效
         * @returns 是否启用物理力区域
         */
        get enabled(): boolean;
        /**
         * @groups 玩法/物理
         * @description 设置物理力区域力的应用方式
         * @effect 调用端自动广播
         * @param newForceType usage: 力区域的类型
         */
        set forceType(newForceType: ForceType);
        /**
         * @groups 玩法/物理
         * @description 获取物理力区域力的应用方式
         * @effect 调用端生效
         * @returns 当前物理力区域的类型
         */
        get forceType(): ForceType;
        /**
         * @groups 玩法/物理
         * @description 设置物理力区域在指向类型时力的大小
         * @effect 调用端自动广播
         * @param newVector usage: 指向力向量
         */
        set directionalForce(newVector: mw.Vector);
        /**
         * @groups 玩法/物理
         * @description 获取物理力区域在指向类型时力的大小
         * @effect 调用端生效
         * @returns 当前指向力的向量
         */
        get directionalForce(): mw.Vector;
        /**
         * @groups 玩法/物理
         * @description 设置物理力区域在径向类型时力的大小
         * @effect 调用端自动广播
         * @param newIntensity usage: 径向力大小
         */
        set radialForce(newIntensity: number);
        /**
         * @groups 玩法/物理
         * @description 获取物理力区域在指向类型时力的大小
         * @effect 调用端生效
         * @returns 当前径向力的大小
         */
        get radialForce(): number;
        /**
         * @groups 玩法/物理
         * @description 设置物理力区域的稳定性系数
         * @effect 调用端自动广播
         * @param newFactor usage: 稳定性系数大小
         */
        set stability(newFactor: number);
        /**
         * @groups 玩法/物理
         * @description 获取物理力区域的稳定性系数
         * @effect 调用端生效
         * @returns 当前稳定性系数大小
         */
        get stability(): number;
    }
}

declare namespace mw {
    /**
     * @author jun.zhang
     * @description 冲量的应用方式
     * @groups 玩法/物理
     */
    enum ImpulseType {
        /** 绝对冲量，为冲量功能对象设定一个绝对方向的冲量值，
         * 当被施力对象与冲量功能对象发生碰撞时，将冲量力直接应用到被施力对象上。
         */
        Absolute = 0,
        /** 相对冲量，为冲量功能对象设定一个相对方向的冲量值，当被施力对象与冲量功能对象发生碰撞时，
         * 会将被施力对象的矢量值叠加到冲量对象上，计算一个新的冲量值应用到被施力对象上。
         */
        Relative = 1
    }
    /**
     * @author jun.zhang
     * @description 冲量力类型
     * @groups 玩法/物理
     */
    enum ImpulseForceType {
        /** 径向力
         * 碰撞体为球形，沿反射方向施加的力
        */
        RadialForce = 0,
        /** 矢量力
         * 碰撞体为盒形，沿给定方向施加的力
         */
        VectorForce = 1
    }
    /**
     * @groups 玩法/物理
     * @description 冲量
     * @description -------------------------
     * @description 冲量是一个瞬间爆发力，为对象提供单一且即时的电源，是一种将力集中在一帧上的感觉。
     * @description 冲量对象是如何工作的呢 ？
     * @description - 创建一个冲量对象。可手动将左侧栏中逻辑对象中的冲量拖入场景中，在属性面板中调整参数；也可以在脚本中动态创建冲量对象。
     * @description - 设置冲量对象属性 enable 为 true ，才可触发冲量效果。
     * @description - impulseVector 属性表示力的方向。
     * @description - impulseRadialForce 属性表示力的大小。
     * @networkStatus usage: 双端
     * @author jun.zhang
     * @example
     * 使用示例:创建一个名为"ImpulseSample"的脚本，放置在对象管理器中冲量对象的子级，将冲量对象相对缩放改为（5.00,5.00,0.50），放置在合适的位置，可以在与冲量对象重叠区域放置一个Cube，Cube大小缩放与冲量对象相同。打开脚本，输入以下代码保存，运行游戏，你将在场景中看到人物在Cube上蹦床的效果，代码如下：
     * （示例代码中impulseId = "1602E908"中的1602E908替换方式为右键冲量对象，复制对象ID。更换为你的冲量对象ID即可）
     * ```
     * @Component
     * export default class ImpulseSample extends Script {
     *     impulseId = "1602E908";
     *     // 当脚本被实例后，会在第一帧更新前调用此函数
     *     protected async onStart(): Promise<void> {
     *         const impulse = (await GameObject.findGameObjectById(this.impulseId)) as Impulse;
     *         // 先设置为 false，玩家进入范围后再设置为 true，会有玩家突然凭空被弹开的效果
     *         impulse.enable = true;
     *         // 绝对冲量应用时会先清空物体自身速度，相对冲量会将冲量和物体当前速度叠加
     *         impulse.impulseType = ImpulseType.Absolute;
     *         // 只有为矢量力的情况下，impulseVector 属性才有意义
     *         impulse.impulseForceType = ImpulseForceType.VectorForce;
     *         // 设置为自定义的带方向的冲量值
     *         impulse.impulseVector = new Vector(0, 0, 2000);
     *         impulse.onImpulseEnter.add(()=>{
     *              console.log("Impulse onImpulseEnter")
     *         })
     *     }
     * }
     * ```
     */
    class Impulse extends mw.GameObject {
        /**
         * @groups 玩法/物理
         * @description 发生冲量碰撞后的回调函数
         * @example
         * 使用示例:创建一个名为"ImpulseOnEnterSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到一个蹦床的效果，代码如下：
         * ```
         * @Component
         * export default class ImpulseOnEnterSample extends Script {
         *     impulseId = "1602E908";
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         const impulse = (await GameObject.findGameObjectById(this.impulseId)) as Impulse;
         *         impulse.onImpulseEnter.add(()=>{
         *              console.log("Impulse onImpulseEnter")
         *         })
         *     }
         * }
         * ```
         */
        onImpulseEnter: mw.MulticastGameObjectDelegate;
        /**
         * @groups 玩法/物理
         * @description 设置是否启用冲量，禁用状态下，不会应用冲量到物体上
         * @effect 调用端自动广播
         * @param impulseEnabled usage: 是否启用冲量的应用，设置为 false 后依然会有碰撞事件，但不会应用冲量
         * @example
         * 使用示例:创建一个名为"ImpulseSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到一个蹦床的效果，代码如下：
         * ```
         * @Component
         * export default class ImpulseSample extends Script {
         *     impulseId = "1602E908";
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         const impulse = (await GameObject.findGameObjectById(this.impulseId)) as Impulse;
         *         // 先设置为 false，玩家进入范围后再设置为 true，会有玩家突然凭空被弹开的效果
         *         impulse.enable = true;
         *     }
         * }
         * ```
         */
        set enable(impulseEnabled: boolean);
        /**
         * @groups 玩法/物理
         * @description 获取是否启用冲量
         * @effect 调用端生效
         * @returns 是否启用冲量
         */
        get enable(): boolean;
        /**
         * @groups 玩法/物理
         * @description 设置冲量应用方式
         * @precautions 在编辑器中使用会自动更新箭头方向
         * @effect 调用端自动广播
         * @param impulseType usage: 冲量应用方式
         * @example
         * 使用示例:创建一个名为"ImpulseTypeSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到一个蹦床的效果，玩家走到蹦床上被弹起的高度有变化，代码如下：
         * ```ts
         * @Component
         * export default class ImpulseTypeSample extends Script {
         *     // 场景中冲量对象的 id
         *     impulseId = "1602E908";
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         const impulse = (await GameObject.findGameObjectById(this.impulseId)) as Impulse;
         *         // 绝对冲量应用时会先清空物体自身速度，相对冲量会将冲量和物体当前速度叠加
         *         impulse.impulseType = ImpulseType.Absolute;
         *     }
         * }
         * ```
         */
        set impulseType(impulseType: ImpulseType);
        /**
         * @groups 玩法/物理
         * @description 获取冲量应用方式，绝对或相对
         * @effect 调用端生效
         * @returns 当前冲量应用方式
         */
        get impulseType(): ImpulseType;
        /**
         * @groups 玩法/物理
         * @description 设置矢量力的冲量向量
         * @effect 调用端自动广播
         * @param vec usage: 冲量力向量
         * @example
         * 使用示例:创建一个名为"ImpulseVectorSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到一个蹦床的效果，玩家走到蹦床上被弹起的高度有变化，代码如下：
         * ```
         * @Component
         * export default class ImpulseVectorSample extends Script {
         *     // 场景中冲量对象的 id
         *     impulseId = "1602E908";
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         const impulse = (await GameObject.findGameObjectById(this.impulseId)) as Impulse;
         *         // 只有为矢量力的情况下，impulseVector 属性才有意义
         *         impulse.impulseForceType = ImpulseForceType.VectorForce;
         *         // 设置为自定义的带方向的冲量值
         *         impulse.impulseVector = new Vector(0, 0, 2000);
         *     }
         * }
         * ```
         */
        set impulseVector(vec: mw.Vector);
        /**
         * @groups 玩法/物理
         * @description 获取矢量力的冲量向量
         * @effect 调用端生效
         * @returns 当前冲量类型
         */
        get impulseVector(): mw.Vector;
        /**
         * @groups 玩法/物理
         * @description 设置径向力的冲量值
         * @effect 调用端自动广播
         * @param vec usage: 径向力时的冲量值
         * @example
         * 使用示例:创建一个名为"ImpulseRadialForceSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到一个蹦床的效果，玩家走到蹦床上被飞的距离相比默认情况时有变化，代码如下：
         * ```
         * @Component
         * export default class ImpulseRadialForceSample extends Script {
         *     // 场景中冲量对象的 id
         *     impulseId = "1602E908";
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         const impulse = (await GameObject.findGameObjectById(this.impulseId)) as Impulse;
         *         // 只有为径向力的情况下，impulseRadialForce 属性才有意义
         *         impulse.impulseForceType = ImpulseForceType.RadialForce;
         *         impulse.impulseRadialForce = 500;
         *     }
         * }
         * ```
         */
        set impulseRadialForce(value: number);
        /**
         * @groups 玩法/物理
         * @description 获取径向力的冲量值
         * @effect 调用端生效
         * @returns 径向力时的冲量值
         */
        get impulseRadialForce(): number;
        /**
         * @groups 玩法/物理
         * @description 设置冲量力类型。使用示例详见属性 impulseRadialForce 和 impulseVector 中示例代码。
         * @effect 调用端自动广播
         * @param impulseCollisionType usage: 冲量力类型
         */
        set impulseForceType(impulseCollisionType: ImpulseForceType);
        /**
         * @groups 玩法/物理
         * @description 获取当前冲量力类型
         * @effect 调用端生效
         * @returns 冲量力类型
         */
        get impulseForceType(): ImpulseForceType;
    }
}

declare namespace mw {
    /**
     * @author xinlei.nie
     * @description 运动坐标系
     * @groups 玩法/物理
     */
    enum MotionAxis {
        /** 世界坐标系 */
        WorldAxis = 0,
        /** 本地坐标系 */
        LocalAxis = 1
    }
    /**
     * @author xinlei.nie
     * @description 运动模式
     * @groups 玩法/物理
     */
    enum MotionMode {
        /** 轴心模式 */
        RootBased = 0,
        /** 质心模式 */
        CentroidBased = 1
    }
    /**
     * @author hao.huang
     * @groups 玩法/物理
     * @description 运动器组件
     * @networkStatus usage:双端
     * @example
     * 使用示例:创建一个名为"IMExample1"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到两个长方体，分别以开启和不开启平滑运动的方式做重复线性运动。代码如下：
     * ```
     * @Component
     * export default class IMExample1 extends Script {
     *
     *     // 声明变量
     *     Obj1;
     *     Obj2;
     *     IM1;
     *     IM2;
     *
     *     // 当脚本被实例后，会在第一帧更新前调用此函数
     *     protected async onStart(): Promise<void> {
     *       if (SystemUtil.isClient()) {
     *           // 创建一个长方体
     *           this.Obj1 = await GameObject.asyncSpawn("197386") as GameObject;
     *           // 设置起始位置
     *           this.Obj1.worldTransform.position = new Vector(300.0, -100.0, 300.0);
     *           // 设置起始缩放
     *           this.Obj1.worldTransform.scale = new Vector(0.5, 2.0, 0.5);
     *
     *           // 创建一个运动器，并将运动器挂载到长方体上
     *           this.IM1 = await GameObject.asyncSpawn("PhysicsSports") as IntegratedMover;
     *           this.IM1.attachToGameObject(this.Obj1);
     *
     *           // 测试启用状态
     *           console.log("Enable status: " + this.IM1.enable);
     *           this.IM1.enable = true;
     *           console.log("New enable status: " + this.IM1.enable);
     *
     *           // 添加一个线性运动
     *           this.IM1.linearSpeed = new Vector(0.0, 100.0, 0.0);
     *           this.IM1.linearRepeat = true;
     *           this.IM1.linearRepeatTime = 2.0;
     *           this.IM1.linearRepeatDelay = 0.0;
     *           this.IM1.linearReturnDelay = 0.0;
     *
     *           // 用同样的方式创建第二个长方体与第二个运动器
     *           this.Obj2 = await GameObject.asyncSpawn("197386") as GameObject;
     *           this.Obj2.worldTransform.position = new Vector(300.0, -100.0, 150.0);
     *           this.Obj2.worldTransform.scale = new Vector(0.5, 2.0, 0.5);
     *           this.IM2 = await GameObject.asyncSpawn("PhysicsSports") as IntegratedMover;
     *           this.IM2.attachToGameObject(this.Obj2);
     *           this.IM2.enable = true;
     *
     *           // 给第二个运动器开启平滑运动
     *           console.log("Smooth status: " + this.IM2.smooth);
     *           this.IM2.smooth = true;
     *           console.log("New smooth status: " + this.IM2.smooth);
     *
     *           // 添加一个同样的线性运动
     *           this.IM2.linearSpeed = new Vector(0.0, 100.0, 0.0);
     *           this.IM2.linearRepeat = true;
     *           this.IM2.linearRepeatTime = 2.0;
     *           this.IM2.linearRepeatDelay = 0.0;
     *           this.IM2.linearReturnDelay = 0.0;
     *       }
     *   }
     * }
     * ```
     */
    class IntegratedMover extends mw.GameObject {
        /**
         * @groups 玩法/物理
         * @description 平移运动首次延迟启动时回调，延迟启动时间为0时表现不启用，无法获得回调事件
         */
        onLinearEnable: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/物理
         * @description 平移运动到达终点停顿时回调，到达后停顿时间为0时表现不启用，无法获得回调事件
         */
        onLinearReturn: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/物理
         * @description 平移运动返回起点停顿时回调，到返程后停顿时间为0时表现不启用，无法获得回调事件
         */
        onLinearStart: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/物理
         * @description 旋转运动首次延迟启动时回调，延迟启动时间为0时表现不启用，无法获得回调事件
         */
        onRotationEnable: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/物理
         * @description 旋转运动到达终点停顿时回调，到达后停顿时间为0时表现不启用，无法获得回调事件
         */
        onRotationReturn: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/物理
         * @description 旋转运动返回起点停顿时回调，到返程后停顿时间为0时表现不启用，无法获得回调事件
         */
        onRotationStart: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/物理
         * @description 缩放运动首次延迟启动时回调，延迟启动时间为0时表现不启用，无法获得回调事件
         */
        onScaleEnable: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/物理
         * @description 缩放运动到达终点停顿时回调，到达后停顿时间为0时表现不启用，无法获得回调事件
         */
        onScaleReturn: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/物理
         * @description 缩放运动返回起点停顿时回调，到返程后停顿时间为0时表现不启用，无法获得回调事件
         */
        onScaleStart: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/物理
         * @description 摆动：延迟启动回调
         */
        onSwingEnable: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/物理
         * @description 获取运动模式
         * @effect 调用端生效
         * @returns 运动器运动模式
         */
        get motionMode(): MotionMode;
        /**
         * @groups 玩法/物理
         * @description 设置运动模式
         * @effect 调用端生效
         * @param mode usage:运动器运动模式
         */
        set motionMode(mode: MotionMode);
        /**
         * @groups 玩法/物理
         * @description 获取启用状态
         * @effect 调用端生效
         * @returns 启用状态
         */
        get enable(): boolean;
        /**
         * @groups 玩法/物理
         * @description 设置启用状态
         * @effect 调用端生效
         * @param newEnable usage:启用状态
         */
        set enable(newEnable: boolean);
        /**
         * @groups 玩法/物理
         * @description 获取平滑状态
         * @effect 调用端生效
         * @returns 平滑状态
         */
        get smooth(): boolean;
        /**
         * @groups 玩法/物理
         * @description 设置平滑状态，启用后运动速度会由慢逐渐加快，直到最大值
         * @effect 调用端生效
         * @param newSmooth usage:平滑状态
         */
        set smooth(newSmooth: boolean);
        /**
         * @groups 玩法/物理
         * @description 获取运动坐标系
         * @effect 调用端生效
         * @returns 运动坐标系
         */
        get motionCoordinate(): MotionAxis;
        /**
         * @groups 玩法/物理
         * @description 设置运动坐标系
         * @effect 调用端生效
         * @param newMotionCoordinate usage:运动坐标系
         */
        set motionCoordinate(newMotionCoordinate: MotionAxis);
        /**
         * @groups 玩法/物理
         * @description 将运动器状态重置，运动对象同时回到初始位置
         * @effect 调用端生效
         * @param OnReset usage:执行回调 default:null
         */
        moverReset(OnReset?: () => void): void;
        set parent(newParent: mw.GameObject);
        get parent(): mw.GameObject;
        /**
         * @groups 玩法/物理
         * @description 获取平移速度大小
         * @effect 调用端生效
         * @returns 平移速度大小
         * @example
         * 使用示例:创建一个名为"IMExample2"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到两个长方体，分别演示有无延迟启动的非重复线性运动，以及有无起点终点停顿的重复线性运动。代码如下：
         * ```
         * @Component
         * export default class IMExample2 extends Script {
         *
         *     // 声明变量
         *     Obj1;
         *     Obj2;
         *     IM1;
         *     IM2;
         *
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             // 创建长方体1和长方体2
         *             this.Obj1 = await GameObject.asyncSpawn( "197386") as GameObject;
         *             this.Obj2 = await GameObject.asyncSpawn("197386") as GameObject;
         *             // 设置起始位置
         *             this.Obj1.worldTransform.position = new Vector(300.0, 0.0, 300.0);
         *             this.Obj2.worldTransform.position = new Vector(300.0, 0.0, 150.0);
         *             // 设置起始缩放
         *             this.Obj1.worldTransform.scale = new Vector(0.5, 2.0, 0.5);
         *             this.Obj2.worldTransform.scale = new Vector(0.5, 2.0, 0.5);
         *
         *             // 创建运动器1和运动器2，并将运动器挂载到对应长方体上
         *             this.IM1 = await GameObject.asyncSpawn("PhysicsSports") as IntegratedMover;
         *             this.IM1.attachToGameObject(this.Obj1);
         *             this.IM1.enable = true;
         *
         *             this.IM2 = await GameObject.asyncSpawn("PhysicsSports") as IntegratedMover;
         *             this.IM2.attachToGameObject(this.Obj2);
         *             this.IM2.enable = true;
         *
         *             // 运动器1和2都设置同样的运动速度，运动器2设置延迟五秒启动
         *             this.IM1.linearSpeed = new Vector(0.0, 100.0, 0.0);
         *             this.IM1.linearRepeat = false;
         *             this.IM1.linearDelayStartTime = 0.0;
         *
         *             this.IM2.linearSpeed = new Vector(0.0, 100.0, 0.0);
         *             this.IM2.linearRepeat = false;
         *             this.IM2.linearDelayStartTime = 5.0;
         *             // 运动器2绑定延迟启动回调
         *             this.IM2.onLinearEnable.add(() => {
         *                 console.log("IM2 enabled with a delay");
         *             })
         *
         *             // 等待十秒后，将长方体1和2归位，重新设置运动器1和2，让它们变成重复运动模式，且运动器2在起点和终点设置两秒延迟
         *             setTimeout(() => {
         *                 this.IM1.moverReset();
         *                 this.IM2.moverReset();
         *
         *                 this.IM1.linearRepeat = true;
         *                 this.IM1.linearRepeatTime = 2.0;
         *                 this.IM1.linearDelayStartTime = 0.0;
         *                 this.IM1.linearRepeatDelay = 0.0;
         *                 this.IM1.linearReturnDelay = 0.0;
         *
         *                 this.IM2.linearRepeat = true;
         *                 this.IM2.linearRepeatTime = 2.0;
         *                 this.IM2.linearDelayStartTime = 0.0;
         *                 this.IM2.linearRepeatDelay = 2.0;
         *                 // 运动器2绑定终点停顿回调
         *                 this.IM2.onLinearReturn.add(() => {
         *                     console.log("IM2 paused at end point");
         *                 })
         *                 this.IM2.linearReturnDelay = 2.0;
         *                 // 运动器2绑定终点停顿回调
         *                 this.IM2.onLinearStart.add(() => {
         *                     console.log("IM2 paused at start point");
         *                 })
         *             }, 10000);
         *         }
         *     }
         *
         *     //
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
         */
        get linearSpeed(): mw.Vector;
        /**
         * @groups 玩法/物理
         * @description 设置平移速度大小
         * @effect 调用端生效
         * @param newSpeed usage:平移速度大小
         */
        set linearSpeed(newSpeed: mw.Vector);
        /**
         * @groups 玩法/物理
         * @description 获取延时启动平移运行时间
         * @effect 调用端生效
         * @return 延时启动时间
         */
        get linearDelayStartTime(): number;
        /**
         * @groups 玩法/物理
         * @description 设置延时启动平移运动时间
         * @effect 调用端生效
         * @param newDelay usage:延时启动时间
         */
        set linearDelayStartTime(newDelay: number);
        /**
         * @groups 玩法/物理
         * @description 获取平移重复运动状态
         * @effect 调用端生效
         * @returns 平移重复运动状态
         */
        get linearRepeat(): boolean;
        /**
         * @groups 玩法/物理
         * @description 设置平移重复运动状态
         * @effect 调用端生效
         * @param newRepeat usage:平移重复运动状态
         */
        set linearRepeat(newRepeat: boolean);
        /**
         * @groups 玩法/物理
         * @description 获取平移单程运动时间
         * @effect 调用端生效
         * @returns 平移单程运动时间
         */
        get linearRepeatTime(): number;
        /**
         * @groups 玩法/物理
         * @description 设置平移单程运动时间，该属性需要重复运动状态为true时才会生效
         * @effect 调用端生效
         * @param newTime usage:平移单程运动时间
         */
        set linearRepeatTime(newTime: number);
        /**
         * @groups 玩法/物理
         * @description 获取平移到达后停顿时间
         * @effect 调用端生效
         * @returns 平移到达后停顿时间
         */
        get linearRepeatDelay(): number;
        /**
         * @groups 玩法/物理
         * @description 设置平移到达后停顿时间，该属性需要重复运动状态为true时才会生效
         * @effect 调用端生效
         * @param newDelay usage:平移到达后停顿时间
         */
        set linearRepeatDelay(newDelay: number);
        /**
         * @groups 玩法/物理
         * @description 获取平移返程后停顿时间
         * @effect 调用端生效
         * @returns 平移返程后停顿时间
         */
        get linearReturnDelay(): number;
        /**
         * @groups 玩法/物理
         * @description 设置平移返程后停顿时间，该属性需要重复运动状态为true时才会生效
         * @effect 调用端生效
         * @returns 平移返程后停顿时间
         */
        set linearReturnDelay(newDelay: number);
        /**
         * @groups 玩法/物理
         * @description 获取旋转速度大小
         * @effect 调用端生效
         * @returns 旋转速度大小
         * @example
         * 使用示例:创建一个名为"IMExample3"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到两个长方体，分别演示有无延迟启动的非重复旋转，以及有无起点终点停顿的重复旋转。代码如下：
         * ```
         * @Component
         * export default class IMExample3 extends mw.Script {
         *
         *     // 声明变量
         *     Obj1;
         *     Obj2;
         *     IM1;
         *     IM2;
         *
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (Util.SystemUtil.isClient()) {
         *             // 创建长方体1和长方体2
         *             this.Obj1 = await mw.GameObject.asyncSpawn("197386") as mw.GameObject;
         *             this.Obj2 = await mw.GameObject.asyncSpawn("197386") as mw.GameObject;
         *             // 设置起始位置
         *             this.Obj1.worldTransform.position = new mw.Vector(300.0, 200.0, 200.0);
         *             this.Obj2.worldTransform.position = new mw.Vector(300.0, -200.0, 200.0);
         *             // 设置起始缩放
         *             this.Obj1.worldTransform.scale = new mw.Vector(0.5, 2.0, 0.5);
         *             this.Obj2.worldTransform.scale = new mw.Vector(0.5, 2.0, 0.5);
         *
         *             // 创建运动器1和运动器2，并将运动器挂载到对应长方体上
         *             this.IM1 = await mw.GameObject.asyncSpawn("PhysicsSports") as mw.IntegratedMover;
         *             this.IM1.attachToGameObject(this.Obj1);
         *             this.IM1.enable = true;
         *
         *             this.IM2 = await mw.GameObject.asyncSpawn("PhysicsSports") as mw.IntegratedMover;
         *             this.IM2.attachToGameObject(this.Obj2);
         *             this.IM2.enable = true;
         *
         *             // 运动器1和2都设置同样的旋转速度，运动器2设置延迟五秒启动
         *             this.IM1.rotationSpeed = new mw.Vector(90.0, 0.0, 0.0);
         *             this.IM1.rotationRepeat = false;
         *             this.IM1.rotationDelayStartTime = 0.0;
         *
         *             this.IM2.rotationSpeed = new mw.Vector(90.0, 0.0, 0.0);
         *             this.IM2.rotationRepeat = false;
         *             this.IM2.rotationDelayStartTime = 5.0;
         *             // 运动器2绑定延迟启动回调
         *             this.IM2.onRotationEnable.add(() => {
         *                 console.log("IM2 enabled with a delay");
         *             })
         *
         *             // 等待十秒后，将长方体1和2归位，重新设置运动器1和2，让它们变成重复运动模式，且运动器2在起点和终点设置两秒延迟
         *             setTimeout(() => {
         *                 this.IM1.moverReset();
         *                 this.IM2.moverReset();
         *
         *                 this.IM1.rotationRepeat = true;
         *                 this.IM1.rotationRepeatTime = 2.0;
         *                 this.IM1.rotationDelayStartTime = 0.0;
         *                 this.IM1.rotationRepeatDelay = 0.0;
         *                 this.IM1.rotationReturnDelay = 0.0;
         *
         *                 this.IM2.rotationRepeat = true;
         *                 this.IM2.rotationRepeatTime = 2.0;
         *                 this.IM2.rotationDelayStartTime = 0.0;
         *                 this.IM2.rotationRepeatDelay = 2.0;
         *                 // 运动器2绑定终点停顿回调
         *                 this.IM2.onRotationReturn.add(() => {
         *                     console.log("IM2 paused at end point");
         *                 })
         *                 this.IM2.rotationReturnDelay = 2.0;
         *                 // 运动器2绑定终点停顿回调
         *                 this.IM2.onRotationStart.add(() => {
         *                     console.log("IM2 paused at start point");
         *                 })
         *             }, 10000);
         *         }
         *     }
         *
         *     //
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
         */
        get rotationSpeed(): mw.Vector;
        /**
         * @groups 玩法/物理
         * @description 设置旋转速度大小
         * @effect 调用端生效
         * @param newSpeed usage:旋转速度大小
         */
        set rotationSpeed(newSpeed: mw.Vector);
        /**
         * @groups 玩法/物理
         * @description 获取延时启动旋转运行时间
         * @effect 调用端生效
         * @return 延时启动时间
         */
        get rotationDelayStartTime(): number;
        /**
         * @groups 玩法/物理
         * @description 设置延时启动旋转运动时间
         * @effect 调用端生效
         * @param newDelay usage:延时启动时间
         */
        set rotationDelayStartTime(newDelay: number);
        /**
         * @groups 玩法/物理
         * @description 获取旋转重复运动状态
         * @effect 调用端生效
         * @returns 旋转重复运动状态
         */
        get rotationRepeat(): boolean;
        /**
         * @groups 玩法/物理
         * @description 设置旋转重复运动状态
         * @effect 调用端生效
         * @param newRepeat usage:旋转重复运动状态
         */
        set rotationRepeat(newRepeat: boolean);
        /**
         * @groups 玩法/物理
         * @description 获取旋转单程运动时间
         * @effect 调用端生效
         * @returns 旋转单程运动时间
         */
        get rotationRepeatTime(): number;
        /**
         * @groups 玩法/物理
         * @description 设置旋转单程运动时间
         * @description 该属性需要重复运动状态为 true 时才会生效。
         * @effect 调用端生效
         * @param newTime usage: 旋转单程运动时间。range: (0, +∞)  type:浮点数
         */
        set rotationRepeatTime(newTime: number);
        /**
         * @groups 玩法/物理
         * @description 获取旋转到达后停顿时间
         * @effect 调用端生效
         * @returns 旋转到达后停顿时间
         */
        get rotationRepeatDelay(): number;
        /**
         * @groups 玩法/物理
         * @description 设置旋转到达后停顿时间
         * @description 该属性需要重复运动状态为 true 时才会生效
         * @effect 调用端生效
         * @param newDelay usage: 旋转到达后停顿时间 range: (0, +∞)  type:浮点数
         */
        set rotationRepeatDelay(newDelay: number);
        /**
         * @groups 玩法/物理
         * @description 获取旋转返程后停顿时间
         * @effect 调用端生效
         * @returns 返程后停顿时间
         */
        get rotationReturnDelay(): number;
        /**
         * @groups 玩法/物理
         * @description 设置旋转返程后停顿时间，该属性需要重复运动状态为true时才会生效
         * @effect 调用端生效
         * @param newDelay  usage:返程后停顿时间 range: (0, +∞)  type:浮点数
         */
        set rotationReturnDelay(newDelay: number);
        /**
         * @groups 玩法/物理
         * @description 获取缩放速度大小
         * @effect 调用端生效
         * @returns 缩放速度大小
         * @example
         * 使用示例:创建一个名为"IMExample4"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到两个正方体，分别演示有无延迟启动的非重复缩放，以及有无起点终点停顿的重复缩放。代码如下：
         * ```
         * @Component
         * export default class IMExample4 extends mw.Script {
         *
         *     // 声明变量
         *     Obj1;
         *     Obj2;
         *     IM1;
         *     IM2;
         *
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (Util.SystemUtil.isClient()) {
         *             // 创建长方体1和长方体2
         *             this.Obj1 = await mw.GameObject.asyncSpawn("197386") as mw.GameObject;
         *             this.Obj2 = await mw.GameObject.asyncSpawn("197386") as mw.GameObject;
         *             // 设置起始位置
         *             this.Obj1.worldTransform.position = new mw.Vector(300.0, 200.0, 200.0);
         *             this.Obj2.worldTransform.position = new mw.Vector(300.0, -200.0, 200.0);
         *             // 设置起始缩放
         *             this.Obj1.worldTransform.scale = new mw.Vector(1.0, 1.0, 1.0);
         *             this.Obj2.worldTransform.scale = new mw.Vector(1.0, 1.0, 1.0);
         *
         *             // 创建运动器1和运动器2，并将运动器挂载到对应长方体上
         *             this.IM1 = await mw.GameObject.asyncSpawn("PhysicsSports") as mw.IntegratedMover;
         *             this.IM1.attachToGameObject(this.Obj1);
         *             this.IM1.enable = true;
         *
         *             this.IM2 = await mw.GameObject.asyncSpawn("PhysicsSports") as mw.IntegratedMover;
         *             this.IM2.attachToGameObject(this.Obj2);
         *             this.IM2.enable = true;
         *
         *             // 运动器1和2都设置同样的缩放速度，运动器2设置延迟五秒启动
         *             this.IM1.scaleSpeed = new mw.Vector(-0.1, -0.1, -0.1);
         *             this.IM1.scaleRepeat = false;
         *             this.IM1.scaleDelayStartTime = 0.0;
         *
         *             this.IM2.scaleSpeed = new mw.Vector(-0.1, -0.1, -0.1);
         *             this.IM2.scaleRepeat = false;
         *             this.IM2.scaleDelayStartTime = 5.0;
         *             // 运动器2绑定延迟启动回调
         *             this.IM2.onScaleEnable.add(() => {
         *                 console.log("IM2 enabled with a delay");
         *             })
         *
         *             // 等待十秒后，将长方体1和2归位，重新设置运动器1和2，让它们变成重复运动模式，且运动器2在起点和终点设置两秒延迟
         *             setTimeout(() => {
         *                 this.IM1.moverReset();
         *                 this.IM2.moverReset();
         *
         *                 this.IM1.scaleRepeat = true;
         *                 this.IM1.scaleRepeatTime = 2.0;
         *                 this.IM1.scaleDelayStartTime = 0.0;
         *                 this.IM1.scaleRepeatDelay = 0.0;
         *                 this.IM1.scaleReturnDelay = 0.0;
         *
         *                 this.IM2.scaleRepeat = true;
         *                 this.IM2.scaleRepeatTime = 2.0;
         *                 this.IM2.scaleDelayStartTime = 0.0;
         *                 this.IM2.scaleRepeatDelay = 2.0;
         *                 // 运动器2绑定终点停顿回调
         *                 this.IM2.onScaleReturn.add(() => {
         *                     console.log("IM2 paused at end point");
         *                 })
         *                 this.IM2.scaleReturnDelay = 2.0;
         *                 // 运动器2绑定终点停顿回调
         *                 this.IM2.onScaleStart.add(() => {
         *                     console.log("IM2 paused at start point");
         *                 })
         *             }, 10000);
         *         }
         *     }
         *
         *     //
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
         */
        get scaleSpeed(): mw.Vector;
        /**
         * @groups 玩法/物理
         * @description 设置缩放速度大小
         * @effect 调用端生效
         * @param newSpeed usage: 缩放速度大小
         */
        set scaleSpeed(newSpeed: mw.Vector);
        /**
         * @groups 玩法/物理
         * @description 获取延时启动缩放运行时间
         * @effect 调用端生效
         * @return 延时启动时间
         */
        get scaleDelayStartTime(): number;
        /**
         * @groups 玩法/物理
         * @description 设置延时启动缩放运动时间
         * @effect 调用端生效
         * @param newDelay usage:延时启动时间 range: (0, +∞)  type:浮点数
         */
        set scaleDelayStartTime(newDelay: number);
        /**
         * @groups 玩法/物理
         * @description 获取缩放重复运动状态
         * @effect 调用端生效
         * @returns 重复运动状态
         */
        get scaleRepeat(): boolean;
        /**
         * @groups 玩法/物理
         * @description 设置缩放重复运动状态
         * @effect 调用端生效
         * @param newRepeat usage:重复运动状态
         */
        set scaleRepeat(newRepeat: boolean);
        /**
         * @groups 玩法/物理
         * @description 获取缩放单程运动时间
         * @effect 调用端生效
         * @returns 单程运动时间
         */
        get scaleRepeatTime(): number;
        /**
         * @groups 玩法/物理
         * @description 设置缩放单程运动时间，该属性需要重复运动状态为true时才会生效
         * @effect 调用端生效
         * @param newTime usage:单程运动时间 range: (0, +∞)  type:浮点数
         */
        set scaleRepeatTime(newTime: number);
        /**
         * @groups 玩法/物理
         * @description 获取缩放到达后停顿时间
         * @effect 调用端生效
         * @returns 到达后停顿时间
         */
        get scaleRepeatDelay(): number;
        /**
         * @groups 玩法/物理
         * @description 设置缩放到达后停顿时间，该属性需要重复运动状态为true时才会生效
         * @effect 调用端生效
         * @param newDelay usage:到达后停顿时间 range: (0, +∞)  type:浮点数
         */
        set scaleRepeatDelay(newDelay: number);
        /**
         * @groups 玩法/物理
         * @description 获取缩放返程后停顿时间
         * @effect 调用端生效
         * @returns 返程后停顿时间
         */
        get scaleReturnDelay(): number;
        /**
         * @groups 玩法/物理
         * @description 设置缩放返程后停顿时间，该属性需要重复运动状态为true时才会生效
         * @effect 调用端生效
         * @param newDelay usage:返程后停顿时间 range: (0, +∞)  type:浮点数
         */
        set scaleReturnDelay(newDelay: number);
        /**
         * @groups 玩法/物理
         * @description 获取摆动运动速度
         * @effect 调用端生效
         * @returns 摆动运动速度
         * @example
         * 使用示例:创建一个名为"IMExample5"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到两个长方体，分别演示有无延迟启动的单摆运动。代码如下：
         * ```
         * @Component
         * export default class IMExample5 extends mw.Script {
         *
         *     // 声明变量
         *     Obj1;
         *     Obj2;
         *     IM1;
         *     IM2;
         *
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected async onStart(): Promise<void> {
         *         if (Util.SystemUtil.isClient()) {
         *             // 创建长方体1和长方体2
         *             this.Obj1 = await mw.GameObject.asyncSpawn("197386") as mw.GameObject;
         *             this.Obj2 = await mw.GameObject.asyncSpawn("197386") as mw.GameObject;
         *             // 设置起始位置
         *             this.Obj1.worldTransform.position = new mw.Vector(300.0, 200.0, 200.0);
         *             this.Obj2.worldTransform.position = new mw.Vector(300.0, -200.0, 200.0);
         *             // 设置起始缩放
         *             this.Obj1.worldTransform.scale = new mw.Vector(0.5, 2.0, 0.5);
         *             this.Obj2.worldTransform.scale = new mw.Vector(0.5, 2.0, 0.5);
         *
         *             // 创建运动器1和运动器2，并将运动器挂载到对应长方体上
         *             this.IM1 = await mw.GameObject.asyncSpawn("PhysicsSports") as mw.IntegratedMover;
         *             this.IM1.attachToGameObject(this.Obj1);
         *             this.IM1.enable = true;
         *
         *             this.IM2 = await mw.GameObject.asyncSpawn("PhysicsSports") as mw.IntegratedMover;
         *             this.IM2.attachToGameObject(this.Obj2);
         *             this.IM2.enable = true;
         *
         *             // 运动器1和2都设置同样的单摆速度和角度，运动器2设置延迟五秒启动
         *             this.IM1.swingSpeed = new mw.Vector(1.0, 0.0, 0.0);
         *             this.IM1.swingAngle = 90.0;
         *             this.IM1.swingDelayStartTime = 0.0;
         *
         *             this.IM2.swingSpeed = new mw.Vector(1.0, 0.0, 0.0);
         *             this.IM2.swingAngle = 90.0;
         *             this.IM2.swingDelayStartTime = 5.0;
         *             // 运动器2绑定延迟启动回调
         *             this.IM2.onSwingEnable.add(() => {
         *                 console.log("IM2 enabled with a delay");
         *             })
         *         }
         *     }
         *
         *     //
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
         */
        get swingSpeed(): mw.Vector;
        /**
         * @groups 玩法/物理
         * @description 设置摆动运动速度
         * @effect 调用端生效
         * @param newSpeed usage:摆动运动速度
         */
        set swingSpeed(newSpeed: mw.Vector);
        /**
         * @groups 玩法/物理
         * @description 获取延时启动摆动运行时间
         * @effect 调用端生效
         * @return 延时启动时间
         */
        get swingDelayStartTime(): number;
        /**
         * @groups 玩法/物理
         * @description 设置延时启动摆动运动时间
         * @effect 调用端生效
         * @param newDelay usage:延时启动时间 range: (0, +∞)  type:浮点数
         */
        set swingDelayStartTime(newDelay: number);
        /**
         * @groups 玩法/物理
         * @description 获取摆动最大角度
         * @effect 调用端生效
         * @returns 摆动最大角度
         */
        get swingAngle(): number;
        /**
         * @groups 玩法/物理
         * @description 设置摆动最大角度
         * @effect 调用端生效
         * @param newAngle usage:摆动最大角度 range: (0, +∞)  type:浮点数
         */
        set swingAngle(newAngle: number);
    }
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @groups 玩法/物理
     * @description 推进器
     * @networkStatus usage:双端
     * @precautions 服务器设置，双端自动同步
     * @example
     * 使用示例:创建一个名为"Example"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，保存游戏，并按下键盘'1'键，你将在场景中看到已放置好的物体被推进器推动效果(注意只有开启物理模拟的物体可以被推进器推动)
     * ```
     * @Component
     * export default class NewScript extends Script {
     *     protected onStart(): void {
     *         if (SystemUtil.isServer()) return;
     *         InputUtil.onKeyDown(Keys.One, ()=>{
     *             this.serverThruster();
     *         })
     *     }
     *
     *     @mw.RemoteFunction(mw.Server)
     *     async serverThruster() {
     *         console.log("Create Thruster Success");
     *         let box = GameObject.findGameObjectById("物体ID") as Model;
     *         let thruster = await GameObject.asyncSpawn("PhysicsThruster") as mw.PhysicsThruster;
     *         thruster.parent = box;
     *         thruster.strength = 1000000;
     *         thruster.enable = true;
     *     }
     * }
     * ```
     */
    class PhysicsThruster extends mw.GameObject {
        /**
         * @groups 玩法/物理
         * @description 获取启用状态
         * @effect 调用端生效
         * @returns 启用状态
         */
        get enable(): boolean;
        /**
         * @groups 玩法/物理
         * @description 设置启用状态
         * @effect 调用端生效
         * @param enable usage:布尔值
         */
        set enable(enable: boolean);
        /**
         * @groups 玩法/物理
         * @description 获取推进力
         * @effect 调用端生效
         * @returns 推进力大小
         */
        get strength(): number;
        /**
         * @groups 玩法/物理
         * @description 设置推进力
         * @effect 调用端生效
         * @param value usage:推进力大小
         */
        set strength(value: number);
    }
}

declare namespace mw {
    /**
     * @description 投掷物发射器专用实例对象
     * @author jun.zhang
     * @groups 玩法/发射器
     * @networkStatus usage: 双端
     */
    class ProjectileInst extends mw.GameObject {
        /**
         * @description 发射的玩家
         * @groups 玩法/发射器
         */
        get owner(): mw.Player;
        /**
         * @description 获取当前速度
         * @groups 玩法/发射器
         * @example
         * 使用示例:创建一个脚本放置在对象栏中，在脚本中复制下列"Example_ObjectLauncher_Acceleration"的代码保存，运行游戏，场景中将会生成一个对象发射器和用于发射的火箭。按下按键”1“，发射火箭。设置对象代码如下：
         * ```
         * @Component
         *  export default class Example_ObjectLauncher_Acceleration extends Script {
         *
         *      protected async onStart(): Promise<void> {
         *
         *          // 下列逻辑在服务端执行
         *          if(SystemUtil.isServer()) {
         *              // 在世界坐标（200，0，25）异步生成一个火箭
         *              let rocket = await GameObject.asyncSpawn("162807") as Model;
         *              rocket.worldTransform.position = new Vector(2000, 0, 25);
         *
         *              // 异步生成对象发射器
         *              let myLauncher = await GameObject.asyncSpawn("ObjectLauncher") as ObjectLauncher;
         *
         *              // 设置发射初始速度为1
         *              myLauncher.initialSpeed = 1;
         *              // 设置发射最大速度为1000
         *              myLauncher.maxSpeed = 1000;
         *              // 设置发射加速度为200
         *              myLauncher.acceleration = 200;
         *              // 设置碰撞半径为25
         *              myLauncher.capsuleRadius = 25;
         *              // 设置碰撞半长为25
         *              myLauncher.capsuleHalfLength = 25;
         *              // 开启反弹
         *              myLauncher.isShouldBounce = true;
         *              // 设置重力缩放为0
         *              myLauncher.gravityScale = 0;
         *              // 设置旋转不跟随速度方向
         *              myLauncher.isRotationFollowsVelocity = false;
         *              // 运动时间为10s
         *              myLauncher.lifeSpan = 10;
         *
         *              // 添加客户端发送的”LAUNCH“事件监听器，将火箭朝上方发射。
         *              Event.addClientListener("LAUNCH", () => {
         *                  let velRocket = myLauncher.spawnProjectileInstanceLaunch(rocket.gameObjectId, rocket.worldTransform.position, new Vector(0, 0, 1));
         *                  console.log("Rocket velocity is: " + velRocket.velocity);
         *                  rocket.localTransform.rotation = new Rotation(0, 90, 0);
         *              });
         *          }
         *
         *          // 下列逻辑在客户端执行
         *          if(SystemUtil.isClient()) {
         *              // 添加一个按键方法：按下按键”1“，向服务端派送一个”LAUNCH“事件，发射一个球。
         *              InputUtil.onKeyDown(Keys.One, () => {
         *                  Event.dispatchToServer("LAUNCH");
         *              });
         *          }
         *      }
         *  }
         * ```
         */
        get velocity(): mw.Vector;
        /**
         * @groups 玩法/发射器
         * @description 设置当前速度
         * @precautions 不会自动 rpc 到服务端，如在客户端调用且需同步，请自行到服务端调用
         */
        set velocity(newVelocity: mw.Vector);
    }
    /**
     * @description 投掷物发射器
     * @description -------------------------
     * @description 投掷物发射器是一种游戏中常见的机制，用于模拟投掷物体的发射和飞行。它可以让玩家或游戏角色通过选择合适的方向和力量，将物体发射到目标位置。
     * @description 想象一下，你站在一个阳台上，手里拿着一个小球，并希望将它投向一个目标。投掷物发射器就像是你的手臂和手，它帮助你控制球的发射。你可以调整你的手臂的方向和力量，以便球以特定的方式飞行。
     * @description 一旦玩家决定好发射的方向和力量，投掷物发射器就会将投掷物体发射出去。投掷物体会根据发射器设置的速度和发射角度开始飞行。它会在空中经过弧线路径，并受到重力和其他物理效应的影响。
     * @description ObjectLauncher 为发射器。发射器发射出的实例称为投掷物实例 ProjectileInst 。投掷物实例上挂载着实际发射的物体。
     * @description 当 spawnProjectileInstanceLaunch 启动发射时，传入对象ID（注意是场景里的对象 id，不是资源 id），投掷物实例拖着传入的模型进行运动，发射器作为发射终端，维护投掷物发射相关的参数。
     * @description 发射器接口调用端可以是服务器，也可以是客户端；发射投掷物的方式有3种：1.双端投掷物 2.发射全客户端投掷物 3.发射单客户端投掷物
     * @description 在客户端还是服务端加载 ObjectLauncher 对象呢？
     * @description 1. 服务端
     * @description -  在服务端动态生成投掷物发射器，获得一个各端同步的投掷物发射器对象。修改投掷物发射器属性会同步至所有客户端。
     * @description -  在服务器添加投掷物发射器委托后，委托只会在服务器执行，同时执行前提是发射器要存在于服务器。
     * @description -  在服务器调用发射接口时，按服务器当前发射器属性生成双端投掷物发射，发射对象如果在服务端找不到（有可能是单客户端投掷物），直接返回，能找到（发射对象是双端对象），在投掷物上挂载发射物体。双端投掷物的碰撞和轨迹就是服务器计算，即以服务器的计算结果为准。
     * @description 2. 客户端
     * @description -  在客户端动态生成投掷物发射器，只能获得一个本地的投掷物发射器对象，仅支持本地发射。
     * @description -  在本地添加回调后，回调只会在本地执行，同时执行前提是发射器要存在于本地。
     * @description -  在本地调用广播发射：按本地当前发射器属性生成单端投掷物，同时通知服务器广播其他客户端按本地当前发射器属性生成单端投掷物。发射对象如果在服务端找不到，直接返回，能找到（发射对象是双端对象），挂上投掷物。
     * @description 另外有控制发射器发射初始速度、重力、投掷物半径等参数。
     * @author jun.zhang
     * @groups 玩法/发射器
     * @networkStatus usage: 双端
     */
    class ObjectLauncher extends mw.GameObject {
        /**
         * @groups 玩法/发射器
         * @description 按照对象发射器当前参数生成的投掷物对象
         * @precautions 发射后再更新其他属性无法对本次发射的投掷物产生影响
         * @effect 调用端生效
         * @param childObjectId usage: 发射对象的 id。  range: 字符串长度取决于 ID 长度。
         * @param startPosition usage: 发射起始位置 default: 发射对象的位置
         * @param direction usage: 发射起始方向 default: 发射对象的正前方
         * @param isAllClientLaunch usage: 仅在发射单客户端对象是有效, 是否广播到所有客户端发射实例 default: false
         * @returns 投掷物实例
         * @example
         * 使用示例:创建一个脚本放置在对象栏中，在脚本中复制下列"Example_ObjectLauncher_Acceleration"的代码保存，运行游戏，场景中将会生成一个对象发射器和用于发射的火箭。按下按键”1“，发射火箭。设置对象代码如下：
         * ```
         * @Component
         *  export default class Example_ObjectLauncher_Acceleration extends Script {
         *
         *      protected async onStart(): Promise<void> {
         *
         *          // 下列逻辑在服务端执行
         *          if(SystemUtil.isServer()) {
         *              // 在世界坐标（200，0，25）异步生成一个火箭
         *              let rocket = await GameObject.asyncSpawn("162807") as Model;
         *              rocket.worldTransform.position = new Vector(2000, 0, 25);
         *
         *              // 异步生成对象发射器
         *              let myLauncher = await GameObject.asyncSpawn("ObjectLauncher") as ObjectLauncher;
         *
         *              // 设置发射初始速度为1
         *              myLauncher.initialSpeed = 1;
         *              // 设置发射最大速度为1000
         *              myLauncher.maxSpeed = 1000;
         *              // 设置发射加速度为200
         *              myLauncher.acceleration = 200;
         *              // 设置碰撞半径为25
         *              myLauncher.capsuleRadius = 25;
         *              // 设置碰撞半长为25
         *              myLauncher.capsuleHalfLength = 25;
         *              // 开启反弹
         *              myLauncher.isShouldBounce = true;
         *              // 设置重力缩放为0
         *              myLauncher.gravityScale = 0;
         *              // 设置旋转不跟随速度方向
         *              myLauncher.isRotationFollowsVelocity = false;
         *              // 运动时间为10s
         *              myLauncher.lifeSpan = 10;
         *
         *              // 添加客户端发送的”LAUNCH“事件监听器，将火箭朝上方发射。
         *              Event.addClientListener("LAUNCH", () => {
         *                  myLauncher.spawnProjectileInstanceLaunch(rocket.gameObjectId, rocket.worldTransform.position, new Vector(0, 0, 1));
         *                  rocket.localTransform.rotation = new Rotation(0, 90, 0);
         *              });
         *          }
         *
         *          // 下列逻辑在客户端执行
         *          if(SystemUtil.isClient()) {
         *              // 添加一个按键方法：按下按键”1“，向服务端派送一个”LAUNCH“事件，发射一个球。
         *              InputUtil.onKeyDown(Keys.One, () => {
         *                  Event.dispatchToServer("LAUNCH");
         *              });
         *          }
         *      }
         *  }
         * ```
         */
        spawnProjectileInstanceLaunch(childObjectId: string, startPosition?: mw.Vector, direction?: mw.Vector, isAllClientLaunch?: boolean): ProjectileInst;
        /**
         * @groups 玩法/发射器
         * @description 按照对象发射器当前参数生成的投掷物对象
         * @precautions 发射后再更新其他属性无法对本次发射的子弹产生影响;
 当在服务端调用方法广播，追踪模式发射时，会自带一个追踪的加速度，速度表现和预期会有差异
         * @effect 调用端生效
         * @param childObjectId usage: 发射对象的 id。 range: 字符串长度取决于 ID 长度
         * @param target usage: 追踪目标
         * @param targetingAcceleration usage: 追踪加速度 default: 10000  range: 不做限制  type: 浮点数
         * @param startPosition usage: 发射起始位置 default: 发射对象的位置
         * @param direction usage: 发射起始方向 default: 发射对象的正前方
         * @param isAllClientLaunch usage: 仅在发射单客户端对象是有效, 是否广播到所有客户端发射实例 default: false
         * @returns 投掷物实例
         * @example
         * 使用示例:创建一个脚本放置在对象栏中，在脚本中复制下列"Example_ObjectLauncher_OnHomingFail"的代码保存，运行游戏，场景中将会生成一个对象发射器、一个用于发射的球以及一个NPC目标。给发射器对应事件的委托绑定函数。按下按键”1“，发射球并追踪NPC。设置对象代码如下：
         * ```
         *  @Component
         *  export default class Example_ObjectLauncher_OnHomingFail extends Script {
         *
         *      protected async onStart(): Promise<void> {
         *
         *          // 下列逻辑在服务端执行
         *          if(SystemUtil.isServer()) {
         *              // 在世界坐标（200，0，25）异步生成一个球
         *              let ball = await GameObject.asyncSpawn("84121") as Model;
         *              ball.worldTransform.position = new Vector(200, 0, 25);
         *
         *              // 在世界坐标（2000，1000，130）异步生成一个NPC,2s后销毁。
         *              let target = Player.spawnDefaultCharacter();
         *              target.worldTransform.position = new Vector(2000, 1000, 130);
         *
         *              // 异步生成对象发射器
         *              let myLauncher = await GameObject.asyncSpawn("ObjectLauncher") as ObjectLauncher;
         *
         *              // 设置发射初始速度为1000
         *              myLauncher.initialSpeed = 1000;
         *              // 设置碰撞半径为25
         *              myLauncher.capsuleRadius = 25;
         *              // 设置碰撞半长为25
         *              myLauncher.capsuleHalfLength = 25;
         *              // 开启反弹
         *              myLauncher.isShouldBounce = true;
         *              // 设置碰撞速度衰减为0.5
         *              myLauncher.collisionVelocityRetention = 0.5;
         *
         *              // 给发射器追踪失败委托绑定函数，追踪失败时打印信息
         *              myLauncher.onProjectileHomingFail.add((projectile) => {
         *                  console.log("Homing Fail");
         *              });
         *
         *              // 添加客户端发送的”LAUNCHTOTARGET“事件监听器，将球朝斜上方发射并追踪NPC。
         *              Event.addClientListener("LAUNCHTOTARGET", () => {
         *                  TimeUtil.delaySecond(1).then(() => {
         *                      target.destroy();
         *                   });
         *                  myLauncher.spawnProjectileInstanceLaunchToTarget(ball.gameObjectId, target, 2000, ball.worldTransform.position, new Vector(1, 0, 1));
         *              });
         *          }
         *
         *          // 下列逻辑在客户端执行
         *          if(SystemUtil.isClient()) {
         *              // 添加一个按键方法：按下按键”1“，向服务端派送一个”LAUNCHTOTARGET“事件，发射一个球追踪NPC。
         *              InputUtil.onKeyDown(Keys.One, () => {
         *                  Event.dispatchToServer("LAUNCHTOTARGET");
         *              });
         *          }
         *      }
         *  }
         * ```
         */
        spawnProjectileInstanceLaunchToTarget(childObjectId: string, target: mw.GameObject, targetingAcceleration?: number, startPosition?: mw.Vector, direction?: mw.Vector, isAllClientLaunch?: boolean): ProjectileInst;
        /**
         * @groups 玩法/发射器
         * @description 按照预测时间和密度返回的路径点数组。不预测碰撞后的反弹路径。
         * @effect 调用端生效
         * @precautions 如果返回的数组长度为1，可能投掷物被卡住了
         * @param startPosition usage: 发射起始位置
         * @param startDirection usage: 发射起始方向
         * @param density usage: 预测结果的点密度（个/秒），值越大路径点越细，性能消耗越大。 range:(0, density * duration + 1]  type: 浮点数
         * @param duration usage: 预测的时长。 range: 不做限制  type: 浮点数
         * @returns 路径轨迹点，预测结果的点的最大数量为 density * duration + 1。
         */
        predictedTrajectory(startPosition: mw.Vector, startDirection: mw.Vector, density: number, duration: number): mw.Vector[];
        /**
         * @groups 玩法/发射器
         * @description 投掷物生成实例时触发绑定函数，此时实例还没有开始移动
         * @precautions 所有投掷物都是使用的同一个回调，请不要循环添加事件绑定函数
         */
        onProjectileLifeStart: mw.MulticastDelegate<(projectile: ProjectileInst) => void>;
        /**
         * @groups 玩法/发射器
         * @description 投掷物生命周期结束（即速度降为0、LifeSpan 到期）时触发绑定函数
         * @precautions 所有投掷物都是使用的同一个回调，请不要循环添加事件绑定函数；客户端添加的回调，在发射双端对象时，此委托触发时无法保证实例是否依然存在
         */
        onProjectileLifeEnd: mw.MulticastDelegate<(projectile: ProjectileInst) => void>;
        /**
         * @groups 玩法/发射器
         * @description 投掷物击中物体时触发绑定函数
         * @precautions 所有投掷物都是使用的同一个回调，请不要循环添加事件绑定函数
         */
        onProjectileHit: mw.MulticastDelegate<(projectile: ProjectileInst, hitGameObject: mw.GameObject, hitResult: mw.HitResult) => void>;
        /**
         * @groups 玩法/发射器
         * @description 投掷物追踪目标失败(即为被销毁时)触发绑定函数
         * @precautions 所有投掷物都是使用的同一个回调，请不要循环添加事件绑定函数
         * @example
         * 使用示例:创建一个脚本放置在对象栏中，在脚本中复制下列"Example_ObjectLauncher_OnHomingFail"的代码保存，运行游戏，场景中将会生成一个对象发射器、一个用于发射的球以及一个NPC目标。给发射器对应事件的委托绑定函数。按下按键”1“，发射球并追踪NPC。设置对象代码如下：
         * ```
         *  @Component
         *  export default class Example_ObjectLauncher_OnHomingFail extends Script {
         *
         *      protected async onStart(): Promise<void> {
         *
         *          // 下列逻辑在服务端执行
         *          if(SystemUtil.isServer()) {
         *              // 在世界坐标（200，0，25）异步生成一个球
         *              let ball = await GameObject.asyncSpawn("84121") as Model;
         *              ball.worldTransform.position = new Vector(200, 0, 25);
         *
         *              // 在世界坐标（2000，1000，130）异步生成一个NPC,2s后销毁。
         *              let target = Player.spawnDefaultCharacter();
         *              target.worldTransform.position = new Vector(2000, 1000, 130);
         *
         *              // 异步生成对象发射器
         *              let myLauncher = await GameObject.asyncSpawn("ObjectLauncher") as ObjectLauncher;
         *
         *              // 设置发射初始速度为1000
         *              myLauncher.initialSpeed = 1000;
         *              // 设置碰撞半径为25
         *              myLauncher.capsuleRadius = 25;
         *              // 设置碰撞半长为25
         *              myLauncher.capsuleHalfLength = 25;
         *              // 开启反弹
         *              myLauncher.isShouldBounce = true;
         *              // 设置碰撞速度衰减为0.5
         *              myLauncher.collisionVelocityRetention = 0.5;
         *
         *              // 给发射器追踪失败委托绑定函数，追踪失败时打印信息
         *              myLauncher.onProjectileHomingFail.add((projectile) => {
         *                  console.log("Homing Fail");
         *              });
         *
         *              // 添加客户端发送的”LAUNCHTOTARGET“事件监听器，将球朝斜上方发射并追踪NPC。
         *              Event.addClientListener("LAUNCHTOTARGET", () => {
         *                  TimeUtil.delaySecond(1).then(() => {
         *                      target.destroy();
         *                   });
         *                  myLauncher.spawnProjectileInstanceLaunchToTarget(ball.gameObjectId, target, 2000, ball.worldTransform.position, new Vector(1, 0, 1));
         *              });
         *          }
         *
         *          // 下列逻辑在客户端执行
         *          if(SystemUtil.isClient()) {
         *              // 添加一个按键方法：按下按键”1“，向服务端派送一个”LAUNCHTOTARGET“事件，发射一个球追踪NPC。
         *              InputUtil.onKeyDown(Keys.One, () => {
         *                  Event.dispatchToServer("LAUNCHTOTARGET");
         *              });
         *          }
         *      }
         *  }
         * ```
         */
        onProjectileHomingFail: mw.MulticastDelegate<(projectile: ProjectileInst) => void>;
        /**
         * @description 投掷物触发对应事件时是否广播（仅双端发射器生效），true：广播。false：仅本地
         * @groups 玩法/发射器
         */
        get isShouldReplicateDelegates(): boolean;
        /**
         * @groups 玩法/发射器
         * @description 投掷物触发对应事件时是否广播（仅双端发射器生效），true：广播。false：仅本地
         */
        set isShouldReplicateDelegates(value: boolean);
        /**
         * @groups 玩法/发射器
         * @description 投掷物的初始运动速度（cm/s），default: 5000，range: [1,100000]。
         */
        get initialSpeed(): number;
        /**
         * @groups 玩法/发射器
         * @description 投掷物的初始运动速度（cm/s），default: 5000，range: [1,100000]。
         */
        set initialSpeed(value: number);
        /**
         * @groups 玩法/发射器
         * @description 投掷物的最大运动速度（cm/s），0意味着没有限制。default: 0，range: [0,100000]。
         */
        get maxSpeed(): number;
        /**
         * @groups 玩法/发射器
         * @description 投掷物的最大运动速度（cm/s），0意味着没有限制。default: 0，range: [0,100000]。
         */
        set maxSpeed(value: number);
        /**
         * @groups 玩法/发射器
         * @description 投掷物运动的加速度（cm/s），正值会使投掷物加速，负值减速。default: 0，range: [-10000,10000]。
         */
        get acceleration(): number;
        /**
         * @groups 玩法/发射器
         * @description 投掷物运动的加速度（cm/s），正值会使投掷物加速，负值减速。default: 0，range: [-10000,10000]。
         */
        set acceleration(value: number);
        /**
         * @groups 玩法/发射器
         * @description 投掷物受世界重力影响的倍率，正值会使投掷物下坠，负值上升，0可以使投掷物以直线运动。default: 1，range: [-10, 10]。
         */
        get gravityScale(): number;
        /**
         * @groups 玩法/发射器
         * @description 投掷物受世界重力影响的倍率，正值会使投掷物下坠，负值上升，0可以使投掷物以直线运动。default: 1，range: [-10, 10]。
         */
        set gravityScale(value: number);
        /**
         * @groups 玩法/发射器
         * @description 投掷物碰撞胶囊体的半径（cm）。default: 25。range: [1, 1000]。
         */
        get capsuleRadius(): number;
        /**
         * @groups 玩法/发射器
         * @description 投掷物碰撞胶囊体的半径（cm）。default: 25。range: [1, 1000]。
         */
        set capsuleRadius(value: number);
        /**
         * @groups 玩法/发射器
         * @description 投掷物碰撞胶囊体的半长（cm），半长小于半径时为球体。default: 50。range: [1, 1000]。
         */
        get capsuleHalfLength(): number;
        /**
         * @groups 玩法/发射器
         * @description 投掷物碰撞胶囊体的半长（cm），半长小于半径时为球体。default: 50。range: [1, 1000]。
         */
        set capsuleHalfLength(value: number);
        /**
         * @groups 玩法/发射器
         * @description 投掷物存在的最长时间（s），0意味着没有限制。default: 10。range: [0, 1000]。
         */
        get lifeSpan(): number;
        /**
         * @groups 玩法/发射器
         * @description 投掷物存在的最长时间（s），0意味着没有限制。default: 10。range: [0, 1000]。
         */
        set lifeSpan(value: number);
        /**
         * @groups 玩法/发射器
         * @description 碰撞后投掷物保持原来速度的比例。0表示。default: 0.6。range: [0, 1]。
         */
        get collisionVelocityRetention(): number;
        /**
         * @groups 玩法/发射器
         * @description 碰撞后投掷物保持原来速度的比例。0表示。default: 0.6。range: [0, 1]。
         */
        set collisionVelocityRetention(value: number);
        /**
         * @groups 玩法/发射器
         * @description 投掷物的正方向（以及挂载对象）是否始终跟随运动方向。true：跟随。false：不跟随。default: true。
         */
        get isRotationFollowsVelocity(): boolean;
        /**
         * @groups 玩法/发射器
         * @description 投掷物的正方向（以及挂载对象）是否始终跟随运动方向。true：跟随。false：不跟随。default: true。
         */
        set isRotationFollowsVelocity(value: boolean);
        /**
         * @groups 玩法/发射器
         * @description 决定投掷物运动过程中与其他对象发生碰撞时是否能反弹。true：反弹。false：穿透。default: true。
         */
        get isShouldBounce(): boolean;
        /**
         * @groups 玩法/发射器
         * @description 决定投掷物运动过程中与其他对象发生碰撞时是否能反弹。true：反弹。false：穿透。default: true。
         */
        set isShouldBounce(value: boolean);
    }
}

declare namespace mw {
    /**
     * @author jun.zhang
     * @description 投掷物移动状态
     * @groups 玩法
     */
    enum ProjectileMovementStatus {
        /** 还没有准备好，通常是因为底层组件还没有创建成功 */
        NotReady = 0,
        /** 准备好发射了 */
        Ready = 1,
        /** 飞行中 */
        Launched = 2
    }
    /**
     * @author jun.zhang
     * @description 投掷物配置类型
     * @groups 玩法/投掷物
     */
    interface ProjectileMovementConfig {
        /**
         * @groups 玩法/投掷物
         * @description 投掷物的初始运动速度（cm/s），default: 5000，range: [1,100000]
         */
        initialSpeed?: number;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物的最大运动速度（cm/s），0意味着没有限制。default: 0，range: [0,100000]
         */
        maxSpeed?: number;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物运动的加速度（cm/s），正值会使投掷物加速，负值减速。default: 0，range: [-10000,10000]
         */
        acceleration?: number;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物受世界重力影响的倍率，正值会使投掷物下坠，负值上升，0可以使投掷物以直线运动。default: 1，range: [-10, 10]
         */
        gravityScale?: number;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物的正方向（以及挂载对象）是否始终跟随运动方向。true：跟随。false：不跟随。default: true。
         */
        isRotationFollowsVelocity?: boolean;
        /**
         * @groups 玩法/投掷物
         * @description 碰撞后投掷物保持原来速度的比例。0表示。default: 0.6。range: [0, 1]
         */
        speedRetention?: number;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物存在的最长时间（s），0意味着没有限制。default: 10。range: [0, 1000]
         */
        lifeSpan?: number;
        /** @description 投掷物追踪的目标对象，当目标对象不为空时，对象会向目标加速。default: null。 */
        homingTarget?: mw.GameObject;
        /**
         * @groups 玩法/投掷物
         * @description 朝向目标对象的加速度（cm/s）。default: 10000。range: [0, 10000]。
         */
        homingAcceleration?: number;
    }
    /**
     * @author jun.zhang
     * @description 投掷物移动功能类
     * @description ProjectileMovement 是一种功能组件，用于处理游戏中的飞行物体，比如子弹、火箭、投掷物等。
     * @description 想象一下，你在游戏中控制着一个角色，你想让他发射一颗子弹。这时，你可以使用 ProjectileMovement 组件来处理子弹的移动。
     * @description 这个组件的作用就像是给子弹贴上一个引擎，让它能够自动进行飞行。你只需要设置子弹的速度和方向，组件就会根据这些参数自动计算子弹的轨迹，并将其移动到正确的位置。这样，你就不需要手动编写复杂的移动逻辑，而是交给 ProjectileMovement 来处理。
     * @description 除了基本的移动功能，ProjectileMovement 还提供了一些其他的特性。例如，你可以设置子弹的最大飞行距离或生命周期，超过这个距离或时间后，子弹会自动销毁。还可以设置子弹的碰撞检测，当子弹与其他物体碰撞时，可以触发相应的效果或伤害。
     * @description 绑定的逻辑对象请自行关闭物理模拟，运动过程中会忽略相机、禁行区、功能类不考虑移动同步。
     * @groups 玩法/投掷物
     * @networkStatus usage: 双端
     */
    class ProjectileMovement implements ProjectileMovementConfig {
        /** @description 投掷物对象的持有人，便于用户指定发射的角色对象。 */
        owner: mw.Character;
        /**
         * @groups 玩法/投掷物
         * @description 获取关联的逻辑对象
         * @effect 调用端生效
         * @returns 关联的逻辑对象
         * @example
         * 使用示例:创建一个脚本放置在对象栏中，在脚本中复制下列"Example_ProjectileMovement"的代码保存，运行游戏，场景中将会生成5个用于发射的球。给发射器对应事件的委托绑定函数。按下按键”1“，发射投掷物关联的球对象。按下按键”2“，切换投掷物关联的球对象并删除上一个。注意需等球停止后再切换，否则会提前切换投掷物关联的球对象；设置对象代码如下：
         * ```
         *@Component
         *export default class Example_ProjectileMovement extends Script {
         *
         *    protected async onStart(): Promise<void> {
         *
         *        // 下列逻辑在服务端执行
         *        if(SystemUtil.isServer()) {
         *
         *            // 创建一个模型数组balls和标识curBall。
         *            let balls = new Array<Model>();
         *            let curBall = 0;
         *
         *            // 在前方异步生成5个球，放入数组balls中。
         *            for (let i = 0;
 i < 5;
 i++) {
         *                let ball = await GameObject.asyncSpawn("84121") as Model;
         *                ball.worldTransform.position = new Vector(200, i * 100, 25);
         *                ball.name = "ball" + i;
         *                ball.setCollision(CollisionStatus.QueryCollisionOnly);
         *                balls.push(ball);
         *            }
         *
         *            // 创建投掷物。
         *            let projectile = new ProjectileMovement(balls[curBall]);
         *
         *            // 设置初始发射速度为1000。
         *            projectile.initialSpeed = 1000;
         *
         *            // 给击中委托绑定一个函数，当击中对象是目标时，播放一个击中特效，0.5s后删除目标。
         *            projectile.onProjectileHit.add((hitGameObject, HitResult) => {
         *                EffectService.playAtPosition("99599", HitResult.impactPoint, {scale: new Vector(5, 5, 5)});
         *            });
         *
         *            // 添加客户端发送的”LAUNCH“事件监听器，将球右前方发射。
         *            Event.addClientListener("LAUNCH", async (player: Player) => {
         *                projectile.launch(new Vector(1, 1, 1));
         *            });
         *
         *            // 添加客户端发送的”DESTROY“事件监听器，从数组里面删除球对象，并切换投掷物关联的对象。
         *            Event.addClientListener("DESTROY", async (player: Player) => {
         *                console.error("DESTROY");
         *                let deleteBall = projectile.getRelatedGameObject() as Model;
         *                let deleteIndex = balls.indexOf(deleteBall);
         *                balls.splice(deleteIndex, 1);
         *                if(balls.length > 0) {
         *                    curBall = (deleteIndex) % balls.length;
         *                    projectile.setRelatedGameObject(balls[curBall]);
         *                    deleteBall.destroy();
         *                } else {
         *                    projectile.destroy(true);
         *                }
         *            });
         *        }
         *
         *        // 下列逻辑在客户端执行
         *        if(SystemUtil.isClient()) {
         *            // 添加一个按键方法：按下按键”1“，向服务端派送一个”LAUNCH“事件，发射球。
         *            InputUtil.onKeyDown(Keys.One, () => {
         *                Event.dispatchToServer("LAUNCH");
         *            });
         *
         *            // 添加一个按键方法：按下按键”2“，向服务端派送一个”DESTROY“事件，切换至下一个球并删除上一个。
         *            InputUtil.onKeyDown(Keys.Two, () => {
         *                Event.dispatchToServer("DESTROY");
         *            });
         *        }
         *    }
         *}
         * ```
         */
        getRelatedGameObject(): mw.GameObject;
        /**
         * @groups 玩法/投掷物
         * @description 设置新的关联的逻辑对象
         * @effect 调用端生效
         * @param value usage: 新的关联的逻辑对象，设置后，移动组件会重新生成并附加到此对象上
         * @example
         * 使用示例:创建一个脚本放置在对象栏中，在脚本中复制下列"Example_ProjectileMovement"的代码保存，运行游戏，场景中将会生成5个用于发射的球。给发射器对应事件的委托绑定函数。按下按键”1“，发射投掷物关联的球对象。按下按键”2“，切换投掷物关联的球对象并删除上一个。注意需等球停止后再切换，否则会提前切换投掷物关联的球对象；设置对象代码如下：
         * ```
         *@Component
         *export default class Example_ProjectileMovement extends Script {
         *
         *    protected async onStart(): Promise<void> {
         *
         *        // 下列逻辑在服务端执行
         *        if(SystemUtil.isServer()) {
         *
         *            // 创建一个模型数组balls和标识curBall。
         *            let balls = new Array<Model>();
         *            let curBall = 0;
         *
         *            // 在前方异步生成5个球，放入数组balls中。
         *            for (let i = 0;
 i < 5;
 i++) {
         *                let ball = await GameObject.asyncSpawn("84121") as Model;
         *                ball.worldTransform.position = new Vector(200, i * 100, 25);
         *                ball.name = "ball" + i;
         *                ball.setCollision(CollisionStatus.QueryCollisionOnly);
         *                balls.push(ball);
         *            }
         *
         *            // 创建投掷物。
         *            let projectile = new ProjectileMovement(balls[curBall]);
         *
         *            // 设置初始发射速度为1000。
         *            projectile.initialSpeed = 1000;
         *
         *            // 给击中委托绑定一个函数，当击中对象是目标时，播放一个击中特效，0.5s后删除目标。
         *            projectile.onProjectileHit.add((hitGameObject, HitResult) => {
         *                EffectService.playAtPosition("99599", HitResult.impactPoint, {scale: new Vector(5, 5, 5)});
         *            });
         *
         *            // 添加客户端发送的”LAUNCH“事件监听器，将球右前方发射。
         *            Event.addClientListener("LAUNCH", async (player: Player) => {
         *                projectile.launch(new Vector(1, 1, 1));
         *            });
         *
         *            // 添加客户端发送的”DESTROY“事件监听器，从数组里面删除球对象，并切换投掷物关联的对象。
         *            Event.addClientListener("DESTROY", async (player: Player) => {
         *                console.error("DESTROY");
         *                let deleteBall = projectile.getRelatedGameObject() as Model;
         *                let deleteIndex = balls.indexOf(deleteBall);
         *                balls.splice(deleteIndex, 1);
         *                if(balls.length > 0) {
         *                    curBall = (deleteIndex) % balls.length;
         *                    projectile.setRelatedGameObject(balls[curBall]);
         *                    deleteBall.destroy();
         *                } else {
         *                    projectile.destroy(true);
         *                }
         *            });
         *        }
         *
         *        // 下列逻辑在客户端执行
         *        if(SystemUtil.isClient()) {
         *            // 添加一个按键方法：按下按键”1“，向服务端派送一个”LAUNCH“事件，发射球。
         *            InputUtil.onKeyDown(Keys.One, () => {
         *                Event.dispatchToServer("LAUNCH");
         *            });
         *
         *            // 添加一个按键方法：按下按键”2“，向服务端派送一个”DESTROY“事件，切换至下一个球并删除上一个。
         *            InputUtil.onKeyDown(Keys.Two, () => {
         *                Event.dispatchToServer("DESTROY");
         *            });
         *        }
         *    }
         *}
         * ```
         */
        setRelatedGameObject(value: mw.GameObject): void;
        /**
         * @description 通过配置对象构造功能类
         * @effect 调用端生效
         * @param relatedGameObject usage: 新的关联的逻辑对象，将为之生成组件
         * @param config usage: 批量读取配置 default: null
         */
        constructor(relatedGameObject: mw.GameObject, config?: ProjectileMovementConfig);
        /**
         * @groups 玩法/投掷物
         * @description 获取当前速度
         * @effect 调用端生效
         * @returns 当前速度
         * @example
         * 使用示例:创建一个脚本放置在对象栏中，在脚本中复制下列"Example_ProjectileMovement"的代码保存，运行游戏。按下按键”1“，发射一颗火箭。设置对象代码如下：
         * ```
         *@Component
         *export default class Example_ProjectileMovement extends Script {
         *
         *    protected async onStart(): Promise<void> {
         *
         *        // 下列逻辑在服务端执行
         *        if(SystemUtil.isServer()) {
         *
         *            // 在r(2000, 0, 0)生成一个火箭模型。
         *            let rocket = await GameObject.asyncSpawn("162807") as Model;
         *            rocket.worldTransform.position = new Vector(2000, 0, 0);
         *
         *            // 将火箭的碰撞状态修改为无碰撞
         *            rocket.setCollision(CollisionStatus.Off);
         *
         *            // 创建投掷物。
         *            let projectile = new ProjectileMovement(rocket);
         *
         *            // 设置初始发射速度为1。
         *            projectile.initialSpeed = 1;
         *            // 设置最大速度为1000。
         *            projectile.maxSpeed = 1000;
         *            // 设置发射加速度为200
         *            projectile.acceleration = 200;
         *            // 设置重力缩放为0。
         *            projectile.gravityScale = 0;
         *            // 设置投掷物旋转不跟随速度方向。
         *            projectile.isRotationFollowsVelocity = false;
         *            // 设置投掷物运动时间10秒。
         *            projectile.lifeSpan = 10;
         *
         *            // 添加客户端发送的”LAUNCH“事件监听器，将火箭朝上方发射。
         *            Event.addClientListener("LAUNCH", async (player: Player) => {
         *                projectile.launch(new Vector(0, 0, 1));
         *                // 广播客户端给火箭挂载尾焰特效
         *                Event.dispatchToAllClient("TAIL", rocket.gameObjectId);
         *                // 每0.1秒都会给客户端广播火箭当前速度
         *                let scaleInterval = TimeUtil.setInterval(() => {
         *                    if(projectile.getVelocity().length > 999) {
         *                        projectile.setVelocity(Vector.zero);
         *                        TimeUtil.clearInterval(scaleInterval);
         *                        rocket.worldTransform.position = new Vector(2000, 0, 0);
         *                    }
         *                    Event.dispatchToAllClient("SCALING", rocket.gameObjectId, projectile.getVelocity());
         *                }, 0.1);
         *            });
         *        }
         *
         *        // 下列逻辑在客户端执行
         *        if(SystemUtil.isClient()) {
         *            // 添加一个按键方法：按下按键”1“，向服务端派送一个”LAUNCH“事件，发射火箭
         *            InputUtil.onKeyDown(Keys.One, () => {
         *                Event.dispatchToServer("LAUNCH");
         *            });
         *
         *            // 添加服务端发送的”TAIL“事件监听器，给火箭挂载尾焰。
         *            Event.addServerListener("TAIL", async (rocketId: string) => {
         *                let rocket = await GameObject.asyncFindGameObjectById(rocketId);
         *                if(typeof(rocket.getChildByName("tail")) != "undefined") {
         *                    return;
         *                }
         *                let tail = await GameObject.asyncSpawn("144098") as Effect;
         *                tail.name = "tail";
         *                tail.parent = rocket;
         *                tail.localTransform.position = Vector.zero;
         *            });
         *
         *            // 添加服务端发送的”SCALING“事件监听器，根据速度对尾焰进行缩放
         *            Event.addServerListener("SCALING", async (rocketId: string, velocity: Vector) => {
         *                let rocket = await GameObject.asyncFindGameObjectById(rocketId);
         *                let tail = rocket.getChildByName("tail");
         *                if(tail) {
         *                    tail.worldTransform.scale = Vector.one.multiply(velocity.length / 250);
         *                }
         *            });
         *        }
         *    }
         *}
         * ```
         */
        getVelocity(): mw.Vector;
        /**
         * @groups 玩法/投掷物
         * @description 设置当前速度
         * @precautions 能在 Launched 状态和 Ready 状态下调用
         * @effect 调用端生效
         * @param v usage: 速度
         * @example
         * 使用示例:创建一个脚本放置在对象栏中，在脚本中复制下列"Example_ProjectileMovement"的代码保存，运行游戏。按下按键”1“，发射一颗火箭。设置对象代码如下：
         * ```
         *@Component
         *export default class Example_ProjectileMovement extends Script {
         *
         *    protected async onStart(): Promise<void> {
         *
         *        // 下列逻辑在服务端执行
         *        if(SystemUtil.isServer()) {
         *
         *            // 在r(2000, 0, 0)生成一个火箭模型。
         *            let rocket = await GameObject.asyncSpawn("162807") as Model;
         *            rocket.worldTransform.position = new Vector(2000, 0, 0);
         *
         *            // 将火箭的碰撞状态修改为无碰撞
         *            rocket.setCollision(CollisionStatus.Off);
         *
         *            // 创建投掷物。
         *            let projectile = new ProjectileMovement(rocket);
         *
         *            // 设置初始发射速度为1。
         *            projectile.initialSpeed = 1;
         *            // 设置最大速度为1000。
         *            projectile.maxSpeed = 1000;
         *            // 设置发射加速度为200
         *            projectile.acceleration = 200;
         *            // 设置重力缩放为0。
         *            projectile.gravityScale = 0;
         *            // 设置投掷物旋转不跟随速度方向。
         *            projectile.isRotationFollowsVelocity = false;
         *            // 设置投掷物运动时间10秒。
         *            projectile.lifeSpan = 10;
         *
         *            // 添加客户端发送的”LAUNCH“事件监听器，将火箭朝上方发射。
         *            Event.addClientListener("LAUNCH", async (player: Player) => {
         *                projectile.launch(new Vector(0, 0, 1));
         *                // 广播客户端给火箭挂载尾焰特效
         *                Event.dispatchToAllClient("TAIL", rocket.gameObjectId);
         *                // 每0.1秒都会给客户端广播火箭当前速度
         *                let scaleInterval = TimeUtil.setInterval(() => {
         *                    if(projectile.getVelocity().length > 999) {
         *                        projectile.setVelocity(Vector.zero);
         *                        TimeUtil.clearInterval(scaleInterval);
         *                        rocket.worldTransform.position = new Vector(2000, 0, 0);
         *                    }
         *                    Event.dispatchToAllClient("SCALING", rocket.gameObjectId, projectile.getVelocity());
         *                }, 0.1);
         *            });
         *        }
         *
         *        // 下列逻辑在客户端执行
         *        if(SystemUtil.isClient()) {
         *            // 添加一个按键方法：按下按键”1“，向服务端派送一个”LAUNCH“事件，发射火箭
         *            InputUtil.onKeyDown(Keys.One, () => {
         *                Event.dispatchToServer("LAUNCH");
         *            });
         *
         *            // 添加服务端发送的”TAIL“事件监听器，给火箭挂载尾焰。
         *            Event.addServerListener("TAIL", async (rocketId: string) => {
         *                let rocket = await GameObject.asyncFindGameObjectById(rocketId);
         *                if(typeof(rocket.getChildByName("tail")) != "undefined") {
         *                    return;
         *                }
         *                let tail = await GameObject.asyncSpawn("144098") as Effect;
         *                tail.name = "tail";
         *                tail.parent = rocket;
         *                tail.localTransform.position = Vector.zero;
         *            });
         *
         *            // 添加服务端发送的”SCALING“事件监听器，根据速度对尾焰进行缩放
         *            Event.addServerListener("SCALING", async (rocketId: string, velocity: Vector) => {
         *                let rocket = await GameObject.asyncFindGameObjectById(rocketId);
         *                let tail = rocket.getChildByName("tail");
         *                if(tail) {
         *                    tail.worldTransform.scale = Vector.one.multiply(velocity.length / 250);
         *                }
         *            });
         *        }
         *    }
         *}
         * ```
         */
        setVelocity(v: mw.Vector): void;
        /**
         * @groups 玩法/投掷物
         * @description 发射
         * @precautions 能在 Ready 状态下调用
         * @effect 调用端生效
         * @param direction usage: 发射方向，direction 如果是 (0,0,0), 会被重置为默认值 default: (1,0,0)
         * @example
         * 使用示例:创建一个脚本放置在对象栏中，在脚本中复制下列"Example_ProjectileMovement_Launch"的代码保存，运行游戏，场景中将会生成一个用于发射的球以及用于碰撞的墙壁。给发射器对应事件的委托绑定函数。按下按键”1“，发射球；按下按键”2“，暂停球的运动；按下按键”3“，恢复球的运动；设置对象代码如下：
         * ```
         *@Component
         *export default class Example_ProjectileMovement_Launch extends Script {
         *
         *    protected async onStart(): Promise<void> {
         *
         *        // 下列逻辑在服务端执行
         *        if(SystemUtil.isServer()) {
         *
         *            // 在世界坐标（200，0，25）异步生成一个球
         *            let ball = await GameObject.asyncSpawn("84121") as Model;
         *            ball.worldTransform.position = new Vector(200, 0, 25);
         *            ball.name = "ball";
         *            ball.setCollision(CollisionStatus.QueryCollisionOnly);
         *
         *            // 在世界坐标（1000，0，0）异步生成一面墙
         *            let wall = await GameObject.asyncSpawn("197386") as Model;
         *            wall.worldTransform.position = new Vector(1000, 0, 0);
         *            wall.worldTransform.scale = new Vector(1, 5, 5);
         *            wall.name = "wall";
         *
         *            // 创建投掷物。
         *            let projectile = new ProjectileMovement(ball);
         *
         *            // 设置初始发射速度为1500。
         *            projectile.initialSpeed = 1500;
         *            // 设置重力缩放为1。
         *            projectile.gravityScale = 1;
         *            // 设置投掷物旋转跟随速度方向。
         *            projectile.isRotationFollowsVelocity = true;
         *            // 设置投掷物碰撞维持速度比例为0.4。
         *            projectile.speedRetention = 0.4;
         *
         *            // 给击中委托绑定一个函数，打印击中信息：角色X 发射 对象Y 击中 对象Z，并播放一个击中特效。
         *            projectile.onProjectileHit.add((hitGameObject, HitResult) => {
         *                console.log( "Projectile " + projectile.getRelatedGameObject().name + " thrown by Character " + projectile.owner.displayName + " hits the " + hitGameObject.name);
         *                EffectService.playAtPosition("99599", HitResult.impactPoint);
         *            });
         *
         *            // 给投掷物生命结束委托绑定一个函数，播放一个销毁特效。
         *            projectile.onProjectileLifeEnd.add(() => {
         *                EffectService.playAtPosition("133276", ball.worldTransform.position);
         *            });
         *
         *            // 添加客户端发送的”LAUNCH“事件监听器，将球朝上方发射。
         *            Event.addClientListener("LAUNCH", async (player: Player) => {
         *                // 设置owner为玩家角色。
         *                projectile.owner = player.character;
         *                projectile.launch(new Vector(1, 0, 1));
         *            });
         *
         *            // 添加客户端发送的”PAUSE“事件监听器，将暂停投掷物运动并打印状态。
         *            Event.addClientListener("PAUSE", async (player: Player) => {
         *                projectile.pause();
         *                console.log("Projectile status " + projectile.status);
         *            });
         *
         *            // 添加客户端发送的”RESUME“事件监听器，将恢复投掷物运动并打印状态。
         *            Event.addClientListener("RESUME", async (player: Player) => {
         *                projectile.resume();
         *                console.log("Projectile status " + projectile.status);
         *            });
         *        }
         *
         *        // 下列逻辑在客户端执行
         *        if(SystemUtil.isClient()) {
         *            // 添加一个按键方法：按下按键”1“，向服务端派送一个”LAUNCH“事件，发射球
         *            InputUtil.onKeyDown(Keys.One, () => {
         *                Event.dispatchToServer("LAUNCH");
         *            });
         *
         *            // 添加一个按键方法：按下按键”2“，向服务端派送一个”PAUSE“事件，发射球
         *            InputUtil.onKeyDown(Keys.Two, () => {
         *                Event.dispatchToServer("PAUSE");
         *            });
         *
         *            // 添加一个按键方法：按下按键”3“，向服务端派送一个”RESUME“事件，发射球
         *            InputUtil.onKeyDown(Keys.Three, () => {
         *                Event.dispatchToServer("RESUME");
         *            });
         *        }
         *    }
         *}
         * ```
         */
        launch(direction: mw.Vector): void;
        /**
         * @groups 玩法/投掷物
         * @description 获取预测出的运动轨迹
         * @precautions Launched 状态调用时不生效
         * @effect 调用端生效
         * @param startDirection usage: 发射方向
         * @param density usage: 预测点密度，等同于模拟的帧率  range: 不做限制，值越大轨迹越精细，性能消耗越大  type: 浮点数
         * @param duration usage: 预测时长，等同于模拟时长  range: 不做限制，值越大轨迹轨迹越长，性能消耗越大  type: 浮点数
         * @returns 轨迹点坐标数组
         */
        getTrajectory(startDirection: mw.Vector, density: number, duration: number): mw.Vector[];
        /**
         * @groups 玩法/投掷物
         * @description 暂停运动，将由 Launched 状态切换到 Ready 状态
         * @precautions 非 Launched 状态调用时不生效
         * @effect 调用端生效
         * @example
         * 使用示例:创建一个脚本放置在对象栏中，在脚本中复制下列"Example_ProjectileMovement_Launch"的代码保存，运行游戏，场景中将会生成一个用于发射的球以及用于碰撞的墙壁。给发射器对应事件的委托绑定函数。按下按键”1“，发射球；按下按键”2“，暂停球的运动；按下按键”3“，恢复球的运动；设置对象代码如下：
         * ```
         *@Component
         *export default class Example_ProjectileMovement_Launch extends Script {
         *
         *    protected async onStart(): Promise<void> {
         *
         *        // 下列逻辑在服务端执行
         *        if(SystemUtil.isServer()) {
         *
         *            // 在世界坐标（200，0，25）异步生成一个球
         *            let ball = await GameObject.asyncSpawn("84121") as Model;
         *            ball.worldTransform.position = new Vector(200, 0, 25);
         *            ball.name = "ball";
         *            ball.setCollision(CollisionStatus.QueryCollisionOnly);
         *
         *            // 在世界坐标（1000，0，0）异步生成一面墙
         *            let wall = await GameObject.asyncSpawn("197386") as Model;
         *            wall.worldTransform.position = new Vector(1000, 0, 0);
         *            wall.worldTransform.scale = new Vector(1, 5, 5);
         *            wall.name = "wall";
         *
         *            // 创建投掷物。
         *            let projectile = new ProjectileMovement(ball);
         *
         *            // 设置初始发射速度为1500。
         *            projectile.initialSpeed = 1500;
         *            // 设置重力缩放为1。
         *            projectile.gravityScale = 1;
         *            // 设置投掷物旋转跟随速度方向。
         *            projectile.isRotationFollowsVelocity = true;
         *            // 设置投掷物碰撞维持速度比例为0.4。
         *            projectile.speedRetention = 0.4;
         *
         *            // 给击中委托绑定一个函数，打印击中信息：角色X 发射 对象Y 击中 对象Z，并播放一个击中特效。
         *            projectile.onProjectileHit.add((hitGameObject, HitResult) => {
         *                console.log( "Projectile " + projectile.getRelatedGameObject().name + " thrown by Character " + projectile.owner.displayName + " hits the " + hitGameObject.name);
         *                EffectService.playAtPosition("99599", HitResult.impactPoint);
         *            });
         *
         *            // 给投掷物生命结束委托绑定一个函数，播放一个销毁特效。
         *            projectile.onProjectileLifeEnd.add(() => {
         *                EffectService.playAtPosition("133276", ball.worldTransform.position);
         *            });
         *
         *            // 添加客户端发送的”LAUNCH“事件监听器，将球朝上方发射。
         *            Event.addClientListener("LAUNCH", async (player: Player) => {
         *                // 设置owner为玩家角色。
         *                projectile.owner = player.character;
         *                projectile.launch(new Vector(1, 0, 1));
         *            });
         *
         *            // 添加客户端发送的”PAUSE“事件监听器，将暂停投掷物运动并打印状态。
         *            Event.addClientListener("PAUSE", async (player: Player) => {
         *                projectile.pause();
         *                console.log("Projectile status " + projectile.status);
         *            });
         *
         *            // 添加客户端发送的”RESUME“事件监听器，将恢复投掷物运动并打印状态。
         *            Event.addClientListener("RESUME", async (player: Player) => {
         *                projectile.resume();
         *                console.log("Projectile status " + projectile.status);
         *            });
         *        }
         *
         *        // 下列逻辑在客户端执行
         *        if(SystemUtil.isClient()) {
         *            // 添加一个按键方法：按下按键”1“，向服务端派送一个”LAUNCH“事件，发射球
         *            InputUtil.onKeyDown(Keys.One, () => {
         *                Event.dispatchToServer("LAUNCH");
         *            });
         *
         *            // 添加一个按键方法：按下按键”2“，向服务端派送一个”PAUSE“事件，发射球
         *            InputUtil.onKeyDown(Keys.Two, () => {
         *                Event.dispatchToServer("PAUSE");
         *            });
         *
         *            // 添加一个按键方法：按下按键”3“，向服务端派送一个”RESUME“事件，发射球
         *            InputUtil.onKeyDown(Keys.Three, () => {
         *                Event.dispatchToServer("RESUME");
         *            });
         *        }
         *    }
         *}
         * ```
         */
        pause(): void;
        /**
         * @groups 玩法/投掷物
         * @description 继续运动，将由 Ready 状态切换到 Launched 状态
         * @precautions 对应 pause 方法，还没有发射的对象调用也不会运动
         * @effect 调用端生效
         * @example
         * 使用示例:创建一个脚本放置在对象栏中，在脚本中复制下列"Example_ProjectileMovement_Launch"的代码保存，运行游戏，场景中将会生成一个用于发射的球以及用于碰撞的墙壁。给发射器对应事件的委托绑定函数。按下按键”1“，发射球；按下按键”2“，暂停球的运动；按下按键”3“，恢复球的运动；设置对象代码如下：
         * ```
         *@Component
         *export default class Example_ProjectileMovement_Launch extends Script {
         *
         *    protected async onStart(): Promise<void> {
         *
         *        // 下列逻辑在服务端执行
         *        if(SystemUtil.isServer()) {
         *
         *            // 在世界坐标（200，0，25）异步生成一个球
         *            let ball = await GameObject.asyncSpawn("84121") as Model;
         *            ball.worldTransform.position = new Vector(200, 0, 25);
         *            ball.name = "ball";
         *            ball.setCollision(CollisionStatus.QueryCollisionOnly);
         *
         *            // 在世界坐标（1000，0，0）异步生成一面墙
         *            let wall = await GameObject.asyncSpawn("197386") as Model;
         *            wall.worldTransform.position = new Vector(1000, 0, 0);
         *            wall.worldTransform.scale = new Vector(1, 5, 5);
         *            wall.name = "wall";
         *
         *            // 创建投掷物。
         *            let projectile = new ProjectileMovement(ball);
         *
         *            // 设置初始发射速度为1500。
         *            projectile.initialSpeed = 1500;
         *            // 设置重力缩放为1。
         *            projectile.gravityScale = 1;
         *            // 设置投掷物旋转跟随速度方向。
         *            projectile.isRotationFollowsVelocity = true;
         *            // 设置投掷物碰撞维持速度比例为0.4。
         *            projectile.speedRetention = 0.4;
         *
         *            // 给击中委托绑定一个函数，打印击中信息：角色X 发射 对象Y 击中 对象Z，并播放一个击中特效。
         *            projectile.onProjectileHit.add((hitGameObject, HitResult) => {
         *                console.log( "Projectile " + projectile.getRelatedGameObject().name + " thrown by Character " + projectile.owner.displayName + " hits the " + hitGameObject.name);
         *                EffectService.playAtPosition("99599", HitResult.impactPoint);
         *            });
         *
         *            // 给投掷物生命结束委托绑定一个函数，播放一个销毁特效。
         *            projectile.onProjectileLifeEnd.add(() => {
         *                EffectService.playAtPosition("133276", ball.worldTransform.position);
         *            });
         *
         *            // 添加客户端发送的”LAUNCH“事件监听器，将球朝上方发射。
         *            Event.addClientListener("LAUNCH", async (player: Player) => {
         *                // 设置owner为玩家角色。
         *                projectile.owner = player.character;
         *                projectile.launch(new Vector(1, 0, 1));
         *            });
         *
         *            // 添加客户端发送的”PAUSE“事件监听器，将暂停投掷物运动并打印状态。
         *            Event.addClientListener("PAUSE", async (player: Player) => {
         *                projectile.pause();
         *                console.log("Projectile status " + projectile.status);
         *            });
         *
         *            // 添加客户端发送的”RESUME“事件监听器，将恢复投掷物运动并打印状态。
         *            Event.addClientListener("RESUME", async (player: Player) => {
         *                projectile.resume();
         *                console.log("Projectile status " + projectile.status);
         *            });
         *        }
         *
         *        // 下列逻辑在客户端执行
         *        if(SystemUtil.isClient()) {
         *            // 添加一个按键方法：按下按键”1“，向服务端派送一个”LAUNCH“事件，发射球
         *            InputUtil.onKeyDown(Keys.One, () => {
         *                Event.dispatchToServer("LAUNCH");
         *            });
         *
         *            // 添加一个按键方法：按下按键”2“，向服务端派送一个”PAUSE“事件，发射球
         *            InputUtil.onKeyDown(Keys.Two, () => {
         *                Event.dispatchToServer("PAUSE");
         *            });
         *
         *            // 添加一个按键方法：按下按键”3“，向服务端派送一个”RESUME“事件，发射球
         *            InputUtil.onKeyDown(Keys.Three, () => {
         *                Event.dispatchToServer("RESUME");
         *            });
         *        }
         *    }
         *}
         * ```
         */
        resume(): void;
        /**
         * @groups 玩法/投掷物
         * @description 销毁投掷物，即销毁对象下的移动组件和碰撞组件。可以选择是否和关联的对象一起销毁。
         * @effect 调用端生效
         * @param destroyWithObject usage: 是否与对象一起删除 default: true
         * @example
         * 使用示例:创建一个脚本放置在对象栏中，在脚本中复制下列"Example_ProjectileMovement_Destroy"的代码保存，运行游戏，场景中将会生成5个用于发射的球。给发射器对应事件的委托绑定函数。按下按键”1“，发射投掷物关联的球对象。按下按键”2“，切换投掷物关联的球对象并删除上一个。注意需等球停止后再切换，否则会提前切换投掷物关联的球对象；设置对象代码如下：
         * ```
         * @Component
         * export default class Example_ProjectileMovement_Destroy extends Script {
         *
         *    protected async onStart(): Promise<void> {
         *
         *        // 下列逻辑在服务端执行
         *        if(SystemUtil.isServer()) {
         *
         *            // 创建一个模型数组balls和标识curBall。
         *            let balls = new Array<Model>();
         *            let curBall = 0;
         *
         *            // 在前方异步生成5个球，放入数组balls中。
         *            for (let i = 0;
 i < 5;
 i++) {
         *                let ball = await GameObject.asyncSpawn("84121") as Model;
         *                ball.worldTransform.position = new Vector(200, i * 100, 25);
         *                ball.name = "ball" + i;
         *                ball.setCollision(CollisionStatus.QueryCollisionOnly);
         *                balls.push(ball);
         *            }
         *
         *            // 创建投掷物。
         *            let projectile = new ProjectileMovement(balls[curBall]);
         *
         *            // 设置初始发射速度为1000。
         *            projectile.initialSpeed = 1000;
         *
         *            // 给击中委托绑定一个函数，当击中对象是目标时，播放一个击中特效，0.5s后删除目标。
         *            projectile.onProjectileHit.add((hitGameObject, HitResult) => {
         *                EffectService.playAtPosition("99599", HitResult.impactPoint, {scale: new Vector(5, 5, 5)});
         *            });
         *
         *            // 添加客户端发送的”LAUNCH“事件监听器，将球右前方发射。
         *            Event.addClientListener("LAUNCH", async (player: Player) => {
         *                projectile.launch(new Vector(1, 1, 1));
         *            });
         *
         *            // 添加客户端发送的”DESTROY“事件监听器，从数组里面删除球对象，并切换投掷物关联的对象。
         *            Event.addClientListener("DESTROY", async (player: Player) => {
         *                console.error("DESTROY");
         *                let deleteBall = projectile.getRelatedGameObject() as Model;
         *                let deleteIndex = balls.indexOf(deleteBall);
         *                balls.splice(deleteIndex, 1);
         *                if(balls.length > 0) {
         *                    curBall = (deleteIndex) % balls.length;
         *                    projectile.setRelatedGameObject(balls[curBall]);
         *                    deleteBall.destroy();
         *                } else {
         *                    projectile.destroy(true);
         *                }
         *            });
         *        }
         *
         *        // 下列逻辑在客户端执行
         *        if(SystemUtil.isClient()) {
         *            // 添加一个按键方法：按下按键”1“，向服务端派送一个”LAUNCH“事件，发射球。
         *            InputUtil.onKeyDown(Keys.One, () => {
         *                Event.dispatchToServer("LAUNCH");
         *            });
         *
         *            // 添加一个按键方法：按下按键”2“，向服务端派送一个”DESTROY“事件，切换至下一个球并删除上一个。
         *            InputUtil.onKeyDown(Keys.Two, () => {
         *                Event.dispatchToServer("DESTROY");
         *            });
         *        }
         *    }
         *}
         * ```
         */
        destroy(destroyWithObject?: boolean): void;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物当前状态
         */
        get status(): ProjectileMovementStatus;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物的初始运动速度（cm/s），default: 5000，range: [1,100000]，发射之后设置不会生效
         */
        get initialSpeed(): number;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物的初始运动速度（cm/s），default: 5000，range: [1,100000]，发射之后设置不会生效
         */
        set initialSpeed(value: number);
        /**
         * @groups 玩法/投掷物
         * @description 投掷物的最大运动速度（cm/s），0意味着没有限制。default: 0，range: [0,100000]。
         */
        get maxSpeed(): number;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物的最大运动速度（cm/s），0意味着没有限制。default: 0，range: [0,100000]。
         */
        set maxSpeed(value: number);
        /**
         * @groups 玩法/投掷物
         * @description 投掷物运动的加速度（cm/s），正值会使投掷物加速，负值减速。default: 0，range: [-10000,10000]。
         */
        get acceleration(): number;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物运动的加速度（cm/s），正值会使投掷物加速，负值减速。default: 0，range: [-10000,10000]。
         */
        set acceleration(value: number);
        /**
         * @groups 玩法/投掷物
         * @description 投掷物受世界重力影响的倍率，正值会使投掷物下坠，负值上升，0可以使投掷物以直线运动。default: 1，range: [-10, 10]。
         */
        get gravityScale(): number;
        /**
         * @description 投掷物受世界重力影响的倍率，正值会使投掷物下坠，负值上升，0可以使投掷物以直线运动。default: 1，range: [-10, 10]。
         * @groups 玩法/投掷物
         */
        set gravityScale(value: number);
        /**
         * @description 投掷物的正方向（以及挂载对象）是否始终跟随运动方向。true：跟随。false：不跟随。default: true。
         * @groups 玩法/投掷物
         */
        get isRotationFollowsVelocity(): boolean;
        /**
         * @description 投掷物的正方向（以及挂载对象）是否始终跟随运动方向。true：跟随。false：不跟随。default: true。
         * @groups 玩法/投掷物
         */
        set isRotationFollowsVelocity(value: boolean);
        /**
         * @description 碰撞后投掷物保持原来速度的比例。0表示碰撞后速度直接清零。default: 0.6。range: [0, 1]。
         * @groups 玩法/投掷物
         */
        get speedRetention(): number;
        /**
         * @description 碰撞后投掷物保持原来速度的比例。0表示碰撞后速度直接清零。default: 0.6。range: [0, 1]。
         * @groups 玩法/投掷物
         */
        set speedRetention(value: number);
        /**
         * @groups 玩法/投掷物
         * @description 投掷物存在的最长时间（s），0意味着没有限制。default: 10。range: [0, 1000]。
         */
        get lifeSpan(): number;
        /**
         * @description 投掷物存在的最长时间（s），0意味着没有限制。default: 10。range: [0, 1000]。
         * @groups 玩法/投掷物
         */
        set lifeSpan(value: number);
        /**
         * @description 投掷物追踪的目标对象，当目标对象不为空时，对象会向目标加速。default: null。
         * @groups 玩法/投掷物
         */
        get homingTarget(): mw.GameObject;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物追踪的目标对象，当目标对象不为空时，对象会向目标加速。default: null。
         */
        set homingTarget(value: mw.GameObject);
        /**
         * @groups 玩法/投掷物
         * @description 朝向目标对象的加速度（cm/s）。default: 10000。range: [0, 10000]。
         */
        get homingAcceleration(): number;
        /**
         * @description 朝向目标对象的加速度（cm/s）。default: 10000。range: [0, 10000]。
         * @groups 玩法/投掷物
         */
        set homingAcceleration(value: number);
        /**
         * @description 投掷物击中物体时触发绑定函数
         * @groups 玩法/投掷物
         */
        onProjectileHit: mw.MulticastDelegate<(hitGameObject: mw.GameObject, hitResult: mw.HitResult) => void>;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物结束运动周期时触发绑定函数
         */
        onProjectileLifeEnd: mw.MulticastDelegate<() => void>;
        /**
         * @groups 玩法/投掷物
         * @description 投掷物追踪失败触发绑定函数（追踪失败特指追踪目标消失，当且仅当这个情况触发一次）
         */
        onProjectileHomingFail: mw.MulticastDelegate<() => void>;
    }
}

declare namespace mw {
    /**
     * @author xiangkun.sun
     * @groups 角色系统/角色管理
     * @description 角色管理器
     * @description Player 包含当前连接到MW服务器的Player对象。它负责管理角色的各种唯一标识符（ID）并提供创建、获取并管理玩家的功能。
     * @description 角色管理器类会维护一个字典，用于存储所有角色的唯一标识符。用于区分不同的角色。
     * @description 角色管理器会提供方法来添加、删除和检索角色的 ID。当创建一个新角色时，该角色的ID会被分配并添加到管理器的列表中。当角色不再存在时，该ID会被从列表中删除。通过这些方法，可以方便地管理角色的ID集合。
     * @description 角色管理器还提供获取玩家的功能。通过玩家的 ID，可以轻松地从管理器中获取对应的角色对象。这样，其他部分的代码可以使用玩家的ID来获取与之相关联的角色实例，进行进一步的处理和操作。
     * @description 值得注意的是可通过 Player.localPlayer.character 获取本地玩家角色，开启本地角色玩家的配置。
     * @networkStatus usage:双端
     */
    class Player extends mw.IPlayer {
        /**
         * @groups 角色系统/角色管理
         * @description 用户平台形象变化时，执行绑定函数
         * @effect 只在客户端调用生效
         * @precautions 当玩家切出游戏，进入角色编辑器修改外观保存后，切回游戏时触发该事件。
         * @example
         * 使用示例:创建一个名为"Example_Player_onUserAvatarUpdated"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将给【用户平台形象变化】事件绑定一个函数：请求平台形象并应用与角色。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_onUserAvatarUpdated extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             Player.onUserAvatarUpdated.add(() => {
         *                 AccountService.downloadData(Player.localPlayer.character, () => {}, 0);
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        static onUserAvatarUpdated: mw.MulticastDelegate<() => void>;
        /**
         * @groups 角色系统/角色管理
         * @description 玩家新增时，执行绑定函数
         * @effect 调用端生效
         * @precautions 当新玩家加入游戏创建Player对象时触发该事件。需注意客户端无法监听到本地玩家的加入，通常建议在服务端给该事件绑定函数。
         * @example
         * 使用示例:创建一个名为"Example_Player_onPlayerAdd"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将给【新增玩家】事件绑定一个函数：在控制台打印玩家加入的提示log包含玩家ID和该玩家的用户ID。代码如下：
         * ```ts
         * export default class Example_Player_onPlayerAdd extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             Player.onPlayerAdd.add((player) => {
         *                 console.log("Player ID " + player.playerId + "User ID " + player.userId);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static readonly onPlayerAdd: mw.MulticastDelegate<(player: Player) => void>;
        /**
         * @groups 角色系统/角色管理
         * @description 玩家被移除时，执行绑定函数
         * @effect 调用端生效
         * @precautions 当玩家退出游戏准备移除Player对象时触发该事件。
         * @example
         * 使用示例:创建一个名为"Example_Player_onPlayerRemove"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将给【移除玩家】事件绑定一个函数：在控制台打印玩家退出的提示log包含玩家ID和该玩家的用户ID。代码如下：
         * ```ts
         * export default class Example_Player_onPlayerRemove extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             Player.onPlayerRemove.add((player) => {
         *                 console.log("Player ID " + player.playerId + "User ID " + player.userId);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static readonly onPlayerRemove: mw.MulticastDelegate<(player: Player) => void>;
        /**
         * @groups 角色系统/角色管理
         * @description 玩家重连委托
         * @effect 调用端生效
         * @precautions 当玩家重连时执行绑定函数，断线回调会先触发，之后连续收到客户端消息则触发重连回调。
         * @example
         * 使用示例:创建一个名为"Example_Player_OnPlayerReconnect"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将给【玩家重连】委托添加一个函数：打印玩家重连游戏消息。在控制台中看到重连玩家的用户ID和重连通知。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_OnPlayerReconnect extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 给【玩家加入】委托添加一个函数，打印玩家加入游戏消息
         *             Player.onPlayerJoin.add((player) => {
         *                 console.log("Player " + player.userId + " joined the Game");
         *             });
         *             // 给【玩家离开】委托添加一个函数，打印玩家离开游戏消息
         *             Player.onPlayerLeave.add((player) => {
         *                 console.log("Player " + player.userId + " Left the Game");
         *             });
         *             // 给【玩家断线】委托添加一个函数，打印玩家断线消息
         *             Player.onPlayerDisconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is disconnected");
         *             });
         *             // 给【玩家重连】委托添加一个函数，打印玩家重连消息
         *             Player.onPlayerReconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is reconnected");
         *             });
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myself = Player.localPlayer;
         *             // 给【玩家断线】委托添加一个函数，打印玩家断线消息
         *             Player.onPlayerDisconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is disconnected");
         *             });
         *             // 给【玩家重连】委托添加一个函数，打印玩家重连消息
         *             Player.onPlayerReconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is reconnected");
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        static readonly onPlayerReconnect: mw.MulticastDelegate<(player: Player) => void>;
        /**
         * @groups 角色系统/角色管理
         * @description 玩家断线委托
         * @effect 调用端生效
         * @precautions 当玩家掉线时执行绑定函数。该委托双端触发机制不同。在客户端只被本地玩家掉线事件触发，触发时机为掉线的瞬间。在服务端被任意玩家掉线事件触发，触发时机为5秒内未收到客户端玩家消息即为掉线。
         * 当客户端切后台、看广告等OnPause操作时，该回调在服务器上也会被触发。
         * @example
         * 使用示例:创建一个名为"Example_Player_OnPlayerDisconnect"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将给【玩家断线】委托添加一个函数：打印玩家断线游戏消息。在控制台中看到断线玩家的用户ID和断线通知。代码如下：
         * ```
         * @Component
         * export default class Example_Player_OnPlayerDisconnect extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 给【玩家加入】委托添加一个函数，打印玩家加入游戏消息
         *             Player.onPlayerJoin.add((player) => {
         *                 console.log("Player " + player.userId + " joined the Game");
         *             });
         *             // 给【玩家离开】委托添加一个函数，打印玩家离开游戏消息
         *             Player.onPlayerLeave.add((player) => {
         *                 console.log("Player " + player.userId + " Left the Game");
         *             });
         *             // 给【玩家断线】委托添加一个函数，打印玩家断线消息
         *             Player.onPlayerDisconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is disconnected");
         *             });
         *             // 给【玩家重连】委托添加一个函数，打印玩家重连消息
         *             Player.onPlayerReconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is reconnected");
         *             });
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myself = Player.localPlayer;
         *             // 给【玩家断线】委托添加一个函数，打印玩家断线消息
         *             Player.onPlayerDisconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is disconnected");
         *             });
         *             // 给【玩家重连】委托添加一个函数，打印玩家重连消息
         *             Player.onPlayerReconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is reconnected");
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        static readonly onPlayerDisconnect: mw.MulticastDelegate<(player: Player) => void>;
        /**
         * @groups 角色系统/角色管理
         * @description 获取玩家，根据userId找到对应的玩家
         * @effect 调用端生效
         * @precautions 根据ID获取玩家。ID可以是playerId或userId。
         * @param uniqueId usage:用户ID或者玩家玩家ID
         * @returns 玩家对象
         * @example
         * 使用示例:创建一个名为"Example_Player"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将通过getPlayer接口获取玩家。按下键盘“1”，使用 getPlayer 函数通过 userId 或 playerId 获取玩家对象并打印名字在控制台中看到 getPlayer 的效果。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player extends Script {
         *
         *     protected onStart(): void {
         *         Player.getPlayer(Player.localPlayer.playerId);
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        static getPlayer(uniqueId: string | number): Player;
        /**
         * @groups 角色系统/角色管理
         * @description 异步获取玩家
         * @effect 调用端生效
         * @param uniqueId usage:玩家ID  range: 依据玩家 ID 决定  type: 整形
         * @returns 玩家对象
         * @example
         * 使用示例:创建一个名为"Example_Player_GetPlayer"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将通过getPlayer接口获取玩家,按下键盘“1”，使用getPlayer函数通过userId或playerId获取玩家对象并打印名字在控制台中看到getPlayer的效果。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player extends Script {
         *
         *     protected onStart(): void {
         *         Player.asyncGetPlayer(Player.localPlayer.playerId).then((player)=>{
         *             console.log(player.playerId)
         *         });
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        static asyncGetPlayer(uniqueId: number | string): Promise<Player>;
        /**
         * @groups 角色系统/角色管理
         * @description 获取当前所有玩家。
         * @description 此方法返回当前连接的所有玩家的数组，当与 for 循环结合使用时，它对于迭代游戏中的所有玩家非常有用。
         * @effect 调用端生效
         * @returns 服务器中所有玩家的数组
         * @example
         * 使用示例:将使用到的资源:“27087”拖入优先加载栏。创建一个名为"Example_Player_GetAllPlayers"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在服务端添加一个【打印游戏内全部玩家信息】事件监听器，监听事件后在场景中看到一个皇冠在玩家角色的头顶生成的效果并在控制台打印玩家们的 userId，遇到发起事件的客户端玩家时提示 This is me。 代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_GetAllPlayers extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 在服务端添加一个【打印游戏内全部玩家信息】事件监听器
         *             mw.Event.addClientListener("PrintPlayersInfo", (player) => {
         *                 // 遍历Players数组，打印他们的userId，遇到发起事件的客户端玩家时提示This is me，并生成一个皇冠在玩家角色的头顶
         *                 Player.getAllPlayers().forEach((value) => {
         *                     if(value.playerId == player.playerId) {
         *                         console.log(" Player " + player.userId + " This is me");
         *                         let crown = GameObject.spawn<Model>("27087");
         *                         crown.setCollision(CollisionStatus.Off);
         *                         value.character.attachToSlot(crown, HumanoidSlotType.Rings);
         *                     } else {
         *                         console.log(" Player " + player.userId);
         *                     }
         *                 });
         *             });
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 添加一个按键方法：按下键盘“1”，向服务端发送事件【打印游戏内全部玩家信息】
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 mw.Event.dispatchToServer("PrintPlayersInfo");
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        static getAllPlayers(): Player[];
        /**
         * @groups 角色系统/角色管理
         * @description 客户端正在运行的玩家。
         * @description LocalPlayer 是一个只读属性。
         * @description 因为在客户端上运行。 对于 Script 对象运行其代码的服务器，此属性为 null。
         * @description 当前客户端对应的玩家。仅客户端调用返回本地玩家，服务端调用无效并在控制台打印警告。
         * @effect 只在客户端调用生效
         * @example
         * 使用示例:创建一个名为"Example_Player_LocalPlayer"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在场景中获取当前客户端的玩家，按下键盘“1”，你将在场景中看到角色隐身2秒的效果。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_LocalPlayer extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 打印本地玩家控制的character对象的guid和名字
         *             console.log("My character: " + myPlayer.character.gameObjectId + " " + myPlayer.character.displayName);
         *             // 添加一个按键方法：按下键盘“1”，角色隐身2秒
         *             InputUtil.onKeyDown(Keys.One, ()  =>  {
         *                 myPlayer.character.setVisibility(PropertyStatus.Off);
         *                 TimeUtil.delaySecond(2).then(() => {
         *                     myPlayer.character.setVisibility(PropertyStatus.On);
         *                 });
         *            });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        static get localPlayer(): Player;
        /**
         * @groups 角色系统/角色管理
         * @description 异步获取本地玩家。
         * @description 通常在UI脚本中使用，当获取还未创建出的本地玩家角色时，会使用此异步加载接口，最长等待10秒，等待本地角色加载出来再获取。
         * @description 当正常获取本地玩家时，使用 Player.localPlayer 即可。
         * @description 仅在UI脚本中需要使用此异步方法获取 localPlayer。仅客户端调用返回本地玩家，服务端调用无效并在控制台打印警告。
         * @effect 只在客户端调用生效
         * @returns 返回本地玩家
         * @networkStatus usage:客户端
         */
        static asyncGetLocalPlayer(): Promise<Player>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:034 reason:不合理接口 replacement:无
         * @groups 角色系统/角色管理
         * @description 创建默认角色
         * @effect 调用端生效
         * @precautions 默认角色属性由编辑器玩家对象的属性面板决定。
         * @returns 角色对象
         * @example
         * 使用示例:将使用到的资源:“7750”拖入优先加载栏。创建一个名为"Example_Player_SpawnDefaultCharacter"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在在服务端添加一个【创建角色并控制】事件监听器，当监听到事件时在场景中创建默认角色并控制。按下键盘“1”，向服务端发送事件【创建角色并控制】。给本地玩家的【玩家控制对象变化】委托添加一个函数：在生成并控制的新角色位置播放一个特效。当触发控制对象变化委托时执行绑定函数。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_SpawnDefaultCharacter extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 在服务端添加一个【创建角色并控制】事件监听器
         *             mw.Event.addClientListener("SpawnCharacterAndControl", (player) => {
         *                 let newPawn = Player.spawnDefaultCharacter();
         *                 newPawn.worldTransform.position = new Vector(200, 0, 500);
         *                 player.control(newPawn);
         *             });
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 给本地玩家的【玩家控制对象变化】委托添加一个函数：在生成并控制的新角色位置播放一个特效
         *             myPlayer.onPawnChange.add((pawn) => {
         *                 EffectService.playAtPosition("7750", new Vector(200, 0, 500));
         *             });
         *             // 添加一个按键方法：按下键盘“1”，向服务端发送事件【创建角色并控制】
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 mw.Event.dispatchToServer("SpawnCharacterAndControl");
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        static spawnDefaultCharacter(): mw.Character;
        /**
         * @groups 角色系统/角色管理
         * @description 覆写控制器的旋转
         * @effect 只在客户端调用生效
         * @param newRotation usage:新旋转值
         * @example
         * 使用示例:创建一个名为"Example_Player_SetControllerRotation"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将获取当前控制器输入的旋转并叠加步长进行覆盖，按下键盘“1”，开始或者停止覆写控制器的旋转。在场景中看到摄像机环绕角色旋转的效果。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_SetControllerRotation extends Script {
         *     // 声明变量
         *     flag: boolean;
         *     rot: Rotation;
         *     stride: Rotation;
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             this.flag = false;
         *             this.rot = Rotation.zero;
         *             this.stride = new Rotation(0, 0, 1);
         *             // 开启循环周期函数
         *             this.useUpdate = true;
         *             // 添加一个按键方法：按下键盘“1”，向服务端发送事件【创建角色并控制】
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 this.flag = !this.flag;
         *             });
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         if(SystemUtil.isClient() && this.flag) {
         *             // 获取当前控制器输入的旋转并叠加步长进行覆盖
         *             Player.getControllerRotation(this.rot);
         *             Player.setControllerRotation(this.rot.add(this.stride));
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        static setControllerRotation(newRotation: mw.Rotation): void;
        /**
         * @groups 角色系统/角色管理
         * @description 获取控制器的旋转
         * @effect 只在客户端调用生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Vector 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param outer usage:接收旋转的变量 default:undefined
         * @returns 当前控制器输入的旋转
         * @example
         * 使用示例:创建一个名为"Example_Player_GetControllerRotation"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将获取当前控制器输入的旋转并叠加步长进行覆盖，按下键盘“1”，开始或者停止覆写控制器的旋转。在场景中看到摄像机环绕角色旋转的效果。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_GetControllerRotation extends Script {
         *     // 声明变量
         *     flag: boolean;
         *     rot: Rotation;
         *     stride: Rotation;
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             this.flag = false;
         *             this.rot = Rotation.zero;
         *             this.stride = new Rotation(0, 0, 1);
         *             // 开启循环周期函数
         *             this.useUpdate = true;
         *             // 添加一个按键方法：按下键盘“1”，向服务端发送事件【创建角色并控制】
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 this.flag = !this.flag;
         *             });
         *         }
         *     }
         *     // 周期函数每帧执行，此函数执行需要将this.useUpdate赋值为true，dt是当前帧与上一帧的延迟（秒）
         *     protected onUpdate(dt: number): void {
         *         if(SystemUtil.isClient() && this.flag) {
         *             // 获取当前控制器输入的旋转并叠加步长进行覆盖
         *             Player.getControllerRotation(this.rot);
         *             Player.setControllerRotation(this.rot.add(this.stride));
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:客户端
         */
        static getControllerRotation(outer?: mw.Rotation): mw.Rotation;
        /**
         * @groups 角色系统/角色管理
         * @description 玩家的角色创建时，执行绑定函数
         * @effect 调用端生效
         * @precautions 在创建玩家后，会接着创建玩家的角色，当事件触发时角色的骨骼和碰撞体已经创建完毕，可以开始移动，而角色的外观和挂件则可能需要等待一段时间才能创建完成。如果需要等待角色的彻底完成可以使用Character:asyncReady来进行等待，又或者通过监听Character.onDescriptionComplete事件来确保角色拥有完整的外观和挂件。
         * @example
         * 使用示例:创建一个名为"Example_Player_onCharacterAdd"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将给【新增玩家】事件绑定一个函数：当玩家加入时，监听【新增玩家角色】事件。给【新增角色】事件绑定一个函数：更换角色的头顶显示名称为"John"。代码如下：
         * ```ts
         * export default class Example_Player_onCharacterAdd extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             Player.onPlayerAdd.add((player) => {
         *                 player.onCharacterAdd.add((character) => {
         *                     character.displayName = "John";
         *                 });
         *             });
         *         }
         *     }
         * }
         * ```
         */
        readonly onCharacterAdd: mw.MulticastDelegate<(character: mw.Character) => void>;
        /**
         * @groups 角色系统/角色管理
         * @description 玩家的角色被移除时，执行绑定函数
         * @effect 调用端生效
         * @precautions 该事件在移除玩家角色之前触发，此时可以回收玩家角色身上挂载的对象或者访问身上的数据用作存档。
         * @example
         * 使用示例:创建一个名为"Example_Player_onCharacterRemove"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将给【新增玩家】事件绑定一个函数：当玩家加入时，监听【移除玩家角色】事件。给【移除玩家角色】事件绑定一个函数：在玩家角色的当前位置创建一个死亡特效并播放。代码如下：
         * ```ts
         * export default class Example_Player_onCharacterRemove extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             Player.onPlayerAdd.add((player) => {
         *                 player.onCharacterRemove.add((character) => {
         *                     let effect = GameObject.spawn("298313") as Effect;
         *                     effect.worldTransform.position = character.worldTransform.position;
         *                     effect.play();
         *                 });
         *             });
         *         }
         *     }
         * }
         * ```
         */
        readonly onCharacterRemove: mw.MulticastDelegate<(character: mw.Character) => void>;
        /**
         * @groups 角色系统/角色管理
         * @description 控制一个 Pawn 对象
         * @effect 只在服务端调用生效
         * @param pawn usage:目标控制对象
         * @returns 操纵结果
         * @example
         * 使用示例: 将使用到的资源:“7750”拖入优先加载栏。创建一个名为"Example_Player_Control"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在在服务端添加一个【创建角色并控制】事件监听器，当监听到事件时在场景中创建默认角色并控制。按下键盘“1”，向服务端发送事件【创建角色并控制】。给本地玩家的【玩家控制对象变化】委托添加一个函数：在生成并控制的新角色位置播放一个特效。当触发控制对象变化委托时执行绑定函数。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_Control extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 在服务端添加一个【创建角色并控制】事件监听器
         *             mw.Event.addClientListener("SpawnCharacterAndControl", (player) => {
         *                 let newPawn = Player.spawnDefaultCharacter();
         *                 newPawn.worldTransform.position = new Vector(200, 0, 500);
         *                 player.control(newPawn);
         *             });
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 给本地玩家的【玩家控制对象变化】委托添加一个函数:在生成并控制的新角色位置播放一个特效
         *             myPlayer.onPawnChange.add((pawn) => {
         *                 EffectService.playAtPosition("7750", new Vector(200, 0, 500));
         *             });
         *             // 添加一个按键方法:按下键盘“1”，向服务端发送事件【创建角色并控制】
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 mw.Event.dispatchToServer("SpawnCharacterAndControl");
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:服务端
         */
        control(pawn: mw.Pawn): boolean;
        /**
         * @groups 角色系统/角色管理
         * @description 控制角色
         * @effect 调用端生效
         * @precautions 玩家控制的角色，属于Pawn对象的一种。在玩家切换控制角色时, 客户端上无法立即获取到最新值。其余情况下，只要获取到玩家就可以同时获取到加载完成的控制角色。
         * @example
         * 使用示例: 创建一个名为"Example_Player_Character"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将获取当前客户端玩家，在控制台中看到打印的玩家角色的guid和名字。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_Character extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 打印本地玩家控制的character对象的guid和名字
         *             console.log("My character: " + myPlayer.character.gameObjectId + " " + myPlayer.character.displayName);
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get character(): mw.Character;
        /**
         * @groups 角色系统/角色管理
         * @description 用户平台ID
         * @description 玩家的用户平台ID。该值是多端同步的，可以作为玩家唯一ID使用。玩家对象准备好后需等待一段时间该值才能准备好。
         * @effect 调用端生效
         * @example
         * 使用示例: 创建一个名为"Example_Player_UserId"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将获取当前客户端玩家，并在控制台中看到打印的玩家的用户平台ID。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_UserId extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 打印本地玩家的平台用户ID
         *             console.log("My userId: " + myPlayer.userId);
         *             // 打印本地玩家游戏内的玩家ID
         *             console.log("My playerId: " + myPlayer.playerId);
         *             // 打印本地玩家的队伍ID，如果当前没有队伍则打印null
         *             if(myPlayer.teamId) {
         *                 console.log("My teamId: " + myPlayer.teamId);
         *             } else {
         *                 console.log("My teamId: " + "null");
         *             }
         *             // 打印本地玩家的网络延迟
         *             console.log("My ping: " + myPlayer.ping);
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get userId(): string;
        /**
         * @groups 角色系统/角色管理
         * @description 玩家ID
         * @description playerID是运行时ID，每次进入游戏时ID都会更换；userID 是唯一标识玩家ID，不会改变的ID
         * @effect 调用端生效
         * @example
         * 使用示例: 创建一个名为"Example_Player_PlayerId"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将获取当前客户端玩家，并在控制台中看到打印的玩家的玩家ID。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_PlayerId extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 打印本地玩家的平台用户ID
         *             console.log("My userId: " + myPlayer.userId);
         *             // 打印本地玩家游戏内的玩家ID
         *             console.log("My playerId: " + myPlayer.playerId);
         *             // 打印本地玩家的队伍ID，如果当前没有队伍则打印null
         *             if(myPlayer.teamId) {
         *                 console.log("My teamId: " + myPlayer.teamId);
         *             } else {
         *                 console.log("My teamId: " + "null");
         *             }
         *             // 打印本地玩家的网络延迟
         *             console.log("My ping: " + myPlayer.ping);
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get playerId(): number;
        /**
         * @groups 角色系统/角色管理
         * @description 队伍ID
         * @effect 调用端生效
         * @precautions 玩家的队伍ID（通过游戏跳转自动形成）。如玩家不在任何队伍中则该值为空。
         * @example
         * 使用示例: 创建一个名为"Example_Player_TeamId"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将获取当前客户端玩家，并在控制台中看到打印的玩家的队伍ID。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_TeamId extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 打印本地玩家的平台用户ID
         *             console.log("My userId: " + myPlayer.userId);
         *             // 打印本地玩家游戏内的玩家ID
         *             console.log("My playerId: " + myPlayer.playerId);
         *             // 打印本地玩家的队伍ID，如果当前没有队伍则打印null
         *             if(myPlayer.teamId) {
         *                 console.log("My teamId: " + myPlayer.teamId);
         *             } else {
         *                 console.log("My teamId: " + "null");
         *             }
         *             // 打印本地玩家的网络延迟
         *             console.log("My ping: " + myPlayer.ping);
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get teamId(): string;
        /**
         * @groups 角色系统/角色管理
         * @description 传送ID
         * @effect 调用端生效
         * @precautions 玩家的传送ID（通过传送自动形成）。如玩家不是通过传送进入的当前场景则该值为空。
         * @example
         * 使用示例: 创建一个名为"Example_Player_TeleportId"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将获取当前客户端玩家，并在控制台中看到打印的玩家的队伍ID。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_TeleportId extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 打印本地玩家的平台用户ID
         *             console.log("My userId: " + myPlayer.userId);
         *             // 打印本地玩家游戏内的玩家ID
         *             console.log("My playerId: " + myPlayer.playerId);
         *             // 打印本地玩家的队伍ID，如果当前没有队伍则打印null
         *             if(myPlayer.teleportId) {
         *                 console.log("My teleportId: " + myPlayer.teleportId);
         *             } else {
         *                 console.log("My teleportId: " + "null");
         *             }
         *             // 打印本地玩家的网络延迟
         *             console.log("My ping: " + myPlayer.ping);
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get teleportId(): string;
        /**
         * @groups 角色系统/角色管理
         * @description 玩家昵称
         * @effect 调用端生效
         * @example
         * 使用示例: 创建一个名为"Example_Player_Nickname"的脚本,放置在对象栏中,打开脚本,输入以下代码保存,运行游戏,你将在控制台中看到打印的玩家的昵称.代码如下:
         * ```
         * @Class
         * export default class Example_Player_Nickname extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 打印本地玩家的平台用户ID
         *             console.log("My userId: " + myPlayer.userId);
         *             // 打印本地玩家的昵称
         *             console.log("My nickname: " + myPlayer.nickname);
         *             // 打印本地玩家的网络延迟
         *             console.log("My ping: " + myPlayer.ping);
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get nickname(): string;
        /**
         * @groups 角色系统/角色管理
         * @description 用于记录和显示玩家的网络延迟。
         * @description 网络延迟是指从玩家在游戏中执行某个操作到该操作在其他玩家的游戏中显示出来所需的时间。通常以毫秒（ms）为单位表示。较低的延迟意味着玩家的操作能够快速传输到服务器和其他玩家，并且游戏的响应更加即时。
         * @effect 调用端生效
         * @precautions 玩家客户端的网络延迟。以毫秒为单位；-1时表示获取失败。
         * @example
         * 使用示例: 创建一个名为"Example_Player_Ping"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将获取当前客户端玩家，并在控制台中看到打印的玩家当前Ping值。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_Ping extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 打印本地玩家的平台用户ID
         *             console.log("My userId: " + myPlayer.userId);
         *             // 打印本地玩家游戏内的玩家ID
         *             console.log("My playerId: " + myPlayer.playerId);
         *             // 打印本地玩家的队伍ID，如果当前没有队伍则打印null
         *             if(myPlayer.teamId) {
         *                 console.log("My teamId: " + myPlayer.teamId);
         *             } else {
         *                 console.log("My teamId: " + "null");
         *             }
         *             // 打印本地玩家的网络延迟
         *             console.log("My ping: " + myPlayer.ping);
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        get ping(): number;
        /**
        * @groups 角色系统/角色管理
        * @description 获取 PlayerState 实例
        * @description PlayerState 对象的作用是帮助游戏追踪和管理玩家的个人数据。它存储了与每个玩家相关的信息，这样游戏就可以根据需要随时访问和更新这些信息。
        * @description 举个例子来说，假设你正在玩一款多人射击游戏。每个玩家都有一个 PlayerState 对象，其中包含了玩家的得分、击杀数和死亡数等数据。当玩家击败敌人时，游戏会将得分加到对应玩家的PlayerState中。这样，游戏就可以根据每个玩家的PlayerState来显示排行榜或者判断胜负。
        * @description 总的来说，用于跟踪和存储与每个玩家相关的数据和状态。它帮助游戏管理玩家的个人信息，如得分、生命值等，并在多人游戏中确保玩家状态的同步。通过 PlayerState，游戏可以更好地处理多人游戏中的个人和团队数据，以提供更丰富的游戏体验。
        * @param type usage: PlayerState 派生类 <br> default: null
        * @returns PlayerState实例
        * @effect 调用端生效
        * @example
        * 使用示例: 创建一个名为"PlayerStateExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存。把启动参数的玩家数量改为2，运行游戏按下R键将看到其中一个客户端收到test同步。按下P键将打印客户端的test值。
        * ```ts
        *   // 服务端每个玩家进入游戏时会自动创建一个实例
        *   export class GamePlayerState extends mw.PlayerState {
        *
        *       @Property({replicated: true, onChanged: "onRepTest"})
        *       test = "";
        *
        *       onRepTest(path: string[], value: string, oldVal: string) {
        *           console.log(`onRepTest path: ${path} value: ${value} oldVal: ${oldVal}`);
        *       }
        *   }
        *
        *   @Component
        *   export default class PlayerStateExample extends mw.Script {
        *
        *       protected onStart(): void {
        *
        *           // 按下R建在服务端随机一个玩家修改GamePlayerState的test属性
        *           InputUtil.onKeyDown(Keys.R, () => this.random());
        *
        *           // 按下P建打印主控端玩家GamePlayState的test属性
        *           InputUtil.onKeyDown(Keys.P, () => {
        *               const playerState = Player.localPlayer.getPlayerState(GamePlayerState);
        *               console.log(`test: ${playerState.test}`);
        *           });
        *
        *       }
        *
        *       @RemoteFunction(Server)
        *       random() {
        *           const players = Player.getAllPlayers();
        *           // 随机一个玩家
        *           const luckPlayer = players[Math.floor(Math.random() * players.length)];
        *           // 获取到GamePlayerState实例
        *           const playerState = luckPlayer.getPlayerState(GamePlayerState);
        *           playerState.test = `random: ${ Math.floor(Math.random() * 100)}`;
        *       }
        *   }
        * ```
        */
        getPlayerState<T extends mw.PlayerState>(type: {
            new (...args: unknown[]): T;
        }): T;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:功能废弃 replacement:onPlayerAdd
         * @groups 角色系统/角色管理
         * @description 玩家加入委托
         * @effect 调用端生效
         * @precautions 当玩家加入游戏时执行绑定函数
         * @example
         * 使用示例:创建一个名为"Example_Player_OnPlayerJoin"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将给【玩家加入】委托添加一个函数：打印玩家加入游戏消息。在控制台中看到加入玩家的用户ID和加入通知。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_OnPlayerJoin extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 给【玩家加入】委托添加一个函数，打印玩家加入游戏消息
         *             Player.onPlayerJoin.add((player) => {
         *                 console.log("Player " + player.userId + " joined the Game");
         *             });
         *             // 给【玩家离开】委托添加一个函数，打印玩家离开游戏消息
         *             Player.onPlayerLeave.add((player) => {
         *                 console.log("Player " + player.userId + " Left the Game");
         *             });
         *             // 给【玩家断线】委托添加一个函数，打印玩家断线消息
         *             Player.onPlayerDisconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is disconnected");
         *             });
         *             // 给【玩家重连】委托添加一个函数，打印玩家重连消息
         *             Player.onPlayerReconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is reconnected");
         *             });
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myself = Player.localPlayer;
         *             // 给【玩家断线】委托添加一个函数，打印玩家断线消息
         *             Player.onPlayerDisconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is disconnected");
         *             });
         *             // 给【玩家重连】委托添加一个函数，打印玩家重连消息
         *             Player.onPlayerReconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is reconnected");
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        static readonly onPlayerJoin: mw.MulticastDelegate<(player: Player) => void>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:功能废弃 replacement:onPlayerRemove
         * @groups 角色系统/角色管理
         * @description 玩家离开委托
         * @effect 调用端生效
         * @precautions 当玩家离开游戏时执行绑定函数
         * @example
         * 使用示例:创建一个名为"Example_Player_OnPlayerLeave"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将给【玩家离开】委托添加一个函数：打印玩家离开游戏消息。在控制台中看到离开玩家的用户ID和离开通知。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_OnPlayerLeave extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 给【玩家加入】委托添加一个函数，打印玩家加入游戏消息
         *             Player.onPlayerJoin.add((player) => {
         *                 console.log("Player " + player.userId + " joined the Game");
         *             });
         *             // 给【玩家离开】委托添加一个函数，打印玩家离开游戏消息
         *             Player.onPlayerLeave.add((player) => {
         *                 console.log("Player " + player.userId + " Left the Game");
         *             });
         *             // 给【玩家断线】委托添加一个函数，打印玩家断线消息
         *             Player.onPlayerDisconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is disconnected");
         *             });
         *             // 给【玩家重连】委托添加一个函数，打印玩家重连消息
         *             Player.onPlayerReconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is reconnected");
         *             });
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myself = Player.localPlayer;
         *             // 给【玩家断线】委托添加一个函数，打印玩家断线消息
         *             Player.onPlayerDisconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is disconnected");
         *             });
         *             // 给【玩家重连】委托添加一个函数，打印玩家重连消息
         *             Player.onPlayerReconnect.add((player) => {
         *                 console.log("Player " + player.userId + " is reconnected");
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        static readonly onPlayerLeave: mw.MulticastDelegate<(player: Player) => void>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:功能废弃 replacement:onCharacterAdd, onCharacterRemove
         * @groups 角色系统/角色管理
         * @description 控制对象变化委托
         * @effect 调用端生效
         * @precautions 当玩家控制的角色发生变化时执行绑定函数
         * @example
         * 使用示例: 将使用到的资源:“7750”拖入优先加载栏。创建一个名为"Example_Player_OnPawnChange"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在在服务端添加一个【创建角色并控制】事件监听器，当监听到事件时在场景中创建默认角色并控制。按下键盘“1”，向服务端发送事件【创建角色并控制。给本地玩家的【玩家控制对象变化】委托添加一个函数：在生成并控制的新角色位置播放一个特效。当触发控制对象变化委托时执行绑定函数。代码如下：
         * ```ts
         * @Component
         * export default class Example_Player_OnPawnChange extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数/
         *     protected onStart(): void {
         *         // 下列代码仅在服务端执行
         *         if(SystemUtil.isServer()) {
         *             // 在服务端添加一个【创建角色并控制】事件监听器
         *             mw.Event.addClientListener("SpawnCharacterAndControl", (player) => {
         *                 let newPawn = Player.spawnDefaultCharacter();
         *                 newPawn.worldTransform.position = new Vector(200, 0, 500);
         *                 player.control(newPawn);
         *             });
         *         }
         *         // 下列代码仅在客户端执行
         *         if(SystemUtil.isClient()) {
         *             // 获取当前客户端的玩家(自己)
         *             let myPlayer = Player.localPlayer;
         *             // 给本地玩家的【玩家控制对象变化】委托添加一个函数:在生成并控制的新角色位置播放一个特效
         *             myPlayer.onPawnChange.add((pawn) => {
         *                 EffectService.playAtPosition("7750", new Vector(200, 0, 500));
         *             });
         *             // 添加一个按键方法:按下键盘“1”，向服务端发送事件【创建角色并控制】
         *             InputUtil.onKeyDown(Keys.One, () => {
         *                 mw.Event.dispatchToServer("SpawnCharacterAndControl");
         *             });
         *         }
         *     }
         * }
         * ```
         * @networkStatus usage:双端
         */
        readonly onPawnChange: mw.MulticastDelegate<(pawn: mw.Pawn) => void>;
    }
}

declare namespace mw {
}
