<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = 'users/c_user/users_get';
$route['404_override'] = '';
$route['translate_uri_dashes'] = TRUE;

///////////////    START ROUTES FOR AUTH    ///////////////
$route['login']   = 'C_login';
///////////////    END ROUTES FOR AUTH    ///////////////

///////////////    START ROUTES FOR ADMIN    ///////////////
$route['admin_dashboard']   = 'C_a_dashboard';
$route['hrd']               = 'C_a_hrd';
$route['hire']              = 'C_a_hire_hrd';
$route['users']             = 'C_a_users';
$route['accounting']        = 'C_a_accounting';
///////////////    END ROUTES FOR ADMIN    ///////////////

///////////////    START ROUTES FOR USERS    ///////////////
$route['user_dashboard']    = 'C_user_dashboard';
$route['profile']           = 'C_user_profile';
///////////////    END ROUTES FOR USERS    ///////////////

//API user
$route['users_get']  = 'users/c_user/users_get';
$route['users_list'] = 'users/c_user/users_list';
$route['users_add']  = 'users/c_user/users_add';


//api catan medis gizi
$route['catatan_medis_gizi_neonatal/(:any)']                      = 'medrek_gizi/C_catatan_medis_gizi_neonatal/$1';
$route['catatan_medis_gizi_neonatal/(:any)/(:any)']               = 'medrek_gizi/C_catatan_medis_gizi_neonatal/$1/$2';
$route['catatan_medis_gizi_neonatal/(:any)/(:num)/(:any)']        = 'medrek_gizi/C_catatan_medis_gizi_neonatal/$1/$2/$3';
$route['catatan_medis_gizi_neonatal/(:any)/(:any)/(:any)/(:any)'] = 'medrek_gizi/C_catatan_medis_gizi_neonatal/$1/$2/$3/$4';