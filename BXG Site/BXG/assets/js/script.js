!function (i) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery) }(function (i) { "use strict"; var e = window.Slick || {}; (e = function () { var e = 0; return function (t, o) { var s, n = this; n.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: i(t), appendDots: i(t), arrows: !0, asNavFor: null, prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>', nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function (e, t) { return i('<button type="button" />').text(t + 1) }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, focusOnChange: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, n.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, scrolling: !1, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, swiping: !1, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++ , n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0) } }()).prototype.activateADA = function () { this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" }) }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) { var s = this; if ("boolean" == typeof t) o = t, t = null; else if (t < 0 || t >= s.slideCount) return !1; s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) { i(t).attr("data-slick-index", e) }), s.$slidesCache = s.$slides, s.reinit() }, e.prototype.animateHeight = function () { var i = this; if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) { var e = i.$slides.eq(i.currentSlide).outerHeight(!0); i.$list.animate({ height: e }, i.options.speed) } }, e.prototype.animateSlide = function (e, t) { var o = {}, s = this; s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({ left: e }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({ top: e }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({ animStart: s.currentLeft }).animate({ animStart: e }, { duration: s.options.speed, easing: s.options.easing, step: function (i) { i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o)) }, complete: function () { t && t.call() } })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () { s.disableTransition(), t.call() }, s.options.speed)) }, e.prototype.getNavTarget = function () { var e = this, t = e.options.asNavFor; return t && null !== t && (t = i(t).not(e.$slider)), t }, e.prototype.asNavFor = function (e) { var t = this.getNavTarget(); null !== t && "object" == typeof t && t.each(function () { var t = i(this).slick("getSlick"); t.unslicked || t.slideHandler(e, !0) }) }, e.prototype.applyTransition = function (i) { var e = this, t = {}; !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t) }, e.prototype.autoPlay = function () { var i = this; i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed)) }, e.prototype.autoPlayClear = function () { var i = this; i.autoPlayTimer && clearInterval(i.autoPlayTimer) }, e.prototype.autoPlayIterator = function () { var i = this, e = i.currentSlide + i.options.slidesToScroll; i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e)) }, e.prototype.buildArrows = function () { var e = this; !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" })) }, e.prototype.buildDots = function () { var e, t, o = this; if (!0 === o.options.dots) { for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1)t.append(i("<li />").append(o.options.customPaging.call(this, o, e))); o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active") } }, e.prototype.buildOut = function () { var e = this; e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) { i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "") }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable") }, e.prototype.buildRows = function () { var i, e, t, o, s, n, r, l = this; if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) { for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) { var d = document.createElement("div"); for (e = 0; e < l.options.rows; e++) { var a = document.createElement("div"); for (t = 0; t < l.options.slidesPerRow; t++) { var c = i * r + (e * l.options.slidesPerRow + t); n.get(c) && a.appendChild(n.get(c)) } d.appendChild(a) } o.appendChild(d) } l.$slider.empty().append(o), l.$slider.children().children().children().css({ width: 100 / l.options.slidesPerRow + "%", display: "inline-block" }) } }, e.prototype.checkResponsive = function (e, t) { var o, s, n, r = this, l = !1, d = r.$slider.width(), a = window.innerWidth || i(window).width(); if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) { s = null; for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o])); null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l]) } }, e.prototype.changeSlide = function (e, t) { var o, s, n, r = this, l = i(e.currentTarget); switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) { case "previous": s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t); break; case "next": s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t); break; case "index": var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll; r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus"); break; default: return } }, e.prototype.checkNavigable = function (i) { var e, t; if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1]; else for (var o in e) { if (i < e[o]) { i = t; break } t = e[o] } return i }, e.prototype.cleanUpEvents = function () { var e = this; e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition) }, e.prototype.cleanUpSlideEvents = function () { var e = this; e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1)) }, e.prototype.cleanUpRows = function () { var i, e = this; e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i)) }, e.prototype.clickHandler = function (i) { !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault()) }, e.prototype.destroy = function (e) { var t = this; t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () { i(this).attr("style", i(this).data("originalStyling")) }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t]) }, e.prototype.disableTransition = function (i) { var e = this, t = {}; t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t) }, e.prototype.fadeSlide = function (i, e) { var t = this; !1 === t.cssTransitions ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }), t.$slides.eq(i).animate({ opacity: 1 }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }), e && setTimeout(function () { t.disableTransition(i), e.call() }, t.options.speed)) }, e.prototype.fadeSlideOut = function (i) { var e = this; !1 === e.cssTransitions ? e.$slides.eq(i).animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 })) }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) { var e = this; null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit()) }, e.prototype.focusHandler = function () { var e = this; e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) { t.stopImmediatePropagation(); var o = i(this); setTimeout(function () { e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay()) }, 0) }) }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () { return this.currentSlide }, e.prototype.getDotCount = function () { var i = this, e = 0, t = 0, o = 0; if (!0 === i.options.infinite) if (i.slideCount <= i.options.slidesToShow)++o; else for (; e < i.slideCount;)++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else if (!0 === i.options.centerMode) o = i.slideCount; else if (i.options.asNavFor) for (; e < i.slideCount;)++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll); return o - 1 }, e.prototype.getLeft = function (i) { var e, t, o, s, n = this, r = 0; return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e }, e.prototype.getOption = e.prototype.slickGetOption = function (i) { return this.options[i] }, e.prototype.getNavigableIndexes = function () { var i, e = this, t = 0, o = 0, s = []; for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;)s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow; return s }, e.prototype.getSlick = function () { return this }, e.prototype.getSlideCount = function () { var e, t, o = this; return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (s, n) { if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1 }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) { this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e) }, e.prototype.init = function (e) { var t = this; i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay()) }, e.prototype.initADA = function () { var e = this, t = Math.ceil(e.slideCount / e.options.slidesToShow), o = e.getNavigableIndexes().filter(function (i) { return i >= 0 && i < e.slideCount }); e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) { var s = o.indexOf(t); i(this).attr({ role: "tabpanel", id: "slick-slide" + e.instanceUid + t, tabindex: -1 }), -1 !== s && i(this).attr({ "aria-describedby": "slick-slide-control" + e.instanceUid + s }) }), e.$dots.attr("role", "tablist").find("li").each(function (s) { var n = o[s]; i(this).attr({ role: "presentation" }), i(this).find("button").first().attr({ role: "tab", id: "slick-slide-control" + e.instanceUid + s, "aria-controls": "slick-slide" + e.instanceUid + n, "aria-label": s + 1 + " of " + t, "aria-selected": null, tabindex: "-1" }) }).eq(e.currentSlide).find("button").attr({ "aria-selected": "true", tabindex: "0" }).end()); for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)e.$slides.eq(s).attr("tabindex", 0); e.activateADA() }, e.prototype.initArrowEvents = function () { var i = this; !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler))) }, e.prototype.initDotEvents = function () { var e = this; !0 === e.options.dots && (i("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1)) }, e.prototype.initSlideEvents = function () { var e = this; e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1))) }, e.prototype.initializeEvents = function () { var e = this; e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition) }, e.prototype.initUI = function () { var i = this; !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show() }, e.prototype.keyHandler = function (i) { var e = this; i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({ data: { message: !0 === e.options.rtl ? "next" : "previous" } }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({ data: { message: !0 === e.options.rtl ? "previous" : "next" } })) }, e.prototype.lazyLoad = function () { function e(e) { i("img[data-lazy]", e).each(function () { var e = i(this), t = i(this).attr("data-lazy"), o = i(this).attr("data-srcset"), s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"), r = document.createElement("img"); r.onload = function () { e.animate({ opacity: 0 }, 100, function () { o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({ opacity: 1 }, 200, function () { e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading") }), n.$slider.trigger("lazyLoaded", [n, e, t]) }) }, r.onerror = function () { e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]) }, r.src = t }) } var t, o, s, n = this; if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o-- , s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad) for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++)r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r-- , l++; e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)) }, e.prototype.loadSlider = function () { var i = this; i.setPosition(), i.$slideTrack.css({ opacity: 1 }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad() }, e.prototype.next = e.prototype.slickNext = function () { this.changeSlide({ data: { message: "next" } }) }, e.prototype.orientationChange = function () { var i = this; i.checkResponsive(), i.setPosition() }, e.prototype.pause = e.prototype.slickPause = function () { var i = this; i.autoPlayClear(), i.paused = !0 }, e.prototype.play = e.prototype.slickPlay = function () { var i = this; i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1 }, e.prototype.postSlide = function (e) { var t = this; t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus())) }, e.prototype.prev = e.prototype.slickPrev = function () { this.changeSlide({ data: { message: "previous" } }) }, e.prototype.preventDefault = function (i) { i.preventDefault() }, e.prototype.progressiveLazyLoad = function (e) { e = e || 1; var t, o, s, n, r, l = this, d = i("img[data-lazy]", l.$slider); d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () { s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad() }, r.onerror = function () { e < 3 ? setTimeout(function () { l.progressiveLazyLoad(e + 1) }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad()) }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l]) }, e.prototype.refresh = function (e) { var t, o, s = this; o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, { currentSlide: t }), s.init(), e || s.changeSlide({ data: { message: "index", index: t } }, !1) }, e.prototype.registerBreakpoints = function () { var e, t, o, s = this, n = s.options.responsive || null; if ("array" === i.type(n) && n.length) { s.respondTo = s.options.respondTo || "window"; for (e in n) if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) { for (t = n[e].breakpoint; o >= 0;)s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--; s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings } s.breakpoints.sort(function (i, e) { return s.options.mobileFirst ? i - e : e - i }) } }, e.prototype.reinit = function () { var e = this; e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e]) }, e.prototype.resize = function () { var e = this; i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () { e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition() }, 50)) }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) { var o = this; if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1; o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit() }, e.prototype.setCSS = function (i) { var e, t, o = this, s = {}; !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s))) }, e.prototype.setDimensions = function () { var i = this; !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({ padding: "0px " + i.options.centerPadding }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({ padding: i.options.centerPadding + " 0px" })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length))); var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width(); !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e) }, e.prototype.setFade = function () { var e, t = this; t.$slides.each(function (o, s) { e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({ position: "relative", right: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) : i(s).css({ position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) }), t.$slides.eq(t.currentSlide).css({ zIndex: t.options.zIndex - 1, opacity: 1 }) }, e.prototype.setHeight = function () { var i = this; if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) { var e = i.$slides.eq(i.currentSlide).outerHeight(!0); i.$list.css("height", e) } }, e.prototype.setOption = e.prototype.slickSetOption = function () { var e, t, o, s, n, r = this, l = !1; if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s; else if ("multiple" === n) i.each(o, function (i, e) { r.options[i] = e }); else if ("responsive" === n) for (t in s) if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]]; else { for (e = r.options.responsive.length - 1; e >= 0;)r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--; r.options.responsive.push(s[t]) } l && (r.unload(), r.reinit()) }, e.prototype.setPosition = function () { var i = this; i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]) }, e.prototype.setProps = function () { var i = this, e = document.body.style; i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType }, e.prototype.setSlideClasses = function (i) { var e, t, o, s, n = this; if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) { var r = n.options.slidesToShow % 2 == 0 ? 1 : 0; e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center") } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")); "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad() }, e.prototype.setupInfinite = function () { var e, t, o, s = this; if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) { for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1)t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned"); for (e = 0; e < o + s.slideCount; e += 1)t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned"); s.$slideTrack.find(".slick-cloned").find("[id]").each(function () { i(this).attr("id", "") }) } }, e.prototype.interrupt = function (i) { var e = this; i || e.autoPlay(), e.interrupted = i }, e.prototype.selectHandler = function (e) { var t = this, o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"), s = parseInt(o.attr("data-slick-index")); s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s) }, e.prototype.slideHandler = function (i, e, t) { var o, s, n, r, l, d = null, a = this; if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i)) if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () { a.postSlide(o) }) : a.postSlide(o)); else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () { a.postSlide(o) }) : a.postSlide(o)); else { if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function () { a.postSlide(s) })) : a.postSlide(s), void a.animateHeight(); !0 !== t ? a.animateSlide(d, function () { a.postSlide(s) }) : a.postSlide(s) } }, e.prototype.startLoad = function () { var i = this; !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading") }, e.prototype.swipeDirection = function () { var i, e, t, o, s = this; return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical" }, e.prototype.swipeEnd = function (i) { var e, t, o = this; if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1; if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1; if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) { switch (t = o.swipeDirection()) { case "left": case "down": e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0; break; case "right": case "up": e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1 }"vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t])) } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {}) }, e.prototype.swipeHandler = function (i) { var e = this; if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) { case "start": e.swipeStart(i); break; case "move": e.swipeMove(i); break; case "end": e.swipeEnd(i) } }, e.prototype.swipeMove = function (i) { var e, t, o, s, n, r, l = this; return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft)))) }, e.prototype.swipeStart = function (i) { var e, t = this; if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1; void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0 }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () { var i = this; null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit()) }, e.prototype.unload = function () { var e = this; i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "") }, e.prototype.unslick = function (i) { var e = this; e.$slider.trigger("unslick", [e, i]), e.destroy() }, e.prototype.updateArrows = function () { var i = this; Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))) }, e.prototype.updateDots = function () { var i = this; null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active")) }, e.prototype.visibility = function () { var i = this; i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1) }, i.fn.slick = function () { var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length; for (i = 0; i < r; i++)if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t; return o } });

$(function () {
    var Auth = (function () {
        return {
            GetLink: function (username, password) {
                var url = "http://cypdss.integration-online.net/cruws/CRU.asmx";
                $.support.cors = true;
                $.ajax({
                    type: "GET",
                    url: url + "/AuthenticateIMCWUserScript",
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    data: "username='"
                        + username
                        + "'&password='"
                        + password
                        + "'&code='5ABDBD68-557A-AEBC-StP-B559-C43675D1B4E1'",
                    async: true,
                    crossDomain: true,
                    success: function (res) {
                        if (res.d) {
                            var d = res.d.split(';');
                            var popie = null;
                            //	var uri_dec = d[1];
                            var uri_dec = decodeURIComponent(d[1]);
                            //alert(uri_dec);
                            if (d[0] == '1') {
                                popie = window.open(uri_dec, 'kbi_popup');
                            }
                            if (d[0] == '2') {

                                popie = window.open(uri_dec, 'Integration_popup', 'width=680,height=700');
                            }
                            if (d[0] == '3') {
                                popie = window.open(uri_dec, 'Integration_popup', 'width=1300,height=700');
                                //alert("This site is currently down for maintenance and should be back online at 9:00 AM GMT. For further clarification, you may contact Arax Daneghians adaneghians@integration-imc.com");
                            }
								//if (d[
                            setTimeout(function () {
                                if (d[0] == '-1') {
                                    $(".showerror").show();
                                } else if (!popie || popie.outerHeight === 0) {
                                    $.get("templates/popup.html", function (data) {
                                        $("#dssModal").html(data).reveal();
                                        if (navigator.userAgent.match(/MSIE/) || navigator.userAgent.match(/Trident/)) {
                                            $("#ie").show();
                                        } else if (/chrome/.test(navigator.userAgent.toLowerCase())) {
                                            $("#chrome").show();
                                        }
                                    });
                                }
                            }, 500);
                        }
                        return res.d || res;
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });
            }
        };
    })();
    function doLogin() {
        var user = $('#login'), pass = $('#password');
        if (user.val() == '') {
          //  user.attr('style', 'border:1px solid red');
            return;
        } else {
            //user.attr('style', 'border:none');
        }
        if (pass.val() == '') {
            //pass.attr('style', 'border:1px solid red');
            return;
        } else {
           // pass.attr('style', 'border:none');
        }
        $('li.error').hide();
        debugger;
        Auth.GetLink(user.val(), pass.val());
    }




///#source 1 1 /assets/js/vendor/skroller.js
/*! skrollr 0.6.11 (2013-08-13) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(function (e, t, r) { "use strict"; function n(r) { if (o = t.documentElement, a = t.body, M(), ot = this, r = r || {}, ct = r.constants || {}, r.easing) for (var n in r.easing) U[n] = r.easing[n]; vt = r.edgeStrategy || "set", lt = { beforerender: r.beforerender, render: r.render }, st = r.forceHeight !== !1, st && (Ct = r.scale || 1), ft = r.mobileDeceleration || x, pt = r.smoothScrolling !== !1, gt = r.smoothScrollingDuration || A, mt = { targetTop: ot.getScrollTop() }, It = (r.mobileCheck || function () { return /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || e.opera) })(), It ? (it = t.getElementById("skrollr-body"), it && nt(), j(), kt(o, [y, S], [T])) : kt(o, [y, b], [T]), ot.refresh(), yt(e, "resize orientationchange", function () { var e = o.clientWidth, t = o.clientHeight; (t !== Ot || e !== zt) && (Ot = t, zt = e, Pt = !0) }); var i = R(); return function l() { X(), i(l) }(), ot } var o, a, i = e.skrollr = { get: function () { return ot }, init: function (e) { return ot || new n(e) }, VERSION: "0.6.11" }, l = Object.prototype.hasOwnProperty, s = e.Math, c = e.getComputedStyle, f = "touchstart", u = "touchmove", p = "touchcancel", g = "touchend", m = "skrollable", d = m + "-before", v = m + "-between", h = m + "-after", y = "skrollr", T = "no-" + y, b = y + "-desktop", S = y + "-mobile", k = "linear", w = 1e3, x = .004, A = 200, E = "start", F = "end", C = "center", D = "bottom", H = "___skrollable_id", V = /^\s+|\s+$/g, z = /^data(?:-(_\w+))?(?:-?(-?\d+))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/, O = /\s*([\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi, P = /^([a-z\-]+)\[(\w+)\]$/, q = /-([a-z])/g, I = function (e, t) { return t.toUpperCase() }, B = /[\-+]?[\d]*\.?[\d]+/g, _ = /\{\?\}/g, G = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g, L = /[a-z\-]+-gradient/g, N = "", $ = "", M = function () { var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/; if (c) { var t = c(a, null); for (var n in t) if (N = n.match(e) || +n == n && t[n].match(e)) break; if (!N) return N = $ = "", r; N = N[0], "-" === N.slice(0, 1) ? ($ = N, N = { "-webkit-": "webkit", "-moz-": "Moz", "-ms-": "ms", "-o-": "O" }[N]) : $ = "-" + N.toLowerCase() + "-" } }, R = function () { var t = e.requestAnimationFrame || e[N.toLowerCase() + "RequestAnimationFrame"], r = At(); return (It || !t) && (t = function (t) { var n = At() - r, o = s.max(0, 1e3 / 60 - n); e.setTimeout(function () { r = At(), t() }, o) }), t }, U = { begin: function () { return 0 }, end: function () { return 1 }, linear: function (e) { return e }, quadratic: function (e) { return e * e }, cubic: function (e) { return e * e * e }, swing: function (e) { return -s.cos(e * s.PI) / 2 + .5 }, sqrt: function (e) { return s.sqrt(e) }, outCubic: function (e) { return s.pow(e - 1, 3) + 1 }, bounce: function (e) { var t; if (.5083 >= e) t = 3; else if (.8489 >= e) t = 9; else if (.96208 >= e) t = 27; else { if (!(.99981 >= e)) return 1; t = 91 } return 1 - s.abs(3 * s.cos(1.028 * e * t) / t) } }; n.prototype.refresh = function (e) { var n, o, a = !1; for (e === r ? (a = !0, at = [], qt = 0, e = t.getElementsByTagName("*")) : e = [].concat(e), n = 0, o = e.length; o > n; n++) { var i = e[n], l = i, s = [], c = pt, f = vt; if (i.attributes) { for (var u = 0, p = i.attributes.length; p > u; u++) { var g = i.attributes[u]; if ("data-anchor-target" !== g.name) if ("data-smooth-scrolling" !== g.name) if ("data-edge-strategy" !== g.name) { var d = g.name.match(z); if (null !== d) { var v = d[1]; v = v && ct[v.substr(1)] || 0; var h = (0 | d[2]) + v, y = d[3], T = d[4] || y, b = { offset: h, props: g.value, element: i }; s.push(b), y && y !== E && y !== F ? (b.mode = "relative", b.anchors = [y, T]) : (b.mode = "absolute", y === F ? b.isEnd = !0 : (b.frame = h * Ct, delete b.offset)) } } else f = g.value; else c = "off" !== g.value; else if (l = t.querySelector(g.value), null === l) throw 'Unable to find anchor target "' + g.value + '"' } if (s.length) { var S, k, w; !a && H in i ? (w = i[H], S = at[w].styleAttr, k = at[w].classAttr) : (w = i[H] = qt++, S = i.style.cssText, k = St(i)), at[w] = { element: i, styleAttr: S, classAttr: k, anchorTarget: l, keyFrames: s, smoothScrolling: c, edgeStrategy: f }, kt(i, [m], []) } } } for (Tt(), n = 0, o = e.length; o > n; n++) { var x = at[e[n][H]]; x !== r && (Z(x), K(x)) } return ot }, n.prototype.relativeToAbsolute = function (e, t, r) { var n = o.clientHeight, a = e.getBoundingClientRect(), i = a.top, l = a.bottom - a.top; return t === D ? i -= n : t === C && (i -= n / 2), r === D ? i += l : r === C && (i += l / 2), i += ot.getScrollTop(), 0 | i + .5 }, n.prototype.animateTo = function (e, t) { t = t || {}; var n = At(), o = ot.getScrollTop(); return ut = { startTop: o, topDiff: e - o, targetTop: e, duration: t.duration || w, startTime: n, endTime: n + (t.duration || w), easing: U[t.easing || k], done: t.done }, ut.topDiff || (ut.done && ut.done.call(ot, !1), ut = r), ot }, n.prototype.stopAnimateTo = function () { ut && ut.done && ut.done.call(ot, !0), ut = r }, n.prototype.isAnimatingTo = function () { return !!ut }, n.prototype.setScrollTop = function (t, r) { return r === !0 && (Ht = t, dt = !0), It ? Bt = s.min(s.max(t, 0), Ft) : e.scrollTo(0, t), ot }, n.prototype.getScrollTop = function () { return It ? Bt : e.pageYOffset || o.scrollTop || a.scrollTop || 0 }, n.prototype.on = function (e, t) { return lt[e] = t, ot }, n.prototype.off = function (e) { return delete lt[e], ot }; var j = function () { var t, n, i, l, c, m, d, v, h, y, T; yt(o, [f, u, p, g].join(" "), function (e) { e.preventDefault(); var o = e.changedTouches[0]; switch (l = o.clientY, c = o.clientX, h = e.timeStamp, e.type) { case f: t && t.blur(), ot.stopAnimateTo(), t = e.target, n = m = l, i = c, v = h; break; case u: d = l - m, T = h - y, ot.setScrollTop(Bt - d, !0), m = l, y = h; break; default: case p: case g: var a = n - l, b = i - c, S = b * b + a * a; if (49 > S) return t.focus(), t.click(), r; t = r; var k = d / T; k = s.max(s.min(k, 3), -3); var w = s.abs(k / ft), x = k * w + .5 * ft * w * w, A = ot.getScrollTop() - x, E = 0; A > Ft ? (E = (Ft - A) / x, A = Ft) : 0 > A && (E = -A / x, A = 0), w *= 1 - E, ot.animateTo(A, { easing: "outCubic", duration: w }) } }), e.scrollTo(0, 0), o.style.overflow = a.style.overflow = "hidden" }, W = function () { var e, t, r, n, o, a, i, l, c; for (l = 0, c = at.length; c > l; l++) for (e = at[l], t = e.element, r = e.anchorTarget, n = e.keyFrames, o = 0, a = n.length; a > o; o++) i = n[o], "relative" === i.mode && (rt(t), i.frame = ot.relativeToAbsolute(r, i.anchors[0], i.anchors[1]) - i.offset, rt(t, !0)), st && !i.isEnd && i.frame > Ft && (Ft = i.frame); for (Ft = s.max(Ft, bt()), l = 0, c = at.length; c > l; l++) { for (e = at[l], n = e.keyFrames, o = 0, a = n.length; a > o; o++) i = n[o], i.isEnd && (i.frame = Ft - i.offset); e.keyFrames.sort(Et) } }, Y = function (e, t) { for (var r = 0, n = at.length; n > r; r++) { var o, a, s = at[r], c = s.element, f = s.smoothScrolling ? e : t, u = s.keyFrames, p = u[0].frame, g = u[u.length - 1].frame, y = p > f, T = f > g, b = u[y ? 0 : u.length - 1]; if (y || T) { if (y && -1 === s.edge || T && 1 === s.edge) continue; switch (kt(c, [y ? d : h], [d, v, h]), s.edge = y ? -1 : 1, s.edgeStrategy) { case "reset": rt(c); continue; case "ease": f = b.frame; break; default: case "set": var S = b.props; for (o in S) l.call(S, o) && (a = tt(S[o].value), i.setStyle(c, o, a)); continue } } else 0 !== s.edge && (kt(c, [m, v], [d, h]), s.edge = 0); for (var k = 0, w = u.length - 1; w > k; k++) if (f >= u[k].frame && u[k + 1].frame >= f) { var x = u[k], A = u[k + 1]; for (o in x.props) if (l.call(x.props, o)) { var E = (f - x.frame) / (A.frame - x.frame); E = x.props[o].easing(E), a = et(x.props[o].value, A.props[o].value, E), a = tt(a), i.setStyle(c, o, a) } break } } }, X = function () { Pt && (Pt = !1, Tt()); var e, t, n = ot.getScrollTop(), o = At(); if (ut) o >= ut.endTime ? (n = ut.targetTop, e = ut.done, ut = r) : (t = ut.easing((o - ut.startTime) / ut.duration), n = 0 | ut.startTop + t * ut.topDiff), ot.setScrollTop(n, !0); else if (!It) { var a = mt.targetTop - n; a && (mt = { startTop: Ht, topDiff: n - Ht, targetTop: n, startTime: Vt, endTime: Vt + gt }), mt.endTime >= o && (t = U.sqrt((o - mt.startTime) / gt), n = 0 | mt.startTop + t * mt.topDiff) } if (It && it && i.setStyle(it, "transform", "translate(0, " + -Bt + "px) " + ht), dt || Ht !== n) { Dt = n >= Ht ? "down" : "up", dt = !1; var l = { curTop: n, lastTop: Ht, maxTop: Ft, direction: Dt }, s = lt.beforerender && lt.beforerender.call(ot, l); s !== !1 && (Y(n, ot.getScrollTop()), Ht = n, lt.render && lt.render.call(ot, l)), e && e.call(ot, !1) } Vt = o }, Z = function (e) { for (var t = 0, r = e.keyFrames.length; r > t; t++) { for (var n, o, a, i, l = e.keyFrames[t], s = {}; null !== (i = O.exec(l.props)) ;) a = i[1], o = i[2], n = a.match(P), null !== n ? (a = n[1], n = n[2]) : n = k, o = o.indexOf("!") ? J(o) : [o.slice(1)], s[a] = { value: o, easing: U[n] }; l.props = s } }, J = function (e) { var t = []; return G.lastIndex = 0, e = e.replace(G, function (e) { return e.replace(B, function (e) { return 100 * (e / 255) + "%" }) }), $ && (L.lastIndex = 0, e = e.replace(L, function (e) { return $ + e })), e = e.replace(B, function (e) { return t.push(+e), "{?}" }), t.unshift(e), t }, K = function (e) { var t, r, n = {}; for (t = 0, r = e.keyFrames.length; r > t; t++) Q(e.keyFrames[t], n); for (n = {}, t = e.keyFrames.length - 1; t >= 0; t--) Q(e.keyFrames[t], n) }, Q = function (e, t) { var r; for (r in t) l.call(e.props, r) || (e.props[r] = t[r]); for (r in e.props) t[r] = e.props[r] }, et = function (e, t, r) { var n, o = e.length; if (o !== t.length) throw "Can't interpolate between \"" + e[0] + '" and "' + t[0] + '"'; var a = [e[0]]; for (n = 1; o > n; n++) a[n] = e[n] + (t[n] - e[n]) * r; return a }, tt = function (e) { var t = 1; return _.lastIndex = 0, e[0].replace(_, function () { return e[t++] }) }, rt = function (e, t) { e = [].concat(e); for (var r, n, o = 0, a = e.length; a > o; o++) n = e[o], r = at[n[H]], r && (t ? (n.style.cssText = r.dirtyStyleAttr, kt(n, r.dirtyClassAttr)) : (r.dirtyStyleAttr = n.style.cssText, r.dirtyClassAttr = St(n), n.style.cssText = r.styleAttr, kt(n, r.classAttr))) }, nt = function () { ht = "translateZ(0)", i.setStyle(it, "transform", ht); var e = c(it), t = e.getPropertyValue("transform"), r = e.getPropertyValue($ + "transform"), n = t && "none" !== t || r && "none" !== r; n || (ht = "") }; i.setStyle = function (e, t, r) { var n = e.style; if (t = t.replace(q, I).replace("-", ""), "zIndex" === t) n[t] = "" + (0 | r); else if ("float" === t) n.styleFloat = n.cssFloat = r; else try { N && (n[N + t.slice(0, 1).toUpperCase() + t.slice(1)] = r), n[t] = r } catch (o) { } }; var ot, at, it, lt, st, ct, ft, ut, pt, gt, mt, dt, vt, ht, yt = i.addEvent = function (t, r, n) { var o = function (t) { return t = t || e.event, t.target || (t.target = t.srcElement), t.preventDefault || (t.preventDefault = function () { t.returnValue = !1 }), n.call(this, t) }; r = r.split(" "); for (var a = 0, i = r.length; i > a; a++) t.addEventListener ? t.addEventListener(r[a], n, !1) : t.attachEvent("on" + r[a], o) }, Tt = function () { var e = ot.getScrollTop(); Ft = 0, st && !It && (a.style.height = "auto"), W(), st && !It && (a.style.height = Ft + o.clientHeight + "px"), It ? ot.setScrollTop(s.min(ot.getScrollTop(), Ft)) : ot.setScrollTop(e, !0), dt = !0 }, bt = function () { var e = it && it.offsetHeight || 0, t = s.max(e, a.scrollHeight, a.offsetHeight, o.scrollHeight, o.offsetHeight, o.clientHeight); return t - o.clientHeight }, St = function (t) { var r = "className"; return e.SVGElement && t instanceof e.SVGElement && (t = t[r], r = "baseVal"), t[r] }, kt = function (t, n, o) { var a = "className"; if (e.SVGElement && t instanceof e.SVGElement && (t = t[a], a = "baseVal"), o === r) return t[a] = n, r; for (var i = t[a], l = 0, s = o.length; s > l; l++) i = xt(i).replace(xt(o[l]), " "); i = wt(i); for (var c = 0, f = n.length; f > c; c++) -1 === xt(i).indexOf(xt(n[c])) && (i += " " + n[c]); t[a] = wt(i) }, wt = function (e) { return e.replace(V, "") }, xt = function (e) { return " " + e + " " }, At = Date.now || function () { return +new Date }, Et = function (e, t) { return e.frame - t.frame }, Ft = 0, Ct = 1, Dt = "down", Ht = -1, Vt = At(), zt = 0, Ot = 0, Pt = !1, qt = 0, It = !1, Bt = 0 })(window, document);
///#source 1 1 /assets/js/main.js
function filterPath(string) {
    return string
    .replace(/^\//, '')
    .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
    .replace(/\/$/, '');
}

function BrandrecaptchaCallback() {
    $(".BrandcontactusBtn").attr("disabled", false);
    $(".BrandcontactusBtn").css("cursor", "pointer");
}

$(function () {
    var stickIn = false, $menu = $("#menu"), $window = $(window), $header = $("header"), $indicator = $("section > .indicator"), $lazyload = $(".lazyload"), lazyloaded = false, sopen = false, imt, talkTop;
    $indicator.addClass("active").click(function () {
        $('html, body').animate({ scrollTop: $(this).closest("section").next("section").offset().top }, { duration: 1100, queue: false });
    });
   

    //if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
    //    var s = skrollr.init({
    //        forceHeight: false,
    //        smoothScrolling: true
    //    });
    //} else {
    //    $(".card").addClass("skrollable-between");
    //}

    $(".navigation-bullets li a").on("click", (function (event) {
        $('.navigation-bullets li').removeClass();
        $(this).parent().addClass('current');
    }));
    $(".newsroomListing").mCustomScrollbar();
    $(".resourceItem").slice(0, 3).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".resourceItem:hidden").slice(0, 3).slideDown();
        if ($(".resourceItem:hidden").length == 0) {
            $("#loadMore").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top - 500
        }, 1500);
    });
    
    // $(".resourceItem").slice(0, 3).show();
    // var i = 3;
    // $("#loadMore").click(function(e){
    //     var number = i + 3;
    //     e.preventDefault();
    //     $(".resourceItem").slice(0, number).slideDown();
    //     $('html,body').animate({
    //         scrollTop: $(this).offset().top + (i * 100)
    //     }, 1500);
    //     i += 3;
    // });     
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 80
                }, 500);
                return false;
            }
        }
    });
//<a href="#someOtherElementID"> Go to Other Element Smoothly </a>
    $(".PlusMore").bind('click', function (event) {
        event.preventDefault();
        var item = $(this);
        item.html(item.html() == "-" ? '+' : '-');
        $(item).parent().next(".collapse").collapse(item.html() == "-" ? 'show' : 'hide');
    });
    $("body > section > div").css({ "min-height": $(window).height() });
    $("body > section > div .FullHeightRow").css({ "height": $(window).height() });
    $("#Mission > div").css({ "min-height": "auto" });
    $("#Resources > div").css({ "min-height": "auto" });
    $("#Contact > div").css({ "min-height": "auto" });

    ////$("#Footprint > div").css({ "min-height": $(window).height(), "height": $(window).height() });

    if ($window.height() < 700) {
        $indicator.css({ bottom: (700 - $window.height() + 18), opacity: "0.3" });
    }

    if (isMobile.any()) {
        $("#Mission > div").css({ "min-height": $(window).height() });
        $("#Contact > div").css({ "min-height": $(window).height() });
        $(".navigation-bullets").hide();
    }
    var tickerheight = -58;
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };
    var dateOptions, alreadyPopulated = false;
    $(function () {
        $('.navigation-bullets li:eq(0) a').click(function () {
            $('html, body').animate({
                scrollTop: $("#technology").offset().top + tickerheight
            }, 1000);
        });

        $('#page1, .navigation-bullets li:eq(1) a').click(function () {
            $('html, body').animate({
                scrollTop: $("#better-marketing").offset().top + tickerheight
            }, 1000);
        });

        $('#page2, .navigation-bullets li:eq(2) a').click(function () {
            $('html, body').animate({
                scrollTop: $("#system-ready").offset().top + tickerheight
            }, 1000);
        });

        $('#page5, .navigation-bullets li:eq(3) a').click(function () {
            $('html, body').animate({
                scrollTop: $("#form-container").offset().top + tickerheight
            }, 1000);
        });

        $('#technology').waypoint(function (direction) {
            $('.navigation-bullets li').removeClass();
            $('.navigation-bullets li:first').addClass('current');
        }, { offset: -600 });

        $('#better-marketing').waypoint(function (direction) {
            $('.navigation-bullets li').removeClass();
            $('.navigation-bullets li:eq(1)').addClass('current');
        }, { offset: 100 });

        $('#system-ready').waypoint(function (direction) {
            $('.navigation-bullets li').removeClass();
            $('.navigation-bullets li:eq(2)').addClass('current');
        }, { offset: 200 });

        $('#form-container').waypoint(function (direction) {
            $('.navigation-bullets li').removeClass();
            $('.navigation-bullets li:eq(3)').addClass('current');
        }, { offset: 200 });

        $('#better-marketing').waypoint(function (up) {
            $('.navigation-bullets li').removeClass();
            $('.navigation-bullets li:eq(1)').addClass('current');
        }, { offset: -100 });

        $('#system-ready').waypoint(function (up) {
            $('.navigation-bullets li').removeClass();
            $('.navigation-bullets li:eq(2)').addClass('current');
        }, { offset: -100 });

        $('#form-container').waypoint(function (up) {
            $('.navigation-bullets li').removeClass();
            $('.navigation-bullets li:eq(3)').addClass('current');
        }, { offset: -100 });

        $('.navigation-bullets li a').hover(function () {
            $('.navigation-bullets-tooltip').css({
                'opacity': '0',
                'filter': 'alpha(opacity=0)',
                '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
            });
            $(this).find('.navigation-bullets-tooltip').animate({
                'opacity': '1',
                'filter': 'alpha(opacity=100)',
                '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
            }, { queue: false, duration: 0 });
        }, function () {
            $('.navigation-bullets-tooltip').css({
                'opacity': '0',
                'filter': 'alpha(opacity=0)',
                '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
            });
        });

        var leftVal = 0;
        var slideWidth = $('.marketing-container').width();
        var numberOfSlides = $('.marketing-container').size();
        var sliderCount = 1;
        $('.marketing-slider-container').css({
            'width': slideWidth + numberOfSlides + 'px'
        });
        $('.next').bind('click', function (event) {
            event.preventDefault();
            if (numberOfSlides > sliderCount) {
                $('.prevDisabled').removeClass().addClass('prev');
                leftVal = leftVal + slideWidth;
                //$('.marketing-container').addClass('selected');
                $('.marketing-container').animate({
                    'left': -leftVal + 'px'
                }, 700);
                sliderCount++;

                if (sliderCount >= 2) {
                    $('.next').click(function () {
                        setTimeout(function () {
                            $('.marketing-container').removeClass("selected");
                            $('.marketing-container.step-3').addClass("selected");
                            $('.marketing-step-3-people .ceo').animate({
                                'opacity': '1',
                                'filter': 'alpha(opacity=100)',
                                '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                            }, 800);
                        }, 1000);

                        setTimeout(function () {
                            $('.marketing-step-3-people .cmo').animate({
                                'opacity': '1',
                                'filter': 'alpha(opacity=100)',
                                '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                            }, 800);
                        }, 1600);

                        setTimeout(function () {
                            $('.marketing-step-3-people .cfo').animate({
                                'opacity': '1',
                                'filter': 'alpha(opacity=100)',
                                '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                            }, 800);
                        }, 2000);

                        setTimeout(function () {
                            $('.marketing-step-3-people .global-experts').animate({
                                'opacity': '1',
                                'filter': 'alpha(opacity=100)',
                                '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                            }, 800);
                        }, 2400);

                        setTimeout(function () {
                            $('.marketing-step-3-people .local-marketeers').animate({
                                'opacity': '1',
                                'filter': 'alpha(opacity=100)',
                                '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                            }, 800);
                        }, 3000);

                    });
                }
                if (sliderCount == 1) {
                    $('.marketing-container').removeClass("selected");
                    $('.marketing-container.step-1').addClass("selected");
                    $('.step-description span').fadeOut(1);
                    $('.step-description span').fadeIn(400).html('Effective');
                }
                if (sliderCount == 2) {
                    $('.marketing-container').removeClass("selected");
                    $('.marketing-container.step-2').addClass("selected");
                    $('.step-description span').fadeOut(1);
                    $('.step-description span').fadeIn(400).html('Efficient');
                }
                if (sliderCount == 3) {
                    $('.step-description span').fadeOut(1);
                    $('.step-description span').fadeIn(400).html('Accountable');
                }
            }
            $('.marketing-current-step .active').fadeOut(1);
            $('.marketing-current-step .active').fadeIn(400).html(sliderCount);

            if (numberOfSlides == sliderCount) {
                $('.next').removeClass().addClass('nextDisabled');
            }
        });
   
        $('.prev').bind('click', function (event) {
            event.preventDefault();
            if (sliderCount > 1) {
                leftVal = leftVal - slideWidth;
                $('.marketing-container').animate({
                    'left': -leftVal + 'px'
                }, 700);
                sliderCount--;
            }
         
            $('.marketing-current-step .active').fadeOut(1);
            $('.marketing-current-step .active').fadeIn(400).html(sliderCount);
            if (sliderCount == 1) {
                $('.prev').removeClass().addClass('prevDisabled');
            }

            if (sliderCount <= numberOfSlides) {
                $('.nextDisabled').removeClass().addClass('next');
            }
            if (sliderCount == 2) {
                $('.step-description span').fadeOut(1);
                $('.step-description span').fadeIn(400).html('Efficient');
                $('.marketing-container').removeClass("selected");
                $('.marketing-container.step-2').addClass("selected");
            }
            if (sliderCount == 1) {
                $('.step-description span').fadeOut(1);
                $('.step-description span').fadeIn(400).html('Effective');
                $('.marketing-container').removeClass("selected");
                $('.marketing-container.step-1').addClass("selected");
            }
        });

        if (sliderCount == 1) { $('.prev').removeClass().addClass('prevDisabled'); }
        betterMarketingStep1();
        $('#better-marketing').waypoint(function (direction) { betterMarketingStep1(); }, { offset: 600 });
        $('.next').click(function () { betterMarketingStep2(); });
  
        var data1 = [10, 10, 25, 15, 35, 25],
            data2 = [5, 15, 25, 10, 15, 30],
            data3 = [25, 35, 5, 10, 15, 10],
            data4 = [10, 5, 35, 15, 10, 25],
            data5 = [10, 10, 25, 15, 35, 25],
            data = data1;
        var w = 305,
            h = 285,
            r = Math.min(w, h) / 2,
            color = d3.scale.ordinal().range(["#D7213D", "#B5D378", "#FFCC33", "#70AEAF", "#8A8ACB", "#73B6E5"]),
            donut = d3.layout.pie().sort(null),
            arc = d3.svg.arc().innerRadius(r - 75).outerRadius(r - 20);
        var svg = d3.select("#marketing-step-2-donut-chart").append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
        var arcs = svg.selectAll("path")
            .data(donut(data))
            .enter().append("svg:path")
            .attr("fill", function (d, i) { return color(i); })
            .attr("d", arc)
            .each(function (d) { this._current = d; });
        d3.select(".next").on("click", function () {
            setTimeout(function () {
                data = data1;
                arcs = arcs.data(donut(data));
                arcs.transition().duration(750).attrTween("d", arcTween);
            }, 2000);
            setTimeout(function () {
                data = data2;
                arcs = arcs.data(donut(data));
                arcs.transition().duration(750).attrTween("d", arcTween);
            }, 4000);
            setTimeout(function () {
                data = data3;
                arcs = arcs.data(donut(data));
                arcs.transition().duration(750).attrTween("d", arcTween);
            }, 6000);
            setTimeout(function () {
                data = data4;
                arcs = arcs.data(donut(data));
                arcs.transition().duration(750).attrTween("d", arcTween);
            }, 8000);
            setTimeout(function () {
                data = data5;
                arcs = arcs.data(donut(data));
                arcs.transition().duration(750).attrTween("d", arcTween);
            }, 10000);

        });
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function (t) {
                return arc(i(t));
            };
        }
        function betterMarketingStep1() {
            setTimeout(function () {
                $('.marketing-step-1-chart-path').animate({
                    'width': ($(window).width() > 640 ? '400px' : '300px')
                }, 4800);
            }, 1500);
            setTimeout(function () {
                $('li.first-column .green-dot').animate({
                    'opacity': '1',
                    'bottom': '116px',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);

            }, 1000);
            setTimeout(function () {
                $('li.second-column .green-dot').animate({
                    'opacity': '1',
                    'bottom': '133px',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 1500);
            setTimeout(function () {
                $('li.third-column .green-dot').animate({
                    'opacity': '1',
                    'bottom': '145px',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 1700);
            setTimeout(function () {
                $('li.fourth-column .green-dot').animate({
                    'opacity': '1',
                    'bottom': '154px',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 1900);
            setTimeout(function () {
                $('li.fifth-column .green-dot').animate({
                    'opacity': '1',
                    'bottom': '170px',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 2100);
            setTimeout(function () {
                $('li.sixth-column .green-dot').animate({
                    'opacity': '1',
                    'bottom': '165px',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 2300);
            setTimeout(function () {
                $('li.seventh-column .green-dot').animate({
                    'opacity': '1',
                    'bottom': '180px',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 2500);
            setTimeout(function () {
                $('li.first-column .column-bg').animate({
                    'height': '91px'
                }, 600);
            }, 1800);
            setTimeout(function () {
                $('li.second-column .column-bg').animate({
                    'height': '106px'
                }, 600);
            }, 2100);
            setTimeout(function () {
                $('li.third-column .column-bg').animate({
                    'height': '111px'
                }, 600);
            }, 2400);
            setTimeout(function () {
                $('li.fourth-column .column-bg').animate({
                    'height': '120px'
                }, 600);
            }, 2700);
            setTimeout(function () {
                $('li.fifth-column .column-bg').animate({
                    'height': '132px'
                }, 600);
            }, 3000);
            setTimeout(function () {
                $('li.sixth-column .column-bg').animate({
                    'height': '127px'
                }, 600);
            }, 3300);
            setTimeout(function () {
                $('li.seventh-column .column-bg').animate({
                    'height': '152px'
                }, 600);
            }, 3600);
            setTimeout(function () {
                $('.marketing-step-1-chart-legend span').animate({
                    'opacity': '1',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 3800);
        }
        function betterMarketingStep2() {
            setTimeout(function () {
                $('.marketing-step-2-donut-chart-legend ul li.mass-media').animate({
                    'opacity': '1',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 1200);
            setTimeout(function () {
                $('.marketing-step-2-donut-chart-legend ul li.indirect').animate({
                    'opacity': '1',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 1400);
            setTimeout(function () {
                $('.marketing-step-2-donut-chart-legend ul li.digital').animate({
                    'opacity': '1',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 1600);
            setTimeout(function () {
                $('.marketing-step-2-donut-chart-legend ul li.sponsorship').animate({
                    'opacity': '1',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 1800);
            setTimeout(function () {
                $('.marketing-step-2-donut-chart-legend ul li.point-of-purchase').animate({
                    'opacity': '1',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 2000);
            setTimeout(function () {
                $('.marketing-step-2-donut-chart-legend ul li.direct-contacts').animate({
                    'opacity': '1',
                    'filter': 'alpha(opacity=100)',
                    '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
                }, 800);
            }, 2200);
        }

        var hash = window.location.hash;
        setTimeout(function () {
            switch (hash) {
                case "#mcasystem":
                    $("#quicklookModal").reveal();
                    break;
                case "#marketing":
                    $('html, body').animate({
                        scrollTop: $("#better-marketing").offset().top + tickerheight
                    }, 1000);
                    break;
                case "#system":
                    $('html, body').animate({
                        scrollTop: $("#system-ready").offset().top + tickerheight
                    }, 1000);
                    break;
                case "#talk":
                    $('html, body').animate({
                        scrollTop: $("#form-container").offset().top + tickerheight
                    }, 1000);
                    break;
            }
        }, 300);


        var isMobile = {
            Android: function () { return navigator.userAgent.match(/Android/i); },
            BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
            iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
            Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
            Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
            any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
        };

        var validator = $("#contactform").validate({
            errorClass: "error",
            success: function (label) {
                label.parent().removeClass().addClass('valid');
            },
            error: function (label) {
                label.parent().removeClass().addClass('error');
            },
            invalidHandler: function (e, validator) {
                $('.form-row label').not(".novld").removeClass().addClass('error');
            },
            onkeyup: false,
            onsubmit: true,
            messages: {},
            errorPlacement: function (error, element) {
                element.parent().removeClass().addClass('error');
                error.appendTo(element.parent());
            },
            errorElement: "span",
            submitHandler: function (form) {
                $("#submit").attr("disabled", "disabled");
                var Contact = (function () {
                    return {
                        GetLink: function (validator) {
                            var url = "https://cypdss.integration-online.net/cruws/CRU.asmx", fielddata = "";
                            $.support.cors = true;
                            for (var inp in validator.successList) {
                                fielddata = fielddata + "&" + validator.successList[inp].name + "='" + validator.successList[inp].value + "'";
                            }
                            var request = $.ajax({
                                type: "GET",
                                url: url + "/IMCWContactUsScript_New",
                                contentType: "application/json; charset=utf-8",
                                dataType: "jsonp",
                                data: fielddata + "&code='5ABDBD68-557A-AEBC-StP-B559-C43675D1B4E1'",
                                async: true,
                                crossDomain: true,
                                success: function (res) {
                                    if (res.d) { $("#contactMessageSentModal").reveal(); }
                                    else { $("#contactMessageNotSentModal").reveal(); }
                                    return res.d || res;
                                },
                                error: function (xhr, status, error) {
                                    $("#submit").attr("disabled", "");
                                    alert(error);
                                }
                            });
                        }
                    };
                })();
                Contact.GetLink(validator);
            }
        });
        //enter keypress event
        $("#emailContainer").bind('keypress', function (e) {
            if (e.keyCode == 13) {
                $("#emailError").attr('style', 'display:none');
                if ($("#emailContainer").val().indexOf("gmail") != -1 || $("#emailContainer").val().indexOf("yahoo") != -1 || $("#emailContainer").val().indexOf("hotmail") != -1) {
                    $("#emailError").attr('style', 'display:block');
                    $("#emailError").text("*Only corporate emails accepted.Kindly contact us above if needed.");
                }
                else if (isValidEmailAddress($("#emailContainer").val())) {
                    $("#emailContainer").blur();
                    sendEmail();
                } else {
                    $("#emailError").attr('style', 'display:block');
                }
                e.preventDefault();
            }
        });

        $("#sendEmail").bind('click', function (e) {

            $("#emailError").attr('style', 'display:none');
            if ($("#emailContainer").val().indexOf("gmail") != -1 || $("#emailContainer").val().indexOf("yahoo") != -1 || $("#emailContainer").val().indexOf("hotmail") != -1) {
                $("#emailError").attr('style', 'display:block');
                $("#emailError").text("*Only corporate emails accepted.Kindly contact us above if needed.");
            }
            else if (isValidEmailAddress($("#emailContainer").val())) {
                sendEmail();
            } else {
                $("#emailError").attr('style', 'display:block');
            }
        });
    });

    function sendEmail() {
        debugger;
        $("#sendingFile").attr('style', 'display:block');
        $.ajax({
            type: 'POST',
            url: 'php/SendEmail.aspx?email=' + $("#emailContainer").val(),
            success: function (data) {
                debugger;
                $("#emailContainer").val("");
                $("#successDownloadModal").reveal();
                $("#sendingFile").attr('style', 'display:none');
            },

            error: function (xhr, status, error) {
                debugger;
                $("#unsuccessDownloadModal").reveal();
            }
        });
    }






    $window.scroll(function () {
        var Limits = window.location.href.indexOf("index") == -1 ? $window.height() - 120 : 125;
        var scroll = $window.scrollTop();
        if (scroll > $window.height() - Limits && !stickIn) {
            stickIn = true;
            $header.addClass("sticky");
        } else if (scroll <= $window.height() - Limits) {
            stickIn = false;
            $header.removeClass("sticky");
        }
    }).resize(function () {
        if ($(window).width() < 979) {
            $(".middle .span3").hide();
            $(".middle .span9").removeClass("span9").addClass("span12");
        } else {
            $(".middle .span3").show();
            $(".middle .span12").removeClass("span12").addClass("span9");
        }
    }).resize();

    $('.navigation-bullets li a').hover(function () {
        $('.navigation-bullets-tooltip').css({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        });
        $(this).find('.navigation-bullets-tooltip').animate({
            'opacity': '1',
            'filter': 'alpha(opacity=100)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=100) "'
        }, { queue: false, duration: 0 });
    }, function () {
        $('.navigation-bullets-tooltip').css({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        });
    });

    $('.login-button').click(function (event) {
        event.stopPropagation();
        event.preventDefault();
        doLogin();
        //$(".showerror").css({ "display": "none" });
        //if ($("#login").val() == "DGC-InSites" && $("#password").val() == "DGC@iC20") {
        //    window.open("http://cypdss.integration-online.net/Home/Login.aspx?username=DGC-InSites&password=DGC@iC20");
        //} else {
        //    $(".showerror").css({"display": "block"});
        //}
    });

    $('.contentLink').click(function() {
        $('.hiddenContent').show();
    });
    $('.hiddenContent .closeIcon').click(function() {
        $('.hiddenContent').hide();
    });

    // $('.videoLink').click(function(e) {
    //     $('.iframePopup').show();
    //     $('body').addClass('iframeMode')
    //     e.preventDefault();
    
    // });
    // if ($('body').hasClass('iframeMode')) {
     
    //     $('*').on('click', function (e) {
    //         alert('1')
    //         if (!$(e.target).is('.iframePopup, .iframePopup *')) {
    //             $('body').removeClass('iframeMode')
    //             $('.iframePopup').hide();
    //         }
    //     });
    // }
    $('#videoModal').on('hide.bs.modal', function(e) {    
        var $if = $(e.delegateTarget).find('iframe');
        var src = $if.attr("src");
        $if.attr("src", '/empty.html');
        $if.attr("src", src);
    });
    /**end Changes begin */
    $('a[data-href]').on("click", (function (event) {
        var $this = $(this), target = $this.data("href");
     
        //if (sopen) {
        //    close($(".open").find(".close"), event, false);
        // }
        $("nav").removeClass("open");
        if (target) {
            event.preventDefault();
            var targetOffset = 0;
            switch (target) {
                case "#FlashNew":
                targetOffset = 0;
                $(".FlashContent").fadeIn();
                break;
                case "#flash":
                targetOffset = 0;
                break;
                case "#Products":
                targetOffset = $("#Products").offset().top;
                break;
                case "#Mission":
                targetOffset = $("#Mission").offset().top;
                break;
                case "#Footprint":
                targetOffset = $("#Footprint").offset().top;
                break;
                case "#Resources":
                targetOffset = $("#Resources").offset().top;
                break;
                case "#Team":
                targetOffset = $("#Team").offset().top;
                break;
                case "#Contact":
                targetOffset = $("#Contact").offset().top;
                break;
            }
            if (!$menu.is(":hidden")) {
                targetOffset = targetOffset - 60;
                $menu.click();
            } else {
                targetOffset = targetOffset - $("header").height();
            }
            $('html, body').animate({ scrollTop: targetOffset }, { duration: 500, queue: false });
        }
    }));

    //$(document).ready(function () {

      
    //    //window.location = '#';
    //    //window.scrollTo(0, 0);
    //    checkCookie();

    //    $(".btn-close-main").on("click", function (event) {
    //        SetNewCookie();
    //    });

    //});

    var hash = window.location.hash;
    setTimeout(function () {
        $("a[data-href='" + hash + "']").click();
    }, 300);

    $(".highlight").on({
        mouseover: function () {
            $(".toh").addClass("tohoff");
            $("#" + $(this).data("hs")).removeClass("tohoff").addClass("tohon");
        },
        mouseout: function () {
            $(".toh").removeClass("tohon tohoff");
        },
    });

    $("#interest").on('change', function () {
        var $this = $(this);
        if ($this.val() == "Applying for a job") {
            $("#cv").slideDown();
        } else {
            $("#cv").slideUp();
        }
    });

    $.fn.getHelp = function () { return this.siblings(".help-inline"); };

    $("#send").on("click", function (event) {
        event.preventDefault();

        var name = $("#name"), email = $("#email"), msg = $("#msg"), dirty = false;
        if (msg.val() == "") {
            msg.getHelp().show();
            dirty = true;
        } else {
            msg.getHelp().hide();
        }
        if ($("#name").val() == "") {
            name.getHelp().show();
            dirty = true;
        } else {
            name.getHelp().hide();
        }
        if (email.val() == "") {
            email.getHelp().show().html("Email is required");
            dirty = true;
        } else {
            var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!re.test(email.val())) {
                email.getHelp().show().html("Email should be valid");
                dirty = true;
            }
            else {
                email.getHelp().hide();
            }
        }
        var file = $("#file");
        if (!$("#cv").is(":hidden") && file.val() == "") {
            file.getHelp().show();
            dirty = true;
        }
        else {
            file.getHelp().hide();
        }
        if (!dirty) {

            var response = grecaptcha.getResponse();
            var recaptcha = $(".g-recaptcha");
            if (response.length == 0) {
                recaptcha.getHelp().show();
                return false;
            }
            recaptcha.getHelp().hide();

            $("#cvform").submit();
            $(this).hide();
            $("#thanks").show().click(function () {
                $(this).hide();
                $("#send").show();
            });
        }
    });

    $(".card").on("click", function (event) {
        var ths = $(this), href = ths.find(".btn").attr("href"), open = $(".open"), middle = $(href), minh = middle.css("minHeight");
        if (open.length > 0) {
            open.css({ minHeight: 0, height: open.css("minHeight") }).slideUp(function () {
                $(this).removeClass("open").css({ minHeight: "", height: "" });
                $(".middle, #demo .arrow").hide();
                ths.next(".arrow").show();
                middle.addClass("open").css({ minHeight: 0, height: minh }).slideDown(function () {
                    $(this).css({ minHeight: "", height: "" });

                });
            });
        } else {
            $(".middle, #demo .arrow").hide();
            ths.next(".arrow").show();
            middle.addClass("open").css({ minHeight: 0, height: minh }).slideDown(function () {
                $(this).css({ minHeight: "", height: "" });
            });
            if ($window.width() < 767) {
                $(".demo-cards").hide();
                $('html, body').animate({ scrollTop: $("#demo").offset().top - 40 }, { duration: 500, queue: false });
            } else {
                var i = $("#demo").animate({ height: $(window).height() + 600 })
                .find(".inner-section");
                imt = i.css("margin-top");
                i.animate({ marginTop: -700 });
                var talk = $("#talk");
                talkTop = talk.offset().top;
                talk.animate({ top: talkTop + 600 });
                $('html, body').animate({ scrollTop: $(".open").offset().top - 100 }, { duration: 500, queue: false });
            }
        }
        middle.find("li:first").click();
        sopen = true;
        event.preventDefault();
    });
    $(".close").on("click", function (event) {
        return close($(this), event, true);
    });
    function close(cl, event, scroll) {
        cl.closest(".middle").removeClass("open").slideUp(function () { $(".middle, #demo .arrow").hide(); });
        event.preventDefault();
        $(".demo-cards").show();
        if ($window.width() < 767) {
            $(".demo-cards").show();
        } else {
            $("#demo").animate({ height: "100%" });
            $("#demo .inner-section").animate({ marginTop: imt });
            $("#talk").animate({ top: talkTop });
        }
        sopen = false;
        if (scroll) {
            //$('html, body').animate({ scrollTop: $("#demo").offset().top }, { duration: 500, queue: false });
        }
    }
    $(".tools li").on("click", function (event) {
        var ths = $(this), app = ths.find("a").data("app"), section = ths.closest("ul").data("section");
        ths.parent().find(".active").removeClass("active");
        ths.addClass("active");
        $("." + app).removeClass("hidden");
        loadGallery(section, app, $("#gallery-" + section));
        event.preventDefault();
        event.stopPropagation();
    });
    $("#menu").on("click", function (e) {
        $("nav").toggleClass("open");
    });
    $("nav ul li a").on("click", function (e) {
        $("nav").removeClass("open");
    });
    $("#map").on("click", function (e) {
        var ths = $("#map-row"), m = $("#mapopen");
        if (!m.attr("src")) {
            m.attr("src", m.data("src"));
        }
        ths.fadeIn();
        e.stopPropagation();
        $('html, body').animate({ scrollTop: ths.offset().top }, { duration: 500, queue: false });
        $(document).one("click", function () {
            ths.fadeOut();
        });
        $("#closemap").one("click", function (event) {
            ths.fadeOut();
            event.stopPropagation();
        });
    });
    $(".BoxPeopleIcon").bind('click', function (event) {
        event.preventDefault();
        var item = $(this);
        item.toggleClass("IconLess");
        $(item).parent().parent().find(".collapse").collapse(item.hasClass("IconLess") ? 'show' : 'hide');
    });
    $(".sliderTestimonial").slick({
        autoplay: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                infinite: true
            }
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 1,
                arrows: false,
                dots: true
            }

        }, {

            breakpoint: 300,
            settings: "unslick" // destroys slick

        }]
    });
    $('.companyLogo div').matchHeight();
    $(".companyLogo").slick({
        autoplay: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        centerPadding: '20px',
        margin: 20,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                infinite: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                dots: true
            }

        }, {

            breakpoint: 300,
            settings: "unslick" // destroys slick

        }]
    });


    setTimeout(function () {
        switch (window.location.hash) {
            case "#apply":
            $("#interest").val("Applying for a job").trigger("change");
            $('html, body').animate({ scrollTop: touch }, { duration: 500, queue: false });
            break;
            case "#downloadResource":
            var targetOffset = $("#Resources").offset().top;
            $('html, body').animate({ scrollTop: targetOffset }, { duration: 500, queue: false });
            $("#downloadResource").modal("show");
        }
    }, 300);


    $(".loadMore").on("click", function (event) {
        var Parent = $(this).parents(".row-fluid");
        $(".DetailsFaq").hide();
        Parent.find(".DetailsFaq").css({ "position": "absolute", "top": $(this).parent().parent().position().top + $(this).parent().parent().parent().position().top });
        Parent.find(".DetailsFaq").find(".panel-Faq-Header").html($(this).parent().parent().find(".panel-Faq-Header").html());
        Parent.find(".DetailsFaq").find(".panel-Faq-BodyLarge").html($(this).parent().parent().find(".panel-Faq-Body").html());
        Parent.find(".DetailsFaq").fadeIn();
    });

    $(".panel-Faq-Close").on("click", function (event) {
        $(".DetailsFaq").fadeOut();
    });
    $('.boardMember').matchHeight
});

var isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    //any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
    any: function () { return ((/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))) }
}


$("#sendEmail").bind('click', function (e) {
    sendEmail();
});

function isValidEmail(s) {
   var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   return (re.test(s));
}

var BlockedDomain = ["Hotmail", "Outlook", "MSN", "Yahoo", "YMail", "Gmail", "Mailinator", "AOL", "Mail", "GMX", "Yandex"];
function sendEmail() {
   
    var listofrequests = [];
    var HasError = false;
    $(".ResultMessage").hide();

    $("#contactform2").find(".error").hide();

    var fname = $("#main_fname").val();
    if (fname.trim() == "") {
        HasError = true;
        $("#main_fname").parent().find(".error").show();
    }
    listofrequests.push(fname);

    var lname = $("#main_lname").val();
    if (lname.trim() == "") {
        HasError = true;
        $("#main_lname").parent().find(".error").show();
    }
    listofrequests.push(lname);

    var email = $("#main_email").val();
    if (!isValidEmail(email)) {
        HasError = true;
        $("#main_email").parent().find(".error").show();
    } else if (BlockedDomain.toString().toLowerCase().indexOf(email.split("@")[1].split(".")[0]) > -1) {
        HasError = true;
        $("#main_email").parent().find(".error").show();
    }
    listofrequests.push(email);

    var company = $("#main_company").val();
    if (company.trim() == "") {
        HasError = true;
        $("#main_company").parent().find(".error").show();
    }
    listofrequests.push(company);

    var jobtitle = $("#main_jobtitle").val();
    if (jobtitle.trim() == "") {
        HasError = true;
        $("#main_jobtitle").parent().find(".error").show();
    }
    listofrequests.push(jobtitle);

    var message = $("#dMessage").val();
    listofrequests.push(message);

    if (HasError) {
        return;
    }

    $("#sendEmail").prop("disabled", true);

    $.ajax({
        type: 'POST',
        url: 'mail/SendEmail2.aspx',
        data: "params=" + encodeURIComponent(listofrequests.join()),
        success: function (data) {
            $("#contactform2").find("input").val("");
            $("#dMessage").val("");
            $("#sendEmail").prop("disabled", false);
            $(".ResultMessage").show();
            setTimeout(function () {
                $("#downloadResource").modal("hide");
                $(".ResultMessage").html("");
            }, 7000);
        },
        error: function (xhr, status, error) {
            $("#sendEmail").prop("disabled", false);
            $(".ResultMessage").hide();
        }
    })

}


// function sendEmail() {
//     debugger;
//    $("#sendingFile").attr('style', 'display:block');
//    var listofrequests = new Array();

//    var fname = $("#main_fname").val();
//    listofrequests.push(fname);

//    var lname = $("#main_lname").val();
//    listofrequests.push(lname);

//    var email = $("#main_email").val();
//    listofrequests.push(email);

//    var jobtitle = $("#main_jobtitle").val();
//    listofrequests.push(jobtitle);

//    var company = $("#main_company").val();
//    listofrequests.push(company);

//    var whitepaper = $("#main_whitepaper").val();
//    listofrequests.push(whitepaper);

//    $.ajax({
//        type: 'POST',
//        url: 'php/SendEmail.aspx',
//        data: "params=" + encodeURIComponent(listofrequests.join()),
//        success: function (data) {

//        },
//        error: function (xhr, status, erro) {
//        }
//    });
//}

var validator = $("#contactform").validate({
    errorClass: "error",
    success: function (label) {
        label.parent().removeClass().addClass('valid');
    },
    error: function (label) {
        label.parent().removeClass().addClass('error');
    },
    invalidHandler: function (e, validator) {
        $('.form-row label').not(".novld").removeClass().addClass('error');
    },
    onkeyup: false,
    onsubmit: true,
    messages: {},
    errorPlacement: function (error, element) {
        element.parent().removeClass().addClass('error');
        error.appendTo(element.parent());
    },
    errorElement: "span",
    submitHandler: function (form) {

        $("#ResultMessage").html("");
        $("#submit").attr("disabled", "disabled");

        var listofrequests = new Array();

        var name = $("#nameInput").val();
        listofrequests.push(name);

        var email = $("#emailInput").val();
        listofrequests.push(email);

        var jobtitle = $("#functionInput").val();
        listofrequests.push(jobtitle);

        var company = $("#companyInput").val();
        listofrequests.push(company);

        var phone = $("#phoneInput").val();
        listofrequests.push(phone);

        var message = $("#messageInput").val();
        listofrequests.push(message);


        $.getScript('https://www.google.com/recaptcha/api.js?render=6LfniM0ZAAAAAIAfq1lBu4XN85hf8sQDNo0-sIW_', function () {

            grecaptcha.ready(function () {
                grecaptcha.execute('6LfniM0ZAAAAAIAfq1lBu4XN85hf8sQDNo0-sIW_', { action: 'submit' }).then(function (token) {


                    var tokenToSend = token;

                    $.ajax({
                        type: 'POST',
                        //url: 'mail/SendEmail.aspx',
                        url: 'mail/sendMessageService.asmx/SendMessage',
                        data: '{ name:" ' + name + '"' + ', email: " ' + email + '"' + ', jobtitle: " ' + jobtitle + '"' + ', company: " ' + company + '"' + ', phone: " ' + phone + '"' + ', message: " ' + message + '"' + ', rechaptchaToken: " ' + tokenToSend + '"}',
                        //data: "params=" + encodeURIComponent(listofrequests.join()),
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function (data) {

                         
                            $("#contactform").find("input").val("");
                            $("#submit").attr("disabled", "");

                            
                            if (data.d == 1) {
                                $(".ResultMessage").html("Thank you for contacting us.<br>Your request / feedback has been routed to one of our team members. We look forward to connecting with you.");
                                $(".ResultMessage").show();

                            }

                            if (data.d == 0)
                            {
                                $(".ResultMessage").html("rechaptch verifcation failed");
                                $(".ResultMessage").show();
                            }


                        },
                        error: function (xhr, status, error) {
                            $("#submit").attr("disabled", "");
                            $(".ResultMessage").show();
                        }
                    });

                });
            });
            
        });
        
        

        
    }
});

//function setCookie(cname, cvalue, exdays) {

//    var d = new Date();
//    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//    var expires = "expires=" + d.toUTCString();
//    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//}

//function getCookie(cname) {

 
//    var name = cname + "=";
//    var decodedCookie = decodeURIComponent(document.cookie);
//    var ca = decodedCookie.split(';');
//    for (var i = 0; i < ca.length; i++) {
//        var c = ca[i];
//        while (c.charAt(0) == ' ') {
//            c = c.substring(1);
//        }
//        if (c.indexOf(name) == 0) {
//            return c.substring(name.length, c.length);
//        }
//    }
//    return "";
//}

//function checkCookie() {
//    var username = getCookie("username");
//    if (username != "") {

        
//        document.getElementById("privacy-container").style.cssText = 'display:none !important';
//        //$(".privacy-container").hide();
//    } else {

        
//        document.getElementById("privacy-container").style.cssText = 'display:block !important';
        

//        //$(".privacy-container").show();

//    }
//}

//function SetNewCookie() {
//    var username = getCookie("username");
//    if (username == "" || username == null) {
//        setCookie("username", "OK", 1);
//        checkCookie();
//    }
//}

// Cookie

new cookieNoticeJS({

// Localizations of the notice message
'messageLocales': {
    'en': 'This website uses cookies to provide necessary site functionality and improve your online experience. By using this website, you agree to the use of cookies as outlined in'
},

// Localizations of the dismiss button text
'buttonLocales': {
    'en': 'Agree'
},

// Position for the cookie-notifier (default=bottom)
'cookieNoticePosition': 'bottom',

// Shows the "learn more button (default=false)
'learnMoreLinkEnabled': true,

// The href of the learn more link must be applied if (learnMoreLinkEnabled=true)
'learnMoreLinkHref': './privacy.aspx',

// Text for optional learn more button
'learnMoreLinkText':{
    'en':'BXG privacy statement.'
},

// The message will be shown again in X days
'expiresIn': 300,

// Specify a custom font family and size in pixels
'fontFamily': 'inherit',
'fontSize': 12,

// Dismiss button background color
'buttonBgColor': '#0076c1',  

// Dismiss button text color
'buttonTextColor': '#fff',

// Notice background color
'noticeBgColor': '#3A3A3A',

// Notice text color
'noticeTextColor': '#fff',

// the learnMoreLink color (default='#009fdd')
'linkColor': '#0076c1',

// The target of the learn more link (default='', or '_blank')
'linkTarget': '_blank',

// Print debug output to the console (default=false)
'debug': false
});
});