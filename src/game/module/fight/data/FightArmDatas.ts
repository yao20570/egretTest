/**
 * @Author: jrc 
 * @Date: 2018-4-4 16:38:11 
 * @Description: 战斗特效数据
 */

const tFightArmDatas = {};

//////////////////////////// ↓战斗特效数据↓////////////////////////////
//受到步兵攻击特效（受击）
tFightArmDatas["1_10"] = 
{
    sPlist : "tx/fight/p2_fight_hurt",
    nImgType : 2,
	nFrame : 6, // 总帧数
	pos : [0, 0], // 特效的x, y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
   	nPerFrameTime : 18, // 每帧播放时间（18帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "sg_zdtx_bbsjgx_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 6, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//受到骑兵攻击特效（受击）
tFightArmDatas["2_10"] = 
{
    sPlist : "tx/fight/p2_fight_hurt",
    nImgType : 2,
	nFrame : 8, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
   	nPerFrameTime : 18, // 每帧播放时间（18帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "sg_zdtx_qbsjgx_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 8, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//受到弓兵攻击特效（受击）
tFightArmDatas["3_10"] = 
{
    sPlist : "tx/fight/p2_fight_hurt",
    nImgType : 2,
	nFrame : 6, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
   	nPerFrameTime : 18, // 每帧播放时间（18帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "sg_zdtx_gbsjgx_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 6, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//受到重击特效（受击）
tFightArmDatas["4_10"] = 
{
    sPlist : "tx/fight/p2_fight_hurt",
    nImgType : 2,
	nFrame : 9, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 18, // 每帧播放时间（18帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "sg_skill_bj_sj_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 9, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//暴击是的蓄力特效（蓄力）
tFightArmDatas["5_10"] = 
{
    sPlist : "tx/fight/p2_fight_hurt",
    nImgType : 2,
	nFrame : 4, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
   	nPerFrameTime : 18, // 每帧播放时间（18帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "sg_skill_bj_xl_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 4, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}

//武将底部红色圈（旋转）
tFightArmDatas["2_1"] = 
{
    sPlist : "tx/fight/p1_fight_wj_circle",
    nImgType : 1,
	nFrame : 15, // 总帧数
	pos : [-10, 5], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 12, // 每帧播放时间（12帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_lsegh_s_wj_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 15, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//武将底部红色圈（缩放透明）
tFightArmDatas["2_2"] = 
{
    sPlist : "tx/fight/p1_fight_wj_circle",
    nImgType : 1,
	nFrame : 15, // 总帧数
	pos : [-9, 4], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 12, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "zd_lsegh_s_wj_s_02",
			nSFrame : 1,
			nEFrame : 7,
			tValues : [// 参数列表
				[1.04, 1.00], // 开始, 结束缩放值
				[255, 255], // 开始, 结束透明度值
			],
		},
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "zd_lsegh_s_wj_s_02",
			nSFrame : 8,
			nEFrame : 15,
			tValues : [// 参数列表
				[1.00, 1.04], // 开始, 结束缩放值
				[255, 255], // 开始, 结束透明度值
			],
		},
	],
}
//武将底部红色圈（缩放）
tFightArmDatas["2_3"] = 
{
    sPlist : "tx/fight/p1_fight_wj_circle",
    nImgType : 1,
	nFrame : 15, // 总帧数
	pos : [-10, 5], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 12, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 2, // 渐隐（透明度）
			sImgName : "zd_lsegh_s_wj_s_01",
			nSFrame : 1,
			nEFrame : 7,
			tValues : [// 参数列表
				[255, 50], // 开始, 结束透明度值
			], 
		},
		{
			nType : 2, // 渐隐（透明度）
			sImgName : "zd_lsegh_s_wj_s_01",
			nSFrame : 8,
			nEFrame : 15,
			tValues : [// 参数列表
				[50, 255], // 开始, 结束透明度值
			], 
		},
	],
}
//武将底部蓝色圈（旋转）
tFightArmDatas["1_1"] = 
{
    sPlist : "tx/fight/p1_fight_wj_circle",
    nImgType : 1,
	nFrame : 15, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 12, // 每帧播放时间（12帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_lsegh_x_wj_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 15, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//武将底部蓝色圈（缩放透明）
tFightArmDatas["1_2"] = 
{
    sPlist : "tx/fight/p1_fight_wj_circle",
    nImgType : 1,
	nFrame : 15, // 总帧数
	pos : [0, 1], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 12, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "zd_lsegh_x_wj_s_02",
			nSFrame : 1,
			nEFrame : 7,
			tValues : [// 参数列表
				[1.04, 1.00], // 开始, 结束缩放值
				[255, 255], // 开始, 结束透明度值
			],
		},
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "zd_lsegh_x_wj_s_02",
			nSFrame : 8,
			nEFrame : 15,
			tValues : [// 参数列表
				[1.00, 1.04], // 开始, 结束缩放值
				[255, 255], // 开始, 结束透明度值
			],
		},
	],
}
//武将底部蓝色圈（缩放）
tFightArmDatas["1_3"] = 
{
    sPlist : "tx/fight/p1_fight_wj_circle",
    nImgType : 1,
	nFrame : 15, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 12, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 2, // 渐隐（透明度）
			sImgName : "zd_lsegh_x_wj_s_01",
			nSFrame : 1,
			nEFrame : 7,
			tValues : [// 参数列表
				[255, 50], // 开始, 结束透明度值
			], 
		},
		{
			nType : 2, // 渐隐（透明度）
			sImgName : "zd_lsegh_x_wj_s_01",
			nSFrame : 8,
			nEFrame : 15,
			tValues : [// 参数列表
				[50, 255], // 开始, 结束透明度值
			], 
		},
	],
}
//步将技能
tFightArmDatas["100_1"] = 
{
    sPlist : "tx/fight/p1_fight_skill_bj_001",
    nImgType : 1,
	nFrame : 24, // 总帧数
	pos : [0, -50], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1.5,// 初始的缩放值
	nBlend : 0, // 需要加亮
    nPerFrameTime : 24, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 1, // 序列帧播放
			sImgName : "sg_bjjn_jzd_",
			nSFrame : 3, // 开始帧下标
			nEFrame : 15, // 结束帧下标
			tValues : null, // 参数列表
		},
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "sg_bjjn_jzd_15",
			nSFrame : 16,
			nEFrame : 24,
			tValues : [// 参数列表
				[1, 1], // 开始, 结束缩放值
				[255, 0], // 开始, 结束透明度值
			], 
		},
	],
}
tFightArmDatas["100_2"] = 
{
    sPlist : "tx/fight/p1_fight_skill_bj_001",
    nImgType : 1,
	nFrame : 17, // 总帧数
	pos : [1, -217], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1.5,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 24, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 1, // 序列帧播放
			sImgName : "sg_jqcha_lla_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 17, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
tFightArmDatas["100_3"] = 
{
    sPlist : "tx/world/p1_fight_skill_sep",
    nImgType : 1,
	nFrame : 21, // 总帧数
	pos : [2, -7], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 2.78,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 24, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "sg_bjjn_jzd_X_002",
			nSFrame : 1,
			nEFrame : 3,
			tValues : [// 参数列表
				[1, 1], // 开始, 结束缩放值
				[0, 0], // 开始, 结束透明度值
			], 
		},
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "sg_bjjn_jzd_X_002",
			nSFrame : 4,
			nEFrame : 6,
			tValues : [// 参数列表
				[1, 1], // 开始, 结束缩放值
				[255, 70], // 开始, 结束透明度值
			], 
		},
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "sg_bjjn_jzd_X_002",
			nSFrame : 7,
			nEFrame : 21,
			tValues : [// 参数列表
				[1, 1], // 开始, 结束缩放值
				[70, 0], // 开始, 结束透明度值
			], 
		},
	],
}
tFightArmDatas["100_4"] = 
{
    sPlist : "tx/world/p1_fight_skill_sep",
    nImgType : 1,
	nFrame : 6, // 总帧数
	pos : [3, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1.58,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 24, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "sg_bjjn_jzd_X_001",
			nSFrame : 1,
			nEFrame : 3,
			tValues : [// 参数列表
				[1, 1], // 开始, 结束缩放值
				[0, 0], // 开始, 结束透明度值
			], 
		},
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "sg_bjjn_jzd_X_001",
			nSFrame : 4,
			nEFrame : 6,
			tValues : [// 参数列表
				[1, 1], // 开始, 结束缩放值
				[255, 0], // 开始, 结束透明度值
			], 
		},
	],
}
tFightArmDatas["100_5"] = 
{
    sPlist : "tx/world/p1_fight_skill_sep",
    nImgType : 1,
	nFrame : 23, // 总帧数
	pos : [1, 2], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 24, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "sg_bjjn_jzd_X_003",
			nSFrame : 1,
			nEFrame : 3,
			tValues : [// 参数列表
				[1, 1], // 开始, 结束缩放值
				[0, 0], // 开始, 结束透明度值
			], 
		},
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "sg_bjjn_jzd_X_003",
			nSFrame : 4,
			nEFrame : 16,
			tValues : [// 参数列表
				[1, 1], // 开始, 结束缩放值
				[255, 255], // 开始, 结束透明度值
			], 
		},
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "sg_bjjn_jzd_X_003",
			nSFrame : 17,
			nEFrame : 23,
			tValues : [// 参数列表
				[1, 1], // 开始, 结束缩放值
				[255, 0], // 开始, 结束透明度值
			], 
		},
	],
}

//弓将技能
tFightArmDatas["101_1"] = 
{
    sPlist : "tx/fight/p1_fight_skill_gj_001",
    nImgType : 1,
	nFrame : 6, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 24, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 1, // 序列帧播放
			sImgName : "sg_jntx_dz_gjjn_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 6, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
tFightArmDatas["101_2"] = 
{
    sPlist : "tx/fight/p1_fight_skill_gj_001",
    nImgType : 1,
	nFrame : 14, // 总帧数
	pos : [0, 198], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 24, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 1, // 序列帧播放
			sImgName : "sg_jntx_dz_gjjn_x_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 14, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}

//骑将技能
tFightArmDatas["102_1"] = 
{
    sPlist : "tx/fight/p1_fight_skill_qj_001",
    nImgType : 1,
	nFrame : 9, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 20, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 1, // 序列帧播放
			sImgName : "sg_zd_hy_pmsf_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 9, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
tFightArmDatas["103_1"] = 
{
    sPlist : "tx/fight/p1_fight_skill_qj_001",
    nImgType : 1,
	nFrame : 9, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 20, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 1, // 序列帧播放
			sImgName : "sg_zd_hy_pms_",
			nSFrame : 1, // 开始帧下标 
			nEFrame : 9, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
tFightArmDatas["103_2"] = 
{
    sPlist : "tx/fight/p1_fight_skill_qj_001",
    nImgType : 1,
	nFrame : 20, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 24, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 1, // 序列帧播放
			sImgName : "sg_zd_hy_xah_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 20, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
tFightArmDatas["103_3"] = 
{
    sPlist : "tx/fight/p1_fight_skill_qj_001",
    nImgType : 1,
	nFrame : 13, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
    nPerFrameTime : 20, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 1, // 序列帧播放
			sImgName : "sg_zd_hy_sss_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 13, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
tFightArmDatas["103_4"] = 
{   
    sPlist : "tx/world/p1_tx_world",
    nImgType : 1,
	nFrame : 38, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
    nPerFrameTime : 40, // 每帧播放时间（12帧每秒）
	tActions : [
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "sg_zd_hy_dhy_001",
			nSFrame : 1,
			nEFrame : 4,
			tValues : [// 参数列表
				[1, 1], // 开始, 结束缩放值
				[0, 255], // 开始, 结束透明度值
			], 
		},
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "sg_zd_hy_dhy_001",
			nSFrame : 5,
			nEFrame : 19,
			tValues : [// 参数列表
				[1, 1], // 开始, 结束缩放值
				[255, 255], // 开始, 结束透明度值
			], 
		},
		{
			nType : 5, // 渐隐（透明度）
			sImgName : "sg_zd_hy_dhy_001",
			nSFrame : 20,
			nEFrame : 38,
			tValues : [// 参数列表
				[1, 1], // 开始, 结束缩放值
				[255, 0], // 开始, 结束透明度值
			], 
		},
	],
}
//////////////////////////// ↑战斗特效数据↑////////////////////////////


//////////////////////////// ↓方阵(下方)↓////////////////////////////
////////////////////////////////////////////////// 下方:::《步兵》:::动作 ////////////////////////////////
//待机动作
tFightArmDatas["1_1_1_1"] = 
{
    sPlist : "tx/fight/p2_fight_bb_x",
    nImgType : 2,
	nFrame : 10, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 12, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_bb_x_dj_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 10, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//跑步动作
tFightArmDatas["1_1_2_1"] = 
{
    sPlist : "tx/fight/p2_fight_bb_x",
    nImgType : 2,
	nFrame : 11, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_bb_x_pb_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 11, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//普攻动作
tFightArmDatas["1_1_3_1"] = 
{
    sPlist : "tx/fight/p2_fight_bb_x",
    nImgType : 2,
	nFrame : 19, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_bb_x_pg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 19, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//强攻动作
tFightArmDatas["1_1_4_1"] = 
{
    sPlist : "tx/fight/p2_fight_bb_x",
    nImgType : 2,
	nFrame : 20, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_bb_x_qg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 20, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//捅死动作
tFightArmDatas["1_1_5_1"] = 
{
    sPlist : "tx/fight/p2_fight_bb_x",
    nImgType : 2,
	nFrame : 10, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 20, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_bb_x_ts_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 10, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
////////////////////////////////////////////////// 下方:::《骑兵》:::动作 ////////////////////////////////
//待机动作
tFightArmDatas["1_2_1_1"] = 
{
    sPlist : "tx/fight/p2_fight_qb_x",
    nImgType : 2,
	nFrame : 10, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 12, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_qb_x_dj_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 10, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//跑步动作
tFightArmDatas["1_2_2_1"] = 
{
    sPlist : "tx/fight/p2_fight_qb_x",
    nImgType : 2,
	nFrame : 10, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_qb_x_pb_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 10, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//普攻动作
tFightArmDatas["1_2_3_1"] = 
{
    sPlist : "tx/fight/p2_fight_qb_x",
    nImgType : 2,
	nFrame : 13, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 30, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_qb_x_pg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 13, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//强攻动作
tFightArmDatas["1_2_4_1"] = 
{
    sPlist : "tx/fight/p2_fight_qb_x",
    nImgType : 2,
	nFrame : 25, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 30, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_qb_x_qg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 25, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//捅死动作
tFightArmDatas["1_2_5_1"] = 
{
    sPlist : "tx/fight/p2_fight_qb_x",
    nImgType : 2,
	nFrame : 13, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 20, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_qb_x_ts_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 13, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
////////////////////////////////////////////////// 下方:::《弓兵》:::动作 ////////////////////////////////
//待机动作
tFightArmDatas["1_3_1_1"] = 
{
    sPlist : "tx/fight/p2_fight_gb_x",
    nImgType : 2,
	nFrame : 10, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 12, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_gb_x_dj_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 10, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//跑步动作
tFightArmDatas["1_3_2_1"] = 
{
    sPlist : "tx/fight/p2_fight_gb_x",
    nImgType : 2,
	nFrame : 10, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_gb_x_pb_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 10, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//普攻动作
tFightArmDatas["1_3_3_1"] = 
{
    sPlist : "tx/fight/p2_fight_gb_x",
    nImgType : 2,
	nFrame : 9, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_gb_x_pg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 9, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//强攻动作
tFightArmDatas["1_3_4_1"] = 
{
    sPlist : "tx/fight/p2_fight_gb_x",
    nImgType : 2,
	nFrame : 12, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_gb_x_qg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 12, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//捅死动作
tFightArmDatas["1_3_5_1"] = 
{
    sPlist : "tx/fight/p2_fight_gb_x",
    nImgType : 2,
	nFrame : 12, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 20, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_gb_x_ts_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 12, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
////////////////////////////////////////////////// 下方:::《武将》:::动作 ////////////////////////////////
//待机动作
tFightArmDatas["1_4_1_1"] = 
{
    sPlist : "tx/fight/p2_fight_wj_x",
    nImgType : 2,
	nFrame : 13, // 总帧数
	pos : [2, -9], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 12, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_wj_x_dj_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 13, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//跑步动作
tFightArmDatas["1_4_2_1"] = 
{
    sPlist : "tx/fight/p2_fight_wj_x",
    nImgType : 2,
	nFrame : 11, // 总帧数
	pos : [2, -9], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_wj_x_pb_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 11, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//普攻动作
tFightArmDatas["1_4_3_1"] = 
{
    sPlist : "tx/fight/p2_fight_wj_x",
    nImgType : 2,
	nFrame : 16, // 总帧数
	pos : [2, -9], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_wj_x_pg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 16, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//强攻动作
tFightArmDatas["1_4_4_1"] = 
{
    sPlist : "tx/fight/p2_fight_wj_x",
    nImgType : 2,
	nFrame : 15, // 总帧数
	pos : [2, -9], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_wj_x_qg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 15, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//捅死动作
tFightArmDatas["1_4_5_1"] = 
{
    sPlist : "tx/fight/p2_fight_wj_x",
    nImgType : 2,
	nFrame : 11, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 20, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_wj_x_ts_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 11, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//蓄力动作
tFightArmDatas["1_4_6_1"] = 
{
    sPlist : "tx/fight/p2_fight_wj_x",
    nImgType : 2,
	nFrame : 12, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
   	nPerFrameTime : 15, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_tx_xl_x_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 12, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//////////////////////////// ↑方阵(下方)↑////////////////////////////


//////////////////////////// ↓方阵(上方)↓////////////////////////////
////////////////////////////////////////////////// 上方:::《步兵》:::动作 ////////////////////////////////
//待机动作
tFightArmDatas["2_1_1_1"] = 
{
    sPlist : "tx/fight/p2_fight_bb_s",
    nImgType : 2,
	nFrame : 10, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 12, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_bb_s_dj_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 10, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//跑步动作
tFightArmDatas["2_1_2_1"] = 
{
    sPlist : "tx/fight/p2_fight_bb_s",
    nImgType : 2,
	nFrame : 11, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_bb_s_pb_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 11, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//普攻动作
tFightArmDatas["2_1_3_1"] = 
{
    sPlist : "tx/fight/p2_fight_bb_s",
    nImgType : 2,
	nFrame : 19, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_bb_s_pg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 19, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//强攻动作
tFightArmDatas["2_1_4_1"] = 
{
    sPlist : "tx/fight/p2_fight_bb_s",
    nImgType : 2,
	nFrame : 20, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_bb_s_qg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 20, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//捅死动作
tFightArmDatas["2_1_5_1"] = 
{
    sPlist : "tx/fight/p2_fight_bb_s",
    nImgType : 2,
	nFrame : 9, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 20, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_bb_s_ts_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 9, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
////////////////////////////////////////////////// 上方:::《骑兵》:::动作 ////////////////////////////////
//待机动作
tFightArmDatas["2_2_1_1"] = 
{
    sPlist : "tx/fight/p2_fight_qb_s",
    nImgType : 2,
	nFrame : 10, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 12, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_qb_s_dj_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 10, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//跑步动作
tFightArmDatas["2_2_2_1"] = 
{
    sPlist : "tx/fight/p2_fight_qb_s",
    nImgType : 2,
	nFrame : 10, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_qb_s_pb_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 10, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//普攻动作
tFightArmDatas["2_2_3_1"] = 
{
    sPlist : "tx/fight/p2_fight_qb_s",
    nImgType : 2,
	nFrame : 13, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 30, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_qb_s_pg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 13, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//强攻动作
tFightArmDatas["2_2_4_1"] = 
{
    sPlist : "tx/fight/p2_fight_qb_s",
    nImgType : 2,
	nFrame : 25, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 30, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_qb_s_qg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 25, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//捅死动作
tFightArmDatas["2_2_5_1"] = 
{
    sPlist : "tx/fight/p2_fight_qb_s",
    nImgType : 2,
	nFrame : 12, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 20, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_qb_s_ts_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 12, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
////////////////////////////////////////////////// 上方:::《弓兵》:::动作 ////////////////////////////////
//待机动作
tFightArmDatas["2_3_1_1"] = 
{
    sPlist : "tx/fight/p2_fight_gb_s",
    nImgType : 2,
	nFrame : 10, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 12, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_gb_s_dj_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 10, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//跑步动作
tFightArmDatas["2_3_2_1"] = 
{
    sPlist : "tx/fight/p2_fight_gb_s",
    nImgType : 2,
	nFrame : 10, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_gb_s_pb_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 10, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//普攻动作
tFightArmDatas["2_3_3_1"] = 
{
    sPlist : "tx/fight/p2_fight_gb_s",
    nImgType : 2,
	nFrame : 9, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_gb_s_pg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 9, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//强攻动作
tFightArmDatas["2_3_4_1"] = 
{
    sPlist : "tx/fight/p2_fight_gb_s",
    nImgType : 2,
	nFrame : 12, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_gb_s_qg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 12, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//捅死动作
tFightArmDatas["2_3_5_1"] = 
{
    sPlist : "tx/fight/p2_fight_gb_s",
    nImgType : 2,
	nFrame : 12, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 20, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_gb_s_ts_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 12, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
////////////////////////////////////////////////// 上方:::《武将》:::动作 ////////////////////////////////
//待机动作
tFightArmDatas["2_4_1_1"] = 
{
    sPlist : "tx/fight/p2_fight_wj_s",
    nImgType : 2,
	nFrame : 13, // 总帧数
	pos : [-7, -9], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 12, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_wj_s_dj_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 13, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//跑步动作
tFightArmDatas["2_4_2_1"] = 
{
    sPlist : "tx/fight/p2_fight_wj_s",
    nImgType : 2,
	nFrame : 11, // 总帧数
	pos : [-7, -9], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_wj_s_pb_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 11, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//普攻动作
tFightArmDatas["2_4_3_1"] = 
{
    sPlist : "tx/fight/p2_fight_wj_s",
    nImgType : 2,
	nFrame : 16, // 总帧数
	pos : [-7, -9], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_wj_s_pg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 16, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//强攻动作
tFightArmDatas["2_4_4_1"] = 
{
    sPlist : "tx/fight/p2_fight_wj_s",
    nImgType : 2,
	nFrame : 15, // 总帧数
	pos : [-7, -9], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 24, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_wj_s_qg_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 15, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//捅死动作
tFightArmDatas["2_4_5_1"] = 
{
    sPlist : "tx/fight/p2_fight_wj_s",
    nImgType : 2,
	nFrame : 11, // 总帧数
	pos : [0, -2], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 20, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_wj_s_ts_aa_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 11, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//蓄力
tFightArmDatas["2_4_6_1"] = 
{
    sPlist : "tx/fight/p2_fight_wj_s",
    nImgType : 2,
	nFrame : 12, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 1, // 需要加亮
   	nPerFrameTime : 15, // 每帧播放时间（24帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "zd_tx_xl_s_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 12, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}


////////////////////////////////////////////////// 上方:::《限时Boss》:::动作 ////////////////////////////////
//待机动作
tFightArmDatas["2_5_1_1"] = 
{
    sPlist : "tx/fight/p2_fight_boss_s", // 图集
    nImgType : 2,
	nFrame : 12, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 18, // 每帧播放时间（18帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "sj_boss_s_dj_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 12, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}

//普攻动作
tFightArmDatas["2_5_3_1"] = 
{
    sPlist : "tx/fight/p2_fight_boss_s", // 图集
    nImgType : 2,
	nFrame : 12, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 18, // 每帧播放时间（18帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "sj_boss_s_pg_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 12, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}

//强攻动作
tFightArmDatas["2_5_4_1"] = 
{
    sPlist : "tx/fight/p2_fight_boss_s", // 图集
    nImgType : 2,
	nFrame : 14, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 18, // 每帧播放时间（18帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "sj_boss_s_qg_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 14, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}

//捅死动作
tFightArmDatas["2_5_5_1"] = 
{
    sPlist : "tx/fight/p2_fight_boss_s", // 图集
    nImgType : 2,
	nFrame : 20, // 总帧数
	pos : [0, 0], // 特效的x,y轴位置（相对中心锚点的偏移）
	fScale : 1,// 初始的缩放值
	nBlend : 0, // 需要加亮
   	nPerFrameTime : 18, // 每帧播放时间（18帧每秒）
	tActions : [
		 {
			nType : 1, // 序列帧播放
			sImgName : "sj_boss_s_ts_",
			nSFrame : 1, // 开始帧下标
			nEFrame : 20, // 结束帧下标
			tValues : null, // 参数列表
		},
	],
}
//////////////////////////// ↑方阵(上方)↑////////////////////////////