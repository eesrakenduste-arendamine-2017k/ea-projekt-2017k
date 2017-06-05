window.onload = function () {

    var dt = JSON.parse(localStorage.getItem("sweets"));

    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);



    var data = {
        datasets: [{
            data: [10, 20, 30]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    };
    var ctx = document.getElementById("myChart").getContext("2d");
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: data,
        options: Chart.pie.default
    });


};