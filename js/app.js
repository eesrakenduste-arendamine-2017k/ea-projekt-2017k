var schedules, text, sLen, i;

schedules = ["Chest&Triceps", "Back&Biceps", "Legs"];
sLen = schedules.length;
text = "<ul>";
for(i = 0; i < sLen; i++){
  text += "<li>" + schedules[i] + "</li>";
}
text += "</ul>";
document.getElementById("list-of-schedules").innerHTML = text;
