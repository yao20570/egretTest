class EctpyeProxy extends BaseProxy {
    public constructor($controller: BaseController) {
        super($controller);
        //注册从服务器返回消息的监听      
        this.receiveServerMsg(ProtoType.DRAGON_LOAD_RES, this.ectpyeLoadRes, this);
        this.receiveServerMsg(ProtoType.DRAGON_LOAD_CHAPTER_RES, this.sectionDataRes, this);
        this.receiveServerMsg(ProtoType.DRAGON_OUTPOST_PUSH, this.sectionDataPush, this);
        this.receiveServerMsg(ProtoType.DRAGON_UPDATE_PUSH, this.sectionUpdataPush, this);
        this.receiveServerMsg(ProtoType.DRAGON_SWEEP_RES, this.sweepRes, this);
        this.receiveServerMsg(ProtoType.DRAGON_CHALLENGE_RES, this.combatRes, this);
        this.receiveServerMsg(ProtoType.DRAGON_FEED_RES, this.feedRes, this);
    }

    public loadReq(username: string) {
        let msg: any = {};
        msg.type = ProtoType.DRAGON_LOAD_REQ;
        msg.body = {
            username: username
        };
        this.sendSocketMsg(msg);
    }
    public sectionDataReq(username: string, cid: number) {
        let msg: any = {};
        msg.type = ProtoType.DRAGON_LOAD_CHAPTER_REQ;
        msg.body = {
            username: username,
            cid: cid
        };
        this.sendSocketMsg(msg);
    }

    public sweepReq(sweepData:{username:string,oid:number,times:number,hsIds:string}) {
        let msg: any = {};
        msg.type = ProtoType.DRAGON_SWEEP_REQ;
        msg.body = sweepData
        this.sendSocketMsg(msg);
    }
    public combatReq(combatData:{username:string,oid:number,hsIds:string}) {
        let msg: any = {};
        msg.type = ProtoType.DRAGON_CHALLENGE_REQ;
        msg.body = combatData
        this.sendSocketMsg(msg);
    }
    public feedReq(oid:number) {
        let msg: any = {};
        msg.type = ProtoType.DRAGON_FEED_REQ;
        msg.body = {
            oid:oid
        };
        this.sendSocketMsg(msg);
    }

    private ectpyeLoadRes(obj: any) {
        this.applyFunc(EctpyeConst.LOAD_RES, obj);
    }
    private sectionDataRes(obj: any) {
        this.applyFunc(EctpyeConst.SECTION_RES, obj);
    }
    private sectionDataPush(obj: any) {
        this.applyFunc(EctpyeConst.PUSH_RES, obj);
    }
    private sectionUpdataPush(obj: any) {
        this.applyFunc(EctpyeConst.UPDATA_RES, obj);
    }
    private sweepRes(obj: any) {
        this.applyFunc(EctpyeConst.SWEEP_RES, obj);
    }
    private combatRes(obj: any) {
        this.applyFunc(EctpyeConst.COMBAT_RES, obj);
    }
    private feedRes(obj: any) {
        this.applyFunc(EctpyeConst.FEED_RES, obj);
    }
    
}