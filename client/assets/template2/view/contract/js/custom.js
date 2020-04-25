var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

$("#EngagementPhotoService").on('change',function(){
    // console.log($(this).prop('checked'))
   if ($(this).prop('checked')) {
     $('#FormEngagementPhotoService').show();
     $('#BtnAddEngagementPhotoService').removeAttr('style');
     $('#BtnDelEngagementPhotoService').removeAttr('style');
   }else{
     $('#FormEngagementPhotoService').hide();
     $('#BtnAddEngagementPhotoService').css('display','none');
     $('#BtnDelEngagementPhotoService').css('display','none');
   }
})

$("#PhotoboothService").on('change',function(){
  // console.log($(this).prop('checked'))
 if ($(this).prop('checked')) {
   $('#FormPhotoboothService').show();
   $('#BtnAddPhotoboothService').removeAttr('style');
   $('#BtnDelPhotoboothService').removeAttr('style');
 }else{
   $('#FormPhotoboothService').hide();
   $('#BtnAddPhotoboothService').css('display','none');
   $('#BtnDelPhotoboothService').css('display','none');
 }
})

$("#WeddingPhoto").on('change',function(){
  // console.log($(this).prop('checked'))
 if ($(this).prop('checked')) {
   $('#FormWeddingPhoto').css('display','block');
   $('#BtnAddWeddingPhoto').removeAttr('style');
   $('#BtnDelWeddingPhoto').removeAttr('style');
 }else{
   $('#FormWeddingPhoto').hide();
   $('#BtnAddWeddingPhoto').css('display','none');
   $('#BtnDelWeddingPhoto').css('display','none');
 }
})

$("#WeddingVideo").on('change',function(){
  // console.log($(this).prop('checked'))
 if ($(this).prop('checked')) {
   $('#FormWeddingVideo').show();
   $('#BtnAddWeddingVideo').removeAttr('style');
   $('#BtnDelWeddingVideo').removeAttr('style');
 }else{
   $('#FormWeddingVideo').hide();
   $('#BtnAddWeddingVideo').css('display','none');
   $('#BtnDelWeddingVideo').css('display','none');
 }
})

$("#Products").on('change',function(){
  // console.log($(this).prop('checked'))
 if ($(this).prop('checked')) {
   $('#FormProducts').show();
   $('#album_10_10_qty1').attr('checked',true);
 }else{
   $('#FormProducts').hide();
   $('#album_10_10_qty1').attr('checked',false);
 }
})

$('.select2-blank').select2({
  theme: 'bootstrap4',
  placeholder: "Select One"
 })
 $('.getClient').select2({
  theme: 'bootstrap4',
  placeholder: "Client",
    
    ajax: {
      url: api_url+"c_contract/getClient",
      dataType: 'json',
      type: "POST",
      quietMillis: 50,
      data: function (term) {
          return {
              term: term.term
          };
      },
      processResults: function (data) {
        return {
          results: data
        };
      }
  }
 })

 $('.getContract').select2({
  theme: 'bootstrap4',
  placeholder: "Contract",
    
    ajax: {
      url: api_url+"c_contract/getContract",
      dataType: 'json',
      type: "POST",
      quietMillis: 50,
      data: function (term) {
          return {
              term: term.term
          };
      },
      processResults: function (data) {
        return {
          results: data
        };
      }
  }
 })

$(document).ready(function(){
  $(".amounts").each(function() {
    $(this).keyup(function(){
      calculateSum();
    });
  });
});
function calculateSum() {
  var sum = 0;
  $(".amounts").each(function() {
    if(!isNaN(this.value) && this.value.length!=0) {
      sum += parseFloat(this.value);
    }
  });
  $("#sum").val(sum.toFixed(2));
}

$(document).ready(function() {
  $('.js-example-basic-single').select2({theme: 'bootstrap4'});
});

$(function(){
  function cb(start, end) {
    $('.datepicker').html(start.format('DD-MM-YYYY'));
  }
  cb(moment());

  $('.datepicker').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    locale: {
              "format": "DD-MM-YYYY hh:mm:ss",
            },
    minYear: 2000,
    maxYear: parseInt(moment().format('YYYY'),10)
  }, cb);
})

jQuery.fn.serializeObject = function () {
  var arrayData, objectData;
  arrayData = this.serializeArray();
  objectData = {};

  $.each(arrayData, function () {
      var value;

      if (this.value != null) {
          value = this.value;
      } else {
          value = '';
      }

      if (objectData[this.name] != null) {
          if (!objectData[this.name].push) {
              objectData[this.name] = [objectData[this.name]];
          }

          objectData[this.name].push(value);
      } else {
          objectData[this.name] = value;
      }
  });

  return objectData;
};

function BtnSaveAll(){
  var formObj = $('#FormAddContract').serializeObject();
  var hitung = ($("input[name='EngagementDate[]']",'#FormAddContract').val()).length;
  var DataJawaban = [];
  for(var i=0; i < 1; i++){
      var tambahin = i+1;
      DataJawaban.push({
          "engangement_date": $("input[name='EngagementDate[]']",'#FormAddContract').val(),
          "engangement_time": "10:20:00",
          "engagement_photo_session_duration": $("input[name='IdEngagementPhotoSessionDuration[]']",'#FormAddContract').val(),
          "engagement_photographer_qty": $("input[name='PhotographerQty["+tambahin+"]']:checked:enabled",'#FormAddContract').val(),
      });
  }
  var obj_json = JSON.stringify(DataJawaban);
  console.log(obj_json)
  var settings = {
      "url": "http://localhost/amin/photography/api/c_contract/store",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": $(this).serialize(),
      "dataType":'json'
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  
}

$(function(){
  $("form#FormAddContract").on('submit',function(e){
    e.preventDefault();
    $.ajax({
      url:$(this).attr('action'),
      type:'post',
      data:$(this).serialize(),
      dataType:'json',
      beforeSend:function(r,s){
        $('div#buttonsubmit').html('<button class="btn btn-primary btn-block" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> &nbsp;Loading...</button>');
      },
      success:function(data){
        alert('Berhasil simpan data');
        $('#FormAddContract')[0].reset();
        $('#FormEngagementPhotoService').hide();
        $('#FormPhotoboothService').hide();
        $('#FormWeddingPhoto').hide();
        $('#FormWeddingVideo').hide();
        $('#FormProducts').hide();

        $('#BtnAddEngagementPhotoService').css('display','none');
        $('#BtnDelEngagementPhotoService').css('display','none');
        $('#BtnAddPhotoboothService').css('display','none');
        $('#BtnDelPhotoboothService').css('display','none');
        $('#BtnAddWeddingPhoto').css('display','none');
        $('#BtnDelWeddingPhoto').css('display','none');
        $('#BtnAddWeddingVideo').css('display','none');
        $('#BtnDelWeddingVideo').css('display','none');

        if(data.status){
          //location.replace(ui_url+"payment/c_payment");
        }
        $('div#buttonsubmit').html('<button type="submit" id="submit" class="btn btn-primary btn-block">Submit</button>');
      },
      error:function(j,r,e){
        alert(JSON.stringify(j) +' : '+ e);
        //alert('Masih ada yang kosong');
        $('div#buttonsubmit').html('<button type="submit" id="submit" class="btn btn-primary btn-block">Submit</button>');
      }
    })
  })
})
TabelList();
//////// START SECTION TABEL LIST ///////////
function TabelList(){
  var TableContract = $('#TableContract').DataTable({
    "paging": true,
    "searching": true,
    "ordering": true,
    "info": true,
    "pageLength": 10,
    "lengthChange": true,
    "scrollX": true,
    "processing": true,
    "ajax": {
        "url": base_url + "c_contract/retrieveData",
        "method": 'GET',
        "beforeSend": function (xhr) {
        },
        "dataSrc": function (json) {
            if (json.Data == null) {
                swal({ title: 'Gagal Menampilkan Data Contract', text: json.ReturnMessage, confirmButtonClass: 'btn-danger text-white', confirmButtonText: 'Oke, Mengerti', type: 'error' });
                return json;
            } else {
                return json.Data;
            }
        }
    },
    columnDefs: [
        { targets: [0], width: "30%", visible: true },
        { targets: [1], width: "15%", visible: true },
        { targets: [2], width: "15%", visible: true },
        { targets: [3], width: "15%", visible: true },
        { targets: [4], width: "15%", visible: true },
        { targets: [5], width: "15%", visible: true },
        { targets: [6], width: "15%", visible: true },
    ],
    "columns": [
        {
            "data": "idkontrak",
            "render": function (data, type, full, meta) {
                var BtnEdit = '<button type="button" class="btn btn-success btn-sm" onclick="edit('+full.idkontrak+')"><i class="fas fa-pencil-alt"></i> Edit</button>&nbsp;&nbsp; '+
                '<button type="button" class="btn btn-primary btn-sm" onclick="detailData('+full.idkontrak+')"><i class="fa fa-eye"></i> View</button>&nbsp;&nbsp; '+
                '<button type="button" class="btn btn-danger btn-sm" onclick="deleteData('+full.idkontrak+')"><i class="fa fa-times"></i> Delete</button>';
                //var BtnEdit = '<a href="'+base_url+'c_contract/detail/'+full.idkontrak+'" class="btn btn-primary btn-sm"><i class="fa fa-pencil"></i> Detail</a>&nbsp;&nbsp;';
                data = BtnEdit;
                return data;
            }
        },
        { "data": "person1_full_name" },
        { "data": "person2_full_name" },
        { "data": "grand_total",
            "render": function (data, type, full, meta) {
              var grand_total = formatter.format(full.grand_total)
              //var BtnEdit = '<a href="'+base_url+'c_contract/detail/'+full.idkontrak+'" class="btn btn-primary btn-sm"><i class="fa fa-pencil"></i> Detail</a>&nbsp;&nbsp;';
              data = grand_total;
              return data;
            }
        },
        { "data": "sisapayment",
            "render": function (data, type, full, meta) {
              var sisapayment = formatter.format(full.sisapayment)
              //var BtnEdit = '<a href="'+base_url+'c_contract/detail/'+full.idkontrak+'" class="btn btn-primary btn-sm"><i class="fa fa-pencil"></i> Detail</a>&nbsp;&nbsp;';
              data = sisapayment;
              return data;
            }
        },
        { "data": "totalpayment",
            "render": function (data, type, full, meta) {
              var totalpayment = formatter.format(full.totalpayment)
              //var BtnEdit = '<a href="'+base_url+'c_contract/detail/'+full.idkontrak+'" class="btn btn-primary btn-sm"><i class="fa fa-pencil"></i> Detail</a>&nbsp;&nbsp;';
              data = totalpayment;
              return data;
            }
        },
        { "data": "status" }
    ],
    "bDestroy": true
  });
  TableContract.columns().every(function () {
    var that = this;
  
    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
  });
}

//////// START SECTION TABEL USER ///////////

function AddPlans(param){
  if(param == "PaymentPlans"){ // PaymentPlans
    var tableID = "TablePaymentPlans";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    
    var element1 = 
    '<td>'+
    '  <div class="col-md-12">'+
    '    <div class="form-group"><input type="hidden" name="id_payments_plan['+rowCount+']" class="form-control" value="0" required>'+
    '    <input type="number" name="amount_payment['+rowCount+']" class="form-control" placeholder="$1.000,00" required>'+
    '    </div>'+
    '  </div>'+
    '</td>'+
    '<td>'+
    '  <div class="col-md-12">'+
    '    <div class="form-group">'+
    '      <input type="date" name="due_date['+rowCount+']" class="form-control" required>'+
    '    </div>'+
    '  </div>      '+
    '</td> ';
    row.innerHTML = element1; 
  } else if(param == "EngagementPhotoService"){ // EngagementPhotoService
    var tableID = "TableEngagementPhotoService";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var element1 = 
    '<td>'+
    '    <div class="col-md-12"><input type="hidden" name="engangement_id['+rowCount+']" class="form-control" value="0" required>'+
    '    <label for="" class="control-label">Date <span style="color:red" >*</span></label>'+
    '    <input type="date" name="engangement_date['+rowCount+']" class="form-control" placeholder="Engagement Date" required>'+
    '    </div>'+
    '</td>'+
    '<td>'+
    '    <div class="col-md-12">'+
    '    <label for="" class="control-label">Duration <span style="color:red" >*</span></label>'+
    '    <select name="engagement_photo_session_duration['+rowCount+']" class="form-control select2-blank" style="width: 100%;"> '+
    '        <option value="1">1 Hours</option>'+
    '        <option value="2">2 Hours</option>'+
    '        <option value="3">3 Hours</option>'+
    '        <option value="4">4 Hours</option>'+
    '        <option value="5">5 Hours</option>'+
    '        <option value="6">6 Hours</option>'+
    '        <option value="7">7 Hours</option>'+
    '        <option value="8">8 Hours</option>'+
    '        <option value="9">9 Hours</option>'+
    '        <option value="10">10 Hours</option>'+
    '        <option value="11">11 Hours</option>'+
    '        <option value="12">12 Hours</option>'+
    '        <option value="12">13 Hours</option>'+
    '        <option value="12">14 Hours</option>'+
    '    </select>'+
    '    </div>'+
    '    </td>'+
    '<td>'+
    '    <div class="col-md-12">'+
    '    <label for="" class="control-label">Photographer Qty <span style="color:red" >*</span></label>'+
    '    <div class="form-group clearfix">'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="1" id="PhotographerQtyz'+rowCount+'" name="engagement_photographer_qty['+rowCount+']" checked="">'+
    '        <label for="PhotographerQtyz'+rowCount+'">'+
    '        1'+
    '        </label>'+
    '        </div>'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="2" id="PhotographerQtyx'+rowCount+'" name="engagement_photographer_qty['+rowCount+']">'+
    '        <label for="PhotographerQtyx'+rowCount+'">'+
    '        2'+
    '        </label>'+
    '        </div>'+
    '    </div>'+
    '    </div>'+
    '</td> ';
    row.innerHTML = element1; 
  } else if(param == "PhotoboothService"){ // PhotoboothService
    var tableID = "TablePhotoboothService";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    
    var element1 = 
    '<td>'+
    '    <div class="col-md-12"><input type="hidden" name="photobooth_id['+rowCount+']" class="form-control" value="0" required>'+
    '    <label for="" class="control-label">Date <span style="color:red" >*</span></label>'+
    '    <input type="date" name="photobooth_date['+rowCount+']" class="form-control" placeholder="Engagement Date" required>'+
    '    </div>'+
    '</td>'+
    '<td>'+
    '    <div class="col-md-12">'+
    '    <label for="" class="control-label">Duration <span style="color:red" >*</span></label>'+
    '    <select name="photobooth_duration['+rowCount+']" class="form-control select2-blank" style="width: 100%;"> '+
    '        <option value="1">1 Hours</option>'+
    '        <option value="2">2 Hours</option>'+
    '        <option value="3">3 Hours</option>'+
    '        <option value="4">4 Hours</option>'+
    '        <option value="5">5 Hours</option>'+
    '        <option value="6">6 Hours</option>'+
    '        <option value="7">7 Hours</option>'+
    '        <option value="8">8 Hours</option>'+
    '        <option value="9">9 Hours</option>'+
    '        <option value="10">10 Hours</option>'+
    '        <option value="11">11 Hours</option>'+
    '        <option value="12">12 Hours</option>'+
    '        <option value="12">13 Hours</option>'+
    '        <option value="12">14 Hours</option>'+
    '    </select>'+
    '    </div>'+
    '    </td>'+
    '<td>'+
    '    <div class="col-md-12">'+
    '    <label for="" class="control-label">Photobooth Style <span style="color:red" >*</span></label>'+
    '    <div class="form-group clearfix">'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="1" id="PhotoboothStylez'+rowCount+'" name="photobooth_style['+rowCount+']" checked="">'+
    '        <label for="PhotoboothStylez'+rowCount+'">'+
    '        open air booth'+
    '        </label>'+
    '        </div>'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="2" id="PhotoboothStylex'+rowCount+'" name="photobooth_style['+rowCount+']">'+
    '        <label for="PhotoboothStylex'+rowCount+'">'+
    '        enclosed booth'+
    '        </label>'+
    '        </div>'+
    '    </div>'+
    '    </div>'+
    '</td> ';
    row.innerHTML = element1; 
  } else if(param == "WeddingPhoto"){ // WeddingPhoto
    var tableID = "TableWeddingPhoto";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var element1 = 
    '<td>'+
    '    <div class="col-md-12"><input type="hidden" name="wedding_photo_id['+rowCount+']" class="form-control" value="0" required>'+
    '    <label for="" class="control-label">Date <span style="color:red" >*</span></label>'+
    '    <input type="date" name="wedding_photo_date['+rowCount+']" class="form-control" placeholder="Engagement Date" required>'+
    '    </div>'+
    '</td>'+
    '<td>'+
    '    <div class="col-md-12">'+
    '    <label for="" class="control-label">Duration <span style="color:red" >*</span></label>'+
    '    <select name="wedding_photo_duration['+rowCount+']" class="form-control select2-blank" style="width: 100%;"> '+
    '        <option value="1">1 Hours</option>'+
    '        <option value="2">2 Hours</option>'+
    '        <option value="3">3 Hours</option>'+
    '        <option value="4">4 Hours</option>'+
    '        <option value="5">5 Hours</option>'+
    '        <option value="6">6 Hours</option>'+
    '        <option value="7">7 Hours</option>'+
    '        <option value="8">8 Hours</option>'+
    '        <option value="9">9 Hours</option>'+
    '        <option value="10">10 Hours</option>'+
    '        <option value="11">11 Hours</option>'+
    '        <option value="12">12 Hours</option>'+
    '        <option value="12">13 Hours</option>'+
    '        <option value="12">14 Hours</option>'+
    '    </select>'+
    '    </div>'+
    '    </td>'+
    '<td>'+
    '    <div class="col-md-12">'+
    '    <label for="" class="control-label">Wedding Photographer Qty <span style="color:red" >*</span></label>'+
    '    <div class="form-group clearfix">'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="1" id="WeddingPhotoQtyz'+rowCount+'" name="wedding_photo_photographer_qty['+rowCount+']" checked="">'+
    '        <label for="WeddingPhotoQtyz'+rowCount+'">'+
    '        1'+
    '        </label>'+
    '        </div>'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="2" id="WeddingPhotoQtyx'+rowCount+'" name="wedding_photo_photographer_qty['+rowCount+']">'+
    '        <label for="WeddingPhotoQtyx'+rowCount+'">'+
    '        2'+
    '        </label>'+
    '        </div>'+
    '    </div>'+
    '    </div>'+
    '</td> ';
    row.innerHTML = element1; 
  } else if(param == "WeddingVideo"){ //WeddingVideo
    var tableID = "TableWeddingVideo";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var element1 = 
    '<td>'+
    '<div class="col-md-12"><input type="hidden" name="wedding_video_id['+rowCount+']" class="form-control" value="0" required>'+
    '    <label for="" class="control-label">Date <span style="color:red" >*</span></label>'+
    '    <input type="date" name="wedding_video_date['+rowCount+']" class="form-control" placeholder="Engagement Date" required>'+
    '</div>'+
    '</td>'+
    '<td>'+
    '<div class="col-md-12">'+
    '    <label for="" class="control-label">Duration <span style="color:red" >*</span></label>'+
    '    <select name="wedding_video_duration['+rowCount+']" class="form-control select2-blank" style="width: 100%;"> '+
    '    <option value="1">1 Hours</option>'+
    '    <option value="2">2 Hours</option>'+
    '    <option value="3" selected>3 Hours</option>'+
    '    <option value="4">4 Hours</option>'+
    '    <option value="5">5 Hours</option>'+
    '    <option value="6">6 Hours</option>'+
    '    <option value="7">7 Hours</option>'+
    '    <option value="8">8 Hours</option>'+
    '    <option value="9">9 Hours</option>'+
    '    <option value="10">10 Hours</option>'+
    '    <option value="11">11 Hours</option>'+
    '    <option value="12">12 Hours</option>  '+
    '    <option value="12">13 Hours</option>   '+
    '    <option value="12">14 Hours</option>             '+
    '    </select>'+
    '</div>'+
    '</td>'+
    '<td>'+
    '<div class="col-md-12">'+
    '    <label for="" class="control-label">Videographer Qty <span style="color:red" >*</span></label>'+
    '    <div class="form-group clearfix">'+
    '    <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="1" id="WeddingVideographerQtyz'+rowCount+'" name="wedding_video_videographer_qty['+rowCount+']" checked="">'+
    '        <label for="WeddingVideographerQtyz'+rowCount+'">'+
    '        1'+
    '        </label>'+
    '    </div>'+
    '    <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="2" id="WeddingVideographerQtyx'+rowCount+'" name="wedding_video_videographer_qty['+rowCount+']">'+
    '        <label for="WeddingVideographerQtyx'+rowCount+'">'+
    '        2'+
    '        </label>'+
    '    </div>'+
    '    </div>'+
    '</div>'+
    '</td> '+
    '<td>'+
    '<div class="col-md-12">'+
    '    <label for="" class="control-label">Drone <span style="color:red" >*</span></label>'+
    '    <div class="form-group clearfix">'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="1" id="Dronez'+rowCount+'" name="wedding_video_drone['+rowCount+']" checked="">'+
    '        <label for="Dronez'+rowCount+'">'+
    '        yes'+
    '        </label>'+
    '        </div>'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="0" id="Dronex'+rowCount+'" name="wedding_video_drone['+rowCount+']">'+
    '        <label for="Dronex'+rowCount+'">'+
    '        no'+
    '        </label>'+
    '        </div>'+
    '    </div>'+
    '</div>'+
    '</td> ';
      row.innerHTML = element1;     
  } else if(param == "xEngagementPhotoService"){ // EngagementPhotoService
    var tableID = "xTableEngagementPhotoService";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var element1 = 
    '<td>'+
    '    <div class="col-md-12"><input type="hidden" name="engangement_id['+rowCount+']" class="form-control" value="0" required>'+
    '    <label for="" class="control-label">Date <span style="color:red" >*</span></label>'+
    '    <input type="date" name="engangement_date['+rowCount+']" class="form-control" placeholder="Engagement Date" required>'+
    '    </div>'+
    '</td>'+
    '<td>'+
    '    <div class="col-md-12">'+
    '    <label for="" class="control-label">Duration <span style="color:red" >*</span></label>'+
    '    <select name="engagement_photo_session_duration['+rowCount+']" class="form-control select2-blank" style="width: 100%;"> '+
    '        <option value="1">1 Hours</option>'+
    '        <option value="2">2 Hours</option>'+
    '        <option value="3">3 Hours</option>'+
    '        <option value="4">4 Hours</option>'+
    '        <option value="5">5 Hours</option>'+
    '        <option value="6">6 Hours</option>'+
    '        <option value="7">7 Hours</option>'+
    '        <option value="8">8 Hours</option>'+
    '        <option value="9">9 Hours</option>'+
    '        <option value="10">10 Hours</option>'+
    '        <option value="11">11 Hours</option>'+
    '        <option value="12">12 Hours</option>'+
    '        <option value="12">13 Hours</option>'+
    '        <option value="12">14 Hours</option>'+
    '    </select>'+
    '    </div>'+
    '    </td>'+
    '<td>'+
    '    <div class="col-md-12">'+
    '    <label for="" class="control-label">Photographer Qty <span style="color:red" >*</span></label>'+
    '    <div class="form-group clearfix">'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="1" id="PhotographerQtyz'+rowCount+'" name="engagement_photographer_qty['+rowCount+']" checked="">'+
    '        <label for="PhotographerQtyz'+rowCount+'">'+
    '        1'+
    '        </label>'+
    '        </div>'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="2" id="PhotographerQtyx'+rowCount+'" name="engagement_photographer_qty['+rowCount+']">'+
    '        <label for="PhotographerQtyx'+rowCount+'">'+
    '        2'+
    '        </label>'+
    '        </div>'+
    '    </div>'+
    '    </div>'+
    '</td> ';
    row.innerHTML = element1; 
  } else if(param == "xPhotoboothService"){ // PhotoboothService
    var tableID = "xTablePhotoboothService";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    
    var element1 = 
    '<td>'+
    '    <div class="col-md-12"><input type="hidden" name="photobooth_id['+rowCount+']" class="form-control" value="0" required>'+
    '    <label for="" class="control-label">Date <span style="color:red" >*</span></label>'+
    '    <input type="date" name="photobooth_date['+rowCount+']" class="form-control" placeholder="Engagement Date" required>'+
    '    </div>'+
    '</td>'+
    '<td>'+
    '    <div class="col-md-12">'+
    '    <label for="" class="control-label">Duration <span style="color:red" >*</span></label>'+
    '    <select name="photobooth_duration['+rowCount+']" class="form-control select2-blank" style="width: 100%;"> '+
    '        <option value="1">1 Hours</option>'+
    '        <option value="2">2 Hours</option>'+
    '        <option value="3">3 Hours</option>'+
    '        <option value="4">4 Hours</option>'+
    '        <option value="5">5 Hours</option>'+
    '        <option value="6">6 Hours</option>'+
    '        <option value="7">7 Hours</option>'+
    '        <option value="8">8 Hours</option>'+
    '        <option value="9">9 Hours</option>'+
    '        <option value="10">10 Hours</option>'+
    '        <option value="11">11 Hours</option>'+
    '        <option value="12">12 Hours</option>'+
    '        <option value="12">13 Hours</option>'+
    '        <option value="12">14 Hours</option>'+
    '    </select>'+
    '    </div>'+
    '    </td>'+
    '<td>'+
    '    <div class="col-md-12">'+
    '    <label for="" class="control-label">Photobooth Style <span style="color:red" >*</span></label>'+
    '    <div class="form-group clearfix">'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="1" id="PhotoboothStylez'+rowCount+'" name="photobooth_style['+rowCount+']" checked="">'+
    '        <label for="PhotoboothStylez'+rowCount+'">'+
    '        open air booth'+
    '        </label>'+
    '        </div>'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="2" id="PhotoboothStylex'+rowCount+'" name="photobooth_style['+rowCount+']">'+
    '        <label for="PhotoboothStylex'+rowCount+'">'+
    '        enclosed booth'+
    '        </label>'+
    '        </div>'+
    '    </div>'+
    '    </div>'+
    '</td> ';
    row.innerHTML = element1; 
  } else if(param == "xWeddingPhoto"){ // WeddingPhoto
    var tableID = "xTableWeddingPhoto";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var element1 = 
    '<td>'+
    '    <div class="col-md-12"><input type="hidden" name="wedding_photo_id['+rowCount+']" class="form-control" value="0" required>'+
    '    <label for="" class="control-label">Date <span style="color:red" >*</span></label>'+
    '    <input type="date" name="wedding_photo_date['+rowCount+']" class="form-control" placeholder="Engagement Date" required>'+
    '    </div>'+
    '</td>'+
    '<td>'+
    '    <div class="col-md-12">'+
    '    <label for="" class="control-label">Duration <span style="color:red" >*</span></label>'+
    '    <select name="wedding_photo_duration['+rowCount+']" class="form-control select2-blank" style="width: 100%;"> '+
    '        <option value="1">1 Hours</option>'+
    '        <option value="2">2 Hours</option>'+
    '        <option value="3">3 Hours</option>'+
    '        <option value="4">4 Hours</option>'+
    '        <option value="5">5 Hours</option>'+
    '        <option value="6">6 Hours</option>'+
    '        <option value="7">7 Hours</option>'+
    '        <option value="8">8 Hours</option>'+
    '        <option value="9">9 Hours</option>'+
    '        <option value="10">10 Hours</option>'+
    '        <option value="11">11 Hours</option>'+
    '        <option value="12">12 Hours</option>'+
    '        <option value="12">13 Hours</option>'+
    '        <option value="12">14 Hours</option>'+
    '    </select>'+
    '    </div>'+
    '    </td>'+
    '<td>'+
    '    <div class="col-md-12">'+
    '    <label for="" class="control-label">Wedding Photographer Qty <span style="color:red" >*</span></label>'+
    '    <div class="form-group clearfix">'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="1" id="WeddingPhotoQtyz'+rowCount+'" name="wedding_photo_photographer_qty['+rowCount+']" checked="">'+
    '        <label for="WeddingPhotoQtyz'+rowCount+'">'+
    '        1'+
    '        </label>'+
    '        </div>'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="2" id="WeddingPhotoQtyx'+rowCount+'" name="wedding_photo_photographer_qty['+rowCount+']">'+
    '        <label for="WeddingPhotoQtyx'+rowCount+'">'+
    '        2'+
    '        </label>'+
    '        </div>'+
    '    </div>'+
    '    </div>'+
    '</td> ';
    row.innerHTML = element1; 
  } else if(param == "xWeddingVideo"){ //WeddingVideo
    var tableID = "xTableWeddingVideo";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var element1 = 
    '<td>'+
    '<div class="col-md-12"><input type="hidden" name="wedding_video_id['+rowCount+']" class="form-control" value="0" required>'+
    '    <label for="" class="control-label">Date <span style="color:red" >*</span></label>'+
    '    <input type="date" name="wedding_video_date['+rowCount+']" class="form-control" placeholder="Engagement Date" required>'+
    '</div>'+
    '</td>'+
    '<td>'+
    '<div class="col-md-12">'+
    '    <label for="" class="control-label">Duration <span style="color:red" >*</span></label>'+
    '    <select name="wedding_video_duration['+rowCount+']" class="form-control select2-blank" style="width: 100%;"> '+
    '    <option value="1">1 Hours</option>'+
    '    <option value="2">2 Hours</option>'+
    '    <option value="3" selected>3 Hours</option>'+
    '    <option value="4">4 Hours</option>'+
    '    <option value="5">5 Hours</option>'+
    '    <option value="6">6 Hours</option>'+
    '    <option value="7">7 Hours</option>'+
    '    <option value="8">8 Hours</option>'+
    '    <option value="9">9 Hours</option>'+
    '    <option value="10">10 Hours</option>'+
    '    <option value="11">11 Hours</option>'+
    '    <option value="12">12 Hours</option>  '+
    '    <option value="12">13 Hours</option>   '+
    '    <option value="12">14 Hours</option>             '+
    '    </select>'+
    '</div>'+
    '</td>'+
    '<td>'+
    '<div class="col-md-12">'+
    '    <label for="" class="control-label">Videographer Qty <span style="color:red" >*</span></label>'+
    '    <div class="form-group clearfix">'+
    '    <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="1" id="WeddingVideographerQtyz'+rowCount+'" name="wedding_video_videographer_qty['+rowCount+']" checked="">'+
    '        <label for="WeddingVideographerQtyz'+rowCount+'">'+
    '        1'+
    '        </label>'+
    '    </div>'+
    '    <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="2" id="WeddingVideographerQtyx'+rowCount+'" name="wedding_video_videographer_qty['+rowCount+']">'+
    '        <label for="WeddingVideographerQtyx'+rowCount+'">'+
    '        2'+
    '        </label>'+
    '    </div>'+
    '    </div>'+
    '</div>'+
    '</td> '+
    '<td>'+
    '<div class="col-md-12">'+
    '    <label for="" class="control-label">Drone <span style="color:red" >*</span></label>'+
    '    <div class="form-group clearfix">'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="1" id="Dronez'+rowCount+'" name="wedding_video_drone['+rowCount+']" checked="">'+
    '        <label for="Dronez'+rowCount+'">'+
    '        yes'+
    '        </label>'+
    '        </div>'+
    '        <div class="icheck-primary d-inline">'+
    '        <input type="radio" value="0" id="Dronex'+rowCount+'" name="wedding_video_drone['+rowCount+']">'+
    '        <label for="Dronex'+rowCount+'">'+
    '        no'+
    '        </label>'+
    '        </div>'+
    '    </div>'+
    '</div>'+
    '</td> ';
      row.innerHTML = element1;     
  }
}   
 
function DeletePlans(param){
  if(param == "PaymentPlans"){
    var tableID = "TablePaymentPlans";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    if(rowCount != 1) {   
     rowCount = rowCount - 1;
     table.deleteRow(rowCount);
    } 
  } else if(param == "EngagementPhotoService"){
    var tableID = "TableEngagementPhotoService";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    if(rowCount != 1) {   
     rowCount = rowCount - 1;
     table.deleteRow(rowCount);
    } 
  } else if(param == "PhotoboothService"){
    var tableID = "TablePhotoboothService";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    if(rowCount != 1) {   
     rowCount = rowCount - 1;
     table.deleteRow(rowCount);
    } 
  } else if(param == "WeddingPhoto"){
    var tableID = "TableWeddingPhoto";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    if(rowCount != 1) {   
     rowCount = rowCount - 1;
     table.deleteRow(rowCount);
    } 
  } else if(param == "WeddingVideo"){
    var tableID = "TableWeddingVideo";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    if(rowCount != 1) {   
     rowCount = rowCount - 1;
     table.deleteRow(rowCount);
    } 
  } else if(param == "xEngagementPhotoService"){
    var tableID = "xTableEngagementPhotoService";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    if(rowCount != 1) {   
     rowCount = rowCount - 1;
     table.deleteRow(rowCount);
    } 
  } else if(param == "xPhotoboothService"){
    var tableID = "xTablePhotoboothService";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    if(rowCount != 1) {   
     rowCount = rowCount - 1;
     table.deleteRow(rowCount);
    } 
  } else if(param == "xWeddingPhoto"){
    var tableID = "xTableWeddingPhoto";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    if(rowCount != 1) {   
     rowCount = rowCount - 1;
     table.deleteRow(rowCount);
    } 
  } else if(param == "xWeddingVideo"){
    var tableID = "xTableWeddingVideo";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    if(rowCount != 1) {   
     rowCount = rowCount - 1;
     table.deleteRow(rowCount);
    } 
  } 
}
   
$('#BtnAkses').html('<i class="fa fa-plus"></i> Add');

function comboClient(param) {
  $.ajax({
      url: api_url + "/c_contract/getClient",
      type: "GET",
      dataType: "json",
      success: function (responseload) {
        var StrNama = "";
        StrNama += "<option value=''>- Pilih Salah Satu -</option>";
        var Jml = (responseload).length;
        var i = 0;
        for (i; i < Jml; i++) {
            if ((responseload[i].id == param)) {
                StrNama += "<option value='" + responseload[i].id + "' selected>" + responseload[i].text + "</option>";
            } else {
                StrNama += "<option value='" + responseload[i].id + "'>" + responseload[i].text + "</option>";
            }
        }
        //for (i; i < Jml; i++) {
        //    StrNama += "<option value='" + responseload.Data[i].Id + "'>" + responseload.Data[i].Nama + "</option>";
        //}

        $("select[name='id_clients']").html(StrNama);
        $("select[name='clients']").html(StrNama);
      }, error: function (errorresponse) {
          swal({ title: 'Gagal Menampilkan Data Jenis Pekerjaan', text: errorresponse, confirmButtonClass: 'btn-danger text-white', confirmButtonText: 'Oke, Mengerti', type: 'error' });
      }
  });
}

function comboContract(param) {
  $.ajax({
      url: api_url + "/c_contract/getContract",
      type: "GET",
      dataType: "json",
      success: function (responseload) {
        var StrNama = "";
        StrNama += "<option value=''>- Pilih Salah Satu -</option>";
        var Jml = (responseload).length;
        var i = 0;
        for (i; i < Jml; i++) {
            if ((responseload[i].id == param)) {
                StrNama += "<option value='" + responseload[i].id + "' selected>" + responseload[i].text + "</option>";
            } else {
                StrNama += "<option value='" + responseload[i].id + "'>" + responseload[i].text + "</option>";
            }
        }
        //for (i; i < Jml; i++) {
        //    StrNama += "<option value='" + responseload.Data[i].Id + "'>" + responseload.Data[i].Nama + "</option>";
        //}

        $("select[name='contract']").html(StrNama);

      }, error: function (errorresponse) {
          swal({ title: 'Gagal Menampilkan Data Jenis Pekerjaan', text: errorresponse, confirmButtonClass: 'btn-danger text-white', confirmButtonText: 'Oke, Mengerti', type: 'error' });
      }
  });
}

function edit(param){
  $('#HtmlTitle').html('Edit Contract');
  $('#viewContent').hide();
  
  $('#BtnAkses').html('<i class="fas fa-arrow-left"></i> Back');
  $('#BtnAslinya').attr('onclick','Back();');
  var url = api_url+"/c_contract/retrieveByIds/"+param;
  console.log(url)
  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "beforeSend":function(r,s){
      $('#LoadSpinner').show();
    },
  };
  
  $.ajax(settings).done(function (response) {
    $('#LoadSpinner').hide();
    $('#editContent').show();
    comboClient(response.data.clients_contract.id_clients);
    if(response.data.clients_contract.raw_or_dropbox == "1"){ $("#radioPrimary1").prop("checked", true); } else { $("#radioPrimary2").prop("checked", true); }
    $("input[name='notes']",'#FormEditContract').val(response.data.clients_contract.notes);
    $("input[name='id_clients_contract']",'#FormEditContract').val(response.data.clients_contract.id_clients_contract);
    comboContract(response.data.clients_contract.contract);
    $("input[name='combo_package_tax']",'#FormEditContract').val(response.data.clients_contract.combo_package_tax);
    $("input[name='combo_package_fee']",'#FormEditContract').val(response.data.clients_contract.combo_package_fee);
    $("input[name='grand_total']",'#FormEditContract').val(response.data.clients_contract.grand_total);

    if(response.data.clients_contract_details_products != null){
      $("#Products").prop("checked", true);
      $('#FormProducts').show();
      $("input[name='product_id[]']",'#FormEditContract').val(response.data.clients_contract_details_products.id);
      if(response.data.clients_contract_details_products.album_10_10_qty == "0"){ 
        $("#album_10_10_qty1").prop("checked", true); 
      } else if(response.data.clients_contract_details_products.album_10_10_qty == "1") { 
        $("#album_10_10_qty2").prop("checked", true); 
      } else if(response.data.clients_contract_details_products.album_12_12_qty == "2"){ 
        $("#album_10_10_qty3").prop("checked", true); 
      }
      if(response.data.clients_contract_details_products.album_12_12_qty == "0"){ 
        $("#album_12_12_qty1").prop("checked", true); 
      } else if(response.data.clients_contract_details_products.album_12_12_qty == "1"){ 
        $("#album_12_12_qty2").prop("checked", true); 
      } else if(response.data.clients_contract_details_products.album_12_12_qty == "2"){ 
        $("#album_12_12_qty3").prop("checked", true); 
      }
      if(response.data.clients_contract_details_products.canvas_16_24_qty == "0"){ 
        $("#canvas_16_24_qty1").prop("checked", true); 
      } else if(response.data.clients_contract_details_products.canvas_16_24_qty == "1"){ 
        $("#canvas_16_24_qty2").prop("checked", true); 
      } else if(response.data.clients_contract_details_products.canvas_16_24_qty == "2"){ 
        $("#canvas_16_24_qty3").prop("checked", true); 
      }
      if(response.data.clients_contract_details_products.album_coffee_table_qty == "0"){ 
        $("#album_coffee_table_qty1").prop("checked", true); 
      } else if(response.data.clients_contract_details_products.album_coffee_table_qty == "1"){ 
        $("#album_coffee_table_qty2").prop("checked", true); 
      } else if(response.data.clients_contract_details_products.album_coffee_table_qty == "2"){ 
        $("#album_coffee_table_qty3").prop("checked", true); 
      }
      if(response.data.clients_contract_details_products.video_trailer == "1"){ 
        $("#video_trailer1").prop("checked", true); 
      } else if(response.data.clients_contract_details_products.video_trailer == "2"){ 
        $("#video_trailer2").prop("checked", true); 
      }
      if(response.data.clients_contract_details_products.video_freature == "1"){ 
        $("#video_freature1").prop("checked", true); 
      } else if(response.data.clients_contract_details_products.video_freature == "2"){ 
        $("#video_freature2").prop("checked", true); 
      }
    } else {
      $("#Products").prop("checked", false);
      $('#FormProducts').hide();
    }
    

    var htmlPaymentPlan = "";
    var JUMclients_contract_payment_plan = (response.data.clients_contract_payment_plan).length;
    for(var i=0; i < JUMclients_contract_payment_plan; i++){
      htmlPaymentPlan +=
      '<table id="TablePaymentPlans" style="width:100%">'+
      '  <tbody>'+
      '    <tr>   '+
      '      <td>'+
      '        <div class="col-md-12"><input type="hidden" name="id_payments_plan[9'+i+']" class="form-control" value="'+response.data.clients_contract_payment_plan[i].id+'" required>'+
      '          <div class="form-group">'+
      '          <input type="number" name="amount_payment[9'+i+']" class="form-control" value="'+response.data.clients_contract_payment_plan[i].amount_payment+'" required>'+
      '          </div>'+
      '        </div>'+
      '      </td>'+
      '      <td>'+
      '        <div class="col-md-12">'+
      '          <div class="form-group">'+
      '            <input type="date" name="due_date[9'+i+']" class="form-control" value="'+response.data.clients_contract_payment_plan[i].due_date+'" required>'+
      '          </div>'+
      '        </div>      '+
      '      </td>    '+
      '    </tr>'+
      '  </tbody>'+
      '</table>        ';
    }
    $('#clients_contract_payment_plan').html(htmlPaymentPlan);

    // start engagement
    if((response.data.clients_contract_details_engagement).length >= 1){
      $('#xTableEngagementPhotoService').css('display','none');
      $("#EngagementPhotoService").prop("checked", true);
      $('#BtnAddEngagementPhotoService').removeAttr('style');
      $('#BtnDelEngagementPhotoService').removeAttr('style');
      $('#FormEngagementPhotoService').show();
      var htmlEngagement = "";
      var JUMclients_contract_details_engagement = (response.data.clients_contract_details_engagement).length;
      for(var i=0; i < JUMclients_contract_details_engagement; i++){
        //mulai
        htmlEngagement +=
        '<table id="TableEngagementPhotoService" style="width:100%">'+
        '  <tbody>'+
        '    <tr>   '+
        '      <td>'+
        '        <div class="col-md-12"><input type="hidden" name="engangement_id[9'+i+']" class="form-control" value="'+response.data.clients_contract_details_engagement[i].id+'" required>'+
        '          <label for="" class="control-label">Date <span style="color:red" >*</span></label>'+
        '          <input type="date" name="engangement_date[9'+i+']" class="form-control" value="'+response.data.clients_contract_details_engagement[i].engangement_date+'" required>'+
        '        </div>'+
        '      </td>'+
        '      <td>'+
        '        <div class="col-md-12">'+
        '          <label for="" class="control-label">Duration <span style="color:red" >*</span></label>'+
        '          <select name="engagement_photo_session_duration[9'+i+']" class="form-control select2-blank" style="width: 100%;"> '+
        '            <option value="'+response.data.clients_contract_details_engagement[i].engagement_photo_session_duration+'" selected>'+response.data.clients_contract_details_engagement[i].engagement_photo_session_duration+' Hours (SELECTED)</option>'+
        '            <option value="1">1 Hours</option>'+
        '            <option value="2">2 Hours</option>'+
        '            <option value="3">3 Hours</option>'+
        '            <option value="4">4 Hours</option>'+
        '            <option value="5">5 Hours</option>'+
        '            <option value="6">6 Hours</option>'+
        '            <option value="7">7 Hours</option>'+
        '            <option value="8">8 Hours</option>'+
        '            <option value="9">9 Hours</option>'+
        '            <option value="10">10 Hours</option>'+
        '            <option value="11">11 Hours</option>'+
        '            <option value="12">12 Hours</option>  '+
        '            <option value="12">13 Hours</option>   '+
        '            <option value="12">14 Hours</option>             '+
        '          </select>'+
        '        </div>'+
        '      </td>'+
        '      <td>'+
        '        <div class="col-md-12">'+
        '          <label for="" class="control-label">Photographer Qty <span style="color:red" >*</span></label>';
        //pecah dulu
        if(response.data.clients_contract_details_engagement[i].engagement_photographer_qty == "1"){
          htmlEngagement += 
          '<div class="form-group clearfix">'+
          '<div class="icheck-primary d-inline">'+
          '<input type="radio" value="1" id="PhotographerQtyz9'+i+'" name="engagement_photographer_qty[9'+i+']" checked>'+
          '<label for="PhotographerQtyz9'+i+'">'+
          '1'+
          '</label>'+
          '</div>'+
          '<div class="icheck-primary d-inline">'+
          '<input type="radio" value="2" id="PhotographerQtyx9'+i+'" name="engagement_photographer_qty[9'+i+']" >'+
          '<label for="PhotographerQtyx9'+i+'">'+
          '2'+
          '</label>'+
          '</div>'+
          '</div>';
        } else {
          htmlEngagement += 
          '<div class="form-group clearfix">'+
          '<div class="icheck-primary d-inline">'+
          '<input type="radio" value="1" id="PhotographerQtyz99'+i+'" name="engagement_photographer_qty[9'+i+']">'+
          '<label for="PhotographerQtyz99'+i+'">'+
          '1'+
          '</label>'+
          '</div>'+
          '<div class="icheck-primary d-inline">'+
          '<input type="radio" value="2" id="PhotographerQtyx99'+i+'" name="engagement_photographer_qty[9'+i+']" checked>'+
          '<label for="PhotographerQtyx99'+i+'">'+
          '2'+
          '</label>'+
          '</div>'+
          '</div>';
        }
        //gabung lagi
        htmlEngagement += 
        '        </div>'+
        '      </td> '+
        '    </tr>'+
        '  </tbody>'+
        '</table><br /> ';
      }
      $('#clients_contract_details_engagement').html(htmlEngagement);
    } else {
      $("#EngagementPhotoService").prop("checked", false);
      $('#FormEngagementPhotoService').hide();
      $('#BtnAddEngagementPhotoService').css('display','none');
      $('#BtnDelEngagementPhotoService').css('display','none');

      $('#xTableEngagementPhotoService').show();
      $('#BtnAddEngagementPhotoService').removeAttr('onclick');
      $('#BtnAddEngagementPhotoService').attr('onclick','AddPlans("xEngagementPhotoService");');
      $('#BtnDelEngagementPhotoService').removeAttr('onclick');
      $('#BtnDelEngagementPhotoService').attr('onclick','DeletePlans("xEngagementPhotoService");');
    }
    

      
    // start Photobooth
    if((response.data.clients_contract_details_photobooth).length >= 1){
      $('#xTablePhotoboothService').css('display','none');
      $("#PhotoboothService").prop("checked", true);
      $('#BtnAddPhotoboothService').removeAttr('style');
      $('#BtnDelPhotoboothService').removeAttr('style');
      $('#FormPhotoboothService').show();
      var htmlPhotobooth = "";
      var JUMclients_contract_details_photobooth = (response.data.clients_contract_details_photobooth).length;
      for(var i=0; i < JUMclients_contract_details_photobooth; i++){
        htmlPhotobooth +=
        '<table id="TablePhotoboothService" style="width:100%">'+
        '  <tbody>'+
        '    <tr>   '+
        '      <td>'+
        '        <div class="col-md-12"><input type="hidden" name="photobooth_id[9'+i+']" class="form-control" value="'+response.data.clients_contract_details_photobooth[i].id+'" required>'+
        '          <label for="" class="control-label">Date <span style="color:red" >*</span></label>'+
        '          <input type="date" name="photobooth_date[9'+i+']" class="form-control" value="'+response.data.clients_contract_details_photobooth[i].photobooth_date+'" required>'+
        '        </div>'+
        '      </td>'+
        '      <td>'+
        '        <div class="col-md-12">'+
        '          <label for="" class="control-label">Duration <span style="color:red" >*</span></label>'+
        '          <select name="photobooth_duration[9'+i+']" class="form-control select2-blank" style="width: 100%;"> '+
        '            <option value="'+response.data.clients_contract_details_photobooth[i].photobooth_duration+'" selected>'+response.data.clients_contract_details_photobooth[i].photobooth_duration+' Hours (SELECTED)</option>'+
        '            <option value="1">1 Hours</option>'+
        '            <option value="2">2 Hours</option>'+
        '            <option value="3">3 Hours</option>'+
        '            <option value="4">4 Hours</option>'+
        '            <option value="5">5 Hours</option>'+
        '            <option value="6">6 Hours</option>'+
        '            <option value="7">7 Hours</option>'+
        '            <option value="8">8 Hours</option>'+
        '            <option value="9">9 Hours</option>'+
        '            <option value="10">10 Hours</option>'+
        '            <option value="11">11 Hours</option>'+
        '            <option value="12">12 Hours</option>  '+
        '            <option value="12">13 Hours</option>   '+
        '            <option value="12">14 Hours</option>             '+
        '          </select>'+
        '        </div>'+
        '      </td>'+
        '      <td>'+
        '        <div class="col-md-12">'+
        '          <label for="" class="control-label">Photographer Style <span style="color:red" >*</span></label>';
        //pecah dulu
        if(response.data.clients_contract_details_photobooth[i].photobooth_style == "1"){
          htmlPhotobooth += 
          '<div class="form-group clearfix">'+
          '<div class="icheck-primary d-inline">'+
          '<input type="radio" value="1" id="PhotoboothStylez9'+i+'" name="photobooth_style[9'+i+']" checked>'+
          '<label for="PhotoboothStylez9'+i+'">'+
          'open air booth'+
          '</label>'+
          '</div>'+
          '<div class="icheck-primary d-inline">'+
          '<input type="radio" value="2" id="PhotoboothStylex9'+i+'" name="photobooth_style[9'+i+']" >'+
          '<label for="PhotoboothStylex9'+i+'">'+
          'enclosed booth'+
          '</label>'+
          '</div>'+
          '</div>';
        } else {
          htmlPhotobooth += 
          '<div class="form-group clearfix">'+
          '<div class="icheck-primary d-inline">'+
          '<input type="radio" value="1" id="PhotoboothStylez99'+i+'" name="photobooth_style[9'+i+']">'+
          '<label for="PhotoboothStylez99'+i+'">'+
          'open air booth'+
          '</label>'+
          '</div>'+
          '<div class="icheck-primary d-inline">'+
          '<input type="radio" value="2" id="PhotoboothStylex99'+i+'" name="photobooth_style[9'+i+']" checked>'+
          '<label for="PhotoboothStylex99'+i+'">'+
          'enclosed booth'+
          '</label>'+
          '</div>'+
          '</div>';
        }
        htmlPhotobooth +=
        '        </div>'+
        '      </td> '+
        '    </tr>'+
        '  </tbody>'+
        '</table><br /> ';
      }
      $('#clients_contract_details_photobooth').html(htmlPhotobooth);
    } else {
      $("#PhotoboothService").prop("checked", false);
      $('#FormPhotoboothService').hide();
      $('#BtnAddPhotoboothService').css('display','none');
      $('#BtnDelPhotoboothService').css('display','none');

      $('#xTablePhotoboothService').show();
      $('#BtnAddPhotoboothService').removeAttr('onclick');
      $('#BtnAddPhotoboothService').attr('onclick','AddPlans("xPhotoboothService");');
      $('#BtnDelPhotoboothService').removeAttr('onclick');
      $('#BtnDelPhotoboothService').attr('onclick','DeletePlans("xPhotoboothService");');
    }
    

    // start WeddingPhoto
    if((response.data.clients_contract_details_wedding_photo).length >= 1){
      $('#xTableWeddingPhoto').css('display','none');  
      $("#WeddingPhoto").prop("checked", true);
      $('#BtnAddWeddingPhoto').removeAttr('style');
      $('#BtnDelWeddingPhoto').removeAttr('style');
      $('#FormWeddingPhoto').css('display','block');
      var htmlWeddingPhoto = "";
      var JUMclients_contract_details_wedding_photo = (response.data.clients_contract_details_wedding_photo).length;
      for(var i=0; i < JUMclients_contract_details_wedding_photo; i++){
        htmlWeddingPhoto += 
        '<table id="TableWeddingPhoto" style="width:100%">'+
        '    <tbody>'+
        '    <tr>   '+
        '        <td>'+
        '        <div class="col-md-12"><input type="hidden" name="wedding_photo_id[9'+i+']" class="form-control" value="'+response.data.clients_contract_details_wedding_photo[i].id+'" required>'+
        '            <label for="" class="control-label">Date <span style="color:red" >*</span></label>'+
        '            <input type="date" name="wedding_photo_date[9'+i+']" class="form-control" value="'+response.data.clients_contract_details_wedding_photo[i].wedding_photo_date+'" required>'+
        '        </div>'+
        '        </td>'+
        '        <td>'+
        '        <div class="col-md-12">'+
        '            <label for="" class="control-label">Duration <span style="color:red" >*</span></label>'+
        '            <select name="wedding_photo_duration[9'+i+']" class="form-control select2-blank" style="width: 100%;"> '+
        '            <option value="'+response.data.clients_contract_details_wedding_photo[i].wedding_photo_duration+'" selected>'+response.data.clients_contract_details_wedding_photo[i].wedding_photo_duration+' Hours (SELECTED)</option>'+
        '            <option value="1">1 Hours</option>'+
        '            <option value="2">2 Hours</option>'+
        '            <option value="3">3 Hours</option>'+
        '            <option value="4">4 Hours</option>'+
        '            <option value="5">5 Hours</option>'+
        '            <option value="6">6 Hours</option>'+
        '            <option value="7">7 Hours</option>'+
        '            <option value="8">8 Hours</option>'+
        '            <option value="9">9 Hours</option>'+
        '            <option value="10">10 Hours</option>'+
        '            <option value="11">11 Hours</option>'+
        '            <option value="12">12 Hours</option>'+
        '            <option value="12">13 Hours</option>'+
        '            <option value="12">14 Hours</option>'+
        '            </select>'+
        '        </div>'+
        '        </td>'+
        '        <td>'+
        '        <div class="col-md-12">'+
        '            <label for="" class="control-label">Wedding Photographer Qty <span style="color:red" >*</span></label>';
        if(response.data.clients_contract_details_wedding_photo[i].wedding_photo_photographer_qty == "1"){
          htmlWeddingPhoto +=
          '            <div class="form-group clearfix">'+
          '            <div class="icheck-primary d-inline">'+
          '                <input type="radio" value="1" id="WeddingPhotoQtyz9'+i+'" name="wedding_photo_photographer_qty[9'+i+']" checked="">'+
          '                <label for="WeddingPhotoQtyz9'+i+'">'+
          '                1'+
          '                </label>'+
          '            </div>'+
          '            <div class="icheck-primary d-inline">'+
          '                <input type="radio" value="2" id="WeddingPhotoQtyx9'+i+'" name="wedding_photo_photographer_qty[9'+i+']">'+
          '                <label for="WeddingPhotoQtyx9'+i+'">'+
          '                2'+
          '                </label>'+
          '            </div>'+
          '            </div>';
        } else {
          htmlWeddingPhoto +=
          '            <div class="form-group clearfix">'+
          '            <div class="icheck-primary d-inline">'+
          '                <input type="radio" value="1" id="WeddingPhotoQtyz99'+i+'" name="wedding_photo_photographer_qty[9'+i+']">'+
          '                <label for="WeddingPhotoQtyz99'+i+'">'+
          '                1'+
          '                </label>'+
          '            </div>'+
          '            <div class="icheck-primary d-inline">'+
          '                <input type="radio" value="2" id="WeddingPhotoQtyx99'+i+'" name="wedding_photo_photographer_qty[9'+i+']" checked="">'+
          '                <label for="WeddingPhotoQtyx99'+i+'">'+
          '                2'+
          '                </label>'+
          '            </div>'+
          '            </div>';
        }
  
        htmlWeddingPhoto +=    
        '        </div>'+
        '        </td> '+
        '    </tr>'+
        '    </tbody>'+
        '</table><br /> ';
      }
      $('#clients_contract_details_wedding_photo').html(htmlWeddingPhoto);
    } else {
      $("#WeddingPhoto").prop("checked", false);
      $('#FormWeddingPhoto').hide();
      $('#BtnAddWeddingPhoto').css('display','none');
      $('#BtnDelWeddingPhoto').css('display','none');  

      $('#xTableWeddingPhoto').show();
      $('#BtnAddWeddingPhoto').removeAttr('onclick');
      $('#BtnAddWeddingPhoto').attr('onclick','AddPlans("xWeddingPhoto");');
      $('#BtnDelWeddingPhoto').removeAttr('onclick');
      $('#BtnDelWeddingPhoto').attr('onclick','DeletePlans("xWeddingPhoto");');
    }
    

    // start WeddingVideo
    if((response.data.clients_contract_details_wedding_video).length >= 1){
      $('#xTableWeddingVideo').css('display','none');  
      $("#WeddingVideo").prop("checked", true);
      $('#BtnAddWeddingVideo').removeAttr('style');
      $('#BtnDelWeddingVideo').removeAttr('style');
      $('#FormWeddingVideo').show();
      var htmlWeddingVideo = "";
      var JUMclients_contract_details_wedding_video = (response.data.clients_contract_details_wedding_video).length;
      for(var i=0; i < JUMclients_contract_details_wedding_video; i++){
        htmlWeddingVideo += 
        '<table id="TableWeddingVideo" style="width:100%">'+
        '    <tbody>'+
        '    <tr>   '+
        '        <td>'+
        '        <div class="col-md-12"><input type="hidden" name="wedding_video_id[9'+i+']" class="form-control" value="'+response.data.clients_contract_details_wedding_video[i].id+'" required>'+
        '            <label for="" class="control-label">Date <span style="color:red" >*</span></label>'+
        '            <input type="date" name="wedding_video_date[9'+i+']" class="form-control" value="'+response.data.clients_contract_details_wedding_video[i].wedding_video_date+'" required>'+
        '        </div>'+
        '        </td>'+
        '        <td>'+
        '        <div class="col-md-12">'+
        '            <label for="" class="control-label">Duration <span style="color:red" >*</span></label>'+
        '            <select name="wedding_video_duration[9'+i+']" class="form-control select2-blank" style="width: 100%;"> '+
        '            <option value="'+response.data.clients_contract_details_wedding_video[i].wedding_video_duration+'" selected>'+response.data.clients_contract_details_wedding_video[i].wedding_video_duration+' Hours (SELECTED)</option>'+
        '            <option value="1">1 Hours</option>'+
        '            <option value="2">2 Hours</option>'+
        '            <option value="3">3 Hours</option>'+
        '            <option value="4">4 Hours</option>'+
        '            <option value="5">5 Hours</option>'+
        '            <option value="6">6 Hours</option>'+
        '            <option value="7">7 Hours</option>'+
        '            <option value="8">8 Hours</option>'+
        '            <option value="9">9 Hours</option>'+
        '            <option value="10">10 Hours</option>'+
        '            <option value="11">11 Hours</option>'+
        '            <option value="12">12 Hours</option>'+
        '            <option value="12">13 Hours</option>'+
        '            <option value="12">14 Hours</option>'+
        '            </select>'+
        '        </div>'+
        '        </td>'+
        '        <td>'+
        '        <div class="col-md-12">'+
        '            <label for="" class="control-label">Wedding Photographer Qty <span style="color:red" >*</span></label>';
        if(response.data.clients_contract_details_wedding_video[i].wedding_video_videographer_qty == "1"){
          htmlWeddingVideo +=
          '            <div class="form-group clearfix">'+
          '            <div class="icheck-primary d-inline">'+
          '                <input type="radio" value="1" id="WeddingVideoQtyz9'+i+'" name="wedding_video_videographer_qty[9'+i+']" checked="">'+
          '                <label for="WeddingVideoQtyz9'+i+'">'+
          '                1'+
          '                </label>'+
          '            </div>'+
          '            <div class="icheck-primary d-inline">'+
          '                <input type="radio" value="2" id="WeddingVideoQtyx9'+i+'" name="wedding_video_videographer_qty[9'+i+']">'+
          '                <label for="WeddingVideoQtyx9'+i+'">'+
          '                2'+
          '                </label>'+
          '            </div>'+
          '            </div>';
        } else {
          htmlWeddingVideo +=
          '            <div class="form-group clearfix">'+
          '            <div class="icheck-primary d-inline">'+
          '                <input type="radio" value="1" id="WeddingVideoQtyz99'+i+'" name="wedding_video_videographer_qty[9'+i+']">'+
          '                <label for="WeddingVideoQtyz99'+i+'">'+
          '                1'+
          '                </label>'+
          '            </div>'+
          '            <div class="icheck-primary d-inline">'+
          '                <input type="radio" value="2" id="WeddingVideoQtyx99'+i+'" name="wedding_video_videographer_qty[9'+i+']" checked="">'+
          '                <label for="WeddingVideoQtyx99'+i+'">'+
          '                2'+
          '                </label>'+
          '            </div>'+
          '            </div>';
        }
  
        htmlWeddingVideo +=    
        '        </div>'+
        '        </td> '+
        '        <td>'+
        '          <div class="col-md-12">'+
        '            <label for="" class="control-label">Drone <span style="color:red" >*</span></label>';
  
        if(response.data.clients_contract_details_wedding_video[i].wedding_video_drone == "1"){
          htmlWeddingVideo +=   
          '              <div class="form-group clearfix">'+
          '                <div class="icheck-primary d-inline">'+
          '                  <input type="radio" value="1" id="Dronez9'+i+'" name="wedding_video_drone[9'+i+']" checked="">'+
          '                  <label for="Dronez9'+i+'">'+
          '                  yes'+
          '                  </label>'+
          '                </div>'+
          '                <div class="icheck-primary d-inline">'+
          '                  <input type="radio" value="0" id="Dronex9'+i+'" name="wedding_video_drone[9'+i+']">'+
          '                  <label for="Dronex9'+i+'">'+
          '                  no'+
          '                  </label>'+
          '                </div>'+
          '              </div>';
        } else {
          htmlWeddingVideo +=   
          '              <div class="form-group clearfix">'+
          '                <div class="icheck-primary d-inline">'+
          '                  <input type="radio" value="1" id="Dronez99'+i+'" name="wedding_video_drone[9'+i+']" >'+
          '                  <label for="Dronez99'+i+'">'+
          '                  yes'+
          '                  </label>'+
          '                </div>'+
          '                <div class="icheck-primary d-inline">'+
          '                  <input type="radio" value="0" id="Dronex99'+i+'" name="wedding_video_drone[9'+i+']" checked="">'+
          '                  <label for="Dronex99'+i+'">'+
          '                  no'+
          '                  </label>'+
          '                </div>'+
          '              </div>';
        }
  
        htmlWeddingVideo +=
        '          </div>'+
        '        </td> '+
        '    </tr>'+
        '    </tbody>'+
        '</table><br /> ';
      }
      $('#clients_contract_details_wedding_video').html(htmlWeddingVideo);
    } else {
      $("#WeddingVideo").prop("checked", false);
      $('#FormWeddingVideo').hide();
      $('#BtnAddWeddingVideo').css('display','none');
      $('#BtnDelWeddingVideo').css('display','none');  

      $('#xTableWeddingVideo').show();
      $('#BtnAddWeddingVideo').removeAttr('onclick');
      $('#BtnAddWeddingVideo').attr('onclick','AddPlans("xWeddingVideo");');
      $('#BtnDelWeddingVideo').removeAttr('onclick');
      $('#BtnDelWeddingVideo').attr('onclick','DeletePlans("xWeddingVideo");');
    }
    


  });
}


function Back(){
  $('#HtmlTitle').html('List Contract');
  $("#TableContract").DataTable().ajax.reload();
  $('#viewContent').show();
  $('#editContent').hide();
  $('#detailContent').hide();
  $('#BtnAkses').empty('');
  $('#BtnAkses').append('<i class="fa fa-plus"></i> Add');
  $('#BtnAslinya').attr('onclick','Add();');
}

function Add(){
  location.replace(ui_url+"c_contract/add");
}

$(function(){
  $("form#FormEditContract").on('submit',function(e){
    var datax = $(this).serialize();
    console.log(datax)
    e.preventDefault();
    $.ajax({
      url:$(this).attr('action'),
      type:'post',
      data:datax,
      dataType:'json',
      beforeSend:function(r,s){
        $('div#buttonsubmit').html('<button class="btn btn-primary btn-block" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> &nbsp;Loading...</button>');
      },
      success:function(data){
        $('div#buttonsubmit').html('<button type="submit" id="submit" class="btn btn-primary btn-block">Submit</button>');
        alert('Berhasil update data');
        $('#editContent').hide();
        $('#viewContent').show();
        TabelList();
        $("#TableContract").DataTable().ajax.reload();
        if(data.status){
          //location.replace(ui_url+"payment/c_payment");
        }
       
      },
      error:function(j,r,e){
        alert(JSON.stringify(j) +' : '+ e);
        //alert('Masih ada yang kosong');
        $('div#buttonsubmit').html('<button type="submit" id="submit" class="btn btn-primary btn-block">Submit</button>');
      }
    })
  })
})

function deleteData(param){
  var settings = {
    "url": api_url + "/c_contract/DeleteContract/"+param,
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    if(response.status == 200){
      $("#TableContract").DataTable().ajax.reload();
      alert('Berhasil Dihapus');
    } else {
      alert('Terjadi Kesalahan');
    }
  });
}

function spanClient(param) {
  $.ajax({
      url: api_url + "/c_contract/getClient",
      type: "GET",
      dataType: "json",
      success: function (responseload) {
        var StrNama = "";
        var Jml = (responseload).length;
        var i = 0;
        for (i; i < Jml; i++) {
            if ((responseload[i].id == param)) {
                StrNama += responseload[i].text;
            } else {
                //StrNama += "<option value='" + responseload[i].id + "'>" + responseload[i].text + "</option>";
            }
        }
        //for (i; i < Jml; i++) {
        //    StrNama += "<option value='" + responseload.Data[i].Id + "'>" + responseload.Data[i].Nama + "</option>";
        //}

        $("#detail_client").html(StrNama);
      }, error: function (errorresponse) {
          swal({ title: 'Gagal Menampilkan Data Jenis Pekerjaan', text: errorresponse, confirmButtonClass: 'btn-danger text-white', confirmButtonText: 'Oke, Mengerti', type: 'error' });
      }
  });
}

function spanContract(param) {
  $.ajax({
      url: api_url + "/c_contract/getContract",
      type: "GET",
      dataType: "json",
      success: function (responseload) {
        var StrNama = "";
        var Jml = (responseload).length;
        var i = 0;
        for (i; i < Jml; i++) {
            if ((responseload[i].id == param)) {
                StrNama += responseload[i].text;
            } else {
                //StrNama += "<option value='" + responseload[i].id + "'>" + responseload[i].text + "</option>";
            }
        }
        //for (i; i < Jml; i++) {
        //    StrNama += "<option value='" + responseload.Data[i].Id + "'>" + responseload.Data[i].Nama + "</option>";
        //}

        $("#detail_contract").html(StrNama);
      }, error: function (errorresponse) {
          swal({ title: 'Gagal Menampilkan Data Jenis Pekerjaan', text: errorresponse, confirmButtonClass: 'btn-danger text-white', confirmButtonText: 'Oke, Mengerti', type: 'error' });
      }
  });
}

function detailData(param){
  $('#detailContent').hide();
  $('#viewContent').hide();
  $('#BtnAkses').html('<i class="fas fa-arrow-left"></i> Back');
  $('#BtnAslinya').attr('onclick','Back();');
  var settings = {
    "url": api_url +"c_contract/retrieveByIds/"+param,
    "method": "GET",
    "timeout": 0,
    "beforeSend":function(r,s){
      $('#LoadSpinner').show();
    },
  };
  
  $.ajax(settings).done(function (response) {
    $('#detailContent').show();
    $('#LoadSpinner').hide();
    spanClient(response.data.clients_contract.id_clients);
    spanContract(response.data.clients_contract.contract);
    $('#detail_client').html(response.data.clients_contract.id_clients);
    //$('#detail_raw_or_box').html(response.data.clients_contract.raw_or_dropbox);
    if(response.data.clients_contract.raw_or_dropbox == '1'){
      $('#detail_raw_or_box').html("Raw");
    } else {
      $('#detail_raw_or_box').html("Dropbox");
    }
    $('#detail_notes').html(response.data.clients_contract.notes);
    //$('#detail_contract').html(response.data.clients_contract.contract);
    $('#detail_combo_package_tax').html(formatter.format(response.data.clients_contract.combo_package_tax));
    $('#detail_combo_package_fee').html(formatter.format(response.data.clients_contract.combo_package_fee));
    $('#detail_grand_total').html(formatter.format(response.data.clients_contract.grand_total));

    $('#detail_album_10_10_qty').html(response.data.clients_contract_details_products.album_10_10_qty);
    $('#detail_album_12_12_qty').html(response.data.clients_contract_details_products.album_12_12_qty);
    $('#detail_canvas_16_24_qty').html(response.data.clients_contract_details_products.canvas_16_24_qty);
    $('#detail_album_coffee_table_qty').html(response.data.clients_contract_details_products.album_coffee_table_qty);
    if(response.data.clients_contract_details_products.video_trailer == '1'){
      $('#detail_video_trailer').html('yes');
    } else {
      $('#detail_video_trailer').html('no');
    }
    if(response.data.clients_contract_details_products.video_freature == '1'){
      $('#detail_video_freature').html('yes');
    } else {
      $('#detail_video_freature').html('no');
    }

    var html_payment_plan = "";
    var jum = (response.data.clients_contract_payment_plan).length;
    for(var i=0; i < jum; i++){
      var no = i + 1;
      html_payment_plan += 
      '<tr>'+
      '  <td>'+no+'</td>'+
      '  <td>'+formatter.format(response.data.clients_contract_payment_plan[i].amount_payment)+'</td>'+
      '  <td>'+response.data.clients_contract_payment_plan[i].due_date+'</td>'+
      '</tr>';
    }
    $('tbody#TbodyPaymentPlan').html(html_payment_plan);

    var html_engagement = "";
    var jum1 = (response.data.clients_contract_details_engagement).length;
    for(var i=0; i < jum1; i++){
      var no = i + 1;
      html_engagement += 
      '<tr>'+
      '  <td>'+no+'</td>'+
      '  <td>'+response.data.clients_contract_details_engagement[i].engangement_date+'</td>'+
      '  <td>'+response.data.clients_contract_details_engagement[i].engagement_photo_session_duration+' Hours</td>'+
      '  <td>'+response.data.clients_contract_details_engagement[i].engagement_photographer_qty+'</td>'+
      '</tr>';
    }
    $('tbody#TbodyEngagement').html(html_engagement);

    var html_Photobooth = "";
    var jum1 = (response.data.clients_contract_details_photobooth).length;
    for(var i=0; i < jum1; i++){
      var no = i + 1;
      html_Photobooth += 
      '<tr>'+
      '  <td>'+no+'</td>'+
      '  <td>'+response.data.clients_contract_details_photobooth[i].photobooth_date+'</td>'+
      '  <td>'+response.data.clients_contract_details_photobooth[i].photobooth_duration+' Hours</td>';
      if(response.data.clients_contract_details_photobooth[i].photobooth_style == '1'){
        html_Photobooth += '<td>open air booth</td>';
      } else {
        html_Photobooth += '<td>enclosed booth</td>';
      }
      '</tr>';
    }
    $('tbody#TbodyPhotobooth').html(html_Photobooth);

    var html_WeddingPhoto = "";
    var jum1 = (response.data.clients_contract_details_wedding_photo).length;
    for(var i=0; i < jum1; i++){
      var no = i + 1;
      html_WeddingPhoto += 
      '<tr>'+
      '  <td>'+no+'</td>'+
      '  <td>'+response.data.clients_contract_details_wedding_photo[i].wedding_photo_date+'</td>'+
      '  <td>'+response.data.clients_contract_details_wedding_photo[i].wedding_photo_duration+' Hours</td>'+
      '  <td>'+response.data.clients_contract_details_wedding_photo[i].wedding_photo_photographer_qty+'</td>'+
      '</tr>';
    }
    $('tbody#TbodyWeddingPhoto').html(html_WeddingPhoto);

    var html_WeddingVideo = "";
    var jum1 = (response.data.clients_contract_details_wedding_video).length;
    for(var i=0; i < jum1; i++){
      var no = i + 1;
      html_WeddingVideo += 
      '<tr>'+
      '  <td>'+no+'</td>'+
      '  <td>'+response.data.clients_contract_details_wedding_video[i].wedding_video_date+'</td>'+
      '  <td>'+response.data.clients_contract_details_wedding_video[i].wedding_video_duration+' Hours</td>'+
      '  <td>'+response.data.clients_contract_details_wedding_video[i].wedding_video_videographer_qty+'</td>';
      if(response.data.clients_contract_details_wedding_video[i].wedding_video_drone == '1'){
        html_WeddingVideo += '  <td>Yes</td>';
      } else {
        html_WeddingVideo += '  <td>No</td>';
      }
      
      '</tr>';
    }
    $('tbody#TbodyWeddingVideo').html(html_WeddingVideo);

    var html_status_payment = '<tr>'+
    '  <td>'+formatter.format(response.data.status_payment[0].grand_total)+'</td>'+
    '  <td>'+formatter.format(response.data.status_payment[0].totalpayment)+'</td>'+
    '  <td>'+formatter.format(response.data.status_payment[0].sisapayment)+'</td>'+
    '</tr>';
    $('tbody#TbodyStatusPayment').html(html_status_payment);

  });
}