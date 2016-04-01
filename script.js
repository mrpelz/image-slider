document.addEventListener('DOMContentLoaded', function () {
	var debug				= true, // Set to true to enable debug-output.
		sliderGroup			= document.querySelector('.slider_group'),
		sliderGroupRect		= sliderGroup.getBoundingClientRect(),
		sliderGroupWidth	= sliderGroup.offsetWidth,
		triggers			= sliderGroup.querySelectorAll('.trigger'),
		slides				= sliderGroup.querySelectorAll('.slide'),
		activeTriggerIndex	= function(callback) {
			triggers.forEach(function(element, index) {
				element.checked && callback(index);
			});
		},
		triggerSet			= {},
		getTriggerSet			= function() {
			activeTriggerIndex(function(data) {
				triggerSet = {
					p:		triggers[data-1] && triggers[data-1] || false,
					a:		triggers[data] && triggers[data] || false,
					n:		triggers[data+1] && triggers[data+1] || false
				};
			});
		},
		slideSet			= {},
		getSlideSet			= function() {
			activeTriggerIndex(function(data) {
				slideSet = {
					p:		slides[data-1] && slides[data-1] || false,
					a:		slides[data] && slides[data] || false,
					n:		slides[data+1] && slides[data+1] || false
				};
			});
		},
		setTranslateX		= function(object, translateX) {
			if(object && translateX) {
				object.style.transform = 'translate( ' + translateX + ' ,0)';
			} else if(object && translateX === false) {
				object.style.transform = '';
			}
		},
		startLeftOffset		= 0,
		lastLeftOffset		= 0,
		movedPixels			= 0,
		handleTouchStart = function(event) {
			var leftOffset = event.touches[0] && (event.touches[0].clientX - sliderGroupRect.left) || false;
			startLeftOffset = leftOffset;
			debug && console.log('start');
			debug && console.log(startLeftOffset);
			lastLeftOffset = leftOffset;
		},
		handleTouchMove = function(event) {
			var leftOffset = event.touches[0] && (event.touches[0].clientX - sliderGroupRect.left) || false;
			if(leftOffset !== lastLeftOffset) {
				movedPixels = leftOffset - startLeftOffset;
				debug && console.log('move');
				debug && console.log(movedPixels);
				slideSet.p && slideSet.p.classList.add('drag');
				setTranslateX(slideSet.p, (movedPixels - sliderGroupWidth) + 'px');
				slideSet.a.classList.add('drag');
				setTranslateX(slideSet.a, (movedPixels) + 'px');
				slideSet.n && slideSet.n.classList.add('drag');
				setTranslateX(slideSet.n, (movedPixels + sliderGroupWidth) + 'px');
				lastLeftOffset = leftOffset;
			}
		},
		handleTouchEnd		= function(event) {
			if(movedPixels < (sliderGroupWidth/2.5*-1)) {
				console.log('next');
				triggerSet.n && (triggerSet.n.checked = true);
			} else if(movedPixels > sliderGroupWidth/2.5) {
				console.log('prev');
				triggerSet.p && (triggerSet.p.checked = true);
			}
			getTriggerSet();
			getSlideSet();
			debug && console.log(triggerSet);
			debug && console.log(slideSet);
			slideSet.p && slideSet.p.classList.remove('drag');
			setTranslateX(slideSet.p, false);
			slideSet.a.classList.remove('drag');
			setTranslateX(slideSet.a, false);
			slideSet.n && slideSet.n.classList.remove('drag');
			setTranslateX(slideSet.n, false);
			startLeftOffset		= 0;
			lastLeftOffset		= 0;
			movedPixels			= 0;
		}
	;

	triggers.forEach(function(element) {
		element.addEventListener('change', function() {
			getTriggerSet();
			getSlideSet();
			debug && console.log(triggerSet);
			debug && console.log(slideSet);
		});
	});
	getTriggerSet();
	getSlideSet();
	debug && console.log(triggerSet);
	debug && console.log(slideSet);

	sliderGroup.addEventListener("touchstart", handleTouchStart, false);
	sliderGroup.addEventListener("touchmove", handleTouchMove, false);
	sliderGroup.addEventListener("touchend", handleTouchEnd, false);
	sliderGroup.addEventListener("touchcancel", handleTouchEnd, false);
});
