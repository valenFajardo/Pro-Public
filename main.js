
 //agregar los estados al select 
 function createDropDown(){
    var states = []
    var noRepeatStates= []
    app.congress.map(function(i){
        states.push( "<option value='"+i.state+"'>"+i.state+"</option>")
    })
    
        for(i=0; i<states.length; i++){
            if(i == states.indexOf(states[i])){
       			noRepeatStates.push(states[i])
            }
        }
    
  document.getElementById("state-filter").innerHTML += noRepeatStates.sort().join("")
}


document.getElementById("data-head").innerHTML = "<tr><th>Names</th><th>Party</th><th>State</th><th>Seniority</th><th>Percentage</th></tr>"
function filter(){
     //funcion que filtra por partifo y por estado 
    var filterMembers = []
    var selectedState = document.getElementById("state-filter").value
    var table;
    var checked = Array.from(document.querySelectorAll('input[name=party]:checked')).map(elt => elt.value)
    checked.map (function(val){
        app.congress.map(function(i){
           if (val==i.party && (selectedState ==i.state || selectedState == "all")){
            filterMembers.push(i)
            } 
        })
        
    })
     // ordenar alafabeticamante senadores 
       filterMembers.sort(function(a, b){
       var nameA=a.last_name.toLowerCase();
       var nameB=b.last_name.toLowerCase();
       if (nameA < nameB) //sort string ascending
           return -1
       if (nameA > nameB)
           return 1
       return 0 //default return value (no sorting)
    }) 
	
   return filterMembers
         
}

 //recorre la funcion para hacer el filtro

 var partido = document.getElementsByClassName("party-filter")
 document.getElementsByClassName("party-filter")
for (i=0; i<partido.length; i++){
    partido[i].onclick = function(){
        filter()
    }
}

document.getElementById("state-filter").onchange = function(){
    filter()
}


var app = new Vue({
  el: '#app',
  data: {
    congress: [],
	filterCongress: [],
  }
});
 
var congress = document.getElementsByClassName("congress")[0].id
var data 
function cargarJSON(){
     fetch("https://api.propublica.org/congress/v1/113/"+congress+"/members.json",{
   method: 'GET',
   headers: new Headers({
   "X-API-Key": "nfFKZoFe2EjcoKRogbqOejAwqz8z8TH8fg3gOtPp"
 })
 }).then(function(res){
   return res.json();
 }).then(function(res){

	app.congress = res.results[0].members;
	createDropDown();
	app.filterCongress = filter()
	 document.getElementById("state-filter").onchange = function(){
    app.filterCongress = filter()
	
	 }
	  var partido = document.getElementsByClassName("party-filter")
		for (i=0; i<partido.length; i++){
    	partido[i].onclick = function(){
    app.filterCongress = filter()
    } 
	 }
		 
	 }).then(function(){
		 styleTables()
	 }).catch(function(){
   if (data == undefined){
     console.log("Fail")
   }
 })
}
cargarJSON();



function styleTables () {
      $('#optional').dataTable( {
        "bPaginate": false, 
        "sScrollY": "600",  
        "bScrollCollapse": true
      } );
    } 