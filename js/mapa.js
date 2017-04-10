/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
   var popupCatastro;
   var foto;
   var marcaFoto;
   var photoMap;
   jQuery.scrollTo = function (target, offset, speed, container) {

    if (isNaN(target)) {

        if (!(target instanceof jQuery))
            target = $(target);

        target = parseInt(target.offset().top);
    }

    container = container || "html, body";
    if (!(container instanceof jQuery))
        container = $(container);

    speed = speed || 500;
    offset = offset || 0;

    container.animate({
        scrollTop: target + offset
    }, speed);
};

	
function onDeviceReady() {
	    var persistent;
	   	persistent = LocalFileSystem.PERSISTENT;
		//window.requestFileSystem(window.TEMPORARY, 5*1024*1024 , getDirectorySuccess, fail);
        window.requestFileSystem(persistent,0, getDirectory, fail);
    }
function getDirectory(fileSystem) {
	   
         fileSystem.root.getDirectory("datosrtc", {create: true, exclusive: false}, getDirectorySuccess,fail);

    }
function getDirectorySuccess(parent) {
	
    console.log("Creando directorio en: " + parent.toURL());
}


function writeFile ( filename,data) {
    
    //document.addEventListener("deviceready", onDeviceReady, false);
	 onDeviceReady();
	
   // filename= "datosRuta" +"/"+ filename;
	var fichero = new Object({});
	fichero.path = filename + ".txt";
	fichero.existe =false;
	fichero.directorio = "datosrtc";
	fichero.filename = filename;
	fichero.procesado = 0;
	var i = 0;
	
	
	 var persistent;
	    
	persistent = LocalFileSystem.PERSISTENT;
	    
	
	//filename += ".txt";
    window.requestFileSystem(persistent, 0, function (fs) {

    console.log('file system open: ' + fs.name);
    fs.root.getFile(fichero.path, { create: true, exclusive: false }, function (fileEntry) {

       // console.log("fileEntry is file ?" + fileEntry.fullPath);
        console.log(data);
        // fileEntry.name == 'someFile.txt'
        // fileEntry.fullPath == '/someFile.txt'
        writeTxt(fileEntry, data);
       
    }, fail);

}, fail);
}
 function writeTxt( fileEntry,data) {
     fileEntry.createWriter(function (fileWriter) {
        $("#error").empty();
                      
        fileWriter.onwriteend = function() {
		     /* $("#upload").focus();
			 $('select').selectmenu('refresh');	  */
			$("#error").append("Descarga correcta");
           // console.log("escritura correcta..."+ data);
            //readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
             $("#error").append("Error de escritura");
            console.log("error de escitura: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!data) {
            data = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(data);
    });
}

function readFile ( filename,geodb,callback ) {
         
    $.mobile.loading( 'show', { theme: "a", text: "Leyendo fichero...", textonly: false,textVisible:true });
    filename= "datosrtc" +"/"+ filename;

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

    console.log('file system open: ' + fs.name);
    fs.root.getFile(filename, { create: false, exclusive: false }, function (fileEntry) {

        //console.log("fileEntry is file?" + fileEntry.isFile.toString());
        // fileEntry.name == 'someFile.txt'
        // fileEntry.fullPath == '/someFile.txt'
		
         readTxt(fileEntry,geodb,callback);
        
		
    }, fail);

}, fail);

}

 function fail(error) {
     var msg = "";
      
	switch(error.code) { 
		case 1:	msg ="Fichero no encontrado"; break;
		case 2: msg = "Error de seguridad"; break;
		case 3:  msg = "Operacion abortada"; break;
		case 4: msg = "Fichero protegido";break;
		case 5: msg = "Error de codificacion";break;
		case 6: msg = "Fichero solo de lectura ";break;
		case 7: msg = "Fichero en estado invaalido";break;
		case 8: msg = "Error de sintaxis";break;
		case 9: msg = "Modificacion no valida";break;
		case 10: msg = "Cuota excedida";break;
		case 11: msg = "Error de tipo de fichero";break;
		case 12: msg = "Path existente";break;
        case 18: msg = "Operación denegada";break;
    }	
	  alert("Error lectura/escritura:"+error.code+ "-"+ msg);
}
function logos() {
   var element = $('#header');
   var altura = element.height();
   var logos1 = $("#logodga");
   var logos2 = $("#logoinaga2");
   logos1.css("height", altura - 1);
   logos2.css("height", altura - 1);
   }
   function pointBuffer (pt, radius, units, resolution) {
              var ring = [];
              var resMultiple = 360/resolution;
              for(var i  = 0; i < resolution; i++) {
                var spoke = turf.destination(pt, radius, i*resMultiple, units);
                ring.push(spoke.geometry.coordinates);
              }
              if((ring[0][0] !== ring[ring.length-1][0]) && (ring[0][1] != ring[ring.length-1][1])) {
                ring.push([ring[0][0], ring[0][1]]);
              }
              return turf.polygon([ring]);
            }

            
          function limpiar_info (id,texto,map,circle,marker,rectangulo,myLayer,results) {
            $('#'+id).empty();
            $('#'+id).append(texto);
             if ( circle ) {
                    map.removeLayer(circle);
                }
             if ( marker ) {
                    map.removeLayer(marker);
                }
             
              if ( rectangulo ) {
                    map.removeLayer(rectangulo);
                }
              if (myLayer) { map.removeLayer(myLayer);}
			  if (results) { map.removeLayer(results);}
             
             /* for (var c=0;c<=dibujos.length;c++){
                 dibujar.removeLayer(dibujos[c]);
             } */
            }
            
            function replacer(key, value) {
             if (key=="HSUPERF") {
                return value/10000;
              }
              return value;
            }
     
            function zoomIni(map) {
              map.setView([41, -0.09], 7);
             
            }
            function zoomIn(numberzoon,center,map) {
              map.setZoom(numberzoon);
              map.panTo(center);
            }
            function getzoomact(map) {
              
              var zoomactual= map.getZoom();
              return zoomactual;
            }
			
			
 function hoy() {
      var d = new Date();
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
	 
	  if ( curr_month < 10) {
	        curr_month = "0" + curr_month;
	  }
	  if ( curr_date < 10) {
	        curr_date= "0" + curr_date;
	  }
      var curr_year = d.getFullYear();
     // return curr_date + "-" + curr_month + "-" + curr_year;
	
	 return curr_year + "-" + curr_month  + "-" + curr_date;
}
function parseDate(fecha) {
   
    var inter = fecha.split("-");
	return inter[2]+ "/" + inter[1] + "/" + inter[0];
}
function isNumero(numero) {
     var esNumero = true;
     if (!/^([0-9])*$/.test(numero)) {
	    esNumero = false;
	 }
	 return esNumero;
}
function validaFecha(fecha){
                  
            var datePat = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
            var fechaCompleta = fecha.match(datePat);
            if (fechaCompleta === null) {
                    return false;
            }

            dia = fechaCompleta[1];
            mes = fechaCompleta[3];
            anio = fechaCompleta[5];

            if (dia < 1 || dia > 31) {

                    return false;
            }
            if (mes < 1 || mes > 12) { 

                    return false;
            }
            if ((mes==4 || mes==6 || mes==9 || mes==11) && dia==31) {

                    return false;
            }
            if (mes == 2) { // bisiesto
                    var bisiesto = (anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0));
                    if (dia > 29 || (dia==29 && !bisiesto)) {

                            return false;
                    }
            }
            return true;

}
 function isTouchDevice(){
    try{
        document.createEvent("TouchEvent");
        return true;
    }catch(e){
        return false;
    }
}
function touchScroll(id){
    if(isTouchDevice()){ //if touch events exist...
        var el=document.getElementById(id);
        var scrollStartPos=0;
 
        document.getElementById(id).addEventListener("touchstart", function(event) {
            scrollStartPos=this.scrollTop+event.touches[0].pageY;
            event.preventDefault();
		   // event.stopPropagation();
        },false);
 
        document.getElementById(id).addEventListener("touchmove", function(event) {
            this.scrollTop=scrollStartPos-event.touches[0].pageY;
            event.preventDefault();
			//event.stopPropagation();
        },false);
    }
}
function loadXMLDoc(url) {
          var xmlhttp;
          if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
            }
          else
            {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
          xmlhttp.onreadystatechange=function()
            {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
                  {
                  document.getElementById("orto").innerHTML=xmlhttp.responseText;
                  alert(xmlhttp.responseText);
                  }
            };
          xmlhttp.open("get",url,true);
         // xmlhttp.setRequestHeader('Access-Control-Allow-Origin','*');
          xmlhttp.setRequestHeader('Content-Type', 'application/jsonp');
         // xmlhttp.setRequestHeader('X-PINGOTHER', 'pingpong');

          xmlhttp.send();	

     }

function redondear(number,places) {
  return +(Math.round(number + "e+" + places)  + "e-" + places);
}
function tranformaCoordenadas( lat,lng, referencia) {
			    var arrayXY= [];
			    var coor_4326 =[];
				var coor_25830 =[];
				var EPSG_25830 = "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs";
		        var EPSG_4326 = proj4('EPSG:4326');
			   if (referencia == 'UTM') {
			       coor_25830=[lng,lat];
				   coor_4326 =  proj4(EPSG_25830,EPSG_4326,coor_25830);
				   arrayXY[0] = coor_4326[0];
				   arrayXY[1] = coor_4326[1];
			   } else if ( referencia == 'wsg84')  {
			       coor_4326=[lng,lat];
				   coor_25830 =  proj4(EPSG_4326,EPSG_25830,coor_4326);
				   arrayXY[0] = coor_25830[0];
				   arrayXY[1] = coor_25830[1];
			   }
			  return arrayXY;
}
function ortoOcaso(e) {
    
	var fechaOK=true;    
	$("#municipios").empty();
	//$("#cotos").empty();
	var fechaj =  document.getElementById("fecha").value;
	fechaj = parseDate(fechaj);
	fechaOK=validaFecha(fechaj);
	if(!fechaOK){
		 $("#error").empty();
		 $("#error").append("Debe introducir una Fecha de consulta adecuada.");
	}
	
	if (fechaOK) {
		  $("#error").empty();
		   parseFloat(e.lat.toFixed(3));
		  var url_get= "http://servizos.meteogalicia.es/rss/predicion/rssOrto.action?request_locale=es" + "&lat=" + parseFloat(e.lat.toFixed(3)) + "&lon=" +  parseFloat(e.lng.toFixed(3))+"&data=" +fechaj;

		 $('#info').FeedEk({
			FeedUrl:url_get,
			ShowDesc: true,
			ShowPubDate: false,
			DateFormat: 'LLL',
			DateFormatLang: 'es'
		   // DescCharacterLimit: 223
		});
	}
	$( "#myPanel" ).panel( "open"  );
	$("#panelinfo").collapsible('expand');	 
}
     function initMap() {
         function capturePhoto() {
          // Take picture using device camera and retrieve image as base64-encoded string
            // pictureSource=navigator.Camera.PictureSourceType;
            // destinationType=navigator.Camera.DestinationType;
             navigator.camera.getPicture(onSuccess, onFail, { quality: 50,  sourceType:Camera.PictureSourceType.PHOTOLIBRARY ,destinationType:Camera.DestinationType.FILE_URI });
                      
     
        }
         
       function onSuccess(imageData) {
     
          var smallImage = document.getElementById('imagen');
       
          smallImage.src ='#';
          smallImage.style.display = 'block';

        //  smallImage.src = "data:image/jpeg;base64," + imageData;
         $("#metadata").empty(); 
         smallImage.src=imageData;
       
        var $img = $('#imagen');
////
//        if ($img.length > 0 && !$img.get(0).complete) {
////           $img.on('load', triggerExif);
//               $("#imagen").on('click', triggerExif()  );    
//        }

       
        
        }
        
                 
	    function onEachFeature(feature, layer) {
				
				if (feature.properties) {
				   try {
				    var bounds = layer.getBounds();
					var centerPol = bounds.getCenter();
					markCotos[numFeatures] = L.marker(centerPol);
					markCotos[numFeatures].bindPopup(feature.properties.contenido);
					markCotos[numFeatures].addTo(map);
				  } catch(err) {
				     $("#error").append(err.message);
				  }
				}
			}
         
         
             function onFail(message) {
                  alert('Failed because: ' + message);
                }

			 function estiloCotos(feature) {
					       
							switch (feature.properties.DAPROCH) {
								case 'CAZA MAYOR': return {color: "#ff0000"};
								case 'CAZA MAYOR Y MENOR':   return {color: "#0000ff"};
								case 'CAZA MENOR':   return {color: "#00ff00"};
								case 'NO CINEG&Eacute;TICO':   return {color: "#b820e3"};
								
			} }
			
			
		function locateCoordenadas( lat,lng) {
			 var latlng = L.latLng(lat,lng);
			 var marca = L.marker([latlng.lat, latlng.lng]).toGeoJSON();
			 var buffer = pointBuffer (marca, 1/200, "kilometers", 72);
			 var query = L.esri.query({
							url:'https://idearagon.aragon.es/servicios/rest/services/INAGA/INAGA_Cotos_Caza/MapServer/',
							useCors:false
						});
			 query.intersects(buffer);
			 query.run(function(error, featureCollection){
						 
						 
						   var Template2 = '<span class="info">{MATRICULA}-{DTIPO}-{DAPROCH}</span><br>';
						   if (myLayerQuery) { map.removeLayer(myLayerQuery);}
						   for (var c=0;c<markCotos.length;c++){
								map.removeLayer(markCotos[c]);
							}
						   myLayerQuery =L.geoJson(false,{
							                   onEachFeature: onEachFeature
					                    }).addTo(map); 
						   
						   myLayerQuery.setStyle(estiloCotos);
						   if(error || featureCollection.features.length === 0) {
						     $("#error").append = "Sin resultados";
							return false;
						   }
							for (var k = 0; k< featureCollection.features.length;k++) {
							   numFeatures = k;
							   var resultado = JSON.stringify(featureCollection.features[k].properties,replacer);
							  
							   var propiedades2 = JSON.parse(resultado);
							   featureCollection.features[k].properties.contenido = L.Util.template(Template2,propiedades2);
							   myLayerQuery.addData(featureCollection.features[k]);
							  
							}
						} );
			 ortoOcaso(latlng);
			 map.setView(latlng,10);        
			
		}
	        function municipioIntersect (e) {
			  var marca = L.marker([e.latlng.lat, e.latlng.lng]).toGeoJSON();
			  var buffer = pointBuffer (marca, 1/200, "kilometers", 72);
              $("#error").empty();
			   if (layerMunicipio) {map.removeLayer(layerMunicipio);}
               var queryMun = L.esri.query({
                    url:'https://idearagon.aragon.es/servicios/rest/services/INAGA/INAGA_Ambitos/MapServer/3',
                    useCors:false
                });
                queryMun.intersects(buffer); 
                queryMun.run(function(error, featureCollection){
                   
                    if(error || featureCollection.features.length === 0) {
					setTimeout(function(){ $.mobile.loading( 'hide'); }, 1000);
                    return false;
                   }
                    for (var j = 0; j< featureCollection.features.length;j++) {
					    
						 // INTERSECTO CON LA CAPA DE COTOS 
						 var query = L.esri.query({
							url:'https://idearagon.aragon.es/servicios/rest/services/INAGA/INAGA_Cotos_Caza/MapServer/1',
							useCors:false
						});
						
					    layerMunicipio = L.geoJson(featureCollection.features[j], {color: "#E6103E"}).addTo(map); 
                        
						var tolerance = 0.001;

						var simplificado = turf.simplify(featureCollection.features[j],tolerance,false);
						
						if (simplificado===undefined) {
						   
						   simplificado = turf.envelope(featureCollection.features[j]);
						  
						}
						
						query.intersects(simplificado);
					   
						query.run(function(error, featureCollection){
						 
						 
						   var Template2 = '<span class="info">{MATRICULA}-{DTIPO}-{DAPROCH}</span><br>';
						   if (myLayerQuery) {map.removeLayer(myLayerQuery);}
						   for (var c=0;c<markCotos.length;c++){
								map.removeLayer(markCotos[c]);
							}
						   myLayerQuery =L.geoJson(false,{
							                   onEachFeature: onEachFeature
					                    }).addTo(map); 
						   
						   
						   if(error || featureCollection.features.length === 0) {
						     $("#error").append = "Sin resultados";
							return false;
						   }
							for (var k = 0; k< featureCollection.features.length;k++) {
							   numFeatures = k;
							   var resultado = JSON.stringify(featureCollection.features[k].properties,replacer);
							  
							   var propiedades2 = JSON.parse(resultado);
							   featureCollection.features[k].properties.contenido = L.Util.template(Template2,propiedades2);
							   myLayerQuery.addData(featureCollection.features[k]);
							  
							}
							myLayerQuery.setStyle(estiloCotos);
						} );
					}	 
						                                         
                 } );     
                  setTimeout(function(){ $.mobile.loading( 'hide'); }, 1000);				 
			} 
              
	        
	        function queryCotos(whereClause) {
			    //QUERY COTOS WHERE 
				var textoGeo;
			   zoomIni(map);
			   
			   var queryWhere = L.esri.query({
                    url:'https://idearagon.aragon.es/servicios/rest/services/INAGA/INAGA_Cotos_Caza/MapServer/1',
                    useCors:false,
					
                });
				
				//"LABELS='T10401'"
				queryWhere.where(whereClause);
				queryWhere.run( function (error,featureCollection){ 
				     if (myLayerCotos) {map.removeLayer(myLayerCotos);}
					 for (var c=0;c<markCotos.length;c++){
                         map.removeLayer(markCotos[c]);
				     }
					
					 myLayerCotos = L.geoJson(false,{
							onEachFeature: onEachFeature
					}).addTo(map); 
				     myLayerCotos.setStyle(estiloCotos);
                    
				    if(error || featureCollection.features.length === 0) {
						$("#error").empty();
						$("#error").append("No se han encontrado resultados.");
						setTimeout(function(){ $.mobile.loading( 'hide'); }, 2000);
						return false;
                   }
				   $("#error").empty();
				   var unResultado = 0;
				   var Template3 = '<span class="negrita info">{LABELS}-{DTIPO}-{DAPROCH}</span>';
				 
				   for (var j = 0; j< featureCollection.features.length;j++) {
				    numFeatures = j;
					var geometriaCoto =  featureCollection.features[j].geometry;
					textoGeo +=  JSON.stringify(featureCollection.features[j]);
					var resultadoCoto= JSON.stringify(featureCollection.features[j].properties);
					var propiedadesCoto = JSON.parse(resultadoCoto);
					var textoPopup =L.Util.template(Template3,propiedadesCoto);
					featureCollection.features[j].properties.contenido = textoPopup;
					myLayerCotos.addData(featureCollection.features[j]);
					myLayerCotos.setStyle(estiloCotos);	
					
					/* var polygon = turf.polygon(geometriaCoto.coordinates);
					var centroide = turf.pointOnSurface(polygon); 
					var textoCentroide =  JSON.stringify(centroide.geometry.coordinates);
					var split = textoCentroide.split(",");
					var coordenadas = [ split[1].split("]")[0],split[0].split("[")[1] ] */
					
				}
				  if  (featureCollection.features.length == 1)  {
						  var coordenadas = markCotos[0].getLatLng();
						  ortoOcaso(coordenadas);
						  map.setView( coordenadas,10);
				   }
				    setTimeout(function(){ $.mobile.loading( 'hide'); }, 1000);
					return textoGeo;
				  });   
              // query de cotos
			
	         }
	        function onLocationFound(e) {
			      $("#error").empty();
                  var radius = e.accuracy / 2;
				  var altura;
				  var textoGeoLocaliza = "<b>Esta dentro de un radio de " + radius + " metros de este punto <br> Latitud: "+e.latlng.lat +"<br>"+ " Longitud: " +e.latlng.lng;
				 
				   if (!(e.altitude===undefined || e.altitude === 0) ) {
				     altura = e.altitude;
					 textoGeoLocaliza+= "<br>"+"Altura: " + altura;
				  }
   				  if (marcaLocate) {
					map.removelayer(marcaLocate); }
				  if (circuloLocate) {
					map.removeLayer(circuloLocate); }
			     
                  marcaLocate = L.marker(e.latlng).addTo(map)
                          .bindPopup(textoGeoLocaliza).openPopup();

                  circuloLocate = L.circle(e.latlng, radius).addTo(map);
				  $.mobile.loading( 'show', { theme: "a", text: "procesando...", textonly: false,textVisible:true });
				  municipioIntersect(e);
			}

			function onLocationError(e) {
			          $("#error").empty();
                      $("#error").append("Error al intentar el posicionamiento: "+e.message);
			}		
            
			var numFeatures;
		    var myLayerQuery;
			var layerMunicipio;
	        var marcaLocate;
			var circuloLocate;
	        var zoomactual;
            var center;
            var rectangulo;
			var matricula;
			var whereClause;
		    var markCotos=[];
			var centerIni = L.latLng(41.635973   ,  -0.889893);
			var map = L.map("map",{doubleClickZoom:false,minZoom:7,
						center:centerIni,
						maxZoom: 100,
						trackResize:true,
						bounceAtZoomLimits:true,
                        condensedAttributionControl: true,
						maxBounds: L.latLngBounds(L.latLng(43.19316, -3.24646), L.latLng(39.54218, 2.21924))
						});
						
				map.setView([41, -0.09], 7);		
			   var openmap2= L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                transparent: true,	
                opacity: 0.7,
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            });		
            
var Spain_MapasrasterIGN = L.tileLayer.wms('http://www.ign.es/wms-inspire/mapa-raster', {
	layers: 'mtn_rasterizado',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: '&copy;<a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&aacute;a</a>'
});
			 var rect1 = {color: "#ff1100", weight: 3};
		     var rect2 = {color: "#0000AA", weight: 1, opacity:0, fillOpacity:0};
			 var miniMap = new L.Control.MiniMap(Spain_MapasrasterIGN, { toggleDisplay: true,aimingRectOptions : rect1, shadowRectOptions: rect2 }).addTo(map);
			//maxBounds: L.latLngBounds(L.latLng(43.587354 , -3.24646), L.latLng(42.212245  , 3.317871))
			
			//var marcas =  new L.FeatureGroup();
		    
			$('#fecha').val(hoy());
            $("#clear").click(function(e) {
			   L.DomEvent.stopPropagation(e);
			   $("#error").empty();
               limpiar_info('info','');
               limpiar_info('cotos','');
               limpiar_info('municipios','',map,circle,marker,rectangulo,myLayer,results);
			   if (myLayerCotos) { map.removeLayer(myLayerCotos);}
			   if (myLayerQuery) { map.removeLayer(myLayerQuery);}
			   if (layerMunicipio) { map.removeLayer(layerMunicipio);}
               if (marcaFoto) { map.removeLayer(marcaFoto);}
               if (photoMap)  { map.removeLayer(photoMap);}
			   for (var c=0;c<markCotos.length;c++){
                         map.removeLayer(markCotos[c]);
				     }
			   //map.on("click");
             });
            $("#zoonini").click(function(e) {
			    L.DomEvent.stopPropagation(e);
				 zoomactual=map.getZoom();
				 center = map.getCenter(); 
                 zoomIni(map);
             });
            $("#zoonant").click(function(e) {
			   L.DomEvent.stopPropagation(e);
			   map.setZoom(zoomactual);
               map.panTo(center);
             });
			 
			  $("#download").click(function(e) { 
			          var textoGeoJson;
			          L.DomEvent.stopPropagation(e);
					  matricula=document.getElementById("matricula").value;
					  matricula = matricula.toUpperCase();
					  whereClause = "LABELS LIKE " + "'%" + matricula + "%'";
					  if (matricula ===null || document.getElementById("matricula").value.length === 0 ||  /^\s*$/.test(document.getElementById("matricula").value)) {
					     $("#error").empty();
                         $("#error").append("Debe introducir valor valido para la consulta.");
					  } else {
					     $("#error").empty();
						 $.mobile.loading( 'show', { theme: "a", text: "procesando...", textonly: false,textVisible:true });
					     textoGeoJson=queryCotos(whereClause);
						 writeFile(matricula,textoGeoJson);
					  }
			  });
			 
			 
             $("#verinfo").click(function(e) { 
			          L.DomEvent.stopPropagation(e);
					  matricula=document.getElementById("matricula").value;
					  matricula = matricula.toUpperCase();
					  whereClause = "LABELS LIKE " + "'%" + matricula + "%'";
					  if (matricula ===null || document.getElementById("matricula").value.length === 0 ||  /^\s*$/.test(document.getElementById("matricula").value)) {
					     $("#error").empty();
                         $("#error").append("Debe introducir valor valido para la consulta.");
					  } else {
					     $("#error").empty();
						 $.mobile.loading( 'show', { theme: "a", text: "procesando...", textonly: false,textVisible:true });
					     queryCotos(whereClause);
					  }
			  });
   	          /* $("#cerrar").click(function() { 
					    
					    if ($('#panelinfo').is (':visible')) {
       						$('#panelinfo').hide();
						} else { $('#panelinfo').show() } } ); */
			$('#idtxy').click(function(e) {
			    var lat =$('#latitud').val();
			    var lng=$('#longitud').val();
				var coor_4326 =[];
				var coor_25830 =[];
				coor_4326=[lng,lat];
				var EPSG_25830 = "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs";
				var EPSG_4326 = proj4('EPSG:4326');
				coor_25830 =  proj4(EPSG_4326,EPSG_25830,coor_4326);
                $("#CX").val(coor_25830[0]);
				$("#CY").val(coor_25830[1]);
			});
			
			$('#idtgeo').click(function(e) {
			    var arrayXY= [];
			    var lat =$('#CY').val();
			    var lng=$('#CX').val();
				var coor_4326 =[];
				var coor_25830 =[];
				coor_25830=[lng,lat];
				var EPSG_25830 = "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs";
				var EPSG_4326 = proj4('EPSG:4326');
				coor_4326 =  proj4(EPSG_25830,EPSG_4326,coor_25830);
               	$("#longitud").val(coor_4326[0]);
				$("#latitud").val(coor_4326[1]);
			});	
			$('#slidercotos1').change(function (e) {
                capaConsulta.setOpacity($('#slidercotos1').val());			
			});
			$('#slidercotos2').change(function (e) {
                capaConsulta.setOpacity($('#slidercotos2').val());			
			});
			$('#ircoordendas').click(function(e) {
			      var arrayXY= [];
			      var lat =$('#latitud').val();
			      var lng=$('#longitud').val();
				  var x=$("#CX").val();
				  var y= $("#CY").val(); 
				  
				  if ( (!lat  || !lng )&& (!y || !x) ) {
				         
				         return false;
				   
				  } else if ( !lat || !lng )  {
				      if ( !isNumero(lat) || !isNumero(lng) ) {
					      return false;
					  }
				      arrayXY = tranformaCoordenadas( y,x,'UTM');
					  //alert(arrayXY[0]+","+arrayXY[1]);
					  $("#longitud").val(arrayXY[0]);
				      $("#latitud").val(arrayXY[1]);
				  } else if ( !y || !x) {
				       if ( !isNumero(x) || !isNumero(y) ) {
					      return false;
					  }
				      arrayXY = tranformaCoordenadas( lat,lng,'wsg84');
				      $("#CX").val(arrayXY[0]);
				      $("#CY").val(arrayXY[1]);
				  }
				  lat =$('#latitud').val();
			      lng=$('#longitud').val();
			      locateCoordenadas(lat,lng);
		    });
			 map.on('mousemove', function(e) { 
			    document.getElementById("y").value = e.latlng.lat;
                document.getElementById("x").value = e.latlng.lng;
			});
			 
			 map.on('locationfound', onLocationFound);
             map.on('locationerror', onLocationError);
			 $("#locate").click(function(e) {
			        L.DomEvent.stopPropagation(e);
					map.locate({setView: true, maxZoom:18,enableHighAccuracy:true});   
                    //enableHighAccuracy:true					
            });
          
             $("#foto").click(function(e) {
                    $.mobile.loading( 'show', { theme: "a", text: "Cargando Foto...", textonly: false,textVisible:true });
			        L.DomEvent.stopPropagation(e);
                    capturePhoto();
                    setTimeout(function(){ $.mobile.loading( 'hide'); }, 3000);
               

                 
                 
            });
	  
             $("#localizarfoto").click(function(e) {
                  L.DomEvent.stopPropagation(e);
                  var image = document.getElementById('imagen');
                  foto = new Image();
                  foto.src = image.src;
               EXIF.getData(foto, function () {

                var allMetaData = EXIF.getAllTags(foto);
                
                $("#metadata").empty();
                
                if (allMetaData===undefined || allMetaData===null || allMetaData=={} ) return;
                var allMetaDataSpan = document.getElementById("metadata");
                var latitude = EXIF.getTag(foto,"GPSLatitude");
                if (latitude===undefined || latitude ===null ) return;

                var longitude =  EXIF.getTag(foto,"GPSLongitude");

                var reflong = EXIF.getTag(foto,"GPSLongitudeRef");
                var reflat = EXIF.getTag(foto,"GPSLatitudeRef");


                allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");
                allMetaDataSpan.innerHTML = latitude +"/"+ longitude;
               
                var grados = ( latitude [2] / 60 + latitude[1] ) / 60;
                var lat = grados + latitude[0];
                grados = ( longitude [2] / 60 + longitude[1] ) / 60;
                var lng=  grados  + longitude[0];

                if (reflong=="W" ) {
                    lng = lng * (-1);
                }
                if (reflat=="S" ) {   
                    lat = lat * (-1);
                }
                console.log (lat+"/"+lng);

                var coor_4326 =[];
                coor_4326=[lng,lat];

                var b = L.latLng(coor_4326[1],coor_4326[0]).toBounds(20);
                var pt = L.latLng(coor_4326[1],coor_4326[0]);
                
                var imageUrl = this.src;
                              imageBounds = b;
                 // console.log(imageUrl);
                var texto =  "<b>Esta foto esta en este punto <br> Latitud: "+pt.lat+"<br>"+ " Longitud: "+ pt.lng +"<hr>"+  "<img src=" +this.src+  " id='imagen1' "  +                   " alt='foto1' style='width:75px;height:75px;'>";
                if (marcaFoto)
                   map.removeLayer(marcaFoto);
                if (photoMap)
                  map.removeLayer(photoMap);
                marcaFoto = L.marker(pt).addTo(map).bindPopup(texto).openPopup();
                photoMap = L.imageOverlay(imageUrl, imageBounds).addTo(map);
                map.setView(pt,12);



              });
             });

	        
            var dibujos=[];
            var countdibujos = 0;
            var dibujar = new L.FeatureGroup();
            var circle;
            
			var marker;
            var markposition;
            var myLayer;
            var myLayerCotos;
           
            map.setView([41, -0.09], 7);
			
			zoomactual=map.getZoom();
			center = map.getCenter(); 
         
            L.control.zoom({
                position:'bottomright'
            }).addTo(map);	
           
            var layerGroup = L.layerGroup().addTo(map);  
		    var results = L.featureGroup();
			
			
			
var Spain_PNOA_Ortoimagen = L.tileLayer.wms('http://www.ign.es/wms-inspire/pnoa-ma', {
	layers: 'OI.OrthoimageCoverage',
	format: 'image/png',
	transparent:true,
	continuousWorld : true,
    opacity:0.8,
	version: '1.3.0',
  	attribution: 'PNOA cedido por &copy; <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});
var Spain_PNOA_Mosaico = L.tileLayer.wms('http://www.ign.es/wms-inspire/pnoa-ma', {
	layers: 'OI.MosaicElement',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: 'PNOA cedido por &copy; <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});

// Ortofotos historicas del PNOA
// Capabilities: http://www.ign.es/wms/pnoa-historico?request=GetCapabilities&service=WMS

var Spain_PNOA_2004 = L.tileLayer.wms('http://www.ign.es/wms/pnoa-historico', {
	layers: 'PNOA2004',			format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: 'PNOA cedido por &copy; <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});
var Spain_PNOA_2005 = L.tileLayer.wms('http://www.ign.es/wms/pnoa-historico', {
	layers: 'PNOA2005',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: 'PNOA cedido por &copy; <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});
var Spain_PNOA_2006 = L.tileLayer.wms('http://www.ign.es/wms/pnoa-historico', {
	layers: 'PNOA2006',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: 'PNOA cedido por &copy; <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});
var Spain_PNOA_2007 = L.tileLayer.wms('http://www.ign.es/wms/pnoa-historico', {
	layers: 'PNOA2007',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: 'PNOA cedido por &copy; <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});
var Spain_PNOA_2008 = L.tileLayer.wms('http://www.ign.es/wms/pnoa-historico', {
	layers: 'PNOA2008',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: 'PNOA cedido por &copy;<a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});
var Spain_PNOA_2009 = L.tileLayer.wms('http://www.ign.es/wms/pnoa-historico', {
	layers: 'PNOA2009',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: 'PNOA cedido por &copy; <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});
var Spain_PNOA_2010 = L.tileLayer.wms('http://www.ign.es/wms/pnoa-historico', {
	layers: 'PNOA2010',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: 'PNOA cedido por &copy; <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});

// Unidades administrativas
// Capabilities:http://www.ign.es/wms-inspire/unidades-administrativas?request=GetCapabilities&service=WMS
// Unidades administrativas tres niveles de administracion (comunidad autonoma, provincia y municipio).

var Spain_UnidadAdministrativa = L.tileLayer.wms('http://www.ign.es/wms-inspire/unidades-administrativas', {
	layers: 'AU.AdministrativeUnit',
	format: 'image/png',
	transparent: true,
	continuousWorld : true,
	attribution: '&copy; <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'

});

var Spain_IGNBase = L.tileLayer.wms('http://www.ign.es/wms-inspire/ign-base', {
	layers: 'IGNBaseTodo',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: '&copy; <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});

// Modelos Digitales del Terreno de España
// http://www.ign.es/wms-inspire/mdt?request=GetCapabilities&service=WMS
// Modelos Digitales del Terreno de España en diversos sistemas de referencia: 
// Modelo Digital de Elevaciones, Modelo Digital de Pendientes y Modelo Digital de Orientaciones.

var Spain_MDT_Elevaciones = L.tileLayer.wms('http://www.ign.es/wms-inspire/mdt?', {
	layers: 'EL.GridCoverage',
	format: 'image/png',
	transparent: true,
	continuousWorld : false,
	attribution: '&copy;<a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});

var Spain_MDT_Orientaciones = L.tileLayer.wms('http://www.ign.es/wms-inspire/mdt?', {
	layers: 'Orientaciones',
	format: 'image/png',
	transparent: true,
	continuousWorld : true,
	attribution: '&copy;<a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});

var Spain_MDT_Pendientes = L.tileLayer.wms('http://www.ign.es/wms-inspire/mdt?', {
	layers: 'Pendientes',
	format: 'image/png',
	transparent: true,
	continuousWorld : true,
	attribution: '&copy;<a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a</a>'
});

// Cartografia Catastral
// Capabilities: http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?request=GetCapabilities&service=WMS
// Cartografia Catastral de la Direccion General del Catastro.

var Spain_Catastro = L.tileLayer.wms('http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx', {
	layers: 'Catastro',
	format: 'image/png',
	transparent: false,
	continuousWorld : false,
	attribution: ' <a href="http://www.catastro.meh.es/" target="_blank">Direcci&oacute;n General del Catastro</a>'
});

// ANDALUCIA

// Callejero Digital de Andalucia Unificado
// Capabilities: http://www.callejerodeandalucia.es/servicios/cdau/wms?request=GetCapabilities&service=WMS
// Ejes de via y los portales del Callejero Digital de Andalucia Unificado. 

var Andalucia_CDAUVialyPortal = L.tileLayer.wms('http://www.callejerodeandalucia.es/servicios/cdau/wms?', {
	layers: 'CDAU_wms',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
attribution: '<a href="http://www.callejerodeandalucia.es/portal/web/cdau/" target="_blank">Fuente: CDAU (Entidades Locales-Junta de Andaluc&iacute;a- IGN).</a>'
});

// CDAU Base Cartografica
// Capabilities: http://www.callejerodeandalucia.es/servicios/base/wms?request=GetCapabilities&service=WMS
// Base cartografica del Callejero Digital de Andalucia Unificado


var Andalucia_CDAUBase = L.tileLayer.wms('http://www.callejerodeandalucia.es/servicios/base/wms?', {
	layers: 'CDAU_base',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: '<a href="http://www.callejerodeandalucia.es/portal/web/cdau/" target="_blank">Fuente: CDAU (Entidades Locales-Junta de Andaluc&iacute;a- IGN).</a>'
});

// Mapa Toporaster10
// Capabilities: http://www.ideandalucia.es/services/toporaster10/wms?request=GetCapabilities&service=WMS

var Andalucia_MapaToporaster10 = L.tileLayer.wms('http://www.ideandalucia.es/services/toporaster10/wms?', {
	layers: 'toporaster10',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: '<a href="http://www.juntadeandalucia.es/institutodeestadisticaycartografia" target="_blank">Instituto de Estad&aacute;stica y Cartografiacute;a de Andaluc&iacute;a</a>'

});

	
              var ignraster = L.tileLayer.wms("http://www.ign.es/wms-inspire/mapa-raster", {
                layers: "mtn_rasterizado",//layer name (see get capabilities)
                format: 'image/png',
                opacity: 0.8,
                transparent: true,
                version: '1.3.0',//wms version (see get capabilities)
                attribution: "Fondo Cedido por &copy; Instituto Geogr&aacute;fico Nacional de Espa&ntildea"
            }).addTo(layerGroup);
            
            var pnoa = L.tileLayer.wms("http://www.ign.es/wms-inspire/pnoa-ma", {
                layers: "OI.OrthoimageCoverage",//layer name (see get capabilities)
                format: 'image/png',
                transparent: true,
				opacity:0.7,
				version: '1.3.0',//wms version (see get capabilities)
                attribution: "PNOA WMS. Cedido por &copy; Instituto Geogr&aacutefico Nacional de Espa&aacute;a"
            });
			
			    var options = {'transparent': true,
								format: 'image/png',
								continuousWorld : false,
								bounds : L.latLngBounds(L.latLng(43.19316, -3.24646), L.latLng(39.54218, 2.21924)),
								crs:L.CRS.EPSG4326,
								dataType: "jsonp",
								attribution: '<a href="http://www.sedecatastro.gob.es/"" target="_blank">Direcci&oacute;n General de Catastro</a>',
								maxZoom: 30};
				var source = L.WMS.source("http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx", options);
				var catastroBase = source.getLayer('Catastro');
				
					
												 
            var openmap= L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                transparent: true,	
                opacity: 0.7,
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            });
   
                        
            var igntodo = L.tileLayer.wms("http://www.ign.es/wms-inspire/ign-base", {
                layers: "IGNBaseTodo",//layer name (see get capabilities)
                format: 'image/png',
                transparent: true,
                version: '1.3.0',//wms version (see get capabilities)
                attribution: "carreteras. Cedido por &copy; Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a"
            });
                        
           
            
            var administrativo =  L.tileLayer.wms("http://www.ign.es/wms-inspire/unidades-administrativas", {
                layers: "AU.AdministrativeUnit",//layer name (see get capabilities)
                format: 'image/png',
                transparent: true,
                version: '1.3.0',//wms version (see get capabilities)
                attribution: "Fondo Cedido por &copy; Instituto Geogr&aacute;fico Nacional de Espa&ntilde;a"
            });
          
            var grupo_BASE = {'Raster IGN':ignraster,'Catastro':catastroBase,'Ortofoto PNOA':Spain_PNOA_Ortoimagen,'MDT pendientes':Spain_MDT_Pendientes};
            var overlay = { 'IGNBASE':igntodo,  'Limites Adm.':administrativo,'Openmap':openmap};
           
            map.addControl(new L.Control.Layers( overlay,grupo_BASE, {position:'topleft'}));
            L.control.scale({imperial:false}).addTo(map);
			var optionsM= { position: 'topright' , captureZIndex: 10000 ,
			                localization: 'es',
							 primaryLengthUnit: 'meters', secondaryLengthUnit: 'kilometers',
							 primaryAreaUnit: 'sqmeters', secondaryAreaUnit: 'hectares',
							 activeColor: '#b820e3',
							 completedColor: '#b820e3',
							 measure: 'Medicioacute;n',
                             measureDistancesAndAreas: 'Medir distancias y acute;reas',
							  createNewMeasurement: 'Crear nueva medicioacute;n',
							  startCreating: 'a&ntilde;ada puntos al mapa',
							  finishMeasurement: 'Terminar medicioacure;n',
							  lastPoint: 'uacute;ltimo punto',
							  area: 'Aacute;rea',
							  perimete: 'Periacute;metro',
							  pointLocation: 'Localizacioacute;n del punto',
							  areaMeasurement: 'Medici&oacute;n de aacute;rea',
							  linearMeasurement: 'Medicioacute;n lineal',
							  pathDistance: 'Distancia de ruta',
							  centerOnArea: 'Centrar en este Area',
							  centerOnLine: 'Centrar en esta l&iacute;nea',
							  centerOnLocation: 'Centrar en esta localizacioacute;n',
							  cancel: 'Cancelar',
							  delete: 'Eliminar',
							  acres: 'Acres',
							  feet: 'Pies',
							  kilometers: 'Km.',
							  hectares: 'Has.',
							  meters: 'Metros',
							  miles: 'Millas',
							  sqfeet: 'Pies cuadrados',
							  sqmeters: 'Metros cuadrados',
							  sqmiles: 'Millas cuadradas',
							  decPoint: ',',
							  thousandsSep: '.'};
			                 
	

			var measureControl = L.control.measure(optionsM);
			measureControl.addTo(map);
			//L.control.mouseCoordinate({gpsLong: false, utm:true,utmref:false}).addTo(map);
			
			
			
			    
          var capaConsulta=L.esri.dynamicMapLayer(
         {
          url:'https://idearagon.aragon.es/servicios/rest/services/INAGA/INAGA_Cotos_Caza/MapServer/',
          opacity: 0.5,
		  format:'png',
          useCors: false,
		  attribution: 'Cotos Aragon.- INAGA'});
          capaConsulta.addTo(map);
          
		  
		  var gisSearch = L.esri.Geocoding.mapServiceProvider({
			  url: 'https://idearagon.aragon.es/servicios/rest/services/INAGA/INAGA_Cotos_Caza/MapServer/',
			  layers: [1],
			  searchFields: ['LABELS','MATRICULA'], // Search these fields for text matches
			  label: 'COTOS ARAGON', // Group suggestions under this header
			  useCors:false,
			  formatSuggestion: function(feature){
			       
					return "COTO: "+feature.properties.LABELS; // format suggestions like this.
					} 
			 
			  });
					  
		 	  /*  formatSuggestion: function(feature){
			       
					return feature.properties.LABELS; // format suggestions like this.
					} */
            
           var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider({countries:"ESP"});
           var searchControl = L.esri.Geocoding.geosearch({providers: [arcgisOnline],useMapBounds:false,zoomToResult:false}).addTo(map);
            
           
           
            searchControl.on("results", function(data){
			$.mobile.loading( 'show', { theme: "a", text: "procesando...", textonly: false,textVisible:true });
			results.eachLayer(function (layer) {
					
				   map.removeLayer(layer);
				 
				  });  
            results.clearLayers();
			searchControl.clear();
			var numResultados = 0;
            for (var i = data.results.length - 1; i >= 0; i--) {
                  markposition= L.marker(data.results[i].latlng,{opacity:1,title:'Marcador de b&uacute;squeda',alt:'Marcador de posici&oacute;n'});
                  markposition.bindPopup(data.results[i].text);
                  markposition.addTo(results);
                  numResultados++;
				  municipioIntersect(data.results[i]);
                }
			  
			     results.eachLayer(function (layer) {
					
				   layer.addTo(map);
				 
				  });  
			      if (numResultados == 1 ) {
                      map.setView(markposition.getLatLng(),10);
                  }					  
			   
            });
                       
             

     // var popupTemplate = "<h3>{NAME}</h3>{ACRES} Acres<br><small>Property ID: {PROPERTYID}<small>";
        
              
               
            map.on('zoomstart', function() {
					zoomactual=map.getZoom();
					center = map.getCenter();
				});
      
          
            map.on('dblclick', function (e) {
			    L.DomEvent.stopPropagation(e);
			    var sumaTemplateMun='';
			    var sumaTemplate='';
				$("#cotos").empty();
			    $("#municipios").empty();
			    $('#panelinfo').show(); 
			    $( "#mypanel" ).trigger( "updatelayout" );
			   $.mobile.loading( 'show', { theme: "a", text: "Cargando...", textonly: false,textVisible:true });
			    $( "#myPanel" ).panel( "open"  );
				$("#panelinfo").collapsible('expand');
				
               
               if ( marker) {
                    map.removeLayer(marker);
               }     
                marker = L.marker([0, 0],{title:'Centro del radio',alt:'marcador de radio',riseOnHover:true});

                marker.bindPopup("");
                marker.addTo(map);
              
                if ( circle ) {
                    map.removeLayer(circle);
                }
                                
                circle = L.circle([ e.latlng.lat, e.latlng.lng ], 1000, {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.4
                }).addTo(map);
                var x,y;
				x= e.latlng.lat;
				y= e.latlng.lng;
                ortoOcaso(e.latlng);
                               
//.................           
               // circle.bindPopup("coordenadas del centro: "+e.latlng.lat + ", " + e.latlng.lng  );
                marker.setLatLng(e.latlng);
                marker.setPopupContent("Coordenadas gps: " + e.latlng.lat + ", " + e.latlng.lng + "<br />buscando direcci&oacute;n..");
                marker.update();
                marker.openPopup();
                map.panTo(e.latlng);
                //   $.getJSON("http://nominatim.openstreetmap.org/reverse?format=json&addressdetails=0&zoom=18&lat=" + e.latlng.lat + "&lon=" + e.latlng.lng + "&json_callback=?",
                $.getJSON("http://nominatim.openstreetmap.org/reverse?format=json&addressdetails=0&zoom=18&lat=" + x + "&lon=" + y + "&json_callback=?",
                function (response) {
                    marker.setPopupContent(response.display_name+"<br/> coordenadas: "+x+","+y); 
                    marker.update();
                }
                
                );
               var resultados;
               var Bounds = circle.getBounds();
               var esquina1 = Bounds.getNorthWest();
               var esquina2 = Bounds.getSouthEast();
               var esquina4 = Bounds.getSouthWest();
               var esquina3 = Bounds.getNorthEast();
               var esquinas = [esquina1,esquina3,esquina2,esquina4];
               if (rectangulo) {
                      map.removeLayer(rectangulo);}
               rectangulo = L.polygon(esquinas, {color: "#ff7800", weight: 2}); 
             
               var centroide = turf.pointOnSurface( rectangulo.toGeoJSON() ); 
               
              // var buffer = turf.buffer(centroide,1,"kilometers");
              var buffer = pointBuffer (centroide, 1, "kilometers", 36);
              buffer.style = {
                     "color":"#F3F781",
                     "stroke-width": 2
                  };
              
            // alert(JSON.stringify(buffer));
               map.fitBounds(Bounds);
              // poligono.bringToFront();
              // query municipios 
			  
              var queryMun = L.esri.query({
                    url:'https://idearagon.aragon.es/servicios/rest/services/INAGA/INAGA_Ambitos/MapServer/3',
                    useCors:false
                });
                queryMun.intersects(buffer); 
                queryMun.run(function(error, featureCollection){
                    var resultadoMun='';
                    var templateMun = '<span class="info">{C_MUNI_INE}-{D_MUNI_INE}</span><br>';
                    var contenidoMun ='';
                    sumaTemplateMun ='';
                    if(error || featureCollection.features.length === 0) {
                    return false;
                   }
                    for (var j = 0; j< featureCollection.features.length;j++) {
                        resultadoMun = JSON.stringify(featureCollection.features[j].properties);
                         var propiedadesMun = JSON.parse(resultadoMun);
                        contenidoMun= L.Util.template(templateMun,propiedadesMun);
                        sumaTemplateMun+= contenidoMun;
                       
                    }
                     $("#municipios").empty();
                     $("#municipios").append('<b>Municipios Afectados</b><br><br>'+sumaTemplateMun);
                    return sumaTemplateMun;
                    
                });
              
               var query = L.esri.query({
                    url:'https://idearagon.aragon.es/servicios/rest/services/INAGA/INAGA_Cotos_Caza/MapServer/1',
                    useCors:false
                });
               
                query.intersects(Bounds);
               
                query.run(function(error, featureCollection){
                 
                   var resultado='';
                  
                   var contenido='';
                   var coordenadas='';
                   var geometria;
                   var geometrias=[];
                   var Template2 = '<span class="info">{MATRICULA}-{DTIPO}</span><br>';
                   if (myLayer) {map.removeLayer(myLayer);}
                   myLayer =L.geoJson().addTo(map);
                   myLayer.addData(buffer);
                   if(error || featureCollection.features.length === 0) {
                    return false;
                   }
                    for (var j = 0; j< featureCollection.features.length;j++) {
                       // resultado = JSON.stringify(featureCollection.features[j].properties,replacer);
                       // alert(j+" "+resultado);
                       // var propiedades2 = JSON.parse(resultado);
                        geometria = featureCollection.features[j].geometry;
                        //alert(JSON.stringify(geometria));
                        geometrias[j]= featureCollection.features[j];
                       // myLayer.addData(geometria);
                       // contenido= L.Util.template(Template2,propiedades2);
                       // alert(JSON.stringify(propiedades2));
                       // sumaTemplate+= contenido;
                                              
                 //  return L.Util.template(popupTemplate, featureCollection.features[j].properties);
                    }
                   
                    var polybuffer = buffer;
                    var interseccion;                 
                  //  alert('bufferpol: '+JSON.stringify(polybuffer));                    
                    for (var k=0; k<j; k++) {
                        
                       interseccion = turf.intersect(polybuffer,geometrias[k]);
                    
                      if (interseccion !== undefined) {
                         interseccion.style= {
                         "color": "#ff7800",
                         "opacity": 1,
                         "stroke": "#501F56",
                         "stroke-width": 1
                           };
                        myLayer.addData(interseccion.geometry);
                        myLayer.addData(geometrias[k].geometry);
                       resultado = JSON.stringify(geometrias[k].properties,replacer);
                       var propiedades2 = JSON.parse(resultado);
                       contenido= L.Util.template(Template2,propiedades2);
                       sumaTemplate+= contenido;
                      }
                       // myLayer.addData(interseccion);
                      // alert('inter: '+JSON.stringify(interseccion));
                    }
                   
                      $("#cotos").empty();
				      $("#cotos").append('<b>Cotos radio de 1 km</b><br><br>'+sumaTemplate);
					  
					 
					  setTimeout(function(){ $.mobile.loading( 'hide'); }, 1000);
					 
                     
					  $.scrollTo(350, 0, "slow", "#municipios");
					 
					  $( "#mypanel" ).trigger( "updatelayout" );

                      return  sumaTemplate;
                    //   return L.Util.template(popupTemplate,propiedades);
                      
                
                });
				
				  $( "#mypanel" ).trigger( "updatelayout" );
				//$.scrollTo(350, 0, "slow", "#municipios");
				//document.getElementById("municipios").scrollIntoView({block: "start", behavior: "smooth"});
				//setTimeout(function(){ $.mobile.loading( 'hide'); }, 3000);
            });
   // click        
		
		map.on('click', function (e) { 
		      L.DomEvent.stopPropagation(e);
			  popupCatastro= undefined;
			  
              document.getElementById("latitud").value = e.latlng.lat;
              document.getElementById("longitud").value = e.latlng.lng;
              var texto;
              var templateCoto =  '<h2>COTO:{MATRICULA}-{DTIPO}</h2><h2>Aprovechamiento: {DAPROCH}<br>NOMBRE:{NOMBRE}<h2>';      
              var popupTemplate = '<h2>COTO:{MATRICULA}-{DTIPO}</h2><h2>Aprovechamiento: {DAPROCH}<br>NOMBRE:{NOMBRE}<br>Titular:{TITULAR}<br>SUPERFICIE:{HSUPERF} has.</h2><h2>';
              var coto;
			  var propiedades;
			  var contenido='';
			capaConsulta.bindPopup(function (error, featureCollection) {
           
                texto='';
				$("#error").empty();
                if(error || featureCollection.features.length === 0) {
				    $("#error").error;
					 if ( popupCatastro!==undefined) {
					   popupCatastro.openOn(map);
					 }
                    return false;
                }
				
				$("#cotos").empty();
				if (myLayerCotos) { map.removeLayer(myLayerCotos);}
				myLayerCotos = L.geoJson(false,{
							onEachFeature: onEachFeature
					}).addTo(map); 
				   
                for (var j = 0; j < featureCollection.features.length;j++) {
                   numFeatures = j;
				   texto = JSON.stringify(featureCollection.features[j].properties,replacer);
                   propiedades = JSON.parse(texto);
				   coto = L.Util.template(templateCoto,propiedades);
				   featureCollection.features[j].properties.contenido = coto;
				   myLayerCotos.addData(featureCollection.features[j]);
				   contenido += L.Util.template(popupTemplate,propiedades);
				   $("#cotos").append(coto);
				   
				  
				}
				  myLayerCotos.setStyle(estiloCotos);
				
				
               // if  (featureCollection.features.length == 1)  {
						  var coordenadas = markCotos[0].getLatLng();
						  
						  ortoOcaso(coordenadas);
						//  map.setView(markCotos[0].getLatLng(),map.getZoom());
						map.setView( [ e.latlng.lat, e.latlng.lng],map.getZoom());
			    //}
              
               // return texto;
               $( "#myPanel" ).panel( "open"  );
			   $("#panelinfo").collapsible('expand');
			   if ( popupCatastro===undefined) {
                      return contenido;
			   } else {
				   return contenido + popupCatastro.getContent();
                 //  return L.Util.template(popupTemplate, featureCollection.features[j].properties);
                }
           
			} );
        });
		 
     }	 
		    
    
             
