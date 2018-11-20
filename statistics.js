var statistics = {
    numberDemocrats : 0, 
    numberRepublicans : 0,
    numberIndependents  : 0,
    numberTotal: 0,
    votedDemocrats: 0,
    votedRepublicans: 0,
    votedIndependet: 0,
    votedTotal: 0,
    leastEngaged: [],
    mostEngaged: [],
    leastLoyal: [],
    mostLoyal: [],
    };

function makeStats(){
	statistics.numberDemocrats = app.congress.filter(function(i){
  				return i.party == 'D';
	}).length;
	
    statistics.numberRepublicans = app.congress.filter(function(i){
                return i.party == 'R';
    }).length;                  
    
	statistics.numberIndependents = app.congress.filter(function(i){
                return i.party == 'I';
    }).length;
                       
statistics.numberTotal = app.congress.length

function porcentPartyVoted (array, party){
    var newArray = []
    var sumVoted = 0
    array.forEach(function(i) { 
        if(i.party == party){
            newArray.push(i.votes_with_party_pct)
            sumVoted += i.votes_with_party_pct   
        }
    })
    var votesTotal = newArray.length
    var porcent = sumVoted / votesTotal

return porcent
    }

statistics.votedDemocrats= +(porcentPartyVoted(app.congress, "D").toFixed(2))
statistics.votedRepublicans= +(porcentPartyVoted(app.congress, "R").toFixed(2))
statistics.votedIndependet= +(porcentPartyVoted(app.congress, "I").toFixed(2))

var totalSum = 0
for (i in app.congress){
    totalSum += app.congress[i].votes_with_party_pct
}

statistics.votedTotal= +(totalSum / (statistics.numberTotal)).toFixed(2)

 //menos leal
function votedLeast (array){
    
    var porcent = parseInt(array.length * 0.1)
    array = array.sort(function (a,b) {
        var voteA = a.votes_with_party_pct
        var voteB = b.votes_with_party_pct
        return voteA - voteB
    }).slice(0,porcent);
    return array
}
statistics.leastLoyal= votedLeast(app.congress)


 //mas leal
function votedMost (array){
    var porcent = parseInt(array.length * 0.1)
    array = array.sort(function(a,b) {
        var voteA = a.votes_with_party_pct
        var voteB = b.votes_with_party_pct
        return voteB - voteA
    }).slice(0,porcent);
    return array 
}
statistics.mostLoyal= votedMost(app.congress)


 //menos comprometido 
function assistLeast (array){
    var porcent = parseInt(array.length * 0.1)
    array = array.sort(function(a,b){
        var assistA = a.missed_votes_pct
        var assistB = b.missed_votes_pct
        return assistB - assistA
    }).slice(0,porcent);
    return array
}
statistics.leastEngaged= assistLeast(app.congress)


 //mas comprometido 
function assistMost (array){
    var porcent = parseInt(array.length * 0.1)
    array = array.sort(function(a,b){
        var assistA = a.missed_votes_pct
        var assistB = b.missed_votes_pct
        return assistA - assistB
    }).slice(0,porcent);
    return array
}
statistics.mostEngaged= assistMost(app.congress)
}

 //VUE
var app = new Vue({
  el: '#app',
  data: {
    congress: [],
	info: statistics,
  }
});

var congress = document.getElementsByClassName("congress")[0].id
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
	makeStats()
		 
	 }).catch(function(){
   if (data == congressned){
     console.log("Fail")
   }
 })
}
cargarJSON();