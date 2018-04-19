/**
 * @Author: jrc 
 * @Date: 2018-4-4 11:23:35 
 * @Description: 小方阵
 */

class FightTeamPhalanx extends eui.Component {
	/** 上下方向 */
	public nDir: number;
	/** 小方阵的位置 */
	public nPos: number;
	/** 战报类型 */
	public nFType: number;
	/** 是否是限时boss */
	public bIsTLBoss: boolean;

	/** 特效坐标位置X */
	public nArmX: number;
	/** 特效坐标位置Y */
	public nArmY: number;
	/** 动作类型 */
	public nArmType: number;
	/** 动作数据索引 */
	public sArmyKey: string;
	/** 兵种类型 */
	public nKind: number;

	/** 动作特效 */
	public pArmAct: MArmature;
	/** 蓄力特效 */
	private pArmGetRead:MArmature;
	/** 受击特效 */
	private pArmHurt: MArmature;
	/** 武将蓄力（技能）特效 */
	private pArmGather: MArmature;


	/**
	 * @param  {number} _nDir 上下方向
	 * @param  {number} _nPos 小方阵的位置(左中右)
	 * @param  {number} _nFType 战报类型
	 */
	public constructor(_nDir:number, _nPos:number, _nFType:number) {
		super();
		this.myInit();
		this.nDir = _nDir;
		this.nPos = _nPos;
		this.nFType = _nFType;
		this.bIsTLBoss = _nFType === FReportType.tlboss && this.nDir === 2;

		this.setupViews();
	}
	/** 初始化数据 */
	public myInit(): void {
		this.nDir = 0;
		this.nPos = 1;
		this.nFType = 0;
		this.bIsTLBoss = false;

		this.nArmX = 0;
		this.nArmY = 0;
		this.nArmType = 0;
		this.sArmyKey = null;
		this.nKind = 0;

		this.pArmAct = null;
		this.pArmGetRead = null;
		this.pArmHurt = null;
		this.pArmGather = null;
		this.nHurtCallBackIndex = null;
		this.nGetReadyIndex = null;

		this.nAtkCallback = null;
		this.nDeathCallback = null;
		this.nHurtCallback = null;
		this.nGatherCallback = null;
	}
	/** 初始化界面 */
	public setupViews(): void {
		this.width = this.height = 2;
	}

	/** 攻击回调 */
	private nAtkCallback: Function;
	/** 设置攻击回调 */
	public setAtkCallBack(_nCallback:Function):void {
		this.nAtkCallback = _nCallback;
	}
	/** 死亡回调 */
	private nDeathCallback: Function;
	/** 设置死亡回调 */
	public setDeathCallback(_nCallback:Function): void {
		this.nDeathCallback = _nCallback;
	}
	/** 对方受击回调 */
	private nHurtCallback: Function;
	/** 设置对方受击回调 */
	public setHurtCallback(_nCallback:Function): void {
		this.nHurtCallback = _nCallback;
	}
	/** 蓄力回调 */
	private nGatherCallback: Function;
	/** 设置蓄力回调 */
	public setGatherCallback(_nCallback:Function): void {
		this.nGatherCallback = _nCallback;
	}

	/** 停止特效播放 */
	public stopArm(): void {
		if (this.pArmAct) this.pArmAct.stop();
	}

	/** 对方受击回调帧下标 */
	private nHurtCallBackIndex:number;
	/** 受击掉血回调帧下标 */
	private nGetReadyIndex: number;
	/**
	 * 播放特效
	 * @param  {number} _nKind 兵种类型
	 * @param  {number} _nType 动作类型
	 * @param  {number} _nIndex 方阵下标
	 * @returns void
	 */
	public playArm(_nKind:number, _nType:number, _nIndex:number): void {
		let sTemp:string;
		let fArmX = this.width / 2;
		let fArmY = this.height / 2;
		if (_nIndex === 0 && this.nPos === 2) {
			if (this.bIsTLBoss) { // 限时boss
				sTemp = this.nDir + "_" + 5 + "_" + _nType + "_1";
				fArmX = fArmX + 20;
				fArmY = fArmY - 90;
			} else { // 武将
				sTemp = this.nDir + "_" + 4 + "_" + _nType + "_1";
				this.showCircleArm(); // 显示底部光圈
			}
		} else {
			sTemp = this.nDir + "_" + _nKind + "_" + _nType + "_1";
			if (this.nPos === 2) this.hideCircleArm(); // 隐藏底部光圈
		}

		this.nArmX = fArmX;
		this.nArmY = fArmY;
		this.nArmType = _nType;
		this.sArmyKey = sTemp;
		this.nKind = _nKind;
		
		// 执行动作
		if (this.pArmAct == null) {
			this.pArmAct = MArmatureUtils.createArm(tFightArmDatas[this.sArmyKey], 
				this, 10, [fArmX, fArmY], () => {
					switch(this.nArmType) {
						case FPhxActType.death: {if (this.nDeathCallback) this.nDeathCallback(); break;}
						case FPhxActType.attack: {if (this.nAtkCallback) this.nAtkCallback(); break;}
						case FPhxActType.thump: {if (this.nAtkCallback) this.nAtkCallback(); break;}
					}
				}, SceneArmType.fight);
			// 注册帧事件回调
			this.pArmAct.setFrameEventCallFunc((_nCurF:number) => {
				if (this.nArmType === FPhxActType.attack && this.nPos === 2) { // 普通攻击回调
					if (this.bIsTLBoss && _nCurF === 4) this.playTLBossKnifeArm(1);
					if (this.nHurtCallBackIndex != null && this.nHurtCallBackIndex === _nCurF) {
						if (this.nHurtCallback) this.nHurtCallback(this.nKind, 1);
					}
				} else if (this.nArmType === FPhxActType.thump) { // 暴击
					if (this.bIsTLBoss && _nCurF === 5) this.playTLBossKnifeArm(2);
					if (this.nGetReadyIndex && this.nGetReadyIndex === _nCurF) {
						this.playGetReady(this.nKind);
					}
				}
			});
		} else {
			this.pArmAct.setData(tFightArmDatas[this.sArmyKey]);
		}

		if (this.pArmAct) {
			if (this.nArmType === FPhxActType.attack && this.nPos === 2) { // 普攻
				this.nHurtCallBackIndex = null;
				if (this.sArmyKey === "1_1_3_1" || this.sArmyKey === "2_1_3_1") { // 步兵
					if (this.nPos === 2) App.SoundManager.playEffect("bugong_mp3");
					this.nHurtCallBackIndex = 6;
				} else if (this.sArmyKey === "1_2_3_1" || this.sArmyKey === "2_2_3_1") { // 骑兵
					if (this.nPos === 2) App.SoundManager.playEffect("qigong_mp3");
					this.nHurtCallBackIndex = 6;
				} else if (this.sArmyKey === "1_3_3_1" || this.sArmyKey === "2_3_3_1") { // 骑兵
					if (this.nPos === 2) App.SoundManager.playEffect("gongong_mp3");
					this.nHurtCallBackIndex = 6;
				} else if (this.sArmyKey === "1_4_3_1" || this.sArmyKey === "2_4_3_1" || this.bIsTLBoss) { // 武将攻击（普攻）
					if (this.bIsTLBoss) App.SoundManager.playEffect("huiji_mp3");
					else App.SoundManager.playEffect("wugong_mp3");
				}
				switch(this.nKind) {
					case 1:
					case 2:
					case 3: { this.nHurtCallBackIndex = 6; break}
				}
			} else if (_nType === FPhxActType.thump) { // 暴击
				this.nGetReadyIndex = null;
				if (this.sArmyKey === "1_1_4_1" || this.sArmyKey === "2_1_4_1") { // 步兵
					if (this.nPos === 2) App.SoundManager.playEffect("baoji_mp3");
					this.nGetReadyIndex = 2;
				} else if (this.sArmyKey === "1_2_4_1" || this.sArmyKey === "2_2_4_1") { // 骑兵
					if (this.nPos === 2) App.SoundManager.playEffect("baoji_mp3");
					this.nGetReadyIndex = 2;
				} else if (this.sArmyKey === "1_3_4_1" || this.sArmyKey === "2_3_4_1") { // 骑兵
					if (this.nPos === 2) App.SoundManager.playEffect("baoji_mp3");
					this.nGetReadyIndex = 2;
				} else if (this.sArmyKey === "1_4_4_1" || this.sArmyKey === "2_4_4_1" || this.bIsTLBoss) { // 武将攻击（普攻）
					if (this.bIsTLBoss) App.SoundManager.playEffect("zhendi_mp3");
					else App.SoundManager.playEffect("zhongji_mp3");
				}
				switch(this.nKind) {
					case 1:
					case 2:
					case 3: { this.nHurtCallBackIndex = 2; break}
				}
			}

			// 分类播放动作
			switch(_nType) {
				case FPhxActType.stand: {this.pArmAct.play(-1); break;}
				case FPhxActType.run: {this.pArmAct.play(-1); break;}
				case FPhxActType.attack: {this.pArmAct.play(1); break;}
				case FPhxActType.thump: {this.pArmAct.play(1); break;}
				case FPhxActType.death: {this.pArmAct.play(1); break;}
			}
		}
	}

	/** 展示武将底部光圈 */
	private tCircleArms: any[];
	private showCircleArm(): void {
		if (this.tCircleArms == null) {
			this.tCircleArms = [];
			for (let i=0; i<3; i++) {
				let pArm = MArmatureUtils.createArm(tFightArmDatas[this.nDir + "_" + (i + 1)], this, i + 200, 
					[this.width/2, this.height/2], null, SceneArmType.fight);
				pArm.play(-1);
				this.tCircleArms[i] = pArm;
			}
		} else {
			this.tCircleArms.forEach((v, k) => {
				v.play(-1);
				v.visible = true;
			});
		}
	}
	/** 隐藏武将底部光圈 */
	private hideCircleArm(): void {
		if (this.tCircleArms) {
			this.tCircleArms.forEach((v, k) => {
				v.stop();
				v.visible = false;
			});
		}
	}

	/** 播放受击特效 */
	public playHurtArm(_nKind:number, _nType:number) {
		let sTemp:string;
		if (_nType === 1) sTemp = _nKind + "_10";
		else sTemp = "4_10";

		let tOffset = {x:-7, y:9};
		if (this.nDir === 1) tOffset = {x:2, y:9};

		if (this.pArmHurt == null) {
			this.pArmHurt = MArmatureUtils.createArm(tFightArmDatas[sTemp], this, 20, 
				[this.width/2 + tOffset.x, this.height/2 + tOffset.y], (_pArm)=>{
					_pArm.visible = false;
				}, SceneArmType.fight);
		} else {
			this.pArmHurt.setData(tFightArmDatas[sTemp]);
		}
		if (this.pArmHurt) {
			this.pArmHurt.visible = true;
			this.pArmHurt.play(1);
		}
	}

	/** 蓄力表现（暴击） */
	private playGetReady(_nKind:number): void {
		if (this.pArmGetRead == null) {
			this.pArmGetRead = MArmatureUtils.createArm(tFightArmDatas["5_10"], 
				this, 30, [this.width/2, this.height/2], (_pArm)=>{
					_pArm.visible = false;
					if (this.nHurtCallback && this.nPos === 2) this.nHurtCallback(_nKind, 2);
				}, SceneArmType.fight);
		}
		if (this.pArmGetRead) {
			this.pArmGetRead.visible = true;
			this.pArmGetRead.play(1);
		}
	}
	/** 武将蓄力（技能） */
	public gatherForSkill():void {
		let sKey = "1_4_6_1";
		if (this.nDir === 2) sKey = "2_4_6_1"
		if (this.pArmGather == null) {
			this.pArmGather = MArmatureUtils.createArm(tFightArmDatas[sKey], this, 22, 
				[this.width/2, this.height/2 + 50], (_pArm)=>{
					_pArm.visible = false;
				}, SceneArmType.fight);
			this.pArmGather.setFrameEventCallFunc(function (_nCurF){
				if (_nCurF === 10) {
					if (this.nGatherCallback) this.nGatherCallback();
				}
			}.bind(this));
		} else {
			this.pArmGather.setData(tFightArmDatas[sKey]);
		}
		if (this.pArmGather) {
			this.pArmGather.visible = true;
			this.pArmGather.play(1);
		}
	}

	/** boss 动作 */
	private playTLBossKnifeArm(_nType:number): void {
		
	}
}