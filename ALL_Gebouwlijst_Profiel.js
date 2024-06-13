// ==UserScript==
// @name         {All}GebouwOverzicht
// @version      1.4.4
// @description  GebouwOverzicht weergave in spelersprofiel
// @author       DrTraxx & ScriptTeam Nederland
// @include      /^https?:\/\/(?:w{3}\.)?(?:(policie\.)?operacni-stredisko\.cz|(politi\.)?alarmcentral-spil\.dk|(polizei\.)?leitstellenspiel\.de|missionchief\.gr|(?:(police\.)?missionchief-australia|(police\.)?missionchief|(poliisi\.)?hatakeskuspeli|missionchief-japan|missionchief-korea|nodsentralspillet|meldkamerspel|operador193|jogo-operador112|jocdispecerat112|dispecerske-centrum|112-merkez|dyspetcher101-game)\.com|(police\.)?missionchief\.co\.uk|centro-de-mando\.es|centro-de-mando\.mx|(police\.)?operateur112\.fr|(polizia\.)?operatore112\.it|operatorratunkowy\.pl|dispetcher112\.ru|larmcentralen-spelet\.se)\/profile\/.*\
// @icon   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/icon.png
// @match        https://www.leitstellenspiel.de/profile/*
// @match		 https://www.meldkamerspel.com/profile/*
// @match		 https://www.missionchief.com/profile/*
// @match		 https://www.missionchief.co.uk/profile/*
// @match		 https://www.missionchief-australia.com/profile/*
// @match 		 https://www.centro-de-mando.es/profile/*
// @match 	     https://www.operatorratunkowy.pl/profile/*
// @match		 https://www.larmcentralen-spelet.se/profile/*
// @match		 https://www.operatore112.it/profile/*
// @match		 https://www.operateur112.fr/profile/*
// @match		 https://www.dispetcher112.ru/profile/*
// @match		 https://www.alarmcentral-spil.dk/profile/*
// @match		 https://www.nodsentralspillet.com/profile/*
// @match		 https://www.operacni-stredisko.cz/profile/*
// @match		 https://www.jogo-operador112.com/profile/*
// @match		 https://www.operador193.com/profile/*
// @match		 https://www.dyspetcher101-game.com/profile/*
// @match		 https://www.missionchief-japan.com/profile/*
// @match		 https://www.missionchief-korea.com/profile/*
// @match		 https://www.jocdispecerat112.com/profile/*
// @match		 https://www.hatakeskuspeli.com/profile/*
// @match		 https://www.dispecerske-centrum.com/profile/*
// @downloadURL  https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_Gebouwlijst_Profiel.js
// @updateURL    https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_Gebouwlijst_Profiel.js
// @grant        none
// ==/UserScript==
/*global $*/

(async function() {
    'use strict';

    function getAddress(lat, lon) {
        return new Promise(async resolve => {
            await $.get("/reverse_address?latitude=" + lat + "&longitude=" + lon + "", function(data) {
                resolve(data);
            });
        });
    }

    const userBuildings = [];

    for (var i = 0; i < $("script").length; i++) {
        if ($("script")[i].innerHTML.includes("buildingMarkerAdd")) {
            const regexDatabase = $("script")[i].innerHTML,
                regExpression = /(?:buildingMarkerAdd\()(?<obj>\{.+\})/gm;
            var match;
            while (match = regExpression.exec(regexDatabase)) {
                userBuildings.push(JSON.parse(match.groups.obj));
            }
            break;
        }
    }

    $(".tab-content").append(`<div id="profile_buildings" role="tabpanel" class="tab-pane"></div>`);

    $('#tabs').append(`<li role='presentation'><a href="#profile_buildings" aria-controls="profile_buildings" role="tab" data-toggle="tab">GebouwOverzicht</a></li>`);

    for (var j in userBuildings) {
        var e = userBuildings[j],
            insertHtml = `<div class="panel panel-default">
                            <div class="panel-heading">
                              <h4><img src="${ e.icon }"> <a href="/buildings/${ e.id }" class="lightbox-open">${ e.name }</a></h4>
                            </div>
                            <div class="panel-body">
                              <span lat="${ e.latitude }" lon="${ e.longitude }" style="cursor:pointer;">show Address</span>
                            </div>
                          </div>`;
        $("#profile_buildings").append(insertHtml);
    }

    $("body").on("click", ".panel-body > span", async function() {
        $(this).text(await getAddress($(this).attr("lat"), $(this).attr("lon"))).css({ "cursor": "text" });
    });

})();
