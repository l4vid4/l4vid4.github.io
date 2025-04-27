---
title: jvm
createTime: 2025/04/24 18:35:24
permalink: /studyNotes/oqotvw7j/
---
# JVM虚拟机

## 运行时数据区

- 堆：存放对象

- 栈（线程私有）

  > - 栈帧
  >
  > 1. 局部变量表
  > 2. 操作数栈：程序在运行过程中临时的内存空间
  > 3. 动态链接
  > 4. 方法出口

- 本地方法栈（线程私有）：

- 方法区元空间：常量+静态变量+类信息

- 程序计数器（线程私有）

![JVM内存模型](https://raw.githubusercontent.com/lrffun/ImageStorage/main/img/JVM%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B.png)

#### 垃圾收集

1. 创建的对象首先进入Eden。
2. 每次minor gc扫描，如果是垃圾（是否被gc root直接或间接引用）则直接处理，否则Eden中的对象移入From，同时From中的对象移入To中，To中的对象移入From中，并增长一岁。
3. 当对象年龄达到15，移入老年代。
4. 当老年代已满，触发full gc。

## 命令

- javap -c main.class > out.txt反汇编class文件

# JVM调优

## Arthas

- 下载地址：https://arthas.aliyun.com/arthas-boot.jar

### 常用命令

- dashboard，查看面板
- thread 8，定位线程问题
- thread -b，查看阻塞线程原因
- jad com.packge.name 反编译包
- ognl 命令可以查看线上系统变量的值，甚至可以修改变量的值

