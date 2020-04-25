<?php defined('BASEPATH') OR exit('No direct script access allowed');

class M_template extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}

  public function add($data)
  {
    $input = $this->db->insert('notes_template', $data);
    
    if ($input) {
      return true;
    } else {
      return false;
    }
  }

  public function get_by_id_visit($id)
  {
    $data = $this->db->get_where('notes_template', ['id_pasien_visit' => $id])->row_array();
    
    return $data;
  }

}