$(document).ready(function () {
    $(".advantages__item--slider").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        autoWidth:true/*,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            768: {
                items: 2,
            },
            920: {
                items: 3,
            },
            1280: {
                items: 3,
                nav: true
            }
        }*/
    });
});