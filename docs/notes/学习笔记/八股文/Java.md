---
title: Java
createTime: 2025/04/24 18:35:26
permalink: /studyNotes/rxuglq09/
---
## 命令行输入

```java
import java.util.Scanner;

public class ScannerExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入你的名字: ");
        String name = scanner.nextLine();  // 读取一行输入
        System.out.print("请输入你的年龄: ");
        int age = scanner.nextInt();  // 读取整数输入
        System.out.println("你好, " + name + "！你今年 " + age + " 岁。");
        scanner.close();  // 关闭 Scanner
    }
}

```

```java
import java.util.Scanner;

// 注意类名必须为 Main, 不要有任何 package xxx 信息
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        // 注意 hasNext 和 hasNextLine 的区别
        while (in.hasNextInt()) { // 注意 while 处理多个 case
            int a = in.nextInt();
            int b = in.nextInt();
            System.out.println(a + b);
        }
    }
}
```

## ConcurrentHashMap

### **1. JDK 1.8 `ConcurrentHashMap` 的数据结构**

`ConcurrentHashMap` 主要由 **数组 + 链表 + 红黑树** 组成：

- **数组（Node<K,V>[] table）**：核心存储结构，数组的每个元素是一个桶（bucket）。
- **链表（Node）**：发生哈希冲突时，桶内多个元素以链表存储（当链表长度超过 **8** 时转换为红黑树）。
- **红黑树（TreeNode）**：当链表长度超过 **8** 时，转换为红黑树，提高查询效率。

```java
static class Node<K,V> {
    final int hash;
    final K key;
    volatile V val;
    volatile Node<K,V> next;
}
```

## 访问权限修饰符

| **访问级别**       | **适用于** | **访问范围**               | **关键特性**                 |
| ------------------ | ---------- | -------------------------- | ---------------------------- |
| `public`           | 公开 API   | **所有地方可访问**         | **最开放**，用于公共方法     |
| `protected`        | 继承设计   | **同包 + 不同包的子类**    | **子类可访问**，但非子类不行 |
| 默认（不加修饰符） | 仅限同包   | **同包访问**，不同包不可见 | **包级别共享**               |
| `private`          | 内部封装   | **仅本类可访问**           | **最封闭**，外部无法访问     |

## ExecutorService

### 关闭

#### 1. `shutdown()` 方法

- **作用**：将线程池标记为不可接受新任务，但会继续执行已经提交的任务。
- 特点：
  - 线程池不能再接受新的任务（新提交的任务会被拒绝）。
  - 已提交的任务会继续执行，直到线程池中的所有任务完成。
  - 适合在所有任务执行完成后关闭线程池。

#### 2. `shutdownNow()` 方法

- **作用**：立即尝试停止正在执行的任务，并返回尚未开始执行的任务。
- 特点：
  - 尝试停止所有正在执行的任务（通过调用 `Thread.interrupt()`）。
  - 返回一个未开始执行的任务列表。
  - 适合希望尽快停止线程池中的任务，通常是遇到严重错误时。

## 线程安全的类

| 类名                    | 线程安全性 | 说明                                                      |
| ----------------------- | ---------- | --------------------------------------------------------- |
| `ArrayList`             | ❌ 不安全   | ArrayList 在多线程环境中不可保证线程安全                  |
| `Vector`                | ✅ 安全     | Vector 是同步的，但性能较差，适用于少数需要线程安全的场景 |
| `HashMap`               | ❌ 不安全   | HashMap 在多线程环境下不可保证线程安全                    |
| `Hashtable`             | ✅ 安全     | Hashtable 是同步的，但性能较差，现已不推荐使用            |
| `ConcurrentHashMap`     | ✅ 安全     | 线程安全，支持高并发，不会锁住整个表，提高了性能          |
| `CopyOnWriteArrayList`  | ✅ 安全     | 线程安全，适用于读多写少的场景                            |
| `LinkedList`            | ❌ 不安全   | LinkedList 在多线程环境中不可保证线程安全                 |
| `ConcurrentLinkedQueue` | ✅ 安全     | 线程安全的非阻塞队列，适用于高并发场景                    |
| `Stack`                 | ✅ 安全     | Stack 是同步的，但不推荐使用，推荐使用 `Deque`            |
| `PriorityQueue`         | ❌ 不安全   | PriorityQueue 在多线程环境下不可保证线程安全              |

## final

- final关键字可以修饰类、方法、属性
- final修饰的类不可以被继承，final修饰的方法不可以被重写，但可以被重载，final修饰的属性不可以修改值。

