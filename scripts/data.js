window.onload = function () {

    var sweets_len = JSON.parse(localStorage.getItem("sweets")).sweets.length;
    var meals_len = JSON.parse(localStorage.getItem("meal")).meal.length;
    var junkfood_len = JSON.parse(localStorage.getItem("junkfood")).junkfood.length;
    var coffe = JSON.parse(localStorage.getItem("coffe")).coffe.length;

    var ctx = document.getElementById("myChart").getContext("2d");
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
                data: [sweets_len, meals_len, junkfood_len, coffe]
            }]
        }
    });


};