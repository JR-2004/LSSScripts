// ==UserScript==
// @name         {ALL}Searchbar Schoolings page
// @namespace    https://www.meldkamerspel.com/
// @version      1.1.1
// @description  Adds a searchbar to all Missionchief versions for filtering buildings
// @author       JR04
// @match           https://www.leitstellenspiel.de/schoolings/*
// @match                        https://www.meldkamerspel.com/schoolings/*
// @match           https://www.missionchief.com/schoolings/*
// @match                        https://www.missionchief.co.uk/schoolings/*
// @match                        https://www.missionchief-australia.com/schoolings/*
// @match                       https://www.centro-de-mando.es/schoolings/*
// @match                 https://www.operatorratunkowy.pl/schoolings/*
// @match                        https://www.larmcentralen-spelet.se/schoolings/*
// @match                        https://www.operatore112.it/schoolings/*
// @match                        https://www.operateur112.fr/schoolings/*
// @match                        https://www.dispetcher112.ru/schoolings/*
// @match                        https://www.alarmcentral-spil.dk/schoolings/*
// @match                        https://www.nodsentralspillet.com/schoolings/*
// @match                        https://www.operacni-stredisko.cz/schoolings/*
// @match                        https://www.jogo-operador112.com/schoolings/*
// @match                        https://www.operador193.com/schoolings/*
// @match                        https://www.dyspetcher101-game.com/schoolings/*
// @match                        https://www.missionchief-japan.com/schoolings/*
// @match                        https://www.missionchief-korea.com/schoolings/*
// @match                        https://www.jocdispecerat112.com/schoolings/*
// @match                        https://www.hatakeskuspeli.com/schoolings/*
// @match                        https://www.dispecerske-centrum.com/schoolings/*
// @icon   https://raw.githubusercontent.com/JR-2004/LSSScripts/main/icon.png
// @downloadURL     https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_Schoolingsfilter.js
// @updateURL       https://raw.githubusercontent.com/JR-2004/LSSScripts/main/ALL_Schoolingsfilter.js

// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Functie om een zoekbalk toe te voegen
    function addSearchBar() {
        // Maak de zoekbalk en zoekknop aan
        const searchBar = document.createElement('input');
        searchBar.type = 'text';
        searchBar.placeholder = 'Zoek...';
        searchBar.style.margin = '10px 0';
        searchBar.style.padding = '5px';
        searchBar.style.width = '100%';
        searchBar.style.boxSizing = 'border-box';

        // Voeg de zoekbalk toe aan het begin van de body
        document.body.insertBefore(searchBar, document.body.firstChild);

        // Voeg event listener toe aan de zoekbalk
        searchBar.addEventListener('input', function() {
            const searchTerm = searchBar.value.toLowerCase();
            const items = document.querySelectorAll('.panel');

            items.forEach(function(item) {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    window.addEventListener('load', addSearchBar);
})();