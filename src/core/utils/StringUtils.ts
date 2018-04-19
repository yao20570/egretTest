/**
 * 字符串操作工具类
 */
class StringUtils extends BaseClass {
    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    public trimSpace(str: string): string {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    }

    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    public getStringLength(str: string): number {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            } else {
                length += 1;
            }
        }
        return length;
    }

    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    public isChinese(str: string): boolean {
        let reg = /^.*[\u4E00-\u9FA5]+.*$/;
        return reg.test(str);
    }

    /**
     * 判断一个字符串是否以指定的字符串结尾
     * @param str 源字符串
     * @param endStr 判断字符串
     * @returns {boolean}
     */
    public endWith(src: string, endStr: string) {
        src.replace
        var d = src.length - endStr.length;
        return (d >= 0 && src.lastIndexOf(endStr) == d)
    }

    /**
     * 格式化指定的模板字符串
     * @param str 模板字符串
     * @param args 替换参数
     * @returns {boolean}
     */
    public format(str: string, ...args): string {
        if (args == null || args.length <= 0) {
            return str;
        }
        for (let i = 0; i < args.length; i++) {
            str = str.replace("$" + i, args[i]);
        }
        return str;
    }

    /**
     * 多重分割字符串(n维数组) 例如splitMuilt("aa,bb|cc,dd", "|", ",") 分割成 [["aa","bb""],["cc","dd"]]
     * @param str 要分割的字符串
     * @param args 要分割的参数列表 
    */
    public splitMuilt(str: string, ...args):any{
        let ary = this._splitMuilt(str, 0, ...args)
        return ary
    }
    private _splitMuilt(str: string, index:number, ...args):any{  
        let strAry = str.split(args[index]);
        ++index;
        if (index < args.length){
            let retAry = [] 
            for(let v of strAry){
                retAry.push(this._splitMuilt(v, index, ...args ))
            }
            return retAry;
        }         
        return strAry;
    }

}