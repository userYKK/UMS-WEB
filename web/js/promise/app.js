/**
 *
 * @author       ykk
 * @version      1.0
 * @date         2017-03-26 04:45
 * @description  前端构建相关的文件加载
 * @file
 *
 */
var appPromise = {
    'quickLoad': [],//无冲突加载
    'safeLoad': [],   // 有顺序的加载，可能是json对象
    'run': function () {
        this.ajaxExtPlugins();
        this.ajaxLog();
        for (var i = 0; i < appPromise.quickLoad.length; i++) {
            $.when(appPromise[i]);
        }
    },
    'ajaxExtPlugins': function () { //加载第三方插件
        if (this.app) {
            var pluginPaths = this.app.extplugins;
            for (var i = 0; i < pluginPaths.length; i++) {
                this.quickLoad.push(
                    $.ajax({
                        url: pluginPaths[i],
                        type: 'GET',
                        cache: true,
                        dataType: 'script'
                    })
                );
            }
        }
    },
    'ajaxLog': function () { //加载日志模块
        if (this.app) {
            this.quickLoad.push(
                $.ajax({
                    url: this.app.log,
                    type: 'GET',
                    cache: true,
                    dataType: 'script'
                })
            );
        }
    }
};
