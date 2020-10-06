import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import AddCard from '@/components/AddCard.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe.only('AddCard.vue', () => {
  let actions
  let state
  let store

  beforeEach(() => {
    actions = {
      add: jest.fn(),
    }
    state = {
      cards: [],
    }
    store = new Vuex.Store({
      modules: {
        cards: {
          state,
          actions,
          namespaced: true
        }
      },
    })
  })

  it('вызывает "addCard" при клике на кнопку', () => {
    const wrapper = shallowMount(AddCard, { store, localVue })
    wrapper.find('.add-card__inner').trigger('click')
    expect(actions.add).toHaveBeenCalled()
  })
})
