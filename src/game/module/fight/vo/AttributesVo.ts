module fight {
	export class AttributesVo {
		/**属性集合 */
		public ats:Array<fight.AttribVo>;

		public constructor() {
		}
	}
	
	export function getAttriValue(array:Array<fight.AttribVo>,attriName:number): number{
		let atk = 0;
		for(let atrVo of array){
			if(atrVo.k != attriName){
				continue;
			}	
			atk = atrVo.v;
		}
		return atk;
	}
}