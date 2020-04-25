<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;
use chriskacerguis\RestServer\Format;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class C_hrd extends RestController {

	function __construct()
	{
		// Construct the parent class
		parent::__construct();
		$this->load->model('M_login', 'm_login');
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

	
	function dokter_get() 
	{
		// $route['ref/dokter']           = 'C_hrd/dokter';
		// $route['ref/dokter/(:any)/(:any)']           = 'C_hrd/dokter/$1/$2';
		$status = NULL;
		$get = $this->get();

		if (!empty($get['status'])) {
			$status = $get['status'];
		}

		if (!empty($get['id_departement'])) {

			$param = [
				'role' => '7',
				'id_departement' => $get['id_departement']
			];
			$data = $this->m_hrd->get_by_param($param);
		} else {
			$param = [
				'role' => '7'
			];
			$data = $this->m_hrd->get_by_param($param);
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

	function perawat_get() 
	{
		// $route['ref/perawat']          = 'C_hrd/perawat';
		// $route['ref/perawat/(:any)/(:any)']           = 'C_hrd/perawat/$1/$2';

		$status = NULL;
		$get = $this->get();

		if (!empty($get['status'])) {
			$status = $get['status'];
		}

		if (!empty($get['id_departement'])) {

			$param = [
				'role' => '8',
				'id_departement' => $get['id_departement']
			];
			$data = $this->m_hrd->get_by_param($param);
		} else {
			$param = [
				'role' => '8'
			];
			$data = $this->m_hrd->get_by_param($param);
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