class ChartProxy extends BaseProxy {

    public constructor($controller: BaseController) {
        super($controller);
        //注册从服务器返回消息的监听
        this.receiveServerMsg(ProtoType.CHAT_MSG_PUSH, this.msgPushRes, this);
        this.receiveServerMsg(ProtoType.CHAT_MSG_RES, this.chartRes, this);
    }

    private msgPushRes(data: any) {
        this.applyFunc(ChartConst.CHART_DATA_PUSH, data.body);
    }

    public loadReq() {
        return new Promise((resolve, reject) => {
            var msg: any = {};
            msg.type = ProtoType.CHAT_LOADRECORD_REQ;
            msg.body = {};
            this.sendSocketMsg(msg);
            this.receiveServerMsgOnce(ProtoType.CHAT_LOADRECORD_RES, (data) => {
                this.applyFunc(ChartConst.CHART_LOAD_RES, data.body);
                resolve();
            }, this);
        });
    }
    /** 自己世界聊天 */
    private chartRes(data) {
        console.log("自己世界聊天",data)
        // this.applyFunc(ChartConst.CHART_MSG_RES,data);
        }

    /**
     * 发送聊天消息
     */
    public sendChartMsg(accId: number, content: string, accName?: string) {
        var msg: any = {};
        msg.type = ProtoType.CHAT_MSG_REQ;
        msg.body = {
            accperId: accId,
            content: content
        };
        if (accName) {
            msg.body.accName = accName;
        }
        this.sendSocketMsg(msg);
    }
}