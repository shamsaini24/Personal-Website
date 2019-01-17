//Typewriter Jumbotron setup
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

//Typewriter Jumbotron typing effect
TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting && this.toRotate[i+1]) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;
    
    if (this.isDeleting) {
         delta /= 2; 
    }
   
    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
        that.tick();
        }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap" ;
    document.body.appendChild(css);
};

// Cache selectors for nav-bar
var lastId,
    topMenu = $(".navbar-nav"),
    jumboheight = $(".jumbotron").outerHeight();
    topMenuHeight = topMenu.outerHeight()+215,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) {
           return item; }
    });


// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight + jumboheight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});


$("#about-nav").click(function() {
    $('html,body').animate({
        scrollTop: $("#about").offset().top-150},
        'slow');
});

  $("#portfolio-nav").click(function() {
        $('html,body').animate({
            scrollTop: $("#portfolio").offset().top-150},
            'slow');
    });

    $("#experience-nav").click(function() {
        $('html,body').animate({
            scrollTop: $("#past-experience").offset().top-150},
            'slow');
    });

    $(document).ready(function() {
        $( ".toggle" ).click( function() {
            $(".bottom").toggleClass('flip');
        });
    });


    