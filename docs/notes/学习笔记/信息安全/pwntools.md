# pwntools

- io.recv() ----- 获取输出
- io.recvline() ---- 获取一行输出
- io.send() ----- 向服务器发送一段数据
- io.sendline() ----- 等效于send，但在最后自动加一个换行符

- elf = ELF("./ret2libc1")
- elf.plt["system"]——直接获取plt表中system函数地址
- next(elf.search(b"/bin/sh"))——找到字符串
- io.sendlineafter()，收到第一个参数字符之后，发送第二个参数
- io.recvuntil()，一直接收字符，直到收到参数所示字符，drop = True：丢弃参数所示字符
- cyclic(60)，生成60个字符的垃圾数据