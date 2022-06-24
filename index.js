const { Telegraf } = require('telegraf');
const bot = new Telegraf('5490923315:AAG3_F4Ubw-Gq5ZA7A3GPyycjaVu1G1z94U');

const Weather = require('weather-api-client');

const weather = new Weather('b08202b6c6a4420f93d111044222406');



const oweather = require('openweather-apis');

/*const OpenWeatherAPI = require("openweather-api-node")

let weather = new OpenWeatherAPI({
    key: "a19788e1395356593e94261159b2ec59",
    locationName: "New York",
    units: "imperial"
})*/

bot.hears('/start', (ctx) => {

  ctx.reply(`Hello, ${ctx.from}!\nGet weather info right now with us:`, {
        reply_markup: {
            inline_keyboard: [
                [ { text: "Weather", callback_data: 'getweather' }, { text: "Notify", callback_data: 'notify'} ],

                [ { text: "Info", callback_data: 'info' } ]
            ]
        }
    });
});

bot.action('getweather', (ctx) => {
  ctx.deleteMessage();
	ctx.reply('How do you want to choose city?', {
        reply_markup: {
            inline_keyboard: [
                [ { text: "By Name", callback_data: 'getweathername' }, { text: "By Location (recommended)", callback_data: 'getweatherlocaton'} ],
            ]
        }
  });

  bot.action('getweatherlocaton', (ctx) => {
    ctx.reply('Okay. Now just send me location...');

    bot.on('location', (ctx) => {


      oweather.setLang('en');
      oweather.setCoordinate(ctx.message.location.latitude, ctx.message.location.longitude);
      oweather.setUnits('metric');
      oweather.setAPPID('a19788e1395356593e94261159b2ec59');

      oweather.getAllWeather(function(err, JSONObj){
        weather.getCurrent(JSONObj.name).then(result => {
          ctx.replyWithPhoto({ url: `https:${result.current.condition.icon}` });
          ctx.reply("<C>OK<C>")
          ctx.reply(`**${result.location.name}**\n${result.current.condition.text}\nTemp: **${result.current.temp_c}**\nHumidity: **${result.current.humidity}%**\nWind: **${result.current.wind_kph}km/h**`);
      	});
        });
        //ctx.reply(`Place: **${JSONObj.lat}**\nTemp: **${Math.round10(JSONObj.main.temp, -1)}**\nHumidity: **${JSONObj.main.humidity}%**\nWind: **${JSONObj.wind.speed}km/h**`);
    	});






    });

});

bot.action('info',(ctx) => {
  ctx.deleteMessage();
  //ctx.replyWithSticker('AAMCAgADGQEAARVWiWK1q-nfgZ_8vbzmbK8lBD2_cgx7AAKmEgACeUBoSi_iG1qytp4qAQAHbQADKQQ');
  ctx.reply("👋Hello!\nIm glad to see you in my bot!\nHere you can find easy access to current forecast");
});

bot.hears('/all', (ctx) => {
  ctx.reply("There are all our channels", {
        reply_markup: {
            inline_keyboard: [
                [ { text: "MiyaGi", url: "https://t.me/miyagi_musicchannel" } ],
            ]
        }
    });
})

bot.hears('/weather', (ctx) => {
  ctx.reply('How do you want to choose city?', {
        reply_markup: {
            inline_keyboard: [
                [ { text: "By Name", callback_data: 'getweathername' }, { text: "By Location (recommended)", callback_data: 'getweatherlocaton'} ],
            ]
        }
  });

  bot.action('getweatherlocaton', (ctx) => {
    ctx.reply('Okay. Now just send me location...');

    bot.on('location', (ctx) => {


      oweather.setLang('en');
      oweather.setCoordinate(ctx.message.location.latitude, ctx.message.location.longitude);
      oweather.setUnits('metric');
      oweather.setAPPID('a19788e1395356593e94261159b2ec59');

      oweather.getAllWeather(function(err, JSONObj){
        weather.getCurrent(JSONObj.name).then(result => {
          ctx.replyWithPhoto({ url: `https:${result.current.condition.icon}` });
          ctx.reply("<C>OK<C>")
          ctx.reply(`**${result.location.name}**\n${result.current.condition.text}\nTemp: **${result.current.temp_c}**\nHumidity: **${result.current.humidity}%**\nWind: **${result.current.wind_kph}km/h**`);
      	});
        });
        //ctx.reply(`Place: **${JSONObj.lat}**\nTemp: **${Math.round10(JSONObj.main.temp, -1)}**\nHumidity: **${JSONObj.main.humidity}%**\nWind: **${JSONObj.wind.speed}km/h**`);
    	});

    });
})

bot.action('notify', (ctx) => {
  ctx.reply('Sorry! Nothing here yet👋')
})

bot.hears('/notify', (ctx) => {
  ctx.reply('Sorry! Nothing here yet👋')
})

bot.hears('/info', (ctx) => {
  ctx.deleteMessage();
  //ctx.replyWithSticker('AAMCAgADGQEAARVWiWK1q-nfgZ_8vbzmbK8lBD2_cgx7AAKmEgACeUBoSi_iG1qytp4qAQAHbQADKQQ');
  ctx.reply("👋Hello!\nIm glad to see you in my bot!\nHere you can find easy access to current forecast");

})

bot.launch()
