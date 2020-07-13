'use strict';

let defaultOptions = {
    enabled: true,
    hideRows: false
}

chrome.runtime.onInstalled.addListener(function() {
    // Set default models to hide (empty array)
    chrome.storage.sync.get('modelsToHide', function(data) {
        if (data.modelsToHide === undefined) {
            chrome.storage.sync.set({modelsToHide: []});
        }
    });

    // Set default options
    for (const [option, value] of Object.entries(defaultOptions)) {
        chrome.storage.sync.get(option, function(data) {
            if (data[option] === undefined) {
                let newData = {}
                newData[option] = value
                chrome.storage.sync.set(newData);
            }
        });
    }

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.yad2.co.il'},
      })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
