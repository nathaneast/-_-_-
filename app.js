const dates = document.querySelector('.calender-dates');
const currMonth = document.querySelector('.currMonth');
const backMonthBtn = document.querySelector('.backMonthBtn');
const nextMonthBtn = document.querySelector('.nextMonthBtn');
const addUserBtn = document.querySelector('.addUserBtn');
const modal = document.querySelector('.modal');
const modalMessage = document.querySelector('.modal-message');
const modalBtns = document.querySelector('.modal-buttons');

function init() {
  const modals = {
    openModal: () => {
      modal.classList.remove('hidden');
    },
    addUser: () => {
      modals.openModal();
  
      const addBtn = document.createElement('button');
      const closeBtn = document.createElement('button');
      
      modalMessage.innerText = '샘을 추가 하시겠어요 ?'

      addBtn.innerText = '추가';
      closeBtn.innerText = '닫기';
      modalBtns.appendChild(addBtn);
      modalBtns.appendChild(closeBtn);

    }
  } 
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
  addUserBtn.addEventListener('click', modals.addUser);
}
init();
