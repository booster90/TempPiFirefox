/******
 * START APP
 *
 * jpm run -b /Applications/FirefoxDeveloperEdition.app
 *
 */

// data
const Request = require("sdk/request").Request,
    { ToggleButton } = require('sdk/ui/button/toggle'),
    { setInterval } = require("sdk/timers"),
    panels = require("sdk/panel"),
    self = require("sdk/self");
    
/**
 * Promise first make request() -> return lastTemp -> promise.then(lastTemp) 
 */
let promise = new Promise((resolve, reject) => {
    Request({
        url: "http://malina.dev/PomiarTemperatury/mobile.php",
        overrideMimeType: "text/plain; charset=latin1",
        onComplete: function (response) {
            const length = response.json.length - 1,
                lastGetTemperature = response.json[length - 1].temperatura;

            lastTemp = response.json[length - 1].temperatura;

            // return promise (successMessage)
            resolve(lastTemp + '°C');
        }
    }).get();
});

promise.then((successMessage) => {
    // successMessage is whatever we passed in the resolve(...) function above.

    const button = ToggleButton({
        id: "my-button",
        label: "show temperature in room",
        icon: {
            "16": "./icon-16.png",
            "32": "./icon-32.png",
            "64": "./icon-64.png"
        },
        badge: successMessage,
        badgeColor: "#123E9D",
        onChange: (state) => {
            // getting data from json  on click
            Request({
                url: "http://malina.dev/PomiarTemperatury/mobile.php",
                overrideMimeType: "text/plain; charset=latin1",
                onComplete: function (response) {
                    const length = response.json.length - 1,
                        lastGetTemperature = response.json[length - 1].temperatura;

                    button.label = `last get temperature was ${button.badge}`;
                    button.badge = `${lastGetTemperature}°C`;
                }
            }).get();
        }
    });
});


// update every 15minutes
setInterval(() => {
    // do something every 15 min
    Request({
        url: "http://malina.dev/PomiarTemperatury/mobile.php",
        overrideMimeType: "text/plain; charset=latin1",
        onComplete: function (response) {
            const length = response.json.length - 1,
                lastGetTemperature = response.json[length - 1].temperatura;

            button.label = `last get temperature was ${button.badge}`;
            button.badge = `${lastGetTemperature}°C`;
        }
    }).get();
}, 1e3 * 60 * 15);
