// TypeScript file


class SelEquipIconComp extends eui.Component implements IBaseComponent {
    private group_icon: eui.Group;
    private img_lock: eui.Image;
    private img_state: eui.Image;
    private img_select: eui.Image;

    private _iconGoods:components.IconGoods;

    private _tData: any;

    /**标志*/
    private _tag:number;

    public constructor() {
        super();
        this.skinName = SelEquipIconCompSkin; 

        this.initUI();
    }

    public initUI():void{

        /**创建icon*/
        let scale = 0.8;
        this._iconGoods = new components.IconGoods();
        this._iconGoods.x = (this.group_icon.width - this._iconGoods.width * scale) / 2
        this._iconGoods.y = this._iconGoods.x
        this._iconGoods.setScale(scale);
        this.group_icon.addChild(this._iconGoods);
    }    

    public open(){

    }

    public close(){

    }

    public get tag(){
        return this._tag;
    }
    public set tag(t:number){
        this._tag = t;
    }

    public setData($tData: any): void {
        this._tData = $tData;

        this.updateView();
    }

    public getData():any{
        return this._tData;
    }

    public setSelect($b:boolean):void{
        this.img_select.visible = $b;
    }

    private updateView(): void {
        if (this._tData == null) {
            return;
        }

        let roleModel = <RoleModel>App.ControllerManager.getControllerModel(ControllerConst.Role);
        let equipModel = <EquipModel>App.ControllerManager.getControllerModel(ControllerConst.IronShop);

        /**设置icon*/
        let iconData = new components.IconData();
        iconData.sIcon = this._tData.icon + "_png";
        iconData.bShowName = false;
        iconData.bShowNum = false;        
        this._iconGoods.setCurData(iconData);
        

        /**设置锁*/
        if (roleModel.level < this._tData.nMakeLv) {
            this.img_lock.visible = true;
            this.img_state.visible = false;
            UIUtils.setGray(this, true);      
        }
        else {            
            this.img_lock.visible = false;
            UIUtils.setGray(this, false);      

            /**是否打造中*/
            if (equipModel.getCurProduceEquipId() == this._tData.id) {
                this.img_state.source = "v2_fonts_dazaozhong_png";
                this.img_state.visible = true;
            } else {
                /**是否满足打造条件*/
                if (roleModel.isResEnough(this._tData.makecosts)) {
                    this.img_state.source = "v2_fonts_kedazao_png";
                    this.img_state.visible = true;
                } else {
                    this.img_state.visible = false;
                }
            }
        }
    }


}
