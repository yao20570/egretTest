/*
 * @Author: Liuxn 
 * @Date: 2018-04-04 16:12:42 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-04 17:23:57
 */
/**
 * 建筑相关代理层
*/
class BuildProxy extends BaseProxy{

    public constructor($controller: BaseController) {
        super($controller);
        //注册从服务器返回消息的监听
        //this.receiveServerMsg(ProtoType.BUILD_LOAD_RES, this.roleRenameRes, this);
    }

    public buildLoadReq(){
        return new Promise((resolve,reject)=>{
            let msg: any = {};
            msg.type = ProtoType.BUILD_LOAD_REQ;
            msg.body = {};
            this.receiveServerMsgOnce(ProtoType.BUILD_LOAD_RES,(obj)=>{
                this.applyFunc(BuildConst.BUILD_LOAD_RES,obj);
                resolve("加载建筑信息完成");
                reject("加载建筑信息失败");
            },this);
            this.sendSocketMsg(msg);
        });
    }
}