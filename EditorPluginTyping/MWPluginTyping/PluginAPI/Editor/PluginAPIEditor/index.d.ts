/// <reference types="EditorDetailsViewEditor" />
/// <reference types="extension" />
/// <reference types="PluginCoreEditor" />
declare namespace PluginAPI {
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
        Positioning = 7,
        DeleteRowBtn = 8,
        DeleteArrayItem = 9,
        CaptureProperty = 10
    }
    class CustomRowHeightData extends EditorPlugin.CustomRowHeightData {
        constructor(customRowHeight: number, propertyContent: number);
        get customRowHeight(): Readonly<number>;
        get propertyContentHeight(): Readonly<number>;
    }
    class DetailsRowData extends EditorPlugin.DetailsRowData {
        constructor(rowName: string, showWidget: mw.Widget, funList: funButton[], inNameVisibility: mw.SlateVisibility, customRowHeight: number, propertyContent: number);
        private _funBtnList;
        get showWidget(): mw.Widget;
        get rowName(): Readonly<string>;
        get funList(): Readonly<funButton[]>;
        get customRowHeightData(): Readonly<CustomRowHeightData>;
        get nameVisibility(): Readonly<mw.SlateVisibility>;
    }
    /**
     * @description 替换编辑器下，属性面板的控制器
     * @effect usage:Editor
    */
    function SetDetailsControllerClass<T extends DetailsController>(PanelClass: {
        new (): T;
    }): void;
    /**
     * @description 刷新编辑器下所有属性面板的Controller
     * @effect usage:Editor
    */
    function ReplaceCurrentController(): void;
    /**
     * @description 替换编辑器下，属性面板的默认样式
     * @effect usage:Editor
     */
    function OverloadDetailsPanelUI<T extends PropertyItemBase>(type: mweditor.EPropertyType, PanelClass: {
        new (): T;
    }): void;
    function GetAllBindScriptPathByObject(obj: any): Readonly<string[]>;
    /**
     * @author jie.wu
     * @groups 属性面板插件
     * @description 属性面板属性Item基类
     * @effect usage:Editor
     */
    abstract class PropertyItemBase extends EditorPlugin.PropertyItemBase {
        abstract freshInternationalization(bFresh: boolean): void;
        /**
        * @description 能否执行重置， 如果该属性支持重置， 且该值为true时， 会显示重置功能按钮
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
        * @description 获取当前的属性值
        */
        abstract getValue(): any;
        /**
        * @description 接受&初始化 该条属性的信息
        * @param inData usage:包含当前属性的Data
        */
        abstract initialization(inData: mweditor.PropertyDataBase): void;
    }
    /**
     * @author jie.wu
     * @groups 属性面板插件
     * @description 属性面板内置控制器， 所有编辑器
     * @effect usage:Editor
     */
    abstract class DetailsController extends EditorPlugin.DetailsControllerBase {
        /******************************************* 生命周期 *******************************************************/
        /**
         * @description 生命周期_属性面板创建时通知， 请实现接口，完成控制器逻辑初始化
         * @effect usage:Editor
        */
        abstract onStart(): any;
        /**
         * @description 生命周期_属性面板销毁时通知，请实现接口，做好控制器数据清理/保存
         * @effect usage:Editor
        */
        abstract onDestroyed(): any;
        /**
         * @groups 属性面板插件
         * @description 生命周期函数 - 每帧执行函数
         * @effect usage:Editor
         */
        onUpdate(): void;
        /**
         * @description 属性改变时回调
         * @effect usage:Editor
         * @param propData usage:当前变化属性对应的Data数据
         */
        PostEditChangeProperty(propData: mweditor.PropertyDataBase): void;
        /******************************************** property ******************************************************/
        /**
         * @description 获取当前属性面板的所属类型
         * @effect usage:Editor
         * @return 返回当前属性面板的所属类型
         */
        get tabOwner(): Readonly<mweditor.TabOwner>;
        /**
         * @description 获取当前属性面板的所属空间的资源ID
         * @effect usage:Editor
         * @return 返回当前属性面板的所属空间的资源ID (主视口 = "", UI = UI资源ID)
         */
        get tabAssetID(): Readonly<string>;
        /**
         * @description 获取当前选中的对象
         * @effect usage:Editor
         * @return 返回当前选中的对象
         */
        get curObjs(): any[];
        /**
         * @description 获取当前面板的属性节点数据
         * @effect usage:Editor
         * @return 返回当前面板的属性节点数据
         */
        get curPropertyData(): mweditor.PropertyDataBase[];
        /******************************************** func ******************************************************/
        /**
         * @description 刷新属性面板
         * @effect usage:Editor
         */
        RequestRefresh(): void;
        /**
         * @description 替换当前属性面板的选中对象
         * @effect usage:Editor
         */
        SetObject(objs: any[]): void;
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
        /*******************************************完善一调属性相关功能配置的接口 *******************************************************/
        /**
         * @groups 属性面板插件
         * @description 属性类型预期,展示的名称， 当前情况widget不一定可用， 根据属性预设
         * @effect usage:Editor 复写实现自定义设计属性内容, 直接调用获取当前配置情况
         */
        getCustomDisplayName(inData: mweditor.PropertyDataBase): string;
        /**
         * @groups 属性面板插件
         * @description 属性类型预期名称显隐， 当前情况widget不一定可用， 根据属性预设
         * @effect usage:Editor 复写实现自定义设计属性内容, 直接调用获取当前配置情况
         */
        getCustomNameVisibility(inData: mweditor.PropertyDataBase): mw.SlateVisibility;
        /**
         * @groups 属性面板插件
         * @description 属性类型预期展示空间大小， 当前情况widget不一定可用， 根据属性预设
         * @effect usage:Editor 复写实现自定义设计属性内容, 直接调用获取当前配置情况
         */
        getCustomRowData(inData: mweditor.PropertyDataBase): EditorPlugin.CustomRowHeightData;
        /**
         * @groups 属性面板插件
         * @description 属性类型预期支持的功能按钮列表， 当前情况widget不一定可用， 根据属性预设
         * @effect usage:Editor 复写实现自定义设计属性内容, 直接调用获取当前配置情况
         */
        getCustomFunBtnList(inData: mweditor.PropertyDataBase): funButton[];
    }
}
