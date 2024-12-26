/// <reference types="Extension" />
declare namespace mweditor {
    enum CheckAutoTestInfo {
        /** 自定义校验信息 */
        CustomInfo = 2,
        /** 校验日志信息 */
        Log = 1,
        /** 校验详细日志信息 */
        DetailedLog = 0
    }
    enum TaskType {
        /** API覆盖类型的用例 */
        API = 0,
        /** 功能覆盖类型的用例 */
        Function = 1,
        /** bug覆盖类型的用例 */
        Bug = 2,
        /** 其它，暂未分类的用例 */
        Other = 3
    }
    function AutoTest(pluginType?: mweditor.PluginType): (target: any) => void;
    function ShutdownTSTest(): void;
    function getAllAutoTestClass(): Set<AutomationSpecBase>;
    class AutomationSpecBase {
        /** 执行流程 */
        protected construct(): void;
        /** 禁用该测试套件 */
        protected xdescribe(title: string, fn: () => void): void;
        /**
         * 测试套件
         * 一个describe可以有多个it,一个it代表一个测试用例
         * @param title 一个套件 叙述文字
         */
        protected describe(title: string, fn: () => void): void;
        /** 禁用该任务 */
        protected xit(...params: any[]): void;
        private CheckNetStatus;
        /**
         * 任务
         * @param title 任务描述
         * @param owner 管理员 运行用例的时候需要检测格式，不符合格式的直接报错（格式：XXX.XXX
         * @param feishuID 飞书ID 上报bug的时候指定任务的负责人
         * @param taskType 类型（默认Other类型）
         * @param netStatus 表示调用端，默认双端调用，可选仅客户端、仅服务端（任务内部进行过滤）
         */
        protected it(title: string, owner: string, feishuID: string, fn: () => void, taskType?: mweditor.TaskType, netStatus?: mw.NetStatus, logType?: mweditor.CheckAutoTestInfo): void;
        /**
         * 潜伏任务
         * 指 在一定时间类执行完任务，而不是在一帧执行完任务
         * 在任务完成时记得通知完成任务
         * ```jsx
         * this.doneLatent()
         * ```
         * @param title 任务描述
         * @param owner 管理员 运行用例的时候需要检测格式，不符合格式的直接报错（格式：XXX.XXX
         * @param feishuID 飞书ID 上报bug的时候指定任务的负责人
         * @param timeout 任务执行时间（默认为30000毫秒，超出时间返回错误执行下个任务）
         * @param taskType 类型（默认Other类型）
         * @param netStatus 表示调用端，默认双端调用，可选仅客户端、仅服务端（任务内部进行过滤）
         */
        protected latentIt(title: string, owner: string, feishuID: string, fn: () => void, timeout?: number, taskType?: mweditor.TaskType, netStatus?: mw.NetStatus, logType?: mweditor.CheckAutoTestInfo): void;
        /** 禁用潜伏任务 */
        protected xlatentIt(...params: any[]): void;
        /**
         * 任务前准备阶段（潜伏）
         * 在任务完成时记得通知完成任务
         * * ```jsx
         * this.doneLatent()
         * ```
         * @param timeout 任务执行时间（默认为30000毫秒，超出时间返回错误执行下个任务）
         */
        protected latentBeforeEach(fn: () => void, timeout?: number): void;
        /** 禁用任务前准备阶段 */
        protected xlatentBeforeEach(...params: any[]): void;
        /**
         * 任务执行后结束阶段(潜伏)
         * 在任务完成时记得通知完成任务
         *  ```jsx
         * this.doneLatent()
         * ```
         * @param timeout 任务执行时间（默认为30000毫秒，超出时间返回错误执行下个任务）
         */
        protected latentAfterEach(fn: () => void, timeout?: number): void;
        /** 禁用任务后结束阶段 */
        protected xlatentAfterEach(...params: any[]): void;
        /**
         * 潜伏任务完成通知
         */
        protected doneLatent(): void;
        /** 启动自动化测试开始前创建步骤 */
        protected beforeEach(fn: () => void): void;
        protected xbeforeEach(fn: () => void, ...params: any[]): void;
        /** 结束自动化测试步骤 */
        protected afterEach(fn: () => void): void;
        protected xafterEach(fn: () => void, ...params: any[]): void;
        /** 添加错误消息 */
        protected error(info: string): void;
        /** 添加警告消息 */
        protected warn(info: string): void;
        /** 添加普通消息 */
        protected log(info: string): void;
        /**
         * 场景图片截取
         * @returns 是否截图成功
         */
        protected screenShot(): boolean;
        /**
         * 获取当前执行任务
         * @returns 任务名称
         */
        static get currentTestContext(): string;
    }
    class DriverElement {
        /**
         * 将光标移动到自身控件元素上，触发自身控件可能具有的任何悬停提示
         * @returns 光标移动是否成功
         */
        hover(): Promise<boolean>;
        /**
         * @returns 自身控件元素是否当前正被光标悬停
         */
        isHovered(): Promise<boolean>;
        /**
         * 将光标移动到元素上，然后触发一系列事件以调用指定鼠标按钮的单击
         * @param MouseKey 鼠标按键类型（默认为鼠标左键点击）
         * @returns 单击是否成功
         */
        click(MouseKey?: mw.Keys): Promise<boolean>;
        /**
         * 将光标移动到元素上，然后触发一系列事件以调用指定鼠标按钮的双击
         * @param MouseKey 鼠标按键类型（默认为鼠标左键点击）
         * @returns 双击是否成功
         */
        doubleClick(MouseKey?: mw.Keys): Promise<boolean>;
        /**
         * 将焦点移动到元素，然后触发一系列事件以调用指定键的键盘输入。
         * @param MouseKey 鼠标按键类型
         * @returns 是否执行成功
         */
        key(MouseKey: mw.Keys): Promise<boolean>;
        /**
         * 将焦点移到元素上，然后触发一系列事件来调用每个指定字符的键盘输入。
         * @param Text 输入文本
         * @returns 是否执行成功
         */
        inputText(Text: string): Promise<boolean>;
        /**
         * @returns 元素是否可以聚焦
         */
        canFocus(): Promise<boolean>;
        /**
         * @returns 元素当前是否可见；元素必须在屏幕上
         */
        isVisible(): Promise<boolean>;
        /**
         * @returns 所述元素当前是否是可交互的；元素必须在屏幕上
         */
        isInteractable(): Promise<boolean>;
        /**
         * @returns 滚动栏是否已经在顶部
         */
        isScrolledToBeginning(): Promise<boolean>;
        /**
         * @returns 滚动栏是否已经在底部
         */
        isScrolledToEnd(): Promise<boolean>;
        /**
         * @returns 元素的屏幕大小
         */
        getSize(): Promise<mw.Vector2>;
        /**
         * @returns 元素上显示的文字
         */
        getText(): Promise<string>;
        /**
         * @returns 元素相对左上角的屏幕空间绝对位置
         */
        getAbsolutePosition(): Promise<mw.Vector2>;
    }
    class DriverSequence {
        private upData;
        /** 等待时间（单位：毫秒） */
        wait(Value: number): DriverSequence;
        /**
         * 条件等待
         * @param fn 条件函数
         * @param timeout 最大执行时间（单位：毫秒）
         * @param interval 时间间隔（单位：毫秒）
         */
        conditionWait(fn: () => boolean, timeout?: number, interval?: number): void;
        /**触发鼠标按钮的单击 */
        click(Value?: mw.Keys | DriverElement): DriverSequence;
        /**触发鼠标按钮的双击 */
        doubleClick(Value?: mw.Keys | DriverElement): DriverSequence;
        /** 触发调用指定键的输入。 */
        key(Key: mw.Keys): DriverSequence;
        /** 触发每个指定字符的键盘输入。 */
        inputText(Text: string): DriverSequence;
        /** 触发调用指定键的输入按下事件 */
        press(Key: mw.Keys): DriverSequence;
        /**
         * 持续按住一个键
         * @param Key 按住键位
         * @param Value 时间
         */
        keyRepeat(Key: mw.Keys, Value?: number): this;
        /** 触发调用指定键的输入抬起事件 */
        release(Key: mw.Keys): DriverSequence;
        /**
         * 对一系列事件进行排队，以调用鼠标滚轮在当前鼠标位置滚动指定的增量
         * 大多数普通用户的滚动限制在-5到5之间。
         */
        scrollBy(Delta: number): DriverSequence;
        /**
         * 将光标移动到元素上排队，然后触发一系列事件以调用鼠标滚轮滚动，滚动元素
         * 直到它到达开始
         */
        scrollToBeginning(InElement: DriverElement): DriverSequence;
        /**
         * 将光标移动到元素上排队，然后触发一系列事件以调用鼠标滚轮滚动，滚动元素
         * 直到它到达最底部
         */
        scrollToEnd(InElement: DriverElement): DriverSequence;
        /** 触发鼠标聚焦到输入的UI元素上 */
        focus(InElement: DriverElement): DriverSequence;
        /**
         * @param Value 触发鼠标移动到UI元素或者相对当前位置移动多少差量
         * @returns
         */
        move(Value: DriverElement | mw.Vector2): DriverSequence;
        /** 执行当前注册的操作栈 */
        perform(): Promise<boolean>;
    }
    enum FindElementType {
        /** 通过标记ID查找 */
        Id = 0,
        /** 通过嵌套路径定位 */
        Path = 1
    }
    class AutomationDriver {
        /**
         * 查找符合条件的所有元素
         * @param Value 新元素的定位器
         * @param FindElementType 定位器类型
         * @param Root 对将从中开始搜索的元素的引用
         * @returns 返回所有符合当前条件的元素
         */
        findElements(Value: string, FindElementType: mweditor.FindElementType, Root?: DriverElement): DriverElement[];
        /**
         * 根据当前光标位置返回元素
         * @returns 返回所有符合当前条件的元素
         */
        findElementByCursor(): DriverElement;
        /**
         * @returns 可用于向驱动器发出一系列命令
         */
        createSequence(): DriverSequence;
        /** 启动模拟键鼠操作 */
        static Enable(): AutomationDriver;
        /** 关闭模拟*/
        static Disable(): void;
    }
}

declare namespace mweditor {
    /**
     * 插件运行时类型
     */
    enum PluginType {
        Editor = "Editor",
        Runtime = "Runtime"
    }
    /**
     * @description 插件修饰装饰器
     */
    function PluginScript(pluginType?: PluginType): (target: any) => void;
    interface IPluginInterface {
        onAwake(): void;
        onStart(): void;
        onDestroy(): void;
        onUpdate(dt: number): void;
    }
    /**
     * 运行时插件基类
     */
    class Plugin implements IPluginInterface {
        onAwake(): void;
        onStart(): void;
        onDestroy(): void;
        onUpdate(dt: number): void;
    }
}

/// <reference types="Extension" />
declare namespace mweditor {
    class configCache {
        /**
         * @description    从指定File查找值，outer为boolean类型, 返回是否查找成功bSuccess
         * @param path     文件路径
         * @param section  目标项节Section
         * @param key      目标项键Key
         * @param outer    取到的值
         * @return         bSuccess    是否找到值
         */
        getBoolean(path: string, section: string, key: string, outer?: Array<boolean>): boolean;
        /**
         * @description    从指定File查找值，outer为number类型, 返回是否查找成功bSuccess
         * @param path     文件路径
         * @param section  目标项节Section
         * @param key      目标项键Key
         * @param outer    取到的值
         * @return         bSuccess    是否找到值
         */
        getNumber(path: string, section: string, key: string, outer?: Array<number>): boolean;
        /**
         * @description    从指定File查找值，outer为Vector2类型, 返回是否查找成功bSuccess
         * @param path     文件路径
         * @param section  目标项节Section
         * @param key      目标项键Key
         * @param outer    取到的值
         * @return         bSuccess    是否找到值
         */
        getVector2(path: string, section: string, key: string, outer?: Array<mw.Vector2>): boolean;
        /**
         * @description    从指定File查找值，outer为Vector类型, 返回是否查找成功bSuccess
         * @param path     文件路径
         * @param section  目标项节Section
         * @param key      目标项键Key
         * @param outer    取到的值
         * @return         bSuccess    是否找到值
         */
        getVector(path: string, section: string, key: string, outer?: Array<mw.Vector>): boolean;
        /**
         * @description    从指定File查找值，outer为Vector4类型, 返回是否查找成功bSuccess
         * @param path     文件路径
         * @param section  目标项节Section
         * @param key      目标项键Key
         * @param outer    取到的值
         * @return         bSuccess    是否找到值
         */
        getVector4(path: string, section: string, key: string, outer?: Array<mw.Vector4>): boolean;
        /**
         * @description    从指定File查找值，outer为boolean类型, 返回是否查找成功bSuccess
         * @param path     文件路径
         * @param section  目标项节Section
         * @param key      目标项键Key
         * @param outer    取到的值
         * @return         bSuccess    是否找到值
         */
        getRotation(path: string, section: string, key: string, outer?: Array<mw.Rotation>): boolean;
        /**
         * @description    从指定File查找值，outer为string类型, 返回是否查找成功bSuccess
         * @param path     文件路径
         * @param section  目标项节Section
         * @param key      目标项键Key
         * @param outer    取到的值
         * @precautions    文本会在遇到"|"时会被截断, 例如ini中"TargetStr=ABC|DEF"的返回值为“ABC”
         * @return         bSuccess    是否找到值
         */
        getString(path: string, section: string, key: string, outer?: Array<string>): boolean;
        /**
         * @description    从指定File查找值，out为对应类型需实现fromString()函数, 返回是否查找成功bSuccess
         * @param path     文件路径
         * @param section  目标项节Section
         * @param key      目标项键Key
         * @param inner    对应的类型实例
         * @param outer    取到的值
         * @return         bSuccess    是否找到值
         */
        get(path: string, section: string, key: string, inner?: any, outer?: Array<any>): boolean;
        /**
         * @description    朝指定的File写入bool
         * @param path     文件路径
         * @param section  设置项节Section
         * @param key      设置项键Key
         * @param value    设置项值value
         */
        setBoolean(path: string, section: string, key: string, value: boolean): void;
        /**
         * @description    朝指定的File写入number
         * @param path     文件路径
         * @param section  设置项节Section
         * @param key      设置项键Key
         * @param value    设置项值value
         */
        setNumber(path: string, section: string, key: string, value: number): void;
        /**
        * @description    朝指定的File写入Vector2
        * @param path     文件路径
        * @param section  设置项节Section
        * @param key      设置项键Key
        * @param value    设置项值value
        */
        setVector2(path: string, section: string, key: string, value: mw.Vector2): void;
        /**
        * @description    朝指定的File写入Vector
        * @param path     文件路径
        * @param section  设置项节Section
        * @param key      设置项键Key
        * @param value    设置项值value
        */
        setVector(path: string, section: string, key: string, value: mw.Vector): void;
        /**
        * @description    朝指定的File写入Vector4
        * @param path     文件路径
        * @param section  设置项节Section
        * @param key      设置项键Key
        * @param value    设置项值value
        */
        setVector4(path: string, section: string, key: string, value: mw.Vector4): void;
        /**
        * @description    朝指定的File写入Rotation
        * @param path     文件路径
        * @param section  设置项节Section
        * @param key      设置项键Key
        * @param value    设置项值value
        */
        setRotation(path: string, section: string, key: string, value: mw.Rotation): void;
        /**
         * @description    朝指定的File写入string
         * @param path     文件路径
         * @param section  设置项节Section
         * @param key      设置项键Key
         * @param value    设置项值value
         * @precautions    见getString中的说明, 配套使用时需注意
         */
        setString(path: string, section: string, key: string, value: string): void;
        /**
         * @description    朝指定的File写入类型，该类型需要实现toString()函数
         * @param path     文件路径
         * @param section  设置项节Section
         * @param key      设置项键Key
         * @param value    设置项值value
         * @precautions    toString()的结果不能包含"|"，因为重新取值时的文本会在遇到"|"时会被截断, 例如ini中"TargetStr=ABC|DEF"的返回值为“ABC”
         */
        set(path: string, section: string, key: string, value: any): void;
        /**
         * @description    查询File中Section是否存在
         * @param section  设置项节Section
         * @param path     文件路径
         * @return         bool
         */
        DoesSectionExist(section: string, path: string): boolean;
    }
}
