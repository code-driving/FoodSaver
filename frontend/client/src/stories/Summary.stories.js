import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

// import "index.scss";
<<<<<<< HEAD

import SummaryList from "../components/Summary/SummaryList";
import SummaryItem from "../components/Summary/SummaryItem";

export const SummaryListComponent = () => <SummaryList />
export const SummaryItemComponent = () => <SummaryItem />

=======
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
>>>>>>> 6c0341075e61592c2e7f4dda8902cd17379a5b30
