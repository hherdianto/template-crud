<?php defined('BASEPATH') OR exit('No direct script access allowed');

class M_catatan_medis_gizi_neonatal extends CI_Model 
{	
  public function __construct()
  {
    parent::__construct();

    $this->_table ="notes_template";	
  }

  public function get()
  {
    $this->db->select('
    id_pasien_registrasi AS id_registrasi,
    id_visit AS id_pasien_visit,
    created_date AS tanggal_dibuat,
    created_by AS nama_petugas_input,
    approved_petugas AS nama_perawat_approved,
    approved_dokter AS nama_dokter_approved,
    approved_date_petugas AS tanggal_perawat_approved,
    approved_date_dokter AS tanggal_dokter_approved,
    digital_signature_approved_dokter AS ttd_dokter_approved,
    digital_signature_approved_petugas AS ttd_perawat_approved,
    is_del AS is_del,
    del_by AS del_by,
    del_date AS del_date
    ');
    $this->db->from($this->_table);
    $this->db->where('is_del', '0');
    return $this->db->get()->result_array();
  }


  public function get_id($id)
  {
    $this->db->select('
    id_pasien_registrasi AS id_registrasi,
    id_visit AS id_pasien_visit,
    created_date AS tanggal_dibuat,
    created_by AS nama_petugas_input,
    approved_petugas AS nama_perawat_approved,
    approved_dokter AS nama_dokter_approved,
    approved_date_petugas AS tanggal_perawat_approved,
    approved_date_dokter AS tanggal_dokter_approved,
    digital_signature_approved_dokter AS ttd_dokter_approved,
    digital_signature_approved_petugas AS ttd_perawat_approved,
    is_del AS is_del,
    del_by AS del_by,
    del_date AS del_date');
    $this->db->from($this->_table);
    $this->db->where('id', $id);

    return $this->db->get()->row_array(); 
  }

  public function getdata_by_idreg($id_pasien_registrasi)
  {
    $this->db->where([
              'is_del' => '0',
              'id_pasien_registrasi' => $id_pasien_registrasi
    ]);

    return $this->db->get($this->_table)->row_array();
  }

  public function check_data($id_pasien_registrasi, $id_pasien_visit)
  {
    //check if id pasien visit exist
    $this->db->where([
      'id_pasien_registrasi' => $id_pasien_registrasi,
      'id_pasien_visit'      => $id_pasien_visit,
      'is_del'               => 0
    ]);
    $this->db->from($this->_table);
    $result = $this->db->count_all_results();

    return $result;
  }
  
  public function add_data($data)
  {
    $check = $this->db->insert($this->_table, $data);
    
    if($check)
    {
      $result = 1;
    }
    else
    {
      $result = 0;
    }
    
    return $result;
  }

  public function edit_data($id_pasien_registrasi, $id_pasien_visit, $data)
  {
    $this->db->where([
      'id_pasien_registrasi' => $id_pasien_registrasi,
      'id_pasien_visit'      => $id_pasien_visit
    ]);

    $check = $this->db->update($this->_table, $data);
    
    if($check)
    {
      $result = 1;
    }
    else
    {
      $result = 0;
    }
    
    return $result;
  }

  public function delete_data($id_pasien_registrasi, $id_pasien_visit, $data)
  {
    $this->db->where([
      'id_pasien_registrasi' => $id_pasien_registrasi,
      'id_pasien_visit'      => $id_pasien_visit
    ]);
    $check = $this->db->update($this->_table, $data);

    if($check)
    {
      $result = 1;
    }
    else
    {
      $result = 0;
    }
    return $result;
  }
}