/**
 * @author huipeng.jia & guang.deng
 * @description Account Service
 */
declare namespace mw {
    /**
     * @author huipeng.jia
     * @description 下载平台数据回调
     * @groups 基础类型
     */
    type downloadCharacterDataStringCallback = (dataString: string) => void;
    /**
     * @author huipeng.jia
     * @description 下载角色形象的回调，无参数
     * @groups 基础类型
     */
    type DownloadDataResponse = () => void;
    /**
     * @author huipeng.jia
     * @description 下载角色形象的回调消息格式
     * @groups 基础类型
     * @param success usage: 上传是否成功
     */
    type UploadDataResponse = (success: boolean) => void;
    /**
     * @author huipeng.jia
     * @description 返回bool的回调
     * @groups 基础类型
     */
    type BoolResponse = (success: boolean) => void;
    /**
     * @author huipeng.jia
     * @description 返回无参数的回调
     * @groups 基础类型
     */
    type VoidResponse = () => void;
    /**
     * @author huipeng.jia
     * @description 返回string的回调
     * @groups 基础类型
     */
    type StringResponse = (dataString: string) => void;
    /**
     * @author huipeng.jia
     * @description GameService的回调
     * @groups 基础类型
     */
    type MGSResponse = (isSuccess: boolean, jsonData: string) => void;
    /**
     * @author huipeng.jia, guang.deng
     * @groups 服务/社交
     * @description 用户账号信息管理服务
     * @networkStatus usage: 客户端
     */
    class AccountService {
        /**
         * @description 获取平台的用户Id,可以用于getUserData接口
         * @returns 用户Id
         * @effect 只在客户端调用生效
         * @example
         * 使用示例:创建一个名为AccountExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，控制窗口会输出用户的UserId
         * ```
         * @Component
         * export default class AccountExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let userId = AccountService.getUserId();
         *         console.log("获取平台的用户Id", userId);
         *     }
         * }
         * ```
         */
        static getUserId(): string;
        /**
         * @description 获取玩家昵称
         * @effect 只在客户端调用生效
         * @precautions 只在移动端生效
         * @returns 昵称
         * @example
         * 使用示例:创建一个名为AccountExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，控制窗口会输出用户的昵称,PC环境下为空
         * ```
         * @Component
         * export default class AccountExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let name = AccountService.getNickName();
         *         console.log("获取玩家昵称", name);
         *     }
         *
         * }
         * ```
         */
        static getNickName(): string;
        /**
         * @description 将头像赋值到Image变量上
         * @effect 只在客户端调用生效
         * @precautions 只在移动端生效
         * @param img usage:需要赋值获得头像的Image变量
         * @example
         * 使用示例:创建一个名为AccountExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在屏幕右上方显示用户的头像，PC环境下为白图
         * ```
         * @Component
         * export default class AccountExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let imgUI = new ImageUI();
         *         AccountService.fillAvatar(imgUI.image);
         *     }
         *
         * }
         *
         * class ImageUI {
         *     public image: mw.Image;
         *
         *     constructor() {
         *         this.creatUI();
         *     }
         *
         *     private creatUI() {
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
         *         this.image = mw.Image.newObject(rootCanvas);
         *         this.image.position = new Vector2(1700, 310);
         *         this.image.size = new Vector2(150, 50);
         *         this.image.visibility = SlateVisibility.Visible;
         *     }
         * }
         * ```
         */
        static fillAvatar(img: mw.Image): void;
        /**
         * @description 上传角色形象资源到服务器  Character，Hair, UpperCloth, LowerCloth, Gloves, Shoe
         * @param character usage:要上传换装数据的角色
         * @param callback usage:设置是否成功的回调 default:默认没有回调
         * @param index usage:角色资源位 default:0（主角资源位） range: [0,5] type: 整形
         * @param openStatus usage:开放状态 default:1,默认是开放状态 range: [0,1] type: 整形
         * @effect 只在客户端调用生效
         */
        static uploadData(character: mw.Character, callback?: BoolResponse | VoidResponse, index?: number, openStatus?: number): void;
        /**
         * @description 下载角色形象并应用到当前角色身上
         * @param character usage:要应用换装数据的角色
         * @param callback usage:设置是否成功的回调 default:默认没有回调
         * @param index usage:角色资源位 default:0（主角资源位） range: [0,5] type: 整形
         * @effect 只在客户端调用生效
         */
        static downloadData(character: mw.Character, callback?: BoolResponse | VoidResponse, index?: number): void;
        /**
         * @description 设置数据是否公开给其他用户
         * @param index usage:角色资源位 default:0（主角资源位） range: [0,5] type: 整形
         * @param isOpen usage:是否公开
         * @param callback usage:设置是否成功的回调 default:无
         * @effect 只在客户端调用生效
         */
        static dataShowToOther(index: number, isOpen: boolean, callback?: BoolResponse): void;
        /**
         * @description 生成分享Id
         * @param character usage:分享换装数据的角色
         * @param callback usage: 回调参数，返回生成的Id
         * @effect 只在客户端调用生效
         */
        static createSharedId(character: mw.Character, callback: StringResponse): void;
        /**
         * @description 应用分享Id的角色数据
         * @param character usage:分享换装数据的角色
         * @param id usage:分享Id range: 无
         * @param callback usage: 回调参数，true:应用成功；false:应用失败
         * @effect 只在客户端调用生效
         */
        static applySharedId(character: mw.Character, id: string, callback: BoolResponse): void;
        /**
         * @description 获取用户存储在服务器上的角色形象数据
         * @param userId usage:用户Id range: 无
         * @param index usage:角色资源位 default:0（主角资源位） range: [0,5] type: 整形
         * @param callback usage:返回获取的数据string.
         * @effect 只在客户端调用生效
         * @example
         * 使用示例:创建一个名为AccountExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，发布在真机上运行游戏，会看到一个和玩家形象一致的人形对象
         * ```
         * @Component
         * export default class AccountExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let player = await Player.asyncGetLocalPlayer();
         *         let npc = (await GameObject.asyncSpawn({ guid: "NPC" })) as Character;
         *         npc.worldTransform.position = new Vector(0, 0, 200);
         *         AccountService.getUserData(player.userId, 0, async str => {
         *             await TimeUtil.delaySecond(5);
         *             AccountService.setUserData(npc, str, isSuccess => {
         *                 player.character.name = isSuccess ? "成功" : "失败";
         *             })
         *         });
         *     }
         * }
         * ```
         */
        static getUserData(userId: string, index: number, callback: StringResponse): void;
        /**
         * @description 将角色形象数据应用至角色
         * @param character usage: 用于换装的角色
         * @param dataString usage: 返回的数据 range: 无
         * @param callback usage:设置是否成功的回调 default:无回调
         * @effect 只在客户端调用生效
         * @example
         * 使用示例:创建一个名为AccountExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，发布在真机上运行游戏，会看到一个和玩家形象一致的人形对象
         * ```
         * @Component
         * export default class AccountExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let player = await Player.asyncGetLocalPlayer();
         *         let npc = (await GameObject.asyncSpawn({ guid: "NPC" })) as Character;
         *         npc.worldTransform.position = new Vector(0, 0, 200);
         *         AccountService.getUserData(player.userId, 0, async str => {
         *             await TimeUtil.delaySecond(5);
         *             AccountService.setUserData(npc, str, isSuccess => {
         *                 player.character.name = isSuccess ? "成功" : "失败";
         *             })
         *         });
         *     }
         * }
         * ```
         */
        static setUserData(character: mw.Character, dataString: string, callback?: BoolResponse): void;
        /**
         * @description 发起添加好友请求
         * @effect 只在客户端调用生效
         * @precautions
         * 1. 只在移动端生效
         * 2. 查询的目标玩家需要和当前玩家在同一房间。否则返回的数据会是"参数格式不正确"。
         * @param resp usage:GameService的回调
         * @param userId usage:要加的玩家UserId range: 无
         * @param reason usage:申请理由 range: 无
         */
        static addFriend(resp: MGSResponse, userId: string, reason: string): void;
        /**
         * @description 若需要检测玩家是否好友关系，可通过调用isFriend接口进行查看
         * @effect 只在客户端调用生效
         * @precautions
         * 1. 只在移动端生效
         * 2. 查询的目标玩家需要和当前玩家在同一房间。否则返回的数据会是"参数格式不正确"。
         * @param resp usage:GameService的回调。在收到结果时会触发该回调，参数含义如下：
         * - isSuccess - 正常获取到了查询结果即为true，并不代表为好友关系。false表示请求出错。
         * - jsonData - 当userId对应的角色和当前玩家不在同一房间，返回值为"参数格式不正确"；
         * 当userId对应的角色和当前玩家在同一房间，且互为好友，返回值为"true"；
         * 当userId对应的角色和当前玩家在同一房间，不为好友，返回值为"false"；
         * @param userId usage:要确定的玩家UserId range: 无
         */
        static isFriend(resp: MGSResponse, userId: string): void;
        /**
         * @description 发起getUserInfo并获得回调，查询玩家的昵称、性别
         * @effect 只在客户端调用生效
         * @precautions
         * 1. 只在移动端生效
         * 2. 查询的目标玩家需要和当前玩家在同一房间。否则返回的数据会是"参数格式不正确"。
         * @param userId usage:玩家UserId range: 无
         * @param gameId usage:GameId range: 无
         * @param callback usage:返回 nickname(string) 和 gender(number)
         */
        static getUserInfo(userId: string, gameId: string, callback: (nickname: string, gender: number) => void): void;
        /**
         * @description 发起checkVIP并获得回调，查询玩家的vip信息
         * @effect 只在客户端调用生效
         * @precautions
         * 1. 只在移动端生效
         * 2. 查询的目标玩家需要和当前玩家在同一房间。否则返回的数据会是"参数格式不正确"。
         * @param userId usage:玩家UserId range: 无
         * @param gameId usage:GameId range: 无
         * @param callback usage:返回 result，玩家的vip是否正常
         */
        static checkVIP(userId: string, gameId: string, callback: (result: string) => void): void;
    }
}

declare namespace mw {
    /**
     * AdsService技术文档：
     * 1. https://meta.feishu.cn/wiki/Ynr4wNbGZioSmckQuFOc4NzrnKu
     * 2. https://meta.feishu.cn/wiki/wikcnY0JiJ5gTwWan4ec5pC2Wdb
     */
    /**
     * @author huipeng.jia
     * @description 广告类型
     * @groups 服务/货币
     */
    enum AdsType {
        /** 激励广告：需要全部看完，偶尔快看完了的时候会出现跳过按钮，玩家的选择权更小，一般用作看广告获得奖励，建议放之前说明清楚，引导玩家全部看完，以提高广告收益*/
        Reward = "reward",
        /** 插屏广告：可以不全部看完，看几秒后会有关闭的按钮，玩家的选择权更大，不建议太频繁播放*/
        Interstitial = "interstitial"
    }
    /**
     * @author huipeng.jia
     * @description 广告状态，调用show方法的时候可能返回的广告状态
     * @groups 服务/货币
     */
    enum AdsState {
        /** 展示失败。 展示广告失败的时候回调，一般是网络卡顿。 建议在这里做容错*/
        Fail = -1,
        /** 开始展示。 开始展示广告的时候回调，无论是否完成广告播放。 这里可以用来“保护”玩家，顺利开始播放广告后玩家客户端处在一个“挂起”的状态。 如有需要，可在此处加一些保护逻辑，例如在放广告的时候玩家暂时被传送走，等state==1关闭广告后再切回来。*/
        Success = 0,
        /** 用户关闭。 用户关闭广告界面的时候回调，无论是否完成广告播放。 这里是广告正常播放情况下最后一个状态，因此在这里进行奖励判断是比较合适的。 由于用户关闭广告后回游戏需要一定的时间，建议在if (state == 1) { 这里面加上适当的延迟 } ，以免因放广告时的游戏挂起卡顿，导致后续某些游戏逻辑失效。*/
        Close = 1,
        /** 用户跳过。 用户点击了跳过广告的时候回调，无论是否完成广告播放。 某些广告快看完的时候，会给一个跳过按钮，点击跳过会有这个回调。 一般不会在这加逻辑。*/
        Skip = 2,
        /** 用户点击。 用户点击了广告里面的内容的时候，无论是否完成广告播放。 看广告时点击了广告里的内容会有这个回调。 一般不会在这加逻辑*/
        Click = 3,
        /** 获得奖励。 只有激励广告才会返回这个,用户播放广告完成了，无论是否点击了关闭广告界面。 可以在广告播放前设置一个变量CanGetReward，来决定玩家是否可以获得奖励： if (state == 4) {在这个回调出现时，里面修改CanGetReward的值}， 以便在 state == 1 用户关闭广告的时候进行奖励。 尽量不要在这给奖励，因为回调state==4的时候，玩家大概率还在放广告阶段，还没有回到mw游戏里。*/
        Reward = 4,
        /** 播放广告超时，通常发生的情况是广告API的版本过低，这里可以提示用户升级App版本 */
        Timeout = 5
    }
    /**
     * @author huipeng.jia
     * @description 广告服务
     * @precautions 需先在开发者后台“游戏服务”中接入广告，才能正常播出。请注意，广告只能在真机上播放，开发环境无法播放。
     * @networkStatus usage: 客户端
     * @groups 服务/货币
     */
    class AdsService {
        /**
         * @description 广告是否准备好
         * @effect 只在客户端调用生效
         * @precautions 结果不准确，可能在广告准备好的情况返回false
         * @param callback usage: 接收广告事件的回调
         */
        static isReady(callback: (isReady: boolean) => void): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:032 reason:接口废弃 replacement:isReady(callback: (isReady: boolean) => void): void
         * @groups 服务/货币
         * @description 广告是否准备好
         * @effect 只在客户端调用生效
         * @precautions 结果不准确，可能在广告准备好的情况返回false
         * @param adsType usage: 广告类型
         * @param callback usage: 接收广告事件的回调
         */
        static isReady(adsType: AdsType, callback: (isReady: boolean) => void): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:032 reason:删除接口 replacement:AdsButton UI控件
         * @groups 服务/货币
         * @description 广告是否激活,PC上始终返回false
         * @effect 只在客户端调用生效
         * @param adsType usage: 广告类型
         * @returns true:该类型广告已激活，false:该类型广告未激活
         */
        static isActive(adsType: AdsType): boolean;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:032 reason:删除接口 replacement:AdsButton UI控件
         * @description 展示广告，手机会进入Pause状态，可以用Events.addOnPauseListener来进行捕获
         * @groups 服务/货币
         * @description 展示广告
         * @effect 只在客户端调用生效
         * @param adsType usage: 广告类型
         * @param callback usage: 广告播放结果回调
         * @example
         * 使用示例:创建一个名为AdsExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，发布游戏并关联广告位，手机上运行游戏，每10秒会自动播放一次广告，并会在玩家头顶显示广告播放状态与结果
         * ```
         * @Component
         * export default class AdsExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         await TimeUtil.delaySecond(10);
         *         this.playAd(AdsType.Reward);
         *     }
         *
         *     //播放广告
         *     private async playAd(type: AdsType): Promise<void> {
         *         let player = await mw.Player.localPlayer;
         *         if (!AdsService.isActive(type)) {
         *             player.character.name = type == AdsType.Reward ? "激励广告未激活" : "插屏广告未激活";
         *             return;
         *         }
         *         AdsService.isReady(type, (isReady) => {
         *             if (!isReady) {
         *                 player.character.name = type == AdsType.Reward ? "激励广告未准备好" : "插屏广告未准备好";
         *                 return;
         *             }
         *             AdsService.showAd(type, async (isSuccess) => {
         *                 if (isSuccess) player.character.name = type == AdsType.Reward ? "激励广告播放成功" : "插屏广告播放成功";
         *                 await TimeUtil.delaySecond(10);
         *                 type == AdsType.Reward ? this.playAd(AdsType.Interstitial) : this.playAd(AdsType.Reward);
         *             });
         *         })
         *     }
         *
         * }
         * ```
         */
        static showAd(adsType: AdsType, callback: (isSuccess: boolean) => void): void;
    }
}

declare namespace mw {
    /**
     * @author xiangkun.sun
     * @groups 服务/埋点分析
     * @description 分析服务
     * @networkStatus usage: 双端
     */
    class AnalyticsService {
        /**
         * @groups 服务/埋点分析
         * @description 谷歌分析工具 （Initialize Google Analytics client）
         * @effect 调用端生效
         * @param mId usage: 谷歌分析 ID （Google Analytics measurement ID）  range:字符串长度谷歌注册的账号 ID 而定
         */
        static googleInit(mId: string): void;
        /**
         * @groups 服务/埋点分析
         * @description 埋点
         * @effect 调用端生效
         * @param eventName usage:埋点名  range: 不做限制，合理即可
         * @param eventParams usage:埋点参数 default:null  range: 不做限制，合理即可
         */
        static googleEventTracking(eventName: string, eventParams?: {
            [p: string]: string;
        }): void;
    }
}

declare namespace mw {
    /**
     * @hidden
     * @author huipeng.jia, junwen.hua
     * @description 枚举各个通道的使用与接收方
     * @groups 基础类型
     */
    enum MessageChannelReceiver {
        /**
         * C++层，MetaWorld引擎
         */
        MetaWorld = 0,
        /** 平台层，根据移动端平台可能是Android、PC或iOS */
        Client = 1,
        /** TS层，游戏项目 */
        TS = 2,
        /** 预留MGS对象，暂时没有实际接入通道 */
        MGS = 3,
        /** Web层，Room manager（并非DS） */
        WebSocket = 4
    }
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
    class MessageChannelService {
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 注册需要收到消息的action以及对应要调用的回调函数，通道会识别包含该action的消息并调用对应的回调函数
         * @effect 只在客户端调用生效
         * @precautions 未被注册的消息不会被TS层接收，哪怕对方指定目标是TS也不会调用回调函数（未注册）
         *              注册action需要在收到消息之前，请保证注册时机足够早
         * @param action usage:需要被注册的action，通道收到该action的消息会调用对应回调
         * @param caller usage:调用者，一般传this
         * @param onCall usage:通道收到消息后应该执行的对应的回调函数
         * @example
         * 使用示例:通道注册action
         * ```
         * // 注册action:ts.test.myaction，对包含action的消息，调用OnCall回调
         * mw.MessageChannelService.getInstance().registerAction("ts.test.myaction", this, OnCall);
         * ```
         */
        static registerAction(action: string, caller: any, onCall: (data: string) => void): void;
        /**
         * @description 对要发送的消息进行合规检测
         * @param message 要检测的消息
         * @returns 是否通过检测
         */
        private static validateMessage;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 发送消息到通道上，将消息发送到通道，所有注册了该消息action的端才能收到该消息
         * @effect 只在客户端调用生效
         * @precautions 如果通道上没有端注册了该消息的action则这条消息不会发送给任何对象
         *              如果通道上有多个端注册了该消息的action则所有注册者都能收到该消息
         *              发送消息的时机要晚于对方注册的时机
         *              消息需要是Json格式的字符串，包含"action"字段
         * @param message usage:需要发送的消息
         * @example
         * 使用示例:通道广播消息
         * ```
         * // 发送message:"{\"action\":\"ts.test.myaction\",\"data\":{}}"到通道上，所有注册了该消息中action的端才可以收到该消息
         * mw.MessageChannelService.getInstance().send("{\"action\":\"ts.test.myaction\",\"data\":{}}");
         * ```
         */
        static send(message: string): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 发送消息给指定对象，将消息发送给指定对象，对方无需提前注册
         * @effect 只在客户端调用生效
         * @precautions 如果通道上有多个端注册了该消息，仍只会发给指定的对象
         *              消息需要是Json格式的字符串，包含"action"字段
         * @param toWhom  usage:指定的对象，使用枚举值MessageChannelReceiver
         * @param message usage:需要发送的消息
         * @example
         * 使用示例:通道私发消息
         * ```
         * // 指定一个目标端toWhom:Client发送消息message:"{\"action\":\"ts.test.myaction\",\"data\":{}}"，对方无需提前注册就可以收到该消息
         * mw.MessageChannelService.getInstance().sendTo(Service.MessageChannelReceiver.Client, "{\"action\":\"ts.test.myaction\",\"data\":{}}");
         * ```
         */
        static sendTo(toWhom: MessageChannelReceiver, message: string): void;
    }
}

/**
 * @author huipeng.jia
 * @description 应用内购服务
 */
declare namespace mw {
    /**
     * @author junwen.hua
     * @groups 服务/货币
     * @description 大会员扣除钥匙订单返回状态信息
     */
    enum consumeKeyStatus {
        /** 下单成功 */
        Success = 200,
        /** 下单失败，应用程序不支持大会员功能 */
        PremiumMemberNotSupported = -1,
        /** 下单失败，用户不是大会员 */
        NotPremiumMember = -2,
        /** 扣除钥匙失败，用户钥匙不足 */
        InsufficientKeys = 33002,
        /** 下单失败 */
        Error = -3
    }
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
    type OnOrderDelivered = (playerId: number, orderId: string, commodityId: string, amount: number, confirmOrder: (bReceived: boolean, message?: string) => void) => void;
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
    type OnKeyConsume = (player: mw.Player, orderId: string, boxId: string, amount: number, confirmOrder: (bReceived: boolean) => void) => void;
    /**
     * @author huipeng.jia
     * @description 客户端接收余额更新的消息格式
     * @groups 基础类型
     * @param amount usage: 新的余额
     */
    type OnArkBalanceUpdated = (amount: number) => void;
    /**
     * @author junwen.hua
     * @description 大会员消费钥匙订单。orderId：订单ID，boxId：宝箱ID，number：购买宝箱数量，shipTime：发货时间，毫秒级时间戳
     * @groups 服务/货币
     */
    type keyUsageInfo = {
        number: number;
        orderId: string;
        consumeTime: number;
        boxId: string;
    };
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
    type RedeemResponse = {
        status: number;
        message: string;
        player: mw.Player;
    };
    /**
     * @author huipeng.jia, junwen.hua
     * @groups 服务/货币
     * @description 应用内购服务
     * @networkStatus usage: 客户端
     */
    class PurchaseService {
        /**
         * @groups 服务/货币
         * @author junwen.hua
         * @description 获取用户使用软件版本是否有大会员功能
         * @effect 只在客户端调用生效
         * @param isSupportedResult usage:结果回调，查询到结果后执行回调函数。true:支持大会员功能，false:不支持大会员功能
         * @precautions 暂未考虑单机模式，第一次结果会通过异步回调的方式返回（构造时自动请求），后续会通过缓存直接执行回调函数（同步）。老版本的App可能出现无回调的情况，需要自行判断超时
         * @example
         * 使用示例:创建一个名为PurchaseExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，发布游戏在移动端测试，可以看到当前app是否支持大会员功能
         * ```
         * @Component
         * export default class PurchaseExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let player = Player.localPlayer;
         *         PurchaseService.isPremiumMemberSupported(isSupport => {
         *             player.character.displayName = isSupport ? "当前app支持大会员功能" : "当前app不支持大会员功能";
         *         })
         *     }
         * }
         * ```
         */
        static isPremiumMemberSupported(isSupportedResult: (result: boolean) => void): void;
        /**
         * @groups 服务/货币
         * @author junwen.hua
         * @description 获取用户是否是大会员
         * @effect 只在客户端调用生效
         * @param isPremiumMemberResult usage:结果回调，查询到结果后执行回调函数。true:是大会员，false:不是大会员
         * @precautions 暂未考虑单机模式，第一次结果会通过异步回调的方式返回（构造时自动请求），后续会通过缓存直接执行回调函数（同步），
         * @example
         * 使用示例:创建一个名为PurchaseExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，发布游戏在移动端测试，可以看到当前用户是否是大会员
         * ```
         * @Component
         * export default class PurchaseExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let player = Player.localPlayer;
         *         PurchaseService.isPremiumMember(isSupport => {
         *             player.character.displayName = isSupport ? "当前玩家是大会员" : "当前玩家不是大会员";
         *         })
         *     }
         * }
         * ```
         */
        static isPremiumMember(isPremiumMemberResult: (result: boolean) => void): void;
        /**
         * @groups 服务/货币
         * @author junwen.hua
         * @description 获取用户剩余钥匙数量
         * @effect 只在客户端调用生效
         * @param getUserKeyNumberResult usage:结果回调，查询到结果后执行回调函数。keyNumber : 剩余钥匙数量
         * @param keyType usage:搜索的钥匙类型，暂时只有类型 1 <br> default: 1  range: 1  type: 整形
         * @example
         * 使用示例:创建一个名为PurchaseExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，发布游戏在移动端测试，可以看到当前用户剩余钥匙数量
         * ```
         * @Component
         * export default class PurchaseExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         let player = Player.localPlayer;
         *         PurchaseService.getUserKeyNumber(keyNumber => {
         *             player.character.displayName = "当前用户剩余钥匙数量：", keyNumber.toString();
         *         })
         *     }
         * }
         * ```
         */
        static getUserKeyNumber(getUserKeyNumberResult: (keyNumber: number) => void, keyType?: number): void;
        /**
         * @groups 服务/货币
         * @author junwen.hua
         * @description 大会员开宝箱消耗金钥匙
         * @effect 只在客户端调用生效
         * @param boxId usage:宝箱 ID，代表一种福利，暂时自定义id。后续会在开发者平台配制  range:依据 boxId 长度
         * @param number usage:领取的宝箱数量 <br> default: 1  range: 不做限制  type: 整形
         * @param keyType usage:钥匙类型，当前只有一种钥匙类型值为 1 <br> default: 1  range: 1  type:整数
         * @param placeOrderResult usage:订单结果。status 大会员扣除钥匙下单状态
         * @example
         * 使用示例: 需要先在服务端监听发货信息，扣除钥匙时会判断服务端是否监听
         * ```
         * if (SystemUtil.isServer()) {
         *      console.log("监听发货");
         *      //发货监听
         *      mw.PurchaseService.onPremiumMemberOrderDelivered.add((
         *           playerController: mw.Player,
         *           orderId: string,
         *           boxId: string,
         *           amount: number,
         *           confirmOrder: (bReceived: boolean) => void
         *      ) => {
         *           mw.Event.dispatchToClient(playerController, orderId, boxId, amount);
         *           //确认收货
         *           confirmOrder(true);
         *      });
         * }
         *
         * // 扣除钥匙
         * mw.PurchaseService.consumeKey("1000", 1, 1, (status : mw.consumeKeyStatus) => {
         *      console.log("consumeKey status : " + status);
         *      if (status == mw.consumeKeyStatus.Success) {
         *           console.log("下单成功");
         *      } else if (status == mw.consumeKeyStatus.PremiumMemberNotSupported) {
         *           console.log("不支持大会员");
         *      } else if (status == mw.consumeKeyStatus.NotPremiumMember) {
         *           console.log("不是大会员");
         *      } else if (status == mw.consumeKeyStatus.InsufficientKeys) {
         *           console.log("钥匙不足");
         *      } else if (status == mw.consumeKeyStatus.Error) {
         *           console.log("扣除失败");
         *      }
         * });
         * ```
         */
        static consumeKey(boxId: string, number: number, keyType: number, placeOrderResult: (status: consumeKeyStatus) => void): void;
        /**
         * @groups 服务/货币
         * @author junwen.hua
         * @description 跳转会员充值页面
         * @effect 只在客户端调用生效
         * @example
         * 使用示例:创建一个名为PurchaseExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，发布游戏在移动端测试，10秒后会自动打开会员充值页面。
         * ```
         * @Component
         * export default class PurchaseExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         await TimeUtil.delaySecond(10);
         *         PurchaseService.openPremiumMemberPurchasePage();
         *     }
         * }
         * ```
         */
        static openPremiumMemberPurchasePage(): void;
        /**
         * @groups 服务/货币
         * @author junwen.hua
         * @description 获取大会员状态更新时触发的委托
         * @effect 只在客户端调用生效
         * @returns 大会员状态更新时触发的委托
         */
        static get onPremiumMemberStatusUpdate(): mw.MulticastDelegate<(result: boolean) => void>;
        /**
         * @groups 服务/货币
         * @description 获取订单发货的委托
         * @effect 只在服务端调用生效
         * @precautions 仅在服务端有效。暂未考虑单机模式，使用需谨慎
         * @returns 订单发货的委托
         */
        static get onPremiumMemberOrderDelivered(): mw.MulticastDelegate<OnKeyConsume>;
        /**
         * @groups 服务/货币
         * @description 分页查询大会员使用钥匙的历史记录
         * @effect 调用端生效
         * @param currentPage usage:查找第几页 <br> type:整数型 <br> range:（1, 65535)
         * @param pageSize usage:每页大小  <br> type:整数型  <br> range:(1, 100)
         * @param historyResult usage:查询结果回调函数
         * @param total 总页数为 -1 时表示查找失败
         * @param currentPage 查找第几页
         * @param bill 查询结果
         * @example
         * 使用示例:将代码片段放入脚本中即可
         * ```
         * mw.PurchaseService.findKeyUsageHistory(1, 100, (total : number, currentPage : number, bills : mw.keyUsageInfo[]) => {
         *     console.log("bill len : " + bills.length);
         *     for(let bill of bills)
         *     {
         *         console.log("bill orderId : " + bill.orderId);
         *         console.log("bill boxId : " + bill.boxId);
         *         console.log("bill number : " + bill.number);
         *         console.log("bill consumeTime : " + bill.consumeTime);
         *     }
         * });
         * ```
         */
        static findKeyUsageHistory(currentPage: number, pageSize: number, historyResult: (total: number, currentPage: number, bill: keyUsageInfo[]) => void): void;
        /**
         * @groups 服务/货币
         * @description 获取代币余额
         * @effect 只在客户端调用生效
         * @example
         * 使用示例:创建一个名为PurchaseExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，发布游戏在移动端测试，5秒后会显示代币余额
         * ```
         * @Component
         * export default class PurchaseExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         //在客户端注册刷新监听
         *         const onArkUpdate = (amount: number) => {
         *             //刷新逻辑，amount为当前代币数量
         *         }
         *         PurchaseService.onArkBalanceUpdated.add(onArkUpdate);
         *
         *         //触发代币余额刷新。接收更新的值要用PurchaseService.onArkBalanceUpdated监听
         *         PurchaseService.getArkBalance();
         *     }
         * }
         * ```
         */
        static getArkBalance(): void;
        /**
         * @groups 服务/货币
         * @description 获取 Ark 币余额更新的委托
         * @effect 只在客户端调用生效
         * @returns 代币余额更新的委托
         */
        static get onArkBalanceUpdated(): mw.MulticastDelegate<OnArkBalanceUpdated>;
        /**
         * @groups 服务/货币
         * @description 下单指定数量的指定商品
         * @description status 含义：
         * @description status = 200: 订单支付成功
         * @description status = 408: 请求超时
         * @description status = 409: 处理下单回调报错
         * @description status = 410: 处理支付回调报错
         * @description status = 501: 余额不足
         * @description status = 502: 暂未开放购买
         * @description status = 503: amount参数类型错误
         * @effect 只在客户端调用生效
         * @param commodityId usage: 商品Id  range: 依据商品 ID 长度而定
         * @param amount usage: 数量  range:不做限制 type:整数
         * @param placeOrderResult usage: 订单状态回调
         * @param status usage: 订单状态。<br> range: 取值范围和对应含义如下
         * @param msg 描述订单状态或者错误信息。 range: 与status取值含义一致
         */
        static placeOrder(commodityId: string, amount: number, placeOrderResult: (status: number, msg: string) => void): void;
        /**
         * @groups 服务/货币
         * @description 获取订单发货的委托
         * @effect 只在服务端调用生效
         * @precautions 仅在服务端有效。暂未考虑单机模式，使用需谨慎
         * @returns 订单发货的委托
         */
        static get onOrderDelivered(): mw.MulticastDelegate<OnOrderDelivered>;
        /**
         * @groups 服务/货币
         * @description 礼包码兑换
         * @description RedeemResponse中status : 兑换状态。
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
         * @description RedeemResponse中message : 兑换信息
         * @description 当兑换状态为成功时：兑换信息为礼包内容道具详情。
         * @description 当兑换状态为失败时：兑换信息为失败详情，例如：兑换码不存在。
         * @effect  只在服务端调用生效
         * @param player usage: 需要兑换的玩家对象
         * @param GiftCode usage: 礼包码  <br> range: 依据兑换码长度而定
         * @param redeemCallback usage: 兑换结果的回调函数
         * @example
         * 使用示例:创建一个名为PurchaseExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，发布游戏在移动端测试，5秒后会显示代币余额
         * ```
         * @Component
         * export default class NewScript extends Script {
         *     @Property({replicated:true,multicast:true})
         *     public player:Player;
         *     @Property({replicated:true,multicast:true})
         *     public playerid:string
         *
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()) {
         *             this.playerid = Player.localPlayer.userId;
         *             console.log(this.playerid);
         *         }
         *         if(SystemUtil.isServer()){
         *             this.textFunc();
         *         }
         *     }
         *
         *     @RemoteFunction(Server)
         *     public textFunc(){
         *         Player.getAllPlayers().forEach(element => {
         *             this.player = element;
         *         });
         *         // ""中填写兑换码
         *         PurchaseService.redeemGiftCode(this.player, "" ,(result:RedeemResponse)=>{
         *             console.log("result.message------------" + result.message);
         *             console.log("result.message------------" + result.status);
         *         });
         *         console.log("--------over----------")
         *     }
         * }
         * ```
         */
        static redeemGiftCode(player: mw.Player, GiftCode: string, redeemCallback: (result: RedeemResponse) => void): void;
    }
}

/**
 * @author huipeng.jia
 * @groups 服务/社交
 * @description 游戏跳转服务
 */
declare namespace mw {
    /**
     * @author huipeng.jia
     * @description 窗口刷新的消息格式
     * @groups 基础类型
     */
    type OnViewRefreshed = () => void;
    /**
     * @author huipeng.jia
     * @description 窗口显示模式切换的消息格式
     * @groups 基础类型
     * @param newState usage: 新的窗口模式。1 为“角色展示模式”，2 为“角色编辑模式”
     */
    type OnViewLayoutSwitched = (newState: number) => void;
    /**
     * @author huipeng.jia
     * @description 组队跳游戏请求失败回调
     * @groups 基础类型
     */
    type TeamMatchFailureInfo = {
        /** 组队玩家的playerId数组 */
        playerIds: number[];
        /** 失败原因 */
        failedReason: string;
    };
    /**
     * @author huipeng.jia
     * @groups 服务/社交
     * @description 游戏管理器
     * @networkStatus usage: 双端
     */
    class RouteService {
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:TeleportService.asyncTeleportToGame()
         * @description 组队跳游戏，可以携带数据
         * @effect 只在服务端调用生效
         * @param targetGameId usage: 要跳转的游戏的GameId range:无
         * @param teammatePlayerIds usage: 队友的playerId数组
         * @param carryingData usage: 要带入新游戏的数据 default: undefined
         * @returns 组队跳转请求回调
         */
        static enterNewGameByTeam(targetGameId: string, teammatePlayerIds: string[], carryingData?: Record<string, unknown>[]): Promise<void>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:TeleportService.getTeleportData()
         * @description 获取指定Team在组队跳转时带入游戏的数据
         * @effect 只在服务端调用生效
         * @param teamId usage: 要查询的 teamId  range: 字符串长度依据 teamId 长度而定
         * @returns 指定队伍的数据
         */
        static getTeamCarryingData(teamId: string): Record<string, unknown>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 删除指定Team在组队跳转时带入游戏的数据
         * @effect 只在服务端调用生效
         * @param teamId usage: 目标 teamId  range: 字符串长度依据 teamId 长度而定
         */
        static clearTeamCarryingData(teamId: string): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description TS请求App刷新View
         * @effect 只在客户端调用生效
         */
        static requestRefreshView(): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 注册View刷新的委托
         * @effect 只在客户端调用生效
         * @returns View刷新的委托
         */
        static get onViewRefreshed(): mw.MulticastDelegate<OnViewRefreshed>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 判断当前游戏是不是角色展示/编辑游戏
         * @effect 只在客户端调用生效
         * @precautions 在PIE或者服务端调用则固定返回false
         * @returns true-当前游戏是角色展示/编辑游戏，false-不是
         */
        static isInDressUpGame(): boolean;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 切换角色展示/编辑游戏的显示模式。
         * @effect 只在客户端调用生效
         * @param newState usage: 新模式。range:[1, 2] newState = 1 为“角色展示模式”，newState = 2 为“角色编辑模式” type: 整形
         */
        static requestSwitchViewLayout(newState: number): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 通知App角色形象加载完毕
         * @effect 只在客户端调用生效
         */
        static notifyCharacterLoaded(): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 通知App当前TS游戏加载状态(收到这个协议，App停止下载，清除Temp文件)
         * @effect 只在客户端调用生效
         * @param newState usage: 状态Id。range:[1, 2] 1-游戏加载成功，2-游戏加载失败 type: 整形
         */
        static notifyGameLoadingState(newState: number): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 获取角色展示/编辑游戏的显示模式切换的委托
         * @effect 只在客户端调用生效
         * @returns 角色展示/编辑游戏的显示模式切换的委托
         */
        static get onViewLayoutSwitched(): mw.MulticastDelegate<OnViewLayoutSwitched>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 将当前游戏进程恢复小窗，拉起新进程进入广场游戏。与默认的跳游戏模式不同。
         * @effect 只在客户端调用生效
         * @param squareMgsGameId usage: 新的广场游戏GameId，如果为空，则使用各环境默认的广场游戏Id default: null range:无
         * @param carryingData usage: 跳游戏携带的数据 default: undefined range:无
         */
        static enterSquareGame(squareMgsGameId?: string, carryingData?: string): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 退出当前游戏进程，回到主线程的角色编辑游戏。
         * @effect 只在客户端调用生效
         * @param carryingData usage: 跳游戏携带的数据 default: undefined range:无
         */
        static enterDressUpGame(carryingData?: string): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:TeleportService.asyncTeleportToGame()
         * @description 跳转到新游戏，同进程跳转
         * @effect 只在客户端调用生效
         * @param targetGameId usage: 要跳转的目标游戏ID，GameId range:无
         * @param carryingData usage: 跳游戏携带的数据 default: undefined range:无
         */
        static enterNewGame(targetGameId: string, carryingData?: string): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 跳转本地游戏(可编辑的UGC工程) ，同进程跳转
         * @effect 只在客户端调用生效
         * @precautions 需要用创建本地工程时所对应模板游戏的gameId
         * @param targetGameId usage: 目标游戏的GameId，一般来说，这里会是模板游戏的gameId range:无
         * @param gamePath usage: 本地游戏工程的路径 range:无
         * @param carryingData usage: 跳游戏携带的数据 default: undefined range:无
         */
        static enterLocalGame(targetGameId: string, gamePath: string, carryingData?: string): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 获取拉起游戏时传入的数据
         * @effect 只在客户端调用生效
         * @precautions 如果是组队跳游戏，请使用getTeamCarryingData在服务端获取数据。
         * @returns 拉起游戏时传入的数据
         */
        static getGameCarryingData(): Promise<string>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:TeleportService.getSourceInfo()
         * @description 获取游戏来源信息
         * @effect 只在客户端调用生效
         * @returns 当前游戏是从哪个游戏跳转过来的，为空则不是游戏跳转
         */
        static getJumpFromMGSGameId(): Promise<string>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 注册游戏跳转的回调，当跨进程从其他游戏跳转到当前游戏时触发。可以被动获取来源游戏Id和携带的数据
         * @effect 只在客户端调用生效
         * @param callback usage: 要注册的回调，在接收到跳转信息时触发
         */
        static addJumpGameCallback(callback: (jumpFromGameId: string, carryingData: string) => void): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 用内容库MGSGameId来换取gameId
         * @effect 调用端生效
         * @param targetMgsGameId usage: 目标游戏的内容库gameId range:无
         * @returns 对应的gameId
         */
        static requestGameId(targetMgsGameId: string): Promise<string>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 用gameId来换取内容库MGSGameId
         * @effect 调用端生效
         * @param targetGameId usage: 目标游戏的gameId range:无
         * @returns 对应的MGSGameId
         */
        static requestMGSGameId(targetGameId: string): Promise<string>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:SystemUtil.getGameId()
         * @description 获取当前游戏GameId
         * @effect 调用端生效
         * @returns 当前游戏GameId
        */
        static getGameId(): string;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:SystemUtil.getVersion()
         * @description 获取当前游戏版本
         * @effect 调用端生效
         * @returns 当前游戏版本
         */
        static getGameVersion(): string;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @description 获取当前游戏的内容库MGSGameId
         * @effect 调用端生效
         * @returns 当前游戏的内容库MGSGameId
         */
        static getMGSGameId(): string;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:TeleportService.asyncTeleportToGame().catch(...)
         * @description 组队请求失败时会触发的委托
         * @networkStatus usage: 服务端
         */
        static get onTeamMatchFailure(): mw.MulticastDelegate<(failureInfo: TeamMatchFailureInfo) => void>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:TeleportService.getTeleportData(player.teleportId)
         * @description 收到队伍数据时会触发的委托
         * @networkStatus usage: 服务端
         */
        static get onReceiveTeamData(): mw.MulticastDelegate<(teamId: string, data: Record<string, unknown>) => void>;
    }
}

declare namespace mw {
    /**
     * @author changzun.li
     * @description 设置面板相关API
     * @networkStatus usage: 客户端
     * @groups 设置/设置面板
     */
    class SettingService {
        /**
         * @groups 设置/设置面板
         * @description 控制设置面板入口显隐
         * @effect 只在客户端调用生效
         * @precautions 游戏中提供给玩家的退出按钮在设置面板中，如果设置面板入口隐藏，玩家将无法退出游戏。使用此接口时请注意游戏退出逻辑。
         * @param visible usage: 是否显示设置面板入口
         */
        static setSettingButtonVisible(visible: boolean): void;
        /**
         * @groups 设置/设置面板
         * @description 展示设置面板，如果设置面板入口隐藏，可以通过此接口展示设置面板
         * @effect 只在客户端调用生效
         */
        static promptSettingPanel(): void;
        /**
         * @groups 设置/设置面板
         * @description 收起设置面板，如果设置面板入口隐藏，可以通过此接口收起设置面板
         * @effect 只在客户端调用生效
         */
        static collapseSettingPanel(): void;
    }
}

/**
 * @author huipeng.jia
 * @groups 服务
 * @description 多场景和传送服务
 */
declare namespace mw {
    /**
     * @author huipeng.jia
     * @description 传送时可携带的数据类型
     * @groups 数据处理
     */
    type TeleportData = string | string[] | Record<string, any> | Record<string, any>[];
    /**
     * @author huipeng.jia
     * @description 传送时可额外提供的信息
     * @groups 数据处理
     */
    interface TeleportOptions {
        /** @description 传送时携带的数据（可选） */
        teleportData?: TeleportData;
        /**
         * @description 是否进入全新房间且不允许未通过userId[]指定的玩家加入（可选）
         * @description true - 进入全新房间，且不允许未通过userId[]指定的玩家加入。
         * @description false - 优先进入已有的房间，如果没有满足条件的房间才进入新的。未指定的玩家可以进入。
         * @precautions 传true也有可能会因为服务器压力过大而创建失败。建议关注接口的TeleportResult并作处理
         */
        createNewPrivateRoom?: boolean;
    }
    /**
     * @author huipeng.jia
     * @description 传送状态
     * @groups 数据处理
     */
    enum TeleportStatus {
        /** 成功。表示传送依赖的服务均正常，会继续完成传送过程。 */
        success = "success",
        /** 已经有相同参数的请求在处理中，本次请求被忽略。请等待之前请求完成或者超时后再重试 */
        ignored = "ignored",
        /** 超时。表示传送依赖的服务没回调，可能是网络波动导致的，可以重新发起传送。 */
        timeout = "timeout",
        /** 出错。表示传送服务有报错，或者提供的数据不符合要求。 */
        error = "error"
    }
    /**
     * @author huipeng.jia
     * @description 传送请求的结果
     * @groups 数据处理
     */
    interface TeleportResult {
        /** @description 传送状态 */
        status: TeleportStatus;
        /** @description 参与传送的玩家的userId数组 */
        userIds: string[];
        /** @description 错误码 */
        errorCode: number;
        /** @description 错误信息 */
        message: string;
    }
    /**
     * @author huipeng.jia
     * @description 玩家所在的房间信息
     * @groups 数据处理
     */
    interface RoomInfo {
        /** @description 游戏Id*/
        gameId: string;
        /** @description 场景Id */
        sceneId: string;
        /** @description 房间Id */
        roomId: string;
        /** @description 场景名 */
        sceneName: string;
    }
    /**
     * @author huipeng.jia
     * @groups 服务/传送
     * @description 多场景和传送服务
     * @networkStatus usage: 服务端
     */
    class TeleportService {
        /**
         * @groups 服务/传送
         * @description 异步传送到当前游戏的指定场景
         * @precautions 仅限当前游戏的场景间传送，场景名不存在则会传送失败
         * @effect 只在服务端调用生效
         * @param sceneName usage:要传送的目标场景名称 range: 无
         * @param userIds usage:要传送的玩家 userId 数组
         * @param options usage:可选的额外传送信息 default:undefined
         * @returns 本次请求正常则返回resolve，异常则返回reject
         * @example
         * 使用示例:在编辑器中创建了一个名为"Scene1"的场景。创建一个名为"TeleportScript"的脚本，放在场景中，设置为双端。代码如下：
         * ```
         * @Component
         * export default class TeleportScript extends Script {
         *     protected onStart(): void {
         *         // 服务端逻辑
         *         if (SystemUtil.isServer()) {
         *             Player.onPlayerJoin.add((player: Player) => {
         *                 // 当玩家加入时，倒计时5s后发起传送，避免玩家加入立即传送，不易观察
         *                 setTimeout(() => {
         *                     // 假定已经在编辑器中创建了一个名为"Scene1"的场景
         *                     const sceneName: string = "Scene1";
         *                     // 将要传送到新场景的玩家加入数组
         *                     const playerToTeleport: string[] = [player.userId];
         *                     // 可以填充要携带的额外数据
         *                     const opt: TeleportOptions = {
         *                         teleportData: "This is test data."
         *                     }
         *
         *                     // 声明成功和失败的回调函数，用于处理传送接口的回调结果。
         *                     // 成功的情况一般不需要处理，会继续走后续跳转流程。
         *                     // 如果失败了，有可能是超时或者有报错，可以从回调的数据中读取信息做进一步处理。
         *                     const onSuccess = () => { }
         *                     const onFailed = (result: mw.TeleportResult) => {
         *                         switch (result.status) {
         *                             case mw.TeleportStatus.success:
         *                                 break;
         *                             case mw.TeleportStatus.ignored:
         *                                 // 触发太频繁了，本次请求被忽略
         *                                 break;
         *                             case mw.TeleportStatus.timeout:
         *                                 // 超时了，可以选择重试传送或者提示玩家
         *                                 break;
         *                             case mw.TeleportStatus.error:
         *                                 // 将错误信息发给所有参与的客户端
         *                                 for (const userId in result.userIds) {
         *                                     const player = Player.getPlayer(userId)
         *                                     if (player) {
         *                                         Event.dispatchToClient(player, "TeleportResult", result);
         *                                     }
         *                                 }
         *                         }
         *                     };
         *
         *                     // 传送功能需要在服务端发起，在客户端使用会报错
         *                     TeleportService.asyncTeleportToScene(sceneName, playerToTeleport, opt).then(onSuccess, onFailed);
         *                 }, 5 * 1000);
         *             });
         *         } else {
         *             // 客户端逻辑
         *             Event.addServerListener("TeleportResult", (result: mw.TeleportResult) => {
         *                 console.error(`Teleport has error:`);
         *                 console.error(`errorCode: ${result.errorCode}`);
         *                 console.error(`message: ${result.message}`);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static asyncTeleportToScene(sceneName: string, userIds: string[], options?: TeleportOptions): Promise<TeleportResult>;
        /**
         * @groups 服务/传送
         * @description 异步传送到指定房间
         * @precautions 指定房间不存在或者可容纳人数不足，则会失败。参与传送的玩家数量越多，失败率越高
         * @precautions 不支持 createNewPrivateRoom 参数，设置为true也不会创建新房间
         * @effect 只在服务端调用生效
         * @param roomId usage:要传送的目标游戏Id range: 无
         * @param userIds usage:要传送的玩家userId数组
         * @param options usage:可选的额外传送信息. 不支持 createNewPrivateRoom 参数，设置为true也不会创建新房间 default:undefined
         * @returns 本次请求正常则返回resolve，异常则返回reject
         * @example
         * 使用示例:创建一个名为"TeleportScript"的脚本，放在场景中，设置为双端。代码如下：
         * ```
         * @Component
         * export default class TeleportScript extends Script {
         *     protected onStart(): void {
         *         // 服务端逻辑
         *         if (SystemUtil.isServer()) {
         *             Player.onPlayerJoin.add((player: Player) => {
         *                 // 当玩家加入时，倒计时5s后发起传送，避免玩家加入立即传送，不易观察
         *                 setTimeout(() => {
         *                     // 假定我们想传送到UserId为"123456"的玩家所在房间一起游玩
         *                     const targetUserId: string = "123456";
         *                     // 先用asyncGetPlayerRoomInfo获取玩家所在的房间信息
         *                     TeleportService.asyncGetPlayerRoomInfo(targetUserId).then((roomInfo) => {
         *                         // 拿到RoomId
         *                         const roomId: string = roomInfo.roomId;
         *                         // 将要传送到新场景的玩家加入数组
         *                         const playerToTeleport: string[] = [player.userId];
         *                         // 可以填充要携带的额外数据
         *                         const opt: TeleportOptions = {
         *                             teleportData: "This is test data."
         *                         }
         *
         *                         // 声明成功和失败的回调函数，用于处理传送接口的回调结果。
         *                         // 成功的情况一般不需要处理，会继续走后续跳转流程。
         *                         // 如果失败了，有可能是超时或者有报错，可以从回调的数据中读取信息做进一步处理。
         *                         const onSuccess = () => { }
         *                         const onFailed = (result: mw.TeleportResult) => {
         *                             switch (result.status) {
         *                                 case mw.TeleportStatus.success:
         *                                     break;
         *                                 case mw.TeleportStatus.ignored:
         *                                     // 触发太频繁了，本次请求被忽略
         *                                     break;
         *                                 case mw.TeleportStatus.timeout:
         *                                     // 超时了，可以选择重试传送或者提示玩家
         *                                     break;
         *                                 case mw.TeleportStatus.error:
         *                                     // 将错误信息发给所有参与的客户端
         *                                     for (const userId in result.userIds) {
         *                                         const player = Player.getPlayer(userId)
         *                                         if (player) {
         *                                             Event.dispatchToClient(player, "TeleportResult", result);
         *                                         }
         *                                     }
         *                             }
         *                         };
         *
         *                         // 传送功能需要在服务端发起，在客户端使用会报错
         *                         TeleportService.asyncTeleportToRoom(roomId, playerToTeleport, opt).then(onSuccess, onFailed);
         *                     }).catch((error: Error) => {
         *                         console.error(`getPlayerRoomInfo has error: ${error.message}`);
         *                     })
         *                 }, 5 * 1000);
         *             });
         *         } else {
         *             // 客户端逻辑
         *             Event.addServerListener("TeleportResult", (result: mw.TeleportResult) => {
         *                 console.error(`Teleport has error:`);
         *                 console.error(`errorCode: ${result.errorCode}`);
         *                 console.error(`message: ${result.message}`);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static asyncTeleportToRoom(roomId: string, userIds: string[], options?: TeleportOptions): Promise<TeleportResult>;
        /**
         * @groups 服务/传送
         * @description 获取指定玩家所在的房间信息
         * @effect 调用端生效
         * @param userId usage:目标玩家的userId range: 无
         * @returns 指定玩家所在的房间信息
         * @example
         * 使用示例:创建一个名为"ServerScript"的脚本，放在场景中。代码如下：
         * ```
         * @Component
         * export default class Server extends Script {
         *     protected onStart(): void {
         *         // 传送功能需要在服务端发起，在客户端使用会报错
         *         if (SystemUtil.isServer()) {
         *             Player.onPlayerJoin.add((player: Player) => {
         *                 // 当玩家加入时，倒计时5s后发起传送
         *                 setTimeout(() => {
         *                     // 假定我们想传送到UserId为"123456"的玩家所在房间一起游玩
         *                     const targetUserId: string = "123456";
         *                     // 先用asyncGetPlayerRoomInfo获取玩家所在的房间信息
         *                     TeleportService.asyncGetPlayerRoomInfo(targetUserId).then((roomInfo) => {
         *                         // 拿到RoomId
         *                         const roomId: string = roomInfo.roomId;
         *                         // 将要传送到新场景的玩家加入数组
         *                         const playerToTeleport: string[] = [player.userId];
         *                         // 可以填充要携带的额外数据
         *                         const opt: TeleportOptions = {
         *                             teleportData: "This is test data."
         *                         }
         *                         // 调用接口传送到目标房间
         *                         TeleportService.asyncTeleportToRoom(roomId, playerToTeleport, opt);
         *                     });
         *                 }, 5 * 1000);
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static asyncGetPlayerRoomInfo(userId: string): Promise<RoomInfo>;
        /**
         * @groups 服务/传送
         * @description 获取传送的来源信息
         * @effect 只在服务端调用生效
         * @param teleportId usage:要查询的传送Id range: 无
         * @returns 玩家传送的来源信息
         * @example
         * 使用示例:创建一个名为"ServerScript"的脚本，放在场景中。代码如下：
         * ```
         * @Component
         * export default class Server extends Script {
         *     protected onStart(): void {
         *         // 获取传送来源信息的接口需要在服务端发起，在客户端使用会报错
         *         if (SystemUtil.isServer()) {
         *             Player.onPlayerJoin.add((player: Player) => {
         *                 // 用玩家的teleportId属性来查询来源信息
         *                 const sourceInfo = TeleportService.getSourceInfo(player.teleportId);
         *                 if (sourceInfo) {
         *                     console.log("Teleport from:");
         *                     console.log(`GameId: ${sourceInfo.gameId}`);
         *                     console.log(`RoomId: ${sourceInfo.roomId}`);
         *                 } else {
         *                     // 不是传送进入的当前场景，则没有来源信息
         *                     console.log("Not join by Teleport.")
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static getSourceInfo(teleportId: string): RoomInfo;
        /**
         * @groups 服务/传送
         * @description 获取调用传送接口时在TeleportOptions中设置的数据
         * @effect 只在服务端调用生效
         * @param teleportId usage:要查询的传送Id range: 无
         * @returns 传送时携带的数据
         * @example
         * 使用示例:创建一个名为"ServerScript"的脚本，放在场景中。代码如下：
         * ```
         * @Component
         * export default class Server extends Script {
         *     protected onStart(): void {
         *         // 获取传送时携带的数据的接口需要在服务端发起，在客户端使用会报错
         *         if (SystemUtil.isServer()) {
         *             Player.onPlayerJoin.add((player: Player) => {
         *                 // 用玩家的teleportId属性来查询传送时携带的数据
         *                 const data = TeleportService.getTeleportData(player.teleportId);
         *                 if (data) {
         *                     console.log(`Teleport data: ${data}`);
         *                 } else {
         *                     // 不是传送进入的当前场景，则没有携带的数据；也可能是传送时未指定数据
         *                     console.log("Not join by Teleport or no data.")
         *                 }
         *             });
         *         }
         *     }
         * }
         * ```
         */
        static getTeleportData(teleportId: string): TeleportData;
    }
}

/**
 * @author huipeng.jia
 * @description 用户建造服务
 */
declare namespace mw {
    /**
     * @author huipeng.jia
     * @groups 基础类型
     * @description UGC模板信息
     */
    type UGCTemplateInfo = {
        /** 分页用的id */
        "id": number;
        /** 内容库gameId */
        "gid": string;
        /** 模板包名 */
        "packageName": string;
        /** MW侧gameId */
        "gameIdentity": string;
        /** 模板名称 */
        "name": string;
        /** 模板版本号 */
        "version": string;
        /** 模板Icon下载链接 */
        "icon": string;
        /** 下载链接 */
        "fileUrl": {
            /** 模板工程下载链接 */
            "zipUrl": string;
            /** 模板assetDataList文件下载链接 */
            "assetDataListUrl": string;
        };
    };
    /**
     * @author huipeng.jia
     * @groups 基础类型
     * @description 发布成功的UGC消费态游戏信息
     */
    type PublishedUGCGameInfo = {
        /** 接口data为空/网络请求失败时，end会返回true */
        "end": boolean;
        /** 接口data为空/网络请求失败时，games会返回空列表 */
        "games": [
            {
                /** UGC消费态游戏的内容库gameId */
                "id": string;
                /** UGC消费态游戏的包名 */
                "packageName": string;
                /** UGC消费态游戏的名称 */
                "ugcGameName": string;
                /** banner图下载链接 */
                "banner": string;
                /** 喜欢该消费态游戏的玩家人数 */
                "loveQuantity": number;
                /** 当前玩家是否标记了喜欢 */
                "likeIt": boolean;
            }
        ];
    };
    /**
     * @author huipeng.jia
     * @groups 基础类型
     * @description 本地工程信息。如果该工程发布过UGC消费态的游戏，那gameId不为空。
     */
    type LocalUGCGameInfo = {
        /** UGC消费态游戏的MW侧gameId，"U_xxx" 格式 */
        "gameId": string;
        /** 本地工程路径，不需要做拼接，直接传给其他接口即可 */
        "path": string;
        /** 父模板游戏的内容库gameId */
        "parentId": string;
    };
    /**
     * @hidden
     * @author huipeng.jia
     * @groups 基础类型
     * @description 用户建造服务
     * @networkStatus usage: 客户端
     */
    class UGCService {
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         */
        static requestUGCTemplateList(lastId?: string): Promise<UGCTemplateInfo[]>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         */
        static requestPublishedUGCGameList(lastId?: string): Promise<PublishedUGCGameInfo>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         */
        static requestLocalUGCGameList(): Promise<LocalUGCGameInfo[]>;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         */
        static createNewLocalGameFromTemplate(targetTemplateData: UGCTemplateInfo): Promise<LocalUGCGameInfo>;
    }
}

/**
 * 文档
 * 技术方案: https://meta.feishu.cn/wiki/YWeQwk0v7ifFYekD66Sc35w4n0g
 * Order-Service: https://meta.feishu.cn/wiki/wikcnR7x0n5tvba87HpRNtyGpMc
 * 支付: https://meta.feishu.cn/docx/doxcnCDbagNZbBRDo7GRz0fLtYc
 * 客户端是否支持某功能：https://meta.feishu.cn/wiki/DOa9w5YoTi3cY7kM5LRcJM6bnZj
 */
/**
 * @author huipeng.jia
 * @description Avatar商城的应用内购服务
 */
declare namespace mw {
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description 使用placeOrder接口下单时用于描述商品信息的类型
     */
    type CommodityInfo = {
        /** 商品Id */
        commodityId: string;
        /** 商品数量 */
        number: number;
    };
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description 通过接口查询符合要求的商品列表时，会返回的对象类型。
     */
    type CommodityListObj = {
        /** 商品数据 */
        data: any;
        /** 查询出错时的错误码 */
        errorCode: number;
        /** 查询出错时的错误消息 */
        message: string;
    };
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description 充值信息
     */
    type RechargeInfo = {
        /**
         * 充值状态码
         * 200-充值成功
         */
        code: number;
        /** 状态消息，充值失败时为具体失败原因 */
        message: string;
        /** 充值金额，单位：分 */
        amount: number;
        /** 充值来源。0-代币充值，1-会员充值*/
        source: number;
        /** 商品清单。触发这次充值的订单商品信息 */
        productList?: CommodityInfo[];
    };
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description 账户余额信息
     */
    type BalanceInfo = {
        /** 代币余额 */
        coin: number;
        /** 积分余额 */
        point: number;
    };
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description 发货回调
     */
    type ShipOrderResponse = {
        /** 订单Id */
        orderId: string;
        /** 玩家UserId */
        userId: string;
        /** 发货成功返回true 购买已拥有的商品/其他服务器错误 返回false */
        status: boolean;
        /** 发货的具体信息 */
        message: string;
    };
    /**
     * @author huipeng.jia
     * @groups 服务/货币
     * @description Avatar商城的应用内购服务
     * @networkStatus usage: 客户端
     */
    class AvatarEditorService {
        /**
         * @groups 服务/货币
         * @description 异步查询积分支付是否支持
         * @effect 只在客户端调用生效
         * @returns 是否支持
         */
        static asyncGetPointPayEnabled(): Promise<boolean>;
        /**
         * @groups 服务/货币
         * @description 异步查询现金支付是否支持
         * @effect 只在客户端调用生效
         * @returns 是否支持
         */
        static asyncGetCashPayEnabled(): Promise<boolean>;
        /**
         * @groups 服务/货币
         * @description 获取余额。会同时更新代币和积分的余额。
         * @effect 只在客户端调用生效
         */
        static getAccountBalance(): void;
        /**
         * @groups 服务/货币
         * @description 获取代币和积分余额更新的委托。购买成功后/充值成功后, 都会触发
         * @effect 只在客户端调用生效
         * @returns 代币余额更新的委托。coin对应代币余额，point对应积分余额
         */
        static get onAccountBalanceUpdated(): mw.MulticastDelegate<(balance: BalanceInfo) => void>;
        /**
         * @groups 服务/货币
         * @description 下单商品并跳转支付，可以指定多个商品进行购买。如果需要携带额外信息（比如折扣token），可以加入到CommodityInfo.expand字段中
         * @description status 含义：
         * ```
         * status = 200: 订单支付成功
         * status = 408: 请求超时
         * status = 409: 处理下单回调报错
         * status = 410: 处理支付回调报错
         * status = 501: 余额不足
         * status = 502: 暂未开放购买
         * status = 503: 参数类型错误
         * status = 504: 用户取消
         * status = 505: 轮询失败，未支付成功
         * status = 506: 该版本不支持 payType
         * status = 507: 未知异常，包括但不限于网络连接失败
         * 其它：服务端返回的错误码，包括但不限于：下单，预支付，轮询等接口的报错
         * ```
         * @effect 只在客户端调用生效
         * @param commodityList usage: 商品信息  range: 依据 商品数量 而定
         * @param placeOrderResult usage: 订单状态回调
         * @param status usage: 订单状态。<br> range: 取值范围和对应含义如下
         * @param msg 描述订单状态或者错误信息。 range: 与status取值含义一致
         */
        static placeOrder(commodityList: CommodityInfo[], placeOrderResult: (status: number, msg: string, orderId: string) => void): void;
        /**
         * @groups 服务/货币
         * @description 玩家数据服务完成发货后会触发的委托
         * @effect 只在客户端调用生效
         * @returns 订单发货的委托
         */
        static get onOrderDelivered(): mw.MulticastDelegate<(resp: ShipOrderResponse) => void>;
        /**
         * @groups 服务/货币
         * @description 拉起充值页面
         * @effect 只在客户端调用生效
         */
        static promptRecharge(): void;
        /**
         * @groups 服务/货币
         * @description 玩家充值时会触发的委托
         * @effect 只在客户端调用生效
         * @returns 充值时会触发的委托
         */
        static get onRecharge(): mw.MulticastDelegate<(info: RechargeInfo) => void>;
        /**
         * @groups 服务/货币
         * @description 获取商品列表
         * @effect 只在客户端调用生效
         * @param tagIds usage: 用于筛选商品的Tag数组
         * @returns 商品列表
         */
        static asyncGetCommodityListByTag(tagIds: number[]): Promise<CommodityListObj>;
        /**
         * @groups 服务/货币
         * @description 获取我可使用的物品列表
         * @effect 只在客户端调用生效
         * @param tagIds usage: 用于筛选商品的Tag数组
         * @returns 物品列表
         */
        static asyncGetMyItemsListByTag(tagIds: number[]): Promise<CommodityListObj>;
        /**
         * @groups 服务/货币
         * @description 通过资源Id获取商品列表
         * @effect 只在客户端调用生效
         * @param assetIds usage: 用于筛选商品的AssetId数组
         * @returns 商品列表
         */
        static asyncGetCommodityByAssetIds(assetIds: string[]): Promise<CommodityListObj>;
        /**
         * @groups 服务/货币
         * @description 通过物品Id获取商品列表
         * @effect 只在客户端调用生效
         * @param itemIds usage: 用于筛选商品的ItemId数组
         * @returns 商品列表
         */
        static asyncGetCommodityListByItemIds(itemIds: number[]): Promise<CommodityListObj>;
        /**
         * @groups 服务/货币
         * @description 本地图片路径转存成网络图
         * @effect 只在客户端调用生效
         * @param locImgPath usage: 本地图片文件路径 range: 无
         * @param imgName usage: 本地图片文件名 range: 无
         * @returns 成功返回url，失败返回null
         */
        static asyncDumpImg(locImgPath: string, imgName: string): Promise<string>;
        /**
         * @groups 服务/货币
         * @description 保存平台形象，并更新全身照。是否更新头像，取决于入参。
         * @effect 只在客户端调用生效
         * @param targetNPC usage: 目标NPC
         * @param updateHead usage: 是否更新头像。不影响形象保存和全身照的更新。default: true
         * @returns 返回结果为code，取值和含义如下：
         * ```
         * 1 - 成功。指定的操作均成功
         * 2 - 保存形象数据失败
         * 3 - 保存全身照失败
         * 4 - 保存头像失败。如果入参updateHead = false或者用户属性中没有配置为"1"，忽略保存头像步骤，不会上报该code
         * 5 - 其它错误
         * ```
         */
        static asyncSaveAvatarAndUpdateProfile(targetNPC: mw.Character, updateHead?: boolean): Promise<number>;
        /**
         * @groups 服务/货币
         * @description 设置角色编辑器按钮可见性
         * @effect 只在客户端调用生效
         * @param visible usage: true表示可见，false不可见
         */
        static setAvatarEditorButtonVisible(visible: boolean): void;
        /**
         * @groups 服务/货币
         * @description 打开角编商城
         * @effect 只在客户端调用生效
         * @param extraInfo usage: 额外的传参 default: undefined
         * @returns 打开结果
         */
        static asyncOpenAvatarEditorModule(extraInfo?: any): Promise<boolean>;
        /**
         * @groups 服务/货币
         * @description 打开角编商城
         * @effect 只在客户端调用生效
         * @returns 异步void
         */
        static asyncCloseAvatarEditorModule(): Promise<void>;
        /**
         * @groups 服务/货币
         * @description 角编商城状态发生变化时会触发的委托
         * @effect 只在客户端调用生效
         * @networkStatus usage:客户端
         * @returns 角编商城状态发生变化时会触发的委托
         */
        static get avatarServiceDelegate(): mw.MulticastDelegate<(eventName: string, ...params: unknown[]) => void>;
    }
}

declare namespace mw {
    /**
     * @author xiangkun.sun
     * @groups 服务/调试
     * @instance
     * @description debug调试服务
     * @networkStatus usage: 双端
     */
    class DebugService {
        /**
         * @groups 服务/调试
         * @description 获取当前项目所有TS脚本内存占用
         * @effect 调用端生效
         * @returns HeapStatistics 内存数据
         * @example
         * 使用示例:创建一个名为DebugExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，客户端及服务端日志会每2秒输出ts内存的使用情况
         * ```
         * @Component
         * export default class DebugExample extends Script {
         *
         *     protected onStart(): void {
         *         TimeUtil.setInterval(() => {
         *             const heapStatistics = DebugService.getHeapStatistics();
         *             console.log("---------当前ts内存使用情况---------");
         *             console.log("总堆大小", heapStatistics.totalHeapSize);
         *             console.log("可执行的总堆大小", heapStatistics.totalHeapSizeExecutable);
         *             console.log("已使用堆大小", heapStatistics.usedHeapSize);
         *             console.log("动态分配的内存", heapStatistics.memoryAllocated ? heapStatistics.memoryAllocated : 0);
         *             console.log("动态内存分配峰值 ", heapStatistics.peakMemoryAllocated ? heapStatistics.peakMemoryAllocated : 0);
         *         }, 2);
         *     }
         * }
         * ```
         */
        static getHeapStatistics(): mw.HeapStatistics;
    }
}

declare namespace mw {
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
    class EffectService {
        private constructor();
        /**
         * @description 检查玩家参数
         */
        private static checkPlayParams;
        /**
         * @groups 场景/特效
         * @description 在一个GameObject上播放特效
         * @effect 调用端生效|服务端调用自动广播
         * @param assetId usage: 播放的唯一标识，音效资源 ID，等同于 playId。区别是 playId 传递的是 number 类型，如：4330；assetId 传字符串类型 "4330" 即可。  range: 字符串长度依据资源 ID 长度而定
         * @param target usage: 目标GameObject
         * @param params usage: 播放参数，slotType-挂点类型(默认null)，loopCount-循环次数(默认1)，duration-播放时长（单位:秒，默认0，设置此字段将忽略loopCount），position-坐标偏移(默认Vector.zero)，rotation-旋转偏移(默认Rotation.zero)，scale-缩放(Vector.one) default: undefined
         * @returns 本次播放的唯一标识，可用于停止播放，如果返回0，说明参数错误，播放失败
         * @example
         * 使用示例:创建一个名为EffectExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在所有玩家的身上播放一个火焰特效
         * ```
         * @Component
         * export default class EffectExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         const fireAssetId = "4330";
         *         mw.Player.getAllPlayers().forEach((player) => {
         *             const playId = EffectService.playOnGameObject(fireAssetId, player.character, { loopCount: 0});
         *         })
         *     }
         * }
         * ```
         */
        static playOnGameObject(assetId: string, target: mw.GameObject, params?: {
            slotType?: mw.HumanoidSlotType;
            loopCount?: number;
            duration?: number;
            position?: mw.Vector;
            rotation?: mw.Rotation;
            scale?: mw.Vector;
        }): number;
        /**
         * @groups 场景/特效
         * @description 在一个位置播放特效
         * @effect 调用端生效|服务端调用自动广播
         * @param assetId usage: 播放的唯一标识，音效资源 ID，等同于 playId。区别是 playId 传递的是 number 类型，如：4330；assetId 传字符串类型 "4330" 即可。  range: 字符串长度依据资源 ID 长度而定
         * @param position usage: 世界坐标
         * @param params usage: 播放参数 <br> default: 查看以下数值
         * @param loopCount usage: 循环次数 <br> default: 1
         * @param duration usage: 播放时长 单位:秒。 设置此字段将忽略loopCount，<br> default: 0
         * @param rotation usage: 旋转偏移 <br> default: Rotation.zero
         * @param scale usage: scale-缩放(Vector.one) <br> default: undefined
         * @returns 本次播放的唯一标识，可用于停止播放，如果返回0，说明参数错误，播放失败
         * @example
         * 使用示例:创建一个名为EffectExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在坐标(0, 0, 200)处播放一个火焰特效
         * ```
         * @Component
         * export default class EffectExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         const fireAssetId = "4330";
         *         const playId = EffectService.playAtPosition(fireAssetId, new mw.Vector(0, 0, 200), { loopCount: 0});
         *     }
         * }
         * ```
         */
        static playAtPosition(assetId: string, position: mw.Vector, params?: {
            loopCount?: number;
            duration?: number;
            rotation?: mw.Rotation;
            scale?: mw.Vector;
        }): number;
        /**
         * @groups 场景/特效
         * @description 停止一个正在播放的特效
         * @effect 调用端生效|服务端调用自动广播
         * @param playId usage: 播放的唯一标识，音效资源 ID，等同于 assetId。区别是 playId 传递的是 number 类型，如：4330；assetId 传字符串类型 "4330" 即可。  range: 字符串长度依据资源 ID 长度而定  type:整数
         * @example
         * 使用示例: 创建一个名为EffectExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在场景中播放一个火焰特效，5秒后停止特效
         * ```
         * @Component
         * export default class EffectExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         const fireAssetId = "4330";
         *         const playId = EffectService.playAtPosition(fireAssetId, new mw.Vector(0, 0, 200), { loopCount: 0});
         *         // 5秒后停止特效
         *         TimeUtil.delaySecond(5).then(() => {
         *             EffectService.stop(playId);
         *         })
         *     }
         * }
         * ```
         */
        static stop(playId: number): void;
        /**
         * @groups 场景/特效
         * @description 停止所有特效
         * @effect 调用端生效|服务端调用自动广播
         * @example
         * 使用示例:创建一个名为EffectExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在场景中播放三个火焰特效，5秒后停止所有特效
         * ```
         * @Component
         * export default class EffectExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         const fireAssetId = "4330";
         *         const playId1 = EffectService.playAtPosition(fireAssetId, new mw.Vector(0, 0, 200), { loopCount: 0});
         *         const playId2 = EffectService.playAtPosition(fireAssetId, new mw.Vector(200, 0, 200), { loopCount: 0});
         *         const playId3 = EffectService.playAtPosition(fireAssetId, new mw.Vector(400, 0, 200), { loopCount: 0});
         *         // 5秒后停止所有特效
         *         TimeUtil.delaySecond(5).then(() => {
         *             EffectService.stopAll();
         *         })
         *     }
         * }
         * ```
         */
        static stopAll(): void;
        /**
         * @groups 场景/特效
         * @description 根据播放id获取一个特效对象
         * @effect 只在客户端调用生效
         * @param playId usage: 播放的唯一标识，音效资源 ID，等同于 assetId。区别是 playId 传递的是 number 类型，如：4330；assetId 传字符串类型 "4330" 即可。  range: 字符串长度依据资源 ID 长度而定  type:整数
         * @returns Particle对象的gameObject
         * @example
         * 使用示例:创建一个名为EffectExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在场景中播放一个火焰特效，5秒后获取该特效对象并移动到(200, 0, 200)位置
         * ```
         * @Component
         * export default class EffectExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         const fireAssetId = "4330";
         *         const playId = EffectService.playAtPosition(fireAssetId, new Vector(0, 0, 200), { loopCount: 0});
         *         // 5秒后移动该特效到(200, 0, 200)位置
         *         TimeUtil.delaySecond(5).then(() => {
         *             EffectService.getEffectById(playId).then((effect) => {
         *                 effect.worldTransform.position = new Vector(200, 0, 200);
         *             });
         *         });
         *     }
         * }
         * ```
         */
        static getEffectById(playId: number): Promise<mw.Effect>;
        /**
         * @groups 场景/特效
         * @description 停止目标对象上所有资源 Id 的特效
         * @effect 调用端生效|服务端调用自动广播
         * @param source usage: 特效源，playEffect 的第一个参数。range:
         * @param target usage: 目标对象(Player或NPC或GameObject)
         */
        static stopEffectFromHost(source: string, target: mw.Player | mw.GameObject): void;
    }
}

declare namespace mw {
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
    class ChatBubble {
        /**
         * @groups 服务/社交
         * @description 获取是否开启气泡功能的布尔值。
         * @example
         * 使用示例:创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，正方体头顶显示气泡。
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             UIService.show(newUI);
         *         }
         *     }
         * }
         *
         * class newUI extends UIScript{
         *     button:StaleButton;
         *     protected onStart() {
         *
         *         this.canUpdate = false;
         *         this.layer = UILayerScene;
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *         this.button.onClicked.add(async ()=>{
         *             ChatBubble.bubbleEnabled = true;
         *         });
         *     }
         * }
         * ```
         */
        static get bubbleEnabled(): boolean;
        /**
         * @groups 服务/社交
         * @description 设置是否开启气泡功能。
         * @description 这是一个总开关，当开启时，物体或者角色说话时才会有气泡效果。
         * @param enable usage:是否开启气泡功能。<br> 默认为 false 关闭的状态。是使用角色聊天气泡功能，需要设置为 true 。
         */
        static set bubbleEnabled(enable: boolean);
        /**
         * @groups 服务/社交
         * @description 获取说话时头顶气泡共存数量。
         * @description 如果number=5，意味着可以同时存在五个气泡。
         * @description 默认是三个气泡共存。
         * @example
         * 使用示例:创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，正方体头顶显示气泡。
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             UIService.show(newUI);
         *         }
         *     }
         * }
         *
         * class newUI extends UIScript{
         *     button:StaleButton;
         *     protected onStart() {
         *
         *         this.canUpdate = false;
         *         this.layer = UILayerScene;
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *         this.button.onClicked.add(async ()=>{
         *             ChatBubble.maxParallelBubbles = 1;
         *         });
         *     }
         * }
         * ```
         */
        static get maxParallelBubbles(): number;
        /**
         * @groups 服务/社交
         * @description 设置说话时头顶气泡共存数量。
         * @description 可以根据自己的喜好设置气泡共存数量。
         */
        static set maxParallelBubbles(num: number);
        /**
         * @groups 服务/社交
         * @description 获取气泡背景颜色
         * @example
         * 使用示例:创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，正方体头顶显示气泡。
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             UIService.show(newUI);
         *         }
         *     }
         * }
         *
         * class newUI extends UIScript{
         *     button:StaleButton;
         *     protected onStart() {
         *
         *         this.canUpdate = false;
         *         this.layer = UILayerScene;
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *         this.button.onClicked.add(async ()=>{
         *             ChatBubble.bubbleBackgroundColor = LinearColor.green;
         *         });
         *     }
         * }
         * ```
         */
        static get bubbleBackgroundColor(): mw.LinearColor;
        /**
         * @groups 服务/社交
         * @description 设置气泡背景颜色
         */
        static set bubbleBackgroundColor(color: mw.LinearColor);
        /**
         * @groups 服务/社交
         * @description 获取气泡持续时长
         * @example
         * 使用示例:创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，正方体头顶显示气泡。
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             UIService.show(newUI);
         *         }
         *     }
         * }
         *
         * class newUI extends UIScript{
         *     button:StaleButton;
         *     protected onStart() {
         *
         *         this.canUpdate = false;
         *         this.layer = UILayerScene;
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *         this.button.onClicked.add(async ()=>{
         *             ChatBubble.bubbleDuration = 1;
         *         });
         *     }
         * }
         * ```
         */
        static get bubbleDuration(): number;
        /**
         * @description 设置气泡持续时长
         */
        static set bubbleDuration(time: number);
        /**
         * @description 获取气泡文字字体
         * @example
         * 使用示例:创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，正方体头顶显示气泡。
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             UIService.show(newUI);
         *         }
         *     }
         * }
         *
         * class newUI extends UIScript{
         *     button:StaleButton;
         *     protected onStart() {
         *
         *         this.canUpdate = false;
         *         this.layer = UILayerScene;
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *         this.button.onClicked.add(async ()=>{
         *             ChatBubble.bubbleTextFont = UIFontGlyph.BoldItalics;
         *         });
         *     }
         * }
         * ```
         */
        static get bubbleTextFont(): mw.UIFontGlyph;
        /**
         * @description 设置气泡文字字体
         */
        static set bubbleTextFont(textFont: mw.UIFontGlyph);
        /**
         * @description 获取气泡文字颜色
         * @example
         * 使用示例:创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，正方体头顶显示气泡。
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             UIService.show(newUI);
         *         }
         *     }
         * }
         *
         * class newUI extends UIScript{
         *     button:StaleButton;
         *     protected onStart() {
         *
         *         this.canUpdate = false;
         *         this.layer = UILayerScene;
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *         this.button.onClicked.add(async ()=>{
         *             ChatBubble.bubbleTextColor = LinearColor.red;
         *         });
         *     }
         * }
         * ```
         */
        static get bubbleTextColor(): mw.LinearColor;
        /**
         * @description 设置气泡文字颜色
         */
        static set bubbleTextColor(color: mw.LinearColor);
        /**
         * @description 获取气泡文字大小
         * @example
         * 使用示例:创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，正方体头顶显示气泡。
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             UIService.show(newUI);
         *         }
         *     }
         * }
         *
         * class newUI extends UIScript{
         *     button:StaleButton;
         *     protected onStart() {
         *
         *         this.canUpdate = false;
         *         this.layer = UILayerScene;
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *         this.button.onClicked.add(async ()=>{
         *             ChatBubble.bubbleTextSize = 30;
         *         });
         *     }
         * }
         * ```
         */
        static get bubbleTextSize(): number;
        /**
         * @description 设置气泡文字大小
         */
        static set bubbleTextSize(size: number);
        /**
         * @description 获取气泡位置偏移
         * @example
         * 使用示例:创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，正方体头顶显示气泡。
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             UIService.show(newUI);
         *         }
         *     }
         * }
         *
         * class newUI extends UIScript{
         *     button:StaleButton;
         *     protected onStart() {
         *
         *         this.canUpdate = false;
         *         this.layer = UILayerScene;
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *         this.button.onClicked.add(async ()=>{
         *             ChatBubble.bubblePositionOffset = new Vector(0,0,50);
         *         });
         *     }
         * }
         * ```
         */
        static get bubblePositionOffset(): mw.Vector;
        /**
         * @description 设置气泡位置偏移
         */
        static set bubblePositionOffset(num: mw.Vector);
        /**
         * @description 获取气泡间隔距离
         * @example
         * 使用示例:创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，正方体头顶显示气泡。
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             UIService.show(newUI);
         *         }
         *     }
         * }
         *
         * class newUI extends UIScript{
         *     button:StaleButton;
         *     protected onStart() {
         *
         *         this.canUpdate = false;
         *         this.layer = UILayerScene;
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *         this.button.onClicked.add(async ()=>{
         *             ChatBubble.bubbleDisplayDistance = 100;
         *         });
         *     }
         * }
         * ```
         */
        static get bubbleDisplayDistance(): number;
        /**
         * @description 设置气泡间隔距离
         */
        static set bubbleDisplayDistance(num: number);
        /**
         * @description 显示气泡
         * @effect 调用端生效
         * @param parent usage: 气泡挂载的 gameobject 物体
         * @param message usage: 气泡显示的文字  <br> range: 不限制
         * @example
         * 使用示例:创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，正方体头顶显示气泡。
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             UIService.show(newUI);
         *         }
         *     }
         * }
         *
         * class newUI extends UIScript{
         *     button:StaleButton;
         *     protected onStart() {
         *
         *         this.canUpdate = false;
         *         this.layer = UILayerScene;
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *         this.button.onClicked.add(async ()=>{
         *             let cube = GameObject.asyncFindGameObjectById("0AB6A7D9");
         *             ChatBubble.displayChatBubbble(await cube, "hello");
         *         });
         *     }
         * }
         * ```
         */
        static displayChatBubbble(parent: mw.GameObject, message: string): void;
        /**
         * @description 当发出某一段文字时触发的委托
         */
        static get onChatBubbleDisplay(): mw.MulticastDelegate<(message: string, parent: mw.GameObject) => void>;
        /**
         * @description 当收到某一段文字时触发的委托
         */
        static get onMessageReceive(): mw.MulticastDelegate<(mesage: string) => void>;
    }
}

declare namespace mw {
    /**
     * @author mengyuan.hao
     * @description 收到MGS事件调用
     * @groups 数据处理
     */
    type ChatEvent = (jsonData: string) => void;
    /**
     * @author mengyuan.hao
     * @description 发送消息的结果
     * @groups 基础类型
     */
    type BroadcastMessageResult = {
        /** 发送消息的状态 */
        code: MessageState;
        /** 详细信息 */
        message: string;
    };
    /**
     * @author mengyuan.hao
     * @description 发送消息的类型
     * @groups 基础类型
     */
    enum MessageType {
        /** 房间消息，发送到当前房间 */
        Room = 0,
        /** 游戏消息，发送到当前游戏的所有房间 */
        Game = 1
    }
    /**
     * @author mengyuan.hao
     * @description 发送消息的状态
     * @groups 基础类型
     */
    enum MessageState {
        /** 消息发送成功 */
        Success = 200,
        /** 要发送的文本有违规内容 */
        ContentError = 3307002,
        /** 文档中有错误的富文本标签 */
        LabelError = 3307003,
        /** 发送的文本中纯文字的长度大于规定长度 */
        SizeError = 3307004,
        /** 其它原因导致发送失败 */
        Error = -1
    }
    /**
     * @author mengyuan.hao
     * @groups 服务/社交
     * @description 聊天服务
     * @description 语音聊天功能需要在mobile端才可生效，pie没有效果。可以使用手机端测试。
     * @networkStatus usage: 客户端
    */
    class ChatService {
        /**
         * @groups 服务/社交
         * @description 发送快捷语消息，自动携带发送者名称。与聊天框中输入语言一致。不支持富文本。
         * @description note: 开启聊天框聊天功能，接口才可生效
         * @effect  只在客户端调用生效
         * @returns 发送消息的结果
         * @param content usage:消息内容  range:小于 128 个字符串长度
         * @example
         * 使用示例:创建一个名为"messageExample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在场景中看到在聊天框中显示"asyncBroadcastMessage is called"的效果。代码如下：
         * ```
         * @Component
         * export default class NewExample extends Script {
         *
         *     protected onStart(): void {
         *         if (SystemUtil.isClient()){
         *             this.test();
         *         }
         *         if(SystemUtil.isServer()){
         *             Event.addClientListener("bro_two",()=>{
         *                 ChatService.asyncBroadcastMessage(MessageType.Room,"bro").then(()=>{
         *                     console.log("asyncBroadcastMessage is called");
         *                 });
         *             });
         *         }
         *
         *         if(SystemUtil.isClient()){
         *             Event.addLocalListener("bro",()=>{
         *                 Event.dispatchToServer("bro_two");
         *             });
         *         }
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
         *     public buttonTwo: StaleButton;
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
         *         this.button.position = new Vector2(1000, 310);
         *         this.button.size = new Vector2(200, 50);
         *         this.button.text = "SendMes";
         *         this.button.transitionEnable = true;
         *         this.button.pressedImagColor = LinearColor.red;
         *         this.button.visibility = SlateVisibility.Visible;
         *         this.button.onClicked.add(() => {
         *             console.log("btn ")
         *             ChatService.asyncSendMessage("hello").then(()=>{
         *                 console.log("asyncSendMessage is called");
         *             });
         *             if (fun) {
         *                 fun();
         *             }
         *         });
         *         this.buttonTwo = StaleButton.newObject(rootCanvas);
         *         this.buttonTwo.position = new Vector2(1700, 310);
         *         this.buttonTwo.size = new Vector2(150, 50);
         *         this.buttonTwo.text = "BroMes";
         *         this.buttonTwo.transitionEnable = true;
         *         this.buttonTwo.pressedImagColor = LinearColor.red;
         *         this.buttonTwo.visibility = SlateVisibility.Visible;
         *         this.buttonTwo.onClicked.add(() => {
         *             console.log("btn ")
         *             Event.dispatchToLocal("bro");
         *             if (fun) {
         *                 fun();
         *             }
         *         });
         *
         *     }
         * }
         * ```
         */
        static asyncSendMessage(content: string): Promise<BroadcastMessageResult>;
        /**
         * @groups 服务/社交
         * @description 发送富文本消息到聊天窗口中，禁止回调中调用该接口。
         * @description 限制每个消息发送从第一个消息发送开始计时60秒内最多发送60条消息。定时器清空计数后下一次发送消息再次开始计数。
         * @description note: 开启聊天框聊天功能，接口才可生效
         * @effect  只在服务端调用生效
         * @returns 发送消息的结果
         * @param type usage:发送消息类型
         * @param content usage:消息内容  range:小于 1200 个字符串长度
         */
        static asyncBroadcastMessage(type: MessageType, content: string): Promise<BroadcastMessageResult>;
        /**
         * @groups 服务/社交
         * @description 获取指定用户聊天权限
         * @effect 只在客户端调用生效
         * @param userId usage: 用户 ID  range: 不限制
         * @returns 是否获取成功
         */
        static getUserCanChat(userId: string): Promise<boolean>;
        /**
         * @groups 服务/社交
         * @description 设置指定用户聊天权限
         * @effect 只在客户端调用生效
         * @param userId usage: 用户 ID  range: 根据 ID 长度决定
         * @param canChat usage: 是否开启用户聊天权限。
         * @returns 是否设置成功
         */
        static asyncsetUserCanChat(userId: string, canChat: boolean): Promise<boolean>;
        /**
         * @groups 服务/社交
         * @description 语音聊天委托,每次语音的回调
         * @effect  只在客户端调用生效
         * @returns 玩家语音是否设置成功。
         */
        static get onVoiceStatusChange(): mw.MulticastDelegate<(userId: string, lastVolume: number, currentVolume: number, isOpenAudio: boolean) => void>;
        /**
         * @groups 服务/社交
         * @description 获取是否既不能听也不能说功能，false为否既不能听也不能说；true为既可以听也可以说。
         * @description note: 开启语音功能，接口才可生效
         * @effect  只在客户端调用生效
         * @returns 玩家语音是否设置成功。
         */
        static get voiceChatEnabled(): boolean;
        /**
         * @groups 服务/社交
         * @description 设置既不能听也不能说功能，false为否既不能听也不能说；true为既可以听也可以说。
         * @description note: 开启语音功能，接口才可生效
         * @effect  只在客户端调用生效
         * @returns 玩家语音是否设置成功。
         * @param voice usage: 开启或者关闭 <br> default:true
         */
        static set voiceChatEnabled(voice: boolean);
        /**
         * @groups 服务/社交
         * @description 一键屏蔽所有玩家的语音。
         * @description note: 开启语音功能，接口才可生效
         * @effect  只在客户端调用生效
         * @returns 玩家语音是否设置成功。
         * @example
         * 使用示例:创建一个名为"NewScript"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，可屏蔽所有玩家语音，无法在editor模式下调试。代码如下：
         * ```
         * @Component
         *  export default class NewScript extends Script {
         *
         *      protected onStart(): void {
         *          ChatService.asyncMuteAll().then(()=>{console.log("asyncMuteAll")});
         *      }
         *  }
         * ```
         */
        static asyncMuteAll(): Promise<boolean>;
        /**
         * @groups 服务/社交
         * @description 屏蔽指定玩家的声音
         * @description note: 开启语音功能，接口才可生效
         * @effect  只在客户端调用生效。
         * @returns 玩家语音是否设置成功。
         * @param userId usage: 玩家的 userid <br> default:null  range: 依据 userId 长度而定
         * @example
         * 使用示例:创建一个名为"NewScript"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，可屏蔽所有玩家语音，无法在editor模式下调试。代码如下：
         * ```
         * @Component
         *  export default class NewScript extends Script {
         *
         *      protected onStart(): void {
         *          ChatService.asyncMutePlayer(Player.localPlayer.userId).then(()=>{console.log("asyncMutePlayer")});
         *      }
         *  }
         * ```
         */
        static asyncMutePlayer(userId: string): Promise<boolean>;
        /**
         * @groups 服务/社交
         * @description 一键打开所有玩家的声音，取消屏蔽
         * @description note: 开启语音功能，接口才可生效
         * @effect  只在客户端调用生效
         * @returns 语音是否设置成功。
         * @example
         * 使用示例:创建一个名为"NewScript"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，可屏蔽所有玩家语音，无法在editor模式下调试。代码如下：
         * ```
         * @Component
         *  export default class NewScript extends Script {
         *
         *      protected onStart(): void {
         *          ChatService.asyncUnmuteAll().then(()=>{console.log("asyncUnmuteAll")});
         *      }
         *  }
         * ```
         */
        static asyncUnmuteAll(): Promise<boolean>;
        /**
         * @groups 服务/社交
         * @description 打开指定玩家的声音，取消屏蔽
         * @description note: 开启语音功能，接口才可生效
         * @effect  只在客户端调用生效
         * @returns 语音是否设置成功。
         * @param userId usage: 玩家的 userid <br> default:null  range: 依据 userId 的长度而定
         * @example
         * 使用示例:创建一个名为"NewScript"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，可屏蔽所有玩家语音，无法在editor模式下调试。代码如下：
         * ```
         * @Component
         *  export default class NewScript extends Script {
         *
         *      protected onStart(): void {
         *          ChatService.asyncUnmutePlayer(Player.localPlayer.userId).then(()=>{console.log("asyncUnmutePlayer")});
         *      }
         *  }
         * ```
         */
        static asyncUnmutePlayer(userId: string): Promise<boolean>;
        /**
         * @groups 服务/社交
         * @description 打开自己的语音。
         * @description note: 开启语音功能，接口才可生效
         * @effect  只在客户端调用生效
         * @returns 语音是否设置成功。
         * @example
         * 使用示例:创建一个名为"NewScript"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，可屏蔽所有玩家语音，无法在editor模式下调试。代码如下：
         * ```
         * @Component
         *  export default class NewScript extends Script {
         *
         *      protected onStart(): void {
         *          ChatService.asyncOpenMic().then(()=>{console.log("asyncOpenMic")});
         *      }
         *  }
         * ```
         */
        static asyncOpenMic(): Promise<boolean>;
        /**
         * @groups 服务/社交
         * @description 关闭自己的语音。
         * @description note: 开启语音功能，接口才可生效
         * @effect  只在客户端调用生效
         * @returns 语音是否设置成功。
         * @example
         * 使用示例:创建一个名为"NewScript"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，可屏蔽所有玩家语音，无法在editor模式下调试。代码如下：
         * ```
         * @Component
         *  export default class NewScript extends Script {
         *
         *      protected onStart(): void {
         *          ChatService.asyncCloseMic().then(()=>{console.log("asyncCloseMic")});
         *      }
         *  }
         * ```
         */
        static asyncCloseMic(): Promise<boolean>;
        /**
         * @groups 服务/社交
         * @description 是否打开或者折叠游戏中的聊天框。true是打开；false是折叠。
         * @effect 只在客户端调用生效
         * @param isCollapsed usage:折叠框打开关闭布尔参数
         * @returns 返回打开折叠是否成功。
         * @example
         * 使用示例:创建一个名为"ChatExample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，此效果只能在mobile端测试，代码如下：
         * ```
         * @Component
         *  export default class ChatExample extends Script {
         *
         *      protected onStart(): void {
         *           ChatService.asyncCollapseChatWindow(true);
         *      }
         *  }
         * ```
         */
        static asyncCollapseChatWindow(isCollapsed: boolean): Promise<boolean>;
        /**
         * @groups 服务/社交
         * @description 打开或关闭某个客户端的聊天功能。true是打开；false是关闭。
         * @effect 只在客户端调用生效
         * @param isEnabled usage:聊天功能打开关闭布尔参数
         * @returns 聊天功能打开或者关闭是否成功。
         * @example
         * 使用示例:创建一个名为"ChatExample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，此效果只能在mobile端测试，代码如下：
         * ```
         * @Component
         *  export default class ChatExample extends Script {
         *
         *      protected onStart(): void {
         *           ChatService.asyncEnableChatWindow(true);
         *      }
         *  }
         * ```
         */
        static asyncEnableChatWindow(isEnabled: boolean): Promise<boolean>;
    }
}

/**
 * @author huipeng.jia
 * @description 游戏管理器
 * @description MGS以及玩家信息、数据、头像等相关API。
 * @description MGS = Meta Game Service, 是编辑器提供给开发者的一些原生服务，如发布游戏后的左上角聊天、好友相关信息服务。
 */
declare namespace mw {
    /**
     * @author huipeng.jia
     * @description 收到MGS事件调用
     * @groups 基础类型
     */
    type MGSEvent = (jsonData: string) => void;
    /**
     * @author huipeng.jia
     * @groups 服务/社交
     * @description MGS以及玩家信息、数据、头像等相关API。
     * MGS = Meta Game Service, 是编辑器提供给开发者的一些原生服务，如发布游戏后的左上角聊天、好友相关信息服务。
     * @networkStatus usage: 客户端
     */
    class RoomService {
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @groups 服务/社交
         * @description 获取当前环境是否支持MGS功能
         * @effect  只在客户端调用生效
         * @returns 当前环境是否支持MGS功能
         */
        static isSupported(): boolean;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:SystemUtil.roomId
         * @groups 服务/社交
         * @description 获取游戏的RoomService分配的RoomId
         * @effect  只在客户端调用生效
         * @returns 游戏的RoomService分配的RoomId
         */
        static getRoomId(): string;
        /**
         * @groups 服务/社交
         * @description 将某一玩家踢下线
         * @effect 只在服务端调用生效
         * @param player usage: 踢下线的 Player
         * @param message usage: 踢出玩家时触发退出 UI 弹出的信息 default:null  range: 提示适合长度的信息即可
         * @example
         * 使用示例: 创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下 G 键，踢出角色。
         * ```
         * @Component
         * export default class NewScript extends Script {
         *
         *
         *     protected onStart(): void {
         *         if(SystemUtil.isServer()) {
         *             Player.spawnDefaultCharacter();
         *         }
         *
         *        let player = await mw.Player.asyncGetLocalPlayer();
         *
         *         if(SystemUtil.isClient()) {
         *            mw.InputUtil.onKeyDown(Keys.G,()=>{
         *              mw.Event.dispatchToServer(`AddPlayerPassable`,player);
         *            })
         *         }
         *        if(SystemUtil.isServer()) {
         *            mw.Event.addClientListener(`AddPlayerPassable`,(player : Player)=>{
         *               RoomService.kick(player);
         *            })
         *         }
         *    }
         * }
         * ```
         */
        static kick(player: mw.Player | number, message?: string): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @groups 服务/社交
         * @description 获取 MGS 平台的 RoomId
         * @effect  只在客户端调用生效
         * @returns MGS 平台的 RoomId
         */
        static getMGSRoomId(): string;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @groups 服务/社交
         * @description 若需要查看 app 玩家的资料信息，可通过调用 showUserProfile 进行查看，app会弹出资料卡片弹窗
         * @effect  只在客户端调用生效
         * @precautions 只在移动端生效
         * @param resp usage:app的回调
         * @param userId usage:要显示的用户的 userId  range:无
         */
        static showUserProfile(resp: mw.MGSResponse, userId: string): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @groups 服务/社交
         * @description 向 app 发起 showFloatingLayer 来展开悬浮层的内容，可展开聊天/好友功能
         * @effect  只在客户端调用生效
         * @precautions 只在移动端生效
         * @param resp usage:app的回调
         * @param tab usage:悬浮层功能位置 range:取值(0: 聊天 1: 好友) type:整数
         */
        static showFloatingLayer(resp: mw.MGSResponse, tab: number): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @groups 服务/社交
         * @description 游戏方可调用 showExitGameDialog 来显示退出游戏确认框
         * @effect  只在客户端调用生效
         * @precautions 只在移动端生效
         * @param resp usage:app的回调
         */
        static showExitGameDialog(resp: mw.MGSResponse): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @groups 服务/社交
         * @description 游戏方可调用 joinAudio 加入语音频道，游戏用户可使用语音服务（可说话、可听到其他游戏用户声音）
         * @effect  只在客户端调用生效
         * @precautions 只在移动端生效
         * @param resp usage:app的回调
         */
        static joinAudio(resp: mw.MGSResponse): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @groups 服务/社交
         * @description 向app发起SavePortrait并获得回调
         * @effect  只在客户端调用生效
         * @precautions 只在移动端生效
         * @param resp usage:app的回调
         * @param mgsData usage:要保存的 mgs 数据 range:无
         */
        static requestSavePortrait(resp: mw.MGSResponse, mgsData: string): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @groups 服务/社交
         * @description 向app发起SaveImage并获得回调
         * @effect  只在客户端调用生效
         * @precautions 只在移动端生效
         * @param resp usage:app的回调
         * @param mgsData usage:要保存的图片 Url 地址  range:无
         */
        static requestSaveImage(resp: mw.MGSResponse, mgsData: string): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @groups 服务/社交
         * @description 向 app 发起 shareScreenshot 并获得回调
         * @effect  只在客户端调用生效
         * @precautions 只在移动端生效
         * @param resp usage:app的回调
         * @param mgsData usage:要保存的图片 Url 地址  range:无
         */
        static requestShareScreenShot(resp: mw.MGSResponse, mgsData: string): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @groups 服务/社交
         * @description 游戏方调用 reportLogInfo 接口上报运营所需的埋点数据
         * @effect  只在客户端调用生效
         * @precautions 只在移动端生效，数据需要是json格式
         * @param eventName usage:事件名称  range:字符串长度不做限制，制定适合长度的字符串即可
         * @param eventDesc usage:事件描述  range:字符串长度不做限制，制定适合长度的字符串即可
         * @param jsonData usage:发送的 json 数据  range:字符串长度不做限制，制定适合长度的字符串即可
         */
        static reportLogInfo(eventName: string, eventDesc: string, jsonData: string): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @groups 服务/社交
         * @description 获取当前的环境
         * @effect  只在客户端调用生效
         * @precautions 只在移动端生效
         * @param resp usage:获取到的当前的环境
         */
        static getCurrentEnvironment(resp: mw.MGSResponse): void;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:035 reason:接口废弃 replacement:
         * @groups 服务/社交
         * @description 注册聊天回调
         * @effect  只在客户端调用生效
         * @precautions 只在移动端生效
         * @param callback usage:有消息时的触发函数
         */
        static registerMGSChatMessageEvent(callback: MGSEvent): void;
    }
}

declare namespace mw {
    /**
     * @author shilong.wang
     * @groups 场景/音效
     * @description 音效管理器
     * @networkStatus usage: 双端
     */
    class SoundService {
        private constructor();
        /**
         * @description 播放声音完成的委托(2D声音是string代表assetId, 3D声音是playId代表播放id)
        * @example
         * 使用示例:创建一个名为SoundExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会播放一个爆炸音效，播放完成后玩家头顶会生成一个火焰特效
         * ```
         * @Component
         * export default class SoundExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         const player = await Player.asyncGetLocalPlayer();
         *         const boomSoundAssetId = "13896";
         *         //在玩家当前坐标处播放爆炸音效
         *         const playId = SoundService.play3DSound(boomSoundAssetId, player.character.worldLocation);
         *         //音效播放完成回调
         *         SoundService.onPlaySoundComplete.add((resId) => {
         *             if (resId == playId) {
         *                 //打印声音播放完成
         *                 console.log("Play sound complete.")
         *             }
         *         });
         *     }
         * }
         * ```
         */
        static readonly onPlaySoundComplete: mw.Action1<string | number>;
        /**
         * @groups 场景/音效
         * @description 根据资源Id播放声音
         * @effect 调用端生效|服务端调用自动广播
         * @precautions 不可叠加
         * @param assetId usage: 播放的唯一标识，音效资源 ID，等同于 playId。区别是 playId 传递的是 number 类型，如：4330；assetId 传字符串类型 "4330" 即可。  range: 字符串长度依据资源 ID 长度而定
         * @param loopCount usage: 循环次数，当=0时，为无限播放  default: 1  range:不做限制  type:整数
         * @param volume usage: 音量 default: 1  range:不做限制  type:整数
         * @returns 资源id
         * @example
         * 使用示例:创建一个名为SoundExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键会播放一个爆炸音效
         * ```
         * @Component
         * export default class SoundExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         const player = await mw.asyncGetLocalPlayer();
         *         const boomSoundAssetId = "13896";
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             SoundService.playSound(boomSoundAssetId);
         *         })
         *     }
         *
         * }
         * ```
         */
        static playSound(assetId: string, loopCount?: number, volume?: number): string;
        /**
         * @description 根据资源Id停止声音
         * @effect 调用端生效|服务端调用自动广播
         * @param assetId usage: 播放的唯一标识，音效资源 ID，等同于 playId。区别是 playId 传递的是 number 类型，如：4330；assetId 传字符串类型 "4330" 即可。  range: 字符串长度依据资源 ID 长度而定
         * @example
         * 使用示例:创建一个名为SoundExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键会播放一个爆炸音效，再次按下F键会停止播放
         * ```
         * @Component
         * export default class SoundExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         const player = await mw.asyncGetLocalPlayer();
         *         const boomSoundAssetId = "13896";
         *         let isPlay = false;
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             if (isPlay) {
         *                 SoundService.stopSound(boomSoundAssetId);
         *                 isPlay = false;
         *             } else {
         *                 SoundService.playSound(boomSoundAssetId, 0);
         *                 isPlay = true;
         *             }
         *         })
         *     }
         *
         * }
         * ```
         */
        static stopSound(assetId: string): void;
        /**
         * @groups 场景/音效
         * @description 停止除BGM以外的一切2D声音
         * @effect 调用端生效|服务端调用自动广播
         * @example
         * 使用示例:创建一个名为SoundExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键会播放两个2D音效，再次按下F键会停止所有音效
         * ```
         * @Component
         * export default class SoundExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         const player = await mw.asyncGetLocalPlayer();
         *         const boomSoundAssetId = "13896";
         *         const boomSoundAssetId2 = "20479";
         *         let isPlay = false;
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             if (isPlay) {
         *                 SoundService.stopAllSound();
         *                 isPlay = false;
         *             } else {
         *                 SoundService.playSound(boomSoundAssetId, 0);
         *                 SoundService.playSound(boomSoundAssetId2, 0);
         *                 isPlay = true;
         *             }
         *         })
         *     }
         *
         * }
         * ```
         */
        static stopAllSound(): void;
        /**
         * @description 播放背景音乐
         * @effect 调用端生效|服务端调用自动广播
         * @param assetId usage: 播放的唯一标识，音效资源 ID，等同于 playId。区别是 playId 传递的是 number 类型，如：4330；assetId 传字符串类型 "4330" 即可。  range: 字符串长度依据资源 ID 长度而定
         * @param volume usage: 音量 default: 1   range:不做限制  type:整数
         * @example
         * 使用示例:创建一个名为SoundExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会播放一个背景音乐
         * ```
         * @Component
         * export default class SoundExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         const bgmSoundAssetId = "12721";
         *         SoundService.playBGM(bgmSoundAssetId, 1);
         *     }
         *
         * }
         * ```
         */
        static playBGM(assetId: string, volume?: number): void;
        /**
         * @groups 场景/音效
         * @description 停止背景音乐
         * @effect 调用端生效|服务端调用自动广播
         * @example
         * 使用示例:创建一个名为SoundExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键会播放一个背景音乐,再次按下F键会停止背景音乐
         * ```
         * @Component
         * export default class SoundExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         const bgmSoundAssetId = "12721";
         *         let isPlay = false;
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             if (isPlay) {
         *                 SoundService.stopBGM();
         *             } else {
         *                 SoundService.playBGM(bgmSoundAssetId, 1);
         *             }
         *             isPlay = !isPlay;
         *         })
         *     }
         *
         * }
         * ```
         */
        static stopBGM(): void;
        /**
         * @groups 场景/音效
         * @description 在目标播放3D音效
         * @effect 调用端生效|服务端调用自动广播
         * @param assetId usage: 播放的唯一标识，音效资源 ID，等同于 playId。区别是 playId 传递的是 number 类型，如：4330；assetId 传字符串类型 "4330" 即可。  range: 字符串长度依据资源 ID 长度而定
         * @param target usage: 播放目标 (GameObject的GUID | GameObject | 世界坐标)
         * @param loopCount usage: 循环次数，当=0时，为无限播放  default: 1  range:不做限制  type:整数
         * @param volume usage: 音量 default: 1  range:不做限制  type:整数
         * @param params usage: 播放参数: { radius: 内部半径(default 200), falloffDistance: 衰减距离,不包含内部半径(default 600) } default: undefined
         * @returns 播放ID，播放声音的唯一标识，可用于停止声音
         * @example
         * 使用示例:创建一个名为SoundExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键会在0点坐标处创建一个方块，并在该位置播放一个3D音效，再次按下F键会停止该音效
         * ```
         * @Component
         * export default class SoundExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         const bgmSoundAssetId = "12721";
         *         const cubeId = "197386";
         *         mw.GameObject.asyncSpawn({ guid: cubeId }).then(obj => {
         *             obj.worldLocation = new mw.Vector(0, 0, 0);
         *         })
         *         let isPlay = false;
         *         let playId = 0;
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             if (isPlay) {
         *                 SoundService.stop3DSound(playId);
         *             } else {
         *                 playId = SoundService.play3DSound(bgmSoundAssetId, new mw.Vector(0, 0, 0), 0);
         *             }
         *             isPlay = !isPlay;
         *         })
         *     }
         *
         * }
         * ```
         */
        static play3DSound(assetId: string, target: string | mw.GameObject | mw.Vector, loopCount?: number, volume?: number, params?: {
            radius?: number;
            falloffDistance?: number;
        }): number;
        /**
         * @groups 场景/音效
         * @description 停止3D声音
         * @effect 调用端生效|服务端调用自动广播
         * @param playId usage: 播放的唯一标识，音效资源 ID，等同于 assetId。区别是 playId 传递的是 number 类型，如：4330；assetId 传字符串类型 "4330" 即可。  range: 字符串长度依据资源 ID 长度而定  type:整数
         * @example
         * 使用示例:创建一个名为SoundExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F键会在0点坐标处创建一个方块，并在该位置播放一个3D音效，再次按下F键会停止该音效
         * ```
         * @Component
         * export default class SoundExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         const bgmSoundAssetId = "12721";
         *         const cubeId = "197386";
         *         mw.GameObject.asyncSpawn({ guid: cubeId }).then(obj => {
         *             obj.worldLocation = new mw.Vector(0, 0, 0);
         *         })
         *         let isPlay = false;
         *         let playId = 0;
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             if (isPlay) {
         *                 SoundService.stop3DSound(playId);
         *             } else {
         *                 playId = SoundService.play3DSound(bgmSoundAssetId, new mw.Vector(0, 0, 0), 0);
         *             }
         *             isPlay = !isPlay;
         *         })
         *     }
         *
         * }
         * ```
         */
        static stop3DSound(playId: number): void;
        /**
         * @groups 场景/音效
         * @description 停止一切3D声音
         * @effect 调用端生效|服务端调用自动广播
         * @example
         * 使用示例:创建一个名为SoundExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会生成10个方块，每个方块播放一个3D音效，10秒后会自动停止所有3D音效
         * ```
         * @Component
         * export default class SoundExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         const bgmSoundAssetId = "12721";
         *         const cubeId = "197386";
         *         for (let i = 0;
 i < 10;
 i++) {
         *             mw.GameObject.asyncSpawn({ guid: cubeId }).then(obj => {
         *                 obj.worldLocation = new mw.Vector(i * 300, 0, 0);
         *                 SoundService.play3DSound(bgmSoundAssetId, obj, 0);
         *             })
         *         }
         *         setTimeout(() => {
         *             SoundService.stopAll3DSound();
         *         }, 10000);
         *     }
         *
         * }
         * ```
         */
        static stopAll3DSound(): void;
        /**
         * @description 根据播放 id 获取一个 3DSound
         * @effect 只在客户端调用生效
         * @param playId usage: 播放的唯一标识，音效资源 ID，等同于 assetId。区别是 playId 传递的是 number 类型，如：4330；assetId 传字符串类型 "4330" 即可。  range: 字符串长度依据资源 ID 长度而定  type:整数
         * @returns Sound 对象的 gameObject
         * @example
         * 使用示例:创建一个名为SoundExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在0点坐标处创建一个方块，并在该位置播放一个3D音效，按下F键该音效会移动到玩家坐标处
         * ```
         * @Component
         * export default class SoundExample extends mw.Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         this.test();
         *     }
         *
         *     private async test(): Promise<void> {
         *         const player = await mw.asyncGetLocalPlayer();
         *         const bgmSoundAssetId = "12721";
         *         const cubeId = "197386";
         *         mw.GameObject.asyncSpawn({ guid: cubeId }).then(obj => {
         *             obj.worldLocation = new mw.Vector(0, 0, 0);
         *         })
         *         let playId = SoundService.play3DSound(bgmSoundAssetId, new mw.Vector(0, 0, 0), 0);
         *         InputUtil.onKeyDown(Keys.F, () => {
         *             SoundService.get3DSoundById(playId).then(obj => {
         *                 obj.worldLocation = player.character.worldLocation;
         *             })
         *         })
         *     }
         *
         * }
         * ```
         */
        static get3DSoundById(playId: number): Promise<mw.Sound>;
        /**
         * @description 音效的音量
         * @precautions 取值范围0-1
         * @effect 只在客户端调用生效
         */
        static set volumeScale(value: number);
        /**
         * @description 音效的音量
         * @precautions 取值范围0-1
         * @effect 只在客户端调用生效
         */
        static get volumeScale(): number;
        /**
         * @description BGM音量
         * @precautions 取值范围0-1
         * @effect 只在客户端调用生效
         */
        static set BGMVolumeScale(value: number);
        /**
         * @description BGM音量
         * @precautions 取值范围0-1
         * @effect 只在客户端调用生效
         */
        static get BGMVolumeScale(): number;
    }
}
