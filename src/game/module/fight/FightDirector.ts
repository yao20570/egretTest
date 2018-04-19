/*
 * @Author: jrc 
 * @Date: 2018-3-30 15:42:3 
 * @Description: 战斗播放管理类
 */
let tTeamInSpaceOffset = {
	1 : {x : 65, y : 33}, // 步
	2 : {x : 79, y : 40}, // 骑
	3 : {x : 65, y : 33}, // 弓
}
let tTeamOutSpaceOffset = {
	["1_1"] : {x : 79, y : 40},
	["1_2"] : {x : 93, y : 47},
	["1_3"] : {x : 79, y : 40},
	["2_1"] : {x : 93, y : 47},
	["2_2"] : {x : 102, y : 52},
	["2_3"] : {x : 93, y : 47},
	["3_1"] : {x : 79, y : 40},
	["3_2"] : {x : 93, y : 47},
	["3_3"] : {x : 79, y : 40},
}
class FightDirector {
	public pFLayer: FightLayer; // 战斗界面
	public grpFLayer: eui.Group; // 战场
	public tReport: any; // 战报数据
	public tFOrders: any[]; // 战斗回合指令集合
	public nFType: number; // 战报类型
	public bIsTLBoss: boolean; // 是否是限时boss

	////////////////////////////////
	private tPTK: any; // 当前方阵的武将带队类型
	private tTeamLayers: any; // 方阵列表
	private tLSMark: any; // 当前方阵参数
	private tCurTLayer: any; // 当前方阵
	private tCurOI: any; // 当前播放指令
	private nCurOI: number; // 当前播放的指令下标
	private nCheckCount: number; // 指令检测
	private tHasCB: any; // 是否已经执行完动作并回调
	private tFTLayer: any; // 当前处理空闲状态下的队伍
	private tShowTips: any; // 是否正在飘提示
	private tTipsView: any; // 提示层
	private tImgBJB: any; // 暴击图片
	private tImgSBB: any; // 闪避图片
	private tLbBlood: any; // 血量文本

	/////////////////////////////////
	private nZorderTeamLayer:number;
	private ncurSoundKind:number;
	private nGatherCallback:Function; // 蓄力特效播放回调
	private tAllSkillArms: any[]; // 
	private bShockFloor:boolean; // 是否正在播放地面震动
	private nFinishCountJianShow: number; // 当前展示的箭数量
	private nAllCountGongJian: number; // 箭总数

	// public 

	public constructor(_fightLayer, _grpFLayer, _tReport) {
		this.myInit();
		this.pFLayer = _fightLayer;
		this.grpFLayer = _grpFLayer;
		this.tReport = _tReport;
		if (this.pFLayer == null || this.grpFLayer == null || this.tReport == null) return;

		this.tFOrders = this.tReport.acts || [];
		this.nFType = this.tReport.t || 0;
		this.bIsTLBoss = this.nFType === FReportType.tlboss;

		this.initPhalanx(); // 初始化方阵
	}
	/** 初始化 */
	private myInit(): void {
		this.pFLayer = null;
		this.grpFLayer = null;
		this.tReport = null;
		this.tFOrders = null;
		this.nFType = 0;
		this.bIsTLBoss = false;



		this.tPTK = {};
		this.tTeamLayers = {};
		this.tLSMark = {};
		this.tCurTLayer = {};
		this.tCurOI = {};
		this.nCurOI = 0;
		this.nCheckCount = 0;
		this.tHasCB = {};
		this.tHasCB[1] = false;
		this.tHasCB[2] = false;
		this.tFTLayer = {};
		this.tShowTips = {};
		this.tTipsView = {};
		this.tImgBJB = {};
		this.tImgSBB = {};
		this.tLbBlood = {};


		//////////////////////////
		this.nZorderTeamLayer = 20;
		this.ncurSoundKind = 0;
		this.nGatherCallback = null;
		this.removeAllSkillArms();
		this.bShockFloor = false;
		this.nFinishCountJianShow = 0;
		this.nAllCountGongJian = 0;
	}
	/** 初始化方阵 */
	private initPhalanx(): void {
		this.initPhalanxByDir(this.tReport.ous, 1);
		this.initPhalanxByDir(this.tReport.dus, 2);
		this.pFLayer.initBloodLayerInfo(); // 初始化血量层
		this.start(); // 开始战斗
	}
	/** 初始化方阵 */
	private initPhalanxByDir(_tUs:any[], _S: number): void {
		if (_tUs == null || _tUs.length === 0)return;
		if (this.tTeamLayers[_S] == null) this.tTeamLayers[_S] = [];
		if (this.tLSMark[_S] == null) this.tLSMark[_S] = {};
		if (this.tPTK[_S] == null) this.tPTK[_S] = 0;
		let nCurIndex = 0;
		let tLP = {x:0, y:0};
		let nType = this.nFType;
		let nF = -1;
		if (_S === 1) {
			nType = 0;
			nF = 1;
		}
		
		for (let k=0; k<_tUs.length; k++) {
			let v = _tUs[k];
			if (v.tHeroInfo && v.tHeroInfo.nKind && v.phxs && v.phxs.length > 0) {
				let nKind = v.tHeroInfo.nKind;
				for (let l=0; l<v.phxs.length; l++) {
					let pTeamLayer = new FightTeamLayer(_S, nType);
					let fX, fY = 0;
					if (nCurIndex === 0) {
						fX = FightConst.__fightCenterX - (FightConst.__fStartOffsetX + pTeamLayer.width / 2
							+ tTeamInSpaceOffset[nKind].x * nCurIndex) * nF;
						fY = FightConst.__fightCenterY + (FightConst.__fStartOffsetY + pTeamLayer.height / 2
							+ tTeamInSpaceOffset[nKind].y * nCurIndex) * nF;
						this.tPTK[_S] = nKind;
					} else {
						if (l === 0) { // 第一小队
							fX = tLP.x - tTeamOutSpaceOffset[this.tPTK[_S] + "_" + nKind].x * nF;
							fY = tLP.y + tTeamOutSpaceOffset[this.tPTK[_S] + "_" + nKind].y * nF;
							this.tPTK[_S] = nKind;
						} else {
							fX = tLP.x - tTeamInSpaceOffset[nKind].x * nF;
							fY = tLP.y + tTeamInSpaceOffset[nKind].y * nF;
						}
					}
					tLP.x = fX;
					tLP.y = fY;

					pTeamLayer.x = fX;
					pTeamLayer.y = fY;
					pTeamLayer.setDatas(k, l, nKind, v.who);
					pTeamLayer.setAtkHandler(this.onAttackCallBack.bind(this));
					pTeamLayer.setDeathHandler(this.onDeathCallBack.bind(this));
					pTeamLayer.setHurtHandler(this.onHurtHandler.bind(this));
					pTeamLayer.setGatherHandler(this.onGatherHandler.bind(this));
					if (_S === 2 && this.bIsTLBoss) pTeamLayer.visible = false; 
					this.grpFLayer.addChildAt(pTeamLayer, this.nZorderTeamLayer + nCurIndex * nF);
					this.tTeamLayers[_S].splice(0, 0, pTeamLayer);
					nCurIndex++;
					this.tLSMark[_S].nTeam = k;
					this.tLSMark[_S].nIndex = l;
					if (nCurIndex >= FightConst.__nMaxShowCt) break;
				}
			}
			if (nCurIndex >= FightConst.__nMaxShowCt) break;
		}
	}
	/** 队伍补上 */
	private updateTeamLayers(_S:number): void {
		if (!this.tLSMark[_S] || !this.tFTLayer[_S] || !this.tTeamLayers[_S][0]) return ;
		let nTeam = this.tLSMark[_S].nTeam;
		let nIndex = this.tLSMark[_S].nIndex + 1;
		let bFind = false;
		let tUS = _S === 1 ? this.tReport.ous : this.tReport.dus;
		if (tUS[nTeam] && tUS[nTeam].phxs && tUS[nTeam].phxs[nIndex]) {
			let _sKey = tUS[nTeam].tHeroInfo.nKind;
			this.setCurTeamLayer(_S, nTeam, nIndex, tUS[nTeam], tTeamInSpaceOffset, _sKey);
			bFind = true;
		}
		if (!bFind) {
			let nNextT = nTeam + 1;
			if (tUS[nNextT] && tUS[nNextT].phxs && tUS[nNextT].phxs[0]) {
				let _sKey = this.tPTK[_S] + "_" + tUS[nNextT].tHeroInfo.nKind;
				this.setCurTeamLayer(_S, nNextT, 0, tUS[nNextT], tTeamOutSpaceOffset, _sKey);
				this.tPTK[_S] = tUS[nNextT].tHeroInfo.nKind;
			}
		}
	}
	/** 设置当前方阵的数据 */
	setCurTeamLayer(_S:number, _nT:number, _nI:number, _tUT, _tOffset, _sKey): void {
		let nF = _S === 1 ? 1 : -1;
		let fX = this.tTeamLayers[_S][0].x - (this.tFTLayer[_S].width / 2
			+ _tOffset[_sKey].x) * nF;
		let fY = this.tTeamLayers[_S][0].y + (this.tFTLayer[_S].height / 2
			+ _tOffset[_sKey].y) * nF;
		this.tFTLayer[_S].x = fX;
		this.tFTLayer[_S].y = fY;
		this.tFTLayer[_S].setDatas(_nT, _nI, _tUT.tHeroInfo.nKind,_tUT.who);
		this.tFTLayer[_S].visible = true;
		this.tTeamLayers[_S].splice(0, 0, this.tFTLayer[_S]);
		this.tLSMark[_S].nTeam = _nT;
		this.tLSMark[_S].nIndex = _nI;
	}

	/////////////////////////////////////////////////////////////////////////////////
	/** 开始战斗 */
	private start():void {
		Toast.showTipsDownToUp("开始战斗");
		egret.Tween.get(this).wait(700).call(()=>{
			App.SoundManager.playEffect("huanjing_mp3");
			this.pFLayer.setSkipBtnVisible(true);
			egret.Tween.get(this.pFLayer.grpGround).to({scaleX:FightConst.__fEScale, scaleY:FightConst.__fEScale}, 3200);
			this.showEnterFight(1);
			this.showEnterFight(2);
		});
		App.SoundManager.playBg("opening_mp3");
	}
	/** 部队进场 */
	private showEnterFight(_S):void {
		if (this.tTeamLayers[_S] == null || this.tTeamLayers[_S].length <= 0) {
			this.pFLayer.onFightEndCallback();
			return;
		}
		let nSize = this.tTeamLayers[_S].length;
		let tPos = {x:0, y:0};
		let tOffset = {x:0, y:0};
		let fDelayTime = 0;
		let nIndex = 1;
		let nF = _S === 1 ? 1 : -1;
		for (let i=nSize - 1; i>=0; i--) {
			let pTLayer = this.tTeamLayers[_S][i];
			if (pTLayer) {
				if (i === (nSize - 1)) {
					tPos.x = FightConst.__fightCenterX - FightConst.__fFightOffsetX * nF;
					tPos.y = FightConst.__fightCenterY + FightConst.__fFightOffsetY * nF;
					this.moveToPos(_S, pTLayer, 0, tPos, 1);

					let tData = pTLayer.getDatas();
					if (tData) {
						this.pFLayer.showKingName(_S, tData.sWho);
					}
				} else if (i === (nSize - 2)) {
					tPos.x = FightConst.__fightCenterX - FightConst.__fStandOffsetX * nF;
					tPos.y = FightConst.__fightCenterY + FightConst.__fStandOffsetY * nF;
					tOffset.x = (tPos.x - pTLayer.x) * nF;
					tOffset.y = (tPos.y - pTLayer.y) * nF;
					this.moveToPos(_S, pTLayer, 380, tPos, 2);
				} else if (i === 0) {
					fDelayTime = (0.38 + (nIndex - 2) * 0.17) * 1000;
					tPos.x = pTLayer.x + tOffset.x * nF;
					tPos.y = pTLayer.y + tOffset.y * nF;
					this.moveToPos(_S, pTLayer, fDelayTime, tPos, 4);
				} else {
					fDelayTime = (0.38 + (nIndex - 2) * 0.17) * 1000;
					tPos.x = pTLayer.x + tOffset.x * nF;
					tPos.y = pTLayer.y + tOffset.y * nF;
					this.moveToPos(_S, pTLayer, fDelayTime, tPos, 3);
				}
				nIndex++;
			}
		}
	}
	/** 播放或暂停声音 */
	private playSoundByKind(_nKind:number, _bPlay:boolean): void {
		if (_nKind === 1) {
			if (_bPlay) App.SoundManager.playEffect("xingjun01_mp3");
			// else App.SoundManager.stopEffect("xingjun01_mp3");
		} else {
			if (_bPlay) App.SoundManager.playEffect("xingjun02_mp3");
			// else App.SoundManager.stopEffect("xingjun02_mp3");
		}
	}
	/** 移动到某个位置 */
	private moveToPos(_S:number, _pLayer, _fDT:number, _tP, _nT:number): void {
		let nDir = _S;
		let pV = _pLayer;
		let fDelayTime = _fDT;
		let tPos = {x:_tP.x, y:_tP.y};
		let nType = _nT;
		if (fDelayTime === 0) {
			let nKind = pV.getCurKind();
			let nSoundKind = nKind === 2 ? 2 : 1;
			if (this.ncurSoundKind !== nSoundKind) {
				this.playSoundByKind(this.ncurSoundKind, false);
				this.ncurSoundKind = nSoundKind;
				this.playSoundByKind(this.ncurSoundKind, true);
			}

			pV.doAction(FPhxActType.run);
			let func = FightUtils.__moveToPos;
			if (nDir === 2 && this.bIsTLBoss) {
				App.SoundManager.playEffect("jianglin_mp3");
				func = FightUtils.__tlBossUpAndDownToPos;
			}
			func(pV, tPos, ()=>{
				pV.doAction(FPhxActType.stand);
				let cbFunc = () => {
					this.tCurTLayer[nDir] = pV;
					this.tTeamLayers[nDir].pop();
					if (this.tCurOI[nDir] == null) this.tCurOI[nDir] = -1;
					this.tCurOI[nDir]++;
					this.playActionByOrder(this.tCurOI[nDir]);
					if (this.ncurSoundKind !== 0) {
						this.playSoundByKind(this.ncurSoundKind, false);
						this.ncurSoundKind = 0;
					}
					// 刷新血量条
					let tData = this.tCurTLayer[nDir].getDatas();
					this.pFLayer.updBloodInfo(nDir, 1, tData.nHPos, tData.nIndex);
				}
				pV.showBottomEff(cbFunc);
			});
		} else {
			egret.Tween.get(pV).wait(fDelayTime).call(()=>{
				pV.doAction(FPhxActType.run);
				FightUtils.__moveToPos(pV, tPos, ()=>{
					if (nType === 2) {
						if (pV.nDir === 1 && this.tTeamLayers[1].length <=2
							|| pV.nDir === 2 && this.tTeamLayers[2].length <= 2) {
							let abFunc = () => {
								if (this.tCurTLayer[pV.nDir]) this.tCurTLayer[pV.nDir].hideBottomEff();
								let tLs = this.tTeamLayers[pV.nDir];
								if (tLs) {
									tLs.forEach((v, k) => {
										v.hideBottomEff();
									});
								}
							}
							pV.showBottomEff(abFunc, true);
						} else {
							pV.showBottomEff();
						}
						pV.doAction(FPhxActType.stand);
					} else if (nType === 4) {
						let abFunc = () => {
							let tLs = this.tTeamLayers[pV.nDir];
							if (this.tCurTLayer[pV.nDir]) this.tCurTLayer[pV.nDir].hideBottomEff();
							if (tLs) {
								tLs.forEach((v, k) => {
									v.hideBottomEff();
								});
							}
						}
						pV.showBottomEff(abFunc, true);
						pV.doAction(FPhxActType.stand);
					} else {
						pV.showBottomEff();
						pV.doAction(FPhxActType.stand);
					}
				});
			});
		}
	}
	/** 根据指令播放动作 */
	private playActionByOrder(_nSOI:number): void {
		if (_nSOI !== this.nCurOI) return;
		this.nCheckCount ++;
		if (this.nCheckCount !== 2) return;
		this.nCheckCount = 0;

		let tOrder = this.getCurOrder()
		if (tOrder == null) return;
		// 判断是否有技能
		if (tOrder.t === 1) { // 有技能
			// 优先判断上方技能（虽然战报里面双方都有技能的话是分开指令）
			this.playSkillOrder(2, tOrder.ds);
			this.playSkillOrder(1, tOrder.os);
		} else {
			this.palyNorAtkOrder(2, tOrder.dc, tOrder.om);
			this.palyNorAtkOrder(1, tOrder.oc, tOrder.dm);
		}
	}
	/** 播放技能指令 */
	private playSkillOrder(_S:number, _I:number): void {
		if (_I === 0) return;
		this.pFLayer.showSkill(_S, _I);
		this.tCurTLayer[_S].gatherForSkill();
		this.tCurTLayer[_S].doAction(FPhxActType.attack);
		this.tCurTLayer[3-_S].doAction(FPhxActType.stand);
	}
	/** 播放普通攻击指令 */
	private palyNorAtkOrder(_S:number, _C:number, _M:number):void {
		if (_C === 1) this.tCurTLayer[_S].doAction(FPhxActType.thump);
		else if (_M === 1) this.tCurTLayer[_S].doAction(FPhxActType.attack);
		else this.tCurTLayer[_S].doAction(FPhxActType.attack);
	}
	/////////////////////////////////////////////////////////////////////////////////

	/** 攻击回调 */
	private onAttackCallBack(_pLayer, _S:number):void {
		let tOrder = this.getCurOrder();
		if (tOrder == null) return;
		this.tHasCB[_S] = true;
		if (tOrder.t === 1) this.tCurTLayer[_S].doAction(FPhxActType.stand);

		// 检测是否可以播放下一条指令
		this.checkIfCanNextOrder();
	}
	/** 检测是否可以播放下一条指令 */
	private checkIfCanNextOrder(_bForce:boolean=false): void {
		if (_bForce) {
			this.tHasCB[1] = true;
			this.tHasCB[2] = true;
		}
		if (!this.tHasCB[1] || !this.tHasCB[2]) return ;
		this.tHasCB[1] = false;
		this.tHasCB[2] = false;

		let tOrder = this.getCurOrder();
		if (tOrder == null) return;
		this.nCurOI++;
		this.checkForTeam(1, tOrder.ot, tOrder.oh);
		this.checkForTeam(2, tOrder.dt, tOrder.dh);
	}
	/** 判断当前方阵是否已死亡 */
	private checkForTeam(_S:number, _T:number, _H:number) {
		if (_T === _H) {
			this.tFTLayer[_S] = this.tCurTLayer[_S];
			this.tFTLayer[_S].doAction(FPhxActType.death);
		} else {
			this.tCurTLayer[_S].doAction(FPhxActType.stand);
			this.tCurOI[_S]++;
			this.playActionByOrder(this.tCurOI[_S]);
		}
	}
	/** 死亡回调 */
	private onDeathCallBack(_pLayer, _S:number):void {
		this.tFTLayer[_S].visible = false;
		this.updateTeamLayers(_S);
		this.showEnterFight(_S);
		this.pFLayer.updBloodInfo(_S, 2); // 刷新血量信息
	}
	/** 受击回调 */
	private onHurtHandler(_pLayer, _S:number, _nKind:number, _nType:number): void {
		let tOrder = this.getCurOrder();
		if (tOrder == null) return;
		if (tOrder.t === 1) { // 播放技能表现
		} else { // 受击表现
			this.tShowTips[_S] = true;
			let m = _S === 1 ? tOrder.dm : tOrder.om;
			if (m !== 1) this.tCurTLayer[_S].playHurtArm(_nKind, _nType);
		}
		
		if (this.tShowTips[1] && this.tShowTips[2]) {
			this.tShowTips[1] = false;
			this.tShowTips[2] = false;
			this.showMoreTips();
		}
	}
	/** 蓄力回调 */
	private onGatherHandler(_pLayer, _S:number):void {
		let tOrder = this.getCurOrder();
		if (tOrder == null) return;
		let s = _S === 1 ? tOrder.os : tOrder.ds;
		this.playGatherArm(s, _S, ()=>{
			this.checkIfCanNextOrder(true);
		});
	}
	/** 技能表现 */
	private playGatherArm(_T:number, _S:number, _C:Function): void {
		if (FightConst.__bHasEndCallback) return;
		this.nGatherCallback = _C;
		this.removeAllSkillArms();
		if (this.tAllSkillArms == null) this.tAllSkillArms = [];
		switch(_T) {
			case 1: {this.showBJSkill(_S); break;} // 部将
			case 2: {this.showQJSkill(_S); break;} // 骑将
			case 3: {this.showGJSkill(_S); break;} // 弓将
		}
	}
	/** 移除所有技能特效 */
	public removeAllSkillArms(): void {
		if (!this.tAllSkillArms || this.tAllSkillArms.length <= 0) return;
		let nSize = this.tAllSkillArms.length;
		for (let i=nSize-1; i>=0; i--) {
			let pArm = this.tAllSkillArms[i];
			if (pArm) {
				egret.Tween.removeTweens(pArm);
				if (pArm.stop) pArm.stop();
				pArm.visible = false;
				if (pArm.parent) pArm.parent.removeChild(pArm);
				pArm = null;
			}
		}
		this.tAllSkillArms.splice(0, nSize);
		this.tAllSkillArms = null;
	}
	/** 步将技能 */
	private showBJSkill(_S:number): void {
		let nF = _S === 1 ? 1 : -1;
		for (let i=1; i <= 5; i++) {
			let tParam:any = {};
			switch(i) {
				case 1: {
					tParam.fTime = 0;
					tParam.tPos = {x:FightConst.__fightCenterX - 34*nF, y:FightConst.__fightCenterY - 39*nF};
					tParam.fScale = 0.7;
					break;
				}
				case 2: {
					tParam.fTime = 330;
					tParam.tPos = {x:FightConst.__fightCenterX + 149*nF, y:FightConst.__fightCenterY + 16*nF};
					tParam.fScale = 0.6;
					break;
				}
				case 3: {
					tParam.fTime = 420;
					tParam.tPos = {x:FightConst.__fightCenterX + 34*nF, y:FightConst.__fightCenterY - 24*nF};
					tParam.fScale = 0.8;
					break;
				}
				case 4: {
					tParam.fTime = 500;
					tParam.tPos = {x:FightConst.__fightCenterX - 52*nF, y:FightConst.__fightCenterY - 76*nF};
					tParam.fScale = 0.6;
					break;
				}
				case 5: {
					tParam.fTime = 670;
					tParam.tPos = {x:FightConst.__fightCenterX + 90*nF, y:FightConst.__fightCenterY + 16*nF};
					tParam.fScale = 0.9;
					break;
				}
			}
			tParam.nIndex = i;
			this.showBJOneJian(tParam, _S);
		}
		App.SoundManager.playEffect("saber_mp3");
	}
	/** 剑的技能表现 */
	private showBJOneJian(_tParams, _S:number): void {
		if (FightConst.__bHasEndCallback || !_tParams) return;
		let fDelayTime = _tParams.fTime || 0;
		let tPos = _tParams.tPos || {x:this.pFLayer.width/2, y:this.pFLayer.height/2};
		let fScale = _tParams.fScale || 1.0;
		let nIndex = _tParams.nIndex || 1;
		// 创建空白层
		let v = new eui.Group();
		v.width = v.height = 2;
		v.x = tPos.x - v.width / 2;
		v.y = tPos.y - v.height / 2;
		this.pFLayer.addChildAt(v, 100);
		this.tAllSkillArms.push(v);
		
		// 播放
		egret.Tween.get(v).wait(fDelayTime).call(()=>{
			for (let i=1; i<=5; i++) {
				let pArm = MArmatureUtils.createArm(tFightArmDatas["100_" + i], v, 10, 
					[v.width/2, v.height/2], (_pArm)=>{
						_pArm.visible = false;
						if (_pArm["nIndex"] == 1) {
							_pArm.stopForImg("daitu_png");
						}
					}, SceneArmType.fight);
				if (pArm) {
					if (i === 2) {
						pArm.setFrameEventCallFunc((_nCF:number)=>{
							if (_nCF === 4) {
								this.shockFloorByType(1);
								if (nIndex === 1) { // 第一把剑
									this.tCurTLayer[_S].playSkillHurtArm(()=>{
										this.callBackForEndSkillShow();
									}, ()=>{
										this.showMoreTips(); // 飘字
									});
								}
							}
						});
					}
					pArm["nIndex"] = i;
					v.scaleX = v.scaleY = fScale;
					pArm.play(1);
				}
			}
		});
	}

	/** 弓将技能表现 */
	private showGJSkill(_S:number): void {
		this.nFinishCountJianShow = 0; // 箭数
		this.nAllCountGongJian = 19; // 箭总数
		let nF = _S === 1 ? 1 : -1;

		for (let i=1; i<=this.nAllCountGongJian; i++) {
			let tPos:any;
			switch(i) {
				case 1:
				case 2: {
					tPos = {x:FightConst.__fightCenterX - 158*nF, y:FightConst.__fightCenterY - 19*nF};
					break;
				}
				case 3:
				case 4:
				case 5: {
					tPos = {x:FightConst.__fightCenterX - 16*nF, y:FightConst.__fightCenterY + 41*nF};
					break;
				}
				case 6:
				case 7: {
					tPos = {x:FightConst.__fightCenterX - 49*nF, y:FightConst.__fightCenterY + 2*nF};
					break;
				}
				case 8:
				case 9: {
					tPos = {x:FightConst.__fightCenterX + 59*nF, y:FightConst.__fightCenterY + 69*nF};
					break;
				}
				case 10:
				case 11:
				case 12: {
					tPos = {x:FightConst.__fightCenterX - 10*nF, y:FightConst.__fightCenterY + 4*nF};
					break;
				}
				case 13:
				case 14:
				case 15: {
					tPos = {x:FightConst.__fightCenterX + 29*nF, y:FightConst.__fightCenterY + 34*nF};
					break;
				}
				case 16: 
				case 17: {
					tPos = {x:FightConst.__fightCenterX - 85*nF, y:FightConst.__fightCenterY - 3*nF};
					break;
				}
				case 18:
				case 19: {
					tPos = {x:FightConst.__fightCenterX - 125*nF, y:FightConst.__fightCenterY - 37*nF};
					break;
				}
			}
			// 坐标随机偏移
			tPos.x += Math.floor(Math.random() * 15) * (Math.random() > 0.5 ? 1 : -1);
			tPos.y += Math.floor(Math.random() * 15) * (Math.random() > 0.5 ? 1 : -1);
			if (_S === 1) {
				tPos.x += 15;
				tPos.y -= 218;
			} else {
				tPos.x -= 15;
				tPos.y -= 133;
			}

			let tParams = {
				tPos : tPos,
				fDelayTime : Math.ceil(Math.random() * 10) * 100,
				fScale : (Math.ceil(Math.random() * 3) + 7) * 0.1,
				s : _S,
			}
			// 播放特效
			this.showGJOneJian(tParams);
		}
		App.SoundManager.playEffect("archer_mp3");
	}
	/** 射箭技能表现 */
	private showGJOneJian(_tParams): void {
		if (FightConst.__bHasEndCallback || !_tParams) return;
		let fDelayTime = _tParams.fDelayTime || 0;
		let tPos = _tParams.tPos || {x:this.pFLayer.width/2, y:this.pFLayer.height/2};
		let fScale = _tParams.fScale || 1.0;
		let s = _tParams._S || 1;
		// 随机角度偏移
		let fRAngle = Math.ceil(Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1);
		let fDAngle = s === 1 ? -17 : 15; // 默认偏移度
		let fCAngle = fDAngle + fRAngle;
		// 层
		let v = new eui.Group();
		v.width = v.height = 2;
		v.x = tPos.x - v.width / 2;
		v.y = tPos.y - v.height / 2;
		this.pFLayer.addChildAt(v, 100);
		this.tAllSkillArms.push(v);

		// 播放特效
		egret.Tween.get(v).wait(fDelayTime).call(()=>{
			let pArm = MArmatureUtils.createArm(tFightArmDatas["101_1"], v, 10, 
				[v.width/2, v.height/2], (_pArm)=>{
					_pArm.visible = false;
				}, SceneArmType.fight);
			if (pArm) {
				pArm.setFrameEventCallFunc((_nCF)=>{
					if (_nCF === 5) {
						this.showGJOneBombFloor(s, v, fCAngle, fScale); // 播放地面爆炸
						this.shockFloorByType(2);
						this.nFinishCountJianShow++;

						if (this.nFinishCountJianShow === 1) { // 第一支箭
							this.tCurTLayer[s].playSkillHurtArm(()=>{
								this.callBackForEndSkillShow();
							}, ()=>{
								this.showMoreTips();
							});
						}
						if (this.nFinishCountJianShow === this.nAllCountGongJian) { // 最后一支箭
							this.nFinishCountJianShow = 0;
						}
					}
				});
				pArm.setRotation(fCAngle);
				pArm.setScale(fScale);
				pArm.play(1);
			}
		});

	}
	/** 射箭后地面爆炸效果 */
	private showGJOneBombFloor(_S:number, _V, _A:number, _C): void {
		// 计算位置
		let fOX = Math.sin(Math.PI/180 * _A) * 198;
		let fOY = (1 - Math.sin(Math.PI/180 * (90 - _A))) * 198;
		let nF = _S === 1 ? 1 : -1;
		let fX = _V.width / 2 - fOX * nF;
		let fY = _V.height / 2 - fOY;
		let pArm = MArmatureUtils.createArm(tFightArmDatas["101_2"], _V, 10, 
			[fX, fY], (_pArm)=>{
				_pArm.visible = false;
			}, SceneArmType.fight);
		if (pArm) {
			pArm.setScale(_C);
			pArm.play(1);
		}
	}

	/** 骑将技能 */
	private showQJSkill(_S):void {
		let nF = _S === 1 ? 1 : -1;
		for (let i=1; i<=7; i++) {
			let tP:any = {};
			let tPos:any = {x:0, y:0};
			switch(i) {
				case 1: {
					tPos = {x:9 * nF, y:2 * nF};
					tP.fDelayTime = 0;
					break;
				}
				case 2: {
					tPos = {x:-99 * nF, y:-45 * nF};
					tP.fDelayTime = 40;
					break;
				}
				case 3: {
					tPos = {x:35 * nF, y:16 * nF};
					tP.fDelayTime = 150;
					break;
				}
				case 4: {
					tPos = {x:96 * nF, y:47 * nF};
					tP.fDelayTime = 350;
					break;
				}
				case 5: {
					tPos = {x:-8 * nF, y:-16 * nF};
					tP.fDelayTime = 450;
					break;
				}
				case 6: {
					tPos = {x:-61 * nF, y:-23 * nF};
					tP.fDelayTime = 480;
					break;
				}
				case 7: {
					tPos = {x:127 * nF, y:49 * nF};
					tP.fDelayTime = 700;
					break;
				}
			}
			tP.nIndex = i;
			tP.fScale = (Math.ceil(Math.random() * 30) + 70) * 0.01;
			tP.tPos = {x:FightConst.__fightCenterX + tPos.x, y:FightConst.__fightCenterY + tPos.y};
			if (_S === 1) {
				tP.tPos.x -= 20;
				tP.tPos.y -= 20;
			} else {
				tP.tPos.x += 5;
				tP.tPos.y -= 10;
			} 
			this.showQJOneMa(tP, _S);
		}
		App.SoundManager.playEffect("rider_mp3");

		// 地面震动
		this.shockFloorByType(3);
		this.tCurTLayer[_S].playSkillHurtArm(()=>{
			this.callBackForEndSkillShow();
		}, ()=>{
			this.showMoreTips();
		});
	}
	/** 马的技能特效播放 */
	private showQJOneMa(_P, _S:number): void {
		if (FightConst.__bHasEndCallback || !_P) return;
		let tPos = _P.tPos || {x:this.pFLayer.width/2, y:this.pFLayer.height/2};
		let fScale = _P.fScale || 1.0;
		let fDelayTime = _P.fDelayTime || 0;
		let nIndex = _P.nIndex || 1; // 下标
		// 层
		let v = new eui.Group();
		v.width = v.height = 2;
		v.x = tPos.x - v.width / 2;
		v.y = tPos.y - v.height / 2;
		this.pFLayer.addChildAt(v, 1000 - tPos.y + 100);
		this.tAllSkillArms.push(v);
		
		let sKey = _S === 1 ? "103_1" : "102_1";
		let tEndPos = _S === 1 ? {x:200, y:-100} : {x:-200, y:100};
		egret.Tween.get(v).wait(fDelayTime).call(()=>{
			let pArm = MArmatureUtils.createArm(tFightArmDatas[sKey], v, 10, 
				[v.width/2, v.height/2], (_pArm)=>{
					_pArm.visible = false;
				}, SceneArmType.fight);
			if (pArm) {
				pArm.setFrameEventCallFunc((_nCF:number)=>{
					if (_nCF === 1 || _nCF === 4 || _nCF === 9) {
						this.showLightRing(v, fScale);
					}
				});
				pArm.setScale(fScale);
				pArm.play(-1);

				// 奔跑动作
				egret.Tween.get(v).to({x:v.x + tEndPos.x, y:v.y + tEndPos.y}, 700).call(()=>{
					if (pArm) {
						pArm.visible = false;
						pArm.stop();
					}
				});
				let func = ()=> {
					this.showFire(v, fScale); // 火焰
					this.showBurningFloor(v, fScale); // 地面烧焦
				}
				egret.Tween.get(v).wait(100).call(func).wait(700/4).call(func)
								  .wait(700/4).call(func).wait(700/4).call(func);
			}
		});
	}
	/** 马蹄光圈 */
	private showLightRing(_V, _C:number): void {
		if (FightConst.__bHasEndCallback) return;
		let pArm = MArmatureUtils.createArm(tFightArmDatas["103_2"], this.pFLayer, 40, 
			[_V.x + 29, _V.y], (_pArm)=>{
				_pArm.visible = false;
			}, SceneArmType.fight);
		if (pArm) {
			if (this.tAllSkillArms) this.tAllSkillArms.push(pArm);
			pArm.setScale(_C);
			pArm.play(1);
		}
	}
	/** 马蹄火焰 */
	private showFire(_V, _C:number): void {
		if (FightConst.__bHasEndCallback) return;
		let pArm = MArmatureUtils.createArm(tFightArmDatas["103_3"], this.pFLayer, 30, 
			[_V.x, _V.y], (_pArm)=>{
				_pArm.visible = false;
			}, SceneArmType.fight);
		if (pArm) {
			this.tAllSkillArms.push(pArm);
			pArm.setScale(_C);
			pArm.play(1);
		}
	}
	/** 地面烧焦 */
	private showBurningFloor(_V, _C:number): void {
		if (FightConst.__bHasEndCallback) return;
		let pArm = MArmatureUtils.createArm(tFightArmDatas["103_4"], this.pFLayer, 1, 
			[_V.x, _V.y + 15], (_pArm)=>{
				_pArm.visible = false;
			}, SceneArmType.fight);
		if (pArm) {
			this.tAllSkillArms.push(pArm);
			pArm.setScale(_C);
			pArm.play(1);
		}
	}

	/** 技能表现结束回调 */
	private callBackForEndSkillShow(): void {
		if (this.nGatherCallback) this.nGatherCallback();
	}
	/////////////////////////////////////////////////////////////////////////////////
	/** 地面震动 */
	private shockFloorByType(_T:number): void {
		if (this.bShockFloor) return;
		this.bShockFloor = true;
		let act = egret.Tween.get(this.pFLayer);
		switch(_T) {
			case 1: // 步将
			case 2: { // 弓将
				act.to({y:3}, 40).to({y:-2}, 40).to({y:2}, 50).to({y:0}, 40)
				    .call(()=>{
						this.bShockFloor = false;
				    });
				break;
			}
			case 3: { // 骑将
				act.to({x:1,y:4}, 83).to({x:0,y:0}, 87).to({x:1,y:4}, 80).to({x:0,y:1}, 80)
				   .to({x:3,y:4}, 80).to({x:-1,y:-1}, 90).to({x:2,y:2}, 80).to({x:1,y:1}, 90)
				   .to({x:1,y:4}, 80).to({x:1,y:2}, 80).to({x:0,y:0}, 80)
				   .to({x:1,y:4}, 83).to({x:0,y:0}, 87).to({x:1,y:4}, 80).to({x:0,y:1}, 80)
				   .to({x:3,y:4}, 80).to({x:-1,y:-1}, 90).to({x:2,y:2}, 80).to({x:1,y:1}, 90)
				   .to({x:1,y:4}, 80).to({x:1,y:2}, 80).to({x:0,y:0}, 80)
					.call(()=>{
						this.bShockFloor = false;
					});
				break;
			}
			
		}
	}
	/** 飘字提示 */
	private showMoreTips(): void {
		let tOrder = this.getCurOrder();
		if (tOrder == null) return;
		/////////////////////////////////////////
		this.showTipsByS(1, {h:tOrder.oh, m:tOrder.om, c:tOrder.dc});
		this.showTipsByS(2, {h:tOrder.dh, m:tOrder.dm, c:tOrder.oc});
	}
	private showTipsByS(_S:number, _D:any): void {
		if (_D.h > 0) this.pFLayer.onDropBlood(_S, _D.h);
		if (!this.tTipsView[_S]) {
			this.tTipsView[_S] = new eui.Group;
			this.tTipsView[_S].width = 2;
			this.tTipsView[_S].height = 2;
			this.grpFLayer.addChildAt(this.tTipsView[_S], 5000);
		}
		let pTV = this.tTipsView[_S];
		let bShow = true;
		if (_D.m === 1) { // 闪避
			this.updTipsState(pTV, _S, 2);
		} else if (_D.c === 1) { // 暴击
			if (_D.h <= 0) {
				bShow = false;
			} else {
				this.updTipsState(pTV, _S, 3);
				this.tLbBlood[_S].text = "-" + _D.h;
				this.tLbBlood[_S].validateNow();
				let fW = (this.tImgBJB[_S].width + this.tLbBlood[_S].width - pTV.width) / 2;
				this.tImgBJB[_S].x = -fW;
				this.tLbBlood[_S].x = -fW + this.tImgBJB[_S].width;
			}
		} else { // 普通掉血
			if (_D.h <= 0) {
				bShow = false;
			} else {
				this.updTipsState(pTV, _S, 1);
				this.tLbBlood[_S].text = "-" + _D.h;
				this.tLbBlood[_S].validateNow();
				this.tLbBlood[_S].x = (pTV.width - this.tLbBlood[_S].width) / 2;
			}
		}
		
		if (bShow) {
			pTV.x = _S === 1 ? FightConst.__fightCenterX - pTV.width / 2 - 70 : FightConst.__fightCenterX;
			pTV.y = FightConst.__fightCenterY;
			this.toastTips(pTV, _S); // 飘字
		}
	}
	/** 刷新提示层的显示状态 */
	private updTipsState(_V:any, _S:number, _T:number): void {
		if (_T === 1 || _T === 3) { // 文本
			if (!this.tLbBlood[_S]) {
				this.tLbBlood[_S] = this.createLabel();
				this.tLbBlood[_S].y = _V.height / 2;
				_V.addChild(this.tLbBlood[_S]);
			}
			this.tLbBlood[_S].visible = true;
		} else {
			if (this.tLbBlood[_S]) this.tLbBlood[_S].visible = false;
		}
		if (_T === 2) { // 闪避图片
			if (!this.tImgSBB[_S]) {
				this.tImgSBB[_S] = this.createImage(1);
				AnchorUtil.setAnchorX(this.tImgSBB[_S], 0.5);
				this.tImgSBB[_S].x = _V.width / 2;
				this.tImgSBB[_S].y = _V.height / 2;
				_V.addChild(this.tImgSBB[_S]);
			}
			this.tImgSBB[_S].visible = true;
		} else {
			if (this.tImgSBB[_S]) this.tImgSBB[_S].visible = false;
		}
		if (_T === 3) { // 暴击图片
			if (!this.tImgBJB[_S]) {
				this.tImgBJB[_S] = this.createImage(2);
				this.tImgBJB[_S].y = _V.height / 2;
				_V.addChild(this.tImgBJB[_S]);
			}
			this.tImgBJB[_S].visible = true;
		} else {
			if (this.tImgBJB[_S]) this.tImgBJB[_S].visible = false;
		}
	}
	/** 展示飘字动画 */
	private toastTips(_V:eui.Group, _S:number): void {
		egret.Tween.removeTweens(_V);
		// 初始状态
		_V.alpha = 1;
		_V.scaleX = _V.scaleY = 0.33;
		_V.visible = true;

		let nF = _S === 1 ? -1 : 1;
		egret.Tween.get(_V).to({x:_V.x + 76.5 * nF, y:_V.y - 17, scaleX:1, scaleY:1}, 300)
						   .to({x:_V.x + 1.3 * nF, y:_V.y - 3}, 250)
						   .to({x:_V.x + 9.4 * nF, y:_V.y - 12.7, alpha:0}, 600)
						   .call(()=>{
							   _V.visible = false;
						   });
	}
	/** 创建一个图片 */
	private createImage(_T:number): eui.Image {
		let sImg = _T === 2 ? "v1_font_fight_bj_png" : "v1_font_fight_sb_png";
		let img = new eui.Image(sImg);
		AnchorUtil.setAnchorY(img, 0.5);
		return img;
	}
	/** 创建一个文本 */
	private createLabel(): eui.BitmapLabel {
		let lb = new eui.BitmapLabel();
		lb.$setFont("FightHurtAtlas_fnt");
		AnchorUtil.setAnchorY(lb, 0.5);
		return lb;
	}
	/////////////////////////////////////////////////////////////////////////////////
	/** 获取当前的指令 */
	private getCurOrder():any {
		if (this.nCurOI >= this.tFOrders.length) return null;
		return this.tFOrders[this.nCurOI];
	}
	/** 停止战斗动画 */
	public stopAllFightActions(): void {
		for (let i=1; i<=2; i++) {
			if (this.tTeamLayers[i]) {
				this.tTeamLayers[i].forEach((v, k)=>{
					egret.Tween.removeTweens(v);
					v.stopAction();
				});
			}
			if (this.tCurTLayer[i]) {
				egret.Tween.removeTweens(this.tCurTLayer[i]);
				this.tCurTLayer[i].stopAction();
			}
		}
		// 停止音效
		
		if (this.pFLayer) egret.Tween.removeTweens(this.pFLayer);
	}
}