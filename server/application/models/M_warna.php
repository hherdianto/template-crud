<?php 


class M_warna extends CI_Model
{

	function __construct()
	{
		$this->load->model('M_warna', 'model');
	}

	public function get()
	{
		$this->db->select('*');
		$this->db->from('warna');

		$query = $this->db->get()->result_array();

		return $query;
	}
}