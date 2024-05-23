// ==UserScript==
// @name        {NLVOL}Personeel Koppelen
// @namespace   bos-ernie.leitstellenspiel.de
// @version     1.3
// @license     BSD-3-Clause
// @author      BOS-Ernie & ScriptTeam Nederland
// @description Koppelt het maximale aantal personeel aan een voertuig. Script: BOS_Ernie. Vertaling naar Nederlands: JR04. Voertuiginformatie: Eerstetankautospuit
// @match       https://*.meldkamerspel.com/vehicles/*/zuweisung
// @icon        https://www.google.com/s2/favicons?sz=64&domain=leitstellenspiel.de
// @downloadURL https://raw.githubusercontent.com/JR-2004/LSSScripts/main/NLVOL_Personeel_Koppelen.js
// @updateURL   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/NLVOL_Personeel_Koppelen.js
// @run-at      document-idle
// @grant       none
// ==/UserScript==


(function () {
  "use strict";

  async function assign() {
    const assignedPersonsElement = getAssignedPersonsElement();
    const numberOfAssignedPersonnel = parseInt(assignedPersonsElement.innerText);
    const vehicleCapacity = parseInt(assignedPersonsElement.parentElement.firstElementChild.innerText);

    let numberOfPersonnelToAssign = vehicleCapacity - numberOfAssignedPersonnel;
    const vehicleTypeId = getVehicleTypeId();

    if (numberOfPersonnelToAssign > 0 && vehicleTypeId !== null) {
      const identifier = getIdentifierByVehicleTypeId(vehicleTypeId);
      const rows = document.querySelectorAll('tr[data-filterable-by*="' + identifier + '"]');
      const rowsNotInTraining = Array.from(rows).filter(
        row => row.children[2].innerText.startsWith("Im Unterricht") === false,
      );

      for (const row of rowsNotInTraining) {
        const button = row.querySelector("a.btn-success");

        if (button) {
          button.click();

          // Wait 250ms to prevent possible race conditions
          await new Promise(r => setTimeout(r, 250));

          numberOfPersonnelToAssign--;

          if (numberOfPersonnelToAssign === 0) {
            break;
          }
        }
      }
    }
  }

  async function reset() {
    const selectButtons = document.getElementsByClassName("btn btn-default btn-assigned");

    // Since the click event removes the button from the DOM, only every second item would be clicked.
    // To prevent this, the loop is executed backwards.
    for (let i = selectButtons.length - 1; i >= 0; i--) {
      selectButtons[i].click();
      // Wait 250ms to prevent possible race conditions
      await new Promise(r => setTimeout(r, 250));
    }
  }

  function assignClickEvent(event) {
    assign();
    event.preventDefault();
  }

  function resetClickEvent(event) {
    reset();
    event.preventDefault();
  }

  function getAssignedPersonsElement() {
    return document.getElementById("count_personal");
  }

  function addButtonGroup() {
    let okIcon = document.createElement("span");
    okIcon.className = "glyphicon glyphicon-ok";

    let assignButton = document.createElement("button");
    assignButton.type = "button";
    assignButton.className = "btn btn-default";
    assignButton.appendChild(okIcon);
    assignButton.addEventListener("click", assignClickEvent);

    let resetIcon = document.createElement("span");
    resetIcon.className = "glyphicon glyphicon-trash";

    let resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "btn btn-default";
    resetButton.appendChild(resetIcon);
    resetButton.addEventListener("click", resetClickEvent);

    let buttonGroup = document.createElement("div");
    buttonGroup.id = "vehicle-assigner-button-group";
    buttonGroup.className = "btn-group";
    buttonGroup.style = "margin-left: 5px";
    buttonGroup.appendChild(assignButton);
    buttonGroup.appendChild(resetButton);

    // Append button group to element with class "vehicles-education-filter-box"
    document.getElementsByClassName("vehicles-education-filter-box")[0].appendChild(buttonGroup);
  }

  function getVehicleId() {
    return window.location.pathname.split("/")[2];
  }

  function getVehicleTypeId() {
    const vehicleId = getVehicleId();
    const request = new XMLHttpRequest();
    request.open("GET", `/api/v2/vehicles/${vehicleId}`, false);
    request.send(null);

    if (request.status === 200) {
      const vehicle = JSON.parse(request.responseText);
      return vehicle.result.vehicle_type;
    }

    return null;
  }

  function getIdentifierByVehicleTypeId(vehicleTypeId) {
    switch (vehicleTypeId) {
      case 0: //SI-2
        return "[]";
      case 1: //TS 8/9
        return "[]";
      case 2: //AL
        return "[]";
      case 3: //DA-OVD
        return "[]";
      case 4: //HV
        return "[]";
      case 5: //AB
        return "[]";
      case 6: //TST 8/9
        return "[]";
      case 7: //TST 6/7
        return "[]";
      case 8: //TST 4/5
        return "[]";
      case 9: //TS 4/5
        return "[]";
      case 10: //SL
        return "[]";
      case 11: //DB-VEB
        return "gw_messtechnik";
      case 12: //TST-NB 8/9
        return "[]";
      case 14: //TST-NB 6/7
        return "[]";
      case 15: //TST-NB 4/5
        return "[]";
      case 16: //Ambulance
        return "[]";
      case 17: //TS 6/7
        return "[]";
      case 18: //HW
        return "[]";
      case 19: //DA-HOD
        return "elw2";
      case 20: //DA
        return "[]";
      case 21: //DB-K
        return "[]";
      case 22: //DA Noodhulp
        return "[]";
      case 23: //Lifeliner
        return "notarzt";
      case 24: //DA-AGS
        return "gw_gefahrgut";
      case 25: //DB Noodhulp
        return "[]";
      case 26: //HA
        return "wechsellader";
      case 27: //ABH
        return "[]";
      case 28: //Politiehelikopter
        return "polizeihubschrauber";
      case 29: //WTH
        return "[]";
      case 30: //Zorgambulance
        return "[]";
      case 31: //CO
        return "wechsellader";
      case 32: //COH
        return "[]";
      case 33: //WO
        return "[]";
      case 34: //WT
        return "[]";
      case 35: //OVD-P
        return "ovd_p";
      case 36: //WOA
        return "[]";
      case 37: //MMT-Auto
        return "notarzt";
      case 38: //OvD-G
        return "orgl";
      case 39: //ME Commandovoertuig
        return "police_mobiele_eenheid";
      case 40: //ME Flex
        return "police_mobiele_eenheid";
      case 41: //CT (8x8)
        return "arff";
      case 42: //CT (6x6)
        return "arff";
      case 43: //CT (4x4)
        return "arff";
      case 44: //AFO/OSC
        return "elw_airport";
      case 45: //DPH
        return "[]";
      case 46: //DM-P
        return "police_motorcycle";
      case 47: //DA Hondengeleider
        return "hondengeleider";
      case 48: //DB Hondengeleider
        return "hondengeleider";
      case 49: //PM-OR
        return "oppervlakteredder";
      case 50: //TS-OR
        return "oppervlakteredder";
      case 51: //HVH
        return "[]";
      case 52: //RR
        return "[]";
      case 53: //AT-C
        return "operator_at";
      case 54: //AT-Operator
        return "operator_at";
      case 55: //AT-M
        return "operator_at";
      case 56: //DA-VL
        return "spokesman";
      case 57: //DA OVDG-RR
        return "orgl";
      case 58: //DB-AV
        return "[]";
      case 59: //NH-O
        return "[]";
      case 60: //DB-Bike
        return "bike_police";
      case 61: //SLH
        return "[]";
	  case 62: //TS-HV
	    	return "[]"
      case 63: //DM-RR
        return "[]";
      case 64: //ME-AE
        return "detention_unit";
      case 65: //DAT-RB
        return "gw_wasserrettung";
      case 66: //KHV
        return "gw_wasserrettung"
      case 67: //BA-RB
        return "[]"
      case 68: //SB
        return "wechsellader"
      case 69: //SBH
        return "[]";
      case 70: //SBA
        return "[]"
      case 71: //MSA
        return "[]"
      case 72: //DPA
        return "[]";
      case 73: //VW-BB
        return "police_horse";
      case 74: //BB-A
        return "[]";
      case 75: //DAT-NH
        return "[]";
      case 76: //Quad
        return "gw_wasserrettung";
      case 77: //KW-Boot
        return "ocean_navigation, law_enforcement_marine"
      case 78: //RB-K
        return "ocean_navigation"
      case 79: //RB-G
        return "ocean_navigation";
      case 80: //SAR-Heli
        return "coastal_rescue_pilot";
      case 81: //DA-RWS
        return "technical_aid";
      case 82: //DM-RWS
        return "technical_aid";
      case 83: //DA-SIG
        return "technical_aid";
      case 84: //Waterwerper
        return "police_wasserwerfer";
      case 85: //FBO-Heli
        return "airborne_firefighting";
      case 86: //DB-Handcrew
        return "wildfire";
      case 87: //DA-LA-NB
        return "wildfire_command";
      case 88: //VW-NB
        return "wechsellader";
      case 89: //NBH
        return "[]"
      case 90: //TS-STH
        return "disaster_responce, disaster_responce_command"
      case 91: //HVH-STH
        return "[]"
      case 92: //DB-USAR
        return "search_and_rescue"
      case 93: //TS-USAR
        return "search_and_rescue"
      case 94: //VW-USAR
        return "wechsellader"
      case 95: //DM-USAR
        return "search_and_rescue"
      case 96: //Quad-USAR
        return "search_and_rescue"
      case 97: //DB-Speurhonden
        return "rescue_dogs"
      case 98: //SIV-P
        return "traffic_police";
      case 99: //DB-VOA
        return "traffic_inspector";
      case 100: //GGB
        return "mass_casualty_and_emergency_doctor"
      case 101: //NHT
        return "mass_casualty";
      case 102: //MC-Ambulance
        return "[]";
    }
  }
// Add keybinds
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const assignButton = document.querySelector('#vehicle-assigner-button-group button:nth-child(1)');
            if (assignButton) {
                assignButton.click();
            }
        } else if (event.key === 'Backspace') {
            const resetButton = document.querySelector('#vehicle-assigner-button-group button:nth-child(2)');
            if (resetButton) {
                resetButton.click();
            }
        }
    });

  addButtonGroup();
})();
