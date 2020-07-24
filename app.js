const dates = document.querySelector('.calender-dates');
const currMonth = document.querySelector('.currMonth');
const backMonthBtn = document.querySelector('.backMonthBtn');
const nextMonthBtn = document.querySelector('.nextMonthBtn');

function init() {
  let currDate = new Date();

  function viewCurrMonth() {
    currMonth.innerText = `${currDate.getFullYear()} 년 ${ currDate.getMonth() + 1}월`
  }

  function removeCalender() {
    while (dates.firstChild) {
      dates.firstChild.remove();
    }
  }

  function monthHandler() {
    
    if (event.target.className === 'nextMonthBtn') {
      currDate.setMonth(currDate.getMonth() + 1);
    } else {
      currDate.setMonth(currDate.getMonth() - 1);
    }

    removeCalender();
    dateProcess();
  }

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

    viewCurrMonth();
  }

  function dateProcess() {
    currDate.setDate(1);

    const dateCulData = {
      firstDay: currDate.getDay(),
      lastDate: new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate()
    }

    viewCalender(dateCulData);
  }
  dateProcess();

  backMonthBtn.addEventListener('click', monthHandler);
  nextMonthBtn.addEventListener('click', monthHandler);
}
init();
