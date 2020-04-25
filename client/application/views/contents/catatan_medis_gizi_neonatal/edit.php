<div class="row">
  <div class="col-md-12">

<!-- start input panel col 6 sendiri -->

    <form id="form-add-1">
      <input type="hidden" class="form-control input-sm" name="id_reg" id="id_reg" value="<?= $id_reg ?>" >
      <input type="hidden" class="form-control input-sm" name="id_visit" id="id_visit" value="<?= $id_visit ?>" >
      <div class="row">
        <div class="col-md-6">
          <div class="panel panel-primary">
            <div class="panel-heading">Edit Data 1</div>
            <div class="panel-body">

            <div class="row">
              <div class="col-md-12">  

                <div class="row">
                    <!-- nama -->
                  <div class="col-md-3">
                    <b>Test</b>
                  </div>
                  <div class="col-md-9">
                    <input type="text" class="form-control input-sm" name="test" id="test" value="" >
                  </div>
                </div>
                <br>
 
                <div class="row">
                    <!-- nama -->
                  <div class="col-md-3">
                    <b>Petugas Approve</b>
                  </div>
                  <div class="col-md-9">
                    <select name="petugas_approved" class="petugas_approved" style="width: 100%" required>
                      <option value=""></option>
                      <?php foreach ($data_perawat as $k => $v) : 
                        
                        $selected = '';
                        if ($v['nama'] == $result['approved_petugas']) {
                          $selected = 'selected';
                        }  
                      ?>
                        <option value="<?= $v['id'] ?>" <?= $selected ?>><?= $v['nama'] ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
                <br>

                <div class="row">
                    <!-- nama -->
                  <div class="col-md-3">
                    <b>Dokter Approve</b>
                  </div>
                  <div class="col-md-9">
                    <select name="dokter_approved" class="dokter_approved" style="width: 100%" required>
                      <option value=""></option>
                      <?php foreach ($data_dokter as $k => $v) : 
                        $selected = '';
                        if ($v['nama'] == $result['approved_dokter']) {
                          $selected = 'selected';
                        }
                      ?>
                        <option value="<?= $v['id'] ?>" <?= $selected ?>><?= $v['nama'] ?></option>
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
            <div class="panel-heading">Edit Data 2</div>
            <div class="panel-body">

              <div class="row">
                  <!-- nama -->
                <div class="col-md-3">
                  <b>Test</b>
                </div>
                <div class="col-md-9">
                  <input type="text" class="form-control input-sm" name="test" id="test" value="">
                </div>
              </div>
              <br>

              <div class="row">
                    <!-- nama -->
                  <div class="col-md-3">
                    <b>Petugas Approve</b>
                  </div>
                  <div class="col-md-9">
                    <select name="petugas_approved" class="petugas_approved" style="width: 100%" required>
                      <option value=""></option>
                      <?php foreach ($data_perawat as $k => $v) : 
                        
                        $selected = '';
                        if ($v['nama'] == $result['approved_petugas']) {
                          $selected = 'selected';
                        }  
                      ?>
                        <option value="<?= $v['id'] ?>" <?= $selected ?>><?= $v['nama'] ?></option>
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
                <div class="col-md-3">
                  <b>Test</b>
                </div>
                <div class="col-md-9">
                  <input type="text" class="form-control input-sm" name="test" id="test" value="">
                </div>
              </div>
              <br>

              <div class="row">
                    <!-- nama -->
                  <div class="col-md-3">
                    <b>Dokter Approve</b>
                  </div>
                  <div class="col-md-9">
                    <select name="dokter_approved" class="dokter_approved" style="width: 100%" required>
                      <option value=""></option>
                      <?php foreach ($data_dokter as $k => $v) : 
                        $selected = '';
                        if ($v['nama'] == $result['approved_dokter']) {
                          $selected = 'selected';
                        }
                      ?>
                        <option value="<?= $v['id'] ?>" <?= $selected ?>><?= $v['nama'] ?></option>
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
            <div class="panel-heading">Edit Data 3</div>
            <div class="panel-body">

            <div class="row">
              <div class="col-md-6">  
                <div class="row">
                    <!-- nama -->
                  <div class="col-md-3">
                    <b>Test</b>
                  </div>
                  <div class="col-md-9">
                    <input type="text" class="form-control input-sm" name="test" id="test" value="">
                  </div>
                </div>
              </div>

              <div class="col-md-6">  
                <div class="row">
                    <!-- nama -->
                  <div class="col-md-3">
                    <b>Test</b>
                  </div>
                  <div class="col-md-9">
                    <input type="text" class="form-control input-sm" name="test" id="test" value="">
                  </div>
                </div>

              </div>
            </div>
            <br>


              <div class="row">
                    <!-- nama -->
                  <div class="col-md-3">
                    <b>Petugas Approve</b>
                  </div>
                  <div class="col-md-9">
                    <select name="petugas_approved" class="petugas_approved" style="width: 100%" required>
                      <option value=""></option>
                      <?php foreach ($data_perawat as $k => $v) : 
                        
                        $selected = '';
                        if ($v['nama'] == $result['approved_petugas']) {
                          $selected = 'selected';
                        }  
                      ?>
                        <option value="<?= $v['id'] ?>" <?= $selected ?>><?= $v['nama'] ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
                <br>

                <div class="row">
                    <!-- nama -->
                  <div class="col-md-3">
                    <b>Dokter Approve</b>
                  </div>
                  <div class="col-md-9">
                    <select name="dokter_approved" class="dokter_approved" style="width: 100%" required>
                      <option value=""></option>
                      <?php foreach ($data_dokter as $k => $v) : 
                        $selected = '';
                        if ($v['nama'] == $result['approved_dokter']) {
                          $selected = 'selected';
                        }
                      ?>
                        <option value="<?= $v['id'] ?>" <?= $selected ?>><?= $v['nama'] ?></option>
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

  $('.btn-batal').click(function (e) { 
    e.preventDefault();
    
    $('#view-container').show();
    $('#form-container').hide();
    $('#form-container').html('');
  });

  $('#form-add-1').submit(function (e) { 
    e.preventDefault();
    $('.btn-kirim').attr('disabled', true);
    
    $.post('<?php echo base_url();?>'+class_name+'/edit_process_submenu/', $(this).serialize()
    ).done(function(data) {
      var data = JSON.parse(data);

      if (data.status == '200') {
        alert('Data berhasil diubah');
        location.reload();
      } else {
        alert(data.message);
        $('.btn-kirim').removeAttr('disabled');
        $('.btn-kirim').removeAttr('disabled');
      }
    }).fail(function() {
      alert('Gagal menampilkan data')
      $('.btn-kirim').removeAttr('disabled');
    });
  });

  $('#form-add-2').submit(function (e) { 
    e.preventDefault();
    $('.btn-kirim').attr('disabled', true);
    
    $.post('<?php echo base_url();?>'+class_name+'/edit_process_submenu/', $(this).serialize()
    ).done(function(data) {
      var data = JSON.parse(data);

      if (data.status == '200') {
        alert('Data berhasil diubah');
        location.reload();
      } else {
        alert(data.message);
        $('.btn-kirim').removeAttr('disabled');
        $('.btn-kirim').removeAttr('disabled');
      }
    }).fail(function() {
      alert('Gagal menampilkan data')
      $('.btn-kirim').removeAttr('disabled');
    });
  });

  $('#form-add-3').submit(function (e) { 
    e.preventDefault();
    $('.btn-kirim').attr('disabled', true);
    
    $.post('<?php echo base_url();?>'+class_name+'/edit_process_submenu/', $(this).serialize()
    ).done(function(data) {
      var data = JSON.parse(data);

      if (data.status == '200') {
        alert('Data berhasil diubah');
        location.reload();
      } else {
        alert(data.message);
        $('.btn-kirim').removeAttr('disabled');
        $('.btn-kirim').removeAttr('disabled');
      }
    }).fail(function() {
      alert('Gagal menampilkan data')
      $('.btn-kirim').removeAttr('disabled');
    });
  });
</script>