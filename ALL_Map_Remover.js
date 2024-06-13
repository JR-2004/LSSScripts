// ==UserScript==
// @name         {ALL}Map Remover
// @version      1.2.1
// @description  Verwijderd de kaart van de homepage
// @downloadURL  https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_Map_Remover.js
// @updateURL    https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_Map_Remover.js
// @author       Mephisto616 (JKS) & ScriptTeam Nederland
// @icon   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/icon.png
// @match        https://www.operacni-stredisko.cz/*
// @match        https://policie.operacni-stredisko.cz/*
// @match        https://www.alarmcentral-spil.dk/*
// @match        https://politi.alarmcentral-spil.dk/*
// @match        https://www.leitstellenspiel.de/*
// @match        https://polizei.leitstellenspiel.de/*
// @match        https://www.missionchief-australia.com/*
// @match        https://police.missionchief-australia.com/*
// @match        https://www.missionchief.co.uk/*
// @match        https://police.missionchief.co.uk/*
// @match        https://www.missionchief.com/*
// @match        https://police.missionchief.com/*
// @match        https://www.centro-de-mando.es/*
// @match        https://www.centro-de-mando.mx/*
// @match        https://www.hatakeskuspeli.com/*
// @match        https://poliisi.hatakeskuspeli.com/*
// @match        https://www.operateur112.fr/*
// @match        https://police.operateur112.fr/*
// @match        https://www.operatore112.it/*
// @match        https://polizia.operatore112.it/*
// @match        https://www.missionchief-japan.com/*
// @match        https://www.missionchief-korea.com/*
// @match        https://www.nodsentralspillet.com/*
// @match        https://politiet.nodsentralspillet.com/*
// @match        https://www.meldkamerspel.com/*
// @match        https://politie.meldkamerspel.com/*
// @match        https://www.operatorratunkowy.pl/*
// @match        https://policja.operatorratunkowy.pl/*
// @match        https://www.operador193.com/*
// @match        https://www.jogo-operador112.com/*
// @match        https://policia.jogo-operador112.com/*
// @match        https://www.jocdispecerat112.com/*
// @match        https://www.dispetcher112.ru/*
// @match        https://www.dispecerske-centrum.com/*
// @match        https://www.larmcentralen-spelet.se/*
// @match        https://polis.larmcentralen-spelet.se/*
// @match        https://www.112-merkez.com/*
// @match        https://www.dyspetcher101-game.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var enableButton = true;
    var mapHidden = localStorage.getItem('mapHidden') === 'true';
    var radioElement = document.getElementById('radio');
    radioElement.classList.add('sidebar-nav');
    document.addEventListener('click', function(e) {
        if (e.target.id === 'button') {
            toggleOverlay('map_outer');
            mapHidden = isMapHidden();
            saveMapStatus(mapHidden);
            setRadioWidth();
        }
    });
    window.addEventListener('resize', function() {
        setRadioWidth();
    });
    window.addEventListener('load', function() {
        toggleMapDisplay();
        setRadioWidth();
    });
    if (enableButton) {
        var mapHeading = document.querySelector('.flex-row.flex-nowrap.justify-between.align-items-center .flex-grow-1');
        if (mapHeading) {
            var toggleButton = document.createElement('a');
            toggleButton.className = mapHidden ? 'btn btn-xs btn-danger' : 'btn btn-xs btn-success';
            toggleButton.textContent = mapHidden ? '🙈' : '👁️';
            toggleButton.title = mapHidden ? 'Map einblenden' : 'Map ausblenden';
            toggleButton.addEventListener('click', function() {
                toggleOverlay('map_outer');
                mapHidden = isMapHidden();
                saveMapStatus(mapHidden);
                toggleButton.className = mapHidden ? 'btn btn-xs btn-danger' : 'btn btn-xs btn-success';
                toggleButton.textContent = mapHidden ? '🙈' : '👁️';
                toggleButton.title = mapHidden ? 'Map einblenden' : 'Map ausblenden';
                setRadioWidth();
            });

            mapHeading.insertBefore(toggleButton, mapHeading.firstChild);
        }
    }

    function toggleOverlay(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            element.style.display = isMapHidden() ? '' : 'none';
        }
    }

    function isMapHidden() {
        var element = document.getElementById('map_outer');
        return element.style.display === 'none';
    }

    function saveMapStatus(mapHidden) {
        localStorage.setItem('mapHidden', mapHidden);
    }

    function toggleMapDisplay() {
        var mapElement = document.getElementById('map_outer');
        if (mapHidden) {
            mapElement.style.display = 'none';
        } else {
            mapElement.style.display = '';
        }
    }

    function setRadioWidth() {
        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var maxWidth = 0.985 * screenWidth;
        var paddingPercentage = 2.5;
        radioElement.style.width = mapHidden ? maxWidth + 'px' : '';
        radioElement.style.paddingRight = mapHidden ? paddingPercentage + '%' : '';
        radioElement.style.marginTop = mapHidden ? '5px' : '';
    }

    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    var newCssRules = `
#buildings, #chat_panel, #radio, body.dark #missions_outer, body.dark #buildings_outer, body.dark #chat_outer, body.dark #radio_outer, #missions_outer, #buildings_outer, #chat_outer, #radio_outer{height: 625px !important;background-image: linear-gradient(rgb(0, 0, 0, 0) 0px, rgb(33, 0, 0, 0) 100%) !important; box-shadow: rgb(33, 0, 0, 0) !important; background-color: rgb(0, 0, 0, 0) !important;}#missions, body.dark #missions{height: 615px !important;}#map, body.dark #map{height: 615px !important;}
    `;
    styleElement.appendChild(document.createTextNode(newCssRules));
    document.head.appendChild(styleElement);
})();
