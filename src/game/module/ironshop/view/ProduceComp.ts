/**
 * 铁匠铺->打造面板
 * @author wzy
 * @time    2018/04/9 
 */
class ProduceComp extends eui.Component implements IBaseComponent {

    private tab_quality: eui.TabBar;
    private selectQualityIndex: number;                 /**选择品质的index*/
    private selectEquipIndex: number = 1;               /**选择装备的index*/

    private equipSelectList: Array<SelEquipIconComp>;   /**武器icon列表*/
    private icon_equip_1: eui.Group;
    private icon_equip_2: eui.Group;
    private icon_equip_3: eui.Group;
    private icon_equip_4: eui.Group;
    private icon_equip_5: eui.Group;
    private icon_equip_6: eui.Group;


    public constructor() {
        super();
        this.skinName = ProduceCompSkin;

        this.percentWidth = 100;
        this.percentHeight = 100;

        this.initUI()
    }

    public initUI(): void {
        /**设置tab*/
        
        this.tab_quality.dataProvider = new components.TabBarRenderData([
            new components.TabBtnRenderData(TextUtils.getText("10005"), 0, true),
            new components.TabBtnRenderData(TextUtils.getText("10006"), 0, false),
            new components.TabBtnRenderData(TextUtils.getText("10007"), 0, true),
            new components.TabBtnRenderData(TextUtils.getText("10008"), 0, true),
            new components.TabBtnRenderData(TextUtils.getText("10009"), 0, true)
        ]);

        /**初始化武器icon列表*/
        this.equipSelectList = new Array<SelEquipIconComp>(); 
        for (let i = 1; i < 7; ++i) {
            let group = <eui.Group>this["icon_equip_" + i];
            let icon = new SelEquipIconComp();            
            icon.visible = false;
            group.addChild(icon);
            this.equipSelectList.push(icon);
        }
    }

    public open(){
        this.tab_quality.addEventListener(egret.Event.CHANGE, this.onSelectTab, this);
        this.tab_quality.addEventListener(egret.Event.CHANGING, this.onCheckIsCanChange, this);    
    }

    public close(){
        this.tab_quality.removeEventListener(egret.Event.CHANGE, this.onSelectTab, this);
        this.tab_quality.removeEventListener(egret.Event.CHANGING, this.onCheckIsCanChange, this);    
    }

    public destroy(){
        close()
    }

    /**
     * 事件:选择品质 
     * @argument
     * @augments
    */
    public onSelectTab(evt:egret.Event): void {        
        this.select(this.tab_quality.selectedIndex, 0);        
    }

    /**
     * 如果是锁定状态，则阻止选中tab
    */
    public onCheckIsCanChange(evt:egret.Event): void {

        let data:components.TabBtnRenderData = this.tab_quality.dataProvider.getItemAt(this.tab_quality.selectedIndex)        
        if (data.isLock){
            evt.preventDefault();
        }   
    }

    public updateView(): void {
        //let equipModel:EquipModel = <EquipModel>App.ControllerManager.getControllerModel(ControllerConst.IronShop);
        /**更新顶部铁匠信息*/
        this.updateBlacksmithInfo();

        /**更新品质标签*/
        this.updateQualityTab();

        /**更新选中的品质标签*/
        this.select(this.tab_quality.selectedIndex, this.selectEquipIndex);
    }

    /**
     * 选择打造的武器
     * @tabIndex    要选择的品质标签的index
     * @equipIndex  要选择的武器icon的idnex
    */
    public select(tabIndex: number, equipIndex: number): void {
        this.tab_quality.selectedIndex = tabIndex;
        this.selectQualityIndex = tabIndex;

        this.selectEquipIndex = equipIndex;

        this.updateEquipSelectList();
    }

    /**
     * 更新顶部铁匠信息
    */
    public updateBlacksmithInfo(): void {

    }

    /**
     * 更新品质切换标签
    */
    public updateQualityTab(): void {
         let EquipModel = <EquipModel>App.ControllerManager.getControllerModel(ControllerConst.IronShop);

        let startLockQuality = EquipModel.getFirstLockQuailty();
        for (let i = 0; i < this.tab_quality.dataProvider.length; ++i) {
            let btnRenderData = <components.TabBtnRenderData>this.tab_quality.dataProvider.getItemAt(i);
            btnRenderData.isLock = (startLockQuality <= i);
        }
    }

    /**
     * 更新装备icon选择列表
    */
    public updateEquipSelectList(): void {
        let equipsDatas = ConfigDb.equipConfig.getEquipsDataByQuality(this.selectQualityIndex + 1);
        for (let i = 0; i < this.equipSelectList.length; ++i) {
            this.equipSelectList[i].setData(equipsDatas[i]);
            this.equipSelectList[i].visible = true;
        }
    }

    /**
     * 更新中间打造信息
    */
    public updateProduceInfo(): void {
            
    }



}