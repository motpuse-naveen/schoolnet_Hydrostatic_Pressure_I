
var click = {};
var waterlevelintank = 7;
var previousPosition;
var ltubelevel = 128;
var rtubelevel = 128;
var direction;
var depttext = 0;
var height1;
var height2;
var density1;
var density2;
var total;
var speed1;
var timestamp = 0;
var mY = 0;
var last1;
// let repeatDiv = false;
$(document).mousemove(function (e) {
  var now = Date.now();
  currentmY = e.screenY;

  var dt = now - timestamp;
  var distance = Math.abs(currentmY - mY);
  var speed = Math.round(distance / dt * 1000);
  // console.log(dt, distance, speed);
  speed1 = speed;

  mY = currentmY;
  timestamp = now;
});

$(".mcPanel").draggable({
  axis: "y",
  cursor: "move",
  start: function (e, ui) {
    //click.y = e.clientY;
  },
  drag: function (e, ui) {
    $(this).css("z-index", "1");
    //var original = ui.originalPosition;
    //console.log(click.y)
    //console.log(zoom)
    //last1 = (e.pageY - click.y + original.top) / zoom;
    //var actualTop = ui.position.top;
    ui.position.top = ui.position.top / zoom
    ui.position.left = ui.position.left / zoom
    if (ui.position.top < Math.max(88, ui.position.top)) {
      ui.position.top = Math.max(88, ui.position.top);
    }
    if (ui.position.top > Math.min(270, ui.position.top)) {
      ui.position.top = Math.min(270, ui.position.top);
    }
    $('.mcTube').css('height', ui.position.top - 47 + 'px');
    console.log(ui.position.top)
    //depthttext = (125 - (250-(ui.position.top))).toFixed(2);
    depthttext = Number((125 - (250 - (ui.position.top))).toFixed(2));
    if (depthttext <= 0) {
      depthttext = 0;
      total = 0;
    }
    HeightManometer = (Tank1Den / Tube1Den) * depthttext;
    heighttext = Number(HeightManometer.toFixed(2));
    $('.depthText').text(depthttext);
    $('.heighttext').text(heighttext);
    density1 = $('.ringDiameterText').text();
    $('.height1').text(heighttext);
    $('.density1').text(density1);
    $('.height2').text(depthttext);
    if (depthttext <= 0) {
      total = 0
    }
    else {
      total = Number(((heighttext * density1) / depthttext).toFixed(2));
    }
    $('.calcu1').text(total);
    if (heighttext > 0) {
      $('.mcLeftLiquid').css('height', (126) + (ui.position.top / 35) + 'px');
      $('.mcRightLiquid').css('height', (131) - (ui.position.top / 35) + 'px');
      if (ui.position.top < 149) {
        var mcTankLiquidHeight1 = (ui.position.top + 40);
        $('.mcTankLiquid').css('height', mcTankLiquidHeight1 + 'px');
      }
    }
    else {
      $('.mcLeftLiquid').css('height', (128) + 'px');
      $('.mcRightLiquid').css('height', (128) + 'px');
      $('.mcTankLiquid').css('height', (164) + 'px');
    }
    /*
    if (last1 <= 88) {
      ui.position = {
        left: 351,
        top: 88
      };
      $('.mcTube').css('height', ui.position.top - 45 + 'px');
    } else if (last1 >= 270) {
      ui.position = {
        left: 351,
        top: 270
      };
      $('.mcTube').css('height', ui.position.top - 45 + 'px');
    } else {
      $('.mcTube').css('height', last1 - 45 + 'px');


      depthttext = (126 - (250 - (ui.position.top / zoom))).toFixed(2);

      if (last1 < 125) {
        depthttext = 0;
        total = 0;
      }

      HeightManometer = (Tank1Den / Tube1Den) * depthttext;
      if (last1 < 125) {
        heighttext = 0;
        total = 0;
      } else {
        heighttext = HeightManometer.toFixed(2);
      }

      $('.heighttext').text(heighttext);
      $('.depthText').text(depthttext);
      density1 = $('.ringDiameterText').text();
      $('.height1').text(heighttext);
      $('.density1').text(density1);
      $('.height2').text(depthttext);
      if (last1 < 125) {
        heighttext = 0;
        total = 0;
      } else {
        total = ((heighttext * density1) / depthttext).toFixed(2);
      }

      $('.calcu1').text(total);

      if (ui.position.top > 134 && ui.position.top < 292) {
        if (heighttext > 0) {
          height1 = heighttext;
          density1 = $('.ringDiameterText').text();
          height2 = depthttext;
          $('.height1').text(height1);
          $('.density1').text(density1);
          $('.height2').text(height2);
          total = ((height1 * density1) / height2).toFixed(2);
          $('.calcu1').text(total);
        }

        $('.mcLeftLiquid').css('height', (126) + (ui.position.top / 35) + 'px');
        $('.mcRightLiquid').css('height', (131) - (ui.position.top / 35) + 'px');

        if (ui.position.top < 155) {
          var mcTankLiquidHeight1 = (ui.position.top + 30);
          $('.mcTankLiquid').css('height', mcTankLiquidHeight1 + 'px');

        }

      } else {
        $('.mcLeftLiquid').css('height', (128) + 'px');
        $('.mcRightLiquid').css('height', (128) + 'px');
        $('.mcTankLiquid').css('height', (164) + 'px');
      }
      ui.position = {
        left: 351,
        top: last1
      };
    }
    */
  },
});

var procedCount = 1;
$('.prevProcd').on('click', function () {
  if (procedCount > 2) {
    procedCount--;
    $('.prevProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
    $('.nextProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
  } else {
    procedCount = 1;
    $('.prevProcd').css({ 'opacity': '0.5', 'pointer-events': 'none' });
  }
  $('.procedSteps').css('display', 'none');
  $('.procedSteps' + procedCount).css('display', 'block');
  $('.procdNum').text(procedCount + ")");
});

$('.nextProcd').on('click', function () {
  if (procedCount < 5) {
    procedCount++;
    $('.nextProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
    $('.prevProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
  } else {
    procedCount = 6;
    $('.nextProcd').css({ 'opacity': '0.5', 'pointer-events': 'none' });
  }
  $('.procedSteps').css('display', 'none');
  $('.procedSteps' + procedCount).css('display', 'block');
  $('.procdNum').text(procedCount + ")");
});

$('.closeProcd').on('mouseover', function () {
  $('.closeProcd').addClass('closeProcdAfter');
  $('.closeProcd').removeClass('closeProcdBefore');
  $('.closeProcd').attr('src', 'assets/images/closeProd.gif').css('cursor', 'pointer');
});
$('.closeProcd').on('mouseout', function () {
  $('.closeProcd').addClass('closeProcdBefore');
  $('.closeProcd').removeClass('closeProcdAfter');
  $('.closeProcd').attr('src', 'assets/images/closeUp.png');
});

$('.procdClick').on('mouseover', function () {
  $('.procdClick').attr('src', 'assets/images/procdHover.gif');
  $('.procdClick').css('cursor', 'pointer');
});
$('.procdClick').on('mouseout', function () {
  $('.procdClick').attr('src', 'assets/images/procdClick.png');
});

$('.procdClick').on('click', function () {
  $(this).css('display', 'none');
  $('.procdAnim').attr('src', 'assets/images/procedure.gif').css('display', 'block');
  setTimeout(() => {
    $('.mainProcdiv').css('display', 'block');
  }, 3800);
});

$('.closeProcd').on('click', function () {
  $('.mainProcdiv').css('display', 'none');
  $('.procdAnim').attr('src', 'assets/images/closeProcdiv.gif').css('display', 'block');
  setTimeout(() => {
    $('.procdAnim').css('display', 'none');
    $('.procdClick').css('display', 'block');
  }, 2000);
});

$('.closeProcd').on('mouseover', function () {
  $('.closeProcdTxt').css('display', 'block');
});

$('.closeProcd').on('mouseout', function () {
  $('.closeProcdTxt').css('display', 'none');
});

$('.showObj').on('mouseover', function () {
  $(this).attr('src', 'assets/images/showObj.gif').css('cursor', 'pointer');
  if (procedCount == 1) {
    $('.cover1').css('display', 'block').css('opacity', '1');
    $('.tubeHighlighted').css('opacity', '0.7');
    $('.mcTube').css({ 'opacity': '0.1', 'filter': 'brightness(2)' });
    $('.mcPanel').css('opacity', '0.2');
    $('.contentImgDiv, .utubeliquid, .mcRightLiquid, .mcLeftLiquid, .calculatorDiv, .repeatDiv, .repeatText, .ballDiameterDiv, .pressureContainerImg,.bolts').css('opacity', '0.3');
  }
  if (procedCount == 2) {
    $('.mcPanel,.mcTube').css('display', 'block').css('opacity', '1');
    $('.tubeHighlighted').css('opacity', '0.6');
    $('.mcTankLiquid').css('opacity', '0.2');
    $('.cover1, .tankLiquidBtm, .contentImgDiv, .utubeliquid, .mcRightLiquid, .mcLeftLiquid, .calculatorDiv, .repeatDiv, .repeatText, .ballDiameterDiv, .pressureContainerImg,.bolts').css('opacity', '0.3');
  }
  if (procedCount == 3) {
    $('.utube,.mcLeftLiquid,.mcRightLiquid,.utubeliquid,.contentImgDiv,.heighttext').css('opacity', '1');
    $('.depthDivDup, .densityDivDup').css('opacity', '0.6');
    $('.heightDivDup').css('opacity', '0');
    $('.mcTube, .mcPanel, .mcTube, .calculatorDiv, .repeatDiv, .repeatText,.ringDiameterDiv,.depthText, .pressureContainerImg, .cover1,.mcTankLiquid,.bolts,.tankLiquidBtm').css('opacity', '0.3');
  }
  if (procedCount == 4) {
    $('.utube,.mcLeftLiquid,.mcRightLiquid,.utubeliquid,.mcPanel,.mcTube,.cover1,.contentImgDiv,.depthText').css('opacity', '1');
    $('.calculatorDiv, .repeatDiv, .repeatText, .pressureContainerImg,.bolts').css('opacity', '0.3');
  }
  if (procedCount == 5) {
    $('.calculatorDiv').css('opacity', '1');
    $('.cover1,.utube,.mcTube, .mcPanel, .contentImgDiv, .mcRightLiquid, .mcLeftLiquid, .pressureContainerImg, .mcTankLiquid, .mcTube, .repeatDiv, .repeatText, .ballDiameterDiv,.utubeliquid,.bolts,.tankLiquidBtm').css('opacity', '0.3');
  }
  if (procedCount == 6) {
    $(' .repeatDiv').css('opacity', '1');
    $('.mcTube, .mcPanel, .contentImgDiv, .mcRightLiquid, .mcLeftLiquid, .pressureContainerImg, .mcTankLiquid, .mcTube, .calculatorDiv, .ballDiameterDiv,.utubeliquid,.cover1,.utube,.bolts,.repeatText,.tankLiquidBtm').css('opacity', '0.3');
  }
});

$('.showObj').on('mouseout', function () {
  $(this).attr('src', 'assets/images/showObjM.gif');
  $('.mcTube').css({ 'filter': 'brightness(1)' });
  $('.depthDivDup, .densityDivDup,.heightDivDup,.tubeHighlighted').css('opacity', '0');
  $('.cover1,.mcTube, .utube,.mcPanel, .contentImgDiv, .mcRightLiquid, .mcLeftLiquid, .pressureContainerImg, .mcTankLiquid, .mcTube, .calculatorDiv, .repeatDiv, .repeatText, .ballDiameterDiv,.utubeliquid,.bolts,.tankLiquidBtm,.ballDiameterText').css('opacity', '1');
});

// calculations script

$('.calculatorDiv').on('click', function () {
  $('.calculations').css('display', 'block');
});
$('.calclose').on('click', function () {
  $('.calculations').css('display', 'none');
});
$('.calculationsDivDragHeader').draggable({
  start: function (e) {
    click.x = e.clientX;
    click.y = e.clientY;
  },
  drag: function (e, ui) {
    var original = ui.originalPosition;
    var last = (e.pageX - click.x + original.left) / zoom;
    var last1 = (e.pageY - click.y + original.top) / zoom;
    if (last < 0 && last1 < -30) {
      ui.position = {
        left: 0,
        top: -30
      };
      $('.calculations').css({ top: -30, left: 0 });
    } else if (last > 545 && last1 < -30) {
      ui.position = {
        left: 545,
        top: -30
      };
      $('.calculations').css({ top: -30, left: 545 });
    } else if (last < 0 && last1 > 148) {
      ui.position = {
        left: 0,
        top: -30
      };
      $('.calculations').css({ top: 148, left: 0 });
    } else if (last > 545 && last1 > 148) {
      ui.position = {
        left: 545,
        top: -30
      };
      $('.calculations').css({ top: 148, left: 545 });
    } else if (last < 0) {
      ui.position = {
        left: 0,
        top: last1
      };
      $('.calculations').css({ top: last1, left: 0 });
    } else if (last > 545) {
      ui.position = {
        left: 545,
        top: last1
      };
      $('.calculations').css({ top: last1, left: 545 });
    } else if (last1 < -30) {
      ui.position = {
        left: last,
        top: -30
      };
      $('.calculations').css({ top: -30, left: last });
    } else if (last1 > 148) {
      ui.position = {
        left: last,
        top: 148
      };
      $('.calculations').css({ top: 148, left: last });
    } else {
      ui.position = {
        left: last,
        top: last1
      };
      $('.calculations').css({ top: last1, left: last });
    }
  },
});

//repeat scripts

$('.repeatDiv').on('click', function () {
  // repeatDiv = true;
  $('.heighttext,.depthText').text('0');
  $('.mcTube').css('height', '41px');
  $('.mcPanel').css('top', '88px');
  $('.mcTankLiquid').css('height', '164px');
  $('.mcLeftLiquid,.mcRightLiquid').css('height', '128px');
  height1 = "";
  density1 = "";
  height2 = "";
  total = "";
  $('.height1').text(height1);
  $('.density1').text(density1);
  $('.height2').text(height2);
  $('.calcu1').text(total);

  CallArray();
});

//Worksheet Func starts
$('#workSheetDiv').on('click', function () {
  $('#file-input').trigger('click');
});
function OpenWord() {
  var mylink = document.getElementById("MyLink");
  mylink.setAttribute("href", "assets/docs/manometer1_word.doc");
  mylink.click();
}

//====//
var My_array = new Array(1.59, 0.737, 1, 1.26, 0.81);
var Tube1Den = 13.6;
var Tank1Den;
var arrayNumber = 0;
//
//
function CallArray() {
  if (arrayNumber <= 4) {
    Tank1Den = My_array[arrayNumber];
    // console.log("CALL ARRAY = " + Tank1Den);
    arrayNumber++;
  } else {
    arrayNumber = 0;
  }
}

CallArray();