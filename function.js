window.onload=function(){
    /*esmasp = JSON.parse(localStorage.getItem('esmasp'));
    if(!esmasp || esmasp.length===0){
        esmasp=[];
    }*/


    var addbutton=document.getElementById('submitBtn');
    var dificulty=document.getElementById('dificulty');
    var length=document.getElementById('length');
    var trainingType=document.getElementById('trainingType');
    var totalhours=document.getElementById('totalhours');
    var eztraining=document.getElementById('eztraining');
    var medtraining=document.getElementById('medtraining');
    var hardtraining=document.getElementById('hardtraining');
    var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    var now = new Date();
    var id=days[now.getDay()];

    var test=JSON.parse(localStorage.getItem("sunday"));
    sunday= JSON.parse(localStorage.getItem('sunday'));
    if(!sunday || sunday.length===0){
        sunday=[];
    }else{
        document.getElementById("sunday").children[1].innerHTML=test.tuup;
        document.getElementById("sunday").children[2].innerHTML=test.aeg;
        document.getElementById("sunday").children[3].innerHTML=test.aste;
    }

    var test=JSON.parse(localStorage.getItem("monday"));
    monday= JSON.parse(localStorage.getItem('monday'));
    if(!monday || monday.length===0){
        monday=[];
    }else{
        document.getElementById("monday").children[1].innerHTML=test.tuup;
        document.getElementById("monday").children[2].innerHTML=test.aeg;
        document.getElementById("monday").children[3].innerHTML=test.aste;
    }

    var test=JSON.parse(localStorage.getItem("tuesday"));
    tuesday= JSON.parse(localStorage.getItem('tuesday'));
    if(!tuesday || tuesday.length===0){
        tuesday=[];
    }else{
        document.getElementById("tuesday").children[1].innerHTML=test.tuup;
        document.getElementById("tuesday").children[2].innerHTML=test.aeg;
        document.getElementById("tuesday").children[3].innerHTML=test.aste;
    }

    var test=JSON.parse(localStorage.getItem("wednesday"));
    wednesday= JSON.parse(localStorage.getItem('wednesday'));
    if(!wednesday || wednesday.length===0){
        wednesday=[];
    }else{
        document.getElementById("wednesday").children[1].innerHTML=test.tuup;
        document.getElementById("wednesday").children[2].innerHTML=test.aeg;
        document.getElementById("wednesday").children[3].innerHTML=test.aste;
    }

    var test=JSON.parse(localStorage.getItem("thursday"));
    thursday= JSON.parse(localStorage.getItem('thursday'));
    if(!thursday || thursday.length===0){
        wednesday=[];
    }else{
        document.getElementById("thursday").children[1].innerHTML=test.tuup;
        document.getElementById("thursday").children[2].innerHTML=test.aeg;
        document.getElementById("thursday").children[3].innerHTML=test.aste;
    }

    var test=JSON.parse(localStorage.getItem("friday"));
    friday= JSON.parse(localStorage.getItem('friday'));
    if(!friday || friday.length===0){
        friday=[];
    }else{
        document.getElementById("friday").children[1].innerHTML=test.tuup;
        document.getElementById("friday").children[2].innerHTML=test.aeg;
        document.getElementById("friday").children[3].innerHTML=test.aste;
    }

    var test=JSON.parse(localStorage.getItem("saturday"));
    saturday= JSON.parse(localStorage.getItem('saturday'));
    if(!saturday || saturday.length===0){
        saturday=[];
    }else{
        document.getElementById("saturday").children[1].innerHTML=test.tuup;
        document.getElementById("saturday").children[2].innerHTML=test.aeg;
        document.getElementById("saturday").children[3].innerHTML=test.aste;
    }

    addbutton.addEventListener('click',function () {
        var now = new Date();
        var dificultyv=dificulty.value;
        var lengthv=length.value;
        var trainingTypev=trainingType.value;
        var id=days[now.getDay()];
        var difH;
        var totalH;
        var lenH;

        document.getElementById(id).children[1].innerHTML=trainingTypev;
        document.getElementById(id).children[2].innerHTML=lengthv;
        document.getElementById(id).children[3].innerHTML=dificultyv;

        localStorage.setItem(id,  JSON.stringify({"aste":dificultyv,"aeg":lengthv,"tuup":trainingTypev}));

        totalH=parseFloat(totalhours.innerHTML);
        lenH=parseFloat(lengthv);
        totalhours.innerHTML =totalH+lenH;

        if(dificultyv=="Kerge"){
            difH=parseFloat(eztraining.innerHTML);
            eztraining.innerHTML=difH+1;
        }
        if(dificultyv=="Keskmine"){
            difH=parseFloat(medtraining.innerHTML);
            medtraining.innerHTML=difH+1;
        }
        if(dificultyv=="Raske"){
            difH=parseFloat(hardtraining.innerHTML);
            hardtraining.innerHTML=difH+1;
        }
        localStorage.setItem("totalh", totalhours);

        })
     
}