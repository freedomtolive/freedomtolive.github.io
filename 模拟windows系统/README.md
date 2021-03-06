## 妙味程序项目介绍
  此次项目历时近一个月,模拟了windows下的一些基本操作和展示，实现了桌面、此电脑、图片查看器及我的电脑中c、d盘的相关操作操作，删除文件，新建文件夹，重命名，搜索等相关交互方式。

### 1 基本写法
  此次项目采用了vue，jq，模板引擎等框架，桌面采用vue布局，此电脑、回收站和图片查看器采用面向对象的方式生成。还运用了正则表达式等方法，采用了es6中的超级字符串，箭头函数等最新语法，极大的提高了开发效率。

### 2 遇到的问题及解决方法
  作为一个js近三千行的大型项目，当中遇到的问题有很多，在此只简述最为典型的几个问题：
  
  1：c，d盘内的文件是相互拖拽时，由于c盘d盘都是相互独立的弹窗，因此在c盘上按下，在d盘上抬起的操作实现起来是不可行的。
  
  解决方案：在c盘上按下后，在document上抬起，抬起时鼠标位置和d盘这个弹窗的div做碰撞检测，如果检测为鼠标在d盘内，则默认为是在d盘上抬起的，执行拖拽操作，否则认为不是在d盘上抬起的，让文件消失。
  
  2：对c盘、d盘中的文件排序时，如果直接用sort进行排序，判断传入的值是不是c盘中的文件，如果传入的值都满足条件再进行sort排序。会导致整个数组顺去全部混乱。
  
  解决方案：由于不了解sort的运行机制，因此在运用sort进行排序的时候难免会出现无法控制的情况，此处我采取将符合条件的数组抽出来进行排序，然后将排序后的数组push回原数组，以达到之排序数组中个别数据的需求。
  
  3：右键点击桌面，文件，弹框的右键菜单时结构不同。
  
  解决方案：菜单的数据应该只有一套，此处根据事件缘的不同进行不同的组合，此处因为开发事件较短的原因，将几套右键菜单写死，根据事件元的不同让不同的右键菜单出现，以达到出现不同右键菜单的需求。

### 3 总结
  此项目中，我获得最大的收获还是思维上的收获，功能或许是一块一块的，但是当遇到组件间的相互通信时，两个独立的元素之间就会发生一些联系，因此很多时候需要用一些方法来处理两个单独组建间的交互，及组件间的信息数据的传递。例如在他们共同的父级上操作，或者利用自定义事件，都可以完美的解决上述问题。
