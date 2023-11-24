
function showChart(){
    let labels = [];
    let IncomeDatas = [];
    let IssuenceDatas = [];

  axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then((res) => {
    res.data.sort((a,b) => a.date.localeCompare(b.date));
    res.data.forEach((item) => {
      labels.push(item.date.toString().split("T")[0]);
      
      if(item.type.toLowerCase() == "bevétel"){
        IncomeDatas.push({x: item.date.toString().split("T")[0], y: item.amount})
        IssuenceDatas.push({x: item.date.toString().split("T")[0], y: 0})
        
      }
      else{
        IssuenceDatas.push({x: item.date.toString().split("T")[0], y: item.amount})
        IncomeDatas.push({x: item.date.toString().split("T")[0], y: 0})
      }
      
      //datas.push(item.amount);
    });
  });

  setTimeout(() => {
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Bevétel:",
            data: IncomeDatas,
            borderWidth: 3,
          },

          {
            label: "Kiadás",
            data: IssuenceDatas,
            borderWidth: 3,
          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: false
          }
        },
      },
    });
  }, 500);
}
