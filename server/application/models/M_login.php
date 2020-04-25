<?php defined('BASEPATH') OR exit('No direct script access allowed');

use \Firebase\JWT\JWT;
use \Firebase\JWT\SignatureInvalidException;
use \Firebase\JWT\ExpiredException;

class M_login extends CI_Model 
{

  function __construct() 
  { 
    parent::__construct();
  }

  /********************************************************************************
   * Deskripsi
   * Memeriksa apakah user( rm_number) ada dalam users
   * 
   * Parameter
   * $user => rm number
   * $pass => pin
   * 
   * Return
   * 0 => rm number tidak ditemukan
   * 1 => berhasil
   * 2 => password salah
   * 
  ********************************************************************************/

	public function check_token($token = null)
	{
		try {
      JWT::$leeway = 6000;
			$decode = JWT::decode($token, $this->config->item('encryption_key_jwt'), array('HS256'));
			$res = array( 
        'status'  => 202, 
        'message' => 'Token masih berlaku', 
        'data'    => (array) $decode
      );
		  return $res;
		} catch (\Exception  $e) {
				$res = array( 'status' => 401, 'message' => 'Token tidak berlaku, Silahkan login');
      return $res;
		}
	}

  /*************************************************************************
   * 
   * Created Date  : 04-02-2020
   * Modified Date : 04-02-2020
   * 
   * Deskripsi
   * Penyimpanan session pada table session_jwt untuk logging user
   * 
   * Kondisi
   * update user yang login dengan logout_time masih null / kosong
   * 
  ************************************************************************/
}