<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;
use chriskacerguis\RestServer\Format;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class C_template extends RestController {

	function __construct()
	{
		// Construct the parent class
		parent::__construct();
		$this->load->model('M_login', 'm_login');
		$this->load->model('M_template', 'm_template');
		$this->load->model('M_hrd', 'm_hrd');

		$token 	= $this->input->get_request_header('x-token');
		$check_token = $this->m_login->check_token($token);

		if ($check_token['status'] == 401) {
			$res = [
				'status'  => 401,
				'message' => $check_token['message']
			];
			$res['data'] = [];
			$this->response($res, $res['status']);
		} else {
			$this->data_token = $check_token['data'];
		}

		if (empty($this->data_token['access'])) {
			$res = [
				'status'  => 401,
				'message' => "Tidak memiliki akses."
			];
			$res['data'] = [];
			$this->response($res, $res['status']);
		}

		if ($this->data_token['access'] !== "user") {
			$res = [
				'status'  => 401,
				'message' => "Tidak memiliki akses."
			];
			$res['data'] = [];
			$this->response($res, $res['status']);
		}
		
	}

	public function template_get()
	{
		$get = $this->get();

		if (empty($get['id_pasien_visit'])) {
			$res['status'] 	= 400;
			$res['message']	= "Mohon masukan ID pasien visit.";

			$this->response($res, $res['status']);
		}

		$data_notes = $this->m_template->get_by_id_visit($get['id_pasien_visit']);

		if (!empty($data_notes)) {
			$res['status'] 	= 200;
			$res['message']	= "Berhasil mendapatkan data.";
			$res['data']		= $data_notes;
		} else {
			$res['status'] 	= 404;
			$res['message']	= "Data tidak ada.";
			$res['data']		= [];

		}

		$this->response($res, 200);

	}

	public function template_post()
	{
		$post = $this->post();

		if (empty($post['id_pasien_registrasi'])) {
			$res['status'] 	= 400;
			$res['message']	= "Mohon masukan ID pasien registrasi.";

			$this->response($res, $res['status']);
		}

		if (empty($post['id_pasien_visit'])) {
			$res['status'] 	= 400;
			$res['message']	= "Mohon masukan ID pasien visit.";

			$this->response($res, $res['status']);
		}

		if (empty($post['id_petugas_approve'])) {
			$res['status'] 	= 400;
			$res['message']	= "Mohon masukan ID perawat.";

			$this->response($res, $res['status']);
		}

		if (empty($post['id_dokter_approve'])) {
			$res['status'] 	= 400;
			$res['message']	= "Mohon masukan ID dokter.";

			$this->response($res, $res['status']);
		}

		// ambil data hrd
		$data_dokter = $this->m_hrd->get_by_user_id($post['id_dokter_approve']);

		$data_perawat = $this->m_hrd->get_by_user_id($post['id_petugas_approve']);

		$data_input = [
			'id_pasien_registrasi' 	=> $post['id_pasien_registrasi'],
			'id_pasien_visit' 			=> $post['id_pasien_visit'],
			'approved_petugas' 			=> $data_perawat['nama'],
			'approved_dokter' 			=> $data_dokter['nama'],
			'digital_signature_approved_petugas' 			=> $data_perawat['digital_signature'],
			'digital_signature_approved_dokter' 			=> $data_dokter['digital_signature'],
			'approved_date_petugas'					=> date('Y-m-d H:i:s'),
			'approved_date_dokter'					=> date('Y-m-d H:i:s'),
			'created_date'					=> date('Y-m-d H:i:s'),
			'created_by'						=> $this->data_token['name']
		];

		$input = $this->m_template->add($data_input);

		if ($input) {
			$res['status'] 	= 200;
			$res['message']	= "Berhasil menambahkan data.";
			$res['data']		= $data_input;
		} else {
			$res['status'] 	= 400;
			$res['message']	= "Gagal menambahkan data.";
		}

		$this->response($res, $res['status']);

	}


}