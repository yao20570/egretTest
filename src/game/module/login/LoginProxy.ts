/**
 * 登陆代理层
 */
class LoginProxy extends BaseProxy {
    public constructor($controller: BaseController) {
        super($controller);
        //注册从服务器返回消息的监听        

        this.receiveServerMsg(SocketConst.SOCKET_CLOSE, this.onDisconn, this);

        this.receiveServerMsg(ProtoType.ACCOUNT_LOGIN_RES, this.roleLoginRes, this);
    }

    public async roleloginReq(host: string, port: number, userData: any) {
        await this.connect(host, port, userData);
    }

    private connect(host: string, port: number, userData: any) {
        return new Promise((resolve, reject) => {
            App.Socket.connect(host, port);
            this.receiveServerMsgOnce(SocketConst.SOCKET_CONNECT, () => {
                resolve("连接成功");
            }, this);
            this.receiveServerMsgOnce(SocketConst.SOCKET_CLOSE, () => {
                reject("连接失败");
            }, this);
        }).then(function () {
            var msg: any = {};
            msg.type = ProtoType.ACCOUNT_LOGIN_REQ;
            msg.body = {
                name: userData.userName,
                token: userData.token,
                channel: userData.channel,
                os: userData.os,
                sid: userData.sid,
                ver: userData.ver
            }
            this.sendSocketMsg(msg);
        }.bind(this)).catch(function (reason) {
            // 异常处理
            Log.trace('Failed: ' + reason);
            App.ControllerManager.applyFunc(ControllerConst.Login, LoginConst.ROLE_LOGIN_ERR, reason);
        });
    }
    // 掉线后的操作
    public onDisconn(): void {
        this.applyFunc(LoginConst.DO_SOCKET_CLOSE);
    }

    private roleLoginRes(obj: any) {
        this.applyFunc(LoginConst.ROLE_LOGIN_RES, obj);
    }

}