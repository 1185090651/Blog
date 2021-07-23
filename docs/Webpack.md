# Webpack

> 项目使用的是[Webpack5](https://webpack.docschina.org/guides/)

没有采用脚手架去生成项目框架，而是使用 Webpack 手动搭建，这样方便理解项目的架构以及性能优化点。搭建参考的是**create-react-app**的源码以及一些博主的改进思路。

## Webpack基础

> webpack.base.config.js

Webpack 看起来很复杂不容易理解，初学者看到这个就犯怵，那么多配置根本就不知道从哪里下手，如果你从Webpack的本质思考——***静态模块打包工具***，他最核心的代码就出来了，就是将我们平常写的ES6、scss、ts以及一些媒体资源文件处理一下让浏览器可以正常执行

### 入口 - entry

Webpack 需要你提供项目的入口，正如提供毛线球的线头一样，它才能开始接手你的项目

#### 单个入口简写语法

用法： `entry: string | [string]`

```js
// webpack.config.js
module.exports = {
	entry: './src/index.js'
}
```

也可以将一个文件路径数组传递给 `entry` 属性，这将创建一个所谓的 "multi-main entry"。如果你需要一次注入多个依赖文件，并想把他们的依赖绘制在一个 "chunk" 中，这种方式就很有用——即下面的两个文件会合成一个文件

```js
// webpack.config.js
module.exports = {
	entry: ['./a.js', './b.js']
}
```

#### 对象语法

用法： `entry: { <entryChunkName> string | [string] } | {}`

```js
// webpack.config.js
module.exports = {
	app: './src/app.js',
  adminApp: './src/adminApp.js'
}
```

这种写法会比较繁琐。然而，这是分割代码最简单的方式。

Webpack 官网还提供了**[描述入口的对象](https://webpack.docschina.org/concepts/entry-points/#entry-description-object)**写法:

- `import` : 启动时需加载的模块

- `dependOn`: 当前入口所依赖的入口。他们必须在该入口被加载前加载。

  这里是我个人的理解，并未在实际项目中使用，使用请慎重⚠️。

  假设有一个依赖文件 `share.js`

  ```js
  // share.js
  exports. x = '我是依赖'
  
  console.log('console.log 我是依赖')
  ```

  入口文件 `app.js` 需要使用它

  ```js
  // app.js
  const share = require('./share')
  
  console.log(share)
  
  console.log('我是App')
  
  exports.a = '我是app的内容'
  ```

  如果另一个模块依赖 `share.js` ，模块加载时会调用share.js，而当加载 `app.js` 就会被再次调用。所以我们可以将这个公共依赖放入这个入口的 `dependOn`中

  ```js
  // webpack.config.js
  module.exports = {
    entry: {
      share: "./src/share.js",
      main: {
        import: "./src/app.js",
        dependOn: 'share'
      },
    },
    output: {
      filename: "[name].[contenthash].bundle.js"
    },
  };
  ```

  此时打包出来的内容为：

  ```js
  // share.0a08e6542c01a86308cb.bundle.js
  (() => {
    var r,
      e = {
        392: (r, e) => {
          (e.x = "我是依赖"), console.log("console.log 我是依赖");
  		    // .......More
          o = (self.webpackChunk = self.webpackChunk || []);
        o.forEach(e.bind(null, 0)), (o.push = e.bind(null, o.push.bind(o)));
      })();
    var l = n(392);
    l = n.O(l);
  })();
  // main.712e5f5a27c271ced9fe.bundle.js
  (self.webpackChunk = self.webpackChunk || []).push([
    [179],
    {
      672: (s, e, o) => {
        const c = o(392);
        console.log(c), console.log("我是App");
      },
    },
    (s) => {
      "use strict";
      s((s.s = 672));
    },
  ]);
  ```

  此时运行这两个文件都会报错 `self is not defined`，分析代码发现是代码中存在 `self.webpackChunk`，结合Webpack的介绍，先加载  `share.js` 再加载 `app.js`，加载 `share.js` 会将 `share.js` 的导出挂在到 `self.webpackChunk`，加载 `app.js` 时再从  `self.webpackChunk` 中获取依赖。

  如果想要运行上述代码可以在输出(output)时配置 `globalObject`，这个新变量就会替换 `self`，如下：

  ```js
  // webpack.config.js
  module.exports = {
    entry: {
      share: "./src/share.js",
      main: {
        import: "./src/app.js",
        dependOn: 'share'
      },
    },
    output: {
      filename: "[name].[contenthash].bundle.js",
      globalObject: 'window'
    },
  };
  ```

  在html里引入这两个资源(⚠️注意： 先引入share.js，再引入app.js)，就会看到控制台输出如下：

  ![image-20210721171736699](https://i.loli.net/2021/07/21/Tml5HRjNWCXAqo4.png)

- `runtime`: 运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 `false` 以避免一个新的运行时 chunk，创建的新 chunk 代码类似于 `share.js`，而 `app.js` 又带上了 `self.webpackChunk`，推测运行时文件会给全局加入 `self.webpackChunk` 为后续加入其他依赖，将运行时 chunk 和 app.js 按顺序引入 html 中，控制台正常输出

- `filename`: 指定要输出的文件名称，参考`output.filename`

- `library`: 指定 library 选项，为当前 entry 构建一个 library，参考`output.library`

- `publicPath`: 当该入口的输出文件在浏览器中被引用时，为它们指定一个公共 URL 地址。参考 `output.publicPath`。

#### 常见场景

**分离app(应用程序)和vendor(第三方库)入口**

```js
// webpack.config.js
module.exports = {
  entry: {
    main: './src/app.js',
    vendor: './src/vendor.js',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
  }
};
```

这样做是告诉 Webpack 需要打包两个单独的 chunk。这样做的好处在于可以将一些不会修改的依赖（例如 Bootstrap、lodash）放在 vendor 当中，这些依赖就会被打包一起生成一个 chunk。由于这些依赖基本不会有变化，所以它的 contenthash 也不会发生变化，能够更好的优化浏览器缓存。关于出口会在下面提到。

> **Tips**
>
> 在 webpack < 4 的版本中，通常将 vendor 作为一个单独的入口起点添加到 entry 选项中，以将其编译为一个单独的文件（与`CommonChunkPlugin`结合使用）
>
> 而在 webpack > 4 中不鼓励这样做。而是使用 [optimization.splitChunks](https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks) 选项，将 vendor 和 app模块分开，并为其创建一个单独的文件。**不要** 为 vendor 或其他不是执行起点创建 entry。

**多页面应用程序**

```js
// webpack.config.js
module.exports = {
  entry: {
    pageOne: './src/pageOne.js',
    pageTwo: './src/pageTwo.js',
		pageThree: './src/pageThree.js'
  }
}
```

这样做是告诉 webpack 需要打包三个单独的 chunk。在多页面应用里，每访问一个页面就会重新获取一个新的 HTML 文档。当新的 HTML 文档被加载的时候，资源也会被重新下载。<u>为了解决这个问题，webpack 提供了[optimization.splitChunks](https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks) 为页面间共享的应用程序代码创建 bundle。由于入口起点数量的增多，多页应用能够复用多个入口起点之间的大量代码/模块，从而可以极大地从这些技术中受益。</u> 这句话是什么意思？

#### chunk 名称

1. 如果 entry 类型为 string 或者 array，只会生成一个 chunk，且名称为 main；
2. 如果 entry 类型为 object，则会生成多个 chunk，名称为 object 的key

#### 动态配置 Entry

业务场景：多页面应用可能只启动一个项目，此时需要用户手动传入 项目入口(可以通过package.json/命令行cli的形式)

动态配置 entry， 可以将 entry 设置为一个函数，支持同步和异步：

```js
// webpack.config.js
module.exports = {
  // 同步
  entry: function syncEntry() {
    return {
      index: './index.js',
      main: './main.js',
    };
  },
  // 异步
  entry: function asyncEntry() {
    return new Promise(function (resolve) {
      resolve({
        index: './index.js',
        main: './main.js',
      });
    });
  },
};
```

### 出口 - output

可以通过配置 `output` ，告知 webpack 如何向磁盘写入编译文件。注意，即使可以存在多个 `entry` 起点，但只能指定一个 `output` 配置。

#### 用法

最简单的配置只需要给 `output` 属性指定 `filename`

```js
// webpack.config.js
module.exports = {
  output: {
    filename: 'bundle.js'
  }
}
// 写入到硬盘： ./dist/bundle.js
```

也可以指定写入硬盘路径

```js
// webpack.config.js
module.exports = {
	 output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  }
}
```

#### 多个入口

如果在入口 entry 中创建多个 chunk，则应该需要使用 [占位符(substitutions)](https://webpack.docschina.org/configuration/output/) 来确保每个文件具有唯一的名称。

```js
// webpack.config.js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};

// 写入到硬盘：./dist/app.js, ./dist/search.js
```

#### 占位符

当通过多个入口(entry point)、代码拆分(code splitting)或各种插件(plugin)创建多个 bundle, 应该使用以下一种替换方式，来赋予每个 bundle 一个唯一的名称，以下通过是通过 webpack 内部的[TemplatedPathPlugin](https://github.com/webpack/webpack/blob/master/lib/TemplatedPathPlugin.js)实现

使用入口名称：

```js
// webpack.config.js
module.exports = {
  //...
  output: {
    filename: '[name].bundle.js',
  },
};
```

使用内部 chunk id

```js
// webpack.config.js
module.exports = {
  //...
  output: {
    filename: '[id].bundle.js',
  },
};
```

使用由生成的内容产生的 hash：

```js
// webpack.config.js
module.exports = {
  //...
  output: {
    filename: '[contenthash].bundle.js',
  },
};
```

结合多个替换组合使用：

```js
// webpack.config.js
module.exports = {
  //...
  output: {
    filename: '[name].[contenthash].bundle.js',
  },
};
```

使用函数返回 filename：

```js
// webpack.config.js
module.exports = {
  //...
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js';
    },
  },
};
```

注意，此选项不会影响那些「按需加载」的输出文件。它只影响最初加载的输出文件。对于按需加载的 chunk 文件，请使用 `output.chunkFilename` 选项来控制输出。通过 loader 创建的文件也不受影响。



#### 打包库 - library

你可能需要 Webpack 把你写的模块打包成库，配置 `output` 或许可以解决你的问题

- 类型: `string | string[] | object`

**我们来看一个简单的实例**。

```js
// webpack.config.js
module.exports = {
  // …
  entry: './src/index.js',
  output: {
    library: 'MyLibrary',
  },
};
```

假设你在 `src/index.js` 的入口导出了如下函数：

```js
// src/index.js
export function hello(name) {
  console.log(`hello ${name}`)
}
```

此时，变量 `MyLibrary` 将与你的入口文件所导出的文件进行绑定，下面是如何使用 webpack 构建的库的实现

```html
<script src="./main.js"></script>
<script>
  MyLibrary.hello('webpack');
</script>
```



**Webpack 可以接受多个 entry，例如一个 `array` 或者 `object`**

1. 如果你将 `entry` 设置为一个 `array`，那么只有数组中的最后一个会被暴露。

```js
module.exports = {
  // …
  entry: ['./src/a.js', './src/b.js'], // 只有在 b.js 中导出的内容才会被暴露
  output: {
    library: 'MyLibrary',
  },
};
```

2. 如果你将 `entry` 设置为一个 `object`，那么也是对象中的最后一个会被暴露

```js
module.exports = {
  // …
  entry: {
    a: './src/a.js',
    b: './src/b.js'
  },
  output: {
    library: 'MyLibrary',
  },
};
```

![image-20210722115028810](https://i.loli.net/2021/07/22/aoHxMyOjvhzQ4UY.png)

3. 如果你需要将两个模块的内容都暴露出来

```js
// webpack.config.js
module.exports = {
  // …
  entry: {
    a: './src/a.js',
    b: './src/b.js',
  },
  output: {
    filename: '[name].js',
    library: ['MyLibrary', '[name]'], // name is a placeholder here
  },
};
```

![image-20210722115243689](https://i.loli.net/2021/07/22/5othSvWgRYMNIxf.png)



**你打算给每个入口点配置不同的library的话，你可以在 `entry`配置`library` 信息**

```js
module.exports = {
  // …
  entry: {
    main: {
      import: './src/index.js',
      library: {
        // `output.library` 下的所有配置项可以在这里使用
        name: 'MyLibrary',
        type: 'umd', // 配置将库暴露的方式
        umdNamedDefine: true, // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
      },
    },
    another: {
      import: './src/another.js',
      library: {
        name: 'AnotherLibrary',
        type: 'commonjs2',
      },
    },
  },
};
```



**还有很多配置可以参照[output.library](https://webpack.docschina.org/configuration/output/#outputlibrary)，以后用到哪个会在下面补充**



#### Others

其他的配置项参照 [output](https://webpack.docschina.org/configuration/output/)



### Loader

loader 项在 `module.rules` 中配置，它可以匹配不同后缀名做不同的处理，比如转译，压缩...

[module.rules](https://webpack.docschina.org/configuration/module/#modulerules) 允许你在 webpack 配置中指定多个 loader。 这种方式是展示 loader 的一种简明方式，并且有助于使代码变得简洁和易于维护。同时让你对各个 loader 有个全局概览：

**loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)。**

#### 解析 ts/js

```js
// webpack.base.config.js
module.exports = {
  // ..
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/,
        include: [
          resolve("src"),
          resolve("node_modules/webpack-dev-server/client"),
        ]
      }
    ]
  }
}
```

`babel-loader` 整合了 `ts-loader`，这里只需要配置一个就可以，当然你可以选择哪些文件需要操作(include)，哪些文件不需要操作(exclude)

#### 解析 css

```js
// webpack.base.config.js
module.exports = {
  // ..
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader"
          },
        ],
      },
    ]
  }
}
```

loader 支持链式调用。链中的每个 loader 会将转换应用在已处理过的资源上。一组链式的 loader 将按照相反的顺序执行。

`css-loader` 会对 `@import` 和 `url()` 进行处理，就像 js 解析 `import/require()` 一样。

`style-loader` 会创建 `<style></style>` 标签，将 css 应用到页面上

#### 解析 scss

```js
// webpack.base.config.js
module.exports = {
  // ..
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:5]",
              },
            },
          },
          {
            loader: "sass-loader"
          },
        ],
      },
    ]
  }
}
```

`sass-loader` 会转译 scss => css

这里有个突出的 `options` 选项，它的作用是使用 `CSS Module` 时自定义 `className`，如下：

![image-20210722132000412](https://i.loli.net/2021/07/22/sbV9NzyOi6PorTt.png)

#### Webpack 5 - Asset Modules

Before webpack 5，the configuration we handle `asset modules` may look like this: 

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
  			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  			loader: "url-loader",
  			options: {
    			limit: 10000,
    			name: utils.assetsPath("img/[name].[hash:7].[ext]"), // export path
  			},
			},
    ]
  }
}
```

All the modules that match a rule with the above regular will be emitted into the output directory(`img/[name].[hash:7].[ext]`). If a module size is greater than 10kb(`limit: 10000`)，they will be inlined to the bundle as data-url like this: 

```css
background: url("data:image/svg+xml;base64,....") no-repeat;
```

Prior to webpack 5 it was common to use: 

- `file-loader` to emit a file into the ouput directory
- `url-loader` to inline a file into the bundle as a data URI
- `raw-loader` to import a file as a string

`url-loader` includes `file-loader`. We only need configure the limit size，`url-loader` will choose the correct loader to handle it automatically.

Asset Module type replaces all of these loaders by adding 4 new module types: 

- `asset/resource` emits a separate file and exports the URL. Previously achievable by using `file-loader`
- `asset/inline` exports a data URI of the asset. Previously achievable by using `url-loader`
- `asset/source` exports the source code of the asset. Previously achievable by using `raw-loader`
- `asset` automatically chooses between exporting a data URI and emitting a separate file. Previously achievable by using `url-loader`

**Custom output filename**

By default, `asset/resource` modules are emitting with `[hash][ext][query]` filename into output directory.

You can modify this template by setting `output.assetModuleFilename`  or `Rule.genetator.filename` in your webpack configuration.

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
     }
     },
     {
       test: /\.html/,
       type: 'asset/resource',
       generator: {
         filename: 'static/[hash][ext][query]' // With this configuration all the html files will be emitted into a static directory within the output directory.
       }
     }
    ]
  },
};
```



**Custom data URI generator**

By default, data URI emitted by webpack represents file contents encoded by using Base64 algorithm.

If you want to use a custom encoding algorithm, you may specify a custom function to encode a file content:

````js
const path = require('path');
 const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        type: 'asset/inline',
       generator: {
         dataUrl: content => {
           content = content.toString();
           return svgToMiniDataURI(content);
         }
       }
      }
    ]
  },
};
````

Now all `.svg` file will be encoded by `mini-svg-data-uri` package.



**Custom file size limit**

Now webpack will automatically choose between `resource` and `inline` by following a default condition: a file with size less than 8kb will be treated as a `inline` module type an `resource` module type otherwise.

You can change this condition by setting a `Rule.parser.dataUrlCondition.maxSize` option on the module rule level of your webpack configuration: 

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
       parser: {
         dataUrlCondition: {
           maxSize: 4 * 1024 // 4kb
         }
       }
      }
    ]
  },
};
```
Also you can specify a function to decide to inlining a module or not.



### Resolve

type:  `object`

Configure how modules are resolved. For example, when calling `import 'lodash'` in ES6, the `resolve` options can change where webpack goes to look for `lodash`.

#### Simplify your import

**Alias**

type: `object`

Create aliases to `import` or `require` certain modules more easily. For example, to alias a bunch of commonly used `src/` folders: 

```js
const path = require('path');

module.exports = {
  //...
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/'),
    },
  },
};
```

Now, instead of using relative paths when import like so:

```sh
import Utility from '../../utilities/utility';
```

you can use the alias:

```sh
import Utility from 'Utilities/utility';
```

A trailing `$` can also be added to the given object's keys to signify an exact match:

```js
const path = require('path');

module.exports = {
  //...
  resolve: {
    alias: {
      xyz$: path.resolve(__dirname, 'path/to/file.js'),
    },
  },
};
```

which would yield these results:

```js
import Test1 from 'xyz'; // Exact match, so path/to/file.js is resolved and imported
import Test2 from 'xyz/file.js'; // Not an exact match, normal resolution takes place
```

Setting `resolve.alias` to `false` will tell webpack to ignore a module.

**extensions**

type: [string] = ['.js', '.json', '.wasm']

Attempt to resolve these extensions in order. If multiple files share the same name but have different extensions, webpack will resolve the one with the extension listed first in the array and skip the rest.

```js
// webpack.config.js
module.exports = {
  //...
  resolve: {
    extensions: ['.js', '.json', '.wasm'],
  },
};
```

which is what enables users to leave off the extension when importing:

```js
import File from '../path/to/file';
```

Note that using `resolve.extensions` like above will override the default array, meaning that webpack will no longer try to resolve modules using the default extensions. However you can use `...` to access the default extensions:



### Plugins

#### WebpackBar

 Display elegant progress bar while building or watch like this: 

![image-20210722170913352](https://i.loli.net/2021/07/22/rDIyBZTSeYiULKM.png)