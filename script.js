document.addEventListener('DOMContentLoaded', function () {
	var triggers			= document.querySelectorAll('.trigger'),
		slides				= document.querySelectorAll('.slide'),
		activeSlideIndex	= function(callback) {
			triggers.forEach(function(element, index) {
				element.checked && callback(index);
			});
		},
		slideSet			= {},
		getSlideSet			= function() {
			activeSlideIndex(function(data) {
				slideSet = {
					prev:	slides[data-1] && slides[data-1] || false,
					active:	slides[data] && slides[data] || false,
					next:	slides[data+1] && slides[data+1] || false
				};
			});
		}
	;
	triggers.forEach(function(element) {
		element.addEventListener('change', function() {
			getSlideSet();
			console.log(slideSet);
		});
	});
	getSlideSet();
	console.log(slideSet);
});
