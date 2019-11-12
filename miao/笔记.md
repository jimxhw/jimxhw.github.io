# 常用软件及开发工具使用说明

## 版本控制系统（git）

### 上传远程

  * gitbash 操作流程及 browser 开发同步知识
    * git init（创建 git）——git remote add origin URL（关联仓库）——git remote -v（检查当前关联的网址）——git pull origin master（将远程文件拉到本地）——git add（把文件修改添加到暂存区）——git commit（把暂存区的所有内容提交到当前分支）——git log（检查当前修改版本）——git push -u origin master（上传到远程）
    * 返回上一版本 git reset --hard HEAD^ ，HEAD 指向的版本就是当前版本，因此，Git 允许我们在版本的历史之间穿梭，使用命令 git reset --hard commit_id。穿梭前，用 git log 可以查看提交历史，以便确定要回退到哪个版本。要重返未来，用 git reflog 查看命令历史，以便确定要回到未来的哪个版本
    * 合并如果是完全覆盖就会共用一个节点，这个叫快进
    * 不要在远程上作合并，先把远程内容 git pull 下来

  * 常用 git 命令
    *  直接命名 git commit -m ""
    *  查看分支：git branch
    *  创建分支：git branch <name>
    *  切换分支：git checkout <name>
    *  关联仓库 git remote add origin URL
    *  修改远程地址 git remote set-url origin URL
    *  创建 + 切换分支：git checkout -b <name>
    *  合并某分支到当前分支：git merge <name>
    *  删除分支：git branch -d <name>
    *  分支合并图：git log --graph
    *  普通模式合并，合并后的历史有分支：git merge --no-ff <name>
    *  合并冲突 git 会在本地修改文件里面给出提示，手动选择修改文件， 然后 Git add ，Git cm, 再删除另外一个分支，git branch -d <name>。冲突只会处理一遍，git 后续知道正确的代码
    *  挑选提交某次命令到本分支  git cherry-pick commitid
    *  git rebase <name> 将某分支从交点移开，整个分支变基，变到本分支的某个节点上，是合并的一种方式；如果和本分支完全不一样就直接接到本分支最后
    *  .gitignore 提交时 git 忽略的文件可以填在这个里面

  * sourcetree  git 可视化工具

  * browse 同步
    * npm install -g browser-sync 安装
    * browser-sync start --server --directory -f "*.html" 安装同步 html
    * browser-sync start --server --directory -f "*.html,*.js"  安装同步 HTML 和 js
    * browser-sync start --server --directory --file "*"  安装同步当前文件夹内容
    * browser-sync start --server --directory --file "/*"  安装同步文件夹子文件夹

## 开启本地服务器（http 网络服务）

  * npm install http-server -g  通过 npm 安装
  * http-server   使用命令

## 其他常用命令

  * 命令行基础
    * prompt 命令 提示符
    * 工作目录，Current Directory
      * pwd 可以显示当前工作目录
    * 将命令的输出到文件
        * echo abc > foo.txt（可输出编辑内容到文件）
    * 将命令的追加到文件
        * echo def >> foo.txt
    * pipe 前一个命令的输出 (Output) 做为后一个命令的输入 (Input)
        * 管道符
        * IO  xxx.io  Google I/O 大会
        * input output
        * pm2 | grep "to" | lolcat    vertical bar
    * 命令行里按 tab
      * 自动补全
    * ctrl+C  换行

  * 常用命令
      * ls     list （不打开以。开头的文件，使用 ls -a 可以显示）
      * ls -lah（显示所有文件详细内容）
      * cat,   con cate nate（查看文件内容，可一次查看多个）
      * echo （后面跟提示文字，用于脚本执行前的提示）
      * echo 文字》a.text     将文字输入到 a.text
      * cd   change directory
        * cd 相对路径（相对于当前工作目录）
          * ../ 表示当前文件夹的父文件夹 （中合路径中的上一个文件夹）anv/.. =0
          * ./ 表示当前文件夹，可忽略
        * cd 绝对路径，, 以 / 开头； （cd - 上一个文件夹）
        * 补充：
          * 路径
          * 相对路径  以 / 开头
          * 绝对路径  以 // 开头
      * sudo /super user do  超级管理员
      * mkdir 创建文件夹（目录）thedir // make directory/folder/path
      * rmdir 删除文件夹 只能删除空的 remove directory
      * rm 删除文件
      * rm -r thedir 删除 thedir 及其内容 ，递归删除
      * ifconfig 命令用来查看和配置网络设备。当网络环境发生改变时可通过此命令对网络进行相应的配置。Network interface configuration
      * cp a.txt b.txt 复制
      * mv old new 移动（相当于剪切）
      * touch a.txt 创建（空）文件
      * time command 计算某命令的运行时间
      * date 显示时间和日期
      * cal 显示日历
      * //scp
      * //ping ip 测试与目标 ip 的连通性 （ping baidu.com)
        * sudo mkdir dir
        * gitlab 删库事件
      * tldr  too long didn't read   查看各种工具的简略说明书
      * chmod 644  xxx.text  修改某个文件的权限  数字每个位改为二进制，对应 rwx, 读 写 执行，每一位数代表不同的操作者
      * foo | bar | baz  foo 命令的输出作为 bar 命令的输入，bar 命令的输出作为 baz 命令的输入
      * nc  netcat 可以在两台设备上面相互交互，即侦听模式 / 传输模式 ;https://www.jianshu.com/p/cb26a0f6c622
         nc www.baidu.com 80
         GET / HTTP/1.1   通过 nc 发送网络请求
      * winpty + 命令   bash 无法正常使用 winmdows 命令时使用\
      * curl url  对这个路径发出网络请求，开发工具

### vi 编辑器

  * 基础使用
  * 达到可以在 vps 上编辑文本文件即可
  * esc 从编辑模式返回常规模式
  * i 常规模式下进入编辑模式
  * :wq 常规模式下输入

## vscode 的常用快捷键

* 注释快捷键
  *  单行注释：[ctrl+k,ctrl+c] 或 ctrl+/
  *  取消单行注释：[ctrl+k,ctrl+u] （按下 ctrl 不放，再按 k + u)
  *  多行注释：[alt+shift+A]
  *  多行注释：/**
* 其他快捷键
  * Ctrl shift L 选中所有光亮区域
  * 移动行：alt+up/down
  * 代码格式化：shift + alt +f
  * HOME 调转到行头
  * end  调转到行尾
  * 显示 / 隐藏左侧目录栏 ctrl + b
  * 复制当前行：shift + alt +up/down
  * 删除当前行：shift + ctrl + k
  * 行增加缩进：ctrl + [
  * 行减少缩进：ctrl + ]
  * 删除行 ： ctrl + shift + d
  * 折叠代码： ctrl + k + 0-9 (0 是完全折叠）
  * 展开代码： ctrl + k + j （完全展开代码）
  * 快速回到顶部 ： ctrl + home
  * 快速回到底部 : ctrl + end
  * 回到撤销之前：Ctrl +Y
  * 控制台终端显示与隐藏：ctrl + ~
  * 查找文件 / 安装 vs code 插件地址：ctrl + p
  * 新建一个窗口 : ctrl + shift + n
  * 字体放大 / 缩小：ctrl + ( + 或 - )
  * 裁剪尾随空格（去掉一行的末尾那些没用的空格） : ctrl + shift + x
  * 拆分编辑器 : ctrl + 1/2/3
  * 切换窗口 : ctrl + shift + left/right
  * 关闭编辑器窗口 : ctrl + w
  * 关闭所有窗口 : ctrl + k + w
  * 切换全屏 : F11
  * 自动换行 : alt + z
  * 显示 git : ctrl + shift + g
  * 全局查找文件：ctrl + shift + f
  * 显示相关插件的命令（如：git log)：ctrl + shift + p
  * 选中文字：shift + left / right / up / down
  * 快速切换主题：ctrl + k / ctrl + t
  * 格式化选定代码 ：ctrl + k / ctrl +f

# HTML 补充知识

## name and id

   * name 只有一些标签可以使用，可重复。可配合 target 使用，使新网页的地址为 name 的父标签（eg <iframe name="sfds"> <a target="sfds">
   * ID 每一个标签都可以，不可重复。重复只调用前面的 ID
   * class 可以重复，而且只可以为多个，表示属于多个类 (class ="asdf  sfsdf  fsfsa")
   * 无 `doctype` 声明的页面元素的盒子模型是 border box

## 常见属性配合

   * <label for="iso"> <input  id="iso">
   * <a target="xm">  <iframe name="xm" >
   * <form action="https://www.google.com/search" target="_blank" method="get">
     <input type="text" name="q" >  <!-- 谷歌的默认name为q -->
     <input type="submit">

     <!-- 其他页面引入 Google 搜索 -->

   * <a href="#whoami">跳转本页的底部</a> <input id="whoami">  <!-- 指定跳转位置 -->
   * <img usemap="#somemap">
    <map name="somemap">
    <area shape="rect" coords="25,25,75,75" href="www.xiaomi.com">
   </map>


## SVG 可缩放矢量图（Scalable Vector Graphics）

  * SVG 是一种基于XML语法的图像格式。其他图像格式都是基于像素处理的，SVG 则是属于对图像的形状描述，所以它本质上是文本文件，体积较小，且不管放大多少倍都不会失真。
  * SVG 文件可以直接插入网页，成为 DOM 的一部分，然后用 JavaScript 和 CSS 进行操作。
    SVG 文件还可以转为 BASE64 编码，然后作为 Data URI 写入网页。

## canvas

  * HTML5 <canvas> 元素用于图形的绘制，<canvas> 标签只是图形容器，通过 JavaScript 来完成绘制；该元素有多种 API 接口，可以绘制路径，盒、圆、字符以及添加图像等。
  * 对像素pixel进行操作， PNG格式1个像素为3或4个字节（rgba）
  * 拿到canvas元素
    ctx = canvas.getContext('2d') 创建2d画布框架实例，
    ctx.fillStyle = 'red' 设置填充色
    ctx.fillRect(20,30,1,1) 从（20，30）坐标开始画一个宽1高1的实心矩形，填充色为红色；左上角为原点
    ctx.drawImage(image, dx, dy);将图片绘制到canvas元素上，dx和dy表示到左上角的偏移量
    ctx.getImageData(20,30,1,1).data=>[255,0,0,255] 取（20，30）坐标开始画一个宽1高1的矩形颜色，用类数组表示颜色，表示RGBA,也可以取多个颜色；数组每4项表示一个像素颜色
    canvas.toDataURL()拿到canvas图片对应的地址，点击地址可以直接看到图片

## 其他小知识

   * 给 html 元素设置宽高百分比，是相对于视口而言的。如 900*1080 的视口，height:100% 时高度就是 1080，视口大小改变，html 宽高随之改变
   * body 是一个特殊的元素，不能通过 overflow：hidden 达到 BFC 效果。
   * html 或 body 如果设置了背景颜色，那么这个颜色会覆盖整个窗口（无论设置的 html 或 body 元素的区域有多大），区域外的颜色优先和 html 的一致，如果 html 没有设置背景颜色，则区域外的颜色和 body 一致
   * <template> 模板元素  浏览器会加载其内容但不会显示，我们可以读取其 innerHtml 和 content 属性，也能配合框架使用
   * document-fragment 文档片段  可以包括多个元素
   * web-component 组件 ，可以自定义标签。现代框架都有类似功能

# CSS 知识汇总

## CSS 编写规范

   * CSS 外部文件修改完后在}后面加回车键，方便后期 git diff 查看准确的修改提示（Windows 换行符 CRLF ，Linux 换行符 LF）
     *换行在开发中本身就是一个字符，CSS 代码写完之后不加换行符，在下面的新代码开头写换行符时，相当于在 CSS 代码后面直接加换行符，这样在开发 git diff 检查代码时会给开发人员造成困扰。
   *  CSS 中，  ，号前后的选择器没有任何联系。div>a , p{}    div的子元素和 p 标签，而不是 div 后代中的 (p 和 a),CSS 中不能有改变优先级的（）。
   *  CSS 属性选择器中， 冒号描述的是紧挨着其前面元素，如果前面紧挨着空格，则描述的是某元素的后代。如果前面紧挨着 class 或者 ID，先选择元素再在元素中寻找对应的类或者 ID。
      *  div .bat.adf:first-of-type   先寻找 div 后代中的 first-of-type ，再在筛选出的标签中寻找符合.bat.adf 的类标签
   * :nth-child() 和 :nth-of-type() 的差别
     - span:nth-child(n)  父元素的第 n 个子元素且标签名为 span 
     - span:nth-of-type(n)  父元素的所有 span 子元素中的第 n 个 span
     - 共同点—前面不要紧挨着类选择器：如果其前面紧挨着的是类选择器 (.abc:nth-of-type(2)), 他不会去找拥有这个类名的元素的第二个，而是先去找这个类对应的元素，找到之后忽略类名的限制，再去选择第二个该元素；

   * a 标签的伪类最好顺序  link visited focus hover active  , 为了 a 标签的每一种状态都有交互效果（这几个优先级一样，但是浏览器会先执行后面的伪类）
   * 属性类选择器【属性 = 值】
     :not  选择器取反    not 紧后面不写层级选择器的空格和其他表示层级的符号
     $=   结尾 =
     ^=   开头 =
     *=   任何位置 =
     ~=   完整单词 =
     [lang|= "en"] 等同于 [lang="en"]+[lang="en-"]  ，表示以 en 开头或者以 en- 开头
   * CSS 选择器只能由前面的元素现在后面的元素，不能反过来。

## 层级选择器

   *    . 表示类选择权
   *     #号表示 ID 选择器
   *    .foo.bar  值为 foo 且为 bar 的类 (class="foo bar")
   *    .foo .bar 空格表示后代选择器
   *    div > p     >号表示子元素选择器
   *    div + p + p  邻接选择器，只选择 1 个紧邻着的兄弟标签
   *    div ~ p      div 后面的所有兄弟 p 标签

## 选择器的优先级

  *  第一：!important（优先级最高）
      第二：（内联样式，   #，     类选择器 / 属性选择器 / 伪类选择器，元素选择器（标签选择器）/ 伪元素选择器）
      第三：继承（即使是继承下来的！important 也是没有优先权的）
  * 优先级的定义，四个数
      * (0，4，4，29)
      * (0, 6, 1, 0)
  * id 选择器    #foo #bar #baz {}
      * 0，1，0，0
  * 类选择器，属性选择器，伪类选择器
      * 0，0，1，0
  * 元素选择器（标签选择器），伪元素选择器
      * 0，0，0，1
  * 连接符如 > + ~ 等不参与优先级的计算
      * 于是 p a 与 p > a 的优先级是一样的
  * 通配符 *
      * 优先级为 0，0，0，0
      * 所以以下选择器的优先级是一样的
          * div p      div 的所有后代的 p 元素
          * div * p      div 的孙子及其后代的 p 元素
  * 内联样式 / 行内样式 / 行间样式 /inline style
      * 1，0，0，0
      * <p style="color: green;">
  * ！important
      * p {color: red !important;}
      * 有与 important 冲突的属性，important 都会占上风
  * 继承
      * 没有优先级，比【*】的优先级还要小

* 层叠样式
            双方选择器优先级排序一样时，看 important 的来源
      * 第一：最终用户 important 样式
      * 第二：网站作者 important 样式 authored style

            双方选择器优先级排序一样时，没有 important 时，看样式来源
      * 第三：作者普通样式
      * 第四：用户普通样式 Custom.css

      * 第五 默认样式，浏览器内置样式，User Agent Style（最低）

       * 浏览器 HTML 默认 body 大小为 16px
* 调整优先级的小技巧（重复就完事了）
  -     #AA 可以写作#AA#AA#AA  (0,1,0,0) 变为 (0,3,0,0)
  -    .AA 可以写作。AA.AA.AA  (0,0,1,0) 变为 (0,0,3,0)
  -    .a:hover 可以写作。a:hover:hover:hover   (0,0,2,0) 变为 (0,0,4,0)

## 盒子模型

  * 左边界 + 左边框 + 左填充 +content box+ 右填充 + 右边框 + 右边界 = 父元素内容区宽度
    上边界 + 上边框 + 上填充 +content box+ 下填充 + 下边框 + 下边界 = 父元素内容区高度
  * content box（文本盒子，没有文本时其尺寸为 0）--padding box--border box（可见区域）----margin box（不可见，不可交互）
  *  width 的默认值为 auto，margin 和 padding 一般默认为 0；
     标题，列表，表格等元素一般有默认的 margin 或者 padding
  * background-color 说的是 border box 的背景颜色
  * background-image 默认从 padding box 的左上方开始平铺背景图片
  * outline 属性，位于 border 外围，紧贴着外边框，可起到突出元素的作用，不影响网页布局。
  * padding/border 的值不能为负值，margin 可以为负值
  * width/height 默认设置的是 content box 的宽度
    * box-sizing：border box/content box , 默认值为 content box，声明宽高是哪部分盒子的尺寸（目前只有 2 种盒子可选）
  * 边框的其它样式设置了但是颜色没有设置，这时边框颜色默认为元素内容的前景色（即字体颜色颜色，不是背景色）
  * 包含块：一个元素的包含块是离该元素最近的块级祖先的 content  box
    * 初始包含块： viewport(html 的包含块）
  * 正常流： Normal Flow，从左往右，由上往下
  * 一个块元素没有内容时，默认 margin padding border content 都为 0
  * 如果 border-left 足够粗，是一个梯形，内容区为 0 时变成了一个三角形。
  * 在 CSS 中，两个或多个毗邻（父子元素或兄弟元素）的普通流中的块元素垂直方向上的 margin 会发生叠加。这种方式形成的外边距即可称为外边距叠加 (collapsed margin)。
    两个盒子相邻，两个正 margin 重合，取其中最大的 margin 为合并后共用的 margin.
    两个盒子相邻，两个负 margin 重合，取其中绝对值最大的 margin 为合并后共用的 margin.
    两个盒子相邻，两个正负 margin 重合，取正负相加的值为合并后共用的 margin.
    创建 BFC 和通过对父元素建立 border，padding，或者间隔可以使外边距不合并；
    水平方向 margin 不会合并，左右 margin  会紧挨着排列；

## 正常流块元素水平布局（margin-right/left，width）

  *  没有 auto
      过分受限，重置 margin-right 为 auto（做右往左的语言会把 margin-left 设置为 auto，比如说阿拉伯语言）
  *  一个 auto
      算出它
  * 两个 auto
      两个 margin 为 auto，计算为相同的值，水平居中的方法
      其中有一个 auto 给到了 width，margin 的 auto 为 0
  *  三个 auto
      两个 margin 都重置为 0
  *  margin-left 为 auto 时无法计算出负值（对于从左往右的语言）
  *  max-width 最大宽度
      min-width  最小宽度
      搭配 width 为 auto 时使用
  * 替代元素中的块元素的 width 由块元素自身决定，默认值不为 auto.（比如 img，引入的图片默认宽度由图片自身决定，高度成比例变化）

## 正常流块元素垂直布局（margin-bottom/top，height）

  * 包含块的高度默认 auto，由其宽度和子元素的高度等等填充起来
  * 垂直方向 margin-bottom/top 都为 auto 时，不会垂直居中，而是 auto 都为 0
  * margin 和 padding 的百分比是基于包含块文本框（content box）的宽度，上下左右都是如此；可以利用 padding 的这一个特性来实现宽高定比例；
  * 当包含块的高度不确定时，且其高度是由其内容区撑大时，margin 和 padding 的高度不能写成百分比；逻辑错误
  * 当包含块的高度确定时，或者其高度不由内容区撑大（如定位），可以使用百分比
  * 当一个包含块里面都是块元素时，包含块没有设置 border 和 padding 时，包含块的高度就是里面最上面块元素上边框到最下面下边框的距离；

## BFC/ 块格式化上下文（Block Formatting Context，BFC）

  * 具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素。
  * 在常规流和 float 里面有效，不能包着脱离常规流的定位元素
  * 常规流块元素没有边框和内边距时，包裹着子元素的 border-box，父子元素的 margin 会合并                         
  * 触发了 BFC 的元素，无论如何都会包裹着其子元素的 margin-box，父子元素的 margin 也不会合并
  * 下列方式会触发 BFC：
    浮动元素（元素的 float 不是 none）
    绝对定位元素（元素的 position 为 absolute 或 fixed）
    行内块元素（元素的 display 为 inline-block）
    弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
    表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值）
    display 值为 flow-root 的元素
    overflow 值不为 visible 的块元素
    表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
    匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
    contain 值为 layout、content 或 strict 的元素
    网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
    多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
    column-span 为 all 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

## 定位 position

   * 默认值 static，表示常规流。
   * 定位指的是 margin box 定位到对象的 padding box
   * 固定定位 fixed
      相对于视口固定 ，不随滚动条滚动，脱离常规流
   * 相对定位 relative
      相对定位的元素是在文档中的正常位置偏移给定的值，但是不影响其他元素的偏移。相对自己定位，原来的位置保留在常规流
   *  绝对定位  absolute
      相对于最近的定位祖先定位，如果祖先没有定位，相对于第一屏（滚动条在最上方时的可视窗口）定位，脱离常规流
   *  粘性定位 sticky
      粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定值前为相对定位，之后为固定定位。在 viewport 视口滚动到元素 top 距离小于 10px 之前，元素为相对定位。之后，元素将固定在与顶部距离 10px 的位置，直到 viewport 视口回滚到阈值以下；当其包含块的文档区脱离视口时，它会被包含块带走。元素在常规流的位置保留
   * 层叠覆盖关系
     * 定位流盖住常规流
     * 后出现的定位流元素盖住前面定位流元素。所有定位脱离常规流的元素都在一个层面，在同一个位置上，后出现的元素会盖住前面的元素，需要设置 z-index 改变叠层
     * z-index  必须配合定位使用
       * 调节层叠覆盖关系，常规流默认值为 0
       * z-index: 值；   值大的盖住值小的，可以有负值，都为整数。
    * 常用布局
      * 元素明显重叠时，可用定位实现
    * 元素的方位
      top left right bottom
      当不明确指定时，元素的从它在常规流中开始的位置开始。
      4 个方位的值表明的是离其定位对象四周的距离
      取百分比时，百分比相对于包含块（或定位祖先）的 padding-box 的对应尺寸

## 行内布局

  * 基本术语和概念
    * 匿名文本：直接包在块元素的文本，继承父元素的 line height 高度数值
    * em 框：也叫字号框，font-size 决定其高度
    * 内容区：多个字号框拼接在一起组成了内容区（content area)，内容区被该元素的 border 包围，和 border box 类似
    * line height 框：假想概念，高度为行高，内容区和其共用一条居中线。
        * 包含块行高等于其高度，其内部文本和 inline 元素垂直居中；
        * 当 line-height 的值为数字或者百分比时，表示用字体的大小乘以数字或者百分比
    * 行间距：line-height  -   font——size
    * 行内框：对于非替换元素，行内框就是 line height 框；
              对于替换元素 /inline-block，行内框就是 marginbox，
    * 行框：用最小的框将每一行所有的行内框包裹起来，这种框就是行框；上下行框紧紧挨着形成布局，如果父元素是块元素，行框撑起了父元素的高度；
            行框和 line-height 和 vertical-align 有关。
    * margin border padding 不会影响垂直方向的布局

  * 空格的大小和字体一致，字体为 0 时没有空格。

  * 模型：
    行内框在一行以内水平排列，空间不够后就折行
    一行的所有行内框形成行框
    行内框可以通过 vertical-align 做垂直微调
  * 一个行内元素跨行会生成多个盒子
  * 匿名文本
    所在属块元素的 line-height 框
  * display: inline
    行内框也是仅通过 line-height 框确定
    所有额外的 padding，border 不影响行内框的生成
    对 inline 元素设置宽高无效
    当 inline 元素无 padding 及 border 时，其底色区域的高度为当前字体 line-height 为 normal 时的计算值，与实际设置的 line-height 无关。
  * display: inline-block/table
    inline-block 元素内部没有文字或者触发 BFC 时，行内框为 margin-box 的外边缘；
    inline-block 元素内部有文字时，通过文字来调整对齐；
    基线为最后一行文字的基线 / 无内容时以 margin-box 下边缘为准
    考虑其自身位置 / 摆放时，当成图片考虑
    考虑其内容的布局时，当成块 / 表
  * 只要行框形成，就要考虑那一行有一个匿名文本
  * 对于替换元素（图片）
    设置 display：inline 无效，会当成 inline-block；

  * vertical-align ：指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。
    baseline（默认值）
    使元素的基线与父元素的基线对齐。HTML 规范没有详细说明部分可替换元素的基线，如<textarea> ，这意味着这些元素使用此值的表现因浏览器而异。
     * 当元素设置为 inline-block 时，并且其 overflow 的值不为 visible，此时 baseline 对准的是其 margin-box 边缘
    middle
    使元素的中部与父元素的基线加上父元素 x-height（译注：x 高度）的一半对齐。
    *而当字体大小为 0 时，基线的位置就等于中线的位置，设置垂直居中时可以用到
    top
    使元素行内框的顶端与行框的顶端对齐。
    bottom
    使元素行内框的底端与行框的底端对齐。
    text-top
    使元素的顶部与父元素的字体在 lineheight=normal 时的顶部对齐。
    text-bottom
    使元素的底部与父元素的字体在 lineheight=normal 时底部对齐。
    sub
    使元素的基线与父元素的下标基线对齐。
    super
    使元素的基线与父元素的上标基线对齐。
    percentage
    使元素的基线对齐到父元素的基线之上的给定百分比，该百分比是 line-height 属性的百分比。可以是负数。
    <length>
    使元素的基线对齐到父元素的基线之上的给定长度。可以是负数。

## 表格

   *  table    =  display:table
      tr       =  display:table-row
      thead    =  display:table-header-group
      tbody    =  display:table-row-group
      tfoot    =  display:table-footer-group
      col      =  display:table-column
      colgroup =  display:table-column-group
      td,th    =  display:table-cell
      caption  =  display:table-caption
   *  col/colgroup 的可用样式只有 border,background,width,visibility

   * 表层 table--colgroup--col--tbody--tr--td，由小到大
   * border-collapse:collapse  边框合并，默认为 separate，不合并；  合并之前只有 table 和 td 可以设置边框，合并后 tr tbody col colgroup 都可以设置边框，但是在同一个位置的边框都会合并。
     合并规则：1 值为 hidden 优先级最高，值为 none 优先级最低。
              2 优先级顺序（宽度：谁宽谁优先，   样式：double--solid--dashed--dotted，     颜色来源：和表层一致，         位置：左上方大于右下）
   * table-layout：fixed； 设置表格宽度需要这个属性  ,table 没有这个属性时其宽度可以被 td 撑开，设置 fixed 后宽高会固定
     表格和列的宽度通过表格的宽度来设置，某一列的宽度仅由该列首行的单元格决定。在当前列中，该单元格所在行之后的行并不会影响整个列宽，设置 fixed 后就可以了；任何一个包含溢出内容的单元格可以使用 overflow  属性控制是否允许内容溢出
   * 为 td 设置 text-align 为 center,vertical-align: middle 可以水平垂直居中
     td 里面的内容默认是垂直居中的，可以省略 vertical-align: middle
   * 单元格的宽高都会默认内部文本不会超出；例如为左右两个 cell 设置 width 分别为 1% 和 100%；，左边的 cell 会尽量小，右边 cell 尽量宽，但是会忽略其比例，因为要保证其内部文本不超出。    若左右两个 cell 设置 width 分别为 40% 和 60%，而且空间足够包裹文字，则两边 cell 的比例就为 4:6；
   * empty-cells：设置空单元格是否隐藏
   * caption-side:top/bottom 属性会将表格的标题<caption> 放到规定的位置

## 浮动

  * 浮动元素的布局盒子也是 margin box，是在包含块中浮动；浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止
  * 块级元素无法感知浮动元素，行内元素可以感知到并且避开布局盒子。处于半常规流，和 fixed 和 absolute 一起用时不生效，和 relative 一起用时先浮动再相对定位。
  * 浮动元素下移之后就不会再上移了，可以左移或者右移，
  * 触发 BFC 浮动元素不会超出其包含块。触发 BFC 的块元素周围有浮动元素时，为了避开浮动元素 BFC 元素会变窄
  * 在常规流中，行内元素盖住浮动元素，浮动元素盖住块级元素

  * 浮动元素规则
    - 浮动元素的左右外边界不能超出包含块的左右内边界，浮动元素不会超过容器的上 padding
    - 当浮动元素的 width>容器的 width 时，这会使得浮动元素超出容器的左右边界，但它会向下移动到保证超出的部分最小。
    - 同一个包含块内浮动元素之间不能互相重叠
    - 元素浮动后会生成块级框，即浮动元素没必要指定 display:block
    - 浮动是在离其最近的块级祖先包含块中浮动
    - 浮动元素尽可能往上浮动
    - 浮动元素不能比前一个块级元素或浮动元素高。
    - 浮动元素的下边界没有要求，因此当容器不足以容下浮动元素时，浮动元素会向下延伸。这时可以用到闭合浮动

  * 清除浮动：clear 元素，用于块元素，使其下移到两边没有浮动元素。块元素的 border box 和浮动元素的 marginbox 紧挨着；
  * 闭合浮动：某个块框通过增加自己的高度使其能够包含其浮动的后代元素（通过自己变大，使所有后代浮动元素被自己包起来）
    闭合浮动的方式
    * 触发 BFC：
      overflow: hidden/auto/scroll;
      display: inline-block/table-cell/table/flow-root;
      position: absolute/fixed;
      float: 除 none 以外的值；
    * 在末尾使用一个行内元素生成的行框将其撑高
      缺点：会生成一个行框，有一定的高度
      font size=0,line height=0
    * 在末尾使用一个 clear:both 的块元素将其撑高
      优化：用 after 伪元素
    * <br clear="both">

## CSS 补充知识

### 伪元素

  * div::before（位于开始标签之后）     div::after（位于结束标签之前）
    这两个伪元素都是 div 的子元素 ，且都为行内元素，直接在 CSS 中使用。
    ::selection {被鼠标选中的文字，只能设置前景色和背景色}
    ::target {选中 id 的值为地址栏中#后的内容的元素}

  * 伪元素后面不能加伪类，只能加在其父元素后面
    div:hover::before  对
    div::before:hover  错

  * 伪元素的属性
    * content 属性，必要属性，它的值是文字或者空值，多个值之间用空格分开  content："" "asf" attr（父元素的属性） '空格'  ；
      attr（父元素的属性） = 父元素的该属性值
      content：  "/A"   回车换行符   需配合 white-space：pre 使用才可以实现换行

### 回流与重绘

   * 回流 reflow relayout
      页面样式的变化涉及到重新计算布局
      在可能的情况下不要触发回流或把回流控制在一定的范围内
      因为回流速度更慢
    * 重绘 repaint
      速度快
      页面样式的变化不涉及布局的计算，只变了颜色，背景，阴影等不影响布局样式

### 新元素和属性收集

   * pointer-evens
     默认值为 auto，鼠标可以交互
     值为 none 时，鼠标在对象里面无法交互，但是会指向其后代
   *  user-select:none; 元素无法被选中，多用于防止小说文本被复制盗版
   *  visibility，支持动画
      默认值 visible，可见
      hidden 内容隐藏，位置还在，不可交互；  display:none 无法支持动画，可选择 visibility 属性
      collapse 用于 <table> 行、列、列组和行组，隐藏表格的行或列，并且不占用任何空间（与将 display: none 用于表格的行 / 列上的效果相当）
      z-index: 也支持动画
   * min-height/width   max-height/width  设置元素宽高的最大最小数值  ，浏览器的窗口不是 html 元素，浏览器的窗口大小不能由这两个属性控制，有浏览器默认控制。
   * clip-path CSS 属性可以创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。
     clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);  不规则图形，四个坐标对应 4 个点；
    * 列表图标
      list-style-image:url() 图片会原比例尺寸插入，无法调整大小和位置，几乎不用
      list-style-position:inside ：设置图标在 li`边框的内外部
      list-style-type:decimal：设置图标的样式，圆，方块，10 进制等
    * <link  media="print"> 设置代码在哪种设备中生效
    * 计数器 counter
      counter-increment: 计数器名（遇到该计数器开始计数）  数字（加几，默认 1）
      counter-reset：计数器名（遇到该计数器重置）  数字（重置为几，默认 0）
    * 打印断页
      page-break-before：avoid/always    该标签前面不断页 / 断页
      page-break-after :avoid/always    该标签后面不断页 / 断页
      page-break-inside : avoid    该标签永远在一个页面里面
    *  all:initial 所有属性回到初始值，即浏览器默认值
    * 如何禁用 textarea 元素默认的可缩放行为？
          textarea {
          resize: none;
        }
    * 为所有元素设置 box-sizing 较好的方法
      html {
      box-sizing: border-box;
      }
      *,::before,::after {
      box-sizing: inherit;
      }
    * background-clip :border-box/padding-box/content-box
      设置元素的背景（背景图片或颜色）是否延伸到边框下面。
      background-size：contain 缩放背景图片以完全装入背景区，可能背景区部分空白，保持图像的宽高比例（图像不会被压缩） /cover 缩放背景图片以完全装入背景区，保持图像的宽高比例，可能背景图片部分看不见
      background-color: 背景颜色
      background-image：背景图片
      background—repeat: 背景图片的重复与否
      backgrounf-origin: 定了指定背景图片 background-image 属性的原点位置的背景相对区域。
      background-position: 为每一个背景图片设置初始位置。 这个位置是相对于由 background-origin 定义的位置图层的。
      background-attachment ：决定背景图像的位置是在视口内固定，还是随着包含它的区块滚动。
    * data*属性配合 js 的用法
      <table id="wosd" data-all="[['名字','年龄','性别'],['Jason','24','men'],['Bob','42','man'],['Merry','32','woman']]">
        <script>
            let res = document.getElementById("wosd").dataset.all
        </script>

## CSS3 知识

  * 以前对于目前有争议不兼容的属性，不同的浏览器加上不同的前缀，现在这种做法已淘汰
    -ms- 属性：值         IE 浏览器
    -webkit- 属性：值     Chrome 浏览器
    -moz- 属性：值        火狐浏览器
  * 对于大型商业网站，pc 端一个网站，移动端一个网站，两个团队开发
    对于简单的网站只用一个站点，配合 media query 让站点在不同的设备上展示比较合适

### media query

  * media query 语法
    - 使用 link 插入外部样式表
      <link  media="logic media and (expression)">
    - 使用 @import 指令调用外部样式表
      @import url() logic media and (expression)
    - 直接在 css 区域插入
      @media logic media and （expression）{css 语法}
  * media query 不会增加选择器的优先级
  * @media(max-width:500px){rule} 小于 500px 生效
    @media(min-width:500px){rule}  大于 500px 生效
  * 像素比：css 像素比上物理像素。DPR   device pixel ratio
    手机上一般为 3，即手机上一个 css 像素对应 3 个屏幕物理像素，更多用 dppx 表示 dots per pixel ratio
    @media media and (resolution:3){css 语法}
  * dppx  像素比  dots per px  每像素多少个点
    dpi 英寸比 dots per inch   每英寸多少个点
    dpcm  厘米比  dots  per cm 每厘米多少个点

### web font

  * @font-face 规则
    @font-face{
      font-family: 字体名字；
      src:local('相对地址')，url('绝对地址') format('字体格式')
    }
   为了更好的兼容各大浏览器，我们一般做多次 @font-face 声明，并且每次声明至少写 3 种字体格式

  * 防止页面加载时因为引入 CSS 延时产生的抖动
    - 把第一页的样式放在 html 里面
    - 把 link 标签写在最上面（link 标签可以写在任何位置）

  * 好用的图标字体网站
    https://www.iconfont.cn 下载图片格式的图标
    https://fontawesome.com/   下载 css 文件后引用

### 文本排版

  * text-shadow: 文本阴影 和 box-shadow 类似
    （x 偏移，y 偏移，模糊半径，颜色）可写多组数值来表现多重阴影，每组值用逗号隔开；
  * resize:horizental/vertical/both/none  设置元素大小能否被鼠标控制拉伸，只控制自己，不递归控制
  * word-wrap:normal/break-word  设置长单词能否被折断
  * text-wrap ：normal（默认）/none 设置文本行能否被折断，none 表示所有文本行写作一行
  * text-indent 属性 规定了 一个元素 首行 文本内容之前应该有多少水平空格。
  * white-space：nowrap    设置文本内容不折行
    white-space：pre    空白符会被保留。在遇到换行符或者<br>元素时会换行；配合伪元素的 content："/A" 可以使伪元素换行
  * text-overflow:ellipsis 文字溢出后显示为省略号
  * word-space:12px; 设置行内元素之间的间距
    word-break:break-all 指定了怎样在单词内断行
    word-wrap（overflow-wrap）:break-word 当一个单词一整行都显示不下时，会拆分换行该单词换行

### 移动端的适配方法

  * <meta name="viewport"  content="width=device-width" >  利用 px 开发
    <meta name="viewport"  content="width=360" >可以个定值 ，不需要单位 。
    让手机浏览器以多少宽度的初始快包含块来渲染页面，如果不加这个标签，手机会以宽度 1000px 左右包含块来渲染页面，目前移动端流行为 360；
  * 所有布局宽高都使用 vw，这样布局的视觉效果和移动端的具体宽度无关了
  * 使用 rem 单位； 等比适配，
    1rem=100a
    设置 x*a=100vw;
    x 为视觉口的宽度（开发时设计人员给的值），100vw 是移动端的宽度，可以用 js 直接测出来，这样就可以算出 rem 的值，所有布局宽高都使用 rem 为单位；
    一般 rem 默认最小为 12px, 上面算出的 a 比较小，所以我们一般乘以 100 倍来表示新的 rem, 即 1rem=100*100vw/x , 然后将量出的视觉稿布局尺寸 y 除以 100 即可，那么对应的屏幕布局尺寸
    z=y/100   *  100a=y/100   * rem

  *总结
    移动端布局：
    viewport 标签仅被移动端浏览器支持
    PC 端浏览器的渲染窗口即为窗口大小减去额外浏览器自身元素
    如果没有 viewport 标签，移动端浏览器会主以 980 像素的浏览器窗口渲染页面（即手机浏览器宽度为 980px)
    如果有，如果 viewport 写为 width=X，则移动端浏览器就以 Xpx 为初始包含块渲染页面
    如果写为 width=device-width，则移动端浏览器会以出厂设置的宽度为初始包含块的宽度渲染，出厂设置的值一般来说与屏幕物理尺寸正相关，范围一般为 320 到 400 左右，目前最主流的是 360

    假定视觉稿宽度为 X
    对于针对移动端的页面，一般有两种情况：
      *. 页面较复杂，希望页面在不同的手机上效果和比例一致（mi.com 移动端）
        页面需要等比缩放，即视觉稿宽度跟浏览器 / 手机屏幕一样宽
        且我们希望从视觉稿里测量出来的数据能直接用在代码里
      - 所有用户的设备都支持设定视口宽度的产品来说，直接把视口宽度设置为视觉稿宽度，页面使用 px 为单位开发，数值直接从视觉稿量出来
         如<meta name="viewport"  content="width=360" >
      - 对于并不是所有用户的设备都支持设定视口宽度的产品来说，我们同样希望视觉稿里测量出来的数据可以直接用在代码里，于是要找一个可以灵活缩放的单位（因为不同的手机窗口宽度不一样），让 X 倍的这个 单位正好等于宽屏宽度
        Xrem = 100vw
        rem = (100vw / X)
        html {font-size: calc(100vw / X)}
        有些浏览器不允许最小字号小于 12px，而上面的公式算出来的值过小，会被重置，所以将其放大 100 倍，即
        html {font-size: calc(100vw / X * 100)}
        还有些浏览器不支持 calc/vw，所以这个值通过 js 读取出浏览器视口的宽度并自行算出，然后设置到 html 元素上
        之后从视觉稿量出来的尺寸将小数点移动两位后加 rem 单位即可用在代码里。

    *. 页面较简单，希望页面在更大的手机上显示更多的内容（github 移动端）
        直接使用 device-width 且使用 px 以及流式布局（块元素自动占满宽度）

    *. 对于杂合形页面，即布局复杂，又有很多文字
        布局使用 rem，文字使用 px，width=device-width

### 多列

   * column-count:2/3; 设置文本分成多少列，和 column-width 一起用时表示最大多少列
     column-width：150px； 每列的最小宽度
     column-count，column-width 一起使用时，先满足 column-width 的要求，
   * column-gap：2em ; 每列之间的间隙
     column-rule: 2px solid red  ;  设置每列之间的垂直分隔线
   * column-fill：balance（默认值）/auto  ; 设置填充方式
     balance 表示每列平均填充文本；auto 表示按照顺序填充，一列填满后再填下一列
   * break-inside:avoid-column; 使同一个元素在一列中显示，不要左右断开显示
   * column-span：1/all;
     默认值为 1，使行内元素可以分列；值为 all 时，行内元素占据整行不分列；
   * 多列属性元素的行内子元素无法撑开其宽度，父元素的宽度为行内子元素不分列时的宽度。

### 边框及边框效果

  * border-radius:x1 x2 x3 x4/y1 y2 y3 y4
    border-top-left-radius:x1 y1
    border-top-right-radius:x2 y2
    border-bottom-left-radius:x3 y3
    border-bottom-left-radius:x4 y4
    表示正圆形时 x 和 y 的值一样，写一个值即可；border-radius：x1 x2 x3 x4
    border-radius：9999px,   值足够大就是 4 个圆角（上下或者左右角半径之和大于边框长宽时会等比缩小）
    border-radius：100%， border-box 不为正方形时，为椭圆（百分比是以边框为基础的）
  * box-shadow ：/* inset（向内扩散，不写就默认向外扩散） | x 偏移量 | y 偏移量 | 阴影模糊半径| 阴影扩散半径 | 阴影颜色 */

### 颜色和透明度

 * opacity ：0~1  透明度
     *不能继承，父子元素都有透明度时，先将子元素透明好，再透明父元素，父子元素的透明度在子元素的位置会叠加
     * 会通过触发图形加速，单独形成一个图层和当前图层重合，默认通过图形加速的图层会盖住常规流。比如浮动元素 opacity 属性触发图形加速后会盖住常规流。
     * 通过触发图形加速单独形成一个图层在显卡中进行图形变换，这样工作效率高，效果好。

### 渐变

  * linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片。其结果属于<gradient>数据类型，是一种特别的<image>数据类型。
    background-image：linear-gradient(to left ,white,black)  由白到黑向左边渐变
    linear-gradient（渐变方向，可以为弧度角度    ，   开始颜色 ，  结束颜色）
  * radial-gradient() 径向渐变；颜色值由一个中心点（原点）向外扩散并逐渐过渡到其他颜色值。
  * 重复渐变；重复多次渐变图案直到足够填满指定元素。由 repeating-linear-gradient() 和 repeating-radial-gradient() 函数产生。

### 2D 变换

  * 先布局再变换
  * 线性变换，有规律可循；默认 x 轴箭头向右，y 轴箭头向下
  * transform：function（value）function（value）function（value）
     * 变换的元素会通过显卡 (GPU) 渲染，单独形成一个图层，覆盖常规流，但是常规流只能感受它变换之前的位置，无法感知现在的位置，不影响常规流布局
     * 第一个函数变换后，以更新后的位置为基础进行下一次函数变换
     * transform 里面变换前后函数的数量和顺序一样时，不是起点和终点的直线变换，而是按照每个变换点一步一步的渐进变换
  * transform-origin：不动点，元素围绕改点进行变换
    * 默认值为元素水平垂直的中点，注意此时其坐标不是（0,0）
    * （0,0）坐标在元素左上角
    * 表达方式
      transform-origin：x, y
      transform-origin：100%, 100%
      transform-origin：left, top
      transform-origin：center, center
  * transform:rotate（度）  旋转 ；元素坐标系跟着旋转
  * transform:translate（）平移；会把不动点一起平移
    * transform:translate（x, y）
      transform:translatex
      transform:translatey
    * 水平垂直居中
      - 先绝对居中到父元素的中心（top：50%；left：50%）
        再向上和向左平移自身的 50%（ transform:translate（-50%, -50%））
  * transform:scale() 缩放，会把自身的坐标缩放
    * transform:scale(x,y) 分别在水平垂直方向缩放
      只有一个值时，x 和 y 共用这一个值
  * transform:skey()   倾斜坐标轴一定的角度
    * transform:skey(x , y)
  * transform：matrix()  矩阵变换
    所有的变换最终都是综合为一个矩阵变换

### 3D 变换

  * 先布局再变换
  * transform-origin：x,y,z;  设置不动点的位置
  * transform-style：flat（默认值，平面拉伸）/preserve-3d（设置该值有 3D 深度感）
  * Perspective 景深，眼睛离平面的垂直距离，可以继承，近大远小；
    transform：perspective（1000px/none），值为具体数值或者 none；该函数只能写在最前面，写在后面会被忽略；
    perspective-origin：x,y;  设置观察点相对于平面的位置
  * transform:rotateX/Y/Z()
    transform:rotate3d(x,y,z, 度数）;  (x,y,z) 表示矢量坐标，元素围绕该矢量线旋转
  * transform:translateX/Y/Z()
    transform:translate3d(x,y,z)
  * transform:scaleX/Y/Z()
    transform:scale3d(x,y,z)
    z 的值默认为 0，不设置 Z 的值就相当于进行 2D 变换
  * transform：matrix3d()  3D 矩阵变换
    所有的 3D 变换最终都是综合为一个 3D 矩阵变换

### 过度与动画

   * transition  平滑的改变 CSS 的值 （可以简写，保证 duration 在 delay 前面即可）
     - transition-property
       指定过渡的属性值，比如 transition-property:opacity 就是只指定 opacity 属性参与这个过渡。默认值为 all
     - transition-duration
       指定这个过渡的持续时间
     - transition-delay
       延迟过渡时间，双向的，开始动画之前和动画结束之后都是有 delay 时间
     - transition-timing-function
       指定过渡动画缓动类型，有 ease | linear | ease-in | ease-out | ease-in-out | step | cubic-bezier() 贝塞尔曲线
       其中，linear 线性过度，ease-in 由慢到快，ease-out 由快到慢，ease-in-out 由慢到快在到慢。
   * animation 动画（可以简写，保证 duration 在 delay 前面即可）
     - @keyframes  name {关键帧（10%）{属性：值}  关键帧（10%）{属性：值} 关键帧（10%）{属性：值}}
       —关键帧可以用百分比，也可以用 to(100%) 和 from（0%）
     - animation-name：关键帧前面定义的 name
     - animation-duration : 持续时间
     - animation-timing-function 关键帧的过度动画缓动类型
     - animation-delay  动画延迟
     - animation-iteration-count  动画执行次数  默认为 1 次，infinity 表示无数次
     - animation-direction:normal（默认值，1 次播完突变回来）/alternate（表示动画会反着播放回来，1 次结束后不会突变回来，并且回来的这次也算次数）
     - animation-fill-mode: 设置 CSS 动画在执行之前和之后如何将样式应用于其目标。
        -none 当动画未执行时，动画将不会将任何样式应用于目标，而是已经赋予给该元素的 CSS 规则来显示该元素。这是默认值。
        -forwards 目标将保留由执行期间遇到的最后一个关键帧计算值。
        -backwards 动画将在应用于目标时立即应用第一个关键帧中定义的值，并在 animation-delay 期间保留此值。
        -both 动画将遵循 forwards 和 backwards 的规则，从而在两个方向上扩展动画属性
     - animation-play-state: 动画播放状态  running（播放）/paused（暂停）

### Blend Modes/Filter/Masking

   * background-blend-mide  设置背景的颜色混合方式
     mix-blend-mide 设置多个元素的颜色混合方式
     isolation：auto/isolate 该属性的主要作用是当和 background-blend-mode 属性一起使用时，可以只混合一个指定元素栈的背景
    * filter 滤镜
        filter: blur(5px);  模糊
        filter: brightness(0.4); 亮度
        filter: contrast(200%);  对比度
        filter: drop-shadow(16px 16px 20px blue); 阴影效果
        filter: grayscale(50%); 将图像转换为灰度图像
        filter: hue-rotate(90deg); 给图像应用色相旋转
        filter: invert(75%); 反转输入图像。值定义转换的比例。100% 的价值是完全反转。值为 0% 则图像无变化。
        filter: opacity(25%); 转化图像的透明程度
        filter: saturate(30%); 转换图像饱和度。
        filter: sepia(60%)  将图像转换为深褐色
    * mask 允许使用者通过部分或者完全隐藏一个元素的可见区域。这种效果可以通过遮罩或者裁切特定区域的图片。

### Flex 布局

  *  知识来源： http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
   * 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。任何一个容器都可以指定为 Flex 布局，行内元素也可以使用 Flex 布局；
     它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。 设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。
   * 相关概念：容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做 main start，结束位置叫做 main end；交叉轴的开始位置叫做 cross        start，结束位置叫做 cross end。 项目默认沿主轴排列。单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。
   * flex 也是在常规流的布局，当元素设置 flex 布局时，先进行常规流布局，再在此基础上拉伸

#### Flex 的相关属性

   * flex container 相关属性
     * diplay:flex; 初始必要设置
     * flex-direction 属性决定主轴的方向（即项目的排列方向）
        - row（默认值）：主轴为水平方向，起点在左端。
        - row-reverse：主轴为水平方向，起点在右端。
        - 当主轴为水平方向时，item 的 height 默认值为 100%；
        - column：主轴为垂直方向，起点在上沿。
        - column-reverse：主轴为垂直方向，起点在下沿。
        - 当主轴为垂直方向时，item 的 width 默认值为 100%；
    * flex-wrap 属性定义，如果一条轴线排不下，如何换行。
        - nowrap（默认）：不换行。
        - wrap：换行，第一行在上方。
        - wrap-reverse：换行，第一行在下方。
     * flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap
     * justify-content 属性定义了项目在主轴上的对齐方式。
        - flex-start（默认值）：左对齐
        - flex-end：右对齐
        - center： 居中
        - space-between：两端对齐，项目之间的间隔都相等。
        - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
     * align-items 属性定义项目在交叉轴上如何对齐。
        - flex-start：交叉轴的起点对齐。
        - flex-end：交叉轴的终点对齐。
        - center：交叉轴的中点对齐。
        - baseline: 项目的第一行文字的基线对齐。
        - stretch（默认值）：如果项目未设置高度或设为 auto，将占满整个容器的高度。
     * align-content 属性定义了多根交叉轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
        - flex-start：与交叉轴的起点对齐。
        - flex-end：与交叉轴的终点对齐。
        - center：与交叉轴的中点对齐。
        - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
        - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
        - stretch（默认值）：轴线占满整个交叉轴。
   * flex item 相关属性
     * order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。
     * flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。
       - 所有 item 的 flex-grow 的值之和大于 1 时，所有的剩余空间按照值的比例分配。
       - 所有 item 的 flex-grow 的值之和小于 1 时，每个 item 分配到的剩余空间为总的剩余空间乘以 flex-grow 的值，即有部分剩余空间没被分配
     * flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
       - 空间不足时该属性才生效，负值对该属性无效；
       - item 缩小的权重是 其宽度（高度）乘以 flex-shrink 的值 ，缩小的距离即为该 item 所占的权重比例乘以整体的缩小距离；
         eg: [(300*2)/（400*3+300*2+500*4)](权重比例)*200(整体的缩小距离)
     * flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小；
       根据主轴的方向，flex-basis 分别对应在 width 和 height；
       flex-direction 为 row 时，flex-basis 为 width
       flex-direction 为 column 时，flex-basis 为 height
     * flex-basis 不为 auto，值为具体值时，flex-basis 的优先级比宽高的优先级高 (flex-basis:100px; width:200px，前者生效）
       flex-basis:auto 时，  flex-basis 的优先级比宽高的优先级低 (flex-basis:100px; width:200px，后者生效）
     * flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。
     * align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。 该属性可能取 6 个值，除了 auto，其他都与 align-items 属性完全一致。

### 水平垂直居中知识汇总

   * 以下父元素称为包含块，子元素称为内容区
   * 包含块的 line-height=height 时，实现文字的垂直居中。内容区和行高共用一条居中线，当行高等于行框高度时，行高的中点也就是行框的中点；
   * 包含块 text-align=center，使其内容区水平居中。
   * 包含块内容区 margin=auto 时，实现水平居中；
   * 行内元素 vertical-align=middle, 加上 font-size：0，可以实现垂直居中。
     字符 X 在父元素中并不一定是垂直居中的，各个字体的字符 X 的高低位置不一致。所以，当字体大小较大时，这种差异就更明显。而当字体大小为 0 时，基线的位置就等于中线的位置，我们通过设置父元素的 font-size:0 来使图片达到完成垂直居中的效果 ；
   * 绝对定位时，设置内容区的上下左右都为 0，margin 为 auto 时也可以实现水平垂直居中；margin 在这种情况下会自动调整，上 margin 等于下 margin。左 margin 等于右 margin
   * flex 布局时，justify-content=center，align-items=center 可以实现水平垂直居中
   * 利用表格时，为 td 设置 text-align 为 center ,vertical-align: middle 可以水平垂直居中；
      td 里面的内容默认是垂直居中的，可以省略 vertical-align: middle
   * 利用 translate 平移属性
      先绝对居中到父元素的中心（top：50%；left：50%）
      再向上和向左平移自身的 50%（ transform:translate（-50%, -50%））

### Sass

   * 更多知识 http://www.ruanyifeng.com/blog/2012/06/sass.html
   * sass 转化为 css 网站 https://www.sassmeister.c`om/
   * 类似于根一样的嵌套规则，@import 命令，用来插入外部文件。如 @import "path/filename.scss";
   * & 符号表示父选择器，可直接使用
   * 变量 $ , 变量仅在它定义的选择器嵌套层级的范围内可用，加上！globle 就是全局属性；
    　　$blue : #1875e7;
    　　div {
    　　　color : $blue;
    　　}
   * 如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。
      　$side : left;
    　　.rounded {
    　　　　border-#{$side}-radius: 5px;
    　　}
    * 循环语句编辑（through 包括最后一位，to 不包括）
      下面表示子元素第 1 到第 9 个 span 的宽度为等差数列（20px, 40px, 60px....180px)
        　@for $i from 1 to 10{
            span:nth-child(#{$i}){
                    width:$i * 20px;
             }
          }

# Bootstrap(CSS 框架）

   * 直接用 link 引入<link href="url" rel="stylesheet" type="text/css"   integrity="完整性验证码（HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu）" >

# 布尔代数与逻辑电路

## 布尔代数

### 布尔代数其实就是命题逻辑的【形式化表达】

* 命题逻辑
	* 真命题
	* 假命题
	* 逆命题
	* 否命题
	* 逆否命题等

* 布尔代数中只有两个值，即真和假，一般表示为 0 和 1，对应于命题逻辑里命题的真和假
* 当使用变量表示值的时候，一般使用【大写】的单个字母，如 A，B 等
* 布尔代数中的两个值可以进行如下简单的【基本运算】
* 逻辑与
	* 0 & 0 = 0
	* 0 & 1 = 0
	* 1 & 0 = 0
	* 1 & 1 = 1
* 或
	* 0 | 0 = 0
	* 0 | 1 = 1
	* 1 | 0 = 1
	* 1 | 1 = 1
* 非
	* !0 = 1
	* !1 = 0

* 常见非基本运算：
	* 异或
    相同为 0，不同为 1
		* 0 ^ 1 = 1
		* 1 ^ 0 = 1
		* 0 ^ 0 = 0
		* 1 ^ 1 = 0
	* 同或
    相同为 1，不同为 0
		* 异或的反运算
		* 0 ^ 1 = 0
		* 1 ^ 0 = 0
		* 0 ^ 0 = 1
		* 1 ^ 1 = 1
	* 与非
		* 先与后非
		* 0 NAND 0 = 1
		* 0 与非 1 = 1
		* 1 与非 0 = 1
		* 1 与非 1 = 0
	* 或非
		* 先或后非
		* 0 或非 0 = 1
		* 0 或非 1 = 0
		* 1 或非 0 = 0
		* 1 或非 1 = 0
		* 理论上，所有的逻辑运算都可以仅通过与非运算表达
			* https://zh.wikipedia.org/wiki/%E4%B8%8E%E9%9D%9E%E9%97%A8

* 逻辑非的多种表达方式：
	* V + 表示或   A+B
	* 反 V AB 表示与   AB
	* 值上方加一横、或者 A'、或者！A、或者﹃A，表示非 A
* 通常为了方便表达、理解和书写，纯文本表达时，用加号（+）表示或，用乘号（*）表示与（有时为了方便也可省略点乘号直接写成 AB），用叹号或单引号（!，'）表示非：A'，!A。手写时用上方加横表示非

* 常用运算法则（通过集合是思想去理解）
	* 幂等律
		* A + A = A
		* A * A = A
	* 有界律
		* A + 0 = A
		* A * 1 = A
		* A * 0 = 0
		* A + 1 = 1
	* 交换律
		* A + B = B + A
		* AB = BA
	* 结合律
		* A+B+C = A + (B + C) = (A + B) + C
		* ABC = A(BC) = (AB)C
	* 还原律
		* A = !!A
	* 摩根定律 / 反演律
		* !(A * B) = !A + !B
		* !(A + B) = !A * !B
	* 分配律
		* A * (B + C) = (A * B) + (A * C)
		* A + (B * C) = (A + B) * (A + C)
	* 其它 http://blog.csdn.net/yueniaoshi/article/details/8040119
* 逻辑表达式的真值表
	* 即把一个逻辑表达式的【所有变量的所有可能】及【此时表达式的值】全部列出来的一张表
	* A * B = ？
	* 0   0   0
	* 0   1   0
	* 1   0   0
	* 1   1   1
	* 例：
		* 用真值表证明前面各个运算法则
		* 反演律  也可以通过真值表反推运算规律
		* 分配律
* 逻辑函数
	* 由逻辑变量组成的表达式的值
		* F = A * B + C
		* F(A,B,C) = A * B + C
* 如何由真值表反推出逻辑函数
* 如何化简逻辑函数
* 卡诺图
	* 有时真值表写成一列比较麻烦
	* 我们可以把真值表写成二维的
	* 卡诺图真正的目的是为了化简更方便
	* 例

# 逻辑电路

* 逻辑电路（logic circuit）由各种逻辑门 (logic gate) 组成
* 逻辑门之所以称为逻辑门，是因为它们可以实现简单的逻辑运算
* 逻辑门是如何组成的？
	* 继电器
	* 真空管
	* 晶体管
		* 三极管
		* PN 结
* 基本的逻辑门有三种
	* 与门 (AND Gate)
	* 或门 (OR Gate)
	* 非门 (NOT Gate)
* 复合逻辑门
	* 异或门 (XOR Gate)
	* 与非门 (NAND Gate)
		* 其中仅用与非门即可模拟出所有其它的逻辑门
		* https://zh.wikipedia.org/wiki/%E4%B8%8E%E9%9D%9E%E9%97%A8
	* 等等
* 如果我们把相应的逻辑运算表达成逻辑函数，然后构造一个与逻辑函数对应的逻辑电路，则该电路即可表达我们的逻辑
* 由此我们可以使用电路实现任意的逻辑，实际上计算机电路中所有的逻辑门也都是用与非门来表达的

# javascript 笔记

## UTF8 编码规则

  * 第一个字节前面若干 bit 表示需要几个字节，以 1 开头 0 结尾，没有用到的 bit 位储存数据
     * 11110 开头  需要 4 个字节
     * 1110 开头  需要 3 个字节
     * 110 开头  需要 2 个字节
     * 0 开头  需要 1 个字节    和 ASCII 规则一致
  * 第二个字节开始以 10 开始 ，后面的 6 位储存数据
     *  11110 开头    11110--- 10------ 10------ 10------   21 个 bit 储存数据
     *  1110 开头     1110---- 10------ 10------            16 个 bit 储存数据
     *  110 开头      110----- 10------                     11 个 bit 储存数据
     *  0 开头       0-------                              7 个 bit 储存数据
  *  字符数据填入方式
     * 字符对应的 Unicode 编码转化为 2 进制，2 进制从左往右，依次从左边开始填入到存储数据的 bit 位上
     * 如 128523 转化为 2 进制 1 1111 0110 0000 1011 ，一共需要 17 个 bit 位，需要 4 个字节
       所以填入方式为 11110000  10011111  10011000  10001011    前面没填满的数据字节补零
  * 变长编码，根据符号所需字节的大小调整编码长度，可以节省字节储存空间
  * 兼容标准 ASCII，当字符只需要 1 个字节时，以 0 开头
  * 容错 第二个储存字节开始都是以 10 开头，计算机可以识别出是否有字节丢失，最小的减少损失

## 整数在计算机中的表示和运算

  * 整数在计算机中的表达类似于时钟表盘。如对于表盘来说，向前拨动 3 个刻度的指针，相当于向后拨动 9 个刻度的指针；反过来，向后拨动 5 个刻度相当于向前拨动 7 个刻度，于是减 5 就可以转换为加 7，于是 -5 用 7 来表达，二进制中也只是周期不一样，周期为 2 的 n 次方，最高位 1 表示负数，0 表示正数；
  * 原码 1101        12568
    反码 0010        87431
    补码 0011        87432
    补码 = 周期 - 原码
    为了计算方面，通过周期 -1- 原码 +1 的方式计算补码（这样做减���不会借位，计算机���通过这样求反码的）
    或者通过（周期 -1）-（原码 -1）的方式计算补码（结果一样，思路不一样）
  *  位运算符
    - 其它基本类型参与位运算时也会先转换为 number 类型
    - 位运算只对整数有效，遇到小数时，会将小数部分舍去，只保留整数部分
    - js 语言中的整数在参与位运算时用 4 个字节表示，即 32bit
    - 如果整数部分超出 4 个字节（溢出），取整数右边 32 位。
      |按位或     2|3=3   双方化为 2 进制每 bit 位进行或运算，任何数和 0 按位或都得到其本身整数部分
      & 按位与     2&3=2   双方化为 2 进制每 bit 位进行与运算
         -  n & (n - 1)  把二进制最右边一位的 1 化为 0
      ^ 按位异或
         - 双方化为 2 进制每 bit 位进行异或运算
         - 不同为 1. 相同为 0；
         - 任何数和自身异或都为 0，任何数和 0 异或都为自身； 2^2==0；2^0==2;
         -  两个整数交换的方法
            a = a^b
            b = a^b
            a = a^b
      ~按位非   ~2==-3    数字化为 2 进制每 bit 位进行非运算
      符号》>按位右移（保留符号位） 15>>3==1;   n>>1==Math.floor(n/2)    n>>2==Math.floor(n/4)  n>>3==Math.floor(n/8)
      符号》>>按位右移（不保留符号位，左边补 0） -15>>>3==536870910
      <《按位左移（右边总是补 0） 15<<3==120
  *  ** 次方    2**5==32
  *  x.toFixed(n) 可以让 x 保留小数点后 n 位，4 舍 5 入，返回的是一个字符串
  *  将其他进制数转化为字符串再转化为 Number 后就变为 10 进制数了
  *  x.toString().length   可以判断 x 的位数，如果 x 为负值，那么 - 号也要算一位，结果比正常值多 1
     数字直接转化为字符串，需要在数字后面加个。, 在加上 toString 方法；
     123..toString == "123"  第一个。号让计算机确认 123 为数字，第二个。号表示调用 toString() 方法
  *  逗号表达式：对它的每个操作数求值（从左到右），并返回最后一个操作数的值
     toolbar = d = a+b,e = 2*d , 3*e  => toolbar = 36

## 浮点数在计算机中的表示和运算

   * 单精度储存 float 4 个字节    js 中的整数在参与位运算时用 4 个字节储存
     双精度储存 double 8 个字节   js 中的浮点数是用 8 个字节储存，整数也是以浮点数的方式储存；当整数要参与位运算时，将二进制的整数部分右边的 32 位取出，与 0 按位或得到其在 4 个字节时的值；如 Number.MAX_SAFE_INTEGER | 0 = -1 ，Number.MAX_SAFE_INTEGER 在二进制中是 53 个 1，参与位运算时取出 32 个 1 与 0 按位或得到 32 个 1，整数的 32 个 1 在 4 个字节里转化为 10 进制的值就是 -1
   * 有符号整数：即有原码和补码的概念，最左边一位表示正负
     无符号整数：没有原码和补码的概念，只能用 +/- 表示正负
     number>>>0 将结果以以无符号整数输出
   * js 运算结果以 32 位有符号整数理解，除了》>>运算符，它的运算结果以无符号整数理解
   * JS 中浮点数以 8 个字节储存，64 个 bit，以 2 进制的科学计数法储存（整数部分永远转化为 1），形式如下
    * 1bit（符号位） + 11bit（指数位） + 52bit（底数位）
      * （1 + 底数位）* 2**（指数位）
      * 符号位，占用 1 个 bit ，正数为 0，负数为 1
      * 指数位，占用 11 个 bit，指数大小分布 -1023~1024 之间，分别用 0~2047 来表达，用科学计数法算出的指数 +1023 得出的数值储存在这 11bit 里面，即 -1023 次方在 11bit 里面写作 0,1024 次方写作 2047
      * 底数位，底数小数部分直接填在 52bit 里面
        - 直接填在左边，右边多余的 bit 都填 0
        - 对于无限循环的小数部分（如 0.2），第 53 位如果为 1 就进 1 给第 52 位， 第 53 位如果为 0 直接舍去
    * 这样表示的原因：当比较两个浮点数大小时 计算机从左往右读取数据，读到符号位时，谁是 0 谁大；读到指数位和底数位，谁先遇到 1 谁打大；这样计算机就可 4 以更快判断两个浮点数的大小
    * 因为有的浮点数在计算机里面不够精确，所以一般比较浮点数的大小时用如下方法：
      |a-b|《阈 yu 值 Number.EPSILON  为 true 时 ，我们可以认为 a 和 b 相等
    * 计算机里面 10 进制小数后面的第 16 位开始不够精确，因为计算机的最大精度为 2 的 -52 次方，这个数值在 10^-15 ~ 10^-16 之间，比最大精度还小的数在计算机里面表示不精确
    * number.toPrecision（位数）  浮点数精确到小数点后面多少位时的值
    * 越接近 0 的浮点数越精确，因为底数位一共只有 52bit，转化为 2 进制科学计数法时，整数部分右移，整数部分越大，右移的 bit 位越多，表示小数位的 bit 位也就越少，越不精确
    * NaN +0 -0 Infinity -Infinity 这几个特殊值不符合上面规律
    * 几个常见的 Number 方法
      - Number.EPSILON == 2**(-52) 即 1 和大于 1 的最小浮点数之间的差值 ，<Buffer 3c b0 00 00 00 00 00 00> ， 如果|a-b|< Number.EPSILON，则 a 和 b 相等
        在 0~1 之间，也有比 Number.EPSILON 更小的精度值，比如 Number.Min_value, 但是计算机在此时已经失真，如果|a-b|< Number.EPSILON，也可以近似认为 a 和 b 相等
      - Number.MAX_SAFE_INTEGER == (1 + [1 - 2**(-52)])* 2**(52) == 2**53 - 1；<Buffer 43 3f ff ff ff ff ff ff>；
        计算机中表示的最大的精确整数，即整数位转化为科学计数法时右移占满 52 个 bit，且每个 bit 值都为 1；
      - Number.Max_value, 表示 js 中最大的正数，<Buffer 7f ef ff ff ff ff ff ff>；即 (1 + (1 - 2**(-52))* 2**(1023)
      -Number.MIn_value, 来表示 js 中最小的正数，<Buffer 00 00 00 00 00 00 00 01> ; 即 （1 + 2**(-52))*2**（-1023）, 这个值比 Number.EPSILON 还小，计算机也计算失真
    * <Buffer 7f ff ff ff ff ff ff ff> 这个值没有确定的函数方法，计算是 Infinity
    * 大于 Number.MAX_SAFE_INTEGER 的所有数字可以使用 BigInt 表达；BigInt(1321233123131313312321312n) == BigInt("1321233123131313312321312") ；BigInt(1321233123131313312321312n) * 2n
      BigInt 可以和  +、`*`、`-`、`**`、`%` 一起使用；  BigInt 里面和外面是纯数字时数字后面加个 n

## js 编码规范及行业术语

  * js 代码是由表达式和语句组成，表达式有求值结果，一般配合 = 使用，语句（var/for/while/if/switch/return/debugger/do）没有求值结果，语句有明确的开始和结束，结束的地方有默认的；号
  * js 中回车时解析器会自动加上分号 ，当一行的第一个字符是 +，-，/,[,( 这 5 个字符时，他前面一行必须加分号。
  * 比较符》= 或者 <= 之间不能有空格
  * top 和 name 是运行环境中默认已经生成的变量，不能用这两个变量名于赋值
  * x++  x 自增 1  ，先赋值再自增 ， 即 x++ 的值为 x
    ++x  x 自增 1  ，先自增再赋值 ,  即 ++x 的值为 x+1
    以上两个运算都会把 x 自动转化为 Number 类型
  * polyfill: 在老浏览器里把新浏览器的功能完全实现，如 includes 函数
    shim: 无法在老浏览器完全实现的实现。如 Object.create,Object.defineProperty

## 编程语言知识

   * 静态语言 (c/c++/java/typescript): 变量也有类型且只能指向那种类型的值
     动态语言 (js/python/ruby): 变量没有类型但是值有类型，变量可以指向不同类型的值
   * 强类型（python/java): 程序运行时值的类型不会自动转换，类型不匹配的运算会报错
     弱类型（c/js）: 程序运行时值的类型可以根据运算符自动转换
   * 静态作用域语言（词法作用域）：声明的变量有一个在编译时静态确定的作用域，变量在自己的作用域内可见；   在这段区域以外该变量不可见（或无法访问）；
     动态作用域语言：声明的变量只要有代码访问该变量，该变量就一直存在，变量作用域是动态的；
     现在主流的编程语言都是静态作用域，也有的语言两种作用域都可以兼用
   * token 词元的意思，表示代码的最小单位，也有令牌的意思；

## 汇编

  * 计算机语言
    机器语言：01001001 这样的机器码；基本不用
    汇编语言：通过指令集来操作机器语言；基本不用
    高级语言：现代编程语言（C/C++/java/js）
    最终都是通过直接或间接操作机器码来实现
  * CPU
     * CPU 和内存的连接
       - 地址线：连接目标内存地址的线
       - 数据线：获取目标内存数据的线
     * 指令集（instruction set）  不同的 cup 有不同的指令集（X86,ARM,6502)
       - 指令： 进行简单的运算和逻辑
     * 寄存器 ：CPU 运行时存储缓存数据的空间
  * 编译型语言  C/C++ /Rust
      - 将源代码直接转化为机器码，由 CPU 执行
      - 同一个代码只能在同一类 CPU 执行，不能跨平台编译
    解释型语言  JS/Python  需要虚拟机（VM）
      - VM 拿到源代码后先检查语法，然后将代码构建为语法树，编译为机器码
      - 可以跨平台，不需要重新编译
      - V8 引擎 (VM) 的 JIT 优化（just in time）
        - V8 引擎发现某段代码会大量重复执行时会直接将这段代码转化为机器码
    半编译型语言  JAVA   需要虚拟机（VM）
      - VM 将源代码编译为面向 javaVM 的字节码，字节码不由 CPU 直接执行，而是由专门的 javaVM 执行
      - VM 执行字节码时不用构建语法树执行，直接按照字节码顺序执行
      - 可以跨平台，不需要重新编译
  * WASM  (Web ASM)  基于 web 的字节码技术，一种标准
      * 直接给浏览器发送字节码来运行，提高性能
      * 可以将其他高级语言转化为 WASM 从而可以开发前端程序

## 字符串

  * trim() 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等） 以及所有行终止符字符（如 LF，CR）。
    var orig = '   foo  '; console.log(orig.trim()); // 'foo'
  * String.fromCharCode(Unicode 码）  将 Unicode 码  转化为对应字符
  * String.charCodeAt（索引） 将第几个字符转化为 Unicode 码
  * String.repeat()   "x".repeat(2)=>"xx"
  * String.endsWith(value)  字符串是否以 value 结束
  * String.split() 将字符串转化为数组
  * String.raw`templateString` String.raw() 是一个模板字符串的标签函数，是用来获取一个模板字符串的原始字符串的；templateString: 模板字符串，可包含占位符（${...}）

## 数字

  * Number.isNaN // 仅 NaN 返回真
    window.isNaN // 不是数值都返回真（NaN 返回真）

## 作用域

  * js 只有函数才能创造作用域；调用函数时要回到创造函数的位置调用，函数里面变量的值不会因为调用函数的位置而发生改变，其初始值是固定的
  * 内部作用域可以读取外部作用域里面的变量，外面的作用域不能读取内部作用域里面的变量
  * 在任何作用域里面写有一个不用 var 声明的赋值表达式，f = 2 , 那么该变量相当于一个全局变量，相当于       window.f = 2
  * 用 let 声明的变量相当于声明了一个块级作用域，即只在离它最近的语句块{}里面生效，外面的语句块无法访问；块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
  * 用 var 声明的变量会提到 var 所在函数作用域的最前面，但是不赋值，到了赋值那一行才赋值
    用 let 声明的变量不会提前，在那行声明就在那行赋值；但在该作用域中，声明完成之前不能使用该变量，以及外部作用域的同名变量，称为 TDZ  Temper Dead Zone 暂时性死区；而且在同一个块级作用域里面同一个变量只能用 let 声明一次；
            var a = 8
            {
                console.log(a)
                let a = 9
            }  不会输出 a, 会报错
    const 声明和 let 声明一致，此外 const 声明的变量是一个常量，变量的指向不能改变，如果变量指向一个对象，对象里面的内容可以变；同一个变量只能用 const 声明一次；
  * 用 let 和 const 在全局作用域声明的变量也不能通过 window. 属性访问到
    window.length 返回页面中框架的数量（元素 frame 和 iframe）
  * 函数的【function 函数名{}】形式定义在 js 中也会提前赋值，会提到函数所在函数作用域的最前面
    函数的【var 函数名 = function{}】形式也会提前声明，但不不赋值，到了赋值那一行才赋值

## 闭包

  * 可以访问其他函数内变量的函数，叫做闭包。
  * 闭包可以理解为作用域嵌套。作用域里面的函数要访问作用域里面的变量，作用域不能销毁，作用域里面的函数在调用时会产生新的作用域，嵌套在当前作用域里面；
  * 函数运行时创建作用域，函数结束时作用域不一定销毁；函数不产生闭包会在结束时销毁；如果还有代码使用作用域里面的变量值，产生了闭包，作用域不会销毁，里面的变量值还是可以被调用它的函数使用；
  * 函数本身处在哪个作用域（A），它运行时创建的作用域（B）就在哪个作用域（A）内部；函数本身也是处于一个作用域的。是创建它的函数运行时所创建的作用域。

## 栈

  * 单边进，单边出；后进先出，先进后出
  * 调用栈：函数遇到其内部函数时先会进入到内部函数里面执行内部函数的代码，等到内部函数的代码执行完毕，再接着执行下面的代码；这种逻辑结构就是调用栈；
  * 调用栈的深度：函数的内部函数的内部函数的内部函数这种调用方式体现了调用栈的深度，即函数展开的层次；如果调用栈超过了其深度会发生栈空间溢出；
  * 调用栈不一定产生闭包，因为兄弟函数之间也可以互相调用，此时他们共用一个父函数的作用域
  * 调用栈展开的层次也是一种树状结构

## 函数

  * 副作用：打印了一段输出或者修改了全局变量
    返回值：纯函数，通过参数产生值，不读取全局变量，值仅由其参数决定
  * ducument.write()  向文档的解析流里写入内容，文档一解析完</html>，解析流关闭；重新 document.write 会导致重新打开一个解析流，之前 html 的内容会被冲掉，js 运行后创建的函数及变量是没有冲掉的
    ducument.open()   打开解析流，打开页面时默认打开
    ducument.close()   关闭解析流，关闭页面时默认关闭
  * 形参 ：函数定义的参数
    实参 ：函数实际传递的参数
  * 函数的相关方法
    fun = function(){}
    - fun.apply(null,array) ==fun(...array)
      将数组里面的参数一次性传递给函数
    - fun.length =>形参的个数
    - fun.toString() 函数的源代码
    - fun.name  =>函数的名字

## JSON  一种数据格式

   * 一段储存数据的字符串，写法类似 js 的数据格式
     https://www.json.org/json-zh.html 每种 js 值对应着每种 json 结构
     JSON.stringify(value[, replacer [, space]]) =>JSON 格式
     JSON.parse(text[, reviver])  =>值
   * JSON 里面的属性名都要加双引号，属性值不能是表达式，只能是最终结果
   * 双引号之间不能有特殊字符（需要转义 \\t )，不能出现任意的多余逗号，不能有 undefined 值
   * 序列化：比如链表结构在储存时会转化为一种其它的数据格式（如 json), 该结构是连续储存的，这就是序列化
     反序列化：比如链表结构在运行中就是反序列化的，不同的节点在不同的内存中，不连续储存
   * 利用 JAON 进行深拷贝 JSON.parse(JSON.stringfy())
     使用这种方法会有一些隐藏的坑：因为在序列化 JavaScript 对象时，所有函数和原型成员会被有意忽略。
    通俗点说，JSON.parse(JSON.stringfy(X))，其中 X 只能是 Number, String, Boolean, Array, 扁平对象，即那些能够被 JSON 直接表示的数据结构。
   *  JSON.stringify(一个promise)=>{}
   * 环形克隆
      function cloneDeep(obj) {
        var cacheMap = new Map()
        return clone(obj)
        function clone(obj) {
          if (cacheMap.has(obj)) {
            return cacheMap.get(obj)
          }
          var ret = {}
          cacheMap.set(obj, ret)
          for(let key in obj) {
            let val = obj[key]
            if (typeof val == 'object') {
              ret[key] = clone(val)
            } else {
              ret[key] = val
            }
          }
          return ret
        }
      }

## Debug

  * debugger  在调试代码最前面加一个断点 debugger；
  * 在 sources 栏里面鼠标指定断点位置；
  * google 同一时间同一个页面只能 debugger 一个地方
  * 在 sources 栏里面 snippet 选项里可以执行代码（Ctrl + enter），也可以格式化代码
  * try{throw }catch(e){}finally{}
    * 在一段代码可能有异常时使用
    * try 是必要语句，后面两个至少需要一个
    * 如果整体代码有语法错误，则所有的代码都不会执行
      因为 js 代码的启动有以步骤：
        词法解析
        语法解析
        执行
    * try 语句：里面是填写 js 代码，
       - 里面可以接 throw 语句，抛出自己填写的报错信息（一般抛出 throw new Error(""))，并且 try 里面的执行语句终止，catch 的变量 e 会接收这个错误；throw 会在离自己最近的 try 语句中生效
    * catch: 如果 try 语句里面有错误，catch 会返回错误的具体信息；需要一个变量 e 来接收错误，e 只在自己的 catch 语句中生效
      变量 e 有几个属性，e.stack 调用栈信息；e.message 具体的错误原因；e.name: 错误类型函数
    * finally：里面的代码永远可以运行，不管前面有没有错误
    * function hasValue(root, val) {
        try {
          traverse(root)
          return false
        } catch(e) {
          if(e===true){
            return true
          }
          return e
        }
        function traverse(root) {
          if (root) {
            if (root.val == val) {
              throw true
            }
            traverse(root.left)
            traverse(root.right)
          }
        }
      }

  * 严格模式：在作用域的顶部写上"use strict"  该作用域里面的代码就可以按照严格模式执行；但是并不能要求作用域里面嵌套的作用域按照严格模式执行；
    https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode
    在严格模式下，以纯函数形式调用函数时，this 不是 window，而是 undefined
    在严格模式下禁用了一些本身就有问题的语句（如 with 语句）
    在严格模式下函数不能有重复的形参
    严格模式 8 进制以 0o 开头，不能以 0 开头，会报错
    严格模式不能给原始数据类型添加属性，会报错
    严格模式下 eval 语句不能为上层范围 (surrounding scope, 注：包围 eval 代码块的范围）引入新变量，只能在 eval 语句内部自己用；
    一些 ES6 语法自带严格模式，如 class
  * eval 语句是将字符串当做代码解读，如 eval("'use strict'; var x = 42; ")
    eval 具有动态作用域的特性，可以访问调用位置的变量
    eval 换个名字就会变成全局方法；  run  = eval  ; run("console.log(a)") ; run 只会读取全局变量 a，而不读取局部的 a
  * 测试框架：  describe 函数

## 对象

 * 数组是值的有序集合
   对象是值的具有名字的集合
 * 对象的相关方法
   - Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用  for...in 循环遍历该对象时返回的顺序一致。
   - for in 的迭代顺序
      - 先按照大小顺序迭代整数属性名
      - 之后迭代其它属性，按照添加顺序
   - Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）, 这个方法也可以用于数组和字符串
    const obj = { foo: 'bar', baz: 42 };
    console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
   - Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
      const target = { a: 1, b: 2 }
      const source = { b: 4, c: 5 }
      const returnedTarget = Object.assign(target, source)
      console.log(target) =>{ a: 1, b: 4, c: 5 }
      console.log(returnedTarget) => { a: 1, b: 4, c: 5 }
   -Object.getOwnPropertyDescriptor(obj, propertyName)
   返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

 * 当一个对象和原始数据类型==对比时，会调用对象上面的valueOf方法,其返回值进行对比  

 * null 和 undefined 没有属性，其它所有数据类型的值都有属性
 * 包含函数的属性称为某个值的方法
 * obj【表达式】：表达式的返回值作为对象选中的属性名，也可以传递一个变量；obj【变量】
   object.property
   object['property'] 注意里面是个字符串
 * 现代引擎中，关键字 / 数值 做为对象属性名也可以不加引号
   {	1:2, 0: 3, for: 8, while: 9, foo: 10, "2abc": 3, 'hello world': 9}
 * 用 == 或者 === 判断对象是否相等时，只有两个对象都指向同一个内存地址的对象实体才为 true，其它的即使两个对象内容，值一样但是指向的对象实体不一样会返回 false；
   而原始数据类型 Number ，String，Boolean 作相等比较时只比较值，而不管指向地址
 * obj1 = obj2   这句代码是使 obj1 指向 obj2 的对象实体，所以 obj1 === obj2；这种情况改变对象实体里面的内容，两个对象都发生了改变
 * 原始数据类型 Number，String，Boolean 的值是固定的，不能再添加属性，但是添加了也不会报错
 * 原始数据类型 Number，String，Boolean 直接当做对象来添加属性"XX"时，会短暂的生成一个新的对象 A, 在 A 中添加属性"X"，之后 A 会被清理掉；当要读取这个添加的属性"X"时，又会短暂的生成一个新的对象 B, 在 B 中读取属性"X", 返回 undefined，之后 B 被清理掉；
   如：123.ab = 1    会在 A 对象中添加 ab 属性，之后消失
   console,log(123.ab)  会在 B 对象中寻找 ab 属性，返回 undefined
* 包装对象：1 个真实的对象包装了一个原始数据，如 Objiect() 函数强行将其他类型转化为对象； Object(1);Object("123"})
  原始对象 / 原生对象：直接声明的对象   ；asd = {}
* 全局作用域中只有一个全局对象 window, 所有的全局属性都在 window 对象里面，window 对象的任何属性都指向属性本身，window 对象的 window 属性指向 window 对象本身
  window.window===window
  window.console===console
* 对象的浅对比：=== 是作浅比较，只检查左右两边是否是同一个对象的引用
  对象的深对比：不仅是同一个对象的引用，而且是同一个链表

## 数组

  * 判断两个纯数字数组里面的内容是否相同，先 array.sort(function(a,b){return a - b})  从小到大排序，再 join() 转化为字符串作全等判断
  * 数组相关方法
    * arr = Array.from(arrlike)  从一个（类似）数组或可迭代对象中创建一个新的，浅拷贝的数组实例
    * Array.isArray(arr) 判断 arr 是否是数组
    * arr.fill(value ，start，end) 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
    * arr.flat(depth)    flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中 的元素合并 为一个新数组返回；depth 默认 1
    * arr.includes(value) 方法用来判断一个数组是否包含一个指定的值，也可以判断是否有 NaN，根据情况，如果包含则返回 true，否则返回 false。注意：对象数组 [{},{}] 不能使用 includes 方法来检测。
    * arr.indexOf() 返回下标，不能判断 NaN，会返回 -1
    * find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
      findIndex() 方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回 -1。
    * reduceRight() 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
    * some() 方法测试是否至少有一个元素可以通过被提供的函数方法。该方法返回一个 Boolean 类型的值。
      every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
    * 数组的toString方法[1,2,3].toString()=>'1,2,3'  
  *  ES6 数组去重的最佳实践：Set 结合 Array.from()
      var  a = [1,1,2,2,4,4]
      var  b = new Set(a)
      var  c = Array.from(b) =>[1,2,4]
      var  d = b.size  =>3（不同项个数）
  *  数组的高阶函数作为方法调用时（each,map,every 等等）, 可以加一个参数表示为第一个参数的他 this
     [1,2,3].map(f(),obj)=>obj 是 f() 的 this
  * 数组的冒泡排序最优解   每次把最值放到最后
    function swap(ary, i, j) {
    if (i != j) {
      var t = ary[i]
      ary[i] = ary[j]
      ary[j] = t
    }
    }
    function bubbleSort(ary) {
      for(var j = ary.length - 2; j >= 0; j--) {
        var swapped = false
        for(var i = 0; i <= j; i++) {
          if (ary[i] > ary[i + 1]) {
            swap(ary, i, i + 1)
            swapped = true
          }
        }
        if (!swapped) {
          break
        }
      }
      return ary
    }
  * 数组的归并排序
    function mergeSort(ary) {
      if (ary.length < 2) {
        return ary
      }
      var mid = ary.length >> 1
      var left = ary.slice(0, mid)
      var right = ary.slice(mid)
      mergeSort(left)
      mergeSort(right)
      var i = 0
      var j = 0
      var k = 0
      while(i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          ary[k++] = left[i++]
        } else {
          ary[k++] = right[j++]
        }
      }
      while (i < left.length) {
        ary[k++] = left[i++]
      }
      while (j < right.length) {
        ary[k++] = right[j++]
      }
      return ary
    }
  * 数组的选择排序 每次遍历将最小值放到前面
    function swap(array, i, j) {
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
    }
    function selectSort(ary) {
        for (let i = 0; i < ary.length - 1; i++) {
            var minPos = i
            for (let j = i + 1; j < ary.length; j++) {
                if (ary[minPos] > ary[j]) {
                    minPos = j
                }
            }
            swap(ary, i, minPos)
        }
        return ary
    }
  * 数组的插入排序（将无序的部分插入到有序部分），利用排序二叉树，先将数组转化为排序二叉树，再   将二叉树遍历得到排序数组
    function insertIntoBST(root, val) {
    if (!root) {
        return new TreeNode(val)
    }
    if (root.val <= val) {
        root.right = insertIntoBST(root.right, val)
    } else {
        root.left = insertIntoBST(root.left, val)
    }
    return root
    }
    function bstSort(ary) {
        let root = ary.reduce(insertIntoBST, null)
        let i = 0
        inOrderTraverse(root, val => { ary[i++] = val })
        return ary
    }
  * 数组的原地快速排序
    对应所有元素完全相同的数组，性能退化为 n*n , 调用栈深度为 n
    方法： 数组中随机取一个数 s 和最后一位交换位置；双指针从头开始遍历数组，快指针遇到比 s 小的就和慢指针交换位置，如此就可以遍历一遍后比 s 小的都在 s 左边，s 相当于排序了。然后递归操作
    function quickSort(ary, start = 0, end = ary.length - 1) {
    function swap(array, i, j) {
        if (i != j) {
            let t = array[i]
            array[i] = array[j]
            array[j] = t
        }
        return array
    }
    if (end - start <= 0) { return ary }
    let pivotIndex = start + Math.random() * (end - start + 1) | 0
    let pivotNumber = ary[pivotIndex]
    swap(ary, pivotIndex, end)
    let i = start, j = start
    for (; j < end; j++) {
        if (ary[j] < pivotNumber) {
            swap(ary, i, j)
            i++
        }
    }
    swap(ary, i, end)
    quickSort(ary, start, i - 1)
    quickSort(ary, i + 1, end)
    return ary
    }
  * // 排序前后不改变相同元素的相对位置，则称为稳定的排序算法
    // 反之，则为不稳定的
    // 不稳定的排序算法：选择排序，就地快排
    // 稳定的排序算法：冒泡，归并，插入排序，bst 排序
  * 数组的 sort 方法
    function qSort(ary, compare) {
    return quickSort(ary, compare)
    // 分治 divide and conquer
    function quickSort(ary, compare, start = 0, end = ary.length - 1) {
      if (end - start <= 0) {
        return ary
      }

      var pivotIndex = Math.floor(Math.random() * (end - start + 1) + start)
      var pivot = ary[pivotIndex]

      swap(ary, pivotIndex, end)

      var i = start
      for(var j = start; j < end; j++) {
        if (compare(ary[j], pivot) < 0) {
          swap(ary, i, j)
          i++
        }
      }

      swap(ary, i, end)

      quickSort(ary, compare, start, i - 1)
      quickSort(ary, compare, i + 1, end)

      return ary
    }
   }

## 循环

  * for 循环中 var 定义的变量是循环所在作用域变量，即作用域里面循环后面的代码可以引用 i 的值
    如果想变量只对 for 循环生效，用 let 定义 for 循环的变量，let 定义的变量属于严格模式，只在对应的区域块生效。
  * for in 循环
    for(let 变量 in obj){}  将对象里面的属性名依次赋值给变量，每赋值一次循环一次
  * for of 循环   遍历可迭代对象定义要迭代的数据。
    for...of 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

## 链表结构

  * 每个结点存储下一个点的位置的数据结构
    易增删，难查找，不连续占用内存
  * 数组转化为链表
    * 方法 1
      * 首先遍历数组一次创造 n 个节点对象 node，value = Arr[i],next = null,node 全部 push 到数组 nodes 中
      * 接着再遍历数组 nodes 一次，将节点链接在一起，nodes[i].next=nodes[i+1]
    * 方法 2
      * 创建一个头部节点，使其 next 属性指向下标为 i 的节点，一次循环下去
      function arrTolist(arr) {
        let head = {
            value: undefined,
            next: null
        }
        let remmber = head
        for (let i = 0; i < arr.length; i++) {
            node = {
                value: arr[i],
                next: null
            }
            head.next = node
            head = node
        }
        return remmber.next
    }
    * 方法 3 递归
      * function arrayToList(arr){
           if(arr.length==0){
              return null
            }
            return {
              value:arr[0],
              next:arrayToList(arr.slice(1))
            }
       }
  * 链表转化为数组
    *   function listToArray(list){
          let result = []
          while(list != null){
              result.push(list.value)
              list = list.next
          }
          return result
       }

    *  function  listToArray2(list){
          if(list == null){
              return []
          }
          let tail = list.next
          return [list.value,...listToArray2(tail)]
       }
  * 在某个节点前面插入一个值为 value 的新节点 (index 是下标号）
    function insert(list, index, value) {
      if (index < 0) {
        index = 0
      }
      下标小于 0 时就相当于 0
      if (!list) {
        return {
          value: value, next: null
        }
      }
      如果 list 是空节点，那就是在 null 前面加入一个新节点，index 只能为 0，返回其值
      if (index == 0) {
        return {
          value: value,
          next: list
        }
      }
      如果 index 为 0，即在 list 前面加一个节点
      var head = list    用 head 保存头节点
      var idx = -1    用 idx 记录下标

      while (idx != index - 1 && list.next) {
        idx++
        list = list.next
      }
      如果下标没有到达目标位置且 list.next 不为 null
      循环 idx 递增，list=list.next

      list.next = {
        value: value,
        next: list.next,
      }
      指针到达目标位置时，list.next 指向新节点，新节点又指向原来 list.next 的值
      return head
    }
  *  链表的反转
    反转 head 后面的链表，再把反转的链表指向 head
    var reverseList = function (head) {
    if (!head || !head.next) { return head }
    let newHead = reverseList(head.next)
    head.next.next = head
    head.next = null
    return newHead
    };
  * 链表的归并
    * 循环
      function mergeTwoLists(l1, l2) {
      let hummy = new ListNode()
      let hummy2 = hummy
      while (l1 && l2) {
          if (l1.val < l2.val) {
              hummy2.next = l1
              l1 = l1.next
          } else {
              hummy2.next = l2
              l2 = l2.next
          }
          hummy2 = hummy2.next
      }
      hummy2.next = l1 || l2
      return hummy.next
     }
     * 递归
      var mergeTwoLists = function (l1, l2) {
      if (!l1 || !l2) {
          return l1 || l2
      }
      if (l1.val < l2.val) {
          l1.next = mergeTwoLists(l1.next, l2)
          return l1
      } else {
          l2.next = mergeTwoLists(l1, l2.next)
          return l2
      }
      }
  * 链表的排序
    先递归二分再归并
    var sortList = function (head) {
      if (!head || !head.next) {
          return head
      }
      let hummy = new ListNode()
      hummy.next = head
      let slow = hummy
      let fast = hummy
      while (fast && fast.next) {
          slow = slow.next
          fast = fast.next.next
      }
      let left = head
      let right = slow.next
      slow.next = null
      left = sortList(left)
      right = sortList(right)
      function mergeTwoLists(l1, l2) {
          let hummy = new ListNode()
          let hummy2 = hummy
          while (l1 && l2) {
              if (l1.val < l2.val) {
                  hummy2.next = l1
                  l1 = l1.next
              } else {
                  hummy2.next = l2
                  l2 = l2.next
              }
              hummy2 = hummy2.next
          }
          hummy2.next = l1 || l2
          return hummy.next
      }
      return mergeTwoLists(left, right)
  };

## 哈希表

  * 解决哈希表冲突
    - 扩容：数组中位置占用率超过某个值后数组扩容
    - 开放地址法：用两个数组，一个储存 key 一个储存映射值
    - 链表储存：数组储存链表，下标相同的 key 储存在同一个链表中，链表储存 key,value,next 3 个值
    - 多个哈希函数换着用：发生冲突换另外一个哈希函数
  * 哈希表的查找效率 O(1)  将 keys 通过哈希函数转化为独一无二的数值储存在数组中，空间换时间。
  * 哈希表的应用
    md5;sha1；对文件进行哈希映射
    垃圾邮件过滤，利用计算机中的位图结构
    位图：指一个由 0 和 1 组成的超大数组 [0,1,0,1,1,1,0......]

## 二叉树

*  完全二叉树在数组中表示
   对于下标为 i 的节点对于的左节点为 2i+1, 右节点为 2i+2
   对于下标为 n 的节点，其对应的父节点为 Math.floor((n-1)/2)

*  二叉树的排序插入
   var insertIntoBST = function (root, val) {
    if (!root) {
        return new TreeNode(val)
    }
    if (root.val > val) {
        root.left = insertIntoBST(root.left, val)
    } else {
        root.right = insertIntoBST(root.right, val)
    }
    return root
    };
*  利用二叉树对数组排序
   向将数组转化为排序二叉树（左边的节点一定比右边小），再中序遍历二叉树，将值储存在数组中就是排序的结果
   function bstSort(ary) {
    var root = ary.reduce(insertIntoBST, null)
    k = 0
    inOrderTraverse(root, val => {
      ary[k++] = val
    })

    return ary
  }
*  前中后序遍历
  前序遍历  根节点 左子数 右子数     看书看过的顺序
    function preOrderTraverse(root, action) {
    if (root) {
      action(root.val)
      preOrderTraverse(root.left, action)
      preOrderTraverse(root.right, action)
    }
  }
  中序遍历  左子数 根节点 右子数     看书看过一半的顺序   由左往右扫描
     function inOrderTraverse(root, action) {
    if (root) {
      inOrderTraverse(root.left, action)
      action(root.val)
      inOrderTraverse(root.right, action)
    }
  }
  后续遍历  左子数 右子数 根节点      看书看完的顺序
     function postOrderTraverse(root, action) {
    if (root) {
      postOrderTraverse(root.left, action)
      postOrderTraverse(root.right, action)
      action(root.val)
    }
  }

* 将数组转化为二叉树
  *方法一： 递归
   function arrayToTree(array, rootPos = 0) {
    if (array[rootPos] == null) {
        return null
    }
    return {
        val: array[rootPos],
        left: arrayToTree(array, rootPos * 2 + 1),
        right: arrayToTree(array, rootPos * 2 + 2)
    }}
   *方法二 队列  创造一个储存数组，先进先出，使用 shift 和 push 方法达到效果
    function arrayToTree2(array) {
    if (array.length == 0) { return null }
    let root = new TreeNode(array[0])
    let nodes = [root]
    for (let i = 1; i < array.length; i++) {
        let current = nodes.shift()
        if (array[i] != null) {
            let node = new TreeNode(array[i])
            current.left = node
            nodes.push(node)
        } else {
            current.left = null
        }
        i++
        if (i == array.length) {
            break
        }
        if (array[i] != null) {
            let node = new TreeNode(array[i])
            current.right = node
            nodes.push(node)
        } else {
            current.right = null
        }
      }
      return root}

* 将二叉树转化为数组
  * 方法一  递归
    function treeToArray(root, pos = 0, result = []) {
    if (root) {
        result[pos] = root.val
        treeToArray(root.left, pos * 2 + 1, result)
        treeToArray(root.right, pos * 2 + 2, result)
    }
    return result}
  * 方法二 层次遍历 队列   队列里面没有值时循环结束
    function treeToArray2(root) {
    if (root==null ) { return [] }
    let result = []
    let nodes = [root]
    while (nodes.length) {
        let current = nodes.shift()
        if(current){
            result.push(current.val)
            nodes.push(current.left,current.right)
        }else{
            result.push(null)
        }
    }
    while(result[result.length - 1] === null) {
        result.pop()
    }
    return result}
  * 方法三  层次遍历
    function treeToArray3(root) {
      if (root) {
        var result = [root.val]
        var nodes = [root]
        while (nodes.length) {
          var curr = nodes.shift()
          if (curr.left) {
            result.push(curr.left.val)
            nodes.push(curr.left)
          } else {
            result.push(null)
          }
          if (curr.right) {
            result.push(curr.right.val)
            nodes.push(curr.right)
          } else {
            result.push(null)
          }
        }
        while(result[result.length - 1] === null) {
          result.pop()
        }
        return result
      }
    }

## 堆（Heap）

 * 堆内存：对于大小无法确认的数据，计算机储存其内存地址，其本体储存在堆内存中
   栈内存（空间）：指储存正在等待调用返回函数的局部变量的一片的内存，其储存是连续的，大小是确定的
   调用栈：函数之间互相调用的逻辑关系
 * 堆是一种数据结构，也叫优先队列（PriorityQueue），和堆空间没有任何关系
 * 堆的结构
   * 堆是一个完全二叉树
   * 每个节点都比其子节点要大（小）
   * 根节点一定是最大（最小）值
 *  对于堆，主要支持两种操作
   * 往堆里面增加元素
   * 从堆里面取出其最值
   * 两种操作都要保证堆的结构
 * 代码
   大堆
   class deap {
    constructor(nums) {
        this.elements = nums
        this.heapfy(nums)
    }
    add(val) {
        this.elements.push(val)
        this.heapUp(this.elements.length - 1)
    }

    heapUp(currIdx) {
        while (currIdx > 0) {
            let pIdx = (currIdx - 1) >> 1
            if (this.elements[pIdx] < this.elements[currIdx]) {
                this.swap(pIdx, currIdx)
                currIdx = pIdx
            } else {
                break
            }
        }
    }
    // 将某个节点的父节点调整为堆，且保持整个堆结构

    heapdown(currIdx, end = this.elements.length) {
        while (currIdx < end) {
            let maxIdx = currIdx
            let leftIdx = currIdx * 2 + 1
            let rightIdx = leftIdx + 1
            if (leftIdx < end && this.elements[leftIdx] > this.elements[maxIdx]) {
                maxIdx = leftIdx
            }
            if (rightIdx < end && this.elements[rightIdx] > this.elements[maxIdx]) {
                maxIdx = rightIdx
            }
            if (this.elements[maxIdx] != this.elements[currIdx]) {
                this.swap(maxIdx, currIdx)
                currIdx = maxIdx
            } else {
                break
            }
        }
    }
    // 将某个节点调整为堆，且保持整个堆结构
    heapfy() {
        let curr = (this.elements.length - 2) >> 1
        for (let i = curr; i >= 0; i--) {
            this.heapdown(i)
        }
    }
    // 从不是叶子节点开始进行倒序 headdown 操作，得到了整个堆结构数组

    swap(i, j) {
        let temp = this.elements[i]
        this.elements[i] = this.elements[j]
        this.elements[j] = temp
    }

    SortArray(arr){
      this.heapify(ary)
      for(var i = ary.length - 1; i > 0; i--) {
      this.swap(ary, i, 0)
      this.heapdown(0)
      }
    return ary
    }

    push(val){
      this.elements.push(val)
      this.heapUp(this.elements.length - 1)
    }
    // 在末尾添加元素

    pop(){
      var result = this.elements[0]
      var last = this.elements.pop()
      if (this.elements.length == 0) {
        return result
      }
      this.elements[0] = last
      this.heapdown(0)
      return result
    }
    // 取出堆顶

## 回溯算法

  * 有条件的穷举，当有条结果满足结束条件时将其记录下来
  * depth first search  尝试所有可能，符合条件走下一步，不符合条件回到上一步，直到所有符合条件的路径都尝试
  * 回溯条件：判断是否进行下一步的条件
  * 结束深度搜索条件：深度搜索结束，将一种可能结果记录下来
  * 删除路径：找到满足条件的路径后删除最后一步寻找更多的可能
  * // leetcod 77 78 17 22
    // 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合
    var combine = function (n, k) {
        let res = []
        if (n < k) {
            return res
        }
        function backtrack(result, n, k) {
            if (result.length === k) {
                res.push(result.slice())
                return   // 结束条件，返回上一层
            }
            for (let i = n; i > 0; i--) {
                result.push(i)
                backtrack(result, i - 1, k)   深度搜索
                result.pop()  找到满足条件的路径后删除最后一步寻找更多的可能
            }
        }
        backtrack([], n, k)
        return res
    }

## 算法技巧

  * 进制转换
     var n = 3123
     while(n > 0){
       var digit = n % 2
       console.log(digit)
       n = (n - digit)/2
     }
  *  判断素数的简化方法
      - 遍历到根号 n 即可
      - 前面再加一些判断缩小范围，比如能不能被 2,3,5，7 等整除
      var isPrime = function(n) {
      if (n < 2) {
        return false
      }
      var sqrt_n = Math.floor(Math.sqrt(n))
      for(var i = 2; i <= sqrt_n; i++) {
        if (n % i == 0) {
          return false
        }
      }
      return true
    }
      -  利用正则表达式判断
       function isPrime(n) {
         return !/^(?=(.{2,})\1+$)/.test('x'.repeat(n))
       }
    * 素数两性定理
      把素数分为 6 列，素数全部存在于第 1 列和第 5 列（2 和 3 除外）；第 2，4 列全部能被 2 整除。第 3，6 列全部能被 3 整除
    * 算法中递归优雅易懂，但是耗时；超时可以转化为循环语句
    * 记录递归深度的技巧
      depth = 0
      var levelOrder = function(root) {
          depth++
          if (root) {
              if (depth in result) {
                  result[depth].push(root.val)
              } else {
                  result[depth] = [root.val]
              }
              levelOrder(root.left)
              levelOrder(root.right)
          }
          depth--
      }
  * 递归下降，解析语法数
    leetcode 1106. 解析布尔表达式
  var parseBoolExpr = function(expr) {
    var i = 0
    return parse()
    function parse() {
        if (expr[i] == 't') {
            i++
            return true
        }
        if (expr[i] == 'f') {
            i++
            return false
        }
        if (expr[i] == '!') {
            return parseNot()
        }
        if (expr[i] == '&') {
            return parseAnd()
        }
        if (expr[i] == '|') {
            return parseOr()
        }
    }

    function parseNot() {
        i += 2
        var value = parse()
        i++
        return !value
    }

    function parseAnd() {
        i += 2
        var result = true
        while (true) {
            var value = parse()
            result = result & value
            if (expr[i] == ')') {
                i++
                break
            }
            if (expr[i] == ',') {
                i++
            }
        }
        return result
    }

    function parseOr() {
        i += 2
        var result = false
        while (true) {
            var value = parse()
            result = result || value
            if (expr[i] == ')') {
                i++
                break
            }
            if (expr[i] == ',') {
                i++
            }
        }
        return result
    }
  }

## ES6 相关知识

   * https://leanpub.com/understandinges6/read#leanpub-auto-default-values-in-modules
   * ES6 标准里形参的声明都是默认为用 let 声明
   * 剩余参数（参数 1， ... 剩余参数）只能写在最后
      function addEntry(squirrel, ...events) {
          return {
          squirrel: squirrel,
          events: events,
          }
        }
   * 参数的默认值 （属性 = 默认值）
      function slice(array,start = 0,end = array.length){}
   * 展开运算符 (... 将数组两边的【号和】号中合掉）  不能单独使用，作为参数使用
      Math.max(...[1,2,3]) == Math.max(1,2,3) =>3
   * class 语法 ，也就是构造语法糖
     将一类功能对象封装；class 类名{}
     * 这样写的好处
      - 里面的方法默认是不可枚举的
      - 不使用 new 会报错
      - 方便继承
     *  constructor() {}  构造函数
        static 用来定义一个类的一个静态方法。调用静态方法不需要实例化该类，但不能通过一个类实例调用静态方法；方法放在类上而不是实例 this, 减少原型链压力
        各种方法直接写在{}里面
        里面不要加，号和；号
     * class B extends A     B 类继承 A 类
       B.prototype._proto_ === A.prototype
       B._proto_ === A
       B 类可以直接用 A 的方法，注意不要命名和父类的同名方法，会覆盖父类方法，原型污染
       super()  调用父类构造函数，先构造一个父类的实例，然后将 this 绑定到这个实例上，所以 super() 调用之前不能使用 this
       继承时在构造函数中需要调用 super，super 相当于父类的构造函数，后面也可以直接接父类的方法 super.method
       B 类如果不写构造函数也行，会默认写
       constructor(...arg) {
         super(...arg)
       }

   * class A {
          static a(){}
          static b(){}
          constructor(){}
          method1(){}
          method2(){}
          get length(){}
          set length(val){}
      }

  * class Queue {
        static from(ary) {
            var q = new Queue()
            for (var val of ary) {
                q.add(val)
            }
            return q
        }

        constructor(initVals) {
            this._head = null
            this._tail = null

            for (var val of initVals) {
                this.add(val)
            }
        }

        add(val) {
            var node = {
                val: val,
                next: null,
            }
            if (this._head == null) {
                this._head = this._tail = node
            } else {
                this._tail.next = node
                this._tail = node
            }
            this._size++
            return this
        }

        remove() {
            if (!this._head) {
                return undefined
            }
            this._size--
            var node = this._head
            this._head = this._head.next
            if (this._head == null) {
                this._tail = null
            }
            return node.val
        }

        get size() {
            return this._size
        }
    }

   * 解构语法
    [a,b]=[b,a]  a 和 b 互换位置
    {a，b} = {a:1,b:2} 拿到 a 和 b
   * 模板字符串 ``
     - 用反引号（``）来表示，模板字符串可以包含特定语法（${expression}）的占位符；
       `${354}a${6}sfdf${12}safs${5+2}daf${2*1}dsaf` => "354a6sfdf12safs7daf2dsaf"
     - 模板字符串开头如果有一个函数表达式，该函数称为模板字符串的标签函数，它会在模板字符串处理后被调用
       fun `${354}a${6}sfd\f${12}\sa${5+2}da${2*1}df`
     - 标签函数 fun 的 arguement 为
       第一个元素为一个数组，里面是由占位符分割的字符串组成的，再加上 raw 属性，占位符
       [["","a","sfdf","sa","da","df",row:["","a","sfd\f","\sa","da","df"]],
        "354","6","12","7","2"
       ]
     - 在标签函数的第一个参数中，存在一个特殊的属性 raw ，我们可以通过它来访问模板字符串的原始字符串，而不经过特殊字符的替换。
  * 伪调用  可以优化调用栈，防止爆栈
     function(){
       var a = 1
       return g(a)
     }
  * 模块的导入导出
    * 模块的导出
      - export var color = "red";
      - export function sum(num1, num2) {
            return num1 + num1;
        }
      - export class Rectangle {
            constructor(length, width) {
                this.length = length;
                this.width = width;
            }
        }
    * 模块的导出  import { identifier1, identifier2 } from "./example.js";
      import {color，sum,Rectangle} form path
    * 模块的导入和导出都需要写在最外层作用域，不能嵌套到其它作用域，方便静态分析
    * 可以设置一个默认的导出，当导入一个没有的模块名时就导入这个默认的
      export default function(num1, num2) {
        return num1 + num2;
      }
    * 要引入到 type 为 module 的 script 标签里<script type = 'module'>
  * 私有属性的实现
    如果一个对象还有指针指向，它就不会被垃圾回收
    弱引用，如果一个对象仅仅被 weakMap/WeakSet 内部指向时，它可以被垃圾回收
    var C = (function(){
      var classProperties = new WeakMap()
      return class A {
        constructor(name, age) {
          var _this = {}
          _this.age = age
          _this.name = name

          classProperties.set(this, _this)
        }
        getName() {
          var _this = classProperties.get(this)
          return _this.name
        }
      }
    }())
    var c = new C()
    c = null
  * Proxy代理
    对对象属性的读取设置(get,set)，方法调用等等的拦截  

## 高阶函数

   * forEach 函数
     * 源代码
      function forEach(array,action){
      for(let i = 0;i< array.length;i++){
          action(array[i], i, array)
      }}
     array.forEach(function(){}) 方法从头至尾遍历数组，为每个元素调用指定的函数。
     action 最多可以传递 3 个有效的参数 (arr[i]，索引，数组），修改原数组只能通过第二个和第三个参数修改
     forEach 只有一个参数时，即每个元素的处理函数。
     <!--  var numbers = [1, 2, 3];
      numbers.forEach(x => console.log(x));
      // 同等于
      numbers.forEach(function (x) {
          console.log(x); -->

   * filter 函数   返回新数组
      * 源代码
      function filter(array, test) {
      let result = []
      for (let i = 0; i < array.length; i++) {
      if (test(array[i], i, array)) {
          result.push(array[i])
      }}
      return result}
      array.filter(function(){})  filter 函数的作用是遍历该集合，然后将该集合中符合某些特定条件的元素组成新的数组，并返回该新数组。
      test 最多可以传递 3 个有效的参数 (arr[i]，索引，数组）
      filter 只有一个参数时，即判断所有元素是否符合条件的处理函数。
      <!--  var digits = [1, 4, 5, 10, 15]
      var even = digits.filter(function (number) { return number % 2 == 0 })
      console.log(even))
      // [4, 10] -->

   * map 函数  返回新数组
     *源代码
    function map(array, mapper) {
    let result = []
    for (let i = 0; i < array.length; i++) {
        result.push(mapper(array[i], i, array))
    }
    return result}
     array.map(function(){})  对数组的每个元素调用定义的回调函数并返回包含结果的数组
     mapper 最多可以传递 3 个有效的参数 (arr[i]，索引，数组）
     map 只有一个参数时，及给出映射关系的处理函数
      <!-- var array = [16,25,36];
      array.map(Math.sqrt);
      //array = [4,5,6]

      var array = [11, 22, 33, 44, 55];
      console.log(array.map(function (n) { return n % 10 }))
      //array = [1,2,3,4,5] -->

    * reduce 函数 返回最终运算的结果
      * reduce 源函数
          function reduce(arr, reducer,initalVal=arr[0] ) {
            var  i = 0
            if (argument.length===2){
              i=1
            }
            for (; i < arr.length; i++){
                initalVal = reducer(initalVal,arr[i]，index,arr)
            }
            return initalVal
          }
      * reduce 可以接受 3 个参数，数组（作为数组的方法时可以省去），reducer 函数，初始值（不设置时默认为数组第一项）； reducer 是必要参数，其它可选
      * 执行函数 reducer 接受 4 个参数，initalVal（上一次执行结果，第一次为初始值）arr[i] 数组的第 i 项，数组下标，数组本身（作为数组的方法时可以省去）；initalVal 和 arr[i] 是必要参数，其它可选

      Array 的 reduce() 把一个函数作用在这个 Array 的 [x1, x2, x3...] 上，这个函数必须接收两个参数，reduce() 把结果继续和序列的下一个元素做累积计算，其效果就是：
      [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
     <!--  var arr = [1, 3, 5, 7, 9];
      arr.reduce(function (x, y) {
      return x + y;
      }); // 25 -->

    * sort 函数
      用于数组的排序，返回值大于 0 交换位置，其它位置不变
      array.sort(function(a,b){return a - b})  从小到大排序
      array.sort(function(a,b){return b - a})  从大到小排序

    * bind: 绑定 this 和参数 ，参数传多了只接受前面的参数，后面的参数无效；且 this 只能绑定一次，多次绑定不生效
      apply: 设定 this 和参数，参数以数组形式传入
      call: 设定 this 和参数，参数不能以数组的形式传入
      如果只绑定参数而不指定 this, 通常将 this 设置为 null，新的绑定函数不使用 this 即可

    function myBind(thisArg, ...fixedArgs){ <!-- thisArg 是 this 要绑定参数，fixedArgs 是其它的参数 -->
      let self = this <!-- 谁调用了这个函数谁就是 this -->
      return function bound(...arguments){
        fixedArgs.push(...arguments)<!-- 合并其它参数 -->
        if(new.target=== bound){
          return new self(...fixedArgs)

        <!-- 如果是构造函数调用了 mybind 函数，提供的 this 就会被忽略，thisArg 会被忽略掉；其它的参数会参与绑定，并且返回一个新的构造函数 -->

        }else{
        return self.apply(thisArg,fixedArgs)
        }
      }
    }

## 对象原型

  * 基本关系
    几乎任何对象有原型的‘原型’指用来查找属性的 fallback 对象：obj.__proto__/Object.getPrototypeOf(obj)，称为“原型”
    每个函数（且一般只有函数才有）都有一个原型属性指的是 F.prototype（我的实例的原型），称为“原型属性”

    函数的原型是函数的构造函数的原型属性
    Function.__proto__ ===Function.prototype
    String.__proto__ ===Function.prototype
    Number.__proto__ ===Function.prototype
    Object.__proto__ ===Function.prototype

  * 构造函数 var f =  new Function()
    - new 运算符会进行如下的操作：
        创建一个空的对象 A{}，A 的原型是构造函数 F 的原型属性
        将 this 绑定到新创建的对象 A，并且用指定的参数调用构造函数修改该对象。
        如果该函数没有返回值，则返回 this
        如果该函数有返回值但是返回的不是对象时，还是返回 this
        如果该函数返回的是对象时，返回该对象
    - new.target === 构造函数
      new.target 属性允许你检测函数或构造方法是否是通过 new 运算符被调用的。在通过 new 运算符被初始化的函数或构造方法中，new.target 返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是 undefined。
    - new 的优先级比较高，比。号高
    - new 后面接一个函数时，如果函数没有参数直接调用，（）可以省去

  * 原型

      - 每个函数的原型属性默认指向空的对象{}，该空对象的原型是 Object.prototype
        f.prototype -> {} -> Object.prototype -> null

      - constructor 属性 ，该属性指向了用于构造此实例对象的构造函数。
        Foo.prototype.constructor === Foo
        f1.__proto__.constructor === Foo

      - 判断一个值的原型是谁就看其本身是什么类型，然后找到其类型的构造函数的原型属性
        Object.getPrototypeOf([1]) ===  Array.prototype
        Object.getPrototypeOf({"a":2}) ===  Object.prototype
      - null ,undefined 没有原型
      - Object.prototype 的原型是 null, 一般也认为其也没有原型

      - JS 原生的几个构造函数的原型属性是其第一个实例，历史遗留问题
        Object.prototype.toString.call(String.prototype)==="[object String]"
        Object.prototype.toString.call(Function.prototype) === "[object Function]"

  * 可以通过 Object.prototype.toString.call（类型）判断数据类型，会返回"[object 数据类型】"
    （这种判断方式只能判断原生类型，自己写的构造函数创建的实例都会返回"[object Object]")
    Object.prototype.toString.call([]) ==="[object Array]"
    Object.prototype.toString.call(null) === "[object Null]"
    Object.prototype.toString.call(undefined)==="[object Undefined]"
  * instanceof  判断一个对象是不是构造函数的实例  person instanceof Person
    可以在原型中寻找判断
  * typeof 用来判断原始数据类型
    Object.prototype.toString.call 用来判断内置对象类型
    instanceof 用来判断自定义对象类型（构造函数）

  * this
    * 当一个函数以方法的形式被调用时，如 array.length，函数的 this 就是调用它的对象
    * 以纯函数形式调用时，this 就是 window    f()
    * 但用 new 来调用 this 时，this 就是那个新建的对象； 如构造函数；
    * this 永远不能被赋值，即 this 不能写在等号左边
    * this 永远指向一个对象，如果指向了一个原始数据类型会将原始数据类型包装成对象
    * 箭头函数不会创建自己的 this, 它只会继承自己的作用域链的上一层作用域的 this 对象

  * this 的丢失问题
    this 指向调用的对象与函数声明的位置无关，只与调用位置有关，如果在调用位置还使用声明位置的 this，this 会丢失；解决方法通过 bind 绑定 this 或者通过箭头函数，箭头函数的 this，总是指向定义时所在的对象，而不是运行时所在的对象。

  * 不能通过操作对象来改变对象的原型的属性，可以直接操作对象的原型
     obj.__proto__. 属性名 = 属性值

  * Object.getPrototypeOf(obj) == obj.__proto__
    Object.prototype 所有原型对象的根，其没有原型
    Function.prototype 所有函数原型的根
    Array.prototype 所有数组原型的根
    Function.prototype 的原型是 Object.prototype , 函数不是 Object 的属性，函数原型属性的原型指向 Object 的原型属性
    Array.prototype 的原型是 Object.prototype，数组不是 Object 的属性，数组原型属性的原型指向 Object 的原型属性

  * Object.create（新创建对象的原型对象）  即为新创建的对象指定一个原型对象
    person2 = Object.create(person1) 为 person2 设置原型 person1
    Object.getPrototypeOf(person2,person1) 为 person2 设置原型 person1

  * js 中有可枚举属性和不可枚举属性的区分，不可枚举属性不可以通过 for/in 循环访问
    in 运算符判断对象及其原型中是否有对应的可枚举属性，for/in 循环也可以访问到原型中的可枚举属性
    hasOwnProperty() 方法只访问自身的属性，不访问原型； map. hasOwnProperty("toString")
  * Object.defineProperty() 为对象添加有特殊性质的属性；定义是否可被枚举属性，可被写，可被重新设置等等；
    Object.defineProperty(obj ,"asd" ,{ get: function(){return this.a*this.b} , set: function(val){console.log(val)}})

  * get 和 set 方法
    * 在对象中指定属性的读取函数和修改函数，属性在读取和修改时会分别调用 get 和 set
    * 使用方法  obj  = {a:1 ,b:2, get asd(){return this.a*this.b},set asds(val){console.log(val)}  set 不能有返回值
    * 调用方法  obj.asd，get 有返回值 ；  obj.asds=123123    set 一定要赋值
    * 都可以通过 Object.defineProperty() 添加到对象中
      Object.defineProperty(obj ,"asd" ,{ get: function(){return this.a*this.b} , set: function(val){console.log(val)}})

  * 面向对象的含义
    * 封装：把表达一个事物的信息及对其可能进行的操作（即函数）放在一起。
        放在一起最终形成
        // class 描述一类事物
        // object 描述某一类物事的具体个体

       同一类对象都有相同的一组属性和一组函数

    * 继承：让一个类直接获取另一类的所有属性和方法（重用已经写好的代码）

    * 多态：不关心得到的事物具体是什么类别，更这个事物是否有某方面的特性（有特定的一组属性和方法）
      例如对象，数组等都有 toString 方法，我们可以不关心调用这个方法的类型和调用结果，大家都可以用 toString 这个接口调用到自己想要的结果

## 正则表达式 (Reg)

  * 目的：作字符串的模式匹配
  * 一种领域特定语言（DSL/Domain specific language）, 可以在多种语言和工具中使用，是一种对象
  * 创建方法
    - var reg1 = new RegExp("abc"，"ig") 构造函数
    - var reg2 = /abc/ig   直接量 / 字面量
    - re1 = /foo\nbar/    字符串的语法（\n;\t）在正则表达式字面量里面不生效   /foo\nbar/
      re2 =  new RegExp("foo\\nbar")  构造函数里面有回车功能，所以需要加、转义   /foo\nbar/
    - 如果正则表达式里面有自己的特殊符号语法时（如 + * ？等等），需要转义
  *  new RegRxp("") => /(?:)/    特例，不匹配任何内容
     /(?:)/.exec("asd") =>["", index: 0, input: "asd", groups: undefined]

  * 相关方法
    * test      /ab\d/.test("ab5sd")=>true   判断正则表达式和字符串是否匹配
    * exec    /\d+/.exec("one two 100")=>  ["100", index: 8, input: "one two 100", groups: undefined]  无法匹配返回 null，否则返回一个表达字符串信息的对象

  * 相关属性
    * source 表示正则表达式的源代码  /asdf/.source=>"asdf"
    * lastIndex  表示正则表达式下一次匹配的起始位置，默认为 0，只有启用了全局 g 才可以使用；
      匹配成功后把 lastIndex 的值变为匹配位置（index）的后一个位置，下一次匹配从 lastIndex 位置开始；匹配失败变为 0；
      由于 lastIndex 的该特性，在全局模式下 text,exec,replace 方法的匹配位置都会受到影响，要小心使用
    * dotAll 表示。号是否代表所有的符号
    * ignoreCase 忽略大小写，缩写为 i
    * sticky  要求每一次匹配必须从上一次匹配结束之后的位置（lastIndex）开始匹配（缩写为 y ）
    * multiline 表示可换行，缩写为 m
    * unicode 表示通过 16 进制 unicode 编码匹配，缩写 u
    * flags: 表示 i,g，m,y.u 等这些属性集合

  * 匹配字符集 []
    \d : [0-9]      \D：前者取反
    \w:[0=9a-zA-Z\_]  数字字母加上一个下划线  \W：前者取反
    \s : 任意空白的字符  \S: 前者取反
    .  : 除了换行符以外的任意符号
    [^] : 可以取���所有的符号，包括换行符；^ 在这里是取反的意思

    - [] 里面的特殊字符都没有特殊含义，仅仅代表一个普通字符 [+ * . ? 等等】
    - [] 开头可以加一个脱字符 ^      /[^01]/ 表示非 0 和非 1 ；  /^01/ 表示字符串的起始位置为 0；

  * 相关规则
   * 重复
      只对前面紧挨着的一个字符或者一个组生效
        - "+"号，出现多次
        - "*" 号 出现任意次数
        -  "?" 出现 0 次或者 1 次
        -  {n}  出现 n 次  {2,4}  2 到 4 次  ； {4,}4 次及以上
    * 贪婪匹配
      由于正则表达式的回溯机制，每个正则符号都会首先尝试匹配最多的内容然后再回头，这种模式就是贪婪匹配
    * 非贪婪匹配
      和贪婪匹配相反，每个正则符号尽可能匹配少的内容，只有在剩余部分没办法完成匹配时才会匹配更多的内容
      表示方法： 在重复操作符后面加上？即变为非贪婪匹配（+?;*?;??;{}?;）
    * 匹配 unicode 码对应的字符（开启 16 进制 unicode 模式配合、u 使用）
       /\u{6211}/u.test("我")=>true
       /[\u{6211}-\u{7411}]/u.test("是")=>true

   * 分组
     - 使用（）号，里面的内容会当作一个整体，（）里面匹配到内容单独添加到相关方法的返回值里的行为叫做捕获，也叫捕获分组

     - 非捕获分组：在（）内部前面加上？：  即变为 (?:), 非捕获分组的内容会当作一个整体，但是（）里面匹配到的内容不会添加到相关方法的返回值里

     - 为分组取名：(?<name>)  在括号前面加上一个？号和尖括号，名字写在尖括号里面，命名的分组信息会出现在返回值的 group 属性里面；（在旧的浏览器无法使用）
      /(?<year>\w\d)/.exec("adasd2313")=>["d2", "d2", index: 4, input: "adasd2313", groups: {…}]
      /(?<year>\w\d)/.exec("adasd2313").groups =>{year: "d2"}

     - 分组的后向引用
       "韩朵朵 李依依".match(/.(.)\1/g)=>["韩朵朵", "李依依"]
       "ABBA ABBB".match(/(.)(.)\2\1/g)=>["ABBA"]
        正则表达式里面的、n 代表的是对第 n 个分组的重复引用 （1<=n<=9）

   * 匹配
     - 使用分组匹配到的内容也会出现到数组中
        /foo(bar)(bas)baz/.exec("foobarbasbazaaa")=>["foobarbasbaz", "bar", "bas", index: 0,input: "foobarbasbazaaa", groups: undefined]
      - 如果分组没有匹配到字符串，在数组对应的元素是 undefined
        /foo(bar\d)?baz/.exec("foobaz")=> ["foobaz", undefined, index: 0, input: "foobaz", groups: undefined]
      - 如果分组匹配到了多个元素，那么数组中只有最后一个匹配项
        /foo(bar\d)+baz/.exec("foobar1bar2bar3baz")=>["foobar1bar2bar3baz", "bar3", index: 0, input: "foobar1bar2bar3baz", groups: undefined]

   * 零宽断言
      零宽断言：匹配两个符号之间的一个位置而不是一个符号（宽度为零）
      匹配发生时，光标不会移动，所以可以对同一个位置执行多个零宽断言匹配，只有当每个断言都成功时才可以
      有 4 种零断言：
      (?=expr) 正预测零宽断言，这个位置的右边满足 expr  /er(?=ads)/.exec("aqqweradssd")=>["er", index: 4, input: "aqqweradssd", groups: undefined]
      (?!expr) 负预测零宽断言，这个位置的右边不满足 expr  /(?!f..)aa/.exec("aafafffffax")=>["aa", index: 0, input: "aafafffffax", groups: undefined]
      (?<=expr) 正回顾零宽断言，这个位置的左边满足 expr（旧版 JS 不支持）
      (?<!expr) 负回顾零宽断言，这个位置的左边不满足 expr（旧版 JS 不支持）

    *单词和字符串边界
      ^ === /(?<![^])/  字符串的开头  左边不出现任何字符
      $ === /(?![^])/   字符串的结尾   右边不出现任何字符
      \b === /(?<=\w)(?=\W)|(?<=\W)(?=\w)|(?<![^])|(?![^])/   左边是字符右边不是 或者 左边不是字符右边是 或者 字符串开头 或者  字符串结尾
       单词边界是字符串的开始或者结束位置，也可以是任意单词（/w）和任意非单词字符（/W）之间的位置
      下面。号左右两边都是单词边界，因为"."是、W, 而其左右两边都是、w, 他们中间就是单词边界
      "bar.baz".match(/\b\.\b/)=>[".", index: 3, input: "bar.baz", groups: undefined]

    * 字符串和正则表达式相关的方法
      -match, 不考虑正则表达式的 lastIndex 属性。
        当正则表达式有 g 标志的时候，匹配出所有能够满足整条正则表达式的内容，不会把分组捕获到的内容也放入结果数组
        当没 g 标志的时候，匹配出第一条能满足的内容，同时把分组捕获到的内容也放入结果数组

      - replace(RegExp|String, String|Function)
        两个参数都是字符串：匹配第一次出现的内容为目标内容，不会修改原字符串
        首参为正则
        次参为字符串，里面的 $&,$1,$2~$9 是特殊内容，表示匹配到匹配到的内容以及各个分组捕获到的内容
        次参为函数，把整个匹配到的内容以及各分组捕获到的内容传给函数做为参数，把函数返回值插入被替换位置，有多少次匹配，函数就会调用多少次

      -re.exec(str) 方法
        如果 re 不带 g 标志，则完全等同于 str.match(re)
        如果 re 带有 g 标志，则从 str 的 re.lastIndex 位置开始查找，查找成功后把 re.lastIndex 置为匹配位置的后一个位置
        查找不成功的时候，返回 null，把 lastIndex 置为 0

      -str.split(String|RegExp)
        当参数是字符串时，按字符串把原字符串拆成数组
        当参数为正则时，按正则把原字符串拆成各部分的数组，但是
        当正则里有捕获分组时，分组捕获到的内容也会出现在结果数组的相应位置

     * https://regex101.com/    debug 正则表达式网站
       https://regexper.com/    查看正则表达式流程图

## Date

  * i18n  internationalization   国际化
    i10n  localization   本地化
  * JS 中月份从 0 开始，日期是从 1 开始（坑）
  * 时间戳  1970 年距离现在多少毫秒；1970 前的时间用负数表示  d.getTime() 获取到现在的毫秒时间
  * Date.now() 当前时间戳
  * moment.js  https://momentjs.com/
    最常用的日期库

## 模块

 * Function 构造器生成的 Function 对象是在函数创建时解析的，所有被传递到构造函数中的参数，都将被视为将被创建的函数的参数，并且是相同的标示符名称和传递顺序；
   这种方式比 eval 好的地方是可以传递参数
   var sum = new Function('a', 'b', 'return a + b');console.log(sum(2, 6)); =>8
 * 直接调用函数表达式
   var add = function(a,b){return a +b}((1,2))
   (function add (a,b){return a +b})(1,2) 加（）将函数声明语句变成表达式，然后再调用
 * IIFE： immediately invoked function expression  立即执行函数表达式
   两种常用的模块方案
    - CommonJS     require 函数
    - AMD          define 函数
 * require 函数
    require.moduleCache = {} 创造 1 个映射来储存缓存
    function require(path) {
    if (require.moduleCache.hasOwnProperty(path)) {
      return require.moduleCache[path]
    } // 判断目标模块是否在缓存中
    var code = new Function('module, exports', readFile(path)) // 根据路径创造新的函数，新的函数有 modele 和 exports 两个参数
    var module = {exports: {}}   //exports 是 module 的属性
    require.moduleCache[path] = module.exports  模块循环引用时提前缓存可以防止爆栈，也能为 module.exports 添加东西（没有循环引用可以省略）
    code(module, module.exports) // 调用 code 函数，修改了局部变量 module 的 exports 属性值
    require.moduleCache[path] = module.exports  将结果储存在映射对象里
    return  module.exports  返回结果
  }

    function readFile(path) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', path, false)
      xhr.send()
      return xhr.responseText
    }  // readFile 函数将目标路径里面储存的函数以字符串的形式返回

  * 模块加载性能问题
    * 模块的相互依赖会形成树状结构，模块过多会导致加载时间慢
    * 解决方法
      * 方法 1
         找到所有路径的 require 调用，加载入口模块并递归解析其所有的依赖，并收集所有的源代码，映射在一起 Map(path:sourceCode), 再正常运行 require 函数；
      * 方法 2
         通过 define 函数；将路径放到 script 中加载，同时触发路径里面 define 函数（拿到模块函数），建立模块函数的缓存 Map(path:modFuncCache)，再正常运行 require 函数（这种情况都可以不用函数构造器，已经有模块函数的缓存；而且可以跨域请求资源，利用了 scrip 标签的跨域性能）
      * 方法 3
         通过 webpack 实现自动生成模块函数，其本质和上面是一样的，找到所有的缓存，然后通过 node.js 里面的 fs 模块自动生成一个新的模块函数 js 文件
    * 为什么 ajax 请求不能跨域而 link script img 标签可以
      link script img 引用外部文件拿不到外部文件的源代码，而是直接信任该资源直接执行，所有这些标签可以跨域引用资源
      ajax 请求是直接拿到外部文件的源代码信息，浏览器的同源策略认为服务器不信任非同源的客户端，所有会阻止源代码信息的传递，这个是 ajax 不能异步跨域的原因

## generator 生成器函数

   * 必要构成，1 个*号和 yield 运算符
     function * gen(){
      a = yield 1;b = yield 2;c = yield 3;d = yield 4;
     }
      var g1 = gen() //g1 就是 1 个生成器
      g1.next()//=>{value: 1, done: false}             此时函数暂停在第一个 = 号右边
      g1.next(88)//=>{value: 2, done: false}           此时函数暂停在第二个 = 号右边，完成上一个 = 号赋值，a=88
      g1.next(99)//=>{value: 3, done: false}           此时函数暂停在第三个 = 号右边，完成上一个 = 号赋值，b=99
      g1.next(77)//=>{value: 4, done: false}           此时函数暂停在第四个 = 号右边，完成上一个 = 号赋值，c=77
      g1.next(55)//=>{value: undefined, done: true}    此时函数运行完毕，完成上一个 = 号赋值，d=55
   * next 属性返回一个对象，里面 value 是当前 yield 后面的值，done 表示当前生成器有没有运行完
   * yield: yield 的运算结果是生成器 next() 里面的参数
   * return()；结束函数
     g1.return(8)=>{value: 8, done: true}         此时函数从上一个暂停的地方立即停止，返回一个值
   * throw() 此时函数从上一个暂停的地方抛出一个错误，需要一个 try{}catch{}语句配合使用，try{}catch{}语句里面的函数没有运行，try{}catch{}语句结束后下面的代码继续执行
   * 生成器的嵌套
     还是按照顺序执行，遇到嵌套的生成器会进入生成器执行其代码，一步一步执行完该生成器后接着执行外面的代码，直到整个代码执行完毕
     function * gen(){
     a = yield 1;b = yield *g2;c = yield *g3;d = yield 4;
     }
   * ... 可以展开生成器得到一个生成器 value 属性值的数组集合
     [...g1] = [1,2,3,4]

   * for of 可以直接拿到生成器里面的 value 属性值
       for( let   nums of g1){}  => nums 依次为 1,2,3,4,

   * symbol
     * symbol ES6 里添加得到一种原始数据类型，不能用 new 调用，表示是一个唯一的值（符号）, 类似一个对象，但是 symbol 可以作为对象的属性名，这个也是其主要作用；
     var a = symbol() ,b = symbol()
     a === b =>false
     symbol 也无法进行隐式类型转换，会报错
     a + 2  会报错

     * symbol.iterator  Symbol.iterator 为每一个对象定义了默认的迭代器。该迭代器可以被 for...of 循环使用。
        var myIterable = {}
          myIterable[Symbol.iterator] = function* () {
              yield 1;
              yield 2;
              yield 3;
          };
         [...myIterable] // [1, 2, 3]
     * 一些内置类型拥有默认的迭代器行为，如 Array，String,Map，Set,TypeArray，可以直接使用 for of 循环调用

     * symbol.for（为 symbol 取名）
      a = Symbol.for("aa")；b  = Symbol.for("aa")；a ===b
     * symbol实现私有属性
        (function(){
          var age = Symbol()

          window.People = class People {
            constructor(name, gender, theAge) {
              this.name = name
              this.gender = gender
              this[age] = theAge      
            }
            getAge() {
              if (this.gender = 'f') {
                return 18
              } else {
                return this[age]
              }
            }
          }
        }()) 

## DOM Document Object Model

  * 浏览器解析 HTML 时，会先将其解析为语法树（通过递归下降或者栈解析），该语法树就是 DOM 树，也就是 DOM 模型；我们通过操作 DOM 模型来操作 web 页面
  * 节点 Node 是构成网页的基本部分，常见的节点有文档节点（document 9）元素节点（element 1）属性节点（attribute 2）文本节点（text 3）
    节点的 nodeType 属性，用一个数字常量表示节点类型
    节点的 nodeName/tagName 属性，表示其是什么标签名 （大写）
  * property : DOM 对象的属性
    Attribute:HTML 元素的属性
  * document.documentElement === <html>
    document.head === <head>
    document.body === <body>
  * dataset     操作元素的 data- 属性
    classlist   操作元素的 class 属性
  * DOM 元素的 innerHTML, outerHTML, innerText, outerText  比如对于这样一个 HTML 元素：<div>content<br/></div>
      innerHTML：内部 HTML，content<br/>；    HTML 标签内部的源代码
      outerHTML：外部 HTML，<div>content<br/></div>； HTML 标签自身的源代码
      innerText/ outerText：内部文本，content ； HTML 标签内部的 text 文本，文本样式受 CSS 影响
      TextContent: 内部文本，保留回车位，不受 CSS 影响
  * 浏览器的 re-layout（回流）不是 DOM 文档修改后立即执行，而是等所有的 js 代码执行完毕后再执行回流
    因为浏览器每个时刻都只能做一件事情
     1 执行 js 代码
     2 计算布局
     3 绘制页面（现代浏览器每 16.66 毫秒都会重新绘制一遍，即 60 帧每秒）
  * querySelectorAll; element/document.querySelectorAll()
    1 选择器是全局匹配 (), 只要参数里面的选择器全局匹配到的节点在 this 里面都会记录下来
    2 可以选择一部分伪类
    3 不可以是伪元素
    4 返回的对象不是动态变化的
    querySelector  只返回第一个匹配的元素，没有返回 null
  * requestAnimationFrame(function)
    告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
    回调函数 function 会被传入调用时间作为参数
  * 虚拟 dom
    * 用一个对象或者字符串表示真实 dom 结构信息
    * 每次操作真实 dom 会拿到变更后的虚拟 dom
    * 虚拟 dom 和上一次的虚拟 dom 作对比，得到差异
    * 直接在真实 dom 上变更差异部分
    * 现代框架都是这个原理，通过操作数据来操作虚拟 dom，从而更改真实 dom，性能比直接操作 dom 更好，操作也更方便

## 事件

   * 事件处理器
     浏览器和外部进行交互时触发的处理函数
   * element.addEvenListener（事件名，处理函数，option)  为元素添加事件处理器
     options 可选
     一个指定有关 listener 属性的可选参数对象。可用的选项如下：
     capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
     once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
     passive: Boolean，设置为 true 时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。

     <p onclick = "foo()"> 代码只在全局作用域运行
     element.onclick = function(){} 绑定函数可以处于任何作用域  会覆盖前一种的绑定
     后两种方法只能添加一种事件处理器，因为每个节点只有一个 onclick 属性，addEvenListener 可以添加任意数量事件处理器，函数可以写在任何作用域 ，不会覆盖 html 中的事件

   * element.removeElementListener（事件名，处理函数） 移除处理器，注意移除的处理函数和之前添加的处理函数是同一个才可以移除，所有需要用一个变量记录函数指向
   * Event 是一个全局事件对象，触发事件时该对象会传递给处理函数，浏览器同一时刻只有一个事件运行
     Event.which 针对键盘和鼠标事件，这个属性能确定你到底按的是哪个键
     Event.type  返回事件名
     Event.keyCode  记录那个键被按下，返回对应的 unicode 码（大写字母）
     Event.key 记录那个键被按下，返回对应的键（小写字母）
     Event.Propagation 阻止事件传播到下一个元素（调用该元素上后面的事件处理器还是会执行）
     Event.ImmediatePropagation 阻止事件传播到下一个事件处理器（调用该元素上后面的事件处理器不会会执行）
     Event.deltaY 表示鼠标滚轮的滚动方向，小于0向上滚动
     Event.target/Event.srcElement  指事件的来源节点，即发生交互位置的元素（最里面的最内层的元素）
     事件代理 / 事件委托：在外部节点添加一个事件处理器，并根据 target 属性判断事件来源，这样可以把内部共用的事件绑定到外部
   * element.match（选择器） 判断某个元素是否匹配某个选择器
   * 传播 : 同一个事件触发了多个处理函数
     window > document>html>body>element  由大到小，由外到内
     捕获阶段： 由外到内，默认不触发，触发需要加 true ；element.addEvenListener（事件名，处理函数，true)
     目标阶段： 最里面的触发事件元素
     冒泡阶段： 由内到外，默认触发
     传播路径：由捕获阶段到目标阶段，目标阶段里面的处理函数按照代码顺序执行，不区分捕获和冒泡，之后是冒泡阶段；传播过程中遇到没有时间处理器的元素会跳过该元素继续执行
   * 按键事件（keydown,keyup,keypress）只能在有焦点的元素上触发，没有焦点的元素可以通过 tabindex 获取焦点
   * 鼠标事件（mousemove,mouseover,mouseout)
     现在用 mouseenter/mouseleave 来代替 mouseover,mouseout，因为这两个事件不会冒泡，进入到子元素也不会触发 mouseleave，更符合语意；
     *elements.click()  触发 click 事件，可以触发除默认交互之外的交互行为
     * elements.dblclick()  触发双击事件前会触发两次单击事件
     *Event.which 表示哪一个鼠标按钮被按下，
      0 表示无，1 表示左键，2 表示中键，3 表示右键；
      无法表示组合鼠标键，此属性总是只展示最先按下去的键
     *Event.buttons 表示哪些鼠标按钮被按下，
      它的二进制形式的最低位表示左键 (001)，第二位表示右键 (010)，第三位表示中键 (100)
      所以同时按下中键和右键将会得到 6，依此类推 (100 | 010 = 110)
   * 滚动事件（scroll)
      Element.scrollHeight: 这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容
      Element.scrollTop 属性可以获取或设置一个元素的顶部到视口可见内容（的顶部）的距离；当一个元素的内容没有产生垂直方向的滚动条，那么它的 scrollTop 值为 0。
      Window.scrollTo 滚动到文档中的某个坐标。
      Element.scrollBy(x,y)  设置元素里面的滚动水平垂直移动的 px
      滚动事件"scroll"的 preventDefault 无法阻止滚动，因为该事件处理器是在滚动之后才触发的，  mouseWheel/DOMMouseScroll 这两个也是滚动事件，可以设置 passive: false 阻止滚动
      window.addEventListener('mousewheel/touchmove', f, {
      passive: true// 告诉浏览器将不会在事件处理函数中调用 preventDefault，浏览器可以事件处理函数运行的同时，就开始执行默认事件（最典型的情况即为滚动页面），使滚动更流畅（浏览器少数可以边解析边渲染的地方）
      })
   * 长度相关
     - element.offsetWidth/element.offsetHeight 元素空间大小  包含边框
     - element.clientWidth/element.clientHeight  元素空间大小  不包含边框
     - element.getBoundingClientRect 返回一个对象，表示元素 4 个方位到视口左上角垂直距离
     - element.getClientRect 用于分行的元素，每行都有一个结果，返回数组
     - innerHeight  窗口高度
     - document.body.scrollHeight  整个页面高度
     - pageYOffset/scrollY 当前滚动位置
     - Event.clientX/clientY 鼠标相对于视口的位置
     - Event.pageX/pageY 鼠标相对于文档的位置
   * 焦点事件
     * focus/blur 不会冒泡
       focusin/focusout 会冒泡
       window.onfocus/blur  窗口也有焦点事件
       elements.foucs() 使元素获得焦点
   * 加载事件
     * window.onload 是在页面所有资源加载完成时触发，包括 css, 图片，脚本等等；常用于页面构建完成时使用 load 进行初始化
     * 浏览器遇到<script>标签会立即执行，之后再执行下面的代码；因为 js 代码里面可能会有 DOM 操作，这样不同的执行时刻页面有不同的显示，所以浏览器都是立即执行
       所以大型网站一般都把<script>标签放到后面；
       <script async src =""> <script defer src = "">为有 src 属性的 script 加上 async 或者 defer 属性会使 script 在页面加载完成之后执行
       CSS 代码写在前面，这样遇到标签就可以渲染其样式
     * load 事件是在所有外部资源加载完成时触发，而 DOMContentLoaded 是在 DOM 解析完就触发，所以我们现在都用更快的 DOMContentLoaded
       beforeunload 事件，关闭页面或者跳转链接时触发
     * readystatechange 事件    当文档的 readyState 属性发生改变，readystatechange 事件会被触发。
       document.readyState === "complete" 表示 DOM 解析完，可以替代 DOMContentLoaded。兼容性更好
    * 脚本执行时间线
       * 很多事件都会触发脚本（程序）执行，同一文档中无法同时执行 2 个脚本（CSS3 动画除外，其可以继续持续执行）
       * js 是单线程语言，但可以使用 Worker 函数将耗时的操作放到后台运行，其可以独立文档主程序运行；
          worker 之间不能共享数据，只能通过事件"message"与 postMessage 来发送消息，所发送的消息是复制之后发送过去的，所有修改接收到的消息是不会改变源消息的；
          worker 内不能访问 dom, 以及任何与 UI 相关的接口
    * 时间定时器
      * setTimeout 设置函数多少毫秒后调用  其返回值是一个任务号数字
        clearTimeout（number） 清除该任务，不在调用队列里
        var number = setTimeout(fun,time)
      * setTimeout  最快也要将其调用栈里面的代码执行完毕之后再调用函数，即使时间设置为 0；
      * setInterval/clearInterval 设置函数每隔多少毫秒调用
    * 事件防抖（降低事件多次连续迅速触发，如 mousemove，scroll)
      * debounce 防抖函数
        function debounce(f,time){
          let timeId = null
          return function(...argments){
            clearTimeout(timeId)
            var timeId=setTimeout(f(argments),time)
          }
        }
        只有在连续时间内，不在触发频繁事件后的 time 秒后，执行真正的回调，如输入联想
       * throttle 节流函数
        function throttle(f, duration) {
          var timerId
          var lastRunTime = 0
          return function(...args) {
            clearTimeout(timerId)
            var now = Date.now()
            if (now - lastRunTime > duration) {
              f(...args)
              lastRunTime = now
            } else {
              timerId = setTimeout(() => {
                f(...args)
                lastRunTime = Date.now()
              }, duration)
            }
          }
        }
        以一定的频率触发，降频；如鼠标滚动
         理解上述函数注意 setTimeout 里面的函数调用时修改局部变量影响其他事件是否触发

    * 创建自定义事件
      Events 可以使用 Event 构造函数创建如下
      var event = new Event('build');
      elem.addEventListener('build', function (e) { ... }, false);
      elem.dispatchEvent(event)  （触发改事件）

## 表单和表单域

  * 表单域中的内容更改时会触发 change 事件，但只有在光标移出输入框（失去焦点）才会触发，并且通过 js 修改文本不会触发该事件；
    如果在输入过程中就触发其改变，就可以使用 keydown/keyup/keypress/input 事件
  * document.forms 文档中所有的表单元素
    document.all 文档中所有的元素以及 id 映射
    document.images 文档中所有的图片元素
    document.links 文档在所以的链接元素
    document.activeElement  执向当前获得焦点的元素（默认指向 body 元素）
  * draggable = "true"  设置标签是否可以拖拽
  * 表单的 elements 属性指向其所有的内部元素 form.elements
    表单的内部元素的 form 属性指向表单元素  element.form
  * selectionStart/selectEnd  光标选择文字范围，返回下标
    selectionStart = selectEnd =length 指定光标在某个位置
  * input 标签和 textarea 标签里面内容是 text 时，这两个标签都有一个 value 属性（在其 set 方法里），可以通过修改 value 属性的值更改文本内容
  * paste/cut/copy 事件
    compositionstart/compositionend  输入法输入时触发 / 输入完成时触发  可以用于汉字
  * select 标签有个 options 属性可以访问其内部所有的 option 标签
    每个 option 标签都有一个 selected 属性表示自身是否被选中（true/false）, 也可以通过这个属性操作 option 是否被选中
    select.value 表示当前选择的 option 元素的 value/textContent
    select 标签上面加上 multiple 属性表示可以多选（要配合 ctrl 使用 ）
  * <input type = "file">
    input.files 表示所有选中的文件类数组对象，其中每一个文件 file（ input.files[0]）都有 name，size,type 等等属性
    FileReader 构造函数接口，配合 load 事件，调用实例的 readAsText 方法，实例的 result 属性会接受读取结果
    function getFileContent(file, done) {
      var reader = new FileReader()

      reader.addEventListener('load', function() {
        done(reader.result)
      })

      reader.readAsText(file)
    }
    URL.creatObjectURL(file) 为文件创建一个地址，可以被其它元素访问的地址
  * localStorage 保存数据的对象，使用方法类似 Map, 里面的值会保存直到其被重写或者清除掉；每个域名都有自己的 localStorage 属性，大小一般最大 5 兆，相同的域名 localStorage 属性通用
    localStorage.setItem(item,value)
    localStorage.getItem(item)
    localStorage.removeItem(item)
    sessionStorage 和 localStorage 用法一样，但是它只保存数据到浏览器关闭，不会触发 onstorage 事件
  * window.onstorage 会在 localStorage 发生变化时触发
    window.hashchange 会在 location.hash 发生变化时触发
    window.onresize 会在窗口大小发生变化时触发
  * FormData接口提供了一种表示表单数据的键值对的构造方式，经过它的数据可以使用 XMLHttpRequest.send方法送出
    var formData = new FormData()
    formData.append("username", "Groucho");
    formData.append("accountnum", 123456)
    var request = new XMLHttpRequest()
    request.open("POST", "http://foo.com/submitform.php");
    request.send(formData)
## jQuery

  * 各种版本引用的网络地址 https://www.bootcdn.cn/jquery/

## swiper

  * 轮播图库
    https://idangero.us/swiper/demos/

## base64

  * 64 进制编码
    0 —— 9  10
    a —— Z  52
    +  /     2
  * 早期电子邮件附件的编码传递
  * data uri   将数据 64 位编码
  * 全字母解码 （atob）
    全字母编码  （btoa）
  *DataURL 把数据直接编码进了 url 里面。可以通过 base64，也可以直接把数据的原始文本直接放进 url 中

# 计算机网络

## 计算机网络的基础知识

  * ip 地址的分类
    *IP 地址是按照地区划分
    * A 类地址第 1 字节为网络号，其它 3 个字节为主机号。 A 类地址的网络号第一位固定为 0，网络号只有 7 位可以使用，可以指派的网络号是 2^7-2 = 126 个。
      B 类地址的前两个字节为网络号，后两个字节为主机号。
      C 类地址的前三个字节为网络号，最后一个字节为主机号
  * 带宽：单位时间内通过网络的数据量
    延迟：传播需要的时间
  * 常用协议端口号
    http:80
    DHCP:67
    DNS: 53
    FTP：21
    NTP: 123  Network Time Protocol  网络时间协议，用于时间同步，基于 UDP 协议
  * 域名：域名就是为 IP 地址起的名字；IP 地址不好记，可以用域名代表 IP 地址
  * VPN  Virtual Private Network
    * VPN 相当于给每个内部设备配置了一个虚拟网卡，用与内部设备的通信
    * 每个内部设备可以连接总部的 VPN 服务器，通过服务器获取接收数据
    * 加密性高
  * IPv6
    * 128bite 长度，是ipv4的4倍，可以有 2**128 个 ip 地址
      升级推广难，少数几构使用，目前用 NAT 路由器这种方式
      现在的推广的方式是在 IPv6 地址传播过程中把其包裹在 ipv4 的数据里，只在起始和结束位置将 ipv6 解析出来
  * 基于 UDP 的协议：dhcp/dns/ntp    低延迟
    基于 TCP 的协议：http/ftp/tls/ws/socks5  可靠性高
  * socks 协议
    SOCKS 是一种网络传输协议，主要用于客户端与外网服务器之间通讯的中间传递；当防火墙后的客户端要访问外部的服务器时，就跟 SOCKS 代理服务器连接。这个代理服务器控制客户端访问外网的资格，允许的话，就将客户端的请求发往外部的服务器。
  * PAC 代理自动配置 proxy auto-config
    控制网络流量是否走代理服务器
  * 加密算法的类型
    *对称加密
      - 加密和解码用到是同一个密码
    *非对称加密（RSA）
      - 加密和解码用的是不同密码
        密钥是一对（公钥加密，私钥解密；私钥加密，共用解密）

  * URL(Uniform Resource Locator)
    HASH:URL 的位置标识符，跟在＃符号后面的 URL 部分，包括＃符号
      * 是用来指导浏览器动作的，对服务器端完全无用。所以，HTTP请求中不包括#
      * 改变#不触发网页重载发送请求
      * onhashchange事件
      * 改变#会改变浏览器的访问历史
    ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
    │                                              href                                              │
    ├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
    │ protocol │  │        auth         │          host          │           path            │ hash  │
    │          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
    │          │  │                     │    hostname     │ port │ pathname │     search     │       │
    │          │  │                     │                 │      │          ├─┬──────────────┤       │
    │          │  │                     │                 │      │          │ │    query     │       │
    "  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
    │          │  │          │          │    hostname     │ port │          │                │       │
    │          │  │          │          ├─────────────────┴──────┤          │                │       │
    │ protocol │  │ username │ password │          host          │          │                │       │
    ├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
    │   origin    │                     │         origin         │ pathname │     search     │ hash  │
    ├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
    │                                              href                                              │
    └────────────────────────────────────────────────────────────────────────────────────────────────┘
  * XSS 跨域整个站点的脚步攻击  Cross Site   Scripting
    永远不要把用户输入的东西当做代码执行，可以通过转义客户文本执行
    CSRF 跨站请求伪造  cross site request forgery
      - 浏览器会自动发送其它页面的 cookie 到对应服务器（历史遗留问题）
          现在该问题已经解决，浏览器现在默认不会对跨域请求发送cookie
      - 通过 referer 头验证请求来源
      - 添加校验 token
      - 通过js发送请求，有跨域限制

## 计算机网络的分层结构

  * 物理层 ：只发送 0 和 1
    * 网卡：是一块被设计用来允许计算机在计算机网络上进行通讯的计算机硬件。 拥有 MAC 地址，它使得用户可以通过电缆或无线相互连接
    * modern 猫  调制解调器 （数字信号和模拟信号的转换）
    * 曼彻斯特编码： 加倍信号跳变频率，网络设备支持的频率是固定的，对应减半传播数据大小
    * ipconfig /all ， ifconfig 查看网络配置

  * 链路层：将比特数据流进行分组，完成从比特到以太网帧的服务（令牌环 / 总线型结构 / 交换机三种传播结构）
      - 以太网帧：链路层传播的数据包
          前导码：对码，确认传播编码方式
          帧开始符：表示帧的开始
          MAC 目标地址 /MAC 源地址：MAC 地址设备出厂时就确认了；
          负载：发送的具体数据，占有以太网帧大部分内存；MTU: 最大传输单元
          冗余校验：核对负载数据的正确性
          以太类型：协议类型（ARP/HTTP 等）
      - 局域网：可以理解为同一交换机 / 令环牌 / 总线结构内部网络设备之间的网络
      - 网关：局域网的出口，网关地址的网络号要和子网的 ip 地址的网络号一样才可以访问广域网
      - 令牌环：效率低
      - 总线型结构：所有的网点和同一条总线连接
          网卡的 MAC 地址：Media Access Control  介质访问控制；每个网卡都有独特的 MAC 地址，在总线传输中可以识别表明自己的身份
          集线器：将所有的网络设备的网线连接到总线的设备
          载波帧听，多路访问：总线上同一时刻只有一个网络设备的数据传输，所有同一总线上的其它网络设备发送数据到总线时需要检查总线上是否有传输任务
          指数退避：网络设备会按照指数倍时间等待排队（1,2,4），这样总线空闲几率大
          缺点：只有一根总线，网络设备较多时效率低
      - 交换机：一台机器，多个接口连接网络设备，可以识别每台连接的网络设备的 MAC 地址；
          ARP 协议：address resolution protocol, 将 ip 地址转化为 MAC 地址并记录对应关系，命令行 arp -a 可查看所有记录
          抓包软件：wireshark，抓取以太网帧数据包
          ARP 欺骗：假冒广播寻找的 IP 地址；网管交换机：记录每个网口对应的 ip 地址，MAC 地址，防止欺骗
          ARP 风暴： 高频率发送 ARP 广播，占用网络资源
          ping: 在命令行输入 ping ip 地址，查看和目标地址是否可以互动
          子网掩码：转化为 2 进制，前面全 1，后面全 0,1 对应的 ip 地址部分是网络号，0 对应主机号；网络号相同的在同一个局域网里面；如 192.168.88.2/255.255.255.0   192.168.88.2/24
          网络地址：ip 地址与子网掩码做与运算，结果就是网络地址

  * 网络层 ：多个网络点之间的中转和传输，机器到机器
      - 路由器：多个接口连接不同的子局域网，每个接口的 IP 地址（网关地址）不一样；
      - 路由表：网关发过来的 ip 地址会进入路由器内部的路由表，其指导后续的网络传播方向 ；
      - 家用路由器（NAT 路由器 Network address transiation）： 和上面的路由器不一样；里面是一个路由器和一个交换机，相当于具有链路层和网络层功能。
          SNAT: NAT 路由器发出去的局域网地址转化为广域网地址
          DNAT：发回来的广域网地址转化为 NAT 路由器的局域网地址
          根据设备端口的不同 NAT 路由器区分数据是由哪个局域网设备发送的，NAT 路由器会有一个端口映射表，每台网络设备每次都会映射得到一个独一端口；
          端口映射表有动态也有静态的，但是保证端口和内网设备的映射关系都是独一的；
          NAT 级联，NAT 路由器连接 NAT 路由器，解决了 ip 地址不够用的问题；
      -IP 分片 /IP 重组：IP 有关数据大小（IP 总长度）大于以太网帧负载，需要分开传输后再重组
      -0.0.0.0 ：代表任意的 ip 地址，不能作为目的地址使用
       127.x.x.x 以 127 开头的 ip 地址都指向本机
      -IP 报头：记录 ip 地址有关信息，本身储存在以太网帧负载里面
        - 版本（IPv4/IPv6），首部长度，总长度 标识（第几个分片）
        - 协议（解析 ip 地址的协议），首部校验和（哈希校验）
        - 源 IP 地址 / 目标 IP 地址
        - 数据（可选）
        - 生成时间（TTL）:  IP 包头在网络中最多可以中转的次数，每遇到路由器中转一次减一，到 0 路由器就不传播扔掉该数据（路由会返回给发送者在哪一个路由器地址被扔掉，利用该特性可以追踪路由 cmd - tracert baidu.com），可以防止环状循环传播；
        - 在传播过程中 TTL 和首部校验和会变化
      -ICMP 协议：每个路由回复数据传播状态所要用到的协议

  * 传输层 ：网络数据的传输 (UDP/TCP 协议），端口到端口（应用程序到应用程序）
      - 端口：标识数据包给到哪个软件，用一个数字标识
      - UDP：用户数据报协议（UDP，User Datagram Protocol），UDP 为应用程序提供了一种无需建立连接就可以发送封装的 IP 数据报的方法
          - 包裹在 ip 的数据里面；包括源端口 / 目的端口 / 长度 / 校验和 / 数据
          - UDP 的广播地址为 255.255.255.255，当 ip 地址为广播地址时，所有的端口都可以接收该以太网帧
          - 缺点：不保证送达，数据包很小，不能保证按照发送顺序送达
          - 优点：低延迟，丢包也不重发；如游戏，电话语音
          - 模型
              udp 仅在 ip 上加了端口，每个 udp 端口是对等的，任何一个 udp 端口也可以向任何其它的 udp 端口发消息，不局限于只能为某个端口发；
              发送的消息不保证能送达。
              不存在服务器 / 客户端一说，没有连接的概念。

      -TCP：传输控制协议（Transmission Control Protocol）是一种面向连接的、可靠的、基于字节流的传输层通信协议
          TCP 四元组：源 ip, 目的 ip，源端口，目的端口；确定网络中独一无二的连接
          TCB:TCP 服务器和客户端连接时创造的内存片段
          TCP 的包头
            - 包裹在 ip 的数据里面
            - 源端口 / 目的端口（16bit,2**16 次方个端口）
            - 头部长度 / 保留位
            - 顺序号 / 确认号 ：按序发送，按序接收；都是一个相对值，相对第一个随机的序列号（安全性高）
            - 标识符
              SYN（握手包）；FIN（挥手包）；ACK（表示确认号正确）；
            - 窗口大小：先读取完窗口内的数据，读完数据后滑动窗口到后面的数据包片段；调整窗口大小实现流量控制，窗口越大数据传播数据越快；
            - 选项（窗口缩放因子 / 时间戳 / 支持 SACK 等等）
          TCP 半开状态：即一侧关闭了连接，不再发送数据，但可以接收数据，直至对侧也关闭了连接；另一侧没有关闭连接，仍可以发送数据。
          拥塞控制
            - 慢启动 ：刚开始网速慢
            - 和式增加：线性增加网速
            - 积式减少：发生拥塞或者错误时网速指数减少
            - bbr 算法：发送速率非常大，做到刚好不丢包的速率（传输中数据包的数量为带宽*延迟）
          时间戳
            TCP 时间戳用于“防止序列号回绕算法”，即防止序列号重复，时间戳不会重复，永远都是递增的
          选择确认（selective acknowledgment，SACK）
            - 允许接收的不连续的 TCP 流，只需要重发丢包的部分 TCP 流·，而不用所有 TCP 流重发
            - SACK 选项并不是强制的，仅当双端都支持时才会被使用
          TCP 的 3 个阶段
            - 建立连接，握手
              - 三次握手（客户端请求连接，服务器同意连接，客户端表示收到服务器的消息），保证双方连接的正确性；
            - 传输（确认，重传，编号）
              - 确认数据是否正确
              - 数据错误时重新传
              - 每个字节都有一个顺序号和确认号，每完成一次数据传输更新编号
            - 相互挥手，数据传输结束，连接断开
              -4 次挥手（客户端请求断开，服务器表示收到，服务器请求断开，客户端表示收到）
              -3 次挥手（客户端请求断开，服务器表示收到并同时请求请求断开，客户端表示收到）只有刚好双方都没有该数据流任务时才有 3 次挥手
      -TLS/SSL 基于 TCP 上的传输加密层，使数据在传输过程中不被中途的路由器获取内部所有信息
          - 非对称加密
          - 发送方的一对密钥（公钥 p1, 私钥 s1）；接收方的一对密钥（公钥 p2, 私钥 s2）
            公钥是公开的，双方都有彼此公钥
            发送方发送 P2(S1(M)), 接收方通过 P1(S2(P2(S1(M))) 解码出 M
            S2 解码 P2,P1 解码 S1，实现秘密通信
  * 应用层 ：在传输层的数据协议之上的另一种协议（软件以应用层的协议解析其它软件发来的数据）
      *DNS：Domain Name System 将域名转化为 ip 地址的协议
          - 包裹在 UDP 的数据里
          - dhcp 服务器自动分配 DNS 地址，也可以自己填写；一般填写离自己最近的 DNS 服务器地址，速度更快；114.114.114.114/114.114.115.115
          - DDNS ：动态 DNS,Dynamic Domain Name Server，动态域名服务，是把互联网域名指向可变 IP 地址的系统；DNS 只是提供了域名和 IP 地址之间的静态对应关系，当 IP 地址发生变化时，DNS 无法动态的更新域名和 IP 地址之间的对应关系，从而导致访问失败。
          - 全球只有 13 台根域名服务器
          - DNS 负载均衡：一个域名指向一组机器
      * dhcp 协议  动态主机配置协议（Dynamic host configuration protocol）
        * 局域网里面有 dhcp 服务器 ，它会告诉新来的网络设备一个配置信息（ip 地址，网关，dns 等信息），设备会自动设置这些信息然后可以访问网络
        * ip 地址租期：dhcp 分配的 ip 地址有限，每个设备的 ip 地址都有一个租用时间，网络设备长时间未访问网络 dhcp 会收回 ip 地址，不过一般网络设备都会自动续期
      * https: 由 HTTP 进行通信，但利用 SSL/TLS 来加密数据包 ,HTTP over TLS;
        * 首次通信需要一个第 3 方 CA 机构，防止有人中途冒充接对方
        * CA 其有一对密钥（公钥 RP, 私钥 RS）认证过程如下：
          - 其拿到发送方域名，公钥 P1, 再用自己的私钥 RS 对发送方数据进行电子签名，再将整个信息进行哈希处理，得到一个类型 MD5 值，电子证书发给接收方
          - 接收方确认 MD5 值无误后用 CA 机构的公钥解码得到发送方的域名和公钥，核对无误后即可以同意连接，后续双方就可以进行 TLS 加密通信

  * 打开页面网络层面的操作
    读缓存 =>hosts 文件的读取 =>dns 解析器 =>网络层数据包的转发 =>tcp 连接 =>证书交换，建立 tls 连接 =>发送 http 请求 =>接收响应 =>构建 DOM 树 =>渲染页面

## HTTP

  * Hypertext Transfer Protocol 超文本传输协议
    建立在 TCP 之上的请求响应模型，数据以字符串的形式传递，包括协议的首部和头，所以 HTTP 协议是文件协议；
    其它协议是二进制协议，协议的包头中的数据都是以二进制形式编码的

  * 客户端请求方法
    GET: 向服务器获取资源
    POST: 给服务器增加资源
    DELETE: 让服务器删除资源
    PUT: 替换服务器资源
    HEAD：只返回响应头不返回响应体
    另外服务器不是所有的请求都会执行，只能执行客户端权限之内的请求

  * 服务器应答状态（用特定的三位数表示）
    * 以 2 开头表示请求成功，如 200
    * 以 3 开头表示服务器资源地址跳转，也算成功，如 302
    * 以 4 开头表示客户端的请求有问题，如 404
    * 以 5 开头表示服务器有问题请求没问题，如 500

  * 请求模型
    * 起始行
       方法 + 32 号空格 + / + URL 第一个 / 号后面的内容 +  32 号空格 + HTTP 版本号；如
       GET /bar.html HTTP/1.1
    * 请求头（名字：值），可以有很多组这种组合，描述请求体
        - Host: 域名和端口（必要请求体）
            告诉服务器客户端是用什么域名连接服务器的；因为一个服务器可以对应多个域名,一个端口也可以监听多个域名
        - User-Agent: 浏览器信息（可通过控制台 navigator.userAgent 获取）
        - Referer:url；告诉服务器是哪个页面发来的请求，服务器可以根据这个信息防盗链
    * 请求体：发送给服务器的数据，请求头结束后按两次回车，然后填写请求体的内容
      - 大部分请求方法都没有请求体

  * 响应模型
    * 起始行
      版本号 + 空格 +  应答状态 + 空格 + 描述应答状态的字符串（如 OK）
      http/1.1 200 OK
    * 响应头（名字：值），可以有很多组这种组合，描述响应体
         Content-Length:65585  响应体的内容长度
            配合 Connection：keep-alive 可以实现TCP连接复用（http 协议结束 TCP 连接不断开，等待新的 http 协议）和 pipe line（http 协议在 TCP 之上连续发，不等待上一次结束）
         Content-Type:text/html   响应体的内容类型
         Date：时间； 响应服务器时间
         Content-Security-Policy：告诉浏览器页面外来的资源能否被执行，CSP 是一个额外的安全层；
            限制html 页面的安全策略。所以只需要给 Content-Type 为 text/html 的页面加上这个头就可以了
         CORS Cross Origin Resource Sharing 跨域资源共享，专门解决跨域问题的一组头；
    * 响应体：发送给客户端的数据，响应头结束后按两次回车，然后填写消息体的内容

  * URL 编码
    * URL 会对一些特殊的字符进行转义编码，使用 %16 进制编码方式
    * encodeURLComponent() 通过 URL 编码方式编码特殊字符
      decodeURLComponent() 通过 URL 编码方式解码特殊字符

  * XMLHttpRequest
    * 在浏览器中用 js 发送 http 请求的接口就是 XMLHttpRequest
    * XML 一种数据格式，类型 JSON，现在基本不用
    * 当浏览器响应的文档是 XML 时，该接口可以直接解析 XML 文档，也没多大用

    * 发送请求
      * var req = new XMLHttpRequest() 构造一个请求对象
      * req.open（方法，请求的资源地址，是否异步（默认异步）) 配置请求，相当于设置请求模型起始行
          - 请求的资源地址以“/”开头，直接替换当前服务器域名后的路径
          - 请求的资源地址不以“/”开头，替换当前服务器的路径最后一个 / 后面的内容
          - 请求的资源地址以 http 开头，直接把该绝对路径当做请求地址
      * req.send（请求体）  发送请求，相当于设置请求体
          - 当为同步请求时（false）,req.send 函数只有在浏览器收到了服务器的响应才返回，才算执行完，如果请求资源过大会卡住（相当于浏览器在循环接收服务器发来的每一个字节，没法再进行其他操作）
          - 当为异步请求时（默认），req.send 函数触发请求的发送就返回，会立刻执行完，不会等着浏览器收完服务器的响应
      * req.responseText  当 send 返回时得到来自服务器的响应体；同步时会得到完整的响应体，异步时要配合 load 事件，否则返回""
          xhr = new XMLHttpRequest()
          xhr.open('get', url)
          xhr.send()
          xhr.addEventListener('load'，console.log(xhr.responseText))
      * req.status/req.statusText 得到请求的响应状态号和状态描述文字（200/Ok）
      * req.responseXML XMLHttpRequest 解析 XML 出来的内容

  * HTTP 沙箱
    * 同源策略，跨域限制（针对浏览器）
      浏览器禁止 js 对其它域名发送请求
      js 只能操作协议，域名，端口都相同的服务器；
      cookie是个例外，只有协议，域名相同，端口不同也会共享cookie

  * 抽象请求
      function get(url, callback, onerror) {
        var xhr = new XMLHttpRequest()
        xhr.open('get', url)
        xhr.send()
        xhr.addEventListener('load', function(){
        if (xhr.status < 400) {
          callback(xhr.responseText)
            } else {
          // 网络 ok，响应为 4xx 或 5xx
          onerror(xhr)
            }
      })
      xhr.addEventListener('error', function(e) {
        // 请求没有发出去，连接都没有建立
        onerror(e)
      })
      }

  * Ajax
    * Asynchronous JavaScript + XML（异步 JavaScript 和 XML）用来描述一种使用现有技术集合的‘新’方法；JavaScript 执行异步网络请求
    * Axios 是一个基于 promise 的 HTTP 库 ，里面封装了 Ajax 相关功能，可以直接发送 get,post 等请求；支持promise和async/await
      http://www.axios-js.com/docs/    npm install axios
      * 创造一个axios实例，实例上配置一些共用的属性，api = axios.create({baseURL:"url共用前缀地址"，withCredentials:true,解决跨域和cookie的冲突}) 
      export default api
      * axios.get('/user?ID=12345').then()  
        axios.get('/user', {params: {ID: 12345}}).then() 
        get请求的query信息可以写在第二个参数里，可以通过req.query.ID拿到数据
      * 某个请求的响应包含以下信息
        {
          // `data` 由服务器根据你的请求提供的响应
          data: {},
          // `status` 来自服务器响应的 HTTP 状态码
          status: 200,
          // `statusText` 来自服务器响应的 HTTP 状态信息
          statusText: 'OK',
          // `headers` 服务器响应的头
          headers: {},
          // `config` 是为请求提供的配置信息
          config: {}
        }  
                
             
            

  * 常见响应状态码
    * 401 UnAuthorized 未授权，当前请求需要用户验证
    * 403 Forbidden 隐藏，服务器已经理解请求，但是拒绝执行它
    * 404 Not found 未找到，请求所希望得到的资源未被在服务器上发现
    * 452 Unavailable For Legal Reasons 非法资源，政治原因不可展示

    * 301 Move Permanently 永久移动到新的地址，以后访问请求新地址；
    * 302 Moved Temporarily 暂时移动到新的地址，以后访问还是请求旧地址
      - 以上 2 个要配合响应头 location：url 使用，表示跳转地址
    * 304 Not Modified 未更改
      - 协商缓存
        - If-Modified-Since（请求）/Last-Modified（响应）: 自上次访问以来资源未更新，返回 304
        - If-None-Match（请求 /ETag（响应）: 一个哈希值，如果这个值和服务器储存的对应值一样，表示资源未更新，返回 304
      - 强缓存 和 304 没有关系，主要是用于减轻浏览器负担
        - Expires: 日期；资源未过期都会储存在浏览器里，不用去加载
        - age ：时间；本次请求以后该资源可以强缓存在浏览器里的时间长度
        - cache-control: 现在最常用的，可以在请求头里，也可以在响应头里，可以设置各种缓存，也可以设置为协商缓存；详细见 MDN

    * 501 Not implemented 未实现；此请求方法不被服务器支持且无法被处理。
        - 只有 GET 和 HEAD 是要求服务器支持的
    * 502 Internal Server Error 服务器内部错误

  * 跨域问题
    * CORS
      * 一般由 XMLHttpRequest 发起的跨域 HTTP 请求需要 CORS 标准
      * CORS 预检请求
          * 需预检的请求必须首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求
          * 一些简单的方法不会有预检请求（get/head/post）, 因为不能破坏 Web 的兼容性。
      * 常用的 CORS 头
        Access-Control-Allow-Origin:url/*
        服务器在响应头中加上这个信息其它域名的网站可以通过 js 获取该服务器信息，但每次服务器都有发这个响应头
        Access-Control-max-age:60000   浏览器收到这个响应后 60000 秒以内可以跨越，服务器不需要再发这个响应头
        Access-Control-Allow-Methods: POST, GET, OPTIONS 服务器允许使用这些方法
        Access-Control-Allow-Headers: X-PINGOTHER, Content-Type 服务器允许使用这些请求头

      * CORS 与 cookie
        * 一个网站只能读取到自己网站服务器的 cookie，cookie 信息按照服务器地址分组储存在浏览器里
        * 一个网站向不是自己的服务器 B 发送请求时，会自动带上服务器 B 的 cookie；
        * 但是在 CORS 中跨域发送请求时默认不带上服务器 B 的 cookie，而且第一次登陆后接收到的 cookie 也不会储存在浏览器
        * 为了解决上面的问题，需要在发送请求时带上 withCredentials：true 这个请求头
        * 如果使用了 Access-Control-Allow-Origin:* ，就不能使用 cookie, 可以改为指定地址
        * express 框架里面可以通过 app.use(cors({})) 中间键配置解决这个冲突,该中间件需要npm cors
          app.use(cors({
              origin:true, 相当于Access-Control-Allow-Origin:*
              maxAge:86400,
              credentials:true,
          }))

    * JSONP 一种跨域方案
        通过 script 等标签进行跨域，把请求的数据作为一个函数的参数，引进之后调用函数操作数据；
        给路径传递参数 get 想要的资源
        function jsonp(url, data) {
          return new Promise((resolve, reject) => {
            var script = document.createElement('script')
            var callbackName = 'JSONP_CALLBACK_' + Date.now() + Math.random().toString(16).slice(2)

            url = url + '?' + [...Object.entries(data)].map(pair => {
              return pair.join('=')
            }).join('&') + '&callback=' + callbackName

            window[callbackName] = function(data) {
              delete window[callbackName]
              document.head.removeChild(script)
              resolve(data)
            }

            script.src = url

            script.onerror = function(e) {
              delete window[callbackName]
              document.head.removeChild(script)
              reject(e)
            }

            document.head.appendChild(script)
          })
        }
        拦截方法：将自带api换为自己包装的
    * 服务器代理  服务器之间的通信没有跨域问题
      * API 代理跨域
          一个网站向不是自己的服务器 B 发送请求时，自己的服务器直接从目标服务器请求信息，把收到的信息发回浏览器，这个是反向代理；
          需要在package.json文件夹里面加上"proxy":目标url; 自己的服务器就可以代理这个url目标服务器
      * 正向代理是代理客户端，为客户端收发请求，使真实客户端对服务器不可见；
        而反向代理是代理服务器端，为服务器收发请求，使真实服务器对客户端不可见
    * iframe 跨域
      window.name 这个值在页面跨域跳转时也不会改变，配合 iframe

    * Google浏览器的跨域配置
      属性-快捷方式-目标 chrome.exe --disable-web-security --user-data-dir="c:\a\b"  

  * 运用 HTTP 实现客户端和服务器的通信
    *RPC remote procedure calls 远程过程调用
       http 的协议是通信工具，传递一些参数给服务器，函数在服务器执行
    *RESTful
       通过相关方法操作服务器资源（post/delete/put/get 增删改查）

  * Promise 构造器
    * promise = new Promise((resolve,reject)=>{})
      * 1 个 promise 对象代表一个异步操作的结果
      * 构造器里面传递一个异步函数，该函数有两个类型为函数的参数，该异步函数有错误时执行 reject 函数，没有错误时执行 resolve 函数
      * [[PromiseStatus]] 表示 promise 的状态，有 rejected（以拒绝）和 resolved（已解决）和 pending（待定，初始状态）,settled（包括 rejected 和 resolved)
      * [[PromiseValue]] 表示 reject 或者 reject 状态的返回值，这个值一旦确定就无法变更，以第一次的值为准
      * 异步函数永远比调用栈后面的同步函数后执行，即使延迟时间为 0

    * promise.then(f1,f2)
      如果异步函数状态为 resolved 执行 f1，状态为 rejected 执行 f2;
      f1 或者 f2 的参数是 promise 的 [[PromiseValue]]
      f1 和 f2 函数调用结果都要有返回值
      promise.then 的返回值是一个新的 promise 对象
    * promise1 = promise.then(f1,f2)
      如果 f1 或者 f2 正常执行，那么 promise1 的状态就是 resolve，promise1.then(f3,f4) 会执行 f3
      如果 f1 或者 f2 抛出了一个错误（throw），那么 promise1 的状态就是 reject，promise1.then(f3,f4) 会执行 f4
      如果 f1 或者 f2 返回了一个新的 promise，那么 promise1 就是返回的新的 promise 对象，promise1.then(f3,f4) 的执行方式取决于新 promise 对象的状态
    * 如果 promise.then() 里面没有传递参数
      p2  = p1.then() 相当于下面
      p2 = p1.then(val=>val,reason=>{throw reason})
    * 如果 promise.then() 里面没有传递第一个参数，可以用 catch 代替 then
      p2  = p1.then(null,f1) 相当于下面
      p2  = p1.catch(f1)
    * promise 的链式跳转
      p1.then(f1).catch(f2).then(f3).catch(f4)   promise 状态为 resolve 直接可以跳转执行 then，为 reject 可以跳转执行 catch
    * Promise.resolve(val)
      创建一个 [[PromiseStatus]]: "resolved"，[[PromiseValue]]: val 的 promise
      Promise.reject(val)
      创建一个 [[PromiseStatus]]: "rejected"，[[PromiseValue]]: val 的 promise
    * Promise.allSettled (values) 返回一个 promise，该 promise 在迭代器所有给定的 promise 已被解析或被拒绝后解析，返回的 promise 的 [[PromiseValue]] 值是一个对象数组，每个对象都描述迭代器里每个 promise 的结果（状态和返回值）
    * Promise.race(values)  返回一个在迭代器中遇到的第一个状态确定（settled）的 promise
      Promise.race=function(values){
        return new Promise((resolve,reject)=>{
          for(let i = 0 ; i< values.length;i++){
            Promise.resolve(values[i]).then(resolve,reject)
          }
        })
      }
    * Promise.all(values)  返回一个 promise 实例，
      如果迭代器中所有的 promise 参数状态都是 resolved, 则 promise 实例的状态为 resolved，其 [[PromiseValue]] 为每个参数的 [[PromiseValue]] 组成的数组；
      如果参数中的 promise 有一个失败（rejected），此实例的状态为 rejected，其 [[PromiseValue]] 为是第一个失败 promise 的 [[PromiseValue]]
      Promise.all = function(values) {
        return new Promise((resolve, reject) => {
          var result = []
          var resolvedCount = 0
          if (value.length == 0) {
            resolve([])
            return
          }
          for (let i = 0; i < values.length; i++) {
            Promise.resolve(values[i]).then(val => {
              result[i] = val
              resolvedCount++
              if (resolvedCount == values.length) {
                resolve(result)
              }
            }, reason => {
              reject(reason)
            })
          }
        })
      }

# Node.js
  * 用偶数版本，最好用 LTS 版本
  * Node.js 是一个 JS 的运行环境（RunTime）
  * 用途
    * 高性能 web 服务器（异步实现）
    * 前端工程化  即全端系统化、模块化、规范化的一个过程
        * 打包（webpack）
        * Electron （融合了浏览器的 dom 功能和 node.js 的相关模块功能，做一个桌面软件，如 Vscode）
        * 转义（es6=>es5,less/sass=>css）, 浏览器的兼容性
        * 源代码的压缩混淆，把源代码转化为不可读，改变形参的名字
        * 爬虫，命令行程序的编写等
  * 进程和线程
    * 进程是资源分配的最小单位，线程是 CPU 调度的最小单位
    * 进程就是包括上下文切换的程序执行时间总和 = CPU 加载上下文 +CPU 执行 +CPU 保存上下文
    * 一个进程里面可以有多个线程，线程是共享了进程的上下文环境，的更为细小的 CPU 时间段
    * 进程和线程都是一个时间段的描述，是 CPU 工作时间段的描述，不过是颗粒大小不同
    * CPU 运行一个软件相当于打开一个了进程，执行该软件里面的 1 个功能相当于打开一个线程
    * https://www.zhihu.com/question/25532384/answer/81152571

  * 常用命令
    * nodemon xxx.js  以 nodemon 启动某 js 文件，文件修改时客户端同步更新
    * process 一个全局变量
      node xxx.js aguemnts  给 xxx.js 传递参数 arguements,xxx.js 里面通过 process.argv 接收 arguements
      process.argv 返回一个数组，第一项是 node 的运行路径，第二项是 xxx.js 文件路径，第三项开始是 arguements(process.argv[2])
      process.exit(0) 正常结束一个脚本模块
      process.cwd() 当前工作目录
      process.pid 当前进程 ID
    * node.js 的调试
      node --inspect-brk script.js arguments  node.js 调试功能  brk 表示停在第一行，可以省去
      node --inspect-brk=ip 地址端口号 script.js arguments  node.js 调试功能在指定地址端口
      ndb node --inspect-brk script.js arguments
      ndb node --inspect-brk=ip 地址端口号 script.js arguments  node.js 调试功能在指定地址端口
      通过 vscode 调试
    * http server 开启网络服务
      npm install http-server -g  通过 npm 安装
      http-server   使用命令
    * npm 的初始化
      npm init 在某个地址初始化 npm 后会创建 node__medules 文件夹，之后安装的模块都在里面
    * __dirname 模块所在文件夹的绝对路径，全局变量
      __filename 模块本身目录的绝对路径  ，全局变量

  * 模块
    * require(X)
      * 如果 X 是路径，直接加载对应路径的文件
      * 如果 X 是内置模块，直接返回内置模块
      * 在当前文件夹的 node_modules 文件夹里面找到名为 X 的文件
          如果此文件夹里面有 package.json, 则加载 main 字段指向的文件
          如果此文件夹里面没有 package.json，则加载此文件夹里面的 index.js 文件
         在当前文件夹的 node_modules 文件夹里面找不到名为 X 的文件
          则往其父文件夹找 node_modules, 顺着往上找

    * 异步回调函数和 promise 函数的转化
      function promisify(callbackBasedFunction) {
        return function (...args) {
          return new Promise((resolve, reject) => {
           callbackBasedFunction(...args, (err, data) => {    <!-- data异步调用args后得到的结果 -->
              if (err) {
                reject(err)
              } else {
                resolve(data)
              }
            })
          })
        }
      }

      function callbackify(promiseBased) {
        return function(...args) {
          var cb = args.pop()
          promiseBased(...args).then(val => {
            cb(null, val)
          }, reason => {
            cb(reason)
          })
        }
      }

    * 生成器函数和 promise 结合替代异步调用 (async await 的原理）
      function run(generatorFunction) {
        return new Promise((resolve, reject) => {
          var iter = generatorFunction()
          var generated
          try {
            generated = iter.next()
            step()
          } catch (e) {
            reject(e)
          }
          function step() {
            if (!generated.done) {
              generated.value.then(val => {
                try {
                  generated = iter.next(val)
                  step()

                  <!--generated.value是一个promise, val 在生成器函数中完成赋值，从而可以在生成器函数中操作 val ，这个val可以赋值到=号右边，这样就可以拿到异步结果-->

                } catch(e) {
                  reject(e)
                }
              }, reason => {
                try {
                  generated = iter.throw(reason)
                  step()
                } catch(e) {
                  reject(e)
                }
              })
            } else {
              Promise.resolve(generated.value).then(resolve, reject)
            }
          }
        })
      }

    * async + 生成器函数 function  {await ：promise 函数}
      async 函数就是将 Generator 函数的星号（*）替换成 async，将 yield 替换成 await；async 函数对 Generator 函数的改进，配合 promise 使用，包装原理如上；并且 function() 返回一个 promise

      async function showStory(storyUrl) {
        var story = await getJSON(storyUrl)

        <!-- story 会接收 promise 函数返回的结果 -->

        for(var chapterUrl of story.chapterUrls) {
          var chapter = await getJSON(chapterUrl)
          addContentToPage(chapter)
        }
      } <!-- 串形加载，串形调用 -->

      async function showStory(storyUrl) {
        var story = await getJSON(storyUrl)
        var chapterPromises = story.chapterUrls.map(getJSON)
        for(var chapterPromise of chapterPromises) {
          var chapter = await chapterPromise
          addContentToPage(chapter)
        }
      }<!-- 并行加载，串形调用 -->

    * 文件模块 require（'fs'）
        * 主要方法
          fs.readFile（文件路径，'utf8',（error，data）=>{}) 读取当前路径文件
          fs.write（文件路径，'写入内容'，(error)=>{}) 为当前路径的文件写入内容，没有该文件会创造一个文件
          fs.readdirSync（路径，{withFileTypes:true}) 读取路径上的文件夹所有文件名，返回一个数组；
            withFileTypes:true 存在的话，数组的每一项都有 isFile() 和 isDirectory() 方法
          fs.stat（路径，（error,data)=>{}) 获取文件信息，里面有 isFile() 和 isDirectory() 方法判断文件类型
          fs.rename（路径，newname,()=>{}) 重命名
          fs.unlink（路径，(error)=>{}) 删除一个文件
          fs.openSync（路径） 返回文件描述符
        * 路径
          '/' 系统根目录
          './'  ，'.' 当前目录
          '../'父目录
        * 同步函数只需要加一个 Sync ,fs.readFileSync
        * fs =fs.require('fs').promises  将模块所有异步函数转化为返回一个 promise 的函数
        * fd file descriptor 文件描述符  用一个整数表示（可读可写等）

    * HTTP 模块  require('http')
      * const server = http.createServer((request,response)=>{}) 创造 http 服务器，当服务器收到客户端 http 请求时触发，相当于绑定了一个 request 帧听事件
        * request 是一个对象，里面有客户端请求的各种信息（method,url,header 等）
        * response 是一个对象，里面编辑发送给客户端的信息（响应体，响应头等），发完之后调用 response.end()
      * 两个服务器之间也可以通过 http 模块建立 http 连接，利用 http.request() 函数充当客户端
        http.request({请求的网络配置}，f(response){收到对方的响应对象})
      * index.html 导航页  每个网站首页基本都是这个文件，储存在网站服务器里面

    * 流 stream     stream = require('stream')  双向链表结构
      * 一种数据传输的模型
        * 一片一片的传输数据
        * 传输速度是可控的，不同类型的流速度不一样
        * 减少 CPU内存占用（超过 CPU 的最大缓存内存可以暂停接收）
      * 流的类型
        * 可读流 类似将数据读取到 CPU   Readable
        * 可写流 类似将数据写入到硬盘   Writable
        * 双工流 如 TCP      Duplex
        * 转化流 如 zip 压缩  Transform
        * const { Readable，Writable} = require('stream')
      * 主要的方法和事件
        * rs = fs.createReadStream(path) 创造从某个路径文件读取数据的可读流
        * ws = fs.createWriteStream(path) 创造向某个路径文件写入数据的可写流
        * ws.write(data) 可写流都有 write 方法，向目标 path 写入数据；可写流的 finish 事件，end 之后缓冲区里面的数据全部处理完了之后触发
        * rs 可读流通过监听 data 事件，end 事件，readable 事件（自身缓冲区有准备好的数据）来操作数据传输
        * pause() 方法，暂停流的传输； resume() 方法 ，恢复流的传输；end() 方法，告知已经没有数据传递给该流了；destory() 销毁该流；以上都是所有流的通用方法
        * drain 事件，表示流的缓存区数据都已经传输到了下一级，一般通过该事件让上一级恢复流的传输
        * pipe  连接两个流的管道，可链式调用；rs.pipe(ws) 从可读流出来的数据进入到可写流
      * process 相关的 3 个标准流对象
        process.stdout 当前进程标准输出流，本进程输出的东西，默认情况下是输出到控制台；
          - 对于自己是一个可写流，可以 pipe 到一个可读流里面
        process.stderr 当前进程标准错误流，本进程输出的错误，默认情况下是输出到控制台
        process.stdin  当前进程的标准输入流，别的进程给本进程输入的东西
          - 对于自己是一个可读流，可以 pipe 到一个可写流里面

    * net 模块
      * socket.write() 服务器向客户端发送数据
      * socket.end()  服务器向客户端发送 FIN 包中断连接，注意 end 后不能再 write，会报错
      * socket.on('data',callback) 服务器接收到客户端发送数据时触发
      * socket.on("end",callback) 服务器接收到客户端发送 fin 包时触发

    * Buffer 提供一段储存数据的原始字节流，是一个表示你内存片段的类数组
      * b = Buffer.alloc(16 ) 构造 10 个字节的 buffer, 数据已清空
        c = Buffer.allocUnsafe(10)  构造 10 个字节的 buffer，数据未清空
        d = Buffer.from(value，[utf8/base64]) 返回一个新的 buffer，通过相关协议解析处理的 buffer
      * TypedArray 描述一个底层的二进制数据缓存区的一个类似数组 (array-like) 视图，可以直接操作内存，性能非常快；
        应用：canvas,B 站 flv.js；直接操作二进制字节流
        https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

    * Child Process 子进程  require('child_process')
      * 主要用来运行计算机已经装好的其它程序
      * child_process.exec（命令，(err,stdout)=>{})

    * mime 模块 判断媒体类型，需要安装
      mime = require('mime')
      mime.getType(path) 得到媒体类型 如'text/html'
      mime.getExtension(path) 得到扩展名

    * Path 模块  path = require('path')
      path.resolve(path1,path2) path1 和 path2 合并得到的路径
      path.relative(path1,path2) path1 怎样操作到 path2
      path.basename(path) 拿到文件的名字
      Path.dirname(path) 拿到文件夹的名字
      path.extname(path) 拿到扩展名
      path.normalize(path) 化简路径
      path.sep  判断系统路径用、还是 /

    * qs 模块  var queryParse = require('querystring') 调用 node 上面的'querystring'模块，可以解析 http 协议的 query 字符串数据
      queryParse.parse(query)

    * DNS 模块
      封装了 DNS 协议，node 自己解析域名，自己不用发 UDP 数据包
    * readline 模块
      从标准输入流中读入数据
    * OS 模块  读取当前操作系统的相关信息
    * VM 模块
      虚拟机，创建一个可以运行 js 代码的虚拟机，并定义一个全局作用域，js 代码不会影响到虚拟机全局作用域外面的内容
    * cluster  集群
      多个进程都启动 node，对于复杂的运算可以分配任务到多个进程

    * Worker Thread  和 js 中的 worker 功能一样

    * Events
      * e.on（事件）  绑定事件   e.off（事件） 解绑事件 e.emit（事件） 触发事件
      * 函数实现
        class EventEmitter {
          constructor() {
            this._events = {}
          }

          on(type, handler) {
            if (type in this._events) {
              this._events[type].push(handler)
            } else {
              this._events[type] = [handler]
            }
            return this
          }

          off(type, handler) {
            var listeners = this._events[type]
            this._events[type] = listeners.filter(it => it != handler)
            return this
          }

          emit(type, ...args) {
            var listeners = this._events[type]
            if (listeners) {
              for (var i = 0; i < listeners.length; i++) {
                var handler = listeners[i]
                handler.call(this, ...args)
              }
            }
          }
        }

    * node send email
      npm install nodemailer
      var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'
          }
        });
        var mailOptions = {
          from: 'youremail@gmail.com',
          to: 'myfriend@yahoo.com',
          subject: 'Sending Email using Node.js',
          text: 'That was easy!'
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email  sent: ' + info.response);
          }
        });

    * node 其它常用 npm 包
      * multer  文件上传  https://www.jianshu.com/p/93151c777caf
      * sharp 图像处理库
      * svg-captcha 生成验证码
      * express-session  会话，存储你通过请求获取到的数据的地方。每一个访问你网站的用户都有一个唯一的 session，包括多次通信，保存到服务器
        cookie会储存sessionid，由sessionid确认是不是同一个会话  
      * md5 加密算法
      * Jimp 图像处理库
        - pixelData = await Jimp.read('./pixelData.png')  得到这个位置的初始图片对象，图片对象是一个描述这个图片的数据对象
        - pngBuffer = await pixelData.getBufferAsync(Jimp.MIME_PNG) 将图片对象转化为二进制字节流，储存在一段buffer里面
        - var hexColor = Jimp.cssColorToHex(color) 将颜色解析为16进制，如 converts #FF00FF to 0xFF00FFFF
        - pixelData.setPixelColor(hexColor, col, row) 设置图片对象某个像素点的颜色

  * 事件循环
    * nodejs 是单线程执行的，同时它又是基于事件驱动的非阻塞 IO 编程模型，事件循环机制是实现这一特性的原理
    * 异步操作时，将任务给到另外的线程（CPU 的其它核），异步事件触发之后，就会通知主线程，主线程执行相应事件的回调。
    * 事件循环原理
             ┌───────────────────────────┐
          ┌─>│           timers          │
          │  └─────────────┬─────────────┘
          │  ┌─────────────┴─────────────┐
          │  │     pending callbacks     │
          │  └─────────────┬─────────────┘
          │  ┌─────────────┴─────────────┐
          │  │       idle, prepare       │
          │  └─────────────┬─────────────┘      ┌───────────────┐
          │  ┌─────────────┴─────────────┐      │   incoming:   │
          │  │           poll            │<─────┤  connections, │
          │  └─────────────┬─────────────┘      │   data, etc.  │
          │  ┌─────────────┴─────────────┐      └───────────────┘
          │  │           check           │
          │  └─────────────┬─────────────┘
          │  ┌─────────────┴─────────────┐
          └──┤      close callbacks      │
             └───────────────────────────┘


    - 进入 timers 阶段
        检查 timer 队列是否有到期的 timer 回调，如果有，将到期的 timer 回调按照 timerId 升序执行。
        检查是否有 process.nextTick 任务，如果有，全部执行。
        检查是否有 microtask，如果有，全部执行。
        退出该阶段。
    - 进入 IO callbacks 阶段。
        检查是否有 pending 的 I/O 回调。如果有，执行回调。如果没有，退出该阶段。
        检查是否有 process.nextTick 任务，如果有，全部执行。
        检查是否有 microtask，如果有，全部执行。
        退出该阶段。
    - 进入 idle，prepare 阶段：
        这两个阶段与我们编程关系不大，暂且按下不表。
    - 进入 poll 阶段
      首先检查是否存在尚未完成的回调，如果存在，那么分两种情况。
      第一种情况：
        如果有可用回调（可用回调包含到期的定时器还有一些 IO 事件等），执行所有可用回调。
        检查是否有 process.nextTick 回调，如果有，全部执行。
        检查是否有 microtaks，如果有，全部执行。
        退出该阶段。
      第二种情况：
        如果没有可用回调。
        检查是否有 immediate 回调，如果有，退出 poll 阶段。如果没有，阻塞在此阶段，等待新的事件通知。
      如果不存在尚未完成的回调，退出 poll 阶段。
    - 进入 check 阶段。
        如果有 immediate 回调，则执行所有 immediate 回调。
        检查是否有 process.nextTick 回调，如果有，全部执行。
        检查是否有 microtaks，如果有，全部执行。
        退出 check 阶段
    - 进入 closing 阶段。
        如果有 immediate 回调，则执行所有 immediate 回调。
        检查是否有 process.nextTick 回调，如果有，全部执行。
        检查是否有 microtaks，如果有，全部执行。
        退出 closing 阶段

  * 宏任务和微任务
    * 宏任务：客户银行取号排队办理业务
      微任务：每个客户又可以在柜台办理一些新的业务 
    * 宏任务在执行的过程中，是可以添加一些微任务的；
      在当前的微任务没有执行完成时，是不会执行下一个宏任务的。
    * 宏任务一般是：包括整体代码script，setTimeout，setInterval、setImmediate。
      微任务：原生Promise相关、process.nextTick
    * 微任务的递归调用会死循环，浏览器无法执行其它任务


  ## express    node.js 的框架
    * 先 npm 安装，express=require('express')
      app = express() （得到 express 的一个实例）
      app.use((req,res,next)=>{}) 中间键，对所有请求做一种方式的处理
      app.use(path,()=>{}) 以该路径开头走这个中间键，也可以接多个中间键
      httpServer = app.listen(port,()=>{}) listen方法会返回一个http服务器

    * app2 = express.Router  
      创建一个模块化的路由处理程序，完整的路由系统的中间件
      配合module.exports = app使用

    * 基本路由
      app.METHOD(PATH, HANDLER)
        * app 是 express 的实例。
        * METHOD 是 HTTP 请求方法。
        * PATH 是服务器上的路径。
        * HANDLER 是在路由匹配时执行的函数。
      app.route(path) 为路由路径创建可链接的路由处理程序
        app.route(path).get(()=>{}).post((req,res,next)=>{})
    * 创建静态文件
        app.use(express.static('./public'));     创建了位于 public 目录中的静态文件作为服务器器
    * 调试   $ DEBUG=express:* node index.js
    * 相关 API
        * req 相关
          req.body  请求体通过一些中间键解析后的数据会储存在 req.body 里面
          req.params 这是一个对象，储存了路径中的变量，如
            token = 12344
            当对这个路径发出请求时，'/change-password/:token'
            可以通过 req.params.token 拿到 12344
        *res 相关
          res.cookie() 一个验证身份的字符串，网站在用户验证成功之后都会设置一个 cookie，只要 cookie 没有过期，用户就可以自由浏览这个网站的任意页面不需要再次登录
            - const cookieParse = require('cookie-parser') 要安装
            - app.use(cookieParse("secret")) 解析 cookie，加参数表示自己签名
            - res.cookie('user',loginUser.name,{signed:true})
            -  res.signedcookies 签名的 cookie 只能在这个上面读到，req.signedCookies.user
            - res.clearCookie('user') 清除 cookie
          res.status(404) 响应一个状态码  
          res.json()	发送 JSON 响应并end。
          res.redirect()	重定向请求并end。
          res.render(path,local)	呈现指定路径视图模板，local 是一个对象，里面可以为模板文件传递参数
          res.set("Content-Type","text/html;charset=UTF-8") 设置响应头
          res.send() 发送响应
    * 内置中间键
      express.json() 解析请求体 json
      express.urlencoded({extended:true}) 请求体为 url 编码时解析
      express.query() 解析请求体 query 部分
      express.static(path) 将某个文件夹暴露为一个静态文件服务器
    * ecpress 应用程序生成器
       $ npm install express-generator -g

  ## Koa
    * https://koajs.com
    * 另一种node框架，express 团队开发的，下一代node框架
    * 只接受异步函数，next函数也是异步函数，express里面的next是同步函数
      express里面的next放到最后，而koa可以放到中间
    * 没有任何中间键，全部需要第三方库加载进来，基本只有use方法
    * 洋葱模型，如果涉及到互相调用，后进先出,因为next函数的异步机制，后面的中间键执行完后执行前面next函数后面的内容  
    * const Koa = require('koa)
      const app = new Koa() 实例需要用new调用
      app.use((async ctx,next)=>{
        ctx.method
        ctx.cookie.id
        await next()
        ctx.body
        ctx是app的上下文，context;对象包括req和res，它会自动根据上下文判断是req还是res,直接代理这2个对象
      })
    * 方便记录一个请求所需要的时间  
    * egg.js 基于koa再封装了一层的框架

  ## 数据库
    * SQL  结构化查询语言（Structured Query Language）
    * https://www.w3schools.com/sql
    * sqlite  一个数据库相当于一个 excel 文件，可以有多个 sheet
      * 按装方法
        - 先下载其到项目文件
        - 命令行运行    ./sqlite3 + 数据库名
      * 基本使用方法
        * 以下 base 表示 SELECT column1, column2, FROM tablename/SELECT * FROM tablename
        * creat table 表名字（列名 1，列名 2，列名 3） 如 creat table users (name,email,password)
          create table users(
           id integer primary key autoincrement,    primary key 表示既不空，也自动增加; autoincrement表示id不会重复，即使把最后一个id删除，再添加也是在之前删除的id基础上增加
           name string not null,
           email string,
           password string not null)
        * INSERT INTO  users()  VALUES('jim',"123@77.com","12341")  为指定表插入数据
          insert into users(name,password,email,title) values("a","a","a@qq.com","御膳房");
          insert into users values(1,"a","a","a@qq.com","御膳房");

        * .header on  查看时显示头行
        * .mode column 每列对应排齐查看
        * .schema 查看所有表 
        * SELECT * FROM tablename 查看指定表单所有列
        * .table 查看所有已创建的表单
        * SELECT column1, column2, FROM tablename  查看指定表单指定列
        * SELECT DISTINCT column, FROM tablename; 为指定列去重复
        * where 后面接有条件的查找数据，可以有多个条件，用 AND,OR，NOT 连接
          base WHERE condition;
          SELECT * FROM users WHERE name =name "jim";

        * UPDATE table_name SET column1 = value1, column2 = value2, WHERE condition;
          更新记录时要小心。如果省略 WHERE 子句，所有记录都将被更新！
          update foods set status="off" where id=1;

        * base ORDER BY column1, column2, ... ASC|DESC;  表单指定列按照升序 / 降序排列
        * NULL 在数据库里面表示该位置是空值，base where name is NUll

        * DELETE FROM table_name WHERE condition;
           DELETE 语句用于在表中删除现有记录。如果省略 WHERE 子句，所有记录都将被更新！

        * base LIMIT number;  LIMIT 表示选择前几行

        * SELECT COUNT(column_name) 所选列一共多少行
          SELECT AVG(column_name)  所选数值列的平均值
          SELECT SUM(column_name) 所选数值列的总和
          SELECT MIN(column_name) 所选列的最小值
          SELECT MAX(column_name) 所选列的最大值

        * drop table tablename    如drop table users 删除users表  

        *  alter table orders add totalPrice integer; 为orders表增加一列totalPrice，为整数

        * LIKE 运算符在 WHERE 子句用于搜索在一列中指定的模式。
          % 表示任意个字符，_表示单个字符
          where a_____  筛选以 a 开头 6 个字符长度
        * in 运算符，WHERE name IN ('jim', 'bob', 'merry') 筛选 name 列满足任意一个
        * BETWEEN...AND..   WHERE price BETWEEN 10 AND 20  筛选 10 到 20 的价格
        * 别名，可以为列或者表起一个别名
          SELECT column_name AS alias_name FROM table_name;
          base AS alias_name;
      * SQL 的多表连接
          * 用法
            - base join tablename on condition
          * 种类
            INNER JOIN（内连接）：返回有两个表中的匹配值的记录
            LEFT JOIN：返回左表的所有记录，以及匹配的记录
            RIGHT JOIN：返回右表的所有记录，以及匹配的记录
            FULL JOIN： 交叉连接，返回所有的排列组合记录

      * 项目使用 sqlite 的方法
        * npm i sqlite   sqlite 是基于 promise 对 sqlite3API 的封装
          sqlite = require('sqlite')
          db = sqlite.open(数据库实例地址path) 创建一个 promise
          db = await db   拿到 promise 的结果
        * 相关方法
          db 里面的相关方法进行 ('SQL 操作') 时，可以用？代码后面出现的参数，如
            db.run('insert into users VALUES(?,?,?),jim',"123@77.com","12341")
          var datas = await db.all('select * from datas') 可以拿到数据库里的所有的数据,一个对象集合的数组
          db.run('SQL 操作') 操作数据库
          db.get('SQL 操作') 返回从数据库查找到的数据，只能拿一条,得到一个对象

  ## html 模板引擎 Pug
    * https://pug.bootcss.com/api/getting-started.html
    * include path 把另外的文件引入到模板文件里面，方便将一份代码重复使用 ；如 include head.pug  includes foot.pug
    * 继承与扩展；
      * 一个父文件 layout.pug ，里面有一个 block 语句，block + 标识名，后面的代码可以继承修改，其它地方不可以
      * extends layout.pug  extends 语句，子文件用该语句继承父文件的内容，然后 block + 标识名 + 修改内容 ，实现继承与扩展
    * 嵌入
      *  {代码} 这种写法代码会被求值，可以对变量进行操作
    * 迭代 Iteration; 通过 each 和 while 实现内容为 1 到 5 的 5 个 li 标签
      * ul
          each val in [1, 2, 3, 4, 5]
            li= val
      * - var n = 1;
          ul
            while n < 6
              li= n++
  ## websocked 协议，TCP 之上的协议，连接后不会断开，服务器端可以主动向客户端发送消息
    - 长轮询
      * 由于基于 http 协议的服务器不能主动向客户端发送消息（响应式），如果服务器有没有指定客户端的数据要发往指定客户端，需要指定客户端发来请求才能发送，这样会造成延时
      * 长轮休是指客户端发送一个请求到服务端，这条连接会在一段时间类不会断开
        - 这段时间内服务器拿到了客户端想要的数据会基于这条连接立即把数据发送给客户端
        - 这段时间内服务器没有拿到数据，连接断开，之后客户端再次发送同样的连接
    - node 服务器不支持 ws 协议，需要安装 npm i ws,通过监听http的upgrate事件
    - 开始客户端发送 http 请求，询问服务器是否接收 websocked 协议，服务器同意就可以升级为 websocked 协议
    - 数据以消息为单位
    - TCP 传输的是二进制字节流，而 websocked 是将字节流按照需要分为一份一份的，每一份都是完整的消息片段
    - 缺点容易断线，兼容性不好，建议使用socked.io

    - Connection:Upgrade ；Upgrate:websocket 
      http请求带上这2个主要的请求头告知服务器请求升级为websocked协议，服务器同意后TCP连接就不会中断
    


    * socked.io 对 websocked 的更高级的一层封装
      * 使用方法
        npm i socked.io
        var app = require('express')();
        var http = require('http').createServer(app);
        var io = require('socket.io')(http);/var io = require('socket.io').attach(http)
      * 前端使用安装 socked.io-client  
        或者通过页面加载<script src="/socket.io/socket.io.js"></script>
      * 优点
          - 房间
              - 服务器可以给某个频道所有的客户端发送消息，常用聊天室
              - 客户端也可以给其它客户端发送消息
              - 加入和离开房间的功能
          - 解析：自动编码为字符串，自动编码为其它数据类型
          - 远程事件：客户端和服务器可以监听对方的事件，对方触发了事件，己方可以马上得到触发事件的数据，实现了无延时的双向通信
            io/socked.emit("event",{传递数据}) 服务器/客户端绑定事件
            io/socked.on("event",()=>{}) 服务器/客户端监听事件
            socket.join/leave（'some room'）加入或者离开房间
          - 发送的参数数据可以同时有字符串和二进制字节流，而websocket不能混合发送  

      * socket.handshake.query可以拿到query部分的参数      

  ### linux 服务器知识
    * 虚拟空间：文件夹，只支持放静态文件
      虚拟服务器 ： 文件夹，支持运行服务器端程序，如 node
      vps ： 完全的机器，独立ip,0 到 65536 端口，可以重新装系统
      云服务器： 支持弹性扩容的 vps
    * https://www.digitalocean.com 购买 vps 服务器的网站
    * ssh  secure shell 是一种网络协议，用于计算机之间的加密远程登录
    * sftp 基于 ssh 协议的文件传输协议
    * apt linux 系统的应用商店，类似 npm

# 框架学习

## vue

  * 引用方式
    * script 引用
    * npm 安装 npm install vue
  * 指令，以 v- 为前缀
    * v-bind
      将某个属性绑定为一个变量 <span v-bind:title="message">
      缩写<span :title="message">
    * v-on
      添加事件监听器 <button v-on:click="reverseMessage">反转消息</button>
      缩写 <button @click="reverseMessage">反转消息</button>
    * v-if
      判断一个元素是否显示，值为 true 时显示，false 不显示<p v-if="seen">现在你看到我了</p>
      v-else
      v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别
      可以配合 template 元素实现分组渲染
      <template v-if="ok">
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </template>
    * v-show
      和 v-if 用法一样，不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display；
      v-show 不支持 <template> 元素，也不支持 v-else
    * v-for
      可以绑定数组的数据来渲染一个项目列表 ，需要配合使用 (item, index) in items 形式的特殊语法；
      index 不用时可以省略
      <li v-for="todo in todos">
      {{ todo.text }}
      </li>
      也可以绑定对象的数据来渲染一个项目列表，可以传递 3 个参数，index 表示第几个，类似数组
      <div v-for="(value, key, index) in object">
        {{ index }}. {{ key }}: {{ value }}
      </div>
    * v-model
      实现表单输入和应用状态之间的双向绑定。相当于添加一个属性和一个事件监听器<input>、<textarea> 及 <select>
      可以双向绑定各种数据类型的值
      <div id="app-6">
        <p>{{ message }}</p>
        <input v-model="message">
      </div>
      v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
        text 和 textarea 元素使用 value 属性和 input 事件；
        checkbox 和 radio 使用 checked 属性和 change 事件；
        select 字段将 value 作为 属性和 change 作为事件。

  *  创建 vue 应用
      var app = new Vue({
        el: 选择器，通过选择器指定一个元素，该元素及其后代可以进行 vue 操作
        data: {
          * 储存相关数据，vue 内部会把所有的数据的变为 getter 和 setter；
          * 数组的变更检测
              数组的下标没有设置为 getter 和 setter，所以不能通过更改数组下标的方式改变页面，因为 vue 并不能监听到下标的变化，即当你利用索引直接设置一个数组项时，和当你修改数组的长度时，Vue 不能检测数组的变动；
              可以通过 Vue.set(vm.items, indexOfItem, newValue) 添加
              vue 对一些方法进行了一层包装，这些方法会触发视图更新，push()pop()shift()unshift()splice()sort()reverse()
          * 对象的变更检测
              对象也不可以直接通过增加和删除属性来触发视图更新，因为普通属性不会变为 getter 和 setter
               obj.foo = 12 ,
               可以 Vue.set(vm.items, key, newValue) 添加
        }
        computed:{
          计算属性，一个函数，只有函数的返回结果发生变化时才会重新运行渲染，自带缓存效果；当一个属性的值是现有的数据推导出来的可以用计算属性
          默认都是 get 函数，也可以写 set 函数 set:f(){}
        }
        watch:{
          帧听属性，监听 data 中数据的变动并执行相关操作
          data:f(){}
        }
        methods{
          method1:fuction(){}
          method2(){}
        }
        template：html 代码
        当一个实例里面有 template 属性时，初始化实例时会将 template 的值作为虚拟 dom 而忽略实际的 el 元素内容
      })
  * 插值
    * 文本和 js 表达式插值 {{value}}
     <span>Message: {{ msg }}</span>
     {{ message.split('').reverse().join('') }}
      只能在两个 html 标签之间插值，不能插值在一个标签内
    * html 插值 v-html 指令
      <p v-html="rawHtml"></p>
      p 标签的 innerhtml 会替换为 rawHtml 渲染的内容
  * 修饰符 修饰符 (modifier) 是以半角句号。指明的特殊后缀，用于指出一个指令应该以特殊方式绑定
    * 事件修饰符
      .stop  => event.stopPropagation()
      .prevent => event.preventDefault()
      .capture =>  添加事件监听器时使用事件捕获模式
      .self => event.target 是当前元素自身时触发
      .once => 事件将只会触发一次
      .passive => 表示不阻止事件的默认行为
    * 按键修饰符
      .enter;.tab;.delete ;.esc;.space;.up;.down;.left;.right
    * 系统修饰键
      .ctrl;.alt;.shift;.meta
    * .exact 修饰符
      @click.ctrl.exact  有且只有 Ctrl 被按下的时候才触发
    * 表单修饰符
      * .lazy  在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步。可以添加 lazy 修饰符，从而转变为使用 change 事件进行同步
      * .number  如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符：
      * .trim 如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符：

  * Class 与 Style 绑定
    * class 的绑定
      * 直接绑定字符串作为类名
      * 绑定到一个对象，对象里值为 true 的属性名为一个类名
        v-bind:class="{ active: true, 'text-danger': false }" => class = active
      *  绑定一个数组传给 v-bind:class，以应用一个 class 列表
        v-bind:class="[activeClass, errorClass]", 判断规则和上面 2 中一样
    * style 的绑定
      * 绑定到字符串 ：style ="'color:red'"
      * 绑定到一个对象，CSS 属性名可以用驼峰式或短横线分隔来命名
        v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"
      * 绑定到数组
        数组里面可以是字符串，可以是对象，但不能组合使用
      * 多重值
        :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex']
        只会渲染数组中最后一个被浏览器支持的值
  * key 属性的作用
      Vue 提供了一种方式来表达一个元素独一的身份；只需添加一个具有唯一值的 key 属性，虚拟 dom 在进行对比渲染时，key 值不相同的元素不会作对比， 保证了同一个元素渲染前后都只和自身对比；而不会因为元素位置的变化导致从头渲染；
  * vue 初始化将 data 都变为 getter 和 setter 函数
    function observe(obj) {
      for(let prop in obj) {
        let val = obj[prop]
        if (typeof val == 'object') {
          val = observe(val)
        }
        Object.defineProperty(obj, prop, {
          get: function() {
            return val
          },
          set: function(value) {
            if (typeof value == 'object') {
              value = observe(value)
            }
            val = value
          }
        })
      }
      return obj
    }
  * 异步更新队列
    - Vue 在更新 DOM 时是异步执行的，每次数据变更都会次发出渲染的信号
    - vue 收到信号后会检查是否渲染任务已经在任务队列里，已经存在就忽略
    - 在本轮事件循环的最后执行渲染
    - 防止了重复渲染，提高性能
  * 生命周期钩子   lifecycle hooks
    * 生命周期
       Vue 实例从创建到销毁的过程，就是生命周期。也就是从开始创建、初始化数据、编译模板、挂载 Dom→渲染、更新→渲染、卸载等一系列过程
    * 钩子
      钩子”就是在生命周期的某个阶段给你一个做某些处理的机会（执行一段 js 代码）
    * 流程
      * 创建一个 vue 实例 vm，new Vue()
      * 初始化事件和生命周期
        - 将 vm 转化为一个事件监听触发器，可以监听和触发事件；
        - 初始化生命周期，为其添加了钩子函数
      * 执行钩子函数 beforeCreate
      * 初始化注入和校验
        - 检查代码正确性
        - 将 data 里面的每一个数据变为 getter 和 setter
      * 执行钩子函数 create
      * 判断是否有 el 属性
        - 没有就暂停周期等待调用 vm.$mount(el) 函数，再执行下一步
        - 有就直接执行下一步
      * 判断是否有 template 属性
         - 有模板就将模板编译到 render() 中渲染得到虚拟 dom（一个树状结构的对象）
         - 没有模板就将 el 元素的 outerHTML 作为模板执行上面的操作
      * 执行钩子函数 beforeMount
      * 创建 vm.$el 并替换 el 属性
        - 通过虚拟 dom 创建了一个真实的 dom 元素 el
        - el 之前是选择器一个字符串，现在替换为一个真正的 dom 元素
      * 执行钩子函数 mounted
      * 挂载完毕
        - 当 data 被修改时，调用钩子函数 beforeUpdate
        - 虚拟 dom 重新渲染并更新页面
        - 更新完毕执行钩子函数 updated
      * 当调用 vm.$destroy() 时
        - 执行钩子函数 beforeDestroy
        - 解除绑定销毁组件以及事件监听器
        - 销毁完毕
        - 执行钩子函数 destroy

  * 组件
    * 创建组件
      Vue.component('组件名称，之后可以直接当做标签使用'，{
        template:` 模板内容`, 模板 html 的最外层必须要有且只有一个根元素包裹着所有的元素，最外层不能是多个兄弟元素并列
        props:{
          propA: Number, 限制值的类型
          propB: [String, Number] 限制值多个可能的类型
          propC: {
            type: String,  类型为 String
            required: true   必要属性，必须传值
          }
          propD: {
              type: Number,
              default: 100  默认值 100
          }
          propF: {
          validator: function (value) {
            // 这个值必须匹配下列字符串中的一个
            return ['success', 'warning', 'danger'].indexOf(value) !== -1
          }
        }
          通过 Prop 向子组件传递属性，属性值由组件标签上传递：bind 过来
          单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行
        }
        data(){
          return obj
          一个组件的 data 选项必须是一个函数，返回一个新的对象，因此每个实例可以维护一份被返回对象的独立的拷贝，每个组件之间的运行是独立的，数据不会共享
          这个函数只在组件初始化时运行一遍，数据之后保存在 getter 和 setter 里
        }
        methods:{

        }
        components: {
         'component-a': {
           data(){},
           template:``
           methods:{}
         }
         局部注册组件，'component-a'只能在父组件使用
        }
        inheritAttrs: false
        为组件标签添加属性会自动继承到组件模板的根元素上
        你不希望组件的根元素继承特性，你可以在组件的选项中设置这个，但是不会影响 style 和 class 的绑定和继承；
        $attrs 可以收集父组件中的所有传过来的属性中除了那些在组件中没有通过 props 定义的
      })
    * 监听子组件事件
      * 父组件监听自定义组件 v-on:event1
      * 子组件在某种情况下（比如自己触发了自己的事件）触发该自定义事件
        如在点击时触发自定义事件 v-on:click="$emit('event1' ,arguement)
      * emit 的第二个参数表示可以给父组件传递的参数，父组件可以通过 $event 接收这个参数，如果这个事件 event1 处理函数是一个方法，那么 $event 将会作为第一个参数传入这个方法
        v-on:event1='$event'
        v-on:event1='fun'   methods:{fun($event){}}
    * 组件的数据传递
      * 自上而下通过 prop 传递
      * 自下而上通过事件触发传递
      * 组件操作 prop 传递来的数据时，组件不要修改它，只读取，通过触发事件上级组件反馈，由上级组件操作数据；数据的拥有者是哪个组件，哪个组件才可以更改它；
        组件的层次过深时，组件树数据的传递太繁琐，建议将数据放到全局，每个组件直接修改全局数据，这样就不用传递数据
      * 两个并列的组件的交互方法：通过相同的父组件作中转操作
    * 组件相关的命名
      由于 html 的解析不区分大小写，会把所有大写字符解释为小写字符，再加上 vue 里面的各种命名没有统一，为防止错误，命名都采用 A-B-C 形式。
    * 组件的模块式导入和导出
      和 ES6 规定的模块方式一样
      import ComponentA from './ComponentA'
      import ComponentC from './ComponentC'

      export default {
        components: {
          ComponentA,
          ComponentC
        },
        // ...
      }
    * 子元素：标签包裹在另外一个标签里面
      子组件：一个组件里面的 template 用到了其他组件
    * 插槽 slot
      * <slot></slot>写在组件的 template 里面，外部组件标签的 innerHtml 会替代<slot></slot>得到完整的 template。即组件标签的子元素会转化替换掉组件的子组件<slot></slot>
      * 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
      * <slot>default</slot>当组件标签没有子元素时会显示 default
      * 具名插槽
        * <slot name="header"></slot>为插槽起名字
        * <template v-slot:header> </template>  通过 template 元素使用该插槽，v-slot 只能添加在一个 <template>上  v-slot:header 可以缩写为#header
    * 动态组件
      * <keep-alive>缓存组件内容
      * is 特性  用于动态组件且基于 DOM 内模板的限制来工作 接收 string | Object
        <component v-bind:is="currentView"></component>可以通过 currentView 判断绑定的组件名
    * 异步组件
      Vue.component('async-example', function (resolve, reject) {里面执行异步操作}
    * 访问组件和元素
      * 访问根实例   vm.$root
      * 访问父级组件实例  vm.$parent
      * 访问子组件实例或子元素  通过 ref 特性  vm.$refs
    * X-Template  模板的另外的定义方式
      <script type="text/x-template" id="hello-world-template">
        <p>Hello hello hello</p>
      </script>
      Vue.component('hello-world', {
        template: '#hello-world-template'
      })
    * 强制更新  迫使 Vue 实例重新渲染。vm.$forceUpdate()
  * Vuex
    * Vuex 是一个专为 Vue.js 应用程序开发的数据管理模式。它采用集中式存储管理应用的所有组件的数据
    * 安装
      除了通过 scrip 标签引用，其它方式引用要确保在开头调用了 Vue.use(Vuex)
    * 使用方法
      * 对于根组件
        var app5 = new Vue({
           store:store, 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件，子组件可以通过 this.$store 访问到根组件的 store 对象
        })
      * 创建一个仓库实例
        var store = new Vuex.Store({
           state:{
             data:value     state 里面储存数据
           },

           mutations: {
             increment (state) {
              state.count++
             }
             更改 Vuex 的 store 中的状态的唯一方法是提交 mutation, 里面是一些数据操作的函数，子组件通过这些函数操作数据，函数第一个参数默认为 state
             mutation 里面的函数必须是同步的
           }

           action:{
             increment (context) {
              context.commit('increment')
             }
             action 作用是多次触发 mutation 里面的函数，而且可以是异步的；Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象（理解时可以直接当做 store）
           }

           getters: {
              isAllSelected(state) {
                return state.todos.every(it => it.done)
              }
              里面是一些 getter 函数，函数第一个参数默认为 state；就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
           }
        })
      * 对于子组件
        Vue.component('todo-footer', {
          methods:{
            clearCompleted() {
              this.$store.commit('clearCompleted',argument)
            }可以通过 this.$store.commit 触发 store 实例 mutations 里面的数据变更函数
            increment(){
              this.$store.dispatch('increment',argument)
            }可以通过 this.$store.dispatch 触发 store 实例 action 里面的数据变更函数
          },
          computed：{
            leftCount() {
              return this.$store.getters.leftCount
            }可以通过 this.$store.getters 触发 store 实例 getters 里面的 getter 函数
          },
        })
    * 模块
      Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter const moduleA = { state: { ... }, mutations: { ... }, actions: { ... }, getters: { ... }}
      const moduleB = {state: { ... },mutations: { ... },actions: { ... }}
      const store = new Vuex.Store({modules: {  a: moduleA,  b: moduleB}})

  * Vue Router
    * 前端路由
      页面本身不刷新，前端发送了请求，后端发回了数据，前端解析数据把数据渲染到前端对应的页面模板中。
      Vue Router默认是Hash模式的前端路由，通过#后面值的改变，渲染指定DOM位置的不同组件
    * Vue Router 是 Vue.js 官方的路由管理器，用于构建单页面应用
    * 安装
      除了通过 scrip 标签引用，其它方式引用要确保在开头调用了  Vue.use(VueRouter)，而且 Vue.js 需要先加载
    * 使用方法
      * 对于 HTML
        <div id="app">
          <router-link to="/foo">Go to Foo</router-link>
          <router-link to="/bar">Go to Bar</router-link>
          <router-view></router-view>
        </div>
          <router-link>表示组件，to 属性指定链接，会被渲染成一个 `<a>` 标签
          <router-view></router-view> 路由匹配到的组件将渲染在这里
      * 对于 router 对象
          const router = new VueRouter({
          routes: [{
            path: "/a", 路由匹配到的路径
            redirect: '/wechat'  路由匹配到该路径跳转另外路径
            name："112"  命名路由用的，一般用不到
            alias: '/b' 别名，用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样；用得少
        },
        {
            path: "/wechat", 路由匹配到的路径
            component: wechat, 路由匹配到该路径就渲染这个组件
            children：[{
              path: 'man', 这个路径表示匹配到 /wechat/man 这个路径
              components:safd,
              这个属性用于路由的嵌套
              }]
          } ,
      * 对于根组件
        const app = new Vue({
            router,  把 router 对象提供给 “router” 选项，这可以把 router 的实例注入所有的子组件，子组件可以通过 this.$router 访问到根组件的 router 对象
            el: "#app",
        })
      * 对于组件
        let chat = {
            template:` 必要属性
            <div>
              <div>你正在和{{$route.params.id}}聊天</div>
              <button @click="$router.go(-1)">返回</button>
            </div>
            `
        }
    * 其它方法
      * 路由对象 route
        一个路由对象 (route object) 表示当前激活的路由的状态信息，路由对象是不可变的，每次成功的导航后都会产生一个新的对象。
        访问方式：在组件内，即 this.$route；通过 watch 监控 $route ；全局 router.match(location) 的返回值
      * 动态参数
        {path: '/user/:id', component: User }
        通过 id 来传递动态参数
        /user/foo 和 /user/bar 都将映射到这个路由。参数储存在 this.$route.params 这个对象里，在组件里可以通过 this.$route.params.id 拿到参数；同时也有 $route.query 和 $route.hash 的 api
      * 当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用，组件的生命周期钩子不会再被调用；复用组件时，想对路由参数的变化作出响应的话，通过 watch 监控 $route 对象
        watch: {
        '$route' (to, from) {
          // 对路由变化作出响应。..
        }

      * 通配符
        path: '*'   会匹配所有路径
      * 编程式导航  效果和<router-link>一样，可直接在组件中调用
        router.push('path') 会向 history 添加新记录
        router.replace('path') 不会向 history 添加新记录
        router.go(n) 在 history 记录中向前或者后退多少步
    * HTML5 History 模式
      * vue-router 默认 hash 模式 ，即使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
      * HTML History 模式就是除掉路径中的#号，使其看上去美观
        http://localhost:3010/new-product/vue-app#/orders/paid/weifahuo
        让以下地址返回的内容跟上面的地址返回一样的内容，同时注意相对路径
        上方#标明了前端路由的路径，下方没有，所以需要在 router 里设置后端路由是从哪到哪，需要在服务端增加一个覆盖所有情况的候选资源
        http://localhost:3010/new-product/vue-app/orders/paid/weifahuo

   * Vue CLI(command line interface)
      * runtime 版本和完整版本 vue 的区别
        * render 函数 接受三个参数，render（标签名，属性，子元素），根据传入信息将其转化为虚拟 dom
        * vue.complile   是 vue 编译器，浏览器通过这个编译器将模板字符串转化为 render 函数
        * 完整版 vue 有这个编译工具，runtime 版本没有，但是 runtime 版本会提前把模板字符串编译为 render 函数，这样就少了浏览器的编译过程，提升性能和效率

      * vue 相关文件和工具
        bable：一个广泛使用的转码器，可以将 ES6 代码转为 ES5 代码，从而在现有环境执行；让旧版本的浏览器可以用最新的语法
        stylus : 一种类似 scss 的语言，现在主流是 scss
        vue-loader: web-pack 插件，编译器
        ESLint：js 代码风格检查工具，目前流行的是 Airbn/standard/prettier
        browserslist 查询每一款浏览器支持什么特性的工具
        .editorconfig 编辑器配置文件
        PostCSS  一个平台，可以安装各种 js 插件转换编译 CSS
        package-lock 锁定安装时的包的版本号，并且需要上传到 git，以保证其他人在 npm install 时大家的依赖能保证一致
        npm run XXX 是执行配置在 package.json 中的脚本
        npm run build , 相当于运行 vue-cli-service build，会生成一个 dist 文件，里面是打包的可用于生产环境的包，之后把这些包放到 web 服务器里面的 static 文件夹里
        umd  Universal Module Definition 一些模块类型，umd 类型的会全局定义一个变量

      * .vue 文件的格式
        * <template>模板内容，可以高亮</template>
        * <style lang="scss" scoped> css 代码 </style> scoped 表示 css 只对这个组件生效
        * <script>js 代码</script>
        * import 模块 / 组件 from path 导入模块
          - 这里可以用 @表示 src 文件的路径，比较方便
        * export default {components:{导入得到局部组件需要在这个里面赋值过来才能在 template 生效，一般组件名都大写}, 其它组件属性}

      * 安装 npm install -g @vue/cli
      * 单个文件快速原型开发
        vue serve 文件名   vue serve index.vue
      * 创建一个项目
        * winpty vue.cmd create 项目名称   linux 环境下
          vue create 项目名称   window 环境下
        * 会生成一个项目文件夹，里面有以下信息
          * git 相关
          * public 网站用到的公开的文件，一般是图片和 html，基本不用动
          * src 项目的源代码
            * main.js 入口js文件
            * App.vue 入口组件
            * components 组件，会被 App.vue 引用
            * views 视图，路由对应的组件文件放这里
            * 路由，数据仓库，视图等
            * asset 静态资源
          * 一些配置文件
          *readme.md  告诉你这么开启这个项目的命令
        * 相关文件配置好后，运行 npm run build , 它会把相关文件打包到 dist 文件里，之后吧 dist 文件里面的资源放到 static 文件里

## React

  * 三个引用
    * 这个文件是用来实现虚拟 dom 的，全局创建一个 react 变量，react 代码里面的每一个标签都通过 bable 转化为了 React.creatElement（标签名，属性，子元素）
     <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    * 这个文件是用来实现真实 dom 的，全局创建一个 ReactDOM 变量
      <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    * 这个 bable 文件是用来编译 react 代码的，如 JSX, 编译为 ES5 代码
      <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
      <script type="text/babel">react代码</script>
  * ReactDOM.render(react 代码实现一个虚拟 dom，document.getElementById('root'))
    这个函数接收两个参数，将第一个参数虚拟 dom 编译到第二个参数 React 根元素里面
  * Source map
    Source map 就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。
  * 插值
     通过{}插值，里面可以是各种类型的值，可以是表达式但不能是语句
  * React 组件
    * 组件名必须大写
    * 不能将通用表达式作为组件名，组件名必须是静态的，即使用组件时它是确定唯一的
    * class 组件
      class 大写组件名 extends React.Component{
        constructor(props){
          super(props)  用来引入 this，props 用来接收组件标签传来的属性，一般是一个对象{prop:value},props 只读不能更改；props.chidren 可以直接拿到组件的子元素或者中间的插值
          this.state={  用来记录数据状态
            key：value
          }
        }
        render(){
           会返回一个虚拟 dom，就是组件模板
           如 return (<div>{this.state.key}</div>) React 通过{}传递动态数据
        }
        method = ()=>{
          this.setState({}) /this.setState((state)=>{return {}})
          React 只能通过 setState 设置数据状态才可以更改 dom, 相当于把新的 state 浅合并到旧的 state 里面，只更改新 state 传入的部分，其它数据保留；this.state 的指向从开始创建到更新一直没有改变，指向同一个对象，对象里面的数据发生改变
          setState 也可以接收一个函数，参数默认是 state，返回一个新的 state 对象
        } class fields 语法，相当于把这个方法传入到 construct 里面，并加上 this; 即 this.methods=()=>{}
      }
    * 函数组件
      function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      } 创建一个简单的函数组件，函数组件没有实例，也没有 ref 属性

  * State 的更新可能是异步的，出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。
    * 在同步函数里面调用 setState 那么 state 的更新是异步的
    * 在异步函数里面调用 setState 那么 state 的更新是同步的

  * React 的特殊事件和属性写法
    * <lable htmlFor =""> lable 标签里面的 for 属性，因为 for 是 js 关键字
    * className= ""  属性的类型 class 要写为 className，react 的 className 属性不能动态的添加值，可以用 npm 库的 classnames
    * style 属性只接收对象不接收字符串
    * onClick , onDoubleClick  ,onChange 相关事件
    * React 里面的事件名和属性名都采用驼峰式
    * React 里面的 style 属性的值必须是一个对象 ，style ={对象{}}
    * React 里面的 onChange 事件不是光标移开后触发，而是输入的每时刻都会触发
    * key 和 ref 属性是组件的特殊属性，不在 props 上面

  * 组件标签可以写作自闭和标签，React 里面的自闭和标签必须要 /，如 input 标签

  * JSX
    * JavaScript 的语法扩展，一种标签语法
      const element = <h1>Hello, world!</h1>，会调用 React.creatElement（标签名，属性，子元素）构建虚拟 dom
    * JSX 会移除行首尾的空格以及空行。与标签相邻的空行均会被删除，文本字符串之间的新行会被压缩为一个空格

  * 条件渲染
    通过与运算符 && 和？：运算符达成条件筛选；当渲染的插值内容是{null,undefined,false,true}时不会渲染

  * 表单
    * 受控组件： 表单元素有 value 属性，这个时表单无法被修改
    * 非受控组件
      * 不加上 value 属性
      * defaultValue 替代 value 属性
      * 加上 value 属性和 onChange 事件

  * 组合和继承
    React 里面基本不用继承，只继承 React.Component, 更多是在一个组件里面使用另外的组件的组合

  * Fragments 一个组件返回多个并列子元素的方法
    * render() {
        return (
          <React.Fragment><ChildA /><ChildB /><ChildC /></React.Fragment>
        );
      }
    * 也可以用<> </> 或者 [] 代替 Fragments 组件实现组合，但是 Fragments 支持 key 元素

  * Refs
    * 提供了父组件访问子组件或者子元素的唯一方法
    * 使用方法，为子组件标签提供一个 ref 属性
      * 方法一
        * ref 属性值是一个字符串 <input ref ='box'/>，在父类方法里面通过 this.refs.box 就可以拿到 input 元素
        * 该方法不推荐，因为 react 难以实现，性能低
      * 方法二
        * ref 属性值是一个函数 <input ref ={ el => this.box = el } />, 该子组件的实例默认为参数，并且把该实例挂载到父类的某个属性上面，然后父类通过该属性访问子组件，即 this.box 即可访问到
        * 一般把 ref 的属性值函数定义为父类的一个方法，子组件引用该方法即可；如果不这样父类每次被渲染时，react 没法识别函数有没有更改，子组件都会生成一个函数，浪费性能；通过引入就可以不再重复渲染这个不变的函数
        * 如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。
      * 方法三
        * ref属性值是一个对象，<input ref ={ this.boxRef }/>, 该子组件会把自己挂载在该对象的 current 属性上，然后再父类通过 this.boxRef.current 访问子组件
        * 在父类构造函数中创造一个 ref 对象； this.boxRef = React.createRef() ,React.createRef() 会生成一个对象{current：null}
        * 这种方法由于这个对象绑定子组件后就没有变，以后每次渲染父类就不用再次创建了。现在最推荐的就是这种方法
  * 协调，React 的 diff 函数，即前后虚拟 dom 对比方式
    * 对比方式
      * 无 key 时 效率为 O(n)
        * 首先根元素进行对比，根元素类型不同直接替换为新的，根元素类型一样就对比其属性，属性不同替换为新的；
        * 子元素按照顺序对比，方法和根元素一样
      * 有 key 时
        新旧虚拟 dom 对比时，key 值相同的进行对比，减少对此次数，效率更高

  * React 的生命周期函数
    * 挂载阶段
      * constructor()
         如果不初始化,state 或不进行方法绑定，则不需要构造函数
      * static getDerivedStateFromProps()
        在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state， state 的值在任何时候都取决于 props, 如果返回 null 则不更新任何内容；不常用
      * render()
        class 组件中唯一必须实现的方法，会渲染出虚拟 dom
      * componentDidMount()
        会在组件挂载后（插入 DOM 树中）立即调用，依赖于 DOM 节点的初始化应该放在这里。
    * 更新阶段
      * static getDerivedStateFromProps()
      * shouldComponentUpdate(nextProps, nextState)
        根据这个函数的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为（返回 true）是 state 每次发生变化组件都会重新渲染。此方法仅作为性能优化的方式而存在，可以人工控制下层组件是否更新，return false 后面的 render 就不会运行，不常用
      * render()
      * getSnapshotBeforeUpdate()
        在最近一次渲染输出（提交到 DOM 节点）之前调用，这个函数运行完真实 dom 会被渲染。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）, 不常用
      * componentDidUpdate(prevProps, prevState, snapshot)
        会在组件更新后会被立即，此时调用真实 dom 已经完成，可以直接对 dom 操作。首次渲染不会执行此方法
    * 卸载阶段`
      * componentWillUnmount()
        在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作

  * 生命周期中有一类 unsafe 生命周期函数不建议使用原因
    * react 的架构或者渲染机制的改变带来的问题
    * React-Fiber 架构
      * 解决 dom 树过深同步渲染整个 dom 性能下降问题
      * 将 dom 拆分渲染，分不同的时间片段异步渲染
      * 由于异步的存在，可以根据用户行为灵活的调整 dom
    * unsafe 类生命周期函数正是因为在某些情况下会和 React-Fiber 的异步机制发生冲突所以不推荐使用，可能会有 bug
    * render之前的函数都必须是纯函数或者是static方法函数，render之前的函数不能产生副作用，可能会和 React-Fiber 的异步机制发生冲突

  * 不要 UNSAFE_ componentWillMount 在这个组件里面发生 AJAX 请求的原因
    * 这个函数后面会紧接着 render 函数，由于请求资源是一个异步过程，render 函数执行的时候资源没请求下来，没法更新 dom
    * 所以建议这类异步请求放到 componentDidMount 里面，放到后面可以减少 dom 挂载时间
    * UNSAFE_ componentWillMount 会紧接着 Construct 函数运行，官方建议不使用这个函数，里面其它的操作可以直接放到构造函数里面

  * PropTypes
    * 用来设定组件属性类型，有许多表达方式
    * React 自带模块，直接引入 import PropTypes from 'prop-types'
    * 组件名.propTypes = {
        属性名：PropTypes.string/PropTypes.bool/PropTypes.func/PropTypes.object
      }
      MenuItem.propTypes = {
        food: PropTypes.object.isRequired,
        onUpdate: PropTypes.func,
      }

      MenuItem.defaultProps = {
          onUpdate: () => { },
      }

  * Render Props 渲染属性
    * 其本质是一个属性是一个函数，这个函数属性以组件的数据为参数得到一个 jsx 代码，组件的 render() 接收这个 jsx 渲染为虚拟 dom；所以这个属性可以是任何名字，业界通用叫做 render
    * 组件接收一个属性 render, 属性值是一个函数，组件会把自己的数据传给这个函数作为参数，函数的结果会被组件中的 render() 函数接收渲染
    * 在组件的 render() 函数里通过 this.props.render 可以拿到这个函数，再接收自己的 state 数据就可以通过函数返回一段 JSX, 最后渲染；
    * 告知组件需要渲染什么内容的函数属性
    * <DataProvider render={data => (
        <h1>Hello {data.target}</h1>
      )}/>

  * 转发Refs
    * 使组件接收到的 ref 属性不指向自己，而是转发到组件内部的元素
    * 使用 React.forwardRef 创建组件，该组件的 ref 属性会转发到内部
    * 相当于组件换了一个名字 abc 接收 ref 值，然后内部的元素 ref 属性接收 abc 属性转发来的 ref 值，React.forwardRef 只是让组件继续可以使用 ref 属性
    * const FancyButton = React.forwardRef((props, ref) => (
        <button ref={ref} className="FancyButton">
          {props.children}
        </button>
      )); 创建了一个 FancyButton 组件
      const ref = React.createRef();
      <FancyButton ref={ref}>Click me!</FancyButton>;

  * React 相关 api
    * React.PureComponent
      和 React.component 的唯一区别是，他会自动调用 shouldComponentUpdate() 这个周期函数，以浅层对比 prop 和 state，如果相同组件就不会刷新，可提高性能，用于 class 组件
    * React.memo()
      和 React.PureComponent 功能一样，不过它适用于函数组件 ，不适用于 class 组件；接收一个函数组件为参数，返回包装后的组件
    * React.creatElement（标签名，属性，子元素）
      创建并返回指定类型的新 React 元素，此时还没有实例化，是对虚拟 dom 的描述，上面有 key,ref，props 这些属性，渲染之前会根据这些信息创造实例，实例会调用 render() 函数
    * cloneElement( element,[props],[...children])  克隆 React 元素， props 与原始元素的 props 浅层合并后的结果。新的子元素将取代现有的子元素，而来自原始元素的 key 和 ref 将被保留
    * React.children 用来处理 this.props.children
        - React.Children.map(children, function[(thisArg)])
        - React.Children.forEach(children, function[(thisArg)])
        - React.Children.count(children)  返回 children 中的组件总数量
    * React.lazy  代码分割，优化性能 , 需要返回一个 promise，必须配合 React.Suspense 使用
      const SomeComponent = React.lazy(() => import('./SomeComponent'))
    * React.Suspense
      * 内部异步加载的函数会抛出一个 promise（这个异步函数会被包一层），Suspense 本身是个错误边界会获取到这个 promise
      * 如果有这个资源的缓存就会同步返回数据，没有就运行 fallback 对应的组件，直到子元素资源加载完成替换为子元素
      <React.Suspense fallback={<div>loading</div>}>
      <div>
        <SomeComponent />
      </div>
      </React.Suspense>

  * Portals   门户网站
    * Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案，常用于对话框、悬浮卡以及提示框
    * ReactDOM.createPortal(child, container)
      child 是 React 子元素，container 是一个 DOM 元素，child 会渲染到容器里，而不是父类；使用在组件的 render 函数里
    * 子元素冒泡时按照实际 dom 结构冒泡而不是直接冒泡到容器

  * 高阶组件
    * 和高阶函数类似，高阶组件是参数为组件，返回值为新组件的函数

  * 错误边界
    * 错误边界是一种 React 组件，捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且它会渲染出备用 UI
    * 类似在组件层面实现了一个 try catch 机制，让错误不会跑到外层
    * 事件处理，异步，自身错误而非子组件的错误无法捕捉
    * 如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界，然后直接当做常规组件用，形成一个错误墙，错误组件里面子组件的错误会被错误边界捕获

  * 与第三方库协同
    * 通过 ref 属性拿到第三方库要操作的元素
    * 在这个元素上面通过第三方库的事件机制触发组件本身的处理函数来更新 state

  * 合成事件
    * react 的事件是对浏览器的原生事件的跨浏览器包装，兼容所有浏览器，挂载 props 上
    * 事件对象会被重复使用（节约内存），事件结束之后事件对象会被清空，所以不能通过异步访问事件
    * e.persist() 保留合成事件对象，事件结束之后不会清空，配合异步函数
      e.nativeEvent 访问原生浏览器对象

  * Context
    * 实现了自上而下跨组件传递数据，跨组件层级共享数据
    * 使用方法
      * 全局创建一个 context 实例
        var MyUserContext = React.createContext(null) 里面的参数是默认值，一般填 null
      * Context 实例对象上面有个 MyUserContext.Provider 组件开始向下传递数据，MyUserContext.Provider 组件内部可以接收数据，如果没有 value 属性就会传递默认值
        <MyUserContext.Provider value={this.state.user}></MyUserContext.Provider>
      * 内部接收数据方法
        * 通过<MyUserContext.Consumer>接收，其内部是一个函数，参数为接收的 value, 返回需要渲染的 JSX 代码，而且可以多层嵌套
           <MyUserContext.Consumer>{value=>{reture JSX代码}}</MyUserContext.Consumer>
        * 通过子组件的静态属性把 context 实例赋值到 contextType 属性，然后再 JSX 中可以使用 this.context 访问到 value
          static contextType = MyUserContext
          this.context
  * 性能优化
    * 结构共享，最大可能的共用已有数据，联想树状结构和指针思考，共用完全不变的子树
      * immer.js  一个实现结构共享的库 <script src="https://unpkg.com/immer/dist/immer.umd.js"></script>
        const produce = immer.produce  这个库会引入一个全局变量 immer，上面有个 produce 方法
      * 用法一
        * 先定义一个变更，等到有数据时再执行这个变更；f = pruduce(draft=>{})
        * draft 是对象代理，代理接收到的参数对象 obj，会拦截所有对 obj 的访问；读取数据时，draft 上面没有回溯到 obj 上找，设置数据时设置到 draft 上；
        * f 函数接收一个对象 obj，draft 代理这个对象，直接对 draft 操作就是对传入对象进行操作，而且是最大可能的共用已有数据；
        * produce((draft,action)=>{}), 函数除了代理对象还可以接收其它变更时需要的参数
      * 用法二
        produce(obj,draft=>{}) 接收 2 个参数，第一个是原对象，第二个是代理操作，返回新的数据对象
      * ES6 通用，ES5 退化通过 getter 和 setter 代理，但是不可以添加新的属性
    * 通过生命周期函数 shouldComponentUpdate 优化性能

  * hook
    * 为函数组件带来了 state 和类似生命周期函数的功能
    * state 不会合并，而是完全替代之前的 state，多利用展开运算符
    * 函数组件状态改变时整个组件都会重新刷新
    *  hook 函数在创造时，React 会根据他们在调用栈的顺序确认各自身份，所以 hook 函数的调用顺序在组件刷新时不能改变，根据调用顺序确定各个状态身份；
    * 使用方法
      * 解构语法引入 hook 函数
        var { useState, useEffect, useRef, useContext, useCallback, useMemo } = React
      * useState 函数，接收的参数会设置为 state 的初始值，返回一个数组 [state, 操作 state 的函数 setState]
        setState(value){state =  value} setState 的函数大概是这样
        如 var [count, setCount] = useState(0)
      * useEffect 函数，相当于一个生命周期函数 componentDidMount 或 componentDidUpdate，直接在函数组件内部使用
        *用法
          useEffect(
            ()=>{
              第一个参数是一个函数，可以挂载 componentDidMount 或 componentDidUpdate 阶段需要的操作；
              这个函数可以有一个返回值函数，返回值函数会在函数组件 componentWillUnmount 阶段运行，可有挂载一些解绑操作；
              对于函数组件来讲，每次更新都会卸载再挂载；所以每次更新都会运行这个返回值函数
            },【第二个可选参数是一个数组，当组件刷新时如果发现数组的内容和上一次一样，那么就不会运行这个 useEffect 函数，用于性能优化；要确保数组中包含了外部作用域中会随时间变化并且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量，如果是空数组表示每次都是完全一样的内容，不运行】
          )
        * 优点
          * 绑定和解绑放在一起，可读性和操作性好
          * 对于复杂的逻辑，可以写多组 useEffect() 函数，相关逻辑放到同一个 useEffect() 函数里面，逻辑分离

      *  useContext 函数 hook, 类似 class 组件里面的 Context 功能
         * 开始的用法和 class 组件一样，先在外部创建一个 context 实例
           var ColorContext = React.createContext()
           Context 实例对象上面有个 ColorContext.Provider 组件开始向下传递数据，用于组件内部
           <ColorContext.Provider value={color}>
         * 接收数据方法
          在后代组件中直接使用 useContext(Context 实例对象）接收数据
          var color = useContext(ColorContext) 接收数据

    *  useCallback
        * 函数组件每次更新都会重新运行，每次运行都会创建一个新的作用域，作用域里面的函数都会是新建的，如果子组件中用到了这些更新的函数，子组件每次都要更新，影响性能
        * var f = useCallback(fun(){},[]) 第一个参数接一个函数，第二个参数接一个数组，当组件刷新时如果发现数组的内容和上一次一样时，就返回上次的函数，否则返回这次的函数

    *  useMemo
        * 和 useCallback 功能一样，不过写法不一样
        * var f = useMemo(()=>fun(){},[])

    *  useRef
        和 class 组件里面的 React.createRef() 功能用法一样，useRef() 也会创建一个{current：null}对象；由于函数组件每次更新都会重新运行，每次运行都会创建一个新的作用域，作用域里面的函数都会是新建的；使用 React.createRef() 函数组件更新每次都会创建一个新的对象，占用内存；而 useRef 就是为了解决这个问题的，函数组件中使用 useRef() 返回的对象在函数组件刷新前后都是同一个对象

  * 自定义 hook
    * 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook 函数
    * 目的是将组件逻辑提取到一个函数，这个函数从而具有组件的一些功能，本质就是高阶函数
    * 自定义组件库 https://nikgraf.github.io/react-hooks/

  * react 路由
    * 安装
      <script src = "https://unpkg.com/react-router-dom@4.3.0/umd/react-router-dom.js"> / npm install react-router-dom
    * var { BrowserRouter,HashRouter,Switch,Route,Link,withRouter} = ReactRouterDOM   引入变量
    * 相关变量
      * HashRouter：一个组件，包裹在所有路由的最外层，表示以 hash 模式进行地址导航
      * BrowserRouter: H5 模式，一般不需要
      * Switch, 可选，表示按照顺序匹配内部的路由，只匹配满足条件的第一个
      * Route： 导航组件 <Route path="/users/:id" exact><Component/></Route>
          * path 只能接完整路径，嵌套路由也是完整路径
          * exact 表示必须精确匹配路径，默认都是开头匹配就行，匹配成功就就加载中间的组件
          * 也可以通过 path 向内部组件参数
          * path 里面"*"表示通配符，匹配所有路径
      * link： 相当于一个 a 标签 <Link to="/about">About</Link>, 点击就导航到对应路由组件
      * 路由里的不是由 <Route path="">过来的组件不能直接接受 path 传递来的参数，需要 withRouter 将组件包裹一层
        var User = withRouter(function User(props) {})
        接受到的属性 props 是个对象，有 history，location,match 几个属性，分别有相关的方法，可以通过 props.match.params. 参数名 (id) 拿到传递过来的参数
    *  react 是按照业务逻辑书写，符合用法即可。
       function App() {
        return (
          <HashRouter>
            <div>
              <nav>
                <Link to="/users">Users</Link>
              </nav>
              <Switch>
                <Route path="/users"> 
                  <Users />
                </Route>
                <Route path="/users" component={组件名Users}/>
              </Switch>
            </div>
          </HashRouter>
        )
      }

  * Redux
    * 比较底层的封装，单项数据流，全局数据中心，实现了组件之间的数据和事件的传递
    * 仅支持同步函数，异步需要使用第三方插件（Redux-thunk）
    * 用法
      * 引入<script src="https://unpkg.com/redux@4.0.4/dist/redux.js">
      * 创造一个 store
        * var store = Redux.createStore((state, action)=>{},state)
        * 第一个参数是一个 reducer 函数，函数有 2 个参数，state 表示储存的数据，action 是一个对象，子组件里面通过 dispatch 函数来传递这个对象，这个 reducer 函数通过 action 的信息来触发对 state 的相关操作，返回一个新的 state
        * 创建的 store 上面有两个常用的方法，dispatch 和 subscribe 方法
          - dispatch, 传递给下层组件，下层组件利用这个方法操作 state 触发更新
          - subscribe, 用来监听 state 变更
            - var unSubscribe = store.subscribe(fun)
            - 数据变更时 fun 会运行，这个 fun 不接参数，并返回一个函数 unSubscribe
            - 调用 unSubscribe 就会把这次的监听函数 subscribe 解绑
      * mutations
        * 下层组件 dispatch 的 action 里面有操作类型信息，一般放到 action.type 属性上，reducer 会根据 action.type 来执行某种操作，当我们可以把这些操作集中放到全局定义的一个 mutations 属性上面，reducer 函数接收到 action 时先从 mutation 上面拿到函数，再操作 state
        var store = Redux.createStore((state, action) => {
          var mutation = mutations[action.type]
          if (mutation) {
            return mutation(state, action)
          } else {
            return state
          }
        }, state)
        * 操作数据的方法可以配合 immer.js，优化性能而且更方便

    * 下层组件如何接入 store，需要第三方插件集成
      * <script src="https://unpkg.com/react-redux@5.0.6/dist/react-redux.js">
        var { Provider，connect} = ReactRedux
      * 在根组件里面的最外层用 <Provider store={store}></Provider>包一层，下层组件就可以访问到 store 的 state 以及相关方法
      * connect 函数的用法
        * var NewComponent = connect(mapStateToProps,mapDispatchToProps)(Component)
        * Component 表示一个子组件，可以是函数组件或者 class 组件
        * mapStateToProps 函数，state=>{return {}}, 对 state 进行相关操作，返回一个对象 obj1
        * mapDispatchToProps 函数，dispatch=>{return {deleteTodo: (idx) => dispatch({type: 'deleteTodo', idx})}}, 返回一个对象 obj2，对象属性是组件相关方法名称，属性值是一个函数，这个函数里面会 dispatch 相关 action 到 store 的 reducer 函数，触发组件更新；
          obj1 和 obj2 都会合并到组件的 props 对象里面，这样组件可以通过 props.method 来 dispatch 相关方法到达交互目的
        * NewComponent 新返回的组件，可以接受全局的 store 进行交互
      *  connect 函数的实现
          var StoreContext = React.createContext()
          function connect(mapState, mapDispatch) {
            return function(WrapComp) {
              return React.forwardRef(function Comp(props, ref) {
                var store = useContext(StoreContext)
                var [r, setR] = useState(0)
                useEffect(() => {
                  return store.subscribe(() => {
                    setR(r + 1)
                  })
                })
                var state = mapState(store.getState())
                var dispatchs = mapDispatch(store.dispatch)
                var {children, ...props2} = props
                return <WrapComp ref={ref} {...props2} {...state} {...dispatchs}>{children}</WrapComp>
              })
            }
          }

  * react 全家桶
    * 创建一个项目全家桶
      npm create-react-app 项目名称
      npx 表示下载完成之后直接运行
    * npm/yard run start  本地运行代码
    * 会生成一个项目文件夹，里面有以下信息
        * git 相关
        * public 网站用到的公开的文件，一般是图片和 html，基本不用动
        * src 项目的源代码
          * index.js 入口文件
          * App.js 入口组件
          * 自己写 store 以及相关组件
        * 一些配置文件
        *readme.md  告诉你这么开启这个项目的命令
    * 相关文件配置好后，运行 npm run build , 它会根据 src 和 public 一起构建一个 build 文件，之后把 build 文件里面的资源放到后端的static静态文件夹里，这样就可以用后端的端口启动项目；这个 build 文件就是上线启动文件

## webpack

  * 打包
  * 将除 js 以外的其它资源也当成 require 的资源，如图片，css,json,svg，字体，他通过把这些非 js 资源转化为等价的 js 文件来实现；这个格式转换工具在 webpack 里面称为 loader, 即使是 js 文件也会经过 bable-loader 转换
    比如对于图片而言，小资源转换为 base64，大资源转换资源地址；
    比如sass-loader,css-loader,style-loader
  * plugin 在 webpack 则是对整体的打包结果进行处理的一种插件机制
    如压缩，混淆代码（安全保密），（webpack-jsuglify-plugin）
    处理通用（vendor）模块的抽离（common-chunks-plugin）
    自动生成入门 html 页面（webpack-html-plugin）
  * 代码分割 code spliting
    将一开始不需要用到的模块打包到另一个或多个文件中，在需要的时候（代码执行到对应的位置时）再加载
  * 摇树优化 tree shaking
    不需要用到的代码将不会进入到打包结果中，减少打包体积
    此功能主要依赖 es module 语法，因为它提供静态分析（即不运行代码对代码进行分析）的可能性

## 其它框架知识
  * 微信小程序 https://developers.weixin.qq.com/miniprogram/dev/framework/
  * ssr 服务端渲染
      * 一次请求响应就拿到所有渲染数据,客户更快看到页面内容
      * 直接返回目标页面，不需要重新加载
      * 方便SEQ
      * 需要后端配置
  * React Native 是用来开发移动应用。需要用到React概念    
