/*
 * @Author: jrc 
 * @Date: 2018-3-30 15:40:30 
 * @Description: 战斗工具类
 */
enum FSoldierType {
	infantry 				= 1, 		// 步将
	sowar 					= 2, 		// 骑将
	archer 					= 3, 		// 弓将
}

enum FReportType {
	normal 					= 1, 		// 普通
	tlboss 					= 9, 		// 限时boss
}
enum FPhxActType { // 战斗动作
    stand                   = 1,        // 待命
    run 					= 2, 		// 跑步
    attack 					= 3, 		// 攻击
    thump 					= 4, 		// 重击
    death 					= 5, 		// 死亡
    gather 				    = 6, 		// 蓄力
}

class FightUtils {
	/**
	 * 根据文本的最大可展示宽度重置文本的缩放值
	 * @param  {eui.Label} _lb 文本组件
	 * @param  {number} _nMaxW 最大可展示宽度
	 * @returns void
	 */
	public static resetScaleByMaxWidth(_lb:eui.Label, _nMaxW:number): void {
		let fScale = _nMaxW / _lb.width;
		_lb.scaleX = _lb.scaleY = fScale >= 1 ? 1 : fScale;
	}
	
	/** 获得战斗的武将数据 */
	public static getHeroInfo(_nHid:number):any {
		let tInfo = ConfigDb.getGoodsByTidFromDB(_nHid);
		// if (tInfo && tInfo.nGtype !== e_type_goods.type_hero && tInfo.nGtype !== e_type_goods.type_hero)
		// 	tInfo = null;
		return tInfo;
	}

	/** 根据类型获取战斗场景标题 */
	public static getFightTitle(_nType:number=1):string {
		let str:string;
		switch(_nType) {
			case 1: {str = "副本战"; break;} // 副本
			default : {str = "战斗"}
		}
		return str;
	}

	/** 获取系统国家旗帜图片名称 */
	public static getCountryFlagImg(_nCountry:number=1):string {
		let str:string;
		switch(_nCountry) {
			case 1: {str = "v1_img_han_png"; break;}
			case 2: {str = "v1_img_qing_png"; break;}
			case 3: {str = "v1_img_chu_png"; break;}
			case 4: {str = "v1_img_qun_png"; break;}
			default : {str = "v1_img_qun_png"}
		}
		return str;
	}
	// private static _restState = {FSoldierType.}
	/**
	 * 获取双方武将的克制关系
	 * @param  {number} _nKind1 武将类型
	 * @param  {number} _nKind2 武将类型
	 * @returns number 0:不克制 1：克制 2：被克制
	 */
	public static getHeroRestrainState(_nKind1:number=0, _nKind2:number=0):number {
		let nState = 0;
		if (_nKind1 === _nKind2) return nState;
		if (_nKind1 === FSoldierType.infantry && _nKind2 === FSoldierType.archer
			|| _nKind1 === FSoldierType.sowar && _nKind2 === FSoldierType.infantry
			|| _nKind1 === FSoldierType.archer && _nKind2 === FSoldierType.sowar) {
			nState = 1;
		} else {
			nState = 2;
		}
		return nState;
	}
	/**
	 * 根据类型和大小获取兵种图标
	 * @param  {any} _nType 兵种类型
	 * @param  {any} _nSize 图标大小 1小2大
	 * @returns string 图标名字
	 */
	public static getSoldierTypeImg(_nType:number, _nSize:number=1): string {
		let sImg:any;
		if (_nSize) {
			switch(_nType) {
				case FSoldierType.infantry: {sImg="v1_img_bujiang02_png"; break;} // 步
				case FSoldierType.sowar: {sImg="v1_img_qibing02b_png"; break;} // 骑
				case FSoldierType.archer: {sImg="v1_img_gongjiang02_png"; break;} // 弓
			}
		} else {
			switch(_nType) {
				case FSoldierType.infantry: {sImg="v1_img_bujiang02b_png"; break;} // 步
				case FSoldierType.sowar: {sImg="v1_img_qibing02bb_png"; break;} // 骑
				case FSoldierType.archer: {sImg="v1_img_gongjiang02b_png"; break;} // 弓
			}
		}
		return sImg;
	}

	/** 移动到某个位置 */
	public static __moveToPos(_pV, _tP, _callback): void {
		if (_pV == null || _tP == null || _callback == null) return;
		let nDis = Math.sqrt(Math.pow((_tP.x - _pV.x), 2) + Math.pow((_tP.y - _pV.y), 2));
		if (nDis <= 0) return ;
		let nT = nDis / FightConst.__nMoveSpeed * 1000;
		egret.Tween.get(_pV).to({x:_tP.x, y:_tP.y}, nT).call(_callback);
		return ;
	}
	/** boss从上到下 */
	public static __tlBossUpAndDownToPos(_pV, _tP, _callback): void {
		if (_pV == null || _tP == null || _callback == null) return ;
		return ;
	}
}