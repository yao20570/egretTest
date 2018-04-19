/*
 * @Author: jrc 
 * @Date: 2018-3-30 17:22:23 
 * @Description: 战斗全局变量
 */

class FightConst {
    public static FIGHT: number = 10001; // 播放战报


	public static __fSScale = 0.66; // 战斗层初始缩放比例
	public static __fEScale = 1.00; // 战斗层最终缩放比例

	public static __nMoveSpeed = 150; // 移动速度
	public static __nMaxShowCt = 6;  // 最大显示的队列个数

	public static __fightCenterX = 0; // 战斗表现层中点X的坐标
	public static __fightCenterY = 0; // 战斗表现层中点Y的坐标

	public static __fStartOffsetX = 413; // 开始战斗初始化阵容的开始x轴偏移值
	public static __fStartOffsetY = 202; // 开始战斗初始化阵容的开始y轴偏移值
	// public static __fStartOffsetX = 0; // 开始战斗初始化阵容的开始x轴偏移值
	// public static __fStartOffsetY = 0; // 开始战斗初始化阵容的开始y轴偏移值

	public static __fFightOffsetX = 32; // 混战区终点坐标x轴偏移值
	public static __fFightOffsetY = 16; // 混战区终点坐标y轴偏移值

	public static __fStandOffsetX = 136; // 待命区终点坐标x轴偏移值
	public static __fStandOffsetY = 66; // 待命区终点坐标y轴偏移值


	public static __bHasEndCallback = false; 		// 是否已经结束回调	

	public static __showFightLayer = null; 		// 展示战斗表现的层
	public static __nFightLayerTopH = null; 		// 战斗界面顶层高度
}