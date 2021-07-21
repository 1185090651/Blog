## 博客

这个项目大家应该都比较熟悉，一般学习一种语言或者框架都会拿一个具有简单 CRUD 的项目练手，博客就是其中一个。

这个项目也不例外。但我更希望它能够脱离复杂业务只从技术角度出发，回顾与总结我学过的技术。它更像一只小白鼠🐭，我可以把所学的技术全实验它身上。

废话不多说，Let's Do it !

## 憧憬

项目总得有个目标吧，不然写着写着就得过且过了。你可以把这里当成 CHANG_LOG，或者是我吹过的牛皮。
### Version 1.0.0
把整体的框架搭起来，**Webpack + React + Redux + Redux-thunk + TS + Antd + Koa + mongodb**，可以看博客，可以创建知识库。完善代码，让项目的有个稳定的地基，e.g. ts 中的 any、项目的eslint, tslint...



## 项目搭建

### Webpack

> 项目使用的是[Webpack5](https://webpack.docschina.org/guides/)

没有采用脚手架去生成项目框架，而是使用 Webpack 手动搭建，这样方便理解项目的架构以及性能优化点。搭建参考的是**create-react-app**的源码以及一些博主的改进思路，让我们开始吧！

#### Webpack本质

Webpack 看起来很复杂不容易理解，初学者看到这个就犯怵，那么多配置根本就不知道从哪里下手，如果你从Webpack的本质思考——***静态模块打包工具***，他最核心的代码就出来了，就是将我们平常写的ES6、scss、ts以及一些媒体资源文件处理一下让浏览器可以正常执行

> webpack.base.config.js

#### 入口 - entry

Webpack 需要你提供项目的入口，正如提供毛线球的线头一样，它才能开始接手你的项目

##### 单个入口简写语法

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

##### 对象语法

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

##### 常见场景

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

##### chunk 名称

1. 如果 entry 类型为 string 或者 array，只会生成一个 chunk，且名称为 main；
2. 如果 entry 类型为 object，则会生成多个 chunk，名称为 object 的key

##### 动态配置 Entry

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

#### 出口 - output

可以通过配置 `output` ，告知 webpack 如何向磁盘写入编译文件。注意，即使可以存在多个 `entry` 起点，但只能指定一个 `output` 配置。

##### 用法

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

##### 多个入口

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

##### 占位符

当通过多个入口(entry point)、代码拆分(code splitting)或各种插件(plugin)创建多个 bundle, 应该使用以下一种替换方式，来赋予每个 bundle 一个唯一的名称

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
