



class EquipVo {
	public bIsNew: boolean = false;


	public nId: number = 0; 							/**装备的ID(配置id)*/
	public sUuid: string = ""; 							/**装备的UUID(唯一id)*/
	public nHeroId: number = 0;						 	/**装备穿在哪个武将身上*/
	public nStrenthLv: number = 0;						/**装备的强化等级*/
	public tStrenthCost: number = 0;					/**装备的强化消耗*/
	public tStarDarkLights: boolean[];					/**洗炼星星明亮列表*/

	public tHiddenTAVo: TrainAtbVo;
	public tTrainAtbVos: TrainAtbVo[] = new Array<TrainAtbVo>();

	public constructor(_tData: any) {

		this.update(_tData);
	}

	public update(_tData: any): void {
		if (!_tData) {
			return
		}



		this.nId = _tData.i;
		this.sUuid = _tData.u;
		this.updateTrainAtbVos(_tData.ns);
		this.updateTrainAtbVo(_tData.h);
		this.nHeroId = _tData.w;
		this.nStrenthLv = _tData.sl;
		this.tStrenthCost = _tData.sc;

		this.tStarDarkLights = new Array<boolean>();
		let tTrainAtbVos = this.getTrainAtbVos();
		for (let v of tTrainAtbVos) {
			this.tStarDarkLights.push(v.getIsLvMax())
		}
	}

	private updateTrainAtbVos(_tData) {
		if (!_tData) {
			return;
		}

		let nPrevCount = this.tTrainAtbVos.length;
		let nCurrCount = _tData.length;

		/**移除多余的属性*/
		this.tTrainAtbVos.splice(nCurrCount, nPrevCount - nCurrCount);

		for (let i = 0; i < _tData.lenght; ++i) {
			if (this.tTrainAtbVos[i]) {
				/**更新属性*/
				this.tTrainAtbVos[i].update(_tData[i])
			} else {
				/**新增属性*/
				this.tTrainAtbVos.push(new TrainAtbVo(_tData[i], this.nId))
			}
		}
	}

	public updateTrainAtbVo(_tData: any): void {
		if (!_tData) {
			this.tHiddenTAVo = null
			return
		}

		if (this.tHiddenTAVo) {
			this.tHiddenTAVo.update(_tData)
		} else {
			this.tHiddenTAVo = new TrainAtbVo(_tData, this.nId);
		}
	}


	/**
	 * 获取对应的配置数据
	*/
	public getConfigData(): any {
		return ConfigDb.equipConfig.getBaseEquipDataByID(this.nId);
	}

	/**洗炼vo列表,用于背包模块的装备显示*/
	public getTrainAtbVos(): Array<TrainAtbVo> {
		let tTrainAtbVos = new Array<TrainAtbVo>();
		if (this.tTrainAtbVos) {
			for (let v of this.tTrainAtbVos) {
				this.tTrainAtbVos.push(v)
			}
		}
		if (this.tHiddenTAVo) {
			tTrainAtbVos.push(this.tHiddenTAVo);
		}
		return tTrainAtbVos
	}

	/**
	 * 获取当前洗炼属性等级总和
	 * @return 
	*/
	public getCurrAttrLvTotal(): number {
		let nLv = 0
		for (let v of this.tTrainAtbVos) {
			nLv = nLv + v.nLv
		}
		if (this.tHiddenTAVo) {
			nLv = nLv + this.tHiddenTAVo.nLv
		}
		return nLv
	}

	/**
	 * 判断当前洗炼属性是否已满
	 * @return
	*/
	public getIsCurrRefineLvMax(): boolean {
		let tTrainAtbVos: Array<TrainAtbVo> = this.getTrainAtbVos()
		for (let v of tTrainAtbVos) {
			if (!v.getIsLvMax()) {
				return false
			}
		}
		return true
	}

	/**
	 * 判断是不是可以高级洗炼
	 * @return
	 * */
	public getIsCanHighRefine() {
		if (this.getIsCurrRefineLvMax()) {
			let tTrainAtbVos: Array<TrainAtbVo> = this.getTrainAtbVos()
			return tTrainAtbVos.length >= 3
		}
		return false
	}

	/**
	 * 判断是否全属性一致
	 * @return
	 * */
	public getIsAllTrainAtbSame(): boolean {
		let tTrainAtbVos: Array<TrainAtbVo> = this.getTrainAtbVos();
		let nPrevAttrId = tTrainAtbVos[0] ? tTrainAtbVos[0].nAttrId : -9999;
		for (let v of tTrainAtbVos) {
			if (nPrevAttrId != v.nAttrId) {
				return false
			}
		}
		return true
	}

	/**
	 * 获取装备上的所有属性(基础、洗炼、强化属性)
	 * @return
	*/
	public getEquipAllAttrs(): Equip.AttObj[] {
		let tAllTrainAtbVos = new Array<Equip.AttObj>()
		/**装备的洗炼属性(引用的)*/
		let tTrainAtbVos: Array<TrainAtbVo> = this.getTrainAtbVos();
		for (let v of tTrainAtbVos) {
			tAllTrainAtbVos.push(new Equip.AttObj(v.nAttrId, v.nAttrValue));
		}

		/**装备的基础属性*/
		let tEquipData = ConfigDb.equipConfig.getBaseEquipDataByID(this.nId);
		if (tEquipData) {
			let sAttr: string[] = tEquipData.sAttributes.split(":");
			let bFind = false
			for (let v of tAllTrainAtbVos) {
				if (v.nAttrId == Number(sAttr[1])) {
					v.nAttrValue = v.nAttrValue + Number(sAttr[2])
					bFind = true
				}
			}
			if (!bFind) {
				tAllTrainAtbVos.push(new Equip.AttObj(Number(sAttr[1]), Number(sAttr[2])));
			}
		}

		/**装备的强化属性*/
		let tStrenAttr = this.getStrengthAttrs()
		if (tStrenAttr) {
			let bFind = false;
			for (let v of tAllTrainAtbVos) {
				if (v.nAttrId == tStrenAttr.nAttrId) {
					v.nAttrValue = v.nAttrValue + tStrenAttr.nAttrValue
					bFind = true
				}
			}

			if (!bFind) {
				tAllTrainAtbVos.push(tStrenAttr)
			}
		}

		return tAllTrainAtbVos
	}


	/**
	 * 获取装备的强化属性
	 * @return 
	 * */
	public getStrengthAttrs(): Equip.AttObj {
		if (this.nStrenthLv == 0) {
			return null
		}
		let tEquip = ConfigDb.equipConfig.getBaseEquipDataByID(this.nId)
		if (!tEquip) {
			return null
		}
		let tStrenConf = ConfigDb.equipConfig.getEquipStrengthInfo(tEquip.nQuality, this.nStrenthLv)
		if (tStrenConf) {
			let tParam = App.StringUtils.splitMuilt(tStrenConf.attr, "|", ",", ":");
			for (let pa of tParam) {
				if (Number(pa[1]) == tEquip.nKind) {
					return new Equip.AttObj(Number(pa[2][1]), Number(pa[2][2]));
				}
			}
		}
		return null
	}


	/**
	 * 获取装备上的战力
	 * */
	public getEquipPower(): number {
		/**装备的洗炼属性*/
		let tTrainAtbVos = this.getEquipAllAttrs();
		let nEquipPower = 0
		for (let v of tTrainAtbVos) {
			switch (v.nAttrId) {
				case HERO.ENUM_HERO_ATT_ID.gongji:
					nEquipPower = nEquipPower + v.nAttrValue * Number(ConfigDb.roleConfig.getGlobleParam("scoreAtk"))
					break;
				case HERO.ENUM_HERO_ATT_ID.fangyu:
					nEquipPower = nEquipPower + v.nAttrValue * Number(ConfigDb.roleConfig.getGlobleParam("scoreDef"))
					break;
				case HERO.ENUM_HERO_ATT_ID.bingli:
					nEquipPower = nEquipPower + v.nAttrValue * Number(ConfigDb.roleConfig.getGlobleParam("scoreTrp"))
					break;
				case HERO.ENUM_HERO_ATT_ID.mingzhong:
					nEquipPower = nEquipPower + v.nAttrValue * Number(ConfigDb.roleConfig.getGlobleParam("scoreHit"))
					break;
				case HERO.ENUM_HERO_ATT_ID.shanbi:
					nEquipPower = nEquipPower + v.nAttrValue * Number(ConfigDb.roleConfig.getGlobleParam("scoreDod"))
					break;
				case HERO.ENUM_HERO_ATT_ID.baoji:
					nEquipPower = nEquipPower + v.nAttrValue * Number(ConfigDb.roleConfig.getGlobleParam("scoreCri"))
					break;
				case HERO.ENUM_HERO_ATT_ID.jianyi:
					nEquipPower = nEquipPower + v.nAttrValue * Number(ConfigDb.roleConfig.getGlobleParam("scoreTou"))
					break;
				case HERO.ENUM_HERO_ATT_ID.qianggong:
					nEquipPower = nEquipPower + v.nAttrValue * Number(ConfigDb.roleConfig.getGlobleParam("scoreSatk"))
					break;
				case HERO.ENUM_HERO_ATT_ID.qiangfang:
					nEquipPower = nEquipPower + v.nAttrValue * Number(ConfigDb.roleConfig.getGlobleParam("scoreSdef"))
					break;
				case HERO.ENUM_HERO_ATT_ID.gongcheng:
					nEquipPower = nEquipPower + v.nAttrValue * Number(ConfigDb.roleConfig.getGlobleParam("scoreSiege"))
					break;
				case HERO.ENUM_HERO_ATT_ID.shoucheng:
					nEquipPower = nEquipPower + v.nAttrValue * Number(ConfigDb.roleConfig.getGlobleParam("scoreDefCt"))
					break;
			}
		}
		return nEquipPower
	}

	/**
	 * 获取装备上的兵力属性值 
	 * */
	public getEquipBingliValue() {
		let tTrainAtbVos: Equip.AttObj[] = this.getEquipAllAttrs()
		let nValue = 0
		for (let v of tTrainAtbVos) {
			if (v.nAttrId == HERO.ENUM_HERO_ATT_ID.bingli) {
				nValue = nValue + v.nAttrValue * Number(ConfigDb.roleConfig.getGlobleParam("scoreTrp"))
				break
			}
		}
		return nValue
	}

	/**
	 * 设置是否显示新标识
	 * */
	public setIsNew(bIsNew: boolean): void {
		this.bIsNew = bIsNew;
	}


	/**
	 * 获取是否显示新标识
	 * */
	public getIsNew(): boolean {
		return this.bIsNew;
	}


	/**
	 * 获取是否空闲
	 * */
	public getIsIdle(): boolean {
		return this.nHeroId == 0;
	}


	/**
	 * 是否有隐藏属性
	 * */
	public getIsHasHiddenTAVo(): boolean {
		if (this.tHiddenTAVo) {
			return true;
		}
		return false;
	}


	/**
	 * 获取装备当前实心星星数量
	 * */
	public getSolidStarNum(): number {
		let nSolidNum = 0;
		for (let v of this.tStarDarkLights) {
			if (v == true) {
				nSolidNum = nSolidNum + 1;
			}
		}
		return nSolidNum;
	}

	/**
	 * 获取装备强化等级
	 * */
	public getEquipStrenthLv(): number {
		return this.nStrenthLv;
	}

	/**
	 * 获取当前属性值
	 * */
	public getAttrValue(): number {
		let nValue = 0;
		let tEquip = ConfigDb.equipConfig.getBaseEquipDataByID(this.nId);
		if (tEquip) {
			nValue += tEquip.nAttrValue;

			let tStrenAttr: Equip.AttObj = this.getStrengthAttrs();
			if (tStrenAttr) {
				nValue += tStrenAttr.nAttrValue;
			}
		}
		return nValue
	}



	/**
	 * 获取该装备品质
	 * */
	public getQuality(): number {
		let tEquip = ConfigDb.equipConfig.getBaseEquipDataByID(this.nId)
		if (!tEquip) {
			return 0
		}
		return tEquip.nQuality
	}


	/**
	 * 获取该装备类型
	 * */
	public getKind(): number {
		let tEquip = ConfigDb.equipConfig.getBaseEquipDataByID(this.nId)
		if (!tEquip) {
			return 0
		}
		return tEquip.nKind
	}


}

module Equip {
	export class AttObj {
		public nAttrId: number;
		public nAttrValue: number;
		constructor(id: number, value: number) {
			this.nAttrId = id;
			this.nAttrValue = value;
		}
	}
}

