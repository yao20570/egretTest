/**
 * 铁匠铺模块
 */
class IronShopController extends BaseController {

    private ironShopView: IronShopView;
    private ironShopProxy: IronShopProxy;

    public constructor() {
        super();

        /**读取配置*/
        ConfigDb.equipConfig = new EquipConfig(["attribute_base_json",
            "equip_base_json",
            "equip_train_attr_json",
            "equip_init_json",
            "equip_strprob_json"]);
        ConfigDb.itemConfig = new ItemConfig(["item_resource_json"]);
        
        ConfigDb.globalConfig = new GlobalConfig(["tips_base_json"]);

        /**创建数据模型*/
        new EquipModel(this);

        /**注册消息*/
        this.registerProxyMsg();

        /**注册UI*/
        this.ironShopView = new IronShopView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Build_IronsUI, this.ironShopView);
    }

    /**
     * 注册代理消息
     */
    public registerProxyMsg(): void {
        this.ironShopProxy = new IronShopProxy(this);
        //注册代理消息
        this.registerFunc(IronShopConst.IronShop_LOAD_REQ, this.ironShopLoadReq, this);
        this.registerFunc(IronShopConst.IronShop_LOAD_RES, this.ironShopLoadRes, this);

        this.registerFunc(IronShopConst.IronShop_PRODUCE_REQ, this.produceReq, this);
        this.registerFunc(IronShopConst.IronShop_PRODUCE_RES, this.produceRes, this);
    }

    /**
     * 请求武器信息
    */
    public ironShopLoadReq() {
        this.ironShopProxy.reqEquipLoad();
    }

    /**
     * 获取下发的武器信息
    */
    public ironShopLoadRes(tData: any) {
        let equipModel: EquipModel = <EquipModel>this.getModel();
        equipModel.initData(tData);
    }

    /**
     * 请求打造武器
    */
    public produceReq(eId: number) {
        this.ironShopProxy.reqProduce(eId);
    }

    /**
     * 获取打造武器信息
    */
    public produceRes(tData: any) {
        let equipModel: EquipModel = <EquipModel>this.getModel();
        equipModel.initData(tData);
    }

}
