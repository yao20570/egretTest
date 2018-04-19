/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = () => {
                // MArmatureUtils.updateMArmature(SceneArmType.normal);
                // MArmatureUtils.updateMArmature(SceneArmType.base);
                // MArmatureUtils.updateMArmature(SceneArmType.world);
                MArmatureUtils.updateMArmature(SceneArmType.fight);
            }
        })
        RES.setMaxLoadingThread(6);
        eui.Label.default_fontFamily = "微软雅黑";
        egret.ImageLoader.crossOrigin = "anonymous";
        egret.MainContext.instance.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.OFF;
        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        //适配方式(全屏适配)
        App.StageUtils.startFullscreenAdaptation(640, 960, this.onResize);
        
        //初始化
        this.initScene();

        //加载资源
        this.loadResVersionComplate();
    }

    private onResize(): void {
        // App.ControllerManager.applyFunc(ControllerConst.Game, RpgGameConst.GameResize);
    }

    private loadResVersionComplate(): void {
        //初始化Resource资源加载库
        App.ResourceUtils.addConfig("resource/default.res.json", "resource/");
        App.ResourceUtils.loadConfig(this.onConfigComplete, this);
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(): void {
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    /**
     * 主题文件加载完成
     */
    private onThemeLoadComplete(): void {
        var groupName: string = "preload";
        var subGroups: Array<string> = ["preload_core", "login","fight","icon", "language","home","build","role","common","preload_sd"];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onPreloadComplete, this.onResourceLoadProgress, this);
    }

    private onPreloadComplete(): void {
        window["runMainProgress"].call(this,80);
        this.enterGame();
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(itemsLoaded: number, itemsTotal: number): void {
        window["runSubProgress"].call(this,itemsLoaded,itemsTotal);
    }

    private enterGame(): void {
        App.Init();
        App.ControllerManager.register(ControllerConst.Login, new LoginController());
        //音乐音效处理
        App.SoundManager.setBgOn(true);
        App.SoundManager.setEffectOn(!App.DeviceUtils.IsHtml5 || !App.DeviceUtils.IsMobile);
        //App.SceneManager.runScene(SceneConsts.LOGIN);
        App.ControllerManager.applyFunc(ControllerConst.Login,LoginConst.ROLE_LOGIN_REQ);        
    }

    /**
     * 初始化所有场景
     */
    private initScene(): void {
        //App.SceneManager.register(SceneConsts.LOGIN, new LoginScene());
        App.SceneManager.register(SceneConsts.UI, new UIScene());
        App.SceneManager.register(SceneConsts.Game, new GameScene());
        App.SceneManager.register(SceneConsts.WORLD, new WorldScene());
    }
}


