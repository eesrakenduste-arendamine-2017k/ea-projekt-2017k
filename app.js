window.onload = function (){

    //window.location.reload(true);

    var menuBtn= document.getElementById("menuBtn");
    var menu= document.getElementById("menu");
    var icon= document.getElementById("icon");
    var menuBg= document.getElementById("menuBg");
    var foodBtn= document.getElementById("food");
    var clothesBtn= document.getElementById("clothes");
    var otherBtn= document.getElementById("other");
    var nextSelection= document.getElementById("nextSelection");
    var addMoney= document.getElementById("addMoney");
    var enterAddMoney= document.getElementById("enterAddMoney");
    var saveAddedMoney= document.getElementById("saveAddedMoney");
    var getStarted= document.getElementById("getStarted");
    var getStartedBg= document.getElementById("getStartedBg");
    var spentOnFood= document.getElementById("spentOnFood");
    var spentOnClothes= document.getElementById("spentOnClothes");
    var spentOnOther= document.getElementById("spentOnOther");
    var freeMoneyLeft= document.getElementById("freeMoneyLeft");
    var spentOnFood2= document.getElementById("spentOnFood2");
    var spentOnClothes2= document.getElementById("spentOnClothes2");
    var spentOnOther2= document.getElementById("spentOnOther2");
    var freeMoneyLeft2= document.getElementById("freeMoneyLeft2");

    var eur= document.getElementById("eur");
    var fiveEur= document.getElementById("fiveEur");
    var tenEur= document.getElementById("tenEur");
    var fiftyEur= document.getElementById("fiftyEur");
    var hundredEur= document.getElementById("hundredEur");
    var save= document.getElementById("save");
    var totalMoneySpent= document.getElementById("totalMoneySpent");
    var totalMoneySpentCombined= document.getElementById("totalMoneySpentCombined");

    var menuOpen=false;
    var totalMoneySpentVisible=false;
    var categorySelected;
    var freeMoney=0;
    var clothesMoney=0;
    var foodMoney=0;
    var otherMoney=0;
    menuBtn.style.width=window.innerHeight*0.08+"px";
    menuBtn.style.height=window.innerHeight*0.08+"px";
    menuBtn.style.maxHeight="50px";
    menuBtn.style.minHeight="45px";
    menuBtn.style.maxWidth="50px";
    menuBtn.style.minWidth="45px";

    freeMoneyLeft2.innerHTML="1234567890";
    spentOnFood2.innerHTML="234567";
    spentOnClothes2.innerHTML="5";
    spentOnOther2.innerHTML="1";

    var WH;
    var addMoneySound = new Audio("addmoneysoundshort.mp3");
    var moneySpentSound = new Audio("moneyspentsound.mp3");

    if(window.innerWidth<window.innerHeight){
        VH=window.innerWidth;
    }else{
        VH=window.innerHeight;
    }

    menuBtn.addEventListener("click",function () {
        if(!menuOpen){
            menu.style.left="0px";
            icon.style.opacity="0";
            menuBg.style.opacity="1";
            menuBg.style.zIndex="98";
            menuOpen=true;
            setTimeout(function () {
                icon.className="fa fa-times fa-3x";
                icon.style.opacity="1";
            },200)

        }else{
            menu.style.left="-300px";
            icon.style.opacity="0";
            menuBg.style.opacity="0";
            setTimeout(function () {
                menuBg.style.zIndex="-1";
            },500)

            menuOpen=false;
            setTimeout(function () {
                icon.className="fa fa-bars fa-3x";
                icon.style.opacity="1";
            },200)

        }
    })
    menuBg.addEventListener("click",function () {
        menu.style.left="-300px";
        icon.style.opacity="0";
        menuBg.style.opacity="0";
        setTimeout(function () {
            menuBg.style.zIndex="-1";
        },500)
        menuOpen=false;
        setTimeout(function () {
            icon.className="fa fa-bars fa-3x";
            icon.style.opacity="1";
        },200)
    })
    foodBtn.addEventListener("click",function () {
        foodBtn.className+=" selectedBtn";
        foodBtn.style.width="100%";
        clothesBtn.style.visibility="hidden";
        otherBtn.style.visibility="hidden";

        nextSelection.style.visibility="visible";
        nextSelection.style.opacity="1";
        categorySelected="food";

    })
    clothesBtn.addEventListener("click",function () {
        clothesBtn.className+=" selectedBtn";
        clothesBtn.style.width="100%";
        foodBtn.style.visibility="hidden";
        otherBtn.style.visibility="hidden";

        nextSelection.style.visibility="visible";
        nextSelection.style.opacity="1";
        categorySelected="clothes";

    })
    otherBtn.addEventListener("click",function () {
        otherBtn.className+=" selectedBtn";
        otherBtn.style.width="100%";
        otherBtn.style.bottom="100%";
        clothesBtn.style.visibility="hidden";
        clothesBtn.style.zIndex="-1";
        foodBtn.style.visibility="hidden";
        foodBtn.style.zIndex="-1";

        nextSelection.style.visibility="visible";
        nextSelection.style.opacity="1";
        categorySelected="other";

    })
    addMoney.addEventListener("click",function () {
        // addMoneySound.play();
        enterAddMoney.style.visibility="visible";
        saveAddedMoney.style.visibility="visible";
        enterAddMoney.style.opacity="1";
        saveAddedMoney.style.opacity="1";

    })
    saveAddedMoney.addEventListener("click",function () {
        if(enterAddMoney.value>0) {
            addMoneySound.play();
            getStarted.style.opacity="0";
            getStarted.style.zIndex="-100";
            getStartedBg.style.opacity="0";
            getStartedBg.style.zIndex="-100";


            enterAddMoney.style.visibility="hidden";
            saveAddedMoney.style.visibility="hidden";
            enterAddMoney.style.opacity="0";
            saveAddedMoney.style.opacity="0";
            freeMoney=freeMoney+parseInt(enterAddMoney.value);

            freeMoneyLeft.innerHTML=freeMoney;
            freeMoneyLeft2.innerHTML=freeMoney;


            menu.style.left="-300px";
            icon.style.opacity="0";
            menuBg.style.opacity="0";
            menuBg.style.zIndex="-1";
            menuOpen=false;
            setTimeout(function () {
                icon.className="fa fa-bars fa-3x";
                icon.style.opacity="1";
            },200)
            enterAddMoney.value="";

            canvas.width=canvas.width;
            pie();

        }


    })
    eur.addEventListener("click",function () {
        totalMoneySpentCombined.style.visibility="visible";
        totalMoneySpentCombined.style.opacity="1";
        totalMoneySpent.innerHTML=parseInt(totalMoneySpent.innerHTML)+parseInt(1);
        totalMoneySpent.innerHTML=parseInt(totalMoneySpent.innerHTML);
        console.log(typeof totalMoneySpent.innerHTML);
    })
    fiveEur.addEventListener("click",function () {
        totalMoneySpentCombined.style.visibility="visible";
        totalMoneySpentCombined.style.opacity="1";
        console.log(typeof totalMoneySpent.innerHTML);
        totalMoneySpent.innerHTML=parseInt(totalMoneySpent.innerHTML)+parseInt(5);
        totalMoneySpent.innerHTML=parseInt(totalMoneySpent.innerHTML);
    })
    tenEur.addEventListener("click",function () {
        totalMoneySpentCombined.style.visibility="visible";
        totalMoneySpentCombined.style.opacity="1";
        console.log(typeof totalMoneySpent.innerHTML);
        totalMoneySpent.innerHTML=parseInt(totalMoneySpent.innerHTML)+parseInt(10);
        totalMoneySpent.innerHTML=parseInt(totalMoneySpent.innerHTML);
    })
    fiftyEur.addEventListener("click",function () {
        totalMoneySpentCombined.style.visibility="visible";
        totalMoneySpentCombined.style.opacity="1";
        console.log(typeof totalMoneySpent.innerHTML);
        totalMoneySpent.innerHTML=parseInt(totalMoneySpent.innerHTML)+parseInt(50);
        totalMoneySpent.innerHTML=parseInt(totalMoneySpent.innerHTML);
    })
    hundredEur.addEventListener("click",function () {
        totalMoneySpentCombined.style.visibility="visible";
        totalMoneySpentCombined.style.opacity="1";
        console.log(typeof totalMoneySpent.innerHTML);
        totalMoneySpent.innerHTML=parseInt(totalMoneySpent.innerHTML)+parseInt(100);
        totalMoneySpent.innerHTML=parseInt(totalMoneySpent.innerHTML);
    })
    save.addEventListener("click",function () {
        totalMoneySpentCombined.style.visibility="hidden";
        totalMoneySpentCombined.style.opacity="0";
        if(categorySelected=="food"){
            moneySpentSound.play();
            foodMoney=foodMoney+parseInt(totalMoneySpent.innerHTML);
            freeMoney-=parseInt(totalMoneySpent.innerHTML);

            freeMoneyLeft.innerHTML=freeMoney;
            freeMoneyLeft2.innerHTML=freeMoney;
            spentOnFood.innerHTML=foodMoney;
            spentOnFood2.innerHTML=foodMoney;

            foodBtn.className="categoryBtn";
            foodBtn.style.width="33%";
            clothesBtn.style.visibility="visible";
            otherBtn.style.visibility="visible";

            categorySelected="";

            nextSelection.style.visibility="hidden";
            nextSelection.style.opacity="0";
            console.log("vabaraha: "+freeMoney);
            console.log("toidule: "+foodMoney);

            totalMoneySpent.innerHTML=parseInt(0);

            pie();
        }
        if(categorySelected=="clothes"){
            moneySpentSound.play();
            clothesMoney=clothesMoney+parseInt(totalMoneySpent.innerHTML);
            freeMoney-=parseInt(totalMoneySpent.innerHTML);

            freeMoneyLeft.innerHTML=freeMoney;
            freeMoneyLeft2.innerHTML=freeMoney;
            spentOnClothes.innerHTML=clothesMoney;
            spentOnClothes2.innerHTML=clothesMoney;

            clothesBtn.className="categoryBtn";

            foodBtn.style.visibility="visible";
            otherBtn.style.visibility="visible";
            clothesBtn.style.width="32%";

            nextSelection.style.visibility="hidden";
            nextSelection.style.opacity="0";
            categorySelected="";
            console.log("vabaraha: "+freeMoney);
            console.log("toidule: "+clothesMoney);

            totalMoneySpent.innerHTML=parseInt(0);

            pie();
        }
        if(categorySelected=="other"){
            moneySpentSound.play();
            otherMoney=otherMoney+parseInt(totalMoneySpent.innerHTML);
            freeMoney-=parseInt(totalMoneySpent.innerHTML);

            freeMoneyLeft.innerHTML=freeMoney;
            freeMoneyLeft2.innerHTML=freeMoney;
            spentOnOther.innerHTML=otherMoney;
            spentOnOther2.innerHTML=otherMoney;

            otherBtn.className="categoryBtn";
            otherBtn.style.width="32%";
            clothesBtn.style.visibility="visible";
            foodBtn.style.visibility="visible";


            nextSelection.style.visibility="hidden";
            nextSelection.style.opacity="0";
            categorySelected="";
            console.log("vabaraha: "+freeMoney);
            console.log("toidule: "+otherMoney);

            totalMoneySpent.innerHTML=parseInt(0);

            pie();
        }
    })



    var cWidth = VH/1.5;
    var cHeight = VH/1.5;
    var canvas = document.getElementById("pie");
    var ctx = canvas.getContext("2d");
    canvas.width = cWidth;
    canvas.height = cHeight;
    var lastend = 0;
    var data = [freeMoney, foodMoney, clothesMoney,otherMoney]; // If you add more data values make sure you add more colors
    var myTotal = 0; // Automatically calculated so don't touch
    var myColor = ['dodgerblue', 'darkgreen', 'maroon','saddlebrown']; // Colors of each slice
    pie();
    function pie() {
        var cWidth = VH/1.5;
        var cHeight = VH/1.5;
        var canvas = document.getElementById("pie");
        var ctx = canvas.getContext("2d");
        canvas.width = cWidth;
        canvas.height = cHeight;
        var lastend = 0;
        var data = [freeMoney, foodMoney, clothesMoney,otherMoney]; // If you add more data values make sure you add more colors
        var myTotal = 0; // Automatically calculated so don't touch
        var myColor = ['dodgerblue', 'darkgreen', 'maroon','saddlebrown']; // Colors of each slice
        freeMoney=parseInt(freeMoney);
        for (var e = 0; e < data.length; e++) {
            myTotal += data[e];
        }

        for (var i = 0; i < data.length; i++) {
            ctx.fillStyle = myColor[i];
            ctx.strokeStyle="black";
            ctx.beginPath();
                ctx.moveTo(canvas.width / 2, canvas.height / 2);
                // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
                ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
                ctx.lineTo(canvas.width / 2, canvas.height / 2);
                ctx.fill();
                ctx.stroke();
                lastend += Math.PI * 2 * (data[i] / myTotal);
            ctx.closePath();
            if(freeMoney>0 || foodMoney>0 || clothesMoney>0 || otherMoney>0) {
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.fillStyle = "rgb(236, 236, 243)";
                ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 6, 0, Math.PI * 2);
                // ctx.lineTo(canvas.width / 2, canvas.height / 2);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
                ctx.lineTo(canvas.width / 2, canvas.height / 2);
            }
        }
        console.log(freeMoney);
        console.log(typeof freeMoney);
        console.log(freeMoney);
    }


}
