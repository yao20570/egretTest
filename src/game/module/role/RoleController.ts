/**
 * 角色控制器
 */
class RoleController extends BaseController {    
    private roleInfoView: RoleInfoView;
    private roleRenameView: RoleRenameView;
    private roleHeadView: RoleHeadView;
    private gameHelpView: GameHelpView;
    private gameSetView: GameSetView;

    //本模块的Proxy
    private roleProxy: RoleProxy;

    public constructor() {
        super();
        //初始化Model
        new RoleModel(this);  

        //初始化模块相关读表DB
        ConfigDb.roleConfig = new RoleConfig(["avatar_init_json", "avatar_lv_up_json","avatar_name_json","country_banneret_json"]);

        this.roleInfoView = new RoleInfoView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.RoleInfo, this.roleInfoView);

        this.roleRenameView = new RoleRenameView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.RoleRename, this.roleRenameView);

        this.roleHeadView = new RoleHeadView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.RoleHead, this.roleHeadView);

        this.gameHelpView = new GameHelpView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.GameHelp, this.gameHelpView);

        this.gameSetView = new GameSetView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.GameSet, this.gameSetView);

        //初始化Proxy
        this.roleProxy = new RoleProxy(this);

        //注册代理消息
        this.registerFunc(RoleConst.ROLE_LOAD_REQ, this.roleLoadReq, this);
        this.registerFunc(RoleConst.ROLE_LOAD_RES, this.roleLoadRes, this);

        this.registerFunc(RoleConst.ROLE_RANK_REQ, this.roleRankReq, this);
        this.registerFunc(RoleConst.ROLE_RANK_RES, this.roleRankRes, this);

        this.registerFunc(RoleConst.ROLE_RENAME_REQ, this.roleRenameReq, this);
        this.registerFunc(RoleConst.ROLE_RENAME_RES, this.roleRenameRes, this);
    }

    public roleLoadReq(account: string) {
       return this.roleProxy.roleLoadReq(account);
    }

    private roleLoadRes(obj: any) {
        let roleModel:RoleModel = <RoleModel>this.getModel();
        //加载角色成功后续操作...
        roleModel.initData(obj);//初始化角色信息        
    }


    private roleRankReq() {
        //进行角色世界排行榜加载
        this.roleProxy.roleRankReq();
    }

    private roleRankRes(obj: any) {
        let roleModel:RoleModel = <RoleModel>this.getModel();
        //加载角色世界排行榜成功后续操作...
        let body: any = obj.body;
        roleModel.rank = body.wr;       
    }

    private roleRenameReq(roleId: number, name: string, gender: number) {
        //进行角色改名
        this.roleProxy.roleRenameReq(roleId, name, gender);
    }

    private roleRenameRes(obj: any) {
        let roleModel:RoleModel = <RoleModel>this.getModel();
        //角色改名成功后续操作...
        let head: any = obj.head;
        if (head && 200 == head.state) {
            let body: any = obj.body;
            roleModel.roleName = body.n;
            //刷新主公信息
            this.roleInfoView.refreshData(roleModel);
            Toast.showTipsDownToUp("改名成功", false);
            App.ViewManager.close(ViewConst.RoleRename);
        } else {
            Toast.showTipsDownToUp("改名失败", true);
        }


    }
}