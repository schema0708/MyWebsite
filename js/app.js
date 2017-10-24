    var tl, td, viewArray, id, navOpen, queue;

    function initLoad() {
      console.info("initLoad();");
      initVars();
      initHandlers();
      loadView(viewArray[id]);
    }


    function initVars() {
      console.info("initVars();");
      tl = new TimelineMax();
      id = 0;
      TweenMax.set($(".mask-content"), {
        transformOrigin: "top left"
      });
      TweenMax.set($(".nav-divider"), {
        transformOrigin: "center"
      });
      TweenMax.set($(".view-container"), {
        transformOrigin: "center"
      });
      TweenMax.set($(".logo"), {
        transformOrigin: "center"
      });
      TweenMax.set($(".logo2"), {
        transformOrigin: "center"
      });
      TweenMax.set($(".logo2 .triangle2"), {
        transformOrigin: "center"
      });
      viewArray = [{
        url: "views/home.html",
        url2: "images/home_bkg.jpg",
        pageName: "Home"
      }, {
        url: "views/about.html",
        url2: "images/about_bkg.jpg",
        pageName: "About"
      }, {
        url: "views/work.html",
        url2: "images/work_bkg.jpg",
        pageName: "Work"
      }, {
        url: "views/contact.html",
        url2: "images/contact_bkg.jpg",
        pageName: "Contact"
      }];
      navOpen = false;

      window.onresize = function() {
        checkMenuOpen();
      }
      checkMenuOpen();
    }

    function checkMenuOpen() {

      console.info("NavOpen is: ", navOpen);
      console.info("Window width: ", window.innerWidth);

      if (window.innerWidth < 1024 && navOpen === false) {
        console.info("here 1");


        $(".nav-close").css({
          left: "0px"
        });
        $(".logo-container").css({
          top: "0px"
        });
        $(".nav-container").css({
          width: "100%",
          height: "80px"
        });
      }
      if (window.innerWidth > 1024 && navOpen == false) {
        $(".nav-container").css({
          width: "100px",
          height: "100%"
        });
      }
      if (window.innerWidth <= 1024 && navOpen === true) {
        console.log("here 2")
        $(".nav-close").css({
          left: "0px"
        });
        $(".logo-container").css({
          top: "-80px"
        });
      }

      if (window.innerWidth >= 1024 && navOpen === true) {

        console.info("here 3");

        $(".nav-close").css({
          left: "0px"
        });

        $(".logo-container").css({
          top: "0px"
        });

        $(".nav-container").css({
          width: "100%",
          height: "100%"
        });
      }


    }

    function initHandlers() {
      console.info("initHandlers();");
      $(".nav-item").each(function(i, val) {
        $(this).data("view", viewArray[i]);
      });
      $(".nav-item").click(function(e) {
        setActiveNavItem($(this));
        console.info($(this).data("view"));
        var passData = $(this).data("view");
        if (passData) {
          setTimeout(function() {
            closeMainPanel();
          }, 1000);
          setTimeout(function() {
            removeView(passData);
          }, 3000);
        } else {
          console.info("Error Couldn't load view!");
        }
      });
      $(".logo").click(function() {
        console.info("open-panel");
        openPanel();
      });
      $(".logo").mouseover(function() {
        console.info("over");
        TweenMax.to(this, 1, {
          scale: 1.05,
          ease: Quad.easeOut
        });
      });
      $(".logo").mouseout(function() {
        console.info("over");
        TweenMax.to(this, 1, {
          scale: 1,
          ease: Quad.easeOut
        });
      });
      $(".hamburger-btn").click(function() {
        openPanel();
      });
      $(".hamburger-btn").mouseover(function() {
        console.info("over");
        TweenMax.to($(".line"), 1, {
          backgroundColor: "#d4907a",
          ease: Quad.easeOut
        });
      });
      $(".hamburger-btn").mouseout(function() {
        console.info("over");
        TweenMax.to($(".line"), 1, {
          backgroundColor: "#d9d9d9",
          ease: Quad.easeOut
        });
      });
      $(".nav-close-btn").click(function() {
        closeMainPanel();
      });
    }

    function setActiveNavItem(target) {
      var activeItem = $(".nav-item").find(".active");
      activeItem.removeClass("active");
      activeItem.addClass("disable");
      $(".nav-item").removeClass("nav-item-active");
      target.addClass("nav-item-active");
      var disableItem = target.find(".active-item");
      disableItem.removeClass("disable");
      disableItem.addClass("active");
    }

    function removeView(data) {
      console.info("removeView();");
      TweenMax.to($(".mask-content"), 4, {
        scaleX: 1,
        ease: Strong.easeInOut,
        onComplete: startLoad,
        onCompleteParams: [data]
      });
    }

    function startLoad(data) {

      var view = $(".view-container").empty();
      if (view) {
        resetAnimation();
        loadView(data);
      } else {
        console.info("View is not empty ERROR!!");
      }
    }

    function resetAnimation() {
      console.info("resetAnimation();");
      tl.seek(0);
    }


    function loadView(data) {
      if (data) {
        queue = new createjs.LoadQueue(false);
        queue.on("loadstart", onLoadStart);
        queue.on("progress", onLoadProgress);
        queue.loadFile({
          id: "view",
          src: data.url2
        });
        $(".view-container").load(data.url, loadViewComplete);
      } else {
        console.info("Error loading view!");
      }
    }

    function onLoadStart() {
      console.info("onLoadStart();");
      var tl4 = new TimelineMax();
      tl4.fromTo($(".radial-gradient-bkg"), 2, {
        opacity: 0,
        ease: Strong.easeInOut
      }, {
        opacity: 1,
        ease: Strong.easeInOut
      }, 0.5).fromTo($(".logo2"), 2, {
        opacity: 0,
        scale: 0,
        ease: Strong.easeInOut
      }, {
        opacity: 1,
        scale: 1,
        ease: Strong.easeInOut
      }, 0.5).to($(".logo2 .triangle2"), 2, {
        rotation: "+=360",
        repeat: 999
      }, 0.5);
    }

    function onLoadProgress(e) {
      console.info("progress: ", Math.round(e.progress));
      TweenMax.to($(".progressbar"), 1, {
        scaleX: Math.round(e.progress),
        ease: Strong.easeOut
      });
      $(".progressbar-container span").text(String(Math.round(e.progress) * 100) + "%");
    }

    function loadViewComplete() {
      console.info("loadViewComplete();");

      revealView();
    }

    function revealView() {
      console.info("revealView();");

      tl.to($(".radial-gradient-bkg"), 2, {
          opacity: 0,
          ease: Strong.easeInOut
        }, 2).to($(".logo2"), 2, {
          opacity: 0,
          scale: 0,
          ease: Strong.easeInOut
        }, 2.5).to($(".progressbar"), 2, {
          scaleX: 0,
          ease: Strong.easeInOut
        }, 2.5).to($(".progressbar-container span"), 2, {
          opacity: 0,
          ease: Strong.easeInOut
        }, 2.5).to($(".logo2 .triangle2"), 2, {
          rotation: 0,
          repeat: 0
        }).to($(".mask-content"), 4, {
          scaleX: 0,
          ease: Strong.easeInOut
        }, 2.5).from($(".view-container"), 4, {
          scale: 1.15,
          ease: Quad.easeOut
        }, 2.5)
        .from($(".nav-divider"), 1, {
          scale: "0",
          ease: Strong.easeInOut
        }, 7).fromTo($(".logo"), 2, {
          scale: 0,
          opacity: 0,
          rotation: "-=360",
          ease: Strong.easeInOut
        }, {
          scale: 1,
          opacity: 1,
          rotation: "0",
          ease: Strong.easeInOut
        }, 7.5)
        .staggerFromTo($(".line"), 2, {
          opacity: 0,
          ease: Strong.easeInOut
        }, {
          opacity: 1,
          ease: Strong.easeInOut
        }, 0.25, 8).from("polyline", 4, {
          drawSVG: "0%",
          ease: Strong.easeInOut
        }, 9);

      setTimeout(initView, 10750);


    }

    function initView() {
      console.log("Hello initView();");
      try {
        $.animateView();
      } catch (err) {
        console.log("Error animting view into container:", err);
      }
    }

    function openPanel() {
      console.info("openPanel();");
      console.info(window.innerWidth);
      navOpen = true;


      if (window.innerWidth < 1024) {

        var tl2 = new TimelineMax();
        tl2.to($(".logo-container"), 1, {
            top: "-80",
            ease: Strong.easeInOut,
            onStart: function() {
              $(".nav-container").css({
                width: "100%",
                height: "100%"
              });
            }
          })
          .to($(".nav-open"), 1, {
            left: "0",
            ease: Strong.easeInOut
          }, 1);
      } else {



        var tl3 = new TimelineMax();
        tl3.to($(".nav-close"), 1, {
            left: "-200",
            ease: Strong.easeInOut,
            onStart: function() {
              $(".nav-container").css({
                width: "100%",
                height: "100%"
              });
            }
          })
          .to($(".nav-open"), 1, {
            left: "0",
            ease: Strong.easeInOut
          }, 1);

      }

    }

    function closeMainPanel() {

      console.info("closeMainPanel();");

      navOpen = false;


      if (window.innerWidth < 1024) {

        var tl3 = new TimelineMax();
        tl3.to($(".nav-open"), 1, {
            left: "-800",
            ease: Strong.easeInOut
          })
          .to($(".logo-container"), 1, {
            top: "0",
            ease: Strong.easeInOut,

          }, 1);
      } else {
        $(".logo-container").css({
          top: "0px"
        });
        $(".nav-close").css({
          left: "-200px"
        });

        var tl4 = new TimelineMax();
        tl4.to($(".nav-open"), 1, {
            left: "-800",
            ease: Strong.easeInOut
          })
          .to($(".nav-close"), 1, {
            left: "0",
            ease: Strong.easeInOut,
            onComplete: function() {
              $(".nav-container").css({
                width: "100px",
                height: "100%"
              });
            }
          }, 1);
      }
    }
    window.onload = initLoad();
