<!DOCTYPE html>
<html lang='en'>

<head>
    <title>Optimizacion | Problema del transporte usando el metodo del cruce del arroyo</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- main css -->
    <link href="style.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.cdnfonts.com/css/bahnschrift" rel="stylesheet">
</head>

<body>
    <div class="content clearfix" id="alarmContentDisplay">

        <!-- content_left begins -->
        <div class="content_center clearfix">
            <div class="clear"> </div>
            <div style="padding-top:10px, pad"></div>
            <div class="clear"> </div>
            <h3 align='center'>Calculadora de metodo del cruce del arroyo</h3>
            <p style='margin:0 1.4em; font-size:0.90em;' class='topDeskDesc'>Este recorrido consiste en asignar unidades a la casilla vacia en cuestion,
                trasladandolos de una casilla determinada que sea del mismo renglon o de la misma columna. De manera que se sigan cumpliendo las condiciones.
                Si el recorrido cerrado es positivo implicara un incremento en los costos y si por el contrario el recorrido es negativo significara una disminucion en el costo.
                Por lo tanto, si se desear minimizar los costos totales, la solucion optima se encontrara cuando todos los recorridos cerrados sean positivos.</p>
            <!-- ec_calculator begins -->
            <div class="ec_calculator_gen clearfix">
                <h2>Ingresar dimensiones</h2>
                <div class="clearfix"></div>
                <div class='clear'></div>
                <form name=first method="POST">
                    <div id="overlayLoader">
                        <div class="loader"> </div>
                    </div>
                    <div id="dispCalcConts" style="opacity: 1;">
                        <div class='group clearfix'>
                            <div class='group_con_45 clearfix'>
                                <label>Numero de filas</label>
                                <input type='text' id='numFilas' class='easypositive-integer'>
                            </div>
                            <div class='group_con_45 clearfix'>
                                <label>Numero de columnas</label>
                                <input type='text' id='numColumnas' class='easypositive-integer'>
                            </div>
                        </div>
                        <div align='center'>
                            <input type='button' value='Crear Tabla' onclick='matrix_form()'> <input type='reset' value='Reiniciar' onclick='clear_all()'>
                        </div>
                        <div class='group clearfix'>
                            <div id='frtab' align='center'></div>
                        </div>
                        <div class='result group clearfix'>
                            <div id='result' align='center' class='table'></div>
                        </div>
                    </div>
                </form>
            </div>
            <!-- ec_calculator ends -->
            <div class="clear"> </div>
            <script type="text/javascript">
                var easyinputs = document.getElementsByTagName("INPUT");
                for (var ies = 0; ies < easyinputs.length; ies++) {
                    if (easyinputs[ies].type === 'button') {
                        easyinputs[ies].style.visibility = 'hidden';
                        if ((easyinputs[ies].offsetTop - 10) < 0) {
                            document.getElementById("overlayLoader").style.top = (document.getElementById('dispCalcConts').offsetTop + (document.getElementById('dispCalcConts').offsetHeight / 4)) + "px";
                        } else {
                            document.getElementById("overlayLoader").style.top = (easyinputs[ies].offsetTop - 10) + "px";
                        }
                    } else {
                        document.getElementById("overlayLoader").style.top = (document.getElementById('dispCalcConts').offsetTop + (document.getElementById('dispCalcConts').offsetHeight / 4)) + "px";
                    }
                    if (easyinputs[ies].type === 'reset') {
                        easyinputs[ies].style.visibility = 'hidden';
                    }
                }
            </script>
            <div class='clearfix'></div>
            <div class="paddingTop"></div>
        </div>
    </div>
    <!-- content ends -->

    <!-- Import logic and lib -->
    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
    <script type='text/javascript' src='lib/jquery.min.js'></script>
    <script type='text/javascript' src='lib/common.js'></script>
    <script type='text/javascript' src='lib/jquery.sticky.js'></script>
    <script type='text/javascript' src='lib/numeric.js'></script>
    <script type='text/javascript' src='metodo.js'></script>
    <style>
        .tablhiglt {
            background: darkgray;
        }
    </style>
        <script type="text/javascript">
        function alert(val) {
            $("#dynErrDisp").show();
            $("#dynErrDisp").html(val);
        }
        $(document).ready(function() {
            closeModal();
        });
    </script>
    </body>
</html>