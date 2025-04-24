# CTF

- WEB：网络攻防
- Reverse：逆向工程
- PWN：二进制漏洞
- Crypto：密码学
- Mobile：移动安全
- Misc：安全杂项

## Linux基础

### 目录结构

- /bin：存放最常使用的命令
- /boot：启动Linux时使用的一些核心文件，包括一些链接文件以及镜像文件
- /dev：device，存放的是Linux的外部设备
- /etc：存放系统管理所需要的配置文件
- /home：用户的主目录
- /lib：存放基本的动态连接库，相当于Windows中的DLL
- /opt：给主机额外安装软件所拜访的目录
- /root：系统管理员用户主目录
- /sbin：存放的是系统管理员使用的系统管理程序
- /usr：用户的很多用户程序和文件都放在这个目录下
- /usr/bin：应用程序。/usr/sbin：高级程序
- /tmp：存放临时文件
- /var：存放不断扩充着的东西，经常被修改的文件放在这个目录下，包括log文件

### Linux文件权限

![image-20240418200838786](https://raw.githubusercontent.com/lrffun/ImageStorage/main/img/image-20240418200838786.png)

- chmod u+x test
- chmod 777 test      授予test文件所有用户可读可写可执行
- chown root.root test  修改文件所属组

# 信息搜集

## 域名信息收集

### Whois

- whois.aliyun.com

### 备案信息

- www.beianbeian.com
- icp.chinaz.com

### 子域名收集

- 搜素引擎搜集： site:hetianlab.com（sql注入漏洞：inurl:php?id=1）（heibai.org/post/975.html）
- 站长之家：tool.chinaz.com
- 网络空间安全搜索引擎：https://fofa.so
- ssl证书查询：https://crt.sh
- js文件发现域名：https://github.com/Threezh1/JSFinder

- 子域名工具：oneForAll，Subdomainsbrute

## IP信息收集

### 判断CDN

- 多地ping：ping.chinaz.com
- http://www.webkaka.com/Ping.aspx
- 绕过CDN：外网ping，查询子域名ip，phpinfo文件，Mx记录邮件服务，查询历史DNS记录（securitytrails.com）

### C段存活主机探测

- nmap -sP www.XXX.com/24
- github.com/se55i0n/Cwebscanner

## 端口信息收集

### 常见端口

#### FTP——21，20

- ftp基础爆破：owasp的Bruter，hydra以及msf中的ftp爆破模块。
- ftp匿名访问：用户名：anonymous 密码：为空或者任意邮箱
- vsftpd后门
- 嗅探：ftp使用明文传输，使用Cain进行渗透

#### SSH——22

- 弱口令，可使用工具hydra，msf中的ssh爆破模块
- SSH后门
- openssh用户枚举CVE-2018-15473

#### Talnet——23

- 类似SSH

#### SMTP——25/465

- 邮件传输协议

#### WWW——80

- 
- 中间件漏洞，如IIS、apache、nginx等

#### NetBIOS SessionService——139/445

- 139用于提供的的windows文件和打印机共享及UNIX中的Samba服务

- 445用于提供windows文件和打印机共享

  > 1. 对于开放139/445端口，尝试利用MS17010溢出漏洞进行攻击
  > 2. 对于只开放445端口，尝试利用MS06040、MS08067溢出漏洞进行攻击
  > 3. 利用IPS$进行渗透

#### MySQL——3306

1. 弱口令
2. 弱口令登录MySQL，上传构造的恶意UDF 自定义函数代码，通过调用注册的恶意函数执行系统命令
3. SQL注入获取数据库敏感信息，load_file()函数读取系统文件，导出恶意代码到指定路径。

#### RDP——3389

- RPD暴力破解攻击
- MS12_020死亡蓝屏攻击
- RDP远程桌面漏洞（CVE-2019-0708）
- MSF开启RDP、注册表开启RDP

#### Redis-6379

- 爆破弱口令
- redis未授权访问结合ssh key提权
- 主从复制rce

#### Weblogic-7001

- 弱口令爆破，弱密码一般为weblogic/Oracle@123 or weblogic
- 管理后台部署war包后门
- weblogic SSRF
- 反序列化漏洞

#### Tomcat-8080

- Tomcat远程代码执行漏洞（CVE-2019-0232）
- Tomcat任意文件上传（CVE-2017-12615）
- tomcat管理页面弱口令getshell

### Nmap

- [中文文档](https://nmap.org/man/zh)

- nmap -A -T4 IP

  > 1. -T0(偏执的)：非常慢的扫描，用于IDS逃避
  > 2. -T1(鬼祟的)：缓慢的扫描，用于IDS逃避
  > 3. -T2(文雅的)：降低速度以降低对带宽的小号，此选项一般不常用
  > 4. -T3(普通的)：默认，根据目标的反应自动调整时间
  > 5. -T4(野蛮的)：快速扫描，常用扫描方式，需要在很好的网络环境下进行扫描，请求可能会淹没目标
  > 6. -T5(疯狂的)：急速扫描，这种扫描方式以牺牲准确度来提升扫描速度。

- 基础用法

  > - 单一主机扫描：nmap IP
  > - 子网扫描：nmap 192.168.1.1/24 --exclude 192.168.1.1
  > - 多主机扫描：nmap IP1 IP2
  > - 主机范围扫描：nmap 192.168.1.1-100
  > - IP地址列表扫描：nmap -iL target.txt

- 探测存活主机

  > nmap -sn -v -T4 -oG Discovery.gnmap 192.168.1.1/24
  >
  > grep "Status: UP" Discovery.gnmap | cut -f 2 -d ' ' > liveHosts.txt

- 扫描全部端口

  > nmap -sS -v -T4 -Pn -p 0-65535 -oN FullTCP -iL liveHosts.txt

- 系统扫描

  > nmap -O -T4 -Pn -oG OSDetect -iL LiveHosts.txt

- 版本检测

  > nmap -sV -T4 -Pn -oG serviceDetect -iL LiveHosts.txt

- 漏洞扫描

  > nmap -p445 -v --script smb-ghost 10.202.94.104

## 其他信息搜集

### 历史漏洞信息

- http://wy.zone.ci
- https://wooyun.kieran.top
- https://www.exploit-db.com
- https://wiki.0-sec.org
- https://www.seebug.org

### 社会工程学

### 钓鱼页面

## 网站信息搜集

- robots.txt
- .DS_Store
- .index.php.swp
- backup
- phpinfo
