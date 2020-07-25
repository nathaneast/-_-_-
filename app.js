const dates = document.querySelector('.calender-dates');
const currMonth = document.querySelector('.currMonth');
const backMonthBtn = document.querySelector('.backMonthBtn');
const nextMonthBtn = document.querySelector('.nextMonthBtn');
const addUserBtn = document.querySelector('.addUserBtn');

const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

function init() {
  let currDate = new Date();

  function modals() {
    function modalInitMarkup() {
      const currContent = document.createElement('div');
      const message = document.createElement('div');
      const userInput = document.createElement('div');
      const btns = document.createElement('div');

      currContent.classList.add('currContent');
      message.classList.add('message');
      userInput.classList.add('userInput');
      btns.classList.add('btns');

      currContent.appendChild(message);
      currContent.appendChild(userInput);
      currContent.appendChild(btns);
      modalContent.appendChild(currContent);
    }

    function openModal() {
      modal.classList.remove('hidden');
    }

    // 첫번째 자식 div만 지우면 되지만 두번 눌러야 동작해서 while처리 추후 리팩토링
    function resetContent() {
      while (modalContent.firstChild) {
        modalContent.firstChild.remove();
      }
    }

    function addUser() {
      openModal();
      modalInitMarkup();

      const addUserMessage = document.createElement('h3');
      const userInputName = document.createElement('input');
      const addBtn = document.createElement('button');
      const closeBtn = document.createElement('button');
      userInputName.classList.add('userInputName');

      document.querySelector('.message').appendChild(addUserMessage);
      document.querySelector('.userInput').appendChild(userInputName);
      document.querySelector('.btns').appendChild(addBtn);
      document.querySelector('.btns').appendChild(closeBtn);
      
      addUserMessage.innerText = '이름을 입력 해주세요';
      addBtn.innerText = '추가';
      closeBtn.innerText = '닫기';
      addBtn.addEventListener('click', addUserCheck);
    }

    function inputUserNameWarning() {
      modalInitMarkup();

      const warningMessage = document.createElement('h3');
      const returnAddUserBtn = document.createElement('button');
      const closeBtn = document.createElement('button');

      document.querySelector('.message').appendChild(warningMessage);
      document.querySelector('.btns').appendChild(returnAddUserBtn);
      document.querySelector('.btns').appendChild(closeBtn);

      warningMessage.innerText = '이름을 1 ~ 5 자리로 입력 해주세요';
      returnAddUserBtn.innerText = '다시 생성';
      closeBtn.innerText = '닫기';

      returnAddUserBtn.addEventListener('click', () => {
        resetContent();
        addUser();
      });
    }

    function addUserCheck() {
      const userNameLength =  document.querySelector('.userInputName').value.length;
      if (userNameLength === 0 || userNameLength > 5) {
        console.log(userNameLength);
        resetContent();
        inputUserNameWarning();
      }
    }
    addUser();
  }

  function viewCurrMonth() {
    currMonth.innerText = `${currDate.getFullYear()} 년 ${currDate.getMonth() + 1}월`
  }

  function removeCalender() {
    // div로 날짜들 감싸서 div 하나만 지우게 리팩토링
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
  addUserBtn.addEventListener('click', modals);
}
init();
