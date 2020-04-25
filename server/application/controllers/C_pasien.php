<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;
use chriskacerguis\RestServer\Format;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class C_pasien extends RestController {

	function __construct()
	{
		// Construct the parent class
		parent::__construct();
		$this->load->model('M_login', 'm_login');
		$this->load->model('pasien/M_pasien_registrasi', 'm_reg');
		$this->load->model('pasien/M_pasien_visit', 'm_visit');

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

	
	function pasien_visit_get() 
	{
		$status = NULL;
		$get = $this->get();

		if (!empty($get['status'])) {
			$status = $get['status'];
		}

		if (!empty($get['id_visit'])) {
			$data = $this->m_visit->get_by_id_visit($get['id_visit'], $status);
		} else if (!empty($get['id_registrasi'])) {
			$data = $this->m_visit->get_by_id_registrasi($get['id_registrasi'], $status);
		} else {
			$data = $this->m_visit->get($status);
		}

		if (empty($data)) {
			$res['status']  = 404;
			$res['message'] = "Data tidak ditemukan";
			$res['data']		= [];
		} else {
			$res['status']  = 200;
			$res['message'] = "Berhasil mendapatkan data.";
			$res['data']		= $data;
		}

		$this->response($res, $res['status']);
	}

	function pasien_registrasi_get() 
	{
		$status = NULL;
		$get = $this->get();

		if (!empty($get['status'])) {
			$status = $get['status'];
		}

		if (!empty($get['id_registrasi'])) {
			$data = $this->m_reg->get_by_id_registrasi($get['id_registrasi'], $status);
		} else if (!empty($get['no_rm'])) {
			$data = $this->m_reg->get_by_no_rm($get['no_rm'], $status);
		} else {
			$data = $this->m_reg->get($status);
		}

		if (empty($data)) {
			$res['status']  = 404;
			$res['message'] = "Data tidak ditemukan";
			$res['data']		= [];
		} else {
			$res['status']  = 200;
			$res['message'] = "Berhasil mendapatkan data.";
			$res['data']		= $data;
		}

		$this->response($res, $res['status']);
	}
}