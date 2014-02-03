			(function ( $ ) {

				$.fn.PuzzleCAPTCHA = function( options ) {

					var sets = $.extend({
						imageURL: "http://distilleryimage2.s3.amazonaws.com/c886e1100cbe11e3a77722000a1fbc49_5.jpg",
						width: "auto",
						height: "auto",
						columns: 3,
						rows: 2,
						targetInput: null,
						targetVal: null,
						targetButton: null
					}, options );

					var tmpObj=this;
					tmpObj.addClass("puzzleCAPTCHA");
					tmpObj.append('<div class="pcBox"><div class="pcBoxBG"><img src="'+sets.imageURL+'" style="width:'+sets.width+';height:'+sets.height+';"></div></div> <div class="pcAnswer"></div>');

					tmpObj.find(".pcBoxBG img").load(function(){
						tmpImg=$(this);

						if(sets.width == 'auto'){
							tmpW=tmpImg.width();
							tmpH=tmpImg.height();
						}else{
							tmpW=sets.width;
							tmpH=sets.height;
						}
						itemW = Math.round(tmpW/sets.columns);
						itemH = Math.round(tmpH/sets.rows);

						tmpObj.find(".pcAnswer").width(itemW).height(itemH).append( tmpImg.clone() ).css({'margin-top':tmpH/2-itemH/2});

						tmpObj.find(".pcBox").width(tmpObj.find(".pcBox").width()-1);
						tmpObj.find(".pcBox").height(tmpObj.find(".pcBox").height()-1);

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
						tmpObj.find(".pcBoxItem img, .pcAnswer img").css({'margin-left':answerLeft*-1,'margin-top':answerTop*-1});

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