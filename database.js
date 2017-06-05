var database = firebase.database();
var ref = database.ref('statistics');

ref.once('value', getData, errData);

function getData() {
    letters = data.val();
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var td2 = document.createElement('td');


    for (var i = 0; i < letters.length; i++) {
        td.append(letters[i].key);
        td2.append(letters[i].count);

        tr.append(td, td2);

        document.querySelector('.statistics').appendChild(tr);
    }
}

function errData(err) {
    console.log('Error!');
    console.log(err);
}
