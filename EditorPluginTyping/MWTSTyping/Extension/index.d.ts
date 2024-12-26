/// <reference path="../Gameplay/index.d.ts" />
/// <reference path="../UI/index.d.ts" />

declare namespace mw {
}

/**
 * @Author       : lei.zhao
 * @Date         : 2023-10-10 09:26:14
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-10-10 10:25:18
 * @FilePath     : \TypeScript\Extension\commonModule\bag\BagConfig.ts
 * @Description  : 修改描述
 */
declare namespace mw {
}

declare namespace mw {
    /**
     * @author lei.zhao
     * @groups 拓展/背包
     * @networkStatus 双端
     * @description 背包数据结构
     */
    interface IBagStruct {
        /**
         * @description 道具ID
         * @groups 拓展/背包
         */
        id: number;
        /**
         * @description 道具数量
         * @groups 拓展/背包
         */
        count: number;
    }
}

declare namespace mw {
}

declare namespace mw {
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
    class BagModule {
        /**
         * @groups 拓展/背包
        * @author lei.zhao
        * @description 设置背包皮肤
        * @effect 只在客户端调用生效
        * @param bagSkin usage:背包UI皮肤,null为默认皮肤
        * @param itemSkin usage:背包Item皮肤,null为默认皮肤
        * @param itemBgSkin usage:背包Item背景皮肤,null为默认皮肤
        * @param deleteDialogSkin usage:背包Item删除弹窗皮肤,null为默认皮肤
        * @returns 返回背包实例
        * @example
        * 使用示例:
        * 1.在项目中创建一个UI,名为BagUI,拖入以下控件
        * closeBtn: mw.StaleButton;
        * content: mw.Canvas;
        * filterBox: mw.InputBox;
        * filterCanvas: mw.Canvas;
        * 2.导出UI,将导出的UI文件BagUI_Generate拷贝到JavaScripts文件夹,重命名为BagSkin,并修改extends为BagUI
        * 创建一个名为BagExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏
        * 3.其他UI皮肤同理
        * ```
        * @Component
        * export default class BagExample extends Script {
        *
        *     protected onStart(): void {
        *         if (!SystemUtil.isServer()) return;
        *         BagModule.skin(BagSkin, null, null, null);
        *         BagModule.open();
        *     }
        * }
        * ```
        */
        static skin(bagSkin: new (...args: any[]) => mwext.IBagSkin, itemSkin: new (...args: any[]) => mwext.IBagItemSkin, itemBgSkin: new (...args: any[]) => mw.UIScript, deleteDialogSkin: new (...args: any[]) => mwext.IItemDeleteSkin): typeof BagModule;
        /**
         * @groups 拓展/背包
        * @author lei.zhao
        * @description 打开背包界面
        * @effect 调用端生效
        * @param player usage:背包的所有者 default:服务端填写，客户端不填写
        * @returns 返回背包实例
        */
        static open(player?: mw.Player): typeof BagModule;
        /**
         * @groups 拓展/背包
         * @author lei.zhao
         * @description 是否可以拖拽
         * @effect 只在客户端调用生效
         * @param isDragable usage:是否可以拖拽
         */
        static set dragEnabled(isDragable: boolean);
        /**
         * @groups 拓展/背包
         * @author lei.zhao
         * @description 是否可以拖拽
         * @effect 只在客户端调用生效
         * @returns 返回是否可以拖拽
         */
        static get dragEnabled(): boolean;
        /**
         * @groups 拓展/背包
        * @author lei.zhao
        * @description 物品名称是否可见
        * @effect 只在客户端调用生效
        * @param labelVisible usage:是否可见
        */
        static set labelVisible(isLabelVisible: boolean);
        /**
         * @groups 拓展/背包
         * @author lei.zhao
         * @description 物品名称是否可见
         * @effect 只在客户端调用生效
         * @returns 返回物品名称是否可见
         */
        static get labelVisible(): boolean;
        /**
         * @groups 拓展/背包
        * @author lei.zhao
        * @description 背包容量
        * @effect 只在客户端调用生效
        * @param capacity usage:背包容量 <br> range: [1,128]
        */
        static set capacity(capacity: number);
        /**
         * @groups 拓展/背包
         * @author lei.zhao
         * @description 背包容量
         * @effect 只在客户端调用生效
         * @returns 背包容量
         */
        static get capacity(): number;
        /**
         * @groups 拓展/背包
        * @author lei.zhao
        * @description 是否显示搜索框
        * @effect 只在客户端调用生效
        * @param isSearchEnabled usage:是否显示搜索框
        */
        static set searchEnabled(isSearchEnabled: boolean);
        /**
         * @groups 拓展/背包
         * @author lei.zhao
         * @description 是否显示搜索框
         * @effect 只在客户端调用生效
         * @returns 返回是否显示搜索框
         */
        static get searchEnabled(): boolean;
        /**
         * @groups 拓展/背包
         * @author lei.zhao
         * @description 背包注册道具信息，道具需要在客户端注册
         * @effect 调用端生效
         * @param itemId usage:道具ID <br> range: 根据道具ID确定  type: 整形
         * @param icon usage:道具图片 <br> range: 不做限制
         * @param name usage:名称 <br> range: 不做限制
         * @param quality usage:道具品质-默认普通 default:ItemQuality.Common
         * @param stackCount usage:堆叠数量 default:1 <br> range: 不做限制  type: 整形
         * @param customData usage:额外数据 default:null
         * @returns 返回背包实例
         * @example
         * 使用示例:创建一个BagExample脚本并拖入对象管理器中，添加以下代码
         * 这样就注册了4个道具，然后通过BagModule.addItem添加对应ID在背包中就可以看到这4个道具了
         * ```
         * @Component
         * export default class BagExample extends Script {
         *
         *     protected onStart(): void {
         *         BagModule.registerItem(1,"37692","金铲铲",ItemQuality.Legend,10,{a:1,b:2});
         *         BagModule.registerItem(2,"37690","小喇叭",ItemQuality.Legend,10,{a:1,b:2});
         *         BagModule.registerItem(3,"37697","金币",ItemQuality.Legend,10,{a:1,b:2});
         *         BagModule.registerItem(4,"37695","南瓜",ItemQuality.Common,20,{a:1,b:2});
         *     }
         * }
         * ```
         */
        static registerItem(itemId: number, icon: string, name: string, quality?: mwext.ItemQuality, stackCount?: number, customData?: any): typeof BagModule;
        /**
         * @groups 拓展/背包
         * @author lei.zhao
         * @description 获取背包指定道具数量
         * @effect 调用端生效
         * @param itemId usage:道具ID <br> range: 根据道具ID确定  type: 整形
         * @param player usage:服务端传入，打开指定玩家的背包 default:服务端必传入
         * @returns 返回背包实例
         */
        static getItemCount(itemId: number, player?: mw.Player): number;
        /**
         * @groups 拓展/背包
         * @author lei.zhao
         * @description 添加道具
         * @effect 调用端生效
         * @param itemId usage:道具ID <br> range: 不做限制  type: 整形
         * @param count usage:道具数量 default:1 <br> range: 不做限制  type: 整形
         * @param player usage:道具所有者 default:服务端必传入
         * @returns 返回添加的道具数量，如果添加失败则返回0
         * @example
         * 使用示例:创建一个BagExample脚本并拖入对象管理器中，添加以下代码,运行项目
         * ```
         * @Component
         * export default class BagExample extends Script {
         *    protected onStart(): void {
         *       BagModule.registerItem(1,"37692","金铲铲",ItemQuality.Legend,10,{a:1,b:2});
         *       if (SystemUtil.isServer()) return;
         *       BagModule.addItem(1).then((count:number)=>{
         *          console.log("添加道具数量",count);
         *       });
         *       BagModule.open();
         *    }
         * ```
         */
        static addItem(itemId: number, count?: number, player?: mw.Player): Promise<number>;
        /**
         * @groups 拓展/背包
         * @author lei.zhao
         * @description 删除道具
         * @effect 调用端生效
         * @param itemId usage:道具ID <br> range: 根据道具ID确定  type: 整形
         * @param count usage:道具数量  default:1 <br> range: 不做限制  type: 整形
         * @param player usage:道具所有者，服务端必传入 default:服务端必传入
         * @returns 返回背包实例
         */
        static removeItem(itemId: number, count?: number, player?: mw.Player): typeof BagModule;
        /**
         * @groups 拓展/背包
         * @author lei.zhao
         * @description 关闭背包界面
         * @effect 调用端生效
         * @param player usage:服务端调用时需要传入player default:服务端必传入
         * @returns 返回背包实例
         */
        static close(player?: mw.Player): typeof BagModule;
        /**
         * @groups 拓展/背包
         * @author lei.zhao
         * @description 增加道具点击回调
         * @effect 只在客户端调用生效
         * @param clickCallback usage:点击回调
         * @param thisObject usage:调用上下文
         * @returns 返回背包实例
         */
        static addItemClickListener(clickCallback: (cfg: mwext.ItemConfig) => void, thisObject: any): typeof BagModule;
        /**
         * @groups 拓展/背包
         * @author lei.zhao
         * @description 移除道具点击回调
         * @effect 只在客户端调用生效
         * @param clickCallback usage:点击回调
         * @param thisObject usage:调用上下文
         * @returns 返回背包实例
         */
        static removeItemClickListener(clickCallback: (cfg: mwext.ItemConfig) => void, thisObject: any): typeof BagModule;
        /**
         * @groups 拓展/背包
         * @description 整理背包
         * @effect 只在客户端调用生效
         * @returns 返回背包实例
         */
        static sort(): typeof BagModule;
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
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus 双端
    * @description 道具配置
    */
    interface ItemConfig {
        /** @description 道具ID */
        itemId: number;
        /** @description 道具图标 */
        icon: string;
        /** @description 道具名字 */
        name: string;
        /** @description 道具品级 */
        quality: mwext.ItemQuality;
        /** @description 堆叠数量 */
        stackCount: number;
        /** @description 额外数据 */
        customData: string;
    }
}

/**
 * @Author       : lei.zhao
 * @Date         : 2022-12-19 15:12:37
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-17 16:33:05
 * @FilePath     : \typescript\TypeScript\Extension\commonModule\bag\item\ItemQuality.ts
 * @Description  : 修改描述
 */
declare namespace mw {
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus 双端
    * @description 道具品质
    */
    enum ItemQuality {
        /** 普通 */
        Common = 0,
        /** 优秀 */
        Excellent = 1,
        /** 精良 */
        Delicate = 2,
        /** 史诗 */
        Epic = 3,
        /** 传说 */
        Legend = 4
    }
}

/**
 * @Author       : lei.zhao
 * @Date         : 2022-12-13 18:22:10
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2022-12-13 18:23:36
 * @FilePath     : \CommonBagModule\JavaScripts\item\ItemType.ts
 * @Description  : 修改描述
 */
declare namespace mw {
}

/**
 * @Author       : lei.zhao
 * @Date         : 2022-12-19 16:41:59
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-10 13:07:09
 * @FilePath     : \typescript\TypeScript\Extension\commonModule\bag\ui\BagItemProvider.ts
 * @Description  : 背包格子生成者
 */
declare namespace mw {
}

declare namespace mw {
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus usage:客户端
    * @description 背包道具父类,继承这个类来实现自己的道具格子界面，使用BagModule.skin来指定皮肤
    */
    abstract class BagItemUI extends mw.UIScript implements mwext.IBagItemSkin {
        /**
         * @description 物品图标按钮
         * @effect 只在客户端调用生效
         */
        abstract get iconButton(): mw.Button;
        /**
         * @description 物品数量文本
         * @effect 只在客户端调用生效
         */
        abstract get countText(): mw.TextBlock;
        /**
         * @description 物品名称文本
         * @effect 只在客户端调用生效
         */
        abstract get nameText(): mw.TextBlock;
        /**
         * @author lei.zhao
         * @description 界面创建时被调用
         * @effect 只在客户端调用生效
         */
        protected abstract onCreated(): void;
    }
}

declare namespace mw {
    /**
     * @author lei.zhao
     * @groups 拓展/背包
     * @networkStatus usage:客户端
     * @description 背包界面父类,继承这个类来实现自己的背包界面，使用BagModule.skin来指定皮肤
     */
    abstract class BagUI extends mw.UIScript implements mwext.IBagSkin {
        /**
         * @description 关闭按钮
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        abstract get closeBtn(): mw.StaleButton;
        /**
         * @description 背包格子的容器
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        abstract get content(): mw.Canvas;
        /**
         * @description 过滤输入框
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        abstract get filterBox(): mw.InputBox;
        /**
         * @description 搜索框所在容易,打开/关闭搜索功能隐藏/显示该容器
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        abstract get filterCanvas(): mw.Canvas;
    }
}

declare namespace mw {
}

/**
 * @Author       : lei.zhao
 * @Date         : 2023-05-06 13:57:24
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-05-14 15:57:48
 * @FilePath     : \typescript\TypeScript\Extension\commonModule\bag\ui\ItemDeleteUI.ts
 * @Description  : 修改描述
 */
declare namespace mw {
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus usage:客户端
    * @description 背包删除界面父类,继承这个类来实现自己的道具删除界面，使用BagModule.skin来指定皮肤
    */
    abstract class ItemDeleteUI extends mw.UIScript implements mwext.IItemDeleteSkin {
        /**
         * @description 关闭按钮
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        abstract get closeButton(): mw.StaleButton;
        /**
         * @description 确认按钮
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        abstract get okButton(): mw.StaleButton;
        /**
         * @description 取消按钮
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         * @optional 可选参数
         */
        abstract get cancelButton(): mw.StaleButton;
        /**
         * @description 物品名字标签
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         * @optional 可选参数
         */
        abstract get nameText(): mw.TextBlock;
        /**
         * @description 物品图标
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         * @optional 可选参数
         */
        abstract get itemIcon(): mw.Image;
        /**
         * @description 当显示道具时调用
         * @groups 拓展/背包
         * @param cfg usage:道具配置
         * @effect 只在客户端调用生效
         */
        abstract onItemShow(cfg: mwext.ItemConfig): void;
    }
}

/**
 * @Author       : lei.zhao
 * @Date         : 2023-05-08 16:31:13
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-17 16:32:46
 * @FilePath     : \typescript\TypeScript\Extension\commonModule\bag\ui\skins\IBagItemSkin.ts
 * @Description  : 修改描述
 */
declare namespace mw {
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus usage:客户端
    * @description 格子皮肤
    */
    interface IBagItemSkin extends mw.UIScript {
        /**
         * @description 物品图标按钮
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        iconButton: mw.Button;
        /**
         * @description 物品数量文本
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        countText: mw.TextBlock;
        /**
         * @description 物品名称文本
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        nameText: mw.TextBlock;
    }
}

/**
 * @Author       : lei.zhao
 * @Date         : 2023-05-08 16:32:26
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-17 16:32:34
 * @FilePath     : \typescript\TypeScript\Extension\commonModule\bag\ui\skins\IBagSkin.ts
 * @Description  : 修改描述
 */
declare namespace mw {
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus usage:客户端
    * @description 背包皮肤
    */
    class IBagSkin {
        /**
         * @description 关闭按钮
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        closeBtn: mw.StaleButton;
        /**
         * @description 背包格子的容器
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        content: mw.Canvas;
        /**
         * @description 过滤输入框
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        filterBox: mw.InputBox;
        /**
         * @description 搜索框所在容易,打开/关闭搜索功能隐藏/显示该容器
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        filterCanvas: mw.Canvas;
    }
}

/**
 * @Author       : lei.zhao
 * @Date         : 2023-07-14 15:05:43
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-17 16:32:55
 * @FilePath     : \typescript\TypeScript\Extension\commonModule\bag\ui\skins\IItemDeleteSkin.ts
 * @Description  : 修改描述
 */
declare namespace mw {
    /**
    * @author lei.zhao
    * @groups 拓展/背包
    * @networkStatus usage:客户端
    * @description 道具删除皮肤
    */
    interface IItemDeleteSkin {
        /**
         * @description 关闭按钮
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        closeButton: mw.StaleButton;
        /**
         * @description 确认按钮
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         */
        okButton: mw.StaleButton;
        /**
         * @description 取消按钮
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         * @optional 可选参数
         */
        cancelButton: mw.StaleButton;
        /**
         * @description 物品名字标签
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         * @optional 可选参数
         */
        nameText: mw.TextBlock;
        /**
         * @description 物品图标
         * @groups 拓展/背包
         * @effect 只在客户端调用生效
         * @optional 可选参数
         */
        itemIcon: mw.Image;
    }
}

declare namespace mw {
    /**
     * @instance
     * @author shilong.wang
     * @groups 拓展/排行榜
     * @description 编辑器内置排行榜
     * @networkStatus usage: 双端
     */
    class LeaderboardModule {
        /**
         * @description 添加一个字段
         * @groups 拓展/排行榜
         * @effect 只在客户端调用生效
         * @param fieldId usage: 字段 ID  range: 依据 ID 长度而定  type:
         * @param fieldName usage: 字段名 range:不做限制
         * @param valueStyle usage: 显示内容样式(例：{0}分) default: null range:不做限制
         * @returns 返回自己，可用于链式调用
         */
        static addField(fieldId: number, fieldName: string, valueStyle?: string): typeof LeaderboardModule;
        /**
         * @description 显示排名
         * @groups 拓展/排行榜
         * @effect 只在客户端调用生效
         * @param fieldName usage: 字段名   range: 依据 ID 长度而定  type:
         * @param valueStyle usage: 字段值样式 default: null   range:不做限制
         * @param notListed usage: 未上榜(如果未上榜也显示名次请填写null) default: null   range:不做限制
         * @returns 返回自己，可用于链式调用
         */
        static showRankField(fieldName: string, valueStyle?: string, notListed?: string): typeof LeaderboardModule;
        /**
         * @description 设置样式
         * @groups 拓展/排行榜
         * @effect 只在客户端调用生效
         * @param title usage: 界面标题  range: UI 标题信息
         * @param fieldsAutoLayout usage: 字段是否自动布局，均匀分布
         * @param showPlayerNum usage: 最多显示的玩家数量  range:合理即可  type: 整形
         * @param itemSpacing usage: 每条数据的间距  range:合理即可  type: 整形
         * @returns 返回自己，可用于链式调用
         */
        static setStyle(title: string, fieldsAutoLayout: boolean, showPlayerNum: number, itemSpacing: number): typeof LeaderboardModule;
        /**
         * @description 设置排序字段
         * @groups 拓展/排行榜
         * @description 可以设置多字段排序，只支持从大到小排序。
         * @effect 只在客户端调用生效
         * @param fieldIds usage: 排序字段 <br> range: 长度不做限制
         * @returns 返回自己，可用于链式调用
         */
        static setSortFields(...fieldIds: number[]): typeof LeaderboardModule;
        /**
         * @description 设置排序的方法
         * @groups 拓展/排行榜
         * @effect 只在客户端调用生效
         * @param fn usage: 方法
         * @returns 返回自己，可用于链式调用
         */
        static setSortMethod(fn: (dataList: LeaderboardPlayerData[]) => LeaderboardPlayerData[]): typeof LeaderboardModule;
        /**
         * @description 显示 UI
         * @groups 拓展/排行榜
         * @effect 只在客户端调用生效
         * @param hideCallback usage: Panel关闭的回调 default: null
         */
        static showPanel(hideCallback?: () => void): void;
        /**
         * @description 隐藏UI
         * @groups 拓展/排行榜
         * @effect 只在客户端调用生效
         */
        static hidePanel(): void;
        /**
         * @description 向排行榜添加一个玩家
         * @groups 拓展/排行榜
         * @effect 只在服务端调用生效
         * @param player usage: 玩家对象|玩家id <br> range: 根据 ID 长度而定
         * @param data usage: 玩家数据  default: {}
         */
        static addPlayer(player: mw.Player | number, data?: any): void;
        /**
         * @description 从排行榜移除一个玩家
         * @groups 拓展/排行榜
         * @effect 只在服务端调用生效
         * @param player usage: 玩家对象|玩家id <br> range: 根据 ID 长度而定
         */
        static removePlayer(player: mw.Player | number): void;
        /**
         * @description 设置一个玩家的一个字段值
         * @groups 拓展/排行榜
         * @effect 只在服务端调用生效
         * @param player usage: 玩家对象|玩家id  <br> range: 根据 ID 长度而定
         * @param fieldId usage: 字段的ID  <br> range: 根据 ID 长度而定    type:整数
         * @param value usage: 字段的值 <br> range: 不做限制，一个玩家一个数据   type:整数
         */
        static setPlayerValue(player: mw.Player | number, fieldId: number, value: number | string): void;
        /**
         * @description 清除排行榜
         * @groups 拓展/排行榜
         * @effect 只在服务端调用生效
         */
        static clear(): void;
    }
}

declare namespace mw {
    /**
    * @author shilong.wang
    * @groups 拓展/排行榜
    * @description 排行榜玩家数据类型
    * @networkStatus usage: 双端
    */
    type LeaderboardPlayerData = {
        /** 玩家id */
        playerId: number;
        /** 玩家数据，是一个key-value的结构 */
        data: {
            [fieldId: number]: number | string;
        };
    };
    /**
    * @author shilong.wang
    * @description 排行榜模块-服务端
    * @groups 拓展/排行榜
    */
    type LeaderboardModuleTypeS = LeaderboardModuleBaseS<any>;
    /**
    * @author shilong.wang
    * @description 排行榜模块-客户端
    * @groups 拓展/排行榜
    */
    type LeaderboardModuleTypeC = LeaderboardModuleBaseC<any>;
    /**
    * @author shilong.wang
    * @groups 拓展/排行榜
    * @description 排行榜模块-客户端
    * @networkStatus usage: 客户端
    */
    abstract class LeaderboardModuleBaseC<T extends LeaderboardModuleTypeS> extends ModuleC<T, any> {
        /**
         * @description 创建排行榜UI面板
         * @groups 拓展/排行榜
         * @effect 只在客户端调用生效
         * @returns 排行榜UI面板
         */
        protected abstract creatPanel(): mwext.LeaderboardMainPanelBase<any>;
        /**
         * @description 排行榜的UI面板
         * @groups 拓展/排行榜
         * @effect 只在客户端调用生效
         * @returns 一条排行信息的item子UI
         */
        protected get panel(): mwext.LeaderboardMainPanelBase<any>;
        /**
         * @description 显示UI面板
         * @groups 拓展/排行榜
         * @effect 只在客户端调用生效
         */
        showPanel(): void;
        /**
         * @description 隐藏UI面板
         * @groups 拓展/排行榜
         * @effect 只在客户端调用生效
         */
        protected hidePanel(): void;
    }
    /**
    * @author shilong.wang
    * @groups 拓展/排行榜
    * @description 排行榜模块-服务端
    * @networkStatus usage: 服务端
    */
    abstract class LeaderboardModuleBaseS<T extends LeaderboardModuleTypeC> extends ModuleS<T, any> {
        /**
         * @description 向排行榜添加一个玩家
         * @groups 拓展/排行榜
         * @effect 只在服务端调用生效
         * @param player usage: 玩家对象|玩家id
         * @param data usage: 玩家数据
         * @returns 是否成功
         */
        protected addPlayer(player: mw.Player | number, data: {
            [fieldId: number]: number | string;
        }): boolean;
        /**
         * @description 从排行榜移除一个玩家
         * @groups 拓展/排行榜
         * @effect 只在服务端调用生效
         * @param player usage: 玩家对象|玩家id
         * @returns 是否成功
         */
        protected removePlayer(player: mw.Player | number): boolean;
        /**
         * @description 设置玩家的一个字段值
         * @groups 拓展/排行榜
         * @effect 只在服务端调用生效
         * @param player usage: 玩家对象|玩家id  <br> range: 根据 ID 长度而定
         * @param fieldId usage: 字段ID  <br> range: 根据 ID 长度而定    type:整数
         * @param value usage: 字段的值 <br> range: 不做限制，一个玩家一个数据   type:整数
         */
        protected setPlayerValue(player: mw.Player | number, fieldId: number, value: number | string): void;
        /**
         * @description 清除排行榜
         * @groups 拓展/排行榜
         * @effect 只在服务端调用生效
         */
        protected clear(): void;
    }
}

declare namespace mw {
    /**
     * @author shilong.wang
     * @groups 拓展/排行榜
     * @description 排行榜面板一条数据的UI结构接口
     * @networkStatus usage: 客户端
     */
    interface ILeaderboardItemView extends mw.UIScript {
        /**
         * @description 内容画布
         */
        mContent: mw.Canvas;
    }
    /**
     * @author shilong.wang
     * @groups 拓展/排行榜
     * @description 排行榜面板的UI结构接口
     * @networkStatus usage: 客户端
     */
    interface ILeaderboardPanelView extends mw.UIScript {
        /**
         * @groups 拓展/排行榜
         * @description 标题
         */
        mTitle_txt: mw.TextBlock;
        /**
         * @groups 拓展/排行榜
         * @description 字段名节点画布
         */
        mFieldName: mw.Canvas;
        /**
         * @groups 拓展/排行榜
         * @description 显示条目节点画布
         */
        mContent: mw.Canvas;
        /**
         * @groups 拓展/排行榜
         * @description 自己排行信息节点画布
         */
        mSelfList: mw.Canvas;
        /**
         * @groups 拓展/排行榜
         * @description 关闭按钮
         */
        mClose_btn: mw.StaleButton;
    }
    /**
     * @author shilong.wang
     * @groups 拓展/排行榜
     * @description 排行榜主界面中的子UI，用来显示一条记录
     * @networkStatus usage: 客户端
     */
    abstract class LeaderboardItemPanelBase<T extends ILeaderboardItemView> extends mwext.BasePanel<T> {
        /**
         * @groups 拓展/排行榜
         * @description 构造方法
         * @param viewClass usage: 界面类
         */
        protected constructor(viewClass: mw.TypeName<T>);
        /**
         * @groups 拓展/排行榜
         * @description 当创建时调用
         * @precautions 如果要复写此方法，记得调用super.onAwake()
         * @effect 只在客户端调用生效
         */
        protected onAwake(): void;
        /**
         * @groups 拓展/排行榜
         * @description 显示在画布上调用，需要请复写
         * @effect 只在客户端调用生效
         * @param playerId usage: 玩家 id  range: 依据玩家 ID 而定  type:整数
         * @param rankIndex usage: 排名(0开始)  range: 合理即可  type:整数
         */
        protected onAddToCanvas(playerId: number, rankIndex: number): void;
        /**
         * @groups 拓展/排行榜
         * @description 设置字段内容后调用，需要请复写
         * @effect 只在客户端调用生效
         * @param playerId usage: 玩家id  <br> range: 根据 ID 长度而定    type:整数
         * @param rankIndex usage: 名次索引(0开始)  <br> range: 合理即可    type:整数
         * @param fieldId usage: 字段索引 (如果是排行字段，此参数为mull)  <br> range: 合理即可    type:整数
         * @param fieldValue usage: 字段显示内容  <br> range: 合理即可，不做限制    type:整数
         * @param textBlockIndex usage: 文本控件索引  <br> range: 合理即可，不做限制    type:整数
         * @param textBlock usage: 文本控件
         */
        protected onFieldSet(playerId: number, rankIndex: number, fieldId: number, fieldValue: string | number, textBlockIndex: number, textBlock: mw.TextBlock): void;
        /**
         * @groups 拓展/排行榜
         * @description 当前显示对象的playerId
         * @effect 只在客户端调用生效
         */
        protected get playerId(): number;
    }
    /**
    * @author shilong.wang
    * @groups 拓展/排行榜
    * @description 排行榜主界面
    * @networkStatus usage: 客户端
    */
    abstract class LeaderboardMainPanelBase<T extends ILeaderboardPanelView> extends mwext.BasePanel<T> {
        /**
         * @description 当关闭的时候调用的事件
         */
        readonly onClose: mw.Action;
        /**
         * @groups 拓展/排行榜
         * @description 设置排行榜样式
         * @effect 只在客户端调用生效
         * @param title usage: UI 标题  range: UI 标题信息
         * @param fieldsAutoLayout usage: 字段是否自动布局(true-均匀分布, false-所摆即所得）
         * @param showPlayerNum usage: 最多显示的玩家数量  range:合理即可  type: 整形
         * @param itemSpacing usage: 每条数据的间距  range:合理即可  type: 整形
         * @returns 返回自己，可用于链式调用
         */
        setStyle(title: string, fieldsAutoLayout: boolean, showPlayerNum: number, itemSpacing: number): this;
        /**
         * @groups 拓展/排行榜
         * @description 显示"名次"字段，并进行设置，默认不显示
         * @effect 只在客户端调用生效
         * @param fieldName usage: 字段标题   range: 依据 ID 长度而定  type:
         * @param valueStyle usage: 字段值样式 default: null   range:不做限制
         * @param notListed usage: 未上榜(如果未上榜也显示"名次"请填写null) default: null  range:不做限制
         * @returns 返回自己，可用于链式调用
         */
        showRankField(fieldName: string, valueStyle?: string, notListed?: string): this;
        /**
         * @groups 拓展/排行榜
         * @description 添加一个字段
         * @effect 只在客户端调用生效
         * @param fieldId usage: 字段 ID  range: 依据 ID 长度而定  type:
         * @param fieldName usage: 字段的标题  range:
         * @param valueStyle usage: 字段值的展示样式 (例：{0}分) default: null  range:不做限制
         * @returns 返回自己，可用于链式调用
         */
        addField(fieldId: number, fieldName: string, valueStyle?: string): this;
        /**
         * @groups 拓展/排行榜
         * @description 设置排序字段ID，可以设置多字段排序，只支持从大到小排序
         * @effect 只在客户端调用生效
         * @param fieldIds usage: 排序字段
         * @returns 返回自己，可用于链式调用
         */
        setSortFields(...fieldIds: number[]): this;
        /**
         * @description 当UI显示调用
         * @precautions 如果要复写此方法，记得调用super.onShow()
         * @effect 只在客户端调用生效
         * @groups 拓展/排行榜
         * @param playerDataList usage: 玩家数据列表
         */
        protected onShow(playerDataList: Array<LeaderboardPlayerData>): void;
        /**
         * @groups 拓展/排行榜
         * @description 当UI隐藏调用
         * @precautions 如果要复写此方法，记得调用super.onHide()
         * @effect 只在客户端调用生效
         */
        protected onHide(): void;
        /**
         * @groups 拓展/排行榜
         * @description 排序的时候调用，需要请重写
         * @effect 只在客户端调用生效
         * @param dataList usage: 排行数据数组
         * @returns 排序后的数据队列
         */
        protected onSort(dataList: LeaderboardPlayerData[]): LeaderboardPlayerData[];
        /**
         * @groups 拓展/排行榜
         * @description 设置自己(界面最下面那一行)的字段内容后调用，需要请复写
         * @effect 只在客户端调用生效
         * @param rankIndex usage: 名次索引(0开始)  range: 合理即可，不做限制  type: 整形
         * @param fieldId usage: 字段索引 (如果是排行字段，此参数为mull)  range: 合理即可，不做限制  type: 整形
         * @param fieldValue usage: 字段显示内容  range: 合理即可，不做限制  type: 整形
         * @param textBlockIndex usage: 文本控件索引  range: 合理即可，不做限制  type: 整形
         * @param textBlock usage: 文本控件
         */
        protected onSelfFieldSet(rankIndex: number, fieldId: number, fieldValue: string | number, textBlockIndex: number, textBlock: mw.TextBlock): void;
        /**
         * @groups 拓展/排行榜
         * @description 创建用于显示一条排行信息的item子UI
         * @effect 只在客户端调用生效
         * @returns 一条排行信息的item子UI
         */
        protected abstract creatItem(): LeaderboardItemPanelBase<{
            mContent: mw.Canvas;
        } & mw.UIScript>;
    }
}

declare namespace mw {
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
    abstract class Subdata {
        /** @description 数据变化的委托*/
        readonly onDataChange: mw.Action;
        /**
         * @groups 基类/数据拓展
         * @description 初始化默认数据，需要请复写
         * @effect 调用端生效
         */
        protected initDefaultData(): void;
        /**
         * @groups 基类/数据拓展
         * @description 数据初始化完成调用，需要请复写，可在这个方法中实现数据升级
         * @precautions 这个方法调用完成后，你需要保证currentVersion和version是相等的
         * @effect 调用端生效
         */
        protected onDataInit(): void;
        /**
         * @groups 基类/数据拓展
         * @description 数据版本号，数据有变化需要重写，和currentVersion配合使用，可实现数据升级
         */
        protected get version(): number;
        /**
         * @groups 基类/数据拓展
         * @description 当前数据版本号，和version配合使用，可实现数据升级
         */
        protected get currentVersion(): number;
        /**
         * @groups 基类/数据拓展
         * @description 当前数据版本号，和version配合使用，可实现数据升级
         */
        protected set currentVersion(value: number);
        /**
         * @groups 基类/数据拓展
         * @description 通过属性名获取存储的属性值(用作数据升级，读取之前已经存储的数据)
         * @effect 调用端生效
         * @param propertyName usage: 属性名 range:
         * @returns 属性值
         */
        protected getSavedProperty<T>(propertyName: string): T;
        /**
         * @description 保存数据
         * @description 修改数据时，只有调用了 save 并设置参数为 true 时，才会同步至对应客户端。
         * @effect 只在服务端调用生效
         * @param syncToClient usage: 是否同步给客户端
         * @returns 自身
         * @groups 基类/数据拓展
         */
        save(syncToClient: boolean): this;
        /**
         * @groups 基类/数据拓展
         * @description 向客户端同步数据
         * @effect 只在服务端调用生效
         * @returns 自身
         */
        syncToClient(): this;
    }
}

declare namespace mw {
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
    class DataCenterC {
        /** @description 数据初始化结果的委托，参数为：结果码(0-成功，1-加载数据表单失败 2-加载子数据失败)，错误内容*/
        static readonly onInitResult: mw.Action2<number, string>;
        /**
         * @groups 基类/数据拓展
         * @description 获取当前玩家的一个数据
         * @effect 只在客户端调用生效
         * @param SubdataType usage: 数据类型
         * @returns 数据对象
         * @example
         * 使用示例:创建一个名为DataCenterCExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，你将在客户端日志中看到玩家等级为0的信息
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
        static getData<T extends mwext.Subdata>(SubdataType: mw.TypeName<T>): T;
        /**
         * @groups 基类/数据拓展
         * @description 判断数据是否就绪
         * @effect 只在客户端调用生效
         * @returns true-就绪 false-未就绪
         */
        static ready(): Promise<void>;
    }
}

declare namespace mw {
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
    class DataCenterS {
        /**
         * @groups 基类/数据拓展
         * @description 玩家进入游戏的委托，当委托被调用的时候，可以保证玩家的数据是就绪的
         */
        static readonly onPlayerJoin: mw.Action1<mw.Player>;
        /**
         * @groups 基类/数据拓展
         * @description 玩家离开游戏的委托，可用作玩家最后的数据处理
         */
        static readonly onPlayerLeave: mw.Action1<mw.Player>;
        /**
         * @groups 基类/数据拓展
         * @description 获取玩家的子数据
         * @effect 只在服务端调用生效
         * @param player usage: 玩家|玩家userId|玩家instanceId
         * @param SubdataType usage: 数据类
         * @returns 数据对象
         * @example
         * 使用示例:创建一个名为DataCenterSExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，玩家加入时你将在在服务端日志中看到玩家等级为0的信息
         * ```
         * @Component
         * export default class DataCenterSExample extends Script {
         *
         *  protected onStart(): void {
         *      if (SystemUtil.isServer()) {
         *          DataCenterS.onPlayerJoin.add((player)=>{
         *              let playerData = DataCenterS.getData(player, PlayerModuleData);
         *              console.log("玩家等级：", playerData.getlevel());
         *          });
         *      }
         *    }
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
        static getData<T extends mwext.Subdata>(player: mw.Player | string | number, SubdataType: mw.TypeName<T>): T;
        /**
         * @groups 基类/数据拓展
         * @description 获取在线且数据就绪的所有玩家ID
         * @effect 只在服务端调用生效
         * @returns 玩家id数组
         * @example
         * 使用示例:创建一个名为DataCenterSExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，按下F健你将在在服务端日志中看到所有数据就绪的玩家的playerid以及等级
         * ```
         * @Component
         * export default class DataCenterSExample extends Script {
         *
         *     protected onStart(): void {
         *         if (SystemUtil.isClient()) {
         *             InputUtil.onKeyDown(Keys.F, () => {
         *                 this.traceAllLevel();
         *             })
         *         }
         *     }
         *
         *     //测试输出所有数据就绪的玩家的等级
         *     @mw.RemoteFunction(mw.Server)
         *     public traceAllLevel(): void {
         *         if (SystemUtil.isServer()) {
         *             const playerIds = DataCenterS.getReadyPlayerIds();
         *             playerIds.forEach(playerId => {
         *                 let playerData = DataCenterS.getData(playerId, PlayerModuleData);
         *                 console.log("玩家playerId为：" + playerId, "的等级：", playerData.getlevel());
         *             });
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
        static getReadyPlayerIds(): Array<number>;
        /**
         * @groups 基类/数据拓展
         * @description 设置数据来源
         * @effect 只在服务端调用生效
         * @param gameId usage: 数据源的gameId，需要在开发者后台进行授权  range:字符串长度依据 gameId 长度而定
         */
        static setDataSource(gameId: string): void;
    }
}

declare namespace mw {
}

declare namespace mw {
}

declare namespace mw {
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
    abstract class ModuleC<T, S extends mwext.Subdata> {
        /**
         * @groups 基类/C&S拓展
         * @description 和自己绑定的服务端模块，可通过此对象直接调用net_开头的服务端方法
         * @effect 只在客户端调用生效
         */
        protected get server(): T;
        /**
         * @groups 基类/C&S拓展
         * @description 获取当前玩家
         * @effect 只在客户端调用生效
         */
        protected get localPlayer(): mw.Player;
        /**
         * @groups 基类/C&S拓展
         * @description 获取当前玩家ID
         * @effect 只在客户端调用生效
         */
        protected get localPlayerId(): number;
        /**
         * @groups 基类/C&S拓展
         * @description 本地玩家的模块数据
         */
        protected get data(): S;
        /**
         * @groups 基类/C&S拓展
         * @description 生命周期方法-创建模块时调用
         * @effect 只在客户端调用生效
         */
        protected onAwake(): void;
        /**
         * @groups 基类/C&S拓展
         * @description 生命周期方法-启动模块时调用
         * @effect 只在客户端调用生效
         */
        protected onStart(): void;
        /**
         * @groups 基类/C&S拓展
         * @description 生命周期方法-进入场景调用
         * @effect 只在客户端调用生效
         * @param sceneType usage: 场景类型(预留)  range: type:
         */
        protected onEnterScene(sceneType: number): void;
        /**
         * @groups 基类/C&S拓展
         * @description 生命周期方法-刷新模块调用
         * @effect 只在客户端调用生效
         * @param dt usage: 两帧之间的时间差(单位：秒) range: type:浮点数
         */
        protected onUpdate(dt: number): void;
        /**
         * @groups 基类/C&S拓展
         * @description 生命周期方法-销毁模块调用
         * @effect 只在客户端调用生效
         */
        protected onDestroy(): void;
        /**
         * @groups 基类/C&S拓展
         * @description 外部调用本模块的某个操作
         * @effect 只在客户端调用生效
         * @param type usage: 操作类型  range: type:
         * @param params usage: 操作参数
         */
        protected onExecute(type: number, ...params: any[]): void;
    }
}

declare namespace mw {
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
    abstract class ModuleS<T, S extends mwext.Subdata> {
        /**
         * @groups 基类/C&S拓展
         * @description 根据玩家获取"单客户端"调用对象
         * @effect 只在服务端调用生效
         * @param player usage: 目标玩家|目标玩家id
         * @returns "单客户端"调用对象
         */
        getClient(player: mw.Player | number): T;
        /**
         * @groups 基类/C&S拓展
         * @description 获取"全部客户端"调用对象
         * @effect 只在服务端调用生效
         * @returns "全部客户端"调用对象
         */
        getAllClient(): T;
        /**
         * @groups 基类/C&S拓展
         * @description 调用服务器方法的玩家
         * @precautions 只能在服务端的rpc方法(net_开头的方法)里使用，方法执行完以后会被清除，不要在其他地方用，不要异步使用
         * @effect 只在服务端调用生效
         */
        get currentPlayer(): mw.Player;
        /**
         * @groups 基类/C&S拓展
         * @description 获取调用服务器方法的玩家ID
         * @precautions 只能在服务端的rpc方法(net_开头的方法)里使用，方法执行完以后会被清除，不要在其他地方用，不要异步使用
         * @effect 只在服务端调用生效
         */
        get currentPlayerId(): number;
        /**
         * @groups 基类/C&S拓展
         * @description 调用服务器方法的玩家的DataOwner
         * @precautions 只能在服务端的rpc方法(net_开头的方法)里使用，方法执行完以后会被清除，不要在其他地方用，不要异步使用
         */
        protected get currentData(): S;
        /**
         * @groups 基类/C&S拓展
         * @description 获取指定玩家的本模块数据
         * @effect 只在服务端调用生效
         * @param player usage: 目标玩家|目标玩家userId|目标玩家instanceId
         * @returns 数据
         */
        protected getPlayerData(player: mw.Player | string | number): S;
        /**
         * @groups 基类/C&S拓展
         * @description 生命周期方法-创建模块时调用
         * @effect 只在服务端调用生效
         */
        protected onAwake(): void;
        /**
         * @groups 基类/C&S拓展
         * @description 生命周期方法-启动模块时调用
         * @effect 只在服务端调用生效
         */
        protected onStart(): void;
        /**
         * @description 生命周期方法-刷新模块调用
         * @effect 只在服务端调用生效
         * @groups 基类/C&S拓展
         * @param dt usage: 两帧之间的时间差(单位：秒) range: type:浮点数
         */
        protected onUpdate(dt: number): void;
        /**
         * @groups 基类/C&S拓展
         * @description 生命周期方法-销毁模块调用
         * @effect 只在服务端调用生效
         */
        protected onDestroy(): void;
        /**
         * @description 外部调用本模块的某个操作
         * @effect 只在服务端调用生效
         * @groups 基类/C&S拓展
         * @param type usage: 操作类型  range: type:
         * @param params usage: 操作参数
         */
        protected onExecute(type: number, ...params: any[]): void;
        /**
         * @groups 基类/C&S拓展
         * @description 生命周期方法-玩家进入房间(玩家刚刚连进服务器，数据和前后端通信都还没有就绪)
         * @effect 只在服务端调用生效
         * @param player usage: 玩家
         */
        protected onPlayerJoined(player: mw.Player): void;
        /**
         * @groups 基类/C&S拓展
         * @description 生命周期方法-玩家离开房间
         * @effect 只在服务端调用生效
         * @param player usage: 玩家
         */
        protected onPlayerLeft(player: mw.Player): void;
        /**
         * @groups 基类/C&S拓展
         * @description 生命周期方法-玩家进入游戏(客户端已就绪，数据就绪，前后端可正常通信)
         * @effect 只在服务端调用生效
         * @param player usage: 玩家
         */
        protected onPlayerEnterGame(player: mw.Player): void;
    }
}

declare namespace mw {
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
    class ModuleService {
        protected constructor();
        /**
         * @groups 基类/C&S拓展
         * @description 注册模块是 ModuleService 核心功能。
         * @description 1. 将各个模块都添加到ModuleService中，方便获取和管理。
         * @description 2. 按注册顺序依次执行各个模块的onAwake、onStart、onEnterScene。
         * @description 3. 将由"net_"开头的方法注册成网络方法。
         * @description 4. 让C和S关联同一份数据（数据由S端获取，玩家上线以及每次服务端save数据的时候，会同步给客户端）。
         * @effect 调用端生效
         * @param ServerModuleType usage: 模块的服务端类型
         * @param ClientModuleType usage: 模块的客户端类型
         * @param ModuleDataType usage: 模块的数据类型 default:null
         * @returns ModuleService 自身，可用作链式调用
         */
        static registerModule(ServerModuleType: mw.TypeName<mwext.ModuleS<any, any>>, ClientModuleType: mw.TypeName<mwext.ModuleC<any, any>>, ModuleDataType?: mw.TypeName<mwext.Subdata>): ModuleService;
        /**
         * @groups 基类/C&S拓展
         * @description 设置客户端第一个要启动的模块
         * @effect 只在客户端调用生效
         * @param ModuleClass usage: 模块类
         * @returns ModuleService自身，可用作链式调用
         */
        static setClientFirstStartModule(ModuleClass: mw.TypeName<mwext.ModuleC<any, any>>): ModuleService;
        /**
         * @groups 基类/C&S拓展
         * @description 根据类型获取一个模块。
         * @description 1. 实现跨模块调用（模块之间相互调用其方法）。
         * @description 2. 让外部代码进行调用（比如在UI脚本里需要使用到模块里的方法）。
         * @effect 调用端生效
         * @param ModuleClass usage: 模块类型
         * @returns 模块对象
         */
        static getModule<T extends mwext.ModuleC<any, any> | mwext.ModuleS<any, any>>(ModuleClass: mw.TypeName<T>): T;
        /**
         * @groups 基类/C&S拓展
         * @description 调用一个模块的 onExecute 方法
         * @effect 调用端生效
         * @param moduleClass usage: 模块
         * @param type usage: 给 onExecute 方法传递的操作类型，需要各个模块自己定义 default: 0  range:  type:
         * @param params usage: 给 onExecute 方法传递的参数，需要各个模块自己定义
         * @returns onExecute方法return的结果
         */
        static callExecute<T extends mwext.ModuleC<any, any> | mwext.ModuleS<any, any>>(moduleClass: mw.TypeName<T>, type?: number, ...params: any[]): any;
        /**
         * @groups 基类/C&S拓展
         * @description 注册的模块是否就绪
         * @precautions 只有在onStart生命周期注册的模块才会有效，而且不能是异步等待后注册的模块
         * @effect 调用端生效
         * @returns 异步操作的Promise
         */
        static ready(): Promise<void>;
        /**
         * @groups 基类/C&S拓展
         * @description 获取各模块update方法的执行时长，以字符串的形式返回，需要自己显示或打印出来
         * @effect 调用端生效
         * @precautions 本方法只有开启ModuleService的debug才会生效，此方法有性能消耗，只用作性能分析，正式版本不要使用
         * @returns log字符串
         */
        static getUpdateTimeLog(): string;
    }
}

declare namespace mw {
}

declare namespace mw {
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author shilong.wang
     * @description 面板类的基类，可用于控制一个界面
     * @groups 拓展/排行榜
     * @networkStatus usage: 客户端
     * @precautions 注意：如子类重写onAwake，onAdded方法，请调用super的对应方法
     */
    class BasePanel<T extends mw.UIScript> extends mwext.BaseView {
        /**
         * @groups 拓展/排行榜
         * @description 构造方法
         * @param viewClass usage: 界面类
         */
        protected constructor(viewClass: mw.TypeName<T>);
        /**
         * @groups 拓展/排行榜
         * @description 面板所控制的界面
         */
        protected get view(): T;
        /**
         * @groups 拓展/排行榜
         * @description 生命周期方法-构建面板自动触发，只会调用一次
         * @effect 只在客户端调用生效
         */
        protected onAwake(): void;
        /**
         * @groups 拓展/排行榜
         * @description 生命周期-被添加到父节点时候触发，可能会多次调用
         * @effect 只在客户端调用生效
         */
        protected onAdded(): void;
        /**
         * @groups 拓展/排行榜
         * @description 面板尺寸
         */
        get size(): mw.Vector2;
        /**
         * @groups 拓展/排行榜
         * @description 面板尺寸
         */
        set size(value: mw.Vector2);
    }
}

declare namespace mw {
    /**
     * @author shilong.wang
     * @groups 拓展/排行榜
     * @description 界面类的基类
     * @networkStatus usage: 客户端
     */
    class BaseView extends mw.UIScript {
        /**
         * @groups 拓展/排行榜
         * @description 显示全局唯一界面
         * @precautions 这种方式会先创建一个全局唯一界面
         * @effect 只在客户端调用生效
         * @param params usage: 参数序列,参数会传到界面的onShow生命周期方法中
         */
        static show(...params: any[]): void;
        /**
         * @groups 拓展/排行榜
         * @description 关闭全局唯一界面
         * @effect 只在客户端调用生效
         */
        static hide(): void;
        /**
         * @groups 拓展/排行榜
         * @description 创建界面
         * @effect 只在客户端调用生效
         * @returns 界面对象
         */
        static create<T extends mw.UIScript>(): T;
        /**
         * @groups 拓展/排行榜
         * @description 显示界面
         * @effect 只在客户端调用生效
         * @param params usage: 参数序列,参数会传到界面的onShow生命周期方法中
         */
        show(...params: any[]): void;
        /**
         * @groups 拓展/排行榜
         * @description 关闭界面
         * @effect 只在客户端调用生效
         */
        hide(): void;
        /**
         * @groups 拓展/排行榜
         * @description 判断界面是否处于显示状态
         */
        get isShow(): boolean;
        /**
         * @groups 拓展/排行榜
         * @description 是否阻挡场景点击
         */
        protected set holdBackTouch(value: boolean);
        /**
         * @groups 拓展/排行榜
         * @description 根据类型获取画布下子对象序列
         * @effect 只在客户端调用生效
         * @param canvas usage: 当前组件
         * @param getType usage: 想要获取的类型
         * @returns 所有符合类型的子对象
         */
        protected getCanvasChildren<T extends mw.Widget>(canvas: mw.Canvas, getType: mw.TypeName<T>): T[];
    }
}

declare namespace mw {
    /**
     * Decorator
     */
    namespace Decorator {
        /**
         * @description 类装饰器-自动执行某个方法
         * @author shilong.wang
         * @groups 拓展
         * @precautions 调用发生在所有游戏脚本的生命周期之前
         * @effect 调用端生效
         * @param fnName usage: 要自动执行的方法名  range: 方法名
         * @returns 装饰器方法体
         */
        function autoExecute(fnName: string): (target?: unknown) => void;
        /**
         * @author shilong.wang
         * @groups 拓展
         * @description 属性注解-持久化存储属性
         * @precautions 用于设置数据类(继承Subdata的类)哪些属性是要永久存储的
         * @effect 调用端生效
         * @param name usage: 持久化后的属性名，不写会用变量名存储 default: undefined  range: 不做限制，合理即可
         * @returns 注解方法
         */
        function persistence(name?: string): (target: mwext.Subdata, propertyKey: string) => void;
        /**
         * @author shilong.wang
         * @groups 拓展
         * @description 方法注解-被注解的net方法不需要回复客户端
         * @effect 只在服务端调用生效
         * @returns 注解方法
         */
        function noReply(): (target: mwext.ModuleS<any, any>, fnName: string, descriptor: PropertyDescriptor) => void;
    }
}

declare namespace mw {
    /**
     * @author shilong.wang
     * @description GameObject对象池资源来源类型，不同类型的资源创建方式不一样，需要正确选择
     * @groups 基类/对象池
     */
    enum GameObjPoolSourceType {
        /** 资源库资源 */
        Asset = 0,
        /** 场景对象 */
        Scene = 1,
        /** 预制体 */
        Prefab = 2
    }
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
    class GameObjPool {
        /**
         * @groups 基类/对象池
         * @description 销毁对象池全局实例
         * @effect 调用端生效
         */
        destroy(): void;
        /**
         * @groups 基类/对象池
         * @description 生成一个对象
         * @effect 调用端生效
         * @param guid usage: 资源 GUID  range: 依据资源 ID 长度而定
         * @param type usage: 资源类型 default: 资源库中的资源
         * @returns 生成的对象
         * @example
         * 使用示例:创建一个名为GameObjPoolExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在原点生成一个方块
         * ```
         * @Component
         * export default class GameObjPoolExample extends Script {
         *
         *     protected onStart(): void {
         *         this.createCube();
         *     }
         *
         *     //通过对象池动态创建一个方块
         *     public createCube(): void {
         *         const cubeAssetId = "197386";
         *         AssetUtil.asyncDownloadAsset(cubeAssetId).then(() => {
         *             let obj = GameObjPool.spawn(cubeAssetId);
         *             obj.worldTransform.position = new Vector(0, 0, 0);
         *         });
         *     }
         * }
         * ```
         */
        static spawn<T extends mw.GameObject>(guid: string, type?: GameObjPoolSourceType): T;
        /**
         * @groups 基类/对象池
         * @description 异步生成一个对象
         * @precautions 注意需要把原始资源预加载
         * @effect 调用端生效
         * @param guid usage: 资源 GUID  range: 依据资源 ID 长度而定
         * @param type usage: 资源类型 default: 资源库中的资源
         * @returns 生成的对象
         * @example
         * 使用示例:创建一个名为GameObjPoolExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在原点生成一个方块，并在5秒后消失
         * ```
         * @Component
         * export default class GameObjPoolExample extends Script {
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
        static asyncSpawn<T extends mw.GameObject>(guid: string, type?: GameObjPoolSourceType): Promise<T>;
        /**
         * @groups 基类/对象池
         * @description 归还一个对象
         * @effect 调用端生效
         * @param obj usage: 要归还的对象
         * @example
         * 使用示例:创建一个名为GameObjPoolExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在原点生成一个方块，并在5秒后消失
         * ```
         * @Component
         * export default class GameObjPoolExample extends Script {
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
        static despawn(obj: mw.GameObject): void;
        /**
         * @groups 基类/对象池
         * @description 清除对象池中该GUID对应的所有对象
         * @effect 调用端生效
         * @param guid usage: 资源 GUID  range: 依据资源 ID 长度而定
         * @param type usage: 资源类型 default: 资源库中的资源
         * @example
         * 使用示例:创建一个名为GameObjPoolExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会生成10个方块，每个方块的位置不同，5秒后全部被销毁
         * ```
         * @Component
         * export default class GameObjPoolExample extends Script {
         *
         *     protected onStart(): void {
         *         if (SystemUtil.isClient()) {
         *             this.createCube();
         *         }
         *     }
         *
         *     //通过对象池动态创建多个方块
         *     public createCube(): void {
         *         const cubeAssetId = "197386";
         *         //创建10个方块 且位置不重叠
         *         for (let i = 0;
 i < 10;
 i++) {
         *             GameObjPool.asyncSpawn(cubeAssetId, GameObjPoolSourceType.Asset).then(obj => {
         *                 obj.worldLocation = new Vector(i * 300, 0, 0);
         *                 //回收该对象但不隐藏
         *                 GameObjPool.despawn(obj);
         *                 obj.worldLocation = new Vector(i * 300, 0, 0);
         *                 obj.setVisibility(PropertyStatus.On);
         *             });
         *         }
         *         setTimeout(() => {
         *             //将对象池中通过cubeAssetId创建的并且已回收的对象销毁
         *             GameObjPool.clear(cubeAssetId);
         *         }, 5000);
         *     }
         * }
         * ```
         */
        static clear(guid: string, type?: GameObjPoolSourceType): void;
        /**
         * @groups 基类/对象池
         * @description 清除对象池里的所有对象
         * @effect 调用端生效
         * @example
         * 使用示例:创建一个名为GameObjPoolExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会生成10个方块以及10个球体，每个方块和球体的位置不同，5秒后有一半被销毁
         * ```
         * @Component
         * export default class GameObjPoolExample extends Script {
         *
         *     protected onStart(): void {
         *         if (SystemUtil.isClient()) {
         *             this.createCube();
         *         }
         *     }
         *
         *     //通过对象池动态创建多个不同物体并销毁
         *     public createCube(): void {
         *         const cubeAssetId = "197386";
         *         const cubeAssetId2 = "7675";
         *         //创建10个方块 且位置不重叠
         *         for (let i = 0;
 i < 10;
 i++) {
         *             GameObjPool.asyncSpawn(cubeAssetId, GameObjPoolSourceType.Asset).then(obj => {
         *                 obj.worldLocation = new Vector(i * 300, 0, 0);
         *                 //只回收前5个方块
         *                 if (i <= 5) return;
         *                 //回收该对象但不隐藏
         *                 GameObjPool.despawn(obj);
         *                 obj.worldLocation = new Vector(i * 300, 0, 0);
         *                 obj.setVisibility(PropertyStatus.On);
         *             });
         *         }
         *         //创建10个球体 且位置不重叠
         *         for (let i = 0;
 i < 10;
 i++) {
         *             GameObjPool.asyncSpawn(cubeAssetId2, GameObjPoolSourceType.Asset).then(obj => {
         *                 obj.worldLocation = new Vector(i * 300, 300, 0);
         *                 //只回收前5个球体
         *                 if (i <= 5) return;
         *                 //回收该对象但不隐藏
         *                 GameObjPool.despawn(obj);
         *                 obj.worldLocation = new Vector(i * 300, 300, 0);
         *                 obj.setVisibility(PropertyStatus.On);
         *             });
         *         }
         *         setTimeout(() => {
         *             //将对象池中所有已回收的对象销毁
         *             GameObjPool.clearAll();
         *         }, 5000);
         *     }
         * }
         * ```
         */
        static clearAll(): void;
    }
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
    class ObjPool<T> {
        /**
         * @groups 基类/对象池
         * @description 构造一个对象池
         * @effect 调用端生效
         * @param onCreateObj usage: 创建新对象的回调
         * @param onReset usage: 重置对象的回调 default: null
         * @param onDestroy usage: 销毁对象的回调 default: null
         * @param onDespawn usage: 归还对象的回调 default: null
         * @param initNum usage: 默认缓存对象数量 default: 2  range: 不做限制  type: 整形
         */
        constructor(onCreateObj: () => T, onReset?: (obj: T) => void, onDestroy?: (obj: T) => void, onDespawn?: (obj: T) => void, initNum?: number);
        /**
         * @groups 基类/对象池
         * @description 生成一个对象
         * @effect 调用端生效
         * @returns 对象
         */
        spawn(): T;
        /**
         * @groups 基类/对象池
         * @description 归还一个对象
         * @effect 调用端生效
         * @param obj usage: 对象
         */
        despawn(obj: T): void;
        /**
         * @groups 基类/对象池
         * @description 获取对象池中空闲对象的数量
         * @effect 调用端生效
         */
        get size(): number;
        /**
         * @groups 基类/对象池
         * @description 清除池中对象
         * @effect 调用端生效
         */
        clear(): void;
    }
}
