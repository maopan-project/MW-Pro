declare namespace mw {
    /**
     * @author cheng.zeng
     * @groups 界面/控件/广告按钮
     * @description 广告按钮，请注意广告按钮不允许被遮挡
     * @description 需要在游戏中使用 onshow/onclose 才能播放广告
     * @description 当其上方有任何非隐藏/折叠的UI时，广告按钮将无法生效
     * @networkStatus usage:客户端
     */
    class AdsButton extends mw.Widget {
        /**
         * @description 创建 Button 控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect  只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default: null
         * @param inName usage:创建控件的名称 default:null range:无
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): AdsButton;
        /**
         * @description 同一按键同时只能操控一个UI控件，最新绑定的UI控件会覆盖之前的绑定；脚本中添加的绑定无法覆盖编辑器按键绑定菜单中绑定相同按键的UI控件，但当两个UI控件分别通过代码和菜单绑定到同一按键时，使用代码绑定的优先级更高
         * @groups 界面/控件/广告按钮
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         */
        addKey(key: mw.Keys): void;
        /**
         * @description  此操作只会解绑动态绑定的按键无法解除编辑器按键绑定菜单中绑定的按键
         * @groups 界面/控件/广告按钮
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         */
        removeKey(key: mw.Keys): void;
        /**
         * @description 获取当前UI控件绑定的所有键盘按键，包括编辑器按键绑定菜单和用代码绑定的按键
         * @groups 界面/控件/广告按钮
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         * @returns 返回当前控件绑定的按键,可能为空
         */
        getKeys(): mw.Keys[];
        /** *******************  文本内容 *****************************/
        /**
         * @description 获取按钮文字
         * @effect  只在客户端调用生效
         * @returns 返回文字
         */
        get text(): string;
        /**
         * @description 设置按钮文字
         * @effect  只在客户端调用生效
         * @param InString usage:文字
         * @returns 新文本
         */
        set text(InString: string);
        /**
         * @description 设置字体大小
         * @effect  只在客户端调用生效
         * @param FontSize usage:大小
         */
        set fontSize(FontSize: number);
        /**
         * @description 获取字体大小
         * @effect  只在客户端调用生效
         * @returns 字体大小
         */
        get fontSize(): number;
        /**
         * @description 设置字体间距
         * @effect  只在客户端调用生效
         * @param fontLetterSpace usage:间距
         */
        set fontLetterSpace(fontLetterSpace: number);
        /**
         * @description 获取字体间距
         * @effect  只在客户端调用生效
         * @returns 字体间距
         */
        get fontLetterSpace(): number;
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取默认字体
         * @effect  只在客户端调用生效
         * @returns 默认字体
         */
        get defaultFont(): mw.UIFontFamily | string;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置默认字体
         * @effect  只在客户端调用生效
         * @param inFont 需设置的默认字体
         */
        set defaultFont(inFont: mw.UIFontFamily | string);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取退却字体
         * @effect  只在客户端调用生效
         * @returns 退却字体
         */
        get fallbackFont(): mw.UIFontFamily | string;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置退却字体
         * @effect  只在客户端调用生效
         * @param inFont 需设置的退却字体
         */
        set fallbackFont(inFont: mw.UIFontFamily | string);
        /**
         * @description 设置字体字形
         * @effect  只在客户端调用生效
         * @param inGlyph usage:字体字形的类型
         */
        set glyph(inGlyph: mw.UIFontGlyph);
        /**
         * @description 获取字体字形
         * @effect  只在客户端调用生效
         * @returns 字体字形
         */
        get glyph(): mw.UIFontGlyph;
        /**
         * @description 设置是否开启字体删除线
         * @effect  只在客户端调用生效
         * @param inEnableStrikethrough usage:是否开启
         */
        set strikethroughEnable(inEnableStrikethrough: boolean);
        /**
         * @description 获取是否开启字体删除线
         * @effect  只在客户端调用生效
         * @returns 是否开启字体删除线
         */
        get strikethroughEnable(): boolean;
        /**
         * @description 设置是否开启字体下划线
         * @effect  只在客户端调用生效
         * @param inEnableUnderline usage:设置是否开启下划线
         */
        set underlineEnable(inEnableUnderline: boolean);
        /**
         * @description 返回是否开启字体下划线
         * @effect  只在客户端调用生效
         * @returns 获取是否开启字体下划线
         */
        get underlineEnable(): boolean;
        /**
         * @description 设置字体颜色
         * @effect  只在客户端调用生效
         * @param inColor usage:字体颜色，Type.LinearColor类型，数据范围0~1
         */
        set fontColor(inColor: mw.LinearColor);
        /**
         * @description 获取字体颜色
         * @effect  只在客户端调用生效
         * @returns 字体颜色，Type.LinearColor类型，数据范围0~1
         */
        get fontColor(): mw.LinearColor;
        /**
         * @description 设置字体阴影颜色
         * @effect  只在客户端调用生效
         * @param inShadowColor usage:输入的颜色，Type.LinearColor类型，数据范围0~1
         */
        set shadowColor(inShadowColor: mw.LinearColor);
        /**
         * @description 获取字体阴影颜色
         * @effect  只在客户端调用生效
         * @returns 字体阴影颜色，Type.LinearColor类型，数据范围0~1
         */
        get shadowColor(): mw.LinearColor;
        /**
         * @description 设置字体阴影偏移
         * @effect  只在客户端调用生效
         * @param inOffset usage:阴影偏移量
         */
        set shadowOffset(inOffset: mw.Vector2);
        /**
         * @description 获取字体阴影偏移
         * @effect  只在客户端调用生效
         * @returns 字体阴影偏移
         */
        get shadowOffset(): mw.Vector2;
        /**
         * @description 设置字体对齐方式
         * @effect  只在客户端调用生效
         * @param InTextJustify usage:对齐方式的枚举
         */
        set textAlign(InTextJustify: mw.TextJustify);
        /**
         * @description 获取字体对齐方式
         * @effect  只在客户端调用生效
         * @returns 字体对齐方式
         */
        get textAlign(): mw.TextJustify;
        /**
         * @description 设置字体垂直对齐方式
         * @effect  只在客户端调用生效
         * @param inTextVerticalJustify usage:对齐方式
         */
        set textVerticalAlign(inTextVerticalJustify: mw.TextVerticalJustify);
        /**
         * @description 获取字体垂直对齐方式
         * @effect  只在客户端调用生效
         * @returns 字体垂直对齐方式
         */
        get textVerticalAlign(): mw.TextVerticalJustify;
        /**
         * @description 设置字体描边颜色
         * @effect  只在客户端调用生效
         * @param inOutlineColor usage:描边颜色，Type.LinearColor类型，数据范围0~1
         */
        set outlineColor(inOutlineColor: mw.LinearColor);
        /**
         * @description 获取字体描边颜色
         * @effect  只在客户端调用生效
         * @returns 字体描边颜色，Type.LinearColor类型，数据范围0~1
         */
        get outlineColor(): mw.LinearColor;
        /**
          * @description 设置字体描边宽度
          * @effect  只在客户端调用生效
          * @param inOutlineSize usage:设置的大小
          */
        set outlineSize(inOutlineSize: number);
        /**
         * @description 获取字体描边宽度
         * @effect  只在客户端调用生效
         * @returns 字体描边宽度
         */
        get outlineSize(): number;
        /**
         * @description 获取字体是否自适应调整大小:boolean(为True时，文本内容字体大小将自动改变，尽可能大的充满整个文本框，而文本框大小不会变化)
         * @effect  只在客户端调用生效
         * @returns 字体是否自适应调整大小
         */
        get autoAdjust(): boolean;
        /**
         * @description 设置字体是否自适应调整大小:boolean(为True时，文本内容字体大小将自动改变，尽可能大的充满整个文本框，而文本框大小不会变化)
         * @effect  只在客户端调用生效
         * @param isAdjust usage:字体是否自适应调整大小
         */
        set autoAdjust(isAdjust: boolean);
        /** ************************************************* 其他  ******************************************************/
        /**
         * @description 点击按钮的回调，播放广告前执行
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onShow(): mw.MulticastDelegate<(isReady: boolean) => void>;
        /**
         * @description 用户手动关闭广告的回调
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onClose(): mw.MulticastDelegate<(isSuccess: boolean) => void>;
        /** *************************************************  限制用户操作 ******************************************************/
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:020 reason:限制使用 replacement:无
         * @description 设置大小(不能生效)
         * @effect  只在客户端调用生效
         * @param inSize usage:输入的大小尺寸(不能生效)
         */
        set size(inSize: never);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:020 reason:限制使用 replacement:无
         * @description 设置渲染的角度(不能生效)
         * @effect  只在客户端调用生效
         * @param o usage:渲染角度
         */
        set renderTransformAngle(o: never);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:020 reason:限制使用 replacement:无
         * @description 设置渲染锚点(不能生效)
         * @effect  只在客户端调用生效
         * @param Pivot usage:渲染锚点
         */
        set renderTransformPivot(Pivot: never);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:020 reason:限制使用 replacement:无
         * @description 设置渲染错切形变(不能生效)
         * @effect  只在客户端调用生效
         * @param shear usage:渲染错切形变
         */
        set renderShear(shear: never);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:020 reason:限制使用 replacement:无
         * @description 设置渲染透明度 0 ~ 1(不能生效)
         * @effect  只在客户端调用生效
         * @param InOpacity usage:透明度
         */
        set renderOpacity(InOpacity: never);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:020 reason:限制使用 replacement:无
         * @description 设置渲染尺寸(不能生效)
         * @effect  只在客户端调用生效
         * @param InOpacity usage:透明度
         */
        set renderScale(scale: never);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:020 reason:限制使用 replacement:无
         * @description 使用setPostion来设置位置，transform不能生效
         * @effect  只在客户端调用生效
         * @param inTransform usage:大小
         */
        set transform(inTransform: never);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:020 reason:限制使用 replacement:无
         * @description 设置自动大小(不能生效)
         * @effect  只在客户端调用生效
         * @param autoSize usage:是否自动设置大小
         */
        set autoSizeEnable(autoSize: never);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:020 reason:限制使用 replacement:无
         * @description 设置自动大小的水平分量(不能生效)
         * @effect  只在客户端调用生效
         * @returns 是否自动水平设置大小
         */
        set autoSizeHorizontalEnable(bEnabled: never);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:020 reason:限制使用 replacement:无
         * @description 设置自动大小的垂直分量(不能生效)
         * @effect  只在客户端调用生效
         * @returns 是否自动垂直设置大小
         */
        set autoSizeVerticalEnable(bEnabled: never);
    }
}

declare namespace mw {
    /**
     * @author jianke.feng
     * @groups 界面/控件/按钮
     * @description 按钮
     * @description -------------------------
     * @description 无默认文本
     * @networkStatus usage:客户端
     */
    class Button extends mw.PanelWidget {
        /**
         * @groups 界面/控件/按钮
         * @description 创建 Button 控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect  只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default: null
         * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): Button;
        /**
         * @groups 界面/控件/按钮
         * @description 获取按钮normal图片的ImageInfo
         * @effect  只在客户端调用生效
         * @returns 返回ImageInfo对象
         */
        get normalImageInfo(): mw.ImageInfo;
        /**
         * @groups 界面/控件/按钮
         * @description 获取按钮Pressed图片的ImageInfo
         * @effect  只在客户端调用生效
         * @returns 返回ImageInfo对象
         */
        get pressedImageInfo(): mw.ImageInfo;
        /**
         * @groups 界面/控件/按钮
         * @description 获取按钮Disable图片的ImageInfo
         * @effect  只在客户端调用生效
         * @returns 返回ImageInfo对象
         */
        get disableImageInfo(): mw.ImageInfo;
        /**
         * @groups 界面/控件/按钮
         * @description 同一按键同时只能操控一个UI控件，最新绑定的UI控件会覆盖之前的绑定；脚本中添加的绑定无法覆盖编辑器按键绑定菜单中绑定相同按键的UI控件，但当两个UI控件分别通过代码和菜单绑定到同一按键时，使用代码绑定的优先级更高
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         */
        addKey(key: mw.Keys): void;
        /**
         * @groups 界面/控件/按钮
         * @description  此操作只会解绑动态绑定的按键无法解除编辑器按键绑定菜单中绑定的按键
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         */
        removeKey(key: mw.Keys): void;
        /**
         * @groups 界面/控件/按钮
         * @description 获取当前UI控件绑定的所有键盘按键，包括编辑器按键绑定菜单和用代码绑定的按键
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         * @returns 返回当前控件绑定的按键,可能为空
         */
        getKeys(): mw.Keys[];
        /**
         * @groups 界面/控件/按钮
         * @description 设置是否获取输入焦点
         * @effect  只在客户端调用生效
         * @param inFocus usage:是否获取输入焦点
         */
        set focusable(inFocus: boolean);
        /**
         * @groups 界面/控件/按钮
         * @description 获取是否获取输入焦点
         * @effect  只在客户端调用生效
         * @returns 是否获取输入焦点
         */
        get focusable(): boolean;
        /**
         * @groups 界面/控件/按钮
         * @description 按钮是否启用过度模式,按下是否有效果
         * @effect  只在客户端调用生效
         * @returns 按钮是否启用过度模式
         */
        get transitionEnable(): boolean;
        /**
         * @groups 界面/控件/按钮
         * @description 是否套用不同的按下方案
         * @effect  只在客户端调用生效
         * @param inBoolean usage:是否套用不同的按下方案
         */
        set transitionEnable(inBoolean: boolean);
        /** ************************************************* 普通图片  ******************************************************/
        /**
         * @groups 界面/控件/按钮
         * @description 获取普通图片ID
         * @effect  只在客户端调用生效
         * @returns 普通图片ID
         */
        get normalImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/按钮
         * @description 设置正常图片ID
         * @effect  只在客户端调用生效
         * @param inGUID usage:图片id
         */
        set normalImageGuid(inGUID: string);
        /**
         * @groups 界面/控件/按钮
         * @description 设置正常图片
         * @precautions 建议设置 bRefreshCache = false 以提升性能
         * @effect  只在客户端调用生效
         * @param absPath usage: 图片文件路径  range: 路径长度
         * @param bRefreshCache usage:为 true 则重新创建并刷新缓存，为 false 则使用缓存。  <br> default: true
         */
        setButtonNormalByFile(absPath: string, bRefreshCache?: boolean): void;
        /**
         * @groups 界面/控件/按钮
         * @description 设置图片大小
         * @effect  只在客户端调用生效
         * @param inSize usage:大小
         */
        set normalImageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/按钮
         * @description 获取图片大小
         * @effect  只在客户端调用生效
         * @returns 普通图片大小
         */
        get normalImageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/按钮
         * @description 设置普通图片颜色
         * @effect  只在客户端调用生效
         * @param inNormalColor usage:颜色，Type.LinearColor类型，数据范围0~1
         */
        set normalImageColor(inNormalColor: mw.LinearColor);
        /**
         * @groups 界面/控件/按钮
         * @description 获取普通图片颜色
         * @effect  只在客户端调用生效
         * @returns 普通图片颜色，Type.LinearColor类型，数据范围0~1
         */
        get normalImageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/按钮
         * @description 设置正常颜色
         * @effect  只在客户端调用生效
         * @param R usage:颜色 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:颜色 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:颜色 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:颜色 透明度。 <br> range:[0, 255]  type: 整形
         */
        setNormalImageColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/按钮
         * @description 设置正常颜色指定 Hex 的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:颜色字符串  range: 符合 Hex 特点的字符串类型
         */
        setNormalImageColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/按钮
         * @description 设置普通图片绘制类型
         * @effect  只在客户端调用生效
         * @param inDrawType usage:类型
         */
        set normalImageDrawType(inDrawType: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/按钮
         * @description 获取普通图片绘制类型
         * @effect  只在客户端调用生效
         * @returns 普通图片绘制类型
         */
        get normalImageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /**
         * @groups 界面/控件/按钮
         * @description 获取普通图片边距
         * @effect  只在客户端调用生效
         * @returns 普通图片边距
         */
        get normalImageMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/按钮
         * @description 设置普通图片边距
         * @effect  只在客户端调用生效
         * @param inMargin usage:普通图片边距
         */
        set normalImageMargin(inMargin: mw.Margin);
        /** ************************************************* 按压图片  ******************************************************/
        /**
         * @groups 界面/控件/按钮
        * @description 获取按下图片ID
        * @effect  只在客户端调用生效
        * @returns 按下图片ID
        */
        get pressedImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/按钮
         * @description 设置按下图片ID
         * @effect  只在客户端调用生效
         * @param inGUID usage:图片id
         */
        set pressedImageGuid(inGUID: string);
        /**
         * @groups 界面/控件/按钮
         * @description 设置按下图片
         * @precautions 建议设置 bRefreshCache = false 以提升性能
         * @effect  只在客户端调用生效
         * @param absPath usage:图片文件路径 range: 路径长度
         * @param bRefreshCache usage:默认为 true 将重新创建并刷新缓存，为 false 则使用缓存  <br> default: true
         */
        setButtonPressedByFile(absPath: string, bRefreshCache?: boolean): void;
        /**
         * @groups 界面/控件/按钮
         * @description 设置按压图片大小
         * @effect  只在客户端调用生效
         * @param inSize usage:大小
         */
        set pressedImageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/按钮
         * @description 获取按压图片大小
         * @effect  只在客户端调用生效
         * @returns 按压图片大小
         */
        get pressedImageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/按钮
        * @description 设置按压图片颜色
        * @effect  只在客户端调用生效
        * @param inColor usage:颜色，Type.LinearColor类型，数据范围0~1
        */
        set pressedImageColor(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/按钮
         * @description 获取按压图片颜色
         * @effect  只在客户端调用生效
         * @returns 按压图片颜色，Type.LinearColor类型，数据范围0~1
         */
        get pressedImageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/按钮
         * @description 设置按下颜色
         * @effect  只在客户端调用生效
         * @param R usage:颜色 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:颜色 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:颜色 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:颜色 透明度。 <br> range:[0, 255]  type: 整形
         */
        setPressedImageColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/按钮
         * @description 设置按下颜色指定 Hex 的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:颜色字符串  range: 符合 Hex 特点的字符串类型
         */
        setPressedImageColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/按钮
         * @description 设置按压图片绘制类型
         * @effect  只在客户端调用生效
         * @param inDrawType usage:类型
         */
        set pressedImageDrawType(inDrawType: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/按钮
         * @description 获取按压图片绘制类型
         * @effect  只在客户端调用生效
         * @returns 按压图片绘制类型
         */
        get pressedImageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /**
         * @groups 界面/控件/按钮
         * @description 获取按压图片边距
         * @effect  只在客户端调用生效
         * @returns 按压图片边距
         */
        get pressedImageMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/按钮
         * @description 设置按压图片边距
         * @effect  只在客户端调用生效
         * @param inMargin usage:按压图片边距
         */
        set pressedImageMargin(inMargin: mw.Margin);
        /** ************************************************* 禁用图片  ******************************************************/
        /**
         * @groups 界面/控件/按钮
        * @description 获取禁用图片ID
        * @effect  只在客户端调用生效
        * @returns 禁用图片ID
        */
        get disableImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/按钮
         * @description 设置不可用图片ID
         * @effect  只在客户端调用生效
         * @param inGUID usage:图片id
         */
        set disableImageGuid(inGUID: string);
        /**
         * @groups 界面/控件/按钮
         * @description 设置不可用图片
         * @precautions 建议设置 bRefreshCache=false 以提升性能
         * @effect  只在客户端调用生效
         * @param absPath usage: 图片文件路径  <br> range: 路径长度
         * @param bRefreshCache usage:默认为 true 将重新创建并刷新缓存，为 false 则使用缓存  <br> default: true
         */
        setButtonDisableByFile(absPath: string, bRefreshCache?: boolean): void;
        /**
         * @groups 界面/控件/按钮
         * @description 设置禁用图片大小
         * @effect  只在客户端调用生效
        * @param inSize usage:大小
        */
        set disableImageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/按钮
         * @description 获取禁用图片大小
         * @effect  只在客户端调用生效
         * @returns 禁用图片大小
         */
        get disableImageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/按钮
        * @description 设置禁用图片颜色
        * @effect  只在客户端调用生效
        * @param inColor usage:颜色，Type.LinearColor类型，数据范围0~1
        */
        set disableImageColor(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/按钮
         * @description 获取禁用图片颜色
         * @effect  只在客户端调用生效
         * @returns 禁用图片颜色，Type.LinearColor类型，数据范围0~1
         */
        get disableImageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/按钮
         * @description 设置不可用颜色
         * @effect  只在客户端调用生效
         * @param R usage:颜色 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:颜色 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:颜色 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:颜色 透明度。 <br> range:[0, 255]  type: 整形
         */
        setDisableImageColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/按钮
         * @description 设置不可用颜色指定Hex的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:颜色字符串  range: 符合 Hex 特点的字符串类型
         */
        setDisableImageColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/按钮
         * @description 设置禁用图片绘制类型
         * @effect  只在客户端调用生效
         * @param inDrawTYpe usage:类型
         */
        set disableImageDrawType(inDrawTYpe: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/按钮
         * @description 获取禁用图片绘制类型
         * @effect  只在客户端调用生效
         * @returns 禁用图片绘制类型
         */
        get disableImageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /**
         * @groups 界面/控件/按钮
         * @description 获取禁用图片边距
         * @effect  只在客户端调用生效
         * @returns 禁用图片边距
         */
        get disableImageMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/按钮
        * @description 设置禁用图片边距
        * @effect  只在客户端调用生效
        * @param inMargin usage:禁用图片边距
        */
        set disableImageMargin(inMargin: mw.Margin);
        /** ************************************************* 其他  ******************************************************/
        /**
         * @groups 界面/控件/按钮
         * @description 点击事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onClicked(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/按钮
         * @description 按下事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onPressed(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/按钮
         * @description 释放事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onReleased(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/按钮
         * @description 悬浮事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onHovered(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/按钮
         * @description 未悬浮事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onUnhovered(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/按钮
         * @description 是否按下
         * @effect  只在客户端调用生效
         * @returns 返回按钮是否按下
         */
        isPressed(): boolean;
        /**
         * @groups 界面/控件/按钮
         * @description 设置点击模式
         * @effect  只在客户端调用生效
         * @param inClickMethod usage:点击模式选择
         */
        set clickMethod(inClickMethod: mw.ButtonClickMethod);
        /**
         * @groups 界面/控件/按钮
         * @description 设置触摸模式
         * @effect  只在客户端调用生效
         * @param inTouchMethod usage:Touch模式选择
         */
        set touchMethod(inTouchMethod: mw.ButtonTouchMethod);
        /**
         * @groups 界面/控件/按钮
         * @description 设置按压模式
         * @effect  只在客户端调用生效
         *  @param inPressedMethod usage:Press模式选择
         */
        set pressedMethod(inPressedMethod: mw.ButtonPressMethod);
    }
}

declare namespace mw {
    /**
     * @author jie.wu
     * @groups 界面/控件/容器
     * @description 容器
     * @description ----------------------
     * @description 可挂载叶子节点的根节点，以及提供各种自动布局功能
     * @networkStatus usage:客户端
     */
    class Canvas extends mw.PanelWidget {
        /**
         * @groups 界面/控件/容器
         * @description 创建Canvas控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect  只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default:null
         * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 返回创建的对象
         */
        static newObject(parent?: Canvas, inName?: string): Canvas;
        /**
         * @groups 界面/控件/容器
         * @description 设置是否裁剪
         * @effect  只在客户端调用生效
         * @param clip usage:是否裁剪
         */
        set clipEnable(clip: boolean);
        /**
         * @groups 界面/控件/容器
         * @description 获取是否裁剪
         * @effect  只在客户端调用生效
         * @returns 是否裁剪
         */
        get clipEnable(): boolean;
        /**
         * @groups 界面/控件/容器
         * @description 设置是否自动布局
         * @effect  只在客户端调用生效
         * @param inAutoLayout usage:是否自动布局
         */
        set autoLayoutEnable(inAutoLayout: boolean);
        /**
         * @groups 界面/控件/容器
         * @description 获取是否时自动布局
         * @effect  只在客户端调用生效
         * @returns 是否自动布局
         */
        get autoLayoutEnable(): boolean;
        /**
         * @groups 界面/控件/容器
         * @description 设置完整的布局规则
         * @effect  只在客户端调用生效
         * @param layout usage:布局规则
         */
        set autoLayoutRule(layout: mw.UILayout);
        /**
         * @groups 界面/控件/容器
         * @description 获取完整的布局规则
         * @effect  只在客户端调用生效
         * @returns 布局规则
         */
        get autoLayoutRule(): mw.UILayout;
        /** ********************************************* 设置具体的布局规则   ****************************************************/
        /**
         * @groups 界面/控件/容器
         * @description 设置自动布局排版规则-容器类型
         * @effect  只在客户端调用生效
         * @param inRule usage:自动布局排版规则-容器类型
         */
        set autoLayoutContainerRule(inRule: mw.UILayoutType);
        /**
         * @groups 界面/控件/容器
         * @description 获取自动布局排版规则-容器类型
         * @effect  只在客户端调用生效
         * @returns 自动布局排版规则-容器类型
         */
        get autoLayoutContainerRule(): mw.UILayoutType;
        /**
         * @groups 界面/控件/容器
         * @description 设置自动布局间隔
         * @effect  只在客户端调用生效
         * @param inSpaceInItem usage:自动布局间隔
         */
        set autoLayoutSpacing(inSpaceInItem: number);
        /**
         * @groups 界面/控件/容器
         * @description 获取自动布局间隔
         * @effect  只在客户端调用生效
         * @returns 自动布局间隔
         */
        get autoLayoutSpacing(): number;
        /**
         * @groups 界面/控件/容器
         * @description 设置自动布局排版规则-排列规则
         * @effect  只在客户端调用生效
         * @param inRule usage:自动布局排版规则-排列规则
         */
        set autoLayoutPacketRule(inRule: mw.UILayoutPacket);
        /**
         * @groups 界面/控件/容器
         * @description 获取自动布局排版规则-排列规则
         * @effect  只在客户端调用生效
         * @returns 自动布局排版规则-排列规则
         */
        get autoLayoutPacketRule(): mw.UILayoutPacket;
        /**
         * @groups 界面/控件/容器
         * @description 设置边缘间距
         * @effect  只在客户端调用生效
         * @param inPadding usage:填充
         */
        set autoLayoutPadding(inPadding: mw.Margin);
        /**
         * @groups 界面/控件/容器
         * @description 获取边缘间距
         * @effect  只在客户端调用生效
         * @returns 获取填充
         */
        get autoLayoutPadding(): mw.Margin;
        /**
         * @groups 界面/控件/容器
         * @description 设置是否获取输入焦点
         * @effect  只在客户端调用生效
         * @param inFocus usage:是否获取输入焦点
         */
        set focusable(inFocus: boolean);
        /**
         * @groups 界面/控件/容器
         * @description 获取是否获取输入焦点
         * @effect  只在客户端调用生效
         * @returns 是否获取输入焦点
         */
        get focusable(): boolean;
    }
}

declare namespace mw {
    /**
     * @author jianke.feng
     * @groups 界面/控件/勾选框
     * @description 勾选框
     * @networkStatus usage:客户端
     */
    class Checkbox extends mw.Widget {
        /**
         * @groups 界面/控件/勾选框
         * @description 创建Checkbox控件 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect  只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default: null
         * @param inName usage:创建控件的名称 default:null  <br> range: 不做限制，合理即可。
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): Checkbox;
        /**
         * @groups 界面/控件/勾选框
         * @description 样式
         * @effect  只在客户端调用生效
         * @returns 返回CheckboxStyle对象
         */
        get checkBoxStyle(): mw.CheckboxStyle;
        /**
         * @groups 界面/控件/勾选框
         * @description 选中改变事件
         * @effect  只在客户端调用生效
         * @returns 返回代理
         */
        get onCheckStateChanged(): mw.MulticastDelegate<(state: mw.CheckBoxState) => void>;
        /**
         * @groups 界面/控件/勾选框
         * @description 获取选中结果
         * @effect  只在客户端调用生效
         * @returns 返回CheckBoxState枚举
         */
        get checkState(): mw.CheckBoxState;
        /**
         * @groups 界面/控件/勾选框
         * @description 设置选中选项
         * @effect  只在客户端调用生效
         * @param state usage:选中选项
         */
        set checkState(state: mw.CheckBoxState);
        /**
         * @groups 界面/控件/勾选框
         * @description 点击事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onClicked(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/勾选框
         * @description 按下事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onPressed(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/勾选框
         * @description 释放事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onReleased(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/勾选框
         * @description 悬浮事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onHovered(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/勾选框
         * @description 未悬浮事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onUnhovered(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/勾选框
         * @description 是否按下
         * @effect  只在客户端调用生效
         * @returns 返回按钮是否按下
         */
        isPressed(): boolean;
        /**
         * @groups 界面/控件/勾选框
         * @description 设置点击事件触发模式
         * @effect  只在客户端调用生效
         * @param inClickMethod usage:模式选择
         */
        set touchMethod(inClickMethod: mw.ButtonTouchMethod);
        /**
         * @groups 界面/控件/勾选框
         * @description 获取点击模式
         * @effect  只在客户端调用生效
         * @returns 点击模式选择
         */
        get touchMethod(): mw.ButtonTouchMethod;
    }
}

declare namespace mw {
    /**
    * @author jie.wu
    * @groups 界面/控件/调色板
    * @description 调色板
    * @networkStatus usage:客户端
    */
    class ColorPick extends mw.Widget {
        /**
         * @groups 界面/控件/调色板
        * @description 创建 ColorPick 控件
        * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
        * @effect  只在客户端调用生效
        * @param parent usage:创建控件的parent对象 default:null
        * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
        * @returns 返回创建的对象
        */
        static newObject(parent?: mw.Canvas, inName?: string): ColorPick;
        /**
         * @groups 界面/控件/调色板
         * @description 设置color picker的颜色
         * @effect  只在客户端调用生效
         * @param inColor usage:输入的颜色，Type.LinearColor类型，数据范围0~1
         */
        set color(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/调色板
         * @description 设置color picker 的图片
         * @effect  只在客户端调用生效
         * @param inGUID usage:输入的图片ID
         */
        set imageGuid(inGuid: string);
        /**
         * @groups 界面/控件/调色板
         * @description 颜色改变时触发的代理
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onColorChanged(): mw.MulticastDelegate<(Content: mw.LinearColor) => void>;
        /**
         * @groups 界面/控件/调色板
         * @description 颜色改变完成时触发的函数代理
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onColorChangeFinished(): mw.MulticastDelegate<(Content: mw.LinearColor) => void>;
        /**
         * @groups 界面/控件/调色板
         * @description 点击时触发的代理
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onTouchStart(): mw.MulticastDelegate<(Content: mw.LinearColor) => void>;
        /**
         * @groups 界面/控件/调色板
         * @description 点击完成时触发的代理函数
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onTouchFinished(): mw.MulticastDelegate<(Content: mw.LinearColor) => void>;
    }
}

declare namespace mw {
    /**
      * @author jie.wu
      * @groups 界面/事件
      * @description 拖拽事件数据传递类
      * @networkStatus usage:客户端
      */
    class DragDropPayLoad {
        /**
         * @groups 界面/事件
         * @description GUID
         */
        private guidStr;
        /**
         * @groups 界面/事件
         * @description name
         */
        private nameStr;
        /**
         * @groups 界面/事件
         * @description id
         */
        private idStr;
        /**
         * @groups 界面/事件
         * @description GUID
         * @returns GUID
         */
        get guid(): string;
        /**
         * @groups 界面/事件
         * @description 设置名字
         */
        set name(inName: string);
        /**
         * @description 获取名字
         * @returns 名字
         */
        get name(): string;
        /**
         * @description 设置id
         */
        set id(inId: number | string);
        /**
         * @description 获取id
         * @returns id
         */
        get id(): number | string;
    }
    /** UI 拖拽事件 */
    /**
     * @author jie.wu
     * @groups 界面/事件
     * @description UI 拖拽事件
     * @networkStatus usage:客户端
     */
    class DragDropOperation {
        private constructor();
        private constructor();
        /**
         * @description 判断是否相同
         * @effect 只在客户端调用生效
         * @param other usage:另一个UI拖拽事件
         * @returns boolean
         */
        equal(other: DragDropOperation): boolean;
        /**
         * @description 获取Tag 标签
         * @effect 只在客户端调用生效
         * @returns 返回tag
         */
        getTag(): string;
        /**
         * @description 获取拖拽显示的UI
         * @effect 只在客户端调用生效
         * @returns 拖拽显示的UI
         */
        getDragVisualWidget(): mw.Widget;
        /**
         * @description 获取拖拽锚点
         * @effect 只在客户端调用生效
         * @returns 拖拽锚点
         */
        getDragPivot(): mw.DragPivot;
        /**
         * @description 获取拖拽UI的百分比偏移
         * @effect 只在客户端调用生效
         * @returns 百分比偏移
         */
        getOffset(): mw.Vector2;
        /**
         * @description 获取传递的数据信息
         * @effect 只在客户端调用生效
         * @returns 数据信息
         */
        tryGetDragDropPayLoad(): DragDropPayLoad;
        /**
         * @description 获取传递的数据信息
         * @effect 只在客户端调用生效
         * @returns 数据信息
         */
        tryGetDragDropPayLoadAs<T extends DragDropPayLoad>(): T;
    }
}

declare namespace mw {
    /**
     * @author jie.wu
     * @groups 界面/控件/绘图画布
     * @description 自定义绘制图元数据
     * @networkStatus usage:客户端
     */
    class UIDrawCustomVertex {
        /**
         * @description 绘制的顶点位置信息
         */
        position: mw.Vector2;
        /**
         * @description 绘制的顶点颜色信息
         */
        color: mw.LinearColor;
        /**
         * @description 绘制的顶点纹理坐标信息
         */
        texCoord: mw.Vector2;
    }
    /**
     * @author jie.wu
     * @groups 界面/控件/绘图画布
     * @description 图元绘制基础参数
     * @networkStatus usage:客户端
     */
    class DrawDataBase {
        /**
         * @description 绘制层级
         */
        drawLayerId: number;
        /**
         * @description 线的颜色
         */
        lineColor: mw.LinearColor;
        /**
         * @description 线的粗细
         */
        lineThickness: number;
    }
    /**
     * @author jie.wu
     * @groups 界面/控件/绘图画布
     * @description UI 画布
     * @networkStatus usage:客户端
     */
    class DrawCanvas extends mw.Widget {
        /**
         * @groups 界面/控件/绘图画布
         * @description 创建绘画控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect 只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default: null
         * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): DrawCanvas;
        /**
         * @groups 界面/控件/绘图画布
         * @description 清除全部绘制
         * @effect 只在客户端调用生效
         */
        clearDraws(): void;
        /**
         * @description 移除指定的绘制图元
         * @groups 界面/控件/绘图画布
         * @effect 只在客户端调用生效
         * @param id usage:指定的绘制图元Id type: 整形 range: 无
         */
        removeDrawById(id: number): void;
        /**
         * @groups 界面/控件/绘图画布
         * @effect 只在客户端调用生效
         * @description 画多段线
         * @param points usage:线的各个点坐标
         * @param lineData usage:绘制图元信息 default: new DrawDataBase()
         * @returns 返回drawId
         */
        drawLines(points: mw.Vector2[], lineData?: DrawDataBase): number;
        /**
         * @groups 界面/控件/绘图画布
         * @effect 只在客户端调用生效
         * @description 画埃尔米特曲线
         * @param startPoint usage:开始线位置
         * @param startDirection usage:开始切线方向
         * @param endPoint usage:结束点位置
         * @param endDirection usage:结束点切线方向
         * @param lineData usage:绘制图元信息 default: new DrawDataBase()
         * @returns 返回drawId
         */
        drawSpline(startPoint: mw.Vector2, startDirection: mw.Vector2, endPoint: mw.Vector2, endDirection: mw.Vector2, lineData?: DrawDataBase): number;
        /**
         * @groups 界面/控件/绘图画布
         * @effect 只在客户端调用生效
         * @description 绘制三阶贝塞尔曲线
         * @param p1 usage:第一个点
         * @param p2 usage:第二个点
         * @param p3 usage:第三个点
         * @param p4 usage:第四个点
         * @param lineData usage:绘制图元信息 default: new DrawDataBase()
         * @returns 返回drawId
         */
        drawCubicBezierSpline(p1: mw.Vector2, p2: mw.Vector2, p3: mw.Vector2, p4: mw.Vector2, lineData?: DrawDataBase): number;
        /**
         * @groups 界面/控件/绘图画布
         * @effect 只在客户端调用生效
         * @description 画文字
         * @param text usage:要绘制的文本 range: 无
         * @param position usage:位置
         * @param fontSize usage:字体大小 type: 整形 range: 无
         * @param fontColor usage:颜色
         * @param drawLayerId usage:绘制层级 default: 0 range: 无 type: 整形
         * @returns 返回drawId
         */
        drawText(text: string, position: mw.Vector2, fontSize: number, fontColor: mw.LinearColor, drawLayerId?: number): number;
        /**
         * @groups 界面/控件/绘图画布
         * @effect 只在客户端调用生效
         * @description 自定义绘制图元
         * @param vertex usage:顶点图元数据信息
         * @param index usage:顶点图元索引信息
         * @param assetId usage:UI贴图资源 default: "" range: 无
         * @param drawLayerId usage:绘制层级 default: 0 range: 无 type: 整形
         * @returns 返回drawId
         */
        drawCustom(vertex: UIDrawCustomVertex[], index: number[], assetId?: string, drawLayerId?: number): number;
    }
}

declare namespace mw {
    /**
     * @author jianke.feng
     * @groups 界面/控件/下拉框
     * @description Dropdown
     * @networkStatus usage:客户端
     */
    class Dropdown extends mw.Widget {
        /**
         * @groups 界面/控件/下拉框
         * @description 创建Canvas控件 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect 只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default:null
         * @param inName usage:创建控件的名称 default:null  <br> range: 无
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): Dropdown;
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取默认字体
         * @effect 只在客户端调用生效
         * @returns 默认字体
         */
        get defaultFont(): mw.UIFontFamily | string;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置默认字体
         * @effect 只在客户端调用生效
         * @param inFont 需设置的默认字体
         */
        set defaultFont(inFont: mw.UIFontFamily | string);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取退却字体
         * @effect 只在客户端调用生效
         * @returns 退却字体
         */
        get fallbackFont(): mw.UIFontFamily | string;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置退却字体
         * @effect 只在客户端调用生效
         * @param inFont 需设置的退却字体
         */
        set fallbackFont(inFont: mw.UIFontFamily | string);
        /**
         * @description 设置字体字形
         * @effect 只在客户端调用生效
         * @param inGlyph usage:字体字形的类型
         */
        set glyph(inGlyph: mw.UIFontGlyph);
        /**
         * @description 获取字体字形
         * @effect 只在客户端调用生效
         * @returns 字体字形
         */
        get glyph(): mw.UIFontGlyph;
        /**
         * @groups 界面/控件/下拉框
         * @description 文本样式
         * @effect 只在客户端调用生效
         * @returns 返回文本样式
         */
        get textStyle(): mw.TextStyle;
        /**
         * @groups 界面/控件/下拉框
         * @description 菜单样式
         * @effect 只在客户端调用生效
         * @returns 返回菜单样式
         */
        get dropdownStyle(): mw.DropdownStyle;
        /**
         * @groups 界面/控件/下拉框
         * @description 滚动条样式
         * @effect 只在客户端调用生效
         * @returns 返回滚动条样式
         */
        get scrollbarStyle(): mw.ScrollbarStyle;
        /**
         * @groups 界面/控件/下拉框
         * @description ListItemStyle样式
         * @effect 只在客户端调用生效
         * @returns 返回ListItemStyle样式
         */
        get menuRowStyle(): mw.ListItemStyle;
        /**
         * @groups 界面/控件/下拉框
         * @description 选中改动事件
         * @effect 只在客户端调用生效
         * @returns 返回选中改动事件
         */
        get onSelectionChangedEvent(): mw.MulticastDelegate<(item: string, select: mw.SelectInfo) => void>;
        /**
         * @groups 界面/控件/下拉框
         * @description 打开下拉菜单前触发事件
         * @effect 只在客户端调用生效
         * @returns 返回事件
         */
        get onOpeningEvent(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/下拉框
         * @param option usage:菜单项    <br> range: 无
         * @description 添加菜单项
         * @effect 只在客户端调用生效
         */
        addOption(option: string): void;
        /**
         * @groups 界面/控件/下拉框
         * @param option usage:菜单项  <br> range: 无
         * @description 移除菜单项
         * @effect 只在客户端调用生效
         */
        removeOption(option: string): void;
        /**
         * @groups 界面/控件/下拉框
         * @param option usage:菜单项    <br> range: 无
         * @description 获取下拉顺序坐标
         * @effect 只在客户端调用生效
         * @returns 下拉顺序坐标
         */
        findOptionIndex(option: string): number;
        /**
         * @groups 界面/控件/下拉框
         * @param index usage:下拉顺序坐标    <br> range: 无  type: 整形
         * @description 菜单项内容
         * @effect 只在客户端调用生效
         * @returns 获取菜单项内容
         */
        getOptionByIndex(index: number): string;
        /**
         * @groups 界面/控件/下拉框
         * @description 清空所有菜单项
         * @effect 只在客户端调用生效
         */
        clearOptions(): void;
        /**
         * @groups 界面/控件/下拉框
         * @description 清空所有选中
         * @effect 只在客户端调用生效
         */
        clearSelection(): void;
        /**
         * @groups 界面/控件/下拉框
         * @description 获取所有菜单项
         * @effect 只在客户端调用生效
         * @returns 所有菜单项
         */
        get options(): string[];
        /**
         * @groups 界面/控件/下拉框
         * @description 获取所有菜单项
         * @effect 只在客户端调用生效
         * @param value usage: 传进来的字符串数组     <br> range: 无
         */
        set options(value: string[]);
        /**
         * @groups 界面/控件/下拉框
         * @description 修改索引处的值
         * @effect 只在客户端调用生效
         * @param index usage: 索引     <br> range: 对应的索引值，不做限制。  <br> type: 整形
         * @param value usage: 值    <br> range: 无
         */
        setOptionByIndex(index: number, value: string): void;
        /**
         * @groups 界面/控件/下拉框
         * @description 获取菜单项数量
         * @effect 只在客户端调用生效
         * @returns 菜单项数量
         */
        get optionCount(): number;
        /**
         * @groups 界面/控件/下拉框
         * @description 获取当前选中项
         * @effect 只在客户端调用生效
         * @returns 当前选中项
         */
        get selectedOption(): string;
        /**
         * @groups 界面/控件/下拉框
         * @description 设置前选中项
         * @effect 只在客户端调用生效
         * @param value usage:传进来的文本 range: 无
         */
        set selectedOption(value: string);
        /**
         * @groups 界面/控件/下拉框
         * @description 设置选中项下拉索引
         * @effect 只在客户端调用生效
         * @param value usage:设置的索引值 range: 无 type: 整形
         */
        set selectedOptionIndex(value: number);
        /**
         * @groups 界面/控件/下拉框
         * @description 获取选中项下拉索引
         * @effect 只在客户端调用生效
         * @returns 选中项下拉索引
         */
        get selectedOptionIndex(): number;
        /**
         * @groups 界面/控件/下拉框
         * @description 获取菜单是否打开
         * @effect 只在客户端调用生效
         * @returns 菜单是否打开
         */
        get isOpened(): boolean;
        /**
         * @groups 界面/控件/下拉框
         * @description 设置显示的选中文本的可见性
         * @effect 只在客户端调用生效
         * @param bVisible usage: 自定义UI的GUID range: [true,false]
         */
        setShowTextVisible(bVisible: boolean): void;
        /**
         * @groups 界面/控件/下拉框
         * @description 获取显示的选中文本的可见性
         * @effect 只在客户端调用生效
         * @returns 文本的可见性
         */
        getShowTextVisible(): boolean;
    }
}

declare namespace mw {
    /**
     * @author jie.wu
     * @groups 界面/控件/帧动画
     * @description 帧动画控件
     * @networkStatus usage:客户端
     */
    class FlipBook extends mw.Widget {
        /**
         * @description 创建 FlipBook 控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect  只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default:null
         * @param inName usage:创建控件的名称 default:null range:无
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): FlipBook;
        /**
          * @description 图片资源信息
          * @effect 只在客户端调用生效
          */
        get imageInfo(): mw.ImageInfo;
        /**
          * @description 帧动画完整播放完回调，触发条件，播放到最后一帧，并且播放状态是Playing
          * @effect 只在客户端调用生效
          */
        get onFinish(): mw.MulticastDelegate<() => void>;
        /**
          * @description 帧动画播放状态
          * @effect 只在客户端调用生效
          */
        get status(): mw.PlayStatus;
        /**
          * @description 帧动画播放
          * @effect 只在客户端调用生效
          */
        play(): void;
        /**
          * @description 帧动画播放停止
          * @effect 只在客户端调用生效
          */
        stop(): void;
        /**
          * @description 帧动画播放暂停
          * @effect 只在客户端调用生效
          */
        pause(): void;
        /**
          * @description 帧动画播放恢复暂停，继续播放
          * @effect 只在客户端调用生效
          */
        resume(): void;
        /**
          * @description 帧动画当前播放到第几帧
          * @effect 只在客户端调用生效
          */
        get currentFrameIndex(): number;
        /**
          * @description 设置帧动画当前播放到第几帧,小于最大有效帧图片数
          * @effect 只在客户端调用生效
          */
        set currentFrameIndex(index: number);
        /**
          * @description 帧动画每秒播放多少张帧图片 >0
          * @effect 只在客户端调用生效
          */
        get framesPerSecond(): number;
        /**
          * @description 帧动画每秒播放多少张帧图片 > 0
          * @effect 只在客户端调用生效
          */
        set framesPerSecond(value: number);
        /**
          * @description 帧动画是否循环播放
          * @effect 只在客户端调用生效
          */
        get isLoop(): boolean;
        /**
          * @description 帧动画是否循环播放
          * @effect 只在客户端调用生效
          */
        set isLoop(value: boolean);
        /**
          * @description 帧图片有效分割行数 >=1
          * @effect 只在客户端调用生效
          */
        get rows(): number;
        /**
          * @description 帧图片有效分割行数 >=1
          * @effect 只在客户端调用生效
          */
        set rows(value: number);
        /**
          * @description 帧图片有效分割列数 >=1
          * @effect 只在客户端调用生效
          */
        get columns(): number;
        /**
          * @description 帧图片有效分割列数 >=1
          * @effect 只在客户端调用生效
          */
        set columns(value: number);
        /**
          * @description 帧图片最大分割的有效播放帧数,大于0并且小于（行数X列数）
          * @effect 只在客户端调用生效
          */
        get totalFrames(): number;
        /**
          * @description 帧图片最大分割的有效播放帧数,大于0并且小于（行数X列数）
          * @effect 只在客户端调用生效
          */
        set totalFrames(value: number);
    }
}

declare namespace mw {
    /**
     * @author jie.wu
     * @groups 界面/控件/图片
     * @description 图片
     * @networkStatus usage:客户端
     */
    class Image extends mw.Widget {
        /**
         * @groups 界面/控件/图片
         * @description 创建 Image 控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect 只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default:null
         * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): Image;
        /**
         * @groups 界面/控件/图片
         * @description 图片资源信息
         * @effect只在客户端调用生效
         */
        get imageInfo(): mw.ImageInfo;
        /**
         * @groups 界面/控件/图片
         * @description 设置图片大小
         * @effect只在客户端调用生效
         * @param inSize usage:size
         */
        set imageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/图片
         * @description 获取图片大小
         * @effect 只在客户端调用生效
         * @returns 图片大小
         */
        get imageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/图片
         * @description 设置图片颜色
         * @effect 只在客户端调用生效
         * @param inColor usage:图片颜色，Type.LinearColor类型，数据范围0~1
         * @returns 颜色
         */
        set imageColor(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/图片
         * @description 获取图片的颜色
         * @effect 只在客户端调用生效
         * @returns 图片的颜色，Type.LinearColor类型，数据范围0~1
         */
        get imageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/图片
         * @description 设置图片颜色
         * @effect 只在客户端调用生效
         * @param R usage:图片 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:图片 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:图片 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:图片 透明度。 <br> range:[0, 255]  type: 整形
         */
        setImageColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/图片
         * @description 设置图片颜色。
         * @description 指定 Hex 的颜色文本设定颜色 例如: #05050505
         * @effect 只在客户端调用生效
         * @param inHexString usage: Hex 颜色字符串。 <br>   range: 符合 Hex 特点的字符串类型
         */
        setImageColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/图片
        * @description 设置图片绘制类型
        * @effect 只在客户端调用生效
        * @param inDrawType usage:绘制类型
        */
        set imageDrawType(inDrawType: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/图片
         * @description 获取图片绘制类型
         * @effect 只在客户端调用生效
         * @returns 图片绘制类型
         */
        get imageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /**
         * @groups 界面/控件/图片
         * @description 获取图片边距
         * @effect只在客户端调用生效
         * @returns 图片边距
         */
        get margin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/图片
         * @description 设置图片的边距
         * @effect只在客户端调用生效
         * @param inMargin usage:图片边距
         */
        set margin(inMargin: mw.Margin);
        /**
         * @groups 界面/控件/图片
         * @description 获取图片id
         * @effect 只在客户端调用生效
         * @returns 图片id
         */
        get imageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/图片
         * @description 设置图片id
         * @effect 只在客户端调用生效
         * @param inGUID usage:新的图片样式
         */
        set imageGuid(inGUID: string);
        /**
         * @groups 界面/控件/图片
         * @description 获取当前渲染的摄像机
         * @effect  只在客户端调用生效
         * @returns 新的摄像机对象
         */
        get currentCamera(): mw.Camera;
        /**
         * @groups 界面/控件/图片
         * @description 设置当前渲染的摄像机
         * @effect  只在客户端调用生效
         * @param camera usage:新的摄像机对象
         */
        set currentCamera(camera: mw.Camera | string);
        /**
         * @groups 界面/控件/图片
         * @description 设置图片样式为本地图片文件
         * @precautions 1. 建议设置 bRefreshCache = false 以提升性能  2. 该接口主要配合 setImageByBlendMode 和 asyncExportBlendBrush 来为移动编辑器服务的
         * @effect 只在客户端调用生效
         * @param absPath usage: 图片绝对路径 range: 路径长度
         * @param bRefreshCache usage: 默认为 true 将重新创建并刷新缓存，为 false 则使用缓存  <br> default: true
         */
        setImageByFile(absPath: string, bRefreshCache?: boolean): void;
        /**
         * @groups 界面/控件/图片
         * @description 将两张图片融合叠加显示在图片组件上
         * @effect 只在客户端调用生效
         * @param backgroundPic usage:背景图片绝对路径  range:路径长度
         * @param foregroundPic usage:前景图片绝对路径  range:路径长度
         */
        setImageByBlendMode(backgroundPic: string, foregroundPic: string): void;
        /**
         * @groups 界面/控件/图片
         * @description 将两张图片融合叠加显示在图片组件上
         * @effect 只在客户端调用生效
         * @param GUID usage:背景图片 GUID  range: 依据资源 ID 长度而定
         * @param foregroundPic  usage:前景图片绝对路径  range: 路径长度
         */
        setImageByBlendModeWithGUID(GUID: string, foregroundPic: string): void;
        /**
         * @groups 界面/控件/图片
         * @description 将融合的图片导出为一张
         * @precautions 必须调用过 setImageByBlendMode 后才会生效，高消耗操作注意
         * @effect 只在客户端调用生效
         * @returns 导出的图片的本地路径
         */
        asyncExportBlendBrush(): Promise<string>;
        /**
         * @groups 界面/控件/图片
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:038 reason:该接口不再需要 replacement:直接设置ImageInfo里的setByAssetIcon
         * @description 设置显示资源的ICON
         * @effect 只在客户端调用生效
         * @param data usage:资源的ICON信息
         */
        setImageByAssetIconData(data: mw.AssetIconData): void;
        /**
         * @groups 界面/控件/图片
        * @description 获取显示资源的ICON
        * @effect 只在客户端调用生效
        * @returns  资源的ICON信息
        */
        getImageAssetIconData(): Readonly<mw.AssetIconData>;
    }
}

declare namespace mw {
    /**
     * @author jie.wu
     * @groups 界面/控件/输入框
     * @description 输入框
     * @networkStatus usage:客户端
     */
    class InputBox extends mw.Widget {
        /**
         * @groups 界面/控件/输入框
         * @description 创建 InputBox 控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect  只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default:null
         * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): InputBox;
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取默认字体
         * @effect  只在客户端调用生效
         * @returns 默认字体
         */
        get defaultFont(): mw.UIFontFamily | string;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置默认字体
         * @effect  只在客户端调用生效
         * @param inFont 需设置的默认字体
         */
        set defaultFont(inFont: mw.UIFontFamily | string);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取退却字体
         * @effect  只在客户端调用生效
         * @returns 退却字体
         */
        get fallbackFont(): mw.UIFontFamily | string;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置退却字体
         * @effect  只在客户端调用生效
         * @param inFont 需设置的退却字体
         */
        set fallbackFont(inFont: mw.UIFontFamily | string);
        /**
         * @groups 界面/控件/输入框
         * @description 设置字体字形
         * @effect  只在客户端调用生效
         * @param inGlyph usage:设置的字体字形
         */
        set glyph(inGlyph: mw.UIFontGlyph);
        /**
         * @groups 界面/控件/输入框
         * @description 获取字体字形
         * @effect  只在客户端调用生效
         * @returns 字体字形
         */
        get glyph(): mw.UIFontGlyph;
        /**
         * @groups 界面/控件/输入框
         * @description 设置是否开启字体删除线
         * @effect  只在客户端调用生效
         * @param inEnableStrikethrough usage:删除线
         */
        set strikethroughEnable(inEnableStrikethrough: boolean);
        /**
         * @groups 界面/控件/输入框
         * @description 获取是否开启字体删除线
         * @effect  只在客户端调用生效
         * @returns 是否开启字体删除线
         */
        get strikethroughEnable(): boolean;
        /**
         * @groups 界面/控件/输入框
         * @description 设置是否开启字体下划线
         * @effect  只在客户端调用生效
         * @param inEnableUnderline usage:下户线
         */
        set underlineEnable(inEnableUnderline: boolean);
        /**
         * @groups 界面/控件/输入框
         * @description 获取是否开启字体下划线
         * @effect  只在客户端调用生效
         * @returns true:开启，false:关闭
         */
        get underlineEnable(): boolean;
        /**
         * @groups 界面/控件/输入框
         * @description 获取字体内容颜色
         * @effect  只在客户端调用生效
         * @param inContentColor usage:颜色，Type.LinearColor类型，数据范围0~1
         */
        set contentColor(inContentColor: mw.LinearColor);
        /**
         * @groups 界面/控件/输入框
         * @description 设置字体内容颜色
         * @effect  只在客户端调用生效
         * @returns 字体内容颜色，Type.LinearColor类型，数据范围0~1
         */
        get contentColor(): mw.LinearColor;
        /**
         * @groups 界面/控件/输入框
         * @description 设置阴影颜色
         * @effect  只在客户端调用生效
         * @param inShadowColor usage:颜色，Type.LinearColor类型，数据范围0~1
         */
        set shadowColor(inShadowColor: mw.LinearColor);
        /**
         * @groups 界面/控件/输入框
         * @description 获取字体阴影颜色
         * @effect  只在客户端调用生效
         * @returns 字体阴影颜色，Type.LinearColor类型，数据范围0~1
         */
        get shadowColor(): mw.LinearColor;
        /**
         * @groups 界面/控件/输入框
         * @description 设置阴影偏移
         * @effect  只在客户端调用生效
         * @param inOffset usage:偏移
         */
        set shadowOffset(inOffset: mw.Vector2);
        /**
         * @groups 界面/控件/输入框
         * @description 获取字体阴影偏移
         * @effect  只在客户端调用生效
         * @returns 字体阴影偏移
         */
        get shadowOffset(): mw.Vector2;
        /**
         * @groups 界面/控件/输入框
         * @description 设置字体对齐方式
         * @effect  只在客户端调用生效
         * @param inTextJustify usage:对齐方式
         */
        set textAlign(inTextJustify: mw.TextJustify);
        /**
         * @groups 界面/控件/输入框
         * @description 获取字体对齐方式
         * @effect  只在客户端调用生效
         * @returns 字体对齐方式
         */
        get textAlign(): mw.TextJustify;
        /**
         * @groups 界面/控件/输入框
         * @description 设置字体垂直对齐方式
         * @effect  只在客户端调用生效
         * @param inTextVerticalJustify usage:对齐方式
         */
        set textVerticalAlign(inTextVerticalJustify: mw.TextVerticalJustify);
        /**
         * @groups 界面/控件/输入框
         * @description 获取字体垂直对齐方式
         * @effect  只在客户端调用生效
         * @returns 字体垂直对齐方式
         */
        get textVerticalAlign(): mw.TextVerticalJustify;
        /**
         * @groups 界面/控件/输入框
         * @description 获取字体描边颜色
         * @effect  只在客户端调用生效
         * @param inOutlineColor usage:描边颜色，Type.LinearColor类型，数据范围0~1
         */
        set outlineColor(inOutlineColor: mw.LinearColor);
        /**
         * @groups 界面/控件/输入框
         * @description 设置字体描边颜色
         * @effect  只在客户端调用生效
         * @returns 字体描边颜色，Type.LinearColor类型，数据范围0~1
         */
        get outlineColor(): mw.LinearColor;
        /**
         * @groups 界面/控件/输入框
         * @description 设置字体描边宽度
         * @effect  只在客户端调用生效
         * @param inOutlineSize usage:宽度
         */
        set outlineSize(inOutlineSize: number);
        /**
         * @groups 界面/控件/输入框
         * @description 获取字体描边宽度
         * @effect  只在客户端调用生效
         * @returns 字体描边宽度
         */
        get outlineSize(): number;
        /**
         * @groups 界面/控件/输入框
         * @description 设置可读性
         * @effect  只在客户端调用生效
         * @param inValue usage:可读性
         */
        set readOnlyEnable(inValue: boolean);
        /**
         * @groups 界面/控件/输入框
         * @description 获取可读性
         * @effect  只在客户端调用生效
         * @returns 是否可读
         */
        get readOnlyEnable(): boolean;
        /**
         * @groups 界面/控件/输入框
         * @description 文本改变事件
         * @effect  只在客户端调用生效
         * @returns 文本改变事件
         */
        get onTextChanged(): mw.MulticastDelegate<(Text: string) => void>;
        /**
         * @groups 界面/控件/输入框
         * @description 文本提交事件
         * @effect  只在客户端调用生效
         * @returns 文本提交事件
         */
        get onTextCommitted(): mw.MulticastDelegate<(Text: string, CommitMethod: mw.TextCommit, Result?: mw.maskWordCheckResult) => void>;
        /**
         * @groups 界面/控件/输入框
         * @description 设置是否为富文本
         * @effect  只在客户端调用生效
         * @param InValue 是否为富文本
         */
        set isRichText(isRichText: boolean);
        /**
         * @groups 界面/控件/输入框
         * @description 获取是否为富文本
         * @effect  只在客户端调用生效
         * @returns 是否为富文本
         */
        get isRichText(): boolean;
        /**
         * @groups 界面/控件/输入框
         * @description 设置文本内容
         * @effect  只在客户端调用生效
         * @param inText usage:文本
         */
        set text(inText: string);
        /**
         * @groups 界面/控件/输入框
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:041 reason:功能迁移 replacement: Inputbox.asyncGetText
         * @description 获取文本内容
         * @effect  只在客户端调用生效
         * @returns 文本内容
         */
        get text(): string;
        /**
         * @groups 界面/控件/输入框
         * @description 获取提示文本内容
         * @effect  只在客户端调用生效
         * @returns 提示文本内容
         */
        get hintString(): string;
        /**
         * @groups 界面/控件/输入框
         * @description 设置提示内容
         * @effect  只在客户端调用生效
         * @param inHintString usage:提示内容
         */
        set hintString(inHintString: string);
        /**
       * @groups 界面/控件/输入框
       * @description 文本提交屏蔽词检测封装
       * @effect  只在客户端调用生效
       * @param Text usage:提交的文本
       * @param CommitMethod usage:提交方式
       */
        private onTextCommittedMaskCheck;
        /**
       * @groups 界面/控件/输入框
       * @description 异步获取文本接口
       * @effect  只在客户端调用生效
       * @returns 获取当前输入框的文本值,若为正在提交文本,则异步获取
       */
        asyncGetText(): Promise<string>;
        /**
         * @groups 界面/控件/输入框
         * @description 设置输入框的内容颜色
         * @effect  只在客户端调用生效
         * @param R usage:图片 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:图片 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:图片 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:图片 透明度。 <br> range:[0, 255]  type: 整形
         */
        setContentColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/输入框
         * @description 设置输入框的内容颜色，指定 Hex 的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:Hex 颜色字符串  range: 符合 Hex 特点的字符串类型
         */
        setContentColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/输入框
         * @description 设置阴影颜色
         * @effect  只在客户端调用生效
         * @param R usage:阴影 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:阴影 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:阴影 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:阴影 透明度。 <br> range:[0, 255]  type: 整形
         */
        setShadowColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/输入框
         * @description 设置阴影颜色，指定 Hex 的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:Hex 颜色字符串  range: 符合 Hex 特点的字符串类型
         */
        setShadowColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/输入框
         * @description 获取当前的字体的颜色
         * @effect  只在客户端调用生效
         * @returns 字体颜色，Type.LinearColor类型，数据范围0~1
         */
        get fontColor(): mw.LinearColor;
        /**
         * @groups 界面/控件/输入框
         * @description 设置文本颜色
         * @effect  只在客户端调用生效
         * @param inColor usage:颜色，Type.LinearColor类型，数据范围0~1
         */
        set fontColor(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/输入框
         * @description 设置文本颜色
         * @effect  只在客户端调用生效
         * @param R usage:文本 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:文本 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:文本 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:文本 透明度。 <br> range:[0, 255]  type: 整形
         */
        setFontColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/输入框
         * @description 设置文本颜色，指定 Hex 的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:Hex颜色字符串  range: 符合 Hex 特点的字符串类型
         */
        setFontColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/输入框
         * @description 获取输入框的输入格式
         * @effect  只在客户端调用生效
         * @returns InputTextLimit { 无限制,限制为整数,限制为小数,限制为数字和字母,限制为密码 }
         */
        get inputTextLimit(): mw.InputTextLimit;
        /**
         * @groups 界面/控件/输入框
         * @description 显示输入框的输入格式
         * @effect  只在客户端调用生效
         * @param inLimit usage:无限制,限制为整数,限制为小数,限制为数字和字母,限制为密码
         */
        set inputTextLimit(inLimit: mw.InputTextLimit);
        /**
         * @groups 界面/控件/输入框
         * @description 设置输入框的对齐方式
         * @effect  只在客户端调用生效
         * @param inTextJustification usage:对齐方式
         */
        setTextJustification(inTextJustification: mw.TextJustify): void;
        /**
         * @groups 界面/控件/输入框
         * @description 设置自动换行
         * @effect  只在客户端调用生效
         * @param inAutoWrap usage:是否自动换行
         */
        set autoWrap(inAutoWrap: boolean);
        /**
         * @groups 界面/控件/输入框
         * @description 获取是否自动换行
         * @effect  只在客户端调用生效
         * @returns 是否自动换行
         */
        get autoWrap(): boolean;
        /**
         * @groups 界面/控件/输入框
         * @description 获取输入框的字数限制,字数限制不适用与邮箱格式和密码格式
         * @effect  只在客户端调用生效
         * @returns 获取输入框的字数限制
         */
        get textLengthLimit(): number;
        /**
         * @groups 界面/控件/输入框
         * @description 设置当前输入框的字数限制
         * @effect  只在客户端调用生效
         * @param inTextLength usage:字数限制
         */
        set textLengthLimit(inTextLength: number);
        /**
         * @groups 界面/控件/输入框
         * @description 设置字体大小
         * @effect  只在客户端调用生效
         * @param inSize usage:字体大小
         */
        set fontSize(inSize: number);
        /**
         * @description 获取字体大小
         * @effect  只在客户端调用生效
         * @returns 字体大小
         */
        get fontSize(): number;
        /**
         * @groups 界面/控件/输入框
         * @description 设置字体间距
         * @effect  只在客户端调用生效
         * @param inLetterSpace usage:字体间距
         */
        set fontLetterSpace(inLetterSpace: number);
        /**
         * @groups 界面/控件/输入框
         * @description 获取体间距
         * @effect  只在客户端调用生效
         * @returns 字体间距
         */
        get fontLetterSpace(): number;
        /**
         * @groups 界面/控件/输入框
         * @description 设置错误提示
         * @effect  只在客户端调用生效
         * @param inText usage:错误提示
         */
        set errorText(inText: string);
        /**
         * @groups 界面/控件/输入框
         * @description 获取设置错误提示
         * @effect  只在客户端调用生效
         * @returns 错误提示
         */
        get errorText(): string;
        /**
         * @groups 界面/控件/输入框
         * @description 设置输入框聚焦状态，进入可输入状态
         * @effect  只在客户端调用生效
         */
        focus(): void;
        /**
         * @groups 界面/控件/输入框
         * @description 设置输入框失焦状态，取消输入状态
         * @effect  只在客户端调用生效
         */
        deFocus(): void;
        /**
         * @groups 界面/控件/输入框
         * @description 获取文本的高度(文本内容整体的高度，与组件大小无关，受字体属性影响)
         * @effect  只在客户端调用生效, 控件初始化完成后调用才准确生效，需要等待控件渲染完成
         * @returns 文本高度
         */
        get textHeight(): number;
        /**
         * @groups 界面/控件/输入框
         * @description 获取文本单行高度(文本单行的高度，与组件大小无关，受字体属性影响)
         * @effect  只在客户端调用生效
         * @returns 文本单行高度
         */
        get textSingleHeight(): number;
        /**
         * @groups 界面/控件/输入框
         * @description 插入换行的回车交互，请注意只要触发换行，就无法触发提交文本,可以将枚举通过 “|” 组合在一起设置。
         * @effect  只在客户端调用生效
         */
        set newLineKeyBind(value: mw.InsertNewLineType);
        /**
         * @groups 界面/控件/输入框
         * @description 插入换行的回车交互，请注意只要触发换行，就无法触发提交文本,枚举可能通过 “|” 组合在一起设置。判定支不支持需要通过“&”来判定
         * @effect  只在客户端调用生效
         */
        get newLineKeyBind(): mw.InsertNewLineType;
    }
}

declare namespace mw {
    /**
    * @author maohang.zeng
    * @groups 界面
    * @description 列表视图节点数据基类
    * @networkStatus usage:客户端
    */
    class ListViewItemDataBase {
        constructor();
        /**
         * @description 该节点数据对应的UI
         * @effect 只在客户端调用生效
         */
        get widgetCanvas(): mw.Widget;
        /**
         * @description 该节点数据的唯一标识序号，和位置无关
         * @effect 只在客户端调用生效
         */
        get baseGuid(): number;
        /**
         * @description 获取节点所属的列表视图
         */
        get ownerListView(): any;
    }
    /**
     * @author maohang.zeng
     * @groups 界面/控件/列表视图
     * @description 列表视图
     * @networkStatus usage: 客户端
     */
    class ListView extends mw.Widget {
        /**
         * @description 设置视图节点边距
         * @param padding usage: 设置的边距数据
         */
        set itemPadding(padding: mw.Margin);
        /**
         * @description 获取视图节点边距
         * @return 边距数据
         */
        get itemPadding(): mw.Margin;
        /**
        * @description Item项目节点样式设置
        * @effect  会在重新生成节点时才会生效，不会立刻修改面板上的Item
        */
        get tableRowStyle(): mw.ListItemStyle;
        /**
        * @description 滚动条样式
        * @effect  设置滚动条样式
        */
        get scrollBarStyle(): mw.ScrollbarStyle;
        /**
        * @description 滚动条可见性
        * @effect  设置滚动条可见性
        */
        set scrollBarVisible(bVisible: boolean);
        /**
        * @description 滚动条可见性
        * @effect  设置滚动条可见性
        */
        get scrollBarVisible(): boolean;
        /** ******************************************************************************************************/
        /**
         * @description 刷新数据
         * @effect 只在客户端调用生效
         */
        requestRefresh(): void;
        /**
        * @description 重新设置项目节点数据组
        * @effect 只在客户端调用生效
        * @param newListItems usage:用于替换的新数据组
        */
        resetListItems(newListItems: ListViewItemDataBase[]): void;
        /**
        * @description 添加项目节点数据
        * @effect 只在客户端调用生效
        * @param newListItems usage:新的数据组
        */
        addItems(newListItems: ListViewItemDataBase[]): void;
        /**
        * @description 插入项目节点数据，如果位置越界，则自动插入最后
        * @effect 只在客户端调用生效
        * @param newItem usage:需要插入的新数据
        * @param index usage:插入的位置 range: 无 type: 整形
        */
        insertItem(newItem: ListViewItemDataBase, index: number): void;
        /**
        * @description 移除项目节点数据
        * @effect 只在客户端调用生效
        * @param delItem usage:需要移除的数据
        */
        removeItem(delItem: ListViewItemDataBase): void;
        /**
        * @description 根据索引移除项目节点数据，如果位置越界，则移除失败
        * @effect 只在客户端调用生效
        * @param delIndex usage:需要移除的数据所在位置 range: 无 type: 整形
        */
        removeItemByIndex(delIndex: number): void;
        /**
        * @description 清理数据组
        * @effect 只在客户端调用生效
        */
        clearItems(): void;
        /**
        * @description 根据索引查找对应的项目节点数据，如果位置越界，则返回空
        * @effect 只在客户端调用生效
        * @param index usage:需要查找的数据所在位置 range: 无 type: 整形
        * @returns 返回找到的数据
        */
        findItemByIndex(index: number): ListViewItemDataBase;
        /**
        * @description 清空列表的选中
        * @effect 只在客户端调用生效
        */
        clearSelection(): void;
        /**
        * @description 设置节点选中
        * @effect 只在客户端调用生效
        * @param selectedItems usage:需要修改选中的节点数据
        * @param selected usage:确定修改目标：选中/不选中 range:[true, false]
        * @param selectInfo usage:选中方式：键盘/导航/鼠标/直接选中 default: SelectInfo.Direct
        */
        setSelectionItem(selectedItems: ListViewItemDataBase | ListViewItemDataBase[], selected: boolean, selectInfo?: mw.SelectInfo): void;
        /**
        * @description 根据索引设置节点选中，如果位置越界，则越界对应的操作无效
        * @effect 只在客户端调用生效
        * @param selectedIndexs usage:需要修改选中的节点所在索引
        * @param selected usage:确定修改目标：选中/不选中 range:[true, false]
        * @param selectInfo usage:选中方式：键盘/导航/鼠标/直接选中 default: SelectInfo.Direct
        */
        setSelectionItemByIndex(selectedIndexs: number | number[], selected: boolean, selectInfo?: mw.SelectInfo): void;
        /**
        * @description 获取列表数据
        * @effect 只在客户端调用生效
        * @returns 返回列表数据
        */
        get listItems(): ListViewItemDataBase[];
        /**
        * @description 获取选中节点的索引
        * @effect 只在客户端调用生效
        * @returns 返回选中节点的索引
        */
        getSelectionIndexs(): number[];
        /**
        * @description 获取选中节点的数据
        * @effect 只在客户端调用生效
        * @returns 返回选中节点的数据
        */
        getSelectionItems(): ListViewItemDataBase[];
        /**
        * @description 设置选中模式
        * @effect 只在客户端调用生效
        * @param newSelectionMode usage:选中模式
        */
        set selectionMode(newSelectionMode: mw.SelectionMode);
        /**
        * @description 获取选中模式
        * @effect 只在客户端调用生效
        * @returns 返回选中模式
        */
        get selectionMode(): mw.SelectionMode;
        /**
        * @description 获取当前滚动条偏移位置
        * @effect 只在客户端调用生效
        * @returns 返回当前滚动条偏移位置
        */
        get scrollOffset(): number;
        /**
        * @description 设置当前滚动条偏移位置
        * @effect 只在客户端调用生效
        * @param scrollOffset usage:偏移量，0为初始，1为最后
        */
        set scrollOffset(scrollOffset: number);
        /**
        * @description 滚动条定位到对应项目的位置
        * @effect 只在客户端调用生效
        * @param targetItem usage:目标定位项目
        */
        scrollIntoView(targetItem: ListViewItemDataBase): void;
        /**
        * @description 设置是否在点击空白后清除选中项（仅初始化时设置有效）
        * @effect 只在客户端调用生效
        * @param clearSelectionOnClick usage:是否在点击空白后清除选中项
        */
        set clearSelectionOnClick(clearSelection: boolean);
        /**
         * @description 返回悬停状态改变代理
         * @effect只在客户端调用生效
         * @returns 返回选择修改代理
         */
        get onItemHoverChanged(): mw.MulticastDelegate<(targetItem: mw.Widget, hovered: boolean) => void>;
        /**
         * @description 子控件移除显示时调用，等待复用前
         * @effect只在客户端调用生效
         * @returns 返回选择修改代理
         */
        get onItemReleaseShow(): mw.MulticastDelegate<(targetItem: mw.Widget) => void>;
        /**
         * @description 返回点击代理
         * @effect只在客户端调用生效
         * @returns 返回点击代理
         */
        get onItemClicked(): mw.MulticastDelegate<(clickedItem: ListViewItemDataBase, doubleClick: boolean) => void>;
        /**
         * @description 返回选择修改代理,取消选中/清空也会触发选中修改，返回参数selectedItem == null, 请注意判断
         * @effect 只在客户端调用生效
         * @returns 返回选择修改代理
         */
        get onItemSelected(): mw.MulticastDelegate<(selectedItem: ListViewItemDataBase, selectType: mw.SelectInfo) => void>;
        /**
         * @description 返回UI刷新生成同步代理
         * @effect 只在客户端调用生效
         * @returns 返回UI刷新生成同步代理
         */
        get onItemRefreshed(): mw.MulticastDelegate<(rowDatas: ListViewItemDataBase[]) => void>;
        /**
        * @description 设置是否受Touch事件影响滚动
        * @effect 只在客户端调用生效
        * @param bCanControl usage:能否touch控制滚动
        */
        setTouchCanControlThisScroll(bCanControl: boolean): void;
        /**
        * @description 获取是否受Touch事件影响滚动
        * @effect 只在客户端调用生效
        * @returns 能否touch能控制滚动
        */
        getTouchCanControlThisScroll(): boolean;
        /**
         * @description 创建 ListView 控件，当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect 只在客户端调用生效
         * @param orientation usage: 朝向
         * @param uiAssetGUID usage: 设置视图绑定的节点UI range: 无
         * @param parent usage:创建控件的外parent对象 default:null
         * @param inName usage:创建控件的名称 default:null range: 无 default:null
         * @returns 创建的对象
         */
        static newObject(orientation: mw.Orientation, uiAssetGUID: string, parent?: mw.Canvas, inName?: string): ListView;
    }
}

declare namespace mw {
    /**
     * @author jianke.feng
     * @groups 界面/控件/遮罩按钮
     * @description 遮罩按钮
     * @networkStatus usage:客户端
     */
    class MaskButton extends mw.Widget {
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 创建 Mask 控件
         * @description 当 parent 和 InName 与已有的对象相同时，旧的对象会被销毁
         * @effect 只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default: null
         * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): MaskButton;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置是否获取输入焦点
         * @effect  只在客户端调用生效
         * @param inFocus usage:是否获取输入焦点
         */
        set focusable(inFocus: boolean);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取是否获取输入焦点
         * @effect  只在客户端调用生效
         * @returns 是否获取输入焦点
         */
        get focusable(): boolean;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 按钮是否启用过度模式,按下是否有效果
         * @effect  只在客户端调用生效
         * @returns 按钮是否启用过度模式
         */
        get isTransitionEnable(): boolean;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 是否套用不同的按下方案
         * @effect  只在客户端调用生效
         * @param inBoolean usage:是否套用不同的按下方案
         */
        set enableTransition(inBoolean: boolean);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 点击事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
        */
        get clickedDelegate(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 按下事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
        */
        get pressedDelegate(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 释放事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get releasedDelegate(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 悬浮事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get hoveredDelegate(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 未悬浮事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get unHoveredDelegate(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 是否按下
         * @effect  只在客户端调用生效
         * @returns 返回按钮是否按下
         */
        isPressed(): boolean;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取点击模式
         * @effect  只在客户端调用生效
         * @returns 点击模式
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:042 reason:接口与touchMethod功能合并 replacement:touchMethod
         */
        get clickMethod(): mw.ButtonClickMethod;
        /**
         * @groups 界面/控件/按钮
         * @description 设置点击模式
         * @effect  只在客户端调用生效
         * @param inClickMethod usage:点击模式选择
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:042 reason:接口touchMethod功能合并 replacement:touchMethod
         */
        set clickMethod(inClickMethod: mw.ButtonClickMethod);
        /**
         * @groups 界面/控件/按钮
         * @description 设置触摸模式
         * @effect  只在客户端调用生效
         * @param inTouchMethod usage:Touch模式选择
         */
        set touchMethod(inTouchMethod: mw.ButtonTouchMethod);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取触摸模式
         * @effect  只在客户端调用生效
         * @returns 触摸模式
         */
        get touchMethod(): mw.ButtonTouchMethod;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置按压模式
         * @effect  只在客户端调用生效
         *  @param inPressedMethod usage:Press模式选择
         */
        set pressedMethod(inPressedMethod: mw.ButtonPressMethod);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取按压模式
         * @effect  只在客户端调用生效
         * @returns 按压模式
         */
        get pressedMethod(): mw.ButtonPressMethod;
        /** ************************************************* 普通图片  ******************************************************/
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 获取普通图片ID
        * @effect  只在客户端调用生效
        * @returns 普通图片ID
        */
        get normalImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置普通图片ID
         * @effect  只在客户端调用生效
         * @param inGuid usage:图片id
         */
        set normalImageGuid(inGuid: string);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置图片大小
         * @effect  只在客户端调用生效
         * @param inSize usage:大小
         */
        set normalImageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取图片大小
         * @effect  只在客户端调用生效
         * @returns 普通图片大小
         */
        get normalImageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 设置普通图片颜色
        * @effect  只在客户端调用生效
        * @param inNormalColor usage:颜色，Type.LinearColor类型，数据范围0~1
        */
        set normalImageColor(inNormalColor: mw.LinearColor);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取普通图片颜色
         * @effect  只在客户端调用生效
         * @returns 普通图片颜色，Type.LinearColor类型，数据范围0~1
         */
        get normalImageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 设置普通图片颜色
        * @effect  只在客户端调用生效
        * @param R usage:颜色 R 值。 <br> range:[0, 255]  type: 整形
        * @param G usage:颜色 G 值。 <br> range:[0, 255]  type: 整形
        * @param B usage:颜色 B 值。 <br> range:[0, 255]  type: 整形
        * @param A usage:颜色 透明度。 <br> range:[0, 255]  type: 整形
        */
        setNormalImageColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 设置普通图片颜色指定Hex的颜色文本设定颜色 #05050505
        * @effect  只在客户端调用生效
        * @param inHexString usage:颜色字符串  range: 符合 Hex 特点的字符串类型
        */
        setNormalImageColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置普通图片绘制类型
         * @effect  只在客户端调用生效
         * @param inDrawType usage:类型
         */
        set normalImageDrawType(inDrawType: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取普通图片绘制类型
         * @effect  只在客户端调用生效
         * @returns 普通图片绘制类型
         */
        get normalImageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 获取普通图片边距
        * @effect  只在客户端调用生效
        * @returns 普通图片边距
        */
        get normalImageMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置普通图片边距
         * @effect  只在客户端调用生效
         * @param inMargin usage:普通图片边距
         */
        set normalImageMargin(inMargin: mw.Margin);
        /** ************************************************* 按压图片  ******************************************************/
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 获取按下图片ID
        * @effect  只在客户端调用生效
        * @returns 按下图片ID
        */
        get pressedImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置按下图片ID
         * @effect  只在客户端调用生效
         * @param inGuid usage:图片id
         */
        set pressedImageGuid(inGuid: string);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置按压图片大小
         * @effect  只在客户端调用生效
         * @param inSize usage:大小
         */
        set pressedImageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取按压图片大小
         * @effect  只在客户端调用生效
         * @returns 按压图片大小
         */
        get pressedImageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 设置按压图片颜色
        * @effect  只在客户端调用生效
        * @param inColor usage:颜色，Type.LinearColor类型，数据范围0~1
        */
        set pressedImageColor(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取按压图片颜色
         * @effect  只在客户端调用生效
         * @returns 按压图片颜色，Type.LinearColor类型，数据范围0~1
         */
        get pressedImageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置按压图片颜色
         * @effect  只在客户端调用生效
         * @param R usage:颜色 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:颜色 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:颜色 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:颜色 透明度。 <br> range:[0, 255]  type: 整形
         */
        setPressedImageColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 设置按压图片颜色指定Hex的颜色文本设定颜色 #05050505
        * @effect  只在客户端调用生效
        * @param inHexString usage:颜色字符串  range: 符合 Hex 特点的字符串类型
        */
        setPressedImageColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置按压图片绘制类型
         * @effect  只在客户端调用生效
         * @param inDrawType usage:类型
         */
        set pressedImageDrawType(inDrawType: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取按压图片绘制类型
         * @effect  只在客户端调用生效
         * @returns 按压图片绘制类型
         */
        get pressedImageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 获取按压图片边距
        * @effect  只在客户端调用生效
        * @returns 按压图片边距
        */
        get pressedImageMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置按压图片边距
         * @effect  只在客户端调用生效
         * @param inMargin usage:按压图片边距
         */
        set pressedImageMargin(inMargin: mw.Margin);
        /** ************************************************* 禁用图片  ******************************************************/
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 获取禁用图片ID
        * @effect  只在客户端调用生效
        * @returns 禁用图片ID
        */
        get disableImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置不可用图片ID
         * @effect  只在客户端调用生效
         * @param inGuid usage:图片id
         */
        set disableImageGuid(inGuid: string);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置禁用图片大小
         * @effect  只在客户端调用生效
        * @param inSize usage:大小
        */
        set disableImageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取禁用图片大小
         * @effect  只在客户端调用生效
         * @returns 禁用图片大小
         */
        get disableImageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 设置禁用图片颜色
        * @effect  只在客户端调用生效
        * @param inColor usage:颜色，Type.LinearColor类型，数据范围0~1
        */
        set disableImageColor(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取禁用图片颜色
         * @effect  只在客户端调用生效
         * @returns 禁用图片颜色，Type.LinearColor类型，数据范围0~1
         */
        get disableImageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置禁用颜色
         * @effect  只在客户端调用生效
         * @param R usage:颜色 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:颜色 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:颜色 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:颜色 透明度。 <br> range:[0, 255]  type: 整形
         */
        setDisableImageColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置不可用颜色指定Hex的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:颜色字符串  range: 符合 Hex 特点的字符串类型
         */
        setDisableImageColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 获取禁用图片绘制类型
        * @effect  只在客户端调用生效
        * @returns 禁用图片绘制类型
        */
        get disableImageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 设置禁用图片绘制类型
        * @effect  只在客户端调用生效
        * @returns 禁用图片绘制类型
        */
        set disableImageDrawType(inDrawType: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取禁用图片边距
         * @effect  只在客户端调用生效
         * @returns 禁用图片边距
         */
        get disableImageMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 设置禁用图片边距
        * @effect  只在客户端调用生效
        * @param inMargin usage:禁用图片边距
        */
        set disableImageMargin(inMargin: mw.Margin);
        /** ************************************************* 遮罩图片  ******************************************************/
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置遮罩图片ID
         * @effect  只在客户端调用生效
         * @param inGuid usage:图片id
         */
        set maskImageGuid(InGuid: string);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取设置遮罩图片ID
         * @effect 只在客户端调用生效
         * @returns 遮罩图片ID
         */
        get maskImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置遮罩图片颜色
         * @effect  只在客户端调用生效
         * @param inColor usage:颜色，Type.LinearColor类型，数据范围0~1
         */
        set maskImageColor(inColor: Readonly<mw.LinearColor>);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取遮罩图片颜色
         * @effect  只在客户端调用生效
         * @returns 图片的颜色，Type.LinearColor类型，数据范围0~1
         */
        get maskImageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置遮罩图片颜色
         * @effect  只在客户端调用生效
         * @param R usage:颜色 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:颜色 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:颜色 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:颜色 透明度。 <br> range:[0, 255]  type: 整形
         */
        setMaskImageColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 设置遮罩图片颜色指定Hex的颜色文本设定颜色 #05050505
        * @effect  只在客户端调用生效
        * @param inHexString usage:颜色字符串  range: 符合 Hex 特点的字符串类型
        */
        setMaskImageColorByHex(inHexString: string): void;
        /** ************************************************* 遮罩样式  ******************************************************/
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置遮罩裁剪类型
         * @effect  只在客户端调用生效
         * @param inType 裁剪类型
         */
        set maskType(inType: mw.MaskButtonType);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取遮罩裁剪类型
         * @effect  只在客户端调用生效
         * @returns 裁剪类型
         */
        get maskType(): mw.MaskButtonType;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置遮挡处的遮挡图的透明度
         * @effect  只在客户端调用生效
         * @param o 透明度
         */
        set maskTextureOpacity(o: number);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取遮挡处的遮挡图的透明度
         * @effect  只在客户端调用生效
         * @returns 透明度
         */
        get maskTextureOpacity(): number;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置遮挡处的底图的透明度
         * @effect  只在客户端调用生效
         * @param o 透明度
         */
        set maskOpacity(o: number);
        /**
         * @groups 界面/控件/遮罩按钮
        * @description 获取遮挡处的底图的透明度
        * @effect  只在客户端调用生效
        * @returns 透明度
        */
        get maskOpacity(): number;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置遮罩轮廓是否裁剪底图
         * @effect  只在客户端调用生效
         * @param inUseWeight 是否裁剪
         */
        set useMaskTextureOpacity(inUseWeight: boolean);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取遮罩轮廓是否裁剪底图
         * @effect  只在客户端调用生效
         * @returns  权重
         */
        get useMaskTextureOpacity(): boolean;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 反转透明度权重
         * @effect  只在客户端调用生效
         * @param inverseOpacityWeight 权重
         */
        set inverseOpacity(inverseOpacityWeight: boolean);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取反转透明度权重
         * @effect  只在客户端调用生效
         * @returns 权重
         */
        get inverseOpacity(): boolean;
        /** ************************************************扇形******************************************************************************** */
        /**
         * @groups 界面/控件/遮罩按钮
         * @description  设置扇形遮罩的中心旋转点
         * @effect  只在客户端调用生效
         * @param center usage:中心点百分比
         */
        set fanShapedRotatedCenter(center: mw.Vector2);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取扇形遮罩的中心旋转点
         * @effect  只在客户端调用生效
         * @returns 旋转中心百分点
         */
        get fanShapedRotatedCenter(): mw.Vector2;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置扇形遮罩的旋转
         * @effect  只在客户端调用生效
         * @param value usage:旋转角度 0 ~ 1
         */
        set fanShapedRotated(value: number);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取扇形遮罩的旋转
         * @effect  只在客户端调用生效
         * @returns 旋转角度 0~1
         */
        get fanShapedRotated(): number;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置扇形遮罩的遮罩进度
         * @effect  只在客户端调用生效
         * @param value usage:百分进度值
         */
        set fanShapedValue(value: number);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取扇形遮罩的遮罩进度
         * @effect  只在客户端调用生效
         * @returns 进度值
         */
        get fanShapedValue(): number;
        /** *******************************************圆形********************************************************** */
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置圆形遮罩的中心旋转点
         * @effect  只在客户端调用生效
         * @param center usage:中心点百分比
         */
        set circleCenter(center: mw.Vector2);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取圆形遮罩的中心旋转点
         * @effect  只在客户端调用生效
         * @returns 中心百分点
         */
        get circleCenter(): mw.Vector2;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置圆形遮罩的遮挡百分值
         *  @effect  只在客户端调用生效
         * @param value usage:百分进度值,0~1
         */
        set circleValue(value: number);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取圆形遮罩的遮挡百分值
         * @effect  只在客户端调用生效
         * @returns 进度值,0~1
         */
        get circleValue(): number;
        /** **************************************************矩形******************************************************* */
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置矩形大小边距偏移
         * @effect  只在客户端调用生效
         * @param percent usage:矩形大小百分比，0~0.5
         */
        set roundBoxPercentOffset(percent: mw.Vector2);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取矩形百分比大小边距偏移
         * @effect  只在客户端调用生效
         * @returns 矩形大小边距偏移的百分比占据，0~0.5
         */
        get roundBoxPercentOffset(): mw.Vector2;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置角半径
         * @param value 角半径百分比
         */
        set roundBoxRadius(value: number);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取设置的角半径
         * @returns 角半径百分比
         */
        get roundBoxRadius(): number;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置的圆角锐化度
         * @param v usage:锐化度
         */
        set roundBoxSharpness(v: number);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取设置的圆角锐化度
         * @returns 锐化度
         */
        get roundBoxSharpness(): number;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 设置圆角调节大小
         * @param v usage:圆角调节大小
         */
        set roundBoxUVRatio(v: number);
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取圆角调节大小
         * @returns 圆角调节大小
         */
        get roundBoxUVRatio(): number;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 同一按键同时只能操控一个UI控件，最新绑定的UI控件会覆盖之前的绑定；脚本中添加的绑定无法覆盖编辑器按键绑定菜单中绑定相同按键的UI控件，但当两个UI控件分别通过代码和菜单绑定到同一按键时，使用代码绑定的优先级更高
         * @effect 只在客户端调用生效
         * @param  key usage:绑定的按键
         */
        addKey(key: mw.Keys): void;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 此操作只会解绑动态绑定的按键无法解除编辑器按键绑定菜单中绑定的按键
         * @effect 只在客户端调用生效
         * @param  key usage:解除绑定的按键
         */
        removeKey(key: mw.Keys): void;
        /**
         * @groups 界面/控件/遮罩按钮
         * @description 获取当前UI控件绑定的所有键盘按键，包括编辑器按键绑定菜单和用代码绑定的按键
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         * @returns 返回当前控件绑定的所有按键,可能为空
         */
        getKeys(): mw.Keys[];
    }
}

declare namespace mw {
    /**
     * @author jie.wu
     * @groups 界面/控件/容器
     * @description 遮罩容器
     * @description ----------------------
     * @description 类继承widget，自带添加、移除子级控件的功能
     * @networkStatus usage:客户端
     */
    class Mask extends mw.Widget {
        /**
         * @description 创建Canvas控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect  只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default:null
         * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): Mask;
        /**
         * @description 获取MaskImage的ImageInfo
         * @description 自定义图片遮罩 专属属性
         * @effect 只在客户端调用生效
         * @returns ImageInfo
         */
        get maskImageInfo(): mw.ImageInfo;
        /**
         * @description 获取透明度门槛值
         * @description 只有当自定义图片的像素的 alpha 大于等于 alphaThreshold 时，才会绘制内容。当被设置为 1 时，会丢弃所有像素，所以不会显示任何内容
         * @description 自定义图片遮罩 专属属性
         * @effect 只在客户端调用生效
         * @returns 透明度门槛值
         */
        get alphaThreshold(): number;
        /**
         * @description 设置透明度门槛值
         * @description 只有当自定义图片的像素的 alpha 大于等于 alphaThreshold 时，才会绘制内容。当被设置为 1 时，会丢弃所有像素，所以不会显示任何内容
         * @description 自定义图片遮罩 专属属性
         * @effect 只在客户端调用生效
         * @param inAlphaThreshold  输入的透明度门槛值
         */
        set alphaThreshold(inAlphaThreshold: number);
        /**
         * @description 获取角半径值
         * @description 矩形遮罩 专有属性
         * @effect 只在客户端调用生效
         * @returns 角半径值
         */
        get cornerRadius(): number;
        /**
         * @description 设置角半径值
         * @description 矩形遮罩 专有属性
         * @effect 只在客户端调用生效
         * @param inCornerRadius 角半径值
         */
        set cornerRadius(inCornerRadius: number);
        /**
         * @description 获取是否开启反向遮罩
         * @effect 只在客户端调用生效
         * @returns 是否开启反向遮罩
         */
        get inverted(): boolean;
        /**
         * @description 设置反向遮罩
         * @effect 只在客户端调用生效
         * @param inInverted  是否开启反向遮罩
         */
        set inverted(inInverted: boolean);
        /**
         * @description 获取遮罩类型
         * @effect 只在客户端调用生效
         * @returns 遮罩类型
         */
        get type(): mw.MaskType;
        /**
         * @description 设置遮罩类型
         * @effect 只在客户端调用生效
         * @param maskType  遮罩类型
         */
        set type(maskType: mw.MaskType);
    }
}

declare namespace mw {
    /**
     * @author wei.yang
     * @groups 界面
     * @description 菜单项节点信息
     * @networkStatus usage:客户端
     */
    class MenuItemInfo {
        /**
         * @description 构造函数
         * @param id usage: 用于校验的Id range: 无
         */
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
    /**
     * @author jianke.feng
     * @groups 界面/控件/菜单锚点
     * @description 菜单锚点
     * @networkStatus usage:客户端
     */
    class MenuAnchor extends mw.Widget {
    }
}

declare namespace mw {
    /**
    * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason: 删除接口 replacement:挂载相关功能已全移动到 Widget 控件
    * @author jie.wu
    * @groups 界面/控件
    * @description UI 控件中，可以挂载子控件的父类。
    * @description ---------------------
    * @description 注：029版本会更新，此类会废弃，所有的控件均可挂载子控件。029之前的版本只允许 ScrollBox、Canvas、Button挂载子控件。
    * @networkStatus usage:客户端
    */
    class PanelWidget extends mw.Widget {
    }
}

declare namespace mw {
    /**
     * @author jie.wu
     * @groups 界面/控件/进度条
     * @description 进度条
     * @networkStatus usage:客户端
     */
    class ProgressBar extends mw.Widget {
        /**
         * @groups 界面/控件/进度条
         * @description 创建 ProgressBar 控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect 只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default:null
         * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): ProgressBar;
        /**
         * @groups 界面/控件/进度条
         * @description 获取进度条填充的方式
         * @effect 只在客户端调用生效
         * @returns 进度条填充
         */
        get fillType(): mw.ProgressBarFillType;
        /**
         * @groups 界面/控件/进度条
         * @description 设置进度条填充的方式
         * @effect 只在客户端调用生效
         * @param inType usage:{ 从左到右,从右到左,从上到下,从下到上 }
         * @returns  void
         */
        set fillType(inType: mw.ProgressBarFillType);
        /** ************************************************* 背景图片  ******************************************************/
        /**
         * @groups 界面/控件/进度条
         * @description 设置进度条背景图片
         * @effect 只在客户端调用生效
         * @param inGUID usage:图片GUID
         * @returns  void
         */
        set backgroundImageGuid(inGUID: string);
        /**
         * @groups 界面/控件/进度条
         * @description 获取背景图片id
         * @effect 只在客户端调用生效
         * @returns 背景图片id
         */
        get backgroundImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/进度条
         * @description 获取进度条背景图片边距
         * @effect 只在客户端调用生效
         * @returns 进度条背景图片边距
         */
        get backgroundImageMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/进度条
         * @description 设置进度条背景图片边距
         * @effect 只在客户端调用生效
         * @param inMargin usage:进度条背景图片边距
         */
        set backgroundImageMargin(inMargin: mw.Margin);
        /**
         * @groups 界面/控件/进度条
         * @description 设置背景图片大小
         * @effect 只在客户端调用生效
         * @param inSize usage:图片大小
         */
        set backgroundImageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/进度条
         * @description 获取背景图片大小
         * @effect 只在客户端调用生效
         * @returns 图片大小
         */
        get backgroundImageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/进度条
        * @description 设置背景图片颜色
        * @effect 只在客户端调用生效
        * @param inColor usage:背景颜色，Type.LinearColor类型，数据范围0~1
        */
        set backgroundImageColor(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/进度条
        * @description 获取背景图片颜色
        * @effect 只在客户端调用生效
        * @returns 背景图片颜色，Type.LinearColor类型，数据范围0~1
        */
        get backgroundImageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/进度条
         * @description 设置背景图片绘制类型
         * @effect 只在客户端调用生效
         * @param InDrawType usage:Brush类型
         */
        set backgroundImageDrawType(InDrawType: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/进度条
         * @description 获取背景图片绘制类型
         * @effect 只在客户端调用生效
         * @returns 背景图片绘制类型
         */
        get backgroundImageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /** ************************************************* 填充图片  ******************************************************/
        /**
         * @groups 界面/控件/进度条
         * @description 设置进度条图片
         * @effect 只在客户端调用生效
         * @param inGUID usage:图片GUID
         * @returns  void
         */
        set fillImageGuid(inGUID: string);
        /**
         * @groups 界面/控件/进度条
         * @description 获取填充区图片id
         * @effect 只在客户端调用生效
         * @returns 填充区图片id
         */
        get fillImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/进度条
         * @description 获取进度条图片边距
         * @effect 只在客户端调用生效
         * @returns 进度条图片边距
         */
        get fillImageMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/进度条
         * @description 设置进度条图片边距
         * @effect 只在客户端调用生效
         * @param inMargin usage:进度条图片边距
         */
        set fillImageMargin(inMargin: mw.Margin);
        /**
         * @groups 界面/控件/进度条
          * @description 设置填充图片大小
          * @effect 只在客户端调用生效
          * @param inSize usage:大小
          */
        set fillImageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/进度条
         * @description 获取填充图片大小
         * @effect 只在客户端调用生效
         * @returns 图片大小
         */
        get fillImageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/进度条
         * @description 设置填充图片颜色
         * @effect 只在客户端调用生效
         * @param inColor usage:设置的颜色，Type.LinearColor类型，数据范围0~1
         */
        set fillImageColor(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/进度条
         * @description 获取填充图片颜色
         * @effect 只在客户端调用生效
         * @returns 填充图片颜色，Type.LinearColor类型，数据范围0~1
         */
        get fillImageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/进度条
         * @description 设置填充图片绘制类型
         * @effect 只在客户端调用生效
         * @param inDrawType usage:填充类型
         */
        set fillImageDrawType(inDrawType: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/进度条
         * @description 获取填充图片绘制类型
         * @effect 只在客户端调用生效
         * @returns 填充图片绘制类型
         */
        get fillImageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /** ************************************************* 滑块图片  ******************************************************/
        /**
         * @groups 界面/控件/进度条
         * @description 设置拖动条的样式
         * @effect 只在客户端调用生效
         * @param inGUID usage:拖动条样式GUID
         * @returns  void
         */
        set thumbImageGuid(inGUID: string);
        /**
         * @groups 界面/控件/进度条
          * @description 获取填充区图片id
          * @effect 只在客户端调用生效
          * @returns 填充区图片id
          */
        get thumbImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/进度条
         * @description 获取拖动条图片边距
         * @effect 只在客户端调用生效
         * @returns 拖动条图片边距
         */
        get thumbImageMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/进度条
         * @description 设置拖动条图片边距
         * @effect 只在客户端调用生效
         * @param inMargin usage:拖动条图片边距
         */
        set thumbImageMargin(inMargin: mw.Margin);
        /**
         * @groups 界面/控件/进度条
         * @description 设置滑块图片大小
         * @effect 只在客户端调用生效
         * @param inSize usage:滑块图片大小
         */
        set thumbImageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/进度条
         * @description 获取滑块图片大小
         * @effect 只在客户端调用生效
         * @returns 图片大小
         */
        get thumbImageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/进度条
         * @description 设置滑块图片颜色
         * @effect 只在客户端调用生效
         * @param inColor usage:设置的颜色，Type.LinearColor类型，数据范围0~1
         */
        set thumbImageColor(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/进度条
         * @description 获取滑块图片颜色
         * @effect 只在客户端调用生效
         *  @returns 滑块图片颜色，Type.LinearColor类型，数据范围0~1
         */
        get thumbImageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/进度条
         * @description 设置滑块图片绘制类型
         * @effect 只在客户端调用生效
         * @param inDrawType usage:绘制类型
         */
        set thumbImageDrawType(inDrawType: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/进度条
         * @description 获取滑块图片绘制类型
         * @effect 只在客户端调用生效
         * @returns 滑块图片绘制类型
         */
        get thumbImageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /**
         * @groups 界面/控件/进度条
         * @description 获取当前值
         * @effect 只在客户端调用生效
         * @returns 当前值
         */
        get currentValue(): number;
        /**
         * @groups 界面/控件/进度条
         * @description 设置当前值
         * @effect 只在客户端调用生效
         * @param inValue  usage:当前值
         * @returns  void
         */
        set currentValue(inValue: number);
        /**
         * @groups 界面/控件/进度条
         * @description 获取拖动条最小值
         * @effect 只在客户端调用生效
         * @returns 拖动条最小值
         */
        get sliderMinValue(): number;
        /**
         * @groups 界面/控件/进度条
         * @description 设置拖动条的最小值
         * @effect 只在客户端调用生效
         * @param inValue usage:拖动条最小值
         * @returns  void
         */
        set sliderMinValue(inValue: number);
        /**
         * @groups 界面/控件/进度条
         * @description 获取拖动条最大值
         * @effect 只在客户端调用生效
         * @returns 拖动条最大值
         */
        get sliderMaxValue(): number;
        /**
         * @groups 界面/控件/进度条
         * @description 设置拖动条的最大值
         * @effect 只在客户端调用生效
         * @param inValue usage:拖动条最大值
         * @returns  void
         */
        set sliderMaxValue(inValue: number);
        /**
         * @groups 界面/控件/进度条
         * @description 获取当前百分比
         * @effect 只在客户端调用生效
         * @returns 当前百分比
         */
        get percent(): number;
        /**
         * @groups 界面/控件/进度条
         * @description 设置当前百分比
         * @effect 只在客户端调用生效
         * @param inPercent usage:百分比
         * @returns  void
         */
        set percent(inPercent: number);
        /**
         * @groups 界面/控件/进度条
         * @description 获取当前数值是否取整
         * @effect 只在客户端调用生效
         * @returns 当前数值是否取整
         */
        get isRoundedToInt(): boolean;
        /**
         * @groups 界面/控件/进度条
         * @description 设置当前数值是否取整
         * @effect 只在客户端调用生效
         * @param inToInt usage:是否取整
         * @returns  void
         */
        set isRoundedToInt(inToInt: boolean);
        /**
         * @groups 界面/控件/进度条
         * @description Slider值变化事件
         * @effect 只在客户端调用生效
         * @returns 变化事件
         */
        get onSliderValueChanged(): mw.MulticastDelegate<(CurrentValue: number) => void>;
        /**
         * @groups 界面/控件/进度条
          * @description 获取进度条的滑动方式
          * @effect 只在客户端调用生效
          */
        get slideMethod(): mw.SlideMethod;
        /**
         * @groups 界面/控件/进度条
         * @description 设置进度条的滑动方式
         * @effect 只在客户端调用生效
         * @param setSlideMethod usage:进度条的滑动方式
         */
        set slideMethod(inSlideMethod: mw.SlideMethod);
        /**
         * @groups 界面/控件/进度条
         * @description Slider按下事件
         * @effect 只在客户端调用生效
         * @returns 按下事件
         */
        get sliderButtonPressDelegate(): mw.MulticastDelegate<(CurrentValue: number) => void>;
        /**
         * @groups 界面/控件/进度条
         * @description Slider抬起事件
         * @effect 只在客户端调用生效
         * @returns 抬起事件
         */
        get sliderButtonReleaseDelegate(): mw.MulticastDelegate<(CurrentValue: number) => void>;
        /**
         * @groups 界面/控件/进度条
         * @description 获取进度条厚度
         * @effect  只在客户端调用生效
         * @returns 厚度
         */
        get barThickness(): number;
        /**
         * @groups 界面/控件/进度条
         * @description 设置进度条厚度
         * @effect  只在客户端调用生效
         * @param inputBarThickness usage:厚度
         */
        set barThickness(inputBarThickness: number);
    }
}

declare namespace mw {
    /**
   * @author jie.wu
   * @groups 界面/控件/滚动框
   * @description 滑动框
   * @networkStatus usage:客户端
   */
    class ScrollBox extends mw.PanelWidget {
        /**
         * @groups 界面/控件/滚动框
         * @description 创建 ScrollBox 控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect  只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default:null
         * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): ScrollBox;
        /**
         * @groups 界面/控件/滚动框
         * @description 滚动事件
         * @effect  只在客户端调用生效
         * @returns 滚动事件
         */
        get onUserScrolled(): mw.MulticastDelegate<(currentOffset: number) => void>;
        /**
         * @groups 界面/控件/滚动框
         * @description 滚动结束事件
         * @effect 只在客户端调用生效
         * @returns 滚动结束事件
         */
        get onScrollEnd(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/滚动框
         * @description 设置滚动方向
         * @effect  只在客户端调用生效
         * @param inOrientation usage:方向
         * @returns 滚动方向
         */
        set orientation(inOrientation: mw.Orientation);
        /**
         * @groups 界面/控件/滚动框
         * @description 获取滚动方向
         * @effect  只在客户端调用生效
         * @returns 滚动方向
         */
        get orientation(): mw.Orientation;
        /**
         * @groups 界面/控件/滚动框
         * @description 设置滚动条是否可见,必须是在SetAlwaysShowScrollbar 为false才生效
         * @effect  只在客户端调用生效
         * @param inScrollBarVisibility usage:滚动条是否可见
         */
        set scrollBarVisibility(inScrollBarVisibility: mw.SlateVisibility);
        /**
         * @groups 界面/控件/滚动框
         * @description 获取滚动条的显示于隐藏
         * @effect  只在客户端调用生效
         * @returns 滚动条的显示于隐藏
         */
        get scrollBarVisibility(): mw.SlateVisibility;
        /**
         * @groups 界面/控件/滚动框
         * @description 设置滚动条粗细
         * @effect  只在客户端调用生效
         * @param inScrollbarThickness usage:滚动条粗细
         */
        set scrollbarThickness(inScrollbarThickness: number);
        /**
         * @groups 界面/控件/滚动框
         * @description 获取滚动条粗细
         * @effect  只在客户端调用生效
         * @returns 滚动条粗细
         */
        get scrollbarThickness(): number;
        /**
         * @groups 界面/控件/滚动框
         * @description 设置滚动条边距
         * @effect  只在客户端调用生效
         * @param inScrollbarPadding usage:滚动条边距
         */
        set scrollbarPadding(inScrollbarPadding: mw.Margin);
        /**
         * @groups 界面/控件/滚动框
         * @description 设置是否一直显示滚动条
         * @effect  只在客户端调用生效
         * @param isScrollBarAlwaysShown usage:是否一直显示滚动条
         */
        set alwaysShowScrollBar(isScrollBarAlwaysShown: boolean);
        /**
         * @groups 界面/控件/滚动框
         * @description 获取是否一直显示滚动条
         * @effect  只在客户端调用生效
         * @returns 是否一直显示滚动条
         */
        get alwaysShowScrollBar(): boolean;
        /**
         * @groups 界面/控件/滚动框
         * @description 设置允许滚动超过滚动框大小
         * @effect  只在客户端调用生效
         * @param isAllowOverscroll usage:允许滚动超过滚动框大小
         */
        set allowOverscroll(isAllowOverscroll: boolean);
        /**
         * @groups 界面/控件/滚动框
         * @description 设定鼠标滚动时，滚动速度是否插值运算,限制滚动速度更平滑
         * @effect  只在客户端调用生效
         * @param isSmoothScrolling usage:鼠标滚动时，滚动速度是否插值运算
         */
        set smoothScrollingEnable(isSmoothScrolling: boolean);
        /**
         * @groups 界面/控件/滚动框
         * @description 设置鼠标滚轮系数
         * @effect  只在客户端调用生效
         * @param inScrollWheelMultiplier usage:系数
         * @returns 鼠标滚轮系数
         */
        set scrollWheelMultiplier(inScrollWheelMultiplier: number);
        /**
         * @groups 界面/控件/滚动框
         * @description 立刻停止滚动
         * @effect  只在客户端调用生效
         */
        endInertialScrolling(): void;
        /**
         * @groups 界面/控件/滚动框
         * @description 设定滚动框滚动偏移
         * @effect  只在客户端调用生效
         * @param inScrollOffset usage:滚动偏移
         */
        set scrollOffset(inScrollOffset: number);
        /**
         * @groups 界面/控件/滚动框
         * @description 获取滚动框偏移
         * @effect  只在客户端调用生效
         * @returns 滚动框偏移
         */
        get scrollOffset(): number;
        /**
         * @groups 界面/控件/滚动框
         * @description 获取滚动框距离底部的偏移
         * @effect  只在客户端调用生效
         * @returns 滚动框偏移
         */
        get scrollOffsetOfEnd(): number;
        /**
         * @groups 界面/控件/滚动框
         * @description 获取滚动框距离底部的偏移比例
         * @effect  只在客户端调用生效
         * @returns 滚动框偏移比例
         */
        get scrollOffsetFraction(): number;
        /**
         * @groups 界面/控件/滚动框
         * @description 滚动到开始位置
         * @effect  只在客户端调用生效
         */
        scrollToStart(): void;
        /**
         * @groups 界面/控件/滚动框
         * @description 滚动到底部
         * @effect  只在客户端调用生效
         */
        scrollToEnd(): void;
        /**
         * @groups 界面/控件/滚动框
         * @description 设置滚动条的默认位置(类型，非具体坐标)
         * @effect 只在客户端调用生效
         * @precautions 没有操作滚动条的情况下滚动条的默认位置
         * @param NewDefaultLocation usage:滚动条默认位置(类型，非具体坐标)
         */
        set defaultLocation(NewDefaultLocation: mw.ScrollBarDefaultLocation);
        /**
         * @groups 界面/控件/滚动框
         * @description 返回滚动条的默认位置(类型，非具体坐标)
         * @effect 只在客户端调用生效
         * @precautions 没有操作滚动条的情况下滚动条的默认位置
         * @returns 返回滚动条的默认位置(类型，非具体坐标)
         */
        get defaultLocation(): mw.ScrollBarDefaultLocation;
        /**
         * @groups 界面/控件/滚动框
         * @description 获取动画类型
         * @effect  只在客户端调用生效
         * @returns 动画类型
         */
        get animationType(): mw.UIScrollBoxAnimationType;
        /**
         * @groups 界面/控件/滚动框
         * @description 设定动画类型
         * @effect  只在客户端调用生效
         * @param inAnimationType usage:类型
         * @returns 动画类型
         */
        set animationType(inAnimationType: mw.UIScrollBoxAnimationType);
        /**
         * @groups 界面/控件/滚动框
         * @description 获取弹性系数
         * @effect  只在客户端调用生效
         * @returns 弹性系数
         */
        get elasticMultiplier(): number;
        /**
         * @groups 界面/控件/滚动框
         * @description 设定弹性系数
         * @effect  只在客户端调用生效
         * @param inElasticMultiplier usage:系数
         * @returns 弹性系数
         */
        set elasticMultiplier(inElasticMultiplier: number);
        /**
         * @groups 界面/控件/滚动框
         * @description 判断是否支持惯性
         * @effect  只在客户端调用生效
         * @returns 是否支持惯性
         */
        get supportElastic(): boolean;
        /**
         * @groups 界面/控件/滚动框
         * @description 设定是否支持惯性
         * @effect  只在客户端调用生效
         * @param inSupportElastic usage:惯性
         * @returns 是否支持惯性
         */
        set supportElastic(inSupportElastic: boolean);
        /**
         * @groups 界面/控件/滚动框
         * @description 设定阴影显示
         * @effect  只在客户端调用生效
         * @param inVisibility usage: 阴影显示
         * @returns 阴影显示
         */
        set shadowVisibility(inVisibility: mw.SlateVisibility);
        /**
         * @groups 界面/控件/滚动框
         * @description 获取阴影显示
         * @effect  只在客户端调用生效
         * @returns 阴影显示
         */
        get shadowVisibility(): mw.SlateVisibility;
        /**
         * @groups 界面/控件/滚动框
         * @description 获取滚动条图片ID
         * @effect  只在客户端调用生效
         * @returns 滚动条图片ID
         */
        get scrollAxisBrushGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/滚动框
         * @description 设置滚动条图片ID
         * @effect  只在客户端调用生效
         * @param InGUID usage:图片ID
         */
        set scrollAxisBrushGuid(InGUID: string);
        /**
         * @groups 界面/控件/滚动框
         * @description 设置图片绘制类型
         * @effect  只在客户端调用生效
         * @param InDrawAs usage:图片绘制类型
         */
        set scrollAxisBrushDrawType(InDrawAs: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/滚动框
         * @description 获取滚动条图片绘制类型
         * @effect  只在客户端调用生效
         * @returns 图片绘制类型
         */
        get scrollAxisBrushDrawType(): Readonly<mw.SlateBrushDrawType>;
        /**
         * @groups 界面/控件/滚动框
         * @description  设置滚动条图片边距
         * @effect  只在客户端调用生效
         * @param InMargin usage:滚动条图片边距
         */
        set scrollAxisBrushMargin(InMargin: mw.Margin);
        /**
         * @groups 界面/控件/滚动框
         * @description 获取滚动条图片边距
         * @effect  只在客户端调用生效
         * @returns 滚动条图片边距
         */
        get scrollAxisBrushMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/滚动框
         * @description 设置滚动条图片颜色
         * @effect  只在客户端调用生效
         * @param InColor usage:滚动条图片颜色，Type.LinearColor类型，数据范围0~1
         */
        set scrollAxisColor(InColor: mw.LinearColor);
        /**
         * @groups 界面/控件/滚动框
         * @description 获取滚动条图片颜色
         * @effect  只在客户端调用生效
         * @returns 滚动条图片颜色，Type.LinearColor类型，数据范围0~1
         */
        get scrollAxisColor(): Readonly<mw.LinearColor>;
        /**
        * @description 设置是否受Touch事件影响滚动
        * @effect 只在客户端调用生效
        * @param bCanControl usage:能否touch控制滚动
        */
        setTouchCanControlThisScroll(bCanControl: boolean): void;
        /**
        * @description 获取是否受Touch事件影响滚动
        * @effect 只在客户端调用生效
        * @returns 能否touch能控制滚动
        */
        getTouchCanControlThisScroll(): boolean;
    }
}

declare namespace mw {
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
    class StaleButton extends mw.Widget {
        /**
         * @groups 界面/控件/文本按钮
         * @description 创建 StaleButton 控件
         * @description 当 parent 和 inName 与已有的对象相同时，旧的对象会被销毁
         * @effect  只在客户端调用生效
         * @param parent usage:创建控件的父级 Canvas 对象 default:null
         * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): StaleButton;
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取按钮normal图片的ImageInfo
         * @effect  只在客户端调用生效
         * @returns 返回ImageInfo对象
         */
        get normalImageInfo(): mw.ImageInfo;
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取按钮Pressed图片的ImageInfo
         * @effect  只在客户端调用生效
         * @returns 返回ImageInfo对象
         */
        get pressedImageInfo(): mw.ImageInfo;
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取按钮Disable图片的ImageInfo
         * @effect  只在客户端调用生效
         * @returns 返回ImageInfo对象
         */
        get disableImageInfo(): mw.ImageInfo;
        /**
         * @groups 界面/控件/文本按钮
         * @description 同一按键同时只能操控一个UI控件，最新绑定的UI控件会覆盖之前的绑定；脚本中添加的绑定无法覆盖编辑器按键绑定菜单中绑定相同按键的UI控件，但当两个UI控件分别通过代码和菜单绑定到同一按键时，使用代码绑定的优先级更高
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         */
        addKey(key: mw.Keys): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 此操作只会解绑动态绑定的按键无法解除编辑器按键绑定菜单中绑定的按键
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         */
        removeKey(key: mw.Keys): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取当前UI控件绑定的所有键盘按键，包括编辑器按键绑定菜单和用代码绑定的按键
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         * @returns 返回当前控件绑定的按键,可能为空
         */
        getKeys(): mw.Keys[];
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置是否获取输入焦点
         * @effect  只在客户端调用生效
         * @param inFocus usage:是否获取输入焦点
         */
        set focusable(inFocus: boolean);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取是否获取输入焦点
         * @effect  只在客户端调用生效
         * @returns 是否获取输入焦点
         */
        get focusable(): boolean;
        /**
         * @groups 界面/控件/文本
         * @description 获取当前字体的水平显示方式
         * @effect  只在客户端调用生效
         * @returns 返回字体的水平显示方式
         */
        get textHorizontalLayout(): mw.UITextHorizontalLayout;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体的水平显示方式
         * @effect  只在客户端调用生效
         * @param inTextHorizontalLayout usage:水平显示方式
         */
        set textHorizontalLayout(inTextHorizontalLayout: mw.UITextHorizontalLayout);
        /**
        * @groups 界面/控件/文本
        * @description 获取字体是否自适应调整大小:boolean(为True时，文本内容字体大小将自动改变，尽可能大的充满整个文本框，而文本框大小不会变化)
        * @effect  只在客户端调用生效
        * @returns 字体是否自适应调整大小
        */
        get autoAdjust(): boolean;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体是否自适应调整大小:boolean(为True时，文本内容字体大小将自动改变，尽可能大的充满整个文本框，而文本框大小不会变化)
         * @effect  只在客户端调用生效
         * @param isAdjust usage:字体是否自适应调整大小
         */
        set autoAdjust(isAdjust: boolean);
        /** *******************  文本内容 *****************************/
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取按钮文字
         * @effect  只在客户端调用生效
         * @returns 返回文字
         */
        get text(): string;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置按钮文字
         * @effect  只在客户端调用生效
         * @param InString usage:文字
         * @returns 新文本
         */
        set text(InString: string);
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体大小
         * @effect  只在客户端调用生效
         * @param FontSize usage:大小
         */
        set fontSize(FontSize: number);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取字体大小
         * @effect  只在客户端调用生效
         * @returns 字体大小
         */
        get fontSize(): number;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体间距
         * @effect  只在客户端调用生效
         * @param fontLetterSpace usage:间距
         */
        set fontLetterSpace(fontLetterSpace: number);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取字体间距
         * @effect  只在客户端调用生效
         * @returns 字体间距
         */
        get fontLetterSpace(): number;
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取默认字体
         * @effect  只在客户端调用生效
         * @returns 默认字体
         */
        get defaultFont(): mw.UIFontFamily | string;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置默认字体
         * @effect  只在客户端调用生效
         * @param inFont 需设置的默认字体
         */
        set defaultFont(inFont: mw.UIFontFamily | string);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取退却字体
         * @effect  只在客户端调用生效
         * @returns 退却字体
         */
        get fallbackFont(): mw.UIFontFamily | string;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置退却字体
         * @effect  只在客户端调用生效
         * @param inFont 需设置的退却字体
         */
        set fallbackFont(inFont: mw.UIFontFamily | string);
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体字形
         * @effect  只在客户端调用生效
         * @param inGlyph usage:字体字形的类型
         */
        set glyph(inGlyph: mw.UIFontGlyph);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取字体字形
         * @effect  只在客户端调用生效
         * @returns 字体字形
         */
        get glyph(): mw.UIFontGlyph;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置是否开启字体删除线
         * @effect  只在客户端调用生效
         * @param inEnableStrikethrough usage:是否开启
         */
        set strikethroughEnable(inEnableStrikethrough: boolean);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取是否开启字体删除线
         * @effect  只在客户端调用生效
         * @returns 是否开启字体删除线
         */
        get strikethroughEnable(): boolean;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置是否开启字体下划线
         * @effect  只在客户端调用生效
         * @param inEnableUnderline usage:设置是否开启下划线
         */
        set underlineEnable(inEnableUnderline: boolean);
        /**
         * @groups 界面/控件/文本按钮
         * @description 返回是否开启字体下划线
         * @effect  只在客户端调用生效
         * @returns 获取是否开启字体下划线
         */
        get underlineEnable(): boolean;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体内容颜色
         * @effect  只在客户端调用生效
         * @param inContentColor usage:颜色，Type.LinearColor类型，数据范围0~1
         */
        set contentColor(inContentColor: mw.LinearColor);
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体内容颜色
         * @effect  只在客户端调用生效
         * @returns 字体内容颜色，Type.LinearColor类型，数据范围0~1
         */
        get contentColor(): mw.LinearColor;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体颜色
         * @effect  只在客户端调用生效
         * @param inColor usage:字体颜色，Type.LinearColor类型，数据范围0~1
         */
        set fontColor(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取字体颜色
         * @effect  只在客户端调用生效
         * @returns 字体颜色，Type.LinearColor类型，数据范围0~1
         */
        get fontColor(): mw.LinearColor;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体颜色
         * @effect  只在客户端调用生效
         * @param R usage:字体 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:字体 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:字体 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:字体 透明度。 <br> range:[0, 255]  type: 整形
         */
        setFontColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体颜色,指定Hex的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:Hex颜色字符串  range: 符合 Hex 特点的字符串类型
         */
        setFontColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体阴影颜色
         * @effect  只在客户端调用生效
         * @param inShadowColor usage:输入的颜色，Type.LinearColor类型，数据范围0~1
         */
        set shadowColor(inShadowColor: mw.LinearColor);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取字体阴影颜色
         * @effect  只在客户端调用生效
         * @returns 字体阴影颜色，Type.LinearColor类型，数据范围0~1
         */
        get shadowColor(): mw.LinearColor;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体阴影偏移
         * @effect  只在客户端调用生效
         * @param inOffset usage:阴影偏移量
         */
        set shadowOffset(inOffset: mw.Vector2);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取字体阴影偏移
         * @effect  只在客户端调用生效
         * @returns 字体阴影偏移
         */
        get shadowOffset(): mw.Vector2;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体对齐方式
         * @effect  只在客户端调用生效
         * @param InTextJustify usage:对齐方式的枚举
         */
        set textAlign(InTextJustify: mw.TextJustify);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取字体对齐方式
         * @effect  只在客户端调用生效
         * @returns 字体对齐方式
         */
        get textAlign(): mw.TextJustify;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体垂直对齐方式
         * @effect  只在客户端调用生效
         * @param inTextVerticalJustify usage:对齐方式
         */
        set textVerticalAlign(inTextVerticalJustify: mw.TextVerticalJustify);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取字体垂直对齐方式
         * @effect  只在客户端调用生效
         * @returns 字体垂直对齐方式
         */
        get textVerticalAlign(): mw.TextVerticalJustify;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置字体描边颜色
         * @effect  只在客户端调用生效
         * @param inOutlineColor usage:描边颜色，Type.LinearColor类型，数据范围0~1
         */
        set outlineColor(inOutlineColor: mw.LinearColor);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取字体描边颜色
         * @effect  只在客户端调用生效
         * @returns 字体描边颜色，Type.LinearColor类型，数据范围0~1
         */
        get outlineColor(): mw.LinearColor;
        /**
         * @groups 界面/控件/文本按钮
          * @description 设置字体描边宽度
          * @effect  只在客户端调用生效
          * @param inOutlineSize usage:设置的大小
          */
        set outlineSize(inOutlineSize: number);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取字体描边宽度
         * @effect  只在客户端调用生效
         * @returns 字体描边宽度
         */
        get outlineSize(): number;
        /**
         * @groups 界面/控件/文本
         * @description 设置富文本
         * @effect  只在客户端调用生效
         * @param InValue usage:是否为富文本
         */
        set isRichText(isRichText: boolean);
        /**
         * @groups 界面/控件/文本
         * @description 获取是否为富文本
         * @effect  只在客户端调用生效
         * @returns 是否为富文本
         */
        get isRichText(): boolean;
        /**
         * @description 设置自适应最大字体大小
         * @effect  只在客户端调用生效
         * @param inText usage:文本内容
         */
        set maxSize(inText: number);
        /**
         * @description 获取自适应最大字体大小
         * @effect  只在客户端调用生效
         * @returns 返回当前的文本内容
         */
        get maxSize(): number;
        /**
         * @description 设置自适应最小字体大小
         * @effect  只在客户端调用生效
         * @param inText usage:文本内容
         */
        set minSize(inText: number);
        /**
         * @description 获取自适应最小字体大小
         * @effect  只在客户端调用生效
         * @returns 返回当前的文本内容
         */
        get minSize(): number;
        /**
         * @groups 界面/控件/文本
         * @description 设置行高系数
         * @effect  只在客户端调用生效
         * @param inValue usage:系数
         */
        set lineHeightPercentage(inValue: number);
        /**
         * @groups 界面/控件/文本
         * @description 获取行高系数
         * @effect  只在客户端调用生效
         * @returns 行高系数
         */
        get lineHeightPercentage(): number;
        /** ************************************************* 普通图片  ******************************************************/
        /**
         * @groups 界面/控件/文本按钮
        * @description 获取普通图片ID
        * @effect  只在客户端调用生效
        * @returns 普通图片ID
        */
        get normalImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置正常图片ID
         * @effect  只在客户端调用生效
         * @param inGUID usage:图片id
         */
        set normalImageGuid(inGUID: string);
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置正常图片
         * @precautions 建议设置 bRefreshCache = false 以提升性能
         * @effect  只在客户端调用生效
         * @param absPath usage: 图片文件路径  range: 路径长度
         * @param bRefreshCache usage:为 true 则重新创建并刷新缓存，为 false 则使用缓存。  <br> default: true
         */
        setButtonNormalByFile(absPath: string, bRefreshCache?: boolean): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置图片大小
         * @effect  只在客户端调用生效
         * @param inSize usage:大小
         */
        set normalImageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取图片大小
         * @effect  只在客户端调用生效
         * @returns 普通图片大小
         */
        get normalImageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置普通图片颜色
         * @effect  只在客户端调用生效
         * @param inNormalColor usage:颜色，Type.LinearColor类型，数据范围0~1
         */
        set normalImageColor(inNormalColor: mw.LinearColor);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取普通图片颜色
         * @effect  只在客户端调用生效
         * @returns 普通图片颜色，Type.LinearColor类型，数据范围0~1
         */
        get normalImageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/文本按钮
        * @description 设置正常颜色
        * @effect  只在客户端调用生效
        * @param R usage:颜色 R 值。 <br> range:[0, 255]  type: 整形
        * @param G usage:颜色 G 值。 <br> range:[0, 255]  type: 整形
        * @param B usage:颜色 B 值。 <br> range:[0, 255]  type: 整形
        * @param A usage:颜色 透明度。 <br> range:[0, 255]  type: 整形
        */
        setNormalImageColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置正常颜色指定Hex的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:颜色字符串  range: 符合 Hex 特点的字符串类型
         */
        setNormalImageColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置普通图片绘制类型
         * @effect  只在客户端调用生效
         * @param inDrawType usage:类型
         */
        set normalImageDrawType(inDrawType: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取普通图片绘制类型
         * @effect  只在客户端调用生效
         * @returns 普通图片绘制类型
         */
        get normalImageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取普通图片边距
         * @effect  只在客户端调用生效
         * @returns 普通图片边距
         */
        get normalImageMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置普通图片边距
         * @effect  只在客户端调用生效
         * @param inMargin usage:普通图片边距
         */
        set normalImageMargin(inMargin: mw.Margin);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取按钮是否启用过度模式,按下是否有效果
         * @effect  只在客户端调用生效
         * @returns 按钮是否启用过度模式
         */
        get transitionEnable(): boolean;
        /**
         * @groups 界面/控件/文本按钮
         * @description 是否套用不同的按下方案
         * @effect  只在客户端调用生效
         * @param inBoolean usage:是否套用不同的按下方案
         */
        set transitionEnable(inBoolean: boolean);
        /** ************************************************* 按压图片  ******************************************************/
        /**
         * @groups 界面/控件/文本按钮
        * @description 获取按下图片ID
        * @effect  只在客户端调用生效
        * @returns 按下图片ID
        */
        get pressedImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置按下图片ID
         * @effect  只在客户端调用生效
         * @param inGUID usage:图片id
         */
        set pressedImageGuid(inGUID: string);
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置按下图片
         * @precautions 建议设置 bRefreshCache = false 以提升性能
         * @effect  只在客户端调用生效
         * @param absPath usage:图片文件路径 range: 路径长度
         * @param bRefreshCache usage:默认为 true 将重新创建并刷新缓存，为 false 则使用缓存  <br> default: true
         */
        setButtonPressedByFile(absPath: string, bRefreshCache?: boolean): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置按压图片大小
         * @effect  只在客户端调用生效
         * @param inSize usage:大小
         */
        set pressedImageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取按压图片大小
         * @effect  只在客户端调用生效
         * @returns 按压图片大小
         */
        get pressedImageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/文本按钮
        * @description 设置按压图片颜色
        * @effect  只在客户端调用生效
        * @param inColor usage:颜色，Type.LinearColor类型，数据范围0~1
        */
        set pressedImagColor(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取按压图片颜色
         * @effect  只在客户端调用生效
         * @returns 按压图片颜色，Type.LinearColor类型，数据范围0~1
         */
        get pressedImagColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置按下颜色
         * @effect  只在客户端调用生效
         * @param R usage:颜色 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:颜色 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:颜色 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:颜色 透明度。 <br> range:[0, 255]  type: 整形
         */
        setPressedImageColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置按下颜色指定Hex的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:颜色字符串  range: 符合 Hex 特点的字符串类型
         */
        setPressedImageColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置按压图片绘制类型
         * @effect  只在客户端调用生效
         * @param inDrawType usage:类型
         */
        set pressedImageDrawType(inDrawType: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取按压图片绘制类型
         * @effect  只在客户端调用生效
         * @returns 按压图片绘制类型
         */
        get pressedImageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取按压图片边距
         * @effect  只在客户端调用生效
         * @returns 按压图片边距
         */
        get pressedImageMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置按压图片边距
         * @effect  只在客户端调用生效
         * @param inMargin usage:按压图片边距
         */
        set pressedImageMargin(inMargin: mw.Margin);
        /** ************************************************* 禁用图片  ******************************************************/
        /**
         * @groups 界面/控件/文本按钮
        * @description 获取禁用图片ID
        * @effect  只在客户端调用生效
        * @returns 禁用图片ID
        */
        get disableImageGuid(): Readonly<string>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置不可用图片ID
         * @effect  只在客户端调用生效
         * @param inGUID usage:图片id
         */
        set disableImageGuid(inGUID: string);
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置不可用图片
         * @precautions 建议设置 bRefreshCache = false 以提升性能
         * @effect  只在客户端调用生效
         * @param absPath usage:图片文件路径  <br> range: 路径长度
         * @param bRefreshCache usage:默认为 true 将重新创建并刷新缓存，为 false 则使用缓存  <br> default: true
         */
        setButtonDisableByFile(absPath: string, bRefreshCache?: boolean): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置禁用图片大小
         * @effect  只在客户端调用生效
        * @param inSize usage:大小
        */
        set disableImageSize(inSize: mw.Vector2);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取禁用图片大小
         * @effect  只在客户端调用生效
         * @returns 禁用图片大小
         */
        get disableImageSize(): Readonly<mw.Vector2>;
        /**
         * @groups 界面/控件/文本按钮
        * @description 设置禁用图片颜色
        * @effect  只在客户端调用生效
        * @param inColor usage:颜色，Type.LinearColor类型，数据范围0~1
        */
        set disableImageColor(inColor: mw.LinearColor);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取禁用图片颜色
         * @effect  只在客户端调用生效
         * @returns 禁用图片颜色，Type.LinearColor类型，数据范围0~1
         */
        get disableImageColor(): Readonly<mw.LinearColor>;
        /**
         * @groups 界面/控件/文本按钮
          * @description 设置不可用颜色
          * @effect  只在客户端调用生效
          * @param R usage:颜色 R 值。 <br> range:[0, 255]  type: 整形
          * @param G usage:颜色 G 值。 <br> range:[0, 255]  type: 整形
          * @param B usage:颜色 B 值。 <br> range:[0, 255]  type: 整形
          * @param A usage:颜色 透明度。 <br> range:[0, 255]  type: 整形
          */
        setDisableImageColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置不可用颜色指定Hex的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:颜色字符串  range: 符合 Hex 特点的字符串类型
         */
        setDisableImageColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置禁用图片绘制类型
         * @effect  只在客户端调用生效
         * @param inDrawTYpe usage:类型
         */
        set disableImageDrawType(inDrawTYpe: mw.SlateBrushDrawType);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取禁用图片绘制类型
         * @effect  只在客户端调用生效
         * @returns 禁用图片绘制类型
         */
        get disableImageDrawType(): Readonly<mw.SlateBrushDrawType>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取禁用图片边距
         * @effect  只在客户端调用生效
         * @returns 禁用图片边距
         */
        get disableImageMargin(): Readonly<mw.Margin>;
        /**
         * @groups 界面/控件/文本按钮
        * @description 设置禁用图片边距
        * @effect  只在客户端调用生效
        * @param inMargin usage:禁用图片边距
        */
        set disableImageMargin(inMargin: mw.Margin);
        /** *******************  其他 *****************************/
        /**
         * @groups 界面/控件/文本按钮
         * @description 点击事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onClicked(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 按下事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onPressed(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 释放事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onReleased(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 悬浮事件
         * @effect  只在客户端调用生效e
         * @returns 返回事件的代理
         */
        get onHovered(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 未悬浮事件
         * @effect  只在客户端调用生效
         * @returns 返回事件的代理
         */
        get onUnhovered(): mw.MulticastDelegate<() => void>;
        /**
         * @groups 界面/控件/文本按钮
         * @description 是否按下
         * @effect  只在客户端调用生效
         * @returns 返回按钮是否按下
         */
        isPressed(): boolean;
        /**
         * @groups 界面/控件/按钮
         * @description 设置点击模式
         * @effect  只在客户端调用生效
         * @param inClickMethod usage:点击模式选择
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:042 reason:接口与touchMethod功能合并 replacement:touchMethod
         */
        set clickMethod(inClickMethod: mw.ButtonClickMethod);
        /**
         * @groups 界面/控件/按钮
         * @description 设置触摸模式
         * @effect  只在客户端调用生效
         * @param inTouchMethod usage:Touch模式选择
         */
        set touchMethod(inTouchMethod: mw.ButtonTouchMethod);
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置按压模式
         * @effect  只在客户端调用生效
         * @param inPressMethod usage:按压模式
         */
        set pressMethod(inPressMethod: mw.ButtonPressMethod);
    }
}

declare namespace mw {
    /**
    * @author jianke.feng
    * @description 选项卡组-点击事件type
    * @groups 界面
    */
    type TabGroupOnClickedProps = {
        /** @ignore */
        get onClicked(): mw.MulticastDelegate<() => void>;
    };
    /**
     * @author wei.yang
     * @groups 界面
     * @description 选项卡组
     * @networkStatus usage:客户端
     */
    class TabGroup<T extends TabGroupOnClickedProps> {
        /**
         * 构造
         * @param tabArr usage:标签的按钮数组
         */
        constructor(tabArr: Array<T>);
        /**
         * @description 初始化
         * @effect  只在客户端调用生效
         * @param tabStyleHandle usage:设置标签的样式方法（方法参数：按钮）
         * @param selectCallBack usage:选择标签的回调方法
         * @param thisArg usage:域
         * @param defaultIndex usage:默认选择的标签索引 default:0  range: type:整数
         */
        init(tabStyleHandle: (btn: T, isSelect: boolean) => void, selectCallBack: (index: number) => void, thisArg: any, defaultIndex?: number): void;
        /**
         * @description 设置该标签是否可以切换的检测方法
         * @effect  只在客户端调用生效
         * @param selectChecker usage:判断方法
         * @param thisArg usage:域
         */
        setSelectableChecker(selectChecker: (index: number) => boolean, thisArg: any): void;
        /**
         * @description 设置当前的标签
         * @effect  只在客户端调用生效
         * @param index usage:标签索引   range:不做限制  type:整数
         * @param ignoreSame usage:是否忽略相同索引 default:true
         * @returns 是否成功
         */
        select(index: number, ignoreSame?: boolean): boolean;
        /**
         * @description 当前选择的标签索引
         * @effect  只在客户端调用生效
         * @returns 当前标签
         */
        get currentIndex(): number;
    }
}

declare namespace mw {
    /**
    * @author jie.wu
    * @groups 界面/控件/文本
    * @description 文本
    * @networkStatus usage:客户端
    */
    class TextBlock extends mw.Widget {
        /**
       * @groups 界面/控件/文本
         * @description 创建 TextBlock 控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect  只在客户端调用生效
         * @param parent usage:创建控件的外parent对象 default:null
         * @param inName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 返回创建的对象
         */
        static newObject(parent?: mw.Canvas, inName?: string): TextBlock;
        /**
        * @groups 界面/控件/文本
        * @description 设置文本内容
        * @effect  只在客户端调用生效
        * @param inText usage:文本内容
        */
        set text(inText: string);
        /**
         * @groups 界面/控件/文本
         * @description 获取当前的文本内容
         * @effect  只在客户端调用生效
         * @returns 返回当前的文本内容
         */
        get text(): string;
        /**
         * @groups 界面/控件/文本
         * @description 获取当前字体的水平显示方式
         * @effect  只在客户端调用生效
         * @returns 返回字体的水平显示方式
         */
        get textHorizontalLayout(): mw.UITextHorizontalLayout;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体的水平显示方式
         * @effect  只在客户端调用生效
         * @param inTextHorizontalLayout usage:水平显示方式
         */
        set textHorizontalLayout(inTextHorizontalLayout: mw.UITextHorizontalLayout);
        /**
        * @groups 界面/控件/文本
        * @description 获取字体是否自适应调整大小:boolean(为True时，文本内容字体大小将自动改变，尽可能大的充满整个文本框，而文本框大小不会变化)
        * @effect  只在客户端调用生效
        * @returns 字体是否自适应调整大小
        */
        get autoAdjust(): boolean;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体是否自适应调整大小:boolean(为True时，文本内容字体大小将自动改变，尽可能大的充满整个文本框，而文本框大小不会变化)
         * @effect  只在客户端调用生效
         * @param isAdjust usage:字体是否自适应调整大小
         */
        set autoAdjust(isAdjust: boolean);
        /**
         * @groups 界面/控件/文本
         * @description 设置行高系数
         * @effect  只在客户端调用生效
         * @param inValue usage:系数
         */
        set lineHeightPercentage(inValue: number);
        /**
         * @groups 界面/控件/文本
         * @description 获取行高系数
         * @effect  只在客户端调用生效
         * @returns 行高系数
         */
        get lineHeightPercentage(): number;
        /**
        * @groups 界面/控件/文本
        * @description 获取文本的高度(文本内容整体的高度，与组件大小无关，受字体属性影响)
        * @effect  只在客户端调用生效，控件初始化完成后调用才准确生效，需要等待控件渲染完成
        * @returns 文本高度
        */
        get textHeight(): number;
        /**
         * @groups 界面/控件/文本
         * @description 获取文本单行高度(文本单行的高度，与组件大小无关，受字体属性影响)
         * @effect  只在客户端调用生效
         * @returns 文本单行高度
         */
        get textSingleHeight(): number;
        /** ********************************* 字体信息相关接口************************/
        /**
        * @groups 界面/控件/文本
        * @description 设置字体大小
        * @effect  只在客户端调用生效
        * @param InSize usage:字体大小
        */
        set fontSize(InSize: number);
        /**
         * @groups 界面/控件/文本
         * @description 获取字体大小
         * @effect 只在客户端调用生效
         * @returns 返回字体的大小
         */
        get fontSize(): number;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体间距
         * @effect  只在客户端调用生效
         * @param inLetterSpace usage:字体间距
         */
        set fontLetterSpace(inLetterSpace: number);
        /**
         * @groups 界面/控件/文本
         * @description 获取字体间距
         * @effect  只在客户端调用生效
         * @returns 返回字体间距
         */
        get fontLetterSpace(): number;
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取默认字体
         * @effect  只在客户端调用生效
         * @returns 默认字体
         */
        get defaultFont(): mw.UIFontFamily | string;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置默认字体
         * @effect  只在客户端调用生效
         * @param inFont 需设置的默认字体
         */
        set defaultFont(inFont: mw.UIFontFamily | string);
        /**
         * @groups 界面/控件/文本按钮
         * @description 获取退却字体
         * @effect  只在客户端调用生效
         * @returns 退却字体
         */
        get fallbackFont(): mw.UIFontFamily | string;
        /**
         * @groups 界面/控件/文本按钮
         * @description 设置退却字体
         * @effect  只在客户端调用生效
         * @param inFont 需设置的退却字体
         */
        set fallbackFont(inFont: mw.UIFontFamily | string);
        /**
        * @groups 界面/控件/文本
         * @description 设置字体字形
         * @effect  只在客户端调用生效
         * @param inGlyph usage: 字形
         */
        set glyph(inGlyph: mw.UIFontGlyph);
        /**
         * @groups 界面/控件/文本
         * @description 获取字体字形
         * @effect  只在客户端调用生效
         * @returns 字体字形
         */
        get glyph(): mw.UIFontGlyph;
        /**
        * @groups 界面/控件/文本
        * @description 设置是否开启字体删除线
        * @effect  只在客户端调用生效
        * @param inEnableStrikethrough usage:是否开启
        */
        set strikethroughEnable(inEnableStrikethrough: boolean);
        /**
        * @groups 界面/控件/文本
        * @description 获取是否开启字体删除线
        * @effect  只在客户端调用生效
        * @returns 是否开启字体删除线
        */
        get strikethroughEnable(): boolean;
        /**
         * @groups 界面/控件/文本
         * @description 设置是否开启字体下划线
         * @effect  只在客户端调用生效
         * @param inEnableUnderline usage:设置是否开启下划线
         */
        set underlineEnable(inEnableUnderline: boolean);
        /**
        * @groups 界面/控件/文本
        * @description 返回是否开启字体下划线
        * @effect  只在客户端调用生效
        * @returns 获取是否开启字体下划线
        */
        get underlineEnable(): boolean;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体内容颜色
         * @effect  只在客户端调用生效
         * @param inContentColor usage: 内容颜色，Type.LinearColor类型，数据范围0~1
         */
        set contentColor(inContentColor: mw.LinearColor);
        /**
         * @groups 界面/控件/文本
         * @description 获取字体内容颜色
         * @effect  只在客户端调用生效
         * @returns 字体内容颜色，Type.LinearColor类型，数据范围0~1
         */
        get contentColor(): mw.LinearColor;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体颜色
         * @effect  只在客户端调用生效
         * @param inColor usage:字体的颜色值，Type.LinearColor类型，数据范围0~1
         */
        set fontColor(inColor: mw.LinearColor);
        /**
        * @groups 界面/控件/文本
        * @description 获取字体颜色
        * @effect  只在客户端调用生效
        * @returns 字体颜色，Type.LinearColor类型，数据范围0~1
        */
        get fontColor(): mw.LinearColor;
        /**
          * @description 设置字体颜色
          * @effect  只在客户端调用生效
          * @param R usage:字体颜色 R 值。 <br> range:[0, 255]  type: 整形
          * @param G usage:字体颜色 G 值。 <br> range:[0, 255]  type: 整形
          * @param B usage:字体颜色 B 值。 <br> range:[0, 255]  type: 整形
          * @param A usage:字体颜色 透明度。 <br> range:[0, 255]  type: 整形
          */
        setFontColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体颜色,指定Hex的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:Hex颜色字符串  range: 符合 Hex 特点的字符串类型
         */
        setFontColorByHex(inHexString: string): void;
        /**
        * @groups 界面/控件/文本
         * @description 获取字体阴影颜色
         * @effect 只在客户端调用生效
         * @param inShadowColor usage:阴影颜色，Type.LinearColor类型，数据范围0~1
         */
        set shadowColor(inShadowColor: mw.LinearColor);
        /**
         * @groups 界面/控件/文本
          * @description 设置字体阴影颜色
          * @effect  只在客户端调用生效
          * @returns 阴影颜色，Type.LinearColor类型，数据范围0~1
          */
        get shadowColor(): mw.LinearColor;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体的阴影颜色
         * @description Shadow Offset 必须设值才能看到效果。
         * @effect  只在客户端调用生效
         * @param R usage:阴影颜色 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:阴影颜色 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:阴影颜色 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:阴影颜色 透明度。 <br> range:[0, 255]  type: 整形
         */
        setShadowColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体的阴影颜色,Shadow Offset必须设值才能看到效果，指定Hex的颜色文本设定颜色 #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:颜色  range: 符合 Hex 特点的字符串类型
         */
        setShadowColorByHex(inHexString: string): void;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体阴影偏移
         * @effect  只在客户端调用生效
         * @param inOffset usage:阴影偏移量
         */
        set shadowOffset(inOffset: mw.Vector2);
        /**
        * @groups 界面/控件/文本
        * @description 获取字体阴影颜色
        * @effect  只在客户端调用生效
        * @returns 字体阴影颜色，Type.LinearColor类型，数据范围0~1
        */
        get shadowOffset(): mw.Vector2;
        /**
        * @groups 界面/控件/文本
        * @description 设置字体对齐方式
        * @effect  只在客户端调用生效
        * @param inTextJustify usage:对齐方式的枚举
        */
        set textAlign(inTextJustify: mw.TextJustify);
        /**
        * @groups 界面/控件/文本
        * @description 获取字体对齐方式
        * @effect  只在客户端调用生效
        * @returns 字体对齐方式
        */
        get textAlign(): mw.TextJustify;
        /**
        * @groups 界面/控件/文本
         * @description 设置字体垂直对齐方式
         * @effect  只在客户端调用生效
         * @param inTextVerticalJustify usage: 垂直对齐方式
         */
        set textVerticalAlign(inTextVerticalJustify: mw.TextVerticalJustify);
        /**
         * @groups 界面/控件/文本
         * @description 获取字体垂直对齐方式
         * @effect  只在客户端调用生效
         * @returns 字体垂直对齐方式
         */
        get textVerticalAlign(): mw.TextVerticalJustify;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体描边颜色
         * @effect  只在客户端调用生效
         * @param inOutlineColor usage: 描边颜色，Type.LinearColor类型，数据范围0~1
         * @returns 字体描边颜色
         */
        set outlineColor(inOutlineColor: mw.LinearColor);
        /**
         * @groups 界面/控件/文本
         * @description 获取字体描边颜色
         * @effect  只在客户端调用生效
         * @returns 字体描边颜色，Type.LinearColor类型，数据范围0~1
         */
        get outlineColor(): mw.LinearColor;
        /**
         * @groups 界面/控件/文本
         * @description 设置当前的描边颜色
         * @effect  只在客户端调用生效
        *  @param R usage:颜色 R 值。 <br> range:[0, 255]  type: 整形
         * @param G usage:颜色 G 值。 <br> range:[0, 255]  type: 整形
         * @param B usage:颜色 B 值。 <br> range:[0, 255]  type: 整形
         * @param A usage:颜色 透明度。 <br> range:[0, 255]  type: 整形
         */
        setOutlineColorDecimal(R: number, G: number, B: number, A: number): void;
        /**
         * @groups 界面/控件/文本
         * @description 设置当前的描边颜色
         * @description 例如： #05050505
         * @effect  只在客户端调用生效
         * @param inHexString usage:十六进制的字符串  range: 符合 Hex 特点的字符串类型
         */
        setOutlineColorByHex(inHexString: string): void;
        /**
        * @groups 界面/控件/文本
         * @description 设置字体描边宽度
         * @effect  只在客户端调用生效
         * @param inOutlineSize usage:设置的大小
         */
        set outlineSize(inOutlineSize: number);
        /**
        * @groups 界面/控件/文本
        * @description 获取字体描边宽度
        * @effect  只在客户端调用生效
        * @returns 字体描边宽度
        */
        get outlineSize(): number;
        /**
         * @groups 界面/控件/文本
         * @description 设置富文本
         * @effect  只在客户端调用生效
         * @param InValue usage:是否为富文本
         */
        set isRichText(isRichText: boolean);
        /**
         * @groups 界面/控件/文本
         * @description 获取是否为富文本
         * @effect  只在客户端调用生效
         * @returns 是否为富文本
         */
        get isRichText(): boolean;
        /**
         * @groups 界面/控件/文本
         * @description 获取字体的对齐方式
         * @effect  只在客户端调用生效
         * @returns 返回字体的对齐方式
         */
        get textJustification(): mw.TextJustify;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体的对齐方式
         * @effect  只在客户端调用生效
         * @param inTextJustification usage:新的对齐方式
         */
        set textJustification(inTextJustification: mw.TextJustify);
        /**
         * @groups 界面/控件/文本
         * @description 获取字体的垂直对齐方式
         * @effect  只在客户端调用生效
         * @returns 返回字体的垂直对齐方式
         */
        get textVerticalJustification(): mw.TextVerticalJustify;
        /**
         * @groups 界面/控件/文本
         * @description 设置字体的垂直对齐方式
         * @effect  只在客户端调用生效
         * @param inTextJustification usage:垂直对齐方式
         */
        set textVerticalJustification(inTextJustification: mw.TextVerticalJustify);
        /**
         * @description 设置文本内容
         * @effect  只在客户端调用生效
         * @param inText usage:文本内容
         */
        set maxSize(inText: number);
        /**
         * @description 获取当前的文本内容
         * @effect  只在客户端调用生效
         * @returns 返回当前的文本内容
         */
        get maxSize(): number;
        /**
         * @description 设置文本内容
         * @effect  只在客户端调用生效
         * @param inText usage:文本内容
         */
        set minSize(inText: number);
        /**
         * @description 获取当前的文本内容
         * @effect  只在客户端调用生效
         * @returns 返回当前的文本内容
         */
        get minSize(): number;
    }
}

declare namespace mw {
    /**
     * @author maohang.zeng
     * @groups 界面/控件/平铺视图
     * @description 平铺视图
     * @networkStatus usage: 客户端
     */
    class TileView extends mw.ListView {
        /**
         * @description 设置子节点宽度，对于TileView来说，必须有一个设定好的子节点宽度，默认值为16
         * @effect 只在客户端调用生效
         * @param itemWidth usage:子节点宽度
         */
        set itemWidth(itemWidth: number);
        /**
         * @description 设置子节点高度，对于TileView来说，必须有一个设定好的子节点高度，默认值为16
         * @effect 只在客户端调用生效
         * @param itemHeight usage:子节点高度
         */
        set itemHeight(itemHeight: number);
        /**
        * @description 设置是否受Touch事件影响滚动
        * @effect 只在客户端调用生效
        * @param bCanControl usage:能否touch控制滚动
        */
        setTouchCanControlThisScroll(bCanControl: boolean): void;
        /**
        * @description 获取是否受Touch事件影响滚动
        * @effect 只在客户端调用生效
        * @returns 能否touch能控制滚动
        */
        getTouchCanControlThisScroll(): boolean;
        /**
         * @description 创建 TileView 控件，当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect 只在客户端调用生效
         * @param orientation usage: 朝向
         * @param uiAssetGUID usage: 设置视图绑定的节点UI range: 无
         * @param parent usage:创建控件的外parent对象 default:null
         * @param inName usage:创建控件的名称 default:null range:无
         * @returns 创建的对象
         */
        static newObject(orientation: mw.Orientation, uiAssetGUID: string, parent?: mw.Canvas, inName?: string): TileView;
    }
}

declare namespace mw {
    /**
     * @author jie.wu
     * @groups 界面/控件/摄像机滑动区
     * @description 摄像机滑动区
     * @networkStatus usage:客户端
     */
    class TouchPad extends mw.Widget {
        /**
        * @groups 界面/控件/摄像机滑动区
         * @description 创建 TouchPad 控件
         * @description 当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect  只在客户端调用生效
         * @param parent usage:创建控件的外Outer对象 default:null
         * @param InName usage:创建控件的名称 default:null   range:设置合理的名称即可
         * @returns 返回创建的控件
         */
        static newObject(parent?: mw.Canvas, InName?: string): TouchPad;
        /**
         * @groups 界面/控件/摄像机滑动区
         * @description 设置移动touchPad的delta的缩放值
         * @effect  只在客户端调用生效
         * @param inScale usage:缩放值
         */
        set inputScale(inScale: mw.Vector2);
        /**
         * @groups 界面/控件/摄像机滑动区
         * @description 获取移动touchPad的delta的缩放值
         * @effect  只在客户端调用生效
         * @returns 返回移动touchPad的delta的缩放值
         */
        get inputScale(): mw.Vector2;
        /**
         * @groups 界面/控件/摄像机滑动区
         * @description 获取是否被鼠标控制，只作用于PC端
         * @effect 只在客户端调用生效
         * @returns 是否被鼠标控制
         */
        get controlByMouseEnable(): boolean;
        /**
         * @groups 界面/控件/摄像机滑动区
         * @description 设置是否被鼠标控制，只作用于PC端
         * @effect 只在客户端调用生效
         * @param controlByMouse usage: 是否被鼠标控制
         */
        set controlByMouseEnable(controlByMouse: boolean);
    }
}

declare namespace mw {
    /**
    * @author maohang.zeng
    * @groups 界面
    * @description 树状视图节点数据基类
    * @networkStatus usage: 客户端
    */
    class TreeViewItemDataBase {
        constructor();
        /**
         * @description 该节点数据对应的UI
         * @effect 只在客户端调用生效
         */
        get widgetCanvas(): mw.Widget;
        /**
         * @description 该节点数据的唯一标识序号，和位置无关
         * @effect 只在客户端调用生效
         */
        get baseGuid(): number;
        /**
         * @description 获取节点所属的树视图
         */
        get ownerTreeView(): TreeView;
        /**
         * @description 设置父节点， 如果存在旧有父节点 或 属于treeView.listItems的根数组中，会从其中移除， 然后加入到新父节点parentData.children最后
         * @effect 只在客户端调用生效
         * @param parentData usage:新的父节点
         */
        set parent(parentData: TreeViewItemDataBase);
        /**
         * @description 父节点
         * @effect 只在客户端调用生效
         * @returns 返回当前的父节点
         */
        get parent(): TreeViewItemDataBase;
        /**
         * @description 设置子节点
         * @effect 只在客户端调用生效
         * @param childrenData usage:新的子节点
         *
         */
        set children(childrenData: TreeViewItemDataBase[]);
        /**
         * @description 所有子节点
         * @effect 只在客户端调用生效
         * @returns 返回当前所有子节点
         */
        get children(): TreeViewItemDataBase[];
    }
    /**
     * @author maohang.zeng
     * @groups 界面/控件/树状视图
     * @description 树状视图
     * @networkStatus usage: 客户端
     */
    class TreeView extends mw.Widget {
        /**
         * @description 设置视图节点边距
         * @param padding usage: 设置的边距数据
         */
        set itemPadding(padding: mw.Margin);
        /**
         * @description 获取视图节点边距
         * @return 边距数据
         */
        get itemPadding(): mw.Margin;
        /**
        * @description Item项目节点样式设置
        * @effect  会在重新生成节点时才会生效，不会立刻修改面板上的Item
        */
        get tableRowStyle(): mw.ListItemStyle;
        /**
        * @description 滚动条样式
        * @effect  设置滚动条样式
        */
        get scrollBarStyle(): mw.ScrollbarStyle;
        /**
         * @description 滚动条可见性
         * @effect  设置滚动条可见性
         */
        set scrollBarVisible(bVisible: boolean);
        /**
         * @description 滚动条可见性
         * @effect  设置滚动条可见性
         */
        get scrollBarVisible(): boolean;
        /** ******************************************************************************************************/
        /**
         * @description 刷新数据
         * @effect 只在客户端调用生效
         */
        requestRefresh(): void;
        /**
         * @description 重新生成树刷新数据
         * @effect 只在客户端调用生效
         * @param regenItems usage:刷新数据
         */
        regenerateTreeData(regenItems: TreeViewItemDataBase[]): void;
        /**
         * @description 重新设置项目节点数据组
         * @effect 只在客户端调用生效
         * @param newListItems usage:用于替换的新数据组
         */
        resetListItems(newListItems: TreeViewItemDataBase[]): void;
        /**
         * @description 添加项目节点数据
         * @effect 只在客户端调用生效
         * @param newListItems usage:新的数据组
         */
        addItems(newListItems: TreeViewItemDataBase[]): void;
        /**
         * @description 插入项目节点数据，如果位置越界，则自动插入最后
         * @effect 只在客户端调用生效
         * @param newItem usage:需要插入的新数据
         * @param index usage:插入的位置 range: 无 type: 整形
         */
        insertItem(newItem: TreeViewItemDataBase, index: number): void;
        /**
        * @description 移除项目节点数据
        * @effect 只在客户端调用生效
        * @param delItem usage:需要移除的数据
        */
        removeItem(delItem: TreeViewItemDataBase): void;
        /**
        * @description 清理数据组
        * @effect 只在客户端调用生效
        */
        clearItems(): void;
        /**
        * @description 清空列表的选中
        * @effect 只在客户端调用生效
        */
        clearSelection(): void;
        /**
        * @description 设置节点选中
        * @effect 只在客户端调用生效
          * @param selectedItems usage:需要修改选中的节点数据
          * @param selected usage:确定修改目标：选中/不选中 range:[true, false]
          * @param selectInfo usage:选中方式：键盘/导航/鼠标/直接选中 default: SelectInfo.Direct
        */
        setSelectionItem(selectedItems: TreeViewItemDataBase | TreeViewItemDataBase[], selected: boolean, selectInfo?: mw.SelectInfo): void;
        /**
        * @description 获取列表数据
        * @effect 只在客户端调用生效
        * @returns 返回列表数据
        */
        get listItems(): Readonly<TreeViewItemDataBase[]>;
        /**
        * @description 获取选中节点的数据
        * @effect 只在客户端调用生效
        * @returns 返回选中节点的数据
        */
        getSelectionItems(): TreeViewItemDataBase[];
        /**
        * @description 修改节点的展开状态
        * @effect 只在客户端调用生效
        * @param targetItem usage:目标数据
        */
        toggleItemExpansion(targetItem: TreeViewItemDataBase): void;
        /**
        * @description 设置节点的展开状态
        * @effect 只在客户端调用生效
        * @param targetItem usage:目标数据
        * @param expandItem usage:是否展开
        */
        setItemExpansion(targetItem: TreeViewItemDataBase, expandItem: boolean): void;
        /**
        * @description 获取节点的展开状态
        * @effect 只在客户端调用生效
        * @param targetItem usage:目标数据
        * @returns 返回节点是否展开
        */
        getItemExpansion(targetItem: TreeViewItemDataBase): boolean;
        /**
        * @description 获取所有展开的节点
        * @effect 只在客户端调用生效
        * @returns 返回所有展开的节点
        */
        getExpandedItems(): TreeViewItemDataBase[];
        /**
        * @description 设置选中模式
        * @effect 只在客户端调用生效
        * @param newSelectionMode usage:选中模式
        */
        set selectionMode(newSelectionMode: mw.SelectionMode);
        /**
        * @description 获取选中模式
        * @effect 只在客户端调用生效
        * @returns 返回选中模式
        */
        get selectionMode(): mw.SelectionMode;
        /**
         * @description 获取当前滚动条偏移位置
         * @effect 只在客户端调用生效
         * @returns 返回当前滚动条偏移位置
         */
        get scrollOffset(): number;
        /**
         * @description 设置当前滚动条偏移位置
         * @effect 只在客户端调用生效
         * @param scrollOffset usage:偏移量，0为初始，1为最后
         */
        set scrollOffset(scrollOffset: number);
        /**
         * @description 滚动条定位到对应项目的位置
         * @effect 只在客户端调用生效
         * @param targetItem usage:目标定位项目
         */
        scrollIntoView(targetItem: TreeViewItemDataBase): void;
        /**
         * @description 获取当前展示的条目的数量
         * @effect 只在客户端调用生效
         * @returns 当前展示的条目的数量
         */
        getShowItemsCount(): number;
        /**
         * @description 获取子项缩进距离
         * @effect 只在客户端调用生效
         * @returns 返回子项缩进距离
         */
        get itemIndentAmount(): number;
        /**
         * @description 设置子项缩进距离
         * @effect 只在客户端调用生效
         * @param itemIndentAmount usage:偏移量, 具体值需>=0, 负数无效果 range: [0, Inf) type: 整形
         */
        set itemIndentAmount(itemIndentAmount: number);
        /**
         * @description 设置是否在点击空白后清除选中项（仅初始化时设置有效）
         * @effect 只在客户端调用生效
         * @param clearSelectionOnClick usage:是否在点击空白后清除选中项 range: [true, false]
         */
        set clearSelectionOnClick(clearSelection: boolean);
        /**
         * @description 返回悬停状态改变代理
         * @effect 只在客户端调用生效
         * @returns 返回选择修改代理
         */
        get onItemHoverChanged(): mw.MulticastDelegate<(targetItem: mw.Widget, hovered: boolean) => void>;
        /**
         * @description 返回点击代理
         * @effect 只在客户端调用生效
         * @returns 返回点击代理
         */
        get onItemClicked(): mw.MulticastDelegate<(clickedItem: TreeViewItemDataBase, doubleClick: boolean) => void>;
        /**
         * @description 返回选择修改代理,取消选中/清空也会触发选中修改，返回参数selectedItem == null, 请注意判断
         * @effect 只在客户端调用生效
         * @returns 返回选择修改代理
         */
        get onItemSelected(): mw.MulticastDelegate<(selectedItem: TreeViewItemDataBase, selectType: mw.SelectInfo) => void>;
        /**
         * @description 展开状态修改代理
         * @effect 只在客户端调用生效
         * @returns 返回展开状态修改代理
         */
        get onItemExpansionChanged(): mw.MulticastDelegate<(targetItem: TreeViewItemDataBase, expanded: boolean) => void>;
        /**
         * @description 返回UI刷新生成同步代理
         * @effect 只在客户端调用生效
         * @returns 返回UI刷新生成同步代理
         */
        get onItemRefreshed(): mw.MulticastDelegate<(rowDatas: TreeViewItemDataBase[]) => void>;
        /**
         * @description 子控件移除显示时调用，等待复用前
         * @effect 只在客户端调用生效
         * @returns 返回选择修改代理
         */
        get onItemReleaseShow(): mw.MulticastDelegate<(targetItem: mw.Widget) => void>;
        /**
          * @description 设置是否受Touch事件影响滚动
          * @effect 只在客户端调用生效
          * @param bCanControl usage:能否touch控制滚动
          */
        setTouchCanControlThisScroll(bCanControl: boolean): void;
        /**
          * @description 获取是否受Touch事件影响滚动
          * @effect 只在客户端调用生效
          * @returns 能否touch能控制滚动
          */
        getTouchCanControlThisScroll(): boolean;
        /**
         * @description 创建 TreeView 控件，当parent和inName与已有的对象相同时，旧的对象会被销毁
         * @effect 只在客户端调用生效
         * @param uiAssetGUID usage: 设置视图绑定的节点UI range: 无
         * @param parent usage:创建控件的外parent对象 default:null
         * @param inName usage:创建控件的名称 default:null range: 无
         * @returns 创建的对象
         */
        static newObject(uiAssetGUID: string, parent?: mw.Canvas, inName?: string): TreeView;
    }
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author jie.wu
     * @description 获取 UI 脚本
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param UI  usage:UI控件
     * @returns UI绑定的脚本
     */
    function findUIScript(UI: mw.Widget): mw.UIScript;
    /**
     * @author jie.wu
     * @description 创建 UIPrefab
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param UIPrefabName usage:指定 UI 自定义控件的相对于工程的路径或则相对于 UI 目录的路径  range: 路径长度不做限制
     * @returns 对应的UI
     */
    function createUIByName(UIPrefabName: string): mw.UserWidget;
    /**
     * @author jie.wu
     * @description 创建 UIPrefab
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param UIPath usage:创建 UI 的完整路径  range: 路径长度
     * @returns 对应的UI
     */
    function createUIByPath(UIPath: string): mw.UserWidget;
    /**
     * @author jie.wu
     * @description 异步创建UI，失败返回空
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param UIPath usage:创建 UI 的完整路径  range: 路径长度
     * @returns 对应的UI
     */
    function asyncCreateUIByName(UIPath: string): Promise<mw.UserWidget>;
    /**
     * @author jie.wu
     * @description 创建空的 UI
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param panelClass usage:指定 UI 控件身上的行为脚本
     * @returns 对应的UI
     */
    function createUIOnlyClass<T extends mw.UIScript>(panelClass: {
        new (): T;
    }): T;
    /**
     * @author jie.wu
     * @description 创建UIPrefab
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param UIPrefabName usage:指定 UI 自定义控件的相对于工程的路径或则相对于 UI 目录的路径，为空的话等于 createUIOnlyClass  range: 路径长度不做限制
     * @param panelClass usage:继承至 UI 身上脚本的派生类
     * @returns 对应的UI
     */
    function createUI<T extends mw.UIScript>(UIPrefabName: string, panelClass: {
        new (): T;
    }): T;
    /**
     * @author jie.wu
     * @description 异步创建UI
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param UIPrefabName usage:指定 UI 自定义控件的相对于工程的路径或则相对于 UI 目录的路径 range: 无
     * @param panelClass usage:继承至 UI 身上脚本的派生类
     * @returns 对应的UI
     */
    function asyncCreateUI<T extends mw.UIScript>(UIPrefabName: string, panelClass: {
        new (): T;
    }): Promise<T>;
    /**
     * @author jie.wu
     * @description 异步请求资源的ICON信息
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:038 reason:该接口不再需要 replacement:直接设置ICON即可
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param assets usage:指定资源的id数组
     * @returns 异步回调
     */
    function assetIDChangeIconUrlRequest(assets: string[]): Promise<void>;
    /**
     * @author jie.wu
     * @description 获取资源的 ICON 信息
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param asset usage:指定资源的 id  range: 依据资源 ID 长度而定。
     * @param size  usage:指定资源的分辨率尺寸 default: AssetIconSize.Icon_128px
     * @returns 资源的ICON信息
     */
    function getAssetIconDataByAssetID(asset: string, size?: mw.AssetIconSize): mw.AssetIconData;
    /**
     * @author jie.wu
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:039 reason:接口调整 replacement: 使用 releaseTextureFromCache
     * @description 尝试标记资源的 ICON 图为待释放的等待释放
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param asset usage:指定资源的 id  range: 依据资源 ID 长度而定。
     */
    function releaseAssetIconTextureFromCache(asset: string): void;
    /**
     * @author jie.wu
     * @description 尝试标记资源的ICON或则一个URL地址用于释放本地缓存的资源数据
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param id usage:指定资源的 id  range: 依据资源 ID 长度而定。
     */
    function releaseTextureFromCache(id: string): void;
    /**
     * @author jie.wu
     * @description 分辨率改变时的回调
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param Delegate usage:传入回调函数
     */
    function getResolutionChanged(Delegate: mw.MulticastDelegate<(x: number, y: number) => void>): void;
}

declare namespace mw {
    /** @description 场景 zOrder开始于0*/
    const UILayerScene = 0;
    /** @description 底层 zOrder开始于100000*/
    const UILayerBottom = 1;
    /** @description 中层 zOrder开始于200000*/
    const UILayerMiddle = 2;
    /** @description 独享层(调用此层会自动隐藏Bottom和Middle层) zOrder开始于300000 */
    const UILayerOwn = 3;
    /** @description 顶层 zOrder开始于400000*/
    const UILayerTop = 4;
    /** @description 对话 zOrder开始于500000*/
    const UILayerDialog = 5;
    /** @description 系统 zOrder开始于600000*/
    const UILayerSystem = 6;
    /** @description 错误 这个层级不可以使用，需要增加层级可以使用addUILayerMap zOrder开始于700000*/
    const UILayerError = 7;
}

declare namespace mw {
    /**
     * @author jianke.feng
     * @groups 界面/基础
     * @description UI 对象
     * @description ----------------------------
     * @description 当你 UIPrefab 制作完成挂载到对象管理器中时，他便成为场景中的一份子，可以使用 GameObject 来查找。
     * @description 此类中的方法均在客户端调用。
     * @networkStatus usage:客户端
     */
    class UIObject extends mw.GameObject {
        /**
         * @groups 界面/基础
         * @description 获取挂载在对象管理器的 UIPrefab 完整路径
         * @effect 只在客户端调用生效
         * @returns UIPrefab 路径
         * @example
         * 使用示例:创建一个名为"NewScript"默认脚本脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏。代码如下：
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             // 传入的ID需要修改为你编辑器中挂载在对象管理器中的UIPrefab ID
         *             let ui = GameObject.findGameObjectById("28504DC8") as UIObject;
         *             console.log("The complete path of this UIPrefab is:" + ui.uiPath);
         *         }
         *     }
         * }
         * ```
         */
        get uiPath(): string;
        /**
         * @groups 界面/基础
         * @description 获取该对象下所绑定的 UI 根控件
         * @effect 只在客户端调用生效
         * @returns UIPrefab 中的根控件
         * @example
         * 使用示例:创建一个名为"NewScript"默认脚本脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏。代码如下：
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             // 传入的ID需要修改为你编辑器中挂载在对象管理器中的UIPrefab ID
         *             let ui = GameObject.findGameObjectById("28504DC8") as UIObject;
         *             console.log("The name of the script canvas mounted by this UIPrefab:" + ui.uiWidgetBase.name);
         *         }
         *     }
         * }
         * ```
         */
        get uiWidgetBase(): mw.UserWidget;
        /**
         * @groups 界面/基础
         * @description 获取在对象管理器中的 UIPrefab 上挂载的脚本
         * @effect  客户端调用
         * @returns UI绑定的脚本
         * @example
         * 使用示例:创建一个名为"NewScript"默认脚本脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏。代码如下：
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart    (): void {
         *         if(SystemUtil.isClient()){
         *             // 传入的ID需要修改为你编辑器中挂载在对象管理器中的UIPrefab ID
         *             let ui = GameObject.findGameObjectById("28504DC8") as UIObject;
         *             console.log("The name of the script root control mounted by this UIPrefab:" + ui.uiScript.rootCanvas.name);
         *         }
         *     }
         * }
         * ```
         */
        get uiScript(): mw.UIScript;
    }
}

declare namespace mw {
    /**
     * @ignore
     * @description 装饰器，标记控件路径用于自动化使用赋值等操作
     * @effect 只在客户端调用生效
     * @param inPath usage: 路径标记   range:
     */
    function UIWidgetBind(inPath: string): (target: unknown, attr: string) => void;
    /**
     * @ignore
     * @description 装饰器，标记脚本归属能力，提供脚本附加的UI路径等功能
     * @effect 只在客户端调用生效
     * @param bindUIClass usage: 绑定的UI文件路径
     */
    function UIBind(bindUIClass: string): (target: unknown) => void;
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
    class UIScript {
        /**
        * @groups 界面/基础
        * @description 添加一个全局行为
        * @description UI 事件通信的一种更加简便的方式。
        * @effect  只在客户端调用生效
        * @param key usage: 行为标记  range:字符串长度不受限制，合理即可
        * @param value usage: 行为值
        * @example
        * 使用示例: 创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在场景中生成一个屏幕 UI - 按钮，按下P键，按钮文字发生改变。
        * ```ts
        * @Component
        * export default class NewScript extends Script {
        *     protected onStart(): void {
        *         if(SystemUtil.isClient()){
        *             //UIService.create(newUI);
        *             UIService.show(newUI);
        *             UIScript.addBehavior("UI",(ui:StaleButton)=>{
        *                 ui.text = "change";
        *             });
        *         }
        *     }
        * }
        *
        * class newUI extends UIScript{
        *     button:StaleButton;
        *     protected onStart() {
        *         //设置能否每帧触发onUpdate
        *         this.canUpdate = false;
        *         this.layer = UILayerMiddle;
        *
        *         this.button = StaleButton.newObject(this.rootCanvas);
        *
        *         this.button.text = "Press to turn red";
        *         this.button.transitionEnable = true;
        *         this.button.pressedImagColor = LinearColor.red;
        *         this.button.visibility = SlateVisibility.Visible;
        *         this.button.onClicked.add(() => {
        *             console.log("click");
        *         })
        *         InputUtil.onKeyDown(Keys.P,()=>{
        *             let ui = UIScript.getBehavior("UI");
        *             ui(this.button);
        *         });
        *     }
        * }
        * ```
        */
        static addBehavior(key: string, value: any): void;
        /**
         * @groups 界面/基础
         * @description 移除全局一个行为
         * @effect  只在客户端调用生效
         * @param key usage: 行为标记  range:字符串长度不受限制，合理即可
         */
        static removeBehavior(key: string): void;
        /**
         * @groups 界面/基础
         * @description 清空全局一个行为
         * @effect  只在客户端调用生效
         */
        static clearBehavior(): void;
        /**
         * @groups 界面/基础
         * @description 执行一个全局的行为
         * @effect  只在客户端调用生效
         * @param key usage: 行为标记  range:字符串长度不受限制，合理即可
         * @returns 返回一个行为
         * @example
         * 使用示例: 创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在场景中生成一个屏幕 UI - 按钮，按下P键，按钮文字发生改变。
         * ```ts
         * @Component
         * export default class NewScript extends Script {
         *     protected onStart(): void {
         *         if(SystemUtil.isClient()){
         *             //UIService.create(newUI);
         *             UIService.show(newUI);
         *             UIScript.addBehavior("UI",(ui:StaleButton)=>{
         *                 ui.text = "change";
         *             });
         *         }
         *     }
         * }
         *
         * class newUI extends UIScript{
         *     button:StaleButton;
         *     protected onStart() {
         *         //设置能否每帧触发onUpdate
         *         this.canUpdate = false;
         *         this.layer = UILayerMiddle;
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *
         *         this.button.text = "Press to turn red";
         *         this.button.transitionEnable = true;
         *         this.button.pressedImagColor = LinearColor.red;
         *         this.button.visibility = SlateVisibility.Visible;
         *         this.button.onClicked.add(() => {
         *             console.log("click");
         *         })
         *         InputUtil.onKeyDown(Keys.P,()=>{
         *             let ui = UIScript.getBehavior("UI");
         *             ui(this.button);
         *         });
         *     }
         * }
         * ```
         */
        static getBehavior(key: string): any;
        /**
         * @groups 界面/基础
         * @description 获取 UI 顶层控件对象
         * @returns 脚本挂载的UI对象
         * @example
         * 使用示例: 创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，编辑器会动态生成一个 UserWidget，可以看到 UserWidget 控件的名字。
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
         *         console.log(this.uiObject.name);
         *         console.log(this.uiWidgetBase.name);
         *         console.log(this.rootCanvas.name);
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *     }
         * }
         * ```
         */
        get uiObject(): mw.Widget;
        /**
         * @groups 界面/基础
         * @description 获取 UI 顶层控件对象
         * @effect  只在客户端调用生效
         * @returns 返回转化指定UserWidget对象
         * @example
         * 使用示例: 创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，编辑器会动态生成一个 UserWidget，可以看到 UserWidget 控件的名字。
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
         *         console.log(this.uiObject.name);
         *         console.log(this.uiWidgetBase.name);
         *         console.log(this.rootCanvas.name);
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *     }
         * }
         * ```
         */
        get uiWidgetBase(): mw.UserWidget;
        /**
         * @groups 界面/基础
         * @description 获取是否能触发 UI 中 onUpdate 生命周期函数
         * @description 默认是 false
         * @effect  只在客户端调用生效
         * @returns 返回能否触发
         */
        get canUpdate(): boolean;
        /**
         * @groups 界面/基础
         * @description 设置是否能触发 UI 中 onUpdate 生命周期函数
         * @effect  只在客户端调用生效
         * @param bCanUpdate usage: 能否触发
         */
        set canUpdate(bCanUpdate: boolean);
        /**
         * @groups 界面/基础
         * @description 销毁 UI 对象
         * @effect  只在客户端调用生效
         */
        destroy(): void;
        /**
         * @groups 界面/基础
         * @description 移除 UI 对象
         * @effect  只在客户端调用生效
         */
        remove(): void;
        /**
          * @description 获取 UI 是否显示
          * @effect  只在客户端调用生效
          * @returns 返回是否可见
          */
        get visible(): boolean;
        /**
         * @groups 界面/基础
         * @description 设置 UI 是否显示
         * @description 会触发绑定的脚本生命周期中 OnShow/OnHide 事件，需要传递参数的可以使用 setVisible 方法。
         * @effect  只在客户端调用生效
         * @param inVisible usage: 设置是否可见 可见设置为SelfHitTestInvisible,不可见设置为Collapsed
         */
        set visible(inVisible: boolean);
        /**
         * @groups 界面/基础
         * @description 设置随父节点全屏适配,会验证父节点大小以保证跟随父节点的大小
         * @effect  只在客户端调用生效
         * @param inFull usage: 设置为随父节点大小全屏适配
         */
        set fullScreen(inFull: boolean);
        /**
         * @groups 界面/基础
         * @description 设置 UI 是否显示
         * @description 会触发绑定的脚本的 OnShow/OnHide 事件，可以传递参数。
         * @effect  只在客户端调用生效
         * @param inVisible usage: 设置是否可见，如果是 boolean 类型设置为 SelfHitTestInvisible ，不可见设置为 Collapsed，
         * 否则为按照枚举拉设置具体的显示类型。
         * @param params usage: 传递给onShow的参数
         */
        setVisible(inVisible: boolean | mw.SlateVisibility, ...params: any[]): void;
        /**
         * @groups 界面/基础
         * @description 设置 UI 的所在的 Layer 层级
         * @description 显示可能会影响到 zOrder，使用 UIService 显示 UI 时，会根据 Layer 层级动态设置 zOrder，每一次调用都会重新计算当前 layer 的新 zOrder，确保 UI 位于当前层级的顶端。
         * @effect 只在客户端调用生效
         * @param inLayer usage: 设置Layer层级
         */
        set layer(inLayer: number);
        /**
         * @groups 界面/基础
         * @description 获取 UI 的 Layer 层级
         * @effect  只在客户端调用生效
         * @returns Layer层级
         * @example
         * 使用示例: 一般来说，可以使用内置定义好的，也可以是自定义拓展层级
         * ```ts
         * // @description 场景 zOrder开始于0
         * const UILayerScene: typeof mw.UILayerScene;
         * // @description 底层 zOrder开始于100000
         * const UILayerBottom: typeof mw.UILayerBottom;
         * // @description 中层 zOrder开始于200000
         * const UILayerMiddle: typeof mw.UILayerMiddle;
         * // @description 独享层(调用此层会自动隐藏Bottom和Middle层) zOrder开始于300000
         * const UILayerOwn: typeof mw.UILayerOwn;
         * // @description 顶层 zOrder开始于400000
         * const UILayerTop: typeof mw.UILayerTop;
         * // @description 对话 zOrder开始于500000
         * const UILayerDialog: typeof mw.UILayerDialog;
         * // @description 系统 zOrder开始于600000
         * const UILayerSystem: typeof mw.UILayerSystem;
         * // @description 错误 这个层级不可以使用，需要增加层级可以使用addUILayerMap zOrder开始于700000
         * const UILayerError: typeof mw.UILayerError;
         * ```
         */
        get layer(): number;
        /**
         * @groups 界面/基础
         * @description 获取 UI 的根 Canvas 节点
         * @effect  只在客户端调用生效
         * @returns 返回canvas节点
         * @example
         * 使用示例: 创建一个名为 NewScript 的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，此示例中 this.rootCanvas.name 为空，因为没有给这个界面添加 Canvas。
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
         *         console.log(this.uiObject.name);
         *         console.log(this.uiWidgetBase.name);
         *         console.log(this.rootCanvas.name);
         *
         *         this.button = StaleButton.newObject(this.rootCanvas);
         *         this.button.text = "button";
         *         this.button.visibility = SlateVisibility.Visible;
         *     }
         * }
         * ```
         */
        get rootCanvas(): mw.Canvas;
        /**
         * @groups 界面/基础
         * @description 触发 DragDrop 事件的检测
         * @effect  只在客户端调用生效
         * @param dragKey usage:触发按键 default:mw.Keys
         * @returns 返回触发的事件回复
         */
        detectDrag(dragKey: mw.Keys): mw.EventReply;
        /**
         * @groups 界面/基础
         * @description 事件检测通过，触发 DragDrop 事件的回复。
         * @effect  只在客户端调用生效
         * @param inPointEvent usage:传递触发的事件信息
         * @param dragKey usage:触发按键
         * @returns 返回触发的事件回复
         */
        detectDragIfPressed(inPointEvent: mw.PointerEvent, dragKey: mw.Keys): mw.EventReply;
        /**
         * @groups 界面/基础
         * @description 创建 DragDrop 事件
         * @effect  只在客户端调用生效
         * @param inVisualWidget usage:拖拽显示的UI控件
         * @param inTag usage:标签文本 default:""  range:不做限制
         * @param inPayLoad usage:拖拽事件数据信息 default:null
         * @param inPivot usage:拖拽显示UI的锚点 default:UIType.DragPivot.TopLeft
         * @param inOffset usage:拖拽显示UI相对于锚点的偏移的百分比 default:vector2(0,0)
         * @returns 返回触发的事件回复
         */
        newDragDrop(inVisualWidget: mw.Widget, inTag?: string, inPayLoad?: any, inPivot?: mw.DragPivot, inOffset?: mw.Vector2): mw.DragDropOperation;
    }
}

declare namespace mw {
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
    class UIService {
        /**
          * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 027 reason: 删除接口 replacement: 请直接使用静态方法
          * @description 获取UIService单例
          * @effect  只在客户端调用生效
          * @returns 返回获取UIService单例的对象
          */
        static get instance(): UIService;
        /**
         * @groups 界面/基础
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 027 reason: 删除接口 replacement: 请直接使用静态方法
         * @description 获取UIService子类ManagerClass单例，如果是第一次调用会创建一个ManagerClass的单例供全局使用
         * @effect  只在客户端调用生效
         * @param ManagerClass usage:子类
         * @returns 返回获取UIService子类ManagerClass单例的对象
         */
        static getInstance<T extends UIService>(ManagerClass: {
            new (): T;
        }): T;
        /**
         * @groups 界面/基础
         * @description 独占Panel
         */
        protected uniquePanel: mw.UIScript;
        /**
         * @groups 界面/基础
         * @description 所有创建过的管理好的 panels
         */
        protected createPanelMap: Map<string, mw.UIScript[]>;
        /**
        * @groups 界面/基础
        * @description 所有创建过的Panel
        */
        protected allPanels: mw.UIScript[];
        /**
         * @groups 界面/基础
         * @description 是否dump GameUI Log 信息
         */
        protected logUIInfo: boolean;
        /**
         * @groups 界面/基础
         * @description 初始化UIManger
         * @effect  只在客户端调用生效
         */
        protected init(): void;
        /**
         * @groups 界面/基础
         * @description 打印所有管理到的UI信息
         * @effect  只在客户端调用生效
         */
        dumpUIData(): void;
        /**
         * @groups 界面/基础
         * @description 全局所有UI的根canvas
         * @effect  只在客户端调用生效
         * @returns 根canvas
         */
        static get canvas(): mw.Canvas;
        /**
         * @groups 界面/基础
         * @description 允许定时输出 UIService 中管理到的 UI 的信息
         * @effect  只在客户端调用生效
         * @param enable usage:运行与否
         */
        static set uiLogInfoEnable(enable: boolean);
        /**
         * @groups 界面/基础
         * @description 获取允许定时输出 UIService 中管理到的 UI 的信息
         * @effect  只在客户端调用生效
         * @returns 是否允许
         */
        static get uiLogInfoEnable(): boolean;
        /**
         * @groups 界面/基础
         * @description 添加 UI 的管理层
         * @effect  只在客户端调用生效
         * @param layer usage:layer 的序列号  range: 不做限制  type:整数
         * @param startZOrder usage:该层开始的 zOrder  range: 不做限制  type:整数
         */
        protected static addUILayerMap(layer: number, startZOrder: number): void;
        /**
         * @groups 界面/基础
         * @description 销毁该服务，也会销毁所有的UI,再次使用该服务器会重新初始化
         * @effect  只在客户端调用生效
         */
        static destroy(): void;
        /**
         * @groups 界面/基础
         * @description 显示一个界面,会把界面添加到界面上，从原有父节点移除
         * @effect  只在客户端调用生效
         * @param panel usage:界面
         * @param layer usage:图层 default:UILayer.UILayerMiddle  range:不做限制，可使用 UILayerMiddle 类型枚举  type: 整形
         * @param params usage:显示参数(这个参数可以传递给界面的onShow方法)
         * @returns 显示的界面
         */
        static showUI(panel: mw.UIScript, layer?: number, ...params: any[]): mw.UIScript;
        /**
         * @groups 界面/基础
         * @description 移除一个显示的界面,只是隐藏界面设置为Collapsed
         * @effect 只在客户端调用生效
         * @param panel usage:界面
         * @returns 是否移除成功
         */
        static hideUI(panel: mw.UIScript): boolean;
        /**
         * @groups 界面/基础
         * @description 根据界面类获取界面的对象
         * @effect 只在客户端调用生效
         * @param PanelClass usage:界面类型
         * @param bNeedNew usage:没有找到的有缓存的UI界面时，是否需要新建一个 default:true
         * @returns 界面对象
         */
        static getUI<T extends mw.UIScript>(PanelClass: {
            new (): T;
        }, bNeedNew?: boolean): T;
        /**
         * @groups 界面/基础
         * @description 根据界面类获取界面的所有对象
         * @effect 只在客户端调用生效
         * @param PanelClass usage:界面类型
         * @returns 界面对象数组,没有的话返回空
         */
        static getAllUI<T extends mw.UIScript>(PanelClass: {
            new (): T;
        }): T[];
        /**
         * @groups 界面/基础
         * @description 创建一个界面
         * @effect  只在客户端调用生效
         * @param PanelClass usage:界面的类
         * @returns 返回创建的UI行为脚本
         */
        static create<T extends mw.UIScript>(PanelClass: {
            new (): T;
        }): T;
        /**
         * @groups 界面/基础
         * @description 异步创建一个界面,失败返回空
         * @effect  只在客户端调用生效
         * @param PanelClass usage:界面的类
         * @returns 返回创建的UI行为脚本
         */
        static asyncCreate<T extends mw.UIScript>(PanelClass: {
            new (): T;
        }): Promise<T>;
        /**
         * @groups 界面/基础
         * @description 显示一个界面，会把界面添加到界面上，从原有父节点移除
         * @effect 只在客户端调用生效
         * @param PanelClass usage:界面的类如果类没有UI绑定，会创建一个默认的空UI
         * @param params usage:显示参数(这个参数可以传递给界面的onShow方法)
         * @returns 显示的界面
         */
        static show<T extends mw.UIScript>(PanelClass: {
            new (): T;
        }, ...params: any[]): T;
        /**
         * @groups 界面/基础
         * @description 异步显示一个界面，会把界面添加到界面上，从原有父节点移除，失败返回空
         * @effect 只在客户端调用生效
         * @param PanelClass usage:界面的类如果类没有UI绑定，会创建一个默认的空UI
         * @param params usage:显示参数(这个参数可以传递给界面的onShow方法)
         * @returns 显示的界面
         */
        static asyncShow<T extends mw.UIScript>(PanelClass: {
            new (): T;
        }, ...params: any[]): Promise<T>;
        /**
         * @groups 界面/基础
         * @description 隐藏一个界面，只是隐藏界面设置为Collapsed
         * @effect 只在客户端调用生效
         * @param PanelClass usage:界面的类
         * @returns 返回隐藏的UI行为类(这个参数可以传递给界面的onHide方法)
         */
        static hide<T extends mw.UIScript>(PanelClass: {
            new (): T;
        }): T;
        /**
         * @groups 界面/基础
         * @description 销毁一个界面,相当于DestroyObject
         * @effect 只在客户端调用生效
         * @param PanelClass usage:销毁界面
         */
        static destroyUI<T extends mw.UIScript>(PanelClass: {
            new (): T;
        }): void;
        /**
         * @groups 界面/基础
         * @description 判断界面是否处于显示状态,需要位于层类显示并且是可见的
         * @effect 只在客户端调用生效，只能用于检测通过showUI展示的界面，其他建议使用visible/visibility
         * @param panel usage:界面
         * @returns 是否显示
         */
        protected static isShown(panel: mw.UIScript): boolean;
        /**
         * @groups 界面/基础
         * @description 设置Middle和Bottom层所有Panel的可见性
         * @effect 只在客户端调用生效
         * @param value usage:显隐值
         */
        static setAllMiddleAndBottomPanelVisible(value: boolean): void;
        /**
         * @groups 界面/基础
         * @description 获取一个UI的层级
         * @effect 只在客户端调用生效
         * @param panel usage:GameUI
         * @returns UI的层级
         */
        static getUILayer(panel: mw.UIScript): number;
    }
}

declare namespace mw {
    /**
     * @author jie.wu
     * @description 判定给定坐标是否在geometry下
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @param absolutePosition usage:绝对坐标
     * @returns 坐标是否在geometry下
     */
    function isUnderLocation(geometry: mw.Geometry, absolutePosition: mw.Vector2): boolean;
    /**
     * @author jie.wu
     * @description 转化绝对坐标到相对坐标
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @param absolutePosition usage:绝对坐标
     * @returns 相对坐标
     */
    function absoluteToLocal(geometry: mw.Geometry, absolutePosition: mw.Vector2): mw.Vector2;
    /**
     * @author jie.wu
     * @description 将局部坐标转换为绝对坐标,绝对坐标可以是桌面空间，也可以是窗口空间，这取决于小部件层次结构的根所在的空间。
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @param localPosition usage:相对坐标
     * @returns 绝对坐标
     */
    function localToAbsolute(geometry: mw.Geometry, localPosition: mw.Vector2): mw.Vector2;
    /**
     * @author jie.wu
     * @description 返回局部空间中几何图形的局部顶部/左侧
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @returns 返回LeftTop
     */
    function getLocalTopLeft(geometry: mw.Geometry): mw.Vector2;
    /**
     * @author jie.wu
     * @description 返回局部空间中几何图形的大小
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @returns 返回Size
     */
    function getLocalSize(geometry: mw.Geometry): mw.Vector2;
    /**
     * @author jie.wu
     * @description 返回绝对空间中几何图形的大小
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @returns 返回Size
     */
    function getAbsoluteSize(geometry: mw.Geometry): mw.Vector2;
    /**
     * @author jie.wu
     * @description 转化绝对空间下矢量到局部空间下
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @param absoluteVector usage:绝对空间矢量
     * @returns 局部空间下矢量
     */
    function transformVectorAbsoluteToLocal(geometry: mw.Geometry, absoluteVector: mw.Vector2): mw.Vector2;
    /**
     * @author jie.wu
     * @description 转化局部空间下矢量到绝对空间下
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param geometry usage:几何体
     * @param localVector usage:局部空间下矢量
     * @returns 绝对空间矢量
     */
    function transformVectorLocalToAbsolute(geometry: mw.Geometry, localVector: mw.Vector2): mw.Vector2;
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
    function localToViewport(geometry: mw.Geometry, localPosition: mw.Vector2, outPixelPosition: mw.Vector2, outViewportPosition: mw.Vector2): void;
    /**
     * @author jie.wu
     * @description 将桌面空间中几何图形的绝对坐标转换为本地视口坐标
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param absoluteDesktopPosition usage:绝对桌面坐标
     * @param outPixelPosition usage:可用于线的轨迹和其他用途，你需要在视口分辨率单位的空间坐标
     * @param outViewportPosition usage:如果你想添加另一个小部件到视口空间相同的位置
     */
    function absoluteToViewport(absoluteDesktopPosition: mw.Vector2, outPixelPosition: mw.Vector2, outViewportPosition: mw.Vector2): void;
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
    function screenToWidgetLocal(geometry: mw.Geometry, screenPosition: mw.Vector2, isIncludeWindowPosition?: boolean): mw.Vector2;
    /**
     * @author jie.wu
     * @description 将屏幕位置(像素)转换为绝对桌面程序坐标。如果bIncludeWindowPosition为真，那么这个方法也将移除游戏窗口的位置(在窗口模式下有用)。
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param screenPosition usage:屏幕位置
     * @param isIncludeWindowPosition usage:是否移除游戏窗口位置(在窗口模式下有用) default:false
     * @returns 绝对桌面程序坐标
     */
    function screenToWidgetAbsolute(screenPosition: mw.Vector2, isIncludeWindowPosition?: boolean): mw.Vector2;
    /**
     * @author jie.wu
     * @description 将屏幕位置(以像素为单位)转换为视口控件的本地空间。
     * @groups 界面
     * @effect  只在客户端调用生效
     * @param screenPosition usage:屏幕位置
     * @returns 本地位置
     */
    function screenToViewport(screenPosition: mw.Vector2): mw.Vector2;
    /**
     * @author jie.wu
     * @description 获取当前鼠标所在的绝对位置
     * @groups 界面
     * @effect  只在客户端调用生效
     * @returns 绝对位置
     */
    function getCurrentMousePosition(): mw.Vector2;
    /**
     * @author jie.wu
     * @description 获取上一次鼠标所在的绝对位置
     * @groups 界面
     * @effect  只在客户端调用生效
     * @returns 绝对位置
     */
    function getLastMousePosition(): mw.Vector2;
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 帧动画播放规则
     */
    enum PlayStatus {
        /** 播放中 */
        Playing = 0,
        /** 暂停播放 */
        Paused = 1,
        /** 停止播放 */
        Stopped = 2
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 输入框回车键功能
     */
    enum InsertNewLineType {
        /**
         * 所有回车都是换行
         */
        AllNewLine = 0,
        /**
         * Ctrl + Enter 是换行
         */
        CtrlEnterNewLine = 1,
        /**
         * Alt + Enter 是换行
         */
        AltEnterNewLine = 2,
        /**
         * Shift + Enter 是换行
         */
        ShiftEnterNewLine = 4,
        /**
         * Command + Enter 是换行
         */
        CommandEnterNewLine = 8,
        /**
         * 所有回车都是提交，不换行
         */
        AllCommit = 16
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 选中规则
     */
    enum CheckBoxState {
        /** 未选中 */
        Unchecked = 0,
        /** 选中 */
        Checked = 1,
        /** 未明确 */
        Undetermined = 2
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 自动布局排版规则-排列规则
     */
    enum UILayoutPacket {
        /** 左上对齐 */
        LeftTop = 0,
        /** 左中对齐 */
        LeftCenter = 1,
        /** 左下对齐 */
        LeftBottom = 2,
        /** 右上对齐 */
        RightTop = 3,
        /** 右中对齐 */
        RightCenter = 4,
        /** 右下对齐 */
        RightBottom = 5,
        /** 中上对齐 */
        CenterTop = 6,
        /** 中中对齐 */
        CenterCenter = 7,
        /** 中下对齐 */
        CenterBottom = 8
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 自动布局排版规则-容器类型
     */
    enum UILayoutType {
        /** 水平 */
        Horizontal = 0,
        /** 垂直 */
        Vertical = 1
    }
    /**  */
    /**
    * @author jianke.feng
    * @groups 界面
    * @description 自动布局容器水平适应规则
    */
    enum UIHugContentHorizontally {
        /** 固定宽度 */
        FixWidth = 0,
        /** 自适应宽度 */
        HugContent = 1
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 自动布局容器垂直适应规则
     */
    enum UIHugContentVertically {
        /** 固定高度 */
        FixHeight = 0,
        /** 自适应高度 */
        HugContent = 1
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 自动布局子项布局排序 - 水平排序
     */
    enum UIHorizontalCollation {
        /** 从左到右排序 */
        LeftToRight = 0,
        /** 从右到左排序 */
        RightToLeft = 1
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 自动布局子项布局排序 - 垂直排序
     */
    enum UIVerticalCollation {
        /** 从上到下排序 */
        TopToBottom = 0,
        /** 从下到上排序 */
        BottomToTop = 1
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 文本框规则显示规则限制
     */
    enum UITextHorizontalLayout {
        /** 自动换行 */
        AutoWarpText = 0,
        /** 裁剪 */
        Clipping = 1,
        /** 不裁剪 */
        NoClipping = 2
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 滚动框动画类型
     */
    enum UIScrollBoxAnimationType {
        /** 弹性运动 */
        ElasticAnimation = 0,
        /** 不做限制 */
        NoneLimit = 1,
        /** 限制 */
        Limit = 2
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 对齐策略水平规则
     */
    enum UIConstraintHorizontal {
        /** 左对齐*/
        Left = 0,
        /** 右对齐 */
        Right = 1,
        /** 距离左右边距固定 */
        LeftRight = 2,
        /** 居中对齐 */
        Center = 3,
        /** 距离左右百分比固定 */
        Scale = 4
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 对齐策略垂直规则
     */
    enum UIConstraintVertical {
        /** 上对齐*/
        Top = 0,
        /** 下对齐 */
        Bottom = 1,
        /** 距离上下边距固定 */
        TopBottom = 2,
        /** 居中对齐 */
        Center = 3,
        /** 距离上下边距百分比固定 */
        Scale = 4
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 字体类型
     */
    enum UIFontGlyph {
        /** 普通*/
        Normal = 0,
        /** 粗体*/
        Bold = 1,
        /** 细体*/
        Light = 2,
        /** 斜体*/
        Italics = 3,
        /** 粗斜体*/
        BoldItalics = 4,
        /** 超粗体 */
        Heavy = 5
    }
    /**
     * @author yang.zheng
     * @groups 界面
     * @description 字体
     */
    enum UIFontFamily {
        /** Roboto */
        Roboto = 0,
        /** SourceHanSans */
        SourceHanSans = 1,
        /** Objectivity */
        Objectivity = 2,
        /** VinaSans */
        VinaSans = 3,
        /** Facon */
        Facon = 4,
        /** JustAnotherHand */
        JustAnotherHand = 5,
        /** PTRootUI */
        PTRootUI = 6,
        /** Melete */
        Melete = 7,
        /** Jua */
        Jua = 8,
        /** AlimamaFangYuanTi */
        AlimamaFangYuanTi = 9,
        /** CangErYuYangTi */
        CangErYuYangTi = 10,
        /** JingNanBoBoHei */
        JingNanBoBoHei = 11,
        /** WenDaoChaoHei */
        WenDaoChaoHei = 12,
        /** AlibabaPuHuiTi */
        AlibabaPuHuiTi = 13
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 文本排列对齐规则
     */
    enum TextJustify {
        /**
         * 从逻辑上向左对齐文本。
         * 当文本从左向右流动时，这将使文本在视觉上向左对齐。
         * 当文本从右向左流动时，这将使文本在视觉上向右对齐。
         */
        Left = 0,
        /**
         * 对齐中间的文本。
         * 文本流动方向对该对齐模式没有影响。
         */
        Center = 1,
        /**
         * 在逻辑上向右对齐文本。
         * 当文本从左向右流动时，这将使文本在视觉上向右对齐。
         * 当文本从右向左流动时，这将使文本在视觉上向左对齐。
         */
        Right = 2
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 文本排列垂直对齐规则
     */
    enum TextVerticalJustify {
        /** 居上对齐 */
        Top = 0,
        /** 居中对齐 */
        Center = 1,
        /** 居下对齐 */
        Bottom = 2
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 按钮点击响应规则
     */
    enum ButtonClickMethod {
        /**
         * 用户必须按下按钮，然后在按钮上方释放以触发单击。
         * 这是最常见的按钮类型。
         */
        DownAndUp = 0,
        /**
         * 单击将在鼠标按下时立即触发，并且不会捕获鼠标。
         */
        MouseDown = 1,
        /**
         * 当鼠标按钮在按钮上释放时，总是会触发单击，
         * 即使没有按下按钮。
         */
        MouseUp = 2,
        /**
         * 在列表中，只能通过精确点击按钮。
         * 移动指针将滚动列表，还允许拖动可拖放按钮。
         */
        PreciseClick = 3
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 按钮触摸响应规则
     */
    enum ButtonTouchMethod {
        /** 大多数按钮都是这样的按下并且抬起才会触发 */
        DownAndUp = 0,
        /**
         * 点击将在触碰时立即触发，触碰将不会被捕获。
         */
        Down = 1,
        /**
         * 在列表中，只能通过精确点击按钮。
         * 移动指针将滚动列表。
         */
        PreciseTap = 2
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 按钮按压响应规则
     */
    enum ButtonPressMethod {
        /**
         * 用户必须按下按钮，然后在按钮具有焦点时释放，以触发单击。
         * 这是最常见的按钮类型。
        */
        DownAndUp = 0,
        /**
        * 按下按钮后，单击将立即触发。
        */
        ButtonPress = 1,
        /**
         * 当焦点按钮上发生按钮释放时，始终会触发单击，
         * 即使聚焦时没有按下按钮。
        */
        ButtonRelease = 2
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description UI节点显示规则
     */
    enum SlateVisibility {
        /** 可见 */
        Visible = 0,
        /** 折叠 使用该模式将不显示自身以及子节点，并且在整个布局中将不占用任何空间（可看作完全不再存在） */
        Collapsed = 1,
        /** 隐藏 使用该模式将不显示自身以及子节点，但是仍会根据已计算出的大小占用对应的布局位置 */
        Hidden = 2,
        /** 可见 自身以及子节点不可响应事件 */
        HitTestInvisible = 3,
        /** 可见 自身不可响应事件 */
        SelfHitTestInvisible = 4
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 鼠标锁定模式
     */
    enum MouseLockMode {
        /** 不会将鼠标光标锁定到视口 */
        DoNotLock = 0,
        /** 仅在捕获鼠标时将鼠标光标锁定到视口 */
        LockOnCapture = 1,
        /** 始终将鼠标光标锁定到视口 */
        LockAlways = 2,
        /** 处于全屏状态时将锁定光标*/
        LockInFullscreen = 3
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 相机控制模式
     */
    enum CameraControlType {
        /** 无控制类型*/
        None = 0,
        /** 移动 控制*/
        MoveType = 1,
        /** 相机  控制*/
        CameraType = 2
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 滚动框类型
     */
    enum Orientation {
        /** 水平 */
        OrientHorizontal = 0,
        /** 垂直 */
        OrientVertical = 1
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 光标类型
     */
    enum MouseCursor {
        /** 使鼠标光标不可见 */
        None = 0,
        /** 默认光标（箭头） */
        Default = 1,
        /** 文本编辑框 */
        TextEditBeam = 2,
        /** 调整水平大小 */
        ResizeLeftRight = 3,
        /** 调整垂直大小 */
        ResizeUpDown = 4,
        /** 调整对角线大小 */
        ResizeSouthEast = 5,
        /** 调整其他对角线的大小 */
        ResizeSouthWest = 6,
        /** 移动项目 */
        CardinalCross = 7,
        /** 目标十字 */
        Crosshairs = 8,
        /** 手型光标 */
        Hand = 9,
        /** 抓手光标 */
        GrabHand = 10,
        /** 抓手指针关闭 */
        GrabHandClosed = 11,
        /** 有对角线穿过的圆 */
        SlashedCircle = 12,
        /** 用于拾取颜色的滴管光标 */
        EyeDropper = 13,
        /** 画笔 */
        PaintBrush = 14
    }
    /**
     * @description  滚动条默认位置
     * @groups 界面
     * @author jianke.feng
     *
     */
    enum ScrollBarDefaultLocation {
        /** 默认顶部/左侧 */
        TopOrLeft = 0,
        /** 默认居中 */
        Center = 1,
        /** 默认底部/右侧 */
        BottomOrRight = 2
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 进度条填充规则
     */
    enum ProgressBarFillType {
        /** 从左到右 */
        LeftToRight = 0,
        /** 从右到左 */
        RightToLeft = 1,
        /** 从中心开始 */
        FillFromCenter = 2,
        /** 从上到下 */
        TopToBottom = 3,
        /** 从下到上 */
        BottomToTop = 4
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description UI颜色应用模式
     */
    enum SlateColorStylingMode {
        /** 颜色值存储在此颜色中 */
        UseColorSpecified = 0,
        /** 颜色值存储在链接的颜色中 */
        UseColorSpecifiedLink = 1,
        /** 使用部件的前景色。 */
        UseColorForeground = 2,
        /** 使用部件的柔和颜色 */
        UseColorForegroundSubdued = 3
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 图片画刷绘制模式
     */
    enum SlateBrushDrawType {
        /** 不绘制 */
        NoDrawType = 0,
        /** 绘制一个3x3长方体，其中边和中间根据边距拉伸 */
        Box = 1,
        /** 在边平铺且中间为空的位置绘制3x3边框 */
        Border = 2,
        /** 画一个图像 */
        Image = 3,
        /** 像素大小边距的Box */
        PixcelBox = 4
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 图片画刷填充模式
     */
    enum SlateBrushTileType {
        /** 拉伸 */
        NoTile = 0,
        /** 水平平铺 */
        Horizontal = 1,
        /** 垂直平铺 */
        Vertical = 2,
        /** 水平垂直平铺 */
        Both = 3
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 输入框限制
     */
    enum InputTextLimit {
        /** 无限制 */
        NoLimit = 0,
        /** 整数 */
        LimitToInt = 1,
        /** 浮点数 */
        LimitToFloat = 2,
        /** 数字或则字母 */
        LimitToNumberAndChar = 3,
        /** 密码 */
        LimitToPassword = 4
    }
    /**  */
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 输入提交模式
     */
    enum TextCommit {
        /** 默认 */
        Default = 0,
        /** 输入回车 */
        OnEnter = 1,
        /** 失去焦点 */
        OnUserMovedFocus = 2,
        /** 清除时 */
        OnCleared = 3
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 拖拽的锚点
     */
    enum DragPivot {
        /** 按下点 */
        MouseDown = 0,
        /** 左上 */
        TopLeft = 1,
        /** 上中 */
        TopCenter = 2,
        /** 右上 */
        TopRight = 3,
        /** 左中 */
        CenterLeft = 4,
        /** 中心点 */
        CenterCenter = 5,
        /** 右中 */
        CenterRight = 6,
        /** 左下 */
        BottomLeft = 7,
        /** 中下 */
        BottomCenter = 8,
        /** 右下 */
        BottomRight = 9
    }
    /**
    * @author jie.wu
    * @groups 界面
    * @description 进度条滑动的方式
    */
    enum SlideMethod {
        /** 点击就立刻改变进度条的值 */
        PressOrSlide = 0,
        /** 点击并滑动才能改变进度条的值 */
        Slide = 1
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 遮罩类型
     */
    enum MaskButtonType {
        /** 圆形 */
        MTCircle = 0,
        /** 扇形 */
        MTFanShaped = 1,
        /** 圆角 */
        MTRoundRect = 2
    }
    /**
     * @author jianke.feng
     * @groups 界面
     * @description 新版遮罩类型
     */
    enum MaskType {
        /** 矩形 */
        RoundRect = 0,
        /** 圆形 */
        Circle = 1,
        /** 自定义图片 */
        Image = 2,
        /** 不带遮罩 */
        None = 3
    }
    /**
     * @author maohang.zeng
     * @groups 界面
     * @description 列表视图选择模式
     */
    enum SelectionMode {
        /** 无法选中 */
        None = 0,
        /** 单选 */
        Single = 1,
        /** 单选并可取消选中 */
        SingleToggle = 2,
        /** 多选 */
        Multi = 3
    }
    /**
     * @author maohang.zeng
     * @groups 界面
     * @description 列表视图选择来源信息
     */
    enum SelectInfo {
        /** 键盘 */
        OnKeyPress = 0,
        /** 导航 */
        OnNavigation = 1,
        /** 鼠标 */
        OnMouseClick = 2,
        /** 代码选中 */
        Direct = 3
    }
    /**
     * @author wei.yang
     * @groups 界面
     * @description 菜单呼出位置枚举
     */
    enum MenuPlacement {
        /** 将菜单放在锚点正下方 */
        BelowAnchor = 0,
        /** 将菜单放在锚点正中间 */
        CenteredBelowAnchor = 1,
        /** 将菜单直接放置在锚点下方，锚点与内容的右侧对齐 */
        BelowRightAnchor = 2,
        /** 将菜单放在锚点正下方，并将其宽度与锚点内容相匹配 */
        ComboBox = 3,
        /** 将菜单放在锚点正下方，并将其宽度与锚点内容相匹配。如果宽度溢出，则与锚点右边缘对齐 */
        ComboBoxRight = 4,
        /** 将菜单放置在锚点右侧 */
        MenuRight = 5,
        /** 将菜单直接放置在锚点上方，没有过渡效果 */
        AboveAnchor = 6,
        /** 将菜单放在锚点正上方，没有过渡效果 */
        CenteredAboveAnchor = 7,
        /** 将菜单放置在锚点的上方，锚点与内容的右侧对齐 */
        AboveRightAnchor = 8,
        /** 将菜单放置在锚点左侧 */
        MenuLeft = 9,
        /** 将菜单的中心放置在菜单锚点的中心点之上 */
        Center = 10,
        /** 将菜单的垂直中心放在左侧，将菜单锚点的垂直中心放在右侧 */
        RightLeftCenter = 11,
        /** 将菜单的左下角直接放在菜单锚点左下角的上方 */
        MatchBottomLeft = 12,
        /** 鼠标位置 */
        MousePosition = 13
    }
    /**
     * @author maohang.zeng
     * @groups 界面
     * @description 图标的分辨率
     */
    enum AssetIconSize {
        /** 64 × 64 */
        Icon_64px = 64,
        /** 128 × 128 */
        Icon_128px = 128
    }
    /**
     * @author jie.wu
     * @groups 界面/配置
     * @description 基础的边距，提供4个方向的数值修改
     * @networkStatus usage:客户端
     */
    class Margin {
        /**
         * @description 使用一个值初始化四个值的构造方法
         * @effect 只在客户端调用生效
         * @param In usage:初始化值   range:不做限制   type: 浮点数
         */
        constructor(In: number);
        /**
         * @description 构造
         * @param InLeft usage:左值  range:不做限制   type: 浮点数
         * @param InTop usage:上值  range:不做限制   type: 浮点数
         * @param InRight usage:右值  range:不做限制   type: 浮点数
         * @param InBottom usage:下值  range:不做限制   type: 浮点数
         */
        constructor(InLeft: number, InTop: number, InRight: number, InBottom: number);
        /** @description 左 */
        left: number;
        /** @description 上 */
        top: number;
        /** @description 右 */
        right: number;
        /** @description 下 */
        bottom: number;
    }
    /**
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 029 reason: 删除接口 replacement:控件属性 autoSizeHorizontalEnable()/autoSizeVerticalEnable()
     * @author jie.wu
     * @groups 界面/控件/容器
     * @description 容器自动布局大小适应规则
     * @networkStatus usage:客户端
     */
    class UIHugContent {
        /**
         * @description 构造具体规则方法
         * @effect 只在客户端调用生效
         * @param w usage:水平应用规则
         * @param h usage:垂直使用规则
         */
        constructor(w: UIHugContentHorizontally, h: UIHugContentVertically);
        /** @description 水平适应规则 */
        hugContentW: UIHugContentHorizontally;
        /** @description 垂直适应规则 */
        hugContentH: UIHugContentVertically;
    }
    /**
     * @author jie.wu
     * @groups 界面/控件/容器
     * @description 容器自动布局子项排序规则
     * @networkStatus usage:客户端
     */
    class UIChildCollation {
        /**
         * @description 构造具体规则方法
         * @effect 只在客户端调用生效
         * @param h usage:水平应用规则
         * @param v usage:垂直使用规则
         */
        constructor(h: UIHorizontalCollation, v: UIVerticalCollation);
        /** @description 水平适应规则 */
        horizontalCollation: UIHorizontalCollation;
        /** @description 垂直适应规则 */
        verticalCollation: UIVerticalCollation;
    }
    /**
     * @author jie.wu
     * @groups 界面/控件/容器
     * @description 容器自动布局规则
     * @networkStatus usage:客户端
     */
    class UILayout {
        /**
         * @description 构造函数，传入每一个值
         * @effect 只在客户端调用生效
         * @param InLayoutSpace usage:排列间隔  range:不做限制   type: 浮点数
         * @param InPadding usage:四边边距
         * @param InLayout usage:自动布局规则
         * @param InLayoutPacket usage:自动布局节点排列规则
         * @param InHugContent usage:容器布局适应规则
         * @param InAutoLayout usage:是否自动布局
         * @param InAutoWrap usage:是否网格模式
         * @param InHugType usage: 自动布局类型
         */
        constructor(InLayoutSpace: number, InPadding: Margin, InLayout: UILayoutType, InLayoutPacket: UILayoutPacket, InHugType: UIHugContent, InAutoLayout: boolean, InAutoWrap: boolean);
        /**
         * @description 构造函数，传入每一个值
         * @effect 只在客户端调用生效
         * @param InLayoutSpace usage:排列间隔  range:不做限制   type: 浮点数
         * @param InPadding usage:四边边距
         * @param InLayout usage:自动布局规则
         * @param InLayoutPacket usage:自动布局节点排列规则
         * @param InHugContent usage:容器布局适应规则
         * @param InChildCollation usage:子项排序规则
         * @param InAutoLayout usage:是否自动布局
         * @param InAutoWrap usage:是否网格模式
         * @param InHugType usage: 自动布局类型
         */
        constructor(InLayoutSpace: number, InPadding: Margin, InLayout: UILayoutType, InLayoutPacket: UILayoutPacket, InHugType: UIHugContent, InAutoLayout: boolean, InAutoWrap: boolean, InChildCollation: UIChildCollation);
        /** @description 排列间隔 */
        layoutSpace: number;
        /** @description 四边边距 */
        padding: Margin;
        /** @description 自动布局规则*/
        layout: UILayoutType;
        /** @description 自动布局节点排列规则 */
        layoutPacket: UILayoutPacket;
        /** @description 是否自动布局 */
        autoLayout: boolean;
        /** @description 子项布局规则 */
        childCollation: UIChildCollation;
        /** @description 是否网格模式 */
        autoWrap: boolean;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:028 reason:接口废弃 replacement:控件属性 autoSizeHorizontalEnable()/autoSizeVerticalEnable()
         * @description 容器布局适应规则
        */
        hugContent: UIHugContent;
    }
    /**
     * @author jie.wu
     * @groups 界面/配置
     * @description Transform
     * @networkStatus usage:客户端
     */
    class UITransform {
        /**
         * @description 构造
         * @effect 只在客户端调用生效
         * @param x usage:位置 Position.X  range:不超过屏幕坐标，关于屏幕坐标详情请看 class Vector2   type: 浮点数
         * @param y usage: 位置 Position.Y  range:不超过屏幕坐标，关于屏幕坐标详情请看 class Vector2   type: 浮点数
         * @param w usage:大小 Size.W 宽  range:不做限制   type: 浮点数
         * @param h usage:大小 Size.H 高  range:不做限制   type: 浮点数
         */
        constructor(x: number, y: number, w: number, h: number);
        /**
         * @description 通过点构造
         * @effect 只在客户端调用生效
         * @param xy usage:位置
         * @param wh usage:大小
         */
        constructor(xy: mw.Vector2, wh: mw.Vector2);
        /** @description 位置 */
        position: mw.Vector2;
        /** @description 大小 */
        size: mw.Vector2;
    }
    /**
     * @author jie.wu
     * @groups 界面/配置
     * @description 节点对齐规则
     * @networkStatus usage:客户端
     */
    class UIConstraintAnchors {
        /**  */
        /**
         * @description 构造一个默认的
         * @effect 只在客户端调用生效
         */
        constructor();
        /**
         * @description 通过水平和垂直规则构造对象
         * @effect 只在客户端调用生效
         * @param InConstraintHorizontal usage:水平对齐规则
         * @param InConstraintVertical usage:垂直对齐规则
         */
        constructor(InConstraintHorizontal: UIConstraintHorizontal, InConstraintVertical: UIConstraintVertical);
        /** @description 水平对齐规则 */
        constraintHorizontal: UIConstraintHorizontal;
        /** @description 垂直对齐规则 */
        constraintVertical: UIConstraintVertical;
    }
    /**
     * @author jie.wu
     * @groups 界面/配置
     * @description 字体信息
     * @networkStatus usage:客户端
     */
    class UIFontInfo {
        /** @description 默认字体 */
        defaultFontFamily: UIFontFamily;
        /** @description 退却字体 */
        fallbackFontFamily: UIFontFamily;
        /** @description 字形 */
        glyph: UIFontGlyph;
        /** @description 删除线 */
        strikethrough: boolean;
        /** @description 下划线 */
        underline: boolean;
        /** @description 内容颜色 */
        contentColor: mw.LinearColor;
        /** @description 阴影颜色 */
        shadowColor: mw.LinearColor;
        /** @description 阴影偏移 */
        shadowOffset: mw.Vector2;
        /** @description 对齐方式 */
        textAlign: TextJustify;
        /** @description 垂直对齐方式 */
        textVerticalAlign: TextVerticalJustify;
        /** @description 大小 */
        fontSize: number;
        /** @description 间距 */
        letterSpacing: number;
        /** @description 富文本 */
        richText: boolean;
        /** @description 描边大小 */
        outLineSize: number;
        /** @description 描边颜色 */
        outLineColor: mw.LinearColor;
    }
    /**
     * @author jie.wu
     * @groups 界面/控件/遥杆
     * @description 摇杆信息
     * @networkStatus usage:客户端
     */
    class JoystickStyleDesigner {
    }
    /**
     * @author jie.wu
     * @groups 界面/控件/遥杆
     * @description 颜色管理
     * @networkStatus usage:客户端
     */
    class SlateColor {
        /**
         * @description 指定颜色进行构造
         * @effect 只在客户端调用生效
         * @param InColor usage:颜色
         */
        constructor(InColor: mw.LinearColor);
        /** @description 颜色*/
        specifiedColor: mw.LinearColor;
        /** @description 颜色规则*/
        colorUseRule: SlateColorStylingMode;
    }
    /**
     * @author jie.wu
     * @groups 界面
     * @description 几何坐标信息
     * @networkStatus usage:客户端
     */
    class Geometry {
        /** @description 默认构造 */
        private constructor();
        /**
         * @description 获取基于Coordinate的相对坐标
         * @effect 只在客户端调用生效
         * @param Coordinate usage:相对基础点
         * @returns 返回Coordinate的相对坐标
         */
        getLocalPositionAtCoordinates(Coordinate: mw.Vector2): mw.Vector2;
        /**
         * @description 获取基于Coordinate的绝对坐标
         * @effect 只在客户端调用生效
         * @param Coordinate usage:绝对基础点
         * @returns 返回Coordinate的绝对坐标
         */
        getAbsolutePositionAtCoordinates(Coordinate: mw.Vector2): mw.Vector2;
        /**
         * @description 获取绝对坐标
         * @effect 只在客户端调用生效
         * @returns 返回绝对坐标
         */
        getAbsolutePosition(): mw.Vector2;
        /**
         * @description 获取相对大小
         * @effect 只在客户端调用生效
         * @returns 返回相对大小
         */
        getLocalSize(): mw.Vector2;
        /**
         * @description 获取绝对大小
         * @effect 只在客户端调用生效
         * @returns 返回绝对大小
         */
        getAbsoluteSize(): mw.Vector2;
        /**
         * @description 判断该Geometry 是否在AbsoluteCoordinate坐标下
         * @effect 只在客户端调用生效
         * @param AbsoluteCoordinate usage:坐标
         * @returns 返回是否在AbsoluteCoordinate坐标下
         */
        isUnderLocation(AbsoluteCoordinate: mw.Vector2): boolean;
    }
    /**
     * @hidden
     * @author jie.wu
     * @groups 输入
     * @description 输入事件
     * @networkStatus usage:客户端
     */
    class InputEvent {
        /** @description 默认构造 */
        private constructor();
    }
    /**
     * @hidden
     * @author jie.wu
     * @groups 界面
     * @description 焦点事件
     * @networkStatus usage:客户端
     */
    class FocusEvent {
        /** @description 默认构造 */
        private constructor();
    }
    /**
     * @author jie.wu
     * @groups 界面/事件
     * @description 角色输入事件
     * @networkStatus usage:客户端
     */
    class CharacterEvent {
        /** 默认构造 */
        private constructor();
        /**
         * @description 转化为 InputEvent
         * @effect 只在客户端调用生效
         * @returns 返回转化后InputEvent
         */
        toInputEvent(): InputEvent;
    }
    /**
     * @author jie.wu
     * @groups 界面/事件
     * @description 按键事件
     * @networkStatus usage:客户端
     */
    class KeyEvent {
        /** @description 默认构造 */
        private constructor();
        /**
         * @description 转化为 InputEvent*
         * @effect 只在客户端调用生效
         * @returns 返回转化后 InputEvent
         */
        toInputEvent(): InputEvent;
        /**
         * @description 获取事件触发玩家index
         * @effect 只在客户端调用生效
         * @returns 返回事件触发玩家index
         */
        getUserIndex(): number;
        /**
         * @description 获取按下的键
         * @effect 只在客户端调用生效
         * @returns 返回按下的键的名称
         */
        getKey(): string;
        /**
         * @description alt键是否按下
         * @effect 只在客户端调用生效
         * @returns 返回Alt键是否按下
         */
        isAltDown(): boolean;
        /**
         * @description command键是否按下
         * @effect 只在客户端调用生效
         * @returns 返回Command键是否按下
         */
        isCommandDown(): boolean;
        /**
         * @description control键是否按下
         * @effect 只在客户端调用生效
         * @returns 返回Control键是否按下
         */
        isControlDown(): boolean;
        /**
         * @description shift键是否按下
         * @effect 只在客户端调用生效
         * @returns 返回shift键是否按下
         */
        isShiftDown(): boolean;
    }
    /**
    * @author jie.wu
    * @groups 界面/事件
    * @description 点击或者滑动的时候传递mobile touch,鼠标,键盘信息的类
    * @networkStatus usage:客户端
    */
    class PointerEvent {
        /** @description 默认构造 */
        private constructor();
        /**
         * @description 转化为 InputEvent
         * @effect 只在客户端调用生效
         * @returns 返回转化后 InputEvent
         */
        toInputEvent(): InputEvent;
        /**
         * @description 判断是不是触摸事件
         * @effect 只在客户端调用生效
         * @returns 返回是否是触摸事件
         */
        get isTouchEvent(): boolean;
        /**
         * @description 获取鼠标滚轮滑动的距离
         * @effect 只在客户端调用生效
         * @returns 返回鼠标滚轮滑动距离
         */
        get mouseWheelDelta(): number;
        /**
         * @description 获取事件触发玩家的index
         * @effect 只在客户端调用生效
         * @returns 返回事件触发玩家的index
         */
        get userIndex(): number;
        /**
         * @description 获取触摸事件index
         * @effect 只在客户端调用生效
         * @returns 返回触摸事件的index
         */
        get touchPadIndex(): number;
        /**
         * @description 获取触发的屏幕位置
         * @effect 只在客户端调用生效
         * @returns 返回触发的屏幕位置
         */
        get screenSpacePosition(): mw.Vector2;
        /**
         * @description 返回该事件的唯一标识index
         * @effect 只在客户端调用生效
         * @returns 返回该事件的唯一标识index
         */
        get pointerIndex(): number;
        /**
         * @description 获取该事件上一次的屏幕位置
         * @effect 只在客户端调用生效
         * @returns 返回该事件上一次的屏幕位置
         */
        get lastScreenSpacePosition(): mw.Vector2;
        /**
         * @description 判断是不是鼠标按键事件
         * @effect 只在客户端调用生效
         * @param MouseButton usage:按键事件
         * @returns 返回是不是鼠标按键事件
         */
        isMouseButtonDown(MouseButton: mw.Keys): boolean;
    }
    /**
    * @author jie.wu
    * @groups 界面/事件
    * @description 事件回复
    * @networkStatus usage:客户端
    */
    class EventReply {
        /**  */
        /**
         * @description 默认构造
         * @effect 只在客户端调用生效
         */
        private constructor();
        /**
         * @description UE的默认值构造
         * @effect 只在客户端调用生效
         */
        private constructor();
        /**
         * @description 事件已处理
         * @effect 只在客户端调用生效
         * @returns 事件回复
         */
        static get handled(): EventReply;
        /**
         * @description 事件未处理
         * @effect 只在客户端调用生效
         * @returns 事件回复
         */
        static get unHandled(): EventReply;
        /**
         * @description 捕获光标
         * @effect 只在客户端调用生效
         * @param widget usage:自身控件
         * @returns 事件回复
         */
        captureMouse(widget: mw.Widget): EventReply;
        /**
         * @description 释放光标
         * @effect 只在客户端调用生效
         * @returns 事件回复
         */
        releaseMouseCapture(): EventReply;
    }
    /**
    * @author jie.wu
    * @groups 界面/控件/图片
    * @description 资源 icon 信息
    * @networkStatus usage:客户端
    */
    class AssetIconData {
        /**
         * @description 默认构造
         * @effect 只在客户端调用生效
         */
        constructor();
        /**
         * @description 获取资源ID
         * @effect 只在客户端调用生效
         * @returns 资源ID信息
         */
        get assetID(): string;
        /**
         * @description 设置资源ID
         * @param v usage:资源ID信息
         * @effect 只在客户端调用生效
         */
        set assetID(v: string);
    }
    /**
    * @author jie.wu
    * @groups 界面/控件/遥杆
    * @description 摇杆按键绑定
    * @networkStatus usage:客户端
    */
    class JoystickBindKeyType {
        /**
         * @description 向上的按键
         */
        up: mw.Keys;
        /**
         * @description 向下的按键
         */
        down: mw.Keys;
        /**
         * @description 向左的按键
         */
        left: mw.Keys;
        /**
         * @description 向右的按键
         */
        right: mw.Keys;
        /**
         * @description 不进行赋值等待后续为每个按键单独绑定
         * @effect 只在客户端调用生效
         */
        constructor();
        /**
         * @description 构造一个数据结构传递摇杆需要绑定的按键
         * @effect 只在客户端调用生效
         * @param up usage:上方向的按键 default:undefined
         * @param down usage:下方向的按键 default:undefined
         * @param left usage:左方向的按键 default:undefined
         * @param right usage:右方向的按键 default:undefined
         */
        constructor(up: mw.Keys, down: mw.Keys, left: mw.Keys, right: mw.Keys);
    }
    /**
     * @author jianke.feng
     * @description 图片信息类
     * @groups 界面/控件/图片
     * @networkStatus usage:客户端
     */
    class ImageInfo {
        private constructor();
        /**
         * @description 通过 Id 设置图片信息
         * @effect 只在客户端调用生效
         * @param id usage:图片Id  <br> range: 依据 ID 长度而定
         * @param bUseSRGB usage:是否贴图使用SRGB模式 default: true range: [true, false]
         * @returns 是否设置成功
         */
        asyncSetByID(id: string, bUseSRGB?: boolean): Promise<boolean>;
        /**
         * @description 设置图标
         * @effect 只在客户端调用生效
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:038 reason:接口废弃 replacement: setByAssetIcon
         * @param AssetID usage: 传入的 AssetIconData 对象
         * @param bUseSRGB usage: 是否使用SRGB default: true range: [true, false]
         * @returns 是否设置成功
         */
        asyncSetByAssetICON(AssetID: AssetIconData, bUseSRGB?: boolean): Promise<boolean>;
        /**
         * @description 用指定的 id 和分辨率，设置图标
         * @effect 只在客户端调用生效
         * @param assetId usage: 传入图标的资源 id range: 无
         * @param size usage: 传入图标的分辨率枚举
         * @param bUseSRGB usage: 是否使用SRGB default: true range: [true, false]
         * @returns 设置的结果
         */
        setByAssetIcon(assetId: string, size: mw.AssetIconSize, bUseSRGB?: boolean): Promise<boolean>;
        /**
         * @description 获取ImageInfo的id
         * @effect 只在客户端调用生效
         * @returns ImageInfo的id
         */
        get id(): string;
        /**
         * @description 获取ImageInfo的图标数据
         * @effect 只在客户端调用生效
         * @returns 图标数据结构
         */
        get assetICON(): AssetIconData;
        /**
         * @description 设置ImageInfo的颜色
         * @effect 只在客户端调用生效
         * @param value mw.LinearColor颜色值
         */
        set color(value: Readonly<mw.LinearColor>);
        /**
         * @description 获取ImageInfo的颜色
         * @effect 只在客户端调用生效
         * @returns 返回Type.LinearColor颜色值
         */
        get color(): Readonly<mw.LinearColor>;
        /**
         * @description 设置ImageInfo的绘制类型
         * @effect 只在客户端调用生效
         * @param value 绘制类型
         */
        set drawType(value: SlateBrushDrawType);
        /**
         * @description 获取ImageInfo的绘制类型
         * @effect 只在客户端调用生效
         * @returns 绘制类型
         */
        get drawType(): SlateBrushDrawType;
        /**
         * @description 设置ImageInfo的margin
         * @effect 只在客户端调用生效
         * @param value 指定的margin
         */
        set margin(value: Readonly<Margin>);
        /**
         * @description 获取ImageInfo的margin
         * @effect 只在客户端调用生效
         * @returns margin
         */
        get margin(): Readonly<Margin>;
        /**
         * @description 设置ImageInfo的size大小
         * @effect 只在客户端调用生效
         * @param value 指定的size
         */
        set size(value: Readonly<mw.Vector2>);
        /**
         * @description 获取ImageInfo的size大小
         * @effect 只在客户端调用生效
         * @returns ImageInfo的size
         */
        get size(): Readonly<mw.Vector2>;
    }
    /**
     * @author zheng.zeng
     * @description Checkbox 控件风格类型
     * @groups 界面/控件/勾选框
     * @networkStatus usage:客户端
     */
    class CheckboxStyle {
        private constructor();
        /**
         * @description 获取未选择图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 未选择图片的ImageInfo
         */
        get uncheckedImage(): ImageInfo;
        /**
         * @description 获取未选择悬浮图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 未选择悬浮图片的ImageInfo
         */
        get uncheckedHoveredImage(): ImageInfo;
        /**
         * @description 获取未选择按压图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 未选择按压图片的ImageInfo
         */
        get uncheckedPressedImage(): ImageInfo;
        /**
         * @description 获取选择图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 选择图片的ImageInfo
         */
        get checkedImage(): ImageInfo;
        /**
         * @description 获取选择悬浮图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 选择悬浮图片的ImageInfo
         */
        get checkedHoveredImage(): ImageInfo;
        /**
         * @description 获取按压图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 按压图片的ImageInfo
         */
        get checkedPressedImage(): ImageInfo;
        /**
         * @description 获取未确定图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 未确定图片的ImageInfo
         */
        get undeterminedImage(): ImageInfo;
        /**
         * @description 获取未确定悬浮图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 未确定悬浮图片的ImageInfo
         */
        get undeterminedHoveredImage(): ImageInfo;
        /**
         * @description 获取未确定按压图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 未确定按压悬浮图片的ImageInfo
         */
        get undeterminedPressedImage(): ImageInfo;
    }
    /**
     * @author zheng.zeng
     * @description Button 控件风格类型
     * @groups 界面/控件/按钮
     * @networkStatus usage:客户端
     */
    class ButtonStyle {
        private constructor();
        /**
         * @description 获取默认图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 默认图片的ImageInfo
         */
        get normalImage(): ImageInfo;
        /**
         * @description 获取悬浮图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 悬浮图片的ImageInfo
         */
        get hoveredImage(): ImageInfo;
        /**
         * @description 获取按压图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 按压图片的ImageInfo
         */
        get pressedImage(): ImageInfo;
        /**
         * @description 获取禁用图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 禁用图片的ImageInfo
         */
        get disabledImage(): ImageInfo;
    }
    /**
     * @author zheng.zeng
     * @description Dropdown 控件风格类型
     * @groups 界面/控件/下拉框
     * @networkStatus usage:客户端
     */
    class DropdownStyle {
        private constructor();
        /**
         * 组合框资源
         */
        /**
         * @description 获取组合框资源
         * @effect 只在客户端调用生效
         * @returns 组合框资源
         */
        get comboButtonStyle(): ButtonStyle;
        /**
         * @description 获取下拉菜单背景图的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 下拉菜单背景图的ImageInfo
         */
        get menuBorderImage(): ImageInfo;
        /**
         * @description 获取下拉菜单背景内容边距
         * @effect 只在客户端调用生效
         * @returns 下拉菜单背景内容边距
         */
        get menuBorderContentPadding(): Margin;
        /**
         * @description 获取下拉菜单背景内容边距
         * @effect 只在客户端调用生效
         * @param margin 下拉菜单背景内容边距
         */
        set menuBorderContentPadding(margin: Margin);
        /**
         * @description 获取最大下拉菜单长度
         * @effect 只在客户端调用生效
         * @returns 下拉菜单背景内容边距
         */
        get maxListHeight(): number;
        /**
         * @description 设置最大下拉菜单长度
         * @effect 只在客户端调用生效
         * @param value 下拉菜单背景内容边距
         */
        set maxListHeight(value: number);
        /**
         * @description 获取选中项字体颜色
         * @effect 只在客户端调用生效
         * @returns 选中项字体颜色
         */
        get selectedOptionFontColor(): mw.LinearColor;
        /**
         * @description 设置选中项字体颜色
         * @effect 只在客户端调用生效
         * @param value 选中项字体颜色
         */
        set selectedOptionFontColor(value: mw.LinearColor);
        /**
         * @description 获取组合框内容边距
         * @effect 只在客户端调用生效
         * @returns 组合框内容边距
         */
        get comboButtonContentPadding(): Margin;
        /**
         * @description 设置组合框内容边距
         * @effect 只在客户端调用生效
         * @param margin 组合框内容边距
         */
        set comboButtonContentPadding(margin: Margin);
        /**
         * 设置显示的内容文本的可见性
         */
        /**
         * @description 设置显示的内容文本是否可见
         * @effect 只在客户端调用生效
         * @param bVisible 显示的内容文本是否可见
         */
        set comboButtonContentVisible(bVisible: boolean);
        /**
         * @description 获取显示的内容文本是否可见
         * @effect 只在客户端调用生效
         * @returns 内容文本是否可见
         */
        get comboButtonContentVisible(): boolean;
    }
    /**
     * @author jianke.feng
     * @groups 界面/控件/滚动框
     * @description 滚动条风格类型
     * @networkStatus usage:客户端
     */
    class ScrollbarStyle {
        private constructor();
        /**
         * @description 获取滚动条图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 滚动条图片的ImageInfo
         */
        get thumbImage(): ImageInfo;
        /**
         * @description 获取滚动条厚度
         * @effect 只在客户端调用生效
         * @returns 滚动条厚度
         */
        get thickness(): number;
        /**
         * @description 设置滚动条厚度
         * @effect 只在客户端调用生效
         * @param inThickness 滚动条厚度
         */
        set thickness(inThickness: number);
        /**
         * @description 获取滚动条偏移
         * @effect 只在客户端调用生效
         * @returns 滚动条偏移
         */
        get padding(): Margin;
        /**
         * @description 设置滚动条偏移
         * @effect 只在客户端调用生效
         * @param inPadding 滚动条偏移
         */
        set padding(inPadding: Margin);
    }
    /**
     * @author jianke.feng
     * @groups 界面/控件/图片
     * @description 背景图片风格类型
     * @networkStatus usage:客户端
     */
    class ListItemStyle {
        private constructor();
        /**
         * @description 获取默认背景图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 默认背景图片的ImageInfo
         */
        get normalBackgroundImage(): ImageInfo;
        /**
         * @description 获取悬浮背景图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 悬浮背景图片的ImageInfo
         */
        get hoverBackgroundImage(): ImageInfo;
        /**
         * @description 获取激活背景图片的ImageInfo
         * @effect 只在客户端调用生效
         * @returns 激活背景图片的ImageInfo
         */
        get activeBackgroundImage(): ImageInfo;
        /**
         * @description 获取菜单行内容边距
         * @effect 只在客户端调用生效
         * @returns 菜单行内容边距
         */
        get rowPadding(): Margin;
        /**
         * @description 设置菜单行内容边距
         * @effect 只在客户端调用生效
         * @param margin 菜单行内容边距
         */
        set rowPadding(margin: Margin);
    }
    /**
     * @author jianke.feng
     * @groups 界面/控件/文本
     * @description 文本风格类型
     * @networkStatus usage:客户端
     */
    class TextStyle {
        private constructor();
        /**
         * @description 获取字体颜色
         * @effect 只在客户端调用生效
         * @returns 字体颜色
         */
        get fontColor(): mw.LinearColor;
        /**
         * @description 设置字体颜色
         * @effect 只在客户端调用生效
         * @param value 字体颜色
         */
        set fontColor(value: mw.LinearColor);
        /**
         * @description 获取阴影偏移
         * @effect 只在客户端调用生效
         * @returns 阴影偏移
         */
        get shadowOffsets(): mw.Vector2;
        /**
         * @description 设置阴影偏移
         * @effect 只在客户端调用生效
         * @param value 阴影偏移
         */
        set shadowOffsets(value: mw.Vector2);
        /**
         * @description 获取阴影颜色
         * @effect 只在客户端调用生效
         * @returns 阴影颜色
         */
        get shadowColor(): mw.LinearColor;
        /**
         * @description 设置阴影颜色
         * @effect 只在客户端调用生效
         * @param value 阴影颜色
         */
        set shadowColor(value: mw.LinearColor);
        /**
         * @description 设置字体大小
         * @effect 只在客户端调用生效
         * @param value 字体大小
         */
        set fontSize(value: number);
        /**
         * @description 获取字体大小
         * @effect 只在客户端调用生效
         * @returns 字体大小
         */
        get fontSize(): number;
        /**
         * @description 设置字体间距
         * @effect 只在客户端调用生效
         * @param value 字体间距
         */
        set fontSpace(value: number);
        /**
         * @description 获取字体间距
         * @effect 只在客户端调用生效
         * @returns 字体间距
         */
        get fontSpace(): number;
        /**
         * @description 获取字体描边颜色
         * @effect 只在客户端调用生效
         * @returns 字体描边颜色
         */
        get outlineColor(): mw.LinearColor;
        /**
         * @description 设置字体描边颜色
         * @effect 只在客户端调用生效
         * @param value 字体描边颜色
         */
        set outlineColor(value: mw.LinearColor);
        /**
         * @description 设置字体描边宽度
         * @effect 只在客户端调用生效
         * @param value 字体描边宽度
         */
        set outlineSize(value: number);
        /**
         * @description 获取字体描边宽度
         * @effect 只在客户端调用生效
         * @returns 字体描边宽度
         */
        get outlineSize(): number;
        /**
         * @description 获取字体类型
         * @effect 只在客户端调用生效
         * @returns 字体类型
         */
        get fontGlyph(): UIFontGlyph;
        /**
         * @description 设置字体类型
         * @effect 只在客户端调用生效
         * @param value 字体类型
         */
        set fontGlyph(value: UIFontGlyph);
    }
}

declare namespace mw {
    /**
     * @author jie.wu
     * @description 设置只允许UI响应用户输入的输入模式。
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param InWidgetToFocus usage:响应输入模式的widget default:null
     * @param InMouseLockMode usage:鼠标锁定的输入模式 default:UIType.MouseLockMode.DoNotLock
     */
    function setInputModeUIOnly(InWidgetToFocus?: mw.Widget, InMouseLockMode?: mw.MouseLockMode): void;
    /**
     * @author jie.wu
     * @description 设置一个输入模式，只允许UI响应用户输入，如果UI不处理它，玩家输入/玩家控制器就有机会
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param InWidgetToFocus usage:响应输入模式的widget default:null
     * @param InMouseLockMode usage:鼠标锁定的输入模式 default:UIType.MouseLockMode.DoNotLock
     * @param hideCursorDuringCapture usage:是否隐藏光标 default:true
     */
    function setInputModeGameAndUI(InWidgetToFocus?: mw.Widget, InMouseLockMode?: mw.MouseLockMode, hideCursorDuringCapture?: boolean): void;
    /**
     * @author jie.wu
     * @description 设置一个输入模式，只允许玩家输入/玩家控制器响应用户输入
     * @groups 界面
     * @effect 只在客户端调用生效
     */
    function setInputModeGameOnly(): void;
    /**
     * @author jie.wu
     * @description 设置关注游戏窗口
     * @groups 界面
     * @effect 只在客户端调用生效
     */
    function setFocusToGameViewport(): void;
    /**
     * @author jie.wu
     * @description 中断一个拖拽事件, 传入一个操作的事件
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param InReply usage:事件
     */
    function endDragDrop(InReply: mw.EventReply): void;
    /**
     * @author jie.wu
     * @description 中断所有的DragDrop
     * @groups 界面
     * @effect 只在客户端调用生效
     */
    function cancelDragDrop(): void;
    /**
     * @author jie.wu
     * @description 判断当前是否有一个DragDrop事件
     * @groups 界面
     * @effect 只在客户端调用生效
     * @returns boolean
     */
    function isDragDropping(): boolean;
    /**
     * @author jie.wu
     * @description 获取当前的DragDrop事件
     * @groups 界面
     * @effect 只在客户端调用生效
     * @returns 返回当前的DragDrop事件
     */
    function getDragDroppingContent(): mw.DragDropOperation;
}

declare namespace mw {
    /**
     * @author jie.wu
    * @description 获取应用于视口和所有小部件的当前DPI Scale。
    * @groups 界面
    * @effect 只在客户端调用生效
    * @returns 返回应用于视口和所有小部件的当前DPI Scale。
    */
    function getViewportScale(): number;
    /**
     * @author jie.wu
    * @description 获取游戏视口的大小。
    * @groups 界面
    * @effect 只在客户端调用生效
    * @returns 返回游戏视口的大小。
    */
    function getViewportSize(): mw.Vector2;
    /**
     * @author jie.wu
     * @description 获取包含添加到“视口”中的所有控件的控件的几何形状。你可以使用这个几何图形在绝对和本地空间的控件之间转换控件。
     * @groups 界面
     * @effect 只在客户端调用生效
     * @returns 返回所有控件的控件的几何形状
     */
    function getViewportWidgetGeometry(): mw.Geometry;
    /**
     * @author jie.wu
     * @description 获取包含添加到“player screen”的所有控件的控件的几何形状。你可以使用这个几何图形在绝对和本地空间的控件之间转换控件。
     * @groups 界面
     * @effect 只在客户端调用生效
     * @param player usage:玩家在游戏世界中的位置投射到屏幕上的控制器
     * @returns 返回所有控件的控件的几何形状
     */
    function getPlayerScreenWidgetGeometry(player: mw.Player): mw.Geometry;
    /**
     * @author jie.wu
    * @description 获取平台的鼠标光标位置。这是鼠标的绝对桌面位置。
    * @groups 界面
    * @effect 只在客户端调用生效
    * @returns 返回平台的鼠标光标位置。这是鼠标的绝对桌面位置。
    */
    function getMousePositionOnPlatform(): mw.Vector2;
    /**
     * @author jie.wu
    * @description 获取平台的鼠标光标在视口控件的本地空间中的位置。
    * @groups 界面
    * @effect 只在客户端调用生效
    * @returns 返回平台的鼠标光标在视口控件的本地空间中的位置。
    */
    function getMousePositionOnViewport(): mw.Vector2;
}

declare namespace mw {
    /**
     * @author jie.wu
     * @groups 界面/控件/自定义控件
     * @description 自定义控件
     * @description UI控件的集合，预制体UI
     * @networkStatus usage:客户端
     */
    class UserWidget extends mw.Widget {
        /**
         * @description 创建 UserWidget 控件
         * @effect 只在客户端调用生效
         * @param parent usage:创建控件的外Outer对象 default:null
         * @returns 返回创建的控件
         */
        static newObject(parent?: mw.Canvas): UserWidget;
        /**
         * @description 添加到屏幕上
         * @effect 只在客户端调用生效
         * @param zOrder usage:添加到屏幕的层级关系 range:不做限制 type:整数
         * @example
         * 使用示例:创建一个名为AccountExample的脚本，放置在对象栏中，打开脚本，将原本内容修改为如下内容，保存并运行游戏，会在屏幕右上方显示用户的头像，PC环境下为白图
         * ```
         * @Component
         * export default class AccountExample extends Script {
         *
         *     protected onStart(): void {
         *         if (!SystemUtil.isClient()) return;
         *         let button = new ButtonUI();
         *     }
         * }
         *
         * class ButtonUI {
         *     public button:StaleButton;
         *
         *     constructor() {
         *         this.creatUI();
         *     }
         *
         *     private creatUI() {
         *         let size = WindowUtil.getViewportSize();
         *
         *         // 创建一个UI对象
         *         let ui = UserWidget.newObject();
         *         // 将UI添加到屏幕上
         *         ui.addToViewport(1);
         *
         *         // 创建一个画布组件
         *         let canvas = Canvas.newObject();
         *         canvas.size = new Vector2(1920, 1080);
         *         canvas.position = Vector2.zero;
         *         // 将Ui的根画布设置为canvas
         *         ui.rootContent = canvas;
         *
         *         this.button = StaleButton.newObject(canvas);
         *         this.button.size = new Vector2(size.x / 14, size.y / 20);
         *         this.button.text = "StaleButton";
         *         this.button.fontSize = 18;
         *         this.button.transitionEnable = true;
         *         InputUtil.bindButton(Keys.X, this.button);
         *         this.button.setPressedImageColorDecimal(200, 200, 200, 255);
         *         this.button.onClicked.add(() => {
         *         // 当按下按钮执行以下逻辑
         *             console.log("The \"StaleButton\" button was pressed ~");
         *         })
         *     }
         * }
         * ```
         */
        addToViewport(zOrder: number): void;
        /**
         * @description 设置UI的根Canvas
         * @effect 只在客户端调用生效
         * @param content usage:根UI的内容
         */
        set rootContent(content: mw.Canvas);
        /**
         * @description 获取根Canvas
         * @effect 只在客户端调用生效
         * @returns 返回根Canvas
         */
        get rootContent(): mw.Canvas;
        /**
         * @description 移除根Canvas，会销毁根Canvas，无法再次使用
         * @effect 只在客户端调用生效
         */
        removeRootContent(): void;
        /**
         * @description 通过相对路径查找节点
         * @effect 只在客户端调用生效
         * @param inPath usage:路径   range:
         * @returns 返回查找节点结果
         */
        findChildByPath(inPath: string): mw.Widget;
        /**
         * @description 设置是否响应键盘焦点事件
         * @effect 只在客户端调用生效
         * @param isFocus usage:是否相应
         */
        set focusable(isFocus: boolean);
        /**
         * @description 获取是否响应键盘焦点事件
         * @effect 只在客户端调用生效
         * @returns 返回相应键盘的焦点事件
         */
        get focusable(): boolean;
        /**
         * @description 是否适配安全区
         * @effect 只在客户端调用生效
         * @param isEnable usage:是否适配
         */
        set safeAreaEnable(isEnable: boolean);
        /**
        * @description 是否适配安全区
        * @effect 只在客户端调用生效
        * @returns 是否适配
        */
        get safeAreaEnable(): boolean;
        getChildByName<T extends mw.Widget>(name: string): T;
        /**
         * @description 获取第几位子节点，本控件暂不生效
         * @effect  只在客户端调用生效
         * @param index usage:下标  range: 大于 0   type: 整形
         * @returns 找到的控件
         */
        getChildAt(index: number): mw.Widget;
        /**
         * @description 添加子节点，本控件暂不生效
         * @effect  只在客户端调用生效
         * @param child usage:子控件
         */
        addChild(child: mw.Widget): void;
        /**
         * @description 移除节点,会销毁UI无法在使用，本控件暂不生效
         * @effect  只在客户端调用生效
         * @param child usage:需要移除的子控件
         */
        removeChild(child: mw.Widget): void;
        /**
         * @description 移除第几个节点,会销毁UI无法再使用，本控件暂不生效
         * @effect  只在客户端调用生效
         * @param index usage:下标  range: 大于 0   type: 整形
         */
        removeChildAt(index: number): void;
        /**
         * @description 清除所有子节点,会销毁UI无法再使用，本控件暂不生效
         * @effect  只在客户端调用生效
         */
        removeAllChildren(): void;
        /**
         * @description 获取子节点数量，本控件暂不生效
         * @effect  只在客户端调用生效
         * @returns 子节点数量
         */
        getChildrenCount(): number;
    }
}

declare namespace mw {
    /**
     * @hidden
     * @author jie.wu
     * @groups 界面
     * @description ui预制体
     * @networkStatus usage:客户端
     */
    class UserWidgetPrefab extends mw.UserWidget {
    }
}

declare namespace mw {
    /**
     * @author jie.wu
     * @groups 界面/控件/遥杆
     * @description 摇杆
     * @networkStatus usage:客户端
     */
    class VirtualJoystickPanel extends mw.Widget {
        /**
         * @description 创建 VirtualJoystickPanelDesigner 控件
         * @effect 只在客户端调用生效
         * @param Outer usage:创建控件的外 Outer 对象 default:null
         * @param InName usage:创建控件的名称 default:null range:设置合理的名称即可
         * @returns 返回创建的控件
         */
        static newObject(Outer?: mw.Widget, InName?: string): VirtualJoystickPanel;
        /**
         * @description 创建 TouchPad 控件
         * @description 当 Outer 和 InName 与已有的对象相同时，旧的对象会被销毁
         * @effect 只在客户端调用生效
         * @param InCanvas usage:父节点 default:null
         * @param Outer  usage:创建控件的外 Outer 对象 default:null
         * @param InName usage: 创建控件的名称 default: null    range:设置合理的名称即可
         * @returns 返回创建的对象
         */
        static newObjectAndAdd(InCanvas?: mw.Canvas, Outer?: mw.Widget, InName?: string): VirtualJoystickPanel;
        /**
         * @description 设置可见性
         * @effect  只在客户端调用生效
         * @param Visibility usage:可见性
         */
        setVisibility(Visibility: mw.SlateVisibility): void;
        /**
         * @description 同一按键同时只能操控一个UI控件，最新绑定的UI控件会覆盖之前的绑定；脚本中添加的绑定无法覆盖编辑器按键绑定菜单中绑定相同按键的UI控件，但当两个UI控件分别通过代码和菜单绑定到同一按键时，使用代码绑定的优先级更高
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         */
        addKey(key: mw.JoystickBindKeyType): void;
        /**
         * @description  此操作只会解绑动态绑定的按键无法解除编辑器按键绑定菜单中绑定的按键
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         */
        removeKey(key: mw.JoystickBindKeyType): void;
        /**
         * @description 获取当前UI控件绑定的所有键盘按键，包括编辑器按键绑定菜单和用代码绑定的按键
         * @effect 只在客户端调用生效
         * @param  key usage:按键
         * @returns 返回当前控件绑定的按键,可能为空
         */
        getKeys(): mw.JoystickBindKeyType[];
        /**
         * @description 输入移动事件
         * @effect 只在客户端调用生效
         * @returns 输入移动事件
         */
        get onInputDir(): mw.MulticastDelegate<(vec: mw.Vector2) => void>;
        /**
         * @description 强制重置摇杆 - 例如在操控摇杆的时候隐藏其父类节点,这时候摇杆重新显示后无法成功重置
         * @effect 只在客户端调用生效
         */
        resetJoyStick(): void;
        /**
         * @description 摇杆按下事件的代理
         * @effect 只在客户端调用生效
         * @returns 按下摇杆事件的代理
         */
        get onJoyStickDown(): mw.MulticastDelegate<() => void>;
        /**
        * @description 摇杆抬起事件的代理
        * @effect 只在客户端调用生效
        * @returns 抬起摇杆事件的代理
        */
        get onJoyStickUp(): mw.MulticastDelegate<() => void>;
        /**
         * @description 返回输入的中心贴图设置，包括 普通的 点击的  不启用的
         * @effect 只在客户端调用生效
         * @returns 返回中心贴图设置
         */
        get centerImageDesigner(): mw.JoystickStyleDesigner;
        /**
         * @description 返回输入的背景贴图设置，包括 普通的 点击的  不启用的
         * @effect 只在客户端调用生效
         * @returns 返回输入的背景贴图设置，包括 普通的 点击的  不启用的
         */
        get backgroundImageDesigner(): mw.JoystickStyleDesigner;
        /**
         * @description 获取是否被鼠标控制，只作用于PC端
         * @effect 只在客户端调用生效
         * @returns 是否被鼠标控制
         */
        get controlByMouseEnable(): boolean;
        /**
         * @description 设置是否被鼠标控制，只作用于PC端
         * @effect 只在客户端调用生效
         * @param controlByMouse usage: 是否被鼠标控制
         */
        set controlByMouseEnable(controlByMouse: boolean);
        /**
         * @description 返回输入的是摇杆类型，  不符合预期会返回默认值
         * @effect 只在客户端调用生效
         * @returns 返回输入的摇杆类型
         */
        get controlType(): mw.CameraControlType;
        /**
         * @description 设置输入的摇杆类型，人物的移动和技能摇杆的移动类型
         * @effect 只在客户端调用生效
         * @param NewControlType usage:摇杆类型
         */
        set controlType(NewControlType: mw.CameraControlType);
        /**
         * @description 返回输入的是摇杆中心位置，  不符合预期会返回默认值
         * @effect 只在客户端调用生效
         * @returns 回输入的是摇杆中心位置，  不符合预期会返回默认值
         */
        get center(): mw.Vector2;
        /**
         * @description 设置输入的中心位置
         * @effect 只在客户端调用生效
         * @param inValue usage:新的中心位置
         */
        set center(inValue: mw.Vector2);
        /**
         * @description 摇杆按钮图片大小
         * @effect 只在客户端调用生效
         * @returns 摇杆按钮图片大小
         */
        get centerImageSize(): mw.Vector2;
        /**
         * @description 摇杆按钮图片大小
         * @effect 只在客户端调用生效
         * @param inSize usage:摇杆按钮图片大小
         */
        set centerImageSize(inSize: mw.Vector2);
        /**
         * @description 摇杆背景图片大小
         * @effect 只在客户端调用生效
         * @returns 摇杆背景图片大小
         */
        get backgroundImageSize(): mw.Vector2;
        /**
         * @description 摇杆背景图片大小
         * @effect 只在客户端调用生效
         * @param inSize usage:摇杆背景图片大小
         */
        set backgroundImageSize(inSize: mw.Vector2);
        /**
         * @description 返回输入的输入比例
         * @effect 只在客户端调用生效
         * @returns 返回输入的输入比例
         */
        get inputScale(): mw.Vector2;
        /**
         * @description 设置输入的输入比例
         * @effect 只在客户端调用生效
         * @param inScale usage:新的输入比例
         */
        set inputScale(inScale: mw.Vector2);
        /**
         * @description 拖动后，是否固定摇杆位置
         * @effect 只在客户端调用生效
         * @returns boolean
         */
        get isLocationFixed(): boolean;
        /**
         * @description 拖动后，是否固定摇杆位置
         * @effect 只在客户端调用生效
         * @param enable usage:是否固定摇杆位置
         */
        set isLocationFixed(enable: boolean);
        /**
         * @description 进入未激活状态的时间
         * @effect 只在客户端调用生效
         * @returns 进入未激活状态的时间，以秒为单位
         */
        get timeUntilInactive(): number;
        /**
         * @description 进入未激活状态的时间
         * @effect 只在客户端调用生效
         * @param Value usage:进入未激活状态的时间，以秒为单位
         */
        set timeUntilInactive(Value: number);
        /**
         * @description 释放摇杆后的复位时间
         * @effect 只在客户端调用生效
         * @returns 复位时间  以秒为单位
         */
        get timeUntilReset(): number;
        /**
         * @description 释放摇杆后的复位时间
         * @effect 只在客户端调用生效
         * @param Value usage:复位时间 以秒为单位
         */
        set timeUntilReset(Value: number);
        /**
         * @description 返回激活时的透明度
         * @effect 只在客户端调用生效
         * @returns 返回激活时的透明度
         */
        get activeOpacity(): number;
        /**
         * @description 设置激活时的透明度
         * @effect 只在客户端调用生效
         * @param Value usage:透明度
         */
        set activeOpacity(Value: number);
        /**
         * @description 返回未激活时的透明度
         * @effect 只在客户端调用生效
         * @returns 返回未激活时的透明度
         */
        get inActiveOpacity(): number;
        /**
         * @description 设置未激活时的透明度
         * @effect 只在客户端调用生效
         * @param Value  usage:透明度
         */
        set inActiveOpacity(Value: number);
        /**
         * @description 返回中心图片普通状态图片id
         * @effect 只在客户端调用生效
         * @returns 返回中心图片普通状态图片id
         */
        get centerImageId(): Readonly<string>;
        /**
         * @description 设置中心图片普通状态图片id
         * @effect 只在客户端调用生效
         * @param id  usage:资源id
         */
        set centerImageId(id: string);
        /**
         * @description 返回中心图片按压状态图片id
         * @effect 只在客户端调用生效
         * @returns 返回中心图片按压状态图片id
         */
        get centerTouchImage(): Readonly<string>;
        /**
         * @description 置中心图片按压状态图片id
         * @effect 只在客户端调用生效
         * @param id usage:资源id
         */
        set centerTouchImage(id: string);
        /**
         * @description 返回中心图片禁用状态图片id
         * @effect 只在客户端调用生效
         * @returns 返回中心图片禁用状态图片id
         */
        get centerDisableImageId(): Readonly<string>;
        /**
         * @description 设置中心图片禁用状态图片id
         * @effect 只在客户端调用生效
         * @param id usage:资源id
         */
        set centerDisableImageId(id: string);
        /**
         * @description 返回中心图片普通状态图片id
         * @effect 只在客户端调用生效
         * @returns 返回中心图片普通状态图片id
         */
        get backgroundImageId(): Readonly<string>;
        /**
         * @description 设置背景图片普通状态图片id
         * @effect 只在客户端调用生效
         * @param id usage:资源id
         */
        set backgroundImageId(id: string);
        /**
         * @description 返回背景图片按压状态图片id
         * @effect 只在客户端调用生效
         * @returns 返回背景图片按压状态图片id
         */
        get backgroundTouchImageId(): Readonly<string>;
        /**
         * @description 设置背景图片按压状态图片id
         * @effect 只在客户端调用生效
         * @param id usage:资源id
         */
        set backgroundTouchImageId(id: string);
        /**
         * @description 返回背景图片禁用状态图片id
         * @effect 只在客户端调用生效
         * @returns 返回背景图片禁用状态图片id
         */
        get backgroundDisabledImageId(): Readonly<string>;
        /**
         * @description 设置背景图片禁用状态图片id
         * @effect 只在客户端调用生效
         * @param id usage:资源id
         */
        set backgroundDisabledImageId(id: string);
    }
}

declare namespace mw {
    /**
     * @ignore
     * @description 用于标记ui类型
     * @effect  调用生效
     * @param InName usage:UI原类名    range:设置合理的名称即可
     */
    function UIPack(InName: string): (target: any) => void;
    /**
     * @author jie.wu
     * @groups 界面/基础
     * @description 控件的基类
     * @description ---------------
     * @description 可挂载叶子节点的根节点，以及提供各种自动布局功能。
     * @description 放置控件需要的通用属性与方法。
     * @networkStatus usage:客户端
     */
    class Widget {
        /**
         * @description 判断控件有没有被销毁，是否是有效的控件
         * @effect 只在客户端调用生效
         * @returns boolean 是否还有效，判定有没有被销毁
         */
        isValid(): boolean;
        /**
         * @description 立刻移除并销毁 不可以在使用
         * @effect 只在客户端调用生效
         */
        destroyObject(): void;
        /**
         * @description 立刻移除并添加到根节点 可以再使用
         * @effect 只在客户端调用生效
         */
        removeObject(): void;
        /**
         * @description 判断是不是同一个对象
         * @effect  只在客户端调用生效
         * @param that usage:需要比较的另外一个对象
         * @returns boolean
         */
        equal(that: Widget): boolean;
        /**
         * @description 获取父节点
         * @effect  只在客户端调用生效
         * @returns 返回父节点
         */
        get parent(): Widget;
        /**
         * @description 设定名字
         * @effect  只在客户端调用生效
         * @param name usage:名字
         */
        set name(name: string);
        /**
         * @description 获取名字
         * @effect  只在客户端调用生效
         * @returns 返回名字
         */
        get name(): string;
        /**
         * @description 设置可见性
         * @effect  只在客户端调用生效
         * @param Visibility usage:可见性
         */
        set visibility(Visibility: mw.SlateVisibility);
        /**
         * @description 获取可见性
         * @effect  只在客户端调用生效
         * @returns 返回可见性
         */
        get visibility(): mw.SlateVisibility;
        /**
         * @description 是否可见
         * @effect  只在客户端调用生效
         * @returns boolean
         */
        get visible(): boolean;
        /**
         * @description 是否可用
         * @effect  只在客户端调用生效
         * @returns boolean
         */
        get enable(): boolean;
        /**
         * @description 设置可用性
         * @effect  只在客户端调用生效
         * @param isEnable usage:可用性boolean
         * @returns 返回设置结果
         */
        set enable(isEnable: boolean);
        /**
         * @description 是否是hovered
         * @effect  只在客户端调用生效
         * @returns boolean
         */
        get isHovered(): boolean;
        /**
         * @description 立刻触发重新渲染的和排布计算
         * @effect  只在客户端调用生效
         */
        invalidateLayoutAndVolatility(): void;
        /**
         * @description 获取期望大小
         * @effect  只在客户端调用生效
         * @returns 返回期望大小
         */
        get desiredSize(): mw.Vector2;
        /**
         * @description 设置渲染的角度
         * @effect  只在客户端调用生效
         * @param o usage:渲染角度
         */
        set renderTransformAngle(o: number);
        /**
         * @description 获取渲染的角度
         * @effect  只在客户端调用生效
         * @returns 返回渲染角度
         */
        get renderTransformAngle(): number;
        /**
         * @description 设置渲染锚点
         * @effect  只在客户端调用生效
         * @param Pivot usage:渲染锚点
         */
        set renderTransformPivot(Pivot: mw.Vector2);
        /**
         * @description 获取渲染锚点
         * @effect  只在客户端调用生效
         * @returns 返回渲染锚点
         */
        get renderTransformPivot(): mw.Vector2;
        /**
         * @description 设置渲染错切形变
         * @effect  只在客户端调用生效
         * @param shear usage:渲染错切形变
         */
        set renderShear(shear: mw.Vector2);
        /**
         * @description 获取渲染错切形变
         * @effect  只在客户端调用生效
         * @returns 返回渲染错切形变
         */
        get renderShear(): mw.Vector2;
        /**
         * @description 设置渲染缩放
         * @effect  只在客户端调用生效
         * @param scale usage:渲染缩放
         */
        set renderScale(scale: mw.Vector2);
        /**
         * @description 获取渲染缩放
         * @effect  只在客户端调用生效
         * @returns 返回渲染缩放
         */
        get renderScale(): mw.Vector2;
        /**
         * @description 设置渲染透明度 0 ~ 1
         * @effect  只在客户端调用生效
         * @param InOpacity usage:透明度
         */
        set renderOpacity(InOpacity: number);
        /**
         * @description 获取渲染透明度
         * @effect  只在客户端调用生效
         * @returns 返回渲染透明度
         */
        get renderOpacity(): number;
        /**
         * @description 获取上一次的GetTickSpaceGeometry
         * @effect  只在客户端调用生效
         * @returns 返回上一次的 GetTickSpaceGeometry
         */
        get cachedGeometry(): mw.Geometry;
        /**
         * @description 获取最后一次用于驱动Widget Tick的几何信息
         * @effect  只在客户端调用生效
         * @returns 返回最后一次用于驱动Widget Tick的几何信息
         */
        get tickSpaceGeometry(): mw.Geometry;
        /**
         * @description 获取最后一次用于渲染Widget的几何信息
         * @effect  只在客户端调用生效
         * @returns 返回最后一次用于渲染Widget的几何信息
         */
        get paintSpaceGeometry(): mw.Geometry;
        /**
         * @description 获取控件GUID
         * @effect  只在客户端调用生效
         * @returns 控件GUID
         */
        get guid(): string;
        /**
         * @description 设置控件的大小和位置
         * @effect  只在客户端调用生效
         * @param inTransform usage:大小位置
         */
        set transform(inTransform: mw.UITransform);
        /**
         * @description 得到控件的大小和位置
         * @effect  只在客户端调用生效
         * @returns 控件的大小和位置
         */
        get transform(): Readonly<mw.UITransform>;
        /**
         * @description 设置控件锚点位置,这个属性决定了控件图形与锚点的相对位置；(0,0)时，锚点位于控件左上角；(0.5,0.5)时，锚点位于控件正中心;
         * @description 锚点本身的位置由positon或alignPosition决定
         * @effect  只在客户端调用生效
         * @param inPivot usage:输入的锚点位置
         */
        set pivot(inPivot: mw.Vector2);
        /**
         * @description 获取控件锚点位置,这个属性决定了控件图形与锚点的相对位置；(0,0)时，锚点位于控件左上角；(0.5,0.5)时，锚点位于控件正中心
         * @description 锚点本身的位置由positon或alignPosition决定
         * @effect  只在客户端调用生效
         * @returns  控件的锚点位置
         */
        get pivot(): mw.Vector2;
        /**
         * @description 设置控件的布局
         * @effect  只在客户端调用生效
         * @param ininconstraints usage:控件的布局
         */
        set constraints(ininconstraints: mw.UIConstraintAnchors);
        /**
         * @description 获取控件的布局
         * @effect  只在客户端调用生效
         * @returns 控件的布局
         */
        get constraints(): Readonly<mw.UIConstraintAnchors>;
        /**
         * @description 设置控件的位置
         * @effect  只在客户端调用生效
         * @param inFigmaPosition usage:控件的位置
         */
        set position(inFigmaPosition: mw.Vector2);
        /**
         * @description 获取控件的位置
         * @effect  只在客户端调用生效
         * @returns 控件的位置
         */
        get position(): Readonly<mw.Vector2>;
        /**
         * @description 获取控件的对齐位置,在对齐方式为靠右对齐、靠下对齐、中心对齐时，alignPosition的值与positon不同；
         * @description 此时，两套位置计算的坐标系不同，例如设置为右下对齐时，该控件的alignPosition以父级右下角为原点来计算
         * @effect  只在客户端调用生效
         * @returns 控件的对齐位置
         */
        get alignPosition(): Readonly<mw.Vector2>;
        /**
         * @description 设置控件的对齐位置,在对齐方式为靠右对齐、靠下对齐、中心对齐时，alignPosition的值与positon不同；
         * @description 此时，两套位置计算的坐标系不同，例如设置为右下对齐时，该控件的alignPosition以父级右下角为原点来计算
         * @effect  只在客户端调用生效
         * @param inFigmaPosition usage:控件的对齐位置
         */
        set alignPosition(inFigmaPosition: mw.Vector2);
        /**
         * @description 设置控件的大小
         * @effect  只在客户端调用生效
         * @param inSize usage:输入大小
         */
        set size(inSize: mw.Vector2);
        /**
         * @description 获取大小
         * @effect  只在客户端调用生效
         * @returns  FVector2D
         */
        get size(): mw.Vector2;
        /**
         * @description 设置zoder
         * @effect  只在客户端调用生效
         * @param InZOrder usage:值越大在越上层
         */
        set zOrder(InZOrder: number);
        /**
         * @description 获取zorder
         * @effect  只在客户端调用生效
         * @returns zorder
         */
        get zOrder(): number;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:028 reason:接口废弃 replacement:autoSizeHorizontalEnable()/autoSizeVerticalEnable()
         * @description 设置是否自动设置大小
         * @effect  只在客户端调用生效
         * @param autoSize usage:是否自动设置大小
         */
        set autoSizeEnable(autoSize: boolean);
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:028 reason:接口废弃 replacement:autoSizeHorizontalEnable()/autoSizeVerticalEnable()
         * @description 获取是否自动设置大小
         * @effect  只在客户端调用生效
         * @returns 是否自动设置大小
         */
        get autoSizeEnable(): boolean;
        /**
         * @description 获取是否自动水平设置大小
         * @effect  只在客户端调用生效
         * @returns 是否自动水平设置大小
         */
        get autoSizeHorizontalEnable(): boolean;
        /**
         * @description 获取是否自动水平设置大小
         * @effect  只在客户端调用生效
         * @returns 是否自动水平设置大小
         */
        set autoSizeHorizontalEnable(bEnabled: boolean);
        /**
         * @description 获取是否自动垂直设置大小
         * @effect  只在客户端调用生效
         * @returns 是否自动垂直设置大小
         */
        get autoSizeVerticalEnable(): boolean;
        /**
         * @description 获取是否自动垂直设置大小
         * @effect  只在客户端调用生效
         * @returns 是否自动垂直设置大小
         */
        set autoSizeVerticalEnable(bEnabled: boolean);
        /**
         * @description 获取控件上光标类型
         * @effect  只在客户端调用生效
         * @returns 光标类型
         */
        get mouseCursor(): mw.MouseCursor;
        /**
         * @description 将光标类型设置到控件上
         * @effect  只在客户端调用生效
         */
        set mouseCursor(type: mw.MouseCursor);
        /**
         * @description 通过相对路径查找节点
         * @effect 只在客户端调用生效
         * @param inPath usage:路径  range: 不限制
         * @returns 返回查找节点结果
         */
        findChildByPath(inPath: string): mw.Widget;
        /**
         * @description 通过名字查找节点
         * @effect  只在客户端调用生效
         * @param name usage:名字    <br> range: 不限制
         * @returns 找到的控件
         */
        getChildByName<T extends mw.Widget>(name: string): T;
        /**
         * @description 获取第几位子节点
         * @effect  只在客户端调用生效
         * @param index usage:下标  range:大于等于0  type: 整形
         * @returns 找到的控件
         */
        getChildAt(index: number): mw.Widget;
        /**
         * @description 添加子节点
         * @effect  只在客户端调用生效
         * @param child usage:子控件
         */
        addChild(child: mw.Widget): void;
        /**
         * @description 移除节点,会销毁UI无法在使用
         * @effect  只在客户端调用生效
         * @param child usage:需要移除的子控件
         */
        removeChild(child: mw.Widget): void;
        /**
         * @description 移除第几个节点,会销毁UI无法再使用
         * @effect  只在客户端调用生效
         * @param index usage:下标  range: 大于 0   type: 整形
         */
        removeChildAt(index: number): void;
        /**
         * @description 清除所有子节点,会销毁UI无法再使用
         * @effect  只在客户端调用生效
         */
        removeAllChildren(): void;
        /**
         * @description 获取子节点数量
         * @effect  只在客户端调用生效
         * @returns 子节点数量
         */
        getChildrenCount(): number;
        /**
         * @description 克隆UI控件及其子节点到指定父控件位置（默认到其父节点）
         * @effect  只在客户端调用生效
         * @param position usage:克隆后控件生成的位置
         * @param Parent usage:克隆后的控件需要在该控件下生成 default: undefined
         * @returns 克隆生成的UI控件
        */
        clone(position: mw.Vector2, Parent?: Widget): Widget;
        /**
          * @author baolin.li
          * @description 序列化UI控件
          * @groups 界面
          * @effect 只在客户端调用生效
          * @returns 返回传入控件序列化后的JSON字符串
          */
        serialize(): string;
        /**
          * @author baolin.li
          * @description 反序列化UI
          * @groups 界面
          * @effect 只在客户端调用生效
          * @returns 返回传入JSON字符串反序列化后得到的UI
          * @param Data usage:需要反序列化的JSON字符串 range: 无
          * @param Parent usage:生成的UI控件的父节点  default: undefined
          */
        static deserialize(Data: string, Parent?: mw.Widget): mw.Widget;
        /** *************************************************************** 自定义属性接口 ******************************************************/
        /**
        * @description 给定对象属性修改时触发的事件代理
        * @effect 只在客户端调用生效
        * @param property usage:对象属性名字 range: 无
        * @returns 代理对象
        */
        getCustomPropertyChangeDelegate(property: string): Readonly<mw.MulticastDelegate<(path: string, value: unknown, oldValue: unknown) => void>>;
        /**
         * @description 监听自定义属性同步事件
         * @effect  只在客户端调用生效
         * @example 使用示例:监听自定义属性变化
         * ```ts
         * this.onCustomPropertyChange.add((path, value, oldValue) => {
         *     console.log(`属性 ${path} 改变了，新值为 ${value}，旧值为 ${oldValue}`);
         * });
         * ```
         */
        onCustomPropertyChange: Readonly<mw.MulticastDelegate<(path: string, value: unknown, oldValue: unknown) => void>>;
        /**
         * @description 获取所有自定义属性
         * @effect 只在客户端调用生效
         * @returns 属性名列表
         * @example 使用示例:获取所有自定义属性
         * ```ts
         * const attributes = this.getAttributes();
         * console.log(attributes);
         * // ["name", "age"]
         * ```
         */
        getCustomProperties(): string[];
        /**
         * @description 获取自定义属性
         * @effect 只在客户端调用生效
         * @param propertyName usage:对象属性名字 range: 无
         * @returns 属性值
         */
        getCustomProperty<T extends mw.CustomPropertyType>(propertyName: string): T;
        /**
         * @description 设置自定义属性
         * @effect 只在客户端调用生效
         * @param propertyName usage:对象属性名字 range: 无
         * @param value usage:属性值
         */
        setCustomProperty(propertyName: string, value: mw.CustomPropertyType | undefined): void;
    }
}
