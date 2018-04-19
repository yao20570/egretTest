class MaterilIconComp extends egret.DisplayObjectContainer implements IBaseComponent {

	/**旋转线*/
	public img_line: eui.Image;
	/**材料名称*/
	public lab_name: eui.Label;
	/**材料*/
	public comp_icon: components.IconGoods;

	/**材料配置表id*/
	private itemCfgId:number;

	/**材料消耗数量*/
	private costNum:number;

	public constructor() {
		super();
		//this.skinName = MaterilIcon
		this.initUI()
	}

	public initUI() {
		/**设置自身宽高*/
		this.width = 88;
		this.height = 88;

		/**创建旋转线*/
		let img_line = new eui.Image();
		img_line.width = 50;
		img_line.height = 4;
		img_line.anchorOffsetX = 0;
		img_line.anchorOffsetY = 2;
		img_line.x = this.width / 2;
		img_line.y = this.height / 2;
		img_line.scale9Grid = new egret.Rectangle(1, 0, 13, 4);
		this.addChild(img_line);
		this.img_line = img_line;

		/**创建Icon*/
		this.comp_icon = new components.IconGoods();
		this.addChild(this.comp_icon);

		/**创建名称*/
		let lab_name = new eui.Label();
		lab_name.width = 150;
		lab_name.x = this.width / 2;
		lab_name.y = this.height + 5;
		lab_name.size = 20;
		lab_name.textAlign = egret.HorizontalAlign.CENTER;
		lab_name.anchorOffsetX = lab_name.width / 2;
		this.addChild(lab_name);
		this.lab_name = lab_name;
	}

	public open() {

	}

	public close() {

	}

	/**
	 * 设置位参数
	 * @param tParam 位置参数 格式[角度，x, y]
	 * */
	public setPosParam(tParam):void {

		let nRotation = tParam[0] || 0;
		let nX = tParam[1]
		let nY = tParam[2]

		let nLineLong = 50
		if (nRotation == 0 || nRotation == 180) {
			nLineLong = 80;
		}

		this.img_line.width = nLineLong+1000;
		this.img_line.rotation = nRotation
		if (nRotation != 90) {
			nX = nX - Math.cos(Math.PI / 180 * nRotation) * nLineLong;
			nY = nY + Math.sin(Math.PI / 180 * nRotation) * nLineLong;
		} else {
			nY = nY + 50
		}

		let noffx = 0
		let noffy = 0
		let tLinePos = null
		if (nRotation > 90 && nRotation < 270) {
			this.img_line.x = 0;
			this.img_line.y = 44;
		} else {
			this.img_line.x = 86;
			this.img_line.y = 44;
		}

		if (nRotation != 90) {
			nX = nX - this.img_line.x;
			nY = nY - this.img_line.y;
		} else {
			nX = nX - 44;
			nY = nY - 44;
		}

		this.x = nX;
		this.y = nY;
	}


	public setCostData($itemCfgId:number, $costNum:number):void{		
		this.itemCfgId = $itemCfgId;
		this.costNum = $costNum;

		this.updateViews();
	}

	public updateViews() {
		if (this.itemCfgId == null || this.costNum == null ){
			return;
		}

		let roleModel = <RoleModel>App.ControllerManager.getControllerModel(ControllerConst.Role);		
		let itemCfg = ConfigDb.itemConfig.getItemResourceDataById(this.itemCfgId);

		let iconData:components.IconData = new components.IconData();
		iconData.sIcon = itemCfg.icon+ "_png";						/**icon*/
		iconData.bShowName = true;
		iconData.sName = itemCfg.name;						/**名称*/
		iconData.bShowNum = true;
		iconData.nNum = roleModel.getResNum(itemCfg.id); 	/**拥有的数量*/
		iconData.nCostNum = this.costNum;					/**消耗的数量*/
		this.comp_icon.setCurData(iconData);
		

	}
	
}