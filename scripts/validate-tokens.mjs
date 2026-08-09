import fs from "node:fs";
import path from "node:path";
import { converter, wcagContrast } from "culori";

const filePath = path.join(process.cwd(), "tokens", "background.tokens.json");
const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
const toRgb = converter("rgb");

function get(pathValue) {
  return pathValue.split(".").reduce((acc, key) => acc[key], raw).value;
}

function contrast(a, b) {
  const aRgb = toRgb(a);
  const bRgb = toRgb(b);
  return wcagContrast(aRgb, bRgb);
}

const checks = [
  {
    name: "Primary text contrast on base canvas",
    score: contrast(get("color.text.primary"), get("color.canvas.base")),
    min: 7
  },
  {
    name: "Secondary text contrast on base canvas",
    score: contrast(get("color.text.secondary"), get("color.canvas.base")),
    min: 4.5
  },
  {
    name: "Primary text contrast on surface-1",
    score: contrast(get("color.text.primary"), get("color.surface.1")),
    min: 7
  }
];

const failures = checks.filter((check) => check.score < check.min);

if (failures.length > 0) {
  console.error("Token validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure.name}: ${failure.score.toFixed(2)} < ${failure.min}`);
  }
  process.exit(1);
}

console.log("Token validation passed:");
for (const check of checks) {
  console.log(`- ${check.name}: ${check.score.toFixed(2)} (min ${check.min})`);
}
