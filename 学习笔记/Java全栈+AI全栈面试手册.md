# Java 全栈 + AI 全栈 面试手册

> **使用方式**：先盖住答案自答，答不出/答不全的做标记，回头补《学习笔记》对应章节。
> **标注**：⭐ = 必背高频题；🎯 = 深度加分题（能答好直接拉开差距）。

---

## 1. Java 基础与并发（⭐ 面试命门）

### 1.1 HashMap 的原理？线程安全吗？⭐
- 底层：**数组 + 链表 + 红黑树**（链表长度 ≥8 且数组 ≥64 转红黑树）
- put 流程：hash(key) 扰动 → 定位桶 → 头/尾插 → 冲突链化 → 超阈值（0.75×容量）扩容
- 扩容：**1.5 倍**，重哈希
- 线程不安全：JDK7 头插法扩容可能死循环；JDK8 尾插法会丢数据/覆盖
- 安全替代：`ConcurrentHashMap`（CAS + synchronized 锁桶）、`Hashtable`（全表锁，不推荐）

### 1.2 ConcurrentHashMap 如何保证线程安全？⭐
- JDK8：**CAS（空桶） + synchronized（非空桶锁头节点）**，锁粒度从分段降到桶
- size() 用 baseCount + CounterCell 累加，并发度高时无锁求和

### 1.3 volatile 和 synchronized 的区别？⭐
- volatile：**可见性 + 禁止指令重排**，不保证原子性，无锁
- synchronized：互斥 + 可见性 + 原子性，有锁开销
- 典型场景：volatile 修饰状态标志位、单例双重检查锁（DCL）中的实例引用

### 1.4 线程池的核心参数？为什么不用 Executors 创建？⭐
- 七大参数：corePoolSize、maximumPoolSize、keepAliveTime、workQueue、threadFactory、**拒绝策略（AbortPolicy 默认/CallerRunsPolicy/DiscardPolicy/DiscardOldestPolicy）**
- 执行流程：核心线程 → 队列 → 非核心线程 → 拒绝
- Executors 的坑：FixedThreadPool 用**无界队列**（LinkedBlockingQueue）→ 任务积压 OOM；CachedThreadPool 最大线程数 Integer.MAX_VALUE → 线程过多 OOM
- 正确姿势：`ThreadPoolExecutor` 手动传参，队列有界 + 自定义拒绝策略 + 监控

### 1.5 ThreadLocal 原理和内存泄漏？🎯
- 原理：每个 Thread 持有 ThreadLocalMap，key 是 ThreadLocal（**弱引用**），value 是强引用
- 泄漏：key 被回收后 value 无法访问 → **务必在 finally 中 remove()**；线程池复用线程更要 remove
- 应用：请求上下文、SimpleDateFormat 线程安全、Spring 事务上下文

### 1.6 单例模式的双重检查锁为什么加 volatile？🎯
- 防止**指令重排**：`instance = new Singleton()` 分三步（分配内存/初始化/赋值），重排后可能返回未初始化对象
- volatile 禁止重排 + 保证可见性

### 1.7 synchronized 与 Lock 的区别？⭐
- 后者：可中断、可超时、**可尝试获取（tryLock）**、公平锁、多个条件（Condition 精准唤醒）
- 性能上现代 JDK 两者差距不大，synchronized 有锁升级（偏向锁→轻量级→重量级）

### 1.8 什么是 CAS？有什么问题？🎯
- Compare And Swap 无锁原子操作，ABA 问题（版本号解决）、自旋 CPU 开销（LongAdder 分段累加缓解）

---

## 2. JVM

### 2.1 JVM 内存区域？⭐
- 线程私有：虚拟机栈、本地方法栈、程序计数器
- 线程共享：堆（对象实例，GC 主战场）、方法区（元空间 Metaspace，存类元信息/常量池）
- JDK8 永久代 → 元空间（本地内存），String 常量池移到堆

### 2.2 垃圾回收算法和收集器？⭐
- 算法：标记-清除（碎片）、复制（新生代）、标记-整理（老年代）
- 分代：新生代 Eden:S0:S1 = 8:1:1，对象年龄达 15 晋升老年代
- 收集器：CMS（并发标记清除，产生碎片）、**G1（Region 分块 + 可预测停顿，JDK9+ 默认）**、ZGC（超低延迟）
- 判定垃圾：可达性分析，GC Roots（栈引用、静态变量、常量、JNI）

### 2.3 双亲委派机制？为什么？🎯
- 加载顺序：应用类加载器 → 扩展 → 启动类加载器，父加载不了才自己加载
- 好处：防止核心类被篡改（String 必须由 Bootstrap 加载）、避免重复加载
- 打破场景：Tomcat（隔离 webapp）、JDBC SPI（Thread.contextClassLoader）

### 2.4 线上 OOM 怎么排查？🎯
- `jps` 找进程 → `jmap -dump` 导出堆 → MAT 分析大对象/泄漏链；`jstat` 看 GC 频率；GC 日志加 `-Xlog:gc*`

---

## 3. Spring / Spring Boot

### 3.1 Bean 的生命周期？⭐
- 实例化 → 属性填充 → Aware 接口（BeanName/BeanFactory）→ BeanPostProcessor（before）→ init 方法（@PostConstruct/InitializingBean）→ BeanPostProcessor（after，AOP 代理在此）→ 使用 → destroy
- 面试答出"BeanPostProcessor 后置处理 + AOP 代理生成时机"即算优秀

### 3.2 Spring 如何解决循环依赖？🎯
- **三级缓存**：singletonObjects（成品）→ earlySingletonObjects（半成品）→ singletonFactories（工厂）
- 流程：A 创建时提前暴露"半成品引用"→ B 依赖 A 从三级缓存拿到引用完成创建 → A 完成注入
- **只解决单例 + setter/字段注入的循环依赖**；构造器注入和 prototype 无法解决（后者直接报错）

### 3.3 @Transactional 什么时候会失效？⭐
1. 非 public 方法
2. 同类内部自调用（this 调用，没走代理）→ 注入自身或拆类
3. try-catch 吞掉异常（默认只回滚 RuntimeException/Error，需 rollbackFor = Exception.class）
4. 数据库引擎不支持事务（MyISAM）
5. 多线程中事务不传递

### 3.4 Spring Boot 自动装配原理？⭐
- `@SpringBootApplication` 三合一：@Configuration + @ComponentScan + **@EnableAutoConfiguration**
- 后者通过 `AutoConfiguration.imports` 加载各 Starter 的自动配置类，**@ConditionalOnClass/@ConditionalOnMissingBean** 条件装配
- 面试加分：能讲"条件装配"四个字 + 举一个例子（如 DataSource 不存在时 RedisAutoConfiguration 不生效）

### 3.5 AOP 动态代理：JDK 和 CGLIB 区别？🎯
- JDK：基于接口，InvocationHandler，被代理类必须有接口
- CGLIB：基于继承，生成子类，不能代理 final 类/方法
- Spring 默认：有接口用 JDK，无接口用 CGLIB（SpringBoot 2.x 后强制 CGLIB）

### 3.6 @Autowired 与 @Resource 区别？⭐
- @Autowired：按**类型**注入（Spring 注解），配合 @Qualifier 按名
- @Resource：按**名称**优先，再按类型（JSR-250），Java 原生

### 3.7 接口幂等性怎么做？🎯
- 唯一索引 / 数据库去重表、Redis setnx 分布式锁、状态机校验、token 预生成（前端提交 token）

---

## 4. MySQL

### 4.1 为什么用 B+ 树做索引？⭐
- 矮胖 → 磁盘 IO 次数少（3 层树千万级数据）；叶子节点有序链表 → 范围查询高效；非叶子只存 key → 单节点扇出大
- 对比：B 树（数据分散，范围查询要回溯）、红黑树（太高）、Hash（不支持范围）

### 4.2 聚簇索引、回表、覆盖索引？⭐
- 聚簇索引：主键索引，叶子存整行数据（InnoDB 必须有，无主键用隐藏 rowid）
- 二级索引：叶子存主键值，查非索引列需**回表**
- 覆盖索引：查询列都在索引里 → 免回表（如 `SELECT id, name FROM t WHERE name=...` 建 (name,id) 联合索引）

### 4.3 哪些情况索引会失效？⭐
- 违反最左前缀、对索引列用函数/运算、隐式类型转换（字符串列查数字）、`LIKE '%xx'`、`OR` 连接非索引列、`IS NULL`/`IS NOT NULL`（部分）、`!=`/`<>`
- 判断标准：explain 看 type（system>const>eq_ref>ref>range>index>ALL）

### 4.4 事务隔离级别与 MVCC？🎯
- 4 级：读未提交（脏读）、读已提交（不可重复读）、**可重复读（MySQL 默认，靠 MVCC + 间隙锁解决大部分幻读）**、串行化
- MVCC：undo log 版本链 + ReadView（当前活跃事务列表）；RC 每语句生成 ReadView，RR 事务开始生成一次 → 可重复读

### 4.5 乐观锁和悲观锁？⭐
- 乐观锁：版本号/CAS，适合读多写少（如库存更新 `UPDATE ... SET stock=stock-1 WHERE id=? AND stock>=?`）
- 悲观锁：`SELECT ... FOR UPDATE`，适合写多

### 4.6 慢 SQL 优化思路？⭐
- 慢日志定位 → explain 看执行计划 → 补索引/改 SQL（避免 select *、覆盖索引）→ 数据量过大分页/归档/分库分表

---

## 5. Redis

### 5.1 五种数据类型及场景？⭐
- String：缓存、计数器（incr）、分布式锁
- Hash：对象/用户信息存储（省内存、可单独字段更新）
- List：消息队列（lpush+rpop）、最新列表
- Set：去重、点赞、共同好友（sinter）
- ZSet：排行榜、延时队列（score 存时间戳）、限流

### 5.2 缓存穿透、击穿、雪崩及解决方案？⭐（必考）
- **穿透**：查不存在的数据，请求打到 DB → 空值缓存 / 布隆过滤器 / 参数校验
- **击穿**：单个热点 key 过期瞬间高并发打到 DB → 互斥锁（setnx）/ 逻辑过期 / 永不过期 + 后台更新
- **雪崩**：大量 key 同时过期或 Redis 宕机 → 过期时间加随机值 / 多级缓存 / 集群高可用

### 5.3 缓存和数据库一致性？🎯
- Cache Aside：先更新 DB 再**删**缓存（延迟双删：删→等→再删）
- 为什么删不更新：更新有并发写覆盖风险；删除后读时再回填
- 生产级：**canal 订阅 binlog 异步删缓存**（binlog 为最终依据）
- 强一致性场景别用缓存

### 5.4 Redis 分布式锁的正确实现？⭐
- 原生坑：`SETNX` 与 `EXPIRE` 分开非原子 → 用 `SET key val NX EX 30`
- **Redisson 看门狗**：默认 30s，业务没执行完自动续期；释放用 **Lua 脚本**（判断 value 一致才删，防误删他人锁）
- 高可用场景：RedLock（多节点）——了解即可，有争议

### 5.5 持久化 RDB 和 AOF？🎯
- RDB：fork 子进程快照，恢复快、可能丢最后一次数据
- AOF：追加日志，fsync 策略，数据更安全、文件大（重写机制）
- 生产：**混合持久化**（RDB 快照 + AOF 增量）

---

## 6. 消息队列（RocketMQ / Kafka）

### 6.1 MQ 的作用？⭐
- 异步解耦（订单→通知/积分）、削峰填谷（秒杀）、最终一致性（本地消息表 + MQ）

### 6.2 如何保证消息不丢失？🎯
- 生产端：confirm/ack 确认 + 重试；Broker：同步刷盘 + 多副本；消费端：手动 ack，业务成功才提交

### 6.3 如何保证消息不重复消费（幂等）？⭐
- 消费端幂等：唯一业务号去重表 / Redis setnx / 状态机幂等；天然幂等操作（如"置为已读"）

### 6.4 如何保证消息顺序？🎯
- 全局顺序：单 topic 单分区单消费者（牺牲吞吐）
- 分区顺序：**按业务 key（如订单 id）哈希路由到同一分区**，分区内顺序消费（RocketMQ MessageQueueSelector）

---

## 7. 微服务与系统设计

### 7.1 微服务拆分原则？🎯
- 按业务域（DDD 限界上下文）、按变更频率、按团队边界；避免过度拆分（分布式事务成本）
- 拆分后配套：注册中心、网关、熔断、链路追踪、配置中心

### 7.2 分布式事务方案？🎯
- 2PC/XA（强一致，性能差）、**TCC**（Try-Confirm-Cancel，业务侵入大）、**Seata AT**（自动补偿）、**本地消息表 + MQ 最终一致**、Saga
- 面试答：金融用 TCC/AT，互联网常见用最终一致性

### 7.3 接口设计：如何设计一个高可用接口？🎯
- 幂等（唯一键）、限流（令牌桶/漏桶）、超时与重试（指数退避）、熔断降级（Sentinel/Resilience4j）、缓存兜底、异步化、监控告警

---

## 8. Python / FastAPI

### 8.1 FastAPI 为什么快？与 Django/Flask 区别？⭐
- **Starlette（异步 ASGI）+ Pydantic（数据校验）**；自动生成 OpenAPI 文档；类型标注驱动
- Django 全家桶重、同步为主；Flask 轻量同步；FastAPI 异步高性能 + 现代类型系统

### 8.2 Python GIL 是什么？影响？🎯
- 全局解释器锁：同一时刻仅一个线程执行字节码 → 多线程吃不满多核
- 解法：多进程（multiprocessing）、协程（asyncio，IO 密集最优）、C 扩展释放 GIL
- 面试点：**计算密集用多进程，IO 密集用协程/多线程**

### 8.3 装饰器原理和用法？⭐
- 函数作为参数包装，`functools.wraps` 保留原函数元信息；应用：日志、鉴权、重试、缓存

---

## 9. LLM 与 Prompt 工程（AI 岗核心）

### 9.1 大模型的幻觉是什么？怎么缓解？⭐
- 表现：一本正经胡说；原因：训练目标（预测下一个 token）非事实检索
- 缓解：**RAG（检索事实）**、限定"不知道就说不知道"、few-shot 示例、低 temperature、引用来源

### 9.2 Prompt 工程的核心技巧？⭐
- 角色设定（system）、任务拆解（分步指令）、few-shot 示例、**结构化输出（JSON schema）**、约束（长度/格式/语气）、思维链（CoT "请一步步思考"）
- 调试方法：单变量测试、构建测试集回归

### 9.3 temperature / top_p / max_tokens 的作用？🎯
- temperature：随机性（0 稳定事实问答，高值创意生成）
- top_p：核采样（累积概率截断）；max_tokens：输出上限
- 面试加分：事实型任务用低温度 + RAG，创意型任务用高温度

### 9.4 什么是 Token？如何估算成本？🎯
- Token：文本切分的最小单元（中文约 1 字≈1~2 token）；成本 = 输入 tokens × 输入单价 + 输出 tokens × 输出单价
- 优化：精简 system 提示、RAG 只塞 TopK 相关片段、结果缓存（语义缓存）、模型分级路由

### 9.5 什么是 Prompt 注入？如何防御？🎯
- 用户输入覆盖系统指令 → 防御：输入输出过滤、system 指令强化、隔离工具权限（Function Calling 白名单 + 敏感操作二次确认）

---

## 10. RAG 与向量数据库（AI 岗核心）

### 10.1 什么是 RAG？完整流程？为什么需要？⭐
- 检索增强生成：**切分文档 → Embedding 向量化 → 向量库存储 → 检索 TopK → 拼入 prompt → 生成**
- 解决：幻觉、知识时效性、私有数据、成本（不用全量微调）
- 对比微调：RAG 适合"知识型"更新快；微调适合"风格/格式"固定、训练数据足

### 10.2 Embedding 是什么？怎么选模型？🎯
- 文本 → 高维向量，语义相近向量距离近；余弦相似度衡量
- 选型：中文场景 bge-m3、m3e；维度/成本/效果权衡；离线批量向量化 + 在线 query 向量化

### 10.3 如何提升 RAG 检索质量？🎯（深度加分）
- **切分**：按语义结构切（标题/段落）、chunk 大小与 overlap 调优
- **混合检索**：BM25 关键词 + 向量语义，**RRF（倒数排名融合）**
- **重排序 Rerank**：交叉编码器精排 TopK
- **查询改写**：多轮对话改写、查询扩展；**HyDE**（先让模型生成假设答案再检索）
- **评估**：召回率、命中率，构建评测集持续回归

### 10.4 向量数据库和传统数据库区别？选型？🎯
- 向量库擅长 ANN 近似最近邻检索（HNSW/IVF 索引），传统库要全表扫描
- 选型：小项目 pgvector/Chroma（快）；生产 Milvus（分布式、过滤 + 向量混合查询、GPU）；ES 也可兼做向量检索（+8 语义检索）

### 10.5 多轮对话中 RAG 怎么处理？🎯
- 先做**查询改写**（结合历史生成独立 query）再检索；上下文窗口管理（滑动窗口/摘要压缩）

---

## 11. Agent

### 11.1 什么是 Agent？和普通 LLM 应用区别？⭐
- Agent = LLM + **工具调用 + 规划 + 记忆**，能自主多步完成任务（决策循环）
- 普通应用：一次问答；Agent：感知 → 规划 → 行动（调工具）→ 观察 → 再规划

### 11.2 Function Calling 原理？⭐
- 1）定义工具 JSON Schema → 2）模型输出结构化调用意图（函数名+参数）→ 3）代码执行 → 4）结果回填模型 → 5）生成最终回答
- 关键：模型不执行代码，只"决定调哪个、传什么"

### 11.3 ReAct 是什么？🎯
- Reason + Act 循环：思考当前状态 → 决定行动 → 执行工具 → 观察结果 → 重复，直到完成
- 优点：可解释（推理过程可见）、可控（可加约束）

### 11.4 Agent 的常见问题与工程化？🎯
- 循环失控（最大步数限制）、幻觉工具参数（Schema 约束 + 校验）、上下文爆炸（记忆压缩/摘要）、工具失败重试、**成本失控（预算上限）**、并发安全（工具幂等）

---

## 12. 混合架构与系统设计（双修者的压轴题）

### 12.1 Java 系统如何集成 AI 能力？主流方案？⭐（你的主场）
- 方案一：Java 直接调模型 API（HTTP SDK）——简单，但 Prompt/RAG 逻辑写在 Java 里，生态弱
- 方案二：**Java 业务系统 → Python AI 服务（FastAPI）**——AI 逻辑下沉 Python 生态，Java 保持业务纯净，**推荐**
- 方案三：AI 平台（Dify/Coze 等低代码）——快速验证，定制性差
- 面试讲方案二 + 网关鉴权 + 限流 + 成本统计，就是你的差异化

### 12.2 混合架构的治理：鉴权、限流、成本控制怎么设计？🎯
- **鉴权**：统一网关，JWT/OAuth 透传，Python 侧校验 + IP 白名单（内网）
- **限流**：Redis 令牌桶（接口级/用户级），Sentinel 规则可下发热更新
- **成本**：Token 用量中间件统计（每请求入库）、每日预算熔断、模型分级路由（简单问题小模型/缓存命中）、异步队列削峰

### 12.3 设计一个企业知识库问答系统（高频系统设计题）⭐
- **数据侧**：文档上传 → 格式解析（PDF/Word）→ 清洗 → 切分（保留标题层级）→ Embedding → 向量库 + 元数据（来源/权限）
- **检索侧**：query 改写 → 混合检索 → Rerank → TopK
- **生成侧**：prompt 组装（引用来源）→ 流式输出 → 引用标注
- **权限**：文档级权限过滤（检索时按用户权限过滤元数据）
- **治理**：更新（增量/全量）、评估集、成本监控、缓存
- 加分：权限隔离、评估体系、多租户

---

## 附：面试通用策略

1. **自我介绍 30 秒亮点**：前端高级（体验/工程化）+ Java 全栈（业务系统）+ AI 全栈（RAG/Agent），一人打通混合架构
2. **项目讲法 STAR**：背景 → 我的职责（突出"独立打通 Java × Python AI"）→ 技术难点（成本控制、权限、检索质量）→ 结果数据
3. **不会的题**：诚实说不会，但补一句"我的理解是……您看我理解对么"（展示学习能力）
4. **反问环节**：问团队 AI 技术栈、Java 与 AI 协作方式（展示你的双栈价值）
5. **投递方向**：AI 应用开发、Java 全栈 + AI 转型岗、传统企业 AI 化改造团队——你的混合架构背景在这些岗命中率最高

---

*配套文档：《Java 全栈 + AI 全栈 双修学习笔记》——先系统学习，再用本手册自测查漏。*
