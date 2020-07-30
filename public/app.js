// import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/database";

import firebase from './firebase.js';

console.log(firebase.database())

const dates = document.querySelector('.calender-dates');
const currMonth = document.querySelector('.currMonth');
const backMonthBtn = document.querySelector('.backMonthBtn');
const nextMonthBtn = document.querySelector('.nextMonthBtn');``
const addUserBtn = document.querySelector('.addUserBtn');

const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');

const userList = document.querySelector('.userList');

// function init() {
  const modalsProcess = {
    resetContent: () => {
      const message = document.querySelector('.message');
      const userInput = document.querySelector('.userInput');
      const btns = document.querySelector('.btns');
      const modalContents = [message, userInput, btns];

      modalContents.forEach(content => {
        while (content.firstChild) {
          content.firstChild.remove();
        }
      });
    },
    openModal: () => {
      modal.classList.remove('hidden');
      modalOverlay.addEventListener('click', e => {
        if (e.target === e.currentTarget) {
          modalsProcess.resetContent();
          modal.classList.add('hidden');
        }
      });
    },
    closeModal: () => {
      modalsProcess.resetContent();
      modal.classList.add('hidden');
    },
    warningMessage: {
      userCount: () => {
        modalsProcess.resetContent();

        const warningMessage = document.createElement('h3');
        const closeBtn = document.createElement('button');

        document.querySelector('.message').appendChild(warningMessage);
        document.querySelector('.btns').appendChild(closeBtn);

        warningMessage.innerText = '인원은 5명을 초과할 수 없습니다';
        closeBtn.innerText = '확인';
        closeBtn.addEventListener('click', modalsProcess.closeModal);
      },
      userName: () => {
        modalsProcess.resetContent();

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
      // referenceValue: null,
      userName: null,
      userKey: null
    },
    selectUserHandler: user => {
      const currSelectUser = user.currentTarget;
      const currSelectUserKey = currSelectUser.classList.item(0).split('-')[1];

      if (userProcess.selectedUser.userKey === currSelectUserKey) {
        currSelectUser.classList.remove('selected-user');
        userProcess.selectedUser.userName = null;
        userProcess.selectedUser.userKey = null;
        calenderProcess.calenderEvents.clickEventHandler('remove');
      } else {
        if (userProcess.selectedUser.userKey) {
         userList.querySelector(`.userKey-${userProcess.selectedUser.userKey}`).classList.remove('selected-user');
        } else {
          calenderProcess.calenderEvents.clickEventHandler('add');
        }
        currSelectUser.classList.add('selected-user');
        userProcess.selectedUser.userKey = currSelectUserKey;
        userProcess.selectedUser.userName = currSelectUser.firstChild.innerHTML;
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
        for (let i = 0; i < dates.childNodes.length; i++) {
          if (dates.childNodes[i].classList.contains('date')) {
            if (action === 'add') {
              dates.childNodes[i].addEventListener('click', calenderProcess.calenderEvents.onEvent);
            } else {
              dates.childNodes[i].removeEventListener('click', calenderProcess.calenderEvents.onEvent);
            }
          }
        }
      },
    },
    viewCurrMonth: () => {
      currMonth.innerText = `${calenderProcess.currDate.getFullYear()} 년 ${calenderProcess.currDate.getMonth() + 1}월`
    },
    resetCalenderOfUser: () => {
      for (let i = 0; i < dates.childNodes.length; i++) {
        const cuurDateUserList = dates.childNodes[i].querySelector('.date-userList');
        while (cuurDateUserList.firstChild) {
          cuurDateUserList.firstChild.remove();
        }
      }
    },
    monthHandler: () => {
      calenderProcess.resetCalenderOfUser();
      if (event.target.className === 'nextMonthBtn') {
        calenderProcess.currDate.setMonth(calenderProcess.currDate.getMonth() + 1);
      } else {
        calenderProcess.currDate.setMonth(calenderProcess.currDate.getMonth() - 1);
      }
      calenderProcess.dateCulculation();
    },
    viewCalender: dateCulData => {
      const loopNumber = dateCulData.firstDay + dateCulData.lastDate;
      const dateNodes = dates.childNodes;
      let viewDate = 1;

      for (let i = 0; i < loopNumber; i++) {
        if (dateCulData.firstDay <= i) {
          dateNodes[i].classList.add('date');
          dateNodes[i].querySelector('.date-num').innerText = viewDate;
          viewDate++;
        } else if (dateNodes[i].classList.contains('date')) {
          dateNodes[i].classList.remove('date');
          dateNodes[i].querySelector('.date-num').innerText = '';
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
// }
// init();
