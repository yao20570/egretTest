/**
 * 登陆控制器
 * @author ywh
 * @since 2018年3月13日
 */
class LoginController extends BaseController {
    //本模块的所有UI
   
    //本模块的Proxy
    private loginProxy: LoginProxy;

    public constructor() {
        super();
        //初始化Model
        new LoginModel(this);
        //初始化UI        

        //初始化Proxy
        this.loginProxy = new LoginProxy(this);

        //注册模块间、模块内部事件监听        
        this.registerFunc(LoginConst.DO_SOCKET_CLOSE, this.disconnect, this);      
        this.registerFunc(LoginConst.ROLE_LOGIN_REQ, this.roleLoginReq, this);
        this.registerFunc(LoginConst.ROLE_LOGIN_RES, this.roleLoginRes, this);
        this.registerFunc(LoginConst.ROLE_LOGIN_ERR, this.roleLoginErr, this);
    }    

    private async roleLoginReq() {
        let loginInfo = window["loginInfo"];
        let loginModel:LoginModel = <LoginModel>this.getModel();
        loginModel.initData(loginInfo);
        let lastServer = loginModel.lastServer;
        let hostInfo: string = lastServer.ad;
        let host: string = hostInfo.split(':')[0];
        let port: number = parseInt(hostInfo.split(':')[1]);
        let userName: string = loginModel.account;
        let token: string = loginModel.token;
        let userData = { "userName": userName, "token": token, "os": 1, "channel": 10000, "sid": lastServer.id, "ver": 0 };
        this.loginProxy.roleloginReq(host, port, userData);
    }

    private roleLoginRes(obj: any) {        
        if (obj.head.state == 200) { 
            let loginModel:LoginModel = <LoginModel>this.getModel();           
            App.ProxyUserKey = obj.body.key + loginModel.account;
            window["runSubProgress"].call(this,100,100);
            window["runMainProgress"].call(this,100);
            this.loading(loginModel);
        } else {
            Toast.showTipsDownToUp(obj.head.state + "错误, 请技术查证！");
        }
    }

    private roleLoginErr(obj: any): void {
        Toast.showTipsDownToUp("连接游戏服失败,请检查网络情况。");
    }

    private disconnect(obj: any): void {
        Toast.showTipsDownToUp("网络连接已断开~, 请刷新页面!");
    }

    private async loading(loginModel:LoginModel) {        
        try { 
            this.initModule();       
            await Promise.all([                
                App.ControllerManager.applyFunc(ControllerConst.Role, RoleConst.ROLE_LOAD_REQ, loginModel.account),
                App.ControllerManager.applyFunc(ControllerConst.Role, RoleConst.ROLE_RANK_REQ),
                App.ControllerManager.applyFunc(ControllerConst.Hero, HeroConst.HERO_LOAD_REQ),
                App.ControllerManager.applyFunc(ControllerConst.Build, BuildConst.BUILD_LOAD_REQ),
                App.ControllerManager.applyFunc(ControllerConst.Chart, ChartConst.CHART_LOAD_REQ),
                App.ControllerManager.applyFunc(ControllerConst.IronShop, IronShopConst.IronShop_LOAD_REQ)
            ]);
            
            window["jquery"]('#server').remove(); 
            App.SceneManager.runScene(SceneConsts.Game);
        } catch (error) {
            Toast.showTipsDownToUp("加载出错：" + error);
        }
    }


    /**
        * 初始化所有模块
        */
    private initModule(): void {
        App.ControllerManager.register(ControllerConst.Role, new RoleController());
        App.ControllerManager.register(ControllerConst.Hero, new HeroController());
        App.ControllerManager.register(ControllerConst.Home, new HomeController());
        App.ControllerManager.register(ControllerConst.Build, new BuildController());
        App.ControllerManager.register(ControllerConst.Fight, new FightController());
        App.ControllerManager.register(ControllerConst.Friend, new FriendController());
        App.ControllerManager.register(ControllerConst.Shop, new ShopController());
        App.ControllerManager.register(ControllerConst.Warehouse, new WarehouseController());
        App.ControllerManager.register(ControllerConst.Factory, new FactoryController());
        App.ControllerManager.register(ControllerConst.Task, new TaskController());
        App.ControllerManager.register(ControllerConst.Mail, new MailController());
        App.ControllerManager.register(ControllerConst.Ectpye, new EctpyeController());
        App.ControllerManager.register(ControllerConst.Chart, new ChartController());
        App.ControllerManager.register(ControllerConst.Palace,new PalaceController());
        App.ControllerManager.register(ControllerConst.IronShop, new IronShopController());
    }
}