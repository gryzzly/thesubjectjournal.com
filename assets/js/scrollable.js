$(function () {
  var mainText = $('.main-text'),
      doc = $(document),
      waiting = false,
      img = $('.main-image > img'),
      markers = mainText.find('.main-text-image-marker'),
      imgSrc = img.attr('src'),
      mainTextOffset = mainText.offset(),
      mainTextPadding = parseInt(mainText.css('padding-top')),
      positions = [],
      currentImageSrc = null;

debugger;
  doc.on('scroll', onScroll);

  markers.each(function (index, element) {
    var $element = $(element),
        imgSrc = $element.data('image');

    preload(imgSrc);
    positions.push({
      top: $element.offset().top - mainTextOffset.top - mainText.scrollTop() - mainTextPadding,
      src: imgSrc
    });
  });

  function onScroll () {
    if (waiting) {
      return;
    }

    waiting = true;

    setTimeout(function () {
      waiting = false;
      updateImageSrc();
    }, 100);
  }

  function updateImageSrc () {
    var currentItem = positions[matchPosition(doc.scrollTop())];

    if (!currentItem) {
      currentImageSrc = '';
      img.attr('src', currentImageSrc);
    }

    if (currentImageSrc !== currentItem.src) {
      currentImageSrc = currentItem.src;
      img.attr('src', currentImageSrc);
    }
  }

  function matchPosition (scrollValue) {
    for (var i = 0, len = positions.length, next, current; i < len; i++) {
      current = positions[i].top;
      next = positions[i + 1] && positions[i + 1].top || Infinity;
      if (scrollValue >= current && scrollValue < next) {
        return i;
      }
    }
  }

  function preload (srcs) {
    if (Object.prototype.toString.call(srcs) !== '[object Array]') {
      srcs = [srcs];
    }
    srcs.forEach(function (src) {
      var img = new Image ();
      img.src = src;
    })
  }
});
