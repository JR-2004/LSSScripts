// ==UserScript==
// @name        {All}Meldkamers activeren en deactiveren
// @namespace   bos-ernie.leitstellenspiel.de
// @version     1.5.1
// @license     BSD-3-Clause
// @author      BOS-Ernie & ScriptTeam Nederland
// @description Voegt een knop toe in het gebouwoverzicht om je meldkamers in en uit te schakelen
// @match       https://www.leitstellenspiel.de/ 
// @match		    https://www.meldkamerspel.com/ 
// @match		    https://www.missionchief.com/ 
// @match		    https://www.missionchief.co.uk/ 
// @match		    https://www.missionchief-australia.com/ 
// @match 		  https://www.centro-de-mando.es/
// @match 	    https://www.operatorratunkowy.pl/
// @match		    https://www.larmcentralen-spelet.se/
// @match		    https://www.operatore112.it/
// @match		    https://www.operateur112.fr/
// @match		    https://www.dispetcher112.ru/
// @match		    https://www.alarmcentral-spil.dk/
// @match		    https://www.nodsentralspillet.com/
// @match		    https://www.operacni-stredisko.cz/
// @match		    https://www.jogo-operador112.com/
// @match		    https://www.operador193.com/
// @match		    https://www.dyspetcher101-game.com/
// @match		    https://www.missionchief-japan.com/
// @match		    https://www.missionchief-korea.com/
// @match		    https://www.jocdispecerat112.com/
// @match		    https://www.hatakeskuspeli.com/
// @match		    https://www.dispecerske-centrum.com/
// @icon   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/icon.png
// @run-at      document-idle
// @grant       none
// @downloadURL https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_Disable_Dispatch.js
// @updateURL   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_Disable_Dispatch.js
// ==/UserScript==

/* global buildingLoadContent */

(function () {
  const callback = (mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        addToggleButtons();
      }
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe(document.getElementById("buildings"), {
    childList: true,
  });

  function addToggleButtons() {
    const buildingList = document.getElementById("building_list");

    if (!buildingList) {
      return;
    }

    buildingList.querySelectorAll("li").forEach((li) => {
      if (li.getAttribute("building_type_id") !== "1") {
        return;
      }

      const buildingId = li.querySelector("img").getAttribute("building_id");
      const captionDiv = document.getElementById(
        "building_list_caption_" + buildingId
      );

      const img = li.querySelector("img");
      const imgSource = img.getAttribute("src");
      img.remove();

      if (imgSource === "/images/building_leitstelle_deactivated.png") {
        captionDiv.prepend(createStatusButtonGroup(buildingId, "disabled"));
      } else {
        captionDiv.prepend(createStatusButtonGroup(buildingId, "enabled"));
      }
    });
  }

  addToggleButtons();

  function createStatusButtonGroup(buildingId, status) {
    const href =
      "https://www.meldkamerspel.com/buildings/" + buildingId + "/active";

    const listener = (e) => {
      e.preventDefault();
      $.ajax({
        url: href,
        type: "GET",
        success: function () {
          const statusButtonGroup = document.getElementById(
            "status-button-group-" + buildingId
          );
          statusButtonGroup.replaceWith(
            createStatusButtonGroup(
              buildingId,
              status === "disabled" ? "enabled" : "disabled"
            )
          );
        },
      });
    };

    if (status === "disabled") {
      const enableButtonInactive = document.createElement("a");
      enableButtonInactive.href = href;
      enableButtonInactive.type = "button";
      enableButtonInactive.className = "btn btn-default";
      enableButtonInactive.innerHTML = "Aan";
      enableButtonInactive.addEventListener("click", listener);

      const disableButtonActive = document.createElement("a");
      disableButtonActive.href = href;
      disableButtonActive.type = "button";
      disableButtonActive.className = "btn btn-danger active";
      disableButtonActive.innerHTML = "Uit";
      disableButtonActive.addEventListener("click", listener);

      const statusButtonGroupDisabled = document.createElement("div");
      statusButtonGroupDisabled.id = "status-button-group-" + buildingId;
      statusButtonGroupDisabled.className = "btn-group btn-group-xs";
      statusButtonGroupDisabled.role = "group";
      statusButtonGroupDisabled.appendChild(enableButtonInactive);
      statusButtonGroupDisabled.appendChild(disableButtonActive);

      return statusButtonGroupDisabled;
    }

    const enableButtonActive = document.createElement("a");
    enableButtonActive.href = href;
    enableButtonActive.type = "button";
    enableButtonActive.className = "btn btn-success active";
    enableButtonActive.innerHTML = "Aan";
    enableButtonActive.addEventListener("click", listener);

    const disableButtonInactive = document.createElement("a");
    disableButtonInactive.href = href;
    disableButtonInactive.type = "button";
    disableButtonInactive.className = "btn btn-default";
    disableButtonInactive.innerHTML = "Uit";
    disableButtonInactive.addEventListener("click", listener);

    const statusButtonGroupEnabled = document.createElement("div");
    statusButtonGroupEnabled.id = "status-button-group-" + buildingId;
    statusButtonGroupEnabled.className = "btn-group btn-group-xs";
    statusButtonGroupEnabled.role = "group";
    statusButtonGroupEnabled.appendChild(enableButtonActive);
    statusButtonGroupEnabled.appendChild(disableButtonInactive);

    return statusButtonGroupEnabled;
  }
})();
