/// <reference types="extension" />
declare namespace UGC {
    /**
     * @author jie.wu
     * @groups OTHERS
     * @description 查询留言板数据
     * @effect 只在客户端调用生效
     * @param Delegate usage:代理返回留言板json数据
     * @param UGCID usage:UGC唯一标识
     * @param PageNum usage:查询的页面数量
     * @param PageSize usage:查询的页面大小
     */
    function queryMessageBoard(Delegate: mw.MulticastDelegate<(Content: string) => void>, UGCID: string, PageNum: number, PageSize: number): void;
    /**
     * @author jie.wu
     * @groups OTHERS
     * @description 删除留言板数据
     * @effect 只在客户端调用生效
     * @param UGCID usage:UGC唯一标识
     * @param CommentID usage:需要删除的留言ID
     */
    function deleteMessage(UGCID: string, CommentID: string): void;
    /**
     * @author jie.wu
     * @groups OTHERS
     * @description 查询回复的数据
     * @effect 只在客户端调用生效
     * @param Delegate usage:返回http返回的json
     * @param UGCID usage:UGC唯一标识
     * @param CommentID usage:需要查询的会话ID
     * @param PageNum usage:需要查询的页面数量
     * @param PageSize usage:需要查询的页面大小
     */
    function queryReplyMessage(Delegate: mw.MulticastDelegate<(Content: string) => void>, UGCID: string, CommentID: string, PageNum: number, PageSize: number): void;
    /**
     * @author jie.wu
     * @groups OTHERS
     * @description 添加回复的消息
     * @effect 只在客户端调用生效
     * @param UGCID usage:UGC唯一标识
     * @param CommentID usage:需要回复的会话ID
     * @param Content usage:回复的内容
     */
    function addReplyMessage(UGCID: string, CommentID: string, Content: string): void;
    /**
     * @author jie.wu
     * @groups OTHERS
     * @description 添加留言
     * @effect 只在客户端调用生效
     * @param UGCID usage:UGC唯一标识
     * @param Content usage:留言的内容
     */
    function addMessage(UGCID: string, Content: string): void;
    /**
     * @author jie.wu
     * @groups OTHERS
     * @description 查询浏览的记录
     * @effect 只在客户端调用生效
     * @param Delegate usage:返回浏览记录的json
     * @param UGCID usage:UGC唯一标识
     * @param PageNum usage:查询的页面数量
     * @param PageSize usage:查询的页面大小
     */
    function queryViewRecord(Delegate: mw.MulticastDelegate<(Content: string) => void>, UGCID: string, PageNum: number, PageSize: number): void;
    /**
     * @author jie.wu
     * @groups OTHERS
     * @description 是否是自己发布的游戏
     * @effect 只在客户端调用生效
     * @param UGCID usage:UGC唯一标识
     * @returns 是否是自己发布的游戏
     */
    function queryGameOwnerShip(UGCID: string): Promise<boolean>;
    /**
     * @author jie.wu
     * @groups OTHERS
     * @description 保存留言
     * @effect 只在客户端调用生效
     * @param UGCID usage:UGC唯一标识
     */
    function saveViewRecord(UGCID: string): void;
    /**
     * @author jie.wu
     * @groups OTHERS
     * @description 点赞内容
     * @effect 只在客户端调用生效
     * @param UGCID usage: UGC唯一标识
     * @param contentId usage:内容ID
     * @param contentType usage:内容类型:1游戏;
2用户;
3樱校;
4ugc
     */
    function addLikeContent(UGCID: string, contentId: string, contentType: number): void;
    /**
     * @author jie.wu
     * @groups OTHERS
     * @description 取消点赞内容
     * @effect 只在客户端调用生效
     * @param UGCID usage: UGC唯一标识
     * @param contentId usage:内容ID
     * @param contentType usage:内容类型:1游戏;
2用户;
3樱校;
4ugc
     */
    function deleteLikeContent(UGCID: string, contentId: string, contentType: number): void;
}

/// <reference types="extension" />
/// <reference types="extension" />
declare namespace UGC {
    /**
     * @author            jie.wu
     * @description       画出包围盒
     * @effect            只在客户端调用生效
     * @param target        usage: 目标对象
     * @param calculateChildren        usage: 是否包含子物体
     * @param thickness        usage: 绘制线条粗细
     * @param color        usage: 绘制线条颜色
     */
    function drawBoundingBox(target: mw.GameObject | mw.GameObject[], calculateChildren?: boolean, thickness?: number, color?: mw.LinearColor): number;
    /**
     * @author            jie.wu
     * @description       更改绘制的box属性
     * @param target      usage: 目标对象
     * @param color       usage: 绘制的线框颜色更改
     * @effect            只在客户端调用生效
     */
    function changeDrawBoundingBoxColor(target: mw.GameObject | number, color: mw.LinearColor): void;
    /**
     * @author            jie.wu
     * @description       更改绘制的box属性
     * @param target      usage: 目标对象
     * @param thickness   usage: 绘制的线框直径
     * @effect            只在客户端调用生效
     */
    function changeDrawBoundingBoxThickness(target: mw.GameObject | number, thickness: number): void;
    /**
     * @author            jie.wu
     * @description       更改绘制的box属性
     * @param handle      usage: 目标对象
     * @param targets     usage: 多选绘制的对象更改
     * @effect            只在客户端调用生效
     */
    function changeDrawBoundingBoxTargets(handle: number, targets: mw.GameObject[]): void;
    /**
     * @author            jie.wu
     * @description       更改绘制的box属性
     * @param target       usage: 目标对象
     * @param withChildren usage: 是否绘制子节点
     * @effect            只在客户端调用生效
     */
    function changeDrawBoundingBoxWithChildren(target: mw.GameObject | number, withChildren: boolean): void;
    /**
     * @author            jie.wu
     * @description       清空物体包围盒
     * @param target        usage: 目标对象
     * @effect            只在客户端调用生效
     */
    function eraseBoundingBox(target: mw.GameObject | number): void;
}

/// <reference types="extension" />
/// <reference types="extension" />
declare namespace UGC {
    /**
* @author tangbin.zhang
* @description 移动编辑器上传预制体返回状态
* @groups 数据处理
*/
    enum UploadPrefabResultType {
        /**
        * 上传成功
        */
        Success = 0,
        /**
         * 上传因未知原因失败
         */
        Failure = 1,
        /**
         * 未找到id对应的预制体
         */
        PrefabNotFound = 2,
        /**
         * 非法名称
         */
        IllegalName = 3,
        /**
         * 图片未找到
         */
        ImageNotFound = 4,
        /**
         * 图片大小不匹配
         */
        ImageNotMatch = 5,
        /**
        * 预制体非法文件名
        */
        PrefabIllegalFileName = 6,
        /**
        * 服务器已经存在这个资源
        */
        ExistingAsset = 7
    }
    /**
    * @author tangbin.zhang
    * @description 资源审核状态
    * @groups 数据处理
    */
    enum ResourcesStatus {
        /**
        * 未知状态
        */
        None = 0,
        /**
         * 审核中
         */
        AuditIng = 1,
        /**
         * 审核未通过
         */
        AuditRefuse = 2,
        /**
        * 可使用
        */
        Available = 3
    }
    /**
    * @author boxin.liu
    * @description 上传资源类型
    * @groups 数据处理
    */
    enum ResourceType {
        Prefab = 0,
        SceneTexture = 1
    }
    /**
    * @author boxin.liu
    * @description 移动编辑器上传贴图返回状态
    * @groups 数据处理
    */
    enum UploadTextureResultType {
        /**
         * 上传成功
         */
        Success = 0,
        /**
         * 上传因未知原因失败
         */
        Failure = 1,
        /**
        * 服务器已经存在这个资源
        */
        ExistingAsset = 2,
        /**
         * 未找到
         */
        TextureNotFound = 10,
        /**
         * 大小不是2的N次幂
         */
        SizeNotPowerOfTwo = 11,
        /**
         * 大小超限
         */
        TextureOversized = 12,
        /**
         * 非法名称
         */
        IllegalName = 13,
        /**
        * 贴图非法文件名
        */
        TextureIllegalFileName = 14,
        /**
         * 缩略图未找到
         */
        ThumbnailNotFound = 20,
        /**
         * 缩略图大小超限
         */
        ThumbnailOversized = 21,
        /**
         * 文件格式不支持
         */
        UnsupportedFormat = 30
    }
    /**
     * @author jie.wu
     * @description UGC Editor使用的装饰器,避免数据被还原
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @param target usage: 目标
     */
    function UGCEditor(target: any): void;
    let ugcForeachScriptObject: (scriptObj: mw.Base) => void;
    /**
     * @author jie.wu
     * @groups SCRIPTING
     * @instance
     * @description 移动编辑器模式切换
     * @precautions 单例类，请使用instance获取对象
     * @networkStatus usage:客户端
     */
    class EditorMode {
        /**
         * @description 获取editorMode的单例
         * @effect 只在客户端调用生效
         * @returns 模式切换的单例
         */
        static getInstance(): EditorMode;
        /**
         * @description 代理通知状态改变
         */
        onMobileEditorStateChanged: mw.MulticastDelegate<(IsMobileEditor: boolean) => void>;
        getDefaultObject: any;
        /**
         * @description 保存当前场景
         * @effect 只在客户端调用生效
         */
        saveProject(): void;
        /**
         * @description 修改场景中的物体为静态/非静态
         * @effect 只在客户端调用生效
         * @param isStatic usage: true为静态，false为非静态 default:true
         * @param ignores usage: 设置忽略物体,物体guid数组 default:[]
         */
        changeLevelGameObjectToStatic(isStatic?: boolean, ignores?: Array<string>): void;
        /**
         * @description 获取初始化时候的状态
         * @effect 只在客户端调用生效
         * @returns 获取工程是否初始化时可以启动编辑器模式
         */
        get isPermanentMobileEditor(): boolean;
        /**
         * @description 设置需要使用的UGC Editor插件
         * @effect 只在客户端调用生效
         * @param PluginInfo usage: 插件信息
         * @returns 获取工程是否初始化时可以启动编辑器模式
         */
        /**
         * @description 获取当前移动编辑器模式
         * @effect 只在客户端调用生效
         * @returns 是否是编辑器模式
         */
        get isMobileEditor(): boolean;
        /**
         * @description 获取场景加载的时机，准备加载场景
         * @effect 只在客户端调用生效
         * @returns 加载场景的回调
         */
        onWorldBeginLoad(): mw.MulticastDelegate<() => void>;
        /**
         * @description 切换移动编辑器模式
         * @effect 只在客户端调用生效
         * @precautions  不能添加空枚举 如 export enum test {},会影响数据还原
         * @param bIsMobileEditor usage: true 则进 Editor Mode , false 进入 Play Mode
         */
        set isMobileEditor(bIsMobileEditor: boolean);
        resetUserJsProperty(script: mw.Script): void;
    }
}

/// <reference types="extension" />
declare namespace UGC {
    function switchEditorCharaterStat(type: UGC.CharacterStat): void;
    function saveNpcData(character: mw.Character): void;
    function loadNpcData(character: mw.Character): void;
}

/// <reference types="extension" />
declare namespace UGC {
    /**
     * @author jie.wu
     * @description 获取点击事件的代理
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @returns 返回的代理
     */
    function getTapGestureDelegate(): mw.MulticastDelegate<(SelectType: MobileEditor_MobileEditorType.SelectTapType, location: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取单指滑动的代理
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @returns 返回单指滑动的代理
     */
    function getOneFingerMoveGestureDelegate(): mw.MulticastDelegate<(location: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取双指滑动的代理
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @returns 返回双指滑动的代理
     */
    function getTwoFingerMoveGestureDelegate(): mw.MulticastDelegate<(location: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取挤压手势的代理
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @returns  返回挤压手势的代理
     */
    function getPinchGestureDelegate(): mw.MulticastDelegate<(Distance: number) => void>;
    /**
     * @author jie.wu
     * @description 获取手指按下代理
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @returns 返回手指按下时的代理
     */
    function getTouchBeganGestureDelegate(): mw.MulticastDelegate<(FingerIndex: number, Position: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取手指滑动代理
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @returns  返回手指滑动的代理
     */
    function getTouchMoveGestureDelegate(): mw.MulticastDelegate<(FingerIndex: number, Position: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取手指抬起代理
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @returns  返回抬起手指时候的代理
     */
    function getTouchEndGestureDelegate(): mw.MulticastDelegate<(FingerIndex: number) => void>;
    /**
     * @author jie.wu
     * @description tap点击的时间间隔- 如果在这个时间以内算tap，大于这个时间则是move
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @param time usage: tap限定的时间
     */
    function setTapTime(time: number): void;
    /**
     * @author jie.wu
     * @description 单指移动的时间- 必须大于这个时间才会开始执行单指移动
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @param time usage: 单指移动的限定时间
     */
    function setSingleSwipeTime(time: number): void;
    /**
     * @author jie.wu
     * @description 挤压手势的偏差角度
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @param time usage: 偏差角度
     */
    function setPinchAngleTolerance(time: number): void;
    /**
     * @author jie.wu
     * @description 双指移动的时间- 必须大于这个时间才执行双指移动事件
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @param time usage: 双指移动限定的时间
     */
    function setMultiSwipeTime(time: number): void;
    /**
     * @author jie.wu
     * @description 双指移动的偏差量- 值越大误差则可以越大
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @param time usage: 偏差值
     */
    function setSwipeTolerance(time: number): void;
}

/// <reference types="extension" />
/// <reference types="extension" />
/// <reference types="extension" />
/// <reference types="extension" />
declare namespace UGC {
    /**
     * @author jie.wu
     * @description 包围盒显示枚举
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @param target usage:标记的对象
     */
    enum EShowBoxFlag {
        Default = 0,
        AllShow = 1,
        AllNoShow = 2
    }
    /**
     * @author jie.wu
     * @description 标记Actor所有组件的渲染状态为脏
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @param target usage:标记的对象
     */
    function markActorRenderStateDirty(target: mw.Base): void;
    /**
     * @author jie.wu
     * @description 当任意需要序列化的属性改变时需要把当前actor标记为脏以保存时能收集到数据
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @param target usage:标记的对象
     */
    function markActorDirty(target: mw.Base): void;
    /**
     * @author jie.wu
     * @description 计算actor的等比缩放
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @param currentScale usage:当前缩放值
     * @param deltaScale usage:缩放值增量
     * @returns 计算后的缩放值
     */
    function calculateActorEqualScale(currentScale: mw.Vector, deltaScale: mw.Vector): mw.Vector;
    /**
     * @author hao.wu
     * @groups SCRIPTING
     * @description 获取资源列表
     * @effect 只在客户端调用生效
     * @param classification usage:分类id
     * @param lastID usage:查询偏移量
     * @param pageSize usage:每页查询大小
     * @returns 请求结果(Json字符串)
     */
    function asyncGetResourceList(classification: number, lastID: number, pageSize: number): Promise<string>;
    /**
     * @author hao.wu
     * @groups SCRIPTING
     * @description 获取优质作品列表
     * @effect 只在客户端调用生效
     * @param resourceId usage:T台Id
     * @param pageIndex usage:分页索引
     * @returns 请求结果(Json字符串)
     */
    function asyncGetQualityGameList(resourceId: number, pageIndex: number): Promise<string>;
    /**
     * @author hao.wu
     * @groups SCRIPTING
     * @description 通过指定的消费态游戏ID和版本号获取已发布的游戏数据
     * @effect 只在客户端调用生效
     * @param gameId usage:消费态游戏Id
     * @param version usage:消费态游戏版本号 default:" "
     * @param bDownload usage:是否下载 default:false
     * @returns 请求结果(结构体对象：{游戏名称：gameName, 游戏封面路径：gameCover})
     */
    function asyncGetReleaseGameData(gameId: string, version?: string, bDownload?: boolean): Promise<MobileEditor_Type.ReleaseGameData>;
    /**
     * @author baolin.li
     * @description 根据指定的消费态游戏ID获取游戏名称和游戏发布者昵称
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     * @param gameId usage:消费态游戏Id
     * @returns 请求结果(结构体对象：{游戏名称：gameName, 游戏发布者昵称：publisherName})
     */
    function asyncGetGameInfo(gameId: string): Promise<MobileEditor_Type.UGCGameInfo>;
    /**
     * @author jie.wu
     * @description 保存当前游戏项目
     * @groups SCRIPTING
     * @effect 调用端生效
     * @precautions 只在ListenServer模式下调用生效，在PIE模式下无法调用
     */
    function saveProject(): Promise<void>;
    /**
     * @author jie.wu
     * @description 设置游戏退出延迟,设置为true的话，233退出会卡住，等待设置完成为false后才会退出
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在233平台调用，可以控制做233杀进程
     */
    function setWaitForTSGameExit(bWaitExistOrKill: boolean): void;
    /**
     * @author jie.wu
     * @description 设置游戏退出延迟是否读取配置文件，可远端配置强杀时间
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在233平台调用，可以控制做233杀进程
     */
    function setDelayExitTimeoutEnable(bEnabled: boolean): void;
    /**
     * @author jie.wu
     * @description 保存当前游戏项目
     * @groups SCRIPTING
     * @effect 调用端生效
     * @precautions 只在ListenServer模式下调用生效，在PIE模式下无法调用
     * @returns 保存成功或失败
     */
    function asyncSaveProject(): Promise<boolean>;
    /**
     * @author jie.wu
     * @description 移动端编辑器发布游戏
     * @groups SCRIPTING
     * @effect 调用端生效
     * @precautions 只在ListenServer模式下调用生效，在PIE模式下无法调用,发布游戏会自动保存一次工程
     * @param InGameName usage:游戏名称
     * @param InExtraData usage:游戏扩展数据 default:""
     * @returns 保存成功或失败
     */
    function mobileReleaseGame(InGameName: string, InExtraData?: string): Promise<MobileEditor_Type.ReleaseStatus>;
    /**
     * @author shuhan.liu
     * @groups SCRIPTING
     * @description 清除项目中没有引用的本地材质资源
     * @param IgnoreMatGuids usage:清除时即使未使用也不清除的材质资源Guid default:[]
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     */
    function clearUselessLocalMaterials(IgnoreMatGuids?: Array<string>): void;
    /**
     * @author shuhan.liu
     * @groups SCRIPTING
     * @description 获取创建的本地材质数量
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     * @returns 本地材质数量
     */
    function getLocalMaterialsCount(): number;
    /**
  * @author boxin.liu
  * @description 移动编辑器上传资源信息
  * @groups DATATYPE
  * @param id usage: id
  * @param guid usage: 资源id入库前为空
  * @param uuid usage: 入库前的唯一标识
  * @param ResourcesStatus usage: 资源状态
  * @param ResourcesType usage:资源类型
  */
    type MyAllResourcesResultInfo = {
        id: number;
        guid: string;
        uuid: string;
        ResourcesStatus: MobileEditor_EditorMode.ResourcesStatus;
        ResourcesType: MobileEditor_EditorMode.ResourceType;
    };
    /**
     * @author boxin.liu
     * @description 移动编辑器获取上传的所有资源信息
     * @groups DATATYPE
     * @param lastId usage: 尾部Id
     * @param AllMyResourcesInfos usage: 移动编辑器上传资源信息
     */
    type MyAllResourcesResult = {
        lastId: number;
        AllMyResourcesInfos: Array<MyAllResourcesResultInfo>;
    };
    /**
     * @author boxin.liu
     * @groups SCRIPTING
     * @description 移动编辑器获取用户上传的所有资源和状态
     * @effect 调用端生效；内部使用
     * @precautions 只在MobileEditor模式下调用生效；异步请求；滚动分页接口请求
     * @param lastId usage:尾部Id
     * @param size usage:每页数量
     * @returns {Promise<MyAllResourcesResult>} 移动编辑器获取自己上传的所有资源信息
     * @example
     * 使用示例:调用方法 新建一个脚本 NewScript
     * ```
     * @Component
     * export default class NewScript extends Script {
     *   //当脚本被实例后，会在第一帧更新前调用此函数
     *   protected onStart(): void {
     *     //获取当前用户上传的所有的资源
     *     MobileEditor.getAllMyResources(0,20).then(item =>{
     *       for (let Index: number = 0;
 Index < item.AllMyResourcesInfos.length;
 ++Index) {
     *         console.log(item.AllMyResourcesInfos[Index].guid);
     *       }
     *     });
     *   }
     * }
     * ```
     */
    function getAllMyResources(lastId: number, size: number): Promise<MyAllResourcesResult>;
    /**
    * @author tangbin.zhang
    * @description 移动编辑器上传预制体返回结果
    * @groups DATATYPE
    * @param uploadPrefabResultType usage: 移动编辑器上传预制体返回状态
    * @param assetId usage: 资源标识
    */
    type UploadPrefabResult = {
        uploadPrefabResultType: UGC.UploadPrefabResultType;
        assetId: string;
    };
    /**
     * @author tangbin.zhang
     * @groups SCRIPTING
     * @description 移动编辑器上传预制体
     * @effect 调用端生效；内部使用
     * @precautions 只在MobileEditor模式下调用生效；异步请求
     * @param assetId usage:预制体资源Id
     * @param name usage:名字
     * @param imagePath usage:512*512的透明png缩略图
     * @returns {Promise<UploadPrefabResult>} 移动编辑器上传预制体返回结果
     * @example
     * 使用示例:调用方法 新建一个脚本 NewScript
     * ```
     * @Core.Class
     * export default class NewScript extends Core.Script {
     *   //当脚本被实例后，会在第一帧更新前调用此函数
     *   protected onStart(): void {
     *     //把guid='23C1ED241027B9E0'的预制体上传到服务器上，预制体的名字=我的预制体，缩略图=C:/icon.png
     *     MobileEditor.uploadPrefab('23C1ED241027B9E0','我的预制体','C:/icon.png').then(item =>{
     *        console.log(item.AssetId)
     *     });
     *   }
     * }
     * ```
     */
    function uploadPrefab(assetId: string, name: string, imagePath: string): Promise<UploadPrefabResult>;
    /**
     * @author yongfei.zheng
     * @description 刷新本地资源表
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
     */
    function refreshAssetCacheTable(): Promise<boolean>;
    /**
     * @author yongfei.zheng
     * @description 解除预制体，必须为UGC专用Prefab
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
    */
    function UnInstantiatePrefab(obj: mw.GameObject): boolean;
    /**
     * @author yongfei.zheng
     * @description 是否为UGC专用Prefab
     * @groups SCRIPTING
     * @effect 只在客户端调用生效
    */
    function IsUGCPrefab(prefabAssetId: string): boolean;
    /**
     * @author tangbin.zhang
     * @description 移动编辑器上传预制体资源信息
     * @groups DATATYPE
     * @param id usage: id
     * @param guid usage: 资源id入库前为空
     * @param uuid usage: 入库前的唯一标识
     * @param prefabStatus usage: 资源状态
     */
    type MyPrefabsResultInfo = {
        id: number;
        guid: string;
        uuid: string;
        prefabStatus: UGC.PrefabStatus;
    };
    /**
     * @author tangbin.zhang
     * @description 移动编辑器获取自己上传的所有预制体资源信息
     * @groups DATATYPE
     * @param lastId usage: 尾部Id
     * @param prefabInfos usage: 移动编辑器上传预制体资源信息
     */
    type MyPrefabsResult = {
        lastId: number;
        prefabInfos: Array<MyPrefabsResultInfo>;
    };
    /**
     * @author tangbin.zhang
     * @description 移动编辑器推送shipping下的日志
     * @groups DATATYPE
     * @param logLevel usage: 日志等级
     * @param log usage: 日志内容
     */
    function pushShippingLog(logLevel: MobileEditor_Type.LogLevel, log: string): void;
    /**
     * @author tangbin.zhang
     * @description 移动编辑器推送shipping下的日志
     * @groups DATATYPE
     * @param uploadCurrentLog usage: true 上传当前的log false 上传备份log
     */
    function uploadShippingLog(uploadCurrentLog: boolean): Promise<string>;
    /**
     * @author hao.wu
     * @groups SCRIPTING
     * @description 通过URL设置图片控件图片
     * @effect  只在客户端调用生效,下载图片需要时间，失败时暂无回调
     * @param image usage:图片控件
     * @param url usage:图片链接
     */
    function setImageImageByURL(image: mw.Image, url: string): void;
    /**
     * @author hao.wu
     * @groups SCRIPTING
     * @description 通过URL设置按钮控件普通图片
     * @effect  只在客户端调用生效,下载图片需要时间，失败时暂无回调
     * @param button usage:按钮控件
     * @param url usage:图片链接
     */
    function setButtonNormalImageByURL(button: mw.Button, url: string): void;
    /**
     * @author hao.wu
     * @groups SCRIPTING
     * @description 通过URL设置按钮控件按下图片
     * @effect  只在客户端调用生效,下载图片需要时间，失败时暂无回调
     * @param button usage:按钮控件
     * @param url usage:图片链接
     */
    function setButtonPressedImageByURL(button: mw.Button, url: string): void;
    /**
     * @author hao.wu
     * @groups SCRIPTING
     * @description 通过URL设置按钮控件不可以图片
     * @effect  只在客户端调用生效,下载图片需要时间，失败时暂无回调
     * @param button usage:按钮控件
     * @param url usage:图片链接
     */
    function setButtonDisableImageByURL(button: mw.Button, url: string): void;
    /**
     * @author huipeng.jia
     * @groups SCRIPTING
     * @description 蓝军自定义启动参数，每个游戏可以是不一样的，推荐使用一个JSON字符串
     * @effect 只在客户端调用生效
     * @returns {string} 自定义启动参数的字符串形式
     */
    function getGameTransmissionData(): string;
    /**
     * @author jie.wu
     * @groups SCRIPTING
     * @description 标记game object的属性发生了变化,后续的worldstat以及保存会对这个对象做序列化的处理
     * @effect 只在客户端调用生效
     * @param obj usage:对象
     * @param bDirty usage:是否为脏
     */
    function setGameObjectDirty(obj: mw.GameObject, bDirty: boolean): void;
    /**
     * @author jie.wu
     * @groups SCRIPTING
     * @description 标记game object的是否需要保存到level文件中
     * @effect 只在客户端调用生效
     * @param obj usage:对象
     * @param bDirty usage:是否需要保存
     */
    function setGameObjectSerializable(obj: mw.GameObject, bNeedSave: boolean): void;
    /**
     * @author jie.wu
     * @groups SCRIPTING
     * @description 是否显示引擎自带的显示框例如 triggerbox 的显示盒
     * @effect 只在客户端调用生效
     * @param obj usage:对象
     * @param bShow usage:是否显示
     */
    function showEngineVisibleBox(obj: mw.GameObject, bShow: boolean): void;
    /**
     * @author jie.wu
     * @groups SCRIPTING
     * @description 添加不参与计算boundingbox的对象
     * @effect 只在客户端调用生效
     * @param gizmo usage:gizmo对象
     * @param obj usage:需要被忽略的对象
     */
    function addUnBBCalculationActor(gizmo: mw.Gizmo, obj: mw.GameObject): void;
    /**
     * @author jie.wu
     * @groups SCRIPTING
     * @description 移除不参与计算boundingbox的对象
     * @effect 只在客户端调用生效
     * @param gizmo usage:gizmo对象
     * @param obj usage:需要被移除忽略的对象
     */
    function removeUnBBCalculationActor(gizmo: mw.Gizmo, obj: mw.GameObject): void;
    /**
     * @author jie.wu
     * @groups SCRIPTING
     * @description 是否全部显示引擎自带的显示框例如 triggerbox 的显示盒
     * @effect 只在客户端调用生效
     * @param obj usage:对象
     * @param bShow usage:是否显示
     */
    function showGlobalEngineVisibleBox(ShowFlag: EShowBoxFlag): void;
    /**
     * @author jie.wu
     * @groups SCRIPTING
     * @description 当前物体时Prefab中的节点，获取Prefab资源ID
     * @effect 只在客调用端生效
     * @param  obj:usage: Prefab中的节点 default
     * @returns {string} prefab的资源gUID
     */
    function getPrefabAssetId(obj: mw.GameObject): string;
    /**
     * @author jie.wu
     * @groups SCRIPTING
     * @description 保存预制体
     * @effect 只在客调用端生效
     * @param  root:usage: 以此为根节点，保存预制体
     * @returns {string} 返回生成预制体的资源ID
     */
    function savePrefab(root: mw.GameObject): string;
    /**
     * @author xiangkun.sun
     * @groups SCRIPTING
     * @description 保存配置
     * @effect 只在客户端调用生效
     * @param fileName usage:存储的文件名
     * @param content usage:保存的内容
     * @return 返回保存的状态
     */
    function asyncSave(fileName: string, content: string): Promise<MobileEditor_Type.SaveFileResult>;
    /**
     * @description 存档信息
     */
    interface UGCArchiveInfo {
        /** 存档槽位 */
        slot: number;
        /** 存档名称 */
        name: string;
        /** 存档时间戳 */
        timestamp: bigint;
        /** 自定义信息 */
        customData: string;
    }
    /**
     * @description 读档结果类型
     */
    enum EUGCApplyArchiveResultType {
        Default = 0,
        Success = 1,
        RequestDownLoadInfoFailed = 2,
        DownloadFailed = 3,
        DecompressionFailed = 4,
        ReplaceFailed = 5
    }
    /**
     * @description 存档结果类型
     */
    enum EUGCCreateArchiveResultType {
        Default = 0,
        Success = 1,
        ProjectPathIncorrect = 2,
        ConfigNotExist = 3,
        CompressionFailed = 4,
        GenerateUploadFileFailed = 5,
        InvalidToken = 401,
        ServerError = 500,
        ServerDataDeserializeFailed = 501,
        RepeatedUpload = 800,
        ArchiveSlotExceeded = 801,
        ArchiveProjectNumExceeded = 802,
        UploadedFileEmpty = 803,
        Sha1Inconsistent = 804,
        IsSavingOrCompressing = 805,
        SlotError = 806,
        InconsistentFileid = 901
    }
    /**
     * @author shuhan.liu
     * @description 移动端编辑器获取云存档信息
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     * @returns 存档信息
     */
    function asyncUGCGetArchiveInfo_Cloud(): Promise<Array<UGCArchiveInfo>>;
    /**
     * @author shuhan.liu
     * @description 移动端编辑器获取本地上传失败存档信息
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     * @returns 存档信息
     */
    function asyncUGCGetArchiveInfo_Local(): Promise<Array<UGCArchiveInfo>>;
    /**
     * @author shuhan.liu
    * @description 移动端编辑器创建并上传存档
    * @groups 基础类型
    * @effect 调用端生效
    * @precautions 只在MobileEditor模式下调用生效
    * @param slot 存档槽位,0、1槽位已占用，只能使用 >=2 槽位
    * @param name 存档名称
    * @param customData 自定义数据
    * @returns 是否上传存档成功
    */
    function asyncUGCCreateAndUploadArchive(slot: number, name: string, customData: string): Promise<EUGCCreateArchiveResultType>;
    /**
     * @author shuhan.liu
     * @description 移动端编辑器上传存档，只针对本地上传失败的存档再次上传使用
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     * @param slot 存档槽位
     * @param timestamp 时间戳
     * @returns 是否上传存档成功
     */
    function asyncUGCUploadArchive(slot: number, timestamp: bigint): Promise<EUGCCreateArchiveResultType>;
    /**
     * @author shuhan.liu
     * @description 移动端编辑器清除本地所有上传失败存档信息
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     */
    function clearUGCLocalArchiveAll(): void;
    /**
     * @author shuhan.liu
     * @description 移动端编辑器清除本地指定上传失败存档信息
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     * @param slot 存档槽位
     * @param timestamp 时间戳
     * @returns 是否清除存档成功
     */
    function clearUGCLocalArchive(slot: number, timestamp: bigint): boolean;
    /**
     * @author shuhan.liu
     * @description 移动端编辑器读档
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     * @param slot 要读档槽位
     */
    function UGCApplyArchive(slot: number): void;
    /**
     * @author shuhan.liu
     * @description 移动端编辑器公共存档读档
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     * @param archiveId 公共存档id
     */
    function UGCApplyArchive_Common(archiveId: number): void;
    /**
     * @author shuhan.liu
     * @description 移动端编辑器读档结果
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     * @returns 读档结果
     */
    function getUGCApplyArchiveResult(): EUGCApplyArchiveResultType;
    /**
     * @author shuhan.liu
     * @description 移动端编辑器获取当前工程是否支持存档
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     * @param slot 要读档的槽位
     * @returns 否支持存档
     */
    function asyncGetProjectArchiveFlag(): Promise<boolean>;
    /**
     * @author jie.wu
     * @description 设置消费态游戏人数
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     * @param maxNumber 设置的人数
     */
    function setMaxPlayerNumber(maxNumber: number): void;
    /**
     * @author xiangkun.sun
     * @description 获取所有的一级节点对象
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在MobileEditor模式下调用生效
     * @returns 所有的一级节点对象
     */
    function getRootGameObjects(): Array<mw.GameObject>;
    /**
    * @author baolin.li
    * @description 保存UI到本地,生成.UI和.meta文件
    * @groups 界面
    * @effect 只在客户端调用生效
    * @returns 返回传入UI生成的AssertData的Guid
    * @param Widget usage：需要保存的userWidget对象
    * @param path usage：需要保存到本地文件夹的当前工程目录的相对路径
    * @param name usage：文件名
    */
    function saveUIFile(Widget: mw.UserWidget, path: string, name: string): string;
    /**
    * @description   框选对象
    * @param selectionStartPoint 框选开始的点，屏幕坐标系中的一个点
    * @param selectionEndPoint 框选结束的点，屏幕坐标系中的一个点
    * @return Array<GameObject>
    */
    function batchSelectObjects(selectionStartPoint: mw.Vector2, selectionEndPoint: mw.Vector2): Array<mw.GameObject>;
    /**
     * @author hexuan.zhang
     * @description 设置是否将以该节点为根节点场景树自动生成为一个资源文件，生成后在运行时通过 asyncSpawn 接口直接创建，或者加载资源后同步 spawn。
     * @groups 基础类型
     * @effect 调用端生效
     * @precautions 只在编辑模式下调用生效，标记的的源物体不要删除，否则会导致生成的 Asset 异常。
     * @param gameObjectId 根节点的 gameObjectId
     * @param bGenerateAsset 是否生成 Asset。标记过 true 的，在标记 false 或者源物体被删除后会删除资源。
     * @returns
     */
    function setAutoCreateRuntimeAsset(gameObjectId: string, bGenerateAsset: boolean): string;
    /**
     * @author zheng.zeng
     * @groups SCRIPTING
     * @description 获取路径
     * @effect 只在客户端调用生效
     * @return 返回当前UGC项目的路径
     */
    function getCurrentProjectPath(): string;
}

declare namespace UGC {
    /**
     * @author jie.wu
    * @description UGC 选中的单选或者多选
    * @groups SCRIPTING
    */
    enum SelectTapType {
        /** 未选中 */
        None = 0,
        /** 单选 */
        Single = 1,
        /** 多选 */
        Multi = 2
    }
    /**
     * @description gizmo模式
     * @author jie.wu
     * @groups SCRIPTING
     */
    enum GizmoModeType {
        /** 位置 */
        Location = 0,
        /** 旋转 */
        Rotation = 1,
        /** 大小 */
        Scale = 2
    }
    /**
     * @description gizmo空间
     * @author hao.wu
     * @groups SCRIPTING
     */
    enum GizmoSpaceType {
        /** 世界 */
        World = 0,
        /** 本地 */
        Local = 1
    }
    /**
     * @author jie.wu
     * @groups SCRIPTING
     * @description gizmo坐标轴类型
     */
    enum GizmoCoordinateType {
        /** 移动坐标轴的X轴 box */
        TransformX = 0,
        /** 移动坐标轴的Y轴 box */
        TransformY = 1,
        /** 移动坐标轴的Z轴 box */
        TransformZ = 2,
        /** 旋转坐标轴的X轴 */
        RotatorX = 3,
        /** 旋转坐标轴的Y轴 */
        RotatorY = 4,
        /** 旋转坐标轴的Z轴 */
        RotatorZ = 5,
        /** 缩放坐标轴的X轴 */
        ScaleX = 6,
        /** 缩放坐标轴的Y轴 */
        ScaleY = 7,
        /** 缩放坐标轴的Z轴 */
        ScaleZ = 8,
        /** 缩放坐标轴的整体轴 */
        ScaleAll = 9,
        /** 平移坐标轴的XY轴平面 */
        TransformXY = 10,
        /** 平移坐标轴的XZ轴平面 */
        TransformXZ = 11,
        /** 平移坐标轴的YZ轴平面 */
        TransformYZ = 12,
        /** 当前未选中任何轴 */
        None = 13
    }
    /**
    * @author jie.wu
    * @description UGC 发布的状态
    * @groups SCRIPTING
    */
    enum ReleaseStatus {
        /** 发布失败 */
        Failed = 0,
        /** 发布成功 */
        Success = 1,
        /** 由于保存数据问题导致的发布失败 */
        SaveError = 2
    }
    /**
     * @author hao.wu
     * @description  已发布的游戏数据，用于继承服务器数据。
     * @groups DATATYPE
     */
    type ReleaseGameData = {
        /** 已发布的游戏名称 */
        gameName: string;
        /** 已发布的游戏封面路径（存放于'项目目录/Pictures'下） */
        gameCover: string;
    };
    /**
     * @author baolin.li
     * @description  已发布的游戏名称与发布者昵称数据，内部使用
     * @groups DATATYPE
     */
    type UGCGameInfo = {
        /** 已发布的游戏名称 */
        gameName: string;
        /** 已发布的游戏发布者的名称 */
        publisherName: string;
    };
    /**
 * @author tangbin.zhang
 * @description 移动编辑器上传预制体返回状态
 * @groups DATATYPE
 */
    enum UploadPrefabResultType {
        /**
        * 上传成功
        */
        Success = 0,
        /**
         * 上传因未知原因失败
         */
        Failure = 1,
        /**
         * 未找到id对应的预制体
         */
        PrefabNotFound = 2,
        /**
         * 非法名称
         */
        IllegalName = 3,
        /**
         * 图片未找到
         */
        ImageNotFound = 4,
        /**
         * 图片大小不匹配
         */
        ImageNotMatch = 5,
        /**
        * 预制体非法文件名
        */
        PrefabIllegalFileName = 6,
        /**
        * 服务器已经存在这个资源
        */
        ExistingAsset = 7
    }
    /**
    * @author tangbin.zhang
    * @description 预制体审核状态
    * @groups DATATYPE
    */
    enum PrefabStatus {
        /**
        * 未知状态
        */
        None = 0,
        /**
         * 校验中
         */
        Verify = 1,
        /**
         * 审核中
         */
        AuditIn = 2,
        /**
         * 资源描述信息审核中
         */
        DescribeAuditIn = 3,
        /**
         * 审核未通过
         */
        AuditRefuse = 4,
        /**
         * 资源描述信息审核拒绝
         */
        DescribeAuditRefuse = 5,
        /**
         * 打包中
         */
        Packing = 6,
        /**
         * 资源打包失败
         */
        PackFail = 7,
        /**
        * 可使用
        */
        Available = 8
    }
    /**
     * @author xiangkun.sun
     * @description 日志等级
     * @groups TYPE
     */
    enum LogLevel {
        /** 普通 */
        Log = 0,
        /** 警告 */
        Warning = 1,
        /** 错误 */
        Error = 2
    }
    /**
     * @author xiangkun.sun
     * @description 编辑器人物类型
     * @groups TYPE
     */
    enum CharacterStat {
        /** 上帝视角 */
        Spector = 0,
        /** 飞行 */
        Flying = 1,
        /** 普通 */
        Normal = 2
    }
    /**
     * @author xiangkun.sun
     * @description 编辑器人物类型
     * @groups TYPE
     */
    enum SaveFileResult {
        /** 成功 */
        Success = 0,
        /** 名字不符合规范 */
        NameIncludeIllegalText = 1,
        /** 超出10MB限制 */
        OutOfSizeLimit = 2
    }
}

/// <reference types="extension" />
declare namespace UGC {
    enum previewStateType {
        /** 开启预览 */
        Play = 0,
        /** 暂停预览 */
        Pause = 1,
        /** 停止预览 */
        Stop = 2
    }
    /**
     * @author hao.huang
     * @description 编辑态对象预览
     * @effect 调用端生效
     * @param gameObject usage: 需要执行功能预览的对象
     * @param previewState usage:预览状态枚举
     */
    function functionPreview(gameObject: mw.IntegratedMover, previewState: previewStateType): void;
}

/// <reference types="extension" />
/// <reference types="extension" />
declare namespace UGC {
    /**
     * @author jie.wu
     * @description      屏幕指定区域截图
     * @groups           基础类型
     * @effect           只在客户端调用生效
     * @param Resolution usage:分辨率
     * @param StartPoint usage:截图区域的左上角起始点(屏幕左上角即为(0,0)点)
     * @param Width      usage:截图区域的宽度
     * @param Height     usage:截图区域的高度
     * @param callback   usage: 获取本地截图路径 default:null
     * @param bShowUI    usage:是否包含UI
     * @param fileName   usage:自定义截图的文件名，默认为Game_Thumbnail
     */
    function screenShot(Resolution: mw.Vector2, StartPoint: mw.Vector2, Width: number, Height: number, callback: (dataString: string) => void, bShowUI?: boolean, fileName?: string): void;
    /**
     * @author jie.wu
     * @description            同步对指定虚拟角色进行截取，截图保存在本地固定路径下
     * @groups 基础类型
     * @effect                 只在客户端调用生效
     * @param character        usage: 指定截取GIF的Character
     * @param relativeLocation usage: 镜头相对位置 ScreenShot()中默认为Vector(35, 0, 50)
     * @param relativeRotation usage: 镜头相对旋转 ScreenShot()中默认为Rotation(0, 180, 0);
     * @param resolution       usage: 截图尺寸
     * @param bShowOnly        usage: true时只截取角色，背景Alpha值置为0
     * @param fov              usage: 视场;
     * @param fileName         usage: 文件名
     * @param callback         usage: 获取本地截图路径 default:null
     */
    function captureAvatar(character: mw.Character, relativeLocation: mw.Vector, relativeRotation: mw.Rotation, resolution: mw.Vector2, bShowOnly: boolean, fov: number, fileName: string, callback: (dataString: string) => void): void;
    /**
     * @author jie.wu
     * @description            异步对指定虚拟角色进行截取，截图保存在本地固定路径下
     * @groups 基础类型
     * @effect                 只在客户端调用生效
     * @param character        usage: 指定截取GIF的Character
     * @param relativeLocation usage: 镜头相对位置 ScreenShot()中默认为Vector(35, 0, 50)
     * @param relativeRotation usage: 镜头相对旋转 ScreenShot()中默认为Rotation(0, 180, 0);
     * @param resolution       usage: 截图尺寸
     * @param bShowOnly        usage: true时只截取角色，背景Alpha值置为0
     * @param fov              usage: 视场;
     * @param fileName         usage: 文件名
     * @return 生成的截图的本地绝对路径
     */
    function asyncCaptureAvatar(character: mw.Character, relativeLocation: mw.Vector, relativeRotation: mw.Rotation, resolution: mw.Vector2, bShowOnly: boolean, fov: number, fileName: string): Promise<string>;
    /**
     * @author jie.wu
     * @description            模拟MSAA对指定虚拟角色截取图像，截图保存在本地固定路径下
     * @groups 基础类型
     * @effect                 只在客户端调用生效
     * @precautions            后处理(曝光，色调映射等)对抗锯齿截图效果影响较大
     * @param character        usage: 指定截取GIF的Character
     * @param relativeLocation usage: 镜头相对位置 ScreenShot()中默认为Vector(35, 0, 50)
     * @param relativeRotation usage: 镜头相对旋转 ScreenShot()中默认为Rotation(0, 180, 0);
     * @param resolution       usage: 截图尺寸
     * @param SampleCount      usage: MSAA采样, 推荐设置为4(移动)或8(桌面)
     * @param bShowOnly        usage: true时只截取角色，背景Alpha值置为0
     * @param fov              usage: 视场;
     * @param fileName         usage: 文件名
     * @param callback         usage: 获取本地截图路径 default:null
     */
    function captureAvatarMSAA(character: mw.Character, relativeLocation: mw.Vector, relativeRotation: mw.Rotation, resolution: mw.Vector2, SampleCount: number, bShowOnly: boolean, fov: number, fileName: string, callback: (dataString: string) => void): void;
    /**
     * @author jie.wu
     * @description            异步对指定虚拟角色进行截取(开启MSAA)，截图保存在本地固定路径下
     * @groups 基础类型
     * @effect                 只在客户端调用生效
     * @param character        usage: 指定截取GIF的Character
     * @param relativeLocation usage: 镜头相对位置 ScreenShot()中默认为Vector(35, 0, 50)
     * @param relativeRotation usage: 镜头相对旋转 ScreenShot()中默认为Rotation(0, 180, 0);
     * @param resolution       usage: 截图尺寸
     * @param SampleCount      usage: MSAA采样, 推荐设置为4(移动)或8(桌面)
     * @param bShowOnly        usage: true时只截取角色，背景Alpha值置为0
     * @param fov              usage: 视场;
     * @param fileName         usage: 文件名
     * @return 生成的截图的本地绝对路径
     */
    function asyncCaptureAvatarMSAA(character: mw.Character, relativeLocation: mw.Vector, relativeRotation: mw.Rotation, resolution: mw.Vector2, SampleCount: number, bShowOnly: boolean, fov: number, fileName: string): Promise<string>;
    /**
     * @author jie.wu
     * @description            对指定虚拟角色进行截取后上传到服务器
     * @groups                 基础类型
     * @effect                 只在客户端调用生效
     * @param character        usage: 指定截取GIF的Character
     * @param relativeLocation usage: 镜头相对位置
     * @param relativeRotation usage: 镜头相对旋转
     * @param resolution       usage: 截图尺寸
     * @param bShowOnly        usage: true时只截取角色，背景Alpha值置为0
     * @param fov              usage: 视场;
     * @param fileName         usage: 文件名
     * @param callback         usage: 获取本地截图路径 default:null
     */
    function getHeadSculpture(character: mw.Character, relativeLocation: mw.Vector, relativeRotation: mw.Rotation, resolution: mw.Vector2, bShowOnly: boolean, fov: number, fileName: string, callback: (dataString: string) => void): void;
    /**
     * @author jie.wu
     * @description         上传角色头像及全身照到服务器后发送到MGS
     * @groups              基础类型
     * @effect              只在客户端调用生效
     * @precautions         Playza定制接口
     * @param gender        usage:角色性别，1-男 2-女 0-未知
     * @param portraitPath  usage:头像照路径
     * @param fullPicPath   usage:全身照路径
     * @param callbackURL   usage:获取上传后在服务器中的URL default:null，可选参数
     */
    function uploadScreenShots(gender: number, portraitPath: string, fullPicPath: string, callbackURL?: (porURL: string, bodyURL: string) => void): void;
    /**
     * @author jie.wu
     * @description         上传角色头像或全身照到服务器后发送到MGS
     * @groups              基础类型
     * @effect              只在客户端调用生效
     * @precautions         Playza定制接口
     * @param filePath      usage:图片路径
     * @param fileType      usage:图片类型 default:0-全身照,1-男性头像 2-女性头像
     * @param callbackURL   usage:获取上传后在服务器中的URL default:null，可选参数
     */
    function uploadScreenShot(filePath: string, fileType: number, callbackURL?: (responseURL: string) => void): void;
    /**
     * @author jie.wu
     * @description            验证绝对路径下截图是否存在
     * @groups                 基础类型
     * @effect                 只在客户端调用生效
     * @param absPath          usage: 图片的绝对路径
     * @return                 该文件是否存在
     */
    function screenShotExist(absPath: string): boolean;
    /**
     * @author jie.wu
     * @description            获取截图的保存路径
     * @groups                 基础类型
     * @effect                 只在客户端调用生效
     * @return                  保存路径的绝对路径
     */
    function getSavedDir(): string;
    /**
     * @author jie.wu
     * @description            将角色数据ID连同角色截图一同发给MGS
     * @groups                 基础类型
     * @effect                 只在客户端调用生效
     * @precautions            Playza定制接口
     * @param absPath          usage: 分享截图的绝对路径
     * @param shareId          usage: 分享的角色数据id,可为空
     * @param bShowUuid        usage: 是否在显示账户的Uuid
     */
    function sendShareId(absPath: string, shareId: string, bShowUuid: boolean): void;
    /**
     * @author jie.wu
     * @description            连续截图，生成GIF素材发送给服务器
     * @groups                 基础类型
     * @effect                 只在客户端调用生效
     * @precautions            Playza定制接口
     * @param Character        usage: 指定截取GIF的Character
     * @param relativeLocation usage: 镜头相对位置 ScreenShot()中默认为Vector(35, 0, 50)
     * @param relativeRotation usage: 镜头相对旋转 ScreenShot()中默认为Rotation(0, 180, 0)
     * @param resolution       usage: 截图尺寸
     * @param bShowOnly        usage: true时只截取角色，背景Alpha值置为0
     * @param fov              usage: 镜头FOV值
     * @param picNum           usage: 截取图像张数
     * @param recordingTime    usage: 截取持续时长
     */
    function recordingCharacterGif(Character: mw.Character, relativeLocation: mw.Vector, relativeRotation: mw.Rotation, resolution: mw.Vector2, bShowOnly: boolean, fov: number, picNum: number, recordingTime: number): void;
}

declare namespace UGC {
    /**
     * @author            jie.wu
     * @description       异步对获取资源的三角面
     * @effect            只在客户端调用生效
     * @param guid        usage: 请求资源的guid
     * @return            资源的面数，如果是贴图则为0
     */
    function asyncGetAssetTrisCount(guid: string): Promise<number>;
    /**
     * @author            jie.wu
     * @description       异步对获取资源的贴图数量
     * @effect            只在客户端调用生效
     * @param guid        usage: 请求资源的guid
     * @return            贴图数量，如果是贴图则为0
     */
    function asyncGetAssetMaterialCount(guid: string): Promise<number>;
    /**
     * @author            jie.wu
     * @description       异步对获取资源的贴图大小
     * @effect            只在客户端调用生效
     * @param guid        usage: 请求资源的guid
     * @return            资源的贴图大小
     */
    function asyncGetAssetTextureSize(guid: string): Promise<number>;
}

/// <reference types="extension" />
declare namespace UGC {
    /**
     * @author xinlei.nie
     * @description 编辑态创建寻路区域并构建寻路数据
     * @effect 客户端生效
     * @param transform usage: 需要生成寻路区域的transform信息
     * @param cellSize usage: 寻路区块大小，数据越小越精细，但是构建时间会增加，生成文件也会变大 default: 19
     * @param cellHeight usage: 寻路区块高度，数据表现同cellSize default: 10
     * @param agentRadius usage: 寻路代理的半径，会影响寻路区域的生成，数据越小寻路区域越贴合模型边界 default: 30
     * @param agentHeight usage: 寻路代理的高度，会影响寻路区域的生成，数据小时寻路区域能生成在低矮的区域 default: 100
     * @param maxStepHeight usage: 寻路代理能走上的最大距离差，与walkableFloorAngle一同影响寻路区域的生成，数据越大则越大的模型平面高低差之间也能生成寻路区域进行连接 default: 45
     * @param walkableFloorAngle usage: 寻路代理能行走的最大倾斜角，与maxStepHeight一同影响寻路区域的生成，数据越大则MaxStepHeight满足情况下能生成更斜的连接区域 default: 45
     * @returns true表示确实开始了构建，false则表示当前环境不满足构建条件
     */
    function startBuildNavData(transform: mw.Transform, cellSize?: number, cellHeight?: number, agentRadius?: number, agentHeight?: number, maxStepHeight?: number, walkableFloorAngle?: number): boolean;
    /**
     * @author xinlei.nie
     * @description 编辑态取消构建寻路数据
     * @effect 客户端生效
     * @returns true表示确实取消了构建，false则表示当前环境不满足取消构建条件
     */
    function cancelBuildNavData(): boolean;
    /**
     * @author xinlei.nie
     * @description 编辑态获取当前构建剩余任务数
     * @effect 客户端生效
     * @returns 剩余任务数量
     */
    function getBuildNavDataTaskNum(): number;
}

/// <reference types="extension" />
declare namespace UGC {
    function getCurrentHistoryMgr(): HistoryMgr;
    class HistoryMgr {
        constructor();
        /**
         * @description 撤销
         * @effect 只在客户端调用生效
         * @param param1 usage: 绑定执行撤销时的代理
         * @returns void
         */
        undo(delegate: mw.MulticastDelegate<(Content: string) => void>): void;
        /**
         * @description 恢复
         * @effect 只在客户端调用生效
         * @param delegate usage:绑定执行恢复时的代理
         * @returns void
         */
        redo(delegate: mw.MulticastDelegate<(Content: string) => void>): void;
        /**
         * @description 开始记录数据
         * @effect 只在客户端调用生效
         * @param target usage: 目标对象 , 为空则是生成
         * @param externJson usage: 寄存的数据
         * @returns void
         */
        beginActorPropertiesChange(target: string[], externJson: {}): void;
        /**
         * @description 结束记录数据
         * @effect 只在客户端调用生效
         * @param target usage:目标对象,为空则是销毁
         * @param externJson usage:寄存的数据
         * @returns void
         */
        endActorPropertiesChange(target: string[], externJson: {}): void;
        /**
         * @description 获取当前的撤销恢复管理类
         * @effect 只在客户端调用生效
         */
        static getCurrentHistoryMgr(): HistoryMgr;
    }
}

/// <reference types="extension" />
/// <reference types="extension" />
declare namespace UGC {
    /**
     * @author maohang.zeng
     * @groups ViewGizmo
     * @description ViewGizmo方向
     */
    enum GizmoCubeFace {
        /** 前面 */
        Front = 0,
        /** 左边 */
        Left = 1,
        /** 右边 */
        Right = 2,
        /** 背边 */
        Back = 3,
        /** 顶部 */
        Top = 4,
        /** 底部 */
        Bottom = 5
    }
    /**
     * @author jianke.feng
     * @groups 界面/控件/视图选择器
     * @description 视图选择器
     * @description -------------------------
     * @description 无默认文本
     * @networkStatus usage:客户端
     */
    class ViewGizmo extends mw.Widget {
        /**
         * @groups 界面/控件/视图选择器
         * @description 点击视图面事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onClicked(): mw.MulticastDelegate<(face: GizmoCubeFace, rotation: mw.Rotation) => void>;
        /**
         * @groups 界面/控件/视图选择器
         * @description 拖拽开始
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onDragStart(): mw.Delegate<(absolutionPosition: mw.Vector2) => void>;
        /**
         * @groups 界面/控件/视图选择器
         * @description 拖拽结束
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onDragMove(): mw.Delegate<(absolutionPosition: mw.Vector2, Delta: mw.Vector2) => void>;
        /**
         * @groups 界面/控件/视图选择器
         * @description 拖拽结束
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onDragEnd(): mw.Delegate<(absolutionPosition: mw.Vector2) => void>;
        /** 设置视口选择器旋转 */
        bindViewRotation(fn: () => mw.Rotation): void;
        /**
         * @groups 界面/控件/视图选择器
         * @description 获取视图选择器对应面的ImageInfo
         * @effect  只在客户端调用生效
         * @param face 要设置的gizmo立方体的面
         * @returns 返回ImageInfo对象
         */
        getViewGizmoImageInfo(face: GizmoCubeFace): mw.ImageInfo;
        /**
         * @groups 界面/控件/视图选择器
         * @description 获取视图选择器边框的ImageInfo
         * @effect  只在客户端调用生效
         * @returns 返回ImageInfo对象
         */
        getViewGizmoFrameImageInfo(): mw.ImageInfo;
        /**
         * @groups 界面/控件/视图选择器
         * @description 创建 ViewGizmo 控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect  只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default: null
         * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): ViewGizmo;
        /**
         * @groups 界面/控件/视图选择器
         * @description 设置点击事件触发模式
         * @effect  只在客户端调用生效
         * @param inTouchMethod usage:Touch模式选择
         */
        set touchMethod(inTouchMethod: mw.ButtonTouchMethod);
        /**
         * @groups 界面/控件/视图选择器
         * @description 获取点击模式
         * @effect  只在客户端调用生效
         * @returns 点击模式选择
         */
        get touchMethod(): mw.ButtonTouchMethod;
        /**
         * @groups 界面/控件/视图选择器
         * @description 获取轴文字大小
         * @effect  只在客户端调用生效
         */
        get fontSize(): number;
        /**
         * @groups 界面/控件/视图选择器
         * @description 设置轴文字大小
         * @effect  只在客户端调用生效
         * @param size usage:文字大小
         */
        set fontSize(size: number);
        /**
         * @groups 界面/控件/视图选择器
         * @description 获取轴粗细
         * @effect  只在客户端调用生效
         */
        get lineThickness(): number;
        /**
         * @groups 界面/控件/视图选择器
         * @description 设置轴粗细
         * @effect  只在客户端调用生效
         * @param thickness usage:轴粗细
         */
        set lineThickness(thickness: number);
        /**
         * @groups 界面/控件/视图选择器
         * @description 获取轴相对于视图选择器比例
         * @effect  只在客户端调用生效
         */
        get lineScale(): number;
        /**
         * @groups 界面/控件/视图选择器
         * @description 设置轴相对于视图选择器比例
         * @effect  只在客户端调用生效
         * @param scale usage:轴相对于视图选择器比例
         */
        set lineScale(scale: number);
    }
}
