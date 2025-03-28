const report = require("multiple-cucumber-html-reporter");

var date= new Date();
var currentDate=date.getDate()+'_'+(date.getMonth()+1)+'_'+date.getFullYear()+'_'+date.getHours()+'_'+date.getMinutes()+'_'+date.getSeconds();
report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright Automation Report",
    pageTitle: "Orange HRMS Application test report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "129",
        },
        device: "Pradyumna - PC",
        platform: {
            name: "Windows",
            version: "11",
        },
    },
    customData: {
        title: "Run Info",
        data: [
            { label: "Project", value: "Orange HRMS Application" },
            { label: "Release", value: "Sprint 10" },
            { label: "Cycle", value: "1" },
            { label: "Execution Start Time", value: currentDate },
            { label: "Execution End Time", value: currentDate }
        ],
    },
});