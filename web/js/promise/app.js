/**
 *
 * @author       ykk
 * @version      1.0
 * @date         2017-03-26 04:45
 * @description  前端构建相关的文件进行ajax加载
 * @file
 *
 */
var appPromise = function(){
    this.app = undefined; // 路径参数,是全局参数中的某一部分
    this.quickLoad = []; //无冲突加载
    this.safeLoad = []; // 有顺序的加载，可能是json对象 [后者在 push 时候有先后顺序]
};

/**
 *  初始化, 类级别的总体控制,拼装所有的异步请求，并且进行加载
 */
appPromise.prototype.init = function(){
    // 初始化运行modules
    for(var module in this.modules){
        this.modules[module](this);
    }
    for (var i = 0; i < this.quickLoad.length; i++) {
        $.when(appPromise[i]);
    }
    for (var i = 0; i < this.safeLoad.length; i++) {
        $.when(appPromise[i]);
    }

    var a = {};
    console.info(a.b.c);
};

/**
 *   私有方法,拼接ajax请求的格式
 * @param path 需要加载的js路径
 * @param async 是否异步
 * @returns {*}
 * @private
 */
appPromise.prototype._ajax = function(path,async){
    var tempPromise = $.ajax({
        url: path,
        type: 'GET',
        cache: true,
        dataType: 'script',
        async: async
    });
    return tempPromise;
};

/**
 *  不同的请求模块
 * @type {{ajaxExtPlugins: Function, ajaxLog: Function, ajaxTest: Function}}
 */
appPromise.prototype.modules = {
    'ajaxExtPlugins': function (fobj) { //加载第三方插件
        if (fobj.app) {
            var pluginPaths = fobj.app.extplugins;
            for (var i = 0; i < pluginPaths.length; i++) {
                fobj.quickLoad.push(fobj._ajax(pluginPaths[i],true));
            }
        }
    },
    'ajaxLog': function (fobj) { //加载日志模块
        if (fobj.app) {
            fobj.safeLoad.push(fobj._ajax(fobj.app.log ,false));
        }
    },
    'ajaxTest': function (fobj) { //加载测试模块
        if (fobj.app) {
            var testPaths = fobj.app.test;
            for (var i = 0; i < testPaths.length; i++) {
                fobj.safeLoad.push(fobj._ajax(testPaths[i],false));
            }
        }
    }
};

