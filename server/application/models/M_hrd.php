<?php defined('BASEPATH') OR exit('No direct script access allowed');

class M_hrd extends CI_Model
{
	function __construct()
	{
		parent::__construct();

		$this->_table = 'human_resources';
	}

  // mendapatkan semu data
  public function get_all()
  {
    $this->db->select('
      b.user_id id_hr,
      b.full_name nama
    ');

    $this->db->from($this->_table . ' a');
    $this->db->join('users_profile b', 'a.user_id = b.user_id', 'left');
    $this->db->join('hr_role c', 'a.hr_id = c.hr_id', 'left');
    // $this->db->join('hr_departments d', 'a.hr_id = d.id_hr', 'left');
    
    $this->db->where('a.is_del', '0');
    $this->db->where('c.is_del', '0');
    // $this->db->where('d.is_del', '0');
    // $this->db->where('a.status', '1');
    $this->db->where('c.id_role_group', '7');
    $this->db->group_by('b.user_id');
    
    $query = $this->db->get()->result_array();

    return $query;
  }


  // mendapatkan data bedasarkan id
  public function get_by_dept($id)
  {
    $this->db->select('
    b.user_id id,
    b.full_name nama
    ')
    ->from($this->_table . ' a')
    ->join('users_profile b', 'a.user_id = b.user_id', 'left')
    ->join('hr_role c', 'a.hr_id = c.hr_id', 'left')
    ->join('hr_departments d', 'c.id = d.id_hr_role', 'left')
    
    ->where('a.is_del', '0')
    ->where('c.is_del', '0')
    ->where('d.is_del', '0')
    ->where('c.id_role_group', '7')
    ->where("d.id_department", $id)
    ->group_by('b.user_id');

    $query = $this->db->get()->result_array();
    return $query;
  }

  public function get_by_param($param)
  {
    $this->db->select('
    b.user_id id,
    b.full_name nama
    ')
    ->from($this->_table . ' a')
    ->join('users_profile b', 'a.user_id = b.user_id', 'left')
    ->join('hr_role c', 'a.hr_id = c.hr_id', 'left')
    ->join('hr_departments d', 'c.id = d.id_hr_role', 'left')
    
    ->where('a.is_del', '0')
    ->where('c.is_del', '0')
    ->where('d.is_del', '0');

    if (!empty($param['role'])) {
      $this->db->where('c.id_role_group', $param['role']);
    }
    if (!empty($param['id_department'])) {
      $this->db->where('d.id_department', $param['id_department']);
    }
    $this->db->group_by('b.user_id');

    $query = $this->db->get()->result_array();
    return $query;
  }
 
 // mendapatkan data bedasarkan id
 public function get_by_name($name)
 {
  $this->db->select('
  b.user_id id,
  b.full_name nama,
  ');
  $this->db->from($this->_table . ' a');
  $this->db->join('users_profile b', 'a.user_id = b.user_id', 'left');
  $this->db->join('hr_role c', 'a.hr_id = c.hr_id', 'left');
  // $this->db->join('hr_departments d', 'a.hr_id = d.id_hr', 'left');
  
  $this->db->where('a.is_del', '0');
  $this->db->where('a.status', '1');
  $this->db->where('c.id_role_group', '7');
  $this->db->like('b.full_name', $name);
  $this->db->group_by('b.user_id');

  $query = $this->db->get()->result_array();

  return $query;
 }

 public function get_by_user_id($id)
 {
  $this->db->select('
      b.user_id id,
      b.full_name nama,
      a.digital_signature
  ');
  $this->db->from($this->_table . ' a');
  $this->db->join('users_profile b', 'a.user_id = b.user_id', 'left');
  $this->db->join('hr_role c', 'a.hr_id = c.hr_id', 'left');
  
  $this->db->where('a.is_del', '0');
  $this->db->where('b.user_id', $id);
  $this->db->group_by('b.user_id');

  $query = $this->db->get()->row_array();

  return $query;
 }

  public function get_idpasien_by_idreg($id_reg)
  {
    $this->db->select('b.user_id id');

    $this->db->from($this->_table . ' a');
    $this->db->join('users_profile b', 'a.user_id = b.user_id', 'left');
    $this->db->where('b.user_id', $id_reg);
    $query = $this->db->get()->row_array();

    return $query;
  }

}