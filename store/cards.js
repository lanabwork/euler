import {defaultCard} from '@/constants/config';
export const state = () => ({
  cards: JSON.parse(localStorage.getItem('cards')) || [defaultCard],
});

export const mutations = {
  add(state, card) {
    const cards = state.cards;
    cards.push(card);
    state.cards = cards;
    localStorage.setItem('cards', JSON.stringify(cards));
  },
  edit(state, payload) {
    const cards = state.cards;
    const cardId = payload.id;
    const card = cards.find((item) => item.id === cardId);
    if (card) {
      card[payload.name] = payload.value;
      localStorage.setItem('cards', JSON.stringify(cards));
    }
  },
  remove(state, cardId) {
    const cards = state.cards;
    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex != null) {
      cards.splice(cardIndex, 1);
      localStorage.setItem('cards', JSON.stringify(cards));
    }
  },
};

export const actions = {
  add(context, payload) {
    context.commit('add', payload);
  },
  edit(context, payload) {
    context.commit('edit', payload);
  },
  remove(context, payload) {
    context.commit('remove', payload);
  },
};
