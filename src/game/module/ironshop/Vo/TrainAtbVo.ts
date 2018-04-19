/**
 * 洗练属性
*/

class TrainAtbVo {

	public nEquipId: number;	/**装备Id*/

	public nLv: number;			/**装备等级*/
	public nIdentify: number;	

	public nAttrId: number;
	public nAttrValue: number;

	public constructor(_tData: any, _nEquipId: number) {
		this.nEquipId = _nEquipId;
		this.update(_tData);
	}

	/**
	 * 克隆一份数据
	*/
	public clone():TrainAtbVo{
		let c 		= new TrainAtbVo(null, null);
		c.nEquipId 	= this.nEquipId;
		c.nLv 		= this.nLv;
		c.nIdentify = this.nIdentify;
		c.nAttrId 	= this.nAttrId;
		c.nAttrValue= this.nAttrValue;
		return c;
	}

	public update(_tData) {
		if (!_tData){
			return;
		}
		this.nLv = Number(_tData.l);				/**洗炼属性等级*/
		this.nIdentify = Number(_tData.i);			/**洗炼属性标识[对应equip_train_attr表里的属性字段,假如i=2就取表里的atb2字段属性配置]*/

		/**自定义数据*/
		let tAttrData = ConfigDb.equipConfig.getEquipTrainAttr(this.nLv);
		if (tAttrData) {
			let sAttr: string = <string>tAttrData["atb" + this.nIdentify]
			if (sAttr) {
				let tAttr: Array<string> = <Array<string>>sAttr.split(":");
				this.nAttrId = Number(tAttr[1]);		/**自定义数据，属性id*/
				this.nAttrValue = Number(tAttr[2]);		/**自定义数据，属性值*/
			}
		}
	}

	/**
	 * 获取洗炼等级是否满
	 * */
	public getIsLvMax(): boolean {
		if (this.nLv) {
			return false
		}
		let tEquipData = ConfigDb.equipConfig.getBaseEquipDataByID(this.nEquipId)
		if (!tEquipData) {
			Error("TrainAtbVo.getIsLvMax->没找到数据")
			return true
		}
		return this.nLv >= tEquipData.nTrainLvTop;
	}


}