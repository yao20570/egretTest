/**
 * XXTEA 加密工具类
 */
class XxteaUtils extends BaseClass {
	private delta: number = 0x9E3779B9;

	public constructor() {
		super();
	}

	/**
	 * 加密
	 * @param data 原文
	 * @param key 密码
	 * @returns {Array}
	 */
	public encryptByteToByte(data: egret.ByteArray, key: egret.ByteArray): egret.ByteArray {
		if (data.length == 0) {
			return null;
		}
		let v: Array<number> = this.toIntArray(data.bytes, true);
		let k: Array<number> = this.toIntArray(key.bytes, false);
		let tmpData: Array<number> = this.encryptInner(v, k);
		let tmpByteArray: egret.ByteArray = this.toByteArray(tmpData, false);
		return tmpByteArray;
	}
	
	/**
	 * 加密
	 * @param data 原文
	 * @param key 密码
	 * @returns {Array}
	 */
	public encryptStrToByte(data: string, key: string): egret.ByteArray {
		if (data.length == 0) {
			return null;
		}
		let dataByteArray: egret.ByteArray = new egret.ByteArray();
		dataByteArray.writeUTFBytes(data);

		let keyByteArray: egret.ByteArray = new egret.ByteArray();
		keyByteArray.writeUTFBytes(key);

		let v: Array<number> = this.toIntArray(dataByteArray.bytes, true);
		let k: Array<number> = this.toIntArray(keyByteArray.bytes, false);
		let tmpData: Array<number> = this.encryptInner(v, k);
		let tmpByteArray: egret.ByteArray = this.toByteArray(tmpData, false);
		return tmpByteArray;
	}

	/**
	 * 解密
	 * @param data 密文
	 * @param key 密码
	 * @returns {Array}
	 */
	public decryptByte(data: egret.ByteArray, key: string): string {
		if (data.length == 0) {
			return null;
		}

		let keyByte: egret.ByteArray = new egret.ByteArray();
		keyByte.writeUTFBytes(key);

		let v: Array<number> = this.toIntArray(data.bytes, false);
		let k: Array<number> = this.toIntArray(keyByte.bytes, false);
		let tmpData: Array<number> = this.decryptInner(v, k);
		let tmpByteArray: egret.ByteArray = this.toByteArray(tmpData, true);
		tmpByteArray.position = 0;
		return tmpByteArray.readUTFBytes(tmpByteArray.length);
	}

	private toIntArray(data: Uint8Array, includeLength: boolean): Array<number> {
		let n: number = (((data.length & 3) == 0) ? (data.length >>> 2)
			: ((data.length >>> 2) + 1));
		let result: Array<number>;

		if (includeLength) {
			result = new Array(n + 1);
			result[n] = data.length;
		} else {
			result = new Array(n);
		}
		n = data.length;
		for (let i = 0; i < n; i++) {
			result[i >>> 2] |= (0x000000ff & data[i]) << ((i & 3) << 3);
		}
		return result;
	}

	private encryptInner(v: Array<number>, k: Array<number>): Array<number> {
		let n = v.length - 1;

		if (n < 1) {
			return v;
		}
		if (k.length < 4) {
			let key: Array<number> = new Array(4);
			for (let i = 0; i < 4; i++) {
				key[i] = 0;
			}
			for (let i = 0; i < k.length; i++) {
				key[i] = Number(k[i]);
			}

			k = key;
		}
		let z = v[n], y = v[0], sum = 0, e;
		let p, q = Math.floor(6 + 52 / (n + 1));

		while (q-- > 0) {
			sum = sum + this.delta & 0xffffffff;
			e = sum >>> 2 & 3;
			for (p = 0; p < n; p++) {
				y = v[p + 1];
				v[p] = v[p] + this.MX(sum, y, z, p, e, k) & 0xffffffff
				z = v[p];
			}
			y = v[0];
			v[n] = v[n] + this.MX(sum, y, z, p, e, k) & 0xffffffff;
			z = v[n];
		}
		return v;
	}

	private decryptInner(v: Array<number>, k: Array<number>): Array<number> {
		let n = v.length - 1;

		if (n < 1) {
			return v;
		}
		if (k.length < 4) {
			let key: Array<number> = new Array(4);
			for (let i = 0; i < 4; i++) {
				key[i] = 0;
			}
			for (let i = 0; i < k.length; i++) {
				key[i] = Number(k[i]);
			}

			k = key;
		}
		let z = v[n], y = v[0], sum, e;
		let p, q = Math.floor(6 + 52 / (n + 1));

		sum = q * this.delta & 0xffffffff;
		while (sum != 0) {
			e = sum >>> 2 & 3;
			for (p = n; p > 0; p--) {
				z = v[p - 1];
				v[p] = v[p] - this.MX(sum, y, z, p, e, k) & 0xffffffff;
				y = v[p];
			}
			z = v[n];
			v[0] = v[0] - this.MX(sum, y, z, p, e, k) & 0xffffffff
			y = v[0];
			sum = sum - this.delta & 0xffffffff;
		}
		return v;
	}

	private MX(sum: number, y: number, z: number, p: number, e: number, k: Array<number>): number {
		return (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4)
			^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
	}

	private toByteArray(data: Array<number>, includeLength: boolean): egret.ByteArray {
		let n = data.length << 2;

		if (includeLength) {
			let m = data[data.length - 1];

			if (m > n) {
				return null;
			} else {
				n = m;
			}
		}
		let result: egret.ByteArray = new egret.ByteArray();
		for (let i = 0; i < n; i++) {
			result.writeByte((data[i >>> 2] >>> ((i & 3) << 3)) & 0xff);
		}
		return result;
	}
}