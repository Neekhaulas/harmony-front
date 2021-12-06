import * as types from './types';
import ENV from 'front/config/environment';

export const addServer = (server, dispatch) =>
  dispatch({ type: types.ADD_SERVER, server });
export const addServers = (servers, dispatch) =>
  dispatch({ type: types.ADD_SERVERS, servers });
export const setCurrentServer = (server, dispatch) =>
  dispatch({ type: types.CURRENT_SERVER, server });
export const setCurrentChannel = (channel, dispatch) =>
  dispatch({ type: types.CURRENT_CHANNEL, channel });
export const feedMessages = (channel, token, dispatch) =>
  fetch(`${ENV.apiUrl}/channels/${channel}/messages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((messages) =>
      dispatch({ type: types.SET_MESSAGES, channel, messages })
    );
export const getMessagesBefore = (channel, messageId, token, dispatch) =>
  fetch(`${ENV.apiUrl}/channels/${channel}/messages?before=${messageId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((messages) => {
      if (messages.length === 0) return false;
      return dispatch({ type: types.ADD_MESSAGES_BEFORE, channel, messages });
    });
export const getMessagesAfter = (channel, messageId, token, dispatch) =>
  fetch(`${ENV.apiUrl}/channels/${channel}/messages?after=${messageId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((messages) => {
      if (messages.length === 0) return false;
      return dispatch({ type: types.ADD_MESSAGES_AFTER, channel, messages });
    });
export const addMessage = (message, dispatch) =>
  dispatch({ type: types.ADD_MESSAGE, message });
export const deleteMessage = (message, dispatch) =>
  dispatch({ type: types.DELETE_MESSAGE, message });
export const updateServer = (server, dispatch) =>
  dispatch({ type: types.UPDATE_SERVER, server });
export const addChannel = (channel, dispatch) =>
  dispatch({ type: types.ADD_CHANNEL, channel });
export const setPresence = (presence, dispatch) =>
  dispatch({ type: types.SET_PRESENCE, presence });
