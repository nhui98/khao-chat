import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

type State = {
  chatId: string;
  user: any;
};
type Action = { type: "CHANGE_USER"; payload?: any };
type Dispatch = (action: Action) => void;
type ChatContextType = {
  state: State;
  dispatch: Dispatch;
};

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

const ChatReducer = (state: State, action: Action) => {
  const { currentUser } = useContext(AuthContext);

  switch (action.type) {
    case "CHANGE_USER":
      if (!currentUser) return state;

      return {
        user: action.payload,
        chatId:
          currentUser.uid > action.payload.uid
            ? currentUser.uid + action.payload.uid
            : action.payload.uid + currentUser.uid,
      };
    default:
      return state;
  }
};

const INITIAL_STATE: State = {
  chatId: "null",
  user: {},
};

export const ChatContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [state, dispatch] = useReducer(ChatReducer, INITIAL_STATE);
  const value = { state, dispatch };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export function useChat() {
  const context = useContext(ChatContext);

  if (context === undefined)
    throw new Error("useChat must be used within ChatContextProvider");

  return context;
}
