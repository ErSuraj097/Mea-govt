export interface RendererOptions {
  canvas: HTMLCanvasElement;
}

export interface Renderer {
  ready: Promise<void>;
  dispose: () => void;
}

export function createRenderer({ canvas }: RendererOptions): Renderer {
  let isDisposed = false;
  let animId: number | null = null;
  let resizeObserver: ResizeObserver | null = null;

  // Initialize WebGL
  const gl =
    canvas.getContext('webgl', { antialias: true, alpha: false }) ||
    (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  const handlePointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    }
  };

  canvas.addEventListener('pointermove', handlePointerMove);

  if (!gl) {
    // 2D Fallback if WebGL unavailable
    const ctx = canvas.getContext('2d');
    let time = 0;

    const render2D = () => {
      if (isDisposed || !ctx) return;
      const w = (canvas.width = canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2));
      const h = (canvas.height = canvas.clientHeight * Math.min(window.devicePixelRatio || 1, 2));
      time += 0.015;

      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.2;

      // Outer accretion glow
      const grad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 2.5);
      grad.addColorStop(0, 'rgba(255, 153, 51, 0.8)');
      grad.addColorStop(0.3, 'rgba(235, 100, 20, 0.4)');
      grad.addColorStop(0.7, 'rgba(11, 61, 145, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Black hole center
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Photon ring
      ctx.strokeStyle = 'rgba(255, 220, 150, 0.9)';
      ctx.lineWidth = 2;
      ctx.stroke();

      animId = requestAnimationFrame(render2D);
    };

    render2D();

    return {
      ready: Promise.resolve(),
      dispose: () => {
        isDisposed = true;
        canvas.removeEventListener('pointermove', handlePointerMove);
        if (animId) cancelAnimationFrame(animId);
      }
    };
  }

  // WebGL Implementation
  const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;

    #define PI 3.14159265359

    mat2 rot(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, -s, s, c);
    }

    // Hash & Noise
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p = p * 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

      // Camera tilt with mouse
      uv += u_mouse * 0.08;

      float dist = length(uv);
      float angle = atan(uv.y, uv.x);

      // Gravitational lensing bending radius
      float rs = 0.22; // Schwarzschild radius
      float photonSphere = rs * 1.5;

      vec3 col = vec3(0.01, 0.015, 0.03); // Deep cosmic void

      // Background starry space distorted by gravity
      float lensedDist = dist + (rs * rs * 0.6) / max(dist, 0.001);
      vec2 lensedUV = vec2(cos(angle), sin(angle)) * lensedDist;
      
      float stars = pow(hash(floor(lensedUV * 40.0)), 20.0) * 1.5;
      col += vec3(stars * 0.9, stars * 0.95, stars);

      // Accretion Disk Physics Simulation
      if (dist > rs * 0.8) {
        // Disk angle with orbital rotation velocity (differential Keplerian velocity)
        float speed = 1.2 / pow(dist + 0.1, 1.2);
        float diskAngle = angle + u_time * speed * 0.6;
        
        // Disk coordinate projection
        vec2 diskUV = vec2(cos(diskAngle), sin(diskAngle)) * dist;
        diskUV.y *= 2.8; // Tilt disk perspective
        
        float diskDist = length(diskUV);
        float diskMask = smoothstep(rs * 1.0, rs * 1.6, diskDist) * smoothstep(rs * 4.2, rs * 2.0, diskDist);
        
        float density = fbm(vec2(diskDist * 12.0 - u_time * 0.8, diskAngle * 4.0));
        density = pow(density, 1.4);

        // Relativistic Doppler beaming effect (one side is brighter & bluer)
        float doppler = 1.0 + 0.8 * cos(angle + PI * 0.25);

        // Warm fiery accretion gradient with subtle blue relativistic boost
        vec3 diskColor = mix(
          vec3(1.0, 0.45, 0.1),  // Saffron / Gold
          vec3(1.0, 0.9, 0.5),   // Hot core
          smoothstep(rs * 1.2, rs * 1.9, diskDist)
        );
        diskColor = mix(diskColor, vec3(0.3, 0.6, 1.0), smoothstep(0.7, 1.8, doppler) * 0.35);

        col += diskColor * diskMask * density * doppler * 2.2;
      }

      // Photon Ring (Bright optical edge around shadow)
      float ring = smoothstep(0.02, 0.0, abs(dist - photonSphere * 0.95));
      col += vec3(1.0, 0.85, 0.6) * ring * 2.0;

      // Event Horizon / Black Hole Shadow (Pure singularity)
      float shadow = smoothstep(rs * 0.96, rs * 0.88, dist);
      col *= (1.0 - shadow);

      // Subtle atmospheric halo / lensing glow
      float halo = exp(-dist * 4.0) * 0.4;
      col += vec3(0.1, 0.25, 0.6) * halo;

      // Vignette
      float vig = 1.0 - smoothstep(0.5, 1.4, length(gl_FragCoord.xy / u_resolution.xy - 0.5));
      col *= vig;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
    const shader = glCtx.createShader(type);
    if (!shader) return null;
    glCtx.shaderSource(shader, source);
    glCtx.compileShader(shader);
    if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
      glCtx.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (!vs || !fs) {
    return { ready: Promise.resolve(), dispose: () => {} };
  }

  const program = gl.createProgram();
  if (!program) {
    return { ready: Promise.resolve(), dispose: () => {} };
  }

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return { ready: Promise.resolve(), dispose: () => {} };
  }

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  const timeLocation = gl.getUniformLocation(program, 'u_time');
  const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]),
    gl.STATIC_DRAW
  );

  let startTime = performance.now();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = Math.floor(canvas.clientWidth * dpr);
    const displayHeight = Math.floor(canvas.clientHeight * dpr);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  resizeObserver = new ResizeObserver(() => {
    resize();
  });
  resizeObserver.observe(canvas);

  const render = () => {
    if (isDisposed) return;

    resize();

    // Smooth mouse lerp
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const currentTime = (performance.now() - startTime) * 0.001;
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, currentTime);
    gl.uniform2f(mouseLocation, mouseX, mouseY);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    animId = requestAnimationFrame(render);
  };

  render();

  return {
    ready: Promise.resolve(),
    dispose: () => {
      isDisposed = true;
      canvas.removeEventListener('pointermove', handlePointerMove);
      if (resizeObserver) resizeObserver.disconnect();
      if (animId) cancelAnimationFrame(animId);
      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      }
    }
  };
}
