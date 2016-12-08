var EdgarJs = {
    load(key,value){
        if(localStorage.getItem(key)){
            return localStorage.getItem(key);
        }
        console.log("no existe");
        
    },
    save(key,value){
        if(!localStorage.getItem(key)){
            localStorage.setItem(key,value)
            return;
        }
        console.log("ya existe")
        
    },
    saveJSON(key,value){
        if(!localStorage.getItem(key)){
        
            localStorage.setItem(key,  JSON.stringify(value));
            return;
        }
        console.log("ya existe")
        
    },
    loadJSON(key){
         if(localStorage.getItem(key)){
            return JSON.parse(localStorage.getItem(key));
        }
        return "no existe este key"
    },
    remove(key){
        if(localStorage.getItem(key)){
            localStorage.removeItem(key)
        }
    },
    removeAll(){
        localStorage.clear();
    }



}
function startup(){
   

    $(".load").on("click",function(){
        var source   = $("#entry-template").html();
        var template = Handlebars.compile(source);
        var context = EdgarJs.loadJSON("prueba");
        var html    = template(context);
        $("#app").html(html);
    })

  $(".save").on("click",function(){
      var bindobject = testObject = {'title': 'edgar','body':'lalalalala'};

     EdgarJs.saveJSON("prueba",bindobject);
 })

 $(".delete").on("click",function(){
     EdgarJs.removeAll();
 })
}
window.onload = startup;