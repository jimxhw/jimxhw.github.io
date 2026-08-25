# Java 全栈知识点详解

> **用途**：本手册是 Java 全栈的详细知识点教程，按章节顺序学习即可，每个知识点包含「原理讲解 + 代码示例 + 易错点」。
> **配套**：学完用《Java全栈+AI全栈面试手册》自测。本文件含「基础篇」与「进阶篇（高级深度）」两部分。
> **建议节奏**：每章 3~7 天，边读边敲代码。

---

# 第 1 章 Java 语言核心

## 1.1 面向对象三大特性

### 1.1.1 封装（Encapsulation）
**概念**：把对象的属性和操作属性的方法封装在一起，对外隐藏内部实现，通过公共方法访问。

```java
public class Account {
    private double balance;              // 属性私有

    public void deposit(double amount) { // 对外暴露方法
        if (amount <= 0) throw new IllegalArgumentException("金额必须大于0");
        this.balance += amount;
    }
    public double getBalance() { return balance; }
}
```

**易错点**：
- 属性一律 `private`，通过 getter/setter 或业务方法访问
- 校验逻辑写在方法内部（如上例金额判断），不要裸暴露字段

### 1.1.2 继承（Inheritance）
**概念**：子类复用父类代码，`extends` 单继承（Java 类只能单继承，接口可多实现）。

```java
class Animal {
    protected String name;
    public void eat() { System.out.println(name + " 在吃东西"); }
}
class Dog extends Animal {
    public void bark() { System.out.println(name + " 汪汪叫"); }
}
```

**要点**：
- `protected` 修饰的成员：同包或子类可访问
- 构造器：子类构造器**第一行**必须调父类构造器（默认调无参构造）
- `super`：访问父类成员/方法；`this`：访问本类
- **方法重写（Override）**：子类重写父类方法，要求——方法名/参数列表相同、返回类型是其子类、访问权限不能更小、不能抛更宽的异常

### 1.1.3 多态（Polymorphism）
**概念**：父类引用指向子类对象，运行时调用实际对象的方法（**运行时绑定**/动态绑定）。

```java
Animal a = new Dog();
a.eat();   // 调用的是 Dog 重写后的 eat() —— 多态
```

**实现条件**：继承 + 重写 + 父类引用指向子类对象。
**静态绑定 vs 动态绑定**：方法重载是编译期（静态）绑定；方法重写是运行期（动态）绑定。

**易错点**：
- 多态时**属性看编译类型，方法看运行类型**：

```java
class A { int x = 1; }
class B extends A { int x = 2; }
A obj = new B();
System.out.println(obj.x); // 输出 1（属性不参与多态，按声明类型 A）
```

- `instanceof` 判断实际类型

## 1.2 接口与抽象类

| 维度 | 抽象类 abstract class | 接口 interface |
|---|---|---|
| 继承 | 单继承，`extends` | 多实现，`implements`（可多实现） |
| 成员 | 可有属性、构造器、普通方法 | JDK8+ 可有 default/static 方法；属性必须是 `public static final` 常量 |
| 语义 | "是什么"（is-a），公共模板 | "能做什么"（can-do），能力契约 |
| 构造器 | 有 | 无 |
| 场景 | 模板方法模式 | 多态能力、解耦、策略模式 |

```java
// 接口：能力契约
public interface Flyable {
    void fly();
    default void takeOff() { System.out.println("默认起飞"); }  // JDK8+
}
// 抽象类：公共模板
public abstract class Bird {
    protected String name;
    public abstract void sing();       // 抽象方法，子类必须实现
    public void breathe() { System.out.println("呼吸"); }       // 通用实现
}
```

**易错点**：接口中变量默认 `public static final`，方法默认 `public abstract`（JDK8 前）。

## 1.3 异常体系

```
Throwable
├── Error          （不可恢复：OutOfMemoryError、StackOverflowError）
└── Exception
    ├── RuntimeException（非受检：NPE、ClassCastException、ArithmeticException）
    └── 其他受检异常（IOException、SQLException）—— 必须捕获或声明抛出
```

```java
// 自定义异常
public class BizException extends RuntimeException {
    public BizException(String msg) { super(msg); }
}
// 使用
try {
    int r = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("除数不能为0");
} finally {
    System.out.println("无论是否异常都执行");   // 释放资源
}
// try-with-resources：自动关闭实现 AutoCloseable 的资源
try (FileInputStream in = new FileInputStream("a.txt")) {
    // 无需 finally 手动 close
}
```

**易错点**：
- `finally` 中不要 return（会覆盖 try/catch 的返回值）
- 捕获异常要**精确分类**，不要全 catch(Exception)；生产环境要打印完整堆栈 `e.printStackTrace()` 或记日志
- 业务校验异常推荐用**运行时异常**（RuntimeException），避免层层声明

## 1.4 泛型

**作用**：编译期类型检查，消除强制类型转换。

```java
List<String> list = new ArrayList<>();   // 菱形语法
list.add("a");                           // 编译期就校验类型
```

**类型擦除**：泛型信息只在编译期存在，运行时 JVM 里泛型被擦除为原始类型（`List<String>` 变 `List`）。所以：
- 不能用 `new T()`、`instanceof T`
- 泛型方法：

```java
public static <T> T getFirst(List<T> list) { return list.get(0); }
```

**通配符**：
- `? extends T`：上界通配符，可读不可写（存的是 T 或其子类，写哪个不确定）
- `? super T`：下界通配符，可写不可读（可放 T 及其父类）
- PECS 原则：**Producer Extends, Consumer Super**（读用 extends，写用 super）

```java
// 只读：? extends
void print(List<? extends Number> list) { for (Number n : list) {} }
// 只写：? super
void addAll(List<? super Integer> list) { list.add(1); }
```

## 1.5 集合框架

### 1.5.1 ArrayList 与 LinkedList

**ArrayList**：底层**动态数组**（Object[]）
- 初始容量 10，扩容 1.5 倍（`old + old >> 1`），`Arrays.copyOf` 复制
- 随机访问 O(1)，中间插入/删除 O(n)（挪元素）
- **fail-fast**：迭代时 modCount 变化抛 ConcurrentModificationException

**LinkedList**：底层**双向链表**
- 插入/删除头尾 O(1)，随机访问 O(n)
- 可做队列/栈（实现了 Deque）

**选型**：查多改少用 ArrayList；频繁头尾操作用 LinkedList。

### 1.5.2 HashMap 源码级原理（面试必考）

**核心结构**：`数组 + 链表 + 红黑树`

```
table[] 数组（Node<K,V>[]）
├── index 0 → null
├── index 1 → Node("a") → Node("b") → Node("c")   （链表：hash 冲突）
└── index 2 → TreeNode(...)                          （红黑树：链表≥8 且数组≥64）
```

**关键参数**：
- 默认容量 16，负载因子 0.75，**扩容阈值 = 容量 × 0.75 = 12**
- 链表长度 ≥8 且数组长度 ≥64 → 链表转红黑树；红黑树节点 ≤6 转回链表

**put(key, value) 完整流程**：
1. 计算 `hash = (h = key.hashCode()) ^ (h >>> 16)` —— **扰动函数**，让高位参与低 16 位运算，减少碰撞
2. 定位桶：`index = (table.length - 1) & hash`（等价取模，用位运算更快）
3. 桶为空 → 直接放新 Node
4. 桶非空 → 判断 key 是否相同（先比 hash 再比 equals）：
   - 相同 → 覆盖旧值
   - 不同 → 追加到链表尾部（JDK8 尾插法），超 8 转红黑树
5. size 超过阈值 → **扩容**（容量翻倍，元素重哈希 rehash）

**扩容为什么是 1.5 倍而非 2 倍**（细节加分）：1.5 倍后 `length-1` 高位多出 1 个 bit，元素要么在原位置，要么在原位置 + 旧容量，可精确计算，避免全部重排。

**线程安全问题**：
- JDK7：头插法 + 并发扩容 → **环形链表死循环**
- JDK8：尾插法，不会死循环，但并发 put 会**丢数据/覆盖**
- 解决：`ConcurrentHashMap`（性能好）、`Collections.synchronizedMap`（全表锁，性能差）、`Hashtable`（全表锁）

**面试追问**：
- 为什么重写 equals 必须重写 hashCode？→ HashMap 先用 hashCode 定位桶，equals 只在同桶内比较；只重写 equals 不重写 hashCode，两个 equals 相等的对象 hashCode 不同，会存到不同桶，get 找不到
- 为什么默认容量是 2 的幂？→ `(length-1) & hash` 才能均匀分布；扩容也是 2 倍

### 1.5.3 ConcurrentHashMap（JDK8）

**结构**：`Node 数组 + CAS + synchronized`

**put 流程**：
1. 桶为空 → **CAS**（`casTabAt`）无锁插入
2. 桶非空 → **synchronized 锁住桶头节点**，链表中插入
3. 链表≥8 → 转红黑树

**读**：`get` 全程无锁（Node 的 value 是 volatile，保证可见性）
**size()**：baseCount + CounterCell[] 分段计数，避免高并发竞争一个变量

**对比 JDK7**：JDK7 用 Segment 分段锁（继承 ReentrantLock），锁粒度是段（默认 16 段）；JDK8 锁粒度降到**单个桶**，并发度更高。

### 1.5.4 其他集合速查

| 集合 | 底层 | 特点/场景 |
|---|---|---|
| HashSet | HashMap（value 是固定对象） | 去重，无序 |
| TreeSet / TreeMap | 红黑树 | 有序，可自定义 Comparator |
| LinkedHashMap | HashMap + 双向链表 | 有序（插入序/访问序），可做 LRU 缓存 |
| CopyOnWriteArrayList | 写时复制数组 | 读多写少，迭代安全 |
| ConcurrentLinkedQueue | CAS 链表 | 无界并发队列 |
| ArrayBlockingQueue | 数组+锁 | 有界阻塞队列（线程池常用） |

## 1.6 并发编程（重中之重）

### 1.6.1 线程创建的 4 种方式

```java
// 1. 继承 Thread
class MyThread extends Thread { public void run() { ... } }
new MyThread().start();

// 2. 实现 Runnable（推荐：避免单继承限制，解耦任务与线程）
new Thread(() -> System.out.println("run"), "t1").start();

// 3. Callable + FutureTask（有返回值，可抛异常）
FutureTask<Integer> task = new FutureTask<>(() -> 1 + 1);
new Thread(task).start();
int result = task.get();              // 阻塞等待结果

// 4. 线程池（生产环境唯一推荐）
ExecutorService pool = Executors.newFixedThreadPool(5);
pool.submit(() -> System.out.println("task"));
```

**start() vs run()**：start() 新建线程并执行；直接调 run() 只是普通方法调用（当前线程执行）。

### 1.6.2 synchronized 与 Lock

**synchronized 用法**：
```java
// 1. 修饰实例方法：锁 this
// 2. 修饰静态方法：锁 Class 对象
// 3. 代码块：锁指定对象
synchronized (lockObj) {
    // 临界区
}
```

**锁升级（JDK6 优化）**：无锁 → 偏向锁（单线程）→ 轻量级锁（CAS 自旋）→ 重量级锁（阻塞）。

**Lock（ReentrantLock）独有能力**：
```java
Lock lock = new ReentrantLock(true);   // fair=true 公平锁
lock.lock();
try {
    // 临界区
} finally {
    lock.unlock();                     // 必须手动释放
}
// 特色 API
boolean ok = lock.tryLock(3, TimeUnit.SECONDS);  // 尝试获取，超时放弃
lock.lockInterruptibly();              // 可响应中断
Condition cond = lock.newCondition();  // 条件变量，精确唤醒
```

**对比总结**：

| 维度 | synchronized | ReentrantLock |
|---|---|---|
| 锁释放 | 自动 | 手动（finally） |
| 可中断/超时 | 否 | 是 |
| 公平锁 | 否 | 可配 |
| 多条件 | 1 个（wait/notify） | 多个 Condition |
| 性能 | 锁升级后相近 | 相近 |

**可重入性**：同一线程可重复获取同一把锁（计数器 +1/-1），避免死锁。

### 1.6.3 volatile

**作用**：保证**可见性** + **禁止指令重排**，不保证原子性。

```java
// 典型：状态标志
volatile boolean running = true;
// 线程A修改 running，线程B立即可见（不加 volatile 可能一直读旧值）
```

**为什么不能保证原子性**：`count++` 是"读-改-写"三步，volatile 只保证每一步的可见性，不保证三步原子。

**DCL 单例为什么用 volatile**：
```java
class Singleton {
    private static volatile Singleton instance;
    public static Singleton getInstance() {
        if (instance == null) {                    // 第一次检查
            synchronized (Singleton.class) {
                if (instance == null) {            // 第二次检查
                    instance = new Singleton();    // ①分配内存 ②初始化 ③赋值
                }
            }
        }
        return instance;
    }
}
```
不加 volatile 时，②③可能重排 → 线程B拿到"半初始化"的对象。volatile 禁止重排解决。

### 1.6.4 CAS 与 AQS

**CAS（Compare And Swap）**：`比较旧值，相同才更新`，原子操作（硬件指令支持）。
```java
AtomicInteger ai = new AtomicInteger(0);
ai.incrementAndGet();              // 底层 CAS 自旋
```

**CAS 三大问题**：
1. **ABA 问题**：值 A→B→A，CAS 误判未变 → 加版本号（`AtomicStampedReference`）
2. **自旋开销**：竞争激烈时 CPU 空转 → LongAdder 分段累加（低竞争合算，高竞争分 段）
3. **只能保证一个变量原子** → AtomicReference 包装

**AQS（AbstractQueuedSynchronizer）**：并发工具的灵魂。
- 核心：`volatile int state`（资源状态）+ **CLH 双向等待队列**（获取失败的线程排队）
- `ReentrantLock`：state 表示重入次数；`Semaphore`：state 表示许可数；`CountDownLatch`：state 表示计数
- 模板方法：acquire（CAS 拿 state → 失败入队 park）→ release（改 state → 唤醒队头）

### 1.6.5 线程池（必考）

**ThreadPoolExecutor 七大参数**：
```java
new ThreadPoolExecutor(
    corePoolSize,          // 1.核心线程数（常驻）
    maximumPoolSize,       // 2.最大线程数
    keepAliveTime,         // 3.非核心线程空闲存活时间
    TimeUnit.SECONDS,      // 4.时间单位
    new ArrayBlockingQueue<>(100),  // 5.任务队列（有界）
    Executors.defaultThreadFactory(),// 6.线程工厂
    new ThreadPoolExecutor.AbortPolicy() // 7.拒绝策略
);
```

**执行流程**：
```
提交任务
  → 线程数 < corePoolSize？ → 新建核心线程执行
  → 队列没满？ → 入队等待
  → 线程数 < maximumPoolSize？ → 新建非核心线程执行
  → 否则 → 走拒绝策略
```

**四种拒绝策略**：
| 策略 | 行为 |
|---|---|
| AbortPolicy（默认） | 抛 RejectedExecutionException |
| CallerRunsPolicy | 提交者线程自己执行（慢速降级，推荐） |
| DiscardPolicy | 静默丢弃 |
| DiscardOldestPolicy | 丢弃队列最老任务再提交 |

**为什么不用 Executors**：
- `newFixedThreadPool`：无界队列 LinkedBlockingQueue → 任务积压内存 OOM
- `newCachedThreadPool`：最大线程数 MAX_VALUE → 线程无限创建 OOM
- `newScheduledThreadPool`：无界队列，同理

**正确姿势**：手动 new ThreadPoolExecutor，有界队列 + 自定义拒绝策略 + 监控（活跃线程数、队列长度）。

**参数如何设置（面试常问）**：
- CPU 密集型：`core = CPU核数 + 1`
- IO 密集型：`core = CPU核数 × 2`（或 核数 / (1 - 阻塞系数)）

### 1.6.6 ThreadLocal

**原理**：每个 Thread 内部有 `ThreadLocalMap`，key 是 ThreadLocal 实例（**弱引用**），value 是存入的值。

```java
ThreadLocal<Integer> tl = new ThreadLocal<>();
tl.set(100);
Integer v = tl.get();
tl.remove();   // 必须：防止内存泄漏
```

**内存泄漏原因**：ThreadLocal 被回收后，ThreadLocalMap 的 key 变 null，但 value 仍被强引用 → 线程存活期间 value 无法回收。
**解决**：finally 中 `remove()`；线程池复用线程更要 remove（否则下一个任务读到脏数据）。

**应用场景**：请求上下文（用户信息）、数据库连接、SimpleDateFormat（非线程安全 → 每线程一份）。

### 1.6.7 JUC 工具类

```java
// CountDownLatch：等 N 个任务完成（一次性的）
CountDownLatch latch = new CountDownLatch(3);
// 每个任务结束调 latch.countDown();
latch.await();   // 主线程阻塞直到计数归零

// CyclicBarrier：N 个线程互相等待齐了再继续（可循环使用）
CyclicBarrier barrier = new CyclicBarrier(3, () -> System.out.println("都到齐了"));
// 每个线程执行 barrier.await();

// Semaphore：信号量，控制并发访问数（限流）
Semaphore sp = new Semaphore(5);   // 同时最多 5 个
sp.acquire();  ... sp.release();

// 原子类
AtomicInteger, AtomicLong, AtomicReference, LongAdder
```

## 1.7 IO 模型（了解级）

| 模型 | 说明 | 特点 |
|---|---|---|
| BIO | 一个连接一个线程，阻塞读 | 简单，连接多线程爆炸 |
| NIO | 多路复用（Selector 轮询通道） | 事件驱动，非阻塞 |
| AIO | 异步通知 | 回调完成 |

- **Netty**：NIO 的封装，Reactor 模式（主从 Reactor），高并发网络框架标配
- 面试够用：能说出 BIO/NIO/AIO 区别 + Netty 是 NIO 的 Reactor 封装即可

---

# 第 2 章 JVM

## 2.1 内存区域（运行时数据区）

```
┌─────────────────────────────────────────────┐
│ 线程私有                                      │
│  虚拟机栈（方法调用栈帧：局部变量/操作数栈/方法出口）    │
│  本地方法栈（native 方法）                      │
│  程序计数器（当前执行字节码行号）                  │
├─────────────────────────────────────────────┤
│ 线程共享                                      │
│  堆（对象实例，GC 主战场，可调 -Xms/-Xmx）        │
│  方法区/元空间（类元信息、常量池、静态变量，本地内存）  │
└─────────────────────────────────────────────┘
```

**JDK8 变化**：永久代（PermGen）→ **元空间（Metaspace）**，使用**本地内存**（不再受堆大小限制）；字符串常量池移到堆。

**内存溢出场景**：
- 栈溢出 `StackOverflowError`：无限递归
- 堆溢出 `OutOfMemoryError: Java heap space`：大对象太多
- 元空间溢出：动态生成大量类（如反射、CGLIB 代理）

## 2.2 对象创建过程

1. **类加载检查**：new 指令 → 检查常量池能否找到类符号引用 → 类是否已加载（未加载先加载）
2. **分配内存**：指针碰撞（堆规整）或空闲列表（不规整）
3. **初始化零值**：字段默认值（0 / null / false）
4. **设置对象头**：Mark Word（hashCode、GC 年龄、锁状态）+ 类型指针
5. **执行 init**：调用构造器

**对象在堆中的内存布局**：对象头（Mark Word + 类型指针）+ 实例数据 + 对齐填充。

## 2.3 类加载机制

**生命周期**：加载 → 验证 → 准备 → 解析 → 初始化 → 使用 → 卸载

**双亲委派**：
```
应用类加载器（加载 classpath 类）
  ↑ 委托
扩展类加载器（加载 lib/ext）
  ↑ 委托
启动类加载器（Bootstrap，加载 rt.jar 核心类）
```
加载流程：先让**父加载器**尝试加载，父加载不了才自己加载。

**为什么必须双亲委派**：
1. **防止核心类被篡改**：如自定义 `java.lang.String` 会被 Bootstrap 拦截，保证核心类唯一
2. **避免重复加载**：同类只被一个加载器加载

**打破双亲委派的场景**（面试加分）：
- **Tomcat**：每个 Webapp 有自己的类加载器（隔离不同应用的同名类）
- **JDBC SPI**：`DriverManager` 由 Bootstrap 加载，但实现（MySQL 驱动）在 classpath → 用 `Thread.currentThread().getContextClassLoader()` 反向加载

## 2.4 垃圾回收

### 2.4.1 判定对象可回收
**引用计数法**（Python 用）：循环引用问题，JVM 不用。
**可达性分析**：从 **GC Roots** 出发，不可达的对象可回收。

**GC Roots 有哪些**：
- 虚拟机栈中引用的对象（局部变量）
- 静态属性引用的对象
- 常量引用的对象
- JNI（native）引用的对象

**四种引用**：
| 引用 | 回收时机 | 场景 |
|---|---|---|
| 强引用 | 永不回收（OOM 也不回收） | new 对象 |
| 软引用 SoftReference | 内存不足时回收 | 缓存、图片 |
| 弱引用 WeakReference | 下次 GC 即回收 | ThreadLocal key、WeakHashMap |
| 虚引用 PhantomReference | 回收后通知 | 对象回收跟踪（堆外内存释放） |

### 2.4.2 分代收集

**堆分区**：新生代（Eden : S0 : S1 = 8:1:1）+ 老年代

```
新生代（复制算法）              老年代（标记-整理/标记-清除）
Eden + 2×Survivor             大对象直接进老年代
新对象先放 Eden                长期存活对象（年龄≥15）晋升
Minor GC 频繁                  Major GC / Full GC 少
```

**GC 算法**：
- **标记-清除**：有内存碎片，效率低
- **复制**：新生代用，浪费 10% 空间（8:1:1），无碎片
- **标记-整理**：老年代用，移动对象无碎片，有移动开销

### 2.4.3 垃圾收集器（面试重点：CMS 与 G1）

**CMS（Concurrent Mark Sweep）**——老年代，标记-清除
- 流程：初始标记（STW 短）→ 并发标记 → 重新标记（STW 短）→ 并发清除
- 缺点：**内存碎片**（标记-清除）、并发失败退化 Full GC、CPU 敏感
- JDK9 标记废弃，JDK14 移除

**G1（Garbage First）**——JDK9+ 默认，全堆
- **Region 分区**（2048 个 Region），逻辑分代
- **可预测停顿**：`-XX:MaxGCPauseMillis=200`，优先回收垃圾最多的 Region
- 复制算法 → 无碎片；大对象用 Humongous Region

**对比**：
| 维度 | CMS | G1 |
|---|---|---|
| 算法 | 标记-清除（碎片） | Region + 复制（无碎片） |
| 停顿 | 不可控 | 可预测 |
| 适用 | 低延迟老年代 | 大堆、低延迟 |

**ZGC（了解）**：JDK15+，染色指针 + 读屏障，停顿 <1ms，TB 级堆。

### 2.4.4 触发条件
- Minor GC：Eden 满
- Full GC：老年代满 / 元空间满 / System.gc()

## 2.5 JVM 调优与 OOM 排查

**常用参数**：
```bash
-Xms512m -Xmx512m          # 堆大小（生产建议相等，避免扩容抖动）
-Xss256k                   # 栈大小
-XX:+UseG1GC               # 指定收集器
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/   # OOM 自动 dump
```

**OOM 排查流程**：
1. `jps` 找到进程 PID
2. `jstat -gcutil PID 1000` 看 GC 频率（E 区/O 区百分比、Full GC 次数）
3. 若 OOM：`jmap -dump:format=b,file=heap.hprof PID` 导出堆
4. **MAT / JVisualVM** 分析：看 Dominator Tree 找大对象、看 GC Roots 找泄漏链
5. 定位代码：大集合未释放、静态容器持有对象、ThreadLocal 未 remove、连接未关闭

**top 常见问题**：CPU 高 → `top -Hp PID` 找线程 → `jstack PID` 看线程栈（找死循环/锁竞争/GC 线程）。

---

# 第 3 章 Spring 生态

## 3.1 IoC 与 DI

**IoC（控制反转）**：对象的创建和依赖管理交给容器（Spring），而不是自己 new。
**DI（依赖注入）**：容器把依赖"注入"给对象。

```java
@Component           // 声明为 Bean，交给容器
public class UserService {
    @Autowired       // 依赖注入
    private UserDao userDao;
}
```

**BeanFactory vs ApplicationContext**：
- BeanFactory：最底层容器，**懒加载**（getBean 才创建）
- ApplicationContext：高级容器，**预加载**（启动即创建单例）+ 国际化/事件/资源加载/AOP 集成

**注入方式**：字段注入（@Autowired，简单但不推荐）、构造器注入（**推荐**：final + 不可变 + 便于测试）、setter 注入（可选依赖）。

## 3.2 Bean 的生命周期（必考）

```
实例化（构造器）
  → 属性填充（@Autowired 依赖注入）
  → Aware 回调：BeanNameAware / BeanFactoryAware / ApplicationContextAware
  → @PostConstruct（或 InitializingBean.afterPropertiesSet）
  → BeanPostProcessor.beforeInitialization
  → init-method（@Bean(initMethod=)）
  → BeanPostProcessor.afterInitialization  ← AOP 代理在这里生成
  → 使用
  → @PreDestroy（或 DisposableBean.destroy）
```

**完整版 BeanPostProcessor 时机**：`beforeInit` 在前、`afterInit` 在后，**AOP 代理是在 afterInitialization 通过 AbstractAutoProxyCreator 生成的**——所以 @Transactional、@Async 都是代理生效。

## 3.3 循环依赖与三级缓存（深度加分）

**问题**：A 依赖 B，B 依赖 A → 直接创建会死锁。

**三级缓存**：
```java
// DefaultSingletonBeanRegistry 三个 Map
1. singletonObjects      // 一级：成品单例
2. earlySingletonObjects // 二级：提前暴露的半成品（已实例化未初始化）
3. singletonFactories    // 三级：工厂，getEarlyBeanReference 生成代理
```

**流程**（A 依赖 B，B 依赖 A）：
1. 创建 A：实例化（半成品）→ 放入三级缓存工厂
2. A 填充属性：需要 B → 创建 B
3. B 实例化 → B 填充属性：需要 A → 从三级缓存拿到 A 的**提前引用**（可能生成代理）→ 存入二级缓存
4. B 创建完成 → 注入给 A
5. A 继续完成初始化 → 从二级缓存升级到一级缓存

**限制（面试必答）**：
- 只支持**单例 + setter/字段注入**的循环依赖
- **构造器注入**循环依赖无法解决（实例化就需要对方，无法提前暴露）→ 直接报错
- **prototype 作用域**不缓存，无法解决

## 3.4 AOP

**AOP（面向切面）**：把日志、事务、权限等横切逻辑从业务代码中抽离。

```java
@Aspect
@Component
public class LogAspect {
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void pt() {}

    @Before("pt()")          // 前置
    public void before(JoinPoint jp) { System.out.println("调用前: " + jp.getSignature()); }
    @AfterReturning("pt()")  // 返回后
    @AfterThrowing("pt()")   // 异常后
    @Around("pt()")          // 环绕（最强大，可控制目标方法执行）
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        long t = System.currentTimeMillis();
        Object result = pjp.proceed();     // 执行目标方法
        System.out.println("耗时: " + (System.currentTimeMillis() - t) + "ms");
        return result;
    }
}
```

**动态代理两种实现**：
| 方式 | 条件 | 原理 |
|---|---|---|
| JDK 动态代理 | 目标类**有接口** | InvocationHandler + Proxy.newProxyInstance，生成实现接口的代理类 |
| CGLIB | 无接口 | 生成目标类的**子类**，继承方式增强（final 类/方法无法代理） |

SpringBoot 2.x 起默认**强制 CGLIB**（即使有接口）。注意：自调用（this 调 this）不走代理，AOP 不生效。

## 3.5 Spring Boot 自动装配原理（必考）

```java
@SpringBootApplication  // = 以下三个
@SpringBootConfiguration // ① @Configuration 的变体：声明配置类
@EnableAutoConfiguration // ② 核心：开启自动装配
@ComponentScan           // ③ 扫描启动类所在包及其子包
```

**@EnableAutoConfiguration 原理**：
1. 通过 `@Import(AutoConfigurationImportSelector.class)` 引入选择器
2. 选择器读取 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 文件（SpringBoot 2.7+，之前是 spring.factories）
3. 拿到所有自动配置类（如 RedisAutoConfiguration、DataSourceAutoConfiguration）
4. 每个自动配置类上都有**条件注解**，满足条件才生效：
   - `@ConditionalOnClass`：classpath 有对应类（如导入了 redis 依赖才有 RedisTemplate）
   - `@ConditionalOnMissingBean`：容器中没有自定义 Bean 才创建默认
   - `@ConditionalOnProperty`：配置项存在

**面试一句话**：启动时扫描 imports 里的自动配置类，用条件注解按需装配，且"用户自定义的 Bean 优先"。

## 3.6 常用注解速查

**类/Bean 声明**：@Component（通用）、@Service、@Repository、@Controller、@Configuration、@Bean（方法上返回对象）
**依赖注入**：@Autowired、@Resource、@Qualifier（按名）、@Value（配置文件值）、@ConfigurationProperties（批量绑定）
**Web**：@RestController（= @Controller + @ResponseBody）、@RequestMapping/@GetMapping/@PostMapping、@RequestBody（JSON 转对象）、@PathVariable、@RequestParam、@RequestHeader
**校验**：@Validated + @NotBlank/@NotNull/@Size/@Email/@Pattern（参数校验自动 400 返回）
**异常处理**：
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BizException.class)
    public R<?> handle(BizException e) {
        return R.error(e.getMessage());
    }
}
```
**事务**：@Transactional；**异步**：@Async（需 @EnableAsync）；**定时**：@Scheduled（需 @EnableScheduling）

## 3.7 事务（重点）

```java
@Transactional(rollbackFor = Exception.class)   // 生产必须指定，默认只回滚 RuntimeException
public void transfer(Long from, Long to, BigDecimal amount) {
    accountMapper.decrease(from, amount);
    accountMapper.increase(to, amount);
}
```

**传播行为（propagation）**：
| 传播 | 行为 |
|---|---|
| REQUIRED（默认） | 有事务用当前，无则新建 |
| REQUIRES_NEW | 无论有无都新建（挂起外层） |
| NESTED | 嵌套事务（保存点，内层回滚不影响外层） |
| SUPPORTS | 有则加入，无则不开启 |
| NOT_SUPPORTED | 以非事务执行 |
| MANDATORY | 必须有事务否则报错 |

**失效场景（必考）**：
1. **自调用**：同类内部 this.method() 不走代理 → 注入自身（@Autowired this）或拆成两个类
2. **异常被吞**：try-catch 后没抛出 → 事务感知不到；必须 `throw new RuntimeException` 或 `TransactionAspectSupport.currentTransactionStatus().setRollbackOnly()`
3. **rollbackFor 没配**：默认只回滚 RuntimeException 和 Error，**受检异常（IOException 等）不回滚**
4. **非 public 方法**：代理无法拦截
5. **数据库引擎不支持**：MyISAM 无事务
6. **多线程**：新线程里的事务不在原事务上下文

**传播行为面试题**：外层方法 try-catch 了内层方法，内层 REQUIRED 加入外层 → 内层异常被吞，外层不感知 → 数据不一致；解法：内层用 REQUIRES_NEW 独立事务，或不要吞异常。

## 3.8 Spring Security + JWT

**认证授权流程**：
```
客户端登录 → 服务端验证用户名密码 → 签发 JWT（含用户信息+过期时间）
客户端请求 → 带 Authorization: Bearer <token>
→ 过滤器链（OncePerRequestFilter）解析 token → 校验签名/过期
→ 认证通过，设置 SecurityContext（用户信息）→ 放行 Controller
→ 授权：方法注解 @PreAuthorize("hasRole('ADMIN')") 校验权限
```

**JWT 结构**：`Header.Payload.Signature`
- Header：算法（HS256）
- Payload：用户信息、exp 过期时间（Base64，**可解码，别放敏感信息**）
- Signature：Header.Payload 用密钥签名，防篡改

**RBAC 权限模型**：用户 → 角色 → 权限（菜单/按钮），三张表（user / role / permission）+ 中间表。

**Spring Security 核心组件**：SecurityFilterChain（过滤器链）、UserDetailsService（查用户）、PasswordEncoder（BCrypt 加密——不要用 MD5）。

## 3.9 MyBatis-Plus

**核心能力**：
- 内置 CRUD：`userMapper.selectById(id)`、`selectList(wrapper)`
- **条件构造器**（防 SQL 拼接）：
```java
LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
wrapper.eq(User::getStatus, 1)                    // 等值
       .like(User::getName, "张")                 // 模糊
       .between(User::getAge, 18, 30)             // 区间
       .orderByDesc(User::getCreateTime)          // 排序
       .last("limit 10");                         // 追加 SQL
List<User> list = userMapper.selectList(wrapper);
```
- 分页插件：`Page<User> page = new Page<>(1, 10); userMapper.selectPage(page, wrapper);`
- 逻辑删除：@TableLogic（delete 变 update）
- 自动填充：@TableField(fill = FieldFill.INSERT)（createTime 自动填）
- 代码生成器：一键生成 entity/mapper/service/controller

**手写 SQL（多表）**：
```xml
<select id="selectUserOrders" resultType="map">
    SELECT u.name, COUNT(o.id) AS order_count
    FROM user u
    LEFT JOIN orders o ON o.user_id = u.id
    WHERE u.status = 1
    GROUP BY u.id
    HAVING order_count > 0
</select>
```
**#{} vs ${}**：`#{}` 预编译占位符（**防 SQL 注入**，推荐）；`${}` 字符串拼接（有注入风险，仅用于动态表名/排序字段且要白名单校验）。

---

# 第 4 章 MySQL

## 4.1 索引

### 4.1.1 为什么用 B+ 树
| 结构 | 问题 |
|---|---|
| 哈希表 | 不支持范围查询、无顺序 |
| 二叉树/红黑树 | 数据量大时树太高，磁盘 IO 多 |
| B 树 | 数据分散在节点，范围查询要中序遍历 |
| **B+ 树** | 非叶子只存 key（扇出大、树矮，3 层支持千万级）；叶子有序链表 → 范围查询高效 |

**B+ 树特点**：
- 非叶子节点只存索引 key → 每节点能存更多 key → 树更矮 → 磁盘 IO 更少
- 叶子节点存数据 + **双向链表** → 范围查询（`WHERE id BETWEEN 100 AND 200`）只需顺序扫描
- 单次查询 IO 次数 = 树高（3~4 次，固定可预测）

### 4.1.2 聚簇索引 / 二级索引 / 回表 / 覆盖索引

**聚簇索引（主键索引）**：叶子节点存**整行数据**。InnoDB 必须有聚簇索引（无主键用首个唯一索引，再无则隐藏 rowid）。
**二级索引（普通索引）**：叶子节点存**主键值**。
**回表**：查二级索引拿到主键 → 再用主键查聚簇索引拿整行。

```sql
-- 建表
CREATE TABLE user (
  id BIGINT PRIMARY KEY,
  name VARCHAR(50),
  age INT,
  KEY idx_name (name)
);
-- 回表：通过 name 索引找到 id，再回聚簇索引查 age
SELECT * FROM user WHERE name = '张三';
-- 覆盖索引（免回表）：查询列都在二级索引里
SELECT id, name FROM user WHERE name = '张三';   -- idx_name 里有 id 和 name
```

**优化**：`SELECT id, name` 而非 `SELECT *`，配合联合索引实现覆盖，避免回表。

### 4.1.3 联合索引与最左前缀

```sql
CREATE INDEX idx_name_age ON user (name, age);
-- 能用到索引
WHERE name = '张三'                 -- ✓
WHERE name = '张三' AND age = 20    -- ✓
-- 用不到（跳过最左列）
WHERE age = 20                      -- ✗ 索引失效
```

**最左前缀**：联合索引按最左列优先排序，查询必须包含最左列（或最左列的前缀范围）才能命中。
**设计原则**：字段区分度高的放前面；查询频繁的放前面。

### 4.1.4 索引失效场景（必考）

1. 违反最左前缀（如上）
2. 对索引列使用函数：`WHERE YEAR(create_time) = 2026` → 改范围 `create_time >= '2026-01-01'`
3. 隐式类型转换：`WHERE phone = 123`（phone 是 varchar）→ 强制转类型
4. 模糊匹配前缀：`LIKE '%张'` 失效；`LIKE '张%'` 有效
5. `OR` 连接非索引列：`WHERE name = 'a' OR age = 20`（age 无索引）→ 拆 UNION 或建联合索引
6. `!=` / `<>` / `NOT IN`（部分情况）：MySQL 优化器可能放弃
7. `IS NULL` / `IS NOT NULL`：部分版本/场景
8. 数据量太小：优化器觉得全表扫更快

### 4.1.5 explain 执行计划（定位慢 SQL 核心技能）

```sql
EXPLAIN SELECT * FROM user WHERE name = '张三';
```

| 列 | 含义 | 关注点 |
|---|---|---|
| type | 访问类型 | 好→差：system > const > eq_ref > ref > range > index > **ALL（全表扫，必须优化）** |
| key | 实际用到的索引 | NULL = 没走索引 |
| rows | 预估扫描行数 | 越小越好 |
| Extra | 附加信息 | **Using filesort**（排序没走索引）、**Using temporary**（临时表）、**Using index**（覆盖索引，好） |

## 4.2 事务与 MVCC

### 4.2.1 ACID
- **原子性**：全成功或全回滚（undo log 实现）
- **一致性**：事务前后数据完整约束不被破坏
- **隔离性**：并发事务互不干扰（锁 + MVCC）
- **持久性**：提交后永久保存（redo log 实现）

### 4.2.2 隔离级别与问题

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
|---|---|---|---|
| 读未提交 | ✗ 可能 | 可能 | 可能 |
| 读已提交（RC） | 解决 | 可能 | 可能 |
| **可重复读（RR，MySQL 默认）** | 解决 | 解决 | 基本解决（MVCC+间隙锁） |
| 串行化 | 全解决 | 全解决 | 全解决（性能最差） |

- **脏读**：读到别的事务**未提交**的数据
- **不可重复读**：同一事务内两次读同一行，结果不同（别的事务提交了 update）
- **幻读**：同一事务内两次查询，结果**行数**不同（别的事务 insert/delete）

### 4.2.3 MVCC（多版本并发控制）原理（深度）

**目标**：读不加锁、读写不阻塞，实现"快照读"。

**核心三件套**：
1. **隐藏列**：每行有 `trx_id`（最后修改的事务 id）+ `roll_pointer`（指向上个版本的 undo log 链）
2. **undo log 版本链**：每次修改生成新版本，旧版本链在 undo log
3. **ReadView**（读视图）：事务快照时记录活跃事务列表，判断哪个版本可见

**ReadView 判定**：版本事务 id < min_active → 可见；>= max → 不可见；在活跃列表 → 不可见（找更老版本）。

**RC vs RR 区别**：
- **RC**：每次 SELECT 都生成新的 ReadView → 读到最新已提交 → 不可重复读
- **RR**：**事务第一次 SELECT 时生成 ReadView，整个事务复用** → 快照一致 → 可重复读

**当前读**（`SELECT ... FOR UPDATE` / `UPDATE` / `DELETE`）：读最新版本并加锁，靠**行锁 + 间隙锁**防幻读。

## 4.3 锁

**行锁三种**：
| 锁 | 范围 | 作用 |
|---|---|---|
| 记录锁 Record Lock | 单行 | 锁住索引记录 |
| 间隙锁 Gap Lock | 区间（不含边界） | 防插入 → 防幻读（RR 默认开启） |
| 临键锁 Next-Key Lock | 记录 + 前间隙 | 记录锁与间隙锁组合，RR 默认 |

**悲观锁 vs 乐观锁**：
```sql
-- 悲观锁：查询即加锁（适合写多）
SELECT * FROM goods WHERE id = 1 FOR UPDATE;
UPDATE goods SET stock = stock - 1 WHERE id = 1;

-- 乐观锁：版本号/CAS（适合读多写少）
UPDATE goods SET stock = stock - 1, version = version + 1
WHERE id = 1 AND version = 10;    -- 影响行数为 0 说明被改了，重试
```

**死锁**：两个事务互相持有对方需要的锁 → 检测并回滚其中一个。避免：固定加锁顺序、缩小事务范围。

## 4.4 SQL 优化实战

**优化顺序**：
1. 慢查询日志定位：`SET GLOBAL slow_query_log = ON;` + `long_query_time = 1`
2. explain 看执行计划 → type 是不是 ALL / Extra 有没有 filesort
3. 索引优化：补索引、改查询列实现覆盖索引
4. SQL 改写：避免 select *、避免函数、拆大查询
5. 架构级：分页优化、读写分离、缓存前置

**分页深翻页优化**：
```sql
-- 深翻页慢：LIMIT 1000000, 20 要扫 100 万行
-- 优化1：延迟关联（先查 id）
SELECT * FROM t
JOIN (SELECT id FROM t ORDER BY id LIMIT 1000000, 20) tmp
ON t.id = tmp.id;
-- 优化2：游标分页（基于上次最大 id，要求排序稳定）
SELECT * FROM t WHERE id > 1000000 ORDER BY id LIMIT 20;
```

**其他优化点**：
- 表字段：用合适类型（int 而非 varchar）、避免 NULL、加 NOT NULL 默认值
- 索引数量控制：过多索引拖慢写入
- 大表：分区表 / 分库分表（ShardingSphere：水平分片按 id/时间，垂直拆分按业务）

---

# 第 5 章 Redis

## 5.1 数据类型详解

| 类型 | 底层结构 | 场景 |
|---|---|---|
| String | SDS 动态字符串 | 缓存、计数器（incr/decr）、分布式锁、session |
| Hash | 哈希表（ziplist/hashtable） | 对象存储（用户信息，单字段更新） |
| List | 双向链表/压缩列表 | 消息队列（lpush/rpop）、时间线 |
| Set | 哈希表/整数集合 | 去重、共同关注（sinter）、抽奖 |
| ZSet | 跳表 + 哈希表 | 排行榜、延时队列、限流 |

**String 底层为什么用 SDS 不用 C 字符串**：O(1) 获取长度、二进制安全（可存图片/序列化）、预分配减少内存分配。

**ZSet 跳表（skip list）**：多层有序链表，查询 O(logN)，比红黑树实现简单、范围查询友好。**Redis 为什么用跳表不用红黑树**（面试加分）：跳表实现简单、区间遍历高效、支持动态调整层数；红黑树范围遍历要中序遍历复杂度高。

**命令速查**：
```bash
SET name zhangsan EX 60            # 60 秒过期（原子）
INCR counter                       # 自增（计数器）
HSET user:1 name zhangsan age 20   # 对象
LPUSH queue task1 / BRPOP queue 0  # 阻塞队列
SADD tag:a 1 2 / SINTER tag:a tag:b # 交集
ZADD rank 100 a / ZREVRANGE rank 0 9 # 排行榜
```

## 5.2 持久化

| 方式 | 原理 | 优点 | 缺点 |
|---|---|---|---|
| RDB | fork 子进程定时快照 dump.rdb | 恢复快、文件小 | 可能丢最后一次快照后的数据 |
| AOF | 追加写命令日志 | 数据安全（可配 fsync everysec） | 文件大、恢复慢 |

- **RDB 触发**：save 规则（如 900 秒 1 次变更）、shutdown、手动 BGSAVE
- **AOF 重写**：BGREWRITEAOF 压缩日志（合并命令）
- **生产建议**：**混合持久化**（aof-use-rdb-preamble yes）——RDB 快照 + AOF 增量，兼顾恢复速度与数据安全
- 宕机恢复优先级：AOF > RDB

## 5.3 缓存三大问题（必考）

**① 缓存穿透**：查询**不存在的数据**，缓存永远 miss，请求全打到数据库
```
攻击者循环查不存在的 id → DB 压力暴增
```
**解决**：
- 布隆过滤器（BloomFilter）：判断 key 一定不存在 → 拦截
- 空值缓存：查不到也缓存空值（TTL 短，如 5 分钟）
- 参数校验：非法参数直接拒绝

**② 缓存击穿**：**单个热点 key 过期瞬间**，大量请求同时打到 DB
**解决**：
- **互斥锁**：重建缓存时加锁（setnx），只有一个线程查 DB 回填，其他线程等待/返回旧值
- **逻辑过期**：value 里存逻辑过期时间，过期后异步重建，请求先返回旧数据（无锁，体验好）
- 热点 key 永不过期 + 后台定时更新

**③ 缓存雪崩**：**大量 key 同时过期**或 **Redis 宕机**，海量请求直冲 DB
**解决**：
- 过期时间加**随机值**（如 base + random(0~300s)）分散过期
- 集群高可用（主从 + 哨兵）
- 多级缓存（本地缓存 Caffeine + Redis）
- 服务降级：熔断、限流、兜底数据

## 5.4 缓存一致性（Cache Aside）

**标准姿势：先更新数据库，再删除缓存**
```
更新 DB → 删缓存 → 下次读时 miss → 查 DB → 回填缓存
```
**为什么删而不是更新缓存**：并发下更新缓存有"后写覆盖先写"风险，删缓存让读时重建更安全。

**延迟双删**：
```
更新 DB → 删缓存 → sleep(几百ms) → 再删一次缓存
```
（解决"删缓存后、读回填前，又被旧数据更新"的窗口期）

**生产级方案**：**canal 监听 MySQL binlog → 异步删除/更新缓存**（以 binlog 为最终事实，代码里不用管缓存）
**强一致性场景**：不要用缓存，直接查库或用分布式事务。

## 5.5 分布式锁

**为什么不能用 SETNX + EXPIRE 两步**：非原子，SETNX 成功但 EXPIRE 失败 → 锁永不释放 → 死锁。

**正确做法（原子）**：
```bash
SET lock:order:1 uuid NX EX 30
```
- NX：不存在才设置（加锁）
- EX 30：30 秒自动过期（防死锁）
- value 用 uuid：释放时校验是自己（防误删别人的锁）

**释放（Lua 脚本保证原子）**：
```lua
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end
```

**Redisson 看门狗**：锁默认 30s，业务没执行完，看门狗每 10s 自动续期 → 防止业务长于锁时间导致锁提前释放。
**高可用**：Redis 主从切换可能丢锁 → 红锁 RedLock（多节点过半成功，了解即可，有争议）。

**应用场景**：秒杀扣库存、定时任务防重复执行、分布式幂等控制。

## 5.6 集群架构

| 模式 | 组成 | 特点 |
|---|---|---|
| 主从复制 | 1 主 N 从 | 读写分离、故障转移（手动/哨兵） |
| 哨兵 Sentinel | 主从 + 哨兵集群 | 自动故障转移、主从切换监控 |
| Cluster | 多主多从（16384 槽位） | 数据分片、水平扩展、去中心化 |

- **哨兵作用**：监控（心跳）、自动选主、通知客户端；quorum 多数派决策
- **Cluster 槽位**：`CRC16(key) % 16384` 定位槽 → 槽分布在节点；客户端直连任一节点，MOVED 重定向
- **主从复制原理**：全量（RDB 同步 + 缓冲）→ 增量（命令传播），从库只读

---

# 第 6 章 消息队列

## 6.1 RocketMQ 核心架构

```
Producer → NameServer（路由中心）→ Broker（存储，主从）
                ↓
            Consumer（消费组）
```

**核心概念**：Topic（主题）、MessageQueue（分区，顺序单位）、ConsumerGroup（消费组，组内竞争消费）、Offset（消费位点）。

**RocketMQ vs Kafka 选型**：
| 维度 | RocketMQ | Kafka |
|---|---|---|
| 定位 | 业务消息（国内主流） | 大数据日志流 |
| 可靠性 | 事务消息/延迟消息内置 | 依赖配置 |
| 吞吐 | 高 | 更高 |
| 场景 | 订单/支付/业务解耦 | 日志采集/流计算 |

**使用场景**：异步解耦（下单 → 发短信/加积分）、削峰填谷（秒杀）、分布式事务最终一致、日志收集。

## 6.2 三大可靠性问题（必考）

**① 消息不丢失**（三端保证）：
- **生产端**：同步发送 + confirm（Broker 落盘 ack）+ 失败重试
- **Broker**：同步刷盘 + 主从复制（至少一从 ack）
- **消费端**：**手动 ack**，业务处理成功才提交 offset；处理失败重试（重试队列 → 死信队列）

**② 消息不重复消费（幂等）**：MQ 是"至少一次"语义，可能重复投递
- **消费端幂等**：
  - 唯一业务号去重表（insert ignore，冲突即已处理）
  - Redis setnx（处理中标记，成功后删除）
  - 业务天然幂等（如"状态置为已支付"重复执行无害）

**③ 消息顺序**：
- 全局顺序：单 topic 单分区单消费者（吞吐低）
- 局部顺序（主流）：**按业务 key 路由到同一队列**（RocketMQ MessageQueueSelector：同一订单 id → 同一队列），队列内**串行消费**

**死信队列**：消费失败重试 N 次仍失败 → 进死信队列，人工/补偿任务处理。

---

# 第 7 章 微服务

## 7.1 Spring Cloud Alibaba 组件

| 组件 | 角色 | 核心功能 |
|---|---|---|
| Nacos | 注册中心 + 配置中心 | 服务注册发现、配置中心（热更新、分组、命名空间） |
| OpenFeign | 声明式 HTTP 客户端 | `@FeignClient(name="order-service")` 调用远程服务，集成负载均衡 |
| Gateway | API 网关 | 路由转发、过滤器链（统一鉴权、限流、跨域）、Predicate 匹配 |
| Sentinel | 流量治理 | 流控（QPS/线程数）、熔断降级（异常比例）、系统保护 |
| Seata | 分布式事务 | AT/TCC 模式 |

```java
// Feign 调用示例
@FeignClient(name = "user-service", fallback = UserFallback.class)
public interface UserClient {
    @GetMapping("/user/{id}")
    User getUser(@PathVariable Long id);
}
// 服务中注入 UserClient 直接调用远程，像本地方法
```

**Gateway 统一鉴权**：GlobalFilter 校验 JWT → 通过才放行路由。
**Sentinel 限流规则**：按 QPS / 并发线程数 / 热点参数；熔断：慢调用比例、异常比例、异常数。

**为什么需要微服务**：单体痛点（代码膨胀、构建慢、故障隔离差、扩展粒度粗）；代价（网络开销、分布式事务、链路追踪、运维复杂）。

## 7.2 分布式事务

**场景**：下单扣库存（订单服务 + 库存服务跨库/跨服务）。

| 方案 | 原理 | 优缺点 |
|---|---|---|
| 2PC/XA | 准备 → 提交两阶段，全局锁 | 强一致，性能差，MySQL 支持 |
| **TCC** | Try-Confirm-Cancel 三段业务补偿 | 强一致，业务侵入大，适合金融 |
| **Seata AT** | 自动生成 undo 快照，全局事务管理器协调 | 性能好，透明，侵入小（推荐） |
| **本地消息表 + MQ** | 本地事务写消息表 → 投递 MQ → 消费方处理 + 对账 | 最终一致，最常用 |
| Saga | 长事务拆步骤，失败逆向补偿 | 适合长流程 |

**面试回答模板**：互联网业务常用"本地消息表 + MQ 最终一致性"或 Seata AT；强一致场景（金额）用 TCC。

---

# 第 8 章 工程化

## 8.1 Maven

```bash
mvn clean package -DskipTests   # 打包（跳过测试）
mvn install                     # 安装到本地仓库
```
- **坐标**：groupId:artifactId:version（定位依赖）
- **依赖冲突**：mvn dependency:tree 查看；传递依赖排除 `<exclusions>`
- **生命周期**：clean → compile → test → package → install → deploy
- **私服**：Nexus，公司内部依赖分发

## 8.2 Git

```bash
git clone <url>
git checkout -b feature/login    # 建分支
git add . && git commit -m "feat: 登录功能"
git push origin feature/login
git pull --rebase                # 拉取并变基（保持线性历史）
git rebase master                # 变基（vs merge 生成合并节点）
git cherry-pick <commit>         # 挑单个提交
git log --oneline --graph        # 查看历史
```
**merge vs rebase**：merge 保留分支历史（有合并节点）；rebase 线性化历史（改写提交，禁止在公共分支 rebase）。
**分支模型**：Git Flow（master/develop/feature/release/hotfix）；主干开发（GitHub Flow，小步快发）。

## 8.3 Docker

```dockerfile
# 后端镜像示例
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
docker build -t myapp:1.0 .          # 构建
docker run -d -p 8080:8080 myapp:1.0 # 运行
docker-compose up -d                 # 编排（本地起 MySQL+Redis+应用）
```
**Dockerfile 多阶段构建**（减小镜像）：build 阶段用 maven 镜像，运行阶段只拷贝 jar。
**compose 本地开发必备**：
```yaml
services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
    ports: ["3306:3306"]
  redis:
    image: redis:7
    ports: ["6379:6379"]
```

## 8.4 CI/CD

**CI（持续集成）**：代码提交 → 自动构建 + 测试 → 反馈
**CD（持续交付/部署）**：通过测试 → 自动部署到环境

**GitHub Actions 流水线**：
```yaml
name: CI
on:
  push:
    branches: [master]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { java-version: '17' }
      - run: mvn clean package
      - uses: actions/upload-artifact@v4
        with: { name: jar, path: target/*.jar }
```
**K8s（了解）**：Pod（最小调度单位）、Deployment（副本管理）、Service（暴露服务）、Ingress（入口路由）、ConfigMap/Secret（配置）。

---

# 附：Java 全栈学习检查清单

- [ ] 能徒手讲清 HashMap 结构/扩容/线程安全问题，并手写 put 流程
- [ ] 能讲清线程池七大参数 + 执行流程 + 拒绝策略，并手写配置
- [ ] 能讲清 Bean 生命周期、循环依赖三级缓存、@Transactional 失效场景
- [ ] 能讲清 Spring Boot 自动装配原理（imports + 条件注解）
- [ ] 能讲清 B+ 树、回表/覆盖索引、索引失效场景、MVCC、缓存三兄弟
- [ ] 能独立完成：Spring Boot + MyBatis-Plus + Redis + JWT 的管理系统项目
- [ ] 能独立完成：Docker 部署 + GitHub Actions CI

*学完本章节 + 完成项目，即具备 Java 全栈开发能力。下一份：《AI 全栈知识点详解》。*

---

# 第二部分：进阶篇（高级开发深度）

> 本部分为进阶内容，建议完成第一部分「基础篇」后再学习。


# 第 9 章 Java 核心与集合进阶

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

# 第 10 章 并发编程进阶（源码级）

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

# 第 11 章 JVM 进阶

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

# 第 12 章 Spring 进阶

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

# 第 13 章 MySQL 进阶

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

# 第 14 章 Redis 进阶

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

# 第 15 章 微服务与架构进阶

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

# 第 16 章 生产级工程实践

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
