/// <reference path="../helper/jquery.d.ts" />
// navigator.getBattery().then(function(battery) {

//     console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
//     console.log("Battery level: " + battery.level * 100 + "%");
//     console.log("Battery charging time: " + battery.chargingTime + " seconds");
//     console.log("Battery discharging time: " + battery.dischargingTime + " seconds");

//     battery.addEventListener('chargingchange', function() {
//       console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
//     });

//     battery.addEventListener('levelchange', function() {
//       console.log("Battery level: " + battery.level * 100 + "%");
//     });

//     battery.addEventListener('chargingtimechange', function() {
//       console.log("Battery charging time: " + battery.chargingTime + " seconds");
//     });

//     battery.addEventListener('dischargingtimechange', function() {
//       console.log("Battery discharging time: " + battery.dischargingTime + " seconds");
//     });

//   });

define(function () {
    function _pickWords() {

        let sel = window.getSelection()
        let node = sel.anchorNode
        let range = sel.getRangeAt(0)

        while (!/^\s/.test(range.toString()) && range.startOffset > 0) {
            range.setStart(node, range.startOffset - 1)
        }
        while (!/^\w/.test(range.toString()) && range.startOffset < node.length) {
            range.setStart(node, range.startOffset + 1)
        }
        while (!/\s$/.test(range.toString()) && range.endOffset < node.length) {
            range.setEnd(node, range.endOffset + 1)
        }
        while (!/\w$/.test(range.toString()) && range.endOffset > 0) {
            range.setEnd(node, range.endOffset - 1)
        }
        let word = range.toString()
        // let picked = this.document.createElement("span")
        // picked.className = "picked"
        // $('.picked').removeClass("picked")
        // range.surroundContents(picked)
    }

    return {
        pickWords: _pickWords
    }
})

