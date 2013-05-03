//newbbs-page.js

$(function () {
  /* newbbsPage */
  $('#newbbsPage').ipage();

  /* newbbsTab */
  $('#newbbsTab').tab();


});//jQuery End

//Plugins
(function ($) {
  /* tab-box
  * ====================== */
  $.fn.tab = function (options) {
    return this.each(function () {
      var $this = $(this)
        , $tabNav = $this.children('.tab-nav')
        , $tabContent = $this.find('.tab-content').first()
      $tabNav.on('click', '.nav-btn', function () {
        var target = $(this).attr('href') || $(this).data('tab');
        $tabNav.find('.btn-active').removeClass('btn-active');
        $(this).addClass('btn-active');
        $tabContent.children('.tab-item').removeClass('item-active');
        $(target).addClass('item-active');
      });
    });
  }

  /* timepicker
  * ====================== */
  $.fn.timepicker = function (options) {
    return this.each(function () {
      var $this = $(this)
        , $timeBtn = $this.children('.time')
        , $timeList = $this.children('.time-list')
        //, curDate = 
        , curTime = (new Date()).getHours()
        , setOptions = {
          setTime: curTime + 1 > 23 ? '0:00' : curTime + 1 + ':00'
          }
      $timeBtn.children('.time-num').html(setOptions.setTime);
      $timeBtn.on('click', function () {
        $timeList.addClass('active');
      });
      $timeList.on('click', 'li', function () {
        var timeNum = $(this).text();
        $timeBtn.children('.time-num').html(timeNum);
        $timeList.removeClass('active');

        //custom onClick
        options.onClick();
      });
    });
  }

   /* iPage PUBLIC CLASS DEFINITION
  * ================================== */
  var iPage = function (element) {
    this.init(element);
  }

  iPage.prototype = {
    constructor: iPage,
    init: function (element) {
      var self = this;
        this.$element = element;
        this.backArray = [];
        this.$activePanel = $(element).children('.active-panel');
        //console.log(self.$activePanel)

        this.$element.on('click.go', '.ipage-panel .go-btn', function (event) {
                var $thisBtn = $(this)
                  , targetId = $thisBtn.attr('href') || $thisBtn.data('target')
                  , $target = $(targetId)

        self.$activePanel.addClass('back-panel');
        $target.addClass('active-panel');
        self.$activePanel.removeClass('active-panel');
        self.backArray.push(self.$activePanel);
        self.$activePanel = $target;
        console.log('activePanel:')
        console.log(self.$activePanel)
          event.preventDefault();
        });

        this.$element.on('click.back', '.ipage-panel .back-btn', function (event) {
                var $thisBtn = $(this);
          var $backPanel = self.backArray.pop();

          $backPanel.addClass('active-panel');
          self.$activePanel.removeClass('active-panel');
          $backPanel.removeClass('back-panel');
          self.$activePanel = $backPanel;
          event.preventDefault();
        });
    }
  }

  $.fn.ipage = function (options) {
    return this.each(function () {
      var newIpage = new iPage($(this));
    });
  }
})(window.jQuery);