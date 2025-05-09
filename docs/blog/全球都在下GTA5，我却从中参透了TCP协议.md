---
title: 全球都在下GTA5，我却从中参透了TCP协议
createTime: 2020/05/15
tags:
  - 计算机网络
permalink: /studyNotes/3fl3y4gn/
---
# 前言
- 首先，不得不说，EPIC是真的大方，直接将GTAV免费送，没有领取的小伙伴先[点这里](https://www.epicgames.com/store/zh-CN/)白嫖一下，然后开始我们今天的正事。
- 可能博主也是等这94个G等迷糊了，想起了TCP的传输过程，文章不长，也是突然间想到记下来，大家看个乐呵就行，如果理解有误，请大佬指正。
# 开始分析
## 首先附上下载过程图片
![GTA5下载](https://img-blog.csdnimg.cn/2020051514332860.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)

## TCP可靠传输的实现
- EPIC客户端下载类似Steam，有5个进度条，我也不多废话，直接看最后一个和倒数第二个进度条。
- 首先看一个动态图[点击跳转](http://www.exa.unicen.edu.ar/catedras/comdat1/material/Filminas3_Practico3.swf)
- 看过之后你会发现，最后一个进度条和TCP的传输很像，怎么像呢，下面我来解释下。
1. 以“字节”为单位：可以把最后一个进度条的一个小方格看成一个字节（虽然肯定比字节大很多），你会发现，他们都是一个一个或一组一组往后传输的。
2. 检测丢失并重传：深蓝色的是没有传输的，浅蓝色的是丢失的（或错误的），粉色的是传输完成的，绿色的是传输完成并确认（写入）的。偶尔会出现丢失（出现一个浅蓝方格），那么写入就会停止，等待重传后再继续写入。
3. 有接收缓存：缓存的存在是协调高速设备和低速设备，最后一个进度条就类似缓冲区，写入的速度非常快（达到400M每秒），而下载的速度相较就非常慢，缓冲区的存在协调了这种差距，偶尔写入停止，等待没有错误再继续写入。

# 后记
- 文章仅代表个人拙见，可能人家设计的进度条根本不是这个意思，但是将其作为TCP传输模型也未尝不可。
- 心（xian）血（de）来（dan）潮（teng）记录一下个人发现，如有错误地方，请大佬指正。
