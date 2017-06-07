//Timer Related
const ONE_SECOND = 1000;
var refreshInterval;
var currentTimer;
var timersTotalsMap = new Map();
var timerHistory = new Array();

function getCurrentTimer(){
  return currentTimer;
}

function clockIn(activity){
  clockOut();
  RUNNING_ACTIVITY.innerHTML = "Clocking "+activity;
  startRunning( createNewTimerObject(activity) );
  console.log("Clocking In "+ getCurrentTimer().name);
}

function clockOut(){
  stopRunning();
  if( getCurrentTimer() ){
    //TODO:save active timer data
    console.log("Clocking Out "+ getCurrentTimer().name);
    saveTimerOnHistoryAndDisplay( getCurrentTimer() );
    GLOBAL_TIMER.innerHTML = "00:00:00";
    RUNNING_ACTIVITY.innerHTML = "Not Running";
    currentTimer = null;
  }
}

function startRunning(timerObj) {
   currentTimer = timerObj;
   refreshInterval = setInterval( updateActiveTimer, ONE_SECOND);
}

function stopRunning(){
  if ( refreshInterval ){
    clearInterval(refreshInterval);    
  }
  refreshInterval = undefined;
}

/*This is the method that get called by interval on the specified time (1 sec).
  It will updated the elapsed time on the current activity Timer, and refresh 
  the user viee. */
function updateActiveTimer() {
  getCurrentTimer().elapsed = new Date() -  getCurrentTimer().startTime;
  let formattedTime = formatElapsedTime(getCurrentTimer().elapsed);
  //console.log("Update Timer: "+ formattedTime); 
  //console.log(getCurrentTimer());
  updateTimerView(GLOBAL_TIMER,formattedTime);
}

function createNewTimerObject(activity){
  if( !timersTotalsMap.has(activity) ){
    timersTotalsMap.set(activity,{name:activity,totalTime:0});
  }
  let timerObj = {startTime: new Date(), name:activity};
  return timerObj;
}

function saveTimerOnHistoryAndDisplay(timer){
  
  if(timer.elapsed){
    //update Total for Activity
    let tmap = timersTotalsMap.get(timer.name);
    tmap.totalTime += timer.elapsed;
    console.log(tmap);
    let li = document.querySelector("#timer-total-"+tmap.name);
    li.innerHTML = tmap.name +": "+ formatElapsedTime(tmap.totalTime) 
    
    //update timer history
    timerHistory.push(timer);
    li = document.createElement("li");
    li.append(timer.name +" - "+ formatElapsedTime(timer.elapsed) ) ;
    TIMER_HISTORY.append(li);
  }
  
}

function formatElapsedTime(timeinMilis){
  let hours =0, minutes=0, seconds=0;

  hours = Math.floor( (timeinMilis/1000)/60/60);
  minutes = Math.floor( (timeinMilis/1000)/60) - (hours * 60);
  seconds = Math.floor( (timeinMilis/1000)  - ( ((hours * 60) + minutes) * 60) );
  
  formattedTime =
      leadingZero(hours) + ":" +  
      leadingZero(minutes) + ":" + 
      leadingZero(seconds);
  return formattedTime;
}

function leadingZero(value){
  return (value<10)?"0"+value:value;
}

function updateTimerView(timerView, timeString){
  timerView.innerHTML = timeString;
}

function resetAll(){
  /*
  GLOBAL_TIMER.innerHTML = "00:00:00";
  CATEGORY_TIMER.innerHTML = "00:00:00";
  ACTIVE_CAT_LABEL.innerHTML = " on "+ DEFAULT_CATEGORY;
  //make dynamic
  document.querySelector("#total-Default").innerHTML ="";
  document.querySelector("#total-Work").innerHTML ="";
  document.querySelector("#total-Break").innerHTML ="";
  */
  //stopRunning();
  clockOut();
  init();
  timersTotalsMap = new Map();
  timerHistory = new Array();
}