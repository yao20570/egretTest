/**
 * 账号数据
 */
class LoginModel extends BaseModel {
    public saveAllServers: any;
    public myServers: any;
    public lastServer: any;
    public account: string;
    public token: string;

    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor($controller: BaseController) {
        super($controller);
    }

    public initData(loginInfo: any) {
        this.saveAllServers = loginInfo.saveAllServers;
        this.myServers = loginInfo.myServers;
        this.lastServer = loginInfo.lastServer;
        this.account = loginInfo.account;
        this.token = loginInfo.token;
    }
}
