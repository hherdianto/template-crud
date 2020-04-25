<?php defined('BASEPATH') OR exit('No direct script access allowed');

class C_catatan_medis_gizi_neonatal extends CI_Controller 
{
	function __construct()
	{
		parent::__construct();
		$this->load->model('M_catatan_medis_gizi_neonatal', 'model_xy');
		$this->load->model('M_hrd', 'model_ref_hrd');	
	}

	public function get()
	{
		$data = $this->model_xy->get();

		$res['status'] = '200';
		$res['message'] = 'Berhasil mendapatkan data Catatan Medis Gizi Neonatal';
		$res['data'] = $data;

		return response($res);
	}

	public function getdata_by_id_reg()
	{
		$data = json_decode(file_get_contents('php://input'), true);

		$id_reg = $data['id_reg'];
		$data_notes = $this->model_xy->getdata_by_idreg($id_reg);

		$res['status'] 	= '200';
		$res['message'] = 'Berhasil mengambil data Catatan Medis Gizi Neonatal';
		$res['data'] 		= $data_notes;

		echo json_encode($res);

	}

	/******************************************************************************
	 * 
	 * fungsi add
	 * Konsep Penyimpanan adalah 1 registrasi 1 baris dalam table
	 * untuk penyimpanan bila ditemukan 1 registrasi yang sama maka data diupdate 
	 * 
	 * Return
	 * 200 = false
	 * 400 = success
	 * 
	 ******************************************************************************/
	public function add()
	{
		$data = json_decode(file_get_contents('php://input'), true);

		if (empty($data['id_pasien_registrasi'])) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan ID pasien registrasi';

			echo json_encode($res);
		}

		if ($data['id_pasien_visit'] == "" || $data['id_pasien_visit'] == null) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan ID pasien visit';

			echo json_encode($res);
		}

		if (empty($data['id_petugas_approve'])) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan ID perawat';

			echo json_encode($res);
		}

		if (empty($data['id_dokter_approve'])) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan ID dokter';

			echo json_encode($res);
		}

		if (empty($data['id_petugas_input'])) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan ID karyawan';

			echo json_encode($res);
		}

		$data_dokter  = $this->model_ref_hrd->get_by_user_id($data['id_dokter_approve']);
		$data_perawat = $this->model_ref_hrd->get_by_user_id($data['id_petugas_approve']);
		$data_petugas = $this->model_ref_hrd->get_by_user_id($data['id_petugas_input']);

    //mencari record apakah sudah ada dalam database
		$data_notes = $this->model_xy->check_data($data['id_pasien_registrasi'],$data['id_pasien_visit']);

		if(!empty($data_notes)) // bila sudah ada maka updated
		{
			$data_update = [
				'approved_petugas' 		               => $data_perawat['nama'],
				'approved_dokter' 		               => $data_dokter['nama'],
				'digital_signature_approved_petugas' => $data_perawat['digital_signature'],
				'digital_signature_approved_dokter'  => $data_dokter['digital_signature'],
				'created_by' 		                     => $data_petugas['nama'],
				'created_date' 	                     => $data['created_date'],
			];

			$data_result = $this->model_xy->edit_data($data['id_pasien_registrasi'],$data['id_pasien_visit'], $data_update);

			$res['status']  = '200';
			$res['message'] = 'Berhasil mengubah data Catatan Medis Gizi Neonatal';
			$res['data']    = [];
		} 
		else // bila belum ada maka insert
		{
			$data_insert = [
				'id_pasien_registrasi'               => $data['id_pasien_registrasi'],
				'id_pasien_visit' 		               => $data['id_pasien_visit'],
				'approved_petugas' 		               => $data_perawat['nama'],
				'approved_dokter' 		               => $data_dokter['nama'],
				'digital_signature_approved_petugas' => $data_perawat['digital_signature'],
				'digital_signature_approved_dokter'  => $data_dokter['digital_signature'],
				'created_by' 		                     => $data_petugas['nama'],
				'created_date' 	                     => date("Y-m-d H:i:s"),
			];

			$data_result = $this->model_xy->add_data($data_insert);

			$res['status']  = '200';
			$res['message'] = 'Berhasil menambah data Catatan Medis Gizi Neonatal.';
			$res['data']    = [];
		}

		echo json_encode($res);

	}

	public function edit()
	{
		$data = json_decode(file_get_contents('php://input'), true);

		if (empty($data['id_pasien_registrasi'])) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan ID pasien registrasi';

			echo json_encode($res);
		}

		if ($data['id_pasien_visit'] == "" || $data['id_pasien_visit'] == null) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan ID pasien visit';

			echo json_encode($res);
		}

		if (empty($data['id_petugas_approve'])) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan ID perawat';

			echo json_encode($res);
		}

		if (empty($data['id_dokter_approve'])) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan ID dokter';

			echo json_encode($res);
		}

		if (empty($data['id_petugas_input'])) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan ID karyawan';

			echo json_encode($res);
		}

		$data_dokter  = $this->model_ref_hrd->get_by_user_id($data['id_dokter_approve']);
		$data_perawat = $this->model_ref_hrd->get_by_user_id($data['id_petugas_approve']);
		$data_petugas = $this->model_ref_hrd->get_by_user_id($data['id_petugas_input']);

		$data_update = [
				'approved_petugas' 		               => $data_perawat['nama'],
				'approved_dokter' 		               => $data_dokter['nama'],
				'digital_signature_approved_petugas' => $data_perawat['digital_signature'],
				'digital_signature_approved_dokter'  => $data_dokter['digital_signature'],
				'created_by' 		                     => $data_petugas['nama'],
				'created_date' 	                     => $data['created_date'],
    ];

		$data_result = $this->model_xy->edit_data($data['id_pasien_registrasi'],$data['id_pasien_visit'], $data_update);

		$res['status']  = '200';
		$res['message'] = 'Berhasil mengubah data Catatan Medis Gizi Neonatal.';
		$res['data']    = [];

		echo json_encode($res);
	}

	public function delete()
	{
		$data = json_decode(file_get_contents('php://input'), true);

		if (empty($data)) {
			$res['status'] = 400;
			$res['message'] = 'Mohon sertakan data untuk melanjutkan.';

			echo json_encode($res);
		}

		if (empty($data['del_by'])) {
			$res['status'] = 400;
			$res['message'] = 'Mohon masukan ID karyawan untuk melanjutkan.';

			echo json_encode($res);
		}
    $data_petugas = $this->model_ref_hrd->get_by_user_id($data['del_by']);

    $data_delete = [
				'is_del' 	 => 1,
				'del_by' 	 => $data_petugas['nama'],
				'del_date' => $data['del_date'],
    ];
		$data_result = $this->model_xy->delete_data($data['id_pasien_registrasi'], $data['id_pasien_visit'], $data_delete);

		if ($data_result) {
			$res['status'] = '200';
			$res['message'] = 'Berhasil menghapus data Catatan Medis Gizi Neonatal.';
		} else {
			$res['status'] = '400';
			$res['message'] = 'Gagal menghapus data Catatan Medis Gizi Neonatal.';
		}
		
		echo json_encode($res);
	}

}