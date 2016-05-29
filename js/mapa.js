/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
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
function logos() {
   var element = $('#header');
   var altura = element.height();
   var logos1 = $("#logodga");
   var logos2 = $("#logoinaga2")
   logos1.css("height", altura - 1);
   logos2.css("height", altura - 1);
   }
   function pointBuffer (pt, radius, units, resolution) {
              var ring = []
              var resMultiple = 360/resolution;
              for(var i  = 0; i < resolution; i++) {
                var spoke = turf.destination(pt, radius, i*resMultiple, units);
                ring.push(spoke.geometry.coordinates);
              }
              if((ring[0][0] !== ring[ring.length-1][0]) && (ring[0][1] != ring[ring.length-1][1])) {
                ring.push([ring[0][0], ring[0][1]]);
              }
              return turf.polygon([ring])
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

function validaFecha(fecha){
                  
            var datePat = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
            var fechaCompleta = fecha.match(datePat);
            if (fechaCompleta == null) {
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
                    var bisiesto = (anio % 4 == 0 && (anio % 100 != 0 || anio % 400 == 0));
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
            }
          xmlhttp.open("get",url,true);
         // xmlhttp.setRequestHeader('Access-Control-Allow-Origin','*');
          xmlhttp.setRequestHeader('Content-Type', 'application/jsonp');
         // xmlhttp.setRequestHeader('X-PINGOTHER', 'pingpong');

          xmlhttp.send();	

     }		
     function initMap() {
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
			 function estiloCotos(feature) {
					       
							switch (feature.properties.DAPROCH) {
								case 'CAZA MAYOR': return {color: "#ff0000"};
								case 'CAZA MAYOR Y MENOR':   return {color: "#0000ff"};
								case 'CAZA MENOR':   return {color: "#00ff00"};
								case 'NO CINEGÉTICO':   return {color: "#b820e3"};
								
			} };
			
	        function municipioIntersect (e) {
			  var marca = L.marker([e.latlng.lat, e.latlng.lng]).toGeoJSON();
			  var buffer = pointBuffer (marca, 1/200, "kilometers", 72);
              $("#error").empty();
			   if (layerMunicipio) {map.removeLayer(layerMunicipio)};
               var queryMun = L.esri.query({
                    url:'http://idearagon.aragon.es/arcgis/rest/services/INAGA_Ambitos/MapServer/3',
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
							url:'http://idearagon.aragon.es/arcgis/rest/services/INAGA_Cotos_Caza/MapServer/1',
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
						   if (myLayerQuery) {map.removeLayer(myLayerQuery)};
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
					}	 
						                                         
                 } );     
                  setTimeout(function(){ $.mobile.loading( 'hide'); }, 1000);				 
			} 
              
	        
	        function queryCotos(whereClause) {
			    //QUERY COTOS WHERE 
			   zoomIni(map);
			   var queryWhere = L.esri.query({
                    url:'http://idearagon.aragon.es/arcgis/rest/services/INAGA_Cotos_Caza/MapServer/1',
                    useCors:false,
					
                });
				
				//"LABELS='T10401'"
				queryWhere.where(whereClause);
				queryWhere.run( function (error,featureCollection){ 
				     if (myLayerCotos) {map.removeLayer(myLayerCotos)};
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
					
					
					/* markCotos[j]= L.marker(coordenadas,{opacity:1,title:'Marcador de coto',alt:'Marcador de posición'});
					markCotos[j].bindPopup(textoPopup);
					markCotos[j].addTo(map); */
					
				}
				  if  (featureCollection.features.length == 1)  {
						var coordenadas = markCotos[0].getLatLng();
						map.setView( coordenadas,12);
				   }
				    setTimeout(function(){ $.mobile.loading( 'hide'); }, 1000);
				  });   
              // query de cotos
	         }
	        function onLocationFound(e) {
			      $("#error").empty();
                  var radius = e.accuracy / 2;
				  var altura;
				  var textoGeoLocaliza = "<b>Esta dentro de un radio de " + radius + " metros de este punto <br> Latitud: "+e.latlng.lat +"<br>"+ " Longitud: " +e.latlng.lng;
				 
				   if (!(e.altitude===undefined || e.altitude == 0) ) {
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
			var map = L.map("map",{doubleClickZoom:false,minZoom:7,
			maxZoom: 40,
			bounceAtZoomLimits:true,
			maxBounds: L.latLngBounds(L.latLng(43.19316, -3.24646), L.latLng(39.54218, 2.21924))});
			
			
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
             $("#verinfo").click(function() { 
					  matricula=document.getElementById("matricula").value;
					  matricula = matricula.toUpperCase();
					  whereClause = "LABELS LIKE " + "'%" + matricula + "%'";
					  if (matricula = null || document.getElementById("matricula").value.length == 0 ||  /^\s*$/.test(document.getElementById("matricula").value)) {
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
						
						
			 map.on('locationfound', onLocationFound);
             map.on('locationerror', onLocationError);
			 $("#locate").click(function(e) {
			        L.DomEvent.stopPropagation(e);
					map.locate({setView: true, maxZoom:18,enableHighAccuracy:true});   
                    //enableHighAccuracy:true					
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
            
            var pnoa = L.tileLayer.wms("http://www.ign.es/wms-inspire/pnoa-ma", {
                layers: "OI.OrthoimageCoverage",//layer name (see get capabilities)
                format: 'image/png',
                transparent: true,
                version: '1.3.0',//wms version (see get capabilities)
                attribution: "PNOA WMS. Cedido por © Instituto Geográfico Nacional de España"
            }).addTo(layerGroup);
                             
            var openmap= L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                transparent: true,	
                opacity: 0.7,
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            });
            
             var ignraster = L.tileLayer.wms("http://www.ign.es/wms-inspire/mapa-raster", {
                layers: "mtn_rasterizado",//layer name (see get capabilities)
                format: 'image/png',
                opacity: 0.6,
                transparent: true,
                version: '1.3.0',//wms version (see get capabilities)
                attribution: "Fondo Cedido por © Instituto Geográfico Nacional de España"
            }).addTo(layerGroup);
            
           

                        
            var igntodo = L.tileLayer.wms("http://www.ign.es/wms-inspire/ign-base", {
                layers: "IGNBaseTodo",//layer name (see get capabilities)
                format: 'image/png',
                transparent: true,
                version: '1.3.0',//wms version (see get capabilities)
                attribution: "carreteras. Cedido por © Instituto Geográfico Nacional de España"
            });
                        
           
            
            var administrativo =  L.tileLayer.wms("http://www.ign.es/wms-inspire/unidades-administrativas", {
                layers: "AU.AdministrativeUnit",//layer name (see get capabilities)
                format: 'image/png',
                transparent: true,
                version: '1.3.0',//wms version (see get capabilities)
                attribution: "Fondo Cedido por © Instituto Geográfico Nacional de España"
            });
          
            var grupo_BASE = {'Raster IGN':ignraster };
            var overlay = { 'Ortofoto PNOA':pnoa,'IGNBASE':igntodo,  'Limites Adm.':administrativo,'Openmap':openmap};
           
            map.addControl(new L.Control.Layers( overlay,grupo_BASE, {position:'topleft'}));
            L.control.scale({imperial:false}).addTo(map);
			
			    
          var capaConsulta=L.esri.dynamicMapLayer(
         {
          url:'http://idearagon.aragon.es/arcgis/rest/services/INAGA_Cotos_Caza/MapServer',
          opacity: 0.5,
          useCors: false });
          capaConsulta.addTo(map);
          
		  
		  var gisSearch = L.esri.Geocoding.mapServiceProvider({
			  url: 'http://idearagon.aragon.es/arcgis/rest/services/INAGA_Cotos_Caza/MapServer/',
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
                  markposition= L.marker(data.results[i].latlng,{opacity:1,title:'Marcador de búsqueda',alt:'Marcador de posición'});
                  markposition.bindPopup(data.results[i].text);
                  markposition.addTo(results);
                  numResultados++;
				  municipioIntersect(data.results[i]);
                }
			  
			     results.eachLayer(function (layer) {
					
				   layer.addTo(map);
				 
				  });  
			      if (numResultados == 1 ) {
                      map.setView(markposition.getLatLng(),15);
                  }					  
			   
            });
                       
             

     // var popupTemplate = "<h3>{NAME}</h3>{ACRES} Acres<br><small>Property ID: {PROPERTYID}<small>";
        
              
               
            map.on('zoomstart', function() {
					zoomactual=map.getZoom();
					center = map.getCenter();
				});
      
          /*  map.on('mousemove', function(e) {
                document.getElementById("y").value = e.latlng.lat;
                document.getElementById("x").value = e.latlng.lng
            }); */
          
            map.on('dblclick', function (e) {
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
                
                            // ----
            

                
                //---
                
                var x,y,z;
                x=  e.latlng.lat;
                y= e.latlng.lng;
                
                var fechaOK=true;    
                
                var fechaj =  document.getElementById("fecha").value;
				fechaj = parseDate(fechaj);
				fechaOK=validaFecha(fechaj);
                if(!fechaOK){
                     $("#error").empty();
                     $("#error").append("Debe introducir una Fecha de consulta válida.");
                }
                if (fechaOK) {
                      $("#error").empty();
                      var url_get= "http://servizos.meteogalicia.es/rss/predicion/rssOrto.action?request_locale=es&lat=" + e.latlng.lat + "&lon=" + e.latlng.lng + "&data=" +fechaj;

                     $('#info').FeedEk({
                        FeedUrl:url_get,
                        ShowDesc: true,
                        ShowPubDate: false,
                        DateFormat: 'LLL',
                        DateFormatLang: 'es'
                       // DescCharacterLimit: 223
                    });
                }
               
//.................           
               // circle.bindPopup("coordenadas del centro: "+e.latlng.lat + ", " + e.latlng.lng  );
                marker.setLatLng(e.latlng);
                marker.setPopupContent("Coordenadas gps: " + e.latlng.lat + ", " + e.latlng.lng + "<br />buscando dirección..");
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
                    url:'http://idearagon.aragon.es/arcgis/rest/services/INAGA_Ambitos/MapServer/3',
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
                    url:'http://idearagon.aragon.es/arcgis/rest/services/INAGA_Cotos_Caza/MapServer/1',
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
                   if (myLayer) {map.removeLayer(myLayer)};
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
                    
                      if (!(interseccion === undefined)) {
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
		    
             var texto;
                         
              var popupTemplate = '<h3>COTO:{MATRICULA}-{DTIPO}</h3><br>Aprovechamiento: {DAPROCH}<br>NOMBRE:{NOMBRE}<br>Titular:{TITULAR}<br>SUPERFICIE:{HSUPERF} has.</h3>';
              capaConsulta.bindPopup(function (error, featureCollection) {
           
                texto='';
				$("#error").empty();
                if(error || featureCollection.features.length === 0) {
                    return false;
                }
                for (var j = 0; j<= featureCollection.features.length;j++) {
                    
                   texto += JSON.stringify(featureCollection.features[j].properties,replacer);
                   var propiedades = JSON.parse(texto);
                   return L.Util.template(popupTemplate,propiedades);
                 //  return L.Util.template(popupTemplate, featureCollection.features[j].properties);
                }
               
                return texto;

           
          } );
		    
		 
     }	 
		    
    
             
