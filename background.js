chrome.tabs.onUpdated.addListener(async function (tabId, info) {
    var tab = await chrome.tabs.get(tabId);
    var listOfIds = [];
    var features = await (await fetch("/features/features.json")).json();
    let settings = (await chrome.storage.sync.get("features")).features || "";
    for (var feature in features) {
        var feature = features[feature];

        //Get feature data
        var featureFolder = feature.folder;
        const featureData = await (await fetch("/features/"+featureFolder+"/data.json")).json();
        if(settings.includes(featureFolder)){
            if (featureData.hasOwnProperty("css")) {
                for(var item in featureData.css){
                    var item = featureData.css[item];
                    item = "/features/"+featureFolder+"/"+item;
                    chrome.scripting.insertCSS({
                        target: { tabId: tabId },
                        files: [item]
                    });
                    console.log("inserted css")
                }
            }

            if (featureData.hasOwnProperty("js")) {
                for(var item in featureData.js){
                    var item = featureData.js[item];
                    item = "/features/"+featureFolder+"/"+item;
                    chrome.scripting.executeScript({
                        target : {tabId : getTabId()},
                        files : [ item ],
                    })
                }
            }
        }
    }

});