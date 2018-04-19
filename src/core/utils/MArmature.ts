/*
 * @Author: jrc 
 * @Date: 2018-3-26 20:30:40 
 * @Description: 自定义帧动画数据类
 */

let g_MArmatureTexture = {};
class MArmature extends eui.Image {

	public tFrameData: any; // 帧特效数据体{tabel}

	/**
	 * @param  {any} _tData 特效数据体
	 * @param  {any} _pView 父层
	 * @param  {any} _nZorder 层级
	 * @param  {Array<number>} _tPos 坐标
	 * @param  {any} _callback 播放结束回调
	 */
	public constructor(_tData, _pView, _nZorder, _tPos: Array<number>, _callback) {
		super();
		this.baseInit();
		this.initArmature(_tData, _pView, _nZorder, _tPos, _callback);
	}

	/** 基础数据初始化 */
	public baseInit(): void {
		let tFData: any = {};
		tFData.sImgName = null; // 图片名称
		tFData.sFlag = "1";
		tFData.nFrameNum = 0; // 特效的总帧数
		tFData.tActions = null; // 动作列表
		tFData.tFrameEvents = null; // 帧事件回调列表（需要回调的帧数列表）
		tFData.fOffsetX = 0; // 特效对于中心锚点的偏移值（x坐标）
		tFData.fOffsetY = 0; // 特效对于中心锚点的偏移值（y坐标）
		tFData.fScale = 1.0; // 初始缩放值
		tFData.fScaleX = 1.0; // 初始缩放值
		tFData.fScaleY = 1.0; // 初始缩放值
		tFData.fRecW = 0; // 记录宽度
		tFData.fRecH = 0; // 记录高度

		tFData.nRotation = 0; // 初始旋转角度
		tFData.nOpacity = 255; // 初始透明度
		tFData.tPos = { x: 0, y: 0 }; // 特效在父层上的坐标
		tFData.nRepeat = 1; // 重复播放次数（小于等于0为无限循环播放）
		tFData.nDir = 1
		tFData.fPerFTime = 1 / 24; // 每帧播放时间
		tFData.nPlayEndCallback = null; // 播放结束回调
		tFData.nFrameEventCallback = null; // 帧事件回调函数
		tFData.nBlend = 0; // 是否加亮
		tFData.nRandomPause = 0; // 是否随机暂停
		tFData.bRPState = false; // 随机暂停状态

		tFData.bPState = false; // 当前播放状态 true为正在播放，false为停止播放
		tFData.nCurFrame = -1; // 当前播放的帧数
		tFData.nCurRepeat = 1; // 当前已重复播放的次数
		tFData.nLastPTime = 0; // 上一帧播放的时间
		tFData.nPauseFrame = null; // 暂停在第几帧
		tFData.nPauseFrameCount = null; // 停止播放的帧数个数

		this.tFrameData = tFData;
	}


	/**
	 * 初始化特效对象
	 * @param  {any} _tData 特效数据体
	 * @param  {any} _pView 父层
	 * @param  {any} _nZorder 层级
	 * @param  {Array<number>} _tPos 坐标
	 * @param  {any} _callback 播放结束回调
	 * @returns void
	 */
	public initArmature(_tData, _pView, _nZorder, _tPos: Array<number>, _callback): void {
		this.setData(_tData);
		this.addToView(_pView, _nZorder);
		this.setPosition(_tPos);
		this.setMovementEventCallFunc(_callback);
	}
	/**
	 * 播放特效
	 * @param  {number} _nRepeat 重复播放次数，小于0为无限循环, 0为只播放1次
	 * @returns void
	 */
	public play(_nRepeat: number = 1): void {
		this.setRepeat(_nRepeat);

		let tFData = this.tFrameData;
		tFData.bPState = true;
		tFData.nCurFrame = 1;
		tFData.nCurRepeat = 1;
	}
	/**
	 * 停止播放特效
	 * @returns void
	 */
	public stop(): void {
		let tFData = this.tFrameData;
		tFData.bPState = false;
		tFData.nCurFrame = 0;
		tFData.nCurRepeat = 1;
	}
	/**
	 * 停止播放特效并设置特效最后显示的图片
	 * @param  {string} _sImgName 停止特效后显示的图片
	 * @returns void
	 */
	public stopForImg(_sImgName: string): void {
		this.stop();
		this.setFrameByImg(_sImgName);
	}
	/**
	 * 暂停
	 * @returns void
	 */
	public pause(): void {
		this.tFrameData.bPState = false;
	}
	/**
	 * 继续播放
	 * @returns void
	 */
	public continue(): void {
		this.tFrameData.bPState = true;
	}


	/** 
	 * 设置特效的数据
	 * @param  {any} _tData 特效数据体
	 * @returns void
	 */
	public setData(_tData): void {
		if (_tData == null) return;

		let tFData = this.tFrameData;
		tFData.nFrameNum = _tData["nFrame"] != null ? _tData["nFrame"] : tFData.nFrameNum; // 特效总帧数
		tFData.tActions = _tData["tActions"]; // 特效动作列表
		tFData.tFrameEvents = _tData["tFrameEvents"]; // 帧事件回调帧数列表
		if (_tData["pos"]) {
			tFData.fOffsetX = _tData["pos"][0] != null ? _tData["pos"][0] : tFData.fOffsetX;
			tFData.fOffsetY = _tData["pos"][1] != null ? _tData["pos"][1] : tFData.fOffsetY;
		}
		this.setScale(_tData["fScale"]);
		this.setScaleX(_tData["fScaleX"]);
		this.setScaleY(_tData["fScaleY"]);

		tFData.nBlend = _tData["nBlend"] != null ? _tData["nBlend"] : tFData.nBlend;
		this.setPerFrameTime(_tData["nPerFrameTime"]); // 设置每帧播放时间

		if (tFData.nBlend == 1) { // 设置混合颜色（高亮）
			this.blendMode = egret.BlendMode.ADD;
		} else {
			this.blendMode = egret.BlendMode.NORMAL;
		}
	}
	/**
	 * 添加到父层
	 * @param  {any} _pParentView 父层
	 * @param  {number} _nZorder 层级
	 * @returns void
	 */
	public addToView(_pParentView, _nZorder: number = 0): void {
		if (_pParentView == null) return;
		_pParentView.addChildAt(this, _nZorder);
	}
	/**
	 * 设置坐标
	 * @param  {Array<number>} _tPos 坐标[x:number, y:number]
	 * @param  {number} _nDir 方向 1为原始方向，-1为反向
	 * @returns void
	 */
	public setPosition(_tPos: Array<number>, _nDir: number = null): void {
		if (_tPos == null || _tPos.length < 2) return;

		let tFData = this.tFrameData;
		tFData.nDir = _nDir != null ? _nDir : tFData.nDir;
		tFData.tPos.x = _tPos[0];
		tFData.tPos.y = _tPos[1];
		this.setPositionR(tFData.tPos.x, tFData.tPos.y);
	}
	/**
	 * 设置坐标（根据偏移方向设置实际坐标）
	 * @param  {number} _x
	 * @param  {number} _y
	 * @returns void
	 */
	public setPositionR(_x: number, _y: number): void {
		let tFData = this.tFrameData;
		this.$setX(tFData.fOffsetX * tFData.nDir + _x);
		this.$setY(tFData.fOffsetY * tFData.nDir + _y);
	}
	/**
	 * 设置缩放值
	 * @param  {number} _fScale 初始缩放值
	 * @returns void
	 */
	public setScale(_fScale: number): void {
		let tFData = this.tFrameData;
		if (_fScale != null && _fScale != tFData.fScale) {
			tFData.fScale = _fScale;
			this.scaleX = this.scaleY = tFData.fScale;
		}
	}
	public setScaleX(_fScale: number): void {
		let tFData = this.tFrameData;
		if (_fScale != null && _fScale != tFData.fScaleX) {
			tFData.fScaleX = _fScale;
			this.scaleX = tFData.fScaleX;
		}
	}
	public setScaleY(_fScale: number): void {
		let tFData = this.tFrameData;
		if (_fScale != null && _fScale != tFData.fScaleY) {
			tFData.fScaleY = _fScale;
			this.scaleY = tFData.fScaleY;
		}
	}
	/**
	 * 设置旋转角度
	 * @param  {number} _nRotation 旋转的角度
	 * @returns void
	 */
	public setRotation(_nRotation: number): void {
		let tFData = this.tFrameData;
		if (_nRotation != null && _nRotation != tFData.nRotation) {
			tFData.nRotation = _nRotation;
			this.$setRotation(tFData.nRotation);
		}
	}
	/**
	 * 设置Tag值
	 * @param  {number} _nTag tag值
	 * @returns void
	 */
	public setTag(_nTag: number): void {
		if (_nTag != null) this.$setFlags(_nTag);
	}
	/**
	 * 设置是否重复
	 * @param  {number} _nRepeat 重复播放次数，小于0为无限循环, 0为只播放1次
	 * @returns void
	 */
	public setRepeat(_nRepeat: number): void {
		let tFData = this.tFrameData;
		tFData.nRepeat = _nRepeat != null ? _nRepeat : tFData.nRepeat;
		if (tFData.nRepeat == 0) tFData.nRepeat = 1;
	}
	/**
	 * 使用图片设置显示的帧
	 * @param  {string} _sImgName 图片名字
	 * @param  {string} _sImgFormat 图片后缀
	 * @returns void
	 */
	public setFrameByImg(_sImgName: string, _sImgFormat: string = null): void {
		let tFData = this.tFrameData;
		if (_sImgName == null || tFData.sImgName == _sImgName) return;
		tFData.sImgName = _sImgName;

		// 判断是否有后缀，若没有后缀，则加上.png后缀
		let bHas = false;
		if (_sImgName.indexOf("_png") > 0) bHas = true;
		if (!bHas && _sImgName.indexOf("_jpg") > 0) bHas = true;
		if (!bHas && _sImgFormat && _sImgFormat.length > 0) {
			// 有指定图片格式，需要加上图片格式后缀
			_sImgName = _sImgName + _sImgFormat;
			bHas = true;
		}
		if (!bHas) _sImgName = _sImgName + "_png";

		let pTexture: egret.Texture = g_MArmatureTexture[_sImgName];
		if (pTexture == null) {
			pTexture = RES.getRes(_sImgName);
			g_MArmatureTexture[_sImgName] = pTexture;
		}

		if (pTexture) {
			this.texture = pTexture;
		} else {
			// console.log("找不到图片帧", _sImgName);
			this.source = _sImgName;
		}

		// 重置锚点(强制居中)
		if (tFData.fRecW != this.width || tFData.fRecH != this.height) {
			tFData.fRecW = this.width;
			tFData.fRecH = this.height;
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
		}

	}
	/**
	 * 设置每帧播放的时间
	 * @param  {number} _fPerFrameTime 每秒播放的帧数
	 * @returns void
	 */
	public setPerFrameTime(_fPerFrameTime: number): void {
		let tFData = this.tFrameData;
		if (_fPerFrameTime != null && _fPerFrameTime !== 0)
			tFData.fPerFTime = 1 / _fPerFrameTime;
	}
	/**
	 * 设置是否每帧暂停
	 * @param  {number} _nRPState 1暂停，其他不暂停
	 * @returns void
	 */
	public setRandomPause(_nRPState: number): void {
		let tFData = this.tFrameData;
		tFData.nRandomPause = _nRPState != null ? _nRPState : tFData.nRandomPause;
	}
	/**
	 * 设置播放结束回调函数
	 * @param  {Function} _callback 回调函数
	 * @returns void
	 */
	public setMovementEventCallFunc(_callback: Function): void {
		this.tFrameData.nPlayEndCallback = _callback;
	}
	/**
	 * 设置帧数回调函数， 每帧刷新都回调一次，并返回当前帧数
	 * @param  {Function} _callback 回调函数
	 * @returns void
	 */
	public setFrameEventCallFunc(_callback: Function): void {
		this.tFrameData.nFrameEventCallback = _callback;
	}
	/**
	 * 设置暂停帧数信息
	 * @param  {number} nFrame 暂停的帧数
	 * @param  {number} nFrameCount 暂停的次数
	 * @returns void
	 */
	public setRandomPauseParams(nFrame: number, nFrameCount: number): void {
		let tFData = this.tFrameData;
		tFData.nPauseFrame = nFrame;
		tFData.nPauseFrameCount = nFrameCount;
	}
	/** 播放结束 */
	public playFinish(): void {
		this.stop(); // 停止特效    
		let tFData = this.tFrameData;
		if (tFData.nPlayEndCallback) tFData.nPlayEndCallback(this);
	}
	/** 强制写的引用 */
	public retain(): void {
		// 不执行任何操作
	}
	/** 强制写的释放 */
	public release(): void {
		// 不执行任何操作
	}


	/** 重置特效状态 */
	public resetArmature(): void {
		let tFData = this.tFrameData;
		this.x = tFData.fOffsetX * tFData.nDir + tFData.tPos.x;
		this.y = tFData.fOffsetY * tFData.nDir + tFData.tPos.y;
		this.scaleX = this.scaleY = tFData.fScale;
		this.scaleX = tFData.fScaleX;
		this.scaleY = tFData.fScaleY;
		this.rotation = tFData.nRotation;
		this.alpha = tFData.nOpacity / OpacityMax;
	}

	/** 每帧刷新特效动作 */
	public updateFrame(): void {
		let tFData = this.tFrameData

		if (!tFData.bPState || tFData.tActions == null) return; // 特效未播放

		// 判断每帧间隔时间是否已经到了
		let nCurTime = new Date().getTime();
		if (nCurTime - tFData.nLastPTime < tFData.fPerFTime * 1000) return;
		tFData.nLastPTime = nCurTime;

		if (tFData.nRepeat > 0 && tFData.nCurRepeat > tFData.nRepeat) {
			// 已经重复播放完毕
			this.playFinish();
			return;
		}

		if (tFData.bIsReset) this.resetArmature(); // 重置特效初始状态
		tFData.bIsReset = false;

		// 随机暂停
		if (this.randomPause()) return;

		tFData.tActions.forEach((pAction, k) => {
			if (pAction) {
				// 若当前帧在此动作的执行帧范围内，则执行动作
				if (tFData.nCurFrame >= (pAction.nSFrame || 0) && tFData.nCurFrame <= (pAction.nEFrame || 0)) {
					MArmatureUtils.doCstArmAdtions(this, pAction);
				}
			}
		});

		// 帧事件回调
		if (tFData.tFrameEvents) {
			// 若定义了帧事件列表，则在播放到定义的帧数时回调帧事件回调函数
			tFData.tFrameEvents.forEach((v, k) => {
				if (v != null && v == tFData.nCurFrame && tFData.nFrameEventCallback)
					tFData.nFrameEventCallback(tFData.nCurFrame, this);
			});
		} else {
			// 若没有定义帧事件列表，则每帧回调帧事件回调函数
			if (tFData.nFrameEventCallback)
				tFData.nFrameEventCallback(tFData.nCurFrame, this);
		}

		// 当前帧加1
		tFData.nCurFrame++;
		if (tFData.nCurFrame > tFData.nFrameNum) {
			tFData.nCurRepeat++;
			tFData.nCurFrame = 1; // 回到第一帧
			tFData.bIsReset = true;
		}
	}

	/** 随机暂停和继续 */
	public randomPause(): boolean {
		let tFData = this.tFrameData;

		if (tFData.nRandomPause == 0) return false;

		if (tFData.nRPStep == null) tFData.nRPStep = 0;
		tFData.nRPStep++; // 统计帧数
		if (tFData.bRPState) { // 已经随机暂停
			// 当当前帧数大于一个随机数时，继续播放
			if (tFData.nRPStep > Math.floor(Math.random() * 7 + 3)) {
				tFData.nRPStep = 0; // 重新统计帧数
				tFData.bRPState = false;
			}
		} else { // 未随机暂停
			// 当当前帧数大于一个随机数时，暂停
			if (tFData.nRPStep > Math.floor(Math.random() * 15 + 5)) {
				tFData.nRPStep = 0; // 重新统计帧数
				tFData.bRPState = true;
			}
		}
		return tFData.bRPState;
	}
}