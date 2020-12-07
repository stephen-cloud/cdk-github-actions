#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { SelfHostedGitHubActionsStack } from '../lib/self-hosted-github-actions-stack';

const app = new App();
new SelfHostedGitHubActionsStack(app, 'self-hosted-github-actions');
