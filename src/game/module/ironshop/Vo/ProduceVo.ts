/**
 * 打造数据
 * wenzongyao
 * 2018-4-12
*/

class ProduceVo {
	public id: number;
	public speed: number;
	public isHelp: number;
	public completeTime: number;

	/**打造装备的配置数据*/
	private _equipCfg:any; 

	public constructor($data: any) {
		this.updateData($data);
	}

	public updateData($data) {
		if (!$data) {
			return;
		}

		this.id = $data.i 	/**打造的装备ID*/
		this.speed = $data.sp  /*铁匠加速时间*/
		this.isHelp = $data.rh /*是否已经求助 1是0不是*/
		this.completeTime = GameUtils.getSecTime() + $data.cd

		this._equipCfg = ConfigDb.equipConfig.getBaseEquipDataByID(this.id);
	}

	/**
	 * 还差多少秒完成打造
	 * @return 秒
	*/
	public getCD(): number {
		let cd = this.completeTime - GameUtils.getSecTime();
		cd = Math.max(cd, 0)
		return cd;
	}

	/**
	 * 打造装备的配置数据
	 * @return 配置数据
	*/
	public getConfigData(){
		return this._equipCfg;
	}

}