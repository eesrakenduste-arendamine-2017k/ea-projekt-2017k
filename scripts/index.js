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

    this.spent_sleeping = {start: 0, end: 0};
    this.spent_sportig = {start: 0, end: 0};

    this.coffe_count = [];
    this.junkfood_count = [];
    this.meal_count = [];
    this.sweets_count = [];

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
            localStorage.setItem("sport", JSON.stringify({sport: master.spent_sportig}));
            localStorage.setItem("sleeping", JSON.stringify({sleep: master.spent_sleeping}));
            localStorage.setItem("sweets", JSON.stringify({sweets: master.sweets_count}));
            localStorage.setItem("coffe", JSON.stringify({coffe: master.coffe_count}));
            localStorage.setItem("meal", JSON.stringify({meal: master.meal_count}));
            localStorage.setItem("junkfood", JSON.stringify({junkfood: master.junkfood_count}));

        }, 2000);

    },

    increase_coffee: function () {
        this.coffe_count.push(Date.now());
        console.log("Coffee", this.coffe_count);
    },

    increase_junkfood: function () {
        this.junkfood_count.push(Date.now());
        console.log("Junkfood", this.junkfood_count);

    },

    increase_meal: function () {
        this.meal_count.push(Date.now());
        console.log("Meal", this.meal_count);

    },

    increase_sweets: function () {
        this.sweets_count.push(Date.now());
        console.log("Sweets", this.sweets_count);

    },

    add_sleeptimer: function () {
        if (this.sleep_on === 0) {
            this.sleep_on = 1;
            this.spent_sleeping.start = Date.now();
        } else {
            this.sleep_on = 0;
            this.spent_sleeping.end = Date.now();
            console.log("Saved sleeping time");
        }
    },

    add_sporttimer: function () {
        if (this.sport_on === 0) {
            this.sport_on = 1;
                this.spent_sportig.start = Date.now();
        } else {
            this.sport_on = 0;
            this.spent_sportig.end = Date.now();
            console.log("Saved sporting time.")

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