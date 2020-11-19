//funcion del boton RESET, limpia la pantalla y los campos
function clear_all() {
	$('#frtab').html("");
	$('#result').html("");
	$("#numFilas").val("");
	$("#numColumnas").val("");
}

/**
 * Metodo que crea la tabla para introducir los datos de
 * costos, demandas y ofertas
 */
function matrix_form() {
	$('#frtab').html("");
	$('#result').html("");
	var numFilas = $("#numFilas").val();
	var numColumnas = $("#numColumnas").val();

	if (numFilas == "") {
		alert("Ingresa el numero de filas");
	}
	else if (numColumnas == "") {
		alert("Ingresa el numero de columnas");
	}
	else {
		// Validaciones
		numFilas = parseFloat(numFilas);
		numColumnas = parseFloat(numColumnas);
		if (numFilas < 2) {
			alert("Ingresa minimo 2 filas.");
		}
		else if (numFilas > 16) {
			alert("El maximo de filas es 15.");
		}
		else if (numColumnas < 2) {
			alert("Ingresa minimo 2 columnas.");
		}
		else if (numColumnas > 16) {
			alert("El maximo de columnas es 15.");
		}
		else {
			// Crea la tabla de costos
			var tabary = new Array();
			for (b = 0; b <= numFilas; b++) {
				tabary[b] = new Array(numColumnas);
				for (a = 0; a <= numColumnas; a++) {
					// Crea el campo de texto para ingresar los datos
					tabary[b][a] = "<input type='text' id='x" + b + a + "' class='easynumeric'>";
				}
			}

			// Crea el header, footer, y el cuerpo.
			var oTable = document.createElement("TABLE");
			var oTHead = document.createElement("THEAD");
			var oTBody = document.createElement("TBODY");
			var oRow, oCell;
			var i, j;

			// Inserta los elementos creados en la tabla.
			oTable.appendChild(oTHead);
			oTable.appendChild(oTBody);
			oTable.setAttribute("class", "bg5");

			// Inserta los elementos del header en la tabla.
			oRow = document.createElement("TR");
			oTHead.appendChild(oRow);
			for (i = 0; i <= (numColumnas + 1); i++) {
				oCell = document.createElement("TH");
				if (i == 0) {
					oCell.innerHTML = " ";
				}
				else if (i == (numColumnas + 1)) {
					oCell.innerHTML = "Oferta";
				}
				else {
					oCell.innerHTML = "A" + i;
				}
				oRow.appendChild(oCell);
			}

			// Inserta filas y celdas en el cuerpo de datos de la tabla.
			for (i = 0; i < tabary.length; i++) {
				oRow = document.createElement("TR");
				oCell = document.createElement("TH");
				if (i == (tabary.length - 1)) {
					oCell.innerHTML = "Demanda";
				}
				else {
					oCell.innerHTML = "P" + (i + 1);
				}

				oRow.appendChild(oCell);
				oTBody.appendChild(oRow);
				for (j = 0; j < tabary[i].length; j++) {
					oCell = document.createElement("TD");
					if ((i == (tabary.length - 1)) && (j == (tabary[i].length - 1))) {
						oCell.innerHTML = " ";
					}
					else {
						oCell.innerHTML = tabary[i][j];
					}
					oRow.appendChild(oCell);
				}
			}

			oRow = document.createElement("TR");
			oTBody.appendChild(oRow);
			oCell = document.createElement("TD");
			oCell.setAttribute("colspan", (numColumnas + 2));
			oCell.innerHTML = "<br> <center> <input type=button value='Calcular' onclick='northwest_corner()'> </center>";
			oRow.appendChild(oCell);

			// Inserta la tabla en el arbol de resultados.
			var frtb = document.getElementById("frtab");
			frtb.appendChild(oTable);
			onkeyupValidationClass();
		}
	}
}

function northwest_corner() {
	alert("");
	document.getElementById('result').innerHTML = "";
	var numFilas = $("#numFilas").val();
	var numColumnas = $("#numColumnas").val();
	numFilas = parseFloat(numFilas);
	numColumnas = parseFloat(numColumnas);

	var alvalu = new Array();
	var values = new Array();
	var oferta = new Array();
	var supclo = new Array();
	var demanda = new Array();
	var demclo = new Array();
	var si = 0;
	var di = 0;
	var valida = true;

	// Verifica que no esten vacias las celdas
	for (b = 0; b <= numFilas; b++) {
		for (a = 0; a <= numColumnas; a++) {
			var valu = $("#x" + b + a).val();
			var valus = valu;
			if (valu == "") {
				alert("No se permite caja vacia");
				valida = false;
				return false;
			}
			valu = parseFloat(valu);

			if (!isNaN(valus)) {
				if (a == numColumnas) {
					oferta[si] = valu;
					si++;
				}

				if (b == numFilas) {
					demanda[di] = valu;
					di++;
				}
			}
		}
	}

	if (valida == true) {
		var sumOfertas = 0;
		for (i = 0; i < oferta.length; i++) {
			sumOfertas = sumOfertas + oferta[i];
		}

		var sumDemandas = 0;
		for (j = 0; j < demanda.length; j++) {
			sumDemandas = sumDemandas + demanda[j];
		}

		//variable centinela
		var dummy = 0;

		/**
		 * Metodo en caso de que los centros de produccion sean inferiores al
		 * numero de centros de almacenamiento o venta.
		 */
		if (sumOfertas < sumDemandas) {
			dummy = sumDemandas - sumOfertas;
			oferta[oferta.length] = dummy;
			for (b = 0; b <= numFilas; b++) {
				values[b] = new Array(numColumnas);
				for (a = 0; a < numColumnas; a++) {
					var valu = $("#x" + b + a).val();
					var valus = valu;
					if (valu == "") {
						valu = 0;
					}
					valu = parseFloat(valu);

					if (!isNaN(valus)) {
						if (b == numFilas) {
							values[b][a] = 0;
						}
						else {
							values[b][a] = valu;
						}
					}
				}
			}
		}

		/**
		 * Metodo en caso de que los centros de produccion superen el
		 * numero de centros de almacenamiento o venta.
		 */
		if (sumOfertas > sumDemandas) {
			dummy = sumOfertas - sumDemandas;
			demanda[demanda.length] = dummy;
			for (b = 0; b < numFilas; b++) {
				values[b] = new Array(numColumnas);
				for (a = 0; a <= numColumnas; a++) {
					var valu = $("#x" + b + a).val();
					var valus = valu;
					if (valu == "") {
						valu = 0;
					}
					valu = parseFloat(valu);

					if (!isNaN(valus)) {
						if (a == numColumnas) {
							values[b][a] = 0;
						}
						else {
							values[b][a] = valu;
						}
					}
				}
			}
		}

		/**
		 * Metodo en caso de que los centros de produccion igualen el
		 * numero de centros de almacenamiento o venta.
		 */
		if (sumOfertas == sumDemandas) {
			for (b = 0; b < numFilas; b++) {
				values[b] = new Array(numColumnas);
				for (a = 0; a < numColumnas; a++) {
					var valu = $("#x" + b + a).val();
					var valus = valu;
					if (valu == "") {
						valu = 0;
					}
					valu = parseFloat(valu);

					if (!isNaN(valus)) {
						values[b][a] = valu;
					}
				}
			}
		}

		var datastring = "values=" + values + "&oferta=" + oferta + "&demanda=" + demanda + "&numFilas=" + numFilas + "&numColumnas=" + numColumnas;
		var pathurl = "crucedelarroyo.php";
		$.ajax({
			async: true,
			type: "POST",
			url: pathurl,
			data: datastring,
			success: function (html) {
				$('#result').html(html);
			}
		});
	}
}