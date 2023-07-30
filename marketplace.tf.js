// ==UserScript==
// @name         Marketplace.tf show item levels
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Shows marketplace.tf item levels
// @author       DrSmugleaf
// @match        https://marketplace.tf/items/tf2/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=marketplace.tf
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const levelRegex = new RegExp(/Level (\d+)/);
    const nameLevelRegex = new RegExp(/ \(\d+\)$/);

    function showLevels(first) {
        const selector = first ? "#items-list > div > table > tbody > tr > td" : "#items-list > table > tbody > tr > td"
        const rows = document.querySelectorAll(selector);
        rows.forEach(element => {
            const data = element.getAttribute("data-content");
            if (!data) {
                return;
            }

            const name = element.querySelector("span > span");
            if (nameLevelRegex.test(name.textContent)) {
                return;
            }

            const match = levelRegex.exec(data);
            const level = match[1];
            name.textContent += ` (${level})`

            if (level == 100) {
                element.style["background-color"] = "black";
            }
        });
    };

    const list = document.querySelector("#items-list");

    var observer = new MutationObserver(() => {
        showLevels(false);
    });

    var config = {attributes: true, subtree: true};
    observer.observe(list, config);

    showLevels(true);
})();