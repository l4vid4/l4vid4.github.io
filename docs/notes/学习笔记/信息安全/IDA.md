---
title: IDA
createTime: 2025/04/24 18:35:25
permalink: /studyNotes/r5k4n0g7/
---


## IDA

- `db`：表示“define byte”，用于定义一个字节长度的数据。在IDA中，通常用于表示字符或者8位的整数。
- `dw`：表示“define word”，用于定义一个字长度（16位）的数据。在IDA中，通常用于表示16位整数或者Unicode字符。
- `dd`：表示“define doubleword”，用于定义一个双字长度（32位）的数据。在IDA中，通常用于表示32位整数或者地址。

## 各窗口

- IDA View-A：反汇编窗口
- Hex View-A：16进制窗口
- Imports：导入表
- Exports：导出表
- Structures：结构体
- Enums：枚举类型

## 快捷键

- 空格：从流程图→汇编指令
- 显示硬编码→A字节     C编码    D数据    U16进制
- 跳转指令→G
- 搜素指令→ALT+T
- 函数重命名→N
- 函数定义修改→Y

- 新建结构体→右上角Edit→Add Structor，D添加变量，ALT+Q结构体，
- 注释→**;**   **:**

- 选中C语言代码，然后右键Copy To Assembly对照每一行
- 找到所有的字符串：shift+f12

## 各部分

- LOAD：用于程序装入内存的控制信息
- .init：用于初始化的节，记录了程序的初始化代码
- .plt：程序链接表
- .text：代码
- .got.plt：got表，记录了每个动态链接函数在libc的真实地址
- .rodata：只读数据