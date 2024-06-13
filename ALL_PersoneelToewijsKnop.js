// ==UserScript==
// @name         {All}PersoneelToewijsKnop
// @namespace    bos-ernie.leitstellenspiel.de
// @version      1.5.1
// @license      BSD-3-Clause
// @author       BOS-Ernie & ScriptTeam Nederland
// @description  Voegt een knop toe die ervoor zorgt dat je direct je personeel kan koppelen
// @match        https://www.leitstellenspiel.de/buildings/*
// @match		     https://www.meldkamerspel.com/buildings/*
// @match        https://www.missionchief.com/buildings/*
// @match		     https://www.missionchief.co.uk/buildings/*
// @match		     https://www.missionchief-australia.com/buildings/*
// @match 		   https://www.centro-de-mando.es/buildings/*
// @match 	     https://www.operatorratunkowy.pl/buildings/*
// @match		     https://www.larmcentralen-spelet.se/buildings/*
// @match		     https://www.operatore112.it/buildings/*
// @match		     https://www.operateur112.fr/buildings/*
// @match		     https://www.dispetcher112.ru/buildings/*
// @match		     https://www.alarmcentral-spil.dk/buildings/*
// @match	       https://www.nodsentralspillet.com/buildings/*
// @match 	     https://www.operacni-stredisko.cz/buildings/*
// @match		     https://www.jogo-operador112.com/buildings/*
// @match		     https://www.operador193.com/buildings/*
// @match	       https://www.dyspetcher101-game.com/buildings/*
// @match	       https://www.missionchief-japan.com/buildings/*
// @match		     https://www.missionchief-korea.com/buildings/*
// @match		     https://www.jocdispecerat112.com/buildings/*
// @match		     https://www.hatakeskuspeli.com/buildings/*
// @match		     https://www.dispecerske-centrum.com/buildings/*
// @icon   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/icon.png
// @run-at       document-idle
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_PersoneelToewijsKnop.js
// @updateURL    https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_PersoneelToewijsKnop.js
// ==/UserScript==

(function () {
  "use strict";

  function addButtonToNewVehiclesAlert() {
    const buttonGroup = document.querySelector(
      "div.alert.fade.in.alert-success > div.btn-group"
    );

    if (buttonGroup === null) {
      return;
    }

    const vehicleUrl = buttonGroup.children[0].href;

    const userIconSpan = document.createElement("span");
    userIconSpan.className = "glyphicon glyphicon-user";

    const button = document.createElement("a");
    button.className = "btn btn-default";
    button.href = vehicleUrl + "/zuweisung";
    button.appendChild(userIconSpan);

    buttonGroup.appendChild(button);
  }

  function addButtonToVehiclesOnBuildingPage() {
    const vehicleEditButtons = document.querySelectorAll(
      "a.btn.btn-default.btn-xs[href^='/vehicles/'][href$='/edit']"
    );

    vehicleEditButtons.forEach((vehicleEditButton) => {
      const vehicleUrl = vehicleEditButton.href;
      const vehicleId = vehicleUrl.split("/")[4];

      const userIconSpan = document.createElement("span");
      userIconSpan.className = "glyphicon glyphicon-user";

      const button = document.createElement("a");
      button.className = "btn btn-default btn-xs";
      button.href = `/vehicles/${vehicleId}/zuweisung`;
      button.appendChild(userIconSpan);

      vehicleEditButton.parentElement.appendChild(button);
    });
  }

  function main() {
    addButtonToNewVehiclesAlert();
    addButtonToVehiclesOnBuildingPage();
  }

  main();
})();
