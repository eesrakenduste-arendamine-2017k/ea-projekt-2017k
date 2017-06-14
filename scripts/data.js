function filter(master, range) {
    var filtered = {sweets: [], meals: [], junkfood: [], coffee: [], sleep: []};

    master.sweets.forEach(function (sweet_timestamp) {
        if (sweet_timestamp > range.week_begin && sweet_timestamp < range.week_end) {
            filtered.sweets.push(sweet_timestamp);
        }
    });


    master.meals.forEach(function (meal_timestamp) {
        if (meal_timestamp > range.week_begin && meal_timestamp < range.week_end) {
            filtered.meals.push(meal_timestamp);
        }
    });

    master.junkfood.forEach(function (junkfood_timestamp) {
        if (junkfood_timestamp > range.week_begin && junkfood_timestamp < range.week_end) {
            filtered.junkfood.push(junkfood_timestamp);
        }
    });

    master.coffee.forEach(function (coffee_timestamp) {
        if (coffee_timestamp > range.week_begin && coffee_timestamp < range.week_end) {
            filtered.coffee.push(coffee_timestamp);
        }
    });

    //master.sleeping.time.forEach(function (sleep_timestamp) {if (sleep_timestamp > range.week_begin && sleep_timestamp < range.week_end) {filtered.sleeping.push(sleep_timestamp);}});
    
    return filtered;
}


function week_data(master, day_number){
    var hours_slept = 0;
    var week_names = ["Pühapäev", "Esmapäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];

    for (i=0; i<master.sleeping.today.length; i++) {
        if(master.sleeping.today[i] === week_names[day_number]){
            hours_slept += master.sleeping.time[i]/1000.0/60.0;
        }

    }

    return hours_slept;

}


function getLastWeekRange() {
    week_begin = new Date(Sugar.Date.create("last monday")).getTime();
    week_end = new Date(Sugar.Date.create("sunday")).getTime();
    return {week_begin: week_begin, week_end: week_end}
}


function getThisWeekRange() {
    week_begin = new Date(Sugar.Date.create('this monday')).getTime();
    week_end = new Date(Sugar.Date.create("next monday"));
    return {week_begin: week_begin, week_end: week_end}
}


function makePie(canvas_id, input_data) {
    var date_range = getLastWeekRange();
    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext("2d");


    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Maiustused", "Söömaajad", "Rämpstoit", "Kohv"],
            datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6"
                ],
                data: [input_data.sweets.length, input_data.meals.length, input_data.junkfood.length, input_data.coffee.length]
            }]
        },
        options: {}
    })
}


function makeBar(canvas_id, input_data) {
    var sleep_sunday = week_data(input_data,0);
    var sleep_monday = week_data(input_data,1);
    var sleep_tuesday = week_data(input_data,2);
    var sleep_wednesday = week_data(input_data,3);
    var sleep_thursday = week_data(input_data,4);
    var sleep_friday = week_data(input_data,5);
    var sleep_saturday = week_data(input_data,6);


    console.log(sleep_thursday);

    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext("2d");


    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Esmapäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev", "Pühapäev"],
            datasets: [
                {
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: [sleep_monday, sleep_tuesday, sleep_wednesday, sleep_thursday, sleep_friday, sleep_saturday, sleep_sunday]
                }
            ]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: 'Une pikkus nädala jooksul tundides..'
            }
        }
    });


}


function makeRadar(canvas_id, input_data) {
    var date_range = getLastWeekRange();
    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext("2d");

    var data_this_week = filter(input_data, getThisWeekRange());
    var data_last_week = filter(input_data, getLastWeekRange());


    var data = {
        labels: ["Majustused", "Söömaajad", "Rämpstoit", "Kohv"],
        datasets: [{
            label: "Praegune nädal",
            backgroundColor: "rgba(200,0,0,0.2)",
            data: [data_this_week.sweets.length, data_this_week.meals.length, data_this_week.junkfood.length, data_this_week.coffee.length]
        }, {
            label: "Eelmine nädal",
            backgroundColor: "rgba(0,0,200,0.2)",
            data: [data_last_week.sweets.length, data_last_week.meals.length, data_last_week.junkfood.length, data_last_week.coffee.length]
        }]

    };

    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {}
    });

}


window.onload = function () {

    var sweets = JSON.parse(localStorage.getItem("sweets")).sweets;
    var meals = JSON.parse(localStorage.getItem("meal")).meal;
    var junkfood = JSON.parse(localStorage.getItem("junkfood")).junkfood;
    var coffee = JSON.parse(localStorage.getItem("coffee")).coffee;
    var sport = JSON.parse(localStorage.getItem("sport")).sport;
    var sleep = JSON.parse(localStorage.getItem("sleeping"));

    var master = {sweets: sweets, meals: meals, junkfood: junkfood, coffee: coffee, sleeping:sleep};
    window.master = master;

    makePie('pieChart', master);
    makeRadar('radarChart', master);
    makeBar('barChart', master)
};