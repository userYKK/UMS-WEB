/**
 *
 * @author       ykk
 * @version      1.0
 * @date         2017-03-26 04:45
 * @description  前端构建相关的文件进行ajax加载
 * @file
 *
 */
(function () {
    /**
     *
     * @param fobj 全局参数控制的变量
     */
    var appPromise = function(){
        this.app = undefined; // 路径参数,是全局参数中的某一部分
        this.quickLoad = []; //无冲突加载
        this.safeLoad = []; // 有顺序的加载，可能是json对象 [后者在 push 时候有先后顺序]
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
                var logPaths = fobj.app.log;
                for (var i = 0; i < logPaths.length; i++) {
                    fobj.safeLoad.push(fobj._ajax(logPaths[i],false));
                }
            }
        },
        'ajaxTest': function (fobj) { //加载测试模块
            if (fobj.app && fobj.app.tester) {
                var testPaths = fobj.app.test;
                for (var i = 0; i < testPaths.length; i++) {
                    fobj.safeLoad.push(fobj._ajax(testPaths[i],false));
                }
            }
        }
    };

    /**
     *  初始化, 类级别的总体控制,拼装所有的异步请求，并且进行加载
     * @param fobj  全局参数控制的变量
     */
    var init =  function(fobj){
        var temp = fobj.appPromise = new appPromise(); // appPromise实例存放在全局中
        console.info('---------');
        var hehe = new appPromise();
        console.info(hehe.getClassName());
        temp.app = fobj.app;

        // 初始化运行modules
        for(var module in temp.modules){
            temp.modules[module](temp);
        }
        for (var i = 0; i < temp.quickLoad.length; i++) {
            $.when(temp.quickLoad[i]);
        }
        for (var i = 0; i < temp.safeLoad.length; i++) {
            $.when(temp.safeLoad[i]);
        }

        var a = {};
        // console.info(a.b.c);
    };

    return init;
})()(base);
