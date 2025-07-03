import{_ as i,c as a,a as n,o as l}from"./app-dsZ4C4U9.js";const e={};function h(k,s){return l(),a("div",null,s[0]||(s[0]=[n(`<h2 id="启动与跳转" tabindex="-1"><a class="header-anchor" href="#启动与跳转"><span>启动与跳转</span></a></h2><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">g++</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -g</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -std=c++14</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> unique_ptr.cpp</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -o</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  unique_ptr</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">gdb</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> unique_ptr</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">   </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">gdb</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -tui</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> unique_ptr</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //分页，上半页代码，下半页调试</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">ctrl+x加ctrl+a</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">    //关闭/开启分屏</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">start</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">       //开始启动程序,并停在main第一句等待命令</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">run/r</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">       //运行程序，直到遇到第一个断点、报错或者正常结束</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">continue</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/c</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //继续执行（直到遇见断点或者结束）</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">next</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">        //执行下一条语句</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">step</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">        //进入当前行（函数）内</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">finish</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">      //连续运行到当前函数返回为止</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">return</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">      //从当前位置退出当前函数（不会执行函数剩余部分，这一点和finish的跳出是不一样的）</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">stop</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">        //停止</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">quit</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">        //退出</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">vmmap</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">   //查看ne</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">plt</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">      //查看plt内容</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">got</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">     //查看got内容</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">gdb</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -tui模式下上下左右键就失效了，此时使用</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Ctrl</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> +</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> P</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 和</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Ctrl</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> +</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> N</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 来上下移动光标，使用</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Ctrl</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> +</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> B</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 和</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Ctrl</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> +</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> F</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 来左右移动光标等。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在GDB（GNU调试器）中，命令 <code>x</code> 用于检查内存内容。具体的 <code>x/20gx</code> 命令的含义如下：</p><ul><li><code>x</code>: 检查内存（examine memory）。</li><li><code>/20</code>: 表示要显示的内存单元的数量，这里是20个。</li><li><code>g</code>: 表示显示每个内存单元为8字节（即64位）的格式。<code>g</code> 是GDB中的一种格式代码，表示 &quot;giant words&quot;（8字节）。</li><li><code>x</code>: 表示以十六进制格式显示内存内容。</li></ul><p>因此，<code>x/20gx</code> 这个命令会从指定的内存地址开始，显示20个8字节大小的内存单元，每个单元用十六进制格式显示。</p><p>例如，如果你在GDB中使用这个命令并提供一个内存地址，如：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">x/20gx</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0x601000</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>backtrace：函数调用关系</li><li>return：跳出当前函数</li></ul><h2 id="layout" tabindex="-1"><a class="header-anchor" href="#layout"><span>layout</span></a></h2><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">layout</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> src</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 1.显示源代码窗口。</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">layout</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> regs</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 显示寄存器窗口</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">layout</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> asm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 显示汇编代码窗口</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">layout</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> split</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 显示汇编代码窗口</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">info</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> win</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 显示汇编代码窗口</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">layout</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> next</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 显示汇编代码窗口</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">layout</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> prev</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 显示汇编代码窗口</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">focus</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> name</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 切换当前窗口。name可以为</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> cmd</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">src</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">asm</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">regs</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">next</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">prev</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">refresh</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 刷新所有窗口</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">update</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 更新源代码窗口和当前执行点</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">winheight</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> name+/-</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> line</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 调整窗口的高度。name可以为</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> cmd</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">src</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">asm</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">regs</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、断点" tabindex="-1"><a class="header-anchor" href="#_3、断点"><span>3、断点</span></a></h2><pre><code>break/b n    //在第n行加断点
break/b func   //在函数func内的第一行加断点
b *0x400
break/b fileName:N   //在文件fileName的第N行加断点
break/b 30 if n==100   //当变量n等于100的时候在30行处加断点
info break/b       //查看断点
clear N    //删除N号断点
delete N   //删除N号断点
delete     //删除所有断点
disable N  //失能N号断点
enable N   //使能N号断点
</code></pre><h2 id="_4、调试输出" tabindex="-1"><a class="header-anchor" href="#_4、调试输出"><span>4、调试输出</span></a></h2><h3 id="_4-1、变量" tabindex="-1"><a class="header-anchor" href="#_4-1、变量"><span>4.1、变量</span></a></h3><pre><code>p xxx   //打印变量xxx的值
display xxx  //监控变量xxx的值
p *arr@10   //打印数组arr的前10个元素
display *arr@10   //监控数组前10个值
info display   //查看被监控的变量
 
info agrs  //显示当前函数的参数值
info locals  //显示当前局部变量的值
 
set var xxx=1123  //修改变量值为1123
</code></pre><h3 id="_4-2、堆栈" tabindex="-1"><a class="header-anchor" href="#_4-2、堆栈"><span>4.2、堆栈</span></a></h3><pre><code>info stack     //查看函数堆栈，并显示每一层的参数值
backtrace(bt)  //查看函数堆栈，并显示每一层的参数值
info frame  //查看当前函数调用的栈帧信息
frame N     //查看栈编号为N的上下文
 
info source   //查看程序当前所执行的行的信息（所在文件、所在路径、调用函数等信息）
</code></pre><h3 id="_4-3、线程" tabindex="-1"><a class="header-anchor" href="#_4-3、线程"><span>4.3、线程</span></a></h3><pre><code>info inferiors  //查询正在调试的进程
inferior N  //切换调试的进程
 
info threads //查看所有线程（当前线程前面有*）
thread N //切换到当前线程
thread apply all bt  //查看所有线程堆栈
</code></pre><h3 id="_4-4、日志" tabindex="-1"><a class="header-anchor" href="#_4-4、日志"><span>4.4、日志</span></a></h3><pre><code>set logging file name.log      //设置文件名称
set logging on                 //记录日志文件开始
set logging overwrite          //记录日志文件重写，需要在set logging on开启了日志文件之后才可以使用
...                            //调试记录
(gdb) set logging off          //记录日志文件关闭
</code></pre><h3 id="_5、多线程" tabindex="-1"><a class="header-anchor" href="#_5、多线程"><span>5、多线程</span></a></h3><pre><code>set scheduler-locking off  //不锁定任何线程
set scheduler-locking on   //只有当前线程可以运行，其余线程被gdb挂起
 
thread ID   //切换线程
break *** thread ID  //为某个线程设置断点
</code></pre><h3 id="_6、调试core文件" tabindex="-1"><a class="header-anchor" href="#_6、调试core文件"><span>6、调试core文件</span></a></h3><p>当程序core dump时，可能会产生core文件，它能够很大程序帮助我们定位问题。但前提是系统没有限制core文件的产生。可以使用命令limit -c查看：</p><pre><code>$ ulimit -c
0
</code></pre><p>如果结果是0，那么恭喜你，即便程序core dump了也不会有core文件留下。我们需要让core文件能够产生：</p><pre><code>ulimit -c unlimited  #表示不限制core文件大小
ulimit -c 10        #设置最大大小，单位为块，一块默认为512字节
</code></pre><p>core文件产生后调试方法如下：</p><p>gdb 原始的可执行文件 core文件</p>`,30)]))}const t=i(e,[["render",h]]),d=JSON.parse('{"path":"/studyNotes/0v2k9lko/","title":"GDB","lang":"zh-CN","frontmatter":{"title":"GDB","createTime":"2025/04/24 18:35:25","permalink":"/studyNotes/0v2k9lko/"},"readingTime":{"minutes":4.25,"words":1275},"git":{"updatedTime":1745747081000,"contributors":[{"name":"Lang","username":"Lang","email":"914551901@qq.com","commits":3,"avatar":"https://avatars.githubusercontent.com/Lang?v=4","url":"https://github.com/Lang"}]},"filePathRelative":"notes/学习笔记/信息安全/GDB.md","headers":[]}');export{t as comp,d as data};
