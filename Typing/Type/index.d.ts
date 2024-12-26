declare namespace mw {
    /**
     * @author xiangkun.sun
     * @groups 输入
     * @description 屏幕坐标转换结果
     * @networkStatus usage:双端
     */
    class ConvertScreenResult {
        /**
         * @description 如果无法确定值，则返回  false。
         */
        result: boolean;
        /**
         * @description 世界坐标
         */
        worldPosition: mw.Vector;
        /**
         * @description 世界方向
         */
        worldDirection: mw.Vector;
        /**
         * @description 屏幕位置
         */
        screenPosition: mw.Vector2;
    }
    /**
     * @author xiangkun.sun
     * @groups 基类/场景所有物体基类
     * @description 构建物体的信息
     */
    interface GameObjectInfo {
        /** @description 是否同步 */
        replicates?: boolean;
        /** @description transform */
        transform?: mw.Transform;
    }
    /**
     * @author zhiqiang.tan
     * @groups 玩法/物理
     * @description 空间查询碰撞参数
     */
    interface CollisionQueryParams {
        /** @description 一个对象数组，检测结果会忽略这个数组内的对象。 */
        objectsToIgnore?: Array<mw.GameObject>;
        /** @description 指定检测使用的碰撞通道。碰撞组中设置为不与该组碰撞的模型将被忽略。默认值为“Default”组。 */
        collisionGroup?: string;
        /** @description 如果此属性为true，则查询操作将使用交互模型的Model.collisionEnabled值优先于Model.queryEnabled值，用于确定该模型是否包含在空间查询结果数组中。 */
        respectCanCollide?: boolean;
        /**
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 041 reason:接口设计错误 replacement:无
         * @description 接口设计错误
         */
        objectsToQuery?: Array<mw.GameObject>;
    }
    /**
     * @author zhiqiang.tan
     * @groups 玩法/物理
     * @description 空间查询渲染参数
     */
    interface RenderQueryParams {
        /** @description 如果属性值为true，则启用世界空间中射线检测的可视化以进行调试。 */
        isDrawDebug?: boolean;
        /** @description 可视化调试结果应保留在屏幕上的秒数。默认为1秒。 */
        duration?: number;
        /** @description 调试渲染绘制的射线的颜色。 */
        traceColor?: mw.LinearColor;
        /** @description 调试渲染绘制的击中结果的颜色。 */
        hitColor?: mw.LinearColor;
        /** @description 调试渲染绘制的线的粗细。默认值为1。 */
        thickness?: number;
    }
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @description 内存数据
     * @ignore
     */
    class HeapStatistics {
        /** 总堆大小    单位：byte */
        totalHeapSize: number;
        /** 可执行的总堆大小    单位：byte */
        totalHeapSizeExecutable: number;
        /** 已使用堆的大小  单位：byte */
        usedHeapSize: number;
        /** 动态分配的内存  单位：byte */
        memoryAllocated: number;
        /** 动态内存分配峰值    单位：byte */
        peakMemoryAllocated: number;
    }
}

declare namespace mw {
    /**
     * 代理回调函数签名
     */
    /**
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 代理回调函数签名
     * @effect 调用端生效
     */
    type DelegateFuncType = (...arg: unknown[]) => unknown;
    /**
     * @hidden
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 委托接口
     * @effect 调用端生效
     */
    interface DelegateInterface<T extends DelegateFuncType> {
        /**
         * @description 绑定代理事件
         * @effect 调用端生效
         * @param func usage: 绑定的事件函数default:
         */
        bind(func: T): void;
        /**
         * @description 解绑事件
         * @effect 调用端生效
         */
        unbind(): void;
        /**
         * @description 是否绑定代理事件
         * @effect 调用端生效
         * @returns 是否绑定代理事件
         */
        isBound(): boolean;
        /**
         * @description 触发代理事件
         * @effect 调用端生效
         * @param arg usage: 执行参数
         * @returns 执行返回值
         */
        execute(...arg: Parameters<T>): ReturnType<T>;
    }
    /**
     * @hidden
     * @author xiangkun.sun
     * @groups 基础类型
     * @description 多播委托接口
     * @effect 调用端生效
     */
    interface MulticastDelegateInterface<T extends DelegateFuncType> {
        /**
         * @description 添加代理事件
         * @effect 调用端生效
         * @param func usage: 绑定的事件函数 default
         */
        add(func: T): void;
        /**
         * @description 删除代理事件
         * @effect 调用端生效
         * @param func usage: 删除绑定的事件函数 default
         */
        remove(func: T): void;
        /**
         * @description 清空代理事件（危险操作，请注意您所清空的是哪些代理事件）
         * @effect 调用端生效
         */
        clear(): void;
        /**
         * @description 触发代理事件
         * @effect 调用端生效
         * @param arg usage: 参数
         */
        broadcast(...arg: Parameters<T>): void;
    }
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
    class Delegate<T extends DelegateFuncType> implements DelegateInterface<T> {
        /**
         * @description 绑定事件
         * @effect 调用端生效
         * @param func usage: 绑定的函数 default:
         */
        bind(func: T): void;
        /**
         * @description 解绑事件
         * @effect 调用端生效
         */
        unbind(): void;
        /**
         * @description 是否绑定事件
         * @effect 调用端生效
         * @returns 是否绑定事件
         */
        isBound(): boolean;
        /**
         * @description 执行绑定事件
         * @effect 调用端生效
         * @param arg usage: 执行参数
         * @returns 执行参数类型
         */
        execute(...arg: Parameters<T>): ReturnType<T>;
    }
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
    class MulticastDelegate<T extends DelegateFuncType> implements MulticastDelegateInterface<T> {
        /**
         * @description 添加代理事件
         * @param func usage: 事件回调函数 default
         * @effect 调用端生效
         */
        add(func: T): void;
        /**
         * @description 删除代理事件
         * @param func usage: 删除绑定的事件 default
         * @effect 调用端生效
         */
        remove(func: T): void;
        /**
         * @description 清空代理事件（危险操作，请注意您所清空的是哪些代理事件）
         * @effect 调用端生效
         */
        clear(): void;
        /**
         * @description 触发代理事件
         * @effect 调用端生效
         * @param arg usage: 参数
         */
        broadcast(...arg: Parameters<T>): void;
    }
    /** @ignore
    * @groups 基础类型
    */
    type GameObjectDelegateFuncType = (gameObject: mw.GameObject) => unknown;
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
    class MulticastGameObjectDelegate {
        /**
         * @description 添加代理事件
         * @effect 调用端生效
         * @param func usage: 事件回调函数 default:
         */
        add(func: GameObjectDelegateFuncType): void;
        /**
         * @description 删除代理事件
         * @effect 调用端生效
         * @param func usage: 事件回调函数
         */
        remove(func: GameObjectDelegateFuncType): void;
        /**
         * @description 触发代理事件
         * @effect 调用端生效
         * @param obj usage: 触发物体对象
         */
        broadcast(obj: mw.GameObject): void;
        /**
         * @description 清空代理事件（危险操作，请注意您所清空的是哪些代理事件）
         * @effect 调用端生效
         */
        clear(): void;
    }
}

declare namespace mw {
    /**
     * @author xiangkun.sun
     * @description 属性状态
     * @groups 基础类型
     */
    enum PropertyStatus {
        /**
         * 跟随父节点
         */
        FromParent = 0,
        /**
         * 开
         */
        On = 1,
        /**
         * 关
         */
        Off = 2
    }
    /**
     * @author xiangkun.sun
     * @description 碰撞属性状态
     * @groups 基础类型
    */
    enum CollisionStatus {
        /**
         * 开启碰撞
         */
        On = 1,
        /**
         * 关
         */
        Off = 2,
        /**
         * 仅开启检测
         */
        QueryOnly = 3,
        /**
         * 仅开启查询碰撞
         */
        QueryCollisionOnly = 4
    }
    /**
     * @author maohang.zeng
     * @description Actor在编辑器中的状态标记
     * @groups 基础类型
     */
    enum EdActorFlag {
        /**
         * 默认值
         */
        Default = 71,
        /**
         * 可被删除
         */
        CanDestroy = 1,
        /**
         * 可被选择
         */
        CanSelect = 2,
        /**
         * 可被修改
         */
        CanModify = 4,
        /**
         * 隐藏于编辑器
         */
        HideInEditor = 8,
        /**
         * 在编辑器中锁定操作
         */
        LockInEditor = 16,
        /**
         * 在OutLine里隐藏子节点
         */
        ChildrenHideInOutline = 32,
        /**
         * 在OutLine中展开
         */
        ExpandInOutLine = 64,
        /**
         * 是否是文件夹
         */
        IsFolder = 128,
        /**
         * 是否被选择
         */
        IsSelect = 256,
        /**
         * 是否是绘制对象
         */
        IsPaint = 512,
        /**
         * 是否数据为脏
         */
        IsDirty = 1024,
        /**
         * 显示边界框
         */
        ShowVisualComponent = 2048,
        /**
         * 是否隐藏网络图标
         */
        IsHideNetIcon = 4096,
        /**
         * 是否强制使用等比缩放
         */
        IsForceUseRatioScale = 8192,
        /**
         * 禁止Gizmo选中
         */
        ForbiddenSelectByGizmo = 16384,
        /**
         * 禁止Outline选中
         */
        ForbiddenSelectByOutline = 32768,
        /**
         * 禁止Viewport选中
         */
        ForbiddenSelectByViewport = 65536,
        /**
         * ugc 使用 预制体头节点删除了
         */
        PrefabRootHasDestroyed = 131072,
        /**
         * 在OutLine里隐藏自身
         */
        HideInOutline = 262144
    }
    /**
     * @author xiangkun.sun
     * @description 同步状态
     * @groups 基础类型
     */
    enum NetStatus {
        /**
         * 服务端
         */
        Server = 0,
        /**
         * 客户端
         */
        Client = 1,
        /**
         * 服务器创建，同步到客户端
         */
        ServerAndClient = 2
    }
    /**
     * @author xiangkun.sun
     * @description 按键Key值
     * @groups 基础类型
     */
    enum Keys {
        /**
         * 任意按键
         */
        AnyKey = "AnyKey",
        /**
         * 鼠标水平轴移动
         */
        MouseX = "MouseX",
        /**
         * 鼠标竖直轴移动
         */
        MouseY = "MouseY",
        /**
         * 鼠标移动
         */
        Mouse2D = "Mouse2D",
        /**
         * 鼠标滚轮向上滑
         */
        MouseScrollUp = "MouseScrollUp",
        /**
         * 鼠标滚轮向下滑
         */
        MouseScrollDown = "MouseScrollDown",
        /**
         * 鼠标滚轮轴
         */
        MouseWheelAxis = "MouseWheelAxis",
        /**
         * 鼠标左键
         */
        LeftMouseButton = "LeftMouseButton",
        /**
         * 鼠标右键
         */
        RightMouseButton = "RightMouseButton",
        /**
         * 鼠标中键
         */
        MiddleMouseButton = "MiddleMouseButton",
        /**
         * 拇指鼠标上按键
         */
        ThumbMouseButton = "ThumbMouseButton",
        /**
         * 拇指鼠标下按键
         */
        ThumbMouseButton2 = "ThumbMouseButton2",
        /**
         * 退位键
         */
        Backspace = "BackSpace",
        /**
         * Tab键
         */
        Tab = "Tab",
        /**
         * 回车键
         */
        Enter = "Enter",
        /**
         * 暂停键
         */
        Pause = "Pause",
        /**
         * Caps键
         */
        CapsLock = "CapsLock",
        /**
         * Esc键
         */
        Escape = "Escape",
        /**
         * 空格键
         */
        SpaceBar = "SpaceBar",
        /**
         * PageUp键
         */
        PageUp = "PageUp",
        /**
         * PageDown键
         */
        PageDown = "PageDown",
        /**
         * End键
         */
        End = "End",
        /**
         * Home键
         */
        Home = "Home",
        /**
         * ←键
         */
        Left = "Left",
        /**
         * ↑键
         */
        Up = "Up",
        /**
         * →键
         */
        Right = "Right",
        /**
         * ↓键
         */
        Down = "Down",
        /**
         * Ins键
         */
        Insert = "Insert",
        /**
         * Del键
         */
        Delete = "Delete",
        /**
         * 0键
         */
        Zero = "Zero",
        /**
         * 1键
         */
        One = "One",
        /**
         * 2键
         */
        Two = "Two",
        /**
         * 3键
         */
        Three = "Three",
        /**
         * 4键
         */
        Four = "Four",
        /**
         * 5键
         */
        Five = "Five",
        /**
         * 6键
         */
        Six = "Six",
        /**
         * 7键
         */
        Seven = "Seven",
        /**
         * 8键
         */
        Eight = "Eight",
        /**
         * 9键
         */
        Nine = "Nine",
        /**
         * A键
         */
        A = "A",
        /**
         * B键
         */
        B = "B",
        /**
         * C键
         */
        C = "C",
        /**
         * D键
         */
        D = "D",
        /**
         * E键
         */
        E = "E",
        /**
         * F键
         */
        F = "F",
        /**
         * G键
         */
        G = "G",
        /**
         * H键
         */
        H = "H",
        /**
         * I键
         */
        I = "I",
        /**
         * J键
         */
        J = "J",
        /**
         * K键
         */
        K = "K",
        /**
         * L键
         */
        L = "L",
        /**
         * M键
         */
        M = "M",
        /**
         * N键
         */
        N = "N",
        /**
         * O键
         */
        O = "O",
        /**
         * P键
         */
        P = "P",
        /**
         * Q键
         */
        Q = "Q",
        /**
         * R键
         */
        R = "R",
        /**
         * S键
         */
        S = "S",
        /**
         * T键
         */
        T = "T",
        /**
         * U键
         */
        U = "U",
        /**
         * V键
         */
        V = "V",
        /**
         * W键
         */
        W = "W",
        /**
         * X键
         */
        X = "X",
        /**
         * Y键
         */
        Y = "Y",
        /**
         * Z键
         */
        Z = "Z",
        /**
         * 小键盘0键位
         */
        NumPadZero = "NumPadZero",
        /**
         * 小键盘1键位
         */
        NumPadOne = "NumPadOne",
        /**
         * 小键盘2键位
         */
        NumPadTwo = "NumPadTwo",
        /**
         * 小键盘3键位
         */
        NumPadThree = "NumPadThree",
        /**
         * 小键盘4键位
         */
        NumPadFour = "NumPadFour",
        /**
         * 小键盘5键位
         */
        NumPadFive = "NumPadFive",
        /**
         * 小键盘6键位
         */
        NumPadSix = "NumPadSix",
        /**
         * 小键盘7键位
         */
        NumPadSeven = "NumPadSeven",
        /**
         * 小键盘8键位
         */
        NumPadEight = "NumPadEight",
        /**
         * 小键盘9键位
         */
        NumPadNine = "NumPadNine",
        /**
         * 小键盘*键位
         */
        Multiply = "Multiply",
        /**
         * 小键盘+键位
         */
        Add = "Add",
        /**
         * 小键盘-键位
         */
        Subtract = "Subtract",
        /**
         * 小键盘dec键位
         */
        Decimal = "Decimal",
        /**
         * 小键盘/键位
         */
        Divide = "Divide",
        /**
         * F1键
         */
        F1 = "F1",
        /**
         * F2键
         */
        F2 = "F2",
        /**
         * F3键
         */
        F3 = "F3",
        /**
         * F4键
         */
        F4 = "F4",
        /**
         * F5键
         */
        F5 = "F5",
        /**
         * F6键
         */
        F6 = "F6",
        /**
         * F7键
         */
        F7 = "F7",
        /**
         * F8键
         */
        F8 = "F8",
        /**
         * F9键
         */
        F9 = "F9",
        /**
         * F10键
         */
        F10 = "F10",
        /**
         * F11键
         */
        F11 = "F11",
        /**
         * F12键
         */
        F12 = "F12",
        /**
         * NumLock键
         */
        NumLock = "NumLock",
        /**
         * ScrollLock键
         */
        ScrollLock = "ScrollLock",
        /**
         * 左Shift键
         */
        LeftShift = "LeftShift",
        /**
         * 右Shift键
         */
        RightShift = "RightShift",
        /**
         * 左Control键
         */
        LeftControl = "LeftControl",
        /**
         * 右Control键
         */
        RightControl = "RightControl",
        /**
         * 左Alt键
         */
        LeftAlt = "LeftAlt",
        /**
         * 右Alt键
         */
        RightAlt = "RightAlt",
        /**
         * 左Command键
         */
        LeftCommand = "LeftCommand",
        /**
         * 右Command键
         */
        RightCommand = "RightCommand",
        /**
         * ;
号
         */
        Semicolon = "Semicolon",
        /**
         * =号
         */
        Equals = "Equals",
        /**
         * ,号
         */
        Comma = "Comma",
        /**
         * _号
         */
        Underscore = "Underscore",
        /**
         * -号
         */
        Hyphen = "Hyphen",
        /**
         * .号
         */
        Period = "Period",
        /**
         * /号
         */
        Slash = "Slash",
        /**
         * ~号
         */
        Tilde = "Tilde",
        /**
         * ]号
         */
        LeftBracket = "LeftBracket",
        /**
         * $号
         */
        Dollar = "Dollar",
        /**
         * !号
         */
        Exclamation = "Exclamation",
        /**
         * :号
         */
        Colon = "Colon"
    }
    /**
     * @author xiangkun.sun
     * @description 画质等级
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since: 030 reason:接口废弃 replacement:
     * @groups 基础类型
     */
    enum GraphicsLevel {
        /**
         * 1级（低级偏低）
         */
        Low1 = 0,
        /**
         * 2级（低级偏中）
         */
        Low2 = 1,
        /**
         * 3级（低级偏高）
         */
        Low3 = 2,
        /**
         * 4级（中级偏低）
         */
        Medium1 = 3,
        /**
         * 5级（中级）
         */
        Medium2 = 4,
        /**
         * 6级（高级偏低）
         */
        High1 = 5,
        /**
         * 7级（高级）
         */
        High2 = 6,
        /**
         * 8级（超高偏低）
         */
        Cinematic1 = 7,
        /**
         * 9级（超高）
         */
        Cinematic2 = 8,
        /**
         * 10级（电影画质）
         */
        Cinematic3 = 9,
        /**
         * 自定义1级
         */
        Custom1 = 10,
        /**
         * 自定义2级
         */
        Custom2 = 11,
        /**
         * 自定义3级
         */
        Custom3 = 12,
        /**
         * 自定义4级
         */
        Custom4 = 13,
        /**
         * 自定义5级
         */
        Custom5 = 14
    }
    /**
     * @author xiangkun.sun
     * @description 运行平台
     * @groups 基础类型
     */
    enum RuntimePlatform {
        /** PC - Windows */
        Windows = 0,
        /** PC - Linux */
        Linux = 1,
        /** PC - MacOS */
        MacOS = 2,
        /** Mobile - Android */
        Android = 3,
        /** Mobile - iOS */
        iOS = 4
    }
    /**
     * @author xiangkun.sun
     * @description 游戏语言
     * @groups 基础类型
     */
    enum LanguageType {
        /**
         * 中文
         */
        Chinese = 1,
        /**
         * 英文
         */
        English = 2,
        /**
         * 葡萄牙语
         */
        Portuguese = 3
    }
    /**
     * @author xiaobo.qi
     * @description 游戏本地化语言
     * @groups 基础类型
     */
    enum LanguageCodeType {
        /** English */
        English = "En",
        /** ChineseSimplified */
        ChineseSimplified = "Zh_CN",
        /** ChineseTraditional */
        ChineseTraditional = "Zh_HANT",
        /** Spanish */
        Spanish = "Es",
        /** French */
        French = "Fr",
        /** Russian */
        Russian = "Ru",
        /** Portuguese */
        Portuguese = "Pt",
        /** Japanese */
        Japanese = "Ja",
        /** Korean */
        Korean = "Ko"
    }
    /**
     * @author xiangkun.sun
     * @description 资源类型
     * @groups 基础类型
     */
    enum AssetType {
        /** All */
        All = 0,
        /** StaticMesh */
        StaticMesh = 1,
        /** SkeletalMesh */
        SkeletalMesh = 2,
        /** Cloth */
        Cloth = 3,
        /** SoundWave */
        SoundWave = 4,
        /** Texture */
        Texture = 5,
        /** Prefab */
        Prefab = 6,
        /** Character */
        Character = 7,
        /** ParticleSystem */
        ParticleSystem = 8,
        /** DynamicAttachment */
        DynamicAttachment = 9,
        /** BTAStaticMesh */
        BTAStaticMesh = 10,
        /** JsonParticleSystem */
        JsonParticleSystem = 11
    }
    /**
  * @description gizmo模式
  * @author jie.wu
  * @groups 基础类型
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
     * @groups 基础类型
     */
    enum GizmoSpaceType {
        /** 世界 */
        World = 0,
        /** 本地 */
        Local = 1
    }
    /**
     * @description gizmo空间
     * @author jie.wu
     * @groups 基础类型
     */
    enum GizmoScaleType {
        /** 盒式缩放 */
        Box = 0,
        /** 轴式缩放 */
        Axis = 1
    }
    /**
     * @description gizmo空间
     * @author jie.wu
     * @groups 基础类型
     */
    enum GizmoSocketType {
        /** 中心 */
        Center = 0,
        /** 轴点 */
        Pivot = 1
    }
    /**
     * @author jie.wu
     * @groups 基础类型
     * @description gizmo坐标轴类型
     */
    enum GizmoCoordinateType {
        /** 移动坐标轴的X轴 box */
        TransformX = 1,
        /** 移动坐标轴的Y轴 box */
        TransformY = 2,
        /** 移动坐标轴的Z轴 box */
        TransformZ = 4,
        /** 旋转坐标轴的X轴 */
        RotatorX = 8,
        /** 旋转坐标轴的Y轴 */
        RotatorY = 16,
        /** 旋转坐标轴的Z轴 */
        RotatorZ = 32,
        /** 旋转坐标轴的平面旋转 */
        RotatorED = 33,
        /** 旋转坐标轴的自由旋转 */
        RotatorXY = 34,
        /** 缩放坐标轴的X轴 */
        ScaleX = 64,
        /** 缩放坐标轴的Y轴 */
        ScaleY = 128,
        /** 缩放坐标轴的Z轴 */
        ScaleZ = 256,
        /** 缩放坐标轴的整体轴 */
        ScaleAll = 448,
        /** 平移坐标轴的XY轴平面 */
        TransformXY = 3,
        /** 平移坐标轴的XZ轴平面 */
        TransformXZ = 5,
        /** 平移坐标轴的YZ轴平面 */
        TransformYZ = 6,
        /** 平移坐标轴的XYZ轴平面 */
        TransformXYZ = 7,
        /** 盒式缩放的x轴左方向轴点 */
        X_Left = 1024,
        /** 盒式缩放的x轴右方向轴点 */
        X_Right = 2048,
        /** 盒式缩放的y轴前向轴点 */
        Y_Forward = 4096,
        /** 盒式缩放的y轴后向轴点 */
        Y_Back = 8192,
        /** 盒式缩放的z轴上方向轴点 */
        Z_Top = 16384,
        /** 盒式缩放的z轴下方向轴点 */
        Z_Bottom = 32768,
        /** 当前未选中任何轴 */
        None = 0
    }
}

declare namespace mw {
    /**
     * @author shilong.wang
     * @groups 基础类型/其他
     * @description 类定义，使用这个可以省去类参数繁琐的类型声明    如:fun<T>(c:{new():T}) 可以写成 fun<T>(c:Class<T>)
     */
    interface TypeName<T> {
        /**
         * @description 类定义，使用这个可以省去类参数繁琐的类型声明    如:fun<T>(c:{new():T}) 可以写成 fun<T>(c:Class<T>)
         * @param args usage:参数
         */
        new (...args: any[]): T;
    }
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
    class Action {
        /**
         * @description 添加一个监听方法
         * @effect 调用端生效
         * @param fn usage: 方法
         * @param thisArg usage: 域，以下示例可以为您解释域的概念 default: undefined
         * @returns 本次监听的唯一标识，可用于remove。如果返回-1，则说明这个方法之前添加过，不会重复添加。
         * @example
         * 使用示例: 解释“域”的概念
         * ```
         * @Component
         * export default class ActionExample extends Script {
         *
         *     private readonly action1: Action1<player> = new Action1();
         *     private readonly action2: Action1<player> = new Action1();
         *     private readonly action3: Action1<player> = new Action1();
         *     private readonly action4: Action1<player> = new Action1();
         *     private readonly action5: Action1<player> = new Action1();
         *
         *     public playerOne: multiPlayer = new multiPlayer(10.5, "Janny");
         *     public playertwo: lowPlayer = new lowPlayer(12, "Danny");
         *     public playerthree : multiPlayer = new multiPlayer(11,"Liming");
         *
         *     private thisarg: number = 0;
         *
         *     protected onStart(): void {
         *         // 域 传入 lowPlayer 对象，获取的是 lowPlayer 中 thisarg 值。
         *         this.action1.add(this.clickOne, this.playertwo);
         *         // 域 传入this等同于bind(this)，此类的 thisarg 值。
         *         this.action2.add(this.clickOne, this);
         *         this.action3.add(this.clickOne.bind(this));
         *         // 域 什么也不传，为 undefined
         *         this.action4.add(this.clickOne);
         *         // 域 传入 multiPlayer 对象，获取的是 multiPlayer 中 thisarg 值。
         *         this.action5.add(this.clickOne, this.playerthree);
         *
         *         InputUtil.onKeyDown(Keys.One, () => {
         *             console.log("1")
         *             this.action1.call(this.playerOne);
         *         });
         *         InputUtil.onKeyDown(Keys.Two, () => {
         *             console.log("2")
         *             this.action2.call(this.playerOne);
         *         });
         *         InputUtil.onKeyDown(Keys.Three, () => {
         *             console.log("3")
         *             this.action3.call(this.playerOne);
         *         });
         *         InputUtil.onKeyDown(Keys.Four, () => {
         *             console.log("4")
         *             this.action4.call(this.playerOne);
         *         });
         *         InputUtil.onKeyDown(Keys.Five, () => {
         *             console.log("5")
         *             this.action5.call(this.playerOne);
         *         });
         *     }
         *
         *     private clickOne(player: player): void {
         *         console.warn("action1 is called:  " + this.thisarg);
         *         player.game();
         *     }
         * }
         *
         * class player {
         *     public age: number = 20;
         *     public name: string = "Li";
         *     constructor(age: number, name: string) {
         *         this.age = age;
         *         this.name = name;
         *     }
         *     public game() {
         *         console.log("player is playing game");
         *     }
         * }
         * class lowPlayer extends player {
         *     private thisarg: number = 10;
         *     public game(): void {
         *         console.log("lowplayer is playing game");
         *         console.log(this.age + "   " + this.name);
         *     }
         * }
         * class multiPlayer extends player {
         *     private thisarg: number = 20;
         *     public game(): void {
         *         console.log("multiPlayer is playing game");
         *         console.log(this.age + "   " + this.name);
         *     }
         * }
         * ```
         */
        add(fn: Function, thisArg?: any): number;
        /**
         * @description 移除一个监听方法
         * @effect 调用端生效
         * @param fn usage: 方法|监听唯一标识
         * @param thisArg usage: 域 default: undefined
         */
        remove(fn: number | Function, thisArg?: any): void;
        /**
         * @description 执行
         * @effect 调用端生效
         * @param params usage: 参数序列
         * @example
         * 使用示例:创建一个名为ActionExample的脚本，放置在对象栏中，打开脚本，输入以下代码保存，运行游戏，按下键盘“1”将看到代理被调用的效果，按下键盘“2”会看到代理被移除的效果，代码如下：
         * ```
         * @Component
         * export default class ActionExample extends Script {
         *     private readonly action:Action = new Action();
         *     private readonly action1:Action1<number> = new Action1();
         *     private readonly action2:Action2<number, string> = new Action2();
         *
         *     protected onStart(): void {
         *         // 添加Action的监听
         *         this.action.add(() => {
         *             console.log("action");
         *         });
         *         // 添加Action1的监听
         *         const id = this.action1.add((num: number) => {
         *             console.log("onAction1", num);
         *         });
         *         // 添加Action2的监听
         *         this.action2.add(this.onAction2, this);
         *
         *         // 按下键盘的1键触发各个Action
         *         InputUtil.onKeyDown(Keys.One, () => {
         *             this.action.call();
         *             this.action1.call(1);
         *             this.action2.call(2, "testString");
         *         });
         *         // 按下键盘的2键移除各个Action的监听，移除后再触发不会执行
         *         InputUtil.onKeyDown(Keys.Two, () => {
         *             this.action1.remove(id);
         *             this.action2.remove(this.onAction2, this);
         *         });
         *     }
         *     // Action2的监听函数
         *     private onAction2(num: number, str: string) {
         *         console.log("onAction2", num, str);
         *     }
         * }
         * ```
         */
        call(...params: any): void;
        /**
         * @description 判断是否包含某个监听方法
         * @effect 调用端生效
         * @param fn usage: 方法
         * @param thisArg usage: 域
         * @returns 结果
         */
        includes(fn: Function, thisArg: any): boolean;
        /**
         * @description 清除所有监听
         * @effect 调用端生效
         */
        clear(): void;
        /**
         * @description 监听方法的数量
         * @effect 调用端生效
         */
        get count(): number;
    }
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
    class Action1<T> extends Action {
        /**
         * @description 添加一个监听方法(有重复过滤)
         * @effect 调用端生效
         * @param fn usage: 方法
         * @param thisArg usage: 域 default: undefined
         * @returns 本次监听的唯一标识，可用于remove。如果返回-1，则说明这个方法之前添加过，不会重复添加
         */
        add(fn: (a: T) => void, thisArg?: any): number;
        /**
         * @description 移除一个监听方法
         * @effect 调用端生效
         * @param fn usage: 方法|监听唯一标识
         * @param thisArg usage: 域，fn为number时不用写 default: undefined
         */
        remove(fn: ((a: T) => void) | number, thisArg?: any): void;
        /**
         * @description 执行
         * @effect 调用端生效
         * @param arg usage: 参数a
         */
        call(arg: T): void;
    }
    /**
     * @author shilong.wang
     * @groups 基础类型/代理
     * @description 两个参数的代理
     * @networkStatus usage: 双端
     */
    class Action2<T1, T2> extends Action {
        /**
         * @description 添加一个监听方法(有重复过滤)
         * @effect 调用端生效
         * @param fn usage: 方法
         * @param thisArg usage: 域 default: undefined
         * @returns 本次监听的唯一标识，可用于remove。如果返回-1，则说明这个方法之前添加过，不会重复添加
         */
        add(fn: (a: T1, b: T2) => void, thisArg?: any): number;
        /**
         * @description 移除一个监听方法
         * @effect 调用端生效
         * @param fn usage: 方法|监听唯一标识
         * @param thisArg usage: 域，fn为number时不用写 default: undefined
         */
        remove(fn: ((a: T1, b: T2) => void) | number, thisArg?: any): void;
        /**
         * @description 执行
         * @effect 调用端生效
         * @param a usage: 参数a
         * @param b usage: 参数b
         */
        call(a: T1, b: T2): void;
    }
    /**
     * @author shilong.wang
     * @groups 基础类型/代理
     * @description 三个参数的代理
     * @networkStatus usage: 双端
     */
    class Action3<T1, T2, T3> extends Action {
        /**
         * @description 添加一个监听方法(有重复过滤)
         * @effect 调用端生效
         * @param fn usage: 方法
         * @param thisArg usage: 域 default: undefined
         * @returns 本次监听的唯一标识，可用于remove。如果返回-1，则说明这个方法之前添加过，不会重复添加
         */
        add(fn: (a: T1, b: T2, c: T3) => void, thisArg?: any): number;
        /**
         * @description 移除一个监听方法
         * @effect 调用端生效
         * @param fn usage: 方法
         * @param thisArg usage: 域，fn为number时不用写 default: undefined
         */
        remove(fn: ((a: T1, b: T2, c: T3) => void) | number, thisArg?: any): void;
        /**
         * @description 执行
         * @effect 调用端生效
         * @param a usage: 参数a
         * @param b usage: 参数b
         * @param c usage: 参数c
         */
        call(a: T1, b: T2, c: T3): void;
    }
}

declare namespace mw {
    /**
     * @author xiangkun.sun
     * @groups 基础类型/其他
     * @description r, g, b 颜色值的有效范围是 0.0 <= value <= 1.0
     * @networkStatus usage:双端
     */
    class LinearColor {
        /**
        * @description 用给定的 r, g, b 值构建一个新的 Color
        * @param r usage:r range:颜色值的有效范围是 0.0 <= value <= 1.0  type: 浮点数
        * @param g usage:g range:颜色值的有效范围是 0.0 <= value <= 1.0  type: 浮点数
        * @param b usage:b range:颜色值的有效范围是 0.0 <= value <= 1.0  type: 浮点数
        */
        constructor(r: number, g: number, b: number);
        /**
         * @description 用给定的 r, g, b, a 值构建一个新的 Color
         * @param r usage:r  range:颜色值的有效范围是 0.0 <= value <= 1.0  type: 浮点数
         * @param g usage:g  range:颜色值的有效范围是 0.0 <= value <= 1.0  type: 浮点数
         * @param b usage:b  range:颜色值的有效范围是 0.0 <= value <= 1.0  type: 浮点数
         * @param a usage:a  range:颜色值的有效范围是 0.0 <= value <= 1.0  type: 浮点数
         */
        constructor(r: number, g: number, b: number, a: number);
        /**
         * @description 用给定的 Vector 对象构建一个新的 LinearColor
         * @param v usage:Vector 对象
         */
        constructor(v: mw.Vector);
        /**
         * @description 用给定的 LinearColor 构建一个新的 LinearColor
         * @param c usage:Vector 对象
         */
        constructor(c: LinearColor);
        /**
         * @description 用数据填充对象。
         * @description 与另一个 fromString 函数的区别为：此函数为普通函数，另一个为静态函数。
         * @description 调用方式不相同。
         * @example
         * 使用示例: 调用方式的区别
         * ```ts
         * // 此函数
         * let color :LinearColor;
         * color.fromString("R=0.000000,G=1.000000,B=0.000000,A=-1.000000");
         * this.button.pressedImagColor = color;
         *
         * // 静态 fromString 函数
         * const str = "R=0.000000,G=1.000000,B=0.000000,A=-1.000000";
         * this.button.pressedImagColor = LinearColor.fromString(str);
         * ```
         * @effect 调用端生效
         * @param str usage:数据字符串 <br> range: "R=0.000000,G=1.000000,B=0.000000,A=-1.000000"
         */
        fromString(str: string): void;
        /**
         * @description 用数据生成一个新的对象
         * @description 传入格式为："R=0.000000,G=1.000000,B=0.000000,A=-1.000000"(绿色)
         * @effect 调用端生效
         * @param jsonStr usage:数据字符串 <br> range:"R=0.000000,G=1.000000,B=0.000000,A=-1.000000"
         * @returns 新的 LinearColor 类型对象。
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
         *          this.button.text = "按下变绿";
         *          this.button.transitionEnable = true;
         *          const str = "R=0.000000,G=1.000000,B=0.000000,A=-1.000000";
         *          this.button.pressedImagColor = LinearColor.fromString(str);
         *          this.button.visibility = SlateVisibility.Visible;
         *          this.button.onClicked.add(() => {
         *              console.log("click");
         *          })
         *      }
         *  }
         * ```
         */
        static fromString(jsonStr: string): LinearColor;
        /**
         * @description 以字符串的形式输出对象属性
         * @effect 调用端生效
         * @returns 对象属性字符串
         */
        toString(): string;
        /**
         * @description 克隆当前线性颜色
         * @effect 调用端生效
         * @returns 返回一个新的线性颜色
         */
        clone(): LinearColor;
        /**
         * @description 转换当前颜色
         * @effect 调用端生效
         * @param r usage:颜色 R 值。default:null <br> range:[0, 255]  type:整数
         * @param g usage:颜色 G 值。default:null <br> range:[0, 255]  type:整数
         * @param b usage:颜色 B 值。 default:null <br> range:[0, 255]  type:整数
         * @param a usage:颜色 透明度。default:255 <br> range:[0, 255]  type:整数
         * @param outer usage:接收转换结果的 LinearColor 对象 default: null
         * @returns 如果 outer 不为空, 返回 outer， 否则返回一个新的 LinearColor 对象。
         */
        static colorToLinearColor(r: number, g: number, b: number, a?: number, outer?: LinearColor): LinearColor;
        /**
         * @description 将 HexColor 转化为 LinearColor
         * @effect 调用端生效
         * @param inColorHex usage:HexColor 字符串 <br> range: HexColor 字符串长度
         * @param outer usage:接收转化后的 LinearColor 的对象 default:null
         * @returns LinerColor 对象
         */
        static colorHexToLinearColor(inColorHex: string, outer?: LinearColor): LinearColor;
        /**
         * @description 将 HsvColor 转化为 LinearColor
         * @effect 调用端生效
         * @param h usage:色调。 <br> range:[0, 1]  type:浮点数
         * @param s usage:饱和度。 <br> range:[0, 1]  type:浮点数
         * @param v usage:亮度。 <br> range:[0, 1] 0.0(黑色)～1.0(白色)  type:浮点数
         * @param outer usage:接收转换结果的 LinearColor 对象 default: null
         * @returns 如果 outer 不为空, 返回 outer，否则返回一个新的 LinearColor 对象
         */
        static colorHsvToLinearColor(h: number, s: number, v: number, outer?: LinearColor): LinearColor;
        /**
         * @description 将字节色调饱和度亮度转换为 LinearColor
         * @effect 调用端生效
         * @param h usage:色调。 <br> range:[0, 1]  type:浮点数
         * @param s usage:饱和度。 <br> range:[0, 1]  type:浮点数
         * @param v usage:亮度。 <br> range:[0, 1] 0.0(黑色)～1.0(白色)  type:浮点数
         * @param outer usage:接收转换结果的 LinearColor 对象 default:null
         * @returns 如果 outer 不为空, 返回 outer, 否则返回一个新的 LinearColor 对象
         */
        static makeFromHSV(h: number, s: number, v: number, outer?: LinearColor): LinearColor;
        /**
         * @description 获取当前 LinearColor 的 r 值
         */
        get r(): number;
        /**
         * @description 设置当前 LinearColor 的 r 值
         * @param v usage: r  range: 亮度的有效范围是 0.0 <= value <= 1.0    type:浮点数
         */
        set r(v: number);
        /**
         * @description 获取当前 LinearColor 的 g 值
         */
        get g(): number;
        /**
         * @description 设置当前 LinearColor 的 g 值 颜色值的有效范围是
         * @param v usage: g  range: 颜色的有效范围是 0.0 <= value <= 1.0    type:浮点数
         */
        set g(v: number);
        /**
         * @description 获取当前 LinearColor 的 b 值
         */
        get b(): number;
        /**
         * @description 设置当前 LinearColor 的 b 值
         * @param v usage: b  range: 亮度的有效范围是 0.0 <= value <= 1.0    type:浮点数
         */
        set b(v: number);
        /**
         * @description 获取当前 LinearColor 的 a 值
         */
        get a(): number;
        /**
         * @description 设置当前 LinearColor 的 a 值
         * @param v usage: a  range: 亮度的有效范围是 0.0 <= value <= 1.0    type:浮点数
         */
        set a(v: number);
        /**
         * @description 白色 (1, 1, 1, 1)
         */
        static get white(): LinearColor;
        /**
         * @description 灰色 (0.5, 0.5, 0.5, 1)
         */
        static get gray(): LinearColor;
        /**
         * @description 黑色 (0, 0, 0, 1)
         */
        static get black(): LinearColor;
        /**
         * @description 红色 (1, 0, 0, 1)
         */
        static get red(): LinearColor;
        /**
         * @description 绿色 (0, 1, 0, 1)
         */
        static get green(): LinearColor;
        /**
         * @description 蓝色 (0, 0, 1, 1)
         */
        static get blue(): LinearColor;
        /**
         * @description 黄色 (1, 1, 0, 1)
         */
        static get yellow(): LinearColor;
        /**
         * @description 返回具有随机 RGB 值和 Alpha 为 1.0 的新颜色
         * @effect 调用端生效
         * @param outer usage:接收结果的 LinearColor 对象 default:null
         * @returns 如果 outer 不为空, 返回 outer, 否则返回一个新的 LinearColor 对象
         */
        static random(outer?: LinearColor): LinearColor;
        /**
         * @description 颜色值相加
         * @effect 调用端生效
         * @param linearColorB usage:相加的颜色B
         * @param outer usage:接收结果的 LinearColor 对象 default:null
         * @returns 如果 outer 不为空, 返回 outer, 否则返回一个新的 LinearColor 对象
         */
        addition(linearColorB: LinearColor, outer?: LinearColor): LinearColor;
        /**
         * @description 颜色值相减
         * @effect 调用端生效
         * @param linearColorB usage:相减的颜色B
         * @param outer usage:接收结果的 LinearColor 对象 default:null
         * @returns 如果 outer 不为空, 返回 outer, 否则返回一个新的 LinearColor 对象
         */
        subtraction(linearColorB: LinearColor, outer?: LinearColor): LinearColor;
        /**
         * @description 颜色值相乘
         * @effect 调用端生效
         * @param linearColorB usage:相乘的颜色B
         * @param outer usage:接收结果的 LinearColor 对象 default:null
         * @returns 如果 outer 不为空, 返回 outer, 否则返回一个新的 LinearColor 对象
         */
        multiply(linearColorB: LinearColor, outer?: LinearColor): LinearColor;
        /**
         * @description 颜色值相除
         * @effect 调用端生效
         * @param linearColorB usage:相除的颜色B
         * @param outer usage:接收结果的 LinearColor 对象 default:null
         * @returns 如果 outer 不为空, 返回 outer, 否则返回一个新的 LinearColor 对象
         */
        division(linearColorB: LinearColor, outer?: LinearColor): LinearColor;
        /**
         * @description 判断两个颜色值是否相等
         * @effect 调用端生效
         * @param linearColorB usage:对比的颜色B
         * @param epsilon usage:最小误差数 <br> default: mw.MathUtil.EPSILON  <br> range: 建议为小于 1 的值。 <br> type: 浮点数
         * @returns 是否相等。相等返回true，不相等返回false
         */
        equality(linearColorB: LinearColor, epsilon?: number): boolean;
        /**
         * @description 判断两个颜色值是否不相等
         * @effect 调用端生效
         * @param linearColorB usage:对比的颜色B
         * @param epsilon usage:最小误差数 default: mw.MathUtil.EPSILON  <br> range: 建议为小于 1 的值。 <br> type: 浮点数
         * @returns 是否相等。不相等返回 true，相等返回 false
         */
        inequality(linearColorB: LinearColor, epsilon?: number): boolean;
    }
}

declare namespace mw {
    /**
     * @author yuhao.chen
     * @groups 基础类型/变换/矩阵
     * @description 三维矩阵
     * @description -------------------
     * @precautions 列矩阵
     * @networkStatus usage:双端
     */
    class Matrix3x3 {
        /**
         * @description 获得一个默认矩阵
         */
        static get identity(): Matrix3x3;
        /**
         * @description 获得指定矩阵的拷贝
         * @effect 调用端生效
         * @param a usage:指定矩阵
         * @returns 一个新的矩阵
         */
        static clone(a: Matrix3x3): Matrix3x3;
        /**
         * @description 将目标矩阵变为转置矩阵
         * @effect 调用端生效
         * @param a usage:目标矩阵
         * @param outer usage:写入数据的矩阵 default:null
         * @returns 转置后的矩阵
         */
        static transpose(a: Matrix3x3, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 将目标矩阵求逆，注意，在矩阵不可逆时，会返回一个全为 0 的矩阵。
         * @effect 调用端生效
         * @param a usage:目标矩阵
         * @param outer usage:写入数据的矩阵 default:null
         * @returns 求逆后的矩阵
         */
        static invert(a: Matrix3x3, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 求目标矩阵行列式
         * @effect 调用端生效
         * @param a usage:目标矩阵
         * @returns 行列式的结果
         */
        static determinant(a: Matrix3x3): number;
        /**
         * @description 向量与三维矩阵乘法，默认向量第三位为 1。
         * @effect 调用端生效
         * @param a usage:三维矩阵
         * @param b usage:二维向量
         * @param outer usage:被写入的二维向量 default:null
         * @returns 变换后的二维向量
         */
        static transformVector2(a: Matrix3x3, b: mw.Vector2, outer?: mw.Vector2): mw.Vector2;
        /**
         * @description 向量与三维矩阵乘法
         * @effect 调用端生效
         * @param a usage:三维矩阵
         * @param b usage:三维向量
         * @param outer usage:被写入的三维向量 default:null
         * @returns 变换后的三维向量
         */
        static transformVector(a: Matrix3x3, b: mw.Vector, outer?: mw.Vector): mw.Vector;
        /**
         * @description 在给定矩阵变换基础上加入新缩放变换
         * @effect 调用端生效
         * @param a usage:三维矩阵
         * @param v usage:缩放矩阵的三维向量
         * @param outer usage:接收结果三维矩阵对象 default:null
         * @returns 缩放后的三维矩阵
         */
        static scale(a: Matrix3x3, v: mw.Vector, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 在给定矩阵变换基础上加入新旋转变换
         * @effect 调用端生效
         * @param a usage:需要变换的矩阵
         * @param rad usage:旋转弧度 <br> range: 无限制  type:浮点数
         * @param outer usage:接收结果三维矩阵对象 default:null
         * @returns 旋转后的三维矩阵
         */
        static rotate(a: Matrix3x3, rad: number, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 取四阶矩阵的前三阶
         * @effect 调用端生效
         * @param a usage:源四阶矩阵
         * @param outer usage:接收结果三维矩阵对象 default:null
         * @returns 提取后的三维矩阵
         */
        static fromMat4(a: mw.Matrix4x4, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 根据视口前方向和上方向计算矩阵
         * @effect 调用端生效
         * @param view usage:视口向量
         * @param up usage:视口的上向量 default:null
         * @param outer usage:接收结果三维矩阵对象 default:null
         * @param epsilon usage:最小误差数 default:MathDefine.EPSILON <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 计算后的三维矩阵
         */
        static fromViewUp(view: mw.Vector, up?: mw.Vector, outer?: Matrix3x3, epsilon?: number): Matrix3x3;
        /**
         * @description 计算位移矩阵
         * @effect 调用端生效
         * @param v usage:位移的二维向量
         * @param outer usage:接收结果三维矩阵对象 default:null
         * @returns 含位移信息的三维矩阵
         */
        static fromTranslation(v: mw.Vector2, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 计算缩放矩阵
         * @effect 调用端生效
         * @param v usage:缩放信息的二维向量
         * @param outer usage:接收结果三维矩阵对象 default:null
         * @returns 含缩放信息的三维矩阵
         */
        static fromScaling(v: mw.Vector2, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 计算旋转矩阵
         * @effect 调用端生效
         * @param rad usage:旋转弧度 <br> range: 无限制  type:浮点数
         * @param outer usage:接收结果三维矩阵对象 default:null
         * @returns 含旋转信息的三维矩阵
         */
        static fromRotation(rad: number, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 计算指定四阶矩阵的逆转置三维矩阵
         * @effect 调用端生效
         * @param a usage:四阶矩阵
         * @param outer usage:接收结果三维矩阵对象 default:null
         * @returns 逆转置后的三维矩阵
         */
        static inverseTransposeMat4(a: mw.Matrix4x4, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 逐元素矩阵加法
         * @effect 调用端生效
         * @param a usage:矩阵 a
         * @param b usage:矩阵 b
         * @param outer usage:接收结果的矩阵 default:null
         * @returns 计算后的矩阵
         */
        static add(a: Matrix3x3, b: Matrix3x3, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 逐元素矩阵减法
         * @effect 调用端生效
         * @param a usage:矩阵 a
         * @param b usage:矩阵 b
         * @param outer usage:接收结果的矩阵 default:null
         * @returns 计算后的矩阵
         */
        static subtract(a: Matrix3x3, b: Matrix3x3, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 矩阵乘法
         * @effect 调用端生效
         * @param a usage:矩阵 a
         * @param b usage:矩阵 b
         * @param outer usage:接收结果的矩阵 default:null
         * @returns 计算后的矩阵
        */
        static multiply(a: Matrix3x3, b: Matrix3x3, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 取四阶矩阵的前三阶，与三维矩阵相乘
         * @effect 调用端生效
         * @param a usage:矩阵 a
         * @param b usage:矩阵 b
         * @param outer usage:接收结果的矩阵 default:null
         * @returns 计算后的矩阵
         */
        static multiply(a: Matrix3x3, b: mw.Matrix4x4, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 矩阵标量乘法
         * @effect 调用端生效
         * @param a usage:矩阵 a
         * @param b usage:数字b <br> range: 无限制  type:浮点数
         * @param outer usage:接收结果的矩阵 default:null
         * @returns 计算后的矩阵
         */
        static multiply(a: Matrix3x3, b: number, outer?: Matrix3x3): Matrix3x3;
        /**
         * @description 矩阵等价判断
         * @effect 调用端生效
         * @param a usage:矩阵 a
         * @param b usage:矩阵 b
         * @returns 返回比对结果
         */
        static strictEquals(a: Matrix3x3, b: Matrix3x3): boolean;
        /**
         * @description 排除浮点数误差的矩阵近似等价判断
         * @effect 调用端生效
         * @param a usage:矩阵 a
         * @param b usage:矩阵 b
         * @param epsilon usage:误差值 <br> default:1.e-7 <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 返回比对结果
         */
        static equals(a: Matrix3x3, b: Matrix3x3, epsilon?: number): boolean;
        /**
         * @description 矩阵第 0 列第 0 行的元素。
         */
        m00: number;
        /**
         * @description 矩阵第 0 列第 1 行的元素。
         */
        m01: number;
        /**
         * @description 矩阵第 0 列第 2 行的元素。
         */
        m02: number;
        /**
         * @description 矩阵第 1 列第 0 行的元素。
         */
        m10: number;
        /**
         * @description 矩阵第 1 列第 1 行的元素。
         */
        m11: number;
        /**
         * @description 矩阵第 1 列第 2 行的元素。
         */
        m12: number;
        /**
         * @description 矩阵第 2 列第 0 行的元素。
         */
        m20: number;
        /**
         * @description 矩阵第 2 列第 1 行的元素。
         */
        m21: number;
        /**
         * @description 矩阵第 2 列第 2 行的元素。
         */
        m22: number;
        /**
         * @description 用给定的 Matrix3x3 构建一个新的 Matrix3x3
         * @param other usage:给定的 Matrix3x3 对象
         */
        constructor(other: Matrix3x3);
        /**
         * @description 用给定的元素构建一个新的 Matrix3x3
         * @param m00 usage:第 0 列第 0 行的元素 default:1 range:不做限制  type: 浮点数
         * @param m01 usage:第 0 列第 1 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m02 usage:第 0 列第 2 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m10 usage:第 1 列第 0 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m11 usage:第 1 列第 1 行的元素 default:1 range:不做限制  type: 浮点数
         * @param m12 usage:第 1 列第 2 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m20 usage:第 2 列第 0 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m21 usage:第 2 列第 1 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m22 usage:第 2 列第 2 行的元素 default:1 range:不做限制  type: 浮点数
         */
        constructor(m00?: number, m01?: number, m02?: number, m10?: number, m11?: number, m12?: number, m20?: number, m21?: number, m22?: number);
        /**
         * @description 克隆当前矩阵。
         * @effect 调用端生效
         * @returns 克隆的新矩阵
         */
        clone(): Matrix3x3;
        /**
         * @description 设置当前矩阵使其与指定矩阵相等。
         * @effect 调用端生效
         * @param other usage:指定矩阵
         * @returns this
         */
        set(other: Matrix3x3): Matrix3x3;
        /**
         * @description 设置当前矩阵指定元素值。
         * @effect 调用端生效
         * @param m00 usage:第 0 行第 0 列的元素 default:1 range:不做限制  type: 浮点数
         * @param m01 usage:第 0 行第 1 列的元素 default:0 range:不做限制  type: 浮点数
         * @param m02 usage:第 0 行第 2 列的元素 default:0 range:不做限制  type: 浮点数
         * @param m10 usage:第 1 行第 0 列的元素 default:0 range:不做限制  type: 浮点数
         * @param m11 usage:第 1 行第 1 列的元素 default:1 range:不做限制  type: 浮点数
         * @param m12 usage:第 1 行第 2 列的元素 default:0 range:不做限制  type: 浮点数
         * @param m20 usage:第 2 行第 0 列的元素 default:0 range:不做限制  type: 浮点数
         * @param m21 usage:第 2 行第 1 列的元素 default:0 range:不做限制  type: 浮点数
         * @param m22 usage:第 2 行第 2 列的元素 default:1 range:不做限制  type: 浮点数
         * @returns this
         */
        set(m00?: number, m01?: number, m02?: number, m10?: number, m11?: number, m12?: number, m20?: number, m21?: number, m22?: number): Matrix3x3;
        /**
         * @description 判断当前矩阵是否在误差范围内与指定矩阵相等。
         * @effect 调用端生效
         * @param other usage:比对的矩阵
         * @param epsilon usage:误差值 <br> default:1.e-7 <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 比对的结果
         */
        equals(other: Matrix3x3, epsilon?: number): boolean;
        /**
         * @description 判断当前矩阵是否与指定矩阵相等。
         * @effect 调用端生效
         * @param other usage:比对的矩阵
         * @returns 比对的结果
         */
        strictEquals(other: Matrix3x3): boolean;
        /**
         * @description 返回当前矩阵的字符串表示。
         * @effect 调用端生效
         * @returns 返回矩阵的字符串信息
         */
        toString(): string;
        /**
         * @description 将当前矩阵设为单位矩阵。
         * @effect 调用端生效
         */
        identity(): void;
        /**
         * @description 将当前矩阵计算为其转置矩阵。
         * @effect 调用端生效
         */
        transpose(): void;
        /**
         * @description 将当前矩阵计算为其逆矩阵。注意，在矩阵不可逆时，会返回一个全为 0 的矩阵。
         * @effect 调用端生效
         */
        invert(): void;
        /**
         * @description 计算当前矩阵的行列式。
         * @effect 调用端生效
         * @returns 当前矩阵的行列式。
         */
        determinant(): number;
        /**
         * @description 矩阵逐元素相加。
         * @effect 调用端生效
         * @param mat usage:矩阵
         * @returns this
         */
        add(mat: Matrix3x3): Matrix3x3;
        /**
         * @description 当前矩阵逐元素减去参数矩阵
         * @effect 调用端生效
         * @param mat usage:矩阵
         * @returns this
         */
        subtract(mat: Matrix3x3): Matrix3x3;
        /**
         * @description 矩阵乘法。将当前矩阵左乘指定矩阵的结果赋值给当前矩阵。
         * @effect 调用端生效
         * @param mat usage:矩阵
         * @returns this
         */
        multiply(mat: Matrix3x3): Matrix3x3;
        /**
         * @description 矩阵数乘。将当前矩阵与指定标量的数乘结果赋值给当前矩阵。
         * @effect 调用端生效
         * @param v usage:数 range:不做限制 type:浮点数
         * @returns this
         */
        multiply(v: number): Matrix3x3;
        /**
         * @description 将当前矩阵左乘缩放矩阵的结果赋值给当前矩阵，缩放矩阵由各个轴的缩放给出。
         * @effect 调用端生效
         * @param vec usage:对矩阵缩放的向量
         * @returns this
         */
        scale(vec: mw.Vector): Matrix3x3;
        /**
         * @description 将当前矩阵左乘旋转矩阵的结果赋值给当前矩阵，旋转矩阵由旋转轴和旋转角度给出。
         * @effect 调用端生效
         * @param rad usage:旋转的弧度 <br> range: 无限制  type:浮点数
         * @returns this
         */
        rotate(rad: number): Matrix3x3;
    }
}

declare namespace mw {
    /**
     * @author yuhao.chen
     * @groups 基础类型/变换/矩阵
     * @description 四维矩阵
     * @description ------------------
     * @precautions 列矩阵
     * @networkStatus usage:双端
     */
    class Matrix4x4 {
        /**
         * @description 获得一个默认矩阵
         */
        static get identity(): Matrix4x4;
        /**
         * @description 矩阵第 0 列第 0 行的元素。
         */
        m00: number;
        /**
         * @description 矩阵第 0 列第 1 行的元素。
         */
        m01: number;
        /**
         * @description 矩阵第 0 列第 2 行的元素。
         */
        m02: number;
        /**
         * @description 矩阵第 0 列第 3 行的元素。
         */
        m03: number;
        /**
         * @description 矩阵第 1 列第 0 行的元素。
         */
        m10: number;
        /**
         * @description 矩阵第 1 列第 1 行的元素。
         */
        m11: number;
        /**
         * @description 矩阵第 1 列第 2 行的元素。
         */
        m12: number;
        /**
         * @description 矩阵第 1 列第 3 行的元素。
         */
        m13: number;
        /**
         * @description 矩阵第 2 列第 0 行的元素。
         */
        m20: number;
        /**
         * @description 矩阵第 2 列第 1 行的元素。
         */
        m21: number;
        /**
         * @description 矩阵第 2 列第 2 行的元素。
         */
        m22: number;
        /**
         * @description 矩阵第 2 列第 3 行的元素。
         */
        m23: number;
        /**
         * @description 矩阵第 3 列第 0 行的元素。
         */
        m30: number;
        /**
         * @description 矩阵第 3 列第 1 行的元素。
         */
        m31: number;
        /**
         * @description 矩阵第 3 列第 2 行的元素。
         */
        m32: number;
        /**
         * @description 矩阵第 3 列第 3 行的元素。
         */
        m33: number;
        /**
         * @description 获得指定矩阵的拷贝
         * @effect 调用端生效
         * @param a usage:被克隆的四维矩阵
         * @returns 返回克隆的新矩阵
         */
        static clone(a: Matrix4x4): Matrix4x4;
        /**
         * @description 向量与四维矩阵乘法，默认向量第三位为 0，第四位为 1。
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Vector2 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param m usage:被乘的四维矩阵
         * @param a usage:乘以矩阵的二维向量
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 返回变换后的新二维向量
         */
        static transformVector2(m: Matrix4x4, a: mw.Vector2, outer?: mw.Vector2): mw.Vector2;
        /**
         * @description 向量与四维矩阵乘法，默认向量第四位为 0。
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Vector 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param m usage:被乘的四维矩阵
         * @param a usage:乘以矩阵的三维向量
         * @param outer usage:接收结果的 Vector 对象 default:null
         * @returns 转化后得到的向量
         */
        static transformVector(m: Matrix4x4, a: mw.Vector, outer?: mw.Vector): mw.Vector;
        /**
         * @description 向量仿射变换
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Vector 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param m usage:四维矩阵
         * @param a usage:三维向量
         * @param outer usage:接收结果的 Vector 对象 default:null
         * @returns 仿射变换后得到的向量
         */
        static transformAffine(m: Matrix4x4, a: mw.Vector, outer?: mw.Vector): mw.Vector;
        /**
         * @description 四维向量与四维矩阵乘法
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Vector4 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param m usage:被乘的四维矩阵
         * @param a usage:乘以矩阵的四维向量
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 转换后得到的四维向量
         */
        static transformVector4(m: Matrix4x4, a: mw.Vector4, outer?: mw.Vector4): mw.Vector4;
        /**
         * @description 四维向量仿射变换
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Vector4 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param m usage:四维矩阵
         * @param a usage:四维向量
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 仿射变换后得到的四维向量
         */
        static transformAffine4(m: Matrix4x4, a: mw.Vector4, outer?: mw.Vector4): mw.Vector4;
        /**
         * @description 转置矩阵
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Matrix4x4 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param a usage:被转置的原矩阵
         * @param outer usage:接收结果的 Matrix4x4 对象 default:null
         * @returns 转置矩阵
         */
        static transpose(a: Matrix4x4, outer?: Matrix4x4): Matrix4x4;
        /**
         * @description 矩阵求逆，注意，在矩阵不可逆时，会返回一个全为 0 的矩阵。
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Matrix4x4 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param a usage:原矩阵
         * @param outer usage:接收结果的 Matrix4x4 对象 default:null
         * @returns 求逆后的矩阵
         */
        static invert(a: Matrix4x4, outer?: Matrix4x4): Matrix4x4;
        /**
        * @description 用给定的 other 构建一个新的 Matrix4x4
        * @param other usage:给定的 Matrix4x4 对象
        */
        constructor(other: Matrix4x4);
        /**
         * @description 用给定的元素构建一个新的 Matrix4x4
         * @param m00 usage:第 0 列第 0 行的元素 default:1 range:不做限制  type: 浮点数
         * @param m01 usage:第 0 列第 1 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m02 usage:第 0 列第 2 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m03 usage:第 0 列第 3 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m10 usage:第 1 列第 0 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m11 usage:第 1 列第 1 行的元素 default:1 range:不做限制  type: 浮点数
         * @param m12 usage:第 1 列第 2 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m13 usage:第 1 列第 3 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m20 usage:第 2 列第 0 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m21 usage:第 2 列第 1 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m22 usage:第 2 列第 2 行的元素 default:1 range:不做限制  type: 浮点数
         * @param m23 usage:第 2 列第 3 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m30 usage:第 3 列第 0 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m31 usage:第 3 列第 1 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m32 usage:第 3 列第 2 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m33 usage:第 3 列第 3 行的元素 default:1 range:不做限制  type: 浮点数
         */
        constructor(m00?: number, m01?: number, m02?: number, m03?: number, m10?: number, m11?: number, m12?: number, m13?: number, m20?: number, m21?: number, m22?: number, m23?: number, m30?: number, m31?: number, m32?: number, m33?: number);
        /**
        * @description 克隆当前矩阵。
        * @effect 调用端生效
        * @returns 新的 Matrix4x4 对象
        */
        clone(): Matrix4x4;
        /**
         * @description 设置当前矩阵使其与指定矩阵相等。
         * @effect 调用端生效
         * @param other usage:矩阵数据
         * @returns this
         */
        set(other: Matrix4x4): Matrix4x4;
        /**
         * @description 设置当前矩阵指定元素值。
         * @effect 调用端生效
         * @param m00 usage:第 0 列第 0 行的元素 default:1 range:不做限制  type: 浮点数
         * @param m01 usage:第 0 列第 1 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m02 usage:第 0 列第 2 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m03 usage:第 0 列第 3 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m10 usage:第 1 列第 0 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m11 usage:第 1 列第 1 行的元素 default:1 range:不做限制  type: 浮点数
         * @param m12 usage:第 1 列第 2 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m13 usage:第 1 列第 3 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m20 usage:第 2 列第 0 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m21 usage:第 2 列第 1 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m22 usage:第 2 列第 2 行的元素 default:1 range:不做限制  type: 浮点数
         * @param m23 usage:第 2 列第 3 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m30 usage:第 3 列第 0 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m31 usage:第 3 列第 1 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m32 usage:第 3 列第 2 行的元素 default:0 range:不做限制  type: 浮点数
         * @param m33 usage:第 3 列第 3 行的元素 default:1 range:不做限制  type: 浮点数
         * @returns this
         */
        set(m00?: number, m01?: number, m02?: number, m03?: number, m10?: number, m11?: number, m12?: number, m13?: number, m20?: number, m21?: number, m22?: number, m23?: number, m30?: number, m31?: number, m32?: number, m33?: number): Matrix4x4;
        /**
         * @description 判断当前矩阵是否在误差范围内与指定矩阵相等。
         * @effect 调用端生效
         * @param other usage:比对的矩阵
         * @param epsilon usage:误差值  default:MathUtil.EPSILON   <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 返回矩阵比对的结果
         */
        equals(other: Matrix4x4, epsilon?: number): boolean;
        /**
         * @description 判断当前矩阵是否与指定矩阵相等。
         * @effect 调用端生效
         * @param other usage:比对的矩阵
         * @returns 返回矩阵比对的结果
         */
        strictEquals(other: Matrix4x4): boolean;
        /**
         * @description 返回当前矩阵的字符串表示。
         * @effect 调用端生效
         * @returns 当前矩阵的字符串表示。
         */
        toString(): string;
        /**
         * @description 将当前矩阵设为单位矩阵。
         * @effect 调用端生效
         */
        identity(): void;
        /**
         * @description 将当前矩阵设为 0矩阵。
         * @effect 调用端生效
         */
        zero(): void;
        /**
         * @description 将当前矩阵变为转置矩阵。
         * @effect 调用端生效
         */
        transpose(): void;
        /**
         * @description 将当前矩阵变为逆矩阵。注意，在矩阵不可逆时，会返回一个全为 0 的矩阵。
         * @effect 调用端生效
         */
        invert(): void;
        /**
         * @description 计算当前矩阵的行列式。
         * @effect 调用端生效
         * @returns 当前矩阵的行列式。
         */
        determinant(): number;
        /**
         * @description 矩阵加法。将当前矩阵与指定矩阵的相加，结果返回给当前矩阵。
         * @effect 调用端生效
         * @param mat usage:相加的矩阵
         * @returns this
         */
        add(mat: Matrix4x4): Matrix4x4;
        /**
         * @description 计算矩阵减法。将当前矩阵减去指定矩阵的结果赋值给当前矩阵。
         * @effect 调用端生效
         * @param mat usage:相减的矩阵
         * @returns this
         */
        subtract(mat: Matrix4x4): Matrix4x4;
        /**
         * @description 矩阵乘法。将当前矩阵左乘指定矩阵的结果赋值给当前矩阵。
         * @effect 调用端生效
         * @param mat usage:相乘的矩阵
         * @returns this
         */
        multiply(mat: Matrix4x4): Matrix4x4;
        /**
        * @description 矩阵数乘。将当前矩阵与指定标量的数乘结果赋值给当前矩阵。
        * @effect 调用端生效
        * @param scalar usage:对矩阵整体缩放的数 range:不做限制 type:浮点数
        * @returns this
        */
        multiply(scalar: number): Matrix4x4;
        /**
         * @description 将当前矩阵左乘位移矩阵的结果赋值给当前矩阵，位移矩阵由各个轴的位移给出。
         * @effect 调用端生效
         * @param vec usage:转换的向量
         * @returns this
         */
        translate(vec: mw.Vector): Matrix4x4;
        /**
         * @description 将当前矩阵左乘缩放矩阵的结果赋值给当前矩阵，缩放矩阵由各个轴的缩放给出。
         * @effect 调用端生效
         * @param vec usage:缩放矩阵的向量
         * @returns this
         */
        scale(vec: mw.Vector): Matrix4x4;
        /**
         * @description 将当前矩阵左乘旋转矩阵的结果赋值给当前矩阵，旋转矩阵由旋转轴和旋转角度给出。
         * @effect 调用端生效
         * @param axis usage:绕的旋转轴
         * @param rad usage:旋转的弧度 <br> range: 无限制  type:浮点数
         * @param epsilon usage:最小误差数 default:MathDefine.EPSILON <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns this
         */
        rotate(axis: mw.Vector, rad: number, epsilon?: number): Matrix4x4;
        /**
         * @description 从当前矩阵中计算出位移变换的部分，并以各个轴上位移的形式赋值给出口向量。
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Vector 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param outer usage:接收位移数据的 Vector 对象 default:null
         * @returns 位移数据
         */
        getTranslation(outer?: mw.Vector): mw.Vector;
        /**
         * @description 从当前矩阵中计算出缩放变换的部分，并以各个轴上缩放的形式赋值给出口向量。
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Vector 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param outer usage:接收缩放数据的 Vector 对象 default:null
         * @returns 缩放数据
         */
        getScale(outer?: mw.Vector): mw.Vector;
        /**
         * @description 从当前矩阵中计算出旋转变换的部分，并以四元数的形式赋值给出口四元数。
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Quaternion 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param outer usage:接收旋转数据的 Quaternion 对象, default:null
         * @returns 记录旋转数据的Quaternion 对象
         */
        getRotation(outer?: mw.Quaternion): mw.Quaternion;
        /**
         * @description 重置当前矩阵的值，使其表示指定的旋转、缩放、位移依次组合的变换。
         * @effect 调用端生效
         * @param q usage:旋转数据的四元数
         * @param v usage:位移数据的向量
         * @param s usage:缩放数据的向量
         * @returns this
         */
        fromRTS(q: mw.Quaternion, v: mw.Vector, s: mw.Vector): Matrix4x4;
        /**
         * @description 重置当前矩阵的值，使其表示指定四元数表示的旋转变换。
         * @effect 调用端生效
         * @param q usage:旋转数据的四元数
         * @returns this
         */
        fromQuaternion(q: mw.Quaternion): Matrix4x4;
    }
}

declare namespace mw {
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
    class Quaternion {
        /**
         * @description 获取一个半弧度系数
         */
        private static halfToRad;
        /**
         * @description 获取一个单位四元数
         * @precautions Quaternion(0,0,0,1)。
         */
        static get identity(): Quaternion;
        /**
         * @description 读取旋转角数据创建或者写入一个四元数
         * @effect 调用端生效
         * @param v usage:读取的字符串数据
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static fromRotation(v: mw.Rotation, outer?: Quaternion): Quaternion;
        /**
         * @description 根据坐标轴朝向计算四元数，默认三向量都已归一化且相互垂直
         * @effect 调用端生效
         * @param xAxis usage:x轴的向量值
         * @param yAxis usage:y轴的向量值
         * @param zAxis usage:z轴的向量值
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static fromAxes(xAxis: mw.Vector, yAxis: mw.Vector, zAxis: mw.Vector, outer?: Quaternion): Quaternion;
        /**
         * @description 根据视口的前方向和上方向计算四元数
         * @effect 调用端生效
         * @param view usage:视口的前向量
         * @param up usage:上方向量 default:null
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static fromViewUp(view: mw.Vector, up?: mw.Vector, outer?: Quaternion): Quaternion;
        /**
         * @description 根据旋转轴和旋转弧度计算四元数
         * @effect 调用端生效
         * @param axis usage:旋转轴
         * @param rad usage:弧度值 <br>range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static fromAxisAngle(axis: mw.Vector, rad: number, outer?: Quaternion): Quaternion;
        /**
         * @description 根据三维矩阵信息计算四元数，默认输入矩阵不含有缩放信息
         * @effect 调用端生效
         * @param m usage:三维矩阵
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static fromMatrix3x3(m: mw.Matrix3x3, outer?: Quaternion): Quaternion;
        /**
         * @description 根据四元数旋转信息计算矩阵
         * @effect 调用端生效
         * @param q usage:四元数信息
         * @param outer usage:被写入的 Matrix3x3 对象 default:null
         * @returns 返回一个三维矩阵
         */
        static toMatrix3x3(q: Quaternion, outer?: mw.Matrix3x3): mw.Matrix3x3;
        /**
         * @description 根据 2D 角度（0, 0, z）计算四元数
         * @effect 调用端生效
         * @param z usage:绕 z 旋转的角度值。 <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static fromAngleZ(z: number, outer?: Quaternion): Quaternion;
        /**
         * @description 设置四元数为两向量a和b间的最短路径旋转，默认两向量都已归一化
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static rotationTo(a: mw.Vector, b: mw.Vector, outer?: Quaternion): Quaternion;
        /**
         * @description 获取四元数的旋转轴
         * @effect 调用端生效
         * @param q usage:目标四元数
         * @param outer usage:被写入的 Vector 对象 default:null
         * @returns 返回一个三维向量
         */
        static getAxis(q: Quaternion, outer?: mw.Vector): mw.Vector;
        /**
         * @description 获取四元数的旋转弧度
         * @effect 调用端生效
         * @param q usage:目标四元数
         * @returns 返回一个弧度值
         */
        static getAxisAngle(q: Quaternion): number;
        /**
         * @description 四元数乘以一个三维向量(通常用于向量通过四元数旋转)
         * @effect 调用端生效
         * @param a usage:目标向量
         * @param q usage:四元数
         * @param outer usage:被写入的 Vector 对象 default:null
         * @returns 返回一个旋转后的三维向量
         */
        static multiplyVector(a: mw.Vector, q: Quaternion, outer?: mw.Vector): mw.Vector;
        /**
         * @description 四元数乘法
         * @effect 调用端生效
         * @param a usage:四元数a
         * @param b usage:四元数b
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static multiply(a: Quaternion, b: Quaternion, outer?: Quaternion): Quaternion;
        /**
         * @description 绕 X 轴旋转指定四元数
         * @effect 调用端生效
         * @param a usage:四元数
         * @param rad usage:弧度值 <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static rotateX(a: Quaternion, rad: number, outer?: Quaternion): Quaternion;
        /**
         * @description 绕 Y 轴旋转指定四元数
         * @effect 调用端生效
         * @param a usage:四元数
         * @param rad usage:弧度值 <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static rotateY(a: Quaternion, rad: number, outer?: Quaternion): Quaternion;
        /**
         * @description 绕 Z 轴旋转指定四元数
         * @effect 调用端生效
         * @param a usage:四元数
         * @param rad usage:弧度值  <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static rotateZ(a: Quaternion, rad: number, outer?: Quaternion): Quaternion;
        /**
         * @description 绕世界空间下指定轴旋转四元数
         * @effect 调用端生效
         * @param rot usage:被旋转的四元数
         * @param axis usage:代表旋转轴的三维向量
         * @param rad usage:弧度值 <br>range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static rotateAround(rot: Quaternion, axis: mw.Vector, rad: number, outer?: Quaternion): Quaternion;
        /**
         * @description 绕本地空间下指定轴旋转四元数
         * @effect 调用端生效
         * @param rot usage:需要变换的四元数
         * @param axis usage:代表旋转轴的三维向量
         * @param rad usage:弧度值 <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static rotateAroundLocal(rot: Quaternion, axis: mw.Vector, rad: number, outer?: Quaternion): Quaternion;
        /**
         * @description 根据 xyz 分量计算 w 分量，默认已归一化
         * @effect 调用端生效
         * @param a usage:目标四元数
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static calculateW(a: Quaternion, outer?: Quaternion): Quaternion;
        /**
         * @description 四元数点积（数量积）
         * @effect 调用端生效
         * @param a usage:四元数a
         * @param b usage:四元数b
         * @returns 返回一个结果数
         */
        static dot(a: Quaternion, b: Quaternion): number;
        /**
         * @description 逐元素线性插值： A + t * (B - A)
         * @effect 调用端生效
         * @param a usage:四元数 a
         * @param b usage:四元数 b
         * @param t usage:插值 <br> range: [0, 1]  type:浮点数
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static lerp(a: Quaternion, b: Quaternion, t: number, outer?: Quaternion): Quaternion;
        /**
         * @description 四元数球面插值
         * @effect 调用端生效
         * @param a usage:四元数a
         * @param b usage:四元数b
         * @param t usage:插值 <br> range: [0, 1]  type:浮点数
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static slerp(a: Quaternion, b: Quaternion, t: number, outer?: Quaternion): Quaternion;
        /**
         * @description 带两个控制点的四元数球面插值
         * @effect 调用端生效
         * @param a usage:四元数a
         * @param b usage:四元数b
         * @param c usage:四元数c
         * @param d usage:四元数d
         * @param t usage:插值 <br> range: [0, 1]  type:浮点数
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static sqlerp(a: Quaternion, b: Quaternion, c: Quaternion, d: Quaternion, t: number, outer?: Quaternion): Quaternion;
        /**
         * @description 四元数求逆
         * @effect 调用端生效
         * @param a usage:四元数a
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static invert(a: Quaternion, outer?: Quaternion): Quaternion;
        /**
         * @description 求共轭四元数，对单位四元数与求逆等价，但更高效
         * @effect 调用端生效
         * @param a usage:四元数a
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static conjugate(a: Quaternion, outer?: Quaternion): Quaternion;
        /**
         * @description 归一化四元数
         * @effect 调用端生效
         * @param a usage:四元数a
         * @param outer usage:接收结果的 Quaternion 对象 default:null
         * @returns 返回一个四元数
         */
        static normalize(a: Quaternion, outer?: Quaternion): Quaternion;
        /**
         * @description 四元数等价判断
         * @effect 调用端生效
         * @param a usage:四元数a
         * @param b usage:四元数b
         * @returns 返回是否相等的结果
         */
        static strictEquals(a: Quaternion, b: Quaternion): boolean;
        /**
         * @description 排除浮点数误差的四元数近似等价判断
         * @effect 调用端生效
         * @param a usage:四元数a
         * @param b usage:四元数b
         * @param epsilon usage:最小误差数  <br> default:1.e-7 <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 返回是否相等的结果
         */
        static equals(a: Quaternion, b: Quaternion, epsilon?: number): boolean;
        /**
         * @description x 分量。
         */
        x: number;
        /**
         * @description y 分量。
         */
        y: number;
        /**
         * @description z 分量。
         */
        z: number;
        /**
         * @description w 分量。
         */
        w: number;
        constructor();
        /**
         * @param v usage:四元素
         */
        constructor(v: Quaternion);
        /**
         * @param x usage:x 分量 default:0  range: [-1, 1]  type: 浮点数
         * @param y usage:y 分量 default:0  range: [-1, 1]  type: 浮点数
         * @param z usage:z 分量 default:0  range: [-1, 1]  type: 浮点数
         * @param w usage:w 分量 default:1  range: [-1, 1] type: 浮点数
         */
        constructor(x: number, y: number, z: number, w: number);
        /**
         * @description 克隆当前四元数。
         * @effect 调用端生效
         * @returns 四元数
         */
        clone(): Quaternion;
        /**
         * @description 设置当前四元数使其与指定四元数相等。
         * @effect 调用端生效
         * @param other usage:四元数数据
         * @returns `this`
         */
        set(other: Quaternion): Quaternion;
        /**
         * @description 设置当前四元数指定元素值。
         * @effect 调用端生效
         * @param x usage:四元数的 x 分量 default:0    range: [-1, 1]  type: 浮点数
         * @param y usage:四元数的 y 分量 default:0    range: [-1, 1]  type: 浮点数
         * @param z usage:四元数的 z 分量 default:0    range: [-1, 1]  type: 浮点数
         * @param w usage:四元数的 w 分量 default:0    range: [-1, 1]  type: 浮点数
         * @returns 当前四元数
         */
        set(x?: number, y?: number, z?: number, w?: number): Quaternion;
        /**
         * @description 设置欧拉角
         * @effect 调用端生效
         * @param euler usage:传入的欧拉角
         */
        setEulerAngles(euler: mw.Vector): void;
        /**
         * @description 返回当前四元数转化的欧拉角（x-y-z）。
         * @effect 调用端生效
         * @returns 欧拉角
         */
        getEulerAngles(): mw.Vector;
        /**
         * @description 判断当前四元数是否在误差范围内与指定向量相等。
         * @effect 调用端生效
         * @param other usage:比对的目标四元数
         * @param epsilon usage:容差值  default:MathDefine.EPSILON <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 比对后的结果
         */
        equals(other: Quaternion, epsilon?: number): boolean;
        /**
         * @description 判断当前四元数是否与指定四元数相等。
         * @effect 调用端生效
         * @param other usage:比对的目标四元数
         * @returns 比对后的结果
         */
        strictEquals(other: Quaternion): boolean;
        /**
         * @description 返回一个当前四元数归一后的新四元数
         */
        get normalized(): Quaternion;
        /**
         * @description 求四元数长度
         */
        get length(): number;
        /**
         * @description 求四元数长度平方
         */
        get sqrLength(): number;
        /**
         * @description 返回当前四元数的逆
         */
        get inverted(): Quaternion;
        /**
         * @description 返回当前四元数的共轭四元数，对单位四元数与求逆等价，但更高效
         */
        get conjugated(): Quaternion;
        /**
         * @description 将当前四元数归一化
         * @effect 调用端生效
         */
        normalize(): void;
        /**
         * @description 返回定义此四元数的坐标系 X 轴向量
         * @effect 调用端生效
         * @param outer usage:接收结果的 Vector 对象 default:null
         * @returns 此四元数的坐标系 X 轴向量
         */
        getAxisX(outer?: mw.Vector): mw.Vector;
        /**
         * @description 返回定义此四元数的坐标系 Y 轴向量
         * @effect 调用端生效
         * @param outer usage:接收结果的 Vector 对象 default:null
         * @returns 此四元数的坐标系 Y 轴向量
         */
        getAxisY(outer?: mw.Vector): mw.Vector;
        /**
         * @description 返回定义此四元数的坐标系 Z 轴向量
         * @effect 调用端生效
         * @param outer usage:接收结果的 Vector 对象 default:null
         * @returns 此四元数的坐标系 Z 轴向量
         */
        getAxisZ(outer?: mw.Vector): mw.Vector;
        /**
         * @description 根据四元数计算欧拉角
         * @effect 调用端生效
         * @param outerZ usage:将z值范围更改为[-180，-90]U[90，180] default:false
         * @param outer usage:接收结果的 Vector 对象 default:null
         * @returns 欧拉角。返回角度 x, y 在 [-180, 180] 区间内, z 默认在 [-90, 90] 区间内，旋转顺序为 YZX
         */
        getEuler(outerZ?: boolean, outer?: mw.Vector): mw.Vector;
        /**
         * @description 当前四元数读取一个旋转数据
         * @effect 调用端生效
         * @param v usage:读取的旋转数据
         */
        fromRotation(v: mw.Rotation): void;
        /**
         * @description 获取一个当前四元数的旋转数据
         * @effect 调用端生效
         * @returns 旋转数据
         */
        toRotation(): mw.Rotation;
        /**
         * @description 输出为字符串
         * @effect 调用端生效
         * @returns 四元数值字符串
         */
        toString(): string;
    }
}

declare namespace mw {
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
    class Rotation {
        /**
         * @description 获取一个空旋转的角度 (0, 0, 0)
         * @returns Rotation (0, 0, 0)
         */
        static get zero(): Rotation;
        /**
         * @description 转换Vector为Rotation
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Rotation 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param v usage:Vector
         * @param outer usage:传入的Rotation对象 default:null
         * @returns Rotation
        */
        static fromVector(v: mw.Vector, outer?: Rotation): Rotation;
        /**
         * @description 转换Quaternion为Rotation
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Rotation 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param v usage:Quaternion
         * @param outer usage:传入的Rotation对象 default:null
         * @returns Rotation
        */
        static fromQuaternion(v: mw.Quaternion, outer?: Rotation): Rotation;
        /**
         * @description 转换字符串数据为Rotation
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Rotation 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param v usage:字符串  range:"0.00000,0.00000,0.00000"
         * @param outer usage:传入的Rotation对象 default:null
         * @returns Rotation
        */
        static fromString(v: string, outer?: Rotation): Rotation;
        /**
         * @description 旋转的 x 分量
         */
        x: number;
        /**
         * @description 旋转的 y 分量
         */
        y: number;
        /**
         * @description 旋转的 z 分量
         */
        z: number;
        /**
         * @description 构建一个新的 Rotation。值为(0, 0, 0)
         */
        constructor();
        /**
         * @description 用给定的 vector 中的x, y, z值设定给 x, y, z 。
         * @param vector usage:给定的 vector
         */
        constructor(vector: mw.Vector);
        /**
         * @description 构造一个旋转，将旋转 Vector.FORWARD 以指向给定的前向矢量的方向，向上矢量作为参考。
         * @precautions 如果向前和向上指向完全相同 (或相反)的方向，或者其中之一的长度为 0，则返回 (0, 0, 0)。
         * @param forward usage:前向矢量
         * @param up usage:向上矢量
         */
        constructor(forward: mw.Vector, up: mw.Vector);
        /**
         * @description 复制rotation，并返回一个新的。
         * @param rotation usage:复制的 Rotation 对象
         */
        constructor(rotation: Rotation);
        /**
         * @description 通过四元数构造
         * @param v usage:四元数
         */
        constructor(v: mw.Quaternion);
        /**
         * @description 通过三个分量构造
         * @param x usage:旋转的 x 分量  range: 不做限制  type: 浮点数
         * @param y usage:旋转的 y 分量  range: 不做限制  type: 浮点数
         * @param z usage:旋转的 z 分量  range: 不做限制  type: 浮点数
         */
        constructor(x: number, y: number, z: number);
        /**
         * @description 克隆当前旋转量
         * @effect 调用端生效
         * @returns 返回一个新的旋转量
         */
        clone(): Rotation;
        /**
         * @description 复制目标旋转
         * @effect 调用端生效
         * @precautions outer 不能为 null/undefined
         * @param a usage:目标旋转
         * @param outer usage:接收结果的旋转
         * @returns 拷贝得到的新旋转对象
         */
        static copy(a: Rotation, outer: Rotation): Rotation;
        /**
         * @description 当前Rotation读取一个字符串数据
         * @effect 调用端生效
         * @param str usage:字符串数据 range:"P=-431602080.000000 Y=-431602080.000000 R=-431602080.000000"
         */
        fromString(str: string): void;
        /**
         * @description 当前Rotation输出为字符串
         * @effect 调用端生效
         * @returns 输出的字符串数据
         */
        toString(): string;
        /**
         * @description 当前Rotation读取一个四元数
         * @effect 调用端生效
         * @param v usage:读取的四元数数据
         */
        fromQuaternion(v: mw.Quaternion): void;
        /**
         * @description 当前Rotation输出为四元数
         * @effect 调用端生效
         * @returns 输出的四元数
         */
        toQuaternion(): mw.Quaternion;
        /**
         * @description 当前Rotation读取一个Vector
         * @effect 调用端生效
         * @param v usage:读取的向量数据
         */
        fromVector(v: mw.Vector): void;
        /**
         * @description 当前旋转量设置为新的旋转量
         * @effect 调用端生效
         * @param v usage:旋转量
         * @returns 旋转量
         */
        set(v: Rotation): Rotation;
        /**
         * @description 为当前旋转量设置每个分量
         * @effect 调用端生效
         * @param x usage:旋转的 x 分量  range:不做限制  type: 浮点数
         * @param y usage:旋转的 y 分量  range:不做限制  type: 浮点数
         * @param z usage:旋转的 z 分量  range:不做限制  type: 浮点数
         * @returns 旋转量
         */
        set(x: number, y: number, z: number): Rotation;
        /**
         * @description 当前角度旋转一个向量
         * @effect 调用端生效
         * @param v usage:被旋转的向量
         * @returns 旋转后的向量
         */
        rotateVector(v: mw.Vector): mw.Vector;
        /**
         * @description 当前旋转量加上一个旋转量
         * @effect 调用端生效
         * @param a usage:旋转量
         * @returns this
         */
        add(a: Rotation): Rotation;
        /**
         * @description 当前旋转量减去一个旋转量
         * @effect 调用端生效
         * @param a usage:旋转量
         * @returns this
         */
        subtract(a: Rotation): Rotation;
        /**
         * @description 当前旋转量乘以一个旋转量 (相当于四元数叉乘)
         * @effect 调用端生效
         * @param v usage:旋转量
         * @returns this
         */
        multiply(v: Rotation): Rotation;
        /**
         * @description 判断当前角度是否与指定向量相等。
         * @effect 调用端生效
         * @param other usage:比对的旋转量
         * @returns 比对的结果
         */
        strictEquals(other: Rotation): boolean;
        /**
         * @description 旋转量a加上旋转量b
         * @effect 调用端生效
         * @precautions outer 不能为 null/undefined
         * @param a usage:旋转量a
         * @param b usage:旋转量b
         * @param outer usage:接收结果的旋转量,即旋转相加的结果 default:null
         * @returns 相加的结果
         */
        static add(a: Rotation, b: Rotation, outer?: Rotation): Rotation;
        /**
         * @description 当前旋转量减去一个旋转量
         * @effect 调用端生效
         * @precautions outer 不能为 null/undefined
         * @param a usage:旋转量a
         * @param b usage:旋转量b
         * @param outer usage:接收结果的旋转量变量 default:null
         * @returns 相减的结果
         */
        static subtract(a: Rotation, b: Rotation, outer?: Rotation): Rotation;
        /**
         * @description 当前旋转量乘以一个旋转量
         * @effect 调用端生效
         * @precautions outer 不能为 null/undefined
         * @param a usage:旋转量a
         * @param b usage:旋转量b
         * @param outer usage:接收结果的旋转量变量 default:null
         * @returns 相乘的结果
         */
        static multiply(a: Rotation, b: Rotation, outer?: Rotation): Rotation;
        /**
         * @description 判断当前角度是否在误差范围内与指定向量相等。
         * @effect 调用端生效
         * @param other usage:比对的旋转量
         * @param epsilon usage:误差值 <br> default:1.e-7 <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 比对的结果
         */
        equals(other: Rotation, epsilon?: number): boolean;
        /**
         * @description 判断当前真实角度是否在误差范围内与指定向量相等。
         * @effect 调用端生效
         * @param other usage:比对的旋转量
         * @param epsilon usage:误差值 <br> default:1.e-7 <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 比对的结果
         */
        equalsAuthentic(other: Rotation, epsilon?: number): boolean;
        /**
         * @description 返回一个新的反向旋转。
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Rotation 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param outer usage:被写入数据的旋转量 default:null
         * @returns 反方向的旋转
         */
        getInverse(outer?: Rotation): Rotation;
        /**
         * @description 获取此旋转后的方向向量
         * @effect 调用端生效
         * @precautions 如果 outer 不为空, 返回 outer,否则返回一个新的 Rotation 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param outer usage:被写入数据的向量, 传入的 outer 不能为null/undefined default:null
         * @returns 旋转的方向向量
         */
        getForce(outer?: mw.Vector): mw.Vector;
        /**
         * @description 对两个旋转量进行插值
         * @effect 调用端生效
         * @param a usage:旋转量 a
         * @param b usage:旋转量 b
         * @param alpha usage:插值  <br> range: [0, 1]  type:浮点数
         * @returns Rotation
         */
        static lerp(a: mw.Rotation, b: mw.Rotation, alpha: number): mw.Rotation;
    }
}

declare namespace mw {
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
    class Transform {
        /**
         * @description 获取一个单位 Transform
         * @description 位置：(0, 0, 0)，旋转：(0, 0, 0)，缩放：(1, 1, 1)
         */
        static get identity(): Transform;
        /**
         * @description 通过字符串创建一个 Transform
         * @description 字符串格式为：0.000000,0.000000,0.000000|0.000000,0.000000,0.000000|1.000000,1.000000,1.000000
         * @effect 调用端生效
         * @description 如果 outer 不为空, 返回 outer,否则返回一个新的 Transform 对象, 建议传入 outer 来减少 new 对象且 outer 不能为 null/undefined
         * @param str usage:读取的字符串数据  range:"0.000000,0.000000,0.000000|0.000000,0.000000,0.000000|1.000000,1.000000,1.000000"
         * @param outer usage:接受结果的Transform default:null
         * @returns 创建或读取自字符串的 Transform 对象
         */
        static fromString(str: string, outer?: Transform): Transform;
        /**
         * @description 获取位置信息
         */
        get position(): mw.Vector;
        /**
         * @description 设置位置信息
         */
        set position(v: mw.Vector);
        /**
         * @description 获取旋转信息
         */
        get rotation(): mw.Rotation;
        /**
         * @description 设置旋转信息
         */
        set rotation(v: mw.Rotation);
        /**
         * @description 获取缩放信息
         */
        get scale(): mw.Vector;
        /**
         * @description 设置缩放信息
         */
        set scale(v: mw.Vector);
        /**
         * @description 返回一个新的 Transform
         * @returns Transform( Location(0, 0, 0),Rotation(0, 0, 0), Scale(1, 1, 1) )
         */
        constructor();
        /**
         * @description 用给定的 Position 或 rotation 或 scale 值设定给 Transform
         * @param location usage:坐标信息
         * @param rotation usage:旋转信息
         * @param scale usage:缩放信息
         */
        constructor(location: mw.Vector, rotation: mw.Rotation, scale: mw.Vector);
        /**
         * @description 复制给定的 Transform
         * @param newTransform usage:Transform 对象
         */
        constructor(newTransform: Transform);
        /**
         * @description 克隆一个新的 Transform
         * @effect 调用端生效
         * @returns 新的数据相同的 Transform
         */
        clone(): Transform;
        /**
         * @description 读取字符串数据
         * @effect 调用端生效
         * @param str usage:读取的字符串数据  range:"0.000000,0.000000,0.000000|0.000000,0.000000,0.000000|1.000000,1.000000,1.000000"
         */
        fromString(str: string): void;
        /**
         * @description 输出为一个有格式的字符串
         * @effect 调用端生效
         * @returns 字符串
         */
        toString(): string;
        /**
         * @description 获取 Transform 的 向前 方向向量
         * @effect 调用端生效
         * @returns Transform 的向前方向向量
         */
        getForwardVector(): mw.Vector;
        /**
         * @description 获取 Transform 的 向右 方向向量
         * @effect 调用端生效
         * @returns Transform 的向右方向向量
         */
        getRightVector(): mw.Vector;
        /**
         * @description 获取 Transform 的 向上 方向向量
         * @effect 调用端生效
         * @returns Transform 的向上方向向量
         */
        getUpVector(): mw.Vector;
        /**
         * @description 世界坐标转化为本地坐标
         * @effect 调用端生效
         * @param location usage:世界坐标
         * @returns 本地坐标
         */
        inverseTransformPosition(location: mw.Vector): mw.Vector;
        /**
        * @description  世界方向转化为本地方向
        * @effect 调用端生效
        * @param location  usage:世界方向
        * @returns 本地方向
        */
        inverseTransformDirection(location: mw.Vector): mw.Vector;
        /**
         * @description  本地坐标转化为世界坐标
         * @effect 调用端生效
         * @param location  usage:本地坐标
         * @returns 世界坐标
         */
        transformPosition(location: mw.Vector): mw.Vector;
        /**
         * @description  本地方向转化为世界方向
         * @effect 调用端生效
         * @param location  usage:本地方向
         * @returns 世界方向
         */
        transformDirection(location: mw.Vector): mw.Vector;
        /**
         * @description 面向目标方向
         * @effect 调用端生效
         * @param target  usage:世界坐标
         */
        lookAt(target: mw.Vector): void;
        /**
         * @description 绕指定轴旋转
         * @effect 调用端生效
         * @param axis usage:旋转轴
         * @param angle usage:旋转的角度值 <br> range: 无限制 type:浮点数
         */
        rotate(axis: mw.Vector, angle: number): void;
    }
}

declare namespace mw {
    /**
     * @author xiangkun.sun
     * @groups 基础类型/变换/向量
     * @description 三维向量
     * @description ------------------
     * @description 由分量 (x,y,z) 组成的三维空间中的向量
     * @networkStatus usage:双端
     */
    class Vector {
        /**
         * @description Vector(1, 0, 0)
         */
        static get unitX(): Vector;
        /**
         * @description Vector(0, 1, 0)
         */
        static get unitY(): Vector;
        /**
         * @description Vector(0, 0, 1)
         */
        static get unitZ(): Vector;
        /**
         * @description Vector(0, 1, 0)
         */
        static get right(): Vector;
        /**
         * @description Vector(0, -1, 0)
         */
        static get left(): Vector;
        /**
         * @description Vector(0, 0, 1)
         */
        static get up(): Vector;
        /**
         * @description Vector(0, 0, -1)
         */
        static get down(): Vector;
        /**
         * @description Vector(1, 0, 0)
         */
        static get forward(): Vector;
        /**
         * @description Vector(-1, 0, 0)
         */
        static get back(): Vector;
        /**
         * @description Vector(0, 0, 0)
         */
        static get zero(): Vector;
        /**
         * @description Vector(1, 1, 1)
         */
        static get one(): Vector;
        /**
         * @description Vector(-1, -1, -1)
         */
        static get negOne(): Vector;
        /**
         * @description X轴坐标
         */
        x: number;
        /**
         * @description Y轴坐标
         */
        y: number;
        /**
         * @description Z轴坐标
         */
        z: number;
        /**
         * @description 通过一个字符串创建 Vector
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param str usage:待转化的 string  range:"0.000000,0.000000,0.000000"
         * @param outer usage:接收结果的向量对象 default:null
         * @returns 转化后的 Vector 对象
         */
        static fromString(str: string, outer?: Vector): Vector;
        /**
         * @description 两个向量相加
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的向量对象 default:null
         * @returns 相加的结果 Vector 对象
         */
        static add(a: Vector, b: Vector, outer?: Vector): Vector;
        /**
         * @description 向量 a 减去向量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的向量对象 default:null
         * @returns 相减的结果 Vector 对象
         */
        static subtract(a: Vector, b: Vector, outer?: Vector): Vector;
        /**
         * @description 向量 a 的每个分量乘以标量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:标量 b  range:不做限制  type: 浮点数
         * @param outer usage:接收结果的向量对象 default:null
         * @returns 相乘的结果 Vector 对象
         */
        static multiply(a: Vector, b: number, outer?: Vector): Vector;
        /**
         * @description 向量 a 乘以向量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的向量对象 default:null
         * @returns 相乘的结果 Vector 对象
         */
        static multiply(a: Vector, b: Vector, outer?: Vector): Vector;
        /**
         * @description 向量 a 的每个分量除以标量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的向量对象 default:null
         * @returns 相除的结果 Vector 对象
         */
        static divide(a: Vector, b: number, outer?: Vector): Vector;
        /**
         * @description 向量 a 除以向量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b  <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的向量对象 default:null
         * @returns 相除的结果 Vector 对象
         */
        static divide(a: Vector, b: Vector, outer?: Vector): Vector;
        /**
         * @description 克隆向量 a 得到新的 Vector 向量
         * @effect 调用端生效
         * @param a usage:向量 a
         * @returns 克隆得到的新 Vector 对象
         */
        static clone(a: Vector): Vector;
        /**
         * @description 获得指定向量的拷贝
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:目标向量
         * @param outer usage:接收结果的向量 default:null
         * @returns 克隆得到的新 Vector 对象
         */
        static copy(a: Vector, outer: Vector): Vector;
        /**
         * @description 判断两向量排除浮点数误差是否近似等价
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param epsilon usage:最小误差数 default:MathDefine.EPSILON <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 是否等价
        */
        static equals(a: Vector, b: Vector, epsilon?: number): boolean;
        /**
         * @description 向目标向量移动
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param current usage:当前向量
         * @param target usage:目标向量
         * @param maxDistanceDelta usage:最大移动分量  <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Vector 对象 default:null
         * @returns 移动后的 Vector 对象
        */
        static moveTowards(current: Vector, target: Vector, maxDistanceDelta: number, outer?: Vector): Vector;
        /**
         * @description 反射
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param inDirection usage:入射向量角度
         * @param inNormal usage:法线向量
         * @param outer usage:接收结果的向量 default:null
         * @returns 反射
        */
        static reflect(inDirection: Vector, inNormal: Vector, outer?: Vector): Vector;
        /**
         * @description 设置向量的值
         * @effect 调用端生效
         * @param outer usage:被设置的向量对象
         * @param x usage:x 分量   range:不做限制  type: 浮点数
         * @param y usage:y 分量   range:不做限制  type: 浮点数
         * @param z usage:z 分量   range:不做限制  type: 浮点数
         * @returns 被设置的 Vector 对象
         */
        static set(outer: Vector, x: number, y: number, z: number): Vector;
        /**
         * @description 向量 a 每个元素向上取整
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的向量 default:null
         * @returns 逐元素向上取整的 Vector 对象
         */
        static ceil(a: Vector, outer?: Vector): Vector;
        /**
         * @description 向量 a 每个元素向下取整
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的向量 default:null
         * @returns 逐元素向下取整的 Vector 对象
         */
        static floor(a: Vector, outer?: Vector): Vector;
        /**
         * @description 取两个向量对应x、y元素最小值
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的向量 default:null
         * @returns 逐元素取最小值后的 Vector 对象
         */
        static min(a: Vector, b: Vector, outer?: Vector): Vector;
        /**
         * @description 取两个向量对应x、y元素最小值最大值
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的向量 default:null
         * @returns 逐元素取最大值的 Vector 对象
         */
        static max(a: Vector, b: Vector, outer?: Vector): Vector;
        /**
         * @description 每个元素四舍五入取整
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的向量 default:null
         * @returns 逐元素四舍五入取整后的 Vector 对象
         */
        static round(a: Vector, outer?: Vector): Vector;
        /**
         * @description 两向量的欧氏距离
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 欧氏距离
         */
        static distance(a: Vector, b: Vector): number;
        /**
         * @description 两向量的欧氏距离平方
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 欧氏距离平方
         */
        static squaredDistance(a: Vector, b: Vector): number;
        /**
         * @description 向量长度
         * @effect 调用端生效
         * @param a usage:向量 a
         * @returns 向量长度
         */
        static magnitude(a: Vector): number;
        /**
         * @description 向量长度平方
         * @effect 调用端生效
         * @param a usage:向量 a
         * @returns 向量长度平方
         */
        static sqrMagnitude(a: Vector): number;
        /**
         * @description 向量 a 每个元素取负
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的向量 default:null
         * @returns 逐元素取负后的 Vector 对象
         */
        static negate(a: Vector, outer?: Vector): Vector;
        /**
         * @description 向量 a 每个元素取倒数，接近 0 时返回 Infinity
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的向量 default:null
         * @returns 逐元素取倒数后的 Vector 对象
         */
        static invert(a: Vector, outer?: Vector): Vector;
        /**
         * @description 向量 a 每个元素取倒数，接近 0 时返回 0
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的向量 default:null
         * @param epsilon usage:最小误差数  default:MathUtil.EPSILON   <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 逐元素取倒数后的 Vector 对象
         */
        static invertSafe(a: Vector, outer?: Vector, epsilon?: number): Vector;
        /**
         * @description 向量归一化
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的向量 default:null
         * @returns 归一化后的 Vector 对象
         */
        static normalize(a: Vector, outer?: Vector): Vector;
        /**
         * @description 点积
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 点积
         */
        static dot(a: Vector, b: Vector): number;
        /**
         * @description 叉积
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的向量 default:null
         * @returns 叉积 Vector 对象
         */
        static cross(a: Vector, b: Vector, outer?: Vector): Vector;
        /**
         * @description 向量 a 每个元素线性插值： a + t  * (b - a)
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param t usage:插值  <br> range: [0, 1]  type:浮点数
         * @param outer usage:接收结果的向量 default:null
         * @returns 线性插值得到的 Vector 对象
         */
        static lerp(a: Vector, b: Vector, t: number, outer?: Vector): Vector;
        /**
         * @description 绕 X 轴旋转指定弧度
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param v usage:旋转向量
         * @param o usage:旋转中心
         * @param a usage:旋转弧度  range: 不做限制  type: 浮点数
         * @param outer usage:接收结果的向量 default:null
         * @returns 绕 X 轴旋转指定弧度后的 Vector 对象
         */
        static rotateX(v: Vector, o: Vector, a: number, outer?: Vector): Vector;
        /**
         * @description 绕 Y 轴旋转指定弧度
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param v usage:旋转矢量
         * @param o usage:旋转中心
         * @param a usage:旋转弧度  range: 不做限制  type: 浮点数
         * @param outer usage:接收结果的向量 default:null
         * @returns 绕 Y 轴旋转指定弧度后的 Vector 对象
         */
        static rotateY(v: Vector, o: Vector, a: number, outer?: Vector): Vector;
        /**
         * @description 绕 Z 轴旋转指定弧度
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param v usage:旋转矢量
         * @param o usage:旋转中心
         * @param a usage:旋转弧度  range: 不做限制  type: 浮点数
         * @param outer usage:接收结果的向量 default:null
         * @returns 绕 Z 轴旋转指定弧度后的 Vector 对象
         */
        static rotateZ(v: Vector, o: Vector, a: number, outer?: Vector): Vector;
        /**
         * @description 判断向量是否相等
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 两向量是否相等
         */
        static strictEquals(a: Vector, b: Vector): boolean;
        /**
         * @description 向量 a 与向量 b 的夹角角度
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 夹角角度
         */
        static angle3D(a: Vector, b: Vector): number;
        /**
         * @description 向量 a 与向量 b 在 XY 平面投影的夹角角度
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 夹角角度
         */
        static angle(a: Vector, b: Vector): number;
        /**
         * @description 向量 a 在指定平面上的投影
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param n usage:指定平面的法线
         * @param outer usage:接收结果的向量 default:null
         * @returns 向量a在指定平面上的投影
         */
        static projectOnPlane(a: Vector, n: Vector, outer?: Vector): Vector;
        /**
         * @description 向量 a 在指定向量上的投影
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:指定平面的法线
         * @param outer usage:接收投影的向量对象 default:null
         * @returns 向量a在指定向量上的投影
         */
        static project(a: Vector, b: Vector, outer?: Vector): Vector;
        /**
         * @description 设置当前向量的值，使其各个分量都处于指定的范围内
         * @effect 调用端生效
         * @param value usage:当前向量的值
         * @param minInclusive usage:允许的最小值
         * @param maxInclusive usage:允许的最大值
         * @returns 各个分量都处于指定的范围内的向量
         */
        static clamp(value: Vector, minInclusive: Vector, maxInclusive: Vector): Vector;
        /**
         * @description 用给定的 x, y 和 z 分量构建一个新的 Vector
         * @param x usage:x分量 default:0  range: 不做限制  type: 浮点数
         * @param y usage:y分量 default:0  range: 不做限制  type: 浮点数
         * @param z usage:z分量 default:0  range: 不做限制  type: 浮点数
         */
        constructor(x?: number, y?: number, z?: number);
        /**
         * @description 用给定的 f 值设定给 x, y 和 z
         * @param f usage:给定的 f 值  range: 不做限制  type: 浮点数
         */
        constructor(f: number);
        /**
         * @description 用给定的 Vector 的值的 x, y 和 z 分量设定给x，y 和 z
         * @param v usage:给定的 Vector
         */
        constructor(v: Vector);
        /**
         * @description 设置当前向量使其与指定向量相等
         * @effect 调用端生效
         * @param other usage:指定的向量
         * @returns 修改后的自身对象
         */
        set(other: Vector): Vector;
        /**
         * @description 设置当前向量的具体分量值
         * @effect 调用端生效
         * @param x usage:x 分量 default:0   range: 不做限制  type: 浮点数
         * @param y usage:y 分量 default:0  range: 不做限制  type: 浮点数
         * @param z usage:z 分量 default:0  range: 不做限制  type: 浮点数
         * @returns 修改后的自身对象
         */
        set(x?: number, y?: number, z?: number): Vector;
        /**
         * @description 加一个向量
         * @effect 调用端生效
         * @param v usage:相加的向量对象
         * @returns 修改后的自身对象
         */
        add(v: Vector): Vector;
        /**
         * @description 减去一个向量
         * @effect 调用端生效
         * @param v usage:相减的向量对象
         * @returns 修改后的自身对象
         */
        subtract(v: Vector): Vector;
        /**
         * @description 乘以一个向量
         * @effect 调用端生效
         * @param v usage:相乘的向量对象
         * @returns 修改后的自身对象
         */
        multiply(v: Vector): Vector;
        /**
         * @description 每个分量乘以参数
         * @effect 调用端生效
         * @param v usage:每个分量乘以的参数 range:不做限制 type:浮点数
         * @returns 修改后的自身对象
         */
        multiply(v: number): Vector;
        /**
         * @description 除以一个标量
         * @effect 调用端生效
         * @param v usage:每个分量除以的参数 range: 不做限制  type:浮点值
         * @returns 修改后的自身对象
         */
        divide(v: number): Vector;
        /**
         * @description 除以一个向量
         * @effect 调用端生效
         * @param v usage:除以的向量对象
         * @returns 修改后的自身对象
         */
        divide(v: Vector): Vector;
        /**
         * @description 读取字符串数据
         * @effect 调用端生效
         * @param str usage:读取的字符  range:"0.000000,0.000000,0.000000"
         */
        fromString(str: string): void;
        /**
         * @description 输出为字符串
         * @effect 调用端生效
         * @returns 向量值字符串
         */
        toString(): string;
        /**
         * @description 向量的长度平方
         */
        get sqrLength(): number;
        /**
         * @description 向量的长度
         */
        get length(): number;
        /**
         * @description 向量的长度平方
         */
        get sqrMagnitude(): number;
        /**
        * @description 向量的长度
        */
        get magnitude(): number;
        /**
         * @description 获取各个分量取反的新向量
         */
        get negative(): Vector;
        /**
         * @description 获取一个归一化的新向量, 不影响本向量
         */
        get normalized(): Vector;
        /**
         * @description 判断当前向量是否与指定向量相等
         * @effect 调用端生效
         * @precautions 当两个向量的分量在指定的误差范围内相等时, 返回 true, 否则返回 false
         * @param other usage:指定的向量
         * @returns 当前向量是否与指定向量相等
         */
        strictEquals(other: Vector): boolean;
        /**
         * @description 判断当前向量是否在误差范围内与指定向量相等
         * @effect 调用端生效
         * @precautions 当两个向量的分量在指定的误差范围内相等时, 返回 true, 否则返回 false
         * @param other usage:指定的向量
         * @param epsilon usage:最小误差数  default:MathUtil.EPSILON   <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 当前向量是否在误差范围内与指定向量相等
         */
        equals(other: Vector, epsilon?: number): boolean;
        /**
         * @description 克隆当前向量
         * @effect 调用端生效
         * @returns 克隆的新向量
         */
        clone(): Vector;
        /**
         * @description 当前向量归一化
         * @effect 调用端生效
         * @returns 归一化后的向量
         */
        normalize(): Vector;
        /**
         * @description 转换为对应的 Rotation
         * @effect 调用端生效
         * @returns 新的对应的Rotation对象
         */
        toRotation(): mw.Rotation;
    }
}

/// <reference types="engine" />
declare namespace mw {
    // @ts-ignore
    import * as UE from "ue";
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
    class Vector2 {
        /**
         * @description (0, 0)
         */
        static get zero(): Vector2;
        /**
         * @description (1, 1)
         */
        static get one(): Vector2;
        /**
         * @description (-1, -1)
         */
        static get negOne(): Vector2;
        /**
         * @description (1, 0)
         */
        static get unitX(): Vector2;
        /**
         * @description (0, 1)
         */
        static get unitY(): Vector2;
        /**
         * @hidden
         * @description 创建 Vector2 对象
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param v usage:UE.Vector
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 创建的 Vector2 对象
         */
        static fromUEVector2D(v: UE.Vector2D, outer?: Vector2): Vector2;
        /**
         * @description 通过一个字符串创建 Vector2 对象
         * @description 字符串格式举例："X=2,Y=3"
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param str usage:传入的字符串  range:"0.000000,0.000000"
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 创建的 Vector2 对象
         * @example
         * 使用示例: 使用字符串创建一个向量
         * ```ts
         * @Component
         *  export default class NewExample extends Script {
         *
         *      protected onStart(): void {
         *         let result = Vector2.fromString("X=2,Y=3");
         *         // X=2, Y=3
         *         console.log(result);
         *      }
         * }
         * ```
         */
        static fromString(str: string, outer?: Vector2): Vector2;
        /**
         * @description 两个向量相加
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 相加的结果 Vector2 对象
         * @example
         * 使用示例: a + b
         * ```ts
         * @Component
         *  export default class NewExample extends Script {
         *
         *      protected onStart(): void {
         *         let a = new Vector2(8,2);
         *         let b = new Vector2(3,3);
         *         let result = Vector2.add(a,b);
         *         // X=11, Y=5
         *         console.log(result);
         *      }
         * }
         * ```
         */
        static add(a: Vector2, b: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 向量 a 减去向量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 相减的结果 Vector2 对象
         * @example
         * 使用示例: a - b
         * ```ts
         * @Component
         *  export default class NewExample extends Script {
         *
         *      protected onStart(): void {
         *         let a = new Vector2(8,2);
         *         let b = new Vector2(3,3);
         *         let result = Vector2.subtract(a,b);
         *         // X=5, Y=-1
         *         console.log(result);
         *      }
         * }
         * ```
         */
        static subtract(a: Vector2, b: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 向量 a 的每个分量乘以标量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:数值 b  <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 相乘的结果 Vector2 对象
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
         */
        static multiply(a: Vector2, b: number, outer?: Vector2): Vector2;
        /**
         * @description 向量 a 乘以向量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 相乘的结果 Vector2 对象
         * @example
         * 使用示例: a * b
         * ```ts
         * @Component
         *  export default class NewExample extends Script {
         *
         *      protected onStart(): void {
         *         let a = new Vector2(8,2);
         *         let b = new Vector2(3,4);
         *         let result = Vector2.multiply(a,b);
         *         // X=24, Y=8
         *         console.log(result);
         *      }
         * }
         * ```
         */
        static multiply(a: Vector2, b: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 向量 a 的每个分量除以标量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b  <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 相除的结果 Vector2 对象
         * @example
         * 使用示例: a / b
         * ```ts
         * @Component
         *  export default class NewExample extends Script {
         *
         *      protected onStart(): void {
         *         let a = new Vector2(8,2);
         *         let result = Vector2.multiply(a,4);
         *         // X=2, Y=0.5
         *         console.log(result);
         *      }
         * }
         * ```
         */
        static divide(a: Vector2, b: number, outer?: Vector2): Vector2;
        /**
         * @description 向量 a 除以向量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b  <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 相除的结果 Vector2 对象
         * @example
         * 使用示例: a / b
         * ```ts
         * @Component
         *  export default class NewExample extends Script {
         *
         *      protected onStart(): void {
         *         let a = new Vector2(8,2);
         *         let b = new Vector2(3,4);
         *         let result = Vector2.multiply(a,4);
         *         // X=4, Y=0.5
         *         console.log(result);
         *      }
         * }
         * ```
         */
        static divide(a: Vector2, b: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 克隆向量 a 得到新的 Vector2 向量
         * @effect 调用端生效
         * @param a usage:向量 a
         * @returns 克隆得到的新 Vector2 向量
         */
        static clone(a: Vector2): Vector2;
        /**
         * @description 获得指定向量的拷贝
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 拷贝得到的 Vector2 向量
         */
        static copy(a: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 判断两向量排除浮点数误差是否近似等价
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param epsilon usage:最小误差数 default:MathUtil.EPSILON <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 是否相等
         */
        static equals(a: Vector2, b: Vector2, epsilon?: number): boolean;
        /**
         * @description 判断两向量是否相等
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 是否相等
         */
        static strictEquals(a: Vector2, b: Vector2): boolean;
        /**
         * @description 设置向量 a 的值
         * @effect 调用端生效
         * @precautions 向量 a 不能为空对象
         * @param a usage:向量 a
         * @param x usage:修改的 x 值  <br> range: 不限制  type:浮点数
         * @param y usage:修改的 y 值  <br> range: 不限制  type:浮点数
         * @returns 修改后的 Vector2 对象
         */
        static set(a: Vector2, x: number, y: number): Vector2;
        /**
         * @description 向量 a 每个元素向上取整
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 逐元素向上取整后的 Vector2 对象
         * @example
         * 使用示例: 向上取整示例
         * ```ts
         * @Component
         *  export default class NewExample extends Script {
         *
         *      protected onStart(): void {
         *         let a = new Vector2(8.22, 2.69);
         *         let result = Vector2.ceil(a);
         *         // X=9, Y=3
         *         console.log(result);
         *      }
         * }
         * ```
         */
        static ceil(a: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 向量 a 每个元素向下取整
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 逐元素向下取整后的 Vector2 对象
         */
        static floor(a: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 取两个向量对应x、y元素最小值
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 逐元素取最小值后的 Vector2 对象
         */
        static min(a: Vector2, b: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 取两个向量对应x、y元素最小值最大值
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 逐元素取最大值后的 Vector2 对象
         */
        static max(a: Vector2, b: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 每个元素四舍五入取整
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 逐逐元素向量四舍五入取整后的 Vector2 对象
         */
        static round(a: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 两向量的欧氏距离
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 两向量的欧氏距离
         */
        static distance(a: Vector2, b: Vector2): number;
        /**
         * @description 两向量的欧氏距离平方
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 两向量的欧氏距离平方
         */
        static squaredDistance(a: Vector2, b: Vector2): number;
        /**
         * @description 向量长度
         * @effect 调用端生效
         * @param a usage:向量 a
         * @returns 向量长度
         */
        static magnitude(a: Vector2): number;
        /**
         * @description 向量长度平方
         * @effect 调用端生效
         * @param a usage:向量 a
         * @returns 向量长度平方
         */
        static sqrMagnitude(a: Vector2): number;
        /**
         * @description 每个元素向量取负
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 逐元素向量取负得到的 Vector2 对象
         */
        static negate(a: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 每个元素向量取倒数
         * @description 接近 0 时返回 Infinity。
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 逐元素取倒数得到的 Vector2 对象
         */
        static invert(a: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 每个元素向量取倒数
         * @description 接近 0 时返回 0
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @param epsilon usage:最小误差数  default:MathUtil.EPSILON   <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 逐元素取倒数得到的 Vector2 对象
         */
        static invertSafe(a: Vector2, outer?: Vector2, epsilon?: number): Vector2;
        /**
         * @description 向量归一化
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 归一化后得到的 Vector2 对象
         */
        static normalize(a: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 点积
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 点积
         */
        static dot(a: Vector2, b: Vector2): number;
        /**
         * @description 叉积
         * @effect 调用端生效
         * @precautions 注意二维向量的叉积为与 Z 轴平行的三维向量, 此处以向量的模长表示
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 叉积
         */
        static cross(a: Vector2, b: Vector2): number;
        /**
         * @description 向量 a 每个元素线性插值： a + t  * (b - a)
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param t usage:插值  <br> range: [0, 1]   type:浮点数
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 线性插值得到的 Vector2 对象
         */
        static lerp(a: Vector2, b: Vector2, t: number, outer?: Vector2): Vector2;
        /**
         * @description 向目标移动
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param current usage:当前向量
         * @param target usage:目标向量
         * @param maxDistanceDelta usage:最大移动距离  <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 移动后的得到的 Vector2 对象
         */
        static moveTowards(current: Vector2, target: Vector2, maxDistanceDelta: number, outer?: Vector2): Vector2;
        /**
         * @description 反射
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param inDirection usage:入射向量
         * @param inNormal usage:法线向量
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 反射向量
         */
        static reflect(inDirection: Vector2, inNormal: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 生成一个在单位圆上均匀分布的随机 Vector2 对象
         * @effect 调用端生效
         * @param range usage:范围 default:1.0  <br> range: 不限制  type:浮点数
         * @returns 得到的随机 Vector2 对象
         */
        static random(range?: number): Vector2;
        /**
         * @description 两向量夹角角度
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 向量a与向量b的夹角角度
         */
        static angle(a: Vector2, b: Vector2): number;
        /**
         * @description 向量 a 和向量 b 之间的有符号角度
         * @effect 调用端生效
         * @precautions 有符号角度的取值范围为 (-180, 180], 当前向量可以通过逆时针旋转有符号角度与指定向量同向 <br/>
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 向量 a 和向量 b 之间的有符号角度
         */
        static signAngle(a: Vector2, b: Vector2): number;
        /**
         * @description 向量 a 旋转某度后的向量
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param v usage:向量v
         * @param radians usage:旋转角度 <br> range: 无限制  type:浮点数
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 旋转后的 Vector2 对象
         */
        static rotate(v: Vector2, radians: number, outer?: Vector2): Vector2;
        /**
         * @description 向量 a 在向量 b 上的投影
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Vector2 对象 default:null
         * @returns 投影向量
         */
        static project(a: Vector2, b: Vector2, outer?: Vector2): Vector2;
        /**
         * @description 设置当前向量的值, 使其各个分量都处于指定的范围内
         * @effect 调用端生效
         * @param v usage:向量 v
         * @param min usage:最小值
         * @param max usage:最大值
         * @returns 修改后的向量v
         */
        static clamp(v: Vector2, min: Vector2, max: Vector2): Vector2;
        /**
         * @description 向量的 x 分量
         */
        x: number;
        /**
         * @description 向量的 y 分量
         */
        y: number;
        /**
         * @description 用给定的 x, y 分量构建一个新的 Vector2
         * @param x usage:x分量 default:0  range: 不做限制  type: 浮点数
         * @param y usage:y分量 default:0  range: 不做限制  type: 浮点数
         */
        constructor(x?: number, y?: number);
        /**
         * @description 用给定的 f 值设定给 x, y
         * @param f usage:给定的 f 值  range: 不做限制  type: 浮点数
         */
        constructor(f: number);
        /**
         * @description 设置当前向量，使其与指定向量相等
         * @effect 调用端生效
         * @param other usage:指定的向量
         * @returns `this`
         */
        set(other: Vector2): Vector2;
        /**
         * @description 设置当前向量的具体分量值
         * @effect 调用端生效
         * @param x usage:x 分量 default:0.0  range: 不做限制  type: 浮点数
         * @param y usage:y 分量 default:0.0  range: 不做限制  type: 浮点数
         * @returns this
         */
        set(x?: number, y?: number): Vector2;
        /**
         * @description 加一个向量
         * @effect 调用端生效
         * @param v usage:相加的向量对象
         * @returns 修改后的自身对象
         */
        add(v: Vector2): Vector2;
        /**
         * @description 减去一个向量
         * @effect 调用端生效
         * @param v usage:相减的向量对象
         * @returns 修改后的自身对象
         */
        subtract(v: Vector2): Vector2;
        /**
         * @description 乘以一个向量
         * @effect 调用端生效
         * @param v usage:相乘的向量对象
         * @returns 修改后的自身对象
         */
        multiply(v: Vector2): Vector2;
        /**
         * @description 乘以一个标量
         * @effect 调用端生效
         * @param v usage:每个分量乘以的参数 range:不做限制 type:浮点数
         * @returns 修改后的自身对象
         */
        multiply(v: number): Vector2;
        /**
         * @description 除以一个标量
         * @effect 调用端生效
         * @param v usage:相除的向量对象 range: 不做限制  type:浮点值
         * @returns 修改后的自身对象
         */
        divide(v: number): Vector2;
        /**
         * @description 除以一个向量
         * @effect 调用端生效
         * @param v usage:每个分量除以的参数
         * @returns 修改后的自身对象
         */
        divide(v: Vector2): Vector2;
        /**
         * @description 读取字符串数据
         * @effect 调用端生效
         * @param str usage:读取的字符   range:"0.000000,0.000000"
         */
        fromString(str: string): void;
        /**
         * @description 输出为字符串
         * @effect 调用端生效
         * @returns 向量值字符串
         */
        toString(): string;
        /**
         * @description 向量长度的平方
         * @returns 向量长度的平方
         */
        get sqrLength(): number;
        /**
         * @description 计算向量的长度
         * @returns 向量的长度
         */
        get length(): number;
        /**
         * @description 计算向量的长度平方
         * @returns 向量的长度平方
         */
        get sqrMagnitude(): number;
        /**
         * @description 计算向量的长度
         * @returns 向量的长度
         */
        get magnitude(): number;
        /**
         * @description 返回各个分量取反的新 Vector2 对象
         * @returns 各个分量取反的新 Vector2 对象
         */
        get negative(): Vector2;
        /**
         * @description 返回一个新的 Vector2 对象
         * @description 其大小为1, 但仍指向相同的方向 如果向量太小而无法归一化, 则返回 (0, 0)
         * @returns 返回一个新的 Vector2 对象
         */
        get normalized(): Vector2;
        /**
         * @description 判断当前向量是否与指定向量相等
         * @effect 调用端生效
         * @param other usage:指定向量
         * @returns 两向量是否相等
         */
        strictEquals(other: Vector2): boolean;
        /**
         * @description 判断当前向量是否在误差范围内与指定向量相等
         * @effect 调用端生效
         * @param other usage:指定向量
         * @param epsilon usage:最小误差数 default:1.e-8   <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 两向量是否相等
         */
        equals(other: Vector2, epsilon?: number): boolean;
        /**
         * @description 克隆当前向量
         * @effect 调用端生效
         * @returns 克隆得到的新Vector2对象
         */
        clone(): Vector2;
        /**
         * @description 将当前向量归一化
         * @effect 调用端生效
         * @returns 归一化后的自身对象
         */
        normalize(): Vector2;
    }
}

declare namespace mw {
    /**
     * @author xiangkun.sun
     * @groups 基础类型/变换/向量
     * @description 齐次向量
     * @description ------------------
     * @description 由分量 (x,y,z,w) 组成的 4D 齐次向量
     * @networkStatus usage:双端
     */
    class Vector4 {
        /**
         * @description (0, 0, 0, 0)
         */
        static get zero(): Vector4;
        /**
         * @description (1, 1, 1, 1)
         */
        static get one(): Vector4;
        /**
         * @description (-1, -1, -1, -1)
         */
        static get negOne(): Vector4;
        /**
         * @description 通过一个字符串创建 Vector4 对象
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param str usage:向量 a  range:"0.000000,0.000000,0.000000,0.000000"
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 新创建的 Vector4 对象
         */
        static fromString(str: string, outer?: Vector4): Vector4;
        /**
         * @description 两个向量相加
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 相加的结果 Vector4 对象
         */
        static add(a: Vector4, b: Vector4, outer?: Vector4): Vector4;
        /**
         * @description 向量 a 减去向量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 相减的结果 Vector4 对象
         */
        static subtract(a: Vector4, b: Vector4, outer?: Vector4): Vector4;
        /**
         * @description 向量 a 的每个分量乘以标量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:数字 b   <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 相乘的结果 Vector4 对象
         */
        static multiply(a: Vector4, b: number, outer?: Vector4): Vector4;
        /**
         * @description 向量 a 乘以向量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 相乘的结果 Vector4 对象
         */
        static multiply(a: Vector4, b: Vector4, outer?: Vector4): Vector4;
        /**
         * @description 遍历向量a的每个分量除以数字b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:数字 b  <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 相除的结果 Vector4 对象
         */
        static divide(a: Vector4, b: number, outer?: Vector4): Vector4;
        /**
         * @description 向量 a 除以向量 b
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 相除的结果 Vector4 对象
         */
        static divide(a: Vector4, b: Vector4, outer?: Vector4): Vector4;
        /**
         * @description 获得指定向量的拷贝
         * @effect 调用端生效
         * @param a usage:向量 a
         * @returns 克隆得到的新 Vector4 对象
         */
        static clone(a: Vector4): Vector4;
        /**
         * @description 向量 a 的值赋给向量 b
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 向量a
         */
        static copy(a: Vector4, b: Vector4): Vector4;
        /**
         * @description 判断两向量排除浮点数误差是否近似等价
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param epsilon usage:最小误差数 对象 default:1.e-8 <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 是否相等
         */
        static equals(a: Vector4, b: Vector4, epsilon?: number): boolean;
        /**
         * @description 判断两向量是否相等
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 是否相等
         */
        static strictEquals(a: Vector4, b: Vector4): boolean;
        /**
         * @description 向目标向量移动
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param current usage:当前向量
         * @param target usage:目标向量
         * @param maxDistanceDelta usage:最大平均移动距离  <br> range: 不限制  type:浮点数
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 移动后的位置
         */
        static moveTowards(current: Vector4, target: Vector4, maxDistanceDelta: number, outer?: Vector4): Vector4;
        /**
         * @description 设置向量值
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param x usage:x 分量  <br> range: 不限制  type:浮点数
         * @param y usage:y 分量  <br> range: 不限制  type:浮点数
         * @param z usage:z 分量  <br> range: 不限制  type:浮点数
         * @param w usage:w 分量  <br> range: 不限制  type:浮点数
         * @returns 修改后的向量a
         */
        static set(a: Vector4, x: number, y: number, z: number, w: number): Vector4;
        /**
         * @description 逐元素向量向上取整
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 逐元素向上取整得到的 Vector4 对象
         */
        static ceil(a: Vector4, outer?: Vector4): Vector4;
        /**
         * @description 逐元素向量向下取整
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 逐元素向下取整得到的 Vector4 对象
         */
        static floor(a: Vector4, outer?: Vector4): Vector4;
        /**
         * @description 逐元素向量最小值
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 逐元素向量取最小值得到的 Vector4 对象
         */
        static min(a: Vector4, b: Vector4, outer?: Vector4): Vector4;
        /**
         * @description 逐元素向量最大值
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 逐元素取最大值得到的 Vector4 对象
         */
        static max(a: Vector4, b: Vector4, outer?: Vector4): Vector4;
        /**
         * @description 逐元素向量四舍五入取整
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 逐元素四舍五入取整得到的 Vector4 对象
         */
        static round(a: Vector4, outer?: Vector4): Vector4;
        /**
         * @description 两向量的欧氏距离
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 两向量的欧氏距离
         */
        static distance(a: Vector4, b: Vector4): number;
        /**
         * @description 两向量的欧氏距离平方
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 两向量的欧氏距离平方
         */
        static squaredDistance(a: Vector4, b: Vector4): number;
        /**
         * @description 向量长度
         * @effect 调用端生效
         * @param a usage:向量 a
         * @returns 向量长度
         */
        static magnitude(a: Vector4): number;
        /**
         * @description 向量长度平方
         * @effect 调用端生效
         * @param a usage:向量 a
         * @returns 向量长度平方
         */
        static sqrMagnitude(a: Vector4): number;
        /**
         * @description 逐元素向量取负
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 逐元素取负得到的 Vector4 对象
         */
        static negate(a: Vector4, outer?: Vector4): Vector4;
        /**
         * @description 逐元素向量取倒数，接近 0 时返回 Infinity
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 逐元素取倒数得到的 Vector4 对象
         */
        static invert(a: Vector4, outer?: Vector4): Vector4;
        /**
         * @description 逐元素向量取倒数，接近 0 时返回 0
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @param epsilon usage:最小误差数  default:MathUtil.EPSILON   <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 逐元素取倒数得到的 Vector4 对象
         */
        static invertSafe(a: Vector4, outer?: Vector4, epsilon?: number): Vector4;
        /**
         * @description 归一化向量
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 归一化后得到的 Vector4 对象
         */
        static normalize(a: Vector4, outer?: Vector4): Vector4;
        /**
         * @description 点积
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @returns 向量点积
         */
        static dot(a: Vector4, b: Vector4): number;
        /**
         * @description 向量 a 每个元素线性插值： a + t  * (b - a)
         * @description outer 为可选参数。作用是：当传入 outer，计算结果会赋值给 outer。（传入的 outer 向量不能为 null/undefined）
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param b usage:向量 b
         * @param t usage:插值  <br> range:[0, 1]  type:浮点数
         * @param outer usage:接收结果的 Vector4 对象 default:null
         * @returns 插值得到的 Vector4 向量
         */
        static lerp(a: Vector4, b: Vector4, t: number, outer?: Vector4): Vector4;
        /**
         * @description x 分量
         */
        x: number;
        /**
         * @description y 分量
         */
        y: number;
        /**
         * @description z 分量
         */
        z: number;
        /**
         * @description w 分量
         */
        w: number;
        /**
         * @description 用给定的 x 值设定给 x，y，z，w
         * @param x usage:给定的 x 值 default:0.0  range: 不做限制  type: 浮点数
         */
        constructor(x?: number);
        /**
         * @description 用给定的 x，y，z，w 分量构建一个新的 Vector4
         * @param x usage:给定的 x 值 default:0.0  range: 不做限制  type: 浮点数
         * @param y usage:给定的 y 值 default:0.0  range: 不做限制  type: 浮点数
         * @param z usage:给定的 z 值 default:0.0  range: 不做限制  type: 浮点数
         * @param w usage:给定的 w 值 default:0.0  range: 不做限制  type: 浮点数
         */
        constructor(x: number, y: number, z: number, w: number);
        /**
         * @description 加一个向量
         * @effect 调用端生效
         * @param v usage:相加的向量对象
         * @returns 修改后的自身对象
         */
        add(v: Vector4): Vector4;
        /**
         * @description 减去一个向量
         * @effect 调用端生效
         * @param v usage:相减的向量对象
         * @returns 修改后的自身对象
         */
        subtract(v: Vector4): Vector4;
        /**
         * @description 乘以一个向量
         * @effect 调用端生效
         * @param v usage:相乘的向量对象
         * @returns 修改后的自身对象
         */
        multiply(v: Vector4): Vector4;
        /**
         * @description 每个分量乘以参数
         * @effect 调用端生效
         * @param v usage:每个分量乘以的参数 range:不做限制 type:浮点数
         * @returns 修改后的自身对象
         */
        multiply(v: number): Vector4;
        /**
         * @description 每个分量除以参数
         * @effect 调用端生效
         * @param v usage:相除的向量对象 range: 不做限制  type:浮点值
         * @returns 修改后的自身对象
         */
        divide(v: number): Vector4;
        /**
         * @description 除以一个向量
         * @effect 调用端生效
         * @param v usage:每个分量除以的参数
         * @returns 修改后的自身对象
         */
        divide(v: Vector4): Vector4;
        /**
         * @description 读取字符串数据
         * @effect 调用端生效
         * @param str usage:读取的字符串  range:"0.000000,0.000000,0.000000,0.000000"
         */
        fromString(str: string): void;
        /**
         * @description 输出为格式化字符串
         * @effect 调用端生效
         * @returns Vector4 对象值的字符串
         */
        toString(): string;
        /**
         * @description 计算向量长度 (模)的平方
         */
        get sqrLength(): number;
        /**
         * @description 计算向量长度 (模)
         */
        get length(): number;
        /**
         * @description 计算向量的长度平方
         */
        get sqrMagnitude(): number;
        /**
         * @description 计算向量的长度
         */
        get magnitude(): number;
        /**
         * @description 返回各个分量取反的新向量
         */
        get negative(): Vector4;
        /**
         * @description 返回一个归一化的新向量,但不影响本向量.
         */
        get normalized(): Vector4;
        /**
         * @description 判断当前向量是否与向量a相等
         * @effect 调用端生效
         * @param a usage:向量 a
         * @returns 是否相等
         */
        strictEquals(a: Vector4): boolean;
        /**
         * @description 判断当前向量是否在误差范围内与向量a相等
         * @effect 调用端生效
         * @param a usage:向量 a
         * @param epsilon usage:最小误差数 default:MathUtil.EPSILON <br> range: 建议传入小于 1 的值。  type:浮点数
         * @returns 是否相等
         */
        equals(a: Vector4, epsilon?: number): boolean;
        /**
         * @description 克隆当前向量
         * @effect 调用端生效
         * @returns 克隆的到的新 Vector4 对象
         */
        clone(): Vector4;
        /**
         * @description 将当前向量归一化
         * @effect 调用端生效
         * @returns 归一化后的自身对象
         */
        normalize(): Vector4;
    }
}
