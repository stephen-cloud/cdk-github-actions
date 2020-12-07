#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkGithubActionsStack } from '../lib/cdk-github-actions-stack';

const app = new cdk.App();
new CdkGithubActionsStack(app, 'CdkGithubActionsStack');
