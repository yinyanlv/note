.babelrc文件
{
   "presets": [
     "es2015",
     "react",
     "stage-2"
   ],
   "plugins": []
 }
 # ES2015转码规则
 $ npm install --save-dev babel-preset-es2015
 # react转码规则
 $ npm install --save-dev babel-preset-react
 # ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
 $ npm install --save-dev babel-preset-stage-0
 $ npm install --save-dev babel-preset-stage-1
 $ npm install --save-dev babel-preset-stage-2
 $ npm install --save-dev babel-preset-stage-3

命令行转码babel-cli
$ npm install -g babel-cli

# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s

babel-polyfill模块
Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码
如果想让这个方法运行，必须使用babel-polyfill模块，为当前环境提供一个垫片
要在脚本头部加如下代码：
import 'babel-polyfill';
// 或者
require('babel-polyfill');

babel-node
babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码

babel-register模块
babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码
require("babel-register");
require("./index.js");

babel-core模块
如果某些代码需要调用Babel的API进行转码，就要安装babel-core模块
