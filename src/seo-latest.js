// SEO Bookmarklet Tool script. Created by Troy Meyer
// Copyright Troy Meier 2013

/*

 v.0.5 - 2022-11-11
 - Open-sourced
 - Removed Google Analytics and affiliate links
 - Enjoy!

 v.0.4 - 2015-08-13
 [x] Incorporated highlighting of img elements without alt attributes
 [x] IE < 9 is no longer supported (due to extensive use of the querySelectorAll method)
 [x] Count and highlight only images, headings, and a elements not within the SEO Bookmarklet
 [x] Properly styled a elements within the SEO Bookmarklet

 v.0.3 - 2015-08-12
 [x] Allow closing using the bookmarklet link. See http://twkm.ca/gadgets/resources/seo-bookmarklet/ for bookmarklet code.
 [x] Added Google Structured Data, Mobile-Friendly, and PageSpeed Insights testing tool links
 [x] Added Facebook Opengraph debugger and Twitter Cards Validator tool links
 [x] Auto-versioning CSS based on release (stable or bleeding edge)

 v.0.2.5

 x Add background fade panel
 x Optimized loading and reloading code
 x Added support for secure sites (https://)

 v.0.2.4

 x Added Affiliate links.

 v.0.2.3

 x Added Google Analytics pixel

 v.0.2.2

 x Removed "Extract Targeted Terms (SEOmoz)" tool and replaced with "SEOBook Keyword Density" Tool

 v.0.2.1

 x Fixed Google de-personalization, now works on secure sites.

 v.0.2

 x Parsing of robots.txt to see if the page/folder is disallowed in any user agents
 x Checks rel=canonical to see if it is set as the current page
 x Added help and information dialogs throughout
 x Added nofollow link highlighting
 x Added ability to open external tool links in new windows
 x General formatting and styling enhancements
 x Added W3C Markup validity checkers

 v.0.1

 x Page meta details
	- title, meta description, meta keywords
 X Page text readbility level (Using common testing)
	- through link to external site.
 - Keyword presence/density
 X Presence of H1, img alt tags, etc. on page.
 X Presence of sitemap.xml on domain
 X Text length checker
 X Tool links

*/

 /* Bookmark code to load this bookmarklet:

available at http://twkm.ca/seo-bookmarklet/

*/

var version = 'latest'; // latest | stable
var versionNumber = '0.5';

var d=document;
var b=document.body;
var m=d.getElementsByTagName("meta");
var h = d.getElementsByTagName("head")[0];

var urlDP = ('https:' == d.location.protocol ? 'https://' : 'http://');
var urlLocation = encodeURIComponent(d.location.href);
var urlDomain = encodeURIComponent(d.location.href.substr(location.protocol.length + 2));

var da = new Date();

var box=d.createElement('div');
var css=d.createElement('link');
var panel=d.createElement('div');

var pScript=d.getElementById('twkmSEOScript');

var nL = "\n";

var twkm_SB = {
	"twkmDefaultItems" : [
		"onPage",
		"seoToolLinks",
		"socialToolLinks",
		"researchLinks",
		"toolLinks",
		"checkTextLength"
	],
	"startup" : function(){
	/* Startup functionality */

		e = window.document.getElementById("twkmMessage");
		p = window.document.getElementById("twkmBlurrer");

		// if the twkmMessage already exists, remove it
		if(e){
			e.parentNode.removeChild(e);
		}

		// If the panel already exists, remove it
		if(p){
			p.parentNode.removeChild(p);
		}

		// Set up the stylesheet
		if(!d.getElementById('twkmCSS_SEO')){
			css.type = 'text/css';
			css.rel = 'stylesheet';
			css.href = urlDP+'twkm.ca/gadgets/resources/seo-bookmarklet/seo-'+version+'.css?ts='+da.getTime();
			css.id = 'twkmCSS_SEO';
			h.appendChild(css);
		}

		// Set up the fade panel
		panel.id = 'twkmBlurrer';

		b.appendChild(panel);

		this.buildBox();

		// Set up event listeners
		var allH3s = d.querySelectorAll('#twkmMessage h3.builtItem');

		// Register the listeners to each toggle
		for (var x in allH3s ) {
			allH3s[x].addEventListener('mouseup', twkm_expandContent);
			allH3s[x].addEventListener('touchend', twkm_expandContent);
		}

		// Put the close button right next to the scroll bars
		/*
		var closeButton = d.getElementById('twkmClose');

		// Get the width of the scrollbar
		var margin = d.getElementById('twkmMessage').offsetWidth - d.getElementById('twkmMessage').clientWidth;

		if(margin != 0){

			var margin = '-'+(margin-6)+'px';

			closeButton.style.marginLeft = margin;
		}
		*/

	},
	"buildBox" : function(){
	/* Build the box and fill it with stuff */
		box.id = 'twkmMessage';
		b.appendChild(box);

		var version = versionNumber;

		var boxValue = '<div id="twkmTitle"><h2 class="title"><a href="http://twkm.ca/seo-bookmarklet/">SEO Bookmarklet</a></h2><span>'+ version +' by <a href="http://twkm.ca" title="Troy Meier">Troy Meier</a></span><span id="twkmClose"><a href="javascript:twkm_closeThisBox();">X</a></span></div>'+nL;
		boxValue += '<div style="padding-top:8px"><a href="#tOp">On-Page</a> | <a href="#rIntel">Research and Intelligence</a> | <a href="#tL">External Tools</a> | <a href="#cTL">Check Text Length</a></div>';

		// Update message to allow closing via the bookmarklet
		if(pScript.className != '03'){
			boxValue += '<div style="background-color: #F98781; margin: 0.8em; padding: 0.5em; text-size: 0.9em; font-weight: bold;">New bookmarklet button code is available! Visit <a href="http://twkm.ca/seo-bookmarklet/" target="new" style="background-color: inherit;">http://twkm.ca/seo-bookmarklet/</a> to install the latest versions.</div>';
		}

		//console.log(this.twkmDefaultItems.length);

		for (var i in this.twkmDefaultItems){
			var m = this.twkmDefaultItems[i];
			//console.log(m+' '+typeof this.defFunctions[m]);
			//var x = this.buildItem(this.defFunctions[m]);
			var x = this.buildItem.call(this, this.defFunctions[m]);
			if(x != 'undefined') boxValue += x;
		}

		/* Debug:
		for(i=0;i<this.twkmDefaultItems.length;i++){
			var m = this.twkmDefaultItems[i];
			console.log(m+' '+typeof this[m]);
			var x = this.buildItem(this[m]);
			boxValue += x;
		}
		*/

		boxValue += '';
		box.innerHTML = boxValue;

		// Classify all a elements
		var twkmA = d.querySelectorAll('#twkmMessage a');
		for (var x in twkmA) {
			twkmA[x].className = twkmA[x].className+" twkmA";
		}
		// Classify all heading elements
		var twkmH = d.querySelectorAll('#twkmMessage h1, #twkmMessage h2, #twkmMessage h3');
		for (var x in twkmH) {
			twkmH[x].className = twkmH[x].className+" twkmH";
		}
		// Classify all img elements
		var twkmImg = d.querySelectorAll('#twkmMessage img');
		for (var x in twkmImg) {
			twkmImg[x].className = twkmImg[x].className+" twkmImg";
		}

	},
	"buildItem" : function (m){
		if (typeof m === 'undefined') return '';

		var c = (typeof m.body === 'function') ? m.body() : m.body;
		var cClass = (m.hidden) ? ' style="display:none;"' : '';
		var exStatus = (m.hidden) ? '[show]' : '[hide]';
		var v = '<h3 id="'+m.id+'" class="builtItem"><span class="expandContent">'+exStatus+'</span>'+m.title+'</h3><div id="'+m.id+'Content" class="twkmContent"'+cClass+'>'+c+'</div>';

		return v;

	},
	// These functions are for building the sections of the SEO tool
	"defFunctions" : {

		"checkTextLength" : {
			"title" : "Check Text Length",
			"id" : "cTL",
			"hidden" : true,
			"body" : '<p><textarea id="twkmChkText" onchange="javascript:document.getElementById(\'twkmCounter\').innerHTML = this.value.length;" onkeyup="javascript:document.getElementById(\'twkmCounter\').innerHTML = this.value.length;"></textarea></br><span id="twkmCounter">-</span> characters</p>'

		},
		"toolLinks" : {
			"title" : "Misc. Tools",
			"id" : "tL",
			"hidden" : false,
			"body" : function (){

				var links = [

					{ 'title' : 'De-personalize Google',
					  'href'  : 'javascript:twkm_DpGoogle()',
					  'ext'   : false
					},
					{ 'title' : 'Whois (GoDaddy)',
					  'href'  : 'http://who.godaddy.com/whois.aspx?domain='+d.location.hostname
					},
					{ 'title' : 'Wayback Machine (Internet Archive)',
					  'href'  : 'http://wayback.archive.org/web/*/'+d.location.href
					}

				];

				var boxValue = twkm_loopLinks(links);

				return boxValue;

			}

		},
		"forumSpam" : {
			"title" : "Check StopForumSpam.com",
			"id" : "twkmCSFP",
			"hidden" : false,
			"body" : '<table class="contentTable"><tr><th>IP: </th><td><input type="text" id="twkmCSFP-IP" value="69.10.53.194" /></td></tr>'+nL+'<tr><th>Email: </th><td><input type="text" id="twkmCSFP-e" /></td></tr>'+nL+'</table>'+'<div style="text-align:center;"><input type="button" value="Check" onclick="javascript:twkm_checkStopForumSpam()"/></div>'
		},
		"seoToolLinks" : {
			"title" : "SEO Tools",
			"id" : "twkmSEO",
			"hidden" : false,
			"body" : function(){
				var seoLinks = [
					{ 'title' : 'Google Structured Data Testing Tool',
					  'href'  : 'https://developers.google.com/structured-data/testing-tool?url='+urlLocation
					},
					{ 'title' : 'Google Mobile-Friendly Testing Tool',
					  'href'  : 'https://www.google.com/webmasters/tools/mobile-friendly/?url='+urlLocation
					},
					{ 'title' : 'Google PageSpeed Insights',
					  'href'  : 'https://developers.google.com/speed/pagespeed/insights/?url='+urlLocation
					},
					{ 'title' : 'SEOBook Keyword Density Analyzer Tool',
					  'href'  : 'http://tools.seobook.com/general/keyword-density/?url='+urlDomain
					},
					{ 'title' : 'W3C Unicorn Validator (Markup and CSS, unified validator)',
					  'href'  : 'http://validator.w3.org/unicorn/check?ucn_uri='+urlLocation+'&ucn_task=conformance#'
					},
					{ 'title' : 'W3C Link Checker',
					  'href'  : 'http://validator.w3.org/checklink?uri='+urlLocation
					},
					{ 'title' : 'W3C Markup Validation Service',
					  'href'  : 'http://validator.w3.org/check?uri='+urlLocation+'&charset=%28detect+automatically%29&doctype=Inline&group=0'
					},
					{ 'title' : 'W3C CSS Validation Service',
					  'href'  : 'http://jigsaw.w3.org/css-validator/validator?uri='+urlLocation+'&profile=css21&usermedium=all&warning=1&vextwarning=&lang=en'
					},
					{ 'title' : 'Readability of this page',
					  'href'  : 'http://www.readability.info/index.cgi?u='+urlLocation
					},
					{ 'title' : 'Text-only reading (Instapaper)',
					  'href'  : 'http://www.instapaper.com/text?u='+urlLocation
					}

				]

				return twkm_loopLinks(seoLinks);
			}
		},
		"socialToolLinks" : {
			"title" : "Social Tools",
			"id" : "twkmSocial",
			"hidden" : false,
			"body" : function(){

				var socialLinks = [
					{ 'title' : 'Facebook Opengraph Debugger',
					  'href'  : 'https://developers.facebook.com/tools/debug/og/object?q='+urlLocation
					},
					{ 'title' : 'Twitter Card validator',
					  'href'  : 'https://cards-dev.twitter.com/validator/'
					}
				]

				return twkm_loopLinks(socialLinks);
			}
		},
		"onPage" : {

			"title" : "On-Page Factors",
			"id" : "tOp",
			"hidden" : false,
			"body" : function() {

				// Check the DOM's images, a tags, check for sitemap.xml, etc.
				var a = d.querySelectorAll('a:not(.twkmA)'); // A elements not in the bookmarklet
				var img = d.querySelectorAll('img:not(.twkmImg)'); // Images not in the bookmarklet
				var h1 = d.querySelectorAll('h1:not(.twkmH');
				var h2 = d.querySelectorAll('h2:not(.twkmH');
				var h3 = d.querySelectorAll('h3:not(.twkmH');

				var link = d.getElementsByTagName("link");

				// Count all links with a title tag present

				var aT = 0; // Total a elements with a title set
				var aN = 0; // Total nofollowed a elements
				var aNH = 0; // Whether or not link highlighting is on

				var imgNA = 0; // Total img elements without alt attributes
				var imgNAH = 0; // Whether or not img highlighting is on

				if(a.length > 0){
					for (var x in a){

						// Count link titles
						if (!(typeof a[x].title === 'undefined') && a[x].title != "") aT++;

						// Count nofollowed
						if (!(typeof a[x].rel === 'undefined') && a[x].rel.match(/nofollow/i)){
							aN++;

							if(a[x].className.match(/twkmNFHighlight/)){
								/* Highlighting is on */
								aNH = 1;
							}
						}

					}
				}

				// Set up the highlight link

				var aHLL = '<a nohref onclick="twkm_highlightNF(this)" class="twkmToggleOn" title="Highlights nofollowed links with a red border and pink background colour.">Highlight nofollowed links</a>';

				if(aNH == 1){
					aHLL = '<a nohref onclick="twkm_highlightNF(this)" class="twkmToggleOff" title="Highlight nofollowed links with a red border and pink background colour.">Turn highlighting off</a>';
				}

				// If there are no "nofollow" links, don't show the toggle.
				if(aN < 1){
					aHLL = '';
				}

				// Count all images with alt tag present
				var iT = 0; // Images with alt attributes present

				if(img.length > 0){
					for ( var x in img ){
						if ( (!(typeof img[x].alt === 'undefined') && img[x].alt != "") ) {
							iT++;
						} else {
							// Check to see if highlighting is on
							if ( (!(typeof img[x].className === 'undefined') && img[x].className.match(/twkmNAHighlight/)) ) {
								imgNAH = 1;
							}
						}
					}
				}

				// Only show the img highlight toggle if there are imgs without alt attributes
				var iAHLL = '';
				if((img.length - iT) > 0){

					// Set up the highlight link
					iAHLL = '<a nohref onclick="twkm_highlightNoAlt(this)" class="twkmToggleOn" title="Highlights img elements without an alt attribute with a red dotted border">Highlight img elements without alt</a>';

					if(imgNAH){ // If highlighting is already on, show  the turn off option
						iAHLL = '<a nohref onclick="twkm_highlightNoAlt(this)" class="twkmToggleOff" title="Highlights img elements without an alt attribute with a red dotted border">Turn highlighting off</a>';
					}
				}

				// Check for sitemap.xml

				var url2 =  d.location.protocol + "//" + d.location.hostname+'/sitemap.xml';
				var sM = twkm_loadXMLDoc(url2);

				sM.onreadystatechange = function(){
				  if (sM.readyState==4){
						d.getElementById('twkmSMP').innerHTML = (sM.status == 200) ? '<span class="twkmGood" title="'+url2+'">Present</span>' : '<span class="twkmAlert" title="'+url2+'">Not Present</span>' ;
					}
				}

				// Check for robots.txt

				var url =  d.location.protocol + "//" + d.location.hostname+'/robots.txt';
				var rT = twkm_loadXMLDoc(url);

				rT.onreadystatechange = function(){
				  if (rT.readyState==4){

						// See if the current page is blocked in robots.txt
						if (rT.status == 200) { // robots.txt is present
							var robotsTxt = rT.responseText;

							var allBlockedMsg = '<a nohref onclick="alert(\'Search engines may not be able to find this file. All files and sub-directories on this domain are disallowed in robots.txt for one or more user agents.\')" title="Search engines may not be able to find this file. All files and sub-directories on this domain are disallowed in robots.txt for one or more user agents.">[Disallow All]</a> ';
							var pathBlockedMsg = '<a nohref onclick="alert(\'Search engines may not be able to find this file. The path to this file is disallowed in robots.txt for one or more user agents.\')" title="Search engines may not be able to find this file. The path to this file is disallowed in robots.txt for one or more user agents.">[Disallow Path]</a> ';
							var pageBlockedMsg = '<a nohref onclick="alert(\'Search engines may not be able to find this file. This specific file is disallowed in robots.txt for one or more user agents.\')" title="Search engines may not be able to find this file. This specific file is disallowed in robots.txt for one or more user agents.">[Disallow File]</a> ';

							var allBlocked = /^User-agent: (\*|[a-zA-Z0-9]*)$\n^Disallow: \/$/gim; // Everything is blocked
							var pageBlocked = new RegExp('^Disallow: ' + d.location.pathname + '$', 'gim'); // This page is blocked.

							var bAllBlocked = 0, bPageBlocked = 0, bPathBlocked = 0;

							if (robotsTxt.match(allBlocked)){
								bAllBlocked = 1;
							}

							// Check to see if the page is blocked
							//console.log(d.location.pathname);

							if(robotsTxt.match(pageBlocked)) {
								bPageBlocked = 1;
							}

							// Get each folder component of the path
							var pathMatch = d.location.pathname.match(/(.+?\/)/gim);

							var robotsSearch = '';

							//console.log(pathMatch.length);
							if(pathMatch){

								var runningPath = '';
								for ( var x=0; x < pathMatch.length; x++ ){

									// Check for disallow

									if(pathMatch[x].substr(1) == '/'){ // folder in root directory

										var regex = new RegExp('Disallow: '+pathMatch[x]+'$', 'im');
										if(robotsTxt.match(regex)){

											bPathBlocked = 1;
											break;

										}

									}else{ // some sub folder

										runningPath += pathMatch[x];

										var regex = new RegExp('Disallow: '+runningPath+'$', 'im');
										if(robotsTxt.match(regex)){

											bPathBlocked = 1;
											break;

										}

									}

								}

							}

							var htmlMessage = '';

							htmlMessage += (bAllBlocked) ? allBlockedMsg : '';
							htmlMessage += (bPathBlocked) ? pathBlockedMsg : '';
							htmlMessage += (bPageBlocked) ? pageBlockedMsg : '';

							htmlMessage = (bAllBlocked || bPathBlocked || bPageBlocked) ? htmlMessage : '';

						}else{

							htmlMessage = '';

						}

						d.getElementById('twkmRbtsTxt').innerHTML = (rT.status == 200) ? htmlMessage+'<span class="twkmGood" title="'+url+'">Present</span>  (<a nohref onclick="twkm_viewRobots()">View</a>)' : '<span class="twkmAlert" title="'+url+'">Not Present</span>';

					}
				}

				// Look for rel canonical

				var canonical = '[not set]';

				//console.log(link.length+' '+link[0]);

				if(link.length > 0){
					for ( var i in link){

						if(link[i].rel && link[i].rel.match(/canonical/i)){

							if (link[i].href == d.location){
								// If the canonical value and this page are the same, let us know
								canonical = '<a nohref onclick="alert(\'This page has a canonical page set, and it is listed as the current page.\');" title="This page has a canonical page set, and it is listed as the current page.">[Current Page]</a> '+link[i].href;
							}else{
								// Provide a link to the canonical page.
								canonical = '<a href="'+link[i].href+'">'+link[i].href+'</a>';
							}

							break;

						}

					}
				}

				// Get GA Cookie info

				var gaCookie = '<textarea style="width: 100%; height: 25px; font-size: 14px;">'+document.cookie+'</textarea>';

				// Get GA Referrer

				var gaReferrer = (document.referrer) ? document.referrer : '[not set]';

				// Get page meta details

				var desc="[not set]";
				var keyw="[not set]";
				var robots="[not set]";
				var title = (d.title) ? d.title : "[not set]";

				for( var i=0; i<m.length; i++){
					if(m[i].name.match(/description/i)){
						desc=m[i].content;
					}

					if(m[i].name.match(/keywords/i)){
						keyw = m[i].content;
					}

					if(m[i].name.match(/robots/i)){
						robots = m[i].content;
					}
				}

				var titleLength = '<span class="twkmAlert" title="The title of this page is not set. It is recommended to have a title set for each page.">(N/A)</span>';
				if(title != "[not set]"){
					titleLength = (title.length < 70) ? '('+title.length+' of 70)' : '<span class="twkmAlert" title="The title tag is longer than the recommended 70 characters.">('+title.length+' of 70)</span>';
				}
				var descLength = '<span class="twkmAlert" title="The description of this page is not set. It is recommended to have a description set for each page.">(N/A)</span>';
				if(desc != "[not set]"){
					descLength = (desc.length < 155) ? '('+desc.length+' of 155)' : '<span class="twkmWarning" title="The description meta tag is longer than the recommended 155 characters.">('+desc.length+' of 155)</span>';
				}

				// output

				var r = '<table class="contentTable"><tr><th>Title: <br/>'+titleLength+'</th><td><input type="text" value="'+title+'" style="width:100%; text-align:left;" onClick="javascript:this.focus();this.select();" /></td></tr><tr><th>Description: <br/>'+descLength+'</th><td><input type="text" value="'+desc+'" style="width:100%; text-align:left;" onClick="javascript:this.focus();this.select();" /></td></tr><tr><th>Keywords:</th><td><input type="text" value="'+keyw+'" style="width:100%; text-align:left;" onClick="javascript:this.focus();this.select();" /></td></tr></table>'+nL;

				r += '<table class="contentTable"><tr><th>Image alt set:</th><td>'+iT+' of '+img.length+'<br/>'+iAHLL+'</td></tr>'+nL;
				r += '<tr><th>Link title set:</th><td>'+aT+' of '+a.length+'</td></tr>'+nL;
				r += '<tr><th>Nofollowed links:</th><td>'+aN+' of '+a.length+'<br/>'+aHLL+'</td></tr>'+nL;

				// If there are more than one H1s, highlight this info.

				var h1sInfo = (h1.length == 1) ? '<span class="twkmGood">'+h1.length+'</span>' : '<span class="twkmWarning" title="For SEO purposes, one H1 is considered best practice.">'+h1.length+'</span>';

				r += '<tr><th>Headers</th><td>H1: '+h1sInfo+'<br/>H2: '+h2.length+'<br/>H3: '+h3.length+'</td></tr>'+nL;
				r += '<tr><th>Sitemap:</th><td><div id="twkmSMP">Checking...</div></td></tr>'+nL;
				r += '<tr><th>robots.txt:</th><td><div id="twkmRbtsTxt">Checking...</div></td></tr>'+nL;
				r += '<tr><th>REL Canonical:</th><td>'+canonical+'</td></tr>'+nL;
				r += '<tr><th>Meta Robots:</th><td>'+robots+'</td></tr>'+nL;
				r += '<tr><th>Site cookie:</th><td>'+gaCookie+'</td></tr>'+nL;
				r += '<tr><th>Referrer URL:</th><td>'+gaReferrer+'</td></tr>'+nL;

				r += '</table>';

				return r;

			}

		},
		"researchLinks" : {
			"title" : "Research and Intelligence Tools",
			"id" : "rIntel",
			"hidden" : false,
			"body" : function (){

				var links = [

					// No longer exists '<a href="http://labs.google.com/sets">Google Sets</a>',
					{ 'title' : 'Google AdWords Keyword Tool',
					  'href'  : 'https://adwords.google.com/o/Targeting/Explorer?__u=1000000000&__c=1000000000&ideaRequestType=KEYWORD_IDEAS#search.none'
					},
					{ 'title' : 'Open Site Explorer - Current Domain (SEOmoz)',
					  'href'  : 'http://www.opensiteexplorer.org/links?site='+location.host
					},
					{ 'title' : 'Open Site Explorer - Current URL (SEOmoz)',
					  'href'  : 'http://www.opensiteexplorer.org/links?site='+location.href
					},
					{ 'title' : 'SEMrush data - Current Domain',
					  'href'  : 'http://semrush.com/search.php?q='+location.host+'&ref=432739506'
					},
					{ 'title' : 'Historic Link Graph (MajesticSEO)',
					  'href'  : 'http://www.majesticseo.com/reports/compare-domain-backlink-history?d0='+location.host+'&d1=&type=0&IndexDataSource=H'
					},
					{ 'title' : 'Web Marketshare data</a> <a title="Clicky Web Analytics" href="http://getclicky.com/66480865">(Clicky Web Analytics)</a>',
					  'href'  : 'http://getclicky.com/marketshare/global/web-browsers/'
					}

				];

				var boxValue = twkm_loopLinks(links);

				return boxValue;

			}

		}

	}

}

// AJAX Helper to check for sitemap (may have other uses later)

function twkm_loadXMLDoc(url){
	var xmlhttp;
	var ready;
	if (window.XMLHttpRequest){
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}else{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

xmlhttp.open("GET",url,true);
xmlhttp.send();

return xmlhttp;
}

function twkm_loopLinks(twkmContent){

	var output = '';

	for( var i=0; i<twkmContent.length; i++){

		// Create versions that work in an external window

		//console.log(typeof twkmContent[i]);

		if(typeof twkmContent[i] === 'object'){

			var linkHref = twkmContent[i]['href'];

			if(twkmContent[i]['ext'] != false){

				var links = '<a href="'+linkHref+'" target="_blank" rel="external" title="Open in New Window">[+]</a>&nbsp;&nbsp;<a href="'+linkHref+'">'+twkmContent[i]['title']+'</a>';

			}else{

				var links = '<a href="'+linkHref+'">'+twkmContent[i]['title']+'</a>';

			}

		}else{

			var links = twkmContent[i];

		}

		output += '<div class="extLink">'+links+'</div>'+nL

	}
	return output;

}

/* De-Personalize Google */

function twkm_DpGoogle(){

	var dpMatch=location.href.match(/&pws=0/);
	var gMatch=location.href.match(/https?:\/\/www[\.]*google\.[a-z]{2,3}/);
	if(gMatch){
		if(dpMatch){
			alert('Already De-Personalized!');
		}else{
			var x = confirm('Click OK to finish de-personalization.');
			if (x) location.href=location.href+'&pws=0';
		}
	}else{
		alert('Not a Google search engine site');
	};

}

function twkm_checkStopForumSpam(){

	var ip = document.getElementById("twkmCSFP-IP").value.replace(" ",""); // Get the innerHTML and remove spaces
	var e = document.getElementById("twkmCSFP-e").value.replace(" ","");

	var q;

	if(ip.length > 0){

		q = 'ip='+ip;

		if(e.length > 0){

			q += '&email='+e;

		}

	}else{

		if(e.length > 0){

			q = 'email='+e;

		}else{

			alert('Please enter an email address and/or ip address.');

		}

	}

	q += '&f=xmldom';

	// Whoops, can't load across domains... Forgot about that.

	var xR = twkm_loadXMLDoc('http://www.stopforumspam.com/api?'+q);

	xR.onreadystatechange = function(){
	  if (xR.readyState==4){

			var xT = xR.responseXML;

			console.log(xR.responseXML);

			if(xT){

				var a = xT.getElementsByTagName("appears");

				var found = false;

				console.log(a.length);

				if(a.length > 1){

					for( var i in a){

						//console.log(a[i].innerHTML);
						//console.log(a[i].value);

						if(a[i].childNodes[0].nodeValue == true){
							found = true;
							break;
						}

					}

				}else{

					console.log(a[0].childNodes[0].nodeValue);

					if(a[0].childNodes[0].nodeValue == true) found = true;

				}

				if(found){

					alert('The email or IP you entered appears in StopForumSpam.com. You may have trouble using it for link placements.');

				}else{

					alert('Does not appear in StopForumSpam.com');

				}

			}else{

				alert('There was an error with the request. Please try again later.');

			}

		}
	}

}

/* Highlight Nofollowed links */

function twkm_highlightNF(link){

	//console.log("Link class: "+link.className);

	var atwo = document.getElementsByTagName("a");

	if(link.className.indexOf("twkmToggleOn") > -1 ){
			/* Turn highlighting on */

			if(atwo.length > 0){
				for ( var x in atwo){

					// Count nofollowed
					if (!(typeof atwo[x].rel === 'undefined') && atwo[x].rel.match(/nofollow/)){

						// Add a class to highlight

						atwo[x].className = atwo[x].className+" twkmNFHighlight";


					}

				}
			}

			link.innerHTML = "Turn highlighting off";
			link.className = link.className.replace("twkmToggleOn", "twkmToggleOff");

		}else{

			//console.log("Turn off highlighting");

			/* Turn highlighting off */

			if(atwo.length > 0){
				for ( var x in atwo ){

					//console.log(a[x].className.match(/twkmNFHighlight/));

					// Count nofollowed
					if (!(typeof atwo[x].className === 'undefined') && atwo[x].className.match(/twkmNFHighlight/g)){

						// Remove the highlight class

						atwo[x].className = atwo[x].className.replace(/ twkmNFHighlight/g, "");


					}

				}
			}

			link.innerHTML = "Highlight nofollowed links";
			link.className = link.className.replace("twkmToggleOff", "twkmToggleOn");


		}

}

/* Highlight img elements without alt attributes */

function twkm_highlightNoAlt(link){

	var itwo = document.getElementsByTagName("img");

	if( link.className.indexOf("twkmToggleOn") > -1 ){
			/* Turn highlighting on */

			if(itwo.length > 0){
				for ( var x in itwo ){

					// Count alt-less images
					if ((typeof itwo[x].alt === 'undefined') || itwo[x].alt == "") {

						// Add a class to highlight

						itwo[x].className = itwo[x].className+" twkmNAHighlight";


					}

				}
			}

			link.innerHTML = "Turn highlighting off";
			link.className = link.className.replace("twkmToggleOn", "twkmToggleOff");

		}else{

			//console.log("Turn off highlighting");

			/* Turn highlighting off */

			if(itwo.length > 0){
				for ( var x in itwo ) {

					//console.log(a[x].className.match(/twkmNFHighlight/));

					// Count alt-less images
					if (!(typeof itwo[x].className === 'undefined') && itwo[x].className.match(/twkmNAHighlight/g)){

						// Remove the highlight class
						itwo[x].className = itwo[x].className.replace(/ twkmNAHighlight/g, "");

					}

				}
			}

			link.innerHTML = "Highlight img elements without alt";
			link.className = link.className.replace("twkmToggleOff", "twkmToggleOn");

		}

}

function twkm_expandContent(){

	//console.log('Fired: '+this.id);

	// Reference the content div.
	var contentItem = d.getElementById(this.id+'Content');

	// Reference the show/hide text
	var linkText = this.firstChild;

	linkText.innerHTML = (linkText.innerHTML == '[show]') ? '[hide]' : '[show]';
	contentItem.style.display = (contentItem.style.display == 'none' || contentItem.className == 'twkmHidden') ? 'block' : 'none';

}

// Displays the contents of the robots.txt file
function twkm_viewRobots(){

	// Check for robots.txt

	var url3 =  d.location.protocol + "//" + d.location.hostname+'/robots.txt';

	var rT3 = twkm_loadXMLDoc(url3);

	rT3.onreadystatechange = function(){
	  if (rT3.readyState==4){

			// See if the current page is blocked in robots.txt

			alert(rT3.responseText);

		}
	}


}

// Check robots.txt for a specific match
function twkm_checkRobots(path, regex){

	var reg2 = new RegExp(regex, 'gim');

	// check to see if there is a match to the regex
	var matches = path.match(reg2);

	// find the last index of the match
	return (path.lastIndexOf(search));

}

function twkm_closeThisBox(){
	if (box) b.removeChild(box);
	//if (css) css.parentNode.removeChild(css);
	if (pScript) pScript.parentNode.removeChild(pScript);
	if (panel) b.removeChild(panel);

}


twkm_SB.startup();
