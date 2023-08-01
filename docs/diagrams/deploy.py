from diagrams import Diagram, Cluster
from diagrams.aws.compute import Lambda
from diagrams.aws.ml import Personalize
from diagrams.aws.analytics import KinesisDataStreams, KinesisDataFirehose, Athena, Quicksight, Glue
from diagrams.onprem.client import Client
from diagrams.aws.storage import S3
from diagrams.onprem.vcs import Github
from diagrams.custom import Custom
from diagrams.programming.framework import React
with Diagram('デプロイ フロー',filename="../astro/public/images/deploy",):
    cl = Client()
    with Cluster("GithubActions"):
        GA = Custom('Github Actions','../../../diagrams/icons/githubactions-svgrepo-com.png')
        Custom('Astro','../../../diagrams/icons/astro.png')
        React("React")
        Custom('Jest','../../../diagrams/icons/jest-svgrepo-com.png')
        Custom('Storybook','../../../diagrams/icons/storybook-icon-svgrepo-com.png')

    cl >> Github('develop branch') >> GA >> Github('Github Pages')
    with Cluster("Vercel Pipeline"):
        Vercel = Custom('Vercel Pipeline','../../../diagrams/icons/vercel-icon-svgrepo-com.png')
        Custom('Next.js','../../../diagrams/icons/next-dot-js-svgrepo-com.png')
    cl >> Github('main branch') >> Vercel