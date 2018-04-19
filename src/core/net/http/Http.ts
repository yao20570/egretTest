/** 
 * Http请求处理 one by one
 */
class Http extends BaseClass {
    private _serverUrl: string;
    private _urlLoader: egret.URLLoader;
    private _request: egret.URLRequest;
    private _cache: Array<any>;
    private _isRequesting: boolean;
    private _data: DataCache;
    private _type: string;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this._data = new DataCache();

        this._cache = [];

        this._request = new egret.URLRequest();
        this._request.method = egret.URLRequestMethod.POST;

        this._urlLoader = new egret.URLLoader();
        this._urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
    }

    /**
     * 初始化服务器地址
     * @param serverUrl服务器链接地址
     */
    public initServer(serverUrl: string): void {
        this._serverUrl = serverUrl;
    }

    /**
     * 数据缓存
     * @returns {DataCache}
     * @constructor
     */
    public get Data(): DataCache {
        return this._data;
    }

    /**
     * Http错误处理函数
     * @param e
     */
    private onError(e: egret.Event): void {
        this.nextPost();
    }

    /**
     * 请求数据
     * @param    type
     * @param    t_variables
     */
    public send(uri: string, urlVariables: egret.URLVariables): void {
        this._cache.push([uri, urlVariables]);
        this.post();
    }

    /**
     * 请求服务器
     */
    private post(): void {
        if (this._isRequesting) {
            return;
        }
        if (this._cache.length == 0) {
            return;
        }
        var arr: Array<any> = this._cache.shift();
        var type: string = arr[0];
        this._type = type;
        var urlVariables: egret.URLVariables = arr[1];

        if (type.indexOf("http://") > -1) {
            this._request.url = type
        } else {
            this._request.url = this._serverUrl + type;
        }
        this._request.data = urlVariables;

        this._urlLoader.addEventListener(egret.Event.COMPLETE, this.onLoaderComplete, this);
        this._urlLoader.load(this._request);
        this._isRequesting = true;
    }

    /**
     * 数据返回
     * @param event
     */
    private onLoaderComplete(event: egret.Event): void {
        this._urlLoader.removeEventListener(egret.Event.COMPLETE, this.onLoaderComplete, this);
        Log.trace("返回数据:", this._urlLoader.data);
        let res = this._urlLoader.data;
        if (res && res != "") {
            var t_obj: any = JSON.parse(this._urlLoader.data);
            if (!t_obj.hasOwnProperty("s") || t_obj["s"] == 0) {
                this._data.pUpdate.update(this._type, t_obj);
                App.MessageCenter.dispatch(this._type, t_obj);
            } else {
                Log.trace("Http错误:" + t_obj["s"]);
            }
        } else {
               Log.trace("Http错误,返回数据为空");
        }
        this.nextPost();
    }

    /**
     * 开始下一个请求
     */
    private nextPost(): void {
        this._isRequesting = false;
        this.post();
    }
}
