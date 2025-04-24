## 启动与跳转

```shell
g++ -g -std=c++14 unique_ptr.cpp -o  unique_ptr
 
gdb unique_ptr   
gdb -tui unique_ptr  //分页，上半页代码，下半页调试
ctrl+x加ctrl+a    //关闭/开启分屏
 
start       //开始启动程序,并停在main第一句等待命令
run/r       //运行程序，直到遇到第一个断点、报错或者正常结束
continue/c  //继续执行（直到遇见断点或者结束）
next        //执行下一条语句
step        //进入当前行（函数）内
finish      //连续运行到当前函数返回为止
return      //从当前位置退出当前函数（不会执行函数剩余部分，这一点和finish的跳出是不一样的）
stop        //停止
quit        //退出
vmmap   //查看ne
plt      //查看plt内容
got     //查看got内容

 
gdb -tui模式下上下左右键就失效了，此时使用 Ctrl + P 和 Ctrl + N 来上下移动光标，使用 Ctrl + B 和 Ctrl + F 来左右移动光标等。
```

在GDB（GNU调试器）中，命令 `x` 用于检查内存内容。具体的 `x/20gx` 命令的含义如下：

- `x`: 检查内存（examine memory）。
- `/20`: 表示要显示的内存单元的数量，这里是20个。
- `g`: 表示显示每个内存单元为8字节（即64位）的格式。`g` 是GDB中的一种格式代码，表示 "giant words"（8字节）。
- `x`: 表示以十六进制格式显示内存内容。

因此，`x/20gx` 这个命令会从指定的内存地址开始，显示20个8字节大小的内存单元，每个单元用十六进制格式显示。

例如，如果你在GDB中使用这个命令并提供一个内存地址，如：

```shell
x/20gx 0x601000
```

- backtrace：函数调用关系
- return：跳出当前函数

## layout

```shell
layout src  // 1.显示源代码窗口。
 
layout regs  // 显示寄存器窗口
 
layout asm  // 显示汇编代码窗口
 
layout split  // 显示汇编代码窗口
 
info win  // 显示汇编代码窗口
 
layout next  // 显示汇编代码窗口
 
layout prev  // 显示汇编代码窗口
 
focus name  // 切换当前窗口。name可以为 cmd|src|asm|regs|next|prev
 
refresh  // 刷新所有窗口
 
update  // 更新源代码窗口和当前执行点
 
winheight name+/- line  // 调整窗口的高度。name可以为 cmd|src|asm|regs
```

## 3、断点

    break/b n    //在第n行加断点
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

## 4、调试输出
### 4.1、变量

    p xxx   //打印变量xxx的值
    display xxx  //监控变量xxx的值
    p *arr@10   //打印数组arr的前10个元素
    display *arr@10   //监控数组前10个值
    info display   //查看被监控的变量
     
    info agrs  //显示当前函数的参数值
    info locals  //显示当前局部变量的值
     
    set var xxx=1123  //修改变量值为1123

### 4.2、堆栈

    info stack     //查看函数堆栈，并显示每一层的参数值
    backtrace(bt)  //查看函数堆栈，并显示每一层的参数值
    info frame  //查看当前函数调用的栈帧信息
    frame N     //查看栈编号为N的上下文
     
    info source   //查看程序当前所执行的行的信息（所在文件、所在路径、调用函数等信息）

### 4.3、线程

    info inferiors  //查询正在调试的进程
    inferior N  //切换调试的进程
     
    info threads //查看所有线程（当前线程前面有*）
    thread N //切换到当前线程
    thread apply all bt  //查看所有线程堆栈

### 4.4、日志

    set logging file name.log      //设置文件名称
    set logging on                 //记录日志文件开始
    set logging overwrite          //记录日志文件重写，需要在set logging on开启了日志文件之后才可以使用
    ...                            //调试记录
    (gdb) set logging off          //记录日志文件关闭

### 5、多线程

    set scheduler-locking off  //不锁定任何线程
    set scheduler-locking on   //只有当前线程可以运行，其余线程被gdb挂起
     
    thread ID   //切换线程
    break *** thread ID  //为某个线程设置断点

### 6、调试core文件

当程序core dump时，可能会产生core文件，它能够很大程序帮助我们定位问题。但前提是系统没有限制core文件的产生。可以使用命令limit -c查看：

    $ ulimit -c
    0

如果结果是0，那么恭喜你，即便程序core dump了也不会有core文件留下。我们需要让core文件能够产生：

    ulimit -c unlimited  #表示不限制core文件大小
    ulimit -c 10        #设置最大大小，单位为块，一块默认为512字节

core文件产生后调试方法如下： 

gdb 原始的可执行文件 core文件