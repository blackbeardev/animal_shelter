var teamMembers = document.querySelectorAll(".team-hidden-content");

$(teamMembers).hide();


$(".team-show-content").on("click", function() {
    $(this).prev().slideToggle(300);
});

