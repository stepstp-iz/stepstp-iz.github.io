$(function () {
    // ======================= imagesLoaded Plugin ===============================
    // https://github.com/desandro/imagesloaded

    // $('#my-container').imagesLoaded(myFunction)
    // execute a callback when all images have loaded.
    // needed because .load() doesn't work on cached images

    // callback function gets image collection as argument
    //  this is the container

    // original: mit license. paul irish. 2010.
    // contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou

    $.fn.imagesLoaded = function (callback) {
        var $images = this.find('img'),
            len = $images.length,
            _this = this,
            blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

        function triggerCallback() {
            callback.call(_this, $images);
        }

        function imgLoaded() {
            if (--len <= 0 && this.src !== blank) {
                setTimeout(triggerCallback);
                $images.off('load error', imgLoaded);
            }
        }

        if (!len) {
            triggerCallback();
        }

        $images.on('load error', imgLoaded).each(function () {
            // cached images don't fire load sometimes, so we reset src.
            if (this.complete || this.complete === undefined) {
                var src = this.src;
                // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
                // data uri bypasses webkit log warning (thx doug jones)
                this.src = blank;
                this.src = src;
            }
        });

        return this;
    };

    $.getJSON("assets/js/images.json", function (data) {
        allImages = data;
        // gallery container
        //$('.rg-gallery').each(function () {
        //    loadGallery($(this));
        //});
    }
    );

});
var allImages;
function loadGallery(section, application, $rgGallery) {
    var html = [], i = allImages.length, img, images, j, app;
    while (i--) {
        app = allImages[i];
        if (app.app == application) {
            images = app.images;
            j = images.length;
            while (j--) {
                img = images[j];
                html.push('<li class="' + app.app + '"><a href="#"><img src="" data-large="images/tools/' + app.app + '/' + img.image + '.png" data-description="' + img.desc + '" /></a></li>');
            }
        }
    }
    $rgGallery.html('<div class="rg-count"></div><div class="rg-thumbs"><div class="es-carousel-wrapper"> <div class="es-nav">' +
        '<span class="es-nav-prev">Previous</span><span class="es-nav-next">Next</span></div><div class="es-carousel"></div></div></div>');
    $("#gallery-" + section).find(".es-carousel").html("<ul> " + html.join('') + "</ul>");

    // carousel container
    var $esCarousel = $rgGallery.find('div.es-carousel-wrapper'),
    // the carousel items
    $items = $esCarousel.find('ul > li'),
    // total number of items
    itemsCount = $items.length;
    var $rgCount = $(".rg-count");
    $rgCount.html("1/" + itemsCount);
    
    var Gallery = (function () {
        // index of the current item
        var current = 0,
            // mode : carousel || fullview
            mode = 'carousel',
            // control if one image is being loaded
            anim = false,
            init = function () {
                // (not necessary) preloading the images here...
                $items.add('<img src="images/ajax-loader.gif"/><img src="images/black.png"/>').imagesLoaded(function () {

                    // add large image wrapper
                    _addImageWrapper();

                    // show first image
                    _showImage($items.eq(current));

                });

                // initialize the carousel
                if (mode === 'carousel')
                    _initCarousel();
            },
            _initCarousel = function () {

                // we are using the elastislide plugin:
                // http://tympanus.net/codrops/2011/09/12/elastislide-responsive-carousel/
                $esCarousel.show().elastislide({
                    imageW: 65,
                    onClick: function ($item) {
                        if (anim) return false;
                        anim = true;
                        // on click show image
                        _showImage($item);
                        // change current
                        current = $item.index();
                        
                        return false;
                    }
                });

                // set elastislide's current to current
                $esCarousel.elastislide('setCurrent', current);

            },
            _addImageWrapper = function () {

                // adds the structure for the large image and the navigation buttons (if total items > 1)
                // also initializes the navigation events
                var tmpl = ['<div class="rg-image-wrapper">',
                    '<div class="rg-image-nav">',
                    '<a href="#" class="rg-image-nav-prev">Previous Image</a>',
                    '<a href="#" class="rg-image-nav-next">Next Image</a>',
                    '</div>',
                    '<div class="rg-image"></div>',
                    '<div class="rg-loading"></div>',
                    '<div class="rg-caption-wrapper">',
                    '<div class="rg-caption" style="display: none;">',
                    '<p></p>',
                    '</div>',
                    '</div>',
                    '</div>'].join("");

                $(tmpl).appendTo($rgGallery);
                
                var $navPrev = $rgGallery.find('a.rg-image-nav-prev'),
                      $navNext = $rgGallery.find('a.rg-image-nav-next'),
                      $imgWrapper = $rgGallery.find('div.rg-image');
                
                if (itemsCount > 1) {
                    // addNavigation
                  

                    $navPrev.on('click.rgGallery', function(event) {
                        _navigate('left');
                        return false;
                    });

                    $navNext.on('click.rgGallery', function(event) {
                        _navigate('right');
                        return false;
                    });

                    // add touchwipe events on the large image wrapper
                    $imgWrapper.touchwipe({
                        wipeLeft: function() {
                            _navigate('right');
                        },
                        wipeRight: function() {
                            _navigate('left');
                        },
                        preventDefaultEvents: false
                    });

                    $(document).on('keyup.rgGallery', function(event) {
                        if (event.keyCode == 39)
                            _navigate('right');
                        else if (event.keyCode == 37)
                            _navigate('left');
                    });
                } else {
                    $navPrev.hide();

                    $navNext.hide();
                }

            },
            _navigate = function (dir) {

                // navigate through the large images

                if (anim) return false;
                anim = true;

                if (dir === 'right') {
                    if (current + 1 >= itemsCount)
                        current = 0;
                    else
                        ++current;
                } else if (dir === 'left') {
                    if (current - 1 < 0)
                        current = itemsCount - 1;
                    else
                        --current;
                }

                _showImage($items.eq(current));
                $rgCount.html((current + 1) + "/" + itemsCount);

            },
            _showImage = function ($item) {

                // shows the large image that is associated to the $item

                var $loader = $rgGallery.find('div.rg-loading').show();

                $items.removeClass('selected');
                $item.addClass('selected');

                var $thumb = $item.find('img'),
                    largesrc = $thumb.data('large'),
                    title = $thumb.data('description');

                $('<img/>').load(function () {

                    $rgGallery.find('div.rg-image').fadeOut(200, function() {
                        $(this).empty().append('<img src="' + largesrc + '"/>').fadeIn(100);
                    });
                    if (title) {
                        $rgGallery.find('div.rg-caption').fadeOut(200, function() {
                            $(this).children('p').empty().text(title).end().fadeIn(200);
                        });
                    } else {
                        $rgGallery.find('div.rg-caption').fadeOut(200);
                    }
                    $loader.hide();

                    if (mode === 'carousel') {
                        $esCarousel.elastislide('reload');
                        $esCarousel.elastislide('setCurrent', current);
                    }

                    anim = false;

                }).attr('src', largesrc);

            },
            addItems = function ($new) {

                $esCarousel.find('ul').append($new);
                $items = $items.add($($new));
                itemsCount = $items.length;
                $esCarousel.elastislide('add', $new);

            };

        return {
            init: init,
            addItems: addItems
        };

    })();

    Gallery.init();

}