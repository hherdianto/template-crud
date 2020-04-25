$(function(){
    $("form#FormAddFreelance").on('submit',function(e){
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
            toastr.success("Insert Success")
            $('div#buttonsubmit').html('<button type="submit" id="submit" class="btn btn-primary btn-block">Submit</button>');
        },
        error:function(responsegagal,a){
          //alert(JSON.stringify(j) +' : '+ e);
          console.log(JSON.stringify(responsegagal.responseJSON.data));
          toastr.error(responsegagal.responseJSON.data)
          $('div#buttonsubmit').html('<button type="submit" id="submit" class="btn btn-primary btn-block">Submit</button>');
        }
      })
    })
})
$("select[name='contract']",'#FormAddContractGlobal').select2({
  theme: 'bootstrap4',
  placeholder: "Select One",
})
$('.getCity').select2({
    theme: 'bootstrap4',
    placeholder: "City",
     
    ajax: {
        url: api_url+"c_customer/getCity",
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
var TableFreelancer = $('#TableFreelancer').DataTable({
    "paging": true,
    "searching": true,
    "ordering": true,
    "info": true,
    "pageLength": 10,
    "lengthChange": true,
    "scrollX": true,
    "processing": true,
    "ajax": {
        "url": base_url + "c_freelancer/retrieveData",
        "method": 'GET',
        "beforeSend": function (xhr) {
        },
        "dataSrc": function (json) {
            if (json.Data == null) {
                swal({ title: 'Gagal Menampilkan Data Freelance', text: json.ReturnMessage, confirmButtonClass: 'btn-danger text-white', confirmButtonText: 'Oke, Mengerti', type: 'error' });
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
            "data": "id",
            "render": function (data, type, full, meta) {
                var param_edit = "'" + full.id + "|edit'";
                var aksi_edit = 'onClick="editData(' + param_edit + ');"';
                var param_delete = "'" + full.id + "|" + full.person1_full_name + "'";
                var aksi_delete = 'onClick="deleteData(' + param_delete + ');"';

                 data = '<button type="button" class="btn btn-primary" ' + aksi_edit + '>Edit</button> &nbsp; <button type="button" class="btn btn-danger" ' + aksi_delete + '>Delete</button>';
                return data;
            }
        },
        { "data": "person1_full_name" },
        { "data": "person1_email" },
        { "data": "person1_cell_number" },
        { "data": "person2_full_name" },
        { "data": "person2_email" },
        { "data": "person2_cell_number" }
    ],
    "bDestroy": true
});
function comboCity(param) {
    $.ajax({
        url: api_url + "/c_customer/getCity",
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
          $("select[name='id_master_city']").html(StrNama);
        }, error: function (errorresponse) {
          toastr.error("terjadi kesalahan")
        }
    });
  }

$('#BtnAkses').html('<i class="fa fa-plus"></i> Add');
function Add(){
  location.replace(ui_url+"c_freelancer/add");
}
function Back(){
    $('#HtmlTitle').html('List Freelance');
    $("#TableFreelancer").DataTable().ajax.reload();
    $('#viewContent').show();
    $('#editContent').hide();
    $('#BtnAkses').empty('');
    $('#BtnAkses').append('<i class="fa fa-plus"></i> Add');
    $('#BtnAslinya').attr('onclick','Add();');
  }

function editData(param){
    var pecah = param.split("|");
    var id = pecah[0];
    var type = pecah[1];
    $('#HtmlTitle').html('Edit Contract');
    $("#viewContent").hide();

    $('#BtnAkses').html('<i class="fas fa-arrow-left"></i> Back');
    $('#BtnAslinya').attr('onclick','Back();');

    var settings = {
        "url": api_url+"/c_freelancer/retrieveByIds/"+id,
        "method": "GET",
        "timeout": 0,
        "beforeSend":function(r,s){
          $('#LoadSpinner').show();
        },
      };
      
      $.ajax(settings).done(function (response) {
        $('#LoadSpinner').hide();
        $("#editContent").show();
        comboCity(response.data[0].id_master_city)
        $("input[name='id_user']",'#FormEditFreelancer').val(response.data[0].id);
        $("input[name='username']",'#FormEditFreelancer').val(response.data[0].username);
        $('input[name="person1_full_name"]','#FormEditFreelancer').val(response.data[0].person1_full_name);
        $('input[name="person1_email"]','#FormEditFreelancer').val(response.data[0].person1_email);
        $('input[name="person1_cell_number"]','#FormEditFreelancer').val(response.data[0].person1_cell_number);
        $('input[name="mailing_address_1"]','#FormEditFreelancer').val(response.data[0].mailing_address_1);
        console.log(response);
      });
}

$(function(){
    $("form#FormEditFreelancer").on('submit',function(e){
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
            toastr.success("Update Success")
            $('div#buttonsubmit').html('<button type="submit" id="submit" class="btn btn-primary btn-block">Submit</button>');
        },
        error:function(responsegagal,a,e){
          //alert(responsegagal);
          console.log(JSON.stringify(responsegagal));
          toastr.error("Terjadi Kesalahan, Data Harus Unik")
          $('div#buttonsubmit').html('<button type="submit" id="submit" class="btn btn-primary btn-block">Submit</button>');
        }
      })
    })
})

function deleteData(param){
    var pecah = param.split("|");
    var id = pecah[0];
    var type = pecah[1];
    //alert(id)
    $("#BtnDelete").attr('onclick','BtnDelete('+id+');');
    $("#NamaUser").text(type);
    $("#ModalDelete").modal('show');
}
function BtnDelete(param){
  var settings = {
    "url": api_url+"c_freelancer/delete/"+param,
    "method": "POST",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    $("#ModalDelete").modal('hide');
    $("#TableFreelancer").DataTable().ajax.reload();
    toastr.success("Berhasil Menghapus Data !")
  });
}

/////////////////////////////   ////////////////////////////////
//////////////////////    Global    ////////////////////////////
////////////////////////////   /////////////////////////////////

$("select[name='id_clients']",'#FormAddContractGlobal').change(function () {
  getContract(this.value);
});

function getContract(param){
  var settings = {
    "url": api_url+"c_freelancer/getContractGlobal1/"+param,
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    
    var StrNama = "";
    if (response == null){
      StrNama += '<option>Data Tidak Ada</option>';
    } else {
      var jum = (response).length;
      if(jum >= 1){
        for(var i=0; i < jum; i++){
          StrNama += '<option value="'+response[i].id+'">'+response[i].text+'</option>';
        }
      } else {
        StrNama += '<option>Data Tidak Ada</option>';
      }
      
    }
    
    //$("select[name='contract']",'#FormAddContractGlobal').html(StrNama);
    console.log(response);
  });
}

$(function(){
  $("form#FormAddContractGlobal").on('submit',function(e){
    e.preventDefault();
    $.ajax({
      url:$(this).attr('action'),
      type:'post',
      data:$(this).serialize(),
      dataType:'json',
      beforeSend:function(r,s){
        $('div#buttonsubmit','#FormAddContractGlobal').html('<button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> &nbsp;Loading...</button>');
      },
      success:function(data){
          toastr.success("Insert Success")
          $('div#buttonsubmit','#FormAddContractGlobal').html('<button type="submit" id="submit" class="btn btn-primary">Submit</button>');
      },
      error:function(responsegagal,a,e){
        //alert(JSON.stringify(responsegagal) +' : '+ e);
        console.log(JSON.stringify(responsegagal.responseJSON.data));
        toastr.error(responsegagal.responseJSON.data)
        $('div#buttonsubmit','#FormAddContractGlobal').html('<button type="submit" id="submit" class="btn btn-primary">Submit</button>');
      }
    })
  })
})

var TableFreelancerGlobal = $('#TableFreelancerGlobal').DataTable({
  "paging": true,
  "searching": true,
  "ordering": true,
  "info": true,
  "pageLength": 10,
  "lengthChange": true,
  "scrollX": true,
  "processing": true,
  "ajax": {
      "url": base_url + "C_freelancer_contract_global/retrieveData",
      "method": 'GET',
      "beforeSend": function (xhr) {
      },
      "dataSrc": function (json) {
          if (json.Data == null) {
              swal({ title: 'Gagal Menampilkan Data Freelance Global', text: json.ReturnMessage, confirmButtonClass: 'btn-danger text-white', confirmButtonText: 'Oke, Mengerti', type: 'error' });
              return json;
          } else {
              return json.Data;
          }
      }
  },
  columnDefs: [
      { targets: [0], width: "15%", visible: true },
      { targets: [1], width: "15%", visible: true },
      { targets: [2], width: "15%", visible: true },
      { targets: [3], width: "15%", visible: true },
      { targets: [4], width: "15%", visible: true },
      { targets: [5], width: "15%", visible: true }
  ],
  "columns": [
      {
          "data": "id",
          "render": function (data, type, full, meta) {
              var param_edit = "'" + full.id + "|edit'";
              var aksi_edit = 'onClick="editDataGlobal(' + param_edit + ');"';
              var param_delete = "'" + full.id + "|" + full.person1_full_name + "'";
              var aksi_delete = 'onClick="deleteDataGlobal(' + param_delete + ');"';

               data = '<button type="button" class="btn btn-primary" ' + aksi_edit + '>Edit</button> &nbsp; <button type="button" class="btn btn-danger" ' + aksi_delete + '>Delete</button>';
              return data;
          }
      },
      { "data": "person1_full_name" },
      { "data": "person2_full_name" },
      { "data": "no_ref" },
      { "data": "freelancer_ip_address" },
      { "data": "admin_ip_address" }
  ],
  "bDestroy": true
});

$('#BtnAksesGlobal').html('<i class="fa fa-plus"></i> Add');
function AddGlobal(){
  location.replace(ui_url+"c_freelancer_contract_global/add");
}
function BackGlobal(){
    $('#HtmlTitle').html('List Freelancer Contract Global');
    $("#TableFreelancerGlobal").DataTable().ajax.reload();
    $('#viewContentGlobal').show();
    $('#editContentGlobal').hide();
    $('#BtnAksesGlobal').empty('');
    $('#BtnAksesGlobal').append('<i class="fa fa-plus"></i> Add');
    $('#BtnAslinyaGlobal').attr('onclick','AddGlobal();');
  }

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
          $("select[name='id_clients']",'#FormEditContractGlobal').html(StrNama);
        }, error: function (errorresponse) {
          toastr.error("terjadi kesalahan")
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
          $("select[name='contract']",'#FormEditContractGlobal').html(StrNama);
        }, error: function (errorresponse) {
          toastr.error("terjadi kesalahan")
        }
    });
  }

function editDataGlobal(param){
    var pecah = param.split("|");
    var id = pecah[0];
    var type = pecah[1];
    $('#HtmlTitleGlobal').html('Edit Freelancer Contract Global');
    $("#viewContentGlobal").hide();

    $('#BtnAksesGlobal').html('<i class="fas fa-arrow-left"></i> Back');
    $('#BtnAslinyaGlobal').attr('onclick','BackGlobal();');

    var settings = {
        "url": api_url+"/c_freelancer_contract_global/retrieveByIds/"+id,
        "method": "GET",
        "timeout": 0,
        "beforeSend":function(r,s){
          $('#LoadSpinnerGlobal').show();
        },
      };
      
      $.ajax(settings).done(function (response) {
        $('#LoadSpinnerGlobal').hide();
        $("#editContentGlobal").show();
        $('#id_global','#FormEditContractGlobal').val(response.data.id);
        comboClient(response.data.id_clients);
        comboContract(response.data.contract);
        console.log(response);
      });
}

function deleteDataGlobal(param){
  var pecah = param.split("|");
  var id = pecah[0];
  var type = pecah[1];
  //alert(id)
  $("#BtnDeleteGlobalx").attr('onclick','BtnDeleteGlobal('+id+');');
  $("#NamaUserGlobal").text(type);
  $("#ModalDeleteGlobal").modal('show');
}
function BtnDeleteGlobal(param){
  var settings = {
    "url": api_url+"C_freelancer_contract_global/delete/"+param,
    "method": "POST",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    $("#ModalDeleteGlobal").modal('hide');
    $("#TableFreelancerGlobal").DataTable().ajax.reload();
    toastr.success("Berhasil Menghapus Data !")
  });
}

$(function(){
  $("form#FormEditContractGlobal").on('submit',function(e){
    e.preventDefault();
    $.ajax({
      url:$(this).attr('action'),
      type:'post',
      data:$(this).serialize(),
      dataType:'json',
      beforeSend:function(r,s){
        $('div#buttonsubmit','#FormEditContractGlobal').html('<button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> &nbsp;Loading...</button>');
      },
      success:function(data){
          toastr.success("Update Success")
          $('div#buttonsubmit','#FormEditContractGlobal').html('<button type="submit" id="submit" class="btn btn-primary">Submit</button>');
      },
      error:function(responsegagal,a,e){
        alert(JSON.stringify(responsegagal) +' : '+ e);
        //console.log(JSON.stringify(responsegagal.responseJSON.data));
        //toastr.error(responsegagal.responseJSON.data)
        $('div#buttonsubmit','#FormEditContractGlobal').html('<button type="submit" id="submit" class="btn btn-primary">Submit</button>');
      }
    })
  })
})