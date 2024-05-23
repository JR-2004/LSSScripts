// ==UserScript==
// @name        {AUS} 1+S Script
// @namespace   bos-ernie.leitstellenspiel.de
// @version     1.3
// @license     BSD-3-Clause
// @author      BOS-Ernie & ScriptTeam Nederland
// @description Stuurt het eerste voertuig uit de lijst naar een melding.
// @match       https://*.missionchief-australia.com/missions/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=leitstellenspiel.de
// @run-at      document-idle
// @grant       none
// @downloadURL https://raw.githubusercontent.com/JR-2004/LSSScripts/main/AUS_Meldingen_1S_Script.js 
// @updateURL   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/AUS_Meldingen_1S_Script.js
// ==/UserScript==

(function () {
  /**
   * Liste der Fahrzeugtypen die als Ersthelfer ausgewählt werden dürfen.
   *
   * Nicht zu verwendende Fahrzeuge auskommentieren oder entfernen. Die Liste aktueller Fahrzeugtypen wird im Forum
   * gepflegt (siehe Link).
   * https://forum.leitstellenspiel.de/index.php?thread/8406-infos-f%C3%BCr-entwickler/&postID=485487#post485487
   *
   *  @type {number[]}
   */
  const firstResponderVehicleTypeIds = [
    0, // Pumper
    1, // Medium Tanker
    2, // Ladder Platform
    3, // Support Vehicle
    4, // Major Rescue Vehicle
    5, // Ambulance
    6, // Bulk Water Tanker
    7, // HAZMAT Truck
    8, // Police Car
    9, // Air Ambulance
    10, // BASU
    11, // MCV
    12, // Rescue Pumper
    13, // Aerial Pumper
    14, // Police helicopter
    15, // TOG Armoured Bearcat
    16, // K-9 Unit
    17, // Police Motorcycle
    18, // TOG SUV
    19, // Heavy Tanker
    20, // SES Vehicle
    21, // Rescue Boat
    22, // Mounted Police
    23, // Paramedic Supervisor
    24, // ICP
    25, // ICS
    26, // Ambulance Rescue
    27, // Mass Casualty Unit
    28, // Ultra-Light Tanker
    29, // Light Tanker
    30, // Pumper Tanker
    31, // Fire Helicopter
    32, // Bomber
    33, // Large Air Tanker
    34, // Riot Police SUV
    35, // Riot Police Group Vehicle
    36, // Riot Police Equipment Vehicle
    37, // Senior Sergeant
    38, // VMR Vehicle
    39, // VMR Boat
    40, // SES Rescue Truck
    41, // SES Mobile Command
    42, // SES Storm Trailer
    43, // ULFV Crash Tender
    44, // RIV
    45, // Emergency Stairs
    46, // SES FOV
    47, // SES Sandbag Trailer
    48, // SES Pump Trailer
    49, // SES Emergency Lightning Trailer
    50, // SES Aireshelta Trailer
    51, // SES Comms Repeater Trailer
    52, // SES Solar/Wind Power Trailer
    53, // SES Quad Rescue 6x6
    54, // SES Search And Rescue Trailer
    55, // CAFS Pumper
    56, // CAFS Aerial Pumper
    57, // CAFS Bulk Water
    58, // Foam Logistics Vehicle
    59, //
    60, // Foam Trailer
  ];

  function addSelectButton() {
    const icon = document.createElement("span");
    icon.classList.add("glyphicon", "glyphicon-fire");

    const firstResponderButton = document.createElement("button");
    firstResponderButton.classList.add("btn", "btn-primary");
    firstResponderButton.appendChild(icon);
    firstResponderButton.addEventListener("click", clickEventHandler);
    firstResponderButton.title = "Ersthelfer auswählen (Taste: f)";

    const wrapper = document.createElement("div");
    wrapper.classList.add("flex-row", "flex-nowrap");
    wrapper.appendChild(firstResponderButton);

    const iframeBottomContent = document.querySelector("#iframe-bottom-content");
    if (iframeBottomContent === null) {
      return;
    }

    let parent = iframeBottomContent.querySelector("#mission_alliance_share_btn");
    if (parent === null) {
      parent = iframeBottomContent.querySelector("#mission_next_mission_btn");
    }

    parent.parentElement.after(wrapper);
  }

  function clickEventHandler(event) {
    event.preventDefault();
    selectFirstResponder();
  }

  async function selectFirstResponder() {
    const checkboxes = document.getElementsByClassName("vehicle_checkbox");

    let firstResponderFound = false;
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i];

      if (checkbox.disabled) {
        continue;
      }

      if (checkbox.checked) {
        continue;
      }

      const vehicleTypeId = parseInt(checkbox.getAttribute("vehicle_type_id"));
      if (firstResponderVehicleTypeIds.includes(vehicleTypeId)) {
        checkbox.click();
        firstResponderFound = true;

        break;
      }
    }

    if (!firstResponderFound) {
      alert(
        "[Ersthelfer] Kein passendes Fahrzeug gefunden. Entweder Fahrzeuge nachladen oder erlaubte Fahrzeugtypen erweitern.",
      );
    }
  }

  function main() {
    addSelectButton();

    document.addEventListener("keydown", function (event) {
      if (event.key !== "f") {
        return;
      }

      const activeElement = document.activeElement;
      if (activeElement.tagName.toLowerCase() === "input" && activeElement.type.toLowerCase() === "text") {
        return;
      }

      selectFirstResponder();
    });
  }

  main();
})();
