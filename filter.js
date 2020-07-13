function filterFunc() {
    chrome.storage.sync.get(['modelsToHide', 'enabled', 'hideRows'], function(data) {
        let unwantedModels = data.modelsToHide
        let hiddenAdsCount = 0
        for (let element of document.querySelectorAll('div.feed_list div.feeditem')) {
            let carModel = element.querySelector('.right_col .rows span.title')
            let matching = false
            if (data.enabled) {
                for (let unwantedModel of unwantedModels) {
                    unwantedModel = unwantedModel.trim()
                    if (unwantedModel == '') continue

                    if (carModel.innerText.includes(unwantedModel)) {
                        if (data.hideRows) {
                            element.style.opacity = 1
                            element.style.display = 'none'
                        } else {
                            element.style.opacity = 0.2
                            element.style.display = 'block'
                        }
                        matching = true
                        break
                    }
                }
            }
            if (matching) {
                hiddenAdsCount += 1
            } else {
                element.style.opacity = 1
                element.style.display = 'block'
            }
        }
        updateHiddenCount(hiddenAdsCount)
    })
}

function updateHiddenCount(hiddenAdsCount) {
    hiddenAdsElement = document.querySelector('div.ads_count span#__hidden_ads_count')
    if (hiddenAdsElement === null) {
        hiddenAdsElement = document.createElement('span')
        hiddenAdsElement.id = '__hidden_ads_count'
        hiddenAdsElement.style.color = 'red'
        document.querySelector('div.ads_count').appendChild(hiddenAdsElement)
    }
    if (hiddenAdsCount) {
        hiddenAdsElement.innerText = ' (' + hiddenAdsCount + ' מודעות מוסתרות)'
    } else {
        hiddenAdsElement.innerText = ''
    }
}

setInterval(filterFunc, 2000)
