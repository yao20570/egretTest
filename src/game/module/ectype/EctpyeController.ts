/**
 * 副本控制器
 * @author lzf
 * @since 2018年3月19日
 */
class EctpyeController extends BaseController {
    //本模块的数据存储
    private ectpyeModel: EctpyeModel;
    //本模块的所有UI
    private ectpyeView: EctpyeView;
    private activity: Activity;
    private buyPower: BuyPower;
    private combat: Combat;
    private foodSupply: FoodSupply;
    private planFight: PlanFight;
    private section: Section;
    private windUp: WindUp;
    private payGlod: PayGlod;
    private costGold: CostGold;
    private recruit: Recruit;
    private sweep: Sweep;
    private account: string;
    //本模块的Proxy
    private ectpyeProxy: EctpyeProxy;
    public constructor() {
        super();
        //初始化Model
        this.ectpyeModel = new EctpyeModel(this);
        //初始化模块相关读表DB
        ConfigDb.ectypeConfig = new EctypeConfig(["dragon_chapter_json", "dragon_outposts_json", "npc_group_json", "npc_monster_json","item_resource_json"]);
        //初始化UI
        this.ectpyeView = new EctpyeView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Ectpye, this.ectpyeView);
        this.activity = new Activity(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Ectpye_Activity, this.activity);
        this.buyPower = new BuyPower(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.buyPower, this.buyPower);
        this.combat = new Combat(this, LayerManager.UI_Popup)
        App.ViewManager.register(ViewConst.Ectpye_combat, this.combat);
        this.foodSupply = new FoodSupply(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Ectpye_foodSupply, this.foodSupply);
        this.planFight = new PlanFight(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Ectpye_planFight, this.planFight);
        this.section = new Section(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Ectpye_section, this.section);
        this.windUp = new WindUp(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Ectpye_windUp, this.windUp);
        this.payGlod = new PayGlod(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Ectpye_Pay, this.payGlod);
        this.costGold = new CostGold(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Ectpye_Cost, this.costGold);
        this.recruit = new Recruit(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Ectpye_Recruit, this.recruit);
        this.sweep = new Sweep(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Ectpye_Sweep, this.sweep);
        //初始化Proxy
        this.ectpyeProxy = new EctpyeProxy(this);
        //注册本模块事件监听
        this.registerFunc(EctpyeConst.LOAD_REQ, this.loadReq, this);
        this.registerFunc(EctpyeConst.LOAD_RES, this.loadRes, this);
        this.registerFunc(EctpyeConst.SECTION_REQ, this.sectionReq, this);
        this.registerFunc(EctpyeConst.SECTION_RES, this.sectionRes, this);
        this.registerFunc(EctpyeConst.PUSH_RES, this.sectionPush, this);
        this.registerFunc(EctpyeConst.UPDATA_RES, this.sectionUpdata, this);
        this.registerFunc(EctpyeConst.SKIP_RES, this.skipRes, this);
        this.registerFunc(EctpyeConst.FOE_RES, this.foeRes, this);
        this.registerFunc(EctpyeConst.SWEEP_REQ, this.sweepReq, this);
        this.registerFunc(EctpyeConst.SWEEP_RES, this.sweepRes, this);
        this.registerFunc(EctpyeConst.COMBAT_REQ, this.combatReq, this);
        this.registerFunc(EctpyeConst.COMBAT_RES, this.combatRes, this);
        this.registerFunc(EctpyeConst.FEED_REQ, this.feedReq, this);
        this.registerFunc(EctpyeConst.FEED_RES, this.feedRes, this);
        this.registerFunc(EctpyeConst.MOREFEED_RES, this.moreFeedRes, this);
        this.registerFunc(EctpyeConst.SETTLE_RES, this.settleRes, this);
    }
    //进行副本加载
    private loadReq() {
        let loginModel: LoginModel = <LoginModel>App.ControllerManager.getControllerModel(ControllerConst.Login);

        this.account = loginModel.account;
        this.ectpyeProxy.loadReq(loginModel.account);
    }
    //加载副本成功后续操作...
    private loadRes(obj: any) {
        this.ectpyeModel.initData(obj);
        if (App.ViewManager.isShow(ViewConst.Ectpye)) {
            this.ectpyeView.updateSection();
            console.log("刷新数据===");
        } else {
            App.ViewManager.open(ViewConst.Ectpye);
        }
    }

    //副本加载文章数据
    private sectionReq(id: number) {
        this.ectpyeProxy.sectionDataReq(this.account, id);
    }
    //加载副本章节成功后续操作...
    private sectionRes(obj: any) {
        // console.log("加载副本章节成功后续操作",obj);
        this.ectpyeModel.initSectionData(obj);
        // this.ectpyeView.
        // 暂时没用上

    }
    //关卡数据推送 暂时没环境可以测 暂未处理
    private sectionPush(obj: any) {
        // console.log("关卡数据推送",obj);
        this.ectpyeModel.updataSectionData(obj);
        // this.ectpyeView.playAui(obj.o.id);
        // this.ectpyeView.openFeed();

    }
    //副本数据更新推送 暂时没环境可以测 暂未处理
    private sectionUpdata(obj: any) {
        // console.log("副本数据更新推送",obj);
        this.ectpyeModel.initSectionData(obj);
        this.ectpyeModel.initData(obj);
        // this.ectpyeView.isNewSection(id);
    }
    //点击章节列表跳转对应数据
    private skipRes(id: number) {
        this.ectpyeView.isNewSection(id);
    }
    //点击关卡取对应敌方战力 id：怪物组id outpostsOneData:章节组数据
    private foeRes(id: string, outpostsOneData: any) {
        App.ViewManager.open(ViewConst.Ectpye_planFight);
        let foePowerData = ConfigDb.ectypeConfig.getfoePowerData()[id];
        let monsters = foePowerData.monsterids.split(":");
        let monstersData = [];
        for (let i = 0; i < monsters.length; i++) {
            monstersData.push(ConfigDb.ectypeConfig.getMonsterData()[monsters[i]]);
        }
        console.log("id：怪物组id", foePowerData, monsters, monstersData, outpostsOneData);
        this.planFight.getFoeData(foePowerData, monstersData, outpostsOneData)
    }
    //扫荡关卡请求数据
    private sweepReq(obj) {
        this.ectpyeProxy.sweepReq(obj);
    }
    // 扫荡关卡数据返回
    private sweepRes(obj) {
        obj.sectionData
    }
    // 挑战关卡请求数据
    private combatReq(obj) {
        // console.log("obj",obj);
        obj.username = this.account;
        this.ectpyeProxy.combatReq(obj);
    }
    // 挑战关卡数据返回
    private combatRes(obj) {
        // console.log("副本数据更新",obj);
        // this.ectpyeModel.initSectionData(obj);
        // this.ectpyeModel.initData(obj);
        // 播放战斗
        App.ControllerManager.applyFunc(ControllerConst.Fight, FightConst.FIGHT, obj.body.report, ()=>{
            
            App.ViewManager.open(ViewConst.Ectpye_windUp,obj.body);
        });

        // 结算结果
        console.log("obj", obj);
    }
    // 军姿补给请求数据
    private feedReq(obj) {
        console.log("军姿补给请求数据", obj);
        // obj.username = this.account;
        this.ectpyeProxy.feedReq(obj);
    }
    // 军姿补给数据返回
    private feedRes(obj) {
        // console.log("副本数据更新",obj);
        // this.ectpyeModel.initSectionData(obj);
        // this.ectpyeModel.initData(obj);
        this.ectpyeView.updatePass(obj.body);
        this.applyFunc(EctpyeConst.LOAD_REQ);
        console.log("军姿补给数据返回", obj);
    }
    // 再次开启军资补给
    private moreFeedRes(obj) {
        console.log("副本数据更新", obj);
        App.ViewManager.open(ViewConst.Ectpye_foodSupply);
        this.foodSupply.updateInitUI(obj);
    }
    // 结算关闭后续操作
    private settleRes(obj) {
        this.ectpyeView.newPassAui(obj);
    }
}