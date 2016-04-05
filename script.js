document.addEventListener('DOMContentLoaded', function () {
	var slideOver = 2.5,
		sliderGroups = document.querySelectorAll('.slider_group'),
		run = function(sliderGroup) {
			var sliderGroupRect = sliderGroup.getBoundingClientRect(),
				triggers = sliderGroup.querySelectorAll('.trigger'),
				slides = sliderGroup.querySelectorAll('.slide'),
				activeTriggerIndex = 0,
				getActiveTriggerIndex = function() {
					for(var index = 0; index < triggers.length; ++index) {
						triggers[index].checked && (activeTriggerIndex = index);
					}
				},
				triggerSet = {},
				getTriggerSet = function() {
					triggerSet = {
						p: triggers[activeTriggerIndex-1],
						a: triggers[activeTriggerIndex],
						n: triggers[activeTriggerIndex+1]
					};
				},
				slideSet = {},
				getSlideSet = function() {
					slideSet = {
						p: slides[activeTriggerIndex-1],
						a: slides[activeTriggerIndex],
						n: slides[activeTriggerIndex+1]
					};
				},
				update = function() {
					getActiveTriggerIndex();
					getTriggerSet();
					getSlideSet();
				},
				setTranslateX = function(object, translateX) {
					if(object && translateX) {
						object.style.transform = 'translate( ' + translateX + ' ,0)';
					} else if(object && translateX === false) {
						object.style.transform = '';
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
					var leftOffset = event.touches[0].clientX - sliderGroupRect.left;
					if(leftOffset !== lastLeftOffset) {
						movedPixels = leftOffset - startLeftOffset;
						slideSet.p && slideSet.p.classList.add('drag');
						setTranslateX(slideSet.p, 'calc(' + movedPixels + 'px - 100%)');
						slideSet.a.classList.add('drag');
						setTranslateX(slideSet.a, movedPixels + 'px');
						slideSet.n && slideSet.n.classList.add('drag');
						setTranslateX(slideSet.n, 'calc(' + movedPixels + 'px + 100%)');
						lastLeftOffset = leftOffset;
					}
				},
				handleTouchEnd = function(event) {
					var sliderGroupWidth = sliderGroup.offsetWidth;
					if(movedPixels < sliderGroupWidth/slideOver*-1) {
						triggerSet.n && (triggerSet.n.checked = true);
					} else if(movedPixels > sliderGroupWidth/slideOver) {
						triggerSet.p && (triggerSet.p.checked = true);
					}
					update();
					slideSet.p && slideSet.p.classList.remove('drag');
					setTranslateX(slideSet.p, false);
					slideSet.a.classList.remove('drag');
					setTranslateX(slideSet.a, false);
					slideSet.n && slideSet.n.classList.remove('drag');
					setTranslateX(slideSet.n, false);
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
