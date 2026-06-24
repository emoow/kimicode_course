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
    label: "第一阶段",
    badge: "建立信心",
    intro: "先用最短路径做出能展示的成品，理解 prompt 为什么有效，并完成 KimiCode 基础环境准备。",
    lessons: [
      {
        title: "第一节：先做一个很酷的东西",
        desc: "用一句已验证有效的 prompt 生成 3D 可交互月球网页，再拆解 prompt 的主体、细节、交互和氛围。",
        out: "3D 可交互月球网页",
        prep: "无需课前准备",
        href: "lessons/lesson-01.html"
      },
      {
        title: "第二节：造一个你自己的简易版 Manus",
        desc: "理解 agent = 会规划的大脑 + 一堆 skill，写 orchestration prompt，让它自己拆步骤、调能力、汇总交付物。",
        out: "会规划并调用多个 skill 的 agent",
        prep: "IDE + CLI 配置",
        href: "lessons/lesson-02.html"
      }
    ]
  },
  {
    label: "第二阶段",
    badge: "工程化入门",
    intro: "把对话里的能力搬成真正项目，接真实 API，并开始处理数据、登录、数据库和定时任务。",
    lessons: [
      {
        title: "第三节：把 Manus 做成真正的项目",
        desc: "学习 Git、Node、Next.js、.env 和 API 调用，把简易 Manus 搬成一个本地可运行的网页项目。",
        out: "接真实 API 的 Next.js 网页",
        prep: "GitHub 账号",
        href: "lessons/lesson-03.html"
      },
      {
        title: "第四节：定时舆情分析网页",
        desc: "优先使用官方 API 获取数据，加入数据库、登录验证和定时任务，做一个能持续更新的分析看板。",
        out: "能登录、定时抓取、分析的看板",
        prep: "Reddit 或 GitHub API key",
        href: "lessons/lesson-04.html"
      }
    ]
  },
  {
    label: "第三阶段",
    badge: "多形态产品",
    intro: "把 Vibe Coding 迁移到浏览器扩展、小程序、iOS App、部署上线和 Agent 自我优化。",
    lessons: [
      {
        title: "第五节：做一个 Chrome 扩展",
        desc: "学习 extension manifest、content script、popup 等核心结构，做一个能装进自己浏览器的小工具。",
        out: "Chrome 扩展",
        prep: "无需额外准备",
        href: "lessons/lesson-05.html"
      },
      {
        title: "第六节：做一个微信小程序",
        desc: "学习小程序结构、微信开发者工具和审核流程，完成一个能在模拟器里跑通的小程序。",
        out: "微信小程序",
        prep: "小程序账号",
        href: "lessons/lesson-06.html"
      },
      {
        title: "第七节：Xcode 的秘密",
        desc: "学习 iOS 项目结构、SwiftUI、API 调用和应用签名，完成一个自己写的 iOS App。",
        out: "iOS App",
        prep: "Mac、Xcode、Apple ID",
        href: "lessons/lesson-07.html"
      },
      {
        title: "第八节：封装与部署",
        desc: "把前面每个项目送上线，处理环境变量、云端定时、平台配置、商店或审核流程。",
        out: "上线作品合集",
        prep: "各平台账号",
        href: "lessons/lesson-08.html"
      },
      {
        title: "第九节：AI 的自我进化",
        desc: "学习 OpenClaw 框架、prompt 改写、反馈循环和自我评估机制，做一个会自我优化的 agent 系统。",
        out: "会自我优化的 agent 系统",
        prep: "Python 环境、前两节基础",
        href: "lessons/lesson-09.html"
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
            <div class="lesson-row__out"><span>当节产出</span><strong>${l.out}</strong></div>
            <div class="lesson-row__out"><span>课前准备</span><strong>${l.prep}</strong></div>
          </div>
          <a class="lesson-row__action" href="${l.href}">进入课程</a>
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
