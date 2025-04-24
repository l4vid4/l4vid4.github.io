## Hadoop基本命令

### 查看目录

```shell
hadoop fs -ls /databases/studentprofile
```

### 上传

```shell
hadoop fs -put /path/* /databases/studentprofile
```

### 下载

```shell
hadoop fs -get  /databases/studentprofile /path
```

## Hive基本命令

### 进入hive

```shell
hive
```

### 刷新数据表

```shell
MSCK REPAIR TABLE my_table;
```

### 查看hive数据表信息

```shell
DESC FORMATTED your_table_name;
```

