import * as core from '@actions/core';
import { ComposerHelper } from './helpers/ComposerHelper.js';
import { PhpHelper } from './helpers/PhpHelper.js';
import { FileHelper } from './helpers/FileHelper.js';
import { InputHelper } from './helpers/InputHelper.js';
import { DependencyHelper } from './helpers/DependencyHelper.js';

/**
 * Main function to run the action
 */
export async function run() {
  try {
    await DependencyHelper.checkPhpExists();
    await DependencyHelper.checkComposerExists();

    const outputFile = InputHelper.outputFile;
    const projectPath = InputHelper.projectPath;

    await ComposerHelper.optimizeAutoloader(projectPath);
    const classmapPath = ComposerHelper.getClassmapPath(projectPath);
    await ComposerHelper.checkClassmapExists(classmapPath);
    const classes = await PhpHelper.extractClassesFromClassmap(classmapPath);
    await FileHelper.writeClassesToFile(outputFile, classes);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
