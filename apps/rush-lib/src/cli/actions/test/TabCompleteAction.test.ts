// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import '../../test/mockRushCommandLineParser';

import * as path from 'path';

import { TabCompleteAction } from '../TabCompleteAction';
import { RushCommandLineParser } from '../../RushCommandLineParser';

function arrayEqual(actual: string[], expected: string[]): boolean {
  return (
    actual.length === expected.length &&
    actual.sort().every((v: string, i: number) => {
      return v === expected.sort()[i];
    })
  );
}

describe('TabCompleteAction', () => {
  let oldExitCode: number | undefined;
  let oldArgs: string[];

  beforeEach(() => {
    jest.spyOn(process, 'exit').mockImplementation();
    oldExitCode = process.exitCode;
    oldArgs = process.argv;
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.exitCode = oldExitCode;
    process.argv = oldArgs;
  });

  describe(`Gets TabCompletions`, () => {
    it(`gets completion(s) for rush <tab>`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush';
      const actual: string[] = Array.from(tc.getCompletions(commandLine.trim(), commandLine.length));

      expect(actual.indexOf('add') !== -1).toBe(true);
      expect(actual.indexOf('check') !== -1).toBe(true);
      expect(actual.indexOf('build') !== -1).toBe(true);
      expect(actual.indexOf('rebuild') !== -1).toBe(true);
      expect(actual.indexOf('-d') !== -1).toBe(true);
      expect(actual.indexOf('--debug') !== -1).toBe(true);
      expect(actual.indexOf('--help') !== -1).toBe(true);
    });

    it(`gets completion(s) for rush a<tab>`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush a';
      const actual: string[] = Array.from(tc.getCompletions(commandLine.trim(), commandLine.length));

      const expected: string[] = ['add'];

      expect(arrayEqual(actual, expected)).toBe(true);
    });

    it(`gets completion(s) for rush build <tab>`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush build ';
      const actual: string[] = Array.from(tc.getCompletions(commandLine.trim(), commandLine.length));

      expect(actual.indexOf('-t') !== -1).toBe(true);
      expect(actual.indexOf('--to') !== -1).toBe(true);
      expect(actual.indexOf('-f') !== -1).toBe(true);
      expect(actual.indexOf('--from') !== -1).toBe(true);
    });

    it(`gets completion(s) for rush build -<tab>`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush build -';
      const actual: string[] = Array.from(tc.getCompletions(commandLine.trim(), commandLine.length));

      expect(actual.indexOf('-t') !== -1).toBe(true);
      expect(actual.indexOf('--to') !== -1).toBe(true);
      expect(actual.indexOf('-f') !== -1).toBe(true);
      expect(actual.indexOf('--from') !== -1).toBe(true);
    });

    it(`gets completion(s) for rush build -t <tab>`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush build -t ';
      const actual: string[] = Array.from(tc.getCompletions(commandLine.trim(), commandLine.length));

      const expected: string[] = ['abc', 'def'];

      expect(arrayEqual(actual, expected)).toBe(true);
    });

    it(`gets completion(s) for rush build -t a<tab>`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush build -t a';
      const actual: string[] = Array.from(tc.getCompletions(commandLine.trim(), commandLine.length));

      const expected: string[] = ['abc'];

      expect(arrayEqual(actual, expected)).toBe(true);
    });

    it(`gets completion(s) for rush change --bump-type <tab>`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush change --bump-type ';
      const actual: string[] = Array.from(tc.getCompletions(commandLine.trim(), commandLine.length));

      const expected: string[] = ['major', 'minor', 'patch', 'none'];

      expect(arrayEqual(actual, expected)).toBe(true);
    });

    it(`gets completion(s) for rush change --bulk <tab>`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush change --bulk ';
      const actual: string[] = Array.from(tc.getCompletions(commandLine.trim(), commandLine.length));

      expect(actual.indexOf('--bulk') !== -1).toBe(true);
      expect(actual.indexOf('--message') !== -1).toBe(true);
      expect(actual.indexOf('--bump-type') !== -1).toBe(true);
      expect(actual.indexOf('--verify') !== -1).toBe(true);
    });

    it(`gets completion(s) for rush change --bump-type m<tab>`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush change --bump-type m';
      const actual: string[] = Array.from(tc.getCompletions(commandLine.trim(), commandLine.length));

      const expected: string[] = ['major', 'minor'];

      expect(arrayEqual(actual, expected)).toBe(true);
    });

    it(`gets completion(s) for rush change --message <tab>`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush change --message ';
      const actual: string[] = Array.from(tc.getCompletions(commandLine.trim(), commandLine.length));

      const expected: string[] = [];

      expect(arrayEqual(actual, expected)).toBe(true);
    });

    it(`gets completion(s) for rush change --message "my change log message" --bump-type <tab>`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush change --message "my change log message" --bump-type ';
      const actual: string[] = Array.from(tc.getCompletions(commandLine.trim(), commandLine.length));

      const expected: string[] = ['major', 'minor', 'patch', 'none'];

      expect(arrayEqual(actual, expected)).toBe(true);
    });

    it(`gets completion(s) for rush change --message "my change log message" --bump-type m<tab>`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush change --message "my change log message" --bump-type m';
      const actual: string[] = Array.from(tc.getCompletions(commandLine.trim(), commandLine.length));

      const expected: string[] = ['major', 'minor'];

      expect(arrayEqual(actual, expected)).toBe(true);
    });
  });

  describe(`Tokenize command line`, () => {
    it(`tokenizes "rush change -"`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush change -';
      const actual: string[] = Array.from(tc.tokenizeCommandLine(commandLine.trim()));

      const expected: string[] = ['rush', 'change', '-'];

      expect(arrayEqual(actual, expected)).toBe(true);
    });
    it(`tokenizes 'rush change -m "my change log"'`, () => {
      const startPath: string = path.resolve(__dirname, 'tabComplete');
      // Create a Rush CLI instance. This instance is heavy-weight and relies on setting process.exit
      // to exit and clear the Rush file lock. So running multiple `it` or `describe` test blocks over the same test
      // repo will fail due to contention over the same lock which is kept until the test runner process
      // ends.
      jest.spyOn(process, 'cwd').mockReturnValue(startPath);
      const parser: RushCommandLineParser = new RushCommandLineParser({ cwd: startPath });
      const tc: TabCompleteAction = new TabCompleteAction(parser);

      const commandLine: string = 'rush change -m "my change log"';
      const actual: string[] = Array.from(tc.tokenizeCommandLine(commandLine.trim()));

      const expected: string[] = ['rush', 'change', '-m', 'my change log'];

      expect(arrayEqual(actual, expected)).toBe(true);
    });
  });
});