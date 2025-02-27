
getFeatures();

async function getThemes(){
    let settings = (await chrome.storage.sync.get("themes")).themes || "";
    const data = await (await fetch("/themes/index.json")).json();
    for(var theme in data){
        var theme = data[theme];
        var div = document.getElementById('themes');
        
        var themeFolder = theme.folder;
        const themeData = await (await fetch("/themes/"+themeFolder+"/data.json")).json();


    }
}

async function getFeatures() {
    let settings = (await chrome.storage.sync.get("features")).features || "";
    const data = await (await fetch("/features/features.json")).json();
    for(var feature in data){
        var feature = data[feature];
        var div = document.getElementById('features')

        //Get feature data
        var featureFolder = feature.folder;
        const featureData = await (await fetch("/features/"+featureFolder+"/data.json")).json();
        var featureTitle = featureData.title;
        var featureDescription = featureData.description;
        var featureAuthors = featureData.authors;

        //Create feature element
        var featureElement = document.createElement("div");
        featureElement.classList.add("feature");

        //Create feature title
        var featureTitleElement = document.createElement("span");
        featureTitleElement.classList.add("title");
        featureTitleElement.innerHTML = featureTitle;

        //Create feature description
        var featureDescriptionElement = document.createElement("div");
        featureDescriptionElement.classList.add("description");

        var authors = []

        for(var item in featureAuthors){
            var item = featureAuthors[item];
            if(item.hasOwnProperty("url")){
                authors.push(`<a href='${item.url}' target='_blank'>${item.name}</a>`);
            }else{
                authors.push(item.name)
            }
        }

        authors = authors.join(", ")
        featureDescriptionElement.innerHTML = featureDescription + "<br><br>By " + authors

        //create feature switch
        var featureSwitchElement = document.createElement("label");
        featureSwitchElement.classList.add("switch");

        //create feature switch input
        var featureSwitchInputElement = document.createElement("input");
        featureSwitchInputElement.setAttribute("type", "checkbox");

        //create feature switch slider
        var featureSwitchSliderElement = document.createElement("span");
        featureSwitchSliderElement.classList.add("slider");
        featureSwitchSliderElement.classList.add("round");
        if (settings.includes(featureFolder)) {
            featureSwitchInputElement.checked = true;
        }

        //append all elements
        div.append(featureElement);
        featureElement.append(featureTitleElement);
        featureElement.append(featureDescriptionElement);
        featureElement.append(featureSwitchElement);
        featureSwitchElement.append(featureSwitchInputElement);
        featureSwitchElement.append(featureSwitchSliderElement);

        //add event listener
        featureSwitchInputElement.addEventListener("change", function() {
            console.log("changed")
            if (this.checked) {
                settings = settings + featureFolder + ",";
            } else {
                settings = settings.replace(featureFolder + ",", "");
            }
            chrome.storage.sync.set({features: settings});
        });
        


    }
}
