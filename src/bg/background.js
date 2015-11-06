// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
  	console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
  	console.log('HELLO boop');

    sendResponse();
  });

console.log('Starting up...');

(function() {
	var settings = {
		checkInterval : 500,
		deathTimeout  : 1000,
		warningFrequency : 4
	};

	var checkingHandle = setInterval(check, settings.checkInterval),
		deathHandle,
		iteration = 0;

	function check() {
		// re-selecting for now, just in case tumblr's framework replaces the DOM node
		var $celebration = document.querySelector('div[data-subview=celebration]');

		++iteration;

		if ($celebration == null) {
			if (iteration % settings.warningFrequency === 0) {
				console.log('nothing');
			}
			return;
		}

		if ($celebration.children.length === 0) {
			if (iteration % settings.warningFrequency === 0) {
				console.log('still empty');
			}
		} else {
			console.log('no longer empty!');
			setupDeathTimer();
		}
	}

	function death() {
		console.log('removing event handlers...');
		clearTimeout(deathHandle);
		clearInterval(checkingHandle);
		console.log('closing tumblr window...');
		window.close();
		self.close();
	}

	function setupDeathTimer() {
		deathHandle = setTimeout(death, settings.deathTimeout);
	}


}());
