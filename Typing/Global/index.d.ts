/// <reference path="../UI/index.d.ts" />
/// <reference path="../Type/index.d.ts" />
/// <reference path="../Core/index.d.ts" />
/// <reference path="../Gameplay/index.d.ts" />
/// <reference path="../Events/index.d.ts" />
/// <reference path="../DataStorage/index.d.ts" />
/// <reference path="../Util/index.d.ts" />
/// <reference path="../Network/index.d.ts" />
/// <reference path="../Extension/index.d.ts" />
/// <reference path="../Settings/index.d.ts" />
/// <reference path="../Service/index.d.ts" />
declare global {
    /**
     * @author jie.wu
     * @description 获取 UI 脚本
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param UI  usage:UI控件
     * @returns UI绑定的脚本
     */
    const findUIScript: typeof mw.findUIScript;
    /**
     * @author jie.wu
     * @description 创建 UIPrefab
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param UIPrefabName usage:指定 UI 自定义控件的相对于工程的路径或则相对于 UI 目录的路径  range: 路径长度不做限制
     * @returns 对应的UI
     */
    const createUIByName: typeof mw.createUIByName;
    /**
     * @author jie.wu
     * @description 创建 UIPrefab
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param UIPath usage:创建 UI 的完整路径  range: 路径长度
     * @returns 对应的UI
     */
    const createUIByPath: typeof mw.createUIByPath;
    /**
     * @author jie.wu
     * @description 异步创建UI，失败返回空
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param UIPath usage:创建 UI 的完整路径  range: 路径长度
     * @returns 对应的UI
     */
    const asyncCreateUIByName: typeof mw.asyncCreateUIByName;
    /**
     * @author jie.wu
     * @description 创建空的 UI
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param panelClass usage:指定 UI 控件身上的行为脚本
     * @returns 对应的UI
     */
    const createUIOnlyClass: typeof mw.createUIOnlyClass;
    /**
     * @author jie.wu
     * @description 创建UIPrefab
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param UIPrefabName usage:指定 UI 自定义控件的相对于工程的路径或则相对于 UI 目录的路径，为空的话等于 createUIOnlyClass  range: 路径长度不做限制
     * @param panelClass usage:继承至 UI 身上脚本的派生类
     * @returns 对应的UI
     */
    const createUI: typeof mw.createUI;
    /**
     * @author jie.wu
     * @description 异步创建UI
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param UIPrefabName usage:指定 UI 自定义控件的相对于工程的路径或则相对于 UI 目录的路径 range: 无
     * @param panelClass usage:继承至 UI 身上脚本的派生类
     * @returns 对应的UI
     */
    const asyncCreateUI: typeof mw.asyncCreateUI;
    /**
     * @author jie.wu
     * @description 异步请求资源的ICON信息
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:038 reason:该接口不再需要 replacement:直接设置ICON即可
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param assets usage:指定资源的id数组
     * @returns 异步回调
     */
    const assetIDChangeIconUrlRequest: typeof mw.assetIDChangeIconUrlRequest;
    /**
     * @author jie.wu
     * @description 获取资源的 ICON 信息
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param asset usage:指定资源的 id  range: 依据资源 ID 长度而定。
     * @param size  usage:指定资源的分辨率尺寸 default: AssetIconSize.Icon_128px
     * @returns 资源的ICON信息
     */
    const getAssetIconDataByAssetID: typeof mw.getAssetIconDataByAssetID;
    /**
     * @author jie.wu
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:039 reason:接口调整 replacement: 使用 releaseTextureFromCache
     * @description 尝试标记资源的 ICON 图为待释放的等待释放
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param asset usage:指定资源的 id  range: 依据资源 ID 长度而定。
     */
    const releaseAssetIconTextureFromCache: typeof mw.releaseAssetIconTextureFromCache;
    /**
     * @author jie.wu
     * @description 尝试标记资源的ICON或则一个URL地址用于释放本地缓存的资源数据
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param id usage:指定资源的 id  range: 依据资源 ID 长度而定。
     */
    const releaseTextureFromCache: typeof mw.releaseTextureFromCache;
    /**
     * @author jie.wu
     * @description 分辨率改变时的回调
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param Delegate usage:传入回调函数
     */
    const getResolutionChanged: typeof mw.getResolutionChanged;
    /** @description 场景 zOrder开始于0*/
    const UILayerScene: typeof mw.UILayerScene;
    /** @description 底层 zOrder开始于100000*/
    const UILayerBottom: typeof mw.UILayerBottom;
    /** @description 中层 zOrder开始于200000*/
    const UILayerMiddle: typeof mw.UILayerMiddle;
    /** @description 独享层(调用此层会自动隐藏Bottom和Middle层) zOrder开始于300000 */
    const UILayerOwn: typeof mw.UILayerOwn;
    /** @description 顶层 zOrder开始于400000*/
    const UILayerTop: typeof mw.UILayerTop;
    /** @description 对话 zOrder开始于500000*/
    const UILayerDialog: typeof mw.UILayerDialog;
    /** @description 系统 zOrder开始于600000*/
    const UILayerSystem: typeof mw.UILayerSystem;
    /** @description 错误 这个层级不可以使用，需要增加层级可以使用addUILayerMap zOrder开始于700000*/
    const UILayerError: typeof mw.UILayerError;
    /**
     * @ignore
     * @description 装饰器，标记控件路径用于自动化使用赋值等操作
     * @effect 只在客户端调用生效
     * @param inPath usage: 路径标记   range:
     */
    const UIWidgetBind: typeof mw.UIWidgetBind;
    /**
     * @ignore
     * @description 装饰器，标记脚本归属能力，提供脚本附加的UI路径等功能
     * @effect 只在客户端调用生效
     * @param bindUIClass usage: 绑定的UI文件路径
     */
    const UIBind: typeof mw.UIBind;
    /**
     * @author jie.wu
     * @description 判定给定坐标是否在geometry下
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @param absolutePosition usage:绝对坐标
     * @returns 坐标是否在geometry下
     */
    const isUnderLocation: typeof mw.isUnderLocation;
    /**
     * @author jie.wu
     * @description 转化绝对坐标到相对坐标
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @param absolutePosition usage:绝对坐标
     * @returns 相对坐标
     */
    const absoluteToLocal: typeof mw.absoluteToLocal;
    /**
     * @author jie.wu
     * @description 将局部坐标转换为绝对坐标,绝对坐标可以是桌面空间，也可以是窗口空间，这取决于小部件层次结构的根所在的空间。
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @param localPosition usage:相对坐标
     * @returns 绝对坐标
     */
    const localToAbsolute: typeof mw.localToAbsolute;
    /**
     * @author jie.wu
     * @description 返回局部空间中几何图形的局部顶部/左侧
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @returns 返回LeftTop
     */
    const getLocalTopLeft: typeof mw.getLocalTopLeft;
    /**
     * @author jie.wu
     * @description 返回局部空间中几何图形的大小
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @returns 返回Size
     */
    const getLocalSize: typeof mw.getLocalSize;
    /**
     * @author jie.wu
     * @description 返回绝对空间中几何图形的大小
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @returns 返回Size
     */
    const getAbsoluteSize: typeof mw.getAbsoluteSize;
    /**
     * @author jie.wu
     * @description 转化绝对空间下矢量到局部空间下
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @param absoluteVector usage:绝对空间矢量
     * @returns 局部空间下矢量
     */
    const transformVectorAbsoluteToLocal: typeof mw.transformVectorAbsoluteToLocal;
    /**
     * @author jie.wu
     * @description 转化局部空间下矢量到绝对空间下
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @param localVector usage:局部空间下矢量
     * @returns 绝对空间矢量
     */
    const transformVectorLocalToAbsolute: typeof mw.transformVectorLocalToAbsolute;
    /**
     * @author jie.wu
     * @description 将几何体的局部坐标转换为局部视口坐标。
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @param localPosition usage:局部坐标
     * @param outPixelPosition usage:可用于线的轨迹和其他用途，你需要在视口分辨率单位的空间坐标。
     * @param outViewportPosition usage:如果你想添加另一个控件到视口空间相同的位置
     */
    const localToViewport: typeof mw.localToViewport;
    /**
     * @author jie.wu
     * @description 将桌面空间中几何图形的绝对坐标转换为本地视口坐标
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param absoluteDesktopPosition usage:绝对桌面坐标
     * @param outPixelPosition usage:可用于线的轨迹和其他用途，你需要在视口分辨率单位的空间坐标
     * @param outViewportPosition usage:如果你想添加另一个小部件到视口空间相同的位置
     */
    const absoluteToViewport: typeof mw.absoluteToViewport;
    /**
     * @author jie.wu
     * @description 将屏幕位置(以像素为单位)转换为具有给定几何形状的小部件的本地空间。如果bIncludeWindowPosition为真，那么这个方法也将移除游戏窗口的位置(在窗口模式下有用)。
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:集合体
     * @param screenPosition usage:屏幕位置
     * @param isIncludeWindowPosition usage:是否移除游戏窗口位置(在窗口模式下有用) default: false
     * @returns 控件的本地位置
     */
    const screenToWidgetLocal: typeof mw.screenToWidgetLocal;
    /**
     * @author jie.wu
     * @description 将屏幕位置(像素)转换为绝对桌面程序坐标。如果bIncludeWindowPosition为真，那么这个方法也将移除游戏窗口的位置(在窗口模式下有用)。
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param screenPosition usage:屏幕位置
     * @param isIncludeWindowPosition usage:是否移除游戏窗口位置(在窗口模式下有用) default:false
     * @returns 绝对桌面程序坐标
     */
    const screenToWidgetAbsolute: typeof mw.screenToWidgetAbsolute;
    /**
     * @author jie.wu
     * @description 将屏幕位置(以像素为单位)转换为视口控件的本地空间。
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param screenPosition usage:屏幕位置
     * @returns 本地位置
     */
    const screenToViewport: typeof mw.screenToViewport;
    /**
     * @author jie.wu
     * @description 获取当前鼠标所在的绝对位置
     * @groups 界面
     * @effect  只在客户端调用生效
     * @returns 绝对位置
     */
    const getCurrentMousePosition: typeof mw.getCurrentMousePosition;
    /**
     * @author jie.wu
     * @description 获取上一次鼠标所在的绝对位置
     * @groups 界面
     * @effect  只在客户端调用生效
     * @returns 绝对位置
     */
    const getLastMousePosition: typeof mw.getLastMousePosition;
    /**
     * @author jie.wu
     * @description 设置只允许UI响应用户输入的输入模式。
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param InWidgetToFocus usage:响应输入模式的widget default:null
     * @param InMouseLockMode usage:鼠标锁定的输入模式 default:UIType.MouseLockMode.DoNotLock
     */
    const setInputModeUIOnly: typeof mw.setInputModeUIOnly;
    /**
     * @author jie.wu
     * @description 设置一个输入模式，只允许UI响应用户输入，如果UI不处理它，玩家输入/玩家控制器就有机会
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param InWidgetToFocus usage:响应输入模式的widget default:null
     * @param InMouseLockMode usage:鼠标锁定的输入模式 default:UIType.MouseLockMode.DoNotLock
     * @param hideCursorDuringCapture usage:是否隐藏光标 default:true
     */
    const setInputModeGameAndUI: typeof mw.setInputModeGameAndUI;
    /**
     * @author jie.wu
     * @description 设置一个输入模式，只允许玩家输入/玩家控制器响应用户输入
     * @groups 界面
     * @effect 只在客户端调用生效
     */
    const setInputModeGameOnly: typeof mw.setInputModeGameOnly;
    /**
     * @author jie.wu
     * @description 设置关注游戏窗口
     * @groups 界面
     * @effect 只在客户端调用生效
     */
    const setFocusToGameViewport: typeof mw.setFocusToGameViewport;
    /**
     * @author jie.wu
     * @description 中断一个拖拽事件, 传入一个操作的事件
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param InReply usage:事件
     */
    const endDragDrop: typeof mw.endDragDrop;
    /**
     * @author jie.wu
     * @description 中断所有的DragDrop
     * @groups 界面
     * @effect 只在客户端调用生效
     */
    const cancelDragDrop: typeof mw.cancelDragDrop;
    /**
     * @author jie.wu
     * @description 判断当前是否有一个DragDrop事件
     * @groups 界面
     * @effect 只在客户端调用生效
     * @returns boolean
     */
    const isDragDropping: typeof mw.isDragDropping;
    /**
     * @author jie.wu
     * @description 获取当前的DragDrop事件
     * @groups 界面
     * @effect 只在客户端调用生效
     * @returns 返回当前的DragDrop事件
     */
    const getDragDroppingContent: typeof mw.getDragDroppingContent;
    /**
     * @author jie.wu
    * @description 获取应用于视口和所有小部件的当前DPI Scale。
    * @groups 界面
    * @effect 只在客户端调用生效
    * @returns 返回应用于视口和所有小部件的当前DPI Scale。
    */
    const getViewportScale: typeof mw.getViewportScale;
    /**
     * @author jie.wu
    * @description 获取游戏视口的大小。
    * @groups 界面
    * @effect 只在客户端调用生效
    * @returns 返回游戏视口的大小。
    */
    const getViewportSize: typeof mw.getViewportSize;
    /**
     * @author jie.wu
     * @description 获取包含添加到“视口”中的所有控件的控件的几何形状。你可以使用这个几何图形在绝对和本地空间的控件之间转换控件。
     * @groups 界面
     * @effect 只在客户端调用生效
     * @returns 返回所有控件的控件的几何形状
     */
    const getViewportWidgetGeometry: typeof mw.getViewportWidgetGeometry;
    /**
     * @author jie.wu
     * @description 获取包含添加到“player screen”的所有控件的控件的几何形状。你可以使用这个几何图形在绝对和本地空间的控件之间转换控件。
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param player usage:玩家在游戏世界中的位置投射到屏幕上的控制器
     * @returns 返回所有控件的控件的几何形状
     */
    const getPlayerScreenWidgetGeometry: typeof mw.getPlayerScreenWidgetGeometry;
    /**
     * @author jie.wu
    * @description 获取平台的鼠标光标位置。这是鼠标的绝对桌面位置。
    * @groups 界面
    * @effect 只在客户端调用生效
    * @returns 返回平台的鼠标光标位置。这是鼠标的绝对桌面位置。
    */
    const getMousePositionOnPlatform: typeof mw.getMousePositionOnPlatform;
    /**
     * @author jie.wu
    * @description 获取平台的鼠标光标在视口控件的本地空间中的位置。
    * @groups 界面
    * @effect 只在客户端调用生效
    * @returns 返回平台的鼠标光标在视口控件的本地空间中的位置。
    */
    const getMousePositionOnViewport: typeof mw.getMousePositionOnViewport;
    /**
     * @ignore
     * @description 用于标记ui类型
     * @effect  调用生效
     * @param InName usage:UI原类名    range:设置合理的名称即可
     */
    const UIPack: typeof mw.UIPack;
    /**
     * @author jianke.feng
     * @groups 界面/控件/文本
     * @description 文本风格类型
     * @networkStatus usage:客户端
     */
    const TextStyle: typeof mw.TextStyle;
    type TextStyle = mw.TextStyle;
    /**
     * @author jianke.feng
     * @groups 界面/基础
     * @description UI 对象
     * @description ----------------------------
     * @description 当你 UIPrefab 制作完成挂载到对象管理器中时，他便成为场景中的一份子，可以使用 GameObject 来查找。
     * @description 此类中的方法均在客户端调用。
     * @networkStatus usage:客户端
     */
    const UIObject: typeof mw.UIObject;
    type UIObject = mw.UIObject;
    /**
    * @author jie.wu
    * @groups 界面/基础
    * @description UI 的驱动脚本基类
    * @description -----------------------
    * @description 1. UIScript 是如何工作的？
    * @description 当你想要使用编辑器的 UI 功能时，便很大几率要接触 UIScript，除非使用 UserWidget 自定义创建界面。
    * @description 继承自 UIScript 与继承自 Script 的脚本有所不同，继承自 Script 的脚本挂载在对象管理器中，编辑器会自动帮你调用生命周期函数。但是继承自 UIScript 的脚本放置在对象管理器中，编辑器是不会自动帮你调用生命周期函数的。
    * @description 他需要依赖 UIService 或 UIPrefab。
    * @description 2. 继承自 UIScript 脚本享受的生命周期有哪些？
    * @description :cactus: 这里有详细的描述
    * @description [LifeCycleandEventDescriptionofUIScripts](https://docs.ark.online/UI/LifeCycleandEventDescriptionofUIScripts.html)
    * @description 3. 什么时候编辑器会帮你调用 UI 的生命周期呢？
    * @description 有两种方式：
    * @description - 使用 UIService 帮你管理此脚本，当 UIService.create 并 show 时，会启动脚本的生命周期。
    * @description - 使用 UIPrefab。脚本挂载在 UIPrefab 上，并把 UIPrefab 放在对象管理器中。
    * @networkStatus usage:客户端
    */
    const UIScript: typeof mw.UIScript;
    type UIScript = mw.UIScript;
    /**
     * @author wei.yang
     * @groups 界面/基础
     * @description UI 管理类
     * @description 1. 关于 UI 的一些名词解释
     * @description - UIPrefab/世界 UI/屏幕 UI/UI 脚本
     * @description 2. 屏幕 UI 是如何使用并启动的呢？
     * @description 你有三种方式使用并启动你游戏中的屏幕 UI：
     * @description - :cactus: 通过 UIService 来控制继承自 UIScript 的脚本，来管理你的屏幕 UI。
     * @example
     * 使用示例: 创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在场景中生成一个屏幕 UI - 按钮。
     * ```ts
     *  @Component
     *  export default class NewScript extends Script {
     *
     *      protected onStart(): void {
     *          if(SystemUtil.isClient()){
     *              UIService.show(NewUIScript);
     *          }
     *      }
     *  }
     *
     *  class NewUIScript extends UIScript {
     *
     *      button:StaleButton;
     *
     *      protected onStart() {
     *          //设置能否每帧触发onUpdate
     *          this.canUpdate = false;
     *          this.layer = UILayerMiddle;
     *
     *          this.button = StaleButton.newObject(this.rootCanvas);
     *
     *          this.button.text = "按下变红";
     *          this.button.transitionEnable = true;
     *          this.button.pressedImagColor = LinearColor.red;
     *          this.button.visibility = SlateVisibility.Visible;
     *          this.button.onClicked.add(() => {
     *              console.log("click");
     *          })
     *      }
     *  }
     * ```
     * @description 当然如果 UIPrefab 挂载了某一个继承自 UIScript 的脚本，也是可以用 UIService 管理。不用手动挂载在对象管理器中。
     * @description - :cactus: 对象管理器挂载 UIPrefab 启动屏幕 UI。
     * @description - :cactus: 使用 UserWidget 和代码自定义创建屏幕 UI。
     * @example
     * 使用示例:创建一个名为 NewExample 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键，可以将按钮移动到玩家所在位置
     * ```ts
     * @Component
     * export default class NewExample extends Script {
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
     * @description 不论你是用 UIPrefab 创建了一个屏幕 UI，还是使用代码动态编辑了一个屏幕 UI，都可以达到你想要的效果。
     * @description 可以继承此类，自带一个全局 UI 作为 UI 的总节点。需要在全局调用，否则会自动在第一个 UI 生成时自动生成一个默认的管理类。
     * @networkStatus usage:客户端
     */
    const UIService: typeof mw.UIService;
    type UIService = mw.UIService;
    /**
     * @author jie.wu
     * @groups 界面/控件/容器
     * @description 容器
     * @description ----------------------
     * @description 可挂载叶子节点的根节点，以及提供各种自动布局功能
     * @networkStatus usage:客户端
     */
    const Canvas: typeof mw.Canvas;
    type Canvas = mw.Canvas;
    /**
     * @author jie.wu
     * @groups 界面/事件
     * @description UI 拖拽事件
     * @networkStatus usage:客户端
     */
    const DragDropOperation: typeof mw.DragDropOperation;
    type DragDropOperation = mw.DragDropOperation;
    /**
     * @author jie.wu
     * @groups 界面/控件/自定义控件
     * @description 自定义控件
     * @description UI控件的集合，预制体UI
     * @networkStatus usage:客户端
     */
    const UserWidget: typeof mw.UserWidget;
    type UserWidget = mw.UserWidget;
    /**
     * @hidden
     * @author jie.wu
     * @groups 界面
     * @description ui预制体
     * @networkStatus usage:客户端
     */
    const UserWidgetPrefab: typeof mw.UserWidgetPrefab;
    type UserWidgetPrefab = mw.UserWidgetPrefab;
    /**
     * @author jianke.feng
     * @groups 界面/控件/勾选框
     * @description 勾选框
     * @networkStatus usage:客户端
     */
    const Checkbox: typeof mw.Checkbox;
    type Checkbox = mw.Checkbox;
    /**
     * @author jie.wu
     * @groups 界面/控件/遥杆
     * @description 摇杆
     * @networkStatus usage:客户端
     */
    const VirtualJoystickPanel: typeof mw.VirtualJoystickPanel;
    type VirtualJoystickPanel = mw.VirtualJoystickPanel;
    /**
     * @author jianke.feng
     * @groups 界面/控件/按钮
     * @description 按钮
     * @description -------------------------
     * @description 无默认文本
     * @networkStatus usage:客户端
     */
    const Button: typeof mw.Button;
    type Button = mw.Button;
    /**
     * @author jie.wu
     * @groups 界面/基础
     * @description 控件的基类
     * @description ---------------
     * @description 可挂载叶子节点的根节点，以及提供各种自动布局功能。
     * @description 放置控件需要的通用属性与方法。
     * @networkStatus usage:客户端
     */
    const Widget: typeof mw.Widget;
    type Widget = mw.Widget;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 帧动画播放规则
     */
    const PlayStatus: typeof mw.PlayStatus;
    type PlayStatus = mw.PlayStatus;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 输入框回车键功能
     */
    const InsertNewLineType: typeof mw.InsertNewLineType;
    type InsertNewLineType = mw.InsertNewLineType;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 选中规则
     */
    const CheckBoxState: typeof mw.CheckBoxState;
    type CheckBoxState = mw.CheckBoxState;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 自动布局排版规则-排列规则
     */
    const UILayoutPacket: typeof mw.UILayoutPacket;
    type UILayoutPacket = mw.UILayoutPacket;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 自动布局排版规则-容器类型
     */
    const UILayoutType: typeof mw.UILayoutType;
    type UILayoutType = mw.UILayoutType;
    /**
    * @author jianke.feng
    * @groups 界面
    * @description 自动布局容器水平适应规则
    */
    const UIHugContentHorizontally: typeof mw.UIHugContentHorizontally;
    type UIHugContentHorizontally = mw.UIHugContentHorizontally;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 自动布局容器垂直适应规则
     */
    const UIHugContentVertically: typeof mw.UIHugContentVertically;
    type UIHugContentVertically = mw.UIHugContentVertically;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 自动布局子项布局排序 - 水平排序
     */
    const UIHorizontalCollation: typeof mw.UIHorizontalCollation;
    type UIHorizontalCollation = mw.UIHorizontalCollation;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 自动布局子项布局排序 - 垂直排序
     */
    const UIVerticalCollation: typeof mw.UIVerticalCollation;
    type UIVerticalCollation = mw.UIVerticalCollation;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 文本框规则显示规则限制
     */
    const UITextHorizontalLayout: typeof mw.UITextHorizontalLayout;
    type UITextHorizontalLayout = mw.UITextHorizontalLayout;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 滚动框动画类型
     */
    const UIScrollBoxAnimationType: typeof mw.UIScrollBoxAnimationType;
    type UIScrollBoxAnimationType = mw.UIScrollBoxAnimationType;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 对齐策略水平规则
     */
    const UIConstraintHorizontal: typeof mw.UIConstraintHorizontal;
    type UIConstraintHorizontal = mw.UIConstraintHorizontal;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 对齐策略垂直规则
     */
    const UIConstraintVertical: typeof mw.UIConstraintVertical;
    type UIConstraintVertical = mw.UIConstraintVertical;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 字体类型
     */
    const UIFontGlyph: typeof mw.UIFontGlyph;
    type UIFontGlyph = mw.UIFontGlyph;
    /**
     * @author yang.zheng
     * @groups 界面
     * @description 字体
     */
    const UIFontFamily: typeof mw.UIFontFamily;
    type UIFontFamily = mw.UIFontFamily;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 文本排列对齐规则
     */
    const TextJustify: typeof mw.TextJustify;
    type TextJustify = mw.TextJustify;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 文本排列垂直对齐规则
     */
    const TextVerticalJustify: typeof mw.TextVerticalJustify;
    type TextVerticalJustify = mw.TextVerticalJustify;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 按钮点击响应规则
     */
    const ButtonClickMethod: typeof mw.ButtonClickMethod;
    type ButtonClickMethod = mw.ButtonClickMethod;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 按钮触摸响应规则
     */
    const ButtonTouchMethod: typeof mw.ButtonTouchMethod;
    type ButtonTouchMethod = mw.ButtonTouchMethod;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 按钮按压响应规则
     */
    const ButtonPressMethod: typeof mw.ButtonPressMethod;
    type ButtonPressMethod = mw.ButtonPressMethod;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description UI节点显示规则
     */
    const SlateVisibility: typeof mw.SlateVisibility;
    type SlateVisibility = mw.SlateVisibility;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 鼠标锁定模式
     */
    const MouseLockMode: typeof mw.MouseLockMode;
    type MouseLockMode = mw.MouseLockMode;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 相机控制模式
     */
    const CameraControlType: typeof mw.CameraControlType;
    type CameraControlType = mw.CameraControlType;
    /**
      * @author jie.wu
      * @groups 界面/事件
      * @description 拖拽事件数据传递类
      * @networkStatus usage:客户端
      */
    const DragDropPayLoad: typeof mw.DragDropPayLoad;
    type DragDropPayLoad = mw.DragDropPayLoad;
    /**
     * @author jie.wu
     * @groups 界面/控件/输入框
     * @description 输入框
     * @networkStatus usage:客户端
     */
    const InputBox: typeof mw.InputBox;
    type InputBox = mw.InputBox;
    /**
     * @author jianke.feng
     * @groups 界面/控件/下拉框
     * @description Dropdown
     * @networkStatus usage:客户端
     */
    const Dropdown: typeof mw.Dropdown;
    type Dropdown = mw.Dropdown;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 滚动框类型
     */
    const Orientation: typeof mw.Orientation;
    type Orientation = mw.Orientation;
    /**
     * @author jie.wu
     * @groups 界面/控件/绘图画布
     * @description 图元绘制基础参数
     * @networkStatus usage:客户端
     */
    const DrawDataBase: typeof mw.DrawDataBase;
    type DrawDataBase = mw.DrawDataBase;
    /**
     * @author jie.wu
     * @groups 界面/控件/绘图画布
     * @description UI 画布
     * @networkStatus usage:客户端
     */
    const DrawCanvas: typeof mw.DrawCanvas;
    type DrawCanvas = mw.DrawCanvas;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 光标类型
     */
    const MouseCursor: typeof mw.MouseCursor;
    type MouseCursor = mw.MouseCursor;
    /**
     * @description  滚动条默认位置
     * @groups 界面
     * @author jianke.feng
     *
     */
    const ScrollBarDefaultLocation: typeof mw.ScrollBarDefaultLocation;
    type ScrollBarDefaultLocation = mw.ScrollBarDefaultLocation;
    /**
     * @author jie.wu
     * @groups 界面/控件/帧动画
     * @description 帧动画控件
     * @networkStatus usage:客户端
     */
    const FlipBook: typeof mw.FlipBook;
    type FlipBook = mw.FlipBook;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 进度条填充规则
     */
    const ProgressBarFillType: typeof mw.ProgressBarFillType;
    type ProgressBarFillType = mw.ProgressBarFillType;
    /**
     * @author jie.wu
     * @groups 界面/控件/图片
     * @description 图片
     * @networkStatus usage:客户端
     */
    const Image: typeof mw.Image;
    type Image = mw.Image;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description UI颜色应用模式
     */
    const SlateColorStylingMode: typeof mw.SlateColorStylingMode;
    type SlateColorStylingMode = mw.SlateColorStylingMode;
    /**
     * @author maohang.zeng
     * @groups 界面/控件/列表视图
     * @description 列表视图
     * @networkStatus usage: 客户端
     */
    const ListView: typeof mw.ListView;
    type ListView = mw.ListView;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 图片画刷绘制模式
     */
    const SlateBrushDrawType: typeof mw.SlateBrushDrawType;
    type SlateBrushDrawType = mw.SlateBrushDrawType;
    /**
     * @author jianke.feng
     * @groups 界面/控件/遮罩按钮
     * @description 遮罩按钮
     * @networkStatus usage:客户端
     */
    const MaskButton: typeof mw.MaskButton;
    type MaskButton = mw.MaskButton;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 图片画刷填充模式
     */
    const SlateBrushTileType: typeof mw.SlateBrushTileType;
    type SlateBrushTileType = mw.SlateBrushTileType;
    /**
     * @author jie.wu
     * @groups 界面/控件/容器
     * @description 遮罩容器
     * @description ----------------------
     * @description 类继承widget，自带添加、移除子级控件的功能
     * @networkStatus usage:客户端
     */
    const Mask: typeof mw.Mask;
    type Mask = mw.Mask;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 输入框限制
     */
    const InputTextLimit: typeof mw.InputTextLimit;
    type InputTextLimit = mw.InputTextLimit;
    /**
    * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason: 删除接口 replacement:挂载相关功能已全移动到 Widget 控件
    * @author jie.wu
    * @groups 界面/控件
    * @description UI 控件中，可以挂载子控件的父类。
    * @description ---------------------
    * @description 注：029版本会更新，此类会废弃，所有的控件均可挂载子控件。029之前的版本只允许 ScrollBox、Canvas、Button挂载子控件。
    * @networkStatus usage:客户端
    */
    const PanelWidget: typeof mw.PanelWidget;
    type PanelWidget = mw.PanelWidget;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 输入提交模式
     */
    const TextCommit: typeof mw.TextCommit;
    type TextCommit = mw.TextCommit;
    /**
     * @author jie.wu
     * @groups 界面/控件/进度条
     * @description 进度条
     * @networkStatus usage:客户端
     */
    const ProgressBar: typeof mw.ProgressBar;
    type ProgressBar = mw.ProgressBar;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 拖拽的锚点
     */
    const DragPivot: typeof mw.DragPivot;
    type DragPivot = mw.DragPivot;
    /**
    * @author maohang.zeng
    * @groups 界面
    * @description 列表视图节点数据基类
    * @networkStatus usage:客户端
    */
    const ListViewItemDataBase: typeof mw.ListViewItemDataBase;
    type ListViewItemDataBase = mw.ListViewItemDataBase;
    /**
    * @author jie.wu
    * @groups 界面/控件/调色板
    * @description 调色板
    * @networkStatus usage:客户端
    */
    const ColorPick: typeof mw.ColorPick;
    type ColorPick = mw.ColorPick;
    /**
    * @author jie.wu
    * @groups 界面
    * @description 进度条滑动的方式
    */
    const SlideMethod: typeof mw.SlideMethod;
    type SlideMethod = mw.SlideMethod;
    /**
     * @author cheng.zeng
     * @groups 界面/控件/广告按钮
     * @description 广告按钮，请注意广告按钮不允许被遮挡
     * @description 需要在游戏中使用 onshow/onclose 才能播放广告
     * @description 当其上方有任何非隐藏/折叠的UI时，广告按钮将无法生效
     * @networkStatus usage:客户端
     */
    const AdsButton: typeof mw.AdsButton;
    type AdsButton = mw.AdsButton;
    /**
   * @author jie.wu
   * @groups 界面/控件/滚动框
   * @description 滑动框
   * @networkStatus usage:客户端
   */
    const ScrollBox: typeof mw.ScrollBox;
    type ScrollBox = mw.ScrollBox;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 遮罩类型
     */
    const MaskButtonType: typeof mw.MaskButtonType;
    type MaskButtonType = mw.MaskButtonType;
    /**
     * @author wei.yang
     * @groups 界面
     * @description 菜单项节点信息
     * @networkStatus usage:客户端
     */
    const MenuItemInfo: typeof mw.MenuItemInfo;
    type MenuItemInfo = mw.MenuItemInfo;
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 新版遮罩类型
     */
    const MaskType: typeof mw.MaskType;
    type MaskType = mw.MaskType;
    /**
    * @author jie.wu
    * @groups 界面/控件/文本按钮
    * @description 文本按钮
    * @networkStatus usage:客户端
    * @example
    * 使用示例:创建一个名为"NewScript"的脚本，放置在对象管理器对象子级中，打开脚本，输入以下代码保存，运行游戏，屏幕显示一个按钮。
    * ```ts
    * @Component
    * export default class NewScript extends Script {
    *
    *     protected onStart(): void {
    *         if(SystemUtil.isClient()){
    *             if(SystemUtil.isClient()){
    *                 let mainui = UIService.create(UI_Main);
    *                 UIService.showUI(mainui);
    *                 UIService.canvas.addChild(mainui.button);
    *             }
    *         }
    *     }
    * }
    * class UI_Main extends UIScript {
    *
    *     button: StaleButton = undefined;
    *
    *     public onAwake() {
    *         let size = WindowUtil.getViewportSize();
    *
    *         this.button = StaleButton.newObject();
    *         this.button.transform = new UITransform(size.x/2,size.y/2,size.x / 14, size.y / 20);
    *
    *         this.button.size = new Vector2(size.x / 14, size.y / 20);
    *         this.button.text = "StaleButton";
    *         this.button.fontSize = 18;
    *         this.button.transitionEnable = true;
    *         InputUtil.bindButton(Keys.X, this.button);
    *         this.button.setPressedImageColorDecimal(200, 200, 200, 255);
    *         this.button.onClicked.add(() => {
    *             // 当按下按钮执行以下逻辑
    *             console.log("The \"StaleButton\" button was pressed ~");
    *         });
    *     }
    * }
    * ```
    */
    const StaleButton: typeof mw.StaleButton;
    type StaleButton = mw.StaleButton;
    /**
     * @author maohang.zeng
     * @groups 界面
     * @description 列表视图选择模式
     */
    const SelectionMode: typeof mw.SelectionMode;
    type SelectionMode = mw.SelectionMode;
    /**
     * @author wei.yang
     * @groups 界面
     * @description 选项卡组
     * @networkStatus usage:客户端
     */
    const TabGroup: typeof mw.TabGroup;
    type TabGroup<T extends TabGroupOnClickedProps> = mw.TabGroup<T>;
    /**
     * @author maohang.zeng
     * @groups 界面
     * @description 列表视图选择来源信息
     */
    const SelectInfo: typeof mw.SelectInfo;
    type SelectInfo = mw.SelectInfo;
    /**
    * @author jie.wu
    * @groups 界面/控件/文本
    * @description 文本
    * @networkStatus usage:客户端
    */
    const TextBlock: typeof mw.TextBlock;
    type TextBlock = mw.TextBlock;
    /**
     * @author wei.yang
     * @groups 界面
     * @description 菜单呼出位置枚举
     */
    const MenuPlacement: typeof mw.MenuPlacement;
    type MenuPlacement = mw.MenuPlacement;
    /**
     * @author maohang.zeng
     * @groups 界面/控件/平铺视图
     * @description 平铺视图
     * @networkStatus usage: 客户端
     */
    const TileView: typeof mw.TileView;
    type TileView = mw.TileView;
    /**
     * @author maohang.zeng
     * @groups 界面
     * @description 图标的分辨率
     */
    const AssetIconSize: typeof mw.AssetIconSize;
    type AssetIconSize = mw.AssetIconSize;
    /**
     * @author jianke.feng
     * @groups 界面/控件/菜单锚点
     * @description 菜单锚点
     * @networkStatus usage:客户端
     */
    const MenuAnchor: typeof mw.MenuAnchor;
    type MenuAnchor = mw.MenuAnchor;
    /**
     * @author jie.wu
     * @groups 界面/配置
     * @description 基础的边距，提供4个方向的数值修改
     * @networkStatus usage:客户端
     */
    const Margin: typeof mw.Margin;
    type Margin = mw.Margin;
    /**
     * @author jie.wu
     * @groups 界面/控件/绘图画布
     * @description 自定义绘制图元数据
     * @networkStatus usage:客户端
     */
    const UIDrawCustomVertex: typeof mw.UIDrawCustomVertex;
    type UIDrawCustomVertex = mw.UIDrawCustomVertex;
    /**
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason: 删除接口 replacement:控件属性 autoSizeHorizontalEnable()/autoSizeVerticalEnable()
     * @author jie.wu
     * @groups 界面/控件/容器
     * @description 容器自动布局大小适应规则
     * @networkStatus usage:客户端
     */
    const UIHugContent: typeof mw.UIHugContent;
    type UIHugContent = mw.UIHugContent;
    /**
     * @author jie.wu
     * @groups 界面/控件/摄像机滑动区
     * @description 摄像机滑动区
     * @networkStatus usage:客户端
     */
    const TouchPad: typeof mw.TouchPad;
    type TouchPad = mw.TouchPad;
    /**
     * @author jie.wu
     * @groups 界面/控件/容器
     * @description 容器自动布局子项排序规则
     * @networkStatus usage:客户端
     */
    const UIChildCollation: typeof mw.UIChildCollation;
    type UIChildCollation = mw.UIChildCollation;
    /**
     * @author jie.wu
     * @groups 界面/控件/容器
     * @description 容器自动布局规则
     * @networkStatus usage:客户端
     */
    const UILayout: typeof mw.UILayout;
    type UILayout = mw.UILayout;
    /**
    * @author maohang.zeng
    * @groups 界面
    * @description 树状视图节点数据基类
    * @networkStatus usage: 客户端
    */
    const TreeViewItemDataBase: typeof mw.TreeViewItemDataBase;
    type TreeViewItemDataBase = mw.TreeViewItemDataBase;
    /**
     * @author jie.wu
     * @groups 界面/配置
     * @description Transform
     * @networkStatus usage:客户端
     */
    const UITransform: typeof mw.UITransform;
    type UITransform = mw.UITransform;
    /**
     * @author maohang.zeng
     * @groups 界面/控件/树状视图
     * @description 树状视图
     * @networkStatus usage: 客户端
     */
    const TreeView: typeof mw.TreeView;
    type TreeView = mw.TreeView;
    /**
     * @author jie.wu
     * @groups 界面/配置
     * @description 节点对齐规则
     * @networkStatus usage:客户端
     */
    const UIConstraintAnchors: typeof mw.UIConstraintAnchors;
    type UIConstraintAnchors = mw.UIConstraintAnchors;
    /**
     * @author jie.wu
     * @groups 界面/配置
     * @description 字体信息
     * @networkStatus usage:客户端
     */
    const UIFontInfo: typeof mw.UIFontInfo;
    type UIFontInfo = mw.UIFontInfo;
    /**
     * @author jie.wu
     * @groups 界面/控件/遥杆
     * @description 摇杆信息
     * @networkStatus usage:客户端
     */
    const JoystickStyleDesigner: typeof mw.JoystickStyleDesigner;
    type JoystickStyleDesigner = mw.JoystickStyleDesigner;
    /**
     * @author jie.wu
     * @groups 界面/控件/遥杆
     * @description 颜色管理
     * @networkStatus usage:客户端
     */
    const SlateColor: typeof mw.SlateColor;
    type SlateColor = mw.SlateColor;
    /**
     * @author jie.wu
     * @groups 界面
     * @description 几何坐标信息
     * @networkStatus usage:客户端
     */
    const Geometry: typeof mw.Geometry;
    type Geometry = mw.Geometry;
    /**
     * @hidden
     * @author jie.wu
     * @groups 输入
     * @description 输入事件
     * @networkStatus usage:客户端
     */
    const InputEvent: typeof mw.InputEvent;
    type InputEvent = mw.InputEvent;
    /**
     * @hidden
     * @author jie.wu
     * @groups 界面
     * @description 焦点事件
     * @networkStatus usage:客户端
     */
    const FocusEvent: typeof mw.FocusEvent;
    type FocusEvent = mw.FocusEvent;
    /**
     * @author jie.wu
     * @groups 界面/事件
     * @description 角色输入事件
     * @networkStatus usage:客户端
     */
    const CharacterEvent: typeof mw.CharacterEvent;
    type CharacterEvent = mw.CharacterEvent;
    /**
     * @author jie.wu
     * @groups 界面/事件
     * @description 按键事件
     * @networkStatus usage:客户端
     */
    const KeyEvent: typeof mw.KeyEvent;
    type KeyEvent = mw.KeyEvent;
    /**
    * @author jie.wu
    * @groups 界面/事件
    * @description 点击或者滑动的时候传递mobile touch,鼠标,键盘信息的类
    * @networkStatus usage:客户端
    */
    const PointerEvent: typeof mw.PointerEvent;
    type PointerEvent = mw.PointerEvent;
    /**
    * @author jie.wu
    * @groups 界面/事件
    * @description 事件回复
    * @networkStatus usage:客户端
    */
    const EventReply: typeof mw.EventReply;
    type EventReply = mw.EventReply;
    /**
    * @author jie.wu
    * @groups 界面/控件/图片
    * @description 资源 icon 信息
    * @networkStatus usage:客户端
    */
    const AssetIconData: typeof mw.AssetIconData;
    type AssetIconData = mw.AssetIconData;
    /**
    * @author jie.wu
    * @groups 界面/控件/遥杆
    * @description 摇杆按键绑定
    * @networkStatus usage:客户端
    */
    const JoystickBindKeyType: typeof mw.JoystickBindKeyType;
    type JoystickBindKeyType = mw.JoystickBindKeyType;
    /**
     * @author jianke.feng
     * @description 图片信息类
     * @groups 界面/控件/图片
     * @networkStatus usage:客户端
     */
    const ImageInfo: typeof mw.ImageInfo;
    type ImageInfo = mw.ImageInfo;
    /**
     * @author zheng.zeng
     * @description Checkbox 控件风格类型
     * @groups 界面/控件/勾选框
     * @networkStatus usage:客户端
     */
    const CheckboxStyle: typeof mw.CheckboxStyle;
    type CheckboxStyle = mw.CheckboxStyle;
    /**
     * @author zheng.zeng
     * @description Button 控件风格类型
     * @groups 界面/控件/按钮
     * @networkStatus usage:客户端
     */
    const ButtonStyle: typeof mw.ButtonStyle;
    type ButtonStyle = mw.ButtonStyle;
    /**
     * @author zheng.zeng
     * @description Dropdown 控件风格类型
     * @groups 界面/控件/下拉框
     * @networkStatus usage:客户端
     */
    const DropdownStyle: typeof mw.DropdownStyle;
    type DropdownStyle = mw.DropdownStyle;
    /**
     * @author jianke.feng
     * @groups 界面/控件/滚动框
     * @description 滚动条风格类型
     * @networkStatus usage:客户端
     */
    const ScrollbarStyle: typeof mw.ScrollbarStyle;
    type ScrollbarStyle = mw.ScrollbarStyle;
    /**
     * @author jianke.feng
     * @groups 界面/控件/图片
     * @description 背景图片风格类型
     * @networkStatus usage:客户端
     */
    const ListItemStyle: typeof mw.ListItemStyle;
    type ListItemStyle = mw.ListItemStyle;
    /**
    * @author jianke.feng
    * @description 选项卡组-点击事件type
    * @groups 界面
    */
    type TabGroupOnClickedProps = mw.TabGroupOnClickedProps;
    /**
     * @author shilong.wang
     * @groups 基础类型/代理
     * @description 代理
     * @description ----------------------------------------
     * @description 代理是一种设计模式，它允许你创建一个中间层对象来控制对另一个对象的访问。
     * @description 代理是如何工作的呢 ?
     * @description - 编辑器已封装好代理功能，或许与你之前使用代理方式不同，不过这种方式对于你来说或许更方便了。
     * @description - add 方法添加需要代理的具体事务。
     * @description - call 方法执行代理。
     * @description 为什么要使用代理 ?
     * @description - 代理可以作为一个门卫，对对象的访问进行控制和限制。它可以验证调用者的权限、限制对敏感操作的访问或者记录访问日志等。代理模式允许你在不改变原始对象的情况下，对其进行安全增强。
     * @description - 代理对象可以在第一次访问时负责创建或初始化真正的对象，并将后续的访问重定向到已创建的对象。
     * @description  - 等等..。
     * @description 如何通俗易懂了解代理 ?
     * @description 假设你是一个忙碌的公司老板，你需要处理很多事务，包括与客户交流、签署文件等等。但是，由于你的时间有限，你无法亲自处理所有的事务。所以你决定雇佣一名助手来帮助你处理这些事务。这名助手就是你的代理。
     * @description 代理（助手）具有与你相同的能力和职责，他可以代表你与客户进行交流、签署文件等等。当有事务需要处理时，你将任务委托给代理，代理会代替你执行相关的操作。然而，代理并不是完全取代你的存在。虽然代理可以处理大部分事务，但在某些情况下，代理需要将任务转交给你来处理。例如，当遇到特殊的请求或需要你的个人决策时，代理会将任务交还给你。
     * @networkStatus usage: 双端
     * @example
     * 使用示例:创建一个名为ActionExample的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”将看到代理被调用的效果，按下键盘“2”会看到代理被移除的效果，代码如下：
     * ```
     *  @Component
     *  export default class ActionExample extends Script {
     *      private readonly action:Action = new Action();
     *      private readonly action1:Action1<player> = new Action1();
     *      private readonly action2:Action2<number, player> = new Action2();
     *
     *      protected onStart(): void {
     *
     *          // 添加Action的监听
     *          this.action.add(() => {
     *              console.log("action");
     *          });
     *          // 添加Action1的监听
     *          const id = this.action1.add((player: player) => {
     *              if(player.age < 18) {
     *                  console.log("sorry , only those over 18 years old can enter")
     *              } else {
     *                  // 可以对player展开具体的实现逻辑
     *                  player.game();
     *              }
     *          });
     *          // 添加Action2的监听
     *          this.action2.add(this.onAction2);
     *
     *
     *          // 按下键盘的1键触发各个Action
     *          InputUtil.onKeyDown(Keys.One, () => {
     *              this.action.call();
     *              let playerOne : multiPlayer = new multiPlayer(10.5,"Janny");
     *              this.action1.call(playerOne);
     *              this.action2.call(2,playerOne);
     *          });
     *
     *      }
     *      // Action2的监听函数
     *      private onAction2(num: number, player: player) {
     *          console.log("action2");
     *          player.game();
     *      }
     *  }
     *  class player
     *  {
     *      public age:number = 2;
     *      public name:string = "Li";
     *      constructor(age: number, name: string) {
     *          this.age = age;
     *          this.name = name;
     *      }
     *      public game(){
     *          console.log("player is playing game");
     *      }
     *  }
     *  class lowPlayer extends player
     *  {
     *      public game(): void {
     *          console.log("lowplayer is playing game");
     *      }
     *  }
     *  class multiPlayer extends player
     *  {
     *      public game(): void {
     *          console.log("multiPlayer is playing game");
     *      }
     *  }
     * ```
     */
    const Action: typeof mw.Action;
    type Action = mw.Action;
    /**
     * @author shilong.wang
     * @groups 基础类型/代理
     * @description 一个参数的代理
     * @networkStatus usage: 双端
     * @example
     * 使用示例: 一个参数的代理
     * ```
     * @Component
     * export default class ActionExample extends Script {
     *
     *     private readonly action1:Action1<player> = new Action1();
     *
     *
     *     protected onStart(): void {
     *
     *         // 添加Action1的监听
     *         const id = this.action1.add((player: player) => {
     *             if(player.age < 18) {
     *                 console.log("sorry , only those over 18 years old can enter")
     *             } else {
     *                 // 可以对player展开具体的实现逻辑
     *                 player.game();
     *             }
     *         });
     *
     *         InputUtil.onKeyDown(Keys.One, () => {
     *             let playerOne : multiPlayer = new multiPlayer(10.5,"Janny");
     *             this.action1.call(playerOne);
     *         });
     *     }
     * }
     * class player
     * {
     *     public age:number = 2;
     *     public name:string = "Li";
     *     constructor(age: number, name: string) {
     *         this.age = age;
     *         this.name = name;
     *     }
     *     public game(){
     *         console.log("player is playing game");
     *     }
     * }
     * class lowPlayer extends player
     * {
     *     public game(): void {
     *         console.log("lowplayer is playing game");
     *     }
     * }
     * class multiPlayer extends player
     * {
     *     public game(): void {
     *         console.log("multiPlayer is playing game");
     *     }
     * }
     * ```
     */
    const Action1: typeof mw.Action1;
    type Action1<T> = mw.Action1<T>;
    /**
     * @author xiangkun.sun
     * @groups 输入
     * @description 屏幕坐标转换结果
     * @networkStatus usage:双端
     */
    const ConvertScreenResult: typeof mw.ConvertScreenResult;
    type ConvertScreenResult = mw.ConvertScreenResult;
    /**
     * @author shilong.wang
     * @groups 基础类型/代理
     * @description 两个参数的代理
     * @networkStatus usage: 双端
     */
    const Action2: typeof mw.Action2;
    type Action2<T1, T2> = mw.Action2<T1, T2>;
    /**
     * @description 内存数据
     * @ignore
     */
    const HeapStatistics: typeof mw.HeapStatistics;
    type HeapStatistics = mw.HeapStatistics;
    /**
     * @author shilong.wang
     * @groups 基础类型/代理
     * @description 三个参数的代理
     * @networkStatus usage: 双端
     */
    const Action3: typeof mw.Action3;
    type Action3<T1, T2, T3> = mw.Action3<T1, T2, T3>;
    /**
     * @author xiangkun.sun
     * @groups 基础类型/委托
     * @description 委托
     * @description ----------------------------------------
     * @description 委托代表了一组特定的任务，并且可以调用指定的函数来完成这些任务。委托提供了一种灵活的方式，让你可以将任务分配给不同的函数，并且可以在运行时动态地添加或删除任务。
     * @description 编辑器已为您封装好了可以直接使用的委托函数，分为三种委托类型：
     * @description 1. Delegate 为单播委托，指的是只能绑定一个函数的委托，实现一对一的通知。
     * @description 2. MulticastDelegate 多播委托，指的是能绑定多个函数的委托，实现一对多的通知。
     * @description 3. MulticastGameObjectDelegate 与GameObject联系在一起的多播委拖，可以一对多的通知。
     * @description 如何理解委托 ？
     * @description 一种直击灵魂的理解是: 它把函数变成一个像"对象"一样的东西, 并且可以用变量保存。
     * @description 常见的方式是事件, 比如在输入事件中放一个回调。
     * @description 函数跟对象不同, 对象可以通过实例化, 在内存中复制许多不同的实体, 函数在程序启动后, 内存就只有一份, 非静态函数的实现方法是在第一个参数里增加一个this作为参数传进去, 这样就实现了绑定关系。
     * @description Delegate的实现方案, 其实就是制造了一个对象去链接函数的地址, 可以是单个函数地址, 也可以是函数地址集, 当调用时就去调用这些函数, 链接的过程如果涉及到函数的对象, 就把对象的实例存在Delegate中。
     * @description 委托与代理有什么区别 ?
     * @description - 代理是一种用来解决问题的方法。提供一种“一个类对另外一个类的控制权。”是类与类之间关系。
     * @description - 委托是一种应用方法的类型。委托提供了“一种方法的执行会同时执行加载在上面的方法”。是方法与方法之间的关系。
     * @description - 委托可以代替代理，但是代理不能代替委托。
     * @description - 委托可以动态加载方法，代理不能实现。
     * @networkStatus usage:双端
     * @effect 调用端生效
     * @example
     * 使用示例: 创建一个名为"DelExample"的脚本，打开脚本，输入以下代码保存，运行游戏，打印输出 5 。
     * ```
     * @Component
     *  export default class DelExample extends Script {
     *
     *      // 示例函数，满足 DelegateFuncType 约束
     *      public addNumbers(a: number, b: number): number {
     *          return a + b;
     *      }
     *      protected onStart(): void {
     *
     *          // 实例化 Delegate 类
     *          const delegateInstance = new Delegate<typeof this.addNumbers>();
     *          // 绑定 Delegate 实例的方法
     *          delegateInstance.bind(this.addNumbers);
     *          // 调用 Delegate 实例的方法
     *          const result = delegateInstance.execute(2,3);
     *          // 输出：5
     *          console.log(result);
     *      }
     *  }
     * ```
     */
    const Delegate: typeof mw.Delegate;
    type Delegate<T extends DelegateFuncType> = mw.Delegate<T>;
    /**
     * @author xiangkun.sun
     * @groups 基础类型/其他
     * @description r, g, b 颜色值的有效范围是 0.0 <= value <= 1.0
     * @networkStatus usage:双端
     */
    const LinearColor: typeof mw.LinearColor;
    type LinearColor = mw.LinearColor;
    /**
     * @author xiangkun.sun
     * @groups 基础类型/委托
     * @description 多播委托接口
     * @networkStatus usage:双端
     * @effect 调用端生效
     * @example
     * 使用示例: 创建一个名为"MultidelExample"的脚本，打开脚本，输入以下代码保存，运行游戏，打印输出 a+b:5 。
     * ```
     * @Component
     *  export default class MultidelExample extends Script {
     *
     *      // 示例函数，满足 DelegateFuncType 约束
     *      public addNumbers(a: number, b: number): number {
     *          let c = a + b;
     *          console.log("a+b:"+ c);
     *          return c;
     *      }
     *      protected onStart(): void {
     *
     *          // 实例化 MulticastDelegate 类
     *          const delegateInstance = new MulticastDelegate<typeof this.addNumbers>();
     *          // 添加 MulticastDelegate 实例的方法
     *          delegateInstance.add(this.addNumbers);
     *          // 广播 MulticastDelegate 实例的方法
     *          delegateInstance.broadcast(2,3);
     *      }
     *  }
     * ```
     */
    const MulticastDelegate: typeof mw.MulticastDelegate;
    type MulticastDelegate<T extends DelegateFuncType> = mw.MulticastDelegate<T>;
    /**
     * @author yuhao.chen
     * @groups 基础类型/变换/矩阵
     * @description 三维矩阵
     * @description -------------------
     * @precautions 列矩阵
     * @networkStatus usage:双端
     */
    const Matrix3x3: typeof mw.Matrix3x3;
    type Matrix3x3 = mw.Matrix3x3;
    /**
     * @author si.wu
     * @groups 基础类型/委托
     * @description 广播代理
     * @networkStatus usage:双端
     * @example
     * 使用示例: 创建一个名为"MultidelExample"的脚本，打开脚本，输入以下代码保存，运行游戏，打印输出 5 。
     * ```
     *  @Component
     *  export default class ActionExample extends Script {
     *
     *      // 示例函数，满足 GameObjectDelegateFuncType 约束
     *      public async addNumbers(object: GameObject): Promise<void> {
     *          console.log(object.gameObjectId);
     *      }
     *      protected async onStart(): Promise<void> {
     *
     *          // 实例化 MulticastGameObjectDelegate 类
     *          const delegateInstance = new MulticastGameObjectDelegate();
     *          // 添加 MulticastGameObjectDelegate 实例的方法
     *          delegateInstance.add(this.addNumbers);
     *          // 广播 MulticastGameObjectDelegate 实例的方法
     *          const rocket = await GameObject.asyncSpawn("162807" ,{transform: new Transform(new Vector(300, 210, 0), new Rotation(0, 0, 0), new Vector(1, 1, 1))}) as Model;
     *          delegateInstance.broadcast(rocket);
     *      }
     *  }
     * ```
     */
    const MulticastGameObjectDelegate: typeof mw.MulticastGameObjectDelegate;
    type MulticastGameObjectDelegate = mw.MulticastGameObjectDelegate;
    /**
     * @author yuhao.chen
     * @groups 基础类型/变换/矩阵
     * @description 四维矩阵
     * @description ------------------
     * @precautions 列矩阵
     * @networkStatus usage:双端
     */
    const Matrix4x4: typeof mw.Matrix4x4;
    type Matrix4x4 = mw.Matrix4x4;
    /**
     * @author xiangkun.sun
     * @description 属性状态
     * @groups 基础类型
     */
    const PropertyStatus: typeof mw.PropertyStatus;
    type PropertyStatus = mw.PropertyStatus;
    /**
     * @author xiangkun.sun
     * @groups 基础类型/变换/旋转
     * @description 四元数
     * @description ----------------------------
     * @description 用于表示 3D 旋转的单位四元数。
     * @description 四元数与 Transform 类似，实现了旋转的矩阵表示。与存储旋转、缩放和剪切的 Transform 不同，四元数仅存储旋转。
     * @description 四元数可以使用轴角对或欧拉角进行参数化。由于它们的紧凑性以及它们在内存中的存储方式，某些操作对于浮点错误的处理更加高效。
     * @networkStatus usage:双端
     */
    const Quaternion: typeof mw.Quaternion;
    type Quaternion = mw.Quaternion;
    /**
     * @author xiangkun.sun
     * @description 碰撞属性状态
     * @groups 基础类型
    */
    const CollisionStatus: typeof mw.CollisionStatus;
    type CollisionStatus = mw.CollisionStatus;
    /**
     * @author xiangkun.sun
     * @groups 基础类型/变换/旋转
     * @description 欧拉角
     * @description ------------------
     * @description 由分量 (x,y,z) 组成的三维空间中的旋转量。
     * @description Rotation 是三个欧拉角Pitch、Yaw、Roll的封装 绕三个轴的旋转值：Pitch，Yaw，Roll翻译为俯仰角，偏航角，翻滚角。分别代表绕X轴，Y轴，Z轴的旋转值。
     * @networkStatus usage:双端
     * @precautions 所有旋转值均以度为单位存储
     */
    const Rotation: typeof mw.Rotation;
    type Rotation = mw.Rotation;
    /**
     * @author maohang.zeng
     * @description Actor在编辑器中的状态标记
     * @groups 基础类型
     */
    const EdActorFlag: typeof mw.EdActorFlag;
    type EdActorFlag = mw.EdActorFlag;
    /**
     * @author xiangkun.sun
     * @groups 基础类型/变换
     * @description 三维变换
     * @description -----------------------
     * @description Transform 由平移、旋转和缩放组成。
     * @description 平移用于确定物体的位置，旋转用于确定物体的朝向，缩放用于确定物体的大小。
     * @description 按以下顺序应用位置向量变换：缩放->旋转->平移, 方向向量的变换按以下顺序应用：缩放->旋转
     * @networkStatus usage:双端
     */
    const Transform: typeof mw.Transform;
    type Transform = mw.Transform;
    /**
     * @author xiangkun.sun
     * @description 同步状态
     * @groups 基础类型
     */
    const NetStatus: typeof mw.NetStatus;
    type NetStatus = mw.NetStatus;
    /**
     * @author xiangkun.sun
     * @groups 基础类型/变换/向量
     * @description 三维向量
     * @description ------------------
     * @description 由分量 (x,y,z) 组成的三维空间中的向量
     * @networkStatus usage:双端
     */
    const Vector: typeof mw.Vector;
    type Vector = mw.Vector;
    /**
     * @author xiangkun.sun
     * @description 按键Key值
     * @groups 基础类型
     */
    const Keys: typeof mw.Keys;
    type Keys = mw.Keys;
    /**
     * @author xiangkun.sun
     * @groups 基础类型/变换/向量
     * @description 二维向量
     * @description ------------------
     * @description 线性代数非常适用于游戏开发，这里会有一些简短而实用的介绍。如果已经很熟悉可以直接跳过。
     * @description 这不是一个关于线性代数的正式教科书。我们会只看它如何应用于游戏开发。如果想更广泛地了解数学，请参阅 https://www.khanacademy.org/math/linear-algebra
     * @description :cactus: 坐标系 （2D）
     * @description 在二维空间中，坐标是使用水平轴（x） 和 垂直轴（y）。2D 空间中的特定位置被写成一对值，例如 (9, 5)
     * @description 注意：如果您不熟悉计算机图形学，那么 y正轴指向下方而不是上方。因为您可能是在数学课上学到的是指向上方。然而，这在大多数计算机图形学应用时 y 正轴指向下方。
     * @description 这样，二维平面上的任意位置都可以用一对数字来标识。 然而，我们也可以将位置 (9, 5) 视为距 (0, 0) 点或原点的偏移量。 绘制一个从原点指向该点的箭头：
     * @description 这是一个向量。 向量代表了很多有用的信息。 除了告诉我们该点位于 (9, 5) 之外，我们还可以将其视为角度 θ (theta) 和长度（或大小）m。 在这种情况下，箭头是一个位置向量 - 它表示空间中相对于原点的位置。
     * @description 关于向量需要考虑的一个非常重要的一点是它们仅表示相对方向和大小。没有向量位置的概念。以下两个向量是相同的：
     * @description 两个向量都表示某个起点右侧 9 个单位和下方 5 个单位的点。 无论您在平面上的哪个位置绘制矢量，它始终表示相对方向和大小。
     * @description :cactus: 向量运算
     * @description 您可以使用任一方法（x 和 y 坐标或角度和大小）来引用向量，但为了方便起见，程序员通常使用坐标表示法。 例如，
     * @example
     * 使用示例: 创建一个名为 NewExample 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，按键“F”，按钮会移动到（900,500）的位置。
     * ```ts
     * @Component
     *  export default class NewExample extends Script {
     *
     *      protected onStart(): void {
     *          if (!SystemUtil.isClient()) return;
     *          this.test();
     *      }
     *
     *      private async test(): Promise<void> {
     *          let btn = new ButtonUI();
     *
     *          InputUtil.onKeyDown(Keys.F, async () => {
     *              let result = new Vector2(900,500)
     *              if (result) {
     *                  btn.button.position = result;
     *              }
     *          })
     *      }
     *
     *  }
     *
     *  class ButtonUI {
     *      public button: StaleButton;
     *
     *      constructor(fun: Function = null) {
     *          this.creatUI(fun);
     *      }
     *
     *      private creatUI(fun: Function = null) {
     *          // 创建一个UI对象
     *          let ui = UserWidget.newObject();
     *          // 将UI添加到屏幕上
     *          ui.addToViewport(1);
     *          // 创建一个画布组件
     *          let rootCanvas = Canvas.newObject();
     *          rootCanvas.size = new Vector2(1920, 1080);
     *          rootCanvas.position = Vector2.zero;
     *          // 将Ui的根画布设置为rootCanvas
     *          ui.rootContent = rootCanvas;
     *          // 在（0,0）点创建一个按钮
     *          this.button = StaleButton.newObject(rootCanvas);
     *          this.button.position = new Vector2(0, 0);
     *          this.button.size = new Vector2(100, 100);
     *          this.button.setNormalImageColorDecimal(0,255,0,255)
     *          this.button.text = "btn";
     *          this.button.transitionEnable = true;
     *          this.button.pressedImagColor = LinearColor.red;
     *          this.button.visibility = SlateVisibility.Visible;
     *
     *          this.button.onClicked.add(() => {
     *              if (fun) {
     *                  fun();
     *              }
     *          })
     *      }
     *  }
     * ```
     * @description 1. 向量成员
     * @description 向量的各个组成部分可以通过名称直接访问。
     * @example
     * 使用示例: 访问向量
     * ```ts
     * @Component
     *  export default class NewExample extends Script {
     *
     *      protected onStart(): void {
     *         let a = new Vector2(9, 5);
     *         console.log("x:" +a.x+ "  y:"+a.y);
     *      }
     * }
     * ```
     * @description 2. 添加向量
     * @description 当两个向量相加或相减时，相应的分量相加或相减：
     * @example
     * 使用示例: 两向量相加
     * ```ts
     * @Component
     *  export default class NewExample extends Script {
     *
     *      protected onStart(): void {
     *         let a = new Vector2(8,2);
     *         let b = new Vector2(3,3);
     *         let result = Vector2.add(a,b);
     *         console.log(result);
     *      }
     * }
     * ```
     * @description 注意，添加 a + b 会得到与 b + a 相同的结果。
     * @description 3. 标量乘法
     * @description 向量表示方向和大小。 仅代表大小的值称为标量。 标量在编辑器中使用 float 类型。
     * @description 向量可以乘以标量：
     * @example
     * 使用示例: a * b
     * ```ts
     * @Component
     *  export default class NewExample extends Script {
     *
     *      protected onStart(): void {
     *         let a = new Vector2(8,2);
     *         let result = Vector2.multiply(a,3);
     *         // X=24, Y=6
     *         console.log(result);
     *      }
     * }
     * ```
     * @description 将向量乘以正标量不会改变其方向，只会改变其大小。 与负标量相乘会产生相反方向的向量。 这就是缩放向量的方法。
     * @description 4. 单位向量
     * @description 大小为 1 的向量称为单位向量。 它们有时也称为方向向量或法线。 当您需要跟踪方向时，单位向量很有用。
     * @description 5. 归一化
     * @description 向量归一化意味着将其长度减小到 1，同时保留其方向。 这是通过将其每个分量除以其大小来完成的。 这是一个常见的操作，为此提供了一个专用的 normalized() 方法：
     * @example
     * 使用示例: 对 a 向量实现归一化。
     * ```ts
     * @Component
     *  export default class NewExample extends Script {
     *
     *      protected onStart(): void {
     *         let a = new Vector2(8,2);
     *         let result = Vector2.normalize(a);
     *         console.log(result);
     *      }
     * }
     * ```
     * @description 由于归一化涉及除以向量的长度，因此无法对长度为 0 的向量进行归一化。尝试这样做通常会导致错误。
     * @description 6. 反射
     * @description 单位向量的常见用途是表示法线。 法向量是垂直于表面排列的单位向量，定义其方向。 它们通常用于照明、碰撞和其他涉及表面的操作。
     * @example
     * 使用示例: 求反射向量。
     * ```ts
     * @Component
     *  export default class NewExample extends Script {
     *
     *      protected onStart(): void {
     *         let a = new Vector2(8,2);
     *         let b = new Vector2(1,0);
     *         let result = Vector2.reflect(a,b);
     *         console.log(result);
     *      }
     * }
     * ```
     * @description 7. 点积
     * @description 点积是向量数学中最重要的概念之一，但经常被误解。 点积是对两个向量进行的运算，返回一个标量。 与同时包含大小和方向的矢量不同，标量值仅具有大小。
     * @description 点积的公式有两种常见形式：
     * @description 数学符号 ||A|| 表示向量A的大小，Ax表示向量A的x分量。
     * @description 在大多数情况下，使用内置的 dot 方法是最简单的。 请注意，两个向量的顺序并不重要：
     * @example
     * 使用示例: 求点积。
     * ```ts
     * @Component
     *  export default class NewExample extends Script {
     *
     *      protected onStart(): void {
     *         let a = new Vector2(8,2);
     *         let b = new Vector2(1,0);
     *         let result = Vector2.dot(a,b);
     *         console.log(result);
     *      }
     * }
     * ```
     * @description 点积在与单位向量一起使用时最有用，使第一个公式简化为 cos(θ)。 这意味着我们可以使用点积来告诉我们有关两个向量之间的角度的信息：
     * @description 使用单位向量时，结果将始终介于 -1 (180°) 和 1 (0°) 之间。
     * @description 8. 叉积
     * @description 与点积一样，叉积是对两个向量的运算。 然而，叉积的结果是一个方向垂直于两者的向量。 其大小取决于它们的相对角度。 如果两个向量平行，则它们的叉积的结果将是零向量。
     * @description 叉积计算如下：
     * @example
     * 使用示例: 求叉积。
     * ```ts
     * @Component
     *  export default class NewExample extends Script {
     *
     *      protected onStart(): void {
     *         let a = new Vector2(8,2);
     *         let b = new Vector2(1,0);
     *         let result1 = Vector2.cross(a,b);
     *         let result2 = Vector2.cross(b,a);
     *         console.log(result1);
     *         console.log(result2);
     *      }
     * }
     * ```
     * @description 顺序很重要。 cross(a,b) 不会给出与 cross(b,a) 相同的结果。 所得向量指向相反的方向。
     * @networkStatus usage:双端
     */
    const Vector2: typeof mw.Vector2;
    type Vector2 = mw.Vector2;
    /**
     * @author xiangkun.sun
     * @description 画质等级
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 030 reason:接口废弃 replacement:
     * @groups 基础类型
     */
    const GraphicsLevel: typeof mw.GraphicsLevel;
    type GraphicsLevel = mw.GraphicsLevel;
    /**
     * @author xiangkun.sun
     * @groups 基础类型/变换/向量
     * @description 齐次向量
     * @description ------------------
     * @description 由分量 (x,y,z,w) 组成的 4D 齐次向量
     * @networkStatus usage:双端
     */
    const Vector4: typeof mw.Vector4;
    type Vector4 = mw.Vector4;
    /**
     * @author xiangkun.sun
     * @description 运行平台
     * @groups 基础类型
     */
    const RuntimePlatform: typeof mw.RuntimePlatform;
    type RuntimePlatform = mw.RuntimePlatform;
    /**
     * @author xiangkun.sun
     * @description 游戏语言
     * @groups 基础类型
     */
    const LanguageType: typeof mw.LanguageType;
    type LanguageType = mw.LanguageType;
    /**
     * @author xiaobo.qi
     * @description 游戏本地化语言
     * @groups 基础类型
     */
    const LanguageCodeType: typeof mw.LanguageCodeType;
    type LanguageCodeType = mw.LanguageCodeType;
    /**
     * @author xiangkun.sun
     * @description 资源类型
     * @groups 基础类型
     */
    const AssetType: typeof mw.AssetType;
    type AssetType = mw.AssetType;
    /**
  * @description gizmo模式
  * @author jie.wu
  * @groups 基础类型
  */
    const GizmoModeType: typeof mw.GizmoModeType;
    type GizmoModeType = mw.GizmoModeType;
    /**
     * @description gizmo空间
     * @author hao.wu
     * @groups 基础类型
     */
    const GizmoSpaceType: typeof mw.GizmoSpaceType;
    type GizmoSpaceType = mw.GizmoSpaceType;
    /**
     * @description gizmo空间
     * @author jie.wu
     * @groups 基础类型
     */
    const GizmoScaleType: typeof mw.GizmoScaleType;
    type GizmoScaleType = mw.GizmoScaleType;
    /**
     * @description gizmo空间
     * @author jie.wu
     * @groups 基础类型
     */
    const GizmoSocketType: typeof mw.GizmoSocketType;
    type GizmoSocketType = mw.GizmoSocketType;
    /**
     * @author jie.wu
     * @groups 基础类型
     * @description gizmo坐标轴类型
     */
    const GizmoCoordinateType: typeof mw.GizmoCoordinateType;
    type GizmoCoordinateType = mw.GizmoCoordinateType;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 代理回调函数签名
     * @effect 调用端生效
     */
    type DelegateFuncType = mw.DelegateFuncType;
    /**
     * @hidden
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 委托接口
     * @effect 调用端生效
     */
    type DelegateInterface<T extends DelegateFuncType> = mw.DelegateInterface<T>;
    /**
     * @hidden
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 多播委托接口
     * @effect 调用端生效
     */
    type MulticastDelegateInterface<T extends DelegateFuncType> = mw.MulticastDelegateInterface<T>;
    /**
     * @author xiangkun.sun
     * @groups 基类/场景所有物体基类
     * @description 构建物体的信息
     */
    type GameObjectInfo = mw.GameObjectInfo;
    /** @ignore
    * @groups 基础类型
    */
    type GameObjectDelegateFuncType = mw.GameObjectDelegateFuncType;
    /**
     * @author zhiqiang.tan
     * @groups 玩法/物理
     * @description 空间查询碰撞参数
     */
    type CollisionQueryParams = mw.CollisionQueryParams;
    /**
     * @author shilong.wang
     * @groups 基础类型/其他
     * @description 类定义，使用这个可以省去类参数繁琐的类型声明    如:fun<T>(c:{new():T}) 可以写成 fun<T>(c:Class<T>)
     */
    type TypeName<T> = mw.TypeName<T>;
    /**
     * @author zhiqiang.tan
     * @groups 玩法/物理
     * @description 空间查询渲染参数
     */
    type RenderQueryParams = mw.RenderQueryParams;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 多播
     * @effect 调用端生效
     */
    const Multicast: typeof mw.Multicast;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 客户端
     * @effect 调用端生效
     */
    const Client: typeof mw.Client;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 服务端
     * @effect 调用端生效
     */
    const Server: typeof mw.Server;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 与Client Server配合实现RPC函数返回值
     * @effect 调用端生效
     */
    const Result: typeof mw.Result;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 不可靠rpc
     * @effect 调用端生效
     */
    const Unreliable: typeof mw.Unreliable;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 将类声明为mwclass
     * @effect 调用端生效
     * @param component usage:自定义类
     * @returns 自定义类
     */
    const Component: typeof mw.Component;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 类型支持属性同步
     * @effect 调用端生效
     * @param type usage:自定义类
     * @returns 自定义类
     */
    const Serializable: typeof mw.Serializable;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 函数支持Rpc调用
     * @effect 调用端生效
     * @param options usage:Rpc调用方式
     * @returns 自定义函数
     */
    const RemoteFunction: typeof mw.RemoteFunction;
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 属性支持同步
     * @effect 调用端生效
     * @param option usage:配置 default:配置
     * @returns 自定义属性
     */
    const Property: typeof mw.Property;
    /**
     * @hidden
     * @groups 基础类型
     * @author xiangkun.sun
     * @description 游戏窗口被激活事件
     * @effect 只在客户端调用生效
     * @param callback usage:回调事件
     */
    const onWindowActivated: typeof mw.onWindowActivated;
    /**
     * @hidden
     * @groups 基础类型
     * @author xiangkun.sun
     * @description 游戏窗口被挂起事件
     * @effect 只在客户端调用生效
     * @param callback usage:回调事件
     */
    const onWindowDeactivated: typeof mw.onWindowDeactivated;
    /**
     * @hidden
     * @groups 基础类型
     * @author xiangkun.sun
     * @description 获取游戏窗口激活状态
     * @effect 只在客户端调用生效
     * @returns 是否激活
     */
    const getWindowIsActive: typeof mw.getWindowIsActive;
    /**
     * @groups 基类
     * @author si.wu
     * @description GameObject和Script的基类，定义基础能力
     * @networkStatus usage:双端
     */
    const Base: typeof mw.Base;
    type Base = mw.Base;
    /**
     * @author xiangkun.sun
     * @description 是否在编辑器里隐藏
     * @groups 基础类型
     */
    const HideInEditorState: typeof mw.HideInEditorState;
    type HideInEditorState = mw.HideInEditorState;
    /**
     * @ignore
     * @hidden
     */
    const FunctionOption: typeof mw.FunctionOption;
    type FunctionOption = mw.FunctionOption;
    /** @ignore */
    const FlagType: typeof mw.FlagType;
    type FlagType = mw.FlagType;
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
    const Script: typeof mw.Script;
    type Script = mw.Script;
    /** @ignore */
    const RpcType: typeof mw.RpcType;
    type RpcType = mw.RpcType;
    /**
     * @author zhaoyang.hou
     * @groups 基类
     * @networkStatus usage:双端
     * @description main脚本的基类
     */
    const GameApplication: typeof mw.GameApplication;
    type GameApplication = mw.GameApplication;
    /**
     * @ignore
     * @hidden
     */
    const NumberType: typeof mw.NumberType;
    type NumberType = mw.NumberType;
    /**
     * @ignore
     * @hidden
     */
    const FuncInfo: typeof mw.FuncInfo;
    type FuncInfo = mw.FuncInfo;
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
    const GameObject: typeof mw.GameObject;
    type GameObject = mw.GameObject;
    /**
     * @ignore
     * @hidden
     */
    const PropInfo: typeof mw.PropInfo;
    type PropInfo = mw.PropInfo;
    /**
     * @hidden
     * @author zhaoyang.hou
     * @groups 基类
     * @description 脚本管理类
     * @networkStatus usage:双端
     */
    const ScriptManager: typeof mw.ScriptManager;
    type ScriptManager = mw.ScriptManager;
    /**
     * @author si.wu
     * @groups 基础类型
     * @description 自定义属性类型
     */
    type CustomPropertyType = mw.CustomPropertyType;
    /**
     * @hidden
     * @description 属性同步信息
     */
    type IRepEventOptions = mw.IRepEventOptions;
    /**
     * @hidden
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 用户属性标记的参数选项
     */
    type IPropertyOptions = mw.IPropertyOptions;
    /**
     * @hidden
     * @groups 基础类型
     */
    type ConstructorType = mw.ConstructorType;
    /**
     * @hidden
     * @groups 基础类型
     * @author xiangkun.sun
     * @description 用户属性范围和是否显示滑块
     */
    type IRangeOptions = mw.IRangeOptions;
    /**
     * @author baoqiang.han
     * @groups 玩法
     * @description 振动开关
     * @param enable usage:-true:开启震动，-false:关闭震动
     * @effect 只在客户端调用生效
     */
    const vibrate: typeof mw.vibrate;
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
    const startRecord: typeof mw.startRecord;
    /**
     * @author hongbing.deng
     * @description 停止录屏
     * @groups 工具
     * @effect 只在客户端调用生效
     */
    const stopRecord: typeof mw.stopRecord;
    /**
     * @author xinlei.nie
     * @groups 角色系统/角色
     * @description 获取强制更新移动时检测到的碰撞结果
     * @effect 调用端生效
     * @param character usage: 需要获取碰撞结果的角色 <br> default: null 必填参数   <br> type: Character
     * @returns 强制移动检测到的碰撞数据
     */
    const getForcedMovementHits: typeof mw.getForcedMovementHits;
    /**
     * @ignore
     * @hidden
     */
    const console: typeof mw.console;
    /**
     * @ignore
     * @hidden
     */
    const clearInterval: typeof mw.clearInterval;
    /**
     * @ignore
     * @hidden
     */
    const setInterval: typeof mw.setInterval;
    /**
     * @ignore
     * @hidden
     */
    const clearTimeout: typeof mw.clearTimeout;
    /**
     * @ignore
     * @hidden
     */
    const setTimeout: typeof mw.setTimeout;
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
    const HotWeaponAccuracyOfFireComponent: typeof mw.HotWeaponAccuracyOfFireComponent;
    type HotWeaponAccuracyOfFireComponent = mw.HotWeaponAccuracyOfFireComponent;
    /**
     * @author baoqiang.han
     * @groups 场景/灯光
     * @description 后处理对象属性配置
     * @networkStatus usage:双端
     */
    const PostProcessConfig: typeof mw.PostProcessConfig;
    type PostProcessConfig = mw.PostProcessConfig;
    /**
     * @author jun.zhang
     * @groups 玩法
     * @description 热武器瞄准模式
     */
    const HotWeaponAimMode: typeof mw.HotWeaponAimMode;
    type HotWeaponAimMode = mw.HotWeaponAimMode;
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
    const HotWeaponAimComponent: typeof mw.HotWeaponAimComponent;
    type HotWeaponAimComponent = mw.HotWeaponAimComponent;
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
    const PostProcess: typeof mw.PostProcess;
    type PostProcess = mw.PostProcess;
    /**
     * @author jun.zhang
     * @groups 玩法
     * @description 热武器开火模式
     */
    const HotWeaponFireMode: typeof mw.HotWeaponFireMode;
    type HotWeaponFireMode = mw.HotWeaponFireMode;
    /**
     * @author baoqiang.han
     * @description 天空盒预设枚举
     * @groups 场景/灯光
     */
    const SkyPreset: typeof mw.SkyPreset;
    type SkyPreset = mw.SkyPreset;
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
    const HotWeaponFireComponent: typeof mw.HotWeaponFireComponent;
    type HotWeaponFireComponent = mw.HotWeaponFireComponent;
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
    const HotWeaponLoadComponent: typeof mw.HotWeaponLoadComponent;
    type HotWeaponLoadComponent = mw.HotWeaponLoadComponent;
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
    const HotWeaponRecoilForceComponent: typeof mw.HotWeaponRecoilForceComponent;
    type HotWeaponRecoilForceComponent = mw.HotWeaponRecoilForceComponent;
    /**
     * @author baoqiang.han
     * @description 天空盒背景的切换方式枚举
     * @groups 场景/灯光
     */
    const SkyboxBackgroundSwitchMode: typeof mw.SkyboxBackgroundSwitchMode;
    type SkyboxBackgroundSwitchMode = mw.SkyboxBackgroundSwitchMode;
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
    const HotWeaponReloadComponent: typeof mw.HotWeaponReloadComponent;
    type HotWeaponReloadComponent = mw.HotWeaponReloadComponent;
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
    const Skybox: typeof mw.Skybox;
    type Skybox = mw.Skybox;
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
    const Interactor: typeof mw.Interactor;
    type Interactor = mw.Interactor;
    /**
     * @groups 场景/音效
     * @author baoqiang.han
     * @description 音效衰减形状
     * @groups 玩法
     */
    const AttenuationShape: typeof mw.AttenuationShape;
    type AttenuationShape = mw.AttenuationShape;
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
    const Lighting: typeof mw.Lighting;
    type Lighting = mw.Lighting;
    /**
     * @groups 场景/音效
     * @author baoqiang.han
     * @description 音效播放状态
     * @groups 玩法
     */
    const SoundPlayState: typeof mw.SoundPlayState;
    type SoundPlayState = mw.SoundPlayState;
    /**
     * @author baoqiang.han
     * @groups 场景/灯光
     * @description 点光源
     * @networkStatus usage:客户端
     */
    const PointLight: typeof mw.PointLight;
    type PointLight = mw.PointLight;
    /**
     * @groups 场景/音效
     * @author baoqiang.han
     * @description 音效衰减函数模型
     * @groups 玩法
     */
    const AttenuationDistanceModel: typeof mw.AttenuationDistanceModel;
    type AttenuationDistanceModel = mw.AttenuationDistanceModel;
    /**
     * @author xinlei.nie
     * @description 设置链接线的通行方向
     * @groups 玩法/寻路系统
     */
    const DirectionType: typeof mw.DirectionType;
    type DirectionType = mw.DirectionType;
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
    const Sound: typeof mw.Sound;
    type Sound = mw.Sound;
    /**
     * @author xinlei.nie
     * @description 设置链接区域的寻路类型
     * @groups 玩法/寻路系统
     */
    const LinkClassType: typeof mw.LinkClassType;
    type LinkClassType = mw.LinkClassType;
    /**
     * @author yunhao.liao
     * @description 样条线
     * @groups 玩法/其他
     */
    const PointType: typeof mw.PointType;
    type PointType = mw.PointType;
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
    const NavLink: typeof mw.NavLink;
    type NavLink = mw.NavLink;
    /**
     * @author yunhao.liao
     * @groups 玩法/其他
     * @description 样条线
     * @networkStatus usage:双端
     */
    const Spline: typeof mw.Spline;
    type Spline = mw.Spline;
    /**
     * @author hao.huang
     * @description 寻路动态修饰区类型，不同类型在寻路计算中成本不同，影响寻路结果
     * @groups 玩法
     */
    const NavModifierType: typeof mw.NavModifierType;
    type NavModifierType = mw.NavModifierType;
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
    const SwimmingVolume: typeof mw.SwimmingVolume;
    type SwimmingVolume = mw.SwimmingVolume;
    /**
     * @author hao.huang
     * @groups 玩法/寻路系统
     * @description 寻路动态修饰区
     * @networkStatus usage:双端
     */
    const NavModifierVolume: typeof mw.NavModifierVolume;
    type NavModifierVolume = mw.NavModifierVolume;
    /**
     * @hidden
     * @author baoqiang.han
     * @groups 输入
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:流程自动化，不再需要 replacement: mw.TouchInputUtil
     * @description 玩家从可触摸设备获取的数据信息，包含触摸手指数量，触摸位置(屏幕像素)和当前触摸状态(点击/滑动/离开)
     * @networkStatus usage:客户端
     */
    const TouchInput: typeof mw.TouchInput;
    type TouchInput = mw.TouchInput;
    /**
     * @author baoqiang.han
     * @description 水体预设枚举
     * @groups 玩法/游泳
     */
    const WaterPreset: typeof mw.WaterPreset;
    type WaterPreset = mw.WaterPreset;
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
    const RigidConstraint: typeof mw.RigidConstraint;
    type RigidConstraint = mw.RigidConstraint;
    /**
     * @author baoqiang.han
     * @description 碰撞类型
     * @groups 玩法/物理
     */
    const CollisionType: typeof mw.CollisionType;
    type CollisionType = mw.CollisionType;
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
    const WaterVolume: typeof mw.WaterVolume;
    type WaterVolume = mw.WaterVolume;
    /**
     * @author xinlei.nie
     * @description 力区域的施力类型
     * @groups 玩法/物理
     */
    const ForceType: typeof mw.ForceType;
    type ForceType = mw.ForceType;
    /**
     * @author baoqiang.han
     * @description 碰撞形状
     * @groups 玩法/物理
     */
    const TriggerShapeType: typeof mw.TriggerShapeType;
    type TriggerShapeType = mw.TriggerShapeType;
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
    const ForceVolume: typeof mw.ForceVolume;
    type ForceVolume = mw.ForceVolume;
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
    const Trigger: typeof mw.Trigger;
    type Trigger = mw.Trigger;
    /**
     * @description UI空间位置枚举
     * @groups 界面
     * @author baoqiang.han
     */
    const SpaceMode: typeof mw.SpaceMode;
    type SpaceMode = mw.SpaceMode;
    /**
     * @description UI空间位置枚举
     * @groups 界面
     * @author baoqiang.han
     */
    const WidgetSpaceMode: typeof mw.WidgetSpaceMode;
    type WidgetSpaceMode = mw.WidgetSpaceMode;
    /**
     * @author jun.zhang
     * @description 冲量的应用方式
     * @groups 玩法/物理
     */
    const ImpulseType: typeof mw.ImpulseType;
    type ImpulseType = mw.ImpulseType;
    /**
     * @author jun.zhang
     * @description 冲量力类型
     * @groups 玩法/物理
     */
    const ImpulseForceType: typeof mw.ImpulseForceType;
    type ImpulseForceType = mw.ImpulseForceType;
    /**
     * @description UI形状枚举
     * @groups 界面
     * @author baoqiang.han
     */
    const WidgetGeometryMode: typeof mw.WidgetGeometryMode;
    type WidgetGeometryMode = mw.WidgetGeometryMode;
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
    const Impulse: typeof mw.Impulse;
    type Impulse = mw.Impulse;
    /**
     * @author xinlei.nie
     * @description 运动坐标系
     * @groups 玩法/物理
     */
    const MotionAxis: typeof mw.MotionAxis;
    type MotionAxis = mw.MotionAxis;
    /**
     * @author xinlei.nie
     * @description 运动模式
     * @groups 玩法/物理
     */
    const MotionMode: typeof mw.MotionMode;
    type MotionMode = mw.MotionMode;
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
    const UIWidget: typeof mw.UIWidget;
    type UIWidget = mw.UIWidget;
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
    const IntegratedMover: typeof mw.IntegratedMover;
    type IntegratedMover = mw.IntegratedMover;
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
    const PhysicsThruster: typeof mw.PhysicsThruster;
    type PhysicsThruster = mw.PhysicsThruster;
    /**
     * @description 投掷物发射器专用实例对象
     * @author jun.zhang
     * @groups 玩法/发射器
     * @networkStatus usage: 双端
     */
    const ProjectileInst: typeof mw.ProjectileInst;
    type ProjectileInst = mw.ProjectileInst;
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
    const ObjectLauncher: typeof mw.ObjectLauncher;
    type ObjectLauncher = mw.ObjectLauncher;
    /**
     * @author jun.zhang
     * @description 投掷物移动状态
     * @groups 玩法
     */
    const ProjectileMovementStatus: typeof mw.ProjectileMovementStatus;
    type ProjectileMovementStatus = mw.ProjectileMovementStatus;
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
    const HotWeapon: typeof mw.HotWeapon;
    type HotWeapon = mw.HotWeapon;
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
    const ProjectileMovement: typeof mw.ProjectileMovement;
    type ProjectileMovement = mw.ProjectileMovement;
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
    const Player: typeof mw.Player;
    type Player = mw.Player;
    /**
     * @description UI形状枚举
     * @groups 界面
     * @author baoqiang.han
     */
    const GeometryMode: typeof mw.GeometryMode;
    type GeometryMode = mw.GeometryMode;
    /**
     * @author baoqiang.han
     * @description 碰撞检测通道
     * @groups 玩法/物理
     */
    const ObjectTypeQuery: typeof mw.ObjectTypeQuery;
    type ObjectTypeQuery = mw.ObjectTypeQuery;
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
    const MaterialSlot: typeof mw.MaterialSlot;
    type MaterialSlot = mw.MaterialSlot;
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
    const PlayerState: typeof mw.PlayerState;
    type PlayerState = mw.PlayerState;
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
    const HitResult: typeof mw.HitResult;
    type HitResult = mw.HitResult;
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
    const Animation: typeof mw.Animation;
    type Animation = mw.Animation;
    /**
     * @hidden
     * @author yuchen.ren
     * @groups 动画
     * @description 姿态
     * @networkStatus usage:双端
     */
    const StanceBase: typeof mw.StanceBase;
    type StanceBase = mw.StanceBase;
    /**
     * @author guang.deng
     * @groups 角色系统
     * @description 形象类型
     * @example
     * 使用示例:
     * ```
     * ```
     */
    const CharacterType: typeof mw.CharacterType;
    type CharacterType = mw.CharacterType;
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
    const SubStance: typeof mw.SubStance;
    type SubStance = mw.SubStance;
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
    const Stance: typeof mw.Stance;
    type Stance = mw.Stance;
    /**
     * @author chenghao.song
     * @groups 角色系统
     * @description 角色状态
     */
    const MovementMode: typeof mw.MovementMode;
    type MovementMode = mw.MovementMode;
    /**
     * @author chenghao.song
     * @groups 角色系统
     * @description 移动控制模式
     */
    const MoveControlMode: typeof mw.MoveControlMode;
    type MoveControlMode = mw.MoveControlMode;
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
    const WorldUI: typeof mw.WorldUI;
    type WorldUI = mw.WorldUI;
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
    const Character: typeof mw.Character;
    type Character = mw.Character;
    /**
     * @author chenghao.song
     * @groups 角色系统
     * @description 运动时面朝方向
     */
    const MoveFacingDirection: typeof mw.MoveFacingDirection;
    type MoveFacingDirection = mw.MoveFacingDirection;
    /**
     * @author jun.zhang
     * @groups 玩法
     * @description 热武器状态
     */
    const HotWeaponState: typeof mw.HotWeaponState;
    type HotWeaponState = mw.HotWeaponState;
    /**
     * @author yuchen.ren
     * @groups 角色系统
     * @description V1角色部位
     */
    const BodyPartTypeV1: typeof mw.BodyPartTypeV1;
    type BodyPartTypeV1 = mw.BodyPartTypeV1;
    /**
     * @author guang.deng
     * @groups 角色系统
     * @description 人形角色插槽类型
     */
    const HumanoidSlotType: typeof mw.HumanoidSlotType;
    type HumanoidSlotType = mw.HumanoidSlotType;
    /**
     * @author jiamin.guo
     * @groups 动画
     * @description 动画插槽
     */
    const AnimSlot: typeof mw.AnimSlot;
    type AnimSlot = mw.AnimSlot;
    /**
     * @author yunhao.liao
     * @groups 角色系统
     * @description 非人形角色插槽类型
     */
    const NonHumanoidSlotType: typeof mw.NonHumanoidSlotType;
    type NonHumanoidSlotType = mw.NonHumanoidSlotType;
    /**
     * @author yuchen.ren
     * @groups 角色系统
     * @description 基础姿态风格
     */
    const BasicStanceType: typeof mw.BasicStanceType;
    type BasicStanceType = mw.BasicStanceType;
    /**
     * @author jun.zhang
     * @groups 角色系统
     * @description 角色基础脸型
     */
    const FaceStyle: typeof mw.FaceStyle;
    type FaceStyle = mw.FaceStyle;
    /**
     * @author guang.deng
     * @groups 角色系统
     * @description 表情类型
     */
    const ExpressionType: typeof mw.ExpressionType;
    type ExpressionType = mw.ExpressionType;
    /**
    * @author yuchen.ren
    * @groups 角色系统
    * @description 角色体型
    */
    const CharacterTemplate: typeof mw.CharacterTemplate;
    type CharacterTemplate = mw.CharacterTemplate;
    /**
     * @author yuchen.ren
     * @groups 角色系统
     * @description 角色体型
     */
    const SomatotypeV2: typeof mw.SomatotypeV2;
    type SomatotypeV2 = mw.SomatotypeV2;
    /**
     * @author guang.deng
     * @groups 角色系统
     * @description V1角色体型
     */
    const SomatotypeV1: typeof mw.SomatotypeV1;
    type SomatotypeV1 = mw.SomatotypeV1;
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
    const MovementDirection: typeof mw.MovementDirection;
    type MovementDirection = mw.MovementDirection;
    /**
     * @author guang.deng
     * @groups 角色系统
     * @description 形象类型
     * @example
     * 使用示例:
     * ```
     * ```
     */
    const AppearanceType: typeof mw.AppearanceType;
    type AppearanceType = mw.AppearanceType;
    /**
     * @author jiamin.guo
     * @groups 动画
     * @description 姿态混合模式
     */
    const StanceBlendMode: typeof mw.StanceBlendMode;
    type StanceBlendMode = mw.StanceBlendMode;
    /**
     * @author zhiqiang.tan
     * @groups 角色系统
     * @description 碰撞体形状类型
     */
    const CustomShapeType: typeof mw.CustomShapeType;
    type CustomShapeType = mw.CustomShapeType;
    /**
     * @author jiamin.guio
     * @groups 动画
     * @description 动画模式
     */
    const AnimationMode: typeof mw.AnimationMode;
    type AnimationMode = mw.AnimationMode;
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
    const Model: typeof mw.Model;
    type Model = mw.Model;
    /**
     * @author guang.deng
     * @groups 角色系统
     * @description 动画曲线
     */
    const AnimationBlendMode: typeof mw.AnimationBlendMode;
    type AnimationBlendMode = mw.AnimationBlendMode;
    /**
     * @author liaoyun.hao
     * @groups 角色系统
     * @description 角色状态
     */
    const CharacterStateType: typeof mw.CharacterStateType;
    type CharacterStateType = mw.CharacterStateType;
    /**
     * @author guang.deng
     * @groups 角色系统/角色
     * @description Pawn作为玩家角色和非对象玩家角色的基类，是一个可以通过玩家控制器或者逻辑脚本控制的游戏对象。
     * @networkStatus usage:双端
     */
    const Pawn: typeof mw.Pawn;
    type Pawn = mw.Pawn;
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
    const CharacterDecoration: typeof mw.CharacterDecoration;
    type CharacterDecoration = mw.CharacterDecoration;
    /**
     * @author jun.zhang
     * @groups 角色系统
     * @description 外观属性的 Morph 和 Bone 换装项的枚举
     */
    const CharacterFeatureType: typeof mw.CharacterFeatureType;
    type CharacterFeatureType = mw.CharacterFeatureType;
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
    const CharacterDescription: typeof mw.CharacterDescription;
    type CharacterDescription = mw.CharacterDescription;
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
    const Camera: typeof mw.Camera;
    type Camera = mw.Camera;
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
    const BlockingVolume: typeof mw.BlockingVolume;
    type BlockingVolume = mw.BlockingVolume;
    /**
     * @author yunhao.liao
     * @groups 玩法/摄像机
     * @description 弹簧臂
     * @networkStatus usage:客户端
     */
    const SpringArm: typeof mw.SpringArm;
    type SpringArm = mw.SpringArm;
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
    const Effect: typeof mw.Effect;
    type Effect = mw.Effect;
    /**
    * @author yunhao.liao
    * @groups 玩法
    * @description 摄像机位置模式
    */
    const CameraPositionMode: typeof mw.CameraPositionMode;
    type CameraPositionMode = mw.CameraPositionMode;
    /**
     * @author yunhao.liao
     * @description 环境雾预设枚举
     * @groups 场景/灯光
     */
    const FogPreset: typeof mw.FogPreset;
    type FogPreset = mw.FogPreset;
    /**
     * @author yunhao.liao
     * @groups 玩法
     * @description 摄像机旋转模式
     */
    const CameraRotationMode: typeof mw.CameraRotationMode;
    type CameraRotationMode = mw.CameraRotationMode;
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
    const Fog: typeof mw.Fog;
    type Fog = mw.Fog;
    /**
     * @author yunhao.liao
     * @groups 玩法
     * @description 摄像机镜头模式
     */
    const CameraProjectionMode: typeof mw.CameraProjectionMode;
    type CameraProjectionMode = mw.CameraProjectionMode;
    /**
     * @hidden
     * @description Gizmo
     * @author  hongbing.deng
     * @groups 基础类型/其他
     * @instance
     * @networkStatus usage:双端
     */
    const Gizmo: typeof mw.Gizmo;
    type Gizmo = mw.Gizmo;
    /**
     * @author yunhao.liao
     * @groups 玩法
     * @description 摄像机模式
     */
    const CameraPreset: typeof mw.CameraPreset;
    type CameraPreset = mw.CameraPreset;
    /**
     * @author hao.huang
     * @description IK锚点类型
     * @groups 玩法/其他
     */
    const IKPart: typeof mw.IKPart;
    type IKPart = mw.IKPart;
    /**
     * @author yunhao.liao
     * @groups 玩法
     * @description 切换摄像机时运用的混合函数
     */
    const CameraSwitchBlendFunction: typeof mw.CameraSwitchBlendFunction;
    type CameraSwitchBlendFunction = mw.CameraSwitchBlendFunction;
    /**
     * @author hao.huang
     * @groups 玩法/其他
     * @description IK锚点
     * @networkStatus usage:双端
     */
    const IKAnchor: typeof mw.IKAnchor;
    type IKAnchor = mw.IKAnchor;
    /**
     * @author yunhao.liao
     * @groups 玩法
     * @description 定义如何开始(从零开始，或者从随机值开始)
     */
    const InitialOscillatorOffset: typeof mw.InitialOscillatorOffset;
    type InitialOscillatorOffset = mw.InitialOscillatorOffset;
    /**
     * @author baoqiang.han
     * @description 特效发射取向
     * @groups 场景/特效
     */
    const ParticleEmitterOrientation: typeof mw.ParticleEmitterOrientation;
    type ParticleEmitterOrientation = mw.ParticleEmitterOrientation;
    /**
     * @author yunhao.liao
     * @groups 玩法
     * @description 振荡器波形
     */
    const OscillatorWaveform: typeof mw.OscillatorWaveform;
    type OscillatorWaveform = mw.OscillatorWaveform;
    /**
     * @author baoqiang.han
     * @description 特效发射类型
     * @groups 场景/特效
     */
    const ParticleEmitterShapeStyle: typeof mw.ParticleEmitterShapeStyle;
    type ParticleEmitterShapeStyle = mw.ParticleEmitterShapeStyle;
    /**
     * @author yunhao.liao
     * @groups 玩法/摄像机
     * @description 横纵比约束
     */
    const AspectRatioAxisConstraint: typeof mw.AspectRatioAxisConstraint;
    type AspectRatioAxisConstraint = mw.AspectRatioAxisConstraint;
    /**
     * @author baoqiang.han
     * @description 特效形状枚举
     * @groups 场景/特效
     */
    const ParticleEmitterShape: typeof mw.ParticleEmitterShape;
    type ParticleEmitterShape = mw.ParticleEmitterShape;
    /**
     * @author baoqiang.han
     * @description 序列帧布局
     * @groups 场景/特效
     */
    const ParticleFlipbookLayout: typeof mw.ParticleFlipbookLayout;
    type ParticleFlipbookLayout = mw.ParticleFlipbookLayout;
    /**
     * @author baoqiang.han
     * @description 序列帧播放模式
     * @groups 场景/特效
     */
    const ParticleFlipbookMode: typeof mw.ParticleFlipbookMode;
    type ParticleFlipbookMode = mw.ParticleFlipbookMode;
    /**
     * @author baoqiang.han
     * @description 发射内外朝向
     * @groups 场景/特效
     */
    const ParticleEmitterShapeInOut: typeof mw.ParticleEmitterShapeInOut;
    type ParticleEmitterShapeInOut = mw.ParticleEmitterShapeInOut;
    /**
     * @author baoqiang.han
     * @description 特效标量值曲线节点
     * @networkStatus usage:客户端
     * @groups 场景/特效
     */
    const numberSequencePoint: typeof mw.numberSequencePoint;
    type numberSequencePoint = mw.numberSequencePoint;
    /**
     * @author baoqiang.han
     * @description 特效三维向量值曲线节点
     * @networkStatus usage:客户端
     * @groups 场景/特效
     */
    const vectorSequencePoint: typeof mw.vectorSequencePoint;
    type vectorSequencePoint = mw.vectorSequencePoint;
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
    const MaterialInstance: typeof mw.MaterialInstance;
    type MaterialInstance = mw.MaterialInstance;
    /**
     * @author baoqiang.han
     * @description 特效二维向量值曲线节点
     * @networkStatus usage:客户端
     * @groups 场景/特效
     */
    const vector2DSequencePoint: typeof mw.vector2DSequencePoint;
    type vector2DSequencePoint = mw.vector2DSequencePoint;
    /**
     * @author huipeng.jia
     * @description 四轮载具车轮位置
     * @groups 玩法
     */
    const VehicleWheelPosition4WNew: typeof mw.VehicleWheelPosition4WNew;
    type VehicleWheelPosition4WNew = mw.VehicleWheelPosition4WNew;
    /**
     * @author baoqiang.han
     * @description 特效颜色值曲线节点
     * @networkStatus usage:客户端
     * @groups 场景/特效
     */
    const colorSequencePoint: typeof mw.colorSequencePoint;
    type colorSequencePoint = mw.colorSequencePoint;
    /**
     * @author huipeng.jia
     * @description 四轮载具驱动模式
     * @groups 玩法
     */
    const VehicleDriveMode4WNew: typeof mw.VehicleDriveMode4WNew;
    type VehicleDriveMode4WNew = mw.VehicleDriveMode4WNew;
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
    const ParticleEmitter: typeof mw.ParticleEmitter;
    type ParticleEmitter = mw.ParticleEmitter;
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
    const AdvancedVehicle: typeof mw.AdvancedVehicle;
    type AdvancedVehicle = mw.AdvancedVehicle;
    /**
     * @author baoqiang.han
     * @description 后处理预设枚举
     * @groups 场景/灯光
     */
    const PostProcessPreset: typeof mw.PostProcessPreset;
    type PostProcessPreset = mw.PostProcessPreset;
    /**
     * @ignore
     * @hidden
     */
    type Console = mw.Console;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 角色编辑器数据加载完成后的回调
     */
    type LoadAppearanceDataAllCompletedCallback = mw.LoadAppearanceDataAllCompletedCallback;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 外观主体（前发，后发，头，上衣，下衣，手套，鞋）加载失败委托
     * @precautions 当角色外观加载失败时执行绑定函数
     */
    type OnLoadDescriptionFailed = mw.OnLoadDescriptionFailed;
    /**
     * @author huipeng.jia
     * @description 四轮载具车轮属性
     * @groups 玩法
     */
    type VehicleWheelDataNew = mw.VehicleWheelDataNew;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 空的回调函数类型
     */
    type EmptyCallback = mw.EmptyCallback;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 外观加载细节变化委托
     */
    type OnDescriptionChange = mw.OnDescriptionChange;
    /**
     * @author huipeng.jia
     * @description 四轮载具挡位属性
     * @groups 玩法
     */
    type VehicleGearDataNew = mw.VehicleGearDataNew;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 角色身上GUID切换成功回调
     */
    type onAppearanceDataChanged = mw.onAppearanceDataChanged;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 设置编辑数据完成的回调
     */
    type SetAppearanceDataCallback = mw.SetAppearanceDataCallback;
    /**
     * @author jun.zhang
     * @description 投掷物配置类型
     * @groups 玩法/投掷物
     */
    type ProjectileMovementConfig = mw.ProjectileMovementConfig;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 移动状态切换委托
     */
    type OnMovementModeChange = mw.OnMovementModeChange;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 返回String的回调
     */
    type StringCallback = mw.StringCallback;
    /**
     * @author yunhao.liao
     * @groups 玩法/摄像机
     * @description 抖动数据
     */
    type CameraShakeInfo = mw.CameraShakeInfo;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 返回Bool的回调
     */
    type BoolCallback = mw.BoolCallback;
    /**
     * @author guang.deng
     * @groups 基础类型
     * @description 外观加载完成委托
     * @precautions 当角色外观加载完成时执行绑定函数
     */
    type OnDescriptionComplete = mw.OnDescriptionComplete;
    /**
     * @author mengyuan.hao
     * @description 事件
     * @description MW编辑器支持多种类型的事件。
     * @description 在实现逻辑时，您可以将函数连接到编辑器触发的内置事件以响应它们。还可以创建触发并响应自定义事件。此外，您可以使用网络事件来允许跨客户端-服务器边界进行事件驱动的通信。
     * @description 许多对象都具有由其 API 提供的内置事件，这些事件会自动响应与这些对象相关的特定操作或更改。例如： HotWeapon 中装备上武器会触发 onEquip 事件。
     * @description Event 类提供了本地、客户端和服务器之间通信的事件。
     * @description 本地、客户端和服务器之间是如何通信的呢 ？
     * @description - 本地 ：指当前主机。
     * @description - 服务器 ：MW编辑器多人游戏基于客户端-服务器模式。也就是说，会有一个服务器担当游戏状态的主控者，而连接的客户端将保持近似复本。服务器可以看作傀儡师，客户端则为傀儡师控制的牵线木偶们。
     * @description - 客户端 ：连接到服务器的一个或多个“木偶”。
     * @description 本地、客户端和服务器之间通信时如同打开开关，屋子里的灯就会亮。当我在某地执行事件（打开开关），添加完的事件就会触发（安装好的灯泡就会亮）。
     * @groups 基础类型/事件
     * @networkStatus usage:双端
     */
    const Event: typeof mw.Event;
    type Event = mw.Event;
    /**
     * @author xiangkun.sun
     * @description 事件监听器
     * @groups 基础类型/事件
     * @networkStatus usage:双端
     */
    const EventListener: typeof mw.EventListener;
    type EventListener = mw.EventListener;
    /**
     * @description 事件发送的结果
     * @author xiangkun.sun
     * @groups 基础类型/事件
     */
    const DispatchEventResult: typeof mw.DispatchEventResult;
    type DispatchEventResult = mw.DispatchEventResult;
    /**
     * @description 数据储存返回代码
     * @author xiangkun.sun
     * @groups 数据处理
     */
    const DataStorageResultCode: typeof mw.DataStorageResultCode;
    type DataStorageResultCode = mw.DataStorageResultCode;
    /**
     * @author xiangkun.sun
     * @groups 数据处理
     * @description 数据存储
     * @precautions 在调用DataStorage相关接口时，每一个Key的对应值在数据服务器的读取和修改都有频率限制，主要表现在：接口调用时至一分钟前的时间区间内，某个Key的对应值在后端数据服务器上被获取Get、改写Set、删除Remove的总次数不能超过 (60+游戏设定的最大人数×10)次，不管它是在哪个服务器被操作的；如果时间区间内超限，请求会失败，然后Set、Remove会返回 FREQUENCY_OVERRUN(操作失败：请求频率超限) 而Get会catch到error timeout。
     * 1. 这些限制是数据服务器层面针对单个Key来的，每个Key之间的限制互相独立，和游戏服务器无关。
     * 2. Player相关的接口其实也算是一个Key，只不过是和玩家信息强相关的Key，也会受到上述限制；建议用 asyncSetData(属性名+玩家id+其他描述, 要存的值)来分存玩家相关的需要经常存取数据，以免堵塞。
     * 3. 对于玩家相关的信息，建议在ts层建立数据缓存，进行一定的数据托管；即通过ts脚本逻辑让DS服务器临时缓存玩家数据，只在初始化的时候进行get，在离线或其他必要时set，以减轻对后端数据服务器的压力，保证稳定性
     * @networkStatus usage:双端
     */
    const DataStorage: typeof mw.DataStorage;
    type DataStorage = mw.DataStorage;
    /**
     * @description 数据储存返回值
     * @author xiangkun.sun
     * @groups 数据处理
     */
    type DataStorageResult = mw.DataStorageResult;
    /**
     * @author xiaobo.qi
     * @description 多语言工具
     * @groups 工具
     * @networkStatus usage:双端
     */
    const LanguageUtil: typeof mw.LanguageUtil;
    type LanguageUtil = mw.LanguageUtil;
    /**
     * @author jun.zhang
     * @description 游戏性能数据，辅助 Debug 和性能优化
     * @groups 工具
     * @networkStatus usage:双端
     */
    const DebugUtil: typeof mw.DebugUtil;
    type DebugUtil = mw.DebugUtil;
    /**
     * @author xiaobo.qi
     * @description 本地化工具
     * @groups 工具
     * @networkStatus usage:双端
     */
    const LocaleUtil: typeof mw.LocaleUtil;
    type LocaleUtil = mw.LocaleUtil;
    /**
     * @author baoqiang.han
     * @description 触摸类型
     * @groups 输入
     */
    const TouchInputType: typeof mw.TouchInputType;
    type TouchInputType = mw.TouchInputType;
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
    const InputUtil: typeof mw.InputUtil;
    type InputUtil = mw.InputUtil;
    /**
     * @author xiangkun.sun
     * @description 数学库工具
     * @groups 工具
     * @networkStatus usage:双端
     */
    const MathUtil: typeof mw.MathUtil;
    type MathUtil = mw.MathUtil;
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
    const Navigation: typeof mw.Navigation;
    type Navigation = mw.Navigation;
    /**
     * @hidden
     * @author jie.wu
     * @description NFT资产交易系统。
     * @groups 工具
     * @networkStatus usage:客户端
     */
    const NFTUtil: typeof mw.NFTUtil;
    type NFTUtil = mw.NFTUtil;
    /**
         * @author hao.huang
         * @groups 玩法/物理
         * @description 碰撞组
         * @networkStatus usage:双端
         */
    const PhysicsService: typeof mw.PhysicsService;
    type PhysicsService = mw.PhysicsService;
    /**
     * @author hao.huang
     * @groups 工具/射线检测
     * @description 射线检测工具
     * @networkStatus usage:双端
     */
    const QueryUtil: typeof mw.QueryUtil;
    type QueryUtil = mw.QueryUtil;
    /**
     * @author baoqiang.han
     * @groups 工具
     * @description 屏幕视口工具
     * @networkStatus usage:客户端
     */
    const ScreenUtil: typeof mw.ScreenUtil;
    type ScreenUtil = mw.ScreenUtil;
    /**
     * @author xiangkun.sun
     * @description 数据文件获取工具
     * @groups 工具
     * @networkStatus usage:双端
     */
    const DataFile: typeof mw.DataFile;
    type DataFile = mw.DataFile;
    /**
     * @author wu.hao
     * @groups 工具
     * @description 描边绘制工具
     * @networkStatus usage:客户端
     */
    const SelectionUtil: typeof mw.SelectionUtil;
    type SelectionUtil = mw.SelectionUtil;
    /**
     * @author xiangkun.sun
     * @description 资源管理工具
     * @description 在使用左侧工具栏中的资源时，需要预先下载并加载。
     * @description 可使用asyncDownloadAsset接口在代码中动态下载对应资源。也可将资源手动拖入编辑器右边优先加载队列中。
     * @groups 工具
     * @networkStatus usage:双端
     */
    const AssetUtil: typeof mw.AssetUtil;
    type AssetUtil = mw.AssetUtil;
    /**
     * @author huipeng.jia
     * @groups 工具
     * @description 字符串工具
     * @networkStatus usage:客户端
     */
    const StringUtil: typeof mw.StringUtil;
    type StringUtil = mw.StringUtil;
    /**
     * @author guang.deng
     * @description 贴图格式
     * @groups 基础类型
     */
    const TextureFormat: typeof mw.TextureFormat;
    type TextureFormat = mw.TextureFormat;
    /**
     * @author mengyuan.hao
     * @description 状态信息获取工具
     * @description 判断当前环境状态是否是客户端、服务端、移动端。获取版本号等信息
     * @groups 工具
     * @networkStatus usage:双端
     */
    const SystemUtil: typeof mw.SystemUtil;
    type SystemUtil = mw.SystemUtil;
    /**
     * @groups 工具
     * @author huipeng.jia, xiangkun.sun
     * @description 时间工具
     * @networkStatus usage:双端
     */
    const TimeUtil: typeof mw.TimeUtil;
    type TimeUtil = mw.TimeUtil;
    /**
     * @author huipeng.jia
     * @groups 工具/补间动画
     * @description 序列工具类，主要用于获取连续的ID
     * @networkStatus usage: 双端
     */
    const TweenSequence: typeof mw.TweenSequence;
    type TweenSequence = mw.TweenSequence;
    /**
     * @author huipeng.jia
     * @groups 工具/补间动画
     * @description 补间组，用于同时控制多个补间对象
     * @networkStatus usage: 双端
     */
    const TweenGroup: typeof mw.TweenGroup;
    type TweenGroup = mw.TweenGroup;
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
    const TweenUtil: typeof mw.TweenUtil;
    type TweenUtil = mw.TweenUtil;
    /**
     * @author huipeng.jia
     * @groups 工具/补间动画
     * @description 补间(动画)（来自 in-between）是一个概念，允许你以平滑的方式更改对象的属性。
     * 你只需告诉它哪些属性要更改，当补间结束运行时它们应该具有哪些最终值，以及这需要多长时间，
     * 补间引擎将负责计算从起始点到结束点的值。
     * @networkStatus usage: 双端
     */
    const Tween: typeof mw.Tween;
    type Tween<T extends TweenUnknownProps> = mw.Tween<T>;
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
    const TouchInputUtil: typeof mw.TouchInputUtil;
    type TouchInputUtil = mw.TouchInputUtil;
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
    const WindowUtil: typeof mw.WindowUtil;
    type WindowUtil = mw.WindowUtil;
    /**
     * @author huipeng.jia
     * @description 缓动函数的类型定义
     * @groups 基础类型
     */
    type TweenEasingFunction = mw.TweenEasingFunction;
    /**
         * @author huipeng.jia
         * @description 屏蔽字检测的结果
         * @groups 基础类型
         */
    type maskWordCheckResult = mw.maskWordCheckResult;
    /**
     * @author huipeng.jia
     * @description 插值函数的类型定义
     * @groups 基础类型
     */
    type TweenInterpolationFunction = mw.TweenInterpolationFunction;
    /**
     * @author huipeng.jia
     * @description 补间属性的定义，用户可以自由扩展
     * @groups 基础类型
     */
    type TweenUnknownProps = mw.TweenUnknownProps;
    /**
     * @author si.wu
     * @description HTTP请求
     * @groups 玩法
     * @effect 调用端生效
     * @param url usage:url range: 不做限制
     * @param init usage:请求信息 default:请求信息
     * @returns 响应信息
     */
    const fetch: typeof mw.fetch;
    /**
     * @author si.wu
     * @description url转码
     * @groups 玩法
     * @effect 调用端生效
     * @param str usage:内容 range: 不做限制
     * @returns 转码后的内容
     */
    const urlEncode: typeof mw.urlEncode;
    /**
     * @author si.wu
     * @description url解码
     * @groups 玩法
     * @effect 调用端生效
     * @param str usage:内容 range: 不做限制
     * @returns 解码后的内容
     */
    const urlDecode: typeof mw.urlDecode;
    /**
     * @author si.wu
     * @description 获取 url 参数
     * @groups 玩法
     * @effect 调用端生效
     * @param url  usage:url range: 不做限制，依据具体的 url 的长度
     * @param parameterName  usage:参数名 range: 不做限制
     * @returns 参数值
     */
    const getUrlParameter: typeof mw.getUrlParameter;
    /**
     * @author junwen.hua
     * @description Http请求接口
     * @groups 玩法
     * @effect 调用端生效
     * @param response usage: 请求的回调
     * @param paramUrl usage: 请求的参数和值  range: 不做限制
     * @param jsonContent usage: 请求数据内容，json格式  range: 不做限制
     * @param requestType usage: 请求类型。HttpRequestType枚举值
     * @returns 请求是否发送成功
     */
    const httpRequestTransmitData: typeof mw.httpRequestTransmitData;
    /**
     * @author junwen.hua
     * @groups 玩法
     * @description 通用 Http 请求
     * @effect 调用端生效
     * @param response usage:OnHttpResponse
     * @param requestUrl usage:EHttpRequestURL
     * @param param usage:string  range: 不做限制
     * @param jsonContent usage:any
     * @param requestType usage:0是Get 1是Post
     * @returns bool
     * @example
     * 使用示例:发送Http请求
     * ```
     * generalHttpRequest(Response,Url,Param,JsonContent)
     * ```
     */
    const generalHttpRequest: typeof mw.generalHttpRequest;
    /**
     * @author junwen.hua
     * @description 开放给用户用的URL枚举，需要与C++层的枚举对应
     * @groups 玩法
     */
    const HttpRequestURL: typeof mw.HttpRequestURL;
    type HttpRequestURL = mw.HttpRequestURL;
    /**
     * @author junwen.hua
     * @description 开发给用户用的Http请求类型枚举
     * @groups 玩法
     */
    const HttpRequestType: typeof mw.HttpRequestType;
    type HttpRequestType = mw.HttpRequestType;
    /**
     * @author si.wu
     * @groups 玩法/其他
     * @description HTTP响应信息的对象
     * @networkStatus usage:双端
     */
    type Response = mw.Response;
    /**
     * @author junwen.hua
     * @description Http请求的回调消息格式
     * @groups 基础类型
     * @precautions 无需主动销毁，生命周期由UObject管理
     * @param result usage: 请求否成功
     * @param content usage: 消息内容
     * @param responseCode usage: 状态码
     */
    type HttpResponse = mw.HttpResponse;
    /**
     * @author si.wu
     * @groups 玩法/其他
     * @description HTTP请求信息的对象
     * @networkStatus usage:双端
     */
    type RequestInit = mw.RequestInit;
    /**
     * @author junwen.hua
     * @description 商城通信回调消息格式
     * @groups 基础类型
     * @param isSuccess usage: 通信结果
     * @param content usage: 消息内容
     */
    type TransactionType = mw.TransactionType;
    /**
     * Decorator
     */
    const Decorator: typeof mwext.Decorator;
    /**
    * @author shilong.wang
    * @groups 拓展/排行榜
    * @description 排行榜主界面
    * @networkStatus usage: 客户端
    */
    const LeaderboardMainPanelBase: typeof mwext.LeaderboardMainPanelBase;
    type LeaderboardMainPanelBase<T extends ILeaderboardPanelView> = mwext.LeaderboardMainPanelBase<T>;
    /**
    * @author shilong.wang
    * @groups 拓展/排行榜
    * @description 排行榜模块-客户端
    * @networkStatus usage: 客户端
    */
    const LeaderboardModuleBaseC: typeof mwext.LeaderboardModuleBaseC;
    type LeaderboardModuleBaseC<T extends LeaderboardModuleTypeS> = mwext.LeaderboardModuleBaseC<T>;
    /**
     * @instance
     * @author shilong.wang
     * @groups 拓展/排行榜
     * @description 编辑器内置排行榜
     * @networkStatus usage: 双端
     */
    const LeaderboardModule: typeof mwext.LeaderboardModule;
    type LeaderboardModule = mwext.LeaderboardModule;
    /**
     * @author shilong.wang
     * @groups 拓展/排行榜
     * @description 排行榜主界面中的子UI，用来显示一条记录
     * @networkStatus usage: 客户端
     */
    const LeaderboardItemPanelBase: typeof mwext.LeaderboardItemPanelBase;
    type LeaderboardItemPanelBase<T extends ILeaderboardItemView> = mwext.LeaderboardItemPanelBase<T>;
    /**
    * @author shilong.wang
    * @groups 拓展/排行榜
    * @description 排行榜模块-服务端
    * @networkStatus usage: 服务端
    */
    const LeaderboardModuleBaseS: typeof mwext.LeaderboardModuleBaseS;
    type LeaderboardModuleBaseS<T extends LeaderboardModuleTypeC> = mwext.LeaderboardModuleBaseS<T>;
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus usage:客户端
    * @description 背包删除界面父类,继承这个类来实现自己的道具删除界面，使用BagModule.skin来指定皮肤
    */
    const ItemDeleteUI: typeof mwext.ItemDeleteUI;
    type ItemDeleteUI = mwext.ItemDeleteUI;
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus usage:客户端
    * @description 背包皮肤
    */
    const IBagSkin: typeof mwext.IBagSkin;
    type IBagSkin = mwext.IBagSkin;
    /**
     * @author lei.zhao
     * @groups 拓展/背包
     * @networkStatus usage:客户端
     * @description 背包界面父类,继承这个类来实现自己的背包界面，使用BagModule.skin来指定皮肤
     */
    const BagUI: typeof mwext.BagUI;
    type BagUI = mwext.BagUI;
    /**
     * @author shilong.wang
     * @groups 基类/数据拓展
     * @description 数据控制类的基类
     * @description 1. 为什么需要数据控制中心？
     * @description - 数据控制中心可以帮助我们将数据进行永久存储。
     * @description - 数据控制中心实现了服务端和客户端的数据同步。
     * @description - 数据控制中心实现了数据缓存，降低与KV服务器的交互频率。
     * @description - 数据控制中心实现了模块数据的统一管理。
     * @description 【定义数据方便】数据体只需要继承SubData，数据就能自动被DataCenter管理起来
     * @description 【保存数据方便】保存数据只需要调用父类SubData的save方法，即可实现保存
     * @description 【获取数据方便】获取数据只需要传入数据体的类名，即可获取到对应数据
     * @description 2. 数据控制中心是如何工作的？
     * @description 数据上方标注的 @Decorator.persistence 装饰器有两个作用：
     * @description - 让字段能够被永久存储（永久存储可以认为当退出游戏后，再次打开游戏，会存储上次游戏数据继续玩）
     * @description - 让字段能够被同步到客户端
     * @description - 没有标注 @Decorator.persistence 装饰器将丧失永久存储和同步至客户端的能力。
     * @description 3. 通过改写 ModuleService 中的示例，数据控制中心如何使用：
     * @example
     * 使用示例: C&S 和数据模块组合。
     * ```ts
     * @Component
     * export default class GameStart extends Script {
     *
     *     protected onStart(): void {
     *         ModuleService.registerModule(AppleModS, AppleModC, AppleData);
     *     }
     *
     * }
     * class AppleData extends Subdata {
     *
     *     @Decorator.persistence()
     *     appleNum : number = 10;
     *
     *     public removeApple() {
     *         this.appleNum -= 1;
     *         this.save(true);
     *     }
     *     public addApple() {
     *         this.appleNum += 1;
     *         this.save(true);
     *     }
     * }
     * class AppleModS extends ModuleS<AppleModC,AppleData> {
     *
     *     public net_appleChange(player:Player) {
     *         let curPlayer = DataCenterS.getData(this.currentPlayer, AppleData);
     *         curPlayer.removeApple();
     *         const otherPlayer = DataCenterS.getData(player, AppleData);
     *         otherPlayer.addApple();
     *     }
     * }
     * class AppleModC extends ModuleC<AppleModS, AppleData> {
     *
     *     public npc:Player;
     *
     *     protected onStart(): void {
     *         InputUtil.onKeyDown(Keys.P, () => {
     *             Player.getAllPlayers().forEach( (element) => {
     *                 if(element != this.localPlayer){
     *                     this.npc = element;
     *                 }
     *             });
     *             ModuleService.getModule(AppleModC).sendApple(this.npc);
     *         });
     *         InputUtil.onKeyDown(Keys.O, async () => {
     *             await DataCenterC.ready();
     *             let apple = DataCenterC.getData(AppleData).appleNum;
     *             console.log("The current number of apples of the client player is:" + apple);
     *         });
     *     }
     *     public sendApple(player:Player) {
     *         this.server.net_appleChange(player);
     *     }
     * }
     * ```
     * @networkStatus usage: 双端
     */
    const Subdata: typeof mwext.Subdata;
    type Subdata = mwext.Subdata;
    /**
     * @author shilong.wang
     * @groups 基类/数据拓展
     * @description 客户端数据中心，里面存放着当前玩家的数据
     * @networkStatus usage: 客户端
     * @example
     * 使用示例:创建一个名为DataCenterCExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，你将在客户端日志中看到玩家数据就绪以及玩家等级为0的信息
     * ```
     * @Component
     * export default class DataCenterCExample extends Script {
     *
     *     protected onStart(): void {
     *         this.traceLevel();
     *     }
     *
     *     //等待玩家数据准备好并输出玩家数据的等级
     *     public async traceLevel(): Promise<void> {
     *         if (SystemUtil.isClient()) {
     *             //等待玩家数据准备好
     *             await DataCenterC.ready();
     *             console.log("玩家数据就绪");
     *             let playerData = DataCenterC.getData(PlayerModuleData);
     *             console.log("玩家等级：", playerData.getlevel());
     *         }
     *     }
     * }
     *
     * class PlayerModuleData extends Subdata {
     *     @Decorator.persistence()
     *     private level: number = 0;
     *
     *     public getlevel(): number {
     *         return this.level;
     *     }
     * }
     * ```
     */
    const DataCenterC: typeof mwext.DataCenterC;
    type DataCenterC = mwext.DataCenterC;
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus 双端
    * @description 道具品质
    */
    const ItemQuality: typeof mwext.ItemQuality;
    type ItemQuality = mwext.ItemQuality;
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus usage:客户端
    * @description 背包道具父类,继承这个类来实现自己的道具格子界面，使用BagModule.skin来指定皮肤
    */
    const BagItemUI: typeof mwext.BagItemUI;
    type BagItemUI = mwext.BagItemUI;
    /**
     * @author shilong.wang
     * @groups 基类/数据拓展
     * @description 服务端数据中心，管理所有玩家的数据。
     * @networkStatus usage: 服务端
     * @example
     * 使用示例:创建一个名为DataCenterSExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，玩家加入时会输出当前玩家的等级以及当前所有玩家的等级，玩家离开时当前玩家会升级并且输出（pie上玩家离开需要通过点x键）
     * ```
     * @Component
     * export default class DataCenterSExample extends Script {
     *
     *     protected onStart(): void {
     *         if (SystemUtil.isServer()) {
     *             DataCenterS.onPlayerJoin.add(this.onPlayerJoin, this);
     *             DataCenterS.onPlayerLeave.add(this.onPlayerLeave, this);
     *         }
     *     }
     *
     *     //玩家加入且数据就绪
     *     private onPlayerJoin(player: mw.Player): void {
     *         let playerData = DataCenterS.getData(player, PlayerModuleData);
     *         console.log("玩家加入，当前玩家等级为：", playerData.getlevel());
     *         console.log("显示当前所有玩家的等级：");
     *         const playerIds = DataCenterS.getReadyPlayerIds();
     *         playerIds.forEach(playerId => {
     *             let playerData = DataCenterS.getData(playerId, PlayerModuleData);
     *             console.log("玩家playerId为：" + playerId, "的等级：", playerData.getlevel());
     *         });
     *     }
     *
     *     //玩家离开
     *     private onPlayerLeave(player: mw.Player): void {
     *         let playerData = DataCenterS.getData(player, PlayerModuleData);
     *         playerData.levelUp();
     *         console.log("玩家离开，等级提升为：", playerData.getlevel());
     *     }
     *
     * }
     *
     * class PlayerModuleData extends Subdata {
     *     @Decorator.persistence()
     *     private level: number = 0;
     *
     *     public getlevel(): number {
     *         return this.level;
     *     }
     *
     *     //玩家升级
     *     public levelUp(): void {
     *         this.level++;
     *         //保存数据
     *         this.save(false);
     *     }
     * }
     * ```
     */
    const DataCenterS: typeof mwext.DataCenterS;
    type DataCenterS = mwext.DataCenterS;
    /**
     * @author shilong.wang
     * @groups 基类/C&S拓展
     * @description 客户端模块的基类
     * @description 所有的客户端模块都必须继承这个类，才能被 ModuleService 管理。
     * @description 注意：继承自 ModuleC 类中的方法名。当方法名前缀为"net_XXX"的方法才能在继承 ModuleS 中调用。
     * @description 在 Script 类中说过，继承自 Script 的类享受onStart、OnUpdate、OnDestroy脚本的生命周期，在此基础之上，当在onStart()函数中注册了客户端服务端以及数据模块之后
     * @description ModuleService.registerModule(YourModS, YourModC, YourData);
     * @networkStatus usage: 双端
     * @example
     * 使用示例:创建一个名为ModuleCExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，客户端日志会输出player模块每个生命周期执行的日志，按下F键你将在客户端以及服务端日志中看到玩家等级的信息
     * ```
     * @Component
     * export default class ModuleCExample extends Script {
     *
     *     protected onStart(): void {
     *         ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerModuleData);
     *     }
     *
     * }
     *
     * class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerModuleData>{
     *
     *     protected onAwake(): void {
     *         console.log("-----------player模块创建模块-----------");
     *     }
     *
     *     protected onStart(): void {
     *         console.log("-----------player模块开始-----------");
     *         //输出当前玩家的等级
     *         let playerData = this.data;
     *         console.log("玩家等级：", playerData.getlevel());
     *         playerData.onDataChange.add(() => {
     *             //玩家数据发生变化时，输出当前玩家的等级
     *             console.log("玩家等级：", playerData.getlevel());
     *         })
     *         InputUtil.onKeyDown(Keys.F, () => {
     *             this.server.net_LevelUp();
     *         })
     *     }
     *
     *     protected onEnterScene(sceneType: number): void {
     *         console.log("-----------player模块进入场景-----------");
     *     }
     *
     *     protected onUpdate(dt: number): void {
     *         //每帧调用 dt为两帧之间的时间差
     *         // console.log("-----------player模块更新-----------"+dt);
     *     }
     *
     *     protected onDestroy(): void {
     *         console.log("-----------player模块销毁-----------");
     *     }
     *
     * }
     * class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerModuleData>{
     *     //玩家升级
     *     public net_LevelUp(): void {
     *         //调用该函数的客户端玩家
     *         let player = this.currentPlayer;
     *         //调用该函数的客户端玩家id
     *         let playerId = this.currentPlayerId;
     *         //调用该函数的客户端玩家数据
     *         let playerData = this.currentData;
     *         playerData.levelUp();
     *         console.log("玩家等级：", playerData.getlevel());
     *     }
     * }
     * class PlayerModuleData extends Subdata {
     *     @Decorator.persistence()
     *     private level: number;
     *
     *     protected initDefaultData(): void {
     *         this.level = 0;
     *     }
     *
     *     public getlevel(): number {
     *         return this.level;
     *     }
     *
     *     public levelUp(): void {
     *         this.level++;
     *         //保存数据
     *         this.save(true);
     *     }
     * }
     * ```
     */
    const ModuleC: typeof mwext.ModuleC;
    type ModuleC<T, S extends mwext.Subdata> = mwext.ModuleC<T, S>;
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus usage:双端
    * @description 背包实例
    * @description 背包系统就像你在玩游戏时使用的一个特殊的背包，可以帮助你管理和存放各种物品和资源。MW编辑器已经封装好了一个可以直接使用的背包系统。
    * @description 你的角色在游戏中收集了很多宝贵的物品，比如武器、装备、药品、材料等等。这些物品都需要一个地方来储存，而背包系统就是一个虚拟的背包，可以容纳这些物品。
    * @description 它就是一个游戏中的特殊工具，帮助你整理、存储和管理你在游戏中收集到的各种物品和资源，让你的游戏体验更加方便和有序。
    * @example
    * 使用示例:创建一个名为BagExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏
    * ```
    * @Component
    * export default class BagExample extends Script {
    *    protected onStart(): void {
    *       BagModule.registerItem(1,"37692","金铲铲",ItemQuality.Legend,10,{a:1,b:2});
    *       BagModule.registerItem(2,"37690","小喇叭",ItemQuality.Legend,10,{a:1,b:2});
    *       BagModule.registerItem(3,"37697","金币",ItemQuality.Legend,10,{a:1,b:2});
    *       BagModule.registerItem(4,"37695","南瓜",ItemQuality.Common,20,{a:1,b:2});
    *       if(SystemUtil.isClient()){
    *           BagModule.addItemClickListener(this.onItemClick,this);
    *           BagModule.addItem(1,1);
    *           BagModule.addItem(2,5);
    *           BagModule.addItem(3,10);
    *           BagModule.addItem(4,30);
    *           BagModule.open();
    *       }
    *    }
    *    private onItemClick(cfg:ItemConfig){
    *       console.log("点击了",cfg);
    *    }
    * }
    * ```
    */
    const BagModule: typeof mwext.BagModule;
    type BagModule = mwext.BagModule;
    /**
     * @author shilong.wang
     * @groups 基类/C&S拓展
     * @description 服务端模块的基类
     * @description 所有的服务端模块都必须继承这个类，才能被 ModuleService 管理。
     * @description 注意：继承自 ModuleS 类中的方法名。当方法名前缀为"net_XXX"的方法才能在客户端中调用。
     * @description 在 Script 类中说过，继承自 Script 的类享受onStart()、onUpdate()、onDestroy() 脚本的生命周期，在此基础之上，当在onStart()函数中注册了客户端服务端以及数据模块之后
     * @description ModuleService.registerModule(YourModS, YourModC, YourData);
     * @description 继承自 ModuleS 的类也封装了一套生命周期。
     * @networkStatus usage: 双端
     * @example
     * 使用示例:创建一个名为ModuleSExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，服务端日志会输出player模块每个生命周期执行的日志，按下F键你将在服务端日志中看到玩家等级的信息。
     * ```
     * @Component
     * export default class ModuleSExample extends Script {
     *
     *     protected onStart(): void {
     *         ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerModuleData);
     *     }
     *
     * }
     *
     * class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerModuleData>{
     *     protected onStart(): void {
     *         InputUtil.onKeyDown(Keys.F, () => {
     *             this.server.net_LevelUp();
     *         })
     *     }
     * }
     * class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerModuleData>{
     *
     *     protected onAwake(): void {
     *         console.log("-----------服务端-player模块创建模块-----------");
     *     }
     *
     *     protected onStart(): void {
     *         console.log("-----------服务端-player模块开始-----------");
     *     }
     *
     *     protected onPlayerEnterGame(player: Player): void {
     *         console.log("-----------服务端-player模块玩家进入游戏-----------");
     *     }
     *
     *     protected onPlayerJoined(player: Player): void {
     *         console.log("-----------服务端-player模块玩家加入-----------");
     *     }
     *
     *     protected onPlayerLeft(player: Player): void {
     *         console.log("-----------服务端-player模块玩家离开-----------");
     *     }
     *
     *     protected onUpdate(dt: number): void {
     *         //每帧调用 dt为两帧之间的时间差
     *         // console.log("-----------服务端-player模块更新-----------"+dt);
     *     }
     *
     *     //玩家升级
     *     public net_LevelUp(): void {
     *         //调用该函数的客户端玩家数据
     *         let playerData = this.currentData;
     *         playerData.levelUp();
     *         console.log("玩家等级：", playerData.getlevel());
     *     }
     * }
     * class PlayerModuleData extends Subdata {
     *     @Decorator.persistence()
     *     private level: number;
     *
     *     protected initDefaultData(): void {
     *         this.level = 0;
     *     }
     *
     *     public getlevel(): number {
     *         return this.level;
     *     }
     *
     *     public levelUp(): void {
     *         this.level++;
     *         //保存数据
     *         this.save(true);
     *     }
     * }
     * ```
     */
    const ModuleS: typeof mwext.ModuleS;
    type ModuleS<T, S extends mwext.Subdata> = mwext.ModuleS<T, S>;
    /**
     * @author shilong.wang
     * @groups 基类/C&S拓展
     * @description 服务端客户端及数据模块管理
     * @description 当你真正开始开发一个联机游戏时发现，客户端服务端总是需要你去考虑的。多人游戏的实现并不简单，如果你想在游戏中加入多人游戏，应该尽早在设计和开发中考虑妥当。
     * @description 1. 为什么要分为客户端服务端？
     * @description 在游戏开发中，将游戏分为客户端和服务端有以下几个主要原因：
     * @description - 分工合作：客户端和服务端各自负责不同的任务和功能。客户端主要处理玩家的输入、渲染和展示游戏画面，而服务端负责处理游戏的逻辑、数据存储和多玩家之间的通信。这种分工合作可以提高游戏的性能和效率。
     * @description - 安全性和防作弊：将游戏逻辑和关键数据处理放在服务端可以提高游戏的安全性。客户端只负责输入和显示，而服务端拥有最终决策权，可以防止客户端作弊和修改游戏规则。通过服务端验证和控制玩家的操作，可以维护游戏的公平性和防止外挂的出现。
     * @description - 同步和协调：服务端作为游戏的主控制中心，负责同步和协调多个客户端之间的状态和行为。通过服务端的统一控制，可以确保多个客户端之间的游戏体验始终保持一致性。例如，在多人对战游戏中，服务端负责接收和处理玩家的操作，并将结果广播给所有客户端，从而实现玩家之间的同步和互动。
     * @description - 网络通信：客户端和服务端之间通过网络进行通信，实现玩家之间的互动。服务端充当中间人的角色，接收和处理客户端的请求，并将相应的信息传递给其他客户端，实现玩家之间的实时交流和互动。通过服务端的网络架构，可以确保游戏在不同玩家之间的流畅运行，并处理网络延迟和连接问题。
     * @description - 扩展性和灵活性：将游戏逻辑和数据处理分离到服务端，可以使游戏具有更好的扩展性和灵活性。通过对服务端进行修改和增强，可以轻松地引入新的功能和扩展游戏的规模。客户端可以更专注于用户界面和交互体验，而服务端则负责处理游戏的核心逻辑和数据管理。
     * @description 2. 客户端和服务端之间如何通信？
     * @description 编辑器默认为多人游戏。并采用客户端-服务器模型运行。服务器是维护体验状态的最终权威，负责将所有连接的客户端与服务器保持同步。
     * @description - 从服务器到一个特定客户端的通信。例如，新玩家加入游戏，服务器会用一组物品填充该玩家的背包。
     * @description - 从任何客户端到服务器的通信。例如，玩家按P键喝下隐形药水，并告诉服务器使该玩家的角色对所有其他玩家隐形。
     * @description - 服务器和所有连接的客户端之间的通信。例如，服务端会通知所有玩家某个玩家使用了隐形药水。
     * @description 这里不需要你考虑HTTP、websocket或RPC等复杂的通信方式，只需要按照一定的格式搭建你的客户端服务端代码即可。
     * @description 服务端开发费用通常是多人游戏开发成本的重要组成部分，可能占到总体开发费用的30%到50%甚至更多，具体比例会因游戏的特点而有所不同，我们会免费为您提供多人游戏服务器。
     * @description 3. 哪些逻辑写在客户端哪些逻辑写在服务端？
     * @description 当新建一个脚本时，默认是双端的，也就是说，你在 onStart() 中写一段代码，服务端也会执行，客户端也会执行。刚开始时，你可能没有意识到需要调用 if(SystemUtil.isClient()){...} 或 if(SystemUtil.isServer()){...} 。这是用来选择你的代码是在服务端还是客户端执行的一种手段。
     * @description 客户端只负责渲染画面。客户端接收着服务端传来的数据，包含玩家角色的各种属性和状态，如施放技能、移动、血量、魔法值等。然而，客户端只是根据服务端发送的消息来重放这些属性数值变化。
     * @description 例如，当玩家角色要施放技能，整个过程是这样的：
     * @description 首先，客户端向服务端发送“释放技能”的指令。服务端回应客户端：“在某地以某个方向释放了某个技能”。
     * @description 然后，客户端根据这些信息创建出特效，并让特效沿着指定方向飞行。服务端则会运用碰撞检测逻辑来判断技能是否与敌方英雄碰撞。
     * @description 当技能与敌方英雄相撞时，服务端将告知客户端，客户端便立即删除特效，并按照服务端的指示，为被击中的英雄减血，同时播放受击特效。
     * @description 总之，客户端的主要任务是根据服务端传来的数据来呈现游戏的结果，而无法对游戏核心逻辑进行实质性的改变。这样的设计确保了游戏的一致性，使得所有玩家在游戏世界中都能享受相同的游戏体验。
     * @description 4. 游戏中的数据如何处理？
     * @description 请看 subdata 类。
     * @description 5. 使用步骤：
     * @description ->（1）编写模块C端和模块S端以及模块数据
     * @example
     * 使用示例: C&S 代码架构。
     * ```ts
     * // 模块C（客户端）
     * export class MyModuleC extends ModuleC<MyModuleS, MyModuleData> {
     *
     * }
     *
     * // 模块S（服务端）
     * export class MyModuleS extends ModuleS<MyModuleC, MyModuleData> {
     *
     * }
     *
     * // 模块数据
     * export class MyModuleData extends Subdata {
     *     @Decorator.persistence()
     *     myName: string;
     *
     *     setMyName(name: string) {
     *         this.myName = name;
     *         this.save(true);
     *     }
     * }
     * ```
     * @description ->（2）注册模块
     * @example
     * 使用示例: C&S 注册模块。
     * ```ts
     * @Component
     * export default class GameStart extends Script {
     *
     *     protected onStart(): void {
     *         ModuleService.registerModule(MyModuleS, MyModuleC, MyModuleData);
     *     }
     * }
     * ```
     * @description 以下一个非常简单例子，告诉你 ModuleService 如何管理 C&S 代码。
     * @example
     * 使用示例: C&S 代码示例。
     * ```ts
     * @Component
     * export default class GameStart extends Script {
     *
     *     protected onStart(): void {
     *         ModuleService.registerModule(AppleModS,AppleModC,null);
     *     }
     * }
     *
     * class AppleModS extends ModuleS<AppleModC,null> {
     *
     *     public net_appleChange(player:Player) {
     *         this.getClient(player).net_addApple();
     *         this.getClient(this.currentPlayer).net_removeApple();
     *     }
     * }
     * class AppleModC extends ModuleC<AppleModS,null> {
     *
     *     public appleNum : number;
     *     public npc:Player;
     *
     *     protected onStart(): void {
     *         this.appleNum = 10;
     *         InputUtil.onKeyDown(Keys.P,()=>{
     *             Player.getAllPlayers().forEach((element)=>{
     *                     this.npc = element;
     *             });
     *             ModuleService.getModule(AppleModC).sendApple(this.npc);
     *         });
     *     }
     *     public net_removeApple() {
     *         this.appleNum -= 1;
     *         console.log("The current number of apples the player has is:" + this.appleNum);
     *     }
     *     public net_addApple() {
     *         this.appleNum += 1;
     *         console.log("The current number of apples the player has is:" + this.appleNum);
     *     }
     *     public sendApple(player:Player) {
     *         this.server.net_appleChange(player);
     *     }
     * }
     * ```
     * @description 注：这里只是初步探讨 ModuleService ModuleC ModuleS 的使用方法，考虑到真实做游戏时，需要数据（苹果数量）单独存储，存在客户端容易发生作弊；完整示例请看 Subdata 。
     * @description 不使用 ModuleService 时，同样的功能书写为下：
     * @example
     * 使用示例: 不使用 C&S 代码架构的使用示例。
     * ```ts
     * @Component
     * export default class GameStartTwo extends Script {
     *
     *     public npc:Player;
     *     public Apple:number = 10;
     *
     *     protected onStart(): void {
     *
     *         if(SystemUtil.isClient()){
     *             Event.addServerListener("remove", () => {
     *                 this.removeApple();
     *             });
     *             Event.addServerListener("add",()=>{
     *                 this.addApple();
     *             })
     *
     *             InputUtil.onKeyDown(Keys.P,()=>{
     *                 Player.getAllPlayers().forEach((element)=>{
     *                         this.npc = element;
     *                 });
     *                 this.sendApple(this.npc, Player.localPlayer);
     *             })
     *         }
     *         if(SystemUtil.isServer()){
     *             Event.addClientListener("send",(loca:Player, play:Player)=>{
     *                 Event.dispatchToClient(play, "add");
     *                 Event.dispatchToClient(loca, "remove");
     *             })
     *         }
     *     }
     *     public removeApple(){
     *         this.Apple -= 1;
     *         console.log("The current number of apples the player has is:" + this.Apple);
     *     }
     *
     *     public addApple(){
     *         this.Apple += 1;
     *         console.log("The current number of apples the player has is:" + this.Apple);
     *     }
     *
     *     public sendApple(player:Player, loca:Player){
     *         Event.dispatchToServer("send", player, loca);
     *     }
     * }
     * ```
     * @description 可以看到，使用模块管理时，代码得到了以下改善：
     * @description - 客户端和服务端分开编写，避免端与端代码难以区分的问题。
     * @description - 不再需要来回监听和派发事件，只需要在方法前面加上net_即可完成通信事件的调用。
     * @description - 代码由原来的一个脚本拆成了两个模块，降低了耦合度，方便多人开发与管理。
     * @networkStatus usage: 双端
     * @example
     * 使用示例:创建一个名为ModuleExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，客户端日志会先输出hud模块开始的日志，再输出player模块开始的日志，按下F键和G键你在客户端日志都会看到player模块的信息
     * ```
     * @Component
     * export default class ModuleExample extends Script {
     *
     *     protected onStart(): void {
     *         ModuleService.setClientFirstStartModule(HudModuleC);
     *         ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerModuleData);
     *         ModuleService.registerModule(HudModuleS, HudModuleC, HudModuleData);
     *     }
     *
     * }
     *
     * class HudModuleC extends ModuleC<HudModuleS, HudModuleData>{
     *     protected onStart(): void {
     *         console.log("-----------客户端-hud模块开始-----------");
     *     }
     *     protected onExecute(type: number, ...params: any[]): void {
     *         switch (type) {
     *             case 0:
     *                 //优先启动模块需要在onExecute中type为0调用该函数,编辑器会等待fun执行完毕后再执行其他模块的onStart
     *                 this.onExecuteStart(params[0]);
     *                 break;
     *             case 1:
     *                 this.traceHudExecute(params[0], params[1], params[2]);
     *                 break;
     *         }
     *     }
     *     //优先启动模块需要在onExecute中调用该函数,编辑器会等待fun执行完毕后再执行其他模块的onStart
     *     protected async onExecuteStart(fun: Function): Promise<void> {
     *         await TimeUtil.delaySecond(1);
     *         console.log("-----------客户端-hud模块准备结束-----------");
     *         fun();
     *     }
     *
     *     //通过callExecute调用
     *     private traceHudExecute(testNum: number, testPos: Vector, testString: string): void {
     *         console.log("-----------客户端-hud模块被调用-----------");
     *         console.log("testNum:" + testNum);
     *         console.log("testPos:" + testPos.x, testPos.y, testPos.z);
     *         console.log("testString:" + testString);
     *     }
     *
     *     //直接调用
     *     public traceHud(testNum: number, testPos: Vector, testString: string): void {
     *         console.log("-----------客户端-hud模块被调用-----------");
     *         console.log("testNum:" + testNum);
     *         console.log("testPos:" + testPos.x, testPos.y, testPos.z);
     *         console.log("testString:" + testString);
     *     }
     *
     * }
     *
     * class HudModuleS extends ModuleS<HudModuleC, HudModuleData>{
     *
     * }
     *
     * class HudModuleData extends Subdata {
     *
     * }
     *
     * class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerModuleData>{
     *     protected onStart(): void {
     *         console.log("-----------客户端-player模块开始-----------");
     *         InputUtil.onKeyDown(Keys.F, () => {
     *             let playerData = this.data;
     *             ModuleService.callExecute(HudModuleC, 1, playerData.getLevel(), playerData.getPos(), playerData.getName());
     *         })
     *         InputUtil.onKeyDown(Keys.G, () => {
     *             let playerData = this.data;
     *             let hudModuleC = ModuleService.getModule(HudModuleC);
     *             hudModuleC.traceHud(playerData.getLevel(), playerData.getPos(), playerData.getName());
     *         })
     *     }
     * }
     * class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerModuleData>{
     *
     * }
     * class PlayerModuleData extends Subdata {
     *     @Decorator.persistence()
     *     private level: number = 1;
     *     @Decorator.persistence()
     *     private pos: Vector = new Vector(0, 0, 0);
     *     @Decorator.persistence()
     *     private name: string = "test";
     *
     *     public getLevel(): number {
     *         return this.level;
     *     }
     *
     *     public getPos(): Vector {
     *         return this.pos;
     *     }
     *
     *     public getName(): string {
     *         return this.name;
     *     }
     * }
     * ```
     */
    const ModuleService: typeof mwext.ModuleService;
    type ModuleService = mwext.ModuleService;
    /**
     * @author shilong.wang
     * @description 面板类的基类，可用于控制一个界面
     * @groups 拓展/排行榜
     * @networkStatus usage: 客户端
     * @precautions 注意：如子类重写onAwake，onAdded方法，请调用super的对应方法
     */
    const BasePanel: typeof mwext.BasePanel;
    type BasePanel<T extends mw.UIScript> = mwext.BasePanel<T>;
    /**
     * @author shilong.wang
     * @groups 拓展/排行榜
     * @description 界面类的基类
     * @networkStatus usage: 客户端
     */
    const BaseView: typeof mwext.BaseView;
    type BaseView = mwext.BaseView;
    /**
     * @author shilong.wang
     * @description GameObject对象池资源来源类型，不同类型的资源创建方式不一样，需要正确选择
     * @groups 基类/对象池
     */
    const GameObjPoolSourceType: typeof mwext.GameObjPoolSourceType;
    type GameObjPoolSourceType = mwext.GameObjPoolSourceType;
    /**
     * @author shilong.wang
     * @groups 基类/对象池
     * @description 用于缓存GameObject的对象池，适用资源库资源、场景对象、预制体的复用缓存
     * @networkStatus usage: 双端
     * @example
     * 使用示例:创建一个名为GameObjPoolExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在原点生成一个方块，并在5秒后消失
     * ```
     * @Component
     * export default class GameObjPoolExample extends mw.Script {
     *
     *     protected onStart(): void {
     *         this.createCube();
     *     }
     *
     *     //通过对象池动态创建一个方块
     *     public createCube(): void {
     *         const cubeAssetId = "197386";
     *         GameObjPool.asyncSpawn(cubeAssetId, GameObjPoolSourceType.Asset).then(obj => {
     *             obj.worldTransform.position = new Vector(0, 0, 0);
     *             setTimeout(() => {
     *                 //5秒后回收该方块
     *                 GameObjPool.despawn(obj);
     *             }, 5000);
     *         });
     *     }
     * }
     * ```
     */
    const GameObjPool: typeof mwext.GameObjPool;
    type GameObjPool = mwext.GameObjPool;
    /**
     * @author shilong.wang
     * @groups 基类/对象池
     * @description 通用对象池，可用于各种类型对象的复用
     * @networkStatus usage: 双端
     * @example
     * 使用示例:创建一个名为ObjPoolExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按F键会在玩家当前位置按照对象池中已有方块生成一个方块并在5秒后进行回收坐标回归到原点,频繁按F客户端日志会提示对象池中没有对象，按G键会销毁所有处于回收状态方块
     * ```
     * @Component
     * export default class ObjPoolExample extends Script {
     *
     *     private objPool: ObjPool<Cube>;
     *
     *     protected onStart(): void {
     *         if (!SystemUtil.isClient()) return;
     *         const cubeAssetId = "197386";
     *         AssetUtil.asyncDownloadAsset(cubeAssetId).then(() => {
     *             //初始化一个5个对象的对象池
     *             this.objPool = new ObjPool<Cube>(
     *                 this.onCubeCreate,
     *                 this.onCubeReset,
     *                 this.onCubeDestroy,
     *                 this.onCubeDespawn,
     *                 5
     *             );
     *             InputUtil.onKeyDown(Keys.F, () => {
     *                 let size = this.objPool.size;
     *                 if (size <= 0) {
     *                     console.log("对象池中没有对象");
     *                     return;
     *                 }
     *                 let cube = this.objPool.spawn();
     *                 setTimeout(() => {
     *                     //5秒后回收该方块
     *                     this.objPool.despawn(cube);
     *                     cube.obj.worldTransform.position = new Vector(0, 0, 0);
     *                 }, 5000);
     *             });
     *             InputUtil.onKeyDown(Keys.G, () => {
     *                 //将对象池中的已回收对象全部销毁
     *                 this.objPool.clear();
     *             })
     *         });
     *     }
     *
     *     //创建了新对象的回调
     *     private onCubeCreate(): Cube {
     *         let cube = new Cube();
     *         cube.obj.setCollision(CollisionStatus.Off);
     *         cube.obj.worldTransform.position = new Vector(0, 0, 0);
     *         return cube;
     *     }
     *
     *     //重置对象的回调
     *     private onCubeReset(cube: Cube): void {
     *         let playerPos = mw.getCurrentPlayer().character.worldTransform.position;
     *         cube.obj.worldTransform.position = playerPos;
     *     }
     *
     *     //销毁对象的回调
     *     private onCubeDestroy(cube: Cube): void {
     *         cube.obj.destroy();
     *         cube.obj = null;
     *     }
     *
     *     //归还对象的回调
     *     private onCubeDespawn(cube: Cube): void {
     *
     *     }
     *
     * }
     *
     * class Cube {
     *
     *     public obj: mw.GameObject = null;
     *
     *     constructor() {
     *         this.obj = mw.GameObject.spawn("197386");
     *     }
     * }
     * ```
     */
    const ObjPool: typeof mwext.ObjPool;
    type ObjPool<T> = mwext.ObjPool<T>;
    /**
     * @author lei.zhao
     * @groups 拓展/背包
     * @networkStatus 双端
     * @description 背包数据结构
     */
    type IBagStruct = mwext.IBagStruct;
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus usage:客户端
    * @description 道具删除皮肤
    */
    type IItemDeleteSkin = mwext.IItemDeleteSkin;
    /**
    * @author shilong.wang
    * @description 排行榜模块-服务端
    * @groups 拓展/排行榜
    */
    type LeaderboardModuleTypeS = mwext.LeaderboardModuleTypeS;
    /**
     * @author shilong.wang
     * @groups 拓展/排行榜
     * @description 排行榜面板的UI结构接口
     * @networkStatus usage: 客户端
     */
    type ILeaderboardPanelView = mwext.ILeaderboardPanelView;
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus 双端
    * @description 道具配置
    */
    type ItemConfig = mwext.ItemConfig;
    /**
    * @author shilong.wang
    * @description 排行榜模块-客户端
    * @groups 拓展/排行榜
    */
    type LeaderboardModuleTypeC = mwext.LeaderboardModuleTypeC;
    /**
     * @author shilong.wang
     * @groups 拓展/排行榜
     * @description 排行榜面板一条数据的UI结构接口
     * @networkStatus usage: 客户端
     */
    type ILeaderboardItemView = mwext.ILeaderboardItemView;
    /**
    * @author shilong.wang
    * @groups 拓展/排行榜
    * @description 排行榜玩家数据类型
    * @networkStatus usage: 双端
    */
    type LeaderboardPlayerData = mwext.LeaderboardPlayerData;
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus usage:客户端
    * @description 格子皮肤
    */
    type IBagItemSkin = mwext.IBagItemSkin;
    /**
     * @author junwen.hua
     * @groups 设置
     * @description 重力模式
     */
    const GravityMode: typeof mw.GravityMode;
    type GravityMode = mw.GravityMode;
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
    const RoomSettings: typeof mw.RoomSettings;
    type RoomSettings = mw.RoomSettings;
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
    const GraphicsSettings: typeof mw.GraphicsSettings;
    type GraphicsSettings = mw.GraphicsSettings;
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
    const ScriptingSettings: typeof mw.ScriptingSettings;
    type ScriptingSettings = mw.ScriptingSettings;
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
    const AvatarSettings: typeof mw.AvatarSettings;
    type AvatarSettings = mw.AvatarSettings;
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
    const EnvironmentSettings: typeof mw.EnvironmentSettings;
    type EnvironmentSettings = mw.EnvironmentSettings;
    /**
     * @author huipeng.jia, shilong.wang
     * @groups 场景/特效
     * @description 特效管理器
     * @description Effect 通常用于增强游戏画面、呈现视觉效果或传达特定的情感或信息。特效可以是各种形式的视觉效果，如粒子效果、光影效果、爆炸效果、烟雾效果等。MW编辑器在左侧特效栏中提供了大量的粒子特效，您可以任意的拖动特效到场景中查看并使用。
     * @description EffectService 中很多静态方法可直接调用，其中：
     * @description - playAtPosition、 playOnGameObject 方法控制粒子特效播放位置。
     * @description - stop 方法控制粒子特效停止播放。
     * @networkStatus usage: 双端
     */
    const EffectService: typeof mw.EffectService;
    type EffectService = mw.EffectService;
    /**
     * @author huipeng.jia, guang.deng
     * @groups 服务/社交
     * @description 用户账号信息管理服务
     * @networkStatus usage: 客户端
     */
    const AccountService: typeof mw.AccountService;
    type AccountService = mw.AccountService;
    /**
     * @author huipeng.jia
     * @groups 服务/传送
     * @description 多场景和传送服务
     * @networkStatus usage: 服务端
     */
    const TeleportService: typeof mw.TeleportService;
    type TeleportService = mw.TeleportService;
    /**
     * @author huipeng.jia
     * @description 传送状态
     * @groups 数据处理
     */
    const TeleportStatus: typeof mw.TeleportStatus;
    type TeleportStatus = mw.TeleportStatus;
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description Avatar商城的应用内购服务
     * @networkStatus usage: 客户端
     */
    const AvatarEditorService: typeof mw.AvatarEditorService;
    type AvatarEditorService = mw.AvatarEditorService;
    /**
     * @hidden
     * @author huipeng.jia
     * @groups 基础类型
     * @description 用户建造服务
     * @networkStatus usage: 客户端
     */
    const UGCService: typeof mw.UGCService;
    type UGCService = mw.UGCService;
    /**
     * @author changzun.li
     * @description 设置面板相关API
     * @networkStatus usage: 客户端
     * @groups 设置/设置面板
     */
    const SettingService: typeof mw.SettingService;
    type SettingService = mw.SettingService;
    /**
     * @author xiangkun.sun
     * @groups 服务/调试
     * @instance
     * @description debug调试服务
     * @networkStatus usage: 双端
     */
    const DebugService: typeof mw.DebugService;
    type DebugService = mw.DebugService;
    /**
     * @author mengyuan.hao
     * @groups 服务/社交
     * @description 聊天头顶气泡
     * @description 1. 什么是头顶气泡？
     * @description - 物体或角色头顶上出现的气泡通常称为「对话气泡」或「漫画气泡」。这种视觉效果被用来表示物体或角色正在说话、思考或传达信息。
     * @description - 对话气泡通常包含文字、图标或表情符号，以传达物体或角色的语言、情绪或意图。
     * @description - 它们可以呈现为云状气泡，矩形气泡或其他形状，具体样式根据游戏的艺术风格和设计决策而定。(目前可以修改气泡或文字大小颜色等，暂未支持气泡皮肤样式功能，之后会暴露接口DIY气泡样式)
     * @description 通过在游戏中使用对话气泡，开发者可以更生动地展示物体或角色之间的交互和对话，更好地理解故事情节、任务提示或角色的个性特点。
     * @networkStatus usage: 客户端
     */
    const ChatBubble: typeof mw.ChatBubble;
    type ChatBubble = mw.ChatBubble;
    /**
     * @author mengyuan.hao
     * @description 发送消息的类型
     * @groups 基础类型
     */
    const MessageType: typeof mw.MessageType;
    type MessageType = mw.MessageType;
    /**
     * @author mengyuan.hao
     * @description 发送消息的状态
     * @groups 基础类型
     */
    const MessageState: typeof mw.MessageState;
    type MessageState = mw.MessageState;
    /**
     * @author mengyuan.hao
     * @groups 服务/社交
     * @description 聊天服务
     * @description 语音聊天功能需要在mobile端才可生效，pie没有效果。可以使用手机端测试。
     * @networkStatus usage: 客户端
    */
    const ChatService: typeof mw.ChatService;
    type ChatService = mw.ChatService;
    /**
     * @author huipeng.jia
     * @groups 服务/社交
     * @description MGS以及玩家信息、数据、头像等相关API。
     * MGS = Meta Game Service, 是编辑器提供给开发者的一些原生服务，如发布游戏后的左上角聊天、好友相关信息服务。
     * @networkStatus usage: 客户端
     */
    const RoomService: typeof mw.RoomService;
    type RoomService = mw.RoomService;
    /**
     * @author shilong.wang
     * @groups 场景/音效
     * @description 音效管理器
     * @networkStatus usage: 双端
     */
    const SoundService: typeof mw.SoundService;
    type SoundService = mw.SoundService;
    /**
     * @author huipeng.jia
     * @groups 服务/社交
     * @description 游戏管理器
     * @networkStatus usage: 双端
     */
    const RouteService: typeof mw.RouteService;
    type RouteService = mw.RouteService;
    /**
     * @author xiangkun.sun
     * @groups 服务/埋点分析
     * @description 分析服务
     * @networkStatus usage: 双端
     */
    const AnalyticsService: typeof mw.AnalyticsService;
    type AnalyticsService = mw.AnalyticsService;
    /**
     * @author junwen.hua
     * @groups 服务/货币
     * @description 大会员扣除钥匙订单返回状态信息
     */
    const consumeKeyStatus: typeof mw.consumeKeyStatus;
    type consumeKeyStatus = mw.consumeKeyStatus;
    /**
     * @author huipeng.jia, junwen.hua
     * @groups 服务/货币
     * @description 应用内购服务
     * @networkStatus usage: 客户端
     */
    const PurchaseService: typeof mw.PurchaseService;
    type PurchaseService = mw.PurchaseService;
    /**
     * @hidden
     * @author huipeng.jia, junwen.hua
     * @description 枚举各个通道的使用与接收方
     * @groups 基础类型
     */
    const MessageChannelReceiver: typeof mw.MessageChannelReceiver;
    type MessageChannelReceiver = mw.MessageChannelReceiver;
    /**
     * @author huipeng.jia
     * @description 广告状态，调用show方法的时候可能返回的广告状态
     * @groups 服务/货币
     */
    const AdsState: typeof mw.AdsState;
    type AdsState = mw.AdsState;
    /**
     * @hidden
     * @author huipeng.jia, junwen.hua
     * @groups 基础类型
     * @instance
     * @description 支持各端的通信，Platform、引擎、Web和游戏项目可以互相直接进行业务上的消息传递，无需修改引擎代码
     * @networkStatus usage: 客户端
     * @precautions 单例类，请使用getInstance获取对象。TS端想要收到某消息并执行回调函数需要提前
     *              调用registerAction进行绑定。消息需要是Json格式的字符串并包含“action”字段
     *              否则无法被通道转发。在PIE下无法连接到App、Web端。
     *              如果游戏在后台收到消息，通道会将消息缓存并在游戏回到前台后一并发送。
     * @example
     * 使用示例:通道的注册、发送的使用示例
     * ```
     * // 注册action:ts.test.myaction，对包含action的消息，调用OnCall回调
     * mw.MessageChannelService.getInstance().registerAction("ts.test.myaction", this, OnCall);
     * // 发送message:"{\"action\":\"ts.test.myaction\",\"data\":{}}"到通道上，所有注册了该消息中action的端才可以收到该消息
     * mw.MessageChannelService.getInstance().send("{\"action\":\"ts.test.myaction\",\"data\":{}}");
     * // 指定一个目标端toWhom发送消息message，对方无需提前注册就可以收到该消息
     * mw.MessageChannelService.getInstance().sendTo(toWhom, message);
     * ```
     */
    const MessageChannelService: typeof mw.MessageChannelService;
    type MessageChannelService = mw.MessageChannelService;
    /**
     * @author huipeng.jia
     * @description 广告类型
     * @groups 服务/货币
     */
    const AdsType: typeof mw.AdsType;
    type AdsType = mw.AdsType;
    /**
     * @author huipeng.jia
     * @description 广告服务
     * @precautions 需先在开发者后台“游戏服务”中接入广告，才能正常播出。请注意，广告只能在真机上播放，开发环境无法播放。
     * @networkStatus usage: 客户端
     * @groups 服务/货币
     */
    const AdsService: typeof mw.AdsService;
    type AdsService = mw.AdsService;
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description 账户余额信息
     */
    type BalanceInfo = mw.BalanceInfo;
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description 发货回调
     */
    type ShipOrderResponse = mw.ShipOrderResponse;
    /**
     * @author mengyuan.hao
     * @description 收到MGS事件调用
     * @groups 数据处理
     */
    type ChatEvent = mw.ChatEvent;
    /**
     * @author mengyuan.hao
     * @description 发送消息的结果
     * @groups 基础类型
     */
    type BroadcastMessageResult = mw.BroadcastMessageResult;
    /**
     * @author huipeng.jia
     * @description 收到MGS事件调用
     * @groups 基础类型
     */
    type MGSEvent = mw.MGSEvent;
    /**
     * @author junwen.hua
     * @description 大会员消费钥匙订单。orderId：订单ID，boxId：宝箱ID，number：购买宝箱数量，shipTime：发货时间，毫秒级时间戳
     * @groups 服务/货币
     */
    type keyUsageInfo = mw.keyUsageInfo;
    /**
     * @author mengyuan.hao
     * @description status : 兑换状态。
     * @description 200 ： 兑换成功
     * @description 400 ： 兑换失败（兑换码不存在）
     * @description 423 ： 兑换失败（请求频繁）
     * @description 1002 ：兑换失败（兑换码不在使用期限内）
     * @description 1010 ：兑换失败（兑换码已使用）
     * @description 1011 ：兑换失败（兑换超时）
     * @description 1012 ：兑换失败（礼包库存不足）
     * @description 1013 ：兑换失败（超出兑换次数）
     * @description 1014 ：兑换失败（数据库失败）
     * @description 1015 ：兑换失败（非本游戏道具）
     * @description message : 兑换信息
     * @description 当兑换状态为成功时：兑换信息为礼包内容道具详情。
     * @description 当兑换状态为失败时：兑换信息为失败详情，例如：兑换码不存在。
     * @groups 服务/货币
     */
    type RedeemResponse = mw.RedeemResponse;
    /**
     * @author junwen.hua
     * @description 大会员钥匙扣除服务端接收发货通知的消息格式
     * @groups 服务/货币
     * @param player usage: 下单的玩家Player
     * @param orderId usage: 订单Id
     * @param boxId usage: 宝箱Id
     * @param amount usage: 数量
     * @param confirmOrder usage: 是否收到货的回调，会发给订单服务器。如果回调false，服务器会认定未收到货，下次玩家进入游戏，还会收到该通知
     */
    type OnKeyConsume = mw.OnKeyConsume;
    /**
     * @author huipeng.jia
     * @description 窗口刷新的消息格式
     * @groups 基础类型
     */
    type OnViewRefreshed = mw.OnViewRefreshed;
    /**
     * @author huipeng.jia
     * @description 客户端接收余额更新的消息格式
     * @groups 基础类型
     * @param amount usage: 新的余额
     */
    type OnArkBalanceUpdated = mw.OnArkBalanceUpdated;
    /**
     * @author huipeng.jia
     * @description 下载平台数据回调
     * @groups 基础类型
     */
    type downloadCharacterDataStringCallback = mw.downloadCharacterDataStringCallback;
    /**
     * @author huipeng.jia
     * @description 窗口显示模式切换的消息格式
     * @groups 基础类型
     * @param newState usage: 新的窗口模式。1 为“角色展示模式”，2 为“角色编辑模式”
     */
    type OnViewLayoutSwitched = mw.OnViewLayoutSwitched;
    /**
     * @author huipeng.jia
     * @description 下载角色形象的回调，无参数
     * @groups 基础类型
     */
    type DownloadDataResponse = mw.DownloadDataResponse;
    /**
     * @author huipeng.jia
     * @description 下载角色形象的回调消息格式
     * @groups 基础类型
     * @param success usage: 上传是否成功
     */
    type UploadDataResponse = mw.UploadDataResponse;
    /**
     * @author huipeng.jia
     * @description 返回bool的回调
     * @groups 基础类型
     */
    type BoolResponse = mw.BoolResponse;
    /**
     * @author huipeng.jia
     * @description 服务端接收发货通知的消息格式
     * @groups 基础类型
     * @param playerId usage: 下单的玩家playerId
     * @param orderId usage: 订单Id
     * @param commodityId usage: 商品Id
     * @param amount usage: 数量
     * @param confirmOrder usage: 是否收到货的回调，会发给订单服务器。如果回调false，服务器会认定未收到货，下次玩家进入游戏，还会收到该通知
     */
    type OnOrderDelivered = mw.OnOrderDelivered;
    /**
     * @author huipeng.jia
     * @description 返回无参数的回调
     * @groups 基础类型
     */
    type VoidResponse = mw.VoidResponse;
    /**
     * @author huipeng.jia
     * @description 组队跳游戏请求失败回调
     * @groups 基础类型
     */
    type TeamMatchFailureInfo = mw.TeamMatchFailureInfo;
    /**
     * @author huipeng.jia
     * @description 传送时可携带的数据类型
     * @groups 数据处理
     */
    type TeleportData = mw.TeleportData;
    /**
     * @author huipeng.jia
     * @description 返回string的回调
     * @groups 基础类型
     */
    type StringResponse = mw.StringResponse;
    /**
     * @author huipeng.jia
     * @description 传送时可额外提供的信息
     * @groups 数据处理
     */
    type TeleportOptions = mw.TeleportOptions;
    /**
     * @author huipeng.jia
     * @description 传送请求的结果
     * @groups 数据处理
     */
    type TeleportResult = mw.TeleportResult;
    /**
     * @author huipeng.jia
     * @description GameService的回调
     * @groups 基础类型
     */
    type MGSResponse = mw.MGSResponse;
    /**
     * @author huipeng.jia
     * @description 玩家所在的房间信息
     * @groups 数据处理
     */
    type RoomInfo = mw.RoomInfo;
    /**
     * @author huipeng.jia
     * @groups 基础类型
     * @description UGC模板信息
     */
    type UGCTemplateInfo = mw.UGCTemplateInfo;
    /**
     * @author huipeng.jia
     * @groups 基础类型
     * @description 发布成功的UGC消费态游戏信息
     */
    type PublishedUGCGameInfo = mw.PublishedUGCGameInfo;
    /**
     * @author huipeng.jia
     * @groups 基础类型
     * @description 本地工程信息。如果该工程发布过UGC消费态的游戏，那gameId不为空。
     */
    type LocalUGCGameInfo = mw.LocalUGCGameInfo;
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description 使用placeOrder接口下单时用于描述商品信息的类型
     */
    type CommodityInfo = mw.CommodityInfo;
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description 通过接口查询符合要求的商品列表时，会返回的对象类型。
     */
    type CommodityListObj = mw.CommodityListObj;
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description 充值信息
     */
    type RechargeInfo = mw.RechargeInfo;

}
export { }