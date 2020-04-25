<?php defined('BASEPATH') OR exit('No direct script access allowed');

use GuzzleHttp\Psr7;
use \GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;


/**********************************************************************************
 * 
 * Deskripsi
 * Menampilkan halaman client/catatan_medis_gizi_neonatal
 * 
**********************************************************************************/
class C_catatan_medis_gizi_neonatal extends CI_Controller 
{
  public function __construct()
  {
    parent::__construct();

    // add session statis
    $data = [
      'id_user' => "123",
      'rs_key'  => "A123"
    ];
    $this->session->set_userdata($data);

    // token diambil dari postman, kalau sudah expired sikahkan ambil lagi.
    $token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiTkFNQSAyIiwiaWRfdXNlciI6IjM3MzY4MSIsInJtX251bWJlciI6ImFkbWluIiwicnNfa2V5IjoiQTEyMyIsImlwX2FkZHJlc3MiOiIxMjcuMC4xLjEiLCJhY2Nlc3MiOiJ1c2VyIn0.ubW6fyc7ErYOW2T5qFbjXvLIVTLp05s3A0paQ6wfcmo";



    // guzzle client
    $this->_client = new Client([
      'base_uri'  => $this->config->item('api_url'),
      'headers'   => [
        'Content-Type' => 'application/json',
        'x-token' => $token
      ]
    ]);

    
    // Nama folder dalam controller
    $this->c_folder = "medrek_gizi";
    $this->req_server = str_replace("client","server",base_url());

    //menghilangkan 'C_' pada nama class untuk dinamisasi routing;
    $this->class = str_replace("C_","",$this->router->fetch_class());
    
    //dummy id departemen
    $this->id_dept = 3;

    // untuk menyimpan data ke /tmp untuk ditampilkan di cetak
    if(strpos($_SERVER['DOCUMENT_ROOT'],'xampp') == true)
    {
      $this->folder = str_replace("/htdocs","", $_SERVER['DOCUMENT_ROOT']) . "/tmp/";
    }
    else
    {
      $this->folder = "/tmp/";
    }
  }

  // redirect ke fungsi list
  public function index()
  {
    redirect(base_url(). $this->class . '/list');
  }

  // Menampilkan tampilan aktif dan arsip
  public function list()
  {

    //set session untuk penggunaan id user dan nama user
    
    $data = array(
        'title'   => 'Catatan Medis Gizi',
        'class_name' => $this->class,
    );

    if($this->input->is_ajax_request())
    {
      $data['contents'] = 'contents/' . $this->class . '/index';
      $this->load->view('master', $data);
    }
    else
    {
      $data['contents'] = 'contents/' . $this->class . '/index';
      $this->load->view('master', $data);
    }
  }

  //mengambil data registrasi untuk di tampilkan di aktif dan arsip 
  function get_data_submenu($type)
  {
    // data dummy list registrasi aktif untuk di view index.php
    if($type == 'list')
    {
      $no_rm = '008000649';

      //aktif
      $response_reg_aktif     = $this->_client->request('GET', 'pasien/pasien_registrasi/no_rm/'. $no_rm . '/status/1');
      $data['data_reg_aktif'] = json_decode($response_reg_aktif->getBody()->getContents(), true)['data'];

      //arsip
      $response_reg_arsip     = $this->_client->request('GET', 'pasien/pasien_registrasi/no_rm/'. $no_rm . '/status/0');
      $data['data_reg_arsip'] = json_decode($response_reg_arsip->getBody()->getContents(), true)['data'];

      // menghapus file
      $user_id      = $this->session->userdata('id_user');
      foreach(glob($this->folder . $user_id . '_' . $this->class . '*') as $f) 
      {
        unlink($f);
      }

      
      $this->load->view('contents/' . $this->class . '/list', $data);
    }

  }


  public function render_data($type, $id_reg, $status)
  {
        
    // hasil get data dari API
    $response_visit     = $this->_client->request('GET', 'pasien/pasien_visit/id_registrasi/'. $id_reg);
    $data_visit = json_decode($response_visit->getBody()->getContents(), true)['data'];

    if ($type == 'list') {
      
      foreach ($data_visit as $k => $v) {

        $response_notes     = $this->_client->request('GET', 'template_get/id_pasien_visit/'. $v['id_visit']);
        $data_notes = json_decode($response_notes->getBody()->getContents(), true)['data'];

        $data['list'][$k] = [
          'id_reg'    => $v['id_registrasi'],
          'no_reg'    => $v['no_reg'],
          'id_visit'  => $v['id_visit'],
          'id_visit'  => $v['id_visit'],
          'no_visit'  => $v['no_visit'],
          'penjamin'  => $v['nama_penjamin'],
          'id_dept'   => $v['id_poli'],
          'nama_dept' => $v['nama_dept'],
          'tanggal_checkin' => $v['checkin'],
          'data'      => $data_notes,
          'pasien'    => $data_visit[$k]
        ];

        $user_id      = $this->session->userdata('id_user');
        
        $savetofile = fopen($this->folder . $user_id . '_' . $this->class . '_' . $v['id_visit'], 'w');
        fwrite($savetofile, json_encode($data['list'][$k]));
        fclose($savetofile);

      }
    }

    // menyimpan data yang diambil ke file lokal
      $this->load->view('contents/' . $this->class . '/render_' . $status, $data);
    
  }

  public function add_submenu($type)
  {

    if ($type == 'list') {
      $response_dokter     = $this->_client->request('GET', 'ref/dokter/');
      $data['data_dokter'] = json_decode($response_dokter->getBody()->getContents(), true)['data'];

      $response_perawat     = $this->_client->request('GET', 'ref/perawat/');
      $data['data_perawat'] = json_decode($response_perawat->getBody()->getContents(), true)['data'];


      $data['id_reg'] = $this->input->post('id_reg',true);
      $data['id_visit'] = $this->input->post('id_visit',true);

      $this->load->view('contents/' . $this->class  . '/add', $data);
    }

  }

  public function add_process_submenu($type)
  {
    $params = [
      'id_pasien_registrasi' => $this->input->post('id_reg'),
      'id_pasien_visit'      => $this->input->post('id_visit'),
      'id_petugas_approve'   => $this->input->post('petugas_approved'),
      'id_dokter_approve'    => $this->input->post('dokter_approved'),
    ];

    $this->_config['body'] = json_encode($params);
    $response     = $this->_client->request('POST', 'template_add', $this->_config);

    $result = json_decode($response->getBody()->getContents(), true);

    echo json_encode($result);
  }

  public function edit_submenu()
  {
    $data['data_dokter'] = 
    [
        0 => [
          'id' => 10, 
          'nama' => "Dr. Andy Sugita"
        ],
        1 => [
          'id' => 9,
          'nama' => "dr. Serly Sriwahyuni"
        ],
        2 => [
          'id' => 8,
          'nama' => "dr. Ahmad"
        ],
        3 => [
          'id' => 7,
          'nama' => "dr Hery Ramdani Sp.A"
        ]
    ];

    $data['data_perawat'] = 
    [
        0 => [
          'id' => 6, 
          'nama' => "Sri Sekarwati Amd Kep"
        ],
        1 => [
          'id' => 5,
          'nama' => "Fajar Nugraha Amd Kep"
        ]
    ];

    $id_reg = $this->input->get('id_reg');

    // variable id registrasi dari post list.php
    $param = ['id_reg' => $id_reg];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $this->req_server . $this->router->fetch_class() .'/getdata_by_id_reg');
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($param));
    curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_POST, count($param));
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER,1);
    $result_data = curl_exec($ch);
    curl_close($ch);

    $result_data = json_decode($result_data, true);
    $data['result'] = $result_data['data'];

    $data['id_visit'] = $result_data['data']['id_pasien_visit'];
    $data['id_reg']   = $id_reg;
    // trace($data);
    $this->load->view('contents/' . $this->class . '/edit', $data);
  }

  public function edit_process_submenu()
  { 
    $params = [
      'id_pasien_registrasi' => $this->input->post('id_reg'),
      'id_pasien_visit'      => $this->input->post('id_visit'),
      'id_petugas_approve'   => $this->input->post('petugas_approved'),
      'id_dokter_approve'    => $this->input->post('dokter_approved'),
      'id_petugas_input'     => $this->session->userdata['user_login']['id_user'],
      'created_date'         => date("Y-m-d H:i:s"),
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $this->req_server . $this->router->fetch_class() . '/edit');
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
    curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_POST, count($params));
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER,1);
    $result_pasien = curl_exec($ch);
    curl_close($ch);

    $result_pasien = json_decode($result_pasien, true);

    echo json_encode($result_pasien);
  }

  function delete_submenu($id_reg, $id_visit, $status)
  {
    
    $params = [
      'id_pasien_registrasi' => $id_reg,
      'id_pasien_visit'      => $id_visit,
      'del_by'               => $this->session->userdata['user_login']['id_user'],
      'del_date'             => date("Y-m-d H:i:s"),
    ];
 
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $this->req_server . $this->router->fetch_class() . '/delete');
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
    curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_POST, count($params));
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER,1);
    $result_pasien = curl_exec($ch);
    curl_close($ch);

    $result_pasien = json_decode($result_pasien, true);
    
    if($result_pasien['status'] == 200)
    {      
      $user_id   = $this->session->userdata['user_login']['id_user'];
      unlink($this->folder . $user_id . '_' . $status); 
    }
    echo json_encode($result_pasien);
  }

  function view_pdf()
  {
    $user_id      = $this->session->userdata('id_user');
    $type         = $this->input->get('type');
    $status       = $this->input->get('status');
    $id_visit     = $this->input->get('id_visit');


    // if(@fopen($this->folder . $user_id . '_' . $this->class . '_' . $id_visit, 'r') == false)
    // {
    //   echo 'Data tidak tersedia, Silahkan kembali ke menu utama !';
    // }
    // else
    // {
      $openfile = fopen($this->folder . $user_id . '_' . $this->class . '_' . $id_visit, 'r');
      $raw_file = fgets($openfile);
      $raw      = json_decode($raw_file,TRUE);
      fclose($openfile);
      if(!empty($raw['data']))
      {

        //clinic profile
        $rs_key = $this->session->userdata('rs_key');

        $response_prop_clinic     = $this->_client->request('GET', 'ref/clinic_profile/rs_key/'. $rs_key);
        $prop_clinic = json_decode($response_prop_clinic->getBody()->getContents(), true);
        $clinic_profile = $prop_clinic['data'];
      

        // form header
        $id_form= 2;

        $response_form_header     = $this->_client->request('GET', 'ref/form/id_form/'. $id_form);
        $form_header = json_decode($response_form_header->getBody()->getContents(), true);
        $form = $form_header['data'];
        

        $title  = $form['nama_form']; // title pdf
        $kode   = $form['kode_form']; // kode form
        $name   = $form['pdf_file_name'] . date("Ymd") . '.pdf'; // nama form

        $data   = [
              'title' => $title,
              'list'  => $raw,
        ];

        $html  = $this->load->view('contents/'. $this->class . '/pdf', $data, true);

        $mpdf = new \Mpdf\Mpdf([
          'format'              => 'A4-P',
          'mode'                => 'utf-8',
          'setAutoTopMargin'    => 'stretch',
          'defaultheaderline'   => 0,
          'defaultfooterline'   => 0
        ]);

        $mpdf->SetMargins(0, 0, 12);

        $header = '<div class="row">
                      <table border="1" width="100%">
                        <tr>
                          <td rowspan="4" width="15%" style="text-align:center;">
                            <img style="width: 12%;" src="' . $clinic_profile['logo1'] . '">
                          </td>
                          <td colspan="5" style="border-left:none;text-align:center;padding:10px;padding-left:20px;">
                            <h4 class="r-bold"><b>'. $title .'</h4>
                          </td>
                          <td style="border-left:none;padding:10px;text-align:center;"><h4 class="r-bold">'.$kode.'</h4></td>
                        </tr>
                        <tr>
                          <td colspan="6" style="border-top:none;border-left:none;padding:10px;">
                            <span style="font-size:10pt;font-weight:bold">' . $clinic_profile['clinic_name'] . '</span><br>
                          </td>
                        </tr>
                      </table>
                    </div>';

        $mpdf->SetHeader($header);
        $mpdf->setFooter('PDF Hal' . '{PAGENO} / {nb}');
        $mpdf->SetDisplayMode('fullpage');
        $mpdf->WriteHTML($html);

        $mpdf->Output($name, 'I');
      }
      else
      {
        echo 'Data tidak tersedia, Silahkan kembali ke menu utama !';
      }
    // }
  }
}