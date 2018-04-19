class EquipConfig extends BaseConfig {


	private tBaseAttribute: any
	private tBaseEquipData: any
	private tBaseEquipDataByQuality: any;
	private nEquipQualityMax: number;
	private tEquipTrainAttr: any;
	private nEquipTrainAttrLvMax: number;
	private tEquipInit: any;
	private tEquipStrenthDic: any;

	public constructor(resources: string[]) {
		super("EquipConfig", resources);
	}

	/**
	 * 通过装备id获取装备数据数据（和任我有区别，任我构建了一个数据结构来转化这个数据）
	 * @_id : 装备配置id
	 * */
	public getBaseAttributeById(_id):any {
		/**初始化配置表*/
		if (!this.tBaseAttribute) {
			this.tBaseAttribute = {}
			let data: JSON = RES.getRes("attribute_base_json");
			for (let i in data) {
				let row = data[i];
				let key = row.id;
				this.tBaseAttribute[key] = row;
			}
		}
		return this.tBaseAttribute[_id]
	}

	/**
	 * 通过装备id获取装备数据数据（和任我有区别，任我构建了一个数据结构来转化这个数据）
	 * @_id : 装备配置id
	 * */
	public getBaseEquipDataByID(_id):any {
		/**初始化配置表*/
		if (!this.tBaseEquipData) {
			this.tBaseEquipData = {}
			let data: JSON = RES.getRes("equip_base_json");
			for (let i in data) {
				let row = data[i];
				let key = row.id;
				this.tBaseEquipData[key] = row;
			}
		}

		return this.tBaseEquipData[_id]
	}
	
	/**
	 * 通过装备id获取装备数据数据（和任我有区别，任我构建了一个数据结构来转化这个数据）
	 * @_quality : 装备品质
	 * */
	public getEquipsDataByQuality(_quality):any {
		/**初始化配置表*/
		if (!this.tBaseEquipDataByQuality) {
			this.tBaseEquipDataByQuality = {}
			
			let data: JSON = RES.getRes("equip_base_json");
			for (let i in data) {
				let row = data[i];
				let quality = row.quality;
				if (!this.tBaseEquipDataByQuality[quality]){
					this.tBaseEquipDataByQuality[quality] = new Array();
				}
				this.tBaseEquipDataByQuality[quality].push(row);
			}
		}
		return this.tBaseEquipDataByQuality[_quality]
	}

	/**
	 * 获取装备最高品质
	 * */
	public getEquipQualityMax():number {
		if (!this.nEquipQualityMax) {
			this.nEquipQualityMax = 0;
			let data: JSON = RES.getRes("equip_base_json");
			for (let i in data) {
				let row = data[i];
				let quality = row.quality;
				this.nEquipQualityMax = Math.max(this.nEquipQualityMax, quality);
			}
		}

		return this.nEquipQualityMax
	}
	
	/**
	 * 获取洗炼数据
	 * @nLv:洗练等级
	 * @return：返回对应的洗练数据
	 * */
	public getEquipTrainAttr(nLv: number): any {
		if (this.tEquipTrainAttr[nLv]) {
			return this.tEquipTrainAttr[nLv];
		}

		this.tEquipTrainAttr = {};
		// 读取JSON配置
		let data: JSON = RES.getRes("equip_train_attr_json");
		for (let i in data) {
			this.tEquipTrainAttr[i] = data[i];
		}

		return this.tEquipTrainAttr[nLv];
	}

	/**
	 * 获取洗炼最高等级
	 * @return
	*/
	public getEquipTrainAttrLvMax(): number {
		if (this.nEquipTrainAttrLvMax == null) {
			this.nEquipTrainAttrLvMax = 0;
			let data: JSON = RES.getRes("equip_train_attr_json");
			for (let v in data) {
				++this.nEquipTrainAttrLvMax;
			}
		}
		return this.nEquipTrainAttrLvMax;
	}

	/**
	 * 装备初始表
	 * @sKey
	 * @return
	 * */
	public getEquipInitParam(sKey: string): any {
		if (!this.tEquipInit) {
			this.tEquipInit = RES.getRes("equip_init_json");
		}
		return this.tEquipInit[sKey]
	}


	/**
	 * 根据装备品质获取强化数据
	 * @_nQuality : 装备品质
	 * @return 
	 * */
	public getEquipStrengthByQuality(_nQuality: number): any {
		if (this.tEquipStrenthDic[_nQuality]) {
			return this.tEquipStrenthDic[_nQuality];
		}

		this.tEquipStrenthDic = {}
		let data: JSON = RES.getRes("equip_strprob_json");
		for (let k in data) {
			let row = data[k];
			let key = row.level;
			if (!this.tEquipStrenthDic[_nQuality]){
				this.tEquipStrenthDic[_nQuality] = {}
			}
			this.tEquipStrenthDic[_nQuality][key] = {
				attr: <number>row["attr" + _nQuality],
				prob: <number>row["prob" + _nQuality], 					/**成功基础概率*/
				resources: <number>row["resources" + _nQuality],
				stone: <number>row["stone" + _nQuality] 				/**突破石数量*/
			};
		}
		return this.tEquipStrenthDic[_nQuality];
	}

	/**
	 * 根据品质和强化等级获取强化数据
	 * @_nQuality	:品质
	 * @_nLv		:等级
	 * @return
	*/
	public getEquipStrengthInfo(_nQuality, _nLv):any {
		if (!this.tEquipStrenthDic[_nQuality]) {
			this.getEquipStrengthByQuality(_nQuality)
		}
		return this.tEquipStrenthDic[_nQuality][_nLv];
	}


	/**
	 * 获取打造显示的装备数据
	 * */
	public getEquipsInSmith( nQuality ):Array<any> {
		let tRes = [];
		let tEquipDatas = this.getEquipsDataByQuality(nQuality);
		for(let v of tEquipDatas ){
			if (v.isshow){
				tRes.push(v);
			} 
		}			
		return tRes
	}
	

}