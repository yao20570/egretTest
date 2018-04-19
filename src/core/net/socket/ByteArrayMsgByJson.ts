/** 
 * ByteArray消息解析
 * @author yaowenhao
 * @since 2018年3月8日
 */
class ByteArrayMsgByJson extends ByteArrayMsg {

    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 消息解析
     * @param msg
     */
    public decode(msgBuffer: egret.ByteArray): any {
        let head = this.decodeHead(msgBuffer);
        if (msgBuffer.bytesAvailable >= head.len) {
            let bytes: egret.ByteArray = new egret.ByteArray();
            msgBuffer.readBytes(bytes, 0, head.len);
            let body = this.decodeBody(head.ver, bytes);
            var msg: any = {};
            msg.head = head;
            msg.body = JSON.parse(body);
            Log.trace("RECEIVE:[type=" + head.protoType + ", ver=" + head.ver + ", state=" + head.state + "]", msg.body);
            return msg;
        } else {
            Log.trace("decode遇到问题,请联系ywh查证", head);
            return null;
        }
    }

    private decodeHead(msgBuffer: egret.ByteArray): any {
        let head: any = {};
        head.protoType = msgBuffer.readShort();
        head.len = msgBuffer.readInt();
        head.pid = msgBuffer.readInt();
        head.ver = msgBuffer.readByte();
        head.state = msgBuffer.readInt();
        return head;
    }

    private decodeBody(ver: number, bytes: egret.ByteArray): string {
        let body: string = "{}";
        if (ver == SocketConst.FLATER) {
            let byteArray = pako.inflate(bytes.bytes);
            body = new egret.ByteArray(byteArray).readUTFBytes(byteArray.length);
        } else if (ver == SocketConst.XXTE) {
            let key: string = App.ProxyUserKey;
            body = App.XxteaUtils.decryptByte(bytes, key);
        } else {
            body = bytes.readUTFBytes(bytes.length);
        }
        return body;
    }

    /**
     * 消息封装
     * @param msg
     */
    public encode(msg: any): egret.ByteArray {
        let protoType = Number(msg.type); 
        let sendMsg: egret.ByteArray;
        if(ProtoType.ACCOUNT_LOGIN_REQ == protoType){
            sendMsg = this.encodeNormal(msg);
        }else{
            sendMsg = this.encodeXXTEA(msg);
        }
        return sendMsg;
    }

    private encodeNormal(msg:any): egret.ByteArray{
        let protoType = msg.type;        
        let msgBody = msg.body;
        let bodyBytes: string = JSON.stringify(msgBody);
        let sendMsg: egret.ByteArray = new egret.ByteArray();
        let ver = 0;
        if (bodyBytes.length > 2) {
            let byteArray = pako.deflate(bodyBytes);
            let bodyArray = new egret.ByteArray(byteArray);
            ver = SocketConst.FLATER;
            sendMsg.writeShort(protoType);
            sendMsg.writeInt(bodyArray.length);
            sendMsg.writeInt(0);
            sendMsg.writeByte(ver);
            sendMsg.writeInt(0);
            sendMsg.writeBytes(bodyArray);
        } else {
            sendMsg.writeShort(protoType);
            sendMsg.writeInt(bodyBytes.length);
            sendMsg.writeInt(0);
            sendMsg.writeByte(ver);
            sendMsg.writeInt(0);
            sendMsg.writeUTFBytes(bodyBytes);
        }
        Log.trace("SEND：[type=" + protoType + ", ver=" + ver + "]", msg.body);
        return sendMsg;
    }

    private encodeXXTEA(msg:any): egret.ByteArray{
        let protoType = msg.type;        
        let msgBody = msg.body;
        let bodyBytes = JSON.stringify(msgBody); // TODO ywh 非最终版本
        let encryptDataBytes:egret.ByteArray = App.XxteaUtils.encryptStrToByte(bodyBytes,App.ProxyUserKey);
        let sendMsg: egret.ByteArray = new egret.ByteArray();
        sendMsg.writeShort(protoType);
        sendMsg.writeInt(encryptDataBytes.length);
        sendMsg.writeInt(0);
        sendMsg.writeByte(SocketConst.XXTE);
        sendMsg.writeInt(0);
        sendMsg.writeBytes(encryptDataBytes);
        Log.trace("SEND：[type=" + protoType + ", ver=" + SocketConst.XXTE + "]", msg.body);
        return sendMsg;
    }
}