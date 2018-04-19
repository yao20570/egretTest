class RoleRenameView extends BaseEuiView {
    public closeGroup:components.Button;
    public _cancel:components.Button;
    public _ensure:components.Button;
    public newName:eui.TextInput;
    public random:eui.Image;
    public noteLabel:eui.Label;

    public constructor(controller:BaseController, parent:egret.DisplayObjectContainer) {
        super(controller, parent);   
        this.skinName = RoleRenameSkin;    
    }

    public initUI(): void {
        super.initUI();
        this.closeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRenameView, this);
        this._cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRenameView, this);
        this._ensure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeName, this);
        this.random.addEventListener(egret.TouchEvent.TOUCH_TAP, this.randomName, this);
    }

    
    public initData(): void {
        super.initData();        
    }
    
    /**
     * 
     */
    public open(): void {
        this.newName.text = "";
    }

    /**
     * 随机一个名称
     * @since  2018-03-26 15:05:00
     * @author hjielong
     */
    private randomName():void{
        this.newName.text = ConfigDb.roleConfig.randomAvatarName();
    }

    private changeName():void{
        let name:string = this.newName.text;
        if(!name || name.length <= 0){
            Toast.showTipsDownToUp("名称长度不能为空",true);
            return;
        }
        //访问改名协议 TODO
        let roleModel:RoleModel = <RoleModel>App.ControllerManager.getControllerModel(ControllerConst.Role);
        this.applyFunc(RoleConst.ROLE_RENAME_REQ,roleModel.roleId,name,roleModel.gender);
    }

    private closeRenameView():void{
        App.ViewManager.closeView(this);
    }
}