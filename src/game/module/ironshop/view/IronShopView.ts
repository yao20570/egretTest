/**
 * 铁匠铺信息展示界面
 * @author wzy
 * @time    2018/04/8 
 */
class IronShopView extends BaseEuiView {

    public tabBar: eui.TabBar;
    public viewStack: eui.ViewStack;
    public viewSkin: components.PanelView;


    /**下面是生产界面的*/

    /**选择品质的index*/
    private selectQualityIndex: number;
    public icon_res_0: eui.Group;
    public icon_res_1: eui.Group;
    public icon_res_2: eui.Group;
    public icon_res_3: eui.Group;
    public icon_res_4: eui.Group;
    public icon_res_5: eui.Group;
    public tab_quality: eui.TabBar;

    /**选择装备的index*/
    private selectEquipIndex: number = 1;
    /**材料icon容器*/
    public group_material: eui.Group;
    /**武器icon列表*/
    private equipSelectList: Array<SelEquipIconComp>;


    /**材料的位置*/
    private posMaterial: any;
    /**材料icon列表*/
    private iconMaterialList: Array<MaterilIconComp> = [];
    /**要生产的装备*/
    public img_upgrade_equip: eui.Image;
    public lab_upgrade_equip: eui.Label;

    /**打造进度*/
    public group_produce_progress: eui.Group;
    public progress_produce: components.Progress;
    public lab_produce_left_time: eui.Label;    
    /**打造需要的时间*/    
    public lab_produce_need_time: eui.Label;
    /**打造按钮*/
    public btn_produce: components.Button;


    public gourp_top: eui.Group;
    public img_top_bg: eui.Image;
    public lab_smith_name: eui.Label;
    public lab_smith_desc1: eui.Label;
    public lab_smith_desc2: eui.Label;
    public lab_smith_left_time: eui.Label;
    public img_state0: eui.Image;
    public group_smith_icon: eui.Group;
    public group_equip_list: eui.Group;

    public group_bot: eui.Group;



    public constructor(controller: BaseController, parent: egret.DisplayObjectContainer) {
        super(controller, parent);
        this.skinName = IronShopSkin;
    }

    public initUI(): void {
        super.initUI();

        /**设置标题*/
        this.viewSkin.title = TextUtils.getText("10001");

        /**设置tab*/
        this.tabBar.dataProvider = new components.TabBarRenderData([
            new components.TabBtnRenderData(TextUtils.getText("10002")),
            new components.TabBtnRenderData(TextUtils.getText("10003")),
            new components.TabBtnRenderData(TextUtils.getText("10004")),
        ]);

        /**打造面板*/
        // this.produceComp = new ProduceComp();
        // this.viewStack.addChildAt(this.produceComp, 0);

        /**品质选择框*/
        this.tab_quality.dataProvider = new components.TabBarRenderData([
            new components.TabBtnRenderData(TextUtils.getText("10005"), 0, true),
            new components.TabBtnRenderData(TextUtils.getText("10006"), 0, false),
            new components.TabBtnRenderData(TextUtils.getText("10007"), 0, true),
            new components.TabBtnRenderData(TextUtils.getText("10008"), 0, true),
            new components.TabBtnRenderData(TextUtils.getText("10009"), 0, true)
        ]);

        /**初始化武器icon列表*/
        this.equipSelectList = new Array<SelEquipIconComp>();
        for (let i = 0; i < 6; ++i) {
            let group = <eui.Group>this["icon_equip_" + i];
            let icon = new SelEquipIconComp();
            icon.tag = i;
            icon.visible = false;
            group.addChild(icon);
            this.equipSelectList.push(icon);
        }

        /**定义材料的位置*/
        this.posMaterial = {};
        this.posMaterial[2] = [[0, 210, 305], [180, 430, 305]]
        this.posMaterial[3] = [[90, 314, 441], [330, 220, 209], [210, 420, 209]]
        this.posMaterial[5] = [[90, 314, 441], [18, 192, 349], [306, 220, 209], [234, 420, 209], [162, 448, 349]]
        this.posMaterial[6] = [[60, 220, 401], [0, 220, 305], [300, 220, 209], [240, 420, 209], [180, 420, 305], [120, 420, 401]]

        //测试
        let group1 = <eui.Group>this.viewStack.getChildAt(1);
        group1.addChild(new ProduceComp());
    }

    public destroy(): void {
        super.destroy();
    }

    public open(...param: any[]): void {
        this.tabBar.addEventListener(egret.Event.CHANGE, this.onSelectTab, this);
        this.tabBar.addEventListener(egret.Event.CHANGING, this.onCheckIsCanChange, this);

        this.tab_quality.addEventListener(egret.Event.CHANGE, this.onSelectTab, this);
        this.tab_quality.addEventListener(egret.Event.CHANGING, this.onCheckIsCanChange, this);

        for (let equipIcon of this.equipSelectList) {
            equipIcon.addEventListener(egret.TouchEvent.TOUCH_END, this.onSelectProduceIcon, this);
        }

        this.btn_produce.addEventListener(egret.TouchEvent.TOUCH_END, this.onProduce, this);

        this.selectTab(0);
        this.selectTabQuality(0, 0);

        this.updateView();

        //移除定时器
        App.TimerManager.doFrame(0, 0, this.updateProduceProgress, this);
    }

    public close(...param: any[]): void {
        this.tabBar.removeEventListener(egret.Event.CHANGE, this.onSelectTab, this);
        this.tabBar.removeEventListener(egret.Event.CHANGING, this.onCheckIsCanChange, this);

        this.tab_quality.removeEventListener(egret.Event.CHANGE, this.onSelectTab, this);
        this.tab_quality.removeEventListener(egret.Event.CHANGING, this.onCheckIsCanChange, this);

        for (let equipIcon of this.equipSelectList) {
            equipIcon.removeEventListener(egret.TouchEvent.TOUCH_END, this.onSelectProduceIcon, this);
        }
        
        this.btn_produce.removeEventListener(egret.TouchEvent.TOUCH_END, this.onProduce, this);

        //移除定时器
        App.TimerManager.remove(this.updateProduceProgress, this);
        //this.produceComp.close();
    }

    //选择tab
    public onSelectTab(evt: egret.Event): void {
        switch (evt.currentTarget) {
            case this.tabBar:
                this.selectTab(this.tabBar.selectedIndex);
                this.updateView();
                break;
            case this.tab_quality:
                this.selectTabQuality(this.tab_quality.selectedIndex, 0);
                this.updateEquipSelectList();
                this.updateProduceInfo()
                break;
        }

    }

    //判断tab能否点击
    public onCheckIsCanChange(evt: egret.Event) {
        let data: components.TabBtnRenderData = null
        switch (evt.currentTarget) {
            case this.tabBar:
                data = this.tabBar.dataProvider.getItemAt(this.tabBar.selectedIndex)
                break;
            case this.tab_quality:
                data = this.tab_quality.dataProvider.getItemAt(this.tab_quality.selectedIndex)
                break;
        }
        if (data && data.isLock) {
            evt.preventDefault();
        }
    }

    public onSelectProduceIcon(evt: egret.Event) {
        let sender: SelEquipIconComp = <SelEquipIconComp>evt.currentTarget;
        if (this.selectEquipIndex == sender.tag) {
            return;
        }
        this.selectEquipIndex = sender.tag;
        this.updateEquipSelectList();
        this.updateProduceInfo();
    }

    public onProduce(evt: egret.Event){
        let selectEquip = this.equipSelectList[this.selectEquipIndex];
        let selectEquipData = selectEquip.getData();
        this.applyFunc(IronShopConst.IronShop_PRODUCE_REQ, selectEquipData.id);
    }

    private selectTab(nIndex): void {
        this.tabBar.selectedIndex = nIndex;
        this.viewStack.selectedIndex = nIndex;

    }

    private selectTabQuality(tabIndex: number, equipIndex: number): void {
        this.tab_quality.selectedIndex = tabIndex;
        this.selectQualityIndex = tabIndex;

        this.selectProduceEquip(equipIndex);
    }

    private selectProduceEquip(equipIndex: number): void {
        this.selectEquipIndex = equipIndex;
    }

    /**
     * 设置界面
    */
    public updateView(): void {
        switch (this.tabBar.selectedIndex) {
            case 0: this.updateProduceView(); break;
            case 1: this.updateUpgradeView(); break;
            case 2: this.updateRefinedView(); break;
        }
    }

    /**
     * 设置打造界面
    */
    private updateProduceView(): void {
        //this.produceComp.updateView();
        /**顶部招募铁匠信息*/
        this.updateBlacksmithInfo();

        /**更新品质标签*/
        this.updateQualityTab();

        /**更新装备选择列表*/
        this.updateEquipSelectList();

        /**更新打造需求*/
        this.updateProduceInfo();

        /**更新打造进度*/
        this.updateProduceProgress();
    }

    private updateBlacksmithInfo(): void {

    }

    private updateQualityTab(): void {
        let EquipModel = <EquipModel>App.ControllerManager.getControllerModel(ControllerConst.IronShop);

        let startLockQuality = EquipModel.getFirstLockQuailty();
        for (let i = 0; i < this.tab_quality.dataProvider.length; ++i) {
            let btnRenderData = <components.TabBtnRenderData>this.tab_quality.dataProvider.getItemAt(i);
            btnRenderData.isLock = (startLockQuality <= i);
        }
    }

    private updateEquipSelectList(): void {
        let equipsDatas = ConfigDb.equipConfig.getEquipsDataByQuality(this.selectQualityIndex + 1);
        for (let i = 0; i < this.equipSelectList.length; ++i) {
            let equip = this.equipSelectList[i]
            equip.setData(equipsDatas[i]);
            equip.visible = true;
            equip.setSelect(equip.tag == this.selectEquipIndex);
        }
    }

    private updateProduceInfo(): void {
        let selectEquipIcon = this.equipSelectList[this.selectEquipIndex];
        if (!selectEquipIcon) {
            return
        }

        let selectEquipData = selectEquipIcon.getData()
        /**消耗配置数据*/
        let strCost: string = selectEquipData.makecosts;
        /**解析消耗数据*/
        let aryCost: Array<Array<number>> = App.StringUtils.splitMuilt(strCost, ";", ":");
        /**根据消耗数据获取对用的位置*/
        let aryPos: Array<Array<number>> = this.posMaterial[aryCost.length];
        /**先隐藏所有的icon*/
        for (let v of this.iconMaterialList) {
            v.visible = false;
        }
        /**显示并设置需要的材料*/
        for (let i in aryPos) {

            let materialIcon = this.iconMaterialList[i]

            /**如果没有，创建对应的材料icon*/
            if (!materialIcon) {
                materialIcon = new MaterilIconComp();
                this.iconMaterialList[i] = materialIcon;
                this.group_material.addChild(materialIcon);
            }

            /**设置icon数据*/
            materialIcon.visible = true;
            materialIcon.setCostData(aryCost[i][0], aryPos[i][1]);
            materialIcon.setPosParam(aryPos[i]);
        }

        let selEquip = this.equipSelectList[this.selectEquipIndex];
        let selEquipData = selEquip.getData();

        /**Icon*/
        this.img_upgrade_equip.source = selEquipData.icon + "_png";

        /**属性*/
        let aryAttr = selEquipData.attrs.split(":");
        let attrId = Number(aryAttr[0]);
        let attrValue = Number(aryAttr[1]);
        let attrName = "";
        if (attrId && attrValue) {
            let attrCfg = ConfigDb.equipConfig.getBaseAttributeById(attrId);
            attrName = attrCfg.name;
        }
        this.lab_upgrade_equip.textFlow = [
            { text: selEquipData.name, style: { "textColor": ColorUtils.getColorByQuality(selEquipData.quality) } },
            { text: " " + attrName, style: { "textColor": _cc.pwhite } },
            { text: "+" + attrValue, style: { "textColor": _cc.blue } }
        ]

        /**装备打造所需时间*/
        this.lab_produce_need_time.text = GameUtils.formatTimeToHms(selEquipData.maketimes, true);
    }
    
    private updateProduceProgress(): void {
        let equipModel = <EquipModel>App.ControllerManager.getControllerModel(ControllerConst.IronShop)
        let produceEquipData = <ProduceVo>equipModel.getCurProduceEquip();
        if (!produceEquipData ) {
            this.group_produce_progress.visible = false
            return;
        }

        let selectEquip = this.equipSelectList[this.selectEquipIndex]
        let selectEquipData = selectEquip.getData()
        let selectEquipId = selectEquipData.id
        /**打造中装备*/
        if (produceEquipData.id != selectEquipId){
            this.group_produce_progress.visible = false
            return;
        }

        /**倒计时*/
		this.lab_produce_left_time.text = GameUtils.formatTimeToHms(produceEquipData.getCD(), false);

        /**进度条*/
        this.progress_produce.value = (1 - produceEquipData.getCD()/selectEquipData.maketimes) *100
        this.progress_produce.labelDisplay.visible = false;       
    }

    /**
     * 设置强化界面
    */
    private updateUpgradeView(): void {

    }

    /**
     * 设置洗练界面
    */
    private updateRefinedView(): void {

    }

}