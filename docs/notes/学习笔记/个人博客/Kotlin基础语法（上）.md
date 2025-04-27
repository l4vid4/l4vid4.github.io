---
title: Kotlin基础语法（上）
date: 2020-06-02 20:24:37
tags:
---

# [Kotlin基础语法（下）](https://lang186.blog.csdn.net/article/details/106930532)
# Kotlin基础语法（上）
## 输出Hello world!!!
```kotlin
fun main(args:Array<String>){
    println("Hello world!!!")
}
```

## 变量与输出
```kotlin
fun main(args:Array<String>){
    var name:String = "张三"   //定义字符串类型
    var name = "张三"          //自动判断类型为字符串（智能类型推断           ）
    var age = 20   //定义整型
    name = "李四"
    var aInt:Int = 0boo11 //二进制方式赋值
    println("aInt的值："+aInt)
}
```
## kotlin常见数据类型
![kotlin常见数据类型](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWFnZXMyMDE4LmNuYmxvZ3MuY29tL2Jsb2cvMTI1NTYyNy8yMDE4MDMvMTI1NTYyNy0yMDE4MDMwNDIzMjc0Njc2Ny0xMDE3OTI1MTE4LnBuZw?x-oss-process=image/format,png)

## 变量的取值范围
```kotlin
fun main(args:Array<String>){
    val along:Long = Long.MAX_VALUE     //判断long型取值范围
    val blong:Long = Long.MIN_VALUE
    println(along)
    println(blong)
    
}
```

## kotlin函数
- 实例：打印菱形
```kotlin
fun main(args:Array<String>){
    print1star()
    print3star()
    print5star()
    print3star()
    print1star()
}

fun print1star(){
    println("  *")
}

fun print3star(){
    println(" ***")
}

fun print5star(){
    println("*****")
}
```

## kotlin布尔类型
```kotlin
fun main(args:Array<String>){
    var num1 = 2
    var num2 = 3
    println(num1<num2)
    
    var num3 = Math.sqrt(5.0) - Math.sqrt(4.0)      //根号运算
    var num4 = Math.sqrt(4.0) - Math.sqrt(3.0)
    println(num3<num4)
    
    var num5 = Math.pow(2.0,100.0)      //幂运算
    var num6 = Math.pow(3.0,75.0)
    println(num5<num6)
}
```
## kotlin命令行交互式编程
- 配置好环境变量后命令行输入kotlinc进入，:quit退出

## 函数加强
### kotlin函数规则
```kotlin
fun 函数名(参数名:参数类型):返回值类型{
    函数体
}

fun main(args:Array<String>):Unit{
    //函数体
}
```
### 实例：计算器
```kotlin
fun main(args:Array<String>){
    var a = 8
    var b = 2
    
    println("a+b"+add(a,b))
    println("a-b"+sub(a,b))
    println("a*b"+mutl(a,b))
    println("a/b"+devide(a,b))
}

fun add(a:Int, b:Int):Int{
    return a+b
}

fun sub(a:Int, b:Int):Int{
    return a-b
}

fun mutl(a:Int, b:Int):Int{
    return a*b
}

fun devide(a:Int, b:Int):Int{
    return a/b
}
```
## 字符串模板
- 实例：日记模板
```kotlin
fun diaryGenerater(placeName:String):String{
    var temple = """
    今天天气晴朗，万里无云，我们去${placeName}游玩，
    首先映入眼帘的是${placeName}${placeName.length}个镏金大字
    """
    
    return temple
}

fun main(args:Array<String>){
    println(diaryGenerater("中山公园")) 
    //输出结果：今天天气晴朗，万里无云，我们去中山公园游玩，
    首先映入眼帘的是中山公园4个镏金大字
}
```

## 条件控制if...else...
```kotlin
fun checkFace(score:Int){
    if(score>80){
        println("这是一个帅哥")
    }else{
        println("这是一个衰哥")
    }
}
```
- 也可以写到一行
```kotlin
if(score>80) println("这是一个帅哥") else println("这是一个衰哥")
```
- 返回两个数中较大的那个
```kotlin
fun returnMax(a:Int,b:Int):Int{
    if(a>b) return a else return b
}
```
## 字符串比较
```kotlin
fun main(args:Array<String>){
    var str1 = "Andy"
    var str2 = "andy"
    var str3 = "Andy"
    
    println(str1==str2)     //flase
    println(str1==str3)   //true,kotlin中“==”类似Java中的equals
    
    println(str1.equals(str2,true)) //true,equals第二个参数表示忽略大小写
}
```
## kotlin空值处理
```kotlin
fun heat(str:String?):String{    //不加?方法接收一个非空字符串，加?表示该参数可以为空
    return "热"+str
}

fun main(args:Array<String>){
    var result1 = "水"
    println(heat(result1))  //“热水”
    
    println(heat(null))  //无“？”，传null报错
    println(heat(null)) //有“？”，输出热null
}
```
## kotlin的when表达式
```kotlin
//需求：10分满分，9分干得不错，8分还可以，7分还需努力，6分刚及格，其他需要加油
fun gradeStudent(score:Int){
    when(score){
        10 -> println("满分")
        9 -> println("干得不错")
        8 -> println("还可以")
        7 -> println("还需努力")
        6 -> println("刚及格")
        else -> println("还需要加油")
    }
}

fun main(args:Array<String>){
    gradeStudent(7)     //还需努力
}
```
- 实例：完善日记模板
```kotlin
fun diaryGenerater(placeName:String):String{
    var temple = """
    今天天气晴朗，万里无云，我们去${placeName}游玩，
    首先映入眼帘的是${placeName}${numToChinese(placeName.length)}个镏金大字
    """
    
    return temple
}

fun numToChinese(num:Int):String{
    var result = when(num){
        1 -> "一"
        2 -> "二"
        3 -> "三"
        4 -> "四"
        5 -> "五"
        6 -> "六"
        else -> "好几个"
    }
    
    return result
}

fun main(args:Array<String>){
    println(diaryGenerater("中山公园")) 
    //输出结果：今天天气晴朗，万里无云，我们去中山公园游玩，
    首先映入眼帘的是中山公园四个镏金大字
}
```

## kotlin的loop和Range
```kotlin
fun main(args:Array<String>){
    var nums = 1 .. 100    //表示构造从1到100的数组[1,100]
    var nums2 = 1 until 100 //表示从1到99 [1,100)
    var result = 0
    for(num in nums){
        result = result+num
    }
    println("结果：${result}")  //结果：5050
    
    //步长
    var nums2 = 1 .. 16
    for(num in nums2 step 2){   //步长为2
        println(num)    //输出1,3,5,7....
    }
    
    //反转
    var num3 = nums2.reversed()
        for(num in nums3){   //反转打印
        println(num)    //输出16，15，14....
    }
    
    //数目
    println(num3.count())   //输出16表示有16个数
}
```

## kotlin的List和Map入门
- List
```kotlin
fun main(args:Array<String>){
    var lists = listOf("买鸡蛋","买大米","买肉")    //构建list
    for(list in lists){     //打印值
    println(list)       //输出：买鸡蛋 买大米 买肉
    }
    
    for((i,e) in lists.withIndex()){
        println("$i $e")  //输出：0 买鸡蛋    1 买大米    2 买肉
    }
}
```
- Map
```kotlin
import java.util.TreeMap

fun main(args:Array<String>){
	var map = TreeMap<String,String>()
    map["好"] = "good"
    map["学习"] = "Study"
    map["天"] = "day"
    map["向上"] = "up"
    
    println(map["好"]+" "+map["好"]+" "+map["学习"])
    println(map["天"]+" "+map["天"]+" "+map["向上"])
    
    //输出结果：
    //good good study
    //day day up
}
```

## 函数和函数式表达式
- 如果函数的函数体只有一句，那么可以省略大括号，如果有返回值，可以如下书写
```kotlin
fun main(args:Array<String>){
    println(add(5,3))   //输出8
}
fun add(x:Int,y:Int):Int = x+y
```
- 函数表达式
```kotlin
fun main(args:Array<String>){
    var i = {x:Int,y:Int -> x+y}    //此时i被声明为为一个函数表达式
    println(i(3,5)) //输出8
    
    var j:(Int,Int)->Int = {x,y -> x+y} //另一种编写方式
    println(j(3,5)) //输出8
}
```

## Kotlin默认参数和具名参数
```kotlin
import java.util.TreeMap

val Pi = 3.1415926f         //val类似java中的final

fun main(args:Array<String>){
	var area = 获取长方形面积(3,2)
    println(area)
    
    var area2 = 获取圆的周长(半径 = 2.0f)   //由于第一个参数是具名参数，所以需要指定：第二个参数名 = 值
    println(area2)
}

fun 获取长方形面积(长:Int,宽:Int):Int{
    return 长*宽
}

fun 获取圆的周长(PI:Float = Pi,半径:Float):Float{   //PI:Float = Pi 指定第一个参数为具名参数
    return 2*PI*半径
}

fun 获取圆的周长2(PI:Float = Pi,直径:Float):Float{
    return PI*直径
}

fun 获取圆柱体体积(PI:Float = Pi,半径:Float,高:Float):Float{
    return PI*半径*半径*高
}

fun 获取球体的表面积(PI:Float = Pi,半径:Float):Float{
    return PI*半径*半径*4
}

```
