# Java 全栈知识点详解

> **用途**：本手册是 Java 全栈的详细知识点教程，按章节顺序学习即可，每个知识点包含「原理讲解 + 代码示例 + 易错点」。
> **配套**：学完用《Java全栈+AI全栈面试手册》自测；达到高级深度后读《Java全栈进阶详解》（源码级原理/生产实践）。
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
