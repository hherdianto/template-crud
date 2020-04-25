<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>

<div class="col-md-12 text-center hide" id="load-data"></div>
<div class="class-col-md-12 table-process" id="table-process">
  <div class="row load-view"></div>
</div>

<script type="text/javascript">
  const class_name = '<?php echo $class_name;?>';
  $(document).ready(function()
  {
    document.title = '<?= $title; ?>';
    refresh();
  });

  function refresh() 
  {
    $('#load-data').removeClass('hide');
    $('#table-process').addClass('hide');

    $.get('<?php echo base_url() . $class_name . '/get_data_submenu/list';?>', function(data) 
    {
      $('.load-view').html(data);
    })
    .done(function() 
    {
      $('#load-data').addClass('hide');
      $('#table-process').removeClass('hide');
    })
    .fail(function() {
      $('#load-data').addClass('hide');
      $('#table-process').removeClass('hide');
    });
  }

</script>