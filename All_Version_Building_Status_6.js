
// ==UserScript==
// @name        {All}Building Status 6
// @namespace   https://www.leitstellenspiel.de/
// @version     1.3.1
// @description ALle Fahrzeuge einer Wache auf Status 6
// @author      ScriptTeam Meldkamerspel
// @match       https://www.leitstellenspiel.de/buildings/*
// @match		    https://www.meldkamerspel.com/buildings/*
// @match       https://www.missionchief.com/buildings/*
// @match		    https://www.missionchief.co.uk/buildings/*
// @match		    https://www.missionchief-australia.com/buildings/*
// @match 		  https://www.centro-de-mando.es/buildings/*
// @match 	    https://www.operatorratunkowy.pl/buildings/*
// @match		    https://www.larmcentralen-spelet.se/buildings/*
// @match		    https://www.operatore112.it/buildings/*
// @match		    https://www.operateur112.fr/buildings/*
// @match		    https://www.dispetcher112.ru/buildings/*
// @match		    https://www.alarmcentral-spil.dk/buildings/*
// @match		    https://www.nodsentralspillet.com/buildings/*
// @match		    https://www.operacni-stredisko.cz/buildings/*
// @match		    https://www.jogo-operador112.com/buildings/*
// @match		    https://www.operador193.com/buildings/*
// @match		    https://www.dyspetcher101-game.com/buildings/*
// @match		    https://www.missionchief-japan.com/buildings/*
// @match		    https://www.missionchief-korea.com/buildings/*
// @match		    https://www.jocdispecerat112.com/buildings/*
// @match		    https://www.hatakeskuspeli.com/buildings/*
// @match		    https://www.dispecerske-centrum.com/buildings/*
// @downloadURL https://raw.githubusercontent.com/JR-2004/LSSScripts/main/All_Version_Building_Status_6.js
// @updateURL   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/All_Version_Building_Status_6.js
// @icon   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/icon.png
// @grant       none
// ==/UserScript==

const vehicles = $("#vehicle_table").find("tbody").find("tr");

const btnLocation = $("tr.tablesorter-headerRow").find("th").find("div:contains('Status')");

let btn6 = btnLocation.append("<button class='btn btn-default btn-xs' id='s6'>S6</button>");
let btn2 = btnLocation.append("<button class='btn btn-default btn-xs' id='s2'>S2</button>");

$("#s6").on("click", () => {
switchStatus(6);
});

$("#s2").on("click", () => {
switchStatus(2);
});

function switchStatus(status)
{

alert("Wechsel auf Status " + status + "\nProzess Zeit: " + 2 * vehicles.length + " Sekunden");

vehicles.each((e, t) => {
setTimeout(() => {

let vehicle = $(t);
let vehUrl = vehicle.find("td").find("a").attr("href");

$.ajax({
url: vehUrl + "/set_fms/" + status
})

}, 2000 * e);
});
}
