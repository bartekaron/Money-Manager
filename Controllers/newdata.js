function setMaxDate(){
    let date = document.querySelector('#date');
    date.max =  new Date().toISOString().split("T")[0];
}

function getToday(){
    setTimeout(()=>{setMaxDate()}, 500);
}

function addPrice(){

    let date = document.querySelector('#date');
    let price = document.querySelector('#price');
    let type = document.querySelector('#type');
    let tag = document.querySelector('#tag');

    if (date.value == "" || price.value == 0 || type.value == "" || tag.value == ""){
        showMessage("Nem adtál meg minden adatot!");
    }
   
    else{
        axios.get(`${serverURL}/items/${loggedUser.ID}`).then(res=>{
            let vane = false;
            let upID = -1;
            res.data.forEach(item => {
                if (item.date.split('T')[0] == date.value){
                    vane = true;
                    upID = item.ID;
                    return;
                }
            });
            if(type.value.toLowerCase() == "kiadás"){
                price.value = -price.value;
            }

            if(vane){   
                let data = {
                    price : price.value,	
                    type : type.value,
                    tag : tag.value
                }
                axios.patch(`${serverURL}/items/${userID}`, data).then((res)=>{
                    alert('Az összeg módosítva!');
                    date.value = null;
                    type.value = "";
                    price.value = 0;
                    tag.value = "";
                    
                });
            }
            
            else{
                let data = {
                    userID : loggedUser.ID,	
                    date : date.value,
                    type: type.value.toLowerCase(),	
                    amount : price.value,
                    tag : tag.value	
                }

                axios.post(`${serverURL}/items`, data).then((res)=>{
                    alert('Az összeg rögzítve!');
                    date.value = null;
                    type.value = null;
                    price.value = 0;
                    tag.value = null;
                });
            }
        })
    }
}

getToday();
