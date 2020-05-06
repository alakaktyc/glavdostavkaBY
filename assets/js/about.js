$(document).ready(function () {
    $(".advantages__item--slider").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoWidth:true,
        responsive: {
            0: {
                items: 2
            },
        }
    });
});