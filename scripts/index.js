"use strict";
function Master(){
    this.sleep_on = 0;
    this.sport_on = 0;

    this.spent_sleeping = 0;
    this.spent_sportig = 0;

    this.coffe_count = 0;
    this.junkfood_count = 0;
    this.meal_count = 0;
    this.sweets_count = 0;

    this.add_button_functionality();
}

Master.prototype = {

    add_button_functionality: function () {
        document.getElementById("button1").addEventListener("dblclick", this.increase_coffee.bind(this) );
        document.getElementById("button2").addEventListener("dblclick", this.increase_junkfood.bind(this));
        document.getElementById("button3").addEventListener("dblclick", this.increase_sweets.bind(this));
        document.getElementById("button4").addEventListener("dblclick", this.increase_meal.bind(this));
        document.getElementById("button5").addEventListener("dblclick", this.add_sleeptimer.bind(this));
        document.getElementById("button6").addEventListener("dblclick", this.add_sporttimer.bind(this));

    },

    increase_coffee: function () {
        this.coffe_count++
    },

    increase_junkfood: function () {
        this.junkfood_count++
    },

    increase_meal: function () {
        this.meal_count++
    },

    increase_sweets: function () {
        this.sweets_count++
    },

    add_sleeptimer: function () {

    },

    add_sporttimer: function () {

    }



};



window.onload = function () {
    var master = new Master();
    window.master = master;
};