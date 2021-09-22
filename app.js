const helper = require('./utilities/helper');
const inquirer = require('./utilities/inquirer');
const services = require('./utilities/services');

const Urls = [
  // {
  //   url :  'https://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328' 
  // }
];

helper.welcomeTextCommandLine('Sperloos');

const run = async () => {

  Urls.push(await inquirer.askAccuWeatherFindUlr());
  Urls.push({
    url: 'https://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328',
    status: 'daily'
  })
  const response = await services.getAllData(Urls);
  const monthlyStatus = response[0]['status'];
  const dailyStatus = response[1]['status'];
  if (monthlyStatus === 'monthly') {
    services.saveNewJSON(helper.generateMonthlyData(response), 'current‌MonthAccuWeather');
  }
  if (dailyStatus === 'daily') {
    services.saveNewJSON(helper.generateDailyAccuWeather(response), 'currentDailyAccuWeather');
  }
};

run();



