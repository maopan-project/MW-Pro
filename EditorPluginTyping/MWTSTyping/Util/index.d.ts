declare namespace mw {
    /**
     * @author xiangkun.sun
     * @description 数据文件获取工具
     * @groups 工具
     * @networkStatus usage:双端
     */
    class DataFile {
        /**
         * @author xiangkun.sun
         * @description 判断配置是否存在
         * @precautions 文件名不合法将返回false，文件名称要求为a-z、A-Z、0-9、_
         * @effect 调用端生效
         * @param fileName usage: 配置文件的文件名 range: 依据文件名长度而定
         * @returns 配置是否存在
         * @example
         * 使用示例:创建一个名为"DataFileExample"的脚本，并挂载到一个物体上。代码如下：
         * ```
         * @Component
         * export default class DataFileExample extends Script {
         *     protected onStart(): void {
         *         let exists = DataFile.exist("level2_3");
         *         console.log(`exists: ${exists}`);
         *     }
         * }
         * ```
         */
        static exists(fileName: string): boolean;
        /**
         * @author xiangkun.sun
         * @description 读取配置
         * @precautions 配置文件不存在或文件名不合法将返回空字符串
         * @effect 调用端生效
         * @param fileName usage: 配置文件的文件名 range: 依据文件名长度而定
         * @returns 配置内容
         * @example
         * 使用示例:创建一个名为"DataFileExample"的脚本，并挂载到一个物体上。代码如下：
         * ```
         * @Component
         * export default class DataFileExample extends Script {
         *     protected async onStart(): Promise<void> {
         *         let data = await DataFile.asyncLoad("level2_3");
         *         console.log(`data: ${data}`);
         *     }
         * }
         * ```
         */
        static asyncLoad(fileName: string): Promise<string>;
    }
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author xiangkun.sun
     * @description 资源管理工具
     * @description 在使用左侧工具栏中的资源时，需要预先下载并加载。
     * @description 可使用asyncDownloadAsset接口在代码中动态下载对应资源。也可将资源手动拖入编辑器右边优先加载队列中。
     * @groups 工具
     * @networkStatus usage:双端
     */
    class AssetUtil {
        /**
         * @groups 工具
         * @author xiangkun.sun
         * @groups 基础类型
         * @description 资源是否加载
         * @effect 调用端生效
         * @param InAssetId usage:资源 ID  range: 字符串大小依据资源 ID 而定
         * @returns 未加载将返回 false
         * @example
         * 使用示例:创建一个名为AssetExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出7711资源id是否加载的情况，并且会在资源加载完成后在原点处生成一个楼梯
         * ```
         * @Component
         * export default class AssetExample extends Script {
         *
         *     protected onStart(): void {
         *         const cubeAssetId = "7711";
         *         if (AssetUtil.assetLoaded(cubeAssetId)) {
         *             console.log("AssetExample: Cube asset is already loaded.");
         *             let obj = GameObject.spawn({ guid: cubeAssetId });
         *             obj.worldTransform.position = new Vector(0, 0, 0);
         *         } else {
         *             console.log("AssetExample: Cube asset is not loaded, downloading...");
         *             AssetUtil.asyncDownloadAsset(cubeAssetId).then(() => {
         *                 let obj = GameObject.spawn({ guid: cubeAssetId });
         *                 obj.worldTransform.position = new Vector(0, 0, 0);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static assetLoaded(InAssetId: string): boolean;
        /**
         * @groups 工具
         * @author xiangkun.sun
         * @description 资源下载并加载
         * @description 此函数只能传入资源 ID
         * @groups 基础类型
         * @effect 调用端生效
         * @param InAssetId usage:资源 ID range: 字符串大小依据资源 ID 而定
         * @returns 下载失败将返回false
         * @example
         * 使用示例:创建一个名为AssetExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出7711资源id是否加载的情况，并且会在资源加载完成后在原点处生成一个楼梯
         * ```
         * @Component
         * export default class AssetExample extends Script {
         *
         *     protected onStart(): void {
         *         const cubeAssetId = "7711";
         *         if (AssetUtil.assetLoaded(cubeAssetId)) {
         *             console.log("AssetExample: Cube asset is already loaded.");
         *             let obj = GameObject.spawn({ guid: cubeAssetId });
         *             obj.worldTransform.position = new Vector(0, 0, 0);
         *         } else {
         *             console.log("AssetExample: Cube asset is not loaded, downloading...");
         *             AssetUtil.asyncDownloadAsset(cubeAssetId).then(() => {
         *                 let obj = GameObject.spawn({ guid: cubeAssetId });
         *                 obj.worldTransform.position = new Vector(0, 0, 0);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static asyncDownloadAsset(InAssetId: string): Promise<boolean>;
        /**
         * @groups 工具
         * @author qiming.jiang
         * @groups 基础类型
         * @description 判断材质资源是否为本地资源
         * @effect 调用端生效
         * @param InAssetId usage:资源 ID  range: 字符串大小依据资源 ID 而定
         * @returns 为真时本地资源
         * */
        static isLocalMaterialAsset(InAssetId: string): boolean;
    }
}

declare namespace mw {
    /**
     * @author jun.zhang
     * @description 游戏性能数据，辅助 Debug 和性能优化
     * @groups 工具
     * @networkStatus usage:双端
     */
    class DebugUtil {
        /**
         * @groups 工具
         * @description 帧时间是生成一帧游戏内容所花费的总时间。由于游戏线程和渲染线程在完成一帧之前保持同步，帧时往往接近其中一个线程中显示的时间。单位ms
         */
        static get frameTime(): number;
        /**
         * @groups 工具
         * @description 对象在游戏线程中消耗的时间，包括脚本，动画，游戏逻辑等。单位ms。如果帧时接近游戏线程中显示的时间，则游戏的性能很可能会受到游戏线程的阻碍。单位ms。
         */
        static get gameThreadTime(): number;
        /**
         * @groups 工具
         * @description 在渲染线程中处理这些对象的时间，受粒子，特效，网格等影响。单位ms。
         * @precautions 如果帧时接近Draw线程中显示的时间，则游戏的性能很可能会受到渲染线程的阻碍。单位ms。服务端该值为0。
         */
        static get renderThreadTime(): number;
        /**
         * @groups 工具
         * @description 当前使用的总内存大小，单位MB。
         */
        static get usedMemory(): number;
        /**
         * @groups 工具
         * @description 一秒内发出的网络包的总大小。单位 Byte
         */
        static get sentBytes(): number;
        /**
         * @groups 工具
         * @description 一秒内收到的网络包的总大小。单位 Byte。
         */
        static get receivedBytes(): number;
        /**
         * @groups 工具
         * @description 当前帧收到的RPC消息。
         */
        static get receivedRPCs(): string[];
        /**
         * @groups 工具
         * @description 当前帧发送的RPC消息。
         */
        static get sentRPCs(): string[];
        /**
         * @groups 工具
         * @description 当前帧缓存的RPC消息。
         */
        static get cachedRPCs(): string[];
    }
}

declare namespace mw {
    /**
     * @author jie.wu
     * @description 输入事件工具
     * @groups 输入
     * @networkStatus usage:双端
     * @example
     * 使用示例:创建一个名为"InputExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，点击键盘1键及屏幕，你将看到Input相关效果。代码如下：
     * ```
     * @Component
     * export default class InputExample extends Script {
     *     protected onStart(): void {
     *         InputUtil.onKeyDown(Keys.One, () => {
     *             console.error(`===>onKeyDown: Keys.One`);
     *         });
     *         InputUtil.onKeyUp(Keys.One, () => {
     *             console.error(`===>onKeyUp: Keys.One`);
     *         });
     *         InputUtil.onKeyPress(Keys.One, () => {
     *             console.error(`===>onKeyPress: Keys.One`);
     *         });
     *         InputUtil.onTouch((index: number, location: Vector2, touchType: TouchInputType) => {
     *             console.error(`===>onTouch: ${index}, ${location}, ${touchType}`);
     *         });
     *         InputUtil.onTouchBegin((index: number, location: Vector2, touchType: TouchInputType) => {
     *             console.error(`===>onTouchBegin: ${index}, ${location}, ${touchType}`);
     *         });
     *         InputUtil.onTouchMove((index: number, location: Vector2, touchType: TouchInputType) => {
     *             console.error(`===>onTouchMove: ${index}, ${location}, ${touchType}`);
     *         });
     *         InputUtil.onTouchEnd((index: number, location: Vector2, touchType: TouchInputType) => {
     *             console.error(`===>onTouchEnd: ${index}, ${location}, ${touchType}`);
     *         });
     *     }
     * }
     * ```
     */
    class InputUtil {
        /**
         * @author jie.wu
         * @description 键盘输入事件-点击
         * @groups 输入
         * @effect 调用端生效
         * @param Key usage:按键值
         * @param listener usage:监听回调
         * @returns 返回一个事件监听器
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出F键是否被按下的情况
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             console.log("F key pressed");
         *         })
         *     }
         *
         * }
         * ```
         */
        static onKeyDown(Key: mw.Keys, listener: () => void): mw.EventListener;
        /**
         * @author jie.wu
         * @description 键盘输入事件-抬起
         * @groups 输入
         * @effect 调用端生效
         * @param Key usage:按键值
         * @param listener usage:监听回调
         * @returns 返回一个事件监听器
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出F键是否被抬起的情况
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         InputUtil.onKeyUp(Keys.F, () => {
         *             console.log("F key up");
         *         })
         *     }
         *
         * }
         * ```
         */
        static onKeyUp(Key: mw.Keys, listener: () => void): mw.EventListener;
        /**
         * @author jie.wu
         * @description 键盘输入事件-按压
         * @groups 输入
         * @effect 调用端生效
         * @param Key usage:按键值
         * @param listener usage:监听回调
         * @returns 返回一个事件监听器
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出F键是否被按压的情况
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         InputUtil.onKeyPress(Keys.F, () => {
         *             console.log("F key up");
         *         })
         *     }
         * }
         * ```
         */
        static onKeyPress(Key: mw.Keys, listener: () => void): mw.EventListener;
        /**
         * @author jie.wu
         * @description 获取是否允许通过快捷方式切换鼠标的使用组合模式
         * @groups 输入
         * @effect 只在客户端调用生效
         * @returns 是否可切换
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以切换shift键是否可以控制光标显示
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，修改shift是否可控制光标显示
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.enableCursorLock(!InputUtil.isCursorLockEnabled());
         *         })
         *     }
         *
         * }
         * ```
         */
        static get isCursorLockEnabled(): boolean;
        /**
         * @author jie.wu
         * @description 设置是开启光标锁功能，开启后可以按shift键切换光标是否显示。
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param isEnableMouseLock usage:是否开始shift键功能,此函数不会直接设置鼠标状态
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以切换shift键是否可以控制光标显示
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，修改shift是否可控制光标显示
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.enableCursorLock = !InputUtil.isCursorLockEnabled;
         *         })
         *     }
         *
         * }
         * ```
         */
        static set isCursorLockEnabled(isEnableMouseLock: boolean);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason: 删除接口 replacement: 使用isCursorLockEnabled
         * @author jie.wu
         * @description 设置是开启光标锁功能，开启后可以按shift键切换光标是否显示。
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param isEnableMouseLock usage:是否开始shift键功能,此函数不会直接设置鼠标状态
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以切换shift键是否可以控制光标显示
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，修改shift是否可控制光标显示
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.enableCursorLock = !InputUtil.isCursorLockEnabled;
         *         })
         *     }
         *
         * }
         * ```
         */
        static set enableCursorLock(isEnableMouseLock: boolean);
        /**
         * @author jie.wu
         * @description 获取鼠标指针是否可见
         * @groups 输入
         * @effect 只在客户端调用生效
         * @returns 是否可见
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以切换鼠标是否可见
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，显示/隐藏鼠标
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.setCursorVisible(!InputUtil.isCursorVisible());
         *         })
         *     }
         *
         * }
         * ```
         */
        static get isCursorVisible(): boolean;
        /**
         * @author jie.wu
         * @description 设置鼠标指针是否可见
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param isVisible usage:是否可见
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以切换鼠标是否可见
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，显示/隐藏鼠标
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.setCursorVisible = !InputUtil.isCursorVisible;
         *         })
         *     }
         *
         * }
         * ```
         */
        static set isCursorVisible(isVisible: boolean);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason: 删除接口 replacement: 使用isCursorVisible
         * @author jie.wu
         * @description 设置鼠标指针是否可见
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param isVisible usage:是否可见
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以切换鼠标是否可见
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，显示/隐藏鼠标
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.setCursorVisible = !InputUtil.isCursorVisible;
         *         })
         *     }
         *
         * }
         * ```
         */
        static set setCursorVisible(isVisible: boolean);
        /**
         * @author jie.wu
         * @description 设置鼠标指针是否可以自由移动或是被锁定
         * @groups 输入
         * @effect 只在客户端调用生效
         * @returns 鼠标指针是否可以自由移动或是被锁定
         */
        static get isLockMouse(): boolean;
        /**
         * @author jie.wu
         * @description 决定玩家的鼠标是否可以自由移动或是被锁定
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param b usage:false 自由移动 true:锁定
         */
        static set isLockMouse(b: boolean);
        /**
         * @author baolin.li
         * @description 玩家鼠标移动镜头的灵敏度
         * @groups 输入
         * @effect 只在客户端调用生效
         * @returns  玩家鼠标移动镜头的灵敏度
         */
        static get mouseSensitivity(): number;
        /**
         * @author baolin.li
         * @description 设置玩家鼠标移动镜头的灵敏度
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param InRange usage:更改鼠标移动镜头的灵敏度 range:0.1~10
         */
        static set mouseSensitivity(InRange: number);
        /**
         * @author jie.wu
         * @description 玩家是否可以使用shift,切换鼠标锁定状态
         * @groups 输入
         * @effect 只在客户端调用生效
         * @returns 是否可以让玩家用shift切换鼠标状态
         */
        static get mouseLockOptionEnabled(): boolean;
        /**
         * @author jie.wu
         * @description 玩家是否可以使用shift,切换鼠标锁定状态
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param b usage:如果为True，玩家在游戏中按下鼠标锁定按键（默认shift）后，玩家可以自行切换鼠标锁定状态
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以通过shift锁定鼠标，按下G键，不可以通过shift锁定鼠标
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，可以通过shift锁定鼠标
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.mouseLockOptionEnabled = true;
         *         })
         *         //按下G键，不可以通过shift锁定鼠标
         *         InputUtil.onKeyDown(Keys.G, () => {
         *             InputUtil.mouseLockOptionEnabled = false;
         *         })
         *     }
         * }
         * ```
         */
        static set mouseLockOptionEnabled(b: boolean);
        /**
         * @author jie.wu
         * @description 获取鼠标指针是否锁定
         * @groups 输入
         * @effect 只在客户端调用生效
         * @returns 是否锁定
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以切换鼠标是否锁定，锁定后鼠标不可出到游戏窗口外
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，锁定/解锁鼠标
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.setCursorLocked(!InputUtil.isCursorLocked());
         *         })
         *     }
         *
         * }
         * ```
         */
        static get isCursorLocked(): boolean;
        /**
         * @author jie.wu
         * @description 设置鼠标指针是否锁定
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param isLock usage:是否锁定
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以切换鼠标是否锁定，锁定后鼠标不可出到游戏窗口外
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，锁定/解锁鼠标
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.setCursorLocked = !InputUtil.isCursorLocked;
         *         })
         *     }
         *
         * }
         * ```
         */
        static set isCursorLocked(isLock: boolean);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason: 删除接口 replacement: 使用isCursorLocked
         * @author jie.wu
         * @description 设置鼠标指针是否锁定
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param isLock usage:是否锁定
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以切换鼠标是否锁定，锁定后鼠标不可出到游戏窗口外
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，锁定/解锁鼠标
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.setCursorLocked = !InputUtil.isCursorLocked;
         *         })
         *     }
         *
         * }
         * ```
         */
        static set setCursorLocked(isLock: boolean);
        /**
         * @author jie.wu
         * @description 设置鼠标指针是否能与UI交互
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param canInteract usage:可交互
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以切换鼠标是否可与屏幕UI交互，不可交互时，点击跳跃按钮无效
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，修改鼠标是否可与屏幕UI交互
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.enableCursorInteractWithUI(!InputUtil.isCursorInteractiveWithUI());
         *         })
         *     }
         *
         * }
         * ```
         */
        static set isCursorInteractiveWithUI(canInteract: boolean);
        /**
         * @author jie.wu
         * @description 获取鼠标指针是否能与 UI 交互
         * @groups 输入
         * @effect 只在客户端调用生效
         * @returns 是否能与 UI 交互
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以切换鼠标是否可与屏幕UI交互，不可交互时，点击跳跃按钮无效
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，修改鼠标是否可与屏幕UI交互
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.enableCursorInteractWithUI = !InputUtil.isCursorInteractiveWithUI;
         *         })
         *     }
         *
         * }
         * ```
         */
        static get isCursorInteractiveWithUI(): boolean;
        /**
         * @author jie.wu
         * @description 将二维屏幕位置转换为世界空间三维位置和方向
         * @groups 基础类型
         * @effect 调用端生效
         * @param screenX usage: 屏幕 X 轴坐标值 default:null range:不超过屏幕坐标，关于屏幕坐标详情请看 class Vector2   type: 浮点数
         * @param screenY usage: 屏幕 Y 轴坐标值 default:null range:不超过屏幕坐标，关于屏幕坐标详情请看 class Vector2   type: 浮点数
         * @returns 屏幕坐标转换结果
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下 F 键，可以在屏幕中心位置发出一条射线，射线方向为屏幕中心位置指向屏幕外1000米处
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             const result = InputUtil.convertScreenLocationToWorldSpace(960, 540);
         *             const startLoc = result.worldPosition;
         *             const dir = result.worldDirection;
         *             const endLoc = Vector.add(startLoc, dir.multiply(1000));
         *             mw.QueryUtil.lineTrace(startLoc, endLoc, true, true);
         *         })
         *     }
         *
         * }
         * ```
         */
        static convertScreenLocationToWorldSpace(screenX: number, screenY: number): mw.ConvertScreenResult;
        /**
         * @author jie.wu
         * @description 获取角色在世界中的位置，投射到屏幕上
         * @groups 输入
         * @effect 调用端生效
         * @param worldLocation usage: 世界坐标
         * @param playerViewportRelative usage: 这是否应该相对于播放器视口子区域（在分割屏幕中使用播放器附加的小部件或纵横比受限时有用）default:false
         * @returns 屏幕坐标转换结果，默认值为 Vector.ZERO
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以将按钮移动到玩家所在位置
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let btn = new ButtonUI();
         *         InputUtil.onKeyDown(Keys.F, async () => {
         *             let playerPos = Player.localPlayer.character.worldTransform.position;
         *             let result = InputUtil.projectWorldPositionToWidgetPosition(playerPos);
         *             if (result) {
         *                 btn.button.position = result.screenPosition;
         *             }
         *         })
         *     }
         *
         * }
         *
         * class ButtonUI {
         *     public button: StaleButton;
         *
         *     constructor(fun: Function = null) {
         *         this.creatUI(fun);
         *     }
         *
         *     private creatUI(fun: Function = null) {
         *         // 创建一个UI对象
         *         let ui = UserWidget.newObject();
         *         // 将UI添加到屏幕上
         *         ui.addToViewport(1);
         *         // 创建一个画布组件
         *         let rootCanvas = Canvas.newObject();
         *         rootCanvas.size = new Vector2(1920, 1080);
         *         rootCanvas.position = Vector2.zero;
         *         // 将Ui的根画布设置为rootCanvas
         *         ui.rootContent = rootCanvas;
         *         // 创建一个按钮
         *         this.button = StaleButton.newObject(rootCanvas);
         *         this.button.position = new Vector2(1700, 310);
         *         this.button.size = new Vector2(150, 50);
         *         this.button.text = "按下变红";
         *         this.button.transitionEnable = true;
         *         this.button.pressedImagColor = LinearColor.red;
         *         this.button.visibility = SlateVisibility.Visible;
         *
         *         this.button.onClicked.add(() => {
         *             if (fun) {
         *                 fun();
         *             }
         *         })
         *
         *     }
         * }
         * ```
         */
        static projectWorldPositionToWidgetPosition(worldLocation: mw.Vector, playerViewportRelative?: boolean): mw.ConvertScreenResult;
        /**
          * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 026 reason: 删除接口 replacement: 采用GameUI 控件接口addKey
          * @author jie.wu
          * @description 绑定按键
          * @groups 输入
          * @effect 只在客户端调用生效
          * @param  key usage:按键
          * @param  Widget usage:绑定的button
          * @example
          * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下空格键，可以看到按钮变红，5秒后空格键解绑
          * ```
          * @Component
          * export default class InputExample extends Script {
          *
          *     protected onStart(): void {
          *         if (!SystemUtil.isClient()) return;
          *         this.test();
          *     }
          *
          *     private async test(): Promise<void> {
          *         let btn = new ButtonUI();
          *         InputUtil.bindButton(Keys.SpaceBar, btn.button);
          *         setTimeout(() => {
          *             InputUtil.unbindButton(Keys.SpaceBar);
          *         }, 5000);
          *     }
          *
          * }
          *
          * class ButtonUI {
          *     public button: StaleButton;
          *
          *     constructor(fun: Function = null) {
          *         this.creatUI(fun);
          *     }
          *
          *     private creatUI(fun: Function = null) {
          *         // 创建一个UI对象
          *         let ui = UserWidget.newObject();
          *         // 将UI添加到屏幕上
          *         ui.addToViewport(1);
          *         // 创建一个画布组件
          *         let rootCanvas = Canvas.newObject();
          *         rootCanvas.size = new Vector2(1920, 1080);
          *         rootCanvas.position = Vector2.zero;
          *         // 将Ui的根画布设置为rootCanvas
          *         ui.rootContent = rootCanvas;
          *         // 创建一个按钮
          *         this.button = StaleButton.newObject(rootCanvas);
          *         this.button.position = new Vector2(1700, 310);
          *         this.button.size = new Vector2(150, 50);
          *         this.button.text = "按下变红";
          *         this.button.transitionEnable = true;
          *         this.button.pressedImagColor = LinearColor.red;
          *         this.button.visibility = SlateVisibility.Visible;
          *
          *         this.button.onClicked.add(() => {
          *             if (fun) {
          *                 fun();
          *             }
          *         })
          *
          *     }
          * }
          * ```
          */
        static bindButton(key: mw.Keys, Widget: mw.StaleButton | mw.Button): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason: 删除接口 replacement:采用GameUI 控件接口removeKey
         * @author jie.wu
         * @description 此操作只会解绑动态绑定的按键无法解除editor下绑定的按键
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param  key usage:解除绑定的按键
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下空格键，可以看到按钮变红，5秒后空格键解绑
         * ```ts
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let btn = new ButtonUI();
         *         InputUtil.bindButton(Keys.SpaceBar, btn.button);
         *         setTimeout(() => {
         *             InputUtil.unbindButton(Keys.SpaceBar);
         *         }, 5000);
         *     }
         *
         * }
         *
         * class ButtonUI {
         *     public button: StaleButton;
         *
         *     constructor(fun: Function = null) {
         *         this.creatUI(fun);
         *     }
         *
         *     private creatUI(fun: Function = null) {
         *         // 创建一个UI对象
         *         let ui = UserWidget.newObject();
         *         // 将UI添加到屏幕上
         *         ui.addToViewport(1);
         *         // 创建一个画布组件
         *         let rootCanvas = Canvas.newObject();
         *         rootCanvas.size = new Vector2(1920, 1080);
         *         rootCanvas.position = Vector2.zero;
         *         // 将Ui的根画布设置为rootCanvas
         *         ui.rootContent = rootCanvas;
         *         // 创建一个按钮
         *         this.button = StaleButton.newObject(rootCanvas);
         *         this.button.position = new Vector2(1700, 310);
         *         this.button.size = new Vector2(150, 50);
         *         this.button.text = "按下变红";
         *         this.button.transitionEnable = true;
         *         this.button.pressedImagColor = LinearColor.red;
         *         this.button.visibility = SlateVisibility.Visible;
         *
         *         this.button.onClicked.add(() => {
         *             if (fun) {
         *                 fun();
         *             }
         *         })
         *
         *     }
         * }
         * ```
         */
        static unbindButton(key: mw.Keys): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 026 reason: 删除接口 replacement: InputUtil.mouseLockOptionEnabled
         * @author jie.wu
         * @description 设置是否可以锁定鼠标
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param  can usage:是否可以锁定鼠标
         * @example
         * 使用示例:创建一个名为InputExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以通过shift锁定鼠标，按下G键，不可以通过shift锁定鼠标
         * ```
         * @Component
         * export default class InputExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //按下F键，可以通过shift锁定鼠标
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             InputUtil.setMouseLockable = true;
         *         })
         *         //按下G键，不可以通过shift锁定鼠标
         *         InputUtil.onKeyDown(Keys.G, () => {
         *             InputUtil.setMouseLockable = false;
         *         })
         *     }
         *
         * }
         * ```
         */
        static set setMouseLockable(can: boolean);
        /**
         * @author xiangkun.sun
         * @description 触摸事件
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param listener usage:监听回调
         * @returns 返回一个事件监听器
         */
        static onTouch(listener: (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => void): mw.EventListener;
        /**
         * @author xiangkun.sun
         * @description 触摸开始事件
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param listener usage:监听回调
         * @returns 返回一个事件监听器
         */
        static onTouchBegin(listener: (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => void): mw.EventListener;
        /**
         * @author xiangkun.sun
         * @description 触摸移动事件
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param listener usage:监听回调
         * @returns 返回一个事件监听器
         */
        static onTouchMove(listener: (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => void): mw.EventListener;
        /**
         * @author xiangkun.sun
         * @description 触摸结束事件
         * @groups 输入
         * @effect 只在客户端调用生效
         * @param listener usage:监听回调
         * @returns 返回一个事件监听器
         */
        static onTouchEnd(listener: (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => void): mw.EventListener;
        /**
         * @author jie.wu
         * @description 获取手指按下代理,不被UI等影响的输入事件
         * @groups 输入
         * @effect 只在客户端调用生效
         * @returns 返回手指按下时的代理
         */
        static onRawTouchBegin(): mw.MulticastDelegate<(FingerIndex: number, Position: mw.Vector2) => void>;
        /**
         * @author jie.wu
         * @description 获取手指滑动代理,不被UI等影响的输入事件
         * @groups 输入
         * @effect 只在客户端调用生效
         * @returns  返回手指滑动的代理
         */
        static onRawTouchMove(): mw.MulticastDelegate<(FingerIndex: number, Position: mw.Vector2) => void>;
        /**
         * @author jie.wu
         * @description 获取手指抬起代理,不被UI等影响的输入事件
         * @groups 输入
         * @effect 只在客户端调用生效
         * @returns  返回抬起手指时候的代理
         */
        static onRawTouchEnd(): mw.MulticastDelegate<(FingerIndex: number) => void>;
    }
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @description 触摸类型
     * @groups 输入
     */
    enum TouchInputType {
        /** 触摸开始 */
        TouchBegin = 0,
        /** 触摸移动 */
        TouchMove = 1,
        /** 触摸结束 */
        TouchEnd = 2
    }
    /**
     * @author baoqiang.han
     * @hidden
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:接口废弃 replacement:请使用InputUtil下的onTouchBegin、onTouchMove、onTouchEnd接口
     * @groups 输入
     * @description 玩家从可触摸设备获取的数据信息，包含触摸手指数量，触摸位置(屏幕像素)和当前触摸状态(点击/滑动/离开)
     * @example
         * 使用示例:创建一个名为"InputInputExample"的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，触摸屏幕，你将看从Log看到相关结果。代码如下：
         * ```
         * @Component
         * export default class TouchInputExample extends Script {
         *     protected onStart(): void {
         *          let touch = new TouchInputUtil();
         *          touch.onTouchBegin.add((index, location, state) => {
         *          console.log("TouchBegin", index, location.toString(), state);
         *          });
         *          touch.onTouchMove.add((index, location, state) => {
         *          console.log("TouchMove", index, location.toString(), state);
         *          });
         *          touch.onTouchEnd.add((index, location, state) => {
         *          console.log("TouchEnd", index, location.toString(), state);
         *          });
         *     }
         * }
         * ```
         */
    class TouchInputUtil {
        private static instance;
        static getInstance(): TouchInputUtil;
        listeners: Array<mw.EventListener>;
        addListener(listener: mw.EventListener): void;
        /**
         * @description 触摸事件
         */
        onTouch: mw.MulticastDelegate<(index: number, location: mw.Vector2, touchType: TouchInputType) => void>;
        /**
         * @description 触摸开始事件
         */
        onTouchBegin: mw.MulticastDelegate<(index: number, location: mw.Vector2, touchType: TouchInputType) => void>;
        /**
         * @description 触摸移动事件
         */
        onTouchMove: mw.MulticastDelegate<(index: number, location: mw.Vector2, touchType: TouchInputType) => void>;
        /**
         * @description 触摸结束事件
         */
        onTouchEnd: mw.MulticastDelegate<(index: number, location: mw.Vector2, touchType: TouchInputType) => void>;
        /**
         * @author baoqiang.han
         * @description 设置玩家控制器，使用前需调用一次
         * @effect 只在客户端调用生效
         */
        setPlayerController(): void;
        /**
            /**
             * @author baoqiang.han
             * @description 获取屏幕手指数的数组
             * @effect 只在客户端调用生效
             * @returns 当前Touch数组
             */
        getTouchVectorArray(): Array<mw.Vector>;
    }
}

declare namespace mw {
    /**
     * @author xiaobo.qi
     * @description 多语言工具
     * @groups 工具
     * @networkStatus usage:双端
     */
    class LanguageUtil {
        /**
         * @groups 工具
         * @author xiaobo.qi
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason: 接口废弃 replacement: LanguageUtil.addKey("");
         * @description 多语言标记
         * @effect 只在客户端调用生效
         * @param textkey usage:用户多语言配置表收集的 Key range: 不做限制
         * @return 返回Key，此函数只用于做翻译文本收集标识。
         */
        static locText(textkey: string): string;
        /**
         * @groups 工具
         * @author xiaobo.qi
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason: 接口废弃 replacement: LanguageUtil.getText("key");
         * @description 根据key获取翻译内容
         * @effect 只在客户端调用生效
         * @param textkey usage:需要查找的翻译的 key range: 不做限制
         * @return 返回Key对应的当前语言环境的翻译内容
         */
        static getLocTextValue(textkey: string): string;
        /**
         * @groups 工具
         * @author xiaobo.qi
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason: 接口废弃 replacement: LanguageUtil.setLanguage(Type);
         * @description 游戏语言设置
         * @effect 只在客户端调用生效
         * @param type usage:切换游戏语言种类
         * @return true修改成功 false修改失败
         */
        static useLocalizedLanguage(type: mw.LanguageType): boolean;
        /**
                 * @groups 工具
                 * @author xiaobo.qi
                 * @description 多语言标记
                 * @effect 只在客户端调用生效
                 * @param textkey usage:用户多语言配置表收集的 Key range: 不做限制
                 * @return 返回Key，此函数只用于做翻译文本收集标识。
                 */
        static addKey(textkey: string): string;
        /**
         * @groups 工具
         * @author xiaobo.qi
         * @description 根据key获取翻译内容
         * @effect 只在客户端调用生效
         * @param textkey usage:需要查找的翻译的 key range: 不做限制
         * @return 返回Key对应的当前语言环境的翻译内容
         */
        static getText(textkey: string): string;
        /**
         * @groups 工具
         * @author xiaobo.qi
         * @description 游戏语言设置
         * @effect 只在客户端调用生效
         * @param type usage:切换游戏语言种类
         * @return true修改成功 false修改失败
         */
        static setLanguage(type: mw.LanguageCodeType): boolean;
        /**
         * @author xiaobo.qi
         * @description 获取当前本地化语言
         * @groups 工具
         * @effect 只在客户端调用生效
         * @returns 语言枚举对象
         */
        static getlanguage(): mw.LanguageCodeType;
        /**
         * @author xiaobo.qi
         * @description 获取默认的语言和地区
         * @groups 工具
         * @effect 调用端生效
         * @returns 以IETF语言标签表示的字符串包含:ISO 639-1 两位字母语言码 (如, "zh");
可选ISO 15924 四位字母脚本码 (如, "Hans");
可选ISO 3166-1 国家码 (如, "CN")
         * @example
         * 使用示例:创建一个名为LocaleExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出默认的语言和地区
         * ```
         * @Component
         * export default class LocaleExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         const locale = LanguageUtil.getDefaultLocale();
         *         console.log(`locale: ${locale}`);
// zh-CN
         *     }
         * }
         * ```
         */
        static getDefaultLocale(): string;
    }
}

declare namespace mw {
    /**
     * @author xiaobo.qi
     * @description 本地化工具
     * @groups 工具
     * @networkStatus usage:双端
     */
    class LocaleUtil {
        /**
         * @author xiaobo.qi
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason: 接口废弃 replacement: LanguageUtil.getDefaultLocale;
         * @description 获取默认的语言和地区
         * @groups 工具
         * @effect 调用端生效
         * @returns 以IETF语言标签表示的字符串包含:ISO 639-1 两位字母语言码 (如, "zh");
可选ISO 15924 四位字母脚本码 (如, "Hans");
可选ISO 3166-1 国家码 (如, "CN")
         * @example
         * 使用示例:创建一个名为LocaleExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出默认的语言和地区
         * ```
         * @Component
         * export default class LocaleExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         const locale = LocaleUtil.getDefaultLocale();
         *         console.log(`locale: ${locale}`);
// zh-CN
         *     }
         * }
         * ```
         */
        static getDefaultLocale(): string;
    }
}

declare namespace mw {
    /**
     * @author xiangkun.sun
     * @description 数学库工具
     * @groups 工具
     * @networkStatus usage:双端
     */
    class MathUtil {
        /**
         * @author xiangkun.sun
         * @description 序列化/反序列化浮点值所要求的十进制精度 (double)
         */
        static DBL_DECIMAL_DIG: number;
        /**
         * @author xiangkun.sun
         * @description 文本的往返转换中保留而不会因舍入或溢出发生改变的的十进制位数 (double)
         */
        static DBL_DIG: number;
        /**
         * @author xiangkun.sun
         * @description 1 和大于 1 的最小浮点数之间的差值。(double)
         */
        static DBL_EPSILON: number;
        /**
         * @author xiangkun.sun
         * @description 指明类型是否支持非正规数值：-1 为不确定，0 为不支持，1 为支持。 (double)
         */
        static DBL_HAS_SUBNORM: number;
        /**
         * @author xiangkun.sun
        * @description 有效数字（尾数）的位数(double)
        */
        static DBL_MANT_DIG: number;
        /**
         * @author xiangkun.sun
         * @description 最大的有效浮点数的值（为正数），也即浮点数的最大值。(double)
         */
        static DBL_MAX: number;
        /**
         * @author xiangkun.sun
         * @description 分别为能够使 10 的该整数减一次幂为可表示的有限的最大正整数 (double)
         */
        static DBL_MAX_10_EXP: number;
        /**
         * @author xiangkun.sun
         * @description 最大二进制指数 (double)
         */
        static DBL_MAX_EXP: number;
        /**
         * @author xiangkun.sun
         * @description 最小规格化正数值 (double)
         */
        static DBL_MIN: number;
        /**
         * @author xiangkun.sun
         * @description 能够使 10 的该整数减一次幂为规格化的最小负整数 (double)
         */
        static DBL_MIN_10_EXP: number;
        /**
         * @author xiangkun.sun
         * @description 能够使FLT_RADIX 的该整数减一次幂为规格化的最小负整数 (double)
         */
        static DBL_MIN_EXP: number;
        /**
         * @author xiangkun.sun
         * @description 基数(进制)(double)
         */
        static DBL_RADIX: number;
        /**
         * @author xiangkun.sun
         * @description 最小正数值(double)
         */
        static DBL_TRUE_MIN: number;
        /**
         * @author xiangkun.sun
         * @description 序列化/反序列化浮点值所要求的十进制精度 (float)
         */
        static FLT_DECIMAL_DIG: number;
        /**
         * @author xiangkun.sun
         * @description 文本的往返转换中保留而不会因舍入或溢出发生改变的的十进制位数 (float)
         */
        static FLT_DIG: number;
        /**
         * @author xiangkun.sun
         * @description 1 和大于 1 的最小浮点数之间的差值。(float)
         */
        static FLT_EPSILON: number;
        /**
         * @author xiangkun.sun
         * @description 指明类型是否支持非正规数值：-1 为不确定，0 为不支持，1 为支持。
         */
        static FLT_HAS_SUBNORM: number;
        /**
         * @author xiangkun.sun
         * @description 算术结果中是否使用保护位(例如 0)
         */
        static FLT_GUARD: number;
        /**
         * @author xiangkun.sun
         * @description 有效数字（尾数）的位数 (float)
         */
        static FLT_MANT_DIG: number;
        /**
         * @author xiangkun.sun
         * @description 最大的有效浮点数的值(为正数)，也即浮点数的最大值。(float)
         */
        static FLT_MAX: number;
        /**
         * @author xiangkun.sun
         * @description 转换成十进制形式后，规格化浮点数的指数的最大值（为正数）。 (float)
         */
        static FLT_MAX_10_EXP: number;
        /**
         * @author xiangkun.sun
         * @description 最大二进制指数 (float)
         */
        static FLT_MAX_EXP: number;
        /**
         * @author xiangkun.sun
         * @description 最小正规值 (float)
         */
        static FLT_MIN: number;
        /**
         * @author xiangkun.sun
         * @description 最小十进制指数 (float)
         */
        static FLT_MIN_10_EXP: number;
        /**
         * @author xiangkun.sun
         * @description 最小二进制指数 (float)
         */
        static FLT_MIN_EXP: number;
        /**
         * @author xiangkun.sun
         * @description 指示应始终规范化浮点数。
         */
        static FLT_NORMALIZE: number;
        /**
         * @author xiangkun.sun
         * @description 基数(进制)(float)
         */
        static FLT_RADIX: number;
        /**
         * @author xiangkun.sun
         * @description 最小正数值 (float)
         */
        static FLT_TRUE_MIN: number;
        /**
         * @author xiangkun.sun
         * @description 角度转换弧度参数（Math.PI/180）
         */
        static D2R: number;
        /**
         * @author xiangkun.sun
         * @description 弧度转换角度参数
         */
        static R2D: number;
        /**
         * @author xiangkun.sun
         * @description 1/PI
         */
        static INV_PI: number;
        /**
         * @author xiangkun.sun
         * @description PI/2
         */
        static HALF_PI: number;
        /**
         * @author xiangkun.sun
         * @description 字节偏移
         */
        static SIGN_BIT: number;
        /**
         * @author xiangkun.sun
         * @description 所有大于或等于此值的单精度浮点数都没有小数
         */
        static FLOAT_NON_FRACTIONAL: number;
        /**
         * @author xiangkun.sun
         * @description 最小误差数
         */
        static EPSILON: number;
        /**
         * @author xiangkun.sun
         * @description 计算 sin 值
         * @groups 工具
         * @effect 调用端生效
         * @param a usage:待计算的数值 a  range: 数据大小不做限制  type: 浮点数
         * @returns sin值
         * @example
         * 使用示例:创建一个名为MathExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出sin值1。
         * ```
         * @Component
         * export default class MathExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     //输出弧度制的sin值
         *     private async test(): Promise<void> {
         *         let sin = MathUtil.sin(Math.PI / 2);
         *         console.log(`sin: ${sin}`);
         *     }
         * }
         * ```
         */
        static sin(a: number): number;
        /**
         * @author xiangkun.sun
         * @description 计算 cos 值
         * @groups 工具
         * @effect 调用端生效
         * @param a usage:待计算的数值 a  range: 数据大小不做限制  type: 浮点数
         * @returns cos值
         * @example
         * 使用示例:创建一个名为MathExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出cos值-1。
         * ```
         * @Component
         * export default class MathExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     //输出弧度制的cos值
         *     private async test(): Promise<void> {
         *         let cos = MathUtil.cos(Math.PI);
         *         console.log(`cos: ${cos}`);
         *     }
         * }
         * ```
         */
        static cos(a: number): number;
        /**
         * @author xiangkun.sun
         * @description 计算 tan 值
         * @groups 工具
         * @effect 调用端生效
         * @param a usage:待计算的数值 a  range: 数据大小不做限制  type: 浮点数
         * @returns tan值
         * @example
         * 使用示例:创建一个名为MathExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出Math.PI / 4的tan值。
         * ```
         * @Component
         * export default class MathExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     //输出弧度制的tan值
         *     private async test(): Promise<void> {
         *         let tan = MathUtil.tan(Math.PI / 4);
         *         console.log(`tan: ${tan}`);
         *     }
         * }
         * ```
         */
        static tan(a: number): number;
        /**
         * @author xiangkun.sun
         * @description 根据输入的度数返回弧度值
         * @groups 工具
         * @effect 调用端生效
         * @param a usage:度数  range: 数据大小不做限制  type: 浮点数
         * @returns 弧度值
         * @example
         * 使用示例:创建一个名为MathExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出180度角的弧度值。
         * ```
         * @Component
         * export default class MathExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let degree = 180;
         *         let radians = MathUtil.degreesToRadians(degree);
         *         console.log(`degreesToRadians: ${radians}`);
         *     }
         *
         * }
         * ```
         */
        static degreesToRadians(a: number): number;
        /**
         * @author xiangkun.sun
         * @description 根据输入的弧度值返回度数
         * @groups 工具
         * @effect 调用端生效
         * @param a usage:弧度值  <br>  range: 数据大小不做限制  type: 浮点数
         * @returns 度数
         * @example
         * 使用示例:创建一个名为MathExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出π的度数。
         * ```
         * @Component
         * export default class MathExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let radian = Math.PI;
         *         let degrees = MathUtil.radiansToDegrees(radian);
         *         console.log(`radiansToDegrees: ${degrees}`);
         *     }
         *
         * }
         * ```
         */
        static radiansToDegrees(a: number): number;
        /**
         * @author xiangkun.sun
         * @description 基于 alpha 在 数值a 和 数值b 之间线性插值
         * @groups 工具
         * @effect 调用端生效
         * @precautions alpha=0 时 数值 a 的 100% 和 alpha = 1 时 数值 b 的 100%
         * @param a usage:数值 a  range: 数据大小不做限制  type: 浮点数
         * @param b usage:数值 b  range: 数据大小不做限制  type: 浮点数
         * @param alpha usage:插值  <br> range: [0, 1]  type:浮点数
         * @returns 计算结果
         * @example
         * 使用示例:创建一个名为MathExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出1和10之间的中间值。
         * ```
         * @Component
         * export default class MathExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let lerp = MathUtil.lerp(1, 10, 0.5);
         *         console.log(`lerp: ${lerp}`);
         *     }
         *
         * }
         * ```
         */
        static lerp(a: number, b: number, alpha: number): number;
        /**
         * @author xiangkun.sun
         * @description 将传入的数值 a 限制在 min 与 max 范围内，超出部分自动舍弃
         * @groups 工具
         * @effect 调用端生效
         * @param a usage:数值 a  range: 数据大小不做限制  type: 浮点数
         * @param min usage:最小值  range: 数据大小不做限制 min < max  type: 浮点数
         * @param max usage:最大值  range: 数据大小不做限制 min < max  type: 浮点数
         * @returns 计算结果
         * @example
         * 使用示例:创建一个名为MathExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出20的最大值为10的值。
         * ```
         * @Component
         * export default class MathExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let clamp = MathUtil.clamp(20, 0, 10);
         *         console.log(`clamp: ${clamp}`);
         *     }
         *
         * }
         * ```
         */
        static clamp(a: number, min: number, max: number): number;
        /**
         * @author xiangkun.sun
         * @description 数值 x 除以数值 y 的余数
         * @groups 工具
         * @effect 调用端生效
         * @param x usage:数值 x  range: 数据大小不做限制  type: 浮点数
         * @param y usage:数值 y  range: 数据大小不做限制  type: 浮点数
         * @returns 数值x 除以 数值y 的余数
         * @example
         * 使用示例:创建一个名为MathExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出20除以3的余数。
         * ```
         * @Component
         * export default class MathExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let fmod = MathUtil.fmod(20, 3);
         *         console.log(`fmod: ${fmod}`);
         *     }
         *
         * }
         * ```
         */
        static fmod(x: number, y: number): number;
        /**
         * @author xiangkun.sun
         * @description 获取随机范围内浮点数[包含min, 不包含max)
         * @groups 工具
         * @effect 调用端生效
         * @param min usage:最小值  range: 数据大小不做限制  type: 浮点数
         * @param max usage:最大值  range: 数据大小不做限制  type: 浮点数
         * @returns 随机范围内的浮点数
         * @example
         * 使用示例:创建一个名为MathExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出1和10之间的随机浮点数。
         * ```
         * @Component
         * export default class MathExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let randomFloat = MathUtil.randomFloat(1, 10);
         *         console.log(`randomFloat: ${randomFloat}`);
         *     }
         *
         * }
         * ```
         */
        static randomFloat(min: number, max: number): number;
        /**
         * @author xiangkun.sun
         * @description 获取随机范围内整数[包含min, 不包含max)
         * @groups 工具
         * @effect 调用端生效
         * @param min usage:最小值  range: 数据大小不做限制  type: 整形
         * @param max usage:最大值  range: 数据大小不做限制  type: 整形
         * @returns 随机范围内的整数
         * @example
         * 使用示例:创建一个名为MathExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，日志会输出1和10之间的随机整数。
         * ```
         * @Component
         * export default class MathExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let randomInt = MathUtil.randomInt(1, 10);
         *         console.log(`randomInt: ${randomInt}`);
         *     }
         *
         * }
         * ```
         */
        static randomInt(min: number, max: number): number;
        /**
         * @author baoqiang.han
         * @description 判断终点位置是否处于起点位置在某一方向的一定角度内
         * @groups 玩法
         * @effect 调用端生效
         * @param StartLocation usage:起始位置
         * @param StartDirection usage:起始方向
         * @param TargetLocation usage:目标位置
         * @param Angle usage:检测角度  range:[-360,360]  type: 浮点数
         * @returns true，在角度范围内
         * @example
         * 使用示例: 如下示例原点X方向进行60度角的检测基本流程，假设目标位置（100,20,20）
         * ```ts
         * if(angleCheck(new mw.Vector(0,0,0), new mw.Vector(1,0,0), new mw.Vector(100,20,20), 60)) {
         * // 在范围内
         * }
         * else {
         * // 不在范围内
         * }
         * ```
         */
        static angleCheck(StartLocation: mw.Vector, StartDirection: mw.Vector, TargetLocation: mw.Vector, Angle: number): boolean;
        /**
         * @author yang.zheng
         * @description 判断浮点数是否近似相等
         * @groups 玩法
         * @effect 调用端生效
         * @param a usage:对比变量 a range: 数据大小不做限制 type: 浮点
         * @param b usage:对比变量 b range: 数据大小不做限制 type: 浮点
         * @param epsilon usage:判断精度 range: 数据大小不做限制 type: 浮点 default: MathUtil.EPSILON(1.e-7)
         * @returns true，两浮点数近似相等
         */
        static areFloatsEqual(a: number, b: number, epsilon?: number): boolean;
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
     * @author hao.huang
     * @groups 玩法/寻路系统
     * @description 寻路
     * @description 寻路就像是给游戏角色一张地图和一套指导，让它们知道如何从一个地方走到另一个地方，避开障碍物。
     * @description 想象一下，你在一个迷宫中，需要找到出口。寻路系统就是你的助手，告诉你应该往哪个方向走，以便最快地找到出口。
     * @description 在游戏中，角色需要在游戏世界中移动，而寻路功能帮助角色计算出最佳路径。它会考虑地图上的可行走区域和障碍物，然后找到一条避开障碍物、最短的路径来到目的地。
     * @description 寻路就像是一个聪明的导航系统。它会检查周围的地形，看看哪里是可以走的，哪里是被阻挡的。然后，它会计算出一条路径，告诉角色应该朝着哪个方向移动，以及在每个点上应该转向多少度。
     * @description 这样，角色就可以根据寻路给出的指引，沿着可行走的路径前进，避开障碍物，并最终到达目的地。
     * @description 如何使用寻路功能呢 ?
     * @description 左侧栏中寻路区域逻辑对象拖入场景中，可绘制出一个寻路区域，在此区域可实现寻路功能。
     * @description 运行时寻路数据并不是动态生成的，而是随项目发布的本地寻路数据，寻路数据在场景初始化完成后加载。
     * @description 当在设置项“寻路设置”中的动态寻路开启时，开启半动态寻路，仅可通过控制寻路修饰区，来达到运行时自定义的寻路效果。
     * @networkStatus usage:双端
     */
    class Navigation {
        /**
         * @author hao.huang
         * @groups 玩法/寻路系统
         * @description 查找起点与终点之间的最短移动路径，并以数组的方式返回主要路径点
         * @effect 调用端生效
         * @param startPos usage:起点
         * @param endPos usage:终点
         * @returns 主要路径点
         * @example
         * 使用示例:在场景中拖入一个寻路区域，坐标为（0， 0， 0），缩放为（50， 10， 3）.同时拖入三个缩放为（1，7，1）的立方体，并分别放置在坐标（400，-150，0），（1000, 150, 0)和（1700， -450，0）。最后拖入一个目标对象关闭碰撞后放置在坐标（2400，-400，0）。创建一个脚本挂载在目标对象下方。在脚本中复制下列"Example_Navigation_FindPath"的代码保存，运行游戏，按下按键”1“，角色寻路移动至目标位置，按下按键“2”，角色停止寻路。代码如下：
         * ```ts
         *  @Component
         *  export default class Example_Navigation_FindPath extends Script {
         *
         *      protected onStart(): void {
         *          // 下列逻辑仅在客户端执行
         *          if(SystemUtil.isClient()) {
         *              //获取目标对象
         *              let signs = this.gameObject;
         *              //获取当前玩家角色
         *              let myChara = Player.localPlayer.character;
         *
         *              //添加一个按键方法：按下按键“1”，生成角色寻路轨迹
         *              InputUtil.onKeyDown(Keys.One, () => {
         *                  let points = Navigation.findPath(myChara.worldTransform.position, signs.worldTransform.position);
         *                  points.forEach((v,i) => {
         *                      console.error("loc " + v);
         *                      GameObject.asyncSpawn("84121").then((obj: Model) => {
         *                          obj.worldTransform.position = v;
         *                          obj.worldTransform.scale = new Vector(0.2, 0.2, 0.2);
         *                          obj.setCollision(CollisionStatus.Off);
         *                      });
         *                  });
         *              });
         *          }
         *      }
         *  }
         * ```
         */
        static findPath(startPos: mw.Vector, endPos: mw.Vector): Array<mw.Vector>;
        /**
        * @author hao.huang
        * @description 寻路移动
        * @groups 玩法/寻路系统
        * @effect 调用端生效
        * @param relatedObject usage:寻路作用对象
        * @param position usage:目标位置
        * @param radius usage:距目标半径 default:0  range: 不做限制  type: 浮点型
        * @param OnSuccess usage:成功回调 default:null
        * @param OnFail usage:失败回调 default:null
        * @example
        * 使用示例: 在场景中拖入一个寻路区域，坐标为（0， 0， 0），缩放为（50， 10， 3）.同时拖入三个缩放为（1，7，1）的立方体，并分别放置在坐标（400，-150，0），（1000, 150, 0)和（1700， -450，0）。最后拖入一个目标对象关闭碰撞后放置在坐标（2400，-400，0）.创建一个脚本挂载在目标对象下方.在脚本中复制下列"Example_Navigation_NavigateTo"的代码保存，运行游戏，按下按键”1“，角色寻路移动至目标位置，按下按键“2”，角色停止寻路。代码如下：
        * ```ts
        * @Component
        *   export default class Example_Navigation_NavigateTo extends Script {
        *
        *       protected async onStart(): Promise<void> {
        *
        *           // 下列逻辑仅在客户端执行
        *           if(SystemUtil.isClient()) {
        *               //获取目标对象
        *               let signs = this.gameObject;
        *               //获取当前玩家角色
        *               let myChara = Player.localPlayer.character;
        *
        *               //添加一个按键方法：按下按键“1”，角色寻路至目标位置,并播放一个特效
        *               InputUtil.onKeyDown(Keys.One, () => {
        *                   Navigation.navigateTo(myChara, signs.worldTransform.position, 50, () => { EffectService.playOnGameObject("151570", myChara, {slotType: HumanoidSlotType.Rings})});
        *               });
        *
        *               //添加一个按键方法：按下按键“2”，角色停止寻路
        *               InputUtil.onKeyDown(Keys.Two, () => {
        *                   Navigation.stopNavigateTo(myChara);
        *               });
        *           }
        *       }
        *   }
        * ```
        */
        static navigateTo(relatedObject: mw.GameObject, position: mw.Vector, radius?: number, OnSuccess?: () => void, OnFail?: () => void): void;
        /**
         * @author hao.huang
         * @description 导航停止
         * @groups 玩法/寻路系统
         * @effect 调用端生效
         * @param relatedObject usage:寻路作用对象
         * @example
         * 使用示例:在场景中拖入一个寻路区域，坐标为（0， 0， 0），缩放为（50， 10， 3）.同时拖入三个缩放为（1，7，1）的立方体，并分别放置在坐标（400，-150，0），（1000, 150, 0)和（1700， -450，0）。最后拖入一个目标对象关闭碰撞后放置在坐标（2400，-400，0）.创建一个脚本挂载在目标对象下方.在脚本中复制下列"Example_Navigation_NavigateTo"的代码保存，运行游戏，按下按键”1“，角色寻路移动至目标位置，按下按键“2”，角色停止寻路。代码如下：
         * ```
         * @Component
         *   export default class Example_Navigation_NavigateTo extends Script {
         *
         *       protected async onStart(): Promise<void> {
         *
         *           // 下列逻辑仅在客户端执行
         *           if(SystemUtil.isClient()) {
         *               //获取目标对象
         *               let signs = this.gameObject;
         *               //获取当前玩家角色
         *               let myChara = Player.localPlayer.character;
         *
         *               //添加一个按键方法：按下按键“1”，角色寻路至目标位置,并播放一个特效
         *               InputUtil.onKeyDown(Keys.One, () => {
         *                   Navigation.navigateTo(myChara, signs.worldTransform.position, 50, () => { EffectService.playOnGameObject("151570", myChara, {slotType: HumanoidSlotType.Rings})});
         *               });
         *
         *               //添加一个按键方法：按下按键“2”，角色停止寻路
         *               InputUtil.onKeyDown(Keys.Two, () => {
         *                   Navigation.stopNavigateTo(myChara);
         *               });
         *           }
         *       }
         *   }
         * ```
         */
        static stopNavigateTo(relatedObject: mw.GameObject): void;
        /**
         * @author hao.huang
         * @groups 玩法/寻路系统
         * @description 跟随目标
         * @description 角色和客户端NPC在客户端调用时生效，双端在服务端调用时生效
         * @effect 调用端生效
         * @param relatedObject usage:寻路作用对象
         * @param target usage:被跟随目标
         * @param radius usage:距目标半径 default:0 range: 不做限制  type: 浮点型
         * @param OnSuccess usage:成功回调（当跟随到设定的目标范围内时触发——可多次） default:null
         * @param OnFail usage:失败回调（当跟随的目标消失或离开寻路区域范围触发——可多次） default:null
         * @returns 跟随请求是否成功
         * @example
         * 使用示例:在场景中拖入一个寻路区域，坐标为（0， 0， 0），缩放为（50， 10， 3）.同时拖入三个缩放为（1，7，1）的立方体，并分别放置在坐标（400，-150，0），（1000, 150, 0)和（1700， -450，0）。在坐标（2400，-400，0）处生成一个npc.创建一个脚本挂载在目标对象下.在脚本中复制下列"Example_Navigation_Follow"的代码保存，运行游戏，按下按键”1“，npc寻路跟随玩家，按下按键“2”，npc停止跟随。代码如下：
         * ```
         *  @Component
         *  export default class Example_Navigation_Follow extends Script {
         *
         *      protected async onStart(): Promise<void> {
         *
         *          // 下列逻辑仅在服务端执行
         *          if(SystemUtil.isServer()) {
         *              // 开启每帧周期函数
         *              this.useUpdate = true;
         *              // 生成NPC
         *              let npc = await Player.spawnDefaultCharacter().asyncReady();
         *              npc.worldTransform.position = new Vector(2400, -400, 130)
         *
         *              // 添加一个客户端事件”FOLLOW“的监听器，让npc寻路跟随客户端玩家角色（NPC寻路需要在服务器调用，玩家角色无法使用Follow）
         *              Event.addClientListener("FOLLOW", (player) => {
         *                  Navigation.follow(npc, player.character, 50, () => { EffectService.playOnGameObject("151570", npc, {slotType: HumanoidSlotType.Rings})});
         *              });
         *
         *              // 添加一个客户端事件”STOPFOLLOW“的监听器，让npc停止跟随
         *              Event.addClientListener("STOPFOLLOW", (player) => {
         *                  Navigation.stopFollow(npc);
         *              });
         *
         *          }
         *          // 下列逻辑仅在客户端执行
         *          if(SystemUtil.isClient()) {
         *
         *              //添加一个按键方法：按下按键“1”，向服务端发送”FOLLOW“事件
         *              InputUtil.onKeyDown(Keys.One, () => {
         *                  Event.dispatchToServer("FOLLOW");
         *              });
         *
         *              //添加一个按键方法：按下按键“2”，向服务端发送”STOPFOLLOW“事件
         *              InputUtil.onKeyDown(Keys.Two, () => {
         *                  Event.dispatchToServer("STOPFOLLOW");
         *              });
         *          }
         *      }
         *  }
         * ```
         */
        static follow(relatedObject: mw.GameObject, target: mw.GameObject, radius?: number, OnSuccess?: () => void, OnFail?: () => void): boolean;
        /**
         * @author hao.huang
         * @groups 玩法/寻路系统
         * @description 停止跟随
         * @description 角色和客户端NPC在客户端调用时生效，双端在服务端调用时生效
         * @effect 调用端生效
         * @param relatedObject usage:寻路作用对象
         * @example
         * 使用示例:在场景中拖入一个寻路区域，坐标为（0， 0， 0），缩放为（50， 10， 3）.同时拖入三个缩放为（1，7，1）的立方体，并分别放置在坐标（400，-150，0），（1000, 150, 0)和（1700， -450，0）。在坐标（2400，-400，0）处生成一个npc.创建一个脚本挂载在目标对象下.在脚本中复制下列"Example_Navigation_Follow"的代码保存，运行游戏，按下按键”1“，npc寻路跟随玩家，按下按键“2”，npc停止跟随。代码如下：
         * ```
         *  @Component
         *  export default class Example_Navigation_Follow extends Script {
         *
         *      protected async onStart(): Promise<void> {
         *
         *          // 下列逻辑仅在服务端执行
         *          if(SystemUtil.isServer()) {
         *              // 开启每帧周期函数
         *              this.useUpdate = true;
         *              // 生成NPC
         *              let npc = await Player.spawnDefaultCharacter().asyncReady();
         *              npc.worldTransform.position = new Vector(2400, -400, 130)
         *
         *              // 添加一个客户端事件”FOLLOW“的监听器，让npc寻路跟随客户端玩家角色（NPC寻路需要在服务器调用，玩家角色无法使用Follow）
         *              Event.addClientListener("FOLLOW", (player) => {
         *                  Navigation.follow(npc, player.character, 50, () => { EffectService.playOnGameObject("151570", npc, {slotType: HumanoidSlotType.Rings})});
         *              });
         *
         *              // 添加一个客户端事件”STOPFOLLOW“的监听器，让npc停止跟随
         *              Event.addClientListener("STOPFOLLOW", (player) => {
         *                  Navigation.stopFollow(npc);
         *              });
         *
         *          }
         *          // 下列逻辑仅在客户端执行
         *          if(SystemUtil.isClient()) {
         *
         *              //添加一个按键方法：按下按键“1”，向服务端发送”FOLLOW“事件
         *              InputUtil.onKeyDown(Keys.One, () => {
         *                  Event.dispatchToServer("FOLLOW");
         *              });
         *
         *              //添加一个按键方法：按下按键“2”，向服务端发送”STOPFOLLOW“事件
         *              InputUtil.onKeyDown(Keys.Two, () => {
         *                  Event.dispatchToServer("STOPFOLLOW");
         *              });
         *          }
         *      }
         *  }
         * ```
         */
        static stopFollow(relatedObject: mw.GameObject): void;
        /**
         * @author hao.huang
         * @groups 玩法/寻路系统
         * @description 自动寻找与目标点距离最近的可寻路位置
         * @effect 调用端生效
         * @param targetPoint usage:目的地位置
         * @param queryExtent usage:目的地搜索范围
         * @returns 范围内最近可寻路位置（null则未找到）
         * @example
         * 使用示例: 总资源库中拖入寻路区域于(0,0,0)位置处，并设置其缩放为(50,50,3)，拖入两个球体分别放置于(2940,1960,0)和(44,-3330,0)，再拖入一个正方体放置于(20,1020,0)，并设置其缩放为（12，1，1），创建一个默认脚本，复制下列代码于脚本中并保存，将脚本拖至Ground上，保存运行游戏，按脚本设置按键，即可看到效果
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *
         * protected async onStart(): Promise<void> {
         *     let player = Player.localPlayer;
         *     let NAVabox = await GameObject.asyncFindGameObjectById("12E74B24") as Model;
         *     let NAVasphere = await GameObject.asyncFindGameObjectById("05DD737A") as Model;
         *
         *     //自动寻找与目标点距离最近的可寻路位置
         *     InputUtil.onKeyDown(Keys.One,()=>{
         *         let TargetPoint = Navigation.getClosestReachablePoint(NAVabox.worldTransform.position,new Vector(500,500,10));
         *         if(TargetPoint == null){
         *             console.log(`寻路位置是个空的`);
         *         }else{
         *             Navigation.navigateTo(player.character,TargetPoint);
         *         }
         *     });
         * }
         *}
         * ```
         */
        static getClosestReachablePoint(targetPoint: mw.Vector, queryExtent: mw.Vector): mw.Vector;
        /**
         * @author hao.huang
         * @groups 玩法/寻路系统
         * @description 在指定位置限制半径内的可导航区域中生成一个随机可到达的位置
         * @effect 调用端生效
         * @param targetPoint usage:目的地位置
         * @param radius usage:半径范围  <br> range: 不限制   <br> type: 浮点数
         * @returns 范围内随机可到达位置（null则未找到）
         * @example
         * 使用示例: 总资源库中拖入寻路区域于(0,0,0)位置处，并设置其缩放为(50,50,3)，拖入两个球体分别放置于(2940,1960,0)和(44,-3330,0)，再拖入一个正方体放置于(20,1020,0)，并设置其缩放为（12，1，1），创建一个默认脚本，复制下列代码于脚本中并保存，将脚本拖至Ground上，保存运行游戏，按脚本设置按键，即可看到效果
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *
         * protected async onStart(): Promise<void> {
         *     let player = Player.localPlayer;
         *     let NAVabox = await GameObject.asyncFindGameObjectById("12E74B24") as Model;
         *     let NAVasphere = await GameObject.asyncFindGameObjectById("05DD737A") as Model;
         *
         *     //在指定位置限制半径内的可导航区域中生成一个随机可到达的位置
         *     InputUtil.onKeyDown(Keys.Two,()=>{
         *         let TargetPoint = Navigation.getRandomReachablePointInRadius(new mw.Vector(0,0,0),8000);
         *         if(TargetPoint == null){
         *             console.log(`寻路位置是个空的`);
         *         }else{
         *             Navigation.navigateTo(player.character,TargetPoint);
         *         }
         *     });
         * }
         *}
         * ```
         */
        static getRandomReachablePointInRadius(targetPoint: mw.Vector, radius: number): mw.Vector;
        /**
         * @author hao.huang
         * @groups 玩法/寻路系统
         * @description 判断两点连线上是否存在障碍或超出寻路区域范围
         * @effect 调用端生效
         * @param rayStart usage:起始点
         * @param rayEnd usage:结束点
         * @returns 是否两点连线存在障碍或超出范围
        * @example
         * 使用示例: 总资源库中拖入寻路区域于(0,0,0)位置处，并设置其缩放为(50,50,3)，拖入两个球体分别放置于(2940,1960,0)和(44,-3330,0)，再拖入一个正方体放置于(20,1020,0)，并设置其缩放为（12，1，1），创建一个默认脚本，复制下列代码于脚本中并保存，将脚本拖至Ground上，保存运行游戏，按脚本设置按键，即可看到效果
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         * protected async onStart(): Promise<void> {
         *     let player = Player.localPlayer;
         *     let NAVabox = await GameObject.asyncFindGameObjectById("12E74B24") as Model;
         *     let NAVasphere = await GameObject.asyncFindGameObjectById("05DD737A") as Model;
         *
         *     //判断两点连线上是否存在障碍或超出寻路区域范围
         *     InputUtil.onKeyDown(Keys.Three,()=>{
         *         let NavigationCAV = Navigation.navigationRaycast(new Vector(0,0,0),NAVasphere.worldTransform.position)
         *         console.log(`直线路径上是否有障碍：`,NavigationCAV);
         *     })
         * }
         *}
         * ```
         */
        static navigationRaycast(rayStart: mw.Vector, rayEnd: mw.Vector): boolean;
    }
}

declare namespace mw {
    /**
     * @hidden
     * @author jie.wu
     * @description NFT资产交易系统。
     * @groups 工具
     * @networkStatus usage:客户端
     */
    class NFTUtil {
        /**
         * @author jie.wu
         * @description 添加游戏币接口
         * @groups 服务/货币
         * @effect 只在客户端调用生效
         * @param Delegate usage:反馈添加是否成功的代理
         * @param Token usage:Token字符串
         * @param UserAccount usage:用户账户
         * @param CoinNum usage:游戏币数量
         * @param Note usage:注释
         * @param TimeOut usage:最大延迟时间
         */
        static addUserGameCoin(Delegate: mw.MulticastDelegate<(Content: string) => void>, Token: string, UserAccount: string, CoinNum: number, Note: string, TimeOut: number): void;
        /**
         * @author jie.wu
         * @description 减少游戏币接口
         * @groups 服务/货币
         * @effect 只在客户端调用生效
         * @param Delegate usage:反馈添加是否成功的代理
         * @param Token usage:Token字符串
         * @param UserAccount usage:用户账户
         * @param CoinNum usage:游戏币数量
         * @param Note usage:注释
         * @param TimeOut usage:最大延迟时间
         */
        static decreaseUserGameCoin(Delegate: mw.MulticastDelegate<(Content: string) => void>, Token: string, UserAccount: string, CoinNum: number, Note: string, TimeOut: number): void;
        /**
         * @author jie.wu
         * @description 查询账户的游戏币数量
         * @groups 服务/货币
         * @effect 只在客户端调用生效
         * @param Delegate usage:返回游戏币数量的代理
         * @param Account usage:用户账户
         * @param GameId usage:游戏ID  range:字符串长度依据 gameId 长度而定
         * @param TimeOut usage:最大延迟时间
         */
        static queryUserGameCoin(Delegate: mw.MulticastDelegate<(Content: string) => void>, Account: string, GameId: string, TimeOut: number): void;
        /**
         * @author jie.wu
         * @description 添加游戏币接口
         * @groups 服务/货币
         * @effect 只在客户端调用生效
         * @param Delegate usage:反馈添加是否成功的代理
         * @param Token usage:Token字符串
         * @param GameId usage:自定义游戏ID，不会再自动获取游戏ID，以传入的为准  range:字符串长度依据 gameId 长度而定
         * @param UserAccount usage:用户账号
         * @param CoinNum usage:游戏币数量
         * @param Note usage:注释
         * @param TimeOut usage:最大延迟时间
         */
        static addUserGameCoinWithGameID(Delegate: mw.MulticastDelegate<(Content: string) => void>, Token: string, GameId: string, UserAccount: string, CoinNum: number, Note: string, TimeOut: number): void;
        /**
         * @author jie.wu
         * @description 减少游戏币接口
         * @groups 服务/货币
         * @effect 只在客户端调用生效
         * @param Delegate usage:反馈添加是否成功的代理
         * @param Token usage:Token字符串
         * @param GameId usage:自定义游戏ID 不会再自动获取游戏ID 以传入的为准  range:字符串长度依据 gameId 长度而定
         * @param UserAccount usage:用户账号
         * @param CoinNum usage:游戏币数量
         * @param Note usage:注释
         * @param TimeOut usage:最大延迟时间
         */
        static decreaseUserGameCoinWithGameID(Delegate: mw.MulticastDelegate<(Content: string) => void>, Token: string, GameId: string, UserAccount: string, CoinNum: number, Note: string, TimeOut: number): void;
        /**
         * @author jie.wu
         * @description 查询账户的游戏币数量
         * @groups 服务/货币
         * @effect 只在客户端调用生效
         * @param Delegate usage:返回游戏币数量的代理
         * @param Account usage:用户账号
         * @param GameId usage:游戏ID  range:字符串长度依据 gameId 长度而定
         * @param TimeOut usage:最大延迟时间
         */
        static queryUserGameCoinWithGameID(Delegate: mw.MulticastDelegate<(Content: string) => void>, Account: string, GameId: string, TimeOut: number): void;
        /**
         * @author jie.wu
         * @description 添加游戏币接口
         * @groups 服务/货币
         * @effect 只在客户端调用生效
         * @param Delegate usage:反馈添加是否成功的代理
         * @param Token usage:Token字符串
         * @param GameId usage:自定义游戏ID 不会再自动获取游戏ID 以传入的为准  range:字符串长度依据 gameId 长度而定
         * @param UserAccount usage:用户账户
         * @param CoinNum usage:数量
         * @param Note usage:注释
         * @param TimeOut usage:最大延迟时间
         * @param Env  usage:环境,只要不为空那么一定会以写入的环境为主(不为online 其余皆为test)
         */
        static addUserGameCoinWithEnv(Delegate: mw.MulticastDelegate<(Content: string) => void>, Token: string, GameId: string, UserAccount: string, CoinNum: number, Note: string, TimeOut: number, Env: string): void;
        /**
         * @author jie.wu
         * @description 减少游戏币接口
         * @groups 服务/货币
         * @effect 只在客户端调用生效
         * @param Delegate usage:反馈添加是否成功的代理
         * @param Token usage:Token字符串
         * @param GameId usage:自定义游戏ID 不会再自动获取游戏ID 以传入的为准  range:字符串长度依据 gameId 长度而定
         * @param UserAccount usage:用户账户
         * @param CoinNum usage:数量
         * @param Note usage:注释
         * @param TimeOut usage:最大延迟时间
         * @param Env  usage:环境,只要不为空那么一定会以写入的环境为主(不为online 其余皆为test)
         */
        static decreaseUserGameCoinWithEnv(Delegate: mw.MulticastDelegate<(Content: string) => void>, Token: string, GameId: string, UserAccount: string, CoinNum: number, Note: string, TimeOut: number, Env: string): void;
        /**
         * @author jie.wu
         * @description 查询账户的游戏币数量
         * @groups 服务/货币
         * @effect 只在客户端调用生效
         * @param Delegate usage:返回游戏币数量的代理
         * @param Account usage:签名
         * @param GameId usage:游戏Id  range:字符串长度依据 gameId 长度而定
         * @param TimeOut usage:最大延迟时间
         * @param Env usage:环境
         */
        static queryUserGameCoinWithEnv(Delegate: mw.MulticastDelegate<(Content: string) => void>, Account: string, GameId: string, TimeOut: number, Env: string): void;
        /**
         * @author jie.wu
         * @description 查询 NFT 接口
         * @groups 服务/货币
         * @effect 只在客户端调用生效
         * @param Delegate usage:返回 NFT 账户数据，不是 200 也会返回相关错误
         * @param Account usage:账户
         * @param GameId usage:游戏ID  range:字符串长度依据 gameId 长度而定
         * @param TimeOut usage:最大延迟时间
         * @param Env usage:环境
         */
        static queryUserNFT(Delegate: mw.MulticastDelegate<(Content: string) => void>, Account: string, GameId: string, TimeOut: number, Env: string): void;
    }
}

declare namespace mw {
    /**
         * @author hao.huang
         * @groups 玩法/物理
         * @description 碰撞组
         * @networkStatus usage:双端
         */
    class PhysicsService {
        /**
         * @author hao.huang
         * @groups 玩法/物理
         * @description 设置俩碰撞组之间的碰撞关系(是否可发生碰撞)
         * @effect 调用端生效
         * @param group1 usage:碰撞组名1  range: 不限制
         * @param group2 usage:碰撞组名2  range: 不限制
         * @param collidable usage:是否可碰撞
         * @example
         * 使用示例: 在场景中创建一个名为CollisionGroup的脚本，并拖入场景中，并复制以下代码进入脚本。按下1和2会看到场景中生成了两个小球，并推动距离最近的小球去撞击另一个，会发现玩家可以与球体发生碰撞，但两个小球间可穿透。
         * ```ts
         * @Component
         * export default class CollisionGroup extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         PhysicsService.addCollisionGroup("GroupA");
         *         PhysicsService.addCollisionGroup("GroupB");
         *         PhysicsService.setCollisionBetweenGroups("GroupA", "GroupB", false);
         *
         *         // 创建模拟物理的球体A并设置碰撞组为GroupA
         *         InputUtil.onKeyDown(Keys.One, ()=>{
         *             this.serverCreateBall(new Vector(300, 0, 0), "GroupA", true);
         *         })
         *
         *         // 创建正常碰撞的球体B并设置碰撞组为GroupB
         *         InputUtil.onKeyDown(Keys.Two, ()=>{
         *             this.serverCreateBall(new Vector(600, 0, 0), "GroupB", false);
         *         })
         *     }
         *
         *     @mw.RemoteFunction(mw.Server)
         *     serverCreateBall(pos:Vector, Group:string, bPhysicsSimulate:boolean)
         *     {
         *         GameObject.asyncSpawn("197388", {replicates:true}).then((obj)=>{
         *             let ball  = obj as mw.Model;
         *             ball.worldTransform.position = pos;
         *             if (bPhysicsSimulate)
         *             {
         *                 ball.physicsEnabled = true;
         *                 ball.massEnabled = true;
         *                 ball.mass = 50;
         *             }
         *             ball.collisionGroup = Group;
         *         })
         *     }
         * }
         * ```
         */
        static setCollisionBetweenGroups(group1: string, group2: string, collidable: boolean): void;
        /**
         * @author hao.huang
         * @groups 玩法/物理
         * @description 获取两碰撞组之间的碰撞关系(是否可发生碰撞)
         * @effect 调用端生效
         * @param group1 usage:碰撞组名 1    range: 不限制
         * @param group2 usage:碰撞组名 2  range: 不限制
         * @returns 碰撞关系(是否可发生碰撞)
         * @example
         * 使用示例: 在场景中创建一个名为 CollisionGroup 的脚本，并拖入场景中，并复制以下代码进入脚本。按下 1 后可在编辑器窗口客户端内看到输出 "false"
         * ```ts
         * @Component
         * export default class CollisionGroup extends Script {
         *
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         PhysicsService.addCollisionGroup("GroupA");
         *         PhysicsService.addCollisionGroup("GroupB");
         *         PhysicsService.setCollisionBetweenGroups("GroupA", "GroupB", false);
         *
         *         // 创建模拟物理的球体A并设置碰撞组为GroupA
         *         InputUtil.onKeyDown(Keys.One, ()=>{
         *             console.log(PhysicsService.getCollisionBetweenGroups("GroupA", "GroupB"));
         *         })
         *     }
         * }
         * ```
         */
        static getCollisionBetweenGroups(group1: string, group2: string): boolean;
        /**
         * @author hao.huang
         * @groups 玩法/物理
         * @description 获取当前可剩余使用碰撞组数量
         * @effect 调用端生效
         * @returns 剩余可用碰撞组数量
         * @example
         * 使用示例: 在场景中创建一个名为 CollisionGroup 的脚本，并拖入场景中，并复制以下代码进入脚本。按下 1 后可在编辑器窗口客户端内看到输出 "8"
         * ```ts
         * @Component
         * export default class CollisionGroup extends Script {
         *
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         PhysicsService.addCollisionGroup("GroupA");
         *         PhysicsService.addCollisionGroup("GroupB");
         *         PhysicsService.setCollisionBetweenGroups("GroupA", "GroupB", false);
         *
         *         // 创建模拟物理的球体A并设置碰撞组为GroupA
         *         InputUtil.onKeyDown(Keys.One, ()=>{
         *             console.log(PhysicsService.getAvailableCollisionGroupsCount());
         *         })
         *     }
         * }
         * ```
         */
        static getAvailableCollisionGroupsCount(): number;
        /**
         * @author hao.huang
         * @groups 玩法/物理
         * @description 获取当前已添加的碰撞组名列表
         * @effect 调用端生效
         * @returns 当前已添加的碰撞组名列表
         * @example
         * 使用示例: 在场景中创建一个名为 CollisionGroup 的脚本，并拖入场景中，并复制以下代码进入脚本。按下1后可在编辑器窗口客户端内看到输出 "GroupA,GroupB"
         * ```ts
         * @Component
         * export default class CollisionGroup extends Script {
         *
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         PhysicsService.addCollisionGroup("GroupA");
         *         PhysicsService.addCollisionGroup("GroupB");
         *         PhysicsService.setCollisionBetweenGroups("GroupA", "GroupB", false);
         *
         *         // 创建模拟物理的球体A并设置碰撞组为GroupA
         *         InputUtil.onKeyDown(Keys.One, ()=>{
         *             console.log(PhysicsService.getValidCollisionGroups());
         *         })
         *     }
         * }
         * ```
         */
        static getValidCollisionGroups(): Array<string>;
        /**
         * @author hao.huang
         * @groups 玩法/物理
         * @description 检测碰撞组是否有效(已添加过)
         * @effect 调用端生效
         * @param name usage:碰撞组名      range: 不限制
         * @returns 碰撞组是否有效
         * @example
         * 使用示例:在场景中创建一个名为 CollisionGroup 的脚本，并拖入场景中，并复制以下代码进入脚本。按下 1 后可在编辑器窗口客户端内看到输出 "false"
         * ```ts
         * @Component
         * export default class CollisionGroup extends Script {
         *
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         PhysicsService.addCollisionGroup("GroupA");
         *         PhysicsService.addCollisionGroup("GroupB");
         *         PhysicsService.setCollisionBetweenGroups("GroupA", "GroupB", false);
         *
         *         // 创建模拟物理的球体A并设置碰撞组为GroupA
         *         InputUtil.onKeyDown(Keys.One, ()=>{
         *             console.log(PhysicsService.isCollisionGroupValid("GroupC"));
         *         })
         *     }
         * }
         * ```
         */
        static isCollisionGroupValid(name: string): boolean;
        /**
         * @author hao.huang
         * @groups 玩法/物理
         * @description 添加新碰撞组
         * @effect 调用端生效
         * @param name usage:碰撞组名  range: 不限制
         * @example
         * 使用示例:在场景中创建一个名为 CollisionGroup 的脚本，并拖入场景中，并复制以下代码进入脚本。按下 1 后可在编辑器窗口客户端内看到输出 "GroupA,GroupB,GroupC"
         * ```ts
         * @Component
         * export default class CollisionGroup extends Script {
         *
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         PhysicsService.addCollisionGroup("GroupA");
         *         PhysicsService.addCollisionGroup("GroupB");
         *         PhysicsService.setCollisionBetweenGroups("GroupA", "GroupB", false);
         *
         *         // 创建模拟物理的球体A并设置碰撞组为GroupA
         *         InputUtil.onKeyDown(Keys.One, ()=>{
         *             PhysicsService.addCollisionGroup("GroupC");
         *             console.log(PhysicsService.getValidCollisionGroups());
         *         })
         *     }
         * }
         * ```
         */
        static addCollisionGroup(name: string): void;
        /**
         * @author hao.huang
         * @groups 玩法/物理
         * @description 删除已有碰撞组
         * @effect 调用端生效
         * @param name usage:碰撞组名  range: 不限制
         * @example
         * 使用示例:在场景中创建一个名为 CollisionGroup 的脚本，并拖入场景中，并复制以下代码进入脚本。按下 1 后可在编辑器窗口客户端内看到输出"GroupB"
         * ```ts
         * @Component
         * export default class CollisionGroup extends Script {
         *
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         PhysicsService.addCollisionGroup("GroupA");
         *         PhysicsService.addCollisionGroup("GroupB");
         *         PhysicsService.setCollisionBetweenGroups("GroupA", "GroupB", false);
         *
         *         // 创建模拟物理的球体A并设置碰撞组为GroupA
         *         InputUtil.onKeyDown(Keys.One, ()=>{
         *             PhysicsService.deleteCollisionGroup("GroupA");
         *             console.log(PhysicsService.getValidCollisionGroups());
         *         })
         *     }
         *
         *
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
        static deleteCollisionGroup(name: string): void;
        /**
         * @author hao.huang
         * @groups 玩法/物理
         * @description 重命名碰撞组
         * @effect 调用端生效
         * @param previousName usage:碰撞组名  range: 不限制
         * @param newName usage:新碰撞组名  range: 不限制
         * @example
         * 使用示例:在场景中创建一个名为CollisionGroup的脚本，并拖入场景中，并复制以下代码进入脚本。按下1后可在编辑器窗口客户端内看到输出"GroupB,GroupC"
         * ```ts
         * @Component
         * export default class CollisionGroup extends Script {
         *
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         PhysicsService.addCollisionGroup("GroupA");
         *         PhysicsService.addCollisionGroup("GroupB");
         *         PhysicsService.setCollisionBetweenGroups("GroupA", "GroupB", false);
         *
         *         // 创建模拟物理的球体A并设置碰撞组为GroupA
         *         InputUtil.onKeyDown(Keys.One, ()=>{
         *             PhysicsService.renameCollisionGroup("GroupA","GroupC");
         *             console.log(PhysicsService.getValidCollisionGroups());
         *         })
         *     }
         *
         *
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
        static renameCollisionGroup(previousName: string, newName: string): void;
        /**
         * @author zhiqiang.tan
         * @groups 玩法/物理
         * @description 确定不同组中设置为不碰撞的模型是否在忽略碰撞的同时忽略touch事件
         * @effect 调用端生效
         * @param status usage:不同组中设置为不碰撞的模型是否在忽略碰撞的同时忽略touch事件  range: 不限制
         * @example
         * 使用示例:
         * 在场景中创建一个名为TouchesUseCollisionGroups的脚本，并拖入场景中，并复制以下代码进入脚本。
         * 依次按下1、2之后，会发现服务器会小球会调用onTouch函数并输出对应LOG。
         * ```ts
         * @Component
         * export default class TouchesUseCollisionGroups extends Script {
         *     // 当脚本被实例后，会在第一帧更新前调用此函数
         *     protected onStart(): void {
         *         PhysicsService.touchesUseCollisionGroups = true;
         *         PhysicsService.addCollisionGroup("GroupA");
         *         PhysicsService.addCollisionGroup("GroupB");
         *         PhysicsService.setCollisionBetweenGroups("GroupA", "GroupB", false);
         *
         *         // 创建正常碰撞的球体A并设置碰撞组为GroupA
         *         InputUtil.onKeyDown(Keys.One, ()=>{
         *             this.serverCreateBall(new Vector(300, 0, 0), "GroupA", false);
         *         })
         *
         *         // 创建模拟物理的球体B并设置碰撞组为GroupB
         *         InputUtil.onKeyDown(Keys.Two, ()=>{
         *             this.serverCreateBall(new Vector(300, 0, 100), "GroupB", true);
         *         })
         *     }
         *
         *     @mw.RemoteFunction(mw.Server)
         *     serverCreateBall(pos:Vector, Group:string, bPhysicsSimulate:boolean)
         *     {
         *         GameObject.asyncSpawn("197388", {replicates:true}).then((obj)=>{
         *             let ball  = obj as mw.Model;
         *             ball.worldTransform.position = pos;
         *             if (bPhysicsSimulate)
         *             {
         *                 ball.physicsEnabled = true;
         *                 ball.massEnabled = true;
         *                 ball.mass = 50;
         *             }
         *             ball.collisionGroup = Group;
         *             ball.onTouch.add((obj : GameObject) => {
         *                 console.log(`${obj.gameObjectId} - Touch - ${ball.gameObjectId}`);
         *             }
         *         );
         *         })
         *     }
         * }
         * ```
         */
        static set touchesUseCollisionGroups(status: boolean);
        /**
         * @description 确定不同组中设置为不碰撞的模型是否在忽略碰撞的同时忽略touch事件
         * @effect 调用端生效
         * @returns 不同组中设置为不碰撞的模型是否在忽略碰撞的同时忽略touch事件
         */
        static get touchesUseCollisionGroups(): boolean;
        /**
         * @author zhiqiang.tan
         * @groups 玩法/物理
         * @description 沿着给定的路径进行射线追踪，直到首次遇到阻挡命中时结束，返回沿途遇到的所有命中。
         * @effect 调用端生效
         * @param start usage: 起始点
         * @param end usage:终止点
         * @param collisionParams usage:空间查询碰撞参数
         * @param renderParams usage:空间查询渲染参数
         * @returns HitResult数组
         * @example
         * 使用示例: 如下示例展示使用矩形范围检测的基本流程
         * ```ts
         * const result = PhysicsService.lineTraceMulti(new mw.Vector(0,0,0), new mw.Vector(1000,0,0), {}, {});
         * for (const item of result) {
         *     // item:  检测结果。
         * }
         * ```
         */
        static lineTraceMulti(start: mw.Vector, end: mw.Vector, collisionParams: mw.CollisionQueryParams, renderParams: mw.RenderQueryParams): Array<mw.HitResult>;
        /**
         * @author zhiqiang.tan
         * @groups 玩法/物理
         * @description 沿着给定的路径进行射线追踪，并返回遇到的第一个阻挡命中。
         * @effect 调用端生效
         * @param start usage: 起始点
         * @param end usage:终止点
         * @param collisionParams usage:空间查询碰撞参数
         * @param renderParams usage:空间查询渲染参数
         * @returns HitResult
         * @example
         * 使用示例: 如下示例展示使用矩形范围检测的基本流程
         * ```ts
         * const result = PhysicsService.lineTraceSingle(new mw.Vector(0,0,0), new mw.Vector(1000,0,0), {}, {});
         * ```
         */
        static lineTraceSingle(start: mw.Vector, end: mw.Vector, collisionParams: mw.CollisionQueryParams, renderParams: mw.RenderQueryParams): mw.HitResult;
        /**
         * @author zhiqiang.tan
         * @groups 玩法/物理
         * @description 球体沿着给定的路径扫过一个空间，直到首次在起点球体空间之外遇到阻挡命中时结束（球体在起点时重叠的阻挡对象不包含在首次判定中），返回沿途遇到的所有命中。
         * @effect 调用端生效
         * @param start usage: 起始点
         * @param end usage:终止点
         * @param radius usage: 球形半径 range: 无 type: 浮点型
         * @param collisionParams usage:空间查询碰撞参数
         * @param renderParams usage:空间查询渲染参数
         * @returns HitResult数组
         * @example
         * 使用示例: 如下示例展示使用矩形范围检测的基本流程
         * ```ts
         * const result = PhysicsService.sphereTraceMulti(new mw.Vector(0,0,0), new mw.Vector(1000,0,0), 30, {}, {});
         * for (const item of result) {
         *     // item:  检测结果。
         * }
         * ```
         */
        static sphereTraceMulti(start: mw.Vector, end: mw.Vector, radius: number, collisionParams: mw.CollisionQueryParams, renderParams: mw.RenderQueryParams): Array<mw.HitResult>;
        /**
         * @author zhiqiang.tan
         * @groups 玩法/物理
         * @description 球体沿着给定的路径扫过一个空间，并返回遇到的第一个阻挡命中。
         * @effect 调用端生效
         * @param start usage: 起始点
         * @param end usage:终止点
         * @param radius usage: 球形半径 range: 无 type: 浮点型
         * @param collisionParams usage:空间查询碰撞参数
         * @param renderParams usage:空间查询渲染参数
         * @returns HitResult
         * @example
         * 使用示例: 如下示例展示使用矩形范围检测的基本流程
         * ```ts
         * const result = PhysicsService.sphereTraceSingle(new mw.Vector(0,0,0), new mw.Vector(1000,0,0), 30, {}, {});
         * ```
         */
        static sphereTraceSingle(start: mw.Vector, end: mw.Vector, radius: number, collisionParams: mw.CollisionQueryParams, renderParams: mw.RenderQueryParams): mw.HitResult;
        /**
         * @author zhiqiang.tan
         * @groups 玩法/物理
         * @description 胶囊体沿着给定的路径扫过一个空间，直到首次在起点胶囊体空间之外遇到阻挡命中时结束（胶囊体在起点时重叠的阻挡对象不包含在首次判定中），返回沿途遇到的所有命中。
         * @effect 调用端生效
         * @param start usage: 起始点
         * @param end usage:终止点
         * @param radius usage: 胶囊体半径 range: 无 type: 浮点型
         * @param halfHeight usage: 胶囊体半高 range: 无 type: 浮点型
         * @param collisionParams usage:空间查询碰撞参数
         * @param renderParams usage:空间查询渲染参数
         * @returns HitResult数组
         * @example
         * 使用示例: 如下示例展示使用矩形范围检测的基本流程
         * ```ts
         * const result = PhysicsService.capsuleTraceMulti(new mw.Vector(0,0,0), new mw.Vector(1000,0,0), 30, 80, {}, {});
         * for (const item of result) {
         *     // item:  检测结果。
         * }
         * ```
         */
        static capsuleTraceMulti(start: mw.Vector, end: mw.Vector, radius: number, halfHeight: number, collisionParams: mw.CollisionQueryParams, renderParams: mw.RenderQueryParams): Array<mw.HitResult>;
        /**
         * @author zhiqiang.tan
         * @groups 玩法/物理
         * @description 胶囊体沿着给定的路径扫过一个空间，并返回遇到的第一个阻挡命中。
         * @effect 调用端生效
         * @param start usage: 起始点
         * @param end usage:终止点
         * @param radius usage: 胶囊体半径 range: 无 type: 浮点型
         * @param halfHeight usage: 胶囊体半高 range: 无 type: 浮点型
         * @param collisionParams usage:空间查询碰撞参数
         * @param renderParams usage:空间查询渲染参数
         * @returns HitResult
         * @example
         * 使用示例: 如下示例展示使用矩形范围检测的基本流程
         * ```ts
         * const result = PhysicsService.capsuleTraceSingle(new mw.Vector(0,0,0), new mw.Vector(1000,0,0), 30, 80, {}, {});
         * ```
         */
        static capsuleTraceSingle(start: mw.Vector, end: mw.Vector, radius: number, halfHeight: number, collisionParams: mw.CollisionQueryParams, renderParams: mw.RenderQueryParams): mw.HitResult;
        /**
         * @author zhiqiang.tan
         * @groups 玩法/物理
         * @description 盒体沿着给定的路径扫过一个空间，直到首次在起点盒体空间之外遇到阻挡命中时结束（盒体在起点时重叠的阻挡对象不包含在首次判定中），返回沿途遇到的所有命中。
         * @effect 调用端生效
         * @param start usage: 起始点
         * @param end usage:终止点
         * @param halfSize usage: 盒形大小 range: 无
         * @param orientation usage: 旋转大小
         * @param collisionParams usage:空间查询碰撞参数
         * @param renderParams usage:空间查询渲染参数
         * @returns HitResult数组
         * @example
         * 使用示例: 如下示例展示使用矩形范围检测的基本流程
         * ```ts
         * const result = PhysicsService.boxTraceMulti(new mw.Vector(0,0,0), new mw.Vector(1000,0,0), new Vector(30, 30, 30), new Rotation(45, 45, 45), {}, {});
         * for (const item of result) {
         *     // item:  检测结果。
         * }
         * ```
         */
        static boxTraceMulti(start: mw.Vector, end: mw.Vector, halfSize: mw.Vector, orientation: mw.Rotation, collisionParams: mw.CollisionQueryParams, renderParams: mw.RenderQueryParams): Array<mw.HitResult>;
        /**
         * @author zhiqiang.tan
         * @groups 玩法/物理
         * @description 盒体沿着给定的路径扫过一个空间，并返回遇到的第一个阻挡命中。
         * @effect 调用端生效
         * @param start usage: 起始点
         * @param end usage:终止点
         * @param halfSize usage: 盒形大小 range: 无
         * @param orientation usage: 旋转大小
         * @param collisionParams usage:空间查询碰撞参数
         * @param renderParams usage:空间查询渲染参数
         * @returns HitResult
         * @example
         * 使用示例: 如下示例展示使用矩形范围检测的基本流程
         * ```ts
         * const result = PhysicsService.boxTraceSingle(new mw.Vector(0,0,0), new mw.Vector(1000,0,0), new Vector(30, 30, 30), new Rotation(45, 45, 45), {}, {});
         * ```
         */
        static boxTraceSingle(start: mw.Vector, end: mw.Vector, halfSize: mw.Vector, orientation: mw.Rotation, collisionParams: mw.CollisionQueryParams, renderParams: mw.RenderQueryParams): mw.HitResult;
        /**
         * @author zhiqiang.tan
         * @groups 玩法/物理
         * @description 返回一个与给定球体重叠的对象数组
         * @effect 调用端生效
         * @param spherePos usage:检测位置
         * @param sphereRadius usage:球半径 range: 无 type: 浮点型
         * @param collisionParams usage:碰撞查询渲染参数
         * @param renderParams usage:空间查询渲染参数
         * @returns GameObject数组
         * @example
         * 使用示例: 如下示例展示使用矩形范围检测的基本流程
         * ```ts
         * const result = PhysicsService.sphereOverlap(new mw.Vector(0,0,0), 30, {}, {});
         * for (const item of result) {
         *     // item:  检测结果。
         * }
         * ```
         */
        static sphereOverlap(spherePos: mw.Vector, sphereRadius: number, collisionParams: mw.CollisionQueryParams, renderParams: mw.RenderQueryParams): Array<mw.GameObject>;
        /**
         * @author zhiqiang.tan
         * @groups 玩法/物理
         * @description 返回一个与给定胶囊体重叠的对象数组
         * @effect 调用端生效
         * @param capsulePos usage:检测位置
         * @param radius usage: 胶囊体半径 range: 无 type: 浮点型
         * @param halfHeight usage:胶囊体半高 range: 无 type: 浮点型
         * @param collisionParams usage:碰撞查询渲染参数
         * @param renderParams usage:空间查询渲染参数
         * @returns GameObject数组
         * @example
         * 使用示例: 如下示例展示使用矩形范围检测的基本流程
         * ```ts
         * const result = PhysicsService.capsuleOverlap(new mw.Vector(0,0,0), 30, 80, {}, {});
         * for (const item of result) {
         *     // item:  检测结果。
         * }
         * ```
         */
        static capsuleOverlap(capsulePos: mw.Vector, radius: number, halfHeight: number, collisionParams: mw.CollisionQueryParams, renderParams: mw.RenderQueryParams): Array<mw.GameObject>;
        /**
         * @author zhiqiang.tan
         * @groups 玩法/物理
         * @description 返回一个与给定盒体重叠的对象数组
         * @effect 调用端生效
         * @param boxPos usage:检测位置
         * @param boxExtent usage:盒体大小
         * @param collisionParams usage:碰撞查询渲染参数
         * @param renderParams usage:空间查询渲染参数
         * @returns GameObject数组
         * @example
         * 使用示例: 如下示例展示使用矩形范围检测的基本流程
         * ```ts
         * const result = PhysicsService.boxOverlap(new mw.Vector(0,0,0), new Vector(30, 30, 30), {}, {});
         * for (const item of result) {
         *     // item:  检测结果。
         * }
         * ```
         */
        static boxOverlap(boxPos: mw.Vector, boxExtent: mw.Vector, collisionParams: mw.CollisionQueryParams, renderParams: mw.RenderQueryParams): Array<mw.GameObject>;
    }
}

declare namespace mw {
    /**
     * @author hao.huang
     * @groups 工具/射线检测
     * @description 射线检测工具
     * @networkStatus usage:双端
     */
    class QueryUtil {
        /**
         * @author hao.huang
         * @description 射线检测
         * @groups 玩法
         * @effect 调用端生效
         * @param start usage:起始位置
         * @param end usage:结束位置
         * @param multiTrace usage:是否穿透检测 default:false
         * @param drawDebug usage:是否可视化绘制 default:false
         * @param objectsToIgnore usage:屏蔽对象guid数组 default:[]  range: 不做限制
         * @param ignoreByType usage:是否按传入对象的类型进行屏蔽 default:false
         * @param traceSkeletonOnly usage:是否进行具体部位的检测 default:false
         * @param source usage:发起检测的对象（检测源不参与检测） default:null
         * @returns HitResult数组
         * @example
         * 使用示例: 如下示例展示使用射线检测的基本流程
         * ```ts
         * const ResultList = QueryUtil.lineTrace(new mw.Vector(0,0,0), new mw.Vector(300,0,0), true, false, [], false, gameObject, false);
         * for (const item of ResultList) {
         *     // item: 检测到的对象
         * }
         * ```
         */
        static lineTrace(start: mw.Vector, end: mw.Vector, multiTrace?: boolean, drawDebug?: boolean, objectsToIgnore?: Array<string>, ignoreByType?: boolean, traceSkeletonOnly?: boolean, source?: mw.GameObject): Array<mw.HitResult>;
        /**
         * @author hao.huang
         * @description 盒体射线检测
         * @groups 玩法
         * @effect 调用端生效
         * @param start usage:起始位置
         * @param end usage:结束位置
         * @param halfSize usage:盒体半长宽高
         * @param orientation usage:盒体朝向
         * @param multiTrace usage:是否穿透检测 default:false
         * @param drawDebug usage:是否可视化绘制 default:false
         * @param objectsToIgnore usage:屏蔽对象guid数组 default:[]  range: 不做限制
         * @param ignoreByType usage:是否按传入对象的类型进行屏蔽 default:false
         * @param source usage:发起检测的对象（检测源不参与检测） default:null
         * @returns HitResult数组
         * @example
         * 使用示例: 如下示例展示使用盒体射线检测的基本流程
         * ```ts
         * const ResultList = QueryUtil.boxTrace(new mw.Vector(0,0,0), new mw.Vector(300,0,0), new mw.Vector(10,10,10), new mw.Rotation(0,0,0), true, false, [], false, gameObject);
         * for (const item of ResultList) {
         *     // item: 检测到的对象
         * }
         * ```
         */
        static boxTrace(start: mw.Vector, end: mw.Vector, halfSize: mw.Vector, orientation: mw.Rotation, multiTrace?: boolean, drawDebug?: boolean, objectsToIgnore?: Array<string>, ignoreByType?: boolean, source?: mw.GameObject): Array<mw.HitResult>;
        /**
         * @author hao.huang
         * @description 球体射线检测
         * @groups 玩法
         * @effect 调用端生效
         * @param start usage:起始位置
         * @param end usage:结束位置
         * @param radius usage:球体半径  range: [0, +∞] 但是请使用合适的半径尺度。  type: 浮点型
         * @param multiTrace usage:是否穿透检测 default:false
         * @param drawDebug usage:是否可视化绘制 default:false
         * @param objectsToIgnore usage:屏蔽对象guid数组 default:[]  range: 不做限制
         * @param ignoreByType usage:是否按传入对象的类型进行屏蔽 default:false
         * @param source usage:发起检测的对象（检测源不参与检测） default:null
         * @returns HitResult数组
         * @example
         * 使用示例: 如下示例展示使用球体射线检测的基本流程
         * ```ts
         * const ResultList = QueryUtil.sphereTrace(new mw.Vector(0,0,0), new mw.Vector(300,0,0), 5, true, false, [], false, gameObject);
         * for (const item of ResultList) {
         *     // item: 检测到的对象
         * }
         * ```
         */
        static sphereTrace(start: mw.Vector, end: mw.Vector, radius: number, multiTrace?: boolean, drawDebug?: boolean, objectsToIgnore?: Array<string>, ignoreByType?: boolean, source?: mw.GameObject): Array<mw.HitResult>;
        /**
         * @author hao.huang
         * @description 胶囊体射线检测
         * @groups 玩法
         * @effect 调用端生效
         * @param start usage:起始位置
         * @param end usage:结束位置
         * @param radius usage:胶囊体半径  range: 不做限制，但是请使用合适的半径尺度。  type: 浮点型
         * @param halfHeight usage:胶囊体半高  range: 不做限制，但是请使用合适的尺度。  type: 浮点型
         * @param multiTrace usage:是否穿透检测 default:false
         * @param drawDebug usage:是否可视化绘制 default:false
         * @param objectsToIgnore usage:屏蔽对象guid数组 default:[] range: 不做限制
         * @param ignoreByType usage:是否按传入对象的类型进行屏蔽 default:false
         * @param source usage:发起检测的对象（检测源不参与检测） default:null
         * @returns HitResult数组
         * @example
         * 使用示例: 如下示例展示使用胶囊体射线检测的基本流程
         * ```ts
         * const ResultList = QueryUtil.capsuleTrace(new mw.Vector(0,0,0), new mw.Vector(300,0,0), 5, 10, true, false, [], false, gameObject);
         * for (const item of ResultList) {
         *     // item: 检测到的对象
         * }
         * ```
         */
        static capsuleTrace(start: mw.Vector, end: mw.Vector, radius: number, halfHeight: number, multiTrace?: boolean, drawDebug?: boolean, objectsToIgnore?: Array<string>, ignoreByType?: boolean, source?: mw.GameObject): Array<mw.HitResult>;
        /**
         * @author hao.huang
         * @description 胶囊体范围检测
         * @groups 玩法
         * @effect 调用端生效
         * @param capsuleCenter usage:胶囊体中心位置
         * @param radius usage:胶囊体半径  range: 不做限制，但是请使用合适的半径尺度。  type: 浮点型
         * @param halfHeight usage:胶囊体半高  range: 不做限制，但是请使用合适的尺度。  type: 浮点型
         * @param drawDebug usage:是否可视化绘制 default:false
         * @param objectsToIgnore usage:屏蔽对象的GUID数组 default:[]  range: 不做限制
         * @param ignoreByType usage:是否按传入对象的类型进行屏蔽 default:false
         * @param source usage:发起检测的对象（检测源不参与检测） default:null
         * @returns GameObject数组
         * @example
         * 使用示例: 如下示例展示使用圆柱范围检测的基本流程
         * ```ts
         * const ResultList = QueryUtil.capsuleOverlap(new mw.Vector(0,0,0), 100, false, [], false, gameObject);
         * for (const item of ResultList) {
         *     // item: 检测到的对象
         * }
         * ```
         */
        static capsuleOverlap(capsuleCenter: mw.Vector, radius: number, halfHeight: number, drawDebug?: boolean, objectsToIgnore?: Array<string>, ignoreByType?: boolean, source?: mw.GameObject): Array<mw.GameObject>;
        /**
         * @author hao.huang
         * @groups 玩法
         * @description 球形范围检测
         * @effect 调用端生效
         * @param sphereCenter usage:球体中心位置
         * @param sphereRadius usage:球体半径  range: 不做限制，但是请使用合适的半径尺度。 type: 浮点型
         * @param drawDebug usage:是否可视化绘制 default:false
         * @param objectsToIgnore usage:屏蔽对象的GUID数组 default:[]  range:不做限制
         * @param ignoreByType usage:是否按传入对象的类型进行屏蔽 default:false
         * @param source usage:发起检测的对象（检测源不参与检测） default:null
         * @returns GameObject数组
         * @example
         * 使用示例: 如下示例展示使用球形范围检测的基本流程
         * ```ts
         * const ResultList = QueryUtil.sphereOverlap(new mw.Vector(0,0,0), 100, false, [], false, gameObject);
         * for (const item of ResultList) {
         *     // item: 检测到的对象
         * }
         * ```
         */
        static sphereOverlap(sphereCenter: mw.Vector, sphereRadius: number, drawDebug?: boolean, objectsToIgnore?: Array<string>, ignoreByType?: boolean, source?: mw.GameObject): Array<mw.GameObject>;
        /**
         * @author hao.huang
         * @groups 玩法
         * @description 矩形范围检测
         * @effect 调用端生效
         * @param boxCenter usage:矩形中心位置
         * @param boxExtent usage:盒体的大小
         * @param drawDebug usage:是否可视化绘制 default:false
         * @param objectsToIgnore usage:屏蔽对象的GUID数组 default:[]  range:不做限制
         * @param ignoreByType usage:是否按传入对象的类型进行屏蔽 default:false
         * @param source usage:发起检测的对象（检测源不参与检测） default:null
         * @returns GameObject数组
         * @example
         * 使用示例: 如下示例展示使用矩形范围检测的基本流程
         * ```ts
         * const goList = QueryUtil.boxOverlap(new mw.Vector(0,0,0), new mw.Vector(1000,0,0), true);
         * for (const item of goList) {
         *     // item: 检测到的对象
         * }
         * ```
         */
        static boxOverlap(boxCenter: mw.Vector, boxExtent: mw.Vector, drawDebug?: boolean, objectsToIgnore?: Array<string>, ignoreByType?: boolean, source?: mw.GameObject): Array<mw.GameObject>;
    }
}

declare namespace mw {
    /**
     * @author baoqiang.han
     * @groups 工具
     * @description 屏幕视口工具
     * @networkStatus usage:客户端
     */
    class ScreenUtil {
        /**
         * @author baoqiang.han
         * @description 获取视口相应位置的物体
         * @groups 玩法
         * @effect 只在客户端调用生效
         * @param sceneX usage:视口坐标 X  range:不超过屏幕坐标，关于屏幕坐标详情请看 class Vector2   type: 浮点数
         * @param sceneY usage:视口坐标 Y  range:不超过屏幕坐标，关于屏幕坐标详情请看 class Vector2   type: 浮点数
         * @param distance usage:检测距离 default:100000  range: 不做限制，type: 浮点数
         * @param multiTrace usage:是否获取多个GameObject default:false
         * @param onRay usage:是否开启射线显示效果 default:false
         * @returns 点击位置的物体
         * @example
         * 使用示例:创建一个名为ScreenExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，获取触摸位置所对应的世界Object
         * ```ts
         * @Component
         * export default class ScreenExample extends Script {
         *     touch: TouchInput;
         *     async onStart() {
         *         this.touch = new TouchInput();
         *         this.touch.onTouch.add((index, location, type) => {
         *             console.log("ontouch", index, location, type);
         *             if (type == TouchInputType.TouchBegin) {
         *                 console.log("触摸的GameObject名字是：" + this.onTouchBegin(index, location).name);
         *             }
         *         })
         *     }
         *
         *     // 开始触摸屏幕，从此位置
         *     private onTouchBegin(index: number, location: Vector2): mw.GameObject{
         *        return ScreenUtil.getGameObjectByScreenPosition(location.x, location.y)[0].gameObject;
         *     }
         * }
         * ```
         */
        static getGameObjectByScreenPosition(sceneX: number, sceneY: number, distance?: number, multiTrace?: boolean, onRay?: boolean): Array<mw.HitResult>;
        /**
         * @author baoqiang.han
         * @description 获取相机中心点所瞄准的世界位置
         * @groups 玩法
         * @effect 只在客户端调用生效
         * @returns 目标点世界位置
         * @example
         * 使用示例:创建一个名为ScreenExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，手指移动时获取视口中心点所对应的世界位置
         * ```
         * @Component
         * export default class ScreenExample extends Script {
         *     touch: TouchInput;
         *     async onStart() {
         *         this.touch = new TouchInput();
         *         this.touch.onTouchMove.add((index, location, type) => {
         *             console.log("ontouch", index, location, type);
         *             if (type == TouchInputType.TouchMove) {
         *                 console.log("视口中心点所对应的世界位置是：" + getSightBeadPosition());
         *             }
         *         })
         *     }
         * ```
         */
        static getSightBeadPosition(): mw.Vector;
        /**
         * @author jie.wu
         * @description 获取投影世界到播放器的屏幕位置，然后将其转换为控件位置，考虑任何质量缩放。
         * @groups 界面
         * @effect 只在客户端调用生效
         * @param player usage:玩家在游戏世界中的位置投射到屏幕上的控制器
         * @param worldLocation usage:要投射的世界位置
         * @param outScreenPosition usage:在视口的位置
         * @param isPlayerViewportRelative usage:是否与玩家视口子区域相关(当在分屏中使用玩家附加的小部件或当宽度比受限时有用)如果位置投射到屏幕上，返回true
         * @returns boolean
         */
        static projectWorldPositionToWidgetPosition(player: mw.Player, worldLocation: mw.Vector, outScreenPosition: mw.Vector2, isPlayerViewportRelative: boolean): boolean;
        /**
        * @author jie.wu
        * @groups 界面
        * @description 获取屏幕坐标点处是否有UI，注意该方法性能过差，不要频繁调用
        * @effect 只在客户端调用生效
        * @param screenPosition usage:屏幕坐标点
        * @returns 是否有UI在这个位置
        */
        static checkWidgetAt(screenPosition: mw.Vector2): boolean;
        /**
         * @author jie.wu
         * @groups 界面
         * @description 获取屏幕坐标点处的UI，注意该方法性能过差，不要频繁调用
         * @effect 只在客户端调用生效
         * @param screenPosition usage:屏幕坐标点
         * @returns 返回这个点的UI，如果没有返回空
         */
        static getWidgetAt(screenPosition: mw.Vector2): mw.Widget;
    }
}

declare namespace mw {
    /**
     * @author wu.hao
     * @groups 工具
     * @description 描边绘制工具
     * @networkStatus usage:客户端
     */
    class SelectionUtil {
        /**
         * @author wu.hao
         * @description 获取框选屏幕位置的物体
         * @groups 工具
         * @effect 只在客户端调用生效
         * @param StartPoint usage:鼠标开始位置
         * @param EndPoint usage:鼠标结束位置
         * @param IsIncludeNonCollidingObjects usage:是否包含物体非碰撞组件 default:false
         * @param IsUseObjectsBoundingBox usage:是否使用物体包围盒 default:false
         * @returns 框选的物体
         * @example
         * 使用示例:创建一个名为SelectionExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，鼠标左键框选物体，会将框选的物体描边（注意，进入游戏框选可能会受到 UI 影响不好框选，请打开 DefaultUI ，选中 TouchPadDesigner 对象属性中是否被鼠标控制选中false）
         * ```
         * @Component
         * export default class SelectionExample extends Script {
         *
         *
         *     touchIndexesStart: Map<number, Vector2> = new Map<number, Vector2>();
         *     selectedGoes: Array<HitResult> = [];
         *     touch: TouchInput;
         *
         *     async onStart() {
         *         this.creatObjs();
         *         this.touch = new TouchInput();
         *         await Player.asyncGetLocalPlayer();
         *         this.touch.onTouch.add((index, location, type) => {
         *             console.log("ontouch", index, location, type);
         *             if (type == TouchInputType.TouchBegin) {
         *                 this.onTouchBegin(index, location);
         *             } else if (type == TouchInputType.TouchMove) {
         *                 this.onTouchMove(index, location);
         *             } else if (type == TouchInputType.TouchEnd) {
         *                 this.onTouchEnd(index, location);
         *             }
         *         })
         *     }
         *
         *     //在场景中随机生成一些物体，用于框选
         *     private creatObjs() {
         *         const cubeAssetId = "197386";
         *         for (let i = 0;
 i < 50;
 i++) {
         *             GameObject.asyncSpawn<Model>(cubeAssetId).then(obj => {
         *                 obj.worldTransform.position = new Vector(MathUtil.randomInt(-500, 500), MathUtil.randomInt(-500, 500), MathUtil.randomInt(-500, 500));
         *             })
         *         }
         *     }
         *
         *     // 开始触摸屏幕，记录初始位置
         *     private onTouchBegin(index: number, location: Vector2) {
         *         this.touchIndexesStart.set(index, location);
         *     }
         *
         *     // 触摸移动, 绘制选择框
         *     private onTouchMove(index: number, location: Vector2) {
         *         let start = this.touchIndexesStart.get(index);
         *         if (!start) { return;
 }
         *         SelectionUtil.drawGameObjectSelectionBox(start, location, LinearColor.red, 0.03);
         *     }
         *
         *
         *     // 触摸结束，框选对象
         *     private onTouchEnd(index: number, location: Vector2) {
         *         let start = this.touchIndexesStart.get(index);
         *         if (!start) { return;
 }
         *         // 取消上一次框选对象的描边
         *         this.selectedGoes.forEach(result => {
         *             let mesh = result.gameObject as Model;
         *             mesh.setPostProcessOutline(false,LinearColor.green, 1);
         *         })
         *         // 框选对象
         *         this.selectedGoes = SelectionUtil.getGameObjectBySelectionBox(start, location, false, false).filter(result => (result.gameObject instanceof StaticMesh));
         *         // 未框选对象添加描边
         *         this.selectedGoes.forEach(result => {
         *             let mesh = result.gameObject as Model;
         *             mesh.setPostProcessOutline(true,LinearColor.red, 1);
         *         })
         *         SelectionUtil.setGlobalOutlineParams(4, 0, 0, 0, 1);
         *     }
         *
         * }
         * ```
         */
        static getGameObjectBySelectionBox(StartPoint: mw.Vector2, EndPoint: mw.Vector2, IsIncludeNonCollidingObjects?: boolean, IsUseObjectsBoundingBox?: boolean): Array<mw.HitResult>;
        /**
         * @author wu.hao
         * @description 绘制物体选择框
         * @groups 工具
         * @effect 只在客户端调用生效
         * @param StartPoint usage:鼠标开始位置
         * @param EndPoint usage:鼠标结束位置
         * @param Color usage:选择框颜色
         * @param DurationTime usage:显示时间 default:0.1  range:不做限制  type:浮点数
         * @example
         * 使用示例:创建一个名为SelectionExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，鼠标左键框选物体，会绘制出选择框。（注意，进入游戏框选可能会受到 UI 影响不好框选，请打开 DefaultUI ，选中 TouchPadDesigner 对象属性中是否被鼠标控制选中false）
         * ```
         * @Component
         * export default class SelectionExample extends Script {
         *
         *
         *     touchIndexesStart: Map<number, Vector2> = new Map<number, Vector2>();
         *     selectedGoes: Array<HitResult> = [];
         *     touch: TouchInput;
         *
         *     async onStart() {
         *         this.touch = new TouchInput();
         *         await Player.asyncGetLocalPlayer();
         *         this.touch.onTouch.add((index, location, type) => {
         *             console.log("ontouch", index, location, type);
         *             if (type == TouchInputType.TouchBegin) {
         *                 this.onTouchBegin(index, location);
         *             }
         *             else if (type == TouchInputType.TouchMove) {
         *                 this.onTouchMove(index, location);
         *             }
         *         })
         *     }
         *
         *     // 开始触摸屏幕，记录初始位置
         *     onTouchBegin(index: number, location: Vector2) {
         *         this.touchIndexesStart.set(index, location);
         *     }
         *
         *     // 触摸移动, 绘制选择框
         *     onTouchMove(index: number, location: Vector2) {
         *         let start = this.touchIndexesStart.get(index);
         *         if (!start) { return;
 }
         *         SelectionUtil.drawGameObjectSelectionBox(start, location, LinearColor.red, 0.03);
         *     }
         * }
         * ```
         */
        static drawGameObjectSelectionBox(StartPoint: mw.Vector2, EndPoint: mw.Vector2, Color: mw.LinearColor, DurationTime?: number): void;
        /**
         * @author wu.hao
         * @description 设置全局描边参数
         * @groups 工具
         * @effect 只在客户端调用生效
         * @param Width usage:描边宽度  default:2   range:[0, 4] 数值越大，描边宽度越大  type:浮点数
         * @param CoveredAlpha usage:被遮挡部分高亮透明度  default:0   range:[0, 1] 数值越大，越不透明  type:浮点数
         * @param CoveredEdgeAlpha usage:被遮挡部分描边透明度  default:1  range:[0, 1] 数值越大，越不透明  type:浮点数
         * @param NotCoveredAlpha usage:未被遮挡部分高亮透明度  default:0  range:[0, 1] 数值越大，越不透明  type:浮点数
         * @param NotCoveredEdgeAlpha usage:未被遮挡部分描边透明度  default:1  range:[0, 1] 数值越大，越不透明  type:浮点数
         */
        static setGlobalOutlineParams(Width?: number, CoveredAlpha?: number, CoveredEdgeAlpha?: number, NotCoveredAlpha?: number, NotCoveredEdgeAlpha?: number): void;
    }
}

declare namespace mw {
    /**
         * @author huipeng.jia
         * @description 屏蔽字检测的结果
         * @groups 基础类型
         */
    type maskWordCheckResult = {
        /** 是否通过，true - 通过、false - 不通过 */
        "result": boolean;
        /** 命中的文本，如果通过检测则为空 */
        "hits": string[];
    };
    /**
     * @author huipeng.jia
     * @groups 工具
     * @description 字符串工具
     * @networkStatus usage:客户端
     */
    class StringUtil {
        /**
         * @author junwen.hua
         * @description 文本复制
         * @description 将字符串复制到剪切板
         * @groups 工具
         * @param text usage:复制到剪切板的文本 <br> range: 无限制
         * @effect 只在客户端调用生效
         * @example
         * 使用示例:创建一个名为StringExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会将hello world!文本复制到剪切板，此时可以在其他地方粘贴
         * ```
         * @Component
         * export default class StringExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         StringUtil.clipboardCopy("hello world!");
         *     }
         *
         * }
         * ```
         */
        static clipboardCopy(text: string): void;
        /**
         * @author junwen.hua
         * @description 文本粘贴，获取剪切板的文本
         * @groups 工具
         * @effect 只在客户端调用生效
         * @returns 剪切板的文本
         * @example
         * 使用示例:创建一个名为StringExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会将剪切板的文本打印到控制台
         * ```
         * @Component
         * export default class StringExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let text = StringUtil.clipboardPaste();
         *         console.log("clipboardPaste", text);
         *     }
         *
         * }
         * ```
         */
        static clipboardPaste(): string;
        /**
         * @author huipeng.jia
         * @description 判断字符串是否为空 (null或"")
         * @groups 工具
         * @effect 调用端生效
         * @param str usage: 要判断的字符串 range: 不做限制
         * @returns 结果
         * @example
         * 使用示例:创建一个名为StringExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会输出isEmpty1: false
         * ```
         * @Component
         * export default class StringExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let isEmpty1 = StringUtil.isEmpty("hello world!");
         *         console.log("isEmpty1: " + isEmpty1);
         *     }
         *
         * }
         * ```
         */
        static isEmpty(str: string): boolean;
        /**
         * @author huipeng.jia
         * @description 将{i}中的内容依次替换为后续参数。i从0开始，表示第i+2个参数，详细请查看使用示例。
         * @groups 工具
         * @effect 调用端生效
         * @param str usage: 要处理的字符串  range: 不做限制
         * @param param usage: 替换序列
         * @returns 新的字符串
         * @example
         * 使用示例:创建一个名为StringExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会输出hello world!
         * ```
         * @Component
         * export default class StringExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let targetString = StringUtil.format("{0} {1}{2}", "hello", "world", "!");
         *         console.log(targetString);
         *     }
         *
         * }
         * ```
         */
        static format(str: string, ...param: any[]): string;
        /**
         * @author huipeng.jia
         * @description 屏蔽字检测
         * @groups 工具
         * @effect 调用端生效
         * @precautions 接口中遇到异常情况会返回 reject，使用该接口需要用 catch 处理这种异常情况
         * @param text usage: 要检测的文本 range: 不做限制
         * @returns 检测结果回调
         * @example
         * 使用示例:创建一个名为StringExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会输出屏蔽字检测不通过
         * ```
         * @Component
         * export default class StringExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         StringUtil.maskWordCheck("自杀之王").then(result => {
         *             if (!result.result) {
         *                 console.log("屏蔽字检测不通过");
         *                 console.log("命中的文本：" + result.hits);
         *             }
         *         }).catch(error => {
         *             console.log("屏蔽字检测出错");
         *             console.log(error);
         *         });
         *     }
         *
         * }
         * ```
         */
        static maskWordCheck(text: string): Promise<maskWordCheckResult>;
    }
}

declare namespace mw {
    /**
     * @author guang.deng
     * @description 贴图格式
     * @groups 基础类型
     */
    enum TextureFormat {
        /** Default */
        Default = 0,
        /** PNG */
        PNG = 1,
        /** JPEG */
        JPEG = 2
    }
    /**
     * @author mengyuan.hao
     * @description 状态信息获取工具
     * @description 判断当前环境状态是否是客户端、服务端、移动端。获取版本号等信息
     * @groups 工具
     * @networkStatus usage:双端
     */
    class SystemUtil {
        /**
         * @description 添加OnPause开始时执行的回调函数
         * @author mengyuan.hao
         * @effect 只在客户端调用生效
         * @precautions 只在Android和IOS生效。触发时机有切入后台、息屏和播广告。
         *              部分机型切入后台不会暂停游戏所以不会触发该回调或暂停时间很短，可以通过游戏背景音乐是否持续播放来判断。
         * @returns 返回一个事件监听器
         */
        static get onPause(): mw.MulticastDelegate<() => void>;
        /**
         * @description 添加OnPause结束时执行的回调函数
         * @author junwen.hua
         * @effect 只在客户端调用生效
         * @precautions 只在Android和IOS生效。触发时机有切入后台、息屏和播广告后回到游戏。
         *              部分机型切入后台不会暂停游戏所以不会触发该回调或暂停时间很短，可以通过游戏背景音乐是否持续播放来判断。
         * @returns 返回一个事件监听器
         */
        static get onResume(): mw.MulticastDelegate<(leaveDuration: any) => void>;
        /**
         * @description 添加退出游戏时执行的回调函数
         * @author junwen.hua
         * @effect 只在客户端调用生效
         * @precautions 只在App悬浮球退出和PIE关闭窗口时生效。悬浮球退出会计时5s，5s后会强制杀进程.
         * @returns 返回一个事件监听器
         */
        static get onExit(): mw.MulticastDelegate<() => void>;
        /**
         * @author xiangkun.sun
         * @description 是否客户端运行
         * @groups 玩法
         * @effect 调用端生效
         * @returns 是否客户端运行
         * @example
         * 使用示例:创建一个名为SystemExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会将当前运行环境打印到控制台
         * ```
         * @Component
         * export default class SystemExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             console.log("当前是客户端");
         *         } else if (SystemUtil.isServer()) {
         *             console.log("当前是服务端");
         *         }
         *     }
         *
         * }
         * ```
         */
        static isClient(): boolean;
        /**
         * @author xiangkun.sun
         * @description 是否服务器运行
         * @groups 玩法
         * @effect 调用端生效
         * @returns 是否服务器运行
         * @example
         * 使用示例:创建一个名为SystemExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会将当前运行环境打印到控制台
         * ```
         * @Component
         * export default class SystemExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (SystemUtil.isClient()) {
         *             console.log("当前是客户端");
         *         } else if (SystemUtil.isServer()) {
         *             console.log("当前是服务端");
         *         }
         *     }
         *
         * }
         * ```
         */
        static isServer(): boolean;
        /**
         * @author xiangkun.sun
         * @description 判断当前是否是编辑器运行模式
         * @effect 调用端生效
         */
        static isPIE: boolean;
        /**
         * @author xiangkun.sun
         * @description 判定当前程序的运行平台,返回值参考Type.RuntimePlatform
         * @effect 调用端生效
         * @example
         * 使用示例:创建一个名为SystemExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会将当前运行环境打印到控制台
         * ```
         * @Component
         * export default class SystemExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         console.log("当前程序的运行平台", SystemUtil.currentPlatform)
         *     }
         *
         * }
         * ```
         */
        static currentPlatform: mw.RuntimePlatform;
        /**
         * @author xiangkun.sun
         * @description 判断当前是否是移动端
         * @groups 玩法
         * @effect 调用端生效
         * @returns 是否是移动端
         * @example
         * 使用示例:创建一个名为SystemExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会将当前是否是移动端打印到控制台
         * ```
         * @Component
         * export default class SystemExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         console.log("当前是否是移动端", SystemUtil.isMobile())
         *     }
         *
         * }
         * ```
         */
        static isMobile(): boolean;
        /**
         * @author xiangkun.sun
         * @description 获取当前环境
         * @groups 玩法
         * @effect 调用端生效
         * @returns 当前环境
         * @example
         * 使用示例:创建一个名为SystemExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会将当前环境打印到控制台
         * ```
         * @Component
         * export default class SystemExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         console.log("当前环境", SystemUtil.getCurrentEnv())
         *     }
         *
         * }
         * ```
         */
        static getCurrentEnv(): string;
        /**
         * @author xiangkun.sun
         * @description 获取完整编辑器版本号
         * @groups 玩法
         * @effect 调用端生效
         * @returns 当前完整编辑器版本号
         * @example
         * 使用示例:创建一个名为SystemExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会将当前完整编辑器版本号打印到控制台
         * ```
         * @Component
         * export default class SystemExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         console.log("当前完整编辑器版本号", SystemUtil.getFullEditorVersion())
         *     }
         *
         * }
         * ```
         */
        static getFullEditorVersion(): string;
        /**
         * @author xiangkun.sun
         * @description 获取编辑器版本号
         * @groups 玩法
         * @effect 调用端生效
         * @returns 当前编辑器版本号
         * @example
         * 使用示例:创建一个名为SystemExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会将当前编辑器版本号打印到控制台
         * ```
         * @Component
         * export default class SystemExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         console.log("当前编辑器版本号", SystemUtil.getEditorVersion())
         *     }
         *
         * }
         * ```
         */
        static getEditorVersion(): string;
        /**
         * @author xiangkun.sun
         * @description 获取当前游戏GameId
         * @groups 玩法
         * @effect 调用端生效
         * @returns 当前游戏GameId
         * @example
         * 使用示例:创建一个名为SystemExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，输出当前游戏GameId pc端输出为空，移动端输出为游戏GameId
         * ```
         * @Component
         * export default class SystemExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (!SystemUtil.isClient()) return;
         *         const gameId = SystemUtil.getGameId();
         *         console.log(`gameId: ${gameId}`);
         *     }
         *
         * }
         * ```
         */
        static getGameId(): string;
        /**
         * @author xiangkun.sun
         * @description 获取当前游戏版本
         * @groups 玩法
         * @effect 调用端生效
         * @returns 当前游戏版本
         * @example
         * 使用示例:创建一个名为SystemExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，输出当前游戏版本 pc端输出为空，移动端输出为游戏版本
         * ```
         * @Component
         * export default class SystemExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (!SystemUtil.isClient()) return;
         *         const version = SystemUtil.getVersion();
         *         console.log(`version: ${version}`);
         *     }
         *
         * }
         * ```
         */
        static getVersion(): string;
        /**
         * @author huipeng.jia
         * @description 获取当前房间Id，如果是单机游戏，则返回null
         * @groups 玩法
         * @effect 调用端生效
         * @returns 当前房间Id，如果是单机游戏，则返回null
         * @example
         * 使用示例:创建一个名为SystemExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，输出当前房间Id，如果是单机游戏，则输出null
         * ```
         * @Component
         * export default class SystemExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (!SystemUtil.isClient()) return;
         *         const roomId = SystemUtil.roomId;
         *         console.log(`roomId: ${verroomIdsion}`);
         *     }
         *
         * }
         * ```
         */
        static get roomId(): string;
        /**
         * @author huipeng.jia
         * @description 获取当前场景的SceneId
         * @groups 玩法
         * @effect 调用端生效
         * @returns 当前场景的SceneId
         * @example
         * 使用示例:创建一个名为SystemExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，输出当前场景的SceneId
         * ```
         * @Component
         * export default class SystemExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (!SystemUtil.isClient()) return;
         *         const sceneId = SystemUtil.sceneId;
         *         console.log(`sceneId: ${sceneId}`);
         *     }
         *
         * }
         * ```
         */
        static get sceneId(): string;
        /**
        * @description 关闭引擎初始化ui
        * @effect 只在客户端调用生效
        * @example
        * 使用示例:创建一个名为SystemExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，执行时将关闭引擎ui
        * ```
        * @Component
        * export default class SystemExample extends Script {
        *
        *     protected onStart(): void {
        *         if (!SystemUtil.isClient()) return;
        *         InputUtil.onKeyDown(Keys.F, () => {
        *             SystemUtil.closeLoadingView();
        *         }))
        *     }
        * }
        * ```
        */
        static closeLoadingView(): void;
    }
}

declare namespace mw {
    /**
     * @groups 工具
     * @author huipeng.jia, xiangkun.sun
     * @description 时间工具
     * @networkStatus usage:双端
     */
    class TimeUtil {
        /**
         * @author xiangkun.sun
         * @description 返回当前本地会话所在的电脑自 UNIX Epoch（UNIX 纪元）开始所经过的时间（以秒为单位）。
         * @groups 工具
         * @effect 调用端生效
         * @precautions UNIX 纪元的开始日期为 1970 年 1 月 1 日。
         * @returns （UNIX 纪元）开始所经过的秒数。
         * @example
         * 使用示例:创建一个名为TimeExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会输出当前时间戳
         * ```
         * @Component
         * export default class TimeExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (!SystemUtil.isClient()) return;
         *         const time = TimeUtil.time();
         *         console.log(`time stamp:${time}`);
         *     }
         *
         * }
         * ```
         */
        static time(): number;
        /**
         * @author xiangkun.sun
         * @description 返回自游戏运行后所经过的总时长，单位秒，精确到毫秒。
         * @groups 工具
         * @effect 调用端生效
         * @precautions 在 Editor 中，该数值是从每次开始运行起计算，而非从打开 Editor 场景起计算。
         * @returns 自游戏运行后所经过的总时长。
         * @example
         * 使用示例:创建一个名为TimeExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按F键会输出游戏运行的总时长
         * ```
         * @Component
         * export default class TimeExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (!SystemUtil.isClient()) return;
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             const elapsedTime = TimeUtil.elapsedTime();
         *             console.log(`The game ran for ${elapsedTime} seconds`);
         *         });
         *     }
         *
         * }
         * ```
         */
        static elapsedTime(): number;
        /**
         * @author xiangkun.sun
         * @description 格式化时间戳
         * @groups 工具
         * @effect 调用端生效
         * @param timeData usage:标准时间，时间戳等
         * @param format usage:日期字符串 default:outer  range: 传入时间格式，如：1996-01-20
         * @returns 格式化后时间字符串
         * @example
         * 使用示例:创建一个名为TimeExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会输出当前时间
         * ```
         * @Component
         * export default class TimeExample extends Script {
         *
         *     protected onStart(): void {
         *        this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *        if (!SystemUtil.isClient()) return;
         *        const time = TimeUtil.parseTime(new Date());
         *        console.log(`time:${time}`);
         *     }
         *
         * }
         * ```
         */
        static parseTime(timeData: Date, format?: string): string;
        /**
         * @author xiangkun.sun
         * @description 帧刷新事件(参数deltaTime)
         * @precautions 每次update自动执行所绑定的方法
         * @example
         * 使用示例:创建一个名为TimeExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会每帧输出dt
         * ```
         * @Component
         * export default class TimeExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (!SystemUtil.isClient()) return;
         *         TimeUtil.onEnterFrame.add(this.onEnterFrame, this);
         *     }
         *
         *     private onEnterFrame(dt: number): void {
         *         console.log("dt", dt);
         *     }
         *
         * }
         * ```
         */
        static onEnterFrame: mw.Action1<number>;
        /**
         * @author xiangkun.sun
         * @description 是否输出每帧的执行时间
         */
        static traceFrameTime: boolean;
        /**
         * @author xiangkun.sun
         * @description 每一帧经过的时间 (单位：秒)
         * @groups 工具
         * @precautions 调用这个函数之前两次Update函数调用之间的间隔时间
         * @effect 调用端生效
         * @returns number（单位：秒）
         */
        static deltatime(): number;
        /**
         * @author xiangkun.sun
         * @description 延迟一定帧数执行方法
         * @groups 工具
         * @effect 调用端生效
         * @param handler usage: 执行的方法
         * @param frameNum usage: 要延迟的帧数 default: 1  <br> range: 根据你想要延迟的帧数而定，不做限制。 type: 整形
         * @returns 用于停止的ID
         * @example
         * 使用示例:创建一个名为TimeExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会延迟600帧执行
         * ```
         * @Component
         * export default class TimeExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (!SystemUtil.isClient()) return;
         *         TimeUtil.delayExecute(() => {
         *             //延迟600帧执行 pie环境大概10s
         *             console.log("delay 600execute");
         *         }, 600)
         *     }
         * }
         * ```
         */
        static delayExecute(handler: () => void, frameNum?: number): number;
        /**
         * @author xiangkun.sun
         * @description 清除 delayExecute
         * @groups 工具
         * @effect 调用端生效
         * @param id usage: delayExecute 方法返回的 ID    <br> range: 根据 ID 长度而定。  type: 整形
         * @example
         * 使用示例:创建一个名为TimeExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，原本会延迟600帧执行，现在不会执行
         * ```
         * @Component
         * export default class TimeExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (!SystemUtil.isClient()) return;
         *         let id = TimeUtil.delayExecute(() => {
         *             //延迟600帧执行 pie环境大概10s
         *             console.log("delay 600execute");
         *         }, 600)
         *         TimeUtil.clearDelayExecute(id);
//清除延迟执行
         *     }
         *
         *
         * }
         * ```
         */
        static clearDelayExecute(id: number): void;
        /**
         * @author xiangkun.sun
         * @description 按一定时间间隔执行方法
         * @groups 工具
         * @effect 调用端生效
         * @param handler usage: 要执行的方法
         * @param timeout usage: 间隔时间（最小时间为两帧时间差 单位：秒）  <br> range:[0, +∞]  type: 浮点数
         * @param exitJudge usage: 退出的判断方法 返回 true 停止 default: null
         * @returns 用于停止的 ID
         * @example
         * 使用示例:创建一个名为TimeExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会每隔2秒执行一次输出id 直到id>5
         * ```
         * @Component
         * export default class TimeExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (!SystemUtil.isClient()) return;
         *         let isInterval = false;
         *         let id = 0;
         *         TimeUtil.setInterval(() => {
         *             console.log(id);
         *             id++;
         *             if (id > 5) {
         *                 isInterval = true;
         *             }
         *         }, 2, () => {
         *             return isInterval;
         *         })
         *     }
         *
         *
         * }
         * ```
         */
        static setInterval(handler: () => void, timeout: number, exitJudge?: () => boolean): number;
        /**
         * @author xiangkun.sun
         * @description 清除 setInterval
         * @groups 工具
         * @effect 调用端生效
         * @param id usage: setInterval 方法返回的 ID   <br> range: 根据 ID 长度而定。 type: 浮点数
         * @example
         * 使用示例:创建一个名为TimeExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，原本会每隔2秒执行一次输出id 直到id>5，按下F键后会提前停止
         * ```
         * @Component
         * export default class TimeExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (!SystemUtil.isClient()) return;
         *         let isInterval = false;
         *         let id = 0;
         *         let ineterval = TimeUtil.setInterval(() => {
         *             console.log(id);
         *             id++;
         *             if (id > 5) {
         *                 isInterval = true;
         *             }
         *         }, 2, () => {
         *             return isInterval;
         *         })
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             TimeUtil.clearInterval(ineterval);
         *         })
         *     }
         *
         *
         * }
         * ```
         */
        static clearInterval(id: number): void;
        /**
         * @author xiangkun.sun
         * @description 延迟一定秒数，用于异步方法中间的等待
         * @groups 工具
         * @effect 调用端生效
         * @param second usage: 时间(单位：秒)   <br> range: 不限制  type: 浮点数
         * @returns Promise
         * @example
         * 使用示例:创建一个名为TimeExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会5秒后输出5 seconds later
         * ```
         * @Component
         * export default class TimeExample extends Script {
         *
         *     protected onStart(): void {
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         if (!SystemUtil.isClient()) return;
         *         TimeUtil.delaySecond(5).then(() => {
         *             console.log("5 seconds later");
         *         })
         *     }
         *
         *
         * }
         * ```
         */
        static delaySecond(second: number): Promise<void>;
    }
}

declare namespace mw {
    /**
     * @author huipeng.jia
     * @description 插值函数的类型定义
     * @groups 基础类型
     */
    type TweenInterpolationFunction = (v: number[], k: number) => number;
    /**
     * @author huipeng.jia
     * @description 缓动函数的类型定义
     * @groups 基础类型
     */
    type TweenEasingFunction = (amount: number) => number;
    /**
     * @author huipeng.jia
     * @description 补间属性的定义，用户可以自由扩展
     * @groups 基础类型
     */
    type TweenUnknownProps = Record<string, any>;
    /**
     * @author huipeng.jia
     * @groups 工具/补间动画
     * @description 序列工具类，主要用于获取连续的ID
     * @networkStatus usage: 双端
     */
    class TweenSequence {
        /**
         * @description 获取下一个 ID
         * @groups 工具
         * @effect 调用端生效
         * @returns 下一个 ID
         */
        static nextID(): number;
    }
    /**
     * @author huipeng.jia
     * @groups 工具/补间动画
     * @description 补间组，用于同时控制多个补间对象
     * @networkStatus usage: 双端
     */
    class TweenGroup {
        /**
         * @description 获取当前补间组中所有补间对象
         * @effect 调用端生效
         * @returns 补间对象数组
         */
        getAll(): Array<Tween<TweenUnknownProps>>;
        /**
         * @description 移除当前补间组中所有补间对象
         * @effect 调用端生效
         * @precautions 按照当前函数的实现，只是从补间组中移除补间对象，并未删除
         */
        removeAll(): void;
        /**
         * @description 将指定补间对象加入当前补间组
         * @effect 调用端生效
         * @param tween usage: 要添加的补间对象
         */
        add(tween: Tween<TweenUnknownProps>): void;
        /**
         * @description 将指定补间对象移出当前补间组并删除
         * @effect 调用端生效
         * @param tween usage: 要移出并删除的补间对象
         */
        remove(tween: Tween<TweenUnknownProps>): void;
        /**
         * @description 更新补间组
         * @effect 调用端生效
         * @param time usage: 要为当前补间组中所有补间对象设置的时间，不是 deltaTime。 default: 当前时间 <br> range: [0, +∞]  type: 浮点数
         * @param preserve usage: 已经结束的补间对象，是否在补间组中继续保留 default: false
         * @returns 是否还有补间对象未结束。true-有未结束的补间对象；false-均已结束
         * @example
         * 使用示例: 一般来说，调用时使用默认参数即可使之正常运行。
         * ```
         * // 更新自定义补间组
         * const group = new mw.TweenUtil.Group()
         * group.update()
         *
         * // 更新全局补间组
         * mw.TweenUtil.TWEEN.update()
         * ```
         */
        update(time?: number, preserve?: boolean): boolean;
    }
    /**
     * @groups 工具/补间动画
     * @author huipeng.jia
     * @description 补间(动画)（来自 in-between）是一个概念，允许你以平滑的方式更改对象的属性。
     * 你只需告诉它哪些属性要更改，当补间结束运行时它们应该具有哪些最终值，以及这需要多长时间，
     * 补间引擎将负责计算从起始点到结束点的值。
     * @networkStatus usage: 双端
     * @example
     * 使用示例: 创建一个名为TweenExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下G键，会在场景中随机生成一个导弹并按照设定轨迹飞往目的地。
     * ```
     * @Component
     * export default class TweenExample extends Script {
     *
     *     protected async onStart(): Promise<void> {
     *         this.useUpdate = true;
     *         if (SystemUtil.isClient()) {
     *             let char = (await Player.asyncGetLocalPlayer()).character;
     *             InputUtil.onKeyDown(Keys.G, async () => {
     *                 let daoDan = new DaoDanScript(char.worldTransform.position, new Vector(Math.random() * 1000, Math.random() * 1000, 0));
     *             })
     *         }
     *     }
     *
     *     protected onUpdate(dt: number): void {
     *         TweenUtil.TWEEN.update();
     *     }
     *
     * }
     *
     * class DaoDanScript {
     *
     *     //导弹预制体
     *     private prefab: GameObject
     *
     *     //构造函数，new的时候传入一个位置来进行初始化
     *     constructor(bornPos: Vector, toPos: Vector) {
     *         this.init(bornPos, toPos)
     *     }
     *
     *     //初始化DaoDan
     *     private async init(bornPos: Vector, toPos: Vector) {
     *         // 使用对象池来创建预制体，并设置预制体的位置
     *         const bombAssetId = "44948";
     *         const fireAssetId = "13404";
     *         const cubeAssetId = "197386";
     *         this.prefab = await GameObjPool.asyncSpawn(cubeAssetId, GameObjPoolSourceType.Asset);
     *         this.prefab.setVisibility(PropertyStatus.Off, false);
     *         GameObject.asyncSpawn({ guid: bombAssetId }).then(obj => {
     *             obj.attachToGameObject(this.prefab);
     *             obj.localTransform.position = new Vector(0, 0, 0);
     *             obj.localTransform.rotation = new Rotation(0, -90, 0);
     *         })
     *         EffectService.playOnGameObject(fireAssetId, this.prefab, {position:new Vector(0, 0, 0), rotation:new Rotation(0, -90, 0), scale: new Vector(2, 2, 2)});
     *         this.prefab.worldTransform.position = bornPos;
     *         this.fireToPos(toPos);
     *     }
     *
     *     //导弹飞向一个坐标
     *     private async fireToPos(targetPos: Vector) {
     *         // 先播放起飞动画
     *         this.fireReadyAnim()
     *
     *         // 在目标位置创建一个特效（预警特效）
     *         EffectService.playAtPosition("155714", targetPos, {loopCount:1});
     *
     *         // 将起点坐标解构（方便Tween进行过渡）
     *         let startLoc = { x: this.prefab.worldTransform.position.x, y: this.prefab.worldTransform.position.y, z: this.prefab.worldTransform.position.z }
     *         // 将目标点坐标解构（方便Tween进行过渡）
     *         let targetLoc = { x: targetPos.x, y: targetPos.y, z: targetPos.z }
     *
     *         // 上一帧位置
     *         let lastPos: Vector = this.prefab.worldTransform.position.clone()
     *         // 当前帧位置
     *         let nowPos: Vector = Vector.zero
     *         // 中间商位置（避免频繁去new Vector）
     *         let tempPos: Vector = Vector.zero
     *
     *         // 创建起点为导弹位置的一个Tween
     *         const newTween = new mw.Tween(this.prefab.worldTransform.position.clone())
     *
     *         newTween.to({
     *             // X轴飞行路径（这些路径点可以自由定义）
     *             x: [
     *                 startLoc.x + 1000 + Math.random() * 2000,
     *                 startLoc.x + 3000 + Math.random() * 2000,
     *                 startLoc.x + 5000 + Math.random() * 2000,
     *                 targetLoc.x],
     *
     *             // Y轴飞行路径（这些路径点可以自由定义）
     *             y: [
     *                 startLoc.y + 1000 + Math.random() * 2000,
     *                 startLoc.y + 3000 + Math.random() * 2000,
     *                 startLoc.y + 5000 + Math.random() * 2000,
     *                 targetLoc.y],
     *
     *             // Z轴飞行路径（这些路径点可以自由定义）
     *             z: [
     *                 550 + Math.random() * 1000,
     *                 750 + Math.random() * 1000,
     *                 950 + Math.random() * 1000,
     *                 750 + Math.random() * 1000,
     *                 550 + Math.random() * 1000,
     *                 targetLoc.z]
     *         // 整个过程持续3000毫秒
     *         }, 3000)
     *
     *             //Linear插值：完全线性，拐弯没有过渡，直来直去;
Bezier插值：全程平滑，整个过程都被平滑成一条曲线;
CatmullRom插值：拐弯平滑，只在拐弯处进行平滑
     *             // 使用CatmullRom插值
     *             .interpolation(TweenUtil.Interpolation.CatmullRom)
     *             .onUpdate((value) => {
     *                 // 每次循环，将value（过渡值）赋值给tempPos和nowPos用于运算
     *                 tempPos.set(value.x, value.y, value.z)
     *                 nowPos.set(value.x, value.y, value.z)
     *                 // 将火箭的坐标设置为过渡值
     *                 this.prefab.worldTransform.position = tempPos
     *                 // 根据上一帧位置和这一帧位置，计算火箭的实时朝向
     *                 this.prefab.worldRotation = nowPos.subtract(lastPos).toRotation()
     *                 // 将此帧值赋值给lastPos，用于下一次运算
     *                 lastPos.set(value.x, value.y, value.z)
     *             })
     *
     *         // 当Tween播放完毕时
     *         newTween.onComplete(() => {
     *             const bombEffectId = "7786";
     *             // 在结束位置播放一个爆炸特效
     *             EffectService.playEffectAtLocation(bombEffectId, this.prefab.worldTransform.position, 1)
     *             // 重置火箭的旋转
     *             this.prefab.worldTransform.rotation = Rotation.zero
     *             // 将火箭归还给预制体
     *             GameObjPool.despawn(this.prefab)
     *         })
     *
     *
     *         // 等一秒钟再开始播放（是为了等起飞动画播放完）
     *         setTimeout(() => {
     *             newTween.start()
     *         }, 1000);
     *     }
     *
     *     //起飞阶段动画
     *     private fireReadyAnim() {
     *         let tempRotate: Rotation = Rotation.zero
     *         let startPos: Vector = this.prefab.worldTransform.position.clone()
     *
     *         let tweenA = new mw.Tween({ y: 0 }).to({ y: 60 + Math.random() * 30 }, 1000).onUpdate((value) => {
     *             tempRotate.y = value.y
     *             this.prefab.worldTransform.rotation = tempRotate
     *         }).start().easing(TweenUtil.Easing.Cubic.Out)
     *
     *         let tweenB = new mw.Tween(startPos).to(startPos.clone().add(new mw.Vector(0, 0, Math.random() * 100)), 1000).onUpdate((value) => {
     *             this.prefab.worldTransform.position = value
     *         }).start().easing(TweenUtil.Easing.Cubic.Out)
     *     }
     * }
     * ```
     */
    class TweenUtil {
        /**
         * @author huipeng.jia
         * @description 预设插值函数
         * @ignore
         */
        static Interpolation: {
            Linear: (v: number[], k: number) => number;
            Bezier: (v: number[], k: number) => number;
            CatmullRom: (v: number[], k: number) => number;
            Utils: {
                Linear: (p0: number, p1: number, t: number) => number;
                Bernstein: (n: number, i: number) => number;
                Factorial: (n: number) => number;
                CatmullRom: (p0: number, p1: number, p2: number, p3: number, t: number) => number;
            };
        };
        /**
         * @author huipeng.jia
         * @description 预设的缓动函数
         * @ignore
         */
        static Easing: {
            Linear: {
                None: (amount: number) => number;
            };
            Quadratic: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Cubic: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Quartic: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Quintic: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Sinusoidal: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Exponential: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Circular: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Elastic: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Back: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Bounce: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            generatePow: (power?: number) => {
                In(amount: number): number;
                Out(amount: number): number;
                InOut(amount: number): number;
            };
        };
        /**
         * @hidden
         * @description 获取下一个 ID 的全局方法
         * @author huipeng.jia
         * @groups 工具
         * @effect 调用端生效
         * @returns 下一个ID
         */
        static nextId: typeof TweenSequence.nextID;
        /**
         * @author huipeng.jia
         * @groups 工具
         * @description 全局补间组单例。在创建补间时，如不特别指定，默认添加到该补间组
         */
        static TWEEN: TweenGroup;
    }
    /**
     * @author huipeng.jia
     * @groups 工具/补间动画
     * @description 补间(动画)（来自 in-between）是一个概念，允许你以平滑的方式更改对象的属性。
     * 你只需告诉它哪些属性要更改，当补间结束运行时它们应该具有哪些最终值，以及这需要多长时间，
     * 补间引擎将负责计算从起始点到结束点的值。
     * @networkStatus usage: 双端
     */
    class Tween<T extends TweenUnknownProps> {
        /**
         * @description 补间构造函数
         * @effect 调用端生效
         * @param obj usage: 要创建补间的对象类型
         * @param group usage: 要创建的补间对象的分组 default: mainGroup
         */
        constructor(obj: T, group?: mw.TweenGroup | false);
        /**
         * @description 获取当前补间对象的ID
         * @effect 调用端生效
         * @returns 当前补间对象的ID
         */
        getID(): number;
        /**
         * @description 获取当前补间对象是否在补间过程。没结束补间的情况下，即使暂停，也会返回true。
         * @effect 调用端生效
         * @returns true-在补间过程中；false-不在补间过程，未开始或已结束。
         */
        isPlaying(): boolean;
        /**
         * @description 获取当前补间对象是否为暂停状态。
         * @effect 调用端生效
         * @returns true-暂停；false-在补间。
         */
        isPaused(): boolean;
        /**
         * @description 设置补间的目标状态和完成补间需要的时间
         * @effect 调用端生效
         * @param properties usage: 目标状态，可以是一个数组: 例如 to([0,100,200], time)
         * @param duration usage: 完成补间需要的时间，单位：ms。 default: 1000   <br> range: [0, +∞] type: 浮点数
         * @returns 当前补间对象，可链式调用
         */
        to(properties: TweenUnknownProps, duration?: number): this;
        /**
         * @description 设置完成补间需要的时间（周期）
         * @effect 调用端生效
         * @param d usage: 完成补间需要的时间，单位：ms。 default: 1000   <br> range: [0, +∞] type: 浮点数
         * @returns 当前补间对象，可链式调用
         */
        duration(d?: number): this;
        /**
         * @description 启动补间，可以指定启动生效时间，默认为当前时间
         * @effect 调用端生效
         * @precautions 接受一个参数 time。如果你使用它，那么补间不会立即开始，直到特定时刻，否则会尽快启动（i.e 即在下次调用 update）
         * @param time usage: 启动生效时间 default: 当前时间   <br> range: [0, +∞]  type: 浮点数
         * @returns 当前补间对象，可链式调用
         */
        start(time?: number): this;
        /**
         * @description 停止补间，停止一个从未开始或已经停止的补间没有任何效果。 没有错误被抛出
         * @effect 调用端生效
         * @returns 当前补间对象，可链式调用
         */
        stop(): this;
        /**
         * @description 将当前补间置为目标状态
         * @effect 调用端生效
         * @returns 当前补间对象，可链式调用
         */
        end(): this;
        /**
         * @description 暂停补间，可以指定暂停生效时间，默认为当前时间
         * @effect 调用端生效
         * @precautions 接受一个参数 time。如果你使用它，那么暂停不会立即生效，直到特定时刻，否则会尽快暂停（i.e 即在下次调用 update）
         * @param time usage: 暂停生效时间 default: 当前时间 <br> range: [0, +∞]  type: 浮点数
         * @returns 当前补间对象，可链式调用
         */
        pause(time?: number): this;
        /**
         * @description 恢复补间，可以指定恢复生效时间，默认为当前时间
         * @effect 调用端生效
         * @precautions 接受一个参数 time。如果你使用它，那么恢复不会立即生效，直到特定时刻，否则会尽快恢复（i.e 即在下次调用 update）
         * @param time usage: 恢复生效时间 default: 当前时间  <br> range: [0, +∞]  type: 浮点数
         * @returns 当前补间对象，可链式调用
         */
        resume(time?: number): this;
        /**
         * @description 停止所有链接到当前补间的补间对象
         * @effect 调用端生效
         * @returns 当前补间对象，可链式调用
         */
        stopChainedTweens(): this;
        /**
         * @description 设置当前补间对象的分组
         * @effect 调用端生效
         * @param group usage: 新的分组 default: mainGroup
         * @returns 当前补间对象，可链式调用
         */
        group(group?: TweenGroup): this;
        /**
         * @description 延迟启动
         * @effect 调用端生效
         * @param amount usage: 延迟时间，单位：ms。 default: 0   <br> range: [0, +∞] type: 浮点数
         * @returns 当前补间对象，可链式调用
         */
        delay(amount?: number): this;
        /**
         * @description 设置重复次数, 补间的总次数将是重复参数加上一个初始补间
         * @effect 调用端生效
         * @precautions 会重置当前的重复次数
         * @param times usage: 重复次数 default: 0  <br> range: [0, +∞]  type: 浮点数
         * @returns 当前补间对象，可链式调用
         * @example
         * 使用示例: 示例
         * ```
         * tween.repeat(10) // 循环10次
         * tween.repeat(Infinity) // 无限循环
         * ```
         */
        repeat(times?: number): this;
        /**
         * @description 设置重复补间时的延迟启动时间
         * @effect 调用端生效
         * @param amount usage: 延迟时间，单位：ms。 default: undefined  type: 浮点数  range: [0, +∞]
         * @range : [0, +∞]
         * @returns 当前补间对象，可链式调用
         */
        repeatDelay(amount?: number): this;
        /**
         * @description 设置往复（悠悠球效果）
         * @description 这个功能只有在独自使用 repeat 时才有效果。
         * @description 启用后，补间的行为将像悠悠球一样，会在起始值和结束值之间往复，而不是从头开始重复。
         * @effect 调用端生效
         * @param yoyo usage: 是否启用yoyo default: false
         * @returns 当前补间对象，可链式调用
         */
        yoyo(yoyo?: boolean): this;
        /**
         * @description 设置缓动函数
         * @effect 调用端生效
         * @param easingFunction usage: 缓动函数 default: Easing.Linear.None
         * @returns 当前补间对象，可链式调用
         */
        easing(easingFunction?: TweenEasingFunction): this;
        /**
         * @description 设置插值函数
         * @effect 调用端生效
         * @param interpolationFunction usage: 插值函数 default: Interpolation.Linear
         * @returns 当前补间对象，可链式调用
         */
        interpolation(interpolationFunction?: TweenInterpolationFunction): this;
        /**
         * @description 将（多个）补间对象链接到当前补间对象。在当前补间结束的时候立即启动链接的补间
         * @effect 调用端生效
         * @param tweens usage: 要链接的补间对象（数组）
         * @example
         * 使用示例: 示例
         * ```
         * // A结束后启动B
         * tweenA.chain(tweenB)
         *
         * // A-B循环
         * tweenA.chain(tweenB)
         * tweenB.chain(tweenA)
         *
         * // A结束后同时启动B,C
         * tweenA.chain(tweenB, tweenC)
         * ```
         * @returns 当前补间对象，可链式调用
         */
        chain(...tweens: Array<Tween<any>>): this;
        /**
         * @description 在补间开始之前触发，补间对象作为第一个参数传入
         * @effect 调用端生效
         * @precautions
         * 1. 在补间开始之前执行，即在计算之前。
         * 2. 每个补间只能执行一次。当通过 repeat() 重复补间时，它将不会运行。
         * @param callback usage: 要绑定的回调函数 default: undefined
         * @returns 当前补间对象，可链式调用
         */
        onStart(callback?: (object: T) => void): this;
        /**
         * @description 每次补间更新时触发，补间对象作为第一个参数传入
         * @effect 调用端生效
         * @precautions 回调触发时，属性已更新完成。
         * @param callback usage: 要绑定的回调函数 default: undefined
         * @returns 当前补间对象，可链式调用
         */
        onUpdate(callback?: (object: T, elapsed: number) => void): this;
        /**
         * @description 每次补间完成并即将开始下一次重复时触发，补间对象作为第一个参数传入
         * @effect 调用端生效
         * @param callback usage: 要绑定的回调函数 default: undefined
         * @returns 当前补间对象，可链式调用
         */
        onRepeat(callback?: (object: T) => void): this;
        /**
         * @description 当补间正常完成（即不停止）时触发，补间对象作为第一个参数传入
         * @effect 调用端生效
         * @param callback usage: 要绑定的回调函数 default: undefined
         * @returns 当前补间对象，可链式调用
         */
        onComplete(callback?: (object: T) => void): this;
        /**
         * @description 当通过 stop() 显式停止补间时触发，补间对象作为第一个参数传入
         * @effect 调用端生效
         * @precautions
         * 1. 在正常完成时不触发。
         * 2. 在任何可能的链接补间都停止之后才触发。
         * @param callback usage: 要绑定的回调函数 default: undefined
         * @returns 当前补间对象，可链式调用
         */
        onStop(callback?: (object: T) => void): this;
        /**
         * @description 更新当前的补间。一般来说会由所属的补间组自动调用，无需手动调用。
         * @effect 调用端生效
         * @param time usage: 要绑定的回调函数 default: 当前时间    <br> range: [0, +∞]  type: 浮点数
         * @param autoStart usage: 是否自动开始 default: true
         * @returns true-如果当前更新之后尚未结束, false-当前更新之后补间结束
         */
        update(time?: number, autoStart?: boolean): boolean;
    }
}

declare namespace mw {
    /**
     * @author mengyuan.hao
     * @description 窗口设置工具。
     * @description 可设置窗口聚焦失焦时触发某种行为，获取分辨率等功能。
     * @groups 工具
     * @networkStatus usage:双端
     * @example
     * 使用示例:创建一个名为WindowExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在控制台打印出屏幕的分辨率大小。
     * ```
     * @Component
     * export default class WindowExample extends Script {
     *
     *     protected onStart(): void {
     *         this.test();
     *     }
     *
     *     private async test(): Promise<void> {
     *         if (!SystemUtil.isClient()) return;
     *         let viewportSize = WindowUtil.getViewportSize();
     *         // X=1920 Y=1080
     *         console.log(`viewportSize ${viewportSize}`);
     *     }
     * }
     * ```
     */
    class WindowUtil {
        /**
         * @groups 工具
         * @description 用户游戏窗口聚焦，显示器显示当前游戏窗口。调用onFocused，返回一个多播委托类型。可使用多播委托中的Add、remove、clear、broadcast等函数，当出现窗口聚焦时编写你想要的逻辑。
         * @example
         * 使用示例:创建一个名为"NewScript"的脚本，放置在对象管理器对象子级中，打开脚本，输入以下代码保存，运行游戏，将屏幕切出会显示"游戏窗口失焦，屏幕切出"的log,将屏幕切回，将显示"游戏窗口聚焦，屏幕显现"的log。
         * ```
         * @Component
         * export default class NewScript extends Script {
         *
         *      protected onStart(): void {
         *          WindowUtil.onDefocused.add(()=>{console.log("游戏窗口失焦，屏幕切出")});
         *          WindowUtil.onFocused.add(()=>{console.log("游戏窗口聚焦，屏幕显现")});
         *      }
         *  }
         * ```
         */
        static get onFocus(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 工具
         * @description 用户游戏窗口失焦，显示器当前游戏窗口切出。调用onDefocused。返回一个多播委托类型。可使用多播委托中的Add、remove、clear、broadcast等函数，当出现窗口聚焦时编写你想要的逻辑。
         */
        static get onDefocus(): mw.MulticastDelegate<() => void>;
        /**
         * @author xiangkun.sun
         * @description 获取屏幕的分辨率大小（不跟随屏幕缩放变化）。
         * @description 此方法仅在客户端调用生效。
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 038 reason: 删除接口 replacement: 使用screenSize替换
         * @groups 玩法
         * @effect 只在客户端调用生效
         * @returns 返回屏幕的分辨率大小。
         * @example
         * 使用示例:调用方法
         * ```
         * let viewportSize = WindowUtil.getViewportSize();
         * console.log(`viewportSize ${viewportSize}`);
         *
         * // 打印输出为：X=1920 Y=1080
         * ```
         */
        static getViewportSize(): mw.Vector2;
        /**
         * @author xiangkun.sun
         * @description 获取屏幕的分辨率大小（不跟随屏幕缩放变化）。
         * @description 此方法仅在客户端调用生效。
         * @groups 玩法
         * @effect 只在客户端调用生效
         * @returns 返回屏幕的分辨率大小。
         * @example
         * 使用示例:调用方法
         * ```
         * let viewportSize = WindowUtil.screenSize;
         * console.log(`viewportSize ${viewportSize}`);
         *
         * // 打印输出为：X=1920 Y=1080
         * ```
         */
        static get screenSize(): mw.Vector2;
    }
}
