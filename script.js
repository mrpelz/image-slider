document.addEventListener('DOMContentLoaded', function () {
	var activeSlide = function() {
		return document.querySelector('.trigger:checked + .label + .slide');
	},
	previousSlide = function() {
		return activeSlide().previousElementSibling.previousElementSibling.previousElementSibling;
	},
	nextSlide = function() {
		return activeSlide().nextElementSibling.nextElementSibling.nextElementSibling;
	};
});
