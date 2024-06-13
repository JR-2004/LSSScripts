// ==UserScript==
// @name            {All}SchoolToewijzer
// @namespace       https://www.leitstellenspiel.de/
// @version         1.3.1
// @author          BOS-Ernie & ScriptTeam Nederland
// @description     Voegt knoppen toe van 1 tot 10 aan een school om mensen op te leiden.
// @match           https://www.leitstellenspiel.de/schoolings/*
// @match		        https://www.meldkamerspel.com/schoolings/*
// @match           https://www.missionchief.com/schoolings/*
// @match		        https://www.missionchief.co.uk/schoolings/*
// @match		        https://www.missionchief-australia.com/schoolings/*
// @match 		      https://www.centro-de-mando.es/schoolings/*
// @match 	        https://www.operatorratunkowy.pl/schoolings/*
// @match		        https://www.larmcentralen-spelet.se/schoolings/*
// @match		        https://www.operatore112.it/schoolings/*
// @match		        https://www.operateur112.fr/schoolings/*
// @match		        https://www.dispetcher112.ru/schoolings/*
// @match		        https://www.alarmcentral-spil.dk/schoolings/*
// @match		        https://www.nodsentralspillet.com/schoolings/*
// @match		        https://www.operacni-stredisko.cz/schoolings/*
// @match		        https://www.jogo-operador112.com/schoolings/*
// @match		        https://www.operador193.com/schoolings/*
// @match		        https://www.dyspetcher101-game.com/schoolings/*
// @match		        https://www.missionchief-japan.com/schoolings/*
// @match		        https://www.missionchief-korea.com/schoolings/*
// @match		        https://www.jocdispecerat112.com/schoolings/*
// @match		        https://www.hatakeskuspeli.com/schoolings/*
// @match		        https://www.dispecerske-centrum.com/schoolings/*
// @match           https://www.leitstellenspiel.de/buildings/*
// @match		        https://www.meldkamerspel.com/buildings/*
// @match           https://www.missionchief.com/buildings/*
// @match		        https://www.missionchief.co.uk/buildings/*
// @match		        https://www.missionchief-australia.com/buildings/*
// @match 		      https://www.centro-de-mando.es/buildings/*
// @match 	        https://www.operatorratunkowy.pl/buildings/*
// @match		        https://www.larmcentralen-spelet.se/buildings/*
// @match		        https://www.operatore112.it/buildings/*
// @match		        https://www.operateur112.fr/buildings/*
// @match		        https://www.dispetcher112.ru/buildings/*
// @match		        https://www.alarmcentral-spil.dk/buildings/*
// @match		        https://www.nodsentralspillet.com/buildings/*
// @match		        https://www.operacni-stredisko.cz/buildings/*
// @match		        https://www.jogo-operador112.com/buildings/*
// @match		        https://www.operador193.com/buildings/*
// @match		        https://www.dyspetcher101-game.com/buildings/*
// @match		        https://www.missionchief-japan.com/buildings/*
// @match		        https://www.missionchief-korea.com/buildings/*
// @match		        https://www.jocdispecerat112.com/buildings/*
// @match		        https://www.hatakeskuspeli.com/buildings/*
// @match		        https://www.dispecerske-centrum.com/buildings/*
// @icon   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/icon.png
// @downloadURL     https://raw.githubusercontent.com/JR-2004/LSSScripts/main/All_Versions_Schooltoewijzer.js
// @updateURL       https://raw.githubusercontent.com/JR-2004/LSSScripts/main/All_Versions_Schooltoewijzer.js
// @run-at          document-idle
// @grant           none
// ==/UserScript==

/* global loadedBuildings */

(function () {
  "use strict";

  let elements = document.getElementsByClassName(
    "panel-heading personal-select-heading"
  );
  for (let i = 0; i < elements.length; i++) {
    let buildingId = elements[i].getAttribute("building_id");
    elements[i].children[0].appendChild(createPersonnelSelector(buildingId));
  }

  $(".personal-select-heading")
    .unbind("click")
    .bind("click", panelHeadingClickEvent);

  async function selectPersonnelClick(event) {
    await selectPersonnel(
      event.target.dataset.buildingId,
      event.target.dataset.capacity
    );
    event.preventDefault();
  }

  async function resetPersonnelClick(event) {
    await resetPersonnel(event.target.dataset.buildingId);
    event.preventDefault();
  }

  async function panelHeadingClickEvent(event) {
    // Skip redundant panelHeadingClick call which is handled by button click event
    if (
      event.target.classList.contains("schooling-personnel-select-button") ||
      event.target.parentNode.classList.contains(
        "schooling-personnel-reset-button"
      )
    ) {
      return;
    }

    let buildingIdElement = event.target.outerHTML.match(/building_id="(\d+)"/);
    if (buildingIdElement === null) {
      buildingIdElement =
        event.target.parentElement.parentElement.parentElement.parentElement.outerHTML.match(
          /building_id="(\d+)"/
        );
    }

    await panelHeadingClick(buildingIdElement[1], true);
  }

  async function panelHeadingClick(buildingId, toggle = false) {
    const panelHeading = getPanelHeading(buildingId);
    const panelBody = getPanelBody(buildingId);

    const href = panelHeading.outerHTML.match(/href="([^"]+)"/)[1];

    if (panelBody.classList.contains("hidden")) {
      if (toggle) {
        panelBody.classList.remove("hidden");
      }

      if (loadedBuildings.indexOf(href) === -1) {
        loadedBuildings.push(href);
        await $.get(href, function (data) {
          panelBody.innerHTML = data;

          const education_key = $("input[name=education]:checked").attr(
            "education_key"
          );

          if (
            typeof education_key == "undefined" &&
            typeof globalEducationKey != "undefined"
          ) {
            schooling_disable(globalEducationKey);
          } else if (typeof education_key != "undefined") {
            schooling_disable(education_key);
            update_schooling_free();
          }
        });
      }
    } else if (toggle) {
      panelBody.classList.add("hidden");
    }
  }

  function createPersonnelSelector(buildingId) {
    let buttonGroup = document.createElement("div");
    buttonGroup.id = "schooling-assigner-" + buildingId;
    buttonGroup.className = "btn-group btn-group-xs";

    let resetIcon = document.createElement("span");
    resetIcon.className = "glyphicon glyphicon-trash";
    resetIcon.dataset.buildingId = buildingId;

    let resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className =
      "btn btn-default btn-sm schooling-personnel-reset-button";
    resetButton.appendChild(resetIcon);
    resetButton.addEventListener("click", resetPersonnelClick);

    buttonGroup.appendChild(resetButton);

    for (let i = 1; i < 11; i++) {
      let button = document.createElement("button");
      button.type = "button";
      button.className =
        "btn btn-default btn-sm schooling-personnel-select-button";
      button.dataset.buildingId = buildingId;
      button.dataset.capacity = i.toString();
      button.textContent = i.toString();
      button.addEventListener("click", selectPersonnelClick);

      buttonGroup.appendChild(button);
    }

    return buttonGroup;
  }

  async function selectPersonnel(buildingId, capacity) {
    await panelHeadingClick(buildingId);

    let schoolingFree = $("#schooling_free");
    let free = schoolingFree.html();
    $(".schooling_checkbox[building_id='" + buildingId + "']").each(
      function () {
        if (
          !$(this).prop("checked") &&
          !$(this).prop("disabled") &&
          free > 0 &&
          capacity > 0 &&
          $(this).parent().parent().find("a")[0] == null
        ) {
          if (
            $("#school_personal_education_" + $(this).val())
              .html()
              .trim() === ""
          ) {
            $(this).prop("checked", true);
            --free;
            --capacity;
          }
        }
      }
    );

    schoolingFree.html(free);
    update_costs();

    updateSelectionCounter(buildingId);
  }

  async function resetPersonnel(buildingId) {
    await panelHeadingClick(buildingId);

    let schoolingFree = $("#schooling_free");
    let free = schoolingFree.html();

    $(".schooling_checkbox[building_id='" + buildingId + "']").each(
      function () {
        if ($(this).prop("checked")) {
          $(this).prop("checked", false);
          ++free;
        }
      }
    );

    console.log("setting free", free);

    schoolingFree.html(free);
    update_costs();

    updateSelectionCounter(buildingId);
  }

  function countSelectedPersonnel(buildingId) {
    let count = 0;
    let checkboxes = document.querySelectorAll(
      ".schooling_checkbox[building_id='" + buildingId + "']"
    );

    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        count++;
      }
    }

    return count;
  }

  function updateSelectionCounter(buildingId) {
    const element_id = "personnel-selection-counter-" + buildingId;

    let counter = document.createElement("span");
    counter.id = element_id;
    counter.className = "label label-primary";
    counter.textContent = countSelectedPersonnel(buildingId) + " geselecteerd";

    const element = document.getElementById(element_id);

    if (element) {
      element.replaceWith(counter);
    } else {
      document
        .getElementById("schooling-assigner-" + buildingId)
        .parentNode.prepend(counter);
    }
  }

  function getPanelHeading(buildingId) {
    return document.querySelector(
      ".personal-select-heading[building_id='" + buildingId + "']"
    );
  }

  function getPanelBody(buildingId) {
    return document.querySelector(
      ".panel-body[building_id='" + buildingId + "']"
    );
  }
})();
