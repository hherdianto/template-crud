<?php 

class M_ref_form_header extends CI_Model
{
  function __construct()
  {
    parent::__construct();

    $this->_table = 'ref_form_header';
  }

  public function get($id)
  {
    $this->db->where("id", $id);
    $sql = $this->db->get($this->_table);
    $result = $sql->row_array();

    return $result;
  }

}