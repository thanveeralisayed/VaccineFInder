var pBox = document.getElementById('p-box');
var pSer = document.getElementById('p-search');
var nWeek = document.getElementById('n-week');
var cList = document.getElementById('c-list');
var result = document.getElementById('result');
var heading = document.getElementById('bheading');

var cVal;
var n = 7;

var today = new Date();
// var day = today.getDate();
// var month = today.getMonth() + 1;
// var year = today.getFullYear();


// var tDate;


function GetDate(cday=today.getDate())
{
    var today = new Date();
    var day = cday;
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    tDate = day +'-'+ month +'-'+ year;
    return tDate;
}






pBox.addEventListener('input',function(e){
    cVal = e.target.value;
})

pBox.addEventListener('keypress',function(e){
    if(e.keyCode == 13)
    {
        n=0;
        var cdate = GetDate();
        // console.log(cdate);
        getVaccine(cVal,cdate);
        n = 7;
    }
})

pSer.addEventListener('click',function(){
    n = 0;
    var cdate = GetDate();
    // console.log(cdate);
    getVaccine(cVal,cdate);
    n = 7;
})


nWeek.addEventListener('click',function(){
    var day = today.getDate();
    var cday = day + n;
    // console.log(cday);
    var ndate = GetDate(cday);
    n = n+7;
    getVaccine(cVal,ndate);
})


//to create centre list element

function createcNameDiv(cName){
    var cDiv = document.createElement('div');
    cDiv.className = 'c-name';
    cDiv.style.fontWeight = '600';
    var textNode = document.createTextNode(cName);
    cDiv.appendChild(textNode);
    return cDiv;
}


function createcDataDiv(cAdd){
    var cDiv = document.createElement('div');
    var textNode = document.createTextNode(cAdd);
    cDiv.appendChild(textNode);
    // console.log(cDiv);
    return cDiv;
    
}






//function to get the data using the public api

function getVaccine(pin,ndate){

    result.style.display = 'block';
    cList.innerHTML = '';
    var http = new XMLHttpRequest();
    

    http.onreadystatechange = function(){
        if(this.readyState == '4'){
            if(this.status === 200)
            {
                var response = JSON.parse(this.responseText).centers;

                
                if(response == '')
                {
                    heading.innerHTML = 'NO CENTERS ARE AVAILABLE, SORRY';
                }

           

                for(var i=0; i<response.length; i++)
                {
                   
                    var sessions = response[i].sessions;

                    for(var j=0; j<sessions.length; j++)
                    { 
                       var aCap = sessions[j].available_capacity;
                       
                        
                        if(aCap == 0)
                        {
                            // console.log('no slots available');
                            // heading.innerHTML = 'NO CENTERS ARE AVAILABLE, SORRY';
                        }
                        else
                        {
                            // console.log('slots available');

                            // console.log(response[i]);


                            heading.innerHTML = 'AVAILABLE CENTERS';

                            var centre = response[i];

                            var brElement = document.createElement('br');    

                            var cName = centre.name;
                            var Address = centre.address +','+centre.block_name+','+centre.district_name+','+centre.state_name+','+centre.pincode;
                            var cCap = sessions[j].available_capacity;
                            var cDose1 = 'Dose1 : ' + sessions[j].available_capacity_dose1;
                            var cDose2 = 'Dose2 : ' + sessions[j].available_capacity_dose2;
                            var vNAme = sessions[j].vaccine;
                            var vDate = 'Date : '+sessions[j].date;
                            
                           

                            var newCentre = document.createElement('li');


                            //creating wrap divs

                            var acapWrapdiv = document.createElement('div');
                            var cAvailcapDiv = document.createElement('div');
                            var aDoseDiv = document.createElement('div');


                            //setting wrap div classes

                            acapWrapdiv.className = 'a-wrap';
                            cAvailcapDiv.className = 'a-cap';
                            aDoseDiv.className = 'd-wrap';


                            //appending text nodes

                            cAvailcapDiv.appendChild(document.createTextNode('Available capacity :'))

                            //calling create div functions
                            var cNameDiv = createcNameDiv(cName);
                            var cAddDiv = createcDataDiv(Address);
                            var cAvailDiv = createcDataDiv(cCap);
                            var cDoseoneDiv = createcDataDiv(cDose1);
                            var cDosetwoDiv = createcDataDiv(cDose2);
                            var cVnameDiv = createcDataDiv(vNAme);
                            var cVdateDiv = createcDataDiv(vDate);

                            newCentre.style.marginTop = '10px';
                            
                            //setting classes
                            cAddDiv.className = 'c-add';
                            cAvailDiv.className = 'c-avail-val';

                            cDoseoneDiv.className = 'd-one';
                            cDosetwoDiv.className = 'd-two';

                            cVnameDiv.className = 'v-name';
                            cVdateDiv.className = 'v-date';


                            //appending to avail wrap div
                            acapWrapdiv.appendChild(cAvailcapDiv);
                            acapWrapdiv.appendChild(cAvailDiv);

                            //appending two doses to d-wrap div

                            aDoseDiv.appendChild(cDoseoneDiv);
                            aDoseDiv.appendChild(cDosetwoDiv);
                            


                            //appending to main list
                            newCentre.appendChild(cNameDiv);
                            newCentre.appendChild(cAddDiv);
                            newCentre.appendChild(acapWrapdiv);
                            newCentre.appendChild(cVdateDiv);
                            newCentre.appendChild(aDoseDiv);
                            newCentre.appendChild(cVnameDiv);

                            
                            cList.appendChild(newCentre);

                            



                        }


                    }


                }
            }
            else
            {
                // console.log('call failed');

                



            }
        }
    }




    
    http.open('GET', 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode='+pin+'&date='+ndate, true)
    http.send();
    // cVal = '';
    // pBox.value = '';

    
}










