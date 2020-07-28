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
    selectedUser: {
      referenceValue: null,
      userName: null,
      userKey: null
    },
    selectUserHandler: user => {
      const currSelectUser = user.currentTarget;
      const userKey = currSelectUser.classList.item(0).split('-')[1];

      if (userProcess.selectedUser.referenceValue === currSelectUser) {
        userProcess.selectedUser.referenceValue.classList.remove('selected-user');
        userProcess.selectedUser.referenceValue = null;
        userProcess.selectedUser.userName = null;
        userProcess.selectedUser.userKey = null;
        calenderProcess.calenderEvents.clickEventHandler('remove');
      } else {
        if (userProcess.selectedUser.referenceValue) {
        userProcess.selectedUser.referenceValue.classList.remove('selected-user');
        } else {
          calenderProcess.calenderEvents.clickEventHandler('add');
        }
        userProcess.selectedUser.referenceValue = currSelectUser;
        userProcess.selectedUser.referenceValue.classList.add('selected-user');
        userProcess.selectedUser.userName = currSelectUser.firstChild.innerHTML;
        userProcess.selectedUser.userKey = userKey;
      }
    },
    userListUp: () => {
      const newUser = document.createElement('div');
      const newUserName = document.createElement('span');
      const userKey = Math.random().toString(36).substr(2,11);

      newUser.classList.add(`userKey-${userKey}`)
      newUserName.innerText = document.querySelector('.userInputName').value;
      userList.appendChild(newUser);
      newUser.appendChild(newUserName);

      newUser.addEventListener('click', e => {
        userProcess.selectUserHandler(e);
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
    currDate: new Date(),
    calenderEvents: {
      onEvent: e => {
        const clickedDate = e.currentTarget;
        const dateUserList = clickedDate.querySelector('.date-userList');
        const userKey = `userKey-${userProcess.selectedUser.userKey}`;
        const user = document.createElement('div');
        const userName = document.createElement('span');
        let hasSameUser = false;

          for (let i = 0; i < dateUserList.childNodes.length; i++) {
            if (dateUserList.childNodes[i].classList.contains(userKey)) {
              hasSameUser = true;
            }
          }
          
          if (hasSameUser) {
            const targetUser = dateUserList.querySelector(`.${userKey}`);
            dateUserList.removeChild(targetUser);
          } else {
            dateUserList.appendChild(user);
            user.appendChild(userName);
            user.classList.add(userKey);
            userName.innerText = userProcess.selectedUser.userName;
          }
      },
      clickEventHandler: action => {
        const currMonthDates = document.querySelector('.currMonth-dates').childNodes;

        for (let i = 0; i < currMonthDates.length; i++) {
          if (currMonthDates[i].classList.contains('date')) {
            if (action === 'add') {
              currMonthDates[i].addEventListener('click', calenderProcess.calenderEvents.onEvent);
            } else {
              currMonthDates[i].removeEventListener('click', calenderProcess.calenderEvents.onEvent);
            }
          }
        }
      },
    },
    viewCurrMonth: () => {
      currMonth.innerText = `${calenderProcess.currDate.getFullYear()} 년 ${calenderProcess.currDate.getMonth() + 1}월`
    },
    resetCalender: () => {
      //while 안쓰고 첫번째 자식만 지우도록 리팩토링
      while (dates.firstChild) {
        dates.firstChild.remove();
      }
    },
    monthHandler: () => {
      if (event.target.className === 'nextMonthBtn') {
        calenderProcess.currDate.setMonth(calenderProcess.currDate.getMonth() + 1);
      } else {
        calenderProcess.currDate.setMonth(calenderProcess.currDate.getMonth() - 1);
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
          const dateUserList = document.createElement('div');
          
          dateNum.innerText = viewDate;
          dateEle.classList.add('date');
          dateNum.classList.add('date-number');
          dateUserList.classList.add('date-userList');

          dateEle.appendChild(dateNum);
          dateEle.appendChild(dateUserList);
          viewDate++;
        } else {
          dateEle.classList.add('emptyDate');
        }
      }
      calenderProcess.viewCurrMonth();
    },
    dateCulculation: () => {
      calenderProcess.currDate.setDate(1);

      const dateCulData = {
        firstDay: calenderProcess.currDate.getDay(),
        lastDate: new Date(calenderProcess.currDate.getFullYear(), calenderProcess.currDate.getMonth() + 1, 0).getDate()
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
