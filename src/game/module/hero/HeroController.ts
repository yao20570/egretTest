class HeroController extends BaseController {	
    private heroView:HeroView;
    private heroInfoView:HeroInfoView;
    private heroAttributeView:HeroAttributeView;
    private heroTrainView:HeroTrainView;
    private heroSoulView:HeroSoulView;
    private heroForwardView:HeroForwardView;
   

    //本模块的Proxy
    private heroProxy: HeroProxy;
    
    public constructor() {
        super();  
        //初始化Model
        new HeroModel(this);
        //初始化本模块配表系统相关
        ConfigDb.heroConfig = new HeroConfig(["hero_advance_json","hero_base_json","hero_exp_json","hero_init_json","hero_skill_json","hero_train_json"]);
        this.heroView = new HeroView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Hero, this.heroView);

        this.heroInfoView = new HeroInfoView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.HeroInfo, this.heroInfoView);

        this.heroAttributeView = new HeroAttributeView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.HeroAttribute, this.heroAttributeView);

        this.heroTrainView = new HeroTrainView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.HeroTrain, this.heroTrainView);

        this.heroSoulView = new HeroSoulView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.HeroSoul, this.heroSoulView);

        this.heroForwardView = new HeroForwardView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.HeroForward, this.heroForwardView);

        //初始化Proxy
        this.heroProxy = new HeroProxy(this);

        //注册代理消息
        this.registerFunc(HeroConst.HERO_LOAD_REQ, this.heroLoadReq, this);
        this.registerFunc(HeroConst.HERO_LOAD_RES, this.heroLoadRes, this);
        
    }

    private heroLoadReq() {
       return this.heroProxy.heroLoadReq();
    }

    private heroLoadRes(obj: any) {
        //加载武将信息成功后续操作...
        let heroModel:HeroModel = <HeroModel>this.getModel();
        heroModel.initData(obj);//初始化武将信息        
    }
}