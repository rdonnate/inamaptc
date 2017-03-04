(function ($) {
    $.fn.FeedEk = function (opt) {
        var def = $.extend({
            FeedUrl: "http://rss.cnn.com/rss/edition.rss",
            MaxCount: 5,
            ShowDesc: true,
            ShowPubDate: true,
            CharacterLimit: 0,
            TitleLinkTarget: "_blank",
            DateFormat: "",
            DateFormatLang:"en"
        }, opt);

        var id = $(this).attr("id"), i, s = "",dt;
        $("#" + id).empty().append('<img src="img/loader.gif" />');
		
		feednami.load(def.FeedUrl,function(result){
        if(result.error) {
            console.log(result.error);
        } else {
            var entries = result.feed.entries;
            for(var i = 0; i < entries.length; i++){
                var entry = entries[i];
              
				
				s += '<div class="itemTitle">' + 'Panel Informaci&oacute;n'+"</div>";
                    
                    if (def.ShowPubDate){
                        dt= new Date(item.publishedDate);
                        if ($.trim(def.DateFormat).length > 0) {
                            try {
                                moment.lang(def.DateFormatLang);
                                s += '<div class="itemDate">' + moment(dt).format(def.DateFormat) + "</div>";
                            }
                            catch (e){s += '<div class="itemDate">' + dt.toLocaleDateString() + "</div>";}                            
                        }
                        else {
                            s += '<div class="itemDate">' + dt.toLocaleDateString() + "</div>";
                        }                        
                    }
                    if (def.ShowDesc) {
                        
                            s += '<div class="itemContent">' + entry.summary + "</div>";
                       
                    }
                $("#" + id).empty();
                $("#" + id).append('<div class="feedEkList">' + s + "</div>");
				
				
				
				
            }
        }
       });
		
		
		
		
		
		
		
		
		
		//

        /* $.ajax({
           // url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + def.MaxCount + "&output=json&q=" + encodeURIComponent(def.FeedUrl) + "&hl=en&callback=?",
			// url: "http://ejohn.org/apps/rss2json/?url=" + encodeURIComponent(def.FeedUrl) + "&callback=?",
			  url: "http://ejohn.org/apps/rss2json/?url=" +def.FeedUrl + "&callback=?",
            dataType: "json",
            success: function (data) {
                $("#" + id).empty();
                $.each(data.items, function (e, item) {
                    s += '<div class="itemTitle">' + 'Panel Informaci&oacute;n'+"</div>";
                    
                    if (def.ShowPubDate){
                        dt= new Date(item.publishedDate);
                        if ($.trim(def.DateFormat).length > 0) {
                            try {
                                moment.lang(def.DateFormatLang);
                                s += '<div class="itemDate">' + moment(dt).format(def.DateFormat) + "</div>";
                            }
                            catch (e){s += '<div class="itemDate">' + dt.toLocaleDateString() + "</div>";}                            
                        }
                        else {
                            s += '<div class="itemDate">' + dt.toLocaleDateString() + "</div>";
                        }                        
                    }
                    if (def.ShowDesc) {
                        if (def.DescCharacterLimit > 0 && item.content.length > def.DescCharacterLimit) {
                            
                            s += '<div class="itemContent">' + item.content.substr(0, def.DescCharacterLimit) + "</div>";
                          
                        }
                        else {
                            s += '<div class="itemContent">' + item.content + "</div>";
                        }
                    }
                });
                $("#" + id).append('<div class="feedEkList">' + s + "</div>");
            }
        }); */
    };
})(jQuery);