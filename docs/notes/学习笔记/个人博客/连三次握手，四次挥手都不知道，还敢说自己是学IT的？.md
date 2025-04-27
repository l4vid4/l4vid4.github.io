---
title: 连三次握手，四次挥手都不知道，还敢说自己是学IT的？
date: 2020-05-14
tags:
  - 计算机网络
---
# 前言
- 众所周知，TCP（传输控制协议）是面向连接的、高可靠的、基于字节流的运输层传输协议。不像UDP传输时直接把东西丢给对方，TCP建立传输连接时需要严格的三次握手，释放连接时也需要四次挥手。那么这三次握手和四次挥手又是啥东西呢？

# 三次握手
## 三次握手概述
 - 所谓三次握手就是TCP连接建立时需要在客户和服务器之间交换三个TCP报文段。
 - 其目的在于
  1. 要使每一方能够明确知道对方的存在，就像拉朋友打游戏前——“在？”，“在”，“鸡？”，“来”。
  2. 要允许双方协商一些参数（如最大窗口值、最大报文段长度MSS、是否使用窗口扩大选项和时间戳选项以及服务质量等）——“啥地图？”，“海岛就成。”
  3. 能够对运输实体资源（如缓存大小、连接表中的项目等）进行分配——“有时间打吧，别一会儿挂机了”，“有”。
 ## 三次握手过程
 #### 第一次握手
![第一次握手](https://img-blog.csdnimg.cn/2020051410371668.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)
 - 第一次握手由客户端发起，向服务端发出请求报文，其中同步位SYN为1，表示这是个请求报文，seq为序号，然后等待服务器确认，此时客户端进入SYN_SENT状态。
 #### 第二次握手
 ![第二次握手](https://img-blog.csdnimg.cn/20200514104536737.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)
 - 第二次握手由服务端发出，对客户端的请求表示确认ACK=1表示确认，同意连接，ack = x+1表示确认收到前x序号内容。同时服务端再发送一个SYN包，请求客户端的确认，seq置为y，表明传输数据时的第一个字节序号。SYN+ACK包发送完毕，服务端进入SYN_RECV状态。
#### 第三次握手
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200514105519696.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)
- 客户端收到服务器给出的报文段后发出ACK包对其进行确认，ack=y+1，seq=x+1，此报文段发送完毕后，连接建立成功，开始传输数据，双方进入ESTAB-LISHED状态。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200514110034998.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)
## 为什么要第进行三次握手（要对确认进行确认）？
- 为了防止已失效的连接请求报文段突然又传送到了，因而产生错误。
- 如果采取两次握手，相当于第二次握手结束便建立连接，如果发送SYN的一方不想连接了，也不会有反馈，另一方却一直在等待，浪费了时间。当然可以采取4次甚至N次握手，但是有必要吗？建立连接的时间太长，效果也会大打折扣。所以3次只是折中方案，保证了可靠性，又节俭了建立连接的时间。（摘自[小飞](https://www.cnblogs.com/xiaofei1/archive/2019/04/09/10676699.html)）
# 四次挥手
## 四次挥手概述（原因）
- 数据传输结束后，通信双方要释放连接
- 由于TCP连接是全双工的，因此每个方向都必须单独进行关闭。
- 这原则是当一方完成它的数据发送任务后就能发送一个FIN来终止这个方向的连接。收到一个 FIN只意味着这一方向上没有数据流动，一个TCP连接在收到一个FIN后仍能发送数据。首先进行关闭的一方将执行主动关闭，而另一方执行被动关闭。
## 四次挥手过程
#### 第一次挥手
![第一次挥手](https://img-blog.csdnimg.cn/2020051411104299.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)
- 客户端首先发送FIN报文段（连接释放报文段），主动关闭客户端到服务器的数据传输，FIN置为1，其序号seq=u，并等待B的确认。
#### 第二次挥手
![第二次挥手](https://img-blog.csdnimg.cn/20200514111525258.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)

- 服务端收到客户端的连接释放报文段，对其发出确认，发回一个ACK确认报文，确认号收到的序号加一即u+1，此时从客户端到服务器方向的连接就释放完成，TCP连接处于半关闭状态，如果服务器端仍要发送数据，那么客户端依旧需要接收。

#### 第三次挥手
![第三次挥手](https://img-blog.csdnimg.cn/2020051411214499.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)

- 第三次挥手依旧由服务端发出，类似第一次挥手，如果服务端没有要向客户端发送的数据了，应用进程通知TCP释放连接，同时发送一个FIN报文，ACK置为1，seq序号置为w，确认号ack置为u+1。

#### 第四次挥手
![第四次挥手](https://img-blog.csdnimg.cn/20200514114545420.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)

- 客户端收到服务端的FIN报文，对其进行确认，发出确认报文，确认号置ack为w+1，自己的序号seq=u+1。至此，虽然完成了四次挥手但连接并未完全释放。必须经过时间2MSL后才能真正释放掉。
#### 四次挥手中客户端服务端各状态
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200514115042729.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)
## 为什么要经过2MSL时间才能释放
1. 为了保证A发送的最后一个ACK报文段能够到达B
2. 防止已失效的连接请求报文段出现在本连接中

# 后记
- 三次握手和四次挥手讲解完毕。
- 如有错误的地方，请大佬指正。
- 转载请注明出处。
