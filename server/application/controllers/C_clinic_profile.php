<?php defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;
use chriskacerguis\RestServer\Format;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class C_clinic_profile extends RestController
{

  function __construct()
  {
    parent::__construct();
    $this->load->model('M_clinic_profile', 'model');
  }

  public function get_logo($rs_key)
  {
    $data = $this->model->getLogo($rs_key);
    
    $res['status']	= '200';
    $res['message'] = 'Berhasil mendapatkan Logo Klinik';
    $res['data']	= $data;

    return response($res);
  }

  public function clinic_profile_get()
  {
    $data = $this->get();
    
    if (empty($data['rs_key'])) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan RS Key';

			$this->response($res, 200);
		}

    $data_clinic = $this->model->get_clinic_profile($data['rs_key']);
    
    $res['status']	= '200';
    $res['message'] = 'Berhasil mendapatkan data Klinik';
    $res['data']	  = $data_clinic;

    $this->response($res, 200);
  }
}