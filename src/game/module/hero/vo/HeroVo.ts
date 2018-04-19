module hero {
	export class HeroVo {
		/**英雄唯一Id */
		public h: number;
		/**英雄模板Id */
		public t: number;
		/**英雄等级 */
		public l: number;
		/**当前经验 */
		public e: number;
		/**攻资质 */
		public ta: number;
		/**防资质 */
		public td: number;
		/**兵资质 */
		public tr: number;
		/**上阵位置 */
		public p: number;
		/**上阵采集队列位置 */
		public cp: number;
		/**上阵城防队列位置 */
		public dp: number;
		/**耐力值 */
		public s: number;
		/**统领兵力数 */
		public lt: number;
		/**武将出征中? 0否 1是 */
		public w: number;
		/**武将方阵数 */
		public ph: number;
		/**武将战斗力 */
		public sc: number;
		/**武将基础属性 */
		public ab:fight.AttributesVo;
		/**武将附加属性(其他系统加成) */
		public aa:fight.AttributesVo;
		/**武将进阶进度条 */
		public ap: number;
		/**武将是否神级进阶 0否 1是 */
		public ig: number;
		/**NPCid */
		public npc: number;
		/**星魂 */
		public sl:Array<hero.SoulList>;
		/**星魂突破 K:突破id,v:状态[1解锁,2突破] */
		public sb:Array<hero.Pair>;
		/**星魂额外提供的属性 */
		public sa:fight.AttributesVo;
		/**武将血量 (过关斩将用的) */
		public bloor: number;

		public constructor() {
		}		
	}
	export function getHeroBox(heroId:number): string{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let quality = heroBase.quality;
			let box = "";
			switch(quality){
				case 1:
					box = "v1_img_touxiangkuanghui_png";
					break;
				case 2:
					box = "v1_img_touxiangkuanglv_png";
					break;
				case 3:
					box = "v1_img_touxiangkuanglan_png";
					break;
				case 4:
					box = "v1_img_touxiangkuangzi_png";
					break;
				case 5:
					box = "v1_img_touxiangkuangcheng_png";
					break;
				case 6:
					box = "v1_img_touxiangkuanghong_png";
					break;
				case 7:
					box = "v1_img_touxiangkuangjin_png";
					break;
				default:
					break;
			}
			return box;
		}

		export function getHeroColor(heroId:number): string{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let quality = heroBase.quality;
			let color = "";
			switch(quality){
				case 1:
					color = "ffffff";
					break;
				case 2:
					color = "31d840";
					break;
				case 3:
					color = "77d4fd";
					break;
				case 4:
					color = "bc46ff";
					break;
				case 5:
					color = "feba29";
					break;
				case 6:
					color = "d72322";
					break;
				case 7:
					color = "f5d93d";
					break;
				default:
					break;
			}
			return "0x"+color;
		}

		export function getHeroQulifi(heroId:number): string{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let quality = heroBase.quality;
			let res = "";
			switch(quality){
				case 1:
					res = "v2_img_pelgbai_png";
					break;
				case 2:
					res = "v2_img_pelglu_png";
					break;
				case 3:
					res = "v2_img_pelglan_png";
					break;
				case 4:
					res = "v2_img_pelgzi_png";
					break;
				case 5:
					res = "v2_img_pelgcheng_png";
					break;
				case 6:
					res = "v2_img_pelghong_png";
					break;
				case 7:
					res = "v2_img_pelgcheng_png";
					break;
				default:
					break;
			}
			return res;
		}

		export function getHeroIcon(heroId:number): string{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];			
			return heroBase["icon"]+"_png";
		}

		export function getHeroKind(heroId:number): string{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let kind = heroBase["kind"];
			let source:string = "";
			if(kind == 1){
				source = "v1_img_bujiang02_png";
			}else if(kind == 2){
				source = "v1_img_qijiang_png";
			}else if(kind == 3){
				source = "v1_img_gongjiang02_png";
			}
			return source;
		}

		export function getHeroKindImage(heroId:number): string{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let kind = heroBase["kind"];
			let source:string = "";
			if(kind == 1){
				source = "v2_img_bu_png";
			}else if(kind == 2){
				source = "v2_img_qi_png";
			}else if(kind == 3){
				source = "v2_img_gong_png";
			}
			return source;
		}

		export function getHeroKindCurTroops(heroId:number): number{
			let roleModel: RoleModel = <RoleModel>App.ControllerManager.getControllerModel(ControllerConst.Role);
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let kind = heroBase["kind"];
			let troops:number = 0;
			if(kind == 1){				
				troops = roleModel.it;
			}else if(kind == 2){				
				troops = roleModel.sw;
			}else if(kind == 3){
				troops = roleModel.ac;
			}
			return troops;
		}

		export function getHeroName(heroId:number): string{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let name = "";			
			if(heroBase["name"]){
				name = heroBase["name"];
			}
			return name;
		}

		export function getHeroImg(heroId:number): string{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let img = "";			
			if(heroBase["img"]){
				img = heroBase["img"];
			}
			return img;
		}

		export function getTotalAtk(ab:fight.AttributesVo,aa:fight.AttributesVo): string{
			let abAts:Array<fight.AttribVo> = ab.ats;
			let aaAts:Array<fight.AttribVo> = aa.ats;
			let totalAtk = 0;
			if(abAts){
				totalAtk = totalAtk + fight.getAttriValue(abAts,fight.AttribNames.ATK);
			}
			if(aaAts){
				totalAtk = totalAtk + fight.getAttriValue(aaAts,fight.AttribNames.ATK);
			}
			return String(totalAtk);
		}

		export function getTotalDef(ab:fight.AttributesVo,aa:fight.AttributesVo): string{
			let abAts:Array<fight.AttribVo> = ab.ats;
			let aaAts:Array<fight.AttribVo> = aa.ats;
			let totalDef = 0;
			if(abAts){
				totalDef = totalDef + fight.getAttriValue(abAts,fight.AttribNames.DEF);
			}
			if(aaAts){
				totalDef = totalDef + fight.getAttriValue(aaAts,fight.AttribNames.DEF);
			}
			return String(totalDef);
		}
		
		
		/**
		 * 计算武将的所有兵力(包括其他系统附加的)
		 * @param  {fight.AttributesVo} ab
		 * @param  {fight.AttributesVo} aa
		 * @returns string
		 */
		export function getTotalTroops(ab:fight.AttributesVo,aa:fight.AttributesVo):string{
			let abAts:Array<fight.AttribVo> = ab.ats;
			let aaAts:Array<fight.AttribVo> = aa.ats;
			let total = 0;
			if(abAts){
				total = total + fight.getAttriValue(abAts,fight.AttribNames.TRP);
			}
			if(aaAts){
				total = total + fight.getAttriValue(aaAts,fight.AttribNames.TRP);
			}
			return String(total);
		}
		/**
		 * 计算武将的基础兵力
		 * @param  {fight.AttributesVo} ab 
		 * @returns string
		 */
		export function getBaseTroops(ab:fight.AttributesVo):string{
			let abAts:Array<fight.AttribVo> = ab.ats;
			let total = 0;
			if(abAts){
				total = total + fight.getAttriValue(abAts,fight.AttribNames.TRP);
			}
			return String(total);
		}

		export function getMainHeroDataSource(hs:Array<hero.HeroVo>): eui.ArrayCollection{
			if(!hs || 0 == hs.length){
				new eui.ArrayCollection()
			}
			//主力武将
			let mainHeros:Array<any> = [];			
			for (let hVo of hs) {				
				if (hVo.p == 0) {//上阵位置1,2,3,4
					continue;
				}
				let data:any = {};
				data.showNote = false;//不展示noteLb
				data.p = hVo.p;
				data.type = "main";
				data.img = hero.getHeroImg(hVo.h);
				data.box = hero.getHeroBox(hVo.h);
				data.color = hero.getHeroColor(hVo.h);
				data.icon = hero.getHeroIcon(hVo.h);
				data.troopType = hero.getHeroKind(hVo.h);
				data.troops = hVo.lt;
				data.maxTroops = Number(hero.getTotalTroops(hVo.ab,hVo.aa));
				data.name = hero.getHeroName(hVo.h);
				data.lv = hVo.l;
				data.atk = hero.getTotalAtk(hVo.ab,hVo.aa);
				data.def = hero.getTotalDef(hVo.ab,hVo.aa);
				data.warState = (hVo.w == 1 ? "v2_img_zhan_png" : "v2_img_xian_png");
				mainHeros[hVo.p - 1] = data;//对应数组下标需要减去1
			}
			//默认第一位(mainHeros下标0)肯定有武将
			if(!mainHeros[1]){//mainHeros数组下标为1对应上阵武将位置2
				let data:any = {};
				data.showNote = true;//展示noteLb
				data.p = 2;
				data.box = "v1_img_touxiangkuanghui_png";
				data.icon = "v1_btn_tianjia_png";
				data.note = "点击左侧加号选择上阵武将";
				mainHeros[1] = data;
			}
			if(!mainHeros[2]){//mainHeros数组下标为2对应上阵武将位置3
				let data:any = {};
				data.showNote = true;//展示noteLb
				data.p = 3;
				data.box = "v1_img_touxiangkuanghui_png";
				data.icon = "v1_img_lock_png";
				data.note = `研究"中级军势"解锁`;
				mainHeros[2] = data;
			}
			if(!mainHeros[3]){//mainHeros数组下标为3对应上阵武将位置4
				let data:any = {};
				data.showNote = true;//展示noteLb
				data.p = 4;
				data.box = "v1_img_touxiangkuanghui_png";
				data.icon = "v1_img_lock_png";
				data.note = `研究"高级军势"解锁`;
				mainHeros[3] = data;
			}
			return new eui.ArrayCollection(mainHeros);
		}

		export function getMainHero(hs:Array<hero.HeroVo>): any{
			//主力武将
			let mainHeros:any = {};
			if(!hs || 0 == hs.length){
				return mainHeros;
			}			
			for (let hVo of hs) {				
				if (hVo.p == 0) {//上阵位置1,2,3,4
					continue;
				}				
				mainHeros[hVo.p] = hVo;
			}
			return mainHeros;
		}
		
		/**
		 * @description 获取上阵采集队列数据源
		 * @param  {Array<hero.HeroVo>} hs
		 * @returns {eui.ArrayCollection}
		 */
		export function getColHeroDataSource(hs:Array<hero.HeroVo>): eui.ArrayCollection{
			if(!hs || 0 == hs.length){
				new eui.ArrayCollection()
			}
			//采集武将
			let colHeros:Array<any> = [];			
			for (let hVo of hs) {				
				if (hVo.cp == 0) {//上阵位置1,2,3,4
					continue;
				}
				let data:any = {};
				data.showNote = false;//不展示noteLb
				data.p = hVo.cp;
				data.type = "collect";
				data.img = hero.getHeroImg(hVo.h);
				data.box = hero.getHeroBox(hVo.h);
				data.color = hero.getHeroColor(hVo.h);
				data.icon = hero.getHeroIcon(hVo.h);
				data.troopType = hero.getHeroKind(hVo.h);
				data.troops = hVo.lt;
				data.maxTroops = Number(hero.getTotalTroops(hVo.ab,hVo.aa));
				data.name = hero.getHeroName(hVo.h);
				data.lv = hVo.l;
				data.atk = hero.getTotalAtk(hVo.ab,hVo.aa);
				data.def = hero.getTotalDef(hVo.ab,hVo.aa);
				data.warState = (hVo.w == 1 ? "v2_img_zhan_png" : "v2_img_xian_png");
				colHeros[hVo.cp - 1] = data;//对应数组下标需要减去1
			}
			
			if(!colHeros[0]){//colHeros数组下标为0对应上阵武将位置1(下面的一样)
				let data:any = {};
				data.showNote = true;//展示noteLb
				data.p = 1;
				data.box = "v1_img_touxiangkuanghui_png";
				data.icon = "v1_btn_tianjia_png";
				data.note = "点击左侧加号选择上阵武将";
				colHeros[0] = data;
			}

			if(!colHeros[0]){//colHeros数组下标为0对应上阵武将位置1(下面的一样)
				let data:any = {};
				data.showNote = true;//展示noteLb
				data.p = 1;
				data.box = "v1_img_touxiangkuanghui_png";
				data.icon = "v1_btn_tianjia_png";
				data.note = "点击左侧加号选择上阵武将";
				colHeros[0] = data;
			}

			if(!colHeros[1]){
				let data:any = {};
				data.showNote = true;//展示noteLb
				data.p = 2;
				data.box = "v1_img_touxiangkuanghui_png";
				data.icon = "v1_btn_tianjia_png";
				data.note = "点击左侧加号选择上阵武将";
				colHeros[1] = data;
			}

			if(!colHeros[2]){
				let data:any = {};
				data.showNote = true;//展示noteLb
				data.p = 3;
				data.box = "v1_img_touxiangkuanghui_png";
				data.icon = "v1_btn_tianjia_png";
				data.note = "点击左侧加号选择上阵武将";
				colHeros[2] = data;
			}

			if(!colHeros[3]){
				let data:any = {};
				data.showNote = true;//展示noteLb
				data.p = 4;
				data.box = "v1_img_touxiangkuanghui_png";
				data.icon = "v1_btn_tianjia_png";
				data.note = "点击左侧加号选择上阵武将";
				colHeros[3] = data;
			}
			
			return new eui.ArrayCollection(colHeros);
		}
		
		/**
		 * @description 获取所有上阵采集武将
		 * @param  {Array<hero.HeroVo>} hs
		 * @returns any
		 */
		export function getColHero(hs:Array<hero.HeroVo>): any{
			//上阵武将
			let colHeros:any = {};
			if(!hs || 0 == hs.length){
				return colHeros;
			}			
			for (let hVo of hs) {				
				if (hVo.cp == 0) {//上阵位置1,2,3,4
					continue;
				}				
				colHeros[hVo.cp] = hVo;
			}
			return colHeros;
		}

		export function getHeroBaseAtkQulify(heroId:number): number{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let qulify = "";			
			if(heroBase["basetalentatk"]){
				qulify = heroBase["basetalentatk"];
			}
			return Number(qulify);
		}

		export function getHeroBaseDefQulify(heroId:number): number{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let qulify = "";			
			if(heroBase["basetalentdef"]){
				qulify = heroBase["basetalentdef"];
			}
			return Number(qulify);
		}

		export function getHeroBaseTrpQulify(heroId:number): number{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let qulify = "";			
			if(heroBase["basetalenttrp"]){
				qulify = heroBase["basetalenttrp"];
			}
			return Number(qulify);
		}

		export function getHeroBaseAtkQulifyLimit(heroId:number): number{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let qulify = "";			
			if(heroBase["talentlimitatk"]){
				qulify = heroBase["talentlimitatk"];
			}
			return Number(qulify);
		}

		export function getHeroBaseDefQulifyLimit(heroId:number): number{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let qulify = "";			
			if(heroBase["talentlimitdef"]){
				qulify = heroBase["talentlimitdef"];
			}
			return Number(qulify);
		}

		export function getHeroBaseTrpQulifyLimit(heroId:number): number{
			let heroConf = ConfigDb.heroConfig.getHeroData();
			let heroBase = heroConf[heroId];
			let qulify = "";			
			if(heroBase["talentlimittrp"]){
				qulify = heroBase["talentlimittrp"];
			}
			return Number(qulify);
		}

		/**通过传入品质获取对应框 */
		export function getBox(quality:number): string{
			let box = "";
			switch(quality){
				case 1:
					box = "v1_img_touxiangkuanghui_png";
					break;
				case 2:
					box = "v1_img_touxiangkuanglv_png";
					break;
				case 3:
					box = "v1_img_touxiangkuanglan_png";
					break;
				case 4:
					box = "v1_img_touxiangkuangzi_png";
					break;
				case 5:
					box = "v1_img_touxiangkuangcheng_png";
					break;
				case 6:
					box = "v1_img_touxiangkuanghong_png";
					break;
				case 7:
					box = "v1_img_touxiangkuangjin_png";
					break;
				default:
					break;
			}
			return box;
		}
		/**通过传入兵种类型获取对应图片 */
		export function getKindImage(kind:number): string{
			let source:string = "";
			if(kind == 1){
				source = "v1_img_bujiang02_png";
			}else if(kind == 2){
				source = "v1_img_qibing02b_png";
			}else if(kind == 3){
				source = "v1_img_gongjiang02_png";
			}
			return source;
		}
}