window.onload = function (){

    var nfiveprice=document.getElementById("95price");
    var neightprice= document.getElementById("98price");
    var dprice= document.getElementById("Dprice");
    var nfiveSign= document.getElementById("nfiveprice");
    var neightSign= document.getElementById("neightprice");
    var dSign= document.getElementById("dprice");
    var addCarBtnSign=document.getElementById("addCar");
    var addCarBtn= document.getElementById("addCarB");
    var addCarC= document.getElementById("addCarC");
    var nfiveNew=document.getElementById("nfiveNew");
    var neightNew=document.getElementById("neightNew");
    var dNew=document.getElementById("DNew");
    var test1=document.getElementById("test1");
    var test2=document.getElementById("test2");
    var test3=document.getElementById("test3");
    var tripLength=document.getElementById("tripLength");
    var tripPassengers=document.getElementById("tripPassengers");
    var saveTrip=document.getElementById("saveTrip");
    var tripdata=document.getElementById("tripdata");
    var tripPlan=document.getElementById("tripPlan");
    var open=false;
    var nr=0;
    var changePrice=false;
    var checked=false;
    var selectedCarArray=[];

    if(localStorage.getItem("95price")!=null) {
        nfiveprice.innerHTML = localStorage.getItem("95price");
    }else{
        nfiveprice.innerHTML = "Set";
    }
    if(localStorage.getItem("98price")!=null) {
        neightprice.innerHTML = localStorage.getItem("98price");
    }else{
        neightprice.innerHTML = "Set";
    }
    if(localStorage.getItem("dprice")!=null) {
        dprice.innerHTML = localStorage.getItem("dprice");
    }else{
        dprice.innerHTML = "Set";
    }

    nfiveprice.addEventListener("click", function () {
        console.log("clickisid hinnale.");
        nfiveprice.innerHTML="";

        var saveNewBtn = document.createElement("button");
        saveNewBtn.setAttribute("id","save");
        saveNewBtn.style.borderRadius="5px";
        saveNewBtn.style.borderTopLeftRadius="0px";
        saveNewBtn.style.borderBottomLeftRadius="0px";
        saveNewBtn.style.border="none";
        saveNewBtn.style.width="65px";
        saveNewBtn.style.padding="0px";
        saveNewBtn.style.height="20px";
        saveNewBtn.style.fontFamily="'Suissnord'";
        saveNewBtn.style.zIndex="-100";
        saveNewBtn.innerHTML="save";
        saveNewBtn.style.opacity="0";

        nfiveSign.style.marginRight="0px";
        nfiveSign.style.zIndex="-1";

        test1.appendChild(saveNewBtn);

        setTimeout(function () {
            nfiveNew.style.opacity="1";
            saveNewBtn.style.opacity="1";
        },500)

        var saveBtn = document.getElementById("save");
        saveBtn.addEventListener("click", function () {
            nfiveprice.removeEventListener("click", function(){});
            console.log(nfiveNew.value);
            localStorage.setItem("95price", nfiveNew.value + "€/l");

            nfiveprice.innerHTML=localStorage.getItem("95price");

            nfiveSign.style.marginRight="10px";
            nfiveSign.style.zIndex="0";

            nfiveprice.appendChild(saveNewBtn);

            saveBtn.style.opacity="0";
            saveBtn.remove();
            nfiveNew.style.opacity="0";



        });
    });
    neightprice.addEventListener("click", function () {
        console.log("clickisid hinnale.");
        neightprice.innerHTML="";

        var saveNewBtn = document.createElement("button");
        saveNewBtn.setAttribute("id","save");
        saveNewBtn.style.borderRadius="5px";
        saveNewBtn.style.borderTopLeftRadius="0px";
        saveNewBtn.style.borderBottomLeftRadius="0px";
        saveNewBtn.style.border="none";
        saveNewBtn.style.width="65px";
        saveNewBtn.style.padding="0px";
        saveNewBtn.style.height="20px";
        saveNewBtn.style.fontFamily="'Suissnord'";
        saveNewBtn.style.zIndex="-100";
        saveNewBtn.innerHTML="save";
        saveNewBtn.style.opacity="0";

        neightSign.style.marginRight="0px";
        neightSign.style.zIndex="-1";

        test2.appendChild(saveNewBtn);

        setTimeout(function () {
            neightNew.style.opacity="1";
            saveNewBtn.style.opacity="1";
        },500)

        var saveBtn = document.getElementById("save");
        saveBtn.addEventListener("click", function () {
            neightprice.removeEventListener("click", function(){});
            console.log(neightNew.value);
            localStorage.setItem("98price", neightNew.value + "€/l");

            neightprice.innerHTML=localStorage.getItem("98price");

            neightSign.style.marginRight="10px";
            neightSign.style.zIndex="0";

            neightprice.appendChild(saveNewBtn);

            saveBtn.style.opacity="0";
            saveBtn.remove();
            neightNew.style.opacity="0";



        });
    });
    dprice.addEventListener("click", function () {
        console.log("clickisid hinnale.");
        dprice.innerHTML="";

        var saveNewBtn = document.createElement("button");
        saveNewBtn.setAttribute("id","save");
        saveNewBtn.style.borderRadius="5px";
        saveNewBtn.style.borderTopLeftRadius="0px";
        saveNewBtn.style.borderBottomLeftRadius="0px";
        saveNewBtn.style.border="none";
        saveNewBtn.style.width="65px";
        saveNewBtn.style.padding="0px";
        saveNewBtn.style.height="20px";
        saveNewBtn.style.fontFamily="'Suissnord'";
        saveNewBtn.style.zIndex="-100";
        saveNewBtn.innerHTML="save";
        saveNewBtn.style.opacity="0";

        dSign.style.marginRight="0px";
        dSign.style.zIndex="-1";

        test3.appendChild(saveNewBtn);

        setTimeout(function () {
            dNew.style.opacity="1";
            saveNewBtn.style.opacity="1";
        },500)

        var saveBtn = document.getElementById("save");
        saveBtn.addEventListener("click", function () {
            dprice.removeEventListener("click", function(){});
            console.log(dNew.value);
            localStorage.setItem("dprice", dNew.value + "€/l");

            dprice.innerHTML=localStorage.getItem("dprice");

            dSign.style.marginRight="10px";
            dSign.style.zIndex="0";

            dprice.appendChild(saveNewBtn);

            saveBtn.style.opacity="0";
            saveBtn.remove();
            dNew.style.opacity="0";



        });
    });


    if(JSON.parse(localStorage.getItem("brand"))!=null) {
        var carsCount=JSON.parse(localStorage.getItem("brand")).length;
    }else{
        var carsCount=0;
    }
    var cars=document.getElementById("cars");
    for(var i=0;i<carsCount;i++){
        var car=document.createElement("div");
        car.setAttribute("class","carSelection");
        car.setAttribute("id","car"+i);
        car.style.height="150px";
        car.style.width="150px";
        car.style.margin="10px";
        car.style.padding="10px";
        car.style.display="inline-block";
        car.style.border="1px solid #3d3d3f";
        car.style.backgroundImage="url('car.jpg')";
        car.style.backgroundSize="cover";
        car.style.borderRadius="5px";
        car.style.cursor="pointer";

        var name=document.createElement("p");
        name.innerHTML=JSON.parse(localStorage.getItem("brand"))[i];
        name.style.zIndex=101;
        name.style.fontSize="13px";
        name.style.fontWeight="bold";
        name.style.margin="0";
        name.style.textAlign="center";

        var fuel=document.createElement("p");
        fuel.innerHTML=JSON.parse(localStorage.getItem("fuel"))[i];
        fuel.style.zIndex=101;
        fuel.style.fontSize="13px";
        fuel.style.margin="0";

        var avg=document.createElement("p");
        avg.innerHTML=JSON.parse(localStorage.getItem("avg"))[i]+"  l/100km";
        avg.style.zIndex=101;
        avg.style.fontSize="13px";
        avg.style.margin="0";

        var seats=document.createElement("p");
        seats.innerHTML=JSON.parse(localStorage.getItem("seats"))[i]+"  seats";
        seats.style.zIndex=101;
        seats.style.fontSize="13px";
        seats.style.margin="0";

        car.appendChild(name);
        car.appendChild(fuel);
        car.appendChild(avg);
        car.appendChild(seats);
        cars.appendChild(car);
        nr+=1;
    }
    if(document.getElementById("car0")!=null) {
        document.getElementById("car0").addEventListener("mouseover", darker ("car0"))
        document.getElementById("car0").addEventListener("mouseleave", brighter ("car0"))
        document.getElementById("car0").addEventListener("click", function () {
            if(!checked) {
                console.log("checked");
                car = document.getElementById("car0");
                var check = document.createElement("div");
                check.setAttribute("id", "check");
                check.style.height = "100px";
                check.style.position = "relative";
                check.style.bottom = "30px";
                check.style.width = "100px";
                check.style.padding = "10px";
                check.style.zIndex = "100";
                check.style.backgroundImage = "url('https://daks2k3a4ib2z.cloudfront.net/583ee18bc9896a832c661bd1/583ee18bc9896a832c661d14_checkmark-green.png')";
                check.style.backgroundSize = "cover";
                check.style.cursor = "pointer";
                car.appendChild(check);
                checked = true;
                selectedCarArray.push(JSON.parse(localStorage.getItem("brand"))[0]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("seats"))[0]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("fuel"))[0]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("avg"))[0]);

                localStorage.setItem("selectedCar",JSON.stringify(selectedCarArray));
                trip("car0");
            }else{
                document.getElementById("car0").addEventListener("dblclick", function () {
                    document.getElementById("check").remove();
                    checked=false;
                    trip("car0");
                    location.reload();
                    selectedCarArray=[];
                })
            }
        })
        
    }
    if(document.getElementById("car1")!=null) {
        document.getElementById("car1").addEventListener("mouseover", darker ("car1"))
        document.getElementById("car1").addEventListener("mouseleave", brighter ("car1"))
        document.getElementById("car1").addEventListener("click", function () {
            if(!checked) {
                console.log("checked");
                car = document.getElementById("car1");
                var check = document.createElement("div");
                check.setAttribute("id", "check");
                check.style.height = "100px";
                check.style.position = "relative";
                check.style.bottom = "30px";
                check.style.width = "100px";
                check.style.padding = "10px";
                check.style.zIndex = "100";
                check.style.backgroundImage = "url('https://daks2k3a4ib2z.cloudfront.net/583ee18bc9896a832c661bd1/583ee18bc9896a832c661d14_checkmark-green.png')";
                check.style.backgroundSize = "cover";
                check.style.cursor = "pointer";
                car.appendChild(check);
                checked = true;
                selectedCarArray.push(JSON.parse(localStorage.getItem("brand"))[1]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("seats"))[1]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("fuel"))[1]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("avg"))[1]);

                localStorage.setItem("selectedCar",JSON.stringify(selectedCarArray));
                trip("car1");
            }else{
                document.getElementById("car1").addEventListener("dblclick", function () {
                    document.getElementById("check").remove();
                    checked=false;
                    trip("car1");
                    location.reload();
                    selectedCarArray=[];
                })
            }
        })
    }
    if(document.getElementById("car2")!=null) {
        document.getElementById("car2").addEventListener("mouseover", darker ("car2"))
        document.getElementById("car2").addEventListener("mouseleave", brighter ("car2"))
        document.getElementById("car2").addEventListener("click", function () {
            if(!checked) {
                console.log("checked");
                car = document.getElementById("car2");
                var check = document.createElement("div");
                check.setAttribute("id", "check");
                check.style.height = "100px";
                check.style.position = "relative";
                check.style.bottom = "30px";
                check.style.width = "100px";
                check.style.padding = "10px";
                check.style.zIndex = "100";
                check.style.backgroundImage = "url('https://daks2k3a4ib2z.cloudfront.net/583ee18bc9896a832c661bd1/583ee18bc9896a832c661d14_checkmark-green.png')";
                check.style.backgroundSize = "cover";
                check.style.cursor = "pointer";
                car.appendChild(check);
                checked = true;
                selectedCarArray.push(JSON.parse(localStorage.getItem("brand"))[2]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("seats"))[2]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("fuel"))[2]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("avg"))[2]);

                localStorage.setItem("selectedCar",JSON.stringify(selectedCarArray));
                trip("car2");
            }else{
                document.getElementById("car2").addEventListener("dblclick", function () {
                    document.getElementById("check").remove();
                    checked=false;
                    trip("car2");
                    location.reload();
                    selectedCarArray=[];
                })
            }
        })
    }
    if(document.getElementById("car3")!=null) {
        document.getElementById("car3").addEventListener("mouseover", darker ("car3"))
        document.getElementById("car3").addEventListener("mouseleave", brighter ("car3"))
        document.getElementById("car3").addEventListener("click", function () {
            if(!checked) {
                console.log("checked");
                car = document.getElementById("car3");
                var check = document.createElement("div");
                check.setAttribute("id", "check");
                check.style.height = "100px";
                check.style.position = "relative";
                check.style.bottom = "30px";
                check.style.width = "100px";
                check.style.padding = "10px";
                check.style.zIndex = "100";
                check.style.backgroundImage = "url('https://daks2k3a4ib2z.cloudfront.net/583ee18bc9896a832c661bd1/583ee18bc9896a832c661d14_checkmark-green.png')";
                check.style.backgroundSize = "cover";
                check.style.cursor = "pointer";
                car.appendChild(check);
                checked = true;
                selectedCarArray.push(JSON.parse(localStorage.getItem("brand"))[3]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("seats"))[3]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("fuel"))[3]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("avg"))[3]);

                localStorage.setItem("selectedCar",JSON.stringify(selectedCarArray));
                trip("car3");
            }else{
                document.getElementById("car3").addEventListener("dblclick", function () {
                    document.getElementById("check").remove();
                    checked=false;
                    trip("car3");
                    location.reload();
                    selectedCarArray=[];
                })
            }
        })
    }
    if(document.getElementById("car4")!=null) {
        document.getElementById("car4").addEventListener("mouseover", darker ("car4"))
        document.getElementById("car4").addEventListener("mouseleave", brighter ("car4"))
        document.getElementById("car4").addEventListener("click", function () {
            if(!checked) {
                console.log("checked");
                car = document.getElementById("car4");
                var check = document.createElement("div");
                check.setAttribute("id", "check");
                check.style.height = "100px";
                check.style.position = "relative";
                check.style.bottom = "30px";
                check.style.width = "100px";
                check.style.padding = "10px";
                check.style.zIndex = "100";
                check.style.backgroundImage = "url('https://daks2k3a4ib2z.cloudfront.net/583ee18bc9896a832c661bd1/583ee18bc9896a832c661d14_checkmark-green.png')";
                check.style.backgroundSize = "cover";
                check.style.cursor = "pointer";
                car.appendChild(check);
                checked = true;
                selectedCarArray.push(JSON.parse(localStorage.getItem("brand"))[4]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("seats"))[4]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("fuel"))[4]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("avg"))[4]);

                localStorage.setItem("selectedCar",JSON.stringify(selectedCarArray));
                trip("car4");
            }else{
                document.getElementById("car4").addEventListener("dblclick", function () {
                    document.getElementById("check").remove();
                    checked=false;
                    trip("car4");
                    location.reload();
                    selectedCarArray=[];
                })
            }
        })
    }
    if(document.getElementById("car5")!=null) {
        document.getElementById("car5").addEventListener("mouseover", darker ("car5"))
        document.getElementById("car5").addEventListener("mouseleave", brighter ("car5"))
        document.getElementById("car5").addEventListener("click", function () {
            if(!checked) {
                console.log("checked");
                car = document.getElementById("car5");
                var check = document.createElement("div");
                check.setAttribute("id", "check");
                check.style.height = "100px";
                check.style.position = "relative";
                check.style.bottom = "30px";
                check.style.width = "100px";
                check.style.padding = "10px";
                check.style.zIndex = "100";
                check.style.backgroundImage = "url('https://daks2k3a4ib2z.cloudfront.net/583ee18bc9896a832c661bd1/583ee18bc9896a832c661d14_checkmark-green.png')";
                check.style.backgroundSize = "cover";
                check.style.cursor = "pointer";
                car.appendChild(check);
                checked = true;

                selectedCarArray.push(JSON.parse(localStorage.getItem("brand"))[5]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("seats"))[5]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("fuel"))[5]);
                selectedCarArray.push(JSON.parse(localStorage.getItem("avg"))[5]);

                localStorage.setItem("selectedCar",JSON.stringify(selectedCarArray));
                trip("car5");
            }else{
                document.getElementById("car5").addEventListener("dblclick", function () {
                    document.getElementById("check").remove();
                    checked=false;
                    trip("car5");
                    location.reload();
                    selectedCarArray=[];
                })
            }
        })
    }


    addCarBtn.addEventListener("click", function(){
        if(!open) {
            addCarBtnSign.innerHTML = "-";
            addCarC.style.height = "400px";

            var regiDiv = document.createElement("div");
            regiDiv.setAttribute("class", "regiDiv");
            regiDiv.setAttribute("id", "regiDiv");
            regiDiv.style.margin = "10px";
            regiDiv.style.padding = "10px";
            regiDiv.style.transition = "all 1.5s";
            regiDiv.style.opacity = "0";
            regiDiv.style.display = "flex";
            regiDiv.style.flexDirection = "column";
            regiDiv.style.justifyContent = "center";

            var carBrand = document.createElement("input");
            carBrand.setAttribute("id", "carBrand");
            carBrand.setAttribute("placeholder", "Brand");
            carBrand.style.fontFamily = 'Suissnord';
            carBrand.style.height = "25px";
            carBrand.style.width = "250px";
            carBrand.style.paddingLeft="5px";
            carBrand.style.borderRadius = "7px";
            carBrand.style.borderBottomLeftRadius = "0px";
            carBrand.style.borderBottomRightRadius = "0px";
            carBrand.style.border= "none";
            regiDiv.appendChild(carBrand);
            var br = document.createElement("br");
            var br2 = document.createElement("br");
            regiDiv.appendChild(br);

            var seats = document.createElement("input");
            seats.setAttribute("id", "seats");
            seats.setAttribute("placeholder", "How many seats");
            seats.style.fontFamily = 'Suissnord';
            seats.style.height = "25px";
            seats.style.width = "250px";
            seats.style.border= "none";
            seats.style.paddingLeft = "5px";
            regiDiv.appendChild(seats);
            var br3 = document.createElement("br");
            var br4 = document.createElement("br");
            regiDiv.appendChild(br3);

            var fuel = document.createElement("select");
            fuel.setAttribute("id", "fuel");
            var gas = document.createElement("option");
            gas.setAttribute("value", "gas");
            gas.setAttribute("name", "gas");
            var disel = document.createElement("option");
            disel.setAttribute("value", "disel");
            disel.setAttribute("name", "disel");
            gas.innerHTML = "Gas";
            disel.innerHTML = "Disel";
            fuel.appendChild(gas);
            fuel.appendChild(disel);
            fuel.style.fontFamily = 'Suissnord';
            fuel.style.height = "25px";
            fuel.style.width = "250px";
            fuel.style.border = "none";
            fuel.style.paddingLeft = "5px";
            regiDiv.appendChild(fuel);
            var b5 = document.createElement("br");
            var br6 = document.createElement("br");
            regiDiv.appendChild(b5);

            var avgCons = document.createElement("input");
            avgCons.setAttribute("id", "avgCons");
            avgCons.setAttribute("placeholder", "Avg. fuel consumption");
            avgCons.style.fontFamily = 'Suissnord';
            avgCons.style.height="25px";
            avgCons.style.width = "250px";
            avgCons.style.paddingLeft = "5px";
            avgCons.style.border="none";
            regiDiv.appendChild(avgCons);
            var liters = document.createElement("text");
            liters.innerHTML = " l/100km";
            regiDiv.appendChild(liters);
            var br7 = document.createElement("br");
            var br8 = document.createElement("br");
            regiDiv.appendChild(br7);

            var saveNewCar = document.createElement("button");
            saveNewCar.setAttribute("id", "saveNewCar");
            saveNewCar.innerHTML = "save";
            saveNewCar.style.fontFamily = 'Suissnord';
            saveNewCar.style.height = "35px";
            saveNewCar.style.width = "250px";
            saveNewCar.style.borderRadius = "7px";
            saveNewCar.style.borderTopLeftRadius = "0px";
            saveNewCar.style.borderTopRightRadius = "0px";
            saveNewCar.style.border = "none";
            regiDiv.appendChild(saveNewCar);

            addCarC.appendChild(regiDiv);
            regiDiv.style.opacity = "0";
            setTimeout(function () {
                regiDiv.style.opacity = "1";
            }, 200)
            open=true;

            document.getElementById("saveNewCar").addEventListener("click",function () {
                var brand=document.getElementById("carBrand").value;
                var seats=document.getElementById("seats").value;
                var fuel=document.getElementById("fuel").value;
                var avg=document.getElementById("avgCons").value;


                var brandArray=JSON.parse(localStorage.getItem("brand"));
                if(!brandArray || brandArray.length===0){
                    brandArray=[];
                }
                brandArray.push(brand);

                var seatsArray=JSON.parse(localStorage.getItem("seats"));
                if(!seatsArray || seatsArray.length===0){
                    var seatsArray=[];
                }
                seatsArray.push(seats);

                var fuelArray=JSON.parse(localStorage.getItem("fuel"));
                if(!fuelArray || fuelArray.length===0)
                {var fuelArray=[];
                }
                fuelArray.push(fuel);

                var avgArray=JSON.parse(localStorage.getItem("avg"));
                if(!avgArray || avgArray.length===0){
                    var avgArray=[];
                }
                avgArray.push(avg);


                localStorage.setItem("brand",JSON.stringify(brandArray));
                localStorage.setItem("seats",JSON.stringify(seatsArray));
                localStorage.setItem("fuel",JSON.stringify(fuelArray));
                localStorage.setItem("avg",JSON.stringify(avgArray));

                document.getElementById("regiDiv").style.opacity="0";
                setTimeout(function () {
                    document.getElementById("regiDiv").remove();
                    addCarBtnSign.innerHTML = "+";
                    addCarC.style.height = "55px";
                }, 200)

                open=false;
                location.reload();
            });
        }else{


            document.getElementById("regiDiv").style.opacity="0";
            setTimeout(function () {
                document.getElementById("regiDiv").remove();
                addCarBtnSign.innerHTML = "+";
                addCarC.style.height = "55px";
            }, 200)
            open=false;
        }
    });

    function trip(id) {
        if(checked==true) {
            document.getElementById("trip").style.opacity = "1";
            var carIdNr = parseInt(id[id.length - 1]);
            var passengers = JSON.parse(localStorage.getItem("selectedCar"))[1] - 1;
            for (var i = 0; i <= passengers; i++) {
                if (i == "1") {
                    tripPassengers.innerHTML += "<option>" + i + " passenger</option>";
                } else {
                    tripPassengers.innerHTML += "<option>" + i + " passengers</option>";
                }
            }
            saveTrip.addEventListener("click", function () {
                console.log("-------------------")
                var tripLengthF = tripLength.value / 100;
                console.log(tripLengthF);
                var passengersF = parseInt(tripPassengers.value[0]);
                console.log(passengersF);
                var carBrandF = JSON.parse(localStorage.getItem("selectedCar"))[0];
                console.log(carBrandF);
                var carSeatsF = parseInt(JSON.parse(localStorage.getItem("selectedCar"))[1]);
                console.log(carSeatsF);
                var carFuelF = JSON.parse(localStorage.getItem("selectedCar"))[2];
                console.log(carFuelF)
                var carAvgF = parseFloat(JSON.parse(localStorage.getItem("selectedCar"))[3]);
                console.log(carAvgF);
                var carVacantSeatsF = carSeatsF - passengersF - 1;
                console.log(carVacantSeatsF);
                var current95Cost = localStorage.getItem("95price");
                current95Cost = current95Cost.replace("€/l", "");
                current95Cost = parseFloat(current95Cost);
                console.log(current95Cost);
                var current98Cost = localStorage.getItem("98price");
                current98Cost = current98Cost.replace("€/l", "");
                current98Cost = parseFloat(current98Cost);
                console.log(current98Cost);
                var currentdCost = localStorage.getItem("dprice");
                currentdCost = currentdCost.replace("€/l", "");
                currentdCost = parseFloat(currentdCost);
                console.log(currentdCost);


                if (carFuelF == "disel") {
                    var tripFuelF = tripLengthF * carAvgF;
                    var tripFuelCostF = tripLengthF * currentdCost * carAvgF;
                    console.log("diisliga tripp: " + tripFuelF + " l");
                    console.log("diisliga tripp: " + tripFuelCostF + " euri");
                    tripPlan.innerHTML += "<text>Fuel needed: <span style='color: #8fe8a9'>" + tripFuelF + "l</span></text><br>";
                    tripPlan.innerHTML += "<text>Fuel cost: <span style='color: #8fe8a9'>" + tripFuelCostF + "€</span></text><br>";
                } else {
                    var tripFuelF = tripLengthF * carAvgF;
                    var tripFuelCostF = tripLengthF * current98Cost * carAvgF;
                    console.log("benaga tripp: " + tripFuelF + " l");
                    console.log("benaga tripp: " + tripFuelCostF + " euri");
                    tripPlan.innerHTML += "<text>Fuel needed: <span style='color: #8fe8a9'>" + tripFuelF + "l</span></text><br>";
                    tripPlan.innerHTML += "<text>Fuel cost: <span style='color: #8fe8a9'>" + tripFuelCostF + "€</span></text><br>";
                }
                var shareCostF = tripFuelCostF / (passengersF + 1);
                console.log("errybody has to pay " + shareCostF + " eur");

                tripdata.innerHTML += "<text>Brand: <span style='color: #8fe8a9'>" + carBrandF + "</span></text><br>";
                tripdata.innerHTML += "<text>Seats: <span style='color: #8fe8a9'>" + carSeatsF + "</span></text><br>";
                tripdata.innerHTML += "<text>Vacant seats: <span style='color: #8fe8a9'>" + carVacantSeatsF + "</span></text><br>";
                tripdata.innerHTML += "<text>Fuel: <span style='color: #8fe8a9'>" + carFuelF + "</span></text><br>";
                tripdata.innerHTML += "<text>Avg. fuel consumption: <span style='color: #8fe8a9'>" + carAvgF + "l/100km</span></text><br>";
                tripdata.innerHTML += "<text>Passengers: <span style='color: #8fe8a9'>" + passengersF + "</span></text><br>";
                tripdata.innerHTML += "<text>Trip length: <span style='color: #8fe8a9'>" + tripLengthF + "km</span></text><br>";

                tripPlan.innerHTML += "<text>per face: <span style='color: #8fe8a9'>" + shareCostF + "€</span></text><br>";

                document.getElementById("finalone").style.opacity = "1";
                document.getElementById("finaltwo").style.opacity = "1";


            })
        }else{
            document.getElementById("trip").style.opacity = "0";
            tripPassengers.innerHTML="";
        }
    }




    function darker(id){
        if(!checked){
            document.getElementById(id).style.filter = "brightness(75%)";
            console.log("hoverin");
        }
    }
    function brighter(id){
        if(!checked) {
            document.getElementById(id).style.filter = "brightness(100%)";
            console.log("leavin");
        }
    }


};