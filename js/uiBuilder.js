//Build Interface
const TIMER_HISTORY = document.querySelector("#timers-history");
const GLOBAL_TIMER = document.querySelector("#global-timer");
const RUNNING_ACTIVITY = document.querySelector("#running-activity");
const ACT_DISPLAY_AREA = document.querySelector("#activities-list-area");
const TIMER_TOTALS = document.querySelector("#timers-totals");

var userActivitiesList = undefined;

function init(){
  TIMER_HISTORY.innerHTML = "";
  ACT_DISPLAY_AREA.innerHTML = "";
  TIMER_TOTALS.innerHTML = "";
  userActivitiesList = getActivitiesForUser(null);
  displayActivityButtons(userActivitiesList);
  displayActivityTotals(userActivitiesList);
}

function getActivitiesForUser(userId){
  let activities;
  if( userId ){
    //getFromDatabase()
  }else{
    activities = createtMockActivities();
  }
  return activities;
}

function createtMockActivities(){
  let lists = [ 
    {name:"Work"},
    {name:"Meeting"},
    {name:"Personal"},
    {name:"Break"} ];
  return lists;
}

// This function will be deprecated after introducing Angular
function displayActivityButtons(list){
  list.forEach( function(value){
    let button = document.createElement("button");
    button.setAttribute("id", "activity-"+value.name);
    button.setAttribute("class", "btn-activity");
    button.setAttribute("onclick", "clockIn('"+value.name+"')");
    button.append( value.name );
    ACT_DISPLAY_AREA.append(button);
  });
}

function displayActivityTotals(list){
  list.forEach( function(value){    
    let li = document.createElement("li");
    li.setAttribute("id", "timer-total-"+value.name);
    li.append(value.name+": 00:00:00");
    TIMER_TOTALS.append(li);
  });
}

init();