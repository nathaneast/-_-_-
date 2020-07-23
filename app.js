const dates = document.querySelector('.calender-dates');

function viewCalender(dateCulData) {
  const loopNumber = dateCulData.firstDay + dateCulData.lastDate;
  let viewDate = 1;

  for (let i = 0; i < loopNumber; i++) {
    const dateEle = document.createElement('div');
    const dateNum = document.createElement('span');

    dates.appendChild(dateEle);
    dateEle.appendChild(dateNum);
    dateEle.classList.add('dateEle');

    if (i >= dateCulData.firstDay) {
      dateNum.innerText = viewDate++;
    }
  }
}

function dateCal(currDate) {
  currDate.setDate(1);
  const dateCulData = {
    firstDay: currDate.getDay(),
    lastDate: new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate()
  }
  viewCalender(dateCulData);
}

function init() {
  const currDate = new Date();
  dateCal(currDate);
}
init();
