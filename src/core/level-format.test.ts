import { describe, it, expect } from 'vitest';
import { parseLevel } from './level-format';

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
