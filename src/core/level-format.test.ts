import { describe, it, expect } from 'vitest';
import { parseLevel, levelToText } from './level-format';
import type { Level } from './types';

describe('parseLevel', () => {
  it('グリッドサイズ・ブロック・ゲートを解釈する', () => {
    const lv = parseLevel(`
grid:
.rr.
..r.
....
gates:
top 0-2 red
`);
    expect(lv.cols).toBe(4);
    expect(lv.rows).toBe(3);
    expect(lv.blocks).toHaveLength(1);
    expect(lv.blocks[0].color).toBe('red');
    expect(lv.blocks[0].cells).toEqual(
      expect.arrayContaining([{ c: 1, r: 0 }, { c: 2, r: 0 }, { c: 2, r: 1 }]),
    );
    expect(lv.blocks[0].cells).toHaveLength(3);
    expect(lv.gates).toEqual([{ edge: 'top', start: 0, end: 2, color: 'red' }]);
  });

  it('連結成分ごとに別ブロックになる（同色でも非連結なら分かれる）', () => {
    const lv = parseLevel(`
grid:
r..r
gates:
top 0-3 red
`);
    expect(lv.blocks).toHaveLength(2);
    expect(lv.blocks.every((b) => b.color === 'red')).toBe(true);
  });

  it('別文字で隣接同色ブロックを分けられる', () => {
    const lv = parseLevel(`
grid:
rR
gates:
top 0-1 red
`);
    expect(lv.blocks).toHaveLength(2);
    expect(lv.blocks.every((b) => b.color === 'red')).toBe(true);
  });

  it('単一セルのゲート範囲を解釈する', () => {
    const lv = parseLevel(`
grid:
b.
gates:
left 0 blue
`);
    expect(lv.gates[0]).toEqual({ edge: 'left', start: 0, end: 0, color: 'blue' });
  });

  it('levelToText: 3つ以上の同色ブロックが入り組んで隣接していても誤って結合しない', () => {
    // A=(0,0), E=(1,2), D=(1,1), C=(1,0) の4つの独立した赤1マスブロック。
    // C は A にも D にも隣接しており、2文字（小文字/大文字）だけでは
    // 「A=r, D=R」の両方と衝突しない文字を選べず、C が D と同じ文字になって
    // 誤結合していたバグの再現ケース。
    const lv: Level = {
      cols: 3,
      rows: 3,
      blocks: [
        { id: 'a', color: 'red', cells: [{ c: 0, r: 0 }] },
        { id: 'e', color: 'red', cells: [{ c: 1, r: 2 }] },
        { id: 'd', color: 'red', cells: [{ c: 1, r: 1 }] },
        { id: 'c', color: 'red', cells: [{ c: 1, r: 0 }] },
      ],
      gates: [{ edge: 'top', start: 0, end: 2, color: 'red' }],
    };
    const round = parseLevel(levelToText(lv));
    expect(round.blocks).toHaveLength(4);
    expect(round.blocks.every((b) => b.color === 'red')).toBe(true);
  });

  it('未知の文字はエラー', () => {
    expect(() => parseLevel(`
grid:
x.
gates:
top 0 red
`)).toThrow();
  });

  it('不正なゲート行はエラー', () => {
    expect(() => parseLevel(`
grid:
r.
gates:
sideways 0 red
`)).toThrow();
  });
});
