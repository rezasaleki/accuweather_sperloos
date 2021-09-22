const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const cheerio = require('cheerio');
const figlet = require('figlet');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },
  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },
  welcomeTextCommandLine: (text) => {
    console.log(
      chalk.yellow(
        figlet.textSync(`${text}`, { horizontalLayout: 'full' })
      )
    );
  },
  generateMonthlyData: (response) => {
    let crawlDataAccuWeather = {};
    const $ = cheerio.load(response[0]['data']);
    const headers = $('.monthly-header').find('.day-text .day-short-name').text();
    const monthly = $('.map-dropdown-toggle > h2').text();
    crawlDataAccuWeather[monthly] = [];
    $('.monthly-calendar > .monthly-daypanel').each((i, data) => {
      let date = $(data).find(".monthly-panel-top > .date").text().replace(/\t|\n/g, '');
      crawlDataAccuWeather[monthly].push({
        [date] : {
          high: $(data).find(".temp > .high").text().replace(/\t|\n/g, ''),
          low: $(data).find(".temp > .low").text().replace(/\t|\n/g, '')
        }
      });
    });
    return crawlDataAccuWeather;
  },
  generateDailyAccuWeather: (response) => {
    let crawlDataAccuWeather = {};
    const $ = cheerio.load(response[1]['data']);
    const header = $('.content-module > .module-title').text();
    crawlDataAccuWeather[header] = [];
    $('.content-module > .daily-wrapper').each((i, data) => {
      crawlDataAccuWeather[header].push({
        dateName: $(data).find('.daily-forecast-card > .info > .date > .dow').text().replace(/\t|\n/g, ''),
        date: $(data).find('.daily-forecast-card > .info > .date > .sub').text().replace(/\t|\n/g, ''),
        low: $(data).find('.daily-forecast-card > .info > .temp > .low').text().replace(/\t|\n/g, ''),
        high: $(data).find('.daily-forecast-card > .info > .temp > .high').text().replace(/\t|\n/g, ''),
        image: $(data).find('.daily-forecast-card > .info > img').prop('src'),
        precip: $(data).find('.daily-forecast-card > .precip').text().replace(/\t|\n/g, ''),
        phrase: $(data).find('.daily-forecast-card > .phrase').text().replace(/\t|\n/g, '')
      })
    });
    return crawlDataAccuWeather;
  }
};