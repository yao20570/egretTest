/**
 * Created by yangsong on 15-3-27.
 * ProtoBuf测试
 */
class SocketTest {
    public constructor() {
        App.ResourceUtils.loadGroup("preload_core", this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete(): void {
        App.Init();
        this.socketTest();
        this.httpTest();
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(itemsLoaded: number, itemsTotal: number): void {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    }

    private socketTest(): void {
        //发送一条消息到服务器
        function send(): void {
            var msg: any = {};
            msg.type = ProtoType.ACCOUNT_LOGIN_REQ;
            msg.body = {
                name: "cafebabe",
                token: "ASBC",
                channel: -999,
                os: 1,
                sid: 2,
                ver: 3
            };
            App.Socket.send(msg);
        }

        App.Socket.connect("192.168.1.70", 11083);
        App.MessageCenter.addListener(SocketConst.SOCKET_CONNECT, () => {
            Log.trace("与服务器连接上");
            send();
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_RECONNECT, () => {
            Log.trace("与服务器重新连接上");
            send();
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_START_RECONNECT, () => {
            Log.trace("开始与服务器重新连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_CLOSE, () => {
            Log.trace("与服务器断开连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_NOCONNECT, () => {
            Log.trace("服务器连接不上");
        }, this);
        App.MessageCenter.addListener(ProtoType.ACCOUNT_LOGIN_RES, function (msg): void {
            Log.trace("收到服务器消息:", msg);
            App.ProxyUserKey = msg.body.key + "cafebabe";
            var msg: any = {};
            msg.type = ProtoType.AVATAR_LOAD_REQ;
            msg.body = {};
            App.Socket.send(msg);
        }, this);
    }

    private httpTest(): void {
        function getURLVariables(paramMap: { [key: string]: string }): egret.URLVariables {
            let params: string = "";
            for (let key in paramMap) {
                let value = paramMap[key];
                let encodeValue = encodeURIComponent(value);
                if (params.length > 0) {
                    params += "&"
                }
                params += key + "=" + encodeValue;
            }
            Log.trace("参数：", params)
            let encryptByte = App.XxteaUtils.encryptStrToByte(params, App.GlobalData.EncryptKey);
            let encryptData = egret.Base64Util.encode(encryptByte.buffer);
            let finalEncryptData = encodeURIComponent(encryptData);
            Log.trace("密文：", finalEncryptData)
            let variables: egret.URLVariables = new egret.URLVariables("p=" + finalEncryptData);
            return variables;
        }
        //发送一条消息到服务器
        function send(): void {
            var msg: any = { channel: 10000, acc: "r06654330w", pwd: "54330w" };
            App.Http.send(HttpConst.USER_LOGIN_URL, getURLVariables(msg));
        }
        App.MessageCenter.addListener(HttpConst.USER_LOGIN_URL, function (msg): void {
            Log.trace("收到服务器消息:", msg);
        }, this);
        send();
    }


}