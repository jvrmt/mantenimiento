function cargarReportesAceptados()
{
    var padre=document.getElementById("listaDeReportes");
    padre.innerHTML="";
    $.post("http://148.202.152.33/atendida.php", {}, function(result,status){
        var json=JSON.parse(result);
        for(var clave in json)
        {
            if(json.hasOwnProperty(clave))
            {
                for(i=0;i<json[clave].length;i++)
                {
                    var fecha=json[clave][i]["fecha"];
                    var hora=json[clave][i]["hora"];
                    var descripcion=json[clave][i]["denuncia"];
                 
                    var div1=document.createElement("div");
                    div1.setAttribute("class","content-block inset");
                    var div2=document.createElement("div");
                    div2.setAttribute("class","content-block-inner");
                    div2.innerHTML="<p>Fecha de reporte :"+fecha+"</p><p>Hora: "+hora+"</p><p>Descripción del reporte:</p><p><b>"+descripcion+"</b></p>";
                    div1.appendChild(div2);
                    padre.appendChild(div1);
                }
            }
        }
    });
}