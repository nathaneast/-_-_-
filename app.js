const dates = document.querySelector('.calender-dates');
const currMonth = document.querySelector('.currMonth');
const backMonthBtn = document.querySelector('.backMonthBtn');
const nextMonthBtn = document.querySelector('.nextMonthBtn');
const addUserBtn = document.querySelector('.addUserBtn');

const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');

const userList = document.querySelector('.userList');

function init() {
  const currDate = new Date();
  const modalsProcess = {
    initMarkup: () => {
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
    },
    resetContent: () => {
      while (modalContent.firstChild) {
        modalContent.firstChild.remove();
      }
    },
    openModal: () => {
      modal.classList.remove('hidden');
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
          modalsProcess.resetContent();
          modal.classList.add('hidden');
        }
      });
    },
    closeModal: () => {
      modal.classList.add('hidden');
      modalsProcess.resetContent();
    },
    warningMessage: {
      userCount: () => {
        modalsProcess.resetContent();
        modalsProcess.initMarkup();

        const warningMessage = document.createElement('h3');
        const closeBtn = document.createElement('button');

        document.querySelector('.message').appendChild(warningMessage);
        document.querySelector('.message').appendChild(warningMessage);
        document.querySelector('.btns').appendChild(closeBtn);

        warningMessage.innerText = '인원은 5명을 초과할 수 없습니다';
        closeBtn.innerText = '확인';

        closeBtn.addEventListener('click', modalsProcess.closeModal);
      },
      userName: () => {
        modalsProcess.resetContent();
        modalsProcess.initMarkup();

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
          modalsProcess.resetContent();
          userProcess.addUser();
        });
        closeBtn.addEventListener('click', () => {
          modalsProcess.resetContent();
          modalsProcess.closeModal();
        });
      }
    }
  }

  const userProcess = {
    selectDayOf: user => {
      const currMonthDates = document.querySelector('.currMonth-dates');
      const selecteUserName = user.currentTarget.firstChild.innerHTML;
      const hasSelectedUser = user.currentTarget.classList.toggle('selectedUser');

      if (hasSelectedUser) {
        currMonthDates.addEventListener('click', e => {
          const hasEmptyDate = !e.target.classList.contains('emptyDate');
          const hasCurrMonthDates = !e.target.classList.contains('currMonth-dates');
          const dayOfUser = document.createElement('div');
          const dayOfUserName = document.createElement('span');
          dayOfUser.classList.add(selecteUserName);

          dayOfUserName.innerText = selecteUserName;

          if (hasEmptyDate && hasCurrMonthDates) {
            getElementsByClassName

            if (e.target.classList.contains('date-number')) {
              e.target.parentNode.appendChild(dayOfUser);
              dayOfUser.appendChild(dayOfUserName);
            } else {
              e.target.appendChild(dayOfUser);
              dayOfUser.appendChild(dayOfUserName);
            }
          }
        });
      } else {
        // 선택된 유저 또 누르면 이벤트 제거 되야함


        // document.querySelector('.currMonth-dates').removeEventListener('click', e => {
        //   if(!e.target.classList.contains('emptyDate')) {
        //     console.log(e.target);
        //   }
        // });
      };
    },
    datesOnEvent: user => {
      const currDates = document.querySelector('.currMonth-dates').childNodes;
      for (let i = 0; i <= currDates.length; i++) {
        if (!currDates[i].classList.contains('emptyDate')) {
          currDates[i].addEventListener('click', )
          //유저인자 받아야 유저 이름 알 수 있음 굳이 ? 
        }
      }

      // const selecteUser = user.currentTarget.firstChild.innerHTML;
      // const dates = document.querySelector('.currMonth-dates').childNodes;

      // });
    },
    selecteUser: user => {
      user.currentTarget.classList('selectedUser');
      const a = user.currentTarget.firstChild.innerHTML;
      console.log(a)
    },
    userListUp: () => {
      const newUser = document.createElement('div');
      const newUserName = document.createElement('span');

      newUserName.innerText = document.querySelector('.userInputName').value;
      userList.appendChild(newUser);
      newUser.appendChild(newUserName);

      newUser.addEventListener('click', e => {
        userProcess.selecteUser(e);
        // userProcess.datesOnEvent();
      });
      modalsProcess.closeModal();
    },
    addUserCheck: () => {
      const userNameLength = document.querySelector('.userInputName').value.length;
      if (userNameLength === 0 || userNameLength > 5) {
        modalsProcess.warningMessage.userName();
      } else if (userList.childElementCount === 5) {
        modalsProcess.warningMessage.userCount();
      } else {
        userProcess.userListUp();
      }
    },
    addUser: () => {
      modalsProcess.openModal();
      modalsProcess.initMarkup();

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

      addBtn.addEventListener('click', userProcess.addUserCheck);
      closeBtn.addEventListener('click', modalsProcess.closeModal);
    }
  }

  const calenderProcess = {
    // 첫번째 자식 div만 지우면 되지만 두번 눌러야 동작해서 while처리 추후 리팩토링
    viewCurrMonth: () => {
      currMonth.innerText = `${currDate.getFullYear()} 년 ${currDate.getMonth() + 1}월`
    },
    resetCalender: () => {
      // div로 날짜들 감싸서 div 하나만 지우게 리팩토링
      while (dates.firstChild) {
        dates.firstChild.remove();
      }
    },
    monthHandler: () => {
      if (event.target.className === 'nextMonthBtn') {
        currDate.setMonth(currDate.getMonth() + 1);
      } else {
        currDate.setMonth(currDate.getMonth() - 1);
      }
      calenderProcess.resetCalender();
      calenderProcess.dateCulculation();
    },
    viewCalender: dateCulData => {
      const loopNumber = dateCulData.firstDay + dateCulData.lastDate;
      const currMonthDates = document.createElement('div');
      currMonthDates.classList.add('currMonth-dates');

      let viewDate = 1;

      for (let i = 0; i < loopNumber; i++) {
        const dateEle = document.createElement('div');
        dates.appendChild(currMonthDates);
        currMonthDates.appendChild(dateEle);
        
        if (i >= dateCulData.firstDay) {
          const dateNum = document.createElement('span');
          dateNum.innerText = viewDate;
          dateEle.classList.add(`date-${viewDate}`);
          dateNum.classList.add(`date-number`);
          dateEle.appendChild(dateNum);
          viewDate++;
        } else {
          dateEle.classList.add('emptyDate');
        }
      }
      calenderProcess.viewCurrMonth();
    },
    dateCulculation: () => {
      currDate.setDate(1);

      const dateCulData = {
        firstDay: currDate.getDay(),
        lastDate: new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate()
      }
      calenderProcess.viewCalender(dateCulData);
    }
  }
  calenderProcess.dateCulculation();

  backMonthBtn.addEventListener('click', calenderProcess.monthHandler);
  nextMonthBtn.addEventListener('click', calenderProcess.monthHandler);
  addUserBtn.addEventListener('click', userProcess.addUser);
}
init();
