let id;
let arrayImagenes = ["slide0", "slide1", "slide2"];
let contadorImagen = 0;

$(document).ready(function () {
    var imgActive = false;
	
    $(document).on("click", ".thumbail", function () {
        if(!imgActive) {
			$(".viewport").css("display","grid");

            var $imgSelected = $(this).attr("src");
            $(".viewport").append("<img id='imgZoom' src='" + $imgSelected + "'></img>");
            imgActive = true;
        }
    });

     $(document).on("click", ".viewport", function () {
        imgActive = false;
		$(this).css("display","none");
        $("#imgZoom").remove();

    });

     $(document).on("click", "#submit", function () {
       id = $("#idVideo").val();
	   
       if(id != null){
           comprobarIDVideo(id);
       }

    });
	


	setInterval('slider()', 5000); /*Cambia imagen cada 5 segundos*/
	
});

function next() {
	removeClass();
	if(contadorImagen == (arrayImagenes.length -1))
		contadorImagen = 0;
	else
		contadorImagen++;
	addClass();
	
}

function prev() {
	removeClass();
	if(contadorImagen == 0)
		contadorImagen = (arrayImagenes.length -1);
	else
		contadorImagen++;
	addClass();
	
}	
function slider () {
	removeClass();
	if(contadorImagen == (arrayImagenes.length -1))
		contadorImagen = 0;
	else
		contadorImagen++;	
	addClass();
	
}

function removeClass(){
	$("." + arrayImagenes[contadorImagen] + " .sthumbail").removeClass("active");
}

function addClass(){
	$("." + arrayImagenes[contadorImagen] + " .sthumbail").addClass("active");
}

function comprobarIDVideo(idVideo) {
	id = idVideo;
    isYoutube();
    isVimeo();
    isDailyMotion();
}


function isYoutube() {
    var url = "https://cors-anywhere.herokuapp.com/https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=" + id + "&format=json";
    isExists(url, "YouTube");
}

function isVimeo() {
    var url = "https://cors-anywhere.herokuapp.com/https://vimeo.com/api/oembed.json?url=https://vimeo.com/" + id;
    isExists(url, "Vimeo");
}

function isDailyMotion() {
    var url = "https://cors-anywhere.herokuapp.com/https://www.dailymotion.com/services/oembed?format=json&url=https://www.dailymotion.com/video/" + id;
    isExists(url, "Dailymotion");
}

function isExists(url, platform) {
    var provider ="";

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        headers: {
            "x-requested-with": "xhr"
        }
    }).done(function(response) {
       var datos = [];
       if(response != undefined) {
           datos = datos.concat(response);
           console.log(response)
           if(datos[0].provider_name != null) {
				var url;
				provider = datos[0].provider_name;	
				
               if(provider == platform && platform == "YouTube"){				  
					url = "https://www.youtube.com/embed/" + id;										
               }
               if(provider == platform && platform == "Vimeo"){
					url = "https://player.vimeo.com/video/" + id;
               }
               if(provider == platform && platform == "Dailymotion"){
					url = "https://www.dailymotion.com/embed/video/" + id;
               }
			   
			   /*Cookie para almacenar la url del video*/
				$.cookie("url", url, { expires: 1 });					
				$(".frame").load('video.php');
           }
       }

    });
}


