/**
 * 铁匠铺代理层
 */
class IronShopProxy extends BaseProxy {
    public constructor($controller: BaseController) {
        super($controller);

        
        this.receiveServerMsg(ProtoType.EQUIP_MAKE_RES, this.resProduce, this);

    }

    // 掉线后的操作
    public onDisconn(): void {
        this.applyFunc(LoginConst.DO_SOCKET_CLOSE);
    }

    private roleLoginRes(obj: any) {
        this.applyFunc(LoginConst.ROLE_LOGIN_RES, obj);
    }

    /**
     * 请求武器信息
     */
    public reqEquipLoad() {
        return new Promise((resolve, reject) => {
            let msg: any = {};
            msg.type = ProtoType.EQUIP_LOAD_REQ;
            msg.body = {};
            this.receiveServerMsgOnce(ProtoType.EQUIP_LOAD_RES, (obj) => {
                this.applyFunc(IronShopConst.IronShop_LOAD_RES, obj);
                resolve("加载武器信息完成");
            }, this);
            this.sendSocketMsg(msg);
        });
    }

    /**
     * 打造武器
    */
    public reqProduce(eid: number) {
        let msg: any = {};
        msg.type = ProtoType.EQUIP_MAKE_REQ;
        msg.body = { eid: eid };
        this.sendSocketMsg(msg);
    }

    public resProduce(_data:any){
        /**错误飘窗*/
        GameUtils.showProtoErrorTip(_data.head.state)

        let equipModel = <EquipModel>App.ControllerManager.getControllerModel(ControllerConst.IronShop);
        equipModel.onReqEquipMake(_data.body);
    }
}