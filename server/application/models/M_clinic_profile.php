<?php 

class M_clinic_profile extends CI_Model
{
	function __construct()
	{
		parent::__construct();

		$this->_table = 'clinic_profile';
	}

  public function getLogo($rs_key)
	{
    $this->db->select('logo1,logo2');
    $this->db->from($this->_table);
    $this->db->where('rs_key', $rs_key);

    $sql = $this->db->get();
    $result = $sql->row_array();

		return $result;
  }

  public function get_clinic_profile($rs_key)
  {
    $this->db->where('rs_key', $rs_key);
    $sql = $this->db->get($this->_table);

    $result = $sql->row_array();

		return $result;
  }

}