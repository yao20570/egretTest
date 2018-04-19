/*
 * @Author: jrc 
 * @Date: 2018-4-2 18:31:41 
 * @Description: 战场方阵的信息层
 */

class FightBlood extends eui.Component {

	public imgType: eui.Image; // 方阵类型
	public grpIcon: eui.Group; // 武将图标层
	public imgHead: eui.Image; // 武将图标 
	public lbName: eui.Label; // 武将名字
	public pbarBlood: components.Progress; // 血量进度条
	public grpSkill: eui.Group; // 技能名字层
	public imgSkillBg: eui.Image; // 技能层背景图
	public imgSkillName: eui.Image; // 技能名称图片

	////////////////////////////////
	public nDir:number; // 方向
	public tHeroData: any; // 武将数据
	public nIndex: number; // 方阵下标
	public nCurTrp: number; // 当前血量
	public nAllTrp: number; // 总血量
	public nHPos: number; // 武将位置
	public bIsTLBoss: boolean; // 是否是限时boss


	public constructor(_nDir:number=1) {
		super();
		this.skinName = FightBloodSkin;
		this.myInit();
		this.nDir = _nDir;

		this.setupViews();
	}

	public myInit():void {
		this.nDir = 0;
		this.tHeroData = null;
		this.nIndex = 0;
		this.nCurTrp = 0;
		this.nAllTrp = 0;
		this.nHPos = 0;
		this.bIsTLBoss = false;
	}
	/** 初始化界面 */
	public setupViews(): void {
		this.grpSkill.alpha = 0;
		if (this.nDir === 1) { // 左方
			this.pbarBlood.onStr = "v1_bar_blue_9_png";
			this.imgSkillBg.source = "sg_skill_mc_dt_01_png";
		} else { // 右方
			this.pbarBlood.onStr = "v1_bar_yellow_14_png";
			this.imgSkillBg.source = "sg_skill_mc_dt_02_png";
		}
	}
	/** 刷新控件 */
	public updateViews():void {
		if (this.tHeroData == null) return;
		if (this.bIsTLBoss || this.nIndex === -1) {
			this.lbName.text = this.tHeroData.sName;
			this.imgType.visible = false;
		} else {
			this.lbName.text = this.tHeroData.sName + App.StringUtils.format("  $0队", (this.nIndex + 1));
			this.imgType.visible = true;
			this.imgType.source = FightUtils.getSoldierTypeImg(this.tHeroData.nKind)
		}
		this.imgHead.source = this.tHeroData.sIcon;
		this.pbarBlood.maximum = this.nAllTrp;
		this.updateBlood();
	}
	/** 刷新血量 */
	public updateBlood():void {
		if (this.tHeroData) {
			this.pbarBlood.value = this.nCurTrp;
		}
	}
	/** 扣除血量 */
	public deductBlood(_nBlood:number=0): void {
		this.nCurTrp -= _nBlood;
		this.updateBlood();
	}
	/**
	 * @param  {any} _tData 武将数据
	 * @param  {number} _nIndex 当前方阵的部队下标
	 * @param  {number} _nTrp 该队伍的总血量
	 * @param  {number} _nHPos 武将位置
	 * @param  {boolean} _bIsBLBoss 是否是限时boss
	 * @returns void
	 */
	public setData(_tData, _nIndex:number=0, _nTrp:number=0, _nHPos:number=0, _bIsBLBoss:boolean=false):void {
		this.tHeroData = _tData;
		this.nIndex = _nIndex;
		this.nAllTrp = this.nCurTrp = _nTrp;
		this.nHPos = _nHPos;
		this.bIsTLBoss = _bIsBLBoss;
		this.updateViews();
	}
	/** 获取武将位置 */
	public getHeroPos(): number {
		return this.nHPos;
	}
	/** 播放技能效果 */
	public showSkill(_nType:number=1):void {
		switch(_nType) {
			case 1: {this.imgSkillName.source = "sg_skill_mc_hsqj_01_png"; break;}
			case 2: {this.imgSkillName.source = "sg_skill_mc_jgtm_01_png"; break;}
			case 3: {this.imgSkillName.source = "sg_skill_mc_wjqf_01_png"; break;}
		}

		// 初始化 
		this.grpSkill.y = 10;
		this.grpSkill.scaleX = this.grpSkill.scaleY = 0.43;
		this.grpSkill.alpha = 1;
		this.grpSkill.visible = true;

		egret.Tween.get(this.grpSkill).to({scaleX:1, scaleY:1}, 280)
									  .to({y:this.grpSkill.y-3}, 110)
									  .to({y:this.grpSkill.y - 23, alpha:0}, 440)
									  .call(function() {
										  this.visible = false;
									  }, this.grpSkill);
	}
	
}