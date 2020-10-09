// Reload
heightS = screen.height;
widthS = screen.width;
heightW = window.innerHeight;
widthW = window.innerWidth;
resS = document.getElementById('screenResolution');
resS.innerHTML = widthS + "×" + heightS;
resW = document.getElementById('windowSize');
resW.innerHTML = widthW + "×" + heightW;


// Reload
window.onresize = function() { location.reload(); }


// Cookie Notice
new cookieNoticeJS({

// Localizations of the notice message
'messageLocales': {
	'en': 'We are using Google Analytics'
},

// Localizations of the dismiss button text
'buttonLocales': {
	'en': 'Got it!'
},

// Position for the cookie-notifier (default=bottom)
'cookieNoticePosition': 'bottom',

// Shows the "learn more button (default=false)
'learnMoreLinkEnabled': false,

// The href of the learn more link must be applied if (learnMoreLinkEnabled=true)
'learnMoreLinkHref': 'https://marketingplatform.google.com/about/analytics/terms/us/',

// Text for optional learn more button
'learnMoreLinkText':{
	'en':'Learn more'
},

// The message will be shown again in X days
'expiresIn': 30,

// Specify a custom font family and size in pixels
'fontFamily': 'inherit',
'fontSize': 12,

// Dismiss button background color
'buttonBgColor': '#af8b6a',  

// Dismiss button text color
'buttonTextColor': '#fff',

// Notice background color
'noticeBgColor': '#000000',

// Notice text color
'noticeTextColor': '#fff',

// the learnMoreLink color (default='#009fdd')
'linkColor': '#af8b6a',

// The target of the learn more link (default='', or '_blank')
'linkTarget': '_blank',

// Print debug output to the console (default=false)
'debug': false
});