$(document).ready(function() {
  
});

function init_tabpages() {
  $(document).on('click', '.form-tab', function() {
    let tab = $(this);
    let tabs = $(this).closest('.form-tabs');
    let tabpage = tabs.next();
    
    // Tabs
    tabs.find('.form-tab').removeClass('selected');
    
    // Tab
    tab.addClass('selected');
    let requires_children = tab.attr('requires_children') && tab.attr('requires_children') == '1' ? true : false;
    
    // Tab Page
    let selectedGroup_text = tab.text();
    tabs.toggleClass('collapsed', !requires_children);
    tabpage.toggle(!tabs.hasClass('collapsed'));
    tabpage.find('.lbl-selected-group').text(selectedGroup_text);
  });
}

function show_loading(loading_element) {
  $(loading_element).before($("<div id='load' style='margin-left:10px'> <span style='margin-left:35px;'>Loading...</span></div>"));
}

$.fn.extend({
  loadingOn: function() {
    if ($(this).find('.fa-spinner').length == 0) {
      $(this)
        .text('Menyimpan')
        .prepend("<i class='fa fa-spinner fa-spin' style='font-size:18px; margin-right: 10px'></i>")
        .attr('disabled', 'disabled');
    }
  },
  loadingOff: function() {
    $(this).find('.fa-spinner').remove();
    $(this)
      .text('Simpan')
      .removeAttr('disabled');
  }
});

// Ketika menekan paging datatables
function changeState() {
  let returnuri = '';
  var dtParams = ['page', 'search', 'pagelength'];

  var items = location.search.substr(1);
  if (items != "") {
    items = items.split("&");
    for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (dtParams.indexOf(tmp[0]) == -1) {
        returnuri = addUriParam(returnuri, tmp[0], decodeURIComponent(tmp[1]));
      }
    }
  }

  if (page && page != '') {
    returnuri = addUriParam(returnuri, 'page', page);
  }
  if (search && search != '') {
    returnuri = addUriParam(returnuri, 'search', search);
  }
  if (pageLength && pageLength != '') {
    returnuri = addUriParam(returnuri, 'pagelength', pageLength);
  }

  history.pushState('', '', returnuri);
}

function addUriParam(paramstr, key, value) {
  paramstr += paramstr == '' ? '?' : '&';
  paramstr += key + '=' + value;

  return paramstr;
}

$(document).on('page.dt', '.dataTable', function (){
  var info = table.page.info();
  page = info.page + 1;

  changeState();
});