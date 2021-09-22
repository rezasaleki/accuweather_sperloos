const inquirer = require('inquirer');

module.exports = {
  askAccuWeatherFindUlr: () => {
    const questions = [
      {
        name: 'url',
        type: 'input',
        message: 'Please Enter URL : ',
        validate: function( value ) {
          if (value.length) {
            if (!(/^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/.test(value))){
                return 'Please enter the correct url'; 
            }
            return true;
          } else {
            return 'Please again enter url.! ';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
};