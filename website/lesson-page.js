const progressKey = "kimicode-course-completed-lesson";
const page = document.querySelector(".lesson-page");

const lessons = [
  {
    id: 1,
    kicker: "先导篇 01 · 基础环境",
    title: "学这个项目/开始做产品的基础环境 & 感受第一个项目",
    lead: "用 Kimi Agent 和 Kimi Code 的一句话生成网页案例解释什么是 vibe coding，并完成第一个本地静态网页。",
    learn: "终端、KimiCode 安装与基本使用、VSCode 安装与使用、GitHub 基础使用",
    output: "一个很简单的本地 html 网页",
    prep: "下载安装 KimiCode、VSCode，通过 GitHub 拉仓库到本地；用一句话 prompt 写第一个本地能打开的静态网页",
    goals: ["理解什么是 vibe coding", "知道为什么这门课使用 KimiCode", "在 VSCode 中完成一次 KimiCode 基础使用"],
    steps: ["看一句话生成网页的案例", "安装并打开 VSCode 与 KimiCode", "拉取课程仓库到本地", "生成并打开第一个本地 HTML 网页"]
  },
  {
    id: 2,
    kicker: "基础篇 01 · Agent 协作",
    title: "如何和 Agent 打交道：做一个有基本产品 sense 的静态网页",
    lead: "理解产品工作的基本流程，学习用 superpower 类 skill 完成 brainstorm、需求细化和前端设计。",
    learn: "prompt、skill、agent 基本原理；产品需求 => 产品、产品体验的基本产品知识",
    output: "一个好看的本地 html 网页",
    prep: "理解 KimiCode 的基本原理和操作；会下载安装、使用 Skill",
    goals: ["理解 prompt、skill、agent 的分工", "把模糊想法整理成产品需求", "用前端设计 skill 生成更有产品感的网页"],
    steps: ["定义目标用户与核心场景", "用 skill 辅助 brainstorm 和需求细化", "生成静态网页首版", "检查视觉、文案和交互体验"]
  },
  {
    id: 3,
    kicker: "基础篇 02 · 全栈环境",
    title: "AI 时代全栈开发的基本环境",
    lead: "搭建从本地开发到工程化协作的基础工作台，为后续接后端和部署做准备。",
    learn: "待补充",
    output: "待补充",
    prep: "待补充",
    goals: ["认识本地开发环境的组成", "理解前端项目如何运行", "建立后续全栈开发的基础目录"],
    steps: ["检查 Node、Git、编辑器和终端", "生成最小项目", "运行本地开发服务", "记录环境问题和修复方式"]
  },
  {
    id: 4,
    kicker: "基础篇 03 · 后端",
    title: "接后端",
    lead: "把静态页面升级为能读写数据、调用接口的应用。",
    learn: "待补充",
    output: "待补充",
    prep: "待补充",
    goals: ["理解前端和后端的分工", "认识 API 请求和响应", "把页面数据接到后端能力"],
    steps: ["设计一个需要后端的功能", "生成 API 路由或服务接口", "在前端调用接口", "处理加载、成功和失败状态"]
  },
  {
    id: 5,
    kicker: "基础篇 04 · 部署",
    title: "部署",
    lead: "把本地项目发布到真实用户可以访问的位置。",
    learn: "待补充",
    output: "待补充",
    prep: "待补充",
    goals: ["理解部署、构建和环境变量", "把项目连接到部署平台", "建立上线前检查清单"],
    steps: ["确认项目能本地构建", "连接 GitHub 仓库", "配置部署参数和环境变量", "打开线上链接并验收"]
  },
  {
    id: 6,
    kicker: "基础篇 05 · 产品复盘",
    title: "产品知识总结，如何从需求到产品，优秀案例拆解",
    lead: "回到产品视角，复盘如何从需求定义走到可用产品，并拆解优秀案例。",
    learn: "待补充",
    output: "待补充",
    prep: "待补充",
    goals: ["建立从需求到产品的复盘框架", "识别优秀体验的关键设计", "把案例启发转成自己的产品改进点"],
    steps: ["梳理需求、用户和场景", "拆解一个优秀产品案例", "总结体验亮点和实现方式", "改进自己的项目"]
  },
  {
    id: 7,
    kicker: "基础篇 06 · 工作自动化",
    title: "如何用 KimiCode 处理开发外的事",
    lead: "把 KimiCode 从写代码扩展到日常工作自动化。",
    learn: "待补充",
    output: "待补充",
    prep: "待补充",
    goals: ["理解 agent 能处理的非开发任务", "把重复工作拆成可自动化步骤", "产出一个能复用的小流程"],
    steps: ["选择一个日常重复任务", "描述输入、处理步骤和输出", "让 KimiCode 生成自动化方案", "验证结果并沉淀模板"]
  },
  {
    id: 8,
    kicker: "进阶项目 01 · 舆情网页",
    title: "定时舆情分析网页",
    lead: "围绕真实数据获取、定时任务和信息分析，做一个可持续更新的网页产品。",
    learn: "待补充",
    output: "待补充",
    prep: "待补充",
    goals: ["明确数据来源和合规方式", "理解定时任务与数据存储", "完成可视化分析面板"],
    steps: ["确定分析主题", "接入官方 API 或可用数据源", "保存并分析数据", "展示趋势和结论"]
  },
  {
    id: 9,
    kicker: "进阶项目 02 · Chrome 扩展",
    title: "做一个 Chrome 扩展",
    lead: "把能力装进浏览器，做一个可以在日常网页中使用的小工具。",
    learn: "待补充",
    output: "待补充",
    prep: "待补充",
    goals: ["理解扩展 manifest、popup、content script", "读取当前页面上下文", "完成本地加载与调试"],
    steps: ["定义扩展使用场景", "生成扩展文件结构", "实现 popup 和页面脚本", "在 Chrome 中加载并测试"]
  },
  {
    id: 10,
    kicker: "进阶项目 03 · 微信小程序",
    title: "做一个微信小程序",
    lead: "把产品迁移到微信小程序形态，跑通开发者工具和模拟器流程。",
    learn: "待补充",
    output: "待补充",
    prep: "待补充",
    goals: ["认识小程序项目结构", "使用微信开发者工具预览", "理解审核和发布前准备"],
    steps: ["创建小程序项目", "生成页面和交互", "在模拟器中调试", "整理提交清单"]
  },
  {
    id: 11,
    kicker: "进阶项目 04 · iOS App",
    title: "做一个 iOS APP",
    lead: "进入 Xcode 和 SwiftUI，用 AI 辅助完成一个移动端 App 原型。",
    learn: "待补充",
    output: "待补充",
    prep: "待补充",
    goals: ["认识 Xcode 和 SwiftUI", "理解 iOS 项目结构", "在模拟器或真机运行 App"],
    steps: ["创建最小 SwiftUI 项目", "生成界面和状态逻辑", "接入一个接口或本地数据", "运行并记录调试问题"]
  },
  {
    id: 12,
    kicker: "进阶项目 05 · 自我进化",
    title: "AI 的自我进化",
    lead: "让 agent 在反馈中持续优化自己的 prompt、策略和输出质量。",
    learn: "待补充",
    output: "待补充",
    prep: "待补充",
    goals: ["理解反馈循环和自我评估", "设计评分标准", "比较优化前后的输出"],
    steps: ["选择一个已有 agent", "定义评价维度", "让系统提出改写建议", "复测并记录效果"]
  },
  {
    id: 13,
    kicker: "进阶项目 06 · 上线审核",
    title: "部署上线与审核",
    lead: "把不同项目形态送到真实用户可访问的位置，并处理平台审核与发布要求。",
    learn: "待补充",
    output: "待补充",
    prep: "待补充",
    goals: ["理解不同平台的发布流程", "建立上线验收清单", "准备审核材料和回滚方案"],
    steps: ["选择要上线的项目", "配置生产环境", "完成上线前验收", "提交审核或发布链接"]
  }
];

const readme = {
  kicker: "Readme · 学习说明",
  title: "KimiCode 课程 Syllabus",
  lead: "这是一门针对文科生/非技术背景的 vibe coding 课，目标是把脑中的想法变成产品，并理解 AI 参与产品流程的方式。",
  learn: "做产品思路；学这个仓库的思路",
  output: "/",
  prep: "能访问 GitHub",
  goals: ["知道这门课适合谁", "理解学完后能做什么", "了解产品需求定义、前端、后端、部署等基本流程", "知道如何拉仓库、读教学内容、用 skill 和 KimiCode 做作业"],
  steps: ["访问 GitHub 仓库", "把仓库拉到本地", "阅读课程网页和 syllabus", "进入先导篇开始第一个项目"]
};

function getCompletedLesson() {
  return Number(localStorage.getItem(progressKey) || "0");
}

function setCompletedLesson(lesson) {
  localStorage.setItem(progressKey, String(Math.max(getCompletedLesson(), lesson)));
}

function renderList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderPage(data, lessonNumber) {
  const previous = lessonNumber > 1 ? `lesson-${String(lessonNumber - 1).padStart(2, "0")}.html` : "../index.html#lessons";
  const next = lessonNumber < lessons.length ? `lesson-${String(lessonNumber + 1).padStart(2, "0")}.html` : "../index.html#lessons";
  const nextText = lessonNumber < lessons.length ? "下一节" : "完成课程";
  const completeButton = lessonNumber
    ? `<button class="btn btn--primary" type="button" data-complete-lesson="${lessonNumber}">完成本节，解锁下一节</button>`
    : "";

  page.innerHTML = `
    <section class="lesson-hero">
      <span class="lesson-kicker">${data.kicker}</span>
      <h1 class="lesson-title">${data.title}</h1>
      <p class="lesson-lead">${data.lead}</p>
      <div class="lesson-meta">
        <div><span>新学到的东西</span><strong>${data.learn}</strong></div>
        <div><span>产出</span><strong>${data.output}</strong></div>
        <div><span>实践准备/实操作业</span><strong>${data.prep}</strong></div>
      </div>
    </section>
    <section class="lock-panel">
      <h2 class="section__title">这一节还没有解锁</h2>
      <p class="section__lead">请先回到课程地图完成前一节，再进入本节。</p>
    </section>
    <section class="lesson-content">
      <article class="lesson-panel">
        <span>学习目标</span>
        <h2>本节要解决的问题</h2>
        <ul>${renderList(data.goals)}</ul>
      </article>
      <article class="lesson-panel">
        <span>课堂流程</span>
        <h2>建议学习路径</h2>
        <ol>${renderList(data.steps)}</ol>
      </article>
      <article class="lesson-panel">
        <span>作业验收</span>
        <h2>${data.output === "待补充" ? "等待补充详细验收标准" : data.output}</h2>
        <p>${data.prep}</p>
      </article>
    </section>
    <div class="lesson-actions">
      ${completeButton}
      <a class="btn btn--outline" href="${previous}">上一页</a>
      <a class="btn btn--outline" href="${next}">${nextText}</a>
      <a class="btn btn--outline" href="../index.html#lessons">返回课程地图</a>
    </div>
  `;
}

function updateLessonAccess() {
  const lesson = Number(page?.dataset.lesson || "0");
  if (!lesson) return;

  const completed = getCompletedLesson();
  const isLocked = lesson > completed + 1;
  const completeButton = document.querySelector("[data-complete-lesson]");

  page.classList.toggle("is-locked", isLocked);

  if (completeButton) {
    completeButton.textContent = lesson <= completed ? "已完成，继续复习" : "完成本节，解锁下一节";
  }
}

if (page) {
  const lessonNumber = Number(page.dataset.lesson || "0");
  const data = lessonNumber ? lessons[lessonNumber - 1] : readme;
  renderPage(data, lessonNumber);

  page.addEventListener("click", (event) => {
    const button = event.target.closest("[data-complete-lesson]");
    if (!button) return;
    const lesson = Number(button.dataset.completeLesson || "1");
    setCompletedLesson(lesson);
    updateLessonAccess();
  });

  updateLessonAccess();
}
