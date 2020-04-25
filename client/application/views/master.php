<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/ui_temp/assets/font-awesome.min.css">
   <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/ui_temp/assets/bootstrap.min.css">
   <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/ui_temp/assets/styles.css">
   <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/ui_temp/assets/nprogress.css">
    <script src="<?php echo base_url() ?>assets/ui_temp/assets/jquery-3.3.1.min.js"></script>
    <script src="<?php echo base_url() ?>assets/ui_temp/assets/bootstrap.min.js"></script>
    <script src="<?php echo base_url() ?>assets/ui_temp/assets/nprogress.js"></script>
    <script src="<?php echo base_url();?>assets/js/moment.min.js"></script>

    <!-- Select2 -->
<link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/select2/css/select2.min.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/select2/select2-bootstrap.css"/>
<!-- Select2 -->
<script type="text/javascript" src="<?php echo base_url() ?>assets/select2/js/select2.min.js"></script>
<script type="text/javascript">
	//$.fn.select2.defaults.set( "theme", "bootstrap" );
	$( ".select2" ).select2({
	    theme: "bootstrap",
	    width: "100%"
	});
</script>

  <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/datatables/media/css/dataTables.bootstrap.css">
  <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/datatables/extensions/RowReorder/css/rowReorder.dataTables.min.css">
  <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/datatables/extensions/Responsive/css/responsive.dataTables.min.css">
<!-- DataTables -->
<script type="text/javascript" src="<?php echo base_url() ?>assets/datatables/media/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="<?php echo base_url() ?>assets/datatables/media/js/dataTables.bootstrap.min.js"></script>
<script type="text/javascript" src="<?php echo base_url() ?>assets/datatables/extensions/RowReorder/js/dataTables.rowReorder.min.js"></script>
<script type="text/javascript" src="<?php echo base_url() ?>assets/datatables/extensions/Responsive/js/dataTables.responsive.min.js"></script>
<script type="text/javascript">
	$(document).ready(function () {
		// Table Default
		$("table.datatable").DataTable();
		// Table Data Custom Show Entries
		$("table.datatables").DataTable({
			"lengthMenu": [[10,25,50,100,-1],[10,25,50,100,"All"]],
			"rowReorder": {selector: 'td:nth-child(2)'},
	        "responsive": true
		});
	});
</script> <!-- DataTables -->
    <style>
      .dropdown-submenu {
        position: relative;
      }
      
      .dropdown-submenu .dropdown-menu {
        top: 0;
        left: 100%;
        margin-top: -5px;
        width: fit-content;
      }
      .hover-primary a:hover{background:#337ab7 !important;color:#fff !important}
    </style>
</head>
<body>
<div id="wrapper-main">
    <?php $this->load->view('layout/header'); ?>
    
    <div class="container-fluid">
    <?php $this->load->view($contents); ?>
    </div>
    

    <?php $this->load->view('layout/footer'); ?>
</div>
</body>
</html>