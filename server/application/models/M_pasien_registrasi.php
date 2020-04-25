<?php 

class M_pasien_registrasi extends CI_Model
{
  function __construct()
  {
    parent::__construct();

    $this->_table = 'pasien_registrasi';
  }

  // mendapatkan data pasien registrasi
  public function get_pasien_registrasi($id_reg, $check_out)
  {
    if($check_out == '0')
    {
      $this->db->select('
        id_pasien_registrasi,
        no_reg,
        checkin_time,
      ')
      ->from('pasien_registrasi')
      ->where('checkout_time IS NULL')
      ->where('is_del', '0')
      ->where('id_pasien_registrasi', $id_reg)
      ->order_by('id_pasien_registrasi', 'DESC')
      ->group_by('id_pasien_registrasi');

      $query = $this->db->get()->result_array();
    }
    else
    {
      $this->db->select('
        id_pasien_registrasi,
        no_reg,
        checkin_time
      ')
      ->from('pasien_registrasi')
      ->where('checkout_time IS NOT NULL')
      ->where('is_del', '0')
      ->where('id_pasien_registrasi', $id_reg)
      ->order_by('id_pasien_registrasi', 'DESC')
      ->group_by('id_pasien_registrasi');

      $query = $this->db->get()->result_array();
    }

    return $query;
  }
  
  public function getby_idreg_iddept($id_reg, $id_dept)
	{
		$this->db->select("
			a.id_pasien_registrasi,
			n.id_pasien_visit,
			b.id_user,
			a.id_pasien,
			c.full_name as nama_pasien,
			a.is_pasien_baru,
			a.no_reg,
			a.id_ref_payment,
			a.id_hrd_dokter id_dokter,
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
			d.rm_number as no_rm,
			c.dob as tanggal_lahir,
			IF(a.checkout_time IS NOT NULL, CONCAT(TIMESTAMPDIFF( YEAR, c.dob, a.checkout_time ), 'T ', 
			TIMESTAMPDIFF( MONTH, c.dob, a.checkout_time ) % 12, 'B '), CONCAT(TIMESTAMPDIFF( YEAR, c.dob, a.checkin_time ), 
			'T ', TIMESTAMPDIFF( MONTH, c.dob, a.checkin_time ) % 12, 'B ') ) umur,
			IF(c.gender = '1', 'Laki-laki', 'Perempuan') kelamin,
			c.address alamat1,
			CONCAT(i.nama_kelurahan,', ',j.nama_kecamatan,', ',k.nama_kabupaten,', ',l.nama_provinsi) alamat2,
			e.blood as gol_darah,
			f.full_name as nama_dokter,
			h.departement_name ruang_rawat,m.payment penjamin, c.bpjs_id no_bpjs,c.number_id no_ktp
		");

		$this->db->from($this->_table . ' a');
		$this->db->join('pasien2 b', 'a.id_pasien = b.id_pasien', 'LEFT');
		$this->db->join('users_profile c', 'b.id_user = c.user_id', 'LEFT');
		$this->db->join('users d', 'd.user_id = c.user_id', 'LEFT');
		$this->db->join('ref_users_blood_type e', 'e.id = c.blood_type', 'LEFT');
		$this->db->join('users_profile f', 'a.id_hrd_dokter = f.user_id', 'LEFT');
		$this->db->join('departements h', 'a.id_dept_ruang_rawat = h.departement_id', 'LEFT');

    $this->db->join("ref_address_kelurahan i", "f.id_kel = i.id", "LEFT");
    $this->db->join("ref_address_kecamatan j", "i.id_ref_address_kecamatan = j.id", "LEFT");
    $this->db->join("ref_address_kabupaten k", "j.id_ref_address_kabupaten = k.id", "LEFT");
    $this->db->join("ref_address_provinsi l", "k.id_ref_address_provinsi = l.id", "LEFT");
		$this->db->join('ref_payment m', 'm.id_ref_payment = a.id_ref_payment', 'left');
		$this->db->join('pasien_visit n', 'n.id_pasien_registrasi = a.id_pasien_registrasi', 'left');

		$this->db->where('a.id_pasien_registrasi', $id_reg);
		$this->db->where('n.id_departemen', $id_dept);

		$sql = $this->db->get();
    $result = $sql->row_array();

		return $result;
	}
}