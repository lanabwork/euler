import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import login from '@/pages/login.vue'
import { userCheck, messages } from '@/constants/config';

const localVue = createLocalVue()
const wrongPassword = 'не корректный пароль';

localVue.use(Vuex)

describe('login.vue', () => {
  let actions
  let state
  let store

  beforeEach(() => {
    actions = {
      authorization: jest.fn(),
    }
    state = {
      user: [],
    }
    store = new Vuex.Store({
      modules: {
        user: {
          state,
          actions,
          namespaced: true
        }
      },
    })
  })

  it("показывается сообщение об ошибке при ошибке авторизации",  () => {
    const wrapper = mount(login, { store, localVue })

    wrapper.find("[data-login]").setValue(userCheck.login)
    wrapper.find("[data-password]").setValue(wrongPassword)
    wrapper.find("button").trigger("click")
    const message = document.querySelector('.el-message--error')
    expect(message.textContent || message.innerText)
      .toBe(messages.authorizationError)
  })

  it("показывается сообщение после авторизации",  () => {
    const wrapper = mount(login, { store, localVue })

    wrapper.find("[data-login]").setValue(userCheck.login)
    wrapper.find("[data-password]").setValue(userCheck.password)
    wrapper.find("button").trigger("click")
    const message = document.querySelector('.el-message--success')
    expect(message.textContent || message.innerText)
      .toBe(messages.authorizationSuccessed)
  })
})
