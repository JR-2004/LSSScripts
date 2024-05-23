// ==UserScript==
// @name         {All}Delete Vehicles
// @version      1.2
// @description  Verwijderd geselecteerde voertuigen
// @author       DrTraxx & ScriptTeam Nederland
// @include      /^https?:\/\/(w{3}\.)?(polizei\.)?leitstellenspiel\.de\/buildings\/\d*/
// @match        https://www.leitstellenspiel.de/buildings/*
// @match        https://www.meldkamerspel.com/buildings/*
// @match        https://www.missionchief.com/buildings/*
// @match        https://www.missionchief.co.uk/buildings/*
// @match        https://www.missionchief-australia.com/buildings/*
// @match        https://www.centro-de-mando.es/buildings/*
// @match        https://www.operatorratunkowy.pl/buildings/*
// @match        https://www.larmcentralen-spelet.se/buildings/*
// @match        https://www.operatore112.it/buildings/*
// @match        https://www.operateur112.fr/buildings/*
// @match        https://www.dispetcher112.ru/buildings/*
// @match        https://www.alarmcentral-spil.dk/buildings/*
// @match        https://www.nodsentralspillet.com/buildings/*
// @match        https://www.operacni-stredisko.cz/buildings/*
// @match        https://www.jogo-operador112.com/buildings/*
// @match        https://www.operador193.com/buildings/*
// @match        https://www.dyspetcher101-game.com/buildings/*
// @match        https://www.missionchief-japan.com/buildings/*
// @match        https://www.missionchief-korea.com/buildings/*
// @match        https://www.jocdispecerat112.com/buildings/*
// @match        https://www.hatakeskuspeli.com/buildings/*
// @match        https://www.dispecerske-centrum.com/buildings/*
// @downloadURL  https://raw.githubusercontent.com/JR-2004/LSSScripts/main/All_Delete_Vehicles.js
// @updateURL    https://raw.githubusercontent.com/JR-2004/LSSScripts/main/All_Delete_Vehicles.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leitstellenspiel.de
// @grant        none
// ==/UserScript==
/* global $ */

(function () {
    'use strict';

    const arrDestroyVehicles = [],
        tableVehicleRows = $("#vehicle_table > tbody > tr");

    $("a[href*='/vehicles/new']:first").after(`
        <a class="btn btn-xs btn-danger" id="dump_vehicles">Voertuigen verplaatsen naar schroothoop</a>
        <a class="btn btn-xs btn-primary" id="select_all_vehicles">Selecteer alles</a>
    `);

    $("#vehicle_table > thead > tr")
        .append(`<th data-column="4" class="tablesorter-header sorter-false tablesorter-headerUnSorted" tabindex="0" scope="col" role="columnheader" aria-disabled="true" unselectable="on" style="user-select: none;" aria-sort="none">
                   <div class="tablesorter-header-inner">Schroothoop</div>
                 </th>`);

    for (var i = 0; i < tableVehicleRows.length; i++) {
        const v = tableVehicleRows[i],
            vehicleId = +$(v).children("td[sortvalue]")[0].firstElementChild.attributes.href.value.replace(/\D+/g, "");

        $(v).append(`<td class="mark_vehicle" style="cursor:pointer;">
                       <input type="checkbox" class="form-check-input" id="check_${ vehicleId }">
                     </td>`);
    }

    $("body").on("click", ".mark_vehicle", function () {
        const vehicleId = +$(this).children("input").attr("id").replace(/\D+/g, ""),
            index = arrDestroyVehicles.indexOf(vehicleId);
        if (index === -1) {
            arrDestroyVehicles.push(vehicleId);
            $(`#check_${ vehicleId }`)[0].checked = true;
        } else {
            arrDestroyVehicles.splice(index, 1);
            $(`#check_${ vehicleId }`)[0].checked = false;
        }
    });

    $("body").on("click", "#select_all_vehicles", function () {
        const allChecked = arrDestroyVehicles.length === tableVehicleRows.length;
        arrDestroyVehicles.length = 0;

        tableVehicleRows.each(function () {
            const vehicleId = +$(this).children("td[sortvalue]")[0].firstElementChild.attributes.href.value.replace(/\D+/g, "");
            $(`#check_${vehicleId}`).prop('checked', !allChecked);
            if (!allChecked) {
                arrDestroyVehicles.push(vehicleId);
            }
        });
    });

    $("body").on("click", "#dump_vehicles", async function () {
        if (arrDestroyVehicles.length === 0) {
            alert("Du musst Fahrzeuge zum verschrotten auswählen!");
            return;
        }
        if (confirm(`Willst du die ${ arrDestroyVehicles.length } Fahrzeuge wirklich verschrotten?`) === true) {
            for (var p in arrDestroyVehicles) {
                const kernschrott = arrDestroyVehicles[p];
                $("#dump_vehicles").text(`Verschrotte Fahrzeug ${ +p + 1 } von ${ arrDestroyVehicles.length }!`);
                await $.post(`/vehicles/${ kernschrott }`, { "_method": "delete", "authenticity_token": $("meta[name=csrf-token]").attr("content") });
            }
            window.location.reload();
        }
    });

})();
