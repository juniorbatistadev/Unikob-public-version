import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import CreateJobForm from "./CreateJobForm";

export default function CreateJobPage() {
  return (
    <FlexColumn>
      <FlexRow>
        <GoBackButton /> <Title text="Publicar Trabajo" margin="20px 5px" />
      </FlexRow>

      <CreateJobForm />
    </FlexColumn>
  );
}
