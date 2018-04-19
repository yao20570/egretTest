/**
 * 角色相关代理层
 */
class RoleProxy extends BaseProxy {
    public constructor($controller: BaseController) {
        super($controller);
        //注册从服务器返回消息的监听
        this.receiveServerMsg(ProtoType.AVATAR_RENAME_RES, this.roleRenameRes, this);
    }

    public roleLoadReq(username: string) {
        return new Promise((resolve, reject) => {            
            let msg: any = {};
            msg.type = ProtoType.AVATAR_LOAD_REQ;
            msg.body = {
                username: username
            };
            this.receiveServerMsgOnce(ProtoType.AVATAR_LOAD_RES, (obj) => {
                this.applyFunc(RoleConst.ROLE_LOAD_RES, obj);
                resolve("加载角色信息完成");
            }, this);
            this.sendSocketMsg(msg);
        });
    }
   

    public roleRankReq() {

        return new Promise((resolve, reject) => {            
            let msg: any = {};
            msg.type = ProtoType.RANK_LOOKMYSELF_RANK_REQ;
            msg.body = {};
            this.receiveServerMsgOnce(ProtoType.RANK_LOOKMYSELF_RANK_RES, (obj) => {
                this.applyFunc(RoleConst.ROLE_RANK_RES, obj);
                resolve("加载角色个人排行榜完成");
            }, this);
            this.sendSocketMsg(msg);
        });
    }

    public roleRenameReq(roleId: number, name: string, gender: number) {
        let msg: any = {};
        msg.type = ProtoType.AVATAR_RENAME_REQ;
        msg.body = {
            attrib_avatar_id: roleId,
            name: name,
            gender: gender
        };
        App.Socket.send(msg);
    }

    private roleRenameRes(obj: any) {
        this.applyFunc(RoleConst.ROLE_RENAME_RES, obj);
    }
}