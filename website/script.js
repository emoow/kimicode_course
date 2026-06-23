// 星空背景：在 .stars 图层里生成一批极小的星点，各自随机闪烁。
(function generateStars() {
  const sky = document.querySelector(".stars");
  if (!sky) return;

  // 视口越大，星越多（控制密度，避免过满）
  const area = window.innerWidth * window.innerHeight;
  const count = Math.min(220, Math.round(area / 9000));

  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    star.className = "star";

    // 位置：整屏随机
    star.style.left = (Math.random() * 100).toFixed(2) + "%";
    star.style.top = (Math.random() * 100).toFixed(2) + "%";

    // 大小：大多是 1px 的细点，少数稍大一点
    const size = Math.random() < 0.8 ? 1 : 2;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.boxShadow = `0 0 ${size + 2}px ${size === 2 ? 1 : 0.5}px rgba(255,255,255,0.45)`;

    // 闪烁节奏：每颗星周期、起始相位、亮度峰值都不同
    star.style.setProperty("--twinkle-dur", (3 + Math.random() * 5).toFixed(2) + "s");
    star.style.setProperty("--twinkle-delay", (-Math.random() * 8).toFixed(2) + "s");
    star.style.setProperty("--twinkle-peak", (0.5 + Math.random() * 0.5).toFixed(2));

    frag.appendChild(star);
  }
  sky.appendChild(frag);
})();


// 三个篇章。先导篇 + 基础篇用课程卡片呈现；进阶篇是按兴趣选做的形态合集，用标签呈现。
const stages = [
  {
    label: "README",
    badge: "课程导读",
    intro: "说明这门课给谁学、学完能得到什么、学什么、怎么学，并完成工具安装与本地环境配置。",
    lessons: [
      {
        title: "课程导读与环境配置",
        desc: "了解课程定位、目标学员、学习方式与工具准备，克隆课程仓库，配置本地环境。",
        out: "克隆仓库，配置本地环境"
      }
    ]
  },
  {
    label: "先导篇",
    badge: "为什么使用 KimiCode",
    intro: "理解为什么已有网页版 Kimi 之后，还需要使用 KimiCode；对比网页版本与 KimiCode 的差异，并完成一个本地数据可视化的 refinement。",
    lessons: [
      {
        title: "为什么有网页版我还要使用 KimiCode?",
        desc: "对比网页版和 KimiCode 的使用场景，学习如何 refine 一个本地数据可视化项目。",
        out: "提交一个本地代码文件，并用 autograder 调整锚点"
      }
    ]
  },
  {
    label: "基础篇",
    badge: "用个人网站串起完整开发流程",
    intro: "围绕一个个人网站，从配置开发环境、和 Agent 协作、前端页面、后端能力、部署上线，到产品复盘与开发之外的自动化，建立完整的 Vibe Coding 工作流。",
    lessons: [
      {
        title: "基础篇 01：配置一个定制化的 Code 工作环境",
        desc: "学习什么是 IDE、CLI、KimiCode 基本使用、Vibe Coding 是什么，以及完整使用流程。",
        out: "用 bash 命令行导出一个 AI 交互 log"
      },
      {
        title: "基础篇 02：和 Agent 打交道：做好看的个人网站前端",
        desc: "理解 prompt、skill、agent 的基本原理，学习什么叫有产品感，并参考 awwwards、godly 等收集素材与写 HTML/CSS。",
        out: "用 skill 细化需求，完成个人网站前端"
      },
      {
        title: "基础篇 03：AI 全栈工程环境：给个人网站加后端",
        desc: "学习 Node.js、Next.js、Git、.env、前后端分工、API 调用与数据库基础，把个人网站升级为全栈项目。",
        out: "本地跑通 Next.js 项目，推上 GitHub，并配置环境变量"
      },
      {
        title: "基础篇 04：部署上线 & 修改域名：上线个人网站",
        desc: "学习 Vercel 部署、云端环境变量、配置域名与上线前检查清单。",
        out: "个人网站正式上线，拿到可分享链接"
      },
      {
        title: "基础篇 05：产品总结与案例拆解",
        desc: "学习完整产品流程复盘、用户体验基础与案例分析方法，拆解好的个人体验并产生更多产品想法。",
        out: "产品分析报告，更多产品 idea"
      },
      {
        title: "基础篇 06：用 KimiCode 处理开发之外的事",
        desc: "理解 agent 的通用性，把 KimiCode 用在自动化日常工作中，而不只是在写代码时使用。",
        out: "自动化一件平时手动做的事"
      }
    ]
  }
];

// 进阶篇：不同形态的产品（6 个独立项目，按兴趣选做）。大纲未逐一展开，故以形态标签预告。
const advanced = {
  label: "进阶篇",
  badge: "不同形态的产品",
  intro: "用 6 个完整项目，覆盖不同的产品生态。每个项目独立，你可以根据自己的兴趣选做。",
  forms: [
    { text: "浏览器扩展" },
    { text: "微信小程序" },
    { text: "移动 App" },
    { text: "数据看板" },
    { text: "AI Agent" },
    { text: "自动化工具" }
  ]
};

const container = document.querySelector(".stages");

// 渲染先导篇 + 基础篇
if (container) {
  stages.forEach((stage, si) => {
    const block = document.createElement("div");
    block.className = "stage";

    const head = document.createElement("div");
    head.className = "stage__head reveal";
    head.innerHTML = `
      <span class="stage__label">${stage.label}</span>
      <span class="stage__badge">${stage.badge}</span>
      <p class="stage__intro">${stage.intro}</p>
    `;
    block.appendChild(head);

    const track = document.createElement("div");
    track.className = "lesson-track";
    const numbered = stage.lessons.length > 1;

    stage.lessons.forEach((l, i) => {
      const card = document.createElement("article");
      card.className = numbered ? "lesson-row reveal" : "lesson-row lesson-row--bare reveal";
      card.style.transitionDelay = (i % 3) * 80 + "ms";
      const rail = numbered
        ? `<div class="lesson-row__rail">
          <span class="lesson-row__num">${String(i + 1).padStart(2, "0")}</span>
        </div>`
        : "";
      card.innerHTML = `
        ${rail}
        <div class="lesson-row__body">
          <div class="lesson-row__head">
            <h3>${l.title}</h3>
          </div>
          <p class="lesson-row__desc">${l.desc}</p>
          <div class="lesson-row__out"><span>当节产出</span><strong>${l.out}</strong></div>
        </div>
      `;
      track.appendChild(card);
    });

    block.appendChild(track);
    container.appendChild(block);
  });

  // 渲染进阶篇预告
  const advBlock = document.createElement("div");
  advBlock.className = "stage";
  advBlock.innerHTML = `
    <div class="stage__head reveal">
      <span class="stage__label">${advanced.label}</span>
      <span class="stage__badge">${advanced.badge}</span>
      <p class="stage__intro">${advanced.intro}</p>
    </div>
    <div class="advanced-card reveal">
      <div class="orb orb--peach advanced-card__orb" aria-hidden="true"></div>
      <div class="advanced-card__forms">
        ${advanced.forms
          .map((f) => `<span class="form-pill">${f.text}</span>`)
          .join("")}
      </div>
      <p class="advanced-card__note">同一套能力，可以做成网页、扩展、小程序、App……产品形态不同，内核是相通的。按兴趣挑着做。</p>
    </div>
  `;
  container.appendChild(advBlock);
}

// 给其他区块加上进场动画
document.querySelectorAll(".feature-card, .section__head, .who__text, .who__quote, .cta-band > *:not(.orb)")
  .forEach((el) => el.classList.add("reveal"));

// 滚动进场
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
