<?php defined("BASEPATH") OR exit("No direct script access allowed");

use chriskacerguis\RestServer\RestController;
use chriskacerguis\RestServer\Format;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class C_ref_form_header extends RestController
{

  function __construct()
  {
    parent::__construct();
    $this->load->model("M_ref_form_header", "model");
  }

  public function form_header_get()
  {
    $data = $this->get();

		if (empty($data['id_form'])) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan ID Form';

      $this->response($res, 200);
    }

    $data = $this->model->get($data['id_form']);

    $res["status"]	= "200";
    $res["message"] = "Berhasil mendapatkan data Ref Form Header.";
    $res["data"]	  = $data;
  
    $this->response($res, 200);
  }

}