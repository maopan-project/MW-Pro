declare namespace mweditor {
}

declare namespace mweditor {
}

declare namespace mweditor {
    /**
     * @description 装饰器，菜单项，动态注册一个菜单，修饰一个全局函数作为菜单触发的回调函数
     * @param menuItem 菜单项的唯一区分路径，如果相同则无法生效
     */
    function MenuItem(menuItem: string): any;
    /**
     * 创建一个Toolbar的按钮
     * @param name 按钮名称
     * @param framePrefix 插件目录下的按钮资源名称前缀
     * @param type 工具栏类型，默认放在插件工具栏
     * @returns
     */
    function ToolBarItem(name: string, framePrefix: string, type?: number): any;
}

declare namespace mweditor {
}

declare namespace mweditor {
}

declare namespace mweditor {
}

declare namespace mweditor {
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    /**
     * @author denghognbing
     * @description 相机设置
     */
    class CameraSetting extends mweditor.GameObject {
        constructor(actor: any);
        /**
         * @description 摄像相对位置
         */
        static get RelativeLocationConfig(): mw.Vector;
        /**
         * @description 摄像相对位置
         */
        static set RelativeLocationConfig(value: mw.Vector);
        /**
         * @description 摄像相对旋转
         */
        static get RelativeRotationConfig(): mw.Vector;
        /**
         * @description 摄像相对旋转
         */
        static set RelativeRotationConfig(value: mw.Vector);
        /**
         * @description 摄像机模式
         */
        static set CameraMode(value: mw.CameraPreset);
        /**
         * @description 摄像机模式
         */
        static get CameraMode(): mw.CameraPreset;
        /**
         * @description 是否开启真实镜头
         */
        static get bRealEffectEnabled(): boolean;
        static set bRealEffectEnabled(value: boolean);
        /**
         * @description 投影模式
         */
        static get cameraProjectionMode(): mw.CameraProjectionMode;
        static set cameraProjectionMode(value: mw.CameraProjectionMode);
        /**
         * @description 正交宽度
         */
        static get orthoWidth(): number;
        static set orthoWidth(value: number);
        /**
         * @description 正交视图近平面距离
         */
        static get orthoNearClipPlane(): number;
        static set orthoNearClipPlane(value: number);
        /**
         * @description 正交试图远平面距离
         */
        static get orthoFarClipPlane(): number;
        static set orthoFarClipPlane(value: number);
        /**
         * @description 视场
         */
        static get cameraFOV(): number;
        static set cameraFOV(value: number);
        /**
         * @description 摄像机位置模式
         */
        static get cameraLocationMode(): mw.CameraPositionMode;
        static set cameraLocationMode(value: mw.CameraPositionMode);
        /**
         * @description 摄像机朝向模式
         */
        static get cameraRotationMode(): mw.CameraRotationMode;
        static set cameraRotationMode(value: mw.CameraRotationMode);
        /**
         * @description 挂点位置偏移
         */
        static get targetOffset(): mw.Vector;
        static set targetOffset(value: mw.Vector);
        /**
         * @description 摄像机位置偏移
         */
        static get socketOffset(): mw.Vector;
        static set socketOffset(value: mw.Vector);
        /**
         * @description 摄像机固定高度
         */
        static get bFixedCameraZAxis(): boolean;
        static set bFixedCameraZAxis(value: boolean);
        /**
         * @description 弹簧臂位置
         */
        static get springArmRelativeLocation(): mw.Vector;
        static set springArmRelativeLocation(value: mw.Vector);
        /**
         * @description 弹簧臂旋转
         */
        static get springArmRelativeRotation(): mw.Vector;
        static set springArmRelativeRotation(value: mw.Vector);
        /**
         * @description 弹簧臂长度
         */
        static get targetArmLength(): number;
        static set targetArmLength(value: number);
        /**
         * @description 是否有摄像机碰撞
         */
        static get bCameraCollisionEnabled(): boolean;
        static set bCameraCollisionEnabled(value: boolean);
        /**
         * @description 是否开启摄像机位置延迟
         */
        static get bCameraLocationLagEnabled(): boolean;
        static set bCameraLocationLagEnabled(value: boolean);
        /**
         * @description 摄像机延迟位置速度
         */
        static get cameraLocationLagSpeed(): number;
        static set cameraLocationLagSpeed(value: number);
        /**
         * @description 是否开启摄像机旋转延迟
         */
        static get bCameraRotationLagEnabled(): boolean;
        static set bCameraRotationLagEnabled(value: boolean);
        /**
         * @description 摄像机旋转延迟速度
         */
        static get cameraRotationLagSpeed(): number;
        static set cameraRotationLagSpeed(value: number);
        /**
         * @description 摄像机向上限制角度
         */
        static get cameraUpLimitAngle(): number;
        static set cameraUpLimitAngle(value: number);
        /**
         * @description 摄像机向下限制角度
         */
        static get cameraDownLimitAngle(): number;
        static set cameraDownLimitAngle(value: number);
        /**
         * @description 是否开启遮挡检测
         */
        static get bOcclusionDetectionEnabled(): boolean;
        static set bOcclusionDetectionEnabled(value: boolean);
        /**
       * @description 是否开启物体透明
       */
        static get bFadeObstructionEnabled(): boolean;
        static set bFadeObstructionEnabled(value: boolean);
        /**
       * @description 物体不透明度
       */
        static get fadeObstructionOpacity(): number;
        static set fadeObstructionOpacity(value: number);
        /**
       * @description 开启碰撞抬高
       */
        static get bRaiseCameraEnabled(): boolean;
        static set bRaiseCameraEnabled(value: boolean);
        /**
       * @description 抬高高度
       */
        static get raiseCameraHeight(): number;
        static set raiseCameraHeight(value: number);
        /**
       * @description 开启摄像机放缩距离
       */
        static get bZoomEnabled(): boolean;
        static set bZoomEnabled(value: boolean);
        /**
       * @description 放缩距离范围
       */
        static get zoomDistanceRange(): mw.Vector2;
        static set zoomDistanceRange(value: mw.Vector2);
        /**
       * @description 放缩距离输入比例
       */
        static get zoomScale(): number;
        static set zoomScale(value: number);
    }
}

/** @hidden */
declare namespace mweditor {
}

declare namespace mweditor {
}

/// <reference types="Core" />
declare namespace mweditor {
    class ObjectBase {
    }
    class GameObject extends ObjectBase {
        static find<T extends GameObject>(Object: mw.GameObject, ViewPort?: mweditor.ViewPort): T;
    }
}

/// <reference types="Extension" />
declare namespace mweditor {
    /**
     * @author chenghao.song,guang.deng
     * @description 角色默认配置
     */
    class PlayerWolrdSetting extends mweditor.GameObject {
        /**
         * @description 角色缩放
         */
        static set playerScale(scale: number);
        static get playerScale(): number;
        /**
         * @description 是否开启移动
         */
        static set bEnableMove(value: boolean);
        static get bEnableMove(): boolean;
        /**
         * @description 最大行走速度
         */
        static set maxWalkSpeed(value: number);
        static get maxWalkSpeed(): number;
        /**
         * @description 最大加速度
         */
        static set maxAcceleration(value: number);
        static get maxAcceleration(): number;
        /**
         * @description 不可跨越高度
         */
        static set maxStepHeight(value: number);
        static get maxStepHeight(): number;
        /**
         * @description 可行走的最大角度
         */
        static set walkableFloorAngle(value: number);
        static get walkableFloorAngle(): number;
        /**
         * @description 最大转向速度
         */
        static set rotateRate(value: number);
        static get rotateRate(): number;
        /**
         * @description 运动面朝方向
         */
        static set moveFacingDirection(value: mw.MoveFacingDirection);
        static get moveFacingDirection(): number;
        /**
         * @description 运动时依据的正方向
         */
        static set movementDirection(value: mw.MoveFacingDirection);
        static get movementDirection(): mw.MoveFacingDirection;
        /**
         * @description 地面摩檫力
         */
        static set groundFriction(value: number);
        static get groundFriction(): number;
        /**
         * @description 是否使用单独摩擦系数
         */
        static set bGroundFrictionEnabled(value: boolean);
        static get bGroundFrictionEnabled(): boolean;
        /**
         * @description 飞行制动速率
         */
        static set brakingDecelerationFlying(value: number);
        static get brakingDecelerationFlying(): number;
        /**
         * @description 最大飞行速度
         */
        static set maxFlySpeed(value: number);
        static get maxFlySpeed(): number;
        /**
         * @description 最大游泳速度
         */
        static set maxSwimSpeed(value: number);
        static get maxSwimSpeed(): number;
        static set brakingDecelerationSwimming(value: number);
        /**
         * @description 游泳制动速率
         */
        static get brakingDecelerationSwimming(): number;
        /**
         * @description 最大下落速度
         */
        static set maxFallingSpeed(value: number);
        static get maxFallingSpeed(): number;
        /**
         * @description 下落制动速率
         */
        static set brakingDecelerationFalling(value: number);
        static get brakingDecelerationFalling(): number;
        /**
         * @description 下落控制提升乘数
         */
        static set airControl(value: number);
        static get airControl(): number;
        /**
         * @description 下落控制提升乘数
         */
        static set airControlBoostMultiplier(value: number);
        static get airControlBoostMultiplier(): number;
        /**
         * @description 下落控制提升速度阈值
         */
        static set airControlBoostVelocityThreshold(value: number);
        static get airControlBoostVelocityThreshold(): number;
        /**
         * @description 能否跳跃
         */
        static set bEnableJump(value: boolean);
        static get bEnableJump(): boolean;
        /**
         * @description 最大跳跃高度
         */
        static set maxJumpHeight(value: number);
        static get maxJumpHeight(): number;
        /**
         * @description 最大可跳跃次数
         */
        static set jumpMaxCount(value: number);
        static get jumpMaxCount(): number;
        /**
         * @description 下蹲时的高度
         */
        static set crouchedHeight(value: number);
        static get crouchedHeight(): number;
        /**
         * @description 是否显示角色名字，默认开
         */
        static set bShowDisplayName(value: boolean);
        static get bShowDisplayName(): boolean;
        /**
         * @description 角色名字
         */
        static set displayName(value: string);
        static get displayName(): string;
        /**
         * @description 是否勾选了MWEditor里面的平台形象
         */
        static set bUse233Role(value: boolean);
        static get bUse233Role(): boolean;
    }
}

declare namespace mweditor {
}

declare namespace mweditor {
}

declare namespace mweditor {
    class StringUtils {
        /**
         * 获取字符串长度
         * 中文占2个，英文占用1个
         */
        static getStringLength(inStr: string): number;
        /**
         *
         * @param inStr 检查是不是有特殊符号 只包含数字、中文和下横线
         */
        static checkStringValid(inStr: string): boolean;
    }
}

declare namespace mweditor {
}

declare namespace mweditor {
}

declare namespace mweditor {
}

declare namespace mweditor {
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    class Image extends mw.Image {
        /**
         * @description 点击事件
         * @returns 返回事件的代理
         */
        get onClicked(): mw.Delegate<() => boolean>;
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    class InputKeySelector extends mw.Widget {
        get SelectedKey(): mweditor.InputChord;
        get OnKeySelected(): mw.MulticastDelegate<(SelectedKey: mweditor.InputChord) => void>;
        get OnIsSelectingKeyChanged(): mw.MulticastDelegate<() => void>;
        get KeySelectionText(): string;
        get NoKeySpecifiedText(): string;
        get bAllowModifierKeys(): boolean;
        get bAllowGamepadKeys(): boolean;
        get Margin(): mw.Margin;
        set bAllowModifierKeys(bInAllowModifierKeys: boolean);
        set bAllowGamepadKeys(bInAllowGamepadKeys: boolean);
        set KeySelectionText(InKeySelectionText: string);
        set NoKeySpecifiedText(InNoKeySpecifiedText: string);
        set SelectedKey(InSelectedKey: mweditor.InputChord);
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    class ListView extends mw.ListView {
        /**
         * @description 返回菜单启动
         * @effect 插件化生效
         * @returns 返回菜单启动
         */
        get onMenuReadyOpen(): mw.MulticastDelegate<(menuAnchor: mweditor.MenuAnchor) => void>;
        /**
         * @description 计算当前拖拽鼠标位于控件的什么位置
         * @effect  只在客户端调用生效
         * @param localPointerPos usage:当前鼠标位置
         * @param localSize usage:控件大小
         * @returns 返回拖拽目标位置 -1：当前控件之前；0：当前控件；1当前控件之后
         */
        calcDropZone(localPointerPos: mw.Vector2, localSize: mw.Vector2): number;
        /**
         * @description 设置当前节点的放下位置
         * @effect  只在客户端调用生效
         * @param targetItem usage:当前节点
         * @param itemZoneType usage:放下位置类型
         */
        setItemDropZone(targetItem: mw.ListViewItemDataBase, itemZoneType: number): void;
        /**
         * @description 设置当前节点的样式类型
         * @effect  只在客户端调用生效
         * @param targetItem usage:当前节点
         * @param useErrorStyle usage:是否使用错误提示样式
         */
        setItemErrorStyle(targetItem: mw.ListViewItemDataBase, useErrorStyle: boolean): void;
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    /**
     * @author jianke.feng
     * @groups 界面/控件/菜单锚点
     * @description 菜单锚点
     * @networkStatus usage:客户端
     */
    class MenuAnchor extends mw.Widget {
        get maxListHeight(): number;
        set maxListHeight(inHeight: number);
        /**
         * @description 默认右键打开
         */
        get isRightClickOpen(): boolean;
        /**
         * @description 默认右键打开
         */
        set isRightClickOpen(isOpen: boolean);
        /**
         * @description 打开状态
         */
        get isOpen(): boolean;
        /**
         * @description 打开位置
         */
        get placement(): mw.MenuPlacement;
        /**
         * @description 打开位置
         */
        set placement(inType: mw.MenuPlacement);
        /**
         * @description 菜单切换开关状态
         */
        get onMenuOpenChange(): mw.MulticastDelegate<(isOpen: boolean) => void>;
        /**
         * @description 菜单项点击事件
         */
        get onClickMenuItem(): mw.MulticastDelegate<(menuId: string) => void>;
        /**
         * @description 新增菜单项
         * @param info 菜单信息
         * @networkStatus usage:客户端
         */
        addMenuItem(info: mweditor.MenuItemInfo | mweditor.MenuItemInfo[]): void;
        /**
         * @description 移除菜单项
         * @param info 菜单信息
         * @networkStatus usage:客户端
         */
        removeMenuItem(info: mweditor.MenuItemInfo | mweditor.MenuItemInfo[]): void;
        /**
         * @description 切换菜单打开状态
         * @param focusOnOpen 是否在弹出窗口的时候聚焦它
         * @networkStatus usage:客户端
         */
        toggleOpen(focusOnOpen?: boolean): void;
        /**
         * @description 打开菜单
         * @param focusMenu 是否在弹出窗口的时候聚焦它
         * @networkStatus usage:客户端
         */
        open(focusMenu?: boolean): void;
        /**
         * @description 关闭菜单
         * @networkStatus usage:客户端
         */
        close(): void;
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    class SpinBox extends mw.Widget {
        private HandleOnTextChanged;
        private HandleOnTextCommitted;
        private HandleOnBeginSliderMovement;
        private HandleOnEndSliderMovement;
        /********************************* 设值 ********************************************/
        /**
        * @description 当前值
        * @effect  只在客户端调用生效
        * @returns 当前值
        */
        get value(): Readonly<number>;
        /**
        * @description 当前值
        * @effect  只在客户端调用生效
        * @returns 当前值
        */
        set value(inValue: number);
        /**
         * @description 步进值
         * @effect  只在客户端调用生效
         * @returns 步进值
         */
        get Delta(): Readonly<number>;
        /**
         * @description 步进值
         * @effect  只在客户端调用生效
         */
        set Delta(inDelta: number);
        /**
         * @description 精度
         * @effect  只在客户端调用生效
         * @returns 精度
         */
        get Accuracy(): Readonly<number>;
        /**
         * @description 精度
         * @effect  只在客户端调用生效
         */
        set Accuracy(inAccuracy: number);
        /**
         * @description 是否百分比显示
         * @effect  只在客户端调用生效
         * @returns 是否百分比显示
         */
        get showAsPercent(): Readonly<boolean>;
        /**
         * @description 是否百分比显示
         * @effect  只在客户端调用生效
         */
        set showAsPercent(bShow: boolean);
        /**
         * @description 是否启用设值范围限制
         * @effect  只在客户端调用生效
         * @returns 是否启用设值范围限制
         */
        get limitedSpinRange(): Readonly<boolean>;
        /**
         * @description 是否启用设值范围限制
         * @effect  只在客户端调用生效
         */
        set limitedSpinRange(limited: boolean);
        /**
         * @description 启用设值范围限制的情况下，设值的最小值
         * @effect  只在客户端调用生效
         * @returns 最小值
         */
        get minValue(): Readonly<number>;
        /**
         * @description 启用设值范围限制的情况下，设值的最小值
         * @effect  只在客户端调用生效
         */
        set minValue(inValue: number);
        /**
         * @description 启用设值范围限制的情况下，设值的最大值
         * @effect  只在客户端调用生效
         * @returns 最大值
         */
        get maxValue(): Readonly<number>;
        /**
         * @description 启用设值范围限制的情况下，设值的最大值
         * @effect  只在客户端调用生效
         */
        set maxValue(inValue: number);
        /********************************* 样式 ********************************************/
        /**
         * @description 滑动条起始颜色
         * @effect  只在客户端调用生效
         * @returns 滑动条起始颜色
         */
        get startColor(): Readonly<mw.LinearColor>;
        /**
         * @description 滑动条起始颜色
         * @effect  只在客户端调用生效
         */
        set startColor(inColor: mw.LinearColor);
        /**
         * @description 滑动条终点颜色
         * @effect  只在客户端调用生效
         * @returns 滑动条终点颜色
         */
        get endColor(): Readonly<mw.LinearColor>;
        /**
         * @description 滑动条终点颜色
         * @effect  只在客户端调用生效
         */
        set endColor(inColor: mw.LinearColor);
        /**
         * @description 背景图
         * @effect  只在客户端调用生效
         * @returns 背景图
         */
        get backgroundImageInfo(): mw.ImageInfo;
        /********************************* 代理 ********************************************/
        /**
         * @description 值改变事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onTextChanged(): mw.MulticastDelegate<(value: number) => void>;
        /**
         * @description 输入提交事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onTextCommitted(): mw.MulticastDelegate<(value: number, CommitMethod: mw.TextCommit) => void>;
        /**
         * @description 输入提交事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onBeginSliderMovement(): mw.MulticastDelegate<() => void>;
        /**
         * @description 输入提交事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onEndSliderMovement(): mw.MulticastDelegate<(value: number) => void>;
        /********************************* 文本 ********************************************/
        /**
         * @description 设置文本水平对齐方式
         * @effect  只在客户端调用生效
         * @param inTextJustify usage:对齐方式的枚举
         */
        set textJustify(inTextJustify: mw.TextJustify);
        get textBlockStyle(): mw.TextStyle;
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    class TileView extends mw.TileView {
        /**
         * @description 返回菜单启动
         * @effect 插件化生效
         * @returns 返回菜单启动
         */
        get onMenuReadyOpen(): mw.MulticastDelegate<(menuAnchor: mweditor.MenuAnchor) => void>;
        /**
         * @description 计算当前拖拽鼠标位于控件的什么位置
         * @effect  只在客户端调用生效
         * @param localPointerPos usage:当前鼠标位置
         * @param localSize usage:控件大小
         * @returns 返回拖拽目标位置 -1：当前控件之前；0：当前控件；1当前控件之后
         */
        calcDropZone(localPointerPos: mw.Vector2, localSize: mw.Vector2): number;
        /**
         * @description 设置当前节点的放下位置
         * @effect  只在客户端调用生效
         * @param targetItem usage:当前节点
         * @param itemZoneType usage:放下位置类型
         */
        setItemDropZone(targetItem: mw.ListViewItemDataBase, itemZoneType: number): void;
        /**
         * @description 设置当前节点的样式类型
         * @effect  只在客户端调用生效
         * @param targetItem usage:当前节点
         * @param useErrorStyle usage:是否使用错误提示样式
         */
        setItemErrorStyle(targetItem: mw.ListViewItemDataBase, useErrorStyle: boolean): void;
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    /**
     * @author maohang.zeng
     * @groups 界面/控件/树状视图
     * @description 树状视图
     * @networkStatus usage : 客户端
     */
    class TreeView extends mw.TreeView {
        /**
         * @description 返回菜单启动
         * @effect 插件化生效
         * @returns 返回菜单启动
         */
        get onMenuReadyOpen(): mw.MulticastDelegate<(menuAnchor: mweditor.MenuAnchor) => void>;
        /**
         * @description 计算当前拖拽鼠标位于控件的什么位置
         * @effect  只在客户端调用生效
         * @param localPointerPos usage:当前鼠标位置
         * @param localSize usage:控件大小
         * @returns 返回拖拽目标位置 -1：当前控件之前；0：当前控件；1当前控件之后
         */
        calcDropZone(localPointerPos: mw.Vector2, localSize: mw.Vector2): number;
        /**
         * @description 设置当前节点的放下位置
         * @effect  只在客户端调用生效
         * @param targetItem usage:当前节点
         * @param itemZoneType usage:放下位置类型
         */
        setItemDropZone(targetItem: mw.TreeViewItemDataBase, itemZoneType: number): void;
        /**
         * @description 设置当前节点的样式类型
         * @effect  只在客户端调用生效
         * @param targetItem usage:当前节点
         * @param useErrorStyle usage:是否使用错误提示样式
         */
        setItemErrorStyle(targetItem: mw.TreeViewItemDataBase, useErrorStyle: boolean): void;
        /**
         * @description Item生成前回调, 获取预期大小
         * @effect 插件化生效
         * @returns Item生成前回调, 获取预期大小
         */
        get onGetPreviewItemSize(): mw.Delegate<(previewItem: mw.TreeViewItemDataBase) => number>;
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    const ImageInfo: typeof mw.ImageInfo;
    type ImageInfo = mw.ImageInfo;
    const ButtonStyle: typeof mw.ButtonStyle;
    type ButtonStyle = mw.ButtonStyle;
    /**
     * @deprecated info:该接口已废弃，使用DropdownStyle替换
     */
    const ComboButtonStyle: typeof mw.DropdownStyle;
    /**
     * @deprecated info:该接口已废弃，使用DropdownStyle替换
     */
    type ComboButtonStyle = mw.DropdownStyle;
    const DropdownStyle: typeof mw.DropdownStyle;
    type DropdownStyle = mw.DropdownStyle;
    const ScrollbarStyle: typeof mw.ScrollbarStyle;
    type ScrollbarStyle = mw.ScrollbarStyle;
    /**
     * @deprecated info:该接口已废弃，使用ListItemStyle替换
     */
    const ListItemRowStyle: typeof mw.ListItemStyle;
    /**
     * @deprecated info:该接口已废弃，使用ListItemStyle替换
     */
    type ListItemRowStyle = mw.ListItemStyle;
    const ListItemStyle: typeof mw.ListItemStyle;
    type ListItemStyle = mw.ListItemStyle;
    const CheckboxStyle: typeof mw.CheckboxStyle;
    type CheckboxStyle = mw.CheckboxStyle;
    class MenuItemInfo {
        constructor(id: string);
        /** @description ID，用于校验 */
        menuID: string;
        /** @description 展示名称 */
        menuName: string;
        /** @description 是否为分割线 */
        bLineSperate: boolean;
        /** @description 是否为激活状态 */
        bEnabled: boolean;
        /** @description 是否可见 */
        bVisibility: boolean;
        /** @description 排序等级，数字越大排序越靠上 */
        levelID: number;
        /** @description 悬停时的提示 */
        toolTip: string;
        /** @description 如果是子菜单项，需要填写父菜单ID用于识别菜单放置位置 */
        parentMenuID: string;
        /** @description 菜单快捷键信息展示 */
        uiCommand: string;
    }
    class ModalOperatorParam {
        titleText: string;
        contentCanvas?: mw.Widget;
        contentText?: string;
        windowSize?: mw.Vector2;
        bCreateTitleBar?: boolean;
        bIsMaximizeAndMinimizeBtn?: boolean;
        buttonInfoList?: {
            spritFrame?: string;
            normalColor?: mw.LinearColor;
            pressedColor?: mw.LinearColor;
            buttonText: string;
            clickCallback?: () => boolean;
        }[];
    }
}

/// <reference types="Extension" />
declare namespace mweditor {
    class VerticalBox extends mw.Widget {
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    class Widget extends mw.Widget {
        /**
         *
         * @description 丢失焦点事件
         * @effect 只在客户端调用生效
         */
        get onFoucsLost(): mw.Delegate<(absolutionPosition: mw.Vector2) => boolean>;
        /**
         *
         * @description 焦点改变事件
         * @effect 只在客户端调用生效
         */
        get onFocusChange(): mw.Delegate<(absolutionPosition: mw.Vector2) => boolean>;
        /**
         *
         * @description 按键按下事件
         * @effect 只在客户端调用生效
         */
        get onKeyDownEvent(): mw.Delegate<(absolutionPosition: mw.Vector2, keyEvent: mw.KeyEvent) => boolean>;
        /**
         *
         * @description 按键抬起事件
         * @effect 只在客户端调用生效
         */
        get onKeyUpEvent(): mw.Delegate<(absolutionPosition: mw.Vector2, keyEvent: mw.KeyEvent) => boolean>;
        /**
         *
         * @description 鼠标按下事件
         * @effect 只在客户端调用生效
         */
        get onMouseButtonDown(): mw.Delegate<(absolutionPosition: mw.Vector2, pointEvent: mw.PointerEvent) => boolean>;
        /**
         *
         * @description 鼠标抬起事件
         * @effect 只在客户端调用生效
         */
        get onMouseButtonUp(): mw.Delegate<(absolutionPosition: mw.Vector2, pointEvent: mw.PointerEvent) => boolean>;
        /**
         *
         * @description 鼠标移动事件
         * @effect 只在客户端调用生效
         */
        get onMouseMove(): mw.Delegate<(absolutionPosition: mw.Vector2, pointEvent: mw.PointerEvent) => boolean>;
        /**
         *
         * @description 鼠标进入控件事件
         * @effect 只在客户端调用生效
         */
        get onMouseEnter(): mw.Delegate<(absolutionPosition: mw.Vector2, pointEvent: mw.PointerEvent) => boolean>;
        /**
         *
         * @description 鼠标离开控件事件
         * @effect 只在客户端调用生效
         */
        get onMouseLeave(): mw.Delegate<(absolutionPosition: mw.Vector2, pointEvent: mw.PointerEvent) => boolean>;
        /**
         *
         * @description 鼠标滚轮滚动事件
         * @effect 只在客户端调用生效
         */
        get onMouseWheel(): mw.Delegate<(absolutionPosition: mw.Vector2, pointEvent: mw.PointerEvent) => boolean>;
        /**
         *
         * @description 鼠标双击事件
         * @effect 只在客户端调用生效
         */
        get onMouseButtonDoubleClick(): mw.Delegate<(absolutionPosition: mw.Vector2, pointEvent: mw.PointerEvent) => boolean>;
        /**
         *
         * @description 触摸按下事件
         * @effect 只在客户端调用生效
         */
        get onTouchStarted(): mw.Delegate<(absolutionPosition: mw.Vector2, pointEvent: mw.PointerEvent) => boolean>;
        /**
         *
         * @description 触摸移动事件
         * @effect 只在客户端调用生效
         */
        get onTouchMoved(): mw.Delegate<(absolutionPosition: mw.Vector2, pointEvent: mw.PointerEvent) => boolean>;
        /**
         *
         * @description 触摸结束事件
         * @effect 只在客户端调用生效
         */
        get onTouchEnded(): mw.Delegate<(absolutionPosition: mw.Vector2, pointEvent: mw.PointerEvent) => boolean>;
    }
}

/// <reference types="Core" />
/// <reference types="Extension" />
declare namespace mweditor {
    /**
     * @deprecated 谨慎使用，将于后续版本弃用
     */
    class AssetBrowser extends mweditor.EditorSystemBase {
        /**
         * 根据资源类型获取对应的资源
         * @deprecated 谨慎使用，将于后续版本弃用
         * @param type 资源类型
         * @returns 返回对应的资源组
         */
        findResourceInfoByAssetType(type: mweditor.AssetType): mweditor.AssetInfo[];
        /**
         * 根据资源名称获取对应的资源
         * @deprecated 谨慎使用，将于后续版本弃用
         * @param AssetName 资源名称
         * @returns 返回对应的资源组
         */
        findResourceInfoByAssetName(AssetName: string): mweditor.AssetInfo[];
        /**
         * 根据资源guid获取对应的资源信息
         * @deprecated 谨慎使用，将于后续版本弃用
         * @param AssetGuid 资源guid形象
         * @returns 返回的资源信息
         */
        findResourceInfoByGuid(AssetGuid: string): mweditor.AssetInfo;
        /**
         * 获取当前选中的资源
         * @deprecated 谨慎使用，将于后续版本弃用
         * @returns 选中的资源
         */
        getSelectionAsset(): mweditor.AssetInfo;
        /**
         * 资源定位
         * @deprecated 谨慎使用，将于后续版本弃用
         * @param AssetGuid 资源guid
         * @param EditorWindowGuid 编辑器窗口guid，如果没有传入参数或找不到该窗口guid，则直接使用主窗口资源库
         * @returns 是否资源定位成功
         */
        positionAsset(AssetGuid: string, EditorWindowGuid?: string): boolean;
        /**
         * 获取资源产品文档地址
         * @deprecated 谨慎使用，将于后续版本弃用
         * @param object 资源对象
         * @returns 产品文档地址
         */
        getProductManualstUrl(object: mw.GameObject): string;
        /**
         * 选中资源库资源回调
         * @deprecated 谨慎使用，将于后续版本弃用
         */
        get onSelectionAssetInfoEvent(): mw.MulticastDelegate<(AssetInfo: mweditor.AssetInfo) => void>;
        /**
         * 添加菜单栏事件
         * @deprecated 谨慎使用，将于后续版本弃用
         * @param Label 事件名称
         * @param ExecuteAction 点击事件响应回调
         * @param ToolTip 事件提示名称
         * @param CanExecuteAction 是否可以响应点击事件回调
         * @returns 是否添加菜单栏成功
         */
        addMenuEntry(Label: string, ExecuteAction: (AssetInfo: mweditor.AssetInfo) => void, ToolTip?: string, CanExecuteAction?: (AssetInfo: mweditor.AssetInfo) => boolean): boolean;
        /**
         * 移除菜单栏
         * @deprecated 谨慎使用，将于后续版本弃用
         * @param Label 事件名称
         */
        removeMenuEntry(Label: string): void;
        /**
         * 获取所有资源数
         * @deprecated 谨慎使用，将于后续版本弃用
         */
        get resourceIndex(): number;
        /**
         * 分页获取所有资源
         * @deprecated 谨慎使用，将于后续版本弃用
         * @param PageIndex 页数
         * @param Content 内容数，默认获取100个
         * @returns 返回资源guid
         */
        getAllResourceGuidByPage(PageIndex: number, Content?: number): string[];
    }
}

declare namespace mweditor {
    class AssetManager_AssetInfo {
        constructor(path: string, id: string, type: AssetManager_AssetType);
        private assetPath;
        private assetId;
        private assetType;
        get path(): Readonly<string>;
        get id(): Readonly<string>;
        get type(): Readonly<AssetManager_AssetType>;
    }
    enum AssetManager_AssetType {
        UnKnown = 0,
        Brush = 1,
        Script = 2,
        Prefab = 3,
        UI = 4,
        Character = 5
    }
    class AssetManager_OnlineAssetInfo {
        constructor(guid: string, displayName: string, thumbnailURL: string);
        private assetGUID;
        private assetDisplayName;
        private assetThumbnailURL;
        get guid(): Readonly<string>;
        set guid(inGuid: string);
        get displayName(): Readonly<string>;
        set displayName(inName: string);
        get thumbnailURL(): Readonly<string>;
        set thumbnailURL(inURL: string);
    }
}

declare namespace mweditor {
    class BDataMgr extends mweditor.EditorSystemBase {
        addIntDataInfo(dataCompilationState: mweditor.BDataType | string, ArgsName: string, data: number, bOverWrite?: boolean): void;
        addDoubleDataInfo(dataCompilationState: mweditor.BDataType | string, ArgsName: string, data: number, bOverWrite?: boolean): void;
        addBoolDataInfo(dataCompilationState: mweditor.BDataType | string, ArgsName: string, data: boolean, bOverWrite?: boolean): void;
        addStringDataInfo(dataCompilationState: mweditor.BDataType | string, ArgsName: string, data: string, bOverWrite?: boolean): void;
        addStringArrayDataInfo(dataCompilationState: mweditor.BDataType | string, ArgsName: string, data: string[], bOverWrite?: boolean): void;
        addIntArrayDataInfo(dataCompilationState: mweditor.BDataType | string, ArgsName: string, data: number[], bOverWrite?: boolean): void;
        getStateArgsNum(dataCompilationState: mweditor.BDataType | string): number;
        clearDataInfo(dataCompilationState: mweditor.BDataType | string): void;
        httpSend(dataCompilationState: mweditor.BDataType | string, bResetState?: boolean, bForceSend?: boolean): void;
    }
}

/// <reference types="Extension" />
/// <reference types="Core" />
/// <reference types="engine" />
declare namespace mweditor {
    // @ts-ignore
    import UE from "ue";
    /**
     * 插件管理
     */
    class CharacterEditor extends mweditor.EditorSystemBase {
        /**
         * @description 预览角色聚焦代理
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onFocusCharacter(): mw.MulticastDelegate<() => void>;
        private requestFocus;
        /**
         * @description 设置视口预览角色
         * @effect  只在客户端调用生效
         */
        setPreivewActor(inCharacter: mw.GameObject): void;
        /**
         * @description 预览角色预览选项变更
         * @effect  只在客户端调用生效
         */
        changePreviewOption(inType: UE.ESaveFileType, bAddOption: boolean): void;
        /**
         * @description 执行保存操作
         * @effect  只在客户端调用生效
         */
        requestSave(): void;
        /**
         * @description 设置不再提醒状态
         * @effect  只在客户端调用生效
         */
        setSavePromptState(bSavePrompt: boolean): void;
    }
}

/// <reference types="Extension" />
declare namespace mweditor {
    class GameStartupInfo {
        /** 玩家数量 */
        private numPlayers;
        /** 端口号 */
        private port;
        /** 是否LS */
        private listenServer;
        constructor(numPlayers: number, port: number, listenServer: boolean);
        get NumPlayers(): number;
        get Port(): number;
        get ListenServer(): boolean;
        set NumPlayers(numPlayers: number);
        set Port(port: number);
        set ListenServer(listenServer: boolean);
    }
}
declare namespace mweditor {
    class PluginEditorSystem {
        static _username: string;
        static _user: mw.Image;
        static get username(): string;
        static get user(): mw.Image;
        static set username(username: string);
        static set user(image: mw.Image);
        /** 项目保存 */
        static saveProject(): Promise<boolean>;
        /** 编译项目 */
        static compileProject(): Promise<boolean>;
        /** 运行游戏 */
        static runGame(startupInfo: GameStartupInfo): Promise<boolean>;
        /**停止游戏 */
        static endGame(): void;
        /**退出编辑器 */
        static exitEditor(): void;
        /**
         * 创建一个新进程及其主线程。新流程运行
         * 调用进程的安全上下文中指定的可执行文件
         */
        static createProcess(url: string, params?: string, launchDetached?: boolean, launchHidden?: boolean, optional?: string, callback?: (bEnding: boolean, data: string) => void): number;
        /**
         * 创建一个新进程及其主线程。新流程运行,该进程会随父进程销毁而自动销毁
         * 调用进程的安全上下文中指定的可执行文件
         */
        static createJobProcess(url: string, params?: string, launchDetached?: boolean, launchHidden?: boolean, optional?: string, callback?: (bEnding: boolean, data: string) => void): number;
        /**正常向进程发送一个关闭命令 */
        static closeProcess(processHandle: number): boolean;
        /**终止进程 */
        static killProcess(processHandle: number, killTree?: boolean): boolean;
        /**如果指定的进程正在运行，则返回true */
        static isProcessRunning(processHandle: number): boolean;
        /**打开网址或者文件管理器等 */
        static launchURL(url: string, params?: string): string;
        /**尝试在其默认外部应用程序中启动提供的文件名 */
        static launchFile(fileName: string, params?: string, openVerbEdit?: boolean): void;
        /**获取编辑器语言 */
        static getEditorLanguage(): string;
        /**是否指定进程在运行，性能开销会比较大，慎用 */
        static isApplicationRunning(name: string): boolean;
        /** 根据进程名称强杀进程，性能开销会比较大，容易误杀，慎用 */
        static killApplication(name: string): void;
        /** 是否是有效的没有被占用的端口 */
        static isValidPort(port: number): boolean;
    }
}
declare namespace mweditor {
}

declare namespace mweditor {
    class EditorSystemBase {
    }
    function findEditorSystem<T extends EditorSystemBase>(SystemType: {
        new (InSubsystem: any): T;
    }, AssetGuid?: string): T;
}

declare namespace mweditor {
}

/// <reference types="Extension" />
declare namespace mweditor {
    class Internationalization extends mweditor.EditorSystemBase {
        getInternationalizationText(textKey: string, formatParams?: string[], nameSpace?: string): string;
        /**
         * 语言变更事件
         */
        get onLanguageChanged(): mw.MulticastDelegate<() => void>;
    }
}

/// <reference types="Extension" />
declare namespace mweditor {
    class LocalAssetManager extends mweditor.EditorSystemBase {
        launchImportDialog(importType?: mweditor.LocalType): void;
        dragImportLocalAsset(fileNames: string[]): void;
        uploadLocalAsset(guidList: string[], uploadCallback: (bSuccess: boolean, message: string) => void): void;
        getThumbnailByAssetId(assetId: string): string;
        getThumbnailByAssetPath(assetPath: string): string;
        getVisibleByAssetId(assetId: string): boolean;
        queryLocalAssetState(assetIds: string[], requestCallback: (bSuccess: boolean) => void): boolean;
        getLocalAssetState(assetIds: string[]): Map<string, mweditor.LocalAssetState>;
        hasUnapprovedAsset(assetIds: string[]): boolean;
        getLocalAssetDependency(assetIds: string[], dependencyCallback: (dependencyMap: Map<string, mweditor.LocalAssetDependencies>) => void): void;
        getDependentAssetByLocalAsset(assetIds: string[], beDependedCallback: (beDependencyMap: Map<string, mweditor.DependentAssetByLocalAsset[]>) => void): void;
        allowDragToScene(assetType: string): boolean;
        getAssetData(assetId: string): mweditor.LocalAssetDependencyInfo;
        getActorData(assetId: string): mweditor.LocalAssetDependencyInfo;
        navigationByGUID(assetId: string, bInScene: boolean): void;
        getAssetTypeDisplay(assetType: mweditor.LocalType): string;
        get importResultDelegate(): mw.Delegate<(importInfoList: mweditor.LocalAssetImportInfo[]) => void>;
    }
}

/// <reference types="Extension" />
/// <reference types="Core" />
declare namespace mweditor {
    class MainOutliner extends mweditor.EditorSystemBase {
        static get mainViewport(): mweditor.ViewPort;
        /**
         * @description 获取选中对象的边界框大小
         * @effect 编辑器器生效
         * @param OriginOuter 中心
         * @param BoxExtentOuter 方框范围
         * @param SphereRadius 球体半径
         */
        static getSelectionBounds(OriginOuter: mw.Vector, BoxExtentOuter: mw.Vector, SphereRadius: number): void;
        /**
         * 通过对象管理器选中对象
         * @param target 需要选中的对象
         */
        static select(target: mw.GameObject | mw.GameObject[]): void;
        /**
         * 通过对象管理器取消选中对象
         * @param target 需要取消选中的对象
         */
        static deselect(target: mw.GameObject | mw.GameObject[]): void;
        /**
         * 通过对象管理器清空选中对象
         */
        static clear(): void;
        /**
         * 获取所有选中的游戏对象
         * @returns 所有选中的游戏对象
         */
        static getSelectedGameObjects(): mw.GameObject[];
        /**
         * 获取所有的游戏对象
         * @returns 所有的游戏对象
         */
        static getAllGameObjects(): mw.GameObject[];
        /**
         * 刷新对象管理器列表
         */
        static refreshGameObjectsList(): void;
        /**
         * 给游戏对象添加脚本
         * @param target 传入目标GameObject对象
         * @param assetData 传入WorkData对象包含路径、资源ID和资源类型
         * @returns 返回操作结果
         */
        static addScriptToGameObject(target: mw.GameObject, assetData: mweditor.WorkData): boolean;
        /**
         * 给游戏对象移除脚本
         * @param target 传入目标GameObject对象
         * @param index 传入脚本序号 或 WorkData对象包含路径、资源ID和资源类型
         */
        static removeScriptFromGameObject(target: mw.GameObject, index: number | mweditor.WorkData): boolean;
        /**
         * 获取游戏对象下脚本
         * @param target 传入目标GameObject对象
         * @returns 对应的所有WorkData对象包含路径、资源ID和资源类型
         */
        static getScriptsFromGameObject(target: mw.GameObject): mweditor.WorkData[];
        /**
         * 创建文件夹
         * @param name 文件夹对象名称
         * @param children 用于生成文件夹对象的包含对象
         * @param parent 父节点对象
         * @returns 创建出的文件夹对象
         */
        static createFolder(name: string, children?: mw.GameObject | mw.GameObject[], parent?: mw.GameObject): mw.GameObject;
        /**
         * 创建合并对象
         * @param name 合并对象名称
         * @param children 用于生成合并对象的包含对象
         * @param parent 父节点对象
         * @returns 创建出的合并对象
         */
        static createMergedObject(name: string, children?: mw.GameObject | mw.GameObject[], parent?: mw.GameObject): mw.GameObject;
        /**
         * 创建打组对象
         * @param name 打组对象名称
         * @param children 用于生成打组对象的包含对象
         * @param parent 父节点对象
         * @returns 创建出的打组对象
         */
        static createGroupedObject(name: string, children?: mw.GameObject | mw.GameObject[], parent?: mw.GameObject): mw.GameObject;
        /**
         * 添加预加载资源
         * @param assets 加入预加载的资源
         * @param index 加入预加载的位置
         */
        static addPreloadedAssets(assets: string | string[], index?: number): void;
        /**
         * 移除预加载资源
         * @param assets 移出预加载资源
         */
        static removePreloadedAssets(target: string | string[]): void;
        /**
         * 获取所有预加载资源
         * @returns 预加载资源ID的string数组
         */
        static getPreloadedAssets(): string[];
        /**
         * 获取游戏对象网络状态
         * @param target 传入目标GameObject对象
         * @returns 游戏对象网络状态
         */
        static getNetStatus(target: mw.GameObject): mw.NetStatus;
        /**
         * 设置游戏对象网络状态
         * @param target 传入目标GameObject对象
         * @param status 目标网络状态
         */
        static setNetStatus(target: mw.GameObject, status: mw.NetStatus): void;
        /**
         * 获取游戏对象锁定状态
         * @param target 传入目标GameObject对象
         * @returns 游戏对象锁定状态
         */
        static getLockStatus(target: mw.GameObject): boolean;
        /**
         * 设置游戏对象锁定状态
         * @param target 传入目标GameObject对象
         * @param status 目标锁定状态
         */
        static setLockStatus(target: mw.GameObject, status: boolean): void;
        /**
         * 获取游戏对象隐藏状态
         * @param target 传入目标GameObject对象
         * @returns 游戏对象隐藏状态
         */
        static getHiddenStatus(target: mw.GameObject): boolean;
        /**
         * 设置游戏对象隐藏状态
         * @param target 传入目标GameObject对象
         * @param status 目标隐藏状态
         */
        static setHiddenStatus(target: mw.GameObject, status: boolean): void;
        /**
         * 序列化
         * @param target 传入目标GameObject对象
         * @param ignoreItems 需要忽略的序列化字段
         * @returns 对象序列化结果
         */
        static serialize(target: mw.GameObject, ignoreItems: string[]): string;
        /**
         * 反序列化
         * @param jsonData 序列化数据
         * @param ignoreItems 需要忽略的序列化字段
         * @returns 生成的对象
         */
        static deserialize(jsonData: string, ignoreItems: string[]): Promise<mw.GameObject>;
        /**
         * 选中事件
         */
        static get onSelectGameObjects(): mw.MulticastDelegate<(gameObjects: mw.GameObject[]) => void>;
        /**
         * 取消选中事件
         */
        static get onDeselectGameObjects(): mw.MulticastDelegate<(gameObjects: mw.GameObject[]) => void>;
        /**
         * 游戏对象新增事件
         */
        static get onGameObjectAdd(): mw.MulticastDelegate<(gameObjects: mw.GameObject) => void>;
        /**
         * 游戏对象移除事件
         */
        static get onGameObjectRemove(): mw.MulticastDelegate<(gameObjects: mw.GameObject) => void>;
        /**
         * 预加载更新事件
         */
        static get onRefreshPreload(): mw.MulticastDelegate<() => void>;
        /**
         * 菜单打开事件
         */
        static get onMenuOpen(): mw.MulticastDelegate<(menuAnchor: mweditor.MenuAnchor) => void>;
        /**
         * 菜单关闭事件
         */
        static get onMenuClose(): mw.MulticastDelegate<() => void>;
        /**
         * 对象重命名事件
         */
        static get onGameObjectRename(): mw.MulticastDelegate<(gameObjects: mw.GameObject) => void>;
        /**
         * 对象管理器搜索框事件
         */
        static get OnSearchTextChanged(): mw.MulticastDelegate<(inText: string) => void>;
        /**
         * 获取主场景对象总数组
         */
        getMainSceneObjectList(): string[];
        /**
         * 获取预制体场景对象总数组
         */
        getPrefabSceneObjectList(): string[];
        /**
         * 根据目标对象获取子对象GUID数组
         */
        getChildrenGuidList(targetObjGuid: string, iterator?: (childGuid: string) => void): string[];
    }
    class ObjectManagerTab extends mweditor.Tab {
        get objectManager(): MainOutliner;
        constructor(TabId: string, InTabDisplayName?: string);
    }
}

declare namespace mweditor {
}

/// <reference types="Extension" />
declare namespace mweditor {
    class translationInfo {
        translateData: Map<string, string>;
        constructor();
        getkeys(): string[];
        Num(): number;
        Get(key: string): string;
        Set(key: string, value: string): void;
        Contains(key: string): boolean;
        remove(key: string): void;
        empty(): void;
    }
    class MultiLanguage extends mweditor.EditorSystemBase {
        collectdelegate: mw.Delegate<() => void>;
        private OriginalTextKey;
        setOriginalanguage(language: number): void;
        InitData(): Map<string, translationInfo>;
        RefreshTranslationData(Info: Map<string, translationInfo>): void;
        collectText(selectadd: boolean): void;
        importText(filepath: string, selectadd: boolean): void;
        ExportText(filepath: string): void;
        SaveHandle(): void;
        LoadTranslationData(): Map<string, translationInfo>;
        BindLanguageCallback(InCallback: () => void): void;
        AutoTranslate(Callback: mw.Delegate<(success: boolean, errormessage: string) => void>): void;
        DestroyReleaseWindow(): void;
        BindReleaseGameFailedCallback(InCallback: (ReleaseFailed: string) => void): void;
        bIsReleaseGameFailed(): string;
        ReleaseGameHandle(): void;
        SetWaitTranslateLanguage(Language: Array<string>): void;
    }
}

declare namespace mweditor {
    /**
     * 插件管理
     */
    class MultiSceneTool extends mweditor.EditorSystemBase {
        /**
         * @description 获取冲突资源信息
         * @effect  只在客户端调用生效
         * @returns Map<Guid, Path>形式的冲突guid列表
         */
        getCacheConflictingData(): Array<mweditor.ConflitingData>;
        /**
         * @description 获取冲突的资源Guid数量
         * @effect  只在客户端调用生效
         * @returns 获取冲突的资源Guid数量
         */
        getConflictGuidNum(): number;
    }
}

/// <reference types="Extension" />
declare namespace mweditor {
    class NPS extends mweditor.EditorSystemBase {
        private NPSSubsystemInternal;
        onNPSPopupEvent: mw.MulticastDelegate<() => void>;
        onCSATPopupEvent: mw.MulticastDelegate<(module: string) => void>;
        onOpenEvent: mw.MulticastDelegate<() => void>;
        onCloseEvent: mw.MulticastDelegate<() => void>;
        initialize(): void;
        deinitialize(): void;
        GetDeveloperID(): string;
        GetScreenSize(): mw.Vector2;
        GetScreenCenter(): mw.Vector2;
        CSATOpen(module: string): void;
        CSATClose(module: string): void;
        SetCSATTriggerEvent(module: string, event: string): void;
        CheckCSAT(module: string): void;
        CSATFocusChanged(module: string, bshow: boolean): void;
        HttpSend(json: string): void;
        GetConfig(module: string): string;
    }
}

declare namespace mweditor {
    class OpenProjectProcedureBase {
        private procedureName;
        private procedureDesc;
        private procedureNameChanged;
        private procedureDescChanged;
        private switchNextProcedure;
        constructor(InName?: string, InDesc?: string);
        get name(): string;
        get desc(): string;
        setName(newName: string): void;
        setDesc(newDesc: string): void;
        switchNext(): void;
        onInitialize(): void;
        onReset(): void;
        onEnter(): void;
        onLeave(): void;
    }
    enum EOpenProjectStage {
        CompileTS = 0,
        LoadProject = 1
    }
    enum EProcedureStage {
        None = 0,
        Entered = 1,
        Leaved = 2
    }
    enum ECompileStatus {
        CompileStart = 0,
        CompileCurrentFile = 1,
        CompileSuccess = 2,
        CompileFailed = 3,
        LoadExtensionsStart = 4,
        LoadGameStart = 5,
        UIInitStart = 6,
        InitGameStart = 7,
        LoadExtensionsError = 8,
        LoadGameError = 9,
        UIInitError = 10,
        InitGameError = 11,
        NotifyCompilingScene = 12
    }
    class OpenProjectManager extends mweditor.EditorSystemBase {
        allbuild: boolean;
        private openProjectSubsystem;
        private procedureChanged;
        private procedureChangedHandle;
        private procedureProcessChanged;
        private procedureProcessChangedHandle;
        private procedureDescChanged;
        private procedureDeschangedHandle;
        private startCompiling;
        private startCompilingHandle;
        private scriptCompilationProgress;
        private scriptCompilationProgressHandle;
        private openProjectCanceled;
        private openProjectCanceledHandle;
        private openProjectCompleted;
        private openProjectCompletedHandle;
        private openProjectFailed;
        private openProjectFailedHandle;
        getCurrentDesc(): string;
        /**
         * 添加新流程，目前只能添加在 ParseCommand 之后和 OpenLevel 之前
         * 默认流程顺序：ParseCommond -> CompileTS -> ParseProject -> OpenLevel
         * @param newProcedureClass 新流程的类型
         * @param stage 插入的位置，在输入的阶段之后插入
         */
        static insertProcedure(newProcedureClass: typeof OpenProjectProcedureBase, stage: EOpenProjectStage): boolean;
        StopCompile(): void;
        OpenAllbuildCompilePopover(): void;
    }
}

declare namespace mweditor {
    /**
     * @author miaohang.zeng
     * @groups 系统
     * @description 系统平台相关
     */
    class Platform extends mweditor.EditorSystemBase {
        /**
         * 从当前进程中检索所有环境变量名称及其值
         * @param VariableName 环境变量名(ie "Path")
         * @returns 变量的值，如果未设置，则为空字符串。
         */
        getEnv(VariableName: string): string;
        /**
         * 创建、修改或删除当前进程中存储的环境变量
         * @param VariableName 环境变量名(ie "Path")
         * @param Value 要分配给 variable 的值
         */
        setEnv(VariableName: string, Value: string): void;
    }
}

/// <reference types="Extension" />
declare namespace mweditor {
    class ProjectContent extends mweditor.EditorSystemBase {
        private static onNotifyDropDownRefreshEvent;
        private workSelectedList;
        /**
         * 注册当前工程内容的显示类型
         * @param registerTypes 类型数据组
         * @param refreshGuideMap 是否刷新数据
         */
        registerNodeType(registerTypes: mweditor.LocalType[], refreshGuideMap?: boolean): void;
        /**
         * 刷新工程内容
         */
        refreshContentNode(): void;
        /**
         * 更新选中导览节点
         * @param targetPath 目录路径
         * @param navigationPath 希望选中的资源路径
         * @returns 如果更新成功，则返回true
         */
        updateGuideSelected(targetPath: string, navigationPath?: string): boolean;
        /**
         * 更新当前的文件收集空间
         * @param item 选中项信息
         */
        updateFileCollectSpace(item: number): void;
        /**
         * 根据相对路径或原始导览节点数据获取最新导览节点数据
         * @param oldDataList 数据列表，主要需要使用路径信息
         * @returns 返回对应的导览页节点列表
         */
        getGuideDataByOldData(oldDataList: string[] | mweditor.GuideData[], bGetlastSelected?: boolean): mweditor.GuideData[];
        /**
         * 启动资源重定向收集，用于和 confirmRedirect（确认重定向）配合使用，启动异步线程处理收集资源信息需要的IO操作
         * @param selectedItems 需要启动重定向收集的数据节点
         */
        redirectCollect(selectedItems: mweditor.WorkData[] | mweditor.GuideData[]): void;
        /**
         * 确定重定向，用于和 redirectCollect（启动资源重定向收集）配合使用，确认收集到的数据的重定向目标目录
         * @param targetFolder 重定向目标目录
         * @param checkCallback 重定向确认提示（参数为重定向资源的后缀名）
         */
        confirmRedirect(targetFolder: string, checkCallback?: (extensions: string[]) => {}): void;
        /**
         * 将资源状态设置为公共资源，或取消公共资源状态时，资源重定向至对应的根目录
         * @param dataList              需要移动至项目/公共根目录的资源列表
         * @param InTargetType          根目录类型
         * @param bRedirectToCommon     true时重定向至公共目录，false时重定向至工程目录
         * @param checkCallback         重定向确认提示（参数为重定向资源的后缀名）
         */
        redirectToRoot(dataList: mweditor.WorkData[], InTargetType: mweditor.LocalType, bRedirectToCommon?: boolean, checkCallback?: (extension: string) => {}): void;
        /**
         * 导航到路径对应的节点
         * @param targetPath 导航目标地址
         */
        navigationToGuideView(targetPath: string): boolean;
        /**
         * 新建资源
         * @param createParam 资源参数
         * @returns 返回新建资源的Guid
         */
        createNewAsset(createParam: mweditor.CreateParam): string;
        /**
         * 新建文件夹
         * @param targetFolder 新建的文件夹路径
         * @returns 返回新建后的路径
         */
        createNewFolder(targetFolder: string): string;
        /**
         * 导入资源
         * @param sourceFile 资源原始文件
         * @param sourceType 资源类型
         * @param targetName 导入目标文件名
         * @returns 返回导入成功的资源Guid
         */
        importAsset(sourceFile: string, sourceType: mweditor.LocalType, targetName: string): string;
        /**
         * 导入场景
         * @param projectDir 导入的项目场景路径
         */
        importScene(projectDir: string): void;
        /**
         * 导出资源
         * @param dataList 需要导出的资源列表
         * @param targetFolder 导出目标文件夹
         * @returns 返回是否导出成功
         */
        exportAssets(dataList: mweditor.WorkData[], targetFolder: string): boolean;
        /**
         * 上传资源
         * @param dataList 需要上传的资源列表
         * @returns 返回是否上传成功
         */
        uploadAssets(dataList: mweditor.WorkData[]): boolean;
        /**
         * 打开资源
         * @param targetAsset 需要打开的资源
         * @returns 返回是否打开成功
         */
        launchAsset(targetAsset: mweditor.WorkData): boolean;
        /**
         * 删除资源
         * @param dataList 需要删除的资源列表
         * @returns 返回是否删除成功
         */
        deleteAssets(dataList: mweditor.WorkData[] | mweditor.GuideData[]): boolean;
        /**
         * 请求重命名
         * @param targetAsset 需要重命名的导览资源或内容资源
         * @param targetPath 重命名后的路径（包括资源本身的全名）
         * @returns 返回是否请求成功
         */
        requestRename(targetAsset: mweditor.WorkData | mweditor.GuideData, targetPath: string): boolean;
        /**
         * 请求重新生成Guid
         * @param targetAsset 需要重新生成Guid的资源
         */
        requestRegenerateGUID(targetAsset: mweditor.WorkData[]): false | void;
        /**
         * 打开材质引用统计窗口
         */
        openStaticMaterialReferenceOverviewWindow(): void;
        /**
         * 打开场景设置窗口
         */
        openSceneSettingWindow(targetAsset: mweditor.WorkData, windowOpenMode: mweditor.MultSceneWindowMode): boolean;
        /**
         * 选择对应资源最后一个引用
         * @param targetGuid 对应资源Id
         * @returns 返回是否请求选择成功
         */
        selectReferenceObject(targetGuid: string): boolean;
        /**
         * 检查当前资源是否存在关联的对象
         * @param assetGuid 对应资源Id
         * @returns 返回是否存在关联对象
         */
        checkHasAssociateActoroByAssetGuid(assetGuid: string): boolean;
        /**
         * 保存正在编辑中的预制体
         */
        saveEditingPrefab(): void;
        /**
         * 获取正在编辑中的预制体的Id
         * @returns 返回正在编辑中的预制体的Id
         */
        getEditingPrefab(): string;
        /**
         * 获取正在编辑中的预制体是否已保存
         * @returns 返回正在编辑中的预制体是否已保存
         */
        isEditingPrefabSaved(): boolean;
        /**
         * 正则替换脚本
         * @param targetFile 需要替换的目标脚本文件
         * @param bIsUIScript 目标脚本是否为UI脚本
         */
        replaceScriptTemplate(targetFile: string, bIsUIScript?: boolean): void;
        /**
         * 资源预览
         * @param assetData 需要预览的资源
         * @param bForceOpen true：强制打开，false：当前存在预览窗口即刷新，否则不开
         * @returns 返回是否成功打开预览窗口
         */
        previewAsset(assetData: mweditor.WorkData, bForceOpen?: boolean): boolean;
        /**
         * 编译工程脚本
         */
        tryCompileProjectScript(): void;
        /**
         * 获取当前导览节点应该显示的编译图标
         * @param guideData 当前路径
         * @returns 返回编译图标在图集中的名称
         */
        static getCompileIcon(guideData: mweditor.GuideData, bForce?: boolean): string;
        /**
         * 根据类型获取对应类型的根节点路径
         * @param targetType 需要获取路径的类型
         * @param bGetCommonRootPath 是否获取的其类型的公共目录路径
         * @returns 对应类型的根节点路径
         */
        getRootPathByNodeType(targetType: mweditor.LocalType, bGetCommonRootPath?: boolean): string;
        /**
         * 获取当前工程内容的资源收集空间
         * @returns 当前工程内容的资源收集空间
         */
        getFileCollectSpace(): mweditor.FileCollectSpace;
        /**
         * 获取当前选中的目录根节点所对应的公共目录根节点路径
         * @return 某种类型的资源的公共目录根节点路径
         */
        getSelectedCommonRootPath(): string;
        /**
         * 工程内容定位资源
         * @param inAssetId 资源Id
         */
        positionAsset(inAssetId: string): void;
        /**
         * 判断该类型是否仅能存储在公共目录下
         * @param assetType 资源类型
         */
        getIsImportAsset(assetType: mweditor.LocalType): boolean;
        get selectedGuideData(): mweditor.GuideData;
        /**工程内容操作校验 */
        get onOperatorCheck(): mw.Delegate<(OperatorType: mweditor.OperatorType, AssociateAsset: Array<mweditor.WorkData>) => boolean>;
        /** 本地资源增删改事件 */
        get onAssetModify(): mw.MulticastDelegate<(modifyParams: mweditor.AssetModifyParam[]) => void>;
        get onNotifyDropDownRefreshEvent(): mw.MulticastDelegate<(newTargetSpace: mweditor.FileCollectSpace) => void>;
        private onFileCollectSpaceChanged;
        /**自定义扩展除原有导览页类型外的其他导览页 */
        get onExtraGuide(): mw.Delegate<() => {
            guideDataList: mweditor.GuideData[];
            skipCollectSet: Set<string>;
        }>;
        /** 导览页数据更新事件*/
        get onUpdateGuideList(): mw.MulticastDelegate<(newGuideList: mweditor.GuideData[]) => void>;
        /**导览页选中更新事件*/
        get onGuideSelectChanged(): mw.MulticastDelegate<(selectedItem: mweditor.GuideData) => void>;
        get onUpdateNormalList(): mw.MulticastDelegate<(newNormalWorkList: mweditor.WorkData[], bCover: boolean) => void>;
        get onUpdateSearchList(): mw.MulticastDelegate<(newSearchWorkList: mweditor.WorkData[], bCover: boolean) => void>;
        get onWorkSelectChanged(): mw.MulticastDelegate<(selectedItems: mweditor.WorkData[]) => void>;
        get spriteMap(): Map<string, string>;
        get localImageMap(): Map<string, string>;
        get approveMap(): Map<string, mweditor.LocalAssetAuditStatus>;
        get normalDataList(): mweditor.WorkData[];
        get searchDataList(): mweditor.WorkData[];
        set searchFilterStr(filterStr: string);
        get searchFilterStr(): string;
        set newNodePath(newNodePath: string);
        get newNodePath(): string;
        set newAsset(newAssetGuid: string);
        get newAsset(): string;
        static get newUIScriptGuidSet(): Set<string>;
        resetPopup(): void;
        get isPopup(): boolean;
        get nodeType(): number[];
        set allowLoadNoneType(allowNoneTypeLoaded: boolean);
        get allowLoadNoneType(): boolean;
        get contentList(): Readonly<mweditor.WorkData[]>;
        get selectedContent(): Readonly<mweditor.WorkData[]>;
        get searchContentList(): Readonly<mweditor.WorkData[]>;
        SetCompileScriptState(state: number, message: string): void;
    }
    class ProjectContentTab extends mweditor.Tab {
        get projectContent(): ProjectContent;
        constructor(TabId: string, InTabDisplayName?: string);
    }
}

declare namespace mweditor {
    // @ts-ignore
    import puerts from "puerts";
    class ProjectManager extends mweditor.EditorSystemBase {
        get assemblyRootDirectory(): string;
        get assemblyFile(): string;
        getCurrentProject(outProjectName: puerts.$Ref<string>, outProjectFile: puerts.$Ref<string>): boolean;
        getAssemblyMainProject(outProjectName: puerts.$Ref<string>, outProjectFile: puerts.$Ref<string>): boolean;
        setAssemblyMainProject(projectName: string): boolean;
        getAssemblySubProject(outProjectMap: Map<string, string>): boolean;
        getProjectPublicState(outProjectPublicState: Map<string, boolean>): boolean;
        setProjectPublicState(projectPublicState: Map<string, boolean>): boolean;
        copyAssemblyProjects(sourceNames: string[]): boolean;
        deleteAssemblyProjects(sourceNames: string[]): boolean;
        renameAssemblyProject(sourceName: string, targetName: string): boolean;
    }
}

/// <reference types="Extension" />
declare namespace mweditor {
    class Shortcut extends mweditor.EditorSystemBase {
        /**
         * @author hao.wu
         * @description 添加全局快捷键映射
         * @groups GUI
         * @effect 调用端生效
         * @param inputChord usage:输入按键
         * @param onPressed usage:按下回调
         * @param onReleased usage:松开回调
         */
        bindGlobalShortcutMapping(inputChord: mweditor.InputChord, onPressed: () => mw.EventReply, onReleased?: () => mw.EventReply): void;
        /**
         * @author hao.wu
         * @description 移除全局快捷键映射
         * @groups GUI
         * @effect 调用端生效
         * @param inputChord usage:输入按键
         */
        unbindGlobalShortcutMapping(inputChord: mweditor.InputChord): void;
        /**
         * @author maohang.zeng
         * @description 移除所有全局快捷键映射
         * @groups GUI
         * @effect 调用端生效
         */
        clearAllGlobalShortcutMapping(): void;
        /**
         * @author hao.wu
         * @description 添加UI快捷键映射
         * @groups GUI
         * @effect 调用端生效
         * @param uiObject usage:UI对象
         * @param inputChord usage:输入按键
         * @param onPressed usage:按下回调
         * @param onReleased usage:松开回调
         */
        bindUIShortcutMapping(uiObject: mw.UserWidget, inputChord: mweditor.InputChord, onPressed: () => mw.EventReply, onReleased?: () => mw.EventReply): void;
        /**
         * @author hao.wu
         * @description 移除UI快捷键映射
         * @groups GUI
         * @effect 调用端生效
         * @param uiObject usage:UI对象
         * @param inputChord usage:输入按键
         */
        unbindUIShortcutMapping(uiObject: mw.UserWidget, inputChord: mweditor.InputChord): void;
        /**
         * @author maohang.zeng
         * @description 移除所有UI快捷键映射
         * @groups GUI
         * @effect 调用端生效
         */
        clearAllUIShortcutMapping(uiObject: mw.UserWidget): void;
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
/// <reference types="engine" />
declare namespace mweditor {
    // @ts-ignore
    import UE from "ue";
    class ToolBar extends mweditor.EditorSystemBase {
        private MWEdToolBarSubsystem;
        onLogWindowClosed: mw.MulticastDelegate<(name: string) => void>;
        onLogWindowOpen: mw.MulticastDelegate<(name: string) => void>;
        onTSAutoCompileChanged: mw.MulticastDelegate<(auto: boolean) => void>;
        onAlignmentToolTabChanged: mw.MulticastDelegate<(auto: boolean) => void>;
        onPerformanceTabChanged: mw.MulticastDelegate<(auto: boolean) => void>;
        onNewResolution: mw.MulticastDelegate<(name: string, width: number, height: number) => void>;
        onResourceReady: mw.MulticastDelegate<() => void>;
        onGeometryState: mw.MulticastDelegate<(one: boolean, two: boolean, three: boolean) => void>;
        onBBACheckChanged: mw.MulticastDelegate<(auto: boolean) => void>;
        onTransformChanged: mw.MulticastDelegate<(mode: number) => void>;
        onScaleTypeChanged: mw.MulticastDelegate<(type: number) => void>;
        onCoordModeChanged: mw.MulticastDelegate<(mode: number) => void>;
        onGizmoSocketTypeChanged: mw.MulticastDelegate<(mode: number) => void>;
        onSnapChanged: mw.MulticastDelegate<(snap: boolean) => void>;
        onDeleteResolution: mw.MulticastDelegate<() => void>;
        onPathFinding: mw.MulticastDelegate<(find: boolean) => void>;
        onSwitchBoxChanegd: mw.MulticastDelegate<(mode: string) => void>;
        onPIEChanged: mw.MulticastDelegate<(mode: Number) => void>;
        onChordSettingChanged: mw.MulticastDelegate<(name: string, chord: any) => void>;
        private onBBACheckChangedBind;
        private onTransformChangedBind;
        private onScaleTypeChangedBind;
        private onCoordModeChangedBind;
        private onGizmoSocketTypeChangedBind;
        private onSnapChangedBind;
        private onDeleteResolutionBind;
        private onPathFindingBind;
        initialize(): void;
        deinitialize(): void;
        registerToolBarWidget(uiInfo: string, flag: number): void;
        registerGamesettingWidget(uiInfo: string): void;
        registerMenuToolBarWidget(uiInfo: string, callback: (widget: mw.Widget) => void, type: string): void;
        ForwardAlignToolCheckBoxEvent(state: mw.CheckBoxState): void;
        OpenSettingPanel(): void;
        OpenWeb(tag: number): void;
        OpenHelpWindows(): void;
        OnRelease(): void;
        OnUpdate(): void;
        OnCreate(): void;
        OnOpen(): void;
        OnSave(): void;
        OnDeletePIECache(): void;
        OnExitProject(): void;
        BackupProject(): void;
        GreatAccount(): void;
        ForwardMultilanguageEvent(): void;
        ForwardPerformanceEvent(state: mw.CheckBoxState): void;
        ForwardResolutionEvent(): void;
        DeleteResolution(): void;
        PathFinding(find: boolean): void;
        BBACheckChanged(check: boolean): void;
        ForwardPositionEvent(state: mw.CheckBoxState): void;
        ForwardCursorEvent(state: mw.CheckBoxState): void;
        ForwardOnlineEvent(state: mw.CheckBoxState): void;
        ForwardRuntimeMobileEvent(state: mw.CheckBoxState): void;
        ForwardPlayerEvent(num: number): void;
        ForwardPortEvent(port: number): void;
        ForwardTSCompileButtonClickEvent(method: number): void;
        ForwardModeEvent(paint: boolean): void;
        ForwardTransformModeChangeEvent(): boolean;
        TransformModeChanged(mode: number): void;
        RightButtonDown(): boolean;
        ScaleTypeChanged(mode: number): void;
        CoordModeChanged(mode: number): void;
        GizmoSocketTypeChanged(type: number): void;
        SnapChanged(snap: boolean): void;
        ForwardNumRotateEvent(num: number): void;
        ForwardNumScaleEvent(num: number): void;
        ForwardNumTranslateEvent(num: number): void;
        GetPaintMode(): boolean;
        IsPerformanceTabAlive(): boolean;
        ForwardTabEvent(name: string, state: mw.CheckBoxState): void;
        IsTabAlive(name: string): boolean;
        IsAlignToolTabAlive(): boolean;
        IsTSCompileButtonEnabled(): boolean;
        ForwardShowWireframeEvent(state: mw.CheckBoxState): void;
        ShowWireframe(): boolean;
        ForwardShowChatframeEvent(state: mw.CheckBoxState): void;
        ShowChatframe(): boolean;
        ForwardShowPINGRegionEvent(state: mw.CheckBoxState): void;
        ShowPINGRegion(): boolean;
        ForwardShowViewSelectorEvent(state: mw.CheckBoxState): void;
        ShowViewSelector(): boolean;
        ForwardRunPIEWithHotKeyEvent(type: number): void;
        ForwardRunEvent(): void;
        ForwardPauseEvent(): void;
        ForwardResumeEvent(): void;
        ForwardStopEvent(): void;
        ForwardNewClientEvent(): void;
        ClientTooltipVisible(): boolean;
        ClientButtonEnable(): boolean;
        ClientTooltipText(): string;
        CommandLineParam(command: string): boolean;
        CommandLineValue(command: string): string;
        GetEditorGameSettingPath(): string;
        GetEditorSettingPath(): string;
        GetGameSettingPath(): string;
        CustomAddClicked(): void;
        ScreenAspectRatioClicked(NewIsHorizontal: boolean): void;
        EditorPresetJson(): string;
        UserCustomJson(): string;
        GetResolutionSettingsPath(): string;
        RemoveUserCustomConfig(name: string): void;
        SelectResolution(name: string): void;
        GetBaseModelList(): any[];
        ModelContentChange(guid: string): void;
        OnUnionClicked(): void;
        OnNegateClicked(): void;
        OnSeparateClicked(): void;
        GetActiveChord(id: string): UE.InputChord;
        BuildAll(): void;
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    /**
     * UI编辑器通用管理接口
     */
    class UIEditorSubsystem extends mweditor.EditorSystemBase {
        /**
         * 打开UI编辑器或则关闭UI编辑器时触发事件
         */
        static get onUIEditorOpenOrClosedEvent(): mw.MulticastDelegate<(bOpen: boolean, assetId: string) => void>;
        /**
         * UI选择页面改动时刷新
         */
        static get onUIEditorPageChangeEvent(): mw.MulticastDelegate<(assetId: string) => void>;
        /**
         * 获取到根UI节点
         */
        getRootUIWidget(): mw.UserWidget;
        /**
         * 刷新属性面板
         */
        freshDetail(): void;
        /**
         * 刷新对象管理器
         */
        freshOutline(): void;
        /**
         * 保存UI编辑器
         * @param bSaveAllOpenedEditor:是否所有打开得UI编辑器都触发保存
         */
        save(bSaveAllOpenedEditor?: boolean): void;
        /**
         * 获取UI编辑器的选中UI对象
         */
        getCurrentSelectedUIWidget(): mw.Widget[];
        /**
         * 增加选中的UI
         */
        addSelectUIWidget(widget: mw.Widget): void;
        /**
         * 清空选中
         */
        clearSelectedUIWidget(): void;
        /**
         * 删除UI对象
         * @param widget：需要删除的对象
         */
        deleteUIWidget(widget: mw.Widget): void;
        /**
         * 关闭该UI编辑器
         */
        close(): void;
        /**
         * 选中UI改变事件
         */
        get onSelectChangeEvent(): mw.MulticastDelegate<(widgets: mw.Widget[]) => void>;
    }
}

/// <reference types="Extension" />
declare namespace mweditor {
    /**
     * @author miaohang.zeng
     * @groups 系统
     * @description 用户数据相关
     */
    class User extends mweditor.EditorSystemBase {
        /**
         * 使用当前登录的token发起http请求
         * 请求参数设置规则解释于参数类型中
         */
        static httpRequestWithToken(httpRequestInfo: mweditor.HttpRequestInfo, callback?: (code: number, url: string, result: string) => {}): boolean;
        /**
         * 获取当前用户名称
         */
        get userName(): string;
        /**
         * 获取当前用户头像
         * @param ImageInfo 图片信息类
         */
        getUserImage(ImageInfo: mw.ImageInfo): Promise<void>;
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    class PluginWindow {
        /**
         * @deprecated 实验接口，谨慎使用
         * 获取所有视口
         */
        static hasWindowActive(InGuid: string): boolean;
        /** 窗口类型 */
        get type(): mweditor.WindowType;
        /** 窗口名称 */
        get name(): string;
        /** 窗口名称 */
        set name(InVal: string);
        /** 标题大小 */
        get titleSize(): mw.Vector2;
        /** 窗口状态 */
        get status(): mweditor.PluginWindowStatus;
        /** 窗口状态 */
        set status(InState: mweditor.PluginWindowStatus);
        /** 窗口屏幕坐标 */
        get position(): mw.Vector2;
        /** 窗口屏幕坐标 */
        set position(InVal: mw.Vector2);
        /** 窗口大小 */
        get windowSize(): mw.Vector2;
        /** 窗口大小 */
        set windowSize(InVal: mw.Vector2);
        /** 新窗口创建 */
        static onWindowCreate(): mw.MulticastDelegate<(w: PluginWindow) => void>;
        /** 主窗口 */
        static get mainWindow(): PluginCustomWindow;
        /** 聚焦窗口 */
        focus(): void;
        /**
         * @description 展示提示文字弹窗
         * @effect 编辑器器生效
         * @param text 提示文字
         * @param title 标题文字
         */
        static showTipWindow(text: string, title?: string): void;
        /**
         * 展示通知窗口
         * @param text 提示文字
         * @param type 展示类型
         * @param pos 创建位置
         */
        static showToastWindow(text: string, type?: mweditor.CompletionState, pos?: mw.Widget | mw.Vector2): void;
        /**
         * 创建自定义GameUI窗口
         * @param UIPath GameUI路径
         * @param windowInfo usage: 构建窗口的信息 <br>  default: 选填
         * @returns 构造的窗口
         */
        static createUIWindow(UIPath: string, windowInfo?: mweditor.WindowInfo): PluginWindow;
        /**
         * 展示自定义插件资源窗口
         * @param Type 窗口对象类
         * @param layoutInfo 窗口布局
         * @returns 异步返回对象
         */
        static createCustomWindow<T extends PluginCustomWindow>(Type: {
            new (...params: any[]): T;
        }, layoutInfo: mweditor.Layout): Promise<T>;
        /**
         * 展示自定义GameUI组合窗口
         * @param UICombinationParam UI 组合布局结构
         * @param WidgetCanvasMap 生成的UI映射
         * @param windowInfo usage: 构建窗口的信息 <br>  default: 选填
         * @returns 构造的窗口
         */
        static createUICombinationWindow(UICombinationParam: mweditor.CombinationParam, WidgetCanvasMap: Map<string, mw.Widget>, windowInfo?: mweditor.WindowInfo): PluginWindow;
        /**
         * 展示自定义带有关闭回调的窗口
         * @param UICombinationParam UI 组合布局结构
         * @param WidgetCanvasMap 生成的UI映射
         * @param WindowSize 窗口大小
         * @param TitleStr 窗口标题栏
         * @param ShowType 窗口展示类型
         * @returns 返回窗口GUID
         */
        static showCombinationClosebackWindow(UICombinationParam: mweditor.CombinationParam, CloseCallback: mw.Delegate<() => void>, WidgetCanvasMap: Map<string, mw.Widget>, windowInfo?: mweditor.WindowInfo): PluginWindow;
        /** 注册Tab */
        static registerTab(target: PluginCustomWindow | mweditor.TabOwner | string, uiInfo: string | mweditor.CombinationParam, tabId: string, callback: (layoutInfo: mweditor.Layout, UIrootCanvas: Map<string, mw.Widget>, UIAssetId?: string) => void): void;
        /** 从编辑器注销Tab */
        static unregisterTab(tabId: string, target: PluginCustomWindow | mweditor.TabOwner | string): void;
    }
    class PluginCustomWindow extends PluginWindow {
        /**
         * 获取自身定义的Tab数据
         * @param TabId 指定的tabId
         * @returns 返回创建的tab 数据
         */
        findTab<T extends mweditor.Tab>(TabId: string): T;
        showLoadingWithGuid(Guid: string, content: string): boolean;
        hideLoadingWithGuid(Guid: string): void;
        /** 当前Layout布局 */
        get layout(): mweditor.Layout;
        /** 设置Layout布局 */
        set layout(InVal: mweditor.Layout);
    }
    class CustomTab extends mweditor.Tab {
        UIPath: string;
        constructor(UIPath: string, TabId: string, InTabDisplayName?: string);
        /** UI */
        get rootWidget(): mw.UserWidget;
    }
}

declare namespace mweditor {
}

declare namespace mweditor {
    /**
     * 文件编码
     */
    enum EncodingOptions {
        UTF8 = 0,
        UTF8WithoutBOM = 1,
        Ansi = 2
    }
    /**
     * 资源文件或者文件夹信息
     */
    class File {
        protected constructor();
        /**
         * 判断文件或者文件夹存不存在
         * @param inPath 路径
         * @returns 存在与否
         */
        static exist(inPath: string): boolean;
        /**
         * 打开获取文件操作,没有会直接返回空
         * @param inPath 路径
         * @returns 文件操作句柄
         */
        static open(inPath: string): File;
        /**
         * 创建一个新的文件,如果文件已经存在那么会创建失败，返回空
         * @param inPath 路径
         * @param bDirectory 是不是文件夹
         * @returns 文件操作句柄
         */
        static create(inPath: string, bDirectory: boolean): File;
        /**
         * 删除文件或则文件夹
         * @param file 文件或则文件路径
         * @returns 删除成功与否
         */
        static delete(file: File | string): boolean;
        /**
         * 打开平台的 “打开文件” 对话框
         * @param DialogTitle 对话框名称
         * @param DefaultPath 默认打开路径
         * @param DefaultFile 默认选择文件
         * @param FileTypes 要在对话框中显示的类型筛选器。此字符串应该是一个以“|”分隔的（描述|扩展列表）对列表。扩展列表以“；”分隔。e.g. "EXCEL file|*.xlsx;
*.xls"
         * @param Multiple 是否支持多选
         * @returns 选中的返回文件
         */
        static openFileDialog(DialogTitle: string, DefaultPath: string, DefaultFile: string, FileTypes: string, Multiple?: boolean): string[];
        /**
         * 打开平台的 “打开文件夹” 对话框
         * @param DialogTitle 对话框窗口标题的文本
         * @param DefaultPath 文件对话框最初打开的路径
         * @returns 在对话框中选择的文件夹
         */
        static openDirectoryDialog(DialogTitle: string, DefaultPath: string): string;
        /**
         * 打开平台的 "保存文件" 对话框
         * @param DialogTitle 对话框窗口标题的文本
         * @param DefaultPath 文件对话框最初打开的路径
         * @param DefaultFile 默认保存名字
         * @param FileTypes 要在对话框中显示的类型筛选器。此字符串应该是一个以“|”分隔的（描述|扩展列表）对列表。扩展列表以“；”分隔。e.g. "EXCEL file|*.xlsx;
*.xls"
         * @param Multiple 是否可以多选文件
         * @returns 在对话框中选择的文件夹
         */
        static openSaveFileDialog(DialogTitle: string, DefaultPath: string, DefaultFile: string, FileTypes: string, Multiple?: boolean): string[];
        /**
         * 压缩文件
         * @param destPath 保存压缩包地址
         * @param zipFiles 需要压缩的全部文件
         * @param callBack 压缩进度回调，主要该函数是同步函数
         * @returns
         */
        static createZipByFiles(destPath: string, zipFiles: string[], callBack?: (progress: number) => void): boolean;
        /**
         * 通过目录压缩文件
         * @param destPath 压缩保存文件路径
         * @param zipDirectory 需要压缩的目录
         * @param ignoreExtFiles 需要压缩忽略的文件后缀（.ts）
         * @param ignoreDirectories 需要压缩忽略的目录
         * @param callBack 压缩进度回调，主要该函数是同步函数
         * @returns
         */
        static createZipByPath(destPath: string, zipDirectory: string, ignoreExtFiles?: string[], ignoreDirectories?: string[], callBack?: (progress: number) => void): boolean;
        /**
         * 解压缩文件
         * @param destPath 解压路径
         * @param zipPath 需要解压的zip文件
         * @returns 成功与否
         */
        static unZip(destPath: string, zipPath: string): boolean;
        /**
         * 工程存储根目录
         */
        static get projectSavedPath(): string;
        /**
         * 当前工程目录
         */
        static get curProjectPath(): string;
        /**
         * 编辑器引擎安装内容目录
         */
        static get engineContentPath(): string;
        /**
         * 本地插件目录
         */
        static get pluginSavedPath(): string;
        /**
         * 全局插件目录
         */
        static get globalPluginSavedPath(): string;
        /**
         * 全局可写目录
         */
        static get globalSavedPath(): string;
        /**
         * 文件或者文件夹大小
         */
        get size(): number;
        /**
         * 文件创建时间戳
         */
        get createTime(): number;
        /**
         * 文件最新修改时间戳
         */
        get modifyTime(): number;
        /**
         * 文件最新读取时间戳
         */
        get accessTime(): number;
        /**
         * 使用资源管理器打开指定文件
         */
        explore(): void;
        /**
         * 是否是文件夹
         */
        get isDirectory(): boolean;
        /**
         * 是否只可读
         */
        get isReadonly(): boolean;
        /**
         * 文件名称
         * 如果是文件的话不会带后缀
         * 如果是文件夹，就返回文件夹的名称
         */
        get name(): string;
        /**
         * 文件名后缀，如果是文件夹，直接返回空字符串。比如.png、.exe 等等
         */
        get extension(): string;
        /**
         * 返回文件或者文件夹的路径
         */
        get path(): string;
        /**
         * 返回文件或者文件夹的完整路径
         */
        get absolutePath(): string;
        /**
         * 获取当前目录下的所有文件信息
         * 如果是文件,那么直接返回空
         */
        get files(): File[];
        /**
         * 拷贝文件或者文件夹
         * @param destination 拷贝目的地址
         * @param overwrite 是否覆盖
         * @returns 返回成功还是失败
         */
        copyTo(destination: string, overwrite?: boolean): boolean;
        /**
         * 移动文件或者文件夹
         * @param destination 移动到目的地址
         * @param overwrite 是否覆盖
         * @returns 返回成功还是失败
         */
        moveTo(destination: string, overwrite?: boolean): boolean;
        /**
         * 判断文件是不是在指定的文件夹下面
         * @param file 文件信息或者文件路径
         * @returns 结果是与不是
         */
        under(directory: File | string): boolean;
        /**
         * 转换文件到相对于指定目录或者文件的相对路径
         * 如果转换的文件路径不存在具体文件，那么会认为转换的文件路径指向的是一个文件而不是文件夹
         * @param file 文件信息或者文件路径
         * @returns 返回路径
         */
        getRelativePathFrom(file: File | string): string;
        /**
         * 获取文件或者文件夹所在的父文件夹信息
         */
        get parentPath(): File;
        /**
         * 异步文件读取数据
         * @param offset  读取文件的偏移字节，最小0，最大不超过文件长度
         * @param length  读取文件的长度,-1表示读取全部文件，最大不超过文件长度
         */
        asyncRead(offset?: number, length?: number): Promise<string>;
        /**
         * 异步写入文件
         * @param data 写入的数据
         * @param bAppend 是否是追写
         * @param encoding 写入的编码格式
         */
        asyncWrite(data: string, bAppend?: boolean, encoding?: EncodingOptions): Promise<boolean>;
        /**
         * 是不是同一个目录
         * @param other 比较的目录
         * @returns 是或者否
         */
        isEquals(other: File | string): boolean;
        /**
         * 获取文件hash值
         * @returns Hash字符
         */
        toHash(): string;
        /**
         * 获取文件SHA1校验码
         * @returns 文件sha1值
         */
        toSha1(): string;
        /**
         * 字符串转Hash字符
         * @param a 需要转换的字符串
         * @returns Hash字符
         */
        static hashAnsiString(a: string): string;
    }
}

/// <reference types="Extension" />
declare namespace mweditor {
    enum DownloadRequestState {
        /** 下载中 */
        Downloading = 0,
        /** 下载成功 */
        Success = 1,
        /** 下载失败 */
        Fail = 2
    }
    /**
     * @author miaohang.zeng
     * @groups 下载
     * @description 下载资源接口
     */
    class DownloadRequest {
        /** 下载完成 */
        get onDownloadComplete(): mw.MulticastDelegate<(code: number, filePath: string) => void>;
        /** 下载进度 */
        get onDownloadProgress(): mw.MulticastDelegate<(progress: number) => void>;
        /** 下载状态 */
        get downloadState(): DownloadRequestState;
        /** 下载进度 */
        get progress(): number;
        /** 取消下载 */
        cancel(): void;
        /** 恢复下载 */
        resume(): boolean;
        /** 获取下载文件大小 */
        fileSize(): Promise<bigint>;
        /**
         * 下载
         * @param url 下载路径
         * @param throttling 是否断点续传
         * @returns 下载请求
         */
        static download(url: string, throttling?: boolean, savePath?: string): DownloadRequest;
        /**
         * 查找下载队列中是否有下载请求
         * @param url 下载路径
         * @returns 下载请求
         */
        static findRequest(url: string): DownloadRequest;
    }
}

declare namespace mweditor {
}

/// <reference types="Extension" />
declare namespace mweditor {
    /**
     * 插件加载阶段
     * 越往后，越晚加载
     */
    enum PluginLoadingPhase {
        /** 无效 */
        None = 0,
        /** 预初始化*/
        PreInit = 1,
        /** 初始化 */
        Init = 2,
        /** 默认时机 */
        Default = 3,
        /** 初始化完成后 */
        PostInit = 4,
        /** 加载游戏阶段 */
        LoadGame = 5,
        /** 加载完游戏后 */
        PostLoadGame = 6
    }
    /**
     * 插件导入失败原因
     */
    enum ImportPluginFailedReason {
        /**正常导入 */
        None = 0,
        /**未找到插件 */
        NotFound = 1,
        /**无效插件包 */
        InValidPlugin = 2,
        /**已经有和插件相同的目录或则插件 */
        HasSamePlugin = 3
    }
    /**
     * 导出失败原因
     */
    enum ExportPluginFailedReason {
        /**正常导出 */
        None = 0,
        /**未找到插件 */
        NotFound = 1,
        /**无效插件包 */
        InValidPlugin = 2,
        /**编译失败 */
        CompileFailed = 3,
        /**混淆失败 */
        UglifyjsFailed = 4,
        /**压缩失败 */
        ZipFailed = 5
    }
    class CreatePluginData {
        /**全局插件 */
        isGlobal: boolean;
        /** 作者 */
        author: string;
        /** 链接 */
        url: string;
        /** 简介 */
        brief: string;
        /** 自动加载 */
        autoLoad: boolean;
        /** 加载阶段 */
        loadingPhase: PluginLoadingPhase.Default;
        /** 加载权重 */
        loadingWeight: 1000;
    }
    /**
     * 插件信息
     */
    class PluginInfo {
        relativePath: string;
        id: string;
        author: string;
        url: string;
        name: string;
        brief: string;
        autoLoad: boolean;
        version: string;
        withRuntime: boolean;
        loadingPhase: PluginLoadingPhase;
        loadingWeight: number;
        typingNameSpace: string;
        oversea: boolean;
        /**
         * 从一段json字符串反序列化出插件信息
         * @param pluginDataJson json字符串
         * @returns 返回数据信息
         */
        static fromJson(pluginDataJson: string): Readonly<PluginInfo>;
        /**
         * json字符串化
         * @returns  返回json字符串
         */
        toJsonString(): string;
        get isGlobal(): boolean;
        get loaded(): boolean;
        protected constructor();
        static get onCompileComplete(): mw.MulticastDelegate<(data: Readonly<PluginInfo>, bSuccess: boolean) => void>;
        /**
        * 插件被加载时
        * @returns 返回事件
        * */
        static get onPluginLoad(): mw.MulticastDelegate<(plugin: PluginInfo) => void>;
        /**
         * 插件被通知卸载时
         * @returns 返回事件
         * */
        static get onPluginUnload(): mw.MulticastDelegate<(plugin: PluginInfo) => void>;
        /**
         * 导出插件到硬盘
         * @param exportPath 导出到的路径
         * @param uglyJs 是否到处是混淆脚本
         * @param ignoreDirectories 忽略的文件夹
         * @param ignoreFilesExt 忽略的文件后缀
         * @returns 是否成功
         */
        exportPlugin(exportPath: string, uglyJs?: boolean, ignoreDirectories?: Array<string>, ignoreFilesExt?: Array<string>): ExportPluginFailedReason;
        /**
         * 导入插件
         * @param pluginPath 导入插件的插件位置
         * @param bGlobal 是否导入全局
         * @param bForceLoad 是否强制加载
         * @returns 导入插件信息
         */
        static importPlugin(pluginPath: string, bGlobal?: boolean, bForceLoad?: boolean): ImportPluginFailedReason;
        /**
         * 根据给定得信息创建插件，并在硬盘生成对应得插件文件夹
         * @param name 插件名称
         * @param data 插件信息
         * @returns 创建的插件信息，失败返回空
         */
        static createPlugin(name: string, data: CreatePluginData): Readonly<PluginInfo>;
        /**
         * 拷贝中英文Typing至当前工程和Saved目录下
         */
        static copyTyping(): void;
        /**
         * 编译目录下的所有插件
         * @param inPluginPath 包含插件的父目录
         * @returns 返回成功编译的插件数
         */
        static compileAllPlugins(inPluginPath: string): number;
        /**
         * 编译当前插件
         * @returns 返回成功编译
         */
        compile(): boolean;
        /**
         * 获取工程内的全部插件
         * @returns 返回全部插件
         */
        static getProjectPlugins(): Array<Readonly<PluginInfo>>;
        /**
         * 获取全局插件
         * @returns 返回全部插件
         */
        static getGlobalPlugins(): Array<Readonly<PluginInfo>>;
        /**
         * 获取全部内置的插件
         * returns 返回全部插件
         */
        static searchInstalledPlugins(): Array<Readonly<PluginInfo>>;
        /**
         * 根据插件路径获取插件信息
         * @param inPath 插件的路径
         * @returns 插件信息
         */
        static getPluginByPath(inPath: string): Readonly<PluginInfo>;
        /**
         * 从已经加载的插件里寻找插件
         * @param inName 插件名称
         * @returns 插件信息
         */
        static getPluginByName(inName: string): Readonly<PluginInfo>;
        /**
         * 加载插件，如果插件已经加载了那么不做任何处理
         */
        load(): void;
        /**
         * 卸载插件，如果插件未加载不做任何处理
         */
        unload(): void;
    }
}

declare namespace mweditor {
    class AssetInfo {
        /** 显示名称 */
        displayName: string;
        /** 资源guid */
        assetGuid: string;
        /** 资源类型 */
        assetType: mweditor.AssetType;
        /** 树形结构 */
        treeList: string[];
        /** 风格组 */
        styleList: string[];
        /** 筛选组 */
        filterList: string[];
    }
    enum AssetType {
        /** Static Mesh */
        StaticMesh = 0,
        /** Skeletal Mesh */
        SkeletalMesh = 1,
        /** ClothSK */
        Cloth = 2,
        /** Audio */
        Audio = 3,
        /** Texture */
        Texture = 4,
        /** Prefab */
        Prefab = 5,
        /** @description Local Characterfile */
        Character = 6,
        /** Particle System */
        ParticleSystem = 7,
        /** UITexture */
        UITexture = 8,
        /** Animation */
        Animation = 9,
        /** Anime Instance */
        AnimInstance = 10,
        /** Material Instance */
        MaterialInstance = 11,
        /** Sky Box */
        Sky = 12,
        /** Basic Stance */
        BasicStanceData = 13,
        /** Anim Sequence */
        AnimSequence = 14,
        /** New Anim Sequence */
        MWAnimSequence = 15,
        /**TextureCube */
        TextureCube = 16,
        /** 游戏功能对象 */
        GameObject = 17,
        Max = 18
    }
}

declare namespace mweditor {
    enum BData_PropertyWidgetType {
        Input = 0,
        Sliding = 1,
        Click = 2,
        Vector = 3,
        Vector2 = 4,
        Vector4 = 5,
        Color = 6,
        DropDown = 7,
        Asset = 8,
        Script = 9,
        Align = 10,
        Margin = 11,
        DragIn = 12,
        Straw = 13,
        Array = 14,
        Transform = 15,
        Rotation = 16
    }
    enum BData_PropertyWidgetMethod {
        input = 0,
        past = 1,
        reset = 2,
        slide = 3,
        click = 4,
        colorPick = 5,
        choose = 6,
        dragIn = 7,
        alignWidget = 8,
        input_separately = 9,
        straw = 10,
        add = 11,
        delete = 12
    }
    class BData_PropertyChange {
        /** 对象类型 */
        obj_Type: string;
        /** 对象资源对应的id */
        obj_AssetID: string;
        /** 对象自身的id */
        obj_ID: string;
        /** 对象是否在预制体内 */
        obj_BPrefab: boolean;
        /** 对象所在预制体的id */
        obj_PrefabID: string;
        /** 对象名称 */
        obj_Name: string;
        /** 对象所属的UI文件 */
        obj_fileName: string;
        /** 属性名称 */
        property_Name: string;
        /** 是否为自定义属性 */
        property_BDynamic: boolean;
        /** 属性的类型 */
        property_type: mweditor.EPropertyType;
        /** 改之前的值*/
        property_OldValue: string;
        /** 改之后的值*/
        property_NewValue: string;
        /** 属性面板的控件类型，*/
        property_WidgetType: BData_PropertyWidgetType;
        /** 属性控件修改方式 */
        property_WidgetMethod: BData_PropertyWidgetMethod;
    }
    enum BDataType {
        mw_none = "mw_none",
        pandora_push_log_statistics = "pandora_push_log_statistics",
        mw_login_editor = "mw_login_editor",
        mw_request_assets_list = "mw_request_assets_list",
        mw_download_assets = "mw_download_assets",
        mw_editor_memoryusage = "mw_editor_memoryusage",
        mw_user_duration = "mw_user_duration",
        mw_user_focus = "mw_user_focus",
        mw_use_template = "mw_use_template",
        mw_open_saved_project = "mw_open_saved_project",
        mw_gameplay_create = "mw_gameplay_create",
        mw_gameplay_use = "mw_gameplay_use",
        mw_prefab = "mw_prefab",
        mw_ui = "mw_ui",
        mw_run_project = "mw_run_project",
        mw_run_result = "mw_run_result",
        mw_save_project = "mw_save_project",
        mw_release_game = "mw_release_game",
        mw_update_game = "mw_update_game",
        mw_prefab_create = "mw_prefab_create",
        mw_projectcontent_prefab_import = "mw_projectcontent_prefab_import",
        mw_mainview_use = "mw_mainview_use",
        mw_objmanager_use = "mw_objmanager_use",
        mw_projcontent_use = "mw_projcontent_use",
        mw_properpanel_use = "mw_properpanel_use",
        mw_maintranslation_use = "mw_maintranslation_use",
        mw_mainscale_use = "mw_mainscale_use",
        mw_mainrotation_use = "mw_mainrotation_use",
        mw_switch_snap_to_grid = "mw_switch_snap_to_grid",
        mw_createscript = "mw_createscript",
        mw_importscript = "mw_importscript",
        mw_assets_use_time = "mw_assets_use_time",
        mwb_assetcrash_worldrun = "mwb_assetcrash_worldrun",
        mw_prefab_swtichto_mainview = "mw_prefab_swtichto_mainview",
        mw_prefab_useInobjectmanager = "mw_prefab_useInobjectmanager",
        mw_prefab_useInprojectcontent = "mw_prefab_useInprojectcontent",
        mw_uiobject_create = "mw_uiobject_create",
        mw_uieditor_use = "mw_uieditor_use",
        mw_uieditor_save = "mw_uieditor_save",
        mw_uiobject_applicate = "mw_uiobject_applicate",
        mw_uiuserwidget_create = "mw_uiuserwidget_create",
        mw_charaeditor_use = "mw_charaeditor_use",
        mw_charaeditor_import_dress = "mw_charaeditor_import_dress",
        mw_charaeditor_export_dress = "mw_charaeditor_export_dress",
        mw_charaeditor_open = "mw_charaeditor_open",
        mw_close_view_menu = "mw_close_view_menu",
        mw_charaeditor_save = "mw_charaeditor_save",
        mw_charaeditor_saveas = "mw_charaeditor_saveas",
        mw_character_import_viewport = "mw_character_import_viewport",
        mw_character_import_project = "mw_character_import_project",
        mw_character_export_project = "mw_character_export_project",
        mw_character_files_preview = "mw_character_files_preview",
        mw_switch_projectcontent_view = "mw_switch_projectcontent_view",
        mw_copy_file_name = "mw_copy_file_name",
        mw_open_file_path = "mw_open_file_path",
        mw_character_file_edit = "mw_character_file_edit",
        mw_animation_resource_add = "mw_animation_resource_add",
        mw_play_animation = "mw_play_animation",
        mw_find_animation = "mw_find_animation",
        mw_run_addclient = "mw_run_addclient",
        mw_charaeditor_assets_add = "mw_charaeditor_assets_add",
        mw_charaeditor_items_add = "mw_charaeditor_items_add",
        mw_assets_screen = "mw_assets_screen",
        mw_assets_search = "mw_assets_search",
        mw_assets_click = "mw_assets_click",
        mw_newproject = "mw_newproject",
        mw_openproject = "mw_openproject",
        mw_backup = "mw_backup",
        mw_logout = "mw_logout",
        mw_exit = "mw_exit",
        mw_resetview = "mw_resetview",
        mw_updateannouncement = "mw_updateannouncement",
        mw_undo = "mw_undo",
        mw_recovery = "mw_recovery",
        mw_apidocument = "mw_apidocument",
        mw_officialtutorial = "mw_officialtutorial",
        mw_productmanual = "mw_productmanual",
        mw_forum = "mw_forum",
        mw_localization_collect = "mw_localization_collect",
        mw_localization_import = "mw_localization_import",
        mw_localization_languageswitch = "mw_localization_languageswitch",
        mw_localization_configure = "mw_localization_configure",
        mw_localization_pagechange = "mw_localization_pagechange",
        mw_localization_export = "mw_localization_export",
        mw_localization_apply = "mw_localization_apply",
        mw_localization_use = "mw_localization_use",
        mw_localization_open = "mw_localization_open",
        mw_assets_create = "mw_assets_create",
        mw_assets_use = "mw_assets_use",
        mw_assets_usettc = "mw_assets_usettc",
        mw_assets_createttc = "mw_assets_createttc",
        mw_tips_fixed = "mw_tips_fixed",
        mw_tips_linkclick = "mw_tips_linkclick",
        mw_tips_show = "mw_tips_show",
        mw_maineditor_projectcontent_movescript = "mw_maineditor_projectcontent_movescript",
        mw_maineditor_projectcontent_create = "mw_maineditor_projectcontent_create",
        mw_maineditor_projectcontent_click_import = "mw_maineditor_projectcontent_click_import",
        mw_maineditor_projectcontent_import = "mw_maineditor_projectcontent_import",
        mw_maineditor_projectcontent_search = "mw_maineditor_projectcontent_search",
        mw_maineditor_projectcontent_clear_search = "mw_maineditor_projectcontent_clear_search",
        mw_maineditor_projectcontent_exit_search = "mw_maineditor_projectcontent_exit_search",
        mw_maineditor_projectcontent_tileandlists = "mw_maineditor_projectcontent_tileandlists",
        mw_maineditor_projectcontent_quickpath = "mw_maineditor_projectcontent_quickpath",
        mw_maineditor_projectcontent_file_rightclick = "mw_maineditor_projectcontent_file_rightclick",
        mw_maineditor_projectcontent_copy = "mw_maineditor_projectcontent_copy",
        mw_maineditor_projectcontent_copyid = "mw_maineditor_projectcontent_copyid",
        mw_maineditor_projectcontent_rename = "mw_maineditor_projectcontent_rename",
        mw_maineditor_projectcontent_rename_limite = "mw_maineditor_projectcontent_rename_limite",
        mw_maineditor_projectcontent_rename_result = "mw_maineditor_projectcontent_rename_result",
        mw_maineditor_projectcontent_delete = "mw_maineditor_projectcontent_delete",
        mw_maineditor_projectcontent_openposition = "mw_maineditor_projectcontent_openposition",
        mw_maineditor_projectcontent_choose_quoteobject = "mw_maineditor_projectcontent_choose_quoteobject",
        mw_maineditor_projectcontent_edit = "mw_maineditor_projectcontent_edit",
        mw_maineditor_projectcontent_export = "mw_maineditor_projectcontent_export",
        mw_maineditor_projectcontent_export_result = "mw_maineditor_projectcontent_export_result",
        mw_maineditor_projectcontent_upload = "mw_maineditor_projectcontent_upload",
        mw_maineditor_projectcontent_reflush = "mw_maineditor_projectcontent_reflush",
        mw_maineditor_projectcontent_create_folder = "mw_maineditor_projectcontent_create_folder",
        mw_maineditor_projectcontent_paste = "mw_maineditor_projectcontent_paste",
        mw_maineditor_projectcontent_saveprefab = "mw_maineditor_projectcontent_saveprefab",
        mw_maineditor_open_preview_window = "mw_maineditor_open_preview_window",
        mw_maineditor_preview_window_switch = "mw_maineditor_preview_window_switch",
        mw_maineditor_preview_window_copyname = "mw_maineditor_preview_window_copyname",
        mw_maineditor_preview_window_copyid = "mw_maineditor_preview_window_copyid",
        mw_maineditor_preview_window_tagsearch = "mw_maineditor_preview_window_tagsearch",
        mw_maineditor_preview_window_playbutton_click = "mw_maineditor_preview_window_playbutton_click",
        mw_maineditor_preview_window_stopbutton_click = "mw_maineditor_preview_window_stopbutton_click",
        mw_maineditor_preview_window_close = "mw_maineditor_preview_window_close",
        mw_maineditor_output_window_switch = "mw_maineditor_output_window_switch",
        mw_maineditor_log_switch = "mw_maineditor_log_switch",
        mw_maineditor_log_rightclick = "mw_maineditor_log_rightclick",
        mw_maineditor_log_clear = "mw_maineditor_log_clear",
        mw_maineditor_log_copy = "mw_maineditor_log_copy",
        mw_maineditor_log_open_position = "mw_maineditor_log_open_position",
        mw_maineditor_projectcontent_popup = "mw_maineditor_projectcontent_popup",
        mw_toolbar_collisionbox_open = "mw_toolbar_collisionbox_open",
        mw_toolbar_collisionbox_close = "mw_toolbar_collisionbox_close",
        mw_toolbar_collisionbox_showinmainviewport = "mw_toolbar_collisionbox_showinmainviewport",
        mw_toolbar_axialswitch = "mw_toolbar_axialswitch",
        mw_toolbar_newcharacter = "mw_toolbar_newcharacter",
        mw_toolbar_camera_open = "mw_toolbar_camera_open",
        mw_toolbar_camera_change = "mw_toolbar_camera_change",
        mw_toolbar_camera_close = "mw_toolbar_camera_close",
        mw_setting_open = "mw_setting_open",
        mw_setting_gravity_model_change = "mw_setting_gravity_model_change",
        mw_setting_acceleration_change = "mw_setting_acceleration_change",
        mw_setting_maxplayernumber_change = "mw_setting_maxplayernumber_change",
        mw_setting_server_reserved_players_change = "mw_setting_server_reserved_players_change",
        mw_setting_server_reserved_players_open = "mw_setting_server_reserved_players_open",
        mw_setting_server_reserved_players_close = "mw_setting_server_reserved_players_close",
        mw_setting_dynamic_routing_open = "mw_setting_dynamic_routing_open",
        mw_setting_dynamic_routing_close = "mw_setting_dynamic_routing_close",
        mw_setting_autobackup_open = "mw_setting_autobackup_open",
        mw_setting_autobackup_close = "mw_setting_autobackup_close",
        mw_setting_backup_frequency_change = "mw_setting_backup_frequency_change",
        mw_setting_open_backup_savepath = "mw_setting_open_backup_savepath",
        mw_setting_shortcut_change = "mw_setting_shortcut_change",
        mw_setting_language_change = "mw_setting_language_change",
        mw_setting_gpu_level_change = "mw_setting_gpu_level_change",
        mw_setting_cpu_level_change = "mw_setting_cpu_level_change",
        mw_setting_mobile_gpu_level_change = "mw_setting_mobile_gpu_level_change",
        mw_setting_mobile_cpu_level_change = "mw_setting_mobile_cpu_level_change",
        mw_setting_preview_language_change = "mw_setting_preview_language_change",
        mw_setting_close = "mw_setting_close",
        pandora_http_request_finish = "pandora_http_request_finish",
        pandora_http_request_error = "pandora_http_request_error",
        mw_aligntool_alignbutton = "mw_aligntool_alignbutton",
        mw_aligntool_open = "mw_aligntool_open",
        mw_aligntool_activeobject_switch = "mw_aligntool_activeobject_switch",
        mw_aligntool_preview = "mw_aligntool_preview",
        mw_aligntool_close = "mw_aligntool_close",
        mw_localization_search = "mw_localization_search",
        mw_localization_clear_search = "mw_localization_clear_search",
        mw_localization_exitsearch = "mw_localization_exitsearch",
        mw_localization_open_filterpanel = "mw_localization_open_filterpanel",
        mw_localization_close_FilterPanel = "mw_localization_close_FilterPanel",
        mw_localization_autotranslate = "mw_localization_autotranslate",
        mw_localization_previewlanguageswitch = "mw_localization_previewlanguageswitch",
        mw_maineditor_objectmanager_addpriorityloadingobject = "mw_maineditor_objectmanager_addpriorityloadingobject",
        mw_projectcompatible_popup_show = "mw_projectcompatible_popup_show",
        mw_projectcompatible_popup_linkclick = "mw_projectcompatible_popup_linkclick",
        mw_projectcompatible_popup_close = "mw_projectcompatible_popup_close",
        mw_compile_result_button_click = "mw_compile_result_button_click",
        mw_compile_popover_jump_script = "mw_compile_popover_jump_script",
        mw_manual_compilation_start = "mw_manual_compilation_start",
        mw_compile_end = "mw_compile_end",
        mw_Ignore_backup_file = "mw_Ignore_backup_file",
        mw_restore_backup_file = "mw_restore_backup_file",
        mw_open_backup_file = "mw_open_backup_file",
        mw_maineditor_projectcontent_showinfolder = "mw_maineditor_projectcontent_showinfolder",
        mw_productmanual_skip = "mw_productmanual_skip",
        mw_maineditor_objectmanager_readymove = "mw_maineditor_objectmanager_readymove",
        mw_maineditor_objectmanager_trigger_wheel = "mw_maineditor_objectmanager_trigger_wheel",
        mw_maineditor_objectmanager_move = "mw_maineditor_objectmanager_move",
        mw_maineditor_objectmanager_rightclick = "mw_maineditor_objectmanager_rightclick",
        mw_maineditor_objectmanager_copy = "mw_maineditor_objectmanager_copy",
        mw_maineditor_objectmanager_cut = "mw_maineditor_objectmanager_cut",
        mw_maineditor_objectmanager_copyid = "mw_maineditor_objectmanager_copyid",
        mw_maineditor_objectmanager_paste = "mw_maineditor_objectmanager_paste",
        mw_maineditor_objectmanager_pasteto = "mw_maineditor_objectmanager_pasteto",
        mw_maineditor_objectmanager_delete = "mw_maineditor_objectmanager_delete",
        mw_maineditor_objectmanager_rename = "mw_maineditor_objectmanager_rename",
        mw_maineditor_objectmanager_rename_limite = "mw_maineditor_objectmanager_rename_limite",
        mw_maineditor_objectmanager_rename_result = "mw_maineditor_objectmanager_rename_result",
        mw_maineditor_objectmanager_createfolder = "mw_maineditor_objectmanager_createfolder",
        mw_maineditor_objectmanager_createfolder_containobject = "mw_maineditor_objectmanager_createfolder_containobject",
        mw_maineditor_objectmanager_createmergerobjects = "mw_maineditor_objectmanager_createmergerobjects",
        mw_maineditor_objectmanager_createmergerobjects_containobjtect = "mw_maineditor_objectmanager_createmergerobjects_containobjtect",
        mw_maineditor_objectmanager_unmerge = "mw_maineditor_objectmanager_unmerge",
        mw_maineditor_objectmanager_createfunctionobject = "mw_maineditor_objectmanager_createfunctionobject",
        mw_maineditor_objectmanager_focus = "mw_maineditor_objectmanager_focus",
        mw_maineditor_objectmanager_locatesource = "mw_maineditor_objectmanager_locatesource",
        mw_maineditor_objectmanager_groop = "mw_maineditor_objectmanager_groop",
        mw_maineditor_objectmanager_cancelgroop = "mw_maineditor_objectmanager_cancelgroop",
        mw_maineditor_objectmanager_createprefab = "mw_maineditor_objectmanager_createprefab",
        mw_maineditor_objectmanager_editprefab = "mw_maineditor_objectmanager_editprefab",
        mw_maineditor_objectmanager_updateprefab = "mw_maineditor_objectmanager_updateprefab",
        mw_maineditor_objectmanager_resetprefab = "mw_maineditor_objectmanager_resetprefab",
        mw_maineditor_objectmanager_savenewprefab = "mw_maineditor_objectmanager_savenewprefab",
        mw_maineditor_objectmanager_editscript = "mw_maineditor_objectmanager_editscript",
        mw_maineditor_objectmanager_showallchildren = "mw_maineditor_objectmanager_showallchildren",
        mw_maineditor_objectmanager_stowallchildren = "mw_maineditor_objectmanager_stowallchildren",
        mw_maineditor_objectmanager_open_filterpanel = "mw_maineditor_objectmanager_open_filterpanel",
        mw_maineditor_objectmanager_screenadd = "mw_maineditor_objectmanager_screenadd",
        mw_maineditor_objectmanager_screendelete = "mw_maineditor_objectmanager_screendelete",
        mw_maineditor_objectmanager_close_filterpanel = "mw_maineditor_objectmanager_close_filterpanel",
        mw_maineditor_objectmanager_all_expandandcollapse = "mw_maineditor_objectmanager_all_expandandcollapse",
        mw_maineditor_objectmanager_search = "mw_maineditor_objectmanager_search",
        mw_maineditor_objectmanager_clear_search = "mw_maineditor_objectmanager_clear_search",
        mw_maineditor_objectmanager_exitsearch = "mw_maineditor_objectmanager_exitsearch",
        mw_maineditor_objectmanager_network = "mw_maineditor_objectmanager_network",
        mw_maineditor_objectmanager_lock = "mw_maineditor_objectmanager_lock",
        mw_maineditor_objectmanager_show = "mw_maineditor_objectmanager_show",
        mw_maineditor_objectmanager_popup = "mw_maineditor_objectmanager_popup",
        mw_maineditor_objectmanager_priorityload_use = "mw_maineditor_objectmanager_priorityload_use",
        mw_main_viewmenu_close = "mw_main_viewmenu_close",
        mw_performance_use = "mw_performance_use",
        mw_profiler_launch = "mw_profiler_launch",
        mw_profiler_close = "mw_profiler_close",
        mw_profiler_button_click = "mw_profiler_button_click",
        mw_scene_operate = "mw_scene_operate",
        mw_scene_switch = "mw_scene_switch",
        mw_scene_delete = "mw_scene_delete",
        mw_scene_new = "mw_scene_new",
        mw_scene_new_popup = "mw_scene_new_popup",
        mw_scene_switch_popup = "mw_scene_switch_popup",
        mw_scene_setmainscene_popup = "mw_scene_setmainscene_popup",
        mw_scene_replace_popup = "mw_scene_replace_popup",
        mw_scene_delete_popup = "mw_scene_delete_popup",
        mw_scene_initializing_scene = "mw_scene_initializing_scene",
        mw_template_click = "mw_template_click",
        mw_project_click = "mw_project_click",
        mw_templatet_download = "mw_templatet_download",
        mw_template_create = "mw_template_create",
        mw_project_path_failed = "mw_project_path_failed",
        mw_project_restoring_popover = "mw_project_restoring_popover",
        mw_project_restoring_backup = "mw_project_restoring_backup",
        mw_requesting_resource = "mw_requesting_resource",
        mw_template_unzipping = "mw_template_unzipping",
        mw_validating_level_file = "mw_validating_level_file",
        mw_verification_download = "mw_verification_download",
        mw_verification_download_failed = "mw_verification_download_failed",
        mw_initializing_scene = "mw_initializing_scene",
        mw_requesting_resource_failed = "mw_requesting_resource_failed",
        mw_editor_process_start = "mw_editor_process_start",
        mw_home_open = "mw_home_open",
        mw_editor_performance = "mw_editor_performance",
        mw_modelingtool_union_use = "mw_modelingtool_union_use",
        mw_modelingtool_negate_use = "mw_modelingtool_negate_use",
        mw_modelingtool_separate_use = "mw_modelingtool_separate_use",
        mw_projectcontent_model_import_editor = "mw_projectcontent_model_import_editor",
        mw_projectcontent_model_import = "mw_projectcontent_model_import",
        mw_fusionmodel_editor_import = "mw_fusionmodel_editor_import",
        mw_maineditor_objectmanager_saveasalocalfile = "mw_maineditor_objectmanager_saveasalocalfile",
        mw_assets_amend = "mw_assets_amend",
        mw_score_popup_display = "mw_score_popup_display",
        mw_score_popup_close = "mw_score_popup_close",
        mw_score_popup_skip = "mw_score_popup_skip",
        mw_score_popup_nps_mark = "mw_score_popup_nps_mark",
        mw_score_popup_csat_mark = "mw_score_popup_csat_mark",
        mw_import_pathway = "mw_import_pathway",
        mw_import_hint_click = "mw_import_hint_click",
        mw_import_assetnum = "mw_import_assetnum",
        mw_import_result = "mw_import_result",
        mw_import_failure_reason = "mw_import_failure_reason",
        mw_import_collision = "mw_import_collision",
        mw_import_uv = "mw_import_uv",
        mw_import_lod = "mw_import_lod",
        mw_import_to_projects = "mw_import_to_projects",
        mw_toprojects_failure_reason = "mw_toprojects_failure_reason",
        mw_import_upload = "mw_import_upload",
        mw_ui_propertypanel_change = "mw_ui_propertypanel_change",
        mw_editor_propertypanel_change = "mw_editor_propertypanel_change",
        mw_materialpanel_open = "mw_materialpanel_open",
        mw_materialpanel_save = "mw_materialpanel_save",
        mw_materialpanel_save_as_custommaterial = "mw_materialpanel_save_as_custommaterial",
        mw_materialpanel_close = "mw_materialpanel_close",
        mw_project_load_vmware = "mw_project_load_vmware",
        mw_project_check_path = "mw_project_check_path",
        mw_project_script_compile = "mw_project_script_compile",
        mw_open_project_resource = "mw_open_project_resource",
        mw_open_project_initialization_scene = "mw_open_project_initialization_scene",
        mw_open_project_error = "mw_open_project_error",
        mw_primary_draw_mode_switch = "mw_primary_draw_mode_switch",
        mw_plugin_manager_open = "mw_plugin_manager_open",
        mw_plugin_manager_close = "mw_plugin_manager_close",
        mw_complie_click = "mw_complie_click",
        mw_resolution_add = "mw_resolution_add",
        mw_resolution_switch = "mw_resolution_switch",
        mw_log_port_check = "mw_log_port_check",
        mw_grid_value_change = "mw_grid_value_change",
        mw_scale_tool_switch = "mw_scale_tool_switch",
        mw_axis_mode_switch = "mw_axis_mode_switch",
        mw_center_pivot_mode_switch = "mw_center_pivot_mode_switch",
        mw_help_menu_click = "mw_help_menu_click",
        mw_publish_menu_click = "mw_publish_menu_click",
        mw_localization_close = "mw_localization_close"
    }
}

declare namespace mweditor {
    enum EditorAssetExhibition {
        /** 默认Icon */
        Default = 0,
        /** 世界根节点 */
        WorldRoot = 1,
        /** 对象根节点 */
        ObjectRoot = 2,
        /** 寻路区域根节点 */
        NavigationRoot = 3,
        /** 预加载根节点 */
        PreloadRoot = 4,
        /** 游戏功能对象 */
        GameObject = 5,
        /** 运动功能对象 */
        ActionObject = 6,
        /** 预制体根节点 */
        PrefabRoot = 7,
        /** 天空球 */
        SkyBox = 8,
        /** 光照 */
        SkyLight = 9,
        /** 雾 */
        Frog = 10,
        /** 后处理 */
        PostProcessing = 11,
        /** 摄像机 */
        Camera = 12,
        /** 角色 */
        Character = 13,
        /** 多足对象 */
        Json_ClothSK = 14,
        /** 静态模型 */
        StaticMesh = 15,
        /** UI对象 */
        UIActor = 16,
        /** 点光源 */
        PointLight = 17,
        /** 特效 */
        SpecialEffect = 18,
        /** 粒子发射器 */
        ParticleEmitter = 19,
        /** 音效 */
        SoundEffect = 20,
        /** 寻路区域 */
        NavigationVolume = 21,
        /** 动态寻路区域 */
        NaviModifierVolume = 22,
        /** 寻路链接 */
        NavLink = 23,
        /** 触发器 */
        Trigger = 24,
        /** 交互物 */
        InterActor = 25,
        /** 禁行区 */
        BlockingVolume = 26,
        /** 水体区域 */
        WaterVolume = 27,
        /** 世界UI */
        WorldUI = 28,
        /** 出生点 */
        SpawnPoint = 29,
        /** 热武器 */
        HotWeapon = 30,
        /** 空锚点 */
        Anchor = 31,
        /** 载具 */
        Vehicle = 32,
        /** 对象发射器 */
        ObjectLauncher = 33,
        /** 冲量对象 */
        PhysicalImpulse = 34,
        /** 运动器 */
        IntegratedMover = 35,
        /** 推进器 */
        PhysicsThruster = 36,
        /** 物理连接 */
        RigidConstraint = 37,
        /** IK锚点 */
        IKObj = 38,
        /** 力区域 */
        ForceVolume = 39,
        /** 样条线 */
        Spline = 40,
        /** 文件夹对象 */
        Folder = 41,
        /** 组合对象 */
        Group = 42,
        /** 合并对象 */
        Union = 43,
        /** 融合模型 */
        Combine = 44,
        /** 材质 */
        Material = 45,
        /************************************** UI_Icon *************************************/
        /** 容器 */
        UI_Canvas = 46,
        /** 按钮 */
        UI_Button = 47,
        /** 勾选框 */
        UI_Checkbox = 48,
        /** 下拉框 */
        UI_ColorPick = 49,
        /** 下拉框 */
        UI_Dropdown = 50,
        /** 序列帧 */
        UI_FlipBook = 51,
        /** 图片 */
        UI_Image = 52,
        /** 输入框 */
        UI_InputBox = 53,
        /** 摇杆 */
        UI_Joystick = 54,
        /** ListView */
        UI_ListView = 55,
        /** 加载图 */
        UI_LoadingIcon = 56,
        /** 遮罩按钮 */
        UI_MaskButton = 57,
        /** 进度条 */
        UI_ProgressBar = 58,
        /** 滚动框 */
        UI_ScrollBox = 59,
        /** 文本框 */
        UI_TextBlock = 60,
        /** TileView */
        UI_TileView = 61,
        /** 摇杆 */
        UI_TouchPad = 62,
        /** TreeView */
        UI_TreeView = 63
    }
    class AssetExhibitionInfo {
        assetType: EditorAssetExhibition;
        iconIndex: string;
        internationalStr: string;
        assetName: string;
        constructor(assetType: EditorAssetExhibition, iconIndex: string, internationalStr?: string, assetName?: string);
    }
    class EditorExhibitionManager {
        private static NaviCorrelationSet;
        private static EditorExhibitionMap;
        private static AssetToActorTypeMap;
        static IsNaviCorrelation(Asset: EditorAssetExhibition): boolean;
        static GetExhibitionInfo(Asset: EditorAssetExhibition): AssetExhibitionInfo;
        static GetExhibitionType(AssetType: string): EditorAssetExhibition;
        static GetObjectTypeEnum(inObj: any | any[]): EditorAssetExhibition;
        static originGameFuncObjectGuidList: Map<string, string>;
        static originGameUIClassList: Map<any, string>;
    }
}

/// <reference types="Core" />
declare namespace mweditor {
    /**
     * @description 移除/注销事务
     * @param InTransactionId 用于标识事务的Id
     */
    function RemoveTransactionCreator(InTransactionId: string): void;
    /**
     * @description 检测当前激活事务id， 判断该事务是否可以 Undo
     * @return true 若事务存在, 且可 Undo;
false 事务不存在或不可 Undo
     */
    function CanUndo(): boolean;
    /**
     * @description 检测当前激活事务id， 判断该事务是否可以 Redo
     * @return true 若事务存在, 且可 Redo;
false 事务不存在或不可 Redo
     */
    function CanRedo(): boolean;
    /**
     * @description 撤销上一个操作，如果bCanRedo为true，可以重做该操作
     * @param bCanRedo 是否可以重做该操作，默认值为true
     */
    function Undo(bCanRedo?: boolean): void;
    /**
    * @description  重做上一个事务
    * @remark 当前正在进行的事务结束后, 将执行"下一个"操作而不是"上一个"操作.
    */
    function Redo(): void;
    /**
     * @description  开始一个新的事件并将其添加到事务列表中
     * @param inObj  InObject  要修改的对象
     * @param Description Description 事务的说明
     */
    function BeginTransaction(inObj: any[], Description: string): void;
    /**
     * @description 结束当前事件并在撤销回复列表中完成它，如果事务成功，则禁用重做选项
     */
    function EndTransaction(): void;
    /**
     * @description 添加销毁标记
     */
    function MarkPendingKill(targetObj: mw.GameObject): void;
    /**
     * @description 清除销毁标记
     */
    function ClearPendingKill(targetObj: mw.GameObject): void;
}

declare namespace mweditor {
    class HttpRequestInfo {
        URL: string;
        tokenHeaderName: string;
        requestBody: string;
        headerMap: Map<string, string>;
    }
}

declare namespace mweditor {
    /**
     * @author haow.wu
     * @groups GUI
     * @description 输入组合键
     */
    enum ModifierKey {
        /** No key. */
        None = 0,
        /** Ctrl key (Command key on Mac, Control key on Windows). */
        Control = 1,
        /** Alt key. */
        Alt = 2,
        /** Shift key. */
        Shift = 4,
        /** Cmd key (Control key on Mac, Win key on Windows) */
        Command = 8
    }
    /**
     * @author hao.wu
     * @groups GUI
     * @description 输入按键
     * @networkStatus usage:客户端
     */
    class InputChord {
        /**
         * @description 默认构造
         * @effect 只在客户端调用生效
         */
        constructor(key: any, modifierKeys?: ModifierKey);
        key: string;
        bShift: boolean;
        bCtrl: boolean;
        bAlt: boolean;
        bCmd: boolean;
    }
}

/// <reference types="Extension" />
declare namespace mweditor {
    /**
     * @deprecated info:该接口已废弃，使用mw.ListViewItemDataBase替换
     */
    class ListViewItemDataBase extends mw.ListViewItemDataBase {
    }
    /**
     * @deprecated info:该接口已废弃，使用mw.TreeViewItemDataBase替换
     */
    class TreeViewItemDataBase extends mw.TreeViewItemDataBase {
    }
    class GuideData extends mw.TreeViewItemDataBase {
        /** 文件夹路径 */
        folderPath: string;
        /** 文件夹类型 */
        folderType: mweditor.LocalType;
        /** 是否为根目录 */
        bIsRootFolder: boolean;
    }
    class WorkData extends mw.ListViewItemDataBase {
        /** 资源地址 */
        assetPath: string;
        /** 资源guid */
        assetGuid: string;
        /** 资源类型 */
        assetType: mweditor.LocalType;
        get bIsCommonAsset(): Readonly<boolean>;
        get bIsGuidConflict(): Readonly<boolean>;
    }
    class CreateParam {
        /** 是否为复制创建 */
        isCopy: boolean;
        /** 原始文件路径 */
        sourceFile: string;
        /** 目标名称（不带扩展名），如果为空则使用默认 */
        targetName: string;
        /** 目标文件夹 */
        targetFolder: string;
        /** 资源类型 */
        assetType: mweditor.LocalType;
    }
    class LocalAssetImportInfo {
        /** 导入失败信息 */
        errorMessage: string;
        /** 导入资源类型 */
        assetType: mweditor.LocalType;
        /** 文件路径 */
        filePath: string;
        /** 资源GUID */
        targetGuid: string;
    }
    class LocalAssetState {
        /** 资源GUID */
        localGuid: string;
        /** 资源审核状态 */
        auditStatus: LocalAssetAuditStatus;
        remark: string;
        guid: string;
    }
    class LocalAssetDependencyInfo {
        assetGuid: string;
        assetName: string;
        assetType: string;
    }
    class LocalAssetDependencies {
        bQuerySucceed: boolean;
        message: string;
        referencingGuid: string;
        dependencies: LocalAssetDependencyInfo[];
    }
    class DependentAssetByLocalAsset {
        bInScene: boolean;
        referencingGuid: string;
        dependentGuid: string;
    }
    class LocalAssetPayLoad extends mw.DragDropPayLoad {
        lastDrag: any;
        assetData: any;
    }
    class AssetModifyParam {
        guid: string;
        oldPath: string;
        newPath: string;
        assetType: mweditor.LocalType;
    }
    enum LocalAssetAuditStatus {
        E_Local = 0,
        E_UnderReview = 1,
        E_ReviewFailed = 2,
        E_Approved = 3
    }
    enum LocalType {
        Script = 1,
        Prefab = 2,
        GameUI = 3,
        Character = 4,
        Material = 5,
        Model = 6,
        DataFile = 7,
        ImportAsset = 8,
        StaticMesh = 9,
        GameUITex = 10,
        SceneTex = 11,
        Audio = 12,
        AnimSequence = 13,
        ClothSkeletalMesh = 14
    }
    enum OperatorType {
        DeleteFolder = 1,
        DeleteScript = 2,
        DeletePrefabt = 3,
        DeleteGameUI = 4,
        DeleteCharacter = 5,
        DeleteMaterial = 6,
        DeleteModel = 7,
        DeleteLocalAsset = 8,
        DropScript = 9,
        SavePrefab = 10,
        ClosePrefab = 11,
        SwitchToScene = 12,
        DeleteDataFile = 13,
        RedirectToPrjectRoot = 14
    }
    enum MultSceneWindowMode {
        EAdd = 0,
        EReplace = 1,
        ESwitch = 2
    }
    enum FileCollectSpace {
        Project = 0,
        Common = 1
    }
    class ConflitingData extends mw.ListViewItemDataBase {
        /** 资源guid */
        assetGuid: string;
        /** 资源类型 */
        assetName: string;
        /** 资源地址 */
        assetPath: string;
    }
}

declare namespace mweditor {
    export enum TabOwner {
        /** 主编辑器 */
        MainEditor = "MainEditor",
        /** UI编辑器 */
        UIEditor = "UIEditor",
        /** 角色编辑器 */
        PlayerEditor = "PlayerEditor",
        /** 材质编辑器 */
        MaterialEditor = "MaterialEditor"
    }
    export enum ToolBarType {
        None = 0,
        Debug = 1,
        Build = 2,
        Plugin = 4,
        UI = 8,
        Material = 16,
        Character = 32,
        All = 255
    }
    export enum Orientation {
        /** 水平布局 */
        Horizontal = "Orient_Horizontal",
        /** 垂直布局 */
        Vertical = "Orient_Vertical"
    }
    export enum TabState {
        /** 打开选项卡 */
        OpenedTab = "OpenedTab",
        /** 关闭选项卡 */
        ClosedTab = "ClosedTab"
    }
    export enum WindowPlacement {
        Placement_NoWindow = "Placement_NoWindow",
        Placement_Automatic = "Placement_Automatic",
        Placement_Specified = "Placement_Specified"
    }
    class LayoutNode {
        /** 设置系数大小 */
        get sizeCoefficient(): number;
        constructor(value?: number);
    }
    export class Tab {
        /**选项卡ID */
        get tabId(): string;
        /**选项卡状态 */
        get tabState(): TabState;
        /**选项卡显示名称 */
        get tabDisplayName(): string;
        constructor(TabId: string, InTabState?: TabState, InTabDisplayName?: string);
    }
    export class Stack extends LayoutNode {
        /**是否隐藏选项卡 */
        get hideTabWell(): boolean;
        /**是否隐藏选项卡 */
        set hideTabWell(val: boolean);
        /**前景选项卡 */
        get foregroundTab(): string;
        /**前景选项卡 */
        set foregroundTab(val: string);
        /**选项卡集合 */
        get tabs(): Tab[];
        /**选项卡集合 */
        set tabs(val: Tab[]);
        constructor(value?: number, hideTabWell?: boolean, foregroundTab?: string);
    }
    export class Splitter extends LayoutNode {
        /**布局流向 */
        get orientation(): Orientation;
        /**布局流向 */
        set orientation(val: Orientation);
        /**子集 */
        get nodes(): LayoutNode[];
        /**子集 */
        set nodes(val: LayoutNode[]);
        constructor(value?: number);
    }
    export class Layout {
        /**布局名称 */
        get name(): string;
        /**布局名称 */
        set name(val: string);
        /**布局流向 */
        get orientation(): Orientation;
        /**布局流向 */
        set orientation(val: Orientation);
        /**子集 */
        get nodes(): LayoutNode[];
        /**子集 */
        set nodes(val: LayoutNode[]);
        constructor();
    }
}

declare namespace mweditor {
    enum TranscationContain {
        /** 新增操作 */
        NewOperator = 1,
        /** 包含自身序列化信息 */
        SelfSerialize = 2,
        /** 包含子项序列化信息 */
        ChildrenSerialize = 4,
        /** 包含父子层级及序列修改 */
        Sequence = 8,
        /** 包含预加载资源 */
        Preload = 16,
        /** 包含预制体资源 */
        Prefab = 32,
        /** 默认整体序列化操作 */
        Default = 14
    }
    enum TranscationOperator {
        /** 事务开始 */
        BeginTransaction = 0,
        /** 事务插入 */
        InsertTransaction = 1,
        /** 事务结束 */
        EndTransaction = 2,
        /** 事务取消 */
        CancelTransaction = 3
    }
}

declare namespace mweditor {
    enum EActiveGizmoType {
        /** 主视口 */
        MainViewport = 0,
        /** 预制体编辑视口 */
        PrefabViewport = 1
    }
    /** 选中事件来源 */
    enum ESelectOriginType {
        Gizmo = 0,
        Outliner = 1,
        Viewport = 2,
        Combine = 3,
        Unknown = 4,
        All = 5
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    enum CompletionState {
        /** 无 */
        None = 0,
        /** 警告 */
        Warning = 1,
        /** 成功 */
        Success = 2,
        /** 失败 */
        Fail = 3
    }
    enum WindowShowType {
        /** 普通窗口 */
        Normal = 0,
        /** 模态窗口 */
        Modal = 1,
        /** 置顶窗口 */
        Top = 2
    }
    enum WindowType {
        /** 普通窗口 */
        NormalWindow = 0,
        /** 主窗口 */
        MainWindow = 1,
        /** 角色编辑器 */
        PlayerWindow = 2,
        /** UI编辑器 */
        UIWindow = 3,
        /** 预制体 */
        PrefabWindow = 4,
        /** 材质编辑器 */
        MaterialWindow = 5,
        /** 资源公开审核编辑器 */
        ResourceDisclosureWindow = 6,
        /** 插件窗口 */
        PluginEditor = 7
    }
    enum PluginWindowStatus {
        /** 最大化 */
        Maximize = 0,
        /** 最小化 */
        Minimize = 1,
        /** 窗口化 */
        Restore = 2,
        /** 关闭 */
        Close = 3
    }
    class CombinationParam {
        IsSplitter?: boolean;
        Orientation?: mw.UILayoutType;
        SizeRatio?: number;
        UIPath?: string;
        Children?: CombinationParam[];
        UIID?: string;
        constructor({ IsSplitter, Orientation, SizeRatio, UIPath, UIID, Children }: {
            IsSplitter?: boolean;
            Orientation?: mw.UILayoutType;
            SizeRatio?: number;
            UIPath?: string;
            UIID?: any;
            Children?: CombinationParam[];
        });
    }
    interface WindowInfo {
        /** @description 窗口展示类型 */
        showType?: WindowShowType;
        /** @description 是否全屏 */
        IsFixSize?: boolean;
        /** @description 窗口大小 */
        windowSize?: mw.Vector2;
        /** @description 创建默认标题栏 */
        bCreateTitleBar?: boolean;
        /** @description 标题信息 */
        titleStr?: string;
        /** @description 是否在标题栏中含有最大最小按钮 */
        bIsMaximizeAndMinimizeBtn?: boolean;
        /** @description 标题高度 */
        titleHeight?: number;
    }
    enum WindowTitleStyleType {
        NoramlTitle = 0,
        SecondaryTitle = 1
    }
    /** 定义窗口尺寸规则的枚举 */
    enum SizingRule {
        /** 窗口尺寸固定，无法调整大小 */
        FixedSize = 0,
        /** 窗口尺寸根据其内容自动计算，用户不能调整大小 */
        Autosized = 1,
        /** 窗口允许用户自行调整大小 */
        UserSized = 2
    }
    enum HorizontalAlignment {
        HAlign_Fill = 0,
        HAlign_Left = 1,
        HAlign_Center = 2,
        HAlign_Right = 3
    }
}

/// <reference types="Extension" />
/// <reference types="engine" />
declare namespace mweditor {
    // @ts-ignore
    import UE from "ue";
    class ProperChangeInfo {
        constructor(path: string, visible: boolean, readOnly: boolean, bFreshDisplayName: boolean, bFreshLevelID: boolean, bResetDefaultValue: boolean, DisplayName: string, ToolTip: string, LevelID: number);
        /** 属性路径 A.b.c */
        private propertyPath;
        /** 属性是否显示 */
        private bVisible;
        /** 属性是否只读 */
        private bReadOnly;
        /** 属性默认值是否重置 */
        private bResetDefaultValue;
        private bFreshDisplayName;
        private bFreshLevelID;
        private DisplayName;
        private ToolTip;
        private LevelID;
        /** 属性路径 A.b.c */
        get path(): string;
        /** 属性是否显示 */
        get visible(): boolean;
        /** 属性是否只读 */
        get readonly(): boolean;
        /** 属性是否重置默认值 */
        get resetDefaultValue(): boolean;
        /** 属性是否修改显示名称 */
        get freshDisplayName(): boolean;
        /** 属性是否修改排序ID */
        get freshLevelID(): boolean;
        /** 新的显示名称 */
        get displayName(): string;
        /** 新的悬浮tip */
        get toolTip(): string;
        /** 新的ID */
        get levelID(): number;
    }
    class ScriptComponentData {
        constructor(name: string, id: string, unSerializeStr: string);
        private assetName;
        private assetId;
        private unSerializeStr;
        get name(): Readonly<string>;
        get id(): Readonly<string>;
        get serializeStr(): Readonly<string>;
        ToString(): string;
        static FromString(str: string): ScriptComponentData;
    }
    enum EPropertyType {
        default = 0,
        tipsError = 1,
        UIConstraintGraph = 2,
        category = 3,
        array = 4,
        boolean = 5,
        enum = 6,
        number = 7,
        string = 8,
        rotation = 9,
        quaternion = 10,
        vector2 = 11,
        vector = 12,
        vector4 = 13,
        transform = 14,
        mwTransform = 15,
        transformItem = 16,
        mwUITransform = 17,
        mwInnerTransform = 18,
        linearColor = 19,
        margin = 20,
        uiScriptInfo = 21,
        brush = 22,
        staticMesh = 23,
        objectPtr = 24,
        materials = 25,
        multiPassMaterial = 26,
        asset = 27,
        CurveColorArray = 28,
        script = 29,
        otherStruct = 30
    }
    /**
     * @author jianke.feng
     * @description  属性Meta标识符，Meta标识符+类型
     * @effect  按规则自动解析，未识别类型默认解析为str
    */
    enum EMetaIdentifier {
        /** 显示名称 */
        DisplayName_Str = 0,
        /** 自定义默认值 fun */
        GetDefaultFunc_Fun = 1,
        /** 序列化名称 */
        SerializationName_Str = 2,
        /** 序列化路径 */
        SerializationPath_Str = 3,
        /**  結構體直接顯示內部屬性 */
        ShowOnlyInnerProperties_Boolean = 4,
        /** 配合获取脚本资源的Guid */
        GetScriptAssetId_Fun = 5,
        /**  锁定数组 */
        PropertyArrayLock_Boolean = 6,
        /** 只可读 */
        Readonly_Boolean = 7,
        /** 是否显示 */
        Visible_Boolean = 8,
        /** 分组 */
        Category_Str = 9,
        /** 悬浮提示信息 */
        ToolTip_Str = 10,
        /** 属性位置 */
        LevelID_Number = 11,
        /** 是否高级属性 */
        Advanced_Boolean = 12,
        /** 资源是否支持清空 */
        ClearAsset_Boolean = 13,
        /** 精度 */
        Accuracy_Number = 14,
        /** (number)最小值 */
        ClampMin_Number = 15,
        /** (number)最大值 */
        ClampMax_Number = 16,
        /** (x=,y=,z=...)向量单一轴向上最小值 */
        ClampAxialSelfMin_Str = 17,
        /** (x=,y=,z=...)向量单一轴向上最大值 */
        ClampAxialSelfMax_Str = 18,
        /** (number)是否为进度条滑块表现形式 */
        Slider_Boolean = 19,
        /** 数组成员自定义名称 fun 默认参数:  序号  返回值: string*/
        CustomArrayItemName_Fun = 20,
        /** 数组成员自定义默认值 fun 默认参数:  序号  返回值: string*/
        CustomArrayItemDefaultValue_Fun = 21,
        /** 结构体成员自定义名称 fun  默认参数: 成员名称  返回值: string */
        CustomStructItemName_Fun = 22,
        /** 数组下结构体成员自定义名称fun  默认参数: 数组index ,成员名称   返回值: bool*/
        CustomStructItemVisibleInArray_Fun = 23,
        /** 结构体成员自定义Tips fun  默认参数: 成员名称  返回值: string*/
        CustomStructItemTips_Fun = 24,
        /** 允许设置的资源类型 */
        AllowedAssetType_Str = 25,
        /** 资源指针-吸管 */
        CaptureProperty_Boolean = 26,
        /** 绑定另一变量，控制自身是否可编辑 */
        EditCondition_Str = 27,
        /** Enum  使用字符串读写值*/
        EnumUseName_Boolean = 28,
        /** 预览功能， fun ，默认参数 bool: Playe | Pause*/
        PreviewEffectFunc_Fun = 29,
        /** 获取预览功能状态， fun ，无参数，返回bool*/
        GetPreviewState_Fun = 30,
        /** 重置按钮可见性 */
        RestoreVisible_Boolean = 31,
        /** 检测资源是否有效  fun  默认参数: 资源ID  返回值: boolean  */
        CheckAssetIsValid_Fun = 32,
        /** 标记该属性是不是基础属性，是哪一个(名称、ID、网络状态、tag) */
        BaseProperty_Str = 33,
        /** 显隐和材质的切换绑定，材质颜色动态显隐专用 */
        VisibleBindMaterialChange_Boolean = 34,
        /** 通知MultiPassM材质移除插槽, 默认参数: void  返回值: void*/
        ClearMultiPassMatsFun_Fun = 35
    }
    enum EMultiPassFit {
        MP_Fit = 0,
        MP_VariableNotFit = 1,
        MP_MainPassNotFit1 = 2,
        MP_MultiPassNotFit1 = 4
    }
    /**
     * @description 根据字符串解析为相应的 Vector 方法, 字符串格式(Pitch=0.000000,Yaw=0.000000,Roll=0.000000)
     * @param str 代表向量数据的字符串
     * @param outRotation 返回的解析结果， 无参数传入时，默认解析为 vector2
     * @returns 返回的解析结果，默认返回 (0,0)
    */
    function ParseRotationString(str: string, outRotation: mw.Rotation): mw.Rotation;
    /**
     * @description 根据字符串解析为相应的 Vector 方法, 字符串格式(X=1,Y=1,Z=1,W=1)
     * @param str 代表向量数据的字符串
     * @param outVector 返回的解析结果， 无参数传入时，默认解析为 vector2
     * @returns 返回的解析结果，默认返回 (0,0)
    */
    function ParseVectorString(str: string, outVector: mw.Vector2 | mw.Vector | mw.Vector4): mw.Vector2 | mw.Vector | mw.Vector4;
    /**
      * @description 根据字符串解析为相应的 Vector 方法, 字符串格式(R=1,G=1,B=1,A=1)
      * @param str 代表向量数据的字符串
      * @param outColor 返回的解析结果
      * @returns 返回的解析结果，默认返回 (0,0)
     */
    function ParseLinearColorString(str: string, outColor: mw.LinearColor): mw.LinearColor;
    function ParsesSysValueFromString(inValue: string, inType: EPropertyType): any;
    function ParsesSysValueToString(inValue: any): string;
    function GetAssetDisplayName(assetID: string): string;
    function CheckIsMatFitForMultiPass(obj: any, assetId: string): void;
    /**
     * @description         解析获取Obj上的资源属性的Guid
     * @effect              调用生效
     * @param inObj         usage:属性Owner
     * @param objAssetInfo  usage:属性的Info
     * @returns             返回的资源信息
     */
    function getAssetPropertyGuid(inObj: any | any[], getterName: string, assetOriginalType: UE.EMWTSPropertyType): string;
}

/// <reference types="Extension" />
/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    enum EComponentType {
        None = 0,
        UIWidgetBase = 1,
        ScriptComponent = 2,
        GameObjectComponent = 3,
        CustomPropertiesComponent = 4
    }
    /**
     * @description 属性面板 TreeView ItemData基类
     */
    class PropertyDataBase extends mw.TreeViewItemDataBase {
        constructor();
        /** 排序位置 */
        propertyIndex: number;
        /** 临时显隐，用于搜索等临时显隐操作，优先级最高 */
        bPreVisible: boolean;
        /** 获取是否可见 */
        get visible(): boolean;
        /** 设置是否可见 */
        set visible(bVisible: boolean);
        /** 获取是否只读 */
        get readOnly(): boolean;
        /** 设置是否只读 */
        set readOnly(bReadOnly: boolean);
        /** 设置悬浮提示 */
        set toolTip(newTips: string);
        /** 获取悬浮提示 */
        get toolTip(): string;
        /** 属性类型 */
        propertyType: mweditor.EPropertyType;
        private DataPath;
        addChild(inData: PropertyDataBase): void;
        /** 如果是自定义属性则移除自身，并返回true*/
        removeCustomProperty(): boolean;
        getPropertyPureName(): string;
        set displayName(newName: string);
        get displayName(): string;
        getDataPath(): string;
        freshDataPath(): string;
        /**
         * @description 拷贝节点自身
         * @return      节点自身的拷贝
         */
        copy(): PropertyDataBase;
    }
    /**
     * @description 具体属性的通用Data类
     */
    class PropertyData extends PropertyDataBase {
        constructor();
        /** 属性所属对象 */
        propertyOwners: any[];
        /** 属性信息 */
        property: mweditor.ObjPropertyInfo;
        /**
         * @description 拷贝节点自身,但属性信息与属性所属对象依然引用同样的对象
         * @return      节点自身的拷贝
         */
        copy(): PropertyDataBase;
    }
    /**
     * @description 具体属性的通用Data类
     */
    class StringPropertyData extends PropertyData {
        constructor();
        /**
        * @description 拷贝节点自身,但属性信息与属性所属对象依然引用同样的对象
        * @return      节点自身的拷贝
        */
        copy(): StringPropertyData;
    }
    /**
     * @description 具体属性的通用Data类
     */
    class NumberPropertyData extends PropertyData {
        constructor();
        /**
         * @description 拷贝节点自身,但属性信息与属性所属对象依然引用同样的对象
         * @return      节点自身的拷贝
         */
        copy(): NumberPropertyData;
    }
    /**
     * @description 具体属性的通用Data类
     */
    class BooleanPropertyData extends PropertyData {
        constructor();
        /**
         * @description 拷贝节点自身,但属性信息与属性所属对象依然引用同样的对象
         * @return      节点自身的拷贝
         */
        copy(): BooleanPropertyData;
    }
    /**
     * @description 具体属性的通用Data类
     */
    class EnumPropertyData extends PropertyData {
        constructor();
        /**
         * @description 拷贝节点自身,但属性信息与属性所属对象依然引用同样的对象
         * @return      节点自身的拷贝
         */
        copy(): EnumPropertyData;
    }
    /**
     * @description VectorData类
     */
    class VectorPropertyData extends PropertyData {
        constructor();
        XProperty: NumberPropertyData;
        YProperty: NumberPropertyData;
        ZProperty: NumberPropertyData;
        WProperty: NumberPropertyData;
        copy(): VectorPropertyData;
    }
    /**
     * @description rotationData类
     */
    class RotationPropertyData extends PropertyData {
        constructor();
        PitchProperty: NumberPropertyData;
        YawProperty: NumberPropertyData;
        RollProperty: NumberPropertyData;
        copy(): RotationPropertyData;
    }
    /**
     * @description 基础属性区域的组合Data(名称/id/网络状态/tag)
     */
    class BasePropertyData extends PropertyData {
        constructor();
        NameProperty: StringPropertyData;
        IDProperty: StringPropertyData;
        NetProperty: EnumPropertyData;
        TagProperty: StringPropertyData;
        setBaseProperty(baseName: string, inData: PropertyData): boolean;
        /**
         * @description 拷贝节点自身,但属性信息与属性所属对象依然引用同样的对象
         * @return      节点自身的拷贝
         */
        copy(): BasePropertyData;
    }
    class TransformItemPropertyData extends PropertyData {
        constructor();
        selectedOptionIndex: number;
        optionsKeys: string[];
        option: string;
        toolTipKey: string;
        getOptionByIndex(index: number): string;
        options: string[];
        worldPropertyData: VectorPropertyData;
        localPropertyData: VectorPropertyData;
        copy(): TransformItemPropertyData;
    }
    /**
     * @description rotationData类
     */
    class TransformPropertyData extends PropertyData {
        constructor();
        PositionData: TransformItemPropertyData;
        RotationData: TransformItemPropertyData;
        ScaleData: TransformItemPropertyData;
        EulerRotationData: TransformItemPropertyData;
        copy(): TransformPropertyData;
    }
    class LinearColorPropertyData extends PropertyData {
        constructor();
        onColorPickValueChanged: mw.MulticastDelegate<(value: mw.LinearColor, hexValue: string) => void>;
        onColorPickConfirm: mw.MulticastDelegate<(startColor: mw.LinearColor, EndColor: mw.LinearColor) => void>;
        private ColorPickCallBack;
        copy(): LinearColorPropertyData;
    }
    class ColorGradientPropertyData extends PropertyData {
        constructor();
        onColorPointChange: mw.MulticastDelegate<(colorPointArr: mw.colorSequencePoint[]) => void>;
        copy(): ColorGradientPropertyData;
    }
    /**
     * @description marginData类
     */
    class MarginPropertyData extends PropertyData {
        constructor();
        private isWidgetExpand;
        get isExpand(): Readonly<boolean>;
        set isExpand(newValue: boolean);
        getExpectRowHeight(): number;
        copy(): MarginPropertyData;
    }
    class UIScriptPropertyData extends PropertyData {
        constructor();
        PathProperty: StringPropertyData;
        GuidProperty: StringPropertyData;
        copy(): UIScriptPropertyData;
    }
    /**
     * @description 分组栏Data类
     */
    class CategoryData extends PropertyDataBase {
        constructor();
        /** 是否展开分组 */
        expansion: boolean;
        /** 分组名称 */
        categoryName: string;
        /** 组件开头 */
        componentOwners: any[];
        bComponentHead: boolean;
        ComponentGuid: string;
        componentType: EComponentType;
        /**
         * @description 拷贝节点自身,不含子节点
         * @return      节点自身的拷贝
         */
        copy(): CategoryData;
        clearCustomProperty(): boolean;
        registerCustomPropertyValue(propertyName: string, type: string, value: any): boolean;
    }
    /**
     * @description 结构体分组栏
     */
    class StructCategoryData extends CategoryData {
        constructor();
        /** 属性所属对象 */
        propertyOwners: any[];
        /** 属性信息 */
        property: mweditor.ObjPropertyInfo;
        /**
        * @description 拷贝节点自身,但属性信息与属性所属对象依然引用同样的对象
        * @return      节点自身的拷贝
        */
        copy(): StructCategoryData;
    }
    class TArrayCategoryData extends CategoryData {
        constructor();
        /** 属性所属对象 */
        propertyOwners: any[];
        /** 属性信息 */
        property: mweditor.ObjPropertyInfo;
        tempChild: PropertyDataBase;
        private defaultAddValue;
        /**
         * @description 拷贝节点自身,但属性信息与属性所属对象依然引用同样的对象
         * @return      节点自身的拷贝
         */
        copy(): TArrayCategoryData;
        get arraylength(): number;
        /**
         *
         * @returns 初步判断数组的内容是否有变化，长度变化需要刷新属性面板
         */
        bArrayNumChange(): boolean;
        RemoveItem(index: number, keyPath?: string): void;
        ADD(): void;
        private Insert;
    }
    /**
     * @description MaterialsPropertyData类
     */
    class MaterialsPropertyData extends PropertyData {
        constructor();
        selectedMaterialIndex: number;
        get selectedIndex(): Readonly<number>;
        set selectedIndex(index: number);
        copy(): MaterialsPropertyData;
    }
    /**
     * @description MaterialsPropertyData类
     */
    class MultiPassMaterialPropertyData extends PropertyData {
        constructor();
        warnTipsKey: string;
        ClearPass(): boolean;
        /**
        * @description 拷贝节点自身,但属性信息与属性所属对象依然引用同样的对象
        * @return      节点自身的拷贝
        */
        copy(): MultiPassMaterialPropertyData;
    }
    /**
     * @description TipsErrorPropertyData类, 警告提示，单独占用一行，有绑定的目标属性控制显示和警告内容
     */
    class TipsErrorPropertyData extends PropertyData {
        constructor();
        BindData: PropertyDataBase;
        TipsKey: string;
        get bTipsVisible(): boolean;
        customRowHeight: number;
        propertyContentHeight: number;
        copy(): TipsErrorPropertyData;
    }
    /**
     * @description UIConstraintGraphPropertyData 类,
     */
    class UIConstraintGraphPropertyData extends PropertyData {
        constructor();
        HorizontalData: EnumPropertyData;
        VerticalData: EnumPropertyData;
        copy(): UIConstraintGraphPropertyData;
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    enum PropertySourceType {
        /** 默认类型,一般指引擎对象自身的属性*/
        Default = 0,
        /** 脚本属性，一般指脚本组件的自定义属性 */
        ScriptProperty = 1,
        /** 自定义属性， 一般指对象通过方法创建的自定义属性*/
        CustomProperty = 2,
        /** TS对象属性， 一般指代码运行过程中，创建的各类TS对象自身的属性*/
        TypeScriptProperty = 3
    }
    /**
     * @author jianke.feng
     * @description  属性Meta标识符解析Pairs
     */
    class MetaIdentifierPair {
        private metaIdentifier;
        private metaType;
        constructor(identifier: string, type: string);
        get identifier(): Readonly<string>;
        get type(): Readonly<string>;
    }
    /**
     * @author jianke.feng
     * @description  属性信息Base
     * @effect
     */
    class PropertyInfoBase {
        constructor();
        name: string;
        completePath: string;
        metaData: Map<mweditor.EMetaIdentifier, any>;
        parent: PropertyInfoBase;
        children: PropertyInfoBase[];
        arrayIndex: number;
        propertySourceType: PropertySourceType;
        DynamicTsObj: Object;
    }
    /**
    * @author jianke.feng
    * @description  属性信息
    * @effect
    */
    class ObjPropertyInfo extends PropertyInfoBase {
        private static IdentifierPairs;
        /**
         * @description Meta标识符解析Map
         * @effect key : 属性Meta标识符枚举值, Value :string[meta,type];
         */
        static get metaIdentifierPairsMap(): Readonly<Map<mweditor.EMetaIdentifier, MetaIdentifierPair>>;
        constructor(funGetter: PropertyDescriptor, funSetter: PropertyDescriptor);
        private funGetter;
        private funSetter;
        get PropertyCompletePath(): string;
        private getValueByGetterFun;
        private getValueByPropertyName;
        private getCurDefaultValue;
        private getDefaultValueByObj;
        private setValueBySetterFun;
        private setValueByPropertyName;
        /*****************************************  开放出去的方法  ***************************************************************/
        getDefaultValue(inObj: any): any;
        getValue(obj: any): any;
        setValue(obj: any, inValue: any, inPropertyPath?: string): void;
    }
    /**
     * @author jianke.feng
     * @description  属性信息
     * @effect
     */
    class ObjBoolPropertyInfo extends ObjPropertyInfo {
        constructor(funGetter: PropertyDescriptor, funSetter: PropertyDescriptor);
        getValue(obj: any): any;
        setValue(obj: any, inValue: any): void;
    }
    class ObjColorGradientPropertyInfo extends ObjPropertyInfo {
        constructor(funGetter: PropertyDescriptor, funSetter: PropertyDescriptor);
        getValue(obj: any): Array<mw.colorSequencePoint>;
        setValue(obj: any, inValue: Array<mw.colorSequencePoint> | any): void;
        ColorGradientValue: Array<mw.colorSequencePoint>;
    }
    /**
     * @author jianke.feng
     * @description  属性信息
     * @effect
     */
    class ObjEnumPropertyInfo extends ObjPropertyInfo {
        constructor(funGetter: PropertyDescriptor, funSetter: PropertyDescriptor);
        getValue(obj: any): any;
        setValue(obj: any, inValue: any): void;
        enumValueStr: Map<string, string>;
    }
    /**
     * @author jianke.feng
     * @description  Vector属性信息
     * @effect
     */
    class ObjVectorPropertyInfo extends ObjPropertyInfo {
        constructor(funGetter: PropertyDescriptor, funSetter: PropertyDescriptor);
        getValue(obj: any): mw.Vector2 | mw.Vector | mw.Vector4;
        setValue(obj: any, inValue: mw.Vector2 | mw.Vector | mw.Vector4): void;
    }
    /**
     * @author jianke.feng
     * @description  Rotation欧拉角属性信息
     * @effect
     */
    class ObjRotationPropertyInfo extends ObjPropertyInfo {
        constructor(funGetter: PropertyDescriptor, funSetter: PropertyDescriptor);
        getValue(obj: any): mw.Rotation;
        setValue(obj: any, inValue: mw.Rotation): void;
    }
    /**
     * @author jianke.feng
     * @description  LinearColor 线性颜色属性信息
     * @effect
     */
    class ObjLinearColorPropertyInfo extends ObjPropertyInfo {
        constructor(funGetter: PropertyDescriptor, funSetter: PropertyDescriptor);
        getValue(obj: any): mw.LinearColor;
        setValue(obj: any, inValue: mw.LinearColor | any): void;
        getDefaultValue(obj: any): mw.LinearColor;
        getValueAsHex(obj: any): string;
    }
    /**
     * @author jianke.feng
     * @description  Margin 边距属性信息
     * @effect
     */
    class MarginPropertyInfo extends ObjPropertyInfo {
        constructor(funGetter: PropertyDescriptor, funSetter: PropertyDescriptor);
        getValue(obj: AnalyserOptions): mw.Margin;
        setValue(obj: AnalyserNode, inValue: mw.Margin | any): void;
    }
    /**
     * @author jianke.feng
     * @description  Materials 材质资源属性信息
     * @effect
     */
    class objMaterialsPropertyInfo extends ObjPropertyInfo {
        constructor();
        getAssetGuid(obj: any): string[];
        getValue(obj: any, inGuid?: string): mweditor.AssetManager_OnlineAssetInfo[];
        setMaterialInst(obj: any, index: number, inAssetGUID: string): void;
    }
    /**
     * @author jianke.feng
     * @description  MultiPassMaterial 多Pass材质资源属性信息
     * @effect
     */
    class objMultiPassMaterialPropertyInfo extends ObjPropertyInfo {
        constructor(funGetter: PropertyDescriptor, funSetter: PropertyDescriptor);
        getValue(obj: any): any;
        setValue(obj: any, inValue: any, inPropertyPath?: string): void;
    }
}

/// <reference types="Extension" />
declare namespace mweditor {
    /**
     * @description 材质面板 TreeView ItemData基类
     */
    class MaterialDetailData extends mweditor.TreeViewItemDataBase {
        constructor();
        /** 排序位置 */
        propertyIndex: number;
        /** 是否可见 */
        isVisible: boolean;
        /** 是否为高级属性 */
        isAdvance: boolean;
        /** 属性类型 */
        propertyType: mweditor.EPropertyType;
        /** 属性名称 */
        propertyName: string;
        private DataPath;
        addChild(inData: MaterialDetailData): void;
    }
    /**
    * @description 具体属性的通用Data类
    */
    class MaterialPropertyData extends MaterialDetailData {
        constructor();
        /** 属性所属对象 */
        propertyOwners: any[];
        /** 属性信息 */
        property: any;
    }
    /**
     * @description 分组栏Data类
     */
    class MaterialCategoryData extends MaterialDetailData {
        constructor();
        /** 是否展开分组 */
        expansion: boolean;
        /** 分组名称 */
        categoryName: string;
    }
    /**
     * @description 具体属性的通用Data类
     */
    class MaterialNumberPropertyData extends MaterialPropertyData {
        constructor();
    }
    /**
     * @description 具体属性的通用Data类
     */
    class MaterialBooleanPropertyData extends MaterialPropertyData {
        constructor();
    }
    /**
    * @description 具体属性的通用Data类
    */
    class MaterialEnumPropertyData extends MaterialPropertyData {
        constructor();
    }
    class MaterialLinearColorPropertyData extends MaterialPropertyData {
        constructor();
        onColorPickValueChanged: mw.MulticastDelegate<(value: mw.LinearColor, hexValue: string) => void>;
        onColorPickConfirm: mw.MulticastDelegate<(startColor: mw.LinearColor, EndColor: mw.LinearColor) => void>;
    }
    /**
     * @description AssetPropertyData类
     */
    class MaterialAssetPropertyData extends MaterialPropertyData {
        constructor();
    }
    /**
     * @description UVPropertyData类
     */
    class MaterialUVPropertyData extends MaterialPropertyData {
        constructor();
        PitchProperty: MaterialNumberPropertyData;
        YawProperty: MaterialNumberPropertyData;
        RollProperty: MaterialNumberPropertyData;
    }
}

/// <reference types="Extension" />
/// <reference types="Extension" />
declare namespace mweditor {
    class ViewportUI extends mw.Widget {
        constructor(InViewTsBase?: mweditor.ViewPort);
        get View(): mweditor.ViewPort;
        get onCreateViewEvent(): mw.Delegate<(ViewBase: mweditor.ViewPort) => void>;
    }
}

/// <reference types="Extension" />
/// <reference types="Core" />
declare namespace mweditor {
    interface DrawInfo {
        /** @description 绘制颜色 */
        lineColor?: mw.LinearColor;
        /** @description 持续时间 */
        duration?: number;
        /** @description 绘制线粗细 */
        thickness?: number;
    }
    interface DrawTextInfo {
        /** @description 绘制颜色 */
        lineColor?: mw.LinearColor;
        /** @description 持续时间 */
        duration?: number;
        /** @description 字体大小 */
        fontScale?: number;
    }
    class ScreenResult {
        /**
         * @description 视口世界坐标
         */
        worldPosition: mw.Vector;
        /**
         * @description 视口世界方向向量
         */
        worldDirection: mw.Vector;
    }
    class ViewPortDelegate<T extends (...arg: unknown[]) => boolean> {
        /**
         * @description 绑定代理函数
         * @param func usage: 绑定的函数 default
         * @effect 调用端生效
         */
        add(func: T): void;
        /**
         * @description 删除绑定代理函数
         * @param func usage: 删除绑定的函数 default
         * @effect 调用端生效
         */
        remove(func: T): void;
        /**
         * @description 广播通知代理函数
         * @effect 调用端生效
         * @param arg usage: 参数
         */
        broadcast(...arg: Parameters<T>): boolean;
    }
    class ViewPort {
        /**
         * @deprecated 实验接口，谨慎使用
         * 获取所有视口
         */
        static getAllViewports(): ViewPort[];
        /** 视口创建 */
        static onViewportCreate(): mw.MulticastDelegate<(View: ViewPort) => void>;
        /**
        * @deprecated 实验接口，谨慎使用
        * 视口选中管理器
        */
        get gizmo(): mweditor.ViewportGizmo;
        /**
         * 屏幕坐标转化视口坐标
         * @param viewportPosition 屏幕坐标
         * @returns 为undefined则为获取失败
         */
        deprojectViewportPositionToWorldPosition(viewportPosition: mw.Vector2): ScreenResult;
        /**视口鼠标移动事件 */
        get onMouseMove(): ViewPortDelegate<(MousePos: mw.Vector2) => boolean>;
        /**鼠标移动进视口 */
        get onMouseIn(): mw.MulticastDelegate<(MousePos: mw.Vector2) => void>;
        /**鼠标移动出视口 */
        get onMouseOut(): mw.MulticastDelegate<(MousePos: mw.Vector2) => void>;
        /**鼠标在视口点击事件 */
        get onMouseDown(): ViewPortDelegate<(MousePos: mw.Vector2, Key: mw.Keys) => boolean>;
        /**鼠标在视口抬起事件 */
        get onMouseUp(): ViewPortDelegate<(MousePos: mw.Vector2, Key: mw.Keys) => boolean>;
        /**按键响应事件 */
        get onViewKey(): ViewPortDelegate<(Key: mw.Keys, isPressed: boolean) => boolean>;
        /**
         * 判断某个按键是否按下
         * @param Key 按键值
         * @returns 为true则为按下状态
         */
        getKeyStatus(Key: mw.Keys): boolean;
        /** 视口大小 */
        get viewsize(): mw.Vector2;
        /** 摄像机世界坐标 */
        get cameraWorldPosition(): mw.Vector;
        /** 摄像机世界坐标 */
        set cameraWorldPosition(InVal: mw.Vector);
        /** 摄像机世界旋转 */
        get cameraWorldRotation(): mw.Rotation;
        /** 摄像机世界旋转 */
        set cameraWorldRotation(InVal: mw.Rotation);
        /**
         * 获取视口的FOV
         */
        get cameraFov(): number;
        /**
         * 设置视口的FOV
         */
        set cameraFov(InFov: number);
        /** 主视口 */
        static get mainViewport(): ViewPort;
        /**
         * @deprecated 谨慎使用，将于后续版本弃用
         * 预制体视口
         */
        static get prefabViewport(): ViewPort;
        /**
         * @deprecated 谨慎使用，将于后续版本弃用
         * 当前视口是否是预制体视口
         */
        static get isEditPrefab(): boolean;
        /**
         * 创建模板场景
         * @returns 是否创建成功
         */
        createScene(): Promise<boolean>;
        /**
         * 拍照
         * @param path 保存本地路径
         * @param name 保存图片名称
         * @param showUI 是否展示UI
         * @param ScaleImage 图片缩放比例
         * @returns 是否拍摄成功
         */
        captureScene(path: string, name: string, showUI?: boolean, ScaleImage?: number): boolean;
        /**
         * 拍照带透明通道
         * @param Objects 需要拍照的对象组
         * @param path 保存本地路径
         * @param name 保存图片名称
         * @param saveSize 图片大小，如果没有填写则为相机视口大小
         * @returns
         */
        captureGameObjects(Objects: mw.GameObject[], path: string, name: string, saveSize?: mw.Vector2): Promise<boolean>;
        /**
         * @description 异步创建GameObject
         * @param assetId usage: 资源 id   <br>  range: 根据资源 ID 长度而定
         * @param spawnInfo usage: 构建物体的信息 <br>  default: 选填 <br> range: 字符串最大长度根据不同类型的资源 ID 长度决定。
         * @returns 构造的GameObject
         */
        asyncSpawnGameObject<T extends mw.GameObject>(assetId: string, spawnInfo?: mw.GameObjectInfo): Promise<T>;
        /**
         * @description 构造一个物体
         * @groups 基类/场景所有物体基类
         * @param assetId usage: 资源 id   <br>  range: 根据资源 ID 长度而定
         * @param spawnInfo usage: 构建物体的信息 <br>  default: 选填 <br> range: 字符串最大长度根据不同类型的资源 ID 长度决定。
         * @returns 构造的物体
         */
        spawnGameObject<T extends mw.GameObject>(assetId: string, spawnInfo?: mw.GameObjectInfo): T;
        /**
         * 查询创建GameObject
         * @param gameObjectId usage:物体的gameObjectId
         * @returns 对应的物体
         */
        findGameObjectById(gameObjectId: string): mw.GameObject;
        /**聚焦输入对象 */
        focusGameObjects(Objects: mw.GameObject[], bLockFocus?: boolean): void;
        /**获取所有创建GameObject */
        getAllGameObject(): mw.GameObject[];
        /**
         * 在视口中绘制方框
         * @param center 方框中心点位置
         * @param extent 中心点到顶点位置
         * @param drawInfo usage: 构建绘制信息
         * @param Rotation 旋转量
         */
        drawBox(center: mw.Vector, extent: mw.Vector, drawInfo: mweditor.DrawInfo, Rotation?: mw.Rotation): void;
        /**
         * 在视口中绘制线
         * @param LineStart 起始点位置
         * @param LineEnd 绘制终点位置
         * @param drawInfo usage: 构建绘制信息
         */
        drawLine(LineStart: mw.Vector, LineEnd: mw.Vector, drawInfo: mweditor.DrawInfo): void;
        /**
         * 在视口绘制文字
         * @param position 文本位置
         * @param Text 文本
         * @param drawInfo usage: 构建绘制信息
         */
        drawText(position: mw.Vector, Text: string, drawInfo: mweditor.DrawTextInfo): void;
        /** 清除绘制的图像 */
        clearDrawConent(): void;
    }
}

/// <reference types="Core" />
/// <reference types="Extension" />
declare namespace mweditor {
    /**
     * @deprecated 实验接口，谨慎使用
     * 视口Gizmo
     */
    class ViewportGizmo {
        /**
        * 选中对象
        */
        selectObject(target: mw.GameObject | mw.GameObject[]): void;
        /**
         * 取消选中对象
         */
        deselectObject(target: mw.GameObject | mw.GameObject[]): void;
        /**
         * 清空选中
         */
        clearSelectionObject(): void;
        /**
         * 获取当前所有选中对象
         */
        getSelectedObjects(): mw.GameObject[];
        /**
         * 新增选中时事件
         */
        get onAddSelect(): mw.MulticastDelegate<(ObjectGuid: string[], notifyType: mweditor.ESelectOriginType) => void>;
        /**
         * 取消选中时事件
         */
        get onDeselect(): mw.MulticastDelegate<(ObjectGuid: string[], notifyType: mweditor.ESelectOriginType) => void>;
        /**
         * 覆盖选中时事件
         */
        get onCoverSelect(): mw.MulticastDelegate<(ObjectGuid: string[], notifyType: mweditor.ESelectOriginType) => void>;
    }
}

declare namespace mweditor {
    class ViewportTab<T extends typeof mweditor.ViewPort> extends mweditor.Tab {
        /** 对象 */
        get viewport(): T;
        constructor(type: T, name: string, InTabDisplayName?: string);
    }
}
