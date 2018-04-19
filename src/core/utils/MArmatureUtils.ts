/*
 * @Author: jrc 
 * @Date: 2018-3-27 17:34:33 
 * @Description: 自定义帧特效管理类
 */

/** 特效场景类型 */
enum SceneArmType {
	normal = 1, // 其他(默认)
	base = 2, // 基地
	world = 3, // 世界
	fight = 4, // 战斗
}
/** 特效动作类型 */
enum e_cust_armature_t {
	do_nothing = 0, // 不做任何动作 tValues = nil
	img_seq = 1, // 图片序列帧播放 tValues = nil
	opacity = 2, // 透明度 tValues = {{255, 0}}，透明度从255到0的变化
	scale = 3, // 缩放 tValues = {{1, 0.5}}，缩放值从1到0.5的变化
	move = 4, // 移动 tValues = {{0, 0}, {20, 20}}，从坐标(0, 0) {移动到(20, 20) {
	scale_opacity = 5, // 缩放+透明度 tValues = {{1, 0.5}, {255, 0}}, 
	// 缩放值从1到0.5的变化，同时执行透明度从255到0的变化
	rotate = 6, // 旋转 tValues = {{0, 180}}, 旋转角度从0到180度的变化
	rotate_opacity = 7, // 旋转+透明度 tValues = {{0, 180}, {255, 0}}
	// 旋转角度从0到180度的变化，同时执行透明度从255到0的变化
	move_opacity = 8, // 移动+透明度 tValues = {{0, 0}, {20, 20}, {255, 0}}
	// 从坐标(0, 0) {移动到(20, 20) {，同时执行透明度从255到0的变化
}

let tMArmatureList = {};
let nSceneType: number = SceneArmType.normal;
let tPoint = new egret.Point();
let nDeviation = 50; // 偏差
let tNeedRemoveList: Array<any>;
let ZoreStr = "0";
let EmptyStr = "";
const OpacityMax: number = 255;
class MArmatureUtils {
	/**
	 * 判断特效是否在屏幕范围内
	 * @param  {MArmature} _pArm 特效
	 * @returns boolean true: 在屏幕内，false:在屏幕外
	 */
	public static isInsideScreen(_pArm: MArmature): boolean {
		if (_pArm == null) return false;
		_pArm.localToGlobal(_pArm.anchorOffsetX, _pArm.anchorOffsetY, tPoint);
		if (tPoint.x < -nDeviation || tPoint.x > App.StageUtils.getWidth() + nDeviation
			|| tPoint.y < -nDeviation || tPoint.y > App.StageUtils.getHeight() + nDeviation)
			return false;
		else
			return true;
	}

	/**
	 * 刷新自定义特效列表中的特效
	 * @param  {SceneArmType} _sceneType 特效展示的场景类型
	 * @returns void
	 */
	public static updateMArmature(_sceneType: SceneArmType = SceneArmType.normal): void {
		let tT = tMArmatureList[_sceneType];
		nSceneType = _sceneType;
		if (tT) {
			// 将不存在的特效添加到移除队列中
			for (let k in tT) {
				let pArm = tT[k];
				if (pArm.updateFrame) {
					if (this.isInsideScreen(pArm)) {
						pArm.updateFrame();
					}
				} else {
					// 特效已清除，添加到移除队列中
					tNeedRemoveList = tNeedRemoveList || [];
					tNeedRemoveList.push(pArm);
				}
			}

			if (tNeedRemoveList) {
				for (let i = tNeedRemoveList.length - 1; i >= 0; i--) {
					if (tNeedRemoveList[i])
						this.removeMArmature(tNeedRemoveList[i], _sceneType);
					tNeedRemoveList.splice(1, 1);
				}
				tNeedRemoveList = null;
			}
		}
	}


	/**
	 * 创建自定义的帧动画
	 * @param  {any} _tArmData 特效数据
	 * @param  {any} _pView 父层
	 * @param  {number} _nZorder 层级
	 * @param  {Array<number>} _tPos 坐标
	 * @param  {Function} _callback 播放结束回调
	 * @param  {SceneArmType} _sceneType 场景类型
	 * @returns MArmature 特效对象
	 */
	public static createArm(_tArmData, _pView, _nZorder: number, _tPos: Array<number>, _callback: Function, _sceneType: SceneArmType = SceneArmType.normal): MArmature {
		if (_tArmData == null) return;
		// 创建特效
		let pArm = new MArmature(_tArmData, _pView, _nZorder, _tPos, _callback);
		// 添加到特效管理列表中
		this.addMArmature(pArm, _sceneType);
		return pArm;
	}

	/**
	 * 添加一个自定义的特效到管理列表中
	 * @param  {any} _pArm 自定义的帧特效
	 * @param  {SceneArmType} _sceneType 场景类型
	 * @returns void
	 */
	public static addMArmature(_pArm: MArmature, _sceneType: SceneArmType): void {
		if (_pArm == null) return;
		if (tMArmatureList[_sceneType] == null) tMArmatureList[_sceneType] = {};
		tMArmatureList[_sceneType][_pArm.hashCode] = _pArm;
	}

	/**
	 * 移除一个自定义的特效
	 * @param  {any} _pArm 自定义的帧特效
	 * @param  {SceneArmType} _sceneType 场景类型
	 * @returns void
	 */
	public static removeMArmature(_pArm: MArmature, _sceneType: SceneArmType): void {
		if (_pArm == null) return;
		let pArm = tMArmatureList[_sceneType][_pArm.hashCode];
		tMArmatureList[_sceneType][_pArm.hashCode] = null;
		if (pArm && pArm.parent) {
			_pArm.parent.removeChild(_pArm);
		}
		delete tMArmatureList[_sceneType][_pArm.hashCode];
	}
	//////////////////////////////////////////////////////////////
	/**
	 * 刷新图片序列帧动作
	 * @param  {any} _pArm 特效对象
	 * @param  {any} _pAction 动作列表 tValues = nil
	 * @returns void
	 */
	private static updateCstArmImgSeqAct(_pArm, _pAction): void {
		if (_pAction["sImgName"]) {
			let tFData = _pArm.tFrameData;
			// 替换当前的帧图片
			let imageName = null;
			if (tFData.nCurFrame < 10)
				imageName = _pAction["sImgName"] + ZoreStr + tFData.nCurFrame;
			else
				imageName = _pAction["sImgName"] + EmptyStr + tFData.nCurFrame;
			_pArm.setFrameByImg(imageName, _pAction["sImgFormat"]);
		}
	}
	/**
	 * 刷新渐隐效果 
	 * @param  {any} _pArm 特效对象
	 * @param  {any} _pAction 动作列表 tValues = {{255, 0}}，透明度从255到0的变化
	 * @returns void
	 */
	private static updateCstArmOpacityAct(_pArm, _pAction): void {
		if (_pAction["sImgName"])
			_pArm.setFrameByImg(_pAction["sImgName"], _pAction["sImgFormat"]); // 替换当前的图片
		let nFrameNum = _pAction["nEFrame"] - _pAction["nSFrame"];
		if (nFrameNum == 0) return;
		if (_pAction["tValues"] == null || _pAction["tValues"].length < 1) return;

		let tFData = _pArm.tFrameData;
		// 计算当前的透明度
		let nSValue = _pAction["tValues"][0][0] || 0;
		let nEValue = _pAction["tValues"][0][1] || 0;
		// 设置透明度值
		_pArm.alpha = (nSValue + (nEValue - nSValue) * (tFData.nCurFrame - _pAction["nSFrame"]) / nFrameNum) / OpacityMax;
	}
	/**
	 * 刷新缩放效果
	 * @param  {any} _pArm 特效对象
	 * @param  {any} _pAction 动作列表 tValues = {{1, 0.5}}，缩放值从1到0.5的变化
	 * @returns void
	 */
	private static updateCstArmScaleAct(_pArm, _pAction): void {
		if (_pAction["sImgName"])
			_pArm.setFrameByImg(_pAction["sImgName"], _pAction["sImgFormat"]); // 替换当前的图片
		let nFrameNum = _pAction["nEFrame"] - _pAction["nSFrame"];
		if (nFrameNum == 0) return;
		if (_pAction["tValues"] == null || _pAction["tValues"].length < 1) return;

		let tFData = _pArm.tFrameData;
		// 计算当前的缩放值
		let nSValue = _pAction["tValues"][0][0] || 0;
		let nEValue = _pAction["tValues"][0][1] || 0;
		let fCurValue = nSValue + (nEValue - nSValue) * (tFData.nCurFrame - _pAction["nSFrame"]) / nFrameNum;
		_pArm.scaleX = _pArm.scaleY = fCurValue * tFData.fScale; // 设置缩放值
	}
	/**
	 * 刷新移动效果
	 * @param  {any} _pArm 特效对象
	 * @param  {any} _pAction 动作列表 tValues = {{0, 0}, {20, 20}}，从坐标(0, 0)移动到(20, 20)
	 * @returns void
	 */
	private static updateCstArmMoveAct(_pArm, _pAction): void {
		if (_pAction["sImgName"])
			_pArm.setFrameByImg(_pAction["sImgName"], _pAction["sImgFormat"]); // 替换当前的图片
		let nFrameNum = _pAction["nEFrame"] - _pAction["nSFrame"];
		if (nFrameNum == 0) return;
		if (_pAction["tValues"] == null || _pAction["tValues"].length < 2) return;

		let tFData = _pArm.tFrameData;
		// 计算当前的移动距离
		let fOriX = _pAction["tValues"][0][0] || 0;
		let fOriY = _pAction["tValues"][0][1] || 0;
		let fToX = _pAction["tValues"][1][0] || 0;
		let fToY = _pAction["tValues"][1][1] || 0;

		// 设置最新坐标
		let fX = tFData.tPos.x + fOriX + (fToX - fOriX) * (tFData.nCurFrame - _pAction["nSFrame"]) / nFrameNum;
		let fY = tFData.tPos.y + fOriY + (fToY - fOriY) * (tFData.nCurFrame - _pAction["nSFrame"]) / nFrameNum;
		_pArm.setPositionR(fX, fY);
	}
	/**
	 * 刷新缩放 + 透明度效果
	 * @param  {any} _pArm 特效对象
	 * @param  {any} _pAction 动作列表 tValues = {{1, 0.5}, {255, 0}}, 缩放值从1到0.5的变化，同时执行透明度从255到0的变化
	 * @returns void
	 */
	private static updateCstArmScaleAndOpacityAct(_pArm, _pAction): void {
		if (_pAction["sImgName"])
			_pArm.setFrameByImg(_pAction["sImgName"], _pAction["sImgFormat"]); // 替换当前的图片
		let nFrameNum = _pAction["nEFrame"] - _pAction["nSFrame"];
		if (nFrameNum == 0) return;
		if (_pAction["tValues"] == null || _pAction["tValues"].length < 2) return;

		let tFData = _pArm.tFrameData;
		// 计算当前的缩放值
		let nSValue1 = _pAction["tValues"][0][0] || 0;
		let nEValue1 = _pAction["tValues"][0][1] || 0;
		let fCurValue1 = nSValue1 + (nEValue1 - nSValue1) * (tFData.nCurFrame - _pAction["nSFrame"]) / nFrameNum;
		_pArm.scaleX = _pArm.scaleY = fCurValue1 * tFData.fScale; // 设置缩放值

		// 计算当前的透明度值
		let nSValue2 = _pAction["tValues"][1][0] || 0;
		let nEValue2 = _pAction["tValues"][1][1] || 0;
		// 设置透明度值
		_pArm.alpha = (nSValue2 + (nEValue2 - nSValue2) * (tFData.nCurFrame - _pAction["nSFrame"]) / nFrameNum) / OpacityMax;
	}
	/**
	 * 刷新旋转效果
	 * @param  {any} _pArm 特效对象
	 * @param  {any} _pAction 动作列表 tValues = {{0, 180}}, 旋转角度从0到180度的变化
	 * @returns void
	 */
	private static updateCstArmRotateAct(_pArm, _pAction): void {
		if (_pAction["sImgName"])
			_pArm.setFrameByImg(_pAction["sImgName"], _pAction["sImgFormat"]); // 替换当前的图片
		let nFrameNum = _pAction["nEFrame"] - _pAction["nSFrame"];
		if (nFrameNum == 0) return;
		if (_pAction["tValues"] == null || _pAction["tValues"].length < 1) return;

		let tFData = _pArm.tFrameData;
		// 计算当前的旋转角度
		let nSValue = _pAction["tValues"][0][0] || 0;
		let nEValue = _pAction["tValues"][0][1] || 0;
		// 设置最新旋转角度
		_pArm.rotation = nSValue + (nEValue - nSValue) * (tFData.nCurFrame - _pAction["nSFrame"]) / nFrameNum;
	}
	/**
	 * 刷新旋转 + 透明度效果
	 * @param  {any} _pArm 特效对象
	 * @param  {any} _pAction 动作列表 tValues = {{0, 180}, {255, 0}} 旋转角度从0到180度的变化，同时执行透明度从255到0的变化
	 * @returns void
	 */
	private static updateCstArmRotateAndOpacityAct(_pArm, _pAction): void {
		if (_pAction["sImgName"])
			_pArm.setFrameByImg(_pAction["sImgName"], _pAction["sImgFormat"]); // 替换当前的图片
		let nFrameNum = _pAction["nEFrame"] - _pAction["nSFrame"];
		if (nFrameNum == 0) return;
		if (_pAction["tValues"] == null || _pAction["tValues"].length < 2) return;

		let tFData = _pArm.tFrameData;
		// 计算当前的旋转角度
		let nSValue1 = _pAction["tValues"][0][0] || 0;
		let nEValue1 = _pAction["tValues"][0][1] || 0;
		// 设置最新旋转角度
		_pArm.rotation = nSValue1 + (nEValue1 - nSValue1) * (tFData.nCurFrame - _pAction["nSFrame"]) / nFrameNum;

		// 计算当前的透明度值
		let nSValue2 = _pAction["tValues"][1][0] || 0;
		let nEValue2 = _pAction["tValues"][1][1] || 0;
		// 设置透明度值
		_pArm.alpha = (nSValue2 + (nEValue2 - nSValue2) * (tFData.nCurFrame - _pAction["nSFrame"]) / nFrameNum) / OpacityMax;
	}
	/**
	 * 刷新移动+透明度效果
	 * @param  {any} _pArm 特效对象
	 * @param  {any} _pAction 动作列表tValues = {{0, 0}, {20, 20}, {255, 0}} 从坐标(0, 0)移动到(20, 20)，同时执行透明度从255到0的变化
	 * @returns void
	 */
	private static updateCstArmMoveAndOpacityAct(_pArm, _pAction): void {
		if (_pAction["sImgName"])
			_pArm.setFrameByImg(_pAction["sImgName"], _pAction["sImgFormat"]); // 替换当前的图片
		let nFrameNum = _pAction["nEFrame"] - _pAction["nSFrame"];
		if (nFrameNum == 0) return;
		if (_pAction["tValues"] == null || _pAction["tValues"].length < 3) return;

		let tFData = _pArm.tFrameData;
		// 计算当前的移动距离
		let fOriX = _pAction["tValues"][0][0] || 0;
		let fOriY = _pAction["tValues"][0][1] || 0;
		let fToX = _pAction["tValues"][1][0] || 0;
		let fToY = _pAction["tValues"][1][1] || 0;
		// 设置最新坐标
		let fX = tFData.tPos.x + fOriX + (fToX - fOriX) * (tFData.nCurFrame - _pAction["nSFrame"]) / nFrameNum;
		let fY = tFData.tPos.y + fOriY + (fToY - fOriY) * (tFData.nCurFrame - _pAction["nSFrame"]) / nFrameNum;
		_pArm.setPositionR(fX, fY);

		// 计算当前的透明度值
		let nSValue = _pAction["tValues"][2][0] || 0;
		let nEValue = _pAction["tValues"][2][1] || 0;
		// 设置透明度值
		_pArm.alpha = (nSValue + (nEValue - nSValue) * (tFData.nCurFrame - _pAction["nSFrame"]) / nFrameNum) / OpacityMax;
	}



	/**
	 * 执行动作
	 * @param  {any} _pArm 特效对象
	 * @param  {any} _pAction 动作列表
	 * @returns void
	 */
	public static doCstArmAdtions(_pArm, _pAction): void {
		if (_pArm == null || _pAction == null) return;

		if (_pAction["nType"] == e_cust_armature_t.do_nothing) // 不做任何动作
			console.log("空白特效");
		else if (_pAction["nType"] == e_cust_armature_t.img_seq) // 图片序列帧播放
			this.updateCstArmImgSeqAct(_pArm, _pAction);
		else if (_pAction["nType"] == e_cust_armature_t.opacity) // 透明度变化效果
			this.updateCstArmOpacityAct(_pArm, _pAction);
		else if (_pAction["nType"] == e_cust_armature_t.scale) // 缩放效果
			this.updateCstArmScaleAct(_pArm, _pAction);
		else if (_pAction["nType"] == e_cust_armature_t.move) // 移动
			this.updateCstArmMoveAct(_pArm, _pAction);
		else if (_pAction["nType"] == e_cust_armature_t.scale_opacity) // 缩放 + 透明度
			this.updateCstArmScaleAndOpacityAct(_pArm, _pAction);
		else if (_pAction["nType"] == e_cust_armature_t.rotate) // 旋转
			this.updateCstArmRotateAct(_pArm, _pAction);
		else if (_pAction["nType"] == e_cust_armature_t.rotate_opacity) // 旋转+透明度
			this.updateCstArmRotateAndOpacityAct(_pArm, _pAction);
		else if (_pAction["nType"] == e_cust_armature_t.move_opacity) // 移动+透明度
			this.updateCstArmMoveAndOpacityAct(_pArm, _pAction);
	}

	/**
	 * 获取当前SceneArmType
	 * @returns SceneArmType
	 */
	public static getSceneType(): SceneArmType {
		return nSceneType;
	}

}