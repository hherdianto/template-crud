
function sendEmail(){
  var $formemail = $("form#form_email");
  var $button =$('div#buttonsubmite');
  var $urlemail = api_url +'c_send_email/kirim/';
  var $beforesend = '<button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>';

    $.ajax({
      url:$urlemail,
      type:'post',
      data:$formemail.serialize(),
      dataType:'json',
      beforeSend:function(r,s){
        $button.html($beforesend);
      },
      success:function(data){
        alert(data.msg);
        $button.html('<button id="buttonsubmit" onclick="sendEmail();" class="btn btn-primary">Send</button>');
      },
      error:function(j,r,e){
        alert(JSON.stringify(j) +' : '+ e);
        $button.html('<button id="buttonsubmit" onclick="sendEmail();" class="btn btn-primary">Send</button>');
      }
  })
}

$('#customer').select2({
  theme: 'bootstrap4',
  placeholder: "Customer",
  
  ajax: {
	    url: api_url+"c_send_email/getCustomer",
	    dataType: 'json',
	    type: "POST",
	    processResults: function (r) {
	      return {
	        results: r.data
	      };
	    }
	}
})

$('#inquiry').select2({
  theme: 'bootstrap4',
  placeholder: "Inquiry",
  
  ajax: {
	    url: api_url+"c_send_email/getInquiry",
	    dataType: 'json',
	    type: "POST",
	    processResults: function (r) {
	      return {
	        results: r.data
	      };
	    }
	}
})

$('#contract').select2({
  theme: 'bootstrap4',
  placeholder: "Contract",
  
  ajax: {
	    url: api_url+"c_send_email/getContract",
	    dataType: 'json',
	    type: "POST",
	    processResults: function (r) {
	      return {
	        results: r.data
	      };
	    }
	}
})

$('#contractStatus').select2({
  theme: 'bootstrap4',
  placeholder: "Contract Status",
  
  ajax: {
	    url: api_url+"c_send_email/getContractStatus",
	    dataType: 'json',
	    type: "POST",
	    processResults: function (r) {
	      return {
	        results: r.data
	      };
	    }
	}
})
$('#customerAll').select2({
  theme: 'bootstrap4',
  placeholder: "All Customer",
})
$('#inquiryAll').select2({
  theme: 'bootstrap4',
  placeholder: "All Inquiry",
})



$('#textareamail').summernote({
	airMode: false,
	height: 200,
	placeholder: 'Message',
});
