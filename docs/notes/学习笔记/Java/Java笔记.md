---
title: Java笔记
createTime: 2025/04/24 18:35:24
permalink: /studyNotes/516g91lc/
---
# parallelStream

## 简介

- java8中的并行执行流

## 使用方法

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);
numbers.parallelStream().forEach(out::println);  
```

- 结合groupingByConcurrent实现线程安全的分组操作

```java
// 使用groupBy分组，使用parallelStream将分组过程并行化提升效率，使用groupingByConcurrent同步HashMap避免出现线程安全的问题
Map<String, List<CourseGrade>> collect = courseGrades.parallelStream().collect(Collectors.groupingByConcurrent(CourseGrade::getYear));
```

## 注意

- parallelStream适合于CPU密集型任务，而不适用于I/O密集型任务，尽量避免在parallelStream中进行慢响应的任务，例如数据库操作。

# Java中的大根堆与小根堆

在实际开发中，我们经常会遇到需要频繁取出最大值或最小值的场景，例如滑动窗口最大值、合并多个有序数组、求 Top K 元素等。Java 提供了一个非常实用的数据结构 `PriorityQueue`，它本质上是一个**堆（Heap）**，默认是**小根堆**，通过自定义比较器也可以实现**大根堆**。

本文将介绍如何在 Java 中使用 `PriorityQueue` 构建小根堆和大根堆，并结合典型应用场景加以说明。

## 📌 什么是堆？

堆是一种特殊的**完全二叉树**，满足以下性质：

- **小根堆（最小堆）**：每个节点的值 ≤ 子节点的值。堆顶是最小元素。
- **大根堆（最大堆）**：每个节点的值 ≥ 子节点的值。堆顶是最大元素。

------

## 🛠 Java 中的 PriorityQueue

### 1. 小根堆（默认）

Java 的 `PriorityQueue` 默认实现的是 **小根堆**。

```java
import java.util.PriorityQueue;

PriorityQueue<Integer> minHeap = new PriorityQueue<>();

minHeap.offer(5);
minHeap.offer(2);
minHeap.offer(8);

System.out.println(minHeap.peek()); // 输出 2
```

> ✅ `peek()` 返回堆顶（最小值），不会移除元素
> ✅ `poll()` 返回并移除堆顶

### 2. 大根堆（通过自定义 Comparator）

要构建大根堆，需要传入一个**自定义比较器**：

```java
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);

maxHeap.offer(5);
maxHeap.offer(2);
maxHeap.offer(8);

System.out.println(maxHeap.peek()); // 输出 8
```

或者使用 `Comparator.reverseOrder()` 简化写法：

```java
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
```

## 存放自定义对象

当我们希望按照某个字段排序时，可以将对象封装成一个类，并自定义排序逻辑：

```java
class Pair {
    int value;
    int index;

    public Pair(int value, int index) {
        this.value = value;
        this.index = index;
    }
}

// 按 value 降序排序（大根堆）
PriorityQueue<Pair> pq = new PriorityQueue<>((a, b) -> b.value - a.value);

pq.offer(new Pair(10, 1));
pq.offer(new Pair(5, 2));

System.out.println(pq.peek().value); // 输出 10
```

## 常用方法

| 方法         | 描述                   |
| ------------ | ---------------------- |
| `offer(E e)` | 添加元素               |
| `poll()`     | 移除并返回堆顶元素     |
| `peek()`     | 查看堆顶元素（不移除） |
| `size()`     | 获取元素个数           |
| `isEmpty()`  | 判断是否为空           |

## 注意事项

`PriorityQueue` **不允许存放 null 元素**

默认不是线程安全的，如需线程安全可使用 `PriorityBlockingQueue`

`PriorityQueue` 不是普通 FIFO 队列，出队顺序由优先级决定