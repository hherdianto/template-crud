
    /* initialize the external events
     -----------------------------------------------------------------*/
    function ini_events(ele) {
      ele.each(function () {

        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
          title: $.trim($(this).text()) // use the element's text as the event title
        }

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject)

        // make the event draggable using jQuery UI
        $(this).draggable({
          zIndex        : 1070,
          revert        : true, // will cause the event to go back to its
          revertDuration: 0  //  original position after the drag
        })

      })
    }

    ini_events($('#external-events div.external-event'))

    /* initialize the calendar
     -----------------------------------------------------------------*/
    //Date for the calendar events (dummy data)
    var date = new Date()
    var d    = date.getDate(),  
        m    = date.getMonth(),
        y    = date.getFullYear()

    var Calendar = FullCalendar.Calendar;
    //var Draggable = FullCalendarInteraction.Draggable;

    //var containerEl = document.getElementById('external-events');
    //var checkbox = document.getElementById('drop-remove');
    var calendarEl = document.getElementById('calendar');

    // initialize the external events
    // -----------------------------------------------------------------

    /*new Draggable(containerEl, {
      itemSelector: '.external-event',
      eventData: function(eventEl) {
        console.log(eventEl);
        return {
          title: eventEl.innerText,
          backgroundColor: window.getComputedStyle( eventEl ,null).getPropertyValue('background-color'),
          borderColor: window.getComputedStyle( eventEl ,null).getPropertyValue('background-color'),
          textColor: window.getComputedStyle( eventEl ,null).getPropertyValue('color'),
        };
      }
    });*/

    var calendar = new Calendar(calendarEl, {
      plugins: [ 'bootstrap', 'interaction', 'dayGrid', 'timeGrid' ],
      header    : {
        left  : 'prev,next today',
        center: 'title',
        right : 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      //Random default events

      events    : api_url + 'c_calendar/get_all_event',
      editable  : true,
      droppable : true, // this allows things to be dropped onto the calendar !!!
      drop      : function(info) {
        // is the "remove after drop" checkbox checked?
        if (checkbox.checked) {
          // if so, remove the element from the "Draggable Events" list
          info.draggedEl.parentNode.removeChild(info.draggedEl);
        }
      },
      eventClick: function(info) {
        var dataDetailEvent = ajax("GET","c_calendar/detail/" + info.event._def.publicId);
        $('.modal-body').empty();
        var date = new Date().toISOString().slice(0,10);;
        var style = "";
        if(date == dataDetailEvent.data.engangement_date) {
          var style = "style='font-weight: bold; color: red'";
        }
        var stylePhotoBooth = "";
        if(date == dataDetailEvent.data.photobooth_date) {
          var stylePhotoBooth = "style='font-weight: bold; color: red'";
        }
        var styleWedding = "";
        if(date == dataDetailEvent.data.wedding_photo_date) {
          var styleWedding = "style='font-weight: bold; color: red'";
        }
        var styleWeddingVideo = "";
        if(date == dataDetailEvent.data.wedding_video_date) {
          var styleWeddingVideo = "style='font-weight: bold; color: red'";
        }
        var divClientContractId = '<p>Client Contract Id : '+dataDetailEvent.data.id+'</p>';
        var divNoRefMou = '<p>No Ref : '+dataDetailEvent.data.no_ref_client_contract+'</p>';
        var divDateEvent = '<p>Date Of Events</p>';
        var divEngagement = '<p>Engagement : '+dataDetailEvent.data.engangement_date+'</p>';
        var divPhotoBooth = '<p>PhotoBooth : '+dataDetailEvent.data.photobooth_date+'</p>';
        var divWeddingPhoto = '<p>Wedding Photo : '+dataDetailEvent.data.wedding_photo_date+'</p>';
        var divWeddingVideo = '<p>Wedding Video : '+dataDetailEvent.data.wedding_video_date+'</p>';
        $('.modal-body').html(divClientContractId + divNoRefMou + divDateEvent + divEngagement + divPhotoBooth + divWeddingPhoto + divWeddingVideo);
        $('#modal-event').modal('show');
      }    
    });

    calendar.render();
    // $('#calendar').fullCalendar()

    /* ADDING EVENTS */
    var currColor = '#3c8dbc' //Red by default
    //Color chooser button
    var colorChooser = $('#color-chooser-btn')
    $('#color-chooser > li > a').click(function (e) {
      e.preventDefault()
      //Save color
      currColor = $(this).css('color')
      //Add color effect to button
      $('#add-new-event').css({
        'background-color': currColor,
        'border-color'    : currColor
      })
    })
    $('#add-new-event').click(function (e) {
      e.preventDefault()
      //Get value and make sure it is not null
      var val = $('#new-event').val()
      if (val.length == 0) {
        return
      }

      //Create events
      var event = $('<div />')
      event.css({
        'background-color': currColor,
        'border-color'    : currColor,
        'color'           : '#fff'
      }).addClass('external-event')
      event.html(val)
      $('#external-events').prepend(event)

      //Add draggable funtionality
      ini_events(event)

      //Remove event from text input
      $('#new-event').val('')
    })


    function ajax(type, url, param = null, paramValue = null) {

    var json = {};
    var url;
    if (type == 'GET' && param != null && param != null) {
        url = api_url + url + "?" + param + "=" + paramValue
    } else {
        url = api_url + url;
    }
    $.ajax({
        async: false,
        global: false,
        url: url,
        type: type,
        complete: function (e) {
            
            if (e.status == 200) {
                json = JSON.parse(e.responseText);
            } else {
                json = JSON.parse(e.responseText);
            }
        }
    });
    return json;
}
