//Google Maps
var map;
var myLatLng = {lat: 20.657, lng: -103.326};
var imagen64;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 16,
        disableDefaultUI:true,
        clickableIcons:false
    });
    var noPoi = [
        {
            featureType: "poi",
            stylers: [
                { visibility: "off" }
            ]   
        }
    ];
    map.setOptions({styles: noPoi});
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        draggable:true,
        title: 'Falla'
    });
    var latitud=marker.getPosition().lat();
    var longitud=marker.getPosition().lng();
    document.getElementById("lat").value=latitud;
    document.getElementById("long").value=longitud;
    
    google.maps.event.addListener(marker, 'dragend', function (evt) {
        latitud=marker.getPosition().lat();
        longitud=marker.getPosition().lng();
        document.getElementById("lat").value=latitud;
        document.getElementById("long").value=longitud;
    });
}

//Guarda los datos para enviar        
function cargarDatos()
{
    document.getElementById("solicitante").value=localStorage.nombre;
    var fecha=new Date();
    document.getElementById("fecha").value=fecha.toLocaleDateString();
    document.getElementById("hora").value=fecha.toLocaleTimeString();
    
    initMap();

}
function enviarDatos()
{
                
    var data=imagen64;
    //var data=document.getElementById("data").value;
    var dia=document.getElementById("fecha").value;
    var hora=document.getElementById("hora").value;
    var lat=document.getElementById("lat").value;
    var long=document.getElementById("long").value;
    var denuncia=document.getElementById("denuncia").value; 
                
        //url: "https://peaton.000webhostapp.com/mantenimiento/verEnviado.php",
    //url: "https://peaton.000webhostapp.com/mantenimiento/verEnviado.php",
    $.ajax({
        type: "POST",
        url: "http://148.202.152.33/datosCucei.php",
        data: {dia:dia,hora:hora,denuncia:denuncia,data:data,lat:lat,long:long},
        timeout: 60000
    })
        .done(function( msg ) { 
        //myApp.alert("Tu reporte se ha enviado","¡Excelente!");
        navigator.notification.alert("Tu reposrte se ha enviado",function(){},"¡Excelente!","Aceptar");


        mainView.router.back();
    })
        .fail(function(){
        //myApp.alert("Ha ocurrido un error, intentalo de nuevo","¡Ups!");
        navigator.notification.alert("Ha ocurrido un error, intentalo de nuevo",function(){},"¡Ups!","Aceptar");
    });    
}

    //Codigo para la imagen
oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
    
    
oFReader.onload = function (oFREvent) {
    var img=new Image();
    img.onload=function(){    
        var canvas=document.createElement("canvas");
        var ctx=canvas.getContext("2d");
        canvas.width=640;
        canvas.height=(640/img.width)*img.height;
        ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
        //document.getElementById("data").value=canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "");
        imagen64=canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "");
        document.getElementById("mostrarimagen").src = canvas.toDataURL();
    }
    img.src=oFREvent.target.result;
};

function loadImageFile() {
    if (document.getElementById("imagen").files.length === 0) { return; }
                
    var oFile = document.getElementById("imagen").files[0];
    if (!rFilter.test(oFile.type)) {
        //alert("Tienes que seleccionar una imagen");
        navigator.notification.alert("Tienes que seleccionar una imagen",function(){},"¡Ups!","Aceptar");
        return; 
    }
    oFReader.readAsDataURL(oFile);
}

//codigo para el boton atrás
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
    //Plataforma actual del dispositivo, no es necesaria porque no se usará el plugin
    //var plataforma=device.platform;
    //localStorage.setItem("plataforma",plataforma);
}
function onBackKeyDown() 
{
    //myApp.alert(myApp.getCurrentView().activePage.name,"Pagina");
    //Se saldrá de la aplicación cuando se encuentre en la pagina principal "menu"
    if(myApp.getCurrentView().activePage.name=="menu")
        navigator.app.exitApp();
    else
        mainView.router.back();
}


 