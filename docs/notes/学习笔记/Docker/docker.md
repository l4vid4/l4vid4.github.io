---
title: docker
createTime: 2025/04/24 18:35:24
permalink: /studyNotes/lzi9mcpj/
---
# Docker

 ## 启动命令

- systemctl start docker 启动docker
- systemctl stop docker 停止docker
- systemctl enable docker 开机自启docker

## Docker镜像加速配置

- [阿里云镜像加速](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

## 部署MySQL

```shell
docker run -d \		#命令起始，run代表运行，-d是让容器在后台运行
	--name mysql \   #为容器起一个名字
	-p 3306:3306 \     #-p设置端口映射（前面是宿主机端口，后者是容器内端口）
	-e TZ=Asia/Shanghai \	#-e设置环境变量
	-e MYSQL_ROOT_PASSWORD=123 \
	mysql	#运行的镜像的名字（完整是repository:tag，tag是版本）
```

## 镜像和容器

- 当我们利用Docker安装应用时，Docker会自动搜索并下载应用镜像（image）。镜像不仅包含应用本身，还包含应用运行时所需要的环境、配置、系统函数库。Docker会在运行镜像时创建一个隔离环境，成为容器（container）。
- 全球Docker仓库：[Docker Hub](https://hub.docker.com/)

## 常见命令

> [官方文档](docs.docker.com/reference)

![image-20240229210250629](https://raw.githubusercontent.com/lrffun/ImageStorage/main/img/image-20240229210250629.png)

- docker pull 拉取镜像

- docker images 查看本地镜像

- docker rmi 删除镜像

- docekr build 构建镜像

- docker save 保存镜像

- docker load 加载镜像

- docker push 推镜像

- docker run **创建**并启动镜像（docker run -d -p 80:80 --name mynginx nginx）

- docker stop停止镜像

- docker start 重新启动原来的容器

- docker rm 删除容器

- docker logs 查看容器日志，docker logs -f 持续查看日志

- docker exec 进入容器内部  

  >  -it bash 可交互终端（docker exec -it nginx bash）（docker exec -it mysql **mysql -uroot -p**）高亮代表执行的命令

## Linux命令重命名

1. 编辑vi ~/.bashrc

2. ```shell
   # .bashrc
   
   # User specific aliases and functions
   
   alias rm='rm -i'
   alias cp='cp -i'
   alias mv='mv -i'
   alias dps='docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}\t{{.Names}}"'
   
   # Source global definitions
   if [ -f /etc/bashrc ]; then
           . /etc/bashrc
   fi
   
   ```

3. 更新source ~/.bashrc

## 数据卷

- 数据卷是一个虚拟目录，是容器内目录与宿主机目录之间映射的栋梁。

  ![image-20240309220615890](https://raw.githubusercontent.com/lrffun/ImageStorage/main/img/image-20240309220615890.png)

| 命令                  | 说明                 |
| --------------------- | -------------------- |
| docker volume create  | 创建数据卷           |
| docker volume ls      | 查看所有数据卷       |
| docker volume rm      | 删除指定数据卷       |
| docker volume inspect | 查看某个数据卷的详情 |
| docker volume prune   | 清除数据卷           |
| docker volume --help  | 查看所有命令信息     |

- 在执行docker run命令时，使用**-v 数据卷:容器内目录**可以完成数据卷挂载

  > ```shell
  > docker run -d --name nginx -p8080:80 -v html:/usr/share/nginx/html nginx
  > ```

- 在执行docker run命令时，使用**-v 本地目录:容器内目录可以完成本地目录挂载（目录必须以/或./开头）

  > ```shell
  > docker run -d \
  > 	--name mysql \
  > 	-p 3306:3306 \
  > 	-e TZ=Asia/Shanghai \
  > 	-e MYSQL_ROOT_PASSWORD=123 \
  > 	-v /root/docker/mysql/data:/var/lib/mysql \
  > 	-v /root/docker/mysql/init:/docker-entrypoint-initdb.d \
  > 	-v /root/docker/mysql/conf:/etc/mysql/conf.d \
  > 	mysql
  > ```

- 当创建容器时，如果挂载了数据卷且数据卷不存在，会自动创建数据卷

- mysql容器创建时如果不指定会自动生成匿名卷

## 自定义镜像

- 自定义镜像包括**入口、层和基础镜像**

### Dockerfile

- Dockerfile就是一个文本文件，其中包含一个个的指令，用什么指令来说明要执行什么操作来构建镜像。将来Docker可以根据Dockerfile帮我们构建镜像。常见指令如下：

  | 指令       | 说明                                         | 示例                                                         |
  | ---------- | -------------------------------------------- | ------------------------------------------------------------ |
  | FROM       | 指定基础镜像                                 | FROM centos:6                                                |
  | ENV        | 设置环境变量，可在后面指令使用               | ENV key value                                                |
  | COPY       | 拷贝本地文件到镜像的指定目录                 | COPY ./jrell.tar.gz /tmp                                     |
  | RUN        | 执行Linux的shel命令，一般时安装过程的命令    | RUN tar -zxvf /tmp/jrell.tar.gz && EXPORTS path=/tmp/jrell:$path |
  | EXPOSE     | 指定容器运行时监听的端口，是给镜像使用者看的 | EXPOSE 8080                                                  |
  | ENTRYPOINT | 镜像中应用的启动命令，容器运行时调用         | ENTRYPOINT java -jar xx.jar                                  |

- 更多指令参考[官方文档](https://docs.docker.com/engine/reference/builder)

- 我们可以基于Ubuntu基础镜像，利用Dockerfile描述镜像结构

  ```shell
  # 指定基础镜像
  FROM ubuntu:16.04
  # 配置环境变量，JDK的安装目录、容器内时区
  ENV JAVA_DIR=/usr/local
  # 拷贝jdk和java项目的包
  COPY ./jdk8.tar.gz $JAVA_DIR/
  COPY ./docekr-demo.jar /tmp/app.jar
  # 安装JDK
  RUN cd $JAVA_DIR \ && tar -xf ./jdk8.tar.gz \ && mv ./jdk1.8.0_144 ./java8
  #配置环境变量
  ENV JAVA_HOME=$JAVA_DIR/java8
  ENV PATH=$PATH:$JAVA_HOME/bin
  # 入口，java项目的启动命令
  ENTRYPOINT ["java","-jar","/app.jar"]
  ```

  

- 我们也可以直接基于JDK为基础镜像，省略前面的步骤

  ```shell
  # 基础镜像
  FROM openjdk:11.0-jre-buster
  # 拷贝jar包
  COPY docker-demo.jar /app.jar
  # 入口
  ENTRYPOINT ["java", "-jar", "/app.jar"]
  ```

- 当编写好Dockerfile，可以利用下面命令来构建镜像：

  ```shell
  docker build -t myImage:1.0
  ```

  > -t：是给镜像起名，格式依然是repository:tag的格式，不指定tag时，默认为latest
  >
  > .：是指定Dockerfile所在目录，如果就在当前目录，则指定为"."

## 网络

- 默认情况下，所有容器都是以bridge方式连接到Docker的一个虚拟网桥上 

  ![image-20240311225141847](https://raw.githubusercontent.com/lrffun/ImageStorage/main/img/image-20240311225141847.png)

### 自定义网桥

| 命令                      | 说明                     |
| ------------------------- | ------------------------ |
| docker network create     | 创建一个网络             |
| docker network ls         | 查看所有网络             |
| docker network rm         | 删除指定网络             |
| docker network prune      | 清除未使用的网络         |
| docker network connect    | 使指定容器连接加入某网络 |
| docker network disconnect | 使指定容器连接离开某网络 |
| docker network inspect    | 查看网络详细信息         |

## Docker部署前端

```shell
docker run -d \
	--name nginx \
	-p 80:80 \
	-p 81:81 \
	-v /root/nginx/html:/usr/share/nginx/html \
	-v /root/nginx/nginx.conf:/etc/nginx/nginx.conf \
	--network fresh \
	nginx
```

# DockerCompose

- Docker Compose通过一个单独的docker-compose.yml模板文件（YAML格式）来定义一组相关联的应用容器，帮助我们实现多个相互关联的Docker容器的快速部署。

![image-20240329165525093](https://raw.githubusercontent.com/lrffun/ImageStorage/main/img/image-20240329165525093.png)



- docker-compose.yml

![image-20240407095934220](https://raw.githubusercontent.com/lrffun/ImageStorage/main/img/image-20240407095934220.png)

```yaml
version: "1.0"

services:
	mysql:
		image: mysql
		container_name: mysql
		ports: 
			- "3306:3306"
		environment:
			TZ: Asia/Shanghai
			MYSQL_ROOT_PASSWORD: 123
		volumes:
			- "./mysql/conf:/etc/mysql/conf.d"
			- "./mysql/data:/var/lib/mysql"
			- "./mysql/init:/docker-entrypoint-initdb.d"
		networks:
			- test
	hmall:
		build:
			context: .
			dockerfile: Dockerfile
		container_name: hmall
		ports:
			- "8080:8080"
		networks:
			- hm-net
		depends_on: #先创建依赖
			- mysql
	nginx:
		image: nginx
		container_name: nginx
		ports:
			- "18080:18080"
			- "18081:18081"
		volumes:
			- "./nginx/nginx.conf:/etc/nginx/nginx.conf"
			- "./nginx/html:/usr/share/nginx/html"
		depends_on:
			- hmall
		networks:
			- hm-net
	networks:
		hm-net:
			name: hmall
		
```

- DockerCompose的命令

| 参数    | 说明                         |
| ------- | ---------------------------- |
| -f      | 指定compose文件的路径和名称  |
| -p      | 指定project名称              |
| -d      | 后台运行                     |
| up      | 创建并启动所有service容器    |
| down    | 停止并移除所有容器、网络     |
| ps      | 列出所有启动的容器           |
| logs    | 查看指定容器的日志           |
| stop    | 停止容器                     |
| start   | 启动容器                     |
| restart | 重启容器                     |
| top     | 查看运行的进程               |
| exec    | 在指定的运行中容器中执行命令 |



