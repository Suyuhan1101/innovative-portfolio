import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import ts from 'typescript';

// Exercise the exact helper used by the provider, without a browser or app mocks.
const source = await readFile(new URL('../components/music-playback.ts', import.meta.url), 'utf8');
const js = ts.transpile(source, { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 });
const { nextTrackIndex, nextPlayMode } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);

test('play once stops on end but still permits manual skipping', () => {
  for (let index = 0; index < 6; index++) {
    assert.equal(nextTrackIndex(index, 6, 'once', true), null);
    assert.equal(nextTrackIndex(index, 6, 'once'), (index + 1) % 6);
  }
});
test('loop all visits every track in order and wraps back to the first', () => {
  let index = 0;
  const heard = [index];
  for (let step = 0; step < 6; step++) { index = nextTrackIndex(index, 6, 'loop', true); heard.push(index); }
  assert.deepEqual(heard, [0, 1, 2, 3, 4, 5, 0]);
});
test('shuffle can select every other song, including edge indices, without immediate repeats', () => {
  for (let current = 0; current < 6; current++) {
    const choices = new Set();
    for (let sample = 0; sample < 1000; sample++) {
      const next = nextTrackIndex(current, 6, 'shuffle', true, () => sample / 1000);
      assert.notEqual(next, current);
      assert.ok(next >= 0 && next < 6);
      choices.add(next);
    }
    assert.equal(choices.size, 5);
  }
});
test('only the three requested modes are cycled; empty and single-track lists are safe', () => {
  assert.equal(nextPlayMode('once'), 'loop');
  assert.equal(nextPlayMode('loop'), 'shuffle');
  assert.equal(nextPlayMode('shuffle'), 'once');
  for (const mode of ['once', 'loop', 'shuffle']) {
    assert.equal(nextTrackIndex(0, 0, mode), null);
    assert.equal(nextTrackIndex(0, 1, mode), 0);
  }
});
