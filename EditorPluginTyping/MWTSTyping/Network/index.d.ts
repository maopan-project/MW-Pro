declare namespace mw {
    /**
     * @author si.wu
     * @groups 玩法/其他
     * @description HTTP请求信息的对象
     * @networkStatus usage:双端
     */
    interface RequestInit {
        /** @description HTTP请求类型 */
        method?: "POST" | "PUT" | "GET";
        /** @description HTTP请求头 */
        headers?: {
            [key: string]: string;
        };
        /** @description HTTP请求体 */
        body?: string;
    }
    /**
     * @author si.wu
     * @groups 玩法/其他
     * @description HTTP响应信息的对象
     * @networkStatus usage:双端
     */
    interface Response {
        /** @description 响应头 */
        headers: Map<string, string>;
        /** @description 响应类型 */
        type: string;
        /** @description 响应URL */
        url: string;
        /** @description 是否成功（状态码是否为200） */
        ok: boolean;
        /** @description 响应状态码 */
        status: number;
        /**
         * @groups 玩法/其他
         * @description 数据返回文本
         * @effect 调用端生效
         * @returns 数据返回文本
         */
        text(): Promise<string>;
        /**
         * @groups 玩法/其他
         * @description 数据返回json
         * @effect 调用端生效
         * @returns 数据返回json
         */
        json<T>(): Promise<T>;
    }
    /**
     * @author si.wu
     * @description HTTP请求
     * @groups 玩法
     * @effect 调用端生效
     * @param url usage:url range: 不做限制
     * @param init usage:请求信息 default:请求信息
     * @returns 响应信息
     */
    function fetch(url: string, init?: RequestInit): Promise<Response>;
    /**
     * @author si.wu
     * @description url转码
     * @groups 玩法
     * @effect 调用端生效
     * @param str usage:内容 range: 不做限制
     * @returns 转码后的内容
     */
    function urlEncode(str: string): string;
    /**
     * @author si.wu
     * @description url解码
     * @groups 玩法
     * @effect 调用端生效
     * @param str usage:内容 range: 不做限制
     * @returns 解码后的内容
     */
    function urlDecode(str: string): string;
    /**
     * @author si.wu
     * @description 获取 url 参数
     * @groups 玩法
     * @effect 调用端生效
     * @param url  usage:url range: 不做限制，依据具体的 url 的长度
     * @param parameterName  usage:参数名 range: 不做限制
     * @returns 参数值
     */
    function getUrlParameter(url: string, parameterName: string): string;
}

/**
 * @author junwen.hua
 * @description 暴露给用户使用的Http请求接口,用户可选的是网络身份(服务器,客户端)
 */
declare namespace mw {
    /**
     * @author junwen.hua
     * @description 开放给用户用的URL枚举，需要与C++层的枚举对应
     * @groups 玩法
     */
    enum HttpRequestURL {
        /** CobblestoneService */
        CobblestoneService = 0,
        /** Resource */
        Resource = 1,
        /** Gateway */
        Gateway = 2,
        /** Developers */
        Developers = 3,
        /** Tasks */
        Tasks = 4,
        /** Games */
        Games = 5,
        /** MGS */
        MGS = 6,
        /** Register */
        Register = 7,
        /** Login */
        Login = 8,
        /** Packages */
        Packages = 9,
        /** Pandora */
        Pandora = 10,
        /** Translation */
        Translation = 11
    }
    /**
     * @author junwen.hua
     * @description 开发给用户用的Http请求类型枚举
     * @groups 玩法
     */
    enum HttpRequestType {
        /**
         * Get请求
         */
        Get = 0,
        /**
         * Post请求
         */
        Post = 1
    }
    /**
     * @author junwen.hua
     * @description Http请求的回调消息格式
     * @groups 基础类型
     * @precautions 无需主动销毁，生命周期由UObject管理
     * @param result usage: 请求否成功
     * @param content usage: 消息内容
     * @param responseCode usage: 状态码
     */
    type HttpResponse = (result: boolean, content: string, responseCode: number) => void;
    /**
     * @author junwen.hua
     * @description 商城通信回调消息格式
     * @groups 基础类型
     * @param isSuccess usage: 通信结果
     * @param content usage: 消息内容
     */
    type TransactionType = (isSuccess: boolean, content: string) => void;
    /**
     * @author junwen.hua
     * @description Http请求接口
     * @groups 玩法
     * @effect 调用端生效
     * @param response usage: 请求的回调
     * @param paramUrl usage: 请求的参数和值  range: 不做限制
     * @param jsonContent usage: 请求数据内容，json格式  range: 不做限制
     * @param requestType usage: 请求类型。HttpRequestType枚举值
     * @returns 请求是否发送成功
     */
    function httpRequestTransmitData(response: HttpResponse, paramUrl: string, jsonContent: string, requestType: HttpRequestType): boolean;
    /**
     * @author junwen.hua
     * @groups 玩法
     * @description 通用 Http 请求
     * @effect 调用端生效
     * @param response usage:OnHttpResponse
     * @param requestUrl usage:EHttpRequestURL
     * @param param usage:string  range: 不做限制
     * @param jsonContent usage:any
     * @param requestType usage:0是Get 1是Post
     * @returns bool
     * @example
     * 使用示例:发送Http请求
     * ```
     * generalHttpRequest(Response,Url,Param,JsonContent)
     * ```
     */
    function generalHttpRequest(response: HttpResponse, requestUrl: HttpRequestURL, param: string, jsonContent: any, requestType: HttpRequestType): boolean;
}
