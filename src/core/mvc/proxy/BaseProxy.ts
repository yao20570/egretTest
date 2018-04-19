/** 
 * Proxy基类
 */
class BaseProxy {
    private _controller: BaseController;

    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor($controller: BaseController) {
        this._controller = $controller;
    }

    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 参数
     *
     */
    public applyFunc(key: any, ...param: any[]): any {
        return this._controller.applyFunc.apply(this._controller, arguments);
    }

    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    public applyControllerFunc(controllerKey: number, key: any, ...param: any[]): any {
        return this._controller.applyControllerFunc.apply(this._controller, arguments);
    }

    /**
     * 注册从服务器返回消息的监听
     * @param key 消息标识
     * @param callbackFunc 处理函数
     * @param callbackObj 处理函数所属对象
     */
    public receiveServerMsg(key: any, callbackFunc: Function, callbackObj: any): void {
        App.MessageCenter.addListener(key, callbackFunc, callbackObj);
    }

    /**
     * 注册从服务器返回消息的监听，仅一次，执行完成后删除
     * @param key 消息标识
     * @param callbackFunc 处理函数
     * @param callbackObj 处理函数所属对象
     */
    public receiveServerMsgOnce(key: any, callbackFunc: Function, callbackObj: any): void {
        var callback: Function = function (...param: any[]): void {
            this.removeServerMsg(key, callback, this);
            callbackFunc.apply(callbackObj, param);
        }
        this.receiveServerMsg(key, callback, this);
    }

    /**
     * 注册从Http服务端返回的Update消息
     * @param key 消息标识
     * @param callbackFunc 处理函数
     * @param callbackObj 处理函数所属对象
     */
    public receiveServerHttpUpdateMsg(key: any, callbackFunc: Function, callbackObj: any): void {
        this.receiveServerMsg(key + "_HttpUpdate", callbackFunc, callbackObj);
    }

    /**
     * 注册从Http服务端返回的Update消息，仅一次，执行完成后删除
     * @param key 消息标识
     * @param callbackFunc 处理函数
     * @param callbackObj 处理函数所属对象
     */
    public receiveServerHttpUpdateMsgOnce(key: any, callbackFunc: Function, callbackObj: any): void {
        this.receiveServerMsgOnce(key + "_HttpUpdate", callbackFunc, callbackObj);
    }

    /**
     * 移除服务端返回消息的监听
     * @param key 消息标识
     * @param callbackFunc 处理函数
     * @param callbackObj 处理函数所属对象
     */
    public removeServerMsg(key: any, callbackFunc: Function, callbackObj: any): void {
        App.MessageCenter.removeListener(key, callbackFunc, callbackObj);
    }

    /**
     * 移除从Http服务端返回的Update消息
     * @param key 消息标识
     * @param callbackFunc 处理函数
     * @param callbackObj 处理函数所属对象
     */
    public removeServerHttpUpdateMsg(key: any, callbackFunc: Function, callbackObj: any): void {
        this.removeServerMsg(key + "_HttpUpdate", callbackFunc, callbackObj);
    }

    /**
     * 发送消息到Socket服务器
     */
    public sendSocketMsg(msg: any): void {
        App.Socket.send(msg);
    }

    /**
     * 发送消息到Http服务端
     * @param type 消息标识 
     * @param url  例如: /action/user/login or http://xxx/yy/zz
     * @param paramMap 消息参数 例如: var paramObj:{[key:string]:string}} = {"uName":uName, "uPass":uPass};
     */
    public sendHttpMsg(url: string, paramMap: { [key: string]: string }): void {
        App.Http.send(url, this.getURLVariables(paramMap));
    }

    /**
     * 将参数转换为URLVariables
     * @param encrypt
     * @param paramMap
     * @returns {egret.URLVariables}
     */
    private getURLVariables(paramMap: { [key: string]: string }): egret.URLVariables {
        let params: string = "";
        for (let key in paramMap) {
            let value = paramMap[key];
            let encodeValue = encodeURIComponent(value);
            if (params.length > 0) {
                params += "&"
            }
            params += key + "=" + encodeValue;
        }
        Log.trace("请求参数：", params)
        let encryptByte = App.XxteaUtils.encryptStrToByte(params, App.GlobalData.EncryptKey);
        let encryptData = egret.Base64Util.encode(encryptByte.buffer);
        let finalEncryptData = encodeURIComponent(encryptData);
        // Log.trace("密文：", finalEncryptData)
        let variables: egret.URLVariables = new egret.URLVariables("p=" + finalEncryptData);
        return variables;
    }

}
