import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

// import "index.scss";
import Summary from "../components/Summary"
import SummaryList from "../components/Summary/SummaryList";
import SummaryItem from "../components/Summary/SummaryItem";
import Score from "../components/Summary/Score"

const score = 100;

export const SummaryComponent = () => <Summary />
export const SummaryListComponent = () => <SummaryList />
export const SummaryItemComponent = () => <SummaryItem />
export const ScoreComponent = () => <Score score={score}/>

export default {
  title: "Components/Summary",
  component: Summary
};
