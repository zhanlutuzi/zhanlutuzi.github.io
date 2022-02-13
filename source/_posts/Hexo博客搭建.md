---
title: Hexo博客搭建
date: 2022-02-13 16:53:07
tags: [转载,教程,Hexo]
categories: Hexo
summary: 手把手教你搭建Hexo博客
---

# 声明

```
本文为转载，一切著作权归原作者所有！
```

来源：

> [【Hexo博客搭建】将其部署到GitHub Pages（一）：前期要做哪些准备？](https://developer.aliyun.com/article/789080?spm=a2c6h.13262185.0.0.4a81a2b8cVIurx)
>
> [【Hexo博客搭建】将其部署到GitHub Pages（二）：如何初始化并部署？](https://developer.aliyun.com/article/789233?spm=a2c6h.13262185.0.0.4a81a2b8cVIurx#slide-6)
>
> [【Hexo博客搭建】将其部署到GitHub Pages（三）：怎么写作以及更新？](https://developer.aliyun.com/article/789409?spm=a2c6h.13262185.0.0.4a81a2b8cVIurx#slide-2)
>

原作者：[百里飞洋](https://developer.aliyun.com/profile/pl66tdtmit75e?spm=a2c6h.12873639.0.0.22ca20c0Luq8GX) 

---



**简介：** 本系列文章属于半笔记半教程的零基础小白入门文，教你将 Hexo 部署到 GitHub Pages 的前期需要做哪些准备，跟着此系列文章最终可以获得自己的静态博客网站。流程很长，分成不同的篇幅，此为本系列的第一篇。

# 前言

每当在各种大佬群里划水的时候，身为菜鸡，总是很羡慕他们拥有自己的域名和博客。但由于还是学生党，买个域名或者租个云服务器其实也并不是很急迫的事情（主要我是怕买了之后不会用，在那一边闲着haha~），于是自己花了一天时间查找翻阅各种教程动手操作了一番，将 Hexo 部署到了 GitHub Pages，建立了自己的第一个（在某种意义上）真正属于自己的博客网站。本篇文章属于半笔记半教程的零基础小白入门文，教你将 Hexo 部署到了 GitHub Pages，从而获得自己的静态博客网站。

> 【注意】：本文纯属才疏尚浅的我以笔记的形式进行的记录，很多知识其实我也不是太懂，可能存在理解偏差和错误，来学习的朋友们请自己甄别，路过的大神们也别喷我哈哈哈，有什么建议和问题可以评论提出或者其它方式联系我。我会尽可能保持更新该文章所使用到的技术和做法，并随时接受勘误。

# 步骤

## 一、了解并创建GitHub账号和仓库

GitHub是一个面向开源及私有软件项目的托管平台，也是世界上最大的代码托管平台，因为只支持Git作为唯一的版本库格式进行托管，故名GitHub。GitHub中文社区,是国内领先的开源社区,是一个可以发现优质开源项目的地方。

> 由于程序员大多是男性，GitHub又被戏谑地调侃成全球最大同性交友网站"Gayhub"，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈......咳咳，说多了

### 1. 注册GitHub账号

虽然都是英文，但不必畏惧，也并不会造成使用障碍，只要记得最常用的选项含义即可，以及善用浏览器的网页翻译功能和手头的翻译软件。

> 注意：注册时的英文用户名将成为你可以使用的免费域名前缀。

注册流程非常简单，这里不再赘述。

### 2. 在 GitHub 上创建一个新的项目

单击 右上角【+】- New Repository 新建项目。（以下简称仓库）

然后填写项目信息。

仓库的名字格式应为：`你的用户名.github.io`

> 为什么必须这个作为仓库名？
>
> 因为这是GitHub Pages 服务的命名规范，同时它也将成为你的专属域名。
>
> 当然，你也可以购置自己的专属域名并用它来提供内容。

比如我的用户名是Barry-Flynn，那么我的仓库就叫：`Barry-Flynn.github.io`

(全部小写更好，有大写也没事，除了大小写切换有一丢丢麻烦外没有区别）

在description一栏填写简介，随便填填，比如我填的是：`百里飞洋的个人空间`

然后选择 Public。

最后勾选 Initialize the repository with a README。

> 此步的作用是用一个 README.md 对这个仓库进行初始化

完成后点击下面的 Create Repository。

## 二、安装 VS Code

在安装Git之前，我建议先安装 VS Code。因为安装 Git Bash 时，可以设置 VS Code 作为默认编辑器。Visual Studio Code，简称 VS Code。目前最为强大易用的编辑器，轻量且快速。~~（宇宙第一编辑器哈哈哈）~~

> 注意：它并不是我们常常听到的 VS，VS 常常指的是 Visual Studio，是一个功能强大的 IDE（集成开发环境），体积要比 VS Code 都要大上一个量级。

对于它的安装，直接搜官网下载就行了，免费的，不再赘述。

## 三、安装 Git

Git 是一个开源的分布式版本控制系统，由 Linus Torvalds（同时也是 Linux 的作者）为了管理 Linux 开发而开发。类似的工具还有：SVN。但始终更推荐 Git，因为它功能更为强大且它的背后还有更强大的生态：GitHub。

你可以直接去官网下载Git并安装，如果国内网速太慢可以“科学上网”或者从其他平台下载。MacOS 用户可以下载官网的安装包进行安装，也可以直接安装 App Store 的 Xcode（附带会安装 Git，但是比较大）。安装时一路next到底就行了，也可以在网上找教程，我不再多说。

## 四、安装 Node.js

何为Node.js ？Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。简单的说 Node.js 就是运行在服务端的 JavaScript。Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

> 对的，看到这个解释我其实也一脸懵，但不妨碍我们用它，想进一步了解的朋友们可以去官网浏览官方文档。

建议下载长期支持版，而非当前发布版，因为如果是最新版，容易出现一些奇妙的 bug。全部默认下一步进行安装。然后Windows 用户打开命令提示符，即按住键盘 Win+R，输入cmd然后回车，弹出黑色代码窗口。

> MacOS 用户打开终端。（这个不会就请百度吧，我没用过）
>
> Linux 用户右上角关闭本标签页。

后续如提到输入命令，均默认指打开终端进行输入。

输入` node --version `回车，如果得到的版本号与你方才安装的一致，那么 Node.js 就已经成功安装。

> Node.js 安装成功时也默认安装了 npm，在此后将会用到。npm 是随 Node.js 一起被安装的包管理工具，你可以理解成 Node.js 自带的应用商店。

对了，国内使用 npm 可能很慢，你可以“科学上网”，或者考虑切换为 taobao 镜像源，即手动输入以下内容后按回车（也可以Ctrl+C和Ctrl+V复制以下代码按回车）：

```
npm config set registry https://registry.npm.taobao.org
```

## 五、安装Hexo

Hexo 是一个快速、简洁而强大的博客框架，基于 Node.js，同样托管于 GitHub 之上。生态中拥有众多插件主题。你可以基于它快速生成一些静态页面。你可以使用别人的各种主题与插件，也可以自己定制开发想要的功能。

> 为什么不是…?
>
> 其他常用的博客框架还有 WordPress，Typecho，Ghost 等，但这些往往都需要购置自己的服务器，而无法静态化地部署到 GitHub Pages 上。（当然，相应的功能和灵活性也大大提升。）静态化站点还有一个优势就是访问速度往往更快。
>
> 静态网站生成器还有 Vuepress，Gatsby 等。但这些多是为了写文档而量身定制的，你也可以使用它们，但是相较 Hexo 的博客定位，它们关于博客的插件和主题以及解决办法会少得多。
>
> Hexo 提供的功能与 Hugo 几乎都有，（生成大量文件时，甚至比 Hexo 更快）不过它是基于 GO 语言。日后你想对自己的网站进行自定义，即便是 Hugo，你编写前端的交互仍旧需要使用 JavaScript，所以选择基于 JavaScript 的 Hexo 可以降低学习成本。（你若对 GO 有兴趣，仍然可以尝试使用 Hugo，但本教程将不会针对 Hugo 进行展开。）
>
> 所以对于新手来说，使用 Hexo 作为起始点，不失为一个好选择。（当然如果你有钱租服务器，并希望快速上手的话，就可以考虑考虑 WordPress 或者 Typecho）

如何安装Hexo呢?

在cmd终端窗口中输入以下命令后回车：

```
npm install hexo-cli -g
```

然后等待一会进度条走完，没报错就代表安装成功。

进度条卡住不动可能还是国内网络问题，“科学上网”哦，咳咳....

> 如果安装失败，可能是没有权限，可以尝试头部加上 sudo 重新执行，即输入：
>
> ` sudo npm install hexo-cli -g `然后回车 

上面命令中，

install 自然是安装。

hexo-cli 则是 hexo 的终端工具，可以帮助你生成一些模版文件，之后再用到。

-g 代表的是全局安装。也就是在任何地方都可以使用，否则会只能在安装的目录下使用。

## 六、初始化 *Hexo* 工程

注意：接下来应该是你自己的自定义的目录，请不要完全复制粘贴我的！

比如说我是Windows用户，想把我的网站代码储存在

电脑 E 盘的 ***BarryFlynn\Github\*** 文件夹下

那么我要先在E盘建立相应的文件夹，然后再继续操作。

由于cmd终端最开始默认在C盘操作，我得先切换到E盘，那么我要输入 ***E:***  然后回车,即：

```
Microsoft Windows [版本 10.0.19042.1165]
(c) Microsoft Corporation。保留所有权利。

C:\Users\10272>E:

E:\>
```

然后此时，我要通过 ***cd\***  进入我本地电脑打算存储网站代码的文件夹目录。（或者右键文件夹 Git Bash Here），即 ***BarryFlynn\Github\*** 文件夹里

> [cd | DOS 命令](https://baike.baidu.com/item/cd/3516393)
>
> [cd （LINUXSHELL 命令）](https://baike.baidu.com/item/cd/3516411)

 也就是说我需要输入 ***cd BarryFlynn\Github\*** 然后回车，我会看到：

```
E:\>cd BarryFlynn\Github\

E:\BarryFlynn\Github>
```

好了成功进入，接下来输入下方代码，再按回车：

```
hexo init 你的名字.github.io
```



> `hexo` ：正是因为我们之前安装了 `hexo-cli` 这一个包，所以我们可以在终端中使用 `hexo` 这一命令。
>
> `init` ：用来初始化博客的模版文件。后面跟的是你要新建的文件夹，最好和你此前新建的仓库名一致，比如我的是：***Barry-Flynn.github.io\***

然后我会看到

```
E:\BarryFlynn\Github>hexo init Barry-Flynn.github.io
INFO  Cloning hexo-starter https://github.com/hexojs/hexo-starter.git
[32mINFO [39m Install dependencies
added 242 packages from 207 contributors in 105.871s
15 packages are looking for funding
  run `npm fund` for details
INFO  Start blogging with Hexo!
E:\BarryFlynn\Github>
```



下面通过 ***cd\***  进入我的博客文件夹，

即输入 *cd Barry-Flynn.github.io* 后按回车，我会看到：

```
E:\BarryFlynn\Github>cd Barry-Flynn.github.io
E:\BarryFlynn\Github\Barry-Flynn.github.io>
```



现在我就是处于 E:\BarryFlynn\Github\Barry-Flynn.github.io 文件夹下操作了，

现在在这个文件夹内默认安装所有 `package.json` 文件中提到的包，

即输入  ***npm install***  然后回车，我会看到：

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>npm install
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
audited 243 packages in 4.956s
15 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
E:\BarryFlynn\Github\Barry-Flynn.github.io>
```



这时候，我的 Barry-Flynn.github.io 文件夹里面会多出一堆文件，

文件夹结构应该大致是这样：

```
.
├── config.yml
├── package.json
├── scaffolds
├── source
|  ├── _drafts
|  └── _posts
└── themes
```



现在我们输入  ***hexo server***  然后回车，会看到：

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>hexo server
INFO  Validating config
INFO  Start processing
INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
```



> `server` 代表开启本地的 Hexo 服务器，这时你就可以打开浏览器，在地址栏中输入 `localhost:4000` 就可以看到本地的网页了。

![Hexo主页](HexoPage.png)

这个网页就是Hexo为你自动生成的博客页面。

按  *Ctrl+C*  中断服务器的运行，

系统提示  ***终止批处理操作吗(Y/N)?***  输入 ***Y*** 然后回车。

至此，基础的模版页面便已经搭建好了。

## 七、生成静态文件

到现在，我们的工作都是在本地进行，想必你也很想放到线上与小伙伴们分享。这便轮到了 GitHub Pages 的出场，不过 GitHub Pages 只支持纯静态文件。

所以我们需要使用下面一行命令先来生成站点的静态文件。

```
（如果进行多次生成，为了避免受错误缓存影响，最好使用 hexo clean 先清除一遍。）
hexo generate
（上方命令也可以缩写为 hexo g）
```



 输入后回车，我会看到：

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>hexo g
INFO  Validating config
INFO  Start processing
INFO  Files loaded in 209 ms
INFO  Generated: archives/index.html
INFO  Generated: archives/2021/index.html
INFO  Generated: archives/2021/08/index.html
(node:20772) Warning: Accessing non-existent property 'lineno' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:20772) Warning: Accessing non-existent property 'column' of module exports inside circular dependency
(node:20772) Warning: Accessing non-existent property 'filename' of module exports inside circular dependency
(node:20772) Warning: Accessing non-existent property 'lineno' of module exports inside circular dependency
(node:20772) Warning: Accessing non-existent property 'column' of module exports inside circular dependency
(node:20772) Warning: Accessing non-existent property 'filename' of module exports inside circular dependency
INFO  Generated: index.html
INFO  Generated: fancybox/jquery.fancybox.min.css
INFO  Generated: js/script.js
INFO  Generated: 2021/08/25/hello-world/index.html
INFO  Generated: css/style.css
INFO  Generated: css/fonts/fontawesome-webfont.woff2
INFO  Generated: css/fonts/fontawesome-webfont.woff
INFO  Generated: fancybox/jquery.fancybox.min.js
INFO  Generated: css/fonts/fontawesome-webfont.ttf
INFO  Generated: css/fonts/FontAwesome.otf
INFO  Generated: css/fonts/fontawesome-webfont.eot
INFO  Generated: js/jquery-3.4.1.min.js
INFO  Generated: css/images/banner.jpg
INFO  Generated: css/fonts/fontawesome-webfont.svg
INFO  17 files generated in 1.98 s
E:\BarryFlynn\Github\Barry-Flynn.github.io>
```



此时我的文件夹目录下会出现 ***public***  这个文件夹，里面存放的就是我的站点的静态文件。

## 八、与远程仓库建立关联

接下来我们将本地的仓库与此前在 GitHub 上建立的仓库建立关联。

输入  ***git init***  初始化 Git 仓库，只需要执行一次即可，看到：

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>git init
Initialized empty Git repository in E:/BarryFlynn/Github/Barry-Flynn.github.io/.git/
```



在将其部署到 GitHub Pages 上之前，我们最好先建立一个分支。

> 什么是分支？
>
> Git 提供了版本管理功能，其中还有一个分支功能，你现在可以简单地将其理解为平行世界。

 ***你的名字.github.io*** 部署后，GitHub Pages 将默认使用你的 main分支（以前叫 master分支，一个意思，主要分支的意思）作为静态文件部署。所以我们最好新建一个 hexo 分支（命名无所谓）用来存储 Hexo 地源代码，master 分支则用来存储部署后的静态文件。为了方便，不想其他名字了，这个分支我就起名叫 hexo 吧。

新建该分支的命令语句是  ***git checkout -b hexo***  ，然后回车，可以看到：

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>git checkout -b hexo
Switched to a new branch 'hexo'
E:\BarryFlynn\Github\Barry-Flynn.github.io>
```



这时便成功建立了一个 hexo 分支。（此后的工作都将在 hexo 分支下进行）

你可以通过 **`git branch -v`** 来查看当前有哪些分支，使用 **`git checkout 分支名`** 来切换到对应的分支。

> [Git 学习笔记](https://www.yunyoujun.cn/note/git-learn-note/)

## 九、部署到 GitHub Pages

为了更方便的部署到 GitHub Pages，Hexo 提供了 `hexo-deployer-git` 插件。

老规矩，安装该插件，要输入下面命令，

```
npm install hexo-deployer-git
```



回车后可以看到

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>npm install hexo-deployer-git
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
+ hexo-deployer-git@3.0.0
added 1 package from 1 contributor and audited 244 packages in 8.166s
15 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
E:\BarryFlynn\Github\Barry-Flynn.github.io>
```



下面对  ***Barry-Flynn.github.io*** 文件夹下的  ***_config.yml***  文件进行配置。

右键  ***_config.yml***  ，打开方式选VS Code（或者直接用VS Code打开该文件），

滑到最下面，把关于

```
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:' '
```

的这段代码补充为

```
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repo: https://github.com/Barry-Flynn/Barry-Flynn.github.io #仓库地址
  branch: main # 默认使用 master 分支(Github现在改名为main分支)
  message: Update Hexo Static Content # 你可以自定义此次部署更新的说明说明
```



Ctrl+S保存，退出VS Code，部署！

终端里输入命令  ***hexo deploy***  后（或者缩写为  ***hexo d***  ）回车，我的电脑显示：

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>hexo deploy
INFO  Validating config
INFO  Deploying: git
INFO  Setting up Git deployment...
Initialized empty Git repository in E:/BarryFlynn/Github/Barry-Flynn.github.io/.deploy_git/.git/
Author identity unknown
*** Please tell me who you are.
Run
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
to set your account's default identity.
Omit --global to set the identity only in this repository.
fatal: unable to auto-detect email address (got '10272@DESKTOP-N3PNS7C.(none)')
FATAL {
  err: Error: Spawn failed
      at ChildProcess.<anonymous> (E:\BarryFlynn\Github\Barry-Flynn.github.io\node_modules\hexo-util\lib\spawn.js:51:21)      at ChildProcess.emit (events.js:400:28)
      at ChildProcess.cp.emit (E:\BarryFlynn\Github\Barry-Flynn.github.io\node_modules\cross-spawn\lib\enoent.js:34:29)
      at Process.ChildProcess._handle.onexit (internal/child_process.js:277:12) {
    code: 128
  }
} Something's wrong. Maybe you can find the solution here: %s https://hexo.io/docs/troubleshooting.html
E:\BarryFlynn\Github\Barry-Flynn.github.io>
```



是的，部署出错（FATAL）了,“ Please tell me who you are.”

原来是创建git文件夹的时候信息不完善导致的，

它提示我需要运行（Run）下面两行程序，来设置我帐户的默认标识。

  git config --global user.email "you@example.com"

  git config --global user.name "Your Name"

> 注意双引号前有空格，邮箱随便填也可以，比如QQ邮箱啥的，
>
> 我用的这个邮箱查找路径是：点击Github主页右上角头像，点击settings，点击Emails，然后就能找到Github的这个邮箱了

 那么我分别输入这两个命令按回车，可见下方代码：

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>git config --global user.email "Barry-Flynn@users.noreply.github.com"
E:\BarryFlynn\Github\Barry-Flynn.github.io>git config --global user.name "Barry Flynn"
E:\BarryFlynn\Github\Barry-Flynn.github.io>
```



再用命令  ***git config -l\***  查看所有的配置信息

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>git config -l
diff.astextplain.textconv=astextplain
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
http.sslbackend=openssl
http.sslcainfo=E:/Git/mingw64/ssl/certs/ca-bundle.crt
core.autocrlf=true
core.fscache=true
core.symlinks=false
pull.rebase=false
credential.helper=manager-core
credential.https://dev.azure.com.usehttppath=true
init.defaultbranch=master
user.email=Barry-Flynn@users.noreply.github.com
user.name=Barry Flynn
core.repositoryformatversion=0
core.filemode=false
core.bare=false
core.logallrefupdates=true
core.symlinks=false
core.ignorecase=true
E:\BarryFlynn\Github\Barry-Flynn.github.io>
```



可以看见下面这两条信息，代表信息以及完善上去了

user.email=Barry-Flynn@users.noreply.github.com

user.name=Barry Flynn

那我们接着部署吧！

终端里输入命令  ***hexo deploy***  后（或者缩写为  ***hexo d***  ）回车，我的电脑再次报错：

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>hexo deploy
INFO  Validating config
INFO  Deploying: git
INFO  Clearing .deploy_git folder...
INFO  Copying files from public folder...
INFO  Copying files from extend dirs...
warning: LF will be replaced by CRLF in 2021/08/25/hello-world/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in archives/2021/08/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in archives/2021/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in archives/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in css/fonts/fontawesome-webfont.svg.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in css/style.css.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in fancybox/jquery.fancybox.min.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in js/jquery-3.4.1.min.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in js/script.js.
The file will have its original line endings in your working directory
[master (root-commit) a9fc5f8] Update Hexo Static Content
 17 files changed, 5174 insertions(+)
 create mode 100644 2021/08/25/hello-world/index.html
 create mode 100644 archives/2021/08/index.html
 create mode 100644 archives/2021/index.html
 create mode 100644 archives/index.html
 create mode 100644 css/fonts/FontAwesome.otf
 create mode 100644 css/fonts/fontawesome-webfont.eot
 create mode 100644 css/fonts/fontawesome-webfont.svg
 create mode 100644 css/fonts/fontawesome-webfont.ttf
 create mode 100644 css/fonts/fontawesome-webfont.woff
 create mode 100644 css/fonts/fontawesome-webfont.woff2
 create mode 100644 css/images/banner.jpg
 create mode 100644 css/style.css
 create mode 100644 fancybox/jquery.fancybox.min.css
 create mode 100644 fancybox/jquery.fancybox.min.js
 create mode 100644 index.html
 create mode 100644 js/jquery-3.4.1.min.js
 create mode 100644 js/script.js
fatal: unable to access 'https://github.com/Barry-Flynn/Barry-Flynn.github.io/': OpenSSL SSL_read: Connection was reset, errno 10054
FATAL {
  err: Error: Spawn failed
      at ChildProcess.<anonymous> (E:\BarryFlynn\Github\Barry-Flynn.github.io\node_modules\hexo-util\lib\spawn.js:51:21)      at ChildProcess.emit (events.js:400:28)
      at ChildProcess.cp.emit (E:\BarryFlynn\Github\Barry-Flynn.github.io\node_modules\cross-spawn\lib\enoent.js:34:29)
      at Process.ChildProcess._handle.onexit (internal/child_process.js:277:12) {
    code: 128
  }
} Something's wrong. Maybe you can find the solution here: %s https://hexo.io/docs/troubleshooting.html
E:\BarryFlynn\Github\Barry-Flynn.github.io>
```



又报错了？我很晕。问了群里大佬，说可能是国内的墙导致的网络问题。好吧，免费的那个什么软件工具果然不太靠谱。解决该问题并重新连接后第三次输入命令  ***hexo deploy***  ，回车

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>hexo deploy
INFO  Validating config
INFO  Deploying: git
INFO  Clearing .deploy_git folder...
INFO  Copying files from public folder...
INFO  Copying files from extend dirs...
warning: LF will be replaced by CRLF in 2021/08/25/hello-world/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in archives/2021/08/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in archives/2021/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in archives/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in css/fonts/fontawesome-webfont.svg.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in css/style.css.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in fancybox/jquery.fancybox.min.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in js/jquery-3.4.1.min.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in js/script.js.
The file will have its original line endings in your working directory
On branch master
nothing to commit, working tree clean
info: please complete authentication in your browser...
Enumerating objects: 31, done.
Counting objects: 100% (31/31), done.
Delta compression using up to 4 threads
Compressing objects: 100% (25/25), done.
Writing objects: 100% (31/31), 882.21 KiB | 4.98 MiB/s, done.
Total 31 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), done.
To https://github.com/Barry-Flynn/Barry-Flynn.github.io
 + 4b62927...a9fc5f8 HEAD -> main (forced update)
Branch 'master' set up to track remote branch 'main' from 'https://github.com/Barry-Flynn/Barry-Flynn.github.io'.
[32mINFO [39m Deploy done: [35mgit[39m
E:\BarryFlynn\Github\Barry-Flynn.github.io>
```



成功了！Ohhhhhhhhhhh~

等待完成后，打开网址 `https://你的名字.github.io` 就能看到你的线上网站了！

> 使用 https，http 可能无法正常打开。HTTPS 是多了安全加密的 HTTP，Chrome 浏览器已经默认会显示 `http` 链接为不安全。
>
> 为了安全，建议开启强制 https 跳转。`项目地址页面 -> Settings -> Options -> GitHub Pages -> Enforce HTTPS`。（翻到下面）
>
> 此时，http 网址会自动重定向到 https

## 十、备份与自动部署

我们当前只是将生成的静态文件部署到了云端。

为了以防万一，我们应该将网站的源代码文件也推送到 GitHub 仓库备份。

输入下方代码按回车，与远程 Git 仓库建立连接，只此一次即可

```
git remote add origin https://github.com/你的用户名/你的名字.github.io
```



但我一开始因为手抖，没输完就按回车了，如下：

（注意，这是错误代码！没输完整）

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>git remote add origin https://github.com/Barry-Flynn
```



查了一下，我需要运行输入  ***git remote rm origin***  删除远程地址，

然后再输入一遍正确的命令与远程 Git 仓库建立连接，之后就行了：

（你们不用执行这一步哦，我是因为输错地址导致绑定错了）

```
E:\BarryFlynn\Github\Barry-Flynn.github.io>git remote rm origin
E:\BarryFlynn\Github\Barry-Flynn.github.io>git remote add origin https://github.com/Barry-Flynn/Barry-Flynn.github.io
```



接下来准备提交，这三句命令将是你以后每次备份所需要输入。

（括号内为注释，不用输入哈！）

```
（添加到缓存区）
git add -A
（这次做了什么更改，简单描述下即可）
git commit -m
（第一次提交时，你可能需先运行下面命令设置一下默认提交分支）
（git push --set-upstream origin hexo）
（推送至远程仓库）
git push
```



> 之后写文章可以在该项目下写，与之前一样，只不过这里同时管理了两个分支。
>
> master -负责展示静态网页
>
> hexo -备份本地hexo文件
>
> 
>
> master分支更新

```
hexo d
```

> hexo分支更新

```
git add . #添加所有文件到暂存区
git commit -m "新增博客文章"  #提交
git push origin hexo #推送hexo分支到Github
```

## 十一、开始写作

在上一篇文章中提到，初始化hexo博客后我们获得了它自动为我们生成的博客页面，同时还给我们生成了一个标题为“Hello World”的帖子。那么我们以后如何写新帖子发布到我们的博客网站呢？



打开“命令提示符窗口”进行操作，即之前用到的cmd窗口。



> Windows用户打开方式是按住Win+R，再输入cmd然后回车即可。



 打开后我的电脑是显示如下的：

```
Microsoft Windows [版本 10.0.19042.1165]
(c) Microsoft Corporation。保留所有权利。
C:\Users\10272>
```

和第二篇文章第六步的操作相同，



由于窗口默认是在C盘操作，我们需要进入到本地电脑之前存储网站代码的“文件夹目录”，对于我来说，由于我存储网站代码的“Barry-Flynn.github.io”文件夹是放在 E盘 的 BarryFlynn\Github\ 文件夹里的，所以我需要先进入 E盘 ，然后回车，显示如下：

```
Microsoft Windows [版本 10.0.19042.1165]
(c) Microsoft Corporation。保留所有权利。
C:\Users\10272>e:
E:\>
```

再通过cd命令进入 BarryFlynn\Github\Barry-Flynn.github.io” 文件夹：



（这一步请根据你自己之前存放的地址，不要照抄我的哈）

```
Microsoft Windows [版本 10.0.19042.1165]
(c) Microsoft Corporation。保留所有权利。
C:\Users\10272>e:
E:\>cd barryflynn\github\barry-flynn.github.io
E:\BarryFlynn\Github\Barry-Flynn.github.io>
```

（题外话：我通过上面这行命令亲自实践发现，虽然我的文件夹的命名同时包含大小写，但我全输入小写也是可以进入的）



好了，现在可以开始通过命令开始第一次写作了。



### 1.创建新帖子

输入以下命令，并回车：



（注意双引号是英文输入法下的！双引号内文字即为你要新建的文章帖子的标题）

```
hexo new "我的第一篇博客文章"
```

 （或缩写成：hexo n "我的第一篇博客文章"）



回车后不一会儿，它提示我 Barry-Flynn.github.io\source\_posts\我的第一篇博客文章.md 文件已经建好了。你会发现该文件后缀名是“.md”，没错，hexo默认我们用Markdown 格式书写文章。



> Hexo 支持以任何格式书写文章，只要安装了相应的渲染插件。
>
> 
>
> 例如，Hexo 默认安装了 hexo-renderer-marked 和 hexo-renderer-ejs，因此你不仅可以用 Markdown 写作，你还可以用 EJS 写作。如果你安装了 hexo-renderer-pug，你甚至可以用 Pug 模板语言书写文章。
>
> 
>
> 只需要将文章的扩展名从 md 改成 ejs，Hexo 就会使用 hexo-renderer-ejs 渲染这个文件，其他格式同理。



现在，我之前让大家下载的VSCode编辑器这时候就派上用场了，当然，如果你对Markdown非常熟悉也有自己用的顺手的编辑器的话，当然可以根据你自己的习惯使用别的编辑器进行写作，但本文章仅使用VSCode进行演示。



### 2.编写文章内容

双击打开VSCode，



点击左上角“文件”，点击“选择文件”，



找到刚刚新建的“我的第一篇博客文章.md ” 并打开，



现在可以开始你的创作之旅了。



> 如果不会用Markdown语法书写文章的话可以在其他地方学习一下，
>
> 或进入官网进行学习：
>
> Markdown 中文文档 https://markdown-zh.readthedocs.io/en/latest/



这里插个话：理论上，vscode 在没有安装任何插件的情况下是可以直接编写markdown文档的，书写过程中点击vscode右上角的其中一个小按钮可以在右侧实时预览效果。

![vscode预览](vscode.png)

但是为了能够得到一些更加丰富的功能和有好多体验，可以通过增添新的插件对其功能进行完善。

> 比如 Markdown Preview Enhanced 就是一个很好用的完善预览功能的插件，可以更加形象的展示所编写的pdf格式的文档样式。在插件库中搜索markdown即可找到该插件，然后点击安装后重新加载。下面是 Markdown Preview Enhanced 的官方网站：
>
> 
>
> https://shd101wyy.github.io/markdown-preview-enhanced/#/



 写完后Ctrl+S保存你的文章（或点击vscode左上角“文件”，然后“保存”），关闭vscode。



## 十二、更新main分支

### 1.清除缓存（可跳过）

```
hexo clean
```

此命令用于清除缓存文件 (db.json) 和已生成的静态文件 (public)。



在某些情况（尤其是更换主题后），如果发现你对站点的更改无论如何也不生效，可能需要运行该命令。如果进行了多次生成，为了避免受错误缓存影响，最好使用 hexo clean 先清除一遍。也就是说，网站显示异常时可以执行这条命令试试。



### 2.生成静态文件

输入以下命令，并回车：

```
hexo generate
```

（或缩写成：hexo g ）



此命令使刚刚完成写作的文章生成网站静态文件到默认设置的 public 文件夹。



### 3.启动本地服务器（可跳过）

此步骤用于发布前的本地预览

```
hexo server
```

（或缩写成：hexo s ） 



默认情况下，访问网址为： http://localhost:4000/



浏览器输入该网址就能看本地生成的博客了，但也仅仅在本地，GitHub上没有。



在cmd窗口按  Ctrl+C  中断服务器的运行，



系统提示  终止批处理操作吗(Y/N)?  输入 Y 然后回车。



### 4.一键部署

输入以下命令，并回车：

```
hexo deploy
```

（或缩写成：hexo d ）



此命令使刚刚完成写作的文章自动生成网站静态文件，并部署到设定的仓库。



Hexo 提供了快速方便的一键部署功能，只需一条命令就能将网站部署到服务器上。在开始之前，必须先在 _config.yml 中修改参数，一个正确的部署配置中至少要有 type 参数。在我这个系列文章的第二篇第九步，我已经带大家修改过了，跟我一路走下来的朋友们不用管了，还没设置过 _config.yml 参数的新来的朋友麻烦去看一下本系列我的上篇文章哈。



只需等待一会，就可以打开你的博客地址看到新文章发布成功啦。

> 这一切是如何发生的？
>
> 
>
> 当执行 hexo deploy 时，Hexo 会将 public 目录中的文件和目录推送至 _config.yml 中指定的远端仓库和分支中，并且完全覆盖该分支下的已有内容。



## 十三、更新备份hexo分支

根据我上一篇文章中对 _config.yml 文件参数的修改，上边这个部署的命令默认是对我GitHub上的主分支（也可以叫main或者master分支）进行部署更新，上篇文章说过了，我同时管理了两个分支，分别存放不同内容：

> main -负责展示静态网页
>
> hexo -备份本地hexo文件



分别运行下面三行命令，进行hexo分支更新（后面括号内为注释，无需输入）

```
git add -A （此命令用来添加所有文件到暂存区）
git commit -m "新增博客文章"  （此命令用来提交，双引号内可自定义内容，双引号前有空格）
git push origin hexo （此命令用来推送hexo分支到Github）
```

第一行命令其实有三种写法：（注意第三种写法后面有个点）



> git add -A  
>
> 提交所有变化（就是git add --all的缩写）
>
> 
>
> git add -u  
>
> 提交被修改 (modified) 和被删除 (deleted) 的文件，不包括新文件 (new)
>
> 
>
> git add .  
>
> 提交新文件 (new) 和被修改 (modified) 文件，不包括被删除 (deleted) 文件



>  git add . ：他会监控工作区的状态树，使用它会把工作时的所有变化提交到暂存区，包括文件内容修改(modified)以及新文件(new)，但不包括被删除的文件。
>
> 
>
> git add -u ：他仅监控已经被add的文件（即tracked file），他会将被修改的文件提交到暂存区。add -u 不会提交新文件（untracked file）。（git add --update的缩写）
>
> 
>
> git add -A ：是上面两个功能的合集（git add --all的缩写）
>
> ————————————————
>
> 此注释摘自：https://blog.csdn.net/caseywei/article/details/90945295



第二行的“-m”应该是“message”的缩写，双引号内是自定义提交信息



> 在上一篇文章中我们对 _config.yml  的message参数设置的就是这个，你可以自定义此次部署更新的说明，比如：“x年x月x日的备份”、“第x次备份”等等都可以



关于第二行命令提交时的自定义信息，具体的用处看下图，其实相当于是个注释。

![Github注释](message.png)

三步全部执行完后打开GitHub相应库的hexo分支里就可以看到跟刚才不一样的地方了

![提交自定义信息后的GitHub.png](push.png)

意味着hexo源文件更新成功，推送到了 GitHub 仓库进行了备份。

# 总结

每次更新博客时都可以走以下三个大步



### 一、写作部分

1、打开cmd进入存放博客代码文件夹

2、创建文章：

```
hexo n "文章标题"
```

3、使用vscode打开新建的.md文件编写内容

### 二、对main分支进行部署更新：

```
hexo clean （清理缓存，可选用）
hexo g （生成资源文件）
hexo d （部署到服务器）
```

### 三、对hexo分支进行部署更新：

```
git add -A （添加所有文件到暂存区）
git commit -m "自定义信息" （提交此次更新的信息）
git push origin hexo （推送hexo分支到Github）
```

### 四、打开你的博客网址查看显示效果
