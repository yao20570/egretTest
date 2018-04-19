/** 
 * 通用消息接口
 * @author yaowenhao
 * @since 2018年3月8日
 */
interface BaseMsg {
    /**
     * 接收消息处理
     * @param msg
     */
    receive(socket: egret.WebSocket): void;

    /**
     * 发送消息处理
     * @param msg
     */
    send(socket: egret.WebSocket, msg: any): void;

    /**
     * 消息解析,返回格式{head:XX, body:XX}
     * @param msg
     */
    decode(buf: egret.ByteArray): any;

    /**
     * 消息封装
     * @param msg
     */
    encode(msg: any): any;
}
