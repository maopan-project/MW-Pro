declare namespace mw {
}

declare namespace mw {
}

declare namespace mw {
}

declare namespace mw {
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
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author wu.hao
     * @groups 输入
     * @description 手势代理类
     * @networkStatus usage:客户端
     */
    class GestureDelegate {
        /**
         * @description 点击事件代理
         */
        static tapGestureDelegate: mw.MulticastDelegate<(SelectType: mw.SelectTapType, location: mw.Vector2) => void>;
        /**
         * @description 单指滑动代理
         */
        static oneFingerMoveGestureDelegate: mw.MulticastDelegate<(location: mw.Vector2) => void>;
        /**
         * @description 双指滑动代理
         */
        static twoFingerMoveGestureDelegate: mw.MulticastDelegate<(location: mw.Vector2) => void>;
        /**
         * @description 挤压手势代理
         */
        static pinchGestureDelegate: mw.MulticastDelegate<(Distance: number) => void>;
        /**
         * @description 手指按下代理
         */
        static touchBeganGestureDelegate: mw.MulticastDelegate<(FingerIndex: number, Position: mw.Vector2) => void>;
        /**
         * @description 手指滑动代理
         */
        static touchMoveGestureDelegate: mw.MulticastDelegate<(FingerIndex: number, Position: mw.Vector2) => void>;
        /**
         * @description 手指抬起代理
         */
        static touchEndGestureDelegate: mw.MulticastDelegate<(FingerIndex: number) => void>;
    }
    /**
     * @author jie.wu
     * @description 获取点击事件的代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns 返回的代理
     */
    function getTapGestureDelegate(): mw.MulticastDelegate<(SelectType: mw.SelectTapType, location: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取单指滑动的代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns 返回单指滑动的代理
     */
    function getOneFingerMoveGestureDelegate(): mw.MulticastDelegate<(location: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取双指滑动的代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns 返回双指滑动的代理
     */
    function getTwoFingerMoveGestureDelegate(): mw.MulticastDelegate<(location: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取挤压手势的代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns  返回挤压手势的代理
     */
    function getPinchGestureDelegate(): mw.MulticastDelegate<(Distance: number) => void>;
    /**
     * @author jie.wu
     * @description 获取手指按下代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns 返回手指按下时的代理
     */
    function getTouchBeganGestureDelegate(): mw.MulticastDelegate<(FingerIndex: number, Position: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取手指滑动代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns  返回手指滑动的代理
     */
    function getTouchMoveGestureDelegate(): mw.MulticastDelegate<(FingerIndex: number, Position: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取手指抬起代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns  返回抬起手指时候的代理
     */
    function getTouchEndGestureDelegate(): mw.MulticastDelegate<(FingerIndex: number) => void>;
    /**
     * @author jie.wu
     * @description tap点击的时间间隔- 如果在这个时间以内算tap，大于这个时间则是move
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param time usage: tap限定的时间
     */
    function setTapTime(time: number): void;
    /**
     * @author jie.wu
     * @description 单指移动的时间- 必须大于这个时间才会开始执行单指移动
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param time usage: 单指移动的限定时间
     */
    function setSingleSwipeTime(time: number): void;
    /**
     * @author jie.wu
     * @description 挤压手势的偏差角度
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param time usage: 偏差角度
     */
    function setPinchAngleTolerance(time: number): void;
    /**
     * @author jie.wu
     * @description 双指移动的时间- 必须大于这个时间才执行双指移动事件
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param time usage: 双指移动限定的时间
     */
    function setMultiSwipeTime(time: number): void;
    /**
     * @author jie.wu
     * @description 双指移动的偏差量- 值越大误差则可以越大
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param time usage: 偏差值
     */
    function setSwipeTolerance(time: number): void;
    /**
     * @author jie.wu
     * @description 获取touch的数组
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns 返回一个10维数组Vector, x,y点击的位置,z代表点击的状态 只会出现0,1的情况
     */
    function getTouchData(): Array<mw.Vector>;
    /**
     * @author jie.wu
    * @description 将二维屏幕位置转换为世界空间三维位置和方向
    * @groups 基础类型
    * @effect 调用端生效
    * @param ScreenX usage: 屏幕X轴坐标值 default:
    * @param ScreenY usage: 屏幕Y轴坐标值
    * @returns 屏幕坐标转换结果
    */
    function convertScreenLocationToWorldSpace(ScreenX: number, ScreenY: number): mw.ConvertScreenResult;
    /**
     * @author jie.wu
     * @description 获取角色在世界中的位置，投射到屏幕上
     * @groups 基础类型
     * @effect 调用端生效
     * @param worldLocation usage: 世界坐标
     * @param playerViewportRelative usage: 这是否应该相对于播放器视口子区域（在分割屏幕中使用播放器附加的小部件或纵横比受限时有用）default:false
     * @returns 屏幕坐标转换结果，无WorldDirection，为默认值Type.Vector.ZERO
     */
    function projectWorldPositionToWidgetPosition(worldLocation: mw.Vector, playerViewportRelative?: boolean): mw.ConvertScreenResult;
    /**
     * @author jie.wu
     * @description 获取角色在世界中的位置，投射到屏幕上
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:接口废弃 replacement:projectWorldPositionToWidgetPosition()
     * @groups 基础类型
     * @effect 调用端生效
     * @param worldLocation usage: 世界坐标
     * @param playerViewportRelative usage: 这是否应该相对于播放器视口子区域（在分割屏幕中使用播放器附加的小部件或纵横比受限时有用）default:false
     * @returns 屏幕坐标转换结果，无WorldDirection，为默认值Type.Vector.ZERO
     */
    function projectWorldLocationToWidgetPosition(worldLocation: mw.Vector, playerViewportRelative?: boolean): mw.ConvertScreenResult;
}

declare namespace mw {
    /**
     * @author xiangkun.sun,mengyuan.hao
     * @description  获取当前CPU画质等级
     * @groups 设置
     * @effect 只在客户端调用生效
     * @returns 画质等级。如果返回值为undefined，请检查是否在客户端调用
     */
    function getCPULevel(): mw.GraphicsLevel;
    /**
     * @author xiangkun.sun,mengyuan.hao
     * @description  获取当前GPU画质等级
     * @groups 设置
     * @effect 只在客户端调用生效
     * @returns 画质等级。如果返回值为undefined，请检查是否在客户端调用
     */
    function getGPULevel(): mw.GraphicsLevel;
    /**
     * @author xiangkun.sun,mengyuan.hao
     * @description 获取默认CPU画质等级
     * @groups 设置
     * @effect 只在客户端调用生效
     * @returns 默认画质等级。如果返回值为undefined，请检查是否在客户端调用
     */
    function getDefaultCPULevel(): mw.GraphicsLevel;
    /**
     * @author xiangkun.sun,mengyuan.hao
     * @description 获取默认GPU画质等级
     * @groups 设置
     * @effect 只在客户端调用生效
     * @returns 默认画质等级。如果返回值为undefined，请检查是否在客户端调用
     */
    function getDefaultGPULevel(): mw.GraphicsLevel;
    /**
     * @author xiangkun.sun,mengyuan.hao
     * @description 设置CPU和GPU的画质等级
     * @effect 只在客户端调用生效
     * @param CPULevel usage:CPU画质等级
     * @param GPULevel usage:GPU画质等级
     */
    function setGraphicsLevel(CPULevel: mw.GraphicsLevel, GPULevel: mw.GraphicsLevel): void;
    /**
     * @author xiangkun.sun
     * @description 设置当前CPU画质等级
     * @groups 设置
     * @effect 只在客户端调用生效
     * @param CPULevel usage:CPU画质等级
     */
    function setGraphicsCPULevel(CPULevel: mw.GraphicsLevel): void;
    /**
     * @author xiangkun.sun
     * @description 设置当前GPU画质等级
     * @groups 设置
     * @effect 只在客户端调用生效
     * @param GPULevel usage:GPU画质等级
     */
    function setGraphicsGPULevel(GPULevel: mw.GraphicsLevel): void;
}

declare namespace mw {
    /**
     * @author jie.wu
    * @description UGC 选中的单选或者多选
    * @groups 基础类型
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
    * @author jie.wu
    * @description UGC 发布的状态
    * @groups 基础类型
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
     * @groups 基础类型
     */
    type ReleaseGameData = {
        /** 游戏名称 */
        gameName: string;
        /** (bDownloaded=true:本地文件路径|bDownloaded=false:服务器URL) */
        gameCover: string;
        /** 是否已下载到本地 */
        bDownloaded: boolean;
    };
    /**
     * @author xiangkun.sun
     * @description 日志等级
     * @groups 基础类型
     */
    enum LogLevel {
        /** 普通 */
        Log = 0,
        /** 警告 */
        Warning = 1,
        /** 错误 */
        Error = 2
    }
}

declare namespace mw {
}
