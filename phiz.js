/**
 * PhiZ (ΦZ) - Ultra-minimalist, high-performance 32-bit PRNG
 * Optimized for JavaScript JIT compilers.
 * * @author DFS-PRNG Project / PhiZ Working Group
 * @license MIT
 */

export class PhiZ {
	/**
	 * @param {number} seed - 初期シード値 (32bit)
	 */
	constructor(seed = 0) {
		this.state = seed | 0;
	}

	/**
	 * 32ビット符号なし整数を生成 (0 〜 4,294,967,295)
	 * @returns {number}
	 */
	next() {
		// 1. 状態更新: 黄金比定数を用いた Weyl Sequence
		// 周期 2^32 を保証しつつ、全ビットを均等に歩進させる
		let s = (this.state = (this.state + 0x9E3779B9) | 0);

		// 2. 自己参照回転乗算 (Self-Referential Rotational Multiplication)
		// 16ビット回転させた自分自身を掛けることで、一撃で強力な非線形拡散を起こす
		s = Math.imul(s, (s << 16) | (s >>> 16));

		// 3. 出力ホワイトニング (XOR-Shift Fold)
		// 上位ビットの情報を下位に混ぜ込み、統計的な偏りを完全に除去する
		return (s ^= s >>> 16) >>> 0;
	}

	/**
	 * 0以上1未満の浮動小数点を生成 (Math.random 互換)
	 * @returns {number}
	 */
	random() {
		return this.next() / 4294967296.0;
	}

	/**
	 * 指定した範囲 [min, max) の整数を生成
	 * @param {number} min 
	 * @param {number} max 
	 * @returns {number}
	 */
	range(min, max) {
		return ((this.random() * (max - min)) + min) | 0;
	}
}

/**
 * Factory function style (より高速な実行が必要な場合用)
 * @param {number} seed 
 * @returns {Function}
 */
export const createPhiZ = (seed = 0) => {
	let state = seed | 0;
	return () => {
		let s = (state = (state + 0x9E3779B9) | 0);
		s = Math.imul(s, (s << 16) | (s >>> 16));
		return (s ^= s >>> 16) >>> 0;
	};
};