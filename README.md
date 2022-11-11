I am no longer maintaining this bookmarklet, so I'm releasing it here for others to build upon and customize. If you want to use it in its current state, the install instructions below should work for quite a while. Or you can fork and build your own implementation. 

## History

As an Internet Marketer I needed to review web pages every day to see how their on-page optimizations stack up against best practices to find out where they might be improved. With all of the different factors that go into on-page optimizations, it can often be very cumbersome to search through the page source to find all the areas of optimization I regularly looked for.

So I built a bookmarklet that highlights the areas I looked for most often, as well as a bunch of external tools I used to check other aspects, such as the readability of the page or how old the domain name is.

### How it works

The bookmarklet opens a window over the page you're viewing to show you a bunch of different SEO factors and links to external sites. When you're done just click the red "x" button at the top right and the window will close. You don't have to leave the page or view the source.

### Install

Drag this to your bookmarks bar: <a href="javascript:function run(){var d=document,da=new Date(),b=d.body,p=('https:' == document.location.protocol ? 'https://' : 'http://'),ex=d.getElementById('twkmSEOScript');try{if(!b)throw(0);if(!ex){z=d.createElement('scr'+'ipt');z.setAttribute('src',p+'twkm.ca/min/f=gadgets/resources/seo-bookmarklet/seo-latest.js?ts='+da.getTime());z.setAttribute('id','twkmSEOScript');z.setAttribute('class','03');b.appendChild(z);}else{twkm_closeThisBox();}}catch(e){alert('Please wait until the page has loaded.');}}run();void(0)" title="SEO Bookmarklet (Bleeding Edge)">SEO (BE)</a>

or copy this code: 

    javascript:function run(){var d=document,da=new Date(),b=d.body,p=('https:' == document.location.protocol ? 'https://' : 'http://'),ex=d.getElementById('twkmSEOScript');try{if(!b)throw(0);if(!ex){z=d.createElement('scr'+'ipt');z.setAttribute('src',p+'twkm.ca/min/f=gadgets/resources/seo-bookmarklet/seo-latest.js?ts='+da.getTime());z.setAttribute('id','twkmSEOScript');z.setAttribute('class','03');b.appendChild(z);}else{twkm_closeThisBox();}}catch(e){alert('Please wait until the page has loaded.');}}run();void(0)

### Full List of Features

The bookmarklet is broken into four main sections, and each can be hidden or expanded by clicking the title:

* On-Page Factors 
    * Title tag length and value
    * Meta description tag length and value
    * Count of ``<img>`` tags with the alt attribute set, and total number of tags on the page
    * Count of ``<a>`` tags with the title attribute set, and total number of tags on the page
    * Count of heading elements from h1 to h3 on the page
    * Whether or not sitemap.xml and robots.txt files are present in the root folder of the domain (i.e. "www.seomoz.org/sitemap.xml" or "www.seomoz.org/robots.txt")
    * Whether or not rel=canonical or meta robots tags are present, and what their values are
    * The site cookie
    * The referral URL to the current page
    * A set of links that will perform various tasks on the page, such as the SEOmoz Term Extractor, the W3C Link Checker, and others
* Research and Intelligence Tools 
    * Open Site Explorer links for the current page and current domain
    * An historic backlink graph for the site
    * Access to the Google AdWords keyword tool
    * and links to research and market intelligence resources
* External Tools
    * Quick links to Google Structured Data, Mobile-Friendliness, PageSpeed Insights tools
    * Quick links to Facebook Opengraph debugger and Twitter Cards Validator tools.
    * De-personalize Google results pages
    * Get Whois data from GoDaddy
    * View past versions of the page you're viewing through the Internet Archive's Wayback Machine
* Text Length Checker 
    * Paste a chunk of text in the text box to find out how many characters are present
