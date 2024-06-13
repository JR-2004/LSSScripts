// ==UserScript==
// @name         {All}Total Vehicles
// @namespace    https://www.leitstellenspiel.de/
// @version      1.1.4
// @description:de  Zählt Fahrzeuge an der Einsatzstelle
// @description     Creates a counter for all vehicles on scene
// @author       LennardTFD & JR04
// @match        https://www.leitstellenspiel.de/missions/*
// @match		 https://www.meldkamerspel.com/missions/*
// @match		 https://www.missionchief.com/missions/*
// @match		 https://www.missionchief.co.uk/missions/*
// @match		 https://www.missionchief-australia.com/missions/*
// @match 		 https://www.centro-de-mando.es/missions/*
// @match 	     https://www.operatorratunkowy.pl/missions/*
// @match		 https://www.larmcentralen-spelet.se/missions/*
// @match		 https://www.operatore112.it/missions/*
// @match		 https://www.operateur112.fr/missions/*
// @match		 https://www.dispetcher112.ru/missions/*
// @match		 https://www.alarmcentral-spil.dk/missions/*
// @match		 https://www.nodsentralspillet.com/missions/*
// @match		 https://www.operacni-stredisko.cz/missions/*
// @match		 https://www.jogo-operador112.com/missions/*
// @match		 https://www.operador193.com/missions/*
// @match		 https://www.dyspetcher101-game.com/missions/*
// @match		 https://www.missionchief-japan.com/missions/*
// @match		 https://www.missionchief-korea.com/missions/*
// @match		 https://www.jocdispecerat112.com/missions/*
// @match		 https://www.hatakeskuspeli.com/missions/*
// @match		 https://www.dispecerske-centrum.com/missions/*
// @downloadURL  https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_Total_Vehicles.js
// @updateURL    https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_Total_Vehicles.js
// @icon   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/icon.jpg
// @grant    GM_addStyle
// ==/UserScript==

GM_addStyle(`

.tooltipVehAmount {
  position: relative;
  display: inline-block;
  opacity: 1;
}

.tooltipVehAmount .tooltiptextVehAmount {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 150%;
  left: 50%;
  margin-left: -60px;
}

.tooltipVehAmount .tooltiptextVehAmount::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

.tooltipVehAmount:hover .tooltiptextVehAmount {
  visibility: visible;
}

`);

(function() {
    'use strict';
    //Create Label with Vehicles
    var vehOnSite = $("<span class='amount_of_people_label tooltipVehAmount'>Vehicles <span class='label' style='background-color: grey' id='vehAmount'>0<</span><span class='tooltiptextVehAmount'>Vor Ort: <span id='vehAmountSite'>0</span><br>Anfahrt: <span id='vehAmountEnroute'>0</span></span></span>");
    $("#amount_of_people").append(vehOnSite);

    //Count Vehicles on Site
    var vehAmountOnSite = $("#mission_vehicle_at_mission tbody [id*='vehicle_row_']").length;
    var vehAmountEnroute = $("#mission_vehicle_driving tbody [id*='vehicle_row_']").length;
    $("#vehAmount").text(vehAmountOnSite + vehAmountEnroute);
    $("#vehAmountSite").text(vehAmountOnSite);
    $("#vehAmountEnroute").text(vehAmountEnroute);
})();