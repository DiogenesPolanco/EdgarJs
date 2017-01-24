function startup() {
    $(".load").on("click", function() {
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        var context = EdgarJs.LoadJSON("prueba");
        var html = template(context);
        $("#app").html(html);
    })

    $(".save").on("click", function() {
        var bindobject = testObject = { 'title': 'edgar', 'body': 'lalalalala' };

        EdgarJs.SaveJSON("prueba", bindobject);
    })

    $(".delete").on("click", function() {
        EdgarJs.removeAll();
    })
}
window.onload = startup;