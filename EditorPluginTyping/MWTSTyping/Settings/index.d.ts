declare namespace mw {
    /**
     * @author mengyuan.hao
     * @groups 设置
     * @description 控制一些优化项的开启关闭
     * @networkStatus usage:客户端
     * @example
     * 使用示例:创建一个名为"ClassExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在服务器Log中看到对应方法调用信息。代码如下：
     * ```ts
     * @Component
     * export default class ClassExample extends Script {
     *
     *     protected onStart(): void {
     *        this.RoomSettings();
     *     }
     *
     *     public RoomSettings(){
     *        let opt = AvatarSettings.optimizationEnabled;
     *        console.log("角色优化是否开启：" + opt);
     *     }
     * }
     * ```
     */
    class AvatarSettings {
        /**
         * @groups 设置
         * @description 开启或关闭角色优化:通过动态限制骨架网格体组件的tick频率来限制运行动画数据的时间。
         * @effect 只在客户端调用生效
         * @param isEnabled usage:是否开启或关闭角色优化
         */
        static set optimizationEnabled(isEnabled: boolean);
        /**
         * @groups 设置
         * @description 开启或关闭角色优化:通过动态限制骨架网格体组件的tick频率来限制运行动画数据的时间。
         * @effect 只在客户端调用生效
         * @return boolean:角色优化是否开启,如果返回值为undefined，请检查是否在客户端调用,默认值是:true
         */
        static get optimizationEnabled(): boolean;
        /**
         * @groups 设置
         * @description 开启或关闭角色优化:通过动态限制骨架网格体组件的tick频率来限制运行动画数据的时间。
         * @effect 只在客户端调用生效
         * @param character usage:角色对象
         * @param useAnimationBudget usage:是否开启或关闭角色动画预算分配器
         * @param useWave usage:该参数现已弃用
         */
        static setOptimization(character: mw.Character, useAnimationBudget: boolean, useWave: boolean): void;
        /**
         * @groups 设置
         * @description 设置角色形象细节层次，0 表示  自动切换。 1， 2， 3 表示 3个等级，Level1细节最多。
         * @param character usage:角色对象
         * @param level usage:Lod等级：0 表示  自动切换。 1， 2， 3 表示 3个等级 range:[0, 3] type: 整形
         * @effect 只在客户端调用生效
         */
        static setAvatarForcedLOD(character: mw.Character, level: number): void;
        /**
        * @groups 设置
        * @description 获取角色形象细节层次，0 表示  自动切换。 1， 2， 3 表示 3个等级，Level1细节最多。
        * @param character usage:角色对象
        * @return level usage:Lod等级：0 表示  自动切换。 1， 2， 3 表示 3个等级
        * @effect 只在客户端调用生效
        */
        static getAvatarForcedLOD(character: mw.Character): number;
    }
}

declare namespace mw {
    /**
     * @author junwen.hua
     * @groups 设置
     * @description 重力模式
     */
    enum GravityMode {
        /** 默认模式。重力大小为-1600 */
        Default = 0,
        /** 经典模式。重力大小为-700 */
        Classic = 1,
        /** 现实模式。重力大小为-980 */
        Realistic = 2,
        /** 动作模式。重力大小为-500 */
        Action = 3,
        /** 自定义模式。重力大小自定义 */
        Custom = 4
    }
    /**
     * @author junwen.hua
     * @groups 设置
     * @description 环境设置
     * @effect 只在客户端调用生效
     * @networkStatus usage:客户端
     * @example
     * 使用示例:创建一个名为"ClassExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在服务器Log中看到对应方法调用信息。代码如下：
     * ```ts
     * @Component
     * export default class ClassExample extends Script {
     *
     *     protected onStart(): void {
     *         this.RoomSettings();
     *     }
     *
     *     public RoomSettings(){
     *         let gra = EnvironmentSettings.getGravity();
     *         console.log("当前重力大小：" + gra);
     *
     *         //设置重力模式
     *         let mode = EnvironmentSettings.getGravityMode();
     *     }
     * }
     * ```
     */
    class EnvironmentSettings {
        /**
         * @author junwen.hua
         * @groups 设置
         * @description 获取当前重力模式
         * @effect 只在客户端调用生效
         * @returns 重力模式。如果返回值为undefined，请检查是否在客户端调用或者是否设置重力模式
         */
        static getGravityMode(): GravityMode;
        /**
         * @author junwen.hua
         * @groups 设置
         * @description 获取当前重力大小
         * @effect 只在客户端调用生效
         * @returns 重力大小。如果返回值为undefined，请检查是否在客户端调用或者是否设置重力大小
         */
        static getGravity(): number;
        /**
           * @author junwen.hua
           * @description 设置世界整体膨胀时间速度
           * @groups 设置
           * @effect 调用端自动广播
           * @param timeDilation usage:膨胀时间速度   <br> type: 浮点数。 <br> range: 世界整体膨胀时间速度默认为 1。当膨胀时间速度设置小于 1 时，世界中所有对象的整体运行时间会开始变慢。膨胀时间速度最小值为 0.2。
           *              单机模式可以将膨胀设置为 0 达到时间暂停的效果。
           */
        static setGlobalTimeDilation(timeDilation: number): void;
        /**
         * @author jun.zhang
         * @description 获取死亡边界高度，range: [-50000, 50000]。开启死亡边界高度功能后，角色掉落到死亡边界之下会进入死亡状态并重生，其他对象会销毁
         * @groups 设置
         * @effect 调用端生效
         */
        static get deathBoundaryHeight(): number;
        /**
         * @author jun.zhang
         * @description 是否开启死亡边界。启用后死亡边界高度限制才会生效
         * @groups 设置
         * @effect 调用端生效
         */
        static get deathBoundaryEnabled(): boolean;
    }
}

declare namespace mw {
    /**
     * @author mengyuan.hao
     * @description  图片画质设置
     * @groups 设置
     * @networkStatus usage:客户端
     * @example
     * 使用示例:创建一个名为"ClassExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在服务器Log中看到对应方法调用信息。代码如下：
     * ```ts
     * @Component
     * export default class ClassExample extends Script {
     *
     *    protected onStart(): void {
     *        this.RoomSettings();
     *    }
     *
     *    public RoomSettings(){
     *        //设置CPU和GPU的画质等级
     *        let cpu = mw.GraphicsLevel.Low1;
     *        let gpu = mw.GraphicsLevel.Low2;
     *        GraphicsSettings.setGraphicsCPULevel(cpu);
     *        GraphicsSettings.setGraphicsGPULevel(gpu);
     *        //开启自动分辨率
     *        GraphicsSettings.setAutoScreenPercentage(true);
     *        //设置FSR抗锯齿等级
     *        GraphicsSettings.setFSRLevel(3);
     *        //设置锐化程度
     *        GraphicsSettings.setSharpness(1);
     *
     *        //获取当前CPU画质等级
     *        let cpulevel = GraphicsSettings.getCPULevel();
     *        //获取当前GPU画质等级
     *        let gpulevel = GraphicsSettings.getGPULevel();
     *        //获取默认CPU画质等级
     *        let Defaultcpulevel = GraphicsSettings.getDefaultCPULevel();
     *        //获取默认GPU画质等级
     *        let Defaultcgpulevel = GraphicsSettings.getDefaultGPULevel();
     *        //获取当前自动分辨率开启状态
     *        GraphicsSettings.getAutoScreenPercentage();
     *        //获取当前FSR抗锯齿等级
     *        GraphicsSettings.getFSRLevel();
     *        //获取当前锐化程度
     *        GraphicsSettings.getSharpness();
     *    }
     * }
     * ```
     */
    class GraphicsSettings {
        /**
         * @author xiangkun.sun,mengyuan.hao
         * @description  获取当前CPU画质等级
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 030 reason:接口废弃 replacement:
         * @groups 设置
         * @effect 只在客户端调用生效
         * @returns 画质等级。如果返回值为undefined，请检查是否在客户端调用
         */
        static getCPULevel(): mw.GraphicsLevel;
        /**
         * @author xiangkun.sun,mengyuan.hao
         * @description  获取当前GPU画质等级
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 030 reason:接口废弃 replacement:
         * @groups 设置
         * @effect 只在客户端调用生效
         * @returns 画质等级。如果返回值为undefined，请检查是否在客户端调用
         */
        static getGPULevel(): mw.GraphicsLevel;
        /**
         * @author xiangkun.sun,mengyuan.hao
         * @description 获取默认CPU画质等级
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 030 reason:接口废弃 replacement:
         * @groups 设置
         * @effect 只在客户端调用生效
         * @returns 默认画质等级。如果返回值为undefined，请检查是否在客户端调用
         */
        static getDefaultCPULevel(): mw.GraphicsLevel;
        /**
         * @author xiangkun.sun,mengyuan.hao
         * @description 获取默认GPU画质等级
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 030 reason:接口废弃 replacement:
         * @groups 设置
         * @effect 只在客户端调用生效
         * @returns 默认画质等级。如果返回值为undefined，请检查是否在客户端调用
         */
        static getDefaultGPULevel(): mw.GraphicsLevel;
        /**
         * @author xiangkun.sun,mengyuan.hao
         * @description 设置CPU和GPU的画质等级
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 030 reason:接口废弃 replacement:
         * @effect 只在客户端调用生效
         * @param CPULevel usage:CPU画质等级
         * @param GPULevel usage:GPU画质等级
         * @precautions 移动端设置的值不可超过自身默认值+2的等级且不可超过Type.GraphicsLevel.Cinematic2,否则设置的值超过会被强制转为最大限制值
         */
        static setGraphicsLevel(CPULevel: mw.GraphicsLevel, GPULevel: mw.GraphicsLevel): void;
        /**
         * @author xiangkun.sun
         * @description 设置当前CPU画质等级
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 030 reason:接口废弃 replacement:
         * @groups 设置
         * @effect 只在客户端调用生效
         * @param CPULevel usage:CPU画质等级
         */
        static setGraphicsCPULevel(CPULevel: mw.GraphicsLevel): void;
        /**
         * @author xiangkun.sun
         * @description 设置当前GPU画质等级
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 030 reason:接口废弃 replacement:
         * @groups 设置
         * @effect 只在客户端调用生效
         * @param GPULevel usage:GPU画质等级
         */
        static setGraphicsGPULevel(GPULevel: mw.GraphicsLevel): void;
        /**
         * @author xiangkun.sun
         * @description 设置是否开启自动分辨率
         * @groups 设置
         * @effect 只在客户端调用生效
         * @param isEnabled usage:开关
         */
        static setAutoScreenPercentage(isEnabled: boolean): void;
        /**
         * @author xiangkun.sun
         * @description 设置TSR等级
         * @groups 设置
         * @effect 只在客户端调用生效
         * @param FSRLevel usage:FSR等级 type: 整形 range: 无
         */
        static setFSRLevel(FSRLevel: number): void;
        /**
         * @author xiangkun.sun
         * @description 设置锐化程度
         * @groups 设置
         * @effect 只在客户端调用生效
         * @param sharpness usage:锐化程度 range:[0, 1] type: 浮点型
         */
        static setSharpness(sharpness: number): void;
        /**
         * @author xiangkun.sun
         * @description 获取自动分辨率开关状态
         * @groups 设置
         * @effect 只在客户端调用生效
         * @returns 获取自动分辨率开关状态。如果返回值为undefined，请检查是否在客户端调用
         */
        static getAutoScreenPercentage(): boolean;
        /**
         * @author xiangkun.sun
         * @description 获取FSR画质等级
         * @groups 设置
         * @effect 只在客户端调用生效
         * @returns 获取FSR画质等级。如果返回值为undefined，请检查是否在客户端调用
         */
        static getFSRLevel(): number;
        /**
         * @author xiangkun.sun
         * @description 获取锐化程度
         * @groups 设置
         * @effect 只在客户端调用生效
         * @returns 获取锐化程度。如果返回值为undefined，请检查是否在客户端调用
         */
        static getSharpness(): number;
        /**
         * @description 获取是否开启遮挡剔除(遮挡剔除开启后能一定程度上降低DrawCall，具体效果取决于场景物体相互遮挡的程度, 但是可能会导致物体从被剔除切换到不被剔除时延迟3帧才渲染)
         * @effect 只在客户端调用生效
         * @returns 当前是否开启遮挡剔除。如果返回值为undefined，请检查是否在客户端调用
         */
        static get occlusionCullingEnabled(): boolean;
        /**
         * @description 设置遮挡剔除(遮挡剔除开启后能一定程度上降低DrawCall，具体效果取决于场景物体相互遮挡的程度, 但是可能会导致物体从被剔除切换到不被剔除时延迟3帧才渲染)
         * @effect 只在客户端调用生效
         * @param isEnabled usage:是否开启遮挡剔除
         */
        static set occlusionCullingEnabled(isEnabled: boolean);
    }
}

declare namespace mw {
    /**
     * @author xiangkun.sun
     * @groups 设置
     * @description 全局的脚本配置信息
     * @networkStatus usage:双端
     * @example
     * 使用示例:创建一个名为"ClassExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在Log中看到对应方法调用信息。代码如下：
     * ```ts
     * @Component
     * export default class ClassExample extends Script {
     *
     *     protected onStart(): void {
     *        this.ScriptingSettings();
     *     }
     *
     *     public ScriptingSettings(): void {
     *         // 设置当前异步查找超时时间
     *         ScriptingSettings.setGlobalAsyncTimeout(1000 * 10);
     *     }
     * }
     * ```
     */
    class ScriptingSettings {
        /**
         * @author xiangkun.sun
         * @description 设置异步回调超时时间
         * @groups 设置
         * @effect 调用端生效
         * @param timeout usage: 超时时间  <br> type: 浮点数。 <br> range: 单位毫秒，默认10000(10秒)。
         * @example
         * 使用示例:调用方法
         * ```
         * ScriptingSettings.setGlobalAsyncTimeout(1000 * 10);
         * const obj = await GameObject.asyncFindGameObjectById("场景中的物体Guid");
         * ```
         */
        static setGlobalAsyncTimeout(timeout: number): void;
    }
}

declare namespace mw {
    /**
     * @author mengyuan.hao
     * @description  房间设置
     * @groups 设置
     * @networkStatus usage:服务端
     * @example
     * 使用示例:创建一个名为"ClassExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，你将在服务器Log中看到对应方法调用信息。代码如下：
     * ```ts
     * @Component
     * export default class ClassExample extends Script {
     *
     *     protected onStart(): void {
     *          this.RoomSettings();
     *     }
     *
     *     @mw.RemoteFunction(mw.Server)
     *     public RoomSettings(){
     *         //设置玩家是否可以中途加入游戏
     *         RoomSettings.enableJoiningMidgame(true);
     *
     *         let joinPeople = RoomSettings.isJoiningMidgameEnabled();
     *         console.log("玩家是否可以中途加入游戏：" + joinPeople);
     *
     *         let players = RoomSettings.getMaxPlayers();
     *         console.log("游戏中玩家数量上限是：" + players + "人。");
     *
     *         let resEnable = RoomSettings.isPlayerReserveEnabled();
     *         console.log("服务器预留玩家是否开启：" + resEnable);
     *
     *         let resPlayers = RoomSettings.getReservedPlayers();
     *         console.log("服务器预留玩家数量是：" + resPlayers + "人。");
     *     }
     * }
     * ```
     */
    class RoomSettings {
        /**
         * @author xiangkun.sun,mengyuan.hao
         * @groups 设置
         * @description 设置中途加入开关
         * @effect 只在服务端调用生效
         * @param isEnable usage:-true:开启中途加入 -false:关闭中途加入
         */
        static enableJoiningMidgame(isEnable: boolean): void;
        /**
         * @author xiangkun.sun,mengyuan.hao
         * @groups 设置
         * @description 获取是否开启中途加入
         * @effect 只在服务端调用生效
         * @returns true:开启中途加入 false:关闭中途加入。如果返回值为undefined，请检查是否在服务端调用
         */
        static isJoiningMidgameEnabled(): boolean;
        /**
         * @author mengyuan.hao
         * @groups 设置
         * @description 获取玩家数量上限
         * @effect 只在服务端调用生效
         * @returns DS房间玩家数量上限。如果返回值为undefined，请检查是否在服务端调用或者玩家数量上限是否为空
         */
        static getMaxPlayers(): number;
        /**
         * @author mengyuan.hao
         * @groups 设置
         * @description 获取服务器预留玩家是否开启
         * @effect 只在服务端调用生效
         * @returns 预留玩家功能是否开启。如果返回值为undefined，请检查是否在服务端调用或者预留玩家是否为空
         */
        static isPlayerReserveEnabled(): boolean;
        /**
         * @author mengyuan.hao
         * @groups 设置
         * @description 获取服务器预留玩家数量
         * @effect 只在服务端调用生效
         * @returns 服务器预留玩家数量。如果返回值为undefined，请检查是否在服务端调用或者预留玩家数量是否为空
         */
        static getReservedPlayers(): number;
    }
}
