window.onload = getName;
var username;

function getName(){
    document.querySelector('.name_error').style.display = 'none';
    document.querySelector('.text_error').style.display = 'none';
    document.querySelector('.length_error').style.display = 'none';
    document.querySelector('.sk-circle').style.display = 'none';
    username = location.search.substring(10);
    console.log(location);
    //siia võiks lisada veel, et ütleb olenevalt kellaajast tere hommikust/õhtut
}

function sendname(){
    schedulename = document.getElementById('schedulename').value;
    if(schedulename !== ''){
      if((isNaN(schedulename)===true)){
        if(schedulename.length <= 40){
        doEffect();
        document.querySelector('.name_error').style.display = 'none';
        document.querySelector('.text_error').style.display = 'none';
        document.querySelector('.length_error').style.display = 'none';
        location.href = 'new_schedule.html?username='+username+'&schedulename='+schedulename;
      } else {
        document.querySelector('.length_error').style.display = 'block';
        document.querySelector('.name_error').style.display = 'none';
        document.querySelector('.text_error').style.display = 'none';
      }
        } else {
          document.querySelector('.length_error').style.display = 'none';
          document.querySelector('.name_error').style.display = 'none';
          document.querySelector('.text_error').style.display = 'block';
        }
    } else {
      document.querySelector('.name_error').style.display = 'block';
      document.querySelector('.text_error').style.display = 'none';
      document.querySelector('.length_error').style.display = 'none';
    }

}

function doEffect(){
  document.querySelector('.saving').style.display = 'none';
 document.querySelector('.sk-circle').style.display = 'block';

}
