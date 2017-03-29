# UMS-WEB
 *Rights management page --- bootstrap*

>     功能

----

1. **doc** <br>
    - 存放参考的3个web模版

2. **web** <br>
    - config    存放全局参数
    - extplugin 第三方js库
    - log       日志模块
    - promise   存放异步请求，app是项目文件加载, server 是请求数据接口
    - test      测试的js

>     问题

 ---

1.  组件js文件异步加载时候，需要进行一定的初始化，需要自动进行-- 使用自定义的不同类型的间监听事件，并且加载js回去触发
