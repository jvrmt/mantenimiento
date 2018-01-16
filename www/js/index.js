        function ejemplo()
        {
            //document.getElementById('codigo').value="Cambiado";
            localStorage.codigo=document.getElementById("codigo").value;
            localStorage.nip=document.getElementById("nip").value;
        }
        function enviarVariables()
        {
            var valorCodigo=document.getElementById("codigo").value;
            var valorNip=document.getElementById("nip").value;
            $.post("http://148.202.152.33/incidencias/ws.php",{codigo:valorCodigo, nip:valorNip},function(respuesta,status){
                if(respuesta=="0")
                {
                    //alert("Combinación de codigo/nip incorrecta");
                    //navigator.notification.alert('Error',alertDismissed,'Nop','Aceptar');
                    document.getElementById("nip").value="";
                    //window.location.href="error.html";
                    navigator.notification.alert("Combinación de código y nip erronea",function(){},"¡Ups!","Aceptar");
                    //myApp.alert("Combinación de codigo y nip erronea","¡Ups!");
                }
                else
                {
                    var datos=respuesta.split(",");
                    //alert("0: "+datos[0]+"\n1: "+datos[1]+"\n2"+datos[2]+"\n3"+datos[3]);
                    if(datos[0]=="A" || datos[0]=="T")
                    {
                        document.getElementById("codigo").value="";
                        document.getElementById("nip").value="";
                        //localStorage.nombre=datos[2];//Guarda el nombre para saber que la sesión está iniciada
                        localStorage.setItem("nombre",datos[2]);
                        window.location.href = "menu.html";
                    }
                    else
                    {
                        navigator.notification.alert("Combinación de código y nip erronea",function()   {},"¡Ups!","Aceptar");
                        //myApp.alert("Combinación de codigo y nip erronea","¡Ups!");
                        document.getElementById("nip").value="";
                        window.location.href="error.html";
                    }
                }
            });
        }