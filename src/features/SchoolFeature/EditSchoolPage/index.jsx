import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import CreateSchoolForm from "./CreateSchoolForm";

export default function CreateSchoolPage({ school }) {
  return (
    <FlexColumn>
      <FlexRow>
        <GoBackButton /> <Title text="Editar Escuela" margin="20px 5px" />
      </FlexRow>

      <CreateSchoolForm school={school} />
    </FlexColumn>
  );
}

CreateSchoolPage.defaultProps = {
  school: null,
};
