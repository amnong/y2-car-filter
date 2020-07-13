let enableDisableButton = document.getElementById('toggleEnabled')
let hideRowsCheckbox = document.getElementById('hideRows')
let textarea = document.getElementById("modelsToHide")
let updateButton = document.getElementById("updateModelsToHide")

function setButtonText(enabled) {
    enableDisableButton.innerText = enabled ? 'הפסק סינון' : 'הפעל סינון'
}

chrome.storage.sync.get(['modelsToHide', 'enabled', 'hideRows'], function(data) {
    setButtonText(data.enabled)
    hideRowsCheckbox.checked = data.hideRows
    textarea.value = data.modelsToHide.join("\n")
});

enableDisableButton.onclick = function() {
    chrome.storage.sync.get('enabled', function(data) {
        setButtonText(!data.enabled)
        chrome.storage.sync.set({enabled: !data.enabled})
    });
};

hideRowsCheckbox.onclick = function() {
    chrome.storage.sync.set({hideRows: hideRowsCheckbox.checked})
}

updateButton.onclick = function() {
    let valuesToStore = textarea.value.trim().split("\n")
    chrome.storage.sync.set({modelsToHide: valuesToStore})
}
