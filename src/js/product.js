var $backdrop = $('<div id="backdrop"></div>');
var $body = $(document.body);
var $window = $(window);
var $menuToggler = $('.nav-toggle');
$body.append($backdrop);

function toggleMenuHandler(e) {
    e.preventDefault();
    $('.main-menu > ul').toggleClass('active');
    $backdrop.toggleClass('active');
    $body.toggleClass('menu-opened');
}

function enableMenu() {
    $menuToggler.click(toggleMenuHandler);
    $backdrop.click(toggleMenuHandler);
}

function disableMenu() {
    $menuToggler.unbind('click');
    $backdrop.unbind('click');
}

function checkMobile() {
    if ($window.width() < 991) {
        enableMenu();
        return;
    }

    disableMenu();
}

$window.on('resize', checkMobile);

checkMobile();

//

$('.sel').each(function () {
    $(this).children('select').css('display', 'none');

    var $current = $(this);

    $(this).find('option').each(function (i) {
        if (i == 0) {
            $current.prepend($('<div>', {
                class: $current.attr('class').replace(/sel/g, 'sel__box')
            }));

            var placeholder = $(this).text();
            $current.prepend($('<span>', {
                class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
                text: placeholder,
                'data-placeholder': placeholder
            }));

            return;
        }

        $current.children('div').append($('<span>', {
            class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
            text: $(this).text()
        }));
    });
});

// Toggling the `.active` state on the `.sel`.
$('.sel').click(function () {
    $(this).toggleClass('active');
});

// Toggling the `.selected` state on the options.
$('.sel__box__options').click(function () {
    var txt = $(this).text();
    var index = $(this).index();

    $(this).siblings('.sel__box__options').removeClass('selected');
    $(this).addClass('selected');

    var $currentSel = $(this).closest('.sel');
    $currentSel.children('.sel__placeholder').text(txt);
    $currentSel.children('select').prop('selectedIndex', index + 1);
});

$(function () {
    $("#range").ionRangeSlider({
        type: "double",
        min: 18,
        max: 34,
        from: 15,
        to: 23,
        hide_min_max: true,
        hide_from_to: false,
        grid: false
    });
});

(function ($) {
    var input_class = 'zbz-input-clearable',
        input_class_x = input_class + '__x',
        input_class_x_over = input_class + '__x-over',
        input_selector = '.' + input_class,
        input_selector_x = '.' + input_class_x,
        input_selector_x_over = '.' + input_class_x_over,
        event_main = input_class + '-init',
        event_names = [event_main, 'focus drop paste keydown keypress input change'].join(' '),
        btn_width = 13,
        btn_height = 13,
        btn_margin = 7;

    function tog(v) {
        return v ? 'addClass' : 'removeClass';
    }

    $(document).on(event_names, input_selector, function () {
        $(this)[tog(this.value)](input_class_x);
    });

    $(document).on('mousemove', input_selector_x, function (e) {
        var input = $(this),
            input_width = this.offsetWidth,
            input_height = this.offsetHeight,
            input_border_bottom = parseFloat(input.css('borderBottomWidth')),
            input_border_right = parseFloat(input.css('borderRightWidth')),
            input_border_left = parseFloat(input.css('borderLeftWidth')),
            input_border_top = parseFloat(input.css('borderTopWidth')),
            input_border_hr = input_border_left + input_border_right,
            input_border_vr = input_border_top + input_border_bottom,
            client_rect = this.getBoundingClientRect(),
            input_cursor_pos_x = e.clientX - client_rect.left,
            input_cursor_pos_y = e.clientY - client_rect.top,
            is_over_cross = true;

        is_over_cross = is_over_cross && (input_cursor_pos_x >= input_width - input_border_hr - btn_margin - btn_width);
        is_over_cross = is_over_cross && (input_cursor_pos_x <= input_width - input_border_hr - btn_margin);
        is_over_cross = is_over_cross && (input_cursor_pos_y >= (input_height - input_border_vr - btn_height) / 2);
        is_over_cross = is_over_cross && (input_cursor_pos_y <= (input_height - input_border_vr - btn_height) / 2 + btn_height);

        $(this)[tog(is_over_cross)](input_class_x_over);
    });

    $(document).on('click', input_selector_x_over, function () {
        $(this).removeClass([input_class_x, input_class_x_over].join(' ')).val('').trigger('input');
    });

    $(function () {
        $(input_selector).trigger(event_main);
    });

})(jQuery);

(function () {
    'use strict'

    const n = 8;
    const girlsList = document.querySelectorAll('.num');


    let pagination = document.querySelectorAll('.pagination li');
    let paginationEl = document.querySelectorAll('.pagination a');
    let paginationWrap = document.querySelectorAll('.pagination');

    let pageActive = [...pagination].filter((item) => {
            if(item.classList.contains('active')) {
                return item;
            }
        })
    ;
    let pageNum = +pageActive[0].firstElementChild.innerHTML;
//        console.log(pageActive, pageNum);
    let imemMax;
    let imemMin;
//        console.log(pageNum, n, imemMin, imemMax);

    function getGirlsList() {
        imemMax = (n * pageNum) - 1;
        imemMin = n * (pageNum - 1);
        console.log(pageNum, n, imemMin, imemMax);
        girlsList.forEach(function (item, i) {
            if (!( imemMin <= i && i <= imemMax )) {
//                    console.log(item, i, pageNum);
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });
    }
    getGirlsList();

    pagination.forEach(function (item) {
        console.log(item);
        item.addEventListener("click", function (e) {
            e.preventDefault();

            if (e.target.innerHTML === 'prev' && pageNum > 1) {
                --pageNum;
                getGirlsList()
            } else if (e.target.innerHTML === 'next' && pageNum < 4) {
                ++pageNum;
                getGirlsList()
            } else if (e.target.parentNode.classList.contains('active') && e.target.innerHTML !== 'next' && e.target.innerHTML !== 'prev') {
                console.log('active');
                e.target.parentNode.classList.remove("active");
            } else {console.log('no-active');
                e.target.parentNode.className += "active";
                pageNum = e.target.innerHTML;
                getGirlsList()
            }
        });
    });
})();