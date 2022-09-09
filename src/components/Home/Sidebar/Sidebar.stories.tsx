import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AuthContextProvider } from "../../../context/AuthContext";
import { ChatContextProvider } from "../../../context/ChatContext";
import Sidebar from "./Sidebar";

export default {
  title: "home/sidebar",
  component: Sidebar,
  argTypes: {},
  decorators: [
    (story) => (
      <AuthContextProvider>
        <ChatContextProvider>{story()}</ChatContextProvider>
      </AuthContextProvider>
    ),
  ],
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = () => <Sidebar />;

export const Base = Template.bind({});
