---
title: 记一次用Python爬取代理IP并使用（尝试用代理IP制造直播房间访问量）
date: 2020-03-31
tags:
	- Python
	- 爬虫
---
## 前言
- 首先说一下代理IP的用法途（代码中会有涉及）：代理IP可以用来隐藏你的真实IP，你访问网站是通过代理服务器来做一个中转，所以目标服务器只能看到代理服务器的IP地址，这样就可以让你的IP地址实现隐身的功能 

## 准备工作
- 我这边是找到了一个平台：https://www.kuaidaili.com/，先在地址后面加robots.txt查看平台的robots协议（https://www.kuaidaili.com/robots.txt）如下，可以看到平台未明令禁止爬虫爬取的页面，那我们就可以放心爬了。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200331123756470.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)
- 按f12分析一下页面先，左上角箭头选中ip之后直接右键复制XPath。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200331124128212.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)
- 测试后发现，IP不是通过接口传输的，而是存在在静态页面上，这就省事很多了。
- 并且，点击下一页后，url变化很小。
- url很简单，这里就不过多分析了，直接上代码。
## 上代码
- 首先爬取前五页。（这里要注意加上headers模拟浏览器访问）

```python
#爬取数据

def get_ip():
    for page in range(1,5):
        print("=============================正在抓取第{}页数据==============".format(page))
        base_url = 'https://www.kuaidaili.com/free/inha/{}/'.format(page)
        headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0'}
    
        response = requests.get(base_url,headers=headers)
        data = response.text
        #print(data)
        html_data = parsel.Selector(data)
        # 解析数据
        parsel_list = html_data.xpath('//table[@class="table table-bordered table-striped"]/tbody/tr')
        for tr in parsel_list:
            proxies_dict = {} 
            http_type = tr.xpath('./td[4]/text()').extract_first()  #用xpath找到目标
            ip_num = tr.xpath('./td[1]/text()').extract_first()
            ip_port = tr.xpath('./td[2]/text()').extract_first()
            proxies_dict[http_type] = ip_num + ':' + ip_port	#将ip地址和端口号用":"连接
            proxies_list.append(proxies_dict)
            print(proxies_dict)
            time.sleep(0.5) 
        print(proxies_list) 
        print("获取到的代理ip数量：",len(proxies_list))
    return proxies_list
```
- 然后，考虑到有些ip能用，有些ip不能用，所以需要对其进行清洗。剔除不能用的或反应慢的。这里可以试着用代理ip访问一下百度首页，并检测返回状态来确定ip是否可用。

```python
def check_ip(proxies_list):
    """检测代理ip的质量"""
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0'}
    can_use = []

    for proxy in proxies_list:
        try:
            response = requests.get('https://www.baidu.com',headers=headers,proxies=proxy,timeout=0.08)         #代理ip使用方式，如果要筛选更快的ip，timeout可适当降低
            if response.status_code == 200: #返回状态码为200即为可用
                can_use.append(proxy)
        except Exception as e:
            print(e)
    return can_use
```
- 简单组合一下，爬取部分就算搞完了。

```python
ip_list = get_ip()	#获取IP
can_use = can_use(ip_list)	#清洗IP
```
## 代理IP使用
- 这是我当时脑门一热想到的通过用代理ip进入直播间来增加人气，实验后发现，我太天真了，实验失败，根本不能增加人气，各位可以传入别的网址来实现用代理IP访问固定网站，can_use参数就传入上面得到的can_use就行。
```python
def start(url,can_use):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0'}

    for proxy in can_use:
        try:
            response = requests.get(url,headers=headers,proxies=proxy,timeout=1)
            if response.status_code == 200:
                print("进入直播间。。。")
        except Exception as e:
            print(e)
```
- 其次，我觉得如果用代理IP爬取网站内容的话，可能会绕过网站的反爬策略，只是思考了一下，并未实践。
- 或者也可以将代理IP写入数据库，留着慢慢用。

```python
# 入库
def engine_in(ip_list):
    conn = pymysql.connect(host='localhost',user='root',password='123',database='size',port=3306) #连接数据库
    cursor = conn.cursor()
    for ip in ip_list:
        sql = "INSERT INTO ip(ip) values('" + ip + "');" #SQL语句
        cursor.execute(sql) #执行SQL语句
        conn.commit()
    conn.close()
```

## 后记
- Tip：写爬虫前首先要看一下该网站的robots.txt协议是否允许爬取，在其允许范围内适当爬取数据。
> 爬取代理ip的想法是我从某学习平台学到的，若有冒犯，请联系删除
