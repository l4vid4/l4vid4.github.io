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