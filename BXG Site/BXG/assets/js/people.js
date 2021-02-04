$(function () {
    $('#system a').click(function () {
        $(".allies-list").hide();
        $(".people-list").show();
        var firstTextAuthor = $('.system:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#system').addClass('current');
        $('.system canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
        $('.system:first').addClass('current');

    });

    $('#active-allies').click(function () {
        $('#active-allies').addClass('current');
        var firstTextAuthor = $('.active-allies:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#active-allies').addClass('current');
        $('.active-allies canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
       // $('.allies:first').addClass('current');
    });
    
    $('#active-board-members a').click(function () {
        $(".allies-list").hide();
        $(".people-list").show();
        var firstTextAuthor = $('.active-board-member:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#active-board-members').addClass('current');
        $('.active-board-member canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
        $('.active-board-member:first').addClass('current');
    });

    $('#executive-commitee-members a').click(function () {
        $(".allies-list").hide();
        $(".people-list").show();
        var firstTextAuthor = $('.executive-commitee:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#executive-commitee-members').addClass('current');
        $('.executive-commitee canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
        $('.executive-commitee:first').addClass('current');
    });

    $('#client-services a').click(function () {
        $(".allies-list").hide();
        $(".people-list").show();
        var firstTextAuthor = $('.client-services:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#client-services').addClass('current');
        $('.client-services canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
        $('.client-services:first').addClass('current');
    });

        $('#advisors a').click(function () {
        $(".allies-list").hide();
        $(".people-list").show();
        var firstTextAuthor = $('.advisors:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#advisors').addClass('current');
        $('.advisors canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
        $('.advisors:first').addClass('current');
    });

    $('#people-process a').click(function () {
        $(".allies-list").hide();
        $(".people-list").show();
        var firstTextAuthor = $('.people-process:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#people-process').addClass('current');
        $('.people-process canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
        $('.people-process:first').addClass('current');
    });

    $('#consultants a').click(function () {
        $(".allies-list").hide();
        $(".people-list").show();
        $(".consultants-list").hide();
        $(".people-list").show();
        var firstTextAuthor = $('.consultants:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#consultants').addClass('current');
        $('.consultants canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
        $('.consultants:first').addClass('current');
    });

    $('#latam a').click(function () {
        $(".allies-list").hide();
        $(".people-list").show();
        var firstTextAuthor = $('.latam:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#latam').addClass('current');
        $('.latam canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
        $('.latam:first').addClass('current');
    });

    $('#asia a').click(function () {
        $(".allies-list").hide();
        $(".people-list").show();
        var firstTextAuthor = $('.asia:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#asia').addClass('current');
        $('.asia canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
        $('.asia:first').addClass('current');
    });

    $('#north-america a').click(function () {
        $(".allies-list").hide();
        $(".people-list").show();
        var firstTextAuthor = $('.north-america:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#north-america').addClass('current');
        $('.north-america canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
        $('.north-america:first').addClass('current');

    });
    $('#europe a').click(function () {
        $(".allies-list").hide();
        $(".people-list").show();
        var firstTextAuthor = $('.europe:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#europe').addClass('current');
        $('.europe canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
        $('.europe:first').addClass('current');
    });

    $('#support-development a').click(function () {
        //$(".allies-list").hide();
        $(".people-list").show();
        var firstTextAuthor = $('.support-development:first').attr("id");
        $('.people-individual-details').removeClass('show').fadeOut(0);
        $(".people-individual-details[data-from='" + firstTextAuthor + "']").addClass('show');
        peopleGeneralActions();
        $('#support-development').addClass('current');
        $('.support-development canvas').animate({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            '-ms-filter': ' " progid:DXImageTransform.Microsoft.Alpha(Opacity=0) "'
        }, 900);
        $('.support-development:first').addClass('current');
    });

    $('.people-box').click(function () {
        var ths = $(this);
        if (!ths.hasClass("empty")) {
            var personClicked = ths.attr("id");
            $('.people-box').removeClass('current');
            $('.people-individual-details').removeClass('show').fadeOut(0);
            $(".people-individual-details[data-from='" + personClicked + "']").addClass('show');
            $('.people-individual-details.show').fadeIn(400);
            ths.addClass('current');
            var Frequency = $(window).width() > 1200 ? 4 : $(window).width() > 1000 ? 3 : 0;
            Frequency = $(window).height() <= 900 ? 3 : Frequency;
            var NewTop = $("#Contact").offset().top - $(window).height(); //$('.people-inner-container').height() >= $(window).height() ? $("#Contact").offset().top - $(window).height() : ($("section[data-from='" + ths.attr("id") + "']").offset().top - $("header").height() - 20) - 125 * Frequency;
            $('html, body').animate({
                scrollTop: NewTop
            }, 500);
        }
    });

    function peopleGeneralActions() {        
        $('.people-groups li').removeClass();
        $('.people-box').removeClass('current').addClass('bw');
        $('.people-box.bw').BlackAndWhite({
            hoverEffect: true,
            webworkerPath: false,
            //responsive: true,
            invertHoverEffect: false,
            speed: {
                fadeIn: 200,
                fadeOut: 800
            },
            onImageReady: function (img) {
                // this callback gets executed anytime an image is converted
            }
        });
        $('.people-individual-details.show').fadeIn(400);
    }

    var urlArr = window.location.hash;
    if (typeof urlArr != "undefined") {
        $(urlArr).trigger("click");
    }
});