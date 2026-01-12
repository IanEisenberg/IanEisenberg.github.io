(function($) {

	'use strict';

	// bootstrap dropdown hover

  // loader
  var loader = function() {
    setTimeout(function() { 
      if($('#loader').length > 0) {
        $('#loader').removeClass('show');
      }
    }, 1);
  };
  loader();

	
	$('nav .dropdown').hover(function(){
		var $this = $(this);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			$this.find('.dropdown-menu').removeClass('show');
	});


  var offcanvas_toggle = $('.js-offcanvas-toggle');
  offcanvas_toggle.on('click', function() {


    if ( $('body').hasClass('offcanvas-open') ) {
      $('body').removeClass('offcanvas-open');
    } else {
      $('body').addClass('offcanvas-open');
    }

  });


  $(document).click(function(e) {
    var container = $('.js-offcanvas-toggle, #offcanvas_menu');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ( $('body').hasClass('offcanvas-open') ) {
        $('body').removeClass('offcanvas-open');
      }
    }
  });


  // Only run countdown if plugin is loaded
  if ($.fn.countdown) {
    $('#date-countdown').countdown('2020/10/10', function(event) {
      var $this = $(this).html(event.strftime(''
        + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
        + '<span class="countdown-block"><span class="label">%d</span> days </span>'
        + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
        + '<span class="countdown-block"><span class="label">%M</span> min </span>'
        + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
    });
  }

	// home slider
	$('.home-slider').owlCarousel({
    loop:true,
    autoplay: true,
    margin:10,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav:true,
    autoplayHoverPause: false,
    items: 1,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:1,
        nav:false
      },
      1000:{
        items:1,
        nav:true
      }
    }
	});


  // home slider
  $('.testimony-slider').owlCarousel({
    loop:true,
    autoplay: true,
    margin:10,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav:false,
    autoplayHoverPause: false,
    items: 1,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:1,
        nav:false
      },
      1000:{
        items:1,
        nav:false
      }
    }
  });

	// owl carousel
	var majorCarousel = $('.js-carousel-1');
	majorCarousel.owlCarousel({
    loop:true,
    autoplay: true,
    stagePadding: 7,
    margin: 20,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: true,
    items: 3,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:2,
        nav:false
      },
      1000:{
        items:3,
        nav:true,
        loop:false
      }
  	}
	});

	// owl carousel
	var major2Carousel = $('.js-carousel-2');
	major2Carousel.owlCarousel({
    loop:true,
    autoplay: true,
    stagePadding: 7,
    margin: 20,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: true,
    items: 4,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:3,
        nav:false
      },
      1000:{
        items:4,
        nav:true,
        loop:false
      }
  	}
	});


	var contentWayPoint = function() {
		var i = 0;
		$('.element-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('element-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .element-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn element-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft element-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight element-animated');
							} else {
								el.addClass('fadeInUp element-animated');
							}
							el.removeClass('item-animate');
						},  k * 100);
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();



})(jQuery);

// Network cursor - runs after window load to ensure body exists
(function() {
	function initCursor() {
		if (window.innerWidth <= 768) return;
		if (document.getElementById('cursor-canvas')) return; // Already initialized
		if (!document.body) return; // Safety check

		// Create canvas for network effect
		var canvas = document.createElement('canvas');
		canvas.id = 'cursor-canvas';
		canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
		document.body.appendChild(canvas);
		var ctx = canvas.getContext('2d');

	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	resize();
	window.addEventListener('resize', resize);

	var mouseX = window.innerWidth / 2;
	var mouseY = window.innerHeight / 2;
	var isHovering = false;
	var time = 0;

	// Network nodes - branching structure
	var nodes = [];

	// Main cursor node
	nodes.push({
		x: mouseX, y: mouseY,
		vx: 0, vy: 0,
		size: 4,
		parent: null,
		orbitRadius: 0,
		orbitSpeed: 0,
		orbitPhase: 0
	});

	// Branch 1 - at 0° (right)
	nodes.push({
		x: mouseX, y: mouseY,
		size: 3,
		parent: 0,
		orbitSpeed: 0.006,
		orbitPhase: 0,
		radiusWobble: 0.003,
		radiusBase: 22
	});
	nodes.push({
		x: mouseX, y: mouseY,
		size: 2,
		parent: 1,
		orbitSpeed: 0.009,
		orbitPhase: Math.PI * 0.3,
		radiusWobble: 0.004,
		radiusBase: 14
	});

	// Branch 2 - at 90° (bottom)
	nodes.push({
		x: mouseX, y: mouseY,
		size: 2.5,
		parent: 0,
		orbitSpeed: -0.005,
		orbitPhase: Math.PI * 0.5,
		radiusWobble: 0.0035,
		radiusBase: 20
	});
	nodes.push({
		x: mouseX, y: mouseY,
		size: 1.5,
		parent: 3,
		orbitSpeed: 0.008,
		orbitPhase: Math.PI * 0.8,
		radiusWobble: 0.005,
		radiusBase: 12
	});

	// Branch 3 - at 180° (left)
	nodes.push({
		x: mouseX, y: mouseY,
		size: 2.5,
		parent: 0,
		orbitSpeed: 0.007,
		orbitPhase: Math.PI,
		radiusWobble: 0.002,
		radiusBase: 24
	});
	nodes.push({
		x: mouseX, y: mouseY,
		size: 2,
		parent: 5,
		orbitSpeed: -0.01,
		orbitPhase: Math.PI * 1.2,
		radiusWobble: 0.006,
		radiusBase: 15
	});
	nodes.push({
		x: mouseX, y: mouseY,
		size: 1.5,
		parent: 6,
		orbitSpeed: 0.012,
		orbitPhase: Math.PI * 0.5,
		radiusWobble: 0.004,
		radiusBase: 10
	});

	// Branch 4 - at 270° (top)
	nodes.push({
		x: mouseX, y: mouseY,
		size: 2,
		parent: 0,
		orbitSpeed: -0.0045,
		orbitPhase: Math.PI * 1.5,
		radiusWobble: 0.003,
		radiusBase: 18
	});
	nodes.push({
		x: mouseX, y: mouseY,
		size: 1.5,
		parent: 8,
		orbitSpeed: 0.011,
		orbitPhase: Math.PI * 1.8,
		radiusWobble: 0.005,
		radiusBase: 12
	});

	document.addEventListener('mousemove', function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	// Hover detection
	document.addEventListener('mouseover', function(e) {
		if (e.target.closest('a, button, .pub-drawer-toggle, .pub-card')) {
			isHovering = true;
		}
	});
	document.addEventListener('mouseout', function(e) {
		if (e.target.closest('a, button, .pub-drawer-toggle, .pub-card')) {
			isHovering = false;
		}
	});

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		time += 1;

		// Update nodes
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			var targetX, targetY;

			if (node.parent === null) {
				// Main node follows mouse directly - no delay
				node.x = mouseX;
				node.y = mouseY;
				node.vx = 0;
				node.vy = 0;
				continue;
			} else {
				// Child nodes orbit around their parent directly
				var parent = nodes[node.parent];
				var angle = time * node.orbitSpeed + node.orbitPhase;

				// Wobble the radius over time for organic movement
				var radius = node.radiusBase + Math.sin(time * node.radiusWobble) * 8;

				// Follow orbit position directly - no spring physics
				node.x = parent.x + Math.cos(angle) * radius;
				node.y = parent.y + Math.sin(angle) * radius;
			}
		}

		// Draw connections (parent-child)
		ctx.strokeStyle = isHovering ? 'rgba(247, 56, 89, 0.5)' : 'rgba(247, 56, 89, 0.3)';
		ctx.lineWidth = isHovering ? 1.5 : 1;

		for (var i = 1; i < nodes.length; i++) {
			var node = nodes[i];
			var parent = nodes[node.parent];

			ctx.beginPath();
			ctx.moveTo(node.x, node.y);
			ctx.lineTo(parent.x, parent.y);
			ctx.stroke();
		}

		// Draw cross-branch connections (between nearby nodes from different branches)
		ctx.strokeStyle = isHovering ? 'rgba(247, 56, 89, 0.25)' : 'rgba(247, 56, 89, 0.15)';
		ctx.lineWidth = isHovering ? 1 : 0.5;

		// Connect leaf nodes that are close enough
		var crossConnectionThreshold = 50;
		for (var i = 1; i < nodes.length; i++) {
			for (var j = i + 1; j < nodes.length; j++) {
				// Skip if same branch (parent-child relationship)
				if (nodes[i].parent === j || nodes[j].parent === i) continue;

				var dx = nodes[i].x - nodes[j].x;
				var dy = nodes[i].y - nodes[j].y;
				var dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < crossConnectionThreshold) {
					// Fade connection based on distance
					var alpha = (1 - dist / crossConnectionThreshold) * (isHovering ? 0.4 : 0.2);
					ctx.strokeStyle = 'rgba(247, 56, 89, ' + alpha + ')';
					ctx.beginPath();
					ctx.moveTo(nodes[i].x, nodes[i].y);
					ctx.lineTo(nodes[j].x, nodes[j].y);
					ctx.stroke();
				}
			}
		}

		// Draw nodes
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			var size = node.size * (isHovering ? 1.2 : 1);

			ctx.beginPath();
			ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
			ctx.fillStyle = i === 0 ? '#F73859' : 'rgba(247, 56, 89, 0.5)';
			ctx.fill();
		}

		requestAnimationFrame(animate);
	}
	animate();
	} // end initCursor

	// Try multiple initialization strategies
	if (document.readyState === 'complete') {
		initCursor();
	} else {
		window.addEventListener('load', initCursor);
	}
	// Also try on DOMContentLoaded as backup
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initCursor);
	}
})();