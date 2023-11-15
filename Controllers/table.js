function getAllPrices(){
    let tbody = document.querySelector('tbody');
    let sumPrices = document.querySelector('#sumPrices');

    axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
        let i = 0;
        let sum = 0;
        res.data.sort((a,b) => a.date.localeCompare(b.date));
        res.data.forEach(item => {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let td5 = document.createElement('td');
            


            i++;
            sum += item.amount;

            td1.innerHTML = i + '.';

            td2.innerHTML = item.date.split('T')[0];

            td3.innerHTML = item.type;

            td4.innerHTML = item.tag;

            td5.innerHTML = item.amount;
            td5.classList.add('text-end');

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tbody.appendChild(tr);
        });

        sumPrices.innerHTML = sum;
    })
}

function renderData(){
    setTimeout(()=>{getAllPrices();}, 200);
}