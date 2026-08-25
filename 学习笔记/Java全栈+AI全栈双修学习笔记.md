# Java 全栈 + AI 全栈 双修学习笔记

> **目标**：学完本手册，具备传统 Java 全栈 + AI 全栈的完整开发能力。
> **定位**：前端（React/Vue + TS）已有基础，本手册聚焦后端双栈补齐。
> **总时长**：业余 6~9 个月（全职 3~4 个月），三个阶段**串行**推进，禁止两条线并行。
> **核心策略**：项目驱动，每个阶段结束必须有一个能上线的项目，再进入下一阶段。

---

## 0. 学习总览

```
┌─────────────────────────────────────────────────────┐
│ 前端层（已有）：React/Vue + TS · Next.js · 流式渲染      │
├──────────────┬──────────────────────────────────────┤
│ 传统全栈 Java │  AI 全栈 Python                       │
│ (基本盘 3-4月) │  (竞争力 2-3月)                       │
├──────────────┴──────────────────────────────────────┤
│ 融合层：Java 业务系统 × Python AI 服务（杀手锏 1-2月）      │
└─────────────────────────────────────────────────────┘
```

| 阶段 | 内容 | 时间 | 产出项目 |
|---|---|---|---|
| A | Java 全栈 | 3~4 个月 | 管理系统（Spring Boot + MySQL + Redis） |
| B | AI 全栈 | 2~3 个月 | AI 对话 + RAG 知识库 + Agent |
| C | 融合层 | 1~2 个月 | Java 系统嵌入 AI 问答（混合架构） |

---

## 1. 第一阶段：Java 全栈（基本盘）

> 目标：能独立用 Java 生态开发企业级 Web 系统。这是求职基本盘，投入时间最多。

### 1.1 Java SE 核心（2~3 周）

**掌握标准**：能不看文档写一个多线程任务处理程序；能讲清集合选型差异。

- **语法基础**：面向对象（封装/继承/多态）、接口与抽象类区别、异常体系（checked/unchecked）、泛型（类型擦除、通配符 `? extends/super`）
- **集合框架（面试高频）**：
  - `ArrayList` vs `LinkedList`：数组 vs 链表，随机访问 vs 插入删除
  - `HashMap` 原理：**数组 + 链表 + 红黑树**，扩容机制（默认 0.75 负载因子、1.5 倍扩容）、线程不安全原因（JDK7 头插法死循环 / JDK8 尾插法）
  - `ConcurrentHashMap`：**CAS + synchronized + 分段锁演进**，JDK8 锁粒度降到桶
  - `HashSet` 底层就是 `HashMap`
- **并发编程（重中之重）**：
  - 线程创建：`Thread` / `Runnable` / `Callable+FutureTask` / 线程池
  - `synchronized` 与 `Lock` 区别；`volatile` 的可见性与禁止重排（不能保证原子性）
  - **线程池**：`ThreadPoolExecutor` 七大参数（corePoolSize、maximumPoolSize、keepAliveTime、workQueue、threadFactory、handler）、四种拒绝策略、为什么不用 `Executors`（无界队列 OOM 风险）
  - JUC 工具：`CountDownLatch` / `CyclicBarrier` / `Semaphore`、`AtomicInteger`（CAS）
  - `ThreadLocal`：原理（Thread 内部 ThreadLocalMap）、内存泄漏（key 弱引用，value 强引用 → 记得 remove）
- **IO 模型**：BIO/NIO/AIO 区别，了解 Netty 的 Reactor 模型（能说概念即可）

**实践**：用线程池实现一个"模拟并发下单扣库存"的小程序，体会线程安全。

### 1.2 JVM 基础（1 周，到"能聊"程度）

- **内存区域**：堆、虚拟机栈、本地方法栈、方法区（元空间）、程序计数器
- **对象创建过程**：类加载检查 → 分配内存（指针碰撞/空闲列表）→ 初始化零值 → 设置对象头 → init
- **GC**：可达性分析、四大引用（强/软/弱/虚）、GC Roots 有哪些
- **垃圾收集器**：Serial、Parallel、CMS、G1（会对比 CMS vs G1 即可）；分代：新生代（Eden + 2 个 Survivor，比例 8:1:1）、老年代
- **类加载**：双亲委派机制（为什么：防止核心类被篡改）、打破双亲委派的场景（Tomcat、SPI）
- **调优**：`-Xms/-Xmx`、`jstat` 查看 GC 频率、OOM 排查思路（先 dump 再 MAT 分析）

### 1.3 Spring Boot 与 Spring 生态（3~4 周）

**掌握标准**：能独立搭建一个带认证、拦截、日志、配置管理的完整服务。

- **Spring 核心**：
  - IoC/DI 原理：BeanFactory vs ApplicationContext、Bean 生命周期（实例化 → 属性填充 → Aware → BeanPostProcessor → init → 使用 → destroy）、**循环依赖三级缓存**（singletonObjects / earlySingletonObjects / singletonFactories）
  - AOP：动态代理（JDK 代理 vs CGLIB）、切点/通知/切面、`@Transactional` 失效场景（重点）
  - `@Autowired` vs `@Resource` 区别
- **Spring Boot**：
  - 自动装配原理：`@SpringBootApplication` = `@Configuration + @ComponentScan + @EnableAutoConfiguration`，`spring.factories` / `AutoConfiguration.imports`
  - 常用注解：`@RestController`、`@RequestMapping` 系列、`@RequestBody`、`@Validated` 参数校验、全局异常处理 `@RestControllerAdvice`
  - 配置：`application.yml`、`@ConfigurationProperties`、多环境 profile、`@Value`
  - 日志：SLF4J + Logback，日志分级
- **持久层**：
  - **MyBatis-Plus**：CRUD、条件构造器（`LambdaQueryWrapper`）、分页插件、代码生成器
  - **手写 SQL**：多表 join、子查询、`#{}` 与 `${}` 区别（防 SQL 注入）
  - 事务：`@Transactional`（传播行为 propagation、隔离级别 isolation、**自调用失效**、try-catch 吞异常失效）
- **安全**：Spring Security + JWT（认证流程：过滤器链 → 认证 → 生成 token → 拦截器校验）；RBAC 权限模型（用户-角色-权限）

**阶段项目 A1**：后台管理系统 —— 用户管理 + 角色权限 + CRUD + Redis 缓存 + JWT 登录。这是你的第一个完整 Java 项目。

### 1.4 MySQL 数据库（2~3 周）

**掌握标准**：能定位慢 SQL 并优化；能讲清事务与锁。

- **索引**：
  - B+ 树为什么适合（矮胖、范围查询、叶子链表）；聚簇索引 vs 二级索引、**回表**、索引覆盖
  - 最左前缀原则、索引失效场景（函数、隐式类型转换、`LIKE '%xx'`、`OR` 等）
  - 联合索引设计；explain 查看执行计划（type、key、rows、Extra）
- **事务**：ACID、隔离级别（读未提交/读已提交/**可重复读（默认）**/串行化）、**MVCC**（undo log + ReadView）、幻读问题及解决（间隙锁）
- **锁**：行锁（记录锁/间隙锁/临键锁）、表锁、乐观锁（版本号/CAS）vs 悲观锁
- **优化**：慢查询日志定位、分页优化（延迟关联）、避免 select *、批量插入
- **高可用（了解）**：主从复制（binlog）、读写分离、分库分表概念（ShardingSphere）

### 1.5 Redis（2 周）

- **数据类型**：String（缓存/计数器）、Hash（对象存储）、List（队列/消息）、Set（去重/抽奖）、ZSet（排行榜/延时队列）——每个要知道**应用场景**
- **持久化**：RDB（快照）vs AOF（日志），混合持久化，如何选
- **缓存问题三兄弟**：**缓存穿透**（查不存在的数据 → 布隆过滤器/空值缓存）、**缓存击穿**（热点 key 过期 → 互斥锁/逻辑过期）、**缓存雪崩**（大量 key 同时过期 → 随机过期时间）
- **一致性**：先更新数据库再删缓存（Cache Aside）；延时双删；canal 订阅 binlog 异步删缓存
- **分布式锁**：`SETNX + EXPIRE` 的原子性坑 → **Redisson 看门狗**原理；锁的续期与释放（Lua 脚本）
- **集群**：主从、哨兵、Cluster 槽位

### 1.6 消息队列与 Elasticsearch（1~2 周）

- **MQ 选型**：RocketMQ vs Kafka（国内业务系统 RocketMQ 更主流）；使用场景：异步解耦、削峰填谷、最终一致性
- **核心概念**：Producer/Consumer/Broker、Topic/Partition/Consumer Group；**消息可靠性**（生产端 confirm、Broker 持久化、消费端手动 ack）；**幂等消费**（业务去重表）；消息顺序（单分区 + 顺序消费）；死信队列
- **ES（了解）**：倒排索引原理、分词器、文档/索引/分片概念；与 MySQL 配合做搜索的架构

### 1.7 Spring Cloud 微服务（2~3 周，视目标而定）

- 为什么要微服务（单体痛点）vs 代价（分布式事务、链路追踪）
- **Spring Cloud Alibaba 全家桶**：
  - **Nacos**：注册中心 + 配置中心（服务注册发现、配置热更新）
  - **OpenFeign**：声明式 HTTP 调用、负载均衡（Ribbon/Spring Cloud LoadBalancer）
  - **Gateway**：路由、过滤器（统一鉴权/限流）
  - **Sentinel**：流量控制、熔断降级
- **分布式事务（了解）**：Seata 的 AT 模式；本地消息表 + MQ 最终一致性
- 链路追踪：SkyWalking / Zipkin 概念

### 1.8 工程化（贯穿全程）

- **Maven**：坐标、依赖管理、生命周期（clean/compile/package/install）、私服概念
- **Git**：分支模型（Git Flow / 主干开发）、rebase vs merge、冲突解决、cherry-pick
- **Docker**：镜像/容器、Dockerfile 编写、docker-compose 编排（本地起 MySQL/Redis 必备）
- **K8s（了解）**：Pod/Deployment/Service/Ingress 概念
- **CI/CD**：GitHub Actions / Jenkins 流水线：代码提交 → 构建 → 测试 → 部署

### 1.9 阶段 A 验收标准

- [ ] 管理系统上线：JWT 登录 + RBAC 权限 + CRUD + Redis 缓存
- [ ] 能讲清 HashMap、线程池、Spring Bean 生命周期、MySQL 索引、Redis 缓存三兄弟
- [ ] 数据库表设计规范，慢 SQL 优化过一版

---

## 2. 第二阶段：AI 全栈（增量竞争力）

> 目标：能独立开发"调用大模型能力"的 AI 应用。注意：不做模型训练，做应用。

### 2.1 Python 与 FastAPI（1~2 周）

- **语法差异速过**：列表/字典推导式、`*args/**kwargs`、装饰器、`typing` 类型标注、`async/await`（与 JS 相似，你上手快）
- **环境**：venv 虚拟环境、pip、conda（可选）
- **FastAPI**：
  - 路由、`Pydantic` 请求体校验、依赖注入（Depends）、中间件
  - 异步接口（`async def`）、`BackgroundTasks`
  - 自动生成 Swagger 文档（`/docs`）
- **与前端对接**：CORS 配置、统一响应格式、异常处理

**实践**：把 1.3 阶段的管理系统 API 用 FastAPI 重写一个简化版（不用写全，写 2-3 个接口体验异步）。

### 2.2 LLM API 与 Prompt 工程（2 周）

- **模型 API 调用**：OpenAI / DeepSeek / 通义千问 任选一家，学会：
  - `messages` 结构（system / user / assistant 角色）
  - 参数：`temperature`（创造力）、`max_tokens`、`top_p`
  - **流式输出（SSE）**：`stream=True`，逐 token 返回（AI 应用体验核心）
  - 结构化输出：JSON mode / Function Calling
- **Prompt 工程三件套**：
  1. **角色设定**：`system` 里定义身份、职责、约束
  2. **few-shot**：给 2-3 个输入输出示例
  3. **结构化输出**：要求 JSON 并给出 schema
- **进阶技巧**：思维链（CoT）、分步拆解、限定输出长度、防止 prompt 注入

**实践项目 B1**：Next.js + Vercel AI SDK（或直接 fetch SSE）做一个**流式对话应用**——这是你的主场，前端体验做到位。

### 2.3 RAG 与向量数据库（2~3 周）

- **概念**：为什么需要 RAG（幻觉、知识时效、私有数据）；RAG 四步：**切分 → 向量化 → 检索 → 生成**
- **Embedding**：文本 → 向量；相似度计算（余弦相似度）；Embedding 模型选择（开源 bge-m3 等）
- **切分策略**：chunk size / overlap；按标题结构切分（Markdown 文档树）；语义切分
- **向量数据库**：
  - 入门：**Chroma / pgvector**（轻量易上手）
  - 生产：**Milvus**（分布式、GPU 加速）
  - 概念：向量索引（HNSW）、TopK 检索
- **检索增强**：混合检索（关键词 BM25 + 向量，RRF 融合）、**重排序（Rerank）**、查询改写
- **完整链路代码骨架**（LangChain / LlamaIndex 或手写）：

```python
# 最小 RAG 链路（伪代码）
docs = load_and_split(file)                    # 1 切分
vectors = embed_model.encode(docs)             # 2 向量化
vector_db.insert(vectors)                      # 3 入库
hits = vector_db.search(query, top_k=5)        # 4 检索
answer = llm.chat(system + context(hits) + query)  # 5 生成
```

**实践项目 B2**：**文档问答机器人**——上传 PDF → 基于内容回答（面试必问项目）。进阶：加混合检索 + 重排序。

### 2.4 Agent 与 LangChain（3 周）

- **Function Calling 原理**（先手动实现再上框架）：
  1. 定义工具函数 + JSON Schema 描述
  2. 模型返回结构化调用请求（函数名 + 参数）
  3. 代码执行函数，结果回填给模型
  4. 模型基于结果生成最终回答
- **ReAct 模式**：思考（Reason）→ 行动（Act）→ 观察（Observe）循环
- **LangChain**：Chain、Tool、Agent、Memory、Callback（了解核心抽象即可，不必全背 API）
- **LlamaIndex**：以数据为中心的框架，Query Engine、Data Connectors
- **Agent 常见坑**：循环失控（最大迭代次数）、工具调用失败重试、上下文过长（总结压缩）、成本控制

**实践项目 B3**：助理 Agent——能查天气/查库存/查数据库，最终自动生成一份报告（如"分析销售数据写周报"）。

### 2.5 模型部署与微调（1~2 周，了解级）

- **本地部署**：Ollama（一键跑开源模型）、vLLM（高吞吐推理）、量化（GGUF/AWQ）概念
- **微调（了解即可）**：LoRA/QLoRA 原理（冻结原模型、训练低秩矩阵）、什么时候需要微调（领域风格/格式强绑定）vs 什么时候 RAG 就够了（**80% 场景 RAG 够用**）
- **评估**：准备 20~50 个测试用例，对比回答质量；评测指标（准确率、相关性）
- **成本与延迟**：Token 计价、缓存（语义缓存）、模型降级路由（小模型兜底）

### 2.6 阶段 B 验收标准

- [ ] 流式对话应用上线
- [ ] RAG 知识库问答上线（文档可上传）
- [ ] Agent 能完成一个多步骤真实任务
- [ ] 能讲清 RAG 全流程、Function Calling 原理、缓存三兄弟、Token 成本优化

---

## 3. 第三阶段：融合层（双修杀手锏）

> 目标：打通 Java 业务系统与 Python AI 服务，这是你区别于单栈工程师的核心竞争力。

### 3.1 混合架构设计

- **典型拓扑**：
  - Java 侧：用户/订单/权限/业务数据（Spring Boot 微服务）
  - Python 侧：AI 能力服务（FastAPI：RAG/Agent/模型代理）
  - 通信：**Java → Python 用 HTTP/gRPC**（RestTemplate / OpenFeign / WebClient 调 Python 接口）
- **关键治理点**：
  - **鉴权**：AI 接口统一走网关（Gateway 透传 JWT → Python 校验）
  - **限流**：Sentinel / Redis 令牌桶限制 AI 调用频次（防成本失控）
  - **成本控制**：Token 用量统计、每日预算、模型分级路由（简单问题用小模型）
  - **异步化**：长耗时 AI 任务用 MQ 解耦（Java 生产 → Python 消费 → 结果回调）

### 3.2 数据管道

- 业务数据（MySQL）→ 定时同步（canal / xxl-job）→ 清洗 → 向量化 → 写入向量库
- 更新策略：增量同步、文档版本管理（旧向量失效处理）

### 3.3 融合项目（最终作品集）

**核心项目**：在阶段 A 的管理系统上嵌入 AI 能力：
1. **AI 知识库问答**：公司文档上传 → RAG → 管理后台内嵌问答面板
2. **智能报表生成**：用户点按钮 → Java 查数据 → 调 Python Agent → 生成分析报告 → 前端展示
3. **AI 客服助手**：FAQ 检索 + 大模型润色回复

> 这个项目做完，简历一句话：**"独立完成 Java 业务系统与 Python AI 服务混合架构，实现智能问答与报表生成，覆盖鉴权、限流与成本控制。"**

---

## 4. 学习资源汇总

### Java 方向
- 视频：尚硅谷 Java 基础/Spring Boot 系列（B 站）、黑马程序员
- 书籍：《Java 编程思想》（选读）、《深入理解 Java 虚拟机》（JVM 圣经）、《Java 并发编程的艺术》
- 文档：Spring 官方文档、MyBatis-Plus 官方文档
- 刷题：LeetCode 热题 100（数据结构与算法基础）

### AI 方向
- 视频：吴恩达 ChatGPT Prompt Engineering（有中文翻译）
- 文档：OpenAI Cookbook、LangChain 官方文档、FastAPI 官方文档
- 论文/文章：RAG 综述、Agent 综述
- 实践：HuggingFace（模型/数据集）、Ollama 本地模型

### 工具
- IDE：IntelliJ IDEA（Java）、VS Code + Python 插件（Python）
- 数据库：Navicat / DataGrip、DBeaver
- 接口调试：Postman / Apifox

---

## 5. 避坑指南

1. **不要 Java、Python 同时学**：串行推进，否则两个都学不深
2. **不要背 API**：背原理和场景，API 用时查文档
3. **项目一定要上线**：本地跑通不算数，部署到公网才算（GitHub Pages / 云服务器均可）
4. **Java 并发和 MySQL 索引是面试命门**，投入时间至少占 Java 阶段 40%
5. **AI 阶段先手写再上框架**：RAG、Function Calling 都先手动实现一遍，否则面试一问就露馅
6. **融合项目是核心竞争力**：宁可砍掉微服务深度，也要保住融合项目完整度
7. **每周留出输出时间**：把学到的东西写成笔记（本目录就是你的知识库），费曼学习法是最好的检验

---

*本文档与《Java 全栈 + AI 全栈 面试手册》配套使用，学习阶段结束时用面试手册自测。*
