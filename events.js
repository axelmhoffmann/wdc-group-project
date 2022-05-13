function getEventIndex() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('i');
}

function getPeopleGoing(index) {
    return 32;
}

function getPeopleMaybeGoing(index) {
    return 42;
}

function viewEvent(index) {
  window.location.href="view-event.html?i=" + index;
}

var app = new Vue({
    el: '#app',
    data: {
      eventListings: [
        {title: 'WDC Project Milestone 1 Due Date', description: 'You will die', image: 'happywdc.png', date: new Date(2022, 4, 13, 23, 59, 59, 999), location: 'MyUni'},
        {title: 'Birthday Party', description: 'I will be born', image: 'exampleeventphoto.png', date: new Date(2022, 4, 9, 12, 0, 0, 0), location: 'My House (Location Undisclosed)'},
      ]
    }
});
