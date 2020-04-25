<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class C_user extends CI_Controller {


	public function users_get()
	{	

		$data['contents'] = 'contents/users/index';
		$this->load->view('master', $data);
	}

	public function users_list()
	{	
		$this->load->view('contents/users/list');
	}


	public function users_add(){
		$this->load->view('contents/users/add');
	}

}
