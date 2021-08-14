var Pirates = {};
(function(){
	var 
		flyingBlocks = [],
		scrollBlocks = [],
		calcPosition = function(position, vector, speed) {
			var newPosition = {};
			newPosition.top = position.top + vector[1] * speed;
			newPosition.left = position.left + vector[0] * speed;
			return newPosition;
		}
	Pirates.flyBlock = function(element, speed){
		var
			startAngle = Math.random() * Math.PI,
			vector = [Math.sin(startAngle), Math.cos(startAngle)],
			$e = $(element),
			$p = $e.parent();			
		$e.addClass('position-absolute');
		flyingBlocks.push(function(){
			var 
				newPosition,
				position = $e.position();
			newPosition = calcPosition(position, vector, speed);
			if (newPosition.top < 0 || newPosition.top > $p.height() - $e.height()) {
				vector[1] *= -1;
				newPosition = calcPosition(position, vector, speed);
			}
			if (newPosition.left < 0 || newPosition.left > $p.width() - $e.width()) {
				vector[0] *= -1;
				newPosition = calcPosition(position, vector, speed);
			}
			
			$e.css(newPosition);
		});
		
	};
	Pirates.scrollBlock = function(element, scrollFactor) {
		var
			$e = $(element),
			$p = $e.parent();
		$e.addClass('position-absolute');
		$(document).on('scroll', function(){
			var 
				scroll = $(document).scrollTop(),
				top = scroll * (1 - scrollFactor);
			$e.css('top', top);
		})
	};
	Pirates.run = function() {
		setInterval(function(){
			for (var i=0; i < flyingBlocks.length; i++) {
				flyingBlocks[i]();
			}
		}, 30);
	}
})();


