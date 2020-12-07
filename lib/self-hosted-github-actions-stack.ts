import { Port, SecurityGroup, Vpc, Protocol } from "@aws-cdk/aws-ec2";
import { Cluster, ContainerImage, Secret } from "@aws-cdk/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "@aws-cdk/aws-ecs-patterns";
import * as secretsmanager from "@aws-cdk/aws-secretsmanager";
import { App, Stack, StackProps } from "@aws-cdk/core";
import path = require("path");

export class SelfHostedGitHubActionsStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "self-hosted-github-actions", { maxAzs: 2 });
    const cluster = new Cluster(this, 'fargate-service-autoscaling', { vpc });
    const pat = secretsmanager.Secret.fromSecretNameV2(this, "pat", "stephen-cloud-github-pat");
    const securityGroup = new SecurityGroup(this, "Ingress", { vpc });
    securityGroup.addIngressRule(securityGroup, Port.allTcp());

    new ApplicationLoadBalancedFargateService(this, "github-builder", {
      cluster,
      securityGroups: [
        securityGroup
      ],
      taskImageOptions: {
        image: ContainerImage.fromAsset(path.resolve(__dirname, '../build-image')),
        secrets: {
          PAT: Secret.fromSecretsManager(pat)
        }
      },
    });
  }
}
