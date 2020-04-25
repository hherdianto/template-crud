<?php 

class M_pasien_visit extends CI_Model
{
  function __construct()
  {
    parent::__construct();
  }

  // mendapatkan semua data
  public function get($status = NULL)
  {
    $this->db
    ->select('a.full_name nama_pasien')
    ->select('a.number_id no_ktp')
    ->select('a.gender kelamin')
    ->select('a.address alamat1')
    ->select('a.bpjs_id no_bpjs')
    ->select('f.id_pasien_visit id_visit')
    ->select('f.no_visit')
    ->select('f.id_pasien')
    ->select('k.id_ref_cara_datang')
    ->select('f.id_pasien_registrasi id_registrasi')
    ->select('k.no_reg')
    ->select('b.rm_number no_rm')
    ->select('b.user_id id_user')
    ->select('d.departement_name nama_dept')
    ->select('d.departement_id id_poli')
    ->select('k.id_ref_payment id_penjamin')
    ->select('e.payment nama_penjamin')
    ->select('g.full_name nama_dokter')
    ->select('f.id_hrd id_dokter')
    ->select('i.full_name nama_petugas')
    ->select('f.checkin_time checkin')

    ->from('pasien2 c')
    ->join('pasien_visit f', 'c.id_pasien = f.id_pasien', 'left')
    ->join('pasien_registrasi k', 'f.id_pasien_registrasi = k.id_pasien_registrasi', 'left')
    ->join('users b', 'c.id_user = b.user_id', 'left')
    ->join('users_profile a', 'c.id_user = a.user_id', 'left') //Nama Pasien
    ->join('users_profile g', 'f.id_hrd = g.user_id', 'left') //Nama Dokter
    ->join('users_profile i', 'f.by_id_user = i.user_id', 'left') //Nama CS
    ->join('departements d', 'f.id_departemen = d.departement_id', 'left')

    ->join('ref_payment e', 'k.id_ref_payment = e.id_ref_payment', 'left')
    ->join('departements_group j', 'd.type = j.id')
    ->where('f.checkout_time IS NULL');
    
    if (!empty($status)) {
			if ($status == '1') {
				$this->db->where('f.checkout_time IS NULL');
			} else if ($status == '0') {
				$this->db->where('f.checkout_time IS NOT NULL');
			}
		}
    $query = $this->db->get()->result_array();

    return $query;
  }

  // mendapatkan data bedasarkan id
  public function get_by_id_visit($id)
  {
    $this->db
    ->select('a.full_name nama_pasien')
    ->select('a.dob tanggal_lahir')
    ->select('a.number_id no_ktp')
    ->select('a.gender kelamin')
    ->select('a.address alamat1')
    ->select('a.bpjs_id no_bpjs')
    ->select('f.id_pasien_visit id_visit')
    ->select('f.no_visit')
    ->select('f.id_pasien')
    ->select('k.id_ref_cara_datang')
    ->select('f.id_pasien_registrasi id_registrasi')
    ->select('k.no_reg')
    ->select('b.rm_number no_rm')
    ->select('b.user_id id_user')
    ->select('d.departement_name nama_dept')
    ->select('d.departement_id id_poli')
    ->select('k.id_ref_payment id_penjamin')
    ->select('e.payment nama_penjamin')
    ->select('g.full_name nama_dokter')
    ->select('f.id_hrd id_dokter')
    ->select('k.id_hrd_dokter id_dpjp')
    ->select('l.full_name nama_dpjp')
    ->select('i.full_name nama_petugas')
    ->select('f.checkin_time checkin')
    ->select('k.checkin_time checkin_registrasi')
    ->select('m.id_bed')
    ->select("CONCAT(TIMESTAMPDIFF( YEAR, a.dob, k.checkin_time ), 'T ', TIMESTAMPDIFF( MONTH, a.dob, k.checkin_time ) % 12, 'B ', FLOOR( (TIMESTAMPDIFF( DAY, a.dob, k.checkin_time) % 365.25) % 30.4375 ), 'H') umur_registrasi")

    ->from('pasien2 c')
    ->join('pasien_visit f', 'c.id_pasien = f.id_pasien', 'left')
    ->join('pasien_registrasi k', 'f.id_pasien_registrasi = k.id_pasien_registrasi', 'left')
    ->join('users b', 'c.id_user = b.user_id', 'left')
    ->join('users_profile a', 'c.id_user = a.user_id', 'left') //Nama Pasien
    ->join('users_profile g', 'f.id_hrd = g.user_id', 'left') //Nama Dokter
    ->join('users_profile i', 'f.by_id_user = i.user_id', 'left') //Nama CS
    ->join('users_profile l', 'k.id_hrd_dokter = l.user_id', 'left') //Nama dokter regis
    ->join('departements d', 'f.id_departemen = d.departement_id', 'left')
    ->join('ref_payment e', 'k.id_ref_payment = e.id_ref_payment', 'left')
    ->join('departements_group j', 'd.type = j.id')
    ->join('kamar_bed_history m', 'f.id_pasien_visit = m.id_pasien_visit', 'left')

    ->where('f.id_pasien_visit', $id);
 
    $query = $this->db->get()->result_array();

    return $query;
  }

  // mendapatkan data bedasarkan id
  public function get_by_id_registrasi($id, $status = NULL)
  {
    $this->db
    ->select('a.full_name nama_pasien')
    ->select('a.dob tanggal_lahir')
    ->select('a.number_id no_ktp')
    ->select('a.gender kelamin')
    ->select('a.address alamat1')
    ->select('a.bpjs_id no_bpjs')
    ->select('f.id_pasien_visit id_visit')
    ->select('f.no_visit')
    ->select('f.id_pasien')
    ->select('k.id_ref_cara_datang')
    ->select('f.id_pasien_registrasi id_registrasi')
    ->select('k.no_reg')
    ->select('b.rm_number no_rm')
    ->select('b.user_id id_user')
    ->select('d.departement_name nama_dept')
    ->select('d.departement_id id_poli')
    ->select('k.id_ref_payment id_penjamin')
    ->select('e.payment nama_penjamin')
    ->select('g.full_name nama_dokter')
    ->select('f.id_hrd id_dokter')
    ->select('k.id_hrd_dokter id_dpjp')
    ->select('l.full_name nama_dpjp')
    ->select('i.full_name nama_petugas')
    ->select('f.checkin_time checkin')
    ->select('k.checkin_time checkin_registrasi')
    ->select('m.id_bed')
    ->select('n.blood golongan_darah')
    ->select("CONCAT(TIMESTAMPDIFF( YEAR, a.dob, k.checkin_time ), 'T ', TIMESTAMPDIFF( MONTH, a.dob, k.checkin_time ) % 12, 'B ', FLOOR( (TIMESTAMPDIFF( DAY, a.dob, k.checkin_time) % 365.25) % 30.4375 ), 'H') umur")

    ->from('pasien2 c')
    ->join('pasien_visit f', 'c.id_pasien = f.id_pasien', 'left')
    ->join('pasien_registrasi k', 'f.id_pasien_registrasi = k.id_pasien_registrasi', 'left')
    ->join('users b', 'c.id_user = b.user_id', 'left')
    ->join('users_profile a', 'c.id_user = a.user_id', 'left') //Nama Pasien
    ->join('users_profile g', 'f.id_hrd = g.user_id', 'left') //Nama Dokter
    ->join('users_profile i', 'f.by_id_user = i.user_id', 'left') //Nama CS
    ->join('users_profile l', 'k.id_hrd_dokter = l.user_id', 'left') //Nama dokter regis
    ->join('departements d', 'f.id_departemen = d.departement_id', 'left')
    ->join('ref_payment e', 'k.id_ref_payment = e.id_ref_payment', 'left')
    ->join('departements_group j', 'd.type = j.id')
    ->join('kamar_bed_history m', 'f.id_pasien_visit = m.id_pasien_visit', 'left')
    ->join('ref_users_blood_type n', 'a.blood_type = n.id', 'left')
    ->where('f.id_pasien_registrasi', $id);

    if (!empty($status)) {
			if ($status == '1') {
				$this->db->where('f.checkout_time IS NULL');
			} else if ($status == '0') {
				$this->db->where('f.checkout_time IS NOT NULL');
			}
		}
 
    $query = $this->db->get()->result_array();

    return $query;
  }

  

}