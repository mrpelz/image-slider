document.addEventListener('DOMContentLoaded', function () {
	var sliderGroup				= document.querySelector('.slider_group'),
		sliderGroupRect			= sliderGroup.getBoundingClientRect(),
		sliderGroupWidth		= sliderGroup.offsetWidth,
		triggers				= sliderGroup.querySelectorAll('.trigger'),
		slides					= sliderGroup.querySelectorAll('.slide'),
		activeTriggerIndex		= 0,
		getActiveTriggerIndex	= function() {
			for(var index = 0; index < triggers.length; ++index) {
				triggers[index].checked && (activeTriggerIndex = index);
			}
		},
		triggerSet				= {},
		getTriggerSet			= function() {
			triggerSet = {
				p:		triggers[activeTriggerIndex-1] && triggers[activeTriggerIndex-1] || false,
				a:		triggers[activeTriggerIndex] && triggers[activeTriggerIndex] || false,
				n:		triggers[activeTriggerIndex+1] && triggers[activeTriggerIndex+1] || false
			};
		},
		slideSet				= {},
		getSlideSet				= function() {
			slideSet = {
				p:		slides[activeTriggerIndex-1] && slides[activeTriggerIndex-1] || false,
				a:		slides[activeTriggerIndex] && slides[activeTriggerIndex] || false,
				n:		slides[activeTriggerIndex+1] && slides[activeTriggerIndex+1] || false
			};
		},
		setTranslateX			= function(object, translateX) {
			if(object && translateX) {
				object.style.transform = 'translate( ' + translateX + ' ,0)';
			} else if(object && translateX === false) {
				object.style.transform = '';
			}
		},
		startLeftOffset			= 0,
		lastLeftOffset			= 0,
		movedPixels				= 0,
		handleTouchStart		= function(event) {
			var leftOffset = event.touches[0] && (event.touches[0].clientX - sliderGroupRect.left) || false;
			startLeftOffset = leftOffset;
			lastLeftOffset = leftOffset;
		},
		handleTouchMove		= function(event) {
			var leftOffset = event.touches[0] && (event.touches[0].clientX - sliderGroupRect.left) || false;
			if(leftOffset !== lastLeftOffset) {
				movedPixels = leftOffset - startLeftOffset;
				slideSet.p && slideSet.p.classList.add('drag');
				setTranslateX(slideSet.p, (movedPixels - sliderGroupWidth) + 'px');
				slideSet.a.classList.add('drag');
				setTranslateX(slideSet.a, (movedPixels) + 'px');
				slideSet.n && slideSet.n.classList.add('drag');
				setTranslateX(slideSet.n, (movedPixels + sliderGroupWidth) + 'px');
				lastLeftOffset = leftOffset;
			}
		},
		handleTouchEnd			= function(event) {
			if(movedPixels < (sliderGroupWidth/2.5*-1)) {
				triggerSet.n && (triggerSet.n.checked = true);
			} else if(movedPixels > sliderGroupWidth/2.5) {
				triggerSet.p && (triggerSet.p.checked = true);
			}
			getActiveTriggerIndex();
			getTriggerSet();
			getSlideSet();
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

	for(var index = 0; index < triggers.length; ++index) {
		triggers[index].addEventListener('change', function() {
			getActiveTriggerIndex();
			getTriggerSet();
			getSlideSet();
		});
	}
	getTriggerSet();
	getSlideSet();

	sliderGroup.addEventListener("touchstart", handleTouchStart, false);
	sliderGroup.addEventListener("touchmove", handleTouchMove, false);
	sliderGroup.addEventListener("touchend", handleTouchEnd, false);
	sliderGroup.addEventListener("touchcancel", handleTouchEnd, false);
});
