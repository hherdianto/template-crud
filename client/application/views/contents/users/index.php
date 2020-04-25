<br> <br>
<div class="load">

</div>


<script type="text/javascript">
$(document).ready(function()
  {
    $.post('<?php echo base_url(); ?>users_list',
      {id:''},
      function(html){
          $(".load").html(html);
          $("table.datatables").DataTable();
      }   
    );
    
  });

$(document).on('click','.add-user',function(e){
    e.preventDefault();
    $.post('<?php echo base_url() ?>users_add',
        {id:''},
        function(html){
            $(".load").html(html);
        }   
    );
});

$(document).on('click','.back-user',function(e){
    e.preventDefault();
    $.post('<?php echo base_url() ?>users_list',
        {id:''},
        function(html){
            $(".load").html(html);
            $("table.datatables").DataTable();
        }   
    );
});

</script>