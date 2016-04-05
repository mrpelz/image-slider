document.addEventListener('DOMContentLoaded', function () {
	var slideThreshold = 2.5,
		sliderGroups = document.querySelectorAll('.slider_group'),
		run = function(sliderGroup) {
			var sliderGroupRect = sliderGroup.getBoundingClientRect(),
				triggers = sliderGroup.querySelectorAll('.trigger'),
				slides = sliderGroup.querySelectorAll('.slide'),
				activeTriggerIndex = 0,
				triggerSet = {},
				slideSet = {},
				update = function() {
					for(var index = 0; index < triggers.length; ++index) {
						triggers[index].checked && (activeTriggerIndex = index);
					}
					triggerSet = {
						p: triggers[activeTriggerIndex-1],
						a: triggers[activeTriggerIndex],
						n: triggers[activeTriggerIndex+1]
					};
					slideSet = {
						p: slides[activeTriggerIndex-1],
						a: slides[activeTriggerIndex],
						n: slides[activeTriggerIndex+1]
					};
				},
				setTranslateX = function(object, translateX) {
					if(object && translateX) {
						object.style.transform = 'translate( ' + translateX + ' ,0)';
					} else if(object && translateX === false) {
						object.style.transform = '';
					}
				},
				setDrag = function(offset) {
					if(offset) {
						slideSet.p && slideSet.p.classList.add('drag');
						setTranslateX(slideSet.p, 'calc(' + offset + 'px - 100%)');
						slideSet.a.classList.add('drag');
						setTranslateX(slideSet.a, offset + 'px');
						slideSet.n && slideSet.n.classList.add('drag');
						setTranslateX(slideSet.n, 'calc(' + offset + 'px + 100%)');
					} else {
						slideSet.p && slideSet.p.classList.remove('drag');
						setTranslateX(slideSet.p, false);
						slideSet.a.classList.remove('drag');
						setTranslateX(slideSet.a, false);
						slideSet.n && slideSet.n.classList.remove('drag');
						setTranslateX(slideSet.n, false);
					}
				},
				startLeftOffset = 0,
				lastLeftOffset = 0,
				movedPixels = 0,
				handleTouchStart = function(event) {
					var leftOffset = event.touches[0].clientX - sliderGroupRect.left;
					startLeftOffset = leftOffset;
					lastLeftOffset = leftOffset;
				},
				handleTouchMove = function(event) {
					var leftOffset = event.touches[0].clientX - sliderGroupRect.left,
						sliderGroupWidth = sliderGroup.offsetWidth;
					if(leftOffset !== lastLeftOffset) {
						movedPixels = leftOffset - startLeftOffset;
						if(movedPixels < sliderGroupWidth && movedPixels > sliderGroupWidth*-1) {
							if((slideSet.p && startLeftOffset < leftOffset) || (slideSet.n && startLeftOffset > leftOffset)) {
								setDrag(movedPixels);
								lastLeftOffset = leftOffset;
							}
						}
					}
				},
				handleTouchEnd = function(event) {
					var sliderGroupWidth = sliderGroup.offsetWidth;
					if(movedPixels < sliderGroupWidth/slideThreshold*-1) {
						triggerSet.n && (triggerSet.n.checked = true);
					} else if(movedPixels > sliderGroupWidth/slideThreshold) {
						triggerSet.p && (triggerSet.p.checked = true);
					}
					update();
					setDrag(false);
					startLeftOffset = 0;
					lastLeftOffset = 0;
					movedPixels = 0;
				}
			;
			for(var index = 0; index < triggers.length; ++index) {
				triggers[index].addEventListener('change', function() {
					update();
				});
			}
			update();
			sliderGroup.addEventListener("touchstart", handleTouchStart, false);
			sliderGroup.addEventListener("touchmove", handleTouchMove, false);
			sliderGroup.addEventListener("touchend", handleTouchEnd, false);
			sliderGroup.addEventListener("touchcancel", handleTouchEnd, false);
		}
	;
	if(sliderGroups) {
		for(var index = 0; index < sliderGroups.length; ++index) {
			run(sliderGroups[index]);
		}
	}
});
