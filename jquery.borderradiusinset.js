/*
 * Border-radius Inset for images
 * https://github.com/tegArt/border-radius-inset
 * 
 * Copyright (c) 2013 Dmitry tegArt Sazonov
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */
 
(function($){
	
	$.fn.borderRadiusInset = function(options){

		var options = $.extend({
			radius: [20],
			width: 0,
			color: "#000"
		}, options);
		
		return this.each(function() {
			
			var radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomleft;
			
			// One, two, three and four values in 'radius' option (like css border-radius)
			switch (options.radius.length) {
				case 1:
					radiusTopLeft = radiusTopRight = radiusBottomRight = radiusBottomleft = Math.abs(options.radius[0]);
					break;
				case 2:
					radiusTopLeft = radiusBottomRight = Math.abs(options.radius[0]);
					radiusTopRight = radiusBottomleft = Math.abs(options.radius[1]);
					break;
				case 3:
					radiusTopLeft = Math.abs(options.radius[0]);
					radiusTopRight = radiusBottomleft = Math.abs(options.radius[1]);
					radiusBottomRight = Math.abs(options.radius[2]);
					break;
				default:
					radiusTopLeft = Math.abs(options.radius[0]);
					radiusTopRight = Math.abs(options.radius[1]);
					radiusBottomRight = Math.abs(options.radius[2]);
					radiusBottomleft = Math.abs(options.radius[3]);
			}
			
			var $sourceImage = $(this);
			var imageWidth = $sourceImage.width();
			var imageHeight = $sourceImage.height();
			
			var canvas = document.createElement("canvas");
			canvas.width = imageWidth;
			canvas.height = imageHeight;
			
			var ctx = canvas.getContext("2d");
			$sourceImage.before(canvas);
			$sourceImage.css("display","none");
			
			var img = new Image();
			img.src = $sourceImage.attr("src");

			img.onload = function () {
			
				ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
				
				// border-width
				if (options.width > 0) {
					
					ctx.globalCompositeOperation = 'source-over';
					ctx.beginPath();
					ctx.rect(0,0,imageWidth,imageHeight);
					ctx.arc(0, 0, radiusTopLeft, 0, 2*Math.PI, true);
					ctx.moveTo(imageWidth, 0);
					ctx.arc(imageWidth, 0, radiusTopRight, 0, 2*Math.PI, true);
					ctx.moveTo(imageWidth, imageHeight);
					ctx.arc(imageWidth, imageHeight, radiusBottomRight, 0, 2*Math.PI, true);
					ctx.moveTo(0, imageHeight);
					ctx.arc(0, imageHeight, radiusBottomleft, 0, 2*Math.PI, true);
					ctx.strokeStyle = options.color;
					ctx.lineWidth = options.width*2;
					ctx.stroke();
					
				}
				
				// transparency mask
				ctx.globalCompositeOperation = 'destination-out';
				ctx.beginPath();
				ctx.arc(0, 0, radiusTopLeft, 0, 2*Math.PI, true);
				ctx.moveTo(imageWidth, 0);
				ctx.arc(imageWidth, 0, radiusTopRight, 0, 2*Math.PI, true);
				ctx.moveTo(imageWidth, imageHeight);
				ctx.arc(imageWidth, imageHeight, radiusBottomRight, 0, 2*Math.PI, true);
				ctx.moveTo(0, imageHeight);
				ctx.arc(0, imageHeight, radiusBottomleft, 0, 2*Math.PI, true);
				ctx.fill();
				
			}

		});
	};

})(jQuery);
