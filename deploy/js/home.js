function setupView() {
    console.info("setupView();");
    TweenMax.set($(".circle-container"), {

        opacity: 0,
    });
    TweenMax.set($(".heading"), {
        opacity: 0
    });
    TweenMax.set($(".r-line"), {
        transformOrigin: "left",
        opacity: 0,
        scaleX: 0
    });
    TweenMax.set($(".l-line"), {
        transformOrigin: "right",
        opacity: 0,
        scaleX: 0
    });
    TweenMax.set($(".diamond"), {
        transformOrigin: "center",
        opacity: 0,
        scale: 0,
        rotation: "+=180"
    });
    TweenMax.set($(".bottom-line"), {
        transformOrigin: "center",
        opacity: 0,
        scaleX: 0
    });
    TweenMax.set($(".bottom-diamond"), {
        opacity: 0
    });

    TweenMax.set($(".my-copy"), {
        opacity: 0
    });
}

$.animateView = function () {
    console.info("animateView");
    var tl = new TimelineMax();
    tl.to($(".circle-container"), 1, {
        opacity: 1,
        ease: Quad.easeInOut
    }).to($(".heading"), 2, {
        opacity: 1,
        ease: Quad.easeInOut
    }, 0.25).to($(".r-line"), 1, {
        transformOrigin: "left",
        opacity: 1,
        scaleX: 1,
        ease: Quad.easeInOut
    }, 0.5).to($(".l-line"), 1, {
        transformOrigin: "right",
        opacity: 1,
        scaleX: 1,
        ease: Quad.easeInOut
    }, 0.5).to($(".diamond"), 1, {
        transformOrigin: "center",
        opacity: 1,
        scale: 1,
        rotation: "+=180",
        ease: Quad.easeInOut
    }, 0.75).to($(".my-copy"), 1, {
        opacity: 1,
        ease: Quad.easeInOut
    }, 1).to($(".bottom-line"), 1, {
        opacity: 1,
        scaleX: 1,
        ease: Quad.easeInOut
    }, 1.25).to($(".bottom-diamond"), 1, {
        opacity: 0.5,
        ease: Quad.easeInOut
    }, 1.5);
}
setupView();
