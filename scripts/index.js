"use strict";
function Master() {

    if (Master.instance) {
        return Master.instance;
    }
    Master.instance = this;

    this.sleep_on = 0;
    this.sport_on = 0;

    this.sleep_tiktok = 0;
    this.sport_tiktok = 0;

    this.spent_sleeping = 0;
    this.spent_sportig = 0;

    this.coffe_count = 0;
    this.junkfood_count = 0;
    this.meal_count = 0;
    this.sweets_count = 0;

    this.registerServiceWorker();

    this.add_button_functionality();
}

Master.prototype = {

    add_button_functionality: function () {
        document.getElementById("btn1").addEventListener("click", this.increase_coffee.bind(this));
        document.getElementById("btn2").addEventListener("click", this.increase_junkfood.bind(this));
        document.getElementById("btn3").addEventListener("click", this.increase_sweets.bind(this));
        document.getElementById("btn4").addEventListener("click", this.increase_meal.bind(this));
        document.getElementById("btn5").addEventListener("click", this.add_sleeptimer.bind(this));
        document.getElementById("btn6").addEventListener("click", this.add_sporttimer.bind(this));

        setInterval(function () {
            var dt = new Date().getTime();
            localStorage.setItem("sport", JSON.stringify({date: dt, sport: master.spent_sportig}));
            localStorage.setItem("sleeping", JSON.stringify({date: dt, sleep: master.spent_sleeping}));
            localStorage.setItem("sweets", JSON.stringify({date: dt, sweets: master.sweets_count}));
            localStorage.setItem("coffe", JSON.stringify({date: dt, coffe: master.coffe_count}));
            localStorage.setItem("meal", JSON.stringify({date: dt, meal: master.meal_count}));
            localStorage.setItem("junkfood", JSON.stringify({date: dt, junkfood: master.junkfood_count}));

        }, 5000);

    },

    increase_coffee: function () {
        this.coffe_count++;
        console.log("Coffee", this.coffe_count);
    },

    increase_junkfood: function () {
        this.junkfood_count++;
        console.log("Junkfood", this.junkfood_count);

    },

    increase_meal: function () {
        this.meal_count++;
        console.log("Meal", this.meal_count);

    },

    increase_sweets: function () {
        this.sweets_count++;
        console.log("Sweets", this.sweets_count);

    },

    add_sleeptimer: function () {
        if (this.sleep_on === 0) {
            this.sleep_on = 1;
            this.sleep_tiktok = setInterval(function () {
                master.spent_sleeping++;
                console.log("Sleeping", master.spent_sleeping)
            }, 1000);
        } else {
            this.sleep_on = 0;
            clearInterval(this.sleep_tiktok)
        }
    },

    add_sporttimer: function () {
        if (this.sport_on === 0) {
            this.sport_on = 1;
            this.sport_tiktok = setInterval(function () {
                master.spent_sportig++;
                console.log("Sporting", master.spent_sportig)
            }, 1000);
        } else {
            this.sport_on = 0;
            clearInterval(this.sport_tiktok);
        }
    },

    registerServiceWorker: function () {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('../scripts/serviceWorker.js').then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful: ', registration);

            }, function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        }
    }
};


window.onload = function () {
    var master = new Master();
    window.master = master;
};