<div class="row">
  <div class="col-md-12">

<!-- start input panel col 6 sendiri -->

    <form id="form-add-1">
      <input type="hidden" class="form-control input-sm" name="id_reg" id="id_reg" value="<?= $id_reg ?>">
      <input type="hidden" class="form-control input-sm" name="id_visit" id="id_visit" value="<?= $id_visit ?>">
      <div class="row">
        <div class="col-md-6">
          <div class="panel panel-primary">
            <div class="panel-heading">Tambah Data 3</div>
            <div class="panel-body">

            <div class="row">
              <div class="col-md-12">  

                <div class="row">
                    <!-- nama -->
                  <div class="col-md-4">
                    <b>Test</b>
                  </div>
                  <div class="col-md-8">
                    <input type="text" class="form-control input-sm" name="test" id="test" value="" >
                  </div>
                </div>
                <br>

                <div class="row">
                  <!-- nama -->
                  <div class="col-md-4">
                    <b>Input dengan addon</b>
                  </div>
                  <div class="col-md-8">
                    <div class='input-group'>
                      <input type="text" class="form-control" name="input-addon" id="input-addon" value="" required autocomplete="off">
                      <span class="input-group-addon">
                        <span class="">Addon</span>
                      </span>
                    </div>
                  </div>
                </div>
                <br>

                <div class="row">
                  <!-- nama -->
                  <div class="col-md-4">
                    <b>Button toggle</b>
                  </div>
                  <div class="col-md-8">
                    <input type="hidden" name="btn-toggle-val">
                    <button class="btn btn-default btn-toggle" data-id="0">No</button>
                    <button class="btn btn-default btn-toggle" data-id="1">Yes</button>
                  </div>
                </div>
                <br>


                <div class="row">
                  <!-- nama -->
                  <div class="col-md-4">
                    <b>Tanggal</b>
                  </div>
                  <div class="col-md-8">
                    <input type="text" name="tanggal" id="tanggal" class="form-control" value="<?= date('Y-m-d') ?>" required autocomplete="off">
                  </div>
                </div>
                <br>

                <div class="row">
                  <!-- nama -->
                  <div class="col-md-4">
                    <b>Tanggal</b>
                  </div>
                  <div class="col-md-8">
                    <input type="text" name="jam" id="jam" class="form-control" value="07:00" required autocomplete="off">
                  </div>
                </div>
                <br>
 
                <div class="row">
                    <!-- nama -->
                  <div class="col-md-4">
                    <b>Petugas Approve</b>
                  </div>
                  <div class="col-md-8">
                    <select name="petugas_approved" class="petugas_approved" style="width: 100%" required>
                      <option value=""></option>
                      <?php foreach ($data_perawat as $k => $v) : ?>
                        <option value="<?= $v['id'] ?>"><?= $v['nama'] ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
                <br>

                <div class="row">
                    <!-- nama -->
                  <div class="col-md-4">
                    <b>Dokter Approve</b>
                  </div>
                  <div class="col-md-8">
                    <select name="dokter_approved" class="dokter_approved" style="width: 100%" required>
                      <option value=""></option>
                      <?php foreach ($data_dokter as $k => $v) : ?>
                        <option value="<?= $v['id'] ?>"><?= $v['nama'] ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
                <br>


              </div>

            </div>
            </div>
            <div class="panel-footer text-right">
            <button class="btn btn-default btn-sm btn-batal">Batal</button>
            <button type="submit" class="btn btn-primary btn-sm btn-kirim">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </form>
<!-- end input panel col 6 sendiri -->

<!-- start input panel col 6 kanan kiri -->
    <form id="form-add-2">
      <input type="hidden" class="form-control input-sm" name="id_reg" id="id_reg" value="<?= $id_reg ?>" >
      <div class="row">
        <div class="col-md-6">
          <div class="panel panel-primary">
            <div class="panel-heading">Tambah Data 1</div>
            <div class="panel-body">

              <div class="row">
                  <!-- nama -->
                <div class="col-md-4">
                  <b>Test</b>
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control input-sm" name="test" id="test" value="">
                </div>
              </div>
              <br>

              <div class="row">
                    <!-- nama -->
                  <div class="col-md-4">
                    <b>Petugas Approve</b>
                  </div>
                  <div class="col-md-8">
                    <select name="petugas_approved" class="petugas_approved" style="width: 100%" required>
                      <option value=""></option>
                      <?php foreach ($data_perawat as $k => $v) : ?>
                        <option value="<?= $v['id'] ?>"><?= $v['nama'] ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
                <br>

            </div>
            <div class="panel-footer text-right">
            <br>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="panel panel-primary">
            <div class="panel-heading">Tambah Data 2</div>
            <div class="panel-body">

              <div class="row">
                  <!-- nama -->
                <div class="col-md-4">
                  <b>Test</b>
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control input-sm" name="test" id="test" value="">
                </div>
              </div>
              <br>

              <div class="row">
                    <!-- nama -->
                  <div class="col-md-4">
                    <b>Dokter Approve</b>
                  </div>
                  <div class="col-md-8">
                    <select name="dokter_approved" class="dokter_approved" style="width: 100%" required>
                      <option value=""></option>
                      <?php foreach ($data_dokter as $k => $v) : ?>
                        <option value="<?= $v['id'] ?>"><?= $v['nama'] ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
                <br>

            </div>
            <div class="panel-footer text-right">
            <button class="btn btn-default btn-sm btn-batal">Batal</button>
            <button type="submit" class="btn btn-primary btn-sm btn-kirim">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </form>

<!-- end input panel col 6 kanan kiri -->

<!-- start input panel col 12 dalamnya 2 biji col 6  -->
    <form id="form-add-3">
      <input type="hidden" class="form-control input-sm" name="id_reg" id="id_reg" value="<?= $id_reg ?>" >
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-primary">
            <div class="panel-heading">Tambah Data</div>
            <div class="panel-body">

            <div class="row">
              <div class="col-md-6">  
                <div class="row">
                    <!-- nama -->
                  <div class="col-md-4">
                    <b>Test</b>
                  </div>
                  <div class="col-md-8">
                    <input type="text" class="form-control input-sm" name="test" id="test" value="">
                  </div>
                </div>
              </div>

              <div class="col-md-6">  
                <div class="row">
                    <!-- nama -->
                  <div class="col-md-4">
                    <b>Test</b>
                  </div>
                  <div class="col-md-8">
                    <input type="text" class="form-control input-sm" name="test" id="test" value="">
                  </div>
                </div>

              </div>
            </div>
            <br>


              <div class="row">
                    <!-- nama -->
                  <div class="col-md-4">
                    <b>Petugas Approve</b>
                  </div>
                  <div class="col-md-8">
                    <select name="petugas_approved" class="petugas_approved" style="width: 100%" required>
                      <option value=""></option>
                      <?php foreach ($data_perawat as $k => $v) : ?>
                        <option value="<?= $v['id'] ?>"><?= $v['nama'] ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
                <br>

                <div class="row">
                    <!-- nama -->
                  <div class="col-md-4">
                    <b>Dokter Approve</b>
                  </div>
                  <div class="col-md-8">
                    <select name="dokter_approved" class="dokter_approved" style="width: 100%" required>
                      <option value=""></option>
                      <?php foreach ($data_dokter as $k => $v) : ?>
                        <option value="<?= $v['id'] ?>"><?= $v['nama'] ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
                <br>
                
            </div>

              

            </div>
            <div class="panel-footer text-right">
            <button class="btn btn-default btn-sm btn-batal">Batal</button>
            <button type="submit" class="btn btn-primary btn-sm btn-kirim">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </form>
<!-- end input panel col 12 dalamnya 2 biji col 6  -->

  </div>
</div>


<script type="text/javascript">

  $('.dokter_approved').select2({
    placeholder: "-- Pilih dokter Approve --"
  });

  $('.petugas_approved').select2({
    placeholder: "-- Pilih petugas Approve --"
  });

  $('#jam').datetimepicker({
    format:"HH:mm",
    showTodayButton:true,
    timeZone:'',
    dayViewHeaderFormat: 'MMMM YYYY',
    stepping: 5,
    locale:moment.locale(),
    collapse:true,
    icons: {
          time:'fa fa-clock-o',
          date:'fa fa-calendar',
          up:'fa fa-chevron-up',
          down:'fa fa-chevron-down',
          previous:'fa fa-chevron-left',
          next:'fa fa-chevron-right',
          today:'fa fa-crosshairs',
          clear:'fa fa-trash-o',
          close:'fa fa-times'
    },
    sideBySide:true,
    calendarWeeks:false,
    viewMode:'days',
    viewDate:false,
    toolbarPlacement:'bottom',
    widgetPositioning:{
        horizontal: 'left',
        vertical: 'bottom'
    }
  });

  $('#tanggal').datetimepicker({
    format:"YYYY-MM-DD",
    showTodayButton:true,
    timeZone:'',
    dayViewHeaderFormat: 'MMMM YYYY',
    stepping: 5,
    locale:moment.locale(),
    collapse:true,
    icons: {
          time:'fa fa-clock-o',
          date:'fa fa-calendar',
          up:'fa fa-chevron-up',
          down:'fa fa-chevron-down',
          previous:'fa fa-chevron-left',
          next:'fa fa-chevron-right',
          today:'fa fa-crosshairs',
          clear:'fa fa-trash-o',
          close:'fa fa-times'
    },
    sideBySide:true,
    calendarWeeks:false,
    viewMode:'days',
    viewDate:false,
    toolbarPlacement:'bottom',
    widgetPositioning:{
        horizontal: 'left',
        vertical: 'bottom'
    }
  });

  $(".btn-toggle").click(function (e) { 
    e.preventDefault();
    
    $(".btn-toggle").removeClass("btn-primary");
    $(this).addClass("btn-primary");
    var id = $(this).data('id');

    $("input[name='btn-toggle-val']").val(id);
  });

  $('.btn-batal').click(function (e)
  {
    e.preventDefault();

    $('#view-container').show();
    $('#form-container').hide();
    $('#form-container').html('');
  });

  $('#form-add-1').submit(function (e) 
  {
    e.preventDefault();
    $('.btn-kirim').attr('disabled', true);

    $.post('<?php echo base_url();?>'+class_name+'/add_process_submenu/list', $(this).serialize()
    ).done(function(data) {
      var data = JSON.parse(data);

      if (data.status == '200') {
        alert('Data berhasil disimpan');
        location.reload();
      } else {
        alert('Gagal menampilkan data');
        $('.btn-kirim').removeAttr('disabled');
        $('.btn-kirim').removeAttr('disabled');
      }
    }).fail(function() {
      alert('Gagal menampilkan data')
      $('.btn-kirim').removeAttr('disabled');
    });
  });

  $('#form-add-2').submit(function (e) 
  { 
    e.preventDefault();
    $('.btn-kirim').attr('disabled', true);

    $.post('<?php echo base_url();?>'+class_name+'/add_process_submenu/list', $(this).serialize()
    ).done(function(data) {
      var data = JSON.parse(data);

      if (data.status == '200') {
        alert('Data berhasil disimpan');
        location.reload();
      } else {
        alert('Gagal menampilkan data');
        $('.btn-kirim').removeAttr('disabled');
        $('.btn-kirim').removeAttr('disabled');
      }
    }).fail(function() {
      alert('Gagal menampilkan data')
      $('.btn-kirim').removeAttr('disabled');
    });
  });

  $('#form-add-3').submit(function (e) 
  { 
    e.preventDefault();
    $('.btn-kirim').attr('disabled', true);
    $.post('<?php echo base_url();?>'+class_name+'/add_process_submenu/list', $(this).serialize()
    ).done(function(data) {
      var data = JSON.parse(data);

      if (data.status == '200') {
        alert('Data berhasil disimpan');
        location.reload();
      } else {
        alert('Gagal menampilkan data');
        $('.btn-kirim').removeAttr('disabled');
        $('.btn-kirim').removeAttr('disabled');
      }
    }).fail(function() {
      alert('Gagal menampilkan data')
      $('.btn-kirim').removeAttr('disabled');
    });
  });
</script>