// ==UserScript==
// @name        {AUS}1 Persoon Koppelen
// @namespace   bos-ernie.leitstellenspiel.de
// @version     1.6.1
// @license     BSD-3-Clause
// @author      BOS-Ernie, ScriptTeam Meldkamerspel
// @description Koppelt één personeelslid aan een voertuig.
// @match       https://*.missionchief-australia.com/vehicles/*/zuweisung
// @icon   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/icon.png
// @downloadURL https://raw.githubusercontent.com/JR-2004/LSSScripts/main/AUS_1_Persoon_Koppelen.js
// @updateURL   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/AUS_1_Persoon_Koppelen.js
// @run-at      document-idle
// @grant       none
// ==/UserScript==

(function () {
  "use strict";

 async function assign() {
    const assignedPersonsElement = getAssignedPersonsElement();
    const numberOfAssignedPersonnel = parseInt(assignedPersonsElement.innerText);
    const vehicleCapacity = parseInt(assignedPersonsElement.parentElement.firstElementChild.innerText);

    let numberOfPersonnelToAssign = 1; // Set to 1 to assign only one person
    const vehicleTypeId = getVehicleTypeId();

    if (numberOfPersonnelToAssign > 0 && vehicleTypeId !== null) {
        const identifier = getIdentifierByVehicleTypeId(vehicleTypeId);
        const rows = document.querySelectorAll('tr[data-filterable-by*="' + identifier + '"]');
        const rowsNotInTraining = Array.from(rows).filter(
            row => row.children[2].innerText.startsWith("In a lesson") === false,
        );
        for (const row of rowsNotInTraining) {
            const button = row.querySelector("a.btn-success");

            if (button) {
                button.click();

                // Wait 250ms to prevent possible race conditions
                await new Promise(r => setTimeout(r, 250));

                numberOfPersonnelToAssign--;

                if (numberOfPersonnelToAssign === 0) {
                    break; // Only assign one person
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
      case 0: //Pumper
        return "[]";
      case 1: //Medium Tanker
        return "[]";
      case 2: //Ladder Platform
        return "[]";
      case 3: //Support Vehicle
        return "[]";
      case 4: //Major Rescue Vehicle
        return "[]";
      case 5: //Ambulance
        return "[]";
      case 6: //Bulk Water Tanker
        return "[]";
      case 7: //HAZMAT Truck
        return "gw_gefahrgut";
      case 8: //Police car
        return "[]";
      case 9: //Air Ambulance
        return "critical_care";
      case 10: //BASU
        return "[]";
      case 11: //MCV
        return "elw2";
      case 12: //Rescue Pumper
        return "[]";
      case 13: //Aerial Pumper
        return "[]";
      case 14: //Police helicopter
        return "polizeihubschrauber"
      case 15: //TOG Armoured Bearcat
        return "swat";
      case 16: //K-9 Unit
        return "k9";
      case 17: //Police Motorcycle
        return "police_motorcycle";
      case 18: //TOG SUV
        return "swat";
      case 19: //Heavy Tanker
        return "[]";
      case 20: //SES Vehicle
        return "gw_wasserrettung";
      case 21: //Rescue Boat
        return "[]";
      case 22: //Mounted Police
        return "[]"
      case 23: //Paramedic Supervisor
        return "[]";
      case 24: //ICP
        return "critical_care";
      case 25: //ICS
        return "critical_care";
      case 26: //Ambulance Rescue
        return "[]";
      case 27: //Mass Casualty Unit
        return "[]";
      case 28: //Ultra-Light Tanker
        return "[]";
      case 29: //Light Tanker
        return "[]";
      case 30: //Pumper Tanker
        return "[]";
      case 31: //Fire Helicopter
        return "airborne_firefighting";
      case 32: //Bomber
        return "airborne_firefighting";
      case 33: //Large Air Tanker
        return "airborne_firefighting";
      case 34: //Riot Police SUV
        return "[]";
      case 35: //Riot Police Group Vehicle
        return "[]";
      case 36: //Riot Police Equipment Vehicles
        return "riot_police_equipment";
      case 37: //Senior Sergeant
        return "police_service_group_leader";
      case 38: //VMR Vehicle
        return "[]";
      case 39: //VMR Boat
        return "coastal_rescue,ocean_navigation";
      case 40: //SES Rescue Truck
        return "[]";
      case 41: // SES Mobile Commanf
        return "water_rescue_elw2";
      case 42: //SES Storm Trailer
        return "[]";
      case 43: //ULFV Crash Tender
        return "arff";
      case 44: //RIV
        return "arff";
      case 45: //Emergency Stairs
        return "rettungstreppe";
      case 46: //SES FOV
        return "gw_wasserrettung";
      case 47: //SES Sandbag Trailer
        return "[]";
      case 48: //SES Pump Trailer
        return "[]";
      case 49: //SES Emergency Lightning Trailer
        return "[]";
      case 50: //SES Aireshelta Trailer
        return "[]";
      case 51: //SES Comms Repeater Trailer
        return "[]";
      case 52: //SES Solar/Wind Power Trailer
        return "[]";
      case 53: //SES Quad Rescue 6x6
        return "[]";
      case 54: //SES Search And Rescue Trailer
        return "[]";
      case 55: //CAFS Pumper
        return "[]";
      case 56: //CAFS Aerial Pumper
        return "[]";
      case 57: //CAFS Bulk Water
        return "[]";
      case 58: //Foam Logistics Vehicle
        return "[]";
      case 59: //
        return "[]";
      case 60: //Foam Trailer
        return "[]";
      case 61: //
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
