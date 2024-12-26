declare namespace mw {
    /**
     * @description 事件发送的结果
     * @author xiangkun.sun
     * @groups 基础类型/事件
     */
    enum DispatchEventResult {
        /** 成功 */
        Success = 0,
        /** 失败 */
        Failure = 1,
        /** 失败次数限制 */
        FailureCountLimit = 2,
        /** 失败频率限制 */
        FailureRateLimit = 3
    }
    /**
     * @author xiangkun.sun
     * @description 事件监听器
     * @groups 基础类型/事件
     * @networkStatus usage:双端
     */
    class EventListener {
        /**
         * @description 用来判断事件是否有效
         */
        get isConnected(): boolean;
        /**
         * @description 卸载事件
         * @effect 调用端生效
         */
        disconnect(): void;
    }
    /**
     * @author mengyuan.hao
     * @description 事件
     * @description MW编辑器支持多种类型的事件。
     * @description 在实现逻辑时，您可以将函数连接到编辑器触发的内置事件以响应它们。还可以创建触发并响应自定义事件。此外，您可以使用网络事件来允许跨客户端-服务器边界进行事件驱动的通信。
     * @description 许多对象都具有由其 API 提供的内置事件，这些事件会自动响应与这些对象相关的特定操作或更改。例如： HotWeapon 中装备上武器会触发 onEquip 事件。
     * @description Event 类提供了本地、客户端和服务器之间通信的事件。
     * @description 本地、客户端和服务器之间是如何通信的呢 ？
     * @description - 本地 ：指当前主机。
     * @description - 服务器 ：MW编辑器多人游戏基于客户端-服务器模式。也就是说，会有一个服务器担当游戏状态的主控者，而连接的客户端将保持近似复本。服务器可以看作傀儡师，客户端则为傀儡师控制的牵线木偶们。
     * @description - 客户端 ：连接到服务器的一个或多个“木偶”。
     * @description 本地、客户端和服务器之间通信时如同打开开关，屋子里的灯就会亮。当我在某地执行事件（打开开关），添加完的事件就会触发（安装好的灯泡就会亮）。
     * @groups 基础类型/事件
     * @networkStatus usage:双端
     */
    class Event {
        /**
         * @description 添加本地事件。
         * @author xiangkun.sun
         * @groups 基础类型/事件
         * @effect 调用端生效
         * @param eventName usage:事件名 <br> range: 长度不做限制，但请设置合适的长度和名称。
         * @param listener usage:监听回调
         * @returns 返回一个事件监听器
         */
        static addLocalListener(eventName: string, listener: (...params: unknown[]) => void): EventListener;
        /**
         * @description 执行已添加的本地事件。
         * @author xiangkun.sun
         * @groups 基础类型/事件
         * @effect 调用端生效
         * @param eventName usage:事件名 <br> range: 长度不做限制，与添加事件名配对。
         * @param params usage:事件内容
         * @returns 返回发送本地事件的结果
         */
        static dispatchToLocal(eventName: string, ...params: unknown[]): DispatchEventResult;
        /**
         * @description 服务器监听客户端发来的事件
         * @author xiangkun.sun
         * @groups 基础类型/事件
         * @effect 只在服务端调用生效
         * @precautions 应该在服务器端的逻辑里面使用
         * @param eventName usage:事件名  <br> range: 长度不做限制，但请设置合适的长度和名称。
         * @param listener usage:监听回调 Player 发送事件的客户端 target 事件内容
         * @param player usage:本地角色
         * @param param usage:其他参数
         * @returns 返回一个事件监听器
         * @example
         * 使用示例:创建一个名为"EventSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在服务端中看到每帧打印ok,代码如下：
         * ```
         *  @Component
         *  export default class EventSample extends Script {
         *      protected async onStart(): Promise<void> {
         *          this.useUpdate = true;
         *          // 客户端向服务器发送 eventOne 事件
         *          // 客户端发送 eventOne 事件可以看作灯的开关
         *          if(SystemUtil.isClient()){
         *              Event.dispatchToServer("eventOne");
         *          }
         *          // 在服务器执行客户端发来的 eventOne 事件,并在服务器执行传入的函数逻辑
         *          // 服务器执行 eventOne 事件，传入的函数开始执行可以看作灯泡亮了
         *          if (SystemUtil.isServer()){
         *              Event.addClientListener("eventOne" ,()=>{console.log("ok")});
         *          }
         *      }
         *  }
         * ```
         */
        static addClientListener(eventName: string, listener: (player: mw.Player, ...params: unknown[]) => void): EventListener;
        /**
         * @description 客户端发送事件给服务器
         * @author xiangkun.sun
         * @groups 基础类型/事件
         * @effect 只在客户端调用生效
         * @precautions 应在客户端逻辑里面调用
         * @param eventName usage:事件名 <br> range: 长度不做限制，但建议设置合适的长度和名称。
         * @param params usage:可变长参数
         * @returns 返回事件发送结果
         * @example
         * 使用示例:创建一个名为"EventSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在服务端中看到每帧打印ok,代码如下：
         * ```
         *  @Component
         *  export default class EventSample extends Script {
         *      protected async onStart(): Promise<void> {
         *          this.useUpdate = true;
         *          // 客户端向服务器发送 eventOne 事件
         *          // 客户端发送 eventOne 事件可以看作灯的开关
         *          if(SystemUtil.isClient()){
         *              Event.dispatchToServer("eventOne");
         *          }
         *          // 在服务器执行客户端发来的 eventOne 事件,并在服务器执行传入的函数逻辑
         *          // 服务器执行 eventOne 事件，传入的函数开始执行可以看作灯泡亮了
         *          if (SystemUtil.isServer()){
         *              Event.addClientListener("eventOne" ,()=>{console.log("ok")});
         *          }
         *      }
         *  }
         * ```
         */
        static dispatchToServer(eventName: string, ...params: unknown[]): DispatchEventResult;
        /**
         * @description 客户端发送不可靠事件给服务器，不可靠事件没有重发机制，当遭遇网络波动或者其他情况时会丢失
         * @author xiangkun.sun
         * @groups 基础类型/事件
         * @effect 只在客户端调用生效
         * @precautions 应在客户端逻辑里面调用
         * @param eventName usage:事件名 <br> range: 长度不做限制，但建议设置合适的长度和名称。
         * @param params usage:可变长参数
         * @returns 返回事件发送结果
         * @example
         * 使用示例:创建一个名为"EventSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在服务端中看到每帧打印ok,代码如下：
         * ```
         *  @Component
         *  export default class EventSample extends Script {
         *      protected async onStart(): Promise<void> {
         *          this.useUpdate = true;
         *          // 客户端向服务器发送 eventOne 事件
         *          // 客户端发送 eventOne 事件可以看作灯的开关
         *          if(SystemUtil.isClient()){
         *              Event.dispatchToServerUnreliable("eventOne");
         *          }
         *          // 在服务器执行客户端发来的 eventOne 事件,并在服务器执行传入的函数逻辑
         *          // 服务器执行 eventOne 事件，传入的函数开始执行可以看作灯泡亮了
         *          if (SystemUtil.isServer()){
         *              Event.addClientListener("eventOne" ,()=>{console.log("ok")});
         *          }
         *      }
         *  }
         * ```
         */
        static dispatchToServerUnreliable(eventName: string, ...params: unknown[]): DispatchEventResult;
        /**
         * @description 客户端监听服务器事件
         * @author xiangkun.sun
         * @groups 基础类型/事件
         * @effect 只在客户端调用生效
         * @precautions 应在客户端逻辑里调用
         * @param eventName usage:事件名 <br> range: 长度不做限制，但建议设置合适的长度和名称。
         * @param listener usage:监听回调 params 事件内容
         * @returns 返回一个事件监听器
         * @example
         * 使用示例:创建一个名为"EventSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在客户端中看到每帧打印ok,代码如下：
         * ```
         * @Component
         *  export default class EventSample extends Script {
         *      protected async onStart(): Promise<void> {
         *          this.useUpdate = true;
         *          // 在客户端执行服务器发来的 eventOne 事件,并在客户端执行传入的函数逻辑
         *          // 客户端执行 eventOne 事件，传入的函数开始执行可以看作灯泡亮了
         *          if(SystemUtil.isClient()){
         *              Event.addServerListener("eventOne",()=>{console.log("ok")});
         *          }
         *      }
         *      protected onUpdate(dt: number): void {
         *          // 服务器每帧对所有客户端发送 eventOne 事件
         *          // 服务端发送 eventOne 事件可以看作灯的开关，每帧打开一次灯泡的开关
         *          if (SystemUtil.isServer()){
         *              Event.dispatchToAllClient("eventOne");
         *          }
         *      }
         *  }
         * ```
         */
        static addServerListener(eventName: string, listener: ((...params: unknown[]) => void)): EventListener;
        /**
         * @description 服务器发送事件给指定客户端
         * @author xiangkun.sun
         * @groups 基础类型/事件
         * @effect 只在服务端调用生效
         * @precautions 应在服务器逻辑里调用
         * @param player usage:客户端
         * @param eventName usage:事件名 <br> range: 长度不做限制，但建议设置合适的长度和名称。
         * @param params usage:可变长参数
         * @returns 返回事件发送结果
         */
        static dispatchToClient(player: mw.Player, eventName: string, ...params: unknown[]): DispatchEventResult;
        /**
         * @description 服务器发送不可靠事件给指定客户端，不可靠事件没有重发机制，当遭遇网络波动或者其他情况时会丢失
         * @author xiangkun.sun
         * @groups 基础类型/事件
         * @effect 只在服务端调用生效
         * @precautions 应在服务器逻辑里调用
         * @param player usage:客户端
         * @param eventName usage:事件名 <br> range: 长度不做限制，但建议设置合适的长度和名称。
         * @param params usage:可变长参数
         * @returns 返回事件发送结果
         */
        static dispatchToClientUnreliable(player: mw.Player, eventName: string, ...params: unknown[]): DispatchEventResult;
        /**
         * @description 服务器发送事件给所有客户端
         * @author xiangkun.sun
         * @groups 基础类型/事件
         * @effect 只在服务端调用生效
         * @precautions 应在服务器逻辑里调用
         * @param eventName usage:事件名 <br> range: 长度不做限制，但建议设置合适的长度和名称。
         * @param params usage:可变长参数
         * @returns 返回事件发送结果
         * @example
         * 使用示例:创建一个名为"EventSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在客户端中看到每帧打印ok,代码如下：
         * ```
         * @Component
         *  export default class EventSample extends Script {
         *      protected async onStart(): Promise<void> {
         *          this.useUpdate = true;
         *          // 在客户端执行服务器发来的 eventOne 事件,并在客户端执行传入的函数逻辑
         *          // 客户端执行 eventOne 事件，传入的函数开始执行可以看作灯泡亮了
         *          if(SystemUtil.isClient()){
         *              Event.addServerListener("eventOne",()=>{console.log("ok")});
         *          }
         *      }
         *      protected onUpdate(dt: number): void {
         *          // 服务器每帧对所有客户端发送 eventOne 事件
         *          // 服务端发送 eventOne 事件可以看作灯的开关，每帧打开一次灯泡的开关
         *          if (SystemUtil.isServer()){
         *              Event.dispatchToAllClient("eventOne");
         *          }
         *      }
         *  }
         * ```
         */
        static dispatchToAllClient(eventName: string, ...params: unknown[]): DispatchEventResult;
        /**
         * @description 服务器发送不可靠事件给所有客户端，不可靠事件没有重发机制，当遭遇网络波动或者其他情况时会丢失
         * @author xiangkun.sun
         * @groups 基础类型/事件
         * @effect 只在服务端调用生效
         * @precautions 应在服务器逻辑里调用
         * @param eventName usage:事件名 <br> range: 长度不做限制，但建议设置合适的长度和名称。
         * @param params usage:可变长参数
         * @returns 返回事件发送结果
         * @example
         * 使用示例:创建一个名为"EventSample"的脚本，放置在对象管理器中，打开脚本，输入以下代码保存，运行游戏，你将在客户端中看到每帧打印ok,代码如下：
         * ```
         * @Component
         *  export default class EventSample extends Script {
         *      protected async onStart(): Promise<void> {
         *          this.useUpdate = true;
         *          // 在客户端执行服务器发来的 eventOne 事件,并在客户端执行传入的函数逻辑
         *          // 客户端执行 eventOne 事件，传入的函数开始执行可以看作灯泡亮了
         *          if(SystemUtil.isClient()){
         *              Event.addServerListener("eventOne",()=>{console.log("ok")});
         *          }
         *      }
         *      protected onUpdate(dt: number): void {
         *          // 服务器每帧对所有客户端发送 eventOne 事件
         *          // 服务端发送 eventOne 事件可以看作灯的开关，每帧打开一次灯泡的开关
         *          if (SystemUtil.isServer()){
         *              Event.dispatchToAllClientUnreliable("eventOne");
         *          }
         *      }
         *  }
         * ```
         */
        static dispatchToAllClientUnreliable(eventName: string, ...params: unknown[]): DispatchEventResult;
        /**
         * @description 移除事件监听器
         * @author mengyuan.hao
         * @groups 基础类型/事件
         * @effect 调用端生效
         * @param event usage:监听器
         */
        static removeListener(event: EventListener): void;
        /** **************************** 多场景需求 *******************************/
        /**
         * @description 注册场景级的事件，在同一个场景中的不同房间，都可以收到该事件广播
         * @groups 服务/传送
         * @effect 只在服务端调用生效
         * @param eventName usage:事件名称 <br> range: 长度不做限制，但建议设置合适的长度和名称。
         * @param callback usage:收到注册的事件时会触发的回调
         * @returns EventListener
         */
        static addSceneEventListener(eventName: string, callback: (data: string) => void): EventListener;
        /**
         * @description 注册游戏级的事件
         * @groups 服务/传送
         * @effect 只在服务端调用生效
         * @param eventName usage:事件名称 <br> range: 长度不做限制，但建议设置合适的长度和名称。
         * @param callback usage:收到注册的事件时会触发的回调
         * @returns EventListener
         */
        static addGameEventListener(eventName: string, callback: (data: string) => void): EventListener;
        /**
         * @description 广播场景级的事件，在同一个场景中的不同房间，都可以收到该事件广播
         * @groups 服务/传送
         * @effect 只在服务端调用生效
         * @param eventName usage:事件名称 <br> range: 长度不做限制，但建议设置合适的长度和名称。
         * @param data usage:携带的数据  <br> range: 长度不做限制。
         */
        static dispatchSceneEvent(eventName: string, data: string): void;
        /**
         * @description 广播游戏级的事件，在同一个游戏中的不同房间，都可以收到该事件广播
         * @groups 服务/传送
         * @effect 只在服务端调用生效
         * @param eventName usage:事件名称 <br> range: 长度不做限制，但建议设置合适的长度和名称。
         * @param data usage:携带的数据 <br> range: 长度不做限制。
         */
        static dispatchGameEvent(eventName: string, data: string): void;
    }
}
