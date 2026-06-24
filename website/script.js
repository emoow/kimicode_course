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


const stages = [
  {
    label: "readme",
    badge: "学习说明",
    intro: "先理解这门课面向谁、怎么学、会产出什么，再把仓库拉到本地开始实践。",
    lessons: [
      {
        title: "课程 readme",
        desc: "针对文科生/非技术背景的 vibe coding 课：学习如何把脑中的想法变成产品，理解产品基本流程、AI 参与方式、仓库学习路径和社群协作方式。",
        learn: "做产品思路；学这个仓库的思路",
        out: "/",
        prep: "能访问 GitHub"
      }
    ]
  },
  {
    label: "先导篇",
    badge: "基础环境",
    intro: "通过第一个极简项目，完成 KimiCode、VSCode、GitHub 和本地网页的基础体验。",
    lessons: [
      {
        title: "先导篇 01：学这个项目/开始做产品的基础环境&感受第一个项目",
        desc: "用 Kimi Agent 和 Kimi Code 的一句话生成网页案例解释什么是 vibe coding，说明为什么使用 KimiCode，并完成在 VSCode 中使用 KimiCode 的基础流程。",
        learn: "终端、KimiCode 安装与基本使用、VSCode 安装与使用、GitHub 基础使用",
        out: "一个很简单的本地 html 网页",
        prep: "下载安装 KimiCode、VSCode，通过 GitHub 拉仓库到本地；用一句话 prompt 写第一个本地能打开的静态网页",
        href: "lessons/lesson-01.html"
      }
    ]
  },
  {
    label: "基础篇",
    badge: "产品与开发基础",
    intro: "从和 Agent 协作、产品 sense、全栈环境、后端和部署开始，逐步建立能做产品的基础能力。",
    lessons: [
      {
        title: "基础篇 01：如何和 Agent 打交道",
        desc: "做一个有基本产品 sense 的静态网页。了解产品工作的流程（非部署部分），学习如何通过 superpower 类 skill 完成 brainstorm、细化需求和前端设计。",
        learn: "prompt、skill、agent 基本原理；产品需求 => 产品、产品体验的基本产品知识",
        out: "一个好看的本地 html 网页",
        prep: "理解 KimiCode 的基本原理和操作；会下载安装、使用 Skill",
        href: "lessons/lesson-02.html"
      },
      {
        title: "基础篇 02：AI 时代全栈开发的基本环境",
        desc: "待补充",
        learn: "待补充",
        out: "待补充",
        prep: "待补充"
      },
      {
        title: "基础篇 03：接后端",
        desc: "待补充",
        learn: "待补充",
        out: "待补充",
        prep: "待补充"
      },
      {
        title: "基础篇 04：部署",
        desc: "待补充",
        learn: "待补充",
        out: "待补充",
        prep: "待补充"
      },
      {
        title: "基础篇 05：产品知识总结，如何从需求到产品，优秀案例拆解",
        desc: "待补充",
        learn: "待补充",
        out: "待补充",
        prep: "待补充"
      },
      {
        title: "基础篇 06：如何用 KimiCode 处理开发外的事",
        desc: "待补充",
        learn: "待补充",
        out: "待补充",
        prep: "待补充"
      }
    ]
  },
  {
    label: "进阶篇",
    badge: "项目实战",
    intro: "围绕可交付项目练习：网页、扩展、小程序、iOS App、自我进化和上线审核。",
    lessons: [
      {
        title: "项目 01：定时舆情分析网页",
        desc: "待补充",
        learn: "待补充",
        out: "待补充",
        prep: "待补充"
      },
      {
        title: "项目 02：做一个 Chrome 扩展",
        desc: "待补充",
        learn: "待补充",
        out: "待补充",
        prep: "待补充"
      },
      {
        title: "项目 03：做一个微信小程序",
        desc: "待补充",
        learn: "待补充",
        out: "待补充",
        prep: "待补充"
      },
      {
        title: "项目 04：做一个 iOS APP",
        desc: "待补充",
        learn: "待补充",
        out: "待补充",
        prep: "待补充"
      },
      {
        title: "项目 05：AI 的自我进化",
        desc: "待补充",
        learn: "待补充",
        out: "待补充",
        prep: "待补充"
      },
      {
        title: "项目 06：部署上线与审核",
        desc: "待补充",
        learn: "待补充",
        out: "待补充",
        prep: "待补充"
      }
    ]
  }
];

const container = document.querySelector(".stages");
const progressKey = "kimicode-course-completed-lesson";
const getCompletedLesson = () => Number(localStorage.getItem(progressKey) || "0");

// 渲染先导篇 + 基础篇
if (container) {
  let lessonCount = 0;
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
      lessonCount += 1;
      const card = document.createElement("article");
      card.className = numbered ? "lesson-row reveal" : "lesson-row lesson-row--bare reveal";
      card.dataset.lesson = String(lessonCount);
      card.style.transitionDelay = (i % 3) * 80 + "ms";
      const rail = numbered
        ? `<div class="lesson-row__rail">
          <span class="lesson-row__num">${String(lessonCount).padStart(2, "0")}</span>
        </div>`
        : "";
      card.innerHTML = `
        ${rail}
        <div class="lesson-row__body">
          <div class="lesson-row__head">
            <h3>${l.title}</h3>
          </div>
          <p class="lesson-row__desc">${l.desc}</p>
          <div class="lesson-row__meta">
            <div class="lesson-row__out"><span>新学到的东西</span><strong>${l.learn}</strong></div>
            <div class="lesson-row__out"><span>当节产出</span><strong>${l.out}</strong></div>
            <div class="lesson-row__out"><span>实践准备/实操作业</span><strong>${l.prep}</strong></div>
          </div>
          ${l.href ? `<a class="lesson-row__action" href="${l.href}">进入课程</a>` : `<span class="lesson-row__action lesson-row__action--disabled" aria-disabled="true">待更新</span>`}
        </div>
      `;
      track.appendChild(card);
    });

    block.appendChild(track);
    container.appendChild(block);
  });

  const applyUnlockState = () => {
    const completed = getCompletedLesson();
    const nextUnlocked = Math.min(completed + 1, lessonCount);
    document.querySelectorAll(".lesson-row").forEach((row) => {
      const lesson = Number(row.dataset.lesson);
      const action = row.querySelector(".lesson-row__action");
      const isComplete = lesson <= completed;
      const isLocked = lesson > nextUnlocked;

      row.classList.toggle("is-complete", isComplete);
      row.classList.toggle("is-locked", isLocked);

      if (action) {
        action.textContent = isComplete ? "复习课程" : isLocked ? "待解锁" : "进入课程";
        action.setAttribute("aria-disabled", String(isLocked));
      }
    });
  };

  applyUnlockState();

  container.addEventListener("click", (event) => {
    const action = event.target.closest(".lesson-row__action");
    if (!action) return;
    const row = action.closest(".lesson-row");
    if (row?.classList.contains("is-locked")) {
      event.preventDefault();
    }
  });
}

// 给其他区块加上进场动画
document.querySelectorAll(".feature-card, .outcome-card, .section__head, .who__text, .who__quote, .cta-band > *:not(.orb)")
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


// 数字织机背景：在「适合谁」区块里铺一层 canvas，画一批随机生成的正弦丝线，
// 缓慢横向流动，并用半透明黑色逐帧叠加做出拖尾。改写自一个 React 组件，适配纯 JS + 单色风格。
(function digitalLoom() {
  const canvas = document.querySelector(".who__loom");
  if (!canvas) return;

  const section = canvas.closest(".who");
  const ctx = canvas.getContext("2d");
  if (!ctx || !section) return;

  // 单色风格：白色细丝，配合页面的纯黑画布与白色辉光
  const BG = "#000000";
  const THREAD_COLOR = "rgba(255, 255, 255, 0.42)";
  const THREAD_COUNT = 48;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let threads = [];
  let animId = null;

  class Thread {
    constructor() { this.reset(true); }
    reset(spawnAnywhere) {
      this.x = spawnAnywhere ? Math.random() * width : 0;
      this.y = Math.random() * height;
      this.speed = Math.random() * 0.5 + 0.1;
      this.amplitude = Math.random() * 20 + 10;
      this.frequency = Math.random() * 0.02 + 0.01;
      this.phase = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.speed;
      if (this.x > width) { this.x = 0; this.y = Math.random() * height; }
    }
    draw() {
      const startX = Math.max(this.x - 200, 0);
      ctx.beginPath();
      ctx.moveTo(startX, this.y + Math.sin(startX * this.frequency + this.phase) * this.amplitude);
      for (let i = startX; i < this.x; i++) {
        ctx.lineTo(i, this.y + Math.sin(i * this.frequency + this.phase) * this.amplitude);
      }
      ctx.strokeStyle = THREAD_COLOR;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }

  function setup() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    threads = Array.from({ length: THREAD_COUNT }, () => new Thread());

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, width, height);
  }

  function renderOnce() {
    // 静态一帧：尊重「减少动态」偏好时只画一次
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    threads.forEach((t) => t.draw());
  }

  function animate() {
    // 半透明黑色逐帧叠加 → 丝线留下渐隐拖尾
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = "lighter";
    threads.forEach((t) => { t.update(); t.draw(); });

    animId = requestAnimationFrame(animate);
  }

  function start() {
    if (reduceMotion) { renderOnce(); return; }
    if (animId == null) animId = requestAnimationFrame(animate);
  }
  function stop() {
    if (animId != null) { cancelAnimationFrame(animId); animId = null; }
  }

  setup();
  if (reduceMotion) {
    renderOnce();
  } else {
    // 只在区块进入视口时才跑动画，省电；观察 canvas 本身，
    // 当它在窄屏被 display:none 时没有布局盒，动画自然保持停止。
    const vis = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? start() : stop()));
    }, { threshold: 0 });
    vis.observe(canvas);
  }

  // 尺寸变化时重建（区块高度会随响应式布局变化）
  let resizeTimer = null;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const wasRunning = animId != null;
      stop();
      setup();
      if (reduceMotion) renderOnce();
      else if (wasRunning) start();
    }, 150);
  };
  window.addEventListener("resize", onResize);
})();
