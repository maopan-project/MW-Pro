declare namespace mw {
    /**
     * @description 数据储存返回代码
     * @author xiangkun.sun
     * @groups 数据处理
     */
    enum DataStorageResultCode {
        /** 操作成功 */
        Success = 200,
        /** 未知错误失败 */
        Failure = 400,
        /** 非法调用 只可服务端调用 */
        OnlyServerCall = 402,
        /** 非法调用 只可客户端调用 */
        OnlyClientCall = 403,
        /** 请求超时未回调 */
        TimeOut = 408,
        /** 某条key获取数据异常时数据被锁定，再次获取此key的数据正常时会解锁 */
        DataLock = 410,
        /** 请求间隔错误 */
        RequestIntervalTooClose = 423,
        /** 请求频率过高 */
        RequestTooFrequent = 424,
        /** key或者value格式错误(或后端参数校验失败)，key大小不能大于50字节，value大小不能大于64kb，且本地存储的总数据大小不可以超过5mb */
        KeyValueError = 1010,
        /** gameId格式错误或后端传参错误 */
        GameIdError = 1011,
        /** 系统异常 */
        SystemException = 1999,
        /** 服务端调用的远程服务异常 */
        ServerException = 1964,
        /** 没有访问对应资源的权限 */
        ResourceException = 1400,
        /** 参数不符合业务所需参数格式 */
        ParametersException = 1012,
        /** 请求Method错误 */
        RequestMethodNotSupported = 405,
        /** 数据不存在,服务端通用异常状态码，在数据存储中常见于没有授权数据 */
        DataNotExist = 1016
    }
    /**
     * @description 数据储存返回值
     * @author xiangkun.sun
     * @groups 数据处理
     */
    interface DataStorageResult {
        /**
         * @description 数据储存返回代码
         */
        code: DataStorageResultCode;
        /**
         * @description 数据储存的数据值
         */
        data: any;
    }
    /**
     * @author xiangkun.sun
     * @groups 数据处理
     * @description 数据存储
     * @precautions 在调用DataStorage相关接口时，每一个Key的对应值在数据服务器的读取和修改都有频率限制，主要表现在：接口调用时至一分钟前的时间区间内，某个Key的对应值在后端数据服务器上被获取Get、改写Set、删除Remove的总次数不能超过 (60+游戏设定的最大人数×10)次，不管它是在哪个服务器被操作的；如果时间区间内超限，请求会失败，然后Set、Remove会返回 FREQUENCY_OVERRUN(操作失败：请求频率超限) 而Get会catch到error timeout。
     * 1. 这些限制是数据服务器层面针对单个Key来的，每个Key之间的限制互相独立，和游戏服务器无关。
     * 2. Player相关的接口其实也算是一个Key，只不过是和玩家信息强相关的Key，也会受到上述限制；建议用 asyncSetData(属性名+玩家id+其他描述, 要存的值)来分存玩家相关的需要经常存取数据，以免堵塞。
     * 3. 对于玩家相关的信息，建议在ts层建立数据缓存，进行一定的数据托管；即通过ts脚本逻辑让DS服务器临时缓存玩家数据，只在初始化的时候进行get，在离线或其他必要时set，以减轻对后端数据服务器的压力，保证稳定性
     * @networkStatus usage:双端
     */
    class DataStorage {
        /**
         * @description 返回data的当前大小。单位为byte（字节）。
         * @author xiangkun.sun
         * @groups 数据处理
         * @effect 调用端生效
         * @param data usage: 数据键值对对象。
         * @returns 数据大小
         */
        static getDataSize(data: any): number;
        /**
         * @description 异步设置自定义数据
         * @author xiangkun.sun
         * @groups 数据处理
         * @effect 只在服务端调用生效
         * @param key usage:字符串类型的键，用来唯一标识存储的数据。<br> range: 字符串长度不做限制，但请设置合适的标识。
         * @param value usage:要保存的数据，不支持 map 类型及数据结构中包含 map，且无法还原 function
         * @returns 数据储存状态
         */
        static asyncSetData(key: string, value: any): Promise<DataStorageResultCode>;
        /**
         * @description 异步获取自定义数据
         * @author xiangkun.sun
         * @groups 数据处理
         * @effect 只在服务端调用生效
         * @param key usage:字符串类型键，用来查找唯一标识存储的数据 <br> range: 字符串长度依据 asyncSetData 设置的而定。
         * @returns 之前保存的自定义数据
         */
        static asyncGetData(key: string): Promise<DataStorageResult>;
        /**
         * @description 异步删除自定义数据
         * @author xiangkun.sun
         * @groups 数据处理
         * @effect 只在服务端调用生效
         * @param key usage:字符串类型键，用来查找唯一标识存储的数据 <br> range: 字符串长度依据 asyncSetData 设置的而定。
         * @returns 数据删除状态
         */
        static asyncRemoveData(key: string): Promise<DataStorageResultCode>;
        /**
         * @description 设置数据存储环境是否是临时的
         * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:037 reason:接口废弃 replacement:客户端本地存储请使用LocalData相关接口,接口移除后，服务端将默认为永久存储。
         * @author xiangkun.sun
         * @groups 数据处理
         * @effect 只在服务端调用生效
         * @param isTemporary usage:true代表临时存储，数据在游戏服务器进程中，游戏退出时数据被删除。false为永久存储，数据存储在专用服务器，游戏退出时数据不会被删除。
         */
        static setTemporaryStorage(isTemporary: boolean): void;
        /**
         * @description 异步获取其他游戏保存的数据
         * @author xiangkun.sun
         * @groups 数据处理
         * @effect 只在服务端调用生效
         * @param gameId usage:开发者后台其他游戏的 gameId。<br> range: 字符串长度依据 gameId 长度而定。
         * @param key usage:字符串类型键，用来查找唯一标识存储的数据。 <br> range: 字符串长度依据设置长度而定。
         * @returns 其他游戏保存的数据
         */
        static asyncGetOtherGameData(gameId: string, key: string): Promise<DataStorageResult>;
        /**
         * @description 异步设置其他游戏保存的数据
         * @author xiangkun.sun
         * @groups 数据处理
         * @effect 只在服务端调用生效
         * @param gameId usage:开发者后台其他游戏的 gameId <br> range: 字符串长度依据 gameId 长度而定。
         * @param key usage:字符串类型键，用来查找唯一标识存储的数据  <br> range: 字符串长度依据设置长度而定。
         * @param value usage:要保存的数据，不支持 map 类型及数据结构中包含 map，且无法还原 function
         * @returns 设置其他游戏的数据状态码
         */
        static asyncSetOtherGameData(gameId: string, key: string, value: any): Promise<DataStorageResultCode>;
        /**
         * @description 设置本地数据
         * @precautions 每条数据最多存储64kb的编码数据且本地存储的总数据大小不可以超过5mb，超过此限制的数据都不能被存储。
         * @author xiangkun.sun
         * @groups 数据处理
         * @effect 只在客户端调用生效
         * @param key usage:字符串类型的键，用来唯一标识存储的数据。<br> range: 字符串长度不做限制，但请设置合适的标识。
         * @param value usage:要保存的数据，不支持 map 类型及数据结构中包含 map，且无法还原 function
         * @returns 数据储存状态
         */
        static asyncSetLocalData(key: string, value: any): Promise<DataStorageResultCode>;
        /**
         * @description 获取本地数据
         * @author xiangkun.sun
         * @groups 数据处理
         * @effect 只在客户端调用生效
         * @param key usage:字符串类型的键，用来唯一标识存储的数据。<br> range: 字符串长度不做限制，但请设置合适的标识。
         * @returns 数据获取结果
         */
        static asyncGetLocalData(key: string): Promise<DataStorageResult>;
        /**
         * @description 删除本地数据
         * @author xiangkun.sun
         * @groups 数据处理
         * @effect 只在客户端调用生效
         * @param key usage:字符串类型的键，用来唯一标识存储的数据。<br> range: 字符串长度不做限制，但请设置合适的标识。
         * @returns 数据删除状态
         */
        static asyncRemoveLocalData(key: string): Promise<DataStorageResultCode>;
    }
}
