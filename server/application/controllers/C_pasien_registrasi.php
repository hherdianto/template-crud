<?php defined("BASEPATH") OR exit("No direct script access allowed");

class C_pasien_registrasi extends CI_Controller
{

  function __construct()
  {
    parent::__construct();
    $this->load->model("M_pasien_registrasi", "model");
  }

  // mendapatkan data dari no rm
  public function get_pasien_registrasi()
  {
    $data = get_input();

    $id_reg    = $data['id_reg'];
    $check_out = $data['check_out'];
    $data = $this->model->get_pasien_registrasi($id_reg, $check_out);

    $res["status"]	= "200";
    $res["message"] = "Berhasil mendapatkan data Pasien Registrasi.";
    $res["data"]	= $data;

    return $res;
  }
  
    // mendapatkan data dari no rm
  public function get_by_id_reg_id_dept()
  {
    $data = json_decode(file_get_contents('php://input'), true);

    $id_reg  = intval($data['id_reg']);
    $id_dept = intval($data['id_dept']);
    $data_reg = $this->model->getby_idreg_iddept($id_reg, $id_dept);

    $res["status"]	= "200";
    $res["message"] = "Berhasil mendapatkan data Pasien Registrasi.";
    $res["data"]	= $data_reg;

    echo json_encode($res);
  }
}