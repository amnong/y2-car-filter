function filterFunc() {
    chrome.storage.sync.get(["modelsToHide", "enabled", "hideRows"], function(data) {
        let unwantedModels = data.modelsToHide
        for (let element of document.querySelectorAll("div.feed_list div.feeditem")) {
            let carModel = element.querySelector(".right_col .rows span.title")
            let matching = false
            if (data.enabled) {
                for (let unwantedModel of unwantedModels) {
                    unwantedModel = unwantedModel.trim()
                    if (unwantedModel == "") continue

                    if (carModel.innerText.includes(unwantedModel)) {
                        if (data.hideRows) {
                            element.style.opacity = 1
                            element.style.display = "none"
                        } else {
                            element.style.opacity = 0.2
                            element.style.display = "block"
                        }
                        matching = true
                        break
                    }
                }
            }
            if (!matching) {
                element.style.opacity = 1
                element.style.display = "block"
            }
        }
    })
}

setInterval(filterFunc, 2000)
