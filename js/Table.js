function Table(){
    this.scoretable = localStorage.getItem('SpaceInvaders');
}

Table.prototype = {

    toplist: function(){

        var top = document.getElementById("toplist");
        var topbody = top.getElementsByTagName("TBODY")[0];
        topbody.innerHTML = "";
        if(this.scoretable !== null){
            var top10 = this.scoretable.sort(function(a) { return a.score : 1; })
                .slice(0, 10);
            var j = 0;
            top10.forEach(function(player){
                j++;
                var row = topbody.insertRow(topbody.rows.length);
                var i = 0;
                var cell = row.insertCell(i);
                var text = document.createTextNode(j.toString());
                cell.appendChild(text);
                i++;
            }
			);
        }



    }

};