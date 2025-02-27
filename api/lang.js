//Language retrieval funtion retrerives the language from "/lang/<code>" folder 

var lang = {}
lang.code = null;

lang.data = {} //where langauge data will be loaded to

lang.loadCore = async function(){
    lang.code = navigator.language;
    lang.code = lang.code.split("-")[0];
    lang.data.core = await (await fetch("chrome-extension://"+chrome.runtime.id+"/lang/"+lang.code+"/core.json")).json();
}

lang.call = function(key){
    return lang.data[key];
}
