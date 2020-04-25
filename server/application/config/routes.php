<?php
defined('BASEPATH') OR exit('No direct script access allowed');


$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;


///////////////    START ROUTES FOR AUTH    ///////////////

$route['get_token']   = 'C_get_token';

///////////////    END ROUTES FOR AUTH    ///////////////

///////////////    START ROUTES FOR ADMIN    ///////////////

$route['admin_dashboard']   = 'C_admin_dashboard';
$route['employee']          = 'C_hrd_employee';
$route['hire']              = 'C_hrd_hire';
$route['users']             = 'C_users/get_all';
$route['accounting']        = 'C_accounting';

///////////////    END ROUTES FOR ADMIN    ///////////////

///////////////    START ROUTES FOR USERS    ///////////////

$route['user_dashboard']    = 'C_user_dashboard';
$route['profile']           = 'C_users/get_by_id';

///////////////    END ROUTES FOR USERS    ///////////////

$route['ref/dokter']           = 'C_hrd/dokter';
$route['ref/dokter/(:any)/(:any)']           = 'C_hrd/dokter/$1/$2';
$route['ref/clinic_profile/(:any)/(:any)']           = 'C_clinic_profile/clinic_profile/$1/$2';
$route['ref/form/(:any)/(:any)']           = 'C_ref_form_header/form_header/$1/$2';

$route['ref/perawat']          = 'C_hrd/perawat';
$route['ref/perawat/(:any)/(:any)']           = 'C_hrd/perawat/$1/$2';

$route['pasien/pasien_visit']          = 'C_pasien/pasien_visit';
$route['pasien/pasien_visit/(:any)/(:any)']          = 'C_pasien/pasien_visit/$1/$2';
$route['pasien/pasien_visit/(:any)/(:any)/(:any)/(:any)']          = 'C_pasien/pasien_visit/$1/$2/$3/$4';

$route['template_add']          = 'C_template/template';
$route['template_get/(:any)/(:num)']          = 'C_template/template/$1/$2';



$route['pasien/pasien_registrasi']          = 'C_pasien/pasien_registrasi';
$route['pasien/pasien_registrasi/(:any)/(:any)']          = 'C_pasien/pasien_registrasi/$1/$2';
$route['pasien/pasien_registrasi/(:any)/(:any)/(:any)/(:any)']          = 'C_pasien/pasien_registrasi/$1/$2/$3/$4';


$route['gizi/catatan_medis']           = 'C_users/get_by_id';