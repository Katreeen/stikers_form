$(document).ready(function(){
var limit = 40;
$('div[contenteditable]').keypress(function() {
  return this.innerHTML.length < limit;
}).on({
  'paste': function(e) {
    var len = this.innerHTML.length,
      cp = e.originalEvent.clipboardData.getData('text');
    if (len < limit)
      this.innerHTML += cp.substring(0, limit - len);
    return false;
  },
  'drop': function(e) {
    e.preventDefault();
    e.stopPropagation();
  }
});

  $('input[type="checkbox"]').change(function(){
    var numberInput = $(this).closest('.form-check').find('input[type="number"]');
    if ($(this).is(':checked')) {
      textarea.focus();
      numberInput.prop('disabled', false);
      numberInput.val(1);
    } else {
      numberInput.prop('disabled', true);
      numberInput.val(0);
    }
  });

  $('.chek_btn a').click(function(e){
    e.preventDefault();
    var numberInput = $(this).parent().find('input[type="number"]');
    if (numberInput.is(':disabled')) {
      return;
    }
    var value = parseInt(numberInput.val()) || 1;
    if ($(this).hasClass('up')) {
      value = value + 1;
    } else {
      value = value - 1;
    }

    if (value < 1) {
      value = 1;
    }
    if (value > 5) {
      value = 1;
    }
    numberInput.val(value);
  })

  $('.submit_btn').on("click", function() {
    var name = $("#name").val();
    var textarea = $("#textarea").text();

    if (!$('input[type="checkbox"]').filter(':checked').length) {
      alert('Ничего не выбрано.');
      return;
    }

    if ( name=="" ) {
      alert('Введите имя.');
      return;
    };

    if ( textarea == "" && $('#defaultCheck5').is(':checked') ) {
      alert('Введите свою фразу.');
      return;
    };
     alert('Спасибо! Твой стикер будет готов через 30 минут. Забрать можно на этом же месте.');
    //html2canvas(document.querySelector("body")).then(canvas => {
    html2canvas(document.querySelector("body")).then(function(canvas) {
      var data = canvas.toDataURL('image/png');
      // console.log(data);
      // return;
      var image = new Image();
      image.src = data;
      var image_src = image.src;

      $.ajax({
        type: "POST",
        crossDomain : true,
        dataType: 'json',
        url: "ordercall.php",
        data: $('.main_form').serialize() + "&image="+image_src+"&textarea="+textarea,
        beforeSend: function() {$('#loader').show();},
        complete: function() {$('#loader').hide();},
        success: function(res){
          console.log(res);
          // alert(res.text);
          window.location.reload()
        },
        fail: function(res) {
          console.log("fail");
        }
      });
    });


  });

})