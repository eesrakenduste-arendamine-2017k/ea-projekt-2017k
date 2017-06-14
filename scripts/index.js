"use strict";
function Master() {

    if (Master.instance) {
        return Master.instance;
    }
    Master.instance = this;

    this.sleep_on = 0;
    this.sport_on = 0;


    this.spent_sleeping = {start: [], end: [], time: [], today: []};
    this.spent_sporting = {start: [], end: [], time: []};

    this.coffee_count = [];
    this.junkfood_count = [];
    this.meal_count = [];
    this.sweets_count = [];


    this.add_button_functionality();
    this.addSoundEffects();


    $(window).resize(function () {
        $('.stat-button').css('height', ($(window).height() - $('.navbar').height()) / 6);
        $('.stat-button').css('line-height', $('.stat-button').css('height'));
    });
    $(window).trigger('resize');
}


Master.prototype = {

    add_button_functionality: function () {
        document.getElementById("coffee").addEventListener("click", this.increase_coffee.bind(this));
        document.getElementById("junkfood").addEventListener("click", this.increase_junkfood.bind(this));
        document.getElementById("sweets").addEventListener("click", this.increase_sweets.bind(this));
        document.getElementById("meal").addEventListener("click", this.increase_meal.bind(this));
        document.getElementById("sleep").addEventListener("click", this.add_sleeptimer.bind(this));
        document.getElementById("sport").addEventListener("click", this.add_sporttimer.bind(this));

        setInterval(function () {
            localStorage.setItem("sport", JSON.stringify({sport: master.spent_sporting}));
            localStorage.setItem("sleeping", JSON.stringify(master.spent_sleeping));
            localStorage.setItem("sweets", JSON.stringify({sweets: master.sweets_count}));
            localStorage.setItem("coffee", JSON.stringify({coffee: master.coffee_count}));
            localStorage.setItem("meal", JSON.stringify({meal: master.meal_count}));
            localStorage.setItem("junkfood", JSON.stringify({junkfood: master.junkfood_count}));

        }, 2000);

    },

    increase_coffee: function () {
        this.coffee_count.push(Date.now());
        console.log("Coffee", this.coffee_count);
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
        var week_names = ["Pühapäev", "Esmapäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];
        var today =  week_names[new Date().getDay()];


        if (this.sleep_on === 0) {
            this.sleep_on = 1;
            this.spent_sleeping.start.push(Date.now());
        } else {
            this.sleep_on = 0;
            this.spent_sleeping.end.push(Date.now());
            this.spent_sleeping.time.push(this.spent_sleeping.end - this.spent_sleeping.start);
            this.spent_sleeping.today.push(today);
            console.log("Saved sleeping time");
        }
    },

    add_sporttimer: function () {

        if (this.sport_on === 0) {
            this.sport_on = 1;
            this.spent_sporting.start.push(Date.now());
        } else {
            this.sport_on = 0;
            this.spent_sporting.end = Date.now();
            this.spent_sporting.time = this.spent_sporting.end - this.spent_sporting.start;
            console.log("Saved sporting time.")

        }
    },


    registerServiceWorker: function () {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('../serviceWorker.js').then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful: ', registration);

            }, function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        }
    },

    addSoundEffects: function () {
        $(".stat-button").each(function () {
            $(this).click(function () {
                var audio = new Audio('../button.mp4');
                audio.play();
            })
        })
    }


};


window.onload = function () {
    var master = new Master();
    window.master = master;


};