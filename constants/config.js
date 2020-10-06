const userCheck = {
  login: '123456',
  password: 'admin',
  expireTime: 36000, // ms
}

const defaultCard = {
  id: 1,
  name: 'Моя карта',
  number: '4083961122223333',
  isCreated: true,
  isSaved: true,
  bank: {}
};

const api = {
  url: 'https://api.cardinfo.online',
  token: 'c32982796ba58b20b90bd8d8a475b86f',
}

const messages = {
  addedCard: 'Карта добавлена',
  savedCardError: 'Заполните обязательные поля',
  removedCard: 'Карта удалена',
  editedCard: 'Карта отредактирована',
  sessionIsExpired: 'Время сессии истекло',
  authorizationError: 'Не верный логин или пароль',
  authorizationSuccessed: 'Вы вошли в аккаунт',
  logoutSuccessed: 'Вы вышли из аккаунта',
  checkBankError: 'Сетевая ошибка при получении информации о банке, обратитесь к администратору',
}

export {
  userCheck,
  defaultCard,
  api,
  messages,
};
