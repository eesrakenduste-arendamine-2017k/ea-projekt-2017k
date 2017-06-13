function filter(master, range) {
    var filtered = {sweets: [], meals: [], junkfood: [], coffee: []};
    for(sweet_timsestamp in master.sweets){
        if(sweet_timsestamp > range.week_begin && sweet_timsestamp < range.week_end){
            filtered.sweets.append();
        }
    }

    for(meal_timsestamp in master.meals){
        if(meal_timsestamp > range.week_begin && meal_timsestamp < range.week_end){
            filtered.meals.append();
        }
    }

    for(junkfood_timsestamp in master.junkfood){
        if(junkfood_timsestamp > range.week_begin && junkfood_timsestamp < range.week_end){
            filtered.junkfood.append();
        }
    }

    for(junkfood_timsestamp in master.junkfood){
        if(junkfood_timsestamp > range.week_begin && junkfood_timsestamp < range.week_end){
            filtered.junkfood.append();
        }
    }

    return filtered;
}

function getLastWeekRange() {
    week_begin = new Date(Sugar.Date.create("last monday")).getTime();
    week_end = new Date(Sugar.Date.create("sunday")).getTime();

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

    var data = {
        labels: ['Söögid', 'Joomine', 'Kohv', 'Rämpstoits'],
        datasets: [{
            data: [20, 10, 4, 2]
        }]
    };

    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });

}


window.onload = function () {

    var sweets = JSON.parse(localStorage.getItem("sweets")).sweets;
    var meals = JSON.parse(localStorage.getItem("meal")).meal;
    var junkfood = JSON.parse(localStorage.getItem("junkfood")).junkfood;
    var coffee = JSON.parse(localStorage.getItem("coffee")).coffee;

    var master = {sweets: sweets, meals: meals, junkfood: junkfood, coffee: coffee}
    makePie('pieChart', master);
    makeRadar('radarChart', master);
};