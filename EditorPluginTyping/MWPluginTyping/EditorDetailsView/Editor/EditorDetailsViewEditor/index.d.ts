/// <reference types="PluginCoreEditor" />
/// <reference types="extension" />
declare namespace EditorPlugin {
    /**
     * @author jie.wu
     * @groups 属性面板插件
     * @description 属性面板内置控制器，属性面板创建时自动创建，并跟随属性面板生命周期执行
     * @effect usage:Editor
     */
    class DetailsControllerBase {
        /** 默认的1controller，再没有已知controller时，提供一些功能接口的默认使用渠道 */
        static DefaultController: DetailsControllerBase;
        protected myDetailsOwner: WeakRef<EditorPlugin.DetailsView>;
        protected myTabOwner: mweditor.TabOwner;
        protected myTabOwnerID: string;
        /******************************************* 内部接口 *******************************************************/
        replaceSelf(newController: DetailsControllerBase): void;
        /**
         * @groups 属性面板插件
         * @description 属性Item刷新时， 提前预设展示属性所需要的大小
         * @effect usage:Editor
         */
        getPreviewItemSize(previewItem: mweditor.PropertyDataBase): number;
        /*******************************************暴露出去，完善功能的接口 *******************************************************/
        /**
         * @groups 属性面板插件
         * @description 属性类型预期,展示的名称， 当前情况widget不一定可用， 根据属性预设
         * @effect usage:Editor
         */
        getCustomDisplayName(inData: mweditor.PropertyDataBase): string;
        /**
         * @groups 属性面板插件
         * @description 属性类型预期名称显隐， 当前情况widget不一定可用， 根据属性预设
         * @effect usage:Editor
         */
        getCustomNameVisibility(inData: mweditor.PropertyDataBase): mw.SlateVisibility;
        /**
         * @groups 属性面板插件
         * @description 属性类型预期展示空间大小， 当前情况widget不一定可用， 根据属性预设
         * @effect usage:Editor
         */
        getCustomRowData(inData: mweditor.PropertyDataBase): EditorPlugin.CustomRowHeightData;
        /**
         * @groups 属性面板插件
         * @description 属性类型预期支持的功能按钮列表， 当前情况widget不一定可用， 根据属性预设
          * @effect usage:Editor
         */
        getCustomFunList(inData: mweditor.PropertyDataBase): EditorPlugin.funButton[];
        /**
         * @groups 属性面板插件
         * @description 保存属性折叠状态
         * @effect usage:Editor
         */
        saveExpandConfig(inData: mweditor.PropertyDataBase, section: string): void;
        /**
         * @groups 属性面板插件
         * @description 获取属性记录的折叠状态
         * @effect usage:Editor
         */
        getExpandConfig(inData: mweditor.PropertyDataBase, section: string): any;
        /*******************************************暴露出去，必须的生命周期接口 *******************************************************/
        init(detailsOwner: EditorPlugin.DetailsView, TabOwner: mweditor.TabOwner, inTabAssetID: string): void;
        /**
         * @groups 属性面板插件
         * @description 生命周期_属性面板创建时通知， 请实现接口，完成控制器逻辑初始化
         * @effect usage:Editor
         */
        onStart(): void;
        /**
         * @groups 属性面板插件
         * @description 生命周期_属性面板销毁时通知，请实现接口，做好控制器数据清理/保存
         * @effect usage:Editor
         */
        onDestroyed(): void;
        /**
         * @groups 属性面板插件
         * @description 生命周期函数 - 每帧执行函数
         * @effect usage:Editor
         */
        onUpdate(): void;
        /**
         * @groups 属性面板插件
         * @description 属性改变时回调
         * @effect usage:Editor
         */
        postEditChangeProperty(propData: mweditor.PropertyDataBase): void;
    }
    enum DetailsLogLevel {
        info = 0,
        log = 1,
        table = 2,
        debug = 3,
        warn = 4,
        error = 5
    }
    /**
     * @author jie.wu
     * @groups 属性面板插件
     * @description 属性面板
     * @effect usage:Editor
     */
    class DetailsViewMgr {
        private static rowWidgetPath;
        private static overloadWidgetClass;
        private static curControllerClass;
        private static curControllersMap;
        private static curCacheIndex;
        private static expectedCacheNumberMap;
        static Get(): DetailsViewMgr;
        static prepareExpectedWidgetCache(): void;
        /******************************************* 配置相关 *******************************************************/
        /**
         *  @description 设置属性面板自动绑定的控制类, 下一次创建时生效
         */
        static setControllerClass<T extends DetailsControllerBase>(PanelClass: {
            new (): T;
        }): void;
        /**
         *  @description 获取属性面板自动绑定的控制类
         *  @return 返回控制类型的对象
         */
        static newControllerObj<T extends DetailsControllerBase>(): T;
        static addCacheController(ID: string, Controller: DetailsControllerBase): void;
        static removeCacheController(ID: string): void;
        /**
         *  @description 替换当前的所有Controller
         */
        static replaceCurrentController(): void;
        static overloadDetailsPanelUI<T extends EditorPlugin.PropertyItemBase>(type: mweditor.EPropertyType, PanelClass: {
            new (): T;
        }): void;
        /******************************************* 功能接口 *******************************************************/
        private logLevel;
        printLogs(logLevel: DetailsLogLevel, log: string): void;
        getDetailsRowData(inData: mweditor.PropertyDataBase, ownerDetailsView: EditorPlugin.DetailsView, oldWidget: mw.Widget): EditorPlugin.DetailsRowData;
    }
}

/**
 * AUTHOR: 别让梦想只是梦想
 * TIME: 2023.11.07-10.11.11
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
/// <reference types="extension" />
/// <reference types="PluginCoreEditor" />
/// <reference types="extension" />
declare namespace EditorPlugin {
    class DetailsView extends mw.UIScript {
        private myDetailsTool;
        private myController;
        tabAssetID: string;
        private tabOwner;
        private module;
        private user_modifytime;
        private user_modifytimetotal;
        private propertyBox;
        private noPropertyTips;
        private detailsList;
        private basicArea;
        private searchBox;
        private searchBK;
        private searchBtn;
        private expandButton;
        private allFold;
        private openCharacterEditor;
        private openCharacterText;
        private searchClearBtn;
        private beginDrop;
        private dropAsset;
        selectObjs: any[];
        private configSection;
        private needLoadOffset;
        private shortcut;
        private cacheWorkMenuList;
        private menuUIDList;
        private isShowAdvanced;
        private sourceData;
        private baseData;
        private clickedItems;
        private setObjsBind;
        private updateSelectionBind;
        private propertyChangedBind;
        private openBind;
        private closeBind;
        onMaterialIndexChange: mw.MulticastDelegate<(curIndex: number) => void>;
        onClearData: mw.MulticastDelegate<() => void>;
        curMaterialIndex: number;
        onShowTipsErrorPost: mw.MulticastDelegate<(bindData: mweditor.PropertyDataBase, bVisible: boolean) => void>;
        private timerHandler;
        private onIntervalUpdateBind;
        myInternationalization: mweditor.Internationalization;
        private curInternationalization;
        private BDataSystem;
        private bFreshUpData;
        ProPertyName: string;
        get curSourceData(): mweditor.PropertyDataBase[];
        get detailTabOwner(): Readonly<mweditor.TabOwner>;
        get detailsTool(): mweditor.DetailsTool;
        get detailViewList(): mweditor.TreeView;
        get controller(): EditorPlugin.DetailsControllerBase;
        get isShowAdvancedProperties(): boolean;
        PropertyChanged(bForce: boolean, propertiesChangeInfo: mweditor.ProperChangeInfo[]): void;
        private reSetDataStatus;
        private findPropertyData;
        Open(): void;
        Close(): void;
        Init(inTabAssetID: string, owner: mweditor.TabOwner): void;
        /**
         * 构造UI文件成功后，在合适的时机最先初始化一次
         */
        protected onStart(): void;
        private onIntervalUpdate;
        freshInternationalization(bFresh?: boolean): void;
        private initMenuList;
        private onPreviewItemSize;
        private onMakeMenu;
        private onClickMenuItem;
        private Redo;
        private Undo;
        private clearSetObject;
        updateSelection(objs: any[]): void;
        bSelectChange: boolean;
        tempSelectObjs: any[];
        private clearDataOwner;
        private prepareToReset;
        setObject(objs: any[]): void;
        private CheckSelectionHasChanged;
        changeObject(objs: any[]): void;
        private ExpansionNode;
        private onRowGenerate;
        private onItemClicked;
        private toggleAllExpansion;
        /**
         * 判断一条属性是否是展示在基础区域的属性
         * @param inData usage:属性节点
         * @returns boolean
         */
        private isBasicProperty;
        /**
         * 将属性/分组节点的所有父级设置为可见
         * @param inData usage:属性节点
         */
        private setAllParentsVisible;
        /**
         * 将分组节点的所有子级设置为可见
         * @param inData		usage:属性节点
         */
        private setAllChildrenVisible;
        /**
         * 查找树状节点下所有与搜索字段相匹配的节点
         * @param inData 			usage:树状节点
         * @param searchText 		usage:搜索字段
         * @param propertyResults	usage:属性节点搜索结果
         * @param categoryResults	usage:分组节点搜索结果
         * @returns 	 			搜索结果
         */
        private fliterTreeData;
        /**
         * 复制传入的分组节点及其子节点
         * @param inData 			usage:分组节点
         * @returns 搜索结果
         */
        private createNewCategoryData;
        /**
         * 创建一颗新树用于展示搜索结果
         * @returns 搜索结果
         */
        private getSearchResultData;
        /**
         * 搜索栏回调
         * @param searchText	usage:搜索字段
         * @param CommitMethod 	usage:触发方法
         */
        private onSearchDetails;
        private expandNode;
        private Clear;
        replaceCurrentController(newController: EditorPlugin.DetailsControllerBase): void;
        /**
        * 构造UI文件成功后，UI对象再被销毁时调用
        * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
        */
        protected onDestroy(): void;
        /**************************************** 脚本注册/注销 ***********************************************/
        /**
         * 拖拽操作生成事件触发后经过这个UI时触发
         * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
         */
        protected onDragOver(InGeometry: mw.Geometry, InDragDropEvent: mw.PointerEvent, InDragDropOperation: mw.DragDropOperation): boolean;
        /**
         * 拖拽操作生成事件触发后在这个UI释放完成时
         * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
         */
        protected onDrop(InGeometry: mw.Geometry, InDragDropEvent: mw.PointerEvent, InDragDropOperation: mw.DragDropOperation): boolean;
        /**
         * 拖拽操作生成事件触发后进入这个UI时触发
         */
        protected onDragEnter(InGeometry: mw.Geometry, InDragDropEvent: mw.PointerEvent, InDragDropOperation: mw.DragDropOperation): boolean;
        /**
         * 拖拽操作生成事件触发后离开这个UI时触发
         */
        protected onDragLeave(InDragDropEvent: mw.PointerEvent, InDragDropOperation: mw.DragDropOperation): void;
        b_Force: boolean;
        Refreshed(): void;
        reGenerate(): void;
        reQuestRefresh(): void;
        DeleteRowBtn(objs: any[]): void;
        /**************************************** 埋点 ***********************************************/
        ReportScriptBData(obj: any[], data: mweditor.CategoryData, oldValue: string, newValue: string, widgetType: mweditor.BData_PropertyWidgetType, widgetMethod: mweditor.BData_PropertyWidgetMethod): void;
        ReportPropertyBData(obj: any[], data: mweditor.PropertyData, oldValue: string, newValue: string, widgetType: mweditor.BData_PropertyWidgetType, widgetMethod: mweditor.BData_PropertyWidgetMethod): void;
        private SendBData;
    }
}

/// <reference types="PluginCoreRuntime" />
/// <reference types="PluginCoreEditor" />
/// <reference types="extension" />
declare namespace EditorPlugin {
    class AutoItInfo {
        constructor(name: string, itAuthor: string, itFeiShuID: string, func: () => AutoTestResultItem[], optional?: {
            itTaskType?: mweditor.TaskType;
            itLogType?: mweditor.CheckAutoTestInfo;
            itIsAsync?: boolean;
            itTimeOut?: number;
        });
        itName: string;
        author: string;
        feiShuID: string;
        private itFunc;
        TaskType: mweditor.TaskType;
        logType: mweditor.CheckAutoTestInfo;
        bIsAsync: boolean;
        timeOut: number;
        run(): AutoTestResultItem[];
    }
    enum AutoTestResultType {
        log = 0,
        error = 1,
        warn = 2
    }
    class AutoTestResultItem {
        constructor(type: AutoTestResultType, str: string);
        resultType: AutoTestResultType;
        resultStr: string;
    }
    /**
     * @description 属性Item基类接口， 抽象出一条属性WIdget 必须的接口
     * @effect 在回调中修改属性值时， 需要添加 撤销恢复 记录才能支持改属性的撤销恢复功能
     * @author jie.wu
     * @example
     * {
     * 	let transactionTitle = `DetailsView_SetBoolean:${this.propertyData?.property.PropertyCompletePath}`;
     * 	mweditor.BeginTransaction(this.propertyData?.propertyOwners, transactionTitle);
     *  this.setValue(true);
     *  mweditor.EndTransaction();
     * }
     */
    abstract class PropertyItemBase extends mw.UIScript {
        /**
         * 构造UI文件成功后，在合适的时机最先初始化一次
         */
        protected onStart(): void;
        curInternationalization: string;
        ownerDetailsViewWeak: WeakRef<EditorPlugin.DetailsView>;
        propertyDataWeak: WeakRef<mweditor.PropertyDataBase>;
        BData_WidgetType: mweditor.BData_PropertyWidgetType;
        BData_WidgetMethod: mweditor.BData_PropertyWidgetMethod;
        /**
        * @description 刷新多语言
        */
        abstract freshInternationalization(bFresh: boolean): void;
        /**
        * @description 能否执行重置， 如果该属性支持重新， 且改值为true时， 会显示重置功能按钮
        */
        abstract canRestore(): boolean;
        /**
        * @description 复制当前属性
        */
        abstract copyProperty(): string;
        /**
        * @description 检测当前剪切板的内容是否符合改属性格式
        * @return 返回能否粘贴
        */
        abstract canPast(ClipBoardCopy: string): boolean;
        /**
        * @description 粘贴剪切板内容
        */
        abstract pastProperty(ClipBoardCopy: string): void;
        /**
        * @description 执行属性改值的操作
        */
        abstract setValue(inValue: any): void;
        /**
        * @description 获取当前的属性改值
        */
        abstract getValue(): any;
        /**
        * @description 接受&初始化 该条属性的信息
        * @param inData usage:包含当前属性的Data
        * @param ownerDetailsView usage:当前的属性面板， 用于获取&操作当前属性面板
        *
        */
        abstract init(inData: mweditor.PropertyDataBase, ownerDetailsView: EditorPlugin.DetailsView): void;
        /**
         * @description 刷新Row的狀態，顯影，只讀，大小等
         */
        refreshStatus(): void;
        /******************************************* 单元测试部分接口 ************************************************************************/
        prepareCases(): AutoItInfo[];
        setValueAndCheckByWidget(parentScript: DetailsRowBase): AutoTestResultItem[];
        setValueAndCheckByWidgetAsync(parentScript: DetailsRowBase): Promise<AutoTestResultItem[]>;
        restoreAndCheckByWidget(parentScript: DetailsRowBase): AutoTestResultItem[];
        restoreAndCheckByWidgetAsync(parentScript: DetailsRowBase): Promise<AutoTestResultItem[]>;
        copyAndPastCheckByWidget(parentScript: DetailsRowBase): AutoTestResultItem[];
        copyAndPastCheckByWidgetAsync(parentScript: DetailsRowBase): Promise<AutoTestResultItem[]>;
    }
}

/// <reference types="extension" />
declare namespace EditorPlugin {
    /**
     * 每一条属性整体占用高度
     */
    const detailRowBaseDefaultHeight = 32;
    /**
     * 每一条属性具体功能区域占用高度
     */
    const propertyContentDefaultHeight = 26;
    const PropertyTextSize = 10;
    const propertyTextColor = "#A5A6A7";
    const propertyHoverColor = "#007AFF";
    const CategoryTextSize = 11;
    const CategoryTextColor = "#FFFFFF";
    const AssetDefaultImageID = "picture_missing.png";
    enum funButton {
        PreviewPlay = 0,
        PreviewPause = 1,
        EditScript = 2,
        Copy = 3,
        Restore = 4,
        AddArrayItem = 5,
        AddRowBtn = 6,
        Positioning = 7,
        DeleteRowBtn = 8,
        DeleteArrayItem = 9,
        CaptureProperty = 10,
        ColorGradient = 11
    }
    class CustomRowHeightData {
        constructor(customRowHeight: number, propertyContent: number);
        private overrideRowHeight;
        private overridePropertyContent;
        get customRowHeight(): Readonly<number>;
        get propertyContentHeight(): Readonly<number>;
    }
    class DetailsRowData {
        constructor(rowName: string, showWidget: mw.Widget, funList: funButton[], inNameVisibility: mw.SlateVisibility, customRowHeight: number, propertyContent: number);
        private name;
        private widget;
        private funBtnList;
        private customData;
        private nameAreaVisibility;
        get showWidget(): mw.Widget;
        get rowName(): Readonly<string>;
        get funButtonList(): Readonly<funButton[]>;
        get customRowHeightData(): Readonly<CustomRowHeightData>;
        get nameVisibility(): Readonly<mw.SlateVisibility>;
    }
}
