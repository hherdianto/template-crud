<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;
use chriskacerguis\RestServer\Format;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class C_verification extends RestController {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('M_login', 'm_login');
        
    }

    
    function verif_post() {
        
        $this->response($this->m_login->check_token($this->post('token')), 200);
    }
}