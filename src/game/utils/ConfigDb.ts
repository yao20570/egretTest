/**
 * 配表系统信息(必须等加载完db资源组后才可以使用)
 * @since 2018-03-26 17:09:26
 * @author hjielong
 */
class ConfigDb {	
	/**角色系统配表 */
	static roleConfig:RoleConfig;
	/**建筑信息配表*/
	static buildConfig:BuildConfig;
	static palaceConfig:PalaceConfig;
	/**武将配表 */
	static heroConfig:HeroConfig;
	static countryConfig:any;

	/**装备配置*/
	static equipConfig:EquipConfig;
	/** 科技园配置 */
	static scienceConfig:ScienceConfig;

	/** 副本系统配表 */
	static ectypeConfig:EctypeConfig;

	/**物品配置表*/
	static itemConfig:ItemConfig;

	/**一些*/
	static globalConfig:GlobalConfig;

	// ============================== ↓VIP 相关↓ ==============================
	private static tAvatarVip:any; // vip存储数据
	/** 获取所有的vip数据 */
	public static getAvatarVIPData(): any {
		if (this.tAvatarVip) return this.tAvatarVip;
		this.tAvatarVip = {};
		let tData: JSON = RES.getRes("avatar_vip_json");
		if (tData) {
			for (let k in tData) {
				let pObj = tData[k];
				this.tAvatarVip[pObj.lv] = pObj;
			}
		}
		return this.tAvatarVip;
	}
	/**
	 * 根据vip等级获取对应的vip数据
	 * @param  {any} _nLv vip等级
	 * @returns any vip数据
	 */
	public static getAvatarVIPByLevel(_nLv): any {
		if (this.tAvatarVip == null) this.getAvatarVIPData();
		return this.tAvatarVip[_nLv];
	}
	// ============================== ↑VIP 相关↑ ==============================
	// ============================== ↓错误信息或提示语 相关↓ ==============================
	private static tTipsByIndex = {};
	public static getTipsByIndex(_nId:number): string {
		let sTips = this.tTipsByIndex[_nId];
		if (sTips) return sTips;
		let tData: JSON = RES.getRes("tips_base_json");
		if (tData) {
			for (let k in tData) {
				let pObj = tData[k];
				if (pObj["tip_index"] == _nId) {
					sTips = pObj.content
					this.tTipsByIndex[_nId] = sTips;
					break;
				}
			}
		}
		return sTips;
	}
	// ============================== ↑错误信息或提示语 相关↑ ==============================
	public static getGoodsByTidFromDB(_sTid):any {
		if (_sTid == null) return null;
		let pGoods:any;
		let nNum = parseInt(_sTid);
		if(nNum >= 1 && nNum <= 199) // 资源
			Log.trace("getGoodsByTidFromDB 方法未实现");
		else if (nNum >= 201 && nNum <= 299) // 神兵
			Log.trace("getGoodsByTidFromDB 方法未实现");
		// else if (nNum >= 1001 && nNum <= 1099) // 地图
		else if (nNum >= 2001 && nNum <= 2999) // 装备
			Log.trace("getGoodsByTidFromDB 方法未实现");
		else if (nNum >= 3001 && nNum <= 3999) //科技
			Log.trace("getGoodsByTidFromDB 方法未实现");
		// else if (nNum >= 10000 && nNum <= 10999) // 建筑
			//建筑由于比较特殊 不在这里获取
		// else if  (nNum >= 11001 && nNum <= 11999) // 城池
		// else if  (nNum >= 12001 && nNum <= 12999) // 矿点
		// else if (nNum >= 13001 && nNum <= 13999) // 乱军
		// else if (nNum >= 20001 && nNum <= 29999) // 任务
		else if (nNum >= 30001 && nNum <= 39999) // buff
			Log.trace("getGoodsByTidFromDB 方法未实现");
		// else if (nNum >= 50001 && nNum <= 70000) // 掉落id
		// else if (nNum >= 70001 && nNum <= 89999) // 怪物组
		else if (nNum >= 700001 && nNum <= 999999) // 怪物
			// Log.trace("getGoodsByTidFromDB 方法未实现");
			return this.getNPCData(nNum);
		else if (nNum >= 100001 && nNum <= 129999) // 物品
			Log.trace("getGoodsByTidFromDB 方法未实现");
		// else if (nNum >= 130000 && nNum <= 139999) //头像id
		// else if (nNum >= 140000 && nNum <= 149999) //头像框id	
		else if (nNum >= 200001 && nNum <= 299999) // 英雄
			pGoods = this.getHeroDataById(nNum);
		return pGoods; 
	}
	// ============================== ↓武将数据 相关↓ ==============================
	private static tHeroData = {};
	public static getHeroDataById(_nHid:number):any {
		if (_nHid === null) return null;
		
		if (!this.tHeroData[_nHid]) {
			let tData: JSON = RES.getRes("hero_base_json");
			if (tData) {
				for (let k in tData) {
					let pObj = tData[k];
					if (pObj["id"] == _nHid) {
						this.tHeroData[_nHid] = pObj;
						break;
					}
				}
			}
		}
		let pObj:any = this.tHeroData[_nHid];
		if (pObj) {
			return {
				nGtype:1,
				nKey:pObj.key,
				sName:pObj.name,
				sIcon:pObj.icon + "_png",
				sImg:pObj.img,
				nType:pObj.type,
				nStar:pObj.star,
				nQuality:pObj.quality,
				nKind:pObj.kind,
				nCategory:pObj.category
			}
		}
		return null;
	}
	private static tNpcData = {};
	/** 获取NPC */
	public static getNPCData(_nId, _type?): any {
		if (_nId == null) return;
		if (_type == null) _type = 1;
		if (!this.tNpcData[_nId]) {
			let tData: JSON = RES.getRes("npc_monster_json");
			if (tData) {
				for (let k in tData) {
					let pObj = tData[k];
					if (pObj["id"] == _nId) {
						this.tNpcData[_nId] = pObj;
						break;
					}
				}
			}
		}
		let pObj:any = this.tNpcData[_nId];
		if (pObj) {
			return {
				nGtype:1,
				nKey:0,
				sName:pObj.name,
				sIcon:pObj.icon + "_png",
				sImg:pObj.img,
				nType:0,
				nStar:pObj.star,
				nQuality:pObj.quality,
				nKind:pObj.kind,
				nCategory:0
			}
		}
		return null;
	}
	// ============================== ↑武将数据 相关↑ ==============================

	
}