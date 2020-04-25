$(".select-blank").select2({
    theme: 'bootstrap4',
    placeholder: "Select One",
  })
$(function(){
    $("form#FormAddContractExhibitA").on('submit',function(e){
      e.preventDefault();
      $.ajax({
        url:$(this).attr('action'),
        type:'post',
        data:$(this).serialize(),
        dataType:'json',
        beforeSend:function(r,s){
          $('div#buttonsubmit').html('<button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> &nbsp;Loading...</button>');
        },
        success:function(data){
            toastr.success("Insert Success")
            $('div#buttonsubmit').html('<button type="submit" id="BtnSubmit" class="btn btn-primary">Submit</button>');
        },
        error:function(responsegagal,a,e){
          //alert(JSON.stringify(responsegagal) +' : '+ e);
          console.log(JSON.stringify(responsegagal.responseJSON.data));
          toastr.error(responsegagal.responseJSON.data)
          $('div#buttonsubmit').html('<button type="submit" id="BtnSubmit" class="btn btn-primary">Submit</button>');
        }
      })
    })
})
$('.GetContractGlobal').select2({
    theme: 'bootstrap4',
    placeholder: "Select One",
      
      ajax: {
        url: api_url+"c_freelancer/GetContractGlobal",
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
$("select[name='id_freelancer_contract_global']",'#FormAddContractExhibitA').change(function () {
  getContract(this.value);
  
});
$("select[name='id_clients_contract']",'#FormAddContractExhibitA').change(function () {
  getAttrContract(this.value);
  
});

function getContract(param){
  var url = api_url+"c_freelancer/getContractGlobal3/"+param;
  console.log(url+' -')
  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "beforeSend":function(r,s){
      $('#LoadSpinner').show();
    },
  };
  
  $.ajax(settings).done(function (response) {
    $('#LoadSpinner').css('display','none');
    $('#DivContract').show();
    var StrNama = "";
    if (response == null){
      StrNama += '<option value="0">Data Tidak Ada</option>';
      $('div#buttonsubmit').html('<button class="btn btn-primary" type="button" disabled>Submit</button>');
    } else {
      var jum = (response).length;
      StrNama += '<option value="0">Select One</option>';
      if(jum >= 1){
        for(var i=0; i < jum; i++){
          StrNama += '<option value="'+response[i].id+'">'+response[i].text+'</option>';
          $('div#buttonsubmit').html('<button type="submit" id="BtnSubmit" class="btn btn-primary">Submit</button>');
        }
      } else {
        StrNama += '<option value="0">Data Tidak Ada</option>';
        $('div#buttonsubmit').html('<button class="btn btn-primary" type="button" disabled>Silahkan Add Contract terlebih dahulu</button>');
      }
      
    }
    
    $("select[name='id_clients_contract']",'#FormAddContractExhibitA').html(StrNama);
  });
}

function getAttrContract(param){
  
  if(param != 0){
    var url = api_url+"C_freelancer_contract_exhibit_a/GetContractExhibitByCC/"+param;
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
      console.log(response);
      $('#LoadSpinner').css('display','none');
      getFreelanceRole();
      getDeliverables();
      param != 0 ? $('#AtributContract').show() : $('#AtributContract').css('display','none');
      var html_engagement = '';
      var html_photobooth = '';
      var html_wedding_photo = '';
      var html_wedding_video = '';
      for(var i=0; i < (response.data).length; i++){
        response.data[i].id_engagement != undefined ? 
        html_engagement +=
        '<div class="form-group col-md-3">'+
        '  <label for="" class="control-label">Id Engagement <span style="color:red" >*</span></label>'+
        '  <select name="id_clients_contract_details_wedding_photo['+i+']" id="" class="form-control">'+
        '<option value="'+response.data[i].id_engagement+'">'+response.data[i].id_engagement+'</option>'+
        '  </select>'+
        '</div>'+
        '<div class="form-group col-md-3">'+
        '  <label for="" class="control-label">Time Start <span style="color:red" >*</span></label>'+
        '  <input type="time" class="form-control" name="freelance_time_start['+i+']">'+
        '</div>'+
        '<div class="form-group col-md-2">'+
        '  <label for="" class="control-label">Role <span style="color:red" >*</span></label>'+
        '  <select name="id_master_freelancer_role['+i+']" id="freelance_role_engagement" class="form-control">'+
        '  </select>'+
        '</div>'+
        '<div class="form-group col-md-2">'+
        '  <label for="" class="control-label">Deliverable <span style="color:red" >*</span></label>'+
        '  <select name="id_master_deliverables_of_the_contractor['+i+']" id="deliverable_engagement" class="form-control">'+
        '  </select>'+
        '</div>'+
        '<div class="form-group col-md-2">'+
        '  <label for="" class="control-label">Rate <span style="color:red" >*</span></label>'+
        '  <input type="text" class="form-control" name="hourly_rates['+i+']" placeholder="Rate">'+
        '</div>      ' :
        html_engagement += '';

        //photobooth
        response.data[i].id_photobooth != undefined ? 
        html_photobooth += 
        '<div class="form-group col-md-3">'+
        '  <label for="" class="control-label">Id Photobooth <span style="color:red" >*</span></label>'+
        '  <select name="id_clients_contract_details_photobooth['+i+']" id="" class="form-control">'+
        '<option value="'+response.data[i].id_photobooth+'">'+response.data[i].id_photobooth+'</option>'+
        '  </select>'+
        '</div>'+
        '<div class="form-group col-md-3">'+
        '  <label for="" class="control-label">Time Start <span style="color:red" >*</span></label>'+
        '  <input type="time" class="form-control" name="freelance_time_start['+i+']">'+
        '</div>'+
        '<div class="form-group col-md-2">'+
        '  <label for="" class="control-label">Role <span style="color:red" >*</span></label>'+
        '  <select name="id_master_freelancer_role['+i+']" id="freelance_role_photobooth" class="form-control">'+
        '  </select>'+
        '</div>'+
        '<div class="form-group col-md-2">'+
        '  <label for="" class="control-label">Deliverable <span style="color:red" >*</span></label>'+
        '  <select name="id_master_deliverables_of_the_contractor['+i+']" id="deliverable_photobooth" class="form-control">'+
        '  </select>'+
        '</div>'+
        '<div class="form-group col-md-2">'+
        '  <label for="" class="control-label">Rate <span style="color:red" >*</span></label>'+
        '  <input type="text" class="form-control" name="hourly_rates['+i+']" placeholder="Rate">'+
        '</div>' :
        html_photobooth += '';

        //wedding photo
        response.data[i].id_wedding_photo != undefined ? 
        html_wedding_photo +=
        '<div class="form-group col-md-3">'+
        '  <label for="" class="control-label">Id Wedding Photo <span style="color:red" >*</span></label>'+
        '  <select name="id_wedding_photo" id="" class="form-control">'+
        '<option value="'+response.data[i].id_wedding_photo+'">'+response.data[i].id_wedding_photo+'</option>'+
        '  </select>'+
        '</div>'+
        '<div class="form-group col-md-3">'+
        '  <label for="" class="control-label">Time Start <span style="color:red" >*</span></label>'+
        '  <input type="time" class="form-control" name="freelance_time_start['+i+']">'+
        '</div>'+
        '<div class="form-group col-md-2">'+
        '  <label for="" class="control-label">Role <span style="color:red" >*</span></label>'+
        '  <select name="id_master_freelancer_role['+i+']" id="freelance_role_wedding_photo" class="form-control">'+
        '  </select>'+
        '</div>'+
        '<div class="form-group col-md-2">'+
        '  <label for="" class="control-label">Deliverable <span style="color:red" >*</span></label>'+
        '  <select name="id_master_deliverables_of_the_contractor['+i+']" id="deliverable_wedding_photo" class="form-control">'+
        '  </select>'+
        '</div>'+
        '<div class="form-group col-md-2">'+
        '  <label for="" class="control-label">Rate <span style="color:red" >*</span></label>'+
        '  <input type="text" class="form-control" name="hourly_rates['+i+']" placeholder="Rate">'+
        '</div>' :
        html_wedding_photo += '';

        //wedding video
        response.data[i].id_wedding_video != undefined ?
        html_wedding_video += 
        '<div class="form-group col-md-3">'+
        '  <label for="" class="control-label">Id Wedding Video <span style="color:red" >*</span></label>'+
        '  <select name="id_wedding_video" id="" class="form-control">'+
        '<option value="'+response.data[i].id_wedding_video+'">'+response.data[i].id_wedding_video+'</option>'+
        '  </select>'+
        '</div>'+
        '<div class="form-group col-md-3">'+
        '  <label for="" class="control-label">Time Start <span style="color:red" >*</span></label>'+
        '  <input type="time" class="form-control" name="freelance_time_start['+i+']">'+
        '</div>'+
        '<div class="form-group col-md-2">'+
        '  <label for="" class="control-label">Role <span style="color:red" >*</span></label>'+
        '  <select name="id_master_freelancer_role['+i+']" id="freelance_role_wedding_video" class="form-control">'+
        '  </select>'+
        '</div>'+
        '<div class="form-group col-md-2">'+
        '  <label for="" class="control-label">Deliverable <span style="color:red" >*</span></label>'+
        '  <select name="id_master_deliverables_of_the_contractor['+i+']" id="deliverable_wedding_video" class="form-control">'+
        '  </select>'+
        '</div>'+
        '<div class="form-group col-md-2">'+
        '  <label for="" class="control-label">Rate <span style="color:red" >*</span></label>'+
        '  <input type="text" class="form-control" name="hourly_rates['+i+']" placeholder="Rate">'+
        '</div>' :
        html_wedding_video += '';
      } 
      $('div#Engagement').html(html_engagement);
      $('div#Photobooth').html(html_photobooth);
      $('div#WeddingPhoto').html(html_wedding_photo);
      $('div#WeddingVideo').html(html_wedding_video);
    });
  } else {
    $('#AtributContract').css('display','none');
  }
  
}

function getFreelanceRole(){
  var settings = {
    "url": api_url+"C_freelancer_contract_exhibit_a/GetFreelanceRole",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    var html_engagement = '';
    html_engagement += ' <option>Select One</option>';
    for(var i=0; i < (response.data).length; i++){
      //engagement
      response.data[i].id != undefined ? 
      html_engagement += ' <option value="'+response.data[i].id+'">'+response.data[i].freelancer_role+'</option>' :
      html_engagement += '';
    }
    $('select#freelance_role_engagement').html(html_engagement);
    $('select#freelance_role_photobooth').html(html_engagement);
    $('select#freelance_role_wedding_photo').html(html_engagement);
    $('select#freelance_role_wedding_video').html(html_engagement);
  });
}

function getDeliverables(){
  var settings = {
    "url": api_url+"C_freelancer_contract_exhibit_a/GetDeliverables",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    var html_engagement = '';
    html_engagement += ' <option>Select One</option>';
    for(var i=0; i < (response.data).length; i++){
      //engagement
      response.data[i].id != undefined ? 
      html_engagement += ' <option value="'+response.data[i].id+'">'+response.data[i].deliverables_of_the_contractor+'</option>' :
      html_engagement += '';
    }
    $('select#deliverable_engagement').html(html_engagement);
    $('select#deliverable_photobooth').html(html_engagement);
    $('select#deliverable_wedding_photo').html(html_engagement);
    $('select#deliverable_wedding_video').html(html_engagement);
  });
}

var TableFreelancerExhibitA = $('#TableFreelancerExhibitA').DataTable({
    "paging": true,
    "searching": true,
    "ordering": true,
    "info": true,
    "pageLength": 10,
    "lengthChange": true,
    "scrollX": true,
    "processing": true,
    "ajax": {
        "url": api_url + "c_freelancer/DetailContractExhibit",
        "method": 'GET',
        "beforeSend": function (xhr) {
        },
        "dataSrc": function (json) {
            if (json.data == null) {
                toastr.error(json.message)
                return json;
            } else {
                return json.data;
            }
        }
    },
    columnDefs: [
        { targets: [0], width: "30%", visible: true },
        { targets: [1], width: "15%", visible: true },
        { targets: [2], width: "15%", visible: true }
    ],
    "columns": [
        {
            "data": "id",
            "render": function (data, type, full, meta) {
                var param_edit = "'" + full.id + "|edit'";
                var aksi_edit = 'onClick="editData(' + param_edit + ');"';
                var param_delete = "'" + full.id + "'";
                var aksi_delete = 'onClick="deleteData(' + param_delete + ');"';

                 data = '<button type="button" class="btn btn-primary" ' + aksi_edit + '>Edit</button> &nbsp; <button type="button" class="btn btn-danger" ' + aksi_delete + '>Delete</button>';
                return data;
            }
        },
        { "data": "no_ref" },
        { "data": "created_date" },
    ],
    "bDestroy": true
}); 
$('#BtnAksesExhibitA').html('<i class="fa fa-plus"></i> Add');
function AddExhibitA(){
  location.replace(ui_url+"c_freelancer_contract_exhibit_a/add");
}
function Back(){
    $('#HtmlTitleExhibitA').html('List Freelance Exhibit');
    $("#TableFreelancerExhibitA").DataTable().ajax.reload();
    $('#viewContentExhibitA').show();
    $('#editContentExhibitA').hide();
    $('#BtnAksesExhibitA').empty('');
    $('#BtnAksesExhibitA').append('<i class="fa fa-plus"></i> Add');
    $('#BtnAslinyaExhibitA').attr('onclick','AddExhibitA();');
  }
function editData(param){
    var pecah = param.split("|");
    var id = pecah[0];
    var type = pecah[1];
    $('#HtmlTitle').html('Edit Exhibit A');
    $("#viewContentExhibitA").hide();

    $('#BtnAksesExhibitA').html('<i class="fas fa-arrow-left"></i> Back');
    $('#BtnAslinyaExhibitA').attr('onclick','Back();');
    var settings = {
        "url": api_url+"/c_freelancer/GetContractExhibit/"+id,
        "method": "GET",
        "timeout": 0,
        "beforeSend":function(r,s){
            $('#LoadSpinner').show();
          },
      };
      
      $.ajax(settings).done(function (response) {
        $('#LoadSpinner').hide();
        $("#editContentExhibitA").show();

        var html_formedit = '';
        var jum = (response.data).length;
        for(var i=0; i < jum; i++){
            html_formedit += 
            '<div class="col-md-6">'+
            '<div class="card">'+
            '    <div class="card-body">'+
            '        <div class="form-row">'+
            '           <div class="form-group col-md-12">'+
            '        <label for="" class="control-label">Id Engagement <span style="color:red">*</span></label>';
            if(response.data[i].id_engagement != undefined){
                html_formedit +=
                '            <select name="id_clients_contract" id="" class="form-control select-blank">'+
                '            <option value="'+response.data[i].id_engagement+'">'+response.data[i].id_engagement+' Valid</option>'+
                '            </select>';
            } else {
                html_formedit +=
                '            <select name="id_clients_contract" id="" class="form-control select-blank">'+
                '            <option>Data tidak ditemukan</option>'+
                '            </select>';
            }
            html_formedit +=
            '           </div>'+
            '        </div>'+
            '        <div class="form-row">'+
            '           <div class="form-group col-md-12">'+
            '        <label for="" class="control-label">Id Photobooth <span style="color:red">*</span></label>';
            if(response.data[i].id_photobooth != undefined){
                html_formedit +=
                '            <select name="id_clients_contract" id="" class="form-control select-blank">'+
                '            <option value="'+response.data[i].id_photobooth+'">'+response.data[i].id_photobooth+' Valid</option>'+
                '            </select>';
            } else {
                html_formedit +=
                '            <select name="id_clients_contract" id="" class="form-control select-blank">'+
                '            <option>Data tidak ditemukan</option>'+
                '            </select>';
            }
            html_formedit +=
            '           </div>'+
            '        </div>'+
            '        <div class="form-row">'+
            '           <div class="form-group col-md-12">'+
            '        <label for="" class="control-label">Id Wedding Photo <span style="color:red">*</span></label>';
            if(response.data[i].id_wedding_photo != undefined){
                html_formedit +=
                '            <select name="id_clients_contract" id="" class="form-control select-blank">'+
                '            <option value="'+response.data[i].id_wedding_photo+'">'+response.data[i].id_wedding_photo+' Valid</option>'+
                '            </select>';
            } else {
                html_formedit +=
                '            <select name="id_clients_contract" id="" class="form-control select-blank">'+
                '            <option>Data tidak ditemukan</option>'+
                '            </select>';
            }
            html_formedit +=
            '           </div>'+
            '        </div>'+
            '        <div class="form-row">'+
            '           <div class="form-group col-md-12">'+
            '        <label for="" class="control-label">Id Wedding Video <span style="color:red">*</span></label>';
            if(response.data[i].id_wedding_video != undefined){
                html_formedit +=
                '            <select name="id_clients_contract" id="" class="form-control select-blank">'+
                '            <option value="'+response.data[i].id_wedding_video+'">'+response.data[i].id_wedding_video+' Valid</option>'+
                '            </select>';
            } else {
                html_formedit +=
                '            <select name="id_clients_contract" id="" class="form-control select-blank">'+
                '            <option>Data tidak ditemukan</option>'+
                '            </select>';
            }
            html_formedit +=
            '           </div>'+
            '        </div>'+
            '        <div class="form-row">'+
            '           <div class="form-group col-md-12">'+
            '        <label for="" class="control-label">id_master_freelancer_role <span style="color:red">*</span></label>'+
            '            <select name="id_clients_contract" id="" class="form-control select-blank">'+
            '            <option>Data tidak ditemukan</option>'+
            '            </select>'+    
            '           </div>'+
            '        </div>'+
            '        <div class="form-row">'+
            '           <div class="form-group col-md-12">'+
            '        <label for="" class="control-label">id_master_deliverables_of_the_contractor <span style="color:red">*</span></label>'+
            '            <select name="id_clients_contract" id="" class="form-control select-blank">'+
            '               <option>Data tidak ditemukan</option>'+
            '            </select>'+  
            '           </div>'+
            '        </div>'+
            '        <div class="form-row">'+
            '           <div class="form-group col-md-12">'+
            '        <label for="" class="control-label">hourly_rates <span style="color:red">*</span></label>'+
            '            <input type="text name="" class="form-control" placeholder="Hourly Rates">'+
            '           </div>'+
            '        </div>'+
            '    </div>'+
            '</div>'+
            '</div>';
        }
        $('#formEdit').empty()
        $('#formEdit').append(html_formedit)
        console.log(response);
      });
}
function deleteData(param){
    $('#ModalDeleteExhibitA').modal('show');
    $('#BtnDeleteExhibitAx').attr('onclick','BtnSaveDelete('+param+');');
}