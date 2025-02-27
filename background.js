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
                        target : {tabId : tabId},
                        files : [ item ],
                        world: "MAIN"
                    })
                }
            }
        }
    }

    //api
    console.log("%cSF ","color: white; background:black; border-raidus:0.5em;", "Injected SnapFox API into tab: " + tab.url);
    chrome.scripting.executeScript({
        
        target : {tabId : tabId},
        files : ["/api/main.js", "/api/lang.js"],
        world: "MAIN"
    })

    // chrome.scripting
    //     .registerContentScripts([
    //         {
    //         id: "session-script",
    //         js: ["/api/lang.js"],
    //         persistAcrossSessions: false,
    //         matches: ["https://snap.berkeley.edu/*"],
    //         runAt: "document_start",
    //         world: "MAIN", // this fails
    //         },
    //     ])
    //     .then(() => console.log("registration complete"))
    //     .catch((err) => console.warn("unexpected error", err));
    
});