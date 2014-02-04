			(function ( $ ) {

				$.fn.PuzzleCAPTCHA = function( options ) {

					var sets = $.extend({
						imageURL: "http://www.choikangstory.com/test-image.jpg",
						width: "auto",
						height: "auto",
						columns: 3,
						rows: 2,
						targetInput: null,
						targetVal: null,
						targetButton: null
					}, options );

					tmpW=sets.width;
					if(tmpW!='auto'){
						tmpW+='px';
					}
					tmpH=sets.height;
					if(tmpH!='auto'){
						tmpH+='px';
					}

					var tmpObj=this;
					tmpObj.addClass("puzzleCAPTCHA");
					tmpObj.append('<div class="pcBox"><div class="pcBoxBG"><img src="'+sets.imageURL+'" style="width:'+tmpW+';height:'+tmpH+';"></div></div> <div class="pcAnswer"></div>');

					tmpObj.find(".pcBoxBG img").load(function(){
						tmpImg=$(this);

						if(sets.width == 'auto'){
							tmpW=tmpImg.width();
						}else{
							tmpW=sets.width;
						}

						if(sets.height == 'auto'){
							tmpH=tmpImg.height();
						}else{
							tmpH=sets.height;
						}

						//console.log(tmpW);
						//console.log(tmpH);

						itemW = Math.round(tmpW/sets.columns);
						itemH = Math.round(tmpH/sets.rows);

						tmpObj.find(".pcAnswer").width(itemW).height(itemH).append( tmpImg.clone() ).css({'margin-top':tmpH/2-itemH/2});

						tmpObj.find(".pcBox").width(tmpW-1);
						tmpObj.find(".pcBox").height(tmpH-1);

						tmpAnswer=Math.floor(Math.random() * sets.columns * sets.rows);

						var x,y,tmpItem,i;

						tmpItem = $(document.createElement("div"));
						tmpItem.addClass("pcBoxItem");

						i=0;

						for(x=0;x<sets.columns;x++){
							for(y=0;y<sets.rows;y++){
								tmpLeft=itemW*x;
								tmpTop=itemH*y;
								if(i==tmpAnswer){
									answerLeft=tmpLeft;
									answerTop=tmpTop;
								}

								_item=tmpItem.clone().attr("data-val",i).css({
									width:itemW,
									height:itemH,
									left:tmpLeft,
									top:tmpTop
								}).append(tmpImg.clone());
								tmpObj.find(".pcBox").append(_item);

								i++;
							}
						}
						tmpObj.find(".pcBoxItem img, .pcAnswer img").css({'margin-left':answerLeft*-1,'margin-top':answerTop*-1}).width(tmpW).height(tmpH);

						tmpObj.find(".pcBoxItem").click(function(){
							if($(this).data("val")==tmpAnswer){
								tmpObj.find(".pcBoxItem").fadeOut(300);
								if(sets.targetInput!=null){
									$(sets.targetInput).val(sets.targetVal);
								}
								if(sets.targetButton!=null){
									$(sets.targetButton).prop("disabled",false);
								}
							}
						});

					});

					return this;

				};

			}( jQuery ));