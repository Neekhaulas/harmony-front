import merge from 'lodash/merge';
import omitBy from 'lodash/omitBy';
import { createSelector } from '@reduxjs/toolkit';
import * as types from '../actions/types';
import server from '../controllers/server';

const initialState = {
  servers: {},
  channels: {},
  messages: {},
  presences: {},
  currentServer: null,
  currentChannel: null,
};

export default function servers(state, action) {
  switch (action.type) {
    case types.ADD_SERVER: {
      let newChannels = {};
      const id = action.server._id;
      const newServer = {
        [id]: {
          id: action.server._id,
          name: action.server.name,
        },
      };
      action.server.channels.forEach((channel) => {
        newChannels[channel._id] = {
          id: channel._id,
          name: channel.name,
          server: channel.server,
        };
      });
      const servers = merge({}, state.servers, newServer);
      const channels = merge({}, state.channels, newChannels);
      return Object.assign({}, state, { servers: servers, channels: channels });
    }
    case types.ADD_SERVERS: {
      let newServers = {};
      let newChannels = {};
      action.servers.forEach((server) => {
        newServers[server._id] = {
          id: server._id,
          name: server.name,
        };
        server.channels.forEach((channel) => {
          newChannels[channel._id] = {
            id: channel._id,
            name: channel.name,
            server: channel.server,
          };
        });
      });
      const servers = merge({}, state.servers, newServers);
      const channels = merge({}, state.servers, newChannels);
      return Object.assign({}, state, { servers: servers, channels: channels });
    }
    case types.UPDATE_SERVER: {
      action.server.id = action.server._id;
      const updatedServer = {
        [action.server._id]: {
          ...state.servers[action.server.id],
          ...action.server,
        },
      };
      let updatedChannels = {};
      action.server.channels.forEach((channel) => {
        updatedChannels[channel._id] = {
          id: channel._id,
          name: channel.name,
          server: channel.server,
        };
      });
      const servers = merge({}, state.servers, updatedServer);
      const channels = merge({}, state.channels, updatedChannels);
      return Object.assign({}, state, { servers: servers, channels: channels });
    }
    case types.CURRENT_SERVER: {
      return {
        ...state,
        currentServer: action.server,
      };
    }
    case types.CURRENT_CHANNEL: {
      return {
        ...state,
        currentChannel: action.channel,
      };
    }
    case types.ADD_MESSAGES: {
      let newMessages = {
        [action.channel]: action.messages.reduce((obj, item) => {
          return {
            ...obj,
            [item._id]: item,
          };
        }, {}),
      };
      const messages = merge({}, state.messages, newMessages);
      return Object.assign({}, state, { messages: messages });
    }
    case types.ADD_MESSAGE: {
      if (state.messages[action.message.channel] !== undefined) {
        let newMessage = {
          [action.message.channel]: {
            [action.message._id]: action.message,
          },
        };
        const messages = merge({}, state.messages, newMessage);
        return Object.assign({}, state, { messages: messages });
      }
      return state;
    }
    case types.UPDATE_MESSAGE: {
      if (state.messages[action.message.channel] !== undefined) {
        let newMessage = {
          [action.message.channel]: {
            [action.message._id]: action.message,
          },
        };
        const messages = merge({}, state.messages, newMessage);
        return Object.assign({}, state, { messages: messages });
      }
      return state;
    }
    case types.DELETE_MESSAGE: {
      if (
        state.messages[action.message.channel] !== undefined &&
        state.messages[action.message.channel][action.message.id] !== undefined
      ) {
        delete state.messages[action.message.channel][action.message.id];
        const messages = merge(
          {},
          state.messages,
          state.messages[action.message.channel]
        );
        return Object.assign({}, state, { messages: messages });
      }
      return state;
    }
    case types.ADD_CHANNEL: {
      const newChannel = {
        [action.channel._id]: {
          id: action.channel._id,
          name: action.channel.name,
          server: action.channel.server,
        },
      };
      const channels = merge({}, state.channels, newChannel);
      return Object.assign({}, state, { channels: channels });
    }
    default:
      return state || initialState;
  }
}

const allServers = (state) => {
  return state.servers.servers;
};

const allMessages = (state) => {
  return state.servers.messages;
};

export const currentServer = (state) => {
  return parseInt(state.servers.currentServer);
};

const allChannels = (state) => {
  return state.servers.channels;
};

export const currentChannel = (state) => {
  return parseInt(state.servers.currentChannel);
};

const allPresences = (state) => {
  return state.servers.presences;
};

export const getServers = createSelector(allServers, (allServers) => {
  return Object.values(allServers);
});

export const getChannelsOfSelectedServer = createSelector(
  allChannels,
  currentServer,
  (allChannels, currentServer) => {
    return Object.values(
      omitBy(allChannels, (channel) => {
        return channel.server != currentServer;
      })
    );
  }
);

export const getCurrentServer = createSelector(
  allServers,
  currentServer,
  (allServers, currentServer) => {
    if (currentServer === null) return null;
    return allServers[currentServer] ?? null;
  }
);

export const getCurrentChannel = createSelector(
  allChannels,
  currentChannel,
  (allChannels, currentChannel) => {
    if (currentChannel === null) return null;
    return allChannels[currentChannel] ?? null;
  }
);

export const getCurrentChannelMessages = createSelector(
  allMessages,
  currentChannel,
  (allMessages, currentChannel) => {
    if (currentChannel === null) return null;
    if (allMessages[currentChannel] === undefined) return null;
    return Object.values(allMessages[currentChannel]).reduce(
      (previous, current) => {
        if (previous.at(-1) !== undefined) {
          let previousMessage = previous.at(-1);
          if (previousMessage.owner !== current.owner) {
            current.renderUserInfo = true;
          }
        } else {
          current.renderUserInfo = true;
        }
        previous.push(current);
        return previous;
      },
      []
    );
    // return Object.values(allMessages[currentChannel]) ?? null;
  }
);

export const getCurrentServerPresence = createSelector(
  allPresences,
  currentServer,
  (allPresences, currentServer) => {
    if (currentServer === null) return null;
    return allPresences[currentServer] ?? null;
  }
);
