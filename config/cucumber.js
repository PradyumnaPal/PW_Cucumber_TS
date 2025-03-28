module.exports={
    default: {
      tags: process.env.npm_config_TAGS||"",
      paths: [
        "src/test/features/"
      ],
      formatOptions: {
        snippetInterface: "async-await"
      },
      dryRun: false,
      require: [
        "src/test/steps/*.ts",
        "src/helper/utils/hooks.ts"
      ],
      requireModule: [
        "ts-node/register"
      ],
      format: [
        "progress-bar",
        "html:test-results/cucumber-report.html",
        "json:test-results/cucumber-report.json",
        "rerun:@rerun.txt"
      ],
      parallel: 2
    },
    "rerun": {
      formatOptions: {
        snippetInterface: "async-await"
      },
      dryRun: false,
      require: [
        "src/test/steps/*.ts",
        "src/helper/utils/hooks.ts"
      ],
      requireModule: [
        "ts-node/register"
      ],
      format: [
        "progress-bar",
        "html:test-results/cucumber-report.html",
        "json:test-results/cucumber-report.json",
        "rerun:@rerun.txt"
      ],
      parallel: 2
    }
  }