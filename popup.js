window.onload = function() {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('firebase.js');
    (document.head || document.documentElement).appendChild(s);
    s.onload = function() {
        s.remove(); // Clean up, just to be nice.
    };

    var database = firebase.database();
    var ref = database.ref('statistics');
    var data = null;


    ref.once('value', getData, errData);

    function getData(data) {
        letters = data.val();
        keys = Object.keys(letters);
        console.log(letters);

        for(var i = 0; i < keys.length; i++) {
          var tr = document.createElement('tr');
          var td = document.createElement('td');
          var td2 = document.createElement('td');


            td.append(letters[keys[i]].key);
            // console.log(letters[keys[i]].key);
            td2.append(letters[keys[i]].count);
            // console.log(letters[keys[i]].count);

            tr.appendChild(td);
            tr.appendChild(td2);

            document.querySelector('.table').appendChild(tr);
        }
        console.log('Data arrived');
    }

    function errData(err) {
        console.log('Error!');
        console.log(err);
    }


};
