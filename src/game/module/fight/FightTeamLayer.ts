/**
 * @Author: jrc 
 * @Date: 2018-4-4 11:16:39 
 * @Description: 方阵
 */

let tFilters1 = [new egret.ColorMatrixFilter([
    1,0,0,0,100,
    0,1,0,0,0,
    0,0,1,0,0,
    0,0,0,1,0
])]
let tFilters2 = [new egret.ColorMatrixFilter([
    1,0,0,0,0,
    0,1,0,0,0,
    0,0,1,0,0,
    0,0,0,1,0
])]
class FightTeamLayer extends eui.Component {
	public nDir: number; // 方向（1：下方   2：上方）
	public nFType: number; // 战报类型 
	public bIsTlBoss: boolean; // 是否是限时boss

	public nHPos: number; // 武将下标
	public nIndex: number; // 方阵下标
	public nKind: number; // 士兵类型
	public sWho: string; // 归属者
	public tPhalanx: any; // 3个小方阵
	public bShowFrame: boolean; // 是否已经显示过底框

	/**
	 * @param  {number} _nDir 方向（1：下方   2：上方）
	 * @param  {number} _nFType 战报类型
	 */
	public constructor(_nDir:number, _nFType:number=0) {
		super();
		this.myInit();

		this.nDir = _nDir;
		this.nFType = _nFType;
		this.bIsTlBoss = this.nFType === FReportType.tlboss;

		this.setupViews();
	}

	/** 初始化数据 */
	public myInit() {
		this.nDir = 0;
		this.nFType = 0;
		this.bIsTlBoss = false;
		
		this.nHPos = 0;
		this.nIndex = 0;
		this.nKind = 0;
		this.sWho = "";
		this.bShowFrame = false;
		this.imgBottom = null;

		this.nAtkCallback = null;
		this.nDeathCallback = null;
		this.nHurtCallback = null;
		this.nGatherCallback = null;

		if (this.tPhalanx) {
			for (let k in this.tPhalanx) {
				let pPh:FightTeamPhalanx = this.tPhalanx[k];
				if (pPh && pPh.parent) pPh.parent.removeChild(pPh); 
			}
		}
		this.tPhalanx = {};
	}
	/** 初始界面 */
	public setupViews(): void {
		this.width = this.height = 2;
	}
	/** 获取当前队伍类型 */
	public getCurKind(): number {
		return this.nKind;
	}
	/** 获取队伍相关数据 */
	public getDatas(): any {
		return {
			nHPos : this.nHPos,
			nIndex : this.nIndex,
			nKind : this.nKind,
			nDir : this.nDir,
			sWho : this.sWho,
		}
	}
	/**
	 * 设置方阵数据
	 * @param  {number} _nHPos 武将下标
	 * @param  {number} _nIndex 方阵下标
	 * @param  {number} _nKind 士兵类型
	 * @param  {string} _sWho 归属者
	 * @returns void
	 */
	public setDatas(_nHPos: number, _nIndex:number, _nKind:number, _sWho:string):void {
		if (_nHPos == null || _nIndex == null || _nKind == null) return;
		this.nHPos = _nHPos;
		this.nIndex = _nIndex;
		this.nKind = _nKind;
		this.sWho = _sWho;
		this.doAction(FPhxActType.stand);
	}
	/**
	 * 执行动作效果
	 * @param  {any} _nType 动作类型
	 * @returns void
	 */
	public doAction(_nType): void {
		if (this.nIndex == null || this.nKind == null) return;
		for (let i=1; i<=3; i++) {
			if (this.tPhalanx[i] == null) {
				if (i !== 2 && this.bIsTlBoss) {
				} else {
					let pPhx = new FightTeamPhalanx(this.nDir, i, this.nFType);
					pPhx.x = this.width / 2 + (i - 2) * 93;
					pPhx.y = this.height / 2 + (i - 2) * 40;
					this.addChild(pPhx);
					
					this.tPhalanx[i] = pPhx;
					if (i === 2) {
						pPhx.setAtkCallBack(this.onAtkHandler.bind(this));
						pPhx.setDeathCallback(this.onDeathHandler.bind(this));
						pPhx.setHurtCallback(this.onHurtHandler.bind(this));
						pPhx.setGatherCallback(this.onGatherHandler.bind(this));
					}
				}
			}
			if (this.tPhalanx[i]) this.tPhalanx[i].playArm(this.nKind, _nType, this.nIndex);
		}
	}

	/** 停止动作 */
	public stopAction():void {
		for (let k in this.tPhalanx) {
			let pArm = this.tPhalanx[k];
			if (pArm) pArm.stopArm();
		}
	}

	/** 受击动作 */
	public playHurtArm(_nKind, _nType): void {
		for (let k in this.tPhalanx) {
			let pArm = this.tPhalanx[k];
			if (pArm) pArm.playHurtArm(_nKind, _nType);
		}
	}
	private nCount:number;
	/** 受到技能攻击表现 */
	public playSkillHurtArm(_nCallback1:Function, _nCallback2:Function): void {
		this.nCount = 0;
		this.showAttackBackAndRed(_nCallback1, _nCallback2);
	}
	/** 击退效果和变红 */
	private showAttackBackAndRed(_nCallback1:Function, _nCallback2:Function): void {
		this.nCount++;
		if (this.nCount > 1) {
			egret.Tween.get(this).wait(0.5).call(()=>{
				if (_nCallback1) _nCallback1();
			});
			return;
		} else if (this.nCount === 1) {
			if (_nCallback2) _nCallback2();
		}
		let nF = this.nDir === 1 ? -1 : 1;
		let tPos = {x:14 * nF, y:-9 * nF};
		egret.Tween.get(this).to({filters:tFilters1}, 10).to({filters:tFilters2}, 260);
		egret.Tween.get(this).to({x:this.x + tPos.x, y:this.y + tPos.y}, 270).call(()=>{
			this.doAction(FPhxActType.run);
		}).to({x:this.x - tPos.x, y:this.y - tPos.y}, 450).call(()=>{
			this.doAction(FPhxActType.stand);
			this.showAttackBackAndRed(_nCallback1, _nCallback2); // 再次受击
		});
	}

	/** 方阵底部方框 */
	private imgBottom:eui.Image;
	/** 显示底部特效 */
	public showBottomEff(_nCallback:Function, _bEnd:boolean):void {
		if (this.bShowFrame || this.bIsTlBoss) {
			if (_nCallback) _nCallback();
			return;
		}
		this.bShowFrame = true;
		if (this.imgBottom == null) {
			this.imgBottom = new eui.Image();
			this.imgBottom.source = this.nDir === 1 ? "sg_zd_dmxt_sa_001_png" : "sg_zd_dmxt_sa_002_png";
		}
		
		this.addChildAt(this.imgBottom, 0);
		this.imgBottom.blendMode = egret.BlendMode.ADD;
		this.imgBottom.alpha = 0.2;
		this.imgBottom.rotation = 1;
		this.imgBottom.validateNow();
		this.imgBottom.x = (this.width - this.imgBottom.width) / 2;
		this.imgBottom.y = (this.height - this.imgBottom.height) / 2 + 10;
		let pAct = egret.Tween.get(this.imgBottom).to({alpha:1}, 200);
		if (_nCallback) {
			if (_bEnd) pAct.call(_nCallback);
			else pAct.wait(400).call(_nCallback);
		}
	}
	/** 隐藏底部特效 */
	public hideBottomEff(): void {
		if (this.imgBottom) {
			egret.Tween.get(this.imgBottom).to({alpha:0}, 700);
		}
	}

	/** 武将蓄力 */
	public gatherForSkill(): void {
		if (this.tPhalanx[2]) this.tPhalanx[2].gatherForSkill();
	}

	/** 攻击回调 */
	private nAtkCallback:Function;
	/** 设置攻击回调 */
	public setAtkHandler(_nHandler:Function): void {
		this.nAtkCallback = _nHandler;
	}
	/** 攻击回调 */
	public onAtkHandler():void {
		if (this.nAtkCallback) this.nAtkCallback(this, this.nDir);
	}
	/** 死亡回调 */
	private nDeathCallback:Function;
	/** 设置死亡回调 */
	public setDeathHandler(_nHandler:Function): void {
		this.nDeathCallback = _nHandler;
	}
	/** 死亡回调 */
	public onDeathHandler():void {
		if (this.nDeathCallback) this.nDeathCallback(this, this.nDir);
	}
	/** 对方受击回调 */
	private nHurtCallback:Function;
	/** 设置对方受击回调 */
	public setHurtHandler(_nHandler:Function): void {
		this.nHurtCallback = _nHandler;
	}
	/** 对方受击回调 */
	public onHurtHandler(_nKind:number, _nType:number):void {
		if (this.nHurtCallback) this.nHurtCallback(this, this.nDir, _nKind, _nType);
	}
	/** 蓄力播放回调 */
	private nGatherCallback:Function;
	/** 设置蓄力播放回调 */
	public setGatherHandler(_nHandler:Function): void {
		this.nGatherCallback = _nHandler;
	}
	/** 蓄力播放回调 */
	public onGatherHandler():void {
		if (this.nGatherCallback) this.nGatherCallback(this, this.nDir);
	}

}
