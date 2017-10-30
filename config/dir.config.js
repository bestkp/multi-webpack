var path = require('path');
var moduleExports = {};

// 源文件目录
moduleExports.staticRootDir = path.resolve(__dirname, './'); // 项目根目录
moduleExports.srcRootDir = path.resolve(moduleExports.staticRootDir, './src'); // 项目业务代码根目录
moduleExports.libDir = path.resolve(moduleExports.staticRootDir, './lib'); // 存放所有不能用npm管理的第三方库
moduleExports.pagesDir = path.resolve(moduleExports.srcRootDir, './pages'); // 存放各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等
moduleExports.configDir = path.resolve(moduleExports.staticRootDir, './config'); // 存放各种配置文件
moduleExports.componentsDir = path.resolve(moduleExports.srcRootDir, './components'); // 存放组件，可以是纯HTML，也可以包含js/css/image等，看自己需要
moduleExports.layoutDir = path.resolve(moduleExports.srcRootDir, './layout'); // 存放UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路
// 生成文件目录
moduleExports.buildDir = path.resolve(moduleExports.staticRootDir, './dist'); // 存放编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）

module.exports = moduleExports;
