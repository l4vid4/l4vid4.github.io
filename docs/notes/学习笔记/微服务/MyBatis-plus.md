# MyBatis-plus

> [官方文档](https://www.baomidou.com)

## 常见注解

- `@TableName`：指定表名
- `@TableId`：指定主键字段，`type=IdType.AUTO、INPUT、ASSIGN_ID`，auto自增，input自行输入，assign_id雪花算法生成
- `@TableField`：指定普通字段

## 常见配置

```properties
mybatis-plus:
	type-aliases-package: #别名扫描包
	mapper-locations: "classpath*:/mapper/**/*.xml" #Mapper.xml文件地址，默认值
	configuration:
		map-underscore-to-camel-case: true #是否开启下划线和驼峰的映射
		cache-enabled: false #是否开启二级缓存
```

## 条件构造器

> [条件构造器](https://www.baomidou.com/guides/wrapper/)

## 静态工具类

### `Db` 是什么？

`Db` 是 MyBatis-Plus 提供的静态工具类（要求MyBatis-plus版本大于等于3.4.0），常用于：

- 简化单表 CRUD 操作
- 快速进行查询、插入、更新、删除操作
- 配合 Wrapper 使用查询条件
- 不依赖注入，适合工具类或非 Spring Bean 场景
- 防止调用其他service出现循环依赖的情况

### 使用示例

```java
List<User> list = Db.list(lambdaQuery(User.class).eq(User::getAge, 18));
```

| 方法                          | 说明                     |
| ----------------------------- | ------------------------ |
| `Db.list(Class<T>)`           | 查询所有记录             |
| `Db.getById(Class<T>, id)`    | 根据 ID 查询             |
| `Db.save(entity)`             | 插入数据                 |
| `Db.updateById(entity)`       | 根据 ID 更新             |
| `Db.removeById(Class<T>, id)` | 根据 ID 删除             |
| `Db.lambdaQuery(Class<T>)`    | 获取 LambdaQueryWrapper  |
| `Db.lambdaUpdate(Class<T>)`   | 获取 LambdaUpdateWrapper |

## 枚举处理器

1. 在配置文件中配置统一的枚举处理器，实现类型转换

```properties
mybatis-plus:
	configuration:
		default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler
```

2. 自定义枚举类，并给枚举中的与数据库对应value值添加@EnumValue注解

```java
@Getter
public enum Gender{
    MALE(1, "男"),
    FEMALE(0, "女"),
    ;
    
    @EnumValue
    private final int value;
    @JsonValue  //标记返回给前端时显示的字段。
    private final String desc;
    
    Gender(int value, String desc){
        this.value = value;
        this.desc = desc;
    }
}
```

3. 将实体类对应的字段类型改为枚举类型。

```java
private Gender gender;
```

## JSON处理器

> 用于处理数据库中的Json类型的数据

1. 给相应字段类型从String改成实体类，并加上`@TableField(typeHandler = JacksonTypeHandler.class)`注解

```java
@TableField(typeHandler = JacksonTypeHandler.class)
private UserInfo info;
```

2. 给相应表上加上自动结果映射

```java
@Data
@TableName(value-"user", autoResultMap = true)
public class User{
    @TableField(typeHandler = JacksonTypeHandler.class)
    private UserInfo info; 
}
```

## 分页插件

### 配置分页插件

```java
@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 添加分页插件
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
```

### 使用方式

```java
Page<User> page = new Page<>(1, 10); // 当前页 1，每页 10 条

LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
wrapper.ge(User::getAge, 18);

Page<User> result = userMapper.selectPage(page, wrapper);
```

`result.getRecords()` → 当前页数据列表

`result.getTotal()` → 总记录数

`result.getPages()` → 总页数

`result.getCurrent()` → 当前页

`result.getSize()` → 每页条数

### 分页+排序

```java
Page<User> page = new Page<>(1, 10);
LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
wrapper.ge(User::getAge, 18)
       .orderByDesc(User::getCreateTime);

Page<User> result = userMapper.selectPage(page, wrapper);
```

### 封装

- 通用分页请求类

```java
@Data
public class PageQuery {
    private Integer pageNo;
    private Integer pageSize;
    private String sortBy;
    private Boolean isAsc;

    public <T>  Page<T> toMpPage(OrderItem ... orders){
        // 1.分页条件
        Page<T> p = Page.of(pageNo, pageSize);
        // 2.排序条件
        // 2.1.先看前端有没有传排序字段
        if (sortBy != null) {
            p.addOrder(new OrderItem(sortBy, isAsc));
            return p;
        }
        // 2.2.再看有没有手动指定排序字段
        if(orders != null){
            p.addOrder(orders);
        }
        return p;
    }

    public <T> Page<T> toMpPage(String defaultSortBy, boolean isAsc){
        return this.toMpPage(new OrderItem(defaultSortBy, isAsc));
    }

    public <T> Page<T> toMpPageDefaultSortByCreateTimeDesc() {
        return toMpPage("create_time", false);
    }

    public <T> Page<T> toMpPageDefaultSortByUpdateTimeDesc() {
        return toMpPage("update_time", false);
    }
}

```

- 通用分页响应类

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageDTO<V> {
    private Long total;
    private Long pages;
    private List<V> list;

    /**
     * 返回空分页结果
     * @param p MybatisPlus的分页结果
     * @param <V> 目标VO类型
     * @param <P> 原始PO类型
     * @return VO的分页对象
     */
    public static <V, P> PageDTO<V> empty(Page<P> p){
        return new PageDTO<>(p.getTotal(), p.getPages(), Collections.emptyList());
    }

    /**
     * 将MybatisPlus分页结果转为 VO分页结果
     * @param p MybatisPlus的分页结果
     * @param voClass 目标VO类型的字节码
     * @param <V> 目标VO类型
     * @param <P> 原始PO类型
     * @return VO的分页对象
     */
    public static <V, P> PageDTO<V> of(Page<P> p, Class<V> voClass) {
        // 1.非空校验
        List<P> records = p.getRecords();
        if (records == null || records.size() <= 0) {
            // 无数据，返回空结果
            return empty(p);
        }
        // 2.数据转换
        List<V> vos = BeanUtil.copyToList(records, voClass);
        // 3.封装返回
        return new PageDTO<>(p.getTotal(), p.getPages(), vos);
    }

    /**
     * 将MybatisPlus分页结果转为 VO分页结果，允许用户自定义PO到VO的转换方式
     * @param p MybatisPlus的分页结果
     * @param convertor PO到VO的转换函数
     * @param <V> 目标VO类型
     * @param <P> 原始PO类型
     * @return VO的分页对象
     */
    public static <V, P> PageDTO<V> of(Page<P> p, Function<P, V> convertor) {
        // 1.非空校验
        List<P> records = p.getRecords();
        if (records == null || records.size() <= 0) {
            // 无数据，返回空结果
            return empty(p);
        }
        // 2.数据转换
        List<V> vos = records.stream().map(convertor).collect(Collectors.toList());
        // 3.封装返回
        return new PageDTO<>(p.getTotal(), p.getPages(), vos);
    }
}

```

