/**
 * 城内游戏地图调整
 * @author lzf
 * @since 2018年4月16日
*/
class HomeMapView extends BaseEuiView {
    private ScrollerView: eui.Scroller;
    private group_Map: eui.Group;
    private insideMap_0: eui.Image;
    private insideMap_1: eui.Image;
    private xunluo_left: eui.Group;//左边巡逻兵组
    private xunluo_right: eui.Group;//右边巡逻兵组
    private xunluo_down: eui.Group;//城门口巡逻兵
    private xunluo_up: eui.Group;
    // 城墙上巡逻兵
    private lxunluo_down: eui.Group;
    private lxunluo_up: eui.Group;
    private rxunluo_down: eui.Group;
    private rxunluo_up: eui.Group;
    private ViewNodeList: ViewNodeManager;//节点列表
    public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
        super($controller, $parent);
        this.setResources(["mc"]);
        this.skinName = BuildMapView;
    }
    public open(): void {
        let buildModel = <BuildModel>App.ControllerManager.getControllerModel(ControllerConst.Build);
        this.insideMap_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideAllHandle, this);
        this.insideMap_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideAllHandle, this);
        this.updataBuildDataFromSever(buildModel);
        this.addBuildCallback();
        this.addBtnEntCallback();
        this.addBtnLvUpCallBack();
    }
    public initUI(): void {
        super.initUI();
        /** 节点列表实例 */
        this.ViewNodeList = new ViewNodeManager(this);
        this.createXLB();
        this.createGuard();
        this.initBuildInfo();
        this.hideAllHandle();
        this.addBuildAnimation();
        App.ParticleUtils.createEffect(this.group_Map, "shuiche_json", "shuiche_png", 3400, 1595, "shuiche");
        App.ParticleUtils.createEffect(this.group_Map, "pubu_json", "pubu_png", 2660, 1300, "Action_1");
        App.ParticleUtils.createEffect(this.group_Map, "pubu_json", "pubu_png", 3540, 1705, "Action_2");
        App.ParticleUtils.createEffect(this.group_Map, "wator_json", "wator_png", 2245, 1024);
        App.ParticleUtils.createEffect(this.group_Map, "hongqi_json", "hongqi_png", 868, 1166);
        App.ParticleUtils.createEffect(this.group_Map, "hongqi_json", "hongqi_png", 1095, 1030);
        App.ParticleUtils.createEffect(this.group_Map, "hongqi_json", "hongqi_png", 825, 1135);
        App.ParticleUtils.createEffect(this.group_Map, "hongqi_json", "hongqi_png", 1060, 1020);
        App.ParticleUtils.createEffect(this.group_Map, "hongqi_json", "hongqi_png", 920, 1187);
        App.ParticleUtils.createEffect(this.group_Map, "hongqi_json", "hongqi_png", 1128, 1050);
        App.ParticleUtils.createEffect(this.group_Map, "fire_json", "fire_png", 1018, 1145);
        App.ParticleUtils.createEffect(this.group_Map, "fire_json", "fire_png", 1174, 1060);
    }
    private addBuildAnimation() {
        // 科技园
        let KJY = <eui.Group>this.ViewNodeList.getUINodeByName("idx_11002");
        App.ParticleUtils.createEffect(KJY, "kejiyuan_json", "kejiyuan_png", 250, 85);
        //  铁匠铺
        let TJP = <eui.Group>this.ViewNodeList.getUINodeByName("idx_11012");
        App.ParticleUtils.createEffect(TJP, "tiejiangpu_json", "tiejiangpu_png", 200, 190);
        App.ParticleUtils.createEffect(TJP, "yancong_json", "yancong_png", 160, 90);
        App.ParticleUtils.createEffect(TJP, "yancong_json", "yancong_png", 235, 50);
        //  工坊
        let GF = <eui.Group>this.ViewNodeList.getUINodeByName("idx_11007");
        App.ParticleUtils.createEffect(GF, "gongfang_json", "gongfang_png", 135, 160, "Action_1");
        App.ParticleUtils.createEffect(GF, "gongfang_json", "gongfang_png", 170, 240, "Action_2");
        //   步兵营
        let BBY = <eui.Group>this.ViewNodeList.getUINodeByName("idx_11003");
        App.ParticleUtils.createEffect(BBY, "bubing_json", "bubing_png", 210, 200);
        //   骑兵营
        let QBY = <eui.Group>this.ViewNodeList.getUINodeByName("idx_11004");
        App.ParticleUtils.createEffect(QBY, "qibing_json", "qibing_png", 230, 220);
        //   弓兵营
        let GBY = <eui.Group>this.ViewNodeList.getUINodeByName("idx_11005");
        App.ParticleUtils.createEffect(GBY, "gongbing_json", "gongbing_png", 190, 215, "Action_1");
        App.ParticleUtils.createEffect(GBY, "gongbing_json", "gongbing_png", 205, 227, "Action_2");
        App.ParticleUtils.createEffect(GBY, "gongbing_json", "gongbing_png", 225, 245, "Action_3");
    }
    /** 巡逻兵 */
    private createXLB() {
        let posArr: any;
        posArr = [
            new egret.Point(25, 25),
            new egret.Point(30, 60),
            new egret.Point(60, 25),
            new egret.Point(60, 60),
            new egret.Point(95, 25),
            new egret.Point(95, 60)
        ];
        // 左右两边的巡逻兵队伍
        for (let i = 0; i < posArr.length; i++) {
            App.ParticleUtils.createEffect(this.xunluo_left, "xunluobing_json", "xunluobing_png", posArr[i].x, posArr[i].y, "Action_left", 30);
            App.ParticleUtils.createEffect(this.xunluo_right, "xunluobing_json", "xunluobing_png", posArr[i].x, posArr[i].y, "Action_right");
        }
        // 城墙上巡逻兵
        App.ParticleUtils.createEffect(this.lxunluo_down, "xunluobing_json", "xunluobing_png", 23, 30, "Action_left");
        App.ParticleUtils.createEffect(this.lxunluo_up, "xunluobing_json", "xunluobing_png", 23, 30, "Action_right");
        App.ParticleUtils.createEffect(this.rxunluo_up, "xunluobing_json", "xunluobing_png", 23, 30, "Action_right");
        App.ParticleUtils.createEffect(this.rxunluo_down, "xunluobing_json", "xunluobing_png", 23, 30, "Action_left");
        this.createTimer();
    }
    /** 门卫 */
    private createGuard() {
        let posArr: any;
        posArr = [
            new egret.Point(1805, 1730),
            new egret.Point(1900, 1700),
            new egret.Point(1385, 1550),
            new egret.Point(1500, 1490),
            new egret.Point(2170, 1275),
            new egret.Point(2270, 1225),
        ];
        for (let i = 0; i < posArr.length; i++) {
            App.ParticleUtils.createEffect(this.group_Map, "xunluobing_json", "xunluobing_png",
                posArr[i].x, posArr[i].y, "Action_mengwei");
        }
    }
    /** 创建时间记时器 */
    private createTimer() {
        // 巡逻队伍计时器
        var timer_1: egret.Timer = new egret.Timer(100, 200);
        timer_1.addEventListener(egret.TimerEvent.TIMER, this.timeXLBFunc_1, this);
        timer_1.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeXLBFunc_2, this);
        timer_1.start();
        // 城墙上巡逻兵巡逻兵
        var timer_2: egret.Timer = new egret.Timer(200, 50);
        timer_2.addEventListener(egret.TimerEvent.TIMER, this.timeFuncGateXLB_1, this);
        timer_2.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeFuncGateXLB_2, this);
        timer_2.start();
    }
    /** 时间回调 */
    private timeXLBFunc_1(evt: egret.TouchEvent) {
        if (evt.type == egret.TimerEvent.TIMER_COMPLETE) {
            var timer: egret.Timer = new egret.Timer(100, 200);
            timer.addEventListener(egret.TimerEvent.TIMER, this.timeXLBFunc_1, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeXLBFunc_2, this);
            timer.start();
        }
        this.runLeftXLB();
    }
    private timeXLBFunc_2(evt: egret.TouchEvent) {
        if (evt.type == egret.TimerEvent.TIMER_COMPLETE) {
            var timer: egret.Timer = new egret.Timer(100, 200);
            timer.addEventListener(egret.TimerEvent.TIMER, this.timeXLBFunc_2, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeXLBFunc_1, this);
            timer.start();
        }
        this.runRightXLB();
    }
    /** 城内巡逻兵队伍 */
    private runLeftXLB() {
        this.xunluo_right.$setVisible(false);
        this.xunluo_left.$setVisible(true);
        this.xunluo_left.x += 5.53;
        this.xunluo_left.y -= 2.73;
        this.xunluo_right.x = 1950;
        this.xunluo_right.y = 1365;
    }
    private runRightXLB() {
        this.xunluo_left.$setVisible(false);
        this.xunluo_right.$setVisible(true);
        this.xunluo_right.x -= 5.53;
        this.xunluo_right.y += 2.73;
        this.xunluo_left.x = 845;
        this.xunluo_left.y = 1910;
    }
    /** 城墙上巡逻兵 */
    private timeFuncGateXLB_1(evt: egret.TouchEvent) {
        if (evt.type == egret.TimerEvent.TIMER_COMPLETE) {
            var timer: egret.Timer = new egret.Timer(200, 50);
            timer.addEventListener(egret.TimerEvent.TIMER, this.timeFuncGateXLB_1, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeFuncGateXLB_2, this);
            timer.start();
        }
        this.runGateLeftXLB();
    }
    private timeFuncGateXLB_2(evt: egret.TouchEvent) {
        if (evt.type == egret.TimerEvent.TIMER_COMPLETE) {
            var timer: egret.Timer = new egret.Timer(200, 50);
            timer.addEventListener(egret.TimerEvent.TIMER, this.timeFuncGateXLB_2, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeFuncGateXLB_1, this);
            timer.start();
        }
        this.runGateRightXLB();
    }
    private runGateLeftXLB() {
        this.lxunluo_up.visible = this.rxunluo_down.visible = false;
        this.lxunluo_down.visible = this.rxunluo_up.visible = true;
        // 左城墙巡逻兵
        this.lxunluo_up.x = 1535;
        this.lxunluo_up.y = 1705;
        this.lxunluo_down.x += 10.3;
        this.lxunluo_down.y -= 4.9;
        // 右城墙巡逻兵
        this.rxunluo_down.x = 1945;
        this.rxunluo_down.y = 1495;
        this.rxunluo_up.x -= 6.8;
        this.rxunluo_up.y += 3.3;
    }
    private runGateRightXLB() {
        this.lxunluo_up.visible = this.rxunluo_down.visible = true;
        this.lxunluo_down.visible = this.rxunluo_up.visible = false;
        // 左城墙巡逻兵
        this.lxunluo_down.x = 1020;
        this.lxunluo_down.y = 1950;
        this.lxunluo_up.x -= 10.3;
        this.lxunluo_up.y += 4.9;
        // 右城墙巡逻兵
        this.rxunluo_up.x = 2285;
        this.rxunluo_up.y = 1330;
        this.rxunluo_down.x += 6.8;
        this.rxunluo_down.y -= 3.3;
    }
    private initBuildInfo() {
        //初始化所有建筑名称
        let buildData: any = ConfigDb.buildConfig.getBuildData();
        for (let i = 0; i < 13; i++) {
            let strName = "idxNameInfo_" + (i + 1);
            let parentGroup = <eui.Group>(this.ViewNodeList.getUINodeByName(strName)).parent;
            for (let id in buildData) {
                if (parentGroup.name == "idx_" + id) {
                    let _name = "name" + (i + 1);
                    let _grate = "idxgrate" + (i + 1);
                    // 名字
                    let name: eui.Label = this.ViewNodeList.getUINodeByName(strName).getChildByName(_name);
                    name.text = buildData[id]["name"];
                    // 等级
                    let grate: eui.Label = this.ViewNodeList.getUINodeByName(strName).getChildByName(_grate);
                    if (grate) { grate.text = buildData[id]["islevel"]; }
                    break;
                }
            }
        }
    }
    /**  添加建筑点击回调 */
    private addBuildCallback() {
        for (let i: number = 1; i < 14; i++) {
            var strHandleName: string = "";
            var strBuildImgNum: string = "";
            if (i < 10) {
                strHandleName = "idxHandle_0" + i;
                strBuildImgNum = "idxBuildImg_0" + i;
            } else {
                strHandleName = "idxHandle_" + i;
                strBuildImgNum = "idxBuildImg_" + i;
            }
            var _handle = this.ViewNodeList.getUINodeByName(strHandleName);
            var build: eui.Image = this.ViewNodeList.getUINodeByName(strBuildImgNum);
            if (_handle) {
                build.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
            } else {
                build.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEntrance, this);
            }
        }

    }
    /**
     *  添加进入按钮点击回调
     */
    private addBtnEntCallback() {
        let strBtnName: string = "";
        for (let i: number = 1; i < 13; i++) {
            if (i < 10)
                strBtnName = "idxEnt_0" + i;
            else
                strBtnName = "idxEnt_" + i;
            let btn = this.ViewNodeList.getUINodeByName(strBtnName);
            if (btn)
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnEntrance, this);
        }
    }
    /**
     * 添加升级按钮点击回调
     */
    private addBtnLvUpCallBack() {
        let strBtnName: string = "";
        for (let i: number = 1; i < 13; i++) {
            if (i < 10)
                strBtnName = "idxlvup_0" + i;
            else
                strBtnName = "idxlvup_" + i;
            let btn = this.ViewNodeList.getUINodeByName(strBtnName);
            if (btn)
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLvUpCallBack, this);
        }
    }
    /**
     * 建筑回调
     * @param  {egret.TouchEvent} event 点击事件
     */
    private buildClickCallback(event: egret.TouchEvent) {
        this.hideAllHandle();
        let name: string = event.target.name;
        name = name.substr(name.length - 2, 2);
        let _handle = this.ViewNodeList.getUINodeByName("idxHandle_" + name);
        if (_handle)
            _handle.$setVisible(true);
    }
    /**
     *  隐藏建筑按钮
     */
    private hideAllHandle() {
        for (let i: number = 1; i < 14; i++) {
            let _handle: eui.Group;
            if (i < 10) {
                _handle = this.ViewNodeList.getUINodeByName("idxHandle_0" + i);
            } else {
                _handle = this.ViewNodeList.getUINodeByName("idxHandle_" + i);
            }
            if (_handle)
                _handle.$setVisible(false);
        }
    }
    /**
     * 进入按钮回调
     * @param  {egret.TouchEvent} event 点击事件
     */
    private btnEntrance(event: egret.TouchEvent) {
        this.hideAllHandle();
        let name: string = event.target.name;
        switch (name) {
            case "idxEnt_01":
                App.ViewManager.open(ViewConst.Build_PalaceUI);
                break;
            case "idxEnt_02":
                App.ViewManager.open(ViewConst.Build_ScienceUI);
                break;
            case "idxEnt_06":
                App.ViewManager.open(ViewConst.Build_WorkUI);
                break;
            case "idxEnt_07":
                App.ViewManager.open(ViewConst.Build_GenMansionUI);
                break;
            case "idxEnt_08":
                App.ViewManager.open(ViewConst.Build_WarehouseUI);
                break;
            case "idxEnt_09":
            case "idxEnt_10":
            case "idxEnt_11":
                App.ViewManager.open(ViewConst.Build_BarracksUI);
                break;
            case "idxEnt_13":
                App.ViewManager.open(ViewConst.Build_GateUI);
                break;
            default:
                break;
        }
    }
    /**
     * 升级按钮回调
     * @param  {egret.TouchEvent} event  
     */
    private btnLvUpCallBack(event: egret.TouchEvent): void {
        console.log("[printf]--->>>  升级按钮回调");
    }
    /**
     * 建筑回调
     * @param  {egret.TouchEvent} event  点击事件
     */
    private buildEntrance(event: egret.TouchEvent) {
        this.hideAllHandle();
        let name: string = event.target.name;
        switch (name) {
            case "idxBuildImg_03":
                App.ViewManager.open(ViewConst.Build_GeneralUI);
                break;
            case "idxBuildImg_04":
                App.ViewManager.open(ViewConst.Build_XiLianUI);
                break;
            case "idxBuildImg_05":
                App.ViewManager.open(ViewConst.Build_IronsUI);
                break;
            default:
                break;
        }

    }
    private touchHandler(evt: egret.TouchEvent) {
        var bTouch: boolean = false;
        switch (evt.type) {
            case egret.TouchEvent.TOUCH_END:
                bTouch = this.checkCollision(evt.stageX, evt.stageY, evt.target.name);
                if (bTouch) {
                    this.buildClickCallback(evt);
                } else {
                    this.hideAllHandle();
                }
                break;
        }
    }
    private touchEntrance(evt: egret.TouchEvent) {
        var bTouch: boolean = false;
        switch (evt.type) {
            case egret.TouchEvent.TOUCH_END:
                bTouch = this.checkCollision(evt.stageX, evt.stageY, evt.target.name);
                if (bTouch) {
                    this.buildEntrance(evt);
                } else {
                    this.hideAllHandle();
                }
                break;
        }
    }
    /** 判断是否在图像区域 */
    private checkCollision(imgX: number, imgY: number, targetName: string): boolean {
        var bTouch: boolean = false;
        var _build: eui.Image = this.ViewNodeList.getUINodeByName(targetName);
        bTouch = _build.hitTestPoint(imgX, imgY, true);
        return bTouch;
    }
    /**
     * @param  {BuildModel} buildModel  
     */
    public updataBuildDataFromSever(buildModel: BuildModel) {
        // 王宫
        this.updataPalace(buildModel.palace);
        // 科技园
        this.updataKJY(buildModel.tnoly);
        // 拜将台
        this.updataBJT();
        // 洗练铺 
        this.updataXLP();
        // 铁匠铺
        this.updataTJP();
        // 工坊  
        this.updataGF(buildModel.atelier);
        // 统帅府
        this.updataTSF(buildModel.drillGround);
        // 仓库
        this.updataCK(buildModel.store);
        //  兵营
        this.updataCamp(buildModel.archer, "idx_11005", "idxgrate9");
        this.updataCamp(buildModel.sowar, "idx_11004", "idxgrate10");
        this.updataCamp(buildModel.infantry, "idx_11003", "idxgrate11");
        //  城门
        this.updataGate(buildModel.gate);
    }
    /**
       * @param  {any} _data           建筑数据
       * @param  {string} _buildName   建筑name
       * @param  {string} _grateName   建筑等级name
       */
    private updataBuildCommon(_data: any, _buildName: string, _grateName?: string): boolean {
        var isLock: boolean = false;
        let build = <eui.Group>this.ViewNodeList.getUINodeByName(_buildName);
        let lock = <eui.Group>build.getChildByName("lock");
        let grate: eui.Label = this.ViewNodeList.getUINodeByName(_grateName);
        // 判断服务端下发数据是否为空
        if (!_data) {
            isLock = true;
            if (grate)
                grate.text = "0";
            if (DEBUG == true) {
                lock.visible = false;
            } else {
                lock.visible = true;
            }
            return isLock;
        }
        if (grate)
            grate.text = (_data.lv).toString();
        lock.visible = false;
        return isLock;
    }
    /**
     * @param  {any} _data 王宫数据
     */
    public updataPalace(_data: any) {
        let data: build.PalaceRes = <build.PalaceRes>_data;
        if (!data) return;
        // 等级
        let grate: eui.Label = this.ViewNodeList.getUINodeByName("idxNameInfo_1")
            .getChildByName("idxgrate1");
        if (grate)
            grate.text = (data.lv).toString();
    }
    /**
     * @param  {any} _data 科技园数据
     */
    public updataKJY(_data: any) {
        let data: build.TechnologyRes = <build.TechnologyRes>_data;
        if (this.updataBuildCommon(data, "idx_11002", "idxgrate2")) return;
    }
    /**
     * @param  {any} _data 拜将台数据
     */
    public updataBJT(_data?: any) {
        if (this.updataBuildCommon(_data, "idx_11019")) return;
    }
    /**
     * @param  {any} _data 洗练铺数据
     */
    public updataXLP(_data?: any) {
        if (this.updataBuildCommon(_data, "idx_11013")) return;
    }
    /**
     * @param  {any} _data 铁匠铺数据
     */
    public updataTJP(_data?: any) {
        if (this.updataBuildCommon(_data, "idx_11012")) return;
    }
    /**
     * @param  {any} _data 工坊数据
     */
    public updataGF(_data: any) {
        let data: build.AtelierRes = <build.AtelierRes>_data;
        if (this.updataBuildCommon(data, "idx_11007", "idxgrate6")) return;
    }
    /**
     * @param  {any} _data 统帅府数据
     */
    public updataTSF(_data: any) {
        let data: build.DrillGroundRes = <build.DrillGroundRes>_data;
        if (this.updataBuildCommon(data, "idx_11014", "idxgrate7")) return;
    }
    /**
     * @param  {any} _data 仓库数据
     */
    public updataCK(_data: any) {
        let data: build.StoreHouseRes = <build.StoreHouseRes>_data;
        if (this.updataBuildCommon(data, "idx_11001", "idxgrate8")) return;
    }
    /**
     * @param  {any} _data 兵营数据
     */
    public updataCamp(_data: any, _buildName?: string, _grateName?: string) {
        let data: build.CampRes = <build.CampRes>_data;
        if (this.updataBuildCommon(data, _buildName, _grateName)) return;
    }
    /**
     * @param  {any} _data 城门数据
     */
    public updataGate(_data: any) {
        let data: build.GateRes = <build.GateRes>_data;
        if (this.updataBuildCommon(data, "idx_11006", "idxgrate13")) return;
    }
}