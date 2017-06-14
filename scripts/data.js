function filter(master, range) {
    var filtered = {sweets: [], meals: [], junkfood: [], coffee: []};
    master.sweets.forEach(function(sweet_timsestamp){
        if (sweet_timsestamp > range.week_begin && sweet_timsestamp < range.week_end) {
            filtered.sweets.push(sweet_timsestamp);
        }
    });



    master.meals.forEach(function(meal_timsestamp){
        if (meal_timsestamp > range.week_begin && meal_timsestamp < range.week_end) {
            filtered.meals.push(meal_timsestamp);
        }
    });

    master.junkfood.forEach(function(junkfood_timsestamp){
        if (junkfood_timsestamp > range.week_begin && junkfood_timsestamp < range.week_end) {
            filtered.junkfood.push(junkfood_timsestamp);
        }
    });

    master.coffee.forEach(function(coffee_timsestamp){
        if (coffee_timsestamp > range.week_begin && coffee_timsestamp < range.week_end) {
            filtered.coffee.push(coffee_timsestamp);
        }
    });

    return filtered;
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
    var ctx = document.getElementById(canvas_id).getContext("2d");
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
        }
    })
}

function makeRadar(canvas_id, input_data) {
    var date_range = getLastWeekRange();
    var ctx = document.getElementById(canvas_id).getContext("2d");

    var data_this_week = filter(input_data, getThisWeekRange());
    var data_last_week = filter(input_data, getLastWeekRange());


    var data = {
        labels: ["Majustused", "Söömaajad", "Rämpstoit", "Kohh"],
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

    var master = {sweets: sweets, meals: meals, junkfood: junkfood, coffee: coffee};
    window.master = master;

    makePie('pieChart', master);
    makeRadar('radarChart', master);
};