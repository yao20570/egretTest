/*
 * @Author: jrc 
 * @Date: 2018-4-2 16:15:3 
 * @Description: 颜色相关工具类
 */

const _cc = {
	white 	: 	0xffffff, 			//系统字颜色1（白色）
	pwhite  : 	0xc6c7da, 			//系统字颜色2（紫白）
    lgray   : 	0xa5acc7,           //系统字颜色2（浅灰色）
	gray  	: 	0x848484, 			//系统字颜色3（灰色）
	green  	: 	0x31d840, 			//系统字颜色4（绿色）
	yellow  : 	0xf5d93d, 			//系统字颜色5（黄色）
	blue  	: 	0x77d4fd, 			//系统字颜色6（蓝色）
	red  	: 	0xd72322, 			//系统字颜色7（红色）
    dblue   : 	0x729dca,           //系统字颜色8（深蓝色）
    purple  : 	0xbc46ff,           //系统字颜色8（紫色）
    brown   : 	0x655035,           //系统字颜色8 (棕色)
    gyellow : 	0xb7a58a,           //系统字颜色9 (灰黄)
    lbrown  : 	0xd8d1c0,           //浅褐色
    lyellow : 	0xdfd6b6,           //黄色2
    gjred   : 	0xfd7474,           //国家红
    gjyellow: 	0xfbfcae,           //国家黄
    gjgreen : 	0xa7ed92,           //国家绿
    gjblue  : 	0x8de0ef,           //国家蓝
	lwhite  : 	0xd7dac6,           //淡白色
    dyellow : 	0xececd1,           //灰秋麒麟(偏暗淡黄色)
    myellow : 	0xd6cb9f,           //淡淡的黄色
	black   : 	0x000000,           //系统字体颜15色（黑色）
    mred    : 	0x822316,           //红色
    syellow : 	0xfa9e3b,           //橙色
    kyellow : 	0xfdf742,           //
    byellow : 	0x7b3618,           //
    vgray   : 	0xe0e8f9,           //vip灰
    vgreen  : 	0x91f7a3,           //vip绿
    vblue   : 	0x8bc5fe,           //vip蓝
    vpurple : 	0xfb8dff,           //vip紫
    vorange : 	0xfff68d,           //vip橙
};

const _ccq = {
	white  	: 	0xffffff, 			//品质（白）
	green  	: 	0x31d840, 			//品质（绿）
	blue   	: 	0x00d8ff, 			//品质（蓝）
	purple 	: 	0xbc46ff, 			//品质（紫）
	orange 	: 	0xfeba29, 			//品质（橙）
	red    	: 	0xd72322, 			//品质（红）
}
class ColorUtils {
	/** 将格式为"f7d729"的字符串转换16进制的颜色值 */
	public static getC3B(sStr:string):any {
		if (sStr == null || sStr.length !== 6) return _cc.white;
		let color = "0x" + sStr;
		return color;
	}
	/** 设置文本颜色 */
	public static setTextColor(_lb:eui.Label, _sColor):void {
		_lb.textColor = ColorUtils.getC3B(_sColor);
	}
	/** 根据品质设置文本颜色 */
	public static setTextColorByQuality(_lb:eui.Label, _nQuality:number):void {
		_lb.textColor = ColorUtils.getColorByQuality(_nQuality);
	}
	/** 根据品质获取对应的颜色 */
	public static getColorByQuality(_nQuality:number):any {
		let c;
		switch(_nQuality) {
			case 1:{c = _ccq.white; break;}
			case 2:{c = _ccq.green; break;}
			case 3:{c = _ccq.blue; break;}
			case 4:{c = _ccq.purple; break;}
			case 5:{c = _ccq.orange; break;}
			case 6:{c = _ccq.red; break;}
			default:c = _ccq.white;
		}
		return c;
	}
	/** 根据品质获取颜色文本 */
	public static getColorTextByQuality(_nQuality:number):any {
		let c;
		switch(_nQuality) {
			case 1:{c = "白色"; break;}
			case 2:{c = "绿色"; break;}
			case 3:{c = "蓝色"; break;}
			case 4:{c = "紫色"; break;}
			case 5:{c = "橙色"; break;}
			case 6:{c = "红色"; break;}
			default:c = "白色";
		}
		return c;
	}
}