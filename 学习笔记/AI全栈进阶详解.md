# AI 全栈进阶详解（高级开发深度）

> **定位**：面向高级开发，聚焦**大模型原理、生产级 RAG/Agent 架构、模型工程、成本治理、AI 应用安全**。
> **前置**：先学完《AI全栈知识点详解》（基础篇），再读本文档。
> **达成目标**：能设计生产级 AI 应用架构，能讲清"为什么"，能治理成本与风险。

---

# 第 1 章 LLM 原理进阶

## 1.1 Transformer 直觉理解（能讲给人听）

**核心问题**：如何让模型"理解"句子中词与词的关系？

**注意力机制（Attention）**：
```
"苹果发布了新手机，它的价格是 5999"
                ↑
"它"指代什么？模型需要看整个句子判断 → 注意力机制给每个词计算与"它"的相关度
```

**流程直觉**（不必推导公式）：
1. **Embedding**：每个 token 转成向量
2. **位置编码**：向量加上位置信息（Transformer 没有顺序感，要人工注入"第几个词"）
3. **多头注意力（Multi-Head Attention）**：每个 token 与所有 token 计算相似度（Q/K/V 矩阵），加权聚合——**让每个词"看到"全句**
4. **前馈网络（FFN）**：逐位置非线性变换
5. **残差连接 + LayerNorm**：稳定训练，防止梯度消失
6. 多层堆叠（GPT-3 96 层）→ 大模型"深度"的来源

**关键认知（高级）**：
- 注意力的计算量是 **O(n²)**（n 为 token 数）→ 长上下文成本暴涨，这是长文档处理贵的根本原因
- **KV Cache**：生成时每个 token 只需与历史 KV 计算，缓存历史 K/V 矩阵 → 显存换速度
- **因果掩码**：GPT 类只允许看左边的词（自回归），所以能续写

## 1.2 Tokenizer：BPE 分词原理

**BPE（Byte Pair Encoding）**：从字符级开始，反复合并"出现频率最高的相邻对"直到达到词表大小（如 32K/128K）。

```
"low", "lower", "lowest" → 学出合并规则：l+o→lo, lo+w→low, ...
词表 = 基础字符 + 学到的子词
```

**高级认知**：
- **token 数 ≠ 字数**：中文 1 字约 1~2 token，英文 1 词约 1.3 token；代码/数字可能更多
- 不同模型 tokenizer 不同 → **换模型时成本估算要重新测**（1 个测试脚本：输入固定文本统计 tokens）
- 成本估算公式：`cost = (input_tokens × in_price + output_tokens × out_price) / 1000`

**实用工具**：写个小脚本统计你的业务 prompt 平均 token 数，这是成本治理的第一步。

## 1.3 主流模型家族与选型（2026 视角）

| 家族 | 特点 | 适用 |
|---|---|---|
| OpenAI GPT-4o/o系列 | 综合最强、多模态 | 通用、复杂推理、英文 |
| Claude（Anthropic） | 长上下文、代码强 | 编程、长文档 |
| **DeepSeek（国产）** | 便宜（≈GPT 的 1/10）、推理强 | 国内业务首选性价比 |
| **Qwen 通义（阿里）** | 中文好、开源生态全 | 中文场景、私有化部署 |
| GLM（智谱）/ 文心（百度）/ Kimi（月之暗面） | 各有侧重 | 中文、长文本（Kimi 擅长） |
| 开源可部署 | Llama、Qwen、DeepSeek、Mistral | 私有化、数据不出域 |

**选型决策树（高级）**：
```
数据是否可出域？
 ├─ 否 → 开源模型本地部署（vLLM + Qwen/Llama）
 └─ 是 → 中文业务：DeepSeek/Qwen API（性价比）
        复杂推理/多模态：GPT/Claude
        长文档：Kimi/Claude（大上下文）
```

**重要认知**：**不要只绑一家**——设计"模型网关"抽象层（见第 6 章），随时可切换/降级/多模型路由。

## 1.4 上下文窗口管理策略

**问题**：上下文窗口有限（8K~200K），prompt 太贵（O(n²) 计算 + token 计费）。

**四层管理策略**：
| 策略 | 做法 | 适用 |
|---|---|---|
| 截断 | 超长丢历史（保留最近的） | 简单场景 |
| **滑动窗口** | 只保留最近 N 轮 | 聊天 |
| **摘要压缩** | 把旧历史压缩成摘要 | 长对话 |
| **RAG 选择性注入** | 不塞全文，只塞检索到的相关片段 | 知识型场景（最推荐） |

**RAG vs 长上下文（高级必考）**：
```
长上下文（如 200K 全塞文档）：
  ✅ 无需检索、无召回失败
  ❌ 贵（token 翻 N 倍）、慢（O(n²)）、"迷失在中间"（模型对中间内容注意力弱）

RAG（检索 TopK 注入）：
  ✅ 便宜、快、精准
  ❌ 有召回失败风险（需要检索质量保障）
生产结论：混合——能检索的用 RAG，必须全局理解的（合同全文审查）用长上下文。
```

---

# 第 2 章 Prompt 工程进阶

## 2.1 高级技术栈

### 2.1.1 CoT（思维链）与 Few-shot CoT
```
基础：Q: 24*7+3=? A: 171（直接给答案，容易错）
CoT：Q: 24*7+3=? A: 24*7=168, 168+3=171（引导逐步推理）
Few-shot CoT：先给一个带推理过程的示例，再让模型照做（效果最强）
```

### 2.1.2 Self-Consistency（自洽性）
**思路**：同一个问题采样多次（temperature 调高），让模型给出多个带推理的答案 → **投票取多数**。
**效果**：数学/推理题准确率显著提升，代价是多次调用（成本 ×N）。

### 2.1.3 ReAct 与工具（Agent 基础，见第 4 章）

### 2.1.4 提示词模板化与版本管理

```python
# 模板管理（生产必做）：参数化 + 版本化
SYSTEM_PROMPT = """你是一名{role}，回答要求：{constraints}。当前知识版本：{kb_version}"""

def build_prompt(role, constraints, kb_version="v1.2"):
    return SYSTEM_PROMPT.format(role=role, constraints=constraints, kb_version=kb_version)
```

**生产实践**：
- prompt 存**配置中心/数据库**（可灰度、可回滚），不要硬编码在代码里
- 每次改动：更新版本号 + 跑测试集回归
- 记录线上效果（用户反馈、人工打分）→ 持续迭代

## 2.2 结构化输出的 Schema 设计与兜底

```python
RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "sentiment": {"type": "string", "enum": ["positive", "negative", "neutral"]},
        "score": {"type": "integer", "minimum": 0, "maximum": 5},
        "reason": {"type": "string"},
    },
    "required": ["sentiment", "score"],
}
# system 里附上 JSON Schema + 示例，同时 response_format={"type":"json_object"}
```

**兜底三层（高级）**：
1. `json.loads` 失败 → 尝试提取 `{...}` 子串再解析
2. 仍失败 → 正则提取字段 / 调用一次修复 prompt（"你的输出不是合法 JSON，请修正"）
3. 字段缺失 → **默认值兜底**（score 缺失给 0），并记录异常样本用于改进

## 2.3 Prompt 评测体系

**构建测试集**：每类场景 10~20 条（正常/边界/恶意/中文口语化/超长）
**评分方式**：
- 人工抽样打分（准，慢）
- **LLM-as-Judge**：用强模型（GPT-4/Claude）按标准给弱模型输出打分
```python
judge_prompt = """你是评分员。根据以下标准给回答打分（1-5）：
1. 正确性 2. 忠实于资料 3. 完整性 4. 格式
【问题】{q}【标准答案】{golden}【待评回答】{answer}
只输出分数："""
```
- 指标：准确率、幻觉率、格式合规率、平均得分

---

# 第 3 章 RAG 生产级架构

## 3.1 生产架构：离线管道 + 在线服务（必考系统设计）

```
┌────────── 离线索引管道（异步，批处理）──────────┐
│ 文档上传 → 格式解析(PDF/Word/表格) → 清洗去重      │
│ → 切分(保留结构) → Embedding → 写入向量库(+元数据) │
│ → 更新索引版本（版本化，可回滚）                   │
└────────────────────┬─────────────────────────────┘
                     │
┌────────── 在线检索服务（FastAPI，低延迟）──────────┐
│ 请求 → 鉴权 → 查询改写 → 多路召回(BM25+向量)       │
│ → Rerank 精排 → 权限过滤 → 组装 prompt → LLM 生成  │
│ → 流式返回(带引用) + token 统计                  │
└──────────────────────────────────────────────────┘
```

**关键设计决策（高级）**：
- **索引与查询解耦**：文档更新不阻塞在线服务；索引版本化，出问题秒级回滚
- **异步任务**：文档解析/向量化用消息队列（Celery/RQ）异步处理，长文档切片并行
- **增量更新**：监听文件变更/数据库 binlog → 只重建变更部分；删除要同步删向量（按 doc_id 过滤）
- **权限隔离**：向量库存储时带权限标签（如部门 id），检索时**先按权限过滤再 TopK**（防止越权 + 省算力）

## 3.2 文档解析（生产中最容易被低估的环节）

| 类型 | 方案 | 坑 |
|---|---|---|
| PDF（扫描件） | OCR（PaddleOCR 等） | 表格结构丢失、双栏顺序错乱 |
| PDF（文本型） | pypdf/pdfplumber | 复杂版式乱序 |
| Word | python-docx | 表格、嵌入对象 |
| 表格 Excel | 转 Markdown 表格再入库 | 公式、合并单元格 |
| 网页 | Jina Reader / BeautifulSoup | 导航/广告噪音，要正文抽取 |

**高级实践**：
- **版面分析（LayoutLM/PP-Structure）**：先识别标题/段落/表格区域，再按结构切分 → 保留文档层级
- 切分时把**标题路径**注入 chunk 元数据（如 `[产品手册 > 第三章 > 3.2 参数]`），检索时帮助理解上下文，回答可溯源
- 图片/图表：需要时用多模态模型（GPT-4o）转文字描述入库

## 3.3 检索质量进阶：多路召回 + Rerank

**多路召回（为什么不止一路）**：
| 召回路 | 擅长 |
|---|---|
| 向量（语义） | 意思相近但用词不同 |
| BM25（关键词） | 精确词匹配（型号、编号、人名） |
| 元数据过滤 | 按分类/时间/权限缩小范围 |
| 图检索（知识图谱，进阶） | 多跳关系查询 |

**融合（RRF）** 见基础篇；**Rerank 精排**：
```
向量召回 Top50（快，粗）→ Rerank 交叉编码 Top5（准，精）
为什么两级：交叉编码对每对(query,doc)都要计算，O(n) 次模型推理，只能对少量候选做
```

**Rerank 模型**：bge-reranker-v2-m3（中文）、Cohere Rerank（英文）；注意 Rerank 是**交叉编码器**（拼接输入），与 Embedding 的**双塔**结构不同——理解这个区别是高级标志。

**查询改写进阶**：
- 多轮 → 独立查询（基础篇已讲）
- **查询扩展**：同义词扩展（"手机"→"手机 智能手机 iPhone"）
- **HyDE**：先让 LLM 生成假设答案，用答案向量检索（答案比问题更接近文档语义）
- **重写+混合**：改写后的 query 同时走向量 + BM25

## 3.4 RAG 评估体系（RAGAS 框架）

**四个核心指标**：
| 指标 | 衡量 | 怎么测 |
|---|---|---|
| **忠实度（Faithfulness）** | 回答是否忠于检索上下文 | LLM 拆解回答中的事实点，逐点核对上下文 |
| **答案相关性（Answer Relevancy）** | 是否答非所问 | LLM 评分 |
| **上下文精度（Context Precision）** | 检索到的片段有多少真正相关 | 看黄金答案中引用的片段 |
| **上下文召回（Context Recall）** | 需要的片段是否都被召回 | 黄金片段 vs 检索片段 |

```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision, context_recall

result = evaluate(dataset=testset, metrics=[
    faithfulness, answer_relevancy, context_precision, context_recall])
print(result)   # {'faithfulness': 0.93, 'context_precision': 0.85, ...}
```

**生产实践**：测试集 50~200 条（含难例）→ 每次改 chunk 策略/检索/rerank 全量回归 → 指标趋势看板。

## 3.5 生产级 RAG 代码骨架（FastAPI + 异步）

```python
# service.py —— 在线检索服务
from fastapi import FastAPI, Depends
from pymilvus import MilvusClient
from openai import OpenAI
import asyncio

app = FastAPI()
client = MilvusClient("http://localhost:19530")
llm = OpenAI(base_url="https://api.deepseek.com", api_key="sk-xxx")

def embed(text: str) -> list[float]:
    return llm.embeddings.create(model="text-embedding-v3", input=[text]).data[0].embedding

def hybrid_search(query: str, user_roles: list[str], top_k: int = 30):
    # 1. 向量召回 + 权限过滤（Milvus 支持 filter）
    vec_hits = client.search(
        collection_name="kb", data=[embed(query)], limit=top_k,
        filter=f"role IN {user_roles}",            # 权限过滤！
        output_fields=["text", "title", "page"])
    # 2. BM25 召回（可合并 RRF，略）
    return vec_hits

@app.post("/api/ask")
async def ask(q: str, user_roles: list[str] = Depends(get_roles)):
    # 1. 语义缓存（Redis 相似度命中直接返回）
    if cached := semantic_cache.get(q):  return cached
    # 2. 多路召回 → Rerank（略）→ Top5
    hits = hybrid_search(q, user_roles)[:5]
    # 3. 组装 + 生成
    context = "\n\n".join(f"[{h['title']} p{h['page']}] {h['text']}" for h in hits)
    resp = llm.chat.completions.create(model="deepseek-chat", temperature=0.1,
        messages=[{"role": "system", "content": "仅依据资料回答，资料没有就明说，标注引用。"},
                  {"role": "user", "content": f"资料：{context}\n\n问题：{q}"}])
    answer = resp.choices[0].message.content
    record_cost(q, answer)                 # token 统计入库
    semantic_cache.set(q, answer)          # 写语义缓存
    return {"answer": answer, "sources": [h["title"] for h in hits]}
```

---

# 第 4 章 Agent 进阶

## 4.1 规划算法：ReAct vs Plan-and-Execute

| 模式 | 流程 | 特点 |
|---|---|---|
| **ReAct** | 思考→行动→观察 循环 | 灵活、动态调整；每步一次 LLM 调用，慢、贵 |
| **Plan-and-Execute** | 先规划步骤清单 → 逐步执行（执行阶段可不调 LLM） | 稳定、省调用；规划错就全错 |

**工程取舍（高级）**：
- 任务明确可拆分（"生成月报"）→ **Plan-and-Execute**：先规划 5 步，然后执行（快、省）
- 任务不确定需要动态决策（"帮我处理这些邮件"）→ **ReAct**：边做边看
- **混合**：ReAct 内部嵌套子 Agent，每层有规划

## 4.2 多 Agent 协作（概念级）

| 框架 | 模式 | 场景 |
|---|---|---|
| AutoGen | 对话式多 Agent（助手+用户代理+裁判） | 复杂问题讨论 |
| CrewAI | 角色编排（research→write→review） | 流水线任务 |
| LangGraph | **图状态机**（节点+边+状态，可控性强） | 生产级复杂工作流 |

**多 Agent 的代价（高级认知）**：协调成本（消息传递）、token 消耗翻倍、调试困难、可靠性下降。**能用单 Agent 解决就别上多 Agent；能用工作流（固定步骤）就别上自主 Agent。**

**工作流 vs Agent 决策**：
```
规则固定、步骤确定 → 工作流（代码写死步骤，便宜、稳定、可测试）
规则不确定、需动态决策 → Agent（LLM 决策，灵活、贵、有风险）
```

## 4.3 Agent 记忆管理

| 记忆类型 | 实现 | 用途 |
|---|---|---|
| 短期（对话内） | 上下文窗口 + 滑动窗口 | 当前任务 |
| 长期（跨会话） | **向量库存历史**（总结后 embedding） | "记得用户上次的需求" |
| 工作记忆 | 状态变量/文件 | 中间结果 |

**高级实践**：**总结式记忆**——对话结束时让 LLM 生成一段摘要（用户偏好、进行中任务）入库，下次会话检索注入，比存原始对话便宜且有效。

## 4.4 Agent 评测与安全

**评测**：任务完成率（黄金任务集）、工具调用正确率、步数/成本、失败模式分类（规划错/工具错/幻觉）。

**安全（生产红线）**：
- **工具权限最小化**：Agent 只能调用白名单工具，敏感操作（删除、转账、发布）必须**人工二次确认**
- **参数校验**：工具入参 schema 校验 + 业务校验（防止 prompt 注入伪造参数）
- **操作审计**：每个工具调用记录（谁、何时、调了什么、参数、结果）——合规必备
- **沙箱执行**：代码类工具在隔离容器执行
- **内容安全**：输入输出过敏感词/审核 API（国内合规必需）

---

# 第 5 章 模型工程

## 5.1 vLLM 生产部署原理

**vLLM 两大核心技术**：
1. **PagedAttention**：KV Cache 分页管理（像操作系统的虚拟内存），显存利用率从 40%→90%+
2. **Continuous Batching**：请求级动态批处理（不像传统按 batch 等齐），吞吐提升数倍

```bash
# 生产部署（Qwen2.5-72B 示例，多卡）
vllm serve Qwen/Qwen2.5-72B-Instruct \
  --tensor-parallel-size 4 \        # 4 卡张量并行
  --max-model-len 32768 \           # 上下文长度
  --gpu-memory-utilization 0.9 \    # 显存利用率
  --port 8000
# 提供 OpenAI 兼容 API，业务代码零改动接入
```

**选型结论**：生产并发推理 → **vLLM**（吞吐王）；内存受限/CPU → Ollama/llama.cpp + GGUF；需流式 → vLLM 原生支持。

## 5.2 量化原理

**思路**：fp16（16bit）→ int8/int4，减少显存与计算。

| 方法 | 原理 | 特点 |
|---|---|---|
| **GPTQ** | 训练后逐层量化，误差最小化 | 4bit 效果好，需校准集，GPU 推理 |
| **AWQ** | 按激活值重要度保护关键通道 | 比 GPTQ 更稳，无需反向传播 |
| **GGUF** | llama.cpp 格式 | CPU/边缘设备可跑 |

**高级认知**：
- 量化 4bit 通常损失 <1% 效果，显存减半 → **72B 模型 4bit 量化后 ~40GB 显存可跑**
- **KV Cache 也吃显存**：长上下文时 KV Cache 可能比模型权重还大（估算：2 × 层数 × 头维度 × 序列长 × 字节数）
- 显存估算经验：模型权重 + KV Cache + 激活 + 冗余（20%）

## 5.3 LoRA/QLoRA 微调实战（了解流程）

```
LoRA：冻结基座模型，注入低秩矩阵 A×B（r=8~64）
QLoRA：基座量化到 4bit + LoRA → 单张 24GB 显卡可微调 70B 级模型
```

**流程**：准备数据集（几百~几千条，格式对齐）→ 训练（transformers + peft）→ 评估 → 合并/部署。

**什么时候微调（高级判断）**：
- 需要**固定输出格式/风格**（客服话术、医疗报告模板）→ 微调值得
- 知识类 → RAG（别微调，更新太慢）
- 数据 <500 条 → 先试 few-shot；微调容易过拟合

## 5.4 模型网关（多模型路由）设计

```
请求 → 模型网关（自研 或 LiteLLM/OpenRouter）
 ├─ 路由策略：按任务类型（简单→小模型、复杂→大模型）
 ├─ 降级：主模型失败/超时 → 备用模型
 ├─ 重试：指数退避 + 抖动
 ├─ 限流配额：按用户/按天预算
 └─ 统一日志：token 统计、延迟、错误率
```

```python
# 分级路由示例
ROUTES = {
    "qa":        {"model": "deepseek-chat",      "max_tokens": 512},
    "reasoning": {"model": "deepseek-reasoner",  "max_tokens": 2048},
    "creative":  {"model": "qwen-plus",          "temperature": 1.0},
}
def route(task_type: str):
    cfg = ROUTES[task_type]
    try:
        return call_llm(cfg)
    except (TimeoutError, RateLimitError):
        fallback = ROUTES.get("qa")           # 降级到便宜模型
        return call_llm(fallback)
```

---

# 第 6 章 AI 应用工程化

## 6.1 可观测性（LLM 应用必备）

**为什么要专门的可观测**：LLM 输出不确定，普通日志不够 → 需要记录完整调用链。

**Langfuse / LangSmith**（LLM 追踪平台）核心能力：
- 每次调用：prompt、输出、token 数、延迟、模型版本
- **trace 树**：Agent 多步调用串成一条链路
- 评分/反馈：人工打分、用户反馈回填 → 分析哪些 case 差

**自建最小方案**：
```python
# 中间件：记录每次 LLM 调用
@app.middleware("http")
async def log_llm_calls(request, call_next):
    start = time.time()
    response = await call_next(request)
    # 从响应体统计 token（或由业务代码上报）
    log_event("llm_call", {
        "path": request.url.path,
        "latency_ms": (time.time()-start)*1000,
        "user_id": request.headers.get("x-user-id"),
    })
    return response
```

**指标看板**：QPS、P95 延迟、错误率、token 消耗/天、成本/天、缓存命中率、平均得分。

## 6.2 A/B 测试与线上评估

- **Prompt A/B**：同请求随机走 A/B 两版 prompt → 人工/LLM 打分对比
- **模型 A/B**：新模型灰度 10% 流量 → 对比质量、成本、延迟 → 全量切换
- **回滚**：模型版本/prompt 版本都版本化，一键回滚（配置中心 + 数据库记录）

## 6.3 成本治理体系（AI 应用运营核心）

```
成本 = Σ (输入token×单价 + 输出token×单价)  ×  调用次数

治理杠杆（按收益排序）：
1. 语义缓存：相同/相似问题命中 → 省 50~90% 调用（最大杠杆）
2. 模型分级：简单任务走便宜模型（10 倍价差）
3. Prompt 精简：砍废话 system（每请求省几百 token）
4. RAG 只注入 TopK：限制上下文长度
5. 流式 + max_tokens 限制：防模型"话痨"
6. 降级：高峰/超预算 → 自动切便宜模型/兜底话术
7. 预算控制：每日/每用户配额，超限熔断
```

**预算熔断实现**：
```python
# Redis 计数器：按用户/按天
def check_quota(user_id: str, budget_per_day: int = 100_000):
    used = redis.incr(f"quota:{user_id}:{date.today()}")
    if used > budget_per_day:
        raise HTTPException(429, "今日额度已用完")
```

## 6.4 AI 应用安全与合规（国内红线）

| 风险 | 治理 |
|---|---|
| 数据外泄 | 敏感数据脱敏后才送 API；涉密数据走私有化部署 |
| 内容合规 | 输入输出过内容安全审核（腾讯云/阿里云内容安全 API） |
| Prompt 注入 | 输入过滤 + system 强化 + 工具白名单 + 敏感操作二次确认 |
| 版权/溯源 | RAG 保留来源引用；生成内容标注 AI 生成 |
| 算法备案 | 生成式 AI 服务上线需合规备案（了解即可） |

---

# 第 7 章 混合架构进阶（Java × Python）

## 7.1 服务间通信选型

| 维度 | HTTP/REST | gRPC |
|---|---|---|
| 序列化 | JSON（可读） | **Protobuf（二进制，体积小 5~10 倍）** |
| 性能 | 一般 | 高（HTTP/2 多路复用） |
| 流式 | SSE 单向 | **双向流**（适合流式 LLM 输出） |
| 调试 | curl 直接调 | 需 grpcurl/反射 |
| 生态 | 通用 | 需生成代码 |

**结论**：Java 业务系统 ↔ Python AI 服务，**日常用 HTTP（简单、可调试），流式生成/高吞吐用 gRPC**。起步用 HTTP，遇到瓶颈再切。

## 7.2 混合架构的认证方案

```
方案 A（简单）：Java 网关校验 JWT → 透传用户身份 → Python 信任内网 + 校验签名
方案 B（标准）：服务间互调用 API Key（Redis/配置中心下发）+ 内网 IP 白名单
方案 C（严格）：OAuth2 Client Credentials 机器凭证
```

**生产推荐**：B（API Key + 内网隔离 + TLS），关键服务加 A（透传用户上下文做权限过滤）。

## 7.3 AI 能力网关（Java 侧设计）

```java
// Java 网关统一收口 AI 调用：鉴权/限流/成本/路由
@RestController
@RequestMapping("/ai")
public class AiGatewayController {

    @Autowired private AiClient aiClient;      // Feign 调 Python
    @Autowired private StringRedisTemplate redis;

    @PostMapping("/ask")
    public R<AiAnswer> ask(@RequestBody AskReq req, @RequestHeader("X-User-Id") Long userId) {
        // 1. 限流：用户级令牌桶
        if (!allow(userId)) return R.fail(429, "请求过于频繁");
        // 2. 调用 AI 服务（带超时与降级）
        AiAnswer ans;
        try {
            ans = aiClient.ask(new AskRequest(req.getQuestion(), userId), token());
        } catch (Exception e) {
            return R.ok(new AiAnswer("AI 服务繁忙，请稍后再试", 0));   // 降级兜底
        }
        // 3. 成本记录（token 落库）
        costService.record(userId, ans.getCostTokens());
        return R.ok(ans);
    }
}
```

**治理清单**：限流（Sentinel/Redis 令牌桶）、超时（Feign connectTimeout/readTimeout 分离，AI 读超时要长）、熔断（错误率阈值）、降级（兜底话术）、成本统计、审计日志。

## 7.4 数据管道：业务数据 → 向量

```
MySQL 业务表（订单/商品/文档）
  → canal 监听 binlog（或 xxl-job 定时轮询）
  → 增量数据推送 MQ
  → Python 消费：清洗 → 切分 → Embedding → 写向量库
  → 更新索引版本；失败重试 + 对账任务
```

**关键设计**：
- **幂等**：按 doc_id 去重，重复消费不重复入库
- **版本化**：每次全量重建生成新 index，切换原子
- **删除同步**：源数据删除 → 按 doc_id 删向量
- **延迟要求**：实时性高用 binlog 推送，一般业务定时批处理即可

---

# 附：AI 高级开发自测清单

- [ ] 能讲清 Transformer 注意力、KV Cache、O(n²) 复杂度与成本关系
- [ ] 能设计生产级 RAG 架构（离线管道/在线服务/版本回滚/权限过滤）
- [ ] 能讲清多路召回 + Rerank 原理并实现 RAGAS 评估
- [ ] 能讲清 ReAct vs Plan-and-Execute 取舍、工作流 vs Agent 决策
- [ ] 能设计模型网关（分级路由/降级/重试/预算熔断）
- [ ] 能讲清 vLLM 原理、量化方案、KV Cache 显存估算
- [ ] 能治理 AI 应用成本（缓存/分级/精简）并建立监控看板
- [ ] 能设计 Java × Python 混合架构（认证/限流/成本/数据管道）

*配合《AI全栈知识点详解》基础篇使用：基础篇建立体系，本篇达到高级深度。*
