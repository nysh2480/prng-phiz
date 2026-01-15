# PhiZ (ΦZ) PRNG

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRNG](https://img.shields.io/badge/Type-32--bit%20Non--cryptographic%20PRNG-brightgreen.svg)]()
[![Performance](https://img.shields.io/badge/Performance-Extremely%20Fast%20(in%20JS)-orange.svg)]()

**PhiZ (ΦZ)** is an ultra-minimalist 32-bit pseudorandom number generator independently developed for JavaScript. With just **three lines of core logic**, it achieves excellent statistical properties while maintaining extreme simplicity and high speed.

**PhiZ（ファイズ）**は、JavaScript向けに独自開発された超軽量32ビット擬似乱数生成器です。たった3行のコードで高い統計的品質と極めて高速な動作を実現しています。

---

"Developed via a custom-built real-time PRNG tester. Optimized down to 3 lines of code using 32-bit integer arithmetic and Weyl sequences for maximum throughput in V8."

---

## 🚀 Features / 特徴

- **Ultra Minimalist** — Core algorithm is only 3 lines long  
  コア部分がわずか3行という究極の簡潔さ
- **Extremely Fast** — Optimized for modern JavaScript JIT engines (V8, SpiderMonkey, etc.)  
  最新JSエンジンで極めて高速に動作
- **Excellent Statistical Quality** — Near-perfect bit balance (~50.0%), strong avalanche effect, and good spatial uniformity  
  ビット分布が極めて均等、強力な雪崩効果、優れた空間充填性
- **Zero-Seed Safe** — Produces quality output even when seeded with `0`  
  シードが `0` でも即座に良好な乱数を生成
- **Full Period Potential** — Capable of traversing all 2³² states with appropriate seeding  
  適切なシードでフル周期を実現可能

> **Important**: PhiZ is a **non-cryptographic** PRNG. Not suitable for security or cryptographic purposes.

---

## 📝 The Algorithm / アルゴリズム

PhiZ is built on three original, tightly integrated steps:

1. **Golden ratio–based increment** (`+ 0x9E3779B9`)  
   → Promotes uniform traversal of the 32-bit state space
2. **Self-rotated multiplication**  
   → Multiplies the state by its own 16-bit rotated version — introducing strong nonlinearity with zero extra constants
3. **XOR-shift whitening**  
   → Final fold to eliminate any remaining low-bit patterns

```javascript
next() {
    let s = (this.state = (this.state + 0x9E3779B9) | 0);           // Golden ratio increment
    s = Math.imul(s, (s << 16) | (s >>> 16));                       // Self-rotated multiplication
    return (s ^= s >>> 15) >>> 0;                                   // Final whitening

}

