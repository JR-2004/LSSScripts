// ==UserScript==
// @name        {All}Share Missions
// @namespace   bos-ernie.leitstellenspiel.de
// @version     1.1.1
// @license     BSD-3-Clause
// @author      BOS-Ernie & JR04
// @description:de Fügt einen Button zum schnellen Teilen der eigenen Einsätze aus der Einsatzliste hinzu.
// @description  Adds a button to the missionlist to share missions faster.  NL: Voegt een knop toe in de inzettenlijst om sneller meldingen te delen.
// @match        https://www.leitstellenspie.de/
// @match                     https://www.meldkamerspel.com/
// @match                     https://www.missionchief.com/
// @match                     https://www.missionchief.co.uk/
// @match                     https://www.missionchief-australia.com/
// @match                    https://www.centro-de-mando.es/
// @match              https://www.operatorratunkowy.pl/
// @match                     https://www.larmcentralen-spelet.se/
// @match                     https://www.operatore112.it/
// @match                     https://www.operateur112.fr/
// @match                     https://www.dispetcher112.ru/
// @match                     https://www.alarmcentral-spil.dk/
// @match                     https://www.nodsentralspillet.com/
// @match                     https://www.operacni-stredisko.cz/
// @match                     https://www.jogo-operador112.com/
// @match                     https://www.operador193.com/
// @match                     https://www.dyspetcher101-game.com/
// @match                     https://www.missionchief-japan.com/
// @match                     https://www.missionchief-korea.com/
// @match                     https://www.jocdispecerat112.com/
// @match                     https://www.hatakeskuspeli.com/
// @match                     https://www.dispecerske-centrum.com/
// @icon        https://raw.githubusercontent.com/JR-2004/LSSScripts/main/icon.png
// @run-at      document-idle
// @grant       none
// @downloadURL  https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_Share_Missions.js
// @updateURL    https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_Share_Missions.js
// ==/UserScript==

/* global missionMarkerAdd */

(function () {
  function addShareButtonToMissionList() {
    document.querySelectorAll("#mission_list .missionSideBarEntry:not(.mission_deleted)").forEach(mission => {
      if (mission.querySelector(".panel-success")) {
        return;
      }

      const missionId = mission.id.replace(/\D+/g, "");

      addShareButtonToMission(missionId);
    });
  }

  function addShareButtonToNewMissions() {
    let originalMissionMarkerAdd = missionMarkerAdd;

    missionMarkerAdd = e => {
      originalMissionMarkerAdd(e);

      if (e.alliance_id) {
        const shareButton = document.querySelector(`#share-button-${e.id}`);

        if (shareButton) {
          shareButton.remove();
        }
      }

      if (e.user_id !== user_id || e.kt === true || e.alliance_id || document.querySelector(`#share-button-${e.id}`)) {
        return;
      }

      addShareButtonToMission(e.id);
    };
  }

  function addShareButtonToMission(missionId) {
    const mission = document.querySelector(`#mission_list #mission_${missionId}`);

    if (!mission) {
      console.warn(`Mission ${missionId} not found`);
      return;
    }

    mission.querySelector("#alarm_button_" + missionId).insertAdjacentHTML(
      "afterend",
      `<a id="share-button-${missionId}" class="btn btn-default btn-xs" data-mission-id="${missionId}" title="Im Verband freigeben">
        <span class="glyphicon glyphicon-bullhorn"></span>
    </a>`,
    );
  }

  function addShareButtonEventListener() {
    document.addEventListener("click", async event => {
      const element = event.target;
      const parent = element.parentElement;

      if (!element.id.startsWith("share-button-") && !parent.id.startsWith("share-button-")) {
        return;
      }

      event.preventDefault();

      if (element.id.startsWith("share-button-")) {
        await share(element.dataset.missionId).then(() => {
          element.remove();
        });
      } else if (parent.id.startsWith("share-button-")) {
        await share(parent.dataset.missionId).then(() => {
          parent.remove();
        });
      }
    });
  }

  async function share(missionId) {
    await fetch(`/missions/${missionId}/alliance`);
  }

  function main() {
    addShareButtonToMissionList();
    addShareButtonToNewMissions();
    addShareButtonEventListener();
  }

  main();
})();
