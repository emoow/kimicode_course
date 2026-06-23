// hero 区的 3D 月球：只渲染月球本体，缓慢自转，无任何交互。
// 纹理与光照取自原始 3D 月球示例，去掉了星空、辉光、流星与控制器。
(function () {
  const container = document.querySelector(".hero__moon");
  if (!container || typeof THREE === "undefined") return;

  // ---- 程序化生成漫反射贴图 ----
  function generateMoonTexture() {
    const size = 2048;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size / 2;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#c8c8c8");
    gradient.addColorStop(0.5, "#b8b8b8");
    gradient.addColorStop(1, "#a0a0a0");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 15;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    function drawCrater(x, y, radius, depth) {
      const shadowGrad = ctx.createRadialGradient(x - radius * 0.2, y - radius * 0.2, 0, x, y, radius);
      shadowGrad.addColorStop(0, `rgba(80, 80, 80, ${depth})`);
      shadowGrad.addColorStop(0.7, `rgba(120, 120, 120, ${depth * 0.5})`);
      shadowGrad.addColorStop(1, "rgba(160, 160, 160, 0)");
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      const rimGrad = ctx.createRadialGradient(x, y, radius * 0.85, x, y, radius * 1.05);
      rimGrad.addColorStop(0, "rgba(200, 200, 200, 0)");
      rimGrad.addColorStop(0.5, `rgba(220, 220, 220, ${depth * 0.3})`);
      rimGrad.addColorStop(1, "rgba(180, 180, 180, 0)");
      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.1, 0, Math.PI * 2);
      ctx.fill();

      const floorGrad = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.9);
      floorGrad.addColorStop(0, `rgba(90, 90, 90, ${depth * 0.6})`);
      floorGrad.addColorStop(1, `rgba(130, 130, 130, ${depth * 0.2})`);
      ctx.fillStyle = floorGrad;
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    const maria = [
      { x: 0.25, y: 0.35, r: 120, d: 0.8 },
      { x: 0.72, y: 0.45, r: 100, d: 0.7 },
      { x: 0.45, y: 0.65, r: 90, d: 0.6 },
      { x: 0.15, y: 0.6, r: 80, d: 0.7 },
      { x: 0.85, y: 0.3, r: 70, d: 0.5 },
      { x: 0.6, y: 0.25, r: 85, d: 0.6 },
      { x: 0.35, y: 0.8, r: 75, d: 0.5 }
    ];
    maria.forEach((m) => drawCrater(m.x * canvas.width, m.y * canvas.height, m.r, m.d));

    for (let i = 0; i < 150; i++) {
      drawCrater(Math.random() * canvas.width, Math.random() * canvas.height, 10 + Math.random() * 40, 0.3 + Math.random() * 0.5);
    }
    for (let i = 0; i < 400; i++) {
      drawCrater(Math.random() * canvas.width, Math.random() * canvas.height, 2 + Math.random() * 10, 0.2 + Math.random() * 0.3);
    }
    for (let i = 0; i < 20; i++) {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height;
      const length = 50 + Math.random() * 200;
      const angle = Math.random() * Math.PI * 2;
      ctx.strokeStyle = `rgba(200, 200, 200, ${0.1 + Math.random() * 0.2})`;
      ctx.lineWidth = 1 + Math.random() * 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * length, cy + Math.sin(angle) * length);
      ctx.stroke();
    }
    return canvas;
  }

  // ---- 程序化生成凹凸贴图 ----
  function generateBumpMap() {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size / 2;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function drawBumpCrater(x, y, radius, depth) {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      const val = Math.floor(128 - depth * 60);
      grad.addColorStop(0, `rgb(${val}, ${val}, ${val})`);
      grad.addColorStop(0.8, `rgb(${128 - depth * 30}, ${128 - depth * 30}, ${128 - depth * 30})`);
      grad.addColorStop(1, "rgb(128, 128, 128)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const maria = [
      { x: 0.25, y: 0.35, r: 60, d: 0.9 },
      { x: 0.72, y: 0.45, r: 50, d: 0.8 },
      { x: 0.45, y: 0.65, r: 45, d: 0.7 },
      { x: 0.15, y: 0.6, r: 40, d: 0.8 },
      { x: 0.85, y: 0.3, r: 35, d: 0.6 },
      { x: 0.6, y: 0.25, r: 42, d: 0.7 },
      { x: 0.35, y: 0.8, r: 37, d: 0.6 }
    ];
    maria.forEach((m) => drawBumpCrater(m.x * canvas.width, m.y * canvas.height, m.r, m.d));

    for (let i = 0; i < 200; i++) {
      drawBumpCrater(Math.random() * canvas.width, Math.random() * canvas.height, 5 + Math.random() * 20, 0.3 + Math.random() * 0.6);
    }
    for (let i = 0; i < 1000; i++) {
      drawBumpCrater(Math.random() * canvas.width, Math.random() * canvas.height, 1 + Math.random() * 5, 0.1 + Math.random() * 0.3);
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 10;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  // ---- 场景 / 相机 / 渲染器 ----
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.set(0, 0, 13);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // ---- CRT 后期处理：把月球场景先渲染到离屏纹理，再经过一块全屏 shader ----
  // 效果：桶形畸变、扫描线、RGB 色散、暗角、轻微闪烁与磷光网格。
  const rtParams = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat
  };
  const renderTarget = new THREE.WebGLRenderTarget(1, 1, rtParams);

  const crtScene = new THREE.Scene();
  const crtCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const crtUniforms = {
    tDiffuse: { value: renderTarget.texture },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) }
  };

  const crtMaterial = new THREE.ShaderMaterial({
    uniforms: crtUniforms,
    transparent: true,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D tDiffuse;
      uniform float uTime;
      uniform vec2 uResolution;

      // 桶形畸变：把平面 UV 往球面外推，模拟 CRT 玻璃的弧度
      vec2 barrel(vec2 uv, float amt) {
        vec2 cc = uv - 0.5;
        float dist = dot(cc, cc);
        return uv + cc * dist * amt;
      }

      void main() {
        vec2 uv = barrel(vUv, 0.18);

        // 畸变后超出边界的区域设为全透明，避免拉伸的边缘
        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
          gl_FragColor = vec4(0.0);
          return;
        }

        // RGB 色散：三个通道各自轻微偏移
        float shift = 0.0016 + 0.0010 * sin(uTime * 0.7);
        vec4 cr = texture2D(tDiffuse, uv + vec2(shift, 0.0));
        vec4 cg = texture2D(tDiffuse, uv);
        vec4 cb = texture2D(tDiffuse, uv - vec2(shift, 0.0));
        vec3 color = vec3(cr.r, cg.g, cb.b);
        float alpha = max(cr.a, max(cg.a, cb.a));

        // 扫描线：随分辨率密集分布，并缓慢上滚
        float scan = sin((uv.y * uResolution.y * 1.6) - uTime * 3.0);
        color *= 0.88 + 0.12 * scan;

        // 磷光网格：垂直方向的 RGB 子像素条带
        float mask = 0.92 + 0.08 * sin(uv.x * uResolution.x * 3.14159);
        color *= mask;

        // 轻微闪烁与扫描亮带
        float flicker = 0.97 + 0.03 * sin(uTime * 22.0);
        float bar = 0.985 + 0.015 * sin(uv.y * 3.0 - uTime * 1.2);
        color *= flicker * bar;

        // 暗角
        vec2 vc = uv - 0.5;
        float vignette = smoothstep(0.85, 0.25, dot(vc, vc) * 2.2);
        color *= 0.55 + 0.45 * vignette;

        // 整体偏冷的 CRT 荧光色调 + 轻微提亮高光
        color = mix(color, color * vec3(0.92, 0.98, 1.06), 0.5);
        color += pow(max(cg.g, 0.0), 3.0) * 0.06;

        gl_FragColor = vec4(color, alpha);
      }
    `
  });

  const crtQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), crtMaterial);
  crtScene.add(crtQuad);

  // ---- 月球本体 ----
  const diffuseTexture = new THREE.CanvasTexture(generateMoonTexture());
  diffuseTexture.wrapS = THREE.RepeatWrapping;
  diffuseTexture.wrapT = THREE.ClampToEdgeWrapping;

  const bumpTexture = new THREE.CanvasTexture(generateBumpMap());
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.ClampToEdgeWrapping;

  const moonGeometry = new THREE.SphereGeometry(5, 128, 128);
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: diffuseTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.15,
    roughness: 0.9,
    metalness: 0.1,
    displacementMap: bumpTexture,
    displacementScale: 0.05
  });

  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  // 轻微轴倾，让自转看起来更自然
  moon.rotation.z = 0.12;
  scene.add(moon);

  // ---- 光照 ----
  scene.add(new THREE.AmbientLight(0x111111, 0.4));

  const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
  sunLight.position.set(50, 20, 30);
  scene.add(sunLight);

  const earthShine = new THREE.DirectionalLight(0x4466aa, 0.3);
  earthShine.position.set(-50, -10, -30);
  scene.add(earthShine);

  // ---- 尺寸自适应 ----
  function resize() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    // 离屏目标按实际像素分辨率走，扫描线密度才跟得上
    const pr = renderer.getPixelRatio();
    renderTarget.setSize(Math.floor(w * pr), Math.floor(h * pr));
    crtUniforms.uResolution.value.set(w, h);
  }
  resize();
  window.addEventListener("resize", resize);

  // ---- 动画：仅自转，尊重减少动态偏好 ----
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!reduceMotion) moon.rotation.y += 0.0012;

    crtUniforms.uTime.value = clock.getElapsedTime();

    // 1) 月球场景渲染到离屏纹理
    renderer.setRenderTarget(renderTarget);
    renderer.clear();
    renderer.render(scene, camera);

    // 2) 经 CRT shader 渲染到屏幕
    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(crtScene, crtCamera);
  }
  animate();
})();
