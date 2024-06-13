
// ==UserScript==
// @name         {All}MissionSpeed Change
// @namespace    www.leitstellenspiel.de
// @match        https://www.leitstellenspie.de/
// @match		     https://www.meldkamerspel.com/
// @match		     https://www.missionchief.com/
// @match		     https://www.missionchief.co.uk/
// @match		     https://www.missionchief-australia.com/
// @match 		   https://www.centro-de-mando.es/
// @match 	     https://www.operatorratunkowy.pl/
// @match		     https://www.larmcentralen-spelet.se/
// @match		     https://www.operatore112.it/
// @match		     https://www.operateur112.fr/
// @match		     https://www.dispetcher112.ru/
// @match		     https://www.alarmcentral-spil.dk/
// @match		     https://www.nodsentralspillet.com/
// @match		     https://www.operacni-stredisko.cz/
// @match		     https://www.jogo-operador112.com/
// @match		     https://www.operador193.com/
// @match		     https://www.dyspetcher101-game.com/
// @match		     https://www.missionchief-japan.com/
// @match		     https://www.missionchief-korea.com/
// @match		     https://www.jocdispecerat112.com/
// @match		     https://www.hatakeskuspeli.com/
// @match		     https://www.dispecerske-centrum.com/
// @downloadURL  https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_MissionSpeed.js
// @updateURL    https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_MissionSpeed.js
// @version      1.2.1
// @description  Handige tekst bij instellen van de meldingsnelheid
// @author       MissSobol & ScriptTeam Nederland
// @icon   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/icon.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Ausblenden und Anpassen der gewünschten Geschwindigkeiten
    modifySpeed('3', false, "Turbo (20s)"); // 3x anzeigen und umbenennen
    modifySpeed('2', true, "Snel (30s)"); // 2x ausblenden und umbenennen
    modifySpeed('1', false, "Normaal (60s)"); // 1x anzeigen und umbenennen
    modifySpeed('7', true, "Lanzaam (2min)"); // 0.5x ausblenden und umbenennen
    modifySpeed('0', true, "Zeer Langzaam (3min)"); // 0.33x ausblenden und umbenennen
    modifySpeed('4', true, "Extreem Langzaam (5min)"); // 0.20x ausblenden und umbenennen
    modifySpeed('8', true, "Ultra Langzaam (7min)"); // 0.15x ausblenden und umbenennen
    modifySpeed('5', true, "Mega Langzaam (10min)"); // 0.10x ausblenden und umbenennen
    modifySpeed('6', false, "Pause"); // Pause anzeigen und umbenennen

    // Funktion zum Ausblenden und Anpassen der Geschwindigkeiten
    function modifySpeed(speed, hide, newLabel) {
        var menuItems = document.querySelectorAll('.mission-speed-dropdown-menu li');
        var speeds = {
            "3": {index: 0, label: "Super Snel"},  // 3x
            "2": {index: 1, label: "Snel"},         // 2x
            "1": {index: 2, label: "Normaal"},          // 1x
            "7": {index: 3, label: "Langzaam"},         // 0.5x
            "0": {index: 4, label: "Zeer Langzaam"},    // 0.33x
            "4": {index: 5, label: "Extreem Langzaam"},  // 0.20x
            "8": {index: 6, label: "Ultra Langzaam"},   // 0.15x
            "5": {index: 7, label: "Mega Langzaam"},    // 0.10x
            "6": {index: 8, label: "Pause"}            // Pause
        };

        if (speeds[speed] !== undefined) {
            if (hide) {
                menuItems[speeds[speed].index].style.display = "none";
            } else {
                menuItems[speeds[speed].index].style.display = "block";
                if (newLabel) {
                    menuItems[speeds[speed].index].querySelector("a").innerText = newLabel;
                }
            }
        }
    }
})();
