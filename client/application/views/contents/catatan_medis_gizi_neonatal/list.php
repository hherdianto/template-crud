<style type="text/css">
	.section-header
	{
		background: #337AB7;
    padding: 5px 10px 5px 10px;
    text-transform: uppercase;
    color: white;
    font-size: 14px;
	}

	.section-header a
	{
	    color: white;
	    padding: 5px 10px 5px 10px;
	    margin: -5px -10px 0 0;
	    background: #D9534F;
	}

	div.pad3
	{
		padding: 10px;
    	margin-bottom: 20px;
	}

	.conrm
	{
		margin-bottom: 25px;
	}

	.tgl
	{
		font-size:12px;
	}

  textarea 
  {
    resize: vertical;
  }
  
  .sptr{
    margin-top: 0px;
    margin-bottom: 0px;
    border: 0;
    border-top: 1px solid #eee;
  }


  .mt-5{margin-top:5px !important}
  .mt-20{margin-top:20px !important}
  .pt-20{padding-top:20px !important}
  
  .mb-5{margin-bottom:5px}
  .mb-20{padding-bottom:20px}

</style>
<br>
<br>
<div class="col-md-12" id="view-container">
  <div class="row">
    <div class="col-md-6">
      <div class="panel panel-primary">
        <div class="panel-heading">Template (AKTIF)</div>
        <div class="panel-body">
          <div class="row">
            <div class="col-md-12">
              <div class="col-md-7">
                <div class="row">
                  <select class="select2 select-aktif form-control">
                  <?php foreach($data_reg_aktif as $d_aktif):?>
                    <option value="<?=$d_aktif['id_pasien_registrasi'];?>"><?=$d_aktif['no_reg'];?> - <?=$d_aktif['tanggal_checkin'];?></option>
                  <?php endforeach;?>
                  </select>
                </div>
              </div>
              
            </div>
            <div class="col-md-12 render-aktif"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="panel panel-primary">
        <div class="panel-heading">Template (ARSIP)</div>
        <div class="panel-body">
          <div class="row">
            <?php if(count($data_reg_arsip) <= 0 ):?>
              <div class="col-md-12"><strong>Pasien belum memiliki (Arsip)</strong></div>
            <?php else : ?>
              <div class="col-md-12">  
                <div class="col-md-7">
                  <div class="row">
                    <select class="select2 select-arsip form-control">
                      <?php foreach($data_reg_arsip as $d_arsip):?>
                        <option value="<?=$d_arsip['id_pasien_registrasi'];?>"><?=$d_arsip['no_reg'];?> - <?=$d_arsip['tanggal_checkin'];?></option>
                      <?php endforeach;?>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-12 render-arsip"></div>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="col-md-12" id="form-container" style="display:none;"></div>

<script type="text/javascript">
  var aktif_pdf,arsip_pdf;
  
  $(document).ready(function ()
  {
    $(window).scrollTop(0);
    
    $('.select-aktif').select2();
    $('.select-arsip').select2();

    render();
    render_arsip();
  });

  function render() 
  {
    id_reg_aktif = $('.select-aktif').val();

    $.get('<?php echo base_url();?>'+class_name+"/render_data/list/"+ id_reg_aktif + "/aktif",

    function(response){
      $('.render-aktif').html(response);
    });
  }

  function render_arsip() 
  {
    id_reg_arsip = $('.select-arsip').val();

    $.get('<?php echo base_url();?>'+class_name+"/render_data/list/"+ id_reg_arsip + "/arsip",
    function(response)
    {
      $('.render-arsip').html(response);
    });   
  }

  $('.select-aktif').change(function(e) 
  { 
    e.preventDefault();
    render();
  });

  $('.select-arsip').change(function(e) 
  {
    e.preventDefault();
    render_arsip();
  });



  $('.tambah-arsip').click(function(e) 
  {
    e.preventDefault();
    id_reg_arsip = $('.select-arsip').val();
    id_visit = $('#id_visit_arsip').val();
    process_button(0);
    $.post('<?php echo base_url();?>'+class_name+'/add_submenu/', {
      'id_reg': id_reg_arsip, 'id_visit': id_visit
    }).done(function(response) {
      process_button(1);
      $('#form-container').html(response);
      $('#view-container').hide();
      $('#form-container').show();

    }).fail(function() {
      process_button(1);
      alert('Gagal menampilkan data')
    });
  });

  $('.ubah-arsip').click(function(e) 
  {
    e.preventDefault();
    id_reg_arsip = $('.select-arsip').val();
    process_button(0);
    $.get('<?php echo base_url();?>'+class_name+'/edit_submenu/', {
      'id_reg': id_reg_arsip
    }).done(function(response) {
      process_button(1);
      $('#form-container').html(response);
      $('#view-container').hide();
      $('#form-container').show();

    }).fail(function() {
      process_button(1);
      alert('Gagal menampilkan data')
    });
  });
  
  $('.hapus-aktif').click(function(e) 
  {
    e.preventDefault();

    if(confirm("Apa anda yakin ingin menghapus data ini?")) 
    {
      id_reg_aktif   = $('.select-aktif').val();
      id_visit_aktif = $('#id_visit_aktif').val();
     
      delete_url = '<?php echo base_url();?>'+class_name+'/delete_submenu/'+ id_reg_aktif + '/' + id_visit_aktif + '/aktif';

      $.get(delete_url, function(response) 
      {
        data = JSON.parse(response);
        if (data.status == 200) 
        {
          if(aktif_pdf)
          {
            aktif_pdf.close();
          }
          render();
          return false;
        } else {
          alert('Gagal menghapus data');
          return false;
        }
      });
    }
    else 
    {
      return false;
    }
  });

  $('.hapus-arsip').click(function(e) 
  {
    if(confirm("Apa anda yakin ingin menghapus data ini?")) 
    {
      id_reg_arsip = $('.select-arsip').val();
      id_visit_arsip = $('#id_visit_arsip').val();

      delete_url = '<?php echo base_url();?>'+class_name+'/delete_submenu/'+ id_reg_arsip + '/' + id_visit_arsip + '/arsip';

      $.get(delete_url, function(response) 
      {
        data = JSON.parse(response);

        if (data.status == 200) 
        {
          if(arsip_pdf)
          {
            arsip_pdf.close();
          }
          render_arsip();
          return false;

        } else {
          alert('Gagal menghapus data');
          return false;

        }

      });
    }
    else 
    {
      return false;
    }
  });
  
  $('.cetak-aktif').on("click",function(e)
  {
    aktif_pdf = window.open('<?php echo base_url();?>'+class_name+'/view_pdf?status=aktif');
  });

  $('.cetak-arsip').on("click",function(e)
  {
    arsip_pdf = window.open('<?php echo base_url();?>'+class_name+'/view_pdf?status=arsip');
  });

  function process_button(type)
  {
    if(type == 1)
    {
      $('.tambah-aktif').attr("disabled",false);
      $('.ubah-aktif').attr("disabled",false);
      $('.hapus-aktif').attr("disabled",false);
      $('.cetak-aktif').attr("disabled",false);
      $('.tambah-arsip').attr("disabled",false);
      $('.ubah-arsip').attr("disabled",false);
      $('.hapus-arsip').attr("disabled",false);
      $('.cetak-arsip').attr("disabled",false);
    }
    else
    {
      $('.tambah-aktif').attr("disabled",true);
      $('.ubah-aktif').attr("disabled",true);
      $('.hapus-aktif').attr("disabled",true);
      $('.cetak-aktif').attr("disabled",true);
      $('.tambah-arsip').attr("disabled",true);
      $('.ubah-arsip').attr("disabled",true);
      $('.hapus-arsip').attr("disabled",true);
      $('.cetak-arsip').attr("disabled",true);
    }
  }
</script>