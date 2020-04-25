    var datatb ={};
    
    $(function(){
        getDatatable();
    });
    function select2customer(){
      $('.select2').select2({
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
    }
    function getDatatable(){
        $.ajax({
            url:api_url+"c_customer/getDataCustomer",
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
              "order" : [1,'ASC'],
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
                {"mData":"person1_full_name","title":"Full Name"},
                {"mData":"person1_email","title":"Email"},
                {"mData":"person1_cell_number","title":"Cell Number"},
                {"mData":"person2_full_name","title":"Full Name 2"},
                {"mData":"person2_email","title":"Email 2"},
                {"mData":"person2_cell_number","title":"Cell Number 2"},
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

    function editData(id=null){
        
        var $url = (id) ? api_url +'c_customer/detailform/'+id : api_url +'c_customer/detailform';
        
        $.ajax({
            url:$url,
            type:'get',
            dataType:'html',
            beforeSend:function(r){
              $('#overlay').html('<div class="overlay d-flex justify-content-center align-items-center"><i class="fas fa-2x fa-sync fa-spin"></i></div>');
            },
            success:function(r,status){
                $('#boxdatatable').hide();
                $('#FormCustomer').html(r);
                $('input[name="person1_cell_number"],input[name="person2_cell_number"]').inputmask({"mask": "(999) 999-9999"});
                select2customer();
                $('#overlay').html('');
            }
        });
    }
    function saveData(idcustomer=null){
        var $url = (idcustomer) ? api_url +"c_customer/updateclients/"+idcustomer : api_url +"c_customer/store/";
        $.ajax({
            url : $url,
            type:'post',
            dataType:'json',
            data:$("form#formclient").serialize(),
            success:function(data,status){
                alert(data.message);
                kembali();
                getDatatable();
            },
            error:function(j,r,e){
                alert(JSON.stringify(j));
            }
        })

    }

    function kembali(){
        $('#formCustomer').hide();
        $('#boxdatatable').show();
    }

