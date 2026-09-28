import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const framesDir = path.resolve('public/frames');
if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

// Download source images if not already in /tmp
const ovenUrl = 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?q=85&w=1200&auto=format&fit=crop';
const emergingUrl = 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=85&w=1200&auto=format&fit=crop';
const finalUrl = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=85&w=1200&auto=format&fit=crop';

console.log('Downloading base assets...');
execSync(`curl -s -o /tmp/oven_base.jpg "${ovenUrl}"`);
execSync(`curl -s -o /tmp/emerge_base.jpg "${emergingUrl}"`);
execSync(`curl -s -o /tmp/final_base.jpg "${finalUrl}"`);

// Standardize base images to 960x640
execSync('convert /tmp/oven_base.jpg -resize 960x640^ -gravity center -extent 960x640 /tmp/oven_std.jpg');
execSync('convert /tmp/emerge_base.jpg -resize 960x640^ -gravity center -extent 960x640 /tmp/emerge_std.jpg');
execSync('convert /tmp/final_base.jpg -resize 960x640^ -gravity center -extent 960x640 /tmp/final_std.jpg');

const TOTAL_FRAMES = 20;

console.log(`Generating ${TOTAL_FRAMES} sequential frames...`);

for (let i = 1; i <= TOTAL_FRAMES; i++) {
  const pad = String(i).padStart(2, '0');
  const filename = `pizza-reveal-${pad}.jpg`;
  const outPath = path.join(framesDir, filename);

  const progress = (i - 1) / (TOTAL_FRAMES - 1); // 0.0 to 1.0

  if (progress <= 0.35) {
    // Stage 1: Deep in oven -> moving to oven mouth
    // Zoom factor from 100% to 115%
    const p1 = progress / 0.35;
    const zoom = 100 + Math.round(p1 * 18);
    // Orange fire brightness
    const fireGlow = Math.round(110 - p1 * 10);
    
    // Slight blend with emerging pizza towards end of stage 1
    const blendEmerge = Math.round(p1 * 35);
    
    execSync(`
      convert /tmp/oven_std.jpg -resize ${zoom}% -gravity center -extent 960x640 \
      \\( /tmp/emerge_std.jpg -resize ${zoom}% -gravity center -extent 960x640 \\) \
      -compose blend -define compose:args=${100 - blendEmerge},${blendEmerge} -composite \
      -modulate 100,${fireGlow},100 \
      -quality 86 "${outPath}"
    `);
  } else if (progress <= 0.75) {
    // Stage 2: Sliding out on the peel through oven opening
    const p2 = (progress - 0.35) / 0.40; // 0 to 1
    const zoom = 110 + Math.round(p2 * 12);
    const blendFinal = Math.round(p2 * 75);

    execSync(`
      convert /tmp/emerge_std.jpg -resize ${zoom}% -gravity center -extent 960x640 \
      \\( /tmp/final_std.jpg -resize ${zoom}% -gravity center -extent 960x640 \\) \
      -compose blend -define compose:args=${100 - blendFinal},${blendFinal} -composite \
      -quality 88 "${outPath}"
    `);
  } else {
    // Stage 3: Fully out, hot & fresh on wooden peel/table
    const p3 = (progress - 0.75) / 0.25; // 0 to 1
    const zoom = 105 + Math.round(p3 * 8);

    execSync(`
      convert /tmp/final_std.jpg -resize ${zoom}% -gravity center -extent 960x640 \
      -unsharp 0x0.75+0.75+0.008 \
      -quality 88 "${outPath}"
    `);
  }

  // Also copy to public root so both /frames/pizza-reveal-XX.jpg and /pizza-reveal-XX.jpg work
  fs.copyFileSync(outPath, path.join('public', filename));
  console.log(`Generated frame ${i}/${TOTAL_FRAMES}: ${filename}`);
}

console.log('All 20 frames generated successfully!');
