/**
 * 游戏的一些公共函数工具类
 * wenzongyao
 * 2018-4-12
*/

class GameUtils {

	/**
	 * 获取时间戳,单位-秒
	*/
	public static getSecTime(): number {
		let timestamp = new Date().getTime();
		timestamp = Math.floor(timestamp / 1000);
		return timestamp;
	}

	/**
	 * 获取时间戳,单位-毫秒
	*/
	public static getMsTime(): number {
		let timestamp = new Date().getTime();
		return timestamp;
	}

	/**
	 * 格式化倒计时
	 * @param nTime
	 * @param isAll 是否全格式 例如时间5秒true[00:00:05], false[5s],例如时间65秒true[00:01:05],false[00:05]
	*/
	public static formatTimeToHms(nTime:number, isAll:boolean):string {
		nTime = nTime ? nTime : 0
		let oneDay = 3600 * 24
		let oneH = 3600
		let oneM = 60

		let d = Math.floor(nTime / oneDay)
		let h = Math.floor(nTime % oneDay / oneH)
		let m = Math.floor(nTime % oneH / oneM)
		let s = Math.floor(nTime % oneM)

		let strD = d > 0 ? (d + "D") : "";
		let strH = h > 9 ? "" + h : "0" + h;
		let strM = m > 9 ? "" + m : "0" + m;
		let strS = s > 9 ? "" + m : "0" + s;

		let str = ""
		if (nTime > oneDay) {
			str = App.StringUtils.format("$0$1:$2:$3", strD, strH, strM, strS)
		}
		else {
			if (isAll) {
				str = App.StringUtils.format("$0:$1:$2", strH, strM, strS)
			}
			else{
				if (nTime > oneH) {
					str = App.StringUtils.format("$0:$1:$2", strH, strM, strS)
				}
				else if (nTime > oneM) {
					str = App.StringUtils.format("$0:$1", strM, strS)
				}
				else {
					str = App.StringUtils.format("$0S", s)
				}
			}
		}
		return str
	}

	public static showProtoErrorTip(id:number):void{
		let strErrorTips = ConfigDb.globalConfig.getProtoErrTips(id)
		if (strErrorTips){
			Toast.showTipsDownToUp(strErrorTips);
		}
	}
}