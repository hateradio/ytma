# YouTube Me Again!
_aka ytma!_

![YouTube Me Again!](https://hateradio.github.io/ytma/256.png "ytma!")

### Install and Source

Install it from Greasy Fork . . . [https://greasyfork.org/en/scripts/1023-youtube-me-again/](https://greasyfork.org/en/scripts/1023-youtube-me-again/ "YouTube Me Again!")

Check out the source . . . [https://github.com/hateradio/ytma](https://github.com/hateradio/ytma "YouTube Me Again! Source Code")

## Information

* Chrome users can install it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/youtube-me-again/ijioppmkelhobdlpbcgojamecmailcnh)
* YouTube Me Again! transforms plain YouTube/Vimeo/Soundcloud/Vine/MP4/WebM URLs into embedded videos.
* It firsts converts the links into thumbnails and gets information such as title, time, and description.
* Once clicked, those thumbnails disappear and your video is ready to play.
* YTMA also detects when videos are no longer available.

## Updates

#### 8.1

* Fix: Checks for supported embeds

#### 8

* Update YTMA to ESNext
* Fix: (XenoForo) YouTube embed

#### 7.9.1

* Fix: (XenoForo) Ignore links in more text areas

#### 7.9

* Fix: (XenoForo) Ignore links in text areas

#### 7.8

* Fix iFrame selectors
* Adds a monitoring interface to check for updated pages

#### 7.7

* New: YTMA will now try to find new links on AJAX-loaded posts on ResetEra
* Reverts Gfycat iFrame support; removes video tag for wider support
* Removes an outdated Chrome blacklist

#### 7.6

* Fix: overrides resetera support of embeded videos

#### 7.5

* New: Support for ResetEra
* Fix: Parses hours from YouTube URLs

#### 7.2.2

* Updates YouTube iFrame to hide related video feature when pausing

#### 7.2.1

* New: Extension info
* Updates JSHint options
* Removes outdated @include links

#### 7.2

* New: CSS rule to make videos fit within smaller windows
* New: GitHub repository and update links
* New: Streamable favicon
* Fix: Vimeo favicon

#### 7.1

* HTTPS links for Vimeo and Gfycat
* Fix: Safari bug

#### 7

* New: NeoGAF HTTPS Support
* New: Streamable.com added
* New: Soundcloud playlist support
* Improved time parser
* Upon scrolling, cached descriptions are shown
* Code reorganization makes adding new media sites easier

### 6

* New: Imgur GIFV (WEBM/MP4) support
* New: Button to remove cache (descriptions/thumbnail links/etc)
* New: SoundCloud playlist support
* Default video quality is now 720p/HD
* Soundcloud now uses HTML5 player
* Players that open on scroll will no longer trigger the opening of players higher on the page
* Adds HTML5, Gfycat, Imgur icons on links
* Improved Soundcloud and GfyCat URL matchers
* Restructured code base to simplify creation of media controls
* Restructured CSS
* Patched back Gfycat iFrame setting for Safari (it is incompatible with new settings)
* Updates YouTube data API
* Removes:
	* Object tag for YouTube for Flash (Deprecated)
	* "Batch" loading of descriptions (Only manual and scroll methods are supported)

## Previous Additions

* New: Imgur GIFV (WEBM/MP4) support
* New: Button to remove cache (descriptions/thumbnail links/etc)
* New: SoundCloud playlist support
* Default video quality is now 720p/HD
* Soundcloud now uses HTML5 player
* Players that open on scroll will no longer trigger the opening of players higher on the page
* Adds HTML5, Gfycat, Imgur icons on links
* Improved Soundcloud and GfyCat URL matchers
* Restructured code base to simplify creation of media controls
* Restructured CSS
* Patched back Gfycat iFrame setting for Safari (it is incompatible with new settings)
* Updates YouTube data API


+ HTML5 WebM and MP4 support
+ Soundcloud and Vine support
+ HTML5 videos of the same ID will now open and close on first view/first close
+ Window scroll interface detects when descriptions and videos are visible and loads them

## Getting Updates

* GreaseMonkey and TamperMonkey should automatically inform users of new updates.
* To allow update notifications in general, please allow <code>github.com</code> (GitHub) to run scripts! (Whitelist it, NotScript users.)
* You _may_ need to delete previous versions of this script before or after updating.

## Compatibility

![Firefox](https://i.imgur.com/VATcH.png "Firefox") ` Firefox 4+ `

![Safari](https://i.imgur.com/Ll1Ir.png "Safari") ` Safari 6+ `

![Opera](https://i.imgur.com/kqUXX.png "Opera") ` Opera 10+ `

![Chrome](https://i.imgur.com/rFFb0.png "Chrome") ` Chrome 9+ `

Install using the TamperMonkey extension for Safari, Chrome, and Opera!
