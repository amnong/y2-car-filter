let textarea = document.getElementById("modelsToHide")
let updateButton = document.getElementById("updateModelsToHide")

chrome.storage.sync.get("modelsToHide", function(data) {
    console.log("Values to hide: ", data.modelsToHide)
    textarea.value = data.modelsToHide.join("\n")
})

updateButton.onclick = function() {
    console.log("Displayed values: ", textarea.value)
    let valuesToStore = textarea.value.trim().split("\n")
    console.log("Storing values: ", valuesToStore)
    chrome.storage.sync.set({"modelsToHide": valuesToStore})
}
