import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import TabsContent from "@components/TabsContent";
import TabsMenu from "@components/TabsMenu";
import { UNICRUSH_PATH } from "src/paths";
import RecentCrushes from "./components/RecentCrushes";
import TopCrushes from "./components/TopCrushes";

function UniCrushPage() {
  return (
    <FlexColumn margin="10px">
      <FlexRow alignItems={"center"}>
        <GoBackButton />
        <Title text="UniCrush" />
      </FlexRow>
      <TabsMenu
        typeStyle="clear"
        path={UNICRUSH_PATH}
        slug="section"
        options={[
          { name: "Recientes", query: {} },

          {
            link: "top",
            name: "Mas Votados",
            query: { section: "top" },
          },
        ]}
      />

      <TabsContent
        slug={"section"}
        tabs={{
          default: <RecentCrushes />,
          top: <TopCrushes />,
        }}
      />
    </FlexColumn>
  );
}

export default UniCrushPage;
