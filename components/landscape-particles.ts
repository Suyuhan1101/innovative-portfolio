type Direction = "up" | "down";
type Shard = {
  width: number; height: number; start: number; spread: number; speed: number;
  angle: number; turn: number; phase: number; curl: number; curlSpeed: number; opacity: number;
};

const tau = Math.PI * 2;
const shapes = [
  [[-.5, -.38], [.28, -.5], [.5, .34], [-.31, .5]],
  [[-.5, -.5], [.5, -.18], [-.12, .5]],
  [[-.33, -.5], [.5, -.3], [.29, .5], [-.5, .24]],
  [[-.5, -.2], [.18, -.5], [.5, .5]],
  [[-.5, -.44], [.46, -.5], [.5, .18], [-.23, .5]],
];

function randomSequence(seed: number) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
}

export function createLandscapeStream(canvas: HTMLCanvasElement, photographs: HTMLImageElement[], direction: Direction) {
  const context = canvas.getContext("2d");
  const atlas = document.createElement("canvas");
  const paint = atlas.getContext("2d");
  let width = 0, height = 0, ratio = 1, columns = 1, cell = 1;
  let shards: Shard[] = [];
  const upward = direction === "up";
  const padding = 64;

  const resize = () => {
    if (!context || !paint) return;
    const rect = canvas.getBoundingClientRect();
    const nextWidth = Math.round(rect.width), nextHeight = Math.round(rect.height);
    const nextRatio = Math.min(window.devicePixelRatio || 1, 2);
    if (!nextWidth || !nextHeight || (width === nextWidth && height === nextHeight && ratio === nextRatio)) return;
    width = nextWidth; height = nextHeight; ratio = nextRatio;
    canvas.width = Math.ceil(width * ratio); canvas.height = Math.ceil(height * ratio);
    const compact = window.innerWidth <= 600;
    const count = Math.max(55, Math.round((compact ? 100 : Math.min(260, Math.max(160, width * .68))) * height / 900));
    const random = randomSequence(upward ? 7183 : 29611);
    shards = Array.from({ length: count }, (_, index) => {
      const size = index % 29 === 0 ? (compact ? 12 : 22) + random() * (compact ? 4 : 7) : (compact ? 3 : 5) + Math.pow(random(), 1.4) * (compact ? 8 : 13);
      return {
        width: size * (.78 + random() * .36), height: size * (.7 + random() * .4),
        start: (index + random() * .8) / count,
        spread: (random() + random() + random() - 1.5) * .29,
        speed: (compact ? 17 : 26) * (.72 + random() * .6),
        angle: random() * tau, turn: (random() - .5) * .16,
        phase: random() * tau, curl: (index % 7 === 0 ? 12 : 3) * (compact ? .6 : 1) * (.7 + random() * .6),
        curlSpeed: index % 7 === 0 ? 1.8 + random() * .5 : .35 + random() * .3,
        opacity: .76 + random() * .24,
      };
    });

    // Bake each small polygon crop once. Frames only transform and draw sprites.
    cell = Math.ceil(Math.max(...shards.map(shard => Math.max(shard.width, shard.height))) * ratio) + 4;
    columns = Math.ceil(Math.sqrt(count));
    atlas.width = columns * cell; atlas.height = Math.ceil(count / columns) * cell;
    shards.forEach((shard, index) => {
      const photograph = photographs[(Math.floor(index / 27) + (upward ? 0 : 2)) % photographs.length];
      const cropColumns = 18, cropWidth = photograph.naturalWidth / cropColumns;
      const cropRows = Math.max(1, Math.round(photograph.naturalHeight / cropWidth));
      const cropHeight = photograph.naturalHeight / cropRows;
      const column = (index % cropColumns + Math.floor(index / 54) * 5) % cropColumns;
      const row = (Math.floor(index / cropColumns) + (upward ? 2 : 7)) % cropRows;
      paint.save();
      paint.translate((index % columns) * cell + cell / 2, Math.floor(index / columns) * cell + cell / 2);
      paint.scale(ratio, ratio);
      paint.beginPath();
      shapes[index % shapes.length].forEach(([x, y], vertex) => {
        if (vertex === 0) paint.moveTo(x * shard.width, y * shard.height);
        else paint.lineTo(x * shard.width, y * shard.height);
      });
      paint.closePath(); paint.clip();
      paint.drawImage(photograph, column * cropWidth, row * cropHeight, cropWidth, cropHeight, -shard.width / 2, -shard.height / 2, shard.width, shard.height);
      paint.restore();
    });
    canvas.dataset.particles = String(count);
    canvas.dataset.ready = "true";
  };

  const draw = (seconds: number) => {
    if (!context || !width || !height) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    const span = height + padding * 2, size = cell / ratio;
    shards.forEach((shard, index) => {
      const distance = shard.start * span + (upward ? -1 : 1) * seconds * shard.speed;
      const y = ((distance % span) + span) % span - padding;
      const bend = y / height * tau * 1.12 + (upward ? .3 : 2.4);
      const center = width * (.5 + Math.sin(bend) * .18 + Math.sin(bend * 1.8 - seconds * .13) * .035);
      const curl = seconds * shard.curlSpeed + shard.phase;
      const spread = shard.spread * width * (.73 + .27 * Math.sin(bend + .8));
      const x = center + spread + Math.cos(curl) * shard.curl;
      const margin = Math.max(shard.width, shard.height) * .75 + 1;
      context.save();
      context.translate(Math.max(margin, Math.min(width - margin, x)), y + Math.sin(curl) * shard.curl * .8);
      context.rotate(shard.angle + seconds * shard.turn + Math.sin(curl) * .22);
      context.globalAlpha = shard.opacity;
      context.drawImage(atlas, (index % columns) * cell, Math.floor(index / columns) * cell, cell, cell, -size / 2, -size / 2, size, size);
      context.restore();
    });
  };

  return { resize, draw, dispose: () => { atlas.width = 0; atlas.height = 0; } };
}
