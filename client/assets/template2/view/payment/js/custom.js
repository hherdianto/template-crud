    var datatb ={};
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    $(function(){
        getDatatable();
    });

    function getDatatable(){
        $.ajax({
            url:api_url+"c_payment/getDataPayment",
            type:"get",
            dataType:"json",
            async:false,
            beforeSend:function(r){
              $('#overlay').html('<div class="overlay"><i class="fas fa-2x fa-sync fa-spin"></i></div>');
            },
            success:function(data,status){
                datatb = data.data;
                $('#overlay').html('');
            },
            error:function(j,r,e){
              $('#overlay').html('');
            }
        });

        $.fn.dataTable.ext.errMode = 'thrown';
        var t=$("#example1").DataTable({
           // dom: 'Bfrtip',
            buttons: [
                'excel', 'pdf','print'
            ],
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
              "sProcessing": true,
              "retrieve": false,
              "paging": true,
              "sPaginationType": "full_numbers",
              "destroy": true,
              "searching": true,
              "order" : [3,'ASC'],
              "aaData":datatb,
              "aoColumns": [
                {
                  "mData": null,
                  "width": "30px",
                  "sClass": "text-center",
                  "orderable": false,
                  "title":"No"
                },
                {"mData":"action","title":"Action","width":"10%"},
                {"mData":"person1_full_name","title":"Clients"},
                {"mData":"payment_date","title":"Date"},
                {"mData":"amount_payment","title":"Amount",render: function ( data, type, row ) {
                    return formatter.format(data);
                }},
                {"mData":"payment_method","title":"Payment method"},
                {"mData":"payment_ref_number","title":"Ref Number"},
                {"mData":"desc_account3","title":"Account"},
              ],
              "columnDefs": [
              { 
                "targets": [ 0 ], 
                "orderable": true, 
              },
              { "width": "16%", "targets": 1 }
              ],
              "oLanguage": {
                 "processing": "Sedang mengambil data"
              },
        });
         t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
    }

  function detail(id=null){
    $.ajax({
        url:api_url +'c_payment/detail/'+id,
        type:'get',
        dataType:'json',
        beforeSend:function(r){
          $('#overlay').html('<div class="overlay d-flex justify-content-center align-items-center"><i class="fas fa-2x fa-sync fa-spin"></i></div>');
        },
        success:function(r,status){
            $('#boxdatatable').hide();
            $('#formPayment').html(r.body).show();
            if(r.id){
              $('#footPayment').html('<div class="row no-print"><div class="col-12"><a href="'+ui_url+'payment/c_payment/cetak/'+r.id+'" class="btn btn-success float-right" target="_blank"><i class="fa fa-print"></i> Print</a><a href="'+ui_url+'payment/c_payment/generatePDF/'+r.id+'" class="btn btn-primary float-right" style="margin-right: 5px;" target="_blank"><i class="fas fa-download"></i> Generate PDF</a><button id="sendMail" onClick="javascript:kirimEmail(\''+r.id+'\');" class="btn btn-primary float-right" style="margin-right: 5px;"><i class="fas fa-envelope"></i> Send Mail</button><button id="sendMailDisable" class="btn btn-primary float-right" type="button" style="display:none;margin-right: 5px;" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</button><button onClick="javascript:kembali();" class="btn btn-primary float-left" style="margin-right: 5px;"><i class="fas fa-close"></i> Cancel</button></div></div>')
            }
            $('#overlay').html('');
        }
    });
  }

  function addPayment(){
    $.ajax({
      url:api_url +'c_payment/addPayment/'+idUserLogin,
      type: 'get',
      dataType:'json',
      beforeSend:function(r){
        $('#overlay').html('<div class="overlay d-flex justify-content-center align-items-center"><i class="fas fa-2x fa-sync fa-spin"></i></div>');
      },
      success:function(data,status){
        $('button#addpay').html('<i class="fa fa-window-close"> Cancel</i>').attr('onclick','kembali()');
        $('#boxdatatable').hide();
        $('#formPayment').html(data.body).show();
        $('#id_clients_contract').select2({
          theme: 'bootstrap4',
          placeholder: "Clients",
          
          ajax: {
            url: api_url+"c_payment/getClientsContract",
            dataType: 'json',
            minimumInputLength: 1,
            type: "POST",
            data: function (params) {
            return {
              search: params.term,
            }
          },
          processResults: function (data) {
          return {
            results: data
          };
        },
        cache:true
          }
        })
        


      $('#id_master_payment_method').select2({
          theme: 'bootstrap4',
          placeholder: "Payment Method",
          
          ajax: {
            url: api_url+"c_payment/getPaymentMethod",
            dataType: 'json',
            type: "POST",
            processResults: function (data) {
              return {
                results: data
              };
            }
        }
        })

      $('#id_master_account3').select2({
          theme: 'bootstrap4',
          placeholder: "Account",
          
          ajax: {
            url: api_url+"c_payment/getMasterAccount3",
            dataType: 'json',
            type: "POST",
            processResults: function (data) {
              return {
                results: data
              };
            }
        }
        });
        $('.currency').maskNumber();
        cb(moment());

        $('input[name="payment_date"]').daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          minYear: 2000,
          maxYear: parseInt(moment().format('YYYY'),10)
        }, cb);
        $('#overlay').html('');
      }
    })
  }

  function kembali(){
      $('#formPayment').hide();
      $('#boxdatatable').show();
      $('button#addpay').html('<i class="fa fa-plus"> Add</i>').attr('onclick','addPayment()');
  }

function sendpayment(receipt=null){
  var $formpayment = $("form#formpayment");
  var $button =$('div#buttonsubmit');
  var $urlpayment = (receipt===true) ? ui_url +'payment/c_payment/savePayment/receipt/' : ui_url +'payment/c_payment/savePayment/';
  var $beforesend = (receipt===true) ? '<button id="submit" class="btn btn-primary" disabled>Proccess</button> <button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</button>' : '<button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</button> <button id="submitsend" class="btn btn-primary" disabled>Proccess and send receipt</button>';

    $.ajax({
      url:$urlpayment,
      type:'post',
      data:$formpayment.serialize(),
      dataType:'json',
      beforeSend:function(r,s){
        $button.html($beforesend);
      },
      success:function(data){
        alert(data.msg);
        kembali();
        getDatatable();
      },
      error:function(j,r,e){
        alert(JSON.stringify(j) +' : '+ e);
        $button.html('<button id="submit" onclick="sendpayment();" class="btn btn-primary">Proccess</button> <button id="submitsend" onclick="sendpayment(true);" class="btn btn-primary">Proccess and send receipt</button>');
      }
  })
}

function cb(start, end) {
  $('input[name="payment_date"]').html(start.format('MM/DD/YYYY'));
}


