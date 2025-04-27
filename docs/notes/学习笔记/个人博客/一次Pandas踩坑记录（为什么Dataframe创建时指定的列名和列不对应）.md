---
title: 一次Pandas踩坑记录（为什么Dataframe创建时指定的列名和列不对应）
date: 2020-07-24 16:46:06
tags:
---
- 最近做课设的时候遇到一个特别头疼的问题，在将ndarray转换为dataframe时，指定的列名就是对应不起来（如下图），四处询问，查看pandas源码均无果。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200724163815215.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM3MTg0Mg==,size_16,color_FFFFFF,t_70)
- 解决方法：一次偶然的尝试我发现错误原因，Dataframe创建时指定列名columns应该是数组形式而不是字典形式，也就是说应该用“[]”而不是“{}”。
- 因为一个小马虎耽误了这么长时间(\捂脸)。发此文记录下自己的马虎经历，也给读者们作反面教材。
