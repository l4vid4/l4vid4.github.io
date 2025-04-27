---
title: Kotlin基础语法（下）
date: 2020-06-23
tags: 
	- 学习笔记
	- Kotlin
---
# [Kotlin基础语法（上）](https://blog.csdn.net/weixin_44371842/article/details/106504114)
# Kotlin基础语法（下）

## Kotlin字符串和数字之间的转换
```kotlin
var a = "13"
var b = 13

a = b.toString()
b = a.toInt()
```

## Kotlin人机交互
```kotlin
fun main(args:Array<String>){
    println("请输入第一个数字:")
    var numlstr = readLine()
    println("请输入第二个数字：")
    var num2str = readLine()
    
    var num1 = num1str!!.toInt()
    var num2 = num2str!!.toInt()    //!!代表输入的数据绝对不为空
    
    println("$(num1)+$(num2)=$(num1+num2)")
}
```

## Kotlin异常处理
```kotlin
fun main(args:Array<String>){
    println("请输入第一个数字:")
    var numlstr = readLine()
    println("请输入第二个数字：")
    var num2str = readLine()
    
    try{
        var num1 = num1str!!.toInt()
        var num2 = num2str!!.toInt()    //!!代表输入的数据绝对不为空
    }catch(e:Exception){
        println("运行错误！")
    }

    println("$(num1)+$(num2)=$(num1+num2)")
}
```

## Kotlin递归
- 计算阶乘
```kotlin
 fun main(args:Array<String>){
     var num = 5
     //计算5的阶乘
     println("5的阶乘是&(fact(num))")
     //计算100的阶乘
     var num1 = BigInteger("100")
     println("100的阶乘是&{BigFact(num1)}")
 }
 
 fun fact(num:Int):Int{
     if(num == 1){
         return 1
     }
     else{
         return num*fact(num-1)
     }
 }
 
  fun BigFact(num:BigInteger):BigInteger{
     if(num == BigInteger.ONE){
         return BigInteger.ONE
     }
     else{
         return num*fact(num-BigInteger.ONE)
     }
 }
```

## Kotlin尾递归优化
- 尾递归要求返回值应该还是调用函数本身
- [Kotlin尾递归优化](https://www.dazhuanlan.com/2020/02/01/5e34cf0214147/)
```kotlin
fun main(args:Array<String>){
    var result = 0
    println(ollAdd(100000))
}

tailrec fun ollAdd(num:Int, result:Int):Int{
    if(num==0){
        return 1
    }else{
        return num+ollAdd(num-1,result+num)
    }
}
```

## Kotlin面向对象
- 表示一个矩形类和一个妹子类
```kotlin
class Rect(var height:Int,var width:Int)
class Girl(var charctor:String, var voice:String)

fun main(args:Array<String>){
    var rect1 = Rect(20,10)
    println("高度:${rect1.height}")
    println("宽度:${rect1.width}") 
    
    var girl1 = Girl("彪悍","甜美")
    println("girl1这位妹子的声音：${girl1.voice}")
}

/*
输出：
高度:20
宽度:10
girl1这位妹子的声音：甜美
*/
```
## 面向对象静态属性和动态行为
```kotlin
class Girl(var charctor:String, var voice:String){
    fun smaile(){
        println("妹子笑了一下，么么哒！")
    }
    fun cry(){
        println("呜呜呜，人家伤心了！")
    }
}

fun main(args:Array<String>){
    var girl1 = Girl("彪悍","甜美")
    println("girl1这位妹子的声音：${girl1.voice}")
    girl1.cry()
    girl1.smaile()
}
```

## 面向对象实战——洗衣服
```kotlin
/**
* 生产方创建的洗衣机
**/
class WashMachine(var module:String,var size:Int){
    var isDoorOpen = true
    var currentmode = 0
    
    fun openDoor(){
        println("洗衣机已经开门！！！")
        isDoorOpen = true
    }
    
    fun closeDoor(){
        println("洗衣机门已关闭")
        isDoorOpen = false
    }
    
    fun selectMode(){
        currentmode = readLine()
        when(mode){
            0 -> println("初始模式，请您选择模式")
            1 -> println("轻柔")
            2 -> println("狂柔")
            else -> println("Error")
        }
    }

    
    fun start(){
        if(isDoorOpen){
            println("门还没关，无法运行")
        }
        else{
            when(currentmode){
                0 -> {println("未选择模式，不能开始洗衣服")}
                1 -> {
                    println("放水")
                    println("开始轻柔模式洗衣服")
                    println("洗完了")
                }
                2 -> {
                    println("放水")
                    println("开始狂柔模式洗衣服")
                    println("洗完了")
                }
                else -> {println("未选择模式，不能开始洗衣服")}
            }
        }
    }
    
}
/**
* 用户使用洗衣机
**/
fun main(args:Array<String>){
    var washMachine = washMachine("小天鹅",size:12)
    
    washMachine.openDoor()
    println("请选择模式：1，轻柔。2，狂柔")
    washMachine.selectMode
    washMachine.closeDoor()
    washMachine.start()
}
```
## Kotlin面向对象——封装
- 封装就是隐藏内部实现的细节
```kotlin
/**
* 生产方创建的洗衣机
**/
class WashMachine(var module:String,var size:Int){
    var isDoorOpen = true
    var currentmode = 0
    
    fun openDoor(){
        println("洗衣机已经开门！！！")
        isDoorOpen = true
    }
    
    fun closeDoor(){
        println("洗衣机门已关闭")
        isDoorOpen = false
    }
    
    fun selectMode(){
        currentmode = readLine()
        when(mode){
            0 -> println("初始模式，请您选择模式")
            1 -> println("轻柔")
            2 -> println("狂柔")
            else -> println("Error")
        }
    }

    private fun setMotorSpeed(speed:Int){        //将方法私有化，只有内部函数可调用，外部并不能看到具体的实现细节，这就是封装
        println("发动机当前转速 ${speed}转/秒")
    }
    
    fun start(){
        if(isDoorOpen){
            println("门还没关，无法运行")
        }
        else{
            when(currentmode){
                0 -> {println("未选择模式，不能开始洗衣服")}
                1 -> {
                    println("放水")
                    println("开始轻柔模式洗衣服")
                    setMotorSpeed(100)
                    println("洗完了")
                }
                2 -> {
                    println("放水")
                    println("开始狂柔模式洗衣服")
                    setMotorSpeed(1000)
                    println("洗完了")
                }
                else -> {println("未选择模式，不能开始洗衣服")}
            }
        }
    }
    
}
/**
* 用户使用洗衣机
**/
fun main(args:Array<String>){
    var washMachine = washMachine("小天鹅",size:12)
    
    washMachine.openDoor()
    println("请选择模式：1，轻柔。2，狂柔")
    washMachine.selectMode
    washMachine.closeDoor()
    washMachine.start()
}
```

## kotlin面向对象——继承
- 继承是指一个对象直接使用另一对象的属性和方法
```kotlin
/*
父类
*/
open class Fathor{  //只有类open之后才能被继承
    var chactor:String = "性格内向"
    open fun action(){      //只有方法open之后，子类才能重写该方法
        println("公共场合大声喧哗")
    }
    
    fun money(){
        println("很有钱")
    }
}

/*
子类
*/
class Son:Fathor(){
    override fun action(){
        println("儿子很乖，在公共场合很有礼貌")
    }
}

fun main(args:Array<String>){
    var son1 = Son()
    println("儿子的性格${son1.chactor}")
    son1.action()
    son1.money()
}
/*
输出:
儿子的性格内向
儿子很乖，在公共场合很有礼貌
很有钱
*/
```

## kotlin面向对象——抽象类
```kotlin
abstract class Human(var name:String){ //抽象人类
    abstract fun eat()
}

class Man(name:String):Human(name){
    override fun eat(){
        println("${name}哇哇哇地大口吃")
    }
}

class Woman(name:String):Human(name){
    override fun eat(){
        println("${name}呜呜呜地小口吃")
    }
}

fun main(args:Array<String>){
    var person1 = Man("金三胖")
    person1.eat()
    
    var person2 = Woman("慈禧太后")
    person2.eat()
}
```

## kotlin面向对象——多态
- 多态就是同种功能，不同的表现形态
```kotlin
abstract class Human(var name:String){ //抽象人类
    abstract fun eat()  //吃
    abstract fun pee() //撒尿
}

class Man(name:String):Human(name){
    override fun eat(){
        println("${name}哇哇哇地大口吃")
    }
    
    override fun pee(){
        println("${name}站着撒尿")
    }
}

class Woman(name:String):Human(name){
    override fun eat(){
        println("${name}呜呜呜地小口吃")
    }
    
        override fun pee(){
        println("${name}蹲着撒尿")
    }
}

fun main(args:Array<String>){
    var person1 = Man("金三胖")
    var person2 = Woman("慈禧太后")
    var person3 = Man("李华")
    var person4 = Woman("蒙娜丽莎")

    var houseList = listOf<Human>(person1,person2,person3,person4)
    for(person in houseList){
        h.eat()
    }
    for(person in houseList){
        h.pee()
    }
}
```

## kotlin面向对象——接口
- 接口泛指实体把自己提供给外界的一种抽象化物（可以为另一实体），用以由内部操作分离出外部沟通方法，使其能被内部修改而不应向外界其他实体与其交互的方式。
- 接口和抽象类的区别
> 接口是事物的能力，而抽象类是事物的本质
```kotlin
interface IMan{
    fun xiaodidi()
}

abstract class Human{
    abstract fun eat()
}

class Man:Human(),IMan{
    override fun xiaodidi(){
        println("18厘米")
    }
    
    override fun eat(){
        println("大口吃饭")
    }
}

class TaiJian:Human(){
    override fun eat(){
        println("吃皇上赏的")
    }
}

fun main(args:Array<String>){
    var man1 = Man()
    man1.xiaodidi()
    man1.eat()
    
    var man2 = TaiJian()
    man2.eat()
    
    var house = listOf<Human>(man1,man2)
    for(person in house){
        if(person is Man){   //判断是否是Man
            person.eat()
        }
    }
}
```

## kotlin面向对象——委托和代理
- 委托是把事情托付给别人或别的机构办理
- 代理是指以他人的名义，在授权范围内进行对被代理人直接发生法律效力的法律行为。代理的产生，可以是受他人委托。
```kotlin
interface IWashBow1{    //洗碗的接口
    fun washing()
}

class BigHeadSon:IWashBowl{ //大头儿子
    override fun washing(){
        println("我是大头儿子，我在洗碗，一次赚1块")
    }
}

class SmallHeadFather:IwashBowl by BigHeadSon(){//小头爸爸,委托给大头儿子去洗碗
    override fun washing(){
       println("我是小头爸爸")
       BigHeadSon().washing()
       println("我看着儿子把碗洗完了")
    }
}

fun main(args:Array<String>){
    var son = BigHeadSon()
    son.washing()
    
    var father = SmallHeadFather()
    father.washing()
}
```

## kotlin面向对象——单例模式
```kotlin
object BigHeadSon:IWashBowl{  //当一个类被定义为object，那么他在内存中就直接被创建，且有且仅有一个
    override fun washing(){
        println("我是大头儿子，我在洗碗，一次赚1块")
    }
}

class SmallHeadFather:IwashBowl by BigHeadSon{//再委托的话，需要把括号去掉。
    override fun washing(){
       println("我是小头爸爸")
       BigHeadSon.washing()     //如果带着括号，相当于创建了两个大头儿子
       println("我看着儿子把碗洗完了")
    }
}

```

## kotlin面向对象——枚举
```kotlin
enum class Week{
    星期一，星期二，星期三，星期四，星期五，星期六，星期日
}

fun main(args:Array<String>){
    println(Week.星期一.ordinal)    //打印星期一所在位序
}
```

## kotlin面向对象——印章类（Sealed class）
- 子类类型有限的class
```kotlin
sealed class Son{  //小母驴，小公驴，小公马生下来的儿子
    fun sayHello(){
        println("Hello")
    }
    class 小小驴():Son()
    class 小骡子():Son()
}

fun main(args:array<String>){
    var s1:Son = Son.小骡子()   //无法直接实例化Son，只能实例化其中的类
    var s2:Son = Son.小小驴()
    var s3:Son = Son.小骡子()
    
    var list = listOf<Son>(s1,s2,s3)
    for(v in list){
        if(v is Son.小骡子){
            v.sayHello()
        }
    }
    
}
```
