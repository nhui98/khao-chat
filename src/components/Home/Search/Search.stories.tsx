import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AuthContextProvider } from "../../../context/AuthContext";
import Search from "./Search";

export default {
  title: "home/search",
  component: Search,
  argTypes: {},
  decorators: [(story) => <AuthContextProvider>{story()}</AuthContextProvider>],
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = () => <Search />;

export const Base = Template.bind({});
