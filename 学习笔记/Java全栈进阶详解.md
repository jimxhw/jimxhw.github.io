# Java 全栈进阶详解（高级开发深度）

> **定位**：本文档面向高级开发，聚焦**源码级原理、性能优化、生产实践、架构权衡**。
> **前置**：先学完《Java全栈知识点详解》（基础篇），再读本文档。
> **达成目标**：能讲清"为什么"，能处理线上疑难，能主导技术方案设计。

---

# 第 1 章 Java 核心与集合进阶

## 1.1 HashMap 源码级深挖

### 1.1.1 扰动函数为什么是 `hash ^ (hash >>> 16)`

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

**原理**：`key.hashCode()` 返回 32 位 int。而定位桶只用 `table.length - 1`（低 N 位，如容量 16 只用低 4 位）。**若直接用 hashCode，高 16 位完全没用**——两个 hashCode 高 16 位不同、低 16 位相同，会碰撞。

`h ^ (h >>> 16)` 把高 16 位**异或到**低 16 位，让高位信息参与桶定位，**降低碰撞概率**。代价极小（一次异或一次移位），收益是分布更均匀。

**数学视角**：当容量是 2 的幂时，`hash & (n-1)` 等价于 `hash % n` 且更快。而扰动让哈希分布更接近均匀随机。

### 1.1.2 为什么链表长度 ≥8 才转红黑树（泊松分布）

JDK 源码注释：**理想随机哈希下，桶内链表长度服从泊松分布**，`loadFactor=0.75` 时：

```
长度 0: 0.60653066
长度 1: 0.30326533
长度 2: 0.07581633
长度 3: 0.01263606
长度 4: 0.00157952
长度 5: 0.00015795
长度 6: 0.00001316
长度 7: 0.00000094
长度 8: 0.00000006
```

**结论**：长度到 8 的概率约 **六百万分之一**。所以：
- 阈值 8 是"极端异常"信号，此时红黑树化是合理的防御
- 正常情况链表几乎到不了 8，转树不是常态
- 8 还考虑了空间/时间权衡：树节点（TreeNode）约是普通节点的 2 倍内存

**为什么退树是 6 不是 7**：留 1 个缓冲，避免"插入一个删一个"在 7/8 之间反复转换（振荡）。

### 1.1.3 扩容为什么是 1.5 倍（`old + old >> 1`）

```java
final Node<K,V>[] resize() {
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int newCap = oldCap << 1;   // 实际上 JDK8 扩容是 2 倍！1.5 倍是 ArrayList
    ...
}
```

**修正一个常见误解**：HashMap 扩容是**2 倍**（`oldCap << 1`），不是 1.5 倍。1.5 倍是 **ArrayList** 的扩容规则。

**HashMap 2 倍扩容的好处**：容量保持 2 的幂 → 元素迁移时只需判断 `(e.hash & oldCap) == 0`：
- 为 0 → 留在原位置
- 为 1 → 移到 `原位置 + oldCap`

**不需要重新计算 hash，也不需要逐个 rehash**，只做一次位运算即可确定新位置，这就是 JDK8 扩容高效的秘密。

### 1.1.4 JDK7 头插法死循环的真相

JDK7 扩容：`transfer()` 用**头插法**（新表元素插到链表头部）。
并发扩容时两个线程同时 resize，链表反转 + 并发操作 → **形成环形链表** → get 时无限循环 → CPU 100%。

JDK8 改**尾插法**（保持原链表顺序）+ 不重新 hash（位运算定位）→ 不再死循环，但并发 put 仍可能**丢数据**（A 线程覆盖 B 线程的值）或 size 计数错乱。**结论：HashMap 任何版本都不能用于并发，并发必须 ConcurrentHashMap。**

### 1.1.5 ConcurrentHashMap 源码细节

**put 流程（JDK8）**：
```java
final V putVal(K key, V value, boolean onlyIfAbsent) {
    // 1. 空桶 → CAS 无锁插入
    if (tabAt(tab, i) == null)
        casTabAt(tab, i, null, new Node<K,V>(h, key, value));   // 无锁！
    // 2. 桶非空 → synchronized 锁头节点
    synchronized (f) { ... }
    // 3. 扩容时：ForwardingNode 参与协助扩容
}
```

**关键点**：
- **CAS 用于空桶插入**，synchronized 用于非空桶——锁粒度是单个桶，并发度 = 桶数
- `tabAt/casTabAt` 用 `Unsafe.getObjectVolatile` 保证可见性
- 扩容用 **多线程协助**（stamp 标记，其他线程 put 时发现扩容一起搬）——这是它高性能的关键之一
- `size()`：baseCount + `CounterCell[]` 分片计数（类似 LongAdder），避免单变量争抢

**为什么 JDK8 不直接用 synchronized 锁全表**：锁粒度从 JDK7 的 Segment（16 段）降到单桶，理论并发度提升 16 倍到桶数级。

## 1.2 字符串与常量池

```java
String s1 = "abc";              // 常量池（编译期字面量）
String s2 = new String("abc");  // 堆中对象 + 常量池引用
s1 == s2                        // false（地址不同）
s1.intern() == s2.intern()      // true（都指向常量池）

String s3 = "ab" + "c";         // 编译期常量折叠 → 常量池"abc"，== s1
String s4 = "ab" + new String("c");  // 运行期拼接 → new 对象，== s1 false
```

**易错点**：
- `new String("abc")` 会创建 **2 个对象**（堆对象 + 常量池字面量，若常量池已有则 1 个）
- 大量字符串拼接用 `StringBuilder`（循环内拼接不要用 `+`，每次都会建新对象）
- JDK9+：String 底层从 `char[]` 改为 **`byte[]` + coder 标志**（Latin-1 一个字节/字符，省一半内存）

## 1.3 动态代理：JDK Proxy vs CGLIB 源码级差异

**JDK Proxy**：
```java
public class JdkProxy implements InvocationHandler {
    private final Object target;
    public Object getProxy() {
        return Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            target.getClass().getInterfaces(),   // 必须接口！
            this);
    }
    @Override public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("before");
        Object r = method.invoke(target, args);
        System.out.println("after");
        return r;
    }
}
```

**CGLIB**（Spring Boot 2.x+ 默认）：
```java
Enhancer enhancer = new Enhancer();
enhancer.setSuperclass(UserService.class);   // 继承目标类！
enhancer.setCallback((MethodInterceptor) (obj, method, args, proxy) -> {
    System.out.println("before");
    return proxy.invokeSuper(obj, args);
});
```

**源码差异**：
| 维度 | JDK Proxy | CGLIB |
|---|---|---|
| 原理 | 生成实现**接口**的代理类 | 生成目标类的**子类** |
| 前提 | 必须有接口 | 无接口；**final 类/方法不可代理** |
| 生成时机 | 每次 getProxy 生成 class | 首次生成后缓存 |
| 方法调用 | InvocationHandler.invoke | MethodInterceptor，fastclass 机制加速 |
| SpringBoot 选择 | 2.x 起默认 **CGLIB**（即使有接口） | —— |

**Spring AOP 为什么能生效**：BeanPostProcessor 的 `afterInitialization` 阶段，`AbstractAutoProxyCreator` 检测到 @Transactional/@Aspect 注解 → 生成代理对象替换原 Bean → 后续注入的都是代理。**自调用（this.xx()）没走代理，AOP 失效**的原因就在这。

## 1.4 Stream 与 Optional 高级用法

```java
// 分组 + 聚合（替代大量 for 循环）
Map<String, Long> countByStatus = users.stream()
    .collect(Collectors.groupingBy(User::getStatus, Collectors.counting()));

// 多字段排序
users.stream()
    .sorted(Comparator.comparing(User::getAge).reversed()
            .thenComparing(User::getName));

// 并行流注意：不要在有状态/线程不安全容器上用 parallelStream
List<Integer> safe = list.parallelStream()
    .map(x -> x * 2)
    .collect(Collectors.toList());   // collect 是线程安全的

// Optional 链式（防 NPE）
String name = Optional.ofNullable(user)
    .map(User::getAddress)
    .map(Address::getCity)
    .orElse("未知");
```

**易错点**：`Optional.get()` 前必须先 `isPresent()`；不要用 Optional 包集合（集合本身可空判断）；性能敏感路径慎用 Stream（装箱开销）。

---

# 第 2 章 并发编程进阶（源码级）

## 2.1 AQS 源码解析（并发框架的基石）

**AQS（AbstractQueuedSynchronizer）**：所有 JUC 锁/同步器的公共底座。

```java
// 核心字段
private volatile int state;              // 资源状态（锁重入次数/许可数/计数）
private transient volatile Node head;    // CLH 队列头
private transient volatile Node tail;    // CLH 队列尾
// Node：每个线程一个节点，prev/next 双向链表 + waitStatus 状态
```

### acquire（拿锁）流程
```
tryAcquire(arg) 成功？ → 拿到锁，结束
   ↓ 失败
addWaiter()：当前线程封装 Node 入队尾（CAS 设置 tail）
acquireQueued()：自旋
  ├─ 前驱是 head 且 tryAcquire 成功 → 设自己为 head，返回
  └─ 否则 → shouldParkAfterFailedAcquire（前置节点置 SIGNAL）→ LockSupport.park() 阻塞
```

### release（释放）流程
```
tryRelease(arg) 成功？ → 唤醒队头后继：LockSupport.unpark()
```

**关键点**：
- 入队用 **CAS**，排队用 **park/unpark**（线程阻塞不占 CPU）
- **公平锁 vs 非公平锁**的差异就在 tryAcquire：

```java
// ReentrantLock 非公平锁
final boolean nonfairTryAcquire(int acquires) {
    // 直接 CAS state——来了就抢，不管队列里有没有人等
    if (compareAndSetState(0, acquires)) return true;
    ...
}
// 公平锁
protected final boolean tryAcquire(int acquires) {
    // 先检查队列：hasQueuedPredecessors() 有排队者 → 让位
    if (!hasQueuedPredecessors() && compareAndSetState(0, acquires)) ...
}
```

**非公平锁为什么性能更好**：新线程直接抢锁，省去入队/唤醒的开销，吞吐高（线程"插队"成功率高）；但可能**饥饿**（长时间等不到）。公平锁保证顺序，吞吐略低。

## 2.2 synchronized 锁升级全流程

```
无锁
 → 偏向锁（首线程进入：CAS 把 Mark Word 记录线程 ID，后续无竞争零开销）
 → 轻量级锁（有第二个线程竞争：撤销偏向，CAS 自旋抢锁，自旋有限次数）
 → 重量级锁（自旋失败/竞争激烈：锁膨胀，线程进入操作系统互斥量阻塞）
```

**Mark Word（对象头 64 位）**里存锁状态：偏向线程 ID / 轻量级锁指针 / 重量级锁监视器指针。

**关键认知（高级）**：
- 偏向锁在 JDK15 被废弃（维护成本高、收益低，JEP 374），JDK16+ 默认关闭
- **锁升级是单向的**：只能升不能降
- 重量级锁依赖 OS 互斥量 → 阻塞/唤醒涉及**用户态 ↔ 内核态切换**，这才是锁开销的本质
- 现代 JDK 中 synchronized 与 ReentrantLock 性能已无实质差距，选型看功能需求

## 2.3 CompletableFuture 异步编排（高级开发日常）

```java
CompletableFuture<BigDecimal> priceFuture =
    CompletableFuture.supplyAsync(() -> queryPrice("苹果"), pool)  // 1 查价
        .thenApplyAsync(p -> p.multiply(BigDecimal.valueOf(0.9)), pool)  // 2 打折
        .exceptionally(e -> BigDecimal.ZERO);   // 3 异常兜底

// 多任务并行 + 汇聚（并行查询多个接口再聚合——日常高频场景）
CompletableFuture<User> userFuture = asyncGetUser(id);
CompletableFuture<Order> orderFuture = asyncGetOrder(id);
UserAndOrder result = CompletableFuture
    .allOf(userFuture, orderFuture)             // 全部完成
    .thenApply(v -> new UserAndOrder(
        userFuture.join(), orderFuture.join()))
    .join();

// 任意一个完成即返回（超时控制）
CompletableFuture.anyOf(f1, f2)
    .orTimeout(3, TimeUnit.SECONDS)             // 超时抛异常
    .exceptionally(e -> defaultVal);
```

**易错点**：
- 必须传**自定义线程池**（默认 ForkJoinPool.commonPool 会被业务阻塞拖垮）
- `join()` 会阻塞当前线程；`thenApply` 默认在公共池执行
- **线程池用完 shutdown**，避免资源泄漏
- 编排链路里异常要 `exceptionally/handle` 兜底，否则静默失败

## 2.4 虚拟线程（Java 21，高级必备认知）

**问题**：平台线程（OS 线程）创建成本高（1MB 栈）、数量受限（数千到数万），阻塞 IO 时线程浪费。

**虚拟线程（Virtual Threads）**：
- 轻量用户态线程（几 KB），**百万级可创建**
- 阻塞时自动挂起（yield），不占 OS 线程 → 线程模型"一个请求一个虚拟线程"重回简单
- 实现：JDK 的调度器（ForkJoinPool）把虚拟线程映射到少量载体线程

```java
// Spring Boot 3.2+ 启用虚拟线程
spring.threads.virtual.enabled=true

// 或手动
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> doIoWork());
}
```

**适用/不适用**：
- ✅ IO 密集（HTTP 调用、数据库、文件）→ 吞吐大幅提升
- ❌ CPU 密集 → 无收益；❌ `synchronized` 在虚拟线程上有**锁钉扎（pinning）**问题（JDK 正优化）；❌ 平台线程依赖的 ThreadLocal 大对象要谨慎（虚拟线程数量大，ThreadLocal 内存放大）

## 2.5 并发设计模式实战

**生产者-消费者（有界队列）**：
```java
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(1000);
// 生产者
queue.offer(task, 5, TimeUnit.SECONDS);   // 满则等待，带超时
// 消费者（线程池多线程消费）
while (running) {
    Task t = queue.poll(1, TimeUnit.SECONDS);
    if (t != null) process(t);
}
```

**线程池最佳实践（生产）**：
```java
ThreadPoolExecutor pool = new ThreadPoolExecutor(
    8, 16, 60, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(2000),
    new NamedThreadFactory("biz-"),            // 命名线程工厂（排查问题必备）
    new ThreadPoolExecutor.CallerRunsPolicy()); // 兜底：提交线程执行，反压保护
// 监控：活跃线程数、队列长度、拒绝次数 → 指标上报
```

**幂等与防重复**：分布式锁 + 唯一业务号 + 状态机（见 MySQL/Redis 章节）。

---

# 第 3 章 JVM 进阶

## 3.1 逃逸分析与栈上分配

**问题**：每次 new 对象都走堆分配 + GC，高频小对象开销大。

**逃逸分析（JDK 默认开启，-XX:+DoEscapeAnalysis）**：分析对象是否"逃逸"出方法/线程：
- **栈上分配**：对象不逃逸 → 直接在栈帧分配，方法结束即销毁，零 GC
- **标量替换**：对象字段拆成局部变量（不再有对象头）
- **锁消除**：对象不逃逸 → 去掉 synchronized

```java
// 不逃逸：循环内创建 1000 万次也可能栈上分配
long sum = 0;
for (int i = 0; i < 10_000_000; i++) {
    Point p = new Point(i, i);   // 不逃逸
    sum += p.x;
}
```

**结论**：Java 不是"所有对象都在堆"；服务端大对象照常堆分配，但高频小对象依赖逃逸分析。

## 3.2 G1 收集器详解

**Region 布局**：堆分为约 2048 个 Region（1MB~32MB），Region 动态扮演 Eden/Survivor/Old/Humongous（大对象区，>Region 一半大小）。

**回收流程（Young GC）**：
1. 新生代 Region 复制到 Survivor/Old（复制算法，无碎片）
2. 记录 **RSet（Remembered Set）**：每个 Region 记录"谁引用了我"→ 回收时不用全堆扫描

**并发标记（Mixed GC）**：
- 初始标记（STW）→ 并发标记（GC 线程与应用并发）→ **SATB（Snapshot-At-The-Beginning）**：并发期间记录增量引用变化 → 重新标记（STW）→ 清理
- **可预测停顿**：根据历史回收数据建模（-XX:MaxGCPauseMillis=200），优先回收垃圾多的 Region

**G1 vs CMS 关键差异**：G1 复制算法**无碎片**；可设置停顿目标；Region 粒度支持动态分代。CMS 碎片化 → Full GC 时串行整理 → 长停顿。**JDK9+ 直接用 G1 即可，生产别再用 CMS。**

**调优常用参数**：
```bash
-Xms4g -Xmx4g                    # 等值避免扩容抖动
-XX:MaxGCPauseMillis=200         # 停顿目标
-XX:G1NewSizePercent=5 -XX:G1MaxNewSizePercent=60
-XX:ConcGCThreads=4              # 并发标记线程
-XX:+PrintGCDetails              # 或 -Xlog:gc*
```

## 3.3 线上 JVM 问题排查实战

**案例 1：CPU 100% 定位**
```bash
top -Hp <pid>          # 找到 CPU 最高的线程 TID（十进制）
printf "%x\n" <tid>    # 转十六进制 nid
jstack <pid> | grep -A 30 "nid=0x<十六进制>"
# 看栈：死循环？锁竞争（BLOCKED/WAITING）？GC 线程？
```

**案例 2：内存缓慢增长（泄漏）**
```bash
jmap -dump:format=b,file=heap.hprof <pid>   # dump 两次，间隔一段时间
# MAT 对比两次 dump：Dominator Tree 找持续增长的对象 → 定位持有者
# 常见泄漏：静态集合只增不减、ThreadLocal 未 remove、连接未释放、监听器未注销
```

**案例 3：频繁 Full GC**
```bash
jstat -gcutil <pid> 1000
# O 区持续 90%+ 且 Full GC 频繁 → 大对象过多 / 内存泄漏 / 堆太小
# 先 -Xmx 加大 + dump 分析，别盲目调参
```

---

# 第 4 章 Spring 进阶

## 4.1 @Transactional 源码路径（为什么会失效）

```
调用 @Transactional 方法（实际是代理对象）
 → TransactionInterceptor.invoke()
 → PlatformTransactionManager.getTransaction()
   ├─ DataSourceTransactionManager：获取连接 → 设置 autoCommit=false
   ├─ 传播行为判断：REQUIRED 有事务则 join，否则 new
   └─ 事务信息绑定 ThreadLocal（TransactionSynchronizationManager）
 → 执行目标方法（反射）
 → 成功：commit()（提交 + 释放连接回连接池）
 → 异常：rollback()（回滚 + 还原连接）
```

**结合源码理解失效**：
- **自调用失效**：`this.method()` 没经过代理 → 根本没有 TransactionInterceptor 介入 → 无事务
- **异常被吞失效**：try-catch 后方法正常返回 → commit() 被调用 → 数据提交
- **受检异常不回滚**：`rollbackOn()` 默认只认 RuntimeException/Error；受检异常需要 `rollbackFor = Exception.class`
- **多线程失效**：新线程里获取的是**新连接**（ThreadLocal 不跨线程），不在外层事务上下文

**易错点（高级）**：大事务问题——一个 @Transactional 方法里循环调远程接口/大查询，事务持有数据库连接数秒 → 连接池耗尽。**事务方法只做 DB 操作，远程调用/复杂逻辑拆出去。**

## 4.2 Spring 事件机制与 @Async

```java
// 事件：解耦业务（订单创建 → 通知/积分/日志）
@Component
public class OrderService {
    @Autowired ApplicationEventPublisher publisher;
    public void createOrder(Order order) {
        saveOrder(order);
        publisher.publishEvent(new OrderCreatedEvent(order));   // 发布事件
    }
}
@EventListener  // 或 @TransactionalEventListener(phase = AFTER_COMMIT)（事务提交后再处理，更稳）
public void onOrderCreated(OrderCreatedEvent e) {
    sendNotify(e.getOrder());   // 默认同步，可加 @Async
}
```

**注意**：
- 默认**同步**执行（发布者阻塞）；要异步加 @Async + @EnableAsync
- `@Async` 同样**自调用失效**（代理问题）；且要自定义线程池（默认 SimpleAsyncTaskExecutor 每任务新建线程，生产禁用）

```java
@Bean("asyncPool")
public ThreadPoolTaskExecutor asyncPool() {
    ThreadPoolTaskExecutor ex = new ThreadPoolTaskExecutor();
    ex.setCorePoolSize(8); ex.setMaxPoolSize(16);
    ex.setQueueCapacity(1000);
    ex.setThreadNamePrefix("async-");
    ex.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
    return ex;
}
```

## 4.3 缓存抽象 @Cacheable

```java
@Cacheable(cacheNames = "user", key = "#id", unless = "#result == null")
public User getUser(Long id) { return userMapper.selectById(id); }

@CacheEvict(cacheNames = "user", key = "#id")   // 更新后删缓存
public void updateUser(User u) { ... }

@CachePut(cacheNames = "user", key = "#u.id")   // 更新缓存（写操作）
public User save(User u) { ... }
```

**生产注意**：
- 用 Redis 实现（spring-boot-starter-data-redis）+ 序列化配置（JSON，别用 JDK 序列化）
- `unless` 防缓存 null；空值缓存要看业务
- 与缓存一致性章节（Redis 基础篇）配合理解

## 4.4 多数据源与动态数据源

**读写分离场景**：主库写、从库读。
```java
@Target({ElementType.METHOD})
public @interface DS { String value() default "master"; }

// 用 AOP + ThreadLocal 实现动态切换（核心 20 行）
public class DynamicDataSourceContextHolder {
    private static final ThreadLocal<String> HOLDER = new ThreadLocal<>();
    public static void set(String ds) { HOLDER.set(ds); }
    public static String get() { return HOLDER.get(); }
    public static void clear() { HOLDER.remove(); }
}
// AbstractRoutingDataSource 根据 ThreadLocal 返回目标数据源
```
**生产直接用 ShardingSphere 或 mybatis-plus 动态数据源插件，别自己造轮子**（但要懂 ThreadLocal + 代理原理）。

**事务 + 多数据源**：Spring 默认一个事务一个数据源 → 跨库事务必须分布式事务（Seata）或最终一致性。

## 4.5 Spring Boot 3 与 JDK17 关键变化（高级必知）

| 变化 | 说明 |
|---|---|
| Jakarta EE 9+ | `javax.*` → `jakarta.*`（老代码要改 import） |
| 原生镜像 | GraalVM Native Image，启动毫秒级、内存减半（Spring Native） |
| 虚拟线程 | spring.threads.virtual.enabled（3.2+） |
| HTTP 客户端 | RestClient（声明式）、HttpInterface |
| 依赖基线 | Spring 6，JDK17 起步 |
| Micrometer 可观测 | 原生支持 Prometheus/OTel |

---

# 第 5 章 MySQL 进阶

## 5.1 三大日志：redo / undo / binlog（高级必考）

| 日志 | 用途 | 刷盘时机 |
|---|---|---|
| **redo log**（InnoDB，物理） | **崩溃恢复**（WAL：先写日志再写数据页）；两阶段提交 | 每秒/每次提交（innodb_flush_log_at_trx_commit） |
| **undo log**（InnoDB，逻辑） | **MVCC 版本链 + 事务回滚** | 随事务 |
| **binlog**（Server 层，逻辑） | **主从复制 + 数据恢复** | sync_binlog 策略 |

**WAL（Write-Ahead Logging）为什么快**：写 redo log 是**顺序 IO**（追加），改数据页是**随机 IO**。先落顺序日志，数据页异步刷盘 → 提交时只保证 redo log 落盘即可。

**两阶段提交（redo + binlog 一致性）**：
```
prepare 阶段：写 redo log（prepare）
commit 阶段：写 binlog → redo log 标记 commit
```
为什么两阶段：redo 和 binlog 是两套独立日志，直接各写各的，崩溃时可能一个提交一个没提交 → 数据不一致（主从）。两阶段保证**要么都成功要么都回滚**。

**主从复制原理**：
```
主库写 binlog → IO 线程拉取 → 从库 relay log → SQL 线程回放
```

## 5.2 索引下推（ICP）与 Change Buffer

**索引下推（Index Condition Pushdown，MySQL 5.6+）**：
```sql
-- 联合索引 (name, age)
SELECT * FROM user WHERE name = '张%' AND age = 20;
```
没有 ICP：先按 `name LIKE '张%'` 从索引取一批主键 → 回表 → 再过滤 age
有 ICP：在**索引遍历时**就判断 age = 20（存储引擎层过滤）→ 减少回表次数。EXPLAIN 的 Extra 显示 `Using index condition`。

**Change Buffer（5.5+，原插入缓冲）**：非唯一二级索引的写操作不立即更新索引页（随机 IO），先缓存在内存 → 后台合并刷盘（顺序 IO）。唯一索引不能用（要先查重）。`innodb_change_buffer_max_size` 默认 25%。

## 5.3 执行计划深读

```sql
EXPLAIN SELECT ... FROM a JOIN b ON a.id=b.a_id WHERE a.status=1 ORDER BY a.create_time;
```

| 列 | 高级解读 |
|---|---|
| select_type | SIMPLE / PRIMARY / SUBQUERY / DERIVED（派生表） |
| **type** | system > const > eq_ref > ref > range > index > ALL（必须优于 range） |
| possible_keys / key | 可能 vs 实际使用；key NULL 说明没走索引 |
| **key_len** | 使用的索引字节数（判断是否用了联合索引的全部列） |
| ref | 与索引比较的列/常量 |
| rows | 估算扫描行（× 表大小看效率） |
| **Extra** | `Using index`（覆盖，最好）、`Using index condition`（ICP）、`Using where`、**`Using filesort`（未用索引排序，要优化）**、**`Using temporary`（临时表，禁止）**、`Using join buffer`（连接缓冲，大表 join 警示） |

**filesort 优化**：`ORDER BY` 尽量让排序走索引（联合索引末尾字段）或用覆盖索引；否则建 filesort 临时文件排序。

## 5.4 分库分表实战

**什么时候分**：单表数据 >2000 万 / 单库连接与 IO 成为瓶颈 / 写入 TPS 到顶。

**拆分维度**：
- **垂直分库**：按业务域拆（用户库、订单库、商品库）——先做这个，简单收益大
- **水平分库分表**：按 sharding key（订单 id 取模 / 用户 id 范围）路由

**ShardingSphere 核心**：
```yaml
# shardingsphere 配置（5.x）
rules:
  sharding:
    tables:
      t_order:
        actualDataNodes: ds0.t_order_${0..15}    # 16 张表
        tableStrategy:
          standard:
            shardingColumn: order_id
            shardingAlgorithmName: order_inline
        keyGenerateStrategy:                        # 分布式 ID
          column: id
          keyGeneratorName: snowflake
```

**分库分表后的硬问题（高级必须想清楚）**：
- **分布式 ID**：雪花算法（时间戳+机器位+序列号）vs 号段模式（美团 Leaf）；数据库自增不行
- **跨片查询**：全路由扫描所有片 → 设计查询要带 sharding key
- **全局唯一约束/分布式事务**：唯一索引难做、事务用 Seata
- **数据迁移**：双写 + 回放（平滑迁移）
- **扩容**：取模路由扩容要重哈希 → 用一致性哈希/范围分片缓解

**结论（高级认知）**：分库分表是**最后手段**，先用：索引优化 → 读写分离 → 冷热分离/归档 → 缓存，最后才分片。

---

# 第 6 章 Redis 进阶

## 6.1 底层数据结构（源码级）

| Redis 类型 | 底层编码（7.x） | 触发条件 |
|---|---|---|
| String | **SDS**（简单动态字符串） | 一直 |
| Hash | listpack → hashtable | 元素少用 listpack（紧凑），>512 或值>64B 转 hashtable |
| List | **quicklist**（双向链表 + 每节点 listpack） | 一直 |
| Set | intset → hashtable | 全整数且 <512 用 intset |
| ZSet | listpack → **skiplist + dict** | >128 或成员>64B 转跳表 |

**SDS 为什么优于 C 字符串**：O(1) 长度、二进制安全（可含 \0）、**预分配 + 惰性释放**（减少内存重分配次数）。

**skiplist 为什么用于 ZSet 而不用红黑树**：
1. **实现简单**：层级随机，插入/删除不需要旋转平衡
2. **范围查询高效**：`ZRANGEBYSCORE` 只需从最高层找到起点然后顺序遍历；红黑树范围查询需中序遍历 + 回溯，复杂
3. 增删改查都是 O(logN)，与红黑树同级

**listpack vs ziplist**：ziplist 有**连锁更新**问题（前一项长度变化触发后续 entries 移动，最坏 O(n²)）；listpack 用固定 5 字节头 + 尾部长度标记规避，7.x 全面替代 ziplist。

## 6.2 IO 多路复用与单线程模型

**为什么 Redis 单线程还快**：
1. 纯内存操作（ns 级）
2. **IO 多路复用**（epoll）：一个线程同时监听成千上万个连接，事件就绪才处理
3. 单线程**免锁**：没有线程切换/竞争开销
4. 数据结构高效（SDS、跳表等）

**epoll 原理**：`epoll_ctl` 注册事件（红黑树）→ `epoll_wait` 阻塞等待就绪（就绪链表）→ 内核拷贝就绪事件。相比 select/poll（每次全量扫描 fd），epoll **只返回有事件的就绪 fd**，O(1) 复杂度。

**高级认知**：
- Redis 6+ 引入多线程：**网络读写**用多线程（IO 线程），**命令执行仍单线程**（保证原子性）
- 单个命令 O(n) 操作（KEYS、SMEMBERS 大 key）会**阻塞所有命令** → 生产用 SCAN 代替 KEYS，大 key 拆分
- 单线程也意味着：**慢命令拖垮整个实例**，监控命令耗时是必修课

## 6.3 缓存更新策略全对比（设计题高频）

| 策略 | 读 | 写 | 一致性 | 适用 |
|---|---|---|---|---|
| Cache Aside（最常用） | miss 读 DB 回填 | 更新 DB 删缓存 | 弱一致（靠延迟双删/canal） | 通用 |
| Read Through | 缓存组件负责读 DB 回填 | 同左 | 同上 | 封装中间件 |
| Write Through | 缓存负责 | **同步写 DB + 缓存** | 强一致 | 一致性要求高、写不频繁 |
| Write Behind | 缓存负责 | 先写缓存，异步批量刷 DB | 弱（可能丢） | 写频繁可容忍丢失 |

**生产结论**：互联网通用 **Cache Aside + canal binlog 异步删缓存**；强一致场景（库存扣减）不用缓存或 Write Through + 事务。

## 6.4 生产事故与治理

**大 key 问题**：value 过大（>10KB 或集合元素上万）→ 阻塞命令、内存倾斜、慢查询。
**治理**：`--bigkeys` 扫描、拆分（hash 分片/按时间分桶）、压缩、限制。

**热 key 问题**：单个 key 访问量爆炸 → 单分片 CPU 打满。
**治理**：**多副本读写分离**（热 key 复制 N 份加后缀分散读）、本地缓存（Caffeine）挡掉大部分、限流。

**缓存雪崩复盘**：过期时间随机化 + 多级缓存 + 熔断降级（见基础篇）。

---

# 第 7 章 微服务与架构进阶

## 7.1 分布式 ID 方案对比

| 方案 | 原理 | 优劣 |
|---|---|---|
| UUID | 全局唯一 | 无序、太长（36 字符）、索引性能差 |
| 数据库自增 | 步长独立 | 简单，扩展差 |
| **雪花算法** | 时间戳41位+机器10位+序列12位 | 趋势递增、无依赖，时钟回拨问题 |
| **号段模式**（美团 Leaf） | 一次取一批号段 | 高并发、可扩展，实现略复杂 |

**雪花算法时钟回拨**：机器时间回拨会生成重复 ID → 方案：记录 lastTimestamp，回拨时等待/拒绝/备用机器位。

## 7.2 服务治理体系（熔断/降级/限流）

**三者的区别（必考）**：
- **限流**：保护自己（QPS 超阈值拒绝新请求）——令牌桶（允许突发）、漏桶（恒定速率）
- **熔断**：保护自己不被故障下游拖死（错误率超阈值 → 快速失败，不浪费时间等待）——三态：关闭→打开→半开
- **降级**：主动牺牲（非核心功能返回兜底，保核心链路）

**Sentinel 核心设计**：滑动窗口统计（每秒一个格子，实时计算 QPS/异常比）+ 规则可动态推送（Nacos 联动）→ 生产用 **Sentinel 控制台 + Nacos 持久化规则**。

## 7.3 高可用架构设计（系统设计题万能模板）

```
入口：负载均衡（Nginx/网关）→ 多副本
应用层：无状态 + 水平扩容 + 熔断限流降级
缓存层：Redis 集群 + 多级缓存 + 过期随机化
数据层：主从 + 读写分离 + 分库分表 + 定时备份 + 异地多活（终极）
可靠性：重试（指数退避+抖动）、幂等、消息最终一致、对账任务
可观测：日志（ELK）+ 指标（Prometheus/Grafana）+ 链路（SkyWalking）+ 告警
```

## 7.4 幂等设计（接口层面）

**四种实现**：
1. 数据库唯一索引（insert 冲突即重复）
2. 状态机 + 版本号（update where status=xxx）
3. Redis setnx 分布式锁（处理中标记）
4. Token 机制（前端提交预生成 token，服务端消费一次）

**高级认知**：幂等键要**全局唯一且由客户端生成**（如 `orderId + 操作类型`）；幂等判断与业务操作要在**同一事务**内，否则并发下重复执行。

---

# 第 8 章 生产级工程实践

## 8.1 日志规范

```java
// 结构化日志（JSON 输出，便于 ELK 检索）
{"timestamp":"2026-08-25T23:00:00.000Z","level":"ERROR","service":"order","traceId":"abc123","message":"下单失败","error":"库存不足","userId":1001}

// 关键实践
// 1. 全链路 traceId：请求入口生成，MDC 传递，日志携带 → 一条链路可追踪
MDC.put("traceId", UUID.randomUUID().toString());
// 2. 异常必须打堆栈：logger.error("下单失败 orderId={}", orderId, e);
// 3. 禁止日志打敏感信息（手机号/密码脱敏）
// 4. 日志分级：debug 开发、info 业务、warn 可恢复、error 需处理
```

## 8.2 接口设计规范（高级日常）

```java
// 统一响应
public record R<T>(int code, String message, T data) {
    public static <T> R<T> ok(T data) { return new R<>(0, "ok", data); }
    public static <T> R<T> fail(int code, String msg) { return new R<>(code, msg, null); }
}

// 分页入参
public record PageQuery(int page, int size) {
    public int offset() { return (page - 1) * size; }
}

// 全局异常 → 统一错误码
public enum ErrorCode {
    PARAM_ERROR(400), UNAUTHORIZED(401), NOT_FOUND(404),
    BIZ_ERROR(5000), TOO_MANY_REQUESTS(429);
}
```

**规范要点**：状态码语义化、错误信息可读、接口幂等、超时与重试策略、参数校验（@Validated + 分组）、分页防深翻页（游标）。

## 8.3 上线与回滚

- **发布策略**：灰度发布（先 10% 流量验证）、金丝雀、蓝绿部署、滚动更新（K8s）
- **回滚预案**：镜像/版本标签管理，一键回滚到上个稳定版本
- **数据库变更**：**先兼容后切换**（新增字段先可空 → 发布代码 → 再收紧）；大表 DDL 用工具（gh-ost/pt-osc）在线变更，避免锁表
- **监控先行**：发布前确认告警就位，发布后观察错误率/延迟/GC

---

# 附：高级开发自测清单

- [ ] 能讲清 HashMap 扰动函数、红黑树化 8 的泊松依据、扩容位运算迁移
- [ ] 能画 AQS 入队/唤醒流程，说清公平/非公平锁差异
- [ ] 能讲清 redo/undo/binlog 三日志与两阶段提交
- [ ] 能解读 EXPLAIN 全部关键列并定位优化点
- [ ] 能设计分库分表方案并说清分布式 ID、跨片查询、迁移问题
- [ ] 能讲清 Redis 底层编码、epoll、缓存一致性策略选型
- [ ] 能主导一次线上问题排查（CPU/内存/慢查询）并给方案
- [ ] 能独立完成高可用系统设计答辩（限流/熔断/幂等/一致性）

*配合《Java全栈知识点详解》基础篇使用：基础篇建立体系，本篇达到高级深度。*
