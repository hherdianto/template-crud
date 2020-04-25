<?php 

class M_pasien_registrasi extends CI_Model
{
	function __construct()
	{
		parent::__construct();

	}

	// mendapatkan semua data
	public function get($status = NULL)
	{
		$this->db->select('
			a.id_pasien_registrasi id_registrasi,
			a.id_pasien,
			c.full_name as nama_pasien,
			c.number_id no_ktp,
			c.bpjs_id no_bpjs,
			c2.rm_number no_rm,
			a.is_pasien_baru,
			a.no_reg,
			a.id_ref_payment id_penjamin,
			d.payment nama_penjamin,
			a.id_hrd_dokter id_dpjp_dokter,
			e.full_name nama_dpjp_dokter,
			a.umur as umur_pasien,
			a.checkin_time as tanggal_checkin,
			a.checkout_time as tanggal_checkout,
			a.checkout_by as id_petugas_checkout,
			a.checkout_petugas as nama_petugas_checkout,
			a.id_ref_checkout,
			a.alasan_checkout,
			a.id_ref_kondisi,
			a.kondisi_checkout,
			a.created_by as id_petugas_checkin,
			g.full_name as nama_petugas_checkin,
			a.is_del ,
			a.checkout_reason_rujukan as id_alasan_rujukan,
			a.nama_reason_rujukan as nama_alasan_rujukan,
			a.id_jenis_rujukan,
		');
		$this->db->select('SUM(IF(f.checkout_time IS NULL, 1, 0)) total_aktif_visit');  
		
		$this->db->from('pasien_registrasi a');
		$this->db->join('pasien_visit f', 'a.id_pasien_registrasi = f.id_pasien_registrasi', 'LEFT');
		$this->db->join('pasien2 b', 'f.id_pasien = b.id_pasien', 'LEFT');
		$this->db->join('users_profile c', 'b.id_user = c.user_id', 'LEFT');
		$this->db->join('users c2', 'c2.user_id = c.user_id', 'LEFT');
		$this->db->join('ref_payment d', 'a.id_ref_payment = d.id_ref_payment', 'LEFT');
		$this->db->join('users_profile e', 'a.id_hrd_dokter = e.user_id', 'LEFT');
		$this->db->join('users_profile g', 'a.created_by = g.user_id', 'LEFT');
		
		if (!empty($status)) {
			if ($status == '1') {
				$this->db->where('a.checkout_time IS NULL');
			} else if ($status == '0') {
				$this->db->where('a.checkout_time IS NOT NULL');
			}
		}

		$this->db->where('a.is_del', '0');
		$this->db->group_by('a.id_pasien_registrasi');
		$this->db->having('total_aktif_visit >', '0');

		$this->db->order_by('a.id_pasien_registrasi', 'desc');

		$query = $this->db->get()->result_array();
		return $query;
	}

	public function get_by_id_registrasi($id)
	{
		$this->db->select("
			a.id_pasien_registrasi,
			a.id_pasien,
			c.full_name as nama_pasien,
			a.is_pasien_baru,
			a.no_reg,
			a.id_ref_payment,
			m.payment nama_penjamin,
			a.id_hrd_dokter id_dokter,
			a.nama_dpjp_dokter,
			a.umur as umur_pasien,
			a.checkin_time as tanggal_checkin,
			a.checkout_time as tanggal_checkout,
			a.checkout_by as id_petugas_checkout,
			a.checkout_petugas as nama_petugas_checkout,
			a.id_ref_checkout,
			a.alasan_checkout,
			a.id_ref_kondisi,
			a.kondisi_checkout,
			a.created_by as id_petugas_checkin,
			a.checkin_petugas as nama_petugas_checkin,
			a.is_del,
			a.checkout_reason_rujukan as id_alasan_rujukan,
			a.nama_reason_rujukan as nama_alasan_rujukan,
			a.id_jenis_rujukan,
			d.rm_number as no_rm,
			c.dob as tanggal_lahir,
			IF(a.checkout_time IS NOT NULL, CONCAT(TIMESTAMPDIFF( YEAR, c.dob, a.checkout_time ), 'T ', TIMESTAMPDIFF( MONTH, c.dob, a.checkout_time ) % 12, 'B '), CONCAT(TIMESTAMPDIFF( YEAR, c.dob, a.checkin_time ), 'T ', TIMESTAMPDIFF( MONTH, c.dob, a.checkin_time ) % 12, 'B ') ) umur,
			IF(c.gender = '1', 'Laki-laki', 'Perempuan') kelamin,
			c.address alamat1,
			CONCAT(i.nama_kelurahan,', ',j.nama_kecamatan,', ',k.nama_kabupaten,', ',l.nama_provinsi) alamat2,
			e.blood as gol_darah,
			f.full_name as nama_dokter,
			h.departement_name ruang_rawat,m.payment penjamin, c.bpjs_id no_bpjs,c.number_id no_ktp
		");

		$this->db->from('pasien_registrasi a');
		$this->db->join('pasien2 b', 'a.id_pasien = b.id_pasien', 'LEFT');
		$this->db->join('users_profile c', 'b.id_user = c.user_id', 'LEFT');
		$this->db->join('users d', 'd.user_id = c.user_id', 'LEFT');
		$this->db->join('ref_users_blood_type e', 'e.id = c.blood_type', 'LEFT');
		$this->db->join('users_profile f', 'a.id_hrd_dokter = f.user_id', 'LEFT');
		$this->db->join('departements h', 'a.id_dept_ruang_rawat = h.departement_id', 'LEFT');

		$this->db->join('ref_address_kelurahan i', 'c.id_kel = i.id', 'left');
		$this->db->join('ref_address_kecamatan j', 'i.id_ref_address_kecamatan = j.id', 'left');
		$this->db->join('ref_address_kabupaten k', 'j.id_ref_address_kabupaten = k.id', 'left');
		$this->db->join('ref_address_provinsi l', 'k.id_ref_address_provinsi = k.id', 'left');
		$this->db->join('ref_payment m', 'm.id_ref_payment = a.id_ref_payment', 'left');
		$this->db->where('a.id_pasien_registrasi', $id);
		// $this->db->where('a.is_del', '0');
			
		$query = $this->db->get()->row_array();

		return $query;
	}

	public function get_by_no_rm($id, $status = NULL)
	{
		$this->db->select("
			a.id_pasien_registrasi,
			a.id_pasien,
			c.full_name as nama_pasien,
			a.is_pasien_baru,
			a.no_reg,
			a.id_ref_payment,
			m.payment nama_penjamin,
			a.id_hrd_dokter id_dokter,
			a.nama_dpjp_dokter,
			a.umur as umur_pasien,
			a.checkin_time as tanggal_checkin,
			a.checkout_time as tanggal_checkout,
			a.checkout_by as id_petugas_checkout,
			a.checkout_petugas as nama_petugas_checkout,
			a.id_ref_checkout,
			a.alasan_checkout,
			a.id_ref_kondisi,
			a.kondisi_checkout,
			a.created_by as id_petugas_checkin,
			a.checkin_petugas as nama_petugas_checkin,
			a.is_del,
			a.checkout_reason_rujukan as id_alasan_rujukan,
			a.nama_reason_rujukan as nama_alasan_rujukan,
			a.id_jenis_rujukan,
			d.rm_number as no_rm,
			c.dob as tanggal_lahir,
			IF(a.checkout_time IS NOT NULL, CONCAT(TIMESTAMPDIFF( YEAR, c.dob, a.checkout_time ), 'T ', TIMESTAMPDIFF( MONTH, c.dob, a.checkout_time ) % 12, 'B '), CONCAT(TIMESTAMPDIFF( YEAR, c.dob, a.checkin_time ), 'T ', TIMESTAMPDIFF( MONTH, c.dob, a.checkin_time ) % 12, 'B ') ) umur,
			IF(c.gender = '1', 'Laki-laki', 'Perempuan') kelamin,
			c.address alamat1,
			CONCAT(i.nama_kelurahan,', ',j.nama_kecamatan,', ',k.nama_kabupaten,', ',l.nama_provinsi) alamat2,
			e.blood as gol_darah,
			f.full_name as nama_dokter,
			h.departement_name ruang_rawat,m.payment penjamin, c.bpjs_id no_bpjs,c.number_id no_ktp
		");

		$this->db->from('pasien_registrasi a');
		$this->db->join('pasien2 b', 'a.id_pasien = b.id_pasien', 'LEFT');
		$this->db->join('users_profile c', 'b.id_user = c.user_id', 'LEFT');
		$this->db->join('users d', 'd.user_id = c.user_id', 'LEFT');
		$this->db->join('ref_users_blood_type e', 'e.id = c.blood_type', 'LEFT');
		$this->db->join('users_profile f', 'a.id_hrd_dokter = f.user_id', 'LEFT');
		$this->db->join('departements h', 'a.id_dept_ruang_rawat = h.departement_id', 'LEFT');

		$this->db->join('ref_address_kelurahan i', 'c.id_kel = i.id', 'left');
		$this->db->join('ref_address_kecamatan j', 'i.id_ref_address_kecamatan = j.id', 'left');
		$this->db->join('ref_address_kabupaten k', 'j.id_ref_address_kabupaten = k.id', 'left');
		$this->db->join('ref_address_provinsi l', 'k.id_ref_address_provinsi = k.id', 'left');

		$this->db->join('ref_payment m', 'm.id_ref_payment = a.id_ref_payment', 'left');
		$this->db->where('d.rm_number', $id);
		$this->db->where('a.is_del', '0');

		if (!empty($status)) {
			if ($status == '1') {
				$this->db->where('a.checkout_time IS NULL');
			} else if ($status == '0') {
				$this->db->where('a.checkout_time IS NOT NULL');
			}
		}

		
			
		$query = $this->db->get()->result_array();

		return $query;
	}

}